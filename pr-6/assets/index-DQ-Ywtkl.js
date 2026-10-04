(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function ui(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Le(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function hi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=Le(i,s,t),f=Le(i+1,s,t),d=Le(i,s+1,t),u=Le(i+1,s+1,t);return c+(f-c)*o+(d-c)*h+(c-f-d+u)*o*h}const Jn=(n,e,t)=>n+(e-n)*t,Rn=(n,e,t)=>Math.min(t,Math.max(e,n)),an=n=>{const e=Rn(n,0,1);return e*e*(3-2*e)};function Kf(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=Rn(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Ao(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function qf(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),c=Rn(n.zoomStep+Math.sign(e),0,h-1),f=h>1?c/(h-1):0;let d=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(d,u);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*r),M=n.ax+(d-n.ax)*m,x=n.az+(u-n.az)*m,[g,v]=Ao(n.tx,n.vx,t.x+M,o.follow,r),[w,y]=Ao(n.ty,n.vy,t.y,o.follow,r),[A,b]=Ao(n.tz,n.vz,t.z+x,o.follow,r),E=n.zoom+(f-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r)),S=a.treetop,R=Rn((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(S.boost-1)),0,1),T=(n.pull??0)+(S.cameraPull*R*an(_)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:c,zoom:E,tx:g,ty:w,tz:A,vx:v,vy:y,vz:b,ax:M,az:x,lift:Rn(_,0,1),pull:T}}function hd(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=an(e),a=Jn(Jn(i.angleIn,i.angleOut,n.zoom),Jn(s.angleIn,s.angleOut,n.zoom),r),o=Jn(Jn(i.distanceIn,i.distanceOut,n.zoom),Jn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const $f=.1,Zf=()=>({time:0,paused:!0});function Jf(n,e){if(n.paused||!(e>0))return 0;const t=Math.min($f,e);return n.time+=t,t}const Qf={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},jf={types:Qf};function Jr(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Qr(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const xe=(n,e,t)=>e+(t-e)*n(),Sc=(n,e)=>e[Math.floor(n()*e.length)];function pt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Ei(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=pt(i,s,t),f=pt(i+1,s,t),d=pt(i,s+1,t),u=pt(i+1,s+1,t);return c+(f-c)*o+(d-c)*h+(c-f-d+u)*o*h}function me(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,c,f]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(f*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},To=4;function ud(n,e,t,i=.12){const s=(r,a,o,h)=>{const c=o-r,f=h-a,d=Math.max(0,Math.min(1,((n-r)*c+(e-a)*f)/(c*c+f*f)));return Math.hypot(n-r-c*d,e-a-f*d)<i};switch((t%To+To)%To){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const e0=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function bh(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),c=r(o),f=r(o+1),d=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(f[0]-c[0],f[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const m=p/u,M=m*m,x=M*m;s.push([0,1].map(g=>.5*(2*c[g]+(-h[g]+f[g])*m+(2*h[g]-5*c[g]+4*f[g]-d[g])*M+(-h[g]+3*c[g]-3*f[g]+d[g])*x)))}}return e||s.push(n[i-1]),s}function t0(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const c=n[Math.max(0,h-1)],f=n[Math.min(r-1,h+1)];let d=f[0]-c[0],u=f[1]-c[1];const p=Math.hypot(d,u)||1;d/=p,u/=p;const m=n[h][2]/2;i.push([n[h][0]-u*m,n[h][1]+d*m]),s.push([n[h][0]+u*m,n[h][1]-d*m])}const a=(h,c,f,d)=>{let u=h[0]-c[0],p=h[1]-c[1];const m=Math.hypot(u,p)||1;return[h[0]+u/m*f/2*d,h[1]+p/m*f/2*d]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const _t=(n,e)=>[n[0]+e[0],n[1]+e[1]],Cn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function po(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let f=c[0]-h[0],d=c[1]-h[1];const u=Math.hypot(f,d)||1,p=d/u*r,m=-f/u*r;for(let M=1;M<=i;M++){const x=(M-.5)/i,g=Cn(h,c,x),v=[g[0]+p*s-f/u*s*.5,g[1]+m*s-d/u*s*.5];a.push(Cn(h,c,x-.45/i),v,Cn(h,c,x+.35/i))}}return a}function yh(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let c=0,f=t.length-1;c<t.length;f=c++){const[d,u]=t[c],[p,m]=t[f];u>o!=m>o&&h.push(d+(o-u)/(m-u)*(p-d))}h.sort((c,f)=>c-f);for(let c=0;c+1<h.length;c+=2)for(let f=Math.max(0,Math.ceil(h[c]-.5));f<=Math.min(n-1,Math.floor(h[c+1]-.5));f++)i[a*n+f]=1}return i}function n0(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,c,f,d,u)=>{const p=c+d,m=f+u;let M,x;if(p<0||m<0||p>=n||m>=e)M=d,x=u;else{const g=m*n+p;M=s[g]+d,x=r[g]+u}M*M+x*x<a(h)&&(s[h]=M,r[h]=x)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const f=h*n+c;t[f]&&(o(f,c,h,-1,0),o(f,c,h,0,-1),o(f,c,h,-1,-1),o(f,c,h,1,-1))}for(let c=n-1;c>=0;c--){const f=h*n+c;t[f]&&o(f,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const f=h*n+c;t[f]&&(o(f,c,h,1,0),o(f,c,h,0,1),o(f,c,h,1,1),o(f,c,h,-1,1))}for(let c=0;c<n;c++){const f=h*n+c;t[f]&&o(f,c,h,-1,0)}}return{vx:s,vy:r}}class mt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:f=0,round:d=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(u+.5-t)/s,x=m*m+M*M;if(x>1)continue;const g=u*this.w+p;if(o&&!o.has(this.m[g]))continue;if(h<1){const A=c?Ei(p/3.2,u/3.2,f)*c+(1-c)*.5:.5;if(pt(p,u,f+77)>h*(.4+A*1.2)*(1.15-x*.5))continue}const v=m*d,w=M*d,y=Math.hypot(v,w,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,r,v/y,w/y,(Math.sqrt(Math.max(0,1-x))+.15)/y)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let f=0;f<=c;f++){const d=f/c,u=e+(i-e)*d,p=t+(s-t)*d,m=Math.max(.5,(r+(a-r)*d)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let x=Math.floor(u-m);x<=u+m;x++){const g=(x+.5-u)/m,v=(M+.5-p)/m;if(g*g+v*v>1)continue;const w=g*h,y=Math.hypot(w,v*.3,1);this.px(x,M,o,w/y,v*.3/y,1/y)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const c=(m,M,x,g,v,w)=>(m-v)*(g-w)-(x-v)*(M-w),f=Math.max(0,Math.floor(Math.min(i,r,o))),d=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let m=u;m<p;m++)for(let M=f;M<d;M++){const x=M+.5,g=m+.5,v=c(x,g,i,s,r,a),w=c(x,g,r,a,o,h),y=c(x,g,o,h,i,s);(v<0||w<0||y<0)&&(v>0||w>0||y>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(yh(this.w,this.h,bh(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(t0(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:f=l.LINE}={}){const{w:d,h:u}=this;if(o)for(let x=0;x<d*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:m}=n0(d,u,e);let M=r;if(!M){for(let x=0;x<d*u;x++)e[x]&&(M=Math.max(M,Math.hypot(p[x],m[x])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let x=0;x<u;x++)for(let g=0;g<d;g++){const v=x*d+g;if(!e[v])continue;if(h){this.m[v]=t;continue}const w=Math.hypot(p[v],m[v]),y=Math.min(1,Math.max(0,(w-.5)/M)),A=Math.min(2.6,(1-y)/Math.sqrt(Math.max(.02,1-(1-y)*(1-y))))*a;let b=p[v]/(w||1)*A+c[0],E=m[v]/(w||1)*A+c[1];const _=Math.hypot(b,E,1);this.m[v]=t,this.n[v*3]=b/_,this.n[v*3+1]=E/_,this.n[v*3+2]=1/_}if(s&&!h){const x=[];for(let g=0;g<u;g++)for(let v=0;v<d;v++){const w=g*d+v;if(e[w])for(const[y,A]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=v+y,E=g+A;if(b<0||E<0||b>=d||E>=u)continue;const _=E*d+b;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==f){x.push(w);break}}}for(const g of x)this.m[g]=f}if(!h)for(let x=0;x<d*u;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,s={}){return this.fillMask(yh(this.w,this.h,bh(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(f=>f.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((f,d)=>[...f].forEach((u,p)=>{const m=t[u];if(!m)return;const M=i+(a?o-1-p:p),x=s+d;this.inb(M,x)&&(h[x*this.w+M]=1,c.set(x*this.w+M,m))})),this.fillMask(h,l.BODY,{round:r,depth:2.5});for(const[f,d]of c)this.m[f]=d}}function Mn(n,e,t,i=t.outline,s=Jr){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),c=o(),f=o(),d=h.getContext("2d").createImageData(r,a),u=c.getContext("2d").createImageData(r,a),p=f.getContext("2d").createImageData(r,a),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let x=0;x<r;x++){const g=M*r+x,v=n.m[g],w=g*4;if(!v){if(!m)continue;const _=[n.get(x+1,M),n.get(x-1,M),n.get(x,M+1),n.get(x,M-1)].find(R=>R);if(!_)continue;const S=m==="tint"?(e[_]||[0,0,0]).map(R=>R*.35|0):m;d.data.set([...S,255],w),u.data.set([128,128,255,255],w),p.data.set([128,128,255,255],w);continue}let y=e[v];v===l.LINE&&!y&&(y=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(_=>_*.55|0):m),y=y||[255,0,255],d.data.set([...y,e0.has(v)?254:255],w);const A=n.n[g*3],b=n.n[g*3+1],E=n.n[g*3+2];u.data.set([A*127+128,b*127+128,E*255,255],w),p.data.set([-A*127+128,b*127+128,E*255,255],w)}return h.getContext("2d").putImageData(d,0,0),c.getContext("2d").putImageData(u,0,0),f.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:f,w:r,h:a}}const is=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Wr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Xt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],jn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],P={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:jn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:is,cross:Wr,dot:Xt};function wh(n,e=[0,1,0]){const t=is(n);let i=Wr(e,t);Math.hypot(...i)<1e-4&&(i=Wr([0,0,1],t)),i=is(i);const s=Wr(t,i);return[t,s,i]}function dd(n,e){const t=Xt(n,e.axes[0]),i=Xt(n,e.axes[1]),s=Xt(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),c=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(r,a,o)}function fd(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,c=Xt(n,t),f=c-i,d=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=Xt(d,d),p=c*c*i,m=f*f*i,M=Math.sign(s)*s*s*u;return Math.sign(f)*r*m>M?Math.sqrt(u+m)*a-h:Math.sign(c)*r*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*r*a)+c*s)*a-o}function pd(n,e){const t=Math.abs(Xt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Xt(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Xt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const i0=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Sh=(n,e)=>n.type==="ell"?dd(jn(e,n.cw),n):n.type==="box"?pd(jn(e,n.cw),n):fd(jn(e,n.aw),n),Sr=(n,e)=>n.rough?Sh(n,e)+i0(e,n.rough):Sh(n,e);class et{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?wh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?wh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:is(t),v:is(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=dd(jn(e,i.c),i);else if(i.type==="box")s=pd(jn(e,i.c),i);else{const r=jn(i.b,i.a),a=Math.max(1e-9,Xt(r,r)),o=i.r1-i.r2;s=fd(jn(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const Eh={towards:.6,away:-.6},s0=.52;function dn(n,{height:e,scale:t,facing:i="towards",yaw:s=Eh[i]??Eh.towards,pitch:r=s0,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),c=Math.cos(r),f=Math.sin(r),d=k=>[k[0]*o-k[2]*h,k[1],k[0]*h+k[2]*o],u=k=>[k[0]*o+k[2]*h,k[1],-k[0]*h+k[2]*o],p=[0,-f,-c],m=[0,c,-f],M=[1,0,0],x=[0,f,c],g=n.blend,v=n.parts.map(k=>{if(k.type==="ell"){const J=d(k.c),le=k.axes.map(d),ve=Math.max(...k.r);return{...k,cw:J,axes:le,bc:J,br:ve+(k.rough||0)*1.5}}if(k.type==="box"){const J=d(k.c),le=k.axes.map(d);return{...k,cw:J,axes:le,bc:J,br:Math.hypot(...k.h)+(k.rough||0)*1.5}}const ce=d(k.a),G=d(k.b),$=jn(G,ce),fe=Math.max(1e-9,Xt($,$)),he=k.r1-k.r2;return{...k,aw:ce,ba:$,l2:fe,rr:he,a2:fe-he*he,il2:1/fe,bc:P.lerp(ce,G,.5),br:Math.sqrt(fe)/2+Math.max(k.r1,k.r2)}}),w=n.flats.map(k=>{const ce=d(k.c),G=d(k.u),$=d(k.v);return{...k,cw:ce,uw:G,vw:$,nw:is(Wr(G,$)),bc:ce,br:Math.hypot(k.su,k.sv)}}),y=[...v,...w],A=k=>{const ce=Xt(k.bc,M),G=Xt(k.bc,m),$=k.br+(k.uw?0:g);return[ce-$,ce+$,G-$,G+$]};for(const k of y)[k.x0,k.x1,k.u0,k.u1]=A(k);const b=y.filter(k=>!k.extra&&!k.cut),E=Math.min(...b.map(k=>k.u0+(k.uw?0:g))),_=Math.max(...b.map(k=>k.u1-(k.uw?0:g))),S=t??e/Math.max(1e-6,_-E),R=Math.min(...y.map(k=>k.x0)),T=Math.max(...y.map(k=>k.x1)),L=Math.min(...y.map(k=>k.u0)),O=Math.max(...y.map(k=>k.u1)),I=Math.ceil((T-R)*S)+4,U=Math.ceil((O-L)*S)+2,B=new mt(I,U),Y=new Float32Array(I*U).fill(1/0),se=new Int16Array(I*U).fill(-1),K=8,re=Math.ceil(I/K),F=Math.ceil(U/K),te=Array.from({length:re*F},()=>[]);y.forEach((k,ce)=>{const G=Math.max(0,Math.floor((k.x0-R)*S/K)),$=Math.min(re-1,Math.floor(((k.x1-R)*S+2)/K)),fe=Math.max(0,Math.floor((O-k.u1)*S/K)),he=Math.min(F-1,Math.floor(((O-k.u0)*S+1)/K));for(let J=fe;J<=he;J++)for(let le=G;le<=$;le++)te[J*re+le].push(ce)});const ae=.25/S,pe=(k,ce)=>{const G=Math.max(g-Math.abs(k-ce),0)/g;return Math.min(k,ce)-G*G*g*.25};for(let k=0;k<U;k++)for(let ce=0;ce<I;ce++){const G=te[Math.floor(k/K)*re+Math.floor(ce/K)];if(!G.length)continue;const $=R+(ce+.5-1)/S,fe=O-(k+.5)/S,he=P.add(P.add(P.mul(M,$),P.mul(m,fe)),P.mul(x,50));let J=1/0,le=-1/0;const ve=[],Ie=[];for(const $e of G){const Be=y[$e],N=jn(he,Be.bc),C=Xt(N,p),H=Be.br+(Be.uw?0:g),Z=Xt(N,N)-H*H,ne=C*C-Z;if(ne<0)continue;if(Be.uw){Ie.push(Be);continue}if(Be.cut){ve.push(Be);continue}const Me=Math.sqrt(ne);J=Math.min(J,-C-Me),le=Math.max(le,-C+Me),ve.push(Be)}let Ve=1/0,Ke=-1,Ne=0,Ge=null;if(ve.length){const $e=new Map;for(const C of ve){let H=$e.get(C.group);H||$e.set(C.group,H=[]),H.push(C)}const Be=(C,H)=>{let Z=1/0;for(const ne of C)ne.cut||(Z=Z===1/0?Sr(ne,H):pe(Z,Sr(ne,H)));for(const ne of C)ne.cut&&(Z=Math.max(Z,-Sr(ne,H)));return Z};let N=Math.max(0,J);for(let C=0;C<96&&N<le;C++){const H=P.add(he,P.mul(p,N));let Z=1/0,ne=null;for(const[Me,be]of $e){const oe=Be(be,H);oe<Z&&(Z=oe,ne=Me)}if(Z<ae){const Me=$e.get(ne),be=.5/S;Ge=is([Be(Me,[H[0]+be,H[1],H[2]])-Be(Me,[H[0]-be,H[1],H[2]]),Be(Me,[H[0],H[1]+be,H[2]])-Be(Me,[H[0],H[1]-be,H[2]]),Be(Me,[H[0],H[1],H[2]+be])-Be(Me,[H[0],H[1],H[2]-be])]);let oe=Me[0],ue=1/0;for(const ye of Me){if(ye.cut)continue;const ze=Sr(ye,H);ze<ue&&(ue=ze,oe=ye)}for(const ye of Me)if(ye.cut&&-Sr(ye,H)>ue-ae*2){oe=ye;break}Ve=N,Ke=ne,Ne=oe.paint?oe.paint(u(H),oe)??oe.mat:oe.mat;break}N+=Math.max(Z*.9,ae*.5)}}for(const $e of Ie){const Be=Xt(p,$e.nw);if(Math.abs(Be)<1e-4)continue;const N=Xt(jn($e.cw,he),$e.nw)/Be;if(N>=Ve)continue;const C=P.add(he,P.mul(p,N)),H=jn(C,$e.cw),Z=Xt(H,$e.uw)/$e.su,ne=Xt(H,$e.vw)/$e.sv;if(Math.abs(Z)>1||Math.abs(ne)>1)continue;const Me=$e.mask(Z,ne);if(!Me)continue;let be=Be>0?P.mul($e.nw,-1):$e.nw;be=is(P.add(be,P.add(P.mul($e.uw,Z*$e.bend),P.mul($e.vw,ne*$e.bend*.5)))),Ve=N,Ke=$e.group,Ne=Me,Ge=be}if(!Ge||!Ne)continue;const z=k*I+ce;Y[z]=Ve,se[z]=Ke,B.px(ce,k,Ne,Xt(Ge,M),-Xt(Ge,m),Xt(Ge,x))}const _e=[];for(let k=0;k<U;k++)for(let ce=0;ce<I;ce++){const G=k*I+ce;if(B.m[G])for(const[$,fe]of[[1,0],[-1,0],[0,1],[0,-1]]){const he=ce+$,J=k+fe;if(he<0||J<0||he>=I||J>=U)continue;const le=J*I+he;if(B.m[le]&&se[le]!==se[G]&&Y[le]-Y[G]>a){_e.push(G);break}}}for(const k of _e)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(B.m[k])||(B.m[k]=l.LINE);for(let k=0;k<U;k++)for(let ce=0;ce<I;ce++){const G=k*I+ce;if(B.m[G]!==l.EYE)continue;const $=k>0&&B.m[G-I]===l.EYE,fe=ce>0&&B.m[G-1]===l.EYE,he=ce+1<I&&B.m[G+1]===l.EYE&&k+1<U&&B.m[G+I]===l.EYE;!$&&!fe&&he&&(B.m[G]=l.GLINT)}let Pe=-1;for(let k=U-1;k>=0&&Pe<0;k--)for(let ce=0;ce<I;ce++)if(B.m[k*I+ce]){Pe=k;break}const q=Pe>=0&&Pe<U-1?U-1-Pe:0;if(Pe>=0&&Pe<U-1){const k=U-1-Pe;for(let ce=U-1;ce>=0;ce--)for(let G=0;G<I;G++){const $=ce*I+G,fe=(ce-k)*I+G,he=ce-k>=0;B.m[$]=he?B.m[fe]:0,B.g[$]=he?B.g[fe]:0;for(let J=0;J<3;J++)B.n[$*3+J]=he?B.n[fe*3+J]:0}}return B.bodyH=Math.round((_-E)*S),{sp:B,s:S,project:k=>{const ce=d(k);return[+((ce[0]-R)*S+1).toFixed(1),+((O-Xt(ce,m))*S+q).toFixed(1)]}}}const di=(n,e=9,t=.3)=>pt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,As={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},r0={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},Ah={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function a0(n,e=Ah){const t={...Ah,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(r0)){const[o,h,c]=t[r];s[a]=me(i[r]??o,h,c)}return s[l.EYE]=[24,18,30],s[l.GLINT]=[255,255,245],s[l.NOSE]=[20,16,24],s[l.MAGIC]=me(n.glowHue??.13,.5,1),s[l.MAGIC2]=me(n.glowHue??.13,.15,1),s[l.BELLY]=[245,245,240],s}const o0={rise:.78,descend:-.66,brake:.44};function l0(n){const e=new et({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=m=>i-s*(m/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,s*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,a(.5)+.03,m*.045]),h=[-1,1].map(m=>[.2,i+.24+r[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,x=M>0?7:5;e.seg(h[m],o[m],.04,.03,l.JACKET,{group:x}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:x})}const c=[.3+r[0],i+.27+r[1],0],f=[.07,i+.28+r[1]*.5,0],d=[-.15,i+.35+r[2],0];e.ell(f,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<f[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(d,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...P.add(d,[-.02,.06,0]),.07],[...P.add(d,[-.18,.08+r[0]*2,0]),.05],[...P.add(d,[-.34,.05+r[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([m,M],x)=>{const g=x?6:4,v=P.add(d,[-.04,0,x?.06:-.06]);e.seg(v,m,.055,.045,l.JEANS,{group:g}),e.seg(m,M,.045,.04,l.JEANS,{group:g}),e.ell(P.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:g,paint:w=>w[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const M=et.surface(c,[.11,.115,.1],P.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(P.add(M,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(et.surface(c,[.11,.115,.1],P.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...P.add(c,[-.06,.03,0]),.065],[...P.add(c,[-.22,.05+r[1]*2,.01]),.05],[...P.add(c,[-.4,.06+r[2]*3,.02]),.03],[...P.add(c,[-.55,.07+r[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(P.add(c,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...P.add(c,[-.005,.03,-.095]),.015],[...P.add(c,[-.02,.12,0]),.015],[...P.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=P.add(c,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...P.add(p,[-.02,.02,0]),.08],[...P.add(p,[-.14,.13,0]),.04],[...P.add(p,[-.3,.14+r[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(P.add(p,[.08,-.02,.08]),P.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11}),e.anchors.hand=o[1],e.anchors.hatTip=P.add(p,[-.3,.14+r[2]*2,0]);for(const[m,M,x,g]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([m-v,M,x],[m-v-g,M,x],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const md={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},nr=.34,gd={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},c0={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:gd})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,nr+.14,.15],far:[.18,nr+.14,-.13],hand:"rest"}))};function h0(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=P.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function u0(n,e){const t=c0[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:gd,...t[e%t.length]},s=new et({blend:.03}),r=i.hop,a=i.sway,o=i.sit?nr+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,c=!!i.broom.astride,f=o-.04,d=c?[1,0,0]:P.norm(i.broom.dir),u=c?[-.36,f,0]:i.broom.binding,p=S=>P.add(u,P.mul(d,S));s.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:d,group:3,paint:S=>{const R=P.dot(P.sub(S,u),d);return R<-.22?l.MAGIC2:R>-.01?l.BROOM:void 0}});for(const S of[-1,1]){const R=S>0?6:4,T=[h,o,S*.07],L=i.sit?i.swing*S:0,O=i.sit?[.24+L,.09+Math.max(0,L)*.6,S*.1]:S>0&&i.legUp?i.legUp:[(S>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),S*.1],I=i.sit?[.21,o+.01,S*.09]:h0(T,O,.21);s.seg(T,I,.055,.045,l.JEANS,{group:R}),s.seg(I,O,.045,.04,l.JEANS,{group:R});const U=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(P.add(O,U),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:R,paint:B=>B[1]<O[1]+U[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[h,o+.03,0];s.ell(x,[.1,.08,.105],l.JEANS,{group:1});const g=P.add(x,P.add(P.mul(m,.19),[0,i.breathe,0]));s.ell(g,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:S=>P.dot(P.sub(S,g),M)>.045&&Math.abs(S[2])<.05?l.TOP:void 0}),s.chain([[...P.add(g,P.add(P.mul(M,-.07),P.mul(m,-.08))),.07],[...P.add(g,P.add(P.mul(M,-.11-a),P.mul(m,-.2))),.05],[...P.add(g,P.add(P.mul(M,-.13-a*1.6),P.mul(m,-.29))),.025]],l.JACKET,{group:12});const v=P.add(g,P.add(P.mul(m,.27),[i.look*.03,0,i.tilt*.04])),w=S=>P.add(g,P.add(P.mul(m,.1),[0,0,S*.12])),y=c?[.28,f+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,d[1]))),A=c?[.28,f+.03,.05]:i.free;for(const S of[-1,1]){const R=S>0?7:5,T=w(S),L=S>0?A:i.far||y,O=S>0&&i.elbow?i.elbow:P.add(P.lerp(T,L,.5),[-.03,-.02,S*.05]);s.seg(T,O,.04,.035,l.JACKET,{group:R}),s.seg(O,L,.035,.03,l.JACKET,{group:R});const I=S>0&&!c?i.hand:"grip";if(I==="palm")s.ell(L,[.045,.02,.04],l.SKIN,{group:R});else if(I==="down")s.ell(L,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:R});else if(I==="wave"){s.ell(L,[.03,.045,.04],l.SKIN,{group:R});for(const U of[-1,0,1])s.seg(P.add(L,[0,.03,U*.02]),P.add(L,[U*.01,.065,U*.03]),.01,.008,l.SKIN,{group:R})}else I==="point"?(s.ell(L,[.035,.03,.035],l.SKIN,{group:R}),s.seg(P.add(L,[0,.02,0]),P.add(L,[.01,.08,0]),.012,.01,l.SKIN,{group:R})):s.ell(L,[.035,.03,.035],l.SKIN,{group:R})}s.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:S=>S[0]<v[0]-.01||S[1]>v[1]+.075?l.HAIR:void 0});for(const S of[-1,1])s.ell(et.surface(v,[.11,.115,.1],P.norm([.85,.05+i.look,S*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&s.ell(et.surface(v,[.11,.115,.1],P.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),s.chain([[...P.add(v,[-.06,.02,0]),.06],[...P.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...P.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const S of[-1,1])s.ell(P.add(v,[-.015,0,S*.105]),[.05,.055,.03],l.PHONES,{group:10});s.chain([[...P.add(v,[-.005,.03,-.095]),.015],[...P.add(v,[-.005,.11,-.05]),.015],[...P.add(v,[-.005,.125,0]),.015],[...P.add(v,[-.005,.11,.05]),.015],[...P.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const b=P.add(v,[-.03,.1,i.tilt*.02]),E=i.tilt*.05,_=P.add(b,[-.16-a*.5,.27,E*2]);return s.ell(b,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...P.add(b,[0,.01,0]),.085],[...P.add(b,[-.05,.17,E]),.045],[..._,.012]],l.HAT,{group:11,paint:S=>S[1]<b[1]+.045?l.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),s.anchors.hand=A,s.anchors.hatTip=_,s}function xd({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return l0(n);if(md[t])return u0(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new et({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),f=.42+h,d=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,d)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],m=s?1:i?-.6:0;o.seg([-.5,f-c*2,0],[.62,f+c*3,0],.022,.018,l.BROOM,{group:2}),r?o.ell([-.56,f-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:w=>w[1]<f-.18?l.MAGIC2:w[1]>f-.01?l.BROOM:void 0}):o.ell([-.62,f-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:w=>w[0]<-.72?l.MAGIC2:w[0]>-.5?l.BROOM:void 0});for(const w of[-1,1]){const y=[-.04,f+.06,w*.07],A=r?[.18,f-.01,w*.14]:s?[.16,f-.05,w*.14]:i?[.06,f-.07,w*.14]:[.12+d*.5,f-.02,w*.14],b=r?w>0?[.44,f-.02+p,w*.13]:[.3,f-.16,w*.13]:s?[.2,f-.26,w*.13]:i?[-.1,f-.23,w*.13]:[.08+d,f-.2,w*.13];o.seg(y,A,.055,.045,l.JEANS,{group:w>0?6:4}),o.seg(A,b,.045,.04,l.JEANS,{group:w>0?6:4}),o.ell(P.add(b,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:w>0?6:4,paint:E=>E[1]<b[1]-.04?l.BELLY:void 0})}o.ell([-.04,f+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+d*.8,f+.26-Math.abs(d)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:w=>w[0]>M[0]+.04&&Math.abs(w[2])<.055?l.TOP:void 0}),r?o.chain([[...P.add(M,[-.08,-.06,0]),.07],[...P.add(M,[-.02,.12+p,.02]),.05],[...P.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...P.add(M,[-.08,-.1,0]),.07],[...P.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...P.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const x=P.add(M,[.03+d*.5,.26,0]),g=P.add(x,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const w of[-1,1]){const y=P.add(M,[.01,.11,w*.11]),A=s&&w>0?P.add(g,[.1,.01,.1]):r?[.3,f+.03,w*.05]:[.26+d,f+.03,w*.05],b=s&&w>0?P.add(y,[.1,.02,.1]):P.lerp(y,A,.5);o.seg(y,b,.04,.035,l.JACKET,{group:w>0?7:5}),o.seg(b,A,.035,.03,l.JACKET,{group:w>0?7:5}),o.ell(A,[.035,.03,.035],l.SKIN,{group:w>0?7:5}),w>0&&(o.anchors.hand=A)}o.ell(x,[.11,.115,.1],l.SKIN,{group:8,paint:w=>w[0]<x[0]-.01||w[1]>x[1]+.075?l.HAIR:void 0});for(const w of[-1,1])o.ell(et.surface(x,[.11,.115,.1],P.norm([.85,.05,w*.45])),[.016,.026,.016],l.EYE,{group:8});r?o.chain([[...P.add(x,[-.06,.06,0]),.06],[...P.add(x,[.04,.13+p,.03]),.045],[...P.add(x,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...P.add(x,[-.06,.02,0]),.06],[...P.add(x,[-.18-u,-.05+p+m*.1,.02]),.045],[...P.add(x,[-.3-u*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const w of[-1,1])o.ell(P.add(x,[-.015,0,w*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...P.add(x,[-.005,.03,-.095]),.015],[...P.add(x,[-.005,.11,-.05]),.015],[...P.add(x,[-.005,.125,0]),.015],[...P.add(x,[-.005,.11,.05]),.015],[...P.add(x,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(g,[.16,.014,.15],l.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.anchors.hatTip=r?P.add(g,[.2,.22+p*.5,0]):P.add(g,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),o.chain(r?[[...P.add(g,[0,.01,0]),.085],[...P.add(g,[.06,.16,0]),.045],[...P.add(g,[.2,.22+p*.5,0]),.012]]:[[...P.add(g,[0,.01,0]),.085],[...P.add(g,[-.05-u-v*.5,.17-v*.3,0]),.045],[...P.add(g,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:w=>w[1]<g[1]+.045?l.MAGIC:void 0}),a){const w=o0[t]+(r?[0,.06][n%2]:0),y=Math.cos(w),A=Math.sin(w),b=[0,f,0],E=T=>[b[0]+(T[0]-b[0])*y-(T[1]-b[1])*A,b[1]+(T[0]-b[0])*A+(T[1]-b[1])*y,T[2]],_=T=>[b[0]+(T[0]-b[0])*y+(T[1]-b[1])*A,b[1]-(T[0]-b[0])*A+(T[1]-b[1])*y,T[2]],S=T=>[T[0]*y-T[1]*A,T[0]*A+T[1]*y,T[2]];for(const T of o.parts)if(T.type==="ell"?(T.c=E(T.c),T.axes=T.axes.map(S)):(T.a=E(T.a),T.b=E(T.b)),T.paint){const L=T.paint;T.paint=(O,I)=>L(_(O),I)}for(const T of o.flats)T.c=E(T.c),T.u=S(T.u),T.v=S(T.v);o.anchors.hand=E(o.anchors.hand),o.anchors.hatTip=E(o.anchors.hatTip);const R=Math.min(...o.parts.map(T=>T.type==="ell"?T.c[1]-Math.max(...T.r):Math.min(T.a[1]-T.r1,T.b[1]-T.r2)));if(R<.08){for(const T of o.parts){const L=.08-R;T.type==="ell"?T.c=[T.c[0],T.c[1]+L,T.c[2]]:(T.a=[T.a[0],T.a[1]+L,T.a[2]],T.b=[T.b[0],T.b[1]+L,T.b[2]])}for(const T of["hand","hatTip"])o.anchors[T]=P.add(o.anchors[T],[0,.08-R,0])}if(r){const T=E([-.45,f-.24,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.055-L*.008;o.ell([T[0]+.1+O*.08,Math.max(.04,T[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],L<2?l.BELLY:L%2?l.MAGIC:l.MAGIC2,{group:25+L,extra:!0})}}if(i){const T=E([-.8,f,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.05-L*.007;o.ell([T[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,T[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],L%2?l.MAGIC:l.MAGIC2,{group:20+L,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const Ec=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),Ro=new Map,Tl=n=>(Ro.has(n)||Ro.set(n,dn(xd({frame:0}),{height:n}).s),Ro.get(n)),xr=(n={})=>Tl(Ec(n)),d0={away:-Math.PI/2,towards:Math.PI/2};function f0(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s,heading:r="side"}={}){const a=Ec(n),o=d0[r],h=xd({frame:e,lean:t,pose:s}),{sp:c,project:f,s:d}=o!==void 0?dn(h,{scale:Tl(a),yaw:o}):s?dn(h,{scale:Tl(a),facing:i}):dn(h,{height:a,facing:i});c.scale=d,h.anchors.hand&&(c.anchors={hand:f(h.anchors.hand),hatTip:f(h.anchors.hatTip)});let u=0;for(let p=0;p<400&&u<6;p++){const m=p*37%c.w,M=p*53%Math.floor(c.h*.8);c.get(m,M)||c.get(m+1,M)||c.get(m-1,M)||c.get(m,M+1)||c.get(m,M-1)||(m*7+M*13+e*5)%11||(c.px(m,M,l.MAGIC2),u++)}return c}const ft=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Js=n=>{const e=ft(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},p0=n=>e=>{const t=ft(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Di=(n,e,t,i,s=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?l.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?l.STONED:void 0}),ia=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:p0(e)}),fn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Js}),sa=(n,e,t,i,s,r=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=ft(s,o)*6.283,c=t*Math.sqrt(ft(o,s)),f=Math.cos(h)*c,d=Math.sin(h)*c*.7;n.ell([f,r*.3,d],[.07,r*(.35+ft(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?l.LEAF:void 0})}},ra=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),m0={"sleeping-giant"(n){const e=t=>i=>{const s=ft(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?l.LEAF3:s>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Di(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Di(n,[-.2,.16,.95],[.2,.15,.18],4),Di(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),sa(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),ra(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ft(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+ft(e,2)*.7,a=P.add(s,[0,r,0]);n.seg(s,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:Js});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...P.add(a,P.add(P.mul(c,.45),[0,.18,0])),.04],[...P.add(a,P.add(P.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Di(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){ra(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=P.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(P.dot(P.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&ft(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(P.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(P.add(e,P.add(P.mul(t,i*.4),[0,.1,-.42])),P.add(e,P.add(P.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),sa(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=P.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,c=Math.hypot(o,h),f=Math.atan2(h,o);return c>r*.82||c<r*.18?l.BARKD:Math.abs(Math.sin(f*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=ft(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(ft(t,o)-.5)*.5,.25+o*.25+ft(o,t)*.2,r*(1-o*.3)+(ft(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>ft(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])fn(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])ia(n,t,i,3);fn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ft(i,s)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+ft(e)*.35;n.box(P.add(i,[0,s/2,0]),[.13,s/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>s*.85?l.MOSS:void 0});const r=P.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,P.add(r,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(P.add(r,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>ft(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],P.add(e,[Math.cos(s)*.08,.1+ft(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>ft(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?l.BARKL:void 0})},"root-arch"(n){fn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),fn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),fn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),fn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])ia(n,e,t,4);for(let e=0;e<4;e++)Di(n,[-.7+e*.45,.12,(ft(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>ft(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Di(n,[-1.4+e*.7,.12,.9+ft(e)*.3],[.2,.15,.18],4+e);sa(n,16,1.8,10,9,.25)},"heron-rookery"(n){fn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{fn(n,[[...s,.07],[...r,.04]],2),n.ell(P.add(r,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<r[1]+.02?l.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])ia(n,s,r,7);const t=P.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...P.add(t,[.12*i,.06*i,0]),.035*i],[...P.add(t,[.2*i,.22*i,0]),.03*i],[...P.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(P.add(t,[.18*i,.33*i,0]),P.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const s of[-.04,.04])n.seg(P.add(t,[0,-.06*i,s]),P.add(t,[.02,-.42,s]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ft(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ft(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,P.add(s,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(P.add(s,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=ft(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){ra(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=ft(e,7)*6.283,i=1.5+ft(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+ft(e,9)*.5;n.seg(s,P.add(s,[0,r,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(P.add(s,[0,r-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){ra(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ft(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Di(n,[.3,.07,.3],[.09,.07,.08],6,!1),Di(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?l.MAGIC2:void 0});sa(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){fn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>fn(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),fn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),fn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:r}),n.ell(P.add(s,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:r}),n.seg(P.add(s,[.15,.07,0]),P.add(s,[.22,.05,0]),.015,.004,l.BODY2,{group:r}),n.seg(P.add(s,[-.1,0,0]),P.add(s,[-.22,-.04,0]),.04,.015,l.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],P.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(P.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),P.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(P.add(i,[0,-.27,0]),P.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>ft(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Di(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(P.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),P.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(P.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(P.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:Js}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:Js});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:Js});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;fn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:Js(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){fn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),fn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),fn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;fn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])ia(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ft(e,1)-.5)*3,.05+ft(e,2)*.5,(ft(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=ft(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},Md={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function g0(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new mt(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function x0(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:me(i,.45,.36),[l.BARKD]:me(i+.03,.5,.17),[l.BARKL]:me(i,.35,.55),[l.BARK2]:me(i+.02,.45,.26),[l.LEAF]:me(t,.55,.45),[l.LEAF2]:me(t-.03,.5,.62),[l.LEAF3]:me(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:me(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:me(e.magicHue??.45,.6,1),[l.MAGIC2]:me(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function M0(n,e,t,i=16){const s=new et({blend:.05});m0[n](s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=(Object.values(Md).find(([u])=>u===n)||[,,1])[2],a=dn(s,{scale:xr(t)*r}),{sp:o,x0:h,y0:c}=g0(a.sp),[f,d]=a.project([0,0,0]);return{sp:o,colours:x0(e,t),origin:{x:+(f-h).toFixed(1),y:+(d-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const v0=1.3,_0=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*v0,n.growth],Er=(n,e,t=1)=>Math.round(e.size*_0(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Ac=(n,e)=>{const t=Qr(e);for(let i=0;i<9;i++){const s=Math.floor(xe(t,2,n.w-2)),r=Math.floor(xe(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,l.MAGIC)}};function mo(n,e,t,i,s,r,a,o){const h=P.add(e,[-i*.7,i*(.75+s),t*i*.35]),c=P.norm(P.sub(h,e)),f=P.norm(P.sub([1,0,0],P.mul(c,P.dot([1,0,0],c)))),d=Math.hypot(...P.sub(h,e));n.flat(P.add(P.lerp(e,h,.5),P.mul(f,-i*.14)),c,f,d*.55,i*.34,As.wing(r,a),{group:o,extra:!0})}const Tc=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Er(1,e)*t*.72))):n===2?Math.round(Math.max(Er(1,e)*t*1.08,Math.min(Er(2,e,t),Er(1,e)*1.4))):Er(n,e)*t;let Ba=null;function b0(n,e){const t=Ba;Ba=n;try{return e()}finally{Ba=t}}const y0=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},w0=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Rc(n){const e=Ba,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:P.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:P.norm([1,.4,0])},a=P.norm(r.dir),o=P.norm(P.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=P.cross(a,o),c=[],f=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const x=M/16*Math.PI*2,g=P.add(P.mul(o,Math.cos(x)),P.mul(h,Math.sin(x)));let v=0;for(;v<.8&&n.field(P.add(r.c,P.mul(g,v)))<0;)v+=.01;v>=.8&&(v=r.r),c.push([...P.add(r.c,P.mul(g,v+f*.7)),f])}n.chain(c,l.COLLAR,{group:60,extra:!0});const d=c.reduce((M,x)=>x[0]-x[1]*.6+x[2]*.5>M[0]-M[1]*.6+M[2]*.5?x:M),u=f*1.3*(r.tag||1),p=P.norm(P.add(P.norm(P.sub(d.slice(0,3),r.c)),[.3,-.5,.3]));let m=d.slice(0,3);for(let M=0;M<60&&n.field(m)<u*.4;M++)m=P.add(m,P.mul(p,.01));n.ell(m,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||P.add(et.surface(i.c,i.r,P.norm([-.15,1,.1])),[0,s*.1,0]),o=P.norm([.3,1,.35]),h=r*1.5,c=P.add(a,P.mul(o,h));n.seg(P.add(a,P.mul(o,-r*.1)),c,r*.48,r*.04,l.HAT1,{group:61,extra:!0,paint:f=>Math.floor(P.dot(P.sub(f,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[r*.17,r*.17,r*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=c=>P.add(c,P.mul(P.norm(P.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(P.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[r,a]){const f=P.norm(P.sub(c,i.c)),d=P.norm(P.cross([0,1,0],f)),u=P.cross(f,d),p=e.glasses==="heart"?w0:y0,m=h*1.5;n.flat(o(c),d,u,m,m,(M,x)=>p(M,x)?p(M*1.3,x*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=P.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:r.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&di(c,60,.28)?l.GLINT:void 0})}}function S0(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=F=>a&&n.legend.includes(F),f=new et,d=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,m=t?-.04:0,M=1+m,x=r.chest*(a?1.06:1)/p+m,g=r.tuck/p+m,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),w=.06*r.legW*(a?1.1:h?1.7:1),y=r.back==="hump"?.1:0,A=r.back==="arch"?.1:0,b=x+.12,E=F=>{if(r.belly&&F[1]<b&&F[0]>-u*.5)return l.BELLY;if(r.saddle&&F[1]>M-.18&&F[0]<u*.55)return l.BODY2;if(r.spots&&F[1]>x+.1&&di(F,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?l.BELLY:r.spots==="young"?void 0:l.BODY3;if(r.ridge&&F[1]>M-.08+y*.5)return l.BODY3};if(f.ell([u*.48,(M+x)/2+y*.5,0],[u*.62,(M-x)/2+y*.5,v],l.BODY,{paint:E}),f.ell([-u*.5,(M+g)/2+A*.6,0],[u*.58,(M-g)/2+A*.6,v*.93],l.BODY,{paint:E}),f.ell([0,(M+(x+g)/2)/2+.02,0],[u*.6,(M-(x+g)/2)/2,v*.9],l.BODY,{paint:E}),r.ridge)for(let F=0;F<(a?16:10);F++){const te=-u*.8+F*u*1.75/(a?15:9),ae=(.07+(a?.04:0))*(1+.5*Math.max(0,te/u));f.ell([te,M+.02+y*Math.max(0,1-Math.abs(te/u-.5)*2)+ae*.5,0],[ae,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let F=0;F<14;F++){const te=F/14*Math.PI*2;f.ell([u*Math.cos(te)*.7,(M+x)/2+Math.sin(te)*.2,v*(F%2?.5:-.5)],[.16,.14,.14],l.BODY)}const _=[.32,-.32][t],S=(F,te)=>{const ae=te*v*.62,pe=F?u*.62:-u*.62,_e=(F?1:-1)*te*_,Pe=F?x+.1:g+.15,q=(F?te:-te)*(t?1:-1)>0?.06:0,ee=[pe+Math.sin(_e)*.2+(F?.02:.1),Math.max(.3,Pe*.55),ae],k=[pe+Math.sin(_e)*.42,.05+q,ae],ce=[pe,Pe+.12,ae*.8],G=te>0?r.legMat||l.BODY:r.legMat?l.BODY3:l.BODY2,$=F?[[...ce,w*1.5],[...ee,w*1.05],[...k,w*.9]]:[[...ce,w*2*(r.haunch||1)],[...P.add(ee,[-.12,.06,0]),w*1.2],[...P.add(k,[-.06*(r.hindFoot||1),.12,0]),w*.9],[...k,w*.9]];f.chain($,G,{group:te>0?6+(F?1:0):2,paint:r.socks?he=>he[1]<r.socks?l.BODY3:void 0:void 0});const fe=(r.paw==="hoof"?.07:.09)*r.legW**.5*(F?1:r.hindFoot||1);f.ell(P.add(k,[fe*.5,-.01,0]),[fe,w*.9,w*1.1],r.paw==="hoof"?l.NOSE:G,{group:te>0?6+(F?1:0):2}),f.anchors.feet.push({c:P.add(k,[fe*.5,-.01,0]),r:Math.max(fe,w*1.1),group:te>0?6+(F?1:0):2})};for(const F of[-1,1])S(!0,F),S(!1,F);const R=[u*.82,M-.12,0],T=[R[0]+Math.cos(r.neckAng)*r.neck*.9,R[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];f.seg(R,T,r.neckW*.55,r.neckW*.42,l.BODY,{paint:F=>r.belly&&F[1]<(R[1]+T[1])/2-.05?l.BELLY:r.face==="dark"?l.BODY2:void 0});const L=F=>{if(r.face==="badger")return Math.abs(F[2])<d*.22+(F[0]-T[0])*.1||F[1]<T[1]-d*.1?l.BELLY:l.BODY3;if(r.face==="dark")return l.BODY2;if((r.belly||r.muzzle)&&F[1]<T[1]-d*.35)return l.BELLY};f.ell(T,[d*1.05,d*.92,d*.88],l.BODY,{paint:L});const O=d*r.snout*(h?.55:o?.78:1),I=d*r.snoutD*.55,U=[T[0]+d*.65+O*.5,T[1]-d*.28,0];f.ell(U,[O*.62+d*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:F=>(r.muzzle||r.belly)&&F[1]<U[1]-I*.1?l.BELLY:L(F)});const B=[U[0]+O*.62+d*.1,U[1]-.02,0];f.ell(B,[d*(r.disc?.1:.12),d*(r.disc?.2:.12),d*(r.disc?.2:.15)],l.NOSE,{group:1});for(const F of[-1,1]){const te=et.surface(T,[d*1.05,d*.92,d*.88],P.norm([.75,.32,F*.62]));f.ell(te,[d*.13,d*.16,d*.13].map(ae=>ae*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?l.MAGIC2:l.EYE,{group:1})}f.anchors.head={c:T,r:[d*1.05,d*.92,d*.88],top:[T[0]-d*.1,T[1]+d*.82,0]},f.anchors.eyes={pts:[-1,1].map(F=>et.surface(T,[d*1.05,d*.92,d*.88],P.norm([.75,.32,F*.62]))),size:d*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},f.anchors.neck={c:P.lerp(R,T,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:P.norm(P.sub(T,R)),tag:h?1.8:o?1.3:1};for(const F of[-1,1]){const te=r.ear,ae=[T[0]-d*.15,T[1]+d*.7,F*d*.5],pe=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(te==="none")continue;if(te==="round"){f.ell(ae,[d*.22,d*.25*pe,d*.1],l.BODY,{group:1,paint:$=>$[0]>ae[0]+d*.02?l.EAR:void 0});continue}const _e=te==="long",Pe=te==="small"?-.6:0,q=d*.55*pe*(te==="big"?1.35:_e?2.2:1),ee=d*.3*(te==="big"?1.2:_e?1.35:1),k=P.norm([Pe*.6-(_e?.3:.12),1,F*.3]),ce=P.norm([.55,.2,F]),G=P.norm(P.cross(ce,k));f.flat(P.add(ae,P.mul(k,q)),G,k,ee,q,As.ear(l.BODY,l.EAR,l.BODY3),{group:5+(F>0?0:20),extra:_e}),te==="tuft"&&f.seg(P.add(ae,[0,q*1.4,F*.02]),P.add(ae,[0,q*1.85,F*.04]),d*.05,d*.02,l.BODY3,{group:1})}const Y=[-u*1.05,M-.1+A*.5,0],se=t?.04:-.02;if(c("tails")||E0(f,c("starTail")?"star":r.tail,Y,u,M,se),r.horns)for(const F of[-1,1]){const te=o?.6:h?.35:c("hornsGlow")?1.4:1,ae=[];for(let pe=0;pe<=8;pe++){const _e=.3-pe/8*Math.PI*1.6,Pe=d*.65*te*(1-.45*pe/8);ae.push([T[0]-d*.1+Math.cos(_e)*Pe,T[1]+d*.45+Math.sin(_e)*Pe,F*(d*.6+pe*.015)]),ae[pe].push(d*.2*te*(1-.6*pe/8))}f.chain(ae,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(r.antlers||c("jackalope"))for(const F of[-1,1])A0(f,r,[T[0]-d*.05,T[1]+d*.75,F*d*.4],F,e,c);if(r.tusks)for(const F of[-1,1]){const te=o?.4:h?0:c("tusksBig")?1.3:.75;if(!te)continue;const ae=[U[0]+O*.25,U[1]-I*.4,F*I*.8];f.chain([[...ae,.045*te],[...P.add(ae,[.1*te,.1*te,F*.03]),.04*te],[...P.add(ae,[.06*te,.24*te,F*.05]),.02*te]],l.ACCENT,{group:8})}r.teeth&&!h&&f.ell([B[0]-d*.1,B[1]-d*.25,0],[d*.08,d*.14,d*.12],l.ACCENT,{group:1});const K=F=>[-u*.9+F*u*1.65,M+y*Math.max(0,1-Math.abs(F-.8)*3)+A*(1-Math.abs(F-.4)*2),0];if(c("wings"))for(const F of[-1,1])mo(f,[u*.2,M,F*v*.5],F,1.15,t?.1:0,F>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(F>0?10:0));if(c("mane")||c("flames"))for(let F=0;F<7;F++){const te=F/6,ae=P.lerp(P.add(T,[-d*.5,d*.3,0]),K(.55),te),pe=[.4,.3,.45,.28,.38,.25,.3][F],_e=P.norm([-.35-(t?.1:0),1,0]);f.flat(P.add(ae,P.mul(_e,pe*.5)),[1,0,0],_e,pe*.32,pe*.55,As.flame(F%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+F%2,extra:!0})}if(c("tails"))for(let F=0;F<7;F++){const te=Math.PI*(.55+F*.08),ae=(F-3)*.1,pe=P.add(Y,[Math.cos(te)*.9,Math.sin(te)*.85,ae]);f.chain([[...Y,.1],[...P.lerp(Y,pe,.5),.17],[...pe,.08]],F%2?l.BODY2:l.BODY,{group:70,extra:!0}),f.ell(pe,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((F,te)=>{const ae=K(F),pe=[.3,.5,.4,.6,.35][te];f.ell(P.add(ae,[0,pe*.45,(te%2-.5)*.1]),[pe*.55,.08,.08],l.MAGIC,{dir:[(te-2)*.12,1,0],group:80+te%2,extra:!0,paint:_e=>_e[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let F=0;F<6;F++)f.ell(K(.08+F*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[F,te]of[[.25,.55],[.5,.8],[.75,.45]]){const ae=K(F);f.seg(ae,P.add(ae,[0,te*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),f.ell(P.add(ae,[0,te*.8,0]),[te*.28,te*.26,te*.28],l.LEAF2,{group:87,extra:!0,paint:pe=>pe[1]<ae[1]+te*.72?l.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const te=K(F);f.ell(P.add(te,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let F=0;F<3;F++){const te=[];for(let ae=0;ae<9;ae++){const pe=ae/8;te.push([u*(.5-pe*2.2),M+.05+F*.1+pe*(.25+F*.12)+Math.sin(pe*6+t+F)*.07,(F-1)*.18,.04*(1-pe*.6)])}f.chain(te,F%2?l.MAGIC2:l.MAGIC,{group:90+F,extra:!0})}Rc(f);const{sp:re}=dn(f,{height:Tc(e,i,r.hgt),facing:s});return a&&Ac(re,n.id.length*7919),re}function E0(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(P.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(P.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>di(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],l.BODY3,a))}function A0(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const f=.045*Math.max(.8,o),d=i*.35*o;if(e.antlers==="palm"){const x=P.add(t,[-.06*o,.12*o,d*.3]);n.seg(t,x,f*1.3,f*1.2,h,c);for(let g=0;g<5;g++){const v=.35+g*.3,w=P.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),y=(.24+.05*(g%2))*o;n.ell(P.add(x,P.mul(w,y*.55)),[y*.6,f*1.5,f*.6],h,{...c,dir:w,up:[0,0,1]})}return}const u=P.add(t,[-.18*o,.3*o,d*.4]),p=P.add(t,[-.25*o,.62*o,d*.8]),m=P.add(t,[-.1*o,.95*o,d]);n.chain([[...t,f*1.2],[...u,f],[...p,f*.85],[...m,f*.4]],h,c);const M=(x,g,v,w)=>n.seg(x,P.add(x,P.mul(P.norm(g),v)),w,w*.35,h,c);M(P.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,f*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,f*.7),o>.7&&(M(p,[.8,1,0],.28*o,f*.6),M(m,[.3,1,i*.2],.18*o,f*.5))}function T0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=m=>r&&n.legend.includes(m),c=new et,f=t?.03:0,d=o?.48:a?.42:.36,u=(o?.95:1.08)+f;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,l.BODY2,{group:2});for(const x of[-.04,0,.04])c.ell([.16,.03+M,m*.15+x],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+f,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<u-d*.5?Math.floor(m[1]*18)%3===0&&di(m,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const m of[-1,1])c.ell([-.06,.58+f,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>di(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[d,d*.9,d],l.BODY);for(const m of[-1,1]){const M=P.norm([.75,-.05,m*.4+.35]),x=P.add(et.surface([0,u,0],[d,d*.9,d],M),P.mul(M,-d*.05));c.ell(x,[d*.22,d*.46,d*.4],l.BELLY,{group:1,dir:M});const g=P.add(x,P.mul(M,d*.14));c.ell(g,[d*.1,d*.26,d*.24].map(v=>v*(o?1.15:1)),r?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(P.add(g,P.mul(M,d*.07)),[d*.08,d*.14,d*.13].map(v=>v*(o?1.15:1)),r?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:d*.22}).pts.push(P.add(g,P.mul(M,d*.07))),o||c.ell([d*.05,u+d*.8,m*d*.6],[d*.32,d*.12,d*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(et.surface([0,u,0],[d,d*.9,d],P.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const m of[-1,1])mo(c,[-.05,.8+f,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(h("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,u,0],r:[d,d*.9,d]},c.anchors.neck={c:[0,u-d*.75,0],r:d*.85,dir:[0,1,0]},Rc(c);const{sp:p}=dn(c,{height:Tc(e,i,.95),facing:s});return r&&Ac(p,31),p}const ss=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(et.surface(e,t,P.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>et.surface(e,t,P.norm(o))),size:s}},vd=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function ti(n,e,t,i,s,r){Rc(n);const{sp:a}=dn(n,{height:Tc(t,i,s),facing:r});return t===3&&Ac(a,e.id.length*131),a}const _d=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(P.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Cc=(n,e)=>e.forEach(([t,i],s)=>n.ell(P.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?l.MAGIC2:void 0}));function R0(n,e,t,i,s="towards"){const r=e===3,a=new et,o=t?.03:0;for(const[d,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,u],[d+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[d+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:d=>di(d,22,.3)?l.BODY3:di(d,19,.12)?l.BELLY:void 0});for(let d=0;d<46;d++){const u=d*2.399%(Math.PI*2),p=d/46*.9+.05,m=P.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);m[0]>.55||a.ell(P.add(et.surface(h,c,m),P.mul(m,.02)),[.1,.025,.025],d%4?l.BODY2:l.BODY3,{dir:P.add(m,[-.4,0,0]),group:1})}const f=[.48,.22,0];return a.ell(f,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),ss(a,f,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?l.MAGIC2:l.EYE),r&&Cc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),ti(a,n,e,i,.6,s)}function C0(n,e,t,i,s="towards"){const r=e===3,a=new et,o=t?.05:0;for(const f of[-1,1])a.ell([-.22,.16,f*.36],[.24,.13,.12],f>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:f>0?6:2,paint:d=>di(d,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,f*.4],[.16,.04,.08],f>0?l.BODY:l.BODY2,{group:f>0?6:2}),a.seg([.35,.2+o,f*.24],[.42,.03,f*.3],.05,.04,f>0?l.BODY:l.BODY2,{group:f>0?7:2}),a.anchors.feet.push({c:[.45,.03,f*.3],r:.06,group:f>0?7:2},{c:[.12,.04,f*.4],r:.08,group:f>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:f=>f[1]<h[1]-.12?l.BELLY:f[0]>.38&&Math.abs(f[1]-(h[1]-.02))<.018?l.LINE:di(f,14,.22)?l.BODY3:void 0});for(const f of[-1,1]){const d=[.3,.55+o,f*.17];a.ell(d,[.1,.09,.1],l.BODY,{group:1}),a.ell(et.surface(d,[.1,.09,.1],P.norm([.6,.5,f*.5])),[.05,.05,.05],r?l.MAGIC2:l.IRIS,{group:1}),a.ell(et.surface(d,[.11,.1,.11],P.norm([.65,.45,f*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(f=>et.surface([.3,.55+o,f*.17],[.1,.09,.1],P.norm([.6,.5,f*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&_d(a,[.15,.66+o,0],.16),ti(a,n,e,i,.55,s)}function L0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new et,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const f=[.36,.84+c,0],d=a?.19:.16;if(h.ell(f,[d*1.1,d,d*.95],l.BODY,{paint:u=>u[1]>f[1]+d*.55?l.BELLY:void 0}),h.ell(P.add(f,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],l.NOSE,{dir:[1,-.2,0],group:1}),ss(h,f,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,r?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])mo(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return ti(h,n,e,i,.75,s)}function P0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new et,h=t===0,c=.55,f=a("wingsBig")?1.5:1;vd(o,0,.3*f);for(const u of[-1,1]){const p=[0,c+.05,u*.1],m=[.05,c+(h?.35:-.05),u*.45*f],M=[[-.05,c+(h?.45:-.15),u*.85*f],[-.25,c+(h?.2:-.25),u*.75*f],[-.3,c+(h?0:-.25),u*.4*f]],x=a("wingsBig")?l.MAGIC:l.BODY2,g=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,g,{group:11});for(const b of M)o.seg(m,b,.02,.012,g,{group:11});const v=P.sub(M[0],p),w=P.norm(v),y=P.norm(P.sub(M[2],m)),A=P.norm(P.sub(y,P.mul(w,P.dot(y,w))));o.flat(P.add(P.lerp(p,M[0],.5),P.mul(A,.12*f)),w,A,Math.hypot(...v)*.55,.3*f,As.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const d=[.08,c+.2,0];o.ell(d,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(P.add(d,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?l.EAR:void 0});return ss(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?l.MAGIC2:l.EYE),o.ell(et.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),ti(o,n,e,i,.55,s)}function D0(n,e,t,i,s="towards"){const r=e===3,a=new et,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let f=0;f<4;f++)a.ell(P.add(c,[.14,-.01,h*(f-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(et.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35])),[.015,.015,.015],r?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>et.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&_d(a,[.15,.62,0],.15),ti(a,n,e,i,.55,s)}function I0(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new et;for(const d of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,m=(u+(d>0?1:0)+t)%2?.06:-.06,M=[p,.22,d*.2];o.chain([[...M,.03],[p+m+(1-u)*.06,.32,d*.42,.025],[p+m*1.5+(1-u)*.15,.02,d*.55,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?l.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),f=a("horn")?l.MAGIC:l.BODY3;for(const d of[-1,1]){const u=P.add(h,[.08,.02,d*.1]),p=P.add(u,[c*.7,c*.45,d*c*.15]),m=P.add(p,[c*.25,-c*.12,-d*c*.12]);o.chain([[...u,.045],[...p,.035],[...m,.015]],f,{group:8+(d>0?1:0)}),o.seg(P.lerp(u,p,.55),P.add(P.lerp(u,p,.55),[0,c*.22,0]),.02,.008,f,{group:8})}for(const d of[-1,1])o.chain([[...P.add(h,[.05,.06,d*.1]),.012],[h[0]+.1,.5,d*.22,.012],[h[0]+.2,.5,d*.26,.012]],l.BODY3,{group:9,extra:!0});return ss(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?l.MAGIC2:l.EYE,9),a("crystals")&&Cc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),ti(o,n,e,i,.5,s)}function O0(n,e,t,i,s="towards"){const r=e===3,a=new et,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const f of[-1,1])a.seg([.7+o,.32,f*.04],[.78+o,.55,f*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,f*.1],[.03,.03,.03],r?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(f=>[.78+o,.57,f*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=r?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:f=>{const d=Math.atan2(f[1]-h[1],f[0]-h[0]);return((Math.hypot(f[0]-h[0],f[1]-h[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?l.MAGIC2:l.BODY3:void 0}}),ti(a,n,e,i,.45,s)}function F0(n,e,t,i,s="towards"){const r=e===3,a=new et;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,f=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+f,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),ss(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?l.MAGIC2:l.EYE),r&&Cc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),ti(a,n,e,i,.4,s)}function N0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new et,c=t?.7:0,f=[];for(let p=0;p<=12;p++){const m=p/12;f.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}f.push([.38,.25,f[12][2],.07],[.42,.45,f[12][2]*.8,.065]),h.chain(f,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:di([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const d=[.5,.5,f[13][2]*.8],u=a?.11:.09;if(h.ell(d,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),ss(h,d,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?l.MAGIC2:l.EYE),t||h.seg(P.add(d,[u*1.4,-u*.2,0]),P.add(d,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:P.add(f[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,f[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])mo(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return ti(h,n,e,i,.45,s)}function U0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new et,h=t===0,c=.55,f=a("wingsBig")?1.45:1,d=a("wingsBig")?l.MAGIC:l.BODY;vd(o,0,.3*f);for(const u of[-1,1]){const p=h?.5:-.1,m=P.norm([.35,p,u]),M=P.norm([-.3,p*.6,u]);o.flat(P.add([0,c,u*.05],P.mul(m,.38*f)),m,P.norm(P.cross(m,[0,1,0])),.4*f,.24*f,As.spotted(d,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(P.add([-.05,c,u*.05],P.mul(M,.26*f)),M,P.norm(P.cross(M,[0,1,0])),.27*f,.17*f,As.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>di(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),ss(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?l.MAGIC2:l.EYE),ti(o,n,e,i,.5,s)}function k0(n,e,t,i,s="towards"){const r=e===3,a=c=>r&&n.legend.includes(c),o=new et,h=t?.05:0;for(let c=0;c<9;c++){const f=c/8,d=-.6+f*1.15;o.ell([d,.12+Math.sin(f*Math.PI)*(.06+h),0],[.08,.1-f*.02,.12-f*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),ss(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?l.MAGIC2:l.EYE),ti(o,n,e,i,.4,s)}function B0(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new et,h=[.15,.28,0];for(const f of[-1,1])for(let d=0;d<4;d++){const u=-.6+d*.4,p=(d+(f>0?0:1)+t)%2?.05:-.05,m=P.add(h,[.05-d*.04,0,f*.1]),M=P.add(m,[Math.cos(u)*.3*(d<2?1:-.6)+p,.3,f*.3]),x=P.add(m,[Math.cos(u)*.55*(d<2?1:-.8)+p*1.5,-.28,f*.55]);o.chain([[...m,.03],[...M,.028],[...x,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:f=>(Math.abs(f[2])<.03||Math.abs(f[0]+.28)<.03)&&f[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([f,d])=>et.surface(h,[.18,.13,.17],P.norm([.9,f*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[f,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(et.surface(h,[.18,.13,.17],P.norm([.9,f*6,d*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let f=0;f<5;f++){const d=Math.PI*(.2+f/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(f-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+f,extra:!0})}return ti(o,n,e,i,.5,s)}const z0=new Map(Object.entries({owl:T0,hedgehog:R0,toad:C0,raven:L0,bat:P0,mole:D0,beetle:I0,snail:O0,woodlouse:F0,snake:N0,moth:U0,glowworm:k0,spider:B0})),Lc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],bd=Object.fromEntries(Lc.map(n=>[n.id,n])),Rl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Cl={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},H0=["bar","star","heart"];function G0(n,e=!0){const t=Qr((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*Rl.length):null,glasses:i||t()<.4?H0[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(Cl)[Math.floor(t()*3)]:null}}function W0(n,e,t=null){const i=V0(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[s,r,a]=Rl[t.hat%Rl.length];i[l.HAT1]=s,i[l.HAT2]=r,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=Cl[t.shoes]||Cl.sneakers;i[l.SHOE]=s,i[l.SOLE]=r}if(t.woken){i[l.WOKEN]=[255,40,36];for(const s of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function V0(n,e){const t=bd[n],i=e.cVal/.85,s=e.cSat/.6,r=me(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:me(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=me(e.magicHue+t.hue*.3,.6,1),h=me(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:r,[l.BODY2]:me(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[l.BODY3]:me(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:me(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:me(.3,.55,.55),[l.LEAF2]:me(.25,.5,.75),[l.LEAF3]:me(.33,.6,.35),[l.TRUNK]:me(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:me(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:me(.12,.7,.85),[l.SKIN]:[238,158,192]}}const Y0=["size","growth","pixel","head","eye","legs","long","fur"],Ar=new Map;function X0(n,e,t,i,s="towards",r=null){const a=bd[n]||Lc[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...Y0.map(f=>i[f]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=Ar.get(h);if(!c){if(c=b0(o,()=>a.q?S0(a,e,t,i,s):z0.get(a.plan)(a,e,t,i,s)),o?.woken)for(let f=0;f<c.m.length;f++)(c.m[f]===l.EYE||c.m[f]===l.IRIS||c.m[f]===l.PUPIL)&&(c.m[f]=l.WOKEN);Ar.size>600&&Ar.delete(Ar.keys().next().value),Ar.set(h,c)}return c}const go=.07,Pc=.048,it=(...n)=>({l:n}),Ot=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),pn=(n,e)=>({d:[n,e]}),St=(n,e=.86)=>it([.5,e],[.5,n]),Et=Ot(.5,.76,.13,25,155),K0=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},At=(...n)=>n.flatMap(e=>[e,K0(e)]);function Ii(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,f=s/r,d=-i/r,u=(o-Math.abs(a))*Math.sign(a),p=h-f*u,m=c-d*u,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let g=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;g>180;)g-=360;for(;g<-180;)g+=360;return Ot(p,m,o,M,M+g)}const q0=(n,e,t,i,s,r=24)=>it(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),$0=(n,e,t,i,s,r=0,a=40)=>it(...Array.from({length:a+1},(o,h)=>{const c=h/a,f=(r+c*s*360)*Math.PI/180,d=t+(i-t)*c;return[n+d*Math.cos(f),e+d*Math.sin(f)]})),aa=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return it([n+t*a,e+t*o],[n+i*a,e+i*o])}),Z0={wolf:[St(.3),it([.28,.08],[.5,.3],[.72,.08]),Ot(.5,.55,.2,-55,55),Et,pn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[St(.34),it([.36,.06],[.5,.34],[.64,.06]),Ot(.67,.66,.17,180,-80),pn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),Et],badger:[St(.1),it([.24,.3],[.76,.3]),...At(it([.33,.14],[.33,.56])),Et,...At(pn(.24,.3))],boar:[St(.16),...At(Ot(.36,.24,.15,45,180)),...aa(.5,.16,0,.1,[-130,-90,-50]),Et],stag:[St(.42),...At(it([.5,.42],[.34,.26],[.3,.06]),it([.335,.25],[.16,.2]),it([.32,.15],[.18,.07])),Et],hare:[St(.44),...At(it([.5,.44],[.4,.34],[.38,.06])),Ot(.62,.66,.09,180,540),Et,...At(pn(.38,.06))],owl:[St(.44),...At(Ot(.33,.3,.13,0,360),it([.24,.18],[.18,.05])),Et,...At(pn(.33,.3))],bear:[St(.24),it([.24,.3],[.76,.3]),...At(Ot(.3,.3,.09,180,360)),...At(it([.36,.5],[.32,.62])),Et],hedgehog:[St(.52),Ot(.5,.52,.2,180,360),...aa(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),Et],squirrel:[St(.2),it([.5,.2],[.4,.08]),Ot(.66,.4,.16,100,-200),pn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),Et],toad:[St(.42),it([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...At(Ot(.34,.3,.1,0,360)),Et,...At(pn(.16,.54))],otter:[St(.24),Ot(.5,.5,.28,-100,100),pn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ii([.18,.64],[.36,.64],.3),Et],lynx:[St(.32),it([.26,.2],[.5,.32],[.74,.2]),...At(it([.26,.2],[.26,.06])),it([.5,.68],[.66,.62]),Et,...At(pn(.26,.06))],elk:[St(.3),...At(it([.5,.3],[.42,.2]),Ot(.3,.16,.12,0,180),it([.18,.16],[.14,.06])),it([.5,.44],[.6,.52]),Et],raven:[St(.14),it([.5,.14],[.3,.22]),it([.18,.56],[.5,.38],[.82,.56]),Et,pn(.58,.17),...At(pn(.18,.56))],bat:[St(.3),Ot(.5,.16,.14,20,160),...At(it([.5,.38],[.12,.26]),Ii([.12,.26],[.24,.46],-.25),Ii([.24,.46],[.38,.5],-.3),Ii([.38,.5],[.5,.52],-.3)),Et],mole:[St(.44),Ot(.5,.3,.16,0,180),...aa(.5,.3,.19,.3,[-160,-125,-55,-20]),it([.5,.14],[.5,.04]),Et],beaver:[St(.36),it([.32,.2],[.68,.2]),...At(it([.44,.2],[.44,.34])),it([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),Et],stoat:[St(.18),Ot(.5,.44,.24,180,360),it([.5,.18],[.6,.08]),Et,...At(pn(.26,.44))],snail:[St(.52),$0(.5,.33,.03,.2,1.6,90),it([.66,.2],[.76,.06]),Et,pn(.76,.06)],ram:[St(.24),...At(Ot(.36,.24,.14,0,-250)),Et,...At(pn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[St(.24),Ot(.5,.52,.22,205,335),Ot(.5,.66,.24,205,335),Ot(.5,.38,.2,205,335),...At(it([.5,.24],[.32,.06])),Et],snake:[St(.16),q0(.5,.82,.2,.2,1.25),it([.5,.2],[.5,.11]),...At(it([.5,.11],[.42,.045])),Et],moth:[St(.2),...At(it([.5,.3],[.16,.18],[.24,.5],[.5,.4]),it([.5,.5],[.3,.64],[.5,.66]),Ot(.38,.16,.12,0,-110)),Et],marten:[St(.32),it([.3,.2],[.5,.32],[.7,.2]),...At(Ot(.3,.14,.07,90,-180)),Ot(.28,.56,.22,0,150),pn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),Et],salamander:[St(.3),Ii([.5,.3],[.5,.06],.35),Ii([.5,.3],[.5,.06],-.35),...At(it([.5,.42],[.32,.38],[.26,.48]),it([.5,.64],[.32,.6],[.26,.7])),Et,...At(pn(.38,.52))],glowworm:[St(.4),Ot(.5,.27,.1,90,450),...aa(.5,.27,.15,.25,[0,60,120,180,240,300]),Et],spider:[it([.5,.05],[.5,.3]),St(.5),Ot(.5,.4,.11,-90,270),...At(...[-150,-170,170,150].map(n=>it([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Et,pn(.5,.05)],dormouse:[St(.12),Ot(.5,.46,.24,-60,250),...At(Ot(.34,.16,.08,90,-180)),Ii([.56,.38],[.7,.38],-.4),Et],beetle:[St(.36),...At(Ot(.66,.26,.2,160,250)),Ii([.5,.38],[.5,.82],.25),Ii([.5,.38],[.5,.82],-.25),Et]},Th={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},J0={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},hr=n=>Th[J0[n]]||Th.cyan,Q0=[255,255,250],j0=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),Rh=n=>`rgb(${n.join(",")})`;function ep(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function za(n){if(n.d)return{dot:!0,pts:[n.d],len:Pc*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,f)=>{const d=(a+(o-a)*f/h)*Math.PI/180;return[i+r*Math.cos(d),s+r*Math.sin(d)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const Ll=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},Co=new Map;function yd(n){return Co.has(n)||Co.set(n,Ll((Z0[n]||[]).map(e=>({...za(e),w:go,part:"sigil"})))),Co.get(n)}const Lo=new Map;function tp(n,e=0){const t=n+":"+e;if(Lo.has(t))return Lo.get(t);const i=e===null?null:ep(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=go*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=m=>za({a:[.5,.5,m,90,450]});for(let m=0;m<i.rings;m++)h.push({...p(.44-m*.06),w:o,part:"ring"});for(let m=0;m<i.dots;m++){const M=(90+m*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let m=0;m<16;m++){const M=(90+m*22.5)*Math.PI/180,x=.44-.06+.014,g=.44-.014;h.push({...za({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let m=0;m<i.rays;m++){const M=(90+m*360/i.rays)*Math.PI/180,x=.44+.02,g=.5-o/2;h.push({...za({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),f=yd(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([p,m])=>[r+p*s,r+m*s]),w:u.w*s*c,r:Pc*s*c,part:"sigil"})),d={level:e,frame:i,k:s,strokes:[...Ll(h,0,h.length?.15:0),...Ll(f,h.length?.15:0,1)]};return Lo.set(t,d),d}function np(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function ip(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=hr(e),progress:o=1,glow:h=!0}={}){const c=tp(e,r),f=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const d=(u,p,m,M)=>{n.globalAlpha=m,n.strokeStyle=n.fillStyle=Rh(u),n.shadowColor=Rh(a),n.shadowBlur=M;for(const x of c.strokes){const g=np(x,o);if(g){if(n.beginPath(),x.dot){n.arc(g[0][0],g[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,g.forEach((v,w)=>w?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(d(a,2.4,Math.min(f,.7)*.55,s/12),d(j0(a,Q0,.72),.62,1,s/30)):d(a,1,1,0),n.restore()}function sp(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<Pc+i-go/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],c=r.pts[o],f=c[0]-h[0],d=c[1]-h[1],u=f*f+d*d,p=Math.sqrt(u),m=u?Math.max(0,Math.min(1,((e-h[0])*f+(t-h[1])*d)/u)):0;if(Math.hypot(e-h[0]-f*m,t-h[1]-d*m)<i){const M=r.start+(a+m*p)/r.len*(r.end-r.start);M<s&&(s=M)}a+=p}}return s}function wd(n,e,t,i=go/2){return sp(yd(n),e,t,i)<1/0}Lc.map(n=>n.id);const Br=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function Sn(n,e,t,i,s,r,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const f=[];for(let g=0;g<9;g++){const v=g/9*Math.PI*2,w=1+(r()-.5)*.35*(s.clump+.3);f.push([e[0]+Math.cos(v)*t*w,e[1]+Math.sin(v)*i*w*(Math.sin(v)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(po(f,0,9,d,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([_t(e,[-t*1.1,i*.15]),_t(e,[t*1.1,i*.1]),_t(e,[t*1.1,i*1.2]),_t(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([_t(e,[-t*.75,-i*.55]),_t(e,[t*.25,-i*.95]),_t(e,[t*.55,-i*.35]),_t(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),x=r()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const w=n.get(v,g);if(w!==a&&w!==l.LEAF2&&w!==l.LEAF3)continue;const y=pt(v,g,x),A=Ei(v/2,g/2,x)*.5+y*.5;A<.16*s.density?n.recolour(v,g,w===l.LEAF2?a:l.LEAF2):A>1-.16*s.density&&n.recolour(v,g,w===l.LEAF3?a:l.LEAF3)}}function vn(n,e,t,i,s,r,a,o,{mat:h=l.TRUNK,bend:c=1,group:f=10,line:d=!1}={}){const u=[e],p=4;let m=t,M=e;for(let x=1;x<=p;x++)m+=(o()-.5)*.7*a.gnarl*c,M=_t(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),u.push(M);return n.limb(u.map((x,g)=>[...x,s+(r-s)*g/p]),h,{group:f,line:d,round:a.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:u}}function Vi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,f=(8+r()*16)*a*(.4+s.roots),d=(2+r()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+f*.4),t-d],m=[e+c*(i*.5+f),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function rs(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==l.TRUNK)continue;const a=t?Ei(s/1.3,i/6,21):Ei(s/6,i/1.3,21);a>1-e.bark*.42||pt(s,i,4)<e.bark*.05?n.m[r]=l.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=l.BARKL)}}function Yn(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,r-1),f=n.h-c,d=new mt(h,f);for(let u=0;u<f;u++)for(let p=0;p<h;p++){const m=(u+c)*n.w+p+o,M=u*h+p;d.m[M]=n.m[m],d.g[M]=n.g[m],d.n[M*3]=n.n[m*3],d.n[M*3+1]=n.n[m*3+1],d.n[M*3+2]=n.n[m*3+2]}return{sp:d,crownY:t-c}}const pi=n=>(n.crownWidth||3)/3;function rp(n,e,t){const i=pi(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new mt(s,r),o=s/2,h=r,c=e.treeTrunks||1,f=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),d=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=r;const m=(M,x,g,v,w)=>{const y=vn(a,M,x,g,v,v*.65,e,n,{group:12});if(w===0){u.push(y.end);return}const A=n()<.35?3:2;for(let b=0;b<A;b++){const E=(b-(A-1)/2)*xe(n,.5,.85)*(w===3?1.4:1);m(y.end,y.ang+E+(n()-.5)*.25,g*xe(n,.6,.78),v*.62,w-1)}w<=2&&u.push(Cn(M,y.end,.7))};for(let M=0;M<c;M++){const x=d+(c>1?(M/(c-1)-.5)*.8:0),g=[o+(M-(c-1)/2)*f*.6,h],v=vn(a,g,-Math.PI/2+x,r*.36*(c>1?xe(n,.75,1.15):1),f,f*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const w of[-1,1])m(v.end,-Math.PI/2+x*.5+w*xe(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),r*.22*(.75+.25*i)*(c>1?.7:1),f*.7,c>2?2:3);if(c===1&&n()<.7&&m(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,f*.55,2),M===0&&e.treeHollow){const w=Cn(g,v.end,.38);a.ellipse(w[0],w[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(Vi(a,o,h,f*Math.sqrt(c),e,n,t),rs(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const x=u[M],g=u[M+1],v=Math.hypot(g[0]-x[0],g[1]-x[1]);if(v<40*t)for(let w=0;w<=v;w++){const y=Cn(x,g,w/v);a.px(y[0],y[1]+Math.sin(w/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return Yn(a,o,p+4*t);u.sort((M,x)=>M[1]-x[1]);for(const M of u)Sn(a,_t(M,[0,-3*t]),xe(n,14,21)*t,xe(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&Sn(a,_t(M,[xe(n,-9,9)*t,xe(n,-12,-3)*t]),xe(n,10,15)*t,xe(n,7,10)*t,e,n);return Yn(a,o,p+4*t)}function ap(n,e,t){const i=.8+.2*pi(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new mt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),Vi(a,o,h,6*t,e,n,t*.6),rs(a,e);const c=Math.round(xe(n,9,12));for(let f=c-1;f>=0;f--){const d=f/(c-1),u=6*t+d*r*.7,p=(5+d*36)*t*i*xe(n,.9,1.1),m=(5+d*13)*t,M=[[o,u-4*t],[o+p*.5,u+m*.3],[o+p,u+m],[o+p*.7,u+m*1.15],[o,u+m*.7],[o-p*.7,u+m*1.15],[o-p,u+m],[o-p*.5,u+m*.3]];a.shape(po(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+f,line:!1,round:e.round}),a.mark([[o-p,u+m*.55],[o+p,u+m*.55],[o+p,u+m*1.4],[o-p,u+m*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+m*.45],[o-p*.7,u+m*.7]],l.LEAF2,[l.LEAF])}return Yn(a,o,r*.82)}function op(n,e,t){const i=pi(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new mt(s,r),o=s/2,h=r,c=13*t,f=vn(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,c,c*.8,e,n,{bend:1.6}),d=[];for(let m=0;m<5;m++){const M=m%2?1:-1,x=-Math.PI/2+M*xe(n,.55,1.25)*(.7+.3*i),g=vn(a,f.end,x,r*xe(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});d.push(g.end)}Vi(a,o,h,c,e,n,t),rs(a,e);for(const m of d)Sn(a,_t(m,[0,-2*t]),xe(n,20,28)*t,xe(n,9,12)*t,e,n);Sn(a,_t(f.end,[0,-8*t]),24*t,11*t,e,n);let u=s,p=0;for(const m of d)u=Math.min(u,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=u;m<p;m+=xe(n,1,1.7)){let M=r;for(let w=0;w<r;w++)if(a.get(m,w)===l.LEAF||a.get(m,w)===l.LEAF2||a.get(m,w)===l.LEAF3){M=w;break}if(M>=r)continue;const x=Math.abs(m-o)/(s/2),g=(h-M)*xe(n,.5,.9)*(1-x*.3),v=pt(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let w=M+2;w<Math.min(h-2,M+g);w++){const y=Math.round(Math.sin(w*.12+m)*.7);pt(m|0,w,5)<.2+e.density*.8&&a.px(m+y,w,(w-M)/g>.8?l.LEAF3:v,y*.3,.2,.95)}}return Yn(a,o,f.end[1]+6*t)}function Sd(n,e,t){const i=.7+.3*pi(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new mt(s,r),o=s/2,h=r,c=(n()-.5)*.25+(e.treeLean||0),f=vn(a,[o,h],-Math.PI/2+c,r*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<f.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const m=Cn(f.pts[u],f.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(m[0]+M,m[1])===l.BARK2&&n()<.8&&a.recolour(m[0]+M,m[1],l.BARKD)}const d=[f.end];for(let u=0;u<7;u++){const p=xe(n,.35,.9),m=Cn(f.pts[0],f.end,p),M=u%2?1:-1,x=vn(a,m,-Math.PI/2+M*xe(n,.5,1),r*xe(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});d.push(x.end)}for(const u of d)Sn(a,u,xe(n,9,13)*t*i,xe(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return Yn(a,o,r*.55)}function lp(n,e,t){const i=pi(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new mt(s,r),o=s/2,h=r,c=10*t,f=vn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,c,c*.75,e,n,{bend:1.2}),d=[];for(const m of[-1,1,-1,1]){const M=vn(a,f.end,-Math.PI/2+m*xe(n,.7,1.15)*(.7+.3*i),r*xe(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});d.push(M.end,Cn(f.end,M.end,.55))}Vi(a,o,h,c,e,n,t),rs(a,e);const u=Math.round(xe(n,2,3)),p=Math.min(...d.map(m=>m[1]));for(let m=0;m<u;m++){const M=p-6*t+m*9*t,x=(95-m*12)*t*(.65+.35*i);for(let g=0;g<5;g++)Sn(a,[o+(g-2)*x*.36+xe(n,-5,5)*t,M+xe(n,-3,3)*t],x*xe(n,.2,.26),7*t,e,n,{mat:m===u-1?l.LEAF:l.LEAF3})}return Yn(a,o,f.end[1]+4*t)}function Mr(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:f=!1,mats:d=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),x=s()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const w=n.get(v,g);if(!d.includes(w))continue;const y=Ei(v/r,g/r,x),A=pt(v,g,x);a&&y<a?n.recolour(v,g,l.LEAF3):y>1-o&&n.recolour(v,g,l.LEAF2),h&&A<h&&w!==l.LEAF3&&(n.recolour(v,g,c),f&&n.recolour(v,g-1,c))}}function Yi(n,e,t,i){const s=pi(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new mt(r,a),h=r/2,c=a,f=e.treeTrunks||i.trunks||1,d=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(f),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=a;const M=(A,b,E,_,S)=>{const R=vn(o,A,b,E,_,_*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(S===0){p.push(R.end);return}const T=n()<(i.fork??.35)?3:2;for(let L=0;L<T;L++)M(R.end,R.ang+(L-(T-1)/2)*xe(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,E*xe(n,.6,.78),_*.62,S-1);S<=2&&p.push(Cn(A,R.end,.7))};for(let A=0;A<f;A++){const b=u+(f>1?(A/(f-1)-.5)*(i.fan||.8):0),E=[h+(A-(f-1)/2)*d*.6,c],_=vn(o,E,-Math.PI/2+b,a*(i.trunk||.36)*(f>1?xe(n,.8,1.1):1),d,d*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,_.end[1]);for(let S=0;S<(i.limbs||2);S++){const R=S%2?1:-1;M(_.end,-Math.PI/2+b*.5+R*xe(n,.5,1)*(i.spreadA||.8)*(f>1?.7:1),a*(i.limb||.22)*(f>1?.75:1),d*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,d*.55,2),A===0&&e.treeHollow){const S=Cn(E,_.end,.38);o.ellipse(S[0],S[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(i.noRoots||Vi(o,h,c,d*Math.sqrt(f),e,n,t*(i.rootK||1)),i.smooth||rs(o,e),e.treeBare)return Yn(o,h,m+4*t);p.sort((A,b)=>A[1]-b[1]);const[x,g]=i.clumpR||[12,18],v=i.flat||.7,w=[],y=(A,b,E,_)=>{Sn(o,A,b,E,e,n,{mat:_,ragged:i.ragged||1}),w.push([A,b,E])};for(const A of p)y(_t(A,[0,-3*t]),xe(n,x,g)*t,xe(n,x,g)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const A of p)n()<(i.extra??.7)&&y(_t(A,[xe(n,-9,9)*t,xe(n,-12,-3)*t]),xe(n,x,g)*t*.7,xe(n,x,g)*t*v*.7,l.LEAF);if(i.dome){const A=Math.min(...p.map(S=>S[1])),b=p.map(S=>S[0]),E=(Math.min(...b)+Math.max(...b))/2,_=(Math.max(...b)-Math.min(...b))/2;for(let S=0;S<i.dome;S++){const R=S/Math.max(1,i.dome-1)-.5;y([E+R*_*1.1,A-(1-4*R*R)*14*t-xe(n,2,6)*t],xe(n,x,g)*t*1.1,xe(n,x,g)*t*v,l.LEAF)}}if(i.layers)for(const[A,b,E]of w)for(let _=-E;_<E;_+=Math.max(3,i.layers*t))for(let S=-b;S<b;S++)o.get(A[0]+S,A[1]+_)===l.LEAF&&o.recolour(A[0]+S,A[1]+_,l.LEAF3);for(const[A,b,E]of w)Mr(o,A,b,E,n,i.tex||{});return Yn(o,h,m+4*t)}function cp(n,e,t){return Yi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function hp(n,e,t){return Yi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function up(n,e,t){return Yi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function dp(n,e,t){return Yi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function fp(n,e,t){return Yi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function pp(n,e,t){return Yi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function mp(n,e,t){return Yi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function gp(n,e,t){const i=.7+.3*pi(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new mt(s,r),o=s/2,h=r,c=e.treeTrunks||1,f=(n()-.5)*.2+(e.treeLean||0),d=[];for(let p=0;p<c;p++){const m=vn(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+f+(c>1?(p/(c-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const x=xe(n,.3,.97),g=Cn(m.pts[0],m.end,x),v=M%2?1:-1,w=(1-x*.6)*r*.12*i,y=vn(a,g,-Math.PI/2+v*xe(n,.7,1.2),w,2*t,1,e,n,{group:12,mat:l.BARKD});d.push([y.end,(8+(1-x)*6)*t*i],[Cn(g,y.end,.4),(7+(1-x)*4)*t*i])}d.push([m.end,7*t])}Vi(a,o,h,6*t,e,n,t*.6),rs(a,e);for(const[p,m]of d)Sn(a,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of d)Mr(a,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...d.map(([p])=>p[1]));return Yn(a,o,u+(h-u)*.45)}function xp(n,e,t){const i=.8+.2*pi(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new mt(s,r),o=s/2,h=r,c=vn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});rs(a,e);for(let d=0;d<a.h*.55;d++)for(let u=0;u<s;u++)(a.get(u,d)===l.TRUNK||a.get(u,d)===l.BARKD)&&a.recolour(u,d,pt(u,d,3)<.15?l.BARKD:l.BELLY);Vi(a,o,h,8*t,e,n,t*.7);const f=[];for(let d=0;d<6;d++){const u=xe(n,.55,1),p=Cn(c.pts[0],c.end,u),m=d%2?1:-1,M=vn(a,p,-Math.PI/2+m*xe(n,.6,1.3),r*xe(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});f.push(M.end)}f.push(c.end);for(const d of f)Sn(a,_t(d,[0,-2*t]),xe(n,13,19)*t*i,xe(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const d of f)Mr(a,_t(d,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Yn(a,o,Math.min(...f.map(d=>d[1]))+8*t)}function Mp(n,e,t){const i=pi(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new mt(s,r),o=s/2,h=r,c=e.treeTrunks||3,f=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)vn(a,[o+(p-(c-1)/2)*f*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),r*.3,f,f*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<r;p++)for(let m=0;m<s;m++)a.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&a.recolour(m,p,l.BARKD);Vi(a,o,h,f*1.4,e,n,t);const d=h-r*.3,u=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(m)*M,d+Math.sin(m)*M*.55+10*t],xe(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,d-xe(n,4,22)*t],xe(n,20,26)*t]);u.push([[o,d-24*t],26*t]);for(const[p,m]of u)Sn(a,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of u)Mr(a,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Yn(a,o,d+4*t)}function vp(n,e,t){return Yi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function _p(n,e,t){const i=.8+.2*pi(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new mt(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let f=0;f<10;f++){const d=f/9,u=10*t+d*r*.72,p=(5+d*28)*t*i,m=1+Math.round(d*3);for(let M=0;M<m;M++)c.push([[o+(m>1?(M/(m-1)-.5)*p*1.3:0)+xe(n,-2,2)*t,u+xe(n,-2,2)*t],(6+d*5)*t])}for(const[f,d]of c)Sn(a,f,d*1.2,d,e,n,{mat:l.LEAF3,ragged:.7});for(const[f,d]of c)Mr(a,f,d*1.2,d,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Yn(a,o,r*.85)}function bp(n,e,t){return Yi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function yp(n,e,t){const i=Sd(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||pt(r,1,7)<.35)continue;const o=(s.h-a)*xe(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===l.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,pt(r,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function wp(n,e,t){const i=.8+.2*pi(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new mt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),Vi(a,o,h,6*t,e,n,t*.5),rs(a,e);const c=14;for(let f=0;f<c;f++){const d=f/(c-1),u=8*t+d*r*.68,p=(4+d*30)*t*i;for(let m=0;m<4;m++){const M=[o+(m/3-.5)*p*1.6,u+Math.abs(m/3-.5)*6*t];Sn(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),Mr(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return Yn(a,o,r*.8)}const Sp=6;function Ep(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,c=r.low||(r.low=new Uint8Array(o*h)),f=Math.ceil(a+Sp*i);if(f>=h-2)return n;const d=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-d)/.5)),p=!!t.treeBare,m=S=>{const R=[];let T=-1;for(let L=0;L<=o;L++){const O=L<o&&Br.has(r.m[S*o+L]);O&&T<0&&(T=L),!O&&T>=0&&(R.push([T,L-1]),T=-1)}return R},M=(S,R)=>S.reduce((T,L)=>!T||Math.abs((L[0]+L[1])/2-R)<Math.abs((T[0]+T[1])/2-R)?L:T,null),x=S=>{const R=r.m.slice(),T=r.n.slice();S();for(let L=0;L<R.length;L++)r.m[L]!==R[L]&&((L/o|0)<f||R[L]&&!Br.has(R[L])&&!c[L]?(r.m[L]=R[L],r.n[L*3]=T[L*3],r.n[L*3+1]=T[L*3+1],r.n[L*3+2]=T[L*3+2]):c[L]=1)},g=()=>{for(let S=0;S<8;S++){const R=Math.round(xe(e,f,h-3)),T=m(R);if(T.length){const L=Sc(e,T),O=e()<.5?-1:1;return{x:O<0?L[0]:L[1],y:R,side:O}}}return null},v=p?0:1,w=h-1;let y=o,A=0;for(let S=0;S<f*o;S++)if(r.m[S]&&!Br.has(r.m[S])){const R=S%o;y=Math.min(y,R),A=Math.max(A,R)}const b=Math.max(6*i,(A-y)*.22);s.moss&&x(()=>{for(let S=Math.max(f,Math.round(h-(h-f)*.4));S<h;S++)for(let R=0;R<o;R++){const T=S*o+R;if(!Br.has(r.m[T]))continue;const L=S>0&&!r.m[T-o];(Ei(R/2.5,S/2.5,41)>1-s.moss*(.35+.4*(S-f)/(h-f))||L&&pt(R,S,9)<s.moss*.6)&&(r.m[T]=pt(R,S,5)<.3?l.LEAF2:l.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&x(()=>{let S=o/2;const R=w-(w-f)*xe(e,.45,.95)*Math.min(1,s.ivy+.3),T=e()*6;for(let L=w-1;L>R;L--){const O=M(m(L),S);if(!O)break;if(S=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(L*.22+T)),r.px(S,L,l.LEAF3,0,0,1),pt(Math.round(S),L,13)<.45){const I=pt(L,3,2)<.5?-1:1;r.px(S+I,L,l.LEAF,I*.5,-.3,.8),r.px(S+I*2,L,l.LEAF3,I*.6,0,.8),r.px(S+I,L-1,pt(S,L,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const E=Math.round(s.sprigs*v*(5+8*u)*(h-f)/(40*i));for(let S=0;S<E;S++){const R=g();if(!R)break;const T=xe(e,3,5.5)*i;x(()=>Sn(r,[R.x+R.side*T*.6,R.y],T,T*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const _=Math.round(s.boughs*v*(3+4*u)*(h-f)/(45*i)+(e()<s.boughs*v?1:0));for(let S=0;S<_;S++){const R=g();if(!R)break;x(()=>{const T=vn(r,[R.x,R.y],-Math.PI/2+R.side*xe(e,.9,1.35),Math.min(b,xe(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),L=xe(e,6,9.5)*i;Sn(r,_t(T.end,[0,-1*i]),L,L*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(s.skirt&&v){const S=Math.round(3+s.skirt*5+u*3);for(let R=0;R<S;R++)x(()=>{const T=Math.round(xe(e,Math.max(f,h-(h-f)*.8),h-4*i)),L=M(m(T),o/2);if(!L)return;const O=R%2?1:-1,I=O<0?L[0]:L[1],U=Math.min(b*1.3,xe(e,14,24)*i*(.6+s.skirt*.5)),B=vn(r,[I,T],-Math.PI/2+O*xe(e,1.6,1.95),U,1.6*i,1,t,e,{group:12,mat:l.BARKD});Sn(r,Cn([I,T],B.end,.6),U*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const Ap={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},Tp=(n,e)=>(t,i,s)=>Ep(n(t,i,s),t,i,s,e),Za={broad:{fn:rp,name:"gnarled broadleaf",grow:"normal"},fir:{fn:ap,name:"spruce",grow:"narrow",hue:.06},willow:{fn:op,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Sd,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:lp,name:"field maple",grow:"normal",hue:.01},oak:{fn:cp,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:hp,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:up,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:dp,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:fp,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:pp,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:mp,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:gp,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:xp,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:Mp,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:vp,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:_p,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:bp,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:yp,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:wp,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Za))e.bare=e.fn,e.fn=Tp(e.fn,Ap[n]||{});const Rp=new Map(Object.entries(Za).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),Dc=n=>Za[n]||Za.broad;function xo(n,e,t){const i=Rp.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:me(e.trunkHue,.45*e.sat,.34),[l.BARKD]:me(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:me(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:me(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[l.LEAF2]:me(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[l.LEAF3]:me(h+.03,Math.min(1,.66*e.sat*s),.38*r),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=me(...i.trunk)),i?.upper&&(c[l.BELLY]=me(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function Ed(n){const{sp:e,crownY:t}=n,i=new mt(e.w,e.h),s=new mt(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Br.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function Cp(n,e){const t=e.bushSize,i=Sc(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new mt(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)Sn(a,[s/2+xe(n,-9,9)*t,r-8*t+xe(n,-4,2)*t],xe(n,7,10)*t,xe(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const f=s/2+xe(n,-12,12)*t,d=r-xe(n,5,17)*t;a.get(f,d)&&a.recolour(f,d,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let f=s/2,d=r-1;for(let u=0;u<15*t;u++)f+=Math.cos(c)*.9,d+=Math.sin(c)*.9+u*.06,a.put(f,d,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(f,d-1,l.LEAF2,0,-.5,.85),a.put(f+Math.sign(Math.cos(c)),d+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=s/2+xe(n,-13,13)*t,f=xe(n,5,15)*t,d=xe(n,-3,3);for(let u=0;u<f;u++)a.put(c+d*u/f*(u/f),r-1-u,u>f*.65?l.LEAF2:u<f*.3?l.LEAF3:l.LEAF,d*.1,-.3,.9)}const o=xo(n,e,null);return o[l.FLOWER]=me(n(),.55,.95),{sp:a,colours:o}}const Ze=(n,e={})=>["tree",{type:n,...e}],qe=(n,e={})=>[n,e],vr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[qe("water",{w:1.6})],small:[qe("grass",{h:1.4})],big:[qe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[qe("fern")],big:[Ze("larch",{scale:1.1}),Ze("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[qe("stump",{snag:!0})],big:[Ze("sycamore",{trunks:3,gnarl:.9}),Ze("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[qe("henge")],small:[qe("stones")],big:[qe("boulder")],set:qe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[qe("bramble",{bare:!0})],big:[Ze("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ze("birch",{scale:.75})],big:[Ze("lime",{trunks:3,thick:1.4}),Ze("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[qe("mound",{brown:!0})],big:[Ze("hazel",{gnarl:1,scale:.95}),Ze("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[qe("wall")],small:[qe("flowerbed")],big:[Ze("willow")],set:qe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ze("broad",{trunks:4,scale:.5,thin:!0})],big:[Ze("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[qe("flowers",{hue:.98,leafy:!0})],big:[Ze("yew",{scale:1.4,gnarl:1,lean:.35}),Ze("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[qe("stones",{big:!0})],big:[Ze("fir",{scale:1.2}),Ze("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[qe("stump",{grass:!0})],big:[Ze("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[qe("shrub",{flower:[250,245,235]})],big:[Ze("chestnut",{scale:1.1}),Ze("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[qe("cones",{acorn:!0}),qe("log",{branch:!0})],big:[Ze("oak",{gnarl:.9,hollow:!0}),Ze("holly",{minor:!0,scale:.8})],set:Ze("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[qe("bramble")],small:[qe("shrub",{flower:[200,30,60]})],big:[Ze("pine",{scale:1.2}),Ze("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[qe("water"),qe("reeds",{tall:!0})],small:[qe("reeds")],big:[Ze("willow"),Ze("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[qe("water",{w:2})],small:[Ze("broad",{scale:.45})],big:[Ze("alder",{scale:.95,gnarl:.3}),Ze("willow",{minor:!0,scale:.8})],set:qe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[qe("boulder",{big:!0})],small:[qe("stones",{big:!0})],big:[Ze("rowan",{scale:1.1}),Ze("pine",{minor:!0})],set:qe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[qe("water",{bog:!0})],small:[qe("reeds",{cotton:!0})],big:[Ze("birch",{scale:.8,dark:!0}),Ze("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[qe("log",{branch:!0})],big:[Ze("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[qe("rockwall")],small:[qe("stalagmite")],big:[Ze("broad",{bare:!0}),Ze("yew",{minor:!0,scale:.8})],set:qe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[qe("mound",{brown:!0,small:!0})],big:[Ze("flat",{scale:1.1}),Ze("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[qe("water",{w:2})],small:[qe("stump",{gnawed:!0})],big:[Ze("weepingBirch"),Ze("alder",{minor:!0,scale:.8})],set:qe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[qe("fungi")],big:[qe("log",{rot:!0})],set:qe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[qe("shrub",{flower:[250,205,40],spiky:!0})],big:[Ze("birch",{lean:.45,scale:.75}),Ze("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[qe("cones")],big:[Ze("pine",{scale:1.35}),Ze("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[qe("rockwall",{moss:!0})],small:[qe("fern")],big:[qe("boulder",{moss:!0,big:!0})],set:qe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[qe("fern")],big:[Ze("beech",{gnarl:.2,scale:1.1}),Ze("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[qe("hedge",{berries:!0})],small:[qe("web")],big:[Ze("holly",{scale:.9}),Ze("yew",{minor:!0,scale:.7})],set:Ze("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[qe("bramble")],small:[qe("shrub",{flower:[250,230,170]})],big:[Ze("hazel",{trunks:5,scale:.7,thin:!0}),Ze("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(Md)){const i=vr.find(s=>s.id===n);i&&!i.set&&(i.set=qe(e,{three:!0}),i.text={...i.text,set:t})}const Ad=Object.fromEntries(vr.map(n=>[n.id,n])),Lp=["ruins","rocks","freak","lake","modern"],Tt=(n,e,t,i,s,r,a,o,h,c,f={})=>({pattern:n,...f,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(Lp.map((d,u)=>[d,h[1][u]]))},feel:c}),Wt=[0,0],Pp={moor:Tt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Tt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Wt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Tt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Wt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Tt("rings",.35,.8,[1,[10,14]],null,.3,Wt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Tt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Wt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Tt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Wt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Tt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Wt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Tt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Wt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Tt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Tt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Tt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Wt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Tt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Tt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Wt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Tt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Wt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Tt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Wt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Tt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Wt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Tt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Wt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Tt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Tt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Wt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Tt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Wt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Tt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Wt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Tt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Wt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Tt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Wt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Tt("groves",.5,.7,[2,[6,10]],null,.7,Wt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Tt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Tt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Wt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Tt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Wt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Tt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Wt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Tt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Wt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Tt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Wt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of vr)n.layout=Pp[n.id];function Dp(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new mt(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let x=0;x<t;x++){const g=(Ei(x/7,M/5,c)*(t-x)*(i-M)+Ei((x-t)/7,M/5,c)*x*(i-M)+Ei(x/7,(M-i)/5,c)*(t-x)*M+Ei((x-t)/7,(M-i)/5,c)*x*M)/(t*i),v=g<.38?l.BODY2:g>.64?l.BELLY:l.BODY;h.px(x,M,v,0,-.42,.91)}const f=Qr(c),d=(M,x,g)=>h.px((M%t+t)%t,(x%i+i)%i,g,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const x=Math.floor(f()*t),g=Math.floor(f()*i);if(s==="needles"){const v=f()<.5?1:-1;for(let w=0;w<3;w++)d(x+w*v,g+(w>>1),f()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let w=0;w<v;w++)d(x,g-w,w===v-1?l.LEAF2:l.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&f()<.5&&d(x+1,g-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(d(x,g,l.ACCENT),f()<.6&&d(x+1,g,l.ACCENT),f()<.4&&d(x,g+1,l.BODY2),s==="roots"&&f()<.5)for(let v=0;v<5;v++)d(x+v,g+(v>2?1:0),l.TRUNK)}else if(s==="leaves")d(x,g,l.FLOWER),d(x+1,g,l.FLOWER),f()<.5&&d(x,g+1,l.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)d(x+v,g,l.BODY2)}const p={flowers:me(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:me(r+.02,.65,.6)}[s]||me(r,.3,.6),m={[l.BODY]:me(r,a*e.sat,o),[l.BODY2]:me(r+.02,a*e.sat*1.1,o*.78),[l.BELLY]:me(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:s==="needles"?me(.07,.5,.5):me(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:me(n.leaf,.55*e.sat,.45),[l.LEAF2]:me(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:me(e.trunkHue,.4,.3)};return{sp:h,colours:m}}const xs=n=>({[l.ACCENT]:me(.1,.06,.6),[l.BODY2]:me(.62,.08,.4),[l.BELLY]:me(.1,.05,.78),[l.LEAF]:me(.27,.5,.45),[l.LEAF2]:me(.25,.45,.62),[l.NOSE]:[20,16,24]});function ir(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,f=1+(r()-.5)*.3;o.push([e[0]+Math.cos(c)*t*f,e[1]+Math.sin(c)*i*f*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:s.round}),n.mark([_t(e,[-t,i*.1]),_t(e,[t,i*.1]),_t(e,[t,i]),_t(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([_t(e,[-t*.6,-i*.8]),_t(e,[t*.1,-i*1.1]),_t(e,[t*.3,-i*.5]),_t(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(po([_t(e,[-t*1.1,-i*.55]),_t(e,[0,-i*1.3]),_t(e,[t*1.1,-i*.5]),_t(e,[t*.6,-i*.2]),_t(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function Ha(n,e,t,i,s,r){const a={[l.LEAF]:me(t.leaf,.6*i.sat,.55),[l.LEAF2]:me(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:me(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:me(i.trunkHue,.45*i.sat,.34),[l.BARKD]:me(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:me(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:me(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=Dc(e.type).fn,x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},g=M(s,x,i.treeSize*r*(e.scale||1)*xe(s,.9,1.1)),v=xo(s,x,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=me(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:g.sp,colours:v}}if(n==="shrub"){const M=Cp(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let x=0;x<M.sp.m.length;x++)M.sp.m[x]&&pt(x,1,3)<(e.spiky?.18:.1)&&M.sp.m[x]!==l.TRUNK&&(M.sp.m[x]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*r*(e.w||1)),f=Math.round(32*r),d=new mt(c,f),u=c/2,p=f;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&d.shape([[u-20*r,p-2],[u-18*r,p-6*r],[u+18*r,p-6*r],[u+20*r,p-2],[u+20*r,p],[u-20*r,p]],l.ACCENT,{group:2,line:!0});for(let g=0;g<M;g++){const v=u+xe(s,-16,16)*r,w=x*xe(s,.5,1),y=n==="fern"?xe(s,-6,6)*r:xe(s,-2,2)*r,A=p-1-(n==="flowerbed"?5*r:0);for(let b=0;b<w;b++){const E=b/w;d.px(v+y*E*E,A-b,E>.7?l.LEAF2:E<.3?l.LEAF3:l.LEAF,y*.05,-.3,.9),n==="fern"&&b%2&&d.px(v+y*E*E+(y>0?1:-1),A-b+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let b=0;b<(e.cotton?2:3);b++)d.px(v+y,A-w-b,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(d.px(v+y,A-w,l.FLOWER,0,-.5,.85),d.px(v+y+1,A-w,l.FLOWER,0,-.5,.85))}if(m={...a,[l.FLOWER]:n==="flowerbed"?Sc(s,[[230,80,120],[250,210,60],[150,110,230]]):me(e.hue??.95,.6,.85),[l.TRUNK]:me(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:me(.08,.1,.55)},n==="flowerbed"){for(let g=0;g<d.m.length;g++)d.m[g]===l.FLOWER&&pt(g,2,7)<.5&&(d.m[g]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)ir(d,[u+xe(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*xe(s,.7,1.2),(e.big?5:2.5)*r,i,s);m=xs()}else if(n==="boulder")ir(d,[u,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),m={...xs(),...a,[l.ACCENT]:me(.1,.06,.6)};else if(n==="henge")d.shape([[u-7*r,p],[u-8*r,p-18*r],[u-4*r,p-28*r],[u+5*r,p-27*r],[u+8*r,p-14*r],[u+7*r,p]],l.ACCENT,{group:5,line:!0,round:i.round}),d.mark([[u-9*r,p-30*r],[u+9*r,p-30*r],[u+9*r,p-22*r],[u-9*r,p-18*r]],l.LEAF,[l.ACCENT]),m={...xs(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,x=(e.small?5:8)*r;d.shape(po([[u-M,p],[u-M*.6,p-x*.8],[u,p-x],[u+M*.6,p-x*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),d.mark([[u-M,p-x*.45],[u+M,p-x*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...a,...o,[l.TRUNK]:me(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(d.limb([[u,p,M*2.2],[u,p-8*r,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),d.shape([[u-M*.8,p-8*r],[u,p-10*r-(e.gnawed?4*r:0)],[u+M*.8,p-8*r],[u,p-7*r]],l.BELLY,{group:6,round:i.round}),e.snag&&d.limb([[u+M*.4,p-8*r,2.5*r],[u+M*1.6,p-15*r,1.5*r]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const g=u+xe(s,-14,14)*r,v=xe(s,6,13)*r;for(let w=0;w<v;w++)d.px(g,p-1-w,w>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,x=(e.giant?14:e.branch?3:8)*r;if(d.limb([[u-M/2,p-x/2,x],[u+M/2,p-x/2-(e.branch?2*r:0),x*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||d.shape([[u+M/2-x*.1,p-x],[u+M/2+x*.2,p-x/2],[u+M/2-x*.1,p],[u+M/2-x*.3,p-x/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let g=0;g<(e.giant?6:3);g++){const v=u+xe(s,-M/2,M/3);d.shape([[v-3*r,p-x*.9],[v,p-x-3*r],[v+3*r,p-x*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&d.limb([[u,p-x,x*.7],[u+5*r,p-x-6*r,x*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const x=u+xe(s,-12,12)*r,g=xe(s,3,7)*r,v=xe(s,3,5)*r;d.limb([[x,p,1.6*r],[x,p-g,1.4*r]],l.BELLY,{group:5}),d.shape([[x-v,p-g],[x,p-g-v*.8],[x+v,p-g]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const x=u+xe(s,-14,14)*r,g=p-2*r;d.ellipse(x,g,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,l.TRUNK,{round:i.round}),e.acorn?d.ellipse(x,g-1.6*r,1.8*r,1*r,l.BARKD,{round:i.round}):d.px(x,g-1,l.BARKL)}m=o}else if(n==="water"){const M=22*r*(e.w||1),x=6*r;d.shape([[u-M,p-x],[u-M*.3,p-x*1.5],[u+M*.6,p-x*1.2],[u+M,p-x*.5],[u+M*.4,p],[u-M*.7,p-x*.2]],l.MAGIC,{group:5,round:.2});for(let g=0;g<6;g++){const v=u+xe(s,-M*.6,M*.6),w=p-x*xe(s,.4,1.1);for(let y=0;y<3*r;y++)d.recolour(v+y,w,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let g=0;g<d.m.length;g++)d.m[g]===l.MAGIC?d.m[g]=l.BODY:d.m[g]===l.MAGIC2&&(d.m[g]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,x=(n==="hedge"?18:12)*r;for(let g=0;g<(n==="hedge"?6:4);g++){const v=u+xe(s,-M*.8,M*.8),w=p-x*xe(s,.4,.7);d.ellipse(v,w,xe(s,6,9)*r,x*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:g})}for(let g=0;g<8;g++){let w=u+xe(s,-M,M),y=p;for(let A=0;A<x*1.2;A++)w+=Math.sin(A*.3+g)*.8,y-=.8,d.px(w,y,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let g=0;g<d.m.length;g++)d.m[g]&&d.m[g]!==l.TRUNK&&pt(g,5,9)<.05&&(d.m[g]=l.FLOWER);m={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,x=12*r;d.shape([[u-M,p],[u-M,p-x],[u+M,p-x],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),d.shape([[u-M-1,p-x],[u-M-1,p-x-2*r],[u+M+1,p-x-2*r],[u+M+1,p-x]],l.BELLY,{group:6,line:!0,depth:2}),d.shape([[u+M-6*r,p-x-2*r],[u+M-6*r,p-x-7*r],[u+M,p-x-7*r],[u+M,p-x-2*r]],l.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(u+M-3*r,p-x-9*r,3*r,2.5*r,l.BELLY,{round:i.round});for(let g=p-x+3*r;g<p;g+=4*r)for(let v=u-M;v<u+M;v++)d.recolour(v,g,l.BODY2);m=xs()}else if(n==="rockwall"){for(let M=0;M<5;M++)ir(d,[u+(M-2)*9*r,p-xe(s,8,14)*r],8*r,10*r,i,s,e.moss);m={...xs(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const x=u+xe(s,-14,14)*r,g=xe(s,5,11)*r;d.shape([[x-3*r,p],[x-1*r,p-g],[x+1*r,p-g],[x+3*r,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=xs()}else if(n==="web"){const M=[u,p-14*r],x=11*r;for(let g=0;g<8;g++){const v=g/8*Math.PI*2;for(let w=0;w<x;w++)d.px(M[0]+Math.cos(v)*w,M[1]+Math.sin(v)*w,l.WEB,0,0,1)}for(let g=3*r;g<x;g+=3*r)for(let v=0;v<Math.PI*2;v+=.05)d.px(M[0]+Math.cos(v)*g,M[1]+Math.sin(v)*g,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:d,colours:m}}function Ip(n,e,t,i,s,r){if(e.three)return M0(n,t,i);if(n==="tree"||n==="log")return Ha(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new mt(a,o),c=a/2,f=o;let d={...xs(),[l.LEAF]:me(t.leaf,.55,.5),[l.LEAF2]:me(t.leaf-.04,.5,.7),[l.TRUNK]:me(i.trunkHue,.45,.34),[l.BARKD]:me(i.trunkHue+.03,.5,.17),[l.MAGIC]:me(i.magicHue,.6,1),[l.MAGIC2]:me(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*r,f],[c-14*r,f-6*r],[c+14*r,f-6*r],[c+16*r,f]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*r,f-6*r],[c-9*r,f-26*r],[c+9*r,f-26*r],[c+9*r,f-6*r]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*r,f-10*r],[c-5*r,f-20*r],[c,f-23*r],[c+5*r,f-20*r],[c+5*r,f-10*r]],l.NOSE,{group:7}),h.shape([[c-13*r,f-26*r],[c,f-34*r],[c+13*r,f-26*r]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,f-13*r,2.5*r,2.5*r,l.MAGIC2,{round:.5}),h.mark([[c-14*r,f-36*r],[c+2*r,f-36*r],[c-4*r,f-24*r],[c-14*r,f-24*r]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*r,f],[c-26*r,f-4*r],[c+26*r,f-4*r],[c+26*r,f]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*r,f-4*r,4*r],[c+u*r,f-34*r,4*r]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*r,f-34*r],[c-28*r,f-38*r],[c+28*r,f-38*r],[c+28*r,f-34*r]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*r,f-38*r],[c-16*r,f-54*r],[c,f-60*r],[c+16*r,f-54*r],[c+24*r,f-38*r]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=Ha("water",{w:1.8},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=f-u.sp.h+M;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*r,f-6*r,9*r],[c+34*r,f-10*r,8*r]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])ir(h,[c+u*r,f-p*r],m*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])ir(h,[c+u*r,f-p*r],m*r,M*r,i,s,p>30);h.shape([[c-15*r,f],[c-14*r,f-18*r],[c-4*r,f-28*r],[c+6*r,f-27*r],[c+14*r,f-16*r],[c+15*r,f]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=Ha("water",{w:1.9},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=f-u.sp.h+M-10*r;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+xe(s,-32,32)*r,M=f-xe(s,2,14)*r,x=xe(s,-.5,.5),g=xe(s,8,16)*r;h.limb([[m-Math.cos(x)*g/2,M-Math.sin(x)*g/2,2.6*r],[m+Math.cos(x)*g/2,M+Math.sin(x)*g/2,2*r]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])ir(h,[c+u*r,f-p*r],m*r,M*r,i,s,!0);for(let u=c-6*r;u<c+6*r;u++)for(let p=f-50*r;p<f-4*r;p++)h.px(u,p,pt(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*r,f],[c-14*r,f-6*r],[c+14*r,f-6*r],[c+18*r,f]],l.IRIS,{group:10,round:.2}),d[l.IRIS]=[90,150,190],d[l.PUPIL]=[210,235,245]}return{sp:h,colours:d}}function Op(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Jr}={}){const s=Ad[n];if(!s)throw new Error(`no area type "${n}"`);const r=Qr(n.split("").reduce((f,d)=>f*31+d.charCodeAt(0),7)>>>0),a=(f,d,u)=>({sp:Mn(f.sp,f.colours,e,"none",i),kind:d,text:u}),o=Dp(s,e),h=f=>(f||[]).map(([d,u])=>a(Ha(d,u,s,e,r,t),d,"")),c={def:s,floor:{sp:Mn(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(c.walls.forEach(f=>f.text=s.text.wall),c.small.forEach(f=>f.text=s.text.small),c.big.forEach(f=>f.text=s.text.big),s.set){const f=Ip(s.set[0],s.set[1],s,e,r,t);c.setPiece={...a(f,s.set[0],s.text.set),metres:f.metres,origin:f.origin}}return c}const Fp=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],Np=16;function Up(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Jr,ppm:s=Np}={}){const r=Ad[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,f=[];let d=0;for(const u of Fp)for(let p=0;p<u.count;p++,d++){const m=h.length&&(d===2||d===6)?h[(d===6?1:0)%h.length]:o[d%o.length],M=Dc(m.type),x=M.fn,g=Qr(c*7+d*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,w=u.id==="sapling",y=u.id==="tall"||u.id==="giant",A=M.grow,b=A==="willow",E=A==="narrow"||m.bare,_=A==="wide",R=b?1+(v-1)*.45:A==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,T=(w?.78:1)*(b?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:E&&y?m.bare?.6:.85:y?1.06:1),L={...e,crownWidth:(e.crownWidth||3)*T,leafHue:r.leaf+(m.dark?.05:0),gnarl:Math.min(1,(m.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:m.bare,treeTrunks:w?1:m.trunks,treeLean:m.lean,treeThick:w?void 0:y&&m.thick?m.thick*1.1:m.thick,treeThin:w||m.thin,treeHollow:y&&m.hollow,treeWebs:m.webs},O=x(g,L,e.treeSize*t*(m.scale||1)*R*xe(g,.95,1.05)),I=xo(g,L,x);m.dark&&(I[l.LEAF]=I[l.LEAF3],I[l.LEAF3]=me(r.leaf+.05,.7,.22)),I[l.NOSE]=[20,16,24],I[l.WEB]=[225,225,232];const U=Ed(O),B=se=>Mn(se,I,e,"none",i),Y=se=>+(se/s).toFixed(2);f.push({heightClass:u.id,species:m.type,scale:+R.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:B(O.sp),top:B(U.top),bot:B(U.bot),crownY:O.crownY,metres:{height:Y(O.sp.h),crownBase:Y(O.sp.h-O.crownY),crownHeight:Y(O.crownY),crownRadius:Y(O.sp.w/2)}})}return f}const kp={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function Bp(n){const e=new et({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:s=>s[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:s=>s[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,As.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=dn(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,l.MAGIC2)}return i}const Ga={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function Td(n,e){const t=new et({blend:.04}),i=Object.keys(Ga).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=P.norm([Math.sin(r),.22,Math.cos(r)]),h=P.norm(P.cross(o,a)),c=[0,.46,0],f=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],d=(x,g)=>f.some(v=>v.some((w,y)=>{const A=v[y+1];if(!A)return!1;const b=A[0]-w[0],E=A[1]-w[1],_=Math.max(0,Math.min(1,((x-w[0])*b+(g-w[1])*E)/(b*b+E*E)));return Math.hypot(x-w[0]-b*_,g-w[1]-E*_)<.014})),u=x=>{const g=P.sub(x,c),v=[P.dot(g,a),P.dot(g,h)+.46,P.dot(g,o)];if(v[2]>s-.02){const w=(v[0]+.17)/.34,y=(.8-v[1])/.5;if(e){const A=(v[0]+.27)/.54,b=(.8-v[1])/.58;if(A>=0&&A<=1&&b>=0&&b<=1&&wd(e,A,b,.055))return l.RUNE}else if(w>=0&&w<=1&&y>=0&&y<=1&&ud(w,y,i+1,.1))return l.RUNE}if(d(v[0],v[1]))return l.STONED;if(v[1]>.86&&pt(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&pt(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,s],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(P.add(P.add(c,P.mul(h,.53)),P.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:P.add(a,P.mul(h,.35)),up:h,cut:!0,paint:u});for(const[x,g,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,g],[v,v*.4,v],l.MOSS,{group:2});for(let x=0;x<9;x++){const g=-.3+x*.07,v=.12+x%3*.025-x*.02,w=.07+x*37%5/60;t.seg([g,0,v],[g+(x%3-1)*.02,w,v+.01],.012,.004,x%3?l.LEAF:l.LEAF2,{group:10+x})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:Ga[n][0],[l.MAGIC2]:Ga[n][1],[l.LINE]:[40,40,50]},m=dn(t,{height:44}).sp;let M=0;for(let x=0;x<600&&M<5;x++){const g=Math.floor(pt(x,i,9)*m.w),v=Math.floor(pt(x,i,10)*m.h*.8);m.get(g,v)||m.get(g+1,v)||m.get(g-1,v)||m.get(g,v+1)||m.get(g,v-1)||(m.px(g,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:m,colours:p}}function zp(){const n=new et({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],l.ACCENT,{group:30});return{sp:dn(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function Hp(n,{glow:e="cyan",sigil:t,makeCanvas:i=Jr}={}){const s=Td(e,t);return Mn(s.sp,s.colours,n,"none",i)}function Gp(n,{makeCanvas:e=Jr}={}){const t=(c,f)=>Mn(c,f,n,"none",e),i={campfire:[0,1,2].map(c=>t(Bp(c),kp)),stones:{},pond:null};for(const c of Object.keys(Ga)){const f=Td(c);i.stones[c]=t(f.sp,f.colours)}const s=zp(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let c=0;c<s.sp.m.length;c++)s.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function Wp(n,e){const t=new Map,i=new Map,s=(h,c,f)=>(h*2097152+(c+1048576))*2097152+(f+1048576),r=(h,c,f)=>{const d=s(h,c,f);let u=t.get(d);if(!u){const p=Math.pow(2,-h);u=[p*(c+Le(c*7+h,f,n)),p*(f+Le(c,f*13+h,n+1))],t.set(d,u)}return u},a=(h,c,f)=>{const d=Math.pow(2,-h),u=Math.floor(c/d),p=Math.floor(f/d);let m=u,M=p,x=1/0;for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const w=r(h,u+g,p+v),y=(w[0]-c)**2+(w[1]-f)**2;y<x&&(x=y,m=u+g,M=p+v)}return[m,M]},o=(h,c,f)=>{const d=s(h,c,f);let u=i.get(d);if(u)return u;if(h===0)u=[c,f];else{const p=r(h,c,f),m=a(h-1,p[0],p[1]);u=o(h-1,m[0],m[1])}return i.set(d,u),u};return{seed:n,depth:e,site:(h,c)=>r(0,h,c),partition(h,c){const f=a(e,h,c);return o(e,f[0],f[1])},centreness(h,c,f){const d=r(0,f[0],f[1]),u=Math.hypot(h-d[0],c-d[1]);let p=1/0;const m=Math.floor(h),M=Math.floor(c);for(let x=-2;x<=2;x++)for(let g=-2;g<=2;g++){const v=m+x,w=M+g;if(v===f[0]&&w===f[1])continue;const y=r(0,v,w);p=Math.min(p,Math.hypot(h-y[0],c-y[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let f=1/0,d=1/0;const u=Math.floor(h),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const x=r(0,u+m,p+M),g=Math.hypot(h-x[0],c-x[1]);g<f?(d=f,f=g):g<d&&(d=g)}return Math.min(1,2*f/(f+d))}}}function Ch(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),f=Math.max(1,Math.ceil(c/e));for(let d=0;d<f;d++){const u=d/f,p=u*u,m=p*u,M=(x,g,v,w)=>.5*(2*g+(-x+v)*u+(2*x-5*g+4*v-w)*p+(-x+3*g-3*v+w)*m);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const Vp=new Set(["stream","wetland","bog","beaver-pond"]);class Yp{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=ui(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(m,M)=>m===0?[i.minX+M*r,i.minZ]:m===1?[i.maxX,i.minZ+M*a]:m===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(m,M,x,g)=>{const v=M[0]-m[0],w=M[1]-m[1],y=Math.hypot(v,w),A=Math.max(2,Math.round(y/x)),b=[m];let E=0;for(let _=1;_<A;_++){E=Rn(E+(s()-.5)*g,-g,g);const S=_/A;b.push([Rn(m[0]+v*S-w/y*E,i.minX,i.maxX),Rn(m[1]+w*S+v/y*E,i.minZ,i.maxZ)])}return b.push(M),Ch(b,3)},c=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let m=0;m<c;m++){const M=Math.floor(s()*4),x=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,g=h(o(M,.15+s()*.7),o(x,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:g,half:t.railHalf}),m===0&&g.length>20){const v=Math.floor(g.length*(.3+s()*.4)),w=g[v],y=Math.floor(s()*4),A=h(w,o(y,.2+s()*.6),300,120);this.lines.push({kind:"rail",pts:A,half:t.railHalf});const b=g[v+1][0]-w[0],E=g[v+1][1]-w[1],_=Math.hypot(b,E)||1,S=A[Math.min(A.length-1,6)],R=b*(S[1]-w[1])-E*(S[0]-w[0]);this.junctions.push({x:w[0],z:w[1],dx:b/_,dz:E/_,side:R>=0?1:-1,line:this.lines.length-2})}}const f=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let m=0;m<f;m++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),240,110),half:t.roadHalf})}const d=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let m=0;m<d;m++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),90,70),half:t.streamHalf})}const u=(m,M)=>Vp.has(Rt[e.typeOf(m,M)].id);for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);if(u(x,g))for(const v of M){const[w,y]=v.split(",").map(Number);if(m>v||!u(w,y))continue;const[A,b]=this.trim(e.siteOf(x,g),e.siteOf(w,y),this.clearOf(x,g),this.clearOf(w,y));A&&this.lines.push({kind:"stream",pts:this.meander(A,b,s),half:t.streamHalf})}}const p=new Set;for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);for(const v of M){const w=m<v?`${m}|${v}`:`${v}|${m}`;if(p.has(w))continue;p.add(w);const[y,A]=v.split(",").map(Number);if(y<0||A<0||y>=e.n||A>=e.n||Le(x*31+y,g*31+A,e.seed+811)>t.linkChance)continue;const[b,E]=this.trim(e.siteOf(x,g),e.siteOf(y,A),this.clearOf(x,g),this.clearOf(y,A));b&&this.lines.push({kind:"path",pts:this.meander(b,E,s),half:t.pathHalf})}if(Le(x,g,e.seed+813)<t.deadEndChance){const v=e.siteOf(x,g),w=s()*Math.PI*2,y=30+s()*40,A=this.clearOf(x,g),b={x:v.x+Math.cos(w)*A,z:v.z+Math.sin(w)*A};this.lines.push({kind:"path",pts:this.meander(b,{x:b.x+Math.cos(w)*y,z:b.z+Math.sin(w)*y},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((m,M)=>{const x=e.areaAt(m.pts[0][0],m.pts[0][1]);m.area={cell:[x.cell[0],x.cell[1]],type:x.type};for(let g=0;g<m.pts.length-1;g++){const[v,w]=[m.pts[g],m.pts[g+1]],y=m.half+4;for(let A=Math.floor((Math.min(v[0],w[0])-y)/this.cell);A<=Math.floor((Math.max(v[0],w[0])+y)/this.cell);A++)for(let b=Math.floor((Math.min(v[1],w[1])-y)/this.cell);b<=Math.floor((Math.max(v[1],w[1])+y)/this.cell);b++){const E=`${A},${b}`;let _=this.grid.get(E);_||this.grid.set(E,_=[]),_.push([M,g])}}})}map;lines=[];pieces=[];junctions=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,s=(d,u,p,m)=>{if(e.hardClear(u,p)||e.reserved(u,p,m)||this.pieces.some(v=>Math.hypot(v.x-u,v.z-p)<Math.max(i.pieceGap,v.r+m)))return;const M={id:d,x:u,z:p,r:m};this.pieces.push(M);const x=`${Math.floor(u/this.cell)},${Math.floor(p/this.cell)}`;let g=this.pieceGrid.get(x);g||this.pieceGrid.set(x,g=[]),g.push(M)},r=(d,u,p)=>{const m=d.pts[u],M=d.pts[Math.min(d.pts.length-1,u+1)],x=M[0]-m[0],g=M[1]-m[1],v=Math.hypot(x,g)||1;return[m[0]-g/v*p,m[1]+x/v*p]};this.lines.forEach((d,u)=>{let p=0,m=!1;for(let M=1;M<d.pts.length;M++){const[x,g]=d.pts[M],v=Math.hypot(x-d.pts[M-1][0],g-d.pts[M-1][1]);if(p+=v,d.kind==="rail"){const w=this.railBroken(x,g);if(w&&!m&&Le(u,M,t+841)<.5&&s("buffer-stop",x,g,4),m=w,p>=i.landmarkSpacing){p=0;const y=Le(u,M,t+843);if(y<i.landmarkChance){const A=["goods-wagon","carriage","platform","signal-gantry"];s(A[Math.floor(Le(u,M,t+845)*A.length)],x,g,7)}else y<i.landmarkChance+.3&&!w&&s("signal-post",...r(d,M,d.half-.6),1.2)}}else d.kind==="road"&&p>=i.vergeSpacing&&(p=0,s("verge-post",...r(d,M,(Le(u,M,t+847)<.5?1:-1)*(d.half-.7)),.8))}});const a=new Set(["ravine","rocky-slope","cave-mouth","stone-shrine"]),o=[];for(let d=0;d<e.n;d++)for(let u=0;u<e.n;u++)a.has(Rt[e.typeOf(u,d)].id)&&o.push([u,d,Le(u,d,t+849)]);o.sort((d,u)=>d[2]-u[2]);let h=0;const c=["stairs","stairs-turn"];for(const[d,u]of o){if(h>=c.length)break;const p=e.siteOf(d,u),m=Le(d,u,t+851)*Math.PI*2,M=this.clearOf(d,u)+4;for(let x=0;x<12;x++){const g=m+x/12*Math.PI*2,v=p.x+Math.cos(g)*M,w=p.z+Math.sin(g)*M,y=e.areaAt(v,w).cell;if(y[0]!==d||y[1]!==u||this.at(v,w,3))continue;const A=this.pieces.length;if(s(c[h],v,w,3),this.pieces.length>A){h++;break}}}const f=new Set;this.lines.forEach((d,u)=>{if(!(d.kind!=="path"&&d.kind!=="road"))for(let p=0;p<d.pts.length-1;p++){const m=d.pts[p],M=d.pts[p+1],x=`${Math.floor(m[0]/this.cell)},${Math.floor(m[1]/this.cell)}`;for(const[g,v]of this.grid.get(x)??[]){const w=this.lines[g];if(w.kind!=="stream"&&!(w.kind==="rail"&&d.kind==="road"))continue;const y=w.pts[v],A=w.pts[v+1],b=Xp(m,M,y,A);if(!b)continue;const E=`${u}|${g}|${Math.round(b[0]/20)},${Math.round(b[1]/20)}`;f.has(E)||(f.add(E),w.kind==="stream"?s(d.kind==="road"||Le(u,g,t+853)<.5?"footbridge":"rope-bridge",b[0],b[1],4):s("level-crossing",...r(d,p,d.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)if(!(!i&&!s)){for(const r of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+s}`)??[])if(Math.hypot(r.x-e,r.z-t)<r.r)return r}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),f=i()<.5?1:-1;for(let d=1;d<o;d++){const u=d/o,p=c*(.4+.6*i())*(d%2?f:-f);h.push([e.x+s*u-r/a*p,e.z+r*u+s/a*p])}return h.push([t.x,t.z]),Ch(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[c,f]=[h.pts[o],h.pts[o+1]],d=f[0]-c[0],u=f[1]-c[1],p=d*d+u*u||1,m=Rn(((e-c[0])*d+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-d*m,t-c[1]-u*m);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return hi(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function Xp(n,e,t,i){const s=[e[0]-n[0],e[1]-n[1]],r=[i[0]-t[0],i[1]-t[1]],a=s[0]*r[1]-s[1]*r[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a,h=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+s[0]*o,n[1]+s[1]*o]:null}const Kp=jf.types,Rt=vr.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Kp[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),Nn=(n,e)=>n+","+e;function qp(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function $p(n,e,t,i){const s=new Map,r=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const f=Nn(h[0],h[1]),d=Nn(c[0],c[1]);s.has(f)||s.set(f,new Set),s.has(d)||s.set(d,new Set),s.get(f).add(d),s.get(d).add(f)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let f=0;f<=a;f++){const d=n.partition(e+f/i,e+h/i);c.push(d),f>0&&r(d,c[f-1]),h>0&&r(d,o[f])}o=c}return s}function Zp(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=Rt.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(G,$)=>{const fe=G/s,he=$/s;return[fe+o*(hi(fe/a,he/a,n+91)-.5)*2,he+o*(hi(fe/a,he/a,n+92)-.5)*2]},c=(G,$)=>{let fe=G*s,he=$*s;for(let J=0;J<30;J++){const[le,ve]=h(fe,he);fe+=(G-le)*s,he+=($-ve)*s}return[fe,he]},f=Wp(n,e.borderLayers),d=-i,u=t+i,p=$p(f,d,u,6),m=new Map,M=ui(n*5+1);for(let G=d;G<u;G++)for(let $=d;$<u;$++){const fe=new Set;for(let le=-2;le<=2;le++)for(let ve=-2;ve<=2;ve++){const Ie=m.get(Nn($+ve,G+le));Ie!==void 0&&fe.add(Ie)}for(const le of p.get(Nn($,G))??[]){const ve=m.get(le);ve!==void 0&&fe.add(ve)}const he=[...Array(r).keys()].filter(le=>!fe.has(le)),J=he.length?he:[...Array(r).keys()];m.set(Nn($,G),J[Math.floor(M()*J.length)])}const x=(G,$)=>m.get(Nn(G,$))??Math.floor(Le(G,$,n+17)*r),g=Math.floor(t/2),v=(G,$)=>{const fe=f.site(G,$),he=f.partition(fe[0],fe[1]);return he[0]===G&&he[1]===$};let w=[g,g];for(const[G,$]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(g+G,g+$)){w=[g+G,g+$];break}const y=(G,$)=>{const fe=f.site(G,$),he=c(fe[0],fe[1]);return{x:he[0],z:he[1]}},A=y(w[0],w[1]),b=(G,$)=>{const[fe,he]=h(G,$),J=f.partition(fe,he);return{cell:J,type:x(J[0],J[1]),openness:f.openness(fe,he)}},E=(G,$)=>!!Rt[x(G,$)].setPiece&&!(G===w[0]&&$===w[1])&&Le(G,$,n+61)<e.setPieceChance;let _=null;const S=(G,$)=>{if(!_){_=new Map;const he=[];for(let J=0;J<t;J++)for(let le=0;le<t;le++)E(le,J)&&he.push([le,J,Math.hypot(le-w[0],J-w[1])+Le(le,J,n+63)*.5]);he.sort((J,le)=>J[2]-le[2]);for(const[J,le]of he){const ve=x(J,le);!_.has(ve)&&re(J,le)&&_.set(ve,Nn(J,le))}}const fe=x(G,$);return _.get(fe)===Nn(G,$)?Rt[fe].setPiece:null},R=e.dancefloor.radius,T=R+e.dancefloor.clearing,L=(G,$,fe,he)=>{const J=b(G,$).cell;return J[0]===fe&&J[1]===he},O=new Map,I=(G,$)=>{const fe=Nn(G,$),he=O.get(fe);if(he)return he;const J=y(G,$),le=ui(n*17+G*53+$*911);let[ve,Ie]=[J.x,J.z];if(!L(J.x,J.z,G,$))e:for(let Ne=2;Ne<s*.75*1.5;Ne+=2)for(let Ge=0;Ge<16;Ge++){const z=Ge/16*Math.PI*2,$e=J.x+Math.cos(z)*Ne,Be=J.z+Math.sin(z)*Ne;if(L($e,Be,G,$)){[ve,Ie]=[$e,Be];break e}}let Ve={x:ve,z:Ie};for(let Ne=0;Ne<24;Ne++){const Ge=le()*Math.PI*2,z=3+le()*4,$e=ve+Math.cos(Ge)*z,Be=Ie+Math.sin(Ge)*z+3;if(L($e,Be,G,$)){Ve={x:$e,z:Be};break}}const Ke=(Ne,Ge)=>!!ee.paths.at(Ne,Ge,e.soundsystemFootprint+1);if(Ke(Ve.x,Ve.z))e:for(let Ne=3;Ne<s*.3;Ne+=3)for(let Ge=0;Ge<16;Ge++){const z=Ge/16*Math.PI*2,$e=Ve.x+Math.cos(z)*Ne,Be=Ve.z+Math.sin(z)*Ne;if(L($e,Be,G,$)&&!Ke($e,Be)){Ve={x:$e,z:Be};break e}}return O.set(fe,Ve),Ve},U=e.treehouse,B=U.angle*Math.PI/180,Y={x:A.x+Math.cos(B)*(T+U.distance),z:A.z+Math.sin(B)*(T+U.distance)},se=new Map,K=(G,$)=>S(G,$)?re(G,$):null,re=(G,$)=>{const fe=Nn(G,$);if(se.has(fe))return se.get(fe);let he=null;if(E(G,$)){const J=e.setPieceFootprint*e.setPieceScale,le=e.reserveMargin,ve=[Nn(G,$),...p.get(Nn(G,$))??[]].map(Ke=>{const[Ne,Ge]=Ke.split(",").map(Number);return I(Ne,Ge)}),Ie=(Ke,Ne)=>L(Ke,Ne,G,$)&&ve.every(Ge=>Math.hypot(Ke-Ge.x,Ne-Ge.z)>=J+e.soundsystemFootprint+le)&&Math.hypot(Ke-A.x,Ne-A.z)>=J+T+le&&Math.hypot(Ke-Y.x,Ne-Y.z)>=J+U.clear+le&&!ee.paths.at(Ke,Ne,J),Ve=y(G,$);e:for(let Ke=0;Ke<=s*.35;Ke+=3)for(let Ne=0;Ne<(Ke?16:1);Ne++){const Ge=Ne/16*Math.PI*2,z=Ve.x+Math.cos(Ge)*Ke,$e=Ve.z-4+Math.sin(Ge)*Ke;if(Ie(z,$e)){he={x:z,z:$e};break e}}}return se.set(fe,he),he},F=[],te=(G,$,fe)=>{const he=e.reserveMargin,J=b(G,$).cell;if(Math.hypot(G-A.x,$-A.z)<fe+T+he||Math.hypot(G-Y.x,$-Y.z)<fe+U.clear+he)return!0;for(const le of F)if(Math.hypot(G-le.x,$-le.z)<fe+le.r+he)return!0;for(const le of[Nn(J[0],J[1]),...p.get(Nn(J[0],J[1]))??[]]){const[ve,Ie]=le.split(",").map(Number);if(!(ve===w[0]&&Ie===w[1])){const Ke=I(ve,Ie);if(Math.hypot(G-Ke.x,$-Ke.z)<fe+e.soundsystemFootprint+he)return!0}const Ve=K(ve,Ie);if(Ve&&Math.hypot(G-Ve.x,$-Ve.z)<fe+e.setPieceFootprint*e.setPieceScale+he)return!0}return!1},ae=(G,$,fe)=>{if(Math.hypot(G-A.x,$-A.z)<T||Math.hypot(G-Y.x,$-Y.z)<U.clear)return!0;for(const le of F)if(Math.abs(G-le.x)<le.r&&Math.abs($-le.z)<le.r&&Math.hypot(G-le.x,$-le.z)<le.r)return!0;const he=K(fe[0],fe[1]);if(he&&Math.hypot(G-he.x,$-he.z)<e.setPieceClear*e.setPieceScale)return!0;if(fe[0]===w[0]&&fe[1]===w[1])return!1;const J=I(fe[0],fe[1]);return Math.hypot(G-J.x,$-J.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},pe=(G,$)=>{const[fe,he]=h(G,$);return ae(G,$,f.partition(fe,he))},_e=(G,$)=>{const[fe,he]=h(G,$);if(ae(G,$,f.partition(fe,he)))return 0;const J=1-an((hi(G/e.gladeScale,$/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return an((f.openness(fe,he)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*J},Pe=(G,$)=>Math.min(1,Math.hypot(G-w[0],$-w[1])/(t/2)),q=s*.5,ee={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:f,centreCell:w,dancefloor:{x:A.x,z:A.z,radius:R},treehouse:Y,grounds:F,start:{x:Y.x,z:Y.z+1},bounds:{minX:q,maxX:t*s-q,minZ:q,maxZ:t*s-q},extent:{minX:d*s,maxX:u*s,minZ:d*s,maxZ:u*s},typeOf:x,areaAt:b,siteOf:y,treeWeight:_e,hardClear:pe,neighbours:p,setPieceOf:S,soundsystemSpot:I,setPieceSpot:K,reserved:te,remoteness:Pe,paths:null};ee.paths=new Yp(ee);const k=e.grounds,ce=new Set;for(let G=0;G<t;G++)for(let $=0;$<t;$++){if($===w[0]&&G===w[1]||Le($,G,n+871)>=k.chance)continue;let fe=Math.floor(Le($,G,n+873)*k.kinds.length),he=0;for(;ce.has(k.kinds[fe])&&he++<k.kinds.length;)fe=(fe+1)%k.kinds.length;if(ce.has(k.kinds[fe]))continue;const J=k.kinds[fe],le=k.radius[J]??8,ve=Le($,G,n+875)*Math.PI*2,Ie=y($,G);e:for(const Ve of[le+6,le+14,le+24])for(let Ke=0;Ke<12;Ke++){const Ne=ve+Ke/12*Math.PI*2,Ge=Ie.x+Math.cos(Ne)*Ve,z=Ie.z+Math.sin(Ne)*Ve;if(L(Ge,z,$,G)&&!te(Ge,z,le)){F.push({kind:J,x:Ge,z,r:le,flip:Le($,G,n+877)<.5}),ce.add(J);break e}}}return ee.paths.placePieces(),ee}function Ic(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function Jp(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const ur=(n,e)=>Jn(e.groundHeight,e.treetopHeight,an(n.lift)),Po=n=>an(n.lift);function Qp(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const f=an(a),d=Jn(i.groundSpeed,i.treetopSpeed,f),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,m=n.vz+(h*i.groundSpeed-n.vz)*u,M=jp(n,o,h,t,i);let x=Jn(p,M.vx,f),g=Jn(m,M.vz,f);const v=M.boost*f,w=M.braking&&f>.5;let y=n.x+x*t,A=n.z+g*t;(y<s.minX||y>s.maxX)&&(y=Rn(y,s.minX,s.maxX),x=0),(A<s.minZ||A>s.maxZ)&&(A=Rn(A,s.minZ,s.maxZ),g=0);const b=x>.3?1:x<-.3?-1:n.facing,E=Math.hypot(x,g),_=Ic(x,g,n.away,Math.max(1,d*.15),i);return{x:y,z:A,vx:x,vz:g,lift:a,mode:r,facing:b,away:_,lean:E>d*i.leanAt,boost:v,braking:w}}function jp(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const w=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*w,vz:n.vz*w,boost:h*w,braking:!1}}const f=e/a,d=t/a;let u=f,p=d,m=0;if(o>2){const w=n.vx/o,y=n.vz/o;m=Math.acos(Rn(w*f+y*d,-1,1));const A=Rn((o/s.treetopSpeed-r.sharpTurnSpeed)/Math.max(.05,1-r.sharpTurnSpeed),0,1),b=r.turnRateSlow+(r.turnRate-r.turnRateSlow)*A,E=w*d-y*f,_=b*(1-.5*h)*Math.PI/180,S=Math.min(m,_*i)*(E>=0?1:-1),R=Math.cos(S),T=Math.sin(S);u=w*R-y*T,p=w*T+y*R}const M=m*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),c=o>s.treetopSpeed*r.brakeAt):h=Math.max(0,h-i*Math.max(.5,r.sharpTurnBleed*(M-r.boostAngle)/(90-r.boostAngle)));const x=M>=90?Math.min(o,s.treetopSpeed*(1+(r.boost-1)*h)*a):s.treetopSpeed*(1+(r.boost-1)*h)*a,g=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(x-o)*g;return{vx:u*v,vz:p*v,boost:h,braking:c}}const Mo=3;function em(n,e,t=.5,i=1){const s=n.tuning,r=Rn(e,0,1),a=Math.max(0,Math.round(Jn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<tm(n,r)?1:0,h=Math.max(0,a-o),c=Math.round(h*s.adultShareFar*an((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),f=Math.round((h-c)*s.youngShareFar*r);return{babies:Math.max(0,h-c-f),young:f,adults:c,legends:o}}const tm=(n,e)=>n.tuning.legendChanceFar*an((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Rd=n=>n.areaSize*.75,Ja=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function nm(n,e,t,i,s){if(Ja(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,c=i+Math.sin(o)*r;if(Ja(n,h,c,e))return[h,c]}return[t,i]}function Qa(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(Ja(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function im(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=ui(n.seed*7919+o*131+a*977+3),c=Rt[n.typeOf(o,a)],f=n.siteOf(o,a),d=n.remoteness(o,a),u=em(n,d,Le(o,a,n.seed+43),Le(o,a,n.seed+47)),p=M=>{const x=[o,a],g=Rd(n),[v,w]=nm(n,x,f.x,f.z,g),y={cell:x,homeX:f.x,homeZ:f.z,range:g,anchorX:v,anchorZ:w},[A,b]=Qa(n,y,h);return{id:i++,species:c.creature,level:M,...y,x:A,z:b,tx:A,tz:b,rest:h()*3,speed:(M===Mo?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:ui(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const m=t.legendNextToHome&&o===s+1&&a===r;(u.legends||m)&&e.push(p(3))}return e}function sm(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=Qa(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!Ja(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=Ic(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===Mo?1.5:4)}function rm(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=ui(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=Qa(a,o,h),[o.tx,o.tz]=Qa(a,o,h),o.rest=h()*2}o.seen=r,sm(o,s,a)}}const am={wall:"run",hedge:"run",bramble:"run",rockwall:"run",henge:"ring",water:"clump",reeds:"clump",boulder:"clump"},om={wall:2.4,hedge:2.2,bramble:2,rockwall:2.8},Cd=new Map(vr.map(n=>[n.id,{wall:n.wall?.[0]?.[0]??null,beds:n.small?.[0]?.[0]==="flowerbed"}]));function lm(n,e,t){const i=n.typeOf(e,t),s=Rt[i],r=n.tuning.walls,a={walls:[],beds:[]},o=Cd.get(s.id);if(!o?.wall)return a;const h=am[o.wall]??"clump",c=ui(n.seed*97+e*7919+t*104729+17),f=n.siteOf(e,t),d=n.areaSize;let u=0;const p=(g,v)=>{const w=n.areaAt(g,v).cell;return w[0]===e&&w[1]===t},m=(g,v)=>p(g,v)&&!n.hardClear(g,v)&&!n.reserved(g,v,1.5)&&n.paths.clearance(g,v).bushes!==0,M=(g,v,w)=>m(v,w)?(g.push({x:v,z:w,type:i,variant:Math.floor(Le(e*131+u,t*37+u++,n.seed+311)*1e6),flip:c()<.5}),!0):!1,x=()=>{let g={x:f.x,z:f.z};for(let v=0;v<10;v++){const w=c()*Math.PI*2,y=d*(.12+c()*.3);if(g={x:f.x+Math.cos(w)*y,z:f.z+Math.sin(w)*y},m(g.x,g.z))break}return g};if(h==="run"){const g=r.runs[0]+Math.floor(c()*(r.runs[1]-r.runs[0]+1)),v=om[o.wall]??2.4;for(let w=0;w<g;w++){const y=x(),A=n.paths.at(y.x,y.z,18);let b=Math.cos(c()*Math.PI*2),E=0;E=Math.sqrt(1-b*b)*(c()<.5?1:-1);let _=y.x,S=y.z;if(A){const L=n.paths.lines[A.line],O=L.pts[A.seg],I=L.pts[A.seg+1],U=Math.hypot(I[0]-O[0],I[1]-O[1])||1;b=(I[0]-O[0])/U,E=(I[1]-O[1])/U;const B=c()<.5?1:-1,Y=L.half+2.5;_=O[0]-E*Y*B,S=O[1]+b*Y*B}const R=r.runLength[0]+Math.floor(c()*(r.runLength[1]-r.runLength[0]+1)),T=c()<r.gateChance?Math.floor(R/2):-1;for(let L=0;L<R;L++){if(L===T||L===T+1)continue;const O=_+b*v*L,I=S+E*v*L;M(a.walls,O,I)&&o.beds&&L%2===0&&M(a.beds,O-E*1.8,I+b*1.8)}}}else if(h==="ring"){const g=r.rings[0]+Math.floor(c()*(r.rings[1]-r.rings[0]+1));for(let v=0;v<g;v++){let w=v===0?n.setPieceSpot(e,t):null,y=w??x(),A=0;for(let b=0;b<6;b++){const E=r.ringStones[0]+Math.floor(c()*(r.ringStones[1]-r.ringStones[0]+1)),_=c()*Math.PI*2;A=w?n.tuning.setPieceFootprint*n.tuning.setPieceScale+3+c()*3:r.ringRadius[0]+c()*(r.ringRadius[1]-r.ringRadius[0]);const S=Array.from({length:E},(R,T)=>{const L=_+T/E*Math.PI*2+(c()-.5)*.15;return[y.x+Math.cos(L)*A,y.z+Math.sin(L)*A]});if(S.filter(([R,T])=>m(R,T)).length*2>=E){for(const[R,T]of S)M(a.walls,R,T);break}w=null,y=x()}if(c()<r.avenueChance){const b=c()*Math.PI*2,E=Math.cos(b),_=Math.sin(b);for(let S=1;S<=4;S++)for(const R of[-1,1])M(a.walls,y.x+E*(A+S*4)-_*R*2.5,y.z+_*(A+S*4)+E*R*2.5)}}if(c()<r.loneChance){const v=x();M(a.walls,v.x,v.z)}}else{const g=r.clumps[0]+Math.floor(c()*(r.clumps[1]-r.clumps[0]+1));for(let v=0;v<g;v++){const w=x(),y=r.clumpSize[0]+Math.floor(c()*(r.clumpSize[1]-r.clumpSize[0]+1));for(let A=0;A<y;A++){const b=c()*Math.PI*2,E=Math.sqrt(c())*r.clumpRadius;M(a.walls,w.x+Math.cos(b)*E,w.z+Math.sin(b)*E)}}}return a}function cm(n,e){return!!Cd.get(Rt[e].id)?.beds}const Kt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},fi=(n,e,t=0)=>Kt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Pl=n=>{const e=fi(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},hm=n=>e=>{const t=fi(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},wn=(n,e=0)=>t=>{const i=fi(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&fi(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},vt=(n,e,t,i,s,r={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:wn(s,r.courses??5),...r}),In=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...P.add(P.lerp(e,t,o),[(Kt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,l.LEAF,{group:i,rough:.02,paint:a=>fi(a,30)<.3?l.LEAF2:void 0})},Oi=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Kt(s,r)*6.283,o=t*Math.sqrt(Kt(r,s)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+Kt(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:f=>f[1]>.14?l.LEAF:void 0})}},yi=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:hm(e)}),kn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Pl}),Fn=(n,e,t,i,s={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&fi(r,5,i)<.7?l.MOSS:fi(r,14)>.9?l.STONED:void 0}),Lh=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),um={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])vt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];vt(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?l.RUNE:wn(e)(r)):wn(e)})}for(let t=0;t<4;t++)vt(n,[1.3+t*.3,.14,.4+Kt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Kt(t,2)-.5),Kt(t,3)-.5],courses:0});e&&(In(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Oi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||vt(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;vt(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)vt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(In(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),In(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){vt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?l.STONED:wn(e,0)(s)}),vt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,l.STONE,{group:4,paint:wn(e,0)});vt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(In(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Oi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Kt(t,9)*(t%3===0?1.2:.45);vt(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Kt(t)-.5),Math.cos(i)],courses:0,round:.07})}vt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Oi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){vt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:wn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>fi(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])vt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)vt(n,[-1.2+t*.6,.12,.55+Kt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Kt(t,5)-.5]});e&&(In(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),In(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;vt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)Lh(n,[(Kt(t)-.5)*.8,.8+Kt(t,2)*.7,(Kt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(In(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Oi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){vt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:wn(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])vt(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)vt(n,[.5+Kt(t)*1.2,.13,-.3+Kt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Kt(t,5)-.5]});e&&(In(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),In(n,[.3,.1,.72],[.5,1.8,.72],5,13),yi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])vt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)vt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),vt(n,[-1.1,.55,0],[.15,.55,.62],4,e),vt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Oi(n,12,1.6,10,14),In(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:wn(e,0)}),n.ell(s(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:wn(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],l.STONED,{group:1,cut:!0}),Lh(n,s(.12,r),.05,3+(r>0?1:0),l.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:wn(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?l.STONED:wn(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:wn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:wn(e,0)}),e&&(Oi(n,14,1.8,10,16),yi(n,P.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){vt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])vt(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(In(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Oi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){vt(n,[-.9,.7,0],[.35,.7,.5],1,e),vt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];vt(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}vt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])vt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(In(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Oi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])vt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:wn(e,5)(i)):wn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:wn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)vt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(In(n,[.75,.05,.22],[.85,1.9,.22],7,21),In(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Oi(n,12,1.6,10,23))}}},dm={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Fn(n,[(Kt(e)-.5)*.6,.04,(Kt(e,2)-.5)*.4],[.07+Kt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Fn(n,[-.15,.12,0],[.22,.15,.2],1),Fn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Fn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Fn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Fn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),yi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Fn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Fn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Fn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Fn(n,[-1.1,.3,.6],[.4,.35,.35],2),Fn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&fi(e,6)<.3?l.MOSS:fi(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Fn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Fn(n,[.35,.1,.25],[.15,.1,.14],2)}}},fm={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}kn(n,e,1),yi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),kn(n,e,1),yi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){kn(n,[[0,0,0,.3],[0,.9,0,.26]],1),kn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),kn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),yi(n,[-1,2.7,0],[.6,.45,.5],4),yi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:Pl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),yi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;kn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:fi(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){kn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;kn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Kt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Kt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;kn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){kn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;kn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Fn(n,[e,i,t],[.3,.24,.26],3);yi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:Pl})}kn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),kn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])yi(n,[e,t,-.1],[.45,.3,.35],3)}}},Ss=[...Object.entries(um).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(dm).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(fm).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],pm=Object.fromEntries(Ss.map(n=>[n.id,n]));function mm(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:s([128,126,134]),[l.STONED]:s([64,62,72]),[l.MOSS]:me(.26,.45,.45),[l.TRUNK]:me(i,.45,.36),[l.BARKD]:me(i+.03,.5,.17),[l.BARKL]:me(i,.35,.55),[l.LEAF]:me(t,.55,.45),[l.LEAF2]:me(t-.03,.5,.62),[l.LEAF3]:me(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:me(n.magicHue??.45,.6,1),[l.MAGIC2]:me(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function gm(n,e={},{variant:t=0,ppm:i=16}={}){const s=pm[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new et({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=xr(e)*s.size,{sp:o,project:h}=dn(r,{scale:a});let c=0;for(const y of r.parts){if(y.extra)continue;const A=y.type==="cone"?[[y.a,y.r1],[y.b,y.r2]]:[[y.c,y.r?Math.max(...y.r):Math.max(y.h[0],y.h[2])]];for(const[b,E]of A)b[1]-E<.3&&(c=Math.max(c,Math.hypot(b[0],b[2])+E))}let f=o.w,d=-1,u=o.h;for(let y=0;y<o.h;y++)for(let A=0;A<o.w;A++)o.m[y*o.w+A]&&(f=Math.min(f,A),d=Math.max(d,A),u=Math.min(u,y));const p=d-f+1,m=o.h-u,M=new mt(p,m),x=new mt(p,m),g=new mt(p,m),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let y=0;y<m;y++)for(let A=0;A<p;A++){const b=(y+u)*o.w+A+f,E=o.m[b];if(!E)continue;const _=[o.n[b*3],o.n[b*3+1],o.n[b*3+2]];M.put(A,y,E,..._),(y<v?x:g).put(A,y,E,..._)}const w=a/i;return{whole:M,top:x,bot:g,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(m/i).toFixed(1),footprint:+(c*w).toFixed(1)}}}const Jt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Pt=(n,e,t=0)=>Jt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Vt=(n=.2,e=.15)=>t=>{const i=Pt(t,16,3);return Pt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},qt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=Jt(s,o)*6.283,c=t*Math.sqrt(Jt(o,s));n.ell([r+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+Jt(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:f=>f[1]>.13?l.LEAF:void 0})}},oa=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...P.add(e,P.add(P.mul(a,.25*i),[0,.2*i,0])),.025*i],[...P.add(e,P.add(P.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?l.LEAF:l.LEAF2,{group:t})}},oi=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(Jt(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>Pt(a,30)<.3?l.LEAF2:void 0})},ja=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=Pt(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),st=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Vt(.35,.05)}),dr=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function Si(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(d,u,p,m)=>{const M=Math.cos(u),x=Math.sin(u),g=[...d];return g[p]=d[p]*M-d[m]*x,g[m]=d[p]*x+d[m]*M,g},o=d=>a(a(a(d,s,1,2),i,0,1),-t,0,2),h=d=>a(a(a(d,t,0,2),-i,0,1),-s,1,2),c=d=>P.add(o(d),r),f=d=>h(P.sub(d,r));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=c(d.a),d.b=c(d.b)):(d.c=c(d.c),d.axes=d.axes.map(o)),d.paint){const u=d.paint;d.paint=(p,m)=>u(f(p),m)}}function Do(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=Vt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?Pt(h,9)<.25?l.STONED:l.SHADES:Vt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,r?.22:.3,.1],l.BODY3,{group:e+1,paint:f=>Math.hypot(f[0]-h,f[1]-.3)<.12?l.FRAME:void 0});if(s)for(const h of[-.45,.45])dr(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const xm={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Do(n,1),Si(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),oa(n,[.9,.2,.8],5),oa(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Do(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),ja(n,[.3,3.4,-.1],[1.1,.7,.9],5),oi(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),qt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Do(n,1),Si(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])oa(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Ph(n,1),ja(n,[.05,.65,0],[.32,.28,.26],3),Si(n,e,{roll:1.35,at:[0,.32,0]}),qt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Ph(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});qt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Tr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Tr(n,[0,0,0],1),Tr(n,[.5,0,.2],4);const e=n.parts.length;Tr(n,[0,0,0],7),Si(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),qt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Tr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,P.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(P.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>Pt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Pt(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&Pt(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])st(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Vt(.5,.1)(t)}),Si(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),qt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>Pt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Pt(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:Pt(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])qt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){st(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Vt(.2,.1)(e)}}),qt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Vt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Vt(.3,.3)}),oi(n,[.43,0,.3],[.4,1.9,.43],3,8),oi(n,[-.3,0,.43],[-.1,1.4,.43],4,9),qt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Vt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),oi(n,[0,0,.06],[.05,1.5,.06],3,10),qt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Pt(t,6,5)<.25&&t[1]>.4?l.MOSS:Pt(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});qt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Vt(.25,.15)(e)}),oa(n,[0,.4,.4],2,.55),qt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;st(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])st(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),st(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Vt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),st(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(P.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(P.add(e,[.14,.07,0]),P.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),qt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Vt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Vt(.25,.15)});for(let e=0;e<7;e++)dr(n,[(Jt(e)-.5)*.4,.4+Jt(e,2)*1,.2+Jt(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);oi(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Ph(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])st(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;st(n,P.lerp(t[0],t[1],s),P.lerp(t[4],t[5],s),e,.008),st(n,P.lerp(t[3],t[2],s),P.lerp(t[7],t[6],s),e,.008)}st(n,t[4],[-.45,.95,-.28],e,.015),st(n,t[7],[-.45,.95,.28],e,.015),st(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])st(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],l.BODY3,{group:e+1})}function Tr(n,e,t,i=!1){n.box(P.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Vt(.15,.2)}),n.seg(P.add(e,[0,.05,0]),P.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&Pt(s,18)<.2?l.GLOW:Vt(.15,.1)(s)}),i&&dr(n,P.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const Mm={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])st(n,[e,0,t],[e*.95,2.1,0],1,.045);st(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])st(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)dr(n,[-.42+(Jt(e)-.5)*.5,.6+Jt(e,2)*.7,(Jt(e,3)-.5)*.3],.025,10+e);st(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),st(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),oi(n,[1.1,0,.5],[1.05,1.6,.25],6,14),qt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])st(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)st(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Vt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Vt(.35,.15)(e)});for(let e=0;e<10;e++){const t=Jt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Jt(e)*.5,Math.sin(t)*.3,.025],[.1+Jt(e,4)*.6,.7+Jt(e,5)*.4,(Jt(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Jt(e,7)*.6,.5+Jt(e,8)*.4,(Jt(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>Pt(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),ja(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Vt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;st(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),st(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Si(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),qt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Vt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>Pt(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])st(n,[t,.03,-.12],[t,.03,.12],3,.02);Si(n,e,{pitch:.32,at:[0,.42,0]}),qt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)st(n,t(i,s),t(i,s+1),1,.025),st(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)oi(n,t(i*3,0),t(i*3+1,3),3+i,18+i);qt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Vt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Vt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),st(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),qt(n,8,.8,6,19)}}},vm=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function _m(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>Pt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?Pt(a,18)<.5?l.LEAF2:l.STONED:s(a[0],a[2])?Pt(a,10,2)<.25?i:l.CLOTH:Pt(a,5,7)<.07?l.MOSS:void 0})}const ii=(n,e,t=.045)=>Math.abs(n-e)<t,bm={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){_m(n,4.4+.5,2+.5,l.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(ii(Math.abs(i),4.4)||ii(Math.abs(s),2)||ii(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(ii(s,0)||ii(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])st(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])st(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)st(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Si(n,e,{roll:.25,pitch:-.1}),qt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])st(n,[e,0,0],[e,1.7,0],1,.03);st(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Pt(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)oi(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)dr(n,[(Jt(e)-.5)*1.2,.06,(Jt(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),qt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Pt(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?Pt(t,6)<.15?l.MOSS:void 0:Pt(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:s=>Pt(s,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;st(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=P.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],l.FRAME,{dir:P.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?Pt(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});oi(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])st(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Jt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Vt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),oi(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(ii(Math.abs(s),5.2,.06)||ii(Math.abs(r),3.3,.06)||ii(s,0,.06)||ii(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(ii(Math.abs(s),5.2-1,.06)||ii(Math.abs(r),1.6,.06)))?Pt(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((s+20)*.8)%2?Pt(i,6)<.25?l.LEAF2:l.LEAF:Pt(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Dh(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),ja(n,[.3,1.6,.2],[.35,.25,.3],6),qt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Dh(n,1),Si(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),qt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){st(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Vt(.2,0)}),qt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])st(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;st(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),st(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Vt(.4,.1)(s)});dr(n,[0,4+.45,.22],.06,4,l.MAGIC2),oi(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;st(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Vt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;st(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,l.ACCENT)}Si(n,e,{pitch:-.2}),qt(n,8,1,5,31)}}};function Dh(n,e){for(const t of[-1.4,1.4])st(n,[0,0,t],[0,1,t],e,.035,l.BELLY);st(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])st(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const ym={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function wm(n={},e=16){const t=s=>xr(n)*Ld[s].size/e,i=s=>s.map(([r,a,o])=>({id:r,x:+(a*t(r)).toFixed(1),z:+(o*t(r)).toFixed(1)}));return{playground:i(vm),...Object.fromEntries(Object.entries(ym).map(([s,r])=>[s,i(r)]))}}const Oc=[...Object.entries(xm).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(Mm).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(bm).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],Ld=Object.fromEntries(Oc.map(n=>[n.id,n]));function Sm(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.BODY]:[92,118,140],[l.BODY2]:[132,74,42],[l.BODY3]:[34,32,38],[l.FRAME]:[150,152,158],[l.SHADES]:[24,24,30],[l.STONE]:[72,72,80],[l.STONED]:[34,34,40],[l.CLOTH]:[214,210,196],[l.BELLY]:[222,218,206],[l.ACCENT]:[214,92,40],[l.HAT1]:[54,84,120],[l.HAT2]:[86,112,92],[l.MOSS]:me(.26,.45,.45),[l.TRUNK]:me(t,.45,.36),[l.BARK2]:[98,74,52],[l.BARKD]:me(t+.03,.5,.17),[l.LEAF]:me(e,.55,.45),[l.LEAF2]:me(e-.03,.5,.6),[l.LEAF3]:me(e+.03,.6,.28),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,170,80],[l.MAGIC]:me(n.magicHue??.2,.55,1),[l.MAGIC2]:me(n.magicHue??.2,.15,1),[l.LINE]:[24,22,30]}}function Em(n,e={},{ppm:t=16}={}){const i=Ld[n];if(!i)throw new Error(`no relic "${n}"`);const s=new et({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=xr(e)*i.size,{sp:a,project:o}=dn(s,{scale:r});let h=0;for(const E of s.parts){if(E.extra||E.cut)continue;const _=E.type==="cone"?[[E.a,E.r1],[E.b,E.r2]]:[[E.c,E.r?Math.max(...E.r):Math.max(E.h[0],E.h[2])]];for(const[S,R]of _)S[1]-R<.3&&(h=Math.max(h,Math.hypot(S[0],S[2])+R))}let c=a.w,f=-1,d=a.h;for(let E=0;E<a.h;E++)for(let _=0;_<a.w;_++)a.m[E*a.w+_]&&(c=Math.min(c,_),f=Math.max(f,_),d=Math.min(d,E));const u=f-c+1,p=a.h-d,m=new mt(u,p),M=new mt(u,p),x=new mt(u,p),g=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-d);for(let E=0;E<p;E++)for(let _=0;_<u;_++){const S=(E+d)*a.w+_+c,R=a.m[S];if(!R)continue;const T=[a.n[S*3],a.n[S*3+1],a.n[S*3+2]];m.put(_,E,R,...T),(E<g?M:x).put(_,E,R,...T)}m.bodyH=a.bodyH;const v=r/t,[w,y]=o([0,0,0]),A=+(w-c).toFixed(1),b=+(y-d).toFixed(1);return{whole:m,top:M,bot:x,crownY:g,origin:{x:A,y:b},metres:{width:+(u/t).toFixed(1),height:+(p/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const Am=4,Dt=32;function Tm(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function Pd(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(hi(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Le(i,s,r+1)-.5)*a.width*a.stray,c=(hi(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Le(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function Fc(n,e,t,i){const s=n.tuning,r=s.density,a=Rt[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=hi(e/r.patchScale,t/r.patchScale,o+91),f=r.patchMin+(r.patchMax-r.patchMin)*an((c-.25)/.5),d=n.treeWeight(e,t)*a.density*f*Rm(n,e,t,a)*s.treeDensity;return Math.max(d,r.lone)*h}function Rm(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=hi(e/a,t/a,s+93);return 1+r*(2.2*an((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*an((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*an((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*an((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function Ih(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=Tm(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*Dt/s),f=Math.ceil((t+1)*Dt/s);for(let d=c;d<f;d++){const u=d&1?.5:0,p=Math.ceil(e*Dt/i-u),m=Math.ceil((e+1)*Dt/i-u);for(let M=p;M<m;M++){const x=(M+u+(Le(M,d,r+101)-.5)*.7)*i,g=(d+(Le(M,d,r+102)-.5)*.7)*s,v=Pd(n,x,g,M,d,r+106),w=Fc(n,x,g,v);Le(M,d,r+103)>=w||n.hardClear(x,g-o)||n.hardClear(x-h,g-o)||n.hardClear(x+h,g-o)||a.push({x,z:g,type:v,variant:Math.floor(Le(M,d,r+104)*1000003),flip:Le(M,d,r+105)<.5})}}return a}function Oh(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*Dt/i),o=Math.ceil((t+1)*Dt/i),h=Math.ceil(e*Dt/i),c=Math.ceil((e+1)*Dt/i);for(let f=a;f<o;f++)for(let d=h;d<c;d++){const u=(d+Le(d,f,s+201)-.5)*i,p=(f+Le(d,f,s+202)-.5)*i,m=1+n.tuning.bushClump*(2*an((hi(u/13,p/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const x=Pd(n,u,p,d,f,s+206);if(cm(n,x))continue;const g=1-Math.min(1,Fc(n,u,p,x)/.8);Le(d,f,s+203)>(.15+.85*g)*Rt[x].layout.undergrowth*n.tuning.bushDensity*m*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||n.hardClear(u,p)||r.push({x:u,z:p,type:x,variant:Math.floor(Le(d,f,s+204)*Am),flip:Le(d,f,s+205)<.5})}return r}const Fh=new WeakMap;function Cm(n){let e=Fh.get(n);if(e===void 0){const t=n.tuning.decor;e=(t.ruins+t.rocks+t.freak)*1.5*Math.max(1,...Rt.map(i=>i.layout.decor?i.layout.decor.rate/.3:1)),Fh.set(n,e)}return e}function Dd(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=Le(e,t,r+503);if(a>=Cm(n))return null;const o=(e+(Le(e,t,r+501)-.5)*.8)*s,h=(t+(Le(e,t,r+502)-.5)*.8)*s,c=n.areaAt(o,h),f=Rt[c.type].layout,d=f.decor,u=d?d.rate/.3:1,p=f.terrain?.includes("rocky")?2:1,m=d?[d.ruins,d.rocks*p,d.freak]:[i.ruins,i.rocks*p,i.freak],M=m[0]+m[1]+m[2]||1,x=(i.ruins+i.rocks+i.freak)*u*(d?(d.ruins+d.rocks+d.freak)/Math.max(.01,d.ruins+d.rocks+d.freak+d.lake+d.modern):1)*(p>1?1.5:1);if(a>=x||c.openness<i.clearing||n.hardClear(o,h)||n.paths.at(o,h,i.pathGap)||n.reserved(o,h,i.footprint)||Math.hypot(o-n.dancefloor.x,h-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)return null;const g=1-Math.min(1,Fc(n,o,h,c.type)/.8);if(Le(e,t,r+504)>.35+.65*g)return null;const v=a/x*M,w=v<m[0]?"ruins":v<m[0]+m[1]?"rocks":"freak";return{x:o,z:h,family:w,variant:Math.floor(Le(e,t,r+505)*1e6),flip:Le(e,t,r+506)<.5,rank:Le(e,t,r+507),i:e,j:t}}function Nc(n,e,t,i,s,r,a){const o=[],h=Math.ceil(t/e)+1;for(let c=r;c<a;c++)for(let f=i;f<s;f++){const d=n(f,c);if(!d)continue;let u=!0;for(let p=-h;p<=h&&u;p++)for(let m=-h;m<=h;m++){if(!m&&!p)continue;const M=n(f+m,c+p);if(M&&M.rank>d.rank&&Math.hypot(M.x-d.x,M.z-d.z)<t){u=!1;break}}u&&o.push(d)}return o}function Nh(n,e,t){const i=n.tuning.decor,s=i.spacing,r=Uc(n).decor,a=[];for(const{rank:o,i:h,j:c,...f}of Nc((d,u)=>Dd(n,d,u),s,i.minGap,Math.ceil(e*Dt/s),Math.ceil((e+1)*Dt/s),Math.ceil(t*Dt/s),Math.ceil((t+1)*Dt/s))){if(f.family==="rocks"){a.push(f);continue}const d=r.get(h+","+c);d!==void 0&&a.push({...f,variant:d})}return a}function Id(n,e,t){const i=n.tuning.relics,s=i.spacing,r=n.seed;if(Le(e,t,r+883)>=i.chance*5.5*Math.max(1,i.nearRoad))return null;const a=(e+(Le(e,t,r+881)-.5)*.8)*s,o=(t+(Le(e,t,r+882)-.5)*.8)*s,h=n.areaAt(a,o),c=Rt[h.type].layout.decor,f=c?c.modern/Math.max(.01,c.ruins+c.rocks+c.freak+c.lake+c.modern):.1,d=Le(e,t,r+883),u=i.chance*(.5+5*f);if(d>=u*Math.max(1,i.nearRoad))return null;const p=n.paths.at(a,o,20),m=p&&(p.kind==="road"||p.kind==="rail")?i.nearRoad:1;return d>=u*m||h.openness<n.tuning.decor.clearing||n.hardClear(a,o)||n.paths.at(a,o,2)||n.paths.pieceAt(a,o)||n.reserved(a,o,n.tuning.decor.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6?null:{x:a,z:o,variant:Math.floor(Le(e,t,r+884)*1e6),flip:Le(e,t,r+885)<.5,rank:Le(e,t,r+886),i:e,j:t}}function Uh(n,e,t){const i=n.tuning.relics,s=i.spacing,r=Uc(n).relics,a=[];for(const{rank:o,i:h,j:c,...f}of Nc((d,u)=>Id(n,d,u),s,i.minGap,Math.ceil(e*Dt/s),Math.ceil((e+1)*Dt/s),Math.ceil(t*Dt/s),Math.ceil((t+1)*Dt/s))){const d=r.get(h+","+c);d!==void 0&&a.push({...f,variant:d})}return a}const kh=new WeakMap,Dl=[],Lm=Ss.filter(n=>n.family==="freak").length;for(let n=0,e=0;n<Ss.length;n++)Ss[n].family==="ruins"&&(Dl.push(e),e+=Ss[n].variants);const Pm=Ss.filter(n=>n.family==="ruins").map(n=>n.variants),Dm=Oc.filter(n=>n.family==="modern").length;function Uc(n){let e=kh.get(n);if(e)return e;const t=n.extent,i=n.seed,s=(o,h,c,f,d)=>{const u=new Map,m=Nc((g,v)=>{const w=g+","+v;let y=u.get(w);return y===void 0&&u.set(w,y=o(g,v)),y},h,c,Math.floor(t.minX/h),Math.ceil(t.maxX/h)+1,Math.floor(t.minZ/h),Math.ceil(t.maxZ/h)+1).sort((g,v)=>v.rank-g.rank),M=new Map,x=new Map;for(const g of m){const v=f(g);if(!v)continue;const[w,y]=v,A=M.get(w)??new Set;if(M.set(w,A),A.size>=y)continue;let b=Math.floor(Le(g.i,g.j,i+509)*y);for(;A.has(b);)b=(b+1)%y;A.add(b),x.set(g.i+","+g.j,d(g,b))}return x},r=n.tuning.decor,a=n.tuning.relics;return e={decor:s((o,h)=>Dd(n,o,h),r.spacing,r.minGap,o=>o.family==="ruins"?["ruins",Dl.length]:o.family==="freak"?["freak",Lm]:null,(o,h)=>o.family==="ruins"?Dl[h]+o.variant%Pm[h]:h),relics:s((o,h)=>Id(n,o,h),a.spacing,a.minGap,()=>["modern",Dm],(o,h)=>h)},kh.set(n,e),e}const Im=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Bh(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Dt/s),h=Math.ceil((t+1)*Dt/s),c=Math.ceil(e*Dt/s),f=Math.ceil((e+1)*Dt/s);for(let d=o;d<h;d++)for(let u=c;u<f;u++){const p=(u+(Le(u,d,r+401)-.5)*.7)*s,m=(d+(Le(u,d,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(p,m),x=M.openness<.35||M.openness>.8?1:.25,g=Le(u,d,r+403),w=(Im.has(Rt[M.type].id)||!!Rt[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*x,y=i.campfire*x,A=i.magicStone*x,b=g<w?"pond":g<w+y?"campfire":g<w+y+A?"stone":null;b&&a.push({x:p,z:m,kind:b,size:.75+Le(u,d,r+404)*.5})}return a}class kc{constructor(e){this.map=e,Uc(e)}map;trees=new Map;bushes=new Map;wallFeatureCache=new Map;lights=new Map;decor=new Map;relics=new Map;buildMs=0;static KEEP=2500;centre={x:0,z:0};chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/Dt);r<=Math.floor((t+i)/Dt);r++)for(let a=Math.floor((e-i)/Dt);a<=Math.floor((e+i)/Dt);a++)s.push([a,r]);return s}evict(e,t=kc.KEEP,i=Dt){if(e.size<=t)return;const s=this.centre,r=[...e.keys()].map(a=>{const[o,h]=a.split(",").map(Number);return[a,((o+.5)*i-s.x)**2+((h+.5)*i-s.z)**2]});r.sort((a,o)=>o[1]-a[1]);for(const[a]of r.slice(0,e.size-Math.floor(t*.8)))e.delete(a)}chunk(e,t,i,s){const r=i+","+s;let a=e.get(r);if(!a){const o=performance.now();a=t(i,s),this.buildMs+=performance.now()-o,e.set(r,a)}return a}gather(e,t,i,s,r){this.centre={x:i,z:s},this.evict(e);const a=[];for(const[o,h]of this.chunks(i,s,r))for(const c of this.chunk(e,t,o,h))Math.abs(c.x-i)<=r&&Math.abs(c.z-s)<=r&&a.push(c);return a}kinds(){const e=this.map;return[[this.trees,(t,i)=>Ih(e,t,i)],[this.bushes,(t,i)=>Oh(e,t,i)],[this.decor,(t,i)=>Nh(e,t,i)],[this.relics,(t,i)=>Uh(e,t,i)],[this.lights,(t,i)=>Bh(e,t,i)]]}prefetch(e,t,i,s){const r=performance.now(),a=this.kinds(),o=this.chunks(e,t,i).filter(([u,p])=>a.some(([m])=>!m.has(u+","+p)));o.sort((u,p)=>((u[0]+.5)*Dt-e)**2+((u[1]+.5)*Dt-t)**2-(((p[0]+.5)*Dt-e)**2+((p[1]+.5)*Dt-t)**2));let h=0;for(const[u,p]of o){if(h>0&&performance.now()-r>s)break;for(const[m,M]of a)this.chunk(m,M,u,p);h++}const c=this.map.areaSize,f=[];for(let u=Math.floor((t-i)/c)-1;u<=Math.floor((t+i)/c)+1;u++)for(let p=Math.floor((e-i)/c)-1;p<=Math.floor((e+i)/c)+1;p++)this.wallFeatureCache.has(p+","+u)||f.push([p,u,((p+.5)*c-e)**2+((u+.5)*c-t)**2]);f.sort((u,p)=>u[2]-p[2]);let d=0;for(const[u,p]of f){if(performance.now()-r>s)break;this.featuresOf(u,p),d++}return o.length-h+f.length-d}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>Ih(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>Oh(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>Bh(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>Nh(this.map,s,r),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(s,r)=>Uh(this.map,s,r),e,t,i)}features(e,t,i,s){const r=this.map.areaSize,a=[];this.centre={x:e,z:t},this.evict(this.wallFeatureCache,400,r);for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++)for(const c of s(this.featuresOf(h,o)))Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push(c);return a}featuresOf(e,t){const i=e+","+t;let s=this.wallFeatureCache.get(i);if(!s){const r=performance.now();s=lm(this.map,e,t),this.buildMs+=performance.now()-r,this.wallFeatureCache.set(i,s)}return s}wallsNear(e,t,i){return this.features(e,t,i,s=>s.walls)}bedsNear(e,t,i){return this.features(e,t,i,s=>s.beds)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const c=s.setPieceSpot(h,o);c&&Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push({x:c.x,z:c.z,type:s.typeOf(h,o),variant:0,flip:Le(h,o,s.seed+71)<.5})}return a}}const Om=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),Od=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],Fm=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],Il=n=>!n.leashed&&n.level!==Mo;function Nm(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function Io(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!Il(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function zh(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function Um(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,c=o.leash,f=d=>e[d];if(t.talk&&s){const d=n.talk?f(n.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-i.x,d.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(d.id,n.talk.t),d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=i.x>=d.x?1:-1,d.away=i.z<d.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(zh(n,d,d.x,d.z,r),n.progress.delete(d.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const u=Io(e,i.x,i.z,h.talkRange)??Io(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!Il(u),t:n.progress.get(u.id)??0,total:Il(u)?Od(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[d,u]of n.progress){if(n.talk?.id===d)continue;const p=u-a*h.decayRate;p<=0||e[d].leashed?n.progress.delete(d):n.progress.set(d,p)}if(t.inviteNearest){const d=Io(e,i.x,i.z,1/0);d&&zh(n,d,d.x,d.z,r)}if(t.sigil&&s){let d=-1,u=c.pickRadius;if(n.placed.forEach((p,m)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,d=m)}),d>=0){const[p]=n.placed.splice(d,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];Fd(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const d of n.stack)Hh(f(d),i.x,i.z,a,o);for(const d of n.placed)Hh(f(d.id),d.x,d.z,a,o)}const Fd=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function Hh(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),m=a*.5/p;n.tx=e+(n.x-e)*m,n.tz=t+(n.z-t)*m,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,m=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*m,n.tz=t+Math.sin(p)*m,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,f=Math.hypot(h,c);if(f<1e-4){n.moving=!1;return}const d=o?Math.max(n.speed,r.runSpeed*(n.level===Mo?.6:1)):n.speed*1.5,u=Math.min(f,d*i);n.x+=h/f*u,n.z+=c/f*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=Ic(h,c,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const Bc=n=>`${n[0]},${n[1]}`;function km(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null},t={areas:new Map([[Bc(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1,next:null,last:null};return t.next=zc(t,n),t}function zc(n,e,t=e.tuning.party.picker,i){const s=e.dancefloor,r=e.tuning.party.noisy,a=ui(e.seed*131+n.wave*7919+3),o=new Set;for(const u of n.areas.keys())for(const p of e.neighbours.get(u)??[])n.areas.has(p)||o.add(p);const h=[];for(let u=0;u<e.n;u++)for(let p=0;p<e.n;p++){const m=`${p},${u}`;if(n.areas.has(m))continue;const M=e.soundsystemSpot(p,u);h.push({key:m,cell:[p,u],dist:Math.hypot(M.x-s.x,M.z-s.z)})}const c=h.filter(u=>o.has(u.key)),f=t==="near3"?h:c.length?c:h;if(!f.length)return null;if(t==="nearest"){const u=[...f].sort((p,m)=>p.dist-m.dist)[0].cell;return i?.push(u),u}if(t==="noisy"){const u=r.lobeSize,p=e.seed+911,m=x=>{const g=e.siteOf(x.cell[0],x.cell[1]),v=.65*hi(g.x/u,g.z/u,p)+.35*hi(g.x/(u/2.3),g.z/(u/2.3),p+1);return x.dist*(1+r.wobble*(v-.5)*2)};let M=[...f].sort((x,g)=>m(x)-m(g)).slice(0,Math.max(1,r.candidates));if(r.spreadFromLast&&n.last){const x=e.neighbours.get(Bc(n.last))??new Set,g=M.filter(v=>!x.has(v.key));g.length&&(M=g)}return i?.push(...M.map(x=>x.cell)),M[Math.floor(a()*M.length)].cell}const d=[...f].sort((u,p)=>u.dist-p.dist).slice(0,3);return i?.push(...d.map(u=>u.cell)),d[Math.floor(a()*d.length)].cell}function Bm(n,e){const t=Math.floor(Le(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}function Nd(n,e){if(!n.next)return[];const t=Bc(n.next),i=e.siteOf(n.next[0],n.next[1]);let s=e.centreCell,r=1/0;for(const a of e.neighbours.get(t)??[]){const o=n.areas.get(a);if(!o)continue;const h=e.siteOf(o.cell[0],o.cell[1]),c=Math.hypot(h.x-i.x,h.z-i.z);c<r&&(r=c,s=o.cell)}return[{key:t,cell:n.next,from:s}]}function Ud(n,e,t){const i=n.wave+1,s=[];for(const{key:r,cell:a,from:o}of Nd(n,e)){const h={cell:a,wave:i,at:t,from:o,soundsystem:Bm(e,a)};n.areas.set(r,h),s.push(h)}return n.wave=i,s.length&&(n.last=s[s.length-1].cell),n.next=zc(n,e),s}function zm(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,Ud(n,e,t))}function Ol(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function Hm(n,e){const t=new Set(Nd(n,e).map(s=>s.key)),i=[];for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=`${r},${s}`;if(n.areas.has(a))continue;const o=e.soundsystemSpot(r,s);i.push({key:a,cell:[r,s],x:o.x,z:o.z,awake:t.has(a)})}return i}function Gm(n,e){const t=Zp(n,e),i={...Jp(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new kc(t),creatures:im(t),clock:Zf(),witch:i,camera:Kf(e,i.x,ur(i,e),i.z),party:km(t),leash:Om()}}function Wm(n,e,t){const i=Jf(n.clock,t);i!==0&&(n.witch=Qp(n.witch,e,i,n.tuning,n.map.bounds),n.camera=qf(n.camera,e.zoom,{x:n.witch.x,y:ur(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(Ud(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),zm(n.party,n.map,n.clock.time,i),rm(n.creatures,n.witch.x,n.witch.z,Vm(n),i,n.clock.time,n.map),Um(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const Vm=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Rd(n.map)*2.5),Gh=n=>hd(n.camera,n.camera.lift,n.tuning);function kd(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Rt[e.type].name+(t?` (set piece: ${t})`:"")}const Ym="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Xm="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Km=20,qm=28,$m=4,Zm=.7,Jm=4,Qm="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",jm=1,eg=.2,tg=.18,ng=.25,ig=38,sg="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",rg={width:20,scale:40,stray:.5},ag="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",og={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},lg=.16,cg=.8,hg=2.25,ug="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",dg={from:20,keep:.35},fg=1.7,pg=4.6,mg=2.8,gg=10.5,xg=11.25,Mg=3.4,vg="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",_g=19.25,bg=32,yg=10,wg="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRateSlow degrees a second below sharpTurnSpeed of cruise, falling to turnRate at cruise (half that at full boost), so the size of her swoop grows with her speed (Ed); a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second, and above brakeAt of cruise she skids in the brake pose; letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",Sg={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,turnRateSlow:720,sharpTurnSpeed:.4,brakeAt:.9,glideTime:1,sharpTurnBleed:3,cameraPull:.06},Eg=28,Ag=.7,Tg={awayEnter:55,awayLeave:65},Rg=.7,Cg=.55,Lg=1.4,Pg=24,Dg="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Ig={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Og="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. The witch's light reaches as far as the canopy hole round her in ground mode (its radius plus its soft edge, in metres at her depth, times glowToCutout), so beyond it the forest is dark (Ed, v149); glowFalloff: how fast it falls off, as (1 - distance/reach)^glowFalloff. ?glow=<reach>,<falloff> in the URL fixes the reach (glowReach metres) and the falloff, to try values live. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Fg=3,Ng=50,Ug=1.5,kg=1,Bg=8,zg=1,Hg=16,Gg=12,Wg=20,Vg="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Yg="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), full under her, falling off as glowFalloff says out to glowReach metres, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",Xg={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Kg=.65,qg="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",$g={bpm:120},Zg="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",Jg="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",Qg={height:3,opacity:.65,beam:.25,size:1},jg={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},e1="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",t1={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},n1="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",i1={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},s1="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",r1={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},a1={spacing:10,campfire:.012,magicStone:0,pond:.02,wetPond:.12},o1={near:150,far:360},l1="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",c1={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},h1="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",u1="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",d1={on:!0,strength:.7,trees:!1},f1={on:!0,strength:.45,height:18,cover:.55,wind:.6},p1={on:!0,strength:.12,height:3,wind:.8},m1="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",g1="smooth",x1="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",M1=0,v1="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",_1={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},b1="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",y1={emojiPixels:11,scale:1},w1="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",S1={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},E1="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).",A1={spacing:34,chance:.0067,nearRoad:4,minGap:80},T1="Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.",R1={runs:[3,5],runLength:[5,10],gateChance:.5,rings:[1,2],ringStones:[6,12],ringRadius:[6,11],avenueChance:.35,loneChance:.3,clumps:[2,4],clumpSize:[3,6],clumpRadius:5},C1=`Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. beamHeight: the beacon's height (metres); lightRange: stones within this many metres light the scene. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives. awakeStyle (Ed, v149: "let's see both"): an awake stone shows a column of light above the canopy ("column"), a thin laser straight up like the disco ball's ("beam": laser opacity, width and length in metres; glow only, no light), or both; ?rune=beam|column|both in the URL.`,L1={awakeStyle:"both",laser:{opacity:.55,width:.25,length:70},scale:2.25,beamHeight:46,lightRange:160,dormant:{glow:.5,light:.55,reach:12,beam:.1},awake:{glow:[.7,1],light:.9,lightBuild:1,reach:18,beam:.3,motes:8,moteBuild:12},flare:{time:1.6,light:3.5}},P1="Every end of a path, road, railway or stream (where it stops, peters out or is broken) frays out over its last metres in an ordered dither on the art's pixel grid, broken up by noise (Ed, v149).",D1={metres:6,dither:!0},I1="In ground mode, where the crowns are hidden, each tree's trunk fades out over its top metres in an ordered dither on the art's pixel grid (Ed, v149), instead of ending in a flat cut.",O1={metres:2.5,dither:!0},F1="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",N1={spacing:26,ruins:.01,rocks:.03,freak:.004,minGap:80,clearing:.3,pathGap:2,footprint:4},U1="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next; the two flights of stairs are finds, each at most once per map, by the clearing of a ravine, rocky slope, cave mouth or stone shrine; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",k1={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,pieceGap:40,treesOnBroken:.35,edgeBushes:3,bushBoost:3},B1="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",z1={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},H1={length:8,runSpeed:4,pickRadius:2,spacing:4},G1={rim:!0,sparks:!0,thread:!0,sparkEvery:4,threadArc:.12,threadArcMax:2.5},W1="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",V1={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,picker:"noisy",noisy:{wobble:.8,lobeSize:500,candidates:3,spreadFromLast:!0},transition:2.5,lightReach:30,lightStrength:1.6},Y1="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",X1={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},K1="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",q1={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},$1="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Z1={screenFraction:.8,edge:.1},J1="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy), moon the moonlight (both lowered for Ed's dark forest, v149); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Q1={black:.03,gamma:1.35,ambient:.22,moon:.7},j1={on:!0,strength:.7,threshold:.55},e2={on:!0,where:"before",strength:3,band:.4,centre:.55},t2="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",n2=2,i2=20,s2=1.3,r2=.5,a2=.35,o2=.35,l2=.25,c2=!0,h2=.55,u2=600,d2=.6,f2="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement.",p2=.25,m2=1.8,g2=9,x2="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",M2=7,v2=6,_2=3,b2=1.5,y2=.35,w2={_readme:Ym,_map:Xm,mapAreas:Km,areaSize:qm,areaScale:$m,areaSizeVariance:Zm,borderLayers:Jm,_trees:Qm,treeDensity:jm,clearingSize:eg,clearingFalloff:tg,gladeAmount:ng,gladeScale:ig,_areaEdgeBlend:sg,areaEdgeBlend:rg,_density:ag,density:og,bushDensity:lg,bushClump:cg,treeHeight:hg,_treeCap:ug,treeCap:dg,crownWidth:fg,treeSpacingX:pg,treeSpacingZ:mg,crownHalfWidth:gg,crownHeight:xg,bushSpacing:Mg,_witch:vg,groundSpeed:_g,treetopSpeed:bg,acceleration:yg,_treetop:wg,treetop:Sg,groundAcceleration:Eg,leanAt:Ag,facing:Tg,riseTime:Rg,descendTime:Cg,groundHeight:Lg,treetopHeight:Pg,_camera:Dg,camera:Ig,_look:Og,pixelSize:Fg,glowReach:Ng,glowFalloff:Ug,glowToCutout:kg,glowHeight:Bg,spriteTilt:zg,artPixelsPerMetre:Hg,viewMargin:Gg,lightBudget:Wg,_lightSources:Vg,_lights:Yg,lights:Xg,glowPower:Kg,_beat:qg,beat:$g,_occlusion:Zg,_sigilProjection:Jg,sigilProjection:Qg,occlusion:jg,_stack:e1,stack:t1,_lasers:n1,lasers:i1,_borders:s1,borders:r1,lightSources:a1,haze:o1,_scenery:l1,scenery:c1,_post:h1,_shadows:u1,shadows:d1,canopyShadow:f1,mist:p1,_fx:m1,fx:g1,_moonbeams:x1,moonbeams:M1,_treehouse:v1,treehouse:_1,_bubbles:b1,bubbles:y1,_grounds:w1,grounds:S1,_relics:E1,relics:A1,_walls:T1,walls:R1,_runeMarkers:C1,runeMarkers:L1,_pathFade:P1,pathFade:D1,_trunkFade:I1,trunkFade:O1,_decor:F1,decor:N1,_paths:U1,paths:k1,_invite:B1,invite:z1,leash:H1,bond:G1,_party:W1,party:V1,_stringLights:Y1,stringLights:X1,_dancefloor:K1,dancefloor:q1,_canopyCutout:$1,canopyCutout:Z1,_tone:J1,tone:Q1,bloom:j1,tiltShift:e2,_creatures:t2,creaturesNear:n2,creaturesFar:i2,creatureCurve:s2,youngShareFar:r2,adultsFrom:a2,adultShareFar:o2,legendChanceFar:l2,legendNextToHome:c2,legendsFrom:h2,creatureSimRadius:u2,creatureSpeed:d2,_setPieces:f2,setPieceChance:p2,setPieceScale:m2,setPieceClear:g2,_placement:x2,setPieceFootprint:M2,soundsystemFootprint:v2,reserveMargin:_2,treeMarginFromSoundsystem:b2,legendSpeed:y2},ls=w2;class S2{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,s=x=>this.pressed.has(x);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),c=s("Backquote"),f=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,d=s("KeyE")||s("KeyR");const u=s("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const g=S=>!!x.buttons[S]?.pressed,w=x.buttons.some((S,R)=>S.pressed&&!this.padPrev[R])&&!!this.onAny?.(),y=S=>!w&&g(S)&&!this.padPrev[S];let A=x.axes[0]??0,b=x.axes[1]??0;const E=Math.hypot(A,b),_=.18;if(E<_)A=0,b=0;else{const S=(Math.min(1,E)-_)/(1-_)/E;A*=S,b*=S}A+=(g(15)?1:0)-(g(14)?1:0),b+=(g(13)?1:0)-(g(12)?1:0),r+=A,a+=b,y(3)&&(o=!0),(y(4)||y(6))&&(h+=1),(y(5)||y(7))&&(h-=1),y(8)&&(c=!0),g(0)&&(f=!0),y(2)&&(d=!0),this.padPrev=x.buttons.map(S=>S.pressed);break}const m=this.touch;r+=m.x,a+=m.y,m.toggle&&(o=!0),h+=m.zoom,m.debug&&(c=!0),m.talk&&(f=!0),m.sigil&&(d=!0),m.toggle=!1,m.zoom=0,m.debug=!1,m.sigil=!1;const M=Math.hypot(r,a);return M>1&&(r/=M,a/=M),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:c,nextWave:e,pauseWaves:t,talk:f,sigil:d,inviteNearest:u}}}const Hc="186",E2=0,Wh=1,A2=2,Wa=1,T2=2,zr=3,Ts=0,Un=1,Qn=2,Ti=0,sr=1,Ri=2,Vh=3,Yh=4,vo=5,Qs=100,R2=101,C2=102,L2=103,P2=104,Gc=200,D2=201,Wc=202,I2=203,Vc=204,Yc=205,O2=206,F2=207,N2=208,U2=209,k2=210,B2=211,z2=212,H2=213,G2=214,Fl=0,Nl=1,Ul=2,Yr=3,kl=4,Bl=5,eo=6,zl=7,Bd=0,W2=1,V2=2,Ci=0,zd=1,Hd=2,Gd=3,Wd=4,Vd=5,Yd=6,Xd=7,Kd=300,Rs=301,fr=302,Oo=303,Fo=304,_o=306,to=1e3,zi=1001,Hl=1002,Yt=1003,Y2=1004,la=1005,$t=1006,No=1007,_s=1008,Gn=1009,qd=1010,$d=1011,Xr=1012,Xc=1013,Li=1014,ci=1015,Pi=1016,Kc=1017,qc=1018,Kr=1020,Zd=35902,Jd=35899,Qd=1021,jd=1022,Vn=1023,Wi=1026,bs=1027,$c=1028,Zc=1029,Cs=1030,Jc=1031,Qc=1033,Va=33776,Ya=33777,Xa=33778,Ka=33779,Gl=35840,Wl=35841,Vl=35842,Yl=35843,Xl=36196,Kl=37492,ql=37496,$l=37488,Zl=37489,no=37490,Jl=37491,Ql=37808,jl=37809,ec=37810,tc=37811,nc=37812,ic=37813,sc=37814,rc=37815,ac=37816,oc=37817,lc=37818,cc=37819,hc=37820,uc=37821,dc=36492,fc=36494,pc=36495,mc=36283,gc=36284,io=36285,xc=36286,X2=3200,Xh=0,K2=1,Wn="",Zn="srgb",qr="srgb-linear",so="linear",Lt="srgb",Uo=7680,q2=519,$2=512,Z2=513,J2=514,jc=515,Q2=516,j2=517,eh=518,ex=519,tx=35044,rr=35048,Kh="300 es",Ai=2e3,ro=2001;function nx(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ao(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ix(){const n=ao("canvas");return n.style.display="block",n}const qh={};function $h(...n){const e="THREE."+n.shift();console.log(e,...n)}function ef(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Qe(...n){n=ef(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Mt(...n){n=ef(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ar(...n){const e=n.join(" ");e in qh||(qh[e]=!0,Qe(...n))}function sx(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const rx={[Fl]:Nl,[Ul]:eo,[kl]:zl,[Yr]:Bl,[Nl]:Fl,[eo]:Ul,[zl]:kl,[Bl]:Yr};class Ds{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ko=Math.PI/180,Mc=180/Math.PI;function jr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]).toLowerCase()}function dt(n,e,t){return Math.max(e,Math.min(t,n))}function ax(n,e){return(n%e+e)%e}function Bo(n,e,t){return(1-t)*n+t*e}function Rr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function On(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class je{static{je.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _r{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],c=i[s+1],f=i[s+2],d=i[s+3],u=r[a+0],p=r[a+1],m=r[a+2],M=r[a+3];if(d!==M||h!==u||c!==p||f!==m){let x=h*u+c*p+f*m+d*M;x<0&&(u=-u,p=-p,m=-m,M=-M,x=-x);let g=1-o;if(x<.9995){const v=Math.acos(x),w=Math.sin(v);g=Math.sin(g*v)/w,o=Math.sin(o*v)/w,h=h*g+u*o,c=c*g+p*o,f=f*g+m*o,d=d*g+M*o}else{h=h*g+u*o,c=c*g+p*o,f=f*g+m*o,d=d*g+M*o;const v=1/Math.sqrt(h*h+c*c+f*f+d*d);h*=v,c*=v,f*=v,d*=v}}e[t]=h,e[t+1]=c,e[t+2]=f,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],c=i[s+2],f=i[s+3],d=r[a],u=r[a+1],p=r[a+2],m=r[a+3];return e[t]=o*m+f*d+h*p-c*u,e[t+1]=h*m+f*u+c*d-o*p,e[t+2]=c*m+f*p+o*u-h*d,e[t+3]=f*m-o*d-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),f=o(s/2),d=o(r/2),u=h(i/2),p=h(s/2),m=h(r/2);switch(a){case"XYZ":this._x=u*f*d+c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d-u*p*m;break;case"YXZ":this._x=u*f*d+c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d+u*p*m;break;case"ZXY":this._x=u*f*d-c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d-u*p*m;break;case"ZYX":this._x=u*f*d-c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d+u*p*m;break;case"YZX":this._x=u*f*d+c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d-u*p*m;break;case"XZY":this._x=u*f*d-c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d+u*p*m;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],c=t[2],f=t[6],d=t[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(f-h)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(f-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+f)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(h+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+s*c-r*h,this._y=s*f+a*h+r*o-i*c,this._z=r*f+a*c+i*h-s*o,this._w=a*f-i*o-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);h=Math.sin(h*c)/f,t=Math.sin(t*c)/f,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*s-o*i),f=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+h*c+a*d-o*f,this.y=i+h*f+o*c-r*d,this.z=s+h*d+r*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return zo.copy(this).projectOnVector(e),this.sub(zo)}reflect(e){return this.sub(zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new W,Zh=new _r;class tt{static{tt.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c)}set(e,t,i,s,r,a,o,h,c){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=r,f[5]=h,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],f=i[4],d=i[7],u=i[2],p=i[5],m=i[8],M=s[0],x=s[3],g=s[6],v=s[1],w=s[4],y=s[7],A=s[2],b=s[5],E=s[8];return r[0]=a*M+o*v+h*A,r[3]=a*x+o*w+h*b,r[6]=a*g+o*y+h*E,r[1]=c*M+f*v+d*A,r[4]=c*x+f*w+d*b,r[7]=c*g+f*y+d*E,r[2]=u*M+p*v+m*A,r[5]=u*x+p*w+m*b,r[8]=u*g+p*y+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*r*f+i*o*h+s*r*c-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8],d=f*a-o*c,u=o*h-f*r,p=c*r-a*h,m=t*d+i*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=d*M,e[1]=(s*c-f*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(f*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-s*c,s*h,-s*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return ar("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ho.makeScale(e,t)),this}rotate(e){return ar("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ho.makeRotation(-e)),this}translate(e,t){return ar("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ho.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ho=new tt,Jh=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qh=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ox(){const n={enabled:!0,workingColorSpace:qr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Lt&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Lt&&(s.r=or(s.r),s.g=or(s.g),s.b=or(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?so:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ar("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ar("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[qr]:{primaries:e,whitePoint:i,transfer:so,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zn},outputColorSpaceConfig:{drawingBufferColorSpace:Zn}},[Zn]:{primaries:e,whitePoint:i,transfer:Lt,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zn}}}),n}const ut=ox();function Hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ns;class lx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ns===void 0&&(Ns=ao("canvas")),Ns.width=e.width,Ns.height=e.height;const s=Ns.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ns}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ao("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Hi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hi(t[i]/255)*255):t[i]=Hi(t[i]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cx=0;class th{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=jr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Go(s[a].image)):r.push(Go(s[a]))}else r=Go(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Go(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}let hx=0;const Wo=new W;class En extends Ds{constructor(e=En.DEFAULT_IMAGE,t=En.DEFAULT_MAPPING,i=zi,s=zi,r=$t,a=_s,o=Vn,h=Gn,c=En.DEFAULT_ANISOTROPY,f=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=jr(),this.name="",this.source=new th(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wo).x}get height(){return this.source.getSize(Wo).y}get depth(){return this.source.getSize(Wo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case to:e.x=e.x-Math.floor(e.x);break;case zi:e.x=e.x<0?0:1;break;case Hl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case to:e.y=e.y-Math.floor(e.y);break;case zi:e.y=e.y<0?0:1;break;case Hl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=Kd;En.DEFAULT_ANISOTROPY=1;class ht{static{ht.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,c=h[0],f=h[4],d=h[8],u=h[1],p=h[5],m=h[9],M=h[2],x=h[6],g=h[10];if(Math.abs(f-u)<.01&&Math.abs(d-M)<.01&&Math.abs(m-x)<.01){if(Math.abs(f+u)<.1&&Math.abs(d+M)<.1&&Math.abs(m+x)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(p+1)/2,A=(g+1)/2,b=(f+u)/4,E=(d+M)/4,_=(m+x)/4;return w>y&&w>A?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=b/i,r=E/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=_/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=E/r,s=_/r),this.set(i,s,r,t),this}let v=Math.sqrt((x-m)*(x-m)+(d-M)*(d-M)+(u-f)*(u-f));return Math.abs(v)<.001&&(v=1),this.x=(x-m)/v,this.y=(d-M)/v,this.z=(u-f)/v,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(dt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ux extends Ds{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new En(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new th(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends ux{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class tf extends En{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class dx extends En{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ft{static{Ft.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,x)}set(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,x){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=h,g[2]=c,g[6]=f,g[10]=d,g[14]=u,g[3]=p,g[7]=m,g[11]=M,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Us.setFromMatrixColumn(e,0).length(),r=1/Us.setFromMatrixColumn(e,1).length(),a=1/Us.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),c=Math.sin(s),f=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*f,p=a*d,m=o*f,M=o*d;t[0]=h*f,t[4]=-h*d,t[8]=c,t[1]=p+m*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=m+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*f,p=h*d,m=c*f,M=c*d;t[0]=u+M*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*f,t[9]=-o,t[2]=p*o-m,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*f,p=h*d,m=c*f,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*f,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*f,p=a*d,m=o*f,M=o*d;t[0]=h*f,t[4]=m*c-p,t[8]=u*c+M,t[1]=h*d,t[5]=M*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*f,t[4]=M-u*d,t[8]=m*d+p,t[1]=d,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=p*d+m,t[10]=u-M*d}else if(e.order==="XZY"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*f,t[4]=-d,t[8]=c*f,t[1]=u*d+M,t[5]=a*f,t[9]=p*d-m,t[2]=m*d-p,t[6]=o*f,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fx,e,px)}lookAt(e,t,i){const s=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),$i.crossVectors(i,Bn),$i.lengthSq()===0&&(Math.abs(i.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),$i.crossVectors(i,Bn)),$i.normalize(),ca.crossVectors(Bn,$i),s[0]=$i.x,s[4]=ca.x,s[8]=Bn.x,s[1]=$i.y,s[5]=ca.y,s[9]=Bn.y,s[2]=$i.z,s[6]=ca.z,s[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],f=i[1],d=i[5],u=i[9],p=i[13],m=i[2],M=i[6],x=i[10],g=i[14],v=i[3],w=i[7],y=i[11],A=i[15],b=s[0],E=s[4],_=s[8],S=s[12],R=s[1],T=s[5],L=s[9],O=s[13],I=s[2],U=s[6],B=s[10],Y=s[14],se=s[3],K=s[7],re=s[11],F=s[15];return r[0]=a*b+o*R+h*I+c*se,r[4]=a*E+o*T+h*U+c*K,r[8]=a*_+o*L+h*B+c*re,r[12]=a*S+o*O+h*Y+c*F,r[1]=f*b+d*R+u*I+p*se,r[5]=f*E+d*T+u*U+p*K,r[9]=f*_+d*L+u*B+p*re,r[13]=f*S+d*O+u*Y+p*F,r[2]=m*b+M*R+x*I+g*se,r[6]=m*E+M*T+x*U+g*K,r[10]=m*_+M*L+x*B+g*re,r[14]=m*S+M*O+x*Y+g*F,r[3]=v*b+w*R+y*I+A*se,r[7]=v*E+w*T+y*U+A*K,r[11]=v*_+w*L+y*B+A*re,r[15]=v*S+w*O+y*Y+A*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],c=e[13],f=e[2],d=e[6],u=e[10],p=e[14],m=e[3],M=e[7],x=e[11],g=e[15],v=h*p-c*u,w=o*p-c*d,y=o*u-h*d,A=a*p-c*f,b=a*u-h*f,E=a*d-o*f;return t*(M*v-x*w+g*y)-i*(m*v-x*A+g*b)+s*(m*w-M*A+g*E)-r*(m*y-M*b+x*E)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],c=e[6],f=e[10];return t*(a*f-o*c)-i*(r*f-o*h)+s*(r*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8],d=e[9],u=e[10],p=e[11],m=e[12],M=e[13],x=e[14],g=e[15],v=t*o-i*a,w=t*h-s*a,y=t*c-r*a,A=i*h-s*o,b=i*c-r*o,E=s*c-r*h,_=f*M-d*m,S=f*x-u*m,R=f*g-p*m,T=d*x-u*M,L=d*g-p*M,O=u*g-p*x,I=v*O-w*L+y*T+A*R-b*S+E*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/I;return e[0]=(o*O-h*L+c*T)*U,e[1]=(s*L-i*O-r*T)*U,e[2]=(M*E-x*b+g*A)*U,e[3]=(u*b-d*E-p*A)*U,e[4]=(h*R-a*O-c*S)*U,e[5]=(t*O-s*R+r*S)*U,e[6]=(x*y-m*E-g*w)*U,e[7]=(f*E-u*y+p*w)*U,e[8]=(a*L-o*R+c*_)*U,e[9]=(i*R-t*L-r*_)*U,e[10]=(m*b-M*y+g*v)*U,e[11]=(d*y-f*b-p*v)*U,e[12]=(o*S-a*T-h*_)*U,e[13]=(t*T-i*S+s*_)*U,e[14]=(M*w-m*A-x*v)*U,e[15]=(f*A-d*w+u*v)*U,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,c=r*a,f=r*o;return this.set(c*a+i,c*o-s*h,c*h+s*o,0,c*o+s*h,f*o+i,f*h-s*a,0,c*h-s*o,f*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,c=r+r,f=a+a,d=o+o,u=r*c,p=r*f,m=r*d,M=a*f,x=a*d,g=o*d,v=h*c,w=h*f,y=h*d,A=i.x,b=i.y,E=i.z;return s[0]=(1-(M+g))*A,s[1]=(p+y)*A,s[2]=(m-w)*A,s[3]=0,s[4]=(p-y)*b,s[5]=(1-(u+g))*b,s[6]=(x+v)*b,s[7]=0,s[8]=(m+w)*E,s[9]=(x-v)*E,s[10]=(1-(u+M))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Us.set(s[0],s[1],s[2]).length();const o=Us.set(s[4],s[5],s[6]).length(),h=Us.set(s[8],s[9],s[10]).length();r<0&&(a=-a),si.copy(this);const c=1/a,f=1/o,d=1/h;return si.elements[0]*=c,si.elements[1]*=c,si.elements[2]*=c,si.elements[4]*=f,si.elements[5]*=f,si.elements[6]*=f,si.elements[8]*=d,si.elements[9]*=d,si.elements[10]*=d,t.setFromRotationMatrix(si),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=Ai,h=!1){const c=this.elements,f=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let m,M;if(h)m=r/(a-r),M=a*r/(a-r);else if(o===Ai)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===ro)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ai,h=!1){const c=this.elements,f=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let m,M;if(h)m=1/(a-r),M=a/(a-r);else if(o===Ai)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===ro)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Us=new W,si=new Ft,fx=new W(0,0,0),px=new W(1,1,1),$i=new W,ca=new W,Bn=new W,jh=new Ft,eu=new _r;class Ls{constructor(e=0,t=0,i=0,s=Ls.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],c=s[5],f=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(dt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return eu.setFromEuler(this),this.setFromQuaternion(eu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ls.DEFAULT_ORDER="XYZ";class nf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mx=0;const tu=new W,ks=new _r,Fi=new Ft,ha=new W,Cr=new W,gx=new W,xx=new _r,nu=new W(1,0,0),iu=new W(0,1,0),su=new W(0,0,1),ru={type:"added"},Mx={type:"removed"},Bs={type:"childadded",child:null},Vo={type:"childremoved",child:null};class Ln extends Ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=jr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new W,t=new Ls,i=new _r,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new tt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(nu,e)}rotateY(e){return this.rotateOnAxis(iu,e)}rotateZ(e){return this.rotateOnAxis(su,e)}translateOnAxis(e,t){return tu.copy(e).applyQuaternion(this.quaternion),this.position.add(tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nu,e)}translateY(e){return this.translateOnAxis(iu,e)}translateZ(e){return this.translateOnAxis(su,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ha.copy(e):ha.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(Cr,ha,this.up):Fi.lookAt(ha,Cr,this.up),this.quaternion.setFromRotationMatrix(Fi),s&&(Fi.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Fi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ru),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Mx),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ru),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,gx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,xx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,f=h.length;c<f;c++){const d=h[c];r(e.shapes,d)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),f=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const h=[];for(const c in o){const f=o[c];delete f.metadata,h.push(f)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ln.DEFAULT_UP=new W(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ys extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vx={type:"move"};class Yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),g=this._getHandJoint(c,M);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=f.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vx)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ys;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},ua={h:0,s:0,l:0};function Xo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class lt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=ax(e,1),t=dt(t,0,1),i=dt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Xo(a,r,e+1/3),this.g=Xo(a,r,e),this.b=Xo(a,r,e-1/3)}return ut.colorSpaceToWorking(this,s),this}setStyle(e,t=Zn){function i(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zn){const i=sf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hi(e.r),this.g=Hi(e.g),this.b=Hi(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zn){return ut.workingToColorSpace(yn.copy(this),e),Math.round(dt(yn.r*255,0,255))*65536+Math.round(dt(yn.g*255,0,255))*256+Math.round(dt(yn.b*255,0,255))}getHexString(e=Zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(yn.copy(this),t);const i=yn.r,s=yn.g,r=yn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,c;const f=(o+a)/2;if(o===a)h=0,c=0;else{const d=a-o;switch(c=f<=.5?d/(a+o):d/(2-a-o),a){case i:h=(s-r)/d+(s<r?6:0);break;case s:h=(r-i)/d+2;break;case r:h=(i-s)/d+4;break}h/=6}return e.h=h,e.s=c,e.l=f,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=Zn){ut.workingToColorSpace(yn.copy(this),e);const t=yn.r,i=yn.g,s=yn.b;return e!==Zn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(ua);const i=Bo(Zi.h,ua.h,t),s=Bo(Zi.s,ua.s,t),r=Bo(Zi.l,ua.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new lt;lt.NAMES=sf;class au extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ls,this.environmentIntensity=1,this.environmentRotation=new Ls,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ri=new W,Ni=new W,Ko=new W,Ui=new W,zs=new W,Hs=new W,ou=new W,qo=new W,$o=new W,Zo=new W,Jo=new ht,Qo=new ht,jo=new ht;class li{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ri.subVectors(e,t),s.cross(ri);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ri.subVectors(s,t),Ni.subVectors(i,t),Ko.subVectors(e,t);const a=ri.dot(ri),o=ri.dot(Ni),h=ri.dot(Ko),c=Ni.dot(Ni),f=Ni.dot(Ko),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*h-o*f)*u,m=(a*f-o*h)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Ui)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Ui.x),h.addScaledVector(a,Ui.y),h.addScaledVector(o,Ui.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return Jo.setScalar(0),Qo.setScalar(0),jo.setScalar(0),Jo.fromBufferAttribute(e,t),Qo.fromBufferAttribute(e,i),jo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Jo,r.x),a.addScaledVector(Qo,r.y),a.addScaledVector(jo,r.z),a}static isFrontFacing(e,t,i,s){return ri.subVectors(i,t),Ni.subVectors(e,t),ri.cross(Ni).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ri.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ri.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return li.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return li.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;zs.subVectors(s,i),Hs.subVectors(r,i),qo.subVectors(e,i);const h=zs.dot(qo),c=Hs.dot(qo);if(h<=0&&c<=0)return t.copy(i);$o.subVectors(e,s);const f=zs.dot($o),d=Hs.dot($o);if(f>=0&&d<=f)return t.copy(s);const u=h*d-f*c;if(u<=0&&h>=0&&f<=0)return a=h/(h-f),t.copy(i).addScaledVector(zs,a);Zo.subVectors(e,r);const p=zs.dot(Zo),m=Hs.dot(Zo);if(m>=0&&p<=m)return t.copy(r);const M=p*c-h*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Hs,o);const x=f*m-p*d;if(x<=0&&d-f>=0&&p-m>=0)return ou.subVectors(r,s),o=(d-f)/(d-f+(p-m)),t.copy(s).addScaledVector(ou,o);const g=1/(x+M+u);return a=M*g,o=u*g,t.copy(i).addScaledVector(zs,a).addScaledVector(Hs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class as{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ai):ai.fromBufferAttribute(r,a),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),da.copy(i.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),fa.subVectors(this.max,Lr),Gs.subVectors(e.a,Lr),Ws.subVectors(e.b,Lr),Vs.subVectors(e.c,Lr),Ji.subVectors(Ws,Gs),Qi.subVectors(Vs,Ws),cs.subVectors(Gs,Vs);let t=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-cs.z,cs.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,cs.z,0,-cs.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-cs.y,cs.x,0];return!el(t,Gs,Ws,Vs,fa)||(t=[1,0,0,0,1,0,0,0,1],!el(t,Gs,Ws,Vs,fa))?!1:(pa.crossVectors(Ji,Qi),t=[pa.x,pa.y,pa.z],el(t,Gs,Ws,Vs,fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ki=[new W,new W,new W,new W,new W,new W,new W,new W],ai=new W,da=new as,Gs=new W,Ws=new W,Vs=new W,Ji=new W,Qi=new W,cs=new W,Lr=new W,fa=new W,pa=new W,hs=new W;function el(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){hs.fromArray(n,r);const o=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),h=e.dot(hs),c=t.dot(hs),f=i.dot(hs);if(Math.max(-Math.max(h,c,f),Math.min(h,c,f))>o)return!1}return!0}const en=new W,ma=new je;let _x=0;class Pn extends Ds{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_x++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=tx,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Rr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=On(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rr(t,this.array)),t}setX(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rr(t,this.array)),t}setY(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rr(t,this.array)),t}setW(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),i=On(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),i=On(i,this.array),s=On(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),i=On(i,this.array),s=On(s,this.array),r=On(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class rf extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class af extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bt extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const bx=new as,Pr=new W,tl=new W;class Is{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):bx.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);const t=Pr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Pr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(tl)),this.expandByPoint(Pr.copy(e.center).sub(tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yx=0;const qn=new Ft,nl=new Ln,Ys=new W,zn=new as,Dr=new as,cn=new W;class Zt extends Ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yx++}),this.uuid=jr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nx(e)?af:rf)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new tt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,i){return qn.makeTranslation(e,t,i),this.applyMatrix4(qn),this}scale(e,t,i){return qn.makeScale(e,t,i),this.applyMatrix4(qn),this}lookAt(e){return nl.lookAt(e),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(zn.min,Dr.min),zn.expandByPoint(cn),cn.addVectors(zn.max,Dr.max),zn.expandByPoint(cn)):(zn.expandByPoint(Dr.min),zn.expandByPoint(Dr.max))}zn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)cn.fromBufferAttribute(o,c),h&&(Ys.fromBufferAttribute(e,c),cn.add(Ys)),s=Math.max(s,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new W,h[_]=new W;const c=new W,f=new W,d=new W,u=new je,p=new je,m=new je,M=new W,x=new W;function g(_,S,R){c.fromBufferAttribute(i,_),f.fromBufferAttribute(i,S),d.fromBufferAttribute(i,R),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,S),m.fromBufferAttribute(r,R),f.sub(c),d.sub(c),p.sub(u),m.sub(u);const T=1/(p.x*m.y-m.x*p.y);isFinite(T)&&(M.copy(f).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(T),x.copy(d).multiplyScalar(p.x).addScaledVector(f,-m.x).multiplyScalar(T),o[_].add(M),o[S].add(M),o[R].add(M),h[_].add(x),h[S].add(x),h[R].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,S=v.length;_<S;++_){const R=v[_],T=R.start,L=R.count;for(let O=T,I=T+L;O<I;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const w=new W,y=new W,A=new W,b=new W;function E(_){A.fromBufferAttribute(s,_),b.copy(A);const S=o[_];w.copy(S),w.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(b,S);const T=y.dot(h[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,T)}for(let _=0,S=v.length;_<S;++_){const R=v[_],T=R.start,L=R.count;for(let O=T,I=T+L;O<I;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new W,r=new W,a=new W,o=new W,h=new W,c=new W,f=new W,d=new W;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),M=e.getX(u+1),x=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,x),f.subVectors(a,r),d.subVectors(s,r),f.cross(d),o.fromBufferAttribute(i,m),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,x),o.add(f),h.add(f),c.add(f),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),f.subVectors(a,r),d.subVectors(s,r),f.cross(d),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(o,h){const c=o.array,f=o.itemSize,d=o.normalized,u=new c.constructor(h.length*f);let p=0,m=0;for(let M=0,x=h.length;M<x;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*f;for(let g=0;g<f;g++)u[m++]=c[p++]}return new Pn(u,f,d)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],c=e(h,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const h=[],c=r[o];for(let f=0,d=c.length;f<d;f++){const u=c[f],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],f=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];f.push(p.toJSON(e.data))}f.length>0&&(s[h]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const f=s[c];this.setAttribute(c,f.clone(t))}const r=e.morphAttributes;for(const c in r){const f=[],d=r[c];for(let u=0,p=d.length;u<p;u++)f.push(d[u].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const il=new W,wx=new W,Sx=new tt;class ts{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=il.subVectors(i,t).cross(wx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(il),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Sx.getNormalMatrix(e),s=this.coplanarPoint(il).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ex=0;class br extends Ds{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ex++}),this.uuid=jr(),this.name="",this.type="Material",this.blending=sr,this.side=Ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Yc,this.blendEquation=Qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=q2,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Uo,this.stencilZFail=Uo,this.stencilZPass=Uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new lt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ts().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new je().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new je().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Bi=new W,sl=new W,ga=new W,xa=new W;class nh{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){sl.copy(e).add(t).multiplyScalar(.5),ga.copy(t).sub(e).normalize(),xa.copy(this.origin).sub(sl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ga),o=xa.dot(this.direction),h=-xa.dot(ga),c=xa.lengthSq(),f=Math.abs(1-a*a);let d,u,p,m;if(f>0)if(d=a*h-o,u=a*o-h,m=r*f,d>=0)if(u>=-m)if(u<=m){const M=1/f;d*=M,u*=M,p=d*(d+a*u+2*o)+u*(a*d+u+2*h)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-h),r),p=-d*d+u*(u+2*h)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-h),r),p=u*(u+2*h)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-h),r),p=-d*d+u*(u+2*h)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(sl).addScaledVector(ga,u),p}intersectSphere(e,t){if(e.radius<0)return null;Bi.subVectors(e.center,this.origin);const i=Bi.dot(this.direction),s=Bi.dot(Bi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),f>=0?(r=(e.min.y-u.y)*f,a=(e.max.y-u.y)*f):(r=(e.max.y-u.y)*f,a=(e.min.y-u.y)*f),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,h=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,h=(e.min.z-u.z)*d),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,c=o.y,f=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,m=t.x-a.x,M=t.y-a.y,x=t.z-a.z,g=i.x-a.x,v=i.y-a.y,w=i.z-a.z,y=Math.abs(h),A=Math.abs(c),b=Math.abs(f);let E,_,S,R,T,L,O,I,U,B,Y,se;if(y>=A&&y>=b?(S=h,L=d,U=m,se=g,h>=0?(E=c,_=f,R=u,T=p,O=M,I=x,B=v,Y=w):(E=f,_=c,R=p,T=u,O=x,I=M,B=w,Y=v)):A>=b?(S=c,L=u,U=M,se=v,c>=0?(E=f,_=h,R=p,T=d,O=x,I=m,B=w,Y=g):(E=h,_=f,R=d,T=p,O=m,I=x,B=g,Y=w)):(S=f,L=p,U=x,se=w,f>=0?(E=h,_=c,R=d,T=u,O=m,I=M,B=g,Y=v):(E=c,_=h,R=u,T=d,O=M,I=m,B=v,Y=g)),S===0)return null;const K=E/S,re=_/S,F=1/S,te=R-K*L,ae=T-re*L,pe=O-K*U,_e=I-re*U,Pe=B-K*se,q=Y-re*se,ee=Pe*_e-q*pe,k=te*q-ae*Pe,ce=pe*ae-_e*te;if(s){if(ee<0||k<0||ce<0)return null}else if((ee<0||k<0||ce<0)&&(ee>0||k>0||ce>0))return null;const G=ee+k+ce;if(G===0)return null;const $=F*(ee*L+k*U+ce*se);return(G>0?$<0:$>0)?null:this.at($/G,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class of extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ls,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lu=new Ft,us=new nh,Ma=new Is,cu=new W,va=new W,_a=new W,ba=new W,rl=new W,ya=new W,hu=new W,wa=new W;class Gt extends Ln{constructor(e=new Zt,t=new of){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ya.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const f=o[h],d=r[h];f!==0&&(rl.fromBufferAttribute(d,e),a?ya.addScaledVector(rl,f):ya.addScaledVector(rl.sub(t),f))}t.add(ya)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ma.copy(i.boundingSphere),Ma.applyMatrix4(r),us.copy(e.ray).recast(e.near),!(Ma.containsPoint(us.origin)===!1&&(us.intersectSphere(Ma,cu)===null||us.origin.distanceToSquared(cu)>(e.far-e.near)**2))&&(lu.copy(r).invert(),us.copy(e.ray).applyMatrix4(lu),!(i.boundingBox!==null&&us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,us)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,c=r.attributes.uv,f=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),w=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let y=v,A=w;y<A;y+=3){const b=o.getX(y),E=o.getX(y+1),_=o.getX(y+2);s=Sa(this,g,e,i,c,f,d,b,E,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=o.getX(x),w=o.getX(x+1),y=o.getX(x+2);s=Sa(this,a,e,i,c,f,d,v,w,y),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),w=Math.min(h.count,Math.min(x.start+x.count,p.start+p.count));for(let y=v,A=w;y<A;y+=3){const b=y,E=y+1,_=y+2;s=Sa(this,g,e,i,c,f,d,b,E,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=x,w=x+1,y=x+2;s=Sa(this,a,e,i,c,f,d,v,w,y),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function Ax(n,e,t,i,s,r,a,o){let h;if(e.side===Un?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===Ts,o),h===null)return null;wa.copy(o),wa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(wa);return c<t.near||c>t.far?null:{distance:c,point:wa.clone(),object:n}}function Sa(n,e,t,i,s,r,a,o,h,c){n.getVertexPosition(o,va),n.getVertexPosition(h,_a),n.getVertexPosition(c,ba);const f=Ax(n,e,t,i,va,_a,ba,hu);if(f){const d=new W;li.getBarycoord(hu,va,_a,ba,d),s&&(f.uv=li.getInterpolatedAttribute(s,o,h,c,d,new je)),r&&(f.uv1=li.getInterpolatedAttribute(r,o,h,c,d,new je)),a&&(f.normal=li.getInterpolatedAttribute(a,o,h,c,d,new W),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new W,materialIndex:0};li.getNormal(va,_a,ba,u.normal),f.face=u,f.barycoord=d}return f}class ws extends En{constructor(e=null,t=1,i=1,s,r,a,o,h,c=Yt,f=Yt,d,u){super(null,a,o,h,c,f,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ps extends Pn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xs=new Ft,uu=new Ft,Ea=[],du=new as,Tx=new Ft,Ir=new Gt,Or=new Is;class fu extends Gt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ps(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Tx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new as),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xs),du.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(du)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Is),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xs),Or.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ir.geometry=this.geometry,Ir.material=this.material,Ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Or.copy(this.boundingSphere),Or.applyMatrix4(i),e.ray.intersectsSphere(Or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Xs),uu.multiplyMatrices(i,Xs),Ir.matrixWorld=uu,Ir.raycast(e,Ea);for(let a=0,o=Ea.length;a<o;a++){const h=Ea[a];h.instanceId=r,h.object=this,t.push(h)}Ea.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ps(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ws(new Float32Array(s*this.count),s,this.count,$c,ci));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;return r[h]=o,r.set(i,h+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ds=new Is,Rx=new je(.5,.5),Aa=new W;class oo{constructor(e=new ts,t=new ts,i=new ts,s=new ts,r=new ts,a=new ts){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],c=r[3],f=r[4],d=r[5],u=r[6],p=r[7],m=r[8],M=r[9],x=r[10],g=r[11],v=r[12],w=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,p-f,g-m,A-v).normalize(),s[1].setComponents(c+a,p+f,g+m,A+v).normalize(),s[2].setComponents(c+o,p+d,g+M,A+w).normalize(),s[3].setComponents(c-o,p-d,g-M,A-w).normalize(),i)s[4].setComponents(h,u,x,y).normalize(),s[5].setComponents(c-h,p-u,g-x,A-y).normalize();else if(s[4].setComponents(c-h,p-u,g-x,A-y).normalize(),t===Ai)s[5].setComponents(c+h,p+u,g+x,A+y).normalize();else if(t===ro)s[5].setComponents(h,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);const t=Rx.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Aa.x=s.normal.x>0?e.max.x:e.min.x,Aa.y=s.normal.y>0?e.max.y:e.min.y,Aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lf extends br{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const lo=new W,co=new W,pu=new Ft,Fr=new nh,Ta=new Is,al=new W,mu=new W;class Cx extends Ln{constructor(e=new Zt,t=new lf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)lo.fromBufferAttribute(t,s-1),co.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=lo.distanceTo(co);e.setAttribute("lineDistance",new bt(i,1))}else Qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ta.copy(i.boundingSphere),Ta.applyMatrix4(s),Ta.radius+=r,e.ray.intersectsSphere(Ta)===!1)return;pu.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(pu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,f=i.index,u=i.attributes.position;if(f!==null){const p=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=f.getX(M),v=f.getX(M+1),w=Ra(this,e,Fr,h,g,v,M);w&&t.push(w)}if(this.isLineLoop){const M=f.getX(m-1),x=f.getX(p),g=Ra(this,e,Fr,h,M,x,m-1);g&&t.push(g)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=Ra(this,e,Fr,h,M,M+1,M);g&&t.push(g)}if(this.isLineLoop){const M=Ra(this,e,Fr,h,m-1,p,m-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ra(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(lo.fromBufferAttribute(o,s),co.fromBufferAttribute(o,r),t.distanceSqToSegment(lo,co,al,mu)>i)return;al.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(al);if(!(c<e.near||c>e.far))return{distance:c,point:mu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const gu=new W,xu=new W;class ih extends Cx{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)gu.fromBufferAttribute(t,s),xu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+gu.distanceTo(xu);e.setAttribute("lineDistance",new bt(i,1))}else Qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class cf extends br{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mu=new Ft,vc=new nh,Ca=new Is,La=new W;class $r extends Ln{constructor(e=new Zt,t=new cf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(s),Ca.radius+=r,e.ray.intersectsSphere(Ca)===!1)return;Mu.copy(s).invert(),vc.copy(e.ray).applyMatrix4(Mu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){const x=c.getX(m);La.fromBufferAttribute(d,x),vu(La,x,h,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let m=u,M=p;m<M;m++)La.fromBufferAttribute(d,m),vu(La,m,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function vu(n,e,t,i,s,r,a){const o=vc.distanceSqToPoint(n);if(o<t){const h=new W;vc.closestPointToPoint(n,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class hf extends En{constructor(e=[],t=Rs,i,s,r,a,o,h,c,f){super(e,t,i,s,r,a,o,h,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _c extends En{constructor(e,t,i,s,r,a,o,h,c){super(e,t,i,s,r,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pr extends En{constructor(e,t,i=Li,s,r,a,o=Yt,h=Yt,c,f=Wi,d=1){if(f!==Wi&&f!==bs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,h,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new th(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Lx extends pr{constructor(e,t=Li,i=Rs,s,r,a=Yt,o=Yt,h,c=Wi){const f={width:e,height:e,depth:1},d=[f,f,f,f,f,f];super(e,e,t,i,s,r,a,o,h,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uf extends En{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ea extends Zt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],f=[],d=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(f,3)),this.setAttribute("uv",new bt(d,2));function m(M,x,g,v,w,y,A,b,E,_,S){const R=y/E,T=A/_,L=y/2,O=A/2,I=b/2,U=E+1,B=_+1;let Y=0,se=0;const K=new W;for(let re=0;re<B;re++){const F=re*T-O;for(let te=0;te<U;te++){const ae=te*R-L;K[M]=ae*v,K[x]=F*w,K[g]=I,c.push(K.x,K.y,K.z),K[M]=0,K[x]=0,K[g]=b>0?1:-1,f.push(K.x,K.y,K.z),d.push(te/E),d.push(1-re/_),Y+=1}}for(let re=0;re<_;re++)for(let F=0;F<E;F++){const te=u+F+U*re,ae=u+F+U*(re+1),pe=u+(F+1)+U*(re+1),_e=u+(F+1)+U*re;h.push(te,ae,_e),h.push(ae,pe,_e),se+=6}o.addGroup(p,se,S),p+=se,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ho extends Zt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const c=this;s=Math.floor(s),r=Math.floor(r);const f=[],d=[],u=[],p=[];let m=0;const M=[],x=i/2;let g=0;v(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new bt(d,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(p,2));function v(){const y=new W,A=new W;let b=0;const E=(t-e)/i;for(let _=0;_<=r;_++){const S=[],R=_/r,T=R*(t-e)+e;for(let L=0;L<=s;L++){const O=L/s,I=O*h+o,U=Math.sin(I),B=Math.cos(I);A.x=T*U,A.y=-R*i+x,A.z=T*B,d.push(A.x,A.y,A.z),y.set(U,E,B).normalize(),u.push(y.x,y.y,y.z),p.push(O,1-R),S.push(m++)}M.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const R=M[S][_],T=M[S+1][_],L=M[S+1][_+1],O=M[S][_+1];(e>0||S!==0)&&(f.push(R,T,O),b+=3),(t>0||S!==r-1)&&(f.push(T,L,O),b+=3)}c.addGroup(g,b,0),g+=b}function w(y){const A=m,b=new je,E=new W;let _=0;const S=y===!0?e:t,R=y===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,x*R,0),u.push(0,R,0),p.push(.5,.5),m++;const T=m;for(let L=0;L<=s;L++){const I=L/s*h+o,U=Math.cos(I),B=Math.sin(I);E.x=S*B,E.y=x*R,E.z=S*U,d.push(E.x,E.y,E.z),u.push(0,R,0),b.x=U*.5+.5,b.y=B*.5*R+.5,p.push(b.x,b.y),m++}for(let L=0;L<s;L++){const O=A+L,I=T+L;y===!0?f.push(I,I+1,O):f.push(I+1,I,O),_+=3}c.addGroup(g,_,y===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xn extends Zt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),c=o+1,f=h+1,d=e/o,u=t/h,p=[],m=[],M=[],x=[];for(let g=0;g<f;g++){const v=g*u-a;for(let w=0;w<c;w++){const y=w*d-r;m.push(y,-v,0),M.push(0,0,1),x.push(w/o),x.push(1-g/h)}}for(let g=0;g<h;g++)for(let v=0;v<o;v++){const w=v+c*g,y=v+c*(g+1),A=v+1+c*(g+1),b=v+1+c*g;p.push(w,y,b),p.push(y,A,b)}this.setIndex(p),this.setAttribute("position",new bt(m,3)),this.setAttribute("normal",new bt(M,3)),this.setAttribute("uv",new bt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xn(e.width,e.height,e.widthSegments,e.heightSegments)}}function mr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(_u(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(_u(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Tn(n){const e={};for(let t=0;t<n.length;t++){const i=mr(n[t]);for(const s in i)e[s]=i[s]}return e}function _u(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Px(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function df(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}const Dx={clone:mr,merge:Tn};var Ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ox=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xt extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ix,this.fragmentShader=Ox,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=Px(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new lt().setHex(s.value);break;case"v2":this.uniforms[i].value=new je().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ht().fromArray(s.value);break;case"m3":this.uniforms[i].value=new tt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ft().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Fx extends xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nx extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=X2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ux extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pa=new W,Da=new _r,Mi=new W;class ff extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Pa,Da,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pa,Da,Mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Pa,Da,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pa,Da,Mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ji=new W,bu=new je,yu=new je;class Hn extends ff{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Mc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ko*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mc*2*Math.atan(Math.tan(ko*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,bu,yu),t.subVectors(yu,bu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ko*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sh extends ff{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=f*this.view.offsetY,h=o-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class rh extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ks=-90,qs=1;class kx extends Ln{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Hn(Ks,qs,e,t);s.layers=this.layers,this.add(s);const r=new Hn(Ks,qs,e,t);r.layers=this.layers,this.add(r);const a=new Hn(Ks,qs,e,t);a.layers=this.layers,this.add(a);const o=new Hn(Ks,qs,e,t);o.layers=this.layers,this.add(o);const h=new Hn(Ks,qs,e,t);h.layers=this.layers,this.add(h);const c=new Hn(Ks,qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const c of t)this.remove(c);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,c,f]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(d,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Bx extends Hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class pf{static{pf.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function wu(n,e,t,i){const s=zx(i);switch(t){case Qd:return n*e;case $c:return n*e/s.components*s.byteLength;case Zc:return n*e/s.components*s.byteLength;case Cs:return n*e*2/s.components*s.byteLength;case Jc:return n*e*2/s.components*s.byteLength;case jd:return n*e*3/s.components*s.byteLength;case Vn:return n*e*4/s.components*s.byteLength;case Qc:return n*e*4/s.components*s.byteLength;case Va:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Xa:case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wl:case Yl:return Math.max(n,16)*Math.max(e,8)/4;case Gl:case Vl:return Math.max(n,8)*Math.max(e,8)/2;case Xl:case Kl:case $l:case Zl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ql:case no:case Jl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ql:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case jl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ec:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case tc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case nc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ic:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case sc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case rc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ac:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case oc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case lc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case cc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case hc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case uc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case dc:case fc:case pc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case mc:case gc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case io:case xc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zx(n){switch(n){case Gn:case qd:return{byteLength:1,components:1};case Xr:case $d:case Pi:return{byteLength:2,components:1};case Kc:case qc:return{byteLength:2,components:4};case Li:case Xc:case ci:return{byteLength:4,components:1};case Zd:case Jd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hc}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hc);function mf(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Hx(n){const e=new WeakMap;function t(o,h){const c=o.array,f=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,h,c){const f=h.array,d=h.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,f);else{d.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<d.length;p++){const m=d[u],M=d[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,d[u]=M)}d.length=u+1;for(let p=0,m=d.length;p<m;p++){const M=d[p];n.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:s,remove:r,update:a}}var Gx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wx=`#ifdef USE_ALPHAHASH
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
#endif`,Vx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qx=`#ifdef USE_AOMAP
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
#endif`,$x=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zx=`#ifdef USE_BATCHING
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
#endif`,Jx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tM=`#ifdef USE_IRIDESCENCE
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
#endif`,nM=`#ifdef USE_BUMPMAP
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
#endif`,iM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,aM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,oM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,uM=`#define PI 3.141592653589793
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
} // validated`,dM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fM=`vec3 transformedNormal = objectNormal;
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
#endif`,pM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,MM="gl_FragColor = linearToOutputTexel( gl_FragColor );",vM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_M=`#ifdef USE_ENVMAP
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
#endif`,bM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,yM=`#ifdef USE_ENVMAP
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
#endif`,wM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SM=`#ifdef USE_ENVMAP
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
#endif`,EM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,AM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,TM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,RM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,CM=`#ifdef USE_GRADIENTMAP
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
}`,LM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,DM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,OM=`#ifdef USE_ENVMAP
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
#endif`,FM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,NM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,BM=`PhysicalMaterial material;
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
#endif`,zM=`uniform sampler2D dfgLUT;
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
}`,HM=`
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
#endif`,GM=`#if defined( RE_IndirectDiffuse )
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
#endif`,WM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,YM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,XM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,KM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$M=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ZM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,JM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,QM=`#if defined( USE_POINTS_UV )
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
#endif`,jM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ev=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,iv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sv=`#ifdef USE_MORPHTARGETS
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
#endif`,rv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,av=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ov=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,uv=`#ifdef USE_NORMALMAP
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
#endif`,dv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_v=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ev=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Av=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tv=`float getShadowMask() {
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
}`,Rv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cv=`#ifdef USE_SKINNING
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
#endif`,Lv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pv=`#ifdef USE_SKINNING
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
#endif`,Dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nv=`#ifdef USE_TRANSMISSION
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
#endif`,Uv=`#ifdef USE_TRANSMISSION
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
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wv=`uniform sampler2D t2D;
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
}`,Vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qv=`#include <common>
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
}`,$v=`#if DEPTH_PACKING == 3200
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
}`,Zv=`#define DISTANCE
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
}`,Jv=`#define DISTANCE
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
}`,Qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`uniform float scale;
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
}`,t_=`uniform vec3 diffuse;
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
}`,n_=`#include <common>
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
}`,i_=`uniform vec3 diffuse;
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
}`,s_=`#define LAMBERT
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
}`,r_=`#define LAMBERT
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
}`,a_=`#define MATCAP
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
}`,o_=`#define MATCAP
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
}`,l_=`#define NORMAL
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
}`,c_=`#define NORMAL
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
}`,h_=`#define PHONG
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
}`,u_=`#define PHONG
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
}`,d_=`#define STANDARD
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
}`,f_=`#define STANDARD
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
}`,p_=`#define TOON
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
}`,m_=`#define TOON
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
}`,g_=`uniform float size;
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
}`,x_=`uniform vec3 diffuse;
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
}`,M_=`#include <common>
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
}`,v_=`uniform vec3 color;
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
}`,__=`uniform float rotation;
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
}`,b_=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:Gx,alphahash_pars_fragment:Wx,alphamap_fragment:Vx,alphamap_pars_fragment:Yx,alphatest_fragment:Xx,alphatest_pars_fragment:Kx,aomap_fragment:qx,aomap_pars_fragment:$x,batching_pars_vertex:Zx,batching_vertex:Jx,begin_vertex:Qx,beginnormal_vertex:jx,bsdfs:eM,iridescence_fragment:tM,bumpmap_pars_fragment:nM,clipping_planes_fragment:iM,clipping_planes_pars_fragment:sM,clipping_planes_pars_vertex:rM,clipping_planes_vertex:aM,color_fragment:oM,color_pars_fragment:lM,color_pars_vertex:cM,color_vertex:hM,common:uM,cube_uv_reflection_fragment:dM,defaultnormal_vertex:fM,displacementmap_pars_vertex:pM,displacementmap_vertex:mM,emissivemap_fragment:gM,emissivemap_pars_fragment:xM,colorspace_fragment:MM,colorspace_pars_fragment:vM,envmap_fragment:_M,envmap_common_pars_fragment:bM,envmap_pars_fragment:yM,envmap_pars_vertex:wM,envmap_physical_pars_fragment:OM,envmap_vertex:SM,fog_vertex:EM,fog_pars_vertex:AM,fog_fragment:TM,fog_pars_fragment:RM,gradientmap_pars_fragment:CM,lightmap_pars_fragment:LM,lights_lambert_fragment:PM,lights_lambert_pars_fragment:DM,lights_pars_begin:IM,lights_toon_fragment:FM,lights_toon_pars_fragment:NM,lights_phong_fragment:UM,lights_phong_pars_fragment:kM,lights_physical_fragment:BM,lights_physical_pars_fragment:zM,lights_fragment_begin:HM,lights_fragment_maps:GM,lights_fragment_end:WM,lightprobes_pars_fragment:VM,logdepthbuf_fragment:YM,logdepthbuf_pars_fragment:XM,logdepthbuf_pars_vertex:KM,logdepthbuf_vertex:qM,map_fragment:$M,map_pars_fragment:ZM,map_particle_fragment:JM,map_particle_pars_fragment:QM,metalnessmap_fragment:jM,metalnessmap_pars_fragment:ev,morphinstance_vertex:tv,morphcolor_vertex:nv,morphnormal_vertex:iv,morphtarget_pars_vertex:sv,morphtarget_vertex:rv,normal_fragment_begin:av,normal_fragment_maps:ov,normal_pars_fragment:lv,normal_pars_vertex:cv,normal_vertex:hv,normalmap_pars_fragment:uv,clearcoat_normal_fragment_begin:dv,clearcoat_normal_fragment_maps:fv,clearcoat_pars_fragment:pv,iridescence_pars_fragment:mv,opaque_fragment:gv,packing:xv,premultiplied_alpha_fragment:Mv,project_vertex:vv,dithering_fragment:_v,dithering_pars_fragment:bv,roughnessmap_fragment:yv,roughnessmap_pars_fragment:wv,shadowmap_pars_fragment:Sv,shadowmap_pars_vertex:Ev,shadowmap_vertex:Av,shadowmask_pars_fragment:Tv,skinbase_vertex:Rv,skinning_pars_vertex:Cv,skinning_vertex:Lv,skinnormal_vertex:Pv,specularmap_fragment:Dv,specularmap_pars_fragment:Iv,tonemapping_fragment:Ov,tonemapping_pars_fragment:Fv,transmission_fragment:Nv,transmission_pars_fragment:Uv,uv_pars_fragment:kv,uv_pars_vertex:Bv,uv_vertex:zv,worldpos_vertex:Hv,background_vert:Gv,background_frag:Wv,backgroundCube_vert:Vv,backgroundCube_frag:Yv,cube_vert:Xv,cube_frag:Kv,depth_vert:qv,depth_frag:$v,distance_vert:Zv,distance_frag:Jv,equirect_vert:Qv,equirect_frag:jv,linedashed_vert:e_,linedashed_frag:t_,meshbasic_vert:n_,meshbasic_frag:i_,meshlambert_vert:s_,meshlambert_frag:r_,meshmatcap_vert:a_,meshmatcap_frag:o_,meshnormal_vert:l_,meshnormal_frag:c_,meshphong_vert:h_,meshphong_frag:u_,meshphysical_vert:d_,meshphysical_frag:f_,meshtoon_vert:p_,meshtoon_frag:m_,points_vert:g_,points_frag:x_,shadow_vert:M_,shadow_frag:v_,sprite_vert:__,sprite_frag:b_},Te={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},wi={basic:{uniforms:Tn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Tn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new lt(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Tn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Tn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Tn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new lt(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Tn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Tn([Te.points,Te.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Tn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Tn([Te.common,Te.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Tn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Tn([Te.sprite,Te.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:Tn([Te.common,Te.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:Tn([Te.lights,Te.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};wi.physical={uniforms:Tn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Ia={r:0,b:0,g:0},y_=new Ft,gf=new tt;gf.set(-1,0,0,0,1,0,0,0,1);function w_(n,e,t,i,s,r){const a=new lt(0);let o=s===!0?0:1,h,c,f=null,d=0,u=null;function p(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const y=v.backgroundBlurriness>0;w=e.get(w,y)}return w}function m(v){let w=!1;const y=p(v);y===null?x(a,o):y&&y.isColor&&(x(y,1),w=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,w){const y=p(w);y&&(y.isCubeTexture||y.mapping===_o)?(c===void 0&&(c=new Gt(new ea(1,1,1),new xt({name:"BackgroundCubeMaterial",uniforms:mr(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(y_.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(gf),c.material.toneMapped=ut.getTransfer(y.colorSpace)!==Lt,(f!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new Gt(new Xn(2,2),new xt({name:"BackgroundMaterial",uniforms:mr(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=y,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.toneMapped=ut.getTransfer(y.colorSpace)!==Lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||d!==y.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,f=y,d=y.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function x(v,w){v.getRGB(Ia,df(n)),t.buffers.color.setClear(Ia.r,Ia.g,Ia.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),o=w,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,x(a,o)},render:m,addToRenderList:M,dispose:g}}function S_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(T,L,O,I,U){let B=!1;const Y=d(T,I,O,L);r!==Y&&(r=Y,c(r.object)),B=p(T,I,O,U),B&&m(T,I,O,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,y(T,L,O,I),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function h(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function f(T){return n.deleteVertexArray(T)}function d(T,L,O,I){const U=I.wireframe===!0;let B=i[L.id];B===void 0&&(B={},i[L.id]=B);const Y=T.isInstancedMesh===!0?T.id:0;let se=B[Y];se===void 0&&(se={},B[Y]=se);let K=se[O.id];K===void 0&&(K={},se[O.id]=K);let re=K[U];return re===void 0&&(re=u(h()),K[U]=re),re}function u(T){const L=[],O=[],I=[];for(let U=0;U<t;U++)L[U]=0,O[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:I,object:T,attributes:{},index:null}}function p(T,L,O,I){const U=r.attributes,B=L.attributes;let Y=0;const se=O.getAttributes();for(const K in se)if(se[K].location>=0){const F=U[K];let te=B[K];if(te===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(te=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(te=T.instanceColor)),F===void 0||F.attribute!==te||te&&F.data!==te.data)return!0;Y++}return r.attributesNum!==Y||r.index!==I}function m(T,L,O,I){const U={},B=L.attributes;let Y=0;const se=O.getAttributes();for(const K in se)if(se[K].location>=0){let F=B[K];F===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(F=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(F=T.instanceColor));const te={};te.attribute=F,F&&F.data&&(te.data=F.data),U[K]=te,Y++}r.attributes=U,r.attributesNum=Y,r.index=I}function M(){const T=r.newAttributes;for(let L=0,O=T.length;L<O;L++)T[L]=0}function x(T){g(T,0)}function g(T,L){const O=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;O[T]=1,I[T]===0&&(n.enableVertexAttribArray(T),I[T]=1),U[T]!==L&&(n.vertexAttribDivisor(T,L),U[T]=L)}function v(){const T=r.newAttributes,L=r.enabledAttributes;for(let O=0,I=L.length;O<I;O++)L[O]!==T[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function w(T,L,O,I,U,B,Y){Y===!0?n.vertexAttribIPointer(T,L,O,U,B):n.vertexAttribPointer(T,L,O,I,U,B)}function y(T,L,O,I){M();const U=I.attributes,B=O.getAttributes(),Y=L.defaultAttributeValues;for(const se in B){const K=B[se];if(K.location>=0){let re=U[se];if(re===void 0&&(se==="instanceMatrix"&&T.instanceMatrix&&(re=T.instanceMatrix),se==="instanceColor"&&T.instanceColor&&(re=T.instanceColor)),re!==void 0){const F=re.normalized,te=re.itemSize,ae=e.get(re);if(ae===void 0)continue;const pe=ae.buffer,_e=ae.type,Pe=ae.bytesPerElement,q=_e===n.INT||_e===n.UNSIGNED_INT||re.gpuType===Xc;if(re.isInterleavedBufferAttribute){const ee=re.data,k=ee.stride,ce=re.offset;if(ee.isInstancedInterleavedBuffer){for(let G=0;G<K.locationSize;G++)g(K.location+G,ee.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let G=0;G<K.locationSize;G++)x(K.location+G);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let G=0;G<K.locationSize;G++)w(K.location+G,te/K.locationSize,_e,F,k*Pe,(ce+te/K.locationSize*G)*Pe,q)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<K.locationSize;ee++)g(K.location+ee,re.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<K.locationSize;ee++)x(K.location+ee);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let ee=0;ee<K.locationSize;ee++)w(K.location+ee,te/K.locationSize,_e,F,te*Pe,te/K.locationSize*ee*Pe,q)}}else if(Y!==void 0){const F=Y[se];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(K.location,F);break;case 3:n.vertexAttrib3fv(K.location,F);break;case 4:n.vertexAttrib4fv(K.location,F);break;default:n.vertexAttrib1fv(K.location,F)}}}}v()}function A(){S();for(const T in i){const L=i[T];for(const O in L){const I=L[O];for(const U in I){const B=I[U];for(const Y in B)f(B[Y].object),delete B[Y];delete I[U]}}delete i[T]}}function b(T){if(i[T.id]===void 0)return;const L=i[T.id];for(const O in L){const I=L[O];for(const U in I){const B=I[U];for(const Y in B)f(B[Y].object),delete B[Y];delete I[U]}}delete i[T.id]}function E(T){for(const L in i){const O=i[L];for(const I in O){const U=O[I];if(U[T.id]===void 0)continue;const B=U[T.id];for(const Y in B)f(B[Y].object),delete B[Y];delete U[T.id]}}}function _(T){for(const L in i){const O=i[L],I=T.isInstancedMesh===!0?T.id:0,U=O[I];if(U!==void 0){for(const B in U){const Y=U[B];for(const se in Y)f(Y[se].object),delete Y[se];delete U[B]}delete O[I],Object.keys(O).length===0&&delete i[L]}}}function S(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:M,enableAttribute:x,disableUnusedAttributes:v}}function E_(n,e,t){let i;function s(h){i=h}function r(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,f){f!==0&&(n.drawArraysInstanced(i,h,c,f),t.update(c,i,f))}function o(h,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function A_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==Vn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const _=E===Pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Gn&&E!==ci&&!_&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=h(c);f!==c&&(Qe("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:y,maxSamples:A,samples:b}}function T_(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ts,o=new tt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=f(d,u,0)},this.setState=function(d,u,p){const m=d.clippingPlanes,M=d.clipIntersection,x=d.clipShadows,g=n.get(d);if(!s||m===null||m.length===0||r&&!x)r?f(null):c();else{const v=r?0:i,w=v*4;let y=g.clippingState||null;h.value=y,y=f(m,u,w,p);for(let A=0;A!==w;++A)y[A]=t[A];g.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,u,p,m){const M=d!==null?d.length:0;let x=null;if(M!==0){if(x=h.value,m!==!0||x===null){const g=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(x===null||x.length<g)&&(x=new Float32Array(g));for(let w=0,y=p;w!==M;++w,y+=4)a.copy(d[w]).applyMatrix4(v,o),a.normal.toArray(x,y),x[y+3]=a.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}const er=4,R_=6,C_=20,L_=256,Nr=new sh,Su=new lt;let ol=null,ll=0,cl=0,hl=!1;const P_=new W,fs=new W;class Eu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=P_}=r;ol=this._renderer.getRenderTarget(),ll=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ol,ll,cl),this._renderer.xr.enabled=hl,e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Rs||e.mapping===fr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ol=this._renderer.getRenderTarget(),ll=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Pi,format:Vn,colorSpace:qr,depthBuffer:!1},s=Au(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Au(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=D_(r)),this._blurMaterial=O_(r,e,t),this._ggxMaterial=I_(r,e,t)}return s}_compileMaterial(e){const t=new Gt(new Zt,e);this._renderer.compile(t,Nr)}_sceneToCubeUV(e,t,i,s,r){const h=new Hn(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Su),d.toneMapping=Ci,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gt(new ea,new of({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,x=M.material;let g=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,g=!0):(x.color.copy(Su),g=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(h.up.set(0,c[w],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+f[w],r.y,r.z)):y===1?(h.up.set(0,0,c[w]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+f[w],r.z)):(h.up.set(0,c[w],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+f[w]));const A=this._cubeSize;$s(s,y*A,w>2?A:0,A,A),d.setRenderTarget(s),g&&d.render(M,h),d.render(e,h)}d.toneMapping=p,d.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Rs||e.mapping===fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;$s(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,Nr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-f*f),u=c*1.25,p=d*u,{_lodMax:m}=this,M=this._sizeLods[i],x=3*M*(i>m-er?i-m+er:0),g=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=m-t,$s(r,x,g,3*M,2*M),s.setRenderTarget(r),s.render(o,Nr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=m-i,$s(e,x,g,3*M,2*M),s.setRenderTarget(e),s.render(o,Nr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[s],d=3*f*(s>this._lodMax-er?s-this._lodMax+er:0),u=4*(this._cubeSize-f);$s(t,d,u,3*f,2*f),a.setRenderTarget(t),a.render(h,Nr)}}function D_(n){const e=[],t=[];let i=n;const s=n-er+1+R_;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,f=[h,h,c,h,c,c,h,h,c,c,h,c],d=6,u=6,p=3,m=new Float32Array(p*u*d),M=new Float32Array(p*u*d);for(let g=0;g<d;g++){const v=g%3*2/3-1,w=g>2?0:-1,y=[v,w,0,v+2/3,w,0,v+2/3,w+1,0,v,w,0,v+2/3,w+1,0,v,w+1,0];m.set(y,p*u*g);for(let A=0;A<u;A++){const b=f[A*2]*2-1,E=f[A*2+1]*2-1;g===0?fs.set(1,E,b):g===1?fs.set(-b,1,-E):g===2?fs.set(-b,E,1):g===3?fs.set(-1,E,-b):g===4?fs.set(-b,-1,E):fs.set(b,E,-1),fs.toArray(M,(g*u+A)*p)}}const x=new Zt;x.setAttribute("position",new Pn(m,p)),x.setAttribute("outputDirection",new Pn(M,p)),t.push(new Gt(x,null)),i>er&&i--}return{lodMeshes:t,sizeLods:e}}function Au(n,e,t){const i=new ei(n,e,t);return i.texture.mapping=_o,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $s(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function I_(n,e,t){return new xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:L_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bo(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function O_(n,e,t){return new xt({name:"SphericalGaussianBlur",defines:{SAMPLES:C_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:bo(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Tu(){return new xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bo(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Ru(){return new xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function bo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class xf extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new hf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ea(5,5,5),r=new xt({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Un,blending:Ti});r.uniforms.tEquirect.value=t;const a=new Gt(s,r),o=t.minFilter;return t.minFilter===_s&&(t.minFilter=$t),new kx(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function F_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Oo||p===Fo)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const M=new xf(m.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===Oo||p===Fo,M=p===Rs||p===fr;if(m||M){let x=t.get(u);const g=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new Eu(n)),x=m?i.fromEquirectangular(u,x):i.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const v=u.image;return m&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new Eu(n)),x=m?i.fromEquirectangular(u):i.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",f),x.texture):null}}}return u}function o(u,p){return p===Oo?u.mapping=Rs:p===Fo&&(u.mapping=fr),u}function h(u){let p=0;const m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(u){const p=u.target;p.removeEventListener("dispose",f);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function N_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ar("WebGLRenderer: "+i+" extension not supported."),s}}}function U_(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,m=d.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let w=0,y=v.length;w<y;w+=3){const A=v[w+0],b=v[w+1],E=v[w+2];u.push(A,b,b,E,E,A)}}else{const v=m.array;M=m.version;for(let w=0,y=v.length/3-1;w<y;w+=3){const A=w+0,b=w+1,E=w+2;u.push(A,b,b,E,E,A)}}const x=new(m.count>=65535?af:rf)(u,1);x.version=M;const g=r.get(d);g&&e.remove(g),r.set(d,x)}function f(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:h,getWireframeAttribute:f}}function k_(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function h(d,u){n.drawElements(i,u,r,d*a),t.update(u,i,1)}function c(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*a,p),t.update(u,i,p))}function f(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let M=0;for(let x=0;x<p;x++)M+=u[x];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=f}function B_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function z_(n,e,t){const i=new WeakMap,s=new ht;function r(a,o,h){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let S=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let w=0;p===!0&&(w=1),m===!0&&(w=2),M===!0&&(w=3);let y=o.attributes.position.count*w,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*A*4*d),E=new tf(b,y,A,d);E.type=ci,E.needsUpdate=!0;const _=w*4;for(let R=0;R<d;R++){const T=x[R],L=g[R],O=v[R],I=y*A*4*R;for(let U=0;U<T.count;U++){const B=U*_;p===!0&&(s.fromBufferAttribute(T,U),b[I+B+0]=s.x,b[I+B+1]=s.y,b[I+B+2]=s.z,b[I+B+3]=0),m===!0&&(s.fromBufferAttribute(L,U),b[I+B+4]=s.x,b[I+B+5]=s.y,b[I+B+6]=s.z,b[I+B+7]=0),M===!0&&(s.fromBufferAttribute(O,U),b[I+B+8]=s.x,b[I+B+9]=s.y,b[I+B+10]=s.z,b[I+B+11]=O.itemSize===4?s.w:1)}}u={count:d,texture:E,size:new je(y,A)},i.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function H_(n,e,t,i,s){let r=new WeakMap;function a(c){const f=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==f&&(e.update(u),r.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==f&&(p.update(),r.set(p,f))}return u}function o(){r=new WeakMap}function h(c){const f=c.target;f.removeEventListener("dispose",h),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const G_={[zd]:"LINEAR_TONE_MAPPING",[Hd]:"REINHARD_TONE_MAPPING",[Gd]:"CINEON_TONE_MAPPING",[Wd]:"ACES_FILMIC_TONE_MAPPING",[Yd]:"AGX_TONE_MAPPING",[Xd]:"NEUTRAL_TONE_MAPPING",[Vd]:"CUSTOM_TONE_MAPPING"};function W_(n,e,t,i,s,r){const a=new ei(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new Zt;c.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new bt([0,2,0,0,2,0],2));const f=new Fx({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Gt(c,f),u=new sh(-1,1,1,-1,0,1);let p=null,m=null,M=!1,x,g=null,v=[],w=!1;this.setSize=function(y,A){a.setSize(y,A),o!==null&&o.setSize(y,A),h!==null&&h.setSize(y,A);for(let b=0;b<v.length;b++){const E=v[b];E.setSize&&E.setSize(y,A)}},this.setEffects=function(y){v=y,w=v.length>0&&v[0].isRenderPass===!0;const A=a.width,b=a.height;v.length>0&&o===null&&(o=new ei(A,b,{type:Pi,depthBuffer:!1,stencilBuffer:!1}),h=new ei(A,b,{type:Pi,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<v.length;E++){const _=v[E];_.setSize&&_.setSize(A,b)}},this.begin=function(y,A){if(M||y.toneMapping===Ci&&v.length===0)return!1;if(g=A,A!==null){const b=A.width,E=A.height;(a.width!==b||a.height!==E)&&this.setSize(b,E)}return w===!1&&y.setRenderTarget(a),x=y.toneMapping,y.toneMapping=Ci,!0},this.hasRenderPass=function(){return w},this.end=function(y,A){y.toneMapping=x,M=!0;let b=a,E=o;for(let _=0;_<v.length;_++){const S=v[_];S.enabled!==!1&&(S.render(y,E,b,A),S.needsSwap!==!1&&(b=E,E=E===o?h:o))}if(p!==y.outputColorSpace||m!==y.toneMapping){p=y.outputColorSpace,m=y.toneMapping,f.defines={},ut.getTransfer(p)===Lt&&(f.defines.SRGB_TRANSFER="");const _=G_[m];_&&(f.defines[_]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(g),y.render(d,u),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),f.dispose()}}const Mf=new En,bc=new pr(1,1),vf=new tf,_f=new dx,bf=new hf,Cu=[],Lu=[],Pu=new Float32Array(16),Du=new Float32Array(9),Iu=new Float32Array(4);function yr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Cu[s];if(r===void 0&&(r=new Float32Array(s),Cu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function on(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ln(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function yo(n,e){let t=Lu[e];t===void 0&&(t=new Int32Array(e),Lu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function V_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Y_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2fv(this.addr,e),ln(t,e)}}function X_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;n.uniform3fv(this.addr,e),ln(t,e)}}function K_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4fv(this.addr,e),ln(t,e)}}function q_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;Iu.set(i),n.uniformMatrix2fv(this.addr,!1,Iu),ln(t,i)}}function $_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;Du.set(i),n.uniformMatrix3fv(this.addr,!1,Du),ln(t,i)}}function Z_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,i))return;Pu.set(i),n.uniformMatrix4fv(this.addr,!1,Pu),ln(t,i)}}function J_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Q_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2iv(this.addr,e),ln(t,e)}}function j_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3iv(this.addr,e),ln(t,e)}}function eb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4iv(this.addr,e),ln(t,e)}}function tb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function nb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2uiv(this.addr,e),ln(t,e)}}function ib(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3uiv(this.addr,e),ln(t,e)}}function sb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4uiv(this.addr,e),ln(t,e)}}function rb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(bc.compareFunction=t.isReversedDepthBuffer()?eh:jc,r=bc):r=Mf,t.setTexture2D(e||r,s)}function ab(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_f,s)}function ob(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||bf,s)}function lb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||vf,s)}function cb(n){switch(n){case 5126:return V_;case 35664:return Y_;case 35665:return X_;case 35666:return K_;case 35674:return q_;case 35675:return $_;case 35676:return Z_;case 5124:case 35670:return J_;case 35667:case 35671:return Q_;case 35668:case 35672:return j_;case 35669:case 35673:return eb;case 5125:return tb;case 36294:return nb;case 36295:return ib;case 36296:return sb;case 35678:case 36198:case 36298:case 36306:case 35682:return rb;case 35679:case 36299:case 36307:return ab;case 35680:case 36300:case 36308:case 36293:return ob;case 36289:case 36303:case 36311:case 36292:return lb}}function hb(n,e){n.uniform1fv(this.addr,e)}function ub(n,e){const t=yr(e,this.size,2);n.uniform2fv(this.addr,t)}function db(n,e){const t=yr(e,this.size,3);n.uniform3fv(this.addr,t)}function fb(n,e){const t=yr(e,this.size,4);n.uniform4fv(this.addr,t)}function pb(n,e){const t=yr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function mb(n,e){const t=yr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function gb(n,e){const t=yr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xb(n,e){n.uniform1iv(this.addr,e)}function Mb(n,e){n.uniform2iv(this.addr,e)}function vb(n,e){n.uniform3iv(this.addr,e)}function _b(n,e){n.uniform4iv(this.addr,e)}function bb(n,e){n.uniform1uiv(this.addr,e)}function yb(n,e){n.uniform2uiv(this.addr,e)}function wb(n,e){n.uniform3uiv(this.addr,e)}function Sb(n,e){n.uniform4uiv(this.addr,e)}function Eb(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=bc:a=Mf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Ab(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_f,r[a])}function Tb(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||bf,r[a])}function Rb(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);on(i,r)||(n.uniform1iv(this.addr,r),ln(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||vf,r[a])}function Cb(n){switch(n){case 5126:return hb;case 35664:return ub;case 35665:return db;case 35666:return fb;case 35674:return pb;case 35675:return mb;case 35676:return gb;case 5124:case 35670:return xb;case 35667:case 35671:return Mb;case 35668:case 35672:return vb;case 35669:case 35673:return _b;case 5125:return bb;case 36294:return yb;case 36295:return wb;case 36296:return Sb;case 35678:case 36198:case 36298:case 36306:case 35682:return Eb;case 35679:case 36299:case 36307:return Ab;case 35680:case 36300:case 36308:case 36293:return Tb;case 36289:case 36303:case 36311:case 36292:return Rb}}class Lb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cb(t.type)}}class Pb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cb(t.type)}}class Db{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const ul=/(\w+)(\])?(\[|\.)?/g;function Ou(n,e){n.seq.push(e),n.map[e.id]=e}function Ib(n,e,t){const i=n.name,s=i.length;for(ul.lastIndex=0;;){const r=ul.exec(i),a=ul.lastIndex;let o=r[1];const h=r[2]==="]",c=r[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===s){Ou(t,c===void 0?new Lb(o,n,e):new Pb(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Db(o),Ou(t,d)),t=d}}}class qa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);Ib(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Fu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ob=37297;let Fb=0;function Nb(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Nu=new tt;function Ub(n){ut._getMatrix(Nu,ut.workingColorSpace,n);const e=`mat3( ${Nu.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case so:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Uu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Nb(n.getShaderSource(e),o)}else return r}function kb(n,e){const t=Ub(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Bb={[zd]:"Linear",[Hd]:"Reinhard",[Gd]:"Cineon",[Wd]:"ACESFilmic",[Yd]:"AgX",[Xd]:"Neutral",[Vd]:"Custom"};function zb(n,e){const t=Bb[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oa=new W;function Hb(){ut.getLuminanceCoefficients(Oa);const n=Oa.x.toFixed(4),e=Oa.y.toFixed(4),t=Oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function Wb(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Vb(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Hr(n){return n!==""}function ku(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yb=/^[ \t]*#include +<([\w\d./]+)>/gm;function yc(n){return n.replace(Yb,Kb)}const Xb=new Map;function Kb(n,e){let t=at[e];if(t===void 0){const i=Xb.get(e);if(i!==void 0)t=at[i],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yc(t)}const qb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(n){return n.replace(qb,$b)}function $b(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Zb={[Wa]:"SHADOWMAP_TYPE_PCF",[zr]:"SHADOWMAP_TYPE_VSM"};function Jb(n){return Zb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Qb={[Rs]:"ENVMAP_TYPE_CUBE",[fr]:"ENVMAP_TYPE_CUBE",[_o]:"ENVMAP_TYPE_CUBE_UV"};function jb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Qb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const ey={[fr]:"ENVMAP_MODE_REFRACTION"};function ty(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ey[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ny={[Bd]:"ENVMAP_BLENDING_MULTIPLY",[W2]:"ENVMAP_BLENDING_MIX",[V2]:"ENVMAP_BLENDING_ADD"};function iy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ny[n.combine]||"ENVMAP_BLENDING_NONE"}function sy(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ry(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=Jb(t),c=jb(t),f=ty(t),d=iy(t),u=sy(t),p=Gb(t),m=Wb(r),M=s.createProgram();let x,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),g.length>0&&(g+=`
`)):(x=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),g=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?at.tonemapping_pars_fragment:"",t.toneMapping!==Ci?zb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,kb("linearToOutputTexel",t.outputColorSpace),Hb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),a=yc(a),a=ku(a,t),a=Bu(a,t),o=yc(o),o=ku(o,t),o=Bu(o,t),a=zu(a),o=zu(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===Kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const w=v+x+a,y=v+g+o,A=Fu(s,s.VERTEX_SHADER,w),b=Fu(s,s.FRAGMENT_SHADER,y);s.attachShader(M,A),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function E(T){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(M)||"",O=s.getShaderInfoLog(A)||"",I=s.getShaderInfoLog(b)||"",U=L.trim(),B=O.trim(),Y=I.trim();let se=!0,K=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(se=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,A,b);else{const re=Uu(s,A,"vertex"),F=Uu(s,b,"fragment");Mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+U+`
`+re+`
`+F)}else U!==""?Qe("WebGLProgram: Program Info Log:",U):(B===""||Y==="")&&(K=!1);K&&(T.diagnostics={runnable:se,programLog:U,vertexShader:{log:B,prefix:x},fragmentShader:{log:Y,prefix:g}})}s.deleteShader(A),s.deleteShader(b),_=new qa(s,M),S=Vb(s,M)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(M,Ob)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fb++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=b,this}let ay=0;class oy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ly(e),t.set(e,i)),i}}class ly{constructor(e){this.id=ay++,this.code=e,this.usedTimes=0}}function cy(n){return n===Cs||n===no||n===io}function hy(n,e,t,i,s,r){const a=new nf,o=new oy,h=new Set,c=[],f=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,S,R,T,L,O){const I=T.fog,U=L.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?T.environment:null,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,se=e.get(_.envMap||B,Y),K=se&&se.mapping===_o?se.image.height:null,re=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Qe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const F=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,te=F!==void 0?F.length:0;let ae=0;U.morphAttributes.position!==void 0&&(ae=1),U.morphAttributes.normal!==void 0&&(ae=2),U.morphAttributes.color!==void 0&&(ae=3);let pe,_e,Pe,q;if(re){const Ut=wi[re];pe=Ut.vertexShader,_e=Ut.fragmentShader}else{pe=_.vertexShader,_e=_.fragmentShader;const Ut=o.getVertexShaderStage(_),yt=o.getFragmentShaderStage(_);o.update(_,Ut,yt),Pe=Ut.id,q=yt.id}const ee=n.getRenderTarget(),k=n.state.buffers.depth.getReversed(),ce=L.isInstancedMesh===!0,G=L.isBatchedMesh===!0,$=!!_.map,fe=!!_.matcap,he=!!se,J=!!_.aoMap,le=!!_.lightMap,ve=!!_.bumpMap&&_.wireframe===!1,Ie=!!_.normalMap,Ve=!!_.displacementMap,Ke=!!_.emissiveMap,Ne=!!_.metalnessMap,Ge=!!_.roughnessMap,z=_.anisotropy>0,$e=_.clearcoat>0,Be=_.dispersion>0,N=_.retroreflectivity>0,C=_.iridescence>0,H=_.sheen>0,Z=_.transmission>0,ne=z&&!!_.anisotropyMap,Me=$e&&!!_.clearcoatMap,be=$e&&!!_.clearcoatNormalMap,oe=$e&&!!_.clearcoatRoughnessMap,ue=C&&!!_.iridescenceMap,ye=C&&!!_.iridescenceThicknessMap,ze=H&&!!_.sheenColorMap,Ae=H&&!!_.sheenRoughnessMap,we=!!_.specularMap,Ye=!!_.specularColorMap,Je=!!_.specularIntensityMap,nt=Z&&!!_.transmissionMap,X=Z&&!!_.thicknessMap,Se=!!_.gradientMap,de=!!_.alphaMap,Ee=_.alphaTest>0,De=!!_.alphaHash,ge=!!_.extensions;let Xe=Ci;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Xe=n.toneMapping);const He={shaderID:re,shaderType:_.type,shaderName:_.name,vertexShader:pe,fragmentShader:_e,defines:_.defines,customVertexShaderID:Pe,customFragmentShaderID:q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:G,batchingColor:G&&L._colorsTexture!==null,instancing:ce,instancingColor:ce&&L.instanceColor!==null,instancingMorph:ce&&L.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:$,matcap:fe,envMap:he,envMapMode:he&&se.mapping,envMapCubeUVHeight:K,aoMap:J,lightMap:le,bumpMap:ve,normalMap:Ie,displacementMap:Ve,emissiveMap:Ke,normalMapObjectSpace:Ie&&_.normalMapType===K2,normalMapTangentSpace:Ie&&_.normalMapType===Xh,packedNormalMap:Ie&&_.normalMapType===Xh&&cy(_.normalMap.format),metalnessMap:Ne,roughnessMap:Ge,anisotropy:z,anisotropyMap:ne,clearcoat:$e,clearcoatMap:Me,clearcoatNormalMap:be,clearcoatRoughnessMap:oe,dispersion:Be,retroreflection:N,iridescence:C,iridescenceMap:ue,iridescenceThicknessMap:ye,sheen:H,sheenColorMap:ze,sheenRoughnessMap:Ae,specularMap:we,specularColorMap:Ye,specularIntensityMap:Je,transmission:Z,transmissionMap:nt,thicknessMap:X,gradientMap:Se,opaque:_.transparent===!1&&_.blending===sr&&_.alphaToCoverage===!1,alphaMap:de,alphaTest:Ee,alphaHash:De,combine:_.combine,mapUv:$&&m(_.map.channel),aoMapUv:J&&m(_.aoMap.channel),lightMapUv:le&&m(_.lightMap.channel),bumpMapUv:ve&&m(_.bumpMap.channel),normalMapUv:Ie&&m(_.normalMap.channel),displacementMapUv:Ve&&m(_.displacementMap.channel),emissiveMapUv:Ke&&m(_.emissiveMap.channel),metalnessMapUv:Ne&&m(_.metalnessMap.channel),roughnessMapUv:Ge&&m(_.roughnessMap.channel),anisotropyMapUv:ne&&m(_.anisotropyMap.channel),clearcoatMapUv:Me&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(_.sheenRoughnessMap.channel),specularMapUv:we&&m(_.specularMap.channel),specularColorMapUv:Ye&&m(_.specularColorMap.channel),specularIntensityMapUv:Je&&m(_.specularIntensityMap.channel),transmissionMapUv:nt&&m(_.transmissionMap.channel),thicknessMapUv:X&&m(_.thicknessMap.channel),alphaMapUv:de&&m(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ie||z),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&($||de),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&Ie===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:k,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ae,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xe,decodeVideoTexture:$&&_.map.isVideoTexture===!0&&ut.getTransfer(_.map.colorSpace)===Lt,decodeVideoTextureEmissive:Ke&&_.emissiveMap.isVideoTexture===!0&&ut.getTransfer(_.emissiveMap.colorSpace)===Lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Qn,flipSided:_.side===Un,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ge&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&_.extensions.multiDraw===!0||G)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return He.vertexUv1s=h.has(1),He.vertexUv2s=h.has(2),He.vertexUv3s=h.has(3),h.clear(),He}function x(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const R in _.defines)S.push(R),S.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(g(S,_),v(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function g(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const S=p[_.type];let R;if(S){const T=wi[S];R=Dx.clone(T.uniforms)}else R=_.uniforms;return R}function y(_,S){let R=f.get(S);return R!==void 0?++R.usedTimes:(R=new ry(n,S,_,s),c.push(R),f.set(S,R)),R}function A(_){if(--_.usedTimes===0){const S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),f.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function E(){o.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:w,acquireProgram:y,releaseProgram:A,releaseShaderCache:b,programs:c,dispose:E}}function uy(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function dy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Gu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,x,g){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:x,group:g},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=x,v.group=g),e++,v}function h(u,p,m,M,x,g,v){v.reversedDepth===!0&&(x=-x);const w=o(u,p,m,M,x,g);m.transmission>0?i.push(w):m.transparent===!0?s.push(w):t.push(w)}function c(u,p,m,M,x,g){const v=o(u,p,m,M,x,g);m.transmission>0?i.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function f(u,p){t.length>1&&t.sort(u||dy),i.length>1&&i.sort(p||Gu),s.length>1&&s.sort(p||Gu)}function d(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:c,finish:d,sort:f}}function fy(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Wu,n.set(i,[a])):s>=r.length?(a=new Wu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function py(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new lt};break;case"SpotLight":t={position:new W,direction:new W,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function my(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let gy=0;function xy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function My(n){const e=new py,t=my(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new Ft,a=new Ft;function o(c){let f=0,d=0,u=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,m=0,M=0,x=0,g=0,v=0,w=0,y=0,A=0,b=0,E=0,_=0,S=0,R=0;c.sort(xy);for(let L=0,O=c.length;L<O;L++){const I=c[L],U=I.color,B=I.intensity,Y=I.distance;let se=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Cs?se=I.shadow.map.texture:se=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)f+=U.r*B,d+=U.g*B,u+=U.b*B;else if(I.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(I.sh.coefficients[K],B);R++}else if(I.isSunLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const re=I.shadow,F=t.get(I);F.shadowIntensity=re.intensity,F.shadowBias=re.bias,F.shadowNormalBias=re.normalBias,F.shadowRadius=re.radius,F.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),i.sunShadow[m]=F,i.sunShadowMap[m]=se;const te=re.getViewportCount();for(let ae=0;ae<te;ae++)i.sunShadowMatrix[M+ae]=re.getMatrix(ae),i.sunShadowCascade[M+ae]=re._cascadeData[ae];M+=te,m++}i.sun[p]=K,p++}else if(I.isDirectionalLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const re=I.shadow,F=t.get(I);F.shadowIntensity=re.intensity,F.shadowBias=re.bias,F.shadowNormalBias=re.normalBias,F.shadowRadius=re.radius,F.shadowMapSize=re.mapSize,i.directionalShadow[x]=F,i.directionalShadowMap[x]=se,i.directionalShadowMatrix[x]=I.shadow.matrix,A++}i.directional[x]=K,x++}else if(I.isSpotLight){const K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(U).multiplyScalar(B),K.distance=Y,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,i.spot[v]=K;const re=I.shadow;if(I.map&&(i.spotLightMap[_]=I.map,_++,re.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[v]=re.matrix,I.castShadow){const F=t.get(I);F.shadowIntensity=re.intensity,F.shadowBias=re.bias,F.shadowNormalBias=re.normalBias,F.shadowRadius=re.radius,F.shadowMapSize=re.mapSize,i.spotShadow[v]=F,i.spotShadowMap[v]=se,E++}v++}else if(I.isRectAreaLight){const K=e.get(I);K.color.copy(U).multiplyScalar(B),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),i.rectArea[w]=K,w++}else if(I.isPointLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){const re=I.shadow,F=t.get(I);F.shadowIntensity=re.intensity,F.shadowBias=re.bias,F.shadowNormalBias=re.normalBias,F.shadowRadius=re.radius,F.shadowMapSize=re.mapSize,F.shadowCameraNear=re.camera.near,F.shadowCameraFar=re.camera.far,i.pointShadow[g]=F,i.pointShadowMap[g]=se,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=K,g++}else if(I.isHemisphereLight){const K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(B),K.groundColor.copy(I.groundColor).multiplyScalar(B),i.hemi[y]=K,y++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=u;const T=i.hash;(T.sunLength!==p||T.directionalLength!==x||T.pointLength!==g||T.spotLength!==v||T.rectAreaLength!==w||T.hemiLength!==y||T.numSunShadows!==m||T.numDirectionalShadows!==A||T.numPointShadows!==b||T.numSpotShadows!==E||T.numSpotMaps!==_||T.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=x,i.spot.length=v,i.rectArea.length=w,i.point.length=g,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.spotLightMatrix.length=E+_-S,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=R,T.sunLength=p,T.directionalLength=x,T.pointLength=g,T.spotLength=v,T.rectAreaLength=w,T.hemiLength=y,T.numSunShadows=m,T.numDirectionalShadows=A,T.numPointShadows=b,T.numSpotShadows=E,T.numSpotMaps=_,T.numLightProbes=R,i.version=gy++)}function h(c,f){let d=0,u=0,p=0,m=0,M=0,x=0;const g=f.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const y=c[v];if(y.isSunLight){const A=i.sun[d];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),d++}else if(y.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),u++}else if(y.isSpotLight){const A=i.spot[m];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),m++}else if(y.isRectAreaLight){const A=i.rectArea[M];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),p++}else if(y.isHemisphereLight){const A=i.hemi[x];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),x++}}}return{setup:o,setupView:h,state:i}}function Vu(n){const e=new My(n),t=[],i=[],s=[];function r(u){d.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function c(){e.setup(t)}function f(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function vy(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Vu(n),e.set(s,[o])):r>=a.length?(o=new Vu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const _y=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,by=`uniform sampler2D shadow_pass;
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
}`,yy=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],wy=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Yu=new Ft,Ur=new W,dl=new W;function Sy(n,e,t){let i=new oo;const s=new je,r=new je,a=new ht,o=new Nx,h=new Ux,c={},f=t.maxTextureSize,d={[Ts]:Un,[Un]:Ts,[Qn]:Qn},u=new xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:_y,fragmentShader:by}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new Zt;m.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Gt(m,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let g=this.type;this.render=function(b,E,_){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||b.length===0)return;this.type===T2&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wa);const S=n.getRenderTarget(),R=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Ti),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=g!==this.type;O&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=b.length;I<U;I++){const B=b[I],Y=B.shadow;if(Y===void 0){Qe("WebGLShadowMap:",B,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const se=Y.getFrameExtents();s.multiply(se),r.copy(Y.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/se.x),s.x=r.x*se.x,Y.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/se.y),s.y=r.y*se.y,Y.mapSize.y=r.y));const K=n.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=K,Y.map===null||O===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===zr){if(B.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new ei(s.x,s.y,{format:Cs,type:Pi,minFilter:$t,magFilter:$t,generateMipmaps:!1}),Y.map.texture.name=B.name+".shadowMap",Y.map.depthTexture=new pr(s.x,s.y,ci),Y.map.depthTexture.name=B.name+".shadowMapDepth",Y.map.depthTexture.format=Wi,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Yt,Y.map.depthTexture.magFilter=Yt}else B.isPointLight?(Y.map=new xf(s.x),Y.map.depthTexture=new Lx(s.x,Li)):(Y.map=new ei(s.x,s.y),Y.map.depthTexture=new pr(s.x,s.y,Li)),Y.map.depthTexture.name=B.name+".shadowMap",Y.map.depthTexture.format=Wi,this.type===Wa?(Y.map.depthTexture.compareFunction=K?eh:jc,Y.map.depthTexture.minFilter=$t,Y.map.depthTexture.magFilter=$t):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Yt,Y.map.depthTexture.magFilter=Yt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);const re=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();B.isPointLight!==!0&&Y.updateMatrices(B,_);for(let F=0;F<re;F++){const te=Y.getCamera(F);if(B.isPointLight){const ae=Y.camera,pe=Y.matrix,_e=B.distance||ae.far;_e!==ae.far&&(ae.far=_e,ae.updateProjectionMatrix()),Ur.setFromMatrixPosition(B.matrixWorld),ae.position.copy(Ur),dl.copy(ae.position),dl.add(yy[F]),ae.up.copy(wy[F]),ae.lookAt(dl),ae.updateMatrixWorld(),pe.makeTranslation(-Ur.x,-Ur.y,-Ur.z),Yu.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Yu,ae.coordinateSystem,ae.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)n.setRenderTarget(Y.map,F),n.clear();else{F===0&&(n.setRenderTarget(Y.map),n.clear());const ae=Y.getViewport(F);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),L.viewport(a)}i=Y.getFrustum(F),y(E,_,te,B,this.type)}Y.isPointLightShadow!==!0&&this.type===zr&&v(Y,_),Y.needsUpdate=!1}g=this.type,x.needsUpdate=!1,n.setRenderTarget(S,R,T)};function v(b,E){const _=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new ei(s.x,s.y,{format:Cs,type:Pi}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(E,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(E,null,_,p,M,null)}function w(b,E,_,S){let R=null;const T=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(T!==void 0)R=T;else if(R=_.isPointLight===!0?h:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const L=R.uuid,O=E.uuid;let I=c[L];I===void 0&&(I={},c[L]=I);let U=I[O];U===void 0&&(U=R.clone(),I[O]=U,E.addEventListener("dispose",A)),R=U}if(R.visible=E.visible,R.wireframe=E.wireframe,S===zr?R.side=E.shadowSide!==null?E.shadowSide:E.side:R.side=E.shadowSide!==null?E.shadowSide:d[E.side],R.alphaMap=E.alphaMap,R.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,R.map=E.map,R.clipShadows=E.clipShadows,R.clippingPlanes=E.clippingPlanes,R.clipIntersection=E.clipIntersection,R.displacementMap=E.displacementMap,R.displacementScale=E.displacementScale,R.displacementBias=E.displacementBias,R.wireframeLinewidth=E.wireframeLinewidth,R.linewidth=E.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const L=n.properties.get(R);L.light=_}return R}function y(b,E,_,S,R){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===zr)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const O=e.update(b),I=b.material;if(Array.isArray(I)){const U=O.groups;for(let B=0,Y=U.length;B<Y;B++){const se=U[B],K=I[se.materialIndex];if(K&&K.visible){const re=w(b,K,S,R);b.onBeforeShadow(n,b,E,_,O,re,se),n.renderBufferDirect(_,null,O,re,b,se),b.onAfterShadow(n,b,E,_,O,re,se)}}}else if(I.visible){const U=w(b,I,S,R);b.onBeforeShadow(n,b,E,_,O,U,null),n.renderBufferDirect(_,null,O,U,b,null),b.onAfterShadow(n,b,E,_,O,U,null)}}const L=b.children;for(let O=0,I=L.length;O<I;O++)y(L[O],E,_,S,R)}function A(b){b.target.removeEventListener("dispose",A);for(const _ in c){const S=c[_],R=b.target.uuid;R in S&&(S[R].dispose(),delete S[R])}}}function Ey(n,e){function t(){let X=!1;const Se=new ht;let de=null;const Ee=new ht(0,0,0,0);return{setMask:function(De){de!==De&&!X&&(n.colorMask(De,De,De,De),de=De)},setLocked:function(De){X=De},setClear:function(De,ge,Xe,He,Ut){Ut===!0&&(De*=He,ge*=He,Xe*=He),Se.set(De,ge,Xe,He),Ee.equals(Se)===!1&&(n.clearColor(De,ge,Xe,He),Ee.copy(Se))},reset:function(){X=!1,de=null,Ee.set(-1,0,0,0)}}}function i(){let X=!1,Se=!1,de=null,Ee=null,De=null;return{setReversed:function(ge){if(Se!==ge){const Xe=e.get("EXT_clip_control");ge?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Se=ge;const He=De;De=null,this.setClear(He)}},getReversed:function(){return Se},setTest:function(ge){ge?ee(n.DEPTH_TEST):k(n.DEPTH_TEST)},setMask:function(ge){de!==ge&&!X&&(n.depthMask(ge),de=ge)},setFunc:function(ge){if(Se&&(ge=rx[ge]),Ee!==ge){switch(ge){case Fl:n.depthFunc(n.NEVER);break;case Nl:n.depthFunc(n.ALWAYS);break;case Ul:n.depthFunc(n.LESS);break;case Yr:n.depthFunc(n.LEQUAL);break;case kl:n.depthFunc(n.EQUAL);break;case Bl:n.depthFunc(n.GEQUAL);break;case eo:n.depthFunc(n.GREATER);break;case zl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=ge}},setLocked:function(ge){X=ge},setClear:function(ge){De!==ge&&(De=ge,Se&&(ge=1-ge),n.clearDepth(ge))},reset:function(){X=!1,de=null,Ee=null,De=null,Se=!1}}}function s(){let X=!1,Se=null,de=null,Ee=null,De=null,ge=null,Xe=null,He=null,Ut=null;return{setTest:function(yt){X||(yt?ee(n.STENCIL_TEST):k(n.STENCIL_TEST))},setMask:function(yt){Se!==yt&&!X&&(n.stencilMask(yt),Se=yt)},setFunc:function(yt,ni,gi){(de!==yt||Ee!==ni||De!==gi)&&(n.stencilFunc(yt,ni,gi),de=yt,Ee=ni,De=gi)},setOp:function(yt,ni,gi){(ge!==yt||Xe!==ni||He!==gi)&&(n.stencilOp(yt,ni,gi),ge=yt,Xe=ni,He=gi)},setLocked:function(yt){X=yt},setClear:function(yt){Ut!==yt&&(n.clearStencil(yt),Ut=yt)},reset:function(){X=!1,Se=null,de=null,Ee=null,De=null,ge=null,Xe=null,He=null,Ut=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,c=new WeakMap;let f={},d={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,w=null,y=null,A=null,b=null,E=null,_=new lt(0,0,0),S=0,R=!1,T=null,L=null,O=null,I=null,U=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,se=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=se>=1):K.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=se>=2);let re=null,F={};const te=n.getParameter(n.SCISSOR_BOX),ae=n.getParameter(n.VIEWPORT),pe=new ht().fromArray(te),_e=new ht().fromArray(ae);function Pe(X,Se,de,Ee){const De=new Uint8Array(4),ge=n.createTexture();n.bindTexture(X,ge),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<de;Xe++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Se+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return ge}const q={};q[n.TEXTURE_2D]=Pe(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=Pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=Pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=Pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(Yr),ve(!1),Ie(Wh),ee(n.CULL_FACE),J(Ti);function ee(X){f[X]!==!0&&(n.enable(X),f[X]=!0)}function k(X){f[X]!==!1&&(n.disable(X),f[X]=!1)}function ce(X,Se){return u[X]!==Se?(n.bindFramebuffer(X,Se),u[X]=Se,X===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Se),X===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function G(X,Se){let de=m,Ee=!1;if(X){de=p.get(Se),de===void 0&&(de=[],p.set(Se,de));const De=X.textures;if(de.length!==De.length||de[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Xe=De.length;ge<Xe;ge++)de[ge]=n.COLOR_ATTACHMENT0+ge;de.length=De.length,Ee=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(de)}function $(X){return M!==X?(n.useProgram(X),M=X,!0):!1}const fe={[Qs]:n.FUNC_ADD,[R2]:n.FUNC_SUBTRACT,[C2]:n.FUNC_REVERSE_SUBTRACT};fe[L2]=n.MIN,fe[P2]=n.MAX;const he={[Gc]:n.ZERO,[D2]:n.ONE,[Wc]:n.SRC_COLOR,[Vc]:n.SRC_ALPHA,[k2]:n.SRC_ALPHA_SATURATE,[N2]:n.DST_COLOR,[O2]:n.DST_ALPHA,[I2]:n.ONE_MINUS_SRC_COLOR,[Yc]:n.ONE_MINUS_SRC_ALPHA,[U2]:n.ONE_MINUS_DST_COLOR,[F2]:n.ONE_MINUS_DST_ALPHA,[B2]:n.CONSTANT_COLOR,[z2]:n.ONE_MINUS_CONSTANT_COLOR,[H2]:n.CONSTANT_ALPHA,[G2]:n.ONE_MINUS_CONSTANT_ALPHA};function J(X,Se,de,Ee,De,ge,Xe,He,Ut,yt){if(X===Ti){x===!0&&(k(n.BLEND),x=!1);return}if(x===!1&&(ee(n.BLEND),x=!0),X!==vo){if(X!==g||yt!==R){if((v!==Qs||A!==Qs)&&(n.blendEquation(n.FUNC_ADD),v=Qs,A=Qs),yt)switch(X){case sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ri:n.blendFunc(n.ONE,n.ONE);break;case Vh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Yh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Mt("WebGLState: Invalid blending: ",X);break}else switch(X){case sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ri:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Vh:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yh:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",X);break}w=null,y=null,b=null,E=null,_.set(0,0,0),S=0,g=X,R=yt}return}De=De||Se,ge=ge||de,Xe=Xe||Ee,(Se!==v||De!==A)&&(n.blendEquationSeparate(fe[Se],fe[De]),v=Se,A=De),(de!==w||Ee!==y||ge!==b||Xe!==E)&&(n.blendFuncSeparate(he[de],he[Ee],he[ge],he[Xe]),w=de,y=Ee,b=ge,E=Xe),(He.equals(_)===!1||Ut!==S)&&(n.blendColor(He.r,He.g,He.b,Ut),_.copy(He),S=Ut),g=X,R=!1}function le(X,Se){X.side===Qn?k(n.CULL_FACE):ee(n.CULL_FACE);let de=X.side===Un;Se&&(de=!de),ve(de),X.blending===sr&&X.transparent===!1?J(Ti):J(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ee=X.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Ke(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):k(n.SAMPLE_ALPHA_TO_COVERAGE)}function ve(X){T!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),T=X)}function Ie(X){X!==E2?(ee(n.CULL_FACE),X!==L&&(X===Wh?n.cullFace(n.BACK):X===A2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):k(n.CULL_FACE),L=X}function Ve(X){X!==O&&(Y&&n.lineWidth(X),O=X)}function Ke(X,Se,de){X?(ee(n.POLYGON_OFFSET_FILL),(I!==Se||U!==de)&&(I=Se,U=de,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,de))):k(n.POLYGON_OFFSET_FILL)}function Ne(X){X?ee(n.SCISSOR_TEST):k(n.SCISSOR_TEST)}function Ge(X){X===void 0&&(X=n.TEXTURE0+B-1),re!==X&&(n.activeTexture(X),re=X)}function z(X,Se,de){de===void 0&&(re===null?de=n.TEXTURE0+B-1:de=re);let Ee=F[de];Ee===void 0&&(Ee={type:void 0,texture:void 0},F[de]=Ee),(Ee.type!==X||Ee.texture!==Se)&&(re!==de&&(n.activeTexture(de),re=de),n.bindTexture(X,Se||q[X]),Ee.type=X,Ee.texture=Se)}function $e(){const X=F[re];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Be(){try{n.compressedTexImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function C(){try{n.texSubImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function H(){try{n.texSubImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ne(){try{n.compressedTexSubImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function Me(){try{n.texStorage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function be(){try{n.texStorage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function oe(){try{n.texImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ue(){try{n.texImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ye(X){return d[X]!==void 0?d[X]:n.getParameter(X)}function ze(X,Se){d[X]!==Se&&(n.pixelStorei(X,Se),d[X]=Se)}function Ae(X){pe.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),pe.copy(X))}function we(X){_e.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),_e.copy(X))}function Ye(X,Se){let de=c.get(Se);de===void 0&&(de=new WeakMap,c.set(Se,de));let Ee=de.get(X);Ee===void 0&&(Ee=n.getUniformBlockIndex(Se,X.name),de.set(X,Ee))}function Je(X,Se){const Ee=c.get(Se).get(X);h.get(Se)!==Ee&&(n.uniformBlockBinding(Se,Ee,X.__bindingPointIndex),h.set(Se,Ee))}function nt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),f={},d={},re=null,F={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,w=null,y=null,A=null,b=null,E=null,_=new lt(0,0,0),S=0,R=!1,T=null,L=null,O=null,I=null,U=null,pe.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:k,bindFramebuffer:ce,drawBuffers:G,useProgram:$,setBlending:J,setMaterial:le,setFlipSided:ve,setCullFace:Ie,setLineWidth:Ve,setPolygonOffset:Ke,setScissorTest:Ne,activeTexture:Ge,bindTexture:z,unbindTexture:$e,compressedTexImage2D:Be,compressedTexImage3D:N,texImage2D:oe,texImage3D:ue,pixelStorei:ze,getParameter:ye,updateUBOMapping:Ye,uniformBlockBinding:Je,texStorage2D:Me,texStorage3D:be,texSubImage2D:C,texSubImage3D:H,compressedTexSubImage2D:Z,compressedTexSubImage3D:ne,scissor:Ae,viewport:we,reset:nt}}function Ay(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new je,f=new WeakMap,d=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(N,C){return m?new OffscreenCanvas(N,C):ao("canvas")}function x(N,C,H){let Z=1;const ne=Be(N);if((ne.width>H||ne.height>H)&&(Z=H/Math.max(ne.width,ne.height)),Z<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const Me=Math.floor(Z*ne.width),be=Math.floor(Z*ne.height);u===void 0&&(u=M(Me,be));const oe=C?M(Me,be):u;return oe.width=Me,oe.height=be,oe.getContext("2d").drawImage(N,0,0,Me,be),Qe("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Me+"x"+be+")."),oe}else return"data"in N&&Qe("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),N;return N}function g(N){return N.generateMipmaps}function v(N){n.generateMipmap(N)}function w(N){return N.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?n.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(N,C,H,Z,ne,Me=!1){if(N!==null){if(n[N]!==void 0)return n[N];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let be;Z&&(be=e.get("EXT_texture_norm16"),be||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=C;if(C===n.RED&&(H===n.FLOAT&&(oe=n.R32F),H===n.HALF_FLOAT&&(oe=n.R16F),H===n.UNSIGNED_BYTE&&(oe=n.R8),H===n.UNSIGNED_SHORT&&be&&(oe=be.R16_EXT),H===n.SHORT&&be&&(oe=be.R16_SNORM_EXT)),C===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(oe=n.R8UI),H===n.UNSIGNED_SHORT&&(oe=n.R16UI),H===n.UNSIGNED_INT&&(oe=n.R32UI),H===n.BYTE&&(oe=n.R8I),H===n.SHORT&&(oe=n.R16I),H===n.INT&&(oe=n.R32I)),C===n.RG&&(H===n.FLOAT&&(oe=n.RG32F),H===n.HALF_FLOAT&&(oe=n.RG16F),H===n.UNSIGNED_BYTE&&(oe=n.RG8),H===n.UNSIGNED_SHORT&&be&&(oe=be.RG16_EXT),H===n.SHORT&&be&&(oe=be.RG16_SNORM_EXT)),C===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(oe=n.RG8UI),H===n.UNSIGNED_SHORT&&(oe=n.RG16UI),H===n.UNSIGNED_INT&&(oe=n.RG32UI),H===n.BYTE&&(oe=n.RG8I),H===n.SHORT&&(oe=n.RG16I),H===n.INT&&(oe=n.RG32I)),C===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(oe=n.RGB8UI),H===n.UNSIGNED_SHORT&&(oe=n.RGB16UI),H===n.UNSIGNED_INT&&(oe=n.RGB32UI),H===n.BYTE&&(oe=n.RGB8I),H===n.SHORT&&(oe=n.RGB16I),H===n.INT&&(oe=n.RGB32I)),C===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(oe=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(oe=n.RGBA16UI),H===n.UNSIGNED_INT&&(oe=n.RGBA32UI),H===n.BYTE&&(oe=n.RGBA8I),H===n.SHORT&&(oe=n.RGBA16I),H===n.INT&&(oe=n.RGBA32I)),C===n.RGB&&(H===n.UNSIGNED_SHORT&&be&&(oe=be.RGB16_EXT),H===n.SHORT&&be&&(oe=be.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(oe=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(oe=n.R11F_G11F_B10F)),C===n.RGBA){const ue=Me?so:ut.getTransfer(ne);H===n.FLOAT&&(oe=n.RGBA32F),H===n.HALF_FLOAT&&(oe=n.RGBA16F),H===n.UNSIGNED_BYTE&&(oe=ue===Lt?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&be&&(oe=be.RGBA16_EXT),H===n.SHORT&&be&&(oe=be.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function A(N,C){let H;return N?C===null||C===Li||C===Kr?H=n.DEPTH24_STENCIL8:C===ci?H=n.DEPTH32F_STENCIL8:C===Xr&&(H=n.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Li||C===Kr?H=n.DEPTH_COMPONENT24:C===ci?H=n.DEPTH_COMPONENT32F:C===Xr&&(H=n.DEPTH_COMPONENT16),H}function b(N,C){return g(N)===!0||N.isFramebufferTexture&&N.minFilter!==Yt&&N.minFilter!==$t?Math.log2(Math.max(C.width,C.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?C.mipmaps.length:1}function E(N){const C=N.target;C.removeEventListener("dispose",E),S(C),C.isVideoTexture&&f.delete(C),C.isHTMLTexture&&d.delete(C)}function _(N){const C=N.target;C.removeEventListener("dispose",_),T(C)}function S(N){const C=i.get(N);if(C.__webglInit===void 0)return;const H=N.source,Z=p.get(H);if(Z){const ne=Z[C.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&R(N),Object.keys(Z).length===0&&p.delete(H)}i.remove(N)}function R(N){const C=i.get(N);n.deleteTexture(C.__webglTexture);const H=N.source,Z=p.get(H);delete Z[C.__cacheKey],a.memory.textures--}function T(N){const C=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(C.__webglFramebuffer[Z]))for(let ne=0;ne<C.__webglFramebuffer[Z].length;ne++)n.deleteFramebuffer(C.__webglFramebuffer[Z][ne]);else n.deleteFramebuffer(C.__webglFramebuffer[Z]);C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer[Z])}else{if(Array.isArray(C.__webglFramebuffer))for(let Z=0;Z<C.__webglFramebuffer.length;Z++)n.deleteFramebuffer(C.__webglFramebuffer[Z]);else n.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&n.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let Z=0;Z<C.__webglColorRenderbuffer.length;Z++)C.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(C.__webglColorRenderbuffer[Z]);C.__webglDepthRenderbuffer&&n.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const H=N.textures;for(let Z=0,ne=H.length;Z<ne;Z++){const Me=i.get(H[Z]);Me.__webglTexture&&(n.deleteTexture(Me.__webglTexture),a.memory.textures--),i.remove(H[Z])}i.remove(N)}let L=0;function O(){L=0}function I(){return L}function U(N){L=N}function B(){const N=L;return N>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,N}function Y(N){const C=[];return C.push(N.wrapS),C.push(N.wrapT),C.push(N.wrapR||0),C.push(N.magFilter),C.push(N.minFilter),C.push(N.anisotropy),C.push(N.internalFormat),C.push(N.format),C.push(N.type),C.push(N.generateMipmaps),C.push(N.premultiplyAlpha),C.push(N.flipY),C.push(N.unpackAlignment),C.push(N.colorSpace),C.join()}function se(N,C){const H=i.get(N);if(N.isVideoTexture&&z(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&H.__version!==N.version){const Z=N.image;if(Z===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{k(H,N,C);return}}else N.isExternalTexture&&(H.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+C)}function K(N,C){const H=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&H.__version!==N.version){k(H,N,C);return}else N.isExternalTexture&&(H.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+C)}function re(N,C){const H=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&H.__version!==N.version){k(H,N,C);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+C)}function F(N,C){const H=i.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&H.__version!==N.version){ce(H,N,C);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+C)}const te={[to]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[Hl]:n.MIRRORED_REPEAT},ae={[Yt]:n.NEAREST,[Y2]:n.NEAREST_MIPMAP_NEAREST,[la]:n.NEAREST_MIPMAP_LINEAR,[$t]:n.LINEAR,[No]:n.LINEAR_MIPMAP_NEAREST,[_s]:n.LINEAR_MIPMAP_LINEAR},pe={[$2]:n.NEVER,[ex]:n.ALWAYS,[Z2]:n.LESS,[jc]:n.LEQUAL,[J2]:n.EQUAL,[eh]:n.GEQUAL,[Q2]:n.GREATER,[j2]:n.NOTEQUAL};function _e(N,C){if(C.type===ci&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===$t||C.magFilter===No||C.magFilter===la||C.magFilter===_s||C.minFilter===$t||C.minFilter===No||C.minFilter===la||C.minFilter===_s)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(N,n.TEXTURE_WRAP_S,te[C.wrapS]),n.texParameteri(N,n.TEXTURE_WRAP_T,te[C.wrapT]),(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)&&n.texParameteri(N,n.TEXTURE_WRAP_R,te[C.wrapR]),n.texParameteri(N,n.TEXTURE_MAG_FILTER,ae[C.magFilter]),n.texParameteri(N,n.TEXTURE_MIN_FILTER,ae[C.minFilter]),C.compareFunction&&(n.texParameteri(N,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(N,n.TEXTURE_COMPARE_FUNC,pe[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Yt||C.minFilter!==la&&C.minFilter!==_s||C.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||i.get(C).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(N,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy}}}function Pe(N,C){let H=!1;N.__webglInit===void 0&&(N.__webglInit=!0,C.addEventListener("dispose",E));const Z=C.source;let ne=p.get(Z);ne===void 0&&(ne={},p.set(Z,ne));const Me=Y(C);if(Me!==N.__cacheKey){ne[Me]===void 0&&(ne[Me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ne[Me].usedTimes++;const be=ne[N.__cacheKey];be!==void 0&&(ne[N.__cacheKey].usedTimes--,be.usedTimes===0&&R(C)),N.__cacheKey=Me,N.__webglTexture=ne[Me].texture}return H}function q(N,C,H){return Math.floor(Math.floor(N/H)/C)}function ee(N,C,H,Z){const Me=N.updateRanges;if(Me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,C.width,C.height,H,Z,C.data);else{Me.sort((ze,Ae)=>ze.start-Ae.start);let be=0;for(let ze=1;ze<Me.length;ze++){const Ae=Me[be],we=Me[ze],Ye=Ae.start+Ae.count,Je=q(we.start,C.width,4),nt=q(Ae.start,C.width,4);we.start<=Ye+1&&Je===nt&&q(we.start+we.count-1,C.width,4)===Je?Ae.count=Math.max(Ae.count,we.start+we.count-Ae.start):(++be,Me[be]=we)}Me.length=be+1;const oe=t.getParameter(n.UNPACK_ROW_LENGTH),ue=t.getParameter(n.UNPACK_SKIP_PIXELS),ye=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,C.width);for(let ze=0,Ae=Me.length;ze<Ae;ze++){const we=Me[ze],Ye=Math.floor(we.start/4),Je=Math.ceil(we.count/4),nt=Ye%C.width,X=Math.floor(Ye/C.width),Se=Je,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,nt,X,Se,de,H,Z,C.data)}N.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,oe),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function k(N,C,H){let Z=n.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Z=n.TEXTURE_3D);const ne=Pe(N,C),Me=C.source;t.bindTexture(Z,N.__webglTexture,n.TEXTURE0+H);const be=i.get(Me);if(Me.version!==be.__version||ne===!0){if(t.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const de=ut.getPrimaries(ut.workingColorSpace),Ee=C.colorSpace===Wn?null:ut.getPrimaries(C.colorSpace),De=C.colorSpace===Wn||de===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment);let ue=x(C.image,!1,s.maxTextureSize);ue=$e(C,ue);const ye=r.convert(C.format,C.colorSpace),ze=r.convert(C.type);let Ae=y(C.internalFormat,ye,ze,C.normalized,C.colorSpace,C.isVideoTexture);_e(Z,C);let we;const Ye=C.mipmaps,Je=C.isVideoTexture!==!0,nt=be.__version===void 0||ne===!0,X=Me.dataReady,Se=b(C,ue);if(C.isDepthTexture)Ae=A(C.format===bs,C.type),nt&&(Je?t.texStorage2D(n.TEXTURE_2D,1,Ae,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ae,ue.width,ue.height,0,ye,ze,null));else if(C.isDataTexture)if(Ye.length>0){Je&&nt&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,Ye[0].width,Ye[0].height);for(let de=0,Ee=Ye.length;de<Ee;de++)we=Ye[de],Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,ye,ze,we.data):t.texImage2D(n.TEXTURE_2D,de,Ae,we.width,we.height,0,ye,ze,we.data);C.generateMipmaps=!1}else Je?(nt&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,ue.width,ue.height),X&&ee(C,ue,ye,ze)):t.texImage2D(n.TEXTURE_2D,0,Ae,ue.width,ue.height,0,ye,ze,ue.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Je&&nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,Ye[0].width,Ye[0].height,ue.depth);for(let de=0,Ee=Ye.length;de<Ee;de++)if(we=Ye[de],C.format!==Vn)if(ye!==null)if(Je){if(X)if(C.layerUpdates.size>0){const De=wu(we.width,we.height,C.format,C.type);for(const ge of C.layerUpdates){const Xe=we.data.subarray(ge*De/we.data.BYTES_PER_ELEMENT,(ge+1)*De/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,ge,we.width,we.height,1,ye,Xe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,ue.depth,ye,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Ae,we.width,we.height,ue.depth,0,we.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,we.width,we.height,ue.depth,ye,ze,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Ae,we.width,we.height,ue.depth,0,ye,ze,we.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{Je&&nt&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,Ye[0].width,Ye[0].height);for(let de=0,Ee=Ye.length;de<Ee;de++)we=Ye[de],C.format!==Vn?ye!==null?Je?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,ye,we.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Ae,we.width,we.height,0,we.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,we.width,we.height,ye,ze,we.data):t.texImage2D(n.TEXTURE_2D,de,Ae,we.width,we.height,0,ye,ze,we.data)}else if(C.isDataArrayTexture)if(Je){if(nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,ue.width,ue.height,ue.depth),X)if(C.layerUpdates.size>0){const de=wu(ue.width,ue.height,C.format,C.type);for(const Ee of C.layerUpdates){const De=ue.data.subarray(Ee*de/ue.data.BYTES_PER_ELEMENT,(Ee+1)*de/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,ue.width,ue.height,1,ye,ze,De)}C.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,ye,ze,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,ue.width,ue.height,ue.depth,0,ye,ze,ue.data);else if(C.isData3DTexture)Je?(nt&&t.texStorage3D(n.TEXTURE_3D,Se,Ae,ue.width,ue.height,ue.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,ye,ze,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,ue.width,ue.height,ue.depth,0,ye,ze,ue.data);else if(C.isFramebufferTexture){if(nt)if(Je)t.texStorage2D(n.TEXTURE_2D,Se,Ae,ue.width,ue.height);else{let de=ue.width,Ee=ue.height;for(let De=0;De<Se;De++)t.texImage2D(n.TEXTURE_2D,De,Ae,de,Ee,0,ye,ze,null),de>>=1,Ee>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),ue.parentNode!==de){de.appendChild(ue),d.add(C),de.onpaint=Ee=>{const De=Ee.changedElements;for(const ge of d)De.includes(ge.image)&&(ge.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ue);else{const De=n.RGBA,ge=n.RGBA,Xe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,ge,Xe,ue)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ye.length>0){if(Je&&nt){const de=Be(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Se,Ae,de.width,de.height)}for(let de=0,Ee=Ye.length;de<Ee;de++)we=Ye[de],Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ye,ze,we):t.texImage2D(n.TEXTURE_2D,de,Ae,ye,ze,we);C.generateMipmaps=!1}else if(Je){if(nt){const de=Be(ue);t.texStorage2D(n.TEXTURE_2D,Se,Ae,de.width,de.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,ze,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ae,ye,ze,ue);g(C)&&v(Z),be.__version=Me.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function ce(N,C,H){if(C.image.length!==6)return;const Z=Pe(N,C),ne=C.source;t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+H);const Me=i.get(ne);if(ne.version!==Me.__version||Z===!0){t.activeTexture(n.TEXTURE0+H);const be=ut.getPrimaries(ut.workingColorSpace),oe=C.colorSpace===Wn?null:ut.getPrimaries(C.colorSpace),ue=C.colorSpace===Wn||be===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const ye=C.isCompressedTexture||C.image[0].isCompressedTexture,ze=C.image[0]&&C.image[0].isDataTexture,Ae=[];for(let ge=0;ge<6;ge++)!ye&&!ze?Ae[ge]=x(C.image[ge],!0,s.maxCubemapSize):Ae[ge]=ze?C.image[ge].image:C.image[ge],Ae[ge]=$e(C,Ae[ge]);const we=Ae[0],Ye=r.convert(C.format,C.colorSpace),Je=r.convert(C.type),nt=y(C.internalFormat,Ye,Je,C.normalized,C.colorSpace),X=C.isVideoTexture!==!0,Se=Me.__version===void 0||Z===!0,de=ne.dataReady;let Ee=b(C,we);_e(n.TEXTURE_CUBE_MAP,C);let De;if(ye){X&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,nt,we.width,we.height);for(let ge=0;ge<6;ge++){De=Ae[ge].mipmaps;for(let Xe=0;Xe<De.length;Xe++){const He=De[Xe];C.format!==Vn?Ye!==null?X?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,0,0,He.width,He.height,Ye,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,nt,He.width,He.height,0,He.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,0,0,He.width,He.height,Ye,Je,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,nt,He.width,He.height,0,Ye,Je,He.data)}}}else{if(De=C.mipmaps,X&&Se){De.length>0&&Ee++;const ge=Be(Ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,nt,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(ze){X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ae[ge].width,Ae[ge].height,Ye,Je,Ae[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,nt,Ae[ge].width,Ae[ge].height,0,Ye,Je,Ae[ge].data);for(let Xe=0;Xe<De.length;Xe++){const Ut=De[Xe].image[ge].image;X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,0,0,Ut.width,Ut.height,Ye,Je,Ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,nt,Ut.width,Ut.height,0,Ye,Je,Ut.data)}}else{X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ye,Je,Ae[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,nt,Ye,Je,Ae[ge]);for(let Xe=0;Xe<De.length;Xe++){const He=De[Xe];X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,0,0,Ye,Je,He.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,nt,Ye,Je,He.image[ge])}}}g(C)&&v(n.TEXTURE_CUBE_MAP),Me.__version=ne.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function G(N,C,H,Z,ne,Me){const be=r.convert(H.format,H.colorSpace),oe=r.convert(H.type),ue=y(H.internalFormat,be,oe,H.normalized,H.colorSpace),ye=i.get(C),ze=i.get(H);if(ze.__renderTarget=C,!ye.__hasExternalTextures){const Ae=Math.max(1,C.width>>Me),we=Math.max(1,C.height>>Me);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,Me,ue,Ae,we,C.depth,0,be,oe,null):t.texImage2D(ne,Me,ue,Ae,we,0,be,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,N),Ge(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ne,ze.__webglTexture,0,Ne(C)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ne,ze.__webglTexture,Me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function $(N,C,H){if(n.bindRenderbuffer(n.RENDERBUFFER,N),C.depthBuffer){const Z=C.depthTexture,ne=Z&&Z.isDepthTexture?Z.type:null,Me=A(C.stencilBuffer,ne),be=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ge(C)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ne(C),Me,C.width,C.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne(C),Me,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,Me,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,N)}else{const Z=C.textures;for(let ne=0;ne<Z.length;ne++){const Me=Z[ne],be=r.convert(Me.format,Me.colorSpace),oe=r.convert(Me.type),ue=y(Me.internalFormat,be,oe,Me.normalized,Me.colorSpace);Ge(C)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ne(C),ue,C.width,C.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne(C),ue,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,ue,C.width,C.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(N,C,H){const Z=C.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,N),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=i.get(C.depthTexture);if(ne.__renderTarget=C,(!ne.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),Z){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,C.depthTexture.addEventListener("dispose",E)),ne.__webglTexture===void 0){ne.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),_e(n.TEXTURE_CUBE_MAP,C.depthTexture);const ye=r.convert(C.depthTexture.format),ze=r.convert(C.depthTexture.type);let Ae;C.depthTexture.format===Wi?Ae=n.DEPTH_COMPONENT24:C.depthTexture.format===bs&&(Ae=n.DEPTH24_STENCIL8);for(let we=0;we<6;we++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Ae,C.width,C.height,0,ye,ze,null)}}else se(C.depthTexture,0);const Me=ne.__webglTexture,be=Ne(C),oe=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,ue=C.depthTexture.format===bs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(C.depthTexture.format===Wi)Ge(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,oe,Me,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ue,oe,Me,0);else if(C.depthTexture.format===bs)Ge(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,oe,Me,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,ue,oe,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function he(N){const C=i.get(N),H=N.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==N.depthTexture){const Z=N.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),Z){const ne=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,Z.removeEventListener("dispose",ne)};Z.addEventListener("dispose",ne),C.__depthDisposeCallback=ne}C.__boundDepthTexture=Z}if(N.depthTexture&&!C.__autoAllocateDepthBuffer)if(H)for(let Z=0;Z<6;Z++)fe(C.__webglFramebuffer[Z],N,Z);else{const Z=N.texture.mipmaps;Z&&Z.length>0?fe(C.__webglFramebuffer[0],N,0):fe(C.__webglFramebuffer,N,0)}else if(H){C.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[Z]),C.__webglDepthbuffer[Z]===void 0)C.__webglDepthbuffer[Z]=n.createRenderbuffer(),$(C.__webglDepthbuffer[Z],N,!1);else{const ne=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=C.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Me),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,Me)}}else{const Z=N.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=n.createRenderbuffer(),$(C.__webglDepthbuffer,N,!1);else{const ne=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=C.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Me),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,Me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function J(N,C,H){const Z=i.get(N);C!==void 0&&G(Z.__webglFramebuffer,N,N.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&he(N)}function le(N){const C=N.texture,H=i.get(N),Z=i.get(C);N.addEventListener("dispose",_);const ne=N.textures,Me=N.isWebGLCubeRenderTarget===!0,be=ne.length>1;if(be||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=C.version,a.memory.textures++),Me){H.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(C.mipmaps&&C.mipmaps.length>0){H.__webglFramebuffer[oe]=[];for(let ue=0;ue<C.mipmaps.length;ue++)H.__webglFramebuffer[oe][ue]=n.createFramebuffer()}else H.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){H.__webglFramebuffer=[];for(let oe=0;oe<C.mipmaps.length;oe++)H.__webglFramebuffer[oe]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(be)for(let oe=0,ue=ne.length;oe<ue;oe++){const ye=i.get(ne[oe]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(N.samples>0&&Ge(N)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let oe=0;oe<ne.length;oe++){const ue=ne[oe];H.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[oe]);const ye=r.convert(ue.format,ue.colorSpace),ze=r.convert(ue.type),Ae=y(ue.internalFormat,ye,ze,ue.normalized,ue.colorSpace,N.isXRRenderTarget===!0),we=Ne(N);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Ae,N.width,N.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,H.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),N.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),$(H.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Me){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),_e(n.TEXTURE_CUBE_MAP,C);for(let oe=0;oe<6;oe++)if(C.mipmaps&&C.mipmaps.length>0)for(let ue=0;ue<C.mipmaps.length;ue++)G(H.__webglFramebuffer[oe][ue],N,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue);else G(H.__webglFramebuffer[oe],N,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(C)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let oe=0,ue=ne.length;oe<ue;oe++){const ye=ne[oe],ze=i.get(ye);let Ae=n.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ae=N.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,ze.__webglTexture),_e(Ae,ye),G(H.__webglFramebuffer,N,ye,n.COLOR_ATTACHMENT0+oe,Ae,0),g(ye)&&v(Ae)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(oe=N.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Z.__webglTexture),_e(oe,C),C.mipmaps&&C.mipmaps.length>0)for(let ue=0;ue<C.mipmaps.length;ue++)G(H.__webglFramebuffer[ue],N,C,n.COLOR_ATTACHMENT0,oe,ue);else G(H.__webglFramebuffer,N,C,n.COLOR_ATTACHMENT0,oe,0);g(C)&&v(oe),t.unbindTexture()}N.depthBuffer&&he(N)}function ve(N){const C=N.textures;for(let H=0,Z=C.length;H<Z;H++){const ne=C[H];if(g(ne)){const Me=w(N),be=i.get(ne).__webglTexture;t.bindTexture(Me,be),v(Me),t.unbindTexture()}}}const Ie=[],Ve=[];function Ke(N){if(N.samples>0){if(Ge(N)===!1){const C=N.textures,H=N.width,Z=N.height;let ne=n.COLOR_BUFFER_BIT;const Me=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(N),oe=C.length>1;if(oe)for(let ye=0;ye<C.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const ue=N.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ye=0;ye<C.length;ye++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ze=i.get(C[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,H,Z,0,0,H,Z,ne,n.NEAREST),h===!0&&(Ie.length=0,Ve.length=0,Ie.push(n.COLOR_ATTACHMENT0+ye),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&(Ie.push(Me),Ve.push(Me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ve)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let ye=0;ye<C.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ze=i.get(C[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&h){const C=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[C])}}}function Ne(N){return Math.min(s.maxSamples,N.samples)}function Ge(N){const C=i.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function z(N){const C=a.render.frame;f.get(N)!==C&&(f.set(N,C),N.update())}function $e(N,C){const H=N.colorSpace,Z=N.format,ne=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||H!==qr&&H!==Wn&&(ut.getTransfer(H)===Lt?(Z!==Vn||ne!==Gn)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",H)),C}function Be(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=se,this.setTexture2DArray=K,this.setTexture3D=re,this.setTextureCube=F,this.rebindTextures=J,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ty(n,e){function t(i,s=Wn){let r;const a=ut.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===Kc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===qc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Jd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===qd)return n.BYTE;if(i===$d)return n.SHORT;if(i===Xr)return n.UNSIGNED_SHORT;if(i===Xc)return n.INT;if(i===Li)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===Pi)return n.HALF_FLOAT;if(i===Qd)return n.ALPHA;if(i===jd)return n.RGB;if(i===Vn)return n.RGBA;if(i===Wi)return n.DEPTH_COMPONENT;if(i===bs)return n.DEPTH_STENCIL;if(i===$c)return n.RED;if(i===Zc)return n.RED_INTEGER;if(i===Cs)return n.RG;if(i===Jc)return n.RG_INTEGER;if(i===Qc)return n.RGBA_INTEGER;if(i===Va||i===Ya||i===Xa||i===Ka)if(a===Lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ya)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ka)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Gl||i===Wl||i===Vl||i===Yl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Gl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xl||i===Kl||i===ql||i===$l||i===Zl||i===no||i===Jl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Xl||i===Kl)return a===Lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ql)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===$l)return r.COMPRESSED_R11_EAC;if(i===Zl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===no)return r.COMPRESSED_RG11_EAC;if(i===Jl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ql||i===jl||i===ec||i===tc||i===nc||i===ic||i===sc||i===rc||i===ac||i===oc||i===lc||i===cc||i===hc||i===uc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ql)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ec)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ic)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ac)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===oc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uc)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===dc||i===fc||i===pc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===dc)return a===Lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mc||i===gc||i===io||i===xc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===mc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===gc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Ry=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cy=`
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

}`;class Ly{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new xt({vertexShader:Ry,fragmentShader:Cy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Xn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Py extends Ds{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,c=null,f=null,d=null,u=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",x=new Ly,g={},v=t.getContextAttributes();let w=null,y=null;const A=[],b=[],E=new je;let _=null,S=null;const R=new Hn;R.viewport=new ht;const T=new Hn;T.viewport=new ht;const L=[R,T],O=new Bx;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=A[q];return ee===void 0&&(ee=new Yo,A[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=A[q];return ee===void 0&&(ee=new Yo,A[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=A[q];return ee===void 0&&(ee=new Yo,A[q]=ee),ee.getHandSpace()};function B(q){const ee=b.indexOf(q.inputSource);if(ee===-1)return;const k=A[ee];k!==void 0&&(k.update(q.inputSource,q.frame,c||a),k.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",se);for(let q=0;q<A.length;q++){const ee=b[q];ee!==null&&(b[q]=null,A[q].disconnect(ee))}I=null,U=null,x.reset();for(const q in g)delete g[q];if(e.setRenderTarget(w),p=null,u=null,d=null,s=null,y=null,Pe.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(E.width,E.height,!1),S!==null){const q=S.camera;q.fov=S.fov,q.zoom=S.zoom,q.updateProjectionMatrix(),S=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",se),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(E),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let k=null,ce=null,G=null;v.depth&&(G=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=v.stencil?bs:Wi,ce=v.stencil?Kr:Li);const $={colorFormat:t.RGBA8,depthFormat:G,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer($),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new ei(u.textureWidth,u.textureHeight,{format:Vn,type:Gn,depthTexture:new pr(u.textureWidth,u.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const k={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,k),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ei(p.framebufferWidth,p.framebufferHeight,{format:Vn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(o),Pe.setContext(s),Pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function se(q){for(let ee=0;ee<q.removed.length;ee++){const k=q.removed[ee],ce=b.indexOf(k);ce>=0&&(b[ce]=null,A[ce].disconnect(k))}for(let ee=0;ee<q.added.length;ee++){const k=q.added[ee];let ce=b.indexOf(k);if(ce===-1){for(let $=0;$<A.length;$++)if($>=b.length){b.push(k),ce=$;break}else if(b[$]===null){b[$]=k,ce=$;break}if(ce===-1)break}const G=A[ce];G&&G.connect(k)}}const K=new W,re=new W;function F(q,ee,k){K.setFromMatrixPosition(ee.matrixWorld),re.setFromMatrixPosition(k.matrixWorld);const ce=K.distanceTo(re),G=ee.projectionMatrix.elements,$=k.projectionMatrix.elements,fe=G[14]/(G[10]-1),he=G[14]/(G[10]+1),J=(G[9]+1)/G[5],le=(G[9]-1)/G[5],ve=(G[8]-1)/G[0],Ie=($[8]+1)/$[0],Ve=fe*ve,Ke=fe*Ie,Ne=ce/(-ve+Ie),Ge=Ne*-ve;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ge),q.translateZ(Ne),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),G[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const z=fe+Ne,$e=he+Ne,Be=Ve-Ge,N=Ke+(ce-Ge),C=J*he/$e*z,H=le*he/$e*z;q.projectionMatrix.makePerspective(Be,N,C,H,z,$e),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function te(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ee=q.near,k=q.far;x.texture!==null&&(x.depthNear>0&&(ee=x.depthNear),x.depthFar>0&&(k=x.depthFar)),O.near=T.near=R.near=ee,O.far=T.far=R.far=k,(I!==O.near||U!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,U=O.far),O.layers.mask=q.layers.mask|6,R.layers.mask=O.layers.mask&-5,T.layers.mask=O.layers.mask&-3;const ce=q.parent,G=O.cameras;te(O,ce);for(let $=0;$<G.length;$++)te(G[$],ce);G.length===2?F(O,R,T):O.projectionMatrix.copy(R.projectionMatrix),S===null&&q.isPerspectiveCamera&&(S={camera:q,fov:q.fov,zoom:q.zoom}),ae(q,O,ce)};function ae(q,ee,k){k===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(k.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Mc*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(q){h=q,u!==null&&(u.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(q){return g[q]};let pe=null;function _e(q,ee){if(f=ee.getViewerPose(c||a),m=ee,f!==null){const k=f.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let ce=!1;k.length!==O.cameras.length&&(O.cameras.length=0,ce=!0);for(let he=0;he<k.length;he++){const J=k[he];let le=null;if(p!==null)le=p.getViewport(J);else{const Ie=d.getViewSubImage(u,J);le=Ie.viewport,he===0&&(e.setRenderTargetTextures(y,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(y))}let ve=L[he];ve===void 0&&(ve=new Hn,ve.layers.enable(he),ve.viewport=new ht,L[he]=ve),ve.matrix.fromArray(J.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(J.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(le.x,le.y,le.width,le.height),he===0&&(O.matrix.copy(ve.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ce===!0&&O.cameras.push(ve)}const G=s.enabledFeatures;if(G&&G.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const he=d.getDepthInformation(k[0]);he&&he.isValid&&he.texture&&x.init(he,s.renderState)}if(G&&G.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let he=0;he<k.length;he++){const J=k[he].camera;if(J){let le=g[J];le||(le=new uf,g[J]=le);const ve=d.getCameraImage(J);le.sourceTexture=ve}}}}for(let k=0;k<A.length;k++){const ce=b[k],G=A[k];ce!==null&&G!==void 0&&G.update(ce,ee,c||a)}pe&&pe(q,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),m=null}const Pe=new mf;Pe.setAnimationLoop(_e),this.setAnimationLoop=function(q){pe=q},this.dispose=function(){}}}const Dy=new Ft,yf=new tt;yf.set(-1,0,0,0,1,0,0,0,1);function Iy(n,e){function t(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function i(x,g){g.color.getRGB(x.fogColor.value,df(n)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function s(x,g,v,w,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(x,g):g.isMeshLambertMaterial?(r(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(x,g),d(x,g)):g.isMeshPhongMaterial?(r(x,g),f(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(x,g),u(x,g),g.isMeshPhysicalMaterial&&p(x,g,y)):g.isMeshMatcapMaterial?(r(x,g),m(x,g)):g.isMeshDepthMaterial?r(x,g):g.isMeshDistanceMaterial?(r(x,g),M(x,g)):g.isMeshNormalMaterial?r(x,g):g.isLineBasicMaterial?(a(x,g),g.isLineDashedMaterial&&o(x,g)):g.isPointsMaterial?h(x,g,v,w):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,t(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Un&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,t(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Un&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,t(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,t(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const v=e.get(g),w=v.envMap,y=v.envMapRotation;w&&(x.envMap.value=w,x.envMapRotation.value.setFromMatrix4(Dy.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(yf),x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,x.aoMapTransform))}function a(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform))}function o(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function h(x,g,v,w){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*v,x.scale.value=w*.5,g.map&&(x.map.value=g.map,t(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function f(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function d(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function u(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function p(x,g,v){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Un&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.retroreflectivity>0&&(x.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,g){g.matcap&&(x.matcap.value=g.matcap)}function M(x,g){const v=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Oy(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(y,A){const b=A.program;i.uniformBlockBinding(y,b)}function c(y,A){let b=s[y.id];b===void 0&&(x(y),b=f(y),s[y.id]=b,y.addEventListener("dispose",v));const E=A.program;i.updateUBOMapping(y,E);const _=e.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function f(y){const A=d();y.__bindingPointIndex=A;const b=n.createBuffer(),E=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,E,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const A=s[y.id],b=y.uniforms,E=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let _=0,S=b.length;_<S;_++){const R=b[_];if(Array.isArray(R))for(let T=0,L=R.length;T<L;T++)p(R[T],_,T,E);else p(R,_,0,E)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,A,b,E){if(M(y,A,b,E)===!0){const _=y.__offset,S=y.value;if(Array.isArray(S)){let R=0;for(let T=0;T<S.length;T++){const L=S[T],O=g(L);m(L,y.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(S,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function m(y,A,b){typeof y=="number"||typeof y=="boolean"?A[0]=y:y.isMatrix3?(A[0]=y.elements[0],A[1]=y.elements[1],A[2]=y.elements[2],A[3]=0,A[4]=y.elements[3],A[5]=y.elements[4],A[6]=y.elements[5],A[7]=0,A[8]=y.elements[6],A[9]=y.elements[7],A[10]=y.elements[8],A[11]=0):ArrayBuffer.isView(y)?A.set(new y.constructor(y.buffer,y.byteOffset,A.length)):y.toArray(A,b)}function M(y,A,b,E){const _=y.value,S=A+"_"+b;if(E[S]===void 0)return typeof _=="number"||typeof _=="boolean"?E[S]=_:ArrayBuffer.isView(_)?E[S]=_.slice():E[S]=_.clone(),!0;{const R=E[S];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return E[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function x(y){const A=y.uniforms;let b=0;const E=16;for(let S=0,R=A.length;S<R;S++){const T=Array.isArray(A[S])?A[S]:[A[S]];for(let L=0,O=T.length;L<O;L++){const I=T[L],U=Array.isArray(I.value)?I.value:[I.value];for(let B=0,Y=U.length;B<Y;B++){const se=U[B],K=g(se),re=b%E,F=re%K.boundary,te=re+F;b+=F,te!==0&&E-te<K.storage&&(b+=E-te),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=K.storage}}}const _=b%E;return _>0&&(b+=E-_),y.__size=b,y.__cache={},this}function g(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",y),A}function v(y){const A=y.target;A.removeEventListener("dispose",v);const b=a.indexOf(A.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function w(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:h,update:c,dispose:w}}const Fy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vi=null;function Ny(){return vi===null&&(vi=new ws(Fy,16,16,Cs,Pi),vi.name="DFG_LUT",vi.minFilter=$t,vi.magFilter=$t,vi.wrapS=zi,vi.wrapT=zi,vi.generateMipmaps=!1,vi.needsUpdate=!0),vi}class Uy{constructor(e={}){const{canvas:t=ix(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Gn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=p,x=new Set([Qc,Jc,Zc]),g=new Set([Gn,Li,Xr,Kr,Kc,qc]),v=new Uint32Array(4),w=new Int32Array(4),y=new W;let A=null,b=null;const E=[],_=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let T=!1,L=null,O=null,I=null,U=null;this._outputColorSpace=Zn;let B=0,Y=0,se=null,K=-1,re=null;const F=new ht,te=new ht;let ae=null;const pe=new lt(0);let _e=0,Pe=t.width,q=t.height,ee=1,k=null,ce=null;const G=new ht(0,0,Pe,q),$=new ht(0,0,Pe,q);let fe=!1;const he=new oo;let J=!1,le=!1;const ve=new Ft,Ie=new W,Ve=new ht,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function Ge(){return se===null?ee:1}let z=i;function $e(D,V){return t.getContext(D,V)}let Be,N,C,H,Z,ne,Me,be,oe,ue,ye,ze,Ae,we,Ye,Je,nt,X,Se,de,Ee,De,ge;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hc}`),t.addEventListener("webglcontextlost",Ut,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",ni,!1),z===null){const V="webgl2";if(z=$e(V,D),z===null)throw $e(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xe()}catch(D){throw t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ni,!1),Mt("WebGLRenderer: "+D.message),D}function Xe(){Be=new N_(z),Be.init(),Ee=new Ty(z,Be),N=new A_(z,Be,e,Ee),C=new Ey(z,Be),N.reversedDepthBuffer&&u&&C.buffers.depth.setReversed(!0),O=z.createFramebuffer(),I=z.createFramebuffer(),U=z.createFramebuffer(),H=new B_(z),Z=new uy,ne=new Ay(z,Be,C,Z,N,Ee,H),Me=new F_(R),be=new Hx(z),De=new S_(z,be),oe=new U_(z,be,H,De),ue=new H_(z,oe,be,De,H),X=new z_(z,N,ne),Ye=new T_(Z),ye=new hy(R,Me,Be,N,De,Ye),ze=new Iy(R,Z),Ae=new fy,we=new vy(Be),nt=new w_(R,Me,C,ue,m,h),Je=new Sy(R,ue,N),ge=new Oy(z,H,N,C),Se=new E_(z,Be,H),de=new k_(z,Be,H),H.programs=ye.programs,R.capabilities=N,R.extensions=Be,R.properties=Z,R.renderLists=Ae,R.shadowMap=Je,R.state=C,R.info=H}M!==Gn&&(S=new W_(M,t.width,t.height,o,s,r));const He=new Py(R,z);this.xr=He,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const D=Be.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Be.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(D){D!==void 0&&(ee=D,this.setSize(Pe,q,!1))},this.getSize=function(D){return D.set(Pe,q)},this.setSize=function(D,V,ie=!0){if(He.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=D,q=V,t.width=Math.floor(D*ee),t.height=Math.floor(V*ee),ie===!0&&(t.style.width=D+"px",t.style.height=V+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,D,V)},this.getDrawingBufferSize=function(D){return D.set(Pe*ee,q*ee).floor()},this.setDrawingBufferSize=function(D,V,ie){Pe=D,q=V,ee=ie,t.width=Math.floor(D*ie),t.height=Math.floor(V*ie),this.setViewport(0,0,D,V)},this.setEffects=function(D){if(M===Gn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let V=0;V<D.length;V++)if(D[V].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(G)},this.setViewport=function(D,V,ie,Q){D.isVector4?G.set(D.x,D.y,D.z,D.w):G.set(D,V,ie,Q),C.viewport(F.copy(G).multiplyScalar(ee).round())},this.getScissor=function(D){return D.copy($)},this.setScissor=function(D,V,ie,Q){D.isVector4?$.set(D.x,D.y,D.z,D.w):$.set(D,V,ie,Q),C.scissor(te.copy($).multiplyScalar(ee).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(D){C.setScissorTest(fe=D)},this.setOpaqueSort=function(D){k=D},this.setTransparentSort=function(D){ce=D},this.getClearColor=function(D){return D.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(D=!0,V=!0,ie=!0){let Q=0;if(D){let j=!1;if(se!==null){const Ce=se.texture.format;j=x.has(Ce)}if(j){const Ce=se.texture.type,Fe=g.has(Ce),Re=nt.getClearColor(),Ue=nt.getClearAlpha(),We=Re.r,rt=Re.g,ct=Re.b;Fe?(v[0]=We,v[1]=rt,v[2]=ct,v[3]=Ue,z.clearBufferuiv(z.COLOR,0,v)):(w[0]=We,w[1]=rt,w[2]=ct,w[3]=Ue,z.clearBufferiv(z.COLOR,0,w))}else Q|=z.COLOR_BUFFER_BIT}V&&(Q|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(Q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&z.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),L=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ni,!1),nt.dispose(),Ae.dispose(),we.dispose(),Z.dispose(),Me.dispose(),ue.dispose(),De.dispose(),ge.dispose(),ye.dispose(),He.dispose(),He.removeEventListener("sessionstart",dh),He.removeEventListener("sessionend",fh),os.stop()};function Ut(D){D.preventDefault(),$h("WebGLRenderer: Context Lost."),T=!0}function yt(){$h("WebGLRenderer: Context Restored."),T=!1;const D=H.autoReset,V=Je.enabled,ie=Je.autoUpdate,Q=Je.needsUpdate,j=Je.type;Xe(),H.autoReset=D,Je.enabled=V,Je.autoUpdate=ie,Je.needsUpdate=Q,Je.type=j}function ni(D){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function gi(D){const V=D.target;V.removeEventListener("dispose",gi),zf(V)}function zf(D){Hf(D),Z.remove(D)}function Hf(D){const V=Z.get(D).programs;V!==void 0&&(V.forEach(function(ie){ye.releaseProgram(ie)}),D.isShaderMaterial&&ye.releaseShaderCache(D))}this.renderBufferDirect=function(D,V,ie,Q,j,Ce){V===null&&(V=Ke);const Fe=j.isMesh&&j.matrixWorld.determinantAffine()<0,Re=Vf(D,V,ie,Q,j);C.setMaterial(Q,Fe);let Ue=ie.index,We=1;if(Q.wireframe===!0){if(Ue=oe.getWireframeAttribute(ie),Ue===void 0)return;We=2}const rt=ie.drawRange,ct=ie.attributes.position;let ke=rt.start*We,wt=(rt.start+rt.count)*We;Ce!==null&&(ke=Math.max(ke,Ce.start*We),wt=Math.min(wt,(Ce.start+Ce.count)*We)),Ue!==null?(ke=Math.max(ke,0),wt=Math.min(wt,Ue.count)):ct!=null&&(ke=Math.max(ke,0),wt=Math.min(wt,ct.count));const jt=wt-ke;if(jt<0||jt===1/0)return;De.setup(j,Q,Re,ie,Ue);let zt,Nt=Se;if(Ue!==null&&(zt=be.get(Ue),Nt=de,Nt.setIndex(zt)),j.isMesh)Q.wireframe===!0?(C.setLineWidth(Q.wireframeLinewidth*Ge()),Nt.setMode(z.LINES)):Nt.setMode(z.TRIANGLES);else if(j.isLine){let _n=Q.linewidth;_n===void 0&&(_n=1),C.setLineWidth(_n*Ge()),j.isLineSegments?Nt.setMode(z.LINES):j.isLineLoop?Nt.setMode(z.LINE_LOOP):Nt.setMode(z.LINE_STRIP)}else j.isPoints?Nt.setMode(z.POINTS):j.isSprite&&Nt.setMode(z.TRIANGLES);if(j.isBatchedMesh)if(Be.get("WEBGL_multi_draw"))Nt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const _n=j._multiDrawStarts,Oe=j._multiDrawCounts,An=j._multiDrawCount,gt=Ue?be.get(Ue).bytesPerElement:1,Kn=Z.get(Q).currentProgram.getUniforms();for(let xi=0;xi<An;xi++)Kn.setValue(z,"_gl_DrawID",xi),Nt.render(_n[xi]/gt,Oe[xi])}else if(j.isInstancedMesh)Nt.renderInstances(ke,jt,j.count);else if(ie.isInstancedBufferGeometry){const _n=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Oe=Math.min(ie.instanceCount,_n);Nt.renderInstances(ke,jt,Oe)}else Nt.render(ke,jt)};function uh(D,V,ie,Q){L!==null&&D.isNodeMaterial&&L.setObject(Q,D),J===!0&&Ye.setState(D,ie,!1),D.transparent===!0&&D.side===Qn&&D.forceSinglePass===!1?(D.side=Un,D.needsUpdate=!0,na(D,V,Q),D.side=Ts,D.needsUpdate=!0,na(D,V,Q),D.side=Qn):na(D,V,Q)}this.compile=function(D,V,ie=null){ie===null&&(ie=D),L!==null&&L.renderStart(D,V,ie),b=we.get(ie),b.init(V),_.push(b),ie.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(b.pushLight(j),j.castShadow&&b.pushShadow(j))}),D!==ie&&D.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(b.pushLight(j),j.castShadow&&b.pushShadow(j))}),b.setupLights(),L!==null&&L.updateLights(b.state.lightsArray),le=this.localClippingEnabled,J=Ye.init(this.clippingPlanes,le),J===!0&&Ye.setGlobalState(this.clippingPlanes,V),L!==null&&Je.render(b.state.shadowsArray,ie,V);const Q=new Set;return D.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Ce=j.material;if(Ce)if(Array.isArray(Ce))for(let Fe=0;Fe<Ce.length;Fe++){const Re=Ce[Fe];uh(Re,ie,V,j),Q.add(Re)}else uh(Ce,ie,V,j),Q.add(Ce)}),b=_.pop(),L!==null&&L.renderEnd(),Q},this.compileAsync=function(D,V,ie=null){const Q=this.compile(D,V,ie);return new Promise(j=>{function Ce(){if(Q.forEach(function(Fe){const Ue=Z.get(Fe).currentProgram;(Ue===void 0||Ue.isReady())&&Q.delete(Fe)}),Q.size===0){j(D);return}setTimeout(Ce,10)}Be.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let So=null;function Gf(D){So&&So(D)}function dh(){os.stop()}function fh(){os.start()}const os=new mf;os.setAnimationLoop(Gf),typeof self<"u"&&os.setContext(self),this.setAnimationLoop=function(D){So=D,He.setAnimationLoop(D),D===null?os.stop():os.start()},He.addEventListener("sessionstart",dh),He.addEventListener("sessionend",fh),this.render=function(D,V){if(V!==void 0&&V.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;L!==null&&L.renderStart(D,V);const ie=He.enabled===!0&&He.isPresenting===!0,Q=S!==null&&(se===null||ie)&&S.begin(R,se);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(V),V=He.getCamera()),D.isScene===!0&&D.onBeforeRender(R,D,V,se),b=we.get(D,_.length),b.init(V),b.state.textureUnits=ne.getTextureUnits(),_.push(b),ve.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),he.setFromProjectionMatrix(ve,Ai,V.reversedDepth),le=this.localClippingEnabled,J=Ye.init(this.clippingPlanes,le),A=Ae.get(D,E.length),A.init(),E.push(A),He.enabled===!0&&He.isPresenting===!0){const Fe=R.xr.getDepthSensingMesh();Fe!==null&&Eo(Fe,V,-1/0,R.sortObjects)}Eo(D,V,0,R.sortObjects),A.finish(),L!==null&&L.updateLights(b.state.lightsArray),R.sortObjects===!0&&A.sort(k,ce),Ne=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,Ne&&nt.addToRenderList(A,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),J===!0&&Ye.beginShadows();const j=b.state.shadowsArray;if(Je.render(j,D,V),J===!0&&Ye.endShadows(),(Q&&S.hasRenderPass())===!1){const Fe=A.opaque,Re=A.transmissive;if(b.setupLights(),V.isArrayCamera){const Ue=V.cameras;if(Re.length>0)for(let We=0,rt=Ue.length;We<rt;We++){const ct=Ue[We];mh(Fe,Re,D,ct)}Ne&&nt.render(D);for(let We=0,rt=Ue.length;We<rt;We++){const ct=Ue[We];ph(A,D,ct,ct.viewport)}}else Re.length>0&&mh(Fe,Re,D,V),Ne&&nt.render(D),ph(A,D,V)}se!==null&&Y===0&&(ne.updateMultisampleRenderTarget(se),ne.updateRenderTargetMipmap(se)),Q&&S.end(R),D.isScene===!0&&D.onAfterRender(R,D,V),De.resetDefaultState(),K=-1,re=null,_.pop(),_.length>0?(b=_[_.length-1],ne.setTextureUnits(b.state.textureUnits),J===!0&&Ye.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?A=E[E.length-1]:A=null,L!==null&&L.renderEnd()};function Eo(D,V,ie,Q){if(D.visible===!1)return;if(D.layers.test(V.layers)){if(D.isGroup)ie=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(V);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(he)){Q&&Ve.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ve);const Fe=ue.update(D),Re=D.material;Re.visible&&A.push(D,Fe,Re,ie,Ve.z,null,V)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(he))){const Fe=ue.update(D),Re=D.material;if(Q&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ve.copy(D.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Ve.copy(Fe.boundingSphere.center)),Ve.applyMatrix4(D.matrixWorld).applyMatrix4(ve)),Array.isArray(Re)){const Ue=Fe.groups;for(let We=0,rt=Ue.length;We<rt;We++){const ct=Ue[We],ke=Re[ct.materialIndex];ke&&ke.visible&&A.push(D,Fe,ke,ie,Ve.z,ct,V)}}else Re.visible&&A.push(D,Fe,Re,ie,Ve.z,null,V)}}const Ce=D.children;for(let Fe=0,Re=Ce.length;Fe<Re;Fe++)Eo(Ce[Fe],V,ie,Q)}function ph(D,V,ie,Q){const{opaque:j,transmissive:Ce,transparent:Fe}=D;b.setupLightsView(ie),J===!0&&Ye.setGlobalState(R.clippingPlanes,ie),Q&&C.viewport(F.copy(Q)),j.length>0&&ta(j,V,ie),Ce.length>0&&ta(Ce,V,ie),Fe.length>0&&ta(Fe,V,ie),C.buffers.depth.setTest(!0),C.buffers.depth.setMask(!0),C.buffers.color.setMask(!0),C.setPolygonOffset(!1)}function mh(D,V,ie,Q){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Q.id]===void 0){const ke=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Q.id]=new ei(1,1,{generateMipmaps:!0,type:ke?Pi:Gn,minFilter:_s,samples:Math.max(4,N.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ut.workingColorSpace})}const Ce=b.state.transmissionRenderTarget[Q.id],Fe=Q.viewport||F;Ce.setSize(Fe.z*R.transmissionResolutionScale,Fe.w*R.transmissionResolutionScale);const Re=R.getRenderTarget(),Ue=R.getActiveCubeFace(),We=R.getActiveMipmapLevel();R.setRenderTarget(Ce),R.getClearColor(pe),_e=R.getClearAlpha(),_e<1&&R.setClearColor(16777215,.5),R.clear(),Ne&&nt.render(ie);const rt=R.toneMapping;R.toneMapping=Ci;const ct=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),b.setupLightsView(Q),J===!0&&Ye.setGlobalState(R.clippingPlanes,Q),ta(D,ie,Q),ne.updateMultisampleRenderTarget(Ce),ne.updateRenderTargetMipmap(Ce),Be.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let wt=0,jt=V.length;wt<jt;wt++){const zt=V[wt],{object:Nt,geometry:_n,material:Oe,group:An}=zt;if(Oe.side===Qn&&Nt.layers.test(Q.layers)){const gt=Oe.side;Oe.side=Un,Oe.needsUpdate=!0,gh(Nt,ie,Q,_n,Oe,An),Oe.side=gt,Oe.needsUpdate=!0,ke=!0}}ke===!0&&(ne.updateMultisampleRenderTarget(Ce),ne.updateRenderTargetMipmap(Ce))}R.setRenderTarget(Re,Ue,We),R.setClearColor(pe,_e),ct!==void 0&&(Q.viewport=ct),R.toneMapping=rt}function ta(D,V,ie){const Q=V.isScene===!0?V.overrideMaterial:null;for(let j=0,Ce=D.length;j<Ce;j++){const Fe=D[j],{object:Re,geometry:Ue,group:We}=Fe;let rt=Fe.material;rt.allowOverride===!0&&Q!==null&&(rt=Q),Re.layers.test(ie.layers)&&gh(Re,V,ie,Ue,rt,We)}}function gh(D,V,ie,Q,j,Ce){L!==null&&j.isNodeMaterial&&L.setObject(D,j),D.onBeforeRender(R,V,ie,Q,j,Ce),D.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),j.onBeforeRender(R,V,ie,Q,D,Ce),j.transparent===!0&&j.side===Qn&&j.forceSinglePass===!1?(j.side=Un,j.needsUpdate=!0,R.renderBufferDirect(ie,V,Q,j,D,Ce),j.side=Ts,j.needsUpdate=!0,R.renderBufferDirect(ie,V,Q,j,D,Ce),j.side=Qn):R.renderBufferDirect(ie,V,Q,j,D,Ce),D.onAfterRender(R,V,ie,Q,j,Ce)}function na(D,V,ie){V.isScene!==!0&&(V=Ke);const Q=Z.get(D),j=b.state.lights,Ce=b.state.shadowsArray,Fe=j.state.version,Re=ye.getParameters(D,j.state,Ce,V,ie,b.state.lightProbeGridArray),Ue=ye.getProgramCacheKey(Re);let We=Q.programs;Q.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?V.environment:null,Q.fog=V.fog;const rt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Q.envMap=Me.get(D.envMap||Q.environment,rt),Q.envMapRotation=Q.environment!==null&&D.envMap===null?V.environmentRotation:D.envMapRotation,We===void 0&&(D.addEventListener("dispose",gi),We=new Map,Q.programs=We);let ct=We.get(Ue);if(ct!==void 0){if(Q.currentProgram===ct&&Q.lightsStateVersion===Fe)return Mh(D,Re),ct}else Re.uniforms=ye.getUniforms(D),L!==null&&D.isNodeMaterial&&L.build(D,ie,Re),D.onBeforeCompile(Re,R),ct=ye.acquireProgram(Re,Ue),We.set(Ue,ct),Q.uniforms=Re.uniforms;const ke=Q.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(ke.clippingPlanes=Ye.uniform),Mh(D,Re),Q.needsLights=Xf(D),Q.lightsStateVersion=Fe,Q.needsLights&&(ke.ambientLightColor.value=j.state.ambient,ke.lightProbe.value=j.state.probe,ke.sunLights.value=j.state.sun,ke.sunLightShadows.value=j.state.sunShadow,ke.directionalLights.value=j.state.directional,ke.directionalLightShadows.value=j.state.directionalShadow,ke.spotLights.value=j.state.spot,ke.spotLightShadows.value=j.state.spotShadow,ke.rectAreaLights.value=j.state.rectArea,ke.ltc_1.value=j.state.rectAreaLTC1,ke.ltc_2.value=j.state.rectAreaLTC2,ke.pointLights.value=j.state.point,ke.pointLightShadows.value=j.state.pointShadow,ke.hemisphereLights.value=j.state.hemi,ke.sunShadowMatrix.value=j.state.sunShadowMatrix,ke.sunShadowCascade.value=j.state.sunShadowCascade,ke.directionalShadowMatrix.value=j.state.directionalShadowMatrix,ke.spotLightMatrix.value=j.state.spotLightMatrix,ke.spotLightMap.value=j.state.spotLightMap,ke.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.lightProbeGrid=b.state.lightProbeGridArray.length>0,Q.currentProgram=ct,Q.uniformsList=null,ct}function xh(D){if(D.uniformsList===null){const V=D.currentProgram.getUniforms();D.uniformsList=qa.seqWithValue(V.seq,D.uniforms)}return D.uniformsList}function Mh(D,V){const ie=Z.get(D);ie.outputColorSpace=V.outputColorSpace,ie.batching=V.batching,ie.batchingColor=V.batchingColor,ie.instancing=V.instancing,ie.instancingColor=V.instancingColor,ie.instancingMorph=V.instancingMorph,ie.skinning=V.skinning,ie.morphTargets=V.morphTargets,ie.morphNormals=V.morphNormals,ie.morphColors=V.morphColors,ie.morphTargetsCount=V.morphTargetsCount,ie.numClippingPlanes=V.numClippingPlanes,ie.numIntersection=V.numClipIntersection,ie.vertexAlphas=V.vertexAlphas,ie.vertexTangents=V.vertexTangents,ie.toneMapping=V.toneMapping}function Wf(D,V){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;y.setFromMatrixPosition(V.matrixWorld);for(let ie=0,Q=D.length;ie<Q;ie++){const j=D[ie];if(j.texture!==null&&j.boundingBox.containsPoint(y))return j}return null}function Vf(D,V,ie,Q,j){V.isScene!==!0&&(V=Ke),ne.resetTextureUnits();const Ce=V.fog,Fe=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?V.environment:null,Re=se===null?R.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ut.workingColorSpace,Ue=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,We=Me.get(Q.envMap||Fe,Ue),rt=Q.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,ct=!!ie.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),ke=!!ie.morphAttributes.position,wt=!!ie.morphAttributes.normal,jt=!!ie.morphAttributes.color;let zt=Ci;Q.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(zt=R.toneMapping);const Nt=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,_n=Nt!==void 0?Nt.length:0,Oe=Z.get(Q),An=b.state.lights;if(J===!0&&(le===!0||D!==re)){const kt=D===re&&Q.id===K;Ye.setState(Q,D,kt)}let gt=!1;Q.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==An.state.version||Oe.outputColorSpace!==Re||j.isBatchedMesh&&Oe.batching===!1||!j.isBatchedMesh&&Oe.batching===!0||j.isBatchedMesh&&Oe.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Oe.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Oe.instancing===!1||!j.isInstancedMesh&&Oe.instancing===!0||j.isSkinnedMesh&&Oe.skinning===!1||!j.isSkinnedMesh&&Oe.skinning===!0||j.isInstancedMesh&&Oe.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Oe.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Oe.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Oe.instancingMorph===!1&&j.morphTexture!==null||Oe.envMap!==We||Q.fog===!0&&Oe.fog!==Ce||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Ye.numPlanes||Oe.numIntersection!==Ye.numIntersection)||Oe.vertexAlphas!==rt||Oe.vertexTangents!==ct||Oe.morphTargets!==ke||Oe.morphNormals!==wt||Oe.morphColors!==jt||Oe.toneMapping!==zt||Oe.morphTargetsCount!==_n||!!Oe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Oe.__version=Q.version);let Kn=Oe.currentProgram;gt===!0&&(Kn=na(Q,V,j),L&&Q.isNodeMaterial&&L.onUpdateProgram(Q,Kn,Oe));let xi=!1,Xi=!1,Os=!1;const It=Kn.getUniforms(),Qt=Oe.uniforms;if(C.useProgram(Kn.program)&&(xi=!0,Xi=!0,Os=!0),Q.id!==K&&(K=Q.id,Xi=!0),Oe.needsLights){const kt=Wf(b.state.lightProbeGridArray,j);Oe.lightProbeGrid!==kt&&(Oe.lightProbeGrid=kt,Xi=!0)}if(xi||re!==D){C.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),It.setValue(z,"projectionMatrix",D.projectionMatrix),It.setValue(z,"viewMatrix",D.matrixWorldInverse);const qi=It.map.cameraPosition;qi!==void 0&&qi.setValue(z,Ie.setFromMatrixPosition(D.matrixWorld)),N.logarithmicDepthBuffer&&It.setValue(z,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&It.setValue(z,"isOrthographic",D.isOrthographicCamera===!0),re!==D&&(re=D,Xi=!0,Os=!0)}if(Oe.needsLights&&(An.state.sunShadowMap.length>0&&It.setValue(z,"sunShadowMap",An.state.sunShadowMap,ne),An.state.directionalShadowMap.length>0&&It.setValue(z,"directionalShadowMap",An.state.directionalShadowMap,ne),An.state.spotShadowMap.length>0&&It.setValue(z,"spotShadowMap",An.state.spotShadowMap,ne),An.state.pointShadowMap.length>0&&It.setValue(z,"pointShadowMap",An.state.pointShadowMap,ne)),j.isSkinnedMesh){It.setOptional(z,j,"bindMatrix"),It.setOptional(z,j,"bindMatrixInverse");const kt=j.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),It.setValue(z,"boneTexture",kt.boneTexture,ne))}j.isBatchedMesh&&(It.setOptional(z,j,"batchingTexture"),It.setValue(z,"batchingTexture",j._matricesTexture,ne),It.setOptional(z,j,"batchingIdTexture"),It.setValue(z,"batchingIdTexture",j._indirectTexture,ne),It.setOptional(z,j,"batchingColorTexture"),j._colorsTexture!==null&&It.setValue(z,"batchingColorTexture",j._colorsTexture,ne));const Ki=ie.morphAttributes;if((Ki.position!==void 0||Ki.normal!==void 0||Ki.color!==void 0)&&X.update(j,ie,Kn),(Xi||Oe.receiveShadow!==j.receiveShadow)&&(Oe.receiveShadow=j.receiveShadow,It.setValue(z,"receiveShadow",j.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&V.environment!==null&&(Qt.envMapIntensity.value=V.environmentIntensity),Qt.dfgLUT!==void 0&&(Qt.dfgLUT.value=Ny()),Xi){if(It.setValue(z,"toneMappingExposure",R.toneMappingExposure),Oe.needsLights&&Yf(Qt,Os),Ce&&Q.fog===!0&&ze.refreshFogUniforms(Qt,Ce),ze.refreshMaterialUniforms(Qt,Q,ee,q,b.state.transmissionRenderTarget[D.id]),Oe.needsLights&&Oe.lightProbeGrid){const kt=Oe.lightProbeGrid;Qt.probesSH.value=kt.texture,Qt.probesMin.value.copy(kt.boundingBox.min),Qt.probesMax.value.copy(kt.boundingBox.max),Qt.probesResolution.value.copy(kt.resolution)}qa.upload(z,xh(Oe),Qt,ne)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(qa.upload(z,xh(Oe),Qt,ne),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&It.setValue(z,"center",j.center),It.setValue(z,"modelViewMatrix",j.modelViewMatrix),It.setValue(z,"normalMatrix",j.normalMatrix),It.setValue(z,"modelMatrix",j.matrixWorld),Q.uniformsGroups!==void 0){const kt=Q.uniformsGroups;for(let qi=0,Fs=kt.length;qi<Fs;qi++){const _h=kt[qi];ge.update(_h,Kn),ge.bind(_h,Kn)}}return Kn}function Yf(D,V){D.ambientLightColor.needsUpdate=V,D.lightProbe.needsUpdate=V,D.sunLights.needsUpdate=V,D.sunLightShadows.needsUpdate=V,D.directionalLights.needsUpdate=V,D.directionalLightShadows.needsUpdate=V,D.pointLights.needsUpdate=V,D.pointLightShadows.needsUpdate=V,D.spotLights.needsUpdate=V,D.spotLightShadows.needsUpdate=V,D.rectAreaLights.needsUpdate=V,D.hemisphereLights.needsUpdate=V}function Xf(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(D,V,ie){const Q=Z.get(D);Q.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),Z.get(D.texture).__webglTexture=V,Z.get(D.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:ie,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,V){const ie=Z.get(D);ie.__webglFramebuffer=V,ie.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(D,V=0,ie=0){se=D,B=V,Y=ie;let Q=null,j=!1,Ce=!1;if(D){const Re=Z.get(D);if(Re.__useDefaultFramebuffer!==void 0){C.bindFramebuffer(z.FRAMEBUFFER,Re.__webglFramebuffer),F.copy(D.viewport),te.copy(D.scissor),ae=D.scissorTest,C.viewport(F),C.scissor(te),C.setScissorTest(ae),K=-1;return}else if(Re.__webglFramebuffer===void 0)ne.setupRenderTarget(D);else if(Re.__hasExternalTextures)ne.rebindTextures(D,Z.get(D.texture).__webglTexture,Z.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const rt=D.depthTexture;if(Re.__boundDepthTexture!==rt){if(rt!==null&&Z.has(rt)&&(D.width!==rt.image.width||D.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(D)}}const Ue=D.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Ce=!0);const We=Z.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(We[V])?Q=We[V][ie]:Q=We[V],j=!0):D.samples>0&&ne.useMultisampledRTT(D)===!1?Q=Z.get(D).__webglMultisampledFramebuffer:Array.isArray(We)?Q=We[ie]:Q=We,F.copy(D.viewport),te.copy(D.scissor),ae=D.scissorTest}else F.copy(G).multiplyScalar(ee).floor(),te.copy($).multiplyScalar(ee).floor(),ae=fe;if(ie!==0&&(Q=O),C.bindFramebuffer(z.FRAMEBUFFER,Q)&&C.drawBuffers(D,Q),C.viewport(F),C.scissor(te),C.setScissorTest(ae),j){const Re=Z.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+V,Re.__webglTexture,ie)}else if(Ce){const Re=V;for(let Ue=0;Ue<D.textures.length;Ue++){const We=Z.get(D.textures[Ue]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ue,We.__webglTexture,ie,Re)}}else if(D!==null&&ie!==0){const Re=Z.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Re.__webglTexture,ie)}K=-1};function vh(D){const V=Z.get(D);return(V.__readFormat!==D.format||V.__readType!==D.type)&&(V.__readFormat=D.format,V.__readType=D.type,V.__formatReadable=N.textureFormatReadable(D.format),V.__typeReadable=N.textureTypeReadable(D.type)),V}this.readRenderTargetPixels=function(D,V,ie,Q,j,Ce,Fe,Re=0){if(!(D&&D.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Z.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ue=Ue[Fe]),Ue){C.bindFramebuffer(z.FRAMEBUFFER,Ue);try{const We=D.textures[Re],rt=We.format,ct=We.type;D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Re);const ke=vh(We);if(ke.__formatReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ke.__typeReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=D.width-Q&&ie>=0&&ie<=D.height-j&&z.readPixels(V,ie,Q,j,Ee.convert(rt),Ee.convert(ct),Ce)}finally{const We=se!==null?Z.get(se).__webglFramebuffer:null;C.bindFramebuffer(z.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(D,V,ie,Q,j,Ce,Fe,Re=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Z.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ue=Ue[Fe]),Ue)if(V>=0&&V<=D.width-Q&&ie>=0&&ie<=D.height-j){C.bindFramebuffer(z.FRAMEBUFFER,Ue);const We=D.textures[Re],rt=We.format,ct=We.type;D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Re);const ke=vh(We);if(ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const wt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,wt),z.bufferData(z.PIXEL_PACK_BUFFER,Ce.byteLength,z.STREAM_READ),z.readPixels(V,ie,Q,j,Ee.convert(rt),Ee.convert(ct),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const jt=se!==null?Z.get(se).__webglFramebuffer:null;C.bindFramebuffer(z.FRAMEBUFFER,jt);const zt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await sx(z,zt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,wt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ce),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(wt),z.deleteSync(zt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,V=null,ie=0){const Q=Math.pow(2,-ie),j=Math.floor(D.image.width*Q),Ce=Math.floor(D.image.height*Q),Fe=V!==null?V.x:0,Re=V!==null?V.y:0;ne.setTexture2D(D,0),z.copyTexSubImage2D(z.TEXTURE_2D,ie,0,0,Fe,Re,j,Ce),C.unbindTexture()},this.copyTextureToTexture=function(D,V,ie=null,Q=null,j=0,Ce=0){let Fe,Re,Ue,We,rt,ct,ke,wt,jt;const zt=D.isCompressedTexture?D.mipmaps[Ce]:D.image;if(ie!==null)Fe=ie.max.x-ie.min.x,Re=ie.max.y-ie.min.y,Ue=ie.isBox3?ie.max.z-ie.min.z:1,We=ie.min.x,rt=ie.min.y,ct=ie.isBox3?ie.min.z:0;else{const Qt=Math.pow(2,-j);Fe=Math.floor(zt.width*Qt),Re=Math.floor(zt.height*Qt),D.isDataArrayTexture?Ue=zt.depth:D.isData3DTexture?Ue=Math.floor(zt.depth*Qt):Ue=1,We=0,rt=0,ct=0}Q!==null?(ke=Q.x,wt=Q.y,jt=Q.z):(ke=0,wt=0,jt=0);const Nt=Ee.convert(V.format),_n=Ee.convert(V.type);let Oe;V.isData3DTexture?(ne.setTexture3D(V,0),Oe=z.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ne.setTexture2DArray(V,0),Oe=z.TEXTURE_2D_ARRAY):(ne.setTexture2D(V,0),Oe=z.TEXTURE_2D),C.activeTexture(z.TEXTURE0),C.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,V.flipY),C.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),C.pixelStorei(z.UNPACK_ALIGNMENT,V.unpackAlignment);const An=C.getParameter(z.UNPACK_ROW_LENGTH),gt=C.getParameter(z.UNPACK_IMAGE_HEIGHT),Kn=C.getParameter(z.UNPACK_SKIP_PIXELS),xi=C.getParameter(z.UNPACK_SKIP_ROWS),Xi=C.getParameter(z.UNPACK_SKIP_IMAGES);C.pixelStorei(z.UNPACK_ROW_LENGTH,zt.width),C.pixelStorei(z.UNPACK_IMAGE_HEIGHT,zt.height),C.pixelStorei(z.UNPACK_SKIP_PIXELS,We),C.pixelStorei(z.UNPACK_SKIP_ROWS,rt),C.pixelStorei(z.UNPACK_SKIP_IMAGES,ct);const Os=D.isDataArrayTexture||D.isData3DTexture,It=V.isDataArrayTexture||V.isData3DTexture;if(D.isDepthTexture){const Qt=Z.get(D),Ki=Z.get(V),kt=Z.get(Qt.__renderTarget),qi=Z.get(Ki.__renderTarget);C.bindFramebuffer(z.READ_FRAMEBUFFER,kt.__webglFramebuffer),C.bindFramebuffer(z.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Fs=0;Fs<Ue;Fs++)Os&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Z.get(D).__webglTexture,j,ct+Fs),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Z.get(V).__webglTexture,Ce,jt+Fs)),z.blitFramebuffer(We,rt,Fe,Re,ke,wt,Fe,Re,z.DEPTH_BUFFER_BIT,z.NEAREST);C.bindFramebuffer(z.READ_FRAMEBUFFER,null),C.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(j!==0||D.isRenderTargetTexture||Z.has(D)){const Qt=Z.get(D),Ki=Z.get(V);C.bindFramebuffer(z.READ_FRAMEBUFFER,I),C.bindFramebuffer(z.DRAW_FRAMEBUFFER,U);for(let kt=0;kt<Ue;kt++)Os?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Qt.__webglTexture,j,ct+kt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Qt.__webglTexture,j),It?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ki.__webglTexture,Ce,jt+kt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ki.__webglTexture,Ce),j!==0?z.blitFramebuffer(We,rt,Fe,Re,ke,wt,Fe,Re,z.COLOR_BUFFER_BIT,z.NEAREST):It?z.copyTexSubImage3D(Oe,Ce,ke,wt,jt+kt,We,rt,Fe,Re):z.copyTexSubImage2D(Oe,Ce,ke,wt,We,rt,Fe,Re);C.bindFramebuffer(z.READ_FRAMEBUFFER,null),C.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else It?D.isDataTexture||D.isData3DTexture?z.texSubImage3D(Oe,Ce,ke,wt,jt,Fe,Re,Ue,Nt,_n,zt.data):V.isCompressedArrayTexture?z.compressedTexSubImage3D(Oe,Ce,ke,wt,jt,Fe,Re,Ue,Nt,zt.data):z.texSubImage3D(Oe,Ce,ke,wt,jt,Fe,Re,Ue,Nt,_n,zt):D.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ce,ke,wt,Fe,Re,Nt,_n,zt.data):D.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ce,ke,wt,zt.width,zt.height,Nt,zt.data):z.texSubImage2D(z.TEXTURE_2D,Ce,ke,wt,Fe,Re,Nt,_n,zt);C.pixelStorei(z.UNPACK_ROW_LENGTH,An),C.pixelStorei(z.UNPACK_IMAGE_HEIGHT,gt),C.pixelStorei(z.UNPACK_SKIP_PIXELS,Kn),C.pixelStorei(z.UNPACK_SKIP_ROWS,xi),C.pixelStorei(z.UNPACK_SKIP_IMAGES,Xi),Ce===0&&V.generateMipmaps&&z.generateMipmap(Oe),C.unbindTexture()},this.initRenderTarget=function(D){Z.get(D).__webglFramebuffer===void 0&&ne.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ne.setTextureCube(D,0):D.isData3DTexture?ne.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ne.setTexture2DArray(D,0):ne.setTexture2D(D,0),C.unbindTexture()},this.resetState=function(){B=0,Y=0,se=null,C.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}}const ky=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function By(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:me(e,.55,.42),[l.LEAF2]:me(e+.02,.5,.55),[l.LEAF3]:me(e+.04,.6,.26),[l.BODY]:me(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:me(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:me(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const hn=2.5,zy=[2.2,hn,.3],fl=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function Hy(){const n=new et({blend:.05}),e=[],t=(b,E)=>{const _=Math.sin(b*127.1+E*311.7)*43758.5453;return _-Math.floor(_)},i=b=>{const E=Math.sin(Math.atan2(b[2],b[0])*9+b[1]*2.3);return E>.75?l.BARKD:E<-.6?l.BARKL:E>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let b=0;b<7;b++){const E=b/7*Math.PI*2+.3,_=.45,S=1.05+t(b,1)*.45;n.chain([[Math.cos(E)*_,.45,-.2+Math.sin(E)*_,.2],[Math.cos(E)*(_+S)*.55,.16,-.2+Math.sin(E)*(_+S)*.55,.13],[Math.cos(E)*S,.02,-.2+Math.sin(E)*S,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const s=(b,E=1)=>n.chain(b,l.TRUNK,{group:E,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=b=>E=>{const _=t(Math.floor(E[0]*9),Math.floor(E[1]*9)+Math.floor(E[2]*9)*7);return E[1]<b[1]-.25||_<.18?l.LEAF3:_>.82?l.LEAF2:void 0};for(const[b,E]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(b,E,l.LEAF,{group:40,rough:.05,paint:r(b)});const a=[-.15,2.92,.15],o=P.norm([1,.07,0]),h=[1.25,.52,.58],c=b=>P.dot(P.sub(b,a),o),f=b=>P.dot(P.sub(b,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:b=>{const E=c(b),_=f(b),S=b[2]>a[2]+h[2]-.04;return S&&Math.hypot(E+.85,_-.02)<.15?Math.hypot(E+.85,_-.02)<.11?l.GLOW:l.FRAME:S&&E>.35&&E<.8&&_>-.42&&_<.38?_>.02&&_<.3&&E>.42&&E<.73?l.GLOW:Math.abs(E-.575)<.2&&_<-.38?l.FRAME:l.BODY2:S&&_>.06&&_<.32&&E>-.6&&E<.25?Math.abs(E+.17)<.02?l.BELLY:l.GLOW:E>h[0]-.05&&_>.05&&_<.35&&Math.abs(b[2]-a[2])<.45?l.MAGIC2:E>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(b[2]-a[2])-.38)<.08?l.FRAME:_>.02?l.BELLY:_<-.42?l.SHADES:void 0}}),e.push({at:P.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:P.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:P.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const b of[-.75,.75]){const E=P.add(P.add(a,P.mul(o,b)),[0,-.5,h[2]-.02]);n.ell(E,[.21,.21,.08],l.SHADES,{group:4,paint:_=>Math.hypot(_[0]-E[0],_[1]-E[1])<.1?l.FRAME:void 0})}n.seg(P.add(a,[1.05,.3,h[2]-.02]),P.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(P.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const d=P.add(a,[-.25,h[1]+.14,0]);n.box(d,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:b=>Math.floor((c(b)+2)*6)%2?l.BODY2:void 0}),n.box(P.add(d,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:P.norm([1,.14,0]),round:.04,group:6});for(const b of[-.18,.18])n.seg(P.add(a,[-1.33,-.45,b]),P.add(a,[-1.3,.62,b]),.02,.02,l.FRAME,{group:7});for(let b=0;b<5;b++)n.seg(P.add(a,[-1.33,-.32+b*.22,-.18]),P.add(a,[-1.33,-.32+b*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,m=1.45;n.seg(u,P.add(u,[0,m,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:b=>{const E=b[1]-u[1],_=Math.atan2(b[2]-u[2],b[0]-u[0]),S=Math.floor(E*6),R=Math.floor((_+Math.PI)*4+S%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&E>.75&&E<1.15?l.GLOW:E*6%1<.12||((_+Math.PI)*4+S%2*.5)%1<.1?l.STONED:t(S,R)<.15&&E<.5?l.MOSS:void 0}}),e.push({at:P.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let b=0;b<8;b++){const E=b/8*Math.PI*2;n.box(P.add(u,[Math.cos(E)*(p-.05),m+.1,Math.sin(E)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(E),0,Math.cos(E)],round:.02,group:9,rough:.008})}const M=P.add(u,[0,m+.1,0]),x=P.add(M,[.08,1.05,-.04]);n.seg(M,x,p-.1,.02,l.HAT1,{group:10,paint:b=>Math.floor((b[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(x,P.add(x,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(P.add(x,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:b=>b[1]>2.58?l.MOSS:void 0}),n.box(P.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(P.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const b of[-.9,.95]){const E=P.add(a,[b,-.55,0]);for(const _ of[-1,1])n.seg(P.add(E,[_*.04,-.08,h[2]+.03]),P.add(E,[_*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const g=[2.05,hn-.05,.3],v=[.85,.05,.62];n.box(g,v,l.WOOD,{round:.02,group:15,paint:b=>(b[2]-g[2]+2)*9%1<.12?l.BARKD:void 0});for(const[b,E]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([b,hn-.1,E],[b,hn-.7,E*.3],.04,.04,l.WOOD,{group:16});const w=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let b=0;b+1<w.length;b++){const[E,_]=[w[b],w[b+1]],S=Math.ceil(Math.hypot(_[0]-E[0],_[1]-E[1])/.32);n.seg([E[0],hn+.42,E[1]],[_[0],hn+.42,_[1]],.025,.025,l.WOOD,{group:17});for(let R=0;R<=S;R++){const T=R/S,L=E[0]+(_[0]-E[0])*T,O=E[1]+(_[1]-E[1])*T;n.seg([L,hn,O],[L,hn+.42,O],.02,.02,l.WOOD,{group:17})}}const y=zy;n.box([y[0],y[1]+nr-.02,y[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0}),n.box([y[0]-.2,y[1]+nr+.22,y[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0});for(const[b,E]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([y[0]+b,y[1],y[2]+E],[y[0]-b*.6,y[1]+nr-.03,y[2]-E*.2],.015,.015,l.FRAME,{group:19});for(const[b,E,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([b,hn,E],[b,hn+.2*_,E],.1*_,.13*_,l.EAR,{group:20}),n.ell([b,hn+.3*_,E],[.16*_,.14*_,.16*_],l.LEAF2,{group:21,rough:.02,paint:S=>t(Math.floor(S[0]*30),Math.floor(S[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:b=>Math.floor((b[2]+2)*5)%2?l.BODY2:void 0});for(const b of[.05,.95])n.seg([1.98,3.4,b],[1.98,hn,b],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const b of[.18,.48])n.seg([1.2,hn-.05,b],[1,.06,b+.12],.018,.018,l.STRAW,{group:25});for(let b=1;b<8;b++){const E=b/8,_=hn-.05-(hn-.11)*E,S=1.2-.2*E;n.seg([S,_,.18+.12*E],[S,_,.48+.12*E],.02,.02,l.WOOD,{group:25})}const A=(b,E,_,S,R)=>{for(let T=0;T<=S;T++){const L=T/S,O=P.lerp(b,E,L);O[1]-=Math.sin(L*Math.PI)*_,R(O,T)}};return A([-.55,3.95,.45],[1.95,3.42,1],.35,9,(b,E)=>{n.ell(b,[.035,.035,.035],fl[E%4],{group:26+E%2,extra:!0})}),A([-.75,4.7,.42],[1.6,3.65,1],.2,7,(b,E)=>{n.ell(b,[.03,.03,.03],fl[(E+2)%4],{group:28+E%2,extra:!0})}),A([2.88,hn+.45,.9],[2.88,hn+.45,-.3],.08,5,(b,E)=>{n.ell(b,[.03,.03,.03],fl[(E+1)%4],{group:30+E%2,extra:!0})}),A([-2,2.8,.1],[-.9,3.6,.5],.15,5,(b,E)=>{n.box(b,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][E%3],{dir:[1,0,.2],round:.005,group:32+E%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,hn+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[y[0],y[1],y[2]],door:P.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function Gy(n={},{facing:e="towards",ppm:t=16}={}){const i=Hy(),s=dn(i.m,{scale:xr(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let x=0;x<r.w;x++)r.m[M*r.w+x]&&(a=Math.min(a,x),o=Math.max(o,x),h=Math.min(h,M));const c=new mt(o-a+1,r.h-h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=(M+h)*r.w+x+a;r.m[g]&&c.put(x,M,r.m[g],r.n[g*3],r.n[g*3+1],r.n[g*3+2])}const f=M=>{const[x,g]=s.project(M);return[+(x-a).toFixed(1),+(g-h).toFixed(1)]},d=Math.round(f([0,i.splitY,0])[1]),u=new mt(c.w,c.h),p=new mt(c.w,c.h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=M*c.w+x,v=c.m[g];v&&(ky.has(v)||M<d?u:p).put(x,M,v,c.n[g*3],c.n[g*3+1],c.n[g*3+2])}const m=M=>{const[x,g]=f(M);return{x,y:g}};return{whole:c,top:u,bot:p,crownY:d,anchors:{base:m([0,0,-.2]),seat:m(i.seat),door:m(i.door),lights:i.lights.map(M=>({...m(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const xn=16,un=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Gi=[0,-.42,.9],rn=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,c=r-o,f=i?Math.round(i*t):0,d=m=>f?(m%f+f)%f:m,u=(m,M)=>un(m,d(M)),p=m=>m*m*(3-2*m);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function Xu(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let c=9,f=9,d=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=a+p,M=o+u,x=(M%h+h)%h,g=m+un(m,x*3+1),v=M+un(m*7+2,x),w=Math.hypot(g-s,v-r);w<c?(f=c,c=w,d=un(m,x)):w<f&&(f=w)}return{edge:f-c,id:d}}const ps=(n,e,t,i=.14)=>Math.abs(n)>1-i*rn(n>0?3:7,e,1.4,t)*1.6,wo={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(ps(n,e,4,.3))return 0;const i=rn(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&rn(n*2,e,.9,4)>.68?[l.WATER,0]:[s?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(ps(n,e,4,.5))return 0;const i=rn(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(ps(n,e,4,.1))return 0;const i=Xu(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:rn(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(ps(n,e,4,.08))return 0;const i=Xu(n*2,e,2.2,4);return i.edge<.16?[rn(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(un(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+rn(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(un(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[rn(n,e,3,4)<.15?l.MOSS:r?l.BARKD:un(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(ps(n,e,8,.06))return 0;const s=rn(n*4,e,1.1,8);return Math.abs(rn(n*6,e,.7,8)-.5)<.02||Math.abs(rn(n*3+9,e,1.6,8)-.5)<.012?[rn(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[s<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[l.BELLY,.05]:[s<.2?l.MOSS:s>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=rn(n*3,e,2.5,4),a=[0,.35,.6][i];if(ps(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[rn(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&rn(n,e,6,4)>a*.8?[un(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:r<a?[r<a*.5?l.LEAF:l.LEAF2,.1]:[r>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(ps(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+rn(n,e,3,4)*.06?[Math.abs(r-.5)<.05?l.BARKL:l.TRUNK,.6]:[rn(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&rn(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function pl(n,e,t){const i=new mt(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],Gi[0]+(a[1]?(un(r,s)-.5)*a[1]:0),Gi[1]+(a[1]?(un(s,r)-.5)*a[1]*.5:0),Gi[2])}return i}function Wy(n,{variant:e=0}={}){const t=wo[n],i=Math.round(t.width*xn),s=Math.round(t.period*xn);t.width/2;const r=(u,p,m)=>t.surface(u,p,m,e),a=pl(i,s,(u,p)=>r(u/i*2-1,p/xn)),o=Math.round(Math.max(1.5,t.width*.8)*xn),h=pl(i,o,(u,p)=>{const m=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(m));return Math.abs(M)>1||rn(u/xn,p/xn,2)>.25+m?0:r(M,p/xn)}),c=Math.round(t.width*2.4*xn),f=c/2,d=u=>pl(c,c,(p,m)=>{let M=null;for(const x of u){const g=Math.cos(x),v=Math.sin(x),w=(p-f)*g+(m-f)*v,y=-(p-f)*v+(m-f)*g;if(w<-t.width*xn*.5)continue;const A=y/(i/2);Math.abs(A)<=1&&(!M||Math.abs(A)<Math.abs(M.u))&&(M={u:A,v:(f-w)/xn})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-f,m-f)<i*.6):0});return{strip:a,end:h,y:d([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:d([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}function Ku(n,e,{variant:t=0,pad:i=2}={}){const s=wo[n],r=s.width/2,a=Array.isArray(e[0][0])?e:[e],o=a.flat(),h=o.map(x=>x[0]),c=o.map(x=>x[1]),f=Math.min(...h)-r-i,d=Math.min(...c)-r-i,u=Math.ceil((Math.max(...h)+r+i-f)*xn),p=Math.ceil((Math.max(...c)+r+i-d)*xn),m=[];for(const x of a){let g=0;for(let v=0;v+1<x.length;v++){const w=x[v],y=x[v+1],A=Math.hypot(y[0]-w[0],y[1]-w[1]);m.push({a:w,b:y,l:A,s:g,first:v===0,last:v+2===x.length}),g+=A}}const M=new mt(u,p);for(let x=0;x<p;x++)for(let g=0;g<u;g++){const v=f+(g+.5)/xn,w=d+(x+.5)/xn;let y=null;for(const b of m){const E=b.b[0]-b.a[0],_=b.b[1]-b.a[1],S=((v-b.a[0])*E+(w-b.a[1])*_)/(b.l*b.l);if(S<0&&b.first||S>1&&b.last)continue;const R=Math.max(0,Math.min(1,S)),T=b.a[0]+E*R,L=b.a[1]+_*R,O=Math.hypot(v-T,w-L);O<=r&&(!y||O<y.d)&&(y={d:O,u:((v-T)*-_+(w-L)*E)/b.l/r,v:b.s+R*b.l})}if(!y)continue;const A=s.surface(y.u,(y.v%s.period+s.period)%s.period,!1,t);A&&M.px(g,x,A[0],Gi[0],Gi[1],Gi[2])}return{sp:M,origin:[-f*xn,-d*xn]}}function Vy({variant:n=0,length:e=16,radius:t=30}={}){const i=[[0,0],[e,0]],s=[];for(let d=0;d<=12;d++){const u=d/12*(e/t);s.push([Math.sin(u)*t,(1-Math.cos(u))*t])}const r=Ku("railway",i,{variant:n,pad:0}),a=Ku("railway",s,{variant:n,pad:0}),o=Math.max(r.sp.w,a.sp.w+Math.round(a.origin[0]-r.origin[0])),h=Math.max(r.origin[1],a.origin[1]),c=Math.max(r.sp.h-r.origin[1],a.sp.h-a.origin[1])+h,f=new mt(o,Math.ceil(c));for(const d of[a,r])for(let u=0;u<d.sp.h;u++)for(let p=0;p<d.sp.w;p++){const m=d.sp.m[u*d.sp.w+p];if(!m)continue;const M=p+Math.round(r.origin[0]-d.origin[0]),x=u+Math.round(h-d.origin[1]);f.inb(M,x)&&!(f.m[x*o+M]===l.FRAME&&m!==l.FRAME)&&f.px(M,x,m,Gi[0],Gi[1],Gi[2])}return f}const gn=(n,e,t=0)=>un(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),bi=(n=.25,e=.15)=>t=>{const i=gn(t,16,3);return gn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},_i=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:bi(.4,.05)}),qu=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&gn(s,5,i)<.6?l.MOSS:gn(s,14)>.9?l.STONED:void 0}),ms=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=un(s,r)*6.283,o=t*Math.sqrt(un(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+un(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},ml=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=gn(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),Fa=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(un(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>gn(a,30)<.3?l.LEAF2:void 0})};function $u(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(f,d,u,p)=>{const m=Math.cos(d),M=Math.sin(d),x=[...f];return x[u]=f[u]*m-f[p]*M,x[p]=f[u]*M+f[p]*m,x},a=f=>r(r(f,i,1,2),t,0,1),o=f=>r(r(f,-t,0,1),-i,1,2),h=f=>P.add(a(f),s),c=f=>o(P.sub(f,s));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=h(f.a),f.b=h(f.b)):(f.c=h(f.c),f.axes=f.axes.map(a)),f.paint){const d=f.paint;f.paint=(u,p)=>d(c(u),p)}}const Yy={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:bi(.1,.2)(t)}),$u(n,e,{roll:.15,pitch:.1}),ms(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){qu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),ml(n,[0,.95,0],[.22,.18,.2],2),ms(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(un(e)-.5)*.3,0,(un(e,2)-.5)*.2],i=.08+un(e,3)*.1;n.seg(t,P.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(P.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){_i(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:bi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),Fa(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&gn(t,6,e)<.35?l.MOSS:gn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])qu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>gn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>gn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>gn(t,12)<.12?l.BARKD:t[1]>.55&&gn(t,5)<.3?l.MOSS:void 0});ml(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:s=>gn(s,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:bi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?l.FRAME:void 0});$u(n,e,{roll:1.4,at:[0,.3,.3]}),ms(n,14,2.2,4,5),Fa(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?gn(e,9)<.2?l.SHADES:l.GLOW:bi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>gn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),ml(n,[.7,3.1,-.1],[1,.6,.8],5),ms(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&gn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});_i(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),Fa(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),ms(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:bi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:bi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:bi(.3,.15)(e)}),_i(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});ms(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])_i(n,[-.2,0,e],[0,.75,e],1,.05),_i(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:bi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:bi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>gn(t,9)<.3?l.MOSS:void 0});ms(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])_i(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;_i(n,[t,2.8,0],[t+.5,3.1,0],2,.02),_i(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])_i(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])_i(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});Fa(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},wf=Object.entries(Yy).map(([n,e])=>({id:n,...e})),Xy=Object.fromEntries(wf.map(n=>[n.id,n]));function Sf(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:me(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:me(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:me(t,.35,.55),[l.TRUNK]:me(t,.45,.36),[l.LEAF]:me(e,.55,.45),[l.LEAF2]:me(e-.03,.5,.6),[l.LEAF3]:me(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:me(n.magicHue??.5,.55,1),[l.MAGIC2]:me(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function Ky(n,e={},t=16){const i=Xy[n];if(!i)throw new Error(`no path piece "${n}"`);const s=new et({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=xr(e)*1.1,a=dn(s,{scale:r}),o=a.sp;let h=o.w,c=-1,f=o.h;for(let m=0;m<o.h;m++)for(let M=0;M<o.w;M++)o.m[m*o.w+M]&&(h=Math.min(h,M),c=Math.max(c,M),f=Math.min(f,m));const d=new mt(c-h+1,o.h-f);for(let m=0;m<d.h;m++)for(let M=0;M<d.w;M++){const x=(m+f)*o.w+M+h;o.m[x]&&d.put(M,m,o.m[x],o.n[x*3],o.n[x*3+1],o.n[x*3+2])}const[u,p]=a.project([0,0,0]);return{sp:d,origin:{x:+(u-h).toFixed(1),y:+(p-f).toFixed(1)},metres:{width:+(d.w/t).toFixed(1),height:+(d.h/t).toFixed(1)}}}function qy(){const n={};for(const[e,t]of Object.entries(wo))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const Gr=32,Zu=15,Ju=Gr/2,$y=(n,e)=>(n+.5-Ju)**2+(e+.5-Ju)**2<=Zu*Zu;Uint8Array.from({length:Gr*Gr},(n,e)=>$y(e%Gr,e/Gr|0)?1:0);const uo=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],Zy={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function Jy(n=0){const[e,t,i]=Zy[uo[n%uo.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function Qu(n,e,t,i){const s=uo[n%uo.length],r=new et({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&pt(_,e,31)<.5;let c=0,f=1,d=.3,u=0,p=n*7;const m=(_,S,R,T)=>L=>{if(T&&Math.abs(Math.sin(L[0]*37+L[1]*23+Math.sin(L[2]*17)*2))<.07)return l.STONED;if(L[1]>_-.02&&(L[2]>S-.06||pt(Math.floor(L[0]*30),Math.floor(L[2]*30),R)<.2)&&pt(Math.floor(L[0]*40),Math.floor(L[2]*40),R+1)<.6)return l.MOSS},M=(_,S,R,T,L,O)=>{const I=h(O),U=1+o*.08;r.ell([_,S,R],[T*1.18,T*1.18,.06],l.STONED,{group:L,cut:!0}),r.ell([_,S,R-.02],[T*U,T*U,.035+o*.025],l.CRYSTAL,{group:900+O,paint:B=>{const Y=Math.hypot(B[0]-_,B[1]-S)/(T*U);return I?Y<.3?l.GLOW:l.CRYSTAL:Y<.2+o*.15?l.MAGIC2:Y<.5?l.GLOW:Y<.78?l.CRYSTAL:l.GLOW}})},x=(_,S,R,T,L,O,I,U)=>B=>{if(B[0]>_+T-.022){const Y=Math.min(R,L)*1.5,se=(O-L-B[2])/Y+.5,K=(S-B[1])/Y+.5;if(se>=0&&se<=1&&K>=0&&K<=1&&(i?wd(i,se,K,.065):ud(se,K,I,.12)))return a&&pt(I,e,5)<.5?l.STONED:l.RUNE}return U(B)},g=s.tiers,v=g[0][1]*g[0][2][0]+.02,w=.08,y=g[0][2][2];r.box([0,w,d-y],[v,w,y],l.STONE,{group:f,round:.03,rough:.006,paint:m(w*2,d,3,a)}),r.box([0,w*.9,d],[v-.06,w*.45,.12],l.STONED,{group:f,cut:!0,paint:_=>_[2]<d-.07?l.GLOW:void 0});for(let _=1;_<g[0][1];_++)r.box([-v+_*v*2/g[0][1],w*.9,d-.06],[.015,w*.45,.06],l.STONE,{group:f});c=w*2,f++;const A=[];g.forEach(([_,S,[R,T,L]],O)=>{const I=_==="tweet"?.09:0,U=S*R*2+(S-1)*(_==="tweet"?.14:.01),B=d-O*.035,Y=c+I+T;for(let se=0;se<S;se++){const K=-U/2+R+se*(R*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&se===S-1){A.push([K,R,T,L]);continue}const re=a&&_==="tweet"?[1,.12*(se%2?1:-1),0]:void 0,F=a&&_==="tweet"?Y-.04:Y,te=m(F+T,B-L+L,f,a),ae=se===S-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([K,F,B-L],[R-.005,T,L],l.STONE,{group:f,round:.035,rough:.004,dir:re,paint:ae?x(K,F,T,R-.005,L,B,p++,te):te}),_==="bass"&&M(K,Y+.02,B,Math.min(R,T)*.72,f,u++),_==="mid"&&(r.ell([K,Y,B],[R*.8,T*.7,L*.9],l.STONED,{group:f,cut:!0,paint:pe=>pe[2]<B-L*.45?h(u)?l.STONED:l.GLOW:void 0}),r.box([K,Y,B-L*.5],[.018,T*.6,L*.45],l.STONE,{group:f}),u++),_==="horn"){const pe=Y+T*.25;r.seg([K,pe,B-L*1.5],[K,pe,B+.03],.03,Math.min(R,T)*.78,l.STONED,{group:f,cut:!0,paint:_e=>_e[2]<B-L*.55?h(u)?l.STONED:l.GLOW:void 0}),M(K,Y-T*.6,B,T*.22,f,u++)}if(_==="tweet")for(const pe of[-.5,0,.5])M(K+pe*R*1.15,F,B,T*.55,f,u++);f++}if(_!=="tweet"){const se=a&&_==="horn"?R:0;r.box([-se,c+T*2+.012,B-.015],[U/2+.01-se,.012,.015],l.WOOD,{group:f++,round:.008}),c+=.024}_==="tweet"&&!a&&r.flat([0,c+I/2,B-L],[1,0,0],[0,1,0],U/2,I/2,(se,K)=>Math.abs(K)<.45&&Math.sin(se*23)>-.4?l.GLOW:null,{group:f++,bend:0}),c+=T*2+I});const b=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,S,R,T],L)=>{if(a&&L%2){r.seg([_,.03,S],[_+.12,.05,S+.04],.04,.02,l.CRYSTAL,{group:700+L});return}const O=[_+T*R,R,S+.05];r.seg([_,0,S],O,.045+R*.05,.006,l.CRYSTAL,{group:700+L,paint:I=>I[1]>R*(.65-o*.1)&&!a?l.GLOW:void 0}),r.seg([_+.04,0,S-.03],[_+.04+T*R*.5,R*.55,S],.03,.005,l.CRYSTAL,{group:720+L})}),!a)for(const[_,S,R,T]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,b+S-.1,R],[T,T*.8,T],l.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,S,R,T]of A)r.box([_+.45,S*.75,d+.25],[S,R,T],l.STONE,{group:f++,dir:[.6,.8,.2],round:.035,rough:.007,paint:m(1,0,9,!0)});return{m:r,top:b}}function Qy(n){const e=new et({blend:.02}),t=(i,s)=>pt(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:f=>Math.abs(Math.sin(f[0]*41+f[1]*29))<.08?l.STONED:f[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function ju(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(pt(s,t,1)*n.w),a=Math.floor(pt(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const jy=n=>Ec(n)*3,gl=new Map;function e5(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=jy(n),a=e+":"+r;gl.has(a)||gl.set(a,dn(Qu(e,0,"playing").m,{height:r}).s);const o=gl.get(a);if(i==="destroyed")return ju(dn(Qy(e),{scale:o}).sp,3,e*5+1);const{sp:h}=dn(Qu(e,t,i,s).m,{scale:o});return ju(h,i==="damaged"?4:10+t*2,e*5+t)}const t5=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function n5(){const n={};return t5.forEach(e=>n[e.k]=e.v),n}function i5(n,e,t,i,s){const r=Dc(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*xe(i,.9,1.1)),h=xo(i,a,r);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=me(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:Ed(o),colours:h}}function s5(n,e,t,i,s){const r=Rt[t].id,a=vr.find(x=>x.id===r),o=Op(r,n,{K:i,makeCanvas:s}),h=[],c=x=>h.push(x)-1,f={big:[],bigWeight:[],small:[],walls:[],set:null},d=(x,g)=>Mn(x,g,n,"none",s),u=(x,g)=>{const{parts:v,colours:w}=i5(a,x,n,ui(e*13+t*101+g*7+1),i);return{bot:c(d(v.bot,w)),top:c(d(v.top,w))}},p=Up(r,n,{K:i,makeCanvas:s}),m=Rt[t].layout.heightMix,M=x=>p.filter(g=>g.heightClass===x).length||1;for(const x of p)f.big.push({bot:c(x.bot),top:c(x.top)}),f.bigWeight.push(m?m[x.heightClass]/M(x.heightClass):x.weight);a.big.forEach(([x],g)=>{x==="tree"&&p.length||(f.big.push({bot:c(o.big[g].sp),top:null}),f.bigWeight.push(p.length?.1:1))}),a.small.forEach(([x,g],v)=>f.small.push(x==="tree"?u(g,500+v):{bot:c(o.small[v].sp),top:null}));for(const x of o.walls)f.walls.push(c(x.sp));return o.setPiece&&(f.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:f,floor:o.floor.sp}}function ed(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(Mn(X0(e,a,o,n,r,i),W0(e,n,i),n,n.cOutline,t));return s}const r5=(n,e,t=!1)=>(t?8:0)+n*2+e;function fo(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Ms(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),c=new Uint8Array(o*h*4),f=new Uint8Array(o*h*4),d=n.map((u,p)=>{const m=i[p],M=fo(u.A,u.w,u.h),x=fo(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const w=v*u.w*4,y=((m.y+v)*o+m.x)*4;c.set(M.subarray(w,w+u.w*4),y),f.set(x.subarray(w,w+u.w*4),y)}let g=0;e:for(let v=u.h-1;v>=0;v--,g++)for(let w=0;w<u.w;w++)if(M[(v*u.w+w)*4+3]>=128)break e;return{uv:[m.x/o,m.y/h,(m.x+u.w)/o,(m.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(g,u.h)}});return{albedo:c,normal:f,width:o,height:h,frames:d}}function a5(n,e){const t=[],i=[],s=Sm(n);for(const r of Oc){const a=Em(r.id,n);i.push({id:r.id,family:r.family,decal:!!r.decal,frame:t.push(Mn(a.whole,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:wm(n)}}function o5(n,e){const t=[],i=[],s=Sf(n);for(const r of wf){const a=Ky(r.id,n);i.push({id:r.id,frame:t.push(Mn(a.sp,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,pieces:i}}function l5(n,e){const t=[],i=[],s=mm(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of Ss)for(let o=0;o<a.variants;o++){const h=gm(a.id,n,{variant:o}),c=h.crownY>0&&!r(h.top),f=t.push(Mn(c?h.bot:h.whole,s,n,"none",e))-1,d=c?t.push(Mn(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:f,top:d,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function c5(n,e){if(n.kind==="creature")return{px:Ms(ed(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:r,relics:a,layouts:o}=a5(n.style,e);return{px:Ms(r,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:r,pieces:a}=o5(n.style,e);return{px:Ms(r,2048),pieces:a}}if(n.kind==="decor"){const{sprites:r,decor:a}=l5(n.style,e);return{px:Ms(r,2048),decor:a}}if(n.kind==="party")return{px:Ms(ed(n.style,n.species,e,{...G0(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=s5(n.style,n.seed,n.id,n.K,e);return{px:Ms(t),layout:i,floor:{albedo:new Uint8Array(fo(s.A,s.w,s.h)),normal:new Uint8Array(fo(s.N,s.w,s.h)),w:s.w,h:s.h}}}function td(n,e,t){const i=new ws(n,e,t,Vn,Gn);return i.magFilter=Yt,i.minFilter=Yt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Wn,i.needsUpdate=!0,i}function Ef(n){return{albedo:td(n.albedo,n.width,n.height),normal:td(n.normal,n.width,n.height),frames:n.frames}}const js=(n,e=2048)=>Ef(Ms(n,e)),h5="7acb90c31dcd",u5="witch-art",Zr="sets";let Na=null;function Af(){return Na||(Na=new Promise(n=>{try{if(typeof indexedDB>"u")return n(null);const e=indexedDB.open(u5,1);e.onupgradeneeded=()=>{try{e.result.createObjectStore(Zr)}catch{}},e.onsuccess=()=>n(e.result),e.onerror=()=>n(null),e.onblocked=()=>n(null)}catch{n(null)}}),Na)}async function d5(n){try{const e=await Af();return e?await new Promise(t=>{try{const i=e.transaction(Zr,"readonly").objectStore(Zr).get(n);i.onsuccess=()=>t(i.result??null),i.onerror=()=>t(null)}catch{t(null)}}):null}catch{return null}}function f5(n,e){Af().then(t=>{if(t)try{const i=t.transaction(Zr,"readwrite");i.onerror=s=>s.preventDefault(),i.objectStore(Zr).put(e,n)}catch{}}).catch(()=>{})}function p5(n){let e=2166136261;for(let t=0;t<n.length;t++)e=Math.imul(e^n.charCodeAt(t),16777619);return(e>>>0).toString(36)}class m5{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i,this.styleHash=p5(JSON.stringify(e));const s=a0(e),r=u=>Mn(f0(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(m=>r({pose:u,frame:m,facing:p}))))),o=md;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,m={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFoot[u]=m}for(const[u,p]of[["fast",3],["brake",2]]){const m={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFly[u]=m}this.witch=js(a,2048),this.stones=js([0,1,2,3].map(u=>this.stone(u)));const h=Gp(e);this.props=js([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(Mn(e5(e,{variant:u,frame:p,state:"playing"}),Jy(u),e,e.cOutline));this.soundsystems=js(c,2048);const f=Gy(e),d=By(e);for(const u of[f.bot,f.top])for(let p=Math.max(0,Math.floor(f.anchors.base.y-14));p<u.h;p++)for(let m=0;m<u.w;m++)u.m[p*u.w+m]===l.NOSE&&(u.m[p*u.w+m]=0);if(this.treehouse={atlas:js([f.bot,f.top].map(u=>Mn(u,d,e,"none")),2048),...f.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(6,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const m=new Worker(new URL(""+new URL("artWorker-u_NgvHEA.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:m,busy:!1};m.onmessage=x=>{M.busy=!1,M.job=void 0,this.receive(x.data),this.dispatch()},m.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;timings=[];get done(){return this.timings.length}styleHash;onFloor=()=>{};stone(e){const t=ui(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new mt(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,l.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),Mn(r,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;cacheKey=e=>e.kind==="party"?null:[h5,this.styleHash,this.key(e),e.kind==="type"?`${e.seed}|${e.K}`:""].join("|");ask(e,t=!1){const i=this.key(e);if(this.inFlight.has(i)){const a=t?this.queue.findIndex(o=>this.key(o)===i):-1;a>0&&this.queue.unshift(...this.queue.splice(a,1));return}this.inFlight.add(i);const s=this.cacheKey(e),r=()=>{t?this.queue.unshift(e):this.queue.push(e),this.dispatch()};if(!s){r();return}d5(s).then(a=>{a&&a.px?this.receive({job:e,result:a,ms:0,cached:!0}):r()},r)}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}if(!e.cached){const i=this.cacheKey(e.job);i&&f5(i,e.result)}const t=Ef(e.result.px);if(this.timings.push({set:this.key(e.job),ms:e.ms??0,at:performance.now(),cached:!!e.cached}),e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(s=>[s.id,s])),modern:i.filter(s=>s.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else if(e.job.kind==="type"){const i=e.result.px,s=new Map;for(const r of e.result.layout.big){if(r.top===null)continue;const a=i.frames[r.top],o=Math.round(a.uv[0]*i.width),h=Math.round(a.uv[1]*i.height);let c=-1;for(let f=a.h-1;f>=0&&c<0;f--)for(let d=0;d<a.w;d++)if(i.albedo[((h+f)*i.width+o+d)*4+3]>0){c=f;break}c>=0&&s.set(r.bot,(c+1)/a.h)}this.types.set(e.job.id,{atlas:t,layout:e.result.layout,cut:s}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)}else this.creatures.set(e.job.id,{atlas:t,frame:r5});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K},!0),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K})}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift(),r=performance.now(),a=c5(s,(o,h)=>{const c=document.createElement("canvas");return c.width=o,c.height=h,c});this.receive({job:s,result:a,ms:performance.now()-r}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const lr=24,ot={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowPower:{value:1.4},uHazeCentre:{value:new je},uHazeRange:{value:new je(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:lr},()=>new ht)},uLightCol:{value:Array.from({length:lr},()=>new ht)},uLightCount:{value:0},uDisco:{value:new ht},uDiscoParams:{value:new ht},uDiscoColour:{value:new W(1,1,1)},uScenery:{value:new je(1e6,1)}};function g5(n,e,t,i=1,s=2.5,r=1){const a=(o,h)=>new W(o[0]/255*h,o[1]/255*h,o[2]/255*h);ot.uAmb.value.copy(a(me(n.ambientHue,.55,1),n.ambient*i)),ot.uMoon.value.copy(a(me(n.moonHue,.35,1),n.moon*r)),ot.uMoonBeam.value.copy(a(me(n.moonHue,.35,1),n.shafts*.25)),ot.uBands.value=n.bands,ot.uDither.value=n.dither*.5,ot.uShafts.value=n.shafts,ot.uShaftScale.value=t*2,ot.uGlowRgb.value.copy(a(me(n.glowHue,n.glowSat,1),1)),ot.uGlowR.value=e,ot.uGlowFalloff.value=s,ot.uGlowPower.value=n.glowPower,ot.uHazeColour.value.copy(a(me(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const mi=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${lr}], uLightCol[${lr}];
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
  // The witch's glow (Ed, v147: "should fall off faster"): full under her, falling off with the
  // distance along the ground as (1 - d/reach)^falloff (about half at 12 m, a faint tail, nothing
  // at the reach); lit from a source above her, so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float dg = length(v.xz);
  if (dg < uGlowR) {
    float ndl = max(0.0, dot(N, normalize(v + vec3(0.0, 1e-4, 0.0)))) * 0.35 + 0.65;
    float fall = pow(1.0 - dg / uGlowR, uGlowFalloff);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower);
  }
  for (int i = 0; i < ${lr}; i++) {
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
`,es=2,mn=32,vs=8,x5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,M5=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform vec3 uTerrain[32];        // each type's ground features: mounds, hollows, ridges (0 or 1)
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
${mi}
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
    vec2 cell = vec2(mod(float(t), ${vs}.0), floor(float(t) / ${vs}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The ground's features (its type's terrain): low mounds lit on the moon's side and shaded on
  // the other, sunken hollows darker at the bottom, and ridges in long ripples. Shading only.
  if (area.a > 0.5) {
    vec3 T = uTerrain[t];
    if (T.x + T.y + T.z > 0.0) {
      vec2 md = normalize(uMoonDir.xz + vec2(1e-4));
      float k = 11.0, e = 1.5;
      float n0 = vnoise(p / k), gx = vnoise((p + vec2(e, 0.0)) / k) - n0, gz = vnoise((p + vec2(0.0, e)) / k) - n0;
      float slope = dot(vec2(gx, gz), md) / e * k;  // + where the ground faces the moon
      float bump = T.x * smoothstep(0.45, 0.75, n0) - T.y * smoothstep(0.5, 0.8, 1.0 - n0);
      c *= 1.0 + bump * slope * 0.45 - T.y * smoothstep(0.62, 0.9, 1.0 - n0) * 0.3;
      if (T.z > 0.0) c *= 1.0 + T.z * 0.14 * sin((p.x * 0.55 + p.y) / 4.0 + vnoise(p / 30.0) * 6.0);
    }
  }
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
`;class v5{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*es/mn)*mn,c=Math.ceil(o*es/mn)*mn;this.tilesX=h/mn,this.tilesZ=c/mn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const f=m=>(m.magFilter=m.minFilter=Yt,m.generateMipmaps=!1,m.colorSpace=Wn,m.needsUpdate=!0,m);this.texture=f(new ws(new Uint8Array(h*c*4),h,c)),f(this.tile),this.floors=f(new ws(new Uint8Array(64*vs*48*4*4),64*vs,192));const d=Array.from({length:32},(m,M)=>new W(...Rt[M]?.floor??[.25,.45,.4])),u=new xt({vertexShader:x5,fragmentShader:M5,uniforms:{...ot,uAreas:{value:this.texture},uExtent:{value:new ht(r.minX,r.minZ,h/es,c/es)},uPixel:{value:s},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(m,M)=>{const x=Rt[M]?.layout.terrain??[];return new W(+x.includes("mounds"),+x.includes("hollows"),+x.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new je(64,48)},uFloorsSize:{value:new je(64*vs,192)},uSat:{value:i.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ht},uCircle:{value:new ht},uSweeps:{value:Array.from({length:4},()=>new ht)},uSweepCount:{value:0},uClearing:{value:new je(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Xn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Gt(p,u),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new ws(new Uint8Array(mn*mn*4),mn,mn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new ws(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new je(t%vs*i.w,Math.floor(t/vs)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=mn/es,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),f=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(s-a.minZ)/o,m=[];for(let g=f;g<=d;g++)for(let v=h;v<=c;v++)this.filled[g*this.tilesX+v]||m.push([v,g,(v+.5-u)**2+(g+.5-p)**2]);m.sort((g,v)=>g[2]-v[2]);const M=performance.now();let x=0;for(const[g,v]of m){if(x>0&&performance.now()-M>r)break;this.fillTile(e,g,v),x++}return m.length-x}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=mn/es,o=s.minX+t*a,h=s.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(f=>f.kind==="pond");for(let f=0;f<mn;f++)for(let d=0;d<mn;d++){const u=o+(d+.5)/es,p=h+(f+.5)/es,m=this.map.areaAt(u,p),M=(f*mn+d)*4;let x=0;for(const g of c)Math.hypot(u-g.x,p-g.z)<3*g.size&&(x=255);r[M]=m.type,r[M+1]=Math.round(m.openness*255),r[M+2]=x,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new je(t*mn,i*mn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const xl=wo,_5=new Set(["tarmac","railway","stairs","bridges"]),Ml=`
attribute vec3 uvw; // across (0-1), along (in periods), metres to the nearer end of its stretch
varying vec3 vWorld;
varying vec2 vUv;
varying float vEnd;
void main() {
  vWorld = position;
  vUv = uvw.xy;
  vEnd = uvw.z;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,Tf=`
uniform float uPathFade; // metres over which a path's end fades out
varying float vEnd;
float pbayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[x + y * 4]) + 0.5) / 16.0;
}
float phash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
// Ends fray out (Ed, v149): over the last uPathFade metres pixels drop away in an ordered dither on
// the art's pixel grid, broken up by noise so the end crumbles into the grass, not in a line.
bool pathEndGone(vec2 px) {
  if (uPathFade <= 0.0) return false;
  float n = phash(floor(px / 3.0)) * 0.5 + phash(px) * 0.5;
  float e = clamp(vEnd / uPathFade + (n - 0.5) * 0.45, 0.0, 1.0);
  return pbayer(px) >= e;
}
`,nd=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${mi}
${Tf}
void main() {
  // Sample at the centre of the art pixel this fragment is in, as the floor does, so the path's
  // pixels line up with the ground's.
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel;
  mat2 dw = mat2(dFdx(vWorld.xz), dFdy(vWorld.xz)), du = mat2(dFdx(vUv), dFdy(vUv));
  vec2 uv = vUv;
  if (abs(determinant(dw)) > 1e-9) uv += du * inverse(dw) * (p - vWorld.xz);
  if (uv.x < 0.0 || uv.x > 1.0) discard;
  if (pathEndGone(floor(vWorld.xz / uPixel))) discard;
  vec4 c = texture2D(uStrip, vec2(uv.x, fract(uv.y)));
  if (c.a < 0.5) discard;
  if (c.a < 0.999) { gl_FragColor = vec4(haze(c.rgb, vWorld), sceneryFade(vWorld)); return; } // the magic trail glows
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y), 1.0);
  gl_FragColor = vec4(haze(min(vec3(1.0), c.rgb * light * 1.25), vWorld), sceneryFade(vWorld));
}
`,b5=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${mi}
${Tf}
float h21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
void main() {
  vec2 px = floor(vWorld.xz / uPixel), p = (px + 0.5) * uPixel;
  float across = abs(vUv.x * 2.0 - 1.0), bank = 1.0 - 0.35 * vn(vec2(vUv.y * 3.0, vUv.x > 0.5 ? 3.0 : 9.0));
  if (across > bank || pathEndGone(px)) discard;
  vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
  vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
  vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
  float spec = dot(R, moon) + (vn(px * vec2(0.6, 2.5) + vec2(0.0, uTime * 1.5)) - 0.5) * 0.06;
  vec3 water = vec3(0.015, 0.03, 0.055) * nightLight(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y)) * 4.0;
  if (across > bank - 0.12) water = mix(water, vec3(0.05, 0.06, 0.05), 0.6); // the muddy margin
  else if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
  else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
  else if (vn(vec2(vUv.y * 4.0 - uTime * 0.8, vUv.x * 6.0)) > 0.72) water += vec3(0.05, 0.07, 0.1); // ripples
  gl_FragColor = vec4(haze(water, vWorld), sceneryFade(vWorld));
}
`;class y5{group=new ys;constructor(e,t,i,s=6){const r=e.paths,a=e.seed,o=qy(),h=new Map,c=u=>{const p=u.cell.join(",");let m=h.get(p);if(!m){const M=(o[Rt[u.type].id]??[]).filter(x=>!_5.has(x)&&xl[x]&&(x!=="magic"||Le(u.cell[0],u.cell[1],a+831)<.15));m=M.length?M[Math.floor(Le(u.cell[0],u.cell[1],a+833)*M.length)]:"dirt",h.set(p,m)}return m},f=new Map;r.lines.forEach((u,p)=>{const m=u.kind==="rail"?Math.floor(Le(p,1,a+835)*3):0,M=u.kind==="path"?c(u.area??e.areaAt(u.pts[0][0],u.pts[0][1])):"dirt",x=u.pts,g=x.length,v=[0];for(let _=1;_<g;_++)v.push(v[_-1]+Math.hypot(x[_][0]-x[_-1][0],x[_][1]-x[_-1][1]));const w=x.map((_,S)=>{const R=x[Math.max(0,S-1)],T=x[Math.min(g-1,S+1)],L=T[0]-R[0],O=T[1]-R[1],I=Math.hypot(L,O)||1;return[-O/I,L/I]}),y=v[g-1],A=Array.from({length:g-1},(_,S)=>{const R=(x[S][0]+x[S+1][0])/2,T=(x[S][1]+x[S+1][1])/2;return!(u.kind==="rail"&&r.railBroken(R,T))}),b=[],E=[];for(let _=0,S=0;_<g-1;_++)A[_]&&((_===0||!A[_-1])&&(S=v[_]),b[_]=S);for(let _=g-2,S=0;_>=0;_--)A[_]&&((_===g-2||!A[_+1])&&(S=v[_+1]),E[_]=S);for(let _=0;_<g-1;_++){if(!A[_])continue;const S=u.kind==="stream"?{width:u.half*2,period:4}:null,R=u.kind==="stream"?"stream":u.kind==="rail"?"railway":u.kind==="road"?"tarmac":M,T=S??xl[R],L=R+":"+m;let O=f.get(L);O||f.set(L,O={pos:[],uv:[]});const I=B=>T.width/2*(u.deadEnd?Math.min(1,(y-v[B])/6):1),U=(B,Y)=>{const se=I(B)*Y;O.pos.push(x[B][0]+w[B][0]*se,.02,x[B][1]+w[B][1]*se),O.uv.push(Y>0?1:0,v[B]/T.period,Math.min(v[B]-b[_],E[_]-v[B]))};U(_,-1),U(_,1),U(_+1,1),U(_,-1),U(_+1,1),U(_+1,-1)}});const d=Sf(t);for(const u of r.junctions){const p=Vy({variant:Math.floor(Le(u.line,1,a+835)*3)}),m=xn,M=p.w/m,x=p.h/m,g=xl.railway.width/2,v=u.side>0?-u.dz:u.dz,w=u.side>0?u.dx:-u.dx,y=(R,T)=>[u.x+u.dx*(R-g)+v*(T-g),.03,u.z+u.dz*(R-g)+w*(T-g)],A=[y(0,0),y(M,0),y(M,x),y(0,0),y(M,x),y(0,x)].flat(),b=[0,0,1e3,1,0,1e3,1,1,1e3,0,0,1e3,1,1,1e3,0,1,1e3],E=new _c(Mn(p,d,t,"none").A);E.magFilter=E.minFilter=Yt,E.generateMipmaps=!1,E.flipY=!1,E.colorSpace=Wn;const _=new Zt;_.setAttribute("position",new bt(A,3)),_.setAttribute("uvw",new bt(b,3));const S=new Gt(_,new xt({vertexShader:Ml,fragmentShader:nd,transparent:!0,depthWrite:!1,side:Qn,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6,uniforms:{...ot,uStrip:{value:E},uPixel:{value:i},uPathFade:{value:s}}}));S.renderOrder=.55,this.group.add(S)}for(const[u,p]of f){const[m,M]=u.split(":"),x=new Zt;if(x.setAttribute("position",new bt(p.pos,3)),x.setAttribute("uvw",new bt(p.uv,3)),m==="stream"){const b=new xt({vertexShader:Ml,fragmentShader:b5,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...ot,uPixel:{value:i},uPathFade:{value:s}}}),E=new Gt(x,b);E.frustumCulled=!1,E.renderOrder=.4,this.group.add(E);continue}const g=Wy(m,{variant:+M}).strip,v=Mn(g,d,t,"none"),w=new _c(v.A);w.magFilter=w.minFilter=Yt,w.generateMipmaps=!1,w.flipY=!1,w.wrapT=to,w.colorSpace=Wn;const y=new xt({vertexShader:Ml,fragmentShader:nd,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...ot,uStrip:{value:w},uPixel:{value:i},uPathFade:{value:s}}}),A=new Gt(x,y);A.frustumCulled=!1,A.renderOrder=.5,this.group.add(A)}}}const w5="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",S5=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,E5=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,A5=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,T5=`
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
}`;function gs(n,e,t,i=!1){const s=new ei(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Wn,s}class R5{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=gs(1,1,$t,!0),this.scene.depthTexture=new pr(1,1),this.fx.texture.format=Vn;const i=(s,r)=>new xt({vertexShader:w5,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(S5,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(E5,{uSrc:{value:null},uStep:{value:new je}}),composite:i(A5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new je},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(T5,{uSrc:{value:null},uTexel:{value:new je},uDir:{value:new je},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Gt(new Xn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=gs(1,1,$t);bloomB=gs(1,1,$t);a=gs(1,1,$t);b=gs(1,1,$t);fx=gs(1,1,$t);fxB=gs(1,1,$t);fxScene=null;quad;cam=new sh(-1,1,1,-1,0,1);mats;low=new je(1,1);out=new je(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,m=>{m.uScene.value=this.scene.texture,m.uThreshold.value=s.bloom.threshold});for(let m=0;m<2;m++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new lt),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const m=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/m,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,f=this.fullResolution?this.out.y/this.low.y:1,d=u=>{u.uTexel.value.set(1/h,1/c),u.uStrength.value=s.tiltShift.strength*f,u.uBand.value=s.tiltShift.band,u.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,u=>{d(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{d(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const C5=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,L5=`
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
}`,P5=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,D5=`
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
}`,I5=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class O5{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...me(r.circleHue2,.4,1).map(x=>x/255));this.ballMat=new xt({vertexShader:C5,fragmentShader:L5,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:ot.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new Gt(new Xn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new Gt(new Xn(s,h).translate(0,h/2,0),new xt({fragmentShader:P5,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=r.motes,f=[],d=[];for(let x=0;x<c.count;x++){const g=y=>{const A=Math.sin(x*12.9898+y*78.233)*43758.5453;return A-Math.floor(A)},v=g(1)*Math.PI*2,w=Math.sqrt(g(2))*a.radius*c.column;f.push(a.x+Math.cos(v)*w,.3,a.z+Math.sin(v)*w),d.push(g(3),c.speed*(.6+g(4)*.8),.4+g(5)*1.2,0)}const u=new Zt;u.setAttribute("position",new bt(f,3)),u.setAttribute("aMote",new bt(d,4));const p=me(r.circleHue,.55,1);this.motes=new $r(u,new xt({vertexShader:D5,fragmentShader:I5,uniforms:{uTime:ot.uTime,uRise:{value:c.rise},uTint:{value:new W(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Ri})),this.motes.frustumCulled=!1;const m=me(r.circleHue,.7,1);this.lightRgb=new W(m[0]/255,m[1]/255,m[2]/255);const M=ot;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),ot.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const F5=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class N5{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],c=[],f=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const u=d.from?e.map.siteOf(d.from[0],d.from[1]):null;f.push({...d.soundsystem,at:d.at,from:u})}for(const d of f){const u=r.transition>0?Math.min(1,(t-d.at)/r.transition):1,p=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],m=p.h*this.metresPerPixel,M=an((u-.55)/.45);if(u<1&&d.from){const g=(d.from.x+d.x)/2,v=(d.from.z+d.z)/2,w=Math.hypot(d.x-g,d.z-v)*1.6;h.push({x:g,z:v,radius:u*w,strength:1-an((u-.8)/.2)})}if(M>0&&i(d.x,d.z,p.w*this.metresPerPixel,m)){const g=Le(Math.round(d.x*10),Math.round(d.z*10),911)<.5;a.push({x:d.x,y:-(1-M)*m,z:d.z,frame:p,flip:g,fresh:s(d.x,d.z,m)})}u>=1&&c.push({x:d.x,y:m*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+r.transition});const x=.85+.15*Math.sin(t*8);M>0&&o.push({x:d.x,y:3,z:d.z,reach:r.lightReach,rgb:F5[d.variant%3],strength:r.lightStrength*x*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}const Vr=4;class U5{atlas;index=new Map;colour=new Map;height=new Map;constructor(e,t){const i=t.runeMarkers,s=[],r=[...new Set(Rt.map(o=>o.creature))],a=[i.dormant.glow,...Array.from({length:Vr-1},(o,h)=>i.awake.glow[0]+(i.awake.glow[1]-i.awake.glow[0])*h/(Vr-2))];for(const o of r){const h=Hp(e,{glow:"cyan",sigil:o}),c=hr(o);this.index.set(o,s.length),this.height.set(o,k5(h.A)),this.colour.set(o,new W(c[0]/255,c[1]/255,c[2]/255));for(const f of a)s.push(B5(h,c,f))}this.atlas=js(s,2048)}frame(e,t){return(this.index.get(e)??0)+Math.max(0,Math.min(Vr-1,t))}}function k5(n){const e=n.getContext("2d").getImageData(0,0,n.width,n.height).data;let t=-1,i=-1;for(let s=3;s<e.length;s+=4)if(e[s]>0){const r=Math.floor((s>>2)/n.width);t<0&&(t=r),i=r}return t<0?0:i-t+1}function B5(n,e,t){const i=document.createElement("canvas");i.width=n.w,i.height=n.h;const s=i.getContext("2d");s.drawImage(n.A,0,0);const r=s.getImageData(0,0,n.w,n.h),a=r.data;for(let o=0;o<a.length;o+=4){if(a[o+3]!==254)continue;const h=Math.max(a[o],a[o+1],a[o+2])/255,c=Math.max(0,h-.75)*2.4;for(let f=0;f<3;f++)a[o+f]=Math.min(255,(e[f]*(1-c)+255*c)*h*t)}return s.putImageData(r,0,0),{...n,A:i}}const id=`
attribute vec4 iBeam; // colour rgb, strength
varying vec4 vBeam;
varying float vY;
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`,sd=`
uniform float uShown;
varying vec4 vBeam;
varying float vY;
void main() {
  float a = vBeam.a * uShown * (1.0 - vY) * smoothstep(0.0, 0.08, vY);
  if (a < 0.003) discard;
  gl_FragColor = vec4(vBeam.rgb * a, 1.0);
}
`;class z5{constructor(e=64,t=600){this.maxBeams=e,this.maxMotes=t;const i=new ho(.5,.5,1,8,1,!0);this.beamAttr=new Ps(new Float32Array(e*4),4),i.setAttribute("iBeam",this.beamAttr),this.beams=new fu(i,new xt({vertexShader:id,fragmentShader:sd,uniforms:{uShown:{value:0}},transparent:!0,depthWrite:!1,blending:Ri,side:Qn}),e),this.beams.frustumCulled=!1,this.beams.renderOrder=9;const s=new ho(.5,.5,1,6,1,!0);this.laserAttr=new Ps(new Float32Array(e*4),4),s.setAttribute("iBeam",this.laserAttr),this.lasers=new fu(s,new xt({vertexShader:id,fragmentShader:sd,uniforms:{uShown:{value:1}},transparent:!0,depthWrite:!1,blending:Ri,side:Qn}),e),this.lasers.frustumCulled=!1,this.lasers.renderOrder=9,this.mPos=new Float32Array(t*3),this.mCol=new Float32Array(t*4);const r=new Zt;r.setAttribute("position",new Pn(this.mPos,3)),r.setAttribute("color",new Pn(this.mCol,4)),this.motes=new $r(r,new cf({size:3,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Ri})),this.motes.frustumCulled=!1,this.group.add(this.beams,this.lasers,this.motes)}maxBeams;maxMotes;group=new ys;beams;beamAttr;lasers;laserAttr;motes;mPos;mCol;m4=new Ft;update(e,t,i,s,r=[]){const a=Math.min(this.maxBeams,r.length);for(let f=0;f<a;f++){const d=r[f];this.m4.makeScale(d.width,d.height,d.width).setPosition(d.x,d.height/2+(d.base??1.5),d.z),this.lasers.setMatrixAt(f,this.m4),this.laserAttr.setXYZW(f,d.colour.x,d.colour.y,d.colour.z,d.strength)}this.lasers.count=a,this.lasers.instanceMatrix.needsUpdate=!0,this.laserAttr.needsUpdate=!0;const o=Math.min(this.maxBeams,e.length);for(let f=0;f<o;f++){const d=e[f];this.m4.makeScale(1.2,t,1.2).setPosition(d.x,t/2+(d.base??0),d.z),this.beams.setMatrixAt(f,this.m4),this.beamAttr.setXYZW(f,d.colour.x,d.colour.y,d.colour.z,d.strength)}this.beams.count=o,this.beams.instanceMatrix.needsUpdate=!0,this.beamAttr.needsUpdate=!0,this.beams.material.uniforms.uShown.value=i;const h=Math.min(this.maxMotes,s.length);for(let f=0;f<h;f++){const d=s[f];this.mPos.set([d.x,d.y,d.z],f*3),this.mCol.set([d.colour.x,d.colour.y,d.colour.z,d.alpha],f*4)}const c=this.motes.geometry;c.setDrawRange(0,h),c.getAttribute("position").needsUpdate=!0,c.getAttribute("color").needsUpdate=!0}}function H5(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function G5(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=ui(n.seed*53+t[0]*1031+t[1]*7+509),a=y=>{const A=n.areaAt(y.x,y.z).cell;return A[0]===t[0]&&A[1]===t[1]},o=y=>Le(Math.round(y.x*10),Math.round(y.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((y,A)=>o(y)-o(A)),c=new Map,f=new Set,d=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),m=(y,A=0)=>(c.get(y)??0)+1<=(f.has(y)?3:2)-A,M=(y,A)=>d.some(b=>H5([y.x,y.z],[A.x,A.z],[b.ax,b.az],[b.bx,b.bz])),x=(y,A)=>{d.push({ax:y.x,az:y.z,bx:A.x,bz:A.z,seed:Math.floor(Le(Math.round(y.x*10),Math.round(A.z*10),n.seed+503)*1e6)}),c.set(y,(c.get(y)??0)+1),c.set(A,(c.get(A)??0)+1)},g=(y,A,b)=>{let E=y,_=A;const S=[y];for(let R=0;R<b&&m(E);R++){const T=[];for(const I of h){if(I===E||!m(I))continue;const U=I.x-E.x,B=I.z-E.z,Y=Math.hypot(U,B);if(!(Y<i.spanMin||Y>i.spanMax)&&!(_&&(U*_[0]+B*_[1])/Y<p)&&!M(E,I)&&(T.push({b:I,d:Y}),T.length>=16))break}if(!T.length)break;T.sort((I,U)=>U.d-I.d);const{b:L,d:O}=T[Math.floor(r()*Math.min(4,T.length))];x(E,L),_=[(L.x-E.x)/O,(L.z-E.z)/O],S.push(L),E=L}return S},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),w=[];for(const y of h){if(u.length>=v)break;if(c.has(y)||u.some(E=>Math.hypot(E.x-y.x,E.z-y.z)<i.spread))continue;u.push(y);const A=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),b=g(y,null,A);for(let E=1;E<b.length-1;E++){if(r()>=i.junctionChance)continue;const _=b[E],S=b[E+1],R=S.x-_.x,T=S.z-_.z,L=Math.hypot(R,T),O=r()<.5?1:-1;f.add(_),w.push({from:_,heading:[-T/L*O,R/L*O]})}}for(const y of w)g(y.from,y.heading,i.spansPerRun[0]+Math.floor(r()*3));return d}const Ct={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ht(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new je(1,1)},uWitch:{value:new ht(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new ht(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new ht)},uPartyCol:{value:Array.from({length:16},()=>new W)},uPartyCount:{value:0},uUplight:{value:new ht},uTrunkFade:{value:new je(0,.125)}},vl=`
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
varying vec2 vLocal;
varying float vSizeY;
void main() {
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(iPos, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vLocal = uv;
  vSizeY = iSize.y;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  vec4 b = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  gl_Position.xy += (snapped - ndc) * gl_Position.w;
}
`,_l=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery, uAppear;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
uniform float uFlat; // lies flat on the ground (a court's decal), or gameplay that stays solid: never cut away round her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
uniform vec2 uTrunkFade; // metres of trunk the fade covers, metres per art pixel
${mi}
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
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  float e = length(gl_FragCoord.xy - uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  float occl = uFlat > 0.5 ? 0.0 : uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  if (uFadePass > 0.5 ? occl <= 0.001 : occl > 0.001) discard;
  float alpha = uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0;
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
    // (Ed: no dithering), or dithered steps with ?fx=pixel.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = max(smoothstep(uCutout.z - uCutout.w, uCutout.z, d), uTopFade);
    if (uSmooth > 0.5) { if (shown < 0.004) discard; alpha *= shown; }
    else if (bayer(gl_FragCoord.xy) >= shown) discard;
  }
  if (vFlags.y < -0.001 && uTrunkFade.x > 0.0) {
    // A trunk cut from its crown (Ed, v149: "fade out instead of just stop"): where the crowns are
    // hidden, its top fades out over uTrunkFade.x metres in an ordered dither on the art's own
    // pixel grid; where the crowns show, it stays whole under them.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float crown = max(smoothstep(uCutout.z - uCutout.w, uCutout.z, d), uTopFade);
    float topY = 1.0 + vFlags.y, band = uTrunkFade.x / max(vSizeY, 0.01);
    float t = clamp((topY - vLocal.y) / band, 0.0, 1.0);
    vec2 artPx = vec2(floor(vUv.x * float(textureSize(uAlbedo, 0).x)), floor(vLocal.y * vSizeY / uTrunkFade.y));
    if (bayer(artPx) >= max(t, crown)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
  if (vFlags.y > 0.5 && uPartyCount > 0) {
    // Crowns over a party catch a faint glow from below, on their undersides and lower edges.
    vec3 up = vec3(0.0);
    for (int i = 0; i < 16; i++) {
      if (i >= uPartyCount) break;
      float d = length(vWorld.xz - uParty[i].xy), r = uParty[i].z;
      if (d > r) continue;
      float k = (0.35 + 0.65 * (1.0 - smoothstep(0.0, r * 0.5, d))) * (1.0 - smoothstep(r - uUplight.z, r, d)) * uParty[i].w;
      up = max(up, uPartyCol[i] * k);
    }
    float under = clamp(0.45 - N.y * 0.75, 0.0, 1.0);
    col += up * uUplight.x * (1.0 + uUplight.y * sin(uUplight.w)) * under;
  }
  gl_FragColor = vec4(haze(min(vec3(1.0), col), vWorld), alpha);
}
void main() {
  shade();
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld) * uAppear; // and a set just drawn fades in
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class $n{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Xn(1,1);s.translate(0,.5,0),this.geo=new rh,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...ot,...Ct,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uFadePass:{value:0},uFlat:{value:i.flat||i.solid?1:0},uSilhouette:{value:new ht(0,0,0,0)},...h}),a=i.scenery?{blending:vo,blendSrc:Vc,blendDst:Yc}:{},o=new xt({vertexShader:vl,fragmentShader:_l,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new Gt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new Gt(this.geo,new xt({vertexShader:vl,fragmentShader:_l,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new Gt(this.geo,new xt({vertexShader:vl,fragmentShader:_l,uniforms:r({uSilhouette:{value:new ht(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:eo}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new Ps(new Float32Array(t*s),s);return a.setUsage(rr),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}appearU={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:a.cut?-a.cut:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const W5=`
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
}`,V5=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${mi}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,Y5=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,X5=`
varying vec3 vWorld;
${mi}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,K5=`
attribute vec4 aMote; // phase, rise speed, drift, time it appears
uniform float uTime, uRise;
varying vec3 vWorld;
varying float vA;
void main() {
  float t = uTime + aMote.x * 20.0, y = mod(t * aMote.y + aMote.x * uRise, uRise), k = y / uRise;
  vec3 p = position + vec3(sin(t * 0.7 + aMote.x * 9.0) * aMote.z, y, cos(t * 0.5 + aMote.x * 5.0) * aMote.z);
  vWorld = p;
  vA = (uTime >= aMote.w ? 1.0 : 0.0) * smoothstep(0.0, 0.15, k) * (1.0 - smoothstep(0.7, 1.0, k));
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = vA > 0.3 ? 1.0 : 0.0;
}`,q5=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${mi}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class $5{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new lt(r));const s={...ot,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new xt({vertexShader:W5,fragmentShader:V5,uniforms:{...s,uRes:Ct.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new xt({vertexShader:Y5,fragmentShader:X5,uniforms:s}),this.moteMat=new xt({vertexShader:K5,fragmentShader:q5,uniforms:{...ot,uMoteColour:{value:new lt(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:Ri})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],f=[],d=[],u=[];e.forEach((_,S)=>{const R=Math.hypot(_.bx-_.ax,_.bz-_.az),T=Math.max(2,Math.round(R/a.bulbSpacing)),L=O=>[_.ax+(_.bx-_.ax)*O,o-a.sag*4*O*(1-O)*(R/8),_.az+(_.bz-_.az)*O];for(let O=0;O<=16;O++){const I=L(O/16),U=L((O+1)/16);O<16&&(d.push(...I,...U),u.push(S+O/16,S+(O+1)/16))}for(let O=1;O<T;O++){const I=O/T,U=L(I),B=this.palette[(_.seed+O)%this.palette.length];h.push(...U),c.push(B.r,B.g,B.b),f.push((_.seed*13+O*7)%100/100,S*40+O,t(U[0],U[2])+O*.03,4*I*(1-I))}});const p=new ys,m=new Zt;m.setAttribute("position",new bt(h,3)),m.setAttribute("aColour",new bt(c,3)),m.setAttribute("aBulb",new bt(f,4));const M=new Zt;M.setAttribute("position",new bt(d,3)),M.setAttribute("aSway",new bt(u,1)),p.add(new ih(M,this.wireMat),new $r(m,this.bulbMat));const x=this.game.tuning.party.motes,g=this.game.map,v=[],w=[],y=g.areaSize*1.1,A=Math.round(Math.PI*y*y/400*x.perPatch);for(let _=0;_<A;_++){const S=U=>{const B=Math.sin(s*12.9898+_*78.233+U*37.719)*43758.5453;return B-Math.floor(B)},R=S(1)*Math.PI*2,T=Math.sqrt(S(2))*y,L=i.x+Math.cos(R)*T,O=i.z+Math.sin(R)*T,I=g.areaAt(L,O).cell;I[0]!==r[0]||I[1]!==r[1]||(v.push(L,x.from,O),w.push(S(3),x.speed*(.6+S(4)*.8),.3+S(5)*.8,t(L,O)))}const b=new Zt;b.setAttribute("position",new bt(v,3)),b.setAttribute("aMote",new bt(w,4));const E=new $r(b,this.moteMat);return E.frustumCulled=!1,p.add(E),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=G5(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),c=r.from?e.map.siteOf(r.from[0],r.from[1]):null,f=c?(c.x+h.x)/2:h.x,d=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-f,h.z-d)*1.6:1,p=e.tuning.party.transition,m=(M,x)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-f,x-d)/u)*p;a={lines:o,group:this.build(o,m,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const tn=32,Zs=16,Z5=`
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
}`,J5=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${mi}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class rd{mesh;geo=new rh;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Xn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Gt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new Ps(r,a).setUsage(rr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,c,f=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,i],d*3),this.size[d]=s,this.uv.set(r,d*4),this.col.set([a,o,h,c],d*4),this.draw[d]=f}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const Q5=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],j5=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class ew{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=tn*Zs;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(tn/2,tn/2,0,tn/2,tn/2,tn/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,tn,tn),this.tex=new _c(this.canvas),this.tex.magFilter=Yt,this.tex.minFilter=Yt,this.tex.generateMipmaps=!1;const r=a=>new xt({vertexShader:Z5,fragmentShader:J5,uniforms:{...ot,uRight:Ct.uRight,uUp:Ct.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Ri});this.standing=new rd(r(0)),this.flat=new rd(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%Zs*tn,o=Math.floor(s/Zs)*tn;r.clearRect(a,o,tn,tn),ip(r,e,{x:a+1,y:o+1,size:tn-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,tn,tn);for(let f=3;f<h.data.length;f+=4)h.data[f]=h.data[f]>90?255:0;r.putImageData(h,a,o);const c=hr(e);return this.colours.set(e,new lt(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=tn*Zs,i=e%Zs*tn,s=Math.floor(e/Zs)*tn;return[i/t,1-s/t,(i+tn)/t,1-(s+tn)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,f=h.bond,d=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const b of o.events)b.kind==="fizzled"&&this.fizzles.push({x:b.x,z:b.z,at:e}),b.kind==="invited"&&this.bursts.push({x:b.x,z:b.z,at:e,seed:b.id});this.fizzles=this.fizzles.filter(b=>e-b.at<.7),this.bursts=this.bursts.filter(b=>e-b.at<.9);for(const b of this.bursts){const E=(e-b.at)/.9;for(let _=0;_<28;_++){const S=Le(b.seed,_,3)*Math.PI*2,R=2+Le(b.seed,_,5)*3,T=2+Le(b.seed,_,7)*3,L=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(b.x+Math.cos(S)*R*E,.6+T*E-4*E*E,b.z+Math.sin(S)*R*E,.3,u,L[0],L[1],L[2],1-E)}}const p=(b,E,_)=>{const S=a.creatures[b],R=28,T=_?1:.45;for(let L=0;L<R;L++){const O=Math.PI/2-L/R*Math.PI*2,I=L/R<E;!_&&!I||this.flat.add(S.x+Math.cos(O)*1.5,0,S.z+Math.sin(O)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*T)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[b,E]of o.progress)o.talk?.id!==b&&p(b,Math.min(1,E/Od(a.creatures[b],h)),!1);const m=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let g={x:0,z:0},v=r;for(let b=o.stack.length-1;b>=0;b--){const E=o.stack[b],_=a.creatures[E],S=o.stack.length-1-b,R=this.chain[S],T=(2+_.level*.4)*m.scale,L=Math.sin(e*1.7+S*.9)*m.idleSway*(1+S*.5),O=g.x-c.vx*m.trail+L,I=g.z-c.vz*m.trail;R.vx+=((O-R.x)*m.stiffness-R.vx*m.damping)*M,R.vz+=((I-R.z)*m.stiffness-R.vz*m.damping)*M,R.x+=R.vx*M,R.z+=R.vz*M,g=R,v+=(S===0?m.offset*T:m.gap*T)+T/2;const U=new W(c.x+R.x,v,c.z+R.z);v+=T/2,x.set(E,U);const B=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(U.x,U.y,U.z,T,this.uv(this.slotOf(_.species,_.level)),B.r,B.g,B.b,1)}for(const b of o.placed){const E=a.creatures[b.id],_=this.slotOf(E.species,E.level),S=this.colours.get(E.species),R=.8+.2*Math.sin(e*2+b.id);this.flat.add(b.x,0,b.z,3+E.level*.8,this.uv(_),S.r*R,S.g*R,S.b*R,1,Math.min(1,(e-b.at)/.8)),this.flat.add(b.x,0,b.z,5,u,S.r,S.g,S.b,.25)}const w=h.sigilProjection,y=c.lift*c.lift*(3-2*c.lift);if(y>.01)for(const b of o.placed){const E=a.creatures[b.id],_=this.colours.get(E.species),S=h.treetopHeight-4+w.height,R=.85+.15*Math.sin(e*1.3+b.id);this.flat.add(b.x,S,b.z,(3+E.level*.8)*w.size,this.uv(this.slotOf(E.species,E.level)),_.r,_.g,_.b,w.opacity*y*R);for(let T=1;T<S;T+=1.5)this.standing.add(b.x,T,b.z,.3,u,_.r,_.g,_.b,w.beam*y*R*(.6+.4*Math.sin(T*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(b=>Math.hypot(b.x-c.x,b.z-c.z)<=d.pickRadius)){const b=a.creatures[o.stack[o.stack.length-1]],E=this.colours.get(b.species),_=Fd(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+b.level*.8,this.uv(this.slotOf(b.species,b.level)),_?1:E.r,_?.1:E.g,_?.1:E.b,.22)}for(const b of this.fizzles){const E=1-(e-b.at)/.7;this.flat.add(b.x,0,b.z,3*(1+(1-E)*.6),u,1,.15,.1,E)}const A=[...o.stack,...o.placed.map(b=>b.id)];for(const b of A){const E=a.creatures[b],_=this.colours.get(E.species);if(!_)continue;const S=Nm(o,b,c.x,c.z);f.rim&&this.flat.add(E.x,0,E.z,1.8,u,_.r,_.g,_.b,.35);const R=x.get(b)??new W(S.x,.2,S.z);if(f.sparks){const L=Math.max(.5,f.sparkEvery),O=(e+b*.618%1*L)%L;if(O<.7){const I=1-O/.7;this.standing.add(R.x+(E.x-R.x)*I,R.y+(.6-R.y)*I+Math.sin(I*Math.PI)*1.2,R.z+(E.z-R.z)*I,.35,u,_.r,_.g,_.b,1)}}const T=Math.hypot(E.x-S.x,E.z-S.z);if(f.thread&&T>d.length*.85){const L=Math.min(1,(T-d.length*.85)/d.length),O=Math.min(60,Math.floor(T/1.2)),I=Math.min(f.threadArcMax,f.threadArc*T);for(let U=1;U<O;U++){const B=(U+1-e*2%1)/O;B>=1||this.standing.add(R.x+(E.x-R.x)*B,R.y+(.5-R.y)*B+Math.sin(B*Math.PI)*I,R.z+(E.z-R.z)*B,.22,u,_.r,_.g,_.b,.25+.75*L)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=r.witch,f=(w,y,A,b)=>{this.v.set(y,A,b).project(t),w.style.left=`${(this.v.x+1)/2*i}px`,w.style.top=`${(1-this.v.y)/2*s}px`},d=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),f(o,c.x-1.2,ur(c,r.tuning)+2.2,c.z));return}const p=r.creatures[a.id];if(f(o,c.x-1.2,ur(c,r.tuning)+2.2,c.z),f(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(d,Le(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const m=Math.floor(a.t/Fm(p,r.tuning)),M=Math.min(1,a.t/a.total),x=(w,y)=>w[Math.floor(Le(a.id,y,5)*w.length)%w.length],g=[4,2,0][Math.min(2,p.level)],v=Math.round(g+(4-g)*M);this.emoji(o,x(Q5,m-m%2)),o.classList.toggle("on",m%2===0),m>=1?this.emoji(d,x(j5[v],m-(m+1)%2)):this.say(d,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=m%2===1?"1":"0.6"}}const tw=[1,3,5,7,9],Rf=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function nw(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=Rf(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),c=n-h*o,f=Rn(s.duty*t,0,1),u=Le(e,h,311)<f?an(c/Math.max(.001,s.fadeIn))*an((o-c)/Math.max(.001,s.fadeOut)):0,p=Math.floor(c/a),m=tw.filter(y=>y<=s.maxCount),M=m[Math.floor(Le(e,h*64+p,313)*m.length)%m.length]??1,x=e%97*.37,g=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+x)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+x*2),w=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:g,open:v,hue:w}}const iw=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,sw=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,kr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],rw=n=>{const e=(n%1+1)%1*kr.length,t=Math.floor(e),i=e-t,s=kr[t%kr.length],r=kr[(t+1)%kr.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class aw{constructor(e,t){this.game=t,this.mesh=new ih(this.geo,new xt({vertexShader:iw,fragmentShader:sw,transparent:!0,depthWrite:!1,blending:Ri})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Zt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=Rf(r),h=o*a.blockBars,c=[],f=[],d=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const m=nw(e,u.seed,1,r),M=e-u.ready,x=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,g=Math.max(m.on,x),v=x>m.on?a.maxCount:m.count;if(g<=.01)continue;const w=a.spread*Math.PI/180*m.open;for(let y=0;y<v;y++){const A=v===1?0:y/(v-1)-.5,b=a.maxTilt*Math.PI/180,E=Math.max(-b,Math.min(b,A*w+m.sweep)),_=Math.sin(E),S=Math.cos(E),R=-.15*Math.cos(E*3+u.seed),T=rw(m.hue+y*.07),L=a.opacity*g*p;c.push(u.x,u.y,u.z,u.x+_*a.length,u.y+S*a.length,u.z+R*a.length),f.push(...T,L,...T,L),d.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(f.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new Pn(this.pos,3).setUsage(rr)),this.geo.setAttribute("aCol",new Pn(this.col,4).setUsage(rr)),this.geo.setAttribute("aU",new Pn(this.u,1).setUsage(rr))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(f),this.u.set(d);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*ow(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(g,v)=>{if(g<o.minX||g>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const w=n.areaAt(g,v).cell;return`${w[0]},${w[1]}`},c=`${e[0]},${e[1]}`,f=Math.ceil(2*r/a),d=s.x-r,u=s.z-r,p=[];for(let g=0;g<=f;g++){for(let v=0;v<=f;v++)p.push(h(d+v*a,u+g*a));yield}const m=new Set,M=Math.max(1,Math.round(a/t)),x=a/M;for(let g=0;g<f;g++,yield)for(let v=0;v<f;v++){const w=[p[g*(f+1)+v],p[g*(f+1)+v+1],p[(g+1)*(f+1)+v],p[(g+1)*(f+1)+v+1]];if(!w.includes(c)||w.every(A=>A===c))continue;const y=[];for(let A=0;A<=M;A++)for(let b=0;b<=M;b++)y.push(h(d+v*a+b*x,u+g*a+A*x));for(let A=0;A<=M;A++)for(let b=0;b<=M;b++){const E=y[A*(M+1)+b],_=d+v*a+b*x,S=u+g*a+A*x;for(const[R,T]of[[1,0],[0,1]]){if(b+R>M||A+T>M)continue;const L=y[(A+T)*(M+1)+b+R];if(E===L||E!==c&&L!==c)continue;const O=_+R*x*.5,I=S+T*x*.5,U=`${Math.round(O*4)},${Math.round(I*4)}`;m.has(U)||(m.add(U),i.push({x:O,z:I,other:E===c?L:E}))}}}}const lw=`
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
}`,cw=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${mi}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class hw{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new $r(this.geo,new xt({vertexShader:lw,fragmentShader:cw,uniforms:{...ot,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Ri})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Zt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const f=e.map.siteOf(c.cell[0],c.cell[1]),d=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=d?(d.x+f.x)/2:f.x,p=d?(d.z+f.z)/2:f.z,m=e.map.areaSize*1.6,M=e.tuning.party.transition,x=hr(Rt[e.map.typeOf(c.cell[0],c.cell[1])].creature),g={points:[],colour:new lt(x[0]/255,x[1]/255,x[2]/255),on:(v,w)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,w-p)/m)*M,done:!1};this.areas.set(h,g),this.jobs.push({key:h,gen:ow(e.map,c.cell,t.step,g.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(r.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new bt(r,3)),this.geo.setAttribute("aColour",new bt(a,3)),this.geo.setAttribute("aSpark",new bt(o,2))}}const Bt=40,tr=4;function Cf(n,e,t,i,s,r){const a=n.set(s,1,r).project(e),o=Math.max(Math.abs(a.x),Math.abs(a.y)),h=a.z<1?Math.min(1,Math.max(0,(o-.9)/.25)):1;let c=a.x,f=a.y;a.z>=1&&(c=-c,f=-f);const d=1/Math.max(Math.abs(c)/.84,Math.abs(f)/.76,1e-6);return{show:h,sx:(c*d+1)/2*t,sy:(1-f*d)/2*i,angle:Math.atan2(-f,c)}}class Lf{canvas=document.createElement("canvas");label=document.createElement("div");g;img;constructor(e){this.canvas.width=this.canvas.height=Bt,Object.assign(this.canvas.style,{position:"fixed",width:`${Bt*tr}px`,height:`${Bt*tr}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none"}),Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:"bold 12px monospace",color:"#fff",textShadow:"0 1px 0 #000, 1px 0 0 #000",transform:"translate(-50%, 0)"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData(Bt,Bt)}hide(){this.canvas.style.display="none",this.label.style.display="none"}place(e,t){this.canvas.style.display="block",this.canvas.style.left=`${e-Bt*tr/2}px`,this.canvas.style.top=`${t-Bt*tr/2}px`}clear(){this.img.data.fill(0)}dot(e,t,i,s){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=Bt||t>=Bt||s<=.02)return;const r=(t*Bt+e)*4;this.img.data[r+3]>=s*255||this.img.data.set([i[0],i[1],i[2],Math.round(Math.min(1,s)*255)],r)}flush(){this.g.putImageData(this.img,0,0)}}const uw=[[255,111,207],[95,232,255],[255,226,92]];class dw{cue;v=new W;constructor(e){this.cue=new Lf(e)}update(e,t,i,s,r,a,o,h,c,f){const d=Cf(this.v,e,t,i,s,r),u=this.cue;if(d.show<=.01){u.hide();return}const p=Math.hypot(s-a,r-o),m=Math.max(.35,Math.min(1,1-p/900));u.place(d.sx,d.sy),u.clear();const M=h*c/60,x=M-Math.floor(M),g=Math.cos(-d.angle),v=Math.sin(-d.angle);for(let w=0;w<Bt;w++)for(let y=0;y<Bt;y++){const A=(y-Bt/2+.5)*g-(w-Bt/2+.5)*v,b=(y-Bt/2+.5)*v+(w-Bt/2+.5)*g,E=A-11,_=Math.hypot(E,b);if(!(Math.abs(Math.atan2(b,-E))>.75))for(let R=0;R<3;R++){const T=(4+R*4+x*4)*(.75+.25*m);Math.abs(_-T)<.62&&u.dot(y,w,uw[R],d.show*m*(1-(R+x)/3.2))}}u.flush(),u.label.style.display=f?"block":"none",f&&(u.label.textContent=`${Math.round(p)} m`,u.label.style.left=`${d.sx}px`,u.label.style.top=`${d.sy+Bt*tr/2-18}px`)}}const fw=["  ####   "," ######  "," ####### ","#########","####r####","###rrr###","####r####","###r#r###","#########","#########","#########"," ####### ","#########","#########"];class pw{cue;v=new W;constructor(e){this.cue=new Lf(e)}update(e,t,i,s,r,a,o,h,c){const f=this.cue;if(!s){f.hide();return}const d=Cf(this.v,e,t,i,s.x,s.z);if(d.show<=.01){f.hide();return}f.place(d.sx,d.sy),f.clear();const u=o*h/60,p=Math.pow(.5+.5*Math.cos(u%1*Math.PI*2),2)*(.5+.5*c),m=[s.colour.x*255,s.colour.y*255,s.colour.z*255],M=[150,150,165],x=Bt/2-4,g=Bt/2-8;fw.forEach((v,w)=>[...v].forEach((y,A)=>{y==="#"?f.dot(x+A,g+w,M,d.show*.95):y==="r"&&f.dot(x+A,g+w,m.map(b=>Math.min(255,b*(.7+.6*p))),d.show)}));for(let v=0;v<Bt;v++)for(let w=0;w<Bt;w++){const y=Math.hypot(w-Bt/2+.5,v-Bt/2+.5),A=11+p*3;Math.abs(y-A)<.6&&f.dot(w,v,m,d.show*(.45+.55*p))}for(let v=0;v<4;v++)for(let w=-v;w<=v;w++){const y=17-v,A=Bt/2+Math.cos(d.angle)*y-Math.sin(d.angle)*w,b=Bt/2-Math.sin(d.angle)*y-Math.cos(d.angle)*w;f.dot(A,b,m,d.show)}f.flush(),f.label.style.display="block",f.label.textContent=`${Math.round(Math.hypot(s.x-r,s.z-a))} m`,f.label.style.color=`rgb(${m.map(Math.round).join(",")})`,f.label.style.left=`${d.sx}px`,f.label.style.top=`${d.sy+Bt*tr/2-22}px`}}class mw{constructor(e,t){this.map=t;const i=t.n,s=Math.max(4,Math.floor(220/i));this.canvas.width=this.canvas.height=i*s,Object.assign(this.canvas.style,{position:"fixed",left:"12px",bottom:"48px",imageRendering:"pixelated",border:"1px solid #3a2f5c",background:"rgba(8,6,18,.85)",zIndex:"3",display:"none",pointerEvents:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}map;on=!1;canvas=document.createElement("canvas");g;key="";update(e,t,i){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;const s=this.map,r=s.n,a=this.canvas.width/r,o=`${e.wave}|${e.areas.size}|${Math.round(t/20)},${Math.round(i/20)}`;if(o===this.key)return;this.key=o;const h=[];zc(e,s,void 0,h);const c=this.g,f=new Set(h.map(p=>`${p[0]},${p[1]}`)),d=e.next?`${e.next[0]},${e.next[1]}`:"";c.clearRect(0,0,r*a,r*a);for(let p=0;p<r;p++)for(let m=0;m<r;m++){const M=`${m},${p}`,x=e.areas.get(M);c.fillStyle=M===`${s.centreCell[0]},${s.centreCell[1]}`?"#ff6fcf":x?`hsl(${300-Math.min(200,x.wave*12)},80%,55%)`:M===d?"#ffe25c":f.has(M)?"#6a5a20":"#1d1830",c.fillRect(m*a+.5,p*a+.5,a-1,a-1)}const u=s.areaSize;c.fillStyle="#fff",c.fillRect(Math.floor(t/u*a)-1,Math.floor(i/u*a)-1,3,3)}}class gw{canvas=document.createElement("canvas");g;v=new W;d=new W;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(T,L)=>{const O=this.v.set(T,0,L).project(e);return[(O.x+1)/2*t,(1-O.y)/2*i,O.z]};a.clearRect(0,0,t,i);const h=(T,L,O,I,U)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${U})`,a.lineWidth=1,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke()},c=(T,L,O,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(T,L+1,O+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(T,L,O)},f=this.ground(e,0,-.98),d=this.ground(e,0,.98)??this.ground(e,0,.3);if(!f||!d)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),m=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,x=Math.min(u.x,m.x),g=Math.max(p.x,M.x),v=Math.min(d.z,m.z),w=f.z;for(let T=Math.ceil(x/10)*10;T<=g;T+=10){const L=o(T,v),O=o(T,w);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}for(let T=Math.ceil(v/10)*10;T<=w;T+=10){const L=o(x,T),O=o(g,T);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}const y=i-6;h(0,y,t,y,.6);for(let T=Math.ceil((u.x-s)/2)*2;s+T<=p.x;T+=2){const L=o(s+T,f.z)[0],O=T%10===0;h(L,y,L,y-(O?10:5),.6),O&&c(`${T}`,L,y-18,"center")}const A=6;h(A,0,A,i,.6);for(let T=Math.ceil((r-f.z)/2)*2;r-T>=d.z-1e-6&&T<400;T+=2){const L=o(s,r-T)[1],O=T%10===0;L<0||L>i||(h(A,L,A+(O?10:5),L,.6),O&&c(`${T}`,A+14,L,"left"))}const b=o(s,r),E=this.ground(e,-1,1-b[1]/i*2),_=this.ground(e,1,1-b[1]/i*2),S=E&&_?Math.round(_.x-E.x):0,R=Math.round(e.position.y);c(`camera ${R} m up · ${S} m across at the witch`,t-12,i-24,"right")}}const xw=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Mw=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${mi}
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
}`;class vw{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new xt({vertexShader:xw,fragmentShader:Mw,uniforms:{...ot,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?Ti:sr}),this.mesh=new Gt(new Xn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const _w=`
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
}`,bw=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${mi}
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
}`;class yw{mesh;geo=new rh;attr;capacity=0;constructor(e,t=!0){const i=new Xn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new xt({vertexShader:_w,fragmentShader:bw,uniforms:{...ot,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:vo,blendSrc:Gc,blendDst:Wc}:{}});this.mesh=new Gt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Ps(new Float32Array(this.capacity*4),4),this.attr.setUsage(rr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const ww=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function Sw(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}function Ew(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class Aw{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=ww(s),this.renderer=new Uy({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=qr,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new Hn(s.camera.fov,1,1,900),this.post=new R5(this.renderer,s),this.scene.background=new lt(723478),g5({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient,s.glowFalloff,s.tone.moon),ot.uGlowPower.value=s.glowPower,this.assets=new m5(i,t.seed,s.pixelSize),this.ground=new v5(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new yw(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";ot.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new vw(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new au,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ot.uHazeRange.value.set(s.haze.near,s.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new y5(t.map,i,this.mpp,s.pathFade.metres).group);const o=s.occlusion;this.witchBatch=new $n(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ot.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Ct.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new $n(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.minimap=new mw(document.body,t.map),this.markerArt=new U5(i,s),this.markerBatch=new $n(this.markerArt.atlas,this.mpp,{solid:!0}),this.scene.add(...this.markerBatch.meshes,this.markerFx.group),this.stoneBatch=new $n(this.assets.stones,this.mpp,{solid:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,c=[],f=t.tuning.dancefloor.stones;for(let u=0;u<f;u++){const p=u/f*Math.PI*2+.3;c.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(c),this.propBatch=new $n(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new N5(this.assets.soundsystems,this.mpp),this.strings=new $5(this.scene,t),this.leashView=new ew(this.scene,t),this.lasers=new aw(this.scene,t),this.borders=new hw(this.scene,t),this.soundBatch=new $n(this.assets.soundsystems,this.mpp,{solid:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new O5(t.map,s,Ct,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const d=s.fx==="smooth"?new xt({transparent:!0,depthWrite:!1,blending:vo,blendSrc:Gc,blendDst:Wc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new xt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Gt(new Xn(1.4,.7).rotateX(-Math.PI/2),d),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new au;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;markerArt;markerBatch;markerFx=new z5;markerCache={wave:-1,n:-1,list:[]};seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new dw(document.body);nextStone=new pw(document.body);minimap;rulers=new gw(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;quick=!1;ghosts=[];ghostLines=null;now=0;stats={forestMs:0,forestMissing:0,sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Ct.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);const e=this.game.map,t=this.game.witch,i=new Map;for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=e.siteOf(r,s),o=e.typeOf(r,s),h=Math.hypot(a.x-t.x,a.z-t.z);i.get(o)<=h||i.set(o,h)}for(let s=0;s<Rt.length;s++)i.has(s)||i.set(s,1/0);if(this.prepared=!0,!this.quick){for(const[s]of[...i].sort((r,a)=>r[1]-a[1]))this.assets.prefetchType(s);for(const s of Rt)this.assets.creatureArt(s.creature)}}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes),this.prepared&&(s.appearU.value=0,this.appearing.set(s,performance.now())))),s}appearing=new Map;prepared=!1;easeAppearing(){const e=performance.now();for(const[t,i]of this.appearing){const s=Math.min(1,(e-i)/800);t.appearU.value=s*s*(3-2*s),s>=1&&this.appearing.delete(t)}}frustum=new oo;frustumTo=new oo;cullCam=new Hn;box=new as;m4=new Ft;v3=new W;v3b=new W;v3c=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=hd({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Jn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const f of[-1,1])for(const d of[-1,1]){const u=this.v3.set(f,d,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let m=u.y<-.001?(p-h.y)/u.y:1/0;m>0||(m=1/0),m=Math.min(m,c),s.push([h.x+u.x*m,h.z+u.z*m])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+r;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,c,f]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+f),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[c,...f]=a.split("|"),[d,u,p]=h??f.map(Number),m=this.game.witch;!(e==="placed"&&Math.hypot(+d-m.x,+u-m.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+d,+u,+p)&&this.pops.push(`${o} ${c} ${(+d).toFixed(0)},${(+u).toFixed(0)}`)};if(e!=="placed"||!this.appearing.size)for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastView=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=Gh(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,f=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,d=this.budget.radius,u=Math.min(i.haze.far,d+r/2),p=Math.abs(d-this.lastBuild.radius)>=r/3,m=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!f&&!m&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:d},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,r),x=(M.minX+M.maxX)/2,g=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2;this.lastView={x,z:g,half:v};const w=[],y=ot.uMoonDir.value,A=-y.x/Math.max(.2,y.y),b=-y.z/Math.max(.2,y.y),E=new Map,_=(F,te)=>{let ae=E.get(F);ae||E.set(F,ae=[]),ae.push(te)},S=this.mpp,R=a.angle*Math.PI/180,T=Ct.uUp.value.dot(this.v3.set(0,Math.cos(R),-Math.sin(R))),L=Ct.uUp.value,O=(F,te,ae,pe)=>{const _e=(ae.pad??0)*pe;return{x:F-L.x*_e,y:-L.y*_e,z:te-L.z*_e}};let I=0,U=0;for(const F of t.forest.treesNear(x,g,v)){const te=this.assets.typeArt(F.type);if(!te||!te.layout.big.length)continue;const ae=te.atlas.frames,pe=te.layout.big[Ew(te.layout.bigWeight,F.variant)],_e=ae[pe.top??pe.bot];if(!this.inView(F.x,F.z,_e.w*S,_e.h*S,r,u))continue;const Pe=_e.h*S,q=i.treeCap,ee=Pe>q.from?(q.from+(Pe-q.from)*q.keep)/Pe:1,k=this.mark("tree",F.x,F.z,Pe*ee),ce=O(F.x,F.z,ae[pe.bot],S*ee);_(F.type,{...ce,frame:ae[pe.bot],flip:F.flip,fresh:k,scale:ee,cut:pe.top!==null?te.cut.get(pe.bot):void 0}),pe.top!==null&&_(F.type,{...ce,frame:ae[pe.top],flip:F.flip,top:!0,fresh:k,scale:ee});const G=_e.w*S,$=_e.h*S*(pe.top===null?.2:.6);i.shadows.trees&&w.push({x:F.x+A*$,z:F.z+b*$,w:G*.8,d:G*.45,scenery:!0}),I++}const B=(F,te,ae)=>{for(const pe of te){const _e=this.assets.typeArt(pe.type);if(!_e)continue;const Pe=ae(_e.layout);if(!Pe.length)continue;const q=Pe[pe.variant%Pe.length],ee=_e.atlas.frames,k=ee[q.bot],ce=ee[q.top??q.bot],G=F==="setpiece"?i.setPieceScale:1,$=S*G;let fe=pe.x,he=pe.z;if(q.origin){const Ie=pe.flip?k.w-q.origin.x:q.origin.x;fe+=(k.w/2-Ie)*$,he+=(k.h-(k.pad??0)-q.origin.y)*$*T/Math.max(.2,Math.sin(R))}if(!this.inView(fe,he,ce.w*$,ce.h*$,r,u))continue;const J=this.mark(F,pe.x,pe.z,ce.h*$),le=O(fe,he,k,$);_(pe.type,{...le,frame:k,flip:pe.flip,fresh:J,scale:G}),q.top!==null&&_(pe.type,{...le,frame:ee[q.top],flip:pe.flip,top:!0,fresh:J,scale:G});const ve=k.w*$*.3;F!=="setpiece"&&w.push({x:pe.x,z:pe.z-ve*.4,w:k.w*$*.8,d:ve,scenery:!0}),U++}};B("small",t.forest.bushesNear(x,g,v),F=>F.small),B("small",t.forest.bedsNear(x,g,v),F=>F.small),B("wall",t.forest.wallsNear(x,g,v),F=>F.walls.map(te=>({bot:te,top:null}))),B("setpiece",t.forest.setPiecesNear(x,g,v),F=>F.set===null?[]:[F.set]);const Y=this.assets.decorArt(),se=[];if(Y)for(const F of t.forest.decorNear(x,g,v)){const te=Y.families[F.family];if(!te?.length)continue;const ae=te[F.variant%te.length],pe=Y.atlas.frames,_e=pe[ae.bot],Pe=pe[ae.top??ae.bot];if(!this.inView(F.x,F.z,Pe.w*S,Pe.h*S,r,u))continue;const q=this.mark("decor",F.x,F.z,Pe.h*S),ee=O(F.x,F.z,_e,S);se.push({...ee,frame:_e,flip:F.flip,fresh:q}),ae.top!==null&&se.push({...ee,frame:pe[ae.top],flip:F.flip,top:!0,fresh:q});const k=_e.w*S*.3;w.push({x:F.x,z:F.z-k*.4,w:_e.w*S*.8,d:k,scenery:!0}),U++}const K=this.assets.pathPieceArt();if(K){const F=[],te=Ct.uRight.value;for(const ae of t.map.paths.pieces){if(Math.abs(ae.x-x)>v||Math.abs(ae.z-g)>v)continue;const pe=K.byId[ae.id];if(!pe)continue;const _e=K.atlas.frames[pe.frame],Pe=(pe.originX-_e.w/2)*S,q=Math.max(0,_e.h-(_e.pad??0)-pe.originY)*S,ee=O(ae.x-te.x*Pe,ae.z-te.z*Pe+q*T/Math.max(.2,Math.sin(R)),_e,S);if(!this.inView(ee.x,ee.z,_e.w*S,_e.h*S,r,u))continue;F.push({...ee,frame:_e,flip:!1,fresh:this.mark("pathpiece",ae.x,ae.z,_e.h*S)});const k=_e.w*S*.25;w.push({x:ae.x,z:ae.z,w:_e.w*S*.7,d:k,scenery:!0}),U++}this.batchFor(this.decorBatches,"pieces",()=>new $n(K.atlas,S,{scenery:!0,fade:!0}))?.set(F)}const re=this.assets.relicArt();if(re){const F=this.camera.getWorldDirection(this.v3b),te=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),ae=Ct.uUp.value,pe=Ct.uRight.value,_e=ae.dot(te)/Math.max(.2,-F.y),Pe=[],q=[],ee=(k,ce,G,$)=>{const fe=re.atlas.frames[k.frame],he=k.decal?0:fe.pad??0,J=(k.originX-fe.w/2)*S*($?-1:1),le=Math.max(0,fe.h-he-k.originY)*S*_e,ve=k.decal?{x:ce-pe.x*J,y:0,z:G-pe.z*J+le}:O(ce-pe.x*J,G-pe.z*J+le,fe,S);this.inView(ve.x,ve.z,fe.w*S,fe.h*S,r,u)&&((k.decal?q:Pe).push({...ve,frame:fe,flip:$,fresh:this.mark("relic",ce,G,fe.h*S)}),k.decal||w.push({x:ce,z:G,w:fe.w*S*.6,d:fe.w*S*.22,scenery:!0}),U++)};if(re.modern.length)for(const k of t.forest.relicsNear(x,g,v))ee(re.modern[k.variant%re.modern.length],k.x,k.z,k.flip);for(const k of t.map.grounds)if(!(Math.abs(k.x-x)>v+k.r||Math.abs(k.z-g)>v+k.r))for(const ce of re.layouts[k.kind]??[]){const G=re.byId[ce.id];G&&ee(G,k.x+(k.flip?-ce.x:ce.x),k.z+ce.z,k.flip)}this.batchFor(this.decorBatches,"relics",()=>new $n(re.atlas,S,{scenery:!0,fade:!0}))?.set(Pe),this.batchFor(this.decorBatches,"decals",()=>{const k=new $n(re.atlas,S,{scenery:!0,flat:!0});for(const ce of k.meshes)ce.renderOrder=-.5,ce.material.depthWrite=!1;return k})?.set(q)}Y&&this.batchFor(this.decorBatches,"all",()=>new $n(Y.atlas,S,{scenery:!0,fade:!0}))?.set(se);for(const[F,te]of this.typeBatches)E.has(F)||te.set([]);for(const[F,te]of E)this.batchFor(this.typeBatches,F,()=>{const pe=this.assets.typeArt(F);return pe&&new $n(pe.atlas,S,{scenery:!0,fade:!0})})?.set(te);{const F=t.map.treehouse;w.push({x:F.x,z:F.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=I,this.stats.bushes=U,this.shadowList=w}drawMarkers(e){const t=this.game,i=t.tuning,s=i.runeMarkers,r=t.witch,a=i.haze.far+20,o=this.markerCache;(o.wave!==t.party.wave||o.n!==t.party.areas.size)&&(o.wave=t.party.wave,o.n=t.party.areas.size,o.list=Hm(t.party,t.map));const h=Ol(t.party,t.map,e),c=t.party.paused?0:h.gone,f=e*i.beat.bpm/60,d=Math.pow(.5+.5*Math.cos(f*Math.PI*2),2),u=[],p=[],m=[],M=[],x=[],g=s.awakeStyle,v=g!=="beam",w=g!=="column",y=s.scale,A=(E,_,S,R,T=0)=>{const L=this.markerArt.atlas.frames[this.markerArt.frame(S,R)];return this.inView(E,_,L.w*this.mpp*y,L.h*this.mpp*y,6)?(u.push({x:E,y:T,z:_,frame:L,flip:!1,scale:y,fresh:this.mark("marker",E,_,L.h*this.mpp*y)}),!0):!1},b=[];for(const E of o.list){const _=Math.hypot(E.x-r.x,E.z-r.z);if(_>a)continue;const S=Rt[t.map.typeOf(E.cell[0],E.cell[1])].creature,R=this.markerArt.colour.get(S),T=E.awake?1+Math.round(Math.min(1,d*(.4+.6*c))*(Vr-2)):0;A(E.x,E.z,S,T);const L=(this.markerArt.height.get(S)??0)*this.mpp*y,O=s.awake,I=s.dormant,U=E.awake?(O.light+O.lightBuild*c)*(.55+.45*d):I.light;if(_<s.lightRange&&b.push({d:_,l:{x:E.x,y:.5,z:E.z+1.5,reach:E.awake?O.reach:I.reach,rgb:R,strength:U}}),(!E.awake||v)&&m.push({x:E.x,z:E.z,colour:R,strength:E.awake?O.beam*(.6+.4*d)*(1+c):I.beam,base:L}),E.awake&&w&&x.push({x:E.x,z:E.z,colour:R,strength:s.laser.opacity*(.55+.45*d)*(.7+.6*c),width:s.laser.width,height:s.laser.length,base:L}),E.awake){const B=Math.round(O.motes+O.moteBuild*c);for(let Y=0;Y<B;Y++){const se=(E.cell[0]*31+E.cell[1]*17+Y*7.3)%1||.37*(Y+1)%1,K=(e*(.25+.15*(Y*.618%1))+Y/B)%1,re=Y*2.399+E.cell[0];M.push({x:E.x+Math.cos(re)*(.6+K*1.4),y:.6+K*7,z:E.z+Math.sin(re)*(.6+K*1.4),colour:R,alpha:(1-K)*(.5+.5*d)*(.6+se*.4)})}}}for(const E of t.party.areas.values()){if(!E.soundsystem||e-E.at>s.flare.time||e<E.at)continue;const _=(e-E.at)/s.flare.time,S=Rt[t.map.typeOf(E.cell[0],E.cell[1])].creature,R=this.markerArt.colour.get(S),T=t.map.soundsystemSpot(E.cell[0],E.cell[1]);A(T.x,T.z,S,Vr-1,-_*_*4*y),b.push({d:0,l:{x:T.x,y:2.5,z:T.z,reach:s.awake.reach*1.5,rgb:R,strength:s.flare.light*(1-_)}})}b.sort((E,_)=>E.d-_.d);for(const E of b.slice(0,8))p.push(E.l);return this.markerBatch.set(u),this.markerFx.update(m,s.beamHeight,Po(r),M,x),p}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const f=c.leashed?this.assets.partyArt(c.species,c.id,hr(c.species)):void 0,d=f??this.assets.creatureArt(c.species),u=f?`party-${c.id}`:c.species;if(!d)continue;r.set(u,d);const p=d.atlas.frames[d.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const m=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=s.get(u);M||s.set(u,M=[]);const x=(e/o+c.id%4*.25)*Math.PI,g=c.leashed?Math.abs(Math.sin(x))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(x*.5)*.12:0;M.push({x:c.x+v,y:g,z:c.z,frame:p,flip:c.facing<0,fresh:m}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,f]of this.creatureBatches)s.has(c)||f.set([]);for(const[c,f]of s)this.batchFor(this.creatureBatches,c,()=>{const u=r.get(c);return u&&new $n(u.atlas,this.mpp,{solid:!0})})?.set(f);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=Le(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:c,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(lr,this.game.tuning.lightBudget),r=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,f)=>c.d-f.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=ot;let h=0;for(const{l:c,d:f}of r.slice(0,s)){const d=Math.min(1,Math.max(0,(a-f)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*d),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new ih(new Zt,new lf({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Ct.uRight.value,i=Ct.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,m)=>[a.x+t.x*p*o+i.x*m*a.h,t.y*p*o+i.y*m*a.h,a.z+t.z*p*o+i.z*m*a.h],c=h(-1,0),f=h(1,0),d=h(1,1),u=h(-1,1);s.push(...c,...f,...f,...d,...d,...u,...u,...c,...c,...d)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new bt(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=Ct.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),c=i[0].pad??0,f=Math.max(0,i[0].h-c-t.base.y)*r,d=c*r,u=s.x-(t.base.x-i[0].w/2)*r,p=s.z+f*h/Math.max(.2,Math.sin(o)),m={x:u-a.x*d,y:-a.y*d,z:p-a.z*d};return this.treehouseBatch.set([{...m,frame:i[0],flip:!1},{...m,frame:i[1],flip:!1,top:!0}]),m}render(e,t=!0){const i=this.game,s=i.tuning,r=Gh(i);if(t){const J=performance.now();this.lastReal&&(this.budget=Sw(this.budget,(J-this.lastReal)/1e3,s)),this.lastReal=J}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),ot.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new W(0,Math.cos(a),-Math.sin(a)),c=new W(r.tx,r.ty,r.tz),f=c.dot(h),d=c.x;c.addScaledVector(h,Math.round(f/o)*o-f),c.x+=Math.round(d/o)*o-d;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=s.spriteTilt;Ct.uUp.value.set(0,1,0).lerp(h,p).normalize(),Ct.uFacing.value.crossVectors(Ct.uRight.value,Ct.uUp.value).normalize();const m=Po(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,ur(i.witch,s)*.5,i.witch.z).project(this.camera);if(Ct.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-m),Math.max(1,M.edge*this.width*(1-m))),Ct.uTopFade.value=m,Ct.uTrunkFade.value.set(s.trunkFade.metres,this.mpp),!s.glowFixed){const J=i.witch.x,le=i.witch.z,ve=Ct.uRight.value,Ie=this.v3.set(J,0,le).project(this.camera).x,Ve=this.v3.set(J+ve.x*10,0,le+ve.z*10).project(this.camera).x,Ke=Math.max(.001,Math.abs(Ve-Ie)*.5*this.width/10);ot.uGlowR.value=(.5*M.screenFraction+M.edge)*this.width/Ke*s.glowToCutout}Ct.uDebugCull.value=this.debugCull?1:0;const g=i.witch,v=ur(g,s);ot.uGlowPos.value.set(g.x,v+s.glowHeight,g.z),ot.uHazeCentre.value.set(g.x,g.z),this.updateSources(e);const w=this.partyView.update(i,e,(J,le,ve,Ie)=>this.inView(J,le,ve,Ie,4),()=>!1);this.soundBatch.set(w.items),this.ground.setSweeps(w.sweeps),this.lasers.update(e,w.playing,g.x,g.z);{const J=Ct,le=s.party,ve=[...i.party.areas.values()].map(Ie=>({a:Ie,s:i.map.siteOf(Ie.cell[0],Ie.cell[1])})).sort((Ie,Ve)=>Math.hypot(Ie.s.x-g.x,Ie.s.z-g.z)-Math.hypot(Ve.s.x-g.x,Ve.s.z-g.z)).slice(0,16);ve.forEach(({a:Ie,s:Ve},Ke)=>{const Ne=Ie.wave===0?1:Math.min(1,Math.max(0,(e-Ie.at)/Math.max(.01,le.transition)));J.uParty.value[Ke].set(Ve.x,Ve.z,i.map.areaSize*.85,Ne);const Ge=hr(Rt[i.map.typeOf(Ie.cell[0],Ie.cell[1])].creature);J.uPartyCol.value[Ke].set(Ge[0]/255,Ge[1]/255,Ge[2]/255)}),J.uPartyCount.value=ve.length,J.uUplight.value.set(le.uplight.strength,le.uplight.pulse,le.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const y=this.assets.treehouse,A=y.atlas.frames[0],b=this.placeTreehouse(r.angle),E=Ct,_=(J,le)=>{const ve=E.uRight.value,Ie=E.uUp.value,Ve=(J-A.w/2)*this.mpp,Ke=(A.h-le)*this.mpp;return{x:b.x+ve.x*Ve+Ie.x*Ke,y:b.y+ve.y*Ve+Ie.y*Ke,z:b.z+ve.z*Ve+Ie.z*Ke}},S=y.lights.filter(J=>J.kind==="lantern"||J.kind==="window").slice(0,2).map(J=>({..._(J.x,J.y),reach:s.treehouse.lightReach,rgb:new W(J.rgb[0]/255,J.rgb[1]/255,J.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+J.x))})),R=this.drawMarkers(e);this.setLights([this.dancefloor.update(e,this.ground),...w.lights,...S,...R,...this.forestLights],g.x,g.z),ot.uTime.value=e,this.mist?.follow(r.tx,r.tz);const T=Math.sin(e*2.4)*.12,L=g.mode==="rising"&&g.lift<.9,O=g.mode==="descending"&&g.lift>.1;let I=L||O?(L?8:12)+(g.away?2:0)+Math.floor(e*7)%2:g.lean?6+(g.away?1:0):(g.away?3:0)+Math.floor(e*4)%3;if(!L&&!O){const J=this.assets.witchFly,le=g.away?"away":"towards";g.braking?I=J.brake[le][Math.floor(e*J.brake.fps)%J.brake[le].length]:(g.boost??0)>.7&&(I=J.fast[le][Math.floor(e*J.fast.fps)%J.fast[le].length])}const U=i.leash,B=this.assets.witchFoot,Y=g.away?"away":"towards";for(const J of U.events)J.kind==="placed"||J.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:J.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const se=this.footAct?B[this.footAct.pose].towards.length/B[this.footAct.pose].fps:0,K=!!this.footAct&&e-this.footAct.at<se+.3,re=g.mode==="ground"&&(U.talk||U.held||K)?1:0,F=Math.min(.1,Math.max(0,e-this.footTime)),te=this.foot;this.footTime=e,this.foot+=(re-this.foot)*Math.min(1,F*8),Math.abs(re-this.foot)<.01&&(this.foot=re);const ae=(J,le)=>{const ve=B[J][Y];return ve[Math.max(0,Math.min(ve.length-1,le))]};this.foot>.6?K&&this.footAct?I=ae(this.footAct.pose,Math.floor((e-this.footAct.at)*B[this.footAct.pose].fps)):U.talk?I=ae("talk",Math.floor(e*B.talk.fps)%B.talk[Y].length):I=ae("stand",Math.floor(e*B.stand.fps)%B.stand[Y].length):this.foot>.02&&(I=this.foot>=te?ae("land",Math.floor(this.foot*3)):ae("takeoff",Math.floor((1-this.foot)*3)));const pe=this.foot*this.foot*(3-2*this.foot),_e=(v+T-.4)*(1-pe),Pe=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=g.seated?1:Math.max(0,this.seatK-Pe/.6);let q=g.x,ee=g.z,k=_e;if(this.seatK>0){const J=_(y.seat.x,y.seat.y),le=this.seatK*this.seatK*(3-2*this.seatK),ve=this.camera.getWorldDirection(this.v3);q+=(J.x-ve.x*.6-q)*le,k+=(J.y-ve.y*.6-k)*le,ee+=(J.z-ve.z*.6-ee)*le,g.seated&&(I=B.sit.towards[Math.floor(e*B.sit.fps)%B.sit.towards.length])}const ce=this.assets.witch.frames[I],G=k+ce.h*this.mpp;this.witchBatch.set([{x:q,y:k,z:ee,frame:ce,flip:g.seated?!1:g.facing<0}]);{const J=(Ve,Ke,Ne)=>{const Ge=this.v3.set(Ve,Ke,Ne).project(this.camera);return[(Ge.x+1)/2*this.width,(Ge.y+1)/2*this.height]},le=J(q,k,ee),ve=J(q,G,ee),Ie=J(q+ce.w*this.mpp/2,k,ee);Ct.uWitch.value.set((le[0]+ve[0])/2,(le[1]+ve[1])/2,Math.abs(Ie[0]-le[0])+1,Math.abs(ve[1]-le[1])/2+1),Ct.uWitchDepth.value=-this.v3.set(q,this.seatK>0?k:v,ee).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(q,.03,ee),this.shadow.scale.setScalar((1-.5*Po(g))*(1-this.seatK)+.001),this.refresh(),this.easeAppearing();const $=this.lastView;$&&(this.stats.forestMissing=i.forest.prefetch($.x+g.vx*2,$.z+g.vz*2,$.half+64,4)),this.stats.forestMs=i.forest.buildMs,i.forest.buildMs=0,this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,g.x,g.z);const fe=i.map.dancefloor;this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,fe.x,fe.z,g.x,g.z,e,s.beat.bpm,this.debugReadouts),this.minimap.update(i.party,g.x,g.z);{const J=i.party.next,le=this.canvas.clientWidth||window.innerWidth,ve=this.canvas.clientHeight||window.innerHeight;if(J){const Ie=i.map.soundsystemSpot(J[0],J[1]),Ve=Rt[i.map.typeOf(J[0],J[1])].creature,Ke=Ol(i.party,i.map,e);this.nextStone.update(this.camera,le,ve,{x:Ie.x,z:Ie.z,colour:this.markerArt.colour.get(Ve)},g.x,g.z,e,s.beat.bpm,i.party.paused?0:Ke.gone)}else this.nextStone.update(this.camera,le,ve,null,g.x,g.z,e,s.beat.bpm,0)}if(this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,G),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),g.x,g.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let he=0;for(const J of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])he+=J.dropped;he&&!this.stats.dropped&&console.warn(`view: ${he} sprite instances set but not drawn`),this.stats.dropped=he,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const Tw="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Rw="Lab default",Cw={},Lw={_readme:Tw,name:Rw,style:Cw};function Pw(n=Lw){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=n5();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function Dw(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let m=p.clientX-a,M=p.clientY-o;const x=Math.hypot(m,M);x>s&&(m*=s/x,M*=s/x),i.style.transform=`translate(${m}px, ${M}px)`;const g=Math.min(1,x/s),v=.15,w=g<v?0:(g-v)/(1-v)/Math.max(1e-6,g);e.x=m/s*w,e.y=M/s*w});const f=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",f),c.addEventListener("pointercancel",f);const d=(p,m)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),m(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const Iw=[{version:null,items:["The forest is dark again: the witch's light only reaches as far as the gap in the canopy round her, and the moonlight and twilight fill are lower","Tree trunks fade out at the top in pixel steps where the crowns are hidden, instead of ending in a flat cut","Paths, roads, tracks and streams fray out at their ends instead of stopping square","Creatures, soundsystems and the rune stones are never made see-through round the witch; only the scenery is","Each wave now wakes just one area, chosen as soon as the last one woke, bordering the party and spreading in lobes rather than a circle; its rune stone is the one that wakes","A new pixel cue at the screen's edge points to the next stone to wake, with its distance; the music cue is bigger and pixelled","Awake rune stones can show a thin laser straight up, a column of light, or both (?rune=beam|column|both)","M shows a minimap of the party's spread (debug)","Witch walks 10% faster","Leashes arc gently and their dots flow back towards you","Treetop turns are tight when you're slow; the big skid only comes at speed","The rune stones' beam and laser now rise from the top of the stone","Paths keep one look for their whole length, and run on unbroken past clearings","Every ruin, freak tree, relic, set piece and playground or sports ground is one of a kind: you'll find each at most once per map, facing either way","Stone stairs are a rare find by ravines, rocky slopes, cave mouths and stone shrines, not a path fitting","Soundsystems and set pieces stand clear of the paths"]},{version:154,items:["Nothing floats any more: trees, rocks, ruins, the treehouse and set pieces all stand on the ground, and big scenery keeps clear of the soundsystems","Fewer ruins, rocks, relics, stairs and bridges: each is a find now, not clutter","The witch's own light is a tighter pool round her that fades out within about 40 m (try ?glow=50,2.5 to tune it)","Garden walls stand in joined runs along the paths, with flower beds in rows beside them; shrine stones stand in circles; hedges, brambles and rock walls run in lines; water, reeds and boulders gather in clumps, with open ground between","The edge of the see-through hole in the treetops round the witch fades smoothly (no dither)","Big rune stones now mark where every soundsystem will come, glowing with their area's creature's sigil. The next wave's stones wake: they pulse to the beat, throw light and motes, brighter as the wave nears, and send a beam above the trees; when the party arrives the stone flares and sinks as its soundsystem appears. The random rune stones are gone"]},{version:144,items:["Points where a branch line leaves the railway"]},{version:136,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],Ow={entries:Iw},sn=new URLSearchParams(location.search);let Es=qp(sn.get("seed"));Es===null&&(Es=Math.floor(Math.random()*1e6),sn.set("seed",String(Es)),history.replaceState(null,"","?"+sn.toString()+location.hash));const Ht={...ls,bloom:{...ls.bloom},tiltShift:{...ls.tiltShift},shadows:{...ls.shadows},canopyShadow:{...ls.canopyShadow},mist:{...ls.mist},party:{...ls.party}};sn.get("shadows")==="off"&&(Ht.shadows.on=!1);sn.get("canopy")==="off"&&(Ht.canopyShadow.on=!1);sn.get("mist")==="off"&&(Ht.mist.on=!1);const Ua=sn.get("tilt");Ua==="off"?Ht.tiltShift.on=!1:(Ua==="before"||Ua==="after")&&(Ht.tiltShift.on=!0,Ht.tiltShift.where=Ua);sn.get("bloom")==="off"&&(Ht.bloom.on=!1);sn.get("moonbeams")==="on"&&(Ht.moonbeams=1);const bl=sn.get("rune");bl&&["beam","column","both"].includes(bl)&&(Ht.runeMarkers={...Ht.runeMarkers,awakeStyle:bl});const yl=sn.get("picker");yl&&["noisy","near3","near3touch","nearest"].includes(yl)&&(Ht.party.picker=yl);const cr=sn.get("glow")?.split(",").map(Number);cr&&cr[0]>0&&(Ht.glowReach=cr[0],Ht.glowFixed=!0);cr&&cr[1]>0&&(Ht.glowFalloff=cr[1]);const wl=sn.get("fx");(wl==="pixel"||wl==="smooth")&&(Ht.fx=wl);const nn=Gm(Es,Ht),Pf=[30,60,120,300,600,0];function Df(n){Ht.party.interval=n>0?n:1e9,nn.party.paused=n===0,nn.party.nextAt=nn.clock.time+Ht.party.startDelay+Ht.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let ah=Ht.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&Pf.includes(+n)&&(ah=+n)}catch{}const Sl=sn.get("wave");Sl!==null&&(ah=Sl==="off"?0:Math.max(0,+Sl||0));const Fw=document.getElementById("game"),El=Pw(),oh={viewStart:performance.now(),view:0,ready:0},Dn=new Aw(Fw,nn,{...El,pixel:Ht.pixelSize,treeSize:El.treeSize*Ht.treeHeight,crownWidth:El.crownWidth*Ht.crownWidth/Ht.treeHeight});oh.view=performance.now();Dn.debugCull=sn.get("debug")==="cull";Dn.quick=sn.get("quick")==="1";const ad=Number(sn.get("scenery"));sn.has("scenery")&&ad>0&&(Dn.sceneryFixed=ad);const wr=new S2;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),wr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),wr.touch.pauseWaves=!0});Dw(document.body,wr.touch);Dn.rulers.on=sn.has("debug");const If=()=>{Dn.rulers.on=!Dn.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&If()});window.addEventListener("keydown",n=>{n.code==="KeyM"&&!n.repeat&&(Dn.minimap.on=!Dn.minimap.on)});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),If()});const Of=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&Of.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=Of.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v171 · 0ad7cc9";const Nw=document.getElementById("news"),Uw="v171 · 0ad7cc9".split(" ")[0],kw=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);Nw.innerHTML="<b>What's new</b>"+Ow.entries.filter(n=>n.items.length).slice(0,3).map(n=>`<div>${n.version===null?`${Uw} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${kw(e)}</li>`).join("")}</ul>`).join("");const Bw=document.getElementById("seed");Bw.innerHTML=`seed <a href="?seed=${Es}">${Es}</a>`;const wc=document.getElementById("debug"),lh=document.getElementById("start"),Ff=document.getElementById("debug-buttons"),ch=document.getElementById("wave"),zw=ch.querySelector(".fill"),Hw=ch.querySelector(".label");let ns=sn.has("debug");wc.classList.toggle("on",ns);Ff.classList.toggle("on",ns);const Nf=()=>Dn.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Nf);Nf();let gr=!1;const hh=document.getElementById("progress"),Gw=hh.querySelector(".fill"),Ww=hh.querySelector(".label"),Vw=setInterval(()=>{const n=Dn.assets,e=n.done,t=e+n.pending;Gw.style.width=`${t?100*e/t:0}%`,Ww.textContent=gr?`the rest of the forest, in the background: ${e} of ${t}`:`growing the forest: ${e} of ${t}`,gr&&!n.pending&&(hh.classList.add("done"),clearInterval(Vw))},250);requestAnimationFrame(()=>setTimeout(async()=>{await Dn.prepare(),gr=!0,oh.ready=performance.now(),lh.classList.remove("loading")},0));let od=null;function Uf(){if(!gr||!nn.clock.paused)return!1;try{od??=new AudioContext,od.resume()}catch{}return nn.clock.paused=!1,lh.style.display="none",wr.clearPresses(),!0}wr.onAny=Uf;lh.addEventListener("pointerdown",n=>{n.preventDefault(),Uf()});const kf=document.getElementById("waves");kf.innerHTML="waves every "+Pf.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");kf.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;Df(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});Df(ah);document.addEventListener("visibilitychange",()=>{document.hidden&&($a=0)});let ld=0,$a=0,cd=60,Al=0,ka=0;function Bf(n){requestAnimationFrame(Bf);const e=$a?(n-$a)/1e3:0;$a=n,Al++,ka+=e,ka>=.5&&(cd=Al/ka,Al=0,ka=0);const t=wr.read();if(t.debug&&(ns=!ns,wc.classList.toggle("on",ns),Ff.classList.toggle("on",ns)),Dn.debugReadouts=ns,Wm(nn,t,e),!gr)return;const i=Ol(nn.party,nn.map,nn.clock.time);zw.style.height=`${(1-i.gone)*100}%`;const s=Ht.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(Hw.textContent=`wave ${nn.party.wave} · ${nn.party.areas.size} areas · ${s}`,ch.classList.toggle("paused",nn.party.paused),!(nn.clock.paused&&n-ld<300)&&(ld=n,Dn.render(nn.clock.time),ns)){const r=nn.witch,a=Dn.stats;wc.textContent=[`fps    ${cd.toFixed(0)}`,`seed   ${Es}`,`area   ${kd(nn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${nn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Bf);window.witch={game:nn,view:Dn,areaUnderWitch:()=>kd(nn),areaTypeId:n=>Rt[n].id,spriteUp:()=>Ct.uUp.value,loadTimes:oh,get ready(){return gr}};
