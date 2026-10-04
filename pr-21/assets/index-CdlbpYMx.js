(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Bi(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ze(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Fi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=ze(i,s,t),d=ze(i+1,s,t),f=ze(i,s+1,t),u=ze(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}const Xn=(n,e,t)=>n+(e-n)*t,Ln=(n,e,t)=>Math.min(t,Math.max(e,n)),nn=n=>{const e=Ln(n,0,1);return e*e*(3-2*e)};function Yd(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=Ln(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function lo(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function Xd(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),c=Ln(n.zoomStep+Math.sign(e),0,h-1),d=h>1?c/(h-1):0;let f=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(f,u);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*r),M=n.ax+(f-n.ax)*m,x=n.az+(u-n.az)*m,[g,v]=lo(n.tx,n.vx,t.x+M,o.follow,r),[y,S]=lo(n.ty,n.vy,t.y,o.follow,r),[E,b]=lo(n.tz,n.vz,t.z+x,o.follow,r),A=n.zoom+(d-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r)),w=a.treetop,L=Ln((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(w.boost-1)),0,1),R=(n.pull??0)+(w.cameraPull*L*nn(_)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:c,zoom:A,tx:g,ty:y,tz:E,vx:v,vy:S,vz:b,ax:M,az:x,lift:Ln(_,0,1),pull:R}}function vu(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=nn(e),a=Xn(Xn(i.angleIn,i.angleOut,n.zoom),Xn(s.angleIn,s.angleOut,n.zoom),r),o=Xn(Xn(i.distanceIn,i.distanceOut,n.zoom),Xn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Kd=.1,qd=()=>({time:0,paused:!0});function $d(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Kd,e);return n.time+=t,t}const Zd={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Jd={types:Zd};function $a(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Nr(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const fe=(n,e,t)=>e+(t-e)*n(),jl=(n,e)=>e[Math.floor(n()*e.length)];function ht(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function vi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=ht(i,s,t),d=ht(i+1,s,t),f=ht(i,s+1,t),u=ht(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}function pe(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,c,d]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(d*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},co=4;function _u(n,e,t,i=.12){const s=(r,a,o,h)=>{const c=o-r,d=h-a,f=Math.max(0,Math.min(1,((n-r)*c+(e-a)*d)/(c*c+d*d)));return Math.hypot(n-r-c*f,e-a-d*f)<i};switch((t%co+co)%co){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const Qd=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Vc(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),c=r(o),d=r(o+1),f=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(d[0]-c[0],d[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const m=p/u,M=m*m,x=M*m;s.push([0,1].map(g=>.5*(2*c[g]+(-h[g]+d[g])*m+(2*h[g]-5*c[g]+4*d[g]-f[g])*M+(-h[g]+3*c[g]-3*d[g]+f[g])*x)))}}return e||s.push(n[i-1]),s}function jd(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const c=n[Math.max(0,h-1)],d=n[Math.min(r-1,h+1)];let f=d[0]-c[0],u=d[1]-c[1];const p=Math.hypot(f,u)||1;f/=p,u/=p;const m=n[h][2]/2;i.push([n[h][0]-u*m,n[h][1]+f*m]),s.push([n[h][0]+u*m,n[h][1]-f*m])}const a=(h,c,d,f)=>{let u=h[0]-c[0],p=h[1]-c[1];const m=Math.hypot(u,p)||1;return[h[0]+u/m*d/2*f,h[1]+p/m*d/2*f]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const pt=(n,e)=>[n[0]+e[0],n[1]+e[1]],wn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Za(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let d=c[0]-h[0],f=c[1]-h[1];const u=Math.hypot(d,f)||1,p=f/u*r,m=-d/u*r;for(let M=1;M<=i;M++){const x=(M-.5)/i,g=wn(h,c,x),v=[g[0]+p*s-d/u*s*.5,g[1]+m*s-f/u*s*.5];a.push(wn(h,c,x-.45/i),v,wn(h,c,x+.35/i))}}return a}function Yc(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let c=0,d=t.length-1;c<t.length;d=c++){const[f,u]=t[c],[p,m]=t[d];u>o!=m>o&&h.push(f+(o-u)/(m-u)*(p-f))}h.sort((c,d)=>c-d);for(let c=0;c+1<h.length;c+=2)for(let d=Math.max(0,Math.ceil(h[c]-.5));d<=Math.min(n-1,Math.floor(h[c+1]-.5));d++)i[a*n+d]=1}return i}function ef(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,c,d,f,u)=>{const p=c+f,m=d+u;let M,x;if(p<0||m<0||p>=n||m>=e)M=f,x=u;else{const g=m*n+p;M=s[g]+f,x=r[g]+u}M*M+x*x<a(h)&&(s[h]=M,r[h]=x)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const d=h*n+c;t[d]&&(o(d,c,h,-1,0),o(d,c,h,0,-1),o(d,c,h,-1,-1),o(d,c,h,1,-1))}for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&o(d,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&(o(d,c,h,1,0),o(d,c,h,0,1),o(d,c,h,1,1),o(d,c,h,-1,1))}for(let c=0;c<n;c++){const d=h*n+c;t[d]&&o(d,c,h,-1,0)}}return{vx:s,vy:r}}class Tt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:d=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(u+.5-t)/s,x=m*m+M*M;if(x>1)continue;const g=u*this.w+p;if(o&&!o.has(this.m[g]))continue;if(h<1){const E=c?vi(p/3.2,u/3.2,d)*c+(1-c)*.5:.5;if(ht(p,u,d+77)>h*(.4+E*1.2)*(1.15-x*.5))continue}const v=m*f,y=M*f,S=Math.hypot(v,y,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,r,v/S,y/S,(Math.sqrt(Math.max(0,1-x))+.15)/S)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let d=0;d<=c;d++){const f=d/c,u=e+(i-e)*f,p=t+(s-t)*f,m=Math.max(.5,(r+(a-r)*f)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let x=Math.floor(u-m);x<=u+m;x++){const g=(x+.5-u)/m,v=(M+.5-p)/m;if(g*g+v*v>1)continue;const y=g*h,S=Math.hypot(y,v*.3,1);this.px(x,M,o,y/S,v*.3/S,1/S)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const c=(m,M,x,g,v,y)=>(m-v)*(g-y)-(x-v)*(M-y),d=Math.max(0,Math.floor(Math.min(i,r,o))),f=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let m=u;m<p;m++)for(let M=d;M<f;M++){const x=M+.5,g=m+.5,v=c(x,g,i,s,r,a),y=c(x,g,r,a,o,h),S=c(x,g,o,h,i,s);(v<0||y<0||S<0)&&(v>0||y>0||S>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Yc(this.w,this.h,Vc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(jd(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:d=l.LINE}={}){const{w:f,h:u}=this;if(o)for(let x=0;x<f*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:m}=ef(f,u,e);let M=r;if(!M){for(let x=0;x<f*u;x++)e[x]&&(M=Math.max(M,Math.hypot(p[x],m[x])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let x=0;x<u;x++)for(let g=0;g<f;g++){const v=x*f+g;if(!e[v])continue;if(h){this.m[v]=t;continue}const y=Math.hypot(p[v],m[v]),S=Math.min(1,Math.max(0,(y-.5)/M)),E=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*a;let b=p[v]/(y||1)*E+c[0],A=m[v]/(y||1)*E+c[1];const _=Math.hypot(b,A,1);this.m[v]=t,this.n[v*3]=b/_,this.n[v*3+1]=A/_,this.n[v*3+2]=1/_}if(s&&!h){const x=[];for(let g=0;g<u;g++)for(let v=0;v<f;v++){const y=g*f+v;if(e[y])for(const[S,E]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=v+S,A=g+E;if(b<0||A<0||b>=f||A>=u)continue;const _=A*f+b;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==d){x.push(y);break}}}for(const g of x)this.m[g]=d}if(!h)for(let x=0;x<f*u;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,s={}){return this.fillMask(Yc(this.w,this.h,Vc(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(d=>d.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((d,f)=>[...d].forEach((u,p)=>{const m=t[u];if(!m)return;const M=i+(a?o-1-p:p),x=s+f;this.inb(M,x)&&(h[x*this.w+M]=1,c.set(x*this.w+M,m))})),this.fillMask(h,l.BODY,{round:r,depth:2.5});for(const[d,f]of c)this.m[d]=f}}function Un(n,e,t,i=t.outline,s=$a){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),c=o(),d=o(),f=h.getContext("2d").createImageData(r,a),u=c.getContext("2d").createImageData(r,a),p=d.getContext("2d").createImageData(r,a),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let x=0;x<r;x++){const g=M*r+x,v=n.m[g],y=g*4;if(!v){if(!m)continue;const _=[n.get(x+1,M),n.get(x-1,M),n.get(x,M+1),n.get(x,M-1)].find(L=>L);if(!_)continue;const w=m==="tint"?(e[_]||[0,0,0]).map(L=>L*.35|0):m;f.data.set([...w,255],y),u.data.set([128,128,255,255],y),p.data.set([128,128,255,255],y);continue}let S=e[v];v===l.LINE&&!S&&(S=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(_=>_*.55|0):m),S=S||[255,0,255],f.data.set([...S,Qd.has(v)?254:255],y);const E=n.n[g*3],b=n.n[g*3+1],A=n.n[g*3+2];u.data.set([E*127+128,b*127+128,A*255,255],y),p.data.set([-E*127+128,b*127+128,A*255,255],y)}return h.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(u,0,0),d.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:d,w:r,h:a}}const es=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Rr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ht=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],qn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],C={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:qn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:es,cross:Rr,dot:Ht};function Xc(n,e=[0,1,0]){const t=es(n);let i=Rr(e,t);Math.hypot(...i)<1e-4&&(i=Rr([0,0,1],t)),i=es(i);const s=Rr(t,i);return[t,s,i]}function bu(n,e){const t=Ht(n,e.axes[0]),i=Ht(n,e.axes[1]),s=Ht(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),c=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(r,a,o)}function Su(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,c=Ht(n,t),d=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=Ht(f,f),p=c*c*i,m=d*d*i,M=Math.sign(s)*s*s*u;return Math.sign(d)*r*m>M?Math.sqrt(u+m)*a-h:Math.sign(c)*r*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*r*a)+c*s)*a-o}function yu(n,e){const t=Math.abs(Ht(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ht(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Ht(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const tf=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Kc=(n,e)=>n.type==="ell"?bu(qn(e,n.cw),n):n.type==="box"?yu(qn(e,n.cw),n):Su(qn(e,n.aw),n),hr=(n,e)=>n.rough?Kc(n,e)+tf(e,n.rough):Kc(n,e);class qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?Xc(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?Xc(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:es(t),v:es(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=bu(qn(e,i.c),i);else if(i.type==="box")s=yu(qn(e,i.c),i);else{const r=qn(i.b,i.a),a=Math.max(1e-9,Ht(r,r)),o=i.r1-i.r2;s=Su(qn(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const qc={towards:.6,away:-.6},nf=.52;function En(n,{height:e,scale:t,facing:i="towards",yaw:s=qc[i]??qc.towards,pitch:r=nf,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),c=Math.cos(r),d=Math.sin(r),f=B=>[B[0]*o-B[2]*h,B[1],B[0]*h+B[2]*o],u=B=>[B[0]*o+B[2]*h,B[1],-B[0]*h+B[2]*o],p=[0,-d,-c],m=[0,c,-d],M=[1,0,0],x=[0,d,c],g=n.blend,v=n.parts.map(B=>{if(B.type==="ell"){const xe=f(B.c),Se=B.axes.map(f),Ie=Math.max(...B.r);return{...B,cw:xe,axes:Se,bc:xe,br:Ie+(B.rough||0)*1.5}}if(B.type==="box"){const xe=f(B.c),Se=B.axes.map(f);return{...B,cw:xe,axes:Se,bc:xe,br:Math.hypot(...B.h)+(B.rough||0)*1.5}}const oe=f(B.a),ae=f(B.b),ve=qn(ae,oe),ge=Math.max(1e-9,Ht(ve,ve)),ue=B.r1-B.r2;return{...B,aw:oe,ba:ve,l2:ge,rr:ue,a2:ge-ue*ue,il2:1/ge,bc:C.lerp(oe,ae,.5),br:Math.sqrt(ge)/2+Math.max(B.r1,B.r2)}}),y=n.flats.map(B=>{const oe=f(B.c),ae=f(B.u),ve=f(B.v);return{...B,cw:oe,uw:ae,vw:ve,nw:es(Rr(ae,ve)),bc:oe,br:Math.hypot(B.su,B.sv)}}),S=[...v,...y],E=B=>{const oe=Ht(B.bc,M),ae=Ht(B.bc,m),ve=B.br+(B.uw?0:g);return[oe-ve,oe+ve,ae-ve,ae+ve]};for(const B of S)[B.x0,B.x1,B.u0,B.u1]=E(B);const b=S.filter(B=>!B.extra&&!B.cut),A=Math.min(...b.map(B=>B.u0+(B.uw?0:g))),_=Math.max(...b.map(B=>B.u1-(B.uw?0:g))),w=t??e/Math.max(1e-6,_-A),L=Math.min(...S.map(B=>B.x0)),R=Math.max(...S.map(B=>B.x1)),P=Math.min(...S.map(B=>B.u0)),N=Math.max(...S.map(B=>B.u1)),I=Math.ceil((R-L)*w)+4,F=Math.ceil((N-P)*w)+2,G=new Tt(I,F),q=new Float32Array(I*F).fill(1/0),se=new Int16Array(I*F).fill(-1),k=8,ee=Math.ceil(I/k),U=Math.ceil(F/k),Q=Array.from({length:ee*U},()=>[]);S.forEach((B,oe)=>{const ae=Math.max(0,Math.floor((B.x0-L)*w/k)),ve=Math.min(ee-1,Math.floor(((B.x1-L)*w+2)/k)),ge=Math.max(0,Math.floor((N-B.u1)*w/k)),ue=Math.min(U-1,Math.floor(((N-B.u0)*w+1)/k));for(let xe=ge;xe<=ue;xe++)for(let Se=ae;Se<=ve;Se++)Q[xe*ee+Se].push(oe)});const le=.25/w,_e=(B,oe)=>{const ae=Math.max(g-Math.abs(B-oe),0)/g;return Math.min(B,oe)-ae*ae*g*.25};for(let B=0;B<F;B++)for(let oe=0;oe<I;oe++){const ae=Q[Math.floor(B/k)*ee+Math.floor(oe/k)];if(!ae.length)continue;const ve=L+(oe+.5-1)/w,ge=N-(B+.5)/w,ue=C.add(C.add(C.mul(M,ve),C.mul(m,ge)),C.mul(x,50));let xe=1/0,Se=-1/0;const Ie=[],$e=[];for(const et of ae){const Ye=S[et],O=qn(ue,Ye.bc),T=Ht(O,p),H=Ye.br+(Ye.uw?0:g),$=Ht(O,O)-H*H,j=T*T-$;if(j<0)continue;if(Ye.uw){$e.push(Ye);continue}if(Ye.cut){Ie.push(Ye);continue}const me=Math.sqrt(j);xe=Math.min(xe,-T-me),Se=Math.max(Se,-T+me),Ie.push(Ye)}let Rt=1/0,Nt=-1,wt=0,Ct=null;if(Ie.length){const et=new Map;for(const T of Ie){let H=et.get(T.group);H||et.set(T.group,H=[]),H.push(T)}const Ye=(T,H)=>{let $=1/0;for(const j of T)j.cut||($=$===1/0?hr(j,H):_e($,hr(j,H)));for(const j of T)j.cut&&($=Math.max($,-hr(j,H)));return $};let O=Math.max(0,xe);for(let T=0;T<96&&O<Se;T++){const H=C.add(ue,C.mul(p,O));let $=1/0,j=null;for(const[me,Me]of et){const ie=Ye(Me,H);ie<$&&($=ie,j=me)}if($<le){const me=et.get(j),Me=.5/w;Ct=es([Ye(me,[H[0]+Me,H[1],H[2]])-Ye(me,[H[0]-Me,H[1],H[2]]),Ye(me,[H[0],H[1]+Me,H[2]])-Ye(me,[H[0],H[1]-Me,H[2]]),Ye(me,[H[0],H[1],H[2]+Me])-Ye(me,[H[0],H[1],H[2]-Me])]);let ie=me[0],ce=1/0;for(const be of me){if(be.cut)continue;const Fe=hr(be,H);Fe<ce&&(ce=Fe,ie=be)}for(const be of me)if(be.cut&&-hr(be,H)>ce-le*2){ie=be;break}Rt=O,Nt=j,wt=ie.paint?ie.paint(u(H),ie)??ie.mat:ie.mat;break}O+=Math.max($*.9,le*.5)}}for(const et of $e){const Ye=Ht(p,et.nw);if(Math.abs(Ye)<1e-4)continue;const O=Ht(qn(et.cw,ue),et.nw)/Ye;if(O>=Rt)continue;const T=C.add(ue,C.mul(p,O)),H=qn(T,et.cw),$=Ht(H,et.uw)/et.su,j=Ht(H,et.vw)/et.sv;if(Math.abs($)>1||Math.abs(j)>1)continue;const me=et.mask($,j);if(!me)continue;let Me=Ye>0?C.mul(et.nw,-1):et.nw;Me=es(C.add(Me,C.add(C.mul(et.uw,$*et.bend),C.mul(et.vw,j*et.bend*.5)))),Rt=O,Nt=et.group,wt=me,Ct=Me}if(!Ct||!wt)continue;const V=B*I+oe;q[V]=Rt,se[V]=Nt,G.px(oe,B,wt,Ht(Ct,M),-Ht(Ct,m),Ht(Ct,x))}const ne=[];for(let B=0;B<F;B++)for(let oe=0;oe<I;oe++){const ae=B*I+oe;if(G.m[ae])for(const[ve,ge]of[[1,0],[-1,0],[0,1],[0,-1]]){const ue=oe+ve,xe=B+ge;if(ue<0||xe<0||ue>=I||xe>=F)continue;const Se=xe*I+ue;if(G.m[Se]&&se[Se]!==se[ae]&&q[Se]-q[ae]>a){ne.push(ae);break}}}for(const B of ne)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(G.m[B])||(G.m[B]=l.LINE);for(let B=0;B<F;B++)for(let oe=0;oe<I;oe++){const ae=B*I+oe;if(G.m[ae]!==l.EYE)continue;const ve=B>0&&G.m[ae-I]===l.EYE,ge=oe>0&&G.m[ae-1]===l.EYE,ue=oe+1<I&&G.m[ae+1]===l.EYE&&B+1<F&&G.m[ae+I]===l.EYE;!ve&&!ge&&ue&&(G.m[ae]=l.GLINT)}let re=-1;for(let B=F-1;B>=0&&re<0;B--)for(let oe=0;oe<I;oe++)if(G.m[B*I+oe]){re=B;break}const z=re>=0&&re<F-1?F-1-re:0;if(re>=0&&re<F-1){const B=F-1-re;for(let oe=F-1;oe>=0;oe--)for(let ae=0;ae<I;ae++){const ve=oe*I+ae,ge=(oe-B)*I+ae,ue=oe-B>=0;G.m[ve]=ue?G.m[ge]:0,G.g[ve]=ue?G.g[ge]:0;for(let xe=0;xe<3;xe++)G.n[ve*3+xe]=ue?G.n[ge*3+xe]:0}}return G.bodyH=Math.round((_-A)*w),{sp:G,s:w,project:B=>{const oe=f(B);return[+((oe[0]-L)*w+1).toFixed(1),+((N-Ht(oe,m))*w+z).toFixed(1)]}}}const ri=(n,e=9,t=.3)=>ht(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Ms={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},sf={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},$c={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function rf(n,e=$c){const t={...$c,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(sf)){const[o,h,c]=t[r];s[a]=pe(i[r]??o,h,c)}return s[l.EYE]=[24,18,30],s[l.GLINT]=[255,255,245],s[l.NOSE]=[20,16,24],s[l.MAGIC]=pe(n.glowHue??.13,.5,1),s[l.MAGIC2]=pe(n.glowHue??.13,.15,1),s[l.BELLY]=[245,245,240],s}const af={rise:.78,descend:-.66,brake:.44};function of(n){const e=new qe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=m=>i-s*(m/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,s*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,a(.5)+.03,m*.045]),h=[-1,1].map(m=>[.2,i+.24+r[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,x=M>0?7:5;e.seg(h[m],o[m],.04,.03,l.JACKET,{group:x}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:x})}const c=[.3+r[0],i+.27+r[1],0],d=[.07,i+.28+r[1]*.5,0],f=[-.15,i+.35+r[2],0];e.ell(d,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<d[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(f,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...C.add(f,[-.02,.06,0]),.07],[...C.add(f,[-.18,.08+r[0]*2,0]),.05],[...C.add(f,[-.34,.05+r[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([m,M],x)=>{const g=x?6:4,v=C.add(f,[-.04,0,x?.06:-.06]);e.seg(v,m,.055,.045,l.JEANS,{group:g}),e.seg(m,M,.045,.04,l.JEANS,{group:g}),e.ell(C.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:g,paint:y=>y[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const M=qe.surface(c,[.11,.115,.1],C.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(C.add(M,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(qe.surface(c,[.11,.115,.1],C.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...C.add(c,[-.06,.03,0]),.065],[...C.add(c,[-.22,.05+r[1]*2,.01]),.05],[...C.add(c,[-.4,.06+r[2]*3,.02]),.03],[...C.add(c,[-.55,.07+r[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(C.add(c,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...C.add(c,[-.005,.03,-.095]),.015],[...C.add(c,[-.02,.12,0]),.015],[...C.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=C.add(c,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...C.add(p,[-.02,.02,0]),.08],[...C.add(p,[-.14,.13,0]),.04],[...C.add(p,[-.3,.14+r[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(C.add(p,[.08,-.02,.08]),C.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11});for(const[m,M,x,g]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([m-v,M,x],[m-v-g,M,x],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const wu={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Xs=.34,Eu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},lf={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Eu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Xs+.14,.15],far:[.18,Xs+.14,-.13],hand:"rest"}))};function cf(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=C.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function hf(n,e){const t=lf[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Eu,...t[e%t.length]},s=new qe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?Xs+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,c=!!i.broom.astride,d=o-.04,f=c?[1,0,0]:C.norm(i.broom.dir),u=c?[-.36,d,0]:i.broom.binding,p=w=>C.add(u,C.mul(f,w));s.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:f,group:3,paint:w=>{const L=C.dot(C.sub(w,u),f);return L<-.22?l.MAGIC2:L>-.01?l.BROOM:void 0}});for(const w of[-1,1]){const L=w>0?6:4,R=[h,o,w*.07],P=i.sit?i.swing*w:0,N=i.sit?[.24+P,.09+Math.max(0,P)*.6,w*.1]:w>0&&i.legUp?i.legUp:[(w>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),w*.1],I=i.sit?[.21,o+.01,w*.09]:cf(R,N,.21);s.seg(R,I,.055,.045,l.JEANS,{group:L}),s.seg(I,N,.045,.04,l.JEANS,{group:L});const F=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(C.add(N,F),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:L,paint:G=>G[1]<N[1]+F[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[h,o+.03,0];s.ell(x,[.1,.08,.105],l.JEANS,{group:1});const g=C.add(x,C.add(C.mul(m,.19),[0,i.breathe,0]));s.ell(g,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:w=>C.dot(C.sub(w,g),M)>.045&&Math.abs(w[2])<.05?l.TOP:void 0}),s.chain([[...C.add(g,C.add(C.mul(M,-.07),C.mul(m,-.08))),.07],[...C.add(g,C.add(C.mul(M,-.11-a),C.mul(m,-.2))),.05],[...C.add(g,C.add(C.mul(M,-.13-a*1.6),C.mul(m,-.29))),.025]],l.JACKET,{group:12});const v=C.add(g,C.add(C.mul(m,.27),[i.look*.03,0,i.tilt*.04])),y=w=>C.add(g,C.add(C.mul(m,.1),[0,0,w*.12])),S=c?[.28,d+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,f[1]))),E=c?[.28,d+.03,.05]:i.free;for(const w of[-1,1]){const L=w>0?7:5,R=y(w),P=w>0?E:i.far||S,N=w>0&&i.elbow?i.elbow:C.add(C.lerp(R,P,.5),[-.03,-.02,w*.05]);s.seg(R,N,.04,.035,l.JACKET,{group:L}),s.seg(N,P,.035,.03,l.JACKET,{group:L});const I=w>0&&!c?i.hand:"grip";if(I==="palm")s.ell(P,[.045,.02,.04],l.SKIN,{group:L});else if(I==="down")s.ell(P,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:L});else if(I==="wave"){s.ell(P,[.03,.045,.04],l.SKIN,{group:L});for(const F of[-1,0,1])s.seg(C.add(P,[0,.03,F*.02]),C.add(P,[F*.01,.065,F*.03]),.01,.008,l.SKIN,{group:L})}else I==="point"?(s.ell(P,[.035,.03,.035],l.SKIN,{group:L}),s.seg(C.add(P,[0,.02,0]),C.add(P,[.01,.08,0]),.012,.01,l.SKIN,{group:L})):s.ell(P,[.035,.03,.035],l.SKIN,{group:L})}s.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:w=>w[0]<v[0]-.01||w[1]>v[1]+.075?l.HAIR:void 0});for(const w of[-1,1])s.ell(qe.surface(v,[.11,.115,.1],C.norm([.85,.05+i.look,w*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&s.ell(qe.surface(v,[.11,.115,.1],C.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),s.chain([[...C.add(v,[-.06,.02,0]),.06],[...C.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...C.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const w of[-1,1])s.ell(C.add(v,[-.015,0,w*.105]),[.05,.055,.03],l.PHONES,{group:10});s.chain([[...C.add(v,[-.005,.03,-.095]),.015],[...C.add(v,[-.005,.11,-.05]),.015],[...C.add(v,[-.005,.125,0]),.015],[...C.add(v,[-.005,.11,.05]),.015],[...C.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const b=C.add(v,[-.03,.1,i.tilt*.02]),A=i.tilt*.05,_=C.add(b,[-.16-a*.5,.27,A*2]);return s.ell(b,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...C.add(b,[0,.01,0]),.085],[...C.add(b,[-.05,.17,A]),.045],[..._,.012]],l.HAT,{group:11,paint:w=>w[1]<b[1]+.045?l.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),s.anchors.hand=E,s.anchors.hatTip=_,s}function Au({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return of(n);if(wu[t])return hf(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new qe({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),d=.42+h,f=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],m=s?1:i?-.6:0;o.seg([-.5,d-c*2,0],[.62,d+c*3,0],.022,.018,l.BROOM,{group:2}),r?o.ell([-.56,d-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:y=>y[1]<d-.18?l.MAGIC2:y[1]>d-.01?l.BROOM:void 0}):o.ell([-.62,d-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:y=>y[0]<-.72?l.MAGIC2:y[0]>-.5?l.BROOM:void 0});for(const y of[-1,1]){const S=[-.04,d+.06,y*.07],E=r?[.18,d-.01,y*.14]:s?[.16,d-.05,y*.14]:i?[.06,d-.07,y*.14]:[.12+f*.5,d-.02,y*.14],b=r?y>0?[.44,d-.02+p,y*.13]:[.3,d-.16,y*.13]:s?[.2,d-.26,y*.13]:i?[-.1,d-.23,y*.13]:[.08+f,d-.2,y*.13];o.seg(S,E,.055,.045,l.JEANS,{group:y>0?6:4}),o.seg(E,b,.045,.04,l.JEANS,{group:y>0?6:4}),o.ell(C.add(b,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:y>0?6:4,paint:A=>A[1]<b[1]-.04?l.BELLY:void 0})}o.ell([-.04,d+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+f*.8,d+.26-Math.abs(f)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:y=>y[0]>M[0]+.04&&Math.abs(y[2])<.055?l.TOP:void 0}),r?o.chain([[...C.add(M,[-.08,-.06,0]),.07],[...C.add(M,[-.02,.12+p,.02]),.05],[...C.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...C.add(M,[-.08,-.1,0]),.07],[...C.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...C.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const x=C.add(M,[.03+f*.5,.26,0]),g=C.add(x,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const y of[-1,1]){const S=C.add(M,[.01,.11,y*.11]),E=s&&y>0?C.add(g,[.1,.01,.1]):r?[.3,d+.03,y*.05]:[.26+f,d+.03,y*.05],b=s&&y>0?C.add(S,[.1,.02,.1]):C.lerp(S,E,.5);o.seg(S,b,.04,.035,l.JACKET,{group:y>0?7:5}),o.seg(b,E,.035,.03,l.JACKET,{group:y>0?7:5}),o.ell(E,[.035,.03,.035],l.SKIN,{group:y>0?7:5})}o.ell(x,[.11,.115,.1],l.SKIN,{group:8,paint:y=>y[0]<x[0]-.01||y[1]>x[1]+.075?l.HAIR:void 0});for(const y of[-1,1])o.ell(qe.surface(x,[.11,.115,.1],C.norm([.85,.05,y*.45])),[.016,.026,.016],l.EYE,{group:8});r?o.chain([[...C.add(x,[-.06,.06,0]),.06],[...C.add(x,[.04,.13+p,.03]),.045],[...C.add(x,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...C.add(x,[-.06,.02,0]),.06],[...C.add(x,[-.18-u,-.05+p+m*.1,.02]),.045],[...C.add(x,[-.3-u*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const y of[-1,1])o.ell(C.add(x,[-.015,0,y*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...C.add(x,[-.005,.03,-.095]),.015],[...C.add(x,[-.005,.11,-.05]),.015],[...C.add(x,[-.005,.125,0]),.015],[...C.add(x,[-.005,.11,.05]),.015],[...C.add(x,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(g,[.16,.014,.15],l.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(r?[[...C.add(g,[0,.01,0]),.085],[...C.add(g,[.06,.16,0]),.045],[...C.add(g,[.2,.22+p*.5,0]),.012]]:[[...C.add(g,[0,.01,0]),.085],[...C.add(g,[-.05-u-v*.5,.17-v*.3,0]),.045],[...C.add(g,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:y=>y[1]<g[1]+.045?l.MAGIC:void 0}),a){const y=af[t]+(r?[0,.06][n%2]:0),S=Math.cos(y),E=Math.sin(y),b=[0,d,0],A=R=>[b[0]+(R[0]-b[0])*S-(R[1]-b[1])*E,b[1]+(R[0]-b[0])*E+(R[1]-b[1])*S,R[2]],_=R=>[b[0]+(R[0]-b[0])*S+(R[1]-b[1])*E,b[1]-(R[0]-b[0])*E+(R[1]-b[1])*S,R[2]],w=R=>[R[0]*S-R[1]*E,R[0]*E+R[1]*S,R[2]];for(const R of o.parts)if(R.type==="ell"?(R.c=A(R.c),R.axes=R.axes.map(w)):(R.a=A(R.a),R.b=A(R.b)),R.paint){const P=R.paint;R.paint=(N,I)=>P(_(N),I)}for(const R of o.flats)R.c=A(R.c),R.u=w(R.u),R.v=w(R.v);const L=Math.min(...o.parts.map(R=>R.type==="ell"?R.c[1]-Math.max(...R.r):Math.min(R.a[1]-R.r1,R.b[1]-R.r2)));if(L<.08)for(const R of o.parts){const P=.08-L;R.type==="ell"?R.c=[R.c[0],R.c[1]+P,R.c[2]]:(R.a=[R.a[0],R.a[1]+P,R.a[2]],R.b=[R.b[0],R.b[1]+P,R.b[2]])}if(r){const R=A([-.45,d-.24,0]);for(let P=0;P<5;P++){const N=P+n*.5,I=.055-P*.008;o.ell([R[0]+.1+N*.08,Math.max(.04,R[1]-.02+Math.sin(N*1.9)*.04),Math.cos(N*1.3)*.06],[I,I*.8,I],P<2?l.BELLY:P%2?l.MAGIC:l.MAGIC2,{group:25+P,extra:!0})}}if(i){const R=A([-.8,d,0]);for(let P=0;P<5;P++){const N=P+n*.5,I=.05-P*.007;o.ell([R[0]-.02+Math.sin(N*2.1)*.06,Math.max(.04,R[1]-.08-N*.09),Math.cos(N*1.7)*.05],[I,I,I],P%2?l.MAGIC:l.MAGIC2,{group:20+P,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const ec=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),ho=new Map,Tu=n=>(ho.has(n)||ho.set(n,En(Au({frame:0}),{height:n}).s),ho.get(n)),tc=(n={})=>Tu(ec(n));function uf(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s}={}){const r=ec(n),a=Au({frame:e,lean:t,pose:s}),{sp:o,project:h}=s?En(a,{scale:Tu(r),facing:i}):En(a,{height:r,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let c=0;for(let d=0;d<400&&c<6;d++){const f=d*37%o.w,u=d*53%Math.floor(o.h*.8);o.get(f,u)||o.get(f+1,u)||o.get(f-1,u)||o.get(f,u+1)||o.get(f,u-1)||(f*7+u*13+e*5)%11||(o.px(f,u,l.MAGIC2),c++)}return o}const ct=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Hs=n=>{const e=ct(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},df=n=>e=>{const t=ct(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Ai=(n,e,t,i,s=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?l.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?l.STONED:void 0}),Hr=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:df(e)}),hn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Hs}),Gr=(n,e,t,i,s,r=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=ct(s,o)*6.283,c=t*Math.sqrt(ct(o,s)),d=Math.cos(h)*c,f=Math.sin(h)*c*.7;n.ell([d,r*.3,f],[.07,r*(.35+ct(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?l.LEAF:void 0})}},Wr=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),ff={"sleeping-giant"(n){const e=t=>i=>{const s=ct(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?l.LEAF3:s>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Ai(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Ai(n,[-.2,.16,.95],[.2,.15,.18],4),Ai(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),Gr(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),Wr(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ct(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+ct(e,2)*.7,a=C.add(s,[0,r,0]);n.seg(s,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:Hs});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...C.add(a,C.add(C.mul(c,.45),[0,.18,0])),.04],[...C.add(a,C.add(C.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Ai(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Wr(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=C.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(C.dot(C.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&ct(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(C.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(C.add(e,C.add(C.mul(t,i*.4),[0,.1,-.42])),C.add(e,C.add(C.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),Gr(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=C.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,c=Math.hypot(o,h),d=Math.atan2(h,o);return c>r*.82||c<r*.18?l.BARKD:Math.abs(Math.sin(d*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=ct(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(ct(t,o)-.5)*.5,.25+o*.25+ct(o,t)*.2,r*(1-o*.3)+(ct(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>ct(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])hn(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Hr(n,t,i,3);hn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ct(i,s)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+ct(e)*.35;n.box(C.add(i,[0,s/2,0]),[.13,s/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>s*.85?l.MOSS:void 0});const r=C.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,C.add(r,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(C.add(r,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>ct(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],C.add(e,[Math.cos(s)*.08,.1+ct(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>ct(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?l.BARKL:void 0})},"root-arch"(n){hn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),hn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),hn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),hn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Hr(n,e,t,4);for(let e=0;e<4;e++)Ai(n,[-.7+e*.45,.12,(ct(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>ct(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Ai(n,[-1.4+e*.7,.12,.9+ct(e)*.3],[.2,.15,.18],4+e);Gr(n,16,1.8,10,9,.25)},"heron-rookery"(n){hn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{hn(n,[[...s,.07],[...r,.04]],2),n.ell(C.add(r,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<r[1]+.02?l.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Hr(n,s,r,7);const t=C.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...C.add(t,[.12*i,.06*i,0]),.035*i],[...C.add(t,[.2*i,.22*i,0]),.03*i],[...C.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(C.add(t,[.18*i,.33*i,0]),C.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const s of[-.04,.04])n.seg(C.add(t,[0,-.06*i,s]),C.add(t,[.02,-.42,s]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ct(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ct(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,C.add(s,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(C.add(s,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=ct(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){Wr(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=ct(e,7)*6.283,i=1.5+ct(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+ct(e,9)*.5;n.seg(s,C.add(s,[0,r,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(C.add(s,[0,r-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){Wr(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ct(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Ai(n,[.3,.07,.3],[.09,.07,.08],6,!1),Ai(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?l.MAGIC2:void 0});Gr(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){hn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>hn(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),hn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),hn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:r}),n.ell(C.add(s,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:r}),n.seg(C.add(s,[.15,.07,0]),C.add(s,[.22,.05,0]),.015,.004,l.BODY2,{group:r}),n.seg(C.add(s,[-.1,0,0]),C.add(s,[-.22,-.04,0]),.04,.015,l.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],C.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(C.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),C.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(C.add(i,[0,-.27,0]),C.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>ct(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Ai(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(C.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),C.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(C.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(C.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:Hs}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:Hs});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:Hs});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;hn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:Hs(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){hn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),hn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),hn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;hn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Hr(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ct(e,1)-.5)*3,.05+ct(e,2)*.5,(ct(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=ct(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},Ru={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function pf(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new Tt(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function mf(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:pe(i,.45,.36),[l.BARKD]:pe(i+.03,.5,.17),[l.BARKL]:pe(i,.35,.55),[l.BARK2]:pe(i+.02,.45,.26),[l.LEAF]:pe(t,.55,.45),[l.LEAF2]:pe(t-.03,.5,.62),[l.LEAF3]:pe(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:pe(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:pe(e.magicHue??.45,.6,1),[l.MAGIC2]:pe(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function gf(n,e,t,i=16){const s=new qe({blend:.05});ff[n](s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=(Object.values(Ru).find(([u])=>u===n)||[,,1])[2],a=En(s,{scale:tc(t)*r}),{sp:o,x0:h,y0:c}=pf(a.sp),[d,f]=a.project([0,0,0]);return{sp:o,colours:mf(e,t),origin:{x:+(d-h).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const xf=1.3,Mf=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*xf,n.growth],ur=(n,e,t=1)=>Math.round(e.size*Mf(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),nc=(n,e)=>{const t=Nr(e);for(let i=0;i<9;i++){const s=Math.floor(fe(t,2,n.w-2)),r=Math.floor(fe(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,l.MAGIC)}};function Ja(n,e,t,i,s,r,a,o){const h=C.add(e,[-i*.7,i*(.75+s),t*i*.35]),c=C.norm(C.sub(h,e)),d=C.norm(C.sub([1,0,0],C.mul(c,C.dot([1,0,0],c)))),f=Math.hypot(...C.sub(h,e));n.flat(C.add(C.lerp(e,h,.5),C.mul(d,-i*.14)),c,d,f*.55,i*.34,Ms.wing(r,a),{group:o,extra:!0})}const ic=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),ur(1,e)*t*.72))):n===2?Math.round(Math.max(ur(1,e)*t*1.08,Math.min(ur(2,e,t),ur(1,e)*1.4))):ur(n,e)*t;let ba=null;function vf(n,e){const t=ba;ba=n;try{return e()}finally{ba=t}}const _f=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},bf=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function sc(n){const e=ba,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:C.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:C.norm([1,.4,0])},a=C.norm(r.dir),o=C.norm(C.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=C.cross(a,o),c=[],d=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const x=M/16*Math.PI*2,g=C.add(C.mul(o,Math.cos(x)),C.mul(h,Math.sin(x)));let v=0;for(;v<.8&&n.field(C.add(r.c,C.mul(g,v)))<0;)v+=.01;v>=.8&&(v=r.r),c.push([...C.add(r.c,C.mul(g,v+d*.7)),d])}n.chain(c,l.COLLAR,{group:60,extra:!0});const f=c.reduce((M,x)=>x[0]-x[1]*.6+x[2]*.5>M[0]-M[1]*.6+M[2]*.5?x:M),u=d*1.3*(r.tag||1),p=C.norm(C.add(C.norm(C.sub(f.slice(0,3),r.c)),[.3,-.5,.3]));let m=f.slice(0,3);for(let M=0;M<60&&n.field(m)<u*.4;M++)m=C.add(m,C.mul(p,.01));n.ell(m,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||C.add(qe.surface(i.c,i.r,C.norm([-.15,1,.1])),[0,s*.1,0]),o=C.norm([.3,1,.35]),h=r*1.5,c=C.add(a,C.mul(o,h));n.seg(C.add(a,C.mul(o,-r*.1)),c,r*.48,r*.04,l.HAT1,{group:61,extra:!0,paint:d=>Math.floor(C.dot(C.sub(d,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[r*.17,r*.17,r*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=c=>C.add(c,C.mul(C.norm(C.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(C.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[r,a]){const d=C.norm(C.sub(c,i.c)),f=C.norm(C.cross([0,1,0],d)),u=C.cross(d,f),p=e.glasses==="heart"?bf:_f,m=h*1.5;n.flat(o(c),f,u,m,m,(M,x)=>p(M,x)?p(M*1.3,x*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=C.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:r.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&ri(c,60,.28)?l.GLINT:void 0})}}function Sf(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=U=>a&&n.legend.includes(U),d=new qe,f=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,m=t?-.04:0,M=1+m,x=r.chest*(a?1.06:1)/p+m,g=r.tuck/p+m,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),y=.06*r.legW*(a?1.1:h?1.7:1),S=r.back==="hump"?.1:0,E=r.back==="arch"?.1:0,b=x+.12,A=U=>{if(r.belly&&U[1]<b&&U[0]>-u*.5)return l.BELLY;if(r.saddle&&U[1]>M-.18&&U[0]<u*.55)return l.BODY2;if(r.spots&&U[1]>x+.1&&ri(U,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?l.BELLY:r.spots==="young"?void 0:l.BODY3;if(r.ridge&&U[1]>M-.08+S*.5)return l.BODY3};if(d.ell([u*.48,(M+x)/2+S*.5,0],[u*.62,(M-x)/2+S*.5,v],l.BODY,{paint:A}),d.ell([-u*.5,(M+g)/2+E*.6,0],[u*.58,(M-g)/2+E*.6,v*.93],l.BODY,{paint:A}),d.ell([0,(M+(x+g)/2)/2+.02,0],[u*.6,(M-(x+g)/2)/2,v*.9],l.BODY,{paint:A}),r.ridge)for(let U=0;U<(a?16:10);U++){const Q=-u*.8+U*u*1.75/(a?15:9),le=(.07+(a?.04:0))*(1+.5*Math.max(0,Q/u));d.ell([Q,M+.02+S*Math.max(0,1-Math.abs(Q/u-.5)*2)+le*.5,0],[le,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let U=0;U<14;U++){const Q=U/14*Math.PI*2;d.ell([u*Math.cos(Q)*.7,(M+x)/2+Math.sin(Q)*.2,v*(U%2?.5:-.5)],[.16,.14,.14],l.BODY)}const _=[.32,-.32][t],w=(U,Q)=>{const le=Q*v*.62,_e=U?u*.62:-u*.62,ne=(U?1:-1)*Q*_,re=U?x+.1:g+.15,z=(U?Q:-Q)*(t?1:-1)>0?.06:0,K=[_e+Math.sin(ne)*.2+(U?.02:.1),Math.max(.3,re*.55),le],B=[_e+Math.sin(ne)*.42,.05+z,le],oe=[_e,re+.12,le*.8],ae=Q>0?r.legMat||l.BODY:r.legMat?l.BODY3:l.BODY2,ve=U?[[...oe,y*1.5],[...K,y*1.05],[...B,y*.9]]:[[...oe,y*2*(r.haunch||1)],[...C.add(K,[-.12,.06,0]),y*1.2],[...C.add(B,[-.06*(r.hindFoot||1),.12,0]),y*.9],[...B,y*.9]];d.chain(ve,ae,{group:Q>0?6+(U?1:0):2,paint:r.socks?ue=>ue[1]<r.socks?l.BODY3:void 0:void 0});const ge=(r.paw==="hoof"?.07:.09)*r.legW**.5*(U?1:r.hindFoot||1);d.ell(C.add(B,[ge*.5,-.01,0]),[ge,y*.9,y*1.1],r.paw==="hoof"?l.NOSE:ae,{group:Q>0?6+(U?1:0):2}),d.anchors.feet.push({c:C.add(B,[ge*.5,-.01,0]),r:Math.max(ge,y*1.1),group:Q>0?6+(U?1:0):2})};for(const U of[-1,1])w(!0,U),w(!1,U);const L=[u*.82,M-.12,0],R=[L[0]+Math.cos(r.neckAng)*r.neck*.9,L[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];d.seg(L,R,r.neckW*.55,r.neckW*.42,l.BODY,{paint:U=>r.belly&&U[1]<(L[1]+R[1])/2-.05?l.BELLY:r.face==="dark"?l.BODY2:void 0});const P=U=>{if(r.face==="badger")return Math.abs(U[2])<f*.22+(U[0]-R[0])*.1||U[1]<R[1]-f*.1?l.BELLY:l.BODY3;if(r.face==="dark")return l.BODY2;if((r.belly||r.muzzle)&&U[1]<R[1]-f*.35)return l.BELLY};d.ell(R,[f*1.05,f*.92,f*.88],l.BODY,{paint:P});const N=f*r.snout*(h?.55:o?.78:1),I=f*r.snoutD*.55,F=[R[0]+f*.65+N*.5,R[1]-f*.28,0];d.ell(F,[N*.62+f*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:U=>(r.muzzle||r.belly)&&U[1]<F[1]-I*.1?l.BELLY:P(U)});const G=[F[0]+N*.62+f*.1,F[1]-.02,0];d.ell(G,[f*(r.disc?.1:.12),f*(r.disc?.2:.12),f*(r.disc?.2:.15)],l.NOSE,{group:1});for(const U of[-1,1]){const Q=qe.surface(R,[f*1.05,f*.92,f*.88],C.norm([.75,.32,U*.62]));d.ell(Q,[f*.13,f*.16,f*.13].map(le=>le*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?l.MAGIC2:l.EYE,{group:1})}d.anchors.head={c:R,r:[f*1.05,f*.92,f*.88],top:[R[0]-f*.1,R[1]+f*.82,0]},d.anchors.eyes={pts:[-1,1].map(U=>qe.surface(R,[f*1.05,f*.92,f*.88],C.norm([.75,.32,U*.62]))),size:f*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},d.anchors.neck={c:C.lerp(L,R,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:C.norm(C.sub(R,L)),tag:h?1.8:o?1.3:1};for(const U of[-1,1]){const Q=r.ear,le=[R[0]-f*.15,R[1]+f*.7,U*f*.5],_e=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(Q==="none")continue;if(Q==="round"){d.ell(le,[f*.22,f*.25*_e,f*.1],l.BODY,{group:1,paint:ve=>ve[0]>le[0]+f*.02?l.EAR:void 0});continue}const ne=Q==="long",re=Q==="small"?-.6:0,z=f*.55*_e*(Q==="big"?1.35:ne?2.2:1),K=f*.3*(Q==="big"?1.2:ne?1.35:1),B=C.norm([re*.6-(ne?.3:.12),1,U*.3]),oe=C.norm([.55,.2,U]),ae=C.norm(C.cross(oe,B));d.flat(C.add(le,C.mul(B,z)),ae,B,K,z,Ms.ear(l.BODY,l.EAR,l.BODY3),{group:5+(U>0?0:20),extra:ne}),Q==="tuft"&&d.seg(C.add(le,[0,z*1.4,U*.02]),C.add(le,[0,z*1.85,U*.04]),f*.05,f*.02,l.BODY3,{group:1})}const q=[-u*1.05,M-.1+E*.5,0],se=t?.04:-.02;if(c("tails")||yf(d,c("starTail")?"star":r.tail,q,u,M,se),r.horns)for(const U of[-1,1]){const Q=o?.6:h?.35:c("hornsGlow")?1.4:1,le=[];for(let _e=0;_e<=8;_e++){const ne=.3-_e/8*Math.PI*1.6,re=f*.65*Q*(1-.45*_e/8);le.push([R[0]-f*.1+Math.cos(ne)*re,R[1]+f*.45+Math.sin(ne)*re,U*(f*.6+_e*.015)]),le[_e].push(f*.2*Q*(1-.6*_e/8))}d.chain(le,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(r.antlers||c("jackalope"))for(const U of[-1,1])wf(d,r,[R[0]-f*.05,R[1]+f*.75,U*f*.4],U,e,c);if(r.tusks)for(const U of[-1,1]){const Q=o?.4:h?0:c("tusksBig")?1.3:.75;if(!Q)continue;const le=[F[0]+N*.25,F[1]-I*.4,U*I*.8];d.chain([[...le,.045*Q],[...C.add(le,[.1*Q,.1*Q,U*.03]),.04*Q],[...C.add(le,[.06*Q,.24*Q,U*.05]),.02*Q]],l.ACCENT,{group:8})}r.teeth&&!h&&d.ell([G[0]-f*.1,G[1]-f*.25,0],[f*.08,f*.14,f*.12],l.ACCENT,{group:1});const k=U=>[-u*.9+U*u*1.65,M+S*Math.max(0,1-Math.abs(U-.8)*3)+E*(1-Math.abs(U-.4)*2),0];if(c("wings"))for(const U of[-1,1])Ja(d,[u*.2,M,U*v*.5],U,1.15,t?.1:0,U>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(U>0?10:0));if(c("mane")||c("flames"))for(let U=0;U<7;U++){const Q=U/6,le=C.lerp(C.add(R,[-f*.5,f*.3,0]),k(.55),Q),_e=[.4,.3,.45,.28,.38,.25,.3][U],ne=C.norm([-.35-(t?.1:0),1,0]);d.flat(C.add(le,C.mul(ne,_e*.5)),[1,0,0],ne,_e*.32,_e*.55,Ms.flame(U%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+U%2,extra:!0})}if(c("tails"))for(let U=0;U<7;U++){const Q=Math.PI*(.55+U*.08),le=(U-3)*.1,_e=C.add(q,[Math.cos(Q)*.9,Math.sin(Q)*.85,le]);d.chain([[...q,.1],[...C.lerp(q,_e,.5),.17],[..._e,.08]],U%2?l.BODY2:l.BODY,{group:70,extra:!0}),d.ell(_e,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((U,Q)=>{const le=k(U),_e=[.3,.5,.4,.6,.35][Q];d.ell(C.add(le,[0,_e*.45,(Q%2-.5)*.1]),[_e*.55,.08,.08],l.MAGIC,{dir:[(Q-2)*.12,1,0],group:80+Q%2,extra:!0,paint:ne=>ne[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let U=0;U<6;U++)d.ell(k(.08+U*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[U,Q]of[[.25,.55],[.5,.8],[.75,.45]]){const le=k(U);d.seg(le,C.add(le,[0,Q*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),d.ell(C.add(le,[0,Q*.8,0]),[Q*.28,Q*.26,Q*.28],l.LEAF2,{group:87,extra:!0,paint:_e=>_e[1]<le[1]+Q*.72?l.LEAF3:void 0})}for(const U of[.12,.4,.65,.9]){const Q=k(U);d.ell(C.add(Q,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let U=0;U<3;U++){const Q=[];for(let le=0;le<9;le++){const _e=le/8;Q.push([u*(.5-_e*2.2),M+.05+U*.1+_e*(.25+U*.12)+Math.sin(_e*6+t+U)*.07,(U-1)*.18,.04*(1-_e*.6)])}d.chain(Q,U%2?l.MAGIC2:l.MAGIC,{group:90+U,extra:!0})}sc(d);const{sp:ee}=En(d,{height:ic(e,i,r.hgt),facing:s});return a&&nc(ee,n.id.length*7919),ee}function yf(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(C.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(C.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>ri(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],l.BODY3,a))}function wf(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const d=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const x=C.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,x,d*1.3,d*1.2,h,c);for(let g=0;g<5;g++){const v=.35+g*.3,y=C.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),S=(.24+.05*(g%2))*o;n.ell(C.add(x,C.mul(y,S*.55)),[S*.6,d*1.5,d*.6],h,{...c,dir:y,up:[0,0,1]})}return}const u=C.add(t,[-.18*o,.3*o,f*.4]),p=C.add(t,[-.25*o,.62*o,f*.8]),m=C.add(t,[-.1*o,.95*o,f]);n.chain([[...t,d*1.2],[...u,d],[...p,d*.85],[...m,d*.4]],h,c);const M=(x,g,v,y)=>n.seg(x,C.add(x,C.mul(C.norm(g),v)),y,y*.35,h,c);M(C.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,d*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,d*.7),o>.7&&(M(p,[.8,1,0],.28*o,d*.6),M(m,[.3,1,i*.2],.18*o,d*.5))}function Ef(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=m=>r&&n.legend.includes(m),c=new qe,d=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+d;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,l.BODY2,{group:2});for(const x of[-.04,0,.04])c.ell([.16,.03+M,m*.15+x],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+d,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<u-f*.5?Math.floor(m[1]*18)%3===0&&ri(m,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const m of[-1,1])c.ell([-.06,.58+d,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>ri(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[f,f*.9,f],l.BODY);for(const m of[-1,1]){const M=C.norm([.75,-.05,m*.4+.35]),x=C.add(qe.surface([0,u,0],[f,f*.9,f],M),C.mul(M,-f*.05));c.ell(x,[f*.22,f*.46,f*.4],l.BELLY,{group:1,dir:M});const g=C.add(x,C.mul(M,f*.14));c.ell(g,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),r?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(C.add(g,C.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),r?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(C.add(g,C.mul(M,f*.07))),o||c.ell([f*.05,u+f*.8,m*f*.6],[f*.32,f*.12,f*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(qe.surface([0,u,0],[f,f*.9,f],C.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const m of[-1,1])Ja(c,[-.05,.8+d,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(h("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,u,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},sc(c);const{sp:p}=En(c,{height:ic(e,i,.95),facing:s});return r&&nc(p,31),p}const ts=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(qe.surface(e,t,C.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>qe.surface(e,t,C.norm(o))),size:s}},Cu=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function Zn(n,e,t,i,s,r){sc(n);const{sp:a}=En(n,{height:ic(t,i,s),facing:r});return t===3&&nc(a,e.id.length*131),a}const Lu=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(C.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},rc=(n,e)=>e.forEach(([t,i],s)=>n.ell(C.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?l.MAGIC2:void 0}));function Af(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:f=>ri(f,22,.3)?l.BODY3:ri(f,19,.12)?l.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),p=f/46*.9+.05,m=C.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);m[0]>.55||a.ell(C.add(qe.surface(h,c,m),C.mul(m,.02)),[.1,.025,.025],f%4?l.BODY2:l.BODY3,{dir:C.add(m,[-.4,0,0]),group:1})}const d=[.48,.22,0];return a.ell(d,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),ts(a,d,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?l.MAGIC2:l.EYE),r&&rc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Zn(a,n,e,i,.6,s)}function Tf(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.05:0;for(const d of[-1,1])a.ell([-.22,.16,d*.36],[.24,.13,.12],d>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:d>0?6:2,paint:f=>ri(f,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,d*.4],[.16,.04,.08],d>0?l.BODY:l.BODY2,{group:d>0?6:2}),a.seg([.35,.2+o,d*.24],[.42,.03,d*.3],.05,.04,d>0?l.BODY:l.BODY2,{group:d>0?7:2}),a.anchors.feet.push({c:[.45,.03,d*.3],r:.06,group:d>0?7:2},{c:[.12,.04,d*.4],r:.08,group:d>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:d=>d[1]<h[1]-.12?l.BELLY:d[0]>.38&&Math.abs(d[1]-(h[1]-.02))<.018?l.LINE:ri(d,14,.22)?l.BODY3:void 0});for(const d of[-1,1]){const f=[.3,.55+o,d*.17];a.ell(f,[.1,.09,.1],l.BODY,{group:1}),a.ell(qe.surface(f,[.1,.09,.1],C.norm([.6,.5,d*.5])),[.05,.05,.05],r?l.MAGIC2:l.IRIS,{group:1}),a.ell(qe.surface(f,[.11,.1,.11],C.norm([.65,.45,d*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(d=>qe.surface([.3,.55+o,d*.17],[.1,.09,.1],C.norm([.6,.5,d*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&Lu(a,[.15,.66+o,0],.16),Zn(a,n,e,i,.55,s)}function Rf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new qe,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const d=[.36,.84+c,0],f=a?.19:.16;if(h.ell(d,[f*1.1,f,f*.95],l.BODY,{paint:u=>u[1]>d[1]+f*.55?l.BELLY:void 0}),h.ell(C.add(d,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],l.NOSE,{dir:[1,-.2,0],group:1}),ts(h,d,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,r?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])Ja(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return Zn(h,n,e,i,.75,s)}function Cf(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,d=a("wingsBig")?1.5:1;Cu(o,0,.3*d);for(const u of[-1,1]){const p=[0,c+.05,u*.1],m=[.05,c+(h?.35:-.05),u*.45*d],M=[[-.05,c+(h?.45:-.15),u*.85*d],[-.25,c+(h?.2:-.25),u*.75*d],[-.3,c+(h?0:-.25),u*.4*d]],x=a("wingsBig")?l.MAGIC:l.BODY2,g=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,g,{group:11});for(const b of M)o.seg(m,b,.02,.012,g,{group:11});const v=C.sub(M[0],p),y=C.norm(v),S=C.norm(C.sub(M[2],m)),E=C.norm(C.sub(S,C.mul(y,C.dot(S,y))));o.flat(C.add(C.lerp(p,M[0],.5),C.mul(E,.12*d)),y,E,Math.hypot(...v)*.55,.3*d,Ms.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const f=[.08,c+.2,0];o.ell(f,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(C.add(f,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?l.EAR:void 0});return ts(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?l.MAGIC2:l.EYE),o.ell(qe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),Zn(o,n,e,i,.55,s)}function Lf(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let d=0;d<4;d++)a.ell(C.add(c,[.14,-.01,h*(d-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(qe.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,h*.35])),[.015,.015,.015],r?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>qe.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&Lu(a,[.15,.62,0],.15),Zn(a,n,e,i,.55,s)}function Pf(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new qe;for(const f of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,m=(u+(f>0?1:0)+t)%2?.06:-.06,M=[p,.22,f*.2];o.chain([[...M,.03],[p+m+(1-u)*.06,.32,f*.42,.025],[p+m*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?l.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),d=a("horn")?l.MAGIC:l.BODY3;for(const f of[-1,1]){const u=C.add(h,[.08,.02,f*.1]),p=C.add(u,[c*.7,c*.45,f*c*.15]),m=C.add(p,[c*.25,-c*.12,-f*c*.12]);o.chain([[...u,.045],[...p,.035],[...m,.015]],d,{group:8+(f>0?1:0)}),o.seg(C.lerp(u,p,.55),C.add(C.lerp(u,p,.55),[0,c*.22,0]),.02,.008,d,{group:8})}for(const f of[-1,1])o.chain([[...C.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],l.BODY3,{group:9,extra:!0});return ts(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?l.MAGIC2:l.EYE,9),a("crystals")&&rc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Zn(o,n,e,i,.5,s)}function Df(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const d of[-1,1])a.seg([.7+o,.32,d*.04],[.78+o,.55,d*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,d*.1],[.03,.03,.03],r?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(d=>[.78+o,.57,d*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=r?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:d=>{const f=Math.atan2(d[1]-h[1],d[0]-h[0]);return((Math.hypot(d[0]-h[0],d[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?l.MAGIC2:l.BODY3:void 0}}),Zn(a,n,e,i,.45,s)}function If(n,e,t,i,s="towards"){const r=e===3,a=new qe;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,d=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+d,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),ts(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?l.MAGIC2:l.EYE),r&&rc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Zn(a,n,e,i,.4,s)}function Nf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new qe,c=t?.7:0,d=[];for(let p=0;p<=12;p++){const m=p/12;d.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}d.push([.38,.25,d[12][2],.07],[.42,.45,d[12][2]*.8,.065]),h.chain(d,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:ri([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const f=[.5,.5,d[13][2]*.8],u=a?.11:.09;if(h.ell(f,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),ts(h,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?l.MAGIC2:l.EYE),t||h.seg(C.add(f,[u*1.4,-u*.2,0]),C.add(f,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:C.add(d[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,d[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Ja(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return Zn(h,n,e,i,.45,s)}function Of(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,d=a("wingsBig")?1.45:1,f=a("wingsBig")?l.MAGIC:l.BODY;Cu(o,0,.3*d);for(const u of[-1,1]){const p=h?.5:-.1,m=C.norm([.35,p,u]),M=C.norm([-.3,p*.6,u]);o.flat(C.add([0,c,u*.05],C.mul(m,.38*d)),m,C.norm(C.cross(m,[0,1,0])),.4*d,.24*d,Ms.spotted(f,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(C.add([-.05,c,u*.05],C.mul(M,.26*d)),M,C.norm(C.cross(M,[0,1,0])),.27*d,.17*d,Ms.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>ri(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),ts(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?l.MAGIC2:l.EYE),Zn(o,n,e,i,.5,s)}function Ff(n,e,t,i,s="towards"){const r=e===3,a=c=>r&&n.legend.includes(c),o=new qe,h=t?.05:0;for(let c=0;c<9;c++){const d=c/8,f=-.6+d*1.15;o.ell([f,.12+Math.sin(d*Math.PI)*(.06+h),0],[.08,.1-d*.02,.12-d*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),ts(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?l.MAGIC2:l.EYE),Zn(o,n,e,i,.4,s)}function Uf(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new qe,h=[.15,.28,0];for(const d of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,p=(f+(d>0?0:1)+t)%2?.05:-.05,m=C.add(h,[.05-f*.04,0,d*.1]),M=C.add(m,[Math.cos(u)*.3*(f<2?1:-.6)+p,.3,d*.3]),x=C.add(m,[Math.cos(u)*.55*(f<2?1:-.8)+p*1.5,-.28,d*.55]);o.chain([[...m,.03],[...M,.028],[...x,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:d=>(Math.abs(d[2])<.03||Math.abs(d[0]+.28)<.03)&&d[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([d,f])=>qe.surface(h,[.18,.13,.17],C.norm([.9,d*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[d,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(qe.surface(h,[.18,.13,.17],C.norm([.9,d*6,f*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let d=0;d<5;d++){const f=Math.PI*(.2+d/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(d-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+d,extra:!0})}return Zn(o,n,e,i,.5,s)}const Bf=new Map(Object.entries({owl:Ef,hedgehog:Af,toad:Tf,raven:Rf,bat:Cf,mole:Lf,beetle:Pf,snail:Df,woodlouse:If,snake:Nf,moth:Of,glowworm:Ff,spider:Uf})),ac=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Pu=Object.fromEntries(ac.map(n=>[n.id,n])),al=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],ol={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},kf=["bar","star","heart"];function zf(n,e=!0){const t=Nr((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*al.length):null,glasses:i||t()<.4?kf[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(ol)[Math.floor(t()*3)]:null}}function Hf(n,e,t=null){const i=Gf(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[s,r,a]=al[t.hat%al.length];i[l.HAT1]=s,i[l.HAT2]=r,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=ol[t.shoes]||ol.sneakers;i[l.SHOE]=s,i[l.SOLE]=r}if(t.woken){i[l.WOKEN]=[255,40,36];for(const s of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function Gf(n,e){const t=Pu[n],i=e.cVal/.85,s=e.cSat/.6,r=pe(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:pe(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=pe(e.magicHue+t.hue*.3,.6,1),h=pe(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:r,[l.BODY2]:pe(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[l.BODY3]:pe(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:pe(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:pe(.3,.55,.55),[l.LEAF2]:pe(.25,.5,.75),[l.LEAF3]:pe(.33,.6,.35),[l.TRUNK]:pe(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:pe(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:pe(.12,.7,.85),[l.SKIN]:[238,158,192]}}const Wf=["size","growth","pixel","head","eye","legs","long","fur"],dr=new Map;function Vf(n,e,t,i,s="towards",r=null){const a=Pu[n]||ac[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...Wf.map(d=>i[d]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=dr.get(h);if(!c){if(c=vf(o,()=>a.q?Sf(a,e,t,i,s):Bf.get(a.plan)(a,e,t,i,s)),o?.woken)for(let d=0;d<c.m.length;d++)(c.m[d]===l.EYE||c.m[d]===l.IRIS||c.m[d]===l.PUPIL)&&(c.m[d]=l.WOKEN);dr.size>600&&dr.delete(dr.keys().next().value),dr.set(h,c)}return c}const Qa=.07,oc=.048,Qe=(...n)=>({l:n}),At=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),un=(n,e)=>({d:[n,e]}),xt=(n,e=.86)=>Qe([.5,e],[.5,n]),Mt=At(.5,.76,.13,25,155),Yf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},vt=(...n)=>n.flatMap(e=>[e,Yf(e)]);function Ti(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,d=s/r,f=-i/r,u=(o-Math.abs(a))*Math.sign(a),p=h-d*u,m=c-f*u,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let g=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;g>180;)g-=360;for(;g<-180;)g+=360;return At(p,m,o,M,M+g)}const Xf=(n,e,t,i,s,r=24)=>Qe(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),Kf=(n,e,t,i,s,r=0,a=40)=>Qe(...Array.from({length:a+1},(o,h)=>{const c=h/a,d=(r+c*s*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(d),e+f*Math.sin(d)]})),Vr=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return Qe([n+t*a,e+t*o],[n+i*a,e+i*o])}),qf={wolf:[xt(.3),Qe([.28,.08],[.5,.3],[.72,.08]),At(.5,.55,.2,-55,55),Mt,un(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[xt(.34),Qe([.36,.06],[.5,.34],[.64,.06]),At(.67,.66,.17,180,-80),un(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),Mt],badger:[xt(.1),Qe([.24,.3],[.76,.3]),...vt(Qe([.33,.14],[.33,.56])),Mt,...vt(un(.24,.3))],boar:[xt(.16),...vt(At(.36,.24,.15,45,180)),...Vr(.5,.16,0,.1,[-130,-90,-50]),Mt],stag:[xt(.42),...vt(Qe([.5,.42],[.34,.26],[.3,.06]),Qe([.335,.25],[.16,.2]),Qe([.32,.15],[.18,.07])),Mt],hare:[xt(.44),...vt(Qe([.5,.44],[.4,.34],[.38,.06])),At(.62,.66,.09,180,540),Mt,...vt(un(.38,.06))],owl:[xt(.44),...vt(At(.33,.3,.13,0,360),Qe([.24,.18],[.18,.05])),Mt,...vt(un(.33,.3))],bear:[xt(.24),Qe([.24,.3],[.76,.3]),...vt(At(.3,.3,.09,180,360)),...vt(Qe([.36,.5],[.32,.62])),Mt],hedgehog:[xt(.52),At(.5,.52,.2,180,360),...Vr(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),Mt],squirrel:[xt(.2),Qe([.5,.2],[.4,.08]),At(.66,.4,.16,100,-200),un(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),Mt],toad:[xt(.42),Qe([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...vt(At(.34,.3,.1,0,360)),Mt,...vt(un(.16,.54))],otter:[xt(.24),At(.5,.5,.28,-100,100),un(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ti([.18,.64],[.36,.64],.3),Mt],lynx:[xt(.32),Qe([.26,.2],[.5,.32],[.74,.2]),...vt(Qe([.26,.2],[.26,.06])),Qe([.5,.68],[.66,.62]),Mt,...vt(un(.26,.06))],elk:[xt(.3),...vt(Qe([.5,.3],[.42,.2]),At(.3,.16,.12,0,180),Qe([.18,.16],[.14,.06])),Qe([.5,.44],[.6,.52]),Mt],raven:[xt(.14),Qe([.5,.14],[.3,.22]),Qe([.18,.56],[.5,.38],[.82,.56]),Mt,un(.58,.17),...vt(un(.18,.56))],bat:[xt(.3),At(.5,.16,.14,20,160),...vt(Qe([.5,.38],[.12,.26]),Ti([.12,.26],[.24,.46],-.25),Ti([.24,.46],[.38,.5],-.3),Ti([.38,.5],[.5,.52],-.3)),Mt],mole:[xt(.44),At(.5,.3,.16,0,180),...Vr(.5,.3,.19,.3,[-160,-125,-55,-20]),Qe([.5,.14],[.5,.04]),Mt],beaver:[xt(.36),Qe([.32,.2],[.68,.2]),...vt(Qe([.44,.2],[.44,.34])),Qe([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),Mt],stoat:[xt(.18),At(.5,.44,.24,180,360),Qe([.5,.18],[.6,.08]),Mt,...vt(un(.26,.44))],snail:[xt(.52),Kf(.5,.33,.03,.2,1.6,90),Qe([.66,.2],[.76,.06]),Mt,un(.76,.06)],ram:[xt(.24),...vt(At(.36,.24,.14,0,-250)),Mt,...vt(un(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[xt(.24),At(.5,.52,.22,205,335),At(.5,.66,.24,205,335),At(.5,.38,.2,205,335),...vt(Qe([.5,.24],[.32,.06])),Mt],snake:[xt(.16),Xf(.5,.82,.2,.2,1.25),Qe([.5,.2],[.5,.11]),...vt(Qe([.5,.11],[.42,.045])),Mt],moth:[xt(.2),...vt(Qe([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Qe([.5,.5],[.3,.64],[.5,.66]),At(.38,.16,.12,0,-110)),Mt],marten:[xt(.32),Qe([.3,.2],[.5,.32],[.7,.2]),...vt(At(.3,.14,.07,90,-180)),At(.28,.56,.22,0,150),un(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),Mt],salamander:[xt(.3),Ti([.5,.3],[.5,.06],.35),Ti([.5,.3],[.5,.06],-.35),...vt(Qe([.5,.42],[.32,.38],[.26,.48]),Qe([.5,.64],[.32,.6],[.26,.7])),Mt,...vt(un(.38,.52))],glowworm:[xt(.4),At(.5,.27,.1,90,450),...Vr(.5,.27,.15,.25,[0,60,120,180,240,300]),Mt],spider:[Qe([.5,.05],[.5,.3]),xt(.5),At(.5,.4,.11,-90,270),...vt(...[-150,-170,170,150].map(n=>Qe([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Mt,un(.5,.05)],dormouse:[xt(.12),At(.5,.46,.24,-60,250),...vt(At(.34,.16,.08,90,-180)),Ti([.56,.38],[.7,.38],-.4),Mt],beetle:[xt(.36),...vt(At(.66,.26,.2,160,250)),Ti([.5,.38],[.5,.82],.25),Ti([.5,.38],[.5,.82],-.25),Mt]},Zc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},$f={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},Cr=n=>Zc[$f[n]]||Zc.cyan,Zf=[255,255,250],Jf=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),Jc=n=>`rgb(${n.join(",")})`;function Qf(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Sa(n){if(n.d)return{dot:!0,pts:[n.d],len:oc*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,d)=>{const f=(a+(o-a)*d/h)*Math.PI/180;return[i+r*Math.cos(f),s+r*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const ll=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},uo=new Map;function Du(n){return uo.has(n)||uo.set(n,ll((qf[n]||[]).map(e=>({...Sa(e),w:Qa,part:"sigil"})))),uo.get(n)}const fo=new Map;function jf(n,e=0){const t=n+":"+e;if(fo.has(t))return fo.get(t);const i=e===null?null:Qf(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=Qa*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=m=>Sa({a:[.5,.5,m,90,450]});for(let m=0;m<i.rings;m++)h.push({...p(.44-m*.06),w:o,part:"ring"});for(let m=0;m<i.dots;m++){const M=(90+m*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let m=0;m<16;m++){const M=(90+m*22.5)*Math.PI/180,x=.44-.06+.014,g=.44-.014;h.push({...Sa({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let m=0;m<i.rays;m++){const M=(90+m*360/i.rays)*Math.PI/180,x=.44+.02,g=.5-o/2;h.push({...Sa({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+g*Math.cos(M),.5+g*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),d=Du(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([p,m])=>[r+p*s,r+m*s]),w:u.w*s*c,r:oc*s*c,part:"sigil"})),f={level:e,frame:i,k:s,strokes:[...ll(h,0,h.length?.15:0),...ll(d,h.length?.15:0,1)]};return fo.set(t,f),f}function e0(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function t0(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=Cr(e),progress:o=1,glow:h=!0}={}){const c=jf(e,r),d=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const f=(u,p,m,M)=>{n.globalAlpha=m,n.strokeStyle=n.fillStyle=Jc(u),n.shadowColor=Jc(a),n.shadowBlur=M;for(const x of c.strokes){const g=e0(x,o);if(g){if(n.beginPath(),x.dot){n.arc(g[0][0],g[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,g.forEach((v,y)=>y?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(f(a,2.4,Math.min(d,.7)*.55,s/12),f(Jf(a,Zf,.72),.62,1,s/30)):f(a,1,1,0),n.restore()}function n0(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<oc+i-Qa/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],c=r.pts[o],d=c[0]-h[0],f=c[1]-h[1],u=d*d+f*f,p=Math.sqrt(u),m=u?Math.max(0,Math.min(1,((e-h[0])*d+(t-h[1])*f)/u)):0;if(Math.hypot(e-h[0]-d*m,t-h[1]-f*m)<i){const M=r.start+(a+m*p)/r.len*(r.end-r.start);M<s&&(s=M)}a+=p}}return s}function i0(n,e,t,i=Qa/2){return n0(Du(n),e,t,i)<1/0}ac.map(n=>n.id);const wr=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function vn(n,e,t,i,s,r,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const d=[];for(let g=0;g<9;g++){const v=g/9*Math.PI*2,y=1+(r()-.5)*.35*(s.clump+.3);d.push([e[0]+Math.cos(v)*t*y,e[1]+Math.sin(v)*i*y*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Za(d,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([pt(e,[-t*1.1,i*.15]),pt(e,[t*1.1,i*.1]),pt(e,[t*1.1,i*1.2]),pt(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([pt(e,[-t*.75,-i*.55]),pt(e,[t*.25,-i*.95]),pt(e,[t*.55,-i*.35]),pt(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),x=r()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const y=n.get(v,g);if(y!==a&&y!==l.LEAF2&&y!==l.LEAF3)continue;const S=ht(v,g,x),E=vi(v/2,g/2,x)*.5+S*.5;E<.16*s.density?n.recolour(v,g,y===l.LEAF2?a:l.LEAF2):E>1-.16*s.density&&n.recolour(v,g,y===l.LEAF3?a:l.LEAF3)}}function pn(n,e,t,i,s,r,a,o,{mat:h=l.TRUNK,bend:c=1,group:d=10,line:f=!1}={}){const u=[e],p=4;let m=t,M=e;for(let x=1;x<=p;x++)m+=(o()-.5)*.7*a.gnarl*c,M=pt(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),u.push(M);return n.limb(u.map((x,g)=>[...x,s+(r-s)*g/p]),h,{group:d,line:f,round:a.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:u}}function zi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,d=(8+r()*16)*a*(.4+s.roots),f=(2+r()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+d*.4),t-f],m=[e+c*(i*.5+d),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function ns(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==l.TRUNK)continue;const a=t?vi(s/1.3,i/6,21):vi(s/6,i/1.3,21);a>1-e.bark*.42||ht(s,i,4)<e.bark*.05?n.m[r]=l.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=l.BARKL)}}function zn(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,r-1),d=n.h-c,f=new Tt(h,d);for(let u=0;u<d;u++)for(let p=0;p<h;p++){const m=(u+c)*n.w+p+o,M=u*h+p;f.m[M]=n.m[m],f.g[M]=n.g[m],f.n[M*3]=n.n[m*3],f.n[M*3+1]=n.n[m*3+1],f.n[M*3+2]=n.n[m*3+2]}return{sp:f,crownY:t-c}}const oi=n=>(n.crownWidth||3)/3;function s0(n,e,t){const i=oi(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new Tt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=r;const m=(M,x,g,v,y)=>{const S=pn(a,M,x,g,v,v*.65,e,n,{group:12});if(y===0){u.push(S.end);return}const E=n()<.35?3:2;for(let b=0;b<E;b++){const A=(b-(E-1)/2)*fe(n,.5,.85)*(y===3?1.4:1);m(S.end,S.ang+A+(n()-.5)*.25,g*fe(n,.6,.78),v*.62,y-1)}y<=2&&u.push(wn(M,S.end,.7))};for(let M=0;M<c;M++){const x=f+(c>1?(M/(c-1)-.5)*.8:0),g=[o+(M-(c-1)/2)*d*.6,h],v=pn(a,g,-Math.PI/2+x,r*.36*(c>1?fe(n,.75,1.15):1),d,d*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const y of[-1,1])m(v.end,-Math.PI/2+x*.5+y*fe(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),r*.22*(.75+.25*i)*(c>1?.7:1),d*.7,c>2?2:3);if(c===1&&n()<.7&&m(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,d*.55,2),M===0&&e.treeHollow){const y=wn(g,v.end,.38);a.ellipse(y[0],y[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(zi(a,o,h,d*Math.sqrt(c),e,n,t),ns(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const x=u[M],g=u[M+1],v=Math.hypot(g[0]-x[0],g[1]-x[1]);if(v<40*t)for(let y=0;y<=v;y++){const S=wn(x,g,y/v);a.px(S[0],S[1]+Math.sin(y/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return zn(a,o,p+4*t);u.sort((M,x)=>M[1]-x[1]);for(const M of u)vn(a,pt(M,[0,-3*t]),fe(n,14,21)*t,fe(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&vn(a,pt(M,[fe(n,-9,9)*t,fe(n,-12,-3)*t]),fe(n,10,15)*t,fe(n,7,10)*t,e,n);return zn(a,o,p+4*t)}function r0(n,e,t){const i=.8+.2*oi(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new Tt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),zi(a,o,h,6*t,e,n,t*.6),ns(a,e);const c=Math.round(fe(n,9,12));for(let d=c-1;d>=0;d--){const f=d/(c-1),u=6*t+f*r*.7,p=(5+f*36)*t*i*fe(n,.9,1.1),m=(5+f*13)*t,M=[[o,u-4*t],[o+p*.5,u+m*.3],[o+p,u+m],[o+p*.7,u+m*1.15],[o,u+m*.7],[o-p*.7,u+m*1.15],[o-p,u+m],[o-p*.5,u+m*.3]];a.shape(Za(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+d,line:!1,round:e.round}),a.mark([[o-p,u+m*.55],[o+p,u+m*.55],[o+p,u+m*1.4],[o-p,u+m*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+m*.45],[o-p*.7,u+m*.7]],l.LEAF2,[l.LEAF])}return zn(a,o,r*.82)}function a0(n,e,t){const i=oi(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new Tt(s,r),o=s/2,h=r,c=13*t,d=pn(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let m=0;m<5;m++){const M=m%2?1:-1,x=-Math.PI/2+M*fe(n,.55,1.25)*(.7+.3*i),g=pn(a,d.end,x,r*fe(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(g.end)}zi(a,o,h,c,e,n,t),ns(a,e);for(const m of f)vn(a,pt(m,[0,-2*t]),fe(n,20,28)*t,fe(n,9,12)*t,e,n);vn(a,pt(d.end,[0,-8*t]),24*t,11*t,e,n);let u=s,p=0;for(const m of f)u=Math.min(u,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=u;m<p;m+=fe(n,1,1.7)){let M=r;for(let y=0;y<r;y++)if(a.get(m,y)===l.LEAF||a.get(m,y)===l.LEAF2||a.get(m,y)===l.LEAF3){M=y;break}if(M>=r)continue;const x=Math.abs(m-o)/(s/2),g=(h-M)*fe(n,.5,.9)*(1-x*.3),v=ht(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let y=M+2;y<Math.min(h-2,M+g);y++){const S=Math.round(Math.sin(y*.12+m)*.7);ht(m|0,y,5)<.2+e.density*.8&&a.px(m+S,y,(y-M)/g>.8?l.LEAF3:v,S*.3,.2,.95)}}return zn(a,o,d.end[1]+6*t)}function Iu(n,e,t){const i=.7+.3*oi(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new Tt(s,r),o=s/2,h=r,c=(n()-.5)*.25+(e.treeLean||0),d=pn(a,[o,h],-Math.PI/2+c,r*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<d.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const m=wn(d.pts[u],d.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(m[0]+M,m[1])===l.BARK2&&n()<.8&&a.recolour(m[0]+M,m[1],l.BARKD)}const f=[d.end];for(let u=0;u<7;u++){const p=fe(n,.35,.9),m=wn(d.pts[0],d.end,p),M=u%2?1:-1,x=pn(a,m,-Math.PI/2+M*fe(n,.5,1),r*fe(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});f.push(x.end)}for(const u of f)vn(a,u,fe(n,9,13)*t*i,fe(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return zn(a,o,r*.55)}function o0(n,e,t){const i=oi(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new Tt(s,r),o=s/2,h=r,c=10*t,d=pn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const m of[-1,1,-1,1]){const M=pn(a,d.end,-Math.PI/2+m*fe(n,.7,1.15)*(.7+.3*i),r*fe(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(M.end,wn(d.end,M.end,.55))}zi(a,o,h,c,e,n,t),ns(a,e);const u=Math.round(fe(n,2,3)),p=Math.min(...f.map(m=>m[1]));for(let m=0;m<u;m++){const M=p-6*t+m*9*t,x=(95-m*12)*t*(.65+.35*i);for(let g=0;g<5;g++)vn(a,[o+(g-2)*x*.36+fe(n,-5,5)*t,M+fe(n,-3,3)*t],x*fe(n,.2,.26),7*t,e,n,{mat:m===u-1?l.LEAF:l.LEAF3})}return zn(a,o,d.end[1]+4*t)}function sr(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:d=!1,mats:f=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),x=s()*1e4|0;for(let g=m;g<=M;g++)for(let v=u;v<=p;v++){const y=n.get(v,g);if(!f.includes(y))continue;const S=vi(v/r,g/r,x),E=ht(v,g,x);a&&S<a?n.recolour(v,g,l.LEAF3):S>1-o&&n.recolour(v,g,l.LEAF2),h&&E<h&&y!==l.LEAF3&&(n.recolour(v,g,c),d&&n.recolour(v,g-1,c))}}function Hi(n,e,t,i){const s=oi(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new Tt(r,a),h=r/2,c=a,d=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(d),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=a;const M=(E,b,A,_,w)=>{const L=pn(o,E,b,A,_,_*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(w===0){p.push(L.end);return}const R=n()<(i.fork??.35)?3:2;for(let P=0;P<R;P++)M(L.end,L.ang+(P-(R-1)/2)*fe(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,A*fe(n,.6,.78),_*.62,w-1);w<=2&&p.push(wn(E,L.end,.7))};for(let E=0;E<d;E++){const b=u+(d>1?(E/(d-1)-.5)*(i.fan||.8):0),A=[h+(E-(d-1)/2)*f*.6,c],_=pn(o,A,-Math.PI/2+b,a*(i.trunk||.36)*(d>1?fe(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,_.end[1]);for(let w=0;w<(i.limbs||2);w++){const L=w%2?1:-1;M(_.end,-Math.PI/2+b*.5+L*fe(n,.5,1)*(i.spreadA||.8)*(d>1?.7:1),a*(i.limb||.22)*(d>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,f*.55,2),E===0&&e.treeHollow){const w=wn(A,_.end,.38);o.ellipse(w[0],w[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(i.noRoots||zi(o,h,c,f*Math.sqrt(d),e,n,t*(i.rootK||1)),i.smooth||ns(o,e),e.treeBare)return zn(o,h,m+4*t);p.sort((E,b)=>E[1]-b[1]);const[x,g]=i.clumpR||[12,18],v=i.flat||.7,y=[],S=(E,b,A,_)=>{vn(o,E,b,A,e,n,{mat:_,ragged:i.ragged||1}),y.push([E,b,A])};for(const E of p)S(pt(E,[0,-3*t]),fe(n,x,g)*t,fe(n,x,g)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const E of p)n()<(i.extra??.7)&&S(pt(E,[fe(n,-9,9)*t,fe(n,-12,-3)*t]),fe(n,x,g)*t*.7,fe(n,x,g)*t*v*.7,l.LEAF);if(i.dome){const E=Math.min(...p.map(w=>w[1])),b=p.map(w=>w[0]),A=(Math.min(...b)+Math.max(...b))/2,_=(Math.max(...b)-Math.min(...b))/2;for(let w=0;w<i.dome;w++){const L=w/Math.max(1,i.dome-1)-.5;S([A+L*_*1.1,E-(1-4*L*L)*14*t-fe(n,2,6)*t],fe(n,x,g)*t*1.1,fe(n,x,g)*t*v,l.LEAF)}}if(i.layers)for(const[E,b,A]of y)for(let _=-A;_<A;_+=Math.max(3,i.layers*t))for(let w=-b;w<b;w++)o.get(E[0]+w,E[1]+_)===l.LEAF&&o.recolour(E[0]+w,E[1]+_,l.LEAF3);for(const[E,b,A]of y)sr(o,E,b,A,n,i.tex||{});return zn(o,h,m+4*t)}function l0(n,e,t){return Hi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function c0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function h0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function u0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function d0(n,e,t){return Hi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function f0(n,e,t){return Hi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function p0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function m0(n,e,t){const i=.7+.3*oi(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new Tt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<c;p++){const m=pn(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+d+(c>1?(p/(c-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const x=fe(n,.3,.97),g=wn(m.pts[0],m.end,x),v=M%2?1:-1,y=(1-x*.6)*r*.12*i,S=pn(a,g,-Math.PI/2+v*fe(n,.7,1.2),y,2*t,1,e,n,{group:12,mat:l.BARKD});f.push([S.end,(8+(1-x)*6)*t*i],[wn(g,S.end,.4),(7+(1-x)*4)*t*i])}f.push([m.end,7*t])}zi(a,o,h,6*t,e,n,t*.6),ns(a,e);for(const[p,m]of f)vn(a,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of f)sr(a,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...f.map(([p])=>p[1]));return zn(a,o,u+(h-u)*.45)}function g0(n,e,t){const i=.8+.2*oi(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new Tt(s,r),o=s/2,h=r,c=pn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});ns(a,e);for(let f=0;f<a.h*.55;f++)for(let u=0;u<s;u++)(a.get(u,f)===l.TRUNK||a.get(u,f)===l.BARKD)&&a.recolour(u,f,ht(u,f,3)<.15?l.BARKD:l.BELLY);zi(a,o,h,8*t,e,n,t*.7);const d=[];for(let f=0;f<6;f++){const u=fe(n,.55,1),p=wn(c.pts[0],c.end,u),m=f%2?1:-1,M=pn(a,p,-Math.PI/2+m*fe(n,.6,1.3),r*fe(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});d.push(M.end)}d.push(c.end);for(const f of d)vn(a,pt(f,[0,-2*t]),fe(n,13,19)*t*i,fe(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const f of d)sr(a,pt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return zn(a,o,Math.min(...d.map(f=>f[1]))+8*t)}function x0(n,e,t){const i=oi(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new Tt(s,r),o=s/2,h=r,c=e.treeTrunks||3,d=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)pn(a,[o+(p-(c-1)/2)*d*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),r*.3,d,d*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<r;p++)for(let m=0;m<s;m++)a.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&a.recolour(m,p,l.BARKD);zi(a,o,h,d*1.4,e,n,t);const f=h-r*.3,u=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(m)*M,f+Math.sin(m)*M*.55+10*t],fe(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,f-fe(n,4,22)*t],fe(n,20,26)*t]);u.push([[o,f-24*t],26*t]);for(const[p,m]of u)vn(a,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of u)sr(a,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return zn(a,o,f+4*t)}function M0(n,e,t){return Hi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function v0(n,e,t){const i=.8+.2*oi(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new Tt(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let d=0;d<10;d++){const f=d/9,u=10*t+f*r*.72,p=(5+f*28)*t*i,m=1+Math.round(f*3);for(let M=0;M<m;M++)c.push([[o+(m>1?(M/(m-1)-.5)*p*1.3:0)+fe(n,-2,2)*t,u+fe(n,-2,2)*t],(6+f*5)*t])}for(const[d,f]of c)vn(a,d,f*1.2,f,e,n,{mat:l.LEAF3,ragged:.7});for(const[d,f]of c)sr(a,d,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return zn(a,o,r*.85)}function _0(n,e,t){return Hi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function b0(n,e,t){const i=Iu(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||ht(r,1,7)<.35)continue;const o=(s.h-a)*fe(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===l.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,ht(r,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function S0(n,e,t){const i=.8+.2*oi(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new Tt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),zi(a,o,h,6*t,e,n,t*.5),ns(a,e);const c=14;for(let d=0;d<c;d++){const f=d/(c-1),u=8*t+f*r*.68,p=(4+f*30)*t*i;for(let m=0;m<4;m++){const M=[o+(m/3-.5)*p*1.6,u+Math.abs(m/3-.5)*6*t];vn(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),sr(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return zn(a,o,r*.8)}const y0=6;function w0(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,c=r.low||(r.low=new Uint8Array(o*h)),d=Math.ceil(a+y0*i);if(d>=h-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,m=w=>{const L=[];let R=-1;for(let P=0;P<=o;P++){const N=P<o&&wr.has(r.m[w*o+P]);N&&R<0&&(R=P),!N&&R>=0&&(L.push([R,P-1]),R=-1)}return L},M=(w,L)=>w.reduce((R,P)=>!R||Math.abs((P[0]+P[1])/2-L)<Math.abs((R[0]+R[1])/2-L)?P:R,null),x=w=>{const L=r.m.slice(),R=r.n.slice();w();for(let P=0;P<L.length;P++)r.m[P]!==L[P]&&((P/o|0)<d||L[P]&&!wr.has(L[P])&&!c[P]?(r.m[P]=L[P],r.n[P*3]=R[P*3],r.n[P*3+1]=R[P*3+1],r.n[P*3+2]=R[P*3+2]):c[P]=1)},g=()=>{for(let w=0;w<8;w++){const L=Math.round(fe(e,d,h-3)),R=m(L);if(R.length){const P=jl(e,R),N=e()<.5?-1:1;return{x:N<0?P[0]:P[1],y:L,side:N}}}return null},v=p?0:1,y=h-1;let S=o,E=0;for(let w=0;w<d*o;w++)if(r.m[w]&&!wr.has(r.m[w])){const L=w%o;S=Math.min(S,L),E=Math.max(E,L)}const b=Math.max(6*i,(E-S)*.22);s.moss&&x(()=>{for(let w=Math.max(d,Math.round(h-(h-d)*.4));w<h;w++)for(let L=0;L<o;L++){const R=w*o+L;if(!wr.has(r.m[R]))continue;const P=w>0&&!r.m[R-o];(vi(L/2.5,w/2.5,41)>1-s.moss*(.35+.4*(w-d)/(h-d))||P&&ht(L,w,9)<s.moss*.6)&&(r.m[R]=ht(L,w,5)<.3?l.LEAF2:l.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&x(()=>{let w=o/2;const L=y-(y-d)*fe(e,.45,.95)*Math.min(1,s.ivy+.3),R=e()*6;for(let P=y-1;P>L;P--){const N=M(m(P),w);if(!N)break;if(w=N[0]+(N[1]-N[0])*(.5+.48*Math.sin(P*.22+R)),r.px(w,P,l.LEAF3,0,0,1),ht(Math.round(w),P,13)<.45){const I=ht(P,3,2)<.5?-1:1;r.px(w+I,P,l.LEAF,I*.5,-.3,.8),r.px(w+I*2,P,l.LEAF3,I*.6,0,.8),r.px(w+I,P-1,ht(w,P,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const A=Math.round(s.sprigs*v*(5+8*u)*(h-d)/(40*i));for(let w=0;w<A;w++){const L=g();if(!L)break;const R=fe(e,3,5.5)*i;x(()=>vn(r,[L.x+L.side*R*.6,L.y],R,R*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const _=Math.round(s.boughs*v*(3+4*u)*(h-d)/(45*i)+(e()<s.boughs*v?1:0));for(let w=0;w<_;w++){const L=g();if(!L)break;x(()=>{const R=pn(r,[L.x,L.y],-Math.PI/2+L.side*fe(e,.9,1.35),Math.min(b,fe(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),P=fe(e,6,9.5)*i;vn(r,pt(R.end,[0,-1*i]),P,P*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(s.skirt&&v){const w=Math.round(3+s.skirt*5+u*3);for(let L=0;L<w;L++)x(()=>{const R=Math.round(fe(e,Math.max(d,h-(h-d)*.8),h-4*i)),P=M(m(R),o/2);if(!P)return;const N=L%2?1:-1,I=N<0?P[0]:P[1],F=Math.min(b*1.3,fe(e,14,24)*i*(.6+s.skirt*.5)),G=pn(r,[I,R],-Math.PI/2+N*fe(e,1.6,1.95),F,1.6*i,1,t,e,{group:12,mat:l.BARKD});vn(r,wn([I,R],G.end,.6),F*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const E0={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},A0=(n,e)=>(t,i,s)=>w0(n(t,i,s),t,i,s,e),Da={broad:{fn:s0,name:"gnarled broadleaf",grow:"normal"},fir:{fn:r0,name:"spruce",grow:"narrow",hue:.06},willow:{fn:a0,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Iu,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:o0,name:"field maple",grow:"normal",hue:.01},oak:{fn:l0,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:c0,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:h0,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:u0,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:d0,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:f0,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:p0,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:m0,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:g0,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:x0,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:M0,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:v0,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:_0,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:b0,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:S0,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Da))e.bare=e.fn,e.fn=A0(e.fn,E0[n]||{});const T0=new Map(Object.entries(Da).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),lc=n=>Da[n]||Da.broad;function ja(n,e,t){const i=T0.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:pe(e.trunkHue,.45*e.sat,.34),[l.BARKD]:pe(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:pe(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:pe(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[l.LEAF2]:pe(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[l.LEAF3]:pe(h+.03,Math.min(1,.66*e.sat*s),.38*r),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=pe(...i.trunk)),i?.upper&&(c[l.BELLY]=pe(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function Nu(n){const{sp:e,crownY:t}=n,i=new Tt(e.w,e.h),s=new Tt(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(wr.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function R0(n,e){const t=e.bushSize,i=jl(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new Tt(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)vn(a,[s/2+fe(n,-9,9)*t,r-8*t+fe(n,-4,2)*t],fe(n,7,10)*t,fe(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const d=s/2+fe(n,-12,12)*t,f=r-fe(n,5,17)*t;a.get(d,f)&&a.recolour(d,f,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let d=s/2,f=r-1;for(let u=0;u<15*t;u++)d+=Math.cos(c)*.9,f+=Math.sin(c)*.9+u*.06,a.put(d,f,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(d,f-1,l.LEAF2,0,-.5,.85),a.put(d+Math.sign(Math.cos(c)),f+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=s/2+fe(n,-13,13)*t,d=fe(n,5,15)*t,f=fe(n,-3,3);for(let u=0;u<d;u++)a.put(c+f*u/d*(u/d),r-1-u,u>d*.65?l.LEAF2:u<d*.3?l.LEAF3:l.LEAF,f*.1,-.3,.9)}const o=ja(n,e,null);return o[l.FLOWER]=pe(n(),.55,.95),{sp:a,colours:o}}const We=(n,e={})=>["tree",{type:n,...e}],Ge=(n,e={})=>[n,e],Or=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ge("water",{w:1.6})],small:[Ge("grass",{h:1.4})],big:[Ge("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ge("fern")],big:[We("larch",{scale:1.1}),We("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ge("stump",{snag:!0})],big:[We("sycamore",{trunks:3,gnarl:.9}),We("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ge("henge")],small:[Ge("stones")],big:[Ge("boulder")],set:Ge("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ge("bramble",{bare:!0})],big:[We("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[We("birch",{scale:.75})],big:[We("lime",{trunks:3,thick:1.4}),We("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ge("mound",{brown:!0})],big:[We("hazel",{gnarl:1,scale:.95}),We("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ge("wall")],small:[Ge("flowerbed")],big:[We("willow")],set:Ge("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[We("broad",{trunks:4,scale:.5,thin:!0})],big:[We("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ge("flowers",{hue:.98,leafy:!0})],big:[We("yew",{scale:1.4,gnarl:1,lean:.35}),We("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ge("stones",{big:!0})],big:[We("fir",{scale:1.2}),We("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ge("stump",{grass:!0})],big:[We("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ge("shrub",{flower:[250,245,235]})],big:[We("chestnut",{scale:1.1}),We("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ge("cones",{acorn:!0}),Ge("log",{branch:!0})],big:[We("oak",{gnarl:.9,hollow:!0}),We("holly",{minor:!0,scale:.8})],set:We("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[200,30,60]})],big:[We("pine",{scale:1.2}),We("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ge("water"),Ge("reeds",{tall:!0})],small:[Ge("reeds")],big:[We("willow"),We("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ge("water",{w:2})],small:[We("broad",{scale:.45})],big:[We("alder",{scale:.95,gnarl:.3}),We("willow",{minor:!0,scale:.8})],set:Ge("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ge("boulder",{big:!0})],small:[Ge("stones",{big:!0})],big:[We("rowan",{scale:1.1}),We("pine",{minor:!0})],set:Ge("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ge("water",{bog:!0})],small:[Ge("reeds",{cotton:!0})],big:[We("birch",{scale:.8,dark:!0}),We("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ge("log",{branch:!0})],big:[We("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ge("rockwall")],small:[Ge("stalagmite")],big:[We("broad",{bare:!0}),We("yew",{minor:!0,scale:.8})],set:Ge("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ge("mound",{brown:!0,small:!0})],big:[We("flat",{scale:1.1}),We("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ge("water",{w:2})],small:[Ge("stump",{gnawed:!0})],big:[We("weepingBirch"),We("alder",{minor:!0,scale:.8})],set:Ge("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ge("fungi")],big:[Ge("log",{rot:!0})],set:Ge("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ge("shrub",{flower:[250,205,40],spiky:!0})],big:[We("birch",{lean:.45,scale:.75}),We("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ge("cones")],big:[We("pine",{scale:1.35}),We("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ge("rockwall",{moss:!0})],small:[Ge("fern")],big:[Ge("boulder",{moss:!0,big:!0})],set:Ge("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ge("fern")],big:[We("beech",{gnarl:.2,scale:1.1}),We("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ge("hedge",{berries:!0})],small:[Ge("web")],big:[We("holly",{scale:.9}),We("yew",{minor:!0,scale:.7})],set:We("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ge("bramble")],small:[Ge("shrub",{flower:[250,230,170]})],big:[We("hazel",{trunks:5,scale:.7,thin:!0}),We("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(Ru)){const i=Or.find(s=>s.id===n);i&&!i.set&&(i.set=Ge(e,{three:!0}),i.text={...i.text,set:t})}const Ou=Object.fromEntries(Or.map(n=>[n.id,n])),C0=["ruins","rocks","freak","lake","modern"],_t=(n,e,t,i,s,r,a,o,h,c,d={})=>({pattern:n,...d,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(C0.map((f,u)=>[f,h[1][u]]))},feel:c}),Ft=[0,0],L0={moor:_t("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":_t("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ft,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":_t("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ft,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":_t("rings",.35,.8,[1,[10,14]],null,.3,Ft,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":_t("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ft,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":_t("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ft,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":_t("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ft,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:_t("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ft,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":_t("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:_t("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:_t("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ft,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":_t("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:_t("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ft,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":_t("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ft,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":_t("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ft,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:_t("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ft,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:_t("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ft,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":_t("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:_t("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ft,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:_t("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ft,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":_t("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ft,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:_t("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ft,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":_t("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ft,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":_t("groves",.5,.7,[2,[6,10]],null,.7,Ft,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:_t("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":_t("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ft,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:_t("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ft,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":_t("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ft,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":_t("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ft,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":_t("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ft,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Or)n.layout=L0[n.id];function P0(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new Tt(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let x=0;x<t;x++){const g=(vi(x/7,M/5,c)*(t-x)*(i-M)+vi((x-t)/7,M/5,c)*x*(i-M)+vi(x/7,(M-i)/5,c)*(t-x)*M+vi((x-t)/7,(M-i)/5,c)*x*M)/(t*i),v=g<.38?l.BODY2:g>.64?l.BELLY:l.BODY;h.px(x,M,v,0,-.42,.91)}const d=Nr(c),f=(M,x,g)=>h.px((M%t+t)%t,(x%i+i)%i,g,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const x=Math.floor(d()*t),g=Math.floor(d()*i);if(s==="needles"){const v=d()<.5?1:-1;for(let y=0;y<3;y++)f(x+y*v,g+(y>>1),d()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let y=0;y<v;y++)f(x,g-y,y===v-1?l.LEAF2:l.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&d()<.5&&f(x+1,g-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(f(x,g,l.ACCENT),d()<.6&&f(x+1,g,l.ACCENT),d()<.4&&f(x,g+1,l.BODY2),s==="roots"&&d()<.5)for(let v=0;v<5;v++)f(x+v,g+(v>2?1:0),l.TRUNK)}else if(s==="leaves")f(x,g,l.FLOWER),f(x+1,g,l.FLOWER),d()<.5&&f(x,g+1,l.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)f(x+v,g,l.BODY2)}const p={flowers:pe(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:pe(r+.02,.65,.6)}[s]||pe(r,.3,.6),m={[l.BODY]:pe(r,a*e.sat,o),[l.BODY2]:pe(r+.02,a*e.sat*1.1,o*.78),[l.BELLY]:pe(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:s==="needles"?pe(.07,.5,.5):pe(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:pe(n.leaf,.55*e.sat,.45),[l.LEAF2]:pe(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:pe(e.trunkHue,.4,.3)};return{sp:h,colours:m}}const fs=n=>({[l.ACCENT]:pe(.1,.06,.6),[l.BODY2]:pe(.62,.08,.4),[l.BELLY]:pe(.1,.05,.78),[l.LEAF]:pe(.27,.5,.45),[l.LEAF2]:pe(.25,.45,.62),[l.NOSE]:[20,16,24]});function Ks(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,d=1+(r()-.5)*.3;o.push([e[0]+Math.cos(c)*t*d,e[1]+Math.sin(c)*i*d*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:s.round}),n.mark([pt(e,[-t,i*.1]),pt(e,[t,i*.1]),pt(e,[t,i]),pt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([pt(e,[-t*.6,-i*.8]),pt(e,[t*.1,-i*1.1]),pt(e,[t*.3,-i*.5]),pt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(Za([pt(e,[-t*1.1,-i*.55]),pt(e,[0,-i*1.3]),pt(e,[t*1.1,-i*.5]),pt(e,[t*.6,-i*.2]),pt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function ya(n,e,t,i,s,r){const a={[l.LEAF]:pe(t.leaf,.6*i.sat,.55),[l.LEAF2]:pe(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:pe(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:pe(i.trunkHue,.45*i.sat,.34),[l.BARKD]:pe(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:pe(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:pe(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=lc(e.type).fn,x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},g=M(s,x,i.treeSize*r*(e.scale||1)*fe(s,.9,1.1)),v=ja(s,x,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=pe(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:g.sp,colours:v}}if(n==="shrub"){const M=R0(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let x=0;x<M.sp.m.length;x++)M.sp.m[x]&&ht(x,1,3)<(e.spiky?.18:.1)&&M.sp.m[x]!==l.TRUNK&&(M.sp.m[x]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*r*(e.w||1)),d=Math.round(32*r),f=new Tt(c,d),u=c/2,p=d;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&f.shape([[u-20*r,p-2],[u-18*r,p-6*r],[u+18*r,p-6*r],[u+20*r,p-2],[u+20*r,p],[u-20*r,p]],l.ACCENT,{group:2,line:!0});for(let g=0;g<M;g++){const v=u+fe(s,-16,16)*r,y=x*fe(s,.5,1),S=n==="fern"?fe(s,-6,6)*r:fe(s,-2,2)*r,E=p-1-(n==="flowerbed"?5*r:0);for(let b=0;b<y;b++){const A=b/y;f.px(v+S*A*A,E-b,A>.7?l.LEAF2:A<.3?l.LEAF3:l.LEAF,S*.05,-.3,.9),n==="fern"&&b%2&&f.px(v+S*A*A+(S>0?1:-1),E-b+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let b=0;b<(e.cotton?2:3);b++)f.px(v+S,E-y-b,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(f.px(v+S,E-y,l.FLOWER,0,-.5,.85),f.px(v+S+1,E-y,l.FLOWER,0,-.5,.85))}if(m={...a,[l.FLOWER]:n==="flowerbed"?jl(s,[[230,80,120],[250,210,60],[150,110,230]]):pe(e.hue??.95,.6,.85),[l.TRUNK]:pe(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:pe(.08,.1,.55)},n==="flowerbed"){for(let g=0;g<f.m.length;g++)f.m[g]===l.FLOWER&&ht(g,2,7)<.5&&(f.m[g]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)Ks(f,[u+fe(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*fe(s,.7,1.2),(e.big?5:2.5)*r,i,s);m=fs()}else if(n==="boulder")Ks(f,[u,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),m={...fs(),...a,[l.ACCENT]:pe(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*r,p],[u-8*r,p-18*r],[u-4*r,p-28*r],[u+5*r,p-27*r],[u+8*r,p-14*r],[u+7*r,p]],l.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*r,p-30*r],[u+9*r,p-30*r],[u+9*r,p-22*r],[u-9*r,p-18*r]],l.LEAF,[l.ACCENT]),m={...fs(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,x=(e.small?5:8)*r;f.shape(Za([[u-M,p],[u-M*.6,p-x*.8],[u,p-x],[u+M*.6,p-x*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),f.mark([[u-M,p-x*.45],[u+M,p-x*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...a,...o,[l.TRUNK]:pe(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(f.limb([[u,p,M*2.2],[u,p-8*r,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-M*.8,p-8*r],[u,p-10*r-(e.gnawed?4*r:0)],[u+M*.8,p-8*r],[u,p-7*r]],l.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+M*.4,p-8*r,2.5*r],[u+M*1.6,p-15*r,1.5*r]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const g=u+fe(s,-14,14)*r,v=fe(s,6,13)*r;for(let y=0;y<v;y++)f.px(g,p-1-y,y>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,x=(e.giant?14:e.branch?3:8)*r;if(f.limb([[u-M/2,p-x/2,x],[u+M/2,p-x/2-(e.branch?2*r:0),x*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+M/2-x*.1,p-x],[u+M/2+x*.2,p-x/2],[u+M/2-x*.1,p],[u+M/2-x*.3,p-x/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let g=0;g<(e.giant?6:3);g++){const v=u+fe(s,-M/2,M/3);f.shape([[v-3*r,p-x*.9],[v,p-x-3*r],[v+3*r,p-x*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,p-x,x*.7],[u+5*r,p-x-6*r,x*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const x=u+fe(s,-12,12)*r,g=fe(s,3,7)*r,v=fe(s,3,5)*r;f.limb([[x,p,1.6*r],[x,p-g,1.4*r]],l.BELLY,{group:5}),f.shape([[x-v,p-g],[x,p-g-v*.8],[x+v,p-g]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const x=u+fe(s,-14,14)*r,g=p-2*r;f.ellipse(x,g,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,l.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,g-1.6*r,1.8*r,1*r,l.BARKD,{round:i.round}):f.px(x,g-1,l.BARKL)}m=o}else if(n==="water"){const M=22*r*(e.w||1),x=6*r;f.shape([[u-M,p-x],[u-M*.3,p-x*1.5],[u+M*.6,p-x*1.2],[u+M,p-x*.5],[u+M*.4,p],[u-M*.7,p-x*.2]],l.MAGIC,{group:5,round:.2});for(let g=0;g<6;g++){const v=u+fe(s,-M*.6,M*.6),y=p-x*fe(s,.4,1.1);for(let S=0;S<3*r;S++)f.recolour(v+S,y,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let g=0;g<f.m.length;g++)f.m[g]===l.MAGIC?f.m[g]=l.BODY:f.m[g]===l.MAGIC2&&(f.m[g]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,x=(n==="hedge"?18:12)*r;for(let g=0;g<(n==="hedge"?6:4);g++){const v=u+fe(s,-M*.8,M*.8),y=p-x*fe(s,.4,.7);f.ellipse(v,y,fe(s,6,9)*r,x*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:g})}for(let g=0;g<8;g++){let y=u+fe(s,-M,M),S=p;for(let E=0;E<x*1.2;E++)y+=Math.sin(E*.3+g)*.8,S-=.8,f.px(y,S,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let g=0;g<f.m.length;g++)f.m[g]&&f.m[g]!==l.TRUNK&&ht(g,5,9)<.05&&(f.m[g]=l.FLOWER);m={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,x=12*r;f.shape([[u-M,p],[u-M,p-x],[u+M,p-x],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-M-1,p-x],[u-M-1,p-x-2*r],[u+M+1,p-x-2*r],[u+M+1,p-x]],l.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+M-6*r,p-x-2*r],[u+M-6*r,p-x-7*r],[u+M,p-x-7*r],[u+M,p-x-2*r]],l.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+M-3*r,p-x-9*r,3*r,2.5*r,l.BELLY,{round:i.round});for(let g=p-x+3*r;g<p;g+=4*r)for(let v=u-M;v<u+M;v++)f.recolour(v,g,l.BODY2);m=fs()}else if(n==="rockwall"){for(let M=0;M<5;M++)Ks(f,[u+(M-2)*9*r,p-fe(s,8,14)*r],8*r,10*r,i,s,e.moss);m={...fs(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const x=u+fe(s,-14,14)*r,g=fe(s,5,11)*r;f.shape([[x-3*r,p],[x-1*r,p-g],[x+1*r,p-g],[x+3*r,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=fs()}else if(n==="web"){const M=[u,p-14*r],x=11*r;for(let g=0;g<8;g++){const v=g/8*Math.PI*2;for(let y=0;y<x;y++)f.px(M[0]+Math.cos(v)*y,M[1]+Math.sin(v)*y,l.WEB,0,0,1)}for(let g=3*r;g<x;g+=3*r)for(let v=0;v<Math.PI*2;v+=.05)f.px(M[0]+Math.cos(v)*g,M[1]+Math.sin(v)*g,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:f,colours:m}}function D0(n,e,t,i,s,r){if(e.three)return gf(n,t,i);if(n==="tree"||n==="log")return ya(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new Tt(a,o),c=a/2,d=o;let f={...fs(),[l.LEAF]:pe(t.leaf,.55,.5),[l.LEAF2]:pe(t.leaf-.04,.5,.7),[l.TRUNK]:pe(i.trunkHue,.45,.34),[l.BARKD]:pe(i.trunkHue+.03,.5,.17),[l.MAGIC]:pe(i.magicHue,.6,1),[l.MAGIC2]:pe(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+16*r,d]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*r,d-6*r],[c-9*r,d-26*r],[c+9*r,d-26*r],[c+9*r,d-6*r]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*r,d-10*r],[c-5*r,d-20*r],[c,d-23*r],[c+5*r,d-20*r],[c+5*r,d-10*r]],l.NOSE,{group:7}),h.shape([[c-13*r,d-26*r],[c,d-34*r],[c+13*r,d-26*r]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,d-13*r,2.5*r,2.5*r,l.MAGIC2,{round:.5}),h.mark([[c-14*r,d-36*r],[c+2*r,d-36*r],[c-4*r,d-24*r],[c-14*r,d-24*r]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*r,d],[c-26*r,d-4*r],[c+26*r,d-4*r],[c+26*r,d]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*r,d-4*r,4*r],[c+u*r,d-34*r,4*r]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*r,d-34*r],[c-28*r,d-38*r],[c+28*r,d-38*r],[c+28*r,d-34*r]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*r,d-38*r],[c-16*r,d-54*r],[c,d-60*r],[c+16*r,d-54*r],[c+24*r,d-38*r]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=ya("water",{w:1.8},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=d-u.sp.h+M;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*r,d-6*r,9*r],[c+34*r,d-10*r,8*r]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Ks(h,[c+u*r,d-p*r],m*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Ks(h,[c+u*r,d-p*r],m*r,M*r,i,s,p>30);h.shape([[c-15*r,d],[c-14*r,d-18*r],[c-4*r,d-28*r],[c+6*r,d-27*r],[c+14*r,d-16*r],[c+15*r,d]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=ya("water",{w:1.9},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+m),g=d-u.sp.h+M-10*r;u.sp.m[p]&&h.inb(x,g)&&h.px(x,g,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+fe(s,-32,32)*r,M=d-fe(s,2,14)*r,x=fe(s,-.5,.5),g=fe(s,8,16)*r;h.limb([[m-Math.cos(x)*g/2,M-Math.sin(x)*g/2,2.6*r],[m+Math.cos(x)*g/2,M+Math.sin(x)*g/2,2*r]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Ks(h,[c+u*r,d-p*r],m*r,M*r,i,s,!0);for(let u=c-6*r;u<c+6*r;u++)for(let p=d-50*r;p<d-4*r;p++)h.px(u,p,ht(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+18*r,d]],l.IRIS,{group:10,round:.2}),f[l.IRIS]=[90,150,190],f[l.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function I0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=$a}={}){const s=Ou[n];if(!s)throw new Error(`no area type "${n}"`);const r=Nr(n.split("").reduce((d,f)=>d*31+f.charCodeAt(0),7)>>>0),a=(d,f,u)=>({sp:Un(d.sp,d.colours,e,"none",i),kind:f,text:u}),o=P0(s,e),h=d=>(d||[]).map(([f,u])=>a(ya(f,u,s,e,r,t),f,"")),c={def:s,floor:{sp:Un(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(c.walls.forEach(d=>d.text=s.text.wall),c.small.forEach(d=>d.text=s.text.small),c.big.forEach(d=>d.text=s.text.big),s.set){const d=D0(s.set[0],s.set[1],s,e,r,t);c.setPiece={...a(d,s.set[0],s.text.set),metres:d.metres,origin:d.origin}}return c}const N0=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],O0=16;function F0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=$a,ppm:s=O0}={}){const r=Ou[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,d=[];let f=0;for(const u of N0)for(let p=0;p<u.count;p++,f++){const m=h.length&&(f===2||f===6)?h[(f===6?1:0)%h.length]:o[f%o.length],M=lc(m.type),x=M.fn,g=Nr(c*7+f*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,y=u.id==="sapling",S=u.id==="tall"||u.id==="giant",E=M.grow,b=E==="willow",A=E==="narrow"||m.bare,_=E==="wide",L=b?1+(v-1)*.45:E==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,R=(y?.78:1)*(b?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:A&&S?m.bare?.6:.85:S?1.06:1),P={...e,crownWidth:(e.crownWidth||3)*R,leafHue:r.leaf+(m.dark?.05:0),gnarl:Math.min(1,(m.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:m.bare,treeTrunks:y?1:m.trunks,treeLean:m.lean,treeThick:y?void 0:S&&m.thick?m.thick*1.1:m.thick,treeThin:y||m.thin,treeHollow:S&&m.hollow,treeWebs:m.webs},N=x(g,P,e.treeSize*t*(m.scale||1)*L*fe(g,.95,1.05)),I=ja(g,P,x);m.dark&&(I[l.LEAF]=I[l.LEAF3],I[l.LEAF3]=pe(r.leaf+.05,.7,.22)),I[l.NOSE]=[20,16,24],I[l.WEB]=[225,225,232];const F=Nu(N),G=se=>Un(se,I,e,"none",i),q=se=>+(se/s).toFixed(2);d.push({heightClass:u.id,species:m.type,scale:+L.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:G(N.sp),top:G(F.top),bot:G(F.bot),crownY:N.crownY,metres:{height:q(N.sp.h),crownBase:q(N.sp.h-N.crownY),crownHeight:q(N.crownY),crownRadius:q(N.sp.w/2)}})}return d}const U0={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function B0(n){const e=new qe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:s=>s[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:s=>s[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Ms.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=En(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,l.MAGIC2)}return i}const wa={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function k0(n,e){const t=new qe({blend:.04}),i=Object.keys(wa).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=C.norm([Math.sin(r),.22,Math.cos(r)]),h=C.norm(C.cross(o,a)),c=[0,.46,0],d=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(x,g)=>d.some(v=>v.some((y,S)=>{const E=v[S+1];if(!E)return!1;const b=E[0]-y[0],A=E[1]-y[1],_=Math.max(0,Math.min(1,((x-y[0])*b+(g-y[1])*A)/(b*b+A*A)));return Math.hypot(x-y[0]-b*_,g-y[1]-A*_)<.014})),u=x=>{const g=C.sub(x,c),v=[C.dot(g,a),C.dot(g,h)+.46,C.dot(g,o)];if(v[2]>s-.02){const y=(v[0]+.17)/.34,S=(.8-v[1])/.5;if(y>=0&&y<=1&&S>=0&&S<=1&&_u(y,S,i+1,.1))return l.RUNE}if(f(v[0],v[1]))return l.STONED;if(v[1]>.86&&ht(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&ht(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,s],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(C.add(C.add(c,C.mul(h,.53)),C.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:C.add(a,C.mul(h,.35)),up:h,cut:!0,paint:u});for(const[x,g,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,g],[v,v*.4,v],l.MOSS,{group:2});for(let x=0;x<9;x++){const g=-.3+x*.07,v=.12+x%3*.025-x*.02,y=.07+x*37%5/60;t.seg([g,0,v],[g+(x%3-1)*.02,y,v+.01],.012,.004,x%3?l.LEAF:l.LEAF2,{group:10+x})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:wa[n][0],[l.MAGIC2]:wa[n][1],[l.LINE]:[40,40,50]},m=En(t,{height:44}).sp;let M=0;for(let x=0;x<600&&M<5;x++){const g=Math.floor(ht(x,i,9)*m.w),v=Math.floor(ht(x,i,10)*m.h*.8);m.get(g,v)||m.get(g+1,v)||m.get(g-1,v)||m.get(g,v+1)||m.get(g,v-1)||(m.px(g,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:m,colours:p}}function z0(){const n=new qe({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],l.ACCENT,{group:30});return{sp:En(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function H0(n,{makeCanvas:e=$a}={}){const t=(c,d)=>Un(c,d,n,"none",e),i={campfire:[0,1,2].map(c=>t(B0(c),U0)),stones:{},pond:null};for(const c of Object.keys(wa)){const d=k0(c);i.stones[c]=t(d.sp,d.colours)}const s=z0(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let c=0;c<s.sp.m.length;c++)s.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function G0(n,e){const t=new Map,i=new Map,s=(h,c,d)=>(h*2097152+(c+1048576))*2097152+(d+1048576),r=(h,c,d)=>{const f=s(h,c,d);let u=t.get(f);if(!u){const p=Math.pow(2,-h);u=[p*(c+ze(c*7+h,d,n)),p*(d+ze(c,d*13+h,n+1))],t.set(f,u)}return u},a=(h,c,d)=>{const f=Math.pow(2,-h),u=Math.floor(c/f),p=Math.floor(d/f);let m=u,M=p,x=1/0;for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const y=r(h,u+g,p+v),S=(y[0]-c)**2+(y[1]-d)**2;S<x&&(x=S,m=u+g,M=p+v)}return[m,M]},o=(h,c,d)=>{const f=s(h,c,d);let u=i.get(f);if(u)return u;if(h===0)u=[c,d];else{const p=r(h,c,d),m=a(h-1,p[0],p[1]);u=o(h-1,m[0],m[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(h,c)=>r(0,h,c),partition(h,c){const d=a(e,h,c);return o(e,d[0],d[1])},centreness(h,c,d){const f=r(0,d[0],d[1]),u=Math.hypot(h-f[0],c-f[1]);let p=1/0;const m=Math.floor(h),M=Math.floor(c);for(let x=-2;x<=2;x++)for(let g=-2;g<=2;g++){const v=m+x,y=M+g;if(v===d[0]&&y===d[1])continue;const S=r(0,v,y);p=Math.min(p,Math.hypot(h-S[0],c-S[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let d=1/0,f=1/0;const u=Math.floor(h),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const x=r(0,u+m,p+M),g=Math.hypot(h-x[0],c-x[1]);g<d?(f=d,d=g):g<f&&(f=g)}return Math.min(1,2*d/(d+f))}}}function Qc(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),d=Math.max(1,Math.ceil(c/e));for(let f=0;f<d;f++){const u=f/d,p=u*u,m=p*u,M=(x,g,v,y)=>.5*(2*g+(-x+v)*u+(2*x-5*g+4*v-y)*p+(-x+3*g-3*v+y)*m);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const W0=new Set(["stream","wetland","bog","beaver-pond"]);class V0{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=Bi(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(m,M)=>m===0?[i.minX+M*r,i.minZ]:m===1?[i.maxX,i.minZ+M*a]:m===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(m,M,x,g)=>{const v=M[0]-m[0],y=M[1]-m[1],S=Math.hypot(v,y),E=Math.max(2,Math.round(S/x)),b=[m];let A=0;for(let _=1;_<E;_++){A=Ln(A+(s()-.5)*g,-g,g);const w=_/E;b.push([Ln(m[0]+v*w-y/S*A,i.minX,i.maxX),Ln(m[1]+y*w+v/S*A,i.minZ,i.maxZ)])}return b.push(M),Qc(b,3)},c=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let m=0;m<c;m++){const M=Math.floor(s()*4),x=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,g=h(o(M,.15+s()*.7),o(x,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:g,half:t.railHalf}),m===0&&g.length>20){const v=g[Math.floor(g.length*(.3+s()*.4))],y=Math.floor(s()*4);this.lines.push({kind:"rail",pts:h(v,o(y,.2+s()*.6),300,120),half:t.railHalf})}}const d=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let m=0;m<d;m++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),240,110),half:t.roadHalf})}const f=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let m=0;m<f;m++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),90,70),half:t.streamHalf})}const u=(m,M)=>W0.has($t[e.typeOf(m,M)].id);for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);if(u(x,g))for(const v of M){const[y,S]=v.split(",").map(Number);if(m>v||!u(y,S))continue;const[E,b]=this.trim(e.siteOf(x,g),e.siteOf(y,S),this.clearOf(x,g),this.clearOf(y,S));E&&this.lines.push({kind:"stream",pts:this.meander(E,b,s),half:t.streamHalf})}}const p=new Set;for(const[m,M]of e.neighbours){const[x,g]=m.split(",").map(Number);for(const v of M){const y=m<v?`${m}|${v}`:`${v}|${m}`;if(p.has(y))continue;p.add(y);const[S,E]=v.split(",").map(Number);if(S<0||E<0||S>=e.n||E>=e.n||ze(x*31+S,g*31+E,e.seed+811)>t.linkChance)continue;const[b,A]=this.trim(e.siteOf(x,g),e.siteOf(S,E),this.clearOf(x,g),this.clearOf(S,E));b&&this.lines.push({kind:"path",pts:this.meander(b,A,s),half:t.pathHalf})}if(ze(x,g,e.seed+813)<t.deadEndChance){const v=e.siteOf(x,g),y=s()*Math.PI*2,S=30+s()*40,E=this.clearOf(x,g),b={x:v.x+Math.cos(y)*E,z:v.z+Math.sin(y)*E};this.lines.push({kind:"path",pts:this.meander(b,{x:b.x+Math.cos(y)*S,z:b.z+Math.sin(y)*S},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((m,M)=>{for(let x=0;x<m.pts.length-1;x++){const[g,v]=[m.pts[x],m.pts[x+1]],y=m.half+4;for(let S=Math.floor((Math.min(g[0],v[0])-y)/this.cell);S<=Math.floor((Math.max(g[0],v[0])+y)/this.cell);S++)for(let E=Math.floor((Math.min(g[1],v[1])-y)/this.cell);E<=Math.floor((Math.max(g[1],v[1])+y)/this.cell);E++){const b=`${S},${E}`;let A=this.grid.get(b);A||this.grid.set(b,A=[]),A.push([M,x])}}})}map;lines=[];grid=new Map;cell=24;clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),d=i()<.5?1:-1;for(let f=1;f<o;f++){const u=f/o,p=c*(.4+.6*i())*(f%2?d:-d);h.push([e.x+s*u-r/a*p,e.z+r*u+s/a*p])}return h.push([t.x,t.z]),Qc(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[c,d]=[h.pts[o],h.pts[o+1]],f=d[0]-c[0],u=d[1]-c[1],p=f*f+u*u||1,m=Ln(((e-c[0])*f+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-f*m,t-c[1]-u*m);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return Fi(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}const Y0=Jd.types,$t=Or.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Y0[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),Vn=(n,e)=>n+","+e;function X0(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function K0(n,e,t,i){const s=new Map,r=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const d=Vn(h[0],h[1]),f=Vn(c[0],c[1]);s.has(d)||s.set(d,new Set),s.has(f)||s.set(f,new Set),s.get(d).add(f),s.get(f).add(d)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let d=0;d<=a;d++){const f=n.partition(e+d/i,e+h/i);c.push(f),d>0&&r(f,c[d-1]),h>0&&r(f,o[d])}o=c}return s}function q0(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=$t.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(ne,re)=>{const z=ne/s,K=re/s;return[z+o*(Fi(z/a,K/a,n+91)-.5)*2,K+o*(Fi(z/a,K/a,n+92)-.5)*2]},c=(ne,re)=>{let z=ne*s,K=re*s;for(let B=0;B<30;B++){const[oe,ae]=h(z,K);z+=(ne-oe)*s,K+=(re-ae)*s}return[z,K]},d=G0(n,e.borderLayers),f=-i,u=t+i,p=K0(d,f,u,6),m=new Map,M=Bi(n*5+1);for(let ne=f;ne<u;ne++)for(let re=f;re<u;re++){const z=new Set;for(let oe=-2;oe<=2;oe++)for(let ae=-2;ae<=2;ae++){const ve=m.get(Vn(re+ae,ne+oe));ve!==void 0&&z.add(ve)}for(const oe of p.get(Vn(re,ne))??[]){const ae=m.get(oe);ae!==void 0&&z.add(ae)}const K=[...Array(r).keys()].filter(oe=>!z.has(oe)),B=K.length?K:[...Array(r).keys()];m.set(Vn(re,ne),B[Math.floor(M()*B.length)])}const x=(ne,re)=>m.get(Vn(ne,re))??Math.floor(ze(ne,re,n+17)*r),g=Math.floor(t/2),v=(ne,re)=>{const z=d.site(ne,re),K=d.partition(z[0],z[1]);return K[0]===ne&&K[1]===re};let y=[g,g];for(const[ne,re]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(g+ne,g+re)){y=[g+ne,g+re];break}const S=(ne,re)=>{const z=d.site(ne,re),K=c(z[0],z[1]);return{x:K[0],z:K[1]}},E=S(y[0],y[1]),b=(ne,re)=>{const[z,K]=h(ne,re),B=d.partition(z,K);return{cell:B,type:x(B[0],B[1]),openness:d.openness(z,K)}},A=(ne,re)=>{const z=$t[x(ne,re)];return z.setPiece&&ze(ne,re,n+61)<e.setPieceChance?z.setPiece:null},_=e.dancefloor.radius,w=_+e.dancefloor.clearing,L=(ne,re,z,K)=>{const B=b(ne,re).cell;return B[0]===z&&B[1]===K},R=new Map,P=(ne,re)=>{const z=Vn(ne,re),K=R.get(z);if(K)return K;const B=S(ne,re),oe=Bi(n*17+ne*53+re*911);let[ae,ve]=[B.x,B.z];if(!L(B.x,B.z,ne,re))e:for(let ue=2;ue<s*.75*1.5;ue+=2)for(let xe=0;xe<16;xe++){const Se=xe/16*Math.PI*2,Ie=B.x+Math.cos(Se)*ue,$e=B.z+Math.sin(Se)*ue;if(L(Ie,$e,ne,re)){[ae,ve]=[Ie,$e];break e}}let ge={x:ae,z:ve};for(let ue=0;ue<24;ue++){const xe=oe()*Math.PI*2,Se=3+oe()*4,Ie=ae+Math.cos(xe)*Se,$e=ve+Math.sin(xe)*Se+3;if(L(Ie,$e,ne,re)){ge={x:Ie,z:$e};break}}return R.set(z,ge),ge},N=e.treehouse,I=N.angle*Math.PI/180,F={x:E.x+Math.cos(I)*(w+N.distance),z:E.z+Math.sin(I)*(w+N.distance)},G=new Map,q=(ne,re)=>{const z=Vn(ne,re);if(G.has(z))return G.get(z);let K=null;if(A(ne,re)&&!(ne===y[0]&&re===y[1])){const B=e.setPieceFootprint*e.setPieceScale,oe=e.reserveMargin,ae=[Vn(ne,re),...p.get(Vn(ne,re))??[]].map(ue=>{const[xe,Se]=ue.split(",").map(Number);return P(xe,Se)}),ve=(ue,xe)=>L(ue,xe,ne,re)&&ae.every(Se=>Math.hypot(ue-Se.x,xe-Se.z)>=B+e.soundsystemFootprint+oe)&&Math.hypot(ue-E.x,xe-E.z)>=B+w+oe&&Math.hypot(ue-F.x,xe-F.z)>=B+N.clear+oe,ge=S(ne,re);e:for(let ue=0;ue<=s*.35;ue+=3)for(let xe=0;xe<(ue?16:1);xe++){const Se=xe/16*Math.PI*2,Ie=ge.x+Math.cos(Se)*ue,$e=ge.z-4+Math.sin(Se)*ue;if(ve(Ie,$e)){K={x:Ie,z:$e};break e}}}return G.set(z,K),K},se=(ne,re,z)=>{const K=e.reserveMargin,B=b(ne,re).cell;if(Math.hypot(ne-E.x,re-E.z)<z+w+K||Math.hypot(ne-F.x,re-F.z)<z+N.clear+K)return!0;for(const oe of[Vn(B[0],B[1]),...p.get(Vn(B[0],B[1]))??[]]){const[ae,ve]=oe.split(",").map(Number);if(!(ae===y[0]&&ve===y[1])){const ue=P(ae,ve);if(Math.hypot(ne-ue.x,re-ue.z)<z+e.soundsystemFootprint+K)return!0}const ge=q(ae,ve);if(ge&&Math.hypot(ne-ge.x,re-ge.z)<z+e.setPieceFootprint*e.setPieceScale+K)return!0}return!1},k=(ne,re,z)=>{if(Math.hypot(ne-E.x,re-E.z)<w||Math.hypot(ne-F.x,re-F.z)<N.clear)return!0;const K=q(z[0],z[1]);if(K&&Math.hypot(ne-K.x,re-K.z)<e.setPieceClear*e.setPieceScale)return!0;if(z[0]===y[0]&&z[1]===y[1])return!1;const B=P(z[0],z[1]);return Math.hypot(ne-B.x,re-B.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},ee=(ne,re)=>{const[z,K]=h(ne,re);return k(ne,re,d.partition(z,K))},U=(ne,re)=>{const[z,K]=h(ne,re);if(k(ne,re,d.partition(z,K)))return 0;const B=1-nn((Fi(ne/e.gladeScale,re/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return nn((d.openness(z,K)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*B},Q=(ne,re)=>Math.min(1,Math.hypot(ne-y[0],re-y[1])/(t/2)),le=s*.5,_e={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:d,centreCell:y,dancefloor:{x:E.x,z:E.z,radius:_},treehouse:F,start:{x:F.x,z:F.z+1},bounds:{minX:le,maxX:t*s-le,minZ:le,maxZ:t*s-le},extent:{minX:f*s,maxX:u*s,minZ:f*s,maxZ:u*s},typeOf:x,areaAt:b,siteOf:S,treeWeight:U,hardClear:ee,neighbours:p,setPieceOf:A,soundsystemSpot:P,setPieceSpot:q,reserved:se,remoteness:Q,paths:null};return _e.paths=new V0(_e),_e}function cc(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function $0(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const js=(n,e)=>Xn(e.groundHeight,e.treetopHeight,nn(n.lift)),jc=n=>nn(n.lift);function Z0(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const d=nn(a),f=Xn(i.groundSpeed,i.treetopSpeed,d),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,m=n.vz+(h*i.groundSpeed-n.vz)*u,M=J0(n,o,h,t,i);let x=Xn(p,M.vx,d),g=Xn(m,M.vz,d);const v=M.boost*d,y=M.braking&&d>.5;let S=n.x+x*t,E=n.z+g*t;(S<s.minX||S>s.maxX)&&(S=Ln(S,s.minX,s.maxX),x=0),(E<s.minZ||E>s.maxZ)&&(E=Ln(E,s.minZ,s.maxZ),g=0);const b=x>.3?1:x<-.3?-1:n.facing,A=Math.hypot(x,g),_=cc(x,g,n.away,Math.max(1,f*.15),i);return{x:S,z:E,vx:x,vz:g,lift:a,mode:r,facing:b,away:_,lean:A>f*i.leanAt,boost:v,braking:y}}function J0(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const y=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*y,vz:n.vz*y,boost:h*y,braking:!1}}const d=e/a,f=t/a;let u=d,p=f,m=0;if(o>2){const y=n.vx/o,S=n.vz/o;m=Math.acos(Ln(y*d+S*f,-1,1));const E=y*f-S*d,b=r.turnRate*(1-.5*h)*Math.PI/180,A=Math.min(m,b*i)*(E>=0?1:-1),_=Math.cos(A),w=Math.sin(A);u=y*_-S*w,p=y*w+S*_}const M=m*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),c=o>s.treetopSpeed*.5):h=Math.max(0,h-i*.5);const x=s.treetopSpeed*(1+(r.boost-1)*h)*a,g=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(x-o)*g;return{vx:u*v,vz:p*v,boost:h,braking:c}}const eo=3;function Q0(n,e,t=.5,i=1){const s=n.tuning,r=Ln(e,0,1),a=Math.max(0,Math.round(Xn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<j0(n,r)?1:0,h=Math.max(0,a-o),c=Math.round(h*s.adultShareFar*nn((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),d=Math.round((h-c)*s.youngShareFar*r);return{babies:Math.max(0,h-c-d),young:d,adults:c,legends:o}}const j0=(n,e)=>n.tuning.legendChanceFar*nn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Fu=n=>n.areaSize*.75,Ia=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function ep(n,e,t,i,s){if(Ia(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,c=i+Math.sin(o)*r;if(Ia(n,h,c,e))return[h,c]}return[t,i]}function Na(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(Ia(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function tp(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=Bi(n.seed*7919+o*131+a*977+3),c=$t[n.typeOf(o,a)],d=n.siteOf(o,a),f=n.remoteness(o,a),u=Q0(n,f,ze(o,a,n.seed+43),ze(o,a,n.seed+47)),p=M=>{const x=[o,a],g=Fu(n),[v,y]=ep(n,x,d.x,d.z,g),S={cell:x,homeX:d.x,homeZ:d.z,range:g,anchorX:v,anchorZ:y},[E,b]=Na(n,S,h);return{id:i++,species:c.creature,level:M,...S,x:E,z:b,tx:E,tz:b,rest:h()*3,speed:(M===eo?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:Bi(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const m=t.legendNextToHome&&o===s+1&&a===r;(u.legends||m)&&e.push(p(3))}return e}function np(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=Na(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!Ia(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=cc(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===eo?1.5:4)}function ip(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=Bi(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=Na(a,o,h),[o.tx,o.tz]=Na(a,o,h),o.rest=h()*2}o.seen=r,np(o,s,a)}}const sp=4,kt=32;function rp(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function Uu(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(Fi(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(ze(i,s,r+1)-.5)*a.width*a.stray,c=(Fi(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(ze(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function hc(n,e,t,i){const s=n.tuning,r=s.density,a=$t[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=Fi(e/r.patchScale,t/r.patchScale,o+91),d=r.patchMin+(r.patchMax-r.patchMin)*nn((c-.25)/.5),f=n.treeWeight(e,t)*a.density*d*ap(n,e,t,a)*s.treeDensity;return Math.max(f,r.lone)*h}function ap(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=Fi(e/a,t/a,s+93);return 1+r*(2.2*nn((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*nn((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*nn((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*nn((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function op(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=rp(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*kt/s),d=Math.ceil((t+1)*kt/s);for(let f=c;f<d;f++){const u=f&1?.5:0,p=Math.ceil(e*kt/i-u),m=Math.ceil((e+1)*kt/i-u);for(let M=p;M<m;M++){const x=(M+u+(ze(M,f,r+101)-.5)*.7)*i,g=(f+(ze(M,f,r+102)-.5)*.7)*s,v=Uu(n,x,g,M,f,r+106),y=hc(n,x,g,v);ze(M,f,r+103)>=y||n.hardClear(x,g-o)||n.hardClear(x-h,g-o)||n.hardClear(x+h,g-o)||a.push({x,z:g,type:v,variant:Math.floor(ze(M,f,r+104)*1000003),flip:ze(M,f,r+105)<.5})}}return a}function lp(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*kt/i),o=Math.ceil((t+1)*kt/i),h=Math.ceil(e*kt/i),c=Math.ceil((e+1)*kt/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){const u=(f+ze(f,d,s+201)-.5)*i,p=(d+ze(f,d,s+202)-.5)*i,m=1+n.tuning.bushClump*(2*nn((Fi(u/13,p/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const x=Uu(n,u,p,f,d,s+206),g=1-Math.min(1,hc(n,u,p,x)/.8);ze(f,d,s+203)>(.15+.85*g)*$t[x].layout.undergrowth*n.tuning.bushDensity*m*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||Math.hypot(u-n.treehouse.x,p-n.treehouse.z)<n.tuning.treehouse.clear||r.push({x:u,z:p,type:x,variant:Math.floor(ze(f,d,s+204)*sp),flip:ze(f,d,s+205)<.5})}return r}function cp(n,e,t){const i=n.tuning.wallSpacing,s=n.seed,r=[],a=Math.ceil(t*kt/i),o=Math.ceil((t+1)*kt/i),h=Math.ceil(e*kt/i),c=Math.ceil((e+1)*kt/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){if(ze(f,d,s+303)>n.tuning.wallDensity)continue;const u=(f+(ze(f,d,s+301)-.5)*.6)*i,p=(d+(ze(f,d,s+302)-.5)*.6)*i,m=n.areaAt(u,p);m.openness<.82||!$t[m.type].hasWalls||n.paths.clearance(u,p).bushes===0||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||r.push({x:u,z:p,type:m.type,variant:Math.floor(ze(f,d,s+304)*4),flip:ze(f,d,s+305)<.5})}return r}function hp(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*kt/s),h=Math.ceil((t+1)*kt/s),c=Math.ceil(e*kt/s),d=Math.ceil((e+1)*kt/s);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(ze(u,f,r+501)-.5)*.8)*s,m=(f+(ze(u,f,r+502)-.5)*.8)*s,M=n.areaAt(p,m),x=$t[M.type].layout,g=x.decor,v=g?g.rate/.3:1,y=x.terrain?.includes("rocky")?2:1,S=g?[g.ruins,g.rocks*y,g.freak]:[i.ruins,i.rocks*y,i.freak],E=S[0]+S[1]+S[2]||1,b=(i.ruins+i.rocks+i.freak)*v*(g?(g.ruins+g.rocks+g.freak)/Math.max(.01,g.ruins+g.rocks+g.freak+g.lake+g.modern):1)*(y>1?1.5:1),A=ze(u,f,r+503);if(A>=b||M.openness<i.clearing||n.hardClear(p,m)||n.paths.at(p,m,i.pathGap)||n.reserved(p,m,i.footprint)||Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)continue;const _=1-Math.min(1,hc(n,p,m,M.type)/.8);if(ze(u,f,r+504)>.35+.65*_)continue;const w=A/b*E,L=w<S[0]?"ruins":w<S[0]+S[1]?"rocks":"freak";a.push({x:p,z:m,family:L,variant:Math.floor(ze(u,f,r+505)*1e6),flip:ze(u,f,r+506)<.5})}return a}const up=new Set(["wetland","stream","bog","beaver-pond","moor"]);function dp(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*kt/s),h=Math.ceil((t+1)*kt/s),c=Math.ceil(e*kt/s),d=Math.ceil((e+1)*kt/s);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(ze(u,f,r+401)-.5)*.7)*s,m=(f+(ze(u,f,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(p,m),x=M.openness<.35||M.openness>.8?1:.25,g=ze(u,f,r+403),y=(up.has($t[M.type].id)||!!$t[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*x,S=i.campfire*x,E=i.magicStone*x,b=g<y?"pond":g<y+S?"campfire":g<y+S+E?"stone":null;b&&a.push({x:p,z:m,kind:b,size:.75+ze(u,f,r+404)*.5})}return a}class fp{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;decor=new Map;chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/kt);r<=Math.floor((t+i)/kt);r++)for(let a=Math.floor((e-i)/kt);a<=Math.floor((e+i)/kt);a++)s.push([a,r]);return s}gather(e,t,i,s,r){e.size>600&&e.clear();const a=[];for(const[o,h]of this.chunks(i,s,r)){const c=o+","+h;let d=e.get(c);d||(d=t(o,h),e.set(c,d));for(const f of d)Math.abs(f.x-i)<=r&&Math.abs(f.z-s)<=r&&a.push(f)}return a}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>op(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>lp(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>dp(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>hp(this.map,s,r),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(s,r)=>cp(this.map,s,r),e,t,i)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const c=s.setPieceSpot(h,o);c&&Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push({x:c.x,z:c.z,type:s.typeOf(h,o),variant:0,flip:ze(h,o,s.seed+71)<.5})}return a}}const pp=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),Bu=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],mp=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],cl=n=>!n.leashed&&n.level!==eo;function gp(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function po(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!cl(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function eh(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function xp(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,c=o.leash,d=f=>e[f];if(t.talk&&s){const f=n.talk?d(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(f.id,n.talk.t),f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(eh(n,f,f.x,f.z,r),n.progress.delete(f.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const u=po(e,i.x,i.z,h.talkRange)??po(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!cl(u),t:n.progress.get(u.id)??0,total:cl(u)?Bu(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[f,u]of n.progress){if(n.talk?.id===f)continue;const p=u-a*h.decayRate;p<=0||e[f].leashed?n.progress.delete(f):n.progress.set(f,p)}if(t.inviteNearest){const f=po(e,i.x,i.z,1/0);f&&eh(n,f,f.x,f.z,r)}if(t.sigil&&s){let f=-1,u=c.pickRadius;if(n.placed.forEach((p,m)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,f=m)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];ku(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const f of n.stack)th(d(f),i.x,i.z,a,o);for(const f of n.placed)th(d(f.id),f.x,f.z,a,o)}const ku=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function th(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),m=a*.5/p;n.tx=e+(n.x-e)*m,n.tz=t+(n.z-t)*m,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,m=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*m,n.tz=t+Math.sin(p)*m,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,d=Math.hypot(h,c);if(d<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,r.runSpeed*(n.level===eo?.6:1)):n.speed*1.5,u=Math.min(d,f*i);n.x+=h/d*u,n.z+=c/d*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=cc(h,c,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const Mp=n=>`${n[0]},${n[1]}`;function vp(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Mp(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function _p(n,e){const t=Math.floor(ze(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}const bp=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function zu(n,e,t){const i=n.wave+1,s=[],r=new Map,a=new Map;for(const[c,d]of n.areas)for(const f of e.neighbours.get(c)??[]){if(n.areas.has(f)||r.has(f))continue;const u=f.split(",").map(Number);bp(e,u)&&(r.set(f,u),a.set(f,d.cell))}const o=[...r.entries()].sort((c,d)=>ze(c[1][0],c[1][1],e.seed+i)-ze(d[1][0],d[1][1],e.seed+i)),h=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[c,d]of o.slice(0,h)){const f={cell:d,wave:i,at:t,from:a.get(c)??null,soundsystem:_p(e,d)};n.areas.set(c,f),s.push(f)}return n.wave=i,s}function Sp(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,zu(n,e,t))}function yp(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function wp(n,e){const t=q0(n,e),i={...$0(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new fp(t),creatures:tp(t),clock:qd(),witch:i,camera:Yd(e,i.x,js(i,e),i.z),party:vp(t),leash:pp()}}function Ep(n,e,t){const i=$d(n.clock,t);i!==0&&(n.witch=Z0(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Xd(n.camera,e.zoom,{x:n.witch.x,y:js(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(zu(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),Sp(n.party,n.map,n.clock.time,i),ip(n.creatures,n.witch.x,n.witch.z,Ap(n),i,n.clock.time,n.map),xp(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const Ap=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Fu(n.map)*2.5),nh=n=>vu(n.camera,n.camera.lift,n.tuning);function Hu(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return $t[e.type].name+(t?` (set piece: ${t})`:"")}const Tp="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Rp="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Cp=20,Lp=28,Pp=4,Dp=.7,Ip=4,Np="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Op=1,Fp=.2,Up=.18,Bp=.25,kp=38,zp="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",Hp={width:20,scale:40,stray:.5},Gp="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",Wp={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},Vp=.16,Yp=.8,Xp=2.25,Kp="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",qp={from:20,keep:.35},$p=1.7,Zp=4.6,Jp=2.8,Qp=10.5,jp=11.25,em=3.4,tm=4,nm=.6,im="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",sm=17.5,rm=32,am=10,om="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRate degrees a second (half that at full boost), so she swoops in arcs; a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second (and she brakes); letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",lm={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,glideTime:1,sharpTurnBleed:3,cameraPull:.06},cm=28,hm=.7,um={awayEnter:55,awayLeave:65},dm=.7,fm=.55,pm=1.4,mm=24,gm="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",xm={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Mm="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",vm=3,_m=120,bm=8,Sm=1,ym=16,wm=12,Em=20,Am="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Tm="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), a broad soft pool glowReach metres across from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",Rm={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Cm=.65,Lm="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",Pm={bpm:120},Dm="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",Im="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",Nm={height:3,opacity:.65,beam:.25,size:1},Om={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},Fm="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Um={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Bm="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",km={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},zm="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",Hm={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},Gm={spacing:10,campfire:.012,magicStone:.008,pond:.02,wetPond:.12},Wm={near:150,far:360},Vm="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Ym={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},Xm="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",Km="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",qm={on:!0,strength:.7,trees:!1},$m={on:!0,strength:.45,height:18,cover:.55,wind:.6},Zm={on:!0,strength:.12,height:3,wind:.8},Jm="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Qm="smooth",jm="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",eg=0,tg="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",ng={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},ig="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",sg={emojiPixels:11,scale:1},rg="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",ag={spacing:26,ruins:.03,rocks:.09,freak:.012,clearing:.3,pathGap:2,footprint:4},og="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",lg={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,treesOnBroken:.35,edgeBushes:3,bushBoost:3},cg="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",hg={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},ug={length:8,runSpeed:4,pickRadius:2,spacing:4},dg={rim:!0,sparks:!0,thread:!0,sparkEvery:4},fg="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",pg={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},mg="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",gg={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},xg="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Mg={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},vg="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",_g={screenFraction:.8,edge:.1},bg="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Sg={black:.03,gamma:1.35,ambient:.35},yg={on:!0,strength:.7,threshold:.55},wg={on:!0,where:"before",strength:3,band:.4,centre:.55},Eg="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Ag=2,Tg=20,Rg=1.3,Cg=.5,Lg=.35,Pg=.35,Dg=.25,Ig=!0,Ng=.55,Og=600,Fg=.6,Ug="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Bg=.25,kg=1.8,zg=9,Hg="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",Gg=7,Wg=6,Vg=3,Yg=1.5,Xg=.35,Kg={_readme:Tp,_map:Rp,mapAreas:Cp,areaSize:Lp,areaScale:Pp,areaSizeVariance:Dp,borderLayers:Ip,_trees:Np,treeDensity:Op,clearingSize:Fp,clearingFalloff:Up,gladeAmount:Bp,gladeScale:kp,_areaEdgeBlend:zp,areaEdgeBlend:Hp,_density:Gp,density:Wp,bushDensity:Vp,bushClump:Yp,treeHeight:Xp,_treeCap:Kp,treeCap:qp,crownWidth:$p,treeSpacingX:Zp,treeSpacingZ:Jp,crownHalfWidth:Qp,crownHeight:jp,bushSpacing:em,wallSpacing:tm,wallDensity:nm,_witch:im,groundSpeed:sm,treetopSpeed:rm,acceleration:am,_treetop:om,treetop:lm,groundAcceleration:cm,leanAt:hm,facing:um,riseTime:dm,descendTime:fm,groundHeight:pm,treetopHeight:mm,_camera:gm,camera:xm,_look:Mm,pixelSize:vm,glowReach:_m,glowHeight:bm,spriteTilt:Sm,artPixelsPerMetre:ym,viewMargin:wm,lightBudget:Em,_lightSources:Am,_lights:Tm,lights:Rm,glowPower:Cm,_beat:Lm,beat:Pm,_occlusion:Dm,_sigilProjection:Im,sigilProjection:Nm,occlusion:Om,_stack:Fm,stack:Um,_lasers:Bm,lasers:km,_borders:zm,borders:Hm,lightSources:Gm,haze:Wm,_scenery:Vm,scenery:Ym,_post:Xm,_shadows:Km,shadows:qm,canopyShadow:$m,mist:Zm,_fx:Jm,fx:Qm,_moonbeams:jm,moonbeams:eg,_treehouse:tg,treehouse:ng,_bubbles:ig,bubbles:sg,_decor:rg,decor:ag,_paths:og,paths:lg,_invite:cg,invite:hg,leash:ug,bond:dg,_party:fg,party:pg,_stringLights:mg,stringLights:gg,_dancefloor:xg,dancefloor:Mg,_canopyCutout:vg,canopyCutout:_g,_tone:bg,tone:Sg,bloom:yg,tiltShift:wg,_creatures:Eg,creaturesNear:Ag,creaturesFar:Tg,creatureCurve:Rg,youngShareFar:Cg,adultsFrom:Lg,adultShareFar:Pg,legendChanceFar:Dg,legendNextToHome:Ig,legendsFrom:Ng,creatureSimRadius:Og,creatureSpeed:Fg,_setPieces:Ug,setPieceChance:Bg,setPieceScale:kg,setPieceClear:zg,_placement:Hg,setPieceFootprint:Gg,soundsystemFootprint:Wg,reserveMargin:Vg,treeMarginFromSoundsystem:Yg,legendSpeed:Xg},ss=Kg;class qg{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,s=x=>this.pressed.has(x);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),c=s("Backquote"),d=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=s("KeyE")||s("KeyR");const u=s("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const g=w=>!!x.buttons[w]?.pressed,y=x.buttons.some((w,L)=>w.pressed&&!this.padPrev[L])&&!!this.onAny?.(),S=w=>!y&&g(w)&&!this.padPrev[w];let E=x.axes[0]??0,b=x.axes[1]??0;const A=Math.hypot(E,b),_=.18;if(A<_)E=0,b=0;else{const w=(Math.min(1,A)-_)/(1-_)/A;E*=w,b*=w}E+=(g(15)?1:0)-(g(14)?1:0),b+=(g(13)?1:0)-(g(12)?1:0),r+=E,a+=b,S(3)&&(o=!0),(S(4)||S(6))&&(h+=1),(S(5)||S(7))&&(h-=1),S(8)&&(c=!0),g(0)&&(d=!0),S(2)&&(f=!0),this.padPrev=x.buttons.map(w=>w.pressed);break}const m=this.touch;r+=m.x,a+=m.y,m.toggle&&(o=!0),h+=m.zoom,m.debug&&(c=!0),m.talk&&(d=!0),m.sigil&&(f=!0),m.toggle=!1,m.zoom=0,m.debug=!1,m.sigil=!1;const M=Math.hypot(r,a);return M>1&&(r/=M,a/=M),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:c,nextWave:e,pauseWaves:t,talk:d,sigil:f,inviteNearest:u}}}const uc="186",$g=0,ih=1,Zg=2,Ea=1,Jg=2,Er=3,vs=0,Pn=1,Ni=2,Si=0,qs=1,_s=2,sh=3,rh=4,to=5,Gs=100,Qg=101,jg=102,e1=103,t1=104,dc=200,n1=201,fc=202,i1=203,pc=204,mc=205,s1=206,r1=207,a1=208,o1=209,l1=210,c1=211,h1=212,u1=213,d1=214,hl=0,ul=1,dl=2,Lr=3,fl=4,pl=5,Oa=6,ml=7,Gu=0,f1=1,p1=2,yi=0,Wu=1,Vu=2,Yu=3,Xu=4,Ku=5,qu=6,$u=7,Zu=300,bs=301,er=302,mo=303,go=304,no=306,Fa=1e3,Oi=1001,gl=1002,Yt=1003,m1=1004,Yr=1005,Vt=1006,xo=1007,ms=1008,Fn=1009,Ju=1010,Qu=1011,Pr=1012,gc=1013,wi=1014,_i=1015,Ei=1016,xc=1017,Mc=1018,Dr=1020,ju=35902,ed=35899,td=1021,nd=1022,Bn=1023,ki=1026,gs=1027,id=1028,vc=1029,Ss=1030,_c=1031,bc=1033,Aa=33776,Ta=33777,Ra=33778,Ca=33779,xl=35840,Ml=35841,vl=35842,_l=35843,bl=36196,Sl=37492,yl=37496,wl=37488,El=37489,Ua=37490,Al=37491,Tl=37808,Rl=37809,Cl=37810,Ll=37811,Pl=37812,Dl=37813,Il=37814,Nl=37815,Ol=37816,Fl=37817,Ul=37818,Bl=37819,kl=37820,zl=37821,Hl=36492,Gl=36494,Wl=36495,Vl=36283,Yl=36284,Ba=36285,Xl=36286,g1=3200,ah=0,x1=1,Kn="",Yn="srgb",Ir="srgb-linear",ka="linear",St="srgb",Mo=7680,M1=519,v1=512,_1=513,b1=514,Sc=515,S1=516,y1=517,yc=518,w1=519,E1=35044,$s=35048,oh="300 es",bi=2e3,za=2001;function A1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ha(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function T1(){const n=Ha("canvas");return n.style.display="block",n}const lh={};function ch(...n){const e="THREE."+n.shift();console.log(e,...n)}function sd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xe(...n){n=sd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function dt(...n){n=sd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Zs(...n){const e=n.join(" ");e in lh||(lh[e]=!0,Xe(...n))}function R1(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const C1={[hl]:ul,[dl]:Oa,[fl]:ml,[Lr]:pl,[ul]:hl,[Oa]:dl,[ml]:fl,[pl]:Lr};class ws{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vo=Math.PI/180,Kl=180/Math.PI;function Fr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function L1(n,e){return(n%e+e)%e}function _o(n,e,t){return(1-t)*n+t*e}function fr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ke{static{Ke.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],c=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],p=r[a+1],m=r[a+2],M=r[a+3];if(f!==M||h!==u||c!==p||d!==m){let x=h*u+c*p+d*m+f*M;x<0&&(u=-u,p=-p,m=-m,M=-M,x=-x);let g=1-o;if(x<.9995){const v=Math.acos(x),y=Math.sin(v);g=Math.sin(g*v)/y,o=Math.sin(o*v)/y,h=h*g+u*o,c=c*g+p*o,d=d*g+m*o,f=f*g+M*o}else{h=h*g+u*o,c=c*g+p*o,d=d*g+m*o,f=f*g+M*o;const v=1/Math.sqrt(h*h+c*c+d*d+f*f);h*=v,c*=v,d*=v,f*=v}}e[t]=h,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],c=i[s+2],d=i[s+3],f=r[a],u=r[a+1],p=r[a+2],m=r[a+3];return e[t]=o*m+d*f+h*p-c*u,e[t+1]=h*m+d*u+c*f-o*p,e[t+2]=c*m+d*p+o*u-h*f,e[t+3]=d*m-o*f-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),d=o(s/2),f=o(r/2),u=h(i/2),p=h(s/2),m=h(r/2);switch(a){case"XYZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"YXZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"ZXY":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"ZYX":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"YZX":this._x=u*d*f+c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f-u*p*m;break;case"XZY":this._x=u*d*f-c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f+u*p*m;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-h)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(d-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+d)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(h+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*h,this._y=s*d+a*h+r*o-i*c,this._z=r*d+a*c+i*h-s*o,this._w=a*d-i*o-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);h=Math.sin(h*c)/d,t=Math.sin(t*c)/d,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{static{X.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+h*c+a*f-o*d,this.y=i+h*d+o*c-r*f,this.z=s+h*f+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bo.copy(this).projectOnVector(e),this.sub(bo)}reflect(e){return this.sub(bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bo=new X,hh=new rr;class Ze{static{Ze.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c)}set(e,t,i,s,r,a,o,h,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=h,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],m=i[8],M=s[0],x=s[3],g=s[6],v=s[1],y=s[4],S=s[7],E=s[2],b=s[5],A=s[8];return r[0]=a*M+o*v+h*E,r[3]=a*x+o*y+h*b,r[6]=a*g+o*S+h*A,r[1]=c*M+d*v+f*E,r[4]=c*x+d*y+f*b,r[7]=c*g+d*S+f*A,r[2]=u*M+p*v+m*E,r[5]=u*x+p*y+m*b,r[8]=u*g+p*S+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*h+s*r*c-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*h-d*r,p=c*r-a*h,m=t*f+i*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(s*c-d*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(d*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-s*c,s*h,-s*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return Zs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(So.makeScale(e,t)),this}rotate(e){return Zs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(So.makeRotation(-e)),this}translate(e,t){return Zs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(So.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const So=new Ze,uh=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function P1(){const n={enabled:!0,workingColorSpace:Ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===St&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===St&&(s.r=Js(s.r),s.g=Js(s.g),s.b=Js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Zs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Zs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ir]:{primaries:e,whitePoint:i,transfer:ka,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:e,whitePoint:i,transfer:St,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}}),n}const at=P1();function Ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ts;class D1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ts===void 0&&(Ts=Ha("canvas")),Ts.width=e.width,Ts.height=e.height;const s=Ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ha("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ui(t[i]/255)*255):t[i]=Ui(t[i]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let I1=0;class wc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:I1++}),this.uuid=Fr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yo(s[a].image)):r.push(yo(s[a]))}else r=yo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function yo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?D1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}let N1=0;const wo=new X;class _n extends ws{constructor(e=_n.DEFAULT_IMAGE,t=_n.DEFAULT_MAPPING,i=Oi,s=Oi,r=Vt,a=ms,o=Bn,h=Fn,c=_n.DEFAULT_ANISOTROPY,d=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:N1++}),this.uuid=Fr(),this.name="",this.source=new wc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wo).x}get height(){return this.source.getSize(wo).y}get depth(){return this.source.getSize(wo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fa:e.x=e.x-Math.floor(e.x);break;case Oi:e.x=e.x<0?0:1;break;case gl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fa:e.y=e.y-Math.floor(e.y);break;case Oi:e.y=e.y<0?0:1;break;case gl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=Zu;_n.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,c=h[0],d=h[4],f=h[8],u=h[1],p=h[5],m=h[9],M=h[2],x=h[6],g=h[10];if(Math.abs(d-u)<.01&&Math.abs(f-M)<.01&&Math.abs(m-x)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+M)<.1&&Math.abs(m+x)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,S=(p+1)/2,E=(g+1)/2,b=(d+u)/4,A=(f+M)/4,_=(m+x)/4;return y>S&&y>E?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=b/i,r=A/i):S>E?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=b/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=_/r),this.set(i,s,r,t),this}let v=Math.sqrt((x-m)*(x-m)+(f-M)*(f-M)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(x-m)/v,this.y=(f-M)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class O1 extends ws{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new _n(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new wc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends O1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rd extends _n{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class F1 extends _n{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class zt{static{zt.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,x)}set(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,x){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=h,g[2]=c,g[6]=d,g[10]=f,g[14]=u,g[3]=p,g[7]=m,g[11]=M,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Rs.setFromMatrixColumn(e,0).length(),r=1/Rs.setFromMatrixColumn(e,1).length(),a=1/Rs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),c=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=-h*f,t[8]=c,t[1]=p+m*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=m+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u+M*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=p*o-m,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u-M*o,t[4]=-a*f,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*d,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=m*c-p,t[8]=u*c+M,t[1]=h*f,t[5]=M*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=M-u*f,t[8]=m*f+p,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*f+m,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=-f,t[8]=c*d,t[1]=u*f+M,t[5]=a*d,t[9]=p*f-m,t[2]=m*f-p,t[6]=o*d,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U1,e,B1)}lookAt(e,t,i){const s=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Yi.crossVectors(i,Dn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Yi.crossVectors(i,Dn)),Yi.normalize(),Xr.crossVectors(Dn,Yi),s[0]=Yi.x,s[4]=Xr.x,s[8]=Dn.x,s[1]=Yi.y,s[5]=Xr.y,s[9]=Dn.y,s[2]=Yi.z,s[6]=Xr.z,s[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],m=i[2],M=i[6],x=i[10],g=i[14],v=i[3],y=i[7],S=i[11],E=i[15],b=s[0],A=s[4],_=s[8],w=s[12],L=s[1],R=s[5],P=s[9],N=s[13],I=s[2],F=s[6],G=s[10],q=s[14],se=s[3],k=s[7],ee=s[11],U=s[15];return r[0]=a*b+o*L+h*I+c*se,r[4]=a*A+o*R+h*F+c*k,r[8]=a*_+o*P+h*G+c*ee,r[12]=a*w+o*N+h*q+c*U,r[1]=d*b+f*L+u*I+p*se,r[5]=d*A+f*R+u*F+p*k,r[9]=d*_+f*P+u*G+p*ee,r[13]=d*w+f*N+u*q+p*U,r[2]=m*b+M*L+x*I+g*se,r[6]=m*A+M*R+x*F+g*k,r[10]=m*_+M*P+x*G+g*ee,r[14]=m*w+M*N+x*q+g*U,r[3]=v*b+y*L+S*I+E*se,r[7]=v*A+y*R+S*F+E*k,r[11]=v*_+y*P+S*G+E*ee,r[15]=v*w+y*N+S*q+E*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],c=e[13],d=e[2],f=e[6],u=e[10],p=e[14],m=e[3],M=e[7],x=e[11],g=e[15],v=h*p-c*u,y=o*p-c*f,S=o*u-h*f,E=a*p-c*d,b=a*u-h*d,A=a*f-o*d;return t*(M*v-x*y+g*S)-i*(m*v-x*E+g*b)+s*(m*y-M*E+g*A)-r*(m*S-M*b+x*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*h)+s*(r*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=e[9],u=e[10],p=e[11],m=e[12],M=e[13],x=e[14],g=e[15],v=t*o-i*a,y=t*h-s*a,S=t*c-r*a,E=i*h-s*o,b=i*c-r*o,A=s*c-r*h,_=d*M-f*m,w=d*x-u*m,L=d*g-p*m,R=f*x-u*M,P=f*g-p*M,N=u*g-p*x,I=v*N-y*P+S*R+E*L-b*w+A*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/I;return e[0]=(o*N-h*P+c*R)*F,e[1]=(s*P-i*N-r*R)*F,e[2]=(M*A-x*b+g*E)*F,e[3]=(u*b-f*A-p*E)*F,e[4]=(h*L-a*N-c*w)*F,e[5]=(t*N-s*L+r*w)*F,e[6]=(x*S-m*A-g*y)*F,e[7]=(d*A-u*S+p*y)*F,e[8]=(a*P-o*L+c*_)*F,e[9]=(i*L-t*P-r*_)*F,e[10]=(m*b-M*S+g*v)*F,e[11]=(f*S-d*b-p*v)*F,e[12]=(o*w-a*R-h*_)*F,e[13]=(t*R-i*w+s*_)*F,e[14]=(M*y-m*E-x*v)*F,e[15]=(d*E-f*y+u*v)*F,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*h,c*h+s*o,0,c*o+s*h,d*o+i,d*h-s*a,0,c*h-s*o,d*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,c=r+r,d=a+a,f=o+o,u=r*c,p=r*d,m=r*f,M=a*d,x=a*f,g=o*f,v=h*c,y=h*d,S=h*f,E=i.x,b=i.y,A=i.z;return s[0]=(1-(M+g))*E,s[1]=(p+S)*E,s[2]=(m-y)*E,s[3]=0,s[4]=(p-S)*b,s[5]=(1-(u+g))*b,s[6]=(x+v)*b,s[7]=0,s[8]=(m+y)*A,s[9]=(x-v)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Rs.set(s[0],s[1],s[2]).length();const o=Rs.set(s[4],s[5],s[6]).length(),h=Rs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Qn.copy(this);const c=1/a,d=1/o,f=1/h;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=d,Qn.elements[5]*=d,Qn.elements[6]*=d,Qn.elements[8]*=f,Qn.elements[9]*=f,Qn.elements[10]*=f,t.setFromRotationMatrix(Qn),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=bi,h=!1){const c=this.elements,d=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let m,M;if(h)m=r/(a-r),M=a*r/(a-r);else if(o===bi)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===za)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=bi,h=!1){const c=this.elements,d=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let m,M;if(h)m=1/(a-r),M=a/(a-r);else if(o===bi)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===za)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Rs=new X,Qn=new zt,U1=new X(0,0,0),B1=new X(1,1,1),Yi=new X,Xr=new X,Dn=new X,fh=new zt,ph=new rr;class ys{constructor(e=0,t=0,i=0,s=ys.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],c=s[5],d=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(lt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ph.setFromEuler(this),this.setFromQuaternion(ph,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ys.DEFAULT_ORDER="XYZ";class ad{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let k1=0;const mh=new X,Cs=new rr,Ri=new zt,Kr=new X,pr=new X,z1=new X,H1=new rr,gh=new X(1,0,0),xh=new X(0,1,0),Mh=new X(0,0,1),vh={type:"added"},G1={type:"removed"},Ls={type:"childadded",child:null},Eo={type:"childremoved",child:null};class An extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:k1++}),this.uuid=Fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=An.DEFAULT_UP.clone();const e=new X,t=new ys,i=new rr,s=new X(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new zt},normalMatrix:{value:new Ze}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=An.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ad,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(gh,e)}rotateY(e){return this.rotateOnAxis(xh,e)}rotateZ(e){return this.rotateOnAxis(Mh,e)}translateOnAxis(e,t){return mh.copy(e).applyQuaternion(this.quaternion),this.position.add(mh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gh,e)}translateY(e){return this.translateOnAxis(xh,e)}translateZ(e){return this.translateOnAxis(Mh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Kr.copy(e):Kr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(pr,Kr,this.up):Ri.lookAt(Kr,pr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(Ri),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(dt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vh),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):dt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(G1),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vh),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,e,z1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,H1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,d=h.length;c<d;c++){const f=h[c];r(e.shapes,f)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const h=[];for(const c in o){const d=o[c];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}An.DEFAULT_UP=new X(0,1,0);An.DEFAULT_MATRIX_AUTO_UPDATE=!0;An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ws extends An{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W1={type:"move"};class Ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ws,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ws,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ws,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),g=this._getHandJoint(c,M);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(W1)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ws;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},qr={h:0,s:0,l:0};function To(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=L1(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=To(a,r,e+1/3),this.g=To(a,r,e),this.b=To(a,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=Yn){function i(r){r!==void 0&&parseFloat(r)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yn){const i=od[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yn){return at.workingToColorSpace(xn.copy(this),e),Math.round(lt(xn.r*255,0,255))*65536+Math.round(lt(xn.g*255,0,255))*256+Math.round(lt(xn.b*255,0,255))}getHexString(e=Yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(xn.copy(this),t);const i=xn.r,s=xn.g,r=xn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,c;const d=(o+a)/2;if(o===a)h=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-i)/f+2;break;case r:h=(i-s)/f+4;break}h/=6}return e.h=h,e.s=c,e.l=d,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Yn){at.workingToColorSpace(xn.copy(this),e);const t=xn.r,i=xn.g,s=xn.b;return e!==Yn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(qr);const i=_o(Xi.h,qr.h,t),s=_o(Xi.s,qr.s,t),r=_o(Xi.l,qr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new it;it.NAMES=od;class _h extends An{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ys,this.environmentIntensity=1,this.environmentRotation=new ys,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jn=new X,Ci=new X,Ro=new X,Li=new X,Ps=new X,Ds=new X,bh=new X,Co=new X,Lo=new X,Po=new X,Do=new rt,Io=new rt,No=new rt;class ni{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){jn.subVectors(s,t),Ci.subVectors(i,t),Ro.subVectors(e,t);const a=jn.dot(jn),o=jn.dot(Ci),h=jn.dot(Ro),c=Ci.dot(Ci),d=Ci.dot(Ro),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*h-o*d)*u,m=(a*d-o*h)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Li)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Li.x),h.addScaledVector(a,Li.y),h.addScaledVector(o,Li.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return Do.setScalar(0),Io.setScalar(0),No.setScalar(0),Do.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,i),No.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Do,r.x),a.addScaledVector(Io,r.y),a.addScaledVector(No,r.z),a}static isFrontFacing(e,t,i,s){return jn.subVectors(i,t),Ci.subVectors(e,t),jn.cross(Ci).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),jn.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return ni.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Ps.subVectors(s,i),Ds.subVectors(r,i),Co.subVectors(e,i);const h=Ps.dot(Co),c=Ds.dot(Co);if(h<=0&&c<=0)return t.copy(i);Lo.subVectors(e,s);const d=Ps.dot(Lo),f=Ds.dot(Lo);if(d>=0&&f<=d)return t.copy(s);const u=h*f-d*c;if(u<=0&&h>=0&&d<=0)return a=h/(h-d),t.copy(i).addScaledVector(Ps,a);Po.subVectors(e,r);const p=Ps.dot(Po),m=Ds.dot(Po);if(m>=0&&p<=m)return t.copy(r);const M=p*c-h*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Ds,o);const x=d*m-p*f;if(x<=0&&f-d>=0&&p-m>=0)return bh.subVectors(r,s),o=(f-d)/(f-d+(p-m)),t.copy(s).addScaledVector(bh,o);const g=1/(x+M+u);return a=M*g,o=u*g,t.copy(i).addScaledVector(Ps,a).addScaledVector(Ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ar{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$r.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$r.copy(i.boundingBox)),$r.applyMatrix4(e.matrixWorld),this.union($r)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),Zr.subVectors(this.max,mr),Is.subVectors(e.a,mr),Ns.subVectors(e.b,mr),Os.subVectors(e.c,mr),Ki.subVectors(Ns,Is),qi.subVectors(Os,Ns),rs.subVectors(Is,Os);let t=[0,-Ki.z,Ki.y,0,-qi.z,qi.y,0,-rs.z,rs.y,Ki.z,0,-Ki.x,qi.z,0,-qi.x,rs.z,0,-rs.x,-Ki.y,Ki.x,0,-qi.y,qi.x,0,-rs.y,rs.x,0];return!Oo(t,Is,Ns,Os,Zr)||(t=[1,0,0,0,1,0,0,0,1],!Oo(t,Is,Ns,Os,Zr))?!1:(Jr.crossVectors(Ki,qi),t=[Jr.x,Jr.y,Jr.z],Oo(t,Is,Ns,Os,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new X,new X,new X,new X,new X,new X,new X,new X],ei=new X,$r=new ar,Is=new X,Ns=new X,Os=new X,Ki=new X,qi=new X,rs=new X,mr=new X,Zr=new X,Jr=new X,as=new X;function Oo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){as.fromArray(n,r);const o=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),h=e.dot(as),c=t.dot(as),d=i.dot(as);if(Math.max(-Math.max(h,c,d),Math.min(h,c,d))>o)return!1}return!0}const Jt=new X,Qr=new Ke;let V1=0;class kn extends ws{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:V1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=E1,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Qr.fromBufferAttribute(this,t),Qr.applyMatrix3(e),this.setXY(t,Qr.x,Qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=fr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array),s=Tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),i=Tn(i,this.array),s=Tn(s,this.array),r=Tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ld extends kn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class cd extends kn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class It extends kn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Y1=new ar,gr=new X,Fo=new X;class Ur{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Y1.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);const t=gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(gr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(Fo)),this.expandByPoint(gr.copy(e.center).sub(Fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let X1=0;const Wn=new zt,Uo=new An,Fs=new X,In=new ar,xr=new ar,on=new X;class jt extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X1++}),this.uuid=Fr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(A1(e)?cd:ld)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,t,i){return Wn.makeTranslation(e,t,i),this.applyMatrix4(Wn),this}scale(e,t,i){return Wn.makeScale(e,t,i),this.applyMatrix4(Wn),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new It(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ar);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];In.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const i=this.boundingSphere.center;if(In.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];xr.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(In.min,xr.min),In.expandByPoint(on),on.addVectors(In.max,xr.max),In.expandByPoint(on)):(In.expandByPoint(xr.min),In.expandByPoint(xr.max))}In.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)on.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(on));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)on.fromBufferAttribute(o,c),h&&(Fs.fromBufferAttribute(e,c),on.add(Fs)),s=Math.max(s,i.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new kn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new X,h[_]=new X;const c=new X,d=new X,f=new X,u=new Ke,p=new Ke,m=new Ke,M=new X,x=new X;function g(_,w,L){c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,w),f.fromBufferAttribute(i,L),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,L),d.sub(c),f.sub(c),p.sub(u),m.sub(u);const R=1/(p.x*m.y-m.x*p.y);isFinite(R)&&(M.copy(d).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(R),x.copy(f).multiplyScalar(p.x).addScaledVector(d,-m.x).multiplyScalar(R),o[_].add(M),o[w].add(M),o[L].add(M),h[_].add(x),h[w].add(x),h[L].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,w=v.length;_<w;++_){const L=v[_],R=L.start,P=L.count;for(let N=R,I=R+P;N<I;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const y=new X,S=new X,E=new X,b=new X;function A(_){E.fromBufferAttribute(s,_),b.copy(E);const w=o[_];y.copy(w),y.sub(E.multiplyScalar(E.dot(w))).normalize(),S.crossVectors(b,w);const R=S.dot(h[_])<0?-1:1;a.setXYZW(_,y.x,y.y,y.z,R)}for(let _=0,w=v.length;_<w;++_){const L=v[_],R=L.start,P=L.count;for(let N=R,I=R+P;N<I;N+=3)A(e.getX(N+0)),A(e.getX(N+1)),A(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new X,r=new X,a=new X,o=new X,h=new X,c=new X,d=new X,f=new X;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),M=e.getX(u+1),x=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,x),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,m),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,x),o.add(d),h.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,h){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(h.length*d);let p=0,m=0;for(let M=0,x=h.length;M<x;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*d;for(let g=0;g<d;g++)u[m++]=c[p++]}return new kn(u,d,f)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],c=e(h,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const h=[],c=r[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],d=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(s[h]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],f=r[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bo=new X,K1=new X,q1=new Ze;class Qi{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Bo.subVectors(i,t).cross(K1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Bo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||q1.getNormalMatrix(e),s=this.coplanarPoint(Bo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let $1=0;class or extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$1++}),this.uuid=Fr(),this.name="",this.type="Material",this.blending=qs,this.side=vs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=M1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mo,this.stencilZFail=Mo,this.stencilZPass=Mo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Qi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Di=new X,ko=new X,jr=new X,ea=new X;class Ec{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ko.copy(e).add(t).multiplyScalar(.5),jr.copy(t).sub(e).normalize(),ea.copy(this.origin).sub(ko);const r=e.distanceTo(t)*.5,a=-this.direction.dot(jr),o=ea.dot(this.direction),h=-ea.dot(jr),c=ea.lengthSq(),d=Math.abs(1-a*a);let f,u,p,m;if(d>0)if(f=a*h-o,u=a*o-h,m=r*d,f>=0)if(u>=-m)if(u<=m){const M=1/d;f*=M,u*=M,p=f*(f+a*u+2*o)+u*(a*f+u+2*h)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c):u<=m?(f=0,u=Math.min(Math.max(-r,-h),r),p=u*(u+2*h)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ko).addScaledVector(jr,u),p}intersectSphere(e,t){if(e.radius<0)return null;Di.subVectors(e.center,this.origin);const i=Di.dot(this.direction),s=Di.dot(Di)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,h=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,h=(e.min.z-u.z)*f),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,c=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,m=t.x-a.x,M=t.y-a.y,x=t.z-a.z,g=i.x-a.x,v=i.y-a.y,y=i.z-a.z,S=Math.abs(h),E=Math.abs(c),b=Math.abs(d);let A,_,w,L,R,P,N,I,F,G,q,se;if(S>=E&&S>=b?(w=h,P=f,F=m,se=g,h>=0?(A=c,_=d,L=u,R=p,N=M,I=x,G=v,q=y):(A=d,_=c,L=p,R=u,N=x,I=M,G=y,q=v)):E>=b?(w=c,P=u,F=M,se=v,c>=0?(A=d,_=h,L=p,R=f,N=x,I=m,G=y,q=g):(A=h,_=d,L=f,R=p,N=m,I=x,G=g,q=y)):(w=d,P=p,F=x,se=y,d>=0?(A=h,_=c,L=f,R=u,N=m,I=M,G=g,q=v):(A=c,_=h,L=u,R=f,N=M,I=m,G=v,q=g)),w===0)return null;const k=A/w,ee=_/w,U=1/w,Q=L-k*P,le=R-ee*P,_e=N-k*F,ne=I-ee*F,re=G-k*se,z=q-ee*se,K=re*ne-z*_e,B=Q*z-le*re,oe=_e*le-ne*Q;if(s){if(K<0||B<0||oe<0)return null}else if((K<0||B<0||oe<0)&&(K>0||B>0||oe>0))return null;const ae=K+B+oe;if(ae===0)return null;const ve=U*(K*P+B*F+oe*se);return(ae>0?ve<0:ve>0)?null:this.at(ve/ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hd extends or{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ys,this.combine=Gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Sh=new zt,os=new Ec,ta=new Ur,yh=new X,na=new X,ia=new X,sa=new X,zo=new X,ra=new X,wh=new X,aa=new X;class Kt extends An{constructor(e=new jt,t=new hd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ra.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const d=o[h],f=r[h];d!==0&&(zo.fromBufferAttribute(f,e),a?ra.addScaledVector(zo,d):ra.addScaledVector(zo.sub(t),d))}t.add(ra)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ta.copy(i.boundingSphere),ta.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(ta.containsPoint(os.origin)===!1&&(os.intersectSphere(ta,yh)===null||os.origin.distanceToSquared(yh)>(e.far-e.near)**2))&&(Sh.copy(r).invert(),os.copy(e.ray).applyMatrix4(Sh),!(i.boundingBox!==null&&os.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),y=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let S=v,E=y;S<E;S+=3){const b=o.getX(S),A=o.getX(S+1),_=o.getX(S+2);s=oa(this,g,e,i,c,d,f,b,A,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=o.getX(x),y=o.getX(x+1),S=o.getX(x+2);s=oa(this,a,e,i,c,d,f,v,y,S),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const x=u[m],g=a[x.materialIndex],v=Math.max(x.start,p.start),y=Math.min(h.count,Math.min(x.start+x.count,p.start+p.count));for(let S=v,E=y;S<E;S+=3){const b=S,A=S+1,_=S+2;s=oa(this,g,e,i,c,d,f,b,A,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const v=x,y=x+1,S=x+2;s=oa(this,a,e,i,c,d,f,v,y,S),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function Z1(n,e,t,i,s,r,a,o){let h;if(e.side===Pn?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===vs,o),h===null)return null;aa.copy(o),aa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(aa);return c<t.near||c>t.far?null:{distance:c,point:aa.clone(),object:n}}function oa(n,e,t,i,s,r,a,o,h,c){n.getVertexPosition(o,na),n.getVertexPosition(h,ia),n.getVertexPosition(c,sa);const d=Z1(n,e,t,i,na,ia,sa,wh);if(d){const f=new X;ni.getBarycoord(wh,na,ia,sa,f),s&&(d.uv=ni.getInterpolatedAttribute(s,o,h,c,f,new Ke)),r&&(d.uv1=ni.getInterpolatedAttribute(r,o,h,c,f,new Ke)),a&&(d.normal=ni.getInterpolatedAttribute(a,o,h,c,f,new X),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new X,materialIndex:0};ni.getNormal(na,ia,sa,u.normal),d.face=u,d.barycoord=f}return d}class Vs extends _n{constructor(e=null,t=1,i=1,s,r,a,o,h,c=Yt,d=Yt,f,u){super(null,a,o,h,c,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ac extends kn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ls=new Ur,J1=new Ke(.5,.5),la=new X;class Ga{constructor(e=new Qi,t=new Qi,i=new Qi,s=new Qi,r=new Qi,a=new Qi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],c=r[3],d=r[4],f=r[5],u=r[6],p=r[7],m=r[8],M=r[9],x=r[10],g=r[11],v=r[12],y=r[13],S=r[14],E=r[15];if(s[0].setComponents(c-a,p-d,g-m,E-v).normalize(),s[1].setComponents(c+a,p+d,g+m,E+v).normalize(),s[2].setComponents(c+o,p+f,g+M,E+y).normalize(),s[3].setComponents(c-o,p-f,g-M,E-y).normalize(),i)s[4].setComponents(h,u,x,S).normalize(),s[5].setComponents(c-h,p-u,g-x,E-S).normalize();else if(s[4].setComponents(c-h,p-u,g-x,E-S).normalize(),t===bi)s[5].setComponents(c+h,p+u,g+x,E+S).normalize();else if(t===za)s[5].setComponents(h,u,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){ls.center.set(0,0,0);const t=J1.distanceTo(e.center);return ls.radius=.7071067811865476+t,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(la.x=s.normal.x>0?e.max.x:e.min.x,la.y=s.normal.y>0?e.max.y:e.min.y,la.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(la)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ud extends or{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wa=new X,Va=new X,Eh=new zt,Mr=new Ec,ca=new Ur,Ho=new X,Ah=new X;class Q1 extends An{constructor(e=new jt,t=new ud){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Wa.fromBufferAttribute(t,s-1),Va.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Wa.distanceTo(Va);e.setAttribute("lineDistance",new It(i,1))}else Xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ca.copy(i.boundingSphere),ca.applyMatrix4(s),ca.radius+=r,e.ray.intersectsSphere(ca)===!1)return;Eh.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(Eh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=d.getX(M),v=d.getX(M+1),y=ha(this,e,Mr,h,g,v,M);y&&t.push(y)}if(this.isLineLoop){const M=d.getX(m-1),x=d.getX(p),g=ha(this,e,Mr,h,M,x,m-1);g&&t.push(g)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,x=m-1;M<x;M+=c){const g=ha(this,e,Mr,h,M,M+1,M);g&&t.push(g)}if(this.isLineLoop){const M=ha(this,e,Mr,h,m-1,p,m-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ha(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Wa.fromBufferAttribute(o,s),Va.fromBufferAttribute(o,r),t.distanceSqToSegment(Wa,Va,Ho,Ah)>i)return;Ho.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ho);if(!(c<e.near||c>e.far))return{distance:c,point:Ah.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Th=new X,Rh=new X;class Tc extends Q1{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Th.fromBufferAttribute(t,s),Rh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Th.distanceTo(Rh);e.setAttribute("lineDistance",new It(i,1))}else Xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class j1 extends or{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ch=new zt,ql=new Ec,ua=new Ur,da=new X;class Ya extends An{constructor(e=new jt,t=new j1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(s),ua.radius+=r,e.ray.intersectsSphere(ua)===!1)return;Ch.copy(s).invert(),ql.copy(e.ray).applyMatrix4(Ch);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){const x=c.getX(m);da.fromBufferAttribute(f,x),Lh(da,x,h,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let m=u,M=p;m<M;m++)da.fromBufferAttribute(f,m),Lh(da,m,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Lh(n,e,t,i,s,r,a){const o=ql.distanceSqToPoint(n);if(o<t){const h=new X;ql.closestPointToPoint(n,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class dd extends _n{constructor(e=[],t=bs,i,s,r,a,o,h,c,d){super(e,t,i,s,r,a,o,h,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fd extends _n{constructor(e,t,i,s,r,a,o,h,c){super(e,t,i,s,r,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tr extends _n{constructor(e,t,i=wi,s,r,a,o=Yt,h=Yt,c,d=ki,f=1){if(d!==ki&&d!==gs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,h,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class e2 extends tr{constructor(e,t=wi,i=bs,s,r,a=Yt,o=Yt,h,c=ki){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,h,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class pd extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Br extends jt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],d=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(d,3)),this.setAttribute("uv",new It(f,2));function m(M,x,g,v,y,S,E,b,A,_,w){const L=S/A,R=E/_,P=S/2,N=E/2,I=b/2,F=A+1,G=_+1;let q=0,se=0;const k=new X;for(let ee=0;ee<G;ee++){const U=ee*R-N;for(let Q=0;Q<F;Q++){const le=Q*L-P;k[M]=le*v,k[x]=U*y,k[g]=I,c.push(k.x,k.y,k.z),k[M]=0,k[x]=0,k[g]=b>0?1:-1,d.push(k.x,k.y,k.z),f.push(Q/A),f.push(1-ee/_),q+=1}}for(let ee=0;ee<_;ee++)for(let U=0;U<A;U++){const Q=u+U+F*ee,le=u+U+F*(ee+1),_e=u+(U+1)+F*(ee+1),ne=u+(U+1)+F*ee;h.push(Q,le,ne),h.push(le,_e,ne),se+=6}o.addGroup(p,se,w),p+=se,u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Br(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Hn extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),c=o+1,d=h+1,f=e/o,u=t/h,p=[],m=[],M=[],x=[];for(let g=0;g<d;g++){const v=g*u-a;for(let y=0;y<c;y++){const S=y*f-r;m.push(S,-v,0),M.push(0,0,1),x.push(y/o),x.push(1-g/h)}}for(let g=0;g<h;g++)for(let v=0;v<o;v++){const y=v+c*g,S=v+c*(g+1),E=v+1+c*(g+1),b=v+1+c*g;p.push(y,S,b),p.push(S,E,b)}this.setIndex(p),this.setAttribute("position",new It(m,3)),this.setAttribute("normal",new It(M,3)),this.setAttribute("uv",new It(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.widthSegments,e.heightSegments)}}function nr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Ph(s))s.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Ph(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function yn(n){const e={};for(let t=0;t<n.length;t++){const i=nr(n[t]);for(const s in i)e[s]=i[s]}return e}function Ph(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function t2(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function md(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const n2={clone:nr,merge:yn};var i2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,s2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bt extends or{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=i2,this.fragmentShader=s2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=t2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new it().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ke().fromArray(s.value);break;case"v3":this.uniforms[i].value=new X().fromArray(s.value);break;case"v4":this.uniforms[i].value=new rt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new zt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class r2 extends bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class a2 extends or{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=g1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class o2 extends or{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fa=new X,pa=new rr,ui=new X;class gd extends An{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=bi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(fa,pa,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(fa,pa,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $i=new X,Dh=new Ke,Ih=new Ke;class On extends gd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Kl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kl*2*Math.atan(Math.tan(vo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,Dh,Ih),t.subVectors(Ih,Dh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Rc extends gd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,h=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cc extends jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Us=-90,Bs=1;class l2 extends An{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new On(Us,Bs,e,t);s.layers=this.layers,this.add(s);const r=new On(Us,Bs,e,t);r.layers=this.layers,this.add(r);const a=new On(Us,Bs,e,t);a.layers=this.layers,this.add(a);const o=new On(Us,Bs,e,t);o.layers=this.layers,this.add(o);const h=new On(Us,Bs,e,t);h.layers=this.layers,this.add(h);const c=new On(Us,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const c of t)this.remove(c);if(e===bi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===za)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class c2 extends On{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class xd{static{xd.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function Nh(n,e,t,i){const s=h2(i);switch(t){case td:return n*e;case id:return n*e/s.components*s.byteLength;case vc:return n*e/s.components*s.byteLength;case Ss:return n*e*2/s.components*s.byteLength;case _c:return n*e*2/s.components*s.byteLength;case nd:return n*e*3/s.components*s.byteLength;case Bn:return n*e*4/s.components*s.byteLength;case bc:return n*e*4/s.components*s.byteLength;case Aa:case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ml:case _l:return Math.max(n,16)*Math.max(e,8)/4;case xl:case vl:return Math.max(n,8)*Math.max(e,8)/2;case bl:case Sl:case wl:case El:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case yl:case Ua:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Il:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case kl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case zl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Hl:case Gl:case Wl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Vl:case Yl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ba:case Xl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function h2(n){switch(n){case Fn:case Ju:return{byteLength:1,components:1};case Pr:case Qu:case Ei:return{byteLength:2,components:1};case xc:case Mc:return{byteLength:2,components:4};case wi:case gc:case _i:return{byteLength:4,components:1};case ju:case ed:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uc}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uc);function Md(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function u2(n){const e=new WeakMap;function t(o,h){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,c){const d=h.array,f=h.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],M=f[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,f[u]=M)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const M=f[p];n.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:s,remove:r,update:a}}var d2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,f2=`#ifdef USE_ALPHAHASH
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
#endif`,p2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,m2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,x2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M2=`#ifdef USE_AOMAP
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
#endif`,v2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_2=`#ifdef USE_BATCHING
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
#endif`,b2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,S2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,w2=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,E2=`#ifdef USE_IRIDESCENCE
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
#endif`,A2=`#ifdef USE_BUMPMAP
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
#endif`,T2=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,R2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,L2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,P2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,D2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,I2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,N2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,O2=`#define PI 3.141592653589793
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
} // validated`,F2=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,U2=`vec3 transformedNormal = objectNormal;
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
#endif`,B2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,k2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,z2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,H2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,G2="gl_FragColor = linearToOutputTexel( gl_FragColor );",W2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,V2=`#ifdef USE_ENVMAP
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
#endif`,Y2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,X2=`#ifdef USE_ENVMAP
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
#endif`,K2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,q2=`#ifdef USE_ENVMAP
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
#endif`,$2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Z2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,J2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Q2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,j2=`#ifdef USE_GRADIENTMAP
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
}`,ex=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ix=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,sx=`#ifdef USE_ENVMAP
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
#endif`,rx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ax=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ox=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cx=`PhysicalMaterial material;
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
#endif`,hx=`uniform sampler2D dfgLUT;
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
}`,ux=`
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
#endif`,dx=`#if defined( RE_IndirectDiffuse )
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
#endif`,fx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,px=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,mx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_x=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sx=`#if defined( USE_POINTS_UV )
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
#endif`,yx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ex=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ax=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rx=`#ifdef USE_MORPHTARGETS
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
#endif`,Cx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Px=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ox=`#ifdef USE_NORMALMAP
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
#endif`,Fx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ux=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jx=`float getShadowMask() {
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
}`,Qx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jx=`#ifdef USE_SKINNING
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
#endif`,eM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tM=`#ifdef USE_SKINNING
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
#endif`,nM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,aM=`#ifdef USE_TRANSMISSION
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
#endif`,oM=`#ifdef USE_TRANSMISSION
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
#endif`,lM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fM=`uniform sampler2D t2D;
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
}`,pM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MM=`#include <common>
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
}`,vM=`#if DEPTH_PACKING == 3200
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
}`,_M=`#define DISTANCE
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
}`,bM=`#define DISTANCE
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
}`,SM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wM=`uniform float scale;
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
}`,EM=`uniform vec3 diffuse;
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
}`,AM=`#include <common>
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
}`,TM=`uniform vec3 diffuse;
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
}`,RM=`#define LAMBERT
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
}`,CM=`#define LAMBERT
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
}`,LM=`#define MATCAP
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
}`,PM=`#define MATCAP
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
}`,DM=`#define NORMAL
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
}`,IM=`#define NORMAL
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
}`,NM=`#define PHONG
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
}`,OM=`#define PHONG
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
}`,FM=`#define STANDARD
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
}`,UM=`#define STANDARD
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
}`,BM=`#define TOON
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
}`,kM=`#define TOON
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
}`,zM=`uniform float size;
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
}`,HM=`uniform vec3 diffuse;
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
}`,GM=`#include <common>
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
}`,WM=`uniform vec3 color;
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
}`,VM=`uniform float rotation;
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
}`,YM=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:d2,alphahash_pars_fragment:f2,alphamap_fragment:p2,alphamap_pars_fragment:m2,alphatest_fragment:g2,alphatest_pars_fragment:x2,aomap_fragment:M2,aomap_pars_fragment:v2,batching_pars_vertex:_2,batching_vertex:b2,begin_vertex:S2,beginnormal_vertex:y2,bsdfs:w2,iridescence_fragment:E2,bumpmap_pars_fragment:A2,clipping_planes_fragment:T2,clipping_planes_pars_fragment:R2,clipping_planes_pars_vertex:C2,clipping_planes_vertex:L2,color_fragment:P2,color_pars_fragment:D2,color_pars_vertex:I2,color_vertex:N2,common:O2,cube_uv_reflection_fragment:F2,defaultnormal_vertex:U2,displacementmap_pars_vertex:B2,displacementmap_vertex:k2,emissivemap_fragment:z2,emissivemap_pars_fragment:H2,colorspace_fragment:G2,colorspace_pars_fragment:W2,envmap_fragment:V2,envmap_common_pars_fragment:Y2,envmap_pars_fragment:X2,envmap_pars_vertex:K2,envmap_physical_pars_fragment:sx,envmap_vertex:q2,fog_vertex:$2,fog_pars_vertex:Z2,fog_fragment:J2,fog_pars_fragment:Q2,gradientmap_pars_fragment:j2,lightmap_pars_fragment:ex,lights_lambert_fragment:tx,lights_lambert_pars_fragment:nx,lights_pars_begin:ix,lights_toon_fragment:rx,lights_toon_pars_fragment:ax,lights_phong_fragment:ox,lights_phong_pars_fragment:lx,lights_physical_fragment:cx,lights_physical_pars_fragment:hx,lights_fragment_begin:ux,lights_fragment_maps:dx,lights_fragment_end:fx,lightprobes_pars_fragment:px,logdepthbuf_fragment:mx,logdepthbuf_pars_fragment:gx,logdepthbuf_pars_vertex:xx,logdepthbuf_vertex:Mx,map_fragment:vx,map_pars_fragment:_x,map_particle_fragment:bx,map_particle_pars_fragment:Sx,metalnessmap_fragment:yx,metalnessmap_pars_fragment:wx,morphinstance_vertex:Ex,morphcolor_vertex:Ax,morphnormal_vertex:Tx,morphtarget_pars_vertex:Rx,morphtarget_vertex:Cx,normal_fragment_begin:Lx,normal_fragment_maps:Px,normal_pars_fragment:Dx,normal_pars_vertex:Ix,normal_vertex:Nx,normalmap_pars_fragment:Ox,clearcoat_normal_fragment_begin:Fx,clearcoat_normal_fragment_maps:Ux,clearcoat_pars_fragment:Bx,iridescence_pars_fragment:kx,opaque_fragment:zx,packing:Hx,premultiplied_alpha_fragment:Gx,project_vertex:Wx,dithering_fragment:Vx,dithering_pars_fragment:Yx,roughnessmap_fragment:Xx,roughnessmap_pars_fragment:Kx,shadowmap_pars_fragment:qx,shadowmap_pars_vertex:$x,shadowmap_vertex:Zx,shadowmask_pars_fragment:Jx,skinbase_vertex:Qx,skinning_pars_vertex:jx,skinning_vertex:eM,skinnormal_vertex:tM,specularmap_fragment:nM,specularmap_pars_fragment:iM,tonemapping_fragment:sM,tonemapping_pars_fragment:rM,transmission_fragment:aM,transmission_pars_fragment:oM,uv_pars_fragment:lM,uv_pars_vertex:cM,uv_vertex:hM,worldpos_vertex:uM,background_vert:dM,background_frag:fM,backgroundCube_vert:pM,backgroundCube_frag:mM,cube_vert:gM,cube_frag:xM,depth_vert:MM,depth_frag:vM,distance_vert:_M,distance_frag:bM,equirect_vert:SM,equirect_frag:yM,linedashed_vert:wM,linedashed_frag:EM,meshbasic_vert:AM,meshbasic_frag:TM,meshlambert_vert:RM,meshlambert_frag:CM,meshmatcap_vert:LM,meshmatcap_frag:PM,meshnormal_vert:DM,meshnormal_frag:IM,meshphong_vert:NM,meshphong_frag:OM,meshphysical_vert:FM,meshphysical_frag:UM,meshtoon_vert:BM,meshtoon_frag:kM,points_vert:zM,points_frag:HM,shadow_vert:GM,shadow_frag:WM,sprite_vert:VM,sprite_frag:YM},Te={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},xi={basic:{uniforms:yn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:yn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:yn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:yn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:yn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new it(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:yn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:yn([Te.points,Te.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:yn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:yn([Te.common,Te.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:yn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:yn([Te.sprite,Te.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:yn([Te.common,Te.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:yn([Te.lights,Te.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};xi.physical={uniforms:yn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const ma={r:0,b:0,g:0},XM=new zt,vd=new Ze;vd.set(-1,0,0,0,1,0,0,0,1);function KM(n,e,t,i,s,r){const a=new it(0);let o=s===!0?0:1,h,c,d=null,f=0,u=null;function p(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const S=v.backgroundBlurriness>0;y=e.get(y,S)}return y}function m(v){let y=!1;const S=p(v);S===null?x(a,o):S&&S.isColor&&(x(S,1),y=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,y){const S=p(y);S&&(S.isCubeTexture||S.mapping===no)?(c===void 0&&(c=new Kt(new Br(1,1,1),new bt({name:"BackgroundCubeMaterial",uniforms:nr(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(XM.makeRotationFromEuler(y.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vd),c.material.toneMapped=at.getTransfer(S.colorSpace)!==St,(d!==S||f!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Kt(new Hn(2,2),new bt({name:"BackgroundMaterial",uniforms:nr(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:vs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=at.getTransfer(S.colorSpace)!==St,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,d=S,f=S.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function x(v,y){v.getRGB(ma,md(n)),t.buffers.color.setClear(ma.r,ma.g,ma.b,y,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),o=y,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,x(a,o)},render:m,addToRenderList:M,dispose:g}}function qM(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(R,P,N,I,F){let G=!1;const q=f(R,I,N,P);r!==q&&(r=q,c(r.object)),G=p(R,I,N,F),G&&m(R,I,N,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,S(R,P,N,I),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function h(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function d(R){return n.deleteVertexArray(R)}function f(R,P,N,I){const F=I.wireframe===!0;let G=i[P.id];G===void 0&&(G={},i[P.id]=G);const q=R.isInstancedMesh===!0?R.id:0;let se=G[q];se===void 0&&(se={},G[q]=se);let k=se[N.id];k===void 0&&(k={},se[N.id]=k);let ee=k[F];return ee===void 0&&(ee=u(h()),k[F]=ee),ee}function u(R){const P=[],N=[],I=[];for(let F=0;F<t;F++)P[F]=0,N[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:I,object:R,attributes:{},index:null}}function p(R,P,N,I){const F=r.attributes,G=P.attributes;let q=0;const se=N.getAttributes();for(const k in se)if(se[k].location>=0){const U=F[k];let Q=G[k];if(Q===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor)),U===void 0||U.attribute!==Q||Q&&U.data!==Q.data)return!0;q++}return r.attributesNum!==q||r.index!==I}function m(R,P,N,I){const F={},G=P.attributes;let q=0;const se=N.getAttributes();for(const k in se)if(se[k].location>=0){let U=G[k];U===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(U=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(U=R.instanceColor));const Q={};Q.attribute=U,U&&U.data&&(Q.data=U.data),F[k]=Q,q++}r.attributes=F,r.attributesNum=q,r.index=I}function M(){const R=r.newAttributes;for(let P=0,N=R.length;P<N;P++)R[P]=0}function x(R){g(R,0)}function g(R,P){const N=r.newAttributes,I=r.enabledAttributes,F=r.attributeDivisors;N[R]=1,I[R]===0&&(n.enableVertexAttribArray(R),I[R]=1),F[R]!==P&&(n.vertexAttribDivisor(R,P),F[R]=P)}function v(){const R=r.newAttributes,P=r.enabledAttributes;for(let N=0,I=P.length;N<I;N++)P[N]!==R[N]&&(n.disableVertexAttribArray(N),P[N]=0)}function y(R,P,N,I,F,G,q){q===!0?n.vertexAttribIPointer(R,P,N,F,G):n.vertexAttribPointer(R,P,N,I,F,G)}function S(R,P,N,I){M();const F=I.attributes,G=N.getAttributes(),q=P.defaultAttributeValues;for(const se in G){const k=G[se];if(k.location>=0){let ee=F[se];if(ee===void 0&&(se==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),se==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor)),ee!==void 0){const U=ee.normalized,Q=ee.itemSize,le=e.get(ee);if(le===void 0)continue;const _e=le.buffer,ne=le.type,re=le.bytesPerElement,z=ne===n.INT||ne===n.UNSIGNED_INT||ee.gpuType===gc;if(ee.isInterleavedBufferAttribute){const K=ee.data,B=K.stride,oe=ee.offset;if(K.isInstancedInterleavedBuffer){for(let ae=0;ae<k.locationSize;ae++)g(k.location+ae,K.meshPerAttribute);R.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ae=0;ae<k.locationSize;ae++)x(k.location+ae);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let ae=0;ae<k.locationSize;ae++)y(k.location+ae,Q/k.locationSize,ne,U,B*re,(oe+Q/k.locationSize*ae)*re,z)}else{if(ee.isInstancedBufferAttribute){for(let K=0;K<k.locationSize;K++)g(k.location+K,ee.meshPerAttribute);R.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let K=0;K<k.locationSize;K++)x(k.location+K);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let K=0;K<k.locationSize;K++)y(k.location+K,Q/k.locationSize,ne,U,Q*re,Q/k.locationSize*K*re,z)}}else if(q!==void 0){const U=q[se];if(U!==void 0)switch(U.length){case 2:n.vertexAttrib2fv(k.location,U);break;case 3:n.vertexAttrib3fv(k.location,U);break;case 4:n.vertexAttrib4fv(k.location,U);break;default:n.vertexAttrib1fv(k.location,U)}}}}v()}function E(){w();for(const R in i){const P=i[R];for(const N in P){const I=P[N];for(const F in I){const G=I[F];for(const q in G)d(G[q].object),delete G[q];delete I[F]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;const P=i[R.id];for(const N in P){const I=P[N];for(const F in I){const G=I[F];for(const q in G)d(G[q].object),delete G[q];delete I[F]}}delete i[R.id]}function A(R){for(const P in i){const N=i[P];for(const I in N){const F=N[I];if(F[R.id]===void 0)continue;const G=F[R.id];for(const q in G)d(G[q].object),delete G[q];delete F[R.id]}}}function _(R){for(const P in i){const N=i[P],I=R.isInstancedMesh===!0?R.id:0,F=N[I];if(F!==void 0){for(const G in F){const q=F[G];for(const se in q)d(q[se].object),delete q[se];delete F[G]}delete N[I],Object.keys(N).length===0&&delete i[P]}}}function w(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:x,disableUnusedAttributes:v}}function $M(n,e,t){let i;function s(h){i=h}function r(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,d){d!==0&&(n.drawArraysInstanced(i,h,c,d),t.update(c,i,d))}function o(h,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ZM(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Fn&&A!==_i&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=h(c);d!==c&&(Xe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:S,maxSamples:E,samples:b}}function JM(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Qi,o=new Ze,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,M=f.clipIntersection,x=f.clipShadows,g=n.get(f);if(!s||m===null||m.length===0||r&&!x)r?d(null):c();else{const v=r?0:i,y=v*4;let S=g.clippingState||null;h.value=S,S=d(m,u,y,p);for(let E=0;E!==y;++E)S[E]=t[E];g.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,m){const M=f!==null?f.length:0;let x=null;if(M!==0){if(x=h.value,m!==!0||x===null){const g=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(x===null||x.length<g)&&(x=new Float32Array(g));for(let y=0,S=p;y!==M;++y,S+=4)a.copy(f[y]).applyMatrix4(v,o),a.normal.toArray(x,S),x[S+3]=a.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}const Ys=4,QM=6,jM=20,ev=256,vr=new Rc,Oh=new it;let Go=null,Wo=0,Vo=0,Yo=!1;const tv=new X,cs=new X;class Fh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=tv}=r;Go=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Go,Wo,Vo),this._renderer.xr.enabled=Yo,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===er?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Go=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Ei,format:Bn,colorSpace:Ir,depthBuffer:!1},s=Uh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uh(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=nv(r)),this._blurMaterial=sv(r,e,t),this._ggxMaterial=iv(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new jt,e);this._renderer.compile(t,vr)}_sceneToCubeUV(e,t,i,s,r){const h=new On(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(Oh),f.toneMapping=yi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new Br,new hd({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,x=M.material;let g=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,g=!0):(x.color.copy(Oh),g=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(h.up.set(0,c[y],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+d[y],r.y,r.z)):S===1?(h.up.set(0,0,c[y]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+d[y],r.z)):(h.up.set(0,c[y],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+d[y]));const E=this._cubeSize;ks(s,S*E,y>2?E:0,E,E),f.setRenderTarget(s),g&&f.render(M,h),f.render(e,h)}f.toneMapping=p,f.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===bs||e.mapping===er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;ks(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,vr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=c*1.25,p=f*u,{_lodMax:m}=this,M=this._sizeLods[i],x=3*M*(i>m-Ys?i-m+Ys:0),g=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=m-t,ks(r,x,g,3*M,2*M),s.setRenderTarget(r),s.render(o,vr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=m-i,ks(e,x,g,3*M,2*M),s.setRenderTarget(e),s.render(o,vr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[s],f=3*d*(s>this._lodMax-Ys?s-this._lodMax+Ys:0),u=4*(this._cubeSize-d);ks(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(h,vr)}}function nv(n){const e=[],t=[];let i=n;const s=n-Ys+1+QM;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,d=[h,h,c,h,c,c,h,h,c,c,h,c],f=6,u=6,p=3,m=new Float32Array(p*u*f),M=new Float32Array(p*u*f);for(let g=0;g<f;g++){const v=g%3*2/3-1,y=g>2?0:-1,S=[v,y,0,v+2/3,y,0,v+2/3,y+1,0,v,y,0,v+2/3,y+1,0,v,y+1,0];m.set(S,p*u*g);for(let E=0;E<u;E++){const b=d[E*2]*2-1,A=d[E*2+1]*2-1;g===0?cs.set(1,A,b):g===1?cs.set(-b,1,-A):g===2?cs.set(-b,A,1):g===3?cs.set(-1,A,-b):g===4?cs.set(-b,-1,A):cs.set(b,A,-1),cs.toArray(M,(g*u+E)*p)}}const x=new jt;x.setAttribute("position",new kn(m,p)),x.setAttribute("outputDirection",new kn(M,p)),t.push(new Kt(x,null)),i>Ys&&i--}return{lodMeshes:t,sizeLods:e}}function Uh(n,e,t){const i=new $n(n,e,t);return i.texture.mapping=no,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function iv(n,e,t){return new bt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ev,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:io(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function sv(n,e,t){return new bt({name:"SphericalGaussianBlur",defines:{SAMPLES:jM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:io(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Bh(){return new bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:io(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function kh(){return new bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function io(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class _d extends $n{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new dd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Br(5,5,5),r=new bt({name:"CubemapFromEquirect",uniforms:nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pn,blending:Si});r.uniforms.tEquirect.value=t;const a=new Kt(s,r),o=t.minFilter;return t.minFilter===ms&&(t.minFilter=Vt),new l2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function rv(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===mo||p===go)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const M=new _d(m.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===mo||p===go,M=p===bs||p===er;if(m||M){let x=t.get(u);const g=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new Fh(n)),x=m?i.fromEquirectangular(u,x):i.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const v=u.image;return m&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new Fh(n)),x=m?i.fromEquirectangular(u):i.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",d),x.texture):null}}}return u}function o(u,p){return p===mo?u.mapping=bs:p===go&&(u.mapping=er),u}function h(u){let p=0;const m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function av(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Zs("WebGLRenderer: "+i+" extension not supported."),s}}}function ov(n,e,t,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,m=f.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let y=0,S=v.length;y<S;y+=3){const E=v[y+0],b=v[y+1],A=v[y+2];u.push(E,b,b,A,A,E)}}else{const v=m.array;M=m.version;for(let y=0,S=v.length/3-1;y<S;y+=3){const E=y+0,b=y+1,A=y+2;u.push(E,b,b,A,A,E)}}const x=new(m.count>=65535?cd:ld)(u,1);x.version=M;const g=r.get(f);g&&e.remove(g),r.set(f,x)}function d(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:d}}function lv(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function h(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function c(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,f*a,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,p);let M=0;for(let x=0;x<p;x++)M+=u[x];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=d}function cv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:dt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function hv(n,e,t){const i=new WeakMap,s=new rt;function r(a,o,h){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),m===!0&&(y=2),M===!0&&(y=3);let S=o.attributes.position.count*y,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*E*4*f),A=new rd(b,S,E,f);A.type=_i,A.needsUpdate=!0;const _=y*4;for(let L=0;L<f;L++){const R=x[L],P=g[L],N=v[L],I=S*E*4*L;for(let F=0;F<R.count;F++){const G=F*_;p===!0&&(s.fromBufferAttribute(R,F),b[I+G+0]=s.x,b[I+G+1]=s.y,b[I+G+2]=s.z,b[I+G+3]=0),m===!0&&(s.fromBufferAttribute(P,F),b[I+G+4]=s.x,b[I+G+5]=s.y,b[I+G+6]=s.z,b[I+G+7]=0),M===!0&&(s.fromBufferAttribute(N,F),b[I+G+8]=s.x,b[I+G+9]=s.y,b[I+G+10]=s.z,b[I+G+11]=N.itemSize===4?s.w:1)}}u={count:f,texture:A,size:new Ke(S,E)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function uv(n,e,t,i,s){let r=new WeakMap;function a(c){const d=s.render.frame,f=c.geometry,u=e.get(c,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function o(){r=new WeakMap}function h(c){const d=c.target;d.removeEventListener("dispose",h),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const dv={[Wu]:"LINEAR_TONE_MAPPING",[Vu]:"REINHARD_TONE_MAPPING",[Yu]:"CINEON_TONE_MAPPING",[Xu]:"ACES_FILMIC_TONE_MAPPING",[qu]:"AGX_TONE_MAPPING",[$u]:"NEUTRAL_TONE_MAPPING",[Ku]:"CUSTOM_TONE_MAPPING"};function fv(n,e,t,i,s,r){const a=new $n(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new jt;c.setAttribute("position",new It([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new It([0,2,0,0,2,0],2));const d=new r2({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Kt(c,d),u=new Rc(-1,1,1,-1,0,1);let p=null,m=null,M=!1,x,g=null,v=[],y=!1;this.setSize=function(S,E){a.setSize(S,E),o!==null&&o.setSize(S,E),h!==null&&h.setSize(S,E);for(let b=0;b<v.length;b++){const A=v[b];A.setSize&&A.setSize(S,E)}},this.setEffects=function(S){v=S,y=v.length>0&&v[0].isRenderPass===!0;const E=a.width,b=a.height;v.length>0&&o===null&&(o=new $n(E,b,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),h=new $n(E,b,{type:Ei,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){const _=v[A];_.setSize&&_.setSize(E,b)}},this.begin=function(S,E){if(M||S.toneMapping===yi&&v.length===0)return!1;if(g=E,E!==null){const b=E.width,A=E.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return y===!1&&S.setRenderTarget(a),x=S.toneMapping,S.toneMapping=yi,!0},this.hasRenderPass=function(){return y},this.end=function(S,E){S.toneMapping=x,M=!0;let b=a,A=o;for(let _=0;_<v.length;_++){const w=v[_];w.enabled!==!1&&(w.render(S,A,b,E),w.needsSwap!==!1&&(b=A,A=A===o?h:o))}if(p!==S.outputColorSpace||m!==S.toneMapping){p=S.outputColorSpace,m=S.toneMapping,d.defines={},at.getTransfer(p)===St&&(d.defines.SRGB_TRANSFER="");const _=dv[m];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=b.texture,S.setRenderTarget(g),S.render(f,u),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),d.dispose()}}const bd=new _n,$l=new tr(1,1),Sd=new rd,yd=new F1,wd=new dd,zh=[],Hh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Vh=new Float32Array(4);function lr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=zh[s];if(r===void 0&&(r=new Float32Array(s),zh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function so(n,e){let t=Hh[e];t===void 0&&(t=new Int32Array(e),Hh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function xv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function Mv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Vh.set(i),n.uniformMatrix2fv(this.addr,!1,Vh),an(t,i)}}function vv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Wh.set(i),n.uniformMatrix3fv(this.addr,!1,Wh),an(t,i)}}function _v(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;Gh.set(i),n.uniformMatrix4fv(this.addr,!1,Gh),an(t,i)}}function bv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Sv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function wv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function Ev(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function Tv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function Cv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?($l.compareFunction=t.isReversedDepthBuffer()?yc:Sc,r=$l):r=bd,t.setTexture2D(e||r,s)}function Lv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||yd,s)}function Pv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||wd,s)}function Dv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Sd,s)}function Iv(n){switch(n){case 5126:return pv;case 35664:return mv;case 35665:return gv;case 35666:return xv;case 35674:return Mv;case 35675:return vv;case 35676:return _v;case 5124:case 35670:return bv;case 35667:case 35671:return Sv;case 35668:case 35672:return yv;case 35669:case 35673:return wv;case 5125:return Ev;case 36294:return Av;case 36295:return Tv;case 36296:return Rv;case 35678:case 36198:case 36298:case 36306:case 35682:return Cv;case 35679:case 36299:case 36307:return Lv;case 35680:case 36300:case 36308:case 36293:return Pv;case 36289:case 36303:case 36311:case 36292:return Dv}}function Nv(n,e){n.uniform1fv(this.addr,e)}function Ov(n,e){const t=lr(e,this.size,2);n.uniform2fv(this.addr,t)}function Fv(n,e){const t=lr(e,this.size,3);n.uniform3fv(this.addr,t)}function Uv(n,e){const t=lr(e,this.size,4);n.uniform4fv(this.addr,t)}function Bv(n,e){const t=lr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function kv(n,e){const t=lr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zv(n,e){const t=lr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hv(n,e){n.uniform1iv(this.addr,e)}function Gv(n,e){n.uniform2iv(this.addr,e)}function Wv(n,e){n.uniform3iv(this.addr,e)}function Vv(n,e){n.uniform4iv(this.addr,e)}function Yv(n,e){n.uniform1uiv(this.addr,e)}function Xv(n,e){n.uniform2uiv(this.addr,e)}function Kv(n,e){n.uniform3uiv(this.addr,e)}function qv(n,e){n.uniform4uiv(this.addr,e)}function $v(n,e,t){const i=this.cache,s=e.length,r=so(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=$l:a=bd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Zv(n,e,t){const i=this.cache,s=e.length,r=so(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yd,r[a])}function Jv(n,e,t){const i=this.cache,s=e.length,r=so(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||wd,r[a])}function Qv(n,e,t){const i=this.cache,s=e.length,r=so(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sd,r[a])}function jv(n){switch(n){case 5126:return Nv;case 35664:return Ov;case 35665:return Fv;case 35666:return Uv;case 35674:return Bv;case 35675:return kv;case 35676:return zv;case 5124:case 35670:return Hv;case 35667:case 35671:return Gv;case 35668:case 35672:return Wv;case 35669:case 35673:return Vv;case 5125:return Yv;case 36294:return Xv;case 36295:return Kv;case 36296:return qv;case 35678:case 36198:case 36298:case 36306:case 35682:return $v;case 35679:case 36299:case 36307:return Zv;case 35680:case 36300:case 36308:case 36293:return Jv;case 36289:case 36303:case 36311:case 36292:return Qv}}class e_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Iv(t.type)}}class t_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jv(t.type)}}class n_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Yh(n,e){n.seq.push(e),n.map[e.id]=e}function i_(n,e,t){const i=n.name,s=i.length;for(Xo.lastIndex=0;;){const r=Xo.exec(i),a=Xo.lastIndex;let o=r[1];const h=r[2]==="]",c=r[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===s){Yh(t,c===void 0?new e_(o,n,e):new t_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new n_(o),Yh(t,f)),t=f}}}class La{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);i_(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Xh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const s_=37297;let r_=0;function a_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Kh=new Ze;function o_(n){at._getMatrix(Kh,at.workingColorSpace,n);const e=`mat3( ${Kh.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case ka:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function qh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+a_(n.getShaderSource(e),o)}else return r}function l_(n,e){const t=o_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const c_={[Wu]:"Linear",[Vu]:"Reinhard",[Yu]:"Cineon",[Xu]:"ACESFilmic",[qu]:"AgX",[$u]:"Neutral",[Ku]:"Custom"};function h_(n,e){const t=c_[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ga=new X;function u_(){at.getLuminanceCoefficients(ga);const n=ga.x.toFixed(4),e=ga.y.toFixed(4),t=ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function f_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function p_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ar(n){return n!==""}function $h(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zl(n){return n.replace(m_,x_)}const g_=new Map;function x_(n,e){let t=nt[e];if(t===void 0){const i=g_.get(e);if(i!==void 0)t=nt[i],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Zl(t)}const M_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(n){return n.replace(M_,v_)}function v_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const __={[Ea]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function b_(n){return __[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const S_={[bs]:"ENVMAP_TYPE_CUBE",[er]:"ENVMAP_TYPE_CUBE",[no]:"ENVMAP_TYPE_CUBE_UV"};function y_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":S_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const w_={[er]:"ENVMAP_MODE_REFRACTION"};function E_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":w_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const A_={[Gu]:"ENVMAP_BLENDING_MULTIPLY",[f1]:"ENVMAP_BLENDING_MIX",[p1]:"ENVMAP_BLENDING_ADD"};function T_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":A_[n.combine]||"ENVMAP_BLENDING_NONE"}function R_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function C_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=b_(t),c=y_(t),d=E_(t),f=T_(t),u=R_(t),p=d_(t),m=f_(r),M=s.createProgram();let x,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ar).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ar).join(`
`),g.length>0&&(g+=`
`)):(x=[Qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),g=[Qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?nt.tonemapping_pars_fragment:"",t.toneMapping!==yi?h_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,l_("linearToOutputTexel",t.outputColorSpace),u_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ar).join(`
`)),a=Zl(a),a=$h(a,t),a=Zh(a,t),o=Zl(o),o=$h(o,t),o=Zh(o,t),a=Jh(a),o=Jh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=v+x+a,S=v+g+o,E=Xh(s,s.VERTEX_SHADER,y),b=Xh(s,s.FRAGMENT_SHADER,S);s.attachShader(M,E),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(R){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(M)||"",N=s.getShaderInfoLog(E)||"",I=s.getShaderInfoLog(b)||"",F=P.trim(),G=N.trim(),q=I.trim();let se=!0,k=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(se=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,b);else{const ee=qh(s,E,"vertex"),U=qh(s,b,"fragment");dt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+ee+`
`+U)}else F!==""?Xe("WebGLProgram: Program Info Log:",F):(G===""||q==="")&&(k=!1);k&&(R.diagnostics={runnable:se,programLog:F,vertexShader:{log:G,prefix:x},fragmentShader:{log:q,prefix:g}})}s.deleteShader(E),s.deleteShader(b),_=new La(s,M),w=p_(s,M)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(M,s_)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=b,this}let L_=0;class P_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new D_(e),t.set(e,i)),i}}class D_{constructor(e){this.id=L_++,this.code=e,this.usedTimes=0}}function I_(n){return n===Ss||n===Ua||n===Ba}function N_(n,e,t,i,s,r){const a=new ad,o=new P_,h=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,w,L,R,P,N){const I=R.fog,F=P.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,q=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,se=e.get(_.envMap||G,q),k=se&&se.mapping===no?se.image.height:null,ee=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Xe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const U=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Q=U!==void 0?U.length:0;let le=0;F.morphAttributes.position!==void 0&&(le=1),F.morphAttributes.normal!==void 0&&(le=2),F.morphAttributes.color!==void 0&&(le=3);let _e,ne,re,z;if(ee){const Pt=xi[ee];_e=Pt.vertexShader,ne=Pt.fragmentShader}else{_e=_.vertexShader,ne=_.fragmentShader;const Pt=o.getVertexShaderStage(_),mt=o.getFragmentShaderStage(_);o.update(_,Pt,mt),re=Pt.id,z=mt.id}const K=n.getRenderTarget(),B=n.state.buffers.depth.getReversed(),oe=P.isInstancedMesh===!0,ae=P.isBatchedMesh===!0,ve=!!_.map,ge=!!_.matcap,ue=!!se,xe=!!_.aoMap,Se=!!_.lightMap,Ie=!!_.bumpMap&&_.wireframe===!1,$e=!!_.normalMap,Rt=!!_.displacementMap,Nt=!!_.emissiveMap,wt=!!_.metalnessMap,Ct=!!_.roughnessMap,V=_.anisotropy>0,et=_.clearcoat>0,Ye=_.dispersion>0,O=_.retroreflectivity>0,T=_.iridescence>0,H=_.sheen>0,$=_.transmission>0,j=V&&!!_.anisotropyMap,me=et&&!!_.clearcoatMap,Me=et&&!!_.clearcoatNormalMap,ie=et&&!!_.clearcoatRoughnessMap,ce=T&&!!_.iridescenceMap,be=T&&!!_.iridescenceThicknessMap,Fe=H&&!!_.sheenColorMap,Ae=H&&!!_.sheenRoughnessMap,ye=!!_.specularMap,ke=!!_.specularColorMap,Ve=!!_.specularIntensityMap,Je=$&&!!_.transmissionMap,Y=$&&!!_.thicknessMap,we=!!_.gradientMap,he=!!_.alphaMap,Ee=_.alphaTest>0,Le=!!_.alphaHash,de=!!_.extensions;let He=yi;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(He=n.toneMapping);const Ue={shaderID:ee,shaderType:_.type,shaderName:_.name,vertexShader:_e,fragmentShader:ne,defines:_.defines,customVertexShaderID:re,customFragmentShaderID:z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ae,batchingColor:ae&&P._colorsTexture!==null,instancing:oe,instancingColor:oe&&P.instanceColor!==null,instancingMorph:oe&&P.morphTexture!==null,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ve,matcap:ge,envMap:ue,envMapMode:ue&&se.mapping,envMapCubeUVHeight:k,aoMap:xe,lightMap:Se,bumpMap:Ie,normalMap:$e,displacementMap:Rt,emissiveMap:Nt,normalMapObjectSpace:$e&&_.normalMapType===x1,normalMapTangentSpace:$e&&_.normalMapType===ah,packedNormalMap:$e&&_.normalMapType===ah&&I_(_.normalMap.format),metalnessMap:wt,roughnessMap:Ct,anisotropy:V,anisotropyMap:j,clearcoat:et,clearcoatMap:me,clearcoatNormalMap:Me,clearcoatRoughnessMap:ie,dispersion:Ye,retroreflection:O,iridescence:T,iridescenceMap:ce,iridescenceThicknessMap:be,sheen:H,sheenColorMap:Fe,sheenRoughnessMap:Ae,specularMap:ye,specularColorMap:ke,specularIntensityMap:Ve,transmission:$,transmissionMap:Je,thicknessMap:Y,gradientMap:we,opaque:_.transparent===!1&&_.blending===qs&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:Ee,alphaHash:Le,combine:_.combine,mapUv:ve&&m(_.map.channel),aoMapUv:xe&&m(_.aoMap.channel),lightMapUv:Se&&m(_.lightMap.channel),bumpMapUv:Ie&&m(_.bumpMap.channel),normalMapUv:$e&&m(_.normalMap.channel),displacementMapUv:Rt&&m(_.displacementMap.channel),emissiveMapUv:Nt&&m(_.emissiveMap.channel),metalnessMapUv:wt&&m(_.metalnessMap.channel),roughnessMapUv:Ct&&m(_.roughnessMap.channel),anisotropyMapUv:j&&m(_.anisotropyMap.channel),clearcoatMapUv:me&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:Me&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(_.sheenRoughnessMap.channel),specularMapUv:ye&&m(_.specularMap.channel),specularColorMapUv:ke&&m(_.specularColorMap.channel),specularIntensityMapUv:Ve&&m(_.specularIntensityMap.channel),transmissionMapUv:Je&&m(_.transmissionMap.channel),thicknessMapUv:Y&&m(_.thicknessMap.channel),alphaMapUv:he&&m(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&($e||V),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!F.attributes.uv&&(ve||he),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&$e===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:B,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:le,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:ve&&_.map.isVideoTexture===!0&&at.getTransfer(_.map.colorSpace)===St,decodeVideoTextureEmissive:Nt&&_.emissiveMap.isVideoTexture===!0&&at.getTransfer(_.emissiveMap.colorSpace)===St,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ni,flipSided:_.side===Pn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:de&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&_.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ue.vertexUv1s=h.has(1),Ue.vertexUv2s=h.has(2),Ue.vertexUv3s=h.has(3),h.clear(),Ue}function x(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(g(w,_),v(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function g(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function v(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function y(_){const w=p[_.type];let L;if(w){const R=xi[w];L=n2.clone(R.uniforms)}else L=_.uniforms;return L}function S(_,w){let L=d.get(w);return L!==void 0?++L.usedTimes:(L=new C_(n,w,_,s),c.push(L),d.set(w,L)),L}function E(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:y,acquireProgram:S,releaseProgram:E,releaseShaderCache:b,programs:c,dispose:A}}function O_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function F_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function jh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function eu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,x,g){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:x,group:g},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=x,v.group=g),e++,v}function h(u,p,m,M,x,g,v){v.reversedDepth===!0&&(x=-x);const y=o(u,p,m,M,x,g);m.transmission>0?i.push(y):m.transparent===!0?s.push(y):t.push(y)}function c(u,p,m,M,x,g){const v=o(u,p,m,M,x,g);m.transmission>0?i.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function d(u,p){t.length>1&&t.sort(u||F_),i.length>1&&i.sort(p||jh),s.length>1&&s.sort(p||jh)}function f(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:c,finish:f,sort:d}}function U_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new eu,n.set(i,[a])):s>=r.length?(a=new eu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function B_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new it};break;case"SpotLight":t={position:new X,direction:new X,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function k_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let z_=0;function H_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function G_(n){const e=new B_,t=k_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);const s=new X,r=new zt,a=new zt;function o(c){let d=0,f=0,u=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let p=0,m=0,M=0,x=0,g=0,v=0,y=0,S=0,E=0,b=0,A=0,_=0,w=0,L=0;c.sort(H_);for(let P=0,N=c.length;P<N;P++){const I=c[P],F=I.color,G=I.intensity,q=I.distance;let se=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ss?se=I.shadow.map.texture:se=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=F.r*G,f+=F.g*G,u+=F.b*G;else if(I.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(I.sh.coefficients[k],G);L++}else if(I.isSunLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,U=t.get(I);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[m]=U,i.sunShadowMap[m]=se;const Q=ee.getViewportCount();for(let le=0;le<Q;le++)i.sunShadowMatrix[M+le]=ee.getMatrix(le),i.sunShadowCascade[M+le]=ee._cascadeData[le];M+=Q,m++}i.sun[p]=k,p++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,U=t.get(I);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,i.directionalShadow[x]=U,i.directionalShadowMap[x]=se,i.directionalShadowMatrix[x]=I.shadow.matrix,E++}i.directional[x]=k,x++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(F).multiplyScalar(G),k.distance=q,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,i.spot[v]=k;const ee=I.shadow;if(I.map&&(i.spotLightMap[_]=I.map,_++,ee.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[v]=ee.matrix,I.castShadow){const U=t.get(I);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,i.spotShadow[v]=U,i.spotShadowMap[v]=se,A++}v++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(F).multiplyScalar(G),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),i.rectArea[y]=k,y++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const ee=I.shadow,U=t.get(I);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,U.shadowCameraNear=ee.camera.near,U.shadowCameraFar=ee.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=se,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=k,g++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(G),k.groundColor.copy(I.groundColor).multiplyScalar(G),i.hemi[S]=k,S++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const R=i.hash;(R.sunLength!==p||R.directionalLength!==x||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==y||R.hemiLength!==S||R.numSunShadows!==m||R.numDirectionalShadows!==E||R.numPointShadows!==b||R.numSpotShadows!==A||R.numSpotMaps!==_||R.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=x,i.spot.length=v,i.rectArea.length=y,i.point.length=g,i.hemi.length=S,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-w,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=L,R.sunLength=p,R.directionalLength=x,R.pointLength=g,R.spotLength=v,R.rectAreaLength=y,R.hemiLength=S,R.numSunShadows=m,R.numDirectionalShadows=E,R.numPointShadows=b,R.numSpotShadows=A,R.numSpotMaps=_,R.numLightProbes=L,i.version=z_++)}function h(c,d){let f=0,u=0,p=0,m=0,M=0,x=0;const g=d.matrixWorldInverse;for(let v=0,y=c.length;v<y;v++){const S=c[v];if(S.isSunLight){const E=i.sun[f];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(g),f++}else if(S.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),u++}else if(S.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(S.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(S.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(g),p++}else if(S.isHemisphereLight){const E=i.hemi[x];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(g),x++}}}return{setup:o,setupView:h,state:i}}function tu(n){const e=new G_(n),t=[],i=[],s=[];function r(u){f.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function W_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new tu(n),e.set(s,[o])):r>=a.length?(o=new tu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const V_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y_=`uniform sampler2D shadow_pass;
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
}`,X_=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],K_=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],nu=new zt,_r=new X,Ko=new X;function q_(n,e,t){let i=new Ga;const s=new Ke,r=new Ke,a=new rt,o=new a2,h=new o2,c={},d=t.maxTextureSize,f={[vs]:Pn,[Pn]:vs,[Ni]:Ni},u=new bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:V_,fragmentShader:Y_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new jt;m.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Kt(m,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let g=this.type;this.render=function(b,A,_){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||b.length===0)return;this.type===Jg&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ea);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),P=n.state;P.setBlending(Si),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const N=g!==this.type;N&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(F=>F.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,F=b.length;I<F;I++){const G=b[I],q=G.shadow;if(q===void 0){Xe("WebGLShadowMap:",G,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const se=q.getFrameExtents();s.multiply(se),r.copy(q.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/se.x),s.x=r.x*se.x,q.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/se.y),s.y=r.y*se.y,q.mapSize.y=r.y));const k=n.state.buffers.depth.getReversed();if(q.camera._reversedDepth=k,q.map===null||N===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Er){if(G.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new $n(s.x,s.y,{format:Ss,type:Ei,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),q.map.texture.name=G.name+".shadowMap",q.map.depthTexture=new tr(s.x,s.y,_i),q.map.depthTexture.name=G.name+".shadowMapDepth",q.map.depthTexture.format=ki,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Yt,q.map.depthTexture.magFilter=Yt}else G.isPointLight?(q.map=new _d(s.x),q.map.depthTexture=new e2(s.x,wi)):(q.map=new $n(s.x,s.y),q.map.depthTexture=new tr(s.x,s.y,wi)),q.map.depthTexture.name=G.name+".shadowMap",q.map.depthTexture.format=ki,this.type===Ea?(q.map.depthTexture.compareFunction=k?yc:Sc,q.map.depthTexture.minFilter=Vt,q.map.depthTexture.magFilter=Vt):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Yt,q.map.depthTexture.magFilter=Yt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);const ee=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();G.isPointLight!==!0&&q.updateMatrices(G,_);for(let U=0;U<ee;U++){const Q=q.getCamera(U);if(G.isPointLight){const le=q.camera,_e=q.matrix,ne=G.distance||le.far;ne!==le.far&&(le.far=ne,le.updateProjectionMatrix()),_r.setFromMatrixPosition(G.matrixWorld),le.position.copy(_r),Ko.copy(le.position),Ko.add(X_[U]),le.up.copy(K_[U]),le.lookAt(Ko),le.updateMatrixWorld(),_e.makeTranslation(-_r.x,-_r.y,-_r.z),nu.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),q._frustum.setFromProjectionMatrix(nu,le.coordinateSystem,le.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)n.setRenderTarget(q.map,U),n.clear();else{U===0&&(n.setRenderTarget(q.map),n.clear());const le=q.getViewport(U);a.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),P.viewport(a)}i=q.getFrustum(U),S(A,_,Q,G,this.type)}q.isPointLightShadow!==!0&&this.type===Er&&v(q,_),q.needsUpdate=!1}g=this.type,x.needsUpdate=!1,n.setRenderTarget(w,L,R)};function v(b,A){const _=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new $n(s.x,s.y,{format:Ss,type:Ei}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,_,p,M,null)}function y(b,A,_,w){let L=null;const R=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)L=R;else if(L=_.isPointLight===!0?h:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const P=L.uuid,N=A.uuid;let I=c[P];I===void 0&&(I={},c[P]=I);let F=I[N];F===void 0&&(F=L.clone(),I[N]=F,A.addEventListener("dispose",E)),L=F}if(L.visible=A.visible,L.wireframe=A.wireframe,w===Er?L.side=A.shadowSide!==null?A.shadowSide:A.side:L.side=A.shadowSide!==null?A.shadowSide:f[A.side],L.alphaMap=A.alphaMap,L.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,L.map=A.map,L.clipShadows=A.clipShadows,L.clippingPlanes=A.clippingPlanes,L.clipIntersection=A.clipIntersection,L.displacementMap=A.displacementMap,L.displacementScale=A.displacementScale,L.displacementBias=A.displacementBias,L.wireframeLinewidth=A.wireframeLinewidth,L.linewidth=A.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const P=n.properties.get(L);P.light=_}return L}function S(b,A,_,w,L){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&L===Er)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const N=e.update(b),I=b.material;if(Array.isArray(I)){const F=N.groups;for(let G=0,q=F.length;G<q;G++){const se=F[G],k=I[se.materialIndex];if(k&&k.visible){const ee=y(b,k,w,L);b.onBeforeShadow(n,b,A,_,N,ee,se),n.renderBufferDirect(_,null,N,ee,b,se),b.onAfterShadow(n,b,A,_,N,ee,se)}}}else if(I.visible){const F=y(b,I,w,L);b.onBeforeShadow(n,b,A,_,N,F,null),n.renderBufferDirect(_,null,N,F,b,null),b.onAfterShadow(n,b,A,_,N,F,null)}}const P=b.children;for(let N=0,I=P.length;N<I;N++)S(P[N],A,_,w,L)}function E(b){b.target.removeEventListener("dispose",E);for(const _ in c){const w=c[_],L=b.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function $_(n,e){function t(){let Y=!1;const we=new rt;let he=null;const Ee=new rt(0,0,0,0);return{setMask:function(Le){he!==Le&&!Y&&(n.colorMask(Le,Le,Le,Le),he=Le)},setLocked:function(Le){Y=Le},setClear:function(Le,de,He,Ue,Pt){Pt===!0&&(Le*=Ue,de*=Ue,He*=Ue),we.set(Le,de,He,Ue),Ee.equals(we)===!1&&(n.clearColor(Le,de,He,Ue),Ee.copy(we))},reset:function(){Y=!1,he=null,Ee.set(-1,0,0,0)}}}function i(){let Y=!1,we=!1,he=null,Ee=null,Le=null;return{setReversed:function(de){if(we!==de){const He=e.get("EXT_clip_control");de?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),we=de;const Ue=Le;Le=null,this.setClear(Ue)}},getReversed:function(){return we},setTest:function(de){de?K(n.DEPTH_TEST):B(n.DEPTH_TEST)},setMask:function(de){he!==de&&!Y&&(n.depthMask(de),he=de)},setFunc:function(de){if(we&&(de=C1[de]),Ee!==de){switch(de){case hl:n.depthFunc(n.NEVER);break;case ul:n.depthFunc(n.ALWAYS);break;case dl:n.depthFunc(n.LESS);break;case Lr:n.depthFunc(n.LEQUAL);break;case fl:n.depthFunc(n.EQUAL);break;case pl:n.depthFunc(n.GEQUAL);break;case Oa:n.depthFunc(n.GREATER);break;case ml:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=de}},setLocked:function(de){Y=de},setClear:function(de){Le!==de&&(Le=de,we&&(de=1-de),n.clearDepth(de))},reset:function(){Y=!1,he=null,Ee=null,Le=null,we=!1}}}function s(){let Y=!1,we=null,he=null,Ee=null,Le=null,de=null,He=null,Ue=null,Pt=null;return{setTest:function(mt){Y||(mt?K(n.STENCIL_TEST):B(n.STENCIL_TEST))},setMask:function(mt){we!==mt&&!Y&&(n.stencilMask(mt),we=mt)},setFunc:function(mt,Jn,ci){(he!==mt||Ee!==Jn||Le!==ci)&&(n.stencilFunc(mt,Jn,ci),he=mt,Ee=Jn,Le=ci)},setOp:function(mt,Jn,ci){(de!==mt||He!==Jn||Ue!==ci)&&(n.stencilOp(mt,Jn,ci),de=mt,He=Jn,Ue=ci)},setLocked:function(mt){Y=mt},setClear:function(mt){Pt!==mt&&(n.clearStencil(mt),Pt=mt)},reset:function(){Y=!1,we=null,he=null,Ee=null,Le=null,de=null,He=null,Ue=null,Pt=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,c=new WeakMap;let d={},f={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,y=null,S=null,E=null,b=null,A=null,_=new it(0,0,0),w=0,L=!1,R=null,P=null,N=null,I=null,F=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,se=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(k)[1]),q=se>=1):k.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),q=se>=2);let ee=null,U={};const Q=n.getParameter(n.SCISSOR_BOX),le=n.getParameter(n.VIEWPORT),_e=new rt().fromArray(Q),ne=new rt().fromArray(le);function re(Y,we,he,Ee){const Le=new Uint8Array(4),de=n.createTexture();n.bindTexture(Y,de),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let He=0;He<he;He++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(we,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,Le):n.texImage2D(we+He,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Le);return de}const z={};z[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),z[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),z[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(n.DEPTH_TEST),a.setFunc(Lr),Ie(!1),$e(ih),K(n.CULL_FACE),xe(Si);function K(Y){d[Y]!==!0&&(n.enable(Y),d[Y]=!0)}function B(Y){d[Y]!==!1&&(n.disable(Y),d[Y]=!1)}function oe(Y,we){return u[Y]!==we?(n.bindFramebuffer(Y,we),u[Y]=we,Y===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=we),Y===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=we),!0):!1}function ae(Y,we){let he=m,Ee=!1;if(Y){he=p.get(we),he===void 0&&(he=[],p.set(we,he));const Le=Y.textures;if(he.length!==Le.length||he[0]!==n.COLOR_ATTACHMENT0){for(let de=0,He=Le.length;de<He;de++)he[de]=n.COLOR_ATTACHMENT0+de;he.length=Le.length,Ee=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(he)}function ve(Y){return M!==Y?(n.useProgram(Y),M=Y,!0):!1}const ge={[Gs]:n.FUNC_ADD,[Qg]:n.FUNC_SUBTRACT,[jg]:n.FUNC_REVERSE_SUBTRACT};ge[e1]=n.MIN,ge[t1]=n.MAX;const ue={[dc]:n.ZERO,[n1]:n.ONE,[fc]:n.SRC_COLOR,[pc]:n.SRC_ALPHA,[l1]:n.SRC_ALPHA_SATURATE,[a1]:n.DST_COLOR,[s1]:n.DST_ALPHA,[i1]:n.ONE_MINUS_SRC_COLOR,[mc]:n.ONE_MINUS_SRC_ALPHA,[o1]:n.ONE_MINUS_DST_COLOR,[r1]:n.ONE_MINUS_DST_ALPHA,[c1]:n.CONSTANT_COLOR,[h1]:n.ONE_MINUS_CONSTANT_COLOR,[u1]:n.CONSTANT_ALPHA,[d1]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(Y,we,he,Ee,Le,de,He,Ue,Pt,mt){if(Y===Si){x===!0&&(B(n.BLEND),x=!1);return}if(x===!1&&(K(n.BLEND),x=!0),Y!==to){if(Y!==g||mt!==L){if((v!==Gs||E!==Gs)&&(n.blendEquation(n.FUNC_ADD),v=Gs,E=Gs),mt)switch(Y){case qs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _s:n.blendFunc(n.ONE,n.ONE);break;case sh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:dt("WebGLState: Invalid blending: ",Y);break}else switch(Y){case qs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _s:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case sh:dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rh:dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:dt("WebGLState: Invalid blending: ",Y);break}y=null,S=null,b=null,A=null,_.set(0,0,0),w=0,g=Y,L=mt}return}Le=Le||we,de=de||he,He=He||Ee,(we!==v||Le!==E)&&(n.blendEquationSeparate(ge[we],ge[Le]),v=we,E=Le),(he!==y||Ee!==S||de!==b||He!==A)&&(n.blendFuncSeparate(ue[he],ue[Ee],ue[de],ue[He]),y=he,S=Ee,b=de,A=He),(Ue.equals(_)===!1||Pt!==w)&&(n.blendColor(Ue.r,Ue.g,Ue.b,Pt),_.copy(Ue),w=Pt),g=Y,L=!1}function Se(Y,we){Y.side===Ni?B(n.CULL_FACE):K(n.CULL_FACE);let he=Y.side===Pn;we&&(he=!he),Ie(he),Y.blending===qs&&Y.transparent===!1?xe(Si):xe(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);const Ee=Y.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Nt(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):B(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(Y){R!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),R=Y)}function $e(Y){Y!==$g?(K(n.CULL_FACE),Y!==P&&(Y===ih?n.cullFace(n.BACK):Y===Zg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):B(n.CULL_FACE),P=Y}function Rt(Y){Y!==N&&(q&&n.lineWidth(Y),N=Y)}function Nt(Y,we,he){Y?(K(n.POLYGON_OFFSET_FILL),(I!==we||F!==he)&&(I=we,F=he,a.getReversed()&&(we=-we),n.polygonOffset(we,he))):B(n.POLYGON_OFFSET_FILL)}function wt(Y){Y?K(n.SCISSOR_TEST):B(n.SCISSOR_TEST)}function Ct(Y){Y===void 0&&(Y=n.TEXTURE0+G-1),ee!==Y&&(n.activeTexture(Y),ee=Y)}function V(Y,we,he){he===void 0&&(ee===null?he=n.TEXTURE0+G-1:he=ee);let Ee=U[he];Ee===void 0&&(Ee={type:void 0,texture:void 0},U[he]=Ee),(Ee.type!==Y||Ee.texture!==we)&&(ee!==he&&(n.activeTexture(he),ee=he),n.bindTexture(Y,we||z[Y]),Ee.type=Y,Ee.texture=we)}function et(){const Y=U[ee];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ye(){try{n.compressedTexImage2D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function T(){try{n.texSubImage2D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function H(){try{n.texSubImage3D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function j(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function me(){try{n.texStorage2D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function Me(){try{n.texStorage3D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function ie(){try{n.texImage2D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function ce(){try{n.texImage3D(...arguments)}catch(Y){dt("WebGLState:",Y)}}function be(Y){return f[Y]!==void 0?f[Y]:n.getParameter(Y)}function Fe(Y,we){f[Y]!==we&&(n.pixelStorei(Y,we),f[Y]=we)}function Ae(Y){_e.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),_e.copy(Y))}function ye(Y){ne.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),ne.copy(Y))}function ke(Y,we){let he=c.get(we);he===void 0&&(he=new WeakMap,c.set(we,he));let Ee=he.get(Y);Ee===void 0&&(Ee=n.getUniformBlockIndex(we,Y.name),he.set(Y,Ee))}function Ve(Y,we){const Ee=c.get(we).get(Y);h.get(we)!==Ee&&(n.uniformBlockBinding(we,Ee,Y.__bindingPointIndex),h.set(we,Ee))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ee=null,U={},u={},p=new WeakMap,m=[],M=null,x=!1,g=null,v=null,y=null,S=null,E=null,b=null,A=null,_=new it(0,0,0),w=0,L=!1,R=null,P=null,N=null,I=null,F=null,_e.set(0,0,n.canvas.width,n.canvas.height),ne.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:B,bindFramebuffer:oe,drawBuffers:ae,useProgram:ve,setBlending:xe,setMaterial:Se,setFlipSided:Ie,setCullFace:$e,setLineWidth:Rt,setPolygonOffset:Nt,setScissorTest:wt,activeTexture:Ct,bindTexture:V,unbindTexture:et,compressedTexImage2D:Ye,compressedTexImage3D:O,texImage2D:ie,texImage3D:ce,pixelStorei:Fe,getParameter:be,updateUBOMapping:ke,uniformBlockBinding:Ve,texStorage2D:me,texStorage3D:Me,texSubImage2D:T,texSubImage3D:H,compressedTexSubImage2D:$,compressedTexSubImage3D:j,scissor:Ae,viewport:ye,reset:Je}}function Z_(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ke,d=new WeakMap,f=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(O,T){return m?new OffscreenCanvas(O,T):Ha("canvas")}function x(O,T,H){let $=1;const j=Ye(O);if((j.width>H||j.height>H)&&($=H/Math.max(j.width,j.height)),$<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const me=Math.floor($*j.width),Me=Math.floor($*j.height);u===void 0&&(u=M(me,Me));const ie=T?M(me,Me):u;return ie.width=me,ie.height=Me,ie.getContext("2d").drawImage(O,0,0,me,Me),Xe("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+me+"x"+Me+")."),ie}else return"data"in O&&Xe("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),O;return O}function g(O){return O.generateMipmaps}function v(O){n.generateMipmap(O)}function y(O){return O.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?n.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(O,T,H,$,j,me=!1){if(O!==null){if(n[O]!==void 0)return n[O];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Me;$&&(Me=e.get("EXT_texture_norm16"),Me||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=T;if(T===n.RED&&(H===n.FLOAT&&(ie=n.R32F),H===n.HALF_FLOAT&&(ie=n.R16F),H===n.UNSIGNED_BYTE&&(ie=n.R8),H===n.UNSIGNED_SHORT&&Me&&(ie=Me.R16_EXT),H===n.SHORT&&Me&&(ie=Me.R16_SNORM_EXT)),T===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(ie=n.R8UI),H===n.UNSIGNED_SHORT&&(ie=n.R16UI),H===n.UNSIGNED_INT&&(ie=n.R32UI),H===n.BYTE&&(ie=n.R8I),H===n.SHORT&&(ie=n.R16I),H===n.INT&&(ie=n.R32I)),T===n.RG&&(H===n.FLOAT&&(ie=n.RG32F),H===n.HALF_FLOAT&&(ie=n.RG16F),H===n.UNSIGNED_BYTE&&(ie=n.RG8),H===n.UNSIGNED_SHORT&&Me&&(ie=Me.RG16_EXT),H===n.SHORT&&Me&&(ie=Me.RG16_SNORM_EXT)),T===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(ie=n.RG8UI),H===n.UNSIGNED_SHORT&&(ie=n.RG16UI),H===n.UNSIGNED_INT&&(ie=n.RG32UI),H===n.BYTE&&(ie=n.RG8I),H===n.SHORT&&(ie=n.RG16I),H===n.INT&&(ie=n.RG32I)),T===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),H===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),H===n.UNSIGNED_INT&&(ie=n.RGB32UI),H===n.BYTE&&(ie=n.RGB8I),H===n.SHORT&&(ie=n.RGB16I),H===n.INT&&(ie=n.RGB32I)),T===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),H===n.UNSIGNED_INT&&(ie=n.RGBA32UI),H===n.BYTE&&(ie=n.RGBA8I),H===n.SHORT&&(ie=n.RGBA16I),H===n.INT&&(ie=n.RGBA32I)),T===n.RGB&&(H===n.UNSIGNED_SHORT&&Me&&(ie=Me.RGB16_EXT),H===n.SHORT&&Me&&(ie=Me.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(ie=n.R11F_G11F_B10F)),T===n.RGBA){const ce=me?ka:at.getTransfer(j);H===n.FLOAT&&(ie=n.RGBA32F),H===n.HALF_FLOAT&&(ie=n.RGBA16F),H===n.UNSIGNED_BYTE&&(ie=ce===St?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&Me&&(ie=Me.RGBA16_EXT),H===n.SHORT&&Me&&(ie=Me.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function E(O,T){let H;return O?T===null||T===wi||T===Dr?H=n.DEPTH24_STENCIL8:T===_i?H=n.DEPTH32F_STENCIL8:T===Pr&&(H=n.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===wi||T===Dr?H=n.DEPTH_COMPONENT24:T===_i?H=n.DEPTH_COMPONENT32F:T===Pr&&(H=n.DEPTH_COMPONENT16),H}function b(O,T){return g(O)===!0||O.isFramebufferTexture&&O.minFilter!==Yt&&O.minFilter!==Vt?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function A(O){const T=O.target;T.removeEventListener("dispose",A),w(T),T.isVideoTexture&&d.delete(T),T.isHTMLTexture&&f.delete(T)}function _(O){const T=O.target;T.removeEventListener("dispose",_),R(T)}function w(O){const T=i.get(O);if(T.__webglInit===void 0)return;const H=O.source,$=p.get(H);if($){const j=$[T.__cacheKey];j.usedTimes--,j.usedTimes===0&&L(O),Object.keys($).length===0&&p.delete(H)}i.remove(O)}function L(O){const T=i.get(O);n.deleteTexture(T.__webglTexture);const H=O.source,$=p.get(H);delete $[T.__cacheKey],a.memory.textures--}function R(O){const T=i.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),i.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(T.__webglFramebuffer[$]))for(let j=0;j<T.__webglFramebuffer[$].length;j++)n.deleteFramebuffer(T.__webglFramebuffer[$][j]);else n.deleteFramebuffer(T.__webglFramebuffer[$]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[$])}else{if(Array.isArray(T.__webglFramebuffer))for(let $=0;$<T.__webglFramebuffer.length;$++)n.deleteFramebuffer(T.__webglFramebuffer[$]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let $=0;$<T.__webglColorRenderbuffer.length;$++)T.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[$]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=O.textures;for(let $=0,j=H.length;$<j;$++){const me=i.get(H[$]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(H[$])}i.remove(O)}let P=0;function N(){P=0}function I(){return P}function F(O){P=O}function G(){const O=P;return O>=s.maxTextures&&Xe("WebGLTextures: Trying to use "+(O+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,O}function q(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function se(O,T){const H=i.get(O);if(O.isVideoTexture&&V(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&H.__version!==O.version){const $=O.image;if($===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{B(H,O,T);return}}else O.isExternalTexture&&(H.__webglTexture=O.sourceTexture?O.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+T)}function k(O,T){const H=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&H.__version!==O.version){B(H,O,T);return}else O.isExternalTexture&&(H.__webglTexture=O.sourceTexture?O.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+T)}function ee(O,T){const H=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&H.__version!==O.version){B(H,O,T);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+T)}function U(O,T){const H=i.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&H.__version!==O.version){oe(H,O,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+T)}const Q={[Fa]:n.REPEAT,[Oi]:n.CLAMP_TO_EDGE,[gl]:n.MIRRORED_REPEAT},le={[Yt]:n.NEAREST,[m1]:n.NEAREST_MIPMAP_NEAREST,[Yr]:n.NEAREST_MIPMAP_LINEAR,[Vt]:n.LINEAR,[xo]:n.LINEAR_MIPMAP_NEAREST,[ms]:n.LINEAR_MIPMAP_LINEAR},_e={[v1]:n.NEVER,[w1]:n.ALWAYS,[_1]:n.LESS,[Sc]:n.LEQUAL,[b1]:n.EQUAL,[yc]:n.GEQUAL,[S1]:n.GREATER,[y1]:n.NOTEQUAL};function ne(O,T){if(T.type===_i&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Vt||T.magFilter===xo||T.magFilter===Yr||T.magFilter===ms||T.minFilter===Vt||T.minFilter===xo||T.minFilter===Yr||T.minFilter===ms)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(O,n.TEXTURE_WRAP_S,Q[T.wrapS]),n.texParameteri(O,n.TEXTURE_WRAP_T,Q[T.wrapT]),(O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY)&&n.texParameteri(O,n.TEXTURE_WRAP_R,Q[T.wrapR]),n.texParameteri(O,n.TEXTURE_MAG_FILTER,le[T.magFilter]),n.texParameteri(O,n.TEXTURE_MIN_FILTER,le[T.minFilter]),T.compareFunction&&(n.texParameteri(O,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(O,n.TEXTURE_COMPARE_FUNC,_e[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Yt||T.minFilter!==Yr&&T.minFilter!==ms||T.type===_i&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(O,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function re(O,T){let H=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",A));const $=T.source;let j=p.get($);j===void 0&&(j={},p.set($,j));const me=q(T);if(me!==O.__cacheKey){j[me]===void 0&&(j[me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),j[me].usedTimes++;const Me=j[O.__cacheKey];Me!==void 0&&(j[O.__cacheKey].usedTimes--,Me.usedTimes===0&&L(T)),O.__cacheKey=me,O.__webglTexture=j[me].texture}return H}function z(O,T,H){return Math.floor(Math.floor(O/H)/T)}function K(O,T,H,$){const me=O.updateRanges;if(me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,T.width,T.height,H,$,T.data);else{me.sort((Fe,Ae)=>Fe.start-Ae.start);let Me=0;for(let Fe=1;Fe<me.length;Fe++){const Ae=me[Me],ye=me[Fe],ke=Ae.start+Ae.count,Ve=z(ye.start,T.width,4),Je=z(Ae.start,T.width,4);ye.start<=ke+1&&Ve===Je&&z(ye.start+ye.count-1,T.width,4)===Ve?Ae.count=Math.max(Ae.count,ye.start+ye.count-Ae.start):(++Me,me[Me]=ye)}me.length=Me+1;const ie=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),be=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,T.width);for(let Fe=0,Ae=me.length;Fe<Ae;Fe++){const ye=me[Fe],ke=Math.floor(ye.start/4),Ve=Math.ceil(ye.count/4),Je=ke%T.width,Y=Math.floor(ke/T.width),we=Ve,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,Je,Y,we,he,H,$,T.data)}O.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ie),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function B(O,T,H){let $=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&($=n.TEXTURE_3D);const j=re(O,T),me=T.source;t.bindTexture($,O.__webglTexture,n.TEXTURE0+H);const Me=i.get(me);if(me.version!==Me.__version||j===!0){if(t.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const he=at.getPrimaries(at.workingColorSpace),Ee=T.colorSpace===Kn?null:at.getPrimaries(T.colorSpace),Le=T.colorSpace===Kn||he===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment);let ce=x(T.image,!1,s.maxTextureSize);ce=et(T,ce);const be=r.convert(T.format,T.colorSpace),Fe=r.convert(T.type);let Ae=S(T.internalFormat,be,Fe,T.normalized,T.colorSpace,T.isVideoTexture);ne($,T);let ye;const ke=T.mipmaps,Ve=T.isVideoTexture!==!0,Je=Me.__version===void 0||j===!0,Y=me.dataReady,we=b(T,ce);if(T.isDepthTexture)Ae=E(T.format===gs,T.type),Je&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,Ae,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ae,ce.width,ce.height,0,be,Fe,null));else if(T.isDataTexture)if(ke.length>0){Ve&&Je&&t.texStorage2D(n.TEXTURE_2D,we,Ae,ke[0].width,ke[0].height);for(let he=0,Ee=ke.length;he<Ee;he++)ye=ke[he],Ve?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,ye.width,ye.height,be,Fe,ye.data):t.texImage2D(n.TEXTURE_2D,he,Ae,ye.width,ye.height,0,be,Fe,ye.data);T.generateMipmaps=!1}else Ve?(Je&&t.texStorage2D(n.TEXTURE_2D,we,Ae,ce.width,ce.height),Y&&K(T,ce,be,Fe)):t.texImage2D(n.TEXTURE_2D,0,Ae,ce.width,ce.height,0,be,Fe,ce.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ve&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ae,ke[0].width,ke[0].height,ce.depth);for(let he=0,Ee=ke.length;he<Ee;he++)if(ye=ke[he],T.format!==Bn)if(be!==null)if(Ve){if(Y)if(T.layerUpdates.size>0){const Le=Nh(ye.width,ye.height,T.format,T.type);for(const de of T.layerUpdates){const He=ye.data.subarray(de*Le/ye.data.BYTES_PER_ELEMENT,(de+1)*Le/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,de,ye.width,ye.height,1,be,He)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,ye.width,ye.height,ce.depth,be,ye.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ae,ye.width,ye.height,ce.depth,0,ye.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,ye.width,ye.height,ce.depth,be,Fe,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ae,ye.width,ye.height,ce.depth,0,be,Fe,ye.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{Ve&&Je&&t.texStorage2D(n.TEXTURE_2D,we,Ae,ke[0].width,ke[0].height);for(let he=0,Ee=ke.length;he<Ee;he++)ye=ke[he],T.format!==Bn?be!==null?Ve?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,ye.width,ye.height,be,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ae,ye.width,ye.height,0,ye.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,ye.width,ye.height,be,Fe,ye.data):t.texImage2D(n.TEXTURE_2D,he,Ae,ye.width,ye.height,0,be,Fe,ye.data)}else if(T.isDataArrayTexture)if(Ve){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ae,ce.width,ce.height,ce.depth),Y)if(T.layerUpdates.size>0){const he=Nh(ce.width,ce.height,T.format,T.type);for(const Ee of T.layerUpdates){const Le=ce.data.subarray(Ee*he/ce.data.BYTES_PER_ELEMENT,(Ee+1)*he/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,ce.width,ce.height,1,be,Fe,Le)}T.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,be,Fe,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,ce.width,ce.height,ce.depth,0,be,Fe,ce.data);else if(T.isData3DTexture)Ve?(Je&&t.texStorage3D(n.TEXTURE_3D,we,Ae,ce.width,ce.height,ce.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,be,Fe,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,ce.width,ce.height,ce.depth,0,be,Fe,ce.data);else if(T.isFramebufferTexture){if(Je)if(Ve)t.texStorage2D(n.TEXTURE_2D,we,Ae,ce.width,ce.height);else{let he=ce.width,Ee=ce.height;for(let Le=0;Le<we;Le++)t.texImage2D(n.TEXTURE_2D,Le,Ae,he,Ee,0,be,Fe,null),he>>=1,Ee>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),ce.parentNode!==he){he.appendChild(ce),f.add(T),he.onpaint=Ee=>{const Le=Ee.changedElements;for(const de of f)Le.includes(de.image)&&(de.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{const Le=n.RGBA,de=n.RGBA,He=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Le,de,He,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ke.length>0){if(Ve&&Je){const he=Ye(ke[0]);t.texStorage2D(n.TEXTURE_2D,we,Ae,he.width,he.height)}for(let he=0,Ee=ke.length;he<Ee;he++)ye=ke[he],Ve?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,be,Fe,ye):t.texImage2D(n.TEXTURE_2D,he,Ae,be,Fe,ye);T.generateMipmaps=!1}else if(Ve){if(Je){const he=Ye(ce);t.texStorage2D(n.TEXTURE_2D,we,Ae,he.width,he.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,Fe,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ae,be,Fe,ce);g(T)&&v($),Me.__version=me.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function oe(O,T,H){if(T.image.length!==6)return;const $=re(O,T),j=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+H);const me=i.get(j);if(j.version!==me.__version||$===!0){t.activeTexture(n.TEXTURE0+H);const Me=at.getPrimaries(at.workingColorSpace),ie=T.colorSpace===Kn?null:at.getPrimaries(T.colorSpace),ce=T.colorSpace===Kn||Me===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const be=T.isCompressedTexture||T.image[0].isCompressedTexture,Fe=T.image[0]&&T.image[0].isDataTexture,Ae=[];for(let de=0;de<6;de++)!be&&!Fe?Ae[de]=x(T.image[de],!0,s.maxCubemapSize):Ae[de]=Fe?T.image[de].image:T.image[de],Ae[de]=et(T,Ae[de]);const ye=Ae[0],ke=r.convert(T.format,T.colorSpace),Ve=r.convert(T.type),Je=S(T.internalFormat,ke,Ve,T.normalized,T.colorSpace),Y=T.isVideoTexture!==!0,we=me.__version===void 0||$===!0,he=j.dataReady;let Ee=b(T,ye);ne(n.TEXTURE_CUBE_MAP,T);let Le;if(be){Y&&we&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Je,ye.width,ye.height);for(let de=0;de<6;de++){Le=Ae[de].mipmaps;for(let He=0;He<Le.length;He++){const Ue=Le[He];T.format!==Bn?ke!==null?Y?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,0,0,Ue.width,Ue.height,ke,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,Je,Ue.width,Ue.height,0,Ue.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,0,0,Ue.width,Ue.height,ke,Ve,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,Je,Ue.width,Ue.height,0,ke,Ve,Ue.data)}}}else{if(Le=T.mipmaps,Y&&we){Le.length>0&&Ee++;const de=Ye(Ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Je,de.width,de.height)}for(let de=0;de<6;de++)if(Fe){Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Ae[de].width,Ae[de].height,ke,Ve,Ae[de].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Je,Ae[de].width,Ae[de].height,0,ke,Ve,Ae[de].data);for(let He=0;He<Le.length;He++){const Pt=Le[He].image[de].image;Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,0,0,Pt.width,Pt.height,ke,Ve,Pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,Je,Pt.width,Pt.height,0,ke,Ve,Pt.data)}}else{Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,ke,Ve,Ae[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Je,ke,Ve,Ae[de]);for(let He=0;He<Le.length;He++){const Ue=Le[He];Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,0,0,ke,Ve,Ue.image[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,Je,ke,Ve,Ue.image[de])}}}g(T)&&v(n.TEXTURE_CUBE_MAP),me.__version=j.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function ae(O,T,H,$,j,me){const Me=r.convert(H.format,H.colorSpace),ie=r.convert(H.type),ce=S(H.internalFormat,Me,ie,H.normalized,H.colorSpace),be=i.get(T),Fe=i.get(H);if(Fe.__renderTarget=T,!be.__hasExternalTextures){const Ae=Math.max(1,T.width>>me),ye=Math.max(1,T.height>>me);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,me,ce,Ae,ye,T.depth,0,Me,ie,null):t.texImage2D(j,me,ce,Ae,ye,0,Me,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,O),Ct(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,j,Fe.__webglTexture,0,wt(T)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,j,Fe.__webglTexture,me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ve(O,T,H){if(n.bindRenderbuffer(n.RENDERBUFFER,O),T.depthBuffer){const $=T.depthTexture,j=$&&$.isDepthTexture?$.type:null,me=E(T.stencilBuffer,j),Me=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ct(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(T),me,T.width,T.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(T),me,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,me,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,O)}else{const $=T.textures;for(let j=0;j<$.length;j++){const me=$[j],Me=r.convert(me.format,me.colorSpace),ie=r.convert(me.type),ce=S(me.internalFormat,Me,ie,me.normalized,me.colorSpace);Ct(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,wt(T),ce,T.width,T.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,wt(T),ce,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,ce,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(O,T,H){const $=T.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const j=i.get(T.depthTexture);if(j.__renderTarget=T,(!j.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),$){if(j.__webglInit===void 0&&(j.__webglInit=!0,T.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),ne(n.TEXTURE_CUBE_MAP,T.depthTexture);const be=r.convert(T.depthTexture.format),Fe=r.convert(T.depthTexture.type);let Ae;T.depthTexture.format===ki?Ae=n.DEPTH_COMPONENT24:T.depthTexture.format===gs&&(Ae=n.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Ae,T.width,T.height,0,be,Fe,null)}}else se(T.depthTexture,0);const me=j.__webglTexture,Me=wt(T),ie=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,ce=T.depthTexture.format===gs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(T.depthTexture.format===ki)Ct(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,ie,me,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ce,ie,me,0);else if(T.depthTexture.format===gs)Ct(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,ie,me,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ce,ie,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ue(O){const T=i.get(O),H=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const $=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),$){const j=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,$.removeEventListener("dispose",j)};$.addEventListener("dispose",j),T.__depthDisposeCallback=j}T.__boundDepthTexture=$}if(O.depthTexture&&!T.__autoAllocateDepthBuffer)if(H)for(let $=0;$<6;$++)ge(T.__webglFramebuffer[$],O,$);else{const $=O.texture.mipmaps;$&&$.length>0?ge(T.__webglFramebuffer[0],O,0):ge(T.__webglFramebuffer,O,0)}else if(H){T.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[$]),T.__webglDepthbuffer[$]===void 0)T.__webglDepthbuffer[$]=n.createRenderbuffer(),ve(T.__webglDepthbuffer[$],O,!1);else{const j=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=T.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,me)}}else{const $=O.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),ve(T.__webglDepthbuffer,O,!1);else{const j=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function xe(O,T,H){const $=i.get(O);T!==void 0&&ae($.__webglFramebuffer,O,O.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&ue(O)}function Se(O){const T=O.texture,H=i.get(O),$=i.get(T);O.addEventListener("dispose",_);const j=O.textures,me=O.isWebGLCubeRenderTarget===!0,Me=j.length>1;if(Me||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=T.version,a.memory.textures++),me){H.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[ie]=[];for(let ce=0;ce<T.mipmaps.length;ce++)H.__webglFramebuffer[ie][ce]=n.createFramebuffer()}else H.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let ie=0;ie<T.mipmaps.length;ie++)H.__webglFramebuffer[ie]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Me)for(let ie=0,ce=j.length;ie<ce;ie++){const be=i.get(j[ie]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),a.memory.textures++)}if(O.samples>0&&Ct(O)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ie=0;ie<j.length;ie++){const ce=j[ie];H.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[ie]);const be=r.convert(ce.format,ce.colorSpace),Fe=r.convert(ce.type),Ae=S(ce.internalFormat,be,Fe,ce.normalized,ce.colorSpace,O.isXRRenderTarget===!0),ye=wt(O);n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Ae,O.width,O.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,H.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),O.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),ve(H.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(me){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ne(n.TEXTURE_CUBE_MAP,T);for(let ie=0;ie<6;ie++)if(T.mipmaps&&T.mipmaps.length>0)for(let ce=0;ce<T.mipmaps.length;ce++)ae(H.__webglFramebuffer[ie][ce],O,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ce);else ae(H.__webglFramebuffer[ie],O,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);g(T)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ie=0,ce=j.length;ie<ce;ie++){const be=j[ie],Fe=i.get(be);let Ae=n.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ae=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Fe.__webglTexture),ne(Ae,be),ae(H.__webglFramebuffer,O,be,n.COLOR_ATTACHMENT0+ie,Ae,0),g(be)&&v(Ae)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(ie=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,$.__webglTexture),ne(ie,T),T.mipmaps&&T.mipmaps.length>0)for(let ce=0;ce<T.mipmaps.length;ce++)ae(H.__webglFramebuffer[ce],O,T,n.COLOR_ATTACHMENT0,ie,ce);else ae(H.__webglFramebuffer,O,T,n.COLOR_ATTACHMENT0,ie,0);g(T)&&v(ie),t.unbindTexture()}O.depthBuffer&&ue(O)}function Ie(O){const T=O.textures;for(let H=0,$=T.length;H<$;H++){const j=T[H];if(g(j)){const me=y(O),Me=i.get(j).__webglTexture;t.bindTexture(me,Me),v(me),t.unbindTexture()}}}const $e=[],Rt=[];function Nt(O){if(O.samples>0){if(Ct(O)===!1){const T=O.textures,H=O.width,$=O.height;let j=n.COLOR_BUFFER_BIT;const me=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(O),ie=T.length>1;if(ie)for(let be=0;be<T.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const ce=O.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let be=0;be<T.length;be++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[be]);const Fe=i.get(T[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Fe,0)}n.blitFramebuffer(0,0,H,$,0,0,H,$,j,n.NEAREST),h===!0&&($e.length=0,Rt.length=0,$e.push(n.COLOR_ATTACHMENT0+be),O.depthBuffer&&O.storeMultisampledDepthBuffer===!1&&($e.push(me),Rt.push(me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Rt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,$e))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let be=0;be<T.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Me.__webglColorRenderbuffer[be]);const Fe=i.get(T[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,Fe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.storeMultisampledDepthBuffer===!1&&h){const T=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function wt(O){return Math.min(s.maxSamples,O.samples)}function Ct(O){const T=i.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function V(O){const T=a.render.frame;d.get(O)!==T&&(d.set(O,T),O.update())}function et(O,T){const H=O.colorSpace,$=O.format,j=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||H!==Ir&&H!==Kn&&(at.getTransfer(H)===St?($!==Bn||j!==Fn)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):dt("WebGLTextures: Unsupported texture color space:",H)),T}function Ye(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(c.width=O.naturalWidth||O.width,c.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(c.width=O.displayWidth,c.height=O.displayHeight):(c.width=O.width,c.height=O.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=N,this.getTextureUnits=I,this.setTextureUnits=F,this.setTexture2D=se,this.setTexture2DArray=k,this.setTexture3D=ee,this.setTextureCube=U,this.rebindTextures=xe,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function J_(n,e){function t(i,s=Kn){let r;const a=at.getTransfer(s);if(i===Fn)return n.UNSIGNED_BYTE;if(i===xc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ju)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ed)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ju)return n.BYTE;if(i===Qu)return n.SHORT;if(i===Pr)return n.UNSIGNED_SHORT;if(i===gc)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===_i)return n.FLOAT;if(i===Ei)return n.HALF_FLOAT;if(i===td)return n.ALPHA;if(i===nd)return n.RGB;if(i===Bn)return n.RGBA;if(i===ki)return n.DEPTH_COMPONENT;if(i===gs)return n.DEPTH_STENCIL;if(i===id)return n.RED;if(i===vc)return n.RED_INTEGER;if(i===Ss)return n.RG;if(i===_c)return n.RG_INTEGER;if(i===bc)return n.RGBA_INTEGER;if(i===Aa||i===Ta||i===Ra||i===Ca)if(a===St)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xl||i===Ml||i===vl||i===_l)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_l)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bl||i===Sl||i===yl||i===wl||i===El||i===Ua||i===Al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bl||i===Sl)return a===St?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===yl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===wl)return r.COMPRESSED_R11_EAC;if(i===El)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ua)return r.COMPRESSED_RG11_EAC;if(i===Al)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Tl||i===Rl||i===Cl||i===Ll||i===Pl||i===Dl||i===Il||i===Nl||i===Ol||i===Fl||i===Ul||i===Bl||i===kl||i===zl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Tl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Rl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Cl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ll)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Dl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Il)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ol)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ul)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Bl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===kl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zl)return a===St?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Hl||i===Gl||i===Wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Hl)return a===St?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Vl||i===Yl||i===Ba||i===Xl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Vl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j_=`
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

}`;class eb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new pd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new bt({vertexShader:Q_,fragmentShader:j_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new Hn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tb extends ws{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,c=null,d=null,f=null,u=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",x=new eb,g={},v=t.getContextAttributes();let y=null,S=null;const E=[],b=[],A=new Ke;let _=null,w=null;const L=new On;L.viewport=new rt;const R=new On;R.viewport=new rt;const P=[L,R],N=new c2;let I=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let K=E[z];return K===void 0&&(K=new Ao,E[z]=K),K.getTargetRaySpace()},this.getControllerGrip=function(z){let K=E[z];return K===void 0&&(K=new Ao,E[z]=K),K.getGripSpace()},this.getHand=function(z){let K=E[z];return K===void 0&&(K=new Ao,E[z]=K),K.getHandSpace()};function G(z){const K=b.indexOf(z.inputSource);if(K===-1)return;const B=E[K];B!==void 0&&(B.update(z.inputSource,z.frame,c||a),B.dispatchEvent({type:z.type,data:z.inputSource}))}function q(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",se);for(let z=0;z<E.length;z++){const K=b[z];K!==null&&(b[z]=null,E[z].disconnect(K))}I=null,F=null,x.reset();for(const z in g)delete g[z];if(e.setRenderTarget(y),p=null,u=null,f=null,s=null,S=null,re.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),w!==null){const z=w.camera;z.fov=w.fov,z.zoom=w.zoom,z.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",q),s.addEventListener("inputsourceschange",se),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let B=null,oe=null,ae=null;v.depth&&(ae=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,B=v.stencil?gs:ki,oe=v.stencil?Dr:wi);const ve={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(ve),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new $n(u.textureWidth,u.textureHeight,{format:Bn,type:Fn,depthTexture:new tr(u.textureWidth,u.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,B),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const B={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,B),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new $n(p.framebufferWidth,p.framebufferHeight,{format:Bn,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(o),re.setContext(s),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function se(z){for(let K=0;K<z.removed.length;K++){const B=z.removed[K],oe=b.indexOf(B);oe>=0&&(b[oe]=null,E[oe].disconnect(B))}for(let K=0;K<z.added.length;K++){const B=z.added[K];let oe=b.indexOf(B);if(oe===-1){for(let ve=0;ve<E.length;ve++)if(ve>=b.length){b.push(B),oe=ve;break}else if(b[ve]===null){b[ve]=B,oe=ve;break}if(oe===-1)break}const ae=E[oe];ae&&ae.connect(B)}}const k=new X,ee=new X;function U(z,K,B){k.setFromMatrixPosition(K.matrixWorld),ee.setFromMatrixPosition(B.matrixWorld);const oe=k.distanceTo(ee),ae=K.projectionMatrix.elements,ve=B.projectionMatrix.elements,ge=ae[14]/(ae[10]-1),ue=ae[14]/(ae[10]+1),xe=(ae[9]+1)/ae[5],Se=(ae[9]-1)/ae[5],Ie=(ae[8]-1)/ae[0],$e=(ve[8]+1)/ve[0],Rt=ge*Ie,Nt=ge*$e,wt=oe/(-Ie+$e),Ct=wt*-Ie;if(K.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ct),z.translateZ(wt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ae[10]===-1)z.projectionMatrix.copy(K.projectionMatrix),z.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const V=ge+wt,et=ue+wt,Ye=Rt-Ct,O=Nt+(oe-Ct),T=xe*ue/et*V,H=Se*ue/et*V;z.projectionMatrix.makePerspective(Ye,O,T,H,V,et),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Q(z,K){K===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(K.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let K=z.near,B=z.far;x.texture!==null&&(x.depthNear>0&&(K=x.depthNear),x.depthFar>0&&(B=x.depthFar)),N.near=R.near=L.near=K,N.far=R.far=L.far=B,(I!==N.near||F!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,F=N.far),N.layers.mask=z.layers.mask|6,L.layers.mask=N.layers.mask&-5,R.layers.mask=N.layers.mask&-3;const oe=z.parent,ae=N.cameras;Q(N,oe);for(let ve=0;ve<ae.length;ve++)Q(ae[ve],oe);ae.length===2?U(N,L,R):N.projectionMatrix.copy(L.projectionMatrix),w===null&&z.isPerspectiveCamera&&(w={camera:z,fov:z.fov,zoom:z.zoom}),le(z,N,oe)};function le(z,K,B){B===null?z.matrix.copy(K.matrixWorld):(z.matrix.copy(B.matrixWorld),z.matrix.invert(),z.matrix.multiply(K.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(K.projectionMatrix),z.projectionMatrixInverse.copy(K.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Kl*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(z){h=z,u!==null&&(u.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(N)},this.getCameraTexture=function(z){return g[z]};let _e=null;function ne(z,K){if(d=K.getViewerPose(c||a),m=K,d!==null){const B=d.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let oe=!1;B.length!==N.cameras.length&&(N.cameras.length=0,oe=!0);for(let ue=0;ue<B.length;ue++){const xe=B[ue];let Se=null;if(p!==null)Se=p.getViewport(xe);else{const $e=f.getViewSubImage(u,xe);Se=$e.viewport,ue===0&&(e.setRenderTargetTextures(S,$e.colorTexture,$e.depthStencilTexture),e.setRenderTarget(S))}let Ie=P[ue];Ie===void 0&&(Ie=new On,Ie.layers.enable(ue),Ie.viewport=new rt,P[ue]=Ie),Ie.matrix.fromArray(xe.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(xe.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Se.x,Se.y,Se.width,Se.height),ue===0&&(N.matrix.copy(Ie.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),oe===!0&&N.cameras.push(Ie)}const ae=s.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const ue=f.getDepthInformation(B[0]);ue&&ue.isValid&&ue.texture&&x.init(ue,s.renderState)}if(ae&&ae.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let ue=0;ue<B.length;ue++){const xe=B[ue].camera;if(xe){let Se=g[xe];Se||(Se=new pd,g[xe]=Se);const Ie=f.getCameraImage(xe);Se.sourceTexture=Ie}}}}for(let B=0;B<E.length;B++){const oe=b[B],ae=E[B];oe!==null&&ae!==void 0&&ae.update(oe,K,c||a)}_e&&_e(z,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),m=null}const re=new Md;re.setAnimationLoop(ne),this.setAnimationLoop=function(z){_e=z},this.dispose=function(){}}}const nb=new zt,Ed=new Ze;Ed.set(-1,0,0,0,1,0,0,0,1);function ib(n,e){function t(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function i(x,g){g.color.getRGB(x.fogColor.value,md(n)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function s(x,g,v,y,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(x,g):g.isMeshLambertMaterial?(r(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(x,g),f(x,g)):g.isMeshPhongMaterial?(r(x,g),d(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(x,g),u(x,g),g.isMeshPhysicalMaterial&&p(x,g,S)):g.isMeshMatcapMaterial?(r(x,g),m(x,g)):g.isMeshDepthMaterial?r(x,g):g.isMeshDistanceMaterial?(r(x,g),M(x,g)):g.isMeshNormalMaterial?r(x,g):g.isLineBasicMaterial?(a(x,g),g.isLineDashedMaterial&&o(x,g)):g.isPointsMaterial?h(x,g,v,y):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,t(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Pn&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,t(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Pn&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,t(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,t(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const v=e.get(g),y=v.envMap,S=v.envMapRotation;y&&(x.envMap.value=y,x.envMapRotation.value.setFromMatrix4(nb.makeRotationFromEuler(S)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Ed),x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,x.aoMapTransform))}function a(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform))}function o(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function h(x,g,v,y){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*v,x.scale.value=y*.5,g.map&&(x.map.value=g.map,t(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function d(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function f(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function u(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function p(x,g,v){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Pn&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.retroreflectivity>0&&(x.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,g){g.matcap&&(x.matcap.value=g.matcap)}function M(x,g){const v=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(S,E){const b=E.program;i.uniformBlockBinding(S,b)}function c(S,E){let b=s[S.id];b===void 0&&(x(S),b=d(S),s[S.id]=b,S.addEventListener("dispose",v));const A=E.program;i.updateUBOMapping(S,A);const _=e.render.frame;r[S.id]!==_&&(u(S),r[S.id]=_)}function d(S){const E=f();S.__bindingPointIndex=E;const b=n.createBuffer(),A=S.__size,_=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const E=s[S.id],b=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,w=b.length;_<w;_++){const L=b[_];if(Array.isArray(L))for(let R=0,P=L.length;R<P;R++)p(L[R],_,R,A);else p(L,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,E,b,A){if(M(S,E,b,A)===!0){const _=S.__offset,w=S.value;if(Array.isArray(w)){let L=0;for(let R=0;R<w.length;R++){const P=w[R],N=g(P);m(P,S.__data,L),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(L+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,S.__data)}}function m(S,E,b){typeof S=="number"||typeof S=="boolean"?E[0]=S:S.isMatrix3?(E[0]=S.elements[0],E[1]=S.elements[1],E[2]=S.elements[2],E[3]=0,E[4]=S.elements[3],E[5]=S.elements[4],E[6]=S.elements[5],E[7]=0,E[8]=S.elements[6],E[9]=S.elements[7],E[10]=S.elements[8],E[11]=0):ArrayBuffer.isView(S)?E.set(new S.constructor(S.buffer,S.byteOffset,E.length)):S.toArray(E,b)}function M(S,E,b,A){const _=S.value,w=E+"_"+b;if(A[w]===void 0)return typeof _=="number"||typeof _=="boolean"?A[w]=_:ArrayBuffer.isView(_)?A[w]=_.slice():A[w]=_.clone(),!0;{const L=A[w];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return A[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function x(S){const E=S.uniforms;let b=0;const A=16;for(let w=0,L=E.length;w<L;w++){const R=Array.isArray(E[w])?E[w]:[E[w]];for(let P=0,N=R.length;P<N;P++){const I=R[P],F=Array.isArray(I.value)?I.value:[I.value];for(let G=0,q=F.length;G<q;G++){const se=F[G],k=g(se),ee=b%A,U=ee%k.boundary,Q=ee+U;b+=U,Q!==0&&A-Q<k.storage&&(b+=A-Q),I.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=k.storage}}}const _=b%A;return _>0&&(b+=A-_),S.__size=b,S.__cache={},this}function g(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",S),E}function v(S){const E=S.target;E.removeEventListener("dispose",v);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function y(){for(const S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:h,update:c,dispose:y}}const rb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let di=null;function ab(){return di===null&&(di=new Vs(rb,16,16,Ss,Ei),di.name="DFG_LUT",di.minFilter=Vt,di.magFilter=Vt,di.wrapS=Oi,di.wrapT=Oi,di.generateMipmaps=!1,di.needsUpdate=!0),di}class ob{constructor(e={}){const{canvas:t=T1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Fn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=p,x=new Set([bc,_c,vc]),g=new Set([Fn,wi,Pr,Dr,xc,Mc]),v=new Uint32Array(4),y=new Int32Array(4),S=new X;let E=null,b=null;const A=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let R=!1,P=null,N=null,I=null,F=null;this._outputColorSpace=Yn;let G=0,q=0,se=null,k=-1,ee=null;const U=new rt,Q=new rt;let le=null;const _e=new it(0);let ne=0,re=t.width,z=t.height,K=1,B=null,oe=null;const ae=new rt(0,0,re,z),ve=new rt(0,0,re,z);let ge=!1;const ue=new Ga;let xe=!1,Se=!1;const Ie=new zt,$e=new X,Rt=new rt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function Ct(){return se===null?K:1}let V=i;function et(D,W){return t.getContext(D,W)}let Ye,O,T,H,$,j,me,Me,ie,ce,be,Fe,Ae,ye,ke,Ve,Je,Y,we,he,Ee,Le,de;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uc}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",Jn,!1),V===null){const W="webgl2";if(V=et(W,D),V===null)throw et(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(D){throw t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Jn,!1),dt("WebGLRenderer: "+D.message),D}function He(){Ye=new av(V),Ye.init(),Ee=new J_(V,Ye),O=new ZM(V,Ye,e,Ee),T=new $_(V,Ye),O.reversedDepthBuffer&&u&&T.buffers.depth.setReversed(!0),N=V.createFramebuffer(),I=V.createFramebuffer(),F=V.createFramebuffer(),H=new cv(V),$=new O_,j=new Z_(V,Ye,T,$,O,Ee,H),me=new rv(L),Me=new u2(V),Le=new qM(V,Me),ie=new ov(V,Me,H,Le),ce=new uv(V,ie,Me,Le,H),Y=new hv(V,O,j),ke=new JM($),be=new N_(L,me,Ye,O,Le,ke),Fe=new ib(L,$),Ae=new U_,ye=new W_(Ye),Je=new KM(L,me,T,ce,m,h),Ve=new q_(L,ce,O),de=new sb(V,H,O,T),we=new $M(V,Ye,H),he=new lv(V,Ye,H),H.programs=be.programs,L.capabilities=O,L.extensions=Ye,L.properties=$,L.renderLists=Ae,L.shadowMap=Ve,L.state=T,L.info=H}M!==Fn&&(w=new fv(M,t.width,t.height,o,s,r));const Ue=new tb(L,V);this.xr=Ue,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const D=Ye.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Ye.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(D){D!==void 0&&(K=D,this.setSize(re,z,!1))},this.getSize=function(D){return D.set(re,z)},this.setSize=function(D,W,te=!0){if(Ue.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}re=D,z=W,t.width=Math.floor(D*K),t.height=Math.floor(W*K),te===!0&&(t.style.width=D+"px",t.style.height=W+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,D,W)},this.getDrawingBufferSize=function(D){return D.set(re*K,z*K).floor()},this.setDrawingBufferSize=function(D,W,te){re=D,z=W,K=te,t.width=Math.floor(D*te),t.height=Math.floor(W*te),this.setViewport(0,0,D,W)},this.setEffects=function(D){if(M===Fn){dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let W=0;W<D.length;W++)if(D[W].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(U)},this.getViewport=function(D){return D.copy(ae)},this.setViewport=function(D,W,te,Z){D.isVector4?ae.set(D.x,D.y,D.z,D.w):ae.set(D,W,te,Z),T.viewport(U.copy(ae).multiplyScalar(K).round())},this.getScissor=function(D){return D.copy(ve)},this.setScissor=function(D,W,te,Z){D.isVector4?ve.set(D.x,D.y,D.z,D.w):ve.set(D,W,te,Z),T.scissor(Q.copy(ve).multiplyScalar(K).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(D){T.setScissorTest(ge=D)},this.setOpaqueSort=function(D){B=D},this.setTransparentSort=function(D){oe=D},this.getClearColor=function(D){return D.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(D=!0,W=!0,te=!0){let Z=0;if(D){let J=!1;if(se!==null){const Ce=se.texture.format;J=x.has(Ce)}if(J){const Ce=se.texture.type,De=g.has(Ce),Re=Je.getClearColor(),Ne=Je.getClearAlpha(),Be=Re.r,tt=Re.g,st=Re.b;De?(v[0]=Be,v[1]=tt,v[2]=st,v[3]=Ne,V.clearBufferuiv(V.COLOR,0,v)):(y[0]=Be,y[1]=tt,y[2]=st,y[3]=Ne,V.clearBufferiv(V.COLOR,0,y))}else Z|=V.COLOR_BUFFER_BIT}W&&(Z|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(Z|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&V.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),P=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Jn,!1),Je.dispose(),Ae.dispose(),ye.dispose(),$.dispose(),me.dispose(),ce.dispose(),Le.dispose(),de.dispose(),be.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Oc),Ue.removeEventListener("sessionend",Fc),is.stop()};function Pt(D){D.preventDefault(),ch("WebGLRenderer: Context Lost."),R=!0}function mt(){ch("WebGLRenderer: Context Restored."),R=!1;const D=H.autoReset,W=Ve.enabled,te=Ve.autoUpdate,Z=Ve.needsUpdate,J=Ve.type;He(),H.autoReset=D,Ve.enabled=W,Ve.autoUpdate=te,Ve.needsUpdate=Z,Ve.type=J}function Jn(D){dt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ci(D){const W=D.target;W.removeEventListener("dispose",ci),Bd(W)}function Bd(D){kd(D),$.remove(D)}function kd(D){const W=$.get(D).programs;W!==void 0&&(W.forEach(function(te){be.releaseProgram(te)}),D.isShaderMaterial&&be.releaseShaderCache(D))}this.renderBufferDirect=function(D,W,te,Z,J,Ce){W===null&&(W=Nt);const De=J.isMesh&&J.matrixWorld.determinantAffine()<0,Re=Gd(D,W,te,Z,J);T.setMaterial(Z,De);let Ne=te.index,Be=1;if(Z.wireframe===!0){if(Ne=ie.getWireframeAttribute(te),Ne===void 0)return;Be=2}const tt=te.drawRange,st=te.attributes.position;let Oe=tt.start*Be,gt=(tt.start+tt.count)*Be;Ce!==null&&(Oe=Math.max(Oe,Ce.start*Be),gt=Math.min(gt,(Ce.start+Ce.count)*Be)),Ne!==null?(Oe=Math.max(Oe,0),gt=Math.min(gt,Ne.count)):st!=null&&(Oe=Math.max(Oe,0),gt=Math.min(gt,st.count));const Zt=gt-Oe;if(Zt<0||Zt===1/0)return;Le.setup(J,Z,Re,te,Ne);let Ot,Lt=we;if(Ne!==null&&(Ot=Me.get(Ne),Lt=he,Lt.setIndex(Ot)),J.isMesh)Z.wireframe===!0?(T.setLineWidth(Z.wireframeLinewidth*Ct()),Lt.setMode(V.LINES)):Lt.setMode(V.TRIANGLES);else if(J.isLine){let mn=Z.linewidth;mn===void 0&&(mn=1),T.setLineWidth(mn*Ct()),J.isLineSegments?Lt.setMode(V.LINES):J.isLineLoop?Lt.setMode(V.LINE_LOOP):Lt.setMode(V.LINE_STRIP)}else J.isPoints?Lt.setMode(V.POINTS):J.isSprite&&Lt.setMode(V.TRIANGLES);if(J.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))Lt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const mn=J._multiDrawStarts,Pe=J._multiDrawCounts,Sn=J._multiDrawCount,ut=Ne?Me.get(Ne).bytesPerElement:1,Gn=$.get(Z).currentProgram.getUniforms();for(let hi=0;hi<Sn;hi++)Gn.setValue(V,"_gl_DrawID",hi),Lt.render(mn[hi]/ut,Pe[hi])}else if(J.isInstancedMesh)Lt.renderInstances(Oe,Zt,J.count);else if(te.isInstancedBufferGeometry){const mn=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Pe=Math.min(te.instanceCount,mn);Lt.renderInstances(Oe,Zt,Pe)}else Lt.render(Oe,Zt)};function Nc(D,W,te,Z){P!==null&&D.isNodeMaterial&&P.setObject(Z,D),xe===!0&&ke.setState(D,te,!1),D.transparent===!0&&D.side===Ni&&D.forceSinglePass===!1?(D.side=Pn,D.needsUpdate=!0,zr(D,W,Z),D.side=vs,D.needsUpdate=!0,zr(D,W,Z),D.side=Ni):zr(D,W,Z)}this.compile=function(D,W,te=null){te===null&&(te=D),P!==null&&P.renderStart(D,W,te),b=ye.get(te),b.init(W),_.push(b),te.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),D!==te&&D.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),Se=this.localClippingEnabled,xe=ke.init(this.clippingPlanes,Se),xe===!0&&ke.setGlobalState(this.clippingPlanes,W),P!==null&&Ve.render(b.state.shadowsArray,te,W);const Z=new Set;return D.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Ce=J.material;if(Ce)if(Array.isArray(Ce))for(let De=0;De<Ce.length;De++){const Re=Ce[De];Nc(Re,te,W,J),Z.add(Re)}else Nc(Ce,te,W,J),Z.add(Ce)}),b=_.pop(),P!==null&&P.renderEnd(),Z},this.compileAsync=function(D,W,te=null){const Z=this.compile(D,W,te);return new Promise(J=>{function Ce(){if(Z.forEach(function(De){const Ne=$.get(De).currentProgram;(Ne===void 0||Ne.isReady())&&Z.delete(De)}),Z.size===0){J(D);return}setTimeout(Ce,10)}Ye.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let ao=null;function zd(D){ao&&ao(D)}function Oc(){is.stop()}function Fc(){is.start()}const is=new Md;is.setAnimationLoop(zd),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(D){ao=D,Ue.setAnimationLoop(D),D===null?is.stop():is.start()},Ue.addEventListener("sessionstart",Oc),Ue.addEventListener("sessionend",Fc),this.render=function(D,W){if(W!==void 0&&W.isCamera!==!0){dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(D,W);const te=Ue.enabled===!0&&Ue.isPresenting===!0,Z=w!==null&&(se===null||te)&&w.begin(L,se);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(W),W=Ue.getCamera()),D.isScene===!0&&D.onBeforeRender(L,D,W,se),b=ye.get(D,_.length),b.init(W),b.state.textureUnits=j.getTextureUnits(),_.push(b),Ie.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ue.setFromProjectionMatrix(Ie,bi,W.reversedDepth),Se=this.localClippingEnabled,xe=ke.init(this.clippingPlanes,Se),E=Ae.get(D,A.length),E.init(),A.push(E),Ue.enabled===!0&&Ue.isPresenting===!0){const De=L.xr.getDepthSensingMesh();De!==null&&oo(De,W,-1/0,L.sortObjects)}oo(D,W,0,L.sortObjects),E.finish(),P!==null&&P.updateLights(b.state.lightsArray),L.sortObjects===!0&&E.sort(B,oe),wt=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,wt&&Je.addToRenderList(E,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&ke.beginShadows();const J=b.state.shadowsArray;if(Ve.render(J,D,W),xe===!0&&ke.endShadows(),(Z&&w.hasRenderPass())===!1){const De=E.opaque,Re=E.transmissive;if(b.setupLights(),W.isArrayCamera){const Ne=W.cameras;if(Re.length>0)for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be];Bc(De,Re,D,st)}wt&&Je.render(D);for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be];Uc(E,D,st,st.viewport)}}else Re.length>0&&Bc(De,Re,D,W),wt&&Je.render(D),Uc(E,D,W)}se!==null&&q===0&&(j.updateMultisampleRenderTarget(se),j.updateRenderTargetMipmap(se)),Z&&w.end(L),D.isScene===!0&&D.onAfterRender(L,D,W),Le.resetDefaultState(),k=-1,ee=null,_.pop(),_.length>0?(b=_[_.length-1],j.setTextureUnits(b.state.textureUnits),xe===!0&&ke.setGlobalState(L.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,P!==null&&P.renderEnd()};function oo(D,W,te,Z){if(D.visible===!1)return;if(D.layers.test(W.layers)){if(D.isGroup)te=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(W);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(ue)){Z&&Rt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Ie);const De=ce.update(D),Re=D.material;Re.visible&&E.push(D,De,Re,te,Rt.z,null,W)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(ue))){const De=ce.update(D),Re=D.material;if(Z&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Rt.copy(D.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Rt.copy(De.boundingSphere.center)),Rt.applyMatrix4(D.matrixWorld).applyMatrix4(Ie)),Array.isArray(Re)){const Ne=De.groups;for(let Be=0,tt=Ne.length;Be<tt;Be++){const st=Ne[Be],Oe=Re[st.materialIndex];Oe&&Oe.visible&&E.push(D,De,Oe,te,Rt.z,st,W)}}else Re.visible&&E.push(D,De,Re,te,Rt.z,null,W)}}const Ce=D.children;for(let De=0,Re=Ce.length;De<Re;De++)oo(Ce[De],W,te,Z)}function Uc(D,W,te,Z){const{opaque:J,transmissive:Ce,transparent:De}=D;b.setupLightsView(te),xe===!0&&ke.setGlobalState(L.clippingPlanes,te),Z&&T.viewport(U.copy(Z)),J.length>0&&kr(J,W,te),Ce.length>0&&kr(Ce,W,te),De.length>0&&kr(De,W,te),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Bc(D,W,te,Z){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Z.id]===void 0){const Oe=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Z.id]=new $n(1,1,{generateMipmaps:!0,type:Oe?Ei:Fn,minFilter:ms,samples:Math.max(4,O.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Ce=b.state.transmissionRenderTarget[Z.id],De=Z.viewport||U;Ce.setSize(De.z*L.transmissionResolutionScale,De.w*L.transmissionResolutionScale);const Re=L.getRenderTarget(),Ne=L.getActiveCubeFace(),Be=L.getActiveMipmapLevel();L.setRenderTarget(Ce),L.getClearColor(_e),ne=L.getClearAlpha(),ne<1&&L.setClearColor(16777215,.5),L.clear(),wt&&Je.render(te);const tt=L.toneMapping;L.toneMapping=yi;const st=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),b.setupLightsView(Z),xe===!0&&ke.setGlobalState(L.clippingPlanes,Z),kr(D,te,Z),j.updateMultisampleRenderTarget(Ce),j.updateRenderTargetMipmap(Ce),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let gt=0,Zt=W.length;gt<Zt;gt++){const Ot=W[gt],{object:Lt,geometry:mn,material:Pe,group:Sn}=Ot;if(Pe.side===Ni&&Lt.layers.test(Z.layers)){const ut=Pe.side;Pe.side=Pn,Pe.needsUpdate=!0,kc(Lt,te,Z,mn,Pe,Sn),Pe.side=ut,Pe.needsUpdate=!0,Oe=!0}}Oe===!0&&(j.updateMultisampleRenderTarget(Ce),j.updateRenderTargetMipmap(Ce))}L.setRenderTarget(Re,Ne,Be),L.setClearColor(_e,ne),st!==void 0&&(Z.viewport=st),L.toneMapping=tt}function kr(D,W,te){const Z=W.isScene===!0?W.overrideMaterial:null;for(let J=0,Ce=D.length;J<Ce;J++){const De=D[J],{object:Re,geometry:Ne,group:Be}=De;let tt=De.material;tt.allowOverride===!0&&Z!==null&&(tt=Z),Re.layers.test(te.layers)&&kc(Re,W,te,Ne,tt,Be)}}function kc(D,W,te,Z,J,Ce){P!==null&&J.isNodeMaterial&&P.setObject(D,J),D.onBeforeRender(L,W,te,Z,J,Ce),D.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),J.onBeforeRender(L,W,te,Z,D,Ce),J.transparent===!0&&J.side===Ni&&J.forceSinglePass===!1?(J.side=Pn,J.needsUpdate=!0,L.renderBufferDirect(te,W,Z,J,D,Ce),J.side=vs,J.needsUpdate=!0,L.renderBufferDirect(te,W,Z,J,D,Ce),J.side=Ni):L.renderBufferDirect(te,W,Z,J,D,Ce),D.onAfterRender(L,W,te,Z,J,Ce)}function zr(D,W,te){W.isScene!==!0&&(W=Nt);const Z=$.get(D),J=b.state.lights,Ce=b.state.shadowsArray,De=J.state.version,Re=be.getParameters(D,J.state,Ce,W,te,b.state.lightProbeGridArray),Ne=be.getProgramCacheKey(Re);let Be=Z.programs;Z.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?W.environment:null,Z.fog=W.fog;const tt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Z.envMap=me.get(D.envMap||Z.environment,tt),Z.envMapRotation=Z.environment!==null&&D.envMap===null?W.environmentRotation:D.envMapRotation,Be===void 0&&(D.addEventListener("dispose",ci),Be=new Map,Z.programs=Be);let st=Be.get(Ne);if(st!==void 0){if(Z.currentProgram===st&&Z.lightsStateVersion===De)return Hc(D,Re),st}else Re.uniforms=be.getUniforms(D),P!==null&&D.isNodeMaterial&&P.build(D,te,Re),D.onBeforeCompile(Re,L),st=be.acquireProgram(Re,Ne),Be.set(Ne,st),Z.uniforms=Re.uniforms;const Oe=Z.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Oe.clippingPlanes=ke.uniform),Hc(D,Re),Z.needsLights=Vd(D),Z.lightsStateVersion=De,Z.needsLights&&(Oe.ambientLightColor.value=J.state.ambient,Oe.lightProbe.value=J.state.probe,Oe.sunLights.value=J.state.sun,Oe.sunLightShadows.value=J.state.sunShadow,Oe.directionalLights.value=J.state.directional,Oe.directionalLightShadows.value=J.state.directionalShadow,Oe.spotLights.value=J.state.spot,Oe.spotLightShadows.value=J.state.spotShadow,Oe.rectAreaLights.value=J.state.rectArea,Oe.ltc_1.value=J.state.rectAreaLTC1,Oe.ltc_2.value=J.state.rectAreaLTC2,Oe.pointLights.value=J.state.point,Oe.pointLightShadows.value=J.state.pointShadow,Oe.hemisphereLights.value=J.state.hemi,Oe.sunShadowMatrix.value=J.state.sunShadowMatrix,Oe.sunShadowCascade.value=J.state.sunShadowCascade,Oe.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Oe.spotLightMatrix.value=J.state.spotLightMatrix,Oe.spotLightMap.value=J.state.spotLightMap,Oe.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.lightProbeGrid=b.state.lightProbeGridArray.length>0,Z.currentProgram=st,Z.uniformsList=null,st}function zc(D){if(D.uniformsList===null){const W=D.currentProgram.getUniforms();D.uniformsList=La.seqWithValue(W.seq,D.uniforms)}return D.uniformsList}function Hc(D,W){const te=$.get(D);te.outputColorSpace=W.outputColorSpace,te.batching=W.batching,te.batchingColor=W.batchingColor,te.instancing=W.instancing,te.instancingColor=W.instancingColor,te.instancingMorph=W.instancingMorph,te.skinning=W.skinning,te.morphTargets=W.morphTargets,te.morphNormals=W.morphNormals,te.morphColors=W.morphColors,te.morphTargetsCount=W.morphTargetsCount,te.numClippingPlanes=W.numClippingPlanes,te.numIntersection=W.numClipIntersection,te.vertexAlphas=W.vertexAlphas,te.vertexTangents=W.vertexTangents,te.toneMapping=W.toneMapping}function Hd(D,W){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;S.setFromMatrixPosition(W.matrixWorld);for(let te=0,Z=D.length;te<Z;te++){const J=D[te];if(J.texture!==null&&J.boundingBox.containsPoint(S))return J}return null}function Gd(D,W,te,Z,J){W.isScene!==!0&&(W=Nt),j.resetTextureUnits();const Ce=W.fog,De=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?W.environment:null,Re=se===null?L.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:at.workingColorSpace,Ne=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Be=me.get(Z.envMap||De,Ne),tt=Z.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,st=!!te.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Oe=!!te.morphAttributes.position,gt=!!te.morphAttributes.normal,Zt=!!te.morphAttributes.color;let Ot=yi;Z.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ot=L.toneMapping);const Lt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,mn=Lt!==void 0?Lt.length:0,Pe=$.get(Z),Sn=b.state.lights;if(xe===!0&&(Se===!0||D!==ee)){const Dt=D===ee&&Z.id===k;ke.setState(Z,D,Dt)}let ut=!1;Z.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Sn.state.version||Pe.outputColorSpace!==Re||J.isBatchedMesh&&Pe.batching===!1||!J.isBatchedMesh&&Pe.batching===!0||J.isBatchedMesh&&Pe.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Pe.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Pe.instancing===!1||!J.isInstancedMesh&&Pe.instancing===!0||J.isSkinnedMesh&&Pe.skinning===!1||!J.isSkinnedMesh&&Pe.skinning===!0||J.isInstancedMesh&&Pe.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Pe.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Pe.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Pe.instancingMorph===!1&&J.morphTexture!==null||Pe.envMap!==Be||Z.fog===!0&&Pe.fog!==Ce||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ke.numPlanes||Pe.numIntersection!==ke.numIntersection)||Pe.vertexAlphas!==tt||Pe.vertexTangents!==st||Pe.morphTargets!==Oe||Pe.morphNormals!==gt||Pe.morphColors!==Zt||Pe.toneMapping!==Ot||Pe.morphTargetsCount!==mn||!!Pe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Pe.__version=Z.version);let Gn=Pe.currentProgram;ut===!0&&(Gn=zr(Z,W,J),P&&Z.isNodeMaterial&&P.onUpdateProgram(Z,Gn,Pe));let hi=!1,Gi=!1,Es=!1;const Et=Gn.getUniforms(),qt=Pe.uniforms;if(T.useProgram(Gn.program)&&(hi=!0,Gi=!0,Es=!0),Z.id!==k&&(k=Z.id,Gi=!0),Pe.needsLights){const Dt=Hd(b.state.lightProbeGridArray,J);Pe.lightProbeGrid!==Dt&&(Pe.lightProbeGrid=Dt,Gi=!0)}if(hi||ee!==D){T.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Et.setValue(V,"projectionMatrix",D.projectionMatrix),Et.setValue(V,"viewMatrix",D.matrixWorldInverse);const Vi=Et.map.cameraPosition;Vi!==void 0&&Vi.setValue(V,$e.setFromMatrixPosition(D.matrixWorld)),O.logarithmicDepthBuffer&&Et.setValue(V,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Et.setValue(V,"isOrthographic",D.isOrthographicCamera===!0),ee!==D&&(ee=D,Gi=!0,Es=!0)}if(Pe.needsLights&&(Sn.state.sunShadowMap.length>0&&Et.setValue(V,"sunShadowMap",Sn.state.sunShadowMap,j),Sn.state.directionalShadowMap.length>0&&Et.setValue(V,"directionalShadowMap",Sn.state.directionalShadowMap,j),Sn.state.spotShadowMap.length>0&&Et.setValue(V,"spotShadowMap",Sn.state.spotShadowMap,j),Sn.state.pointShadowMap.length>0&&Et.setValue(V,"pointShadowMap",Sn.state.pointShadowMap,j)),J.isSkinnedMesh){Et.setOptional(V,J,"bindMatrix"),Et.setOptional(V,J,"bindMatrixInverse");const Dt=J.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),Et.setValue(V,"boneTexture",Dt.boneTexture,j))}J.isBatchedMesh&&(Et.setOptional(V,J,"batchingTexture"),Et.setValue(V,"batchingTexture",J._matricesTexture,j),Et.setOptional(V,J,"batchingIdTexture"),Et.setValue(V,"batchingIdTexture",J._indirectTexture,j),Et.setOptional(V,J,"batchingColorTexture"),J._colorsTexture!==null&&Et.setValue(V,"batchingColorTexture",J._colorsTexture,j));const Wi=te.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&Y.update(J,te,Gn),(Gi||Pe.receiveShadow!==J.receiveShadow)&&(Pe.receiveShadow=J.receiveShadow,Et.setValue(V,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&W.environment!==null&&(qt.envMapIntensity.value=W.environmentIntensity),qt.dfgLUT!==void 0&&(qt.dfgLUT.value=ab()),Gi){if(Et.setValue(V,"toneMappingExposure",L.toneMappingExposure),Pe.needsLights&&Wd(qt,Es),Ce&&Z.fog===!0&&Fe.refreshFogUniforms(qt,Ce),Fe.refreshMaterialUniforms(qt,Z,K,z,b.state.transmissionRenderTarget[D.id]),Pe.needsLights&&Pe.lightProbeGrid){const Dt=Pe.lightProbeGrid;qt.probesSH.value=Dt.texture,qt.probesMin.value.copy(Dt.boundingBox.min),qt.probesMax.value.copy(Dt.boundingBox.max),qt.probesResolution.value.copy(Dt.resolution)}La.upload(V,zc(Pe),qt,j)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(La.upload(V,zc(Pe),qt,j),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Et.setValue(V,"center",J.center),Et.setValue(V,"modelViewMatrix",J.modelViewMatrix),Et.setValue(V,"normalMatrix",J.normalMatrix),Et.setValue(V,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){const Dt=Z.uniformsGroups;for(let Vi=0,As=Dt.length;Vi<As;Vi++){const Wc=Dt[Vi];de.update(Wc,Gn),de.bind(Wc,Gn)}}return Gn}function Wd(D,W){D.ambientLightColor.needsUpdate=W,D.lightProbe.needsUpdate=W,D.sunLights.needsUpdate=W,D.sunLightShadows.needsUpdate=W,D.directionalLights.needsUpdate=W,D.directionalLightShadows.needsUpdate=W,D.pointLights.needsUpdate=W,D.pointLightShadows.needsUpdate=W,D.spotLights.needsUpdate=W,D.spotLightShadows.needsUpdate=W,D.rectAreaLights.needsUpdate=W,D.hemisphereLights.needsUpdate=W}function Vd(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(D,W,te){const Z=$.get(D);Z.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),$.get(D.texture).__webglTexture=W,$.get(D.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:te,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,W){const te=$.get(D);te.__webglFramebuffer=W,te.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(D,W=0,te=0){se=D,G=W,q=te;let Z=null,J=!1,Ce=!1;if(D){const Re=$.get(D);if(Re.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(V.FRAMEBUFFER,Re.__webglFramebuffer),U.copy(D.viewport),Q.copy(D.scissor),le=D.scissorTest,T.viewport(U),T.scissor(Q),T.setScissorTest(le),k=-1;return}else if(Re.__webglFramebuffer===void 0)j.setupRenderTarget(D);else if(Re.__hasExternalTextures)j.rebindTextures(D,$.get(D.texture).__webglTexture,$.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const tt=D.depthTexture;if(Re.__boundDepthTexture!==tt){if(tt!==null&&$.has(tt)&&(D.width!==tt.image.width||D.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(D)}}const Ne=D.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Ce=!0);const Be=$.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Be[W])?Z=Be[W][te]:Z=Be[W],J=!0):D.samples>0&&j.useMultisampledRTT(D)===!1?Z=$.get(D).__webglMultisampledFramebuffer:Array.isArray(Be)?Z=Be[te]:Z=Be,U.copy(D.viewport),Q.copy(D.scissor),le=D.scissorTest}else U.copy(ae).multiplyScalar(K).floor(),Q.copy(ve).multiplyScalar(K).floor(),le=ge;if(te!==0&&(Z=N),T.bindFramebuffer(V.FRAMEBUFFER,Z)&&T.drawBuffers(D,Z),T.viewport(U),T.scissor(Q),T.setScissorTest(le),J){const Re=$.get(D.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+W,Re.__webglTexture,te)}else if(Ce){const Re=W;for(let Ne=0;Ne<D.textures.length;Ne++){const Be=$.get(D.textures[Ne]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Ne,Be.__webglTexture,te,Re)}}else if(D!==null&&te!==0){const Re=$.get(D.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Re.__webglTexture,te)}k=-1};function Gc(D){const W=$.get(D);return(W.__readFormat!==D.format||W.__readType!==D.type)&&(W.__readFormat=D.format,W.__readType=D.type,W.__formatReadable=O.textureFormatReadable(D.format),W.__typeReadable=O.textureTypeReadable(D.type)),W}this.readRenderTargetPixels=function(D,W,te,Z,J,Ce,De,Re=0){if(!(D&&D.isWebGLRenderTarget)){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&De!==void 0&&(Ne=Ne[De]),Ne){T.bindFramebuffer(V.FRAMEBUFFER,Ne);try{const Be=D.textures[Re],tt=Be.format,st=Be.type;D.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Re);const Oe=Gc(Be);if(Oe.__formatReadable===!1){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Oe.__typeReadable===!1){dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=D.width-Z&&te>=0&&te<=D.height-J&&V.readPixels(W,te,Z,J,Ee.convert(tt),Ee.convert(st),Ce)}finally{const Be=se!==null?$.get(se).__webglFramebuffer:null;T.bindFramebuffer(V.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(D,W,te,Z,J,Ce,De,Re=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&De!==void 0&&(Ne=Ne[De]),Ne)if(W>=0&&W<=D.width-Z&&te>=0&&te<=D.height-J){T.bindFramebuffer(V.FRAMEBUFFER,Ne);const Be=D.textures[Re],tt=Be.format,st=Be.type;D.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Re);const Oe=Gc(Be);if(Oe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const gt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,gt),V.bufferData(V.PIXEL_PACK_BUFFER,Ce.byteLength,V.STREAM_READ),V.readPixels(W,te,Z,J,Ee.convert(tt),Ee.convert(st),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);const Zt=se!==null?$.get(se).__webglFramebuffer:null;T.bindFramebuffer(V.FRAMEBUFFER,Zt);const Ot=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await R1(V,Ot,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,gt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Ce),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(gt),V.deleteSync(Ot),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,W=null,te=0){const Z=Math.pow(2,-te),J=Math.floor(D.image.width*Z),Ce=Math.floor(D.image.height*Z),De=W!==null?W.x:0,Re=W!==null?W.y:0;j.setTexture2D(D,0),V.copyTexSubImage2D(V.TEXTURE_2D,te,0,0,De,Re,J,Ce),T.unbindTexture()},this.copyTextureToTexture=function(D,W,te=null,Z=null,J=0,Ce=0){let De,Re,Ne,Be,tt,st,Oe,gt,Zt;const Ot=D.isCompressedTexture?D.mipmaps[Ce]:D.image;if(te!==null)De=te.max.x-te.min.x,Re=te.max.y-te.min.y,Ne=te.isBox3?te.max.z-te.min.z:1,Be=te.min.x,tt=te.min.y,st=te.isBox3?te.min.z:0;else{const qt=Math.pow(2,-J);De=Math.floor(Ot.width*qt),Re=Math.floor(Ot.height*qt),D.isDataArrayTexture?Ne=Ot.depth:D.isData3DTexture?Ne=Math.floor(Ot.depth*qt):Ne=1,Be=0,tt=0,st=0}Z!==null?(Oe=Z.x,gt=Z.y,Zt=Z.z):(Oe=0,gt=0,Zt=0);const Lt=Ee.convert(W.format),mn=Ee.convert(W.type);let Pe;W.isData3DTexture?(j.setTexture3D(W,0),Pe=V.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(j.setTexture2DArray(W,0),Pe=V.TEXTURE_2D_ARRAY):(j.setTexture2D(W,0),Pe=V.TEXTURE_2D),T.activeTexture(V.TEXTURE0),T.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,W.flipY),T.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),T.pixelStorei(V.UNPACK_ALIGNMENT,W.unpackAlignment);const Sn=T.getParameter(V.UNPACK_ROW_LENGTH),ut=T.getParameter(V.UNPACK_IMAGE_HEIGHT),Gn=T.getParameter(V.UNPACK_SKIP_PIXELS),hi=T.getParameter(V.UNPACK_SKIP_ROWS),Gi=T.getParameter(V.UNPACK_SKIP_IMAGES);T.pixelStorei(V.UNPACK_ROW_LENGTH,Ot.width),T.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ot.height),T.pixelStorei(V.UNPACK_SKIP_PIXELS,Be),T.pixelStorei(V.UNPACK_SKIP_ROWS,tt),T.pixelStorei(V.UNPACK_SKIP_IMAGES,st);const Es=D.isDataArrayTexture||D.isData3DTexture,Et=W.isDataArrayTexture||W.isData3DTexture;if(D.isDepthTexture){const qt=$.get(D),Wi=$.get(W),Dt=$.get(qt.__renderTarget),Vi=$.get(Wi.__renderTarget);T.bindFramebuffer(V.READ_FRAMEBUFFER,Dt.__webglFramebuffer),T.bindFramebuffer(V.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let As=0;As<Ne;As++)Es&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,$.get(D).__webglTexture,J,st+As),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,$.get(W).__webglTexture,Ce,Zt+As)),V.blitFramebuffer(Be,tt,De,Re,Oe,gt,De,Re,V.DEPTH_BUFFER_BIT,V.NEAREST);T.bindFramebuffer(V.READ_FRAMEBUFFER,null),T.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(J!==0||D.isRenderTargetTexture||$.has(D)){const qt=$.get(D),Wi=$.get(W);T.bindFramebuffer(V.READ_FRAMEBUFFER,I),T.bindFramebuffer(V.DRAW_FRAMEBUFFER,F);for(let Dt=0;Dt<Ne;Dt++)Es?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,qt.__webglTexture,J,st+Dt):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,qt.__webglTexture,J),Et?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Wi.__webglTexture,Ce,Zt+Dt):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Wi.__webglTexture,Ce),J!==0?V.blitFramebuffer(Be,tt,De,Re,Oe,gt,De,Re,V.COLOR_BUFFER_BIT,V.NEAREST):Et?V.copyTexSubImage3D(Pe,Ce,Oe,gt,Zt+Dt,Be,tt,De,Re):V.copyTexSubImage2D(Pe,Ce,Oe,gt,Be,tt,De,Re);T.bindFramebuffer(V.READ_FRAMEBUFFER,null),T.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Et?D.isDataTexture||D.isData3DTexture?V.texSubImage3D(Pe,Ce,Oe,gt,Zt,De,Re,Ne,Lt,mn,Ot.data):W.isCompressedArrayTexture?V.compressedTexSubImage3D(Pe,Ce,Oe,gt,Zt,De,Re,Ne,Lt,Ot.data):V.texSubImage3D(Pe,Ce,Oe,gt,Zt,De,Re,Ne,Lt,mn,Ot):D.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Ce,Oe,gt,De,Re,Lt,mn,Ot.data):D.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Ce,Oe,gt,Ot.width,Ot.height,Lt,Ot.data):V.texSubImage2D(V.TEXTURE_2D,Ce,Oe,gt,De,Re,Lt,mn,Ot);T.pixelStorei(V.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ut),T.pixelStorei(V.UNPACK_SKIP_PIXELS,Gn),T.pixelStorei(V.UNPACK_SKIP_ROWS,hi),T.pixelStorei(V.UNPACK_SKIP_IMAGES,Gi),Ce===0&&W.generateMipmaps&&V.generateMipmap(Pe),T.unbindTexture()},this.initRenderTarget=function(D){$.get(D).__webglFramebuffer===void 0&&j.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?j.setTextureCube(D,0):D.isData3DTexture?j.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?j.setTexture2DArray(D,0):j.setTexture2D(D,0),T.unbindTexture()},this.resetState=function(){G=0,q=0,se=null,T.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const lb=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function cb(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:pe(e,.55,.42),[l.LEAF2]:pe(e+.02,.5,.55),[l.LEAF3]:pe(e+.04,.6,.26),[l.BODY]:pe(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:pe(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:pe(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const ln=2.5,hb=[2.2,ln,.3],qo=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function ub(){const n=new qe({blend:.05}),e=[],t=(b,A)=>{const _=Math.sin(b*127.1+A*311.7)*43758.5453;return _-Math.floor(_)},i=b=>{const A=Math.sin(Math.atan2(b[2],b[0])*9+b[1]*2.3);return A>.75?l.BARKD:A<-.6?l.BARKL:A>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let b=0;b<7;b++){const A=b/7*Math.PI*2+.3,_=.45,w=1.05+t(b,1)*.45;n.chain([[Math.cos(A)*_,.45,-.2+Math.sin(A)*_,.2],[Math.cos(A)*(_+w)*.55,.16,-.2+Math.sin(A)*(_+w)*.55,.13],[Math.cos(A)*w,.02,-.2+Math.sin(A)*w,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const s=(b,A=1)=>n.chain(b,l.TRUNK,{group:A,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=b=>A=>{const _=t(Math.floor(A[0]*9),Math.floor(A[1]*9)+Math.floor(A[2]*9)*7);return A[1]<b[1]-.25||_<.18?l.LEAF3:_>.82?l.LEAF2:void 0};for(const[b,A]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(b,A,l.LEAF,{group:40,rough:.05,paint:r(b)});const a=[-.15,2.92,.15],o=C.norm([1,.07,0]),h=[1.25,.52,.58],c=b=>C.dot(C.sub(b,a),o),d=b=>C.dot(C.sub(b,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:b=>{const A=c(b),_=d(b),w=b[2]>a[2]+h[2]-.04;return w&&Math.hypot(A+.85,_-.02)<.15?Math.hypot(A+.85,_-.02)<.11?l.GLOW:l.FRAME:w&&A>.35&&A<.8&&_>-.42&&_<.38?_>.02&&_<.3&&A>.42&&A<.73?l.GLOW:Math.abs(A-.575)<.2&&_<-.38?l.FRAME:l.BODY2:w&&_>.06&&_<.32&&A>-.6&&A<.25?Math.abs(A+.17)<.02?l.BELLY:l.GLOW:A>h[0]-.05&&_>.05&&_<.35&&Math.abs(b[2]-a[2])<.45?l.MAGIC2:A>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(b[2]-a[2])-.38)<.08?l.FRAME:_>.02?l.BELLY:_<-.42?l.SHADES:void 0}}),e.push({at:C.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:C.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:C.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const b of[-.75,.75]){const A=C.add(C.add(a,C.mul(o,b)),[0,-.5,h[2]-.02]);n.ell(A,[.21,.21,.08],l.SHADES,{group:4,paint:_=>Math.hypot(_[0]-A[0],_[1]-A[1])<.1?l.FRAME:void 0})}n.seg(C.add(a,[1.05,.3,h[2]-.02]),C.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(C.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const f=C.add(a,[-.25,h[1]+.14,0]);n.box(f,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:b=>Math.floor((c(b)+2)*6)%2?l.BODY2:void 0}),n.box(C.add(f,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:C.norm([1,.14,0]),round:.04,group:6});for(const b of[-.18,.18])n.seg(C.add(a,[-1.33,-.45,b]),C.add(a,[-1.3,.62,b]),.02,.02,l.FRAME,{group:7});for(let b=0;b<5;b++)n.seg(C.add(a,[-1.33,-.32+b*.22,-.18]),C.add(a,[-1.33,-.32+b*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,m=1.45;n.seg(u,C.add(u,[0,m,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:b=>{const A=b[1]-u[1],_=Math.atan2(b[2]-u[2],b[0]-u[0]),w=Math.floor(A*6),L=Math.floor((_+Math.PI)*4+w%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&A>.75&&A<1.15?l.GLOW:A*6%1<.12||((_+Math.PI)*4+w%2*.5)%1<.1?l.STONED:t(w,L)<.15&&A<.5?l.MOSS:void 0}}),e.push({at:C.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let b=0;b<8;b++){const A=b/8*Math.PI*2;n.box(C.add(u,[Math.cos(A)*(p-.05),m+.1,Math.sin(A)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(A),0,Math.cos(A)],round:.02,group:9,rough:.008})}const M=C.add(u,[0,m+.1,0]),x=C.add(M,[.08,1.05,-.04]);n.seg(M,x,p-.1,.02,l.HAT1,{group:10,paint:b=>Math.floor((b[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(x,C.add(x,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(C.add(x,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:b=>b[1]>2.58?l.MOSS:void 0}),n.box(C.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(C.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const b of[-.9,.95]){const A=C.add(a,[b,-.55,0]);for(const _ of[-1,1])n.seg(C.add(A,[_*.04,-.08,h[2]+.03]),C.add(A,[_*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const g=[2.05,ln-.05,.3],v=[.85,.05,.62];n.box(g,v,l.WOOD,{round:.02,group:15,paint:b=>(b[2]-g[2]+2)*9%1<.12?l.BARKD:void 0});for(const[b,A]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([b,ln-.1,A],[b,ln-.7,A*.3],.04,.04,l.WOOD,{group:16});const y=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let b=0;b+1<y.length;b++){const[A,_]=[y[b],y[b+1]],w=Math.ceil(Math.hypot(_[0]-A[0],_[1]-A[1])/.32);n.seg([A[0],ln+.42,A[1]],[_[0],ln+.42,_[1]],.025,.025,l.WOOD,{group:17});for(let L=0;L<=w;L++){const R=L/w,P=A[0]+(_[0]-A[0])*R,N=A[1]+(_[1]-A[1])*R;n.seg([P,ln,N],[P,ln+.42,N],.02,.02,l.WOOD,{group:17})}}const S=hb;n.box([S[0],S[1]+Xs-.02,S[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0}),n.box([S[0]-.2,S[1]+Xs+.22,S[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0});for(const[b,A]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([S[0]+b,S[1],S[2]+A],[S[0]-b*.6,S[1]+Xs-.03,S[2]-A*.2],.015,.015,l.FRAME,{group:19});for(const[b,A,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([b,ln,A],[b,ln+.2*_,A],.1*_,.13*_,l.EAR,{group:20}),n.ell([b,ln+.3*_,A],[.16*_,.14*_,.16*_],l.LEAF2,{group:21,rough:.02,paint:w=>t(Math.floor(w[0]*30),Math.floor(w[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:b=>Math.floor((b[2]+2)*5)%2?l.BODY2:void 0});for(const b of[.05,.95])n.seg([1.98,3.4,b],[1.98,ln,b],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const b of[.18,.48])n.seg([1.2,ln-.05,b],[1,.06,b+.12],.018,.018,l.STRAW,{group:25});for(let b=1;b<8;b++){const A=b/8,_=ln-.05-(ln-.11)*A,w=1.2-.2*A;n.seg([w,_,.18+.12*A],[w,_,.48+.12*A],.02,.02,l.WOOD,{group:25})}const E=(b,A,_,w,L)=>{for(let R=0;R<=w;R++){const P=R/w,N=C.lerp(b,A,P);N[1]-=Math.sin(P*Math.PI)*_,L(N,R)}};return E([-.55,3.95,.45],[1.95,3.42,1],.35,9,(b,A)=>{n.ell(b,[.035,.035,.035],qo[A%4],{group:26+A%2,extra:!0})}),E([-.75,4.7,.42],[1.6,3.65,1],.2,7,(b,A)=>{n.ell(b,[.03,.03,.03],qo[(A+2)%4],{group:28+A%2,extra:!0})}),E([2.88,ln+.45,.9],[2.88,ln+.45,-.3],.08,5,(b,A)=>{n.ell(b,[.03,.03,.03],qo[(A+1)%4],{group:30+A%2,extra:!0})}),E([-2,2.8,.1],[-.9,3.6,.5],.15,5,(b,A)=>{n.box(b,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][A%3],{dir:[1,0,.2],round:.005,group:32+A%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,ln+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[S[0],S[1],S[2]],door:C.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function db(n={},{facing:e="towards",ppm:t=16}={}){const i=ub(),s=En(i.m,{scale:tc(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let x=0;x<r.w;x++)r.m[M*r.w+x]&&(a=Math.min(a,x),o=Math.max(o,x),h=Math.min(h,M));const c=new Tt(o-a+1,r.h-h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=(M+h)*r.w+x+a;r.m[g]&&c.put(x,M,r.m[g],r.n[g*3],r.n[g*3+1],r.n[g*3+2])}const d=M=>{const[x,g]=s.project(M);return[+(x-a).toFixed(1),+(g-h).toFixed(1)]},f=Math.round(d([0,i.splitY,0])[1]),u=new Tt(c.w,c.h),p=new Tt(c.w,c.h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const g=M*c.w+x,v=c.m[g];v&&(lb.has(v)||M<f?u:p).put(x,M,v,c.n[g*3],c.n[g*3+1],c.n[g*3+2])}const m=M=>{const[x,g]=d(M);return{x,y:g}};return{whole:c,top:u,bot:p,crownY:f,anchors:{base:m([0,0,-.2]),seat:m(i.seat),door:m(i.door),lights:i.lights.map(M=>({...m(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const Xt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},yt=(n,e,t=0)=>Xt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Bt=(n=.2,e=.15)=>t=>{const i=yt(t,16,3);return yt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Wt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=Xt(s,o)*6.283,c=t*Math.sqrt(Xt(o,s));n.ell([r+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+Xt(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:d=>d[1]>.13?l.LEAF:void 0})}},xa=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...C.add(e,C.add(C.mul(a,.25*i),[0,.2*i,0])),.025*i],[...C.add(e,C.add(C.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?l.LEAF:l.LEAF2,{group:t})}},ii=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...C.add(C.lerp(e,t,a/4),[(Xt(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>yt(a,30)<.3?l.LEAF2:void 0})},Xa=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=yt(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),je=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Bt(.35,.05)}),ir=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function Mi(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(f,u,p,m)=>{const M=Math.cos(u),x=Math.sin(u),g=[...f];return g[p]=f[p]*M-f[m]*x,g[m]=f[p]*x+f[m]*M,g},o=f=>a(a(a(f,s,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-s,1,2),c=f=>C.add(o(f),r),d=f=>h(C.sub(f,r));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(o)),f.paint){const u=f.paint;f.paint=(p,m)=>u(d(p),m)}}function $o(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=Bt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?yt(h,9)<.25?l.STONED:l.SHADES:Bt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,r?.22:.3,.1],l.BODY3,{group:e+1,paint:d=>Math.hypot(d[0]-h,d[1]-.3)<.12?l.FRAME:void 0});if(s)for(const h of[-.45,.45])ir(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const fb={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;$o(n,1),Mi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),xa(n,[.9,.2,.8],5),xa(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){$o(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),Xa(n,[.3,3.4,-.1],[1.1,.7,.9],5),ii(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Wt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;$o(n,1),Mi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])xa(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;iu(n,1),Xa(n,[.05,.65,0],[.32,.28,.26],3),Mi(n,e,{roll:1.35,at:[0,.32,0]}),Wt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){iu(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Wt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){br(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){br(n,[0,0,0],1),br(n,[.5,0,.2],4);const e=n.parts.length;br(n,[0,0,0],7),Mi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Wt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){br(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,C.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(C.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>yt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?yt(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&yt(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])je(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Bt(.5,.1)(t)}),Mi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Wt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>yt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?yt(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:yt(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Wt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){je(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Bt(.2,.1)(e)}}),Wt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Bt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Bt(.3,.3)}),ii(n,[.43,0,.3],[.4,1.9,.43],3,8),ii(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Wt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Bt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),ii(n,[0,0,.06],[.05,1.5,.06],3,10),Wt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>yt(t,6,5)<.25&&t[1]>.4?l.MOSS:yt(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Wt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Bt(.25,.15)(e)}),xa(n,[0,.4,.4],2,.55),Wt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;je(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])je(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),je(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Bt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),je(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(C.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(C.add(e,[.14,.07,0]),C.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Wt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Bt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Bt(.25,.15)});for(let e=0;e<7;e++)ir(n,[(Xt(e)-.5)*.4,.4+Xt(e,2)*1,.2+Xt(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);ii(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function iu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])je(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;je(n,C.lerp(t[0],t[1],s),C.lerp(t[4],t[5],s),e,.008),je(n,C.lerp(t[3],t[2],s),C.lerp(t[7],t[6],s),e,.008)}je(n,t[4],[-.45,.95,-.28],e,.015),je(n,t[7],[-.45,.95,.28],e,.015),je(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])je(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],l.BODY3,{group:e+1})}function br(n,e,t,i=!1){n.box(C.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Bt(.15,.2)}),n.seg(C.add(e,[0,.05,0]),C.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&yt(s,18)<.2?l.GLOW:Bt(.15,.1)(s)}),i&&ir(n,C.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const pb={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])je(n,[e,0,t],[e*.95,2.1,0],1,.045);je(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])je(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)ir(n,[-.42+(Xt(e)-.5)*.5,.6+Xt(e,2)*.7,(Xt(e,3)-.5)*.3],.025,10+e);je(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),je(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),ii(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Wt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])je(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)je(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Bt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Bt(.35,.15)(e)});for(let e=0;e<10;e++){const t=Xt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Xt(e)*.5,Math.sin(t)*.3,.025],[.1+Xt(e,4)*.6,.7+Xt(e,5)*.4,(Xt(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Xt(e,7)*.6,.5+Xt(e,8)*.4,(Xt(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>yt(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),Xa(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Bt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;je(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),je(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Mi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Wt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Bt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>yt(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])je(n,[t,.03,-.12],[t,.03,.12],3,.02);Mi(n,e,{pitch:.32,at:[0,.42,0]}),Wt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)je(n,t(i,s),t(i,s+1),1,.025),je(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)ii(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Wt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Bt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Bt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),je(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Wt(n,8,.8,6,19)}}};function mb(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>yt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?yt(a,18)<.5?l.LEAF2:l.STONED:s(a[0],a[2])?yt(a,10,2)<.25?i:l.CLOTH:yt(a,5,7)<.07?l.MOSS:void 0})}const ti=(n,e,t=.045)=>Math.abs(n-e)<t,gb={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){mb(n,4.4+.5,2+.5,l.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(ti(Math.abs(i),4.4)||ti(Math.abs(s),2)||ti(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(ti(s,0)||ti(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])je(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])je(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)je(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Mi(n,e,{roll:.25,pitch:-.1}),Wt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])je(n,[e,0,0],[e,1.7,0],1,.03);je(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?yt(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)ii(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)ir(n,[(Xt(e)-.5)*1.2,.06,(Xt(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Wt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?yt(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?yt(t,6)<.15?l.MOSS:void 0:yt(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:s=>yt(s,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;je(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=C.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],l.FRAME,{dir:C.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?yt(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});ii(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])je(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Xt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Bt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),ii(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(ti(Math.abs(s),5.2,.06)||ti(Math.abs(r),3.3,.06)||ti(s,0,.06)||ti(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(ti(Math.abs(s),5.2-1,.06)||ti(Math.abs(r),1.6,.06)))?yt(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((s+20)*.8)%2?yt(i,6)<.25?l.LEAF2:l.LEAF:yt(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){su(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),Xa(n,[.3,1.6,.2],[.35,.25,.3],6),Wt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;su(n,1),Mi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Wt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){je(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Bt(.2,0)}),Wt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])je(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;je(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),je(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Bt(.4,.1)(s)});ir(n,[0,4+.45,.22],.06,4,l.MAGIC2),ii(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;je(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Bt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;je(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,l.ACCENT)}Mi(n,e,{pitch:-.2}),Wt(n,8,1,5,31)}}};function su(n,e){for(const t of[-1.4,1.4])je(n,[0,0,t],[0,1,t],e,.035,l.BELLY);je(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])je(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const xb=[...Object.entries(fb).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(pb).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(gb).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(xb.map(n=>[n.id,n]));const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},ai=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Jl=n=>{const e=ai(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Mb=n=>e=>{const t=ai(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Mn=(n,e=0)=>t=>{const i=ai(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&ai(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},ft=(n,e,t,i,s,r={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:Mn(s,r.courses??5),...r}),Rn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...C.add(C.lerp(e,t,o),[(Gt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,l.LEAF,{group:i,rough:.02,paint:a=>ai(a,30)<.3?l.LEAF2:void 0})},Ii=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Gt(s,r)*6.283,o=t*Math.sqrt(Gt(r,s)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+Gt(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:d=>d[1]>.14?l.LEAF:void 0})}},gi=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Mb(e)}),Nn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Jl}),Cn=(n,e,t,i,s={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&ai(r,5,i)<.7?l.MOSS:ai(r,14)>.9?l.STONED:void 0}),ru=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),vb={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])ft(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];ft(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?l.RUNE:Mn(e)(r)):Mn(e)})}for(let t=0;t<4;t++)ft(n,[1.3+t*.3,.14,.4+Gt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Gt(t,2)-.5),Gt(t,3)-.5],courses:0});e&&(Rn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ii(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||ft(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;ft(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)ft(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Rn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Rn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){ft(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?l.STONED:Mn(e,0)(s)}),ft(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,l.STONE,{group:4,paint:Mn(e,0)});ft(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Rn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ii(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Gt(t,9)*(t%3===0?1.2:.45);ft(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Gt(t)-.5),Math.cos(i)],courses:0,round:.07})}ft(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ii(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){ft(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:Mn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>ai(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])ft(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)ft(n,[-1.2+t*.6,.12,.55+Gt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Rn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Rn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;ft(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)ru(n,[(Gt(t)-.5)*.8,.8+Gt(t,2)*.7,(Gt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(Rn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ii(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){ft(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:Mn(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])ft(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)ft(n,[.5+Gt(t)*1.2,.13,-.3+Gt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Rn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Rn(n,[.3,.1,.72],[.5,1.8,.72],5,13),gi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])ft(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)ft(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),ft(n,[-1.1,.55,0],[.15,.55,.62],4,e),ft(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ii(n,12,1.6,10,14),Rn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:Mn(e,0)}),n.ell(s(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:Mn(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],l.STONED,{group:1,cut:!0}),ru(n,s(.12,r),.05,3+(r>0?1:0),l.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:Mn(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?l.STONED:Mn(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:Mn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:Mn(e,0)}),e&&(Ii(n,14,1.8,10,16),gi(n,C.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){ft(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])ft(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(Rn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ii(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){ft(n,[-.9,.7,0],[.35,.7,.5],1,e),ft(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];ft(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}ft(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])ft(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Rn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ii(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])ft(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:Mn(e,5)(i)):Mn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:Mn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)ft(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Rn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Rn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ii(n,12,1.6,10,23))}}},_b={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Cn(n,[(Gt(e)-.5)*.6,.04,(Gt(e,2)-.5)*.4],[.07+Gt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Cn(n,[-.15,.12,0],[.22,.15,.2],1),Cn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Cn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Cn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Cn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),gi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Cn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Cn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Cn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Cn(n,[-1.1,.3,.6],[.4,.35,.35],2),Cn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&ai(e,6)<.3?l.MOSS:ai(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Cn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Cn(n,[.35,.1,.25],[.15,.1,.14],2)}}},bb={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}Nn(n,e,1),gi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Nn(n,e,1),gi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Nn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Nn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Nn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),gi(n,[-1,2.7,0],[.6,.45,.5],4),gi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:Jl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),gi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Nn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:ai(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Nn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Nn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Gt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Gt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Nn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Nn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Nn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Cn(n,[e,i,t],[.3,.24,.26],3);gi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:Jl})}Nn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Nn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])gi(n,[e,t,-.1],[.45,.3,.35],3)}}},Ad=[...Object.entries(vb).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(_b).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(bb).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],Sb=Object.fromEntries(Ad.map(n=>[n.id,n]));function yb(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:s([128,126,134]),[l.STONED]:s([64,62,72]),[l.MOSS]:pe(.26,.45,.45),[l.TRUNK]:pe(i,.45,.36),[l.BARKD]:pe(i+.03,.5,.17),[l.BARKL]:pe(i,.35,.55),[l.LEAF]:pe(t,.55,.45),[l.LEAF2]:pe(t-.03,.5,.62),[l.LEAF3]:pe(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:pe(n.magicHue??.45,.6,1),[l.MAGIC2]:pe(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function wb(n,e={},{variant:t=0,ppm:i=16}={}){const s=Sb[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new qe({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=tc(e)*s.size,{sp:o,project:h}=En(r,{scale:a});let c=0;for(const S of r.parts){if(S.extra)continue;const E=S.type==="cone"?[[S.a,S.r1],[S.b,S.r2]]:[[S.c,S.r?Math.max(...S.r):Math.max(S.h[0],S.h[2])]];for(const[b,A]of E)b[1]-A<.3&&(c=Math.max(c,Math.hypot(b[0],b[2])+A))}let d=o.w,f=-1,u=o.h;for(let S=0;S<o.h;S++)for(let E=0;E<o.w;E++)o.m[S*o.w+E]&&(d=Math.min(d,E),f=Math.max(f,E),u=Math.min(u,S));const p=f-d+1,m=o.h-u,M=new Tt(p,m),x=new Tt(p,m),g=new Tt(p,m),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let S=0;S<m;S++)for(let E=0;E<p;E++){const b=(S+u)*o.w+E+d,A=o.m[b];if(!A)continue;const _=[o.n[b*3],o.n[b*3+1],o.n[b*3+2]];M.put(E,S,A,..._),(S<v?x:g).put(E,S,A,..._)}const y=a/i;return{whole:M,top:x,bot:g,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(m/i).toFixed(1),footprint:+(c*y).toFixed(1)}}}const fi=16,cn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Zo=[0,-.42,.9],en=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,c=r-o,d=i?Math.round(i*t):0,f=m=>d?(m%d+d)%d:m,u=(m,M)=>cn(m,f(M)),p=m=>m*m*(3-2*m);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function au(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let c=9,d=9,f=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=a+p,M=o+u,x=(M%h+h)%h,g=m+cn(m,x*3+1),v=M+cn(m*7+2,x),y=Math.hypot(g-s,v-r);y<c?(d=c,c=y,f=cn(m,x)):y<d&&(d=y)}return{edge:d-c,id:f}}const hs=(n,e,t,i=.14)=>Math.abs(n)>1-i*en(n>0?3:7,e,1.4,t)*1.6,Lc={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(hs(n,e,4,.3))return 0;const i=en(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&en(n*2,e,.9,4)>.68?[l.WATER,0]:[s?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(hs(n,e,4,.5))return 0;const i=en(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(hs(n,e,4,.1))return 0;const i=au(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:en(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(hs(n,e,4,.08))return 0;const i=au(n*2,e,2.2,4);return i.edge<.16?[en(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(cn(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+en(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(cn(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[en(n,e,3,4)<.15?l.MOSS:r?l.BARKD:cn(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(hs(n,e,8,.06))return 0;const s=en(n*4,e,1.1,8);return Math.abs(en(n*6,e,.7,8)-.5)<.02||Math.abs(en(n*3+9,e,1.6,8)-.5)<.012?[en(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[s<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[l.BELLY,.05]:[s<.2?l.MOSS:s>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=en(n*3,e,2.5,4),a=[0,.35,.6][i];if(hs(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[en(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&en(n,e,6,4)>a*.8?[cn(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:r<a?[r<a*.5?l.LEAF:l.LEAF2,.1]:[r>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(hs(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+en(n,e,3,4)*.06?[Math.abs(r-.5)<.05?l.BARKL:l.TRUNK,.6]:[en(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&en(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function Jo(n,e,t){const i=new Tt(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],Zo[0]+(a[1]?(cn(r,s)-.5)*a[1]:0),Zo[1]+(a[1]?(cn(s,r)-.5)*a[1]*.5:0),Zo[2])}return i}function Eb(n,{variant:e=0}={}){const t=Lc[n],i=Math.round(t.width*fi),s=Math.round(t.period*fi);t.width/2;const r=(u,p,m)=>t.surface(u,p,m,e),a=Jo(i,s,(u,p)=>r(u/i*2-1,p/fi)),o=Math.round(Math.max(1.5,t.width*.8)*fi),h=Jo(i,o,(u,p)=>{const m=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(m));return Math.abs(M)>1||en(u/fi,p/fi,2)>.25+m?0:r(M,p/fi)}),c=Math.round(t.width*2.4*fi),d=c/2,f=u=>Jo(c,c,(p,m)=>{let M=null;for(const x of u){const g=Math.cos(x),v=Math.sin(x),y=(p-d)*g+(m-d)*v,S=-(p-d)*v+(m-d)*g;if(y<-t.width*fi*.5)continue;const E=S/(i/2);Math.abs(E)<=1&&(!M||Math.abs(E)<Math.abs(M.u))&&(M={u:E,v:(d-y)/fi})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-d,m-d)<i*.6):0});return{strip:a,end:h,y:f([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:f([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}const fn=(n,e,t=0)=>cn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),mi=(n=.25,e=.15)=>t=>{const i=fn(t,16,3);return fn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},pi=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:mi(.4,.05)}),ou=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&fn(s,5,i)<.6?l.MOSS:fn(s,14)>.9?l.STONED:void 0}),us=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=cn(s,r)*6.283,o=t*Math.sqrt(cn(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+cn(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},Qo=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=fn(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),Ma=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...C.add(C.lerp(e,t,a/4),[(cn(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>fn(a,30)<.3?l.LEAF2:void 0})};function lu(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(d,f,u,p)=>{const m=Math.cos(f),M=Math.sin(f),x=[...d];return x[u]=d[u]*m-d[p]*M,x[p]=d[u]*M+d[p]*m,x},a=d=>r(r(d,i,1,2),t,0,1),o=d=>r(r(d,-t,0,1),-i,1,2),h=d=>C.add(a(d),s),c=d=>o(C.sub(d,s));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(a)),d.paint){const f=d.paint;d.paint=(u,p)=>f(c(u),p)}}const Ab={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:mi(.1,.2)(t)}),lu(n,e,{roll:.15,pitch:.1}),us(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){ou(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),Qo(n,[0,.95,0],[.22,.18,.2],2),us(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(cn(e)-.5)*.3,0,(cn(e,2)-.5)*.2],i=.08+cn(e,3)*.1;n.seg(t,C.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(C.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){pi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:mi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),Ma(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&fn(t,6,e)<.35?l.MOSS:fn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])ou(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>fn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>fn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>fn(t,12)<.12?l.BARKD:t[1]>.55&&fn(t,5)<.3?l.MOSS:void 0});Qo(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:s=>fn(s,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:mi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?l.FRAME:void 0});lu(n,e,{roll:1.4,at:[0,.3,.3]}),us(n,14,2.2,4,5),Ma(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?fn(e,9)<.2?l.SHADES:l.GLOW:mi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>fn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),Qo(n,[.7,3.1,-.1],[1,.6,.8],5),us(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&fn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});pi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),Ma(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),us(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:mi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:mi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:mi(.3,.15)(e)}),pi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});us(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])pi(n,[-.2,0,e],[0,.75,e],1,.05),pi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:mi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:mi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>fn(t,9)<.3?l.MOSS:void 0});us(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])pi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;pi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),pi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])pi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])pi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});Ma(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},Tb=Object.entries(Ab).map(([n,e])=>({id:n,...e}));Object.fromEntries(Tb.map(n=>[n.id,n]));function Rb(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:pe(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:pe(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:pe(t,.35,.55),[l.TRUNK]:pe(t,.45,.36),[l.LEAF]:pe(e,.55,.45),[l.LEAF2]:pe(e-.03,.5,.6),[l.LEAF3]:pe(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:pe(n.magicHue??.5,.55,1),[l.MAGIC2]:pe(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function Cb(){const n={};for(const[e,t]of Object.entries(Lc))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const Ka=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],Lb={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function Pb(n=0){const[e,t,i]=Lb[Ka[n%Ka.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function cu(n,e,t,i){const s=Ka[n%Ka.length],r=new qe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&ht(_,e,31)<.5;let c=0,d=1,f=.3,u=0,p=n*7;const m=(_,w,L,R)=>P=>{if(R&&Math.abs(Math.sin(P[0]*37+P[1]*23+Math.sin(P[2]*17)*2))<.07)return l.STONED;if(P[1]>_-.02&&(P[2]>w-.06||ht(Math.floor(P[0]*30),Math.floor(P[2]*30),L)<.2)&&ht(Math.floor(P[0]*40),Math.floor(P[2]*40),L+1)<.6)return l.MOSS},M=(_,w,L,R,P,N)=>{const I=h(N),F=1+o*.08;r.ell([_,w,L],[R*1.18,R*1.18,.06],l.STONED,{group:P,cut:!0}),r.ell([_,w,L-.02],[R*F,R*F,.035+o*.025],l.CRYSTAL,{group:900+N,paint:G=>{const q=Math.hypot(G[0]-_,G[1]-w)/(R*F);return I?q<.3?l.GLOW:l.CRYSTAL:q<.2+o*.15?l.MAGIC2:q<.5?l.GLOW:q<.78?l.CRYSTAL:l.GLOW}})},x=(_,w,L,R,P,N,I,F)=>G=>{if(G[0]>_+R-.022){const q=Math.min(L,P)*1.5,se=(N-P-G[2])/q+.5,k=(w-G[1])/q+.5;if(se>=0&&se<=1&&k>=0&&k<=1&&(i?i0(i,se,k,.065):_u(se,k,I,.12)))return a&&ht(I,e,5)<.5?l.STONED:l.RUNE}return F(G)},g=s.tiers,v=g[0][1]*g[0][2][0]+.02,y=.08,S=g[0][2][2];r.box([0,y,f-S],[v,y,S],l.STONE,{group:d,round:.03,rough:.006,paint:m(y*2,f,3,a)}),r.box([0,y*.9,f],[v-.06,y*.45,.12],l.STONED,{group:d,cut:!0,paint:_=>_[2]<f-.07?l.GLOW:void 0});for(let _=1;_<g[0][1];_++)r.box([-v+_*v*2/g[0][1],y*.9,f-.06],[.015,y*.45,.06],l.STONE,{group:d});c=y*2,d++;const E=[];g.forEach(([_,w,[L,R,P]],N)=>{const I=_==="tweet"?.09:0,F=w*L*2+(w-1)*(_==="tweet"?.14:.01),G=f-N*.035,q=c+I+R;for(let se=0;se<w;se++){const k=-F/2+L+se*(L*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&se===w-1){E.push([k,L,R,P]);continue}const ee=a&&_==="tweet"?[1,.12*(se%2?1:-1),0]:void 0,U=a&&_==="tweet"?q-.04:q,Q=m(U+R,G-P+P,d,a),le=se===w-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([k,U,G-P],[L-.005,R,P],l.STONE,{group:d,round:.035,rough:.004,dir:ee,paint:le?x(k,U,R,L-.005,P,G,p++,Q):Q}),_==="bass"&&M(k,q+.02,G,Math.min(L,R)*.72,d,u++),_==="mid"&&(r.ell([k,q,G],[L*.8,R*.7,P*.9],l.STONED,{group:d,cut:!0,paint:_e=>_e[2]<G-P*.45?h(u)?l.STONED:l.GLOW:void 0}),r.box([k,q,G-P*.5],[.018,R*.6,P*.45],l.STONE,{group:d}),u++),_==="horn"){const _e=q+R*.25;r.seg([k,_e,G-P*1.5],[k,_e,G+.03],.03,Math.min(L,R)*.78,l.STONED,{group:d,cut:!0,paint:ne=>ne[2]<G-P*.55?h(u)?l.STONED:l.GLOW:void 0}),M(k,q-R*.6,G,R*.22,d,u++)}if(_==="tweet")for(const _e of[-.5,0,.5])M(k+_e*L*1.15,U,G,R*.55,d,u++);d++}if(_!=="tweet"){const se=a&&_==="horn"?L:0;r.box([-se,c+R*2+.012,G-.015],[F/2+.01-se,.012,.015],l.WOOD,{group:d++,round:.008}),c+=.024}_==="tweet"&&!a&&r.flat([0,c+I/2,G-P],[1,0,0],[0,1,0],F/2,I/2,(se,k)=>Math.abs(k)<.45&&Math.sin(se*23)>-.4?l.GLOW:null,{group:d++,bend:0}),c+=R*2+I});const b=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,w,L,R],P)=>{if(a&&P%2){r.seg([_,.03,w],[_+.12,.05,w+.04],.04,.02,l.CRYSTAL,{group:700+P});return}const N=[_+R*L,L,w+.05];r.seg([_,0,w],N,.045+L*.05,.006,l.CRYSTAL,{group:700+P,paint:I=>I[1]>L*(.65-o*.1)&&!a?l.GLOW:void 0}),r.seg([_+.04,0,w-.03],[_+.04+R*L*.5,L*.55,w],.03,.005,l.CRYSTAL,{group:720+P})}),!a)for(const[_,w,L,R]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,b+w-.1,L],[R,R*.8,R],l.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,w,L,R]of E)r.box([_+.45,w*.75,f+.25],[w,L,R],l.STONE,{group:d++,dir:[.6,.8,.2],round:.035,rough:.007,paint:m(1,0,9,!0)});return{m:r,top:b}}function Db(n){const e=new qe({blend:.02}),t=(i,s)=>ht(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:d=>Math.abs(Math.sin(d[0]*41+d[1]*29))<.08?l.STONED:d[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function hu(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(ht(s,t,1)*n.w),a=Math.floor(ht(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const Ib=n=>ec(n)*3,jo=new Map;function Nb(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=Ib(n),a=e+":"+r;jo.has(a)||jo.set(a,En(cu(e,0,"playing").m,{height:r}).s);const o=jo.get(a);if(i==="destroyed")return hu(En(Db(e),{scale:o}).sp,3,e*5+1);const{sp:h}=En(cu(e,t,i,s).m,{scale:o});return hu(h,i==="damaged"?4:10+t*2,e*5+t)}const Ob=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function Fb(){const n={};return Ob.forEach(e=>n[e.k]=e.v),n}function Ub(n,e,t,i,s){const r=lc(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*fe(i,.9,1.1)),h=ja(i,a,r);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=pe(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:Nu(o),colours:h}}function Bb(n,e,t,i,s){const r=$t[t].id,a=Or.find(x=>x.id===r),o=I0(r,n,{K:i,makeCanvas:s}),h=[],c=x=>h.push(x)-1,d={big:[],bigWeight:[],small:[],walls:[],set:null},f=(x,g)=>Un(x,g,n,"none",s),u=(x,g)=>{const{parts:v,colours:y}=Ub(a,x,n,Bi(e*13+t*101+g*7+1),i);return{bot:c(f(v.bot,y)),top:c(f(v.top,y))}},p=F0(r,n,{K:i,makeCanvas:s}),m=$t[t].layout.heightMix,M=x=>p.filter(g=>g.heightClass===x).length||1;for(const x of p)d.big.push({bot:c(x.bot),top:c(x.top)}),d.bigWeight.push(m?m[x.heightClass]/M(x.heightClass):x.weight);a.big.forEach(([x],g)=>{x==="tree"&&p.length||(d.big.push({bot:c(o.big[g].sp),top:null}),d.bigWeight.push(p.length?.1:1))}),a.small.forEach(([x,g],v)=>d.small.push(x==="tree"?u(g,500+v):{bot:c(o.small[v].sp),top:null}));for(const x of o.walls)d.walls.push(c(x.sp));return o.setPiece&&(d.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:d,floor:o.floor.sp}}function uu(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(Un(Vf(e,a,o,n,r,i),Hf(e,n,i),n,n.cOutline,t));return s}const kb=(n,e,t=!1)=>(t?8:0)+n*2+e;function qa(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Tr(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),c=new Uint8Array(o*h*4),d=new Uint8Array(o*h*4),f=n.map((u,p)=>{const m=i[p],M=qa(u.A,u.w,u.h),x=qa(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const y=v*u.w*4,S=((m.y+v)*o+m.x)*4;c.set(M.subarray(y,y+u.w*4),S),d.set(x.subarray(y,y+u.w*4),S)}let g=0;e:for(let v=u.h-1;v>=0;v--,g++)for(let y=0;y<u.w;y++)if(M[(v*u.w+y)*4+3]>=128)break e;return{uv:[m.x/o,m.y/h,(m.x+u.w)/o,(m.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(g,u.h)}});return{albedo:c,normal:d,width:o,height:h,frames:f}}function zb(n,e){const t=[],i=[],s=yb(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of Ad)for(let o=0;o<a.variants;o++){const h=wb(a.id,n,{variant:o}),c=h.crownY>0&&!r(h.top),d=t.push(Un(c?h.bot:h.whole,s,n,"none",e))-1,f=c?t.push(Un(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:d,top:f,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function Hb(n,e){if(n.kind==="creature")return{px:Tr(uu(n.style,n.id,e),2048)};if(n.kind==="decor"){const{sprites:r,decor:a}=zb(n.style,e);return{px:Tr(r,2048),decor:a}}if(n.kind==="party")return{px:Tr(uu(n.style,n.species,e,{...zf(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=Bb(n.style,n.seed,n.id,n.K,e);return{px:Tr(t),layout:i,floor:{albedo:new Uint8Array(qa(s.A,s.w,s.h)),normal:new Uint8Array(qa(s.N,s.w,s.h)),w:s.w,h:s.h}}}function du(n,e,t){const i=new Vs(n,e,t,Bn,Fn);return i.magFilter=Yt,i.minFilter=Yt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Kn,i.needsUpdate=!0,i}function Td(n){return{albedo:du(n.albedo,n.width,n.height),normal:du(n.normal,n.width,n.height),frames:n.frames}}const Sr=(n,e=2048)=>Td(Tr(n,e));class Gb{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const s=rf(e),r=u=>Un(uf(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(m=>r({pose:u,frame:m,facing:p}))))),o=wu;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,m={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFoot[u]=m}for(const[u,p]of[["fast",3],["brake",2]]){const m={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let x=0;x<p;x++)m[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFly[u]=m}this.witch=Sr(a,2048),this.stones=Sr([0,1,2,3].map(u=>this.stone(u)));const h=H0(e);this.props=Sr([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(Un(Nb(e,{variant:u,frame:p,state:"playing"}),Pb(u),e,e.cOutline));this.soundsystems=Sr(c,2048);const d=db(e),f=cb(e);for(const u of[d.bot,d.top])for(let p=Math.max(0,Math.floor(d.anchors.base.y-14));p<u.h;p++)for(let m=0;m<u.w;m++)u.m[p*u.w+m]===l.NOSE&&(u.m[p*u.w+m]=0);if(this.treehouse={atlas:Sr([d.bot,d.top].map(u=>Un(u,f,e,"none")),2048),...d.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const m=new Worker(new URL(""+new URL("artWorker-Bp8R55GX.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:m,busy:!1};m.onmessage=x=>{M.busy=!1,M.job=void 0,this.receive(x.data),this.dispatch()},m.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;onFloor=()=>{};stone(e){const t=Bi(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new Tt(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,l.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),Un(r,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Td(e.result.px);if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:kb});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift();this.receive({job:s,result:Hb(s,(r,a)=>{const o=document.createElement("canvas");return o.width=r,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Qs=24,ot={uAmb:{value:new X},uMoon:{value:new X},uMoonDir:{value:new X(-.45,.75,.5).normalize()},uMoonBeam:{value:new X},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new X},uGlowRgb:{value:new X},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ke},uHazeRange:{value:new Ke(70,200)},uHazeColour:{value:new X},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:Qs},()=>new rt)},uLightCol:{value:Array.from({length:Qs},()=>new rt)},uLightCount:{value:0},uDisco:{value:new rt},uDiscoParams:{value:new rt},uDiscoColour:{value:new X(1,1,1)},uScenery:{value:new Ke(1e6,1)}};function Wb(n,e,t,i=1){const s=(r,a)=>new X(r[0]/255*a,r[1]/255*a,r[2]/255*a);ot.uAmb.value.copy(s(pe(n.ambientHue,.55,1),n.ambient*i)),ot.uMoon.value.copy(s(pe(n.moonHue,.35,1),n.moon)),ot.uMoonBeam.value.copy(s(pe(n.moonHue,.35,1),n.shafts*.25)),ot.uBands.value=n.bands,ot.uDither.value=n.dither*.5,ot.uShafts.value=n.shafts,ot.uShaftScale.value=t*2,ot.uGlowRgb.value.copy(s(pe(n.glowHue,n.glowSat,1),1)),ot.uGlowR.value=e,ot.uGlowPower.value=n.glowPower,ot.uHazeColour.value.copy(s(pe(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const li=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Qs}], uLightCol[${Qs}];
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
  for (int i = 0; i < ${Qs}; i++) {
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
`,Zi=2,dn=32,ps=8,Vb=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Yb=`
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
    vec2 cell = vec2(mod(float(t), ${ps}.0), floor(float(t) / ${ps}.0));
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
`;class Xb{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*Zi/dn)*dn,c=Math.ceil(o*Zi/dn)*dn;this.tilesX=h/dn,this.tilesZ=c/dn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const d=m=>(m.magFilter=m.minFilter=Yt,m.generateMipmaps=!1,m.colorSpace=Kn,m.needsUpdate=!0,m);this.texture=d(new Vs(new Uint8Array(h*c*4),h,c)),d(this.tile),this.floors=d(new Vs(new Uint8Array(64*ps*48*4*4),64*ps,192));const f=Array.from({length:32},(m,M)=>new X(...$t[M]?.floor??[.25,.45,.4])),u=new bt({vertexShader:Vb,fragmentShader:Yb,uniforms:{...ot,uAreas:{value:this.texture},uExtent:{value:new rt(r.minX,r.minZ,h/Zi,c/Zi)},uPixel:{value:s},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(m,M)=>{const x=$t[M]?.layout.terrain??[];return new X(+x.includes("mounds"),+x.includes("hollows"),+x.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new Ke(64,48)},uFloorsSize:{value:new Ke(64*ps,192)},uSat:{value:i.sat},uFloor:{value:new X(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new rt},uCircle:{value:new rt},uSweeps:{value:Array.from({length:4},()=>new rt)},uSweepCount:{value:0},uClearing:{value:new Ke(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Hn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Kt(p,u),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new Vs(new Uint8Array(dn*dn*4),dn,dn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new Vs(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new Ke(t%ps*i.w,Math.floor(t/ps)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=dn/Zi,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),d=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(s-a.minZ)/o,m=[];for(let g=d;g<=f;g++)for(let v=h;v<=c;v++)this.filled[g*this.tilesX+v]||m.push([v,g,(v+.5-u)**2+(g+.5-p)**2]);m.sort((g,v)=>g[2]-v[2]);const M=performance.now();let x=0;for(const[g,v]of m){if(x>0&&performance.now()-M>r)break;this.fillTile(e,g,v),x++}return m.length-x}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=dn/Zi,o=s.minX+t*a,h=s.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(d=>d.kind==="pond");for(let d=0;d<dn;d++)for(let f=0;f<dn;f++){const u=o+(f+.5)/Zi,p=h+(d+.5)/Zi,m=this.map.areaAt(u,p),M=(d*dn+f)*4;let x=0;for(const g of c)Math.hypot(u-g.x,p-g.z)<3*g.size&&(x=255);r[M]=m.type,r[M+1]=Math.round(m.openness*255),r[M+2]=x,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ke(t*dn,i*dn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const fu=Lc,Kb=new Set(["tarmac","railway","stairs","bridges"]),pu=`
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,qb=`
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
`,$b=`
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
`;class Zb{group=new Ws;constructor(e,t,i){const s=e.paths,r=e.seed,a=Cb(),o=new Map,h=(f,u)=>{const p=e.areaAt(f,u),m=p.cell.join(",");let M=o.get(m);if(!M){const x=(a[$t[p.type].id]??[]).filter(g=>!Kb.has(g)&&fu[g]&&(g!=="magic"||ze(p.cell[0],p.cell[1],r+831)<.15));M=x.length?x[Math.floor(ze(p.cell[0],p.cell[1],r+833)*x.length)]:"dirt",o.set(m,M)}return M},c=new Map;s.lines.forEach((f,u)=>{const p=f.kind==="rail"?Math.floor(ze(u,1,r+835)*3):0,m=f.pts,M=m.length,x=[0];for(let y=1;y<M;y++)x.push(x[y-1]+Math.hypot(m[y][0]-m[y-1][0],m[y][1]-m[y-1][1]));const g=m.map((y,S)=>{const E=m[Math.max(0,S-1)],b=m[Math.min(M-1,S+1)],A=b[0]-E[0],_=b[1]-E[1],w=Math.hypot(A,_)||1;return[-_/w,A/w]}),v=x[M-1];for(let y=0;y<M-1;y++){const S=(m[y][0]+m[y+1][0])/2,E=(m[y][1]+m[y+1][1])/2;if(f.kind==="rail"&&s.railBroken(S,E)||e.hardClear(S,E))continue;const b=f.kind==="stream"?{width:f.half*2,period:4}:null,A=f.kind==="stream"?"stream":f.kind==="rail"?"railway":f.kind==="road"?"tarmac":h(S,E),_=b??fu[A],w=A+":"+p;let L=c.get(w);L||c.set(w,L={pos:[],uv:[]});const R=N=>_.width/2*(f.deadEnd?Math.min(1,(v-x[N])/6):1),P=(N,I)=>{const F=R(N)*I;L.pos.push(m[N][0]+g[N][0]*F,.02,m[N][1]+g[N][1]*F),L.uv.push(I>0?1:0,x[N]/_.period)};P(y,-1),P(y,1),P(y+1,1),P(y,-1),P(y+1,1),P(y+1,-1)}});const d=Rb(t);for(const[f,u]of c){const[p,m]=f.split(":"),M=new jt;if(M.setAttribute("position",new It(u.pos,3)),M.setAttribute("uvw",new It(u.uv,2)),p==="stream"){const E=new bt({vertexShader:pu,fragmentShader:$b,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...ot,uPixel:{value:i}}}),b=new Kt(M,E);b.frustumCulled=!1,b.renderOrder=.4,this.group.add(b);continue}const x=Eb(p,{variant:+m}).strip,g=Un(x,d,t,"none"),v=new fd(g.A);v.magFilter=v.minFilter=Yt,v.generateMipmaps=!1,v.flipY=!1,v.wrapT=Fa,v.colorSpace=Kn;const y=new bt({vertexShader:pu,fragmentShader:qb,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...ot,uStrip:{value:v},uPixel:{value:i}}}),S=new Kt(M,y);S.frustumCulled=!1,S.renderOrder=.5,this.group.add(S)}}}const Jb="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Qb=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,jb=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,e5=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,t5=`
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
}`;function ds(n,e,t,i=!1){const s=new $n(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Kn,s}class n5{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ds(1,1,Vt,!0),this.scene.depthTexture=new tr(1,1),this.fx.texture.format=Bn;const i=(s,r)=>new bt({vertexShader:Jb,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(Qb,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(jb,{uSrc:{value:null},uStep:{value:new Ke}}),composite:i(e5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ke},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(t5,{uSrc:{value:null},uTexel:{value:new Ke},uDir:{value:new Ke},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Kt(new Hn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ds(1,1,Vt);bloomB=ds(1,1,Vt);a=ds(1,1,Vt);b=ds(1,1,Vt);fx=ds(1,1,Vt);fxB=ds(1,1,Vt);fxScene=null;quad;cam=new Rc(-1,1,1,-1,0,1);mats;low=new Ke(1,1);out=new Ke(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,m=>{m.uScene.value=this.scene.texture,m.uThreshold.value=s.bloom.threshold});for(let m=0;m<2;m++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new it),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const m=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/m,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,d=this.fullResolution?this.out.y/this.low.y:1,f=u=>{u.uTexel.value.set(1/h,1/c),u.uStrength.value=s.tiltShift.strength*d,u.uBand.value=s.tiltShift.band,u.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const i5=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,s5=`
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
}`,r5=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,a5=`
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
}`,o5=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class l5{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new X(a.x,0,a.z);const o=new X(...pe(r.circleHue2,.4,1).map(x=>x/255));this.ballMat=new bt({vertexShader:i5,fragmentShader:s5,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:ot.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new Kt(new Hn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new Kt(new Hn(s,h).translate(0,h/2,0),new bt({fragmentShader:r5,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=r.motes,d=[],f=[];for(let x=0;x<c.count;x++){const g=S=>{const E=Math.sin(x*12.9898+S*78.233)*43758.5453;return E-Math.floor(E)},v=g(1)*Math.PI*2,y=Math.sqrt(g(2))*a.radius*c.column;d.push(a.x+Math.cos(v)*y,.3,a.z+Math.sin(v)*y),f.push(g(3),c.speed*(.6+g(4)*.8),.4+g(5)*1.2,0)}const u=new jt;u.setAttribute("position",new It(d,3)),u.setAttribute("aMote",new It(f,4));const p=pe(r.circleHue,.55,1);this.motes=new Ya(u,new bt({vertexShader:a5,fragmentShader:o5,uniforms:{uTime:ot.uTime,uRise:{value:c.rise},uTint:{value:new X(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:_s})),this.motes.frustumCulled=!1;const m=pe(r.circleHue,.7,1);this.lightRgb=new X(m[0]/255,m[1]/255,m[2]/255);const M=ot;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),ot.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const c5=[new X(.25,.85,1),new X(.7,.4,1),new X(1,.65,.2)];class h5{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],c=[],d=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;d.push({...f.soundsystem,at:f.at,from:u})}for(const f of d){const u=r.transition>0?Math.min(1,(t-f.at)/r.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],m=p.h*this.metresPerPixel,M=nn((u-.55)/.45);if(u<1&&f.from){const g=(f.from.x+f.x)/2,v=(f.from.z+f.z)/2,y=Math.hypot(f.x-g,f.z-v)*1.6;h.push({x:g,z:v,radius:u*y,strength:1-nn((u-.8)/.2)})}if(M>0&&i(f.x,f.z,p.w*this.metresPerPixel,m)){const g=ze(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-M)*m,z:f.z,frame:p,flip:g,fresh:s(f.x,f.z,m)})}u>=1&&c.push({x:f.x,y:m*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+r.transition});const x=.85+.15*Math.sin(t*8);M>0&&o.push({x:f.x,y:3,z:f.z,reach:r.lightReach,rgb:c5[f.variant%3],strength:r.lightStrength*x*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}function u5(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function d5(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=Bi(n.seed*53+t[0]*1031+t[1]*7+509),a=S=>{const E=n.areaAt(S.x,S.z).cell;return E[0]===t[0]&&E[1]===t[1]},o=S=>ze(Math.round(S.x*10),Math.round(S.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((S,E)=>o(S)-o(E)),c=new Map,d=new Set,f=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),m=(S,E=0)=>(c.get(S)??0)+1<=(d.has(S)?3:2)-E,M=(S,E)=>f.some(b=>u5([S.x,S.z],[E.x,E.z],[b.ax,b.az],[b.bx,b.bz])),x=(S,E)=>{f.push({ax:S.x,az:S.z,bx:E.x,bz:E.z,seed:Math.floor(ze(Math.round(S.x*10),Math.round(E.z*10),n.seed+503)*1e6)}),c.set(S,(c.get(S)??0)+1),c.set(E,(c.get(E)??0)+1)},g=(S,E,b)=>{let A=S,_=E;const w=[S];for(let L=0;L<b&&m(A);L++){const R=[];for(const I of h){if(I===A||!m(I))continue;const F=I.x-A.x,G=I.z-A.z,q=Math.hypot(F,G);if(!(q<i.spanMin||q>i.spanMax)&&!(_&&(F*_[0]+G*_[1])/q<p)&&!M(A,I)&&(R.push({b:I,d:q}),R.length>=16))break}if(!R.length)break;R.sort((I,F)=>F.d-I.d);const{b:P,d:N}=R[Math.floor(r()*Math.min(4,R.length))];x(A,P),_=[(P.x-A.x)/N,(P.z-A.z)/N],w.push(P),A=P}return w},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),y=[];for(const S of h){if(u.length>=v)break;if(c.has(S)||u.some(A=>Math.hypot(A.x-S.x,A.z-S.z)<i.spread))continue;u.push(S);const E=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),b=g(S,null,E);for(let A=1;A<b.length-1;A++){if(r()>=i.junctionChance)continue;const _=b[A],w=b[A+1],L=w.x-_.x,R=w.z-_.z,P=Math.hypot(L,R),N=r()<.5?1:-1;d.add(_),y.push({from:_,heading:[-R/P*N,L/P*N]})}}for(const S of y)g(S.from,S.heading,i.spansPerRun[0]+Math.floor(r()*3));return f}const Ut={uRight:{value:new X(1,0,0)},uUp:{value:new X(0,1,0)},uFacing:{value:new X(0,0,1)},uTopFade:{value:0},uCutout:{value:new rt(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new Ke(1,1)},uWitch:{value:new rt(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new rt(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new rt)},uPartyCol:{value:Array.from({length:16},()=>new X)},uPartyCount:{value:0},uUplight:{value:new rt}},el=`
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
`,tl=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
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
  float occl = uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
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
`;class Ji{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Hn(1,1);s.translate(0,.5,0),this.geo=new Cc,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...ot,...Ut,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uFadePass:{value:0},uSilhouette:{value:new rt(0,0,0,0)},...h}),a=i.scenery?{blending:to,blendSrc:pc,blendDst:mc}:{},o=new bt({vertexShader:el,fragmentShader:tl,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new Kt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new Kt(this.geo,new bt({vertexShader:el,fragmentShader:tl,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new Kt(this.geo,new bt({vertexShader:el,fragmentShader:tl,uniforms:r({uSilhouette:{value:new rt(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Oa}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new Ac(new Float32Array(t*s),s);return a.setUsage($s),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const f5=`
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
}`,p5=`
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
}`,m5=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,g5=`
varying vec3 vWorld;
${li}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,x5=`
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
}`,M5=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${li}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class v5{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new it(r));const s={...ot,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new bt({vertexShader:f5,fragmentShader:p5,uniforms:{...s,uRes:Ut.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new bt({vertexShader:m5,fragmentShader:g5,uniforms:s}),this.moteMat=new bt({vertexShader:x5,fragmentShader:M5,uniforms:{...ot,uMoteColour:{value:new it(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:_s})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],d=[],f=[],u=[];e.forEach((_,w)=>{const L=Math.hypot(_.bx-_.ax,_.bz-_.az),R=Math.max(2,Math.round(L/a.bulbSpacing)),P=N=>[_.ax+(_.bx-_.ax)*N,o-a.sag*4*N*(1-N)*(L/8),_.az+(_.bz-_.az)*N];for(let N=0;N<=16;N++){const I=P(N/16),F=P((N+1)/16);N<16&&(f.push(...I,...F),u.push(w+N/16,w+(N+1)/16))}for(let N=1;N<R;N++){const I=N/R,F=P(I),G=this.palette[(_.seed+N)%this.palette.length];h.push(...F),c.push(G.r,G.g,G.b),d.push((_.seed*13+N*7)%100/100,w*40+N,t(F[0],F[2])+N*.03,4*I*(1-I))}});const p=new Ws,m=new jt;m.setAttribute("position",new It(h,3)),m.setAttribute("aColour",new It(c,3)),m.setAttribute("aBulb",new It(d,4));const M=new jt;M.setAttribute("position",new It(f,3)),M.setAttribute("aSway",new It(u,1)),p.add(new Tc(M,this.wireMat),new Ya(m,this.bulbMat));const x=this.game.tuning.party.motes,g=this.game.map,v=[],y=[],S=g.areaSize*1.1,E=Math.round(Math.PI*S*S/400*x.perPatch);for(let _=0;_<E;_++){const w=F=>{const G=Math.sin(s*12.9898+_*78.233+F*37.719)*43758.5453;return G-Math.floor(G)},L=w(1)*Math.PI*2,R=Math.sqrt(w(2))*S,P=i.x+Math.cos(L)*R,N=i.z+Math.sin(L)*R,I=g.areaAt(P,N).cell;I[0]!==r[0]||I[1]!==r[1]||(v.push(P,x.from,N),y.push(w(3),x.speed*(.6+w(4)*.8),.3+w(5)*.8,t(P,N)))}const b=new jt;b.setAttribute("position",new It(v,3)),b.setAttribute("aMote",new It(y,4));const A=new Ya(b,this.moteMat);return A.frustumCulled=!1,p.add(A),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=d5(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),c=r.from?e.map.siteOf(r.from[0],r.from[1]):null,d=c?(c.x+h.x)/2:h.x,f=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-d,h.z-f)*1.6:1,p=e.tuning.party.transition,m=(M,x)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-d,x-f)/u)*p;a={lines:o,group:this.build(o,m,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const Qt=32,zs=16,_5=`
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
}`,b5=`
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
}`;class mu{mesh;geo=new Cc;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Hn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Kt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new Ac(r,a).setUsage($s));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,c,d=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=s,this.uv.set(r,f*4),this.col.set([a,o,h,c],f*4),this.draw[f]=d}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const S5=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],y5=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class w5{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Qt*zs;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(Qt/2,Qt/2,0,Qt/2,Qt/2,Qt/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,Qt,Qt),this.tex=new fd(this.canvas),this.tex.magFilter=Yt,this.tex.minFilter=Yt,this.tex.generateMipmaps=!1;const r=a=>new bt({vertexShader:_5,fragmentShader:b5,uniforms:{...ot,uRight:Ut.uRight,uUp:Ut.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:_s});this.standing=new mu(r(0)),this.flat=new mu(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new X;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%zs*Qt,o=Math.floor(s/zs)*Qt;r.clearRect(a,o,Qt,Qt),t0(r,e,{x:a+1,y:o+1,size:Qt-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,Qt,Qt);for(let d=3;d<h.data.length;d+=4)h.data[d]=h.data[d]>90?255:0;r.putImageData(h,a,o);const c=Cr(e);return this.colours.set(e,new it(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=Qt*zs,i=e%zs*Qt,s=Math.floor(e/zs)*Qt;return[i/t,1-s/t,(i+Qt)/t,1-(s+Qt)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,d=h.bond,f=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const b of o.events)b.kind==="fizzled"&&this.fizzles.push({x:b.x,z:b.z,at:e}),b.kind==="invited"&&this.bursts.push({x:b.x,z:b.z,at:e,seed:b.id});this.fizzles=this.fizzles.filter(b=>e-b.at<.7),this.bursts=this.bursts.filter(b=>e-b.at<.9);for(const b of this.bursts){const A=(e-b.at)/.9;for(let _=0;_<28;_++){const w=ze(b.seed,_,3)*Math.PI*2,L=2+ze(b.seed,_,5)*3,R=2+ze(b.seed,_,7)*3,P=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(b.x+Math.cos(w)*L*A,.6+R*A-4*A*A,b.z+Math.sin(w)*L*A,.3,u,P[0],P[1],P[2],1-A)}}const p=(b,A,_)=>{const w=a.creatures[b],L=28,R=_?1:.45;for(let P=0;P<L;P++){const N=Math.PI/2-P/L*Math.PI*2,I=P/L<A;!_&&!I||this.flat.add(w.x+Math.cos(N)*1.5,0,w.z+Math.sin(N)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*R)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[b,A]of o.progress)o.talk?.id!==b&&p(b,Math.min(1,A/Bu(a.creatures[b],h)),!1);const m=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let g={x:0,z:0},v=r;for(let b=o.stack.length-1;b>=0;b--){const A=o.stack[b],_=a.creatures[A],w=o.stack.length-1-b,L=this.chain[w],R=(2+_.level*.4)*m.scale,P=Math.sin(e*1.7+w*.9)*m.idleSway*(1+w*.5),N=g.x-c.vx*m.trail+P,I=g.z-c.vz*m.trail;L.vx+=((N-L.x)*m.stiffness-L.vx*m.damping)*M,L.vz+=((I-L.z)*m.stiffness-L.vz*m.damping)*M,L.x+=L.vx*M,L.z+=L.vz*M,g=L,v+=(w===0?m.offset*R:m.gap*R)+R/2;const F=new X(c.x+L.x,v,c.z+L.z);v+=R/2,x.set(A,F);const G=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(F.x,F.y,F.z,R,this.uv(this.slotOf(_.species,_.level)),G.r,G.g,G.b,1)}for(const b of o.placed){const A=a.creatures[b.id],_=this.slotOf(A.species,A.level),w=this.colours.get(A.species),L=.8+.2*Math.sin(e*2+b.id);this.flat.add(b.x,0,b.z,3+A.level*.8,this.uv(_),w.r*L,w.g*L,w.b*L,1,Math.min(1,(e-b.at)/.8)),this.flat.add(b.x,0,b.z,5,u,w.r,w.g,w.b,.25)}const y=h.sigilProjection,S=c.lift*c.lift*(3-2*c.lift);if(S>.01)for(const b of o.placed){const A=a.creatures[b.id],_=this.colours.get(A.species),w=h.treetopHeight-4+y.height,L=.85+.15*Math.sin(e*1.3+b.id);this.flat.add(b.x,w,b.z,(3+A.level*.8)*y.size,this.uv(this.slotOf(A.species,A.level)),_.r,_.g,_.b,y.opacity*S*L);for(let R=1;R<w;R+=1.5)this.standing.add(b.x,R,b.z,.3,u,_.r,_.g,_.b,y.beam*S*L*(.6+.4*Math.sin(R*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(b=>Math.hypot(b.x-c.x,b.z-c.z)<=f.pickRadius)){const b=a.creatures[o.stack[o.stack.length-1]],A=this.colours.get(b.species),_=ku(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+b.level*.8,this.uv(this.slotOf(b.species,b.level)),_?1:A.r,_?.1:A.g,_?.1:A.b,.22)}for(const b of this.fizzles){const A=1-(e-b.at)/.7;this.flat.add(b.x,0,b.z,3*(1+(1-A)*.6),u,1,.15,.1,A)}const E=[...o.stack,...o.placed.map(b=>b.id)];for(const b of E){const A=a.creatures[b],_=this.colours.get(A.species);if(!_)continue;const w=gp(o,b,c.x,c.z);d.rim&&this.flat.add(A.x,0,A.z,1.8,u,_.r,_.g,_.b,.35);const L=x.get(b)??new X(w.x,.2,w.z);if(d.sparks){const P=Math.max(.5,d.sparkEvery),N=(e+b*.618%1*P)%P;if(N<.7){const I=N/.7;this.standing.add(L.x+(A.x-L.x)*I,L.y+(.6-L.y)*I+Math.sin(I*Math.PI)*1.2,L.z+(A.z-L.z)*I,.35,u,_.r,_.g,_.b,1)}}const R=Math.hypot(A.x-w.x,A.z-w.z);if(d.thread&&R>f.length*.85){const P=Math.min(1,(R-f.length*.85)/f.length),N=Math.min(60,Math.floor(R/1.2));for(let I=1;I<N;I++){const F=(I+e*2%1)/N;this.standing.add(L.x+(A.x-L.x)*F,L.y+(.5-L.y)*F,L.z+(A.z-L.z)*F,.22,u,_.r,_.g,_.b,.25+.75*P)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=r.witch,d=(y,S,E,b)=>{this.v.set(S,E,b).project(t),y.style.left=`${(this.v.x+1)/2*i}px`,y.style.top=`${(1-this.v.y)/2*s}px`},f=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),d(o,c.x-1.2,js(c,r.tuning)+2.2,c.z));return}const p=r.creatures[a.id];if(d(o,c.x-1.2,js(c,r.tuning)+2.2,c.z),d(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(f,ze(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const m=Math.floor(a.t/mp(p,r.tuning)),M=Math.min(1,a.t/a.total),x=(y,S)=>y[Math.floor(ze(a.id,S,5)*y.length)%y.length],g=[4,2,0][Math.min(2,p.level)],v=Math.round(g+(4-g)*M);this.emoji(o,x(S5,m-m%2)),o.classList.toggle("on",m%2===0),m>=1?this.emoji(f,x(y5[v],m-(m+1)%2)):this.say(f,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=m%2===1?"1":"0.6"}}const E5=[1,3,5,7,9],Rd=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function A5(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=Rd(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),c=n-h*o,d=Ln(s.duty*t,0,1),u=ze(e,h,311)<d?nn(c/Math.max(.001,s.fadeIn))*nn((o-c)/Math.max(.001,s.fadeOut)):0,p=Math.floor(c/a),m=E5.filter(S=>S<=s.maxCount),M=m[Math.floor(ze(e,h*64+p,313)*m.length)%m.length]??1,x=e%97*.37,g=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+x)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+x*2),y=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:g,open:v,hue:y}}const T5=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,R5=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,yr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],C5=n=>{const e=(n%1+1)%1*yr.length,t=Math.floor(e),i=e-t,s=yr[t%yr.length],r=yr[(t+1)%yr.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class L5{constructor(e,t){this.game=t,this.mesh=new Tc(this.geo,new bt({vertexShader:T5,fragmentShader:R5,transparent:!0,depthWrite:!1,blending:_s})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new jt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=Rd(r),h=o*a.blockBars,c=[],d=[],f=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const m=A5(e,u.seed,1,r),M=e-u.ready,x=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,g=Math.max(m.on,x),v=x>m.on?a.maxCount:m.count;if(g<=.01)continue;const y=a.spread*Math.PI/180*m.open;for(let S=0;S<v;S++){const E=v===1?0:S/(v-1)-.5,b=a.maxTilt*Math.PI/180,A=Math.max(-b,Math.min(b,E*y+m.sweep)),_=Math.sin(A),w=Math.cos(A),L=-.15*Math.cos(A*3+u.seed),R=C5(m.hue+S*.07),P=a.opacity*g*p;c.push(u.x,u.y,u.z,u.x+_*a.length,u.y+w*a.length,u.z+L*a.length),d.push(...R,P,...R,P),f.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(d.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new kn(this.pos,3).setUsage($s)),this.geo.setAttribute("aCol",new kn(this.col,4).setUsage($s)),this.geo.setAttribute("aU",new kn(this.u,1).setUsage($s))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(d),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*P5(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(g,v)=>{if(g<o.minX||g>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const y=n.areaAt(g,v).cell;return`${y[0]},${y[1]}`},c=`${e[0]},${e[1]}`,d=Math.ceil(2*r/a),f=s.x-r,u=s.z-r,p=[];for(let g=0;g<=d;g++){for(let v=0;v<=d;v++)p.push(h(f+v*a,u+g*a));yield}const m=new Set,M=Math.max(1,Math.round(a/t)),x=a/M;for(let g=0;g<d;g++,yield)for(let v=0;v<d;v++){const y=[p[g*(d+1)+v],p[g*(d+1)+v+1],p[(g+1)*(d+1)+v],p[(g+1)*(d+1)+v+1]];if(!y.includes(c)||y.every(E=>E===c))continue;const S=[];for(let E=0;E<=M;E++)for(let b=0;b<=M;b++)S.push(h(f+v*a+b*x,u+g*a+E*x));for(let E=0;E<=M;E++)for(let b=0;b<=M;b++){const A=S[E*(M+1)+b],_=f+v*a+b*x,w=u+g*a+E*x;for(const[L,R]of[[1,0],[0,1]]){if(b+L>M||E+R>M)continue;const P=S[(E+R)*(M+1)+b+L];if(A===P||A!==c&&P!==c)continue;const N=_+L*x*.5,I=w+R*x*.5,F=`${Math.round(N*4)},${Math.round(I*4)}`;m.has(F)||(m.add(F),i.push({x:N,z:I,other:A===c?P:A}))}}}}const D5=`
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
}`,I5=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${li}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class N5{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Ya(this.geo,new bt({vertexShader:D5,fragmentShader:I5,uniforms:{...ot,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:_s})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new jt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const d=e.map.siteOf(c.cell[0],c.cell[1]),f=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=f?(f.x+d.x)/2:d.x,p=f?(f.z+d.z)/2:d.z,m=e.map.areaSize*1.6,M=e.tuning.party.transition,x=Cr($t[e.map.typeOf(c.cell[0],c.cell[1])].creature),g={points:[],colour:new it(x[0]/255,x[1]/255,x[2]/255),on:(v,y)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,y-p)/m)*M,done:!1};this.areas.set(h,g),this.jobs.push({key:h,gen:P5(e.map,c.cell,t.step,g.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(r.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new It(r,3)),this.geo.setAttribute("aColour",new It(a,3)),this.geo.setAttribute("aSpark",new It(o,2))}}const O5=["#ff6fcf","#5fe8ff","#ffe25c"];class F5{canvas=document.createElement("canvas");g;v=new X;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,s,r,a,o,h,c,d){const f=this.v.set(s,1,r).project(e),u=Math.max(Math.abs(f.x),Math.abs(f.y)),p=f.z<1?Math.min(1,Math.max(0,(u-.9)/.25)):1;if(p<=.01){this.canvas.style.display="none";return}let m=f.x,M=f.y;f.z>=1&&(m=-m,M=-M);const x=1/Math.max(Math.abs(m)/.86,Math.abs(M)/.8,1e-6),g=(m*x+1)/2*t,v=(1-M*x)/2*i,y=Math.hypot(s-a,r-o),S=Math.max(.25,Math.min(1,1-y/900));this.canvas.style.display="block",this.canvas.style.left=`${g-48}px`,this.canvas.style.top=`${v-48}px`;const E=this.g,b=Math.atan2(-M,m);E.clearRect(0,0,96,96),E.save(),E.translate(48,48),E.rotate(b);const A=h*c/60,_=A-Math.floor(A);for(let w=0;w<3;w++){const L=(10+w*9+_*9)*(.7+.3*S),R=p*S*(1-(w+_)/3.2);E.strokeStyle=O5[w],E.globalAlpha=Math.max(0,R),E.lineWidth=3,E.beginPath(),E.arc(26,0,L,Math.PI-.7,Math.PI+.7),E.stroke()}d&&(E.rotate(-b),E.globalAlpha=.8,E.fillStyle="#fff",E.font="10px monospace",E.textAlign="center",E.fillText(`${Math.round(y)} m`,0,40)),E.restore()}}class U5{canvas=document.createElement("canvas");g;v=new X;d=new X;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(R,P)=>{const N=this.v.set(R,0,P).project(e);return[(N.x+1)/2*t,(1-N.y)/2*i,N.z]};a.clearRect(0,0,t,i);const h=(R,P,N,I,F)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(R,P),a.lineTo(N,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${F})`,a.lineWidth=1,a.beginPath(),a.moveTo(R,P),a.lineTo(N,I),a.stroke()},c=(R,P,N,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(R,P+1,N+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(R,P,N)},d=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!d||!f)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),m=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,x=Math.min(u.x,m.x),g=Math.max(p.x,M.x),v=Math.min(f.z,m.z),y=d.z;for(let R=Math.ceil(x/10)*10;R<=g;R+=10){const P=o(R,v),N=o(R,y);h(P[0],P[1],N[0],N[1],R%50===0?.28:.1)}for(let R=Math.ceil(v/10)*10;R<=y;R+=10){const P=o(x,R),N=o(g,R);h(P[0],P[1],N[0],N[1],R%50===0?.28:.1)}const S=i-6;h(0,S,t,S,.6);for(let R=Math.ceil((u.x-s)/2)*2;s+R<=p.x;R+=2){const P=o(s+R,d.z)[0],N=R%10===0;h(P,S,P,S-(N?10:5),.6),N&&c(`${R}`,P,S-18,"center")}const E=6;h(E,0,E,i,.6);for(let R=Math.ceil((r-d.z)/2)*2;r-R>=f.z-1e-6&&R<400;R+=2){const P=o(s,r-R)[1],N=R%10===0;P<0||P>i||(h(E,P,E+(N?10:5),P,.6),N&&c(`${R}`,E+14,P,"left"))}const b=o(s,r),A=this.ground(e,-1,1-b[1]/i*2),_=this.ground(e,1,1-b[1]/i*2),w=A&&_?Math.round(_.x-A.x):0,L=Math.round(e.position.y);c(`camera ${L} m up · ${w} m across at the witch`,t-12,i-24,"right")}}const B5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,k5=`
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
}`;class z5{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new bt({vertexShader:B5,fragmentShader:k5,uniforms:{...ot,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?Si:qs}),this.mesh=new Kt(new Hn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const H5=`
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
}`,G5=`
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
}`;class W5{mesh;geo=new Cc;attr;capacity=0;constructor(e,t=!0){const i=new Hn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new bt({vertexShader:H5,fragmentShader:G5,uniforms:{...ot,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:to,blendSrc:dc,blendDst:fc}:{}});this.mesh=new Kt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Ac(new Float32Array(this.capacity*4),4),this.attr.setUsage($s),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const V5=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function Y5(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}function X5(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class K5{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=V5(s),this.renderer=new ob({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Ir,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new On(s.camera.fov,1,1,900),this.post=new n5(this.renderer,s),this.scene.background=new it(723478),Wb({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient),ot.uGlowPower.value=s.glowPower,this.assets=new Gb(i,t.seed,s.pixelSize),this.ground=new Xb(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new W5(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";ot.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new z5(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new _h,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ot.uHazeRange.value.set(s.haze.near,s.haze.far),this.scene.add(this.ground.mesh),this.scene.add(new Zb(t.map,i,this.mpp).group);const o=s.occlusion;this.witchBatch=new Ji(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ot.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Ut.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new Ji(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.stoneBatch=new Ji(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,c=[],d=t.tuning.dancefloor.stones;for(let u=0;u<d;u++){const p=u/d*Math.PI*2+.3;c.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(c),this.propBatch=new Ji(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new h5(this.assets.soundsystems,this.mpp),this.strings=new v5(this.scene,t),this.leashView=new w5(this.scene,t),this.lasers=new L5(this.scene,t),this.borders=new N5(this.scene,t),this.soundBatch=new Ji(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new l5(t.map,s,Ut,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=s.fx==="smooth"?new bt({transparent:!0,depthWrite:!1,blending:to,blendSrc:dc,blendDst:fc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new bt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Kt(new Hn(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new _h;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new F5(document.body);rulers=new U5(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Ut.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<$t.length;e++)this.assets.prefetchType(e);for(const e of $t)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes))),s}frustum=new Ga;frustumTo=new Ga;cullCam=new On;box=new ar;m4=new zt;v3=new X;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=vu({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Xn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const d of[-1,1])for(const f of[-1,1]){const u=this.v3.set(d,f,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let m=u.y<-.001?(p-h.y)/u.y:1/0;m>0||(m=1/0),m=Math.min(m,c),s.push([h.x+u.x*m,h.z+u.z*m])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+r;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,c,d]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+d),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[c,...d]=a.split("|"),[f,u,p]=h??d.map(Number),m=this.game.witch;!(e==="placed"&&Math.hypot(+f-m.x,+u-m.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+u,+p)&&this.pops.push(`${o} ${c} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=nh(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,d=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,f=this.budget.radius,u=Math.min(i.haze.far,f+r/2),p=Math.abs(f-this.lastBuild.radius)>=r/3,m=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!d&&!m&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,r),x=(M.minX+M.maxX)/2,g=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2,y=[],S=ot.uMoonDir.value,E=-S.x/Math.max(.2,S.y),b=-S.z/Math.max(.2,S.y),A=new Map,_=(k,ee)=>{let U=A.get(k);U||A.set(k,U=[]),U.push(ee)},w=this.mpp,L=a.angle*Math.PI/180,R=Ut.uUp.value.dot(this.v3.set(0,Math.cos(L),-Math.sin(L))),P=Ut.uUp.value,N=(k,ee,U,Q)=>{const le=(U.pad??0)*Q;return{x:k-P.x*le,y:-P.y*le,z:ee-P.z*le}};let I=0,F=0;for(const k of t.forest.treesNear(x,g,v)){const ee=this.assets.typeArt(k.type);if(!ee||!ee.layout.big.length)continue;const U=ee.atlas.frames,Q=ee.layout.big[X5(ee.layout.bigWeight,k.variant)],le=U[Q.top??Q.bot];if(!this.inView(k.x,k.z,le.w*w,le.h*w,r,u))continue;const _e=le.h*w,ne=i.treeCap,re=_e>ne.from?(ne.from+(_e-ne.from)*ne.keep)/_e:1,z=this.mark("tree",k.x,k.z,_e*re),K=N(k.x,k.z,U[Q.bot],w*re);_(k.type,{...K,frame:U[Q.bot],flip:k.flip,fresh:z,scale:re}),Q.top!==null&&_(k.type,{...K,frame:U[Q.top],flip:k.flip,top:!0,fresh:z,scale:re});const B=le.w*w,oe=le.h*w*(Q.top===null?.2:.6);i.shadows.trees&&y.push({x:k.x+E*oe,z:k.z+b*oe,w:B*.8,d:B*.45,scenery:!0}),I++}const G=(k,ee,U)=>{for(const Q of ee){const le=this.assets.typeArt(Q.type);if(!le)continue;const _e=U(le.layout);if(!_e.length)continue;const ne=_e[Q.variant%_e.length],re=le.atlas.frames,z=re[ne.bot],K=re[ne.top??ne.bot],B=k==="setpiece"?i.setPieceScale:1,oe=w*B;let ae=Q.x,ve=Q.z;if(ne.origin){const Se=Q.flip?z.w-ne.origin.x:ne.origin.x;ae+=(z.w/2-Se)*oe,ve+=(z.h-(z.pad??0)-ne.origin.y)*oe*R/Math.max(.2,Math.sin(L))}if(!this.inView(ae,ve,K.w*oe,K.h*oe,r,u))continue;const ge=this.mark(k,Q.x,Q.z,K.h*oe),ue=N(ae,ve,z,oe);_(Q.type,{...ue,frame:z,flip:Q.flip,fresh:ge,scale:B}),ne.top!==null&&_(Q.type,{...ue,frame:re[ne.top],flip:Q.flip,top:!0,fresh:ge,scale:B});const xe=z.w*oe*.3;k!=="setpiece"&&y.push({x:Q.x,z:Q.z-xe*.4,w:z.w*oe*.8,d:xe,scenery:!0}),F++}};G("small",t.forest.bushesNear(x,g,v),k=>k.small),G("wall",t.forest.wallsNear(x,g,v),k=>k.walls.map(ee=>({bot:ee,top:null}))),G("setpiece",t.forest.setPiecesNear(x,g,v),k=>k.set===null?[]:[k.set]);const q=this.assets.decorArt(),se=[];if(q)for(const k of t.forest.decorNear(x,g,v)){const ee=q.families[k.family];if(!ee?.length)continue;const U=ee[k.variant%ee.length],Q=q.atlas.frames,le=Q[U.bot],_e=Q[U.top??U.bot];if(!this.inView(k.x,k.z,_e.w*w,_e.h*w,r,u))continue;const ne=this.mark("decor",k.x,k.z,_e.h*w),re=N(k.x,k.z,le,w);se.push({...re,frame:le,flip:k.flip,fresh:ne}),U.top!==null&&se.push({...re,frame:Q[U.top],flip:k.flip,top:!0,fresh:ne});const z=le.w*w*.3;y.push({x:k.x,z:k.z-z*.4,w:le.w*w*.8,d:z,scenery:!0}),F++}q&&this.batchFor(this.decorBatches,"all",()=>new Ji(q.atlas,w,{scenery:!0,fade:!0}))?.set(se);for(const[k,ee]of this.typeBatches)A.has(k)||ee.set([]);for(const[k,ee]of A)this.batchFor(this.typeBatches,k,()=>{const Q=this.assets.typeArt(k);return Q&&new Ji(Q.atlas,w,{scenery:!0,fade:!0})})?.set(ee);{const k=t.map.treehouse;y.push({x:k.x,z:k.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=I,this.stats.bushes=F,this.shadowList=y}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const d=c.leashed?this.assets.partyArt(c.species,c.id,Cr(c.species)):void 0,f=d??this.assets.creatureArt(c.species),u=d?`party-${c.id}`:c.species;if(!f)continue;r.set(u,f);const p=f.atlas.frames[f.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const m=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=s.get(u);M||s.set(u,M=[]);const x=(e/o+c.id%4*.25)*Math.PI,g=c.leashed?Math.abs(Math.sin(x))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(x*.5)*.12:0;M.push({x:c.x+v,y:g,z:c.z,frame:p,flip:c.facing<0,fresh:m}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,d]of this.creatureBatches)s.has(c)||d.set([]);for(const[c,d]of s)this.batchFor(this.creatureBatches,c,()=>{const u=r.get(c);return u&&new Ji(u.atlas,this.mpp)})?.set(d);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new X(1,.5,.16);runeCyan=new X(.3,.9,1);runeViolet=new X(.75,.45,1);runeGreen=new X(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=ze(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:c,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(Qs,this.game.tuning.lightBudget),r=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,d)=>c.d-d.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=ot;let h=0;for(const{l:c,d}of r.slice(0,s)){const f=Math.min(1,Math.max(0,(a-d)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Tc(new jt,new ud({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Ut.uRight.value,i=Ut.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,m)=>[a.x+t.x*p*o+i.x*m*a.h,t.y*p*o+i.y*m*a.h,a.z+t.z*p*o+i.z*m*a.h],c=h(-1,0),d=h(1,0),f=h(1,1),u=h(-1,1);s.push(...c,...d,...d,...f,...f,...u,...u,...c,...c,...f)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new It(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=Ut.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),c=i[0].pad??0,d=Math.max(0,i[0].h-c-t.base.y)*r,f=c*r,u=s.x-(t.base.x-i[0].w/2)*r,p=s.z+d*h/Math.max(.2,Math.sin(o)),m={x:u-a.x*f,y:-a.y*f,z:p-a.z*f};return this.treehouseBatch.set([{...m,frame:i[0],flip:!1},{...m,frame:i[1],flip:!1,top:!0}]),m}render(e,t=!0){const i=this.game,s=i.tuning,r=nh(i);if(t){const ge=performance.now();this.lastReal&&(this.budget=Y5(this.budget,(ge-this.lastReal)/1e3,s)),this.lastReal=ge}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),ot.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new X(0,Math.cos(a),-Math.sin(a)),c=new X(r.tx,r.ty,r.tz),d=c.dot(h),f=c.x;c.addScaledVector(h,Math.round(d/o)*o-d),c.x+=Math.round(f/o)*o-f;const u=new X(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=s.spriteTilt;Ut.uUp.value.set(0,1,0).lerp(h,p).normalize(),Ut.uFacing.value.crossVectors(Ut.uRight.value,Ut.uUp.value).normalize();const m=jc(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,js(i.witch,s)*.5,i.witch.z).project(this.camera);Ut.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-m),Math.max(1,M.edge*this.width*(1-m))),Ut.uTopFade.value=m,Ut.uDebugCull.value=this.debugCull?1:0;const g=i.witch,v=js(g,s);ot.uGlowPos.value.set(g.x,v+s.glowHeight,g.z),ot.uHazeCentre.value.set(g.x,g.z),this.updateSources(e);const y=this.partyView.update(i,e,(ge,ue,xe,Se)=>this.inView(ge,ue,xe,Se,4),()=>!1);this.soundBatch.set(y.items),this.ground.setSweeps(y.sweeps),this.lasers.update(e,y.playing,g.x,g.z);{const ge=Ut,ue=s.party,xe=[...i.party.areas.values()].map(Se=>({a:Se,s:i.map.siteOf(Se.cell[0],Se.cell[1])})).sort((Se,Ie)=>Math.hypot(Se.s.x-g.x,Se.s.z-g.z)-Math.hypot(Ie.s.x-g.x,Ie.s.z-g.z)).slice(0,16);xe.forEach(({a:Se,s:Ie},$e)=>{const Rt=Se.wave===0?1:Math.min(1,Math.max(0,(e-Se.at)/Math.max(.01,ue.transition)));ge.uParty.value[$e].set(Ie.x,Ie.z,i.map.areaSize*.85,Rt);const Nt=Cr($t[i.map.typeOf(Se.cell[0],Se.cell[1])].creature);ge.uPartyCol.value[$e].set(Nt[0]/255,Nt[1]/255,Nt[2]/255)}),ge.uPartyCount.value=xe.length,ge.uUplight.value.set(ue.uplight.strength,ue.uplight.pulse,ue.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const S=this.assets.treehouse,E=S.atlas.frames[0],b=this.placeTreehouse(r.angle),A=Ut,_=(ge,ue)=>{const xe=A.uRight.value,Se=A.uUp.value,Ie=(ge-E.w/2)*this.mpp,$e=(E.h-ue)*this.mpp;return{x:b.x+xe.x*Ie+Se.x*$e,y:b.y+xe.y*Ie+Se.y*$e,z:b.z+xe.z*Ie+Se.z*$e}},w=S.lights.filter(ge=>ge.kind==="lantern"||ge.kind==="window").slice(0,2).map(ge=>({..._(ge.x,ge.y),reach:s.treehouse.lightReach,rgb:new X(ge.rgb[0]/255,ge.rgb[1]/255,ge.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+ge.x))}));this.setLights([this.dancefloor.update(e,this.ground),...y.lights,...w,...this.forestLights],g.x,g.z),ot.uTime.value=e,this.mist?.follow(r.tx,r.tz);const L=Math.sin(e*2.4)*.12,R=g.mode==="rising"&&g.lift<.9,P=g.mode==="descending"&&g.lift>.1;let N=R||P?(R?8:12)+(g.away?2:0)+Math.floor(e*7)%2:g.lean?6+(g.away?1:0):(g.away?3:0)+Math.floor(e*4)%3;if(!R&&!P){const ge=this.assets.witchFly,ue=g.away?"away":"towards";g.braking?N=ge.brake[ue][Math.floor(e*ge.brake.fps)%ge.brake[ue].length]:(g.boost??0)>.7&&(N=ge.fast[ue][Math.floor(e*ge.fast.fps)%ge.fast[ue].length])}const I=i.leash,F=this.assets.witchFoot,G=g.away?"away":"towards";for(const ge of I.events)ge.kind==="placed"||ge.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:ge.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const q=this.footAct?F[this.footAct.pose].towards.length/F[this.footAct.pose].fps:0,se=!!this.footAct&&e-this.footAct.at<q+.3,k=g.mode==="ground"&&(I.talk||I.held||se)?1:0,ee=Math.min(.1,Math.max(0,e-this.footTime)),U=this.foot;this.footTime=e,this.foot+=(k-this.foot)*Math.min(1,ee*8),Math.abs(k-this.foot)<.01&&(this.foot=k);const Q=(ge,ue)=>{const xe=F[ge][G];return xe[Math.max(0,Math.min(xe.length-1,ue))]};this.foot>.6?se&&this.footAct?N=Q(this.footAct.pose,Math.floor((e-this.footAct.at)*F[this.footAct.pose].fps)):I.talk?N=Q("talk",Math.floor(e*F.talk.fps)%F.talk[G].length):N=Q("stand",Math.floor(e*F.stand.fps)%F.stand[G].length):this.foot>.02&&(N=this.foot>=U?Q("land",Math.floor(this.foot*3)):Q("takeoff",Math.floor((1-this.foot)*3)));const le=this.foot*this.foot*(3-2*this.foot),_e=(v+L-.4)*(1-le),ne=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=g.seated?1:Math.max(0,this.seatK-ne/.6);let re=g.x,z=g.z,K=_e;if(this.seatK>0){const ge=_(S.seat.x,S.seat.y),ue=this.seatK*this.seatK*(3-2*this.seatK),xe=this.camera.getWorldDirection(this.v3);re+=(ge.x-xe.x*.6-re)*ue,K+=(ge.y-xe.y*.6-K)*ue,z+=(ge.z-xe.z*.6-z)*ue,g.seated&&(N=F.sit.towards[Math.floor(e*F.sit.fps)%F.sit.towards.length])}const B=this.assets.witch.frames[N],oe=K+B.h*this.mpp;this.witchBatch.set([{x:re,y:K,z,frame:B,flip:g.seated?!1:g.facing<0}]);{const ge=(Ie,$e,Rt)=>{const Nt=this.v3.set(Ie,$e,Rt).project(this.camera);return[(Nt.x+1)/2*this.width,(Nt.y+1)/2*this.height]},ue=ge(re,K,z),xe=ge(re,oe,z),Se=ge(re+B.w*this.mpp/2,K,z);Ut.uWitch.value.set((ue[0]+xe[0])/2,(ue[1]+xe[1])/2,Math.abs(Se[0]-ue[0])+1,Math.abs(xe[1]-ue[1])/2+1),Ut.uWitchDepth.value=-this.v3.set(re,this.seatK>0?K:v,z).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(re,.03,z),this.shadow.scale.setScalar((1-.5*jc(g))*(1-this.seatK)+.001),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,g.x,g.z);const ae=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,ae.x,ae.z,g.x,g.z,e,s.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,oe),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),g.x,g.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let ve=0;for(const ge of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])ve+=ge.dropped;ve&&!this.stats.dropped&&console.warn(`view: ${ve} sprite instances set but not drawn`),this.stats.dropped=ve,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const q5="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",$5="Lab default",Z5={},J5={_readme:q5,name:$5,style:Z5};function Q5(n=J5){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=Fb();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function j5(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let m=p.clientX-a,M=p.clientY-o;const x=Math.hypot(m,M);x>s&&(m*=s/x,M*=s/x),i.style.transform=`translate(${m}px, ${M}px)`;const g=Math.min(1,x/s),v=.15,y=g<v?0:(g-v)/(1-v)/Math.max(1e-6,g);e.x=m/s*y,e.y=M/s*y});const d=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d);const f=(p,m)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),m(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const eS=[{version:null,items:["Tapping the start screen on a phone starts the game again, wherever you tap"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],tS={entries:eS},bn=new URLSearchParams(location.search);let xs=X0(bn.get("seed"));xs===null&&(xs=Math.floor(Math.random()*1e6),bn.set("seed",String(xs)),history.replaceState(null,"","?"+bn.toString()+location.hash));const sn={...ss,bloom:{...ss.bloom},tiltShift:{...ss.tiltShift},shadows:{...ss.shadows},canopyShadow:{...ss.canopyShadow},mist:{...ss.mist},party:{...ss.party}};bn.get("shadows")==="off"&&(sn.shadows.on=!1);bn.get("canopy")==="off"&&(sn.canopyShadow.on=!1);bn.get("mist")==="off"&&(sn.mist.on=!1);const va=bn.get("tilt");va==="off"?sn.tiltShift.on=!1:(va==="before"||va==="after")&&(sn.tiltShift.on=!0,sn.tiltShift.where=va);bn.get("bloom")==="off"&&(sn.bloom.on=!1);bn.get("moonbeams")==="on"&&(sn.moonbeams=1);const nl=bn.get("fx");(nl==="pixel"||nl==="smooth")&&(sn.fx=nl);const tn=wp(xs,sn),Cd=[30,60,120,300,600,0];function Ld(n){sn.party.interval=n>0?n:1e9,tn.party.paused=n===0,tn.party.nextAt=tn.clock.time+sn.party.startDelay+sn.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Pc=sn.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&Cd.includes(+n)&&(Pc=+n)}catch{}const il=bn.get("wave");il!==null&&(Pc=il==="off"?0:Math.max(0,+il||0));const nS=document.getElementById("game"),sl=Q5(),si=new K5(nS,tn,{...sl,pixel:sn.pixelSize,treeSize:sl.treeSize*sn.treeHeight,crownWidth:sl.crownWidth*sn.crownWidth/sn.treeHeight});si.debugCull=bn.get("debug")==="cull";const gu=Number(bn.get("scenery"));bn.has("scenery")&&gu>0&&(si.sceneryFixed=gu);const cr=new qg;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),cr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),cr.touch.pauseWaves=!0});j5(document.body,cr.touch);si.rulers.on=bn.has("debug");const Pd=()=>{si.rulers.on=!si.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&Pd()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),Pd()});const Dd=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&Dd.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=Dd.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v131 · 776ce40";const iS=document.getElementById("news"),sS="v131 · 776ce40".split(" ")[0],rS=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);iS.innerHTML="<b>What's new</b>"+tS.entries.slice(0,3).map(n=>`<div>${n.version===null?`${sS} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${rS(e)}</li>`).join("")}</ul>`).join("");const aS=document.getElementById("seed");aS.innerHTML=`seed <a href="?seed=${xs}">${xs}</a>`;const Ql=document.getElementById("debug"),Dc=document.getElementById("start"),Id=document.getElementById("debug-buttons"),Ic=document.getElementById("wave"),oS=Ic.querySelector(".fill"),lS=Ic.querySelector(".label");let ji=bn.has("debug");Ql.classList.toggle("on",ji);Id.classList.toggle("on",ji);const Nd=()=>si.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Nd);Nd();let ro=!1;requestAnimationFrame(()=>setTimeout(async()=>{await si.prepare(),ro=!0,Dc.classList.remove("loading")},0));let xu=null;function Od(){if(!ro||!tn.clock.paused)return!1;try{xu??=new AudioContext,xu.resume()}catch{}return tn.clock.paused=!1,Dc.style.display="none",cr.clearPresses(),!0}cr.onAny=Od;Dc.addEventListener("pointerdown",n=>{n.preventDefault(),Od()});const Fd=document.getElementById("waves");Fd.innerHTML="waves every "+Cd.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");Fd.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;Ld(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});Ld(Pc);document.addEventListener("visibilitychange",()=>{document.hidden&&(Pa=0)});let Pa=0,Mu=60,rl=0,_a=0;function Ud(n){requestAnimationFrame(Ud);const e=Pa?(n-Pa)/1e3:0;Pa=n,rl++,_a+=e,_a>=.5&&(Mu=rl/_a,rl=0,_a=0);const t=cr.read();if(t.debug&&(ji=!ji,Ql.classList.toggle("on",ji),Id.classList.toggle("on",ji)),si.debugReadouts=ji,Ep(tn,t,e),!ro)return;const i=yp(tn.party,tn.map,tn.clock.time);oS.style.height=`${(1-i.gone)*100}%`;const s=sn.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(lS.textContent=`wave ${tn.party.wave} · ${tn.party.areas.size} areas · ${s}`,Ic.classList.toggle("paused",tn.party.paused),si.render(tn.clock.time),ji){const r=tn.witch,a=si.stats;Ql.textContent=[`fps    ${Mu.toFixed(0)}`,`seed   ${xs}`,`area   ${Hu(tn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${tn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Ud);window.witch={game:tn,view:si,areaUnderWitch:()=>Hu(tn),areaTypeId:n=>$t[n].id,spriteUp:()=>Ut.uUp.value,get ready(){return ro}};
