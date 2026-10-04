(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function ki(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Ce(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Fi(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),h=a*a*(3-2*a),c=Ce(i,r,t),d=Ce(i+1,r,t),f=Ce(i,r+1,t),u=Ce(i+1,r+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}const Yn=(n,e,t)=>n+(e-n)*t,Pn=(n,e,t)=>Math.min(t,Math.max(e,n)),nn=n=>{const e=Pn(n,0,1);return e*e*(3-2*e)};function Zd(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),s=Pn(Math.round(n.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function co(n,e,t,i,r){const s=i*r,a=Math.exp(-s),o=n-t,h=e+i*o;return[t+(o+h*r)*a,(e-i*h*r)*a]}function Jd(n,e,t,i,r,s,a){const o=a.camera,h=Math.max(1,o.zoomSteps),c=Pn(n.zoomStep+Math.sign(e),0,h-1),d=h>1?c/(h-1):0;let f=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(f,u);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*s),M=n.ax+(f-n.ax)*m,x=n.az+(u-n.az)*m,[g,v]=co(n.tx,n.vx,t.x+M,o.follow,s),[S,y]=co(n.ty,n.vy,t.y,o.follow,s),[A,b]=co(n.tz,n.vz,t.z+x,o.follow,s),E=n.zoom+(d-n.zoom)*(1-Math.exp(-o.zoomEase*s)),_=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*s)),w=a.treetop,L=Pn((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(w.boost-1)),0,1),R=(n.pull??0)+(w.cameraPull*L*nn(_)-(n.pull??0))*(1-Math.exp(-1.5*s));return{zoomStep:c,zoom:E,tx:g,ty:S,tz:A,vx:v,vy:y,vz:b,ax:M,az:x,lift:Pn(_,0,1),pull:R}}function vu(n,e,t){const i=t.camera.ground,r=t.camera.treetop,s=nn(e),a=Yn(Yn(i.angleIn,i.angleOut,n.zoom),Yn(r.angleIn,r.angleOut,n.zoom),s),o=Yn(Yn(i.distanceIn,i.distanceOut,n.zoom),Yn(r.distanceIn,r.distanceOut,n.zoom),s)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Qd=.1,jd=()=>({time:0,paused:!0});function ef(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Qd,e);return n.time+=t,t}const tf={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},nf={types:tf};function Za(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Ns(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const de=(n,e,t)=>e+(t-e)*n(),ec=(n,e)=>e[Math.floor(n()*e.length)];function ht(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function vi(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),h=a*a*(3-2*a),c=ht(i,r,t),d=ht(i+1,r,t),f=ht(i,r+1,t),u=ht(i+1,r+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}function le(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[h,c,d]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(d*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},ho=4;function _u(n,e,t,i=.12){const r=(s,a,o,h)=>{const c=o-s,d=h-a,f=Math.max(0,Math.min(1,((n-s)*c+(e-a)*d)/(c*c+d*d)));return Math.hypot(n-s-c*f,e-a-d*f)<i};switch((t%ho+ho)%ho){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const rf=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Vc(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const s=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=s(o-1),c=s(o),d=s(o+1),f=s(o+2),u=Math.max(2,Math.ceil(Math.hypot(d[0]-c[0],d[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const m=p/u,M=m*m,x=M*m;r.push([0,1].map(g=>.5*(2*c[g]+(-h[g]+d[g])*m+(2*h[g]-5*c[g]+4*d[g]-f[g])*M+(-h[g]+3*c[g]-3*d[g]+f[g])*x)))}}return e||r.push(n[i-1]),r}function sf(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],s=n.length;for(let h=0;h<s;h++){const c=n[Math.max(0,h-1)],d=n[Math.min(s-1,h+1)];let f=d[0]-c[0],u=d[1]-c[1];const p=Math.hypot(f,u)||1;f/=p,u/=p;const m=n[h][2]/2;i.push([n[h][0]-u*m,n[h][1]+f*m]),r.push([n[h][0]+u*m,n[h][1]-f*m])}const a=(h,c,d,f)=>{let u=h[0]-c[0],p=h[1]-c[1];const m=Math.hypot(u,p)||1;return[h[0]+u/m*d/2*f,h[1]+p/m*d/2*f]};return[...i,a(n[s-1],n[s-2],n[s-1][2],t),...r.reverse(),a(n[0],n[1],n[0][2],e)]}const mt=(n,e)=>[n[0]+e[0],n[1]+e[1]],An=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Ja(n,e,t,i,r,s=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let d=c[0]-h[0],f=c[1]-h[1];const u=Math.hypot(d,f)||1,p=f/u*s,m=-d/u*s;for(let M=1;M<=i;M++){const x=(M-.5)/i,g=An(h,c,x),v=[g[0]+p*r-d/u*r*.5,g[1]+m*r-f/u*r*.5];a.push(An(h,c,x-.45/i),v,An(h,c,x+.35/i))}}return a}function Yc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,h=[];for(let c=0,d=t.length-1;c<t.length;d=c++){const[f,u]=t[c],[p,m]=t[d];u>o!=m>o&&h.push(f+(o-u)/(m-u)*(p-f))}h.sort((c,d)=>c-d);for(let c=0;c+1<h.length;c+=2)for(let d=Math.max(0,Math.ceil(h[c]-.5));d<=Math.min(n-1,Math.floor(h[c+1]-.5));d++)i[a*n+d]=1}return i}function af(n,e,t){const r=new Float32Array(n*e),s=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(r[h]=1e4,s[h]=1e4);const a=h=>r[h]*r[h]+s[h]*s[h],o=(h,c,d,f,u)=>{const p=c+f,m=d+u;let M,x;if(p<0||m<0||p>=n||m>=e)M=f,x=u;else{const g=m*n+p;M=r[g]+f,x=s[g]+u}M*M+x*x<a(h)&&(r[h]=M,s[h]=x)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const d=h*n+c;t[d]&&(o(d,c,h,-1,0),o(d,c,h,0,-1),o(d,c,h,-1,-1),o(d,c,h,1,-1))}for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&o(d,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&(o(d,c,h,1,0),o(d,c,h,0,1),o(d,c,h,1,1),o(d,c,h,-1,1))}for(let c=0;c<n;c++){const d=h*n+c;t[d]&&o(d,c,h,-1,0)}}return{vx:r,vy:s}}class ft{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,s=0,a=1){this.px(e*this.sx,t,i,r,s,a)}px(e,t,i,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,s,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:d=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(u+.5-t)/r,x=m*m+M*M;if(x>1)continue;const g=u*this.w+p;if(o&&!o.has(this.m[g]))continue;if(h<1){const A=c?vi(p/3.2,u/3.2,d)*c+(1-c)*.5:.5;if(ht(p,u,d+77)>h*(.4+A*1.2)*(1.15-x*.5))continue}const v=m*f,S=M*f,y=Math.hypot(v,S,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,s,v/y,S/y,(Math.sqrt(Math.max(0,1-x))+.15)/y)}}line(e,t,i,r,s,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let d=0;d<=c;d++){const f=d/c,u=e+(i-e)*f,p=t+(r-t)*f,m=Math.max(.5,(s+(a-s)*f)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let x=Math.floor(u-m);x<=u+m;x++){const g=(x+.5-u)/m,v=(M+.5-p)/m;if(g*g+v*v>1)continue;const S=g*h,y=Math.hypot(S,v*.3,1);this.px(x,M,o,S/y,v*.3/y,1/y)}}}tri(e,t){let[[i,r],[s,a],[o,h]]=e;i*=this.sx,s*=this.sx,o*=this.sx;const c=(m,M,x,g,v,S)=>(m-v)*(g-S)-(x-v)*(M-S),d=Math.max(0,Math.floor(Math.min(i,s,o))),f=Math.min(this.w,Math.ceil(Math.max(i,s,o))),u=Math.max(0,Math.floor(Math.min(r,a,h))),p=Math.min(this.h,Math.ceil(Math.max(r,a,h)));for(let m=u;m<p;m++)for(let M=d;M<f;M++){const x=M+.5,g=m+.5,v=c(x,g,i,r,s,a),S=c(x,g,s,a,o,h),y=c(x,g,o,h,i,r);(v<0||S<0||y<0)&&(v>0||S>0||y>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Yc(this.w,this.h,Vc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(sf(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:d=l.LINE}={}){const{w:f,h:u}=this;if(o)for(let x=0;x<f*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:m}=af(f,u,e);let M=s;if(!M){for(let x=0;x<f*u;x++)e[x]&&(M=Math.max(M,Math.hypot(p[x],m[x])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let x=0;x<u;x++)for(let g=0;g<f;g++){const v=x*f+g;if(!e[v])continue;if(h){this.m[v]=t;continue}const S=Math.hypot(p[v],m[v]),y=Math.min(1,Math.max(0,(S-.5)/M)),A=Math.min(2.6,(1-y)/Math.sqrt(Math.max(.02,1-(1-y)*(1-y))))*a;let b=p[v]/(S||1)*A+c[0],E=m[v]/(S||1)*A+c[1];const _=Math.hypot(b,E,1);this.m[v]=t,this.n[v*3]=b/_,this.n[v*3+1]=E/_,this.n[v*3+2]=1/_}if(r&&!h){const x=[];for(let g=0;g<u;g++)for(let v=0;v<f;v++){const S=g*f+v;if(e[S])for(const[y,A]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=v+y,E=g+A;if(b<0||E<0||b>=f||E>=u)continue;const _=E*f+b;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==d){x.push(S);break}}}for(const g of x)this.m[g]=d}if(!h)for(let x=0;x<f*u;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,r={}){return this.fillMask(Yc(this.w,this.h,Vc(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(d=>d.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((d,f)=>[...d].forEach((u,p)=>{const m=t[u];if(!m)return;const M=i+(a?o-1-p:p),x=r+f;this.inb(M,x)&&(h[x*this.w+M]=1,c.set(x*this.w+M,m))})),this.fillMask(h,l.BODY,{round:s,depth:2.5});for(const[d,f]of c)this.m[d]=f}}function En(n,e,t,i=t.outline,r=Za){const{w:s,h:a}=n,o=()=>r(s,a),h=o(),c=o(),d=o(),f=h.getContext("2d").createImageData(s,a),u=c.getContext("2d").createImageData(s,a),p=d.getContext("2d").createImageData(s,a),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let x=0;x<s;x++){const g=M*s+x,v=n.m[g],S=g*4;if(!v){if(!m)continue;const _=[n.get(x+1,M),n.get(x-1,M),n.get(x,M+1),n.get(x,M-1)].find(L=>L);if(!_)continue;const w=m==="tint"?(e[_]||[0,0,0]).map(L=>L*.35|0):m;f.data.set([...w,255],S),u.data.set([128,128,255,255],S),p.data.set([128,128,255,255],S);continue}let y=e[v];v===l.LINE&&!y&&(y=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(_=>_*.55|0):m),y=y||[255,0,255],f.data.set([...y,rf.has(v)?254:255],S);const A=n.n[g*3],b=n.n[g*3+1],E=n.n[g*3+2];u.data.set([A*127+128,b*127+128,E*255,255],S),p.data.set([-A*127+128,b*127+128,E*255,255],S)}return h.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(u,0,0),d.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:d,w:s,h:a}}const ji=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Cs=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ht=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Kn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],C={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Kn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ji,cross:Cs,dot:Ht};function Xc(n,e=[0,1,0]){const t=ji(n);let i=Cs(e,t);Math.hypot(...i)<1e-4&&(i=Cs([0,0,1],t)),i=ji(i);const r=Cs(t,i);return[t,r,i]}function bu(n,e){const t=Ht(n,e.axes[0]),i=Ht(n,e.axes[1]),r=Ht(n,e.axes[2]),[s,a,o]=e.r,h=Math.hypot(t/s,i/a,r/o),c=Math.hypot(t/(s*s),i/(a*a),r/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(s,a,o)}function yu(n,e){const{ba:t,l2:i,rr:r,a2:s,il2:a,r1:o,r2:h}=e,c=Ht(n,t),d=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=Ht(f,f),p=c*c*i,m=d*d*i,M=Math.sign(r)*r*r*u;return Math.sign(d)*s*m>M?Math.sqrt(u+m)*a-h:Math.sign(c)*s*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*s*a)+c*r)*a-o}function Su(n,e){const t=Math.abs(Ht(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ht(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ht(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const of=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Kc=(n,e)=>n.type==="ell"?bu(Kn(e,n.cw),n):n.type==="box"?Su(Kn(e,n.cw),n):yu(Kn(e,n.aw),n),ds=(n,e)=>n.rough?Kc(n,e)+of(e,n.rough):Kc(n,e);class Ke{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const s=r.axes||(r.dir?Xc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const s=r.axes||(r.dir?Xc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,s,a,o={}){return this.flats.push({c:e,u:ji(t),v:ji(i),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=bu(Kn(e,i.c),i);else if(i.type==="box")r=Su(Kn(e,i.c),i);else{const s=Kn(i.b,i.a),a=Math.max(1e-9,Ht(s,s)),o=i.r1-i.r2;r=yu(Kn(e,i.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const qc={towards:.6,away:-.6},lf=.52;function pn(n,{height:e,scale:t,facing:i="towards",yaw:r=qc[i]??qc.towards,pitch:s=lf,lineGap:a=.12}={}){const o=Math.cos(r),h=Math.sin(r),c=Math.cos(s),d=Math.sin(s),f=W=>[W[0]*o-W[2]*h,W[1],W[0]*h+W[2]*o],u=W=>[W[0]*o+W[2]*h,W[1],-W[0]*h+W[2]*o],p=[0,-d,-c],m=[0,c,-d],M=[1,0,0],x=[0,d,c],g=n.blend,v=n.parts.map(W=>{if(W.type==="ell"){const Se=f(W.c),Ie=W.axes.map(f),He=Math.max(...W.r);return{...W,cw:Se,axes:Ie,bc:Se,br:He+(W.rough||0)*1.5}}if(W.type==="box"){const Se=f(W.c),Ie=W.axes.map(f);return{...W,cw:Se,axes:Ie,bc:Se,br:Math.hypot(...W.h)+(W.rough||0)*1.5}}const pe=f(W.a),ce=f(W.b),Ae=Kn(ce,pe),ge=Math.max(1e-9,Ht(Ae,Ae)),Me=W.r1-W.r2;return{...W,aw:pe,ba:Ae,l2:ge,rr:Me,a2:ge-Me*Me,il2:1/ge,bc:C.lerp(pe,ce,.5),br:Math.sqrt(ge)/2+Math.max(W.r1,W.r2)}}),S=n.flats.map(W=>{const pe=f(W.c),ce=f(W.u),Ae=f(W.v);return{...W,cw:pe,uw:ce,vw:Ae,nw:ji(Cs(ce,Ae)),bc:pe,br:Math.hypot(W.su,W.sv)}}),y=[...v,...S],A=W=>{const pe=Ht(W.bc,M),ce=Ht(W.bc,m),Ae=W.br+(W.uw?0:g);return[pe-Ae,pe+Ae,ce-Ae,ce+Ae]};for(const W of y)[W.x0,W.x1,W.u0,W.u1]=A(W);const b=y.filter(W=>!W.extra&&!W.cut),E=Math.min(...b.map(W=>W.u0+(W.uw?0:g))),_=Math.max(...b.map(W=>W.u1-(W.uw?0:g))),w=t??e/Math.max(1e-6,_-E),L=Math.min(...y.map(W=>W.x0)),R=Math.max(...y.map(W=>W.x1)),P=Math.min(...y.map(W=>W.u0)),O=Math.max(...y.map(W=>W.u1)),I=Math.ceil((R-L)*w)+4,U=Math.ceil((O-P)*w)+2,z=new ft(I,U),k=new Float32Array(I*U).fill(1/0),ee=new Int16Array(I*U).fill(-1),H=8,Z=Math.ceil(I/H),N=Math.ceil(U/H),Y=Array.from({length:Z*N},()=>[]);y.forEach((W,pe)=>{const ce=Math.max(0,Math.floor((W.x0-L)*w/H)),Ae=Math.min(Z-1,Math.floor(((W.x1-L)*w+2)/H)),ge=Math.max(0,Math.floor((O-W.u1)*w/H)),Me=Math.min(N-1,Math.floor(((O-W.u0)*w+1)/H));for(let Se=ge;Se<=Me;Se++)for(let Ie=ce;Ie<=Ae;Ie++)Y[Se*Z+Ie].push(pe)});const j=.25/w,oe=(W,pe)=>{const ce=Math.max(g-Math.abs(W-pe),0)/g;return Math.min(W,pe)-ce*ce*g*.25};for(let W=0;W<U;W++)for(let pe=0;pe<I;pe++){const ce=Y[Math.floor(W/H)*Z+Math.floor(pe/H)];if(!ce.length)continue;const Ae=L+(pe+.5-1)/w,ge=O-(W+.5)/w,Me=C.add(C.add(C.mul(M,Ae),C.mul(m,ge)),C.mul(x,50));let Se=1/0,Ie=-1/0;const He=[],st=[];for(const je of ce){const Ye=y[je],F=Kn(Me,Ye.bc),T=Ht(F,p),B=Ye.br+(Ye.uw?0:g),$=Ht(F,F)-B*B,te=T*T-$;if(te<0)continue;if(Ye.uw){st.push(Ye);continue}if(Ye.cut){He.push(Ye);continue}const fe=Math.sqrt(te);Se=Math.min(Se,-T-fe),Ie=Math.max(Ie,-T+fe),He.push(Ye)}let Ct=1/0,Nt=-1,Et=0,Lt=null;if(He.length){const je=new Map;for(const T of He){let B=je.get(T.group);B||je.set(T.group,B=[]),B.push(T)}const Ye=(T,B)=>{let $=1/0;for(const te of T)te.cut||($=$===1/0?ds(te,B):oe($,ds(te,B)));for(const te of T)te.cut&&($=Math.max($,-ds(te,B)));return $};let F=Math.max(0,Se);for(let T=0;T<96&&F<Ie;T++){const B=C.add(Me,C.mul(p,F));let $=1/0,te=null;for(const[fe,me]of je){const re=Ye(me,B);re<$&&($=re,te=fe)}if($<j){const fe=je.get(te),me=.5/w;Lt=ji([Ye(fe,[B[0]+me,B[1],B[2]])-Ye(fe,[B[0]-me,B[1],B[2]]),Ye(fe,[B[0],B[1]+me,B[2]])-Ye(fe,[B[0],B[1]-me,B[2]]),Ye(fe,[B[0],B[1],B[2]+me])-Ye(fe,[B[0],B[1],B[2]-me])]);let re=fe[0],se=1/0;for(const ve of fe){if(ve.cut)continue;const Fe=ds(ve,B);Fe<se&&(se=Fe,re=ve)}for(const ve of fe)if(ve.cut&&-ds(ve,B)>se-j*2){re=ve;break}Ct=F,Nt=te,Et=re.paint?re.paint(u(B),re)??re.mat:re.mat;break}F+=Math.max($*.9,j*.5)}}for(const je of st){const Ye=Ht(p,je.nw);if(Math.abs(Ye)<1e-4)continue;const F=Ht(Kn(je.cw,Me),je.nw)/Ye;if(F>=Ct)continue;const T=C.add(Me,C.mul(p,F)),B=Kn(T,je.cw),$=Ht(B,je.uw)/je.su,te=Ht(B,je.vw)/je.sv;if(Math.abs($)>1||Math.abs(te)>1)continue;const fe=je.mask($,te);if(!fe)continue;let me=Ye>0?C.mul(je.nw,-1):je.nw;me=ji(C.add(me,C.add(C.mul(je.uw,$*je.bend),C.mul(je.vw,te*je.bend*.5)))),Ct=F,Nt=je.group,Et=fe,Lt=me}if(!Lt||!Et)continue;const X=W*I+pe;k[X]=Ct,ee[X]=Nt,z.px(pe,W,Et,Ht(Lt,M),-Ht(Lt,m),Ht(Lt,x))}const he=[];for(let W=0;W<U;W++)for(let pe=0;pe<I;pe++){const ce=W*I+pe;if(z.m[ce])for(const[Ae,ge]of[[1,0],[-1,0],[0,1],[0,-1]]){const Me=pe+Ae,Se=W+ge;if(Me<0||Se<0||Me>=I||Se>=U)continue;const Ie=Se*I+Me;if(z.m[Ie]&&ee[Ie]!==ee[ce]&&k[Ie]-k[ce]>a){he.push(ce);break}}}for(const W of he)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(z.m[W])||(z.m[W]=l.LINE);for(let W=0;W<U;W++)for(let pe=0;pe<I;pe++){const ce=W*I+pe;if(z.m[ce]!==l.EYE)continue;const Ae=W>0&&z.m[ce-I]===l.EYE,ge=pe>0&&z.m[ce-1]===l.EYE,Me=pe+1<I&&z.m[ce+1]===l.EYE&&W+1<U&&z.m[ce+I]===l.EYE;!Ae&&!ge&&Me&&(z.m[ce]=l.GLINT)}let xe=-1;for(let W=U-1;W>=0&&xe<0;W--)for(let pe=0;pe<I;pe++)if(z.m[W*I+pe]){xe=W;break}const q=xe>=0&&xe<U-1?U-1-xe:0;if(xe>=0&&xe<U-1){const W=U-1-xe;for(let pe=U-1;pe>=0;pe--)for(let ce=0;ce<I;ce++){const Ae=pe*I+ce,ge=(pe-W)*I+ce,Me=pe-W>=0;z.m[Ae]=Me?z.m[ge]:0,z.g[Ae]=Me?z.g[ge]:0;for(let Se=0;Se<3;Se++)z.n[Ae*3+Se]=Me?z.n[ge*3+Se]:0}}return z.bodyH=Math.round((_-E)*w),{sp:z,s:w,project:W=>{const pe=f(W);return[+((pe[0]-L)*w+1).toFixed(1),+((O-Ht(pe,m))*w+q).toFixed(1)]}}}const si=(n,e=9,t=.3)=>ht(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Mr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>s||i<a?null:i>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(i)>a?null:s>.82?t:Math.abs(i)<a*.5&&s<.7&&s>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const a=Math.hypot(i-.35,r-.1);return a<.18?t:a<.3?e:n}},cf={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},$c={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function hf(n,e=$c){const t={...$c,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[s,a]of Object.entries(cf)){const[o,h,c]=t[s];r[a]=le(i[s]??o,h,c)}return r[l.EYE]=[24,18,30],r[l.GLINT]=[255,255,245],r[l.NOSE]=[20,16,24],r[l.MAGIC]=le(n.glowHue??.13,.5,1),r[l.MAGIC2]=le(n.glowHue??.13,.15,1),r[l.BELLY]=[245,245,240],r}const uf={rise:.78,descend:-.66,brake:.44};function df(n){const e=new Ke({blend:.03}),t=n%3,i=.5,r=.05,s=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=m=>i-r*(m/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,r*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,a(.5)+.03,m*.045]),h=[-1,1].map(m=>[.2,i+.24+s[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,x=M>0?7:5;e.seg(h[m],o[m],.04,.03,l.JACKET,{group:x}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:x})}const c=[.3+s[0],i+.27+s[1],0],d=[.07,i+.28+s[1]*.5,0],f=[-.15,i+.35+s[2],0];e.ell(d,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<d[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(f,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...C.add(f,[-.02,.06,0]),.07],[...C.add(f,[-.18,.08+s[0]*2,0]),.05],[...C.add(f,[-.34,.05+s[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+s[1]*2,-.07],[-.46,i+.38+s[0]*2,-.08]],[[-.34,i+.33+s[2]*2,.08],[-.55,i+.44-s[1]*3,.1]]].forEach(([m,M],x)=>{const g=x?6:4,v=C.add(f,[-.04,0,x?.06:-.06]);e.seg(v,m,.055,.045,l.JEANS,{group:g}),e.seg(m,M,.045,.04,l.JEANS,{group:g}),e.ell(C.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:g,paint:S=>S[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const M=Ke.surface(c,[.11,.115,.1],C.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(C.add(M,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(Ke.surface(c,[.11,.115,.1],C.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...C.add(c,[-.06,.03,0]),.065],[...C.add(c,[-.22,.05+s[1]*2,.01]),.05],[...C.add(c,[-.4,.06+s[2]*3,.02]),.03],[...C.add(c,[-.55,.07+s[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(C.add(c,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...C.add(c,[-.005,.03,-.095]),.015],[...C.add(c,[-.02,.12,0]),.015],[...C.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=C.add(c,[-.1+s[0],.2+s[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...C.add(p,[-.02,.02,0]),.08],[...C.add(p,[-.14,.13,0]),.04],[...C.add(p,[-.3,.14+s[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(C.add(p,[.08,-.02,.08]),C.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11});for(const[m,M,x,g]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([m-v,M,x],[m-v-g,M,x],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const wu={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Kr=.34,Eu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},ff={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Eu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Kr+.14,.15],far:[.18,Kr+.14,-.13],hand:"rest"}))};function pf(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=C.lerp(n,e,.5);if(i>=2*t)return r;const s=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*s,r[1]+a*s,r[2]]}function mf(n,e){const t=ff[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Eu,...t[e%t.length]},r=new Ke({blend:.03}),s=i.hop,a=i.sway,o=i.sit?Kr+.06:.45-i.crouch*.21+s,h=-i.crouch*.12,c=!!i.broom.astride,d=o-.04,f=c?[1,0,0]:C.norm(i.broom.dir),u=c?[-.36,d,0]:i.broom.binding,p=w=>C.add(u,C.mul(f,w));r.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:f,group:3,paint:w=>{const L=C.dot(C.sub(w,u),f);return L<-.22?l.MAGIC2:L>-.01?l.BROOM:void 0}});for(const w of[-1,1]){const L=w>0?6:4,R=[h,o,w*.07],P=i.sit?i.swing*w:0,O=i.sit?[.24+P,.09+Math.max(0,P)*.6,w*.1]:w>0&&i.legUp?i.legUp:[(w>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?s*.4:s),w*.1],I=i.sit?[.21,o+.01,w*.09]:pf(R,O,.21);r.seg(R,I,.055,.045,l.JEANS,{group:L}),r.seg(I,O,.045,.04,l.JEANS,{group:L});const U=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(C.add(O,U),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:L,paint:z=>z[1]<O[1]+U[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[h,o+.03,0];r.ell(x,[.1,.08,.105],l.JEANS,{group:1});const g=C.add(x,C.add(C.mul(m,.19),[0,i.breathe,0]));r.ell(g,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:w=>C.dot(C.sub(w,g),M)>.045&&Math.abs(w[2])<.05?l.TOP:void 0}),r.chain([[...C.add(g,C.add(C.mul(M,-.07),C.mul(m,-.08))),.07],[...C.add(g,C.add(C.mul(M,-.11-a),C.mul(m,-.2))),.05],[...C.add(g,C.add(C.mul(M,-.13-a*1.6),C.mul(m,-.29))),.025]],l.JACKET,{group:12});const v=C.add(g,C.add(C.mul(m,.27),[i.look*.03,0,i.tilt*.04])),S=w=>C.add(g,C.add(C.mul(m,.1),[0,0,w*.12])),y=c?[.28,d+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,f[1]))),A=c?[.28,d+.03,.05]:i.free;for(const w of[-1,1]){const L=w>0?7:5,R=S(w),P=w>0?A:i.far||y,O=w>0&&i.elbow?i.elbow:C.add(C.lerp(R,P,.5),[-.03,-.02,w*.05]);r.seg(R,O,.04,.035,l.JACKET,{group:L}),r.seg(O,P,.035,.03,l.JACKET,{group:L});const I=w>0&&!c?i.hand:"grip";if(I==="palm")r.ell(P,[.045,.02,.04],l.SKIN,{group:L});else if(I==="down")r.ell(P,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:L});else if(I==="wave"){r.ell(P,[.03,.045,.04],l.SKIN,{group:L});for(const U of[-1,0,1])r.seg(C.add(P,[0,.03,U*.02]),C.add(P,[U*.01,.065,U*.03]),.01,.008,l.SKIN,{group:L})}else I==="point"?(r.ell(P,[.035,.03,.035],l.SKIN,{group:L}),r.seg(C.add(P,[0,.02,0]),C.add(P,[.01,.08,0]),.012,.01,l.SKIN,{group:L})):r.ell(P,[.035,.03,.035],l.SKIN,{group:L})}r.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:w=>w[0]<v[0]-.01||w[1]>v[1]+.075?l.HAIR:void 0});for(const w of[-1,1])r.ell(Ke.surface(v,[.11,.115,.1],C.norm([.85,.05+i.look,w*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&r.ell(Ke.surface(v,[.11,.115,.1],C.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),r.chain([[...C.add(v,[-.06,.02,0]),.06],[...C.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...C.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const w of[-1,1])r.ell(C.add(v,[-.015,0,w*.105]),[.05,.055,.03],l.PHONES,{group:10});r.chain([[...C.add(v,[-.005,.03,-.095]),.015],[...C.add(v,[-.005,.11,-.05]),.015],[...C.add(v,[-.005,.125,0]),.015],[...C.add(v,[-.005,.11,.05]),.015],[...C.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const b=C.add(v,[-.03,.1,i.tilt*.02]),E=i.tilt*.05,_=C.add(b,[-.16-a*.5,.27,E*2]);return r.ell(b,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...C.add(b,[0,.01,0]),.085],[...C.add(b,[-.05,.17,E]),.045],[..._,.012]],l.HAT,{group:11,paint:w=>w[1]<b[1]+.045?l.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),r.anchors.hand=A,r.anchors.hatTip=_,r}function Au({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return df(n);if(wu[t])return mf(t,n);const i=t==="rise",r=t==="descend",s=t==="brake",a=i||r||s,o=new Ke({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),d=.42+h,f=i?.3:r?-.27:s?-.12:e?.1:0,u=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],m=r?1:i?-.6:0;o.seg([-.5,d-c*2,0],[.62,d+c*3,0],.022,.018,l.BROOM,{group:2}),s?o.ell([-.56,d-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:S=>S[1]<d-.18?l.MAGIC2:S[1]>d-.01?l.BROOM:void 0}):o.ell([-.62,d-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:S=>S[0]<-.72?l.MAGIC2:S[0]>-.5?l.BROOM:void 0});for(const S of[-1,1]){const y=[-.04,d+.06,S*.07],A=s?[.18,d-.01,S*.14]:r?[.16,d-.05,S*.14]:i?[.06,d-.07,S*.14]:[.12+f*.5,d-.02,S*.14],b=s?S>0?[.44,d-.02+p,S*.13]:[.3,d-.16,S*.13]:r?[.2,d-.26,S*.13]:i?[-.1,d-.23,S*.13]:[.08+f,d-.2,S*.13];o.seg(y,A,.055,.045,l.JEANS,{group:S>0?6:4}),o.seg(A,b,.045,.04,l.JEANS,{group:S>0?6:4}),o.ell(C.add(b,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:S>0?6:4,paint:E=>E[1]<b[1]-.04?l.BELLY:void 0})}o.ell([-.04,d+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+f*.8,d+.26-Math.abs(f)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:S=>S[0]>M[0]+.04&&Math.abs(S[2])<.055?l.TOP:void 0}),s?o.chain([[...C.add(M,[-.08,-.06,0]),.07],[...C.add(M,[-.02,.12+p,.02]),.05],[...C.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...C.add(M,[-.08,-.1,0]),.07],[...C.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...C.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const x=C.add(M,[.03+f*.5,.26,0]),g=C.add(x,[s?.05:r?-.01:-.03,s?.06:.1,0]);for(const S of[-1,1]){const y=C.add(M,[.01,.11,S*.11]),A=r&&S>0?C.add(g,[.1,.01,.1]):s?[.3,d+.03,S*.05]:[.26+f,d+.03,S*.05],b=r&&S>0?C.add(y,[.1,.02,.1]):C.lerp(y,A,.5);o.seg(y,b,.04,.035,l.JACKET,{group:S>0?7:5}),o.seg(b,A,.035,.03,l.JACKET,{group:S>0?7:5}),o.ell(A,[.035,.03,.035],l.SKIN,{group:S>0?7:5})}o.ell(x,[.11,.115,.1],l.SKIN,{group:8,paint:S=>S[0]<x[0]-.01||S[1]>x[1]+.075?l.HAIR:void 0});for(const S of[-1,1])o.ell(Ke.surface(x,[.11,.115,.1],C.norm([.85,.05,S*.45])),[.016,.026,.016],l.EYE,{group:8});s?o.chain([[...C.add(x,[-.06,.06,0]),.06],[...C.add(x,[.04,.13+p,.03]),.045],[...C.add(x,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...C.add(x,[-.06,.02,0]),.06],[...C.add(x,[-.18-u,-.05+p+m*.1,.02]),.045],[...C.add(x,[-.3-u*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const S of[-1,1])o.ell(C.add(x,[-.015,0,S*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...C.add(x,[-.005,.03,-.095]),.015],[...C.add(x,[-.005,.11,-.05]),.015],[...C.add(x,[-.005,.125,0]),.015],[...C.add(x,[-.005,.11,.05]),.015],[...C.add(x,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(g,[.16,.014,.15],l.HAT,{dir:s?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(s?[[...C.add(g,[0,.01,0]),.085],[...C.add(g,[.06,.16,0]),.045],[...C.add(g,[.2,.22+p*.5,0]),.012]]:[[...C.add(g,[0,.01,0]),.085],[...C.add(g,[-.05-u-v*.5,.17-v*.3,0]),.045],[...C.add(g,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:S=>S[1]<g[1]+.045?l.MAGIC:void 0}),a){const S=uf[t]+(s?[0,.06][n%2]:0),y=Math.cos(S),A=Math.sin(S),b=[0,d,0],E=R=>[b[0]+(R[0]-b[0])*y-(R[1]-b[1])*A,b[1]+(R[0]-b[0])*A+(R[1]-b[1])*y,R[2]],_=R=>[b[0]+(R[0]-b[0])*y+(R[1]-b[1])*A,b[1]-(R[0]-b[0])*A+(R[1]-b[1])*y,R[2]],w=R=>[R[0]*y-R[1]*A,R[0]*A+R[1]*y,R[2]];for(const R of o.parts)if(R.type==="ell"?(R.c=E(R.c),R.axes=R.axes.map(w)):(R.a=E(R.a),R.b=E(R.b)),R.paint){const P=R.paint;R.paint=(O,I)=>P(_(O),I)}for(const R of o.flats)R.c=E(R.c),R.u=w(R.u),R.v=w(R.v);const L=Math.min(...o.parts.map(R=>R.type==="ell"?R.c[1]-Math.max(...R.r):Math.min(R.a[1]-R.r1,R.b[1]-R.r2)));if(L<.08)for(const R of o.parts){const P=.08-L;R.type==="ell"?R.c=[R.c[0],R.c[1]+P,R.c[2]]:(R.a=[R.a[0],R.a[1]+P,R.a[2]],R.b=[R.b[0],R.b[1]+P,R.b[2]])}if(s){const R=E([-.45,d-.24,0]);for(let P=0;P<5;P++){const O=P+n*.5,I=.055-P*.008;o.ell([R[0]+.1+O*.08,Math.max(.04,R[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],P<2?l.BELLY:P%2?l.MAGIC:l.MAGIC2,{group:25+P,extra:!0})}}if(i){const R=E([-.8,d,0]);for(let P=0;P<5;P++){const O=P+n*.5,I=.05-P*.007;o.ell([R[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,R[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],P%2?l.MAGIC:l.MAGIC2,{group:20+P,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const tc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),uo=new Map,Tu=n=>(uo.has(n)||uo.set(n,pn(Au({frame:0}),{height:n}).s),uo.get(n)),ss=(n={})=>Tu(tc(n));function gf(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r}={}){const s=tc(n),a=Au({frame:e,lean:t,pose:r}),{sp:o,project:h}=r?pn(a,{scale:Tu(s),facing:i}):pn(a,{height:s,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let c=0;for(let d=0;d<400&&c<6;d++){const f=d*37%o.w,u=d*53%Math.floor(o.h*.8);o.get(f,u)||o.get(f+1,u)||o.get(f-1,u)||o.get(f,u+1)||o.get(f,u-1)||(f*7+u*13+e*5)%11||(o.px(f,u,l.MAGIC2),c++)}return o}const ct=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Hr=n=>{const e=ct(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},xf=n=>e=>{const t=ct(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Ai=(n,e,t,i,r=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.45&&r?l.MOSS:Math.abs(Math.sin(s[0]*13+s[2]*7))<.06?l.STONED:void 0}),Gs=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:xf(e)}),hn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Hr}),Ws=(n,e,t,i,r,s=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=ct(r,o)*6.283,c=t*Math.sqrt(ct(o,r)),d=Math.cos(h)*c,f=Math.sin(h)*c*.7;n.ell([d,s*.3,f],[.07,s*(.35+ct(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>s*.45?l.LEAF:void 0})}},Vs=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),Mf={"sleeping-giant"(n){const e=t=>i=>{const r=ct(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?l.LEAF3:r>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Ai(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Ai(n,[-.2,.16,.95],[.2,.15,.18],4),Ai(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),Ws(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),Vs(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ct(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],s=1.1+ct(e,2)*.7,a=C.add(r,[0,s,0]);n.seg(r,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:Hr});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...C.add(a,C.add(C.mul(c,.45),[0,.18,0])),.04],[...C.add(a,C.add(C.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Ai(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Vs(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=C.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(C.dot(C.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&ct(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(C.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(C.add(e,C.add(C.mul(t,i*.4),[0,.1,-.42])),C.add(e,C.add(C.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),Ws(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=C.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,s]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[s,s,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-r,c=Math.hypot(o,h),d=Math.atan2(h,o);return c>s*.82||c<s*.18?l.BARKD:Math.abs(Math.sin(d*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=ct(t,1)*6.283,r=Math.cos(i)*1.5,s=Math.sin(i)*.9,a=[[r,0,s,.03]];for(let o=1;o<4;o++)a.push([r*(1-o*.28)+(ct(t,o)-.5)*.5,.25+o*.25+ct(o,t)*.2,s*(1-o*.3)+(ct(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>ct(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])hn(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Gs(n,t,i,3);hn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ct(i,r)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],l.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+ct(e)*.35;n.box(C.add(i,[0,r/2,0]),[.13,r/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-r*.55)<r*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>r*.85?l.MOSS:void 0});const s=C.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(s,C.add(s,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(C.add(s,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>ct(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],C.add(e,[Math.cos(r)*.08,.1+ct(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>ct(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?l.BARKL:void 0})},"root-arch"(n){hn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),hn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),hn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),hn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Gs(n,e,t,4);for(let e=0;e<4;e++)Ai(n,[-.7+e*.45,.12,(ct(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>ct(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Ai(n,[-1.4+e*.7,.12,.9+ct(e)*.3],[.2,.15,.18],4+e);Ws(n,16,1.8,10,9,.25)},"heron-rookery"(n){hn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,s],a)=>{hn(n,[[...r,.07],[...s,.04]],2),n.ell(C.add(s,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<s[1]+.02?l.BARKD:void 0})});for(const[r,s]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Gs(n,r,s,7);const t=C.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...C.add(t,[.12*i,.06*i,0]),.035*i],[...C.add(t,[.2*i,.22*i,0]),.03*i],[...C.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(C.add(t,[.18*i,.33*i,0]),C.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const r of[-.04,.04])n.seg(C.add(t,[0,-.06*i,r]),C.add(t,[.02,-.42,r]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ct(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ct(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,C.add(r,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(C.add(r,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=ct(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){Vs(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=ct(e,7)*6.283,i=1.5+ct(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],s=.5+ct(e,9)*.5;n.seg(r,C.add(r,[0,s,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(C.add(r,[0,s-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){Vs(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ct(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Ai(n,[.3,.07,.3],[.09,.07,.08],6,!1),Ai(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?l.MAGIC2:void 0});Ws(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){hn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,s)=>hn(n,r.map((a,o)=>[...a,.12-o*.04]),2+s)),hn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),hn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,s)=>{n.ell(r,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:s}),n.ell(C.add(r,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:s}),n.seg(C.add(r,[.15,.07,0]),C.add(r,[.22,.05,0]),.015,.004,l.BODY2,{group:s}),n.seg(C.add(r,[-.1,0,0]),C.add(r,[-.22,-.04,0]),.04,.015,l.SHADES,{group:s})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],C.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let r=0;r<6;r++){const s=r/6*Math.PI*2;n.seg(C.add(i,[Math.cos(s)*.2,-.25,Math.sin(s)*.2]),C.add(i,[Math.cos(s)*.12,.3,Math.sin(s)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(C.add(i,[0,-.27,0]),C.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>ct(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,s=Math.max(3,9-i);for(let a=0;a<s;a++){const o=a/s*Math.PI*2+i;Ai(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(C.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),C.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(C.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(C.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:Hr}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:Hr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:Hr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;hn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:Hr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){hn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),hn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),hn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;hn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Gs(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ct(e,1)-.5)*3,.05+ct(e,2)*.5,(ct(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=ct(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},Ru={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function vf(n){let e=n.w,t=-1,i=n.h;for(let s=0;s<n.h;s++)for(let a=0;a<n.w;a++)n.m[s*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,s));const r=new ft(t-e+1,n.h-i);for(let s=0;s<r.h;s++)for(let a=0;a<r.w;a++){const o=(s+i)*n.w+a+e;n.m[o]&&r.put(a,s,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:r,x0:e,y0:i}}function _f(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:le(i,.45,.36),[l.BARKD]:le(i+.03,.5,.17),[l.BARKL]:le(i,.35,.55),[l.BARK2]:le(i+.02,.45,.26),[l.LEAF]:le(t,.55,.45),[l.LEAF2]:le(t-.03,.5,.62),[l.LEAF3]:le(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:le(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:le(e.magicHue??.45,.6,1),[l.MAGIC2]:le(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function bf(n,e,t,i=16){const r=new Ke({blend:.05});Mf[n](r),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const s=(Object.values(Ru).find(([u])=>u===n)||[,,1])[2],a=pn(r,{scale:ss(t)*s}),{sp:o,x0:h,y0:c}=vf(a.sp),[d,f]=a.project([0,0,0]);return{sp:o,colours:_f(e,t),origin:{x:+(d-h).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const yf=1.3,Sf=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*yf,n.growth],fs=(n,e,t=1)=>Math.round(e.size*Sf(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),nc=(n,e)=>{const t=Ns(e);for(let i=0;i<9;i++){const r=Math.floor(de(t,2,n.w-2)),s=Math.floor(de(t,2,n.h*.6));if(!(n.get(r,s)||n.get(r+1,s)||n.get(r-1,s)||n.get(r,s+1)||n.get(r,s-1))&&(n.px(r,s,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+a,s+o,l.MAGIC)}};function Qa(n,e,t,i,r,s,a,o){const h=C.add(e,[-i*.7,i*(.75+r),t*i*.35]),c=C.norm(C.sub(h,e)),d=C.norm(C.sub([1,0,0],C.mul(c,C.dot([1,0,0],c)))),f=Math.hypot(...C.sub(h,e));n.flat(C.add(C.lerp(e,h,.5),C.mul(d,-i*.14)),c,d,f*.55,i*.34,Mr.wing(s,a),{group:o,extra:!0})}const ic=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),fs(1,e)*t*.72))):n===2?Math.round(Math.max(fs(1,e)*t*1.08,Math.min(fs(2,e,t),fs(1,e)*1.4))):fs(n,e)*t;let ya=null;function wf(n,e){const t=ya;ya=n;try{return e()}finally{ya=t}}const Ef=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Af=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function rc(n){const e=ya,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const s=t.neck||{c:C.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:C.norm([1,.4,0])},a=C.norm(s.dir),o=C.norm(C.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=C.cross(a,o),c=[],d=Math.max(.03,s.r*.2);for(let M=0;M<=16;M++){const x=M/16*Math.PI*2,g=C.add(C.mul(o,Math.cos(x)),C.mul(h,Math.sin(x)));let v=0;for(;v<.8&&n.field(C.add(s.c,C.mul(g,v)))<0;)v+=.01;v>=.8&&(v=s.r),c.push([...C.add(s.c,C.mul(g,v+d*.7)),d])}n.chain(c,l.COLLAR,{group:60,extra:!0});const f=c.reduce((M,x)=>x[0]-x[1]*.6+x[2]*.5>M[0]-M[1]*.6+M[2]*.5?x:M),u=d*1.3*(s.tag||1),p=C.norm(C.add(C.norm(C.sub(f.slice(0,3),s.c)),[.3,-.5,.3]));let m=f.slice(0,3);for(let M=0;M<60&&n.field(m)<u*.4;M++)m=C.add(m,C.mul(p,.01));n.ell(m,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const s=Math.max(r,.13),a=i.top||C.add(Ke.surface(i.c,i.r,C.norm([-.15,1,.1])),[0,r*.1,0]),o=C.norm([.3,1,.35]),h=s*1.5,c=C.add(a,C.mul(o,h));n.seg(C.add(a,C.mul(o,-s*.1)),c,s*.48,s*.04,l.HAT1,{group:61,extra:!0,paint:d=>Math.floor(C.dot(C.sub(d,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[s*.17,s*.17,s*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[s,a]=t.eyes.pts,o=c=>C.add(c,C.mul(C.norm(C.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(s),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(C.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[s,a]){const d=C.norm(C.sub(c,i.c)),f=C.norm(C.cross([0,1,0],d)),u=C.cross(d,f),p=e.glasses==="heart"?Af:Ef,m=h*1.5;n.flat(o(c),f,u,m,m,(M,x)=>p(M,x)?p(M*1.3,x*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(s),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,h=C.add(s.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:s.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&si(c,60,.28)?l.GLINT:void 0})}}function Tf(n,e,t,i,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=N=>a&&n.legend.includes(N),d=new Ke,f=s.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=s.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,m=t?-.04:0,M=1+m,x=s.chest*(a?1.06:1)/p+m,g=s.tuck/p+m,v=s.bw*(h?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),S=.06*s.legW*(a?1.1:h?1.7:1),y=s.back==="hump"?.1:0,A=s.back==="arch"?.1:0,b=x+.12,E=N=>{if(s.belly&&N[1]<b&&N[0]>-u*.5)return l.BELLY;if(s.saddle&&N[1]>M-.18&&N[0]<u*.55)return l.BODY2;if(s.spots&&N[1]>x+.1&&si(N,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?l.BELLY:s.spots==="young"?void 0:l.BODY3;if(s.ridge&&N[1]>M-.08+y*.5)return l.BODY3};if(d.ell([u*.48,(M+x)/2+y*.5,0],[u*.62,(M-x)/2+y*.5,v],l.BODY,{paint:E}),d.ell([-u*.5,(M+g)/2+A*.6,0],[u*.58,(M-g)/2+A*.6,v*.93],l.BODY,{paint:E}),d.ell([0,(M+(x+g)/2)/2+.02,0],[u*.6,(M-(x+g)/2)/2,v*.9],l.BODY,{paint:E}),s.ridge)for(let N=0;N<(a?16:10);N++){const Y=-u*.8+N*u*1.75/(a?15:9),j=(.07+(a?.04:0))*(1+.5*Math.max(0,Y/u));d.ell([Y,M+.02+y*Math.max(0,1-Math.abs(Y/u-.5)*2)+j*.5,0],[j,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let N=0;N<14;N++){const Y=N/14*Math.PI*2;d.ell([u*Math.cos(Y)*.7,(M+x)/2+Math.sin(Y)*.2,v*(N%2?.5:-.5)],[.16,.14,.14],l.BODY)}const _=[.32,-.32][t],w=(N,Y)=>{const j=Y*v*.62,oe=N?u*.62:-u*.62,he=(N?1:-1)*Y*_,xe=N?x+.1:g+.15,q=(N?Y:-Y)*(t?1:-1)>0?.06:0,ie=[oe+Math.sin(he)*.2+(N?.02:.1),Math.max(.3,xe*.55),j],W=[oe+Math.sin(he)*.42,.05+q,j],pe=[oe,xe+.12,j*.8],ce=Y>0?s.legMat||l.BODY:s.legMat?l.BODY3:l.BODY2,Ae=N?[[...pe,S*1.5],[...ie,S*1.05],[...W,S*.9]]:[[...pe,S*2*(s.haunch||1)],[...C.add(ie,[-.12,.06,0]),S*1.2],[...C.add(W,[-.06*(s.hindFoot||1),.12,0]),S*.9],[...W,S*.9]];d.chain(Ae,ce,{group:Y>0?6+(N?1:0):2,paint:s.socks?Me=>Me[1]<s.socks?l.BODY3:void 0:void 0});const ge=(s.paw==="hoof"?.07:.09)*s.legW**.5*(N?1:s.hindFoot||1);d.ell(C.add(W,[ge*.5,-.01,0]),[ge,S*.9,S*1.1],s.paw==="hoof"?l.NOSE:ce,{group:Y>0?6+(N?1:0):2}),d.anchors.feet.push({c:C.add(W,[ge*.5,-.01,0]),r:Math.max(ge,S*1.1),group:Y>0?6+(N?1:0):2})};for(const N of[-1,1])w(!0,N),w(!1,N);const L=[u*.82,M-.12,0],R=[L[0]+Math.cos(s.neckAng)*s.neck*.9,L[1]+Math.sin(s.neckAng)*s.neck*.9+(h?.1:0),0];d.seg(L,R,s.neckW*.55,s.neckW*.42,l.BODY,{paint:N=>s.belly&&N[1]<(L[1]+R[1])/2-.05?l.BELLY:s.face==="dark"?l.BODY2:void 0});const P=N=>{if(s.face==="badger")return Math.abs(N[2])<f*.22+(N[0]-R[0])*.1||N[1]<R[1]-f*.1?l.BELLY:l.BODY3;if(s.face==="dark")return l.BODY2;if((s.belly||s.muzzle)&&N[1]<R[1]-f*.35)return l.BELLY};d.ell(R,[f*1.05,f*.92,f*.88],l.BODY,{paint:P});const O=f*s.snout*(h?.55:o?.78:1),I=f*s.snoutD*.55,U=[R[0]+f*.65+O*.5,R[1]-f*.28,0];d.ell(U,[O*.62+f*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:N=>(s.muzzle||s.belly)&&N[1]<U[1]-I*.1?l.BELLY:P(N)});const z=[U[0]+O*.62+f*.1,U[1]-.02,0];d.ell(z,[f*(s.disc?.1:.12),f*(s.disc?.2:.12),f*(s.disc?.2:.15)],l.NOSE,{group:1});for(const N of[-1,1]){const Y=Ke.surface(R,[f*1.05,f*.92,f*.88],C.norm([.75,.32,N*.62]));d.ell(Y,[f*.13,f*.16,f*.13].map(j=>j*(s.eyeK||1)*(h?1.5:o?1.2:1)),a&&!s.tusks?l.MAGIC2:l.EYE,{group:1})}d.anchors.head={c:R,r:[f*1.05,f*.92,f*.88],top:[R[0]-f*.1,R[1]+f*.82,0]},d.anchors.eyes={pts:[-1,1].map(N=>Ke.surface(R,[f*1.05,f*.92,f*.88],C.norm([.75,.32,N*.62]))),size:f*.16*(s.eyeK||1)*(h?1.5:o?1.2:1)},d.anchors.neck={c:C.lerp(L,R,h?.05:o?.25:.42),r:s.neckW*.5*(h?1.3:o?1.12:1),dir:C.norm(C.sub(R,L)),tag:h?1.8:o?1.3:1};for(const N of[-1,1]){const Y=s.ear,j=[R[0]-f*.15,R[1]+f*.7,N*f*.5],oe=s.earS*(h?1.2:1)*(s.ear==="long"?.62:1);if(Y==="none")continue;if(Y==="round"){d.ell(j,[f*.22,f*.25*oe,f*.1],l.BODY,{group:1,paint:Ae=>Ae[0]>j[0]+f*.02?l.EAR:void 0});continue}const he=Y==="long",xe=Y==="small"?-.6:0,q=f*.55*oe*(Y==="big"?1.35:he?2.2:1),ie=f*.3*(Y==="big"?1.2:he?1.35:1),W=C.norm([xe*.6-(he?.3:.12),1,N*.3]),pe=C.norm([.55,.2,N]),ce=C.norm(C.cross(pe,W));d.flat(C.add(j,C.mul(W,q)),ce,W,ie,q,Mr.ear(l.BODY,l.EAR,l.BODY3),{group:5+(N>0?0:20),extra:he}),Y==="tuft"&&d.seg(C.add(j,[0,q*1.4,N*.02]),C.add(j,[0,q*1.85,N*.04]),f*.05,f*.02,l.BODY3,{group:1})}const k=[-u*1.05,M-.1+A*.5,0],ee=t?.04:-.02;if(c("tails")||Rf(d,c("starTail")?"star":s.tail,k,u,M,ee),s.horns)for(const N of[-1,1]){const Y=o?.6:h?.35:c("hornsGlow")?1.4:1,j=[];for(let oe=0;oe<=8;oe++){const he=.3-oe/8*Math.PI*1.6,xe=f*.65*Y*(1-.45*oe/8);j.push([R[0]-f*.1+Math.cos(he)*xe,R[1]+f*.45+Math.sin(he)*xe,N*(f*.6+oe*.015)]),j[oe].push(f*.2*Y*(1-.6*oe/8))}d.chain(j,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(s.antlers||c("jackalope"))for(const N of[-1,1])Cf(d,s,[R[0]-f*.05,R[1]+f*.75,N*f*.4],N,e,c);if(s.tusks)for(const N of[-1,1]){const Y=o?.4:h?0:c("tusksBig")?1.3:.75;if(!Y)continue;const j=[U[0]+O*.25,U[1]-I*.4,N*I*.8];d.chain([[...j,.045*Y],[...C.add(j,[.1*Y,.1*Y,N*.03]),.04*Y],[...C.add(j,[.06*Y,.24*Y,N*.05]),.02*Y]],l.ACCENT,{group:8})}s.teeth&&!h&&d.ell([z[0]-f*.1,z[1]-f*.25,0],[f*.08,f*.14,f*.12],l.ACCENT,{group:1});const H=N=>[-u*.9+N*u*1.65,M+y*Math.max(0,1-Math.abs(N-.8)*3)+A*(1-Math.abs(N-.4)*2),0];if(c("wings"))for(const N of[-1,1])Qa(d,[u*.2,M,N*v*.5],N,1.15,t?.1:0,N>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(N>0?10:0));if(c("mane")||c("flames"))for(let N=0;N<7;N++){const Y=N/6,j=C.lerp(C.add(R,[-f*.5,f*.3,0]),H(.55),Y),oe=[.4,.3,.45,.28,.38,.25,.3][N],he=C.norm([-.35-(t?.1:0),1,0]);d.flat(C.add(j,C.mul(he,oe*.5)),[1,0,0],he,oe*.32,oe*.55,Mr.flame(N%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+N%2,extra:!0})}if(c("tails"))for(let N=0;N<7;N++){const Y=Math.PI*(.55+N*.08),j=(N-3)*.1,oe=C.add(k,[Math.cos(Y)*.9,Math.sin(Y)*.85,j]);d.chain([[...k,.1],[...C.lerp(k,oe,.5),.17],[...oe,.08]],N%2?l.BODY2:l.BODY,{group:70,extra:!0}),d.ell(oe,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((N,Y)=>{const j=H(N),oe=[.3,.5,.4,.6,.35][Y];d.ell(C.add(j,[0,oe*.45,(Y%2-.5)*.1]),[oe*.55,.08,.08],l.MAGIC,{dir:[(Y-2)*.12,1,0],group:80+Y%2,extra:!0,paint:he=>he[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let N=0;N<6;N++)d.ell(H(.08+N*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[N,Y]of[[.25,.55],[.5,.8],[.75,.45]]){const j=H(N);d.seg(j,C.add(j,[0,Y*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),d.ell(C.add(j,[0,Y*.8,0]),[Y*.28,Y*.26,Y*.28],l.LEAF2,{group:87,extra:!0,paint:oe=>oe[1]<j[1]+Y*.72?l.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const Y=H(N);d.ell(C.add(Y,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let N=0;N<3;N++){const Y=[];for(let j=0;j<9;j++){const oe=j/8;Y.push([u*(.5-oe*2.2),M+.05+N*.1+oe*(.25+N*.12)+Math.sin(oe*6+t+N)*.07,(N-1)*.18,.04*(1-oe*.6)])}d.chain(Y,N%2?l.MAGIC2:l.MAGIC,{group:90+N,extra:!0})}rc(d);const{sp:Z}=pn(d,{height:ic(e,i,s.hgt),facing:r});return a&&nc(Z,n.id.length*7919),Z}function Rf(n,e,t,i,r,s){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(C.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(C.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>si(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],l.BODY3,a))}function Cf(n,e,t,i,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),h=s("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const d=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const x=C.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,x,d*1.3,d*1.2,h,c);for(let g=0;g<5;g++){const v=.35+g*.3,S=C.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),y=(.24+.05*(g%2))*o;n.ell(C.add(x,C.mul(S,y*.55)),[y*.6,d*1.5,d*.6],h,{...c,dir:S,up:[0,0,1]})}return}const u=C.add(t,[-.18*o,.3*o,f*.4]),p=C.add(t,[-.25*o,.62*o,f*.8]),m=C.add(t,[-.1*o,.95*o,f]);n.chain([[...t,d*1.2],[...u,d],[...p,d*.85],[...m,d*.4]],h,c);const M=(x,g,v,S)=>n.seg(x,C.add(x,C.mul(C.norm(g),v)),S,S*.35,h,c);M(C.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,d*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,d*.7),o>.7&&(M(p,[.8,1,0],.28*o,d*.6),M(m,[.3,1,i*.2],.18*o,d*.5))}function Lf(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=e===0,h=m=>s&&n.legend.includes(m),c=new Ke,d=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+d;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,l.BODY2,{group:2});for(const x of[-.04,0,.04])c.ell([.16,.03+M,m*.15+x],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+d,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<u-f*.5?Math.floor(m[1]*18)%3===0&&si(m,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const m of[-1,1])c.ell([-.06,.58+d,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>si(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[f,f*.9,f],l.BODY);for(const m of[-1,1]){const M=C.norm([.75,-.05,m*.4+.35]),x=C.add(Ke.surface([0,u,0],[f,f*.9,f],M),C.mul(M,-f*.05));c.ell(x,[f*.22,f*.46,f*.4],l.BELLY,{group:1,dir:M});const g=C.add(x,C.mul(M,f*.14));c.ell(g,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),s?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(C.add(g,C.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),s?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(C.add(g,C.mul(M,f*.07))),o||c.ell([f*.05,u+f*.8,m*f*.6],[f*.32,f*.12,f*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(Ke.surface([0,u,0],[f,f*.9,f],C.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const m of[-1,1])Qa(c,[-.05,.8+d,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(h("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,u,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},rc(c);const{sp:p}=pn(c,{height:ic(e,i,.95),facing:r});return s&&nc(p,31),p}const er=(n,e,t,i,r,s,a=1)=>{for(const o of i)n.ell(Ke.surface(e,t,C.norm(o)),[r,r*1.2,r],s,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Ke.surface(e,t,C.norm(o))),size:r}},Cu=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function $n(n,e,t,i,r,s){rc(n);const{sp:a}=pn(n,{height:ic(t,i,r),facing:s});return t===3&&nc(a,e.id.length*131),a}const Lu=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(C.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},sc=(n,e)=>e.forEach(([t,i],r)=>n.ell(C.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?l.MAGIC2:void 0}));function Pf(n,e,t,i,r="towards"){const s=e===3,a=new Ke,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:f=>si(f,22,.3)?l.BODY3:si(f,19,.12)?l.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),p=f/46*.9+.05,m=C.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);m[0]>.55||a.ell(C.add(Ke.surface(h,c,m),C.mul(m,.02)),[.1,.025,.025],f%4?l.BODY2:l.BODY3,{dir:C.add(m,[-.4,0,0]),group:1})}const d=[.48,.22,0];return a.ell(d,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),er(a,d,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?l.MAGIC2:l.EYE),s&&sc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),$n(a,n,e,i,.6,r)}function Df(n,e,t,i,r="towards"){const s=e===3,a=new Ke,o=t?.05:0;for(const d of[-1,1])a.ell([-.22,.16,d*.36],[.24,.13,.12],d>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:d>0?6:2,paint:f=>si(f,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,d*.4],[.16,.04,.08],d>0?l.BODY:l.BODY2,{group:d>0?6:2}),a.seg([.35,.2+o,d*.24],[.42,.03,d*.3],.05,.04,d>0?l.BODY:l.BODY2,{group:d>0?7:2}),a.anchors.feet.push({c:[.45,.03,d*.3],r:.06,group:d>0?7:2},{c:[.12,.04,d*.4],r:.08,group:d>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:d=>d[1]<h[1]-.12?l.BELLY:d[0]>.38&&Math.abs(d[1]-(h[1]-.02))<.018?l.LINE:si(d,14,.22)?l.BODY3:void 0});for(const d of[-1,1]){const f=[.3,.55+o,d*.17];a.ell(f,[.1,.09,.1],l.BODY,{group:1}),a.ell(Ke.surface(f,[.1,.09,.1],C.norm([.6,.5,d*.5])),[.05,.05,.05],s?l.MAGIC2:l.IRIS,{group:1}),a.ell(Ke.surface(f,[.11,.1,.11],C.norm([.65,.45,d*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(d=>Ke.surface([.3,.55+o,d*.17],[.1,.09,.1],C.norm([.6,.5,d*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&Lu(a,[.15,.66+o,0],.16),$n(a,n,e,i,.55,r)}function If(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=u=>s&&n.legend.includes(u),h=new Ke,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const d=[.36,.84+c,0],f=a?.19:.16;if(h.ell(d,[f*1.1,f,f*.95],l.BODY,{paint:u=>u[1]>d[1]+f*.55?l.BELLY:void 0}),h.ell(C.add(d,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],l.NOSE,{dir:[1,-.2,0],group:1}),er(h,d,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,s?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])Qa(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return $n(h,n,e,i,.75,r)}function Of(n,e,t,i,r="towards"){const s=e===3,a=u=>s&&n.legend.includes(u),o=new Ke,h=t===0,c=.55,d=a("wingsBig")?1.5:1;Cu(o,0,.3*d);for(const u of[-1,1]){const p=[0,c+.05,u*.1],m=[.05,c+(h?.35:-.05),u*.45*d],M=[[-.05,c+(h?.45:-.15),u*.85*d],[-.25,c+(h?.2:-.25),u*.75*d],[-.3,c+(h?0:-.25),u*.4*d]],x=a("wingsBig")?l.MAGIC:l.BODY2,g=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,g,{group:11});for(const b of M)o.seg(m,b,.02,.012,g,{group:11});const v=C.sub(M[0],p),S=C.norm(v),y=C.norm(C.sub(M[2],m)),A=C.norm(C.sub(y,C.mul(S,C.dot(y,S))));o.flat(C.add(C.lerp(p,M[0],.5),C.mul(A,.12*d)),S,A,Math.hypot(...v)*.55,.3*d,Mr.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const f=[.08,c+.2,0];o.ell(f,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(C.add(f,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?l.EAR:void 0});return er(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?l.MAGIC2:l.EYE),o.ell(Ke.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),$n(o,n,e,i,.55,r)}function Nf(n,e,t,i,r="towards"){const s=e===3,a=new Ke,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let d=0;d<4;d++)a.ell(C.add(c,[.14,-.01,h*(d-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(Ke.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,h*.35])),[.015,.015,.015],s?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>Ke.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&Lu(a,[.15,.62,0],.15),$n(a,n,e,i,.55,r)}function Ff(n,e,t,i,r="towards"){const s=e===3,a=f=>s&&n.legend.includes(f),o=new Ke;for(const f of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,m=(u+(f>0?1:0)+t)%2?.06:-.06,M=[p,.22,f*.2];o.chain([[...M,.03],[p+m+(1-u)*.06,.32,f*.42,.025],[p+m*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?l.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),d=a("horn")?l.MAGIC:l.BODY3;for(const f of[-1,1]){const u=C.add(h,[.08,.02,f*.1]),p=C.add(u,[c*.7,c*.45,f*c*.15]),m=C.add(p,[c*.25,-c*.12,-f*c*.12]);o.chain([[...u,.045],[...p,.035],[...m,.015]],d,{group:8+(f>0?1:0)}),o.seg(C.lerp(u,p,.55),C.add(C.lerp(u,p,.55),[0,c*.22,0]),.02,.008,d,{group:8})}for(const f of[-1,1])o.chain([[...C.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],l.BODY3,{group:9,extra:!0});return er(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?l.MAGIC2:l.EYE,9),a("crystals")&&sc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),$n(o,n,e,i,.5,r)}function Uf(n,e,t,i,r="towards"){const s=e===3,a=new Ke,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const d of[-1,1])a.seg([.7+o,.32,d*.04],[.78+o,.55,d*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,d*.1],[.03,.03,.03],s?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(d=>[.78+o,.57,d*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=s?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:d=>{const f=Math.atan2(d[1]-h[1],d[0]-h[0]);return((Math.hypot(d[0]-h[0],d[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?l.MAGIC2:l.BODY3:void 0}}),$n(a,n,e,i,.45,r)}function kf(n,e,t,i,r="towards"){const s=e===3,a=new Ke;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,d=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+d,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),er(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?l.MAGIC2:l.EYE),s&&sc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),$n(a,n,e,i,.4,r)}function Bf(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=p=>s&&n.legend.includes(p),h=new Ke,c=t?.7:0,d=[];for(let p=0;p<=12;p++){const m=p/12;d.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}d.push([.38,.25,d[12][2],.07],[.42,.45,d[12][2]*.8,.065]),h.chain(d,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:si([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const f=[.5,.5,d[13][2]*.8],u=a?.11:.09;if(h.ell(f,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),er(h,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,s?l.MAGIC2:l.EYE),t||h.seg(C.add(f,[u*1.4,-u*.2,0]),C.add(f,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:C.add(d[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,d[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Qa(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return $n(h,n,e,i,.45,r)}function zf(n,e,t,i,r="towards"){const s=e===3,a=u=>s&&n.legend.includes(u),o=new Ke,h=t===0,c=.55,d=a("wingsBig")?1.45:1,f=a("wingsBig")?l.MAGIC:l.BODY;Cu(o,0,.3*d);for(const u of[-1,1]){const p=h?.5:-.1,m=C.norm([.35,p,u]),M=C.norm([-.3,p*.6,u]);o.flat(C.add([0,c,u*.05],C.mul(m,.38*d)),m,C.norm(C.cross(m,[0,1,0])),.4*d,.24*d,Mr.spotted(f,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(C.add([-.05,c,u*.05],C.mul(M,.26*d)),M,C.norm(C.cross(M,[0,1,0])),.27*d,.17*d,Mr.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>si(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),er(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?l.MAGIC2:l.EYE),$n(o,n,e,i,.5,r)}function Hf(n,e,t,i,r="towards"){const s=e===3,a=c=>s&&n.legend.includes(c),o=new Ke,h=t?.05:0;for(let c=0;c<9;c++){const d=c/8,f=-.6+d*1.15;o.ell([f,.12+Math.sin(d*Math.PI)*(.06+h),0],[.08,.1-d*.02,.12-d*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),er(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?l.MAGIC2:l.EYE),$n(o,n,e,i,.4,r)}function Gf(n,e,t,i,r="towards"){const s=e===3,a=d=>s&&n.legend.includes(d),o=new Ke,h=[.15,.28,0];for(const d of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,p=(f+(d>0?0:1)+t)%2?.05:-.05,m=C.add(h,[.05-f*.04,0,d*.1]),M=C.add(m,[Math.cos(u)*.3*(f<2?1:-.6)+p,.3,d*.3]),x=C.add(m,[Math.cos(u)*.55*(f<2?1:-.8)+p*1.5,-.28,d*.55]);o.chain([[...m,.03],[...M,.028],[...x,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:d=>(Math.abs(d[2])<.03||Math.abs(d[0]+.28)<.03)&&d[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([d,f])=>Ke.surface(h,[.18,.13,.17],C.norm([.9,d*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[d,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Ke.surface(h,[.18,.13,.17],C.norm([.9,d*6,f*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let d=0;d<5;d++){const f=Math.PI*(.2+d/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(d-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+d,extra:!0})}return $n(o,n,e,i,.5,r)}const Wf=new Map(Object.entries({owl:Lf,hedgehog:Pf,toad:Df,raven:If,bat:Of,mole:Nf,beetle:Ff,snail:Uf,woodlouse:kf,snake:Bf,moth:zf,glowworm:Hf,spider:Gf})),ac=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Pu=Object.fromEntries(ac.map(n=>[n.id,n])),ol=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],ll={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Vf=["bar","star","heart"];function Yf(n,e=!0){const t=Ns((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*ol.length):null,glasses:i||t()<.4?Vf[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(ll)[Math.floor(t()*3)]:null}}function Xf(n,e,t=null){const i=Kf(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[r,s,a]=ol[t.hat%ol.length];i[l.HAT1]=r,i[l.HAT2]=s,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=ll[t.shoes]||ll.sneakers;i[l.SHOE]=r,i[l.SOLE]=s}if(t.woken){i[l.WOKEN]=[255,40,36];for(const r of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[r]&&(i[r]=i[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return i}function Kf(n,e){const t=Pu[n],i=e.cVal/.85,r=e.cSat/.6,s=le(t.hue,t.sat*r*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:le(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=le(e.magicHue+t.hue*.3,.6,1),h=le(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:s,[l.BODY2]:le(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[l.BODY3]:le(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:le(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:le(.3,.55,.55),[l.LEAF2]:le(.25,.5,.75),[l.LEAF3]:le(.33,.6,.35),[l.TRUNK]:le(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:le(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:le(.12,.7,.85),[l.SKIN]:[238,158,192]}}const qf=["size","growth","pixel","head","eye","legs","long","fur"],ps=new Map;function $f(n,e,t,i,r="towards",s=null){const a=Pu[n]||ac[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,h=[a.id,e,t,r,...qf.map(d=>i[d]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=ps.get(h);if(!c){if(c=wf(o,()=>a.q?Tf(a,e,t,i,r):Wf.get(a.plan)(a,e,t,i,r)),o?.woken)for(let d=0;d<c.m.length;d++)(c.m[d]===l.EYE||c.m[d]===l.IRIS||c.m[d]===l.PUPIL)&&(c.m[d]=l.WOKEN);ps.size>600&&ps.delete(ps.keys().next().value),ps.set(h,c)}return c}const ja=.07,oc=.048,Je=(...n)=>({l:n}),Tt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),un=(n,e)=>({d:[n,e]}),Mt=(n,e=.86)=>Je([.5,e],[.5,n]),vt=Tt(.5,.76,.13,25,155),Zf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},_t=(...n)=>n.flatMap(e=>[e,Zf(e)]);function Ti(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],s=Math.hypot(i,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,d=r/s,f=-i/s,u=(o-Math.abs(a))*Math.sign(a),p=h-d*u,m=c-f*u,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let g=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;g>180;)g-=360;for(;g<-180;)g+=360;return Tt(p,m,o,M,M+g)}const Jf=(n,e,t,i,r,s=24)=>Je(...Array.from({length:s+1},(a,o)=>[n+i*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),Qf=(n,e,t,i,r,s=0,a=40)=>Je(...Array.from({length:a+1},(o,h)=>{const c=h/a,d=(s+c*r*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(d),e+f*Math.sin(d)]})),Ys=(n,e,t,i,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return Je([n+t*a,e+t*o],[n+i*a,e+i*o])}),jf={wolf:[Mt(.3),Je([.28,.08],[.5,.3],[.72,.08]),Tt(.5,.55,.2,-55,55),vt,un(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[Mt(.34),Je([.36,.06],[.5,.34],[.64,.06]),Tt(.67,.66,.17,180,-80),un(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),vt],badger:[Mt(.1),Je([.24,.3],[.76,.3]),..._t(Je([.33,.14],[.33,.56])),vt,..._t(un(.24,.3))],boar:[Mt(.16),..._t(Tt(.36,.24,.15,45,180)),...Ys(.5,.16,0,.1,[-130,-90,-50]),vt],stag:[Mt(.42),..._t(Je([.5,.42],[.34,.26],[.3,.06]),Je([.335,.25],[.16,.2]),Je([.32,.15],[.18,.07])),vt],hare:[Mt(.44),..._t(Je([.5,.44],[.4,.34],[.38,.06])),Tt(.62,.66,.09,180,540),vt,..._t(un(.38,.06))],owl:[Mt(.44),..._t(Tt(.33,.3,.13,0,360),Je([.24,.18],[.18,.05])),vt,..._t(un(.33,.3))],bear:[Mt(.24),Je([.24,.3],[.76,.3]),..._t(Tt(.3,.3,.09,180,360)),..._t(Je([.36,.5],[.32,.62])),vt],hedgehog:[Mt(.52),Tt(.5,.52,.2,180,360),...Ys(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),vt],squirrel:[Mt(.2),Je([.5,.2],[.4,.08]),Tt(.66,.4,.16,100,-200),un(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),vt],toad:[Mt(.42),Je([.16,.54],[.24,.42],[.76,.42],[.84,.54]),..._t(Tt(.34,.3,.1,0,360)),vt,..._t(un(.16,.54))],otter:[Mt(.24),Tt(.5,.5,.28,-100,100),un(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ti([.18,.64],[.36,.64],.3),vt],lynx:[Mt(.32),Je([.26,.2],[.5,.32],[.74,.2]),..._t(Je([.26,.2],[.26,.06])),Je([.5,.68],[.66,.62]),vt,..._t(un(.26,.06))],elk:[Mt(.3),..._t(Je([.5,.3],[.42,.2]),Tt(.3,.16,.12,0,180),Je([.18,.16],[.14,.06])),Je([.5,.44],[.6,.52]),vt],raven:[Mt(.14),Je([.5,.14],[.3,.22]),Je([.18,.56],[.5,.38],[.82,.56]),vt,un(.58,.17),..._t(un(.18,.56))],bat:[Mt(.3),Tt(.5,.16,.14,20,160),..._t(Je([.5,.38],[.12,.26]),Ti([.12,.26],[.24,.46],-.25),Ti([.24,.46],[.38,.5],-.3),Ti([.38,.5],[.5,.52],-.3)),vt],mole:[Mt(.44),Tt(.5,.3,.16,0,180),...Ys(.5,.3,.19,.3,[-160,-125,-55,-20]),Je([.5,.14],[.5,.04]),vt],beaver:[Mt(.36),Je([.32,.2],[.68,.2]),..._t(Je([.44,.2],[.44,.34])),Je([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),vt],stoat:[Mt(.18),Tt(.5,.44,.24,180,360),Je([.5,.18],[.6,.08]),vt,..._t(un(.26,.44))],snail:[Mt(.52),Qf(.5,.33,.03,.2,1.6,90),Je([.66,.2],[.76,.06]),vt,un(.76,.06)],ram:[Mt(.24),..._t(Tt(.36,.24,.14,0,-250)),vt,..._t(un(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[Mt(.24),Tt(.5,.52,.22,205,335),Tt(.5,.66,.24,205,335),Tt(.5,.38,.2,205,335),..._t(Je([.5,.24],[.32,.06])),vt],snake:[Mt(.16),Jf(.5,.82,.2,.2,1.25),Je([.5,.2],[.5,.11]),..._t(Je([.5,.11],[.42,.045])),vt],moth:[Mt(.2),..._t(Je([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Je([.5,.5],[.3,.64],[.5,.66]),Tt(.38,.16,.12,0,-110)),vt],marten:[Mt(.32),Je([.3,.2],[.5,.32],[.7,.2]),..._t(Tt(.3,.14,.07,90,-180)),Tt(.28,.56,.22,0,150),un(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),vt],salamander:[Mt(.3),Ti([.5,.3],[.5,.06],.35),Ti([.5,.3],[.5,.06],-.35),..._t(Je([.5,.42],[.32,.38],[.26,.48]),Je([.5,.64],[.32,.6],[.26,.7])),vt,..._t(un(.38,.52))],glowworm:[Mt(.4),Tt(.5,.27,.1,90,450),...Ys(.5,.27,.15,.25,[0,60,120,180,240,300]),vt],spider:[Je([.5,.05],[.5,.3]),Mt(.5),Tt(.5,.4,.11,-90,270),..._t(...[-150,-170,170,150].map(n=>Je([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),vt,un(.5,.05)],dormouse:[Mt(.12),Tt(.5,.46,.24,-60,250),..._t(Tt(.34,.16,.08,90,-180)),Ti([.56,.38],[.7,.38],-.4),vt],beetle:[Mt(.36),..._t(Tt(.66,.26,.2,160,250)),Ti([.5,.38],[.5,.82],.25),Ti([.5,.38],[.5,.82],-.25),vt]},Zc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},e0={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},Ls=n=>Zc[e0[n]]||Zc.cyan,t0=[255,255,250],n0=(n,e,t)=>n.map((i,r)=>Math.round(i+(e[r]-i)*t)),Jc=n=>`rgb(${n.join(",")})`;function i0(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Sa(n){if(n.d)return{dot:!0,pts:[n.d],len:oc*2};let e=n.l;if(n.a){const[i,r,s,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,d)=>{const f=(a+(o-a)*d/h)*Math.PI/180;return[i+s*Math.cos(f),r+s*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const cl=(n,e=0,t=1)=>{const i=n.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of n)s.start=e+(t-e)*r/i,r+=s.len,s.end=e+(t-e)*r/i;return n},fo=new Map;function Du(n){return fo.has(n)||fo.set(n,cl((jf[n]||[]).map(e=>({...Sa(e),w:ja,part:"sigil"})))),fo.get(n)}const po=new Map;function r0(n,e=0){const t=n+":"+e;if(po.has(t))return po.get(t);const i=e===null?null:i0(e),r=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,s=(1-r)/2,a=i?i.core:1,o=ja*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=m=>Sa({a:[.5,.5,m,90,450]});for(let m=0;m<i.rings;m++)h.push({...p(.44-m*.06),w:o,part:"ring"});for(let m=0;m<i.dots;m++){const M=(90+m*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let m=0;m<16;m++){const M=(90+m*22.5)*Math.PI/180,x=.44-.06+.014,g=.44-.014;h.push({...Sa({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let m=0;m<i.rays;m++){const M=(90+m*360/i.rays)*Math.PI/180,x=.44+.02,g=.5-o/2;h.push({...Sa({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),d=Du(n).map(u=>({dot:u.dot,len:u.len*r,pts:u.pts.map(([p,m])=>[s+p*r,s+m*r]),w:u.w*r*c,r:oc*r*c,part:"sigil"})),f={level:e,frame:i,k:r,strokes:[...cl(h,0,h.length?.15:0),...cl(d,h.length?.15:0,1)]};return po.set(t,f),f}function s0(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let r=1;r<n.pts.length;r++){const s=n.pts[r-1],a=n.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){i.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}i.push(a),t-=o}return i}function a0(n,e,{x:t=0,y:i=0,size:r=64,level:s=null,colour:a=Ls(e),progress:o=1,glow:h=!0}={}){const c=r0(e,s),d=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(r,r),n.lineCap="round",n.lineJoin="round";const f=(u,p,m,M)=>{n.globalAlpha=m,n.strokeStyle=n.fillStyle=Jc(u),n.shadowColor=Jc(a),n.shadowBlur=M;for(const x of c.strokes){const g=s0(x,o);if(g){if(n.beginPath(),x.dot){n.arc(g[0][0],g[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,g.forEach((v,S)=>S?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(f(a,2.4,Math.min(d,.7)*.55,r/12),f(n0(a,t0,.72),.62,1,r/30)):f(a,1,1,0),n.restore()}function o0(n,e,t,i){let r=1/0;for(const s of n){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<oc+i-ja/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const h=s.pts[o-1],c=s.pts[o],d=c[0]-h[0],f=c[1]-h[1],u=d*d+f*f,p=Math.sqrt(u),m=u?Math.max(0,Math.min(1,((e-h[0])*d+(t-h[1])*f)/u)):0;if(Math.hypot(e-h[0]-d*m,t-h[1]-f*m)<i){const M=s.start+(a+m*p)/s.len*(s.end-s.start);M<r&&(r=M)}a+=p}}return r}function l0(n,e,t,i=ja/2){return o0(Du(n),e,t,i)<1/0}ac.map(n=>n.id);const As=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function _n(n,e,t,i,r,s,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const d=[];for(let g=0;g<9;g++){const v=g/9*Math.PI*2,S=1+(s()-.5)*.35*(r.clump+.3);d.push([e[0]+Math.cos(v)*t*S,e[1]+Math.sin(v)*i*S*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Ja(d,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:r.round}),n.mark([mt(e,[-t*1.1,i*.15]),mt(e,[t*1.1,i*.1]),mt(e,[t*1.1,i*1.2]),mt(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([mt(e,[-t*.75,-i*.55]),mt(e,[t*.25,-i*.95]),mt(e,[t*.55,-i*.35]),mt(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),x=s()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const S=n.get(v,g);if(S!==a&&S!==l.LEAF2&&S!==l.LEAF3)continue;const y=ht(v,g,x),A=vi(v/2,g/2,x)*.5+y*.5;A<.16*r.density?n.recolour(v,g,S===l.LEAF2?a:l.LEAF2):A>1-.16*r.density&&n.recolour(v,g,S===l.LEAF3?a:l.LEAF3)}}function mn(n,e,t,i,r,s,a,o,{mat:h=l.TRUNK,bend:c=1,group:d=10,line:f=!1}={}){const u=[e],p=4;let m=t,M=e;for(let x=1;x<=p;x++)m+=(o()-.5)*.7*a.gnarl*c,M=mt(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),u.push(M);return n.limb(u.map((x,g)=>[...x,r+(s-r)*g/p]),h,{group:d,line:f,round:a.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:u}}function zi(n,e,t,i,r,s,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,d=(8+s()*16)*a*(.4+r.roots),f=(2+s()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+d*.4),t-f],m=[e+c*(i*.5+d),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function tr(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const s=i*n.w+r;if(n.m[s]!==l.TRUNK)continue;const a=t?vi(r/1.3,i/6,21):vi(r/6,i/1.3,21);a>1-e.bark*.42||ht(r,i,4)<e.bark*.05?n.m[s]=l.BARKD:a>1-e.bark*.62&&n.n[s*3]<-.1&&(n.m[s]=l.BARKL)}}function zn(n,e,t){let i=n.w,r=-1,s=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),s=Math.min(s,u));if(r<0)return{sp:n,crownY:t};const a=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,s-1),d=n.h-c,f=new ft(h,d);for(let u=0;u<d;u++)for(let p=0;p<h;p++){const m=(u+c)*n.w+p+o,M=u*h+p;f.m[M]=n.m[m],f.g[M]=n.g[m],f.n[M*3]=n.n[m*3],f.n[M*3+1]=n.n[m*3+1],f.n[M*3+2]=n.n[m*3+2]}return{sp:f,crownY:t-c}}const oi=n=>(n.crownWidth||3)/3;function c0(n,e,t){const i=oi(e),r=Math.round(220*t*i+60*t),s=Math.round(140*t),a=new ft(r,s),o=r/2,h=s,c=e.treeTrunks||1,d=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=s;const m=(M,x,g,v,S)=>{const y=mn(a,M,x,g,v,v*.65,e,n,{group:12});if(S===0){u.push(y.end);return}const A=n()<.35?3:2;for(let b=0;b<A;b++){const E=(b-(A-1)/2)*de(n,.5,.85)*(S===3?1.4:1);m(y.end,y.ang+E+(n()-.5)*.25,g*de(n,.6,.78),v*.62,S-1)}S<=2&&u.push(An(M,y.end,.7))};for(let M=0;M<c;M++){const x=f+(c>1?(M/(c-1)-.5)*.8:0),g=[o+(M-(c-1)/2)*d*.6,h],v=mn(a,g,-Math.PI/2+x,s*.36*(c>1?de(n,.75,1.15):1),d,d*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const S of[-1,1])m(v.end,-Math.PI/2+x*.5+S*de(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),s*.22*(.75+.25*i)*(c>1?.7:1),d*.7,c>2?2:3);if(c===1&&n()<.7&&m(v.end,-Math.PI/2+(n()-.5)*.3,s*.18,d*.55,2),M===0&&e.treeHollow){const S=An(g,v.end,.38);a.ellipse(S[0],S[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(zi(a,o,h,d*Math.sqrt(c),e,n,t),tr(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const x=u[M],g=u[M+1],v=Math.hypot(g[0]-x[0],g[1]-x[1]);if(v<40*t)for(let S=0;S<=v;S++){const y=An(x,g,S/v);a.px(y[0],y[1]+Math.sin(S/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return zn(a,o,p+4*t);u.sort((M,x)=>M[1]-x[1]);for(const M of u)_n(a,mt(M,[0,-3*t]),de(n,14,21)*t,de(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&_n(a,mt(M,[de(n,-9,9)*t,de(n,-12,-3)*t]),de(n,10,15)*t,de(n,7,10)*t,e,n);return zn(a,o,p+4*t)}function h0(n,e,t){const i=.8+.2*oi(e),r=Math.round(90*t*i),s=Math.round(160*t),a=new ft(r,s),o=r/2,h=s;a.limb([[o,h,6*t],[o,h-s*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),zi(a,o,h,6*t,e,n,t*.6),tr(a,e);const c=Math.round(de(n,9,12));for(let d=c-1;d>=0;d--){const f=d/(c-1),u=6*t+f*s*.7,p=(5+f*36)*t*i*de(n,.9,1.1),m=(5+f*13)*t,M=[[o,u-4*t],[o+p*.5,u+m*.3],[o+p,u+m],[o+p*.7,u+m*1.15],[o,u+m*.7],[o-p*.7,u+m*1.15],[o-p,u+m],[o-p*.5,u+m*.3]];a.shape(Ja(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+d,line:!1,round:e.round}),a.mark([[o-p,u+m*.55],[o+p,u+m*.55],[o+p,u+m*1.4],[o-p,u+m*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+m*.45],[o-p*.7,u+m*.7]],l.LEAF2,[l.LEAF])}return zn(a,o,s*.82)}function u0(n,e,t){const i=oi(e),r=Math.round(200*t*i+50*t),s=Math.round(130*t),a=new ft(r,s),o=r/2,h=s,c=13*t,d=mn(a,[o,h],-Math.PI/2+(n()-.5)*.3,s*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let m=0;m<5;m++){const M=m%2?1:-1,x=-Math.PI/2+M*de(n,.55,1.25)*(.7+.3*i),g=mn(a,d.end,x,s*de(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(g.end)}zi(a,o,h,c,e,n,t),tr(a,e);for(const m of f)_n(a,mt(m,[0,-2*t]),de(n,20,28)*t,de(n,9,12)*t,e,n);_n(a,mt(d.end,[0,-8*t]),24*t,11*t,e,n);let u=r,p=0;for(const m of f)u=Math.min(u,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=u;m<p;m+=de(n,1,1.7)){let M=s;for(let S=0;S<s;S++)if(a.get(m,S)===l.LEAF||a.get(m,S)===l.LEAF2||a.get(m,S)===l.LEAF3){M=S;break}if(M>=s)continue;const x=Math.abs(m-o)/(r/2),g=(h-M)*de(n,.5,.9)*(1-x*.3),v=ht(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let S=M+2;S<Math.min(h-2,M+g);S++){const y=Math.round(Math.sin(S*.12+m)*.7);ht(m|0,S,5)<.2+e.density*.8&&a.px(m+y,S,(S-M)/g>.8?l.LEAF3:v,y*.3,.2,.95)}}return zn(a,o,d.end[1]+6*t)}function Iu(n,e,t){const i=.7+.3*oi(e),r=Math.round(110*t*i),s=Math.round(155*t),a=new ft(r,s),o=r/2,h=s,c=(n()-.5)*.25+(e.treeLean||0),d=mn(a,[o,h],-Math.PI/2+c,s*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<d.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const m=An(d.pts[u],d.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(m[0]+M,m[1])===l.BARK2&&n()<.8&&a.recolour(m[0]+M,m[1],l.BARKD)}const f=[d.end];for(let u=0;u<7;u++){const p=de(n,.35,.9),m=An(d.pts[0],d.end,p),M=u%2?1:-1,x=mn(a,m,-Math.PI/2+M*de(n,.5,1),s*de(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});f.push(x.end)}for(const u of f)_n(a,u,de(n,9,13)*t*i,de(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return zn(a,o,s*.55)}function d0(n,e,t){const i=oi(e),r=Math.round(220*t*i+50*t),s=Math.round(120*t),a=new ft(r,s),o=r/2,h=s,c=10*t,d=mn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),s*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const m of[-1,1,-1,1]){const M=mn(a,d.end,-Math.PI/2+m*de(n,.7,1.15)*(.7+.3*i),s*de(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(M.end,An(d.end,M.end,.55))}zi(a,o,h,c,e,n,t),tr(a,e);const u=Math.round(de(n,2,3)),p=Math.min(...f.map(m=>m[1]));for(let m=0;m<u;m++){const M=p-6*t+m*9*t,x=(95-m*12)*t*(.65+.35*i);for(let g=0;g<5;g++)_n(a,[o+(g-2)*x*.36+de(n,-5,5)*t,M+de(n,-3,3)*t],x*de(n,.2,.26),7*t,e,n,{mat:m===u-1?l.LEAF:l.LEAF3})}return zn(a,o,d.end[1]+4*t)}function as(n,e,t,i,r,{grain:s=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:d=!1,mats:f=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),x=r()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const S=n.get(v,g);if(!f.includes(S))continue;const y=vi(v/s,g/s,x),A=ht(v,g,x);a&&y<a?n.recolour(v,g,l.LEAF3):y>1-o&&n.recolour(v,g,l.LEAF2),h&&A<h&&S!==l.LEAF3&&(n.recolour(v,g,c),d&&n.recolour(v,g-1,c))}}function Hi(n,e,t,i){const r=oi(e)*(i.wide||1),s=Math.round(240*t*r+70*t),a=Math.round((i.tall||140)*t),o=new ft(s,a),h=s/2,c=a,d=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(d),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=a;const M=(A,b,E,_,w)=>{const L=mn(o,A,b,E,_,_*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(w===0){p.push(L.end);return}const R=n()<(i.fork??.35)?3:2;for(let P=0;P<R;P++)M(L.end,L.ang+(P-(R-1)/2)*de(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,E*de(n,.6,.78),_*.62,w-1);w<=2&&p.push(An(A,L.end,.7))};for(let A=0;A<d;A++){const b=u+(d>1?(A/(d-1)-.5)*(i.fan||.8):0),E=[h+(A-(d-1)/2)*f*.6,c],_=mn(o,E,-Math.PI/2+b,a*(i.trunk||.36)*(d>1?de(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,_.end[1]);for(let w=0;w<(i.limbs||2);w++){const L=w%2?1:-1;M(_.end,-Math.PI/2+b*.5+L*de(n,.5,1)*(i.spreadA||.8)*(d>1?.7:1),a*(i.limb||.22)*(d>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,f*.55,2),A===0&&e.treeHollow){const w=An(E,_.end,.38);o.ellipse(w[0],w[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(i.noRoots||zi(o,h,c,f*Math.sqrt(d),e,n,t*(i.rootK||1)),i.smooth||tr(o,e),e.treeBare)return zn(o,h,m+4*t);p.sort((A,b)=>A[1]-b[1]);const[x,g]=i.clumpR||[12,18],v=i.flat||.7,S=[],y=(A,b,E,_)=>{_n(o,A,b,E,e,n,{mat:_,ragged:i.ragged||1}),S.push([A,b,E])};for(const A of p)y(mt(A,[0,-3*t]),de(n,x,g)*t,de(n,x,g)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const A of p)n()<(i.extra??.7)&&y(mt(A,[de(n,-9,9)*t,de(n,-12,-3)*t]),de(n,x,g)*t*.7,de(n,x,g)*t*v*.7,l.LEAF);if(i.dome){const A=Math.min(...p.map(w=>w[1])),b=p.map(w=>w[0]),E=(Math.min(...b)+Math.max(...b))/2,_=(Math.max(...b)-Math.min(...b))/2;for(let w=0;w<i.dome;w++){const L=w/Math.max(1,i.dome-1)-.5;y([E+L*_*1.1,A-(1-4*L*L)*14*t-de(n,2,6)*t],de(n,x,g)*t*1.1,de(n,x,g)*t*v,l.LEAF)}}if(i.layers)for(const[A,b,E]of S)for(let _=-E;_<E;_+=Math.max(3,i.layers*t))for(let w=-b;w<b;w++)o.get(A[0]+w,A[1]+_)===l.LEAF&&o.recolour(A[0]+w,A[1]+_,l.LEAF3);for(const[A,b,E]of S)as(o,A,b,E,n,i.tex||{});return zn(o,h,m+4*t)}function f0(n,e,t){return Hi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function p0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function m0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function g0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function x0(n,e,t){return Hi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function M0(n,e,t){return Hi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function v0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function _0(n,e,t){const i=.7+.3*oi(e),r=Math.round(110*t*i),s=Math.round(165*t),a=new ft(r,s),o=r/2,h=s,c=e.treeTrunks||1,d=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<c;p++){const m=mn(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+d+(c>1?(p/(c-1)-.5)*.3:0),s*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const x=de(n,.3,.97),g=An(m.pts[0],m.end,x),v=M%2?1:-1,S=(1-x*.6)*s*.12*i,y=mn(a,g,-Math.PI/2+v*de(n,.7,1.2),S,2*t,1,e,n,{group:12,mat:l.BARKD});f.push([y.end,(8+(1-x)*6)*t*i],[An(g,y.end,.4),(7+(1-x)*4)*t*i])}f.push([m.end,7*t])}zi(a,o,h,6*t,e,n,t*.6),tr(a,e);for(const[p,m]of f)_n(a,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of f)as(a,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...f.map(([p])=>p[1]));return zn(a,o,u+(h-u)*.45)}function b0(n,e,t){const i=.8+.2*oi(e),r=Math.round(150*t*i),s=Math.round(175*t),a=new ft(r,s),o=r/2,h=s,c=mn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),s*.78,8*t,3*t,e,n,{bend:.7});tr(a,e);for(let f=0;f<a.h*.55;f++)for(let u=0;u<r;u++)(a.get(u,f)===l.TRUNK||a.get(u,f)===l.BARKD)&&a.recolour(u,f,ht(u,f,3)<.15?l.BARKD:l.BELLY);zi(a,o,h,8*t,e,n,t*.7);const d=[];for(let f=0;f<6;f++){const u=de(n,.55,1),p=An(c.pts[0],c.end,u),m=f%2?1:-1,M=mn(a,p,-Math.PI/2+m*de(n,.6,1.3),s*de(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});d.push(M.end)}d.push(c.end);for(const f of d)_n(a,mt(f,[0,-2*t]),de(n,13,19)*t*i,de(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const f of d)as(a,mt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return zn(a,o,Math.min(...d.map(f=>f[1]))+8*t)}function y0(n,e,t){const i=oi(e),r=Math.round(200*t*i+50*t),s=Math.round(120*t),a=new ft(r,s),o=r/2,h=s,c=e.treeTrunks||3,d=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)mn(a,[o+(p-(c-1)/2)*d*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),s*.3,d,d*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<s;p++)for(let m=0;m<r;m++)a.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&a.recolour(m,p,l.BARKD);zi(a,o,h,d*1.4,e,n,t);const f=h-s*.3,u=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(m)*M,f+Math.sin(m)*M*.55+10*t],de(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,f-de(n,4,22)*t],de(n,20,26)*t]);u.push([[o,f-24*t],26*t]);for(const[p,m]of u)_n(a,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of u)as(a,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return zn(a,o,f+4*t)}function S0(n,e,t){return Hi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function w0(n,e,t){const i=.8+.2*oi(e),r=Math.round(110*t*i),s=Math.round(130*t),a=new ft(r,s),o=r/2,h=s;a.limb([[o,h,5*t],[o,h-s*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let d=0;d<10;d++){const f=d/9,u=10*t+f*s*.72,p=(5+f*28)*t*i,m=1+Math.round(f*3);for(let M=0;M<m;M++)c.push([[o+(m>1?(M/(m-1)-.5)*p*1.3:0)+de(n,-2,2)*t,u+de(n,-2,2)*t],(6+f*5)*t])}for(const[d,f]of c)_n(a,d,f*1.2,f,e,n,{mat:l.LEAF3,ragged:.7});for(const[d,f]of c)as(a,d,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return zn(a,o,s*.85)}function E0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function A0(n,e,t){const i=Iu(n,{...e,treeLean:e.treeLean||0},t),r=i.sp;for(let s=0;s<r.w;s++){let a=-1;for(let h=0;h<r.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(r.get(s,h))){a=h;break}if(a<0||ht(s,1,7)<.35)continue;const o=(r.h-a)*de(n,.25,.5);for(let h=a+1;h<Math.min(r.h-3,a+o);h++)(!r.get(s,h)||r.get(s,h)===l.LEAF3)&&r.px(s+Math.round(Math.sin(h*.2+s)*.6),h,ht(s,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function T0(n,e,t){const i=.8+.2*oi(e),r=Math.round(100*t*i),s=Math.round(170*t),a=new ft(r,s),o=r/2,h=s;a.limb([[o,h,6*t],[o,h-s*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),zi(a,o,h,6*t,e,n,t*.5),tr(a,e);const c=14;for(let d=0;d<c;d++){const f=d/(c-1),u=8*t+f*s*.68,p=(4+f*30)*t*i;for(let m=0;m<4;m++){const M=[o+(m/3-.5)*p*1.6,u+Math.abs(m/3-.5)*6*t];_n(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),as(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return zn(a,o,s*.8)}const R0=6;function C0(n,e,t,i,r){const{sp:s,crownY:a}=n,o=s.w,h=s.h,c=s.low||(s.low=new Uint8Array(o*h)),d=Math.ceil(a+R0*i);if(d>=h-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,m=w=>{const L=[];let R=-1;for(let P=0;P<=o;P++){const O=P<o&&As.has(s.m[w*o+P]);O&&R<0&&(R=P),!O&&R>=0&&(L.push([R,P-1]),R=-1)}return L},M=(w,L)=>w.reduce((R,P)=>!R||Math.abs((P[0]+P[1])/2-L)<Math.abs((R[0]+R[1])/2-L)?P:R,null),x=w=>{const L=s.m.slice(),R=s.n.slice();w();for(let P=0;P<L.length;P++)s.m[P]!==L[P]&&((P/o|0)<d||L[P]&&!As.has(L[P])&&!c[P]?(s.m[P]=L[P],s.n[P*3]=R[P*3],s.n[P*3+1]=R[P*3+1],s.n[P*3+2]=R[P*3+2]):c[P]=1)},g=()=>{for(let w=0;w<8;w++){const L=Math.round(de(e,d,h-3)),R=m(L);if(R.length){const P=ec(e,R),O=e()<.5?-1:1;return{x:O<0?P[0]:P[1],y:L,side:O}}}return null},v=p?0:1,S=h-1;let y=o,A=0;for(let w=0;w<d*o;w++)if(s.m[w]&&!As.has(s.m[w])){const L=w%o;y=Math.min(y,L),A=Math.max(A,L)}const b=Math.max(6*i,(A-y)*.22);r.moss&&x(()=>{for(let w=Math.max(d,Math.round(h-(h-d)*.4));w<h;w++)for(let L=0;L<o;L++){const R=w*o+L;if(!As.has(s.m[R]))continue;const P=w>0&&!s.m[R-o];(vi(L/2.5,w/2.5,41)>1-r.moss*(.35+.4*(w-d)/(h-d))||P&&ht(L,w,9)<r.moss*.6)&&(s.m[R]=ht(L,w,5)<.3?l.LEAF2:l.LEAF)}}),r.ivy&&e()<.35+r.ivy*.6&&x(()=>{let w=o/2;const L=S-(S-d)*de(e,.45,.95)*Math.min(1,r.ivy+.3),R=e()*6;for(let P=S-1;P>L;P--){const O=M(m(P),w);if(!O)break;if(w=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(P*.22+R)),s.px(w,P,l.LEAF3,0,0,1),ht(Math.round(w),P,13)<.45){const I=ht(P,3,2)<.5?-1:1;s.px(w+I,P,l.LEAF,I*.5,-.3,.8),s.px(w+I*2,P,l.LEAF3,I*.6,0,.8),s.px(w+I,P-1,ht(w,P,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const E=Math.round(r.sprigs*v*(5+8*u)*(h-d)/(40*i));for(let w=0;w<E;w++){const L=g();if(!L)break;const R=de(e,3,5.5)*i;x(()=>_n(s,[L.x+L.side*R*.6,L.y],R,R*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const _=Math.round(r.boughs*v*(3+4*u)*(h-d)/(45*i)+(e()<r.boughs*v?1:0));for(let w=0;w<_;w++){const L=g();if(!L)break;x(()=>{const R=mn(s,[L.x,L.y],-Math.PI/2+L.side*de(e,.9,1.35),Math.min(b,de(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),P=de(e,6,9.5)*i;_n(s,mt(R.end,[0,-1*i]),P,P*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(r.skirt&&v){const w=Math.round(3+r.skirt*5+u*3);for(let L=0;L<w;L++)x(()=>{const R=Math.round(de(e,Math.max(d,h-(h-d)*.8),h-4*i)),P=M(m(R),o/2);if(!P)return;const O=L%2?1:-1,I=O<0?P[0]:P[1],U=Math.min(b*1.3,de(e,14,24)*i*(.6+r.skirt*.5)),z=mn(s,[I,R],-Math.PI/2+O*de(e,1.6,1.95),U,1.6*i,1,t,e,{group:12,mat:l.BARKD});_n(s,An([I,R],z.end,.6),U*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const L0={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},P0=(n,e)=>(t,i,r)=>C0(n(t,i,r),t,i,r,e),Ia={broad:{fn:c0,name:"gnarled broadleaf",grow:"normal"},fir:{fn:h0,name:"spruce",grow:"narrow",hue:.06},willow:{fn:u0,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Iu,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:d0,name:"field maple",grow:"normal",hue:.01},oak:{fn:f0,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:p0,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:m0,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:g0,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:x0,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:M0,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:v0,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:_0,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:b0,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:y0,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:S0,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:w0,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:E0,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:A0,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:T0,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Ia))e.bare=e.fn,e.fn=P0(e.fn,L0[n]||{});const D0=new Map(Object.entries(Ia).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),lc=n=>Ia[n]||Ia.broad;function eo(n,e,t){const i=D0.get(t),r=i?.sat||1,s=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:le(e.trunkHue,.45*e.sat,.34),[l.BARKD]:le(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:le(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:le(h,Math.min(1,.62*e.sat*r),Math.min(1,.58*s)),[l.LEAF2]:le(h-.05,Math.min(1,.55*e.sat*r),Math.min(1,.8*s)),[l.LEAF3]:le(h+.03,Math.min(1,.66*e.sat*r),.38*s),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=le(...i.trunk)),i?.upper&&(c[l.BELLY]=le(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function Ou(n){const{sp:e,crownY:t}=n,i=new ft(e.w,e.h),r=new ft(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,h=e.m[o];if(!h)continue;(As.has(h)&&s>=t||e.low?.[o]?r:i).put(a,s,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function I0(n,e){const t=e.bushSize,i=ec(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new ft(r,s);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)_n(a,[r/2+de(n,-9,9)*t,s-8*t+de(n,-4,2)*t],de(n,7,10)*t,de(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const d=r/2+de(n,-12,12)*t,f=s-de(n,5,17)*t;a.get(d,f)&&a.recolour(d,f,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let d=r/2,f=s-1;for(let u=0;u<15*t;u++)d+=Math.cos(c)*.9,f+=Math.sin(c)*.9+u*.06,a.put(d,f,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(d,f-1,l.LEAF2,0,-.5,.85),a.put(d+Math.sign(Math.cos(c)),f+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=r/2+de(n,-13,13)*t,d=de(n,5,15)*t,f=de(n,-3,3);for(let u=0;u<d;u++)a.put(c+f*u/d*(u/d),s-1-u,u>d*.65?l.LEAF2:u<d*.3?l.LEAF3:l.LEAF,f*.1,-.3,.9)}const o=eo(n,e,null);return o[l.FLOWER]=le(n(),.55,.95),{sp:a,colours:o}}const We=(n,e={})=>["tree",{type:n,...e}],Ge=(n,e={})=>[n,e],Fs=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ge("water",{w:1.6})],small:[Ge("grass",{h:1.4})],big:[Ge("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ge("fern")],big:[We("larch",{scale:1.1}),We("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ge("stump",{snag:!0})],big:[We("sycamore",{trunks:3,gnarl:.9}),We("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ge("henge")],small:[Ge("stones")],big:[Ge("boulder")],set:Ge("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ge("bramble",{bare:!0})],big:[We("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[We("birch",{scale:.75})],big:[We("lime",{trunks:3,thick:1.4}),We("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ge("mound",{brown:!0})],big:[We("hazel",{gnarl:1,scale:.95}),We("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ge("wall")],small:[Ge("flowerbed")],big:[We("willow")],set:Ge("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[We("broad",{trunks:4,scale:.5,thin:!0})],big:[We("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ge("flowers",{hue:.98,leafy:!0})],big:[We("yew",{scale:1.4,gnarl:1,lean:.35}),We("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ge("stones",{big:!0})],big:[We("fir",{scale:1.2}),We("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ge("stump",{grass:!0})],big:[We("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ge("shrub",{flower:[250,245,235]})],big:[We("chestnut",{scale:1.1}),We("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ge("cones",{acorn:!0}),Ge("log",{branch:!0})],big:[We("oak",{gnarl:.9,hollow:!0}),We("holly",{minor:!0,scale:.8})],set:We("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[200,30,60]})],big:[We("pine",{scale:1.2}),We("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ge("water"),Ge("reeds",{tall:!0})],small:[Ge("reeds")],big:[We("willow"),We("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ge("water",{w:2})],small:[We("broad",{scale:.45})],big:[We("alder",{scale:.95,gnarl:.3}),We("willow",{minor:!0,scale:.8})],set:Ge("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ge("boulder",{big:!0})],small:[Ge("stones",{big:!0})],big:[We("rowan",{scale:1.1}),We("pine",{minor:!0})],set:Ge("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ge("water",{bog:!0})],small:[Ge("reeds",{cotton:!0})],big:[We("birch",{scale:.8,dark:!0}),We("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ge("log",{branch:!0})],big:[We("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ge("rockwall")],small:[Ge("stalagmite")],big:[We("broad",{bare:!0}),We("yew",{minor:!0,scale:.8})],set:Ge("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ge("mound",{brown:!0,small:!0})],big:[We("flat",{scale:1.1}),We("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ge("water",{w:2})],small:[Ge("stump",{gnawed:!0})],big:[We("weepingBirch"),We("alder",{minor:!0,scale:.8})],set:Ge("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ge("fungi")],big:[Ge("log",{rot:!0})],set:Ge("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ge("shrub",{flower:[250,205,40],spiky:!0})],big:[We("birch",{lean:.45,scale:.75}),We("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ge("cones")],big:[We("pine",{scale:1.35}),We("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ge("rockwall",{moss:!0})],small:[Ge("fern")],big:[Ge("boulder",{moss:!0,big:!0})],set:Ge("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ge("fern")],big:[We("beech",{gnarl:.2,scale:1.1}),We("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ge("hedge",{berries:!0})],small:[Ge("web")],big:[We("holly",{scale:.9}),We("yew",{minor:!0,scale:.7})],set:We("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[250,230,170]})],big:[We("hazel",{trunks:5,scale:.7,thin:!0}),We("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(Ru)){const i=Fs.find(r=>r.id===n);i&&!i.set&&(i.set=Ge(e,{three:!0}),i.text={...i.text,set:t})}const Nu=Object.fromEntries(Fs.map(n=>[n.id,n])),O0=["ruins","rocks","freak","lake","modern"],bt=(n,e,t,i,r,s,a,o,h,c,d={})=>({pattern:n,...d,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:s,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(O0.map((f,u)=>[f,h[1][u]]))},feel:c}),Ut=[0,0],N0={moor:bt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":bt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ut,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":bt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ut,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":bt("rings",.35,.8,[1,[10,14]],null,.3,Ut,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":bt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ut,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":bt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ut,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":bt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ut,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:bt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ut,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":bt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:bt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:bt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ut,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":bt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:bt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ut,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":bt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ut,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":bt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ut,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:bt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ut,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:bt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ut,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":bt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:bt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ut,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:bt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ut,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":bt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ut,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:bt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ut,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":bt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ut,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":bt("groves",.5,.7,[2,[6,10]],null,.7,Ut,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:bt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":bt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ut,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:bt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ut,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":bt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ut,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":bt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ut,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":bt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ut,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Fs)n.layout=N0[n.id];function F0(n,e,t=64,i=48){const[r,s,a,o]=n.floor,h=new ft(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let x=0;x<t;x++){const g=(vi(x/7,M/5,c)*(t-x)*(i-M)+vi((x-t)/7,M/5,c)*x*(i-M)+vi(x/7,(M-i)/5,c)*(t-x)*M+vi((x-t)/7,(M-i)/5,c)*x*M)/(t*i),v=g<.38?l.BODY2:g>.64?l.BELLY:l.BODY;h.px(x,M,v,0,-.42,.91)}const d=Ns(c),f=(M,x,g)=>h.px((M%t+t)%t,(x%i+i)%i,g,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let M=0;M<u;M++){const x=Math.floor(d()*t),g=Math.floor(d()*i);if(r==="needles"){const v=d()<.5?1:-1;for(let S=0;S<3;S++)f(x+S*v,g+(S>>1),d()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const v=r==="tallgrass"?4:r==="lawn"?1:2;for(let S=0;S<v;S++)f(x,g-S,S===v-1?l.LEAF2:l.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&d()<.5&&f(x+1,g-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(x,g,l.ACCENT),d()<.6&&f(x+1,g,l.ACCENT),d()<.4&&f(x,g+1,l.BODY2),r==="roots"&&d()<.5)for(let v=0;v<5;v++)f(x+v,g+(v>2?1:0),l.TRUNK)}else if(r==="leaves")f(x,g,l.FLOWER),f(x+1,g,l.FLOWER),d()<.5&&f(x,g+1,l.ACCENT);else if(r==="mud"||r==="earth")for(let v=0;v<3;v++)f(x+v,g,l.BODY2)}const p={flowers:le(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:le(s+.02,.65,.6)}[r]||le(s,.3,.6),m={[l.BODY]:le(s,a*e.sat,o),[l.BODY2]:le(s+.02,a*e.sat*1.1,o*.78),[l.BELLY]:le(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:r==="needles"?le(.07,.5,.5):le(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:le(n.leaf,.55*e.sat,.45),[l.LEAF2]:le(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:le(e.trunkHue,.4,.3)};return{sp:h,colours:m}}const dr=n=>({[l.ACCENT]:le(.1,.06,.6),[l.BODY2]:le(.62,.08,.4),[l.BELLY]:le(.1,.05,.78),[l.LEAF]:le(.27,.5,.45),[l.LEAF2]:le(.25,.45,.62),[l.NOSE]:[20,16,24]});function qr(n,e,t,i,r,s,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,d=1+(s()-.5)*.3;o.push([e[0]+Math.cos(c)*t*d,e[1]+Math.sin(c)*i*d*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:r.round}),n.mark([mt(e,[-t,i*.1]),mt(e,[t,i*.1]),mt(e,[t,i]),mt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([mt(e,[-t*.6,-i*.8]),mt(e,[t*.1,-i*1.1]),mt(e,[t*.3,-i*.5]),mt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(Ja([mt(e,[-t*1.1,-i*.55]),mt(e,[0,-i*1.3]),mt(e,[t*1.1,-i*.5]),mt(e,[t*.6,-i*.2]),mt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function wa(n,e,t,i,r,s){const a={[l.LEAF]:le(t.leaf,.6*i.sat,.55),[l.LEAF2]:le(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:le(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:le(i.trunkHue,.45*i.sat,.34),[l.BARKD]:le(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:le(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:le(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=lc(e.type).fn,x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},g=M(r,x,i.treeSize*s*(e.scale||1)*de(r,.9,1.1)),v=eo(r,x,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=le(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:g.sp,colours:v}}if(n==="shrub"){const M=I0(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*s,flowers:1});for(let x=0;x<M.sp.m.length;x++)M.sp.m[x]&&ht(x,1,3)<(e.spiky?.18:.1)&&M.sp.m[x]!==l.TRUNK&&(M.sp.m[x]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*s*(e.w||1)),d=Math.round(32*s),f=new ft(c,d),u=c/2,p=d;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*s;n==="flowerbed"&&f.shape([[u-20*s,p-2],[u-18*s,p-6*s],[u+18*s,p-6*s],[u+20*s,p-2],[u+20*s,p],[u-20*s,p]],l.ACCENT,{group:2,line:!0});for(let g=0;g<M;g++){const v=u+de(r,-16,16)*s,S=x*de(r,.5,1),y=n==="fern"?de(r,-6,6)*s:de(r,-2,2)*s,A=p-1-(n==="flowerbed"?5*s:0);for(let b=0;b<S;b++){const E=b/S;f.px(v+y*E*E,A-b,E>.7?l.LEAF2:E<.3?l.LEAF3:l.LEAF,y*.05,-.3,.9),n==="fern"&&b%2&&f.px(v+y*E*E+(y>0?1:-1),A-b+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let b=0;b<(e.cotton?2:3);b++)f.px(v+y,A-S-b,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(v+y,A-S,l.FLOWER,0,-.5,.85),f.px(v+y+1,A-S,l.FLOWER,0,-.5,.85))}if(m={...a,[l.FLOWER]:n==="flowerbed"?ec(r,[[230,80,120],[250,210,60],[150,110,230]]):le(e.hue??.95,.6,.85),[l.TRUNK]:le(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:le(.08,.1,.55)},n==="flowerbed"){for(let g=0;g<f.m.length;g++)f.m[g]===l.FLOWER&&ht(g,2,7)<.5&&(f.m[g]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)qr(f,[u+de(r,-14,14)*s,p-(e.big?5:2.5)*s],(e.big?6:3)*s*de(r,.7,1.2),(e.big?5:2.5)*s,i,r);m=dr()}else if(n==="boulder")qr(f,[u,p-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,i,r,e.moss),m={...dr(),...a,[l.ACCENT]:le(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*s,p],[u-8*s,p-18*s],[u-4*s,p-28*s],[u+5*s,p-27*s],[u+8*s,p-14*s],[u+7*s,p]],l.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*s,p-30*s],[u+9*s,p-30*s],[u+9*s,p-22*s],[u-9*s,p-18*s]],l.LEAF,[l.ACCENT]),m={...dr(),...a};else if(n==="mound"){const M=(e.small?8:14)*s,x=(e.small?5:8)*s;f.shape(Ja([[u-M,p],[u-M*.6,p-x*.8],[u,p-x],[u+M*.6,p-x*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),f.mark([[u-M,p-x*.45],[u+M,p-x*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...a,...o,[l.TRUNK]:le(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*s;if(f.limb([[u,p,M*2.2],[u,p-8*s,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-M*.8,p-8*s],[u,p-10*s-(e.gnawed?4*s:0)],[u+M*.8,p-8*s],[u,p-7*s]],l.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+M*.4,p-8*s,2.5*s],[u+M*1.6,p-15*s,1.5*s]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const g=u+de(r,-14,14)*s,v=de(r,6,13)*s;for(let S=0;S<v;S++)f.px(g,p-1-S,S>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*s,x=(e.giant?14:e.branch?3:8)*s;if(f.limb([[u-M/2,p-x/2,x],[u+M/2,p-x/2-(e.branch?2*s:0),x*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+M/2-x*.1,p-x],[u+M/2+x*.2,p-x/2],[u+M/2-x*.1,p],[u+M/2-x*.3,p-x/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let g=0;g<(e.giant?6:3);g++){const v=u+de(r,-M/2,M/3);f.shape([[v-3*s,p-x*.9],[v,p-x-3*s],[v+3*s,p-x*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,p-x,x*.7],[u+5*s,p-x-6*s,x*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const x=u+de(r,-12,12)*s,g=de(r,3,7)*s,v=de(r,3,5)*s;f.limb([[x,p,1.6*s],[x,p-g,1.4*s]],l.BELLY,{group:5}),f.shape([[x-v,p-g],[x,p-g-v*.8],[x+v,p-g]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const x=u+de(r,-14,14)*s,g=p-2*s;f.ellipse(x,g,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,l.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,g-1.6*s,1.8*s,1*s,l.BARKD,{round:i.round}):f.px(x,g-1,l.BARKL)}m=o}else if(n==="water"){const M=22*s*(e.w||1),x=6*s;f.shape([[u-M,p-x],[u-M*.3,p-x*1.5],[u+M*.6,p-x*1.2],[u+M,p-x*.5],[u+M*.4,p],[u-M*.7,p-x*.2]],l.MAGIC,{group:5,round:.2});for(let g=0;g<6;g++){const v=u+de(r,-M*.6,M*.6),S=p-x*de(r,.4,1.1);for(let y=0;y<3*s;y++)f.recolour(v+y,S,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let g=0;g<f.m.length;g++)f.m[g]===l.MAGIC?f.m[g]=l.BODY:f.m[g]===l.MAGIC2&&(f.m[g]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*s,x=(n==="hedge"?18:12)*s;for(let g=0;g<(n==="hedge"?6:4);g++){const v=u+de(r,-M*.8,M*.8),S=p-x*de(r,.4,.7);f.ellipse(v,S,de(r,6,9)*s,x*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:g})}for(let g=0;g<8;g++){let S=u+de(r,-M,M),y=p;for(let A=0;A<x*1.2;A++)S+=Math.sin(A*.3+g)*.8,y-=.8,f.px(S,y,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let g=0;g<f.m.length;g++)f.m[g]&&f.m[g]!==l.TRUNK&&ht(g,5,9)<.05&&(f.m[g]=l.FLOWER);m={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*s,x=12*s;f.shape([[u-M,p],[u-M,p-x],[u+M,p-x],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-M-1,p-x],[u-M-1,p-x-2*s],[u+M+1,p-x-2*s],[u+M+1,p-x]],l.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+M-6*s,p-x-2*s],[u+M-6*s,p-x-7*s],[u+M,p-x-7*s],[u+M,p-x-2*s]],l.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+M-3*s,p-x-9*s,3*s,2.5*s,l.BELLY,{round:i.round});for(let g=p-x+3*s;g<p;g+=4*s)for(let v=u-M;v<u+M;v++)f.recolour(v,g,l.BODY2);m=dr()}else if(n==="rockwall"){for(let M=0;M<5;M++)qr(f,[u+(M-2)*9*s,p-de(r,8,14)*s],8*s,10*s,i,r,e.moss);m={...dr(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const x=u+de(r,-14,14)*s,g=de(r,5,11)*s;f.shape([[x-3*s,p],[x-1*s,p-g],[x+1*s,p-g],[x+3*s,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=dr()}else if(n==="web"){const M=[u,p-14*s],x=11*s;for(let g=0;g<8;g++){const v=g/8*Math.PI*2;for(let S=0;S<x;S++)f.px(M[0]+Math.cos(v)*S,M[1]+Math.sin(v)*S,l.WEB,0,0,1)}for(let g=3*s;g<x;g+=3*s)for(let v=0;v<Math.PI*2;v+=.05)f.px(M[0]+Math.cos(v)*g,M[1]+Math.sin(v)*g,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:f,colours:m}}function U0(n,e,t,i,r,s){if(e.three)return bf(n,t,i);if(n==="tree"||n==="log")return wa(n,e,t,i,r,s);const a=Math.round(90*s),o=Math.round(70*s),h=new ft(a,o),c=a/2,d=o;let f={...dr(),[l.LEAF]:le(t.leaf,.55,.5),[l.LEAF2]:le(t.leaf-.04,.5,.7),[l.TRUNK]:le(i.trunkHue,.45,.34),[l.BARKD]:le(i.trunkHue+.03,.5,.17),[l.MAGIC]:le(i.magicHue,.6,1),[l.MAGIC2]:le(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*s,d],[c-14*s,d-6*s],[c+14*s,d-6*s],[c+16*s,d]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*s,d-6*s],[c-9*s,d-26*s],[c+9*s,d-26*s],[c+9*s,d-6*s]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*s,d-10*s],[c-5*s,d-20*s],[c,d-23*s],[c+5*s,d-20*s],[c+5*s,d-10*s]],l.NOSE,{group:7}),h.shape([[c-13*s,d-26*s],[c,d-34*s],[c+13*s,d-26*s]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,d-13*s,2.5*s,2.5*s,l.MAGIC2,{round:.5}),h.mark([[c-14*s,d-36*s],[c+2*s,d-36*s],[c-4*s,d-24*s],[c-14*s,d-24*s]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*s,d],[c-26*s,d-4*s],[c+26*s,d-4*s],[c+26*s,d]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*s,d-4*s,4*s],[c+u*s,d-34*s,4*s]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*s,d-34*s],[c-28*s,d-38*s],[c+28*s,d-38*s],[c+28*s,d-34*s]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*s,d-38*s],[c-16*s,d-54*s],[c,d-60*s],[c+16*s,d-54*s],[c+24*s,d-38*s]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=wa("water",{w:1.8},t,i,r,s);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=d-u.sp.h+M;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*s,d-6*s,9*s],[c+34*s,d-10*s,8*s]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])qr(h,[c+u*s,d-p*s],m*s,M*s,i,r,!0);else if(n==="cave"){for(const[u,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])qr(h,[c+u*s,d-p*s],m*s,M*s,i,r,p>30);h.shape([[c-15*s,d],[c-14*s,d-18*s],[c-4*s,d-28*s],[c+6*s,d-27*s],[c+14*s,d-16*s],[c+15*s,d]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=wa("water",{w:1.9},t,i,r,s);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=d-u.sp.h+M-10*s;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+de(r,-32,32)*s,M=d-de(r,2,14)*s,x=de(r,-.5,.5),g=de(r,8,16)*s;h.limb([[m-Math.cos(x)*g/2,M-Math.sin(x)*g/2,2.6*s],[m+Math.cos(x)*g/2,M+Math.sin(x)*g/2,2*s]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])qr(h,[c+u*s,d-p*s],m*s,M*s,i,r,!0);for(let u=c-6*s;u<c+6*s;u++)for(let p=d-50*s;p<d-4*s;p++)h.px(u,p,ht(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*s,d],[c-14*s,d-6*s],[c+14*s,d-6*s],[c+18*s,d]],l.IRIS,{group:10,round:.2}),f[l.IRIS]=[90,150,190],f[l.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function k0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Za}={}){const r=Nu[n];if(!r)throw new Error(`no area type "${n}"`);const s=Ns(n.split("").reduce((d,f)=>d*31+f.charCodeAt(0),7)>>>0),a=(d,f,u)=>({sp:En(d.sp,d.colours,e,"none",i),kind:f,text:u}),o=F0(r,e),h=d=>(d||[]).map(([f,u])=>a(wa(f,u,r,e,s,t),f,"")),c={def:r,floor:{sp:En(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:h(r.wall),small:h(r.small),big:h(r.big),setPiece:null};if(c.walls.forEach(d=>d.text=r.text.wall),c.small.forEach(d=>d.text=r.text.small),c.big.forEach(d=>d.text=r.text.big),r.set){const d=U0(r.set[0],r.set[1],r,e,s,t);c.setPiece={...a(d,r.set[0],r.text.set),metres:d.metres,origin:d.origin}}return c}const B0=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],z0=16;function H0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Za,ppm:r=z0}={}){const s=Nu[n];if(!s)throw new Error(`no area type "${n}"`);const a=(s.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,d=[];let f=0;for(const u of B0)for(let p=0;p<u.count;p++,f++){const m=h.length&&(f===2||f===6)?h[(f===6?1:0)%h.length]:o[f%o.length],M=lc(m.type),x=M.fn,g=Ns(c*7+f*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,S=u.id==="sapling",y=u.id==="tall"||u.id==="giant",A=M.grow,b=A==="willow",E=A==="narrow"||m.bare,_=A==="wide",L=b?1+(v-1)*.45:A==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,R=(S?.78:1)*(b?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:E&&y?m.bare?.6:.85:y?1.06:1),P={...e,crownWidth:(e.crownWidth||3)*R,leafHue:s.leaf+(m.dark?.05:0),gnarl:Math.min(1,(m.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:m.bare,treeTrunks:S?1:m.trunks,treeLean:m.lean,treeThick:S?void 0:y&&m.thick?m.thick*1.1:m.thick,treeThin:S||m.thin,treeHollow:y&&m.hollow,treeWebs:m.webs},O=x(g,P,e.treeSize*t*(m.scale||1)*L*de(g,.95,1.05)),I=eo(g,P,x);m.dark&&(I[l.LEAF]=I[l.LEAF3],I[l.LEAF3]=le(s.leaf+.05,.7,.22)),I[l.NOSE]=[20,16,24],I[l.WEB]=[225,225,232];const U=Ou(O),z=ee=>En(ee,I,e,"none",i),k=ee=>+(ee/r).toFixed(2);d.push({heightClass:u.id,species:m.type,scale:+L.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:z(O.sp),top:z(U.top),bot:z(U.bot),crownY:O.crownY,metres:{height:k(O.sp.h),crownBase:k(O.sp.h-O.crownY),crownHeight:k(O.crownY),crownRadius:k(O.sp.w/2)}})}return d}const G0={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function W0(n){const e=new Ke({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:r=>r[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:r=>r[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Mr.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=pn(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(i.w/2+Math.sin(r*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+r*.08));i.get(s,a)||i.px(s,a,l.MAGIC2)}return i}const Ea={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function V0(n,e){const t=new Ke({blend:.04}),i=Object.keys(Ea).indexOf(n),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=C.norm([Math.sin(s),.22,Math.cos(s)]),h=C.norm(C.cross(o,a)),c=[0,.46,0],d=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(x,g)=>d.some(v=>v.some((S,y)=>{const A=v[y+1];if(!A)return!1;const b=A[0]-S[0],E=A[1]-S[1],_=Math.max(0,Math.min(1,((x-S[0])*b+(g-S[1])*E)/(b*b+E*E)));return Math.hypot(x-S[0]-b*_,g-S[1]-E*_)<.014})),u=x=>{const g=C.sub(x,c),v=[C.dot(g,a),C.dot(g,h)+.46,C.dot(g,o)];if(v[2]>r-.02){const S=(v[0]+.17)/.34,y=(.8-v[1])/.5;if(S>=0&&S<=1&&y>=0&&y<=1&&_u(S,y,i+1,.1))return l.RUNE}if(f(v[0],v[1]))return l.STONED;if(v[1]>.86&&ht(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&ht(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,r],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(C.add(C.add(c,C.mul(h,.53)),C.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:C.add(a,C.mul(h,.35)),up:h,cut:!0,paint:u});for(const[x,g,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,g],[v,v*.4,v],l.MOSS,{group:2});for(let x=0;x<9;x++){const g=-.3+x*.07,v=.12+x%3*.025-x*.02,S=.07+x*37%5/60;t.seg([g,0,v],[g+(x%3-1)*.02,S,v+.01],.012,.004,x%3?l.LEAF:l.LEAF2,{group:10+x})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:Ea[n][0],[l.MAGIC2]:Ea[n][1],[l.LINE]:[40,40,50]},m=pn(t,{height:44}).sp;let M=0;for(let x=0;x<600&&M<5;x++){const g=Math.floor(ht(x,i,9)*m.w),v=Math.floor(ht(x,i,10)*m.h*.8);m.get(g,v)||m.get(g+1,v)||m.get(g-1,v)||m.get(g,v+1)||m.get(g,v-1)||(m.px(g,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:m,colours:p}}function Y0(){const n=new Ke({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),r=Math.cos(i)*.6,s=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[r,r*.5,r],l.ACCENT,{group:30});return{sp:pn(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function X0(n,{makeCanvas:e=Za}={}){const t=(c,d)=>En(c,d,n,"none",e),i={campfire:[0,1,2].map(c=>t(W0(c),G0)),stones:{},pond:null};for(const c of Object.keys(Ea)){const d=V0(c);i.stones[c]=t(d.sp,d.colours)}const r=Y0(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),h=o.createImageData(r.sp.w,r.sp.h);for(let c=0;c<r.sp.m.length;c++)r.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),s.mask=a,i.pond=s,i}function K0(n,e){const t=new Map,i=new Map,r=(h,c,d)=>(h*2097152+(c+1048576))*2097152+(d+1048576),s=(h,c,d)=>{const f=r(h,c,d);let u=t.get(f);if(!u){const p=Math.pow(2,-h);u=[p*(c+Ce(c*7+h,d,n)),p*(d+Ce(c,d*13+h,n+1))],t.set(f,u)}return u},a=(h,c,d)=>{const f=Math.pow(2,-h),u=Math.floor(c/f),p=Math.floor(d/f);let m=u,M=p,x=1/0;for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const S=s(h,u+g,p+v),y=(S[0]-c)**2+(S[1]-d)**2;y<x&&(x=y,m=u+g,M=p+v)}return[m,M]},o=(h,c,d)=>{const f=r(h,c,d);let u=i.get(f);if(u)return u;if(h===0)u=[c,d];else{const p=s(h,c,d),m=a(h-1,p[0],p[1]);u=o(h-1,m[0],m[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(h,c)=>s(0,h,c),partition(h,c){const d=a(e,h,c);return o(e,d[0],d[1])},centreness(h,c,d){const f=s(0,d[0],d[1]),u=Math.hypot(h-f[0],c-f[1]);let p=1/0;const m=Math.floor(h),M=Math.floor(c);for(let x=-2;x<=2;x++)for(let g=-2;g<=2;g++){const v=m+x,S=M+g;if(v===d[0]&&S===d[1])continue;const y=s(0,v,S);p=Math.min(p,Math.hypot(h-y[0],c-y[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let d=1/0,f=1/0;const u=Math.floor(h),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const x=s(0,u+m,p+M),g=Math.hypot(h-x[0],c-x[1]);g<d?(f=d,d=g):g<f&&(f=g)}return Math.min(1,2*d/(d+f))}}}function Qc(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let r=1;r<i.length-2;r++){const[s,a,o,h]=[i[r-1],i[r],i[r+1],i[r+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),d=Math.max(1,Math.ceil(c/e));for(let f=0;f<d;f++){const u=f/d,p=u*u,m=p*u,M=(x,g,v,S)=>.5*(2*g+(-x+v)*u+(2*x-5*g+4*v-S)*p+(-x+3*g-3*v+S)*m);t.push([M(s[0],a[0],o[0],h[0]),M(s[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const q0=new Set(["stream","wetland","bog","beaver-pond"]);class $0{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,r=ki(e.seed*7+4242),s=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(m,M)=>m===0?[i.minX+M*s,i.minZ]:m===1?[i.maxX,i.minZ+M*a]:m===2?[i.minX+M*s,i.maxZ]:[i.minX,i.minZ+M*a],h=(m,M,x,g)=>{const v=M[0]-m[0],S=M[1]-m[1],y=Math.hypot(v,S),A=Math.max(2,Math.round(y/x)),b=[m];let E=0;for(let _=1;_<A;_++){E=Pn(E+(r()-.5)*g,-g,g);const w=_/A;b.push([Pn(m[0]+v*w-S/y*E,i.minX,i.maxX),Pn(m[1]+S*w+v/y*E,i.minZ,i.maxZ)])}return b.push(M),Qc(b,3)},c=t.rails[0]+Math.floor(r()*(t.rails[1]-t.rails[0]+1));for(let m=0;m<c;m++){const M=Math.floor(r()*4),x=(M+2+(r()<.3?r()<.5?1:-1:0)+4)%4,g=h(o(M,.15+r()*.7),o(x,.15+r()*.7),320,140);if(this.lines.push({kind:"rail",pts:g,half:t.railHalf}),m===0&&g.length>20){const v=g[Math.floor(g.length*(.3+r()*.4))],S=Math.floor(r()*4);this.lines.push({kind:"rail",pts:h(v,o(S,.2+r()*.6),300,120),half:t.railHalf})}}const d=t.roads[0]+Math.floor(r()*(t.roads[1]-t.roads[0]+1));for(let m=0;m<d;m++){const M=Math.floor(r()*4),x=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+r()*.8),o(x,.1+r()*.8),240,110),half:t.roadHalf})}const f=t.streams[0]+Math.floor(r()*(t.streams[1]-t.streams[0]+1));for(let m=0;m<f;m++){const M=Math.floor(r()*4),x=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+r()*.8),o(x,.1+r()*.8),90,70),half:t.streamHalf})}const u=(m,M)=>q0.has(Xt[e.typeOf(m,M)].id);for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);if(u(x,g))for(const v of M){const[S,y]=v.split(",").map(Number);if(m>v||!u(S,y))continue;const[A,b]=this.trim(e.siteOf(x,g),e.siteOf(S,y),this.clearOf(x,g),this.clearOf(S,y));A&&this.lines.push({kind:"stream",pts:this.meander(A,b,r),half:t.streamHalf})}}const p=new Set;for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);for(const v of M){const S=m<v?`${m}|${v}`:`${v}|${m}`;if(p.has(S))continue;p.add(S);const[y,A]=v.split(",").map(Number);if(y<0||A<0||y>=e.n||A>=e.n||Ce(x*31+y,g*31+A,e.seed+811)>t.linkChance)continue;const[b,E]=this.trim(e.siteOf(x,g),e.siteOf(y,A),this.clearOf(x,g),this.clearOf(y,A));b&&this.lines.push({kind:"path",pts:this.meander(b,E,r),half:t.pathHalf})}if(Ce(x,g,e.seed+813)<t.deadEndChance){const v=e.siteOf(x,g),S=r()*Math.PI*2,y=30+r()*40,A=this.clearOf(x,g),b={x:v.x+Math.cos(S)*A,z:v.z+Math.sin(S)*A};this.lines.push({kind:"path",pts:this.meander(b,{x:b.x+Math.cos(S)*y,z:b.z+Math.sin(S)*y},r),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((m,M)=>{for(let x=0;x<m.pts.length-1;x++){const[g,v]=[m.pts[x],m.pts[x+1]],S=m.half+4;for(let y=Math.floor((Math.min(g[0],v[0])-S)/this.cell);y<=Math.floor((Math.max(g[0],v[0])+S)/this.cell);y++)for(let A=Math.floor((Math.min(g[1],v[1])-S)/this.cell);A<=Math.floor((Math.max(g[1],v[1])+S)/this.cell);A++){const b=`${y},${A}`;let E=this.grid.get(b);E||this.grid.set(b,E=[]),E.push([M,x])}}}),this.placePieces()}map;lines=[];pieces=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,r=(o,h,c,d)=>{if(e.hardClear(h,c)||this.pieces.some(m=>Math.hypot(m.x-h,m.z-c)<Math.max(12,m.r+d)))return;const f={id:o,x:h,z:c,r:d};this.pieces.push(f);const u=`${Math.floor(h/this.cell)},${Math.floor(c/this.cell)}`;let p=this.pieceGrid.get(u);p||this.pieceGrid.set(u,p=[]),p.push(f)},s=(o,h,c)=>{const d=o.pts[h],f=o.pts[Math.min(o.pts.length-1,h+1)],u=f[0]-d[0],p=f[1]-d[1],m=Math.hypot(u,p)||1;return[d[0]-p/m*c,d[1]+u/m*c]};this.lines.forEach((o,h)=>{let c=0,d=!1;for(let f=1;f<o.pts.length;f++){const[u,p]=o.pts[f],m=Math.hypot(u-o.pts[f-1][0],p-o.pts[f-1][1]);if(c+=m,o.kind==="rail"){const M=this.railBroken(u,p);if(M&&!d&&Ce(h,f,t+841)<.5&&r("buffer-stop",u,p,4),d=M,c>=i.landmarkSpacing){c=0;const x=Ce(h,f,t+843);if(x<i.landmarkChance){const g=["goods-wagon","carriage","platform","signal-gantry"];r(g[Math.floor(Ce(h,f,t+845)*g.length)],u,p,7)}else x<i.landmarkChance+.3&&!M&&r("signal-post",...s(o,f,o.half-.6),1.2)}}else o.kind==="road"&&c>=i.vergeSpacing&&(c=0,r("verge-post",...s(o,f,(Ce(h,f,t+847)<.5?1:-1)*(o.half-.7)),.8))}if(o.kind==="path"&&!o.deadEnd)for(const f of[o.pts[0],o.pts[o.pts.length-1]]){const u=Xt[e.areaAt(f[0],f[1]).type];(["rocky-slope","ravine","cave-mouth"].includes(u.id)||u.layout.terrain?.some(m=>m==="hollows"||m==="rocky"))&&Ce(Math.round(f[0]),Math.round(f[1]),t+849)<.5&&r(Ce(Math.round(f[1]),3,t+851)<.7?"stairs":"stairs-turn",f[0],f[1],3)}});const a=new Set;this.lines.forEach((o,h)=>{if(!(o.kind!=="path"&&o.kind!=="road"))for(let c=0;c<o.pts.length-1;c++){const d=o.pts[c],f=o.pts[c+1],u=`${Math.floor(d[0]/this.cell)},${Math.floor(d[1]/this.cell)}`;for(const[p,m]of this.grid.get(u)??[]){const M=this.lines[p];if(M.kind!=="stream"&&!(M.kind==="rail"&&o.kind==="road"))continue;const x=M.pts[m],g=M.pts[m+1],v=Z0(d,f,x,g);if(!v)continue;const S=`${h}|${p}|${Math.round(v[0]/20)},${Math.round(v[1]/20)}`;a.has(S)||(a.add(S),M.kind==="stream"?r(o.kind==="road"||Ce(h,p,t+853)<.5?"footbridge":"rope-bridge",v[0],v[1],4):r("level-crossing",...s(o,c,o.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let r=-1;r<=1;r++)if(!(!i&&!r)){for(const s of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+r}`)??[])if(Math.hypot(s.x-e,s.z-t)<s.r)return s}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,r){const s=t.x-e.x,a=t.z-e.z,o=Math.hypot(s,a);return o<i+r+10?[null,t]:[{x:e.x+s/o*i,z:e.z+a/o*i},{x:t.x-s/o*r,z:t.z-a/o*r}]}meander(e,t,i){const r=t.x-e.x,s=t.z-e.z,a=Math.max(1,Math.hypot(r,s)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),d=i()<.5?1:-1;for(let f=1;f<o;f++){const u=f/o,p=c*(.4+.6*i())*(f%2?d:-d);h.push([e.x+r*u-s/a*p,e.z+s*u+r/a*p])}return h.push([t.x,t.z]),Qc(h,2)}at(e,t,i=0){const r=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!r)return null;let s=null;for(const[a,o]of r){const h=this.lines[a],[c,d]=[h.pts[o],h.pts[o+1]],f=d[0]-c[0],u=d[1]-c[1],p=f*f+u*u||1,m=Pn(((e-c[0])*f+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-f*m,t-c[1]-u*m);M>h.half+i||(!s||M-h.half<s.d-this.lines[s.line].half)&&(s={kind:h.kind,line:a,d:M,seg:o})}return s}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,r=this.at(e,t,i.edgeBushes);if(!r)return{trees:1,bushes:1};const s=this.lines[r.line].half;return r.d>s?{trees:1,bushes:i.bushBoost}:r.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return Fi(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function Z0(n,e,t,i){const r=[e[0]-n[0],e[1]-n[1]],s=[i[0]-t[0],i[1]-t[1]],a=r[0]*s[1]-r[1]*s[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a,h=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+r[0]*o,n[1]+r[1]*o]:null}const J0=nf.types,Xt=Fs.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:J0[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),Wr=(n,e)=>n+","+e;function Q0(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function j0(n,e,t,i){const r=new Map,s=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const d=Wr(h[0],h[1]),f=Wr(c[0],c[1]);r.has(d)||r.set(d,new Set),r.has(f)||r.set(f,new Set),r.get(d).add(f),r.get(f).add(d)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let d=0;d<=a;d++){const f=n.partition(e+d/i,e+h/i);c.push(f),d>0&&s(f,c[d-1]),h>0&&s(f,o[d])}o=c}return r}function ep(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,s=Xt.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(N,Y)=>{const j=N/r,oe=Y/r;return[j+o*(Fi(j/a,oe/a,n+91)-.5)*2,oe+o*(Fi(j/a,oe/a,n+92)-.5)*2]},c=(N,Y)=>{let j=N*r,oe=Y*r;for(let he=0;he<30;he++){const[xe,q]=h(j,oe);j+=(N-xe)*r,oe+=(Y-q)*r}return[j,oe]},d=K0(n,e.borderLayers),f=-i,u=t+i,p=j0(d,f,u,6),m=new Map,M=ki(n*5+1);for(let N=f;N<u;N++)for(let Y=f;Y<u;Y++){const j=new Set;for(let xe=-2;xe<=2;xe++)for(let q=-2;q<=2;q++){const ie=m.get(Wr(Y+q,N+xe));ie!==void 0&&j.add(ie)}for(const xe of p.get(Wr(Y,N))??[]){const q=m.get(xe);q!==void 0&&j.add(q)}const oe=[...Array(s).keys()].filter(xe=>!j.has(xe)),he=oe.length?oe:[...Array(s).keys()];m.set(Wr(Y,N),he[Math.floor(M()*he.length)])}const x=(N,Y)=>m.get(Wr(N,Y))??Math.floor(Ce(N,Y,n+17)*s),g=Math.floor(t/2),v=(N,Y)=>{const j=d.site(N,Y),oe=d.partition(j[0],j[1]);return oe[0]===N&&oe[1]===Y};let S=[g,g];for(const[N,Y]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(g+N,g+Y)){S=[g+N,g+Y];break}const y=(N,Y)=>{const j=d.site(N,Y),oe=c(j[0],j[1]);return{x:oe[0],z:oe[1]}},A=y(S[0],S[1]),b=(N,Y)=>{const[j,oe]=h(N,Y),he=d.partition(j,oe);return{cell:he,type:x(he[0],he[1]),openness:d.openness(j,oe)}},E=(N,Y)=>{const j=Xt[x(N,Y)];return j.setPiece&&Ce(N,Y,n+61)<e.setPieceChance?j.setPiece:null},_=e.dancefloor.radius,w=_+e.dancefloor.clearing,L=e.treehouse,R=L.angle*Math.PI/180,P={x:A.x+Math.cos(R)*(w+L.distance),z:A.z+Math.sin(R)*(w+L.distance)},O=e.grounds,I=[];for(let N=0;N<t;N++)for(let Y=0;Y<t;Y++){if(Y===S[0]&&N===S[1]||Ce(Y,N,n+871)>=O.chance)continue;const j=O.kinds[Math.floor(Ce(Y,N,n+873)*O.kinds.length)],oe=O.radius[j]??8,he=Ce(Y,N,n+875)*Math.PI*2,xe=y(Y,N),q=e.setPieceClear*e.setPieceScale+oe+4;I.push({kind:j,x:xe.x+Math.cos(he)*q,z:xe.z+Math.sin(he)*q,r:oe})}const U=(N,Y,j)=>{if(Math.hypot(N-A.x,Y-A.z)<w||Math.hypot(N-P.x,Y-P.z)<L.clear)return!0;for(const he of I)if(Math.abs(N-he.x)<he.r&&Math.abs(Y-he.z)<he.r&&Math.hypot(N-he.x,Y-he.z)<he.r)return!0;if(!E(j[0],j[1]))return!1;const oe=y(j[0],j[1]);return Math.hypot(N-oe.x,Y-(oe.z-4))<e.setPieceClear*e.setPieceScale},z=(N,Y)=>{const[j,oe]=h(N,Y);return U(N,Y,d.partition(j,oe))},k=(N,Y)=>{const[j,oe]=h(N,Y);if(U(N,Y,d.partition(j,oe)))return 0;const he=1-nn((Fi(N/e.gladeScale,Y/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return nn((d.openness(j,oe)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*he},ee=(N,Y)=>Math.min(1,Math.hypot(N-S[0],Y-S[1])/(t/2)),H=r*.5,Z={seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:d,centreCell:S,dancefloor:{x:A.x,z:A.z,radius:_},treehouse:P,grounds:I,start:{x:P.x,z:P.z+1},bounds:{minX:H,maxX:t*r-H,minZ:H,maxZ:t*r-H},extent:{minX:f*r,maxX:u*r,minZ:f*r,maxZ:u*r},typeOf:x,areaAt:b,siteOf:y,treeWeight:k,hardClear:z,neighbours:p,setPieceOf:E,remoteness:ee,paths:null};return Z.paths=new $0(Z),Z}function cc(n,e,t,i,r){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function tp(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const es=(n,e)=>Yn(e.groundHeight,e.treetopHeight,nn(n.lift)),jc=n=>nn(n.lift);function np(n,e,t,i,r){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:s,lift:a}=n;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const d=nn(a),f=Yn(i.groundSpeed,i.treetopSpeed,d),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,m=n.vz+(h*i.groundSpeed-n.vz)*u,M=ip(n,o,h,t,i);let x=Yn(p,M.vx,d),g=Yn(m,M.vz,d);const v=M.boost*d,S=M.braking&&d>.5;let y=n.x+x*t,A=n.z+g*t;(y<r.minX||y>r.maxX)&&(y=Pn(y,r.minX,r.maxX),x=0),(A<r.minZ||A>r.maxZ)&&(A=Pn(A,r.minZ,r.maxZ),g=0);const b=x>.3?1:x<-.3?-1:n.facing,E=Math.hypot(x,g),_=cc(x,g,n.away,Math.max(1,f*.15),i);return{x:y,z:A,vx:x,vz:g,lift:a,mode:s,facing:b,away:_,lean:E>f*i.leanAt,boost:v,braking:S}}function ip(n,e,t,i,r){const s=r.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const S=Math.exp(-3*i/Math.max(.05,s.glideTime));return{vx:n.vx*S,vz:n.vz*S,boost:h*S,braking:!1}}const d=e/a,f=t/a;let u=d,p=f,m=0;if(o>2){const S=n.vx/o,y=n.vz/o;m=Math.acos(Pn(S*d+y*f,-1,1));const A=S*f-y*d,b=s.turnRate*(1-.5*h)*Math.PI/180,E=Math.min(m,b*i)*(A>=0?1:-1),_=Math.cos(E),w=Math.sin(E);u=S*_-y*w,p=S*w+y*_}const M=m*180/Math.PI;M<=s.boostAngle?h=Math.min(1,h+i/Math.max(.05,s.boostTime)):M>=90?(h=Math.max(0,h-i*s.sharpTurnBleed),c=o>r.treetopSpeed*.5):h=Math.max(0,h-i*.5);const x=r.treetopSpeed*(1+(s.boost-1)*h)*a,g=1-Math.exp(-r.acceleration*i*(M>=90?s.sharpTurnBleed:1)),v=o+(x-o)*g;return{vx:u*v,vz:p*v,boost:h,braking:c}}const to=3;function rp(n,e,t=.5,i=1){const r=n.tuning,s=Pn(e,0,1),a=Math.max(0,Math.round(Yn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&i<sp(n,s)?1:0,h=Math.max(0,a-o),c=Math.round(h*r.adultShareFar*nn((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),d=Math.round((h-c)*r.youngShareFar*s);return{babies:Math.max(0,h-c-d),young:d,adults:c,legends:o}}const sp=(n,e)=>n.tuning.legendChanceFar*nn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Fu=n=>n.areaSize*.75,Oa=(n,e,t,i)=>{const r=n.areaAt(e,t).cell;return r[0]===i[0]&&r[1]===i[1]};function Uu(n,e,t,i,r){if(Oa(n,t,i,e))return[t,i];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*s,c=i+Math.sin(o)*s;if(Oa(n,h,c,e))return[h,c]}return[t,i]}function Na(n,e,t){for(let i=0;i<12;i++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(Oa(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function ap(n){const e=[],t=n.tuning;let i=0;const[r,s]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===r&&a===s)continue;const h=ki(n.seed*7919+o*131+a*977+3),c=Xt[n.typeOf(o,a)],d=n.siteOf(o,a),f=n.remoteness(o,a),u=rp(n,f,Ce(o,a,n.seed+43),Ce(o,a,n.seed+47)),p=M=>{const x=[o,a],g=Fu(n),[v,S]=Uu(n,x,d.x,d.z,g),y={cell:x,homeX:d.x,homeZ:d.z,range:g,anchorX:v,anchorZ:S},[A,b]=Na(n,y,h);return{id:i++,species:c.creature,level:M,...y,x:A,z:b,tx:A,tz:b,rest:h()*3,speed:(M===to?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:ki(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const m=t.legendNextToHome&&o===r+1&&a===s;(u.legends||m)&&e.push(p(3))}return e}function op(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,r=n.tz-n.z,s=Math.hypot(i,r);if(s<.05){[n.tx,n.tz]=Na(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(s,n.speed*e),o=n.x+i/s*a,h=n.z+r/s*a;if(!Oa(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=cc(i,r,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===to?1.5:4)}function lp(n,e,t,i,r,s,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(s-o.seen>3){const h=ki(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=Na(a,o,h),[o.tx,o.tz]=Na(a,o,h),o.rest=h()*2}o.seen=s,op(o,r,a)}}const cp=4,Rt=32;function hp(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function ku(n,e,t,i,r,s){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(Fi(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Ce(i,r,s+1)-.5)*a.width*a.stray,c=(Fi(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Ce(i,r,s+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function hc(n,e,t,i){const r=n.tuning,s=r.density,a=Xt[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=Fi(e/s.patchScale,t/s.patchScale,o+91),d=s.patchMin+(s.patchMax-s.patchMin)*nn((c-.25)/.5),f=n.treeWeight(e,t)*a.density*d*up(n,e,t,a)*r.treeDensity;return Math.max(f,s.lone)*h}function up(n,e,t,i){const r=n.seed,s=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=Fi(e/a,t/a,r+93);return 1+s*(2.2*nn((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*nn((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*nn((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*nn((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function dp(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,s=n.seed,a=[],o=hp(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*Rt/r),d=Math.ceil((t+1)*Rt/r);for(let f=c;f<d;f++){const u=f&1?.5:0,p=Math.ceil(e*Rt/i-u),m=Math.ceil((e+1)*Rt/i-u);for(let M=p;M<m;M++){const x=(M+u+(Ce(M,f,s+101)-.5)*.7)*i,g=(f+(Ce(M,f,s+102)-.5)*.7)*r,v=ku(n,x,g,M,f,s+106),S=hc(n,x,g,v);Ce(M,f,s+103)>=S||n.hardClear(x,g-o)||n.hardClear(x-h,g-o)||n.hardClear(x+h,g-o)||a.push({x,z:g,type:v,variant:Math.floor(Ce(M,f,s+104)*1000003),flip:Ce(M,f,s+105)<.5})}}return a}function fp(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,s=[],a=Math.ceil(t*Rt/i),o=Math.ceil((t+1)*Rt/i),h=Math.ceil(e*Rt/i),c=Math.ceil((e+1)*Rt/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){const u=(f+Ce(f,d,r+201)-.5)*i,p=(d+Ce(f,d,r+202)-.5)*i,m=1+n.tuning.bushClump*(2*nn((Fi(u/13,p/13,r+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const x=ku(n,u,p,f,d,r+206),g=1-Math.min(1,hc(n,u,p,x)/.8);Ce(f,d,r+203)>(.15+.85*g)*Xt[x].layout.undergrowth*n.tuning.bushDensity*m*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||n.hardClear(u,p)||s.push({x:u,z:p,type:x,variant:Math.floor(Ce(f,d,r+204)*cp),flip:Ce(f,d,r+205)<.5})}return s}function pp(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,s=[],a=Math.ceil(t*Rt/i),o=Math.ceil((t+1)*Rt/i),h=Math.ceil(e*Rt/i),c=Math.ceil((e+1)*Rt/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){if(Ce(f,d,r+303)>n.tuning.wallDensity)continue;const u=(f+(Ce(f,d,r+301)-.5)*.6)*i,p=(d+(Ce(f,d,r+302)-.5)*.6)*i,m=n.areaAt(u,p);m.openness<.82||!Xt[m.type].hasWalls||n.paths.clearance(u,p).bushes===0||n.hardClear(u,p)||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||s.push({x:u,z:p,type:m.type,variant:Math.floor(Ce(f,d,r+304)*4),flip:Ce(f,d,r+305)<.5})}return s}function mp(n,e,t){const i=n.tuning.decor,r=i.spacing,s=n.seed,a=[],o=Math.ceil(t*Rt/r),h=Math.ceil((t+1)*Rt/r),c=Math.ceil(e*Rt/r),d=Math.ceil((e+1)*Rt/r);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(Ce(u,f,s+501)-.5)*.8)*r,m=(f+(Ce(u,f,s+502)-.5)*.8)*r,M=n.areaAt(p,m),x=Xt[M.type].layout,g=x.decor,v=g?g.rate/.3:1,S=x.terrain?.includes("rocky")?2:1,y=g?[g.ruins,g.rocks*S,g.freak]:[i.ruins,i.rocks*S,i.freak],A=y[0]+y[1]+y[2]||1,b=(i.ruins+i.rocks+i.freak)*v*(g?(g.ruins+g.rocks+g.freak)/Math.max(.01,g.ruins+g.rocks+g.freak+g.lake+g.modern):1)*(S>1?1.5:1),E=Ce(u,f,s+503);if(E>=b||M.openness<i.clearing||n.hardClear(p,m)||n.paths.at(p,m,i.pathGap)||Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)continue;const _=1-Math.min(1,hc(n,p,m,M.type)/.8);if(Ce(u,f,s+504)>.35+.65*_)continue;const w=E/b*A,L=w<y[0]?"ruins":w<y[0]+y[1]?"rocks":"freak";a.push({x:p,z:m,family:L,variant:Math.floor(Ce(u,f,s+505)*1e6),flip:Ce(u,f,s+506)<.5})}return a}function gp(n,e,t){const i=n.tuning.relics,r=i.spacing,s=n.seed,a=[],o=Math.ceil(t*Rt/r),h=Math.ceil((t+1)*Rt/r),c=Math.ceil(e*Rt/r),d=Math.ceil((e+1)*Rt/r);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(Ce(u,f,s+881)-.5)*.8)*r,m=(f+(Ce(u,f,s+882)-.5)*.8)*r,M=n.areaAt(p,m),x=Xt[M.type].layout.decor,g=x?x.modern/Math.max(.01,x.ruins+x.rocks+x.freak+x.lake+x.modern):.1,v=n.paths.at(p,m,20),S=v&&(v.kind==="road"||v.kind==="rail")?i.nearRoad:1;Ce(u,f,s+883)>=i.chance*(.5+5*g)*S||M.openness<n.tuning.decor.clearing||n.hardClear(p,m)||n.paths.at(p,m,2)||n.paths.pieceAt(p,m)||Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6||a.push({x:p,z:m,variant:Math.floor(Ce(u,f,s+884)*1e6),flip:Ce(u,f,s+885)<.5})}return a}const xp=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Mp(n,e,t){const i=n.tuning.lightSources,r=i.spacing,s=n.seed,a=[],o=Math.ceil(t*Rt/r),h=Math.ceil((t+1)*Rt/r),c=Math.ceil(e*Rt/r),d=Math.ceil((e+1)*Rt/r);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(Ce(u,f,s+401)-.5)*.7)*r,m=(f+(Ce(u,f,s+402)-.5)*.7)*r;if(Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(p,m),x=M.openness<.35||M.openness>.8?1:.25,g=Ce(u,f,s+403),S=(xp.has(Xt[M.type].id)||!!Xt[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*x,y=i.campfire*x,A=i.magicStone*x,b=g<S?"pond":g<S+y?"campfire":g<S+y+A?"stone":null;b&&a.push({x:p,z:m,kind:b,size:.75+Ce(u,f,s+404)*.5})}return a}class vp{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;decor=new Map;relics=new Map;chunks(e,t,i){const r=[];for(let s=Math.floor((t-i)/Rt);s<=Math.floor((t+i)/Rt);s++)for(let a=Math.floor((e-i)/Rt);a<=Math.floor((e+i)/Rt);a++)r.push([a,s]);return r}gather(e,t,i,r,s){e.size>600&&e.clear();const a=[];for(const[o,h]of this.chunks(i,r,s)){const c=o+","+h;let d=e.get(c);d||(d=t(o,h),e.set(c,d));for(const f of d)Math.abs(f.x-i)<=s&&Math.abs(f.z-r)<=s&&a.push(f)}return a}treesNear(e,t,i){return this.gather(this.trees,(r,s)=>dp(this.map,r,s),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,s)=>fp(this.map,r,s),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(r,s)=>Mp(this.map,r,s),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(r,s)=>mp(this.map,r,s),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(r,s)=>gp(this.map,r,s),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,s)=>pp(this.map,r,s),e,t,i)}setPiecesNear(e,t,i){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-i)/s)-1;o<=Math.floor((t+i)/s)+1;o++)for(let h=Math.floor((e-i)/s)-1;h<=Math.floor((e+i)/s)+1;h++){if(h===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(h,o))continue;const c=r.siteOf(h,o);Math.abs(c.x-e)<=i&&Math.abs(c.z-4-t)<=i&&a.push({x:c.x,z:c.z-4,type:r.typeOf(h,o),variant:0,flip:Ce(h,o,r.seed+71)<.5})}return a}}const _p=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),Bu=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],bp=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],hl=n=>!n.leashed&&n.level!==to;function yp(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const r=n.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function mo(n,e,t,i,r=!1){let s=null,a=i;for(const o of n){if(o.leashed||!r&&!hl(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,s=o)}return s}function eh(n,e,t,i,r){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:r})}function Sp(n,e,t,i,r,s,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!r;const h=o.invite,c=o.leash,d=f=>e[f];if(t.talk&&r){const f=n.talk?d(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(f.id,n.talk.t),f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(eh(n,f,f.x,f.z,s),n.progress.delete(f.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s});const u=mo(e,i.x,i.z,h.talkRange)??mo(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!hl(u),t:n.progress.get(u.id)??0,total:hl(u)?Bu(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s}),n.talk=null);for(const[f,u]of n.progress){if(n.talk?.id===f)continue;const p=u-a*h.decayRate;p<=0||e[f].leashed?n.progress.delete(f):n.progress.set(f,p)}if(t.inviteNearest){const f=mo(e,i.x,i.z,1/0);f&&eh(n,f,f.x,f.z,s)}if(t.sigil&&r){let f=-1,u=c.pickRadius;if(n.placed.forEach((p,m)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,f=m)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:s})}else if(n.stack.length){const p=n.stack[n.stack.length-1];zu(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:s}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:s}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:s}))}}for(const f of n.stack)th(d(f),i.x,i.z,a,o);for(const f of n.placed)th(d(f.id),f.x,f.z,a,o)}const zu=(n,e,t,i)=>n.placed.some(r=>Math.hypot(r.x-e,r.z-t)<i.leash.spacing);function th(n,e,t,i,r){const s=r.leash,a=s.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),m=a*.5/p;n.tx=e+(n.x-e)*m,n.tz=t+(n.z-t)*m,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,m=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*m,n.tz=t+Math.sin(p)*m,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,d=Math.hypot(h,c);if(d<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,s.runSpeed*(n.level===to?.6:1)):n.speed*1.5,u=Math.min(d,f*i);n.x+=h/d*u,n.z+=c/d*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=cc(h,c,n.away,0,r),n.moving=!0,n.walk+=i*(o?7:4)}const wp=n=>`${n[0]},${n[1]}`;function Ep(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[wp(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function Ap(n,e){const t=n.siteOf(e[0],e[1]),i=ki(n.seed*17+e[0]*53+e[1]*911),[r,s]=Uu(n,[e[0],e[1]],t.x,t.z,n.areaSize*.75),a=Math.floor(Ce(e[0],e[1],n.seed+77)*3)%3;for(let o=0;o<24;o++){const h=i()*Math.PI*2,c=3+i()*4,d=r+Math.cos(h)*c,f=s+Math.sin(h)*c+3,u=n.areaAt(d,f).cell;if(u[0]===e[0]&&u[1]===e[1])return{x:d,z:f,variant:a}}return{x:r,z:s,variant:a}}const Tp=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function Hu(n,e,t){const i=n.wave+1,r=[],s=new Map,a=new Map;for(const[c,d]of n.areas)for(const f of e.neighbours.get(c)??[]){if(n.areas.has(f)||s.has(f))continue;const u=f.split(",").map(Number);Tp(e,u)&&(s.set(f,u),a.set(f,d.cell))}const o=[...s.entries()].sort((c,d)=>Ce(c[1][0],c[1][1],e.seed+i)-Ce(d[1][0],d[1][1],e.seed+i)),h=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[c,d]of o.slice(0,h)){const f={cell:d,wave:i,at:t,from:a.get(c)??null,soundsystem:Ap(e,d)};n.areas.set(c,f),r.push(f)}return n.wave=i,r}function Rp(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,Hu(n,e,t))}function Cp(n,e,t){const i=Math.max(0,n.nextAt-t),r=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/r)}}function Lp(n,e){const t=ep(n,e),i={...tp(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new vp(t),creatures:ap(t),clock:jd(),witch:i,camera:Zd(e,i.x,es(i,e),i.z),party:Ep(t),leash:_p()}}function Pp(n,e,t){const i=ef(n.clock,t);i!==0&&(n.witch=np(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Jd(n.camera,e.zoom,{x:n.witch.x,y:es(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(Hu(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),Rp(n.party,n.map,n.clock.time,i),lp(n.creatures,n.witch.x,n.witch.z,Dp(n),i,n.clock.time,n.map),Sp(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const Dp=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Fu(n.map)*2.5),nh=n=>vu(n.camera,n.camera.lift,n.tuning);function Gu(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Xt[e.type].name+(t?` (set piece: ${t})`:"")}const Ip="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Op="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Np=20,Fp=28,Up=4,kp=.7,Bp=4,zp="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Hp=1,Gp=.2,Wp=.18,Vp=.25,Yp=38,Xp="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",Kp={width:20,scale:40,stray:.5},qp="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",$p={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},Zp=.16,Jp=.8,Qp=2.25,jp="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",em={from:20,keep:.35},tm=1.7,nm=4.6,im=2.8,rm=10.5,sm=11.25,am=3.4,om=4,lm=.6,cm="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",hm=17.5,um=32,dm=10,fm="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRate degrees a second (half that at full boost), so she swoops in arcs; a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second (and she brakes); letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",pm={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,glideTime:1,sharpTurnBleed:3,cameraPull:.06},mm=28,gm=.7,xm={awayEnter:55,awayLeave:65},Mm=.7,vm=.55,_m=1.4,bm=24,ym="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Sm={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},wm="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Em=3,Am=120,Tm=8,Rm=1,Cm=16,Lm=12,Pm=20,Dm="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Im="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), a broad soft pool glowReach metres across from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",Om={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Nm=.65,Fm="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",Um={bpm:120},km="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",Bm="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",zm={height:3,opacity:.65,beam:.25,size:1},Hm={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},Gm="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Wm={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Vm="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Ym={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},Xm="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",Km={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},qm={spacing:10,campfire:.012,magicStone:.008,pond:.02,wetPond:.12},$m={near:150,far:360},Zm="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Jm={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},Qm="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",jm="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",eg={on:!0,strength:.7,trees:!1},tg={on:!0,strength:.45,height:18,cover:.55,wind:.6},ng={on:!0,strength:.12,height:3,wind:.8},ig="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",rg="smooth",sg="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",ag=0,og="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",lg={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},cg="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",hg={emojiPixels:11,scale:1},ug="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",dg={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},fg="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground.",pg={spacing:34,chance:.02,nearRoad:4},mg="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor.",gg={spacing:26,ruins:.03,rocks:.09,freak:.012,clearing:.3,pathGap:2},xg="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",Mg={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,treesOnBroken:.35,edgeBushes:3,bushBoost:3},vg="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",_g={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},bg={length:8,runSpeed:4,pickRadius:2,spacing:4},yg={rim:!0,sparks:!0,thread:!0,sparkEvery:4},Sg="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",wg={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},Eg="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",Ag={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},Tg="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Rg={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Cg="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Lg={screenFraction:.8,edge:.1},Pg="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Dg={black:.03,gamma:1.35,ambient:.35},Ig={on:!0,strength:.7,threshold:.55},Og={on:!0,where:"before",strength:3,band:.4,centre:.55},Ng="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Fg=2,Ug=20,kg=1.3,Bg=.5,zg=.35,Hg=.35,Gg=.25,Wg=!0,Vg=.55,Yg=600,Xg=.6,Kg="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",qg=.25,$g=1.8,Zg=9,Jg=.35,Qg={_readme:Ip,_map:Op,mapAreas:Np,areaSize:Fp,areaScale:Up,areaSizeVariance:kp,borderLayers:Bp,_trees:zp,treeDensity:Hp,clearingSize:Gp,clearingFalloff:Wp,gladeAmount:Vp,gladeScale:Yp,_areaEdgeBlend:Xp,areaEdgeBlend:Kp,_density:qp,density:$p,bushDensity:Zp,bushClump:Jp,treeHeight:Qp,_treeCap:jp,treeCap:em,crownWidth:tm,treeSpacingX:nm,treeSpacingZ:im,crownHalfWidth:rm,crownHeight:sm,bushSpacing:am,wallSpacing:om,wallDensity:lm,_witch:cm,groundSpeed:hm,treetopSpeed:um,acceleration:dm,_treetop:fm,treetop:pm,groundAcceleration:mm,leanAt:gm,facing:xm,riseTime:Mm,descendTime:vm,groundHeight:_m,treetopHeight:bm,_camera:ym,camera:Sm,_look:wm,pixelSize:Em,glowReach:Am,glowHeight:Tm,spriteTilt:Rm,artPixelsPerMetre:Cm,viewMargin:Lm,lightBudget:Pm,_lightSources:Dm,_lights:Im,lights:Om,glowPower:Nm,_beat:Fm,beat:Um,_occlusion:km,_sigilProjection:Bm,sigilProjection:zm,occlusion:Hm,_stack:Gm,stack:Wm,_lasers:Vm,lasers:Ym,_borders:Xm,borders:Km,lightSources:qm,haze:$m,_scenery:Zm,scenery:Jm,_post:Qm,_shadows:jm,shadows:eg,canopyShadow:tg,mist:ng,_fx:ig,fx:rg,_moonbeams:sg,moonbeams:ag,_treehouse:og,treehouse:lg,_bubbles:cg,bubbles:hg,_grounds:ug,grounds:dg,_relics:fg,relics:pg,_decor:mg,decor:gg,_paths:xg,paths:Mg,_invite:vg,invite:_g,leash:bg,bond:yg,_party:Sg,party:wg,_stringLights:Eg,stringLights:Ag,_dancefloor:Tg,dancefloor:Rg,_canopyCutout:Cg,canopyCutout:Lg,_tone:Pg,tone:Dg,bloom:Ig,tiltShift:Og,_creatures:Ng,creaturesNear:Fg,creaturesFar:Ug,creatureCurve:kg,youngShareFar:Bg,adultsFrom:zg,adultShareFar:Hg,legendChanceFar:Gg,legendNextToHome:Wg,legendsFrom:Vg,creatureSimRadius:Yg,creatureSpeed:Xg,_setPieces:Kg,setPieceChance:qg,setPieceScale:$g,setPieceClear:Zg,legendSpeed:Jg},ir=Qg;class jg{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,r=x=>this.pressed.has(x);let s=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=r("Space"),h=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),c=r("Backquote"),d=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=r("KeyE")||r("KeyR");const u=r("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const g=w=>!!x.buttons[w]?.pressed,S=x.buttons.some((w,L)=>w.pressed&&!this.padPrev[L])&&!!this.onAny?.(),y=w=>!S&&g(w)&&!this.padPrev[w];let A=x.axes[0]??0,b=x.axes[1]??0;const E=Math.hypot(A,b),_=.18;if(E<_)A=0,b=0;else{const w=(Math.min(1,E)-_)/(1-_)/E;A*=w,b*=w}A+=(g(15)?1:0)-(g(14)?1:0),b+=(g(13)?1:0)-(g(12)?1:0),s+=A,a+=b,y(3)&&(o=!0),(y(4)||y(6))&&(h+=1),(y(5)||y(7))&&(h-=1),y(8)&&(c=!0),g(0)&&(d=!0),y(2)&&(f=!0),this.padPrev=x.buttons.map(w=>w.pressed);break}const m=this.touch;s+=m.x,a+=m.y,m.toggle&&(o=!0),h+=m.zoom,m.debug&&(c=!0),m.talk&&(d=!0),m.sigil&&(f=!0),m.toggle=!1,m.zoom=0,m.debug=!1,m.sigil=!1;const M=Math.hypot(s,a);return M>1&&(s/=M,a/=M),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:c,nextWave:e,pauseWaves:t,talk:d,sigil:f,inviteNearest:u}}}const uc="186",e1=0,ih=1,t1=2,Aa=1,n1=2,Ts=3,vr=0,Dn=1,Oi=2,yi=0,$r=1,_r=2,rh=3,sh=4,no=5,Gr=100,i1=101,r1=102,s1=103,a1=104,dc=200,o1=201,fc=202,l1=203,pc=204,mc=205,c1=206,h1=207,u1=208,d1=209,f1=210,p1=211,m1=212,g1=213,x1=214,ul=0,dl=1,fl=2,Ps=3,pl=4,ml=5,Fa=6,gl=7,Wu=0,M1=1,v1=2,Si=0,Vu=1,Yu=2,Xu=3,Ku=4,qu=5,$u=6,Zu=7,Ju=300,br=301,ts=302,go=303,xo=304,io=306,Ua=1e3,Ni=1001,xl=1002,Yt=1003,_1=1004,Xs=1005,Vt=1006,Mo=1007,mr=1008,Un=1009,Qu=1010,ju=1011,Ds=1012,gc=1013,wi=1014,_i=1015,Ei=1016,xc=1017,Mc=1018,Is=1020,ed=35902,td=35899,nd=1021,id=1022,kn=1023,Bi=1026,gr=1027,rd=1028,vc=1029,yr=1030,_c=1031,bc=1033,Ta=33776,Ra=33777,Ca=33778,La=33779,Ml=35840,vl=35841,_l=35842,bl=35843,yl=36196,Sl=37492,wl=37496,El=37488,Al=37489,ka=37490,Tl=37491,Rl=37808,Cl=37809,Ll=37810,Pl=37811,Dl=37812,Il=37813,Ol=37814,Nl=37815,Fl=37816,Ul=37817,kl=37818,Bl=37819,zl=37820,Hl=37821,Gl=36492,Wl=36494,Vl=36495,Yl=36283,Xl=36284,Ba=36285,Kl=36286,b1=3200,ah=0,y1=1,Xn="",Vn="srgb",Os="srgb-linear",za="linear",St="srgb",vo=7680,S1=519,w1=512,E1=513,A1=514,yc=515,T1=516,R1=517,Sc=518,C1=519,L1=35044,Zr=35048,oh="300 es",bi=2e3,Ha=2001;function P1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ga(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function D1(){const n=Ga("canvas");return n.style.display="block",n}const lh={};function ch(...n){const e="THREE."+n.shift();console.log(e,...n)}function sd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xe(...n){n=sd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function dt(...n){n=sd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Jr(...n){const e=n.join(" ");e in lh||(lh[e]=!0,Xe(...n))}function I1(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const O1={[ul]:dl,[fl]:Fa,[pl]:gl,[Ps]:ml,[dl]:ul,[Fa]:fl,[gl]:pl,[ml]:Ps};class wr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_o=Math.PI/180,ql=180/Math.PI;function Us(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function N1(n,e){return(n%e+e)%e}function bo(n,e,t){return(1-t)*n+t*e}function ms(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Rn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class qe{static{qe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class os{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let h=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3],u=s[a+0],p=s[a+1],m=s[a+2],M=s[a+3];if(f!==M||h!==u||c!==p||d!==m){let x=h*u+c*p+d*m+f*M;x<0&&(u=-u,p=-p,m=-m,M=-M,x=-x);let g=1-o;if(x<.9995){const v=Math.acos(x),S=Math.sin(v);g=Math.sin(g*v)/S,o=Math.sin(o*v)/S,h=h*g+u*o,c=c*g+p*o,d=d*g+m*o,f=f*g+M*o}else{h=h*g+u*o,c=c*g+p*o,d=d*g+m*o,f=f*g+M*o;const v=1/Math.sqrt(h*h+c*c+d*d+f*f);h*=v,c*=v,d*=v,f*=v}}e[t]=h,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],h=i[r+1],c=i[r+2],d=i[r+3],f=s[a],u=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+d*f+h*p-c*u,e[t+1]=h*m+d*u+c*f-o*p,e[t+2]=c*m+d*p+o*u-h*f,e[t+3]=d*m-o*f-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),d=o(r/2),f=o(s/2),u=h(i/2),p=h(r/2),m=h(s/2);switch(a){case"XYZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"YXZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"ZXY":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"ZYX":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"YZX":this._x=u*d*f+c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f-u*p*m;break;case"XZY":this._x=u*d*f-c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f+u*p*m;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],h=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-h)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(d-h)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(h+d)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(h+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,h=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*h,this._y=r*d+a*h+s*o-i*c,this._z=s*d+a*c+i*h-r*o,this._w=a*d-i*o-r*h-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);h=Math.sin(h*c)/d,t=Math.sin(t*c)/d,this._x=this._x*h+i*t,this._y=this._y*h+r*t,this._z=this._z*h+s*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+r*t,this._z=this._z*h+s*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{V.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+h*c+a*f-o*d,this.y=i+h*d+o*c-s*f,this.z=r+h*f+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,h=t.z;return this.x=r*h-s*o,this.y=s*a-i*h,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yo.copy(this).projectOnVector(e),this.sub(yo)}reflect(e){return this.sub(yo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yo=new V,hh=new os;class $e{static{$e.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,h,c)}set(e,t,i,r,s,a,o,h,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=h,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],m=i[8],M=r[0],x=r[3],g=r[6],v=r[1],S=r[4],y=r[7],A=r[2],b=r[5],E=r[8];return s[0]=a*M+o*v+h*A,s[3]=a*x+o*S+h*b,s[6]=a*g+o*y+h*E,s[1]=c*M+d*v+f*A,s[4]=c*x+d*S+f*b,s[7]=c*g+d*y+f*E,s[2]=u*M+p*v+m*A,s[5]=u*x+p*S+m*b,s[8]=u*g+p*y+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*h+r*s*c-r*a*h}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*h-d*s,p=c*s-a*h,m=t*f+i*u+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(r*c-d*i)*M,e[2]=(o*i-r*a)*M,e[3]=u*M,e[4]=(d*t-r*h)*M,e[5]=(r*s-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const h=Math.cos(s),c=Math.sin(s);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-r*c,r*h,-r*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return Jr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(So.makeScale(e,t)),this}rotate(e){return Jr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(So.makeRotation(-e)),this}translate(e,t){return Jr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(So.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const So=new $e,uh=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function F1(){const n={enabled:!0,workingColorSpace:Os,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===St&&(r.r=Ui(r.r),r.g=Ui(r.g),r.b=Ui(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===St&&(r.r=Qr(r.r),r.g=Qr(r.g),r.b=Qr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Xn?za:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Os]:{primaries:e,whitePoint:i,transfer:za,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vn},outputColorSpaceConfig:{drawingBufferColorSpace:Vn}},[Vn]:{primaries:e,whitePoint:i,transfer:St,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vn}}}),n}const at=F1();function Ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Tr;class U1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Tr===void 0&&(Tr=Ga("canvas")),Tr.width=e.width,Tr.height=e.height;const r=Tr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Tr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ga("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ui(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ui(t[i]/255)*255):t[i]=Ui(t[i]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let k1=0;class wc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:k1++}),this.uuid=Us(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(wo(r[a].image)):s.push(wo(r[a]))}else s=wo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function wo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?U1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}let B1=0;const Eo=new V;class bn extends wr{constructor(e=bn.DEFAULT_IMAGE,t=bn.DEFAULT_MAPPING,i=Ni,r=Ni,s=Vt,a=mr,o=kn,h=Un,c=bn.DEFAULT_ANISOTROPY,d=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B1++}),this.uuid=Us(),this.name="",this.source=new wc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Eo).x}get height(){return this.source.getSize(Eo).y}get depth(){return this.source.getSize(Eo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ju)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ua:e.x=e.x-Math.floor(e.x);break;case Ni:e.x=e.x<0?0:1;break;case xl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ua:e.y=e.y-Math.floor(e.y);break;case Ni:e.y=e.y<0?0:1;break;case xl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=Ju;bn.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const h=e.elements,c=h[0],d=h[4],f=h[8],u=h[1],p=h[5],m=h[9],M=h[2],x=h[6],g=h[10];if(Math.abs(d-u)<.01&&Math.abs(f-M)<.01&&Math.abs(m-x)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+M)<.1&&Math.abs(m+x)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,y=(p+1)/2,A=(g+1)/2,b=(d+u)/4,E=(f+M)/4,_=(m+x)/4;return S>y&&S>A?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=b/i,s=E/i):y>A?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=b/r,s=_/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=E/s,r=_/s),this.set(i,r,s,t),this}let v=Math.sqrt((x-m)*(x-m)+(f-M)*(f-M)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(x-m)/v,this.y=(f-M)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class z1 extends wr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new bn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new wc(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends z1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ad extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class H1 extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Bt{static{Bt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,h,c,d,f,u,p,m,M,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,h,c,d,f,u,p,m,M,x)}set(e,t,i,r,s,a,o,h,c,d,f,u,p,m,M,x){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=h,g[2]=c,g[6]=d,g[10]=f,g[14]=u,g[3]=p,g[7]=m,g[11]=M,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Rr.setFromMatrixColumn(e,0).length(),s=1/Rr.setFromMatrixColumn(e,1).length(),a=1/Rr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=-h*f,t[8]=c,t[1]=p+m*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=m+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u+M*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=p*o-m,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u-M*o,t[4]=-a*f,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*d,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=m*c-p,t[8]=u*c+M,t[1]=h*f,t[5]=M*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=M-u*f,t[8]=m*f+p,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*f+m,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=-f,t[8]=c*d,t[1]=u*f+M,t[5]=a*d,t[9]=p*f-m,t[2]=m*f-p,t[6]=o*d,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G1,e,W1)}lookAt(e,t,i){const r=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),Yi.crossVectors(i,In),Yi.lengthSq()===0&&(Math.abs(i.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),Yi.crossVectors(i,In)),Yi.normalize(),Ks.crossVectors(In,Yi),r[0]=Yi.x,r[4]=Ks.x,r[8]=In.x,r[1]=Yi.y,r[5]=Ks.y,r[9]=In.y,r[2]=Yi.z,r[6]=Ks.z,r[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],m=i[2],M=i[6],x=i[10],g=i[14],v=i[3],S=i[7],y=i[11],A=i[15],b=r[0],E=r[4],_=r[8],w=r[12],L=r[1],R=r[5],P=r[9],O=r[13],I=r[2],U=r[6],z=r[10],k=r[14],ee=r[3],H=r[7],Z=r[11],N=r[15];return s[0]=a*b+o*L+h*I+c*ee,s[4]=a*E+o*R+h*U+c*H,s[8]=a*_+o*P+h*z+c*Z,s[12]=a*w+o*O+h*k+c*N,s[1]=d*b+f*L+u*I+p*ee,s[5]=d*E+f*R+u*U+p*H,s[9]=d*_+f*P+u*z+p*Z,s[13]=d*w+f*O+u*k+p*N,s[2]=m*b+M*L+x*I+g*ee,s[6]=m*E+M*R+x*U+g*H,s[10]=m*_+M*P+x*z+g*Z,s[14]=m*w+M*O+x*k+g*N,s[3]=v*b+S*L+y*I+A*ee,s[7]=v*E+S*R+y*U+A*H,s[11]=v*_+S*P+y*z+A*Z,s[15]=v*w+S*O+y*k+A*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],h=e[9],c=e[13],d=e[2],f=e[6],u=e[10],p=e[14],m=e[3],M=e[7],x=e[11],g=e[15],v=h*p-c*u,S=o*p-c*f,y=o*u-h*f,A=a*p-c*d,b=a*u-h*d,E=a*f-o*d;return t*(M*v-x*S+g*y)-i*(m*v-x*A+g*b)+r*(m*S-M*A+g*E)-s*(m*y-M*b+x*E)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],h=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(s*d-o*h)+r*(s*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=e[9],u=e[10],p=e[11],m=e[12],M=e[13],x=e[14],g=e[15],v=t*o-i*a,S=t*h-r*a,y=t*c-s*a,A=i*h-r*o,b=i*c-s*o,E=r*c-s*h,_=d*M-f*m,w=d*x-u*m,L=d*g-p*m,R=f*x-u*M,P=f*g-p*M,O=u*g-p*x,I=v*O-S*P+y*R+A*L-b*w+E*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/I;return e[0]=(o*O-h*P+c*R)*U,e[1]=(r*P-i*O-s*R)*U,e[2]=(M*E-x*b+g*A)*U,e[3]=(u*b-f*E-p*A)*U,e[4]=(h*L-a*O-c*w)*U,e[5]=(t*O-r*L+s*w)*U,e[6]=(x*y-m*E-g*S)*U,e[7]=(d*E-u*y+p*S)*U,e[8]=(a*P-o*L+c*_)*U,e[9]=(i*L-t*P-s*_)*U,e[10]=(m*b-M*y+g*v)*U,e[11]=(f*y-d*b-p*v)*U,e[12]=(o*w-a*R-h*_)*U,e[13]=(t*R-i*w+r*_)*U,e[14]=(M*S-m*A-x*v)*U,e[15]=(d*A-f*S+u*v)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,h=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*h,c*h+r*o,0,c*o+r*h,d*o+i,d*h-r*a,0,c*h-r*o,d*h+r*a,s*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,h=t._w,c=s+s,d=a+a,f=o+o,u=s*c,p=s*d,m=s*f,M=a*d,x=a*f,g=o*f,v=h*c,S=h*d,y=h*f,A=i.x,b=i.y,E=i.z;return r[0]=(1-(M+g))*A,r[1]=(p+y)*A,r[2]=(m-S)*A,r[3]=0,r[4]=(p-y)*b,r[5]=(1-(u+g))*b,r[6]=(x+v)*b,r[7]=0,r[8]=(m+S)*E,r[9]=(x-v)*E,r[10]=(1-(u+M))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Rr.set(r[0],r[1],r[2]).length();const o=Rr.set(r[4],r[5],r[6]).length(),h=Rr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Jn.copy(this);const c=1/a,d=1/o,f=1/h;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=d,Jn.elements[5]*=d,Jn.elements[6]*=d,Jn.elements[8]*=f,Jn.elements[9]*=f,Jn.elements[10]*=f,t.setFromRotationMatrix(Jn),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,r,s,a,o=bi,h=!1){const c=this.elements,d=2*s/(t-e),f=2*s/(i-r),u=(t+e)/(t-e),p=(i+r)/(i-r);let m,M;if(h)m=s/(a-s),M=a*s/(a-s);else if(o===bi)m=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===Ha)m=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=bi,h=!1){const c=this.elements,d=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,M;if(h)m=1/(a-s),M=a/(a-s);else if(o===bi)m=-2/(a-s),M=-(a+s)/(a-s);else if(o===Ha)m=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Rr=new V,Jn=new Bt,G1=new V(0,0,0),W1=new V(1,1,1),Yi=new V,Ks=new V,In=new V,fh=new Bt,ph=new os;class Sr{constructor(e=0,t=0,i=0,r=Sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],h=r[1],c=r[5],d=r[9],f=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(lt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ph.setFromEuler(this),this.setFromQuaternion(ph,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sr.DEFAULT_ORDER="XYZ";class od{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let V1=0;const mh=new V,Cr=new os,Ri=new Bt,qs=new V,gs=new V,Y1=new V,X1=new os,gh=new V(1,0,0),xh=new V(0,1,0),Mh=new V(0,0,1),vh={type:"added"},K1={type:"removed"},Lr={type:"childadded",child:null},Ao={type:"childremoved",child:null};class Tn extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:V1++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tn.DEFAULT_UP.clone();const e=new V,t=new Sr,i=new os,r=new V(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Bt},normalMatrix:{value:new $e}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new od,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(gh,e)}rotateY(e){return this.rotateOnAxis(xh,e)}rotateZ(e){return this.rotateOnAxis(Mh,e)}translateOnAxis(e,t){return mh.copy(e).applyQuaternion(this.quaternion),this.position.add(mh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gh,e)}translateY(e){return this.translateOnAxis(xh,e)}translateZ(e){return this.translateOnAxis(Mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qs.copy(e):qs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(gs,qs,this.up):Ri.lookAt(qs,gs,this.up),this.quaternion.setFromRotationMatrix(Ri),r&&(Ri.extractRotation(r.matrixWorld),Cr.setFromRotationMatrix(Ri),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(dt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vh),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null):dt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(K1),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vh),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,Y1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,X1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,d=h.length;c<d;c++){const f=h[c];s(e.shapes,f)}else s(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(s(e.materials,this.material[h]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];r.animations.push(s(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const h=[];for(const c in o){const d=o[c];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Tn.DEFAULT_UP=new V(0,1,0);Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Vr extends Tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const q1={type:"move"};class To{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),g=this._getHandJoint(c,M);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(q1)))}return o!==null&&(o.visible=r!==null),h!==null&&(h.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Vr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},$s={h:0,s:0,l:0};function Ro(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=N1(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ro(a,s,e+1/3),this.g=Ro(a,s,e),this.b=Ro(a,s,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,t=Vn){function i(s){s!==void 0&&parseFloat(s)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vn){const i=ld[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vn){return at.workingToColorSpace(Mn.copy(this),e),Math.round(lt(Mn.r*255,0,255))*65536+Math.round(lt(Mn.g*255,0,255))*256+Math.round(lt(Mn.b*255,0,255))}getHexString(e=Vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Mn.copy(this),t);const i=Mn.r,r=Mn.g,s=Mn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let h,c;const d=(o+a)/2;if(o===a)h=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:h=(r-s)/f+(r<s?6:0);break;case r:h=(s-i)/f+2;break;case s:h=(i-r)/f+4;break}h/=6}return e.h=h,e.s=c,e.l=d,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=Vn){at.workingToColorSpace(Mn.copy(this),e);const t=Mn.r,i=Mn.g,r=Mn.b;return e!==Vn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL($s);const i=bo(Xi.h,$s.h,t),r=bo(Xi.s,$s.s,t),s=bo(Xi.l,$s.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mn=new nt;nt.NAMES=ld;class _h extends Tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sr,this.environmentIntensity=1,this.environmentRotation=new Sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qn=new V,Ci=new V,Co=new V,Li=new V,Pr=new V,Dr=new V,bh=new V,Lo=new V,Po=new V,Do=new V,Io=new rt,Oo=new rt,No=new rt;class ni{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Qn.subVectors(e,t),r.cross(Qn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Qn.subVectors(r,t),Ci.subVectors(i,t),Co.subVectors(e,t);const a=Qn.dot(Qn),o=Qn.dot(Ci),h=Qn.dot(Co),c=Ci.dot(Ci),d=Ci.dot(Co),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,p=(c*h-o*d)*u,m=(a*d-o*h)*u;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,i,r,s,a,o,h){return this.getBarycoord(e,t,i,r,Li)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,Li.x),h.addScaledVector(a,Li.y),h.addScaledVector(o,Li.z),h)}static getInterpolatedAttribute(e,t,i,r,s,a){return Io.setScalar(0),Oo.setScalar(0),No.setScalar(0),Io.fromBufferAttribute(e,t),Oo.fromBufferAttribute(e,i),No.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Io,s.x),a.addScaledVector(Oo,s.y),a.addScaledVector(No,s.z),a}static isFrontFacing(e,t,i,r){return Qn.subVectors(i,t),Ci.subVectors(e,t),Qn.cross(Ci).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),Qn.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return ni.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Pr.subVectors(r,i),Dr.subVectors(s,i),Lo.subVectors(e,i);const h=Pr.dot(Lo),c=Dr.dot(Lo);if(h<=0&&c<=0)return t.copy(i);Po.subVectors(e,r);const d=Pr.dot(Po),f=Dr.dot(Po);if(d>=0&&f<=d)return t.copy(r);const u=h*f-d*c;if(u<=0&&h>=0&&d<=0)return a=h/(h-d),t.copy(i).addScaledVector(Pr,a);Do.subVectors(e,s);const p=Pr.dot(Do),m=Dr.dot(Do);if(m>=0&&p<=m)return t.copy(s);const M=p*c-h*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Dr,o);const x=d*m-p*f;if(x<=0&&f-d>=0&&p-m>=0)return bh.subVectors(s,r),o=(f-d)/(f-d+(p-m)),t.copy(r).addScaledVector(bh,o);const g=1/(x+M+u);return a=M*g,o=u*g,t.copy(i).addScaledVector(Pr,a).addScaledVector(Dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ls{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zs.copy(i.boundingBox)),Zs.applyMatrix4(e.matrixWorld),this.union(Zs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xs),Js.subVectors(this.max,xs),Ir.subVectors(e.a,xs),Or.subVectors(e.b,xs),Nr.subVectors(e.c,xs),Ki.subVectors(Or,Ir),qi.subVectors(Nr,Or),rr.subVectors(Ir,Nr);let t=[0,-Ki.z,Ki.y,0,-qi.z,qi.y,0,-rr.z,rr.y,Ki.z,0,-Ki.x,qi.z,0,-qi.x,rr.z,0,-rr.x,-Ki.y,Ki.x,0,-qi.y,qi.x,0,-rr.y,rr.x,0];return!Fo(t,Ir,Or,Nr,Js)||(t=[1,0,0,0,1,0,0,0,1],!Fo(t,Ir,Or,Nr,Js))?!1:(Qs.crossVectors(Ki,qi),t=[Qs.x,Qs.y,Qs.z],Fo(t,Ir,Or,Nr,Js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new V,new V,new V,new V,new V,new V,new V,new V],jn=new V,Zs=new ls,Ir=new V,Or=new V,Nr=new V,Ki=new V,qi=new V,rr=new V,xs=new V,Js=new V,Qs=new V,sr=new V;function Fo(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){sr.fromArray(n,s);const o=r.x*Math.abs(sr.x)+r.y*Math.abs(sr.y)+r.z*Math.abs(sr.z),h=e.dot(sr),c=t.dot(sr),d=i.dot(sr);if(Math.max(-Math.max(h,c,d),Math.min(h,c,d))>o)return!1}return!0}const Jt=new V,js=new qe;let $1=0;class Bn extends wr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=L1,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)js.fromBufferAttribute(this,t),js.applyMatrix3(e),this.setXY(t,js.x,js.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ms(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Rn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ms(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ms(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ms(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ms(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),i=Rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),i=Rn(i,this.array),r=Rn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),i=Rn(i,this.array),r=Rn(r,this.array),s=Rn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class cd extends Bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class hd extends Bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ot extends Bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Z1=new ls,Ms=new V,Uo=new V;class ks{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Z1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ms.subVectors(e,this.center);const t=Ms.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ms,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ms.copy(e.center).add(Uo)),this.expandByPoint(Ms.copy(e.center).sub(Uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let J1=0;const Wn=new Bt,ko=new Tn,Fr=new V,On=new ls,vs=new ls,on=new V;class jt extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J1++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(P1(e)?hd:cd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,t,i){return Wn.makeTranslation(e,t,i),this.applyMatrix4(Wn),this}scale(e,t,i){return Wn.makeScale(e,t,i),this.applyMatrix4(Wn),this}lookAt(e){return ko.lookAt(e),ko.updateMatrix(),this.applyMatrix4(ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ot(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];On.setFromBufferAttribute(s),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(On.min,vs.min),On.expandByPoint(on),on.addVectors(On.max,vs.max),On.expandByPoint(on)):(On.expandByPoint(vs.min),On.expandByPoint(vs.max))}On.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)on.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(on));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],h=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)on.fromBufferAttribute(o,c),h&&(Fr.fromBufferAttribute(e,c),on.add(Fr)),r=Math.max(r,i.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Bn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new V,h[_]=new V;const c=new V,d=new V,f=new V,u=new qe,p=new qe,m=new qe,M=new V,x=new V;function g(_,w,L){c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,w),f.fromBufferAttribute(i,L),u.fromBufferAttribute(s,_),p.fromBufferAttribute(s,w),m.fromBufferAttribute(s,L),d.sub(c),f.sub(c),p.sub(u),m.sub(u);const R=1/(p.x*m.y-m.x*p.y);isFinite(R)&&(M.copy(d).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(R),x.copy(f).multiplyScalar(p.x).addScaledVector(d,-m.x).multiplyScalar(R),o[_].add(M),o[w].add(M),o[L].add(M),h[_].add(x),h[w].add(x),h[L].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,w=v.length;_<w;++_){const L=v[_],R=L.start,P=L.count;for(let O=R,I=R+P;O<I;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const S=new V,y=new V,A=new V,b=new V;function E(_){A.fromBufferAttribute(r,_),b.copy(A);const w=o[_];S.copy(w),S.sub(A.multiplyScalar(A.dot(w))).normalize(),y.crossVectors(b,w);const R=y.dot(h[_])<0?-1:1;a.setXYZW(_,S.x,S.y,S.z,R)}for(let _=0,w=v.length;_<w;++_){const L=v[_],R=L.start,P=L.count;for(let O=R,I=R+P;O<I;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new V,s=new V,a=new V,o=new V,h=new V,c=new V,d=new V,f=new V;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),M=e.getX(u+1),x=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,x),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),o.fromBufferAttribute(i,m),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,x),o.add(d),h.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,h){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(h.length*d);let p=0,m=0;for(let M=0,x=h.length;M<x;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*d;for(let g=0;g<d;g++)u[m++]=c[p++]}return new Bn(u,d,f)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,r=this.attributes;for(const o in r){const h=r[o],c=e(h,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const h=[],c=s[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const r={};let s=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],d=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(r[h]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bo=new V,Q1=new V,j1=new $e;class Ji{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Bo.subVectors(i,t).cross(Q1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Bo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||j1.getNormalMatrix(e),r=this.coplanarPoint(Bo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let e2=0;class cs extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e2++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=$r,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=S1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vo,this.stencilZFail=vo,this.stencilZPass=vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const h=s[o];delete h.metadata,a.push(h)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ji().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new qe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Di=new V,zo=new V,ea=new V,ta=new V;class Ec{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){zo.copy(e).add(t).multiplyScalar(.5),ea.copy(t).sub(e).normalize(),ta.copy(this.origin).sub(zo);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ea),o=ta.dot(this.direction),h=-ta.dot(ea),c=ta.lengthSq(),d=Math.abs(1-a*a);let f,u,p,m;if(d>0)if(f=a*h-o,u=a*o-h,m=s*d,f>=0)if(u>=-m)if(u<=m){const M=1/d;f*=M,u*=M,p=f*(f+a*u+2*o)+u*(a*f+u+2*h)+c}else u=s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u=-s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u<=-m?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-h),s),p=-f*f+u*(u+2*h)+c):u<=m?(f=0,u=Math.min(Math.max(-s,-h),s),p=u*(u+2*h)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-h),s),p=-f*f+u*(u+2*h)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(zo).addScaledVector(ea,u),p}intersectSphere(e,t){if(e.radius<0)return null;Di.subVectors(e.center,this.origin);const i=Di.dot(this.direction),r=Di.dot(Di)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,h;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,h=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,h=(e.min.z-u.z)*f),i>h||o>r)||((o>i||i!==i)&&(i=o),(h<r||r!==r)&&(r=h),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,h=o.x,c=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,m=t.x-a.x,M=t.y-a.y,x=t.z-a.z,g=i.x-a.x,v=i.y-a.y,S=i.z-a.z,y=Math.abs(h),A=Math.abs(c),b=Math.abs(d);let E,_,w,L,R,P,O,I,U,z,k,ee;if(y>=A&&y>=b?(w=h,P=f,U=m,ee=g,h>=0?(E=c,_=d,L=u,R=p,O=M,I=x,z=v,k=S):(E=d,_=c,L=p,R=u,O=x,I=M,z=S,k=v)):A>=b?(w=c,P=u,U=M,ee=v,c>=0?(E=d,_=h,L=p,R=f,O=x,I=m,z=S,k=g):(E=h,_=d,L=f,R=p,O=m,I=x,z=g,k=S)):(w=d,P=p,U=x,ee=S,d>=0?(E=h,_=c,L=f,R=u,O=m,I=M,z=g,k=v):(E=c,_=h,L=u,R=f,O=M,I=m,z=v,k=g)),w===0)return null;const H=E/w,Z=_/w,N=1/w,Y=L-H*P,j=R-Z*P,oe=O-H*U,he=I-Z*U,xe=z-H*ee,q=k-Z*ee,ie=xe*he-q*oe,W=Y*q-j*xe,pe=oe*j-he*Y;if(r){if(ie<0||W<0||pe<0)return null}else if((ie<0||W<0||pe<0)&&(ie>0||W>0||pe>0))return null;const ce=ie+W+pe;if(ce===0)return null;const Ae=N*(ie*P+W*U+pe*ee);return(ce>0?Ae<0:Ae>0)?null:this.at(Ae/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ud extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.combine=Wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yh=new Bt,ar=new Ec,na=new ks,Sh=new V,ia=new V,ra=new V,sa=new V,Ho=new V,aa=new V,wh=new V,oa=new V;class qt extends Tn{constructor(e=new jt,t=new ud){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){aa.set(0,0,0);for(let h=0,c=s.length;h<c;h++){const d=o[h],f=s[h];d!==0&&(Ho.fromBufferAttribute(f,e),a?aa.addScaledVector(Ho,d):aa.addScaledVector(Ho.sub(t),d))}t.add(aa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(s),ar.copy(e.ray).recast(e.near),!(na.containsPoint(ar.origin)===!1&&(ar.intersectSphere(na,Sh)===null||ar.origin.distanceToSquared(Sh)>(e.far-e.near)**2))&&(yh.copy(s).invert(),ar.copy(e.ray).applyMatrix4(yh),!(i.boundingBox!==null&&ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ar)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,h=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),S=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let y=v,A=S;y<A;y+=3){const b=o.getX(y),E=o.getX(y+1),_=o.getX(y+2);r=la(this,g,e,i,c,d,f,b,E,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=o.getX(x),S=o.getX(x+1),y=o.getX(x+2);r=la(this,a,e,i,c,d,f,v,S,y),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),S=Math.min(h.count,Math.min(x.start+x.count,p.start+p.count));for(let y=v,A=S;y<A;y+=3){const b=y,E=y+1,_=y+2;r=la(this,g,e,i,c,d,f,b,E,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=x,S=x+1,y=x+2;r=la(this,a,e,i,c,d,f,v,S,y),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function t2(n,e,t,i,r,s,a,o){let h;if(e.side===Dn?h=i.intersectTriangle(a,s,r,!0,o):h=i.intersectTriangle(r,s,a,e.side===vr,o),h===null)return null;oa.copy(o),oa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(oa);return c<t.near||c>t.far?null:{distance:c,point:oa.clone(),object:n}}function la(n,e,t,i,r,s,a,o,h,c){n.getVertexPosition(o,ia),n.getVertexPosition(h,ra),n.getVertexPosition(c,sa);const d=t2(n,e,t,i,ia,ra,sa,wh);if(d){const f=new V;ni.getBarycoord(wh,ia,ra,sa,f),r&&(d.uv=ni.getInterpolatedAttribute(r,o,h,c,f,new qe)),s&&(d.uv1=ni.getInterpolatedAttribute(s,o,h,c,f,new qe)),a&&(d.normal=ni.getInterpolatedAttribute(a,o,h,c,f,new V),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new V,materialIndex:0};ni.getNormal(ia,ra,sa,u.normal),d.face=u,d.barycoord=f}return d}class Yr extends bn{constructor(e=null,t=1,i=1,r,s,a,o,h,c=Yt,d=Yt,f,u){super(null,a,o,h,c,d,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ac extends Bn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const or=new ks,n2=new qe(.5,.5),ca=new V;class Wa{constructor(e=new Ji,t=new Ji,i=new Ji,r=new Ji,s=new Ji,a=new Ji){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],h=s[2],c=s[3],d=s[4],f=s[5],u=s[6],p=s[7],m=s[8],M=s[9],x=s[10],g=s[11],v=s[12],S=s[13],y=s[14],A=s[15];if(r[0].setComponents(c-a,p-d,g-m,A-v).normalize(),r[1].setComponents(c+a,p+d,g+m,A+v).normalize(),r[2].setComponents(c+o,p+f,g+M,A+S).normalize(),r[3].setComponents(c-o,p-f,g-M,A-S).normalize(),i)r[4].setComponents(h,u,x,y).normalize(),r[5].setComponents(c-h,p-u,g-x,A-y).normalize();else if(r[4].setComponents(c-h,p-u,g-x,A-y).normalize(),t===bi)r[5].setComponents(c+h,p+u,g+x,A+y).normalize();else if(t===Ha)r[5].setComponents(h,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),or.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(or)}intersectsSprite(e){or.center.set(0,0,0);const t=n2.distanceTo(e.center);return or.radius=.7071067811865476+t,or.applyMatrix4(e.matrixWorld),this.intersectsSphere(or)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ca.x=r.normal.x>0?e.max.x:e.min.x,ca.y=r.normal.y>0?e.max.y:e.min.y,ca.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ca)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class dd extends cs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Va=new V,Ya=new V,Eh=new Bt,_s=new Ec,ha=new ks,Go=new V,Ah=new V;class i2 extends Tn{constructor(e=new jt,t=new dd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Va.fromBufferAttribute(t,r-1),Ya.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Va.distanceTo(Ya);e.setAttribute("lineDistance",new Ot(i,1))}else Xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(r),ha.radius+=s,e.ray.intersectsSphere(ha)===!1)return;Eh.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Eh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=d.getX(M),v=d.getX(M+1),S=ua(this,e,_s,h,g,v,M);S&&t.push(S)}if(this.isLineLoop){const M=d.getX(m-1),x=d.getX(p),g=ua(this,e,_s,h,M,x,m-1);g&&t.push(g)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=ua(this,e,_s,h,M,M+1,M);g&&t.push(g)}if(this.isLineLoop){const M=ua(this,e,_s,h,m-1,p,m-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ua(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Va.fromBufferAttribute(o,r),Ya.fromBufferAttribute(o,s),t.distanceSqToSegment(Va,Ya,Go,Ah)>i)return;Go.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Go);if(!(c<e.near||c>e.far))return{distance:c,point:Ah.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Th=new V,Rh=new V;class Tc extends i2{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Th.fromBufferAttribute(t,r),Rh.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Th.distanceTo(Rh);e.setAttribute("lineDistance",new Ot(i,1))}else Xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class r2 extends cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ch=new Bt,$l=new Ec,da=new ks,fa=new V;class Xa extends Tn{constructor(e=new jt,t=new r2){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),da.copy(i.boundingSphere),da.applyMatrix4(r),da.radius+=s,e.ray.intersectsSphere(da)===!1)return;Ch.copy(r).invert(),$l.copy(e.ray).applyMatrix4(Ch);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){const x=c.getX(m);fa.fromBufferAttribute(f,x),Lh(fa,x,h,r,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let m=u,M=p;m<M;m++)fa.fromBufferAttribute(f,m),Lh(fa,m,h,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Lh(n,e,t,i,r,s,a){const o=$l.distanceSqToPoint(n);if(o<t){const h=new V;$l.closestPointToPoint(n,h),h.applyMatrix4(i);const c=r.ray.origin.distanceTo(h);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class fd extends bn{constructor(e=[],t=br,i,r,s,a,o,h,c,d){super(e,t,i,r,s,a,o,h,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pd extends bn{constructor(e,t,i,r,s,a,o,h,c){super(e,t,i,r,s,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ns extends bn{constructor(e,t,i=wi,r,s,a,o=Yt,h=Yt,c,d=Bi,f=1){if(d!==Bi&&d!==gr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,h,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class s2 extends ns{constructor(e,t=wi,i=br,r,s,a=Yt,o=Yt,h,c=Bi){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,h,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class md extends bn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bs extends jt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const h=[],c=[],d=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,a,s,0),m("z","y","x",1,-1,i,t,-e,a,s,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(h),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(f,2));function m(M,x,g,v,S,y,A,b,E,_,w){const L=y/E,R=A/_,P=y/2,O=A/2,I=b/2,U=E+1,z=_+1;let k=0,ee=0;const H=new V;for(let Z=0;Z<z;Z++){const N=Z*R-O;for(let Y=0;Y<U;Y++){const j=Y*L-P;H[M]=j*v,H[x]=N*S,H[g]=I,c.push(H.x,H.y,H.z),H[M]=0,H[x]=0,H[g]=b>0?1:-1,d.push(H.x,H.y,H.z),f.push(Y/E),f.push(1-Z/_),k+=1}}for(let Z=0;Z<_;Z++)for(let N=0;N<E;N++){const Y=u+N+U*Z,j=u+N+U*(Z+1),oe=u+(N+1)+U*(Z+1),he=u+(N+1)+U*Z;h.push(Y,j,he),h.push(j,oe,he),ee+=6}o.addGroup(p,ee,w),p+=ee,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Hn extends jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),h=Math.floor(r),c=o+1,d=h+1,f=e/o,u=t/h,p=[],m=[],M=[],x=[];for(let g=0;g<d;g++){const v=g*u-a;for(let S=0;S<c;S++){const y=S*f-s;m.push(y,-v,0),M.push(0,0,1),x.push(S/o),x.push(1-g/h)}}for(let g=0;g<h;g++)for(let v=0;v<o;v++){const S=v+c*g,y=v+c*(g+1),A=v+1+c*(g+1),b=v+1+c*g;p.push(S,y,b),p.push(y,A,b)}this.setIndex(p),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(M,3)),this.setAttribute("uv",new Ot(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.widthSegments,e.heightSegments)}}function is(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Ph(r))r.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ph(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function wn(n){const e={};for(let t=0;t<n.length;t++){const i=is(n[t]);for(const r in i)e[r]=i[r]}return e}function Ph(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function a2(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const o2={clone:is,merge:wn};var l2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,c2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yt extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=l2,this.fragmentShader=c2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=is(e.uniforms),this.uniformsGroups=a2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new nt().setHex(r.value);break;case"v2":this.uniforms[i].value=new qe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new V().fromArray(r.value);break;case"v4":this.uniforms[i].value=new rt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new $e().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Bt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class h2 extends yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class u2 extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=b1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class d2 extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const pa=new V,ma=new os,ui=new V;class xd extends Tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=bi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pa,ma,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(pa,ma,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $i=new V,Dh=new qe,Ih=new qe;class Fn extends xd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ql*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_o*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ql*2*Math.atan(Math.tan(_o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,Dh,Ih),t.subVectors(Ih,Dh)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(_o*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/h,t-=a.offsetY*i/c,r*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Rc extends xd{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,h=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,h=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cc extends jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ur=-90,kr=1;class f2 extends Tn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Fn(Ur,kr,e,t);r.layers=this.layers,this.add(r);const s=new Fn(Ur,kr,e,t);s.layers=this.layers,this.add(s);const a=new Fn(Ur,kr,e,t);a.layers=this.layers,this.add(a);const o=new Fn(Ur,kr,e,t);o.layers=this.layers,this.add(o);const h=new Fn(Ur,kr,e,t);h.layers=this.layers,this.add(h);const c=new Fn(Ur,kr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,h]=t;for(const c of t)this.remove(c);if(e===bi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ha)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,h,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class p2 extends Fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Md{static{Md.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function Oh(n,e,t,i){const r=m2(i);switch(t){case nd:return n*e;case rd:return n*e/r.components*r.byteLength;case vc:return n*e/r.components*r.byteLength;case yr:return n*e*2/r.components*r.byteLength;case _c:return n*e*2/r.components*r.byteLength;case id:return n*e*3/r.components*r.byteLength;case kn:return n*e*4/r.components*r.byteLength;case bc:return n*e*4/r.components*r.byteLength;case Ta:case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ca:case La:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case vl:case bl:return Math.max(n,16)*Math.max(e,8)/4;case Ml:case _l:return Math.max(n,8)*Math.max(e,8)/2;case yl:case Sl:case El:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case wl:case ka:case Tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case kl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case zl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Hl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Gl:case Wl:case Vl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Yl:case Xl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ba:case Kl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function m2(n){switch(n){case Un:case Qu:return{byteLength:1,components:1};case Ds:case ju:case Ei:return{byteLength:2,components:1};case xc:case Mc:return{byteLength:2,components:4};case wi:case gc:case _i:return{byteLength:4,components:1};case ed:case td:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uc}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uc);function vd(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function g2(n){const e=new WeakMap;function t(o,h){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,c){const d=h.array,f=h.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],M=f[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,f[u]=M)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const M=f[p];n.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:r,remove:s,update:a}}var x2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M2=`#ifdef USE_ALPHAHASH
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
#endif`,v2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,y2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,S2=`#ifdef USE_AOMAP
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
#endif`,w2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E2=`#ifdef USE_BATCHING
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
#endif`,A2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,T2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C2=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,L2=`#ifdef USE_IRIDESCENCE
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
#endif`,P2=`#ifdef USE_BUMPMAP
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
#endif`,D2=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,I2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,O2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,U2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,k2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,B2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,z2=`#define PI 3.141592653589793
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
} // validated`,H2=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,G2=`vec3 transformedNormal = objectNormal;
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
#endif`,W2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Y2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,K2="gl_FragColor = linearToOutputTexel( gl_FragColor );",q2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$2=`#ifdef USE_ENVMAP
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
#endif`,Z2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,J2=`#ifdef USE_ENVMAP
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
#endif`,Q2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j2=`#ifdef USE_ENVMAP
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
#endif`,ex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ix=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rx=`#ifdef USE_GRADIENTMAP
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
}`,sx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ox=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,cx=`#ifdef USE_ENVMAP
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
#endif`,hx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,px=`PhysicalMaterial material;
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
#endif`,mx=`uniform sampler2D dfgLUT;
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
}`,gx=`
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
#endif`,xx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vx=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_x=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ex=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tx=`#if defined( USE_POINTS_UV )
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
#endif`,Rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ix=`#ifdef USE_MORPHTARGETS
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
#endif`,Ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ux=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zx=`#ifdef USE_NORMALMAP
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
#endif`,Hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$x=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nM=`float getShadowMask() {
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
}`,iM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rM=`#ifdef USE_SKINNING
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
#endif`,sM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aM=`#ifdef USE_SKINNING
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
#endif`,oM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uM=`#ifdef USE_TRANSMISSION
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
#endif`,dM=`#ifdef USE_TRANSMISSION
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
#endif`,fM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MM=`uniform sampler2D t2D;
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
}`,vM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_M=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SM=`#include <common>
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
}`,wM=`#if DEPTH_PACKING == 3200
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
}`,EM=`#define DISTANCE
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
}`,AM=`#define DISTANCE
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
}`,TM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,RM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CM=`uniform float scale;
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
}`,LM=`uniform vec3 diffuse;
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
}`,PM=`#include <common>
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
}`,DM=`uniform vec3 diffuse;
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
}`,IM=`#define LAMBERT
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
}`,OM=`#define LAMBERT
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
}`,NM=`#define MATCAP
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
}`,FM=`#define MATCAP
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
}`,UM=`#define NORMAL
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
}`,kM=`#define NORMAL
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
}`,BM=`#define PHONG
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
}`,zM=`#define PHONG
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
}`,HM=`#define STANDARD
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
}`,GM=`#define STANDARD
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
}`,WM=`#define TOON
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
}`,VM=`#define TOON
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
}`,YM=`uniform float size;
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
}`,XM=`uniform vec3 diffuse;
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
}`,KM=`#include <common>
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
}`,qM=`uniform vec3 color;
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
}`,$M=`uniform float rotation;
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
}`,ZM=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:x2,alphahash_pars_fragment:M2,alphamap_fragment:v2,alphamap_pars_fragment:_2,alphatest_fragment:b2,alphatest_pars_fragment:y2,aomap_fragment:S2,aomap_pars_fragment:w2,batching_pars_vertex:E2,batching_vertex:A2,begin_vertex:T2,beginnormal_vertex:R2,bsdfs:C2,iridescence_fragment:L2,bumpmap_pars_fragment:P2,clipping_planes_fragment:D2,clipping_planes_pars_fragment:I2,clipping_planes_pars_vertex:O2,clipping_planes_vertex:N2,color_fragment:F2,color_pars_fragment:U2,color_pars_vertex:k2,color_vertex:B2,common:z2,cube_uv_reflection_fragment:H2,defaultnormal_vertex:G2,displacementmap_pars_vertex:W2,displacementmap_vertex:V2,emissivemap_fragment:Y2,emissivemap_pars_fragment:X2,colorspace_fragment:K2,colorspace_pars_fragment:q2,envmap_fragment:$2,envmap_common_pars_fragment:Z2,envmap_pars_fragment:J2,envmap_pars_vertex:Q2,envmap_physical_pars_fragment:cx,envmap_vertex:j2,fog_vertex:ex,fog_pars_vertex:tx,fog_fragment:nx,fog_pars_fragment:ix,gradientmap_pars_fragment:rx,lightmap_pars_fragment:sx,lights_lambert_fragment:ax,lights_lambert_pars_fragment:ox,lights_pars_begin:lx,lights_toon_fragment:hx,lights_toon_pars_fragment:ux,lights_phong_fragment:dx,lights_phong_pars_fragment:fx,lights_physical_fragment:px,lights_physical_pars_fragment:mx,lights_fragment_begin:gx,lights_fragment_maps:xx,lights_fragment_end:Mx,lightprobes_pars_fragment:vx,logdepthbuf_fragment:_x,logdepthbuf_pars_fragment:bx,logdepthbuf_pars_vertex:yx,logdepthbuf_vertex:Sx,map_fragment:wx,map_pars_fragment:Ex,map_particle_fragment:Ax,map_particle_pars_fragment:Tx,metalnessmap_fragment:Rx,metalnessmap_pars_fragment:Cx,morphinstance_vertex:Lx,morphcolor_vertex:Px,morphnormal_vertex:Dx,morphtarget_pars_vertex:Ix,morphtarget_vertex:Ox,normal_fragment_begin:Nx,normal_fragment_maps:Fx,normal_pars_fragment:Ux,normal_pars_vertex:kx,normal_vertex:Bx,normalmap_pars_fragment:zx,clearcoat_normal_fragment_begin:Hx,clearcoat_normal_fragment_maps:Gx,clearcoat_pars_fragment:Wx,iridescence_pars_fragment:Vx,opaque_fragment:Yx,packing:Xx,premultiplied_alpha_fragment:Kx,project_vertex:qx,dithering_fragment:$x,dithering_pars_fragment:Zx,roughnessmap_fragment:Jx,roughnessmap_pars_fragment:Qx,shadowmap_pars_fragment:jx,shadowmap_pars_vertex:eM,shadowmap_vertex:tM,shadowmask_pars_fragment:nM,skinbase_vertex:iM,skinning_pars_vertex:rM,skinning_vertex:sM,skinnormal_vertex:aM,specularmap_fragment:oM,specularmap_pars_fragment:lM,tonemapping_fragment:cM,tonemapping_pars_fragment:hM,transmission_fragment:uM,transmission_pars_fragment:dM,uv_pars_fragment:fM,uv_pars_vertex:pM,uv_vertex:mM,worldpos_vertex:gM,background_vert:xM,background_frag:MM,backgroundCube_vert:vM,backgroundCube_frag:_M,cube_vert:bM,cube_frag:yM,depth_vert:SM,depth_frag:wM,distance_vert:EM,distance_frag:AM,equirect_vert:TM,equirect_frag:RM,linedashed_vert:CM,linedashed_frag:LM,meshbasic_vert:PM,meshbasic_frag:DM,meshlambert_vert:IM,meshlambert_frag:OM,meshmatcap_vert:NM,meshmatcap_frag:FM,meshnormal_vert:UM,meshnormal_frag:kM,meshphong_vert:BM,meshphong_frag:zM,meshphysical_vert:HM,meshphysical_frag:GM,meshtoon_vert:WM,meshtoon_frag:VM,points_vert:YM,points_frag:XM,shadow_vert:KM,shadow_frag:qM,sprite_vert:$M,sprite_frag:ZM},Ee={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},xi={basic:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:wn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:wn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:wn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:wn([Ee.points,Ee.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:wn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:wn([Ee.common,Ee.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:wn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:wn([Ee.sprite,Ee.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:wn([Ee.common,Ee.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:wn([Ee.lights,Ee.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};xi.physical={uniforms:wn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const ga={r:0,b:0,g:0},JM=new Bt,_d=new $e;_d.set(-1,0,0,0,1,0,0,0,1);function QM(n,e,t,i,r,s){const a=new nt(0);let o=r===!0?0:1,h,c,d=null,f=0,u=null;function p(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){const y=v.backgroundBlurriness>0;S=e.get(S,y)}return S}function m(v){let S=!1;const y=p(v);y===null?x(a,o):y&&y.isColor&&(x(y,1),S=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,S){const y=p(S);y&&(y.isCubeTexture||y.mapping===io)?(c===void 0&&(c=new qt(new Bs(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:is(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(JM.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(_d),c.material.toneMapped=at.getTransfer(y.colorSpace)!==St,(d!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new qt(new Hn(2,2),new yt({name:"BackgroundMaterial",uniforms:is(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=y,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.toneMapped=at.getTransfer(y.colorSpace)!==St,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function x(v,S){v.getRGB(ga,gd(n)),t.buffers.color.setClear(ga.r,ga.g,ga.b,S,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),o=S,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,x(a,o)},render:m,addToRenderList:M,dispose:g}}function jM(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(R,P,O,I,U){let z=!1;const k=f(R,I,O,P);s!==k&&(s=k,c(s.object)),z=p(R,I,O,U),z&&m(R,I,O,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,y(R,P,O,I),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function h(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function d(R){return n.deleteVertexArray(R)}function f(R,P,O,I){const U=I.wireframe===!0;let z=i[P.id];z===void 0&&(z={},i[P.id]=z);const k=R.isInstancedMesh===!0?R.id:0;let ee=z[k];ee===void 0&&(ee={},z[k]=ee);let H=ee[O.id];H===void 0&&(H={},ee[O.id]=H);let Z=H[U];return Z===void 0&&(Z=u(h()),H[U]=Z),Z}function u(R){const P=[],O=[],I=[];for(let U=0;U<t;U++)P[U]=0,O[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:I,object:R,attributes:{},index:null}}function p(R,P,O,I){const U=s.attributes,z=P.attributes;let k=0;const ee=O.getAttributes();for(const H in ee)if(ee[H].location>=0){const N=U[H];let Y=z[H];if(Y===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(Y=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(Y=R.instanceColor)),N===void 0||N.attribute!==Y||Y&&N.data!==Y.data)return!0;k++}return s.attributesNum!==k||s.index!==I}function m(R,P,O,I){const U={},z=P.attributes;let k=0;const ee=O.getAttributes();for(const H in ee)if(ee[H].location>=0){let N=z[H];N===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(N=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(N=R.instanceColor));const Y={};Y.attribute=N,N&&N.data&&(Y.data=N.data),U[H]=Y,k++}s.attributes=U,s.attributesNum=k,s.index=I}function M(){const R=s.newAttributes;for(let P=0,O=R.length;P<O;P++)R[P]=0}function x(R){g(R,0)}function g(R,P){const O=s.newAttributes,I=s.enabledAttributes,U=s.attributeDivisors;O[R]=1,I[R]===0&&(n.enableVertexAttribArray(R),I[R]=1),U[R]!==P&&(n.vertexAttribDivisor(R,P),U[R]=P)}function v(){const R=s.newAttributes,P=s.enabledAttributes;for(let O=0,I=P.length;O<I;O++)P[O]!==R[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function S(R,P,O,I,U,z,k){k===!0?n.vertexAttribIPointer(R,P,O,U,z):n.vertexAttribPointer(R,P,O,I,U,z)}function y(R,P,O,I){M();const U=I.attributes,z=O.getAttributes(),k=P.defaultAttributeValues;for(const ee in z){const H=z[ee];if(H.location>=0){let Z=U[ee];if(Z===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor)),Z!==void 0){const N=Z.normalized,Y=Z.itemSize,j=e.get(Z);if(j===void 0)continue;const oe=j.buffer,he=j.type,xe=j.bytesPerElement,q=he===n.INT||he===n.UNSIGNED_INT||Z.gpuType===gc;if(Z.isInterleavedBufferAttribute){const ie=Z.data,W=ie.stride,pe=Z.offset;if(ie.isInstancedInterleavedBuffer){for(let ce=0;ce<H.locationSize;ce++)g(H.location+ce,ie.meshPerAttribute);R.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ce=0;ce<H.locationSize;ce++)x(H.location+ce);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let ce=0;ce<H.locationSize;ce++)S(H.location+ce,Y/H.locationSize,he,N,W*xe,(pe+Y/H.locationSize*ce)*xe,q)}else{if(Z.isInstancedBufferAttribute){for(let ie=0;ie<H.locationSize;ie++)g(H.location+ie,Z.meshPerAttribute);R.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ie=0;ie<H.locationSize;ie++)x(H.location+ie);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let ie=0;ie<H.locationSize;ie++)S(H.location+ie,Y/H.locationSize,he,N,Y*xe,Y/H.locationSize*ie*xe,q)}}else if(k!==void 0){const N=k[ee];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(H.location,N);break;case 3:n.vertexAttrib3fv(H.location,N);break;case 4:n.vertexAttrib4fv(H.location,N);break;default:n.vertexAttrib1fv(H.location,N)}}}}v()}function A(){w();for(const R in i){const P=i[R];for(const O in P){const I=P[O];for(const U in I){const z=I[U];for(const k in z)d(z[k].object),delete z[k];delete I[U]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;const P=i[R.id];for(const O in P){const I=P[O];for(const U in I){const z=I[U];for(const k in z)d(z[k].object),delete z[k];delete I[U]}}delete i[R.id]}function E(R){for(const P in i){const O=i[P];for(const I in O){const U=O[I];if(U[R.id]===void 0)continue;const z=U[R.id];for(const k in z)d(z[k].object),delete z[k];delete U[R.id]}}}function _(R){for(const P in i){const O=i[P],I=R.isInstancedMesh===!0?R.id:0,U=O[I];if(U!==void 0){for(const z in U){const k=U[z];for(const ee in k)d(k[ee].object),delete k[ee];delete U[z]}delete O[I],Object.keys(O).length===0&&delete i[P]}}}function w(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:M,enableAttribute:x,disableUnusedAttributes:v}}function ev(n,e,t){let i;function r(h){i=h}function s(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,d){d!==0&&(n.drawArraysInstanced(i,h,c,d),t.update(c,i,d))}function o(h,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function tv(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==kn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const _=E===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Un&&E!==_i&&!_&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=h(c);d!==c&&(Xe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:y,maxSamples:A,samples:b}}function nv(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Ji,o=new $e,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||r;return r=u,i=f.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,M=f.clipIntersection,x=f.clipShadows,g=n.get(f);if(!r||m===null||m.length===0||s&&!x)s?d(null):c();else{const v=s?0:i,S=v*4;let y=g.clippingState||null;h.value=y,y=d(m,u,S,p);for(let A=0;A!==S;++A)y[A]=t[A];g.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,m){const M=f!==null?f.length:0;let x=null;if(M!==0){if(x=h.value,m!==!0||x===null){const g=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(x===null||x.length<g)&&(x=new Float32Array(g));for(let S=0,y=p;S!==M;++S,y+=4)a.copy(f[S]).applyMatrix4(v,o),a.normal.toArray(x,y),x[y+3]=a.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}const Xr=4,iv=6,rv=20,sv=256,bs=new Rc,Nh=new nt;let Wo=null,Vo=0,Yo=0,Xo=!1;const av=new V,lr=new V;class Fh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=av}=s;Wo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,r,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wo,Vo,Yo),this._renderer.xr.enabled=Xo,e.scissorTest=!1,Br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Ei,format:kn,colorSpace:Os,depthBuffer:!1},r=Uh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uh(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ov(s)),this._blurMaterial=cv(s,e,t),this._ggxMaterial=lv(s,e,t)}return r}_compileMaterial(e){const t=new qt(new jt,e);this._renderer.compile(t,bs)}_sceneToCubeUV(e,t,i,r,s){const h=new Fn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(Nh),f.toneMapping=Si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Bs,new ud({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,x=M.material;let g=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,g=!0):(x.color.copy(Nh),g=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(h.up.set(0,c[S],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x+d[S],s.y,s.z)):y===1?(h.up.set(0,0,c[S]),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y+d[S],s.z)):(h.up.set(0,c[S],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y,s.z+d[S]));const A=this._cubeSize;Br(r,y*A,S>2?A:0,A,A),f.setRenderTarget(r),g&&f.render(M,h),f.render(e,h)}f.toneMapping=p,f.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===br||e.mapping===ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const h=this._cubeSize;Br(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,bs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=c*1.25,p=f*u,{_lodMax:m}=this,M=this._sizeLods[i],x=3*M*(i>m-Xr?i-m+Xr:0),g=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=m-t,Br(s,x,g,3*M,2*M),r.setRenderTarget(s),r.render(o,bs),h.envMap.value=s.texture,h.roughness.value=0,h.mipInt.value=m-i,Br(e,x,g,3*M,2*M),r.setRenderTarget(e),r.render(o,bs)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[r];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[r],f=3*d*(r>this._lodMax-Xr?r-this._lodMax+Xr:0),u=4*(this._cubeSize-d);Br(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(h,bs)}}function ov(n){const e=[],t=[];let i=n;const r=n-Xr+1+iv;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,d=[h,h,c,h,c,c,h,h,c,c,h,c],f=6,u=6,p=3,m=new Float32Array(p*u*f),M=new Float32Array(p*u*f);for(let g=0;g<f;g++){const v=g%3*2/3-1,S=g>2?0:-1,y=[v,S,0,v+2/3,S,0,v+2/3,S+1,0,v,S,0,v+2/3,S+1,0,v,S+1,0];m.set(y,p*u*g);for(let A=0;A<u;A++){const b=d[A*2]*2-1,E=d[A*2+1]*2-1;g===0?lr.set(1,E,b):g===1?lr.set(-b,1,-E):g===2?lr.set(-b,E,1):g===3?lr.set(-1,E,-b):g===4?lr.set(-b,-1,E):lr.set(b,E,-1),lr.toArray(M,(g*u+A)*p)}}const x=new jt;x.setAttribute("position",new Bn(m,p)),x.setAttribute("outputDirection",new Bn(M,p)),t.push(new qt(x,null)),i>Xr&&i--}return{lodMeshes:t,sizeLods:e}}function Uh(n,e,t){const i=new qn(n,e,t);return i.texture.mapping=io,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Br(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function lv(n,e,t){return new yt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ro(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function cv(n,e,t){return new yt({name:"SphericalGaussianBlur",defines:{SAMPLES:rv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ro(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function kh(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ro(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Bh(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function ro(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class bd extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new fd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Bs(5,5,5),s=new yt({name:"CubemapFromEquirect",uniforms:is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dn,blending:yi});s.uniforms.tEquirect.value=t;const a=new qt(r,s),o=t.minFilter;return t.minFilter===mr&&(t.minFilter=Vt),new f2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function hv(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===go||p===xo)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const M=new bd(m.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===go||p===xo,M=p===br||p===ts;if(m||M){let x=t.get(u);const g=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new Fh(n)),x=m?i.fromEquirectangular(u,x):i.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const v=u.image;return m&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new Fh(n)),x=m?i.fromEquirectangular(u):i.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",d),x.texture):null}}}return u}function o(u,p){return p===go?u.mapping=br:p===xo&&(u.mapping=ts),u}function h(u){let p=0;const m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function uv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Jr("WebGLRenderer: "+i+" extension not supported."),r}}}function dv(n,e,t,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function h(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,m=f.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let S=0,y=v.length;S<y;S+=3){const A=v[S+0],b=v[S+1],E=v[S+2];u.push(A,b,b,E,E,A)}}else{const v=m.array;M=m.version;for(let S=0,y=v.length/3-1;S<y;S+=3){const A=S+0,b=S+1,E=S+2;u.push(A,b,b,E,E,A)}}const x=new(m.count>=65535?hd:cd)(u,1);x.version=M;const g=s.get(f);g&&e.remove(g),s.set(f,x)}function d(f){const u=s.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:h,getWireframeAttribute:d}}function fv(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function h(f,u){n.drawElements(i,u,s,f*a),t.update(u,i,1)}function c(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,s,f*a,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,p);let M=0;for(let x=0;x<p;x++)M+=u[x];t.update(M,i,1)}this.setMode=r,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=d}function pv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:dt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function mv(n,e,t){const i=new WeakMap,r=new rt;function s(a,o,h){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let w=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),m===!0&&(S=2),M===!0&&(S=3);let y=o.attributes.position.count*S,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*A*4*f),E=new ad(b,y,A,f);E.type=_i,E.needsUpdate=!0;const _=S*4;for(let L=0;L<f;L++){const R=x[L],P=g[L],O=v[L],I=y*A*4*L;for(let U=0;U<R.count;U++){const z=U*_;p===!0&&(r.fromBufferAttribute(R,U),b[I+z+0]=r.x,b[I+z+1]=r.y,b[I+z+2]=r.z,b[I+z+3]=0),m===!0&&(r.fromBufferAttribute(P,U),b[I+z+4]=r.x,b[I+z+5]=r.y,b[I+z+6]=r.z,b[I+z+7]=0),M===!0&&(r.fromBufferAttribute(O,U),b[I+z+8]=r.x,b[I+z+9]=r.y,b[I+z+10]=r.z,b[I+z+11]=O.itemSize===4?r.w:1)}}u={count:f,texture:E,size:new qe(y,A)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function gv(n,e,t,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function h(c){const d=c.target;d.removeEventListener("dispose",h),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const xv={[Vu]:"LINEAR_TONE_MAPPING",[Yu]:"REINHARD_TONE_MAPPING",[Xu]:"CINEON_TONE_MAPPING",[Ku]:"ACES_FILMIC_TONE_MAPPING",[$u]:"AGX_TONE_MAPPING",[Zu]:"NEUTRAL_TONE_MAPPING",[qu]:"CUSTOM_TONE_MAPPING"};function Mv(n,e,t,i,r,s){const a=new qn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new jt;c.setAttribute("position",new Ot([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ot([0,2,0,0,2,0],2));const d=new h2({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new qt(c,d),u=new Rc(-1,1,1,-1,0,1);let p=null,m=null,M=!1,x,g=null,v=[],S=!1;this.setSize=function(y,A){a.setSize(y,A),o!==null&&o.setSize(y,A),h!==null&&h.setSize(y,A);for(let b=0;b<v.length;b++){const E=v[b];E.setSize&&E.setSize(y,A)}},this.setEffects=function(y){v=y,S=v.length>0&&v[0].isRenderPass===!0;const A=a.width,b=a.height;v.length>0&&o===null&&(o=new qn(A,b,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),h=new qn(A,b,{type:Ei,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<v.length;E++){const _=v[E];_.setSize&&_.setSize(A,b)}},this.begin=function(y,A){if(M||y.toneMapping===Si&&v.length===0)return!1;if(g=A,A!==null){const b=A.width,E=A.height;(a.width!==b||a.height!==E)&&this.setSize(b,E)}return S===!1&&y.setRenderTarget(a),x=y.toneMapping,y.toneMapping=Si,!0},this.hasRenderPass=function(){return S},this.end=function(y,A){y.toneMapping=x,M=!0;let b=a,E=o;for(let _=0;_<v.length;_++){const w=v[_];w.enabled!==!1&&(w.render(y,E,b,A),w.needsSwap!==!1&&(b=E,E=E===o?h:o))}if(p!==y.outputColorSpace||m!==y.toneMapping){p=y.outputColorSpace,m=y.toneMapping,d.defines={},at.getTransfer(p)===St&&(d.defines.SRGB_TRANSFER="");const _=xv[m];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(g),y.render(f,u),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),d.dispose()}}const yd=new bn,Zl=new ns(1,1),Sd=new ad,wd=new H1,Ed=new fd,zh=[],Hh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Vh=new Float32Array(4);function hs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=zh[r];if(s===void 0&&(s=new Float32Array(r),zh[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function sn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function so(n,e){let t=Hh[e];t===void 0&&(t=new Int32Array(e),Hh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function vv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function _v(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function Sv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(sn(t,i))return;Vh.set(i),n.uniformMatrix2fv(this.addr,!1,Vh),an(t,i)}}function wv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(sn(t,i))return;Wh.set(i),n.uniformMatrix3fv(this.addr,!1,Wh),an(t,i)}}function Ev(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(sn(t,i))return;Gh.set(i),n.uniformMatrix4fv(this.addr,!1,Gh),an(t,i)}}function Av(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function Cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function Lv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Pv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function Dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function Iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function Ov(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Zl.compareFunction=t.isReversedDepthBuffer()?Sc:yc,s=Zl):s=yd,t.setTexture2D(e||s,r)}function Nv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||wd,r)}function Fv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ed,r)}function Uv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Sd,r)}function kv(n){switch(n){case 5126:return vv;case 35664:return _v;case 35665:return bv;case 35666:return yv;case 35674:return Sv;case 35675:return wv;case 35676:return Ev;case 5124:case 35670:return Av;case 35667:case 35671:return Tv;case 35668:case 35672:return Rv;case 35669:case 35673:return Cv;case 5125:return Lv;case 36294:return Pv;case 36295:return Dv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ov;case 35679:case 36299:case 36307:return Nv;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return Uv}}function Bv(n,e){n.uniform1fv(this.addr,e)}function zv(n,e){const t=hs(e,this.size,2);n.uniform2fv(this.addr,t)}function Hv(n,e){const t=hs(e,this.size,3);n.uniform3fv(this.addr,t)}function Gv(n,e){const t=hs(e,this.size,4);n.uniform4fv(this.addr,t)}function Wv(n,e){const t=hs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Vv(n,e){const t=hs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Yv(n,e){const t=hs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Xv(n,e){n.uniform1iv(this.addr,e)}function Kv(n,e){n.uniform2iv(this.addr,e)}function qv(n,e){n.uniform3iv(this.addr,e)}function $v(n,e){n.uniform4iv(this.addr,e)}function Zv(n,e){n.uniform1uiv(this.addr,e)}function Jv(n,e){n.uniform2uiv(this.addr,e)}function Qv(n,e){n.uniform3uiv(this.addr,e)}function jv(n,e){n.uniform4uiv(this.addr,e)}function e_(n,e,t){const i=this.cache,r=e.length,s=so(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),an(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Zl:a=yd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function t_(n,e,t){const i=this.cache,r=e.length,s=so(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||wd,s[a])}function n_(n,e,t){const i=this.cache,r=e.length,s=so(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ed,s[a])}function i_(n,e,t){const i=this.cache,r=e.length,s=so(t,r);sn(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Sd,s[a])}function r_(n){switch(n){case 5126:return Bv;case 35664:return zv;case 35665:return Hv;case 35666:return Gv;case 35674:return Wv;case 35675:return Vv;case 35676:return Yv;case 5124:case 35670:return Xv;case 35667:case 35671:return Kv;case 35668:case 35672:return qv;case 35669:case 35673:return $v;case 5125:return Zv;case 36294:return Jv;case 36295:return Qv;case 36296:return jv;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return t_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}class s_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=kv(t.type)}}class a_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=r_(t.type)}}class o_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ko=/(\w+)(\])?(\[|\.)?/g;function Yh(n,e){n.seq.push(e),n.map[e.id]=e}function l_(n,e,t){const i=n.name,r=i.length;for(Ko.lastIndex=0;;){const s=Ko.exec(i),a=Ko.lastIndex;let o=s[1];const h=s[2]==="]",c=s[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===r){Yh(t,c===void 0?new s_(o,n,e):new a_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new o_(o),Yh(t,f)),t=f}}}class Pa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);l_(o,h,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Xh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const c_=37297;let h_=0;function u_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Kh=new $e;function d_(n){at._getMatrix(Kh,at.workingColorSpace,n);const e=`mat3( ${Kh.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case za:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function qh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+u_(n.getShaderSource(e),o)}else return s}function f_(n,e){const t=d_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const p_={[Vu]:"Linear",[Yu]:"Reinhard",[Xu]:"Cineon",[Ku]:"ACESFilmic",[$u]:"AgX",[Zu]:"Neutral",[qu]:"Custom"};function m_(n,e){const t=p_[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xa=new V;function g_(){at.getLuminanceCoefficients(xa);const n=xa.x.toFixed(4),e=xa.y.toFixed(4),t=xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function M_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function v_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Rs(n){return n!==""}function $h(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const __=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jl(n){return n.replace(__,y_)}const b_=new Map;function y_(n,e){let t=tt[e];if(t===void 0){const i=b_.get(e);if(i!==void 0)t=tt[i],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Jl(t)}const S_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(n){return n.replace(S_,w_)}function w_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Qh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const E_={[Aa]:"SHADOWMAP_TYPE_PCF",[Ts]:"SHADOWMAP_TYPE_VSM"};function A_(n){return E_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const T_={[br]:"ENVMAP_TYPE_CUBE",[ts]:"ENVMAP_TYPE_CUBE",[io]:"ENVMAP_TYPE_CUBE_UV"};function R_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":T_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const C_={[ts]:"ENVMAP_MODE_REFRACTION"};function L_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":C_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const P_={[Wu]:"ENVMAP_BLENDING_MULTIPLY",[M1]:"ENVMAP_BLENDING_MIX",[v1]:"ENVMAP_BLENDING_ADD"};function D_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":P_[n.combine]||"ENVMAP_BLENDING_NONE"}function I_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function O_(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=A_(t),c=R_(t),d=L_(t),f=D_(t),u=I_(t),p=x_(t),m=M_(s),M=r.createProgram();let x,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Rs).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Rs).join(`
`),g.length>0&&(g+=`
`)):(x=[Qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),g=[Qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?tt.tonemapping_pars_fragment:"",t.toneMapping!==Si?m_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,f_("linearToOutputTexel",t.outputColorSpace),g_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rs).join(`
`)),a=Jl(a),a=$h(a,t),a=Zh(a,t),o=Jl(o),o=$h(o,t),o=Zh(o,t),a=Jh(a),o=Jh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=v+x+a,y=v+g+o,A=Xh(r,r.VERTEX_SHADER,S),b=Xh(r,r.FRAGMENT_SHADER,y);r.attachShader(M,A),r.attachShader(M,b),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function E(R){if(n.debug.checkShaderErrors){const P=r.getProgramInfoLog(M)||"",O=r.getShaderInfoLog(A)||"",I=r.getShaderInfoLog(b)||"",U=P.trim(),z=O.trim(),k=I.trim();let ee=!0,H=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,A,b);else{const Z=qh(r,A,"vertex"),N=qh(r,b,"fragment");dt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+Z+`
`+N)}else U!==""?Xe("WebGLProgram: Program Info Log:",U):(z===""||k==="")&&(H=!1);H&&(R.diagnostics={runnable:ee,programLog:U,vertexShader:{log:z,prefix:x},fragmentShader:{log:k,prefix:g}})}r.deleteShader(A),r.deleteShader(b),_=new Pa(r,M),w=v_(r,M)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(M,c_)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=b,this}let N_=0;class F_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new U_(e),t.set(e,i)),i}}class U_{constructor(e){this.id=N_++,this.code=e,this.usedTimes=0}}function k_(n){return n===yr||n===ka||n===Ba}function B_(n,e,t,i,r,s){const a=new od,o=new F_,h=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,w,L,R,P,O){const I=R.fog,U=P.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ee=e.get(_.envMap||z,k),H=ee&&ee.mapping===io?ee.image.height:null,Z=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Xe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const N=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Y=N!==void 0?N.length:0;let j=0;U.morphAttributes.position!==void 0&&(j=1),U.morphAttributes.normal!==void 0&&(j=2),U.morphAttributes.color!==void 0&&(j=3);let oe,he,xe,q;if(Z){const Dt=xi[Z];oe=Dt.vertexShader,he=Dt.fragmentShader}else{oe=_.vertexShader,he=_.fragmentShader;const Dt=o.getVertexShaderStage(_),gt=o.getFragmentShaderStage(_);o.update(_,Dt,gt),xe=Dt.id,q=gt.id}const ie=n.getRenderTarget(),W=n.state.buffers.depth.getReversed(),pe=P.isInstancedMesh===!0,ce=P.isBatchedMesh===!0,Ae=!!_.map,ge=!!_.matcap,Me=!!ee,Se=!!_.aoMap,Ie=!!_.lightMap,He=!!_.bumpMap&&_.wireframe===!1,st=!!_.normalMap,Ct=!!_.displacementMap,Nt=!!_.emissiveMap,Et=!!_.metalnessMap,Lt=!!_.roughnessMap,X=_.anisotropy>0,je=_.clearcoat>0,Ye=_.dispersion>0,F=_.retroreflectivity>0,T=_.iridescence>0,B=_.sheen>0,$=_.transmission>0,te=X&&!!_.anisotropyMap,fe=je&&!!_.clearcoatMap,me=je&&!!_.clearcoatNormalMap,re=je&&!!_.clearcoatRoughnessMap,se=T&&!!_.iridescenceMap,ve=T&&!!_.iridescenceThicknessMap,Fe=B&&!!_.sheenColorMap,we=B&&!!_.sheenRoughnessMap,_e=!!_.specularMap,Be=!!_.specularColorMap,Ve=!!_.specularIntensityMap,Ze=$&&!!_.transmissionMap,K=$&&!!_.thicknessMap,be=!!_.gradientMap,ae=!!_.alphaMap,ye=_.alphaTest>0,Le=!!_.alphaHash,ue=!!_.extensions;let ze=Si;_.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ze=n.toneMapping);const Ue={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:oe,fragmentShader:he,defines:_.defines,customVertexShaderID:xe,customFragmentShaderID:q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ce,batchingColor:ce&&P._colorsTexture!==null,instancing:pe,instancingColor:pe&&P.instanceColor!==null,instancingMorph:pe&&P.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ae,matcap:ge,envMap:Me,envMapMode:Me&&ee.mapping,envMapCubeUVHeight:H,aoMap:Se,lightMap:Ie,bumpMap:He,normalMap:st,displacementMap:Ct,emissiveMap:Nt,normalMapObjectSpace:st&&_.normalMapType===y1,normalMapTangentSpace:st&&_.normalMapType===ah,packedNormalMap:st&&_.normalMapType===ah&&k_(_.normalMap.format),metalnessMap:Et,roughnessMap:Lt,anisotropy:X,anisotropyMap:te,clearcoat:je,clearcoatMap:fe,clearcoatNormalMap:me,clearcoatRoughnessMap:re,dispersion:Ye,retroreflection:F,iridescence:T,iridescenceMap:se,iridescenceThicknessMap:ve,sheen:B,sheenColorMap:Fe,sheenRoughnessMap:we,specularMap:_e,specularColorMap:Be,specularIntensityMap:Ve,transmission:$,transmissionMap:Ze,thicknessMap:K,gradientMap:be,opaque:_.transparent===!1&&_.blending===$r&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:ye,alphaHash:Le,combine:_.combine,mapUv:Ae&&m(_.map.channel),aoMapUv:Se&&m(_.aoMap.channel),lightMapUv:Ie&&m(_.lightMap.channel),bumpMapUv:He&&m(_.bumpMap.channel),normalMapUv:st&&m(_.normalMap.channel),displacementMapUv:Ct&&m(_.displacementMap.channel),emissiveMapUv:Nt&&m(_.emissiveMap.channel),metalnessMapUv:Et&&m(_.metalnessMap.channel),roughnessMapUv:Lt&&m(_.roughnessMap.channel),anisotropyMapUv:te&&m(_.anisotropyMap.channel),clearcoatMapUv:fe&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(_.sheenRoughnessMap.channel),specularMapUv:_e&&m(_.specularMap.channel),specularColorMapUv:Be&&m(_.specularColorMap.channel),specularIntensityMapUv:Ve&&m(_.specularIntensityMap.channel),transmissionMapUv:Ze&&m(_.transmissionMap.channel),thicknessMapUv:K&&m(_.thicknessMap.channel),alphaMapUv:ae&&m(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(st||X),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!U.attributes.uv&&(Ae||ae),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&st===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:W,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:j,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ae&&_.map.isVideoTexture===!0&&at.getTransfer(_.map.colorSpace)===St,decodeVideoTextureEmissive:Nt&&_.emissiveMap.isVideoTexture===!0&&at.getTransfer(_.emissiveMap.colorSpace)===St,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Oi,flipSided:_.side===Dn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ue&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&_.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ue.vertexUv1s=h.has(1),Ue.vertexUv2s=h.has(2),Ue.vertexUv3s=h.has(3),h.clear(),Ue}function x(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(g(w,_),v(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function g(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function v(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const w=p[_.type];let L;if(w){const R=xi[w];L=o2.clone(R.uniforms)}else L=_.uniforms;return L}function y(_,w){let L=d.get(w);return L!==void 0?++L.usedTimes:(L=new O_(n,w,_,r),c.push(L),d.set(w,L)),L}function A(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function E(){o.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:S,acquireProgram:y,releaseProgram:A,releaseShaderCache:b,programs:c,dispose:E}}function z_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,h){n.get(a)[o]=h}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function H_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function jh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function eu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,x,g){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:x,group:g},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=x,v.group=g),e++,v}function h(u,p,m,M,x,g,v){v.reversedDepth===!0&&(x=-x);const S=o(u,p,m,M,x,g);m.transmission>0?i.push(S):m.transparent===!0?r.push(S):t.push(S)}function c(u,p,m,M,x,g){const v=o(u,p,m,M,x,g);m.transmission>0?i.unshift(v):m.transparent===!0?r.unshift(v):t.unshift(v)}function d(u,p){t.length>1&&t.sort(u||H_),i.length>1&&i.sort(p||jh),r.length>1&&r.sort(p||jh)}function f(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:h,unshift:c,finish:f,sort:d}}function G_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new eu,n.set(i,[a])):r>=s.length?(a=new eu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function W_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new nt};break;case"SpotLight":t={position:new V,direction:new V,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function V_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Y_=0;function X_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function K_(n){const e=new W_,t=V_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const r=new V,s=new Bt,a=new Bt;function o(c){let d=0,f=0,u=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let p=0,m=0,M=0,x=0,g=0,v=0,S=0,y=0,A=0,b=0,E=0,_=0,w=0,L=0;c.sort(X_);for(let P=0,O=c.length;P<O;P++){const I=c[P],U=I.color,z=I.intensity,k=I.distance;let ee=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===yr?ee=I.shadow.map.texture:ee=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=U.r*z,f+=U.g*z,u+=U.b*z;else if(I.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(I.sh.coefficients[H],z);L++}else if(I.isSunLight){const H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Z=I.shadow,N=t.get(I);N.shadowIntensity=Z.intensity,N.shadowBias=Z.bias,N.shadowNormalBias=Z.normalBias,N.shadowRadius=Z.radius,N.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),i.sunShadow[m]=N,i.sunShadowMap[m]=ee;const Y=Z.getViewportCount();for(let j=0;j<Y;j++)i.sunShadowMatrix[M+j]=Z.getMatrix(j),i.sunShadowCascade[M+j]=Z._cascadeData[j];M+=Y,m++}i.sun[p]=H,p++}else if(I.isDirectionalLight){const H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Z=I.shadow,N=t.get(I);N.shadowIntensity=Z.intensity,N.shadowBias=Z.bias,N.shadowNormalBias=Z.normalBias,N.shadowRadius=Z.radius,N.shadowMapSize=Z.mapSize,i.directionalShadow[x]=N,i.directionalShadowMap[x]=ee,i.directionalShadowMatrix[x]=I.shadow.matrix,A++}i.directional[x]=H,x++}else if(I.isSpotLight){const H=e.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(U).multiplyScalar(z),H.distance=k,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,i.spot[v]=H;const Z=I.shadow;if(I.map&&(i.spotLightMap[_]=I.map,_++,Z.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[v]=Z.matrix,I.castShadow){const N=t.get(I);N.shadowIntensity=Z.intensity,N.shadowBias=Z.bias,N.shadowNormalBias=Z.normalBias,N.shadowRadius=Z.radius,N.shadowMapSize=Z.mapSize,i.spotShadow[v]=N,i.spotShadowMap[v]=ee,E++}v++}else if(I.isRectAreaLight){const H=e.get(I);H.color.copy(U).multiplyScalar(z),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),i.rectArea[S]=H,S++}else if(I.isPointLight){const H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),H.distance=I.distance,H.decay=I.decay,I.castShadow){const Z=I.shadow,N=t.get(I);N.shadowIntensity=Z.intensity,N.shadowBias=Z.bias,N.shadowNormalBias=Z.normalBias,N.shadowRadius=Z.radius,N.shadowMapSize=Z.mapSize,N.shadowCameraNear=Z.camera.near,N.shadowCameraFar=Z.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=ee,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=H,g++}else if(I.isHemisphereLight){const H=e.get(I);H.skyColor.copy(I.color).multiplyScalar(z),H.groundColor.copy(I.groundColor).multiplyScalar(z),i.hemi[y]=H,y++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const R=i.hash;(R.sunLength!==p||R.directionalLength!==x||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==S||R.hemiLength!==y||R.numSunShadows!==m||R.numDirectionalShadows!==A||R.numPointShadows!==b||R.numSpotShadows!==E||R.numSpotMaps!==_||R.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=x,i.spot.length=v,i.rectArea.length=S,i.point.length=g,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.spotLightMatrix.length=E+_-w,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=L,R.sunLength=p,R.directionalLength=x,R.pointLength=g,R.spotLength=v,R.rectAreaLength=S,R.hemiLength=y,R.numSunShadows=m,R.numDirectionalShadows=A,R.numPointShadows=b,R.numSpotShadows=E,R.numSpotMaps=_,R.numLightProbes=L,i.version=Y_++)}function h(c,d){let f=0,u=0,p=0,m=0,M=0,x=0;const g=d.matrixWorldInverse;for(let v=0,S=c.length;v<S;v++){const y=c[v];if(y.isSunLight){const A=i.sun[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),f++}else if(y.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(g),u++}else if(y.isSpotLight){const A=i.spot[m];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(g),m++}else if(y.isRectAreaLight){const A=i.rectArea[M];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(g),p++}else if(y.isHemisphereLight){const A=i.hemi[x];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(g),x++}}}return{setup:o,setupView:h,state:i}}function tu(n){const e=new K_(n),t=[],i=[],r=[];function s(u){f.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){r.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function q_(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new tu(n),e.set(r,[o])):s>=a.length?(o=new tu(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const $_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z_=`uniform sampler2D shadow_pass;
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
}`,J_=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Q_=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],nu=new Bt,ys=new V,qo=new V;function j_(n,e,t){let i=new Wa;const r=new qe,s=new qe,a=new rt,o=new u2,h=new d2,c={},d=t.maxTextureSize,f={[vr]:Dn,[Dn]:vr,[Oi]:Oi},u=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:$_,fragmentShader:Z_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new jt;m.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new qt(m,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Aa;let g=this.type;this.render=function(b,E,_){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||b.length===0)return;this.type===n1&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Aa);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),P=n.state;P.setBlending(yi),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const O=g!==this.type;O&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=b.length;I<U;I++){const z=b[I],k=z.shadow;if(k===void 0){Xe("WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const ee=k.getFrameExtents();r.multiply(ee),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/ee.x),r.x=s.x*ee.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/ee.y),r.y=s.y*ee.y,k.mapSize.y=s.y));const H=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=H,k.map===null||O===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ts){if(z.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new qn(r.x,r.y,{format:yr,type:Ei,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),k.map.texture.name=z.name+".shadowMap",k.map.depthTexture=new ns(r.x,r.y,_i),k.map.depthTexture.name=z.name+".shadowMapDepth",k.map.depthTexture.format=Bi,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Yt,k.map.depthTexture.magFilter=Yt}else z.isPointLight?(k.map=new bd(r.x),k.map.depthTexture=new s2(r.x,wi)):(k.map=new qn(r.x,r.y),k.map.depthTexture=new ns(r.x,r.y,wi)),k.map.depthTexture.name=z.name+".shadowMap",k.map.depthTexture.format=Bi,this.type===Aa?(k.map.depthTexture.compareFunction=H?Sc:yc,k.map.depthTexture.minFilter=Vt,k.map.depthTexture.magFilter=Vt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Yt,k.map.depthTexture.magFilter=Yt);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==r.x||k.map.height!==r.y)&&k.map.setSize(r.x,r.y);const Z=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();z.isPointLight!==!0&&k.updateMatrices(z,_);for(let N=0;N<Z;N++){const Y=k.getCamera(N);if(z.isPointLight){const j=k.camera,oe=k.matrix,he=z.distance||j.far;he!==j.far&&(j.far=he,j.updateProjectionMatrix()),ys.setFromMatrixPosition(z.matrixWorld),j.position.copy(ys),qo.copy(j.position),qo.add(J_[N]),j.up.copy(Q_[N]),j.lookAt(qo),j.updateMatrixWorld(),oe.makeTranslation(-ys.x,-ys.y,-ys.z),nu.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),k._frustum.setFromProjectionMatrix(nu,j.coordinateSystem,j.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,N),n.clear();else{N===0&&(n.setRenderTarget(k.map),n.clear());const j=k.getViewport(N);a.set(s.x*j.x,s.y*j.y,s.x*j.z,s.y*j.w),P.viewport(a)}i=k.getFrustum(N),y(E,_,Y,z,this.type)}k.isPointLightShadow!==!0&&this.type===Ts&&v(k,_),k.needsUpdate=!1}g=this.type,x.needsUpdate=!1,n.setRenderTarget(w,L,R)};function v(b,E){const _=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new qn(r.x,r.y,{format:yr,type:Ei}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(E,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(E,null,_,p,M,null)}function S(b,E,_,w){let L=null;const R=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)L=R;else if(L=_.isPointLight===!0?h:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const P=L.uuid,O=E.uuid;let I=c[P];I===void 0&&(I={},c[P]=I);let U=I[O];U===void 0&&(U=L.clone(),I[O]=U,E.addEventListener("dispose",A)),L=U}if(L.visible=E.visible,L.wireframe=E.wireframe,w===Ts?L.side=E.shadowSide!==null?E.shadowSide:E.side:L.side=E.shadowSide!==null?E.shadowSide:f[E.side],L.alphaMap=E.alphaMap,L.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,L.map=E.map,L.clipShadows=E.clipShadows,L.clippingPlanes=E.clippingPlanes,L.clipIntersection=E.clipIntersection,L.displacementMap=E.displacementMap,L.displacementScale=E.displacementScale,L.displacementBias=E.displacementBias,L.wireframeLinewidth=E.wireframeLinewidth,L.linewidth=E.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const P=n.properties.get(L);P.light=_}return L}function y(b,E,_,w,L){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&L===Ts)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const O=e.update(b),I=b.material;if(Array.isArray(I)){const U=O.groups;for(let z=0,k=U.length;z<k;z++){const ee=U[z],H=I[ee.materialIndex];if(H&&H.visible){const Z=S(b,H,w,L);b.onBeforeShadow(n,b,E,_,O,Z,ee),n.renderBufferDirect(_,null,O,Z,b,ee),b.onAfterShadow(n,b,E,_,O,Z,ee)}}}else if(I.visible){const U=S(b,I,w,L);b.onBeforeShadow(n,b,E,_,O,U,null),n.renderBufferDirect(_,null,O,U,b,null),b.onAfterShadow(n,b,E,_,O,U,null)}}const P=b.children;for(let O=0,I=P.length;O<I;O++)y(P[O],E,_,w,L)}function A(b){b.target.removeEventListener("dispose",A);for(const _ in c){const w=c[_],L=b.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function eb(n,e){function t(){let K=!1;const be=new rt;let ae=null;const ye=new rt(0,0,0,0);return{setMask:function(Le){ae!==Le&&!K&&(n.colorMask(Le,Le,Le,Le),ae=Le)},setLocked:function(Le){K=Le},setClear:function(Le,ue,ze,Ue,Dt){Dt===!0&&(Le*=Ue,ue*=Ue,ze*=Ue),be.set(Le,ue,ze,Ue),ye.equals(be)===!1&&(n.clearColor(Le,ue,ze,Ue),ye.copy(be))},reset:function(){K=!1,ae=null,ye.set(-1,0,0,0)}}}function i(){let K=!1,be=!1,ae=null,ye=null,Le=null;return{setReversed:function(ue){if(be!==ue){const ze=e.get("EXT_clip_control");ue?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),be=ue;const Ue=Le;Le=null,this.setClear(Ue)}},getReversed:function(){return be},setTest:function(ue){ue?ie(n.DEPTH_TEST):W(n.DEPTH_TEST)},setMask:function(ue){ae!==ue&&!K&&(n.depthMask(ue),ae=ue)},setFunc:function(ue){if(be&&(ue=O1[ue]),ye!==ue){switch(ue){case ul:n.depthFunc(n.NEVER);break;case dl:n.depthFunc(n.ALWAYS);break;case fl:n.depthFunc(n.LESS);break;case Ps:n.depthFunc(n.LEQUAL);break;case pl:n.depthFunc(n.EQUAL);break;case ml:n.depthFunc(n.GEQUAL);break;case Fa:n.depthFunc(n.GREATER);break;case gl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=ue}},setLocked:function(ue){K=ue},setClear:function(ue){Le!==ue&&(Le=ue,be&&(ue=1-ue),n.clearDepth(ue))},reset:function(){K=!1,ae=null,ye=null,Le=null,be=!1}}}function r(){let K=!1,be=null,ae=null,ye=null,Le=null,ue=null,ze=null,Ue=null,Dt=null;return{setTest:function(gt){K||(gt?ie(n.STENCIL_TEST):W(n.STENCIL_TEST))},setMask:function(gt){be!==gt&&!K&&(n.stencilMask(gt),be=gt)},setFunc:function(gt,Zn,ci){(ae!==gt||ye!==Zn||Le!==ci)&&(n.stencilFunc(gt,Zn,ci),ae=gt,ye=Zn,Le=ci)},setOp:function(gt,Zn,ci){(ue!==gt||ze!==Zn||Ue!==ci)&&(n.stencilOp(gt,Zn,ci),ue=gt,ze=Zn,Ue=ci)},setLocked:function(gt){K=gt},setClear:function(gt){Dt!==gt&&(n.clearStencil(gt),Dt=gt)},reset:function(){K=!1,be=null,ae=null,ye=null,Le=null,ue=null,ze=null,Ue=null,Dt=null}}}const s=new t,a=new i,o=new r,h=new WeakMap,c=new WeakMap;let d={},f={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,S=null,y=null,A=null,b=null,E=null,_=new nt(0,0,0),w=0,L=!1,R=null,P=null,O=null,I=null,U=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,ee=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(H)[1]),k=ee>=1):H.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),k=ee>=2);let Z=null,N={};const Y=n.getParameter(n.SCISSOR_BOX),j=n.getParameter(n.VIEWPORT),oe=new rt().fromArray(Y),he=new rt().fromArray(j);function xe(K,be,ae,ye){const Le=new Uint8Array(4),ue=n.createTexture();n.bindTexture(K,ue),n.texParameteri(K,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(K,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<ae;ze++)K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?n.texImage3D(be,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,Le):n.texImage2D(be+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Le);return ue}const q={};q[n.TEXTURE_2D]=xe(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),a.setFunc(Ps),He(!1),st(ih),ie(n.CULL_FACE),Se(yi);function ie(K){d[K]!==!0&&(n.enable(K),d[K]=!0)}function W(K){d[K]!==!1&&(n.disable(K),d[K]=!1)}function pe(K,be){return u[K]!==be?(n.bindFramebuffer(K,be),u[K]=be,K===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=be),K===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=be),!0):!1}function ce(K,be){let ae=m,ye=!1;if(K){ae=p.get(be),ae===void 0&&(ae=[],p.set(be,ae));const Le=K.textures;if(ae.length!==Le.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let ue=0,ze=Le.length;ue<ze;ue++)ae[ue]=n.COLOR_ATTACHMENT0+ue;ae.length=Le.length,ye=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,ye=!0);ye&&n.drawBuffers(ae)}function Ae(K){return M!==K?(n.useProgram(K),M=K,!0):!1}const ge={[Gr]:n.FUNC_ADD,[i1]:n.FUNC_SUBTRACT,[r1]:n.FUNC_REVERSE_SUBTRACT};ge[s1]=n.MIN,ge[a1]=n.MAX;const Me={[dc]:n.ZERO,[o1]:n.ONE,[fc]:n.SRC_COLOR,[pc]:n.SRC_ALPHA,[f1]:n.SRC_ALPHA_SATURATE,[u1]:n.DST_COLOR,[c1]:n.DST_ALPHA,[l1]:n.ONE_MINUS_SRC_COLOR,[mc]:n.ONE_MINUS_SRC_ALPHA,[d1]:n.ONE_MINUS_DST_COLOR,[h1]:n.ONE_MINUS_DST_ALPHA,[p1]:n.CONSTANT_COLOR,[m1]:n.ONE_MINUS_CONSTANT_COLOR,[g1]:n.CONSTANT_ALPHA,[x1]:n.ONE_MINUS_CONSTANT_ALPHA};function Se(K,be,ae,ye,Le,ue,ze,Ue,Dt,gt){if(K===yi){x===!0&&(W(n.BLEND),x=!1);return}if(x===!1&&(ie(n.BLEND),x=!0),K!==no){if(K!==g||gt!==L){if((v!==Gr||A!==Gr)&&(n.blendEquation(n.FUNC_ADD),v=Gr,A=Gr),gt)switch(K){case $r:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _r:n.blendFunc(n.ONE,n.ONE);break;case rh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:dt("WebGLState: Invalid blending: ",K);break}else switch(K){case $r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _r:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case rh:dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:dt("WebGLState: Invalid blending: ",K);break}S=null,y=null,b=null,E=null,_.set(0,0,0),w=0,g=K,L=gt}return}Le=Le||be,ue=ue||ae,ze=ze||ye,(be!==v||Le!==A)&&(n.blendEquationSeparate(ge[be],ge[Le]),v=be,A=Le),(ae!==S||ye!==y||ue!==b||ze!==E)&&(n.blendFuncSeparate(Me[ae],Me[ye],Me[ue],Me[ze]),S=ae,y=ye,b=ue,E=ze),(Ue.equals(_)===!1||Dt!==w)&&(n.blendColor(Ue.r,Ue.g,Ue.b,Dt),_.copy(Ue),w=Dt),g=K,L=!1}function Ie(K,be){K.side===Oi?W(n.CULL_FACE):ie(n.CULL_FACE);let ae=K.side===Dn;be&&(ae=!ae),He(ae),K.blending===$r&&K.transparent===!1?Se(yi):Se(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),a.setFunc(K.depthFunc),a.setTest(K.depthTest),a.setMask(K.depthWrite),s.setMask(K.colorWrite);const ye=K.stencilWrite;o.setTest(ye),ye&&(o.setMask(K.stencilWriteMask),o.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),o.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Nt(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):W(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(K){R!==K&&(K?n.frontFace(n.CW):n.frontFace(n.CCW),R=K)}function st(K){K!==e1?(ie(n.CULL_FACE),K!==P&&(K===ih?n.cullFace(n.BACK):K===t1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):W(n.CULL_FACE),P=K}function Ct(K){K!==O&&(k&&n.lineWidth(K),O=K)}function Nt(K,be,ae){K?(ie(n.POLYGON_OFFSET_FILL),(I!==be||U!==ae)&&(I=be,U=ae,a.getReversed()&&(be=-be),n.polygonOffset(be,ae))):W(n.POLYGON_OFFSET_FILL)}function Et(K){K?ie(n.SCISSOR_TEST):W(n.SCISSOR_TEST)}function Lt(K){K===void 0&&(K=n.TEXTURE0+z-1),Z!==K&&(n.activeTexture(K),Z=K)}function X(K,be,ae){ae===void 0&&(Z===null?ae=n.TEXTURE0+z-1:ae=Z);let ye=N[ae];ye===void 0&&(ye={type:void 0,texture:void 0},N[ae]=ye),(ye.type!==K||ye.texture!==be)&&(Z!==ae&&(n.activeTexture(ae),Z=ae),n.bindTexture(K,be||q[K]),ye.type=K,ye.texture=be)}function je(){const K=N[Z];K!==void 0&&K.type!==void 0&&(n.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function Ye(){try{n.compressedTexImage2D(...arguments)}catch(K){dt("WebGLState:",K)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(K){dt("WebGLState:",K)}}function T(){try{n.texSubImage2D(...arguments)}catch(K){dt("WebGLState:",K)}}function B(){try{n.texSubImage3D(...arguments)}catch(K){dt("WebGLState:",K)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(K){dt("WebGLState:",K)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(K){dt("WebGLState:",K)}}function fe(){try{n.texStorage2D(...arguments)}catch(K){dt("WebGLState:",K)}}function me(){try{n.texStorage3D(...arguments)}catch(K){dt("WebGLState:",K)}}function re(){try{n.texImage2D(...arguments)}catch(K){dt("WebGLState:",K)}}function se(){try{n.texImage3D(...arguments)}catch(K){dt("WebGLState:",K)}}function ve(K){return f[K]!==void 0?f[K]:n.getParameter(K)}function Fe(K,be){f[K]!==be&&(n.pixelStorei(K,be),f[K]=be)}function we(K){oe.equals(K)===!1&&(n.scissor(K.x,K.y,K.z,K.w),oe.copy(K))}function _e(K){he.equals(K)===!1&&(n.viewport(K.x,K.y,K.z,K.w),he.copy(K))}function Be(K,be){let ae=c.get(be);ae===void 0&&(ae=new WeakMap,c.set(be,ae));let ye=ae.get(K);ye===void 0&&(ye=n.getUniformBlockIndex(be,K.name),ae.set(K,ye))}function Ve(K,be){const ye=c.get(be).get(K);h.get(be)!==ye&&(n.uniformBlockBinding(be,ye,K.__bindingPointIndex),h.set(be,ye))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},Z=null,N={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,S=null,y=null,A=null,b=null,E=null,_=new nt(0,0,0),w=0,L=!1,R=null,P=null,O=null,I=null,U=null,oe.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ie,disable:W,bindFramebuffer:pe,drawBuffers:ce,useProgram:Ae,setBlending:Se,setMaterial:Ie,setFlipSided:He,setCullFace:st,setLineWidth:Ct,setPolygonOffset:Nt,setScissorTest:Et,activeTexture:Lt,bindTexture:X,unbindTexture:je,compressedTexImage2D:Ye,compressedTexImage3D:F,texImage2D:re,texImage3D:se,pixelStorei:Fe,getParameter:ve,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:fe,texStorage3D:me,texSubImage2D:T,texSubImage3D:B,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:we,viewport:_e,reset:Ze}}function tb(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,d=new WeakMap,f=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(F,T){return m?new OffscreenCanvas(F,T):Ga("canvas")}function x(F,T,B){let $=1;const te=Ye(F);if((te.width>B||te.height>B)&&($=B/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const fe=Math.floor($*te.width),me=Math.floor($*te.height);u===void 0&&(u=M(fe,me));const re=T?M(fe,me):u;return re.width=fe,re.height=me,re.getContext("2d").drawImage(F,0,0,fe,me),Xe("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+fe+"x"+me+")."),re}else return"data"in F&&Xe("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),F;return F}function g(F){return F.generateMipmaps}function v(F){n.generateMipmap(F)}function S(F){return F.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?n.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(F,T,B,$,te,fe=!1){if(F!==null){if(n[F]!==void 0)return n[F];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let me;$&&(me=e.get("EXT_texture_norm16"),me||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=T;if(T===n.RED&&(B===n.FLOAT&&(re=n.R32F),B===n.HALF_FLOAT&&(re=n.R16F),B===n.UNSIGNED_BYTE&&(re=n.R8),B===n.UNSIGNED_SHORT&&me&&(re=me.R16_EXT),B===n.SHORT&&me&&(re=me.R16_SNORM_EXT)),T===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.R8UI),B===n.UNSIGNED_SHORT&&(re=n.R16UI),B===n.UNSIGNED_INT&&(re=n.R32UI),B===n.BYTE&&(re=n.R8I),B===n.SHORT&&(re=n.R16I),B===n.INT&&(re=n.R32I)),T===n.RG&&(B===n.FLOAT&&(re=n.RG32F),B===n.HALF_FLOAT&&(re=n.RG16F),B===n.UNSIGNED_BYTE&&(re=n.RG8),B===n.UNSIGNED_SHORT&&me&&(re=me.RG16_EXT),B===n.SHORT&&me&&(re=me.RG16_SNORM_EXT)),T===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.RG8UI),B===n.UNSIGNED_SHORT&&(re=n.RG16UI),B===n.UNSIGNED_INT&&(re=n.RG32UI),B===n.BYTE&&(re=n.RG8I),B===n.SHORT&&(re=n.RG16I),B===n.INT&&(re=n.RG32I)),T===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.RGB8UI),B===n.UNSIGNED_SHORT&&(re=n.RGB16UI),B===n.UNSIGNED_INT&&(re=n.RGB32UI),B===n.BYTE&&(re=n.RGB8I),B===n.SHORT&&(re=n.RGB16I),B===n.INT&&(re=n.RGB32I)),T===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(re=n.RGBA16UI),B===n.UNSIGNED_INT&&(re=n.RGBA32UI),B===n.BYTE&&(re=n.RGBA8I),B===n.SHORT&&(re=n.RGBA16I),B===n.INT&&(re=n.RGBA32I)),T===n.RGB&&(B===n.UNSIGNED_SHORT&&me&&(re=me.RGB16_EXT),B===n.SHORT&&me&&(re=me.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(re=n.R11F_G11F_B10F)),T===n.RGBA){const se=fe?za:at.getTransfer(te);B===n.FLOAT&&(re=n.RGBA32F),B===n.HALF_FLOAT&&(re=n.RGBA16F),B===n.UNSIGNED_BYTE&&(re=se===St?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&me&&(re=me.RGBA16_EXT),B===n.SHORT&&me&&(re=me.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function A(F,T){let B;return F?T===null||T===wi||T===Is?B=n.DEPTH24_STENCIL8:T===_i?B=n.DEPTH32F_STENCIL8:T===Ds&&(B=n.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===wi||T===Is?B=n.DEPTH_COMPONENT24:T===_i?B=n.DEPTH_COMPONENT32F:T===Ds&&(B=n.DEPTH_COMPONENT16),B}function b(F,T){return g(F)===!0||F.isFramebufferTexture&&F.minFilter!==Yt&&F.minFilter!==Vt?Math.log2(Math.max(T.width,T.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?T.mipmaps.length:1}function E(F){const T=F.target;T.removeEventListener("dispose",E),w(T),T.isVideoTexture&&d.delete(T),T.isHTMLTexture&&f.delete(T)}function _(F){const T=F.target;T.removeEventListener("dispose",_),R(T)}function w(F){const T=i.get(F);if(T.__webglInit===void 0)return;const B=F.source,$=p.get(B);if($){const te=$[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&L(F),Object.keys($).length===0&&p.delete(B)}i.remove(F)}function L(F){const T=i.get(F);n.deleteTexture(T.__webglTexture);const B=F.source,$=p.get(B);delete $[T.__cacheKey],a.memory.textures--}function R(F){const T=i.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),i.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(T.__webglFramebuffer[$]))for(let te=0;te<T.__webglFramebuffer[$].length;te++)n.deleteFramebuffer(T.__webglFramebuffer[$][te]);else n.deleteFramebuffer(T.__webglFramebuffer[$]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[$])}else{if(Array.isArray(T.__webglFramebuffer))for(let $=0;$<T.__webglFramebuffer.length;$++)n.deleteFramebuffer(T.__webglFramebuffer[$]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let $=0;$<T.__webglColorRenderbuffer.length;$++)T.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[$]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const B=F.textures;for(let $=0,te=B.length;$<te;$++){const fe=i.get(B[$]);fe.__webglTexture&&(n.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(B[$])}i.remove(F)}let P=0;function O(){P=0}function I(){return P}function U(F){P=F}function z(){const F=P;return F>=r.maxTextures&&Xe("WebGLTextures: Trying to use "+(F+1)+" texture units while this GPU supports only "+r.maxTextures),P+=1,F}function k(F){const T=[];return T.push(F.wrapS),T.push(F.wrapT),T.push(F.wrapR||0),T.push(F.magFilter),T.push(F.minFilter),T.push(F.anisotropy),T.push(F.internalFormat),T.push(F.format),T.push(F.type),T.push(F.generateMipmaps),T.push(F.premultiplyAlpha),T.push(F.flipY),T.push(F.unpackAlignment),T.push(F.colorSpace),T.join()}function ee(F,T){const B=i.get(F);if(F.isVideoTexture&&X(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&B.__version!==F.version){const $=F.image;if($===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{W(B,F,T);return}}else F.isExternalTexture&&(B.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+T)}function H(F,T){const B=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&B.__version!==F.version){W(B,F,T);return}else F.isExternalTexture&&(B.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+T)}function Z(F,T){const B=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&B.__version!==F.version){W(B,F,T);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+T)}function N(F,T){const B=i.get(F);if(F.isCubeDepthTexture!==!0&&F.version>0&&B.__version!==F.version){pe(B,F,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+T)}const Y={[Ua]:n.REPEAT,[Ni]:n.CLAMP_TO_EDGE,[xl]:n.MIRRORED_REPEAT},j={[Yt]:n.NEAREST,[_1]:n.NEAREST_MIPMAP_NEAREST,[Xs]:n.NEAREST_MIPMAP_LINEAR,[Vt]:n.LINEAR,[Mo]:n.LINEAR_MIPMAP_NEAREST,[mr]:n.LINEAR_MIPMAP_LINEAR},oe={[w1]:n.NEVER,[C1]:n.ALWAYS,[E1]:n.LESS,[yc]:n.LEQUAL,[A1]:n.EQUAL,[Sc]:n.GEQUAL,[T1]:n.GREATER,[R1]:n.NOTEQUAL};function he(F,T){if(T.type===_i&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Vt||T.magFilter===Mo||T.magFilter===Xs||T.magFilter===mr||T.minFilter===Vt||T.minFilter===Mo||T.minFilter===Xs||T.minFilter===mr)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(F,n.TEXTURE_WRAP_S,Y[T.wrapS]),n.texParameteri(F,n.TEXTURE_WRAP_T,Y[T.wrapT]),(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)&&n.texParameteri(F,n.TEXTURE_WRAP_R,Y[T.wrapR]),n.texParameteri(F,n.TEXTURE_MAG_FILTER,j[T.magFilter]),n.texParameteri(F,n.TEXTURE_MIN_FILTER,j[T.minFilter]),T.compareFunction&&(n.texParameteri(F,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(F,n.TEXTURE_COMPARE_FUNC,oe[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Yt||T.minFilter!==Xs&&T.minFilter!==mr||T.type===_i&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(F,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function xe(F,T){let B=!1;F.__webglInit===void 0&&(F.__webglInit=!0,T.addEventListener("dispose",E));const $=T.source;let te=p.get($);te===void 0&&(te={},p.set($,te));const fe=k(T);if(fe!==F.__cacheKey){te[fe]===void 0&&(te[fe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),te[fe].usedTimes++;const me=te[F.__cacheKey];me!==void 0&&(te[F.__cacheKey].usedTimes--,me.usedTimes===0&&L(T)),F.__cacheKey=fe,F.__webglTexture=te[fe].texture}return B}function q(F,T,B){return Math.floor(Math.floor(F/B)/T)}function ie(F,T,B,$){const fe=F.updateRanges;if(fe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,B,$,T.data);else{fe.sort((Fe,we)=>Fe.start-we.start);let me=0;for(let Fe=1;Fe<fe.length;Fe++){const we=fe[me],_e=fe[Fe],Be=we.start+we.count,Ve=q(_e.start,T.width,4),Ze=q(we.start,T.width,4);_e.start<=Be+1&&Ve===Ze&&q(_e.start+_e.count-1,T.width,4)===Ve?we.count=Math.max(we.count,_e.start+_e.count-we.start):(++me,fe[me]=_e)}fe.length=me+1;const re=t.getParameter(n.UNPACK_ROW_LENGTH),se=t.getParameter(n.UNPACK_SKIP_PIXELS),ve=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let Fe=0,we=fe.length;Fe<we;Fe++){const _e=fe[Fe],Be=Math.floor(_e.start/4),Ve=Math.ceil(_e.count/4),Ze=Be%T.width,K=Math.floor(Be/T.width),be=Ve,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),t.pixelStorei(n.UNPACK_SKIP_ROWS,K),t.texSubImage2D(n.TEXTURE_2D,0,Ze,K,be,ae,B,$,T.data)}F.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,se),t.pixelStorei(n.UNPACK_SKIP_ROWS,ve)}}function W(F,T,B){let $=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&($=n.TEXTURE_3D);const te=xe(F,T),fe=T.source;t.bindTexture($,F.__webglTexture,n.TEXTURE0+B);const me=i.get(fe);if(fe.version!==me.__version||te===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const ae=at.getPrimaries(at.workingColorSpace),ye=T.colorSpace===Xn?null:at.getPrimaries(T.colorSpace),Le=T.colorSpace===Xn||ae===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment);let se=x(T.image,!1,r.maxTextureSize);se=je(T,se);const ve=s.convert(T.format,T.colorSpace),Fe=s.convert(T.type);let we=y(T.internalFormat,ve,Fe,T.normalized,T.colorSpace,T.isVideoTexture);he($,T);let _e;const Be=T.mipmaps,Ve=T.isVideoTexture!==!0,Ze=me.__version===void 0||te===!0,K=fe.dataReady,be=b(T,se);if(T.isDepthTexture)we=A(T.format===gr,T.type),Ze&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,we,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,we,se.width,se.height,0,ve,Fe,null));else if(T.isDataTexture)if(Be.length>0){Ve&&Ze&&t.texStorage2D(n.TEXTURE_2D,be,we,Be[0].width,Be[0].height);for(let ae=0,ye=Be.length;ae<ye;ae++)_e=Be[ae],Ve?K&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,ve,Fe,_e.data):t.texImage2D(n.TEXTURE_2D,ae,we,_e.width,_e.height,0,ve,Fe,_e.data);T.generateMipmaps=!1}else Ve?(Ze&&t.texStorage2D(n.TEXTURE_2D,be,we,se.width,se.height),K&&ie(T,se,ve,Fe)):t.texImage2D(n.TEXTURE_2D,0,we,se.width,se.height,0,ve,Fe,se.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ve&&Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,we,Be[0].width,Be[0].height,se.depth);for(let ae=0,ye=Be.length;ae<ye;ae++)if(_e=Be[ae],T.format!==kn)if(ve!==null)if(Ve){if(K)if(T.layerUpdates.size>0){const Le=Oh(_e.width,_e.height,T.format,T.type);for(const ue of T.layerUpdates){const ze=_e.data.subarray(ue*Le/_e.data.BYTES_PER_ELEMENT,(ue+1)*Le/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,ue,_e.width,_e.height,1,ve,ze)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,se.depth,ve,_e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,we,_e.width,_e.height,se.depth,0,_e.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?K&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,se.depth,ve,Fe,_e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,we,_e.width,_e.height,se.depth,0,ve,Fe,_e.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Ve&&Ze&&t.texStorage2D(n.TEXTURE_2D,be,we,Be[0].width,Be[0].height);for(let ae=0,ye=Be.length;ae<ye;ae++)_e=Be[ae],T.format!==kn?ve!==null?Ve?K&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,ve,_e.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,we,_e.width,_e.height,0,_e.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?K&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,ve,Fe,_e.data):t.texImage2D(n.TEXTURE_2D,ae,we,_e.width,_e.height,0,ve,Fe,_e.data)}else if(T.isDataArrayTexture)if(Ve){if(Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,we,se.width,se.height,se.depth),K)if(T.layerUpdates.size>0){const ae=Oh(se.width,se.height,T.format,T.type);for(const ye of T.layerUpdates){const Le=se.data.subarray(ye*ae/se.data.BYTES_PER_ELEMENT,(ye+1)*ae/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ye,se.width,se.height,1,ve,Fe,Le)}T.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ve,Fe,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,se.width,se.height,se.depth,0,ve,Fe,se.data);else if(T.isData3DTexture)Ve?(Ze&&t.texStorage3D(n.TEXTURE_3D,be,we,se.width,se.height,se.depth),K&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ve,Fe,se.data)):t.texImage3D(n.TEXTURE_3D,0,we,se.width,se.height,se.depth,0,ve,Fe,se.data);else if(T.isFramebufferTexture){if(Ze)if(Ve)t.texStorage2D(n.TEXTURE_2D,be,we,se.width,se.height);else{let ae=se.width,ye=se.height;for(let Le=0;Le<be;Le++)t.texImage2D(n.TEXTURE_2D,Le,we,ae,ye,0,ve,Fe,null),ae>>=1,ye>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in n){const ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),se.parentNode!==ae){ae.appendChild(se),f.add(T),ae.onpaint=ye=>{const Le=ye.changedElements;for(const ue of f)Le.includes(ue.image)&&(ue.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,se);else{const Le=n.RGBA,ue=n.RGBA,ze=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Le,ue,ze,se)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Ve&&Ze){const ae=Ye(Be[0]);t.texStorage2D(n.TEXTURE_2D,be,we,ae.width,ae.height)}for(let ae=0,ye=Be.length;ae<ye;ae++)_e=Be[ae],Ve?K&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ve,Fe,_e):t.texImage2D(n.TEXTURE_2D,ae,we,ve,Fe,_e);T.generateMipmaps=!1}else if(Ve){if(Ze){const ae=Ye(se);t.texStorage2D(n.TEXTURE_2D,be,we,ae.width,ae.height)}K&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Fe,se)}else t.texImage2D(n.TEXTURE_2D,0,we,ve,Fe,se);g(T)&&v($),me.__version=fe.version,T.onUpdate&&T.onUpdate(T)}F.__version=T.version}function pe(F,T,B){if(T.image.length!==6)return;const $=xe(F,T),te=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+B);const fe=i.get(te);if(te.version!==fe.__version||$===!0){t.activeTexture(n.TEXTURE0+B);const me=at.getPrimaries(at.workingColorSpace),re=T.colorSpace===Xn?null:at.getPrimaries(T.colorSpace),se=T.colorSpace===Xn||me===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const ve=T.isCompressedTexture||T.image[0].isCompressedTexture,Fe=T.image[0]&&T.image[0].isDataTexture,we=[];for(let ue=0;ue<6;ue++)!ve&&!Fe?we[ue]=x(T.image[ue],!0,r.maxCubemapSize):we[ue]=Fe?T.image[ue].image:T.image[ue],we[ue]=je(T,we[ue]);const _e=we[0],Be=s.convert(T.format,T.colorSpace),Ve=s.convert(T.type),Ze=y(T.internalFormat,Be,Ve,T.normalized,T.colorSpace),K=T.isVideoTexture!==!0,be=fe.__version===void 0||$===!0,ae=te.dataReady;let ye=b(T,_e);he(n.TEXTURE_CUBE_MAP,T);let Le;if(ve){K&&be&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ze,_e.width,_e.height);for(let ue=0;ue<6;ue++){Le=we[ue].mipmaps;for(let ze=0;ze<Le.length;ze++){const Ue=Le[ze];T.format!==kn?Be!==null?K?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze,0,0,Ue.width,Ue.height,Be,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze,Ze,Ue.width,Ue.height,0,Ue.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze,0,0,Ue.width,Ue.height,Be,Ve,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze,Ze,Ue.width,Ue.height,0,Be,Ve,Ue.data)}}}else{if(Le=T.mipmaps,K&&be){Le.length>0&&ye++;const ue=Ye(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ze,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Fe){K?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,we[ue].width,we[ue].height,Be,Ve,we[ue].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ze,we[ue].width,we[ue].height,0,Be,Ve,we[ue].data);for(let ze=0;ze<Le.length;ze++){const Dt=Le[ze].image[ue].image;K?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze+1,0,0,Dt.width,Dt.height,Be,Ve,Dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze+1,Ze,Dt.width,Dt.height,0,Be,Ve,Dt.data)}}else{K?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Be,Ve,we[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ze,Be,Ve,we[ue]);for(let ze=0;ze<Le.length;ze++){const Ue=Le[ze];K?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze+1,0,0,Be,Ve,Ue.image[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ze+1,Ze,Be,Ve,Ue.image[ue])}}}g(T)&&v(n.TEXTURE_CUBE_MAP),fe.__version=te.version,T.onUpdate&&T.onUpdate(T)}F.__version=T.version}function ce(F,T,B,$,te,fe){const me=s.convert(B.format,B.colorSpace),re=s.convert(B.type),se=y(B.internalFormat,me,re,B.normalized,B.colorSpace),ve=i.get(T),Fe=i.get(B);if(Fe.__renderTarget=T,!ve.__hasExternalTextures){const we=Math.max(1,T.width>>fe),_e=Math.max(1,T.height>>fe);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,fe,se,we,_e,T.depth,0,me,re,null):t.texImage2D(te,fe,se,we,_e,0,me,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,F),Lt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,te,Fe.__webglTexture,0,Et(T)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,te,Fe.__webglTexture,fe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(F,T,B){if(n.bindRenderbuffer(n.RENDERBUFFER,F),T.depthBuffer){const $=T.depthTexture,te=$&&$.isDepthTexture?$.type:null,fe=A(T.stencilBuffer,te),me=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Lt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Et(T),fe,T.width,T.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Et(T),fe,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,fe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,F)}else{const $=T.textures;for(let te=0;te<$.length;te++){const fe=$[te],me=s.convert(fe.format,fe.colorSpace),re=s.convert(fe.type),se=y(fe.internalFormat,me,re,fe.normalized,fe.colorSpace);Lt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Et(T),se,T.width,T.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,Et(T),se,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,se,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(F,T,B){const $=T.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,F),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(T.depthTexture);if(te.__renderTarget=T,(!te.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,T.depthTexture.addEventListener("dispose",E)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),he(n.TEXTURE_CUBE_MAP,T.depthTexture);const ve=s.convert(T.depthTexture.format),Fe=s.convert(T.depthTexture.type);let we;T.depthTexture.format===Bi?we=n.DEPTH_COMPONENT24:T.depthTexture.format===gr&&(we=n.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,we,T.width,T.height,0,ve,Fe,null)}}else ee(T.depthTexture,0);const fe=te.__webglTexture,me=Et(T),re=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,se=T.depthTexture.format===gr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(T.depthTexture.format===Bi)Lt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,re,fe,0,me):n.framebufferTexture2D(n.FRAMEBUFFER,se,re,fe,0);else if(T.depthTexture.format===gr)Lt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,re,fe,0,me):n.framebufferTexture2D(n.FRAMEBUFFER,se,re,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Me(F){const T=i.get(F),B=F.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==F.depthTexture){const $=F.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),$){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=$}if(F.depthTexture&&!T.__autoAllocateDepthBuffer)if(B)for(let $=0;$<6;$++)ge(T.__webglFramebuffer[$],F,$);else{const $=F.texture.mipmaps;$&&$.length>0?ge(T.__webglFramebuffer[0],F,0):ge(T.__webglFramebuffer,F,0)}else if(B){T.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[$]),T.__webglDepthbuffer[$]===void 0)T.__webglDepthbuffer[$]=n.createRenderbuffer(),Ae(T.__webglDepthbuffer[$],F,!1);else{const te=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=T.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,fe)}}else{const $=F.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),Ae(T.__webglDepthbuffer,F,!1);else{const te=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,fe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Se(F,T,B){const $=i.get(F);T!==void 0&&ce($.__webglFramebuffer,F,F.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Me(F)}function Ie(F){const T=F.texture,B=i.get(F),$=i.get(T);F.addEventListener("dispose",_);const te=F.textures,fe=F.isWebGLCubeRenderTarget===!0,me=te.length>1;if(me||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=T.version,a.memory.textures++),fe){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let se=0;se<T.mipmaps.length;se++)B.__webglFramebuffer[re][se]=n.createFramebuffer()}else B.__webglFramebuffer[re]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<T.mipmaps.length;re++)B.__webglFramebuffer[re]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(me)for(let re=0,se=te.length;re<se;re++){const ve=i.get(te[re]);ve.__webglTexture===void 0&&(ve.__webglTexture=n.createTexture(),a.memory.textures++)}if(F.samples>0&&Lt(F)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<te.length;re++){const se=te[re];B.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const ve=s.convert(se.format,se.colorSpace),Fe=s.convert(se.type),we=y(se.internalFormat,ve,Fe,se.normalized,se.colorSpace,F.isXRRenderTarget===!0),_e=Et(F);n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,we,F.width,F.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,B.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),F.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(B.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(fe){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),he(n.TEXTURE_CUBE_MAP,T);for(let re=0;re<6;re++)if(T.mipmaps&&T.mipmaps.length>0)for(let se=0;se<T.mipmaps.length;se++)ce(B.__webglFramebuffer[re][se],F,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,se);else ce(B.__webglFramebuffer[re],F,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(T)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let re=0,se=te.length;re<se;re++){const ve=te[re],Fe=i.get(ve);let we=n.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(we=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(we,Fe.__webglTexture),he(we,ve),ce(B.__webglFramebuffer,F,ve,n.COLOR_ATTACHMENT0+re,we,0),g(ve)&&v(we)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(re=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),he(re,T),T.mipmaps&&T.mipmaps.length>0)for(let se=0;se<T.mipmaps.length;se++)ce(B.__webglFramebuffer[se],F,T,n.COLOR_ATTACHMENT0,re,se);else ce(B.__webglFramebuffer,F,T,n.COLOR_ATTACHMENT0,re,0);g(T)&&v(re),t.unbindTexture()}F.depthBuffer&&Me(F)}function He(F){const T=F.textures;for(let B=0,$=T.length;B<$;B++){const te=T[B];if(g(te)){const fe=S(F),me=i.get(te).__webglTexture;t.bindTexture(fe,me),v(fe),t.unbindTexture()}}}const st=[],Ct=[];function Nt(F){if(F.samples>0){if(Lt(F)===!1){const T=F.textures,B=F.width,$=F.height;let te=n.COLOR_BUFFER_BIT;const fe=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=i.get(F),re=T.length>1;if(re)for(let ve=0;ve<T.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const se=F.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ve=0;ve<T.length;ve++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);const Fe=i.get(T[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Fe,0)}n.blitFramebuffer(0,0,B,$,0,0,B,$,te,n.NEAREST),h===!0&&(st.length=0,Ct.length=0,st.push(n.COLOR_ATTACHMENT0+ve),F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&(st.push(fe),Ct.push(fe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let ve=0;ve<T.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);const Fe=i.get(T[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,Fe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&h){const T=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function Et(F){return Math.min(r.maxSamples,F.samples)}function Lt(F){const T=i.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function X(F){const T=a.render.frame;d.get(F)!==T&&(d.set(F,T),F.update())}function je(F,T){const B=F.colorSpace,$=F.format,te=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||B!==Os&&B!==Xn&&(at.getTransfer(B)===St?($!==kn||te!==Un)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):dt("WebGLTextures: Unsupported texture color space:",B)),T}function Ye(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(c.width=F.naturalWidth||F.width,c.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(c.width=F.displayWidth,c.height=F.displayHeight):(c.width=F.width,c.height=F.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=ee,this.setTexture2DArray=H,this.setTexture3D=Z,this.setTextureCube=N,this.rebindTextures=Se,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function nb(n,e){function t(i,r=Xn){let s;const a=at.getTransfer(r);if(i===Un)return n.UNSIGNED_BYTE;if(i===xc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ed)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===td)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qu)return n.BYTE;if(i===ju)return n.SHORT;if(i===Ds)return n.UNSIGNED_SHORT;if(i===gc)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===_i)return n.FLOAT;if(i===Ei)return n.HALF_FLOAT;if(i===nd)return n.ALPHA;if(i===id)return n.RGB;if(i===kn)return n.RGBA;if(i===Bi)return n.DEPTH_COMPONENT;if(i===gr)return n.DEPTH_STENCIL;if(i===rd)return n.RED;if(i===vc)return n.RED_INTEGER;if(i===yr)return n.RG;if(i===_c)return n.RG_INTEGER;if(i===bc)return n.RGBA_INTEGER;if(i===Ta||i===Ra||i===Ca||i===La)if(a===St)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ta)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ra)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===La)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ta)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ra)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ca)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===La)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ml||i===vl||i===_l||i===bl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ml)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===vl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_l)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===bl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yl||i===Sl||i===wl||i===El||i===Al||i===ka||i===Tl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===yl||i===Sl)return a===St?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===wl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===El)return s.COMPRESSED_R11_EAC;if(i===Al)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ka)return s.COMPRESSED_RG11_EAC;if(i===Tl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Rl||i===Cl||i===Ll||i===Pl||i===Dl||i===Il||i===Ol||i===Nl||i===Fl||i===Ul||i===kl||i===Bl||i===zl||i===Hl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Rl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ll)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Dl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Il)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ol)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ul)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===kl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Hl)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Gl||i===Wl||i===Vl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Gl)return a===St?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Yl||i===Xl||i===Ba||i===Kl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Yl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Xl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ba)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Is?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const ib=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rb=`
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

}`;class sb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new md(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yt({vertexShader:ib,fragmentShader:rb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new Hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ab extends wr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",h=1,c=null,d=null,f=null,u=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",x=new sb,g={},v=t.getContextAttributes();let S=null,y=null;const A=[],b=[],E=new qe;let _=null,w=null;const L=new Fn;L.viewport=new rt;const R=new Fn;R.viewport=new rt;const P=[L,R],O=new p2;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=A[q];return ie===void 0&&(ie=new To,A[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=A[q];return ie===void 0&&(ie=new To,A[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=A[q];return ie===void 0&&(ie=new To,A[q]=ie),ie.getHandSpace()};function z(q){const ie=b.indexOf(q.inputSource);if(ie===-1)return;const W=A[ie];W!==void 0&&(W.update(q.inputSource,q.frame,c||a),W.dispatchEvent({type:q.type,data:q.inputSource}))}function k(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",ee);for(let q=0;q<A.length;q++){const ie=b[q];ie!==null&&(b[q]=null,A[q].disconnect(ie))}I=null,U=null,x.reset();for(const q in g)delete g[q];if(e.setRenderTarget(S),p=null,u=null,f=null,r=null,y=null,xe.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(E.width,E.height,!1),w!==null){const q=w.camera;q.fov=w.fov,q.zoom=w.zoom,q.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",k),r.addEventListener("inputsourceschange",ee),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(E),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,pe=null,ce=null;v.depth&&(ce=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=v.stencil?gr:Bi,pe=v.stencil?Is:wi);const Ae={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Ae),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new qn(u.textureWidth,u.textureHeight,{format:kn,type:Un,depthTexture:new ns(u.textureWidth,u.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const W={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,W),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new qn(p.framebufferWidth,p.framebufferHeight,{format:kn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await r.requestReferenceSpace(o),xe.setContext(r),xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ee(q){for(let ie=0;ie<q.removed.length;ie++){const W=q.removed[ie],pe=b.indexOf(W);pe>=0&&(b[pe]=null,A[pe].disconnect(W))}for(let ie=0;ie<q.added.length;ie++){const W=q.added[ie];let pe=b.indexOf(W);if(pe===-1){for(let Ae=0;Ae<A.length;Ae++)if(Ae>=b.length){b.push(W),pe=Ae;break}else if(b[Ae]===null){b[Ae]=W,pe=Ae;break}if(pe===-1)break}const ce=A[pe];ce&&ce.connect(W)}}const H=new V,Z=new V;function N(q,ie,W){H.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(W.matrixWorld);const pe=H.distanceTo(Z),ce=ie.projectionMatrix.elements,Ae=W.projectionMatrix.elements,ge=ce[14]/(ce[10]-1),Me=ce[14]/(ce[10]+1),Se=(ce[9]+1)/ce[5],Ie=(ce[9]-1)/ce[5],He=(ce[8]-1)/ce[0],st=(Ae[8]+1)/Ae[0],Ct=ge*He,Nt=ge*st,Et=pe/(-He+st),Lt=Et*-He;if(ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Lt),q.translateZ(Et),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ce[10]===-1)q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const X=ge+Et,je=Me+Et,Ye=Ct-Lt,F=Nt+(pe-Lt),T=Se*Me/je*X,B=Ie*Me/je*X;q.projectionMatrix.makePerspective(Ye,F,T,B,X,je),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Y(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ie=q.near,W=q.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(W=x.depthFar)),O.near=R.near=L.near=ie,O.far=R.far=L.far=W,(I!==O.near||U!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,U=O.far),O.layers.mask=q.layers.mask|6,L.layers.mask=O.layers.mask&-5,R.layers.mask=O.layers.mask&-3;const pe=q.parent,ce=O.cameras;Y(O,pe);for(let Ae=0;Ae<ce.length;Ae++)Y(ce[Ae],pe);ce.length===2?N(O,L,R):O.projectionMatrix.copy(L.projectionMatrix),w===null&&q.isPerspectiveCamera&&(w={camera:q,fov:q.fov,zoom:q.zoom}),j(q,O,pe)};function j(q,ie,W){W===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy(W.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ql*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(q){h=q,u!==null&&(u.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(q){return g[q]};let oe=null;function he(q,ie){if(d=ie.getViewerPose(c||a),m=ie,d!==null){const W=d.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let pe=!1;W.length!==O.cameras.length&&(O.cameras.length=0,pe=!0);for(let Me=0;Me<W.length;Me++){const Se=W[Me];let Ie=null;if(p!==null)Ie=p.getViewport(Se);else{const st=f.getViewSubImage(u,Se);Ie=st.viewport,Me===0&&(e.setRenderTargetTextures(y,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(y))}let He=P[Me];He===void 0&&(He=new Fn,He.layers.enable(Me),He.viewport=new rt,P[Me]=He),He.matrix.fromArray(Se.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Se.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),Me===0&&(O.matrix.copy(He.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),pe===!0&&O.cameras.push(He)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const Me=f.getDepthInformation(W[0]);Me&&Me.isValid&&Me.texture&&x.init(Me,r.renderState)}if(ce&&ce.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let Me=0;Me<W.length;Me++){const Se=W[Me].camera;if(Se){let Ie=g[Se];Ie||(Ie=new md,g[Se]=Ie);const He=f.getCameraImage(Se);Ie.sourceTexture=He}}}}for(let W=0;W<A.length;W++){const pe=b[W],ce=A[W];pe!==null&&ce!==void 0&&ce.update(pe,ie,c||a)}oe&&oe(q,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}const xe=new vd;xe.setAnimationLoop(he),this.setAnimationLoop=function(q){oe=q},this.dispose=function(){}}}const ob=new Bt,Ad=new $e;Ad.set(-1,0,0,0,1,0,0,0,1);function lb(n,e){function t(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function i(x,g){g.color.getRGB(x.fogColor.value,gd(n)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function r(x,g,v,S,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(x,g):g.isMeshLambertMaterial?(s(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(x,g),f(x,g)):g.isMeshPhongMaterial?(s(x,g),d(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(x,g),u(x,g),g.isMeshPhysicalMaterial&&p(x,g,y)):g.isMeshMatcapMaterial?(s(x,g),m(x,g)):g.isMeshDepthMaterial?s(x,g):g.isMeshDistanceMaterial?(s(x,g),M(x,g)):g.isMeshNormalMaterial?s(x,g):g.isLineBasicMaterial?(a(x,g),g.isLineDashedMaterial&&o(x,g)):g.isPointsMaterial?h(x,g,v,S):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,t(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Dn&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,t(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Dn&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,t(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,t(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const v=e.get(g),S=v.envMap,y=v.envMapRotation;S&&(x.envMap.value=S,x.envMapRotation.value.setFromMatrix4(ob.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Ad),x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,x.aoMapTransform))}function a(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform))}function o(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function h(x,g,v,S){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*v,x.scale.value=S*.5,g.map&&(x.map.value=g.map,t(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function d(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function f(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function u(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function p(x,g,v){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Dn&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.retroreflectivity>0&&(x.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,g){g.matcap&&(x.matcap.value=g.matcap)}function M(x,g){const v=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function cb(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(y,A){const b=A.program;i.uniformBlockBinding(y,b)}function c(y,A){let b=r[y.id];b===void 0&&(x(y),b=d(y),r[y.id]=b,y.addEventListener("dispose",v));const E=A.program;i.updateUBOMapping(y,E);const _=e.render.frame;s[y.id]!==_&&(u(y),s[y.id]=_)}function d(y){const A=f();y.__bindingPointIndex=A;const b=n.createBuffer(),E=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,E,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,b),b}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const A=r[y.id],b=y.uniforms,E=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let _=0,w=b.length;_<w;_++){const L=b[_];if(Array.isArray(L))for(let R=0,P=L.length;R<P;R++)p(L[R],_,R,E);else p(L,_,0,E)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,A,b,E){if(M(y,A,b,E)===!0){const _=y.__offset,w=y.value;if(Array.isArray(w)){let L=0;for(let R=0;R<w.length;R++){const P=w[R],O=g(P);m(P,y.__data,L),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(L+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function m(y,A,b){typeof y=="number"||typeof y=="boolean"?A[0]=y:y.isMatrix3?(A[0]=y.elements[0],A[1]=y.elements[1],A[2]=y.elements[2],A[3]=0,A[4]=y.elements[3],A[5]=y.elements[4],A[6]=y.elements[5],A[7]=0,A[8]=y.elements[6],A[9]=y.elements[7],A[10]=y.elements[8],A[11]=0):ArrayBuffer.isView(y)?A.set(new y.constructor(y.buffer,y.byteOffset,A.length)):y.toArray(A,b)}function M(y,A,b,E){const _=y.value,w=A+"_"+b;if(E[w]===void 0)return typeof _=="number"||typeof _=="boolean"?E[w]=_:ArrayBuffer.isView(_)?E[w]=_.slice():E[w]=_.clone(),!0;{const L=E[w];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return E[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function x(y){const A=y.uniforms;let b=0;const E=16;for(let w=0,L=A.length;w<L;w++){const R=Array.isArray(A[w])?A[w]:[A[w]];for(let P=0,O=R.length;P<O;P++){const I=R[P],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,k=U.length;z<k;z++){const ee=U[z],H=g(ee),Z=b%E,N=Z%H.boundary,Y=Z+N;b+=N,Y!==0&&E-Y<H.storage&&(b+=E-Y),I.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=H.storage}}}const _=b%E;return _>0&&(b+=E-_),y.__size=b,y.__cache={},this}function g(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",y),A}function v(y){const A=y.target;A.removeEventListener("dispose",v);const b=a.indexOf(A.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function S(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:h,update:c,dispose:S}}const hb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let di=null;function ub(){return di===null&&(di=new Yr(hb,16,16,yr,Ei),di.name="DFG_LUT",di.minFilter=Vt,di.magFilter=Vt,di.wrapS=Ni,di.wrapT=Ni,di.generateMipmaps=!1,di.needsUpdate=!0),di}class db{constructor(e={}){const{canvas:t=D1(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Un}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=p,x=new Set([bc,_c,vc]),g=new Set([Un,wi,Ds,Is,xc,Mc]),v=new Uint32Array(4),S=new Int32Array(4),y=new V;let A=null,b=null;const E=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let R=!1,P=null,O=null,I=null,U=null;this._outputColorSpace=Vn;let z=0,k=0,ee=null,H=-1,Z=null;const N=new rt,Y=new rt;let j=null;const oe=new nt(0);let he=0,xe=t.width,q=t.height,ie=1,W=null,pe=null;const ce=new rt(0,0,xe,q),Ae=new rt(0,0,xe,q);let ge=!1;const Me=new Wa;let Se=!1,Ie=!1;const He=new Bt,st=new V,Ct=new rt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Et=!1;function Lt(){return ee===null?ie:1}let X=i;function je(D,G){return t.getContext(D,G)}let Ye,F,T,B,$,te,fe,me,re,se,ve,Fe,we,_e,Be,Ve,Ze,K,be,ae,ye,Le,ue;try{const D={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uc}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",Zn,!1),X===null){const G="webgl2";if(X=je(G,D),X===null)throw je(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(D){throw t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Zn,!1),dt("WebGLRenderer: "+D.message),D}function ze(){Ye=new uv(X),Ye.init(),ye=new nb(X,Ye),F=new tv(X,Ye,e,ye),T=new eb(X,Ye),F.reversedDepthBuffer&&u&&T.buffers.depth.setReversed(!0),O=X.createFramebuffer(),I=X.createFramebuffer(),U=X.createFramebuffer(),B=new pv(X),$=new z_,te=new tb(X,Ye,T,$,F,ye,B),fe=new hv(L),me=new g2(X),Le=new jM(X,me),re=new dv(X,me,B,Le),se=new gv(X,re,me,Le,B),K=new mv(X,F,te),Be=new nv($),ve=new B_(L,fe,Ye,F,Le,Be),Fe=new lb(L,$),we=new G_,_e=new q_(Ye),Ze=new QM(L,fe,T,se,m,h),Ve=new j_(L,se,F),ue=new cb(X,B,F,T),be=new ev(X,Ye,B),ae=new fv(X,Ye,B),B.programs=ve.programs,L.capabilities=F,L.extensions=Ye,L.properties=$,L.renderLists=we,L.shadowMap=Ve,L.state=T,L.info=B}M!==Un&&(w=new Mv(M,t.width,t.height,o,r,s));const Ue=new ab(L,X);this.xr=Ue,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const D=Ye.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Ye.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(D){D!==void 0&&(ie=D,this.setSize(xe,q,!1))},this.getSize=function(D){return D.set(xe,q)},this.setSize=function(D,G,ne=!0){if(Ue.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}xe=D,q=G,t.width=Math.floor(D*ie),t.height=Math.floor(G*ie),ne===!0&&(t.style.width=D+"px",t.style.height=G+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,D,G)},this.getDrawingBufferSize=function(D){return D.set(xe*ie,q*ie).floor()},this.setDrawingBufferSize=function(D,G,ne){xe=D,q=G,ie=ne,t.width=Math.floor(D*ne),t.height=Math.floor(G*ne),this.setViewport(0,0,D,G)},this.setEffects=function(D){if(M===Un){dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let G=0;G<D.length;G++)if(D[G].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(N)},this.getViewport=function(D){return D.copy(ce)},this.setViewport=function(D,G,ne,J){D.isVector4?ce.set(D.x,D.y,D.z,D.w):ce.set(D,G,ne,J),T.viewport(N.copy(ce).multiplyScalar(ie).round())},this.getScissor=function(D){return D.copy(Ae)},this.setScissor=function(D,G,ne,J){D.isVector4?Ae.set(D.x,D.y,D.z,D.w):Ae.set(D,G,ne,J),T.scissor(Y.copy(Ae).multiplyScalar(ie).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(D){T.setScissorTest(ge=D)},this.setOpaqueSort=function(D){W=D},this.setTransparentSort=function(D){pe=D},this.getClearColor=function(D){return D.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(D=!0,G=!0,ne=!0){let J=0;if(D){let Q=!1;if(ee!==null){const Re=ee.texture.format;Q=x.has(Re)}if(Q){const Re=ee.texture.type,De=g.has(Re),Te=Ze.getClearColor(),Oe=Ze.getClearAlpha(),ke=Te.r,et=Te.g,it=Te.b;De?(v[0]=ke,v[1]=et,v[2]=it,v[3]=Oe,X.clearBufferuiv(X.COLOR,0,v)):(S[0]=ke,S[1]=et,S[2]=it,S[3]=Oe,X.clearBufferiv(X.COLOR,0,S))}else J|=X.COLOR_BUFFER_BIT}G&&(J|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(J|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&X.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),P=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Zn,!1),Ze.dispose(),we.dispose(),_e.dispose(),$.dispose(),fe.dispose(),se.dispose(),Le.dispose(),ue.dispose(),ve.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Nc),Ue.removeEventListener("sessionend",Fc),nr.stop()};function Dt(D){D.preventDefault(),ch("WebGLRenderer: Context Lost."),R=!0}function gt(){ch("WebGLRenderer: Context Restored."),R=!1;const D=B.autoReset,G=Ve.enabled,ne=Ve.autoUpdate,J=Ve.needsUpdate,Q=Ve.type;ze(),B.autoReset=D,Ve.enabled=G,Ve.autoUpdate=ne,Ve.needsUpdate=J,Ve.type=Q}function Zn(D){dt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ci(D){const G=D.target;G.removeEventListener("dispose",ci),Wd(G)}function Wd(D){Vd(D),$.remove(D)}function Vd(D){const G=$.get(D).programs;G!==void 0&&(G.forEach(function(ne){ve.releaseProgram(ne)}),D.isShaderMaterial&&ve.releaseShaderCache(D))}this.renderBufferDirect=function(D,G,ne,J,Q,Re){G===null&&(G=Nt);const De=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Te=Kd(D,G,ne,J,Q);T.setMaterial(J,De);let Oe=ne.index,ke=1;if(J.wireframe===!0){if(Oe=re.getWireframeAttribute(ne),Oe===void 0)return;ke=2}const et=ne.drawRange,it=ne.attributes.position;let Ne=et.start*ke,xt=(et.start+et.count)*ke;Re!==null&&(Ne=Math.max(Ne,Re.start*ke),xt=Math.min(xt,(Re.start+Re.count)*ke)),Oe!==null?(Ne=Math.max(Ne,0),xt=Math.min(xt,Oe.count)):it!=null&&(Ne=Math.max(Ne,0),xt=Math.min(xt,it.count));const Zt=xt-Ne;if(Zt<0||Zt===1/0)return;Le.setup(Q,J,Te,ne,Oe);let Ft,Pt=be;if(Oe!==null&&(Ft=me.get(Oe),Pt=ae,Pt.setIndex(Ft)),Q.isMesh)J.wireframe===!0?(T.setLineWidth(J.wireframeLinewidth*Lt()),Pt.setMode(X.LINES)):Pt.setMode(X.TRIANGLES);else if(Q.isLine){let gn=J.linewidth;gn===void 0&&(gn=1),T.setLineWidth(gn*Lt()),Q.isLineSegments?Pt.setMode(X.LINES):Q.isLineLoop?Pt.setMode(X.LINE_LOOP):Pt.setMode(X.LINE_STRIP)}else Q.isPoints?Pt.setMode(X.POINTS):Q.isSprite&&Pt.setMode(X.TRIANGLES);if(Q.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const gn=Q._multiDrawStarts,Pe=Q._multiDrawCounts,Sn=Q._multiDrawCount,ut=Oe?me.get(Oe).bytesPerElement:1,Gn=$.get(J).currentProgram.getUniforms();for(let hi=0;hi<Sn;hi++)Gn.setValue(X,"_gl_DrawID",hi),Pt.render(gn[hi]/ut,Pe[hi])}else if(Q.isInstancedMesh)Pt.renderInstances(Ne,Zt,Q.count);else if(ne.isInstancedBufferGeometry){const gn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Pe=Math.min(ne.instanceCount,gn);Pt.renderInstances(Ne,Zt,Pe)}else Pt.render(Ne,Zt)};function Oc(D,G,ne,J){P!==null&&D.isNodeMaterial&&P.setObject(J,D),Se===!0&&Be.setState(D,ne,!1),D.transparent===!0&&D.side===Oi&&D.forceSinglePass===!1?(D.side=Dn,D.needsUpdate=!0,Hs(D,G,J),D.side=vr,D.needsUpdate=!0,Hs(D,G,J),D.side=Oi):Hs(D,G,J)}this.compile=function(D,G,ne=null){ne===null&&(ne=D),P!==null&&P.renderStart(D,G,ne),b=_e.get(ne),b.init(G),_.push(b),ne.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),D!==ne&&D.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),Ie=this.localClippingEnabled,Se=Be.init(this.clippingPlanes,Ie),Se===!0&&Be.setGlobalState(this.clippingPlanes,G),P!==null&&Ve.render(b.state.shadowsArray,ne,G);const J=new Set;return D.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Re=Q.material;if(Re)if(Array.isArray(Re))for(let De=0;De<Re.length;De++){const Te=Re[De];Oc(Te,ne,G,Q),J.add(Te)}else Oc(Re,ne,G,Q),J.add(Re)}),b=_.pop(),P!==null&&P.renderEnd(),J},this.compileAsync=function(D,G,ne=null){const J=this.compile(D,G,ne);return new Promise(Q=>{function Re(){if(J.forEach(function(De){const Oe=$.get(De).currentProgram;(Oe===void 0||Oe.isReady())&&J.delete(De)}),J.size===0){Q(D);return}setTimeout(Re,10)}Ye.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let oo=null;function Yd(D){oo&&oo(D)}function Nc(){nr.stop()}function Fc(){nr.start()}const nr=new vd;nr.setAnimationLoop(Yd),typeof self<"u"&&nr.setContext(self),this.setAnimationLoop=function(D){oo=D,Ue.setAnimationLoop(D),D===null?nr.stop():nr.start()},Ue.addEventListener("sessionstart",Nc),Ue.addEventListener("sessionend",Fc),this.render=function(D,G){if(G!==void 0&&G.isCamera!==!0){dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(D,G);const ne=Ue.enabled===!0&&Ue.isPresenting===!0,J=w!==null&&(ee===null||ne)&&w.begin(L,ee);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(G),G=Ue.getCamera()),D.isScene===!0&&D.onBeforeRender(L,D,G,ee),b=_e.get(D,_.length),b.init(G),b.state.textureUnits=te.getTextureUnits(),_.push(b),He.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Me.setFromProjectionMatrix(He,bi,G.reversedDepth),Ie=this.localClippingEnabled,Se=Be.init(this.clippingPlanes,Ie),A=we.get(D,E.length),A.init(),E.push(A),Ue.enabled===!0&&Ue.isPresenting===!0){const De=L.xr.getDepthSensingMesh();De!==null&&lo(De,G,-1/0,L.sortObjects)}lo(D,G,0,L.sortObjects),A.finish(),P!==null&&P.updateLights(b.state.lightsArray),L.sortObjects===!0&&A.sort(W,pe),Et=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Et&&Ze.addToRenderList(A,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Se===!0&&Be.beginShadows();const Q=b.state.shadowsArray;if(Ve.render(Q,D,G),Se===!0&&Be.endShadows(),(J&&w.hasRenderPass())===!1){const De=A.opaque,Te=A.transmissive;if(b.setupLights(),G.isArrayCamera){const Oe=G.cameras;if(Te.length>0)for(let ke=0,et=Oe.length;ke<et;ke++){const it=Oe[ke];kc(De,Te,D,it)}Et&&Ze.render(D);for(let ke=0,et=Oe.length;ke<et;ke++){const it=Oe[ke];Uc(A,D,it,it.viewport)}}else Te.length>0&&kc(De,Te,D,G),Et&&Ze.render(D),Uc(A,D,G)}ee!==null&&k===0&&(te.updateMultisampleRenderTarget(ee),te.updateRenderTargetMipmap(ee)),J&&w.end(L),D.isScene===!0&&D.onAfterRender(L,D,G),Le.resetDefaultState(),H=-1,Z=null,_.pop(),_.length>0?(b=_[_.length-1],te.setTextureUnits(b.state.textureUnits),Se===!0&&Be.setGlobalState(L.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?A=E[E.length-1]:A=null,P!==null&&P.renderEnd()};function lo(D,G,ne,J){if(D.visible===!1)return;if(D.layers.test(G.layers)){if(D.isGroup)ne=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(G);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(Me)){J&&Ct.setFromMatrixPosition(D.matrixWorld).applyMatrix4(He);const De=se.update(D),Te=D.material;Te.visible&&A.push(D,De,Te,ne,Ct.z,null,G)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(Me))){const De=se.update(D),Te=D.material;if(J&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ct.copy(D.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ct.copy(De.boundingSphere.center)),Ct.applyMatrix4(D.matrixWorld).applyMatrix4(He)),Array.isArray(Te)){const Oe=De.groups;for(let ke=0,et=Oe.length;ke<et;ke++){const it=Oe[ke],Ne=Te[it.materialIndex];Ne&&Ne.visible&&A.push(D,De,Ne,ne,Ct.z,it,G)}}else Te.visible&&A.push(D,De,Te,ne,Ct.z,null,G)}}const Re=D.children;for(let De=0,Te=Re.length;De<Te;De++)lo(Re[De],G,ne,J)}function Uc(D,G,ne,J){const{opaque:Q,transmissive:Re,transparent:De}=D;b.setupLightsView(ne),Se===!0&&Be.setGlobalState(L.clippingPlanes,ne),J&&T.viewport(N.copy(J)),Q.length>0&&zs(Q,G,ne),Re.length>0&&zs(Re,G,ne),De.length>0&&zs(De,G,ne),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function kc(D,G,ne,J){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[J.id]===void 0){const Ne=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[J.id]=new qn(1,1,{generateMipmaps:!0,type:Ne?Ei:Un,minFilter:mr,samples:Math.max(4,F.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Re=b.state.transmissionRenderTarget[J.id],De=J.viewport||N;Re.setSize(De.z*L.transmissionResolutionScale,De.w*L.transmissionResolutionScale);const Te=L.getRenderTarget(),Oe=L.getActiveCubeFace(),ke=L.getActiveMipmapLevel();L.setRenderTarget(Re),L.getClearColor(oe),he=L.getClearAlpha(),he<1&&L.setClearColor(16777215,.5),L.clear(),Et&&Ze.render(ne);const et=L.toneMapping;L.toneMapping=Si;const it=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),b.setupLightsView(J),Se===!0&&Be.setGlobalState(L.clippingPlanes,J),zs(D,ne,J),te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let xt=0,Zt=G.length;xt<Zt;xt++){const Ft=G[xt],{object:Pt,geometry:gn,material:Pe,group:Sn}=Ft;if(Pe.side===Oi&&Pt.layers.test(J.layers)){const ut=Pe.side;Pe.side=Dn,Pe.needsUpdate=!0,Bc(Pt,ne,J,gn,Pe,Sn),Pe.side=ut,Pe.needsUpdate=!0,Ne=!0}}Ne===!0&&(te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re))}L.setRenderTarget(Te,Oe,ke),L.setClearColor(oe,he),it!==void 0&&(J.viewport=it),L.toneMapping=et}function zs(D,G,ne){const J=G.isScene===!0?G.overrideMaterial:null;for(let Q=0,Re=D.length;Q<Re;Q++){const De=D[Q],{object:Te,geometry:Oe,group:ke}=De;let et=De.material;et.allowOverride===!0&&J!==null&&(et=J),Te.layers.test(ne.layers)&&Bc(Te,G,ne,Oe,et,ke)}}function Bc(D,G,ne,J,Q,Re){P!==null&&Q.isNodeMaterial&&P.setObject(D,Q),D.onBeforeRender(L,G,ne,J,Q,Re),D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Q.onBeforeRender(L,G,ne,J,D,Re),Q.transparent===!0&&Q.side===Oi&&Q.forceSinglePass===!1?(Q.side=Dn,Q.needsUpdate=!0,L.renderBufferDirect(ne,G,J,Q,D,Re),Q.side=vr,Q.needsUpdate=!0,L.renderBufferDirect(ne,G,J,Q,D,Re),Q.side=Oi):L.renderBufferDirect(ne,G,J,Q,D,Re),D.onAfterRender(L,G,ne,J,Q,Re)}function Hs(D,G,ne){G.isScene!==!0&&(G=Nt);const J=$.get(D),Q=b.state.lights,Re=b.state.shadowsArray,De=Q.state.version,Te=ve.getParameters(D,Q.state,Re,G,ne,b.state.lightProbeGridArray),Oe=ve.getProgramCacheKey(Te);let ke=J.programs;J.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?G.environment:null,J.fog=G.fog;const et=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;J.envMap=fe.get(D.envMap||J.environment,et),J.envMapRotation=J.environment!==null&&D.envMap===null?G.environmentRotation:D.envMapRotation,ke===void 0&&(D.addEventListener("dispose",ci),ke=new Map,J.programs=ke);let it=ke.get(Oe);if(it!==void 0){if(J.currentProgram===it&&J.lightsStateVersion===De)return Hc(D,Te),it}else Te.uniforms=ve.getUniforms(D),P!==null&&D.isNodeMaterial&&P.build(D,ne,Te),D.onBeforeCompile(Te,L),it=ve.acquireProgram(Te,Oe),ke.set(Oe,it),J.uniforms=Te.uniforms;const Ne=J.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ne.clippingPlanes=Be.uniform),Hc(D,Te),J.needsLights=$d(D),J.lightsStateVersion=De,J.needsLights&&(Ne.ambientLightColor.value=Q.state.ambient,Ne.lightProbe.value=Q.state.probe,Ne.sunLights.value=Q.state.sun,Ne.sunLightShadows.value=Q.state.sunShadow,Ne.directionalLights.value=Q.state.directional,Ne.directionalLightShadows.value=Q.state.directionalShadow,Ne.spotLights.value=Q.state.spot,Ne.spotLightShadows.value=Q.state.spotShadow,Ne.rectAreaLights.value=Q.state.rectArea,Ne.ltc_1.value=Q.state.rectAreaLTC1,Ne.ltc_2.value=Q.state.rectAreaLTC2,Ne.pointLights.value=Q.state.point,Ne.pointLightShadows.value=Q.state.pointShadow,Ne.hemisphereLights.value=Q.state.hemi,Ne.sunShadowMatrix.value=Q.state.sunShadowMatrix,Ne.sunShadowCascade.value=Q.state.sunShadowCascade,Ne.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Ne.spotLightMatrix.value=Q.state.spotLightMatrix,Ne.spotLightMap.value=Q.state.spotLightMap,Ne.pointShadowMatrix.value=Q.state.pointShadowMatrix),J.lightProbeGrid=b.state.lightProbeGridArray.length>0,J.currentProgram=it,J.uniformsList=null,it}function zc(D){if(D.uniformsList===null){const G=D.currentProgram.getUniforms();D.uniformsList=Pa.seqWithValue(G.seq,D.uniforms)}return D.uniformsList}function Hc(D,G){const ne=$.get(D);ne.outputColorSpace=G.outputColorSpace,ne.batching=G.batching,ne.batchingColor=G.batchingColor,ne.instancing=G.instancing,ne.instancingColor=G.instancingColor,ne.instancingMorph=G.instancingMorph,ne.skinning=G.skinning,ne.morphTargets=G.morphTargets,ne.morphNormals=G.morphNormals,ne.morphColors=G.morphColors,ne.morphTargetsCount=G.morphTargetsCount,ne.numClippingPlanes=G.numClippingPlanes,ne.numIntersection=G.numClipIntersection,ne.vertexAlphas=G.vertexAlphas,ne.vertexTangents=G.vertexTangents,ne.toneMapping=G.toneMapping}function Xd(D,G){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let ne=0,J=D.length;ne<J;ne++){const Q=D[ne];if(Q.texture!==null&&Q.boundingBox.containsPoint(y))return Q}return null}function Kd(D,G,ne,J,Q){G.isScene!==!0&&(G=Nt),te.resetTextureUnits();const Re=G.fog,De=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?G.environment:null,Te=ee===null?L.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:at.workingColorSpace,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,ke=fe.get(J.envMap||De,Oe),et=J.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,it=!!ne.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ne=!!ne.morphAttributes.position,xt=!!ne.morphAttributes.normal,Zt=!!ne.morphAttributes.color;let Ft=Si;J.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ft=L.toneMapping);const Pt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,gn=Pt!==void 0?Pt.length:0,Pe=$.get(J),Sn=b.state.lights;if(Se===!0&&(Ie===!0||D!==Z)){const It=D===Z&&J.id===H;Be.setState(J,D,It)}let ut=!1;J.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Sn.state.version||Pe.outputColorSpace!==Te||Q.isBatchedMesh&&Pe.batching===!1||!Q.isBatchedMesh&&Pe.batching===!0||Q.isBatchedMesh&&Pe.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Pe.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Pe.instancing===!1||!Q.isInstancedMesh&&Pe.instancing===!0||Q.isSkinnedMesh&&Pe.skinning===!1||!Q.isSkinnedMesh&&Pe.skinning===!0||Q.isInstancedMesh&&Pe.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Pe.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Pe.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Pe.instancingMorph===!1&&Q.morphTexture!==null||Pe.envMap!==ke||J.fog===!0&&Pe.fog!==Re||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==Be.numPlanes||Pe.numIntersection!==Be.numIntersection)||Pe.vertexAlphas!==et||Pe.vertexTangents!==it||Pe.morphTargets!==Ne||Pe.morphNormals!==xt||Pe.morphColors!==Zt||Pe.toneMapping!==Ft||Pe.morphTargetsCount!==gn||!!Pe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Pe.__version=J.version);let Gn=Pe.currentProgram;ut===!0&&(Gn=Hs(J,G,Q),P&&J.isNodeMaterial&&P.onUpdateProgram(J,Gn,Pe));let hi=!1,Gi=!1,Er=!1;const At=Gn.getUniforms(),$t=Pe.uniforms;if(T.useProgram(Gn.program)&&(hi=!0,Gi=!0,Er=!0),J.id!==H&&(H=J.id,Gi=!0),Pe.needsLights){const It=Xd(b.state.lightProbeGridArray,Q);Pe.lightProbeGrid!==It&&(Pe.lightProbeGrid=It,Gi=!0)}if(hi||Z!==D){T.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),At.setValue(X,"projectionMatrix",D.projectionMatrix),At.setValue(X,"viewMatrix",D.matrixWorldInverse);const Vi=At.map.cameraPosition;Vi!==void 0&&Vi.setValue(X,st.setFromMatrixPosition(D.matrixWorld)),F.logarithmicDepthBuffer&&At.setValue(X,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&At.setValue(X,"isOrthographic",D.isOrthographicCamera===!0),Z!==D&&(Z=D,Gi=!0,Er=!0)}if(Pe.needsLights&&(Sn.state.sunShadowMap.length>0&&At.setValue(X,"sunShadowMap",Sn.state.sunShadowMap,te),Sn.state.directionalShadowMap.length>0&&At.setValue(X,"directionalShadowMap",Sn.state.directionalShadowMap,te),Sn.state.spotShadowMap.length>0&&At.setValue(X,"spotShadowMap",Sn.state.spotShadowMap,te),Sn.state.pointShadowMap.length>0&&At.setValue(X,"pointShadowMap",Sn.state.pointShadowMap,te)),Q.isSkinnedMesh){At.setOptional(X,Q,"bindMatrix"),At.setOptional(X,Q,"bindMatrixInverse");const It=Q.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),At.setValue(X,"boneTexture",It.boneTexture,te))}Q.isBatchedMesh&&(At.setOptional(X,Q,"batchingTexture"),At.setValue(X,"batchingTexture",Q._matricesTexture,te),At.setOptional(X,Q,"batchingIdTexture"),At.setValue(X,"batchingIdTexture",Q._indirectTexture,te),At.setOptional(X,Q,"batchingColorTexture"),Q._colorsTexture!==null&&At.setValue(X,"batchingColorTexture",Q._colorsTexture,te));const Wi=ne.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&K.update(Q,ne,Gn),(Gi||Pe.receiveShadow!==Q.receiveShadow)&&(Pe.receiveShadow=Q.receiveShadow,At.setValue(X,"receiveShadow",Q.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&G.environment!==null&&($t.envMapIntensity.value=G.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=ub()),Gi){if(At.setValue(X,"toneMappingExposure",L.toneMappingExposure),Pe.needsLights&&qd($t,Er),Re&&J.fog===!0&&Fe.refreshFogUniforms($t,Re),Fe.refreshMaterialUniforms($t,J,ie,q,b.state.transmissionRenderTarget[D.id]),Pe.needsLights&&Pe.lightProbeGrid){const It=Pe.lightProbeGrid;$t.probesSH.value=It.texture,$t.probesMin.value.copy(It.boundingBox.min),$t.probesMax.value.copy(It.boundingBox.max),$t.probesResolution.value.copy(It.resolution)}Pa.upload(X,zc(Pe),$t,te)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Pa.upload(X,zc(Pe),$t,te),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&At.setValue(X,"center",Q.center),At.setValue(X,"modelViewMatrix",Q.modelViewMatrix),At.setValue(X,"normalMatrix",Q.normalMatrix),At.setValue(X,"modelMatrix",Q.matrixWorld),J.uniformsGroups!==void 0){const It=J.uniformsGroups;for(let Vi=0,Ar=It.length;Vi<Ar;Vi++){const Wc=It[Vi];ue.update(Wc,Gn),ue.bind(Wc,Gn)}}return Gn}function qd(D,G){D.ambientLightColor.needsUpdate=G,D.lightProbe.needsUpdate=G,D.sunLights.needsUpdate=G,D.sunLightShadows.needsUpdate=G,D.directionalLights.needsUpdate=G,D.directionalLightShadows.needsUpdate=G,D.pointLights.needsUpdate=G,D.pointLightShadows.needsUpdate=G,D.spotLights.needsUpdate=G,D.spotLightShadows.needsUpdate=G,D.rectAreaLights.needsUpdate=G,D.hemisphereLights.needsUpdate=G}function $d(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(D,G,ne){const J=$.get(D);J.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),$.get(D.texture).__webglTexture=G,$.get(D.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ne,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,G){const ne=$.get(D);ne.__webglFramebuffer=G,ne.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(D,G=0,ne=0){ee=D,z=G,k=ne;let J=null,Q=!1,Re=!1;if(D){const Te=$.get(D);if(Te.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(X.FRAMEBUFFER,Te.__webglFramebuffer),N.copy(D.viewport),Y.copy(D.scissor),j=D.scissorTest,T.viewport(N),T.scissor(Y),T.setScissorTest(j),H=-1;return}else if(Te.__webglFramebuffer===void 0)te.setupRenderTarget(D);else if(Te.__hasExternalTextures)te.rebindTextures(D,$.get(D.texture).__webglTexture,$.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const et=D.depthTexture;if(Te.__boundDepthTexture!==et){if(et!==null&&$.has(et)&&(D.width!==et.image.width||D.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(D)}}const Oe=D.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Re=!0);const ke=$.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ke[G])?J=ke[G][ne]:J=ke[G],Q=!0):D.samples>0&&te.useMultisampledRTT(D)===!1?J=$.get(D).__webglMultisampledFramebuffer:Array.isArray(ke)?J=ke[ne]:J=ke,N.copy(D.viewport),Y.copy(D.scissor),j=D.scissorTest}else N.copy(ce).multiplyScalar(ie).floor(),Y.copy(Ae).multiplyScalar(ie).floor(),j=ge;if(ne!==0&&(J=O),T.bindFramebuffer(X.FRAMEBUFFER,J)&&T.drawBuffers(D,J),T.viewport(N),T.scissor(Y),T.setScissorTest(j),Q){const Te=$.get(D.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+G,Te.__webglTexture,ne)}else if(Re){const Te=G;for(let Oe=0;Oe<D.textures.length;Oe++){const ke=$.get(D.textures[Oe]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Oe,ke.__webglTexture,ne,Te)}}else if(D!==null&&ne!==0){const Te=$.get(D.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Te.__webglTexture,ne)}H=-1};function Gc(D){const G=$.get(D);return(G.__readFormat!==D.format||G.__readType!==D.type)&&(G.__readFormat=D.format,G.__readType=D.type,G.__formatReadable=F.textureFormatReadable(D.format),G.__typeReadable=F.textureTypeReadable(D.type)),G}this.readRenderTargetPixels=function(D,G,ne,J,Q,Re,De,Te=0){if(!(D&&D.isWebGLRenderTarget)){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&De!==void 0&&(Oe=Oe[De]),Oe){T.bindFramebuffer(X.FRAMEBUFFER,Oe);try{const ke=D.textures[Te],et=ke.format,it=ke.type;D.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Te);const Ne=Gc(ke);if(Ne.__formatReadable===!1){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ne.__typeReadable===!1){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=D.width-J&&ne>=0&&ne<=D.height-Q&&X.readPixels(G,ne,J,Q,ye.convert(et),ye.convert(it),Re)}finally{const ke=ee!==null?$.get(ee).__webglFramebuffer:null;T.bindFramebuffer(X.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(D,G,ne,J,Q,Re,De,Te=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&De!==void 0&&(Oe=Oe[De]),Oe)if(G>=0&&G<=D.width-J&&ne>=0&&ne<=D.height-Q){T.bindFramebuffer(X.FRAMEBUFFER,Oe);const ke=D.textures[Te],et=ke.format,it=ke.type;D.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Te);const Ne=Gc(ke);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const xt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,xt),X.bufferData(X.PIXEL_PACK_BUFFER,Re.byteLength,X.STREAM_READ),X.readPixels(G,ne,J,Q,ye.convert(et),ye.convert(it),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);const Zt=ee!==null?$.get(ee).__webglFramebuffer:null;T.bindFramebuffer(X.FRAMEBUFFER,Zt);const Ft=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await I1(X,Ft,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,xt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Re),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(xt),X.deleteSync(Ft),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,G=null,ne=0){const J=Math.pow(2,-ne),Q=Math.floor(D.image.width*J),Re=Math.floor(D.image.height*J),De=G!==null?G.x:0,Te=G!==null?G.y:0;te.setTexture2D(D,0),X.copyTexSubImage2D(X.TEXTURE_2D,ne,0,0,De,Te,Q,Re),T.unbindTexture()},this.copyTextureToTexture=function(D,G,ne=null,J=null,Q=0,Re=0){let De,Te,Oe,ke,et,it,Ne,xt,Zt;const Ft=D.isCompressedTexture?D.mipmaps[Re]:D.image;if(ne!==null)De=ne.max.x-ne.min.x,Te=ne.max.y-ne.min.y,Oe=ne.isBox3?ne.max.z-ne.min.z:1,ke=ne.min.x,et=ne.min.y,it=ne.isBox3?ne.min.z:0;else{const $t=Math.pow(2,-Q);De=Math.floor(Ft.width*$t),Te=Math.floor(Ft.height*$t),D.isDataArrayTexture?Oe=Ft.depth:D.isData3DTexture?Oe=Math.floor(Ft.depth*$t):Oe=1,ke=0,et=0,it=0}J!==null?(Ne=J.x,xt=J.y,Zt=J.z):(Ne=0,xt=0,Zt=0);const Pt=ye.convert(G.format),gn=ye.convert(G.type);let Pe;G.isData3DTexture?(te.setTexture3D(G,0),Pe=X.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(te.setTexture2DArray(G,0),Pe=X.TEXTURE_2D_ARRAY):(te.setTexture2D(G,0),Pe=X.TEXTURE_2D),T.activeTexture(X.TEXTURE0),T.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,G.flipY),T.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),T.pixelStorei(X.UNPACK_ALIGNMENT,G.unpackAlignment);const Sn=T.getParameter(X.UNPACK_ROW_LENGTH),ut=T.getParameter(X.UNPACK_IMAGE_HEIGHT),Gn=T.getParameter(X.UNPACK_SKIP_PIXELS),hi=T.getParameter(X.UNPACK_SKIP_ROWS),Gi=T.getParameter(X.UNPACK_SKIP_IMAGES);T.pixelStorei(X.UNPACK_ROW_LENGTH,Ft.width),T.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Ft.height),T.pixelStorei(X.UNPACK_SKIP_PIXELS,ke),T.pixelStorei(X.UNPACK_SKIP_ROWS,et),T.pixelStorei(X.UNPACK_SKIP_IMAGES,it);const Er=D.isDataArrayTexture||D.isData3DTexture,At=G.isDataArrayTexture||G.isData3DTexture;if(D.isDepthTexture){const $t=$.get(D),Wi=$.get(G),It=$.get($t.__renderTarget),Vi=$.get(Wi.__renderTarget);T.bindFramebuffer(X.READ_FRAMEBUFFER,It.__webglFramebuffer),T.bindFramebuffer(X.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Ar=0;Ar<Oe;Ar++)Er&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,$.get(D).__webglTexture,Q,it+Ar),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,$.get(G).__webglTexture,Re,Zt+Ar)),X.blitFramebuffer(ke,et,De,Te,Ne,xt,De,Te,X.DEPTH_BUFFER_BIT,X.NEAREST);T.bindFramebuffer(X.READ_FRAMEBUFFER,null),T.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(Q!==0||D.isRenderTargetTexture||$.has(D)){const $t=$.get(D),Wi=$.get(G);T.bindFramebuffer(X.READ_FRAMEBUFFER,I),T.bindFramebuffer(X.DRAW_FRAMEBUFFER,U);for(let It=0;It<Oe;It++)Er?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,$t.__webglTexture,Q,it+It):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,$t.__webglTexture,Q),At?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Wi.__webglTexture,Re,Zt+It):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Wi.__webglTexture,Re),Q!==0?X.blitFramebuffer(ke,et,De,Te,Ne,xt,De,Te,X.COLOR_BUFFER_BIT,X.NEAREST):At?X.copyTexSubImage3D(Pe,Re,Ne,xt,Zt+It,ke,et,De,Te):X.copyTexSubImage2D(Pe,Re,Ne,xt,ke,et,De,Te);T.bindFramebuffer(X.READ_FRAMEBUFFER,null),T.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else At?D.isDataTexture||D.isData3DTexture?X.texSubImage3D(Pe,Re,Ne,xt,Zt,De,Te,Oe,Pt,gn,Ft.data):G.isCompressedArrayTexture?X.compressedTexSubImage3D(Pe,Re,Ne,xt,Zt,De,Te,Oe,Pt,Ft.data):X.texSubImage3D(Pe,Re,Ne,xt,Zt,De,Te,Oe,Pt,gn,Ft):D.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Re,Ne,xt,De,Te,Pt,gn,Ft.data):D.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Re,Ne,xt,Ft.width,Ft.height,Pt,Ft.data):X.texSubImage2D(X.TEXTURE_2D,Re,Ne,xt,De,Te,Pt,gn,Ft);T.pixelStorei(X.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ut),T.pixelStorei(X.UNPACK_SKIP_PIXELS,Gn),T.pixelStorei(X.UNPACK_SKIP_ROWS,hi),T.pixelStorei(X.UNPACK_SKIP_IMAGES,Gi),Re===0&&G.generateMipmaps&&X.generateMipmap(Pe),T.unbindTexture()},this.initRenderTarget=function(D){$.get(D).__webglFramebuffer===void 0&&te.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?te.setTextureCube(D,0):D.isData3DTexture?te.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?te.setTexture2DArray(D,0):te.setTexture2D(D,0),T.unbindTexture()},this.resetState=function(){z=0,k=0,ee=null,T.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const fb=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function pb(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:le(e,.55,.42),[l.LEAF2]:le(e+.02,.5,.55),[l.LEAF3]:le(e+.04,.6,.26),[l.BODY]:le(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:le(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:le(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const ln=2.5,mb=[2.2,ln,.3],$o=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function gb(){const n=new Ke({blend:.05}),e=[],t=(b,E)=>{const _=Math.sin(b*127.1+E*311.7)*43758.5453;return _-Math.floor(_)},i=b=>{const E=Math.sin(Math.atan2(b[2],b[0])*9+b[1]*2.3);return E>.75?l.BARKD:E<-.6?l.BARKL:E>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let b=0;b<7;b++){const E=b/7*Math.PI*2+.3,_=.45,w=1.05+t(b,1)*.45;n.chain([[Math.cos(E)*_,.45,-.2+Math.sin(E)*_,.2],[Math.cos(E)*(_+w)*.55,.16,-.2+Math.sin(E)*(_+w)*.55,.13],[Math.cos(E)*w,.02,-.2+Math.sin(E)*w,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const r=(b,E=1)=>n.chain(b,l.TRUNK,{group:E,rough:.015,paint:i});r([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),r([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),r([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),r([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),r([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const s=b=>E=>{const _=t(Math.floor(E[0]*9),Math.floor(E[1]*9)+Math.floor(E[2]*9)*7);return E[1]<b[1]-.25||_<.18?l.LEAF3:_>.82?l.LEAF2:void 0};for(const[b,E]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(b,E,l.LEAF,{group:40,rough:.05,paint:s(b)});const a=[-.15,2.92,.15],o=C.norm([1,.07,0]),h=[1.25,.52,.58],c=b=>C.dot(C.sub(b,a),o),d=b=>C.dot(C.sub(b,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:b=>{const E=c(b),_=d(b),w=b[2]>a[2]+h[2]-.04;return w&&Math.hypot(E+.85,_-.02)<.15?Math.hypot(E+.85,_-.02)<.11?l.GLOW:l.FRAME:w&&E>.35&&E<.8&&_>-.42&&_<.38?_>.02&&_<.3&&E>.42&&E<.73?l.GLOW:Math.abs(E-.575)<.2&&_<-.38?l.FRAME:l.BODY2:w&&_>.06&&_<.32&&E>-.6&&E<.25?Math.abs(E+.17)<.02?l.BELLY:l.GLOW:E>h[0]-.05&&_>.05&&_<.35&&Math.abs(b[2]-a[2])<.45?l.MAGIC2:E>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(b[2]-a[2])-.38)<.08?l.FRAME:_>.02?l.BELLY:_<-.42?l.SHADES:void 0}}),e.push({at:C.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:C.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:C.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const b of[-.75,.75]){const E=C.add(C.add(a,C.mul(o,b)),[0,-.5,h[2]-.02]);n.ell(E,[.21,.21,.08],l.SHADES,{group:4,paint:_=>Math.hypot(_[0]-E[0],_[1]-E[1])<.1?l.FRAME:void 0})}n.seg(C.add(a,[1.05,.3,h[2]-.02]),C.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(C.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const f=C.add(a,[-.25,h[1]+.14,0]);n.box(f,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:b=>Math.floor((c(b)+2)*6)%2?l.BODY2:void 0}),n.box(C.add(f,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:C.norm([1,.14,0]),round:.04,group:6});for(const b of[-.18,.18])n.seg(C.add(a,[-1.33,-.45,b]),C.add(a,[-1.3,.62,b]),.02,.02,l.FRAME,{group:7});for(let b=0;b<5;b++)n.seg(C.add(a,[-1.33,-.32+b*.22,-.18]),C.add(a,[-1.33,-.32+b*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,m=1.45;n.seg(u,C.add(u,[0,m,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:b=>{const E=b[1]-u[1],_=Math.atan2(b[2]-u[2],b[0]-u[0]),w=Math.floor(E*6),L=Math.floor((_+Math.PI)*4+w%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&E>.75&&E<1.15?l.GLOW:E*6%1<.12||((_+Math.PI)*4+w%2*.5)%1<.1?l.STONED:t(w,L)<.15&&E<.5?l.MOSS:void 0}}),e.push({at:C.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let b=0;b<8;b++){const E=b/8*Math.PI*2;n.box(C.add(u,[Math.cos(E)*(p-.05),m+.1,Math.sin(E)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(E),0,Math.cos(E)],round:.02,group:9,rough:.008})}const M=C.add(u,[0,m+.1,0]),x=C.add(M,[.08,1.05,-.04]);n.seg(M,x,p-.1,.02,l.HAT1,{group:10,paint:b=>Math.floor((b[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(x,C.add(x,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(C.add(x,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:b=>b[1]>2.58?l.MOSS:void 0}),n.box(C.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(C.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const b of[-.9,.95]){const E=C.add(a,[b,-.55,0]);for(const _ of[-1,1])n.seg(C.add(E,[_*.04,-.08,h[2]+.03]),C.add(E,[_*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const g=[2.05,ln-.05,.3],v=[.85,.05,.62];n.box(g,v,l.WOOD,{round:.02,group:15,paint:b=>(b[2]-g[2]+2)*9%1<.12?l.BARKD:void 0});for(const[b,E]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([b,ln-.1,E],[b,ln-.7,E*.3],.04,.04,l.WOOD,{group:16});const S=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let b=0;b+1<S.length;b++){const[E,_]=[S[b],S[b+1]],w=Math.ceil(Math.hypot(_[0]-E[0],_[1]-E[1])/.32);n.seg([E[0],ln+.42,E[1]],[_[0],ln+.42,_[1]],.025,.025,l.WOOD,{group:17});for(let L=0;L<=w;L++){const R=L/w,P=E[0]+(_[0]-E[0])*R,O=E[1]+(_[1]-E[1])*R;n.seg([P,ln,O],[P,ln+.42,O],.02,.02,l.WOOD,{group:17})}}const y=mb;n.box([y[0],y[1]+Kr-.02,y[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0}),n.box([y[0]-.2,y[1]+Kr+.22,y[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0});for(const[b,E]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([y[0]+b,y[1],y[2]+E],[y[0]-b*.6,y[1]+Kr-.03,y[2]-E*.2],.015,.015,l.FRAME,{group:19});for(const[b,E,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([b,ln,E],[b,ln+.2*_,E],.1*_,.13*_,l.EAR,{group:20}),n.ell([b,ln+.3*_,E],[.16*_,.14*_,.16*_],l.LEAF2,{group:21,rough:.02,paint:w=>t(Math.floor(w[0]*30),Math.floor(w[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:b=>Math.floor((b[2]+2)*5)%2?l.BODY2:void 0});for(const b of[.05,.95])n.seg([1.98,3.4,b],[1.98,ln,b],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const b of[.18,.48])n.seg([1.2,ln-.05,b],[1,.06,b+.12],.018,.018,l.STRAW,{group:25});for(let b=1;b<8;b++){const E=b/8,_=ln-.05-(ln-.11)*E,w=1.2-.2*E;n.seg([w,_,.18+.12*E],[w,_,.48+.12*E],.02,.02,l.WOOD,{group:25})}const A=(b,E,_,w,L)=>{for(let R=0;R<=w;R++){const P=R/w,O=C.lerp(b,E,P);O[1]-=Math.sin(P*Math.PI)*_,L(O,R)}};return A([-.55,3.95,.45],[1.95,3.42,1],.35,9,(b,E)=>{n.ell(b,[.035,.035,.035],$o[E%4],{group:26+E%2,extra:!0})}),A([-.75,4.7,.42],[1.6,3.65,1],.2,7,(b,E)=>{n.ell(b,[.03,.03,.03],$o[(E+2)%4],{group:28+E%2,extra:!0})}),A([2.88,ln+.45,.9],[2.88,ln+.45,-.3],.08,5,(b,E)=>{n.ell(b,[.03,.03,.03],$o[(E+1)%4],{group:30+E%2,extra:!0})}),A([-2,2.8,.1],[-.9,3.6,.5],.15,5,(b,E)=>{n.box(b,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][E%3],{dir:[1,0,.2],round:.005,group:32+E%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,ln+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[y[0],y[1],y[2]],door:C.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function xb(n={},{facing:e="towards",ppm:t=16}={}){const i=gb(),r=pn(i.m,{scale:ss(n),facing:e}),s=r.sp;let a=s.w,o=-1,h=s.h;for(let M=0;M<s.h;M++)for(let x=0;x<s.w;x++)s.m[M*s.w+x]&&(a=Math.min(a,x),o=Math.max(o,x),h=Math.min(h,M));const c=new ft(o-a+1,s.h-h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=(M+h)*s.w+x+a;s.m[g]&&c.put(x,M,s.m[g],s.n[g*3],s.n[g*3+1],s.n[g*3+2])}const d=M=>{const[x,g]=r.project(M);return[+(x-a).toFixed(1),+(g-h).toFixed(1)]},f=Math.round(d([0,i.splitY,0])[1]),u=new ft(c.w,c.h),p=new ft(c.w,c.h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=M*c.w+x,v=c.m[g];v&&(fb.has(v)||M<f?u:p).put(x,M,v,c.n[g*3],c.n[g*3+1],c.n[g*3+2])}const m=M=>{const[x,g]=d(M);return{x,y:g}};return{whole:c,top:u,bot:p,crownY:f,anchors:{base:m([0,0,-.2]),seat:m(i.seat),door:m(i.door),lights:i.lights.map(M=>({...m(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const Kt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},wt=(n,e,t=0)=>Kt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),kt=(n=.2,e=.15)=>t=>{const i=wt(t,16,3);return wt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Wt=(n,e,t,i,r,s=0,a=0)=>{for(let o=0;o<e;o++){const h=Kt(r,o)*6.283,c=t*Math.sqrt(Kt(o,r));n.ell([s+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+Kt(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:d=>d[1]>.13?l.LEAF:void 0})}},Ma=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const s=r/6*6.283+e[0],a=[Math.cos(s),0,Math.sin(s)];n.chain([[...e,.03*i],[...C.add(e,C.add(C.mul(a,.25*i),[0,.2*i,0])),.025*i],[...C.add(e,C.add(C.mul(a,.5*i),[0,.05*i,0])),.01*i]],r%2?l.LEAF:l.LEAF2,{group:t})}},ii=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++)s.push([...C.add(C.lerp(e,t,a/4),[(Kt(r,a)-.5)*.12,0,.02]),.03]);n.chain(s,l.LEAF,{group:i,paint:a=>wt(a,30)<.3?l.LEAF2:void 0})},Ka=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const s=wt(r,10,2);return r[1]<e[1]-.15||s<.2?l.LEAF3:s>.8?l.LEAF2:void 0}}),Qe=(n,e,t,i,r=.025,s=l.FRAME)=>n.seg(e,t,r,r,s,{group:i,paint:kt(.35,.05)}),rs=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function Mi(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:s=[0,0,0]}={}){const a=(f,u,p,m)=>{const M=Math.cos(u),x=Math.sin(u),g=[...f];return g[p]=f[p]*M-f[m]*x,g[m]=f[p]*x+f[m]*M,g},o=f=>a(a(a(f,r,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-r,1,2),c=f=>C.add(o(f),s),d=f=>h(C.sub(f,s));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(o)),f.paint){const u=f.paint;f.paint=(p,m)=>u(d(p),m)}}function Zo(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:s=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=kt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?r?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?wt(h,9)<.25?l.STONED:l.SHADES:kt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,s?.22:.3,.1],l.BODY3,{group:e+1,paint:d=>Math.hypot(d[0]-h,d[1]-.3)<.12?l.FRAME:void 0});if(r)for(const h of[-.45,.45])rs(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const Mb={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Zo(n,1),Mi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),Ma(n,[.9,.2,.8],5),Ma(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Zo(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),Ka(n,[.3,3.4,-.1],[1.1,.7,.9],5),ii(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Wt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Zo(n,1),Mi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])Ma(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;iu(n,1),Ka(n,[.05,.65,0],[.32,.28,.26],3),Mi(n,e,{roll:1.35,at:[0,.32,0]}),Wt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){iu(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Wt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Ss(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Ss(n,[0,0,0],1),Ss(n,[.5,0,.2],4);const e=n.parts.length;Ss(n,[0,0,0],7),Mi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Wt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Ss(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,C.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(C.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>wt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?wt(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&wt(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])Qe(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:kt(.5,.1)(t)}),Mi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Wt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>wt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?wt(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:wt(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Wt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Qe(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:kt(.2,.1)(e)}}),Wt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:kt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:kt(.3,.3)}),ii(n,[.43,0,.3],[.4,1.9,.43],3,8),ii(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Wt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:kt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),ii(n,[0,0,.06],[.05,1.5,.06],3,10),Wt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>wt(t,6,5)<.25&&t[1]>.4?l.MOSS:wt(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Wt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:kt(.25,.15)(e)}),Ma(n,[0,.4,.4],2,.55),Wt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;Qe(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Qe(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),Qe(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:kt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),Qe(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(C.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(C.add(e,[.14,.07,0]),C.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Wt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:kt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:kt(.25,.15)});for(let e=0;e<7;e++)rs(n,[(Kt(e)-.5)*.4,.4+Kt(e,2)*1,.2+Kt(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);ii(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function iu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Qe(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;Qe(n,C.lerp(t[0],t[1],r),C.lerp(t[4],t[5],r),e,.008),Qe(n,C.lerp(t[3],t[2],r),C.lerp(t[7],t[6],r),e,.008)}Qe(n,t[4],[-.45,.95,-.28],e,.015),Qe(n,t[7],[-.45,.95,.28],e,.015),Qe(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Qe(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],l.BODY3,{group:e+1})}function Ss(n,e,t,i=!1){n.box(C.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:kt(.15,.2)}),n.seg(C.add(e,[0,.05,0]),C.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&wt(r,18)<.2?l.GLOW:kt(.15,.1)(r)}),i&&rs(n,C.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const vb={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Qe(n,[e,0,t],[e*.95,2.1,0],1,.045);Qe(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Qe(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)rs(n,[-.42+(Kt(e)-.5)*.5,.6+Kt(e,2)*.7,(Kt(e,3)-.5)*.3],.025,10+e);Qe(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Qe(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),ii(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Wt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Qe(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Qe(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:kt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:kt(.35,.15)(e)});for(let e=0;e<10;e++){const t=Kt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Kt(e)*.5,Math.sin(t)*.3,.025],[.1+Kt(e,4)*.6,.7+Kt(e,5)*.4,(Kt(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Kt(e,7)*.6,.5+Kt(e,8)*.4,(Kt(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>wt(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),Ka(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:kt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Qe(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Qe(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Mi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Wt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:kt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>wt(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])Qe(n,[t,.03,-.12],[t,.03,.12],3,.02);Mi(n,e,{pitch:.32,at:[0,.42,0]}),Wt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const s=i/8*6.283,a=r/4*Math.PI/2;return[Math.cos(s)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(s)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)Qe(n,t(i,r),t(i,r+1),1,.025),Qe(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)ii(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Wt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:kt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:kt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),Qe(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Wt(n,8,.8,6,19)}}},_b=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function bb(n,e,t,i,r,s=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:s,paint:a=>wt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?wt(a,18)<.5?l.LEAF2:l.STONED:r(a[0],a[2])?wt(a,10,2)<.25?i:l.CLOTH:wt(a,5,7)<.07?l.MOSS:void 0})}const ei=(n,e,t=.045)=>Math.abs(n-e)<t,yb={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){bb(n,4.4+.5,2+.5,l.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(ei(Math.abs(i),4.4)||ei(Math.abs(r),2)||ei(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(ei(r,0)||ei(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Qe(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Qe(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Qe(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Mi(n,e,{roll:.25,pitch:-.1}),Wt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Qe(n,[e,0,0],[e,1.7,0],1,.03);Qe(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?wt(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)ii(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)rs(n,[(Kt(e)-.5)*1.2,.06,(Kt(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Wt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?wt(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?wt(t,6)<.15?l.MOSS:void 0:wt(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:r=>wt(r,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Qe(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],s=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=C.lerp(r,s,.5);n.box(a,[Math.hypot(s[0]-r[0],s[2]-r[2])/2,.9,.008],l.FRAME,{dir:C.sub(s,r),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?wt(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});ii(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Qe(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Kt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:kt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),ii(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],s=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(s)<=3.3+.05&&(ei(Math.abs(r),5.2,.06)||ei(Math.abs(s),3.3,.06)||ei(r,0,.06)||ei(Math.hypot(r,s*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(s)<1.6&&(ei(Math.abs(r),5.2-1,.06)||ei(Math.abs(s),1.6,.06)))?wt(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((r+20)*.8)%2?wt(i,6)<.25?l.LEAF2:l.LEAF:wt(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){ru(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),Ka(n,[.3,1.6,.2],[.35,.25,.3],6),Wt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;ru(n,1),Mi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Wt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Qe(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:kt(.2,0)}),Wt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Qe(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;Qe(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),Qe(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:kt(.4,.1)(r)});rs(n,[0,4+.45,.22],.06,4,l.MAGIC2),ii(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Qe(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:kt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;Qe(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,l.ACCENT)}Mi(n,e,{pitch:-.2}),Wt(n,8,1,5,31)}}};function ru(n,e){for(const t of[-1.4,1.4])Qe(n,[0,0,t],[0,1,t],e,.035,l.BELLY);Qe(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])Qe(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const Sb={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function wb(n={},e=16){const t=r=>ss(n)*Rd[r].size/e,i=r=>r.map(([s,a,o])=>({id:s,x:+(a*t(s)).toFixed(1),z:+(o*t(s)).toFixed(1)}));return{playground:i(_b),...Object.fromEntries(Object.entries(Sb).map(([r,s])=>[r,i(s)]))}}const Td=[...Object.entries(Mb).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(vb).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(yb).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],Rd=Object.fromEntries(Td.map(n=>[n.id,n]));function Eb(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.BODY]:[92,118,140],[l.BODY2]:[132,74,42],[l.BODY3]:[34,32,38],[l.FRAME]:[150,152,158],[l.SHADES]:[24,24,30],[l.STONE]:[72,72,80],[l.STONED]:[34,34,40],[l.CLOTH]:[214,210,196],[l.BELLY]:[222,218,206],[l.ACCENT]:[214,92,40],[l.HAT1]:[54,84,120],[l.HAT2]:[86,112,92],[l.MOSS]:le(.26,.45,.45),[l.TRUNK]:le(t,.45,.36),[l.BARK2]:[98,74,52],[l.BARKD]:le(t+.03,.5,.17),[l.LEAF]:le(e,.55,.45),[l.LEAF2]:le(e-.03,.5,.6),[l.LEAF3]:le(e+.03,.6,.28),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,170,80],[l.MAGIC]:le(n.magicHue??.2,.55,1),[l.MAGIC2]:le(n.magicHue??.2,.15,1),[l.LINE]:[24,22,30]}}function Ab(n,e={},{ppm:t=16}={}){const i=Rd[n];if(!i)throw new Error(`no relic "${n}"`);const r=new Ke({blend:.04});i.build(r),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const s=ss(e)*i.size,{sp:a,project:o}=pn(r,{scale:s});let h=0;for(const E of r.parts){if(E.extra||E.cut)continue;const _=E.type==="cone"?[[E.a,E.r1],[E.b,E.r2]]:[[E.c,E.r?Math.max(...E.r):Math.max(E.h[0],E.h[2])]];for(const[w,L]of _)w[1]-L<.3&&(h=Math.max(h,Math.hypot(w[0],w[2])+L))}let c=a.w,d=-1,f=a.h;for(let E=0;E<a.h;E++)for(let _=0;_<a.w;_++)a.m[E*a.w+_]&&(c=Math.min(c,_),d=Math.max(d,_),f=Math.min(f,E));const u=d-c+1,p=a.h-f,m=new ft(u,p),M=new ft(u,p),x=new ft(u,p),g=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-f);for(let E=0;E<p;E++)for(let _=0;_<u;_++){const w=(E+f)*a.w+_+c,L=a.m[w];if(!L)continue;const R=[a.n[w*3],a.n[w*3+1],a.n[w*3+2]];m.put(_,E,L,...R),(E<g?M:x).put(_,E,L,...R)}m.bodyH=a.bodyH;const v=s/t,[S,y]=o([0,0,0]),A=+(S-c).toFixed(1),b=+(y-f).toFixed(1);return{whole:m,top:M,bot:x,crownY:g,origin:{x:A,y:b},metres:{width:+(u/t).toFixed(1),height:+(p/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},ai=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ql=n=>{const e=ai(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Tb=n=>e=>{const t=ai(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},vn=(n,e=0)=>t=>{const i=ai(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&ai(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},pt=(n,e,t,i,r,s={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:vn(r,s.courses??5),...s}),Cn=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++){const o=a/4;s.push([...C.add(C.lerp(e,t,o),[(Gt(r,a)-.5)*.15,0,.02]),.03])}n.chain(s,l.LEAF,{group:i,rough:.02,paint:a=>ai(a,30)<.3?l.LEAF2:void 0})},Ii=(n,e,t,i,r)=>{for(let s=0;s<e;s++){const a=Gt(r,s)*6.283,o=t*Math.sqrt(Gt(s,r)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+Gt(s,4)*.08,.07],l.LEAF2,{group:i+s%3,paint:d=>d[1]>.14?l.LEAF:void 0})}},gi=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Tb(e)}),Nn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Ql}),Ln=(n,e,t,i,r={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:r.dir,paint:s=>s[1]>e[1]+t[1]*(r.moss??.62)&&ai(s,5,i)<.7?l.MOSS:ai(s,14)>.9?l.STONED:void 0}),su=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),Rb={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])pt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];pt(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(s=>Math.abs(s[0]-r[0])<.05&&Math.abs(s[1]-r[1])<.08?l.RUNE:vn(e)(s)):vn(e)})}for(let t=0;t<4;t++)pt(n,[1.3+t*.3,.14,.4+Gt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Gt(t,2)-.5),Gt(t,3)-.5],courses:0});e&&(Cn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ii(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||pt(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;pt(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)pt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Cn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Cn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){pt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?l.STONED:vn(e,0)(r)}),pt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,l.STONE,{group:4,paint:vn(e,0)});pt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Cn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ii(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Gt(t,9)*(t%3===0?1.2:.45);pt(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Gt(t)-.5),Math.cos(i)],courses:0,round:.07})}pt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ii(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){pt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:vn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>ai(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])pt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)pt(n,[-1.2+t*.6,.12,.55+Gt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Cn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Cn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;pt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)su(n,[(Gt(t)-.5)*.8,.8+Gt(t,2)*.7,(Gt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(Cn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ii(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){pt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:vn(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])pt(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)pt(n,[.5+Gt(t)*1.2,.13,-.3+Gt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Cn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Cn(n,[.3,.1,.72],[.5,1.8,.72],5,13),gi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])pt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)pt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),pt(n,[-1.1,.55,0],[.15,.55,.62],4,e),pt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ii(n,12,1.6,10,14),Cn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(s,a)=>[t[0]+a,t[1]+s,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:vn(e,0)}),n.ell(r(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:vn(e,0)});for(const s of[-.26,.26])n.ell(r(.12,s),[.15,.09,.1],l.STONED,{group:1,cut:!0}),su(n,r(.12,s),.05,3+(s>0?1:0),l.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:vn(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:s=>Math.abs(s[1]-(t[1]-.42))<.015?l.STONED:vn(e,0)(s)});for(const[s,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+s,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:vn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:vn(e,0)}),e&&(Ii(n,14,1.8,10,16),gi(n,C.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){pt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,r,s,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])pt(n,[t,s/2,i],a?[.12,s/2,.7]:[r,s/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(Cn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ii(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){pt(n,[-.9,.7,0],[.35,.7,.5],1,e),pt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),s=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];pt(n,s,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}pt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])pt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Cn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ii(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])pt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:vn(e,5)(i)):vn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:vn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)pt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Cn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Cn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ii(n,12,1.6,10,23))}}},Cb={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Ln(n,[(Gt(e)-.5)*.6,.04,(Gt(e,2)-.5)*.4],[.07+Gt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Ln(n,[-.15,.12,0],[.22,.15,.2],1),Ln(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Ln(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Ln(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Ln(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),gi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Ln(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Ln(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Ln(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Ln(n,[-1.1,.3,.6],[.4,.35,.35],2),Ln(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&ai(e,6)<.3?l.MOSS:ai(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Ln(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Ln(n,[.35,.1,.25],[.15,.1,.14],2)}}},Lb={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}Nn(n,e,1),gi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Nn(n,e,1),gi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Nn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Nn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Nn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),gi(n,[-1,2.7,0],[.6,.45,.5],4),gi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:Ql(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),gi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Nn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:ai(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Nn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Nn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Gt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Gt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Nn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Nn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Nn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Ln(n,[e,i,t],[.3,.24,.26],3);gi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:Ql})}Nn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Nn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])gi(n,[e,t,-.1],[.45,.3,.35],3)}}},Cd=[...Object.entries(Rb).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(Cb).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(Lb).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],Pb=Object.fromEntries(Cd.map(n=>[n.id,n]));function Db(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,r=s=>s.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:r([128,126,134]),[l.STONED]:r([64,62,72]),[l.MOSS]:le(.26,.45,.45),[l.TRUNK]:le(i,.45,.36),[l.BARKD]:le(i+.03,.5,.17),[l.BARKL]:le(i,.35,.55),[l.LEAF]:le(t,.55,.45),[l.LEAF2]:le(t-.03,.5,.62),[l.LEAF3]:le(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:le(n.magicHue??.45,.6,1),[l.MAGIC2]:le(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function Ib(n,e={},{variant:t=0,ppm:i=16}={}){const r=Pb[n];if(!r)throw new Error(`no decoration "${n}"`);const s=new Ke({blend:.05});r.build(s,t%r.variants),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=ss(e)*r.size,{sp:o,project:h}=pn(s,{scale:a});let c=0;for(const y of s.parts){if(y.extra)continue;const A=y.type==="cone"?[[y.a,y.r1],[y.b,y.r2]]:[[y.c,y.r?Math.max(...y.r):Math.max(y.h[0],y.h[2])]];for(const[b,E]of A)b[1]-E<.3&&(c=Math.max(c,Math.hypot(b[0],b[2])+E))}let d=o.w,f=-1,u=o.h;for(let y=0;y<o.h;y++)for(let A=0;A<o.w;A++)o.m[y*o.w+A]&&(d=Math.min(d,A),f=Math.max(f,A),u=Math.min(u,y));const p=f-d+1,m=o.h-u,M=new ft(p,m),x=new ft(p,m),g=new ft(p,m),v=r.split==null?0:Math.max(0,Math.round(h([0,r.split,0])[1])-u);for(let y=0;y<m;y++)for(let A=0;A<p;A++){const b=(y+u)*o.w+A+d,E=o.m[b];if(!E)continue;const _=[o.n[b*3],o.n[b*3+1],o.n[b*3+2]];M.put(A,y,E,..._),(y<v?x:g).put(A,y,E,..._)}const S=a/i;return{whole:M,top:x,bot:g,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(m/i).toFixed(1),footprint:+(c*S).toFixed(1)}}}const fi=16,cn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Jo=[0,-.42,.9],en=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const r=n*t,s=e*t,a=Math.floor(r),o=Math.floor(s),h=r-a,c=s-o,d=i?Math.round(i*t):0,f=m=>d?(m%d+d)%d:m,u=(m,M)=>cn(m,f(M)),p=m=>m*m*(3-2*m);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function au(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const r=n*t,s=e*t,a=Math.floor(r),o=Math.floor(s),h=Math.round(i*t);let c=9,d=9,f=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=a+p,M=o+u,x=(M%h+h)%h,g=m+cn(m,x*3+1),v=M+cn(m*7+2,x),S=Math.hypot(g-r,v-s);S<c?(d=c,c=S,f=cn(m,x)):S<d&&(d=S)}return{edge:d-c,id:f}}const cr=(n,e,t,i=.14)=>Math.abs(n)>1-i*en(n>0?3:7,e,1.4,t)*1.6,Lc={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(cr(n,e,4,.3))return 0;const i=en(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const r=Math.abs(Math.abs(n)-.45)<.1+i*.05;return r&&en(n*2,e,.9,4)>.68?[l.WATER,0]:[r?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(cr(n,e,4,.5))return 0;const i=en(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(cr(n,e,4,.1))return 0;const i=au(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:en(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(cr(n,e,4,.08))return 0;const i=au(n*2,e,2.2,4);return i.edge<.16?[en(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,r=Math.floor(e/i),s=e-r*i-i/2,a=n*1-(cn(r%3,9)-.5)*.5,o=Math.hypot(a*.9,s/.55);return o>.55+en(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),r=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(cn(i%8,3)<.1||r<.1)return 0;const s=Math.abs(Math.sin(n*40+i%8*3))<.12;return[en(n,e,3,4)<.15?l.MOSS:s?l.BARKD:cn(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(cr(n,e,8,.06))return 0;const r=en(n*4,e,1.1,8);return Math.abs(en(n*6,e,.7,8)-.5)<.02||Math.abs(en(n*3+9,e,1.6,8)-.5)<.012?[en(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[r<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&r>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&r>.35?[l.BELLY,.05]:[r<.2?l.MOSS:r>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const s=en(n*3,e,2.5,4),a=[0,.35,.6][i];if(cr(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[en(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&en(n,e,6,4)>a*.8?[cn(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:s<a?[s<a*.5?l.LEAF:l.LEAF2,.1]:[s>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(cr(n,e,4,.25))return 0;const i=Math.floor(e/.8),r=Math.sin(n*3+i%5*2)*.12,s=e/.8-i+r;return Math.abs(s-.5)<.14+en(n,e,3,4)*.06?[Math.abs(s-.5)<.05?l.BARKL:l.TRUNK,.6]:[en(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),r=i%2?1:-1,s=e-i-.5,a=Math.hypot((n-r*.8)*2.2,s*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&en(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function Qo(n,e,t){const i=new ft(n,e);for(let r=0;r<e;r++)for(let s=0;s<n;s++){const a=t(s+.5,r+.5);a&&i.px(s,r,a[0],Jo[0]+(a[1]?(cn(s,r)-.5)*a[1]:0),Jo[1]+(a[1]?(cn(r,s)-.5)*a[1]*.5:0),Jo[2])}return i}function Ob(n,{variant:e=0}={}){const t=Lc[n],i=Math.round(t.width*fi),r=Math.round(t.period*fi);t.width/2;const s=(u,p,m)=>t.surface(u,p,m,e),a=Qo(i,r,(u,p)=>s(u/i*2-1,p/fi)),o=Math.round(Math.max(1.5,t.width*.8)*fi),h=Qo(i,o,(u,p)=>{const m=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(m));return Math.abs(M)>1||en(u/fi,p/fi,2)>.25+m?0:s(M,p/fi)}),c=Math.round(t.width*2.4*fi),d=c/2,f=u=>Qo(c,c,(p,m)=>{let M=null;for(const x of u){const g=Math.cos(x),v=Math.sin(x),S=(p-d)*g+(m-d)*v,y=-(p-d)*v+(m-d)*g;if(S<-t.width*fi*.5)continue;const A=y/(i/2);Math.abs(A)<=1&&(!M||Math.abs(A)<Math.abs(M.u))&&(M={u:A,v:(d-S)/fi})}return M?s(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-d,m-d)<i*.6):0});return{strip:a,end:h,y:f([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:f([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}const fn=(n,e,t=0)=>cn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),mi=(n=.25,e=.15)=>t=>{const i=fn(t,16,3);return fn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},pi=(n,e,t,i,r=.025,s=l.FRAME)=>n.seg(e,t,r,r,s,{group:i,paint:mi(.4,.05)}),ou=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&fn(r,5,i)<.6?l.MOSS:fn(r,14)>.9?l.STONED:void 0}),hr=(n,e,t,i,r)=>{for(let s=0;s<e;s++){const a=cn(r,s)*6.283,o=t*Math.sqrt(cn(s,r));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+cn(s,4)*.08,.07],l.LEAF2,{group:i+s%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},jo=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const s=fn(r,10,2);return r[1]<e[1]-.15||s<.2?l.LEAF3:s>.8?l.LEAF2:void 0}}),va=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++)s.push([...C.add(C.lerp(e,t,a/4),[(cn(r,a)-.5)*.12,0,.02]),.03]);n.chain(s,l.LEAF,{group:i,paint:a=>fn(a,30)<.3?l.LEAF2:void 0})};function lu(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const s=(d,f,u,p)=>{const m=Math.cos(f),M=Math.sin(f),x=[...d];return x[u]=d[u]*m-d[p]*M,x[p]=d[u]*M+d[p]*m,x},a=d=>s(s(d,i,1,2),t,0,1),o=d=>s(s(d,-t,0,1),-i,1,2),h=d=>C.add(a(d),r),c=d=>o(C.sub(d,r));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(a)),d.paint){const f=d.paint;d.paint=(u,p)=>f(c(u),p)}}const Nb={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:mi(.1,.2)(t)}),lu(n,e,{roll:.15,pitch:.1}),hr(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){ou(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),jo(n,[0,.95,0],[.22,.18,.2],2),hr(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(cn(e)-.5)*.3,0,(cn(e,2)-.5)*.2],i=.08+cn(e,3)*.1;n.seg(t,C.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(C.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){pi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:mi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),va(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&fn(t,6,e)<.35?l.MOSS:fn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])ou(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>fn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>fn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>fn(t,12)<.12?l.BARKD:t[1]>.55&&fn(t,5)<.3?l.MOSS:void 0});jo(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:r=>fn(r,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const s=-1.6+r*.4,a=(t?1.05:.55)-(1-(s/1.6)**2)*(t?.25:.3);i.push([s,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:mi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?l.FRAME:void 0});lu(n,e,{roll:1.4,at:[0,.3,.3]}),hr(n,14,2.2,4,5),va(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?fn(e,9)<.2?l.SHADES:l.GLOW:mi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>fn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),jo(n,[.7,3.1,-.1],[1,.6,.8],5),hr(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&fn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});pi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),va(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),hr(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:mi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:mi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:mi(.3,.15)(e)}),pi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});hr(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])pi(n,[-.2,0,e],[0,.75,e],1,.05),pi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:mi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:mi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>fn(t,9)<.3?l.MOSS:void 0});hr(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])pi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;pi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),pi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])pi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])pi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});va(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},Ld=Object.entries(Nb).map(([n,e])=>({id:n,...e})),Fb=Object.fromEntries(Ld.map(n=>[n.id,n]));function Pd(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:le(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:le(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:le(t,.35,.55),[l.TRUNK]:le(t,.45,.36),[l.LEAF]:le(e,.55,.45),[l.LEAF2]:le(e-.03,.5,.6),[l.LEAF3]:le(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:le(n.magicHue??.5,.55,1),[l.MAGIC2]:le(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function Ub(n,e={},t=16){const i=Fb[n];if(!i)throw new Error(`no path piece "${n}"`);const r=new Ke({blend:.04});i.build(r),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const s=ss(e)*1.1,a=pn(r,{scale:s}),o=a.sp;let h=o.w,c=-1,d=o.h;for(let m=0;m<o.h;m++)for(let M=0;M<o.w;M++)o.m[m*o.w+M]&&(h=Math.min(h,M),c=Math.max(c,M),d=Math.min(d,m));const f=new ft(c-h+1,o.h-d);for(let m=0;m<f.h;m++)for(let M=0;M<f.w;M++){const x=(m+d)*o.w+M+h;o.m[x]&&f.put(M,m,o.m[x],o.n[x*3],o.n[x*3+1],o.n[x*3+2])}const[u,p]=a.project([0,0,0]);return{sp:f,origin:{x:+(u-h).toFixed(1),y:+(p-d).toFixed(1)},metres:{width:+(f.w/t).toFixed(1),height:+(f.h/t).toFixed(1)}}}function kb(){const n={};for(const[e,t]of Object.entries(Lc))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const qa=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],Bb={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function zb(n=0){const[e,t,i]=Bb[qa[n%qa.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function cu(n,e,t,i){const r=qa[n%qa.length],s=new Ke({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&ht(_,e,31)<.5;let c=0,d=1,f=.3,u=0,p=n*7;const m=(_,w,L,R)=>P=>{if(R&&Math.abs(Math.sin(P[0]*37+P[1]*23+Math.sin(P[2]*17)*2))<.07)return l.STONED;if(P[1]>_-.02&&(P[2]>w-.06||ht(Math.floor(P[0]*30),Math.floor(P[2]*30),L)<.2)&&ht(Math.floor(P[0]*40),Math.floor(P[2]*40),L+1)<.6)return l.MOSS},M=(_,w,L,R,P,O)=>{const I=h(O),U=1+o*.08;s.ell([_,w,L],[R*1.18,R*1.18,.06],l.STONED,{group:P,cut:!0}),s.ell([_,w,L-.02],[R*U,R*U,.035+o*.025],l.CRYSTAL,{group:900+O,paint:z=>{const k=Math.hypot(z[0]-_,z[1]-w)/(R*U);return I?k<.3?l.GLOW:l.CRYSTAL:k<.2+o*.15?l.MAGIC2:k<.5?l.GLOW:k<.78?l.CRYSTAL:l.GLOW}})},x=(_,w,L,R,P,O,I,U)=>z=>{if(z[0]>_+R-.022){const k=Math.min(L,P)*1.5,ee=(O-P-z[2])/k+.5,H=(w-z[1])/k+.5;if(ee>=0&&ee<=1&&H>=0&&H<=1&&(i?l0(i,ee,H,.065):_u(ee,H,I,.12)))return a&&ht(I,e,5)<.5?l.STONED:l.RUNE}return U(z)},g=r.tiers,v=g[0][1]*g[0][2][0]+.02,S=.08,y=g[0][2][2];s.box([0,S,f-y],[v,S,y],l.STONE,{group:d,round:.03,rough:.006,paint:m(S*2,f,3,a)}),s.box([0,S*.9,f],[v-.06,S*.45,.12],l.STONED,{group:d,cut:!0,paint:_=>_[2]<f-.07?l.GLOW:void 0});for(let _=1;_<g[0][1];_++)s.box([-v+_*v*2/g[0][1],S*.9,f-.06],[.015,S*.45,.06],l.STONE,{group:d});c=S*2,d++;const A=[];g.forEach(([_,w,[L,R,P]],O)=>{const I=_==="tweet"?.09:0,U=w*L*2+(w-1)*(_==="tweet"?.14:.01),z=f-O*.035,k=c+I+R;for(let ee=0;ee<w;ee++){const H=-U/2+L+ee*(L*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&ee===w-1){A.push([H,L,R,P]);continue}const Z=a&&_==="tweet"?[1,.12*(ee%2?1:-1),0]:void 0,N=a&&_==="tweet"?k-.04:k,Y=m(N+R,z-P+P,d,a),j=ee===w-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(s.box([H,N,z-P],[L-.005,R,P],l.STONE,{group:d,round:.035,rough:.004,dir:Z,paint:j?x(H,N,R,L-.005,P,z,p++,Y):Y}),_==="bass"&&M(H,k+.02,z,Math.min(L,R)*.72,d,u++),_==="mid"&&(s.ell([H,k,z],[L*.8,R*.7,P*.9],l.STONED,{group:d,cut:!0,paint:oe=>oe[2]<z-P*.45?h(u)?l.STONED:l.GLOW:void 0}),s.box([H,k,z-P*.5],[.018,R*.6,P*.45],l.STONE,{group:d}),u++),_==="horn"){const oe=k+R*.25;s.seg([H,oe,z-P*1.5],[H,oe,z+.03],.03,Math.min(L,R)*.78,l.STONED,{group:d,cut:!0,paint:he=>he[2]<z-P*.55?h(u)?l.STONED:l.GLOW:void 0}),M(H,k-R*.6,z,R*.22,d,u++)}if(_==="tweet")for(const oe of[-.5,0,.5])M(H+oe*L*1.15,N,z,R*.55,d,u++);d++}if(_!=="tweet"){const ee=a&&_==="horn"?L:0;s.box([-ee,c+R*2+.012,z-.015],[U/2+.01-ee,.012,.015],l.WOOD,{group:d++,round:.008}),c+=.024}_==="tweet"&&!a&&s.flat([0,c+I/2,z-P],[1,0,0],[0,1,0],U/2,I/2,(ee,H)=>Math.abs(H)<.45&&Math.sin(ee*23)>-.4?l.GLOW:null,{group:d++,bend:0}),c+=R*2+I});const b=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,w,L,R],P)=>{if(a&&P%2){s.seg([_,.03,w],[_+.12,.05,w+.04],.04,.02,l.CRYSTAL,{group:700+P});return}const O=[_+R*L,L,w+.05];s.seg([_,0,w],O,.045+L*.05,.006,l.CRYSTAL,{group:700+P,paint:I=>I[1]>L*(.65-o*.1)&&!a?l.GLOW:void 0}),s.seg([_+.04,0,w-.03],[_+.04+R*L*.5,L*.55,w],.03,.005,l.CRYSTAL,{group:720+P})}),!a)for(const[_,w,L,R]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([_,b+w-.1,L],[R,R*.8,R],l.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,w,L,R]of A)s.box([_+.45,w*.75,f+.25],[w,L,R],l.STONE,{group:d++,dir:[.6,.8,.2],round:.035,rough:.007,paint:m(1,0,9,!0)});return{m:s,top:b}}function Hb(n){const e=new Ke({blend:.02}),t=(i,r)=>ht(i,r,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const r=i*2.4,s=.15+t(i,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-s)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(r*1.7),.4+t(i,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:d=>Math.abs(Math.sin(d[0]*41+d[1]*29))<.08?l.STONED:d[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const r=i*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const r=-.7+i*.45;e.seg([r,0,.4-i*.1],[r+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function hu(n,e,t){let i=0;for(let r=0;r<2e3&&i<e;r++){const s=Math.floor(ht(r,t,1)*n.w),a=Math.floor(ht(r,t,2)*n.h*.7);n.get(s,a)||n.get(s+1,a)||n.get(s-1,a)||n.get(s,a+1)||n.get(s,a-1)||n.get(s,a+2)||(n.px(s,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const Gb=n=>tc(n)*3,el=new Map;function Wb(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:r}={}){const s=Gb(n),a=e+":"+s;el.has(a)||el.set(a,pn(cu(e,0,"playing").m,{height:s}).s);const o=el.get(a);if(i==="destroyed")return hu(pn(Hb(e),{scale:o}).sp,3,e*5+1);const{sp:h}=pn(cu(e,t,i,r).m,{scale:o});return hu(h,i==="damaged"?4:10+t*2,e*5+t)}const Vb=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function Yb(){const n={};return Vb.forEach(e=>n[e.k]=e.v),n}function Xb(n,e,t,i,r){const s=lc(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(i,a,t.treeSize*r*(e.scale||1)*de(i,.9,1.1)),h=eo(i,a,s);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=le(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:Ou(o),colours:h}}function Kb(n,e,t,i,r){const s=Xt[t].id,a=Fs.find(x=>x.id===s),o=k0(s,n,{K:i,makeCanvas:r}),h=[],c=x=>h.push(x)-1,d={big:[],bigWeight:[],small:[],walls:[],set:null},f=(x,g)=>En(x,g,n,"none",r),u=(x,g)=>{const{parts:v,colours:S}=Xb(a,x,n,ki(e*13+t*101+g*7+1),i);return{bot:c(f(v.bot,S)),top:c(f(v.top,S))}},p=H0(s,n,{K:i,makeCanvas:r}),m=Xt[t].layout.heightMix,M=x=>p.filter(g=>g.heightClass===x).length||1;for(const x of p)d.big.push({bot:c(x.bot),top:c(x.top)}),d.bigWeight.push(m?m[x.heightClass]/M(x.heightClass):x.weight);a.big.forEach(([x],g)=>{x==="tree"&&p.length||(d.big.push({bot:c(o.big[g].sp),top:null}),d.bigWeight.push(p.length?.1:1))}),a.small.forEach(([x,g],v)=>d.small.push(x==="tree"?u(g,500+v):{bot:c(o.small[v].sp),top:null}));for(const x of o.walls)d.walls.push(c(x.sp));return o.setPiece&&(d.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null}),{sprites:h,layout:d,floor:o.floor.sp}}function uu(n,e,t,i=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(En($f(e,a,o,n,s,i),Xf(e,n,i),n,n.cOutline,t));return r}const qb=(n,e,t=!1)=>(t?8:0)+n*2+e;function $a(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function fr(n,e=2048){const i=[];let r=0,s=0,a=0,o=1;for(const u of n)r+u.w+1>e&&(r=0,s+=a+1,a=0),i.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,r);const h=Math.max(1,s+a),c=new Uint8Array(o*h*4),d=new Uint8Array(o*h*4),f=n.map((u,p)=>{const m=i[p],M=$a(u.A,u.w,u.h),x=$a(u.N,u.w,u.h);for(let g=0;g<u.h;g++){const v=g*u.w*4,S=((m.y+g)*o+m.x)*4;c.set(M.subarray(v,v+u.w*4),S),d.set(x.subarray(v,v+u.w*4),S)}return{uv:[m.x/o,m.y/h,(m.x+u.w)/o,(m.y+u.h)/h],w:u.w,h:u.h}});return{albedo:c,normal:d,width:o,height:h,frames:f}}function $b(n,e){const t=[],i=[],r=Eb(n);for(const s of Td){const a=Ab(s.id,n);i.push({id:s.id,family:s.family,decal:!!s.decal,frame:t.push(En(a.whole,r,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:wb(n)}}function Zb(n,e){const t=[],i=[],r=Pd(n);for(const s of Ld){const a=Ub(s.id,n);i.push({id:s.id,frame:t.push(En(a.sp,r,n,"none",e))-1,originX:a.origin.x})}return{sprites:t,pieces:i}}function Jb(n,e){const t=[],i=[],r=Db(n),s=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of Cd)for(let o=0;o<a.variants;o++){const h=Ib(a.id,n,{variant:o}),c=h.crownY>0&&!s(h.top),d=t.push(En(c?h.bot:h.whole,r,n,"none",e))-1,f=c?t.push(En(h.top,r,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:d,top:f,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function Qb(n,e){if(n.kind==="creature")return{px:fr(uu(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:s,relics:a,layouts:o}=$b(n.style,e);return{px:fr(s,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:s,pieces:a}=Zb(n.style,e);return{px:fr(s,2048),pieces:a}}if(n.kind==="decor"){const{sprites:s,decor:a}=Jb(n.style,e);return{px:fr(s,2048),decor:a}}if(n.kind==="party")return{px:fr(uu(n.style,n.species,e,{...Yf(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:r}=Kb(n.style,n.seed,n.id,n.K,e);return{px:fr(t),layout:i,floor:{albedo:new Uint8Array($a(r.A,r.w,r.h)),normal:new Uint8Array($a(r.N,r.w,r.h)),w:r.w,h:r.h}}}function du(n,e,t){const i=new Yr(n,e,t,kn,Un);return i.magFilter=Yt,i.minFilter=Yt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Xn,i.needsUpdate=!0,i}function Dd(n){return{albedo:du(n.albedo,n.width,n.height),normal:du(n.normal,n.width,n.height),frames:n.frames}}const ws=(n,e=2048)=>Dd(fr(n,e));class jb{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const r=hf(e),s=u=>En(gf(e,u),r,e,e.cOutline),a=[0,1,2].map(u=>s({frame:u})).concat([0,1,2].map(u=>s({frame:u,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(m=>s({pose:u,frame:m,facing:p}))))),o=wu;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,m={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(s({pose:u,frame:x,facing:M}));this.witchFoot[u]=m}for(const[u,p]of[["fast",3],["brake",2]]){const m={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(s({pose:u,frame:x,facing:M}));this.witchFly[u]=m}this.witch=ws(a,2048),this.stones=ws([0,1,2,3].map(u=>this.stone(u)));const h=X0(e);this.props=ws([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(En(Wb(e,{variant:u,frame:p,state:"playing"}),zb(u),e,e.cOutline));this.soundsystems=ws(c,2048);const d=xb(e),f=pb(e);for(const u of[d.bot,d.top])for(let p=Math.max(0,Math.floor(d.anchors.base.y-14));p<u.h;p++)for(let m=0;m<u.w;m++)u.m[p*u.w+m]===l.NOSE&&(u.m[p*u.w+m]=0);if(this.treehouse={atlas:ws([d.bot,d.top].map(u=>En(u,f,e,"none")),2048),...d.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const m=new Worker(new URL(""+new URL("artWorker-BX0apnxP.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:m,busy:!1};m.onmessage=x=>{M.busy=!1,M.job=void 0,this.receive(x.data),this.dispatch()},m.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;onFloor=()=>{};stone(e){const t=ki(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new ft(i+2,r+1);return s.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,l.BODY,{round:this.style.round}),s.ellipse((i+2)/2-1,r/2,i/3,r/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),En(s,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Dd(e.result.px);if(e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(r=>[r.id,r])),modern:i.filter(r=>r.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,r={};for(const s of i)(r[s.family]??=[]).push(s);this.decor={atlas:t,pieces:i,families:r}}else e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:qb});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:i,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:Qb(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const jr=24,ot={uAmb:{value:new V},uMoon:{value:new V},uMoonDir:{value:new V(-.45,.75,.5).normalize()},uMoonBeam:{value:new V},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new V},uGlowRgb:{value:new V},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new qe},uHazeRange:{value:new qe(70,200)},uHazeColour:{value:new V},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:jr},()=>new rt)},uLightCol:{value:Array.from({length:jr},()=>new rt)},uLightCount:{value:0},uDisco:{value:new rt},uDiscoParams:{value:new rt},uDiscoColour:{value:new V(1,1,1)},uScenery:{value:new qe(1e6,1)}};function e5(n,e,t,i=1){const r=(s,a)=>new V(s[0]/255*a,s[1]/255*a,s[2]/255*a);ot.uAmb.value.copy(r(le(n.ambientHue,.55,1),n.ambient*i)),ot.uMoon.value.copy(r(le(n.moonHue,.35,1),n.moon)),ot.uMoonBeam.value.copy(r(le(n.moonHue,.35,1),n.shafts*.25)),ot.uBands.value=n.bands,ot.uDither.value=n.dither*.5,ot.uShafts.value=n.shafts,ot.uShaftScale.value=t*2,ot.uGlowRgb.value.copy(r(le(n.glowHue,n.glowSat,1),1)),ot.uGlowR.value=e,ot.uGlowPower.value=n.glowPower,ot.uHazeColour.value.copy(r(le(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const li=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${jr}], uLightCol[${jr}];
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
  // The witch's glow: a broad, soft pool, fairly flat for the first part of its reach, easing to
  // nothing at the edge (no ring), from a source well above her so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4))) * 0.35 + 0.65;
    float fall = 1.0 - smoothstep(0.0, uGlowR, d);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower);
  }
  for (int i = 0; i < ${jr}; i++) {
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
`,Zi=2,dn=32,pr=8,t5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,n5=`
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
${li}
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
    vec2 cell = vec2(mod(float(t), ${pr}.0), floor(float(t) / ${pr}.0));
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
`;class i5{constructor(e,t,i,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,h=Math.ceil(a*Zi/dn)*dn,c=Math.ceil(o*Zi/dn)*dn;this.tilesX=h/dn,this.tilesZ=c/dn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const d=m=>(m.magFilter=m.minFilter=Yt,m.generateMipmaps=!1,m.colorSpace=Xn,m.needsUpdate=!0,m);this.texture=d(new Yr(new Uint8Array(h*c*4),h,c)),d(this.tile),this.floors=d(new Yr(new Uint8Array(64*pr*48*4*4),64*pr,192));const f=Array.from({length:32},(m,M)=>new V(...Xt[M]?.floor??[.25,.45,.4])),u=new yt({vertexShader:t5,fragmentShader:n5,uniforms:{...ot,uAreas:{value:this.texture},uExtent:{value:new rt(s.minX,s.minZ,h/Zi,c/Zi)},uPixel:{value:r},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(m,M)=>{const x=Xt[M]?.layout.terrain??[];return new V(+x.includes("mounds"),+x.includes("hollows"),+x.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new qe(64,48)},uFloorsSize:{value:new qe(64*pr,192)},uSat:{value:i.sat},uFloor:{value:new V(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new rt},uCircle:{value:new rt},uSweeps:{value:Array.from({length:4},()=>new rt)},uSweepCount:{value:0},uClearing:{value:new qe(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Hn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new qt(p,u),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new Yr(new Uint8Array(dn*dn*4),dn,dn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>i[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,r){this.mesh.material.uniforms.uCircle.value.set(e,t,i,r)}setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(i.w!==s.x||i.h!==s.y)continue;const a=new Yr(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new qe(t%pr*i.w,Math.floor(t/pr)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=dn/Zi,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),d=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(r-a.minZ)/o,m=[];for(let g=d;g<=f;g++)for(let v=h;v<=c;v++)this.filled[g*this.tilesX+v]||m.push([v,g,(v+.5-u)**2+(g+.5-p)**2]);m.sort((g,v)=>g[2]-v[2]);const M=performance.now();let x=0;for(const[g,v]of m){if(x>0&&performance.now()-M>s)break;this.fillTile(e,g,v),x++}return m.length-x}fillTile(e,t,i){const r=this.map.extent,s=this.tile.image.data,a=dn/Zi,o=r.minX+t*a,h=r.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(d=>d.kind==="pond");for(let d=0;d<dn;d++)for(let f=0;f<dn;f++){const u=o+(f+.5)/Zi,p=h+(d+.5)/Zi,m=this.map.areaAt(u,p),M=(d*dn+f)*4;let x=0;for(const g of c)Math.hypot(u-g.x,p-g.z)<3*g.size&&(x=255);s[M]=m.type,s[M+1]=Math.round(m.openness*255),s[M+2]=x,s[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new qe(t*dn,i*dn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const fu=Lc,r5=new Set(["tarmac","railway","stairs","bridges"]),pu=`
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,s5=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${li}
void main() {
  // Sample at the centre of the art pixel this fragment is in, as the floor does, so the path's
  // pixels line up with the ground's.
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel;
  mat2 dw = mat2(dFdx(vWorld.xz), dFdy(vWorld.xz)), du = mat2(dFdx(vUv), dFdy(vUv));
  vec2 uv = vUv;
  if (abs(determinant(dw)) > 1e-9) uv += du * inverse(dw) * (p - vWorld.xz);
  if (uv.x < 0.0 || uv.x > 1.0) discard;
  vec4 c = texture2D(uStrip, vec2(uv.x, fract(uv.y)));
  if (c.a < 0.5) discard;
  if (c.a < 0.999) { gl_FragColor = vec4(haze(c.rgb, vWorld), sceneryFade(vWorld)); return; } // the magic trail glows
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y), 1.0);
  gl_FragColor = vec4(haze(min(vec3(1.0), c.rgb * light * 1.25), vWorld), sceneryFade(vWorld));
}
`,a5=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${li}
float h21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
void main() {
  vec2 px = floor(vWorld.xz / uPixel), p = (px + 0.5) * uPixel;
  float across = abs(vUv.x * 2.0 - 1.0), bank = 1.0 - 0.35 * vn(vec2(vUv.y * 3.0, vUv.x > 0.5 ? 3.0 : 9.0));
  if (across > bank) discard;
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
`;class o5{group=new Vr;constructor(e,t,i){const r=e.paths,s=e.seed,a=kb(),o=new Map,h=(f,u)=>{const p=e.areaAt(f,u),m=p.cell.join(",");let M=o.get(m);if(!M){const x=(a[Xt[p.type].id]??[]).filter(g=>!r5.has(g)&&fu[g]&&(g!=="magic"||Ce(p.cell[0],p.cell[1],s+831)<.15));M=x.length?x[Math.floor(Ce(p.cell[0],p.cell[1],s+833)*x.length)]:"dirt",o.set(m,M)}return M},c=new Map;r.lines.forEach((f,u)=>{const p=f.kind==="rail"?Math.floor(Ce(u,1,s+835)*3):0,m=f.pts,M=m.length,x=[0];for(let S=1;S<M;S++)x.push(x[S-1]+Math.hypot(m[S][0]-m[S-1][0],m[S][1]-m[S-1][1]));const g=m.map((S,y)=>{const A=m[Math.max(0,y-1)],b=m[Math.min(M-1,y+1)],E=b[0]-A[0],_=b[1]-A[1],w=Math.hypot(E,_)||1;return[-_/w,E/w]}),v=x[M-1];for(let S=0;S<M-1;S++){const y=(m[S][0]+m[S+1][0])/2,A=(m[S][1]+m[S+1][1])/2;if(f.kind==="rail"&&r.railBroken(y,A)||e.hardClear(y,A))continue;const b=f.kind==="stream"?{width:f.half*2,period:4}:null,E=f.kind==="stream"?"stream":f.kind==="rail"?"railway":f.kind==="road"?"tarmac":h(y,A),_=b??fu[E],w=E+":"+p;let L=c.get(w);L||c.set(w,L={pos:[],uv:[]});const R=O=>_.width/2*(f.deadEnd?Math.min(1,(v-x[O])/6):1),P=(O,I)=>{const U=R(O)*I;L.pos.push(m[O][0]+g[O][0]*U,.02,m[O][1]+g[O][1]*U),L.uv.push(I>0?1:0,x[O]/_.period)};P(S,-1),P(S,1),P(S+1,1),P(S,-1),P(S+1,1),P(S+1,-1)}});const d=Pd(t);for(const[f,u]of c){const[p,m]=f.split(":"),M=new jt;if(M.setAttribute("position",new Ot(u.pos,3)),M.setAttribute("uvw",new Ot(u.uv,2)),p==="stream"){const A=new yt({vertexShader:pu,fragmentShader:a5,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...ot,uPixel:{value:i}}}),b=new qt(M,A);b.frustumCulled=!1,b.renderOrder=.4,this.group.add(b);continue}const x=Ob(p,{variant:+m}).strip,g=En(x,d,t,"none"),v=new pd(g.A);v.magFilter=v.minFilter=Yt,v.generateMipmaps=!1,v.flipY=!1,v.wrapT=Ua,v.colorSpace=Xn;const S=new yt({vertexShader:pu,fragmentShader:s5,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...ot,uStrip:{value:v},uPixel:{value:i}}}),y=new qt(M,S);y.frustumCulled=!1,y.renderOrder=.5,this.group.add(y)}}}const l5="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",c5=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,h5=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,u5=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,d5=`
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
}`;function ur(n,e,t,i=!1){const r=new qn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Xn,r}class f5{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ur(1,1,Vt,!0),this.scene.depthTexture=new ns(1,1),this.fx.texture.format=kn;const i=(r,s)=>new yt({vertexShader:l5,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:i(c5,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(h5,{uSrc:{value:null},uStep:{value:new qe}}),composite:i(u5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new qe},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(d5,{uSrc:{value:null},uTexel:{value:new qe},uDir:{value:new qe},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new qt(new Hn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ur(1,1,Vt);bloomB=ur(1,1,Vt);a=ur(1,1,Vt);b=ur(1,1,Vt);fx=ur(1,1,Vt);fxB=ur(1,1,Vt);fxScene=null;quad;cam=new Rc(-1,1,1,-1,0,1);mats;low=new qe(1,1);out=new qe(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?i:e,h=this.fullResolution?r:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,m=>{m.uScene.value=this.scene.texture,m.uThreshold.value=r.bloom.threshold});for(let m=0;m<2;m++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new nt),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const m=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/m,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/M)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=s?r.bloom.strength:0,u.uBlack.value=r.tone.black,u.uGamma.value=r.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,d=this.fullResolution?this.out.y/this.low.y:1,f=u=>{u.uTexel.value.set(1/h,1/c),u.uStrength.value=r.tiltShift.strength*d,u.uBand.value=r.tiltShift.band,u.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const p5=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,m5=`
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
}`,g5=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,x5=`
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
}`,M5=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class v5{constructor(e,t,i,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new V(a.x,0,a.z);const o=new V(...le(s.circleHue2,.4,1).map(x=>x/255));this.ballMat=new yt({vertexShader:p5,fragmentShader:m5,uniforms:{...i,uSize:{value:s.discoSize/2},uTime:ot.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new qt(new Hn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new qt(new Hn(r,h).translate(0,h/2,0),new yt({fragmentShader:g5,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=s.motes,d=[],f=[];for(let x=0;x<c.count;x++){const g=y=>{const A=Math.sin(x*12.9898+y*78.233)*43758.5453;return A-Math.floor(A)},v=g(1)*Math.PI*2,S=Math.sqrt(g(2))*a.radius*c.column;d.push(a.x+Math.cos(v)*S,.3,a.z+Math.sin(v)*S),f.push(g(3),c.speed*(.6+g(4)*.8),.4+g(5)*1.2,0)}const u=new jt;u.setAttribute("position",new Ot(d,3)),u.setAttribute("aMote",new Ot(f,4));const p=le(s.circleHue,.55,1);this.motes=new Xa(u,new yt({vertexShader:x5,fragmentShader:M5,uniforms:{uTime:ot.uTime,uRise:{value:c.rise},uTint:{value:new V(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:_r})),this.motes.frustumCulled=!1;const m=le(s.circleHue,.7,1);this.lightRgb=new V(m[0]/255,m[1]/255,m[2]/255);const M=ot;M.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,r=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*r,e*i.runeSpeed/60*Math.PI*2);const s=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+i.discoSize/2,this.centre.z),ot.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*r}}}const _5=[new V(.25,.85,1),new V(.7,.4,1),new V(1,.65,.2)];class b5{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,r){const s=e.tuning.party,a=[],o=[],h=[],c=[],d=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;d.push({...f.soundsystem,at:f.at,from:u})}for(const f of d){const u=s.transition>0?Math.min(1,(t-f.at)/s.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],m=p.h*this.metresPerPixel,M=nn((u-.55)/.45);if(u<1&&f.from){const g=(f.from.x+f.x)/2,v=(f.from.z+f.z)/2,S=Math.hypot(f.x-g,f.z-v)*1.6;h.push({x:g,z:v,radius:u*S,strength:1-nn((u-.8)/.2)})}if(M>0&&i(f.x,f.z,p.w*this.metresPerPixel,m)){const g=Ce(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-M)*m,z:f.z,frame:p,flip:g,fresh:r(f.x,f.z,m)})}u>=1&&c.push({x:f.x,y:m*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+s.transition});const x=.85+.15*Math.sin(t*8);M>0&&o.push({x:f.x,y:3,z:f.z,reach:s.lightReach,rgb:_5[f.variant%3],strength:s.lightStrength*x*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}function y5(n,e,t,i){const r=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(r(n,t)||r(n,i)||r(e,t)||r(e,i))return!1;const s=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return s(n,e,t)*s(n,e,i)<0&&s(t,i,n)*s(t,i,e)<0}function S5(n,e,t){const i=n.tuning.stringLights,r=n.siteOf(t[0],t[1]),s=ki(n.seed*53+t[0]*1031+t[1]*7+509),a=y=>{const A=n.areaAt(y.x,y.z).cell;return A[0]===t[0]&&A[1]===t[1]},o=y=>Ce(Math.round(y.x*10),Math.round(y.z*10),n.seed+501),h=e.treesNear(r.x,r.z,n.areaSize*1.3).filter(a).sort((y,A)=>o(y)-o(A)),c=new Map,d=new Set,f=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),m=(y,A=0)=>(c.get(y)??0)+1<=(d.has(y)?3:2)-A,M=(y,A)=>f.some(b=>y5([y.x,y.z],[A.x,A.z],[b.ax,b.az],[b.bx,b.bz])),x=(y,A)=>{f.push({ax:y.x,az:y.z,bx:A.x,bz:A.z,seed:Math.floor(Ce(Math.round(y.x*10),Math.round(A.z*10),n.seed+503)*1e6)}),c.set(y,(c.get(y)??0)+1),c.set(A,(c.get(A)??0)+1)},g=(y,A,b)=>{let E=y,_=A;const w=[y];for(let L=0;L<b&&m(E);L++){const R=[];for(const I of h){if(I===E||!m(I))continue;const U=I.x-E.x,z=I.z-E.z,k=Math.hypot(U,z);if(!(k<i.spanMin||k>i.spanMax)&&!(_&&(U*_[0]+z*_[1])/k<p)&&!M(E,I)&&(R.push({b:I,d:k}),R.length>=16))break}if(!R.length)break;R.sort((I,U)=>U.d-I.d);const{b:P,d:O}=R[Math.floor(s()*Math.min(4,R.length))];x(E,P),_=[(P.x-E.x)/O,(P.z-E.z)/O],w.push(P),E=P}return w},v=i.runsPerArea[0]+Math.floor(s()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),S=[];for(const y of h){if(u.length>=v)break;if(c.has(y)||u.some(E=>Math.hypot(E.x-y.x,E.z-y.z)<i.spread))continue;u.push(y);const A=i.spansPerRun[0]+Math.floor(s()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),b=g(y,null,A);for(let E=1;E<b.length-1;E++){if(s()>=i.junctionChance)continue;const _=b[E],w=b[E+1],L=w.x-_.x,R=w.z-_.z,P=Math.hypot(L,R),O=s()<.5?1:-1;d.add(_),S.push({from:_,heading:[-R/P*O,L/P*O]})}}for(const y of S)g(y.from,y.heading,i.spansPerRun[0]+Math.floor(s()*3));return f}const zt={uRight:{value:new V(1,0,0)},uUp:{value:new V(0,1,0)},uFacing:{value:new V(0,0,1)},uTopFade:{value:0},uCutout:{value:new rt(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new qe(1,1)},uWitch:{value:new rt(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new rt(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new rt)},uPartyCol:{value:Array.from({length:16},()=>new V)},uPartyCount:{value:0},uUplight:{value:new rt}},tl=`
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
void main() {
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(iPos, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
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
`,nl=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
uniform float uFlat; // lies flat on the ground (a court's decal): never stands in front of her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
${li}
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
    // Crowns: hidden in a dithered hole round the witch, which closes as she rises.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = smoothstep(uCutout.z - uCutout.w, uCutout.z, d);
    if (bayer(gl_FragCoord.xy) >= max(shown, uTopFade)) discard;
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
    float k = sceneryFade(vWorld);
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class ti{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new Hn(1,1);r.translate(0,.5,0),this.geo=new Cc,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=h=>({...ot,...zt,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uFadePass:{value:0},uFlat:{value:i.flat?1:0},uSilhouette:{value:new rt(0,0,0,0)},...h}),a=i.scenery?{blending:no,blendSrc:pc,blendDst:mc}:{},o=new yt({vertexShader:tl,fragmentShader:nl,uniforms:s({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new qt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new qt(this.geo,new yt({vertexShader:tl,fragmentShader:nl,uniforms:s({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new qt(this.geo,new yt({vertexShader:tl,fragmentShader:nl,uniforms:s({uSilhouette:{value:new rt(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Fa}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(r,s)=>{const a=new Ac(new Float32Array(t*r),r);return a.setUsage(Zr),s&&a.array.set(s.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const w5=`
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
}`,E5=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${li}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,A5=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,T5=`
varying vec3 vWorld;
${li}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,R5=`
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
}`,C5=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${li}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class L5{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(s=>new nt(s));const r={...ot,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new yt({vertexShader:w5,fragmentShader:E5,uniforms:{...r,uRes:zt.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new yt({vertexShader:A5,fragmentShader:T5,uniforms:r}),this.moteMat=new yt({vertexShader:R5,fragmentShader:C5,uniforms:{...ot,uMoteColour:{value:new nt(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:_r})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,r,s){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],d=[],f=[],u=[];e.forEach((_,w)=>{const L=Math.hypot(_.bx-_.ax,_.bz-_.az),R=Math.max(2,Math.round(L/a.bulbSpacing)),P=O=>[_.ax+(_.bx-_.ax)*O,o-a.sag*4*O*(1-O)*(L/8),_.az+(_.bz-_.az)*O];for(let O=0;O<=16;O++){const I=P(O/16),U=P((O+1)/16);O<16&&(f.push(...I,...U),u.push(w+O/16,w+(O+1)/16))}for(let O=1;O<R;O++){const I=O/R,U=P(I),z=this.palette[(_.seed+O)%this.palette.length];h.push(...U),c.push(z.r,z.g,z.b),d.push((_.seed*13+O*7)%100/100,w*40+O,t(U[0],U[2])+O*.03,4*I*(1-I))}});const p=new Vr,m=new jt;m.setAttribute("position",new Ot(h,3)),m.setAttribute("aColour",new Ot(c,3)),m.setAttribute("aBulb",new Ot(d,4));const M=new jt;M.setAttribute("position",new Ot(f,3)),M.setAttribute("aSway",new Ot(u,1)),p.add(new Tc(M,this.wireMat),new Xa(m,this.bulbMat));const x=this.game.tuning.party.motes,g=this.game.map,v=[],S=[],y=g.areaSize*1.1,A=Math.round(Math.PI*y*y/400*x.perPatch);for(let _=0;_<A;_++){const w=U=>{const z=Math.sin(r*12.9898+_*78.233+U*37.719)*43758.5453;return z-Math.floor(z)},L=w(1)*Math.PI*2,R=Math.sqrt(w(2))*y,P=i.x+Math.cos(L)*R,O=i.z+Math.sin(L)*R,I=g.areaAt(P,O).cell;I[0]!==s[0]||I[1]!==s[1]||(v.push(P,x.from,O),S.push(w(3),x.speed*(.6+w(4)*.8),.3+w(5)*.8,t(P,O)))}const b=new jt;b.setAttribute("position",new Ot(v,3)),b.setAttribute("aMote",new Ot(S,4));const E=new Xa(b,this.moteMat);return E.frustumCulled=!1,p.add(E),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(i++>=2)break;const o=S5(e.map,e.forest,s.cell),h=e.map.siteOf(s.cell[0],s.cell[1]),c=s.from?e.map.siteOf(s.from[0],s.from[1]):null,d=c?(c.x+h.x)/2:h.x,f=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-d,h.z-f)*1.6:1,p=e.tuning.party.transition,m=(M,x)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(M-d,x-f)/u)*p;a={lines:o,group:this.build(o,m,h,s.cell[0]*131+s.cell[1]*17+e.seed,s.cell),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const Qt=32,zr=16,P5=`
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
}`,D5=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${li}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class mu{mesh;geo=new Cc;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Hn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new qt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(r,s,a)=>this.geo.setAttribute(r,new Ac(s,a).setUsage(Zr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,r,s,a,o,h,c,d=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=r,this.uv.set(s,f*4),this.col.set([a,o,h,c],f*4),this.draw[f]=d}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const I5=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],O5=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class N5{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Qt*zr;const i=this.canvas.getContext("2d"),r=i.createRadialGradient(Qt/2,Qt/2,0,Qt/2,Qt/2,Qt/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,Qt,Qt),this.tex=new pd(this.canvas),this.tex.magFilter=Yt,this.tex.minFilter=Yt,this.tex.generateMipmaps=!1;const s=a=>new yt({vertexShader:P5,fragmentShader:D5,uniforms:{...ot,uRight:zt.uRight,uUp:zt.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:_r});this.standing=new mu(s(0)),this.flat=new mu(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new V;slotOf(e,t=0){const i=`${e}:${t}`;let r=this.slots.get(i);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(i,r);const s=this.canvas.getContext("2d"),a=r%zr*Qt,o=Math.floor(r/zr)*Qt;s.clearRect(a,o,Qt,Qt),a0(s,e,{x:a+1,y:o+1,size:Qt-2,level:t,colour:[255,255,255],glow:!1});const h=s.getImageData(a,o,Qt,Qt);for(let d=3;d<h.data.length;d+=4)h.data[d]=h.data[d]>90?255:0;s.putImageData(h,a,o);const c=Ls(e);return this.colours.set(e,new nt(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=Qt*zr,i=e%zr*Qt,r=Math.floor(e/zr)*Qt;return[i/t,1-r/t,(i+Qt)/t,1-(r+Qt)/t]}update(e,t,i,r,s){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,d=h.bond,f=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const b of o.events)b.kind==="fizzled"&&this.fizzles.push({x:b.x,z:b.z,at:e}),b.kind==="invited"&&this.bursts.push({x:b.x,z:b.z,at:e,seed:b.id});this.fizzles=this.fizzles.filter(b=>e-b.at<.7),this.bursts=this.bursts.filter(b=>e-b.at<.9);for(const b of this.bursts){const E=(e-b.at)/.9;for(let _=0;_<28;_++){const w=Ce(b.seed,_,3)*Math.PI*2,L=2+Ce(b.seed,_,5)*3,R=2+Ce(b.seed,_,7)*3,P=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(b.x+Math.cos(w)*L*E,.6+R*E-4*E*E,b.z+Math.sin(w)*L*E,.3,u,P[0],P[1],P[2],1-E)}}const p=(b,E,_)=>{const w=a.creatures[b],L=28,R=_?1:.45;for(let P=0;P<L;P++){const O=Math.PI/2-P/L*Math.PI*2,I=P/L<E;!_&&!I||this.flat.add(w.x+Math.cos(O)*1.5,0,w.z+Math.sin(O)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*R)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[b,E]of o.progress)o.talk?.id!==b&&p(b,Math.min(1,E/Bu(a.creatures[b],h)),!1);const m=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let g={x:0,z:0},v=s;for(let b=o.stack.length-1;b>=0;b--){const E=o.stack[b],_=a.creatures[E],w=o.stack.length-1-b,L=this.chain[w],R=(2+_.level*.4)*m.scale,P=Math.sin(e*1.7+w*.9)*m.idleSway*(1+w*.5),O=g.x-c.vx*m.trail+P,I=g.z-c.vz*m.trail;L.vx+=((O-L.x)*m.stiffness-L.vx*m.damping)*M,L.vz+=((I-L.z)*m.stiffness-L.vz*m.damping)*M,L.x+=L.vx*M,L.z+=L.vz*M,g=L,v+=(w===0?m.offset*R:m.gap*R)+R/2;const U=new V(c.x+L.x,v,c.z+L.z);v+=R/2,x.set(E,U);const z=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(U.x,U.y,U.z,R,this.uv(this.slotOf(_.species,_.level)),z.r,z.g,z.b,1)}for(const b of o.placed){const E=a.creatures[b.id],_=this.slotOf(E.species,E.level),w=this.colours.get(E.species),L=.8+.2*Math.sin(e*2+b.id);this.flat.add(b.x,0,b.z,3+E.level*.8,this.uv(_),w.r*L,w.g*L,w.b*L,1,Math.min(1,(e-b.at)/.8)),this.flat.add(b.x,0,b.z,5,u,w.r,w.g,w.b,.25)}const S=h.sigilProjection,y=c.lift*c.lift*(3-2*c.lift);if(y>.01)for(const b of o.placed){const E=a.creatures[b.id],_=this.colours.get(E.species),w=h.treetopHeight-4+S.height,L=.85+.15*Math.sin(e*1.3+b.id);this.flat.add(b.x,w,b.z,(3+E.level*.8)*S.size,this.uv(this.slotOf(E.species,E.level)),_.r,_.g,_.b,S.opacity*y*L);for(let R=1;R<w;R+=1.5)this.standing.add(b.x,R,b.z,.3,u,_.r,_.g,_.b,S.beam*y*L*(.6+.4*Math.sin(R*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(b=>Math.hypot(b.x-c.x,b.z-c.z)<=f.pickRadius)){const b=a.creatures[o.stack[o.stack.length-1]],E=this.colours.get(b.species),_=zu(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+b.level*.8,this.uv(this.slotOf(b.species,b.level)),_?1:E.r,_?.1:E.g,_?.1:E.b,.22)}for(const b of this.fizzles){const E=1-(e-b.at)/.7;this.flat.add(b.x,0,b.z,3*(1+(1-E)*.6),u,1,.15,.1,E)}const A=[...o.stack,...o.placed.map(b=>b.id)];for(const b of A){const E=a.creatures[b],_=this.colours.get(E.species);if(!_)continue;const w=yp(o,b,c.x,c.z);d.rim&&this.flat.add(E.x,0,E.z,1.8,u,_.r,_.g,_.b,.35);const L=x.get(b)??new V(w.x,.2,w.z);if(d.sparks){const P=Math.max(.5,d.sparkEvery),O=(e+b*.618%1*P)%P;if(O<.7){const I=O/.7;this.standing.add(L.x+(E.x-L.x)*I,L.y+(.6-L.y)*I+Math.sin(I*Math.PI)*1.2,L.z+(E.z-L.z)*I,.35,u,_.r,_.g,_.b,1)}}const R=Math.hypot(E.x-w.x,E.z-w.z);if(d.thread&&R>f.length*.85){const P=Math.min(1,(R-f.length*.85)/f.length),O=Math.min(60,Math.floor(R/1.2));for(let I=1;I<O;I++){const U=(I+e*2%1)/O;this.standing.add(L.x+(E.x-L.x)*U,L.y+(.5-L.y)*U,L.z+(E.z-L.z)*U,.22,u,_.r,_.g,_.b,.25+.75*P)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,r)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,r=i.emojiPixels,s=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=r,a.style.width=a.style.height=`${r*s}px`;const o=a.getContext("2d");if(o){o.font=`${r-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,r/2,r/2+.5);const h=o.getImageData(0,0,r,r);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=s.witch,d=(S,y,A,b)=>{this.v.set(y,A,b).project(t),S.style.left=`${(this.v.x+1)/2*i}px`,S.style.top=`${(1-this.v.y)/2*r}px`},f=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",s.leash.held),s.leash.held&&(this.say(o,s.leash.heldInAir?"land to talk":"…"),d(o,c.x-1.2,es(c,s.tuning)+2.2,c.z));return}const p=s.creatures[a.id];if(d(o,c.x-1.2,es(c,s.tuning)+2.2,c.z),d(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(f,Ce(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const m=Math.floor(a.t/bp(p,s.tuning)),M=Math.min(1,a.t/a.total),x=(S,y)=>S[Math.floor(Ce(a.id,y,5)*S.length)%S.length],g=[4,2,0][Math.min(2,p.level)],v=Math.round(g+(4-g)*M);this.emoji(o,x(I5,m-m%2)),o.classList.toggle("on",m%2===0),m>=1?this.emoji(f,x(O5[v],m-(m+1)%2)):this.say(f,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=m%2===1?"1":"0.6"}}const F5=[1,3,5,7,9],Id=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function U5(n,e,t,i){const r=i.lasers,{beat:s,bar:a}=Id(i),o=a*Math.max(1,r.blockBars),h=Math.floor(n/o),c=n-h*o,d=Pn(r.duty*t,0,1),u=Ce(e,h,311)<d?nn(c/Math.max(.001,r.fadeIn))*nn((o-c)/Math.max(.001,r.fadeOut)):0,p=Math.floor(c/a),m=F5.filter(y=>y<=r.maxCount),M=m[Math.floor(Ce(e,h*64+p,313)*m.length)%m.length]??1,x=e%97*.37,g=Math.sin(2*Math.PI*n/(s*r.sweepBeats)+x)*(r.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*r.openBars)+x*2),S=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:g,open:v,hue:S}}const k5=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,B5=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Es=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],z5=n=>{const e=(n%1+1)%1*Es.length,t=Math.floor(e),i=e-t,r=Es[t%Es.length],s=Es[(t+1)%Es.length];return[r[0]+(s[0]-r[0])*i,r[1]+(s[1]-r[1])*i,r[2]+(s[2]-r[2])*i]};class H5{constructor(e,t){this.game=t,this.mesh=new Tc(this.geo,new yt({vertexShader:k5,fragmentShader:B5,transparent:!0,depthWrite:!1,blending:_r})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new jt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,r){const s=this.game.tuning,a=s.lasers,{bar:o}=Id(s),h=o*a.blockBars,c=[],d=[],f=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const m=U5(e,u.seed,1,s),M=e-u.ready,x=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,g=Math.max(m.on,x),v=x>m.on?a.maxCount:m.count;if(g<=.01)continue;const S=a.spread*Math.PI/180*m.open;for(let y=0;y<v;y++){const A=v===1?0:y/(v-1)-.5,b=a.maxTilt*Math.PI/180,E=Math.max(-b,Math.min(b,A*S+m.sweep)),_=Math.sin(E),w=Math.cos(E),L=-.15*Math.cos(E*3+u.seed),R=z5(m.hue+y*.07),P=a.opacity*g*p;c.push(u.x,u.y,u.z,u.x+_*a.length,u.y+w*a.length,u.z+L*a.length),d.push(...R,P,...R,P),f.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(d.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Bn(this.pos,3).setUsage(Zr)),this.geo.setAttribute("aCol",new Bn(this.col,4).setUsage(Zr)),this.geo.setAttribute("aU",new Bn(this.u,1).setUsage(Zr))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(d),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*G5(n,e,t,i){const r=n.siteOf(e[0],e[1]),s=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(g,v)=>{if(g<o.minX||g>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const S=n.areaAt(g,v).cell;return`${S[0]},${S[1]}`},c=`${e[0]},${e[1]}`,d=Math.ceil(2*s/a),f=r.x-s,u=r.z-s,p=[];for(let g=0;g<=d;g++){for(let v=0;v<=d;v++)p.push(h(f+v*a,u+g*a));yield}const m=new Set,M=Math.max(1,Math.round(a/t)),x=a/M;for(let g=0;g<d;g++,yield)for(let v=0;v<d;v++){const S=[p[g*(d+1)+v],p[g*(d+1)+v+1],p[(g+1)*(d+1)+v],p[(g+1)*(d+1)+v+1]];if(!S.includes(c)||S.every(A=>A===c))continue;const y=[];for(let A=0;A<=M;A++)for(let b=0;b<=M;b++)y.push(h(f+v*a+b*x,u+g*a+A*x));for(let A=0;A<=M;A++)for(let b=0;b<=M;b++){const E=y[A*(M+1)+b],_=f+v*a+b*x,w=u+g*a+A*x;for(const[L,R]of[[1,0],[0,1]]){if(b+L>M||A+R>M)continue;const P=y[(A+R)*(M+1)+b+L];if(E===P||E!==c&&P!==c)continue;const O=_+L*x*.5,I=w+R*x*.5,U=`${Math.round(O*4)},${Math.round(I*4)}`;m.has(U)||(m.add(U),i.push({x:O,z:I,other:E===c?P:E}))}}}}const W5=`
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
}`,V5=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${li}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class Y5{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Xa(this.geo,new yt({vertexShader:W5,fragmentShader:V5,uniforms:{...ot,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:_r})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new jt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const d=e.map.siteOf(c.cell[0],c.cell[1]),f=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=f?(f.x+d.x)/2:d.x,p=f?(f.z+d.z)/2:d.z,m=e.map.areaSize*1.6,M=e.tuning.party.transition,x=Ls(Xt[e.map.typeOf(c.cell[0],c.cell[1])].creature),g={points:[],colour:new nt(x[0]/255,x[1]/255,x[2]/255),on:(v,S)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,S-p)/m)*M,done:!1};this.areas.set(h,g),this.jobs.push({key:h,gen:G5(e.map,c.cell,t.step,g.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(s.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new Ot(s,3)),this.geo.setAttribute("aColour",new Ot(a,3)),this.geo.setAttribute("aSpark",new Ot(o,2))}}const X5=["#ff6fcf","#5fe8ff","#ffe25c"];class K5{canvas=document.createElement("canvas");g;v=new V;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,r,s,a,o,h,c,d){const f=this.v.set(r,1,s).project(e),u=Math.max(Math.abs(f.x),Math.abs(f.y)),p=f.z<1?Math.min(1,Math.max(0,(u-.9)/.25)):1;if(p<=.01){this.canvas.style.display="none";return}let m=f.x,M=f.y;f.z>=1&&(m=-m,M=-M);const x=1/Math.max(Math.abs(m)/.86,Math.abs(M)/.8,1e-6),g=(m*x+1)/2*t,v=(1-M*x)/2*i,S=Math.hypot(r-a,s-o),y=Math.max(.25,Math.min(1,1-S/900));this.canvas.style.display="block",this.canvas.style.left=`${g-48}px`,this.canvas.style.top=`${v-48}px`;const A=this.g,b=Math.atan2(-M,m);A.clearRect(0,0,96,96),A.save(),A.translate(48,48),A.rotate(b);const E=h*c/60,_=E-Math.floor(E);for(let w=0;w<3;w++){const L=(10+w*9+_*9)*(.7+.3*y),R=p*y*(1-(w+_)/3.2);A.strokeStyle=X5[w],A.globalAlpha=Math.max(0,R),A.lineWidth=3,A.beginPath(),A.arc(26,0,L,Math.PI-.7,Math.PI+.7),A.stroke()}d&&(A.rotate(-b),A.globalAlpha=.8,A.fillStyle="#fff",A.font="10px monospace",A.textAlign="center",A.fillText(`${Math.round(S)} m`,0,40)),A.restore()}}class q5{canvas=document.createElement("canvas");g;v=new V;d=new V;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const r=e.position;return this.d.set(t,i,.5).unproject(e).sub(r),this.d.y>=-1e-6?null:r.clone().addScaledVector(this.d,-r.y/this.d.y)}update(e,t,i,r,s){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(R,P)=>{const O=this.v.set(R,0,P).project(e);return[(O.x+1)/2*t,(1-O.y)/2*i,O.z]};a.clearRect(0,0,t,i);const h=(R,P,O,I,U)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(R,P),a.lineTo(O,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${U})`,a.lineWidth=1,a.beginPath(),a.moveTo(R,P),a.lineTo(O,I),a.stroke()},c=(R,P,O,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(R,P+1,O+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(R,P,O)},d=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!d||!f)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),m=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,x=Math.min(u.x,m.x),g=Math.max(p.x,M.x),v=Math.min(f.z,m.z),S=d.z;for(let R=Math.ceil(x/10)*10;R<=g;R+=10){const P=o(R,v),O=o(R,S);h(P[0],P[1],O[0],O[1],R%50===0?.28:.1)}for(let R=Math.ceil(v/10)*10;R<=S;R+=10){const P=o(x,R),O=o(g,R);h(P[0],P[1],O[0],O[1],R%50===0?.28:.1)}const y=i-6;h(0,y,t,y,.6);for(let R=Math.ceil((u.x-r)/2)*2;r+R<=p.x;R+=2){const P=o(r+R,d.z)[0],O=R%10===0;h(P,y,P,y-(O?10:5),.6),O&&c(`${R}`,P,y-18,"center")}const A=6;h(A,0,A,i,.6);for(let R=Math.ceil((s-d.z)/2)*2;s-R>=f.z-1e-6&&R<400;R+=2){const P=o(r,s-R)[1],O=R%10===0;P<0||P>i||(h(A,P,A+(O?10:5),P,.6),O&&c(`${R}`,A+14,P,"left"))}const b=o(r,s),E=this.ground(e,-1,1-b[1]/i*2),_=this.ground(e,1,1-b[1]/i*2),w=E&&_?Math.round(_.x-E.x):0,L=Math.round(e.position.y);c(`camera ${L} m up · ${w} m across at the witch`,t-12,i-24,"right")}}const $5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Z5=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${li}
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
}`;class J5{constructor(e,t,i,r,s,a,o){this.height=t,this.mat=new yt({vertexShader:$5,fragmentShader:Z5,uniforms:{...ot,uStrength:{value:e},uWind:{value:i},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?yi:$r}),this.mesh=new qt(new Hn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const Q5=`
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
}`,j5=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${li}
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
}`;class ey{mesh;geo=new Cc;attr;capacity=0;constructor(e,t=!0){const i=new Hn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const r=new yt({vertexShader:Q5,fragmentShader:j5,uniforms:{...ot,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:no,blendSrc:dc,blendDst:fc}:{}});this.mesh=new qt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Ac(new Float32Array(this.capacity*4),4),this.attr.setUsage(Zr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.scenery?-i.w:i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const ty=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function ny(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const r=n.fps+(1/e-n.fps)*Math.min(1,e*4),s=r<i.fps-i.hysteresis?n.slowFor+e:0,a=r>=i.fps?n.fastFor+e:0;let o=n.radius;return s>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:r,slowFor:s,fastFor:a}}function iy(n,e){let t=0;for(const r of n)t+=r;let i=e%1000003/1000003*t;for(let r=0;r<n.length;r++)if(i-=n[r],i<0)return r;return Math.max(0,n.length-1)}class ry{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.budget=ty(r),this.renderer=new db({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Os,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new Fn(r.camera.fov,1,1,900),this.post=new f5(this.renderer,r),this.scene.background=new nt(723478),e5({...i,shafts:i.shafts*r.moonbeams},r.glowReach,this.mpp,r.tone.ambient),ot.uGlowPower.value=r.glowPower,this.assets=new jb(i,t.seed,r.pixelSize),this.ground=new i5(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new ey(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";ot.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new J5(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new _h,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ot.uHazeRange.value.set(r.haze.near,r.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new o5(t.map,i,this.mpp).group);const o=r.occlusion;this.witchBatch=new ti(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ot.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),zt.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0);{const u=this.assets.treehouse,p=u.atlas.frames,m=t.map.treehouse,M=m.x-(u.base.x-p[0].w/2)*this.mpp;this.treehouseBatch=new ti(u.atlas,this.mpp,{fade:!0}),this.treehouseBatch.set([{x:M,y:0,z:m.z,frame:p[0],flip:!1},{x:M,y:0,z:m.z,frame:p[1],flip:!1,top:!0}]),this.scene.add(...this.treehouseBatch.meshes)}this.stoneBatch=new ti(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,c=[],d=t.tuning.dancefloor.stones;for(let u=0;u<d;u++){const p=u/d*Math.PI*2+.3;c.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(c),this.propBatch=new ti(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new b5(this.assets.soundsystems,this.mpp),this.strings=new L5(this.scene,t),this.leashView=new N5(this.scene,t),this.lasers=new H5(this.scene,t),this.borders=new Y5(this.scene,t),this.soundBatch=new ti(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new v5(t.map,r,zt,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=r.fx==="smooth"?new yt({transparent:!0,depthWrite:!1,blending:no,blendSrc:dc,blendDst:fc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new yt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new qt(new Hn(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new _h;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new K5(document.body);rulers=new q5(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),zt.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<Xt.length;e++)this.assets.prefetchType(e);for(const e of Xt)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(...r.meshes))),r}frustum=new Wa;frustumTo=new Wa;cullCam=new Fn;box=new ls;m4=new Bt;v3=new V;v3b=new V;v3c=new V;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=vu({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Yn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const d of[-1,1])for(const f of[-1,1]){const u=this.v3.set(d,f,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let m=u.y<-.001?(p-h.y)/u.y:1/0;m>0||(m=1/0),m=Math.min(m,c),r.push([h.x+u.x*m,h.z+u.z*m])}}r.push([h.x,h.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,r,s,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+s;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-s,-s,t-r-s),this.box.max.set(e+i/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,i,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],r=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const s of i.before)if(!i.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[h,c,d]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+d),until:this.now+1})}}if(r){const s=(a,o)=>{const h=this.at.get(a),[c,...d]=a.split("|"),[f,u,p]=h??d.map(Number),m=this.game.witch;!(e==="placed"&&Math.hypot(+f-m.x,+u-m.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+u,+p)&&this.pops.push(`${o} ${c} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||s(a,"appeared");for(const a of i.before)i.now.has(a)||s(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,s=i.viewMargin,a=nh(t),o={x:r.position.x,y:r.position.y,z:r.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,d=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,f=this.budget.radius,u=Math.min(i.haze.far,f+s/2),p=Math.abs(f-this.lastBuild.radius)>=s/3,m=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!d&&!m&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,s),x=(M.minX+M.maxX)/2,g=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2,S=[],y=ot.uMoonDir.value,A=-y.x/Math.max(.2,y.y),b=-y.z/Math.max(.2,y.y),E=new Map,_=(k,ee)=>{let H=E.get(k);H||E.set(k,H=[]),H.push(ee)},w=this.mpp;let L=0,R=0;for(const k of t.forest.treesNear(x,g,v)){const ee=this.assets.typeArt(k.type);if(!ee||!ee.layout.big.length)continue;const H=ee.atlas.frames,Z=ee.layout.big[iy(ee.layout.bigWeight,k.variant)],N=H[Z.top??Z.bot];if(!this.inView(k.x,k.z,N.w*w,N.h*w,s,u))continue;const Y=N.h*w,j=i.treeCap,oe=Y>j.from?(j.from+(Y-j.from)*j.keep)/Y:1,he=this.mark("tree",k.x,k.z,Y*oe);_(k.type,{x:k.x,y:0,z:k.z,frame:H[Z.bot],flip:k.flip,fresh:he,scale:oe}),Z.top!==null&&_(k.type,{x:k.x,y:0,z:k.z,frame:H[Z.top],flip:k.flip,top:!0,fresh:he,scale:oe});const xe=N.w*w,q=N.h*w*(Z.top===null?.2:.6);i.shadows.trees&&S.push({x:k.x+A*q,z:k.z+b*q,w:xe*.8,d:xe*.45,scenery:!0}),L++}const P=(k,ee,H)=>{for(const Z of ee){const N=this.assets.typeArt(Z.type);if(!N)continue;const Y=H(N.layout);if(!Y.length)continue;const j=Y[Z.variant%Y.length],oe=N.atlas.frames,he=oe[j.bot],xe=oe[j.top??j.bot],q=k==="setpiece"?i.setPieceScale:1,ie=w*q;if(!this.inView(Z.x,Z.z,xe.w*ie,xe.h*ie,s,u))continue;const W=this.mark(k,Z.x,Z.z,xe.h*ie);_(Z.type,{x:Z.x,y:0,z:Z.z,frame:he,flip:Z.flip,fresh:W,scale:q}),j.top!==null&&_(Z.type,{x:Z.x,y:0,z:Z.z,frame:oe[j.top],flip:Z.flip,top:!0,fresh:W,scale:q}),S.push({x:Z.x,z:Z.z,w:he.w*ie*.8,d:he.w*ie*.3,scenery:!0}),R++}};P("small",t.forest.bushesNear(x,g,v),k=>k.small),P("wall",t.forest.wallsNear(x,g,v),k=>k.walls.map(ee=>({bot:ee,top:null}))),P("setpiece",t.forest.setPiecesNear(x,g,v),k=>k.set===null?[]:[k.set]);const O=this.assets.decorArt(),I=[];if(O)for(const k of t.forest.decorNear(x,g,v)){const ee=O.families[k.family];if(!ee?.length)continue;const H=ee[k.variant%ee.length],Z=O.atlas.frames,N=Z[H.bot],Y=Z[H.top??H.bot];if(!this.inView(k.x,k.z,Y.w*w,Y.h*w,s,u))continue;const j=this.mark("decor",k.x,k.z,Y.h*w);I.push({x:k.x,y:0,z:k.z,frame:N,flip:k.flip,fresh:j}),H.top!==null&&I.push({x:k.x,y:0,z:k.z,frame:Z[H.top],flip:k.flip,top:!0,fresh:j}),S.push({x:k.x,z:k.z,w:N.w*w*.8,d:N.w*w*.3,scenery:!0}),R++}const U=this.assets.pathPieceArt();if(U){const k=[],ee=zt.uRight.value;for(const H of t.map.paths.pieces){if(Math.abs(H.x-x)>v||Math.abs(H.z-g)>v)continue;const Z=U.byId[H.id];if(!Z)continue;const N=U.atlas.frames[Z.frame],Y=(Z.originX-N.w/2)*w,j=H.x-ee.x*Y,oe=H.z-ee.z*Y;this.inView(j,oe,N.w*w,N.h*w,s,u)&&(k.push({x:j,y:0,z:oe,frame:N,flip:!1,fresh:this.mark("pathpiece",H.x,H.z,N.h*w)}),S.push({x:H.x,z:H.z,w:N.w*w*.7,d:N.w*w*.25,scenery:!0}),R++)}this.batchFor(this.decorBatches,"pieces",()=>new ti(U.atlas,w,{scenery:!0,fade:!0}))?.set(k)}const z=this.assets.relicArt();if(z){const k=this.camera.getWorldDirection(this.v3b),ee=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),H=zt.uUp.value,Z=zt.uRight.value,N=H.dot(ee)/Math.max(.2,-k.y),Y=[],j=[],oe=(he,xe,q,ie)=>{const W=z.atlas.frames[he.frame],pe=(he.originX-W.w/2)*w*(ie?-1:1),ce=(W.h-he.originY)*w*N,Ae=xe-Z.x*pe,ge=q-Z.z*pe+ce;this.inView(Ae,ge,W.w*w,W.h*w,s,u)&&((he.decal?j:Y).push({x:Ae,y:0,z:ge,frame:W,flip:ie,fresh:this.mark("relic",xe,q,W.h*w)}),he.decal||S.push({x:xe,z:q,w:W.w*w*.6,d:W.w*w*.22,scenery:!0}),R++)};if(z.modern.length)for(const he of t.forest.relicsNear(x,g,v))oe(z.modern[he.variant%z.modern.length],he.x,he.z,he.flip);for(const he of t.map.grounds)if(!(Math.abs(he.x-x)>v+he.r||Math.abs(he.z-g)>v+he.r))for(const xe of z.layouts[he.kind]??[]){const q=z.byId[xe.id];q&&oe(q,he.x+xe.x,he.z+xe.z,!1)}this.batchFor(this.decorBatches,"relics",()=>new ti(z.atlas,w,{scenery:!0,fade:!0}))?.set(Y),this.batchFor(this.decorBatches,"decals",()=>{const he=new ti(z.atlas,w,{scenery:!0,flat:!0});for(const xe of he.meshes)xe.renderOrder=-.5,xe.material.depthWrite=!1;return he})?.set(j)}O&&this.batchFor(this.decorBatches,"all",()=>new ti(O.atlas,w,{scenery:!0,fade:!0}))?.set(I);for(const[k,ee]of this.typeBatches)E.has(k)||ee.set([]);for(const[k,ee]of E)this.batchFor(this.typeBatches,k,()=>{const Z=this.assets.typeArt(k);return Z&&new ti(Z.atlas,w,{scenery:!0,fade:!0})})?.set(ee);{const k=t.map.treehouse;S.push({x:k.x,z:k.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+s),this.stats.trees=L,this.stats.bushes=R,this.shadowList=S}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const d=c.leashed?this.assets.partyArt(c.species,c.id,Ls(c.species)):void 0,f=d??this.assets.creatureArt(c.species),u=d?`party-${c.id}`:c.species;if(!f)continue;s.set(u,f);const p=f.atlas.frames[f.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const m=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=r.get(u);M||r.set(u,M=[]);const x=(e/o+c.id%4*.25)*Math.PI,g=c.leashed?Math.abs(Math.sin(x))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(x*.5)*.12:0;M.push({x:c.x+v,y:g,z:c.z,frame:p,flip:c.facing<0,fresh:m}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,d]of this.creatureBatches)r.has(c)||d.set([]);for(const[c,d]of r)this.batchFor(this.creatureBatches,c,()=>{const u=s.get(c);return u&&new ti(u.atlas,this.mpp)})?.set(d);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new V(1,.5,.16);runeCyan=new V(.3,.9,1);runeViolet=new V(.75,.45,1);runeGreen=new V(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=Ce(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:h,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(i),this.forestLights=r}setLights(e,t,i){const r=Math.min(jr,this.game.tuning.lightBudget),s=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,d)=>c.d-d.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=ot;let h=0;for(const{l:c,d}of s.slice(0,r)){const f=Math.min(1,Math.max(0,(a-d)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Tc(new jt,new dd({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=zt.uRight.value,i=zt.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,m)=>[a.x+t.x*p*o+i.x*m*a.h,t.y*p*o+i.y*m*a.h,a.z+t.z*p*o+i.z*m*a.h],c=h(-1,0),d=h(1,0),f=h(1,1),u=h(-1,1);r.push(...c,...d,...d,...f,...f,...u,...u,...c,...c,...f)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new Ot(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const i=this.game,r=i.tuning,s=nh(i);if(t){const ge=performance.now();this.lastReal&&(this.budget=ny(this.budget,(ge-this.lastReal)/1e3,r)),this.lastReal=ge}this.sceneryFixed!==null&&(this.budget.radius=Math.min(r.haze.far,Math.max(1,this.sceneryFixed))),ot.uScenery.value.set(this.budget.radius,Math.max(1,r.scenery.fade));const a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,h=new V(0,Math.cos(a),-Math.sin(a)),c=new V(s.tx,s.ty,s.tz),d=c.dot(h),f=c.x;c.addScaledVector(h,Math.round(d/o)*o-d),c.x+=Math.round(f/o)*o-f;const u=new V(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=r.spriteTilt;zt.uUp.value.set(0,1,0).lerp(h,p).normalize(),zt.uFacing.value.crossVectors(zt.uRight.value,zt.uUp.value).normalize();const m=jc(i.witch),M=r.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,es(i.witch,r)*.5,i.witch.z).project(this.camera);zt.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-m),Math.max(1,M.edge*this.width*(1-m))),zt.uTopFade.value=m,zt.uDebugCull.value=this.debugCull?1:0;const g=i.witch,v=es(g,r);ot.uGlowPos.value.set(g.x,v+r.glowHeight,g.z),ot.uHazeCentre.value.set(g.x,g.z),this.updateSources(e);const S=this.partyView.update(i,e,(ge,Me,Se,Ie)=>this.inView(ge,Me,Se,Ie,4),()=>!1);this.soundBatch.set(S.items),this.ground.setSweeps(S.sweeps),this.lasers.update(e,S.playing,g.x,g.z);{const ge=zt,Me=r.party,Se=[...i.party.areas.values()].map(Ie=>({a:Ie,s:i.map.siteOf(Ie.cell[0],Ie.cell[1])})).sort((Ie,He)=>Math.hypot(Ie.s.x-g.x,Ie.s.z-g.z)-Math.hypot(He.s.x-g.x,He.s.z-g.z)).slice(0,16);Se.forEach(({a:Ie,s:He},st)=>{const Ct=Ie.wave===0?1:Math.min(1,Math.max(0,(e-Ie.at)/Math.max(.01,Me.transition)));ge.uParty.value[st].set(He.x,He.z,i.map.areaSize*.85,Ct);const Nt=Ls(Xt[i.map.typeOf(Ie.cell[0],Ie.cell[1])].creature);ge.uPartyCol.value[st].set(Nt[0]/255,Nt[1]/255,Nt[2]/255)}),ge.uPartyCount.value=Se.length,ge.uUplight.value.set(Me.uplight.strength,Me.uplight.pulse,Me.uplight.edge,e*r.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const y=this.assets.treehouse,A=y.atlas.frames[0],b=i.map.treehouse,E=zt,_=(ge,Me)=>{const Se=E.uRight.value,Ie=E.uUp.value,He=(ge-y.base.x)*this.mpp,st=(A.h-Me)*this.mpp;return{x:b.x+Se.x*He+Ie.x*st,y:Se.y*He+Ie.y*st,z:b.z+Se.z*He+Ie.z*st}},w=y.lights.filter(ge=>ge.kind==="lantern"||ge.kind==="window").slice(0,2).map(ge=>({..._(ge.x,ge.y),reach:r.treehouse.lightReach,rgb:new V(ge.rgb[0]/255,ge.rgb[1]/255,ge.rgb[2]/255),strength:r.treehouse.lightStrength*(.92+.08*Math.sin(e*3+ge.x))}));this.setLights([this.dancefloor.update(e,this.ground),...S.lights,...w,...this.forestLights],g.x,g.z),ot.uTime.value=e,this.mist?.follow(s.tx,s.tz);const L=Math.sin(e*2.4)*.12,R=g.mode==="rising"&&g.lift<.9,P=g.mode==="descending"&&g.lift>.1;let O=R||P?(R?8:12)+(g.away?2:0)+Math.floor(e*7)%2:g.lean?6+(g.away?1:0):(g.away?3:0)+Math.floor(e*4)%3;if(!R&&!P){const ge=this.assets.witchFly,Me=g.away?"away":"towards";g.braking?O=ge.brake[Me][Math.floor(e*ge.brake.fps)%ge.brake[Me].length]:(g.boost??0)>.7&&(O=ge.fast[Me][Math.floor(e*ge.fast.fps)%ge.fast[Me].length])}const I=i.leash,U=this.assets.witchFoot,z=g.away?"away":"towards";for(const ge of I.events)ge.kind==="placed"||ge.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:ge.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const k=this.footAct?U[this.footAct.pose].towards.length/U[this.footAct.pose].fps:0,ee=!!this.footAct&&e-this.footAct.at<k+.3,H=g.mode==="ground"&&(I.talk||I.held||ee)?1:0,Z=Math.min(.1,Math.max(0,e-this.footTime)),N=this.foot;this.footTime=e,this.foot+=(H-this.foot)*Math.min(1,Z*8),Math.abs(H-this.foot)<.01&&(this.foot=H);const Y=(ge,Me)=>{const Se=U[ge][z];return Se[Math.max(0,Math.min(Se.length-1,Me))]};this.foot>.6?ee&&this.footAct?O=Y(this.footAct.pose,Math.floor((e-this.footAct.at)*U[this.footAct.pose].fps)):I.talk?O=Y("talk",Math.floor(e*U.talk.fps)%U.talk[z].length):O=Y("stand",Math.floor(e*U.stand.fps)%U.stand[z].length):this.foot>.02&&(O=this.foot>=N?Y("land",Math.floor(this.foot*3)):Y("takeoff",Math.floor((1-this.foot)*3)));const j=this.foot*this.foot*(3-2*this.foot),oe=(v+L-.4)*(1-j),he=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=g.seated?1:Math.max(0,this.seatK-he/.6);let xe=g.x,q=g.z,ie=oe;if(this.seatK>0){const ge=_(y.seat.x,y.seat.y),Me=this.seatK*this.seatK*(3-2*this.seatK),Se=this.camera.getWorldDirection(this.v3);xe+=(ge.x-Se.x*.6-xe)*Me,ie+=(ge.y-Se.y*.6-ie)*Me,q+=(ge.z-Se.z*.6-q)*Me,g.seated&&(O=U.sit.towards[Math.floor(e*U.sit.fps)%U.sit.towards.length])}const W=this.assets.witch.frames[O],pe=ie+W.h*this.mpp;this.witchBatch.set([{x:xe,y:ie,z:q,frame:W,flip:g.seated?!1:g.facing<0}]);{const ge=(He,st,Ct)=>{const Nt=this.v3.set(He,st,Ct).project(this.camera);return[(Nt.x+1)/2*this.width,(Nt.y+1)/2*this.height]},Me=ge(xe,ie,q),Se=ge(xe,pe,q),Ie=ge(xe+W.w*this.mpp/2,ie,q);zt.uWitch.value.set((Me[0]+Se[0])/2,(Me[1]+Se[1])/2,Math.abs(Ie[0]-Me[0])+1,Math.abs(Se[1]-Me[1])/2+1),zt.uWitchDepth.value=-this.v3.set(xe,this.seatK>0?ie:v,q).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(xe,.03,q),this.shadow.scale.setScalar((1-.5*jc(g))*(1-this.seatK)+.001),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,g.x,g.z);const ce=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,ce.x,ce.z,g.x,g.z,e,r.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,pe),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),g.x,g.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let Ae=0;for(const ge of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])Ae+=ge.dropped;Ae&&!this.stats.dropped&&console.warn(`view: ${Ae} sprite instances set but not drawn`),this.stats.dropped=Ae,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const sy="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",ay="Lab default",oy={},ly={_readme:sy,name:ay,style:oy};function cy(n=ly){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=Yb();for(const[r,s]of Object.entries(t))r in i&&(i[r]=s);return i}function hy(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||s!==null)){h(),s=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==s)return;let m=p.clientX-a,M=p.clientY-o;const x=Math.hypot(m,M);x>r&&(m*=r/x,M*=r/x),i.style.transform=`translate(${m}px, ${M}px)`;const g=Math.min(1,x/r),v=.15,S=g<v?0:(g-v)/(1-v)/Math.max(1e-6,g);e.x=m/r*S,e.y=M/r*S});const d=p=>{p.pointerId===s&&(s=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d);const f=(p,m)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),m(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const uy=[{version:null,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],dy={entries:uy},yn=new URLSearchParams(location.search);let xr=Q0(yn.get("seed"));xr===null&&(xr=Math.floor(Math.random()*1e6),yn.set("seed",String(xr)),history.replaceState(null,"","?"+yn.toString()+location.hash));const rn={...ir,bloom:{...ir.bloom},tiltShift:{...ir.tiltShift},shadows:{...ir.shadows},canopyShadow:{...ir.canopyShadow},mist:{...ir.mist},party:{...ir.party}};yn.get("shadows")==="off"&&(rn.shadows.on=!1);yn.get("canopy")==="off"&&(rn.canopyShadow.on=!1);yn.get("mist")==="off"&&(rn.mist.on=!1);const _a=yn.get("tilt");_a==="off"?rn.tiltShift.on=!1:(_a==="before"||_a==="after")&&(rn.tiltShift.on=!0,rn.tiltShift.where=_a);yn.get("bloom")==="off"&&(rn.bloom.on=!1);yn.get("moonbeams")==="on"&&(rn.moonbeams=1);const il=yn.get("fx");(il==="pixel"||il==="smooth")&&(rn.fx=il);const tn=Lp(xr,rn),Od=[30,60,120,300,600,0];function Nd(n){rn.party.interval=n>0?n:1e9,tn.party.paused=n===0,tn.party.nextAt=tn.clock.time+rn.party.startDelay+rn.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Pc=rn.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&Od.includes(+n)&&(Pc=+n)}catch{}const rl=yn.get("wave");rl!==null&&(Pc=rl==="off"?0:Math.max(0,+rl||0));const fy=document.getElementById("game"),sl=cy(),ri=new ry(fy,tn,{...sl,pixel:rn.pixelSize,treeSize:sl.treeSize*rn.treeHeight,crownWidth:sl.crownWidth*rn.crownWidth/rn.treeHeight});ri.debugCull=yn.get("debug")==="cull";const gu=Number(yn.get("scenery"));yn.has("scenery")&&gu>0&&(ri.sceneryFixed=gu);const us=new jg;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),us.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),us.touch.pauseWaves=!0});hy(document.body,us.touch);ri.rulers.on=yn.has("debug");const Fd=()=>{ri.rulers.on=!ri.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&Fd()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),Fd()});const Ud=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&Ud.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=Ud.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v137 · f5f4ca1";const py=document.getElementById("news"),my="v137 · f5f4ca1".split(" ")[0],gy=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);py.innerHTML="<b>What's new</b>"+dy.entries.slice(0,3).map(n=>`<div>${n.version===null?`${my} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${gy(e)}</li>`).join("")}</ul>`).join("");const xy=document.getElementById("seed");xy.innerHTML=`seed <a href="?seed=${xr}">${xr}</a>`;const jl=document.getElementById("debug"),Dc=document.getElementById("start"),kd=document.getElementById("debug-buttons"),Ic=document.getElementById("wave"),My=Ic.querySelector(".fill"),vy=Ic.querySelector(".label");let Qi=yn.has("debug");jl.classList.toggle("on",Qi);kd.classList.toggle("on",Qi);const Bd=()=>ri.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Bd);Bd();let ao=!1;requestAnimationFrame(()=>setTimeout(async()=>{await ri.prepare(),ao=!0,Dc.classList.remove("loading")},0));let xu=null;function zd(){if(!ao||!tn.clock.paused)return!1;try{xu??=new AudioContext,xu.resume()}catch{}return tn.clock.paused=!1,Dc.style.display="none",us.clearPresses(),!0}us.onAny=zd;Dc.addEventListener("pointerdown",n=>{n.preventDefault(),zd()});const Hd=document.getElementById("waves");Hd.innerHTML="waves every "+Od.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");Hd.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;Nd(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});Nd(Pc);document.addEventListener("visibilitychange",()=>{document.hidden&&(Da=0)});let Da=0,Mu=60,al=0,ba=0;function Gd(n){requestAnimationFrame(Gd);const e=Da?(n-Da)/1e3:0;Da=n,al++,ba+=e,ba>=.5&&(Mu=al/ba,al=0,ba=0);const t=us.read();if(t.debug&&(Qi=!Qi,jl.classList.toggle("on",Qi),kd.classList.toggle("on",Qi)),ri.debugReadouts=Qi,Pp(tn,t,e),!ao)return;const i=Cp(tn.party,tn.map,tn.clock.time);My.style.height=`${(1-i.gone)*100}%`;const r=rn.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(vy.textContent=`wave ${tn.party.wave} · ${tn.party.areas.size} areas · ${r}`,Ic.classList.toggle("paused",tn.party.paused),ri.render(tn.clock.time),Qi){const s=tn.witch,a=ri.stats;jl.textContent=[`fps    ${Mu.toFixed(0)}`,`seed   ${xr}`,`area   ${Gu(tn)}`,`mode   ${s.mode}`,`at     ${s.x.toFixed(0)}, ${s.z.toFixed(0)} m   zoom ${tn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Gd);window.witch={game:tn,view:ri,areaUnderWitch:()=>Gu(tn),areaTypeId:n=>Xt[n].id,get ready(){return ao}};
