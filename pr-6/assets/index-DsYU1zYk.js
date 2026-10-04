(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function zi(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Pe(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Ui(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=Pe(i,s,t),f=Pe(i+1,s,t),d=Pe(i,s+1,t),u=Pe(i+1,s+1,t);return c+(f-c)*o+(d-c)*h+(c-f-d+u)*o*h}const qn=(n,e,t)=>n+(e-n)*t,Dn=(n,e,t)=>Math.min(t,Math.max(e,n)),nn=n=>{const e=Dn(n,0,1);return e*e*(3-2*e)};function Jd(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=Dn(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function uo(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function Qd(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),c=Dn(n.zoomStep+Math.sign(e),0,h-1),f=h>1?c/(h-1):0;let d=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(d,u);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*r),M=n.ax+(d-n.ax)*m,g=n.az+(u-n.az)*m,[x,v]=uo(n.tx,n.vx,t.x+M,o.follow,r),[S,y]=uo(n.ty,n.vy,t.y,o.follow,r),[E,b]=uo(n.tz,n.vz,t.z+g,o.follow,r),A=n.zoom+(f-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r)),w=a.treetop,C=Dn((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(w.boost-1)),0,1),R=(n.pull??0)+(w.cameraPull*C*nn(_)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:c,zoom:A,tx:x,ty:S,tz:E,vx:v,vy:y,vz:b,ax:M,az:g,lift:Dn(_,0,1),pull:R}}function yu(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=nn(e),a=qn(qn(i.angleIn,i.angleOut,n.zoom),qn(s.angleIn,s.angleOut,n.zoom),r),o=qn(qn(i.distanceIn,i.distanceOut,n.zoom),qn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const jd=.1,ef=()=>({time:0,paused:!0});function tf(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(jd,e);return n.time+=t,t}const nf={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},sf={types:nf};function Ja(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Fr(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const me=(n,e,t)=>e+(t-e)*n(),sc=(n,e)=>e[Math.floor(n()*e.length)];function dt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function bi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=dt(i,s,t),f=dt(i+1,s,t),d=dt(i,s+1,t),u=dt(i+1,s+1,t);return c+(f-c)*o+(d-c)*h+(c-f-d+u)*o*h}function de(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,c,f]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(f*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},fo=4;function Su(n,e,t,i=.12){const s=(r,a,o,h)=>{const c=o-r,f=h-a,d=Math.max(0,Math.min(1,((n-r)*c+(e-a)*f)/(c*c+f*f)));return Math.hypot(n-r-c*d,e-a-f*d)<i};switch((t%fo+fo)%fo){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const rf=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Kc(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),c=r(o),f=r(o+1),d=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(f[0]-c[0],f[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const m=p/u,M=m*m,g=M*m;s.push([0,1].map(x=>.5*(2*c[x]+(-h[x]+f[x])*m+(2*h[x]-5*c[x]+4*f[x]-d[x])*M+(-h[x]+3*c[x]-3*f[x]+d[x])*g)))}}return e||s.push(n[i-1]),s}function af(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const c=n[Math.max(0,h-1)],f=n[Math.min(r-1,h+1)];let d=f[0]-c[0],u=f[1]-c[1];const p=Math.hypot(d,u)||1;d/=p,u/=p;const m=n[h][2]/2;i.push([n[h][0]-u*m,n[h][1]+d*m]),s.push([n[h][0]+u*m,n[h][1]-d*m])}const a=(h,c,f,d)=>{let u=h[0]-c[0],p=h[1]-c[1];const m=Math.hypot(u,p)||1;return[h[0]+u/m*f/2*d,h[1]+p/m*f/2*d]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const xt=(n,e)=>[n[0]+e[0],n[1]+e[1]],Tn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Qa(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let f=c[0]-h[0],d=c[1]-h[1];const u=Math.hypot(f,d)||1,p=d/u*r,m=-f/u*r;for(let M=1;M<=i;M++){const g=(M-.5)/i,x=Tn(h,c,g),v=[x[0]+p*s-f/u*s*.5,x[1]+m*s-d/u*s*.5];a.push(Tn(h,c,g-.45/i),v,Tn(h,c,g+.35/i))}}return a}function qc(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let c=0,f=t.length-1;c<t.length;f=c++){const[d,u]=t[c],[p,m]=t[f];u>o!=m>o&&h.push(d+(o-u)/(m-u)*(p-d))}h.sort((c,f)=>c-f);for(let c=0;c+1<h.length;c+=2)for(let f=Math.max(0,Math.ceil(h[c]-.5));f<=Math.min(n-1,Math.floor(h[c+1]-.5));f++)i[a*n+f]=1}return i}function of(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,c,f,d,u)=>{const p=c+d,m=f+u;let M,g;if(p<0||m<0||p>=n||m>=e)M=d,g=u;else{const x=m*n+p;M=s[x]+d,g=r[x]+u}M*M+g*g<a(h)&&(s[h]=M,r[h]=g)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const f=h*n+c;t[f]&&(o(f,c,h,-1,0),o(f,c,h,0,-1),o(f,c,h,-1,-1),o(f,c,h,1,-1))}for(let c=n-1;c>=0;c--){const f=h*n+c;t[f]&&o(f,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const f=h*n+c;t[f]&&(o(f,c,h,1,0),o(f,c,h,0,1),o(f,c,h,1,1),o(f,c,h,-1,1))}for(let c=0;c<n;c++){const f=h*n+c;t[f]&&o(f,c,h,-1,0)}}return{vx:s,vy:r}}class ft{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:f=0,round:d=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(u+.5-t)/s,g=m*m+M*M;if(g>1)continue;const x=u*this.w+p;if(o&&!o.has(this.m[x]))continue;if(h<1){const E=c?bi(p/3.2,u/3.2,f)*c+(1-c)*.5:.5;if(dt(p,u,f+77)>h*(.4+E*1.2)*(1.15-g*.5))continue}const v=m*d,S=M*d,y=Math.hypot(v,S,Math.sqrt(Math.max(0,1-g))+.15);this.px(p,u,r,v/y,S/y,(Math.sqrt(Math.max(0,1-g))+.15)/y)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let f=0;f<=c;f++){const d=f/c,u=e+(i-e)*d,p=t+(s-t)*d,m=Math.max(.5,(r+(a-r)*d)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let g=Math.floor(u-m);g<=u+m;g++){const x=(g+.5-u)/m,v=(M+.5-p)/m;if(x*x+v*v>1)continue;const S=x*h,y=Math.hypot(S,v*.3,1);this.px(g,M,o,S/y,v*.3/y,1/y)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const c=(m,M,g,x,v,S)=>(m-v)*(x-S)-(g-v)*(M-S),f=Math.max(0,Math.floor(Math.min(i,r,o))),d=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let m=u;m<p;m++)for(let M=f;M<d;M++){const g=M+.5,x=m+.5,v=c(g,x,i,s,r,a),S=c(g,x,r,a,o,h),y=c(g,x,o,h,i,s);(v<0||S<0||y<0)&&(v>0||S>0||y>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(qc(this.w,this.h,Kc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(af(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:f=l.LINE}={}){const{w:d,h:u}=this;if(o)for(let g=0;g<d*u;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:p,vy:m}=of(d,u,e);let M=r;if(!M){for(let g=0;g<d*u;g++)e[g]&&(M=Math.max(M,Math.hypot(p[g],m[g])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let g=0;g<u;g++)for(let x=0;x<d;x++){const v=g*d+x;if(!e[v])continue;if(h){this.m[v]=t;continue}const S=Math.hypot(p[v],m[v]),y=Math.min(1,Math.max(0,(S-.5)/M)),E=Math.min(2.6,(1-y)/Math.sqrt(Math.max(.02,1-(1-y)*(1-y))))*a;let b=p[v]/(S||1)*E+c[0],A=m[v]/(S||1)*E+c[1];const _=Math.hypot(b,A,1);this.m[v]=t,this.n[v*3]=b/_,this.n[v*3+1]=A/_,this.n[v*3+2]=1/_}if(s&&!h){const g=[];for(let x=0;x<u;x++)for(let v=0;v<d;v++){const S=x*d+v;if(e[S])for(const[y,E]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=v+y,A=x+E;if(b<0||A<0||b>=d||A>=u)continue;const _=A*d+b;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==f){g.push(S);break}}}for(const x of g)this.m[x]=f}if(!h)for(let g=0;g<d*u;g++)e[g]&&(this.g[g]=i);return e}mark(e,t,i,s={}){return this.fillMask(qc(this.w,this.h,Kc(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(f=>f.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((f,d)=>[...f].forEach((u,p)=>{const m=t[u];if(!m)return;const M=i+(a?o-1-p:p),g=s+d;this.inb(M,g)&&(h[g*this.w+M]=1,c.set(g*this.w+M,m))})),this.fillMask(h,l.BODY,{round:r,depth:2.5});for(const[f,d]of c)this.m[f]=d}}function bn(n,e,t,i=t.outline,s=Ja){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),c=o(),f=o(),d=h.getContext("2d").createImageData(r,a),u=c.getContext("2d").createImageData(r,a),p=f.getContext("2d").createImageData(r,a),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let g=0;g<r;g++){const x=M*r+g,v=n.m[x],S=x*4;if(!v){if(!m)continue;const _=[n.get(g+1,M),n.get(g-1,M),n.get(g,M+1),n.get(g,M-1)].find(C=>C);if(!_)continue;const w=m==="tint"?(e[_]||[0,0,0]).map(C=>C*.35|0):m;d.data.set([...w,255],S),u.data.set([128,128,255,255],S),p.data.set([128,128,255,255],S);continue}let y=e[v];v===l.LINE&&!y&&(y=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(_=>_*.55|0):m),y=y||[255,0,255],d.data.set([...y,rf.has(v)?254:255],S);const E=n.n[x*3],b=n.n[x*3+1],A=n.n[x*3+2];u.data.set([E*127+128,b*127+128,A*255,255],S),p.data.set([-E*127+128,b*127+128,A*255,255],S)}return h.getContext("2d").putImageData(d,0,0),c.getContext("2d").putImageData(u,0,0),f.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:f,w:r,h:a}}const ts=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Lr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Gt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],$n=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],L={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:$n,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ts,cross:Lr,dot:Gt};function $c(n,e=[0,1,0]){const t=ts(n);let i=Lr(e,t);Math.hypot(...i)<1e-4&&(i=Lr([0,0,1],t)),i=ts(i);const s=Lr(t,i);return[t,s,i]}function wu(n,e){const t=Gt(n,e.axes[0]),i=Gt(n,e.axes[1]),s=Gt(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),c=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(r,a,o)}function Eu(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,c=Gt(n,t),f=c-i,d=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=Gt(d,d),p=c*c*i,m=f*f*i,M=Math.sign(s)*s*s*u;return Math.sign(f)*r*m>M?Math.sqrt(u+m)*a-h:Math.sign(c)*r*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*r*a)+c*s)*a-o}function Au(n,e){const t=Math.abs(Gt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Gt(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Gt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const lf=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Zc=(n,e)=>n.type==="ell"?wu($n(e,n.cw),n):n.type==="box"?Au($n(e,n.cw),n):Eu($n(e,n.aw),n),fr=(n,e)=>n.rough?Zc(n,e)+lf(e,n.rough):Zc(n,e);class qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?$c(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?$c(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:ts(t),v:ts(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=wu($n(e,i.c),i);else if(i.type==="box")s=Au($n(e,i.c),i);else{const r=$n(i.b,i.a),a=Math.max(1e-9,Gt(r,r)),o=i.r1-i.r2;s=Eu($n(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const Jc={towards:.6,away:-.6},cf=.52;function mn(n,{height:e,scale:t,facing:i="towards",yaw:s=Jc[i]??Jc.towards,pitch:r=cf,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),c=Math.cos(r),f=Math.sin(r),d=N=>[N[0]*o-N[2]*h,N[1],N[0]*h+N[2]*o],u=N=>[N[0]*o+N[2]*h,N[1],-N[0]*h+N[2]*o],p=[0,-f,-c],m=[0,c,-f],M=[1,0,0],g=[0,f,c],x=n.blend,v=n.parts.map(N=>{if(N.type==="ell"){const xe=d(N.c),Me=N.axes.map(d),ye=Math.max(...N.r);return{...N,cw:xe,axes:Me,bc:xe,br:ye+(N.rough||0)*1.5}}if(N.type==="box"){const xe=d(N.c),Me=N.axes.map(d);return{...N,cw:xe,axes:Me,bc:xe,br:Math.hypot(...N.h)+(N.rough||0)*1.5}}const Z=d(N.a),j=d(N.b),ce=$n(j,Z),oe=Math.max(1e-9,Gt(ce,ce)),fe=N.r1-N.r2;return{...N,aw:Z,ba:ce,l2:oe,rr:fe,a2:oe-fe*fe,il2:1/oe,bc:L.lerp(Z,j,.5),br:Math.sqrt(oe)/2+Math.max(N.r1,N.r2)}}),S=n.flats.map(N=>{const Z=d(N.c),j=d(N.u),ce=d(N.v);return{...N,cw:Z,uw:j,vw:ce,nw:ts(Lr(j,ce)),bc:Z,br:Math.hypot(N.su,N.sv)}}),y=[...v,...S],E=N=>{const Z=Gt(N.bc,M),j=Gt(N.bc,m),ce=N.br+(N.uw?0:x);return[Z-ce,Z+ce,j-ce,j+ce]};for(const N of y)[N.x0,N.x1,N.u0,N.u1]=E(N);const b=y.filter(N=>!N.extra&&!N.cut),A=Math.min(...b.map(N=>N.u0+(N.uw?0:x))),_=Math.max(...b.map(N=>N.u1-(N.uw?0:x))),w=t??e/Math.max(1e-6,_-A),C=Math.min(...y.map(N=>N.x0)),R=Math.max(...y.map(N=>N.x1)),P=Math.min(...y.map(N=>N.u0)),I=Math.max(...y.map(N=>N.u1)),O=Math.ceil((R-C)*w)+4,k=Math.ceil((I-P)*w)+2,G=new ft(O,k),K=new Float32Array(O*k).fill(1/0),ie=new Int16Array(O*k).fill(-1),q=8,se=Math.ceil(O/q),F=Math.ceil(k/q),ee=Array.from({length:se*F},()=>[]);y.forEach((N,Z)=>{const j=Math.max(0,Math.floor((N.x0-C)*w/q)),ce=Math.min(se-1,Math.floor(((N.x1-C)*w+2)/q)),oe=Math.max(0,Math.floor((I-N.u1)*w/q)),fe=Math.min(F-1,Math.floor(((I-N.u0)*w+1)/q));for(let xe=oe;xe<=fe;xe++)for(let Me=j;Me<=ce;Me++)ee[xe*se+Me].push(Z)});const ae=.25/w,ue=(N,Z)=>{const j=Math.max(x-Math.abs(N-Z),0)/x;return Math.min(N,Z)-j*j*x*.25};for(let N=0;N<k;N++)for(let Z=0;Z<O;Z++){const j=ee[Math.floor(N/q)*se+Math.floor(Z/q)];if(!j.length)continue;const ce=C+(Z+.5-1)/w,oe=I-(N+.5)/w,fe=L.add(L.add(L.mul(M,ce),L.mul(m,oe)),L.mul(g,50));let xe=1/0,Me=-1/0;const ye=[],We=[];for(const et of j){const Xe=y[et],U=$n(fe,Xe.bc),T=Gt(U,p),H=Xe.br+(Xe.uw?0:x),$=Gt(U,U)-H*H,te=T*T-$;if(te<0)continue;if(Xe.uw){We.push(Xe);continue}if(Xe.cut){ye.push(Xe);continue}const ge=Math.sqrt(te);xe=Math.min(xe,-T-ge),Me=Math.max(Me,-T+ge),ye.push(Xe)}let at=1/0,ht=-1,Tt=0,Dt=null;if(ye.length){const et=new Map;for(const T of ye){let H=et.get(T.group);H||et.set(T.group,H=[]),H.push(T)}const Xe=(T,H)=>{let $=1/0;for(const te of T)te.cut||($=$===1/0?fr(te,H):ue($,fr(te,H)));for(const te of T)te.cut&&($=Math.max($,-fr(te,H)));return $};let U=Math.max(0,xe);for(let T=0;T<96&&U<Me;T++){const H=L.add(fe,L.mul(p,U));let $=1/0,te=null;for(const[ge,_e]of et){const re=Xe(_e,H);re<$&&($=re,te=ge)}if($<ae){const ge=et.get(te),_e=.5/w;Dt=ts([Xe(ge,[H[0]+_e,H[1],H[2]])-Xe(ge,[H[0]-_e,H[1],H[2]]),Xe(ge,[H[0],H[1]+_e,H[2]])-Xe(ge,[H[0],H[1]-_e,H[2]]),Xe(ge,[H[0],H[1],H[2]+_e])-Xe(ge,[H[0],H[1],H[2]-_e])]);let re=ge[0],le=1/0;for(const be of ge){if(be.cut)continue;const Ue=fr(be,H);Ue<le&&(le=Ue,re=be)}for(const be of ge)if(be.cut&&-fr(be,H)>le-ae*2){re=be;break}at=U,ht=te,Tt=re.paint?re.paint(u(H),re)??re.mat:re.mat;break}U+=Math.max($*.9,ae*.5)}}for(const et of We){const Xe=Gt(p,et.nw);if(Math.abs(Xe)<1e-4)continue;const U=Gt($n(et.cw,fe),et.nw)/Xe;if(U>=at)continue;const T=L.add(fe,L.mul(p,U)),H=$n(T,et.cw),$=Gt(H,et.uw)/et.su,te=Gt(H,et.vw)/et.sv;if(Math.abs($)>1||Math.abs(te)>1)continue;const ge=et.mask($,te);if(!ge)continue;let _e=Xe>0?L.mul(et.nw,-1):et.nw;_e=ts(L.add(_e,L.add(L.mul(et.uw,$*et.bend),L.mul(et.vw,te*et.bend*.5)))),at=U,ht=et.group,Tt=ge,Dt=_e}if(!Dt||!Tt)continue;const Y=N*O+Z;K[Y]=at,ie[Y]=ht,G.px(Z,N,Tt,Gt(Dt,M),-Gt(Dt,m),Gt(Dt,g))}const ve=[];for(let N=0;N<k;N++)for(let Z=0;Z<O;Z++){const j=N*O+Z;if(G.m[j])for(const[ce,oe]of[[1,0],[-1,0],[0,1],[0,-1]]){const fe=Z+ce,xe=N+oe;if(fe<0||xe<0||fe>=O||xe>=k)continue;const Me=xe*O+fe;if(G.m[Me]&&ie[Me]!==ie[j]&&K[Me]-K[j]>a){ve.push(j);break}}}for(const N of ve)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(G.m[N])||(G.m[N]=l.LINE);for(let N=0;N<k;N++)for(let Z=0;Z<O;Z++){const j=N*O+Z;if(G.m[j]!==l.EYE)continue;const ce=N>0&&G.m[j-O]===l.EYE,oe=Z>0&&G.m[j-1]===l.EYE,fe=Z+1<O&&G.m[j+1]===l.EYE&&N+1<k&&G.m[j+O]===l.EYE;!ce&&!oe&&fe&&(G.m[j]=l.GLINT)}let Se=-1;for(let N=k-1;N>=0&&Se<0;N--)for(let Z=0;Z<O;Z++)if(G.m[N*O+Z]){Se=N;break}const B=Se>=0&&Se<k-1?k-1-Se:0;if(Se>=0&&Se<k-1){const N=k-1-Se;for(let Z=k-1;Z>=0;Z--)for(let j=0;j<O;j++){const ce=Z*O+j,oe=(Z-N)*O+j,fe=Z-N>=0;G.m[ce]=fe?G.m[oe]:0,G.g[ce]=fe?G.g[oe]:0;for(let xe=0;xe<3;xe++)G.n[ce*3+xe]=fe?G.n[oe*3+xe]:0}}return G.bodyH=Math.round((_-A)*w),{sp:G,s:w,project:N=>{const Z=d(N);return[+((Z[0]-C)*w+1).toFixed(1),+((I-Gt(Z,m))*w+B).toFixed(1)]}}}const oi=(n,e=9,t=.3)=>dt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,_s={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},hf={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},Qc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function uf(n,e=Qc){const t={...Qc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(hf)){const[o,h,c]=t[r];s[a]=de(i[r]??o,h,c)}return s[l.EYE]=[24,18,30],s[l.GLINT]=[255,255,245],s[l.NOSE]=[20,16,24],s[l.MAGIC]=de(n.glowHue??.13,.5,1),s[l.MAGIC2]=de(n.glowHue??.13,.15,1),s[l.BELLY]=[245,245,240],s}const df={rise:.78,descend:-.66,brake:.44};function ff(n){const e=new qe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=m=>i-s*(m/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,s*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,a(.5)+.03,m*.045]),h=[-1,1].map(m=>[.2,i+.24+r[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,g=M>0?7:5;e.seg(h[m],o[m],.04,.03,l.JACKET,{group:g}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:g})}const c=[.3+r[0],i+.27+r[1],0],f=[.07,i+.28+r[1]*.5,0],d=[-.15,i+.35+r[2],0];e.ell(f,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<f[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(d,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...L.add(d,[-.02,.06,0]),.07],[...L.add(d,[-.18,.08+r[0]*2,0]),.05],[...L.add(d,[-.34,.05+r[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([m,M],g)=>{const x=g?6:4,v=L.add(d,[-.04,0,g?.06:-.06]);e.seg(v,m,.055,.045,l.JEANS,{group:x}),e.seg(m,M,.045,.04,l.JEANS,{group:x}),e.ell(L.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:x,paint:S=>S[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const M=qe.surface(c,[.11,.115,.1],L.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(L.add(M,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(qe.surface(c,[.11,.115,.1],L.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...L.add(c,[-.06,.03,0]),.065],[...L.add(c,[-.22,.05+r[1]*2,.01]),.05],[...L.add(c,[-.4,.06+r[2]*3,.02]),.03],[...L.add(c,[-.55,.07+r[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(L.add(c,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...L.add(c,[-.005,.03,-.095]),.015],[...L.add(c,[-.02,.12,0]),.015],[...L.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=L.add(c,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...L.add(p,[-.02,.02,0]),.08],[...L.add(p,[-.14,.13,0]),.04],[...L.add(p,[-.3,.14+r[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(L.add(p,[.08,-.02,.08]),L.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11});for(const[m,M,g,x]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([m-v,M,g],[m-v-x,M,g],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const Tu={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},qs=.34,Ru={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},pf={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Ru})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,qs+.14,.15],far:[.18,qs+.14,-.13],hand:"rest"}))};function mf(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=L.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function gf(n,e){const t=pf[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Ru,...t[e%t.length]},s=new qe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?qs+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,c=!!i.broom.astride,f=o-.04,d=c?[1,0,0]:L.norm(i.broom.dir),u=c?[-.36,f,0]:i.broom.binding,p=w=>L.add(u,L.mul(d,w));s.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:d,group:3,paint:w=>{const C=L.dot(L.sub(w,u),d);return C<-.22?l.MAGIC2:C>-.01?l.BROOM:void 0}});for(const w of[-1,1]){const C=w>0?6:4,R=[h,o,w*.07],P=i.sit?i.swing*w:0,I=i.sit?[.24+P,.09+Math.max(0,P)*.6,w*.1]:w>0&&i.legUp?i.legUp:[(w>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),w*.1],O=i.sit?[.21,o+.01,w*.09]:mf(R,I,.21);s.seg(R,O,.055,.045,l.JEANS,{group:C}),s.seg(O,I,.045,.04,l.JEANS,{group:C});const k=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(L.add(I,k),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:C,paint:G=>G[1]<I[1]+k[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],g=[h,o+.03,0];s.ell(g,[.1,.08,.105],l.JEANS,{group:1});const x=L.add(g,L.add(L.mul(m,.19),[0,i.breathe,0]));s.ell(x,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:w=>L.dot(L.sub(w,x),M)>.045&&Math.abs(w[2])<.05?l.TOP:void 0}),s.chain([[...L.add(x,L.add(L.mul(M,-.07),L.mul(m,-.08))),.07],[...L.add(x,L.add(L.mul(M,-.11-a),L.mul(m,-.2))),.05],[...L.add(x,L.add(L.mul(M,-.13-a*1.6),L.mul(m,-.29))),.025]],l.JACKET,{group:12});const v=L.add(x,L.add(L.mul(m,.27),[i.look*.03,0,i.tilt*.04])),S=w=>L.add(x,L.add(L.mul(m,.1),[0,0,w*.12])),y=c?[.28,f+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,d[1]))),E=c?[.28,f+.03,.05]:i.free;for(const w of[-1,1]){const C=w>0?7:5,R=S(w),P=w>0?E:i.far||y,I=w>0&&i.elbow?i.elbow:L.add(L.lerp(R,P,.5),[-.03,-.02,w*.05]);s.seg(R,I,.04,.035,l.JACKET,{group:C}),s.seg(I,P,.035,.03,l.JACKET,{group:C});const O=w>0&&!c?i.hand:"grip";if(O==="palm")s.ell(P,[.045,.02,.04],l.SKIN,{group:C});else if(O==="down")s.ell(P,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:C});else if(O==="wave"){s.ell(P,[.03,.045,.04],l.SKIN,{group:C});for(const k of[-1,0,1])s.seg(L.add(P,[0,.03,k*.02]),L.add(P,[k*.01,.065,k*.03]),.01,.008,l.SKIN,{group:C})}else O==="point"?(s.ell(P,[.035,.03,.035],l.SKIN,{group:C}),s.seg(L.add(P,[0,.02,0]),L.add(P,[.01,.08,0]),.012,.01,l.SKIN,{group:C})):s.ell(P,[.035,.03,.035],l.SKIN,{group:C})}s.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:w=>w[0]<v[0]-.01||w[1]>v[1]+.075?l.HAIR:void 0});for(const w of[-1,1])s.ell(qe.surface(v,[.11,.115,.1],L.norm([.85,.05+i.look,w*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&s.ell(qe.surface(v,[.11,.115,.1],L.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),s.chain([[...L.add(v,[-.06,.02,0]),.06],[...L.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...L.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const w of[-1,1])s.ell(L.add(v,[-.015,0,w*.105]),[.05,.055,.03],l.PHONES,{group:10});s.chain([[...L.add(v,[-.005,.03,-.095]),.015],[...L.add(v,[-.005,.11,-.05]),.015],[...L.add(v,[-.005,.125,0]),.015],[...L.add(v,[-.005,.11,.05]),.015],[...L.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const b=L.add(v,[-.03,.1,i.tilt*.02]),A=i.tilt*.05,_=L.add(b,[-.16-a*.5,.27,A*2]);return s.ell(b,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...L.add(b,[0,.01,0]),.085],[...L.add(b,[-.05,.17,A]),.045],[..._,.012]],l.HAT,{group:11,paint:w=>w[1]<b[1]+.045?l.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),s.anchors.hand=E,s.anchors.hatTip=_,s}function Cu({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return ff(n);if(Tu[t])return gf(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new qe({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),f=.42+h,d=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,d)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],m=s?1:i?-.6:0;o.seg([-.5,f-c*2,0],[.62,f+c*3,0],.022,.018,l.BROOM,{group:2}),r?o.ell([-.56,f-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:S=>S[1]<f-.18?l.MAGIC2:S[1]>f-.01?l.BROOM:void 0}):o.ell([-.62,f-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:S=>S[0]<-.72?l.MAGIC2:S[0]>-.5?l.BROOM:void 0});for(const S of[-1,1]){const y=[-.04,f+.06,S*.07],E=r?[.18,f-.01,S*.14]:s?[.16,f-.05,S*.14]:i?[.06,f-.07,S*.14]:[.12+d*.5,f-.02,S*.14],b=r?S>0?[.44,f-.02+p,S*.13]:[.3,f-.16,S*.13]:s?[.2,f-.26,S*.13]:i?[-.1,f-.23,S*.13]:[.08+d,f-.2,S*.13];o.seg(y,E,.055,.045,l.JEANS,{group:S>0?6:4}),o.seg(E,b,.045,.04,l.JEANS,{group:S>0?6:4}),o.ell(L.add(b,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:S>0?6:4,paint:A=>A[1]<b[1]-.04?l.BELLY:void 0})}o.ell([-.04,f+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+d*.8,f+.26-Math.abs(d)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:S=>S[0]>M[0]+.04&&Math.abs(S[2])<.055?l.TOP:void 0}),r?o.chain([[...L.add(M,[-.08,-.06,0]),.07],[...L.add(M,[-.02,.12+p,.02]),.05],[...L.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...L.add(M,[-.08,-.1,0]),.07],[...L.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...L.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const g=L.add(M,[.03+d*.5,.26,0]),x=L.add(g,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const S of[-1,1]){const y=L.add(M,[.01,.11,S*.11]),E=s&&S>0?L.add(x,[.1,.01,.1]):r?[.3,f+.03,S*.05]:[.26+d,f+.03,S*.05],b=s&&S>0?L.add(y,[.1,.02,.1]):L.lerp(y,E,.5);o.seg(y,b,.04,.035,l.JACKET,{group:S>0?7:5}),o.seg(b,E,.035,.03,l.JACKET,{group:S>0?7:5}),o.ell(E,[.035,.03,.035],l.SKIN,{group:S>0?7:5})}o.ell(g,[.11,.115,.1],l.SKIN,{group:8,paint:S=>S[0]<g[0]-.01||S[1]>g[1]+.075?l.HAIR:void 0});for(const S of[-1,1])o.ell(qe.surface(g,[.11,.115,.1],L.norm([.85,.05,S*.45])),[.016,.026,.016],l.EYE,{group:8});r?o.chain([[...L.add(g,[-.06,.06,0]),.06],[...L.add(g,[.04,.13+p,.03]),.045],[...L.add(g,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...L.add(g,[-.06,.02,0]),.06],[...L.add(g,[-.18-u,-.05+p+m*.1,.02]),.045],[...L.add(g,[-.3-u*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const S of[-1,1])o.ell(L.add(g,[-.015,0,S*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...L.add(g,[-.005,.03,-.095]),.015],[...L.add(g,[-.005,.11,-.05]),.015],[...L.add(g,[-.005,.125,0]),.015],[...L.add(g,[-.005,.11,.05]),.015],[...L.add(g,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(x,[.16,.014,.15],l.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(r?[[...L.add(x,[0,.01,0]),.085],[...L.add(x,[.06,.16,0]),.045],[...L.add(x,[.2,.22+p*.5,0]),.012]]:[[...L.add(x,[0,.01,0]),.085],[...L.add(x,[-.05-u-v*.5,.17-v*.3,0]),.045],[...L.add(x,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:S=>S[1]<x[1]+.045?l.MAGIC:void 0}),a){const S=df[t]+(r?[0,.06][n%2]:0),y=Math.cos(S),E=Math.sin(S),b=[0,f,0],A=R=>[b[0]+(R[0]-b[0])*y-(R[1]-b[1])*E,b[1]+(R[0]-b[0])*E+(R[1]-b[1])*y,R[2]],_=R=>[b[0]+(R[0]-b[0])*y+(R[1]-b[1])*E,b[1]-(R[0]-b[0])*E+(R[1]-b[1])*y,R[2]],w=R=>[R[0]*y-R[1]*E,R[0]*E+R[1]*y,R[2]];for(const R of o.parts)if(R.type==="ell"?(R.c=A(R.c),R.axes=R.axes.map(w)):(R.a=A(R.a),R.b=A(R.b)),R.paint){const P=R.paint;R.paint=(I,O)=>P(_(I),O)}for(const R of o.flats)R.c=A(R.c),R.u=w(R.u),R.v=w(R.v);const C=Math.min(...o.parts.map(R=>R.type==="ell"?R.c[1]-Math.max(...R.r):Math.min(R.a[1]-R.r1,R.b[1]-R.r2)));if(C<.08)for(const R of o.parts){const P=.08-C;R.type==="ell"?R.c=[R.c[0],R.c[1]+P,R.c[2]]:(R.a=[R.a[0],R.a[1]+P,R.a[2]],R.b=[R.b[0],R.b[1]+P,R.b[2]])}if(r){const R=A([-.45,f-.24,0]);for(let P=0;P<5;P++){const I=P+n*.5,O=.055-P*.008;o.ell([R[0]+.1+I*.08,Math.max(.04,R[1]-.02+Math.sin(I*1.9)*.04),Math.cos(I*1.3)*.06],[O,O*.8,O],P<2?l.BELLY:P%2?l.MAGIC:l.MAGIC2,{group:25+P,extra:!0})}}if(i){const R=A([-.8,f,0]);for(let P=0;P<5;P++){const I=P+n*.5,O=.05-P*.007;o.ell([R[0]-.02+Math.sin(I*2.1)*.06,Math.max(.04,R[1]-.08-I*.09),Math.cos(I*1.7)*.05],[O,O,O],P%2?l.MAGIC:l.MAGIC2,{group:20+P,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const rc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),po=new Map,Lu=n=>(po.has(n)||po.set(n,mn(Cu({frame:0}),{height:n}).s),po.get(n)),ar=(n={})=>Lu(rc(n));function xf(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s}={}){const r=rc(n),a=Cu({frame:e,lean:t,pose:s}),{sp:o,project:h}=s?mn(a,{scale:Lu(r),facing:i}):mn(a,{height:r,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let c=0;for(let f=0;f<400&&c<6;f++){const d=f*37%o.w,u=f*53%Math.floor(o.h*.8);o.get(d,u)||o.get(d+1,u)||o.get(d-1,u)||o.get(d,u+1)||o.get(d,u-1)||(d*7+u*13+e*5)%11||(o.px(d,u,l.MAGIC2),c++)}return o}const ut=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Ws=n=>{const e=ut(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Mf=n=>e=>{const t=ut(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Ri=(n,e,t,i,s=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?l.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?l.STONED:void 0}),Wr=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Mf(e)}),hn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Ws}),Vr=(n,e,t,i,s,r=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=ut(s,o)*6.283,c=t*Math.sqrt(ut(o,s)),f=Math.cos(h)*c,d=Math.sin(h)*c*.7;n.ell([f,r*.3,d],[.07,r*(.35+ut(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?l.LEAF:void 0})}},Yr=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),vf={"sleeping-giant"(n){const e=t=>i=>{const s=ut(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?l.LEAF3:s>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Ri(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Ri(n,[-.2,.16,.95],[.2,.15,.18],4),Ri(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),Vr(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),Yr(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ut(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+ut(e,2)*.7,a=L.add(s,[0,r,0]);n.seg(s,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:Ws});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...L.add(a,L.add(L.mul(c,.45),[0,.18,0])),.04],[...L.add(a,L.add(L.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Ri(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Yr(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=L.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(L.dot(L.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&ut(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(L.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(L.add(e,L.add(L.mul(t,i*.4),[0,.1,-.42])),L.add(e,L.add(L.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),Vr(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=L.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,c=Math.hypot(o,h),f=Math.atan2(h,o);return c>r*.82||c<r*.18?l.BARKD:Math.abs(Math.sin(f*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=ut(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(ut(t,o)-.5)*.5,.25+o*.25+ut(o,t)*.2,r*(1-o*.3)+(ut(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>ut(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])hn(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Wr(n,t,i,3);hn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ut(i,s)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+ut(e)*.35;n.box(L.add(i,[0,s/2,0]),[.13,s/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>s*.85?l.MOSS:void 0});const r=L.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,L.add(r,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(L.add(r,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>ut(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],L.add(e,[Math.cos(s)*.08,.1+ut(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>ut(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?l.BARKL:void 0})},"root-arch"(n){hn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),hn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),hn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),hn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Wr(n,e,t,4);for(let e=0;e<4;e++)Ri(n,[-.7+e*.45,.12,(ut(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>ut(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Ri(n,[-1.4+e*.7,.12,.9+ut(e)*.3],[.2,.15,.18],4+e);Vr(n,16,1.8,10,9,.25)},"heron-rookery"(n){hn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{hn(n,[[...s,.07],[...r,.04]],2),n.ell(L.add(r,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<r[1]+.02?l.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Wr(n,s,r,7);const t=L.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...L.add(t,[.12*i,.06*i,0]),.035*i],[...L.add(t,[.2*i,.22*i,0]),.03*i],[...L.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(L.add(t,[.18*i,.33*i,0]),L.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const s of[-.04,.04])n.seg(L.add(t,[0,-.06*i,s]),L.add(t,[.02,-.42,s]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ut(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ut(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,L.add(s,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(L.add(s,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=ut(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){Yr(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=ut(e,7)*6.283,i=1.5+ut(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+ut(e,9)*.5;n.seg(s,L.add(s,[0,r,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(L.add(s,[0,r-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){Yr(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ut(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Ri(n,[.3,.07,.3],[.09,.07,.08],6,!1),Ri(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?l.MAGIC2:void 0});Vr(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){hn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>hn(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),hn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),hn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:r}),n.ell(L.add(s,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:r}),n.seg(L.add(s,[.15,.07,0]),L.add(s,[.22,.05,0]),.015,.004,l.BODY2,{group:r}),n.seg(L.add(s,[-.1,0,0]),L.add(s,[-.22,-.04,0]),.04,.015,l.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],L.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(L.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),L.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(L.add(i,[0,-.27,0]),L.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>ut(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Ri(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(L.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),L.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(L.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(L.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:Ws}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:Ws});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:Ws});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;hn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:Ws(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){hn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),hn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),hn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;hn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Wr(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ut(e,1)-.5)*3,.05+ut(e,2)*.5,(ut(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=ut(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},Pu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function _f(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new ft(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function bf(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:de(i,.45,.36),[l.BARKD]:de(i+.03,.5,.17),[l.BARKL]:de(i,.35,.55),[l.BARK2]:de(i+.02,.45,.26),[l.LEAF]:de(t,.55,.45),[l.LEAF2]:de(t-.03,.5,.62),[l.LEAF3]:de(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:de(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:de(e.magicHue??.45,.6,1),[l.MAGIC2]:de(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function yf(n,e,t,i=16){const s=new qe({blend:.05});vf[n](s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=(Object.values(Pu).find(([u])=>u===n)||[,,1])[2],a=mn(s,{scale:ar(t)*r}),{sp:o,x0:h,y0:c}=_f(a.sp),[f,d]=a.project([0,0,0]);return{sp:o,colours:bf(e,t),origin:{x:+(f-h).toFixed(1),y:+(d-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const Sf=1.3,wf=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*Sf,n.growth],pr=(n,e,t=1)=>Math.round(e.size*wf(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),ac=(n,e)=>{const t=Fr(e);for(let i=0;i<9;i++){const s=Math.floor(me(t,2,n.w-2)),r=Math.floor(me(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,l.MAGIC)}};function ja(n,e,t,i,s,r,a,o){const h=L.add(e,[-i*.7,i*(.75+s),t*i*.35]),c=L.norm(L.sub(h,e)),f=L.norm(L.sub([1,0,0],L.mul(c,L.dot([1,0,0],c)))),d=Math.hypot(...L.sub(h,e));n.flat(L.add(L.lerp(e,h,.5),L.mul(f,-i*.14)),c,f,d*.55,i*.34,_s.wing(r,a),{group:o,extra:!0})}const oc=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),pr(1,e)*t*.72))):n===2?Math.round(Math.max(pr(1,e)*t*1.08,Math.min(pr(2,e,t),pr(1,e)*1.4))):pr(n,e)*t;let Sa=null;function Ef(n,e){const t=Sa;Sa=n;try{return e()}finally{Sa=t}}const Af=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Tf=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function lc(n){const e=Sa,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:L.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:L.norm([1,.4,0])},a=L.norm(r.dir),o=L.norm(L.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=L.cross(a,o),c=[],f=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const g=M/16*Math.PI*2,x=L.add(L.mul(o,Math.cos(g)),L.mul(h,Math.sin(g)));let v=0;for(;v<.8&&n.field(L.add(r.c,L.mul(x,v)))<0;)v+=.01;v>=.8&&(v=r.r),c.push([...L.add(r.c,L.mul(x,v+f*.7)),f])}n.chain(c,l.COLLAR,{group:60,extra:!0});const d=c.reduce((M,g)=>g[0]-g[1]*.6+g[2]*.5>M[0]-M[1]*.6+M[2]*.5?g:M),u=f*1.3*(r.tag||1),p=L.norm(L.add(L.norm(L.sub(d.slice(0,3),r.c)),[.3,-.5,.3]));let m=d.slice(0,3);for(let M=0;M<60&&n.field(m)<u*.4;M++)m=L.add(m,L.mul(p,.01));n.ell(m,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||L.add(qe.surface(i.c,i.r,L.norm([-.15,1,.1])),[0,s*.1,0]),o=L.norm([.3,1,.35]),h=r*1.5,c=L.add(a,L.mul(o,h));n.seg(L.add(a,L.mul(o,-r*.1)),c,r*.48,r*.04,l.HAT1,{group:61,extra:!0,paint:f=>Math.floor(L.dot(L.sub(f,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[r*.17,r*.17,r*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=c=>L.add(c,L.mul(L.norm(L.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(L.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[r,a]){const f=L.norm(L.sub(c,i.c)),d=L.norm(L.cross([0,1,0],f)),u=L.cross(f,d),p=e.glasses==="heart"?Tf:Af,m=h*1.5;n.flat(o(c),d,u,m,m,(M,g)=>p(M,g)?p(M*1.3,g*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=L.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:r.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&oi(c,60,.28)?l.GLINT:void 0})}}function Rf(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=F=>a&&n.legend.includes(F),f=new qe,d=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,m=t?-.04:0,M=1+m,g=r.chest*(a?1.06:1)/p+m,x=r.tuck/p+m,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),S=.06*r.legW*(a?1.1:h?1.7:1),y=r.back==="hump"?.1:0,E=r.back==="arch"?.1:0,b=g+.12,A=F=>{if(r.belly&&F[1]<b&&F[0]>-u*.5)return l.BELLY;if(r.saddle&&F[1]>M-.18&&F[0]<u*.55)return l.BODY2;if(r.spots&&F[1]>g+.1&&oi(F,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?l.BELLY:r.spots==="young"?void 0:l.BODY3;if(r.ridge&&F[1]>M-.08+y*.5)return l.BODY3};if(f.ell([u*.48,(M+g)/2+y*.5,0],[u*.62,(M-g)/2+y*.5,v],l.BODY,{paint:A}),f.ell([-u*.5,(M+x)/2+E*.6,0],[u*.58,(M-x)/2+E*.6,v*.93],l.BODY,{paint:A}),f.ell([0,(M+(g+x)/2)/2+.02,0],[u*.6,(M-(g+x)/2)/2,v*.9],l.BODY,{paint:A}),r.ridge)for(let F=0;F<(a?16:10);F++){const ee=-u*.8+F*u*1.75/(a?15:9),ae=(.07+(a?.04:0))*(1+.5*Math.max(0,ee/u));f.ell([ee,M+.02+y*Math.max(0,1-Math.abs(ee/u-.5)*2)+ae*.5,0],[ae,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let F=0;F<14;F++){const ee=F/14*Math.PI*2;f.ell([u*Math.cos(ee)*.7,(M+g)/2+Math.sin(ee)*.2,v*(F%2?.5:-.5)],[.16,.14,.14],l.BODY)}const _=[.32,-.32][t],w=(F,ee)=>{const ae=ee*v*.62,ue=F?u*.62:-u*.62,ve=(F?1:-1)*ee*_,Se=F?g+.1:x+.15,B=(F?ee:-ee)*(t?1:-1)>0?.06:0,z=[ue+Math.sin(ve)*.2+(F?.02:.1),Math.max(.3,Se*.55),ae],N=[ue+Math.sin(ve)*.42,.05+B,ae],Z=[ue,Se+.12,ae*.8],j=ee>0?r.legMat||l.BODY:r.legMat?l.BODY3:l.BODY2,ce=F?[[...Z,S*1.5],[...z,S*1.05],[...N,S*.9]]:[[...Z,S*2*(r.haunch||1)],[...L.add(z,[-.12,.06,0]),S*1.2],[...L.add(N,[-.06*(r.hindFoot||1),.12,0]),S*.9],[...N,S*.9]];f.chain(ce,j,{group:ee>0?6+(F?1:0):2,paint:r.socks?fe=>fe[1]<r.socks?l.BODY3:void 0:void 0});const oe=(r.paw==="hoof"?.07:.09)*r.legW**.5*(F?1:r.hindFoot||1);f.ell(L.add(N,[oe*.5,-.01,0]),[oe,S*.9,S*1.1],r.paw==="hoof"?l.NOSE:j,{group:ee>0?6+(F?1:0):2}),f.anchors.feet.push({c:L.add(N,[oe*.5,-.01,0]),r:Math.max(oe,S*1.1),group:ee>0?6+(F?1:0):2})};for(const F of[-1,1])w(!0,F),w(!1,F);const C=[u*.82,M-.12,0],R=[C[0]+Math.cos(r.neckAng)*r.neck*.9,C[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];f.seg(C,R,r.neckW*.55,r.neckW*.42,l.BODY,{paint:F=>r.belly&&F[1]<(C[1]+R[1])/2-.05?l.BELLY:r.face==="dark"?l.BODY2:void 0});const P=F=>{if(r.face==="badger")return Math.abs(F[2])<d*.22+(F[0]-R[0])*.1||F[1]<R[1]-d*.1?l.BELLY:l.BODY3;if(r.face==="dark")return l.BODY2;if((r.belly||r.muzzle)&&F[1]<R[1]-d*.35)return l.BELLY};f.ell(R,[d*1.05,d*.92,d*.88],l.BODY,{paint:P});const I=d*r.snout*(h?.55:o?.78:1),O=d*r.snoutD*.55,k=[R[0]+d*.65+I*.5,R[1]-d*.28,0];f.ell(k,[I*.62+d*.2,O,O*.95],l.BODY,{dir:[1,-.25,0],paint:F=>(r.muzzle||r.belly)&&F[1]<k[1]-O*.1?l.BELLY:P(F)});const G=[k[0]+I*.62+d*.1,k[1]-.02,0];f.ell(G,[d*(r.disc?.1:.12),d*(r.disc?.2:.12),d*(r.disc?.2:.15)],l.NOSE,{group:1});for(const F of[-1,1]){const ee=qe.surface(R,[d*1.05,d*.92,d*.88],L.norm([.75,.32,F*.62]));f.ell(ee,[d*.13,d*.16,d*.13].map(ae=>ae*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?l.MAGIC2:l.EYE,{group:1})}f.anchors.head={c:R,r:[d*1.05,d*.92,d*.88],top:[R[0]-d*.1,R[1]+d*.82,0]},f.anchors.eyes={pts:[-1,1].map(F=>qe.surface(R,[d*1.05,d*.92,d*.88],L.norm([.75,.32,F*.62]))),size:d*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},f.anchors.neck={c:L.lerp(C,R,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:L.norm(L.sub(R,C)),tag:h?1.8:o?1.3:1};for(const F of[-1,1]){const ee=r.ear,ae=[R[0]-d*.15,R[1]+d*.7,F*d*.5],ue=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(ee==="none")continue;if(ee==="round"){f.ell(ae,[d*.22,d*.25*ue,d*.1],l.BODY,{group:1,paint:ce=>ce[0]>ae[0]+d*.02?l.EAR:void 0});continue}const ve=ee==="long",Se=ee==="small"?-.6:0,B=d*.55*ue*(ee==="big"?1.35:ve?2.2:1),z=d*.3*(ee==="big"?1.2:ve?1.35:1),N=L.norm([Se*.6-(ve?.3:.12),1,F*.3]),Z=L.norm([.55,.2,F]),j=L.norm(L.cross(Z,N));f.flat(L.add(ae,L.mul(N,B)),j,N,z,B,_s.ear(l.BODY,l.EAR,l.BODY3),{group:5+(F>0?0:20),extra:ve}),ee==="tuft"&&f.seg(L.add(ae,[0,B*1.4,F*.02]),L.add(ae,[0,B*1.85,F*.04]),d*.05,d*.02,l.BODY3,{group:1})}const K=[-u*1.05,M-.1+E*.5,0],ie=t?.04:-.02;if(c("tails")||Cf(f,c("starTail")?"star":r.tail,K,u,M,ie),r.horns)for(const F of[-1,1]){const ee=o?.6:h?.35:c("hornsGlow")?1.4:1,ae=[];for(let ue=0;ue<=8;ue++){const ve=.3-ue/8*Math.PI*1.6,Se=d*.65*ee*(1-.45*ue/8);ae.push([R[0]-d*.1+Math.cos(ve)*Se,R[1]+d*.45+Math.sin(ve)*Se,F*(d*.6+ue*.015)]),ae[ue].push(d*.2*ee*(1-.6*ue/8))}f.chain(ae,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(r.antlers||c("jackalope"))for(const F of[-1,1])Lf(f,r,[R[0]-d*.05,R[1]+d*.75,F*d*.4],F,e,c);if(r.tusks)for(const F of[-1,1]){const ee=o?.4:h?0:c("tusksBig")?1.3:.75;if(!ee)continue;const ae=[k[0]+I*.25,k[1]-O*.4,F*O*.8];f.chain([[...ae,.045*ee],[...L.add(ae,[.1*ee,.1*ee,F*.03]),.04*ee],[...L.add(ae,[.06*ee,.24*ee,F*.05]),.02*ee]],l.ACCENT,{group:8})}r.teeth&&!h&&f.ell([G[0]-d*.1,G[1]-d*.25,0],[d*.08,d*.14,d*.12],l.ACCENT,{group:1});const q=F=>[-u*.9+F*u*1.65,M+y*Math.max(0,1-Math.abs(F-.8)*3)+E*(1-Math.abs(F-.4)*2),0];if(c("wings"))for(const F of[-1,1])ja(f,[u*.2,M,F*v*.5],F,1.15,t?.1:0,F>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(F>0?10:0));if(c("mane")||c("flames"))for(let F=0;F<7;F++){const ee=F/6,ae=L.lerp(L.add(R,[-d*.5,d*.3,0]),q(.55),ee),ue=[.4,.3,.45,.28,.38,.25,.3][F],ve=L.norm([-.35-(t?.1:0),1,0]);f.flat(L.add(ae,L.mul(ve,ue*.5)),[1,0,0],ve,ue*.32,ue*.55,_s.flame(F%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+F%2,extra:!0})}if(c("tails"))for(let F=0;F<7;F++){const ee=Math.PI*(.55+F*.08),ae=(F-3)*.1,ue=L.add(K,[Math.cos(ee)*.9,Math.sin(ee)*.85,ae]);f.chain([[...K,.1],[...L.lerp(K,ue,.5),.17],[...ue,.08]],F%2?l.BODY2:l.BODY,{group:70,extra:!0}),f.ell(ue,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((F,ee)=>{const ae=q(F),ue=[.3,.5,.4,.6,.35][ee];f.ell(L.add(ae,[0,ue*.45,(ee%2-.5)*.1]),[ue*.55,.08,.08],l.MAGIC,{dir:[(ee-2)*.12,1,0],group:80+ee%2,extra:!0,paint:ve=>ve[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let F=0;F<6;F++)f.ell(q(.08+F*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[F,ee]of[[.25,.55],[.5,.8],[.75,.45]]){const ae=q(F);f.seg(ae,L.add(ae,[0,ee*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),f.ell(L.add(ae,[0,ee*.8,0]),[ee*.28,ee*.26,ee*.28],l.LEAF2,{group:87,extra:!0,paint:ue=>ue[1]<ae[1]+ee*.72?l.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const ee=q(F);f.ell(L.add(ee,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let F=0;F<3;F++){const ee=[];for(let ae=0;ae<9;ae++){const ue=ae/8;ee.push([u*(.5-ue*2.2),M+.05+F*.1+ue*(.25+F*.12)+Math.sin(ue*6+t+F)*.07,(F-1)*.18,.04*(1-ue*.6)])}f.chain(ee,F%2?l.MAGIC2:l.MAGIC,{group:90+F,extra:!0})}lc(f);const{sp:se}=mn(f,{height:oc(e,i,r.hgt),facing:s});return a&&ac(se,n.id.length*7919),se}function Cf(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(L.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(L.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>oi(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],l.BODY3,a))}function Lf(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const f=.045*Math.max(.8,o),d=i*.35*o;if(e.antlers==="palm"){const g=L.add(t,[-.06*o,.12*o,d*.3]);n.seg(t,g,f*1.3,f*1.2,h,c);for(let x=0;x<5;x++){const v=.35+x*.3,S=L.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),y=(.24+.05*(x%2))*o;n.ell(L.add(g,L.mul(S,y*.55)),[y*.6,f*1.5,f*.6],h,{...c,dir:S,up:[0,0,1]})}return}const u=L.add(t,[-.18*o,.3*o,d*.4]),p=L.add(t,[-.25*o,.62*o,d*.8]),m=L.add(t,[-.1*o,.95*o,d]);n.chain([[...t,f*1.2],[...u,f],[...p,f*.85],[...m,f*.4]],h,c);const M=(g,x,v,S)=>n.seg(g,L.add(g,L.mul(L.norm(x),v)),S,S*.35,h,c);M(L.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,f*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,f*.7),o>.7&&(M(p,[.8,1,0],.28*o,f*.6),M(m,[.3,1,i*.2],.18*o,f*.5))}function Pf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=m=>r&&n.legend.includes(m),c=new qe,f=t?.03:0,d=o?.48:a?.42:.36,u=(o?.95:1.08)+f;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,l.BODY2,{group:2});for(const g of[-.04,0,.04])c.ell([.16,.03+M,m*.15+g],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+f,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<u-d*.5?Math.floor(m[1]*18)%3===0&&oi(m,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const m of[-1,1])c.ell([-.06,.58+f,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>oi(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[d,d*.9,d],l.BODY);for(const m of[-1,1]){const M=L.norm([.75,-.05,m*.4+.35]),g=L.add(qe.surface([0,u,0],[d,d*.9,d],M),L.mul(M,-d*.05));c.ell(g,[d*.22,d*.46,d*.4],l.BELLY,{group:1,dir:M});const x=L.add(g,L.mul(M,d*.14));c.ell(x,[d*.1,d*.26,d*.24].map(v=>v*(o?1.15:1)),r?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(L.add(x,L.mul(M,d*.07)),[d*.08,d*.14,d*.13].map(v=>v*(o?1.15:1)),r?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:d*.22}).pts.push(L.add(x,L.mul(M,d*.07))),o||c.ell([d*.05,u+d*.8,m*d*.6],[d*.32,d*.12,d*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(qe.surface([0,u,0],[d,d*.9,d],L.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const m of[-1,1])ja(c,[-.05,.8+f,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(h("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,u,0],r:[d,d*.9,d]},c.anchors.neck={c:[0,u-d*.75,0],r:d*.85,dir:[0,1,0]},lc(c);const{sp:p}=mn(c,{height:oc(e,i,.95),facing:s});return r&&ac(p,31),p}const ns=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(qe.surface(e,t,L.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>qe.surface(e,t,L.norm(o))),size:s}},Du=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function Jn(n,e,t,i,s,r){lc(n);const{sp:a}=mn(n,{height:oc(t,i,s),facing:r});return t===3&&ac(a,e.id.length*131),a}const Iu=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(L.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},cc=(n,e)=>e.forEach(([t,i],s)=>n.ell(L.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?l.MAGIC2:void 0}));function Df(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;for(const[d,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,u],[d+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[d+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:d=>oi(d,22,.3)?l.BODY3:oi(d,19,.12)?l.BELLY:void 0});for(let d=0;d<46;d++){const u=d*2.399%(Math.PI*2),p=d/46*.9+.05,m=L.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);m[0]>.55||a.ell(L.add(qe.surface(h,c,m),L.mul(m,.02)),[.1,.025,.025],d%4?l.BODY2:l.BODY3,{dir:L.add(m,[-.4,0,0]),group:1})}const f=[.48,.22,0];return a.ell(f,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),ns(a,f,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?l.MAGIC2:l.EYE),r&&cc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Jn(a,n,e,i,.6,s)}function If(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.05:0;for(const f of[-1,1])a.ell([-.22,.16,f*.36],[.24,.13,.12],f>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:f>0?6:2,paint:d=>oi(d,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,f*.4],[.16,.04,.08],f>0?l.BODY:l.BODY2,{group:f>0?6:2}),a.seg([.35,.2+o,f*.24],[.42,.03,f*.3],.05,.04,f>0?l.BODY:l.BODY2,{group:f>0?7:2}),a.anchors.feet.push({c:[.45,.03,f*.3],r:.06,group:f>0?7:2},{c:[.12,.04,f*.4],r:.08,group:f>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:f=>f[1]<h[1]-.12?l.BELLY:f[0]>.38&&Math.abs(f[1]-(h[1]-.02))<.018?l.LINE:oi(f,14,.22)?l.BODY3:void 0});for(const f of[-1,1]){const d=[.3,.55+o,f*.17];a.ell(d,[.1,.09,.1],l.BODY,{group:1}),a.ell(qe.surface(d,[.1,.09,.1],L.norm([.6,.5,f*.5])),[.05,.05,.05],r?l.MAGIC2:l.IRIS,{group:1}),a.ell(qe.surface(d,[.11,.1,.11],L.norm([.65,.45,f*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(f=>qe.surface([.3,.55+o,f*.17],[.1,.09,.1],L.norm([.6,.5,f*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&Iu(a,[.15,.66+o,0],.16),Jn(a,n,e,i,.55,s)}function Of(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new qe,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const f=[.36,.84+c,0],d=a?.19:.16;if(h.ell(f,[d*1.1,d,d*.95],l.BODY,{paint:u=>u[1]>f[1]+d*.55?l.BELLY:void 0}),h.ell(L.add(f,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],l.NOSE,{dir:[1,-.2,0],group:1}),ns(h,f,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,r?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])ja(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return Jn(h,n,e,i,.75,s)}function Nf(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,f=a("wingsBig")?1.5:1;Du(o,0,.3*f);for(const u of[-1,1]){const p=[0,c+.05,u*.1],m=[.05,c+(h?.35:-.05),u*.45*f],M=[[-.05,c+(h?.45:-.15),u*.85*f],[-.25,c+(h?.2:-.25),u*.75*f],[-.3,c+(h?0:-.25),u*.4*f]],g=a("wingsBig")?l.MAGIC:l.BODY2,x=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,x,{group:11});for(const b of M)o.seg(m,b,.02,.012,x,{group:11});const v=L.sub(M[0],p),S=L.norm(v),y=L.norm(L.sub(M[2],m)),E=L.norm(L.sub(y,L.mul(S,L.dot(y,S))));o.flat(L.add(L.lerp(p,M[0],.5),L.mul(E,.12*f)),S,E,Math.hypot(...v)*.55,.3*f,_s.membrane(g),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const d=[.08,c+.2,0];o.ell(d,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(L.add(d,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?l.EAR:void 0});return ns(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?l.MAGIC2:l.EYE),o.ell(qe.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),Jn(o,n,e,i,.55,s)}function Ff(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let f=0;f<4;f++)a.ell(L.add(c,[.14,-.01,h*(f-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(qe.surface([0,.3,0],[.52,.29,.33],L.norm([.85,.3,h*.35])),[.015,.015,.015],r?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>qe.surface([0,.3,0],[.52,.29,.33],L.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&Iu(a,[.15,.62,0],.15),Jn(a,n,e,i,.55,s)}function Uf(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new qe;for(const d of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,m=(u+(d>0?1:0)+t)%2?.06:-.06,M=[p,.22,d*.2];o.chain([[...M,.03],[p+m+(1-u)*.06,.32,d*.42,.025],[p+m*1.5+(1-u)*.15,.02,d*.55,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?l.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),f=a("horn")?l.MAGIC:l.BODY3;for(const d of[-1,1]){const u=L.add(h,[.08,.02,d*.1]),p=L.add(u,[c*.7,c*.45,d*c*.15]),m=L.add(p,[c*.25,-c*.12,-d*c*.12]);o.chain([[...u,.045],[...p,.035],[...m,.015]],f,{group:8+(d>0?1:0)}),o.seg(L.lerp(u,p,.55),L.add(L.lerp(u,p,.55),[0,c*.22,0]),.02,.008,f,{group:8})}for(const d of[-1,1])o.chain([[...L.add(h,[.05,.06,d*.1]),.012],[h[0]+.1,.5,d*.22,.012],[h[0]+.2,.5,d*.26,.012]],l.BODY3,{group:9,extra:!0});return ns(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?l.MAGIC2:l.EYE,9),a("crystals")&&cc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Jn(o,n,e,i,.5,s)}function kf(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const f of[-1,1])a.seg([.7+o,.32,f*.04],[.78+o,.55,f*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,f*.1],[.03,.03,.03],r?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(f=>[.78+o,.57,f*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=r?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:f=>{const d=Math.atan2(f[1]-h[1],f[0]-h[0]);return((Math.hypot(f[0]-h[0],f[1]-h[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?l.MAGIC2:l.BODY3:void 0}}),Jn(a,n,e,i,.45,s)}function Bf(n,e,t,i,s="towards"){const r=e===3,a=new qe;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,f=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+f,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),ns(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?l.MAGIC2:l.EYE),r&&cc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Jn(a,n,e,i,.4,s)}function zf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new qe,c=t?.7:0,f=[];for(let p=0;p<=12;p++){const m=p/12;f.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}f.push([.38,.25,f[12][2],.07],[.42,.45,f[12][2]*.8,.065]),h.chain(f,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:oi([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const d=[.5,.5,f[13][2]*.8],u=a?.11:.09;if(h.ell(d,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),ns(h,d,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?l.MAGIC2:l.EYE),t||h.seg(L.add(d,[u*1.4,-u*.2,0]),L.add(d,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:L.add(f[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,f[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])ja(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return Jn(h,n,e,i,.45,s)}function Hf(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,f=a("wingsBig")?1.45:1,d=a("wingsBig")?l.MAGIC:l.BODY;Du(o,0,.3*f);for(const u of[-1,1]){const p=h?.5:-.1,m=L.norm([.35,p,u]),M=L.norm([-.3,p*.6,u]);o.flat(L.add([0,c,u*.05],L.mul(m,.38*f)),m,L.norm(L.cross(m,[0,1,0])),.4*f,.24*f,_s.spotted(d,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(L.add([-.05,c,u*.05],L.mul(M,.26*f)),M,L.norm(L.cross(M,[0,1,0])),.27*f,.17*f,_s.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>oi(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),ns(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?l.MAGIC2:l.EYE),Jn(o,n,e,i,.5,s)}function Gf(n,e,t,i,s="towards"){const r=e===3,a=c=>r&&n.legend.includes(c),o=new qe,h=t?.05:0;for(let c=0;c<9;c++){const f=c/8,d=-.6+f*1.15;o.ell([d,.12+Math.sin(f*Math.PI)*(.06+h),0],[.08,.1-f*.02,.12-f*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),ns(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?l.MAGIC2:l.EYE),Jn(o,n,e,i,.4,s)}function Wf(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new qe,h=[.15,.28,0];for(const f of[-1,1])for(let d=0;d<4;d++){const u=-.6+d*.4,p=(d+(f>0?0:1)+t)%2?.05:-.05,m=L.add(h,[.05-d*.04,0,f*.1]),M=L.add(m,[Math.cos(u)*.3*(d<2?1:-.6)+p,.3,f*.3]),g=L.add(m,[Math.cos(u)*.55*(d<2?1:-.8)+p*1.5,-.28,f*.55]);o.chain([[...m,.03],[...M,.028],[...g,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:f=>(Math.abs(f[2])<.03||Math.abs(f[0]+.28)<.03)&&f[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([f,d])=>qe.surface(h,[.18,.13,.17],L.norm([.9,f*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[f,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(qe.surface(h,[.18,.13,.17],L.norm([.9,f*6,d*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let f=0;f<5;f++){const d=Math.PI*(.2+f/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(f-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+f,extra:!0})}return Jn(o,n,e,i,.5,s)}const Vf=new Map(Object.entries({owl:Pf,hedgehog:Df,toad:If,raven:Of,bat:Nf,mole:Ff,beetle:Uf,snail:kf,woodlouse:Bf,snake:zf,moth:Hf,glowworm:Gf,spider:Wf})),hc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Ou=Object.fromEntries(hc.map(n=>[n.id,n])),hl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],ul={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Yf=["bar","star","heart"];function Xf(n,e=!0){const t=Fr((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*hl.length):null,glasses:i||t()<.4?Yf[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(ul)[Math.floor(t()*3)]:null}}function Kf(n,e,t=null){const i=qf(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[s,r,a]=hl[t.hat%hl.length];i[l.HAT1]=s,i[l.HAT2]=r,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=ul[t.shoes]||ul.sneakers;i[l.SHOE]=s,i[l.SOLE]=r}if(t.woken){i[l.WOKEN]=[255,40,36];for(const s of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function qf(n,e){const t=Ou[n],i=e.cVal/.85,s=e.cSat/.6,r=de(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:de(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=de(e.magicHue+t.hue*.3,.6,1),h=de(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:r,[l.BODY2]:de(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[l.BODY3]:de(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:de(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:de(.3,.55,.55),[l.LEAF2]:de(.25,.5,.75),[l.LEAF3]:de(.33,.6,.35),[l.TRUNK]:de(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:de(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:de(.12,.7,.85),[l.SKIN]:[238,158,192]}}const $f=["size","growth","pixel","head","eye","legs","long","fur"],mr=new Map;function Zf(n,e,t,i,s="towards",r=null){const a=Ou[n]||hc[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...$f.map(f=>i[f]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=mr.get(h);if(!c){if(c=Ef(o,()=>a.q?Rf(a,e,t,i,s):Vf.get(a.plan)(a,e,t,i,s)),o?.woken)for(let f=0;f<c.m.length;f++)(c.m[f]===l.EYE||c.m[f]===l.IRIS||c.m[f]===l.PUPIL)&&(c.m[f]=l.WOKEN);mr.size>600&&mr.delete(mr.keys().next().value),mr.set(h,c)}return c}const eo=.07,uc=.048,Qe=(...n)=>({l:n}),Ct=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),un=(n,e)=>({d:[n,e]}),bt=(n,e=.86)=>Qe([.5,e],[.5,n]),yt=Ct(.5,.76,.13,25,155),Jf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},St=(...n)=>n.flatMap(e=>[e,Jf(e)]);function Ci(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,f=s/r,d=-i/r,u=(o-Math.abs(a))*Math.sign(a),p=h-f*u,m=c-d*u,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let x=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;x>180;)x-=360;for(;x<-180;)x+=360;return Ct(p,m,o,M,M+x)}const Qf=(n,e,t,i,s,r=24)=>Qe(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),jf=(n,e,t,i,s,r=0,a=40)=>Qe(...Array.from({length:a+1},(o,h)=>{const c=h/a,f=(r+c*s*360)*Math.PI/180,d=t+(i-t)*c;return[n+d*Math.cos(f),e+d*Math.sin(f)]})),Xr=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return Qe([n+t*a,e+t*o],[n+i*a,e+i*o])}),e0={wolf:[bt(.3),Qe([.28,.08],[.5,.3],[.72,.08]),Ct(.5,.55,.2,-55,55),yt,un(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[bt(.34),Qe([.36,.06],[.5,.34],[.64,.06]),Ct(.67,.66,.17,180,-80),un(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),yt],badger:[bt(.1),Qe([.24,.3],[.76,.3]),...St(Qe([.33,.14],[.33,.56])),yt,...St(un(.24,.3))],boar:[bt(.16),...St(Ct(.36,.24,.15,45,180)),...Xr(.5,.16,0,.1,[-130,-90,-50]),yt],stag:[bt(.42),...St(Qe([.5,.42],[.34,.26],[.3,.06]),Qe([.335,.25],[.16,.2]),Qe([.32,.15],[.18,.07])),yt],hare:[bt(.44),...St(Qe([.5,.44],[.4,.34],[.38,.06])),Ct(.62,.66,.09,180,540),yt,...St(un(.38,.06))],owl:[bt(.44),...St(Ct(.33,.3,.13,0,360),Qe([.24,.18],[.18,.05])),yt,...St(un(.33,.3))],bear:[bt(.24),Qe([.24,.3],[.76,.3]),...St(Ct(.3,.3,.09,180,360)),...St(Qe([.36,.5],[.32,.62])),yt],hedgehog:[bt(.52),Ct(.5,.52,.2,180,360),...Xr(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),yt],squirrel:[bt(.2),Qe([.5,.2],[.4,.08]),Ct(.66,.4,.16,100,-200),un(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),yt],toad:[bt(.42),Qe([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...St(Ct(.34,.3,.1,0,360)),yt,...St(un(.16,.54))],otter:[bt(.24),Ct(.5,.5,.28,-100,100),un(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ci([.18,.64],[.36,.64],.3),yt],lynx:[bt(.32),Qe([.26,.2],[.5,.32],[.74,.2]),...St(Qe([.26,.2],[.26,.06])),Qe([.5,.68],[.66,.62]),yt,...St(un(.26,.06))],elk:[bt(.3),...St(Qe([.5,.3],[.42,.2]),Ct(.3,.16,.12,0,180),Qe([.18,.16],[.14,.06])),Qe([.5,.44],[.6,.52]),yt],raven:[bt(.14),Qe([.5,.14],[.3,.22]),Qe([.18,.56],[.5,.38],[.82,.56]),yt,un(.58,.17),...St(un(.18,.56))],bat:[bt(.3),Ct(.5,.16,.14,20,160),...St(Qe([.5,.38],[.12,.26]),Ci([.12,.26],[.24,.46],-.25),Ci([.24,.46],[.38,.5],-.3),Ci([.38,.5],[.5,.52],-.3)),yt],mole:[bt(.44),Ct(.5,.3,.16,0,180),...Xr(.5,.3,.19,.3,[-160,-125,-55,-20]),Qe([.5,.14],[.5,.04]),yt],beaver:[bt(.36),Qe([.32,.2],[.68,.2]),...St(Qe([.44,.2],[.44,.34])),Qe([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),yt],stoat:[bt(.18),Ct(.5,.44,.24,180,360),Qe([.5,.18],[.6,.08]),yt,...St(un(.26,.44))],snail:[bt(.52),jf(.5,.33,.03,.2,1.6,90),Qe([.66,.2],[.76,.06]),yt,un(.76,.06)],ram:[bt(.24),...St(Ct(.36,.24,.14,0,-250)),yt,...St(un(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[bt(.24),Ct(.5,.52,.22,205,335),Ct(.5,.66,.24,205,335),Ct(.5,.38,.2,205,335),...St(Qe([.5,.24],[.32,.06])),yt],snake:[bt(.16),Qf(.5,.82,.2,.2,1.25),Qe([.5,.2],[.5,.11]),...St(Qe([.5,.11],[.42,.045])),yt],moth:[bt(.2),...St(Qe([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Qe([.5,.5],[.3,.64],[.5,.66]),Ct(.38,.16,.12,0,-110)),yt],marten:[bt(.32),Qe([.3,.2],[.5,.32],[.7,.2]),...St(Ct(.3,.14,.07,90,-180)),Ct(.28,.56,.22,0,150),un(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),yt],salamander:[bt(.3),Ci([.5,.3],[.5,.06],.35),Ci([.5,.3],[.5,.06],-.35),...St(Qe([.5,.42],[.32,.38],[.26,.48]),Qe([.5,.64],[.32,.6],[.26,.7])),yt,...St(un(.38,.52))],glowworm:[bt(.4),Ct(.5,.27,.1,90,450),...Xr(.5,.27,.15,.25,[0,60,120,180,240,300]),yt],spider:[Qe([.5,.05],[.5,.3]),bt(.5),Ct(.5,.4,.11,-90,270),...St(...[-150,-170,170,150].map(n=>Qe([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),yt,un(.5,.05)],dormouse:[bt(.12),Ct(.5,.46,.24,-60,250),...St(Ct(.34,.16,.08,90,-180)),Ci([.56,.38],[.7,.38],-.4),yt],beetle:[bt(.36),...St(Ct(.66,.26,.2,160,250)),Ci([.5,.38],[.5,.82],.25),Ci([.5,.38],[.5,.82],-.25),yt]},jc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},t0={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},Pr=n=>jc[t0[n]]||jc.cyan,n0=[255,255,250],i0=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),eh=n=>`rgb(${n.join(",")})`;function s0(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function wa(n){if(n.d)return{dot:!0,pts:[n.d],len:uc*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,f)=>{const d=(a+(o-a)*f/h)*Math.PI/180;return[i+r*Math.cos(d),s+r*Math.sin(d)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const dl=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},mo=new Map;function Nu(n){return mo.has(n)||mo.set(n,dl((e0[n]||[]).map(e=>({...wa(e),w:eo,part:"sigil"})))),mo.get(n)}const go=new Map;function r0(n,e=0){const t=n+":"+e;if(go.has(t))return go.get(t);const i=e===null?null:s0(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=eo*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=m=>wa({a:[.5,.5,m,90,450]});for(let m=0;m<i.rings;m++)h.push({...p(.44-m*.06),w:o,part:"ring"});for(let m=0;m<i.dots;m++){const M=(90+m*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let m=0;m<16;m++){const M=(90+m*22.5)*Math.PI/180,g=.44-.06+.014,x=.44-.014;h.push({...wa({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let m=0;m<i.rays;m++){const M=(90+m*360/i.rays)*Math.PI/180,g=.44+.02,x=.5-o/2;h.push({...wa({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),f=Nu(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([p,m])=>[r+p*s,r+m*s]),w:u.w*s*c,r:uc*s*c,part:"sigil"})),d={level:e,frame:i,k:s,strokes:[...dl(h,0,h.length?.15:0),...dl(f,h.length?.15:0,1)]};return go.set(t,d),d}function a0(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function o0(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=Pr(e),progress:o=1,glow:h=!0}={}){const c=r0(e,r),f=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const d=(u,p,m,M)=>{n.globalAlpha=m,n.strokeStyle=n.fillStyle=eh(u),n.shadowColor=eh(a),n.shadowBlur=M;for(const g of c.strokes){const x=a0(g,o);if(x){if(n.beginPath(),g.dot){n.arc(x[0][0],x[0][1],g.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=g.w*p,x.forEach((v,S)=>S?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(d(a,2.4,Math.min(f,.7)*.55,s/12),d(i0(a,n0,.72),.62,1,s/30)):d(a,1,1,0),n.restore()}function l0(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<uc+i-eo/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],c=r.pts[o],f=c[0]-h[0],d=c[1]-h[1],u=f*f+d*d,p=Math.sqrt(u),m=u?Math.max(0,Math.min(1,((e-h[0])*f+(t-h[1])*d)/u)):0;if(Math.hypot(e-h[0]-f*m,t-h[1]-d*m)<i){const M=r.start+(a+m*p)/r.len*(r.end-r.start);M<s&&(s=M)}a+=p}}return s}function c0(n,e,t,i=eo/2){return l0(Nu(n),e,t,i)<1/0}hc.map(n=>n.id);const Tr=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function yn(n,e,t,i,s,r,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const f=[];for(let x=0;x<9;x++){const v=x/9*Math.PI*2,S=1+(r()-.5)*.35*(s.clump+.3);f.push([e[0]+Math.cos(v)*t*S,e[1]+Math.sin(v)*i*S*(Math.sin(v)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Qa(f,0,9,d,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([xt(e,[-t*1.1,i*.15]),xt(e,[t*1.1,i*.1]),xt(e,[t*1.1,i*1.2]),xt(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([xt(e,[-t*.75,-i*.55]),xt(e,[t*.25,-i*.95]),xt(e,[t*.55,-i*.35]),xt(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),g=r()*1e4|0;for(let x=m;x<=M;x++)for(let v=u;v<=p;v++){const S=n.get(v,x);if(S!==a&&S!==l.LEAF2&&S!==l.LEAF3)continue;const y=dt(v,x,g),E=bi(v/2,x/2,g)*.5+y*.5;E<.16*s.density?n.recolour(v,x,S===l.LEAF2?a:l.LEAF2):E>1-.16*s.density&&n.recolour(v,x,S===l.LEAF3?a:l.LEAF3)}}function gn(n,e,t,i,s,r,a,o,{mat:h=l.TRUNK,bend:c=1,group:f=10,line:d=!1}={}){const u=[e],p=4;let m=t,M=e;for(let g=1;g<=p;g++)m+=(o()-.5)*.7*a.gnarl*c,M=xt(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),u.push(M);return n.limb(u.map((g,x)=>[...g,s+(r-s)*x/p]),h,{group:f,line:d,round:a.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:u}}function Gi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,f=(8+r()*16)*a*(.4+s.roots),d=(2+r()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+f*.4),t-d],m=[e+c*(i*.5+f),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function is(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==l.TRUNK)continue;const a=t?bi(s/1.3,i/6,21):bi(s/6,i/1.3,21);a>1-e.bark*.42||dt(s,i,4)<e.bark*.05?n.m[r]=l.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=l.BARKL)}}function Gn(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,r-1),f=n.h-c,d=new ft(h,f);for(let u=0;u<f;u++)for(let p=0;p<h;p++){const m=(u+c)*n.w+p+o,M=u*h+p;d.m[M]=n.m[m],d.g[M]=n.g[m],d.n[M*3]=n.n[m*3],d.n[M*3+1]=n.n[m*3+1],d.n[M*3+2]=n.n[m*3+2]}return{sp:d,crownY:t-c}}const ci=n=>(n.crownWidth||3)/3;function h0(n,e,t){const i=ci(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new ft(s,r),o=s/2,h=r,c=e.treeTrunks||1,f=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),d=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=r;const m=(M,g,x,v,S)=>{const y=gn(a,M,g,x,v,v*.65,e,n,{group:12});if(S===0){u.push(y.end);return}const E=n()<.35?3:2;for(let b=0;b<E;b++){const A=(b-(E-1)/2)*me(n,.5,.85)*(S===3?1.4:1);m(y.end,y.ang+A+(n()-.5)*.25,x*me(n,.6,.78),v*.62,S-1)}S<=2&&u.push(Tn(M,y.end,.7))};for(let M=0;M<c;M++){const g=d+(c>1?(M/(c-1)-.5)*.8:0),x=[o+(M-(c-1)/2)*f*.6,h],v=gn(a,x,-Math.PI/2+g,r*.36*(c>1?me(n,.75,1.15):1),f,f*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const S of[-1,1])m(v.end,-Math.PI/2+g*.5+S*me(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),r*.22*(.75+.25*i)*(c>1?.7:1),f*.7,c>2?2:3);if(c===1&&n()<.7&&m(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,f*.55,2),M===0&&e.treeHollow){const S=Tn(x,v.end,.38);a.ellipse(S[0],S[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(Gi(a,o,h,f*Math.sqrt(c),e,n,t),is(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const g=u[M],x=u[M+1],v=Math.hypot(x[0]-g[0],x[1]-g[1]);if(v<40*t)for(let S=0;S<=v;S++){const y=Tn(g,x,S/v);a.px(y[0],y[1]+Math.sin(S/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return Gn(a,o,p+4*t);u.sort((M,g)=>M[1]-g[1]);for(const M of u)yn(a,xt(M,[0,-3*t]),me(n,14,21)*t,me(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&yn(a,xt(M,[me(n,-9,9)*t,me(n,-12,-3)*t]),me(n,10,15)*t,me(n,7,10)*t,e,n);return Gn(a,o,p+4*t)}function u0(n,e,t){const i=.8+.2*ci(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new ft(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),Gi(a,o,h,6*t,e,n,t*.6),is(a,e);const c=Math.round(me(n,9,12));for(let f=c-1;f>=0;f--){const d=f/(c-1),u=6*t+d*r*.7,p=(5+d*36)*t*i*me(n,.9,1.1),m=(5+d*13)*t,M=[[o,u-4*t],[o+p*.5,u+m*.3],[o+p,u+m],[o+p*.7,u+m*1.15],[o,u+m*.7],[o-p*.7,u+m*1.15],[o-p,u+m],[o-p*.5,u+m*.3]];a.shape(Qa(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+f,line:!1,round:e.round}),a.mark([[o-p,u+m*.55],[o+p,u+m*.55],[o+p,u+m*1.4],[o-p,u+m*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+m*.45],[o-p*.7,u+m*.7]],l.LEAF2,[l.LEAF])}return Gn(a,o,r*.82)}function d0(n,e,t){const i=ci(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new ft(s,r),o=s/2,h=r,c=13*t,f=gn(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,c,c*.8,e,n,{bend:1.6}),d=[];for(let m=0;m<5;m++){const M=m%2?1:-1,g=-Math.PI/2+M*me(n,.55,1.25)*(.7+.3*i),x=gn(a,f.end,g,r*me(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});d.push(x.end)}Gi(a,o,h,c,e,n,t),is(a,e);for(const m of d)yn(a,xt(m,[0,-2*t]),me(n,20,28)*t,me(n,9,12)*t,e,n);yn(a,xt(f.end,[0,-8*t]),24*t,11*t,e,n);let u=s,p=0;for(const m of d)u=Math.min(u,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=u;m<p;m+=me(n,1,1.7)){let M=r;for(let S=0;S<r;S++)if(a.get(m,S)===l.LEAF||a.get(m,S)===l.LEAF2||a.get(m,S)===l.LEAF3){M=S;break}if(M>=r)continue;const g=Math.abs(m-o)/(s/2),x=(h-M)*me(n,.5,.9)*(1-g*.3),v=dt(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let S=M+2;S<Math.min(h-2,M+x);S++){const y=Math.round(Math.sin(S*.12+m)*.7);dt(m|0,S,5)<.2+e.density*.8&&a.px(m+y,S,(S-M)/x>.8?l.LEAF3:v,y*.3,.2,.95)}}return Gn(a,o,f.end[1]+6*t)}function Fu(n,e,t){const i=.7+.3*ci(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new ft(s,r),o=s/2,h=r,c=(n()-.5)*.25+(e.treeLean||0),f=gn(a,[o,h],-Math.PI/2+c,r*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<f.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const m=Tn(f.pts[u],f.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(m[0]+M,m[1])===l.BARK2&&n()<.8&&a.recolour(m[0]+M,m[1],l.BARKD)}const d=[f.end];for(let u=0;u<7;u++){const p=me(n,.35,.9),m=Tn(f.pts[0],f.end,p),M=u%2?1:-1,g=gn(a,m,-Math.PI/2+M*me(n,.5,1),r*me(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});d.push(g.end)}for(const u of d)yn(a,u,me(n,9,13)*t*i,me(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return Gn(a,o,r*.55)}function f0(n,e,t){const i=ci(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new ft(s,r),o=s/2,h=r,c=10*t,f=gn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,c,c*.75,e,n,{bend:1.2}),d=[];for(const m of[-1,1,-1,1]){const M=gn(a,f.end,-Math.PI/2+m*me(n,.7,1.15)*(.7+.3*i),r*me(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});d.push(M.end,Tn(f.end,M.end,.55))}Gi(a,o,h,c,e,n,t),is(a,e);const u=Math.round(me(n,2,3)),p=Math.min(...d.map(m=>m[1]));for(let m=0;m<u;m++){const M=p-6*t+m*9*t,g=(95-m*12)*t*(.65+.35*i);for(let x=0;x<5;x++)yn(a,[o+(x-2)*g*.36+me(n,-5,5)*t,M+me(n,-3,3)*t],g*me(n,.2,.26),7*t,e,n,{mat:m===u-1?l.LEAF:l.LEAF3})}return Gn(a,o,f.end[1]+4*t)}function or(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:f=!1,mats:d=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),g=s()*1e4|0;for(let x=m;x<=M;x++)for(let v=u;v<=p;v++){const S=n.get(v,x);if(!d.includes(S))continue;const y=bi(v/r,x/r,g),E=dt(v,x,g);a&&y<a?n.recolour(v,x,l.LEAF3):y>1-o&&n.recolour(v,x,l.LEAF2),h&&E<h&&S!==l.LEAF3&&(n.recolour(v,x,c),f&&n.recolour(v,x-1,c))}}function Wi(n,e,t,i){const s=ci(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new ft(r,a),h=r/2,c=a,f=e.treeTrunks||i.trunks||1,d=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(f),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=a;const M=(E,b,A,_,w)=>{const C=gn(o,E,b,A,_,_*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(w===0){p.push(C.end);return}const R=n()<(i.fork??.35)?3:2;for(let P=0;P<R;P++)M(C.end,C.ang+(P-(R-1)/2)*me(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,A*me(n,.6,.78),_*.62,w-1);w<=2&&p.push(Tn(E,C.end,.7))};for(let E=0;E<f;E++){const b=u+(f>1?(E/(f-1)-.5)*(i.fan||.8):0),A=[h+(E-(f-1)/2)*d*.6,c],_=gn(o,A,-Math.PI/2+b,a*(i.trunk||.36)*(f>1?me(n,.8,1.1):1),d,d*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,_.end[1]);for(let w=0;w<(i.limbs||2);w++){const C=w%2?1:-1;M(_.end,-Math.PI/2+b*.5+C*me(n,.5,1)*(i.spreadA||.8)*(f>1?.7:1),a*(i.limb||.22)*(f>1?.75:1),d*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,d*.55,2),E===0&&e.treeHollow){const w=Tn(A,_.end,.38);o.ellipse(w[0],w[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(i.noRoots||Gi(o,h,c,d*Math.sqrt(f),e,n,t*(i.rootK||1)),i.smooth||is(o,e),e.treeBare)return Gn(o,h,m+4*t);p.sort((E,b)=>E[1]-b[1]);const[g,x]=i.clumpR||[12,18],v=i.flat||.7,S=[],y=(E,b,A,_)=>{yn(o,E,b,A,e,n,{mat:_,ragged:i.ragged||1}),S.push([E,b,A])};for(const E of p)y(xt(E,[0,-3*t]),me(n,g,x)*t,me(n,g,x)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const E of p)n()<(i.extra??.7)&&y(xt(E,[me(n,-9,9)*t,me(n,-12,-3)*t]),me(n,g,x)*t*.7,me(n,g,x)*t*v*.7,l.LEAF);if(i.dome){const E=Math.min(...p.map(w=>w[1])),b=p.map(w=>w[0]),A=(Math.min(...b)+Math.max(...b))/2,_=(Math.max(...b)-Math.min(...b))/2;for(let w=0;w<i.dome;w++){const C=w/Math.max(1,i.dome-1)-.5;y([A+C*_*1.1,E-(1-4*C*C)*14*t-me(n,2,6)*t],me(n,g,x)*t*1.1,me(n,g,x)*t*v,l.LEAF)}}if(i.layers)for(const[E,b,A]of S)for(let _=-A;_<A;_+=Math.max(3,i.layers*t))for(let w=-b;w<b;w++)o.get(E[0]+w,E[1]+_)===l.LEAF&&o.recolour(E[0]+w,E[1]+_,l.LEAF3);for(const[E,b,A]of S)or(o,E,b,A,n,i.tex||{});return Gn(o,h,m+4*t)}function p0(n,e,t){return Wi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function m0(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function g0(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function x0(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function M0(n,e,t){return Wi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function v0(n,e,t){return Wi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function _0(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function b0(n,e,t){const i=.7+.3*ci(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new ft(s,r),o=s/2,h=r,c=e.treeTrunks||1,f=(n()-.5)*.2+(e.treeLean||0),d=[];for(let p=0;p<c;p++){const m=gn(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+f+(c>1?(p/(c-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const g=me(n,.3,.97),x=Tn(m.pts[0],m.end,g),v=M%2?1:-1,S=(1-g*.6)*r*.12*i,y=gn(a,x,-Math.PI/2+v*me(n,.7,1.2),S,2*t,1,e,n,{group:12,mat:l.BARKD});d.push([y.end,(8+(1-g)*6)*t*i],[Tn(x,y.end,.4),(7+(1-g)*4)*t*i])}d.push([m.end,7*t])}Gi(a,o,h,6*t,e,n,t*.6),is(a,e);for(const[p,m]of d)yn(a,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of d)or(a,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...d.map(([p])=>p[1]));return Gn(a,o,u+(h-u)*.45)}function y0(n,e,t){const i=.8+.2*ci(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new ft(s,r),o=s/2,h=r,c=gn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});is(a,e);for(let d=0;d<a.h*.55;d++)for(let u=0;u<s;u++)(a.get(u,d)===l.TRUNK||a.get(u,d)===l.BARKD)&&a.recolour(u,d,dt(u,d,3)<.15?l.BARKD:l.BELLY);Gi(a,o,h,8*t,e,n,t*.7);const f=[];for(let d=0;d<6;d++){const u=me(n,.55,1),p=Tn(c.pts[0],c.end,u),m=d%2?1:-1,M=gn(a,p,-Math.PI/2+m*me(n,.6,1.3),r*me(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});f.push(M.end)}f.push(c.end);for(const d of f)yn(a,xt(d,[0,-2*t]),me(n,13,19)*t*i,me(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const d of f)or(a,xt(d,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Gn(a,o,Math.min(...f.map(d=>d[1]))+8*t)}function S0(n,e,t){const i=ci(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new ft(s,r),o=s/2,h=r,c=e.treeTrunks||3,f=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)gn(a,[o+(p-(c-1)/2)*f*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),r*.3,f,f*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<r;p++)for(let m=0;m<s;m++)a.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&a.recolour(m,p,l.BARKD);Gi(a,o,h,f*1.4,e,n,t);const d=h-r*.3,u=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(m)*M,d+Math.sin(m)*M*.55+10*t],me(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,d-me(n,4,22)*t],me(n,20,26)*t]);u.push([[o,d-24*t],26*t]);for(const[p,m]of u)yn(a,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of u)or(a,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Gn(a,o,d+4*t)}function w0(n,e,t){return Wi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function E0(n,e,t){const i=.8+.2*ci(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new ft(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let f=0;f<10;f++){const d=f/9,u=10*t+d*r*.72,p=(5+d*28)*t*i,m=1+Math.round(d*3);for(let M=0;M<m;M++)c.push([[o+(m>1?(M/(m-1)-.5)*p*1.3:0)+me(n,-2,2)*t,u+me(n,-2,2)*t],(6+d*5)*t])}for(const[f,d]of c)yn(a,f,d*1.2,d,e,n,{mat:l.LEAF3,ragged:.7});for(const[f,d]of c)or(a,f,d*1.2,d,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Gn(a,o,r*.85)}function A0(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function T0(n,e,t){const i=Fu(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||dt(r,1,7)<.35)continue;const o=(s.h-a)*me(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===l.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,dt(r,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function R0(n,e,t){const i=.8+.2*ci(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new ft(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),Gi(a,o,h,6*t,e,n,t*.5),is(a,e);const c=14;for(let f=0;f<c;f++){const d=f/(c-1),u=8*t+d*r*.68,p=(4+d*30)*t*i;for(let m=0;m<4;m++){const M=[o+(m/3-.5)*p*1.6,u+Math.abs(m/3-.5)*6*t];yn(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),or(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return Gn(a,o,r*.8)}const C0=6;function L0(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,c=r.low||(r.low=new Uint8Array(o*h)),f=Math.ceil(a+C0*i);if(f>=h-2)return n;const d=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-d)/.5)),p=!!t.treeBare,m=w=>{const C=[];let R=-1;for(let P=0;P<=o;P++){const I=P<o&&Tr.has(r.m[w*o+P]);I&&R<0&&(R=P),!I&&R>=0&&(C.push([R,P-1]),R=-1)}return C},M=(w,C)=>w.reduce((R,P)=>!R||Math.abs((P[0]+P[1])/2-C)<Math.abs((R[0]+R[1])/2-C)?P:R,null),g=w=>{const C=r.m.slice(),R=r.n.slice();w();for(let P=0;P<C.length;P++)r.m[P]!==C[P]&&((P/o|0)<f||C[P]&&!Tr.has(C[P])&&!c[P]?(r.m[P]=C[P],r.n[P*3]=R[P*3],r.n[P*3+1]=R[P*3+1],r.n[P*3+2]=R[P*3+2]):c[P]=1)},x=()=>{for(let w=0;w<8;w++){const C=Math.round(me(e,f,h-3)),R=m(C);if(R.length){const P=sc(e,R),I=e()<.5?-1:1;return{x:I<0?P[0]:P[1],y:C,side:I}}}return null},v=p?0:1,S=h-1;let y=o,E=0;for(let w=0;w<f*o;w++)if(r.m[w]&&!Tr.has(r.m[w])){const C=w%o;y=Math.min(y,C),E=Math.max(E,C)}const b=Math.max(6*i,(E-y)*.22);s.moss&&g(()=>{for(let w=Math.max(f,Math.round(h-(h-f)*.4));w<h;w++)for(let C=0;C<o;C++){const R=w*o+C;if(!Tr.has(r.m[R]))continue;const P=w>0&&!r.m[R-o];(bi(C/2.5,w/2.5,41)>1-s.moss*(.35+.4*(w-f)/(h-f))||P&&dt(C,w,9)<s.moss*.6)&&(r.m[R]=dt(C,w,5)<.3?l.LEAF2:l.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&g(()=>{let w=o/2;const C=S-(S-f)*me(e,.45,.95)*Math.min(1,s.ivy+.3),R=e()*6;for(let P=S-1;P>C;P--){const I=M(m(P),w);if(!I)break;if(w=I[0]+(I[1]-I[0])*(.5+.48*Math.sin(P*.22+R)),r.px(w,P,l.LEAF3,0,0,1),dt(Math.round(w),P,13)<.45){const O=dt(P,3,2)<.5?-1:1;r.px(w+O,P,l.LEAF,O*.5,-.3,.8),r.px(w+O*2,P,l.LEAF3,O*.6,0,.8),r.px(w+O,P-1,dt(w,P,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const A=Math.round(s.sprigs*v*(5+8*u)*(h-f)/(40*i));for(let w=0;w<A;w++){const C=x();if(!C)break;const R=me(e,3,5.5)*i;g(()=>yn(r,[C.x+C.side*R*.6,C.y],R,R*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const _=Math.round(s.boughs*v*(3+4*u)*(h-f)/(45*i)+(e()<s.boughs*v?1:0));for(let w=0;w<_;w++){const C=x();if(!C)break;g(()=>{const R=gn(r,[C.x,C.y],-Math.PI/2+C.side*me(e,.9,1.35),Math.min(b,me(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),P=me(e,6,9.5)*i;yn(r,xt(R.end,[0,-1*i]),P,P*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(s.skirt&&v){const w=Math.round(3+s.skirt*5+u*3);for(let C=0;C<w;C++)g(()=>{const R=Math.round(me(e,Math.max(f,h-(h-f)*.8),h-4*i)),P=M(m(R),o/2);if(!P)return;const I=C%2?1:-1,O=I<0?P[0]:P[1],k=Math.min(b*1.3,me(e,14,24)*i*(.6+s.skirt*.5)),G=gn(r,[O,R],-Math.PI/2+I*me(e,1.6,1.95),k,1.6*i,1,t,e,{group:12,mat:l.BARKD});yn(r,Tn([O,R],G.end,.6),k*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const P0={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},D0=(n,e)=>(t,i,s)=>L0(n(t,i,s),t,i,s,e),Oa={broad:{fn:h0,name:"gnarled broadleaf",grow:"normal"},fir:{fn:u0,name:"spruce",grow:"narrow",hue:.06},willow:{fn:d0,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Fu,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:f0,name:"field maple",grow:"normal",hue:.01},oak:{fn:p0,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:m0,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:g0,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:x0,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:M0,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:v0,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:_0,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:b0,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:y0,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:S0,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:w0,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:E0,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:A0,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:T0,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:R0,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Oa))e.bare=e.fn,e.fn=D0(e.fn,P0[n]||{});const I0=new Map(Object.entries(Oa).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),dc=n=>Oa[n]||Oa.broad;function to(n,e,t){const i=I0.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:de(e.trunkHue,.45*e.sat,.34),[l.BARKD]:de(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:de(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:de(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[l.LEAF2]:de(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[l.LEAF3]:de(h+.03,Math.min(1,.66*e.sat*s),.38*r),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=de(...i.trunk)),i?.upper&&(c[l.BELLY]=de(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function Uu(n){const{sp:e,crownY:t}=n,i=new ft(e.w,e.h),s=new ft(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Tr.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function O0(n,e){const t=e.bushSize,i=sc(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new ft(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)yn(a,[s/2+me(n,-9,9)*t,r-8*t+me(n,-4,2)*t],me(n,7,10)*t,me(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const f=s/2+me(n,-12,12)*t,d=r-me(n,5,17)*t;a.get(f,d)&&a.recolour(f,d,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let f=s/2,d=r-1;for(let u=0;u<15*t;u++)f+=Math.cos(c)*.9,d+=Math.sin(c)*.9+u*.06,a.put(f,d,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(f,d-1,l.LEAF2,0,-.5,.85),a.put(f+Math.sign(Math.cos(c)),d+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=s/2+me(n,-13,13)*t,f=me(n,5,15)*t,d=me(n,-3,3);for(let u=0;u<f;u++)a.put(c+d*u/f*(u/f),r-1-u,u>f*.65?l.LEAF2:u<f*.3?l.LEAF3:l.LEAF,d*.1,-.3,.9)}const o=to(n,e,null);return o[l.FLOWER]=de(n(),.55,.95),{sp:a,colours:o}}const Ve=(n,e={})=>["tree",{type:n,...e}],Ge=(n,e={})=>[n,e],Ur=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ge("water",{w:1.6})],small:[Ge("grass",{h:1.4})],big:[Ge("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ge("fern")],big:[Ve("larch",{scale:1.1}),Ve("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ge("stump",{snag:!0})],big:[Ve("sycamore",{trunks:3,gnarl:.9}),Ve("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ge("henge")],small:[Ge("stones")],big:[Ge("boulder")],set:Ge("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ge("bramble",{bare:!0})],big:[Ve("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ve("birch",{scale:.75})],big:[Ve("lime",{trunks:3,thick:1.4}),Ve("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ge("mound",{brown:!0})],big:[Ve("hazel",{gnarl:1,scale:.95}),Ve("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ge("wall")],small:[Ge("flowerbed")],big:[Ve("willow")],set:Ge("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ve("broad",{trunks:4,scale:.5,thin:!0})],big:[Ve("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ge("flowers",{hue:.98,leafy:!0})],big:[Ve("yew",{scale:1.4,gnarl:1,lean:.35}),Ve("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ge("stones",{big:!0})],big:[Ve("fir",{scale:1.2}),Ve("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ge("stump",{grass:!0})],big:[Ve("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ge("shrub",{flower:[250,245,235]})],big:[Ve("chestnut",{scale:1.1}),Ve("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ge("cones",{acorn:!0}),Ge("log",{branch:!0})],big:[Ve("oak",{gnarl:.9,hollow:!0}),Ve("holly",{minor:!0,scale:.8})],set:Ve("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[200,30,60]})],big:[Ve("pine",{scale:1.2}),Ve("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ge("water"),Ge("reeds",{tall:!0})],small:[Ge("reeds")],big:[Ve("willow"),Ve("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ge("water",{w:2})],small:[Ve("broad",{scale:.45})],big:[Ve("alder",{scale:.95,gnarl:.3}),Ve("willow",{minor:!0,scale:.8})],set:Ge("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ge("boulder",{big:!0})],small:[Ge("stones",{big:!0})],big:[Ve("rowan",{scale:1.1}),Ve("pine",{minor:!0})],set:Ge("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ge("water",{bog:!0})],small:[Ge("reeds",{cotton:!0})],big:[Ve("birch",{scale:.8,dark:!0}),Ve("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ge("log",{branch:!0})],big:[Ve("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ge("rockwall")],small:[Ge("stalagmite")],big:[Ve("broad",{bare:!0}),Ve("yew",{minor:!0,scale:.8})],set:Ge("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ge("mound",{brown:!0,small:!0})],big:[Ve("flat",{scale:1.1}),Ve("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ge("water",{w:2})],small:[Ge("stump",{gnawed:!0})],big:[Ve("weepingBirch"),Ve("alder",{minor:!0,scale:.8})],set:Ge("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ge("fungi")],big:[Ge("log",{rot:!0})],set:Ge("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ge("shrub",{flower:[250,205,40],spiky:!0})],big:[Ve("birch",{lean:.45,scale:.75}),Ve("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ge("cones")],big:[Ve("pine",{scale:1.35}),Ve("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ge("rockwall",{moss:!0})],small:[Ge("fern")],big:[Ge("boulder",{moss:!0,big:!0})],set:Ge("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ge("fern")],big:[Ve("beech",{gnarl:.2,scale:1.1}),Ve("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ge("hedge",{berries:!0})],small:[Ge("web")],big:[Ve("holly",{scale:.9}),Ve("yew",{minor:!0,scale:.7})],set:Ve("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[250,230,170]})],big:[Ve("hazel",{trunks:5,scale:.7,thin:!0}),Ve("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(Pu)){const i=Ur.find(s=>s.id===n);i&&!i.set&&(i.set=Ge(e,{three:!0}),i.text={...i.text,set:t})}const ku=Object.fromEntries(Ur.map(n=>[n.id,n])),N0=["ruins","rocks","freak","lake","modern"],wt=(n,e,t,i,s,r,a,o,h,c,f={})=>({pattern:n,...f,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(N0.map((d,u)=>[d,h[1][u]]))},feel:c}),kt=[0,0],F0={moor:wt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":wt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,kt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":wt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,kt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":wt("rings",.35,.8,[1,[10,14]],null,.3,kt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":wt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,kt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":wt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,kt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":wt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,kt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:wt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,kt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":wt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:wt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:wt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,kt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":wt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:wt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,kt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":wt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,kt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":wt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,kt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:wt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,kt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:wt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,kt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":wt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:wt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,kt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:wt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,kt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":wt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,kt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:wt("lone",.1,.5,[0],[.3,.5,.2,0],.2,kt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":wt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,kt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":wt("groves",.5,.7,[2,[6,10]],null,.7,kt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:wt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":wt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,kt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:wt("edgeOnly",.55,.6,[1,[6,9]],null,.8,kt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":wt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,kt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":wt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,kt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":wt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,kt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Ur)n.layout=F0[n.id];function U0(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new ft(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let g=0;g<t;g++){const x=(bi(g/7,M/5,c)*(t-g)*(i-M)+bi((g-t)/7,M/5,c)*g*(i-M)+bi(g/7,(M-i)/5,c)*(t-g)*M+bi((g-t)/7,(M-i)/5,c)*g*M)/(t*i),v=x<.38?l.BODY2:x>.64?l.BELLY:l.BODY;h.px(g,M,v,0,-.42,.91)}const f=Fr(c),d=(M,g,x)=>h.px((M%t+t)%t,(g%i+i)%i,x,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const g=Math.floor(f()*t),x=Math.floor(f()*i);if(s==="needles"){const v=f()<.5?1:-1;for(let S=0;S<3;S++)d(g+S*v,x+(S>>1),f()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let S=0;S<v;S++)d(g,x-S,S===v-1?l.LEAF2:l.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&f()<.5&&d(g+1,x-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(d(g,x,l.ACCENT),f()<.6&&d(g+1,x,l.ACCENT),f()<.4&&d(g,x+1,l.BODY2),s==="roots"&&f()<.5)for(let v=0;v<5;v++)d(g+v,x+(v>2?1:0),l.TRUNK)}else if(s==="leaves")d(g,x,l.FLOWER),d(g+1,x,l.FLOWER),f()<.5&&d(g,x+1,l.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)d(g+v,x,l.BODY2)}const p={flowers:de(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:de(r+.02,.65,.6)}[s]||de(r,.3,.6),m={[l.BODY]:de(r,a*e.sat,o),[l.BODY2]:de(r+.02,a*e.sat*1.1,o*.78),[l.BELLY]:de(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:s==="needles"?de(.07,.5,.5):de(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:de(n.leaf,.55*e.sat,.45),[l.LEAF2]:de(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:de(e.trunkHue,.4,.3)};return{sp:h,colours:m}}const ps=n=>({[l.ACCENT]:de(.1,.06,.6),[l.BODY2]:de(.62,.08,.4),[l.BELLY]:de(.1,.05,.78),[l.LEAF]:de(.27,.5,.45),[l.LEAF2]:de(.25,.45,.62),[l.NOSE]:[20,16,24]});function $s(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,f=1+(r()-.5)*.3;o.push([e[0]+Math.cos(c)*t*f,e[1]+Math.sin(c)*i*f*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:s.round}),n.mark([xt(e,[-t,i*.1]),xt(e,[t,i*.1]),xt(e,[t,i]),xt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([xt(e,[-t*.6,-i*.8]),xt(e,[t*.1,-i*1.1]),xt(e,[t*.3,-i*.5]),xt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(Qa([xt(e,[-t*1.1,-i*.55]),xt(e,[0,-i*1.3]),xt(e,[t*1.1,-i*.5]),xt(e,[t*.6,-i*.2]),xt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function Ea(n,e,t,i,s,r){const a={[l.LEAF]:de(t.leaf,.6*i.sat,.55),[l.LEAF2]:de(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:de(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:de(i.trunkHue,.45*i.sat,.34),[l.BARKD]:de(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:de(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:de(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=dc(e.type).fn,g={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},x=M(s,g,i.treeSize*r*(e.scale||1)*me(s,.9,1.1)),v=to(s,g,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=de(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:x.sp,colours:v}}if(n==="shrub"){const M=O0(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let g=0;g<M.sp.m.length;g++)M.sp.m[g]&&dt(g,1,3)<(e.spiky?.18:.1)&&M.sp.m[g]!==l.TRUNK&&(M.sp.m[g]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*r*(e.w||1)),f=Math.round(32*r),d=new ft(c,f),u=c/2,p=f;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,g=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&d.shape([[u-20*r,p-2],[u-18*r,p-6*r],[u+18*r,p-6*r],[u+20*r,p-2],[u+20*r,p],[u-20*r,p]],l.ACCENT,{group:2,line:!0});for(let x=0;x<M;x++){const v=u+me(s,-16,16)*r,S=g*me(s,.5,1),y=n==="fern"?me(s,-6,6)*r:me(s,-2,2)*r,E=p-1-(n==="flowerbed"?5*r:0);for(let b=0;b<S;b++){const A=b/S;d.px(v+y*A*A,E-b,A>.7?l.LEAF2:A<.3?l.LEAF3:l.LEAF,y*.05,-.3,.9),n==="fern"&&b%2&&d.px(v+y*A*A+(y>0?1:-1),E-b+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let b=0;b<(e.cotton?2:3);b++)d.px(v+y,E-S-b,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(d.px(v+y,E-S,l.FLOWER,0,-.5,.85),d.px(v+y+1,E-S,l.FLOWER,0,-.5,.85))}if(m={...a,[l.FLOWER]:n==="flowerbed"?sc(s,[[230,80,120],[250,210,60],[150,110,230]]):de(e.hue??.95,.6,.85),[l.TRUNK]:de(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:de(.08,.1,.55)},n==="flowerbed"){for(let x=0;x<d.m.length;x++)d.m[x]===l.FLOWER&&dt(x,2,7)<.5&&(d.m[x]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)$s(d,[u+me(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*me(s,.7,1.2),(e.big?5:2.5)*r,i,s);m=ps()}else if(n==="boulder")$s(d,[u,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),m={...ps(),...a,[l.ACCENT]:de(.1,.06,.6)};else if(n==="henge")d.shape([[u-7*r,p],[u-8*r,p-18*r],[u-4*r,p-28*r],[u+5*r,p-27*r],[u+8*r,p-14*r],[u+7*r,p]],l.ACCENT,{group:5,line:!0,round:i.round}),d.mark([[u-9*r,p-30*r],[u+9*r,p-30*r],[u+9*r,p-22*r],[u-9*r,p-18*r]],l.LEAF,[l.ACCENT]),m={...ps(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,g=(e.small?5:8)*r;d.shape(Qa([[u-M,p],[u-M*.6,p-g*.8],[u,p-g],[u+M*.6,p-g*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),d.mark([[u-M,p-g*.45],[u+M,p-g*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...a,...o,[l.TRUNK]:de(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(d.limb([[u,p,M*2.2],[u,p-8*r,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),d.shape([[u-M*.8,p-8*r],[u,p-10*r-(e.gnawed?4*r:0)],[u+M*.8,p-8*r],[u,p-7*r]],l.BELLY,{group:6,round:i.round}),e.snag&&d.limb([[u+M*.4,p-8*r,2.5*r],[u+M*1.6,p-15*r,1.5*r]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let g=0;g<20;g++){const x=u+me(s,-14,14)*r,v=me(s,6,13)*r;for(let S=0;S<v;S++)d.px(x,p-1-S,S>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,g=(e.giant?14:e.branch?3:8)*r;if(d.limb([[u-M/2,p-g/2,g],[u+M/2,p-g/2-(e.branch?2*r:0),g*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||d.shape([[u+M/2-g*.1,p-g],[u+M/2+g*.2,p-g/2],[u+M/2-g*.1,p],[u+M/2-g*.3,p-g/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let x=0;x<(e.giant?6:3);x++){const v=u+me(s,-M/2,M/3);d.shape([[v-3*r,p-g*.9],[v,p-g-3*r],[v+3*r,p-g*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&d.limb([[u,p-g,g*.7],[u+5*r,p-g-6*r,g*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const g=u+me(s,-12,12)*r,x=me(s,3,7)*r,v=me(s,3,5)*r;d.limb([[g,p,1.6*r],[g,p-x,1.4*r]],l.BELLY,{group:5}),d.shape([[g-v,p-x],[g,p-x-v*.8],[g+v,p-x]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const g=u+me(s,-14,14)*r,x=p-2*r;d.ellipse(g,x,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,l.TRUNK,{round:i.round}),e.acorn?d.ellipse(g,x-1.6*r,1.8*r,1*r,l.BARKD,{round:i.round}):d.px(g,x-1,l.BARKL)}m=o}else if(n==="water"){const M=22*r*(e.w||1),g=6*r;d.shape([[u-M,p-g],[u-M*.3,p-g*1.5],[u+M*.6,p-g*1.2],[u+M,p-g*.5],[u+M*.4,p],[u-M*.7,p-g*.2]],l.MAGIC,{group:5,round:.2});for(let x=0;x<6;x++){const v=u+me(s,-M*.6,M*.6),S=p-g*me(s,.4,1.1);for(let y=0;y<3*r;y++)d.recolour(v+y,S,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let x=0;x<d.m.length;x++)d.m[x]===l.MAGIC?d.m[x]=l.BODY:d.m[x]===l.MAGIC2&&(d.m[x]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,g=(n==="hedge"?18:12)*r;for(let x=0;x<(n==="hedge"?6:4);x++){const v=u+me(s,-M*.8,M*.8),S=p-g*me(s,.4,.7);d.ellipse(v,S,me(s,6,9)*r,g*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:x})}for(let x=0;x<8;x++){let S=u+me(s,-M,M),y=p;for(let E=0;E<g*1.2;E++)S+=Math.sin(E*.3+x)*.8,y-=.8,d.px(S,y,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let x=0;x<d.m.length;x++)d.m[x]&&d.m[x]!==l.TRUNK&&dt(x,5,9)<.05&&(d.m[x]=l.FLOWER);m={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,g=12*r;d.shape([[u-M,p],[u-M,p-g],[u+M,p-g],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),d.shape([[u-M-1,p-g],[u-M-1,p-g-2*r],[u+M+1,p-g-2*r],[u+M+1,p-g]],l.BELLY,{group:6,line:!0,depth:2}),d.shape([[u+M-6*r,p-g-2*r],[u+M-6*r,p-g-7*r],[u+M,p-g-7*r],[u+M,p-g-2*r]],l.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(u+M-3*r,p-g-9*r,3*r,2.5*r,l.BELLY,{round:i.round});for(let x=p-g+3*r;x<p;x+=4*r)for(let v=u-M;v<u+M;v++)d.recolour(v,x,l.BODY2);m=ps()}else if(n==="rockwall"){for(let M=0;M<5;M++)$s(d,[u+(M-2)*9*r,p-me(s,8,14)*r],8*r,10*r,i,s,e.moss);m={...ps(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const g=u+me(s,-14,14)*r,x=me(s,5,11)*r;d.shape([[g-3*r,p],[g-1*r,p-x],[g+1*r,p-x],[g+3*r,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=ps()}else if(n==="web"){const M=[u,p-14*r],g=11*r;for(let x=0;x<8;x++){const v=x/8*Math.PI*2;for(let S=0;S<g;S++)d.px(M[0]+Math.cos(v)*S,M[1]+Math.sin(v)*S,l.WEB,0,0,1)}for(let x=3*r;x<g;x+=3*r)for(let v=0;v<Math.PI*2;v+=.05)d.px(M[0]+Math.cos(v)*x,M[1]+Math.sin(v)*x,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:d,colours:m}}function k0(n,e,t,i,s,r){if(e.three)return yf(n,t,i);if(n==="tree"||n==="log")return Ea(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new ft(a,o),c=a/2,f=o;let d={...ps(),[l.LEAF]:de(t.leaf,.55,.5),[l.LEAF2]:de(t.leaf-.04,.5,.7),[l.TRUNK]:de(i.trunkHue,.45,.34),[l.BARKD]:de(i.trunkHue+.03,.5,.17),[l.MAGIC]:de(i.magicHue,.6,1),[l.MAGIC2]:de(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*r,f],[c-14*r,f-6*r],[c+14*r,f-6*r],[c+16*r,f]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*r,f-6*r],[c-9*r,f-26*r],[c+9*r,f-26*r],[c+9*r,f-6*r]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*r,f-10*r],[c-5*r,f-20*r],[c,f-23*r],[c+5*r,f-20*r],[c+5*r,f-10*r]],l.NOSE,{group:7}),h.shape([[c-13*r,f-26*r],[c,f-34*r],[c+13*r,f-26*r]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,f-13*r,2.5*r,2.5*r,l.MAGIC2,{round:.5}),h.mark([[c-14*r,f-36*r],[c+2*r,f-36*r],[c-4*r,f-24*r],[c-14*r,f-24*r]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*r,f],[c-26*r,f-4*r],[c+26*r,f-4*r],[c+26*r,f]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*r,f-4*r,4*r],[c+u*r,f-34*r,4*r]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*r,f-34*r],[c-28*r,f-38*r],[c+28*r,f-38*r],[c+28*r,f-34*r]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*r,f-38*r],[c-16*r,f-54*r],[c,f-60*r],[c+16*r,f-54*r],[c+24*r,f-38*r]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=Ea("water",{w:1.8},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,g=Math.round(c-u.sp.w/2+m),x=f-u.sp.h+M;u.sp.m[p]&&h.inb(g,x)&&h.px(g,x,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*r,f-6*r,9*r],[c+34*r,f-10*r,8*r]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])$s(h,[c+u*r,f-p*r],m*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])$s(h,[c+u*r,f-p*r],m*r,M*r,i,s,p>30);h.shape([[c-15*r,f],[c-14*r,f-18*r],[c-4*r,f-28*r],[c+6*r,f-27*r],[c+14*r,f-16*r],[c+15*r,f]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=Ea("water",{w:1.9},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,g=Math.round(c-u.sp.w/2+m),x=f-u.sp.h+M-10*r;u.sp.m[p]&&h.inb(g,x)&&h.px(g,x,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+me(s,-32,32)*r,M=f-me(s,2,14)*r,g=me(s,-.5,.5),x=me(s,8,16)*r;h.limb([[m-Math.cos(g)*x/2,M-Math.sin(g)*x/2,2.6*r],[m+Math.cos(g)*x/2,M+Math.sin(g)*x/2,2*r]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])$s(h,[c+u*r,f-p*r],m*r,M*r,i,s,!0);for(let u=c-6*r;u<c+6*r;u++)for(let p=f-50*r;p<f-4*r;p++)h.px(u,p,dt(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*r,f],[c-14*r,f-6*r],[c+14*r,f-6*r],[c+18*r,f]],l.IRIS,{group:10,round:.2}),d[l.IRIS]=[90,150,190],d[l.PUPIL]=[210,235,245]}return{sp:h,colours:d}}function B0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Ja}={}){const s=ku[n];if(!s)throw new Error(`no area type "${n}"`);const r=Fr(n.split("").reduce((f,d)=>f*31+d.charCodeAt(0),7)>>>0),a=(f,d,u)=>({sp:bn(f.sp,f.colours,e,"none",i),kind:d,text:u}),o=U0(s,e),h=f=>(f||[]).map(([d,u])=>a(Ea(d,u,s,e,r,t),d,"")),c={def:s,floor:{sp:bn(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(c.walls.forEach(f=>f.text=s.text.wall),c.small.forEach(f=>f.text=s.text.small),c.big.forEach(f=>f.text=s.text.big),s.set){const f=k0(s.set[0],s.set[1],s,e,r,t);c.setPiece={...a(f,s.set[0],s.text.set),metres:f.metres,origin:f.origin}}return c}const z0=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],H0=16;function G0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Ja,ppm:s=H0}={}){const r=ku[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,f=[];let d=0;for(const u of z0)for(let p=0;p<u.count;p++,d++){const m=h.length&&(d===2||d===6)?h[(d===6?1:0)%h.length]:o[d%o.length],M=dc(m.type),g=M.fn,x=Fr(c*7+d*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,S=u.id==="sapling",y=u.id==="tall"||u.id==="giant",E=M.grow,b=E==="willow",A=E==="narrow"||m.bare,_=E==="wide",C=b?1+(v-1)*.45:E==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,R=(S?.78:1)*(b?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:A&&y?m.bare?.6:.85:y?1.06:1),P={...e,crownWidth:(e.crownWidth||3)*R,leafHue:r.leaf+(m.dark?.05:0),gnarl:Math.min(1,(m.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:m.bare,treeTrunks:S?1:m.trunks,treeLean:m.lean,treeThick:S?void 0:y&&m.thick?m.thick*1.1:m.thick,treeThin:S||m.thin,treeHollow:y&&m.hollow,treeWebs:m.webs},I=g(x,P,e.treeSize*t*(m.scale||1)*C*me(x,.95,1.05)),O=to(x,P,g);m.dark&&(O[l.LEAF]=O[l.LEAF3],O[l.LEAF3]=de(r.leaf+.05,.7,.22)),O[l.NOSE]=[20,16,24],O[l.WEB]=[225,225,232];const k=Uu(I),G=ie=>bn(ie,O,e,"none",i),K=ie=>+(ie/s).toFixed(2);f.push({heightClass:u.id,species:m.type,scale:+C.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:G(I.sp),top:G(k.top),bot:G(k.bot),crownY:I.crownY,metres:{height:K(I.sp.h),crownBase:K(I.sp.h-I.crownY),crownHeight:K(I.crownY),crownRadius:K(I.sp.w/2)}})}return f}const W0={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function V0(n){const e=new qe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:s=>s[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:s=>s[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,_s.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=mn(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,l.MAGIC2)}return i}const Aa={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function Y0(n,e){const t=new qe({blend:.04}),i=Object.keys(Aa).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=L.norm([Math.sin(r),.22,Math.cos(r)]),h=L.norm(L.cross(o,a)),c=[0,.46,0],f=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],d=(g,x)=>f.some(v=>v.some((S,y)=>{const E=v[y+1];if(!E)return!1;const b=E[0]-S[0],A=E[1]-S[1],_=Math.max(0,Math.min(1,((g-S[0])*b+(x-S[1])*A)/(b*b+A*A)));return Math.hypot(g-S[0]-b*_,x-S[1]-A*_)<.014})),u=g=>{const x=L.sub(g,c),v=[L.dot(x,a),L.dot(x,h)+.46,L.dot(x,o)];if(v[2]>s-.02){const S=(v[0]+.17)/.34,y=(.8-v[1])/.5;if(S>=0&&S<=1&&y>=0&&y<=1&&Su(S,y,i+1,.1))return l.RUNE}if(d(v[0],v[1]))return l.STONED;if(v[1]>.86&&dt(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&dt(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,s],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(L.add(L.add(c,L.mul(h,.53)),L.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:L.add(a,L.mul(h,.35)),up:h,cut:!0,paint:u});for(const[g,x,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([g,.015,x],[v,v*.4,v],l.MOSS,{group:2});for(let g=0;g<9;g++){const x=-.3+g*.07,v=.12+g%3*.025-g*.02,S=.07+g*37%5/60;t.seg([x,0,v],[x+(g%3-1)*.02,S,v+.01],.012,.004,g%3?l.LEAF:l.LEAF2,{group:10+g})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:Aa[n][0],[l.MAGIC2]:Aa[n][1],[l.LINE]:[40,40,50]},m=mn(t,{height:44}).sp;let M=0;for(let g=0;g<600&&M<5;g++){const x=Math.floor(dt(g,i,9)*m.w),v=Math.floor(dt(g,i,10)*m.h*.8);m.get(x,v)||m.get(x+1,v)||m.get(x-1,v)||m.get(x,v+1)||m.get(x,v-1)||(m.px(x,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:m,colours:p}}function X0(){const n=new qe({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],l.ACCENT,{group:30});return{sp:mn(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function K0(n,{makeCanvas:e=Ja}={}){const t=(c,f)=>bn(c,f,n,"none",e),i={campfire:[0,1,2].map(c=>t(V0(c),W0)),stones:{},pond:null};for(const c of Object.keys(Aa)){const f=Y0(c);i.stones[c]=t(f.sp,f.colours)}const s=X0(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let c=0;c<s.sp.m.length;c++)s.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function q0(n,e){const t=new Map,i=new Map,s=(h,c,f)=>(h*2097152+(c+1048576))*2097152+(f+1048576),r=(h,c,f)=>{const d=s(h,c,f);let u=t.get(d);if(!u){const p=Math.pow(2,-h);u=[p*(c+Pe(c*7+h,f,n)),p*(f+Pe(c,f*13+h,n+1))],t.set(d,u)}return u},a=(h,c,f)=>{const d=Math.pow(2,-h),u=Math.floor(c/d),p=Math.floor(f/d);let m=u,M=p,g=1/0;for(let x=-2;x<=2;x++)for(let v=-2;v<=2;v++){const S=r(h,u+x,p+v),y=(S[0]-c)**2+(S[1]-f)**2;y<g&&(g=y,m=u+x,M=p+v)}return[m,M]},o=(h,c,f)=>{const d=s(h,c,f);let u=i.get(d);if(u)return u;if(h===0)u=[c,f];else{const p=r(h,c,f),m=a(h-1,p[0],p[1]);u=o(h-1,m[0],m[1])}return i.set(d,u),u};return{seed:n,depth:e,site:(h,c)=>r(0,h,c),partition(h,c){const f=a(e,h,c);return o(e,f[0],f[1])},centreness(h,c,f){const d=r(0,f[0],f[1]),u=Math.hypot(h-d[0],c-d[1]);let p=1/0;const m=Math.floor(h),M=Math.floor(c);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const v=m+g,S=M+x;if(v===f[0]&&S===f[1])continue;const y=r(0,v,S);p=Math.min(p,Math.hypot(h-y[0],c-y[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let f=1/0,d=1/0;const u=Math.floor(h),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const g=r(0,u+m,p+M),x=Math.hypot(h-g[0],c-g[1]);x<f?(d=f,f=x):x<d&&(d=x)}return Math.min(1,2*f/(f+d))}}}function th(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),f=Math.max(1,Math.ceil(c/e));for(let d=0;d<f;d++){const u=d/f,p=u*u,m=p*u,M=(g,x,v,S)=>.5*(2*x+(-g+v)*u+(2*g-5*x+4*v-S)*p+(-g+3*x-3*v+S)*m);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const $0=new Set(["stream","wetland","bog","beaver-pond"]);class Z0{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=zi(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(m,M)=>m===0?[i.minX+M*r,i.minZ]:m===1?[i.maxX,i.minZ+M*a]:m===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(m,M,g,x)=>{const v=M[0]-m[0],S=M[1]-m[1],y=Math.hypot(v,S),E=Math.max(2,Math.round(y/g)),b=[m];let A=0;for(let _=1;_<E;_++){A=Dn(A+(s()-.5)*x,-x,x);const w=_/E;b.push([Dn(m[0]+v*w-S/y*A,i.minX,i.maxX),Dn(m[1]+S*w+v/y*A,i.minZ,i.maxZ)])}return b.push(M),th(b,3)},c=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let m=0;m<c;m++){const M=Math.floor(s()*4),g=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,x=h(o(M,.15+s()*.7),o(g,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:x,half:t.railHalf}),m===0&&x.length>20){const v=Math.floor(x.length*(.3+s()*.4)),S=x[v],y=Math.floor(s()*4),E=h(S,o(y,.2+s()*.6),300,120);this.lines.push({kind:"rail",pts:E,half:t.railHalf});const b=x[v+1][0]-S[0],A=x[v+1][1]-S[1],_=Math.hypot(b,A)||1,w=E[Math.min(E.length-1,6)],C=b*(w[1]-S[1])-A*(w[0]-S[0]);this.junctions.push({x:S[0],z:S[1],dx:b/_,dz:A/_,side:C>=0?1:-1,line:this.lines.length-2})}}const f=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let m=0;m<f;m++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),240,110),half:t.roadHalf})}const d=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let m=0;m<d;m++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),90,70),half:t.streamHalf})}const u=(m,M)=>$0.has(Xt[e.typeOf(m,M)].id);for(const[m,M]of e.neighbours){const[g,x]=m.split(",").map(Number);if(u(g,x))for(const v of M){const[S,y]=v.split(",").map(Number);if(m>v||!u(S,y))continue;const[E,b]=this.trim(e.siteOf(g,x),e.siteOf(S,y),this.clearOf(g,x),this.clearOf(S,y));E&&this.lines.push({kind:"stream",pts:this.meander(E,b,s),half:t.streamHalf})}}const p=new Set;for(const[m,M]of e.neighbours){const[g,x]=m.split(",").map(Number);for(const v of M){const S=m<v?`${m}|${v}`:`${v}|${m}`;if(p.has(S))continue;p.add(S);const[y,E]=v.split(",").map(Number);if(y<0||E<0||y>=e.n||E>=e.n||Pe(g*31+y,x*31+E,e.seed+811)>t.linkChance)continue;const[b,A]=this.trim(e.siteOf(g,x),e.siteOf(y,E),this.clearOf(g,x),this.clearOf(y,E));b&&this.lines.push({kind:"path",pts:this.meander(b,A,s),half:t.pathHalf})}if(Pe(g,x,e.seed+813)<t.deadEndChance){const v=e.siteOf(g,x),S=s()*Math.PI*2,y=30+s()*40,E=this.clearOf(g,x),b={x:v.x+Math.cos(S)*E,z:v.z+Math.sin(S)*E};this.lines.push({kind:"path",pts:this.meander(b,{x:b.x+Math.cos(S)*y,z:b.z+Math.sin(S)*y},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((m,M)=>{for(let g=0;g<m.pts.length-1;g++){const[x,v]=[m.pts[g],m.pts[g+1]],S=m.half+4;for(let y=Math.floor((Math.min(x[0],v[0])-S)/this.cell);y<=Math.floor((Math.max(x[0],v[0])+S)/this.cell);y++)for(let E=Math.floor((Math.min(x[1],v[1])-S)/this.cell);E<=Math.floor((Math.max(x[1],v[1])+S)/this.cell);E++){const b=`${y},${E}`;let A=this.grid.get(b);A||this.grid.set(b,A=[]),A.push([M,g])}}}),this.placePieces()}map;lines=[];pieces=[];junctions=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,s=(o,h,c,f)=>{if(e.hardClear(h,c)||this.pieces.some(m=>Math.hypot(m.x-h,m.z-c)<Math.max(12,m.r+f)))return;const d={id:o,x:h,z:c,r:f};this.pieces.push(d);const u=`${Math.floor(h/this.cell)},${Math.floor(c/this.cell)}`;let p=this.pieceGrid.get(u);p||this.pieceGrid.set(u,p=[]),p.push(d)},r=(o,h,c)=>{const f=o.pts[h],d=o.pts[Math.min(o.pts.length-1,h+1)],u=d[0]-f[0],p=d[1]-f[1],m=Math.hypot(u,p)||1;return[f[0]-p/m*c,f[1]+u/m*c]};this.lines.forEach((o,h)=>{let c=0,f=!1;for(let d=1;d<o.pts.length;d++){const[u,p]=o.pts[d],m=Math.hypot(u-o.pts[d-1][0],p-o.pts[d-1][1]);if(c+=m,o.kind==="rail"){const M=this.railBroken(u,p);if(M&&!f&&Pe(h,d,t+841)<.5&&s("buffer-stop",u,p,4),f=M,c>=i.landmarkSpacing){c=0;const g=Pe(h,d,t+843);if(g<i.landmarkChance){const x=["goods-wagon","carriage","platform","signal-gantry"];s(x[Math.floor(Pe(h,d,t+845)*x.length)],u,p,7)}else g<i.landmarkChance+.3&&!M&&s("signal-post",...r(o,d,o.half-.6),1.2)}}else o.kind==="road"&&c>=i.vergeSpacing&&(c=0,s("verge-post",...r(o,d,(Pe(h,d,t+847)<.5?1:-1)*(o.half-.7)),.8))}if(o.kind==="path"&&!o.deadEnd)for(const d of[o.pts[0],o.pts[o.pts.length-1]]){const u=Xt[e.areaAt(d[0],d[1]).type];(["rocky-slope","ravine","cave-mouth"].includes(u.id)||u.layout.terrain?.some(m=>m==="hollows"||m==="rocky"))&&Pe(Math.round(d[0]),Math.round(d[1]),t+849)<.5&&s(Pe(Math.round(d[1]),3,t+851)<.7?"stairs":"stairs-turn",d[0],d[1],3)}});const a=new Set;this.lines.forEach((o,h)=>{if(!(o.kind!=="path"&&o.kind!=="road"))for(let c=0;c<o.pts.length-1;c++){const f=o.pts[c],d=o.pts[c+1],u=`${Math.floor(f[0]/this.cell)},${Math.floor(f[1]/this.cell)}`;for(const[p,m]of this.grid.get(u)??[]){const M=this.lines[p];if(M.kind!=="stream"&&!(M.kind==="rail"&&o.kind==="road"))continue;const g=M.pts[m],x=M.pts[m+1],v=J0(f,d,g,x);if(!v)continue;const S=`${h}|${p}|${Math.round(v[0]/20)},${Math.round(v[1]/20)}`;a.has(S)||(a.add(S),M.kind==="stream"?s(o.kind==="road"||Pe(h,p,t+853)<.5?"footbridge":"rope-bridge",v[0],v[1],4):s("level-crossing",...r(o,c,o.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)if(!(!i&&!s)){for(const r of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+s}`)??[])if(Math.hypot(r.x-e,r.z-t)<r.r)return r}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),f=i()<.5?1:-1;for(let d=1;d<o;d++){const u=d/o,p=c*(.4+.6*i())*(d%2?f:-f);h.push([e.x+s*u-r/a*p,e.z+r*u+s/a*p])}return h.push([t.x,t.z]),th(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[c,f]=[h.pts[o],h.pts[o+1]],d=f[0]-c[0],u=f[1]-c[1],p=d*d+u*u||1,m=Dn(((e-c[0])*d+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-d*m,t-c[1]-u*m);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return Ui(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function J0(n,e,t,i){const s=[e[0]-n[0],e[1]-n[1]],r=[i[0]-t[0],i[1]-t[1]],a=s[0]*r[1]-s[1]*r[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a,h=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+s[0]*o,n[1]+s[1]*o]:null}const Q0=sf.types,Xt=Ur.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Q0[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),Xn=(n,e)=>n+","+e;function j0(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function ep(n,e,t,i){const s=new Map,r=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const f=Xn(h[0],h[1]),d=Xn(c[0],c[1]);s.has(f)||s.set(f,new Set),s.has(d)||s.set(d,new Set),s.get(f).add(d),s.get(d).add(f)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let f=0;f<=a;f++){const d=n.partition(e+f/i,e+h/i);c.push(d),f>0&&r(d,c[f-1]),h>0&&r(d,o[f])}o=c}return s}function tp(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=Xt.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(B,z)=>{const N=B/s,Z=z/s;return[N+o*(Ui(N/a,Z/a,n+91)-.5)*2,Z+o*(Ui(N/a,Z/a,n+92)-.5)*2]},c=(B,z)=>{let N=B*s,Z=z*s;for(let j=0;j<30;j++){const[ce,oe]=h(N,Z);N+=(B-ce)*s,Z+=(z-oe)*s}return[N,Z]},f=q0(n,e.borderLayers),d=-i,u=t+i,p=ep(f,d,u,6),m=new Map,M=zi(n*5+1);for(let B=d;B<u;B++)for(let z=d;z<u;z++){const N=new Set;for(let ce=-2;ce<=2;ce++)for(let oe=-2;oe<=2;oe++){const fe=m.get(Xn(z+oe,B+ce));fe!==void 0&&N.add(fe)}for(const ce of p.get(Xn(z,B))??[]){const oe=m.get(ce);oe!==void 0&&N.add(oe)}const Z=[...Array(r).keys()].filter(ce=>!N.has(ce)),j=Z.length?Z:[...Array(r).keys()];m.set(Xn(z,B),j[Math.floor(M()*j.length)])}const g=(B,z)=>m.get(Xn(B,z))??Math.floor(Pe(B,z,n+17)*r),x=Math.floor(t/2),v=(B,z)=>{const N=f.site(B,z),Z=f.partition(N[0],N[1]);return Z[0]===B&&Z[1]===z};let S=[x,x];for(const[B,z]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(x+B,x+z)){S=[x+B,x+z];break}const y=(B,z)=>{const N=f.site(B,z),Z=c(N[0],N[1]);return{x:Z[0],z:Z[1]}},E=y(S[0],S[1]),b=(B,z)=>{const[N,Z]=h(B,z),j=f.partition(N,Z);return{cell:j,type:g(j[0],j[1]),openness:f.openness(N,Z)}},A=(B,z)=>{const N=Xt[g(B,z)];return N.setPiece&&Pe(B,z,n+61)<e.setPieceChance?N.setPiece:null},_=e.dancefloor.radius,w=_+e.dancefloor.clearing,C=(B,z,N,Z)=>{const j=b(B,z).cell;return j[0]===N&&j[1]===Z},R=new Map,P=(B,z)=>{const N=Xn(B,z),Z=R.get(N);if(Z)return Z;const j=y(B,z),ce=zi(n*17+B*53+z*911);let[oe,fe]=[j.x,j.z];if(!C(j.x,j.z,B,z))e:for(let Me=2;Me<s*.75*1.5;Me+=2)for(let ye=0;ye<16;ye++){const We=ye/16*Math.PI*2,at=j.x+Math.cos(We)*Me,ht=j.z+Math.sin(We)*Me;if(C(at,ht,B,z)){[oe,fe]=[at,ht];break e}}let xe={x:oe,z:fe};for(let Me=0;Me<24;Me++){const ye=ce()*Math.PI*2,We=3+ce()*4,at=oe+Math.cos(ye)*We,ht=fe+Math.sin(ye)*We+3;if(C(at,ht,B,z)){xe={x:at,z:ht};break}}return R.set(N,xe),xe},I=e.treehouse,O=I.angle*Math.PI/180,k={x:E.x+Math.cos(O)*(w+I.distance),z:E.z+Math.sin(O)*(w+I.distance)},G=new Map,K=(B,z)=>{const N=Xn(B,z);if(G.has(N))return G.get(N);let Z=null;if(A(B,z)&&!(B===S[0]&&z===S[1])){const j=e.setPieceFootprint*e.setPieceScale,ce=e.reserveMargin,oe=[Xn(B,z),...p.get(Xn(B,z))??[]].map(Me=>{const[ye,We]=Me.split(",").map(Number);return P(ye,We)}),fe=(Me,ye)=>C(Me,ye,B,z)&&oe.every(We=>Math.hypot(Me-We.x,ye-We.z)>=j+e.soundsystemFootprint+ce)&&Math.hypot(Me-E.x,ye-E.z)>=j+w+ce&&Math.hypot(Me-k.x,ye-k.z)>=j+I.clear+ce,xe=y(B,z);e:for(let Me=0;Me<=s*.35;Me+=3)for(let ye=0;ye<(Me?16:1);ye++){const We=ye/16*Math.PI*2,at=xe.x+Math.cos(We)*Me,ht=xe.z-4+Math.sin(We)*Me;if(fe(at,ht)){Z={x:at,z:ht};break e}}}return G.set(N,Z),Z},ie=[],q=(B,z,N)=>{const Z=e.reserveMargin,j=b(B,z).cell;if(Math.hypot(B-E.x,z-E.z)<N+w+Z||Math.hypot(B-k.x,z-k.z)<N+I.clear+Z)return!0;for(const ce of ie)if(Math.hypot(B-ce.x,z-ce.z)<N+ce.r+Z)return!0;for(const ce of[Xn(j[0],j[1]),...p.get(Xn(j[0],j[1]))??[]]){const[oe,fe]=ce.split(",").map(Number);if(!(oe===S[0]&&fe===S[1])){const Me=P(oe,fe);if(Math.hypot(B-Me.x,z-Me.z)<N+e.soundsystemFootprint+Z)return!0}const xe=K(oe,fe);if(xe&&Math.hypot(B-xe.x,z-xe.z)<N+e.setPieceFootprint*e.setPieceScale+Z)return!0}return!1},se=e.grounds;for(let B=0;B<t;B++)for(let z=0;z<t;z++){if(z===S[0]&&B===S[1]||Pe(z,B,n+871)>=se.chance)continue;const N=se.kinds[Math.floor(Pe(z,B,n+873)*se.kinds.length)],Z=se.radius[N]??8,j=Pe(z,B,n+875)*Math.PI*2,ce=y(z,B);e:for(const oe of[Z+6,Z+14,Z+24])for(let fe=0;fe<12;fe++){const xe=j+fe/12*Math.PI*2,Me=ce.x+Math.cos(xe)*oe,ye=ce.z+Math.sin(xe)*oe;if(C(Me,ye,z,B)&&!q(Me,ye,Z)){ie.push({kind:N,x:Me,z:ye,r:Z});break e}}}const F=(B,z,N)=>{if(Math.hypot(B-E.x,z-E.z)<w||Math.hypot(B-k.x,z-k.z)<I.clear)return!0;for(const ce of ie)if(Math.abs(B-ce.x)<ce.r&&Math.abs(z-ce.z)<ce.r&&Math.hypot(B-ce.x,z-ce.z)<ce.r)return!0;const Z=K(N[0],N[1]);if(Z&&Math.hypot(B-Z.x,z-Z.z)<e.setPieceClear*e.setPieceScale)return!0;if(N[0]===S[0]&&N[1]===S[1])return!1;const j=P(N[0],N[1]);return Math.hypot(B-j.x,z-j.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},ee=(B,z)=>{const[N,Z]=h(B,z);return F(B,z,f.partition(N,Z))},ae=(B,z)=>{const[N,Z]=h(B,z);if(F(B,z,f.partition(N,Z)))return 0;const j=1-nn((Ui(B/e.gladeScale,z/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return nn((f.openness(N,Z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*j},ue=(B,z)=>Math.min(1,Math.hypot(B-S[0],z-S[1])/(t/2)),ve=s*.5,Se={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:f,centreCell:S,dancefloor:{x:E.x,z:E.z,radius:_},treehouse:k,grounds:ie,start:{x:k.x,z:k.z+1},bounds:{minX:ve,maxX:t*s-ve,minZ:ve,maxZ:t*s-ve},extent:{minX:d*s,maxX:u*s,minZ:d*s,maxZ:u*s},typeOf:g,areaAt:b,siteOf:y,treeWeight:ae,hardClear:ee,neighbours:p,setPieceOf:A,soundsystemSpot:P,setPieceSpot:K,reserved:q,remoteness:ue,paths:null};return Se.paths=new Z0(Se),Se}function fc(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function np(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const tr=(n,e)=>qn(e.groundHeight,e.treetopHeight,nn(n.lift)),nh=n=>nn(n.lift);function ip(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const f=nn(a),d=qn(i.groundSpeed,i.treetopSpeed,f),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,m=n.vz+(h*i.groundSpeed-n.vz)*u,M=sp(n,o,h,t,i);let g=qn(p,M.vx,f),x=qn(m,M.vz,f);const v=M.boost*f,S=M.braking&&f>.5;let y=n.x+g*t,E=n.z+x*t;(y<s.minX||y>s.maxX)&&(y=Dn(y,s.minX,s.maxX),g=0),(E<s.minZ||E>s.maxZ)&&(E=Dn(E,s.minZ,s.maxZ),x=0);const b=g>.3?1:g<-.3?-1:n.facing,A=Math.hypot(g,x),_=fc(g,x,n.away,Math.max(1,d*.15),i);return{x:y,z:E,vx:g,vz:x,lift:a,mode:r,facing:b,away:_,lean:A>d*i.leanAt,boost:v,braking:S}}function sp(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const S=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*S,vz:n.vz*S,boost:h*S,braking:!1}}const f=e/a,d=t/a;let u=f,p=d,m=0;if(o>2){const S=n.vx/o,y=n.vz/o;m=Math.acos(Dn(S*f+y*d,-1,1));const E=S*d-y*f,b=r.turnRate*(1-.5*h)*Math.PI/180,A=Math.min(m,b*i)*(E>=0?1:-1),_=Math.cos(A),w=Math.sin(A);u=S*_-y*w,p=S*w+y*_}const M=m*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),c=o>s.treetopSpeed*.5):h=Math.max(0,h-i*.5);const g=s.treetopSpeed*(1+(r.boost-1)*h)*a,x=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(g-o)*x;return{vx:u*v,vz:p*v,boost:h,braking:c}}const no=3;function rp(n,e,t=.5,i=1){const s=n.tuning,r=Dn(e,0,1),a=Math.max(0,Math.round(qn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<ap(n,r)?1:0,h=Math.max(0,a-o),c=Math.round(h*s.adultShareFar*nn((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),f=Math.round((h-c)*s.youngShareFar*r);return{babies:Math.max(0,h-c-f),young:f,adults:c,legends:o}}const ap=(n,e)=>n.tuning.legendChanceFar*nn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Bu=n=>n.areaSize*.75,Na=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function op(n,e,t,i,s){if(Na(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,c=i+Math.sin(o)*r;if(Na(n,h,c,e))return[h,c]}return[t,i]}function Fa(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(Na(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function lp(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=zi(n.seed*7919+o*131+a*977+3),c=Xt[n.typeOf(o,a)],f=n.siteOf(o,a),d=n.remoteness(o,a),u=rp(n,d,Pe(o,a,n.seed+43),Pe(o,a,n.seed+47)),p=M=>{const g=[o,a],x=Bu(n),[v,S]=op(n,g,f.x,f.z,x),y={cell:g,homeX:f.x,homeZ:f.z,range:x,anchorX:v,anchorZ:S},[E,b]=Fa(n,y,h);return{id:i++,species:c.creature,level:M,...y,x:E,z:b,tx:E,tz:b,rest:h()*3,speed:(M===no?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:zi(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const m=t.legendNextToHome&&o===s+1&&a===r;(u.legends||m)&&e.push(p(3))}return e}function cp(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=Fa(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!Na(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=fc(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===no?1.5:4)}function hp(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=zi(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=Fa(a,o,h),[o.tx,o.tz]=Fa(a,o,h),o.rest=h()*2}o.seen=r,cp(o,s,a)}}const up=4,Pt=32;function dp(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function zu(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(Ui(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Pe(i,s,r+1)-.5)*a.width*a.stray,c=(Ui(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Pe(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function pc(n,e,t,i){const s=n.tuning,r=s.density,a=Xt[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=Ui(e/r.patchScale,t/r.patchScale,o+91),f=r.patchMin+(r.patchMax-r.patchMin)*nn((c-.25)/.5),d=n.treeWeight(e,t)*a.density*f*fp(n,e,t,a)*s.treeDensity;return Math.max(d,r.lone)*h}function fp(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=Ui(e/a,t/a,s+93);return 1+r*(2.2*nn((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*nn((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*nn((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*nn((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function pp(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=dp(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*Pt/s),f=Math.ceil((t+1)*Pt/s);for(let d=c;d<f;d++){const u=d&1?.5:0,p=Math.ceil(e*Pt/i-u),m=Math.ceil((e+1)*Pt/i-u);for(let M=p;M<m;M++){const g=(M+u+(Pe(M,d,r+101)-.5)*.7)*i,x=(d+(Pe(M,d,r+102)-.5)*.7)*s,v=zu(n,g,x,M,d,r+106),S=pc(n,g,x,v);Pe(M,d,r+103)>=S||n.hardClear(g,x-o)||n.hardClear(g-h,x-o)||n.hardClear(g+h,x-o)||a.push({x:g,z:x,type:v,variant:Math.floor(Pe(M,d,r+104)*1000003),flip:Pe(M,d,r+105)<.5})}}return a}function mp(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*Pt/i),o=Math.ceil((t+1)*Pt/i),h=Math.ceil(e*Pt/i),c=Math.ceil((e+1)*Pt/i);for(let f=a;f<o;f++)for(let d=h;d<c;d++){const u=(d+Pe(d,f,s+201)-.5)*i,p=(f+Pe(d,f,s+202)-.5)*i,m=1+n.tuning.bushClump*(2*nn((Ui(u/13,p/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const g=zu(n,u,p,d,f,s+206),x=1-Math.min(1,pc(n,u,p,g)/.8);Pe(d,f,s+203)>(.15+.85*x)*Xt[g].layout.undergrowth*n.tuning.bushDensity*m*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||n.hardClear(u,p)||r.push({x:u,z:p,type:g,variant:Math.floor(Pe(d,f,s+204)*up),flip:Pe(d,f,s+205)<.5})}return r}function gp(n,e,t){const i=n.tuning.wallSpacing,s=n.seed,r=[],a=Math.ceil(t*Pt/i),o=Math.ceil((t+1)*Pt/i),h=Math.ceil(e*Pt/i),c=Math.ceil((e+1)*Pt/i);for(let f=a;f<o;f++)for(let d=h;d<c;d++){if(Pe(d,f,s+303)>n.tuning.wallDensity)continue;const u=(d+(Pe(d,f,s+301)-.5)*.6)*i,p=(f+(Pe(d,f,s+302)-.5)*.6)*i,m=n.areaAt(u,p);m.openness<.82||!Xt[m.type].hasWalls||n.paths.clearance(u,p).bushes===0||n.hardClear(u,p)||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||r.push({x:u,z:p,type:m.type,variant:Math.floor(Pe(d,f,s+304)*4),flip:Pe(d,f,s+305)<.5})}return r}function xp(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Pt/s),h=Math.ceil((t+1)*Pt/s),c=Math.ceil(e*Pt/s),f=Math.ceil((e+1)*Pt/s);for(let d=o;d<h;d++)for(let u=c;u<f;u++){const p=(u+(Pe(u,d,r+501)-.5)*.8)*s,m=(d+(Pe(u,d,r+502)-.5)*.8)*s,M=n.areaAt(p,m),g=Xt[M.type].layout,x=g.decor,v=x?x.rate/.3:1,S=g.terrain?.includes("rocky")?2:1,y=x?[x.ruins,x.rocks*S,x.freak]:[i.ruins,i.rocks*S,i.freak],E=y[0]+y[1]+y[2]||1,b=(i.ruins+i.rocks+i.freak)*v*(x?(x.ruins+x.rocks+x.freak)/Math.max(.01,x.ruins+x.rocks+x.freak+x.lake+x.modern):1)*(S>1?1.5:1),A=Pe(u,d,r+503);if(A>=b||M.openness<i.clearing||n.hardClear(p,m)||n.paths.at(p,m,i.pathGap)||n.reserved(p,m,i.footprint)||Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)continue;const _=1-Math.min(1,pc(n,p,m,M.type)/.8);if(Pe(u,d,r+504)>.35+.65*_)continue;const w=A/b*E,C=w<y[0]?"ruins":w<y[0]+y[1]?"rocks":"freak";a.push({x:p,z:m,family:C,variant:Math.floor(Pe(u,d,r+505)*1e6),flip:Pe(u,d,r+506)<.5})}return a}function Mp(n,e,t){const i=n.tuning.relics,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Pt/s),h=Math.ceil((t+1)*Pt/s),c=Math.ceil(e*Pt/s),f=Math.ceil((e+1)*Pt/s);for(let d=o;d<h;d++)for(let u=c;u<f;u++){const p=(u+(Pe(u,d,r+881)-.5)*.8)*s,m=(d+(Pe(u,d,r+882)-.5)*.8)*s,M=n.areaAt(p,m),g=Xt[M.type].layout.decor,x=g?g.modern/Math.max(.01,g.ruins+g.rocks+g.freak+g.lake+g.modern):.1,v=n.paths.at(p,m,20),S=v&&(v.kind==="road"||v.kind==="rail")?i.nearRoad:1;Pe(u,d,r+883)>=i.chance*(.5+5*x)*S||M.openness<n.tuning.decor.clearing||n.hardClear(p,m)||n.paths.at(p,m,2)||n.paths.pieceAt(p,m)||n.reserved(p,m,n.tuning.decor.footprint)||Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6||a.push({x:p,z:m,variant:Math.floor(Pe(u,d,r+884)*1e6),flip:Pe(u,d,r+885)<.5})}return a}const vp=new Set(["wetland","stream","bog","beaver-pond","moor"]);function _p(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Pt/s),h=Math.ceil((t+1)*Pt/s),c=Math.ceil(e*Pt/s),f=Math.ceil((e+1)*Pt/s);for(let d=o;d<h;d++)for(let u=c;u<f;u++){const p=(u+(Pe(u,d,r+401)-.5)*.7)*s,m=(d+(Pe(u,d,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(p,m),g=M.openness<.35||M.openness>.8?1:.25,x=Pe(u,d,r+403),S=(vp.has(Xt[M.type].id)||!!Xt[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*g,y=i.campfire*g,E=i.magicStone*g,b=x<S?"pond":x<S+y?"campfire":x<S+y+E?"stone":null;b&&a.push({x:p,z:m,kind:b,size:.75+Pe(u,d,r+404)*.5})}return a}class bp{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;decor=new Map;relics=new Map;chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/Pt);r<=Math.floor((t+i)/Pt);r++)for(let a=Math.floor((e-i)/Pt);a<=Math.floor((e+i)/Pt);a++)s.push([a,r]);return s}gather(e,t,i,s,r){e.size>600&&e.clear();const a=[];for(const[o,h]of this.chunks(i,s,r)){const c=o+","+h;let f=e.get(c);f||(f=t(o,h),e.set(c,f));for(const d of f)Math.abs(d.x-i)<=r&&Math.abs(d.z-s)<=r&&a.push(d)}return a}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>pp(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>mp(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>_p(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>xp(this.map,s,r),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(s,r)=>Mp(this.map,s,r),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(s,r)=>gp(this.map,s,r),e,t,i)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const c=s.setPieceSpot(h,o);c&&Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push({x:c.x,z:c.z,type:s.typeOf(h,o),variant:0,flip:Pe(h,o,s.seed+71)<.5})}return a}}const yp=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),Hu=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],Sp=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],fl=n=>!n.leashed&&n.level!==no;function wp(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function xo(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!fl(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function ih(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function Ep(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,c=o.leash,f=d=>e[d];if(t.talk&&s){const d=n.talk?f(n.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-i.x,d.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(d.id,n.talk.t),d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=i.x>=d.x?1:-1,d.away=i.z<d.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(ih(n,d,d.x,d.z,r),n.progress.delete(d.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const u=xo(e,i.x,i.z,h.talkRange)??xo(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!fl(u),t:n.progress.get(u.id)??0,total:fl(u)?Hu(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[d,u]of n.progress){if(n.talk?.id===d)continue;const p=u-a*h.decayRate;p<=0||e[d].leashed?n.progress.delete(d):n.progress.set(d,p)}if(t.inviteNearest){const d=xo(e,i.x,i.z,1/0);d&&ih(n,d,d.x,d.z,r)}if(t.sigil&&s){let d=-1,u=c.pickRadius;if(n.placed.forEach((p,m)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,d=m)}),d>=0){const[p]=n.placed.splice(d,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];Gu(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const d of n.stack)sh(f(d),i.x,i.z,a,o);for(const d of n.placed)sh(f(d.id),d.x,d.z,a,o)}const Gu=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function sh(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),m=a*.5/p;n.tx=e+(n.x-e)*m,n.tz=t+(n.z-t)*m,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,m=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*m,n.tz=t+Math.sin(p)*m,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,f=Math.hypot(h,c);if(f<1e-4){n.moving=!1;return}const d=o?Math.max(n.speed,r.runSpeed*(n.level===no?.6:1)):n.speed*1.5,u=Math.min(f,d*i);n.x+=h/f*u,n.z+=c/f*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=fc(h,c,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const Ap=n=>`${n[0]},${n[1]}`;function Tp(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Ap(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function Rp(n,e){const t=Math.floor(Pe(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}const Cp=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function Wu(n,e,t){const i=n.wave+1,s=[],r=new Map,a=new Map;for(const[c,f]of n.areas)for(const d of e.neighbours.get(c)??[]){if(n.areas.has(d)||r.has(d))continue;const u=d.split(",").map(Number);Cp(e,u)&&(r.set(d,u),a.set(d,f.cell))}const o=[...r.entries()].sort((c,f)=>Pe(c[1][0],c[1][1],e.seed+i)-Pe(f[1][0],f[1][1],e.seed+i)),h=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[c,f]of o.slice(0,h)){const d={cell:f,wave:i,at:t,from:a.get(c)??null,soundsystem:Rp(e,f)};n.areas.set(c,d),s.push(d)}return n.wave=i,s}function Lp(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,Wu(n,e,t))}function Pp(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function Dp(n,e){const t=tp(n,e),i={...np(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new bp(t),creatures:lp(t),clock:ef(),witch:i,camera:Jd(e,i.x,tr(i,e),i.z),party:Tp(t),leash:yp()}}function Ip(n,e,t){const i=tf(n.clock,t);i!==0&&(n.witch=ip(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Qd(n.camera,e.zoom,{x:n.witch.x,y:tr(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(Wu(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),Lp(n.party,n.map,n.clock.time,i),hp(n.creatures,n.witch.x,n.witch.z,Op(n),i,n.clock.time,n.map),Ep(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const Op=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Bu(n.map)*2.5),rh=n=>yu(n.camera,n.camera.lift,n.tuning);function Vu(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Xt[e.type].name+(t?` (set piece: ${t})`:"")}const Np="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Fp="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Up=20,kp=28,Bp=4,zp=.7,Hp=4,Gp="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Wp=1,Vp=.2,Yp=.18,Xp=.25,Kp=38,qp="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",$p={width:20,scale:40,stray:.5},Zp="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",Jp={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},Qp=.16,jp=.8,em=2.25,tm="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",nm={from:20,keep:.35},im=1.7,sm=4.6,rm=2.8,am=10.5,om=11.25,lm=3.4,cm=4,hm=.6,um="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",dm=17.5,fm=32,pm=10,mm="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRate degrees a second (half that at full boost), so she swoops in arcs; a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second (and she brakes); letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",gm={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,glideTime:1,sharpTurnBleed:3,cameraPull:.06},xm=28,Mm=.7,vm={awayEnter:55,awayLeave:65},_m=.7,bm=.55,ym=1.4,Sm=24,wm="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Em={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Am="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Tm=3,Rm=120,Cm=8,Lm=1,Pm=16,Dm=12,Im=20,Om="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Nm="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), a broad soft pool glowReach metres across from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",Fm={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Um=.65,km="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",Bm={bpm:120},zm="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",Hm="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",Gm={height:3,opacity:.65,beam:.25,size:1},Wm={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},Vm="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Ym={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Xm="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Km={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},qm="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",$m={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},Zm={spacing:10,campfire:.012,magicStone:.008,pond:.02,wetPond:.12},Jm={near:150,far:360},Qm="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",jm={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},eg="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",tg="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",ng={on:!0,strength:.7,trees:!1},ig={on:!0,strength:.45,height:18,cover:.55,wind:.6},sg={on:!0,strength:.12,height:3,wind:.8},rg="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",ag="smooth",og="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",lg=0,cg="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",hg={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},ug="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",dg={emojiPixels:11,scale:1},fg="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",pg={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},mg="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground.",gg={spacing:34,chance:.02,nearRoad:4},xg="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",Mg={spacing:26,ruins:.03,rocks:.09,freak:.012,clearing:.3,pathGap:2,footprint:4},vg="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",_g={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,treesOnBroken:.35,edgeBushes:3,bushBoost:3},bg="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",yg={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},Sg={length:8,runSpeed:4,pickRadius:2,spacing:4},wg={rim:!0,sparks:!0,thread:!0,sparkEvery:4},Eg="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",Ag={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},Tg="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",Rg={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},Cg="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Lg={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Pg="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Dg={screenFraction:.8,edge:.1},Ig="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Og={black:.03,gamma:1.35,ambient:.35},Ng={on:!0,strength:.7,threshold:.55},Fg={on:!0,where:"before",strength:3,band:.4,centre:.55},Ug="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",kg=2,Bg=20,zg=1.3,Hg=.5,Gg=.35,Wg=.35,Vg=.25,Yg=!0,Xg=.55,Kg=600,qg=.6,$g="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Zg=.25,Jg=1.8,Qg=9,jg="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",e1=7,t1=6,n1=3,i1=1.5,s1=.35,r1={_readme:Np,_map:Fp,mapAreas:Up,areaSize:kp,areaScale:Bp,areaSizeVariance:zp,borderLayers:Hp,_trees:Gp,treeDensity:Wp,clearingSize:Vp,clearingFalloff:Yp,gladeAmount:Xp,gladeScale:Kp,_areaEdgeBlend:qp,areaEdgeBlend:$p,_density:Zp,density:Jp,bushDensity:Qp,bushClump:jp,treeHeight:em,_treeCap:tm,treeCap:nm,crownWidth:im,treeSpacingX:sm,treeSpacingZ:rm,crownHalfWidth:am,crownHeight:om,bushSpacing:lm,wallSpacing:cm,wallDensity:hm,_witch:um,groundSpeed:dm,treetopSpeed:fm,acceleration:pm,_treetop:mm,treetop:gm,groundAcceleration:xm,leanAt:Mm,facing:vm,riseTime:_m,descendTime:bm,groundHeight:ym,treetopHeight:Sm,_camera:wm,camera:Em,_look:Am,pixelSize:Tm,glowReach:Rm,glowHeight:Cm,spriteTilt:Lm,artPixelsPerMetre:Pm,viewMargin:Dm,lightBudget:Im,_lightSources:Om,_lights:Nm,lights:Fm,glowPower:Um,_beat:km,beat:Bm,_occlusion:zm,_sigilProjection:Hm,sigilProjection:Gm,occlusion:Wm,_stack:Vm,stack:Ym,_lasers:Xm,lasers:Km,_borders:qm,borders:$m,lightSources:Zm,haze:Jm,_scenery:Qm,scenery:jm,_post:eg,_shadows:tg,shadows:ng,canopyShadow:ig,mist:sg,_fx:rg,fx:ag,_moonbeams:og,moonbeams:lg,_treehouse:cg,treehouse:hg,_bubbles:ug,bubbles:dg,_grounds:fg,grounds:pg,_relics:mg,relics:gg,_decor:xg,decor:Mg,_paths:vg,paths:_g,_invite:bg,invite:yg,leash:Sg,bond:wg,_party:Eg,party:Ag,_stringLights:Tg,stringLights:Rg,_dancefloor:Cg,dancefloor:Lg,_canopyCutout:Pg,canopyCutout:Dg,_tone:Ig,tone:Og,bloom:Ng,tiltShift:Fg,_creatures:Ug,creaturesNear:kg,creaturesFar:Bg,creatureCurve:zg,youngShareFar:Hg,adultsFrom:Gg,adultShareFar:Wg,legendChanceFar:Vg,legendNextToHome:Yg,legendsFrom:Xg,creatureSimRadius:Kg,creatureSpeed:qg,_setPieces:$g,setPieceChance:Zg,setPieceScale:Jg,setPieceClear:Qg,_placement:jg,setPieceFootprint:e1,soundsystemFootprint:t1,reserveMargin:n1,treeMarginFromSoundsystem:i1,legendSpeed:s1},rs=r1;class a1{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=g=>this.keys.has(g)?1:0,s=g=>this.pressed.has(g);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),c=s("Backquote"),f=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,d=s("KeyE")||s("KeyR");const u=s("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const g of p){if(!g)continue;const x=w=>!!g.buttons[w]?.pressed,S=g.buttons.some((w,C)=>w.pressed&&!this.padPrev[C])&&!!this.onAny?.(),y=w=>!S&&x(w)&&!this.padPrev[w];let E=g.axes[0]??0,b=g.axes[1]??0;const A=Math.hypot(E,b),_=.18;if(A<_)E=0,b=0;else{const w=(Math.min(1,A)-_)/(1-_)/A;E*=w,b*=w}E+=(x(15)?1:0)-(x(14)?1:0),b+=(x(13)?1:0)-(x(12)?1:0),r+=E,a+=b,y(3)&&(o=!0),(y(4)||y(6))&&(h+=1),(y(5)||y(7))&&(h-=1),y(8)&&(c=!0),x(0)&&(f=!0),y(2)&&(d=!0),this.padPrev=g.buttons.map(w=>w.pressed);break}const m=this.touch;r+=m.x,a+=m.y,m.toggle&&(o=!0),h+=m.zoom,m.debug&&(c=!0),m.talk&&(f=!0),m.sigil&&(d=!0),m.toggle=!1,m.zoom=0,m.debug=!1,m.sigil=!1;const M=Math.hypot(r,a);return M>1&&(r/=M,a/=M),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:c,nextWave:e,pauseWaves:t,talk:f,sigil:d,inviteNearest:u}}}const mc="186",o1=0,ah=1,l1=2,Ta=1,c1=2,Rr=3,bs=0,In=1,vi=2,wi=0,Zs=1,ys=2,oh=3,lh=4,io=5,Vs=100,h1=101,u1=102,d1=103,f1=104,gc=200,p1=201,xc=202,m1=203,Mc=204,vc=205,g1=206,x1=207,M1=208,v1=209,_1=210,b1=211,y1=212,S1=213,w1=214,pl=0,ml=1,gl=2,Dr=3,xl=4,Ml=5,Ua=6,vl=7,Yu=0,E1=1,A1=2,Ei=0,Xu=1,Ku=2,qu=3,$u=4,Zu=5,Ju=6,Qu=7,ju=300,Ss=301,nr=302,Mo=303,vo=304,so=306,ka=1e3,Fi=1001,_l=1002,zt=1003,T1=1004,Kr=1005,Yt=1006,_o=1007,xs=1008,kn=1009,ed=1010,td=1011,Ir=1012,_c=1013,Ai=1014,yi=1015,Ti=1016,bc=1017,yc=1018,Or=1020,nd=35902,id=35899,sd=1021,rd=1022,zn=1023,Hi=1026,Ms=1027,ad=1028,Sc=1029,ws=1030,wc=1031,Ec=1033,Ra=33776,Ca=33777,La=33778,Pa=33779,bl=35840,yl=35841,Sl=35842,wl=35843,El=36196,Al=37492,Tl=37496,Rl=37488,Cl=37489,Ba=37490,Ll=37491,Pl=37808,Dl=37809,Il=37810,Ol=37811,Nl=37812,Fl=37813,Ul=37814,kl=37815,Bl=37816,zl=37817,Hl=37818,Gl=37819,Wl=37820,Vl=37821,Yl=36492,Xl=36494,Kl=36495,ql=36283,$l=36284,za=36285,Zl=36286,R1=3200,ch=0,C1=1,Bn="",Kn="srgb",Nr="srgb-linear",Ha="linear",Et="srgb",bo=7680,L1=519,P1=512,D1=513,I1=514,Ac=515,O1=516,N1=517,Tc=518,F1=519,U1=35044,Js=35048,hh="300 es",Si=2e3,Ga=2001;function k1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Wa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function B1(){const n=Wa("canvas");return n.style.display="block",n}const uh={};function dh(...n){const e="THREE."+n.shift();console.log(e,...n)}function od(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=od(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function mt(...n){n=od(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Qs(...n){const e=n.join(" ");e in uh||(uh[e]=!0,Ke(...n))}function z1(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const H1={[pl]:ml,[gl]:Ua,[xl]:vl,[Dr]:Ml,[ml]:pl,[Ua]:gl,[vl]:xl,[Ml]:Dr};class As{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yo=Math.PI/180,Jl=180/Math.PI;function kr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function ct(n,e,t){return Math.max(e,Math.min(t,n))}function G1(n,e){return(n%e+e)%e}function So(n,e,t){return(1-t)*n+t*e}function gr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class $e{static{$e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],c=i[s+1],f=i[s+2],d=i[s+3],u=r[a+0],p=r[a+1],m=r[a+2],M=r[a+3];if(d!==M||h!==u||c!==p||f!==m){let g=h*u+c*p+f*m+d*M;g<0&&(u=-u,p=-p,m=-m,M=-M,g=-g);let x=1-o;if(g<.9995){const v=Math.acos(g),S=Math.sin(v);x=Math.sin(x*v)/S,o=Math.sin(o*v)/S,h=h*x+u*o,c=c*x+p*o,f=f*x+m*o,d=d*x+M*o}else{h=h*x+u*o,c=c*x+p*o,f=f*x+m*o,d=d*x+M*o;const v=1/Math.sqrt(h*h+c*c+f*f+d*d);h*=v,c*=v,f*=v,d*=v}}e[t]=h,e[t+1]=c,e[t+2]=f,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],c=i[s+2],f=i[s+3],d=r[a],u=r[a+1],p=r[a+2],m=r[a+3];return e[t]=o*m+f*d+h*p-c*u,e[t+1]=h*m+f*u+c*d-o*p,e[t+2]=c*m+f*p+o*u-h*d,e[t+3]=f*m-o*d-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),f=o(s/2),d=o(r/2),u=h(i/2),p=h(s/2),m=h(r/2);switch(a){case"XYZ":this._x=u*f*d+c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d-u*p*m;break;case"YXZ":this._x=u*f*d+c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d+u*p*m;break;case"ZXY":this._x=u*f*d-c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d-u*p*m;break;case"ZYX":this._x=u*f*d-c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d+u*p*m;break;case"YZX":this._x=u*f*d+c*p*m,this._y=c*p*d+u*f*m,this._z=c*f*m-u*p*d,this._w=c*f*d-u*p*m;break;case"XZY":this._x=u*f*d-c*p*m,this._y=c*p*d-u*f*m,this._z=c*f*m+u*p*d,this._w=c*f*d+u*p*m;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],c=t[2],f=t[6],d=t[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(f-h)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(f-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+f)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(h+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+s*c-r*h,this._y=s*f+a*h+r*o-i*c,this._z=r*f+a*c+i*h-s*o,this._w=a*f-i*o-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);h=Math.sin(h*c)/f,t=Math.sin(t*c)/f,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{V.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*s-o*i),f=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+h*c+a*d-o*f,this.y=i+h*f+o*c-r*d,this.z=s+h*d+r*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return wo.copy(this).projectOnVector(e),this.sub(wo)}reflect(e){return this.sub(wo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wo=new V,fh=new lr;class Ze{static{Ze.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c)}set(e,t,i,s,r,a,o,h,c){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=r,f[5]=h,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],f=i[4],d=i[7],u=i[2],p=i[5],m=i[8],M=s[0],g=s[3],x=s[6],v=s[1],S=s[4],y=s[7],E=s[2],b=s[5],A=s[8];return r[0]=a*M+o*v+h*E,r[3]=a*g+o*S+h*b,r[6]=a*x+o*y+h*A,r[1]=c*M+f*v+d*E,r[4]=c*g+f*S+d*b,r[7]=c*x+f*y+d*A,r[2]=u*M+p*v+m*E,r[5]=u*g+p*S+m*b,r[8]=u*x+p*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*r*f+i*o*h+s*r*c-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8],d=f*a-o*c,u=o*h-f*r,p=c*r-a*h,m=t*d+i*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=d*M,e[1]=(s*c-f*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(f*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-s*c,s*h,-s*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return Qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Eo.makeScale(e,t)),this}rotate(e){return Qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Eo.makeRotation(-e)),this}translate(e,t){return Qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Eo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Eo=new Ze,ph=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mh=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function W1(){const n={enabled:!0,workingColorSpace:Nr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Et&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Ha:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Qs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Qs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Nr]:{primaries:e,whitePoint:i,transfer:Ha,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kn},outputColorSpaceConfig:{drawingBufferColorSpace:Kn}},[Kn]:{primaries:e,whitePoint:i,transfer:Et,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kn}}}),n}const lt=W1();function ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Cs;class V1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Cs===void 0&&(Cs=Wa("canvas")),Cs.width=e.width,Cs.height=e.height;const s=Cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Cs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Wa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ki(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ki(t[i]/255)*255):t[i]=ki(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Y1=0;class Rc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Y1++}),this.uuid=kr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ao(s[a].image)):r.push(Ao(s[a]))}else r=Ao(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ao(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?V1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let X1=0;const To=new V;class Sn extends As{constructor(e=Sn.DEFAULT_IMAGE,t=Sn.DEFAULT_MAPPING,i=Fi,s=Fi,r=Yt,a=xs,o=zn,h=kn,c=Sn.DEFAULT_ANISOTROPY,f=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:X1++}),this.uuid=kr(),this.name="",this.source=new Rc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(To).x}get height(){return this.source.getSize(To).y}get depth(){return this.source.getSize(To).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ju)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ka:e.x=e.x-Math.floor(e.x);break;case Fi:e.x=e.x<0?0:1;break;case _l:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ka:e.y=e.y-Math.floor(e.y);break;case Fi:e.y=e.y<0?0:1;break;case _l:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=ju;Sn.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,c=h[0],f=h[4],d=h[8],u=h[1],p=h[5],m=h[9],M=h[2],g=h[6],x=h[10];if(Math.abs(f-u)<.01&&Math.abs(d-M)<.01&&Math.abs(m-g)<.01){if(Math.abs(f+u)<.1&&Math.abs(d+M)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,y=(p+1)/2,E=(x+1)/2,b=(f+u)/4,A=(d+M)/4,_=(m+g)/4;return S>y&&S>E?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=b/i,r=A/i):y>E?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=_/r),this.set(i,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(d-M)*(d-M)+(u-f)*(u-f));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-M)/v,this.z=(u-f)/v,this.w=Math.acos((c+p+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class K1 extends As{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Sn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Rc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zn extends K1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ld extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class q1 extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ht{static{Ht.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,g)}set(e,t,i,s,r,a,o,h,c,f,d,u,p,m,M,g){const x=this.elements;return x[0]=e,x[4]=t,x[8]=i,x[12]=s,x[1]=r,x[5]=a,x[9]=o,x[13]=h,x[2]=c,x[6]=f,x[10]=d,x[14]=u,x[3]=p,x[7]=m,x[11]=M,x[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Ls.setFromMatrixColumn(e,0).length(),r=1/Ls.setFromMatrixColumn(e,1).length(),a=1/Ls.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),c=Math.sin(s),f=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*f,p=a*d,m=o*f,M=o*d;t[0]=h*f,t[4]=-h*d,t[8]=c,t[1]=p+m*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=m+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*f,p=h*d,m=c*f,M=c*d;t[0]=u+M*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*f,t[9]=-o,t[2]=p*o-m,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*f,p=h*d,m=c*f,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*f,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*f,p=a*d,m=o*f,M=o*d;t[0]=h*f,t[4]=m*c-p,t[8]=u*c+M,t[1]=h*d,t[5]=M*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*f,t[4]=M-u*d,t[8]=m*d+p,t[1]=d,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=p*d+m,t[10]=u-M*d}else if(e.order==="XZY"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*f,t[4]=-d,t[8]=c*f,t[1]=u*d+M,t[5]=a*f,t[9]=p*d-m,t[2]=m*d-p,t[6]=o*f,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($1,e,Z1)}lookAt(e,t,i){const s=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),Ki.crossVectors(i,On),Ki.lengthSq()===0&&(Math.abs(i.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),Ki.crossVectors(i,On)),Ki.normalize(),qr.crossVectors(On,Ki),s[0]=Ki.x,s[4]=qr.x,s[8]=On.x,s[1]=Ki.y,s[5]=qr.y,s[9]=On.y,s[2]=Ki.z,s[6]=qr.z,s[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],f=i[1],d=i[5],u=i[9],p=i[13],m=i[2],M=i[6],g=i[10],x=i[14],v=i[3],S=i[7],y=i[11],E=i[15],b=s[0],A=s[4],_=s[8],w=s[12],C=s[1],R=s[5],P=s[9],I=s[13],O=s[2],k=s[6],G=s[10],K=s[14],ie=s[3],q=s[7],se=s[11],F=s[15];return r[0]=a*b+o*C+h*O+c*ie,r[4]=a*A+o*R+h*k+c*q,r[8]=a*_+o*P+h*G+c*se,r[12]=a*w+o*I+h*K+c*F,r[1]=f*b+d*C+u*O+p*ie,r[5]=f*A+d*R+u*k+p*q,r[9]=f*_+d*P+u*G+p*se,r[13]=f*w+d*I+u*K+p*F,r[2]=m*b+M*C+g*O+x*ie,r[6]=m*A+M*R+g*k+x*q,r[10]=m*_+M*P+g*G+x*se,r[14]=m*w+M*I+g*K+x*F,r[3]=v*b+S*C+y*O+E*ie,r[7]=v*A+S*R+y*k+E*q,r[11]=v*_+S*P+y*G+E*se,r[15]=v*w+S*I+y*K+E*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],c=e[13],f=e[2],d=e[6],u=e[10],p=e[14],m=e[3],M=e[7],g=e[11],x=e[15],v=h*p-c*u,S=o*p-c*d,y=o*u-h*d,E=a*p-c*f,b=a*u-h*f,A=a*d-o*f;return t*(M*v-g*S+x*y)-i*(m*v-g*E+x*b)+s*(m*S-M*E+x*A)-r*(m*y-M*b+g*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],c=e[6],f=e[10];return t*(a*f-o*c)-i*(r*f-o*h)+s*(r*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],f=e[8],d=e[9],u=e[10],p=e[11],m=e[12],M=e[13],g=e[14],x=e[15],v=t*o-i*a,S=t*h-s*a,y=t*c-r*a,E=i*h-s*o,b=i*c-r*o,A=s*c-r*h,_=f*M-d*m,w=f*g-u*m,C=f*x-p*m,R=d*g-u*M,P=d*x-p*M,I=u*x-p*g,O=v*I-S*P+y*R+E*C-b*w+A*_;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/O;return e[0]=(o*I-h*P+c*R)*k,e[1]=(s*P-i*I-r*R)*k,e[2]=(M*A-g*b+x*E)*k,e[3]=(u*b-d*A-p*E)*k,e[4]=(h*C-a*I-c*w)*k,e[5]=(t*I-s*C+r*w)*k,e[6]=(g*y-m*A-x*S)*k,e[7]=(f*A-u*y+p*S)*k,e[8]=(a*P-o*C+c*_)*k,e[9]=(i*C-t*P-r*_)*k,e[10]=(m*b-M*y+x*v)*k,e[11]=(d*y-f*b-p*v)*k,e[12]=(o*w-a*R-h*_)*k,e[13]=(t*R-i*w+s*_)*k,e[14]=(M*S-m*E-g*v)*k,e[15]=(f*E-d*S+u*v)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,c=r*a,f=r*o;return this.set(c*a+i,c*o-s*h,c*h+s*o,0,c*o+s*h,f*o+i,f*h-s*a,0,c*h-s*o,f*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,c=r+r,f=a+a,d=o+o,u=r*c,p=r*f,m=r*d,M=a*f,g=a*d,x=o*d,v=h*c,S=h*f,y=h*d,E=i.x,b=i.y,A=i.z;return s[0]=(1-(M+x))*E,s[1]=(p+y)*E,s[2]=(m-S)*E,s[3]=0,s[4]=(p-y)*b,s[5]=(1-(u+x))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(m+S)*A,s[9]=(g-v)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Ls.set(s[0],s[1],s[2]).length();const o=Ls.set(s[4],s[5],s[6]).length(),h=Ls.set(s[8],s[9],s[10]).length();r<0&&(a=-a),jn.copy(this);const c=1/a,f=1/o,d=1/h;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=f,jn.elements[5]*=f,jn.elements[6]*=f,jn.elements[8]*=d,jn.elements[9]*=d,jn.elements[10]*=d,t.setFromRotationMatrix(jn),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=Si,h=!1){const c=this.elements,f=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let m,M;if(h)m=r/(a-r),M=a*r/(a-r);else if(o===Si)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Ga)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Si,h=!1){const c=this.elements,f=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let m,M;if(h)m=1/(a-r),M=a/(a-r);else if(o===Si)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===Ga)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ls=new V,jn=new Ht,$1=new V(0,0,0),Z1=new V(1,1,1),Ki=new V,qr=new V,On=new V,gh=new Ht,xh=new lr;class Es{constructor(e=0,t=0,i=0,s=Es.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],c=s[5],f=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-ct(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ct(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xh.setFromEuler(this),this.setFromQuaternion(xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Es.DEFAULT_ORDER="XYZ";class cd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let J1=0;const Mh=new V,Ps=new lr,Li=new Ht,$r=new V,xr=new V,Q1=new V,j1=new lr,vh=new V(1,0,0),_h=new V(0,1,0),bh=new V(0,0,1),yh={type:"added"},e2={type:"removed"},Ds={type:"childadded",child:null},Ro={type:"childremoved",child:null};class Rn extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:J1++}),this.uuid=kr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new V,t=new Es,i=new lr,s=new V(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Ze}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(vh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(bh,e)}translateOnAxis(e,t){return Mh.copy(e).applyQuaternion(this.quaternion),this.position.add(Mh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(bh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?$r.copy(e):$r.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(xr,$r,this.up):Li.lookAt($r,xr,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(Li),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yh),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null):mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e2),Ro.child=e,this.dispatchEvent(Ro),Ro.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yh),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,Q1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,j1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,f=h.length;c<f;c++){const d=h[c];r(e.shapes,d)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),f=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const h=[];for(const c in o){const f=o[c];delete f.metadata,h.push(f)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rn.DEFAULT_UP=new V(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ys extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t2={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,i),x=this._getHandJoint(c,M);g!==null&&(x.matrix.fromArray(g.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=g.radius),x.visible=g!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=f.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(t2)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ys;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function Lo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=lt.workingColorSpace){if(e=G1(e,1),t=ct(t,0,1),i=ct(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Lo(a,r,e+1/3),this.g=Lo(a,r,e),this.b=Lo(a,r,e-1/3)}return lt.colorSpaceToWorking(this,s),this}setStyle(e,t=Kn){function i(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kn){const i=hd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kn){return lt.workingToColorSpace(vn.copy(this),e),Math.round(ct(vn.r*255,0,255))*65536+Math.round(ct(vn.g*255,0,255))*256+Math.round(ct(vn.b*255,0,255))}getHexString(e=Kn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(vn.copy(this),t);const i=vn.r,s=vn.g,r=vn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,c;const f=(o+a)/2;if(o===a)h=0,c=0;else{const d=a-o;switch(c=f<=.5?d/(a+o):d/(2-a-o),a){case i:h=(s-r)/d+(s<r?6:0);break;case s:h=(r-i)/d+2;break;case r:h=(i-s)/d+4;break}h/=6}return e.h=h,e.s=c,e.l=f,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=Kn){lt.workingToColorSpace(vn.copy(this),e);const t=vn.r,i=vn.g,s=vn.b;return e!==Kn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Zr);const i=So(qi.h,Zr.h,t),s=So(qi.s,Zr.s,t),r=So(qi.l,Zr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new it;it.NAMES=hd;class Sh extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Es,this.environmentIntensity=1,this.environmentRotation=new Es,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ei=new V,Pi=new V,Po=new V,Di=new V,Is=new V,Os=new V,wh=new V,Do=new V,Io=new V,Oo=new V,No=new rt,Fo=new rt,Uo=new rt;class si{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ei.subVectors(e,t),s.cross(ei);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ei.subVectors(s,t),Pi.subVectors(i,t),Po.subVectors(e,t);const a=ei.dot(ei),o=ei.dot(Pi),h=ei.dot(Po),c=Pi.dot(Pi),f=Pi.dot(Po),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*h-o*f)*u,m=(a*f-o*h)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Di)===null?!1:Di.x>=0&&Di.y>=0&&Di.x+Di.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Di)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Di.x),h.addScaledVector(a,Di.y),h.addScaledVector(o,Di.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return No.setScalar(0),Fo.setScalar(0),Uo.setScalar(0),No.fromBufferAttribute(e,t),Fo.fromBufferAttribute(e,i),Uo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(No,r.x),a.addScaledVector(Fo,r.y),a.addScaledVector(Uo,r.z),a}static isFrontFacing(e,t,i,s){return ei.subVectors(i,t),Pi.subVectors(e,t),ei.cross(Pi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ei.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return si.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return si.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return si.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return si.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return si.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Is.subVectors(s,i),Os.subVectors(r,i),Do.subVectors(e,i);const h=Is.dot(Do),c=Os.dot(Do);if(h<=0&&c<=0)return t.copy(i);Io.subVectors(e,s);const f=Is.dot(Io),d=Os.dot(Io);if(f>=0&&d<=f)return t.copy(s);const u=h*d-f*c;if(u<=0&&h>=0&&f<=0)return a=h/(h-f),t.copy(i).addScaledVector(Is,a);Oo.subVectors(e,r);const p=Is.dot(Oo),m=Os.dot(Oo);if(m>=0&&p<=m)return t.copy(r);const M=p*c-h*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Os,o);const g=f*m-p*d;if(g<=0&&d-f>=0&&p-m>=0)return wh.subVectors(r,s),o=(d-f)/(d-f+(p-m)),t.copy(s).addScaledVector(wh,o);const x=1/(g+M+u);return a=M*x,o=u*x,t.copy(i).addScaledVector(Is,a).addScaledVector(Os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class cr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ti):ti.fromBufferAttribute(r,a),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Jr.copy(i.boundingBox)),Jr.applyMatrix4(e.matrixWorld),this.union(Jr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Mr),Qr.subVectors(this.max,Mr),Ns.subVectors(e.a,Mr),Fs.subVectors(e.b,Mr),Us.subVectors(e.c,Mr),$i.subVectors(Fs,Ns),Zi.subVectors(Us,Fs),as.subVectors(Ns,Us);let t=[0,-$i.z,$i.y,0,-Zi.z,Zi.y,0,-as.z,as.y,$i.z,0,-$i.x,Zi.z,0,-Zi.x,as.z,0,-as.x,-$i.y,$i.x,0,-Zi.y,Zi.x,0,-as.y,as.x,0];return!ko(t,Ns,Fs,Us,Qr)||(t=[1,0,0,0,1,0,0,0,1],!ko(t,Ns,Fs,Us,Qr))?!1:(jr.crossVectors($i,Zi),t=[jr.x,jr.y,jr.z],ko(t,Ns,Fs,Us,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ii=[new V,new V,new V,new V,new V,new V,new V,new V],ti=new V,Jr=new cr,Ns=new V,Fs=new V,Us=new V,$i=new V,Zi=new V,as=new V,Mr=new V,Qr=new V,jr=new V,os=new V;function ko(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){os.fromArray(n,r);const o=s.x*Math.abs(os.x)+s.y*Math.abs(os.y)+s.z*Math.abs(os.z),h=e.dot(os),c=t.dot(os),f=i.dot(os);if(Math.max(-Math.max(h,c,f),Math.min(h,c,f))>o)return!1}return!0}const Qt=new V,ea=new $e;let n2=0;class Hn extends As{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n2++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=U1,this.updateRanges=[],this.gpuType=yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ea.fromBufferAttribute(this,t),ea.applyMatrix3(e),this.setXY(t,ea.x,ea.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=gr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array),s=Cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),i=Cn(i,this.array),s=Cn(s,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ud extends Hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class dd extends Hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Lt extends Hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const i2=new cr,vr=new V,Bo=new V;class Br{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):i2.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(vr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(Bo)),this.expandByPoint(vr.copy(e.center).sub(Bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let s2=0;const Yn=new Ht,zo=new Rn,ks=new V,Nn=new cr,_r=new cr,on=new V;class Zt extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:s2++}),this.uuid=kr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(k1(e)?dd:ud)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,i){return Yn.makeTranslation(e,t,i),this.applyMatrix4(Yn),this}scale(e,t,i){return Yn.makeScale(e,t,i),this.applyMatrix4(Yn),this}lookAt(e){return zo.lookAt(e),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ks).negate(),this.translate(ks.x,ks.y,ks.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(Nn.min,_r.min),Nn.expandByPoint(on),on.addVectors(Nn.max,_r.max),Nn.expandByPoint(on)):(Nn.expandByPoint(_r.min),Nn.expandByPoint(_r.max))}Nn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)on.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(on));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)on.fromBufferAttribute(o,c),h&&(ks.fromBufferAttribute(e,c),on.add(ks)),s=Math.max(s,i.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new V,h[_]=new V;const c=new V,f=new V,d=new V,u=new $e,p=new $e,m=new $e,M=new V,g=new V;function x(_,w,C){c.fromBufferAttribute(i,_),f.fromBufferAttribute(i,w),d.fromBufferAttribute(i,C),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,C),f.sub(c),d.sub(c),p.sub(u),m.sub(u);const R=1/(p.x*m.y-m.x*p.y);isFinite(R)&&(M.copy(f).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(R),g.copy(d).multiplyScalar(p.x).addScaledVector(f,-m.x).multiplyScalar(R),o[_].add(M),o[w].add(M),o[C].add(M),h[_].add(g),h[w].add(g),h[C].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,w=v.length;_<w;++_){const C=v[_],R=C.start,P=C.count;for(let I=R,O=R+P;I<O;I+=3)x(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const S=new V,y=new V,E=new V,b=new V;function A(_){E.fromBufferAttribute(s,_),b.copy(E);const w=o[_];S.copy(w),S.sub(E.multiplyScalar(E.dot(w))).normalize(),y.crossVectors(b,w);const R=y.dot(h[_])<0?-1:1;a.setXYZW(_,S.x,S.y,S.z,R)}for(let _=0,w=v.length;_<w;++_){const C=v[_],R=C.start,P=C.count;for(let I=R,O=R+P;I<O;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new V,r=new V,a=new V,o=new V,h=new V,c=new V,f=new V,d=new V;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),M=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,g),f.subVectors(a,r),d.subVectors(s,r),f.cross(d),o.fromBufferAttribute(i,m),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,g),o.add(f),h.add(f),c.add(f),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),f.subVectors(a,r),d.subVectors(s,r),f.cross(d),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,h){const c=o.array,f=o.itemSize,d=o.normalized,u=new c.constructor(h.length*f);let p=0,m=0;for(let M=0,g=h.length;M<g;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*f;for(let x=0;x<f;x++)u[m++]=c[p++]}return new Hn(u,f,d)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],c=e(h,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const h=[],c=r[o];for(let f=0,d=c.length;f<d;f++){const u=c[f],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],f=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];f.push(p.toJSON(e.data))}f.length>0&&(s[h]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const f=s[c];this.setAttribute(c,f.clone(t))}const r=e.morphAttributes;for(const c in r){const f=[],d=r[c];for(let u=0,p=d.length;u<p;u++)f.push(d[u].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ho=new V,r2=new V,a2=new Ze;class ji{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ho.subVectors(i,t).cross(r2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Ho),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||a2.getNormalMatrix(e),s=this.coplanarPoint(Ho).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let o2=0;class hr extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:o2++}),this.uuid=kr(),this.name="",this.type="Material",this.blending=Zs,this.side=bs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mc,this.blendDst=vc,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=L1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bo,this.stencilZFail=bo,this.stencilZPass=bo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ji().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Oi=new V,Go=new V,ta=new V,na=new V;class Cc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Go.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),na.copy(this.origin).sub(Go);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ta),o=na.dot(this.direction),h=-na.dot(ta),c=na.lengthSq(),f=Math.abs(1-a*a);let d,u,p,m;if(f>0)if(d=a*h-o,u=a*o-h,m=r*f,d>=0)if(u>=-m)if(u<=m){const M=1/f;d*=M,u*=M,p=d*(d+a*u+2*o)+u*(a*d+u+2*h)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-h),r),p=-d*d+u*(u+2*h)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-h),r),p=u*(u+2*h)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-h),r),p=-d*d+u*(u+2*h)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Go).addScaledVector(ta,u),p}intersectSphere(e,t){if(e.radius<0)return null;Oi.subVectors(e.center,this.origin);const i=Oi.dot(this.direction),s=Oi.dot(Oi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),f>=0?(r=(e.min.y-u.y)*f,a=(e.max.y-u.y)*f):(r=(e.max.y-u.y)*f,a=(e.min.y-u.y)*f),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,h=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,h=(e.min.z-u.z)*d),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,c=o.y,f=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,m=t.x-a.x,M=t.y-a.y,g=t.z-a.z,x=i.x-a.x,v=i.y-a.y,S=i.z-a.z,y=Math.abs(h),E=Math.abs(c),b=Math.abs(f);let A,_,w,C,R,P,I,O,k,G,K,ie;if(y>=E&&y>=b?(w=h,P=d,k=m,ie=x,h>=0?(A=c,_=f,C=u,R=p,I=M,O=g,G=v,K=S):(A=f,_=c,C=p,R=u,I=g,O=M,G=S,K=v)):E>=b?(w=c,P=u,k=M,ie=v,c>=0?(A=f,_=h,C=p,R=d,I=g,O=m,G=S,K=x):(A=h,_=f,C=d,R=p,I=m,O=g,G=x,K=S)):(w=f,P=p,k=g,ie=S,f>=0?(A=h,_=c,C=d,R=u,I=m,O=M,G=x,K=v):(A=c,_=h,C=u,R=d,I=M,O=m,G=v,K=x)),w===0)return null;const q=A/w,se=_/w,F=1/w,ee=C-q*P,ae=R-se*P,ue=I-q*k,ve=O-se*k,Se=G-q*ie,B=K-se*ie,z=Se*ve-B*ue,N=ee*B-ae*Se,Z=ue*ae-ve*ee;if(s){if(z<0||N<0||Z<0)return null}else if((z<0||N<0||Z<0)&&(z>0||N>0||Z>0))return null;const j=z+N+Z;if(j===0)return null;const ce=F*(z*P+N*k+Z*ie);return(j>0?ce<0:ce>0)?null:this.at(ce/j,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fd extends hr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Es,this.combine=Yu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Eh=new Ht,ls=new Cc,ia=new Br,Ah=new V,sa=new V,ra=new V,aa=new V,Wo=new V,oa=new V,Th=new V,la=new V;class Kt extends Rn{constructor(e=new Zt,t=new fd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){oa.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const f=o[h],d=r[h];f!==0&&(Wo.fromBufferAttribute(d,e),a?oa.addScaledVector(Wo,f):oa.addScaledVector(Wo.sub(t),f))}t.add(oa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(r),ls.copy(e.ray).recast(e.near),!(ia.containsPoint(ls.origin)===!1&&(ls.intersectSphere(ia,Ah)===null||ls.origin.distanceToSquared(Ah)>(e.far-e.near)**2))&&(Eh.copy(r).invert(),ls.copy(e.ray).applyMatrix4(Eh),!(i.boundingBox!==null&&ls.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,c=r.attributes.uv,f=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const g=u[m],x=a[g.materialIndex],v=Math.max(g.start,p.start),S=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let y=v,E=S;y<E;y+=3){const b=o.getX(y),A=o.getX(y+1),_=o.getX(y+2);s=ca(this,x,e,i,c,f,d,b,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let g=m,x=M;g<x;g+=3){const v=o.getX(g),S=o.getX(g+1),y=o.getX(g+2);s=ca(this,a,e,i,c,f,d,v,S,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const g=u[m],x=a[g.materialIndex],v=Math.max(g.start,p.start),S=Math.min(h.count,Math.min(g.start+g.count,p.start+p.count));for(let y=v,E=S;y<E;y+=3){const b=y,A=y+1,_=y+2;s=ca(this,x,e,i,c,f,d,b,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let g=m,x=M;g<x;g+=3){const v=g,S=g+1,y=g+2;s=ca(this,a,e,i,c,f,d,v,S,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function l2(n,e,t,i,s,r,a,o){let h;if(e.side===In?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===bs,o),h===null)return null;la.copy(o),la.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(la);return c<t.near||c>t.far?null:{distance:c,point:la.clone(),object:n}}function ca(n,e,t,i,s,r,a,o,h,c){n.getVertexPosition(o,sa),n.getVertexPosition(h,ra),n.getVertexPosition(c,aa);const f=l2(n,e,t,i,sa,ra,aa,Th);if(f){const d=new V;si.getBarycoord(Th,sa,ra,aa,d),s&&(f.uv=si.getInterpolatedAttribute(s,o,h,c,d,new $e)),r&&(f.uv1=si.getInterpolatedAttribute(r,o,h,c,d,new $e)),a&&(f.normal=si.getInterpolatedAttribute(a,o,h,c,d,new V),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new V,materialIndex:0};si.getNormal(sa,ra,aa,u.normal),f.face=u,f.barycoord=d}return f}class Xs extends Sn{constructor(e=null,t=1,i=1,s,r,a,o,h,c=zt,f=zt,d,u){super(null,a,o,h,c,f,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lc extends Hn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const cs=new Br,c2=new $e(.5,.5),ha=new V;class Va{constructor(e=new ji,t=new ji,i=new ji,s=new ji,r=new ji,a=new ji){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Si,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],c=r[3],f=r[4],d=r[5],u=r[6],p=r[7],m=r[8],M=r[9],g=r[10],x=r[11],v=r[12],S=r[13],y=r[14],E=r[15];if(s[0].setComponents(c-a,p-f,x-m,E-v).normalize(),s[1].setComponents(c+a,p+f,x+m,E+v).normalize(),s[2].setComponents(c+o,p+d,x+M,E+S).normalize(),s[3].setComponents(c-o,p-d,x-M,E-S).normalize(),i)s[4].setComponents(h,u,g,y).normalize(),s[5].setComponents(c-h,p-u,x-g,E-y).normalize();else if(s[4].setComponents(c-h,p-u,x-g,E-y).normalize(),t===Si)s[5].setComponents(c+h,p+u,x+g,E+y).normalize();else if(t===Ga)s[5].setComponents(h,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){cs.center.set(0,0,0);const t=c2.distanceTo(e.center);return cs.radius=.7071067811865476+t,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ha.x=s.normal.x>0?e.max.x:e.min.x,ha.y=s.normal.y>0?e.max.y:e.min.y,ha.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ha)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pd extends hr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ya=new V,Xa=new V,Rh=new Ht,br=new Cc,ua=new Br,Vo=new V,Ch=new V;class h2 extends Rn{constructor(e=new Zt,t=new pd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ya.fromBufferAttribute(t,s-1),Xa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ya.distanceTo(Xa);e.setAttribute("lineDistance",new Lt(i,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(s),ua.radius+=r,e.ray.intersectsSphere(ua)===!1)return;Rh.copy(s).invert(),br.copy(e.ray).applyMatrix4(Rh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,f=i.index,u=i.attributes.position;if(f!==null){const p=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){const x=f.getX(M),v=f.getX(M+1),S=da(this,e,br,h,x,v,M);S&&t.push(S)}if(this.isLineLoop){const M=f.getX(m-1),g=f.getX(p),x=da(this,e,br,h,M,g,m-1);x&&t.push(x)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){const x=da(this,e,br,h,M,M+1,M);x&&t.push(x)}if(this.isLineLoop){const M=da(this,e,br,h,m-1,p,m-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function da(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Ya.fromBufferAttribute(o,s),Xa.fromBufferAttribute(o,r),t.distanceSqToSegment(Ya,Xa,Vo,Ch)>i)return;Vo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Vo);if(!(c<e.near||c>e.far))return{distance:c,point:Ch.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Lh=new V,Ph=new V;class Pc extends h2{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Lh.fromBufferAttribute(t,s),Ph.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Lh.distanceTo(Ph);e.setAttribute("lineDistance",new Lt(i,1))}else Ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class u2 extends hr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dh=new Ht,Ql=new Cc,fa=new Br,pa=new V;class Ka extends Rn{constructor(e=new Zt,t=new u2){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,e.ray.intersectsSphere(fa)===!1)return;Dh.copy(s).invert(),Ql.copy(e.ray).applyMatrix4(Dh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){const g=c.getX(m);pa.fromBufferAttribute(d,g),Ih(pa,g,h,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let m=u,M=p;m<M;m++)pa.fromBufferAttribute(d,m),Ih(pa,m,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ih(n,e,t,i,s,r,a){const o=Ql.distanceSqToPoint(n);if(o<t){const h=new V;Ql.closestPointToPoint(n,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class md extends Sn{constructor(e=[],t=Ss,i,s,r,a,o,h,c,f){super(e,t,i,s,r,a,o,h,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jl extends Sn{constructor(e,t,i,s,r,a,o,h,c){super(e,t,i,s,r,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ir extends Sn{constructor(e,t,i=Ai,s,r,a,o=zt,h=zt,c,f=Hi,d=1){if(f!==Hi&&f!==Ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,h,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class d2 extends ir{constructor(e,t=Ai,i=Ss,s,r,a=zt,o=zt,h,c=Hi){const f={width:e,height:e,depth:1},d=[f,f,f,f,f,f];super(e,e,t,i,s,r,a,o,h,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class gd extends Sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zr extends Zt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],f=[],d=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new Lt(c,3)),this.setAttribute("normal",new Lt(f,3)),this.setAttribute("uv",new Lt(d,2));function m(M,g,x,v,S,y,E,b,A,_,w){const C=y/A,R=E/_,P=y/2,I=E/2,O=b/2,k=A+1,G=_+1;let K=0,ie=0;const q=new V;for(let se=0;se<G;se++){const F=se*R-I;for(let ee=0;ee<k;ee++){const ae=ee*C-P;q[M]=ae*v,q[g]=F*S,q[x]=O,c.push(q.x,q.y,q.z),q[M]=0,q[g]=0,q[x]=b>0?1:-1,f.push(q.x,q.y,q.z),d.push(ee/A),d.push(1-se/_),K+=1}}for(let se=0;se<_;se++)for(let F=0;F<A;F++){const ee=u+F+k*se,ae=u+F+k*(se+1),ue=u+(F+1)+k*(se+1),ve=u+(F+1)+k*se;h.push(ee,ae,ve),h.push(ae,ue,ve),ie+=6}o.addGroup(p,ie,w),p+=ie,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wn extends Zt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),c=o+1,f=h+1,d=e/o,u=t/h,p=[],m=[],M=[],g=[];for(let x=0;x<f;x++){const v=x*u-a;for(let S=0;S<c;S++){const y=S*d-r;m.push(y,-v,0),M.push(0,0,1),g.push(S/o),g.push(1-x/h)}}for(let x=0;x<h;x++)for(let v=0;v<o;v++){const S=v+c*x,y=v+c*(x+1),E=v+1+c*(x+1),b=v+1+c*x;p.push(S,y,b),p.push(y,E,b)}this.setIndex(p),this.setAttribute("position",new Lt(m,3)),this.setAttribute("normal",new Lt(M,3)),this.setAttribute("uv",new Lt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.width,e.height,e.widthSegments,e.heightSegments)}}function sr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Oh(s))s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Oh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function An(n){const e={};for(let t=0;t<n.length;t++){const i=sr(n[t]);for(const s in i)e[s]=i[s]}return e}function Oh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function f2(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function xd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const p2={clone:sr,merge:An};var m2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,g2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends hr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=m2,this.fragmentShader=g2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=f2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new it().setHex(s.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[i].value=new V().fromArray(s.value);break;case"v4":this.uniforms[i].value=new rt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ht().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class x2 extends Mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class M2 extends hr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=R1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class v2 extends hr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ma=new V,ga=new lr,fi=new V;class Md extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ma,ga,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ma,ga,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ma,ga,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new V,Nh=new $e,Fh=new $e;class Un extends Md{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Jl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jl*2*Math.atan(Math.tan(yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,Nh,Fh),t.subVectors(Fh,Nh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Dc extends Md{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=f*this.view.offsetY,h=o-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ic extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Bs=-90,zs=1;class _2 extends Rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Un(Bs,zs,e,t);s.layers=this.layers,this.add(s);const r=new Un(Bs,zs,e,t);r.layers=this.layers,this.add(r);const a=new Un(Bs,zs,e,t);a.layers=this.layers,this.add(a);const o=new Un(Bs,zs,e,t);o.layers=this.layers,this.add(o);const h=new Un(Bs,zs,e,t);h.layers=this.layers,this.add(h);const c=new Un(Bs,zs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const c of t)this.remove(c);if(e===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ga)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,c,f]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(d,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class b2 extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class vd{static{vd.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function Uh(n,e,t,i){const s=y2(i);switch(t){case sd:return n*e;case ad:return n*e/s.components*s.byteLength;case Sc:return n*e/s.components*s.byteLength;case ws:return n*e*2/s.components*s.byteLength;case wc:return n*e*2/s.components*s.byteLength;case rd:return n*e*3/s.components*s.byteLength;case zn:return n*e*4/s.components*s.byteLength;case Ec:return n*e*4/s.components*s.byteLength;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case La:case Pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yl:case wl:return Math.max(n,16)*Math.max(e,8)/4;case bl:case Sl:return Math.max(n,8)*Math.max(e,8)/2;case El:case Al:case Rl:case Cl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Tl:case Ba:case Ll:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Il:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case kl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case zl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Yl:case Xl:case Kl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ql:case $l:return Math.ceil(n/4)*Math.ceil(e/4)*8;case za:case Zl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function y2(n){switch(n){case kn:case ed:return{byteLength:1,components:1};case Ir:case td:case Ti:return{byteLength:2,components:1};case bc:case yc:return{byteLength:2,components:4};case Ai:case _c:case yi:return{byteLength:4,components:1};case nd:case id:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mc}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mc);function _d(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function S2(n){const e=new WeakMap;function t(o,h){const c=o.array,f=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,h,c){const f=h.array,d=h.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,f);else{d.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<d.length;p++){const m=d[u],M=d[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,d[u]=M)}d.length=u+1;for(let p=0,m=d.length;p<m;p++){const M=d[p];n.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:s,remove:r,update:a}}var w2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,E2=`#ifdef USE_ALPHAHASH
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
#endif`,A2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,T2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,L2=`#ifdef USE_AOMAP
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
#endif`,P2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,D2=`#ifdef USE_BATCHING
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
#endif`,I2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,O2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,N2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,F2=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U2=`#ifdef USE_IRIDESCENCE
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
#endif`,k2=`#ifdef USE_BUMPMAP
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
#endif`,B2=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,z2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,G2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,V2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,X2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,K2=`#define PI 3.141592653589793
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
} // validated`,q2=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$2=`vec3 transformedNormal = objectNormal;
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
#endif`,Z2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,j2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ex="gl_FragColor = linearToOutputTexel( gl_FragColor );",tx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
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
#endif`,rx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ax=`#ifdef USE_ENVMAP
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
#endif`,ox=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ux=`#ifdef USE_GRADIENTMAP
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
}`,dx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,gx=`#ifdef USE_ENVMAP
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
#endif`,xx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bx=`PhysicalMaterial material;
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
#endif`,yx=`uniform sampler2D dfgLUT;
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
}`,Sx=`
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
#endif`,wx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ex=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ax=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Px=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ix=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ox=`#if defined( USE_POINTS_UV )
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
#endif`,Nx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ux=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`#ifdef USE_MORPHTARGETS
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
#endif`,Hx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kx=`#ifdef USE_NORMALMAP
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
#endif`,qx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$x=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,eM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cM=`float getShadowMask() {
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
}`,hM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uM=`#ifdef USE_SKINNING
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
#endif`,dM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fM=`#ifdef USE_SKINNING
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
#endif`,pM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MM=`#ifdef USE_TRANSMISSION
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
#endif`,vM=`#ifdef USE_TRANSMISSION
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
#endif`,_M=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,SM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,EM=`uniform sampler2D t2D;
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
}`,AM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,RM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LM=`#include <common>
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
}`,PM=`#if DEPTH_PACKING == 3200
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
}`,DM=`#define DISTANCE
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
}`,IM=`#define DISTANCE
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
}`,OM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,NM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FM=`uniform float scale;
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
}`,UM=`uniform vec3 diffuse;
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
}`,kM=`#include <common>
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
}`,BM=`uniform vec3 diffuse;
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
}`,zM=`#define LAMBERT
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
}`,HM=`#define LAMBERT
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
}`,GM=`#define MATCAP
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
}`,WM=`#define MATCAP
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
}`,VM=`#define NORMAL
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
}`,YM=`#define NORMAL
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
}`,XM=`#define PHONG
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
}`,KM=`#define PHONG
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
}`,qM=`#define STANDARD
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
}`,$M=`#define STANDARD
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
}`,ZM=`#define TOON
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
}`,JM=`#define TOON
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
}`,QM=`uniform float size;
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
}`,jM=`uniform vec3 diffuse;
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
}`,ev=`#include <common>
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
}`,tv=`uniform vec3 color;
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
}`,nv=`uniform float rotation;
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
}`,iv=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:w2,alphahash_pars_fragment:E2,alphamap_fragment:A2,alphamap_pars_fragment:T2,alphatest_fragment:R2,alphatest_pars_fragment:C2,aomap_fragment:L2,aomap_pars_fragment:P2,batching_pars_vertex:D2,batching_vertex:I2,begin_vertex:O2,beginnormal_vertex:N2,bsdfs:F2,iridescence_fragment:U2,bumpmap_pars_fragment:k2,clipping_planes_fragment:B2,clipping_planes_pars_fragment:z2,clipping_planes_pars_vertex:H2,clipping_planes_vertex:G2,color_fragment:W2,color_pars_fragment:V2,color_pars_vertex:Y2,color_vertex:X2,common:K2,cube_uv_reflection_fragment:q2,defaultnormal_vertex:$2,displacementmap_pars_vertex:Z2,displacementmap_vertex:J2,emissivemap_fragment:Q2,emissivemap_pars_fragment:j2,colorspace_fragment:ex,colorspace_pars_fragment:tx,envmap_fragment:nx,envmap_common_pars_fragment:ix,envmap_pars_fragment:sx,envmap_pars_vertex:rx,envmap_physical_pars_fragment:gx,envmap_vertex:ax,fog_vertex:ox,fog_pars_vertex:lx,fog_fragment:cx,fog_pars_fragment:hx,gradientmap_pars_fragment:ux,lightmap_pars_fragment:dx,lights_lambert_fragment:fx,lights_lambert_pars_fragment:px,lights_pars_begin:mx,lights_toon_fragment:xx,lights_toon_pars_fragment:Mx,lights_phong_fragment:vx,lights_phong_pars_fragment:_x,lights_physical_fragment:bx,lights_physical_pars_fragment:yx,lights_fragment_begin:Sx,lights_fragment_maps:wx,lights_fragment_end:Ex,lightprobes_pars_fragment:Ax,logdepthbuf_fragment:Tx,logdepthbuf_pars_fragment:Rx,logdepthbuf_pars_vertex:Cx,logdepthbuf_vertex:Lx,map_fragment:Px,map_pars_fragment:Dx,map_particle_fragment:Ix,map_particle_pars_fragment:Ox,metalnessmap_fragment:Nx,metalnessmap_pars_fragment:Fx,morphinstance_vertex:Ux,morphcolor_vertex:kx,morphnormal_vertex:Bx,morphtarget_pars_vertex:zx,morphtarget_vertex:Hx,normal_fragment_begin:Gx,normal_fragment_maps:Wx,normal_pars_fragment:Vx,normal_pars_vertex:Yx,normal_vertex:Xx,normalmap_pars_fragment:Kx,clearcoat_normal_fragment_begin:qx,clearcoat_normal_fragment_maps:$x,clearcoat_pars_fragment:Zx,iridescence_pars_fragment:Jx,opaque_fragment:Qx,packing:jx,premultiplied_alpha_fragment:eM,project_vertex:tM,dithering_fragment:nM,dithering_pars_fragment:iM,roughnessmap_fragment:sM,roughnessmap_pars_fragment:rM,shadowmap_pars_fragment:aM,shadowmap_pars_vertex:oM,shadowmap_vertex:lM,shadowmask_pars_fragment:cM,skinbase_vertex:hM,skinning_pars_vertex:uM,skinning_vertex:dM,skinnormal_vertex:fM,specularmap_fragment:pM,specularmap_pars_fragment:mM,tonemapping_fragment:gM,tonemapping_pars_fragment:xM,transmission_fragment:MM,transmission_pars_fragment:vM,uv_pars_fragment:_M,uv_pars_vertex:bM,uv_vertex:yM,worldpos_vertex:SM,background_vert:wM,background_frag:EM,backgroundCube_vert:AM,backgroundCube_frag:TM,cube_vert:RM,cube_frag:CM,depth_vert:LM,depth_frag:PM,distance_vert:DM,distance_frag:IM,equirect_vert:OM,equirect_frag:NM,linedashed_vert:FM,linedashed_frag:UM,meshbasic_vert:kM,meshbasic_frag:BM,meshlambert_vert:zM,meshlambert_frag:HM,meshmatcap_vert:GM,meshmatcap_frag:WM,meshnormal_vert:VM,meshnormal_frag:YM,meshphong_vert:XM,meshphong_frag:KM,meshphysical_vert:qM,meshphysical_frag:$M,meshtoon_vert:ZM,meshtoon_frag:JM,points_vert:QM,points_frag:jM,shadow_vert:ev,shadow_frag:tv,sprite_vert:nv,sprite_frag:iv},Re={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Mi={basic:{uniforms:An([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:An([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:An([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:An([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:An([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new it(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:An([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:An([Re.points,Re.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:An([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:An([Re.common,Re.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:An([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:An([Re.sprite,Re.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:An([Re.common,Re.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:An([Re.lights,Re.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Mi.physical={uniforms:An([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const xa={r:0,b:0,g:0},sv=new Ht,bd=new Ze;bd.set(-1,0,0,0,1,0,0,0,1);function rv(n,e,t,i,s,r){const a=new it(0);let o=s===!0?0:1,h,c,f=null,d=0,u=null;function p(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){const y=v.backgroundBlurriness>0;S=e.get(S,y)}return S}function m(v){let S=!1;const y=p(v);y===null?g(a,o):y&&y.isColor&&(g(y,1),S=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,S){const y=p(S);y&&(y.isCubeTexture||y.mapping===so)?(c===void 0&&(c=new Kt(new zr(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:sr(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sv.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bd),c.material.toneMapped=lt.getTransfer(y.colorSpace)!==Et,(f!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new Kt(new Wn(2,2),new Mt({name:"BackgroundMaterial",uniforms:sr(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:bs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=y,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.toneMapped=lt.getTransfer(y.colorSpace)!==Et,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||d!==y.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,f=y,d=y.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function g(v,S){v.getRGB(xa,xd(n)),t.buffers.color.setClear(xa.r,xa.g,xa.b,S,r)}function x(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:M,dispose:x}}function av(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(R,P,I,O,k){let G=!1;const K=d(R,O,I,P);r!==K&&(r=K,c(r.object)),G=p(R,O,I,k),G&&m(R,O,I,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(R,P,I,O),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function h(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function f(R){return n.deleteVertexArray(R)}function d(R,P,I,O){const k=O.wireframe===!0;let G=i[P.id];G===void 0&&(G={},i[P.id]=G);const K=R.isInstancedMesh===!0?R.id:0;let ie=G[K];ie===void 0&&(ie={},G[K]=ie);let q=ie[I.id];q===void 0&&(q={},ie[I.id]=q);let se=q[k];return se===void 0&&(se=u(h()),q[k]=se),se}function u(R){const P=[],I=[],O=[];for(let k=0;k<t;k++)P[k]=0,I[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:O,object:R,attributes:{},index:null}}function p(R,P,I,O){const k=r.attributes,G=P.attributes;let K=0;const ie=I.getAttributes();for(const q in ie)if(ie[q].location>=0){const F=k[q];let ee=G[q];if(ee===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor)),F===void 0||F.attribute!==ee||ee&&F.data!==ee.data)return!0;K++}return r.attributesNum!==K||r.index!==O}function m(R,P,I,O){const k={},G=P.attributes;let K=0;const ie=I.getAttributes();for(const q in ie)if(ie[q].location>=0){let F=G[q];F===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(F=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(F=R.instanceColor));const ee={};ee.attribute=F,F&&F.data&&(ee.data=F.data),k[q]=ee,K++}r.attributes=k,r.attributesNum=K,r.index=O}function M(){const R=r.newAttributes;for(let P=0,I=R.length;P<I;P++)R[P]=0}function g(R){x(R,0)}function x(R,P){const I=r.newAttributes,O=r.enabledAttributes,k=r.attributeDivisors;I[R]=1,O[R]===0&&(n.enableVertexAttribArray(R),O[R]=1),k[R]!==P&&(n.vertexAttribDivisor(R,P),k[R]=P)}function v(){const R=r.newAttributes,P=r.enabledAttributes;for(let I=0,O=P.length;I<O;I++)P[I]!==R[I]&&(n.disableVertexAttribArray(I),P[I]=0)}function S(R,P,I,O,k,G,K){K===!0?n.vertexAttribIPointer(R,P,I,k,G):n.vertexAttribPointer(R,P,I,O,k,G)}function y(R,P,I,O){M();const k=O.attributes,G=I.getAttributes(),K=P.defaultAttributeValues;for(const ie in G){const q=G[ie];if(q.location>=0){let se=k[ie];if(se===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&(se=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&(se=R.instanceColor)),se!==void 0){const F=se.normalized,ee=se.itemSize,ae=e.get(se);if(ae===void 0)continue;const ue=ae.buffer,ve=ae.type,Se=ae.bytesPerElement,B=ve===n.INT||ve===n.UNSIGNED_INT||se.gpuType===_c;if(se.isInterleavedBufferAttribute){const z=se.data,N=z.stride,Z=se.offset;if(z.isInstancedInterleavedBuffer){for(let j=0;j<q.locationSize;j++)x(q.location+j,z.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let j=0;j<q.locationSize;j++)g(q.location+j);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let j=0;j<q.locationSize;j++)S(q.location+j,ee/q.locationSize,ve,F,N*Se,(Z+ee/q.locationSize*j)*Se,B)}else{if(se.isInstancedBufferAttribute){for(let z=0;z<q.locationSize;z++)x(q.location+z,se.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let z=0;z<q.locationSize;z++)g(q.location+z);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let z=0;z<q.locationSize;z++)S(q.location+z,ee/q.locationSize,ve,F,ee*Se,ee/q.locationSize*z*Se,B)}}else if(K!==void 0){const F=K[ie];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(q.location,F);break;case 3:n.vertexAttrib3fv(q.location,F);break;case 4:n.vertexAttrib4fv(q.location,F);break;default:n.vertexAttrib1fv(q.location,F)}}}}v()}function E(){w();for(const R in i){const P=i[R];for(const I in P){const O=P[I];for(const k in O){const G=O[k];for(const K in G)f(G[K].object),delete G[K];delete O[k]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;const P=i[R.id];for(const I in P){const O=P[I];for(const k in O){const G=O[k];for(const K in G)f(G[K].object),delete G[K];delete O[k]}}delete i[R.id]}function A(R){for(const P in i){const I=i[P];for(const O in I){const k=I[O];if(k[R.id]===void 0)continue;const G=k[R.id];for(const K in G)f(G[K].object),delete G[K];delete k[R.id]}}}function _(R){for(const P in i){const I=i[P],O=R.isInstancedMesh===!0?R.id:0,k=I[O];if(k!==void 0){for(const G in k){const K=k[G];for(const ie in K)f(K[ie].object),delete K[ie];delete k[G]}delete I[O],Object.keys(I).length===0&&delete i[P]}}}function w(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:g,disableUnusedAttributes:v}}function ov(n,e,t){let i;function s(h){i=h}function r(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,f){f!==0&&(n.drawArraysInstanced(i,h,c,f),t.update(c,i,f))}function o(h,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function lv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==zn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==kn&&A!==yi&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=h(c);f!==c&&(Ke("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:y,maxSamples:E,samples:b}}function cv(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ji,o=new Ze,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=f(d,u,0)},this.setState=function(d,u,p){const m=d.clippingPlanes,M=d.clipIntersection,g=d.clipShadows,x=n.get(d);if(!s||m===null||m.length===0||r&&!g)r?f(null):c();else{const v=r?0:i,S=v*4;let y=x.clippingState||null;h.value=y,y=f(m,u,S,p);for(let E=0;E!==S;++E)y[E]=t[E];x.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,u,p,m){const M=d!==null?d.length:0;let g=null;if(M!==0){if(g=h.value,m!==!0||g===null){const x=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<x)&&(g=new Float32Array(x));for(let S=0,y=p;S!==M;++S,y+=4)a.copy(d[S]).applyMatrix4(v,o),a.normal.toArray(g,y),g[y+3]=a.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}const Ks=4,hv=6,uv=20,dv=256,yr=new Dc,kh=new it;let Yo=null,Xo=0,Ko=0,qo=!1;const fv=new V,hs=new V;class Bh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=fv}=r;Yo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Yo,Xo,Ko),this._renderer.xr.enabled=qo,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ss||e.mapping===nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Ti,format:zn,colorSpace:Nr,depthBuffer:!1},s=zh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zh(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=pv(r)),this._blurMaterial=gv(r,e,t),this._ggxMaterial=mv(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new Zt,e);this._renderer.compile(t,yr)}_sceneToCubeUV(e,t,i,s,r){const h=new Un(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(kh),d.toneMapping=Ei,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new zr,new fd({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,g=M.material;let x=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,x=!0):(g.color.copy(kh),x=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(h.up.set(0,c[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+f[S],r.y,r.z)):y===1?(h.up.set(0,0,c[S]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+f[S],r.z)):(h.up.set(0,c[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+f[S]));const E=this._cubeSize;Hs(s,y*E,S>2?E:0,E,E),d.setRenderTarget(s),x&&d.render(M,h),d.render(e,h)}d.toneMapping=p,d.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ss||e.mapping===nr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;Hs(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,yr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-f*f),u=c*1.25,p=d*u,{_lodMax:m}=this,M=this._sizeLods[i],g=3*M*(i>m-Ks?i-m+Ks:0),x=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=m-t,Hs(r,g,x,3*M,2*M),s.setRenderTarget(r),s.render(o,yr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=m-i,Hs(e,g,x,3*M,2*M),s.setRenderTarget(e),s.render(o,yr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[s],d=3*f*(s>this._lodMax-Ks?s-this._lodMax+Ks:0),u=4*(this._cubeSize-f);Hs(t,d,u,3*f,2*f),a.setRenderTarget(t),a.render(h,yr)}}function pv(n){const e=[],t=[];let i=n;const s=n-Ks+1+hv;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,f=[h,h,c,h,c,c,h,h,c,c,h,c],d=6,u=6,p=3,m=new Float32Array(p*u*d),M=new Float32Array(p*u*d);for(let x=0;x<d;x++){const v=x%3*2/3-1,S=x>2?0:-1,y=[v,S,0,v+2/3,S,0,v+2/3,S+1,0,v,S,0,v+2/3,S+1,0,v,S+1,0];m.set(y,p*u*x);for(let E=0;E<u;E++){const b=f[E*2]*2-1,A=f[E*2+1]*2-1;x===0?hs.set(1,A,b):x===1?hs.set(-b,1,-A):x===2?hs.set(-b,A,1):x===3?hs.set(-1,A,-b):x===4?hs.set(-b,-1,A):hs.set(b,A,-1),hs.toArray(M,(x*u+E)*p)}}const g=new Zt;g.setAttribute("position",new Hn(m,p)),g.setAttribute("outputDirection",new Hn(M,p)),t.push(new Kt(g,null)),i>Ks&&i--}return{lodMeshes:t,sizeLods:e}}function zh(n,e,t){const i=new Zn(n,e,t);return i.texture.mapping=so,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function mv(n,e,t){return new Mt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ro(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function gv(n,e,t){return new Mt({name:"SphericalGaussianBlur",defines:{SAMPLES:uv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ro(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Hh(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ro(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Gh(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ro(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class yd extends Zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new md(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new zr(5,5,5),r=new Mt({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:In,blending:wi});r.uniforms.tEquirect.value=t;const a=new Kt(s,r),o=t.minFilter;return t.minFilter===xs&&(t.minFilter=Yt),new _2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function xv(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Mo||p===vo)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const M=new yd(m.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===Mo||p===vo,M=p===Ss||p===nr;if(m||M){let g=t.get(u);const x=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==x)return i===null&&(i=new Bh(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const v=u.image;return m&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new Bh(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",f),g.texture):null}}}return u}function o(u,p){return p===Mo?u.mapping=Ss:p===vo&&(u.mapping=nr),u}function h(u){let p=0;const m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(u){const p=u.target;p.removeEventListener("dispose",f);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Mv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Qs("WebGLRenderer: "+i+" extension not supported."),s}}}function vv(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,m=d.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let S=0,y=v.length;S<y;S+=3){const E=v[S+0],b=v[S+1],A=v[S+2];u.push(E,b,b,A,A,E)}}else{const v=m.array;M=m.version;for(let S=0,y=v.length/3-1;S<y;S+=3){const E=S+0,b=S+1,A=S+2;u.push(E,b,b,A,A,E)}}const g=new(m.count>=65535?dd:ud)(u,1);g.version=M;const x=r.get(d);x&&e.remove(x),r.set(d,g)}function f(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:h,getWireframeAttribute:f}}function _v(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function h(d,u){n.drawElements(i,u,r,d*a),t.update(u,i,1)}function c(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*a,p),t.update(u,i,p))}function f(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let M=0;for(let g=0;g<p;g++)M+=u[g];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=f}function bv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function yv(n,e,t){const i=new WeakMap,s=new rt;function r(a,o,h){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),m===!0&&(S=2),M===!0&&(S=3);let y=o.attributes.position.count*S,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*E*4*d),A=new ld(b,y,E,d);A.type=yi,A.needsUpdate=!0;const _=S*4;for(let C=0;C<d;C++){const R=g[C],P=x[C],I=v[C],O=y*E*4*C;for(let k=0;k<R.count;k++){const G=k*_;p===!0&&(s.fromBufferAttribute(R,k),b[O+G+0]=s.x,b[O+G+1]=s.y,b[O+G+2]=s.z,b[O+G+3]=0),m===!0&&(s.fromBufferAttribute(P,k),b[O+G+4]=s.x,b[O+G+5]=s.y,b[O+G+6]=s.z,b[O+G+7]=0),M===!0&&(s.fromBufferAttribute(I,k),b[O+G+8]=s.x,b[O+G+9]=s.y,b[O+G+10]=s.z,b[O+G+11]=I.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new $e(y,E)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Sv(n,e,t,i,s){let r=new WeakMap;function a(c){const f=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==f&&(e.update(u),r.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==f&&(p.update(),r.set(p,f))}return u}function o(){r=new WeakMap}function h(c){const f=c.target;f.removeEventListener("dispose",h),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const wv={[Xu]:"LINEAR_TONE_MAPPING",[Ku]:"REINHARD_TONE_MAPPING",[qu]:"CINEON_TONE_MAPPING",[$u]:"ACES_FILMIC_TONE_MAPPING",[Ju]:"AGX_TONE_MAPPING",[Qu]:"NEUTRAL_TONE_MAPPING",[Zu]:"CUSTOM_TONE_MAPPING"};function Ev(n,e,t,i,s,r){const a=new Zn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new Zt;c.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const f=new x2({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Kt(c,f),u=new Dc(-1,1,1,-1,0,1);let p=null,m=null,M=!1,g,x=null,v=[],S=!1;this.setSize=function(y,E){a.setSize(y,E),o!==null&&o.setSize(y,E),h!==null&&h.setSize(y,E);for(let b=0;b<v.length;b++){const A=v[b];A.setSize&&A.setSize(y,E)}},this.setEffects=function(y){v=y,S=v.length>0&&v[0].isRenderPass===!0;const E=a.width,b=a.height;v.length>0&&o===null&&(o=new Zn(E,b,{type:Ti,depthBuffer:!1,stencilBuffer:!1}),h=new Zn(E,b,{type:Ti,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){const _=v[A];_.setSize&&_.setSize(E,b)}},this.begin=function(y,E){if(M||y.toneMapping===Ei&&v.length===0)return!1;if(x=E,E!==null){const b=E.width,A=E.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return S===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=Ei,!0},this.hasRenderPass=function(){return S},this.end=function(y,E){y.toneMapping=g,M=!0;let b=a,A=o;for(let _=0;_<v.length;_++){const w=v[_];w.enabled!==!1&&(w.render(y,A,b,E),w.needsSwap!==!1&&(b=A,A=A===o?h:o))}if(p!==y.outputColorSpace||m!==y.toneMapping){p=y.outputColorSpace,m=y.toneMapping,f.defines={},lt.getTransfer(p)===Et&&(f.defines.SRGB_TRANSFER="");const _=wv[m];_&&(f.defines[_]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(x),y.render(d,u),x=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),f.dispose()}}const Sd=new Sn,ec=new ir(1,1),wd=new ld,Ed=new q1,Ad=new md,Wh=[],Vh=[],Yh=new Float32Array(16),Xh=new Float32Array(9),Kh=new Float32Array(4);function ur(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Wh[s];if(r===void 0&&(r=new Float32Array(s),Wh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ao(n,e){let t=Vh[e];t===void 0&&(t=new Int32Array(e),Vh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Av(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function Cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function Lv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Kh.set(i),n.uniformMatrix2fv(this.addr,!1,Kh),an(t,i)}}function Pv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Xh.set(i),n.uniformMatrix3fv(this.addr,!1,Xh),an(t,i)}}function Dv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Yh.set(i),n.uniformMatrix4fv(this.addr,!1,Yh),an(t,i)}}function Iv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function Nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function Fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function Uv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function kv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function Bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function zv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function Hv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ec.compareFunction=t.isReversedDepthBuffer()?Tc:Ac,r=ec):r=Sd,t.setTexture2D(e||r,s)}function Gv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ed,s)}function Wv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ad,s)}function Vv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||wd,s)}function Yv(n){switch(n){case 5126:return Av;case 35664:return Tv;case 35665:return Rv;case 35666:return Cv;case 35674:return Lv;case 35675:return Pv;case 35676:return Dv;case 5124:case 35670:return Iv;case 35667:case 35671:return Ov;case 35668:case 35672:return Nv;case 35669:case 35673:return Fv;case 5125:return Uv;case 36294:return kv;case 36295:return Bv;case 36296:return zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Hv;case 35679:case 36299:case 36307:return Gv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Vv}}function Xv(n,e){n.uniform1fv(this.addr,e)}function Kv(n,e){const t=ur(e,this.size,2);n.uniform2fv(this.addr,t)}function qv(n,e){const t=ur(e,this.size,3);n.uniform3fv(this.addr,t)}function $v(n,e){const t=ur(e,this.size,4);n.uniform4fv(this.addr,t)}function Zv(n,e){const t=ur(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Jv(n,e){const t=ur(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Qv(n,e){const t=ur(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function jv(n,e){n.uniform1iv(this.addr,e)}function e_(n,e){n.uniform2iv(this.addr,e)}function t_(n,e){n.uniform3iv(this.addr,e)}function n_(n,e){n.uniform4iv(this.addr,e)}function i_(n,e){n.uniform1uiv(this.addr,e)}function s_(n,e){n.uniform2uiv(this.addr,e)}function r_(n,e){n.uniform3uiv(this.addr,e)}function a_(n,e){n.uniform4uiv(this.addr,e)}function o_(n,e,t){const i=this.cache,s=e.length,r=ao(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ec:a=Sd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function l_(n,e,t){const i=this.cache,s=e.length,r=ao(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ed,r[a])}function c_(n,e,t){const i=this.cache,s=e.length,r=ao(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ad,r[a])}function h_(n,e,t){const i=this.cache,s=e.length,r=ao(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||wd,r[a])}function u_(n){switch(n){case 5126:return Xv;case 35664:return Kv;case 35665:return qv;case 35666:return $v;case 35674:return Zv;case 35675:return Jv;case 35676:return Qv;case 5124:case 35670:return jv;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return h_}}class d_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Yv(t.type)}}class f_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=u_(t.type)}}class p_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const $o=/(\w+)(\])?(\[|\.)?/g;function qh(n,e){n.seq.push(e),n.map[e.id]=e}function m_(n,e,t){const i=n.name,s=i.length;for($o.lastIndex=0;;){const r=$o.exec(i),a=$o.lastIndex;let o=r[1];const h=r[2]==="]",c=r[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===s){qh(t,c===void 0?new d_(o,n,e):new f_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new p_(o),qh(t,d)),t=d}}}class Da{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);m_(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function $h(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const g_=37297;let x_=0;function M_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Zh=new Ze;function v_(n){lt._getMatrix(Zh,lt.workingColorSpace,n);const e=`mat3( ${Zh.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(n)){case Ha:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Jh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+M_(n.getShaderSource(e),o)}else return r}function __(n,e){const t=v_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const b_={[Xu]:"Linear",[Ku]:"Reinhard",[qu]:"Cineon",[$u]:"ACESFilmic",[Ju]:"AgX",[Qu]:"Neutral",[Zu]:"Custom"};function y_(n,e){const t=b_[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ma=new V;function S_(){lt.getLuminanceCoefficients(Ma);const n=Ma.x.toFixed(4),e=Ma.y.toFixed(4),t=Ma.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function E_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function A_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Cr(n){return n!==""}function Qh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function tc(n){return n.replace(T_,C_)}const R_=new Map;function C_(n,e){let t=nt[e];if(t===void 0){const i=R_.get(e);if(i!==void 0)t=nt[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return tc(t)}const L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eu(n){return n.replace(L_,P_)}function P_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const D_={[Ta]:"SHADOWMAP_TYPE_PCF",[Rr]:"SHADOWMAP_TYPE_VSM"};function I_(n){return D_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const O_={[Ss]:"ENVMAP_TYPE_CUBE",[nr]:"ENVMAP_TYPE_CUBE",[so]:"ENVMAP_TYPE_CUBE_UV"};function N_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":O_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const F_={[nr]:"ENVMAP_MODE_REFRACTION"};function U_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const k_={[Yu]:"ENVMAP_BLENDING_MULTIPLY",[E1]:"ENVMAP_BLENDING_MIX",[A1]:"ENVMAP_BLENDING_ADD"};function B_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":k_[n.combine]||"ENVMAP_BLENDING_NONE"}function z_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function H_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=I_(t),c=N_(t),f=U_(t),d=B_(t),u=z_(t),p=w_(t),m=E_(r),M=s.createProgram();let g,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),g.length>0&&(g+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Cr).join(`
`),x.length>0&&(x+=`
`)):(g=[tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),x=[tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?nt.tonemapping_pars_fragment:"",t.toneMapping!==Ei?y_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,__("linearToOutputTexel",t.outputColorSpace),S_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),a=tc(a),a=Qh(a,t),a=jh(a,t),o=tc(o),o=Qh(o,t),o=jh(o,t),a=eu(a),o=eu(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,x=["#define varying in",t.glslVersion===hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+g+a,y=v+x+o,E=$h(s,s.VERTEX_SHADER,S),b=$h(s,s.FRAGMENT_SHADER,y);s.attachShader(M,E),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(R){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(M)||"",I=s.getShaderInfoLog(E)||"",O=s.getShaderInfoLog(b)||"",k=P.trim(),G=I.trim(),K=O.trim();let ie=!0,q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,b);else{const se=Jh(s,E,"vertex"),F=Jh(s,b,"fragment");mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+se+`
`+F)}else k!==""?Ke("WebGLProgram: Program Info Log:",k):(G===""||K==="")&&(q=!1);q&&(R.diagnostics={runnable:ie,programLog:k,vertexShader:{log:G,prefix:g},fragmentShader:{log:K,prefix:x}})}s.deleteShader(E),s.deleteShader(b),_=new Da(s,M),w=A_(s,M)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,g_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=x_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=b,this}let G_=0;class W_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new V_(e),t.set(e,i)),i}}class V_{constructor(e){this.id=G_++,this.code=e,this.usedTimes=0}}function Y_(n){return n===ws||n===Ba||n===za}function X_(n,e,t,i,s,r){const a=new cd,o=new W_,h=new Set,c=[],f=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,w,C,R,P,I){const O=R.fog,k=P.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ie=e.get(_.envMap||G,K),q=ie&&ie.mapping===so?ie.image.height:null,se=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ke("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const F=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ee=F!==void 0?F.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let ue,ve,Se,B;if(se){const Nt=Mi[se];ue=Nt.vertexShader,ve=Nt.fragmentShader}else{ue=_.vertexShader,ve=_.fragmentShader;const Nt=o.getVertexShaderStage(_),vt=o.getFragmentShaderStage(_);o.update(_,Nt,vt),Se=Nt.id,B=vt.id}const z=n.getRenderTarget(),N=n.state.buffers.depth.getReversed(),Z=P.isInstancedMesh===!0,j=P.isBatchedMesh===!0,ce=!!_.map,oe=!!_.matcap,fe=!!ie,xe=!!_.aoMap,Me=!!_.lightMap,ye=!!_.bumpMap&&_.wireframe===!1,We=!!_.normalMap,at=!!_.displacementMap,ht=!!_.emissiveMap,Tt=!!_.metalnessMap,Dt=!!_.roughnessMap,Y=_.anisotropy>0,et=_.clearcoat>0,Xe=_.dispersion>0,U=_.retroreflectivity>0,T=_.iridescence>0,H=_.sheen>0,$=_.transmission>0,te=Y&&!!_.anisotropyMap,ge=et&&!!_.clearcoatMap,_e=et&&!!_.clearcoatNormalMap,re=et&&!!_.clearcoatRoughnessMap,le=T&&!!_.iridescenceMap,be=T&&!!_.iridescenceThicknessMap,Ue=H&&!!_.sheenColorMap,Te=H&&!!_.sheenRoughnessMap,we=!!_.specularMap,ze=!!_.specularColorMap,Ye=!!_.specularIntensityMap,Je=$&&!!_.transmissionMap,X=$&&!!_.thicknessMap,Ee=!!_.gradientMap,he=!!_.alphaMap,Ae=_.alphaTest>0,De=!!_.alphaHash,pe=!!_.extensions;let He=Ei;_.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(He=n.toneMapping);const ke={shaderID:se,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:ve,defines:_.defines,customVertexShaderID:Se,customFragmentShaderID:B,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:j,batchingColor:j&&P._colorsTexture!==null,instancing:Z,instancingColor:Z&&P.instanceColor!==null,instancingMorph:Z&&P.morphTexture!==null,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ce,matcap:oe,envMap:fe,envMapMode:fe&&ie.mapping,envMapCubeUVHeight:q,aoMap:xe,lightMap:Me,bumpMap:ye,normalMap:We,displacementMap:at,emissiveMap:ht,normalMapObjectSpace:We&&_.normalMapType===C1,normalMapTangentSpace:We&&_.normalMapType===ch,packedNormalMap:We&&_.normalMapType===ch&&Y_(_.normalMap.format),metalnessMap:Tt,roughnessMap:Dt,anisotropy:Y,anisotropyMap:te,clearcoat:et,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:re,dispersion:Xe,retroreflection:U,iridescence:T,iridescenceMap:le,iridescenceThicknessMap:be,sheen:H,sheenColorMap:Ue,sheenRoughnessMap:Te,specularMap:we,specularColorMap:ze,specularIntensityMap:Ye,transmission:$,transmissionMap:Je,thicknessMap:X,gradientMap:Ee,opaque:_.transparent===!1&&_.blending===Zs&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:Ae,alphaHash:De,combine:_.combine,mapUv:ce&&m(_.map.channel),aoMapUv:xe&&m(_.aoMap.channel),lightMapUv:Me&&m(_.lightMap.channel),bumpMapUv:ye&&m(_.bumpMap.channel),normalMapUv:We&&m(_.normalMap.channel),displacementMapUv:at&&m(_.displacementMap.channel),emissiveMapUv:ht&&m(_.emissiveMap.channel),metalnessMapUv:Tt&&m(_.metalnessMap.channel),roughnessMapUv:Dt&&m(_.roughnessMap.channel),anisotropyMapUv:te&&m(_.anisotropyMap.channel),clearcoatMapUv:ge&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(_.sheenRoughnessMap.channel),specularMapUv:we&&m(_.specularMap.channel),specularColorMapUv:ze&&m(_.specularColorMap.channel),specularIntensityMapUv:Ye&&m(_.specularIntensityMap.channel),transmissionMapUv:Je&&m(_.transmissionMap.channel),thicknessMapUv:X&&m(_.thicknessMap.channel),alphaMapUv:he&&m(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(We||Y),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!k.attributes.uv&&(ce||he),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&We===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:N,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ae,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:ce&&_.map.isVideoTexture===!0&&lt.getTransfer(_.map.colorSpace)===Et,decodeVideoTextureEmissive:ht&&_.emissiveMap.isVideoTexture===!0&&lt.getTransfer(_.emissiveMap.colorSpace)===Et,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===vi,flipSided:_.side===In,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:pe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&_.extensions.multiDraw===!0||j)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ke.vertexUv1s=h.has(1),ke.vertexUv2s=h.has(2),ke.vertexUv3s=h.has(3),h.clear(),ke}function g(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)w.push(C),w.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(x(w,_),v(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function x(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function v(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const w=p[_.type];let C;if(w){const R=Mi[w];C=p2.clone(R.uniforms)}else C=_.uniforms;return C}function y(_,w){let C=f.get(w);return C!==void 0?++C.usedTimes:(C=new H_(n,w,_,s),c.push(C),f.set(w,C)),C}function E(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),f.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:S,acquireProgram:y,releaseProgram:E,releaseShaderCache:b,programs:c,dispose:A}}function K_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function q_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function nu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function iu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,g,x){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:g,group:x},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=g,v.group=x),e++,v}function h(u,p,m,M,g,x,v){v.reversedDepth===!0&&(g=-g);const S=o(u,p,m,M,g,x);m.transmission>0?i.push(S):m.transparent===!0?s.push(S):t.push(S)}function c(u,p,m,M,g,x){const v=o(u,p,m,M,g,x);m.transmission>0?i.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function f(u,p){t.length>1&&t.sort(u||q_),i.length>1&&i.sort(p||nu),s.length>1&&s.sort(p||nu)}function d(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:c,finish:d,sort:f}}function $_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new iu,n.set(i,[a])):s>=r.length?(a=new iu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Z_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new it};break;case"SpotLight":t={position:new V,direction:new V,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function J_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Q_=0;function j_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function eb(n){const e=new Z_,t=J_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const s=new V,r=new Ht,a=new Ht;function o(c){let f=0,d=0,u=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let p=0,m=0,M=0,g=0,x=0,v=0,S=0,y=0,E=0,b=0,A=0,_=0,w=0,C=0;c.sort(j_);for(let P=0,I=c.length;P<I;P++){const O=c[P],k=O.color,G=O.intensity,K=O.distance;let ie=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===ws?ie=O.shadow.map.texture:ie=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)f+=k.r*G,d+=k.g*G,u+=k.b*G;else if(O.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(O.sh.coefficients[q],G);C++}else if(O.isSunLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const se=O.shadow,F=t.get(O);F.shadowIntensity=se.intensity,F.shadowBias=se.bias,F.shadowNormalBias=se.normalBias,F.shadowRadius=se.radius,F.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),i.sunShadow[m]=F,i.sunShadowMap[m]=ie;const ee=se.getViewportCount();for(let ae=0;ae<ee;ae++)i.sunShadowMatrix[M+ae]=se.getMatrix(ae),i.sunShadowCascade[M+ae]=se._cascadeData[ae];M+=ee,m++}i.sun[p]=q,p++}else if(O.isDirectionalLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const se=O.shadow,F=t.get(O);F.shadowIntensity=se.intensity,F.shadowBias=se.bias,F.shadowNormalBias=se.normalBias,F.shadowRadius=se.radius,F.shadowMapSize=se.mapSize,i.directionalShadow[g]=F,i.directionalShadowMap[g]=ie,i.directionalShadowMatrix[g]=O.shadow.matrix,E++}i.directional[g]=q,g++}else if(O.isSpotLight){const q=e.get(O);q.position.setFromMatrixPosition(O.matrixWorld),q.color.copy(k).multiplyScalar(G),q.distance=K,q.coneCos=Math.cos(O.angle),q.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),q.decay=O.decay,i.spot[v]=q;const se=O.shadow;if(O.map&&(i.spotLightMap[_]=O.map,_++,se.updateMatrices(O),O.castShadow&&w++),i.spotLightMatrix[v]=se.matrix,O.castShadow){const F=t.get(O);F.shadowIntensity=se.intensity,F.shadowBias=se.bias,F.shadowNormalBias=se.normalBias,F.shadowRadius=se.radius,F.shadowMapSize=se.mapSize,i.spotShadow[v]=F,i.spotShadowMap[v]=ie,A++}v++}else if(O.isRectAreaLight){const q=e.get(O);q.color.copy(k).multiplyScalar(G),q.halfWidth.set(O.width*.5,0,0),q.halfHeight.set(0,O.height*.5,0),i.rectArea[S]=q,S++}else if(O.isPointLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),q.distance=O.distance,q.decay=O.decay,O.castShadow){const se=O.shadow,F=t.get(O);F.shadowIntensity=se.intensity,F.shadowBias=se.bias,F.shadowNormalBias=se.normalBias,F.shadowRadius=se.radius,F.shadowMapSize=se.mapSize,F.shadowCameraNear=se.camera.near,F.shadowCameraFar=se.camera.far,i.pointShadow[x]=F,i.pointShadowMap[x]=ie,i.pointShadowMatrix[x]=O.shadow.matrix,b++}i.point[x]=q,x++}else if(O.isHemisphereLight){const q=e.get(O);q.skyColor.copy(O.color).multiplyScalar(G),q.groundColor.copy(O.groundColor).multiplyScalar(G),i.hemi[y]=q,y++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=u;const R=i.hash;(R.sunLength!==p||R.directionalLength!==g||R.pointLength!==x||R.spotLength!==v||R.rectAreaLength!==S||R.hemiLength!==y||R.numSunShadows!==m||R.numDirectionalShadows!==E||R.numPointShadows!==b||R.numSpotShadows!==A||R.numSpotMaps!==_||R.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=g,i.spot.length=v,i.rectArea.length=S,i.point.length=x,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-w,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,R.sunLength=p,R.directionalLength=g,R.pointLength=x,R.spotLength=v,R.rectAreaLength=S,R.hemiLength=y,R.numSunShadows=m,R.numDirectionalShadows=E,R.numPointShadows=b,R.numSpotShadows=A,R.numSpotMaps=_,R.numLightProbes=C,i.version=Q_++)}function h(c,f){let d=0,u=0,p=0,m=0,M=0,g=0;const x=f.matrixWorldInverse;for(let v=0,S=c.length;v<S;v++){const y=c[v];if(y.isSunLight){const E=i.sun[d];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(x),d++}else if(y.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),u++}else if(y.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(x),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),m++}else if(y.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(x),a.identity(),r.copy(y.matrixWorld),r.premultiply(x),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(x),p++}else if(y.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(x),g++}}}return{setup:o,setupView:h,state:i}}function su(n){const e=new eb(n),t=[],i=[],s=[];function r(u){d.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function c(){e.setup(t)}function f(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function tb(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new su(n),e.set(s,[o])):r>=a.length?(o=new su(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const nb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ib=`uniform sampler2D shadow_pass;
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
}`,sb=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],rb=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],ru=new Ht,Sr=new V,Zo=new V;function ab(n,e,t){let i=new Va;const s=new $e,r=new $e,a=new rt,o=new M2,h=new v2,c={},f=t.maxTextureSize,d={[bs]:In,[In]:bs,[vi]:vi},u=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:nb,fragmentShader:ib}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new Zt;m.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Kt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ta;let x=this.type;this.render=function(b,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===c1&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ta);const w=n.getRenderTarget(),C=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),P=n.state;P.setBlending(wi),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=x!==this.type;I&&A.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(k=>k.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,k=b.length;O<k;O++){const G=b[O],K=G.shadow;if(K===void 0){Ke("WebGLShadowMap:",G,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ie=K.getFrameExtents();s.multiply(ie),r.copy(K.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/ie.x),s.x=r.x*ie.x,K.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/ie.y),s.y=r.y*ie.y,K.mapSize.y=r.y));const q=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=q,K.map===null||I===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Rr){if(G.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Zn(s.x,s.y,{format:ws,type:Ti,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),K.map.texture.name=G.name+".shadowMap",K.map.depthTexture=new ir(s.x,s.y,yi),K.map.depthTexture.name=G.name+".shadowMapDepth",K.map.depthTexture.format=Hi,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=zt,K.map.depthTexture.magFilter=zt}else G.isPointLight?(K.map=new yd(s.x),K.map.depthTexture=new d2(s.x,Ai)):(K.map=new Zn(s.x,s.y),K.map.depthTexture=new ir(s.x,s.y,Ai)),K.map.depthTexture.name=G.name+".shadowMap",K.map.depthTexture.format=Hi,this.type===Ta?(K.map.depthTexture.compareFunction=q?Tc:Ac,K.map.depthTexture.minFilter=Yt,K.map.depthTexture.magFilter=Yt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=zt,K.map.depthTexture.magFilter=zt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);const se=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();G.isPointLight!==!0&&K.updateMatrices(G,_);for(let F=0;F<se;F++){const ee=K.getCamera(F);if(G.isPointLight){const ae=K.camera,ue=K.matrix,ve=G.distance||ae.far;ve!==ae.far&&(ae.far=ve,ae.updateProjectionMatrix()),Sr.setFromMatrixPosition(G.matrixWorld),ae.position.copy(Sr),Zo.copy(ae.position),Zo.add(sb[F]),ae.up.copy(rb[F]),ae.lookAt(Zo),ae.updateMatrixWorld(),ue.makeTranslation(-Sr.x,-Sr.y,-Sr.z),ru.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),K._frustum.setFromProjectionMatrix(ru,ae.coordinateSystem,ae.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,F),n.clear();else{F===0&&(n.setRenderTarget(K.map),n.clear());const ae=K.getViewport(F);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),P.viewport(a)}i=K.getFrustum(F),y(A,_,ee,G,this.type)}K.isPointLightShadow!==!0&&this.type===Rr&&v(K,_),K.needsUpdate=!1}x=this.type,g.needsUpdate=!1,n.setRenderTarget(w,C,R)};function v(b,A){const _=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new Zn(s.x,s.y,{format:ws,type:Ti}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,_,p,M,null)}function S(b,A,_,w){let C=null;const R=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)C=R;else if(C=_.isPointLight===!0?h:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const P=C.uuid,I=A.uuid;let O=c[P];O===void 0&&(O={},c[P]=O);let k=O[I];k===void 0&&(k=C.clone(),O[I]=k,A.addEventListener("dispose",E)),C=k}if(C.visible=A.visible,C.wireframe=A.wireframe,w===Rr?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:d[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const P=n.properties.get(C);P.light=_}return C}function y(b,A,_,w,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Rr)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const I=e.update(b),O=b.material;if(Array.isArray(O)){const k=I.groups;for(let G=0,K=k.length;G<K;G++){const ie=k[G],q=O[ie.materialIndex];if(q&&q.visible){const se=S(b,q,w,C);b.onBeforeShadow(n,b,A,_,I,se,ie),n.renderBufferDirect(_,null,I,se,b,ie),b.onAfterShadow(n,b,A,_,I,se,ie)}}}else if(O.visible){const k=S(b,O,w,C);b.onBeforeShadow(n,b,A,_,I,k,null),n.renderBufferDirect(_,null,I,k,b,null),b.onAfterShadow(n,b,A,_,I,k,null)}}const P=b.children;for(let I=0,O=P.length;I<O;I++)y(P[I],A,_,w,C)}function E(b){b.target.removeEventListener("dispose",E);for(const _ in c){const w=c[_],C=b.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function ob(n,e){function t(){let X=!1;const Ee=new rt;let he=null;const Ae=new rt(0,0,0,0);return{setMask:function(De){he!==De&&!X&&(n.colorMask(De,De,De,De),he=De)},setLocked:function(De){X=De},setClear:function(De,pe,He,ke,Nt){Nt===!0&&(De*=ke,pe*=ke,He*=ke),Ee.set(De,pe,He,ke),Ae.equals(Ee)===!1&&(n.clearColor(De,pe,He,ke),Ae.copy(Ee))},reset:function(){X=!1,he=null,Ae.set(-1,0,0,0)}}}function i(){let X=!1,Ee=!1,he=null,Ae=null,De=null;return{setReversed:function(pe){if(Ee!==pe){const He=e.get("EXT_clip_control");pe?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Ee=pe;const ke=De;De=null,this.setClear(ke)}},getReversed:function(){return Ee},setTest:function(pe){pe?z(n.DEPTH_TEST):N(n.DEPTH_TEST)},setMask:function(pe){he!==pe&&!X&&(n.depthMask(pe),he=pe)},setFunc:function(pe){if(Ee&&(pe=H1[pe]),Ae!==pe){switch(pe){case pl:n.depthFunc(n.NEVER);break;case ml:n.depthFunc(n.ALWAYS);break;case gl:n.depthFunc(n.LESS);break;case Dr:n.depthFunc(n.LEQUAL);break;case xl:n.depthFunc(n.EQUAL);break;case Ml:n.depthFunc(n.GEQUAL);break;case Ua:n.depthFunc(n.GREATER);break;case vl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ae=pe}},setLocked:function(pe){X=pe},setClear:function(pe){De!==pe&&(De=pe,Ee&&(pe=1-pe),n.clearDepth(pe))},reset:function(){X=!1,he=null,Ae=null,De=null,Ee=!1}}}function s(){let X=!1,Ee=null,he=null,Ae=null,De=null,pe=null,He=null,ke=null,Nt=null;return{setTest:function(vt){X||(vt?z(n.STENCIL_TEST):N(n.STENCIL_TEST))},setMask:function(vt){Ee!==vt&&!X&&(n.stencilMask(vt),Ee=vt)},setFunc:function(vt,Qn,ui){(he!==vt||Ae!==Qn||De!==ui)&&(n.stencilFunc(vt,Qn,ui),he=vt,Ae=Qn,De=ui)},setOp:function(vt,Qn,ui){(pe!==vt||He!==Qn||ke!==ui)&&(n.stencilOp(vt,Qn,ui),pe=vt,He=Qn,ke=ui)},setLocked:function(vt){X=vt},setClear:function(vt){Nt!==vt&&(n.clearStencil(vt),Nt=vt)},reset:function(){X=!1,Ee=null,he=null,Ae=null,De=null,pe=null,He=null,ke=null,Nt=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,c=new WeakMap;let f={},d={},u={},p=new WeakMap,m=[],M=null,g=!1,x=null,v=null,S=null,y=null,E=null,b=null,A=null,_=new it(0,0,0),w=0,C=!1,R=null,P=null,I=null,O=null,k=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ie=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=ie>=2);let se=null,F={};const ee=n.getParameter(n.SCISSOR_BOX),ae=n.getParameter(n.VIEWPORT),ue=new rt().fromArray(ee),ve=new rt().fromArray(ae);function Se(X,Ee,he,Ae){const De=new Uint8Array(4),pe=n.createTexture();n.bindTexture(X,pe),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let He=0;He<he;He++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,Ae,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Ee+He,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return pe}const B={};B[n.TEXTURE_2D]=Se(n.TEXTURE_2D,n.TEXTURE_2D,1),B[n.TEXTURE_CUBE_MAP]=Se(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[n.TEXTURE_2D_ARRAY]=Se(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),B[n.TEXTURE_3D]=Se(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),z(n.DEPTH_TEST),a.setFunc(Dr),ye(!1),We(ah),z(n.CULL_FACE),xe(wi);function z(X){f[X]!==!0&&(n.enable(X),f[X]=!0)}function N(X){f[X]!==!1&&(n.disable(X),f[X]=!1)}function Z(X,Ee){return u[X]!==Ee?(n.bindFramebuffer(X,Ee),u[X]=Ee,X===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Ee),X===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function j(X,Ee){let he=m,Ae=!1;if(X){he=p.get(Ee),he===void 0&&(he=[],p.set(Ee,he));const De=X.textures;if(he.length!==De.length||he[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,He=De.length;pe<He;pe++)he[pe]=n.COLOR_ATTACHMENT0+pe;he.length=De.length,Ae=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Ae=!0);Ae&&n.drawBuffers(he)}function ce(X){return M!==X?(n.useProgram(X),M=X,!0):!1}const oe={[Vs]:n.FUNC_ADD,[h1]:n.FUNC_SUBTRACT,[u1]:n.FUNC_REVERSE_SUBTRACT};oe[d1]=n.MIN,oe[f1]=n.MAX;const fe={[gc]:n.ZERO,[p1]:n.ONE,[xc]:n.SRC_COLOR,[Mc]:n.SRC_ALPHA,[_1]:n.SRC_ALPHA_SATURATE,[M1]:n.DST_COLOR,[g1]:n.DST_ALPHA,[m1]:n.ONE_MINUS_SRC_COLOR,[vc]:n.ONE_MINUS_SRC_ALPHA,[v1]:n.ONE_MINUS_DST_COLOR,[x1]:n.ONE_MINUS_DST_ALPHA,[b1]:n.CONSTANT_COLOR,[y1]:n.ONE_MINUS_CONSTANT_COLOR,[S1]:n.CONSTANT_ALPHA,[w1]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(X,Ee,he,Ae,De,pe,He,ke,Nt,vt){if(X===wi){g===!0&&(N(n.BLEND),g=!1);return}if(g===!1&&(z(n.BLEND),g=!0),X!==io){if(X!==x||vt!==C){if((v!==Vs||E!==Vs)&&(n.blendEquation(n.FUNC_ADD),v=Vs,E=Vs),vt)switch(X){case Zs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ys:n.blendFunc(n.ONE,n.ONE);break;case oh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case lh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:mt("WebGLState: Invalid blending: ",X);break}else switch(X){case Zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ys:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case oh:mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lh:mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:mt("WebGLState: Invalid blending: ",X);break}S=null,y=null,b=null,A=null,_.set(0,0,0),w=0,x=X,C=vt}return}De=De||Ee,pe=pe||he,He=He||Ae,(Ee!==v||De!==E)&&(n.blendEquationSeparate(oe[Ee],oe[De]),v=Ee,E=De),(he!==S||Ae!==y||pe!==b||He!==A)&&(n.blendFuncSeparate(fe[he],fe[Ae],fe[pe],fe[He]),S=he,y=Ae,b=pe,A=He),(ke.equals(_)===!1||Nt!==w)&&(n.blendColor(ke.r,ke.g,ke.b,Nt),_.copy(ke),w=Nt),x=X,C=!1}function Me(X,Ee){X.side===vi?N(n.CULL_FACE):z(n.CULL_FACE);let he=X.side===In;Ee&&(he=!he),ye(he),X.blending===Zs&&X.transparent===!1?xe(wi):xe(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ae=X.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),ht(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):N(n.SAMPLE_ALPHA_TO_COVERAGE)}function ye(X){R!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),R=X)}function We(X){X!==o1?(z(n.CULL_FACE),X!==P&&(X===ah?n.cullFace(n.BACK):X===l1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):N(n.CULL_FACE),P=X}function at(X){X!==I&&(K&&n.lineWidth(X),I=X)}function ht(X,Ee,he){X?(z(n.POLYGON_OFFSET_FILL),(O!==Ee||k!==he)&&(O=Ee,k=he,a.getReversed()&&(Ee=-Ee),n.polygonOffset(Ee,he))):N(n.POLYGON_OFFSET_FILL)}function Tt(X){X?z(n.SCISSOR_TEST):N(n.SCISSOR_TEST)}function Dt(X){X===void 0&&(X=n.TEXTURE0+G-1),se!==X&&(n.activeTexture(X),se=X)}function Y(X,Ee,he){he===void 0&&(se===null?he=n.TEXTURE0+G-1:he=se);let Ae=F[he];Ae===void 0&&(Ae={type:void 0,texture:void 0},F[he]=Ae),(Ae.type!==X||Ae.texture!==Ee)&&(se!==he&&(n.activeTexture(he),se=he),n.bindTexture(X,Ee||B[X]),Ae.type=X,Ae.texture=Ee)}function et(){const X=F[se];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Xe(){try{n.compressedTexImage2D(...arguments)}catch(X){mt("WebGLState:",X)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(X){mt("WebGLState:",X)}}function T(){try{n.texSubImage2D(...arguments)}catch(X){mt("WebGLState:",X)}}function H(){try{n.texSubImage3D(...arguments)}catch(X){mt("WebGLState:",X)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(X){mt("WebGLState:",X)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(X){mt("WebGLState:",X)}}function ge(){try{n.texStorage2D(...arguments)}catch(X){mt("WebGLState:",X)}}function _e(){try{n.texStorage3D(...arguments)}catch(X){mt("WebGLState:",X)}}function re(){try{n.texImage2D(...arguments)}catch(X){mt("WebGLState:",X)}}function le(){try{n.texImage3D(...arguments)}catch(X){mt("WebGLState:",X)}}function be(X){return d[X]!==void 0?d[X]:n.getParameter(X)}function Ue(X,Ee){d[X]!==Ee&&(n.pixelStorei(X,Ee),d[X]=Ee)}function Te(X){ue.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),ue.copy(X))}function we(X){ve.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),ve.copy(X))}function ze(X,Ee){let he=c.get(Ee);he===void 0&&(he=new WeakMap,c.set(Ee,he));let Ae=he.get(X);Ae===void 0&&(Ae=n.getUniformBlockIndex(Ee,X.name),he.set(X,Ae))}function Ye(X,Ee){const Ae=c.get(Ee).get(X);h.get(Ee)!==Ae&&(n.uniformBlockBinding(Ee,Ae,X.__bindingPointIndex),h.set(Ee,Ae))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),f={},d={},se=null,F={},u={},p=new WeakMap,m=[],M=null,g=!1,x=null,v=null,S=null,y=null,E=null,b=null,A=null,_=new it(0,0,0),w=0,C=!1,R=null,P=null,I=null,O=null,k=null,ue.set(0,0,n.canvas.width,n.canvas.height),ve.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:z,disable:N,bindFramebuffer:Z,drawBuffers:j,useProgram:ce,setBlending:xe,setMaterial:Me,setFlipSided:ye,setCullFace:We,setLineWidth:at,setPolygonOffset:ht,setScissorTest:Tt,activeTexture:Dt,bindTexture:Y,unbindTexture:et,compressedTexImage2D:Xe,compressedTexImage3D:U,texImage2D:re,texImage3D:le,pixelStorei:Ue,getParameter:be,updateUBOMapping:ze,uniformBlockBinding:Ye,texStorage2D:ge,texStorage3D:_e,texSubImage2D:T,texSubImage3D:H,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:Te,viewport:we,reset:Je}}function lb(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,f=new WeakMap,d=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(U,T){return m?new OffscreenCanvas(U,T):Wa("canvas")}function g(U,T,H){let $=1;const te=Xe(U);if((te.width>H||te.height>H)&&($=H/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ge=Math.floor($*te.width),_e=Math.floor($*te.height);u===void 0&&(u=M(ge,_e));const re=T?M(ge,_e):u;return re.width=ge,re.height=_e,re.getContext("2d").drawImage(U,0,0,ge,_e),Ke("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ge+"x"+_e+")."),re}else return"data"in U&&Ke("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),U;return U}function x(U){return U.generateMipmaps}function v(U){n.generateMipmap(U)}function S(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(U,T,H,$,te,ge=!1){if(U!==null){if(n[U]!==void 0)return n[U];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let _e;$&&(_e=e.get("EXT_texture_norm16"),_e||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=T;if(T===n.RED&&(H===n.FLOAT&&(re=n.R32F),H===n.HALF_FLOAT&&(re=n.R16F),H===n.UNSIGNED_BYTE&&(re=n.R8),H===n.UNSIGNED_SHORT&&_e&&(re=_e.R16_EXT),H===n.SHORT&&_e&&(re=_e.R16_SNORM_EXT)),T===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(re=n.R8UI),H===n.UNSIGNED_SHORT&&(re=n.R16UI),H===n.UNSIGNED_INT&&(re=n.R32UI),H===n.BYTE&&(re=n.R8I),H===n.SHORT&&(re=n.R16I),H===n.INT&&(re=n.R32I)),T===n.RG&&(H===n.FLOAT&&(re=n.RG32F),H===n.HALF_FLOAT&&(re=n.RG16F),H===n.UNSIGNED_BYTE&&(re=n.RG8),H===n.UNSIGNED_SHORT&&_e&&(re=_e.RG16_EXT),H===n.SHORT&&_e&&(re=_e.RG16_SNORM_EXT)),T===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(re=n.RG8UI),H===n.UNSIGNED_SHORT&&(re=n.RG16UI),H===n.UNSIGNED_INT&&(re=n.RG32UI),H===n.BYTE&&(re=n.RG8I),H===n.SHORT&&(re=n.RG16I),H===n.INT&&(re=n.RG32I)),T===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(re=n.RGB8UI),H===n.UNSIGNED_SHORT&&(re=n.RGB16UI),H===n.UNSIGNED_INT&&(re=n.RGB32UI),H===n.BYTE&&(re=n.RGB8I),H===n.SHORT&&(re=n.RGB16I),H===n.INT&&(re=n.RGB32I)),T===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(re=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(re=n.RGBA16UI),H===n.UNSIGNED_INT&&(re=n.RGBA32UI),H===n.BYTE&&(re=n.RGBA8I),H===n.SHORT&&(re=n.RGBA16I),H===n.INT&&(re=n.RGBA32I)),T===n.RGB&&(H===n.UNSIGNED_SHORT&&_e&&(re=_e.RGB16_EXT),H===n.SHORT&&_e&&(re=_e.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(re=n.R11F_G11F_B10F)),T===n.RGBA){const le=ge?Ha:lt.getTransfer(te);H===n.FLOAT&&(re=n.RGBA32F),H===n.HALF_FLOAT&&(re=n.RGBA16F),H===n.UNSIGNED_BYTE&&(re=le===Et?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&_e&&(re=_e.RGBA16_EXT),H===n.SHORT&&_e&&(re=_e.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function E(U,T){let H;return U?T===null||T===Ai||T===Or?H=n.DEPTH24_STENCIL8:T===yi?H=n.DEPTH32F_STENCIL8:T===Ir&&(H=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ai||T===Or?H=n.DEPTH_COMPONENT24:T===yi?H=n.DEPTH_COMPONENT32F:T===Ir&&(H=n.DEPTH_COMPONENT16),H}function b(U,T){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==zt&&U.minFilter!==Yt?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function A(U){const T=U.target;T.removeEventListener("dispose",A),w(T),T.isVideoTexture&&f.delete(T),T.isHTMLTexture&&d.delete(T)}function _(U){const T=U.target;T.removeEventListener("dispose",_),R(T)}function w(U){const T=i.get(U);if(T.__webglInit===void 0)return;const H=U.source,$=p.get(H);if($){const te=$[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&C(U),Object.keys($).length===0&&p.delete(H)}i.remove(U)}function C(U){const T=i.get(U);n.deleteTexture(T.__webglTexture);const H=U.source,$=p.get(H);delete $[T.__cacheKey],a.memory.textures--}function R(U){const T=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(T.__webglFramebuffer[$]))for(let te=0;te<T.__webglFramebuffer[$].length;te++)n.deleteFramebuffer(T.__webglFramebuffer[$][te]);else n.deleteFramebuffer(T.__webglFramebuffer[$]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[$])}else{if(Array.isArray(T.__webglFramebuffer))for(let $=0;$<T.__webglFramebuffer.length;$++)n.deleteFramebuffer(T.__webglFramebuffer[$]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let $=0;$<T.__webglColorRenderbuffer.length;$++)T.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[$]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=U.textures;for(let $=0,te=H.length;$<te;$++){const ge=i.get(H[$]);ge.__webglTexture&&(n.deleteTexture(ge.__webglTexture),a.memory.textures--),i.remove(H[$])}i.remove(U)}let P=0;function I(){P=0}function O(){return P}function k(U){P=U}function G(){const U=P;return U>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,U}function K(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function ie(U,T){const H=i.get(U);if(U.isVideoTexture&&Y(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&H.__version!==U.version){const $=U.image;if($===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{N(H,U,T);return}}else U.isExternalTexture&&(H.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+T)}function q(U,T){const H=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&H.__version!==U.version){N(H,U,T);return}else U.isExternalTexture&&(H.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+T)}function se(U,T){const H=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&H.__version!==U.version){N(H,U,T);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+T)}function F(U,T){const H=i.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&H.__version!==U.version){Z(H,U,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+T)}const ee={[ka]:n.REPEAT,[Fi]:n.CLAMP_TO_EDGE,[_l]:n.MIRRORED_REPEAT},ae={[zt]:n.NEAREST,[T1]:n.NEAREST_MIPMAP_NEAREST,[Kr]:n.NEAREST_MIPMAP_LINEAR,[Yt]:n.LINEAR,[_o]:n.LINEAR_MIPMAP_NEAREST,[xs]:n.LINEAR_MIPMAP_LINEAR},ue={[P1]:n.NEVER,[F1]:n.ALWAYS,[D1]:n.LESS,[Ac]:n.LEQUAL,[I1]:n.EQUAL,[Tc]:n.GEQUAL,[O1]:n.GREATER,[N1]:n.NOTEQUAL};function ve(U,T){if(T.type===yi&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Yt||T.magFilter===_o||T.magFilter===Kr||T.magFilter===xs||T.minFilter===Yt||T.minFilter===_o||T.minFilter===Kr||T.minFilter===xs)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,ee[T.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,ee[T.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,ee[T.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,ae[T.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,ae[T.minFilter]),T.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ue[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===zt||T.minFilter!==Kr&&T.minFilter!==xs||T.type===yi&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(U,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function Se(U,T){let H=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",A));const $=T.source;let te=p.get($);te===void 0&&(te={},p.set($,te));const ge=K(T);if(ge!==U.__cacheKey){te[ge]===void 0&&(te[ge]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),te[ge].usedTimes++;const _e=te[U.__cacheKey];_e!==void 0&&(te[U.__cacheKey].usedTimes--,_e.usedTimes===0&&C(T)),U.__cacheKey=ge,U.__webglTexture=te[ge].texture}return H}function B(U,T,H){return Math.floor(Math.floor(U/H)/T)}function z(U,T,H,$){const ge=U.updateRanges;if(ge.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,H,$,T.data);else{ge.sort((Ue,Te)=>Ue.start-Te.start);let _e=0;for(let Ue=1;Ue<ge.length;Ue++){const Te=ge[_e],we=ge[Ue],ze=Te.start+Te.count,Ye=B(we.start,T.width,4),Je=B(Te.start,T.width,4);we.start<=ze+1&&Ye===Je&&B(we.start+we.count-1,T.width,4)===Ye?Te.count=Math.max(Te.count,we.start+we.count-Te.start):(++_e,ge[_e]=we)}ge.length=_e+1;const re=t.getParameter(n.UNPACK_ROW_LENGTH),le=t.getParameter(n.UNPACK_SKIP_PIXELS),be=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let Ue=0,Te=ge.length;Ue<Te;Ue++){const we=ge[Ue],ze=Math.floor(we.start/4),Ye=Math.ceil(we.count/4),Je=ze%T.width,X=Math.floor(ze/T.width),Ee=Ye,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,Je,X,Ee,he,H,$,T.data)}U.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,le),t.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function N(U,T,H){let $=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&($=n.TEXTURE_3D);const te=Se(U,T),ge=T.source;t.bindTexture($,U.__webglTexture,n.TEXTURE0+H);const _e=i.get(ge);if(ge.version!==_e.__version||te===!0){if(t.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const he=lt.getPrimaries(lt.workingColorSpace),Ae=T.colorSpace===Bn?null:lt.getPrimaries(T.colorSpace),De=T.colorSpace===Bn||he===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment);let le=g(T.image,!1,s.maxTextureSize);le=et(T,le);const be=r.convert(T.format,T.colorSpace),Ue=r.convert(T.type);let Te=y(T.internalFormat,be,Ue,T.normalized,T.colorSpace,T.isVideoTexture);ve($,T);let we;const ze=T.mipmaps,Ye=T.isVideoTexture!==!0,Je=_e.__version===void 0||te===!0,X=ge.dataReady,Ee=b(T,le);if(T.isDepthTexture)Te=E(T.format===Ms,T.type),Je&&(Ye?t.texStorage2D(n.TEXTURE_2D,1,Te,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Te,le.width,le.height,0,be,Ue,null));else if(T.isDataTexture)if(ze.length>0){Ye&&Je&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,ze[0].width,ze[0].height);for(let he=0,Ae=ze.length;he<Ae;he++)we=ze[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,Ue,we.data):t.texImage2D(n.TEXTURE_2D,he,Te,we.width,we.height,0,be,Ue,we.data);T.generateMipmaps=!1}else Ye?(Je&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,le.width,le.height),X&&z(T,le,be,Ue)):t.texImage2D(n.TEXTURE_2D,0,Te,le.width,le.height,0,be,Ue,le.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ye&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Te,ze[0].width,ze[0].height,le.depth);for(let he=0,Ae=ze.length;he<Ae;he++)if(we=ze[he],T.format!==zn)if(be!==null)if(Ye){if(X)if(T.layerUpdates.size>0){const De=Uh(we.width,we.height,T.format,T.type);for(const pe of T.layerUpdates){const He=we.data.subarray(pe*De/we.data.BYTES_PER_ELEMENT,(pe+1)*De/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,pe,we.width,we.height,1,be,He)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,be,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Te,we.width,we.height,le.depth,0,we.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,be,Ue,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Te,we.width,we.height,le.depth,0,be,Ue,we.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Ye&&Je&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,ze[0].width,ze[0].height);for(let he=0,Ae=ze.length;he<Ae;he++)we=ze[he],T.format!==zn?be!==null?Ye?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,we.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Te,we.width,we.height,0,we.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,Ue,we.data):t.texImage2D(n.TEXTURE_2D,he,Te,we.width,we.height,0,be,Ue,we.data)}else if(T.isDataArrayTexture)if(Ye){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Te,le.width,le.height,le.depth),X)if(T.layerUpdates.size>0){const he=Uh(le.width,le.height,T.format,T.type);for(const Ae of T.layerUpdates){const De=le.data.subarray(Ae*he/le.data.BYTES_PER_ELEMENT,(Ae+1)*he/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ae,le.width,le.height,1,be,Ue,De)}T.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,Ue,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Te,le.width,le.height,le.depth,0,be,Ue,le.data);else if(T.isData3DTexture)Ye?(Je&&t.texStorage3D(n.TEXTURE_3D,Ee,Te,le.width,le.height,le.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,Ue,le.data)):t.texImage3D(n.TEXTURE_3D,0,Te,le.width,le.height,le.depth,0,be,Ue,le.data);else if(T.isFramebufferTexture){if(Je)if(Ye)t.texStorage2D(n.TEXTURE_2D,Ee,Te,le.width,le.height);else{let he=le.width,Ae=le.height;for(let De=0;De<Ee;De++)t.texImage2D(n.TEXTURE_2D,De,Te,he,Ae,0,be,Ue,null),he>>=1,Ae>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),le.parentNode!==he){he.appendChild(le),d.add(T),he.onpaint=Ae=>{const De=Ae.changedElements;for(const pe of d)De.includes(pe.image)&&(pe.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,le);else{const De=n.RGBA,pe=n.RGBA,He=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,pe,He,le)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ze.length>0){if(Ye&&Je){const he=Xe(ze[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Te,he.width,he.height)}for(let he=0,Ae=ze.length;he<Ae;he++)we=ze[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,be,Ue,we):t.texImage2D(n.TEXTURE_2D,he,Te,be,Ue,we);T.generateMipmaps=!1}else if(Ye){if(Je){const he=Xe(le);t.texStorage2D(n.TEXTURE_2D,Ee,Te,he.width,he.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,Ue,le)}else t.texImage2D(n.TEXTURE_2D,0,Te,be,Ue,le);x(T)&&v($),_e.__version=ge.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function Z(U,T,H){if(T.image.length!==6)return;const $=Se(U,T),te=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+H);const ge=i.get(te);if(te.version!==ge.__version||$===!0){t.activeTexture(n.TEXTURE0+H);const _e=lt.getPrimaries(lt.workingColorSpace),re=T.colorSpace===Bn?null:lt.getPrimaries(T.colorSpace),le=T.colorSpace===Bn||_e===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const be=T.isCompressedTexture||T.image[0].isCompressedTexture,Ue=T.image[0]&&T.image[0].isDataTexture,Te=[];for(let pe=0;pe<6;pe++)!be&&!Ue?Te[pe]=g(T.image[pe],!0,s.maxCubemapSize):Te[pe]=Ue?T.image[pe].image:T.image[pe],Te[pe]=et(T,Te[pe]);const we=Te[0],ze=r.convert(T.format,T.colorSpace),Ye=r.convert(T.type),Je=y(T.internalFormat,ze,Ye,T.normalized,T.colorSpace),X=T.isVideoTexture!==!0,Ee=ge.__version===void 0||$===!0,he=te.dataReady;let Ae=b(T,we);ve(n.TEXTURE_CUBE_MAP,T);let De;if(be){X&&Ee&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,Je,we.width,we.height);for(let pe=0;pe<6;pe++){De=Te[pe].mipmaps;for(let He=0;He<De.length;He++){const ke=De[He];T.format!==zn?ze!==null?X?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,ke.width,ke.height,ze,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,Je,ke.width,ke.height,0,ke.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,0,0,ke.width,ke.height,ze,Ye,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He,Je,ke.width,ke.height,0,ze,Ye,ke.data)}}}else{if(De=T.mipmaps,X&&Ee){De.length>0&&Ae++;const pe=Xe(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,Je,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Ue){X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Te[pe].width,Te[pe].height,ze,Ye,Te[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Je,Te[pe].width,Te[pe].height,0,ze,Ye,Te[pe].data);for(let He=0;He<De.length;He++){const Nt=De[He].image[pe].image;X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,Nt.width,Nt.height,ze,Ye,Nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,Je,Nt.width,Nt.height,0,ze,Ye,Nt.data)}}else{X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ze,Ye,Te[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Je,ze,Ye,Te[pe]);for(let He=0;He<De.length;He++){const ke=De[He];X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,0,0,ze,Ye,ke.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,He+1,Je,ze,Ye,ke.image[pe])}}}x(T)&&v(n.TEXTURE_CUBE_MAP),ge.__version=te.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function j(U,T,H,$,te,ge){const _e=r.convert(H.format,H.colorSpace),re=r.convert(H.type),le=y(H.internalFormat,_e,re,H.normalized,H.colorSpace),be=i.get(T),Ue=i.get(H);if(Ue.__renderTarget=T,!be.__hasExternalTextures){const Te=Math.max(1,T.width>>ge),we=Math.max(1,T.height>>ge);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,ge,le,Te,we,T.depth,0,_e,re,null):t.texImage2D(te,ge,le,Te,we,0,_e,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,U),Dt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,te,Ue.__webglTexture,0,Tt(T)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,te,Ue.__webglTexture,ge),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(U,T,H){if(n.bindRenderbuffer(n.RENDERBUFFER,U),T.depthBuffer){const $=T.depthTexture,te=$&&$.isDepthTexture?$.type:null,ge=E(T.stencilBuffer,te),_e=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Dt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Tt(T),ge,T.width,T.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt(T),ge,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,ge,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,U)}else{const $=T.textures;for(let te=0;te<$.length;te++){const ge=$[te],_e=r.convert(ge.format,ge.colorSpace),re=r.convert(ge.type),le=y(ge.internalFormat,_e,re,ge.normalized,ge.colorSpace);Dt(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Tt(T),le,T.width,T.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt(T),le,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,le,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function oe(U,T,H){const $=T.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(T.depthTexture);if(te.__renderTarget=T,(!te.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,T.depthTexture.addEventListener("dispose",A)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),ve(n.TEXTURE_CUBE_MAP,T.depthTexture);const be=r.convert(T.depthTexture.format),Ue=r.convert(T.depthTexture.type);let Te;T.depthTexture.format===Hi?Te=n.DEPTH_COMPONENT24:T.depthTexture.format===Ms&&(Te=n.DEPTH24_STENCIL8);for(let we=0;we<6;we++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Te,T.width,T.height,0,be,Ue,null)}}else ie(T.depthTexture,0);const ge=te.__webglTexture,_e=Tt(T),re=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,le=T.depthTexture.format===Ms?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(T.depthTexture.format===Hi)Dt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,ge,0,_e):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,ge,0);else if(T.depthTexture.format===Ms)Dt(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,ge,0,_e):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,ge,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function fe(U){const T=i.get(U),H=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const $=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),$){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=$}if(U.depthTexture&&!T.__autoAllocateDepthBuffer)if(H)for(let $=0;$<6;$++)oe(T.__webglFramebuffer[$],U,$);else{const $=U.texture.mipmaps;$&&$.length>0?oe(T.__webglFramebuffer[0],U,0):oe(T.__webglFramebuffer,U,0)}else if(H){T.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[$]),T.__webglDepthbuffer[$]===void 0)T.__webglDepthbuffer[$]=n.createRenderbuffer(),ce(T.__webglDepthbuffer[$],U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=T.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,ge),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,ge)}}else{const $=U.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),ce(T.__webglDepthbuffer,U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ge),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,ge)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function xe(U,T,H){const $=i.get(U);T!==void 0&&j($.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&fe(U)}function Me(U){const T=U.texture,H=i.get(U),$=i.get(T);U.addEventListener("dispose",_);const te=U.textures,ge=U.isWebGLCubeRenderTarget===!0,_e=te.length>1;if(_e||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=T.version,a.memory.textures++),ge){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let le=0;le<T.mipmaps.length;le++)H.__webglFramebuffer[re][le]=n.createFramebuffer()}else H.__webglFramebuffer[re]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<T.mipmaps.length;re++)H.__webglFramebuffer[re]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(_e)for(let re=0,le=te.length;re<le;re++){const be=i.get(te[re]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),a.memory.textures++)}if(U.samples>0&&Dt(U)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<te.length;re++){const le=te[re];H.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const be=r.convert(le.format,le.colorSpace),Ue=r.convert(le.type),Te=y(le.internalFormat,be,Ue,le.normalized,le.colorSpace,U.isXRRenderTarget===!0),we=Tt(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Te,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,H.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(H.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ge){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ve(n.TEXTURE_CUBE_MAP,T);for(let re=0;re<6;re++)if(T.mipmaps&&T.mipmaps.length>0)for(let le=0;le<T.mipmaps.length;le++)j(H.__webglFramebuffer[re][le],U,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,le);else j(H.__webglFramebuffer[re],U,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);x(T)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let re=0,le=te.length;re<le;re++){const be=te[re],Ue=i.get(be);let Te=n.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Te=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Te,Ue.__webglTexture),ve(Te,be),j(H.__webglFramebuffer,U,be,n.COLOR_ATTACHMENT0+re,Te,0),x(be)&&v(Te)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(re=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),ve(re,T),T.mipmaps&&T.mipmaps.length>0)for(let le=0;le<T.mipmaps.length;le++)j(H.__webglFramebuffer[le],U,T,n.COLOR_ATTACHMENT0,re,le);else j(H.__webglFramebuffer,U,T,n.COLOR_ATTACHMENT0,re,0);x(T)&&v(re),t.unbindTexture()}U.depthBuffer&&fe(U)}function ye(U){const T=U.textures;for(let H=0,$=T.length;H<$;H++){const te=T[H];if(x(te)){const ge=S(U),_e=i.get(te).__webglTexture;t.bindTexture(ge,_e),v(ge),t.unbindTexture()}}}const We=[],at=[];function ht(U){if(U.samples>0){if(Dt(U)===!1){const T=U.textures,H=U.width,$=U.height;let te=n.COLOR_BUFFER_BIT;const ge=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(U),re=T.length>1;if(re)for(let be=0;be<T.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const le=U.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let be=0;be<T.length;be++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[be]);const Ue=i.get(T[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ue,0)}n.blitFramebuffer(0,0,H,$,0,0,H,$,te,n.NEAREST),h===!0&&(We.length=0,at.length=0,We.push(n.COLOR_ATTACHMENT0+be),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&(We.push(ge),at.push(ge),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,at)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let be=0;be<T.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,_e.__webglColorRenderbuffer[be]);const Ue=i.get(T[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,Ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&h){const T=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function Tt(U){return Math.min(s.maxSamples,U.samples)}function Dt(U){const T=i.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Y(U){const T=a.render.frame;f.get(U)!==T&&(f.set(U,T),U.update())}function et(U,T){const H=U.colorSpace,$=U.format,te=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||H!==Nr&&H!==Bn&&(lt.getTransfer(H)===Et?($!==zn||te!==kn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):mt("WebGLTextures: Unsupported texture color space:",H)),T}function Xe(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=I,this.getTextureUnits=O,this.setTextureUnits=k,this.setTexture2D=ie,this.setTexture2DArray=q,this.setTexture3D=se,this.setTextureCube=F,this.rebindTextures=xe,this.setupRenderTarget=Me,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=j,this.useMultisampledRTT=Dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cb(n,e){function t(i,s=Bn){let r;const a=lt.getTransfer(s);if(i===kn)return n.UNSIGNED_BYTE;if(i===bc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===nd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===id)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ed)return n.BYTE;if(i===td)return n.SHORT;if(i===Ir)return n.UNSIGNED_SHORT;if(i===_c)return n.INT;if(i===Ai)return n.UNSIGNED_INT;if(i===yi)return n.FLOAT;if(i===Ti)return n.HALF_FLOAT;if(i===sd)return n.ALPHA;if(i===rd)return n.RGB;if(i===zn)return n.RGBA;if(i===Hi)return n.DEPTH_COMPONENT;if(i===Ms)return n.DEPTH_STENCIL;if(i===ad)return n.RED;if(i===Sc)return n.RED_INTEGER;if(i===ws)return n.RG;if(i===wc)return n.RG_INTEGER;if(i===Ec)return n.RGBA_INTEGER;if(i===Ra||i===Ca||i===La||i===Pa)if(a===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bl||i===yl||i===Sl||i===wl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===bl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===yl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===El||i===Al||i===Tl||i===Rl||i===Cl||i===Ba||i===Ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===El||i===Al)return a===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Tl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Rl)return r.COMPRESSED_R11_EAC;if(i===Cl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ba)return r.COMPRESSED_RG11_EAC;if(i===Ll)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Pl||i===Dl||i===Il||i===Ol||i===Nl||i===Fl||i===Ul||i===kl||i===Bl||i===zl||i===Hl||i===Gl||i===Wl||i===Vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Pl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Il)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ol)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ul)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===kl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vl)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yl||i===Xl||i===Kl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Yl)return a===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ql||i===$l||i===za||i===Zl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ql)return r.COMPRESSED_RED_RGTC1_EXT;if(i===$l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===za)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Or?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const hb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ub=`
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

}`;class db{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new gd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Mt({vertexShader:hb,fragmentShader:ub,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fb extends As{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,c=null,f=null,d=null,u=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",g=new db,x={},v=t.getContextAttributes();let S=null,y=null;const E=[],b=[],A=new $e;let _=null,w=null;const C=new Un;C.viewport=new rt;const R=new Un;R.viewport=new rt;const P=[C,R],I=new b2;let O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let z=E[B];return z===void 0&&(z=new Co,E[B]=z),z.getTargetRaySpace()},this.getControllerGrip=function(B){let z=E[B];return z===void 0&&(z=new Co,E[B]=z),z.getGripSpace()},this.getHand=function(B){let z=E[B];return z===void 0&&(z=new Co,E[B]=z),z.getHandSpace()};function G(B){const z=b.indexOf(B.inputSource);if(z===-1)return;const N=E[z];N!==void 0&&(N.update(B.inputSource,B.frame,c||a),N.dispatchEvent({type:B.type,data:B.inputSource}))}function K(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",ie);for(let B=0;B<E.length;B++){const z=b[B];z!==null&&(b[B]=null,E[B].disconnect(z))}O=null,k=null,g.reset();for(const B in x)delete x[B];if(e.setRenderTarget(S),p=null,u=null,d=null,s=null,y=null,Se.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),w!==null){const B=w.camera;B.fov=w.fov,B.zoom=w.zoom,B.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",K),s.addEventListener("inputsourceschange",ie),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let N=null,Z=null,j=null;v.depth&&(j=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,N=v.stencil?Ms:Hi,Z=v.stencil?Or:Ai);const ce={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Zn(u.textureWidth,u.textureHeight,{format:zn,type:kn,depthTexture:new ir(u.textureWidth,u.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,N),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const N={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,N),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Zn(p.framebufferWidth,p.framebufferHeight,{format:zn,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(o),Se.setContext(s),Se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ie(B){for(let z=0;z<B.removed.length;z++){const N=B.removed[z],Z=b.indexOf(N);Z>=0&&(b[Z]=null,E[Z].disconnect(N))}for(let z=0;z<B.added.length;z++){const N=B.added[z];let Z=b.indexOf(N);if(Z===-1){for(let ce=0;ce<E.length;ce++)if(ce>=b.length){b.push(N),Z=ce;break}else if(b[ce]===null){b[ce]=N,Z=ce;break}if(Z===-1)break}const j=E[Z];j&&j.connect(N)}}const q=new V,se=new V;function F(B,z,N){q.setFromMatrixPosition(z.matrixWorld),se.setFromMatrixPosition(N.matrixWorld);const Z=q.distanceTo(se),j=z.projectionMatrix.elements,ce=N.projectionMatrix.elements,oe=j[14]/(j[10]-1),fe=j[14]/(j[10]+1),xe=(j[9]+1)/j[5],Me=(j[9]-1)/j[5],ye=(j[8]-1)/j[0],We=(ce[8]+1)/ce[0],at=oe*ye,ht=oe*We,Tt=Z/(-ye+We),Dt=Tt*-ye;if(z.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(Dt),B.translateZ(Tt),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),j[10]===-1)B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const Y=oe+Tt,et=fe+Tt,Xe=at-Dt,U=ht+(Z-Dt),T=xe*fe/et*Y,H=Me*fe/et*Y;B.projectionMatrix.makePerspective(Xe,U,T,H,Y,et),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function ee(B,z){z===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(z.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let z=B.near,N=B.far;g.texture!==null&&(g.depthNear>0&&(z=g.depthNear),g.depthFar>0&&(N=g.depthFar)),I.near=R.near=C.near=z,I.far=R.far=C.far=N,(O!==I.near||k!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),O=I.near,k=I.far),I.layers.mask=B.layers.mask|6,C.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;const Z=B.parent,j=I.cameras;ee(I,Z);for(let ce=0;ce<j.length;ce++)ee(j[ce],Z);j.length===2?F(I,C,R):I.projectionMatrix.copy(C.projectionMatrix),w===null&&B.isPerspectiveCamera&&(w={camera:B,fov:B.fov,zoom:B.zoom}),ae(B,I,Z)};function ae(B,z,N){N===null?B.matrix.copy(z.matrixWorld):(B.matrix.copy(N.matrixWorld),B.matrix.invert(),B.matrix.multiply(z.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Jl*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(B){h=B,u!==null&&(u.fixedFoveation=B),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=B)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(B){return x[B]};let ue=null;function ve(B,z){if(f=z.getViewerPose(c||a),m=z,f!==null){const N=f.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Z=!1;N.length!==I.cameras.length&&(I.cameras.length=0,Z=!0);for(let fe=0;fe<N.length;fe++){const xe=N[fe];let Me=null;if(p!==null)Me=p.getViewport(xe);else{const We=d.getViewSubImage(u,xe);Me=We.viewport,fe===0&&(e.setRenderTargetTextures(y,We.colorTexture,We.depthStencilTexture),e.setRenderTarget(y))}let ye=P[fe];ye===void 0&&(ye=new Un,ye.layers.enable(fe),ye.viewport=new rt,P[fe]=ye),ye.matrix.fromArray(xe.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(xe.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Me.x,Me.y,Me.width,Me.height),fe===0&&(I.matrix.copy(ye.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Z===!0&&I.cameras.push(ye)}const j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const fe=d.getDepthInformation(N[0]);fe&&fe.isValid&&fe.texture&&g.init(fe,s.renderState)}if(j&&j.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let fe=0;fe<N.length;fe++){const xe=N[fe].camera;if(xe){let Me=x[xe];Me||(Me=new gd,x[xe]=Me);const ye=d.getCameraImage(xe);Me.sourceTexture=ye}}}}for(let N=0;N<E.length;N++){const Z=b[N],j=E[N];Z!==null&&j!==void 0&&j.update(Z,z,c||a)}ue&&ue(B,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),m=null}const Se=new _d;Se.setAnimationLoop(ve),this.setAnimationLoop=function(B){ue=B},this.dispose=function(){}}}const pb=new Ht,Td=new Ze;Td.set(-1,0,0,0,1,0,0,0,1);function mb(n,e){function t(g,x){g.matrixAutoUpdate===!0&&g.updateMatrix(),x.value.copy(g.matrix)}function i(g,x){x.color.getRGB(g.fogColor.value,xd(n)),x.isFog?(g.fogNear.value=x.near,g.fogFar.value=x.far):x.isFogExp2&&(g.fogDensity.value=x.density)}function s(g,x,v,S,y){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?r(g,x):x.isMeshLambertMaterial?(r(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(r(g,x),d(g,x)):x.isMeshPhongMaterial?(r(g,x),f(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(r(g,x),u(g,x),x.isMeshPhysicalMaterial&&p(g,x,y)):x.isMeshMatcapMaterial?(r(g,x),m(g,x)):x.isMeshDepthMaterial?r(g,x):x.isMeshDistanceMaterial?(r(g,x),M(g,x)):x.isMeshNormalMaterial?r(g,x):x.isLineBasicMaterial?(a(g,x),x.isLineDashedMaterial&&o(g,x)):x.isPointsMaterial?h(g,x,v,S):x.isSpriteMaterial?c(g,x):x.isShadowMaterial?(g.color.value.copy(x.color),g.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function r(g,x){g.opacity.value=x.opacity,x.color&&g.diffuse.value.copy(x.color),x.emissive&&g.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.bumpMap&&(g.bumpMap.value=x.bumpMap,t(x.bumpMap,g.bumpMapTransform),g.bumpScale.value=x.bumpScale,x.side===In&&(g.bumpScale.value*=-1)),x.normalMap&&(g.normalMap.value=x.normalMap,t(x.normalMap,g.normalMapTransform),g.normalScale.value.copy(x.normalScale),x.side===In&&g.normalScale.value.negate()),x.displacementMap&&(g.displacementMap.value=x.displacementMap,t(x.displacementMap,g.displacementMapTransform),g.displacementScale.value=x.displacementScale,g.displacementBias.value=x.displacementBias),x.emissiveMap&&(g.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,g.emissiveMapTransform)),x.specularMap&&(g.specularMap.value=x.specularMap,t(x.specularMap,g.specularMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest);const v=e.get(x),S=v.envMap,y=v.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(pb.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Td),g.reflectivity.value=x.reflectivity,g.ior.value=x.ior,g.refractionRatio.value=x.refractionRatio),x.lightMap&&(g.lightMap.value=x.lightMap,g.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,g.lightMapTransform)),x.aoMap&&(g.aoMap.value=x.aoMap,g.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,g.aoMapTransform))}function a(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform))}function o(g,x){g.dashSize.value=x.dashSize,g.totalSize.value=x.dashSize+x.gapSize,g.scale.value=x.scale}function h(g,x,v,S){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.size.value=x.size*v,g.scale.value=S*.5,x.map&&(g.map.value=x.map,t(x.map,g.uvTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function c(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.rotation.value=x.rotation,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function f(g,x){g.specular.value.copy(x.specular),g.shininess.value=Math.max(x.shininess,1e-4)}function d(g,x){x.gradientMap&&(g.gradientMap.value=x.gradientMap)}function u(g,x){g.metalness.value=x.metalness,x.metalnessMap&&(g.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,g.metalnessMapTransform)),g.roughness.value=x.roughness,x.roughnessMap&&(g.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,g.roughnessMapTransform)),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)}function p(g,x,v){g.ior.value=x.ior,x.sheen>0&&(g.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),g.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(g.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,g.sheenColorMapTransform)),x.sheenRoughnessMap&&(g.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,g.sheenRoughnessMapTransform))),x.clearcoat>0&&(g.clearcoat.value=x.clearcoat,g.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(g.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,g.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(g.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===In&&g.clearcoatNormalScale.value.negate())),x.dispersion>0&&(g.dispersion.value=x.dispersion),x.retroreflectivity>0&&(g.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(g.iridescence.value=x.iridescence,g.iridescenceIOR.value=x.iridescenceIOR,g.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(g.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,g.iridescenceMapTransform)),x.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),x.transmission>0&&(g.transmission.value=x.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),x.transmissionMap&&(g.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,g.transmissionMapTransform)),g.thickness.value=x.thickness,x.thicknessMap&&(g.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=x.attenuationDistance,g.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(g.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(g.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=x.specularIntensity,g.specularColor.value.copy(x.specularColor),x.specularColorMap&&(g.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,g.specularColorMapTransform)),x.specularIntensityMap&&(g.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,x){x.matcap&&(g.matcap.value=x.matcap)}function M(g,x){const v=e.get(x).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function gb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(y,E){const b=E.program;i.uniformBlockBinding(y,b)}function c(y,E){let b=s[y.id];b===void 0&&(g(y),b=f(y),s[y.id]=b,y.addEventListener("dispose",v));const A=E.program;i.updateUBOMapping(y,A);const _=e.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function f(y){const E=d();y.__bindingPointIndex=E;const b=n.createBuffer(),A=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const E=s[y.id],b=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,w=b.length;_<w;_++){const C=b[_];if(Array.isArray(C))for(let R=0,P=C.length;R<P;R++)p(C[R],_,R,A);else p(C,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,E,b,A){if(M(y,E,b,A)===!0){const _=y.__offset,w=y.value;if(Array.isArray(w)){let C=0;for(let R=0;R<w.length;R++){const P=w[R],I=x(P);m(P,y.__data,C),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(C+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function m(y,E,b){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,b)}function M(y,E,b,A){const _=y.value,w=E+"_"+b;if(A[w]===void 0)return typeof _=="number"||typeof _=="boolean"?A[w]=_:ArrayBuffer.isView(_)?A[w]=_.slice():A[w]=_.clone(),!0;{const C=A[w];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(y){const E=y.uniforms;let b=0;const A=16;for(let w=0,C=E.length;w<C;w++){const R=Array.isArray(E[w])?E[w]:[E[w]];for(let P=0,I=R.length;P<I;P++){const O=R[P],k=Array.isArray(O.value)?O.value:[O.value];for(let G=0,K=k.length;G<K;G++){const ie=k[G],q=x(ie),se=b%A,F=se%q.boundary,ee=se+F;b+=F,ee!==0&&A-ee<q.storage&&(b+=A-ee),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=q.storage}}}const _=b%A;return _>0&&(b+=A-_),y.__size=b,y.__cache={},this}function x(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",y),E}function v(y){const E=y.target;E.removeEventListener("dispose",v);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function S(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:h,update:c,dispose:S}}const xb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pi=null;function Mb(){return pi===null&&(pi=new Xs(xb,16,16,ws,Ti),pi.name="DFG_LUT",pi.minFilter=Yt,pi.magFilter=Yt,pi.wrapS=Fi,pi.wrapT=Fi,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}class vb{constructor(e={}){const{canvas:t=B1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=kn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=p,g=new Set([Ec,wc,Sc]),x=new Set([kn,Ai,Ir,Or,bc,yc]),v=new Uint32Array(4),S=new Int32Array(4),y=new V;let E=null,b=null;const A=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let R=!1,P=null,I=null,O=null,k=null;this._outputColorSpace=Kn;let G=0,K=0,ie=null,q=-1,se=null;const F=new rt,ee=new rt;let ae=null;const ue=new it(0);let ve=0,Se=t.width,B=t.height,z=1,N=null,Z=null;const j=new rt(0,0,Se,B),ce=new rt(0,0,Se,B);let oe=!1;const fe=new Va;let xe=!1,Me=!1;const ye=new Ht,We=new V,at=new rt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Tt=!1;function Dt(){return ie===null?z:1}let Y=i;function et(D,W){return t.getContext(D,W)}let Xe,U,T,H,$,te,ge,_e,re,le,be,Ue,Te,we,ze,Ye,Je,X,Ee,he,Ae,De,pe;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mc}`),t.addEventListener("webglcontextlost",Nt,!1),t.addEventListener("webglcontextrestored",vt,!1),t.addEventListener("webglcontextcreationerror",Qn,!1),Y===null){const W="webgl2";if(Y=et(W,D),Y===null)throw et(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(D){throw t.removeEventListener("webglcontextlost",Nt,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Qn,!1),mt("WebGLRenderer: "+D.message),D}function He(){Xe=new Mv(Y),Xe.init(),Ae=new cb(Y,Xe),U=new lv(Y,Xe,e,Ae),T=new ob(Y,Xe),U.reversedDepthBuffer&&u&&T.buffers.depth.setReversed(!0),I=Y.createFramebuffer(),O=Y.createFramebuffer(),k=Y.createFramebuffer(),H=new bv(Y),$=new K_,te=new lb(Y,Xe,T,$,U,Ae,H),ge=new xv(C),_e=new S2(Y),De=new av(Y,_e),re=new vv(Y,_e,H,De),le=new Sv(Y,re,_e,De,H),X=new yv(Y,U,te),ze=new cv($),be=new X_(C,ge,Xe,U,De,ze),Ue=new mb(C,$),Te=new $_,we=new tb(Xe),Je=new rv(C,ge,T,le,m,h),Ye=new ab(C,le,U),pe=new gb(Y,H,U,T),Ee=new ov(Y,Xe,H),he=new _v(Y,Xe,H),H.programs=be.programs,C.capabilities=U,C.extensions=Xe,C.properties=$,C.renderLists=Te,C.shadowMap=Ye,C.state=T,C.info=H}M!==kn&&(w=new Ev(M,t.width,t.height,o,s,r));const ke=new fb(C,Y);this.xr=ke,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const D=Xe.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Xe.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(D){D!==void 0&&(z=D,this.setSize(Se,B,!1))},this.getSize=function(D){return D.set(Se,B)},this.setSize=function(D,W,ne=!0){if(ke.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=D,B=W,t.width=Math.floor(D*z),t.height=Math.floor(W*z),ne===!0&&(t.style.width=D+"px",t.style.height=W+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,D,W)},this.getDrawingBufferSize=function(D){return D.set(Se*z,B*z).floor()},this.setDrawingBufferSize=function(D,W,ne){Se=D,B=W,z=ne,t.width=Math.floor(D*ne),t.height=Math.floor(W*ne),this.setViewport(0,0,D,W)},this.setEffects=function(D){if(M===kn){mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let W=0;W<D.length;W++)if(D[W].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(j)},this.setViewport=function(D,W,ne,J){D.isVector4?j.set(D.x,D.y,D.z,D.w):j.set(D,W,ne,J),T.viewport(F.copy(j).multiplyScalar(z).round())},this.getScissor=function(D){return D.copy(ce)},this.setScissor=function(D,W,ne,J){D.isVector4?ce.set(D.x,D.y,D.z,D.w):ce.set(D,W,ne,J),T.scissor(ee.copy(ce).multiplyScalar(z).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(D){T.setScissorTest(oe=D)},this.setOpaqueSort=function(D){N=D},this.setTransparentSort=function(D){Z=D},this.getClearColor=function(D){return D.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(D=!0,W=!0,ne=!0){let J=0;if(D){let Q=!1;if(ie!==null){const Le=ie.texture.format;Q=g.has(Le)}if(Q){const Le=ie.texture.type,Oe=x.has(Le),Ce=Je.getClearColor(),Ne=Je.getClearAlpha(),Be=Ce.r,tt=Ce.g,st=Ce.b;Oe?(v[0]=Be,v[1]=tt,v[2]=st,v[3]=Ne,Y.clearBufferuiv(Y.COLOR,0,v)):(S[0]=Be,S[1]=tt,S[2]=st,S[3]=Ne,Y.clearBufferiv(Y.COLOR,0,S))}else J|=Y.COLOR_BUFFER_BIT}W&&(J|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(J|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&Y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),P=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Nt,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Qn,!1),Je.dispose(),Te.dispose(),we.dispose(),$.dispose(),ge.dispose(),le.dispose(),De.dispose(),pe.dispose(),be.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",kc),ke.removeEventListener("sessionend",Bc),ss.stop()};function Nt(D){D.preventDefault(),dh("WebGLRenderer: Context Lost."),R=!0}function vt(){dh("WebGLRenderer: Context Restored."),R=!1;const D=H.autoReset,W=Ye.enabled,ne=Ye.autoUpdate,J=Ye.needsUpdate,Q=Ye.type;He(),H.autoReset=D,Ye.enabled=W,Ye.autoUpdate=ne,Ye.needsUpdate=J,Ye.type=Q}function Qn(D){mt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ui(D){const W=D.target;W.removeEventListener("dispose",ui),Vd(W)}function Vd(D){Yd(D),$.remove(D)}function Yd(D){const W=$.get(D).programs;W!==void 0&&(W.forEach(function(ne){be.releaseProgram(ne)}),D.isShaderMaterial&&be.releaseShaderCache(D))}this.renderBufferDirect=function(D,W,ne,J,Q,Le){W===null&&(W=ht);const Oe=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Ce=qd(D,W,ne,J,Q);T.setMaterial(J,Oe);let Ne=ne.index,Be=1;if(J.wireframe===!0){if(Ne=re.getWireframeAttribute(ne),Ne===void 0)return;Be=2}const tt=ne.drawRange,st=ne.attributes.position;let Fe=tt.start*Be,_t=(tt.start+tt.count)*Be;Le!==null&&(Fe=Math.max(Fe,Le.start*Be),_t=Math.min(_t,(Le.start+Le.count)*Be)),Ne!==null?(Fe=Math.max(Fe,0),_t=Math.min(_t,Ne.count)):st!=null&&(Fe=Math.max(Fe,0),_t=Math.min(_t,st.count));const Jt=_t-Fe;if(Jt<0||Jt===1/0)return;De.setup(Q,J,Ce,ne,Ne);let Ut,It=Ee;if(Ne!==null&&(Ut=_e.get(Ne),It=he,It.setIndex(Ut)),Q.isMesh)J.wireframe===!0?(T.setLineWidth(J.wireframeLinewidth*Dt()),It.setMode(Y.LINES)):It.setMode(Y.TRIANGLES);else if(Q.isLine){let xn=J.linewidth;xn===void 0&&(xn=1),T.setLineWidth(xn*Dt()),Q.isLineSegments?It.setMode(Y.LINES):Q.isLineLoop?It.setMode(Y.LINE_LOOP):It.setMode(Y.LINE_STRIP)}else Q.isPoints?It.setMode(Y.POINTS):Q.isSprite&&It.setMode(Y.TRIANGLES);if(Q.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))It.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const xn=Q._multiDrawStarts,Ie=Q._multiDrawCounts,En=Q._multiDrawCount,pt=Ne?_e.get(Ne).bytesPerElement:1,Vn=$.get(J).currentProgram.getUniforms();for(let di=0;di<En;di++)Vn.setValue(Y,"_gl_DrawID",di),It.render(xn[di]/pt,Ie[di])}else if(Q.isInstancedMesh)It.renderInstances(Fe,Jt,Q.count);else if(ne.isInstancedBufferGeometry){const xn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ie=Math.min(ne.instanceCount,xn);It.renderInstances(Fe,Jt,Ie)}else It.render(Fe,Jt)};function Uc(D,W,ne,J){P!==null&&D.isNodeMaterial&&P.setObject(J,D),xe===!0&&ze.setState(D,ne,!1),D.transparent===!0&&D.side===vi&&D.forceSinglePass===!1?(D.side=In,D.needsUpdate=!0,Gr(D,W,J),D.side=bs,D.needsUpdate=!0,Gr(D,W,J),D.side=vi):Gr(D,W,J)}this.compile=function(D,W,ne=null){ne===null&&(ne=D),P!==null&&P.renderStart(D,W,ne),b=we.get(ne),b.init(W),_.push(b),ne.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),D!==ne&&D.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),Me=this.localClippingEnabled,xe=ze.init(this.clippingPlanes,Me),xe===!0&&ze.setGlobalState(this.clippingPlanes,W),P!==null&&Ye.render(b.state.shadowsArray,ne,W);const J=new Set;return D.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Le=Q.material;if(Le)if(Array.isArray(Le))for(let Oe=0;Oe<Le.length;Oe++){const Ce=Le[Oe];Uc(Ce,ne,W,Q),J.add(Ce)}else Uc(Le,ne,W,Q),J.add(Le)}),b=_.pop(),P!==null&&P.renderEnd(),J},this.compileAsync=function(D,W,ne=null){const J=this.compile(D,W,ne);return new Promise(Q=>{function Le(){if(J.forEach(function(Oe){const Ne=$.get(Oe).currentProgram;(Ne===void 0||Ne.isReady())&&J.delete(Oe)}),J.size===0){Q(D);return}setTimeout(Le,10)}Xe.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let co=null;function Xd(D){co&&co(D)}function kc(){ss.stop()}function Bc(){ss.start()}const ss=new _d;ss.setAnimationLoop(Xd),typeof self<"u"&&ss.setContext(self),this.setAnimationLoop=function(D){co=D,ke.setAnimationLoop(D),D===null?ss.stop():ss.start()},ke.addEventListener("sessionstart",kc),ke.addEventListener("sessionend",Bc),this.render=function(D,W){if(W!==void 0&&W.isCamera!==!0){mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(D,W);const ne=ke.enabled===!0&&ke.isPresenting===!0,J=w!==null&&(ie===null||ne)&&w.begin(C,ie);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(W),W=ke.getCamera()),D.isScene===!0&&D.onBeforeRender(C,D,W,ie),b=we.get(D,_.length),b.init(W),b.state.textureUnits=te.getTextureUnits(),_.push(b),ye.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),fe.setFromProjectionMatrix(ye,Si,W.reversedDepth),Me=this.localClippingEnabled,xe=ze.init(this.clippingPlanes,Me),E=Te.get(D,A.length),E.init(),A.push(E),ke.enabled===!0&&ke.isPresenting===!0){const Oe=C.xr.getDepthSensingMesh();Oe!==null&&ho(Oe,W,-1/0,C.sortObjects)}ho(D,W,0,C.sortObjects),E.finish(),P!==null&&P.updateLights(b.state.lightsArray),C.sortObjects===!0&&E.sort(N,Z),Tt=ke.enabled===!1||ke.isPresenting===!1||ke.hasDepthSensing()===!1,Tt&&Je.addToRenderList(E,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&ze.beginShadows();const Q=b.state.shadowsArray;if(Ye.render(Q,D,W),xe===!0&&ze.endShadows(),(J&&w.hasRenderPass())===!1){const Oe=E.opaque,Ce=E.transmissive;if(b.setupLights(),W.isArrayCamera){const Ne=W.cameras;if(Ce.length>0)for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be];Hc(Oe,Ce,D,st)}Tt&&Je.render(D);for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be];zc(E,D,st,st.viewport)}}else Ce.length>0&&Hc(Oe,Ce,D,W),Tt&&Je.render(D),zc(E,D,W)}ie!==null&&K===0&&(te.updateMultisampleRenderTarget(ie),te.updateRenderTargetMipmap(ie)),J&&w.end(C),D.isScene===!0&&D.onAfterRender(C,D,W),De.resetDefaultState(),q=-1,se=null,_.pop(),_.length>0?(b=_[_.length-1],te.setTextureUnits(b.state.textureUnits),xe===!0&&ze.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,P!==null&&P.renderEnd()};function ho(D,W,ne,J){if(D.visible===!1)return;if(D.layers.test(W.layers)){if(D.isGroup)ne=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(W);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(fe)){J&&at.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ye);const Oe=le.update(D),Ce=D.material;Ce.visible&&E.push(D,Oe,Ce,ne,at.z,null,W)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(fe))){const Oe=le.update(D),Ce=D.material;if(J&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),at.copy(D.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),at.copy(Oe.boundingSphere.center)),at.applyMatrix4(D.matrixWorld).applyMatrix4(ye)),Array.isArray(Ce)){const Ne=Oe.groups;for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be],Fe=Ce[st.materialIndex];Fe&&Fe.visible&&E.push(D,Oe,Fe,ne,at.z,st,W)}}else Ce.visible&&E.push(D,Oe,Ce,ne,at.z,null,W)}}const Le=D.children;for(let Oe=0,Ce=Le.length;Oe<Ce;Oe++)ho(Le[Oe],W,ne,J)}function zc(D,W,ne,J){const{opaque:Q,transmissive:Le,transparent:Oe}=D;b.setupLightsView(ne),xe===!0&&ze.setGlobalState(C.clippingPlanes,ne),J&&T.viewport(F.copy(J)),Q.length>0&&Hr(Q,W,ne),Le.length>0&&Hr(Le,W,ne),Oe.length>0&&Hr(Oe,W,ne),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Hc(D,W,ne,J){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[J.id]===void 0){const Fe=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[J.id]=new Zn(1,1,{generateMipmaps:!0,type:Fe?Ti:kn,minFilter:xs,samples:Math.max(4,U.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const Le=b.state.transmissionRenderTarget[J.id],Oe=J.viewport||F;Le.setSize(Oe.z*C.transmissionResolutionScale,Oe.w*C.transmissionResolutionScale);const Ce=C.getRenderTarget(),Ne=C.getActiveCubeFace(),Be=C.getActiveMipmapLevel();C.setRenderTarget(Le),C.getClearColor(ue),ve=C.getClearAlpha(),ve<1&&C.setClearColor(16777215,.5),C.clear(),Tt&&Je.render(ne);const tt=C.toneMapping;C.toneMapping=Ei;const st=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),b.setupLightsView(J),xe===!0&&ze.setGlobalState(C.clippingPlanes,J),Hr(D,ne,J),te.updateMultisampleRenderTarget(Le),te.updateRenderTargetMipmap(Le),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let _t=0,Jt=W.length;_t<Jt;_t++){const Ut=W[_t],{object:It,geometry:xn,material:Ie,group:En}=Ut;if(Ie.side===vi&&It.layers.test(J.layers)){const pt=Ie.side;Ie.side=In,Ie.needsUpdate=!0,Gc(It,ne,J,xn,Ie,En),Ie.side=pt,Ie.needsUpdate=!0,Fe=!0}}Fe===!0&&(te.updateMultisampleRenderTarget(Le),te.updateRenderTargetMipmap(Le))}C.setRenderTarget(Ce,Ne,Be),C.setClearColor(ue,ve),st!==void 0&&(J.viewport=st),C.toneMapping=tt}function Hr(D,W,ne){const J=W.isScene===!0?W.overrideMaterial:null;for(let Q=0,Le=D.length;Q<Le;Q++){const Oe=D[Q],{object:Ce,geometry:Ne,group:Be}=Oe;let tt=Oe.material;tt.allowOverride===!0&&J!==null&&(tt=J),Ce.layers.test(ne.layers)&&Gc(Ce,W,ne,Ne,tt,Be)}}function Gc(D,W,ne,J,Q,Le){P!==null&&Q.isNodeMaterial&&P.setObject(D,Q),D.onBeforeRender(C,W,ne,J,Q,Le),D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Q.onBeforeRender(C,W,ne,J,D,Le),Q.transparent===!0&&Q.side===vi&&Q.forceSinglePass===!1?(Q.side=In,Q.needsUpdate=!0,C.renderBufferDirect(ne,W,J,Q,D,Le),Q.side=bs,Q.needsUpdate=!0,C.renderBufferDirect(ne,W,J,Q,D,Le),Q.side=vi):C.renderBufferDirect(ne,W,J,Q,D,Le),D.onAfterRender(C,W,ne,J,Q,Le)}function Gr(D,W,ne){W.isScene!==!0&&(W=ht);const J=$.get(D),Q=b.state.lights,Le=b.state.shadowsArray,Oe=Q.state.version,Ce=be.getParameters(D,Q.state,Le,W,ne,b.state.lightProbeGridArray),Ne=be.getProgramCacheKey(Ce);let Be=J.programs;J.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?W.environment:null,J.fog=W.fog;const tt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;J.envMap=ge.get(D.envMap||J.environment,tt),J.envMapRotation=J.environment!==null&&D.envMap===null?W.environmentRotation:D.envMapRotation,Be===void 0&&(D.addEventListener("dispose",ui),Be=new Map,J.programs=Be);let st=Be.get(Ne);if(st!==void 0){if(J.currentProgram===st&&J.lightsStateVersion===Oe)return Vc(D,Ce),st}else Ce.uniforms=be.getUniforms(D),P!==null&&D.isNodeMaterial&&P.build(D,ne,Ce),D.onBeforeCompile(Ce,C),st=be.acquireProgram(Ce,Ne),Be.set(Ne,st),J.uniforms=Ce.uniforms;const Fe=J.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Fe.clippingPlanes=ze.uniform),Vc(D,Ce),J.needsLights=Zd(D),J.lightsStateVersion=Oe,J.needsLights&&(Fe.ambientLightColor.value=Q.state.ambient,Fe.lightProbe.value=Q.state.probe,Fe.sunLights.value=Q.state.sun,Fe.sunLightShadows.value=Q.state.sunShadow,Fe.directionalLights.value=Q.state.directional,Fe.directionalLightShadows.value=Q.state.directionalShadow,Fe.spotLights.value=Q.state.spot,Fe.spotLightShadows.value=Q.state.spotShadow,Fe.rectAreaLights.value=Q.state.rectArea,Fe.ltc_1.value=Q.state.rectAreaLTC1,Fe.ltc_2.value=Q.state.rectAreaLTC2,Fe.pointLights.value=Q.state.point,Fe.pointLightShadows.value=Q.state.pointShadow,Fe.hemisphereLights.value=Q.state.hemi,Fe.sunShadowMatrix.value=Q.state.sunShadowMatrix,Fe.sunShadowCascade.value=Q.state.sunShadowCascade,Fe.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Fe.spotLightMatrix.value=Q.state.spotLightMatrix,Fe.spotLightMap.value=Q.state.spotLightMap,Fe.pointShadowMatrix.value=Q.state.pointShadowMatrix),J.lightProbeGrid=b.state.lightProbeGridArray.length>0,J.currentProgram=st,J.uniformsList=null,st}function Wc(D){if(D.uniformsList===null){const W=D.currentProgram.getUniforms();D.uniformsList=Da.seqWithValue(W.seq,D.uniforms)}return D.uniformsList}function Vc(D,W){const ne=$.get(D);ne.outputColorSpace=W.outputColorSpace,ne.batching=W.batching,ne.batchingColor=W.batchingColor,ne.instancing=W.instancing,ne.instancingColor=W.instancingColor,ne.instancingMorph=W.instancingMorph,ne.skinning=W.skinning,ne.morphTargets=W.morphTargets,ne.morphNormals=W.morphNormals,ne.morphColors=W.morphColors,ne.morphTargetsCount=W.morphTargetsCount,ne.numClippingPlanes=W.numClippingPlanes,ne.numIntersection=W.numClipIntersection,ne.vertexAlphas=W.vertexAlphas,ne.vertexTangents=W.vertexTangents,ne.toneMapping=W.toneMapping}function Kd(D,W){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;y.setFromMatrixPosition(W.matrixWorld);for(let ne=0,J=D.length;ne<J;ne++){const Q=D[ne];if(Q.texture!==null&&Q.boundingBox.containsPoint(y))return Q}return null}function qd(D,W,ne,J,Q){W.isScene!==!0&&(W=ht),te.resetTextureUnits();const Le=W.fog,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?W.environment:null,Ce=ie===null?C.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:lt.workingColorSpace,Ne=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Be=ge.get(J.envMap||Oe,Ne),tt=J.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,st=!!ne.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Fe=!!ne.morphAttributes.position,_t=!!ne.morphAttributes.normal,Jt=!!ne.morphAttributes.color;let Ut=Ei;J.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ut=C.toneMapping);const It=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,xn=It!==void 0?It.length:0,Ie=$.get(J),En=b.state.lights;if(xe===!0&&(Me===!0||D!==se)){const Ft=D===se&&J.id===q;ze.setState(J,D,Ft)}let pt=!1;J.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==En.state.version||Ie.outputColorSpace!==Ce||Q.isBatchedMesh&&Ie.batching===!1||!Q.isBatchedMesh&&Ie.batching===!0||Q.isBatchedMesh&&Ie.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Ie.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Ie.instancing===!1||!Q.isInstancedMesh&&Ie.instancing===!0||Q.isSkinnedMesh&&Ie.skinning===!1||!Q.isSkinnedMesh&&Ie.skinning===!0||Q.isInstancedMesh&&Ie.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Ie.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Ie.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Ie.instancingMorph===!1&&Q.morphTexture!==null||Ie.envMap!==Be||J.fog===!0&&Ie.fog!==Le||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ze.numPlanes||Ie.numIntersection!==ze.numIntersection)||Ie.vertexAlphas!==tt||Ie.vertexTangents!==st||Ie.morphTargets!==Fe||Ie.morphNormals!==_t||Ie.morphColors!==Jt||Ie.toneMapping!==Ut||Ie.morphTargetsCount!==xn||!!Ie.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Ie.__version=J.version);let Vn=Ie.currentProgram;pt===!0&&(Vn=Gr(J,W,Q),P&&J.isNodeMaterial&&P.onUpdateProgram(J,Vn,Ie));let di=!1,Vi=!1,Ts=!1;const Rt=Vn.getUniforms(),$t=Ie.uniforms;if(T.useProgram(Vn.program)&&(di=!0,Vi=!0,Ts=!0),J.id!==q&&(q=J.id,Vi=!0),Ie.needsLights){const Ft=Kd(b.state.lightProbeGridArray,Q);Ie.lightProbeGrid!==Ft&&(Ie.lightProbeGrid=Ft,Vi=!0)}if(di||se!==D){T.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Rt.setValue(Y,"projectionMatrix",D.projectionMatrix),Rt.setValue(Y,"viewMatrix",D.matrixWorldInverse);const Xi=Rt.map.cameraPosition;Xi!==void 0&&Xi.setValue(Y,We.setFromMatrixPosition(D.matrixWorld)),U.logarithmicDepthBuffer&&Rt.setValue(Y,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Rt.setValue(Y,"isOrthographic",D.isOrthographicCamera===!0),se!==D&&(se=D,Vi=!0,Ts=!0)}if(Ie.needsLights&&(En.state.sunShadowMap.length>0&&Rt.setValue(Y,"sunShadowMap",En.state.sunShadowMap,te),En.state.directionalShadowMap.length>0&&Rt.setValue(Y,"directionalShadowMap",En.state.directionalShadowMap,te),En.state.spotShadowMap.length>0&&Rt.setValue(Y,"spotShadowMap",En.state.spotShadowMap,te),En.state.pointShadowMap.length>0&&Rt.setValue(Y,"pointShadowMap",En.state.pointShadowMap,te)),Q.isSkinnedMesh){Rt.setOptional(Y,Q,"bindMatrix"),Rt.setOptional(Y,Q,"bindMatrixInverse");const Ft=Q.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),Rt.setValue(Y,"boneTexture",Ft.boneTexture,te))}Q.isBatchedMesh&&(Rt.setOptional(Y,Q,"batchingTexture"),Rt.setValue(Y,"batchingTexture",Q._matricesTexture,te),Rt.setOptional(Y,Q,"batchingIdTexture"),Rt.setValue(Y,"batchingIdTexture",Q._indirectTexture,te),Rt.setOptional(Y,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Rt.setValue(Y,"batchingColorTexture",Q._colorsTexture,te));const Yi=ne.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&X.update(Q,ne,Vn),(Vi||Ie.receiveShadow!==Q.receiveShadow)&&(Ie.receiveShadow=Q.receiveShadow,Rt.setValue(Y,"receiveShadow",Q.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&W.environment!==null&&($t.envMapIntensity.value=W.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=Mb()),Vi){if(Rt.setValue(Y,"toneMappingExposure",C.toneMappingExposure),Ie.needsLights&&$d($t,Ts),Le&&J.fog===!0&&Ue.refreshFogUniforms($t,Le),Ue.refreshMaterialUniforms($t,J,z,B,b.state.transmissionRenderTarget[D.id]),Ie.needsLights&&Ie.lightProbeGrid){const Ft=Ie.lightProbeGrid;$t.probesSH.value=Ft.texture,$t.probesMin.value.copy(Ft.boundingBox.min),$t.probesMax.value.copy(Ft.boundingBox.max),$t.probesResolution.value.copy(Ft.resolution)}Da.upload(Y,Wc(Ie),$t,te)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Da.upload(Y,Wc(Ie),$t,te),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Rt.setValue(Y,"center",Q.center),Rt.setValue(Y,"modelViewMatrix",Q.modelViewMatrix),Rt.setValue(Y,"normalMatrix",Q.normalMatrix),Rt.setValue(Y,"modelMatrix",Q.matrixWorld),J.uniformsGroups!==void 0){const Ft=J.uniformsGroups;for(let Xi=0,Rs=Ft.length;Xi<Rs;Xi++){const Xc=Ft[Xi];pe.update(Xc,Vn),pe.bind(Xc,Vn)}}return Vn}function $d(D,W){D.ambientLightColor.needsUpdate=W,D.lightProbe.needsUpdate=W,D.sunLights.needsUpdate=W,D.sunLightShadows.needsUpdate=W,D.directionalLights.needsUpdate=W,D.directionalLightShadows.needsUpdate=W,D.pointLights.needsUpdate=W,D.pointLightShadows.needsUpdate=W,D.spotLights.needsUpdate=W,D.spotLightShadows.needsUpdate=W,D.rectAreaLights.needsUpdate=W,D.hemisphereLights.needsUpdate=W}function Zd(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(D,W,ne){const J=$.get(D);J.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),$.get(D.texture).__webglTexture=W,$.get(D.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ne,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,W){const ne=$.get(D);ne.__webglFramebuffer=W,ne.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(D,W=0,ne=0){ie=D,G=W,K=ne;let J=null,Q=!1,Le=!1;if(D){const Ce=$.get(D);if(Ce.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(Y.FRAMEBUFFER,Ce.__webglFramebuffer),F.copy(D.viewport),ee.copy(D.scissor),ae=D.scissorTest,T.viewport(F),T.scissor(ee),T.setScissorTest(ae),q=-1;return}else if(Ce.__webglFramebuffer===void 0)te.setupRenderTarget(D);else if(Ce.__hasExternalTextures)te.rebindTextures(D,$.get(D.texture).__webglTexture,$.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const tt=D.depthTexture;if(Ce.__boundDepthTexture!==tt){if(tt!==null&&$.has(tt)&&(D.width!==tt.image.width||D.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(D)}}const Ne=D.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Le=!0);const Be=$.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Be[W])?J=Be[W][ne]:J=Be[W],Q=!0):D.samples>0&&te.useMultisampledRTT(D)===!1?J=$.get(D).__webglMultisampledFramebuffer:Array.isArray(Be)?J=Be[ne]:J=Be,F.copy(D.viewport),ee.copy(D.scissor),ae=D.scissorTest}else F.copy(j).multiplyScalar(z).floor(),ee.copy(ce).multiplyScalar(z).floor(),ae=oe;if(ne!==0&&(J=I),T.bindFramebuffer(Y.FRAMEBUFFER,J)&&T.drawBuffers(D,J),T.viewport(F),T.scissor(ee),T.setScissorTest(ae),Q){const Ce=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ce.__webglTexture,ne)}else if(Le){const Ce=W;for(let Ne=0;Ne<D.textures.length;Ne++){const Be=$.get(D.textures[Ne]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Ne,Be.__webglTexture,ne,Ce)}}else if(D!==null&&ne!==0){const Ce=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ce.__webglTexture,ne)}q=-1};function Yc(D){const W=$.get(D);return(W.__readFormat!==D.format||W.__readType!==D.type)&&(W.__readFormat=D.format,W.__readType=D.type,W.__formatReadable=U.textureFormatReadable(D.format),W.__typeReadable=U.textureTypeReadable(D.type)),W}this.readRenderTargetPixels=function(D,W,ne,J,Q,Le,Oe,Ce=0){if(!(D&&D.isWebGLRenderTarget)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ne=Ne[Oe]),Ne){T.bindFramebuffer(Y.FRAMEBUFFER,Ne);try{const Be=D.textures[Ce],tt=Be.format,st=Be.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ce);const Fe=Yc(Be);if(Fe.__formatReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=D.width-J&&ne>=0&&ne<=D.height-Q&&Y.readPixels(W,ne,J,Q,Ae.convert(tt),Ae.convert(st),Le)}finally{const Be=ie!==null?$.get(ie).__webglFramebuffer:null;T.bindFramebuffer(Y.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(D,W,ne,J,Q,Le,Oe,Ce=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ne=Ne[Oe]),Ne)if(W>=0&&W<=D.width-J&&ne>=0&&ne<=D.height-Q){T.bindFramebuffer(Y.FRAMEBUFFER,Ne);const Be=D.textures[Ce],tt=Be.format,st=Be.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ce);const Fe=Yc(Be);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const _t=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,_t),Y.bufferData(Y.PIXEL_PACK_BUFFER,Le.byteLength,Y.STREAM_READ),Y.readPixels(W,ne,J,Q,Ae.convert(tt),Ae.convert(st),0),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null);const Jt=ie!==null?$.get(ie).__webglFramebuffer:null;T.bindFramebuffer(Y.FRAMEBUFFER,Jt);const Ut=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await z1(Y,Ut,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,_t),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Le),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null),Y.deleteBuffer(_t),Y.deleteSync(Ut),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,W=null,ne=0){const J=Math.pow(2,-ne),Q=Math.floor(D.image.width*J),Le=Math.floor(D.image.height*J),Oe=W!==null?W.x:0,Ce=W!==null?W.y:0;te.setTexture2D(D,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ne,0,0,Oe,Ce,Q,Le),T.unbindTexture()},this.copyTextureToTexture=function(D,W,ne=null,J=null,Q=0,Le=0){let Oe,Ce,Ne,Be,tt,st,Fe,_t,Jt;const Ut=D.isCompressedTexture?D.mipmaps[Le]:D.image;if(ne!==null)Oe=ne.max.x-ne.min.x,Ce=ne.max.y-ne.min.y,Ne=ne.isBox3?ne.max.z-ne.min.z:1,Be=ne.min.x,tt=ne.min.y,st=ne.isBox3?ne.min.z:0;else{const $t=Math.pow(2,-Q);Oe=Math.floor(Ut.width*$t),Ce=Math.floor(Ut.height*$t),D.isDataArrayTexture?Ne=Ut.depth:D.isData3DTexture?Ne=Math.floor(Ut.depth*$t):Ne=1,Be=0,tt=0,st=0}J!==null?(Fe=J.x,_t=J.y,Jt=J.z):(Fe=0,_t=0,Jt=0);const It=Ae.convert(W.format),xn=Ae.convert(W.type);let Ie;W.isData3DTexture?(te.setTexture3D(W,0),Ie=Y.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(te.setTexture2DArray(W,0),Ie=Y.TEXTURE_2D_ARRAY):(te.setTexture2D(W,0),Ie=Y.TEXTURE_2D),T.activeTexture(Y.TEXTURE0),T.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,W.flipY),T.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),T.pixelStorei(Y.UNPACK_ALIGNMENT,W.unpackAlignment);const En=T.getParameter(Y.UNPACK_ROW_LENGTH),pt=T.getParameter(Y.UNPACK_IMAGE_HEIGHT),Vn=T.getParameter(Y.UNPACK_SKIP_PIXELS),di=T.getParameter(Y.UNPACK_SKIP_ROWS),Vi=T.getParameter(Y.UNPACK_SKIP_IMAGES);T.pixelStorei(Y.UNPACK_ROW_LENGTH,Ut.width),T.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Ut.height),T.pixelStorei(Y.UNPACK_SKIP_PIXELS,Be),T.pixelStorei(Y.UNPACK_SKIP_ROWS,tt),T.pixelStorei(Y.UNPACK_SKIP_IMAGES,st);const Ts=D.isDataArrayTexture||D.isData3DTexture,Rt=W.isDataArrayTexture||W.isData3DTexture;if(D.isDepthTexture){const $t=$.get(D),Yi=$.get(W),Ft=$.get($t.__renderTarget),Xi=$.get(Yi.__renderTarget);T.bindFramebuffer(Y.READ_FRAMEBUFFER,Ft.__webglFramebuffer),T.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let Rs=0;Rs<Ne;Rs++)Ts&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(D).__webglTexture,Q,st+Rs),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(W).__webglTexture,Le,Jt+Rs)),Y.blitFramebuffer(Be,tt,Oe,Ce,Fe,_t,Oe,Ce,Y.DEPTH_BUFFER_BIT,Y.NEAREST);T.bindFramebuffer(Y.READ_FRAMEBUFFER,null),T.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(Q!==0||D.isRenderTargetTexture||$.has(D)){const $t=$.get(D),Yi=$.get(W);T.bindFramebuffer(Y.READ_FRAMEBUFFER,O),T.bindFramebuffer(Y.DRAW_FRAMEBUFFER,k);for(let Ft=0;Ft<Ne;Ft++)Ts?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$t.__webglTexture,Q,st+Ft):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,$t.__webglTexture,Q),Rt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Yi.__webglTexture,Le,Jt+Ft):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Yi.__webglTexture,Le),Q!==0?Y.blitFramebuffer(Be,tt,Oe,Ce,Fe,_t,Oe,Ce,Y.COLOR_BUFFER_BIT,Y.NEAREST):Rt?Y.copyTexSubImage3D(Ie,Le,Fe,_t,Jt+Ft,Be,tt,Oe,Ce):Y.copyTexSubImage2D(Ie,Le,Fe,_t,Be,tt,Oe,Ce);T.bindFramebuffer(Y.READ_FRAMEBUFFER,null),T.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Rt?D.isDataTexture||D.isData3DTexture?Y.texSubImage3D(Ie,Le,Fe,_t,Jt,Oe,Ce,Ne,It,xn,Ut.data):W.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ie,Le,Fe,_t,Jt,Oe,Ce,Ne,It,Ut.data):Y.texSubImage3D(Ie,Le,Fe,_t,Jt,Oe,Ce,Ne,It,xn,Ut):D.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Le,Fe,_t,Oe,Ce,It,xn,Ut.data):D.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Le,Fe,_t,Ut.width,Ut.height,It,Ut.data):Y.texSubImage2D(Y.TEXTURE_2D,Le,Fe,_t,Oe,Ce,It,xn,Ut);T.pixelStorei(Y.UNPACK_ROW_LENGTH,En),T.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,pt),T.pixelStorei(Y.UNPACK_SKIP_PIXELS,Vn),T.pixelStorei(Y.UNPACK_SKIP_ROWS,di),T.pixelStorei(Y.UNPACK_SKIP_IMAGES,Vi),Le===0&&W.generateMipmaps&&Y.generateMipmap(Ie),T.unbindTexture()},this.initRenderTarget=function(D){$.get(D).__webglFramebuffer===void 0&&te.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?te.setTextureCube(D,0):D.isData3DTexture?te.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?te.setTexture2DArray(D,0):te.setTexture2D(D,0),T.unbindTexture()},this.resetState=function(){G=0,K=0,ie=null,T.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}const _b=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function bb(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:de(e,.55,.42),[l.LEAF2]:de(e+.02,.5,.55),[l.LEAF3]:de(e+.04,.6,.26),[l.BODY]:de(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:de(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:de(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const ln=2.5,yb=[2.2,ln,.3],Jo=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function Sb(){const n=new qe({blend:.05}),e=[],t=(b,A)=>{const _=Math.sin(b*127.1+A*311.7)*43758.5453;return _-Math.floor(_)},i=b=>{const A=Math.sin(Math.atan2(b[2],b[0])*9+b[1]*2.3);return A>.75?l.BARKD:A<-.6?l.BARKL:A>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let b=0;b<7;b++){const A=b/7*Math.PI*2+.3,_=.45,w=1.05+t(b,1)*.45;n.chain([[Math.cos(A)*_,.45,-.2+Math.sin(A)*_,.2],[Math.cos(A)*(_+w)*.55,.16,-.2+Math.sin(A)*(_+w)*.55,.13],[Math.cos(A)*w,.02,-.2+Math.sin(A)*w,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const s=(b,A=1)=>n.chain(b,l.TRUNK,{group:A,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=b=>A=>{const _=t(Math.floor(A[0]*9),Math.floor(A[1]*9)+Math.floor(A[2]*9)*7);return A[1]<b[1]-.25||_<.18?l.LEAF3:_>.82?l.LEAF2:void 0};for(const[b,A]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(b,A,l.LEAF,{group:40,rough:.05,paint:r(b)});const a=[-.15,2.92,.15],o=L.norm([1,.07,0]),h=[1.25,.52,.58],c=b=>L.dot(L.sub(b,a),o),f=b=>L.dot(L.sub(b,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:b=>{const A=c(b),_=f(b),w=b[2]>a[2]+h[2]-.04;return w&&Math.hypot(A+.85,_-.02)<.15?Math.hypot(A+.85,_-.02)<.11?l.GLOW:l.FRAME:w&&A>.35&&A<.8&&_>-.42&&_<.38?_>.02&&_<.3&&A>.42&&A<.73?l.GLOW:Math.abs(A-.575)<.2&&_<-.38?l.FRAME:l.BODY2:w&&_>.06&&_<.32&&A>-.6&&A<.25?Math.abs(A+.17)<.02?l.BELLY:l.GLOW:A>h[0]-.05&&_>.05&&_<.35&&Math.abs(b[2]-a[2])<.45?l.MAGIC2:A>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(b[2]-a[2])-.38)<.08?l.FRAME:_>.02?l.BELLY:_<-.42?l.SHADES:void 0}}),e.push({at:L.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:L.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:L.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const b of[-.75,.75]){const A=L.add(L.add(a,L.mul(o,b)),[0,-.5,h[2]-.02]);n.ell(A,[.21,.21,.08],l.SHADES,{group:4,paint:_=>Math.hypot(_[0]-A[0],_[1]-A[1])<.1?l.FRAME:void 0})}n.seg(L.add(a,[1.05,.3,h[2]-.02]),L.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(L.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const d=L.add(a,[-.25,h[1]+.14,0]);n.box(d,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:b=>Math.floor((c(b)+2)*6)%2?l.BODY2:void 0}),n.box(L.add(d,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:L.norm([1,.14,0]),round:.04,group:6});for(const b of[-.18,.18])n.seg(L.add(a,[-1.33,-.45,b]),L.add(a,[-1.3,.62,b]),.02,.02,l.FRAME,{group:7});for(let b=0;b<5;b++)n.seg(L.add(a,[-1.33,-.32+b*.22,-.18]),L.add(a,[-1.33,-.32+b*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,m=1.45;n.seg(u,L.add(u,[0,m,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:b=>{const A=b[1]-u[1],_=Math.atan2(b[2]-u[2],b[0]-u[0]),w=Math.floor(A*6),C=Math.floor((_+Math.PI)*4+w%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&A>.75&&A<1.15?l.GLOW:A*6%1<.12||((_+Math.PI)*4+w%2*.5)%1<.1?l.STONED:t(w,C)<.15&&A<.5?l.MOSS:void 0}}),e.push({at:L.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let b=0;b<8;b++){const A=b/8*Math.PI*2;n.box(L.add(u,[Math.cos(A)*(p-.05),m+.1,Math.sin(A)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(A),0,Math.cos(A)],round:.02,group:9,rough:.008})}const M=L.add(u,[0,m+.1,0]),g=L.add(M,[.08,1.05,-.04]);n.seg(M,g,p-.1,.02,l.HAT1,{group:10,paint:b=>Math.floor((b[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(g,L.add(g,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(L.add(g,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:b=>b[1]>2.58?l.MOSS:void 0}),n.box(L.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(L.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const b of[-.9,.95]){const A=L.add(a,[b,-.55,0]);for(const _ of[-1,1])n.seg(L.add(A,[_*.04,-.08,h[2]+.03]),L.add(A,[_*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const x=[2.05,ln-.05,.3],v=[.85,.05,.62];n.box(x,v,l.WOOD,{round:.02,group:15,paint:b=>(b[2]-x[2]+2)*9%1<.12?l.BARKD:void 0});for(const[b,A]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([b,ln-.1,A],[b,ln-.7,A*.3],.04,.04,l.WOOD,{group:16});const S=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let b=0;b+1<S.length;b++){const[A,_]=[S[b],S[b+1]],w=Math.ceil(Math.hypot(_[0]-A[0],_[1]-A[1])/.32);n.seg([A[0],ln+.42,A[1]],[_[0],ln+.42,_[1]],.025,.025,l.WOOD,{group:17});for(let C=0;C<=w;C++){const R=C/w,P=A[0]+(_[0]-A[0])*R,I=A[1]+(_[1]-A[1])*R;n.seg([P,ln,I],[P,ln+.42,I],.02,.02,l.WOOD,{group:17})}}const y=yb;n.box([y[0],y[1]+qs-.02,y[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0}),n.box([y[0]-.2,y[1]+qs+.22,y[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0});for(const[b,A]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([y[0]+b,y[1],y[2]+A],[y[0]-b*.6,y[1]+qs-.03,y[2]-A*.2],.015,.015,l.FRAME,{group:19});for(const[b,A,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([b,ln,A],[b,ln+.2*_,A],.1*_,.13*_,l.EAR,{group:20}),n.ell([b,ln+.3*_,A],[.16*_,.14*_,.16*_],l.LEAF2,{group:21,rough:.02,paint:w=>t(Math.floor(w[0]*30),Math.floor(w[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:b=>Math.floor((b[2]+2)*5)%2?l.BODY2:void 0});for(const b of[.05,.95])n.seg([1.98,3.4,b],[1.98,ln,b],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const b of[.18,.48])n.seg([1.2,ln-.05,b],[1,.06,b+.12],.018,.018,l.STRAW,{group:25});for(let b=1;b<8;b++){const A=b/8,_=ln-.05-(ln-.11)*A,w=1.2-.2*A;n.seg([w,_,.18+.12*A],[w,_,.48+.12*A],.02,.02,l.WOOD,{group:25})}const E=(b,A,_,w,C)=>{for(let R=0;R<=w;R++){const P=R/w,I=L.lerp(b,A,P);I[1]-=Math.sin(P*Math.PI)*_,C(I,R)}};return E([-.55,3.95,.45],[1.95,3.42,1],.35,9,(b,A)=>{n.ell(b,[.035,.035,.035],Jo[A%4],{group:26+A%2,extra:!0})}),E([-.75,4.7,.42],[1.6,3.65,1],.2,7,(b,A)=>{n.ell(b,[.03,.03,.03],Jo[(A+2)%4],{group:28+A%2,extra:!0})}),E([2.88,ln+.45,.9],[2.88,ln+.45,-.3],.08,5,(b,A)=>{n.ell(b,[.03,.03,.03],Jo[(A+1)%4],{group:30+A%2,extra:!0})}),E([-2,2.8,.1],[-.9,3.6,.5],.15,5,(b,A)=>{n.box(b,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][A%3],{dir:[1,0,.2],round:.005,group:32+A%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,ln+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[y[0],y[1],y[2]],door:L.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function wb(n={},{facing:e="towards",ppm:t=16}={}){const i=Sb(),s=mn(i.m,{scale:ar(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let g=0;g<r.w;g++)r.m[M*r.w+g]&&(a=Math.min(a,g),o=Math.max(o,g),h=Math.min(h,M));const c=new ft(o-a+1,r.h-h);for(let M=0;M<c.h;M++)for(let g=0;g<c.w;g++){const x=(M+h)*r.w+g+a;r.m[x]&&c.put(g,M,r.m[x],r.n[x*3],r.n[x*3+1],r.n[x*3+2])}const f=M=>{const[g,x]=s.project(M);return[+(g-a).toFixed(1),+(x-h).toFixed(1)]},d=Math.round(f([0,i.splitY,0])[1]),u=new ft(c.w,c.h),p=new ft(c.w,c.h);for(let M=0;M<c.h;M++)for(let g=0;g<c.w;g++){const x=M*c.w+g,v=c.m[x];v&&(_b.has(v)||M<d?u:p).put(g,M,v,c.n[x*3],c.n[x*3+1],c.n[x*3+2])}const m=M=>{const[g,x]=f(M);return{x:g,y:x}};return{whole:c,top:u,bot:p,crownY:d,anchors:{base:m([0,0,-.2]),seat:m(i.seat),door:m(i.door),lights:i.lights.map(M=>({...m(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const qt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},At=(n,e,t=0)=>qt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Bt=(n=.2,e=.15)=>t=>{const i=At(t,16,3);return At(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Vt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=qt(s,o)*6.283,c=t*Math.sqrt(qt(o,s));n.ell([r+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+qt(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:f=>f[1]>.13?l.LEAF:void 0})}},va=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...L.add(e,L.add(L.mul(a,.25*i),[0,.2*i,0])),.025*i],[...L.add(e,L.add(L.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?l.LEAF:l.LEAF2,{group:t})}},ri=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...L.add(L.lerp(e,t,a/4),[(qt(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>At(a,30)<.3?l.LEAF2:void 0})},qa=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=At(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),je=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Bt(.35,.05)}),rr=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function _i(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(d,u,p,m)=>{const M=Math.cos(u),g=Math.sin(u),x=[...d];return x[p]=d[p]*M-d[m]*g,x[m]=d[p]*g+d[m]*M,x},o=d=>a(a(a(d,s,1,2),i,0,1),-t,0,2),h=d=>a(a(a(d,t,0,2),-i,0,1),-s,1,2),c=d=>L.add(o(d),r),f=d=>h(L.sub(d,r));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=c(d.a),d.b=c(d.b)):(d.c=c(d.c),d.axes=d.axes.map(o)),d.paint){const u=d.paint;d.paint=(p,m)=>u(f(p),m)}}function Qo(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=Bt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?At(h,9)<.25?l.STONED:l.SHADES:Bt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,r?.22:.3,.1],l.BODY3,{group:e+1,paint:f=>Math.hypot(f[0]-h,f[1]-.3)<.12?l.FRAME:void 0});if(s)for(const h of[-.45,.45])rr(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const Eb={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Qo(n,1),_i(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),va(n,[.9,.2,.8],5),va(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Qo(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),qa(n,[.3,3.4,-.1],[1.1,.7,.9],5),ri(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Vt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Qo(n,1),_i(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])va(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;au(n,1),qa(n,[.05,.65,0],[.32,.28,.26],3),_i(n,e,{roll:1.35,at:[0,.32,0]}),Vt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){au(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Vt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){wr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){wr(n,[0,0,0],1),wr(n,[.5,0,.2],4);const e=n.parts.length;wr(n,[0,0,0],7),_i(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Vt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){wr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,L.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(L.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>At(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?At(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&At(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])je(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Bt(.5,.1)(t)}),_i(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Vt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>At(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?At(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:At(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Vt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){je(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Bt(.2,.1)(e)}}),Vt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Bt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Bt(.3,.3)}),ri(n,[.43,0,.3],[.4,1.9,.43],3,8),ri(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Vt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Bt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),ri(n,[0,0,.06],[.05,1.5,.06],3,10),Vt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>At(t,6,5)<.25&&t[1]>.4?l.MOSS:At(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Vt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Bt(.25,.15)(e)}),va(n,[0,.4,.4],2,.55),Vt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;je(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])je(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),je(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Bt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),je(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(L.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(L.add(e,[.14,.07,0]),L.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Vt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Bt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Bt(.25,.15)});for(let e=0;e<7;e++)rr(n,[(qt(e)-.5)*.4,.4+qt(e,2)*1,.2+qt(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);ri(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function au(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])je(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;je(n,L.lerp(t[0],t[1],s),L.lerp(t[4],t[5],s),e,.008),je(n,L.lerp(t[3],t[2],s),L.lerp(t[7],t[6],s),e,.008)}je(n,t[4],[-.45,.95,-.28],e,.015),je(n,t[7],[-.45,.95,.28],e,.015),je(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])je(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],l.BODY3,{group:e+1})}function wr(n,e,t,i=!1){n.box(L.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Bt(.15,.2)}),n.seg(L.add(e,[0,.05,0]),L.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&At(s,18)<.2?l.GLOW:Bt(.15,.1)(s)}),i&&rr(n,L.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const Ab={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])je(n,[e,0,t],[e*.95,2.1,0],1,.045);je(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])je(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)rr(n,[-.42+(qt(e)-.5)*.5,.6+qt(e,2)*.7,(qt(e,3)-.5)*.3],.025,10+e);je(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),je(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),ri(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Vt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])je(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)je(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Bt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Bt(.35,.15)(e)});for(let e=0;e<10;e++){const t=qt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+qt(e)*.5,Math.sin(t)*.3,.025],[.1+qt(e,4)*.6,.7+qt(e,5)*.4,(qt(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+qt(e,7)*.6,.5+qt(e,8)*.4,(qt(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>At(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),qa(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Bt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;je(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),je(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}_i(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Vt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Bt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>At(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])je(n,[t,.03,-.12],[t,.03,.12],3,.02);_i(n,e,{pitch:.32,at:[0,.42,0]}),Vt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)je(n,t(i,s),t(i,s+1),1,.025),je(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)ri(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Vt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Bt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Bt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),je(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Vt(n,8,.8,6,19)}}},Tb=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function Rb(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>At(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?At(a,18)<.5?l.LEAF2:l.STONED:s(a[0],a[2])?At(a,10,2)<.25?i:l.CLOTH:At(a,5,7)<.07?l.MOSS:void 0})}const ni=(n,e,t=.045)=>Math.abs(n-e)<t,Cb={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){Rb(n,4.4+.5,2+.5,l.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(ni(Math.abs(i),4.4)||ni(Math.abs(s),2)||ni(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(ni(s,0)||ni(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])je(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])je(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)je(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),_i(n,e,{roll:.25,pitch:-.1}),Vt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])je(n,[e,0,0],[e,1.7,0],1,.03);je(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?At(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)ri(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)rr(n,[(qt(e)-.5)*1.2,.06,(qt(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Vt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?At(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?At(t,6)<.15?l.MOSS:void 0:At(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:s=>At(s,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;je(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=L.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],l.FRAME,{dir:L.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?At(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});ri(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])je(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)qt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Bt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),ri(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(ni(Math.abs(s),5.2,.06)||ni(Math.abs(r),3.3,.06)||ni(s,0,.06)||ni(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(ni(Math.abs(s),5.2-1,.06)||ni(Math.abs(r),1.6,.06)))?At(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((s+20)*.8)%2?At(i,6)<.25?l.LEAF2:l.LEAF:At(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){ou(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),qa(n,[.3,1.6,.2],[.35,.25,.3],6),Vt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;ou(n,1),_i(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Vt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){je(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Bt(.2,0)}),Vt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])je(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;je(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),je(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Bt(.4,.1)(s)});rr(n,[0,4+.45,.22],.06,4,l.MAGIC2),ri(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;je(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Bt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;je(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,l.ACCENT)}_i(n,e,{pitch:-.2}),Vt(n,8,1,5,31)}}};function ou(n,e){for(const t of[-1.4,1.4])je(n,[0,0,t],[0,1,t],e,.035,l.BELLY);je(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])je(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const Lb={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function Pb(n={},e=16){const t=s=>ar(n)*Cd[s].size/e,i=s=>s.map(([r,a,o])=>({id:r,x:+(a*t(r)).toFixed(1),z:+(o*t(r)).toFixed(1)}));return{playground:i(Tb),...Object.fromEntries(Object.entries(Lb).map(([s,r])=>[s,i(r)]))}}const Rd=[...Object.entries(Eb).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(Ab).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(Cb).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],Cd=Object.fromEntries(Rd.map(n=>[n.id,n]));function Db(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.BODY]:[92,118,140],[l.BODY2]:[132,74,42],[l.BODY3]:[34,32,38],[l.FRAME]:[150,152,158],[l.SHADES]:[24,24,30],[l.STONE]:[72,72,80],[l.STONED]:[34,34,40],[l.CLOTH]:[214,210,196],[l.BELLY]:[222,218,206],[l.ACCENT]:[214,92,40],[l.HAT1]:[54,84,120],[l.HAT2]:[86,112,92],[l.MOSS]:de(.26,.45,.45),[l.TRUNK]:de(t,.45,.36),[l.BARK2]:[98,74,52],[l.BARKD]:de(t+.03,.5,.17),[l.LEAF]:de(e,.55,.45),[l.LEAF2]:de(e-.03,.5,.6),[l.LEAF3]:de(e+.03,.6,.28),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,170,80],[l.MAGIC]:de(n.magicHue??.2,.55,1),[l.MAGIC2]:de(n.magicHue??.2,.15,1),[l.LINE]:[24,22,30]}}function Ib(n,e={},{ppm:t=16}={}){const i=Cd[n];if(!i)throw new Error(`no relic "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=ar(e)*i.size,{sp:a,project:o}=mn(s,{scale:r});let h=0;for(const A of s.parts){if(A.extra||A.cut)continue;const _=A.type==="cone"?[[A.a,A.r1],[A.b,A.r2]]:[[A.c,A.r?Math.max(...A.r):Math.max(A.h[0],A.h[2])]];for(const[w,C]of _)w[1]-C<.3&&(h=Math.max(h,Math.hypot(w[0],w[2])+C))}let c=a.w,f=-1,d=a.h;for(let A=0;A<a.h;A++)for(let _=0;_<a.w;_++)a.m[A*a.w+_]&&(c=Math.min(c,_),f=Math.max(f,_),d=Math.min(d,A));const u=f-c+1,p=a.h-d,m=new ft(u,p),M=new ft(u,p),g=new ft(u,p),x=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-d);for(let A=0;A<p;A++)for(let _=0;_<u;_++){const w=(A+d)*a.w+_+c,C=a.m[w];if(!C)continue;const R=[a.n[w*3],a.n[w*3+1],a.n[w*3+2]];m.put(_,A,C,...R),(A<x?M:g).put(_,A,C,...R)}m.bodyH=a.bodyH;const v=r/t,[S,y]=o([0,0,0]),E=+(S-c).toFixed(1),b=+(y-d).toFixed(1);return{whole:m,top:M,bot:g,crownY:x,origin:{x:E,y:b},metres:{width:+(u/t).toFixed(1),height:+(p/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const Wt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},li=(n,e,t=0)=>Wt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),nc=n=>{const e=li(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Ob=n=>e=>{const t=li(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},_n=(n,e=0)=>t=>{const i=li(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&li(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},gt=(n,e,t,i,s,r={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:_n(s,r.courses??5),...r}),Ln=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...L.add(L.lerp(e,t,o),[(Wt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,l.LEAF,{group:i,rough:.02,paint:a=>li(a,30)<.3?l.LEAF2:void 0})},Ni=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Wt(s,r)*6.283,o=t*Math.sqrt(Wt(r,s)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+Wt(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:f=>f[1]>.14?l.LEAF:void 0})}},xi=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Ob(e)}),Fn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:nc}),Pn=(n,e,t,i,s={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&li(r,5,i)<.7?l.MOSS:li(r,14)>.9?l.STONED:void 0}),lu=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),Nb={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])gt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];gt(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?l.RUNE:_n(e)(r)):_n(e)})}for(let t=0;t<4;t++)gt(n,[1.3+t*.3,.14,.4+Wt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Wt(t,2)-.5),Wt(t,3)-.5],courses:0});e&&(Ln(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ni(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||gt(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;gt(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)gt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Ln(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Ln(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){gt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?l.STONED:_n(e,0)(s)}),gt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,l.STONE,{group:4,paint:_n(e,0)});gt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Ln(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ni(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Wt(t,9)*(t%3===0?1.2:.45);gt(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Wt(t)-.5),Math.cos(i)],courses:0,round:.07})}gt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ni(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){gt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:_n(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>li(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])gt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)gt(n,[-1.2+t*.6,.12,.55+Wt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Wt(t,5)-.5]});e&&(Ln(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Ln(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;gt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)lu(n,[(Wt(t)-.5)*.8,.8+Wt(t,2)*.7,(Wt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(Ln(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ni(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){gt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:_n(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])gt(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)gt(n,[.5+Wt(t)*1.2,.13,-.3+Wt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Wt(t,5)-.5]});e&&(Ln(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Ln(n,[.3,.1,.72],[.5,1.8,.72],5,13),xi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])gt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)gt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),gt(n,[-1.1,.55,0],[.15,.55,.62],4,e),gt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ni(n,12,1.6,10,14),Ln(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:_n(e,0)}),n.ell(s(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:_n(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],l.STONED,{group:1,cut:!0}),lu(n,s(.12,r),.05,3+(r>0?1:0),l.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:_n(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?l.STONED:_n(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:_n(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:_n(e,0)}),e&&(Ni(n,14,1.8,10,16),xi(n,L.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){gt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])gt(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(Ln(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ni(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){gt(n,[-.9,.7,0],[.35,.7,.5],1,e),gt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];gt(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}gt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])gt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Ln(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ni(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])gt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:_n(e,5)(i)):_n(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:_n(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)gt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Ln(n,[.75,.05,.22],[.85,1.9,.22],7,21),Ln(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ni(n,12,1.6,10,23))}}},Fb={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Pn(n,[(Wt(e)-.5)*.6,.04,(Wt(e,2)-.5)*.4],[.07+Wt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Pn(n,[-.15,.12,0],[.22,.15,.2],1),Pn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Pn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Pn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Pn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),xi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Pn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Pn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Pn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Pn(n,[-1.1,.3,.6],[.4,.35,.35],2),Pn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&li(e,6)<.3?l.MOSS:li(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Pn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Pn(n,[.35,.1,.25],[.15,.1,.14],2)}}},Ub={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}Fn(n,e,1),xi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Fn(n,e,1),xi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Fn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Fn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Fn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),xi(n,[-1,2.7,0],[.6,.45,.5],4),xi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:nc(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),xi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Fn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:li(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Fn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Fn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Wt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Wt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Fn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Fn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Fn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Pn(n,[e,i,t],[.3,.24,.26],3);xi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:nc})}Fn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Fn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])xi(n,[e,t,-.1],[.45,.3,.35],3)}}},Ld=[...Object.entries(Nb).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(Fb).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(Ub).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],kb=Object.fromEntries(Ld.map(n=>[n.id,n]));function Bb(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:s([128,126,134]),[l.STONED]:s([64,62,72]),[l.MOSS]:de(.26,.45,.45),[l.TRUNK]:de(i,.45,.36),[l.BARKD]:de(i+.03,.5,.17),[l.BARKL]:de(i,.35,.55),[l.LEAF]:de(t,.55,.45),[l.LEAF2]:de(t-.03,.5,.62),[l.LEAF3]:de(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:de(n.magicHue??.45,.6,1),[l.MAGIC2]:de(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function zb(n,e={},{variant:t=0,ppm:i=16}={}){const s=kb[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new qe({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=ar(e)*s.size,{sp:o,project:h}=mn(r,{scale:a});let c=0;for(const y of r.parts){if(y.extra)continue;const E=y.type==="cone"?[[y.a,y.r1],[y.b,y.r2]]:[[y.c,y.r?Math.max(...y.r):Math.max(y.h[0],y.h[2])]];for(const[b,A]of E)b[1]-A<.3&&(c=Math.max(c,Math.hypot(b[0],b[2])+A))}let f=o.w,d=-1,u=o.h;for(let y=0;y<o.h;y++)for(let E=0;E<o.w;E++)o.m[y*o.w+E]&&(f=Math.min(f,E),d=Math.max(d,E),u=Math.min(u,y));const p=d-f+1,m=o.h-u,M=new ft(p,m),g=new ft(p,m),x=new ft(p,m),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let y=0;y<m;y++)for(let E=0;E<p;E++){const b=(y+u)*o.w+E+f,A=o.m[b];if(!A)continue;const _=[o.n[b*3],o.n[b*3+1],o.n[b*3+2]];M.put(E,y,A,..._),(y<v?g:x).put(E,y,A,..._)}const S=a/i;return{whole:M,top:g,bot:x,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(m/i).toFixed(1),footprint:+(c*S).toFixed(1)}}}const pn=16,cn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Bi=[0,-.42,.9],en=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,c=r-o,f=i?Math.round(i*t):0,d=m=>f?(m%f+f)%f:m,u=(m,M)=>cn(m,d(M)),p=m=>m*m*(3-2*m);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function cu(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let c=9,f=9,d=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=a+p,M=o+u,g=(M%h+h)%h,x=m+cn(m,g*3+1),v=M+cn(m*7+2,g),S=Math.hypot(x-s,v-r);S<c?(f=c,c=S,d=cn(m,g)):S<f&&(f=S)}return{edge:f-c,id:d}}const us=(n,e,t,i=.14)=>Math.abs(n)>1-i*en(n>0?3:7,e,1.4,t)*1.6,oo={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(us(n,e,4,.3))return 0;const i=en(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&en(n*2,e,.9,4)>.68?[l.WATER,0]:[s?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(us(n,e,4,.5))return 0;const i=en(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(us(n,e,4,.1))return 0;const i=cu(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:en(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(us(n,e,4,.08))return 0;const i=cu(n*2,e,2.2,4);return i.edge<.16?[en(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(cn(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+en(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(cn(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[en(n,e,3,4)<.15?l.MOSS:r?l.BARKD:cn(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(us(n,e,8,.06))return 0;const s=en(n*4,e,1.1,8);return Math.abs(en(n*6,e,.7,8)-.5)<.02||Math.abs(en(n*3+9,e,1.6,8)-.5)<.012?[en(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[s<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[l.BELLY,.05]:[s<.2?l.MOSS:s>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=en(n*3,e,2.5,4),a=[0,.35,.6][i];if(us(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[en(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&en(n,e,6,4)>a*.8?[cn(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:r<a?[r<a*.5?l.LEAF:l.LEAF2,.1]:[r>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(us(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+en(n,e,3,4)*.06?[Math.abs(r-.5)<.05?l.BARKL:l.TRUNK,.6]:[en(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&en(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function jo(n,e,t){const i=new ft(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],Bi[0]+(a[1]?(cn(r,s)-.5)*a[1]:0),Bi[1]+(a[1]?(cn(s,r)-.5)*a[1]*.5:0),Bi[2])}return i}function Hb(n,{variant:e=0}={}){const t=oo[n],i=Math.round(t.width*pn),s=Math.round(t.period*pn);t.width/2;const r=(u,p,m)=>t.surface(u,p,m,e),a=jo(i,s,(u,p)=>r(u/i*2-1,p/pn)),o=Math.round(Math.max(1.5,t.width*.8)*pn),h=jo(i,o,(u,p)=>{const m=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(m));return Math.abs(M)>1||en(u/pn,p/pn,2)>.25+m?0:r(M,p/pn)}),c=Math.round(t.width*2.4*pn),f=c/2,d=u=>jo(c,c,(p,m)=>{let M=null;for(const g of u){const x=Math.cos(g),v=Math.sin(g),S=(p-f)*x+(m-f)*v,y=-(p-f)*v+(m-f)*x;if(S<-t.width*pn*.5)continue;const E=y/(i/2);Math.abs(E)<=1&&(!M||Math.abs(E)<Math.abs(M.u))&&(M={u:E,v:(f-S)/pn})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-f,m-f)<i*.6):0});return{strip:a,end:h,y:d([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:d([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}function hu(n,e,{variant:t=0,pad:i=2}={}){const s=oo[n],r=s.width/2,a=Array.isArray(e[0][0])?e:[e],o=a.flat(),h=o.map(g=>g[0]),c=o.map(g=>g[1]),f=Math.min(...h)-r-i,d=Math.min(...c)-r-i,u=Math.ceil((Math.max(...h)+r+i-f)*pn),p=Math.ceil((Math.max(...c)+r+i-d)*pn),m=[];for(const g of a){let x=0;for(let v=0;v+1<g.length;v++){const S=g[v],y=g[v+1],E=Math.hypot(y[0]-S[0],y[1]-S[1]);m.push({a:S,b:y,l:E,s:x,first:v===0,last:v+2===g.length}),x+=E}}const M=new ft(u,p);for(let g=0;g<p;g++)for(let x=0;x<u;x++){const v=f+(x+.5)/pn,S=d+(g+.5)/pn;let y=null;for(const b of m){const A=b.b[0]-b.a[0],_=b.b[1]-b.a[1],w=((v-b.a[0])*A+(S-b.a[1])*_)/(b.l*b.l);if(w<0&&b.first||w>1&&b.last)continue;const C=Math.max(0,Math.min(1,w)),R=b.a[0]+A*C,P=b.a[1]+_*C,I=Math.hypot(v-R,S-P);I<=r&&(!y||I<y.d)&&(y={d:I,u:((v-R)*-_+(S-P)*A)/b.l/r,v:b.s+C*b.l})}if(!y)continue;const E=s.surface(y.u,(y.v%s.period+s.period)%s.period,!1,t);E&&M.px(x,g,E[0],Bi[0],Bi[1],Bi[2])}return{sp:M,origin:[-f*pn,-d*pn]}}function Gb({variant:n=0,length:e=16,radius:t=30}={}){const i=[[0,0],[e,0]],s=[];for(let d=0;d<=12;d++){const u=d/12*(e/t);s.push([Math.sin(u)*t,(1-Math.cos(u))*t])}const r=hu("railway",i,{variant:n,pad:0}),a=hu("railway",s,{variant:n,pad:0}),o=Math.max(r.sp.w,a.sp.w+Math.round(a.origin[0]-r.origin[0])),h=Math.max(r.origin[1],a.origin[1]),c=Math.max(r.sp.h-r.origin[1],a.sp.h-a.origin[1])+h,f=new ft(o,Math.ceil(c));for(const d of[a,r])for(let u=0;u<d.sp.h;u++)for(let p=0;p<d.sp.w;p++){const m=d.sp.m[u*d.sp.w+p];if(!m)continue;const M=p+Math.round(r.origin[0]-d.origin[0]),g=u+Math.round(h-d.origin[1]);f.inb(M,g)&&!(f.m[g*o+M]===l.FRAME&&m!==l.FRAME)&&f.px(M,g,m,Bi[0],Bi[1],Bi[2])}return f}const fn=(n,e,t=0)=>cn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),gi=(n=.25,e=.15)=>t=>{const i=fn(t,16,3);return fn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},mi=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:gi(.4,.05)}),uu=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&fn(s,5,i)<.6?l.MOSS:fn(s,14)>.9?l.STONED:void 0}),ds=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=cn(s,r)*6.283,o=t*Math.sqrt(cn(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+cn(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},el=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=fn(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),_a=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...L.add(L.lerp(e,t,a/4),[(cn(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>fn(a,30)<.3?l.LEAF2:void 0})};function du(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(f,d,u,p)=>{const m=Math.cos(d),M=Math.sin(d),g=[...f];return g[u]=f[u]*m-f[p]*M,g[p]=f[u]*M+f[p]*m,g},a=f=>r(r(f,i,1,2),t,0,1),o=f=>r(r(f,-t,0,1),-i,1,2),h=f=>L.add(a(f),s),c=f=>o(L.sub(f,s));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=h(f.a),f.b=h(f.b)):(f.c=h(f.c),f.axes=f.axes.map(a)),f.paint){const d=f.paint;f.paint=(u,p)=>d(c(u),p)}}const Wb={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:gi(.1,.2)(t)}),du(n,e,{roll:.15,pitch:.1}),ds(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){uu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),el(n,[0,.95,0],[.22,.18,.2],2),ds(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(cn(e)-.5)*.3,0,(cn(e,2)-.5)*.2],i=.08+cn(e,3)*.1;n.seg(t,L.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(L.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){mi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:gi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),_a(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&fn(t,6,e)<.35?l.MOSS:fn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])uu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>fn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>fn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>fn(t,12)<.12?l.BARKD:t[1]>.55&&fn(t,5)<.3?l.MOSS:void 0});el(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:s=>fn(s,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:gi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?l.FRAME:void 0});du(n,e,{roll:1.4,at:[0,.3,.3]}),ds(n,14,2.2,4,5),_a(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?fn(e,9)<.2?l.SHADES:l.GLOW:gi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>fn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),el(n,[.7,3.1,-.1],[1,.6,.8],5),ds(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&fn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});mi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),_a(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),ds(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:gi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:gi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:gi(.3,.15)(e)}),mi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});ds(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])mi(n,[-.2,0,e],[0,.75,e],1,.05),mi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:gi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:gi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>fn(t,9)<.3?l.MOSS:void 0});ds(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])mi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;mi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),mi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])mi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])mi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});_a(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},Pd=Object.entries(Wb).map(([n,e])=>({id:n,...e})),Vb=Object.fromEntries(Pd.map(n=>[n.id,n]));function Dd(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:de(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:de(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:de(t,.35,.55),[l.TRUNK]:de(t,.45,.36),[l.LEAF]:de(e,.55,.45),[l.LEAF2]:de(e-.03,.5,.6),[l.LEAF3]:de(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:de(n.magicHue??.5,.55,1),[l.MAGIC2]:de(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function Yb(n,e={},t=16){const i=Vb[n];if(!i)throw new Error(`no path piece "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=ar(e)*1.1,a=mn(s,{scale:r}),o=a.sp;let h=o.w,c=-1,f=o.h;for(let m=0;m<o.h;m++)for(let M=0;M<o.w;M++)o.m[m*o.w+M]&&(h=Math.min(h,M),c=Math.max(c,M),f=Math.min(f,m));const d=new ft(c-h+1,o.h-f);for(let m=0;m<d.h;m++)for(let M=0;M<d.w;M++){const g=(m+f)*o.w+M+h;o.m[g]&&d.put(M,m,o.m[g],o.n[g*3],o.n[g*3+1],o.n[g*3+2])}const[u,p]=a.project([0,0,0]);return{sp:d,origin:{x:+(u-h).toFixed(1),y:+(p-f).toFixed(1)},metres:{width:+(d.w/t).toFixed(1),height:+(d.h/t).toFixed(1)}}}function Xb(){const n={};for(const[e,t]of Object.entries(oo))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const $a=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],Kb={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function qb(n=0){const[e,t,i]=Kb[$a[n%$a.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function fu(n,e,t,i){const s=$a[n%$a.length],r=new qe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&dt(_,e,31)<.5;let c=0,f=1,d=.3,u=0,p=n*7;const m=(_,w,C,R)=>P=>{if(R&&Math.abs(Math.sin(P[0]*37+P[1]*23+Math.sin(P[2]*17)*2))<.07)return l.STONED;if(P[1]>_-.02&&(P[2]>w-.06||dt(Math.floor(P[0]*30),Math.floor(P[2]*30),C)<.2)&&dt(Math.floor(P[0]*40),Math.floor(P[2]*40),C+1)<.6)return l.MOSS},M=(_,w,C,R,P,I)=>{const O=h(I),k=1+o*.08;r.ell([_,w,C],[R*1.18,R*1.18,.06],l.STONED,{group:P,cut:!0}),r.ell([_,w,C-.02],[R*k,R*k,.035+o*.025],l.CRYSTAL,{group:900+I,paint:G=>{const K=Math.hypot(G[0]-_,G[1]-w)/(R*k);return O?K<.3?l.GLOW:l.CRYSTAL:K<.2+o*.15?l.MAGIC2:K<.5?l.GLOW:K<.78?l.CRYSTAL:l.GLOW}})},g=(_,w,C,R,P,I,O,k)=>G=>{if(G[0]>_+R-.022){const K=Math.min(C,P)*1.5,ie=(I-P-G[2])/K+.5,q=(w-G[1])/K+.5;if(ie>=0&&ie<=1&&q>=0&&q<=1&&(i?c0(i,ie,q,.065):Su(ie,q,O,.12)))return a&&dt(O,e,5)<.5?l.STONED:l.RUNE}return k(G)},x=s.tiers,v=x[0][1]*x[0][2][0]+.02,S=.08,y=x[0][2][2];r.box([0,S,d-y],[v,S,y],l.STONE,{group:f,round:.03,rough:.006,paint:m(S*2,d,3,a)}),r.box([0,S*.9,d],[v-.06,S*.45,.12],l.STONED,{group:f,cut:!0,paint:_=>_[2]<d-.07?l.GLOW:void 0});for(let _=1;_<x[0][1];_++)r.box([-v+_*v*2/x[0][1],S*.9,d-.06],[.015,S*.45,.06],l.STONE,{group:f});c=S*2,f++;const E=[];x.forEach(([_,w,[C,R,P]],I)=>{const O=_==="tweet"?.09:0,k=w*C*2+(w-1)*(_==="tweet"?.14:.01),G=d-I*.035,K=c+O+R;for(let ie=0;ie<w;ie++){const q=-k/2+C+ie*(C*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&ie===w-1){E.push([q,C,R,P]);continue}const se=a&&_==="tweet"?[1,.12*(ie%2?1:-1),0]:void 0,F=a&&_==="tweet"?K-.04:K,ee=m(F+R,G-P+P,f,a),ae=ie===w-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([q,F,G-P],[C-.005,R,P],l.STONE,{group:f,round:.035,rough:.004,dir:se,paint:ae?g(q,F,R,C-.005,P,G,p++,ee):ee}),_==="bass"&&M(q,K+.02,G,Math.min(C,R)*.72,f,u++),_==="mid"&&(r.ell([q,K,G],[C*.8,R*.7,P*.9],l.STONED,{group:f,cut:!0,paint:ue=>ue[2]<G-P*.45?h(u)?l.STONED:l.GLOW:void 0}),r.box([q,K,G-P*.5],[.018,R*.6,P*.45],l.STONE,{group:f}),u++),_==="horn"){const ue=K+R*.25;r.seg([q,ue,G-P*1.5],[q,ue,G+.03],.03,Math.min(C,R)*.78,l.STONED,{group:f,cut:!0,paint:ve=>ve[2]<G-P*.55?h(u)?l.STONED:l.GLOW:void 0}),M(q,K-R*.6,G,R*.22,f,u++)}if(_==="tweet")for(const ue of[-.5,0,.5])M(q+ue*C*1.15,F,G,R*.55,f,u++);f++}if(_!=="tweet"){const ie=a&&_==="horn"?C:0;r.box([-ie,c+R*2+.012,G-.015],[k/2+.01-ie,.012,.015],l.WOOD,{group:f++,round:.008}),c+=.024}_==="tweet"&&!a&&r.flat([0,c+O/2,G-P],[1,0,0],[0,1,0],k/2,O/2,(ie,q)=>Math.abs(q)<.45&&Math.sin(ie*23)>-.4?l.GLOW:null,{group:f++,bend:0}),c+=R*2+O});const b=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,w,C,R],P)=>{if(a&&P%2){r.seg([_,.03,w],[_+.12,.05,w+.04],.04,.02,l.CRYSTAL,{group:700+P});return}const I=[_+R*C,C,w+.05];r.seg([_,0,w],I,.045+C*.05,.006,l.CRYSTAL,{group:700+P,paint:O=>O[1]>C*(.65-o*.1)&&!a?l.GLOW:void 0}),r.seg([_+.04,0,w-.03],[_+.04+R*C*.5,C*.55,w],.03,.005,l.CRYSTAL,{group:720+P})}),!a)for(const[_,w,C,R]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,b+w-.1,C],[R,R*.8,R],l.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,w,C,R]of E)r.box([_+.45,w*.75,d+.25],[w,C,R],l.STONE,{group:f++,dir:[.6,.8,.2],round:.035,rough:.007,paint:m(1,0,9,!0)});return{m:r,top:b}}function $b(n){const e=new qe({blend:.02}),t=(i,s)=>dt(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:f=>Math.abs(Math.sin(f[0]*41+f[1]*29))<.08?l.STONED:f[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function pu(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(dt(s,t,1)*n.w),a=Math.floor(dt(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const Zb=n=>rc(n)*3,tl=new Map;function Jb(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=Zb(n),a=e+":"+r;tl.has(a)||tl.set(a,mn(fu(e,0,"playing").m,{height:r}).s);const o=tl.get(a);if(i==="destroyed")return pu(mn($b(e),{scale:o}).sp,3,e*5+1);const{sp:h}=mn(fu(e,t,i,s).m,{scale:o});return pu(h,i==="damaged"?4:10+t*2,e*5+t)}const Qb=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function jb(){const n={};return Qb.forEach(e=>n[e.k]=e.v),n}function e5(n,e,t,i,s){const r=dc(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*me(i,.9,1.1)),h=to(i,a,r);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=de(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:Uu(o),colours:h}}function t5(n,e,t,i,s){const r=Xt[t].id,a=Ur.find(g=>g.id===r),o=B0(r,n,{K:i,makeCanvas:s}),h=[],c=g=>h.push(g)-1,f={big:[],bigWeight:[],small:[],walls:[],set:null},d=(g,x)=>bn(g,x,n,"none",s),u=(g,x)=>{const{parts:v,colours:S}=e5(a,g,n,zi(e*13+t*101+x*7+1),i);return{bot:c(d(v.bot,S)),top:c(d(v.top,S))}},p=G0(r,n,{K:i,makeCanvas:s}),m=Xt[t].layout.heightMix,M=g=>p.filter(x=>x.heightClass===g).length||1;for(const g of p)f.big.push({bot:c(g.bot),top:c(g.top)}),f.bigWeight.push(m?m[g.heightClass]/M(g.heightClass):g.weight);a.big.forEach(([g],x)=>{g==="tree"&&p.length||(f.big.push({bot:c(o.big[x].sp),top:null}),f.bigWeight.push(p.length?.1:1))}),a.small.forEach(([g,x],v)=>f.small.push(g==="tree"?u(x,500+v):{bot:c(o.small[v].sp),top:null}));for(const g of o.walls)f.walls.push(c(g.sp));return o.setPiece&&(f.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:f,floor:o.floor.sp}}function mu(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(bn(Zf(e,a,o,n,r,i),Kf(e,n,i),n,n.cOutline,t));return s}const n5=(n,e,t=!1)=>(t?8:0)+n*2+e;function Za(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function ms(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),c=new Uint8Array(o*h*4),f=new Uint8Array(o*h*4),d=n.map((u,p)=>{const m=i[p],M=Za(u.A,u.w,u.h),g=Za(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const S=v*u.w*4,y=((m.y+v)*o+m.x)*4;c.set(M.subarray(S,S+u.w*4),y),f.set(g.subarray(S,S+u.w*4),y)}let x=0;e:for(let v=u.h-1;v>=0;v--,x++)for(let S=0;S<u.w;S++)if(M[(v*u.w+S)*4+3]>=128)break e;return{uv:[m.x/o,m.y/h,(m.x+u.w)/o,(m.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(x,u.h)}});return{albedo:c,normal:f,width:o,height:h,frames:d}}function i5(n,e){const t=[],i=[],s=Db(n);for(const r of Rd){const a=Ib(r.id,n);i.push({id:r.id,family:r.family,decal:!!r.decal,frame:t.push(bn(a.whole,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:Pb(n)}}function s5(n,e){const t=[],i=[],s=Dd(n);for(const r of Pd){const a=Yb(r.id,n);i.push({id:r.id,frame:t.push(bn(a.sp,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,pieces:i}}function r5(n,e){const t=[],i=[],s=Bb(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of Ld)for(let o=0;o<a.variants;o++){const h=zb(a.id,n,{variant:o}),c=h.crownY>0&&!r(h.top),f=t.push(bn(c?h.bot:h.whole,s,n,"none",e))-1,d=c?t.push(bn(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:f,top:d,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function a5(n,e){if(n.kind==="creature")return{px:ms(mu(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:r,relics:a,layouts:o}=i5(n.style,e);return{px:ms(r,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:r,pieces:a}=s5(n.style,e);return{px:ms(r,2048),pieces:a}}if(n.kind==="decor"){const{sprites:r,decor:a}=r5(n.style,e);return{px:ms(r,2048),decor:a}}if(n.kind==="party")return{px:ms(mu(n.style,n.species,e,{...Xf(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=t5(n.style,n.seed,n.id,n.K,e);return{px:ms(t),layout:i,floor:{albedo:new Uint8Array(Za(s.A,s.w,s.h)),normal:new Uint8Array(Za(s.N,s.w,s.h)),w:s.w,h:s.h}}}function gu(n,e,t){const i=new Xs(n,e,t,zn,kn);return i.magFilter=zt,i.minFilter=zt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Bn,i.needsUpdate=!0,i}function Id(n){return{albedo:gu(n.albedo,n.width,n.height),normal:gu(n.normal,n.width,n.height),frames:n.frames}}const Er=(n,e=2048)=>Id(ms(n,e));class o5{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const s=uf(e),r=u=>bn(xf(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(m=>r({pose:u,frame:m,facing:p}))))),o=Tu;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,m={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let g=0;g<p;g++)m[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFoot[u]=m}for(const[u,p]of[["fast",3],["brake",2]]){const m={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let g=0;g<p;g++)m[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFly[u]=m}this.witch=Er(a,2048),this.stones=Er([0,1,2,3].map(u=>this.stone(u)));const h=K0(e);this.props=Er([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(bn(Jb(e,{variant:u,frame:p,state:"playing"}),qb(u),e,e.cOutline));this.soundsystems=Er(c,2048);const f=wb(e),d=bb(e);for(const u of[f.bot,f.top])for(let p=Math.max(0,Math.floor(f.anchors.base.y-14));p<u.h;p++)for(let m=0;m<u.w;m++)u.m[p*u.w+m]===l.NOSE&&(u.m[p*u.w+m]=0);if(this.treehouse={atlas:Er([f.bot,f.top].map(u=>bn(u,d,e,"none")),2048),...f.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const m=new Worker(new URL(""+new URL("artWorker-zZuGSHOS.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:m,busy:!1};m.onmessage=g=>{M.busy=!1,M.job=void 0,this.receive(g.data),this.dispatch()},m.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;onFloor=()=>{};stone(e){const t=zi(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new ft(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,l.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),bn(r,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Id(e.result.px);if(e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(s=>[s.id,s])),modern:i.filter(s=>s.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:n5});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift();this.receive({job:s,result:a5(s,(r,a)=>{const o=document.createElement("canvas");return o.width=r,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const er=24,ot={uAmb:{value:new V},uMoon:{value:new V},uMoonDir:{value:new V(-.45,.75,.5).normalize()},uMoonBeam:{value:new V},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new V},uGlowRgb:{value:new V},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new $e},uHazeRange:{value:new $e(70,200)},uHazeColour:{value:new V},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:er},()=>new rt)},uLightCol:{value:Array.from({length:er},()=>new rt)},uLightCount:{value:0},uDisco:{value:new rt},uDiscoParams:{value:new rt},uDiscoColour:{value:new V(1,1,1)},uScenery:{value:new $e(1e6,1)}};function l5(n,e,t,i=1){const s=(r,a)=>new V(r[0]/255*a,r[1]/255*a,r[2]/255*a);ot.uAmb.value.copy(s(de(n.ambientHue,.55,1),n.ambient*i)),ot.uMoon.value.copy(s(de(n.moonHue,.35,1),n.moon)),ot.uMoonBeam.value.copy(s(de(n.moonHue,.35,1),n.shafts*.25)),ot.uBands.value=n.bands,ot.uDither.value=n.dither*.5,ot.uShafts.value=n.shafts,ot.uShaftScale.value=t*2,ot.uGlowRgb.value.copy(s(de(n.glowHue,n.glowSat,1),1)),ot.uGlowR.value=e,ot.uGlowPower.value=n.glowPower,ot.uHazeColour.value.copy(s(de(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const hi=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${er}], uLightCol[${er}];
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
  for (int i = 0; i < ${er}; i++) {
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
`,Qi=2,dn=32,gs=8,c5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,h5=`
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
${hi}
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
    vec2 cell = vec2(mod(float(t), ${gs}.0), floor(float(t) / ${gs}.0));
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
`;class u5{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*Qi/dn)*dn,c=Math.ceil(o*Qi/dn)*dn;this.tilesX=h/dn,this.tilesZ=c/dn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const f=m=>(m.magFilter=m.minFilter=zt,m.generateMipmaps=!1,m.colorSpace=Bn,m.needsUpdate=!0,m);this.texture=f(new Xs(new Uint8Array(h*c*4),h,c)),f(this.tile),this.floors=f(new Xs(new Uint8Array(64*gs*48*4*4),64*gs,192));const d=Array.from({length:32},(m,M)=>new V(...Xt[M]?.floor??[.25,.45,.4])),u=new Mt({vertexShader:c5,fragmentShader:h5,uniforms:{...ot,uAreas:{value:this.texture},uExtent:{value:new rt(r.minX,r.minZ,h/Qi,c/Qi)},uPixel:{value:s},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(m,M)=>{const g=Xt[M]?.layout.terrain??[];return new V(+g.includes("mounds"),+g.includes("hollows"),+g.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new $e(64,48)},uFloorsSize:{value:new $e(64*gs,192)},uSat:{value:i.sat},uFloor:{value:new V(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new rt},uCircle:{value:new rt},uSweeps:{value:Array.from({length:4},()=>new rt)},uSweepCount:{value:0},uClearing:{value:new $e(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Wn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Kt(p,u),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new Xs(new Uint8Array(dn*dn*4),dn,dn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new Xs(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new $e(t%gs*i.w,Math.floor(t/gs)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=dn/Qi,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),f=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(s-a.minZ)/o,m=[];for(let x=f;x<=d;x++)for(let v=h;v<=c;v++)this.filled[x*this.tilesX+v]||m.push([v,x,(v+.5-u)**2+(x+.5-p)**2]);m.sort((x,v)=>x[2]-v[2]);const M=performance.now();let g=0;for(const[x,v]of m){if(g>0&&performance.now()-M>r)break;this.fillTile(e,x,v),g++}return m.length-g}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=dn/Qi,o=s.minX+t*a,h=s.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(f=>f.kind==="pond");for(let f=0;f<dn;f++)for(let d=0;d<dn;d++){const u=o+(d+.5)/Qi,p=h+(f+.5)/Qi,m=this.map.areaAt(u,p),M=(f*dn+d)*4;let g=0;for(const x of c)Math.hypot(u-x.x,p-x.z)<3*x.size&&(g=255);r[M]=m.type,r[M+1]=Math.round(m.openness*255),r[M+2]=g,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new $e(t*dn,i*dn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const nl=oo,d5=new Set(["tarmac","railway","stairs","bridges"]),il=`
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,xu=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${hi}
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
`,f5=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${hi}
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
`;class p5{group=new Ys;constructor(e,t,i){const s=e.paths,r=e.seed,a=Xb(),o=new Map,h=(d,u)=>{const p=e.areaAt(d,u),m=p.cell.join(",");let M=o.get(m);if(!M){const g=(a[Xt[p.type].id]??[]).filter(x=>!d5.has(x)&&nl[x]&&(x!=="magic"||Pe(p.cell[0],p.cell[1],r+831)<.15));M=g.length?g[Math.floor(Pe(p.cell[0],p.cell[1],r+833)*g.length)]:"dirt",o.set(m,M)}return M},c=new Map;s.lines.forEach((d,u)=>{const p=d.kind==="rail"?Math.floor(Pe(u,1,r+835)*3):0,m=d.pts,M=m.length,g=[0];for(let S=1;S<M;S++)g.push(g[S-1]+Math.hypot(m[S][0]-m[S-1][0],m[S][1]-m[S-1][1]));const x=m.map((S,y)=>{const E=m[Math.max(0,y-1)],b=m[Math.min(M-1,y+1)],A=b[0]-E[0],_=b[1]-E[1],w=Math.hypot(A,_)||1;return[-_/w,A/w]}),v=g[M-1];for(let S=0;S<M-1;S++){const y=(m[S][0]+m[S+1][0])/2,E=(m[S][1]+m[S+1][1])/2;if(d.kind==="rail"&&s.railBroken(y,E)||e.hardClear(y,E))continue;const b=d.kind==="stream"?{width:d.half*2,period:4}:null,A=d.kind==="stream"?"stream":d.kind==="rail"?"railway":d.kind==="road"?"tarmac":h(y,E),_=b??nl[A],w=A+":"+p;let C=c.get(w);C||c.set(w,C={pos:[],uv:[]});const R=I=>_.width/2*(d.deadEnd?Math.min(1,(v-g[I])/6):1),P=(I,O)=>{const k=R(I)*O;C.pos.push(m[I][0]+x[I][0]*k,.02,m[I][1]+x[I][1]*k),C.uv.push(O>0?1:0,g[I]/_.period)};P(S,-1),P(S,1),P(S+1,1),P(S,-1),P(S+1,1),P(S+1,-1)}});const f=Dd(t);for(const d of s.junctions){const u=Gb({variant:Math.floor(Pe(d.line,1,r+835)*3)}),p=pn,m=u.w/p,M=u.h/p,g=nl.railway.width/2,x=d.side>0?-d.dz:d.dz,v=d.side>0?d.dx:-d.dx,S=(w,C)=>[d.x+d.dx*(w-g)+x*(C-g),.03,d.z+d.dz*(w-g)+v*(C-g)],y=[S(0,0),S(m,0),S(m,M),S(0,0),S(m,M),S(0,M)].flat(),E=[0,0,1,0,1,1,0,0,1,1,0,1],b=new jl(bn(u,f,t,"none").A);b.magFilter=b.minFilter=zt,b.generateMipmaps=!1,b.flipY=!1,b.colorSpace=Bn;const A=new Zt;A.setAttribute("position",new Lt(y,3)),A.setAttribute("uvw",new Lt(E,2));const _=new Kt(A,new Mt({vertexShader:il,fragmentShader:xu,transparent:!0,depthWrite:!1,side:vi,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6,uniforms:{...ot,uStrip:{value:b},uPixel:{value:i}}}));_.renderOrder=.55,this.group.add(_)}for(const[d,u]of c){const[p,m]=d.split(":"),M=new Zt;if(M.setAttribute("position",new Lt(u.pos,3)),M.setAttribute("uvw",new Lt(u.uv,2)),p==="stream"){const E=new Mt({vertexShader:il,fragmentShader:f5,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...ot,uPixel:{value:i}}}),b=new Kt(M,E);b.frustumCulled=!1,b.renderOrder=.4,this.group.add(b);continue}const g=Hb(p,{variant:+m}).strip,x=bn(g,f,t,"none"),v=new jl(x.A);v.magFilter=v.minFilter=zt,v.generateMipmaps=!1,v.flipY=!1,v.wrapT=ka,v.colorSpace=Bn;const S=new Mt({vertexShader:il,fragmentShader:xu,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...ot,uStrip:{value:v},uPixel:{value:i}}}),y=new Kt(M,S);y.frustumCulled=!1,y.renderOrder=.5,this.group.add(y)}}}const m5="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",g5=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,x5=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,M5=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,v5=`
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
}`;function fs(n,e,t,i=!1){const s=new Zn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Bn,s}class _5{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=fs(1,1,Yt,!0),this.scene.depthTexture=new ir(1,1),this.fx.texture.format=zn;const i=(s,r)=>new Mt({vertexShader:m5,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(g5,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(x5,{uSrc:{value:null},uStep:{value:new $e}}),composite:i(M5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new $e},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(v5,{uSrc:{value:null},uTexel:{value:new $e},uDir:{value:new $e},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Kt(new Wn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=fs(1,1,Yt);bloomB=fs(1,1,Yt);a=fs(1,1,Yt);b=fs(1,1,Yt);fx=fs(1,1,Yt);fxB=fs(1,1,Yt);fxScene=null;quad;cam=new Dc(-1,1,1,-1,0,1);mats;low=new $e(1,1);out=new $e(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,m=>{m.uScene.value=this.scene.texture,m.uThreshold.value=s.bloom.threshold});for(let m=0;m<2;m++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new it),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const m=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,g=>{g.uSrc.value=this.fx.texture,g.uStep.value.set(.6/m,0)}),this.pass("blur",this.fx,g=>{g.uSrc.value=this.fxB.texture,g.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,f=this.fullResolution?this.out.y/this.low.y:1,d=u=>{u.uTexel.value.set(1/h,1/c),u.uStrength.value=s.tiltShift.strength*f,u.uBand.value=s.tiltShift.band,u.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,u=>{d(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{d(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const b5=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,y5=`
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
}`,S5=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,w5=`
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
}`,E5=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class A5{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new V(a.x,0,a.z);const o=new V(...de(r.circleHue2,.4,1).map(g=>g/255));this.ballMat=new Mt({vertexShader:b5,fragmentShader:y5,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:ot.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new Kt(new Wn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new Kt(new Wn(s,h).translate(0,h/2,0),new Mt({fragmentShader:S5,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=r.motes,f=[],d=[];for(let g=0;g<c.count;g++){const x=y=>{const E=Math.sin(g*12.9898+y*78.233)*43758.5453;return E-Math.floor(E)},v=x(1)*Math.PI*2,S=Math.sqrt(x(2))*a.radius*c.column;f.push(a.x+Math.cos(v)*S,.3,a.z+Math.sin(v)*S),d.push(x(3),c.speed*(.6+x(4)*.8),.4+x(5)*1.2,0)}const u=new Zt;u.setAttribute("position",new Lt(f,3)),u.setAttribute("aMote",new Lt(d,4));const p=de(r.circleHue,.55,1);this.motes=new Ka(u,new Mt({vertexShader:w5,fragmentShader:E5,uniforms:{uTime:ot.uTime,uRise:{value:c.rise},uTint:{value:new V(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:ys})),this.motes.frustumCulled=!1;const m=de(r.circleHue,.7,1);this.lightRgb=new V(m[0]/255,m[1]/255,m[2]/255);const M=ot;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),ot.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const T5=[new V(.25,.85,1),new V(.7,.4,1),new V(1,.65,.2)];class R5{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],c=[],f=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const u=d.from?e.map.siteOf(d.from[0],d.from[1]):null;f.push({...d.soundsystem,at:d.at,from:u})}for(const d of f){const u=r.transition>0?Math.min(1,(t-d.at)/r.transition):1,p=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],m=p.h*this.metresPerPixel,M=nn((u-.55)/.45);if(u<1&&d.from){const x=(d.from.x+d.x)/2,v=(d.from.z+d.z)/2,S=Math.hypot(d.x-x,d.z-v)*1.6;h.push({x,z:v,radius:u*S,strength:1-nn((u-.8)/.2)})}if(M>0&&i(d.x,d.z,p.w*this.metresPerPixel,m)){const x=Pe(Math.round(d.x*10),Math.round(d.z*10),911)<.5;a.push({x:d.x,y:-(1-M)*m,z:d.z,frame:p,flip:x,fresh:s(d.x,d.z,m)})}u>=1&&c.push({x:d.x,y:m*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+r.transition});const g=.85+.15*Math.sin(t*8);M>0&&o.push({x:d.x,y:3,z:d.z,reach:r.lightReach,rgb:T5[d.variant%3],strength:r.lightStrength*g*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}function C5(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function L5(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=zi(n.seed*53+t[0]*1031+t[1]*7+509),a=y=>{const E=n.areaAt(y.x,y.z).cell;return E[0]===t[0]&&E[1]===t[1]},o=y=>Pe(Math.round(y.x*10),Math.round(y.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((y,E)=>o(y)-o(E)),c=new Map,f=new Set,d=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),m=(y,E=0)=>(c.get(y)??0)+1<=(f.has(y)?3:2)-E,M=(y,E)=>d.some(b=>C5([y.x,y.z],[E.x,E.z],[b.ax,b.az],[b.bx,b.bz])),g=(y,E)=>{d.push({ax:y.x,az:y.z,bx:E.x,bz:E.z,seed:Math.floor(Pe(Math.round(y.x*10),Math.round(E.z*10),n.seed+503)*1e6)}),c.set(y,(c.get(y)??0)+1),c.set(E,(c.get(E)??0)+1)},x=(y,E,b)=>{let A=y,_=E;const w=[y];for(let C=0;C<b&&m(A);C++){const R=[];for(const O of h){if(O===A||!m(O))continue;const k=O.x-A.x,G=O.z-A.z,K=Math.hypot(k,G);if(!(K<i.spanMin||K>i.spanMax)&&!(_&&(k*_[0]+G*_[1])/K<p)&&!M(A,O)&&(R.push({b:O,d:K}),R.length>=16))break}if(!R.length)break;R.sort((O,k)=>k.d-O.d);const{b:P,d:I}=R[Math.floor(r()*Math.min(4,R.length))];g(A,P),_=[(P.x-A.x)/I,(P.z-A.z)/I],w.push(P),A=P}return w},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),S=[];for(const y of h){if(u.length>=v)break;if(c.has(y)||u.some(A=>Math.hypot(A.x-y.x,A.z-y.z)<i.spread))continue;u.push(y);const E=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),b=x(y,null,E);for(let A=1;A<b.length-1;A++){if(r()>=i.junctionChance)continue;const _=b[A],w=b[A+1],C=w.x-_.x,R=w.z-_.z,P=Math.hypot(C,R),I=r()<.5?1:-1;f.add(_),S.push({from:_,heading:[-R/P*I,C/P*I]})}}for(const y of S)x(y.from,y.heading,i.spansPerRun[0]+Math.floor(r()*3));return d}const Ot={uRight:{value:new V(1,0,0)},uUp:{value:new V(0,1,0)},uFacing:{value:new V(0,0,1)},uTopFade:{value:0},uCutout:{value:new rt(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new $e(1,1)},uWitch:{value:new rt(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new rt(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new rt)},uPartyCol:{value:Array.from({length:16},()=>new V)},uPartyCount:{value:0},uUplight:{value:new rt}},sl=`
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
`,rl=`
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
${hi}
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
`;class ii{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Wn(1,1);s.translate(0,.5,0),this.geo=new Ic,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...ot,...Ot,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uFadePass:{value:0},uFlat:{value:i.flat?1:0},uSilhouette:{value:new rt(0,0,0,0)},...h}),a=i.scenery?{blending:io,blendSrc:Mc,blendDst:vc}:{},o=new Mt({vertexShader:sl,fragmentShader:rl,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new Kt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new Kt(this.geo,new Mt({vertexShader:sl,fragmentShader:rl,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new Kt(this.geo,new Mt({vertexShader:sl,fragmentShader:rl,uniforms:r({uSilhouette:{value:new rt(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Ua}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new Lc(new Float32Array(t*s),s);return a.setUsage(Js),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const P5=`
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
}`,D5=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${hi}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,I5=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,O5=`
varying vec3 vWorld;
${hi}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,N5=`
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
}`,F5=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${hi}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class U5{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new it(r));const s={...ot,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Mt({vertexShader:P5,fragmentShader:D5,uniforms:{...s,uRes:Ot.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new Mt({vertexShader:I5,fragmentShader:O5,uniforms:s}),this.moteMat=new Mt({vertexShader:N5,fragmentShader:F5,uniforms:{...ot,uMoteColour:{value:new it(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:ys})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],f=[],d=[],u=[];e.forEach((_,w)=>{const C=Math.hypot(_.bx-_.ax,_.bz-_.az),R=Math.max(2,Math.round(C/a.bulbSpacing)),P=I=>[_.ax+(_.bx-_.ax)*I,o-a.sag*4*I*(1-I)*(C/8),_.az+(_.bz-_.az)*I];for(let I=0;I<=16;I++){const O=P(I/16),k=P((I+1)/16);I<16&&(d.push(...O,...k),u.push(w+I/16,w+(I+1)/16))}for(let I=1;I<R;I++){const O=I/R,k=P(O),G=this.palette[(_.seed+I)%this.palette.length];h.push(...k),c.push(G.r,G.g,G.b),f.push((_.seed*13+I*7)%100/100,w*40+I,t(k[0],k[2])+I*.03,4*O*(1-O))}});const p=new Ys,m=new Zt;m.setAttribute("position",new Lt(h,3)),m.setAttribute("aColour",new Lt(c,3)),m.setAttribute("aBulb",new Lt(f,4));const M=new Zt;M.setAttribute("position",new Lt(d,3)),M.setAttribute("aSway",new Lt(u,1)),p.add(new Pc(M,this.wireMat),new Ka(m,this.bulbMat));const g=this.game.tuning.party.motes,x=this.game.map,v=[],S=[],y=x.areaSize*1.1,E=Math.round(Math.PI*y*y/400*g.perPatch);for(let _=0;_<E;_++){const w=k=>{const G=Math.sin(s*12.9898+_*78.233+k*37.719)*43758.5453;return G-Math.floor(G)},C=w(1)*Math.PI*2,R=Math.sqrt(w(2))*y,P=i.x+Math.cos(C)*R,I=i.z+Math.sin(C)*R,O=x.areaAt(P,I).cell;O[0]!==r[0]||O[1]!==r[1]||(v.push(P,g.from,I),S.push(w(3),g.speed*(.6+w(4)*.8),.3+w(5)*.8,t(P,I)))}const b=new Zt;b.setAttribute("position",new Lt(v,3)),b.setAttribute("aMote",new Lt(S,4));const A=new Ka(b,this.moteMat);return A.frustumCulled=!1,p.add(A),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=L5(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),c=r.from?e.map.siteOf(r.from[0],r.from[1]):null,f=c?(c.x+h.x)/2:h.x,d=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-f,h.z-d)*1.6:1,p=e.tuning.party.transition,m=(M,g)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-f,g-d)/u)*p;a={lines:o,group:this.build(o,m,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const jt=32,Gs=16,k5=`
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
}`,B5=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${hi}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class Mu{mesh;geo=new Ic;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Wn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Kt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new Lc(r,a).setUsage(Js));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,c,f=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,i],d*3),this.size[d]=s,this.uv.set(r,d*4),this.col.set([a,o,h,c],d*4),this.draw[d]=f}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const z5=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],H5=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class G5{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=jt*Gs;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(jt/2,jt/2,0,jt/2,jt/2,jt/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,jt,jt),this.tex=new jl(this.canvas),this.tex.magFilter=zt,this.tex.minFilter=zt,this.tex.generateMipmaps=!1;const r=a=>new Mt({vertexShader:k5,fragmentShader:B5,uniforms:{...ot,uRight:Ot.uRight,uUp:Ot.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:ys});this.standing=new Mu(r(0)),this.flat=new Mu(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new V;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%Gs*jt,o=Math.floor(s/Gs)*jt;r.clearRect(a,o,jt,jt),o0(r,e,{x:a+1,y:o+1,size:jt-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,jt,jt);for(let f=3;f<h.data.length;f+=4)h.data[f]=h.data[f]>90?255:0;r.putImageData(h,a,o);const c=Pr(e);return this.colours.set(e,new it(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=jt*Gs,i=e%Gs*jt,s=Math.floor(e/Gs)*jt;return[i/t,1-s/t,(i+jt)/t,1-(s+jt)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,f=h.bond,d=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const b of o.events)b.kind==="fizzled"&&this.fizzles.push({x:b.x,z:b.z,at:e}),b.kind==="invited"&&this.bursts.push({x:b.x,z:b.z,at:e,seed:b.id});this.fizzles=this.fizzles.filter(b=>e-b.at<.7),this.bursts=this.bursts.filter(b=>e-b.at<.9);for(const b of this.bursts){const A=(e-b.at)/.9;for(let _=0;_<28;_++){const w=Pe(b.seed,_,3)*Math.PI*2,C=2+Pe(b.seed,_,5)*3,R=2+Pe(b.seed,_,7)*3,P=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(b.x+Math.cos(w)*C*A,.6+R*A-4*A*A,b.z+Math.sin(w)*C*A,.3,u,P[0],P[1],P[2],1-A)}}const p=(b,A,_)=>{const w=a.creatures[b],C=28,R=_?1:.45;for(let P=0;P<C;P++){const I=Math.PI/2-P/C*Math.PI*2,O=P/C<A;!_&&!O||this.flat.add(w.x+Math.cos(I)*1.5,0,w.z+Math.sin(I)*1.1,.35,u,1,O?.6:.9,O?.9:1,(O?.9:.18)*R)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[b,A]of o.progress)o.talk?.id!==b&&p(b,Math.min(1,A/Hu(a.creatures[b],h)),!1);const m=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),g=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},v=r;for(let b=o.stack.length-1;b>=0;b--){const A=o.stack[b],_=a.creatures[A],w=o.stack.length-1-b,C=this.chain[w],R=(2+_.level*.4)*m.scale,P=Math.sin(e*1.7+w*.9)*m.idleSway*(1+w*.5),I=x.x-c.vx*m.trail+P,O=x.z-c.vz*m.trail;C.vx+=((I-C.x)*m.stiffness-C.vx*m.damping)*M,C.vz+=((O-C.z)*m.stiffness-C.vz*m.damping)*M,C.x+=C.vx*M,C.z+=C.vz*M,x=C,v+=(w===0?m.offset*R:m.gap*R)+R/2;const k=new V(c.x+C.x,v,c.z+C.z);v+=R/2,g.set(A,k);const G=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(k.x,k.y,k.z,R,this.uv(this.slotOf(_.species,_.level)),G.r,G.g,G.b,1)}for(const b of o.placed){const A=a.creatures[b.id],_=this.slotOf(A.species,A.level),w=this.colours.get(A.species),C=.8+.2*Math.sin(e*2+b.id);this.flat.add(b.x,0,b.z,3+A.level*.8,this.uv(_),w.r*C,w.g*C,w.b*C,1,Math.min(1,(e-b.at)/.8)),this.flat.add(b.x,0,b.z,5,u,w.r,w.g,w.b,.25)}const S=h.sigilProjection,y=c.lift*c.lift*(3-2*c.lift);if(y>.01)for(const b of o.placed){const A=a.creatures[b.id],_=this.colours.get(A.species),w=h.treetopHeight-4+S.height,C=.85+.15*Math.sin(e*1.3+b.id);this.flat.add(b.x,w,b.z,(3+A.level*.8)*S.size,this.uv(this.slotOf(A.species,A.level)),_.r,_.g,_.b,S.opacity*y*C);for(let R=1;R<w;R+=1.5)this.standing.add(b.x,R,b.z,.3,u,_.r,_.g,_.b,S.beam*y*C*(.6+.4*Math.sin(R*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(b=>Math.hypot(b.x-c.x,b.z-c.z)<=d.pickRadius)){const b=a.creatures[o.stack[o.stack.length-1]],A=this.colours.get(b.species),_=Gu(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+b.level*.8,this.uv(this.slotOf(b.species,b.level)),_?1:A.r,_?.1:A.g,_?.1:A.b,.22)}for(const b of this.fizzles){const A=1-(e-b.at)/.7;this.flat.add(b.x,0,b.z,3*(1+(1-A)*.6),u,1,.15,.1,A)}const E=[...o.stack,...o.placed.map(b=>b.id)];for(const b of E){const A=a.creatures[b],_=this.colours.get(A.species);if(!_)continue;const w=wp(o,b,c.x,c.z);f.rim&&this.flat.add(A.x,0,A.z,1.8,u,_.r,_.g,_.b,.35);const C=g.get(b)??new V(w.x,.2,w.z);if(f.sparks){const P=Math.max(.5,f.sparkEvery),I=(e+b*.618%1*P)%P;if(I<.7){const O=I/.7;this.standing.add(C.x+(A.x-C.x)*O,C.y+(.6-C.y)*O+Math.sin(O*Math.PI)*1.2,C.z+(A.z-C.z)*O,.35,u,_.r,_.g,_.b,1)}}const R=Math.hypot(A.x-w.x,A.z-w.z);if(f.thread&&R>d.length*.85){const P=Math.min(1,(R-d.length*.85)/d.length),I=Math.min(60,Math.floor(R/1.2));for(let O=1;O<I;O++){const k=(O+e*2%1)/I;this.standing.add(C.x+(A.x-C.x)*k,C.y+(.5-C.y)*k,C.z+(A.z-C.z)*k,.22,u,_.r,_.g,_.b,.25+.75*P)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=r.witch,f=(S,y,E,b)=>{this.v.set(y,E,b).project(t),S.style.left=`${(this.v.x+1)/2*i}px`,S.style.top=`${(1-this.v.y)/2*s}px`},d=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),f(o,c.x-1.2,tr(c,r.tuning)+2.2,c.z));return}const p=r.creatures[a.id];if(f(o,c.x-1.2,tr(c,r.tuning)+2.2,c.z),f(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(d,Pe(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const m=Math.floor(a.t/Sp(p,r.tuning)),M=Math.min(1,a.t/a.total),g=(S,y)=>S[Math.floor(Pe(a.id,y,5)*S.length)%S.length],x=[4,2,0][Math.min(2,p.level)],v=Math.round(x+(4-x)*M);this.emoji(o,g(z5,m-m%2)),o.classList.toggle("on",m%2===0),m>=1?this.emoji(d,g(H5[v],m-(m+1)%2)):this.say(d,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=m%2===1?"1":"0.6"}}const W5=[1,3,5,7,9],Od=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function V5(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=Od(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),c=n-h*o,f=Dn(s.duty*t,0,1),u=Pe(e,h,311)<f?nn(c/Math.max(.001,s.fadeIn))*nn((o-c)/Math.max(.001,s.fadeOut)):0,p=Math.floor(c/a),m=W5.filter(y=>y<=s.maxCount),M=m[Math.floor(Pe(e,h*64+p,313)*m.length)%m.length]??1,g=e%97*.37,x=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+g)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+g*2),S=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:x,open:v,hue:S}}const Y5=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,X5=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Ar=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],K5=n=>{const e=(n%1+1)%1*Ar.length,t=Math.floor(e),i=e-t,s=Ar[t%Ar.length],r=Ar[(t+1)%Ar.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class q5{constructor(e,t){this.game=t,this.mesh=new Pc(this.geo,new Mt({vertexShader:Y5,fragmentShader:X5,transparent:!0,depthWrite:!1,blending:ys})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Zt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=Od(r),h=o*a.blockBars,c=[],f=[],d=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const m=V5(e,u.seed,1,r),M=e-u.ready,g=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,x=Math.max(m.on,g),v=g>m.on?a.maxCount:m.count;if(x<=.01)continue;const S=a.spread*Math.PI/180*m.open;for(let y=0;y<v;y++){const E=v===1?0:y/(v-1)-.5,b=a.maxTilt*Math.PI/180,A=Math.max(-b,Math.min(b,E*S+m.sweep)),_=Math.sin(A),w=Math.cos(A),C=-.15*Math.cos(A*3+u.seed),R=K5(m.hue+y*.07),P=a.opacity*x*p;c.push(u.x,u.y,u.z,u.x+_*a.length,u.y+w*a.length,u.z+C*a.length),f.push(...R,P,...R,P),d.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(f.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new Hn(this.pos,3).setUsage(Js)),this.geo.setAttribute("aCol",new Hn(this.col,4).setUsage(Js)),this.geo.setAttribute("aU",new Hn(this.u,1).setUsage(Js))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(f),this.u.set(d);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*$5(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(x,v)=>{if(x<o.minX||x>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const S=n.areaAt(x,v).cell;return`${S[0]},${S[1]}`},c=`${e[0]},${e[1]}`,f=Math.ceil(2*r/a),d=s.x-r,u=s.z-r,p=[];for(let x=0;x<=f;x++){for(let v=0;v<=f;v++)p.push(h(d+v*a,u+x*a));yield}const m=new Set,M=Math.max(1,Math.round(a/t)),g=a/M;for(let x=0;x<f;x++,yield)for(let v=0;v<f;v++){const S=[p[x*(f+1)+v],p[x*(f+1)+v+1],p[(x+1)*(f+1)+v],p[(x+1)*(f+1)+v+1]];if(!S.includes(c)||S.every(E=>E===c))continue;const y=[];for(let E=0;E<=M;E++)for(let b=0;b<=M;b++)y.push(h(d+v*a+b*g,u+x*a+E*g));for(let E=0;E<=M;E++)for(let b=0;b<=M;b++){const A=y[E*(M+1)+b],_=d+v*a+b*g,w=u+x*a+E*g;for(const[C,R]of[[1,0],[0,1]]){if(b+C>M||E+R>M)continue;const P=y[(E+R)*(M+1)+b+C];if(A===P||A!==c&&P!==c)continue;const I=_+C*g*.5,O=w+R*g*.5,k=`${Math.round(I*4)},${Math.round(O*4)}`;m.has(k)||(m.add(k),i.push({x:I,z:O,other:A===c?P:A}))}}}}const Z5=`
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
}`,J5=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${hi}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class Q5{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Ka(this.geo,new Mt({vertexShader:Z5,fragmentShader:J5,uniforms:{...ot,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:ys})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Zt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const f=e.map.siteOf(c.cell[0],c.cell[1]),d=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=d?(d.x+f.x)/2:f.x,p=d?(d.z+f.z)/2:f.z,m=e.map.areaSize*1.6,M=e.tuning.party.transition,g=Pr(Xt[e.map.typeOf(c.cell[0],c.cell[1])].creature),x={points:[],colour:new it(g[0]/255,g[1]/255,g[2]/255),on:(v,S)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,S-p)/m)*M,done:!1};this.areas.set(h,x),this.jobs.push({key:h,gen:$5(e.map,c.cell,t.step,x.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(r.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new Lt(r,3)),this.geo.setAttribute("aColour",new Lt(a,3)),this.geo.setAttribute("aSpark",new Lt(o,2))}}const j5=["#ff6fcf","#5fe8ff","#ffe25c"];class ey{canvas=document.createElement("canvas");g;v=new V;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,s,r,a,o,h,c,f){const d=this.v.set(s,1,r).project(e),u=Math.max(Math.abs(d.x),Math.abs(d.y)),p=d.z<1?Math.min(1,Math.max(0,(u-.9)/.25)):1;if(p<=.01){this.canvas.style.display="none";return}let m=d.x,M=d.y;d.z>=1&&(m=-m,M=-M);const g=1/Math.max(Math.abs(m)/.86,Math.abs(M)/.8,1e-6),x=(m*g+1)/2*t,v=(1-M*g)/2*i,S=Math.hypot(s-a,r-o),y=Math.max(.25,Math.min(1,1-S/900));this.canvas.style.display="block",this.canvas.style.left=`${x-48}px`,this.canvas.style.top=`${v-48}px`;const E=this.g,b=Math.atan2(-M,m);E.clearRect(0,0,96,96),E.save(),E.translate(48,48),E.rotate(b);const A=h*c/60,_=A-Math.floor(A);for(let w=0;w<3;w++){const C=(10+w*9+_*9)*(.7+.3*y),R=p*y*(1-(w+_)/3.2);E.strokeStyle=j5[w],E.globalAlpha=Math.max(0,R),E.lineWidth=3,E.beginPath(),E.arc(26,0,C,Math.PI-.7,Math.PI+.7),E.stroke()}f&&(E.rotate(-b),E.globalAlpha=.8,E.fillStyle="#fff",E.font="10px monospace",E.textAlign="center",E.fillText(`${Math.round(S)} m`,0,40)),E.restore()}}class ty{canvas=document.createElement("canvas");g;v=new V;d=new V;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(R,P)=>{const I=this.v.set(R,0,P).project(e);return[(I.x+1)/2*t,(1-I.y)/2*i,I.z]};a.clearRect(0,0,t,i);const h=(R,P,I,O,k)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(R,P),a.lineTo(I,O),a.stroke(),a.strokeStyle=`rgba(255,255,255,${k})`,a.lineWidth=1,a.beginPath(),a.moveTo(R,P),a.lineTo(I,O),a.stroke()},c=(R,P,I,O)=>{a.font="10px ui-monospace, monospace",a.textAlign=O,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(R,P+1,I+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(R,P,I)},f=this.ground(e,0,-.98),d=this.ground(e,0,.98)??this.ground(e,0,.3);if(!f||!d)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),m=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,g=Math.min(u.x,m.x),x=Math.max(p.x,M.x),v=Math.min(d.z,m.z),S=f.z;for(let R=Math.ceil(g/10)*10;R<=x;R+=10){const P=o(R,v),I=o(R,S);h(P[0],P[1],I[0],I[1],R%50===0?.28:.1)}for(let R=Math.ceil(v/10)*10;R<=S;R+=10){const P=o(g,R),I=o(x,R);h(P[0],P[1],I[0],I[1],R%50===0?.28:.1)}const y=i-6;h(0,y,t,y,.6);for(let R=Math.ceil((u.x-s)/2)*2;s+R<=p.x;R+=2){const P=o(s+R,f.z)[0],I=R%10===0;h(P,y,P,y-(I?10:5),.6),I&&c(`${R}`,P,y-18,"center")}const E=6;h(E,0,E,i,.6);for(let R=Math.ceil((r-f.z)/2)*2;r-R>=d.z-1e-6&&R<400;R+=2){const P=o(s,r-R)[1],I=R%10===0;P<0||P>i||(h(E,P,E+(I?10:5),P,.6),I&&c(`${R}`,E+14,P,"left"))}const b=o(s,r),A=this.ground(e,-1,1-b[1]/i*2),_=this.ground(e,1,1-b[1]/i*2),w=A&&_?Math.round(_.x-A.x):0,C=Math.round(e.position.y);c(`camera ${C} m up · ${w} m across at the witch`,t-12,i-24,"right")}}const ny=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,iy=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${hi}
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
}`;class sy{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new Mt({vertexShader:ny,fragmentShader:iy,uniforms:{...ot,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?wi:Zs}),this.mesh=new Kt(new Wn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const ry=`
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
}`,ay=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${hi}
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
}`;class oy{mesh;geo=new Ic;attr;capacity=0;constructor(e,t=!0){const i=new Wn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new Mt({vertexShader:ry,fragmentShader:ay,uniforms:{...ot,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:io,blendSrc:gc,blendDst:xc}:{}});this.mesh=new Kt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Lc(new Float32Array(this.capacity*4),4),this.attr.setUsage(Js),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const ly=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function cy(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}function hy(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class uy{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=ly(s),this.renderer=new vb({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Nr,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new Un(s.camera.fov,1,1,900),this.post=new _5(this.renderer,s),this.scene.background=new it(723478),l5({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient),ot.uGlowPower.value=s.glowPower,this.assets=new o5(i,t.seed,s.pixelSize),this.ground=new u5(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new oy(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";ot.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new sy(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Sh,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ot.uHazeRange.value.set(s.haze.near,s.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new p5(t.map,i,this.mpp).group);const o=s.occlusion;this.witchBatch=new ii(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ot.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Ot.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new ii(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.stoneBatch=new ii(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,c=[],f=t.tuning.dancefloor.stones;for(let u=0;u<f;u++){const p=u/f*Math.PI*2+.3;c.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(c),this.propBatch=new ii(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new R5(this.assets.soundsystems,this.mpp),this.strings=new U5(this.scene,t),this.leashView=new G5(this.scene,t),this.lasers=new q5(this.scene,t),this.borders=new Q5(this.scene,t),this.soundBatch=new ii(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new A5(t.map,s,Ot,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const d=s.fx==="smooth"?new Mt({transparent:!0,depthWrite:!1,blending:io,blendSrc:gc,blendDst:xc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new Mt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Kt(new Wn(1.4,.7).rotateX(-Math.PI/2),d),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Sh;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new ey(document.body);rulers=new ty(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Ot.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<Xt.length;e++)this.assets.prefetchType(e);for(const e of Xt)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes))),s}frustum=new Va;frustumTo=new Va;cullCam=new Un;box=new cr;m4=new Ht;v3=new V;v3b=new V;v3c=new V;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=yu({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:qn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const f of[-1,1])for(const d of[-1,1]){const u=this.v3.set(f,d,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let m=u.y<-.001?(p-h.y)/u.y:1/0;m>0||(m=1/0),m=Math.min(m,c),s.push([h.x+u.x*m,h.z+u.z*m])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+r;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,c,f]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+f),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[c,...f]=a.split("|"),[d,u,p]=h??f.map(Number),m=this.game.witch;!(e==="placed"&&Math.hypot(+d-m.x,+u-m.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+d,+u,+p)&&this.pops.push(`${o} ${c} ${(+d).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=rh(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,f=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,d=this.budget.radius,u=Math.min(i.haze.far,d+r/2),p=Math.abs(d-this.lastBuild.radius)>=r/3,m=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!f&&!m&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:d},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,r),g=(M.minX+M.maxX)/2,x=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2,S=[],y=ot.uMoonDir.value,E=-y.x/Math.max(.2,y.y),b=-y.z/Math.max(.2,y.y),A=new Map,_=(F,ee)=>{let ae=A.get(F);ae||A.set(F,ae=[]),ae.push(ee)},w=this.mpp,C=a.angle*Math.PI/180,R=Ot.uUp.value.dot(this.v3.set(0,Math.cos(C),-Math.sin(C))),P=Ot.uUp.value,I=(F,ee,ae,ue)=>{const ve=(ae.pad??0)*ue;return{x:F-P.x*ve,y:-P.y*ve,z:ee-P.z*ve}};let O=0,k=0;for(const F of t.forest.treesNear(g,x,v)){const ee=this.assets.typeArt(F.type);if(!ee||!ee.layout.big.length)continue;const ae=ee.atlas.frames,ue=ee.layout.big[hy(ee.layout.bigWeight,F.variant)],ve=ae[ue.top??ue.bot];if(!this.inView(F.x,F.z,ve.w*w,ve.h*w,r,u))continue;const Se=ve.h*w,B=i.treeCap,z=Se>B.from?(B.from+(Se-B.from)*B.keep)/Se:1,N=this.mark("tree",F.x,F.z,Se*z),Z=I(F.x,F.z,ae[ue.bot],w*z);_(F.type,{...Z,frame:ae[ue.bot],flip:F.flip,fresh:N,scale:z}),ue.top!==null&&_(F.type,{...Z,frame:ae[ue.top],flip:F.flip,top:!0,fresh:N,scale:z});const j=ve.w*w,ce=ve.h*w*(ue.top===null?.2:.6);i.shadows.trees&&S.push({x:F.x+E*ce,z:F.z+b*ce,w:j*.8,d:j*.45,scenery:!0}),O++}const G=(F,ee,ae)=>{for(const ue of ee){const ve=this.assets.typeArt(ue.type);if(!ve)continue;const Se=ae(ve.layout);if(!Se.length)continue;const B=Se[ue.variant%Se.length],z=ve.atlas.frames,N=z[B.bot],Z=z[B.top??B.bot],j=F==="setpiece"?i.setPieceScale:1,ce=w*j;let oe=ue.x,fe=ue.z;if(B.origin){const We=ue.flip?N.w-B.origin.x:B.origin.x;oe+=(N.w/2-We)*ce,fe+=(N.h-(N.pad??0)-B.origin.y)*ce*R/Math.max(.2,Math.sin(C))}if(!this.inView(oe,fe,Z.w*ce,Z.h*ce,r,u))continue;const xe=this.mark(F,ue.x,ue.z,Z.h*ce),Me=I(oe,fe,N,ce);_(ue.type,{...Me,frame:N,flip:ue.flip,fresh:xe,scale:j}),B.top!==null&&_(ue.type,{...Me,frame:z[B.top],flip:ue.flip,top:!0,fresh:xe,scale:j});const ye=N.w*ce*.3;F!=="setpiece"&&S.push({x:ue.x,z:ue.z-ye*.4,w:N.w*ce*.8,d:ye,scenery:!0}),k++}};G("small",t.forest.bushesNear(g,x,v),F=>F.small),G("wall",t.forest.wallsNear(g,x,v),F=>F.walls.map(ee=>({bot:ee,top:null}))),G("setpiece",t.forest.setPiecesNear(g,x,v),F=>F.set===null?[]:[F.set]);const K=this.assets.decorArt(),ie=[];if(K)for(const F of t.forest.decorNear(g,x,v)){const ee=K.families[F.family];if(!ee?.length)continue;const ae=ee[F.variant%ee.length],ue=K.atlas.frames,ve=ue[ae.bot],Se=ue[ae.top??ae.bot];if(!this.inView(F.x,F.z,Se.w*w,Se.h*w,r,u))continue;const B=this.mark("decor",F.x,F.z,Se.h*w),z=I(F.x,F.z,ve,w);ie.push({...z,frame:ve,flip:F.flip,fresh:B}),ae.top!==null&&ie.push({...z,frame:ue[ae.top],flip:F.flip,top:!0,fresh:B});const N=ve.w*w*.3;S.push({x:F.x,z:F.z-N*.4,w:ve.w*w*.8,d:N,scenery:!0}),k++}const q=this.assets.pathPieceArt();if(q){const F=[],ee=Ot.uRight.value;for(const ae of t.map.paths.pieces){if(Math.abs(ae.x-g)>v||Math.abs(ae.z-x)>v)continue;const ue=q.byId[ae.id];if(!ue)continue;const ve=q.atlas.frames[ue.frame],Se=(ue.originX-ve.w/2)*w,B=Math.max(0,ve.h-(ve.pad??0)-ue.originY)*w,z=I(ae.x-ee.x*Se,ae.z-ee.z*Se+B*R/Math.max(.2,Math.sin(C)),ve,w);if(!this.inView(z.x,z.z,ve.w*w,ve.h*w,r,u))continue;F.push({...z,frame:ve,flip:!1,fresh:this.mark("pathpiece",ae.x,ae.z,ve.h*w)});const N=ve.w*w*.25;S.push({x:ae.x,z:ae.z,w:ve.w*w*.7,d:N,scenery:!0}),k++}this.batchFor(this.decorBatches,"pieces",()=>new ii(q.atlas,w,{scenery:!0,fade:!0}))?.set(F)}const se=this.assets.relicArt();if(se){const F=this.camera.getWorldDirection(this.v3b),ee=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),ae=Ot.uUp.value,ue=Ot.uRight.value,ve=ae.dot(ee)/Math.max(.2,-F.y),Se=[],B=[],z=(N,Z,j,ce)=>{const oe=se.atlas.frames[N.frame],fe=N.decal?0:oe.pad??0,xe=(N.originX-oe.w/2)*w*(ce?-1:1),Me=Math.max(0,oe.h-fe-N.originY)*w*ve,ye=N.decal?{x:Z-ue.x*xe,y:0,z:j-ue.z*xe+Me}:I(Z-ue.x*xe,j-ue.z*xe+Me,oe,w);this.inView(ye.x,ye.z,oe.w*w,oe.h*w,r,u)&&((N.decal?B:Se).push({...ye,frame:oe,flip:ce,fresh:this.mark("relic",Z,j,oe.h*w)}),N.decal||S.push({x:Z,z:j,w:oe.w*w*.6,d:oe.w*w*.22,scenery:!0}),k++)};if(se.modern.length)for(const N of t.forest.relicsNear(g,x,v))z(se.modern[N.variant%se.modern.length],N.x,N.z,N.flip);for(const N of t.map.grounds)if(!(Math.abs(N.x-g)>v+N.r||Math.abs(N.z-x)>v+N.r))for(const Z of se.layouts[N.kind]??[]){const j=se.byId[Z.id];j&&z(j,N.x+Z.x,N.z+Z.z,!1)}this.batchFor(this.decorBatches,"relics",()=>new ii(se.atlas,w,{scenery:!0,fade:!0}))?.set(Se),this.batchFor(this.decorBatches,"decals",()=>{const N=new ii(se.atlas,w,{scenery:!0,flat:!0});for(const Z of N.meshes)Z.renderOrder=-.5,Z.material.depthWrite=!1;return N})?.set(B)}K&&this.batchFor(this.decorBatches,"all",()=>new ii(K.atlas,w,{scenery:!0,fade:!0}))?.set(ie);for(const[F,ee]of this.typeBatches)A.has(F)||ee.set([]);for(const[F,ee]of A)this.batchFor(this.typeBatches,F,()=>{const ue=this.assets.typeArt(F);return ue&&new ii(ue.atlas,w,{scenery:!0,fade:!0})})?.set(ee);{const F=t.map.treehouse;S.push({x:F.x,z:F.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=O,this.stats.bushes=k,this.shadowList=S}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const f=c.leashed?this.assets.partyArt(c.species,c.id,Pr(c.species)):void 0,d=f??this.assets.creatureArt(c.species),u=f?`party-${c.id}`:c.species;if(!d)continue;r.set(u,d);const p=d.atlas.frames[d.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const m=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=s.get(u);M||s.set(u,M=[]);const g=(e/o+c.id%4*.25)*Math.PI,x=c.leashed?Math.abs(Math.sin(g))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(g*.5)*.12:0;M.push({x:c.x+v,y:x,z:c.z,frame:p,flip:c.facing<0,fresh:m}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,f]of this.creatureBatches)s.has(c)||f.set([]);for(const[c,f]of s)this.batchFor(this.creatureBatches,c,()=>{const u=r.get(c);return u&&new ii(u.atlas,this.mpp)})?.set(f);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new V(1,.5,.16);runeCyan=new V(.3,.9,1);runeViolet=new V(.75,.45,1);runeGreen=new V(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=Pe(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:c,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(er,this.game.tuning.lightBudget),r=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,f)=>c.d-f.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=ot;let h=0;for(const{l:c,d:f}of r.slice(0,s)){const d=Math.min(1,Math.max(0,(a-f)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*d),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Pc(new Zt,new pd({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Ot.uRight.value,i=Ot.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,m)=>[a.x+t.x*p*o+i.x*m*a.h,t.y*p*o+i.y*m*a.h,a.z+t.z*p*o+i.z*m*a.h],c=h(-1,0),f=h(1,0),d=h(1,1),u=h(-1,1);s.push(...c,...f,...f,...d,...d,...u,...u,...c,...c,...d)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new Lt(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=Ot.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),c=i[0].pad??0,f=Math.max(0,i[0].h-c-t.base.y)*r,d=c*r,u=s.x-(t.base.x-i[0].w/2)*r,p=s.z+f*h/Math.max(.2,Math.sin(o)),m={x:u-a.x*d,y:-a.y*d,z:p-a.z*d};return this.treehouseBatch.set([{...m,frame:i[0],flip:!1},{...m,frame:i[1],flip:!1,top:!0}]),m}render(e,t=!0){const i=this.game,s=i.tuning,r=rh(i);if(t){const oe=performance.now();this.lastReal&&(this.budget=cy(this.budget,(oe-this.lastReal)/1e3,s)),this.lastReal=oe}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),ot.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new V(0,Math.cos(a),-Math.sin(a)),c=new V(r.tx,r.ty,r.tz),f=c.dot(h),d=c.x;c.addScaledVector(h,Math.round(f/o)*o-f),c.x+=Math.round(d/o)*o-d;const u=new V(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=s.spriteTilt;Ot.uUp.value.set(0,1,0).lerp(h,p).normalize(),Ot.uFacing.value.crossVectors(Ot.uRight.value,Ot.uUp.value).normalize();const m=nh(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const g=this.v3.set(i.witch.x,tr(i.witch,s)*.5,i.witch.z).project(this.camera);Ot.uCutout.value.set((g.x*.5+.5)*this.width,(g.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-m),Math.max(1,M.edge*this.width*(1-m))),Ot.uTopFade.value=m,Ot.uDebugCull.value=this.debugCull?1:0;const x=i.witch,v=tr(x,s);ot.uGlowPos.value.set(x.x,v+s.glowHeight,x.z),ot.uHazeCentre.value.set(x.x,x.z),this.updateSources(e);const S=this.partyView.update(i,e,(oe,fe,xe,Me)=>this.inView(oe,fe,xe,Me,4),()=>!1);this.soundBatch.set(S.items),this.ground.setSweeps(S.sweeps),this.lasers.update(e,S.playing,x.x,x.z);{const oe=Ot,fe=s.party,xe=[...i.party.areas.values()].map(Me=>({a:Me,s:i.map.siteOf(Me.cell[0],Me.cell[1])})).sort((Me,ye)=>Math.hypot(Me.s.x-x.x,Me.s.z-x.z)-Math.hypot(ye.s.x-x.x,ye.s.z-x.z)).slice(0,16);xe.forEach(({a:Me,s:ye},We)=>{const at=Me.wave===0?1:Math.min(1,Math.max(0,(e-Me.at)/Math.max(.01,fe.transition)));oe.uParty.value[We].set(ye.x,ye.z,i.map.areaSize*.85,at);const ht=Pr(Xt[i.map.typeOf(Me.cell[0],Me.cell[1])].creature);oe.uPartyCol.value[We].set(ht[0]/255,ht[1]/255,ht[2]/255)}),oe.uPartyCount.value=xe.length,oe.uUplight.value.set(fe.uplight.strength,fe.uplight.pulse,fe.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const y=this.assets.treehouse,E=y.atlas.frames[0],b=this.placeTreehouse(r.angle),A=Ot,_=(oe,fe)=>{const xe=A.uRight.value,Me=A.uUp.value,ye=(oe-E.w/2)*this.mpp,We=(E.h-fe)*this.mpp;return{x:b.x+xe.x*ye+Me.x*We,y:b.y+xe.y*ye+Me.y*We,z:b.z+xe.z*ye+Me.z*We}},w=y.lights.filter(oe=>oe.kind==="lantern"||oe.kind==="window").slice(0,2).map(oe=>({..._(oe.x,oe.y),reach:s.treehouse.lightReach,rgb:new V(oe.rgb[0]/255,oe.rgb[1]/255,oe.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+oe.x))}));this.setLights([this.dancefloor.update(e,this.ground),...S.lights,...w,...this.forestLights],x.x,x.z),ot.uTime.value=e,this.mist?.follow(r.tx,r.tz);const C=Math.sin(e*2.4)*.12,R=x.mode==="rising"&&x.lift<.9,P=x.mode==="descending"&&x.lift>.1;let I=R||P?(R?8:12)+(x.away?2:0)+Math.floor(e*7)%2:x.lean?6+(x.away?1:0):(x.away?3:0)+Math.floor(e*4)%3;if(!R&&!P){const oe=this.assets.witchFly,fe=x.away?"away":"towards";x.braking?I=oe.brake[fe][Math.floor(e*oe.brake.fps)%oe.brake[fe].length]:(x.boost??0)>.7&&(I=oe.fast[fe][Math.floor(e*oe.fast.fps)%oe.fast[fe].length])}const O=i.leash,k=this.assets.witchFoot,G=x.away?"away":"towards";for(const oe of O.events)oe.kind==="placed"||oe.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:oe.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const K=this.footAct?k[this.footAct.pose].towards.length/k[this.footAct.pose].fps:0,ie=!!this.footAct&&e-this.footAct.at<K+.3,q=x.mode==="ground"&&(O.talk||O.held||ie)?1:0,se=Math.min(.1,Math.max(0,e-this.footTime)),F=this.foot;this.footTime=e,this.foot+=(q-this.foot)*Math.min(1,se*8),Math.abs(q-this.foot)<.01&&(this.foot=q);const ee=(oe,fe)=>{const xe=k[oe][G];return xe[Math.max(0,Math.min(xe.length-1,fe))]};this.foot>.6?ie&&this.footAct?I=ee(this.footAct.pose,Math.floor((e-this.footAct.at)*k[this.footAct.pose].fps)):O.talk?I=ee("talk",Math.floor(e*k.talk.fps)%k.talk[G].length):I=ee("stand",Math.floor(e*k.stand.fps)%k.stand[G].length):this.foot>.02&&(I=this.foot>=F?ee("land",Math.floor(this.foot*3)):ee("takeoff",Math.floor((1-this.foot)*3)));const ae=this.foot*this.foot*(3-2*this.foot),ue=(v+C-.4)*(1-ae),ve=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=x.seated?1:Math.max(0,this.seatK-ve/.6);let Se=x.x,B=x.z,z=ue;if(this.seatK>0){const oe=_(y.seat.x,y.seat.y),fe=this.seatK*this.seatK*(3-2*this.seatK),xe=this.camera.getWorldDirection(this.v3);Se+=(oe.x-xe.x*.6-Se)*fe,z+=(oe.y-xe.y*.6-z)*fe,B+=(oe.z-xe.z*.6-B)*fe,x.seated&&(I=k.sit.towards[Math.floor(e*k.sit.fps)%k.sit.towards.length])}const N=this.assets.witch.frames[I],Z=z+N.h*this.mpp;this.witchBatch.set([{x:Se,y:z,z:B,frame:N,flip:x.seated?!1:x.facing<0}]);{const oe=(ye,We,at)=>{const ht=this.v3.set(ye,We,at).project(this.camera);return[(ht.x+1)/2*this.width,(ht.y+1)/2*this.height]},fe=oe(Se,z,B),xe=oe(Se,Z,B),Me=oe(Se+N.w*this.mpp/2,z,B);Ot.uWitch.value.set((fe[0]+xe[0])/2,(fe[1]+xe[1])/2,Math.abs(Me[0]-fe[0])+1,Math.abs(xe[1]-fe[1])/2+1),Ot.uWitchDepth.value=-this.v3.set(Se,this.seatK>0?z:v,B).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(Se,.03,B),this.shadow.scale.setScalar((1-.5*nh(x))*(1-this.seatK)+.001),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,x.x,x.z);const j=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,j.x,j.z,x.x,x.z,e,s.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,Z),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),x.x,x.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let ce=0;for(const oe of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])ce+=oe.dropped;ce&&!this.stats.dropped&&console.warn(`view: ${ce} sprite instances set but not drawn`),this.stats.dropped=ce,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const dy="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",fy="Lab default",py={},my={_readme:dy,name:fy,style:py};function gy(n=my){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=jb();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function xy(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let m=p.clientX-a,M=p.clientY-o;const g=Math.hypot(m,M);g>s&&(m*=s/g,M*=s/g),i.style.transform=`translate(${m}px, ${M}px)`;const x=Math.min(1,g/s),v=.15,S=x<v?0:(x-v)/(1-v)/Math.max(1e-6,x);e.x=m/s*S,e.y=M/s*S});const f=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",f),c.addEventListener("pointercancel",f);const d=(p,m)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",g=>{g.preventDefault(),g.stopPropagation(),m(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const My=[{version:null,items:["Points where a branch line leaves the railway"]},{version:136,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],vy={entries:My},wn=new URLSearchParams(location.search);let vs=j0(wn.get("seed"));vs===null&&(vs=Math.floor(Math.random()*1e6),wn.set("seed",String(vs)),history.replaceState(null,"","?"+wn.toString()+location.hash));const sn={...rs,bloom:{...rs.bloom},tiltShift:{...rs.tiltShift},shadows:{...rs.shadows},canopyShadow:{...rs.canopyShadow},mist:{...rs.mist},party:{...rs.party}};wn.get("shadows")==="off"&&(sn.shadows.on=!1);wn.get("canopy")==="off"&&(sn.canopyShadow.on=!1);wn.get("mist")==="off"&&(sn.mist.on=!1);const ba=wn.get("tilt");ba==="off"?sn.tiltShift.on=!1:(ba==="before"||ba==="after")&&(sn.tiltShift.on=!0,sn.tiltShift.where=ba);wn.get("bloom")==="off"&&(sn.bloom.on=!1);wn.get("moonbeams")==="on"&&(sn.moonbeams=1);const al=wn.get("fx");(al==="pixel"||al==="smooth")&&(sn.fx=al);const tn=Dp(vs,sn),Nd=[30,60,120,300,600,0];function Fd(n){sn.party.interval=n>0?n:1e9,tn.party.paused=n===0,tn.party.nextAt=tn.clock.time+sn.party.startDelay+sn.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Oc=sn.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&Nd.includes(+n)&&(Oc=+n)}catch{}const ol=wn.get("wave");ol!==null&&(Oc=ol==="off"?0:Math.max(0,+ol||0));const _y=document.getElementById("game"),ll=gy(),ai=new uy(_y,tn,{...ll,pixel:sn.pixelSize,treeSize:ll.treeSize*sn.treeHeight,crownWidth:ll.crownWidth*sn.crownWidth/sn.treeHeight});ai.debugCull=wn.get("debug")==="cull";const vu=Number(wn.get("scenery"));wn.has("scenery")&&vu>0&&(ai.sceneryFixed=vu);const dr=new a1;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),dr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),dr.touch.pauseWaves=!0});xy(document.body,dr.touch);ai.rulers.on=wn.has("debug");const Ud=()=>{ai.rulers.on=!ai.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&Ud()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),Ud()});const kd=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&kd.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=kd.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v147 · 53c6152";const by=document.getElementById("news"),yy="v147 · 53c6152".split(" ")[0],Sy=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);by.innerHTML="<b>What's new</b>"+vy.entries.filter(n=>n.items.length).slice(0,3).map(n=>`<div>${n.version===null?`${yy} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${Sy(e)}</li>`).join("")}</ul>`).join("");const wy=document.getElementById("seed");wy.innerHTML=`seed <a href="?seed=${vs}">${vs}</a>`;const ic=document.getElementById("debug"),Nc=document.getElementById("start"),Bd=document.getElementById("debug-buttons"),Fc=document.getElementById("wave"),Ey=Fc.querySelector(".fill"),Ay=Fc.querySelector(".label");let es=wn.has("debug");ic.classList.toggle("on",es);Bd.classList.toggle("on",es);const zd=()=>ai.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",zd);zd();let lo=!1;requestAnimationFrame(()=>setTimeout(async()=>{await ai.prepare(),lo=!0,Nc.classList.remove("loading")},0));let _u=null;function Hd(){if(!lo||!tn.clock.paused)return!1;try{_u??=new AudioContext,_u.resume()}catch{}return tn.clock.paused=!1,Nc.style.display="none",dr.clearPresses(),!0}dr.onAny=Hd;Nc.addEventListener("pointerdown",n=>{n.preventDefault(),Hd()});const Gd=document.getElementById("waves");Gd.innerHTML="waves every "+Nd.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");Gd.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;Fd(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});Fd(Oc);document.addEventListener("visibilitychange",()=>{document.hidden&&(Ia=0)});let Ia=0,bu=60,cl=0,ya=0;function Wd(n){requestAnimationFrame(Wd);const e=Ia?(n-Ia)/1e3:0;Ia=n,cl++,ya+=e,ya>=.5&&(bu=cl/ya,cl=0,ya=0);const t=dr.read();if(t.debug&&(es=!es,ic.classList.toggle("on",es),Bd.classList.toggle("on",es)),ai.debugReadouts=es,Ip(tn,t,e),!lo)return;const i=Pp(tn.party,tn.map,tn.clock.time);Ey.style.height=`${(1-i.gone)*100}%`;const s=sn.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(Ay.textContent=`wave ${tn.party.wave} · ${tn.party.areas.size} areas · ${s}`,Fc.classList.toggle("paused",tn.party.paused),ai.render(tn.clock.time),es){const r=tn.witch,a=ai.stats;ic.textContent=[`fps    ${bu.toFixed(0)}`,`seed   ${vs}`,`area   ${Vu(tn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${tn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Wd);window.witch={game:tn,view:ai,areaUnderWitch:()=>Vu(tn),areaTypeId:n=>Xt[n].id,spriteUp:()=>Ot.uUp.value,get ready(){return lo}};
