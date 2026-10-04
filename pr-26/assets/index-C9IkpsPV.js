(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Ai(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Pe(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ki(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=Pe(i,s,t),d=Pe(i+1,s,t),f=Pe(i,s+1,t),u=Pe(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}const Zn=(n,e,t)=>n+(e-n)*t,In=(n,e,t)=>Math.min(t,Math.max(e,n)),sn=n=>{const e=In(n,0,1);return e*e*(3-2*e)};function Af(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=In(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function bo(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function Tf(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),c=In(n.zoomStep+Math.sign(e),0,h-1),d=h>1?c/(h-1):0;let f=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(f,u);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*r),M=n.ax+(f-n.ax)*m,g=n.az+(u-n.az)*m,[x,v]=bo(n.tx,n.vx,t.x+M,o.follow,r),[y,w]=bo(n.ty,n.vy,t.y,o.follow,r),[E,b]=bo(n.tz,n.vz,t.z+g,o.follow,r),A=n.zoom+(d-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r)),S=a.treetop,C=In((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(S.boost-1)),0,1),T=(n.pull??0)+(S.cameraPull*C*sn(_)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:c,zoom:A,tx:x,ty:y,tz:E,vx:v,vy:w,vz:b,ax:M,az:g,lift:In(_,0,1),pull:T}}function Wu(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=sn(e),a=Zn(Zn(i.angleIn,i.angleOut,n.zoom),Zn(s.angleIn,s.angleOut,n.zoom),r),o=Zn(Zn(i.distanceIn,i.distanceOut,n.zoom),Zn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Rf=.1,Cf=()=>({time:0,paused:!0});function Lf(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Rf,e);return n.time+=t,t}const Pf={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Df={types:Pf};function Kr(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function qr(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const pe=(n,e,t)=>e+(t-e)*n(),pc=(n,e)=>e[Math.floor(n()*e.length)];function ft(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function yi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=ft(i,s,t),d=ft(i+1,s,t),f=ft(i,s+1,t),u=ft(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}function de(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,c,d]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(d*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},yo=4;function Vu(n,e,t,i=.12){const s=(r,a,o,h)=>{const c=o-r,d=h-a,f=Math.max(0,Math.min(1,((n-r)*c+(e-a)*d)/(c*c+d*d)));return Math.hypot(n-r-c*f,e-a-d*f)<i};switch((t%yo+yo)%yo){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const If=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function oh(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),c=r(o),d=r(o+1),f=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(d[0]-c[0],d[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const m=p/u,M=m*m,g=M*m;s.push([0,1].map(x=>.5*(2*c[x]+(-h[x]+d[x])*m+(2*h[x]-5*c[x]+4*d[x]-f[x])*M+(-h[x]+3*c[x]-3*d[x]+f[x])*g)))}}return e||s.push(n[i-1]),s}function Of(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const c=n[Math.max(0,h-1)],d=n[Math.min(r-1,h+1)];let f=d[0]-c[0],u=d[1]-c[1];const p=Math.hypot(f,u)||1;f/=p,u/=p;const m=n[h][2]/2;i.push([n[h][0]-u*m,n[h][1]+f*m]),s.push([n[h][0]+u*m,n[h][1]-f*m])}const a=(h,c,d,f)=>{let u=h[0]-c[0],p=h[1]-c[1];const m=Math.hypot(u,p)||1;return[h[0]+u/m*d/2*f,h[1]+p/m*d/2*f]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const _t=(n,e)=>[n[0]+e[0],n[1]+e[1]],Tn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function lo(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let d=c[0]-h[0],f=c[1]-h[1];const u=Math.hypot(d,f)||1,p=f/u*r,m=-d/u*r;for(let M=1;M<=i;M++){const g=(M-.5)/i,x=Tn(h,c,g),v=[x[0]+p*s-d/u*s*.5,x[1]+m*s-f/u*s*.5];a.push(Tn(h,c,g-.45/i),v,Tn(h,c,g+.35/i))}}return a}function lh(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let c=0,d=t.length-1;c<t.length;d=c++){const[f,u]=t[c],[p,m]=t[d];u>o!=m>o&&h.push(f+(o-u)/(m-u)*(p-f))}h.sort((c,d)=>c-d);for(let c=0;c+1<h.length;c+=2)for(let d=Math.max(0,Math.ceil(h[c]-.5));d<=Math.min(n-1,Math.floor(h[c+1]-.5));d++)i[a*n+d]=1}return i}function Nf(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,c,d,f,u)=>{const p=c+f,m=d+u;let M,g;if(p<0||m<0||p>=n||m>=e)M=f,g=u;else{const x=m*n+p;M=s[x]+f,g=r[x]+u}M*M+g*g<a(h)&&(s[h]=M,r[h]=g)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const d=h*n+c;t[d]&&(o(d,c,h,-1,0),o(d,c,h,0,-1),o(d,c,h,-1,-1),o(d,c,h,1,-1))}for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&o(d,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&(o(d,c,h,1,0),o(d,c,h,0,1),o(d,c,h,1,1),o(d,c,h,-1,1))}for(let c=0;c<n;c++){const d=h*n+c;t[d]&&o(d,c,h,-1,0)}}return{vx:s,vy:r}}class pt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:d=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(u+.5-t)/s,g=m*m+M*M;if(g>1)continue;const x=u*this.w+p;if(o&&!o.has(this.m[x]))continue;if(h<1){const E=c?yi(p/3.2,u/3.2,d)*c+(1-c)*.5:.5;if(ft(p,u,d+77)>h*(.4+E*1.2)*(1.15-g*.5))continue}const v=m*f,y=M*f,w=Math.hypot(v,y,Math.sqrt(Math.max(0,1-g))+.15);this.px(p,u,r,v/w,y/w,(Math.sqrt(Math.max(0,1-g))+.15)/w)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let d=0;d<=c;d++){const f=d/c,u=e+(i-e)*f,p=t+(s-t)*f,m=Math.max(.5,(r+(a-r)*f)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let g=Math.floor(u-m);g<=u+m;g++){const x=(g+.5-u)/m,v=(M+.5-p)/m;if(x*x+v*v>1)continue;const y=x*h,w=Math.hypot(y,v*.3,1);this.px(g,M,o,y/w,v*.3/w,1/w)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const c=(m,M,g,x,v,y)=>(m-v)*(x-y)-(g-v)*(M-y),d=Math.max(0,Math.floor(Math.min(i,r,o))),f=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let m=u;m<p;m++)for(let M=d;M<f;M++){const g=M+.5,x=m+.5,v=c(g,x,i,s,r,a),y=c(g,x,r,a,o,h),w=c(g,x,o,h,i,s);(v<0||y<0||w<0)&&(v>0||y>0||w>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(lh(this.w,this.h,oh(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(Of(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:d=l.LINE}={}){const{w:f,h:u}=this;if(o)for(let g=0;g<f*u;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:p,vy:m}=Nf(f,u,e);let M=r;if(!M){for(let g=0;g<f*u;g++)e[g]&&(M=Math.max(M,Math.hypot(p[g],m[g])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let g=0;g<u;g++)for(let x=0;x<f;x++){const v=g*f+x;if(!e[v])continue;if(h){this.m[v]=t;continue}const y=Math.hypot(p[v],m[v]),w=Math.min(1,Math.max(0,(y-.5)/M)),E=Math.min(2.6,(1-w)/Math.sqrt(Math.max(.02,1-(1-w)*(1-w))))*a;let b=p[v]/(y||1)*E+c[0],A=m[v]/(y||1)*E+c[1];const _=Math.hypot(b,A,1);this.m[v]=t,this.n[v*3]=b/_,this.n[v*3+1]=A/_,this.n[v*3+2]=1/_}if(s&&!h){const g=[];for(let x=0;x<u;x++)for(let v=0;v<f;v++){const y=x*f+v;if(e[y])for(const[w,E]of[[1,0],[-1,0],[0,1],[0,-1]]){const b=v+w,A=x+E;if(b<0||A<0||b>=f||A>=u)continue;const _=A*f+b;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==d){g.push(y);break}}}for(const x of g)this.m[x]=d}if(!h)for(let g=0;g<f*u;g++)e[g]&&(this.g[g]=i);return e}mark(e,t,i,s={}){return this.fillMask(lh(this.w,this.h,oh(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(d=>d.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((d,f)=>[...d].forEach((u,p)=>{const m=t[u];if(!m)return;const M=i+(a?o-1-p:p),g=s+f;this.inb(M,g)&&(h[g*this.w+M]=1,c.set(g*this.w+M,m))})),this.fillMask(h,l.BODY,{round:r,depth:2.5});for(const[d,f]of c)this.m[d]=f}}function gn(n,e,t,i=t.outline,s=Kr){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),c=o(),d=o(),f=h.getContext("2d").createImageData(r,a),u=c.getContext("2d").createImageData(r,a),p=d.getContext("2d").createImageData(r,a),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let g=0;g<r;g++){const x=M*r+g,v=n.m[x],y=x*4;if(!v){if(!m)continue;const _=[n.get(g+1,M),n.get(g-1,M),n.get(g,M+1),n.get(g,M-1)].find(C=>C);if(!_)continue;const S=m==="tint"?(e[_]||[0,0,0]).map(C=>C*.35|0):m;f.data.set([...S,255],y),u.data.set([128,128,255,255],y),p.data.set([128,128,255,255],y);continue}let w=e[v];v===l.LINE&&!w&&(w=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(_=>_*.55|0):m),w=w||[255,0,255],f.data.set([...w,If.has(v)?254:255],y);const E=n.n[x*3],b=n.n[x*3+1],A=n.n[x*3+2];u.data.set([E*127+128,b*127+128,A*255,255],y),p.data.set([-E*127+128,b*127+128,A*255,255],y)}return h.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(u,0,0),d.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:d,w:r,h:a}}const ns=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Br=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Vt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Jn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],P={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Jn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ns,cross:Br,dot:Vt};function ch(n,e=[0,1,0]){const t=ns(n);let i=Br(e,t);Math.hypot(...i)<1e-4&&(i=Br([0,0,1],t)),i=ns(i);const s=Br(t,i);return[t,s,i]}function Yu(n,e){const t=Vt(n,e.axes[0]),i=Vt(n,e.axes[1]),s=Vt(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),c=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(r,a,o)}function Xu(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,c=Vt(n,t),d=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=Vt(f,f),p=c*c*i,m=d*d*i,M=Math.sign(s)*s*s*u;return Math.sign(d)*r*m>M?Math.sqrt(u+m)*a-h:Math.sign(c)*r*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*r*a)+c*s)*a-o}function Ku(n,e){const t=Math.abs(Vt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Vt(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Vt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const Ff=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),hh=(n,e)=>n.type==="ell"?Yu(Jn(e,n.cw),n):n.type==="box"?Ku(Jn(e,n.cw),n):Xu(Jn(e,n.aw),n),br=(n,e)=>n.rough?hh(n,e)+Ff(e,n.rough):hh(n,e);class qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?ch(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?ch(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:ns(t),v:ns(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=Yu(Jn(e,i.c),i);else if(i.type==="box")s=Ku(Jn(e,i.c),i);else{const r=Jn(i.b,i.a),a=Math.max(1e-9,Vt(r,r)),o=i.r1-i.r2;s=Xu(Jn(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const uh={towards:.6,away:-.6},Uf=.52;function xn(n,{height:e,scale:t,facing:i="towards",yaw:s=uh[i]??uh.towards,pitch:r=Uf,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),c=Math.cos(r),d=Math.sin(r),f=N=>[N[0]*o-N[2]*h,N[1],N[0]*h+N[2]*o],u=N=>[N[0]*o+N[2]*h,N[1],-N[0]*h+N[2]*o],p=[0,-d,-c],m=[0,c,-d],M=[1,0,0],g=[0,d,c],x=n.blend,v=n.parts.map(N=>{if(N.type==="ell"){const oe=f(N.c),ge=N.axes.map(f),Me=Math.max(...N.r);return{...N,cw:oe,axes:ge,bc:oe,br:Me+(N.rough||0)*1.5}}if(N.type==="box"){const oe=f(N.c),ge=N.axes.map(f);return{...N,cw:oe,axes:ge,bc:oe,br:Math.hypot(...N.h)+(N.rough||0)*1.5}}const Z=f(N.a),j=f(N.b),ce=Jn(j,Z),ye=Math.max(1e-9,Vt(ce,ce)),_e=N.r1-N.r2;return{...N,aw:Z,ba:ce,l2:ye,rr:_e,a2:ye-_e*_e,il2:1/ye,bc:P.lerp(Z,j,.5),br:Math.sqrt(ye)/2+Math.max(N.r1,N.r2)}}),y=n.flats.map(N=>{const Z=f(N.c),j=f(N.u),ce=f(N.v);return{...N,cw:Z,uw:j,vw:ce,nw:ns(Br(j,ce)),bc:Z,br:Math.hypot(N.su,N.sv)}}),w=[...v,...y],E=N=>{const Z=Vt(N.bc,M),j=Vt(N.bc,m),ce=N.br+(N.uw?0:x);return[Z-ce,Z+ce,j-ce,j+ce]};for(const N of w)[N.x0,N.x1,N.u0,N.u1]=E(N);const b=w.filter(N=>!N.extra&&!N.cut),A=Math.min(...b.map(N=>N.u0+(N.uw?0:x))),_=Math.max(...b.map(N=>N.u1-(N.uw?0:x))),S=t??e/Math.max(1e-6,_-A),C=Math.min(...w.map(N=>N.x0)),T=Math.max(...w.map(N=>N.x1)),L=Math.min(...w.map(N=>N.u0)),O=Math.max(...w.map(N=>N.u1)),I=Math.ceil((T-C)*S)+4,k=Math.ceil((O-L)*S)+2,H=new pt(I,k),K=new Float32Array(I*k).fill(1/0),ae=new Int16Array(I*k).fill(-1),q=8,ie=Math.ceil(I/q),F=Math.ceil(k/q),ee=Array.from({length:ie*F},()=>[]);w.forEach((N,Z)=>{const j=Math.max(0,Math.floor((N.x0-C)*S/q)),ce=Math.min(ie-1,Math.floor(((N.x1-C)*S+2)/q)),ye=Math.max(0,Math.floor((O-N.u1)*S/q)),_e=Math.min(F-1,Math.floor(((O-N.u0)*S+1)/q));for(let oe=ye;oe<=_e;oe++)for(let ge=j;ge<=ce;ge++)ee[oe*ie+ge].push(Z)});const se=.25/S,ue=(N,Z)=>{const j=Math.max(x-Math.abs(N-Z),0)/x;return Math.min(N,Z)-j*j*x*.25};for(let N=0;N<k;N++)for(let Z=0;Z<I;Z++){const j=ee[Math.floor(N/q)*ie+Math.floor(Z/q)];if(!j.length)continue;const ce=C+(Z+.5-1)/S,ye=O-(N+.5)/S,_e=P.add(P.add(P.mul(M,ce),P.mul(m,ye)),P.mul(g,50));let oe=1/0,ge=-1/0;const Me=[],Ne=[];for(const tt of j){const Xe=w[tt],U=Jn(_e,Xe.bc),R=Vt(U,p),G=Xe.br+(Xe.uw?0:x),$=Vt(U,U)-G*G,te=R*R-$;if(te<0)continue;if(Xe.uw){Ne.push(Xe);continue}if(Xe.cut){Me.push(Xe);continue}const me=Math.sqrt(te);oe=Math.min(oe,-R-me),ge=Math.max(ge,-R+me),Me.push(Xe)}let Ze=1/0,lt=-1,gt=0,ut=null;if(Me.length){const tt=new Map;for(const R of Me){let G=tt.get(R.group);G||tt.set(R.group,G=[]),G.push(R)}const Xe=(R,G)=>{let $=1/0;for(const te of R)te.cut||($=$===1/0?br(te,G):ue($,br(te,G)));for(const te of R)te.cut&&($=Math.max($,-br(te,G)));return $};let U=Math.max(0,oe);for(let R=0;R<96&&U<ge;R++){const G=P.add(_e,P.mul(p,U));let $=1/0,te=null;for(const[me,ve]of tt){const re=Xe(ve,G);re<$&&($=re,te=me)}if($<se){const me=tt.get(te),ve=.5/S;ut=ns([Xe(me,[G[0]+ve,G[1],G[2]])-Xe(me,[G[0]-ve,G[1],G[2]]),Xe(me,[G[0],G[1]+ve,G[2]])-Xe(me,[G[0],G[1]-ve,G[2]]),Xe(me,[G[0],G[1],G[2]+ve])-Xe(me,[G[0],G[1],G[2]-ve])]);let re=me[0],le=1/0;for(const be of me){if(be.cut)continue;const ke=br(be,G);ke<le&&(le=ke,re=be)}for(const be of me)if(be.cut&&-br(be,G)>le-se*2){re=be;break}Ze=U,lt=te,gt=re.paint?re.paint(u(G),re)??re.mat:re.mat;break}U+=Math.max($*.9,se*.5)}}for(const tt of Ne){const Xe=Vt(p,tt.nw);if(Math.abs(Xe)<1e-4)continue;const U=Vt(Jn(tt.cw,_e),tt.nw)/Xe;if(U>=Ze)continue;const R=P.add(_e,P.mul(p,U)),G=Jn(R,tt.cw),$=Vt(G,tt.uw)/tt.su,te=Vt(G,tt.vw)/tt.sv;if(Math.abs($)>1||Math.abs(te)>1)continue;const me=tt.mask($,te);if(!me)continue;let ve=Xe>0?P.mul(tt.nw,-1):tt.nw;ve=ns(P.add(ve,P.add(P.mul(tt.uw,$*tt.bend),P.mul(tt.vw,te*tt.bend*.5)))),Ze=U,lt=tt.group,gt=me,ut=ve}if(!ut||!gt)continue;const Y=N*I+Z;K[Y]=Ze,ae[Y]=lt,H.px(Z,N,gt,Vt(ut,M),-Vt(ut,m),Vt(ut,g))}const xe=[];for(let N=0;N<k;N++)for(let Z=0;Z<I;Z++){const j=N*I+Z;if(H.m[j])for(const[ce,ye]of[[1,0],[-1,0],[0,1],[0,-1]]){const _e=Z+ce,oe=N+ye;if(_e<0||oe<0||_e>=I||oe>=k)continue;const ge=oe*I+_e;if(H.m[ge]&&ae[ge]!==ae[j]&&K[ge]-K[j]>a){xe.push(j);break}}}for(const N of xe)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(H.m[N])||(H.m[N]=l.LINE);for(let N=0;N<k;N++)for(let Z=0;Z<I;Z++){const j=N*I+Z;if(H.m[j]!==l.EYE)continue;const ce=N>0&&H.m[j-I]===l.EYE,ye=Z>0&&H.m[j-1]===l.EYE,_e=Z+1<I&&H.m[j+1]===l.EYE&&N+1<k&&H.m[j+I]===l.EYE;!ce&&!ye&&_e&&(H.m[j]=l.GLINT)}let Ce=-1;for(let N=k-1;N>=0&&Ce<0;N--)for(let Z=0;Z<I;Z++)if(H.m[N*I+Z]){Ce=N;break}const B=Ce>=0&&Ce<k-1?k-1-Ce:0;if(Ce>=0&&Ce<k-1){const N=k-1-Ce;for(let Z=k-1;Z>=0;Z--)for(let j=0;j<I;j++){const ce=Z*I+j,ye=(Z-N)*I+j,_e=Z-N>=0;H.m[ce]=_e?H.m[ye]:0,H.g[ce]=_e?H.g[ye]:0;for(let oe=0;oe<3;oe++)H.n[ce*3+oe]=_e?H.n[ye*3+oe]:0}}return H.bodyH=Math.round((_-A)*S),{sp:H,s:S,project:N=>{const Z=f(N);return[+((Z[0]-C)*S+1).toFixed(1),+((O-Vt(Z,m))*S+B).toFixed(1)]}}}const ci=(n,e=9,t=.3)=>ft(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Ss={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},kf={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},dh={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Bf(n,e=dh){const t={...dh,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(kf)){const[o,h,c]=t[r];s[a]=de(i[r]??o,h,c)}return s[l.EYE]=[24,18,30],s[l.GLINT]=[255,255,245],s[l.NOSE]=[20,16,24],s[l.MAGIC]=de(n.glowHue??.13,.5,1),s[l.MAGIC2]=de(n.glowHue??.13,.15,1),s[l.BELLY]=[245,245,240],s}const zf={rise:.78,descend:-.66,brake:.44};function Hf(n){const e=new qe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=m=>i-s*(m/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,s*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,a(.5)+.03,m*.045]),h=[-1,1].map(m=>[.2,i+.24+r[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,g=M>0?7:5;e.seg(h[m],o[m],.04,.03,l.JACKET,{group:g}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:g})}const c=[.3+r[0],i+.27+r[1],0],d=[.07,i+.28+r[1]*.5,0],f=[-.15,i+.35+r[2],0];e.ell(d,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<d[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(f,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...P.add(f,[-.02,.06,0]),.07],[...P.add(f,[-.18,.08+r[0]*2,0]),.05],[...P.add(f,[-.34,.05+r[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([m,M],g)=>{const x=g?6:4,v=P.add(f,[-.04,0,g?.06:-.06]);e.seg(v,m,.055,.045,l.JEANS,{group:x}),e.seg(m,M,.045,.04,l.JEANS,{group:x}),e.ell(P.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:x,paint:y=>y[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const M=qe.surface(c,[.11,.115,.1],P.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(P.add(M,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(qe.surface(c,[.11,.115,.1],P.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...P.add(c,[-.06,.03,0]),.065],[...P.add(c,[-.22,.05+r[1]*2,.01]),.05],[...P.add(c,[-.4,.06+r[2]*3,.02]),.03],[...P.add(c,[-.55,.07+r[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(P.add(c,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...P.add(c,[-.005,.03,-.095]),.015],[...P.add(c,[-.02,.12,0]),.015],[...P.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=P.add(c,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...P.add(p,[-.02,.02,0]),.08],[...P.add(p,[-.14,.13,0]),.04],[...P.add(p,[-.3,.14+r[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(P.add(p,[.08,-.02,.08]),P.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11});for(const[m,M,g,x]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([m-v,M,g],[m-v-x,M,g],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const qu={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Qs=.34,$u={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Gf={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:$u})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Qs+.14,.15],far:[.18,Qs+.14,-.13],hand:"rest"}))};function Wf(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=P.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function Vf(n,e){const t=Gf[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:$u,...t[e%t.length]},s=new qe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?Qs+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,c=!!i.broom.astride,d=o-.04,f=c?[1,0,0]:P.norm(i.broom.dir),u=c?[-.36,d,0]:i.broom.binding,p=S=>P.add(u,P.mul(f,S));s.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:f,group:3,paint:S=>{const C=P.dot(P.sub(S,u),f);return C<-.22?l.MAGIC2:C>-.01?l.BROOM:void 0}});for(const S of[-1,1]){const C=S>0?6:4,T=[h,o,S*.07],L=i.sit?i.swing*S:0,O=i.sit?[.24+L,.09+Math.max(0,L)*.6,S*.1]:S>0&&i.legUp?i.legUp:[(S>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),S*.1],I=i.sit?[.21,o+.01,S*.09]:Wf(T,O,.21);s.seg(T,I,.055,.045,l.JEANS,{group:C}),s.seg(I,O,.045,.04,l.JEANS,{group:C});const k=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(P.add(O,k),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:C,paint:H=>H[1]<O[1]+k[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],g=[h,o+.03,0];s.ell(g,[.1,.08,.105],l.JEANS,{group:1});const x=P.add(g,P.add(P.mul(m,.19),[0,i.breathe,0]));s.ell(x,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:S=>P.dot(P.sub(S,x),M)>.045&&Math.abs(S[2])<.05?l.TOP:void 0}),s.chain([[...P.add(x,P.add(P.mul(M,-.07),P.mul(m,-.08))),.07],[...P.add(x,P.add(P.mul(M,-.11-a),P.mul(m,-.2))),.05],[...P.add(x,P.add(P.mul(M,-.13-a*1.6),P.mul(m,-.29))),.025]],l.JACKET,{group:12});const v=P.add(x,P.add(P.mul(m,.27),[i.look*.03,0,i.tilt*.04])),y=S=>P.add(x,P.add(P.mul(m,.1),[0,0,S*.12])),w=c?[.28,d+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,f[1]))),E=c?[.28,d+.03,.05]:i.free;for(const S of[-1,1]){const C=S>0?7:5,T=y(S),L=S>0?E:i.far||w,O=S>0&&i.elbow?i.elbow:P.add(P.lerp(T,L,.5),[-.03,-.02,S*.05]);s.seg(T,O,.04,.035,l.JACKET,{group:C}),s.seg(O,L,.035,.03,l.JACKET,{group:C});const I=S>0&&!c?i.hand:"grip";if(I==="palm")s.ell(L,[.045,.02,.04],l.SKIN,{group:C});else if(I==="down")s.ell(L,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:C});else if(I==="wave"){s.ell(L,[.03,.045,.04],l.SKIN,{group:C});for(const k of[-1,0,1])s.seg(P.add(L,[0,.03,k*.02]),P.add(L,[k*.01,.065,k*.03]),.01,.008,l.SKIN,{group:C})}else I==="point"?(s.ell(L,[.035,.03,.035],l.SKIN,{group:C}),s.seg(P.add(L,[0,.02,0]),P.add(L,[.01,.08,0]),.012,.01,l.SKIN,{group:C})):s.ell(L,[.035,.03,.035],l.SKIN,{group:C})}s.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:S=>S[0]<v[0]-.01||S[1]>v[1]+.075?l.HAIR:void 0});for(const S of[-1,1])s.ell(qe.surface(v,[.11,.115,.1],P.norm([.85,.05+i.look,S*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&s.ell(qe.surface(v,[.11,.115,.1],P.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),s.chain([[...P.add(v,[-.06,.02,0]),.06],[...P.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...P.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const S of[-1,1])s.ell(P.add(v,[-.015,0,S*.105]),[.05,.055,.03],l.PHONES,{group:10});s.chain([[...P.add(v,[-.005,.03,-.095]),.015],[...P.add(v,[-.005,.11,-.05]),.015],[...P.add(v,[-.005,.125,0]),.015],[...P.add(v,[-.005,.11,.05]),.015],[...P.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const b=P.add(v,[-.03,.1,i.tilt*.02]),A=i.tilt*.05,_=P.add(b,[-.16-a*.5,.27,A*2]);return s.ell(b,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...P.add(b,[0,.01,0]),.085],[...P.add(b,[-.05,.17,A]),.045],[..._,.012]],l.HAT,{group:11,paint:S=>S[1]<b[1]+.045?l.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),s.anchors.hand=E,s.anchors.hatTip=_,s}function Zu({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return Hf(n);if(qu[t])return Vf(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new qe({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),d=.42+h,f=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],m=s?1:i?-.6:0;o.seg([-.5,d-c*2,0],[.62,d+c*3,0],.022,.018,l.BROOM,{group:2}),r?o.ell([-.56,d-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:y=>y[1]<d-.18?l.MAGIC2:y[1]>d-.01?l.BROOM:void 0}):o.ell([-.62,d-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:y=>y[0]<-.72?l.MAGIC2:y[0]>-.5?l.BROOM:void 0});for(const y of[-1,1]){const w=[-.04,d+.06,y*.07],E=r?[.18,d-.01,y*.14]:s?[.16,d-.05,y*.14]:i?[.06,d-.07,y*.14]:[.12+f*.5,d-.02,y*.14],b=r?y>0?[.44,d-.02+p,y*.13]:[.3,d-.16,y*.13]:s?[.2,d-.26,y*.13]:i?[-.1,d-.23,y*.13]:[.08+f,d-.2,y*.13];o.seg(w,E,.055,.045,l.JEANS,{group:y>0?6:4}),o.seg(E,b,.045,.04,l.JEANS,{group:y>0?6:4}),o.ell(P.add(b,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:y>0?6:4,paint:A=>A[1]<b[1]-.04?l.BELLY:void 0})}o.ell([-.04,d+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+f*.8,d+.26-Math.abs(f)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:y=>y[0]>M[0]+.04&&Math.abs(y[2])<.055?l.TOP:void 0}),r?o.chain([[...P.add(M,[-.08,-.06,0]),.07],[...P.add(M,[-.02,.12+p,.02]),.05],[...P.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...P.add(M,[-.08,-.1,0]),.07],[...P.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...P.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const g=P.add(M,[.03+f*.5,.26,0]),x=P.add(g,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const y of[-1,1]){const w=P.add(M,[.01,.11,y*.11]),E=s&&y>0?P.add(x,[.1,.01,.1]):r?[.3,d+.03,y*.05]:[.26+f,d+.03,y*.05],b=s&&y>0?P.add(w,[.1,.02,.1]):P.lerp(w,E,.5);o.seg(w,b,.04,.035,l.JACKET,{group:y>0?7:5}),o.seg(b,E,.035,.03,l.JACKET,{group:y>0?7:5}),o.ell(E,[.035,.03,.035],l.SKIN,{group:y>0?7:5})}o.ell(g,[.11,.115,.1],l.SKIN,{group:8,paint:y=>y[0]<g[0]-.01||y[1]>g[1]+.075?l.HAIR:void 0});for(const y of[-1,1])o.ell(qe.surface(g,[.11,.115,.1],P.norm([.85,.05,y*.45])),[.016,.026,.016],l.EYE,{group:8});r?o.chain([[...P.add(g,[-.06,.06,0]),.06],[...P.add(g,[.04,.13+p,.03]),.045],[...P.add(g,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...P.add(g,[-.06,.02,0]),.06],[...P.add(g,[-.18-u,-.05+p+m*.1,.02]),.045],[...P.add(g,[-.3-u*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const y of[-1,1])o.ell(P.add(g,[-.015,0,y*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...P.add(g,[-.005,.03,-.095]),.015],[...P.add(g,[-.005,.11,-.05]),.015],[...P.add(g,[-.005,.125,0]),.015],[...P.add(g,[-.005,.11,.05]),.015],[...P.add(g,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(x,[.16,.014,.15],l.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(r?[[...P.add(x,[0,.01,0]),.085],[...P.add(x,[.06,.16,0]),.045],[...P.add(x,[.2,.22+p*.5,0]),.012]]:[[...P.add(x,[0,.01,0]),.085],[...P.add(x,[-.05-u-v*.5,.17-v*.3,0]),.045],[...P.add(x,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:y=>y[1]<x[1]+.045?l.MAGIC:void 0}),a){const y=zf[t]+(r?[0,.06][n%2]:0),w=Math.cos(y),E=Math.sin(y),b=[0,d,0],A=T=>[b[0]+(T[0]-b[0])*w-(T[1]-b[1])*E,b[1]+(T[0]-b[0])*E+(T[1]-b[1])*w,T[2]],_=T=>[b[0]+(T[0]-b[0])*w+(T[1]-b[1])*E,b[1]-(T[0]-b[0])*E+(T[1]-b[1])*w,T[2]],S=T=>[T[0]*w-T[1]*E,T[0]*E+T[1]*w,T[2]];for(const T of o.parts)if(T.type==="ell"?(T.c=A(T.c),T.axes=T.axes.map(S)):(T.a=A(T.a),T.b=A(T.b)),T.paint){const L=T.paint;T.paint=(O,I)=>L(_(O),I)}for(const T of o.flats)T.c=A(T.c),T.u=S(T.u),T.v=S(T.v);const C=Math.min(...o.parts.map(T=>T.type==="ell"?T.c[1]-Math.max(...T.r):Math.min(T.a[1]-T.r1,T.b[1]-T.r2)));if(C<.08)for(const T of o.parts){const L=.08-C;T.type==="ell"?T.c=[T.c[0],T.c[1]+L,T.c[2]]:(T.a=[T.a[0],T.a[1]+L,T.a[2]],T.b=[T.b[0],T.b[1]+L,T.b[2]])}if(r){const T=A([-.45,d-.24,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.055-L*.008;o.ell([T[0]+.1+O*.08,Math.max(.04,T[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],L<2?l.BELLY:L%2?l.MAGIC:l.MAGIC2,{group:25+L,extra:!0})}}if(i){const T=A([-.8,d,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.05-L*.007;o.ell([T[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,T[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],L%2?l.MAGIC:l.MAGIC2,{group:20+L,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const mc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),wo=new Map,Ju=n=>(wo.has(n)||wo.set(n,xn(Zu({frame:0}),{height:n}).s),wo.get(n)),pr=(n={})=>Ju(mc(n));function Yf(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s}={}){const r=mc(n),a=Zu({frame:e,lean:t,pose:s}),{sp:o,project:h}=s?xn(a,{scale:Ju(r),facing:i}):xn(a,{height:r,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let c=0;for(let d=0;d<400&&c<6;d++){const f=d*37%o.w,u=d*53%Math.floor(o.h*.8);o.get(f,u)||o.get(f+1,u)||o.get(f-1,u)||o.get(f,u+1)||o.get(f,u-1)||(f*7+u*13+e*5)%11||(o.px(f,u,l.MAGIC2),c++)}return o}const dt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},qs=n=>{const e=dt(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Xf=n=>e=>{const t=dt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Ci=(n,e,t,i,s=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?l.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?l.STONED:void 0}),jr=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Xf(e)}),un=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:qs}),ea=(n,e,t,i,s,r=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=dt(s,o)*6.283,c=t*Math.sqrt(dt(o,s)),d=Math.cos(h)*c,f=Math.sin(h)*c*.7;n.ell([d,r*.3,f],[.07,r*(.35+dt(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?l.LEAF:void 0})}},ta=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),Kf={"sleeping-giant"(n){const e=t=>i=>{const s=dt(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?l.LEAF3:s>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Ci(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Ci(n,[-.2,.16,.95],[.2,.15,.18],4),Ci(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),ea(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),ta(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+dt(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+dt(e,2)*.7,a=P.add(s,[0,r,0]);n.seg(s,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:qs});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...P.add(a,P.add(P.mul(c,.45),[0,.18,0])),.04],[...P.add(a,P.add(P.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Ci(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){ta(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=P.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(P.dot(P.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&dt(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(P.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(P.add(e,P.add(P.mul(t,i*.4),[0,.1,-.42])),P.add(e,P.add(P.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),ea(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=P.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,c=Math.hypot(o,h),d=Math.atan2(h,o);return c>r*.82||c<r*.18?l.BARKD:Math.abs(Math.sin(d*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=dt(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(dt(t,o)-.5)*.5,.25+o*.25+dt(o,t)*.2,r*(1-o*.3)+(dt(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>dt(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])un(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])jr(n,t,i,3);un(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return dt(i,s)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+dt(e)*.35;n.box(P.add(i,[0,s/2,0]),[.13,s/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>s*.85?l.MOSS:void 0});const r=P.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,P.add(r,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(P.add(r,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>dt(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],P.add(e,[Math.cos(s)*.08,.1+dt(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>dt(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?l.BARKL:void 0})},"root-arch"(n){un(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),un(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),un(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),un(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])jr(n,e,t,4);for(let e=0;e<4;e++)Ci(n,[-.7+e*.45,.12,(dt(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>dt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Ci(n,[-1.4+e*.7,.12,.9+dt(e)*.3],[.2,.15,.18],4+e);ea(n,16,1.8,10,9,.25)},"heron-rookery"(n){un(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{un(n,[[...s,.07],[...r,.04]],2),n.ell(P.add(r,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<r[1]+.02?l.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])jr(n,s,r,7);const t=P.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...P.add(t,[.12*i,.06*i,0]),.035*i],[...P.add(t,[.2*i,.22*i,0]),.03*i],[...P.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(P.add(t,[.18*i,.33*i,0]),P.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const s of[-.04,.04])n.seg(P.add(t,[0,-.06*i,s]),P.add(t,[.02,-.42,s]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&dt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+dt(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,P.add(s,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(P.add(s,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=dt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){ta(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=dt(e,7)*6.283,i=1.5+dt(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+dt(e,9)*.5;n.seg(s,P.add(s,[0,r,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(P.add(s,[0,r-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){ta(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+dt(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Ci(n,[.3,.07,.3],[.09,.07,.08],6,!1),Ci(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?l.MAGIC2:void 0});ea(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){un(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>un(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),un(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),un(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:r}),n.ell(P.add(s,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:r}),n.seg(P.add(s,[.15,.07,0]),P.add(s,[.22,.05,0]),.015,.004,l.BODY2,{group:r}),n.seg(P.add(s,[-.1,0,0]),P.add(s,[-.22,-.04,0]),.04,.015,l.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],P.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(P.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),P.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(P.add(i,[0,-.27,0]),P.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>dt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Ci(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(P.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),P.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(P.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(P.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:qs}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:qs});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:qs});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;un(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:qs(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){un(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),un(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),un(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;un(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])jr(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(dt(e,1)-.5)*3,.05+dt(e,2)*.5,(dt(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=dt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},Qu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function qf(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new pt(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function $f(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:de(i,.45,.36),[l.BARKD]:de(i+.03,.5,.17),[l.BARKL]:de(i,.35,.55),[l.BARK2]:de(i+.02,.45,.26),[l.LEAF]:de(t,.55,.45),[l.LEAF2]:de(t-.03,.5,.62),[l.LEAF3]:de(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:de(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:de(e.magicHue??.45,.6,1),[l.MAGIC2]:de(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function Zf(n,e,t,i=16){const s=new qe({blend:.05});Kf[n](s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=(Object.values(Qu).find(([u])=>u===n)||[,,1])[2],a=xn(s,{scale:pr(t)*r}),{sp:o,x0:h,y0:c}=qf(a.sp),[d,f]=a.project([0,0,0]);return{sp:o,colours:$f(e,t),origin:{x:+(d-h).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const Jf=1.3,Qf=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*Jf,n.growth],yr=(n,e,t=1)=>Math.round(e.size*Qf(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),gc=(n,e)=>{const t=qr(e);for(let i=0;i<9;i++){const s=Math.floor(pe(t,2,n.w-2)),r=Math.floor(pe(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,l.MAGIC)}};function co(n,e,t,i,s,r,a,o){const h=P.add(e,[-i*.7,i*(.75+s),t*i*.35]),c=P.norm(P.sub(h,e)),d=P.norm(P.sub([1,0,0],P.mul(c,P.dot([1,0,0],c)))),f=Math.hypot(...P.sub(h,e));n.flat(P.add(P.lerp(e,h,.5),P.mul(d,-i*.14)),c,d,f*.55,i*.34,Ss.wing(r,a),{group:o,extra:!0})}const xc=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),yr(1,e)*t*.72))):n===2?Math.round(Math.max(yr(1,e)*t*1.08,Math.min(yr(2,e,t),yr(1,e)*1.4))):yr(n,e)*t;let Na=null;function jf(n,e){const t=Na;Na=n;try{return e()}finally{Na=t}}const e0=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},t0=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Mc(n){const e=Na,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:P.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:P.norm([1,.4,0])},a=P.norm(r.dir),o=P.norm(P.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=P.cross(a,o),c=[],d=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const g=M/16*Math.PI*2,x=P.add(P.mul(o,Math.cos(g)),P.mul(h,Math.sin(g)));let v=0;for(;v<.8&&n.field(P.add(r.c,P.mul(x,v)))<0;)v+=.01;v>=.8&&(v=r.r),c.push([...P.add(r.c,P.mul(x,v+d*.7)),d])}n.chain(c,l.COLLAR,{group:60,extra:!0});const f=c.reduce((M,g)=>g[0]-g[1]*.6+g[2]*.5>M[0]-M[1]*.6+M[2]*.5?g:M),u=d*1.3*(r.tag||1),p=P.norm(P.add(P.norm(P.sub(f.slice(0,3),r.c)),[.3,-.5,.3]));let m=f.slice(0,3);for(let M=0;M<60&&n.field(m)<u*.4;M++)m=P.add(m,P.mul(p,.01));n.ell(m,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||P.add(qe.surface(i.c,i.r,P.norm([-.15,1,.1])),[0,s*.1,0]),o=P.norm([.3,1,.35]),h=r*1.5,c=P.add(a,P.mul(o,h));n.seg(P.add(a,P.mul(o,-r*.1)),c,r*.48,r*.04,l.HAT1,{group:61,extra:!0,paint:d=>Math.floor(P.dot(P.sub(d,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[r*.17,r*.17,r*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=c=>P.add(c,P.mul(P.norm(P.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(P.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[r,a]){const d=P.norm(P.sub(c,i.c)),f=P.norm(P.cross([0,1,0],d)),u=P.cross(d,f),p=e.glasses==="heart"?t0:e0,m=h*1.5;n.flat(o(c),f,u,m,m,(M,g)=>p(M,g)?p(M*1.3,g*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=P.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:r.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&ci(c,60,.28)?l.GLINT:void 0})}}function n0(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=F=>a&&n.legend.includes(F),d=new qe,f=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,m=t?-.04:0,M=1+m,g=r.chest*(a?1.06:1)/p+m,x=r.tuck/p+m,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),y=.06*r.legW*(a?1.1:h?1.7:1),w=r.back==="hump"?.1:0,E=r.back==="arch"?.1:0,b=g+.12,A=F=>{if(r.belly&&F[1]<b&&F[0]>-u*.5)return l.BELLY;if(r.saddle&&F[1]>M-.18&&F[0]<u*.55)return l.BODY2;if(r.spots&&F[1]>g+.1&&ci(F,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?l.BELLY:r.spots==="young"?void 0:l.BODY3;if(r.ridge&&F[1]>M-.08+w*.5)return l.BODY3};if(d.ell([u*.48,(M+g)/2+w*.5,0],[u*.62,(M-g)/2+w*.5,v],l.BODY,{paint:A}),d.ell([-u*.5,(M+x)/2+E*.6,0],[u*.58,(M-x)/2+E*.6,v*.93],l.BODY,{paint:A}),d.ell([0,(M+(g+x)/2)/2+.02,0],[u*.6,(M-(g+x)/2)/2,v*.9],l.BODY,{paint:A}),r.ridge)for(let F=0;F<(a?16:10);F++){const ee=-u*.8+F*u*1.75/(a?15:9),se=(.07+(a?.04:0))*(1+.5*Math.max(0,ee/u));d.ell([ee,M+.02+w*Math.max(0,1-Math.abs(ee/u-.5)*2)+se*.5,0],[se,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let F=0;F<14;F++){const ee=F/14*Math.PI*2;d.ell([u*Math.cos(ee)*.7,(M+g)/2+Math.sin(ee)*.2,v*(F%2?.5:-.5)],[.16,.14,.14],l.BODY)}const _=[.32,-.32][t],S=(F,ee)=>{const se=ee*v*.62,ue=F?u*.62:-u*.62,xe=(F?1:-1)*ee*_,Ce=F?g+.1:x+.15,B=(F?ee:-ee)*(t?1:-1)>0?.06:0,z=[ue+Math.sin(xe)*.2+(F?.02:.1),Math.max(.3,Ce*.55),se],N=[ue+Math.sin(xe)*.42,.05+B,se],Z=[ue,Ce+.12,se*.8],j=ee>0?r.legMat||l.BODY:r.legMat?l.BODY3:l.BODY2,ce=F?[[...Z,y*1.5],[...z,y*1.05],[...N,y*.9]]:[[...Z,y*2*(r.haunch||1)],[...P.add(z,[-.12,.06,0]),y*1.2],[...P.add(N,[-.06*(r.hindFoot||1),.12,0]),y*.9],[...N,y*.9]];d.chain(ce,j,{group:ee>0?6+(F?1:0):2,paint:r.socks?_e=>_e[1]<r.socks?l.BODY3:void 0:void 0});const ye=(r.paw==="hoof"?.07:.09)*r.legW**.5*(F?1:r.hindFoot||1);d.ell(P.add(N,[ye*.5,-.01,0]),[ye,y*.9,y*1.1],r.paw==="hoof"?l.NOSE:j,{group:ee>0?6+(F?1:0):2}),d.anchors.feet.push({c:P.add(N,[ye*.5,-.01,0]),r:Math.max(ye,y*1.1),group:ee>0?6+(F?1:0):2})};for(const F of[-1,1])S(!0,F),S(!1,F);const C=[u*.82,M-.12,0],T=[C[0]+Math.cos(r.neckAng)*r.neck*.9,C[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];d.seg(C,T,r.neckW*.55,r.neckW*.42,l.BODY,{paint:F=>r.belly&&F[1]<(C[1]+T[1])/2-.05?l.BELLY:r.face==="dark"?l.BODY2:void 0});const L=F=>{if(r.face==="badger")return Math.abs(F[2])<f*.22+(F[0]-T[0])*.1||F[1]<T[1]-f*.1?l.BELLY:l.BODY3;if(r.face==="dark")return l.BODY2;if((r.belly||r.muzzle)&&F[1]<T[1]-f*.35)return l.BELLY};d.ell(T,[f*1.05,f*.92,f*.88],l.BODY,{paint:L});const O=f*r.snout*(h?.55:o?.78:1),I=f*r.snoutD*.55,k=[T[0]+f*.65+O*.5,T[1]-f*.28,0];d.ell(k,[O*.62+f*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:F=>(r.muzzle||r.belly)&&F[1]<k[1]-I*.1?l.BELLY:L(F)});const H=[k[0]+O*.62+f*.1,k[1]-.02,0];d.ell(H,[f*(r.disc?.1:.12),f*(r.disc?.2:.12),f*(r.disc?.2:.15)],l.NOSE,{group:1});for(const F of[-1,1]){const ee=qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,F*.62]));d.ell(ee,[f*.13,f*.16,f*.13].map(se=>se*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?l.MAGIC2:l.EYE,{group:1})}d.anchors.head={c:T,r:[f*1.05,f*.92,f*.88],top:[T[0]-f*.1,T[1]+f*.82,0]},d.anchors.eyes={pts:[-1,1].map(F=>qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,F*.62]))),size:f*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},d.anchors.neck={c:P.lerp(C,T,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:P.norm(P.sub(T,C)),tag:h?1.8:o?1.3:1};for(const F of[-1,1]){const ee=r.ear,se=[T[0]-f*.15,T[1]+f*.7,F*f*.5],ue=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(ee==="none")continue;if(ee==="round"){d.ell(se,[f*.22,f*.25*ue,f*.1],l.BODY,{group:1,paint:ce=>ce[0]>se[0]+f*.02?l.EAR:void 0});continue}const xe=ee==="long",Ce=ee==="small"?-.6:0,B=f*.55*ue*(ee==="big"?1.35:xe?2.2:1),z=f*.3*(ee==="big"?1.2:xe?1.35:1),N=P.norm([Ce*.6-(xe?.3:.12),1,F*.3]),Z=P.norm([.55,.2,F]),j=P.norm(P.cross(Z,N));d.flat(P.add(se,P.mul(N,B)),j,N,z,B,Ss.ear(l.BODY,l.EAR,l.BODY3),{group:5+(F>0?0:20),extra:xe}),ee==="tuft"&&d.seg(P.add(se,[0,B*1.4,F*.02]),P.add(se,[0,B*1.85,F*.04]),f*.05,f*.02,l.BODY3,{group:1})}const K=[-u*1.05,M-.1+E*.5,0],ae=t?.04:-.02;if(c("tails")||i0(d,c("starTail")?"star":r.tail,K,u,M,ae),r.horns)for(const F of[-1,1]){const ee=o?.6:h?.35:c("hornsGlow")?1.4:1,se=[];for(let ue=0;ue<=8;ue++){const xe=.3-ue/8*Math.PI*1.6,Ce=f*.65*ee*(1-.45*ue/8);se.push([T[0]-f*.1+Math.cos(xe)*Ce,T[1]+f*.45+Math.sin(xe)*Ce,F*(f*.6+ue*.015)]),se[ue].push(f*.2*ee*(1-.6*ue/8))}d.chain(se,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(r.antlers||c("jackalope"))for(const F of[-1,1])s0(d,r,[T[0]-f*.05,T[1]+f*.75,F*f*.4],F,e,c);if(r.tusks)for(const F of[-1,1]){const ee=o?.4:h?0:c("tusksBig")?1.3:.75;if(!ee)continue;const se=[k[0]+O*.25,k[1]-I*.4,F*I*.8];d.chain([[...se,.045*ee],[...P.add(se,[.1*ee,.1*ee,F*.03]),.04*ee],[...P.add(se,[.06*ee,.24*ee,F*.05]),.02*ee]],l.ACCENT,{group:8})}r.teeth&&!h&&d.ell([H[0]-f*.1,H[1]-f*.25,0],[f*.08,f*.14,f*.12],l.ACCENT,{group:1});const q=F=>[-u*.9+F*u*1.65,M+w*Math.max(0,1-Math.abs(F-.8)*3)+E*(1-Math.abs(F-.4)*2),0];if(c("wings"))for(const F of[-1,1])co(d,[u*.2,M,F*v*.5],F,1.15,t?.1:0,F>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(F>0?10:0));if(c("mane")||c("flames"))for(let F=0;F<7;F++){const ee=F/6,se=P.lerp(P.add(T,[-f*.5,f*.3,0]),q(.55),ee),ue=[.4,.3,.45,.28,.38,.25,.3][F],xe=P.norm([-.35-(t?.1:0),1,0]);d.flat(P.add(se,P.mul(xe,ue*.5)),[1,0,0],xe,ue*.32,ue*.55,Ss.flame(F%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+F%2,extra:!0})}if(c("tails"))for(let F=0;F<7;F++){const ee=Math.PI*(.55+F*.08),se=(F-3)*.1,ue=P.add(K,[Math.cos(ee)*.9,Math.sin(ee)*.85,se]);d.chain([[...K,.1],[...P.lerp(K,ue,.5),.17],[...ue,.08]],F%2?l.BODY2:l.BODY,{group:70,extra:!0}),d.ell(ue,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((F,ee)=>{const se=q(F),ue=[.3,.5,.4,.6,.35][ee];d.ell(P.add(se,[0,ue*.45,(ee%2-.5)*.1]),[ue*.55,.08,.08],l.MAGIC,{dir:[(ee-2)*.12,1,0],group:80+ee%2,extra:!0,paint:xe=>xe[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let F=0;F<6;F++)d.ell(q(.08+F*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[F,ee]of[[.25,.55],[.5,.8],[.75,.45]]){const se=q(F);d.seg(se,P.add(se,[0,ee*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),d.ell(P.add(se,[0,ee*.8,0]),[ee*.28,ee*.26,ee*.28],l.LEAF2,{group:87,extra:!0,paint:ue=>ue[1]<se[1]+ee*.72?l.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const ee=q(F);d.ell(P.add(ee,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let F=0;F<3;F++){const ee=[];for(let se=0;se<9;se++){const ue=se/8;ee.push([u*(.5-ue*2.2),M+.05+F*.1+ue*(.25+F*.12)+Math.sin(ue*6+t+F)*.07,(F-1)*.18,.04*(1-ue*.6)])}d.chain(ee,F%2?l.MAGIC2:l.MAGIC,{group:90+F,extra:!0})}Mc(d);const{sp:ie}=xn(d,{height:xc(e,i,r.hgt),facing:s});return a&&gc(ie,n.id.length*7919),ie}function i0(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(P.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(P.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>ci(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],l.BODY3,a))}function s0(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const d=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const g=P.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,g,d*1.3,d*1.2,h,c);for(let x=0;x<5;x++){const v=.35+x*.3,y=P.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),w=(.24+.05*(x%2))*o;n.ell(P.add(g,P.mul(y,w*.55)),[w*.6,d*1.5,d*.6],h,{...c,dir:y,up:[0,0,1]})}return}const u=P.add(t,[-.18*o,.3*o,f*.4]),p=P.add(t,[-.25*o,.62*o,f*.8]),m=P.add(t,[-.1*o,.95*o,f]);n.chain([[...t,d*1.2],[...u,d],[...p,d*.85],[...m,d*.4]],h,c);const M=(g,x,v,y)=>n.seg(g,P.add(g,P.mul(P.norm(x),v)),y,y*.35,h,c);M(P.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,d*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,d*.7),o>.7&&(M(p,[.8,1,0],.28*o,d*.6),M(m,[.3,1,i*.2],.18*o,d*.5))}function r0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=m=>r&&n.legend.includes(m),c=new qe,d=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+d;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,l.BODY2,{group:2});for(const g of[-.04,0,.04])c.ell([.16,.03+M,m*.15+g],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+d,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<u-f*.5?Math.floor(m[1]*18)%3===0&&ci(m,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const m of[-1,1])c.ell([-.06,.58+d,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>ci(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[f,f*.9,f],l.BODY);for(const m of[-1,1]){const M=P.norm([.75,-.05,m*.4+.35]),g=P.add(qe.surface([0,u,0],[f,f*.9,f],M),P.mul(M,-f*.05));c.ell(g,[f*.22,f*.46,f*.4],l.BELLY,{group:1,dir:M});const x=P.add(g,P.mul(M,f*.14));c.ell(x,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),r?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(P.add(x,P.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),r?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(P.add(x,P.mul(M,f*.07))),o||c.ell([f*.05,u+f*.8,m*f*.6],[f*.32,f*.12,f*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(qe.surface([0,u,0],[f,f*.9,f],P.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const m of[-1,1])co(c,[-.05,.8+d,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(h("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,u,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},Mc(c);const{sp:p}=xn(c,{height:xc(e,i,.95),facing:s});return r&&gc(p,31),p}const is=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(qe.surface(e,t,P.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>qe.surface(e,t,P.norm(o))),size:s}},ju=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function jn(n,e,t,i,s,r){Mc(n);const{sp:a}=xn(n,{height:xc(t,i,s),facing:r});return t===3&&gc(a,e.id.length*131),a}const ed=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(P.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},vc=(n,e)=>e.forEach(([t,i],s)=>n.ell(P.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?l.MAGIC2:void 0}));function a0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:f=>ci(f,22,.3)?l.BODY3:ci(f,19,.12)?l.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),p=f/46*.9+.05,m=P.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);m[0]>.55||a.ell(P.add(qe.surface(h,c,m),P.mul(m,.02)),[.1,.025,.025],f%4?l.BODY2:l.BODY3,{dir:P.add(m,[-.4,0,0]),group:1})}const d=[.48,.22,0];return a.ell(d,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),is(a,d,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?l.MAGIC2:l.EYE),r&&vc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),jn(a,n,e,i,.6,s)}function o0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.05:0;for(const d of[-1,1])a.ell([-.22,.16,d*.36],[.24,.13,.12],d>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:d>0?6:2,paint:f=>ci(f,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,d*.4],[.16,.04,.08],d>0?l.BODY:l.BODY2,{group:d>0?6:2}),a.seg([.35,.2+o,d*.24],[.42,.03,d*.3],.05,.04,d>0?l.BODY:l.BODY2,{group:d>0?7:2}),a.anchors.feet.push({c:[.45,.03,d*.3],r:.06,group:d>0?7:2},{c:[.12,.04,d*.4],r:.08,group:d>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:d=>d[1]<h[1]-.12?l.BELLY:d[0]>.38&&Math.abs(d[1]-(h[1]-.02))<.018?l.LINE:ci(d,14,.22)?l.BODY3:void 0});for(const d of[-1,1]){const f=[.3,.55+o,d*.17];a.ell(f,[.1,.09,.1],l.BODY,{group:1}),a.ell(qe.surface(f,[.1,.09,.1],P.norm([.6,.5,d*.5])),[.05,.05,.05],r?l.MAGIC2:l.IRIS,{group:1}),a.ell(qe.surface(f,[.11,.1,.11],P.norm([.65,.45,d*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(d=>qe.surface([.3,.55+o,d*.17],[.1,.09,.1],P.norm([.6,.5,d*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&ed(a,[.15,.66+o,0],.16),jn(a,n,e,i,.55,s)}function l0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new qe,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const d=[.36,.84+c,0],f=a?.19:.16;if(h.ell(d,[f*1.1,f,f*.95],l.BODY,{paint:u=>u[1]>d[1]+f*.55?l.BELLY:void 0}),h.ell(P.add(d,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],l.NOSE,{dir:[1,-.2,0],group:1}),is(h,d,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,r?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])co(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return jn(h,n,e,i,.75,s)}function c0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,d=a("wingsBig")?1.5:1;ju(o,0,.3*d);for(const u of[-1,1]){const p=[0,c+.05,u*.1],m=[.05,c+(h?.35:-.05),u*.45*d],M=[[-.05,c+(h?.45:-.15),u*.85*d],[-.25,c+(h?.2:-.25),u*.75*d],[-.3,c+(h?0:-.25),u*.4*d]],g=a("wingsBig")?l.MAGIC:l.BODY2,x=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,x,{group:11});for(const b of M)o.seg(m,b,.02,.012,x,{group:11});const v=P.sub(M[0],p),y=P.norm(v),w=P.norm(P.sub(M[2],m)),E=P.norm(P.sub(w,P.mul(y,P.dot(w,y))));o.flat(P.add(P.lerp(p,M[0],.5),P.mul(E,.12*d)),y,E,Math.hypot(...v)*.55,.3*d,Ss.membrane(g),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const f=[.08,c+.2,0];o.ell(f,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(P.add(f,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?l.EAR:void 0});return is(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?l.MAGIC2:l.EYE),o.ell(qe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),jn(o,n,e,i,.55,s)}function h0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let d=0;d<4;d++)a.ell(P.add(c,[.14,-.01,h*(d-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35])),[.015,.015,.015],r?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&ed(a,[.15,.62,0],.15),jn(a,n,e,i,.55,s)}function u0(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new qe;for(const f of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,m=(u+(f>0?1:0)+t)%2?.06:-.06,M=[p,.22,f*.2];o.chain([[...M,.03],[p+m+(1-u)*.06,.32,f*.42,.025],[p+m*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?l.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),d=a("horn")?l.MAGIC:l.BODY3;for(const f of[-1,1]){const u=P.add(h,[.08,.02,f*.1]),p=P.add(u,[c*.7,c*.45,f*c*.15]),m=P.add(p,[c*.25,-c*.12,-f*c*.12]);o.chain([[...u,.045],[...p,.035],[...m,.015]],d,{group:8+(f>0?1:0)}),o.seg(P.lerp(u,p,.55),P.add(P.lerp(u,p,.55),[0,c*.22,0]),.02,.008,d,{group:8})}for(const f of[-1,1])o.chain([[...P.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],l.BODY3,{group:9,extra:!0});return is(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?l.MAGIC2:l.EYE,9),a("crystals")&&vc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),jn(o,n,e,i,.5,s)}function d0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const d of[-1,1])a.seg([.7+o,.32,d*.04],[.78+o,.55,d*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,d*.1],[.03,.03,.03],r?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(d=>[.78+o,.57,d*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=r?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:d=>{const f=Math.atan2(d[1]-h[1],d[0]-h[0]);return((Math.hypot(d[0]-h[0],d[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?l.MAGIC2:l.BODY3:void 0}}),jn(a,n,e,i,.45,s)}function f0(n,e,t,i,s="towards"){const r=e===3,a=new qe;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,d=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+d,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),is(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?l.MAGIC2:l.EYE),r&&vc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),jn(a,n,e,i,.4,s)}function p0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new qe,c=t?.7:0,d=[];for(let p=0;p<=12;p++){const m=p/12;d.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}d.push([.38,.25,d[12][2],.07],[.42,.45,d[12][2]*.8,.065]),h.chain(d,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:ci([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const f=[.5,.5,d[13][2]*.8],u=a?.11:.09;if(h.ell(f,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),is(h,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?l.MAGIC2:l.EYE),t||h.seg(P.add(f,[u*1.4,-u*.2,0]),P.add(f,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:P.add(d[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,d[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])co(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return jn(h,n,e,i,.45,s)}function m0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,c=.55,d=a("wingsBig")?1.45:1,f=a("wingsBig")?l.MAGIC:l.BODY;ju(o,0,.3*d);for(const u of[-1,1]){const p=h?.5:-.1,m=P.norm([.35,p,u]),M=P.norm([-.3,p*.6,u]);o.flat(P.add([0,c,u*.05],P.mul(m,.38*d)),m,P.norm(P.cross(m,[0,1,0])),.4*d,.24*d,Ss.spotted(f,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(P.add([-.05,c,u*.05],P.mul(M,.26*d)),M,P.norm(P.cross(M,[0,1,0])),.27*d,.17*d,Ss.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>ci(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),is(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?l.MAGIC2:l.EYE),jn(o,n,e,i,.5,s)}function g0(n,e,t,i,s="towards"){const r=e===3,a=c=>r&&n.legend.includes(c),o=new qe,h=t?.05:0;for(let c=0;c<9;c++){const d=c/8,f=-.6+d*1.15;o.ell([f,.12+Math.sin(d*Math.PI)*(.06+h),0],[.08,.1-d*.02,.12-d*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),is(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?l.MAGIC2:l.EYE),jn(o,n,e,i,.4,s)}function x0(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new qe,h=[.15,.28,0];for(const d of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,p=(f+(d>0?0:1)+t)%2?.05:-.05,m=P.add(h,[.05-f*.04,0,d*.1]),M=P.add(m,[Math.cos(u)*.3*(f<2?1:-.6)+p,.3,d*.3]),g=P.add(m,[Math.cos(u)*.55*(f<2?1:-.8)+p*1.5,-.28,d*.55]);o.chain([[...m,.03],[...M,.028],[...g,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:d=>(Math.abs(d[2])<.03||Math.abs(d[0]+.28)<.03)&&d[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([d,f])=>qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[d,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let d=0;d<5;d++){const f=Math.PI*(.2+d/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(d-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+d,extra:!0})}return jn(o,n,e,i,.5,s)}const M0=new Map(Object.entries({owl:r0,hedgehog:a0,toad:o0,raven:l0,bat:c0,mole:h0,beetle:u0,snail:d0,woodlouse:f0,snake:p0,moth:m0,glowworm:g0,spider:x0})),_c=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],td=Object.fromEntries(_c.map(n=>[n.id,n])),_l=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],bl={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},v0=["bar","star","heart"];function _0(n,e=!0){const t=qr((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*_l.length):null,glasses:i||t()<.4?v0[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(bl)[Math.floor(t()*3)]:null}}function b0(n,e,t=null){const i=y0(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[s,r,a]=_l[t.hat%_l.length];i[l.HAT1]=s,i[l.HAT2]=r,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=bl[t.shoes]||bl.sneakers;i[l.SHOE]=s,i[l.SOLE]=r}if(t.woken){i[l.WOKEN]=[255,40,36];for(const s of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function y0(n,e){const t=td[n],i=e.cVal/.85,s=e.cSat/.6,r=de(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:de(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=de(e.magicHue+t.hue*.3,.6,1),h=de(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:r,[l.BODY2]:de(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[l.BODY3]:de(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:de(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:de(.3,.55,.55),[l.LEAF2]:de(.25,.5,.75),[l.LEAF3]:de(.33,.6,.35),[l.TRUNK]:de(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:de(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:de(.12,.7,.85),[l.SKIN]:[238,158,192]}}const w0=["size","growth","pixel","head","eye","legs","long","fur"],wr=new Map;function S0(n,e,t,i,s="towards",r=null){const a=td[n]||_c[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...w0.map(d=>i[d]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=wr.get(h);if(!c){if(c=jf(o,()=>a.q?n0(a,e,t,i,s):M0.get(a.plan)(a,e,t,i,s)),o?.woken)for(let d=0;d<c.m.length;d++)(c.m[d]===l.EYE||c.m[d]===l.IRIS||c.m[d]===l.PUPIL)&&(c.m[d]=l.WOKEN);wr.size>600&&wr.delete(wr.keys().next().value),wr.set(h,c)}return c}const ho=.07,bc=.048,je=(...n)=>({l:n}),Dt=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),dn=(n,e)=>({d:[n,e]}),St=(n,e=.86)=>je([.5,e],[.5,n]),Et=Dt(.5,.76,.13,25,155),E0=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},At=(...n)=>n.flatMap(e=>[e,E0(e)]);function Li(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,d=s/r,f=-i/r,u=(o-Math.abs(a))*Math.sign(a),p=h-d*u,m=c-f*u,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let x=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;x>180;)x-=360;for(;x<-180;)x+=360;return Dt(p,m,o,M,M+x)}const A0=(n,e,t,i,s,r=24)=>je(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),T0=(n,e,t,i,s,r=0,a=40)=>je(...Array.from({length:a+1},(o,h)=>{const c=h/a,d=(r+c*s*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(d),e+f*Math.sin(d)]})),na=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return je([n+t*a,e+t*o],[n+i*a,e+i*o])}),R0={wolf:[St(.3),je([.28,.08],[.5,.3],[.72,.08]),Dt(.5,.55,.2,-55,55),Et,dn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[St(.34),je([.36,.06],[.5,.34],[.64,.06]),Dt(.67,.66,.17,180,-80),dn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),Et],badger:[St(.1),je([.24,.3],[.76,.3]),...At(je([.33,.14],[.33,.56])),Et,...At(dn(.24,.3))],boar:[St(.16),...At(Dt(.36,.24,.15,45,180)),...na(.5,.16,0,.1,[-130,-90,-50]),Et],stag:[St(.42),...At(je([.5,.42],[.34,.26],[.3,.06]),je([.335,.25],[.16,.2]),je([.32,.15],[.18,.07])),Et],hare:[St(.44),...At(je([.5,.44],[.4,.34],[.38,.06])),Dt(.62,.66,.09,180,540),Et,...At(dn(.38,.06))],owl:[St(.44),...At(Dt(.33,.3,.13,0,360),je([.24,.18],[.18,.05])),Et,...At(dn(.33,.3))],bear:[St(.24),je([.24,.3],[.76,.3]),...At(Dt(.3,.3,.09,180,360)),...At(je([.36,.5],[.32,.62])),Et],hedgehog:[St(.52),Dt(.5,.52,.2,180,360),...na(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),Et],squirrel:[St(.2),je([.5,.2],[.4,.08]),Dt(.66,.4,.16,100,-200),dn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),Et],toad:[St(.42),je([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...At(Dt(.34,.3,.1,0,360)),Et,...At(dn(.16,.54))],otter:[St(.24),Dt(.5,.5,.28,-100,100),dn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Li([.18,.64],[.36,.64],.3),Et],lynx:[St(.32),je([.26,.2],[.5,.32],[.74,.2]),...At(je([.26,.2],[.26,.06])),je([.5,.68],[.66,.62]),Et,...At(dn(.26,.06))],elk:[St(.3),...At(je([.5,.3],[.42,.2]),Dt(.3,.16,.12,0,180),je([.18,.16],[.14,.06])),je([.5,.44],[.6,.52]),Et],raven:[St(.14),je([.5,.14],[.3,.22]),je([.18,.56],[.5,.38],[.82,.56]),Et,dn(.58,.17),...At(dn(.18,.56))],bat:[St(.3),Dt(.5,.16,.14,20,160),...At(je([.5,.38],[.12,.26]),Li([.12,.26],[.24,.46],-.25),Li([.24,.46],[.38,.5],-.3),Li([.38,.5],[.5,.52],-.3)),Et],mole:[St(.44),Dt(.5,.3,.16,0,180),...na(.5,.3,.19,.3,[-160,-125,-55,-20]),je([.5,.14],[.5,.04]),Et],beaver:[St(.36),je([.32,.2],[.68,.2]),...At(je([.44,.2],[.44,.34])),je([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),Et],stoat:[St(.18),Dt(.5,.44,.24,180,360),je([.5,.18],[.6,.08]),Et,...At(dn(.26,.44))],snail:[St(.52),T0(.5,.33,.03,.2,1.6,90),je([.66,.2],[.76,.06]),Et,dn(.76,.06)],ram:[St(.24),...At(Dt(.36,.24,.14,0,-250)),Et,...At(dn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[St(.24),Dt(.5,.52,.22,205,335),Dt(.5,.66,.24,205,335),Dt(.5,.38,.2,205,335),...At(je([.5,.24],[.32,.06])),Et],snake:[St(.16),A0(.5,.82,.2,.2,1.25),je([.5,.2],[.5,.11]),...At(je([.5,.11],[.42,.045])),Et],moth:[St(.2),...At(je([.5,.3],[.16,.18],[.24,.5],[.5,.4]),je([.5,.5],[.3,.64],[.5,.66]),Dt(.38,.16,.12,0,-110)),Et],marten:[St(.32),je([.3,.2],[.5,.32],[.7,.2]),...At(Dt(.3,.14,.07,90,-180)),Dt(.28,.56,.22,0,150),dn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),Et],salamander:[St(.3),Li([.5,.3],[.5,.06],.35),Li([.5,.3],[.5,.06],-.35),...At(je([.5,.42],[.32,.38],[.26,.48]),je([.5,.64],[.32,.6],[.26,.7])),Et,...At(dn(.38,.52))],glowworm:[St(.4),Dt(.5,.27,.1,90,450),...na(.5,.27,.15,.25,[0,60,120,180,240,300]),Et],spider:[je([.5,.05],[.5,.3]),St(.5),Dt(.5,.4,.11,-90,270),...At(...[-150,-170,170,150].map(n=>je([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Et,dn(.5,.05)],dormouse:[St(.12),Dt(.5,.46,.24,-60,250),...At(Dt(.34,.16,.08,90,-180)),Li([.56,.38],[.7,.38],-.4),Et],beetle:[St(.36),...At(Dt(.66,.26,.2,160,250)),Li([.5,.38],[.5,.82],.25),Li([.5,.38],[.5,.82],-.25),Et]},fh={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},C0={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},ar=n=>fh[C0[n]]||fh.cyan,L0=[255,255,250],P0=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),ph=n=>`rgb(${n.join(",")})`;function D0(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Fa(n){if(n.d)return{dot:!0,pts:[n.d],len:bc*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,d)=>{const f=(a+(o-a)*d/h)*Math.PI/180;return[i+r*Math.cos(f),s+r*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const yl=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},So=new Map;function nd(n){return So.has(n)||So.set(n,yl((R0[n]||[]).map(e=>({...Fa(e),w:ho,part:"sigil"})))),So.get(n)}const Eo=new Map;function I0(n,e=0){const t=n+":"+e;if(Eo.has(t))return Eo.get(t);const i=e===null?null:D0(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=ho*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=m=>Fa({a:[.5,.5,m,90,450]});for(let m=0;m<i.rings;m++)h.push({...p(.44-m*.06),w:o,part:"ring"});for(let m=0;m<i.dots;m++){const M=(90+m*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let m=0;m<16;m++){const M=(90+m*22.5)*Math.PI/180,g=.44-.06+.014,x=.44-.014;h.push({...Fa({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let m=0;m<i.rays;m++){const M=(90+m*360/i.rays)*Math.PI/180,g=.44+.02,x=.5-o/2;h.push({...Fa({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),d=nd(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([p,m])=>[r+p*s,r+m*s]),w:u.w*s*c,r:bc*s*c,part:"sigil"})),f={level:e,frame:i,k:s,strokes:[...yl(h,0,h.length?.15:0),...yl(d,h.length?.15:0,1)]};return Eo.set(t,f),f}function O0(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function N0(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=ar(e),progress:o=1,glow:h=!0}={}){const c=I0(e,r),d=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const f=(u,p,m,M)=>{n.globalAlpha=m,n.strokeStyle=n.fillStyle=ph(u),n.shadowColor=ph(a),n.shadowBlur=M;for(const g of c.strokes){const x=O0(g,o);if(x){if(n.beginPath(),g.dot){n.arc(x[0][0],x[0][1],g.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=g.w*p,x.forEach((v,y)=>y?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(f(a,2.4,Math.min(d,.7)*.55,s/12),f(P0(a,L0,.72),.62,1,s/30)):f(a,1,1,0),n.restore()}function F0(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<bc+i-ho/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],c=r.pts[o],d=c[0]-h[0],f=c[1]-h[1],u=d*d+f*f,p=Math.sqrt(u),m=u?Math.max(0,Math.min(1,((e-h[0])*d+(t-h[1])*f)/u)):0;if(Math.hypot(e-h[0]-d*m,t-h[1]-f*m)<i){const M=r.start+(a+m*p)/r.len*(r.end-r.start);M<s&&(s=M)}a+=p}}return s}function id(n,e,t,i=ho/2){return F0(nd(n),e,t,i)<1/0}_c.map(n=>n.id);const Fr=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function wn(n,e,t,i,s,r,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const d=[];for(let x=0;x<9;x++){const v=x/9*Math.PI*2,y=1+(r()-.5)*.35*(s.clump+.3);d.push([e[0]+Math.cos(v)*t*y,e[1]+Math.sin(v)*i*y*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(lo(d,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([_t(e,[-t*1.1,i*.15]),_t(e,[t*1.1,i*.1]),_t(e,[t*1.1,i*1.2]),_t(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([_t(e,[-t*.75,-i*.55]),_t(e,[t*.25,-i*.95]),_t(e,[t*.55,-i*.35]),_t(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),g=r()*1e4|0;for(let x=m;x<=M;x++)for(let v=u;v<=p;v++){const y=n.get(v,x);if(y!==a&&y!==l.LEAF2&&y!==l.LEAF3)continue;const w=ft(v,x,g),E=yi(v/2,x/2,g)*.5+w*.5;E<.16*s.density?n.recolour(v,x,y===l.LEAF2?a:l.LEAF2):E>1-.16*s.density&&n.recolour(v,x,y===l.LEAF3?a:l.LEAF3)}}function Mn(n,e,t,i,s,r,a,o,{mat:h=l.TRUNK,bend:c=1,group:d=10,line:f=!1}={}){const u=[e],p=4;let m=t,M=e;for(let g=1;g<=p;g++)m+=(o()-.5)*.7*a.gnarl*c,M=_t(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),u.push(M);return n.limb(u.map((g,x)=>[...g,s+(r-s)*x/p]),h,{group:d,line:f,round:a.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:u}}function Wi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,d=(8+r()*16)*a*(.4+s.roots),f=(2+r()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+d*.4),t-f],m=[e+c*(i*.5+d),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function ss(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==l.TRUNK)continue;const a=t?yi(s/1.3,i/6,21):yi(s/6,i/1.3,21);a>1-e.bark*.42||ft(s,i,4)<e.bark*.05?n.m[r]=l.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=l.BARKL)}}function Wn(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,r-1),d=n.h-c,f=new pt(h,d);for(let u=0;u<d;u++)for(let p=0;p<h;p++){const m=(u+c)*n.w+p+o,M=u*h+p;f.m[M]=n.m[m],f.g[M]=n.g[m],f.n[M*3]=n.n[m*3],f.n[M*3+1]=n.n[m*3+1],f.n[M*3+2]=n.n[m*3+2]}return{sp:f,crownY:t-c}}const ui=n=>(n.crownWidth||3)/3;function U0(n,e,t){const i=ui(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new pt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=r;const m=(M,g,x,v,y)=>{const w=Mn(a,M,g,x,v,v*.65,e,n,{group:12});if(y===0){u.push(w.end);return}const E=n()<.35?3:2;for(let b=0;b<E;b++){const A=(b-(E-1)/2)*pe(n,.5,.85)*(y===3?1.4:1);m(w.end,w.ang+A+(n()-.5)*.25,x*pe(n,.6,.78),v*.62,y-1)}y<=2&&u.push(Tn(M,w.end,.7))};for(let M=0;M<c;M++){const g=f+(c>1?(M/(c-1)-.5)*.8:0),x=[o+(M-(c-1)/2)*d*.6,h],v=Mn(a,x,-Math.PI/2+g,r*.36*(c>1?pe(n,.75,1.15):1),d,d*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const y of[-1,1])m(v.end,-Math.PI/2+g*.5+y*pe(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),r*.22*(.75+.25*i)*(c>1?.7:1),d*.7,c>2?2:3);if(c===1&&n()<.7&&m(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,d*.55,2),M===0&&e.treeHollow){const y=Tn(x,v.end,.38);a.ellipse(y[0],y[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(Wi(a,o,h,d*Math.sqrt(c),e,n,t),ss(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const g=u[M],x=u[M+1],v=Math.hypot(x[0]-g[0],x[1]-g[1]);if(v<40*t)for(let y=0;y<=v;y++){const w=Tn(g,x,y/v);a.px(w[0],w[1]+Math.sin(y/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return Wn(a,o,p+4*t);u.sort((M,g)=>M[1]-g[1]);for(const M of u)wn(a,_t(M,[0,-3*t]),pe(n,14,21)*t,pe(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&wn(a,_t(M,[pe(n,-9,9)*t,pe(n,-12,-3)*t]),pe(n,10,15)*t,pe(n,7,10)*t,e,n);return Wn(a,o,p+4*t)}function k0(n,e,t){const i=.8+.2*ui(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),Wi(a,o,h,6*t,e,n,t*.6),ss(a,e);const c=Math.round(pe(n,9,12));for(let d=c-1;d>=0;d--){const f=d/(c-1),u=6*t+f*r*.7,p=(5+f*36)*t*i*pe(n,.9,1.1),m=(5+f*13)*t,M=[[o,u-4*t],[o+p*.5,u+m*.3],[o+p,u+m],[o+p*.7,u+m*1.15],[o,u+m*.7],[o-p*.7,u+m*1.15],[o-p,u+m],[o-p*.5,u+m*.3]];a.shape(lo(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+d,line:!1,round:e.round}),a.mark([[o-p,u+m*.55],[o+p,u+m*.55],[o+p,u+m*1.4],[o-p,u+m*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+m*.45],[o-p*.7,u+m*.7]],l.LEAF2,[l.LEAF])}return Wn(a,o,r*.82)}function B0(n,e,t){const i=ui(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new pt(s,r),o=s/2,h=r,c=13*t,d=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let m=0;m<5;m++){const M=m%2?1:-1,g=-Math.PI/2+M*pe(n,.55,1.25)*(.7+.3*i),x=Mn(a,d.end,g,r*pe(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(x.end)}Wi(a,o,h,c,e,n,t),ss(a,e);for(const m of f)wn(a,_t(m,[0,-2*t]),pe(n,20,28)*t,pe(n,9,12)*t,e,n);wn(a,_t(d.end,[0,-8*t]),24*t,11*t,e,n);let u=s,p=0;for(const m of f)u=Math.min(u,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=u;m<p;m+=pe(n,1,1.7)){let M=r;for(let y=0;y<r;y++)if(a.get(m,y)===l.LEAF||a.get(m,y)===l.LEAF2||a.get(m,y)===l.LEAF3){M=y;break}if(M>=r)continue;const g=Math.abs(m-o)/(s/2),x=(h-M)*pe(n,.5,.9)*(1-g*.3),v=ft(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let y=M+2;y<Math.min(h-2,M+x);y++){const w=Math.round(Math.sin(y*.12+m)*.7);ft(m|0,y,5)<.2+e.density*.8&&a.px(m+w,y,(y-M)/x>.8?l.LEAF3:v,w*.3,.2,.95)}}return Wn(a,o,d.end[1]+6*t)}function sd(n,e,t){const i=.7+.3*ui(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new pt(s,r),o=s/2,h=r,c=(n()-.5)*.25+(e.treeLean||0),d=Mn(a,[o,h],-Math.PI/2+c,r*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<d.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const m=Tn(d.pts[u],d.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(m[0]+M,m[1])===l.BARK2&&n()<.8&&a.recolour(m[0]+M,m[1],l.BARKD)}const f=[d.end];for(let u=0;u<7;u++){const p=pe(n,.35,.9),m=Tn(d.pts[0],d.end,p),M=u%2?1:-1,g=Mn(a,m,-Math.PI/2+M*pe(n,.5,1),r*pe(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});f.push(g.end)}for(const u of f)wn(a,u,pe(n,9,13)*t*i,pe(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return Wn(a,o,r*.55)}function z0(n,e,t){const i=ui(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new pt(s,r),o=s/2,h=r,c=10*t,d=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const m of[-1,1,-1,1]){const M=Mn(a,d.end,-Math.PI/2+m*pe(n,.7,1.15)*(.7+.3*i),r*pe(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(M.end,Tn(d.end,M.end,.55))}Wi(a,o,h,c,e,n,t),ss(a,e);const u=Math.round(pe(n,2,3)),p=Math.min(...f.map(m=>m[1]));for(let m=0;m<u;m++){const M=p-6*t+m*9*t,g=(95-m*12)*t*(.65+.35*i);for(let x=0;x<5;x++)wn(a,[o+(x-2)*g*.36+pe(n,-5,5)*t,M+pe(n,-3,3)*t],g*pe(n,.2,.26),7*t,e,n,{mat:m===u-1?l.LEAF:l.LEAF3})}return Wn(a,o,d.end[1]+4*t)}function mr(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:d=!1,mats:f=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),g=s()*1e4|0;for(let x=m;x<=M;x++)for(let v=u;v<=p;v++){const y=n.get(v,x);if(!f.includes(y))continue;const w=yi(v/r,x/r,g),E=ft(v,x,g);a&&w<a?n.recolour(v,x,l.LEAF3):w>1-o&&n.recolour(v,x,l.LEAF2),h&&E<h&&y!==l.LEAF3&&(n.recolour(v,x,c),d&&n.recolour(v,x-1,c))}}function Vi(n,e,t,i){const s=ui(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new pt(r,a),h=r/2,c=a,d=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(d),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=a;const M=(E,b,A,_,S)=>{const C=Mn(o,E,b,A,_,_*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(S===0){p.push(C.end);return}const T=n()<(i.fork??.35)?3:2;for(let L=0;L<T;L++)M(C.end,C.ang+(L-(T-1)/2)*pe(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,A*pe(n,.6,.78),_*.62,S-1);S<=2&&p.push(Tn(E,C.end,.7))};for(let E=0;E<d;E++){const b=u+(d>1?(E/(d-1)-.5)*(i.fan||.8):0),A=[h+(E-(d-1)/2)*f*.6,c],_=Mn(o,A,-Math.PI/2+b,a*(i.trunk||.36)*(d>1?pe(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,_.end[1]);for(let S=0;S<(i.limbs||2);S++){const C=S%2?1:-1;M(_.end,-Math.PI/2+b*.5+C*pe(n,.5,1)*(i.spreadA||.8)*(d>1?.7:1),a*(i.limb||.22)*(d>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,f*.55,2),E===0&&e.treeHollow){const S=Tn(A,_.end,.38);o.ellipse(S[0],S[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(i.noRoots||Wi(o,h,c,f*Math.sqrt(d),e,n,t*(i.rootK||1)),i.smooth||ss(o,e),e.treeBare)return Wn(o,h,m+4*t);p.sort((E,b)=>E[1]-b[1]);const[g,x]=i.clumpR||[12,18],v=i.flat||.7,y=[],w=(E,b,A,_)=>{wn(o,E,b,A,e,n,{mat:_,ragged:i.ragged||1}),y.push([E,b,A])};for(const E of p)w(_t(E,[0,-3*t]),pe(n,g,x)*t,pe(n,g,x)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const E of p)n()<(i.extra??.7)&&w(_t(E,[pe(n,-9,9)*t,pe(n,-12,-3)*t]),pe(n,g,x)*t*.7,pe(n,g,x)*t*v*.7,l.LEAF);if(i.dome){const E=Math.min(...p.map(S=>S[1])),b=p.map(S=>S[0]),A=(Math.min(...b)+Math.max(...b))/2,_=(Math.max(...b)-Math.min(...b))/2;for(let S=0;S<i.dome;S++){const C=S/Math.max(1,i.dome-1)-.5;w([A+C*_*1.1,E-(1-4*C*C)*14*t-pe(n,2,6)*t],pe(n,g,x)*t*1.1,pe(n,g,x)*t*v,l.LEAF)}}if(i.layers)for(const[E,b,A]of y)for(let _=-A;_<A;_+=Math.max(3,i.layers*t))for(let S=-b;S<b;S++)o.get(E[0]+S,E[1]+_)===l.LEAF&&o.recolour(E[0]+S,E[1]+_,l.LEAF3);for(const[E,b,A]of y)mr(o,E,b,A,n,i.tex||{});return Wn(o,h,m+4*t)}function H0(n,e,t){return Vi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function G0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function W0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function V0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function Y0(n,e,t){return Vi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function X0(n,e,t){return Vi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function K0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function q0(n,e,t){const i=.7+.3*ui(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new pt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<c;p++){const m=Mn(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+d+(c>1?(p/(c-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const g=pe(n,.3,.97),x=Tn(m.pts[0],m.end,g),v=M%2?1:-1,y=(1-g*.6)*r*.12*i,w=Mn(a,x,-Math.PI/2+v*pe(n,.7,1.2),y,2*t,1,e,n,{group:12,mat:l.BARKD});f.push([w.end,(8+(1-g)*6)*t*i],[Tn(x,w.end,.4),(7+(1-g)*4)*t*i])}f.push([m.end,7*t])}Wi(a,o,h,6*t,e,n,t*.6),ss(a,e);for(const[p,m]of f)wn(a,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of f)mr(a,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...f.map(([p])=>p[1]));return Wn(a,o,u+(h-u)*.45)}function $0(n,e,t){const i=.8+.2*ui(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new pt(s,r),o=s/2,h=r,c=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});ss(a,e);for(let f=0;f<a.h*.55;f++)for(let u=0;u<s;u++)(a.get(u,f)===l.TRUNK||a.get(u,f)===l.BARKD)&&a.recolour(u,f,ft(u,f,3)<.15?l.BARKD:l.BELLY);Wi(a,o,h,8*t,e,n,t*.7);const d=[];for(let f=0;f<6;f++){const u=pe(n,.55,1),p=Tn(c.pts[0],c.end,u),m=f%2?1:-1,M=Mn(a,p,-Math.PI/2+m*pe(n,.6,1.3),r*pe(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});d.push(M.end)}d.push(c.end);for(const f of d)wn(a,_t(f,[0,-2*t]),pe(n,13,19)*t*i,pe(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const f of d)mr(a,_t(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Wn(a,o,Math.min(...d.map(f=>f[1]))+8*t)}function Z0(n,e,t){const i=ui(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new pt(s,r),o=s/2,h=r,c=e.treeTrunks||3,d=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)Mn(a,[o+(p-(c-1)/2)*d*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),r*.3,d,d*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<r;p++)for(let m=0;m<s;m++)a.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&a.recolour(m,p,l.BARKD);Wi(a,o,h,d*1.4,e,n,t);const f=h-r*.3,u=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(m)*M,f+Math.sin(m)*M*.55+10*t],pe(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,f-pe(n,4,22)*t],pe(n,20,26)*t]);u.push([[o,f-24*t],26*t]);for(const[p,m]of u)wn(a,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of u)mr(a,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Wn(a,o,f+4*t)}function J0(n,e,t){return Vi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function Q0(n,e,t){const i=.8+.2*ui(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let d=0;d<10;d++){const f=d/9,u=10*t+f*r*.72,p=(5+f*28)*t*i,m=1+Math.round(f*3);for(let M=0;M<m;M++)c.push([[o+(m>1?(M/(m-1)-.5)*p*1.3:0)+pe(n,-2,2)*t,u+pe(n,-2,2)*t],(6+f*5)*t])}for(const[d,f]of c)wn(a,d,f*1.2,f,e,n,{mat:l.LEAF3,ragged:.7});for(const[d,f]of c)mr(a,d,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return Wn(a,o,r*.85)}function j0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function ep(n,e,t){const i=sd(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||ft(r,1,7)<.35)continue;const o=(s.h-a)*pe(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===l.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,ft(r,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function tp(n,e,t){const i=.8+.2*ui(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),Wi(a,o,h,6*t,e,n,t*.5),ss(a,e);const c=14;for(let d=0;d<c;d++){const f=d/(c-1),u=8*t+f*r*.68,p=(4+f*30)*t*i;for(let m=0;m<4;m++){const M=[o+(m/3-.5)*p*1.6,u+Math.abs(m/3-.5)*6*t];wn(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),mr(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return Wn(a,o,r*.8)}const np=6;function ip(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,c=r.low||(r.low=new Uint8Array(o*h)),d=Math.ceil(a+np*i);if(d>=h-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,m=S=>{const C=[];let T=-1;for(let L=0;L<=o;L++){const O=L<o&&Fr.has(r.m[S*o+L]);O&&T<0&&(T=L),!O&&T>=0&&(C.push([T,L-1]),T=-1)}return C},M=(S,C)=>S.reduce((T,L)=>!T||Math.abs((L[0]+L[1])/2-C)<Math.abs((T[0]+T[1])/2-C)?L:T,null),g=S=>{const C=r.m.slice(),T=r.n.slice();S();for(let L=0;L<C.length;L++)r.m[L]!==C[L]&&((L/o|0)<d||C[L]&&!Fr.has(C[L])&&!c[L]?(r.m[L]=C[L],r.n[L*3]=T[L*3],r.n[L*3+1]=T[L*3+1],r.n[L*3+2]=T[L*3+2]):c[L]=1)},x=()=>{for(let S=0;S<8;S++){const C=Math.round(pe(e,d,h-3)),T=m(C);if(T.length){const L=pc(e,T),O=e()<.5?-1:1;return{x:O<0?L[0]:L[1],y:C,side:O}}}return null},v=p?0:1,y=h-1;let w=o,E=0;for(let S=0;S<d*o;S++)if(r.m[S]&&!Fr.has(r.m[S])){const C=S%o;w=Math.min(w,C),E=Math.max(E,C)}const b=Math.max(6*i,(E-w)*.22);s.moss&&g(()=>{for(let S=Math.max(d,Math.round(h-(h-d)*.4));S<h;S++)for(let C=0;C<o;C++){const T=S*o+C;if(!Fr.has(r.m[T]))continue;const L=S>0&&!r.m[T-o];(yi(C/2.5,S/2.5,41)>1-s.moss*(.35+.4*(S-d)/(h-d))||L&&ft(C,S,9)<s.moss*.6)&&(r.m[T]=ft(C,S,5)<.3?l.LEAF2:l.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&g(()=>{let S=o/2;const C=y-(y-d)*pe(e,.45,.95)*Math.min(1,s.ivy+.3),T=e()*6;for(let L=y-1;L>C;L--){const O=M(m(L),S);if(!O)break;if(S=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(L*.22+T)),r.px(S,L,l.LEAF3,0,0,1),ft(Math.round(S),L,13)<.45){const I=ft(L,3,2)<.5?-1:1;r.px(S+I,L,l.LEAF,I*.5,-.3,.8),r.px(S+I*2,L,l.LEAF3,I*.6,0,.8),r.px(S+I,L-1,ft(S,L,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const A=Math.round(s.sprigs*v*(5+8*u)*(h-d)/(40*i));for(let S=0;S<A;S++){const C=x();if(!C)break;const T=pe(e,3,5.5)*i;g(()=>wn(r,[C.x+C.side*T*.6,C.y],T,T*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const _=Math.round(s.boughs*v*(3+4*u)*(h-d)/(45*i)+(e()<s.boughs*v?1:0));for(let S=0;S<_;S++){const C=x();if(!C)break;g(()=>{const T=Mn(r,[C.x,C.y],-Math.PI/2+C.side*pe(e,.9,1.35),Math.min(b,pe(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),L=pe(e,6,9.5)*i;wn(r,_t(T.end,[0,-1*i]),L,L*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(s.skirt&&v){const S=Math.round(3+s.skirt*5+u*3);for(let C=0;C<S;C++)g(()=>{const T=Math.round(pe(e,Math.max(d,h-(h-d)*.8),h-4*i)),L=M(m(T),o/2);if(!L)return;const O=C%2?1:-1,I=O<0?L[0]:L[1],k=Math.min(b*1.3,pe(e,14,24)*i*(.6+s.skirt*.5)),H=Mn(r,[I,T],-Math.PI/2+O*pe(e,1.6,1.95),k,1.6*i,1,t,e,{group:12,mat:l.BARKD});wn(r,Tn([I,T],H.end,.6),k*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const sp={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},rp=(n,e)=>(t,i,s)=>ip(n(t,i,s),t,i,s,e),Xa={broad:{fn:U0,name:"gnarled broadleaf",grow:"normal"},fir:{fn:k0,name:"spruce",grow:"narrow",hue:.06},willow:{fn:B0,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:sd,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:z0,name:"field maple",grow:"normal",hue:.01},oak:{fn:H0,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:G0,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:W0,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:V0,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:Y0,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:X0,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:K0,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:q0,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:$0,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:Z0,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:J0,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:Q0,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:j0,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:ep,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:tp,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Xa))e.bare=e.fn,e.fn=rp(e.fn,sp[n]||{});const ap=new Map(Object.entries(Xa).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),yc=n=>Xa[n]||Xa.broad;function uo(n,e,t){const i=ap.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:de(e.trunkHue,.45*e.sat,.34),[l.BARKD]:de(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:de(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:de(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[l.LEAF2]:de(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[l.LEAF3]:de(h+.03,Math.min(1,.66*e.sat*s),.38*r),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=de(...i.trunk)),i?.upper&&(c[l.BELLY]=de(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function rd(n){const{sp:e,crownY:t}=n,i=new pt(e.w,e.h),s=new pt(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Fr.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function op(n,e){const t=e.bushSize,i=pc(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new pt(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)wn(a,[s/2+pe(n,-9,9)*t,r-8*t+pe(n,-4,2)*t],pe(n,7,10)*t,pe(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const d=s/2+pe(n,-12,12)*t,f=r-pe(n,5,17)*t;a.get(d,f)&&a.recolour(d,f,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let d=s/2,f=r-1;for(let u=0;u<15*t;u++)d+=Math.cos(c)*.9,f+=Math.sin(c)*.9+u*.06,a.put(d,f,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(d,f-1,l.LEAF2,0,-.5,.85),a.put(d+Math.sign(Math.cos(c)),f+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=s/2+pe(n,-13,13)*t,d=pe(n,5,15)*t,f=pe(n,-3,3);for(let u=0;u<d;u++)a.put(c+f*u/d*(u/d),r-1-u,u>d*.65?l.LEAF2:u<d*.3?l.LEAF3:l.LEAF,f*.1,-.3,.9)}const o=uo(n,e,null);return o[l.FLOWER]=de(n(),.55,.95),{sp:a,colours:o}}const Ve=(n,e={})=>["tree",{type:n,...e}],We=(n,e={})=>[n,e],gr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[We("water",{w:1.6})],small:[We("grass",{h:1.4})],big:[We("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[We("fern")],big:[Ve("larch",{scale:1.1}),Ve("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[We("stump",{snag:!0})],big:[Ve("sycamore",{trunks:3,gnarl:.9}),Ve("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[We("henge")],small:[We("stones")],big:[We("boulder")],set:We("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[We("bramble",{bare:!0})],big:[Ve("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ve("birch",{scale:.75})],big:[Ve("lime",{trunks:3,thick:1.4}),Ve("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[We("mound",{brown:!0})],big:[Ve("hazel",{gnarl:1,scale:.95}),Ve("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[We("wall")],small:[We("flowerbed")],big:[Ve("willow")],set:We("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ve("broad",{trunks:4,scale:.5,thin:!0})],big:[Ve("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[We("flowers",{hue:.98,leafy:!0})],big:[Ve("yew",{scale:1.4,gnarl:1,lean:.35}),Ve("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[We("stones",{big:!0})],big:[Ve("fir",{scale:1.2}),Ve("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[We("stump",{grass:!0})],big:[Ve("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[We("shrub",{flower:[250,245,235]})],big:[Ve("chestnut",{scale:1.1}),Ve("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[We("cones",{acorn:!0}),We("log",{branch:!0})],big:[Ve("oak",{gnarl:.9,hollow:!0}),Ve("holly",{minor:!0,scale:.8})],set:Ve("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[We("bramble")],small:[We("shrub",{flower:[200,30,60]})],big:[Ve("pine",{scale:1.2}),Ve("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[We("water"),We("reeds",{tall:!0})],small:[We("reeds")],big:[Ve("willow"),Ve("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[We("water",{w:2})],small:[Ve("broad",{scale:.45})],big:[Ve("alder",{scale:.95,gnarl:.3}),Ve("willow",{minor:!0,scale:.8})],set:We("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[We("boulder",{big:!0})],small:[We("stones",{big:!0})],big:[Ve("rowan",{scale:1.1}),Ve("pine",{minor:!0})],set:We("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[We("water",{bog:!0})],small:[We("reeds",{cotton:!0})],big:[Ve("birch",{scale:.8,dark:!0}),Ve("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[We("log",{branch:!0})],big:[Ve("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[We("rockwall")],small:[We("stalagmite")],big:[Ve("broad",{bare:!0}),Ve("yew",{minor:!0,scale:.8})],set:We("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[We("mound",{brown:!0,small:!0})],big:[Ve("flat",{scale:1.1}),Ve("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[We("water",{w:2})],small:[We("stump",{gnawed:!0})],big:[Ve("weepingBirch"),Ve("alder",{minor:!0,scale:.8})],set:We("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[We("fungi")],big:[We("log",{rot:!0})],set:We("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[We("shrub",{flower:[250,205,40],spiky:!0})],big:[Ve("birch",{lean:.45,scale:.75}),Ve("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[We("cones")],big:[Ve("pine",{scale:1.35}),Ve("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[We("rockwall",{moss:!0})],small:[We("fern")],big:[We("boulder",{moss:!0,big:!0})],set:We("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[We("fern")],big:[Ve("beech",{gnarl:.2,scale:1.1}),Ve("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[We("hedge",{berries:!0})],small:[We("web")],big:[Ve("holly",{scale:.9}),Ve("yew",{minor:!0,scale:.7})],set:Ve("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[We("bramble")],small:[We("shrub",{flower:[250,230,170]})],big:[Ve("hazel",{trunks:5,scale:.7,thin:!0}),Ve("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(Qu)){const i=gr.find(s=>s.id===n);i&&!i.set&&(i.set=We(e,{three:!0}),i.text={...i.text,set:t})}const ad=Object.fromEntries(gr.map(n=>[n.id,n])),lp=["ruins","rocks","freak","lake","modern"],Tt=(n,e,t,i,s,r,a,o,h,c,d={})=>({pattern:n,...d,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(lp.map((f,u)=>[f,h[1][u]]))},feel:c}),Ht=[0,0],cp={moor:Tt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Tt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ht,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Tt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ht,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Tt("rings",.35,.8,[1,[10,14]],null,.3,Ht,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Tt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ht,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Tt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ht,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Tt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ht,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Tt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ht,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Tt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Tt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Tt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ht,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Tt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Tt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ht,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Tt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ht,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Tt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ht,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Tt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ht,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Tt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ht,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Tt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Tt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ht,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Tt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ht,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Tt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ht,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Tt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ht,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Tt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ht,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Tt("groves",.5,.7,[2,[6,10]],null,.7,Ht,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Tt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Tt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ht,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Tt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ht,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Tt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ht,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Tt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ht,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Tt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ht,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of gr)n.layout=cp[n.id];function hp(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new pt(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let g=0;g<t;g++){const x=(yi(g/7,M/5,c)*(t-g)*(i-M)+yi((g-t)/7,M/5,c)*g*(i-M)+yi(g/7,(M-i)/5,c)*(t-g)*M+yi((g-t)/7,(M-i)/5,c)*g*M)/(t*i),v=x<.38?l.BODY2:x>.64?l.BELLY:l.BODY;h.px(g,M,v,0,-.42,.91)}const d=qr(c),f=(M,g,x)=>h.px((M%t+t)%t,(g%i+i)%i,x,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const g=Math.floor(d()*t),x=Math.floor(d()*i);if(s==="needles"){const v=d()<.5?1:-1;for(let y=0;y<3;y++)f(g+y*v,x+(y>>1),d()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let y=0;y<v;y++)f(g,x-y,y===v-1?l.LEAF2:l.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&d()<.5&&f(g+1,x-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(f(g,x,l.ACCENT),d()<.6&&f(g+1,x,l.ACCENT),d()<.4&&f(g,x+1,l.BODY2),s==="roots"&&d()<.5)for(let v=0;v<5;v++)f(g+v,x+(v>2?1:0),l.TRUNK)}else if(s==="leaves")f(g,x,l.FLOWER),f(g+1,x,l.FLOWER),d()<.5&&f(g,x+1,l.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)f(g+v,x,l.BODY2)}const p={flowers:de(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:de(r+.02,.65,.6)}[s]||de(r,.3,.6),m={[l.BODY]:de(r,a*e.sat,o),[l.BODY2]:de(r+.02,a*e.sat*1.1,o*.78),[l.BELLY]:de(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:s==="needles"?de(.07,.5,.5):de(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:de(n.leaf,.55*e.sat,.45),[l.LEAF2]:de(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:de(e.trunkHue,.4,.3)};return{sp:h,colours:m}}const gs=n=>({[l.ACCENT]:de(.1,.06,.6),[l.BODY2]:de(.62,.08,.4),[l.BELLY]:de(.1,.05,.78),[l.LEAF]:de(.27,.5,.45),[l.LEAF2]:de(.25,.45,.62),[l.NOSE]:[20,16,24]});function js(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,d=1+(r()-.5)*.3;o.push([e[0]+Math.cos(c)*t*d,e[1]+Math.sin(c)*i*d*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:s.round}),n.mark([_t(e,[-t,i*.1]),_t(e,[t,i*.1]),_t(e,[t,i]),_t(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([_t(e,[-t*.6,-i*.8]),_t(e,[t*.1,-i*1.1]),_t(e,[t*.3,-i*.5]),_t(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(lo([_t(e,[-t*1.1,-i*.55]),_t(e,[0,-i*1.3]),_t(e,[t*1.1,-i*.5]),_t(e,[t*.6,-i*.2]),_t(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function Ua(n,e,t,i,s,r){const a={[l.LEAF]:de(t.leaf,.6*i.sat,.55),[l.LEAF2]:de(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:de(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:de(i.trunkHue,.45*i.sat,.34),[l.BARKD]:de(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:de(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:de(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=yc(e.type).fn,g={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},x=M(s,g,i.treeSize*r*(e.scale||1)*pe(s,.9,1.1)),v=uo(s,g,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=de(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:x.sp,colours:v}}if(n==="shrub"){const M=op(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let g=0;g<M.sp.m.length;g++)M.sp.m[g]&&ft(g,1,3)<(e.spiky?.18:.1)&&M.sp.m[g]!==l.TRUNK&&(M.sp.m[g]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*r*(e.w||1)),d=Math.round(32*r),f=new pt(c,d),u=c/2,p=d;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,g=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&f.shape([[u-20*r,p-2],[u-18*r,p-6*r],[u+18*r,p-6*r],[u+20*r,p-2],[u+20*r,p],[u-20*r,p]],l.ACCENT,{group:2,line:!0});for(let x=0;x<M;x++){const v=u+pe(s,-16,16)*r,y=g*pe(s,.5,1),w=n==="fern"?pe(s,-6,6)*r:pe(s,-2,2)*r,E=p-1-(n==="flowerbed"?5*r:0);for(let b=0;b<y;b++){const A=b/y;f.px(v+w*A*A,E-b,A>.7?l.LEAF2:A<.3?l.LEAF3:l.LEAF,w*.05,-.3,.9),n==="fern"&&b%2&&f.px(v+w*A*A+(w>0?1:-1),E-b+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let b=0;b<(e.cotton?2:3);b++)f.px(v+w,E-y-b,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(f.px(v+w,E-y,l.FLOWER,0,-.5,.85),f.px(v+w+1,E-y,l.FLOWER,0,-.5,.85))}if(m={...a,[l.FLOWER]:n==="flowerbed"?pc(s,[[230,80,120],[250,210,60],[150,110,230]]):de(e.hue??.95,.6,.85),[l.TRUNK]:de(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:de(.08,.1,.55)},n==="flowerbed"){for(let x=0;x<f.m.length;x++)f.m[x]===l.FLOWER&&ft(x,2,7)<.5&&(f.m[x]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)js(f,[u+pe(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*pe(s,.7,1.2),(e.big?5:2.5)*r,i,s);m=gs()}else if(n==="boulder")js(f,[u,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),m={...gs(),...a,[l.ACCENT]:de(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*r,p],[u-8*r,p-18*r],[u-4*r,p-28*r],[u+5*r,p-27*r],[u+8*r,p-14*r],[u+7*r,p]],l.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*r,p-30*r],[u+9*r,p-30*r],[u+9*r,p-22*r],[u-9*r,p-18*r]],l.LEAF,[l.ACCENT]),m={...gs(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,g=(e.small?5:8)*r;f.shape(lo([[u-M,p],[u-M*.6,p-g*.8],[u,p-g],[u+M*.6,p-g*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),f.mark([[u-M,p-g*.45],[u+M,p-g*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...a,...o,[l.TRUNK]:de(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(f.limb([[u,p,M*2.2],[u,p-8*r,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-M*.8,p-8*r],[u,p-10*r-(e.gnawed?4*r:0)],[u+M*.8,p-8*r],[u,p-7*r]],l.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+M*.4,p-8*r,2.5*r],[u+M*1.6,p-15*r,1.5*r]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let g=0;g<20;g++){const x=u+pe(s,-14,14)*r,v=pe(s,6,13)*r;for(let y=0;y<v;y++)f.px(x,p-1-y,y>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,g=(e.giant?14:e.branch?3:8)*r;if(f.limb([[u-M/2,p-g/2,g],[u+M/2,p-g/2-(e.branch?2*r:0),g*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+M/2-g*.1,p-g],[u+M/2+g*.2,p-g/2],[u+M/2-g*.1,p],[u+M/2-g*.3,p-g/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let x=0;x<(e.giant?6:3);x++){const v=u+pe(s,-M/2,M/3);f.shape([[v-3*r,p-g*.9],[v,p-g-3*r],[v+3*r,p-g*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,p-g,g*.7],[u+5*r,p-g-6*r,g*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const g=u+pe(s,-12,12)*r,x=pe(s,3,7)*r,v=pe(s,3,5)*r;f.limb([[g,p,1.6*r],[g,p-x,1.4*r]],l.BELLY,{group:5}),f.shape([[g-v,p-x],[g,p-x-v*.8],[g+v,p-x]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const g=u+pe(s,-14,14)*r,x=p-2*r;f.ellipse(g,x,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,l.TRUNK,{round:i.round}),e.acorn?f.ellipse(g,x-1.6*r,1.8*r,1*r,l.BARKD,{round:i.round}):f.px(g,x-1,l.BARKL)}m=o}else if(n==="water"){const M=22*r*(e.w||1),g=6*r;f.shape([[u-M,p-g],[u-M*.3,p-g*1.5],[u+M*.6,p-g*1.2],[u+M,p-g*.5],[u+M*.4,p],[u-M*.7,p-g*.2]],l.MAGIC,{group:5,round:.2});for(let x=0;x<6;x++){const v=u+pe(s,-M*.6,M*.6),y=p-g*pe(s,.4,1.1);for(let w=0;w<3*r;w++)f.recolour(v+w,y,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let x=0;x<f.m.length;x++)f.m[x]===l.MAGIC?f.m[x]=l.BODY:f.m[x]===l.MAGIC2&&(f.m[x]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,g=(n==="hedge"?18:12)*r;for(let x=0;x<(n==="hedge"?6:4);x++){const v=u+pe(s,-M*.8,M*.8),y=p-g*pe(s,.4,.7);f.ellipse(v,y,pe(s,6,9)*r,g*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:x})}for(let x=0;x<8;x++){let y=u+pe(s,-M,M),w=p;for(let E=0;E<g*1.2;E++)y+=Math.sin(E*.3+x)*.8,w-=.8,f.px(y,w,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let x=0;x<f.m.length;x++)f.m[x]&&f.m[x]!==l.TRUNK&&ft(x,5,9)<.05&&(f.m[x]=l.FLOWER);m={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,g=12*r;f.shape([[u-M,p],[u-M,p-g],[u+M,p-g],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-M-1,p-g],[u-M-1,p-g-2*r],[u+M+1,p-g-2*r],[u+M+1,p-g]],l.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+M-6*r,p-g-2*r],[u+M-6*r,p-g-7*r],[u+M,p-g-7*r],[u+M,p-g-2*r]],l.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+M-3*r,p-g-9*r,3*r,2.5*r,l.BELLY,{round:i.round});for(let x=p-g+3*r;x<p;x+=4*r)for(let v=u-M;v<u+M;v++)f.recolour(v,x,l.BODY2);m=gs()}else if(n==="rockwall"){for(let M=0;M<5;M++)js(f,[u+(M-2)*9*r,p-pe(s,8,14)*r],8*r,10*r,i,s,e.moss);m={...gs(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const g=u+pe(s,-14,14)*r,x=pe(s,5,11)*r;f.shape([[g-3*r,p],[g-1*r,p-x],[g+1*r,p-x],[g+3*r,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=gs()}else if(n==="web"){const M=[u,p-14*r],g=11*r;for(let x=0;x<8;x++){const v=x/8*Math.PI*2;for(let y=0;y<g;y++)f.px(M[0]+Math.cos(v)*y,M[1]+Math.sin(v)*y,l.WEB,0,0,1)}for(let x=3*r;x<g;x+=3*r)for(let v=0;v<Math.PI*2;v+=.05)f.px(M[0]+Math.cos(v)*x,M[1]+Math.sin(v)*x,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:f,colours:m}}function up(n,e,t,i,s,r){if(e.three)return Zf(n,t,i);if(n==="tree"||n==="log")return Ua(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new pt(a,o),c=a/2,d=o;let f={...gs(),[l.LEAF]:de(t.leaf,.55,.5),[l.LEAF2]:de(t.leaf-.04,.5,.7),[l.TRUNK]:de(i.trunkHue,.45,.34),[l.BARKD]:de(i.trunkHue+.03,.5,.17),[l.MAGIC]:de(i.magicHue,.6,1),[l.MAGIC2]:de(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+16*r,d]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*r,d-6*r],[c-9*r,d-26*r],[c+9*r,d-26*r],[c+9*r,d-6*r]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*r,d-10*r],[c-5*r,d-20*r],[c,d-23*r],[c+5*r,d-20*r],[c+5*r,d-10*r]],l.NOSE,{group:7}),h.shape([[c-13*r,d-26*r],[c,d-34*r],[c+13*r,d-26*r]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,d-13*r,2.5*r,2.5*r,l.MAGIC2,{round:.5}),h.mark([[c-14*r,d-36*r],[c+2*r,d-36*r],[c-4*r,d-24*r],[c-14*r,d-24*r]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*r,d],[c-26*r,d-4*r],[c+26*r,d-4*r],[c+26*r,d]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*r,d-4*r,4*r],[c+u*r,d-34*r,4*r]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*r,d-34*r],[c-28*r,d-38*r],[c+28*r,d-38*r],[c+28*r,d-34*r]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*r,d-38*r],[c-16*r,d-54*r],[c,d-60*r],[c+16*r,d-54*r],[c+24*r,d-38*r]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=Ua("water",{w:1.8},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,g=Math.round(c-u.sp.w/2+m),x=d-u.sp.h+M;u.sp.m[p]&&h.inb(g,x)&&h.px(g,x,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*r,d-6*r,9*r],[c+34*r,d-10*r,8*r]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])js(h,[c+u*r,d-p*r],m*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])js(h,[c+u*r,d-p*r],m*r,M*r,i,s,p>30);h.shape([[c-15*r,d],[c-14*r,d-18*r],[c-4*r,d-28*r],[c+6*r,d-27*r],[c+14*r,d-16*r],[c+15*r,d]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=Ua("water",{w:1.9},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const m=p%u.sp.w,M=p/u.sp.w|0,g=Math.round(c-u.sp.w/2+m),x=d-u.sp.h+M-10*r;u.sp.m[p]&&h.inb(g,x)&&h.px(g,x,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+pe(s,-32,32)*r,M=d-pe(s,2,14)*r,g=pe(s,-.5,.5),x=pe(s,8,16)*r;h.limb([[m-Math.cos(g)*x/2,M-Math.sin(g)*x/2,2.6*r],[m+Math.cos(g)*x/2,M+Math.sin(g)*x/2,2*r]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])js(h,[c+u*r,d-p*r],m*r,M*r,i,s,!0);for(let u=c-6*r;u<c+6*r;u++)for(let p=d-50*r;p<d-4*r;p++)h.px(u,p,ft(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+18*r,d]],l.IRIS,{group:10,round:.2}),f[l.IRIS]=[90,150,190],f[l.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function dp(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Kr}={}){const s=ad[n];if(!s)throw new Error(`no area type "${n}"`);const r=qr(n.split("").reduce((d,f)=>d*31+f.charCodeAt(0),7)>>>0),a=(d,f,u)=>({sp:gn(d.sp,d.colours,e,"none",i),kind:f,text:u}),o=hp(s,e),h=d=>(d||[]).map(([f,u])=>a(Ua(f,u,s,e,r,t),f,"")),c={def:s,floor:{sp:gn(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(c.walls.forEach(d=>d.text=s.text.wall),c.small.forEach(d=>d.text=s.text.small),c.big.forEach(d=>d.text=s.text.big),s.set){const d=up(s.set[0],s.set[1],s,e,r,t);c.setPiece={...a(d,s.set[0],s.text.set),metres:d.metres,origin:d.origin}}return c}const fp=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],pp=16;function mp(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Kr,ppm:s=pp}={}){const r=ad[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,d=[];let f=0;for(const u of fp)for(let p=0;p<u.count;p++,f++){const m=h.length&&(f===2||f===6)?h[(f===6?1:0)%h.length]:o[f%o.length],M=yc(m.type),g=M.fn,x=qr(c*7+f*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,y=u.id==="sapling",w=u.id==="tall"||u.id==="giant",E=M.grow,b=E==="willow",A=E==="narrow"||m.bare,_=E==="wide",C=b?1+(v-1)*.45:E==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,T=(y?.78:1)*(b?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:A&&w?m.bare?.6:.85:w?1.06:1),L={...e,crownWidth:(e.crownWidth||3)*T,leafHue:r.leaf+(m.dark?.05:0),gnarl:Math.min(1,(m.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:m.bare,treeTrunks:y?1:m.trunks,treeLean:m.lean,treeThick:y?void 0:w&&m.thick?m.thick*1.1:m.thick,treeThin:y||m.thin,treeHollow:w&&m.hollow,treeWebs:m.webs},O=g(x,L,e.treeSize*t*(m.scale||1)*C*pe(x,.95,1.05)),I=uo(x,L,g);m.dark&&(I[l.LEAF]=I[l.LEAF3],I[l.LEAF3]=de(r.leaf+.05,.7,.22)),I[l.NOSE]=[20,16,24],I[l.WEB]=[225,225,232];const k=rd(O),H=ae=>gn(ae,I,e,"none",i),K=ae=>+(ae/s).toFixed(2);d.push({heightClass:u.id,species:m.type,scale:+C.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:H(O.sp),top:H(k.top),bot:H(k.bot),crownY:O.crownY,metres:{height:K(O.sp.h),crownBase:K(O.sp.h-O.crownY),crownHeight:K(O.crownY),crownRadius:K(O.sp.w/2)}})}return d}const gp={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function xp(n){const e=new qe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:s=>s[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:s=>s[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Ss.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=xn(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,l.MAGIC2)}return i}const ka={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function od(n,e){const t=new qe({blend:.04}),i=Object.keys(ka).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=P.norm([Math.sin(r),.22,Math.cos(r)]),h=P.norm(P.cross(o,a)),c=[0,.46,0],d=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(g,x)=>d.some(v=>v.some((y,w)=>{const E=v[w+1];if(!E)return!1;const b=E[0]-y[0],A=E[1]-y[1],_=Math.max(0,Math.min(1,((g-y[0])*b+(x-y[1])*A)/(b*b+A*A)));return Math.hypot(g-y[0]-b*_,x-y[1]-A*_)<.014})),u=g=>{const x=P.sub(g,c),v=[P.dot(x,a),P.dot(x,h)+.46,P.dot(x,o)];if(v[2]>s-.02){const y=(v[0]+.17)/.34,w=(.8-v[1])/.5;if(e){const E=(v[0]+.27)/.54,b=(.8-v[1])/.58;if(E>=0&&E<=1&&b>=0&&b<=1&&id(e,E,b,.055))return l.RUNE}else if(y>=0&&y<=1&&w>=0&&w<=1&&Vu(y,w,i+1,.1))return l.RUNE}if(f(v[0],v[1]))return l.STONED;if(v[1]>.86&&ft(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&ft(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,s],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(P.add(P.add(c,P.mul(h,.53)),P.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:P.add(a,P.mul(h,.35)),up:h,cut:!0,paint:u});for(const[g,x,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([g,.015,x],[v,v*.4,v],l.MOSS,{group:2});for(let g=0;g<9;g++){const x=-.3+g*.07,v=.12+g%3*.025-g*.02,y=.07+g*37%5/60;t.seg([x,0,v],[x+(g%3-1)*.02,y,v+.01],.012,.004,g%3?l.LEAF:l.LEAF2,{group:10+g})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:ka[n][0],[l.MAGIC2]:ka[n][1],[l.LINE]:[40,40,50]},m=xn(t,{height:44}).sp;let M=0;for(let g=0;g<600&&M<5;g++){const x=Math.floor(ft(g,i,9)*m.w),v=Math.floor(ft(g,i,10)*m.h*.8);m.get(x,v)||m.get(x+1,v)||m.get(x-1,v)||m.get(x,v+1)||m.get(x,v-1)||(m.px(x,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:m,colours:p}}function Mp(){const n=new qe({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],l.ACCENT,{group:30});return{sp:xn(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function vp(n,{glow:e="cyan",sigil:t,makeCanvas:i=Kr}={}){const s=od(e,t);return gn(s.sp,s.colours,n,"none",i)}function _p(n,{makeCanvas:e=Kr}={}){const t=(c,d)=>gn(c,d,n,"none",e),i={campfire:[0,1,2].map(c=>t(xp(c),gp)),stones:{},pond:null};for(const c of Object.keys(ka)){const d=od(c);i.stones[c]=t(d.sp,d.colours)}const s=Mp(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let c=0;c<s.sp.m.length;c++)s.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function bp(n,e){const t=new Map,i=new Map,s=(h,c,d)=>(h*2097152+(c+1048576))*2097152+(d+1048576),r=(h,c,d)=>{const f=s(h,c,d);let u=t.get(f);if(!u){const p=Math.pow(2,-h);u=[p*(c+Pe(c*7+h,d,n)),p*(d+Pe(c,d*13+h,n+1))],t.set(f,u)}return u},a=(h,c,d)=>{const f=Math.pow(2,-h),u=Math.floor(c/f),p=Math.floor(d/f);let m=u,M=p,g=1/0;for(let x=-2;x<=2;x++)for(let v=-2;v<=2;v++){const y=r(h,u+x,p+v),w=(y[0]-c)**2+(y[1]-d)**2;w<g&&(g=w,m=u+x,M=p+v)}return[m,M]},o=(h,c,d)=>{const f=s(h,c,d);let u=i.get(f);if(u)return u;if(h===0)u=[c,d];else{const p=r(h,c,d),m=a(h-1,p[0],p[1]);u=o(h-1,m[0],m[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(h,c)=>r(0,h,c),partition(h,c){const d=a(e,h,c);return o(e,d[0],d[1])},centreness(h,c,d){const f=r(0,d[0],d[1]),u=Math.hypot(h-f[0],c-f[1]);let p=1/0;const m=Math.floor(h),M=Math.floor(c);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const v=m+g,y=M+x;if(v===d[0]&&y===d[1])continue;const w=r(0,v,y);p=Math.min(p,Math.hypot(h-w[0],c-w[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let d=1/0,f=1/0;const u=Math.floor(h),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const g=r(0,u+m,p+M),x=Math.hypot(h-g[0],c-g[1]);x<d?(f=d,d=x):x<f&&(f=x)}return Math.min(1,2*d/(d+f))}}}function mh(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),d=Math.max(1,Math.ceil(c/e));for(let f=0;f<d;f++){const u=f/d,p=u*u,m=p*u,M=(g,x,v,y)=>.5*(2*x+(-g+v)*u+(2*g-5*x+4*v-y)*p+(-g+3*x-3*v+y)*m);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const yp=new Set(["stream","wetland","bog","beaver-pond"]);class wp{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=Ai(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(m,M)=>m===0?[i.minX+M*r,i.minZ]:m===1?[i.maxX,i.minZ+M*a]:m===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(m,M,g,x)=>{const v=M[0]-m[0],y=M[1]-m[1],w=Math.hypot(v,y),E=Math.max(2,Math.round(w/g)),b=[m];let A=0;for(let _=1;_<E;_++){A=In(A+(s()-.5)*x,-x,x);const S=_/E;b.push([In(m[0]+v*S-y/w*A,i.minX,i.maxX),In(m[1]+y*S+v/w*A,i.minZ,i.maxZ)])}return b.push(M),mh(b,3)},c=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let m=0;m<c;m++){const M=Math.floor(s()*4),g=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,x=h(o(M,.15+s()*.7),o(g,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:x,half:t.railHalf}),m===0&&x.length>20){const v=Math.floor(x.length*(.3+s()*.4)),y=x[v],w=Math.floor(s()*4),E=h(y,o(w,.2+s()*.6),300,120);this.lines.push({kind:"rail",pts:E,half:t.railHalf});const b=x[v+1][0]-y[0],A=x[v+1][1]-y[1],_=Math.hypot(b,A)||1,S=E[Math.min(E.length-1,6)],C=b*(S[1]-y[1])-A*(S[0]-y[0]);this.junctions.push({x:y[0],z:y[1],dx:b/_,dz:A/_,side:C>=0?1:-1,line:this.lines.length-2})}}const d=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let m=0;m<d;m++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),240,110),half:t.roadHalf})}const f=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let m=0;m<f;m++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),90,70),half:t.streamHalf})}const u=(m,M)=>yp.has(Ft[e.typeOf(m,M)].id);for(const[m,M]of e.neighbours){const[g,x]=m.split(",").map(Number);if(u(g,x))for(const v of M){const[y,w]=v.split(",").map(Number);if(m>v||!u(y,w))continue;const[E,b]=this.trim(e.siteOf(g,x),e.siteOf(y,w),this.clearOf(g,x),this.clearOf(y,w));E&&this.lines.push({kind:"stream",pts:this.meander(E,b,s),half:t.streamHalf})}}const p=new Set;for(const[m,M]of e.neighbours){const[g,x]=m.split(",").map(Number);for(const v of M){const y=m<v?`${m}|${v}`:`${v}|${m}`;if(p.has(y))continue;p.add(y);const[w,E]=v.split(",").map(Number);if(w<0||E<0||w>=e.n||E>=e.n||Pe(g*31+w,x*31+E,e.seed+811)>t.linkChance)continue;const[b,A]=this.trim(e.siteOf(g,x),e.siteOf(w,E),this.clearOf(g,x),this.clearOf(w,E));b&&this.lines.push({kind:"path",pts:this.meander(b,A,s),half:t.pathHalf})}if(Pe(g,x,e.seed+813)<t.deadEndChance){const v=e.siteOf(g,x),y=s()*Math.PI*2,w=30+s()*40,E=this.clearOf(g,x),b={x:v.x+Math.cos(y)*E,z:v.z+Math.sin(y)*E};this.lines.push({kind:"path",pts:this.meander(b,{x:b.x+Math.cos(y)*w,z:b.z+Math.sin(y)*w},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((m,M)=>{for(let g=0;g<m.pts.length-1;g++){const[x,v]=[m.pts[g],m.pts[g+1]],y=m.half+4;for(let w=Math.floor((Math.min(x[0],v[0])-y)/this.cell);w<=Math.floor((Math.max(x[0],v[0])+y)/this.cell);w++)for(let E=Math.floor((Math.min(x[1],v[1])-y)/this.cell);E<=Math.floor((Math.max(x[1],v[1])+y)/this.cell);E++){const b=`${w},${E}`;let A=this.grid.get(b);A||this.grid.set(b,A=[]),A.push([M,g])}}}),this.placePieces()}map;lines=[];pieces=[];junctions=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,s=(o,h,c,d)=>{if(e.hardClear(h,c)||e.reserved(h,c,d)||this.pieces.some(m=>Math.hypot(m.x-h,m.z-c)<Math.max(i.pieceGap,m.r+d)))return;const f={id:o,x:h,z:c,r:d};this.pieces.push(f);const u=`${Math.floor(h/this.cell)},${Math.floor(c/this.cell)}`;let p=this.pieceGrid.get(u);p||this.pieceGrid.set(u,p=[]),p.push(f)},r=(o,h,c)=>{const d=o.pts[h],f=o.pts[Math.min(o.pts.length-1,h+1)],u=f[0]-d[0],p=f[1]-d[1],m=Math.hypot(u,p)||1;return[d[0]-p/m*c,d[1]+u/m*c]};this.lines.forEach((o,h)=>{let c=0,d=!1;for(let f=1;f<o.pts.length;f++){const[u,p]=o.pts[f],m=Math.hypot(u-o.pts[f-1][0],p-o.pts[f-1][1]);if(c+=m,o.kind==="rail"){const M=this.railBroken(u,p);if(M&&!d&&Pe(h,f,t+841)<.5&&s("buffer-stop",u,p,4),d=M,c>=i.landmarkSpacing){c=0;const g=Pe(h,f,t+843);if(g<i.landmarkChance){const x=["goods-wagon","carriage","platform","signal-gantry"];s(x[Math.floor(Pe(h,f,t+845)*x.length)],u,p,7)}else g<i.landmarkChance+.3&&!M&&s("signal-post",...r(o,f,o.half-.6),1.2)}}else o.kind==="road"&&c>=i.vergeSpacing&&(c=0,s("verge-post",...r(o,f,(Pe(h,f,t+847)<.5?1:-1)*(o.half-.7)),.8))}if(o.kind==="path"&&!o.deadEnd){const f=m=>{const M=Ft[e.areaAt(m[0],m[1]).type];return["rocky-slope","ravine","cave-mouth"].includes(M.id)||!!M.layout.terrain?.includes("hollows")},u=[o.pts[0],o.pts[o.pts.length-1]].filter(f),p=u[Math.floor(Pe(h,7,t+849)*u.length)];p&&Pe(Math.round(p[0]),Math.round(p[1]),t+849)<i.stairsChance&&s(Pe(Math.round(p[1]),3,t+851)<.7?"stairs":"stairs-turn",p[0],p[1],3)}});const a=new Set;this.lines.forEach((o,h)=>{if(!(o.kind!=="path"&&o.kind!=="road"))for(let c=0;c<o.pts.length-1;c++){const d=o.pts[c],f=o.pts[c+1],u=`${Math.floor(d[0]/this.cell)},${Math.floor(d[1]/this.cell)}`;for(const[p,m]of this.grid.get(u)??[]){const M=this.lines[p];if(M.kind!=="stream"&&!(M.kind==="rail"&&o.kind==="road"))continue;const g=M.pts[m],x=M.pts[m+1],v=Sp(d,f,g,x);if(!v)continue;const y=`${h}|${p}|${Math.round(v[0]/20)},${Math.round(v[1]/20)}`;a.has(y)||(a.add(y),M.kind==="stream"?s(o.kind==="road"||Pe(h,p,t+853)<.5?"footbridge":"rope-bridge",v[0],v[1],4):s("level-crossing",...r(o,c,o.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)if(!(!i&&!s)){for(const r of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+s}`)??[])if(Math.hypot(r.x-e,r.z-t)<r.r)return r}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),d=i()<.5?1:-1;for(let f=1;f<o;f++){const u=f/o,p=c*(.4+.6*i())*(f%2?d:-d);h.push([e.x+s*u-r/a*p,e.z+r*u+s/a*p])}return h.push([t.x,t.z]),mh(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[c,d]=[h.pts[o],h.pts[o+1]],f=d[0]-c[0],u=d[1]-c[1],p=f*f+u*u||1,m=In(((e-c[0])*f+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-f*m,t-c[1]-u*m);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return ki(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function Sp(n,e,t,i){const s=[e[0]-n[0],e[1]-n[1]],r=[i[0]-t[0],i[1]-t[1]],a=s[0]*r[1]-s[1]*r[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a,h=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+s[0]*o,n[1]+s[1]*o]:null}const Ep=Df.types,Ft=gr.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Ep[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),qn=(n,e)=>n+","+e;function Ap(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Tp(n,e,t,i){const s=new Map,r=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const d=qn(h[0],h[1]),f=qn(c[0],c[1]);s.has(d)||s.set(d,new Set),s.has(f)||s.set(f,new Set),s.get(d).add(f),s.get(f).add(d)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let d=0;d<=a;d++){const f=n.partition(e+d/i,e+h/i);c.push(f),d>0&&r(f,c[d-1]),h>0&&r(f,o[d])}o=c}return s}function Rp(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=Ft.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(B,z)=>{const N=B/s,Z=z/s;return[N+o*(ki(N/a,Z/a,n+91)-.5)*2,Z+o*(ki(N/a,Z/a,n+92)-.5)*2]},c=(B,z)=>{let N=B*s,Z=z*s;for(let j=0;j<30;j++){const[ce,ye]=h(N,Z);N+=(B-ce)*s,Z+=(z-ye)*s}return[N,Z]},d=bp(n,e.borderLayers),f=-i,u=t+i,p=Tp(d,f,u,6),m=new Map,M=Ai(n*5+1);for(let B=f;B<u;B++)for(let z=f;z<u;z++){const N=new Set;for(let ce=-2;ce<=2;ce++)for(let ye=-2;ye<=2;ye++){const _e=m.get(qn(z+ye,B+ce));_e!==void 0&&N.add(_e)}for(const ce of p.get(qn(z,B))??[]){const ye=m.get(ce);ye!==void 0&&N.add(ye)}const Z=[...Array(r).keys()].filter(ce=>!N.has(ce)),j=Z.length?Z:[...Array(r).keys()];m.set(qn(z,B),j[Math.floor(M()*j.length)])}const g=(B,z)=>m.get(qn(B,z))??Math.floor(Pe(B,z,n+17)*r),x=Math.floor(t/2),v=(B,z)=>{const N=d.site(B,z),Z=d.partition(N[0],N[1]);return Z[0]===B&&Z[1]===z};let y=[x,x];for(const[B,z]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(x+B,x+z)){y=[x+B,x+z];break}const w=(B,z)=>{const N=d.site(B,z),Z=c(N[0],N[1]);return{x:Z[0],z:Z[1]}},E=w(y[0],y[1]),b=(B,z)=>{const[N,Z]=h(B,z),j=d.partition(N,Z);return{cell:j,type:g(j[0],j[1]),openness:d.openness(N,Z)}},A=(B,z)=>{const N=Ft[g(B,z)];return N.setPiece&&Pe(B,z,n+61)<e.setPieceChance?N.setPiece:null},_=e.dancefloor.radius,S=_+e.dancefloor.clearing,C=(B,z,N,Z)=>{const j=b(B,z).cell;return j[0]===N&&j[1]===Z},T=new Map,L=(B,z)=>{const N=qn(B,z),Z=T.get(N);if(Z)return Z;const j=w(B,z),ce=Ai(n*17+B*53+z*911);let[ye,_e]=[j.x,j.z];if(!C(j.x,j.z,B,z))e:for(let ge=2;ge<s*.75*1.5;ge+=2)for(let Me=0;Me<16;Me++){const Ne=Me/16*Math.PI*2,Ze=j.x+Math.cos(Ne)*ge,lt=j.z+Math.sin(Ne)*ge;if(C(Ze,lt,B,z)){[ye,_e]=[Ze,lt];break e}}let oe={x:ye,z:_e};for(let ge=0;ge<24;ge++){const Me=ce()*Math.PI*2,Ne=3+ce()*4,Ze=ye+Math.cos(Me)*Ne,lt=_e+Math.sin(Me)*Ne+3;if(C(Ze,lt,B,z)){oe={x:Ze,z:lt};break}}return T.set(N,oe),oe},O=e.treehouse,I=O.angle*Math.PI/180,k={x:E.x+Math.cos(I)*(S+O.distance),z:E.z+Math.sin(I)*(S+O.distance)},H=new Map,K=(B,z)=>{const N=qn(B,z);if(H.has(N))return H.get(N);let Z=null;if(A(B,z)&&!(B===y[0]&&z===y[1])){const j=e.setPieceFootprint*e.setPieceScale,ce=e.reserveMargin,ye=[qn(B,z),...p.get(qn(B,z))??[]].map(ge=>{const[Me,Ne]=ge.split(",").map(Number);return L(Me,Ne)}),_e=(ge,Me)=>C(ge,Me,B,z)&&ye.every(Ne=>Math.hypot(ge-Ne.x,Me-Ne.z)>=j+e.soundsystemFootprint+ce)&&Math.hypot(ge-E.x,Me-E.z)>=j+S+ce&&Math.hypot(ge-k.x,Me-k.z)>=j+O.clear+ce,oe=w(B,z);e:for(let ge=0;ge<=s*.35;ge+=3)for(let Me=0;Me<(ge?16:1);Me++){const Ne=Me/16*Math.PI*2,Ze=oe.x+Math.cos(Ne)*ge,lt=oe.z-4+Math.sin(Ne)*ge;if(_e(Ze,lt)){Z={x:Ze,z:lt};break e}}}return H.set(N,Z),Z},ae=[],q=(B,z,N)=>{const Z=e.reserveMargin,j=b(B,z).cell;if(Math.hypot(B-E.x,z-E.z)<N+S+Z||Math.hypot(B-k.x,z-k.z)<N+O.clear+Z)return!0;for(const ce of ae)if(Math.hypot(B-ce.x,z-ce.z)<N+ce.r+Z)return!0;for(const ce of[qn(j[0],j[1]),...p.get(qn(j[0],j[1]))??[]]){const[ye,_e]=ce.split(",").map(Number);if(!(ye===y[0]&&_e===y[1])){const ge=L(ye,_e);if(Math.hypot(B-ge.x,z-ge.z)<N+e.soundsystemFootprint+Z)return!0}const oe=K(ye,_e);if(oe&&Math.hypot(B-oe.x,z-oe.z)<N+e.setPieceFootprint*e.setPieceScale+Z)return!0}return!1},ie=e.grounds;for(let B=0;B<t;B++)for(let z=0;z<t;z++){if(z===y[0]&&B===y[1]||Pe(z,B,n+871)>=ie.chance)continue;const N=ie.kinds[Math.floor(Pe(z,B,n+873)*ie.kinds.length)],Z=ie.radius[N]??8,j=Pe(z,B,n+875)*Math.PI*2,ce=w(z,B);e:for(const ye of[Z+6,Z+14,Z+24])for(let _e=0;_e<12;_e++){const oe=j+_e/12*Math.PI*2,ge=ce.x+Math.cos(oe)*ye,Me=ce.z+Math.sin(oe)*ye;if(C(ge,Me,z,B)&&!q(ge,Me,Z)){ae.push({kind:N,x:ge,z:Me,r:Z});break e}}}const F=(B,z,N)=>{if(Math.hypot(B-E.x,z-E.z)<S||Math.hypot(B-k.x,z-k.z)<O.clear)return!0;for(const ce of ae)if(Math.abs(B-ce.x)<ce.r&&Math.abs(z-ce.z)<ce.r&&Math.hypot(B-ce.x,z-ce.z)<ce.r)return!0;const Z=K(N[0],N[1]);if(Z&&Math.hypot(B-Z.x,z-Z.z)<e.setPieceClear*e.setPieceScale)return!0;if(N[0]===y[0]&&N[1]===y[1])return!1;const j=L(N[0],N[1]);return Math.hypot(B-j.x,z-j.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},ee=(B,z)=>{const[N,Z]=h(B,z);return F(B,z,d.partition(N,Z))},se=(B,z)=>{const[N,Z]=h(B,z);if(F(B,z,d.partition(N,Z)))return 0;const j=1-sn((ki(B/e.gladeScale,z/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return sn((d.openness(N,Z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*j},ue=(B,z)=>Math.min(1,Math.hypot(B-y[0],z-y[1])/(t/2)),xe=s*.5,Ce={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:d,centreCell:y,dancefloor:{x:E.x,z:E.z,radius:_},treehouse:k,grounds:ae,start:{x:k.x,z:k.z+1},bounds:{minX:xe,maxX:t*s-xe,minZ:xe,maxZ:t*s-xe},extent:{minX:f*s,maxX:u*s,minZ:f*s,maxZ:u*s},typeOf:g,areaAt:b,siteOf:w,treeWeight:se,hardClear:ee,neighbours:p,setPieceOf:A,soundsystemSpot:L,setPieceSpot:K,reserved:q,remoteness:ue,paths:null};return Ce.paths=new wp(Ce),Ce}function wc(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function Cp(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const or=(n,e)=>Zn(e.groundHeight,e.treetopHeight,sn(n.lift)),Ao=n=>sn(n.lift);function Lp(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const d=sn(a),f=Zn(i.groundSpeed,i.treetopSpeed,d),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,m=n.vz+(h*i.groundSpeed-n.vz)*u,M=Pp(n,o,h,t,i);let g=Zn(p,M.vx,d),x=Zn(m,M.vz,d);const v=M.boost*d,y=M.braking&&d>.5;let w=n.x+g*t,E=n.z+x*t;(w<s.minX||w>s.maxX)&&(w=In(w,s.minX,s.maxX),g=0),(E<s.minZ||E>s.maxZ)&&(E=In(E,s.minZ,s.maxZ),x=0);const b=g>.3?1:g<-.3?-1:n.facing,A=Math.hypot(g,x),_=wc(g,x,n.away,Math.max(1,f*.15),i);return{x:w,z:E,vx:g,vz:x,lift:a,mode:r,facing:b,away:_,lean:A>f*i.leanAt,boost:v,braking:y}}function Pp(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const y=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*y,vz:n.vz*y,boost:h*y,braking:!1}}const d=e/a,f=t/a;let u=d,p=f,m=0;if(o>2){const y=n.vx/o,w=n.vz/o;m=Math.acos(In(y*d+w*f,-1,1));const E=y*f-w*d,b=r.turnRate*(1-.5*h)*Math.PI/180,A=Math.min(m,b*i)*(E>=0?1:-1),_=Math.cos(A),S=Math.sin(A);u=y*_-w*S,p=y*S+w*_}const M=m*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),c=o>s.treetopSpeed*.5):h=Math.max(0,h-i*.5);const g=s.treetopSpeed*(1+(r.boost-1)*h)*a,x=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(g-o)*x;return{vx:u*v,vz:p*v,boost:h,braking:c}}const fo=3;function Dp(n,e,t=.5,i=1){const s=n.tuning,r=In(e,0,1),a=Math.max(0,Math.round(Zn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<Ip(n,r)?1:0,h=Math.max(0,a-o),c=Math.round(h*s.adultShareFar*sn((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),d=Math.round((h-c)*s.youngShareFar*r);return{babies:Math.max(0,h-c-d),young:d,adults:c,legends:o}}const Ip=(n,e)=>n.tuning.legendChanceFar*sn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),ld=n=>n.areaSize*.75,Ka=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function Op(n,e,t,i,s){if(Ka(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,c=i+Math.sin(o)*r;if(Ka(n,h,c,e))return[h,c]}return[t,i]}function qa(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(Ka(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Np(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=Ai(n.seed*7919+o*131+a*977+3),c=Ft[n.typeOf(o,a)],d=n.siteOf(o,a),f=n.remoteness(o,a),u=Dp(n,f,Pe(o,a,n.seed+43),Pe(o,a,n.seed+47)),p=M=>{const g=[o,a],x=ld(n),[v,y]=Op(n,g,d.x,d.z,x),w={cell:g,homeX:d.x,homeZ:d.z,range:x,anchorX:v,anchorZ:y},[E,b]=qa(n,w,h);return{id:i++,species:c.creature,level:M,...w,x:E,z:b,tx:E,tz:b,rest:h()*3,speed:(M===fo?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:Ai(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const m=t.legendNextToHome&&o===s+1&&a===r;(u.legends||m)&&e.push(p(3))}return e}function Fp(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=qa(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!Ka(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=wc(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===fo?1.5:4)}function Up(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=Ai(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=qa(a,o,h),[o.tx,o.tz]=qa(a,o,h),o.rest=h()*2}o.seen=r,Fp(o,s,a)}}const kp={wall:"run",hedge:"run",bramble:"run",rockwall:"run",henge:"ring",water:"clump",reeds:"clump",boulder:"clump"},Bp={wall:2.4,hedge:2.2,bramble:2,rockwall:2.8},cd=new Map(gr.map(n=>[n.id,{wall:n.wall?.[0]?.[0]??null,beds:n.small?.[0]?.[0]==="flowerbed"}]));function zp(n,e,t){const i=n.typeOf(e,t),s=Ft[i],r=n.tuning.walls,a={walls:[],beds:[]},o=cd.get(s.id);if(!o?.wall)return a;const h=kp[o.wall]??"clump",c=Ai(n.seed*97+e*7919+t*104729+17),d=n.siteOf(e,t),f=n.areaSize;let u=0;const p=(x,v)=>{const y=n.areaAt(x,v).cell;return y[0]===e&&y[1]===t},m=(x,v)=>p(x,v)&&!n.hardClear(x,v)&&!n.reserved(x,v,1.5)&&n.paths.clearance(x,v).bushes!==0,M=(x,v,y)=>m(v,y)?(x.push({x:v,z:y,type:i,variant:Math.floor(Pe(e*131+u,t*37+u++,n.seed+311)*1e6),flip:c()<.5}),!0):!1,g=()=>{let x={x:d.x,z:d.z};for(let v=0;v<10;v++){const y=c()*Math.PI*2,w=f*(.12+c()*.3);if(x={x:d.x+Math.cos(y)*w,z:d.z+Math.sin(y)*w},m(x.x,x.z))break}return x};if(h==="run"){const x=r.runs[0]+Math.floor(c()*(r.runs[1]-r.runs[0]+1)),v=Bp[o.wall]??2.4;for(let y=0;y<x;y++){const w=g(),E=n.paths.at(w.x,w.z,18);let b=Math.cos(c()*Math.PI*2),A=0;A=Math.sqrt(1-b*b)*(c()<.5?1:-1);let _=w.x,S=w.z;if(E){const L=n.paths.lines[E.line],O=L.pts[E.seg],I=L.pts[E.seg+1],k=Math.hypot(I[0]-O[0],I[1]-O[1])||1;b=(I[0]-O[0])/k,A=(I[1]-O[1])/k;const H=c()<.5?1:-1,K=L.half+2.5;_=O[0]-A*K*H,S=O[1]+b*K*H}const C=r.runLength[0]+Math.floor(c()*(r.runLength[1]-r.runLength[0]+1)),T=c()<r.gateChance?Math.floor(C/2):-1;for(let L=0;L<C;L++){if(L===T||L===T+1)continue;const O=_+b*v*L,I=S+A*v*L;M(a.walls,O,I)&&o.beds&&L%2===0&&M(a.beds,O-A*1.8,I+b*1.8)}}}else if(h==="ring"){const x=r.rings[0]+Math.floor(c()*(r.rings[1]-r.rings[0]+1));for(let v=0;v<x;v++){let y=v===0?n.setPieceSpot(e,t):null,w=y??g(),E=0;for(let b=0;b<6;b++){const A=r.ringStones[0]+Math.floor(c()*(r.ringStones[1]-r.ringStones[0]+1)),_=c()*Math.PI*2;E=y?n.tuning.setPieceFootprint*n.tuning.setPieceScale+3+c()*3:r.ringRadius[0]+c()*(r.ringRadius[1]-r.ringRadius[0]);const S=Array.from({length:A},(C,T)=>{const L=_+T/A*Math.PI*2+(c()-.5)*.15;return[w.x+Math.cos(L)*E,w.z+Math.sin(L)*E]});if(S.filter(([C,T])=>m(C,T)).length*2>=A){for(const[C,T]of S)M(a.walls,C,T);break}y=null,w=g()}if(c()<r.avenueChance){const b=c()*Math.PI*2,A=Math.cos(b),_=Math.sin(b);for(let S=1;S<=4;S++)for(const C of[-1,1])M(a.walls,w.x+A*(E+S*4)-_*C*2.5,w.z+_*(E+S*4)+A*C*2.5)}}if(c()<r.loneChance){const v=g();M(a.walls,v.x,v.z)}}else{const x=r.clumps[0]+Math.floor(c()*(r.clumps[1]-r.clumps[0]+1));for(let v=0;v<x;v++){const y=g(),w=r.clumpSize[0]+Math.floor(c()*(r.clumpSize[1]-r.clumpSize[0]+1));for(let E=0;E<w;E++){const b=c()*Math.PI*2,A=Math.sqrt(c())*r.clumpRadius;M(a.walls,y.x+Math.cos(b)*A,y.z+Math.sin(b)*A)}}}return a}function Hp(n,e){return!!cd.get(Ft[e].id)?.beds}const Gp=4,Ct=32;function Wp(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function hd(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(ki(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Pe(i,s,r+1)-.5)*a.width*a.stray,c=(ki(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Pe(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function Sc(n,e,t,i){const s=n.tuning,r=s.density,a=Ft[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=ki(e/r.patchScale,t/r.patchScale,o+91),d=r.patchMin+(r.patchMax-r.patchMin)*sn((c-.25)/.5),f=n.treeWeight(e,t)*a.density*d*Vp(n,e,t,a)*s.treeDensity;return Math.max(f,r.lone)*h}function Vp(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=ki(e/a,t/a,s+93);return 1+r*(2.2*sn((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*sn((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*sn((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*sn((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function gh(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=Wp(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*Ct/s),d=Math.ceil((t+1)*Ct/s);for(let f=c;f<d;f++){const u=f&1?.5:0,p=Math.ceil(e*Ct/i-u),m=Math.ceil((e+1)*Ct/i-u);for(let M=p;M<m;M++){const g=(M+u+(Pe(M,f,r+101)-.5)*.7)*i,x=(f+(Pe(M,f,r+102)-.5)*.7)*s,v=hd(n,g,x,M,f,r+106),y=Sc(n,g,x,v);Pe(M,f,r+103)>=y||n.hardClear(g,x-o)||n.hardClear(g-h,x-o)||n.hardClear(g+h,x-o)||a.push({x:g,z:x,type:v,variant:Math.floor(Pe(M,f,r+104)*1000003),flip:Pe(M,f,r+105)<.5})}}return a}function xh(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*Ct/i),o=Math.ceil((t+1)*Ct/i),h=Math.ceil(e*Ct/i),c=Math.ceil((e+1)*Ct/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){const u=(f+Pe(f,d,s+201)-.5)*i,p=(d+Pe(f,d,s+202)-.5)*i,m=1+n.tuning.bushClump*(2*sn((ki(u/13,p/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const g=hd(n,u,p,f,d,s+206);if(Hp(n,g))continue;const x=1-Math.min(1,Sc(n,u,p,g)/.8);Pe(f,d,s+203)>(.15+.85*x)*Ft[g].layout.undergrowth*n.tuning.bushDensity*m*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||n.hardClear(u,p)||r.push({x:u,z:p,type:g,variant:Math.floor(Pe(f,d,s+204)*Gp),flip:Pe(f,d,s+205)<.5})}return r}function Yp(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=(e+(Pe(e,t,r+501)-.5)*.8)*s,o=(t+(Pe(e,t,r+502)-.5)*.8)*s,h=n.areaAt(a,o),c=Ft[h.type].layout,d=c.decor,f=d?d.rate/.3:1,u=c.terrain?.includes("rocky")?2:1,p=d?[d.ruins,d.rocks*u,d.freak]:[i.ruins,i.rocks*u,i.freak],m=p[0]+p[1]+p[2]||1,M=(i.ruins+i.rocks+i.freak)*f*(d?(d.ruins+d.rocks+d.freak)/Math.max(.01,d.ruins+d.rocks+d.freak+d.lake+d.modern):1)*(u>1?1.5:1),g=Pe(e,t,r+503);if(g>=M||h.openness<i.clearing||n.hardClear(a,o)||n.paths.at(a,o,i.pathGap)||n.reserved(a,o,i.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)return null;const x=1-Math.min(1,Sc(n,a,o,h.type)/.8);if(Pe(e,t,r+504)>.35+.65*x)return null;const v=g/M*m,y=v<p[0]?"ruins":v<p[0]+p[1]?"rocks":"freak";return{x:a,z:o,family:y,variant:Math.floor(Pe(e,t,r+505)*1e6),flip:Pe(e,t,r+506)<.5,rank:Pe(e,t,r+507)}}function ud(n,e,t,i,s,r,a){const o=[],h=Math.ceil(t/e)+1;for(let c=r;c<a;c++)for(let d=i;d<s;d++){const f=n(d,c);if(!f)continue;let u=!0;for(let p=-h;p<=h&&u;p++)for(let m=-h;m<=h;m++){if(!m&&!p)continue;const M=n(d+m,c+p);if(M&&M.rank>f.rank&&Math.hypot(M.x-f.x,M.z-f.z)<t){u=!1;break}}u&&o.push(f)}return o}function Mh(n,e,t){const i=n.tuning.decor,s=i.spacing;return ud((r,a)=>Yp(n,r,a),s,i.minGap,Math.ceil(e*Ct/s),Math.ceil((e+1)*Ct/s),Math.ceil(t*Ct/s),Math.ceil((t+1)*Ct/s)).map(({rank:r,...a})=>a)}function Xp(n,e,t){const i=n.tuning.relics,s=i.spacing,r=n.seed,a=(e+(Pe(e,t,r+881)-.5)*.8)*s,o=(t+(Pe(e,t,r+882)-.5)*.8)*s,h=n.areaAt(a,o),c=Ft[h.type].layout.decor,d=c?c.modern/Math.max(.01,c.ruins+c.rocks+c.freak+c.lake+c.modern):.1,f=n.paths.at(a,o,20),u=f&&(f.kind==="road"||f.kind==="rail")?i.nearRoad:1;return Pe(e,t,r+883)>=i.chance*(.5+5*d)*u||h.openness<n.tuning.decor.clearing||n.hardClear(a,o)||n.paths.at(a,o,2)||n.paths.pieceAt(a,o)||n.reserved(a,o,n.tuning.decor.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6?null:{x:a,z:o,variant:Math.floor(Pe(e,t,r+884)*1e6),flip:Pe(e,t,r+885)<.5,rank:Pe(e,t,r+886)}}function vh(n,e,t){const i=n.tuning.relics,s=i.spacing;return ud((r,a)=>Xp(n,r,a),s,i.minGap,Math.ceil(e*Ct/s),Math.ceil((e+1)*Ct/s),Math.ceil(t*Ct/s),Math.ceil((t+1)*Ct/s)).map(({rank:r,...a})=>a)}const Kp=new Set(["wetland","stream","bog","beaver-pond","moor"]);function _h(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Ct/s),h=Math.ceil((t+1)*Ct/s),c=Math.ceil(e*Ct/s),d=Math.ceil((e+1)*Ct/s);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(Pe(u,f,r+401)-.5)*.7)*s,m=(f+(Pe(u,f,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(p,m),g=M.openness<.35||M.openness>.8?1:.25,x=Pe(u,f,r+403),y=(Kp.has(Ft[M.type].id)||!!Ft[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*g,w=i.campfire*g,E=i.magicStone*g,b=x<y?"pond":x<y+w?"campfire":x<y+w+E?"stone":null;b&&a.push({x:p,z:m,kind:b,size:.75+Pe(u,f,r+404)*.5})}return a}class Ec{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;wallFeatureCache=new Map;lights=new Map;decor=new Map;relics=new Map;buildMs=0;static KEEP=2500;centre={x:0,z:0};chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/Ct);r<=Math.floor((t+i)/Ct);r++)for(let a=Math.floor((e-i)/Ct);a<=Math.floor((e+i)/Ct);a++)s.push([a,r]);return s}evict(e,t=Ec.KEEP,i=Ct){if(e.size<=t)return;const s=this.centre,r=[...e.keys()].map(a=>{const[o,h]=a.split(",").map(Number);return[a,((o+.5)*i-s.x)**2+((h+.5)*i-s.z)**2]});r.sort((a,o)=>o[1]-a[1]);for(const[a]of r.slice(0,e.size-Math.floor(t*.8)))e.delete(a)}chunk(e,t,i,s){const r=i+","+s;let a=e.get(r);if(!a){const o=performance.now();a=t(i,s),this.buildMs+=performance.now()-o,e.set(r,a)}return a}gather(e,t,i,s,r){this.centre={x:i,z:s},this.evict(e);const a=[];for(const[o,h]of this.chunks(i,s,r))for(const c of this.chunk(e,t,o,h))Math.abs(c.x-i)<=r&&Math.abs(c.z-s)<=r&&a.push(c);return a}kinds(){const e=this.map;return[[this.trees,(t,i)=>gh(e,t,i)],[this.bushes,(t,i)=>xh(e,t,i)],[this.decor,(t,i)=>Mh(e,t,i)],[this.relics,(t,i)=>vh(e,t,i)],[this.lights,(t,i)=>_h(e,t,i)]]}prefetch(e,t,i,s){const r=performance.now(),a=this.kinds(),o=this.chunks(e,t,i).filter(([u,p])=>a.some(([m])=>!m.has(u+","+p)));o.sort((u,p)=>((u[0]+.5)*Ct-e)**2+((u[1]+.5)*Ct-t)**2-(((p[0]+.5)*Ct-e)**2+((p[1]+.5)*Ct-t)**2));let h=0;for(const[u,p]of o){if(h>0&&performance.now()-r>s)break;for(const[m,M]of a)this.chunk(m,M,u,p);h++}const c=this.map.areaSize,d=[];for(let u=Math.floor((t-i)/c)-1;u<=Math.floor((t+i)/c)+1;u++)for(let p=Math.floor((e-i)/c)-1;p<=Math.floor((e+i)/c)+1;p++)this.wallFeatureCache.has(p+","+u)||d.push([p,u,((p+.5)*c-e)**2+((u+.5)*c-t)**2]);d.sort((u,p)=>u[2]-p[2]);let f=0;for(const[u,p]of d){if(performance.now()-r>s)break;this.featuresOf(u,p),f++}return o.length-h+d.length-f}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>gh(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>xh(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>_h(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>Mh(this.map,s,r),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(s,r)=>vh(this.map,s,r),e,t,i)}features(e,t,i,s){const r=this.map.areaSize,a=[];this.centre={x:e,z:t},this.evict(this.wallFeatureCache,400,r);for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++)for(const c of s(this.featuresOf(h,o)))Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push(c);return a}featuresOf(e,t){const i=e+","+t;let s=this.wallFeatureCache.get(i);if(!s){const r=performance.now();s=zp(this.map,e,t),this.buildMs+=performance.now()-r,this.wallFeatureCache.set(i,s)}return s}wallsNear(e,t,i){return this.features(e,t,i,s=>s.walls)}bedsNear(e,t,i){return this.features(e,t,i,s=>s.beds)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const c=s.setPieceSpot(h,o);c&&Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push({x:c.x,z:c.z,type:s.typeOf(h,o),variant:0,flip:Pe(h,o,s.seed+71)<.5})}return a}}const qp=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),dd=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],$p=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],wl=n=>!n.leashed&&n.level!==fo;function Zp(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function To(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!wl(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function bh(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function Jp(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,c=o.leash,d=f=>e[f];if(t.talk&&s){const f=n.talk?d(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(f.id,n.talk.t),f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(bh(n,f,f.x,f.z,r),n.progress.delete(f.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const u=To(e,i.x,i.z,h.talkRange)??To(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!wl(u),t:n.progress.get(u.id)??0,total:wl(u)?dd(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[f,u]of n.progress){if(n.talk?.id===f)continue;const p=u-a*h.decayRate;p<=0||e[f].leashed?n.progress.delete(f):n.progress.set(f,p)}if(t.inviteNearest){const f=To(e,i.x,i.z,1/0);f&&bh(n,f,f.x,f.z,r)}if(t.sigil&&s){let f=-1,u=c.pickRadius;if(n.placed.forEach((p,m)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,f=m)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];fd(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const f of n.stack)yh(d(f),i.x,i.z,a,o);for(const f of n.placed)yh(d(f.id),f.x,f.z,a,o)}const fd=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function yh(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),m=a*.5/p;n.tx=e+(n.x-e)*m,n.tz=t+(n.z-t)*m,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,m=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*m,n.tz=t+Math.sin(p)*m,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,d=Math.hypot(h,c);if(d<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,r.runSpeed*(n.level===fo?.6:1)):n.speed*1.5,u=Math.min(d,f*i);n.x+=h/d*u,n.z+=c/d*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=wc(h,c,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const Qp=n=>`${n[0]},${n[1]}`;function jp(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Qp(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function em(n,e){const t=Math.floor(Pe(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}const tm=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function pd(n,e){const t=n.wave+1,i=new Map;for(const[a,o]of n.areas)for(const h of e.neighbours.get(a)??[]){if(n.areas.has(h)||i.has(h))continue;const c=h.split(",").map(Number);tm(e,c)&&i.set(h,{key:h,cell:c,from:o.cell})}const s=[...i.values()].sort((a,o)=>Pe(a.cell[0],a.cell[1],e.seed+t)-Pe(o.cell[0],o.cell[1],e.seed+t)),r=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;return s.slice(0,r)}function md(n,e,t){const i=n.wave+1,s=[];for(const{key:r,cell:a,from:o}of pd(n,e)){const h={cell:a,wave:i,at:t,from:o,soundsystem:em(e,a)};n.areas.set(r,h),s.push(h)}return n.wave=i,s}function nm(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,md(n,e,t))}function gd(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function im(n,e){const t=new Set(pd(n,e).map(s=>s.key)),i=[];for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=`${r},${s}`;if(n.areas.has(a))continue;const o=e.soundsystemSpot(r,s);i.push({key:a,cell:[r,s],x:o.x,z:o.z,awake:t.has(a)})}return i}function sm(n,e){const t=Rp(n,e),i={...Cp(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new Ec(t),creatures:Np(t),clock:Cf(),witch:i,camera:Af(e,i.x,or(i,e),i.z),party:jp(t),leash:qp()}}function rm(n,e,t){const i=Lf(n.clock,t);i!==0&&(n.witch=Lp(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Tf(n.camera,e.zoom,{x:n.witch.x,y:or(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(md(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),nm(n.party,n.map,n.clock.time,i),Up(n.creatures,n.witch.x,n.witch.z,am(n),i,n.clock.time,n.map),Jp(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const am=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+ld(n.map)*2.5),wh=n=>Wu(n.camera,n.camera.lift,n.tuning);function xd(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Ft[e.type].name+(t?` (set piece: ${t})`:"")}const om="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",lm="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",cm=20,hm=28,um=4,dm=.7,fm=4,pm="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",mm=1,gm=.2,xm=.18,Mm=.25,vm=38,_m="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",bm={width:20,scale:40,stray:.5},ym="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",wm={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},Sm=.16,Em=.8,Am=2.25,Tm="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",Rm={from:20,keep:.35},Cm=1.7,Lm=4.6,Pm=2.8,Dm=10.5,Im=11.25,Om=3.4,Nm="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",Fm=17.5,Um=32,km=10,Bm="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRate degrees a second (half that at full boost), so she swoops in arcs; a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second (and she brakes); letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",zm={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,glideTime:1,sharpTurnBleed:3,cameraPull:.06},Hm=28,Gm=.7,Wm={awayEnter:55,awayLeave:65},Vm=.7,Ym=.55,Xm=1.4,Km=24,qm="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",$m={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Zm="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches along the ground (nothing beyond); glowFalloff: how fast it falls off, as (1 - distance/glowReach)^glowFalloff (2.5: about half at 12 m with a 50 m reach, a faint tail to 40 m). ?glow=<reach>,<falloff> in the URL tries other values live. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Jm=3,Qm=50,jm=2.5,eg=8,tg=1,ng=16,ig=12,sg=20,rg="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",ag="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), full under her, falling off as glowFalloff says out to glowReach metres, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",og={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},lg=.65,cg="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",hg={bpm:120},ug="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",dg="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",fg={height:3,opacity:.65,beam:.25,size:1},pg={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},mg="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",gg={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},xg="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Mg={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},vg="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",_g={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},bg={spacing:10,campfire:.012,magicStone:0,pond:.02,wetPond:.12},yg={near:150,far:360},wg="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Sg={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},Eg="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",Ag="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Tg={on:!0,strength:.7,trees:!1},Rg={on:!0,strength:.45,height:18,cover:.55,wind:.6},Cg={on:!0,strength:.12,height:3,wind:.8},Lg="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Pg="smooth",Dg="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",Ig=0,Og="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",Ng={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},Fg="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",Ug={emojiPixels:11,scale:1},kg="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",Bg={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},zg="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).",Hg={spacing:34,chance:.0067,nearRoad:4,minGap:80},Gg="Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.",Wg={runs:[3,5],runLength:[5,10],gateChance:.5,rings:[1,2],ringStones:[6,12],ringRadius:[6,11],avenueChance:.35,loneChance:.3,clumps:[2,4],clumpSize:[3,6],clumpRadius:5},Vg="Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. beamHeight: the beacon's height (metres); lightRange: stones within this many metres light the scene. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives.",Yg={scale:2.25,beamHeight:46,lightRange:160,dormant:{glow:.5,light:.55,reach:12,beam:.1},awake:{glow:[.7,1],light:.9,lightBuild:1,reach:18,beam:.3,motes:8,moteBuild:12},flare:{time:1.6,light:3.5}},Xg="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",Kg={spacing:26,ruins:.01,rocks:.03,freak:.004,minGap:80,clearing:.3,pathGap:2,footprint:4},qg="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next; stairs (stairsChance) only where a path goes down into a steep or sunken area, one flight per path at most; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",$g={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,pieceGap:40,stairsChance:.4,treesOnBroken:.35,edgeBushes:3,bushBoost:3},Zg="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",Jg={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},Qg={length:8,runSpeed:4,pickRadius:2,spacing:4},jg={rim:!0,sparks:!0,thread:!0,sparkEvery:4},e1="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",t1={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},n1="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",i1={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},s1="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",r1={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},a1="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",o1={screenFraction:.8,edge:.1},l1="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",c1={black:.03,gamma:1.35,ambient:.35},h1={on:!0,strength:.7,threshold:.55},u1={on:!0,where:"before",strength:3,band:.4,centre:.55},d1="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",f1=2,p1=20,m1=1.3,g1=.5,x1=.35,M1=.35,v1=.25,_1=!0,b1=.55,y1=600,w1=.6,S1="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement.",E1=.25,A1=1.8,T1=9,R1="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",C1=7,L1=6,P1=3,D1=1.5,I1=.35,O1={_readme:om,_map:lm,mapAreas:cm,areaSize:hm,areaScale:um,areaSizeVariance:dm,borderLayers:fm,_trees:pm,treeDensity:mm,clearingSize:gm,clearingFalloff:xm,gladeAmount:Mm,gladeScale:vm,_areaEdgeBlend:_m,areaEdgeBlend:bm,_density:ym,density:wm,bushDensity:Sm,bushClump:Em,treeHeight:Am,_treeCap:Tm,treeCap:Rm,crownWidth:Cm,treeSpacingX:Lm,treeSpacingZ:Pm,crownHalfWidth:Dm,crownHeight:Im,bushSpacing:Om,_witch:Nm,groundSpeed:Fm,treetopSpeed:Um,acceleration:km,_treetop:Bm,treetop:zm,groundAcceleration:Hm,leanAt:Gm,facing:Wm,riseTime:Vm,descendTime:Ym,groundHeight:Xm,treetopHeight:Km,_camera:qm,camera:$m,_look:Zm,pixelSize:Jm,glowReach:Qm,glowFalloff:jm,glowHeight:eg,spriteTilt:tg,artPixelsPerMetre:ng,viewMargin:ig,lightBudget:sg,_lightSources:rg,_lights:ag,lights:og,glowPower:lg,_beat:cg,beat:hg,_occlusion:ug,_sigilProjection:dg,sigilProjection:fg,occlusion:pg,_stack:mg,stack:gg,_lasers:xg,lasers:Mg,_borders:vg,borders:_g,lightSources:bg,haze:yg,_scenery:wg,scenery:Sg,_post:Eg,_shadows:Ag,shadows:Tg,canopyShadow:Rg,mist:Cg,_fx:Lg,fx:Pg,_moonbeams:Dg,moonbeams:Ig,_treehouse:Og,treehouse:Ng,_bubbles:Fg,bubbles:Ug,_grounds:kg,grounds:Bg,_relics:zg,relics:Hg,_walls:Gg,walls:Wg,_runeMarkers:Vg,runeMarkers:Yg,_decor:Xg,decor:Kg,_paths:qg,paths:$g,_invite:Zg,invite:Jg,leash:Qg,bond:jg,_party:e1,party:t1,_stringLights:n1,stringLights:i1,_dancefloor:s1,dancefloor:r1,_canopyCutout:a1,canopyCutout:o1,_tone:l1,tone:c1,bloom:h1,tiltShift:u1,_creatures:d1,creaturesNear:f1,creaturesFar:p1,creatureCurve:m1,youngShareFar:g1,adultsFrom:x1,adultShareFar:M1,legendChanceFar:v1,legendNextToHome:_1,legendsFrom:b1,creatureSimRadius:y1,creatureSpeed:w1,_setPieces:S1,setPieceChance:E1,setPieceScale:A1,setPieceClear:T1,_placement:R1,setPieceFootprint:C1,soundsystemFootprint:L1,reserveMargin:P1,treeMarginFromSoundsystem:D1,legendSpeed:I1},os=O1;class N1{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=g=>this.keys.has(g)?1:0,s=g=>this.pressed.has(g);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),c=s("Backquote"),d=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=s("KeyE")||s("KeyR");const u=s("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const g of p){if(!g)continue;const x=S=>!!g.buttons[S]?.pressed,y=g.buttons.some((S,C)=>S.pressed&&!this.padPrev[C])&&!!this.onAny?.(),w=S=>!y&&x(S)&&!this.padPrev[S];let E=g.axes[0]??0,b=g.axes[1]??0;const A=Math.hypot(E,b),_=.18;if(A<_)E=0,b=0;else{const S=(Math.min(1,A)-_)/(1-_)/A;E*=S,b*=S}E+=(x(15)?1:0)-(x(14)?1:0),b+=(x(13)?1:0)-(x(12)?1:0),r+=E,a+=b,w(3)&&(o=!0),(w(4)||w(6))&&(h+=1),(w(5)||w(7))&&(h-=1),w(8)&&(c=!0),x(0)&&(d=!0),w(2)&&(f=!0),this.padPrev=g.buttons.map(S=>S.pressed);break}const m=this.touch;r+=m.x,a+=m.y,m.toggle&&(o=!0),h+=m.zoom,m.debug&&(c=!0),m.talk&&(d=!0),m.sigil&&(f=!0),m.toggle=!1,m.zoom=0,m.debug=!1,m.sigil=!1;const M=Math.hypot(r,a);return M>1&&(r/=M,a/=M),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:c,nextWave:e,pauseWaves:t,talk:d,sigil:f,inviteNearest:u}}}const Ac="186",F1=0,Sh=1,U1=2,Ba=1,k1=2,Ur=3,Es=0,On=1,ri=2,Si=0,er=1,Hi=2,Eh=3,Ah=4,po=5,$s=100,B1=101,z1=102,H1=103,G1=104,Tc=200,W1=201,Rc=202,V1=203,Cc=204,Lc=205,Y1=206,X1=207,K1=208,q1=209,$1=210,Z1=211,J1=212,Q1=213,j1=214,Sl=0,El=1,Al=2,Hr=3,Tl=4,Rl=5,$a=6,Cl=7,Md=0,e2=1,t2=2,Ei=0,vd=1,_d=2,bd=3,yd=4,wd=5,Sd=6,Ed=7,Ad=300,As=301,lr=302,Ro=303,Co=304,mo=306,Za=1e3,Ui=1001,Ll=1002,Wt=1003,n2=1004,ia=1005,Kt=1006,Lo=1007,vs=1008,Bn=1009,Td=1010,Rd=1011,Gr=1012,Pc=1013,Ti=1014,li=1015,Ri=1016,Dc=1017,Ic=1018,Wr=1020,Cd=35902,Ld=35899,Pd=1021,Dd=1022,Hn=1023,Gi=1026,_s=1027,Oc=1028,Nc=1029,Ts=1030,Fc=1031,Uc=1033,za=33776,Ha=33777,Ga=33778,Wa=33779,Pl=35840,Dl=35841,Il=35842,Ol=35843,Nl=36196,Fl=37492,Ul=37496,kl=37488,Bl=37489,Ja=37490,zl=37491,Hl=37808,Gl=37809,Wl=37810,Vl=37811,Yl=37812,Xl=37813,Kl=37814,ql=37815,$l=37816,Zl=37817,Jl=37818,Ql=37819,jl=37820,ec=37821,tc=36492,nc=36494,ic=36495,sc=36283,rc=36284,Qa=36285,ac=36286,i2=3200,Th=0,s2=1,zn="",$n="srgb",Vr="srgb-linear",ja="linear",Rt="srgb",Po=7680,r2=519,a2=512,o2=513,l2=514,kc=515,c2=516,h2=517,Bc=518,u2=519,d2=35044,tr=35048,Rh="300 es",wi=2e3,eo=2001;function f2(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function to(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function p2(){const n=to("canvas");return n.style.display="block",n}const Ch={};function Lh(...n){const e="THREE."+n.shift();console.log(e,...n)}function Id(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=Id(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function xt(...n){n=Id(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function nr(...n){const e=n.join(" ");e in Ch||(Ch[e]=!0,Ke(...n))}function m2(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const g2={[Sl]:El,[Al]:$a,[Tl]:Cl,[Hr]:Rl,[El]:Sl,[$a]:Al,[Cl]:Tl,[Rl]:Hr};class Cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const _n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Do=Math.PI/180,oc=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]).toLowerCase()}function ht(n,e,t){return Math.max(e,Math.min(t,n))}function x2(n,e){return(n%e+e)%e}function Io(n,e,t){return(1-t)*n+t*e}function Sr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class $e{static{$e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class xr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],c=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],p=r[a+1],m=r[a+2],M=r[a+3];if(f!==M||h!==u||c!==p||d!==m){let g=h*u+c*p+d*m+f*M;g<0&&(u=-u,p=-p,m=-m,M=-M,g=-g);let x=1-o;if(g<.9995){const v=Math.acos(g),y=Math.sin(v);x=Math.sin(x*v)/y,o=Math.sin(o*v)/y,h=h*x+u*o,c=c*x+p*o,d=d*x+m*o,f=f*x+M*o}else{h=h*x+u*o,c=c*x+p*o,d=d*x+m*o,f=f*x+M*o;const v=1/Math.sqrt(h*h+c*c+d*d+f*f);h*=v,c*=v,d*=v,f*=v}}e[t]=h,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],c=i[s+2],d=i[s+3],f=r[a],u=r[a+1],p=r[a+2],m=r[a+3];return e[t]=o*m+d*f+h*p-c*u,e[t+1]=h*m+d*u+c*f-o*p,e[t+2]=c*m+d*p+o*u-h*f,e[t+3]=d*m-o*f-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),d=o(s/2),f=o(r/2),u=h(i/2),p=h(s/2),m=h(r/2);switch(a){case"XYZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"YXZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"ZXY":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"ZYX":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"YZX":this._x=u*d*f+c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f-u*p*m;break;case"XZY":this._x=u*d*f-c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f+u*p*m;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-h)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(d-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+d)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(h+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*h,this._y=s*d+a*h+r*o-i*c,this._z=r*d+a*c+i*h-s*o,this._w=a*d-i*o-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);h=Math.sin(h*c)/d,t=Math.sin(t*c)/d,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ph.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ph.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+h*c+a*f-o*d,this.y=i+h*d+o*c-r*f,this.z=s+h*f+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oo.copy(this).projectOnVector(e),this.sub(Oo)}reflect(e){return this.sub(Oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oo=new W,Ph=new xr;class Je{static{Je.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c)}set(e,t,i,s,r,a,o,h,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=h,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],m=i[8],M=s[0],g=s[3],x=s[6],v=s[1],y=s[4],w=s[7],E=s[2],b=s[5],A=s[8];return r[0]=a*M+o*v+h*E,r[3]=a*g+o*y+h*b,r[6]=a*x+o*w+h*A,r[1]=c*M+d*v+f*E,r[4]=c*g+d*y+f*b,r[7]=c*x+d*w+f*A,r[2]=u*M+p*v+m*E,r[5]=u*g+p*y+m*b,r[8]=u*x+p*w+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*h+s*r*c-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*h-d*r,p=c*r-a*h,m=t*f+i*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(s*c-d*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(d*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-s*c,s*h,-s*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return nr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(No.makeScale(e,t)),this}rotate(e){return nr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(No.makeRotation(-e)),this}translate(e,t){return nr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(No.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const No=new Je,Dh=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ih=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function M2(){const n={enabled:!0,workingColorSpace:Vr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Rt&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(s.r=ir(s.r),s.g=ir(s.g),s.b=ir(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?ja:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return nr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return nr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vr]:{primaries:e,whitePoint:i,transfer:ja,toXYZ:Dh,fromXYZ:Ih,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:e,whitePoint:i,transfer:Rt,toXYZ:Dh,fromXYZ:Ih,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}}),n}const ct=M2();function Bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Is;class v2{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Is===void 0&&(Is=to("canvas")),Is.width=e.width,Is.height=e.height;const s=Is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Is}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=to("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Bi(t[i]/255)*255):t[i]=Bi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _2=0;class zc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_2++}),this.uuid=$r(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Fo(s[a].image)):r.push(Fo(s[a]))}else r=Fo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Fo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?v2.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let b2=0;const Uo=new W;class Sn extends Cs{constructor(e=Sn.DEFAULT_IMAGE,t=Sn.DEFAULT_MAPPING,i=Ui,s=Ui,r=Kt,a=vs,o=Hn,h=Bn,c=Sn.DEFAULT_ANISOTROPY,d=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:b2++}),this.uuid=$r(),this.name="",this.source=new zc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uo).x}get height(){return this.source.getSize(Uo).y}get depth(){return this.source.getSize(Uo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ad)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Za:e.x=e.x-Math.floor(e.x);break;case Ui:e.x=e.x<0?0:1;break;case Ll:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Za:e.y=e.y-Math.floor(e.y);break;case Ui:e.y=e.y<0?0:1;break;case Ll:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Ad;Sn.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,c=h[0],d=h[4],f=h[8],u=h[1],p=h[5],m=h[9],M=h[2],g=h[6],x=h[10];if(Math.abs(d-u)<.01&&Math.abs(f-M)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+M)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,w=(p+1)/2,E=(x+1)/2,b=(d+u)/4,A=(f+M)/4,_=(m+g)/4;return y>w&&y>E?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=b/i,r=A/i):w>E?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=b/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=_/r),this.set(i,s,r,t),this}let v=Math.sqrt((g-m)*(g-m)+(f-M)*(f-M)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(f-M)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class y2 extends Cs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Sn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new zc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends y2{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Od extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class w2 extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class It{static{It.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,g)}set(e,t,i,s,r,a,o,h,c,d,f,u,p,m,M,g){const x=this.elements;return x[0]=e,x[4]=t,x[8]=i,x[12]=s,x[1]=r,x[5]=a,x[9]=o,x[13]=h,x[2]=c,x[6]=d,x[10]=f,x[14]=u,x[3]=p,x[7]=m,x[11]=M,x[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),a=1/Os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),c=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=-h*f,t[8]=c,t[1]=p+m*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=m+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u+M*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=p*o-m,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*d,p=h*f,m=c*d,M=c*f;t[0]=u-M*o,t[4]=-a*f,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*d,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*d,p=a*f,m=o*d,M=o*f;t[0]=h*d,t[4]=m*c-p,t[8]=u*c+M,t[1]=h*f,t[5]=M*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=M-u*f,t[8]=m*f+p,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*f+m,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*h,p=a*c,m=o*h,M=o*c;t[0]=h*d,t[4]=-f,t[8]=c*d,t[1]=u*f+M,t[5]=a*d,t[9]=p*f-m,t[2]=m*f-p,t[6]=o*d,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(S2,e,E2)}lookAt(e,t,i){const s=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),qi.crossVectors(i,Nn),qi.lengthSq()===0&&(Math.abs(i.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),qi.crossVectors(i,Nn)),qi.normalize(),sa.crossVectors(Nn,qi),s[0]=qi.x,s[4]=sa.x,s[8]=Nn.x,s[1]=qi.y,s[5]=sa.y,s[9]=Nn.y,s[2]=qi.z,s[6]=sa.z,s[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],m=i[2],M=i[6],g=i[10],x=i[14],v=i[3],y=i[7],w=i[11],E=i[15],b=s[0],A=s[4],_=s[8],S=s[12],C=s[1],T=s[5],L=s[9],O=s[13],I=s[2],k=s[6],H=s[10],K=s[14],ae=s[3],q=s[7],ie=s[11],F=s[15];return r[0]=a*b+o*C+h*I+c*ae,r[4]=a*A+o*T+h*k+c*q,r[8]=a*_+o*L+h*H+c*ie,r[12]=a*S+o*O+h*K+c*F,r[1]=d*b+f*C+u*I+p*ae,r[5]=d*A+f*T+u*k+p*q,r[9]=d*_+f*L+u*H+p*ie,r[13]=d*S+f*O+u*K+p*F,r[2]=m*b+M*C+g*I+x*ae,r[6]=m*A+M*T+g*k+x*q,r[10]=m*_+M*L+g*H+x*ie,r[14]=m*S+M*O+g*K+x*F,r[3]=v*b+y*C+w*I+E*ae,r[7]=v*A+y*T+w*k+E*q,r[11]=v*_+y*L+w*H+E*ie,r[15]=v*S+y*O+w*K+E*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],c=e[13],d=e[2],f=e[6],u=e[10],p=e[14],m=e[3],M=e[7],g=e[11],x=e[15],v=h*p-c*u,y=o*p-c*f,w=o*u-h*f,E=a*p-c*d,b=a*u-h*d,A=a*f-o*d;return t*(M*v-g*y+x*w)-i*(m*v-g*E+x*b)+s*(m*y-M*E+x*A)-r*(m*w-M*b+g*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*h)+s*(r*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=e[9],u=e[10],p=e[11],m=e[12],M=e[13],g=e[14],x=e[15],v=t*o-i*a,y=t*h-s*a,w=t*c-r*a,E=i*h-s*o,b=i*c-r*o,A=s*c-r*h,_=d*M-f*m,S=d*g-u*m,C=d*x-p*m,T=f*g-u*M,L=f*x-p*M,O=u*x-p*g,I=v*O-y*L+w*T+E*C-b*S+A*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return e[0]=(o*O-h*L+c*T)*k,e[1]=(s*L-i*O-r*T)*k,e[2]=(M*A-g*b+x*E)*k,e[3]=(u*b-f*A-p*E)*k,e[4]=(h*C-a*O-c*S)*k,e[5]=(t*O-s*C+r*S)*k,e[6]=(g*w-m*A-x*y)*k,e[7]=(d*A-u*w+p*y)*k,e[8]=(a*L-o*C+c*_)*k,e[9]=(i*C-t*L-r*_)*k,e[10]=(m*b-M*w+x*v)*k,e[11]=(f*w-d*b-p*v)*k,e[12]=(o*S-a*T-h*_)*k,e[13]=(t*T-i*S+s*_)*k,e[14]=(M*y-m*E-g*v)*k,e[15]=(d*E-f*y+u*v)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*h,c*h+s*o,0,c*o+s*h,d*o+i,d*h-s*a,0,c*h-s*o,d*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,c=r+r,d=a+a,f=o+o,u=r*c,p=r*d,m=r*f,M=a*d,g=a*f,x=o*f,v=h*c,y=h*d,w=h*f,E=i.x,b=i.y,A=i.z;return s[0]=(1-(M+x))*E,s[1]=(p+w)*E,s[2]=(m-y)*E,s[3]=0,s[4]=(p-w)*b,s[5]=(1-(u+x))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(m+y)*A,s[9]=(g-v)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Os.set(s[0],s[1],s[2]).length();const o=Os.set(s[4],s[5],s[6]).length(),h=Os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ti.copy(this);const c=1/a,d=1/o,f=1/h;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=d,ti.elements[5]*=d,ti.elements[6]*=d,ti.elements[8]*=f,ti.elements[9]*=f,ti.elements[10]*=f,t.setFromRotationMatrix(ti),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=wi,h=!1){const c=this.elements,d=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let m,M;if(h)m=r/(a-r),M=a*r/(a-r);else if(o===wi)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===eo)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=wi,h=!1){const c=this.elements,d=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let m,M;if(h)m=1/(a-r),M=a/(a-r);else if(o===wi)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===eo)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Os=new W,ti=new It,S2=new W(0,0,0),E2=new W(1,1,1),qi=new W,sa=new W,Nn=new W,Oh=new It,Nh=new xr;class Rs{constructor(e=0,t=0,i=0,s=Rs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],c=s[5],d=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Oh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nh.setFromEuler(this),this.setFromQuaternion(Nh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rs.DEFAULT_ORDER="XYZ";class Nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let A2=0;const Fh=new W,Ns=new xr,Pi=new It,ra=new W,Er=new W,T2=new W,R2=new xr,Uh=new W(1,0,0),kh=new W(0,1,0),Bh=new W(0,0,1),zh={type:"added"},C2={type:"removed"},Fs={type:"childadded",child:null},ko={type:"childremoved",child:null};class Rn extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A2++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new W,t=new Rs,i=new xr,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new It},normalMatrix:{value:new Je}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.premultiply(Ns),this}rotateX(e){return this.rotateOnAxis(Uh,e)}rotateY(e){return this.rotateOnAxis(kh,e)}rotateZ(e){return this.rotateOnAxis(Bh,e)}translateOnAxis(e,t){return Fh.copy(e).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uh,e)}translateY(e){return this.translateOnAxis(kh,e)}translateZ(e){return this.translateOnAxis(Bh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ra.copy(e):ra.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(Er,ra,this.up):Pi.lookAt(ra,Er,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),Ns.setFromRotationMatrix(Pi),this.quaternion.premultiply(Ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(xt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):xt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C2),ko.child=e,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,e,T2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,R2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,d=h.length;c<d;c++){const f=h[c];r(e.shapes,f)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const h=[];for(const c in o){const d=o[c];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rn.DEFAULT_UP=new W(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class bs extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const L2={type:"move"};class Bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,i),x=this._getHandJoint(c,M);g!==null&&(x.matrix.fromArray(g.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=g.radius),x.visible=g!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(L2)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new bs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},aa={h:0,s:0,l:0};function zo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class st{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ct.workingColorSpace){if(e=x2(e,1),t=ht(t,0,1),i=ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=zo(a,r,e+1/3),this.g=zo(a,r,e),this.b=zo(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=$n){function i(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$n){const i=Fd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$n){return ct.workingToColorSpace(bn.copy(this),e),Math.round(ht(bn.r*255,0,255))*65536+Math.round(ht(bn.g*255,0,255))*256+Math.round(ht(bn.b*255,0,255))}getHexString(e=$n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(bn.copy(this),t);const i=bn.r,s=bn.g,r=bn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,c;const d=(o+a)/2;if(o===a)h=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-i)/f+2;break;case r:h=(i-s)/f+4;break}h/=6}return e.h=h,e.s=c,e.l=d,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=$n){ct.workingToColorSpace(bn.copy(this),e);const t=bn.r,i=bn.g,s=bn.b;return e!==$n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(aa);const i=Io($i.h,aa.h,t),s=Io($i.s,aa.s,t),r=Io($i.l,aa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bn=new st;st.NAMES=Fd;class Hh extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rs,this.environmentIntensity=1,this.environmentRotation=new Rs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ni=new W,Di=new W,Ho=new W,Ii=new W,Us=new W,ks=new W,Gh=new W,Go=new W,Wo=new W,Vo=new W,Yo=new ot,Xo=new ot,Ko=new ot;class ai{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ni.subVectors(e,t),s.cross(ni);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ni.subVectors(s,t),Di.subVectors(i,t),Ho.subVectors(e,t);const a=ni.dot(ni),o=ni.dot(Di),h=ni.dot(Ho),c=Di.dot(Di),d=Di.dot(Ho),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*h-o*d)*u,m=(a*d-o*h)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Ii)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Ii.x),h.addScaledVector(a,Ii.y),h.addScaledVector(o,Ii.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return Yo.setScalar(0),Xo.setScalar(0),Ko.setScalar(0),Yo.fromBufferAttribute(e,t),Xo.fromBufferAttribute(e,i),Ko.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Yo,r.x),a.addScaledVector(Xo,r.y),a.addScaledVector(Ko,r.z),a}static isFrontFacing(e,t,i,s){return ni.subVectors(i,t),Di.subVectors(e,t),ni.cross(Di).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ni.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ai.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return ai.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Us.subVectors(s,i),ks.subVectors(r,i),Go.subVectors(e,i);const h=Us.dot(Go),c=ks.dot(Go);if(h<=0&&c<=0)return t.copy(i);Wo.subVectors(e,s);const d=Us.dot(Wo),f=ks.dot(Wo);if(d>=0&&f<=d)return t.copy(s);const u=h*f-d*c;if(u<=0&&h>=0&&d<=0)return a=h/(h-d),t.copy(i).addScaledVector(Us,a);Vo.subVectors(e,r);const p=Us.dot(Vo),m=ks.dot(Vo);if(m>=0&&p<=m)return t.copy(r);const M=p*c-h*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(ks,o);const g=d*m-p*f;if(g<=0&&f-d>=0&&p-m>=0)return Gh.subVectors(r,s),o=(f-d)/(f-d+(p-m)),t.copy(s).addScaledVector(Gh,o);const x=1/(g+M+u);return a=M*x,o=u*x,t.copy(i).addScaledVector(Us,a).addScaledVector(ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class rs{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ii):ii.fromBufferAttribute(r,a),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),oa.copy(i.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ar),la.subVectors(this.max,Ar),Bs.subVectors(e.a,Ar),zs.subVectors(e.b,Ar),Hs.subVectors(e.c,Ar),Zi.subVectors(zs,Bs),Ji.subVectors(Hs,zs),ls.subVectors(Bs,Hs);let t=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-ls.z,ls.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,ls.z,0,-ls.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-ls.y,ls.x,0];return!qo(t,Bs,zs,Hs,la)||(t=[1,0,0,0,1,0,0,0,1],!qo(t,Bs,zs,Hs,la))?!1:(ca.crossVectors(Zi,Ji),t=[ca.x,ca.y,ca.z],qo(t,Bs,zs,Hs,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Oi=[new W,new W,new W,new W,new W,new W,new W,new W],ii=new W,oa=new rs,Bs=new W,zs=new W,Hs=new W,Zi=new W,Ji=new W,ls=new W,Ar=new W,la=new W,ca=new W,cs=new W;function qo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){cs.fromArray(n,r);const o=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),h=e.dot(cs),c=t.dot(cs),d=i.dot(cs);if(Math.max(-Math.max(h,c,d),Math.min(h,c,d))>o)return!1}return!0}const jt=new W,ha=new $e;let P2=0;class Cn extends Cs{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:P2++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=d2,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Sr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),s=Ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),s=Ln(s,this.array),r=Ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ud extends Cn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class kd extends Cn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bt extends Cn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const D2=new rs,Tr=new W,$o=new W;class Ls{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):D2.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Tr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add($o)),this.expandByPoint(Tr.copy(e.center).sub($o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let I2=0;const Xn=new It,Zo=new Rn,Gs=new W,Fn=new rs,Rr=new rs,on=new W;class qt extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I2++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(f2(e)?kd:Ud)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,i){return Xn.makeTranslation(e,t,i),this.applyMatrix4(Xn),this}scale(e,t,i){return Xn.makeScale(e,t,i),this.applyMatrix4(Xn),this}lookAt(e){return Zo.lookAt(e),Zo.updateMatrix(),this.applyMatrix4(Zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gs).negate(),this.translate(Gs.x,Gs.y,Gs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Fn.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(Fn.min,Rr.min),Fn.expandByPoint(on),on.addVectors(Fn.max,Rr.max),Fn.expandByPoint(on)):(Fn.expandByPoint(Rr.min),Fn.expandByPoint(Rr.max))}Fn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)on.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(on));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)on.fromBufferAttribute(o,c),h&&(Gs.fromBufferAttribute(e,c),on.add(Gs)),s=Math.max(s,i.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Cn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new W,h[_]=new W;const c=new W,d=new W,f=new W,u=new $e,p=new $e,m=new $e,M=new W,g=new W;function x(_,S,C){c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,S),f.fromBufferAttribute(i,C),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,S),m.fromBufferAttribute(r,C),d.sub(c),f.sub(c),p.sub(u),m.sub(u);const T=1/(p.x*m.y-m.x*p.y);isFinite(T)&&(M.copy(d).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(T),g.copy(f).multiplyScalar(p.x).addScaledVector(d,-m.x).multiplyScalar(T),o[_].add(M),o[S].add(M),o[C].add(M),h[_].add(g),h[S].add(g),h[C].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,S=v.length;_<S;++_){const C=v[_],T=C.start,L=C.count;for(let O=T,I=T+L;O<I;O+=3)x(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new W,w=new W,E=new W,b=new W;function A(_){E.fromBufferAttribute(s,_),b.copy(E);const S=o[_];y.copy(S),y.sub(E.multiplyScalar(E.dot(S))).normalize(),w.crossVectors(b,S);const T=w.dot(h[_])<0?-1:1;a.setXYZW(_,y.x,y.y,y.z,T)}for(let _=0,S=v.length;_<S;++_){const C=v[_],T=C.start,L=C.count;for(let O=T,I=T+L;O<I;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Cn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new W,r=new W,a=new W,o=new W,h=new W,c=new W,d=new W,f=new W;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),M=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,g),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,m),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,g),o.add(d),h.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,h){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(h.length*d);let p=0,m=0;for(let M=0,g=h.length;M<g;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*d;for(let x=0;x<d;x++)u[m++]=c[p++]}return new Cn(u,d,f)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],c=e(h,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const h=[],c=r[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],d=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(s[h]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],f=r[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jo=new W,O2=new W,N2=new Je;class es{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Jo.subVectors(i,t).cross(O2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Jo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||N2.getNormalMatrix(e),s=this.coplanarPoint(Jo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let F2=0;class Mr extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F2++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=er,this.side=Es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Lc,this.blendEquation=$s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=r2,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Po,this.stencilZFail=Po,this.stencilZPass=Po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new st().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new es().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ni=new W,Qo=new W,ua=new W,da=new W;class Hc{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Qo.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),da.copy(this.origin).sub(Qo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ua),o=da.dot(this.direction),h=-da.dot(ua),c=da.lengthSq(),d=Math.abs(1-a*a);let f,u,p,m;if(d>0)if(f=a*h-o,u=a*o-h,m=r*d,f>=0)if(u>=-m)if(u<=m){const M=1/d;f*=M,u*=M,p=f*(f+a*u+2*o)+u*(a*f+u+2*h)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c):u<=m?(f=0,u=Math.min(Math.max(-r,-h),r),p=u*(u+2*h)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Qo).addScaledVector(ua,u),p}intersectSphere(e,t){if(e.radius<0)return null;Ni.subVectors(e.center,this.origin);const i=Ni.dot(this.direction),s=Ni.dot(Ni)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,h=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,h=(e.min.z-u.z)*f),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,c=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,m=t.x-a.x,M=t.y-a.y,g=t.z-a.z,x=i.x-a.x,v=i.y-a.y,y=i.z-a.z,w=Math.abs(h),E=Math.abs(c),b=Math.abs(d);let A,_,S,C,T,L,O,I,k,H,K,ae;if(w>=E&&w>=b?(S=h,L=f,k=m,ae=x,h>=0?(A=c,_=d,C=u,T=p,O=M,I=g,H=v,K=y):(A=d,_=c,C=p,T=u,O=g,I=M,H=y,K=v)):E>=b?(S=c,L=u,k=M,ae=v,c>=0?(A=d,_=h,C=p,T=f,O=g,I=m,H=y,K=x):(A=h,_=d,C=f,T=p,O=m,I=g,H=x,K=y)):(S=d,L=p,k=g,ae=y,d>=0?(A=h,_=c,C=f,T=u,O=m,I=M,H=x,K=v):(A=c,_=h,C=u,T=f,O=M,I=m,H=v,K=x)),S===0)return null;const q=A/S,ie=_/S,F=1/S,ee=C-q*L,se=T-ie*L,ue=O-q*k,xe=I-ie*k,Ce=H-q*ae,B=K-ie*ae,z=Ce*xe-B*ue,N=ee*B-se*Ce,Z=ue*se-xe*ee;if(s){if(z<0||N<0||Z<0)return null}else if((z<0||N<0||Z<0)&&(z>0||N>0||Z>0))return null;const j=z+N+Z;if(j===0)return null;const ce=F*(z*L+N*k+Z*ae);return(j>0?ce<0:ce>0)?null:this.at(ce/j,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bd extends Mr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rs,this.combine=Md,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Wh=new It,hs=new Hc,fa=new Ls,Vh=new W,pa=new W,ma=new W,ga=new W,jo=new W,xa=new W,Yh=new W,Ma=new W;class zt extends Rn{constructor(e=new qt,t=new Bd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){xa.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const d=o[h],f=r[h];d!==0&&(jo.fromBufferAttribute(f,e),a?xa.addScaledVector(jo,d):xa.addScaledVector(jo.sub(t),d))}t.add(xa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(r),hs.copy(e.ray).recast(e.near),!(fa.containsPoint(hs.origin)===!1&&(hs.intersectSphere(fa,Vh)===null||hs.origin.distanceToSquared(Vh)>(e.far-e.near)**2))&&(Wh.copy(r).invert(),hs.copy(e.ray).applyMatrix4(Wh),!(i.boundingBox!==null&&hs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const g=u[m],x=a[g.materialIndex],v=Math.max(g.start,p.start),y=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let w=v,E=y;w<E;w+=3){const b=o.getX(w),A=o.getX(w+1),_=o.getX(w+2);s=va(this,x,e,i,c,d,f,b,A,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let g=m,x=M;g<x;g+=3){const v=o.getX(g),y=o.getX(g+1),w=o.getX(g+2);s=va(this,a,e,i,c,d,f,v,y,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){const g=u[m],x=a[g.materialIndex],v=Math.max(g.start,p.start),y=Math.min(h.count,Math.min(g.start+g.count,p.start+p.count));for(let w=v,E=y;w<E;w+=3){const b=w,A=w+1,_=w+2;s=va(this,x,e,i,c,d,f,b,A,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let g=m,x=M;g<x;g+=3){const v=g,y=g+1,w=g+2;s=va(this,a,e,i,c,d,f,v,y,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function U2(n,e,t,i,s,r,a,o){let h;if(e.side===On?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===Es,o),h===null)return null;Ma.copy(o),Ma.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ma);return c<t.near||c>t.far?null:{distance:c,point:Ma.clone(),object:n}}function va(n,e,t,i,s,r,a,o,h,c){n.getVertexPosition(o,pa),n.getVertexPosition(h,ma),n.getVertexPosition(c,ga);const d=U2(n,e,t,i,pa,ma,ga,Yh);if(d){const f=new W;ai.getBarycoord(Yh,pa,ma,ga,f),s&&(d.uv=ai.getInterpolatedAttribute(s,o,h,c,f,new $e)),r&&(d.uv1=ai.getInterpolatedAttribute(r,o,h,c,f,new $e)),a&&(d.normal=ai.getInterpolatedAttribute(a,o,h,c,f,new W),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new W,materialIndex:0};ai.getNormal(pa,ma,ga,u.normal),d.face=u,d.barycoord=f}return d}class ys extends Sn{constructor(e=null,t=1,i=1,s,r,a,o,h,c=Wt,d=Wt,f,u){super(null,a,o,h,c,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cr extends Cn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ws=new It,Xh=new It,_a=[],Kh=new rs,k2=new It,Cr=new zt,Lr=new Ls;class B2 extends zt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,k2)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ws),Kh.copy(e.boundingBox).applyMatrix4(Ws),this.boundingBox.union(Kh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ls),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ws),Lr.copy(e.boundingSphere).applyMatrix4(Ws),this.boundingSphere.union(Lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Lr.copy(this.boundingSphere),Lr.applyMatrix4(i),e.ray.intersectsSphere(Lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ws),Xh.multiplyMatrices(i,Ws),Cr.matrixWorld=Xh,Cr.raycast(e,_a);for(let a=0,o=_a.length;a<o;a++){const h=_a[a];h.instanceId=r,h.object=this,t.push(h)}_a.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new cr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ys(new Float32Array(s*this.count),s,this.count,Oc,li));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;return r[h]=o,r.set(i,h+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const us=new Ls,z2=new $e(.5,.5),ba=new W;class no{constructor(e=new es,t=new es,i=new es,s=new es,r=new es,a=new es){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],c=r[3],d=r[4],f=r[5],u=r[6],p=r[7],m=r[8],M=r[9],g=r[10],x=r[11],v=r[12],y=r[13],w=r[14],E=r[15];if(s[0].setComponents(c-a,p-d,x-m,E-v).normalize(),s[1].setComponents(c+a,p+d,x+m,E+v).normalize(),s[2].setComponents(c+o,p+f,x+M,E+y).normalize(),s[3].setComponents(c-o,p-f,x-M,E-y).normalize(),i)s[4].setComponents(h,u,g,w).normalize(),s[5].setComponents(c-h,p-u,x-g,E-w).normalize();else if(s[4].setComponents(c-h,p-u,x-g,E-w).normalize(),t===wi)s[5].setComponents(c+h,p+u,x+g,E+w).normalize();else if(t===eo)s[5].setComponents(h,u,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){us.center.set(0,0,0);const t=z2.distanceTo(e.center);return us.radius=.7071067811865476+t,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ba.x=s.normal.x>0?e.max.x:e.min.x,ba.y=s.normal.y>0?e.max.y:e.min.y,ba.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zd extends Mr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const io=new W,so=new W,qh=new It,Pr=new Hc,ya=new Ls,el=new W,$h=new W;class H2 extends Rn{constructor(e=new qt,t=new zd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)io.fromBufferAttribute(t,s-1),so.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=io.distanceTo(so);e.setAttribute("lineDistance",new bt(i,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ya.copy(i.boundingSphere),ya.applyMatrix4(s),ya.radius+=r,e.ray.intersectsSphere(ya)===!1)return;qh.copy(s).invert(),Pr.copy(e.ray).applyMatrix4(qh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){const x=d.getX(M),v=d.getX(M+1),y=wa(this,e,Pr,h,x,v,M);y&&t.push(y)}if(this.isLineLoop){const M=d.getX(m-1),g=d.getX(p),x=wa(this,e,Pr,h,M,g,m-1);x&&t.push(x)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){const x=wa(this,e,Pr,h,M,M+1,M);x&&t.push(x)}if(this.isLineLoop){const M=wa(this,e,Pr,h,m-1,p,m-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function wa(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(io.fromBufferAttribute(o,s),so.fromBufferAttribute(o,r),t.distanceSqToSegment(io,so,el,$h)>i)return;el.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(el);if(!(c<e.near||c>e.far))return{distance:c,point:$h.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Zh=new W,Jh=new W;class Gc extends H2{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Zh.fromBufferAttribute(t,s),Jh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Zh.distanceTo(Jh);e.setAttribute("lineDistance",new bt(i,1))}else Ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hd extends Mr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qh=new It,lc=new Hc,Sa=new Ls,Ea=new W;class Yr extends Rn{constructor(e=new qt,t=new Hd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sa.copy(i.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,e.ray.intersectsSphere(Sa)===!1)return;Qh.copy(s).invert(),lc.copy(e.ray).applyMatrix4(Qh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){const g=c.getX(m);Ea.fromBufferAttribute(f,g),jh(Ea,g,h,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let m=u,M=p;m<M;m++)Ea.fromBufferAttribute(f,m),jh(Ea,m,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jh(n,e,t,i,s,r,a){const o=lc.distanceSqToPoint(n);if(o<t){const h=new W;lc.closestPointToPoint(n,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Gd extends Sn{constructor(e=[],t=As,i,s,r,a,o,h,c,d){super(e,t,i,s,r,a,o,h,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cc extends Sn{constructor(e,t,i,s,r,a,o,h,c){super(e,t,i,s,r,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hr extends Sn{constructor(e,t,i=Ti,s,r,a,o=Wt,h=Wt,c,d=Gi,f=1){if(d!==Gi&&d!==_s)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,h,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class G2 extends hr{constructor(e,t=Ti,i=As,s,r,a=Wt,o=Wt,h,c=Gi){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,h,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wd extends Sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zr extends qt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],d=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(d,3)),this.setAttribute("uv",new bt(f,2));function m(M,g,x,v,y,w,E,b,A,_,S){const C=w/A,T=E/_,L=w/2,O=E/2,I=b/2,k=A+1,H=_+1;let K=0,ae=0;const q=new W;for(let ie=0;ie<H;ie++){const F=ie*T-O;for(let ee=0;ee<k;ee++){const se=ee*C-L;q[M]=se*v,q[g]=F*y,q[x]=I,c.push(q.x,q.y,q.z),q[M]=0,q[g]=0,q[x]=b>0?1:-1,d.push(q.x,q.y,q.z),f.push(ee/A),f.push(1-ie/_),K+=1}}for(let ie=0;ie<_;ie++)for(let F=0;F<A;F++){const ee=u+F+k*ie,se=u+F+k*(ie+1),ue=u+(F+1)+k*(ie+1),xe=u+(F+1)+k*ie;h.push(ee,se,xe),h.push(se,ue,xe),ae+=6}o.addGroup(p,ae,S),p+=ae,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wc extends qt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],u=[],p=[];let m=0;const M=[],g=i/2;let x=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(d),this.setAttribute("position",new bt(f,3)),this.setAttribute("normal",new bt(u,3)),this.setAttribute("uv",new bt(p,2));function v(){const w=new W,E=new W;let b=0;const A=(t-e)/i;for(let _=0;_<=r;_++){const S=[],C=_/r,T=C*(t-e)+e;for(let L=0;L<=s;L++){const O=L/s,I=O*h+o,k=Math.sin(I),H=Math.cos(I);E.x=T*k,E.y=-C*i+g,E.z=T*H,f.push(E.x,E.y,E.z),w.set(k,A,H).normalize(),u.push(w.x,w.y,w.z),p.push(O,1-C),S.push(m++)}M.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const C=M[S][_],T=M[S+1][_],L=M[S+1][_+1],O=M[S][_+1];(e>0||S!==0)&&(d.push(C,T,O),b+=3),(t>0||S!==r-1)&&(d.push(T,L,O),b+=3)}c.addGroup(x,b,0),x+=b}function y(w){const E=m,b=new $e,A=new W;let _=0;const S=w===!0?e:t,C=w===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,g*C,0),u.push(0,C,0),p.push(.5,.5),m++;const T=m;for(let L=0;L<=s;L++){const I=L/s*h+o,k=Math.cos(I),H=Math.sin(I);A.x=S*H,A.y=g*C,A.z=S*k,f.push(A.x,A.y,A.z),u.push(0,C,0),b.x=k*.5+.5,b.y=H*.5*C+.5,p.push(b.x,b.y),m++}for(let L=0;L<s;L++){const O=E+L,I=T+L;w===!0?d.push(I,I+1,O):d.push(I+1,I,O),_+=3}c.addGroup(x,_,w===!0?1:2),x+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vn extends qt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),c=o+1,d=h+1,f=e/o,u=t/h,p=[],m=[],M=[],g=[];for(let x=0;x<d;x++){const v=x*u-a;for(let y=0;y<c;y++){const w=y*f-r;m.push(w,-v,0),M.push(0,0,1),g.push(y/o),g.push(1-x/h)}}for(let x=0;x<h;x++)for(let v=0;v<o;v++){const y=v+c*x,w=v+c*(x+1),E=v+1+c*(x+1),b=v+1+c*x;p.push(y,w,b),p.push(w,E,b)}this.setIndex(p),this.setAttribute("position",new bt(m,3)),this.setAttribute("normal",new bt(M,3)),this.setAttribute("uv",new bt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.width,e.height,e.widthSegments,e.heightSegments)}}function ur(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(eu(s))s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(eu(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function An(n){const e={};for(let t=0;t<n.length;t++){const i=ur(n[t]);for(const s in i)e[s]=i[s]}return e}function eu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function W2(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Vd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const V2={clone:ur,merge:An};var Y2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,X2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends Mr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y2,this.fragmentShader=X2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ur(e.uniforms),this.uniformsGroups=W2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new st().setHex(s.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ot().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Je().fromArray(s.value);break;case"m4":this.uniforms[i].value=new It().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class K2 extends Mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class q2 extends Mr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=i2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $2 extends Mr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Aa=new W,Ta=new xr,mi=new W;class Yd extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Aa,Ta,mi),mi.x===1&&mi.y===1&&mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Aa,Ta,mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Aa,Ta,mi),mi.x===1&&mi.y===1&&mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Aa,Ta,mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new W,tu=new $e,nu=new $e;class kn extends Yd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=oc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Do*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return oc*2*Math.atan(Math.tan(Do*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,tu,nu),t.subVectors(nu,tu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Do*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Vc extends Yd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,h=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yc extends qt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Vs=-90,Ys=1;class Z2 extends Rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kn(Vs,Ys,e,t);s.layers=this.layers,this.add(s);const r=new kn(Vs,Ys,e,t);r.layers=this.layers,this.add(r);const a=new kn(Vs,Ys,e,t);a.layers=this.layers,this.add(a);const o=new kn(Vs,Ys,e,t);o.layers=this.layers,this.add(o);const h=new kn(Vs,Ys,e,t);h.layers=this.layers,this.add(h);const c=new kn(Vs,Ys,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const c of t)this.remove(c);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===eo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class J2 extends kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Xd{static{Xd.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function iu(n,e,t,i){const s=Q2(i);switch(t){case Pd:return n*e;case Oc:return n*e/s.components*s.byteLength;case Nc:return n*e/s.components*s.byteLength;case Ts:return n*e*2/s.components*s.byteLength;case Fc:return n*e*2/s.components*s.byteLength;case Dd:return n*e*3/s.components*s.byteLength;case Hn:return n*e*4/s.components*s.byteLength;case Uc:return n*e*4/s.components*s.byteLength;case za:case Ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dl:case Ol:return Math.max(n,16)*Math.max(e,8)/4;case Pl:case Il:return Math.max(n,8)*Math.max(e,8)/2;case Nl:case Fl:case kl:case Bl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ul:case Ja:case zl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Wl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Yl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Kl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ql:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case $l:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ql:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case jl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ec:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case tc:case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*16;case sc:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Qa:case ac:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Q2(n){switch(n){case Bn:case Td:return{byteLength:1,components:1};case Gr:case Rd:case Ri:return{byteLength:2,components:1};case Dc:case Ic:return{byteLength:2,components:4};case Ti:case Pc:case li:return{byteLength:4,components:1};case Cd:case Ld:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ac}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ac);function Kd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function j2(n){const e=new WeakMap;function t(o,h){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,c){const d=h.array,f=h.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],M=f[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,f[u]=M)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const M=f[p];n.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:s,remove:r,update:a}}var ex=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tx=`#ifdef USE_ALPHAHASH
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
#endif`,nx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ix=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ax=`#ifdef USE_AOMAP
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
#endif`,ox=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lx=`#ifdef USE_BATCHING
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
#endif`,cx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ux=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,px=`#ifdef USE_BUMPMAP
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_x=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wx=`#define PI 3.141592653589793
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
} // validated`,Sx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ex=`vec3 transformedNormal = objectNormal;
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
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Ix=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ox=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fx=`#ifdef USE_ENVMAP
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
#endif`,Ux=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hx=`#ifdef USE_GRADIENTMAP
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
}`,Gx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xx=`#ifdef USE_ENVMAP
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
#endif`,Kx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$x=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jx=`PhysicalMaterial material;
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
#endif`,Qx=`uniform sampler2D dfgLUT;
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
}`,jx=`
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
#endif`,eM=`#if defined( RE_IndirectDiffuse )
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
#endif`,tM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,iM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hM=`#if defined( USE_POINTS_UV )
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
#endif`,uM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gM=`#ifdef USE_MORPHTARGETS
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
#endif`,xM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_M=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wM=`#ifdef USE_NORMALMAP
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
#endif`,SM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,TM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,CM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,LM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,PM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,IM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,FM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,UM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,BM=`float getShadowMask() {
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
}`,zM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HM=`#ifdef USE_SKINNING
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
#endif`,GM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WM=`#ifdef USE_SKINNING
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
#endif`,VM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,YM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,XM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,KM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qM=`#ifdef USE_TRANSMISSION
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
#endif`,$M=`#ifdef USE_TRANSMISSION
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
#endif`,ZM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ev=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tv=`uniform sampler2D t2D;
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
}`,nv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`#include <common>
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
}`,ov=`#if DEPTH_PACKING == 3200
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
}`,lv=`#define DISTANCE
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
}`,cv=`#define DISTANCE
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
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dv=`uniform float scale;
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
}`,fv=`uniform vec3 diffuse;
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
}`,pv=`#include <common>
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
}`,mv=`uniform vec3 diffuse;
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
}`,gv=`#define LAMBERT
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
}`,xv=`#define LAMBERT
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
}`,Mv=`#define MATCAP
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
}`,vv=`#define MATCAP
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
}`,_v=`#define NORMAL
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
}`,bv=`#define NORMAL
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
}`,yv=`#define PHONG
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
}`,wv=`#define PHONG
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
}`,Sv=`#define STANDARD
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
}`,Ev=`#define STANDARD
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
}`,Av=`#define TOON
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
}`,Tv=`#define TOON
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
}`,Rv=`uniform float size;
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
}`,Cv=`uniform vec3 diffuse;
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
}`,Lv=`#include <common>
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
}`,Pv=`uniform vec3 color;
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
}`,Dv=`uniform float rotation;
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
}`,Iv=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:ex,alphahash_pars_fragment:tx,alphamap_fragment:nx,alphamap_pars_fragment:ix,alphatest_fragment:sx,alphatest_pars_fragment:rx,aomap_fragment:ax,aomap_pars_fragment:ox,batching_pars_vertex:lx,batching_vertex:cx,begin_vertex:hx,beginnormal_vertex:ux,bsdfs:dx,iridescence_fragment:fx,bumpmap_pars_fragment:px,clipping_planes_fragment:mx,clipping_planes_pars_fragment:gx,clipping_planes_pars_vertex:xx,clipping_planes_vertex:Mx,color_fragment:vx,color_pars_fragment:_x,color_pars_vertex:bx,color_vertex:yx,common:wx,cube_uv_reflection_fragment:Sx,defaultnormal_vertex:Ex,displacementmap_pars_vertex:Ax,displacementmap_vertex:Tx,emissivemap_fragment:Rx,emissivemap_pars_fragment:Cx,colorspace_fragment:Lx,colorspace_pars_fragment:Px,envmap_fragment:Dx,envmap_common_pars_fragment:Ix,envmap_pars_fragment:Ox,envmap_pars_vertex:Nx,envmap_physical_pars_fragment:Xx,envmap_vertex:Fx,fog_vertex:Ux,fog_pars_vertex:kx,fog_fragment:Bx,fog_pars_fragment:zx,gradientmap_pars_fragment:Hx,lightmap_pars_fragment:Gx,lights_lambert_fragment:Wx,lights_lambert_pars_fragment:Vx,lights_pars_begin:Yx,lights_toon_fragment:Kx,lights_toon_pars_fragment:qx,lights_phong_fragment:$x,lights_phong_pars_fragment:Zx,lights_physical_fragment:Jx,lights_physical_pars_fragment:Qx,lights_fragment_begin:jx,lights_fragment_maps:eM,lights_fragment_end:tM,lightprobes_pars_fragment:nM,logdepthbuf_fragment:iM,logdepthbuf_pars_fragment:sM,logdepthbuf_pars_vertex:rM,logdepthbuf_vertex:aM,map_fragment:oM,map_pars_fragment:lM,map_particle_fragment:cM,map_particle_pars_fragment:hM,metalnessmap_fragment:uM,metalnessmap_pars_fragment:dM,morphinstance_vertex:fM,morphcolor_vertex:pM,morphnormal_vertex:mM,morphtarget_pars_vertex:gM,morphtarget_vertex:xM,normal_fragment_begin:MM,normal_fragment_maps:vM,normal_pars_fragment:_M,normal_pars_vertex:bM,normal_vertex:yM,normalmap_pars_fragment:wM,clearcoat_normal_fragment_begin:SM,clearcoat_normal_fragment_maps:EM,clearcoat_pars_fragment:AM,iridescence_pars_fragment:TM,opaque_fragment:RM,packing:CM,premultiplied_alpha_fragment:LM,project_vertex:PM,dithering_fragment:DM,dithering_pars_fragment:IM,roughnessmap_fragment:OM,roughnessmap_pars_fragment:NM,shadowmap_pars_fragment:FM,shadowmap_pars_vertex:UM,shadowmap_vertex:kM,shadowmask_pars_fragment:BM,skinbase_vertex:zM,skinning_pars_vertex:HM,skinning_vertex:GM,skinnormal_vertex:WM,specularmap_fragment:VM,specularmap_pars_fragment:YM,tonemapping_fragment:XM,tonemapping_pars_fragment:KM,transmission_fragment:qM,transmission_pars_fragment:$M,uv_pars_fragment:ZM,uv_pars_vertex:JM,uv_vertex:QM,worldpos_vertex:jM,background_vert:ev,background_frag:tv,backgroundCube_vert:nv,backgroundCube_frag:iv,cube_vert:sv,cube_frag:rv,depth_vert:av,depth_frag:ov,distance_vert:lv,distance_frag:cv,equirect_vert:hv,equirect_frag:uv,linedashed_vert:dv,linedashed_frag:fv,meshbasic_vert:pv,meshbasic_frag:mv,meshlambert_vert:gv,meshlambert_frag:xv,meshmatcap_vert:Mv,meshmatcap_frag:vv,meshnormal_vert:_v,meshnormal_frag:bv,meshphong_vert:yv,meshphong_frag:wv,meshphysical_vert:Sv,meshphysical_frag:Ev,meshtoon_vert:Av,meshtoon_frag:Tv,points_vert:Rv,points_frag:Cv,shadow_vert:Lv,shadow_frag:Pv,sprite_vert:Dv,sprite_frag:Iv},Te={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},_i={basic:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:An([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:An([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new st(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:An([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:An([Te.points,Te.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:An([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:An([Te.common,Te.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:An([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:An([Te.sprite,Te.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:An([Te.common,Te.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:An([Te.lights,Te.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};_i.physical={uniforms:An([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const Ra={r:0,b:0,g:0},Ov=new It,qd=new Je;qd.set(-1,0,0,0,1,0,0,0,1);function Nv(n,e,t,i,s,r){const a=new st(0);let o=s===!0?0:1,h,c,d=null,f=0,u=null;function p(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const w=v.backgroundBlurriness>0;y=e.get(y,w)}return y}function m(v){let y=!1;const w=p(v);w===null?g(a,o):w&&w.isColor&&(g(w,1),y=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,y){const w=p(y);w&&(w.isCubeTexture||w.mapping===mo)?(c===void 0&&(c=new zt(new Zr(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:ur(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ov.makeRotationFromEuler(y.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qd),c.material.toneMapped=ct.getTransfer(w.colorSpace)!==Rt,(d!==w||f!==w.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new zt(new Vn(2,2),new Mt({name:"BackgroundMaterial",uniforms:ur(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=ct.getTransfer(w.colorSpace)!==Rt,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function g(v,y){v.getRGB(Ra,Vd(n)),t.buffers.color.setClear(Ra.r,Ra.g,Ra.b,y,r)}function x(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:M,dispose:x}}function Fv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(T,L,O,I,k){let H=!1;const K=f(T,I,O,L);r!==K&&(r=K,c(r.object)),H=p(T,I,O,k),H&&m(T,I,O,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,w(T,L,O,I),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function h(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function d(T){return n.deleteVertexArray(T)}function f(T,L,O,I){const k=I.wireframe===!0;let H=i[L.id];H===void 0&&(H={},i[L.id]=H);const K=T.isInstancedMesh===!0?T.id:0;let ae=H[K];ae===void 0&&(ae={},H[K]=ae);let q=ae[O.id];q===void 0&&(q={},ae[O.id]=q);let ie=q[k];return ie===void 0&&(ie=u(h()),q[k]=ie),ie}function u(T){const L=[],O=[],I=[];for(let k=0;k<t;k++)L[k]=0,O[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:I,object:T,attributes:{},index:null}}function p(T,L,O,I){const k=r.attributes,H=L.attributes;let K=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){const F=k[q];let ee=H[q];if(ee===void 0&&(q==="instanceMatrix"&&T.instanceMatrix&&(ee=T.instanceMatrix),q==="instanceColor"&&T.instanceColor&&(ee=T.instanceColor)),F===void 0||F.attribute!==ee||ee&&F.data!==ee.data)return!0;K++}return r.attributesNum!==K||r.index!==I}function m(T,L,O,I){const k={},H=L.attributes;let K=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){let F=H[q];F===void 0&&(q==="instanceMatrix"&&T.instanceMatrix&&(F=T.instanceMatrix),q==="instanceColor"&&T.instanceColor&&(F=T.instanceColor));const ee={};ee.attribute=F,F&&F.data&&(ee.data=F.data),k[q]=ee,K++}r.attributes=k,r.attributesNum=K,r.index=I}function M(){const T=r.newAttributes;for(let L=0,O=T.length;L<O;L++)T[L]=0}function g(T){x(T,0)}function x(T,L){const O=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;O[T]=1,I[T]===0&&(n.enableVertexAttribArray(T),I[T]=1),k[T]!==L&&(n.vertexAttribDivisor(T,L),k[T]=L)}function v(){const T=r.newAttributes,L=r.enabledAttributes;for(let O=0,I=L.length;O<I;O++)L[O]!==T[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function y(T,L,O,I,k,H,K){K===!0?n.vertexAttribIPointer(T,L,O,k,H):n.vertexAttribPointer(T,L,O,I,k,H)}function w(T,L,O,I){M();const k=I.attributes,H=O.getAttributes(),K=L.defaultAttributeValues;for(const ae in H){const q=H[ae];if(q.location>=0){let ie=k[ae];if(ie===void 0&&(ae==="instanceMatrix"&&T.instanceMatrix&&(ie=T.instanceMatrix),ae==="instanceColor"&&T.instanceColor&&(ie=T.instanceColor)),ie!==void 0){const F=ie.normalized,ee=ie.itemSize,se=e.get(ie);if(se===void 0)continue;const ue=se.buffer,xe=se.type,Ce=se.bytesPerElement,B=xe===n.INT||xe===n.UNSIGNED_INT||ie.gpuType===Pc;if(ie.isInterleavedBufferAttribute){const z=ie.data,N=z.stride,Z=ie.offset;if(z.isInstancedInterleavedBuffer){for(let j=0;j<q.locationSize;j++)x(q.location+j,z.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let j=0;j<q.locationSize;j++)g(q.location+j);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let j=0;j<q.locationSize;j++)y(q.location+j,ee/q.locationSize,xe,F,N*Ce,(Z+ee/q.locationSize*j)*Ce,B)}else{if(ie.isInstancedBufferAttribute){for(let z=0;z<q.locationSize;z++)x(q.location+z,ie.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let z=0;z<q.locationSize;z++)g(q.location+z);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let z=0;z<q.locationSize;z++)y(q.location+z,ee/q.locationSize,xe,F,ee*Ce,ee/q.locationSize*z*Ce,B)}}else if(K!==void 0){const F=K[ae];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(q.location,F);break;case 3:n.vertexAttrib3fv(q.location,F);break;case 4:n.vertexAttrib4fv(q.location,F);break;default:n.vertexAttrib1fv(q.location,F)}}}}v()}function E(){S();for(const T in i){const L=i[T];for(const O in L){const I=L[O];for(const k in I){const H=I[k];for(const K in H)d(H[K].object),delete H[K];delete I[k]}}delete i[T]}}function b(T){if(i[T.id]===void 0)return;const L=i[T.id];for(const O in L){const I=L[O];for(const k in I){const H=I[k];for(const K in H)d(H[K].object),delete H[K];delete I[k]}}delete i[T.id]}function A(T){for(const L in i){const O=i[L];for(const I in O){const k=O[I];if(k[T.id]===void 0)continue;const H=k[T.id];for(const K in H)d(H[K].object),delete H[K];delete k[T.id]}}}function _(T){for(const L in i){const O=i[L],I=T.isInstancedMesh===!0?T.id:0,k=O[I];if(k!==void 0){for(const H in k){const K=k[H];for(const ae in K)d(K[ae].object),delete K[ae];delete k[H]}delete O[I],Object.keys(O).length===0&&delete i[L]}}}function S(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:g,disableUnusedAttributes:v}}function Uv(n,e,t){let i;function s(h){i=h}function r(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,d){d!==0&&(n.drawArraysInstanced(i,h,c,d),t.update(c,i,d))}function o(h,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function kv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Hn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Bn&&A!==li&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=h(c);d!==c&&(Ke("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:w,maxSamples:E,samples:b}}function Bv(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new es,o=new Je,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,M=f.clipIntersection,g=f.clipShadows,x=n.get(f);if(!s||m===null||m.length===0||r&&!g)r?d(null):c();else{const v=r?0:i,y=v*4;let w=x.clippingState||null;h.value=w,w=d(m,u,y,p);for(let E=0;E!==y;++E)w[E]=t[E];x.clippingState=w,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,m){const M=f!==null?f.length:0;let g=null;if(M!==0){if(g=h.value,m!==!0||g===null){const x=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<x)&&(g=new Float32Array(x));for(let y=0,w=p;y!==M;++y,w+=4)a.copy(f[y]).applyMatrix4(v,o),a.normal.toArray(g,w),g[w+3]=a.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}const Js=4,zv=6,Hv=20,Gv=256,Dr=new Vc,su=new st;let tl=null,nl=0,il=0,sl=!1;const Wv=new W,ds=new W;class ru{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Wv}=r;tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(tl,nl,il),this._renderer.xr.enabled=sl,e.scissorTest=!1,Xs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===As||e.mapping===lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Ri,format:Hn,colorSpace:Vr,depthBuffer:!1},s=au(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=au(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vv(r)),this._blurMaterial=Xv(r,e,t),this._ggxMaterial=Yv(r,e,t)}return s}_compileMaterial(e){const t=new zt(new qt,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,i,s,r){const h=new kn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(su),f.toneMapping=Ei,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new Zr,new Bd({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,g=M.material;let x=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,x=!0):(g.color.copy(su),x=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(h.up.set(0,c[y],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+d[y],r.y,r.z)):w===1?(h.up.set(0,0,c[y]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+d[y],r.z)):(h.up.set(0,c[y],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+d[y]));const E=this._cubeSize;Xs(s,w*E,y>2?E:0,E,E),f.setRenderTarget(s),x&&f.render(M,h),f.render(e,h)}f.toneMapping=p,f.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===As||e.mapping===lr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=lu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ou());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;Xs(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,Dr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=c*1.25,p=f*u,{_lodMax:m}=this,M=this._sizeLods[i],g=3*M*(i>m-Js?i-m+Js:0),x=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=m-t,Xs(r,g,x,3*M,2*M),s.setRenderTarget(r),s.render(o,Dr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=m-i,Xs(e,g,x,3*M,2*M),s.setRenderTarget(e),s.render(o,Dr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[s],f=3*d*(s>this._lodMax-Js?s-this._lodMax+Js:0),u=4*(this._cubeSize-d);Xs(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(h,Dr)}}function Vv(n){const e=[],t=[];let i=n;const s=n-Js+1+zv;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,d=[h,h,c,h,c,c,h,h,c,c,h,c],f=6,u=6,p=3,m=new Float32Array(p*u*f),M=new Float32Array(p*u*f);for(let x=0;x<f;x++){const v=x%3*2/3-1,y=x>2?0:-1,w=[v,y,0,v+2/3,y,0,v+2/3,y+1,0,v,y,0,v+2/3,y+1,0,v,y+1,0];m.set(w,p*u*x);for(let E=0;E<u;E++){const b=d[E*2]*2-1,A=d[E*2+1]*2-1;x===0?ds.set(1,A,b):x===1?ds.set(-b,1,-A):x===2?ds.set(-b,A,1):x===3?ds.set(-1,A,-b):x===4?ds.set(-b,-1,A):ds.set(b,A,-1),ds.toArray(M,(x*u+E)*p)}}const g=new qt;g.setAttribute("position",new Cn(m,p)),g.setAttribute("outputDirection",new Cn(M,p)),t.push(new zt(g,null)),i>Js&&i--}return{lodMeshes:t,sizeLods:e}}function au(n,e,t){const i=new Qn(n,e,t);return i.texture.mapping=mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Xs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Yv(n,e,t){return new Mt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:go(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Xv(n,e,t){return new Mt({name:"SphericalGaussianBlur",defines:{SAMPLES:Hv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:go(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function ou(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:go(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function lu(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function go(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class $d extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Gd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zr(5,5,5),r=new Mt({name:"CubemapFromEquirect",uniforms:ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:On,blending:Si});r.uniforms.tEquirect.value=t;const a=new zt(s,r),o=t.minFilter;return t.minFilter===vs&&(t.minFilter=Kt),new Z2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Kv(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Ro||p===Co)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const M=new $d(m.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===Ro||p===Co,M=p===As||p===lr;if(m||M){let g=t.get(u);const x=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==x)return i===null&&(i=new ru(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const v=u.image;return m&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new ru(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,p){return p===Ro?u.mapping=As:p===Co&&(u.mapping=lr),u}function h(u){let p=0;const m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function qv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&nr("WebGLRenderer: "+i+" extension not supported."),s}}}function $v(n,e,t,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,m=f.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let y=0,w=v.length;y<w;y+=3){const E=v[y+0],b=v[y+1],A=v[y+2];u.push(E,b,b,A,A,E)}}else{const v=m.array;M=m.version;for(let y=0,w=v.length/3-1;y<w;y+=3){const E=y+0,b=y+1,A=y+2;u.push(E,b,b,A,A,E)}}const g=new(m.count>=65535?kd:Ud)(u,1);g.version=M;const x=r.get(f);x&&e.remove(x),r.set(f,g)}function d(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:d}}function Zv(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function h(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function c(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,f*a,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,p);let M=0;for(let g=0;g<p;g++)M+=u[g];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=d}function Jv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:xt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Qv(n,e,t){const i=new WeakMap,s=new ot;function r(a,o,h){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let S=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),m===!0&&(y=2),M===!0&&(y=3);let w=o.attributes.position.count*y,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const b=new Float32Array(w*E*4*f),A=new Od(b,w,E,f);A.type=li,A.needsUpdate=!0;const _=y*4;for(let C=0;C<f;C++){const T=g[C],L=x[C],O=v[C],I=w*E*4*C;for(let k=0;k<T.count;k++){const H=k*_;p===!0&&(s.fromBufferAttribute(T,k),b[I+H+0]=s.x,b[I+H+1]=s.y,b[I+H+2]=s.z,b[I+H+3]=0),m===!0&&(s.fromBufferAttribute(L,k),b[I+H+4]=s.x,b[I+H+5]=s.y,b[I+H+6]=s.z,b[I+H+7]=0),M===!0&&(s.fromBufferAttribute(O,k),b[I+H+8]=s.x,b[I+H+9]=s.y,b[I+H+10]=s.z,b[I+H+11]=O.itemSize===4?s.w:1)}}u={count:f,texture:A,size:new $e(w,E)},i.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function jv(n,e,t,i,s){let r=new WeakMap;function a(c){const d=s.render.frame,f=c.geometry,u=e.get(c,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function o(){r=new WeakMap}function h(c){const d=c.target;d.removeEventListener("dispose",h),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const e_={[vd]:"LINEAR_TONE_MAPPING",[_d]:"REINHARD_TONE_MAPPING",[bd]:"CINEON_TONE_MAPPING",[yd]:"ACES_FILMIC_TONE_MAPPING",[Sd]:"AGX_TONE_MAPPING",[Ed]:"NEUTRAL_TONE_MAPPING",[wd]:"CUSTOM_TONE_MAPPING"};function t_(n,e,t,i,s,r){const a=new Qn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new qt;c.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new bt([0,2,0,0,2,0],2));const d=new K2({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new zt(c,d),u=new Vc(-1,1,1,-1,0,1);let p=null,m=null,M=!1,g,x=null,v=[],y=!1;this.setSize=function(w,E){a.setSize(w,E),o!==null&&o.setSize(w,E),h!==null&&h.setSize(w,E);for(let b=0;b<v.length;b++){const A=v[b];A.setSize&&A.setSize(w,E)}},this.setEffects=function(w){v=w,y=v.length>0&&v[0].isRenderPass===!0;const E=a.width,b=a.height;v.length>0&&o===null&&(o=new Qn(E,b,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),h=new Qn(E,b,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){const _=v[A];_.setSize&&_.setSize(E,b)}},this.begin=function(w,E){if(M||w.toneMapping===Ei&&v.length===0)return!1;if(x=E,E!==null){const b=E.width,A=E.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return y===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=Ei,!0},this.hasRenderPass=function(){return y},this.end=function(w,E){w.toneMapping=g,M=!0;let b=a,A=o;for(let _=0;_<v.length;_++){const S=v[_];S.enabled!==!1&&(S.render(w,A,b,E),S.needsSwap!==!1&&(b=A,A=A===o?h:o))}if(p!==w.outputColorSpace||m!==w.toneMapping){p=w.outputColorSpace,m=w.toneMapping,d.defines={},ct.getTransfer(p)===Rt&&(d.defines.SRGB_TRANSFER="");const _=e_[m];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=b.texture,w.setRenderTarget(x),w.render(f,u),x=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),d.dispose()}}const Zd=new Sn,hc=new hr(1,1),Jd=new Od,Qd=new w2,jd=new Gd,cu=[],hu=[],uu=new Float32Array(16),du=new Float32Array(9),fu=new Float32Array(4);function vr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=cu[s];if(r===void 0&&(r=new Float32Array(s),cu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function xo(n,e){let t=hu[e];t===void 0&&(t=new Int32Array(e),hu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function n_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function a_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;fu.set(i),n.uniformMatrix2fv(this.addr,!1,fu),an(t,i)}}function o_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;du.set(i),n.uniformMatrix3fv(this.addr,!1,du),an(t,i)}}function l_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;uu.set(i),n.uniformMatrix4fv(this.addr,!1,uu),an(t,i)}}function c_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function h_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function d_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function f_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function p_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function g_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function x_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(hc.compareFunction=t.isReversedDepthBuffer()?Bc:kc,r=hc):r=Zd,t.setTexture2D(e||r,s)}function M_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qd,s)}function v_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||jd,s)}function __(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Jd,s)}function b_(n){switch(n){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return M_;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return __}}function y_(n,e){n.uniform1fv(this.addr,e)}function w_(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function S_(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function E_(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function A_(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function T_(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function R_(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function C_(n,e){n.uniform1iv(this.addr,e)}function L_(n,e){n.uniform2iv(this.addr,e)}function P_(n,e){n.uniform3iv(this.addr,e)}function D_(n,e){n.uniform4iv(this.addr,e)}function I_(n,e){n.uniform1uiv(this.addr,e)}function O_(n,e){n.uniform2uiv(this.addr,e)}function N_(n,e){n.uniform3uiv(this.addr,e)}function F_(n,e){n.uniform4uiv(this.addr,e)}function U_(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=hc:a=Zd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function k_(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Qd,r[a])}function B_(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||jd,r[a])}function z_(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Jd,r[a])}function H_(n){switch(n){case 5126:return y_;case 35664:return w_;case 35665:return S_;case 35666:return E_;case 35674:return A_;case 35675:return T_;case 35676:return R_;case 5124:case 35670:return C_;case 35667:case 35671:return L_;case 35668:case 35672:return P_;case 35669:case 35673:return D_;case 5125:return I_;case 36294:return O_;case 36295:return N_;case 36296:return F_;case 35678:case 36198:case 36298:case 36306:case 35682:return U_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return z_}}class G_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class W_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H_(t.type)}}class V_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const rl=/(\w+)(\])?(\[|\.)?/g;function pu(n,e){n.seq.push(e),n.map[e.id]=e}function Y_(n,e,t){const i=n.name,s=i.length;for(rl.lastIndex=0;;){const r=rl.exec(i),a=rl.lastIndex;let o=r[1];const h=r[2]==="]",c=r[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===s){pu(t,c===void 0?new G_(o,n,e):new W_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new V_(o),pu(t,f)),t=f}}}class Va{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);Y_(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function mu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const X_=37297;let K_=0;function q_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const gu=new Je;function $_(n){ct._getMatrix(gu,ct.workingColorSpace,n);const e=`mat3( ${gu.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case ja:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function xu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+q_(n.getShaderSource(e),o)}else return r}function Z_(n,e){const t=$_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const J_={[vd]:"Linear",[_d]:"Reinhard",[bd]:"Cineon",[yd]:"ACESFilmic",[Sd]:"AgX",[Ed]:"Neutral",[wd]:"Custom"};function Q_(n,e){const t=J_[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ca=new W;function j_(){ct.getLuminanceCoefficients(Ca);const n=Ca.x.toFixed(4),e=Ca.y.toFixed(4),t=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function tb(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function nb(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function kr(n){return n!==""}function Mu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ib=/^[ \t]*#include +<([\w\d./]+)>/gm;function uc(n){return n.replace(ib,rb)}const sb=new Map;function rb(n,e){let t=it[e];if(t===void 0){const i=sb.get(e);if(i!==void 0)t=it[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return uc(t)}const ab=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _u(n){return n.replace(ab,ob)}function ob(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const lb={[Ba]:"SHADOWMAP_TYPE_PCF",[Ur]:"SHADOWMAP_TYPE_VSM"};function cb(n){return lb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const hb={[As]:"ENVMAP_TYPE_CUBE",[lr]:"ENVMAP_TYPE_CUBE",[mo]:"ENVMAP_TYPE_CUBE_UV"};function ub(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":hb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const db={[lr]:"ENVMAP_MODE_REFRACTION"};function fb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":db[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const pb={[Md]:"ENVMAP_BLENDING_MULTIPLY",[e2]:"ENVMAP_BLENDING_MIX",[t2]:"ENVMAP_BLENDING_ADD"};function mb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":pb[n.combine]||"ENVMAP_BLENDING_NONE"}function gb(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function xb(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=cb(t),c=ub(t),d=fb(t),f=mb(t),u=gb(t),p=eb(t),m=tb(r),M=s.createProgram();let g,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(kr).join(`
`),g.length>0&&(g+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(kr).join(`
`),x.length>0&&(x+=`
`)):(g=[bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),x=[bu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?it.tonemapping_pars_fragment:"",t.toneMapping!==Ei?Q_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),j_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),a=uc(a),a=Mu(a,t),a=vu(a,t),o=uc(o),o=Mu(o,t),o=vu(o,t),a=_u(a),o=_u(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,x=["#define varying in",t.glslVersion===Rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const y=v+g+a,w=v+x+o,E=mu(s,s.VERTEX_SHADER,y),b=mu(s,s.FRAGMENT_SHADER,w);s.attachShader(M,E),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(T){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(M)||"",O=s.getShaderInfoLog(E)||"",I=s.getShaderInfoLog(b)||"",k=L.trim(),H=O.trim(),K=I.trim();let ae=!0,q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,b);else{const ie=xu(s,E,"vertex"),F=xu(s,b,"fragment");xt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+k+`
`+ie+`
`+F)}else k!==""?Ke("WebGLProgram: Program Info Log:",k):(H===""||K==="")&&(q=!1);q&&(T.diagnostics={runnable:ae,programLog:k,vertexShader:{log:H,prefix:g},fragmentShader:{log:K,prefix:x}})}s.deleteShader(E),s.deleteShader(b),_=new Va(s,M),S=nb(s,M)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,X_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=K_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=b,this}let Mb=0;class vb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new _b(e),t.set(e,i)),i}}class _b{constructor(e){this.id=Mb++,this.code=e,this.usedTimes=0}}function bb(n){return n===Ts||n===Ja||n===Qa}function yb(n,e,t,i,s,r){const a=new Nd,o=new vb,h=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,S,C,T,L,O){const I=T.fog,k=L.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?T.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ae=e.get(_.envMap||H,K),q=ae&&ae.mapping===mo?ae.image.height:null,ie=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ke("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const F=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ee=F!==void 0?F.length:0;let se=0;k.morphAttributes.position!==void 0&&(se=1),k.morphAttributes.normal!==void 0&&(se=2),k.morphAttributes.color!==void 0&&(se=3);let ue,xe,Ce,B;if(ie){const Ut=_i[ie];ue=Ut.vertexShader,xe=Ut.fragmentShader}else{ue=_.vertexShader,xe=_.fragmentShader;const Ut=o.getVertexShaderStage(_),yt=o.getFragmentShaderStage(_);o.update(_,Ut,yt),Ce=Ut.id,B=yt.id}const z=n.getRenderTarget(),N=n.state.buffers.depth.getReversed(),Z=L.isInstancedMesh===!0,j=L.isBatchedMesh===!0,ce=!!_.map,ye=!!_.matcap,_e=!!ae,oe=!!_.aoMap,ge=!!_.lightMap,Me=!!_.bumpMap&&_.wireframe===!1,Ne=!!_.normalMap,Ze=!!_.displacementMap,lt=!!_.emissiveMap,gt=!!_.metalnessMap,ut=!!_.roughnessMap,Y=_.anisotropy>0,tt=_.clearcoat>0,Xe=_.dispersion>0,U=_.retroreflectivity>0,R=_.iridescence>0,G=_.sheen>0,$=_.transmission>0,te=Y&&!!_.anisotropyMap,me=tt&&!!_.clearcoatMap,ve=tt&&!!_.clearcoatNormalMap,re=tt&&!!_.clearcoatRoughnessMap,le=R&&!!_.iridescenceMap,be=R&&!!_.iridescenceThicknessMap,ke=G&&!!_.sheenColorMap,Ae=G&&!!_.sheenRoughnessMap,we=!!_.specularMap,He=!!_.specularColorMap,Ye=!!_.specularIntensityMap,Qe=$&&!!_.transmissionMap,X=$&&!!_.thicknessMap,Se=!!_.gradientMap,he=!!_.alphaMap,Ee=_.alphaTest>0,De=!!_.alphaHash,fe=!!_.extensions;let Ge=Ei;_.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Ge=n.toneMapping);const Be={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:xe,defines:_.defines,customVertexShaderID:Ce,customFragmentShaderID:B,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:j,batchingColor:j&&L._colorsTexture!==null,instancing:Z,instancingColor:Z&&L.instanceColor!==null,instancingMorph:Z&&L.morphTexture!==null,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ce,matcap:ye,envMap:_e,envMapMode:_e&&ae.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:ge,bumpMap:Me,normalMap:Ne,displacementMap:Ze,emissiveMap:lt,normalMapObjectSpace:Ne&&_.normalMapType===s2,normalMapTangentSpace:Ne&&_.normalMapType===Th,packedNormalMap:Ne&&_.normalMapType===Th&&bb(_.normalMap.format),metalnessMap:gt,roughnessMap:ut,anisotropy:Y,anisotropyMap:te,clearcoat:tt,clearcoatMap:me,clearcoatNormalMap:ve,clearcoatRoughnessMap:re,dispersion:Xe,retroreflection:U,iridescence:R,iridescenceMap:le,iridescenceThicknessMap:be,sheen:G,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:we,specularColorMap:He,specularIntensityMap:Ye,transmission:$,transmissionMap:Qe,thicknessMap:X,gradientMap:Se,opaque:_.transparent===!1&&_.blending===er&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:Ee,alphaHash:De,combine:_.combine,mapUv:ce&&m(_.map.channel),aoMapUv:oe&&m(_.aoMap.channel),lightMapUv:ge&&m(_.lightMap.channel),bumpMapUv:Me&&m(_.bumpMap.channel),normalMapUv:Ne&&m(_.normalMap.channel),displacementMapUv:Ze&&m(_.displacementMap.channel),emissiveMapUv:lt&&m(_.emissiveMap.channel),metalnessMapUv:gt&&m(_.metalnessMap.channel),roughnessMapUv:ut&&m(_.roughnessMap.channel),anisotropyMapUv:te&&m(_.anisotropyMap.channel),clearcoatMapUv:me&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(_.sheenRoughnessMap.channel),specularMapUv:we&&m(_.specularMap.channel),specularColorMapUv:He&&m(_.specularColorMap.channel),specularIntensityMapUv:Ye&&m(_.specularIntensityMap.channel),transmissionMapUv:Qe&&m(_.transmissionMap.channel),thicknessMapUv:X&&m(_.thicknessMap.channel),alphaMapUv:he&&m(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ne||Y),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!k.attributes.uv&&(ce||he),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&Ne===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:se,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:ce&&_.map.isVideoTexture===!0&&ct.getTransfer(_.map.colorSpace)===Rt,decodeVideoTextureEmissive:lt&&_.emissiveMap.isVideoTexture===!0&&ct.getTransfer(_.emissiveMap.colorSpace)===Rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ri,flipSided:_.side===On,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:fe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&_.extensions.multiDraw===!0||j)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Be.vertexUv1s=h.has(1),Be.vertexUv2s=h.has(2),Be.vertexUv3s=h.has(3),h.clear(),Be}function g(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)S.push(C),S.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(x(S,_),v(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function x(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function y(_){const S=p[_.type];let C;if(S){const T=_i[S];C=V2.clone(T.uniforms)}else C=_.uniforms;return C}function w(_,S){let C=d.get(S);return C!==void 0?++C.usedTimes:(C=new xb(n,S,_,s),c.push(C),d.set(S,C)),C}function E(_){if(--_.usedTimes===0){const S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:y,acquireProgram:w,releaseProgram:E,releaseShaderCache:b,programs:c,dispose:A}}function wb(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Sb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function yu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function wu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,g,x){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:g,group:x},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=g,v.group=x),e++,v}function h(u,p,m,M,g,x,v){v.reversedDepth===!0&&(g=-g);const y=o(u,p,m,M,g,x);m.transmission>0?i.push(y):m.transparent===!0?s.push(y):t.push(y)}function c(u,p,m,M,g,x){const v=o(u,p,m,M,g,x);m.transmission>0?i.unshift(v):m.transparent===!0?s.unshift(v):t.unshift(v)}function d(u,p){t.length>1&&t.sort(u||Sb),i.length>1&&i.sort(p||yu),s.length>1&&s.sort(p||yu)}function f(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:c,finish:f,sort:d}}function Eb(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new wu,n.set(i,[a])):s>=r.length?(a=new wu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Ab(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new st};break;case"SpotLight":t={position:new W,direction:new W,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function Tb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Rb=0;function Cb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Lb(n){const e=new Ab,t=Tb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new It,a=new It;function o(c){let d=0,f=0,u=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,m=0,M=0,g=0,x=0,v=0,y=0,w=0,E=0,b=0,A=0,_=0,S=0,C=0;c.sort(Cb);for(let L=0,O=c.length;L<O;L++){const I=c[L],k=I.color,H=I.intensity,K=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ts?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*H,f+=k.g*H,u+=k.b*H;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],H);C++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,F=t.get(I);F.shadowIntensity=ie.intensity,F.shadowBias=ie.bias,F.shadowNormalBias=ie.normalBias,F.shadowRadius=ie.radius,F.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),i.sunShadow[m]=F,i.sunShadowMap[m]=ae;const ee=ie.getViewportCount();for(let se=0;se<ee;se++)i.sunShadowMatrix[M+se]=ie.getMatrix(se),i.sunShadowCascade[M+se]=ie._cascadeData[se];M+=ee,m++}i.sun[p]=q,p++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,F=t.get(I);F.shadowIntensity=ie.intensity,F.shadowBias=ie.bias,F.shadowNormalBias=ie.normalBias,F.shadowRadius=ie.radius,F.shadowMapSize=ie.mapSize,i.directionalShadow[g]=F,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=I.shadow.matrix,E++}i.directional[g]=q,g++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(k).multiplyScalar(H),q.distance=K,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[v]=q;const ie=I.shadow;if(I.map&&(i.spotLightMap[_]=I.map,_++,ie.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[v]=ie.matrix,I.castShadow){const F=t.get(I);F.shadowIntensity=ie.intensity,F.shadowBias=ie.bias,F.shadowNormalBias=ie.normalBias,F.shadowRadius=ie.radius,F.shadowMapSize=ie.mapSize,i.spotShadow[v]=F,i.spotShadowMap[v]=ae,A++}v++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(k).multiplyScalar(H),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[y]=q,y++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const ie=I.shadow,F=t.get(I);F.shadowIntensity=ie.intensity,F.shadowBias=ie.bias,F.shadowNormalBias=ie.normalBias,F.shadowRadius=ie.radius,F.shadowMapSize=ie.mapSize,F.shadowCameraNear=ie.camera.near,F.shadowCameraFar=ie.camera.far,i.pointShadow[x]=F,i.pointShadowMap[x]=ae,i.pointShadowMatrix[x]=I.shadow.matrix,b++}i.point[x]=q,x++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(H),q.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[w]=q,w++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const T=i.hash;(T.sunLength!==p||T.directionalLength!==g||T.pointLength!==x||T.spotLength!==v||T.rectAreaLength!==y||T.hemiLength!==w||T.numSunShadows!==m||T.numDirectionalShadows!==E||T.numPointShadows!==b||T.numSpotShadows!==A||T.numSpotMaps!==_||T.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=g,i.spot.length=v,i.rectArea.length=y,i.point.length=x,i.hemi.length=w,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-S,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=C,T.sunLength=p,T.directionalLength=g,T.pointLength=x,T.spotLength=v,T.rectAreaLength=y,T.hemiLength=w,T.numSunShadows=m,T.numDirectionalShadows=E,T.numPointShadows=b,T.numSpotShadows=A,T.numSpotMaps=_,T.numLightProbes=C,i.version=Rb++)}function h(c,d){let f=0,u=0,p=0,m=0,M=0,g=0;const x=d.matrixWorldInverse;for(let v=0,y=c.length;v<y;v++){const w=c[v];if(w.isSunLight){const E=i.sun[f];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(x),f++}else if(w.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),u++}else if(w.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),m++}else if(w.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),a.identity(),r.copy(w.matrixWorld),r.premultiply(x),a.extractRotation(r),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(w.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),p++}else if(w.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(x),g++}}}return{setup:o,setupView:h,state:i}}function Su(n){const e=new Lb(n),t=[],i=[],s=[];function r(u){f.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function Pb(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Su(n),e.set(s,[o])):r>=a.length?(o=new Su(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Db=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ib=`uniform sampler2D shadow_pass;
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
}`,Ob=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Nb=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Eu=new It,Ir=new W,al=new W;function Fb(n,e,t){let i=new no;const s=new $e,r=new $e,a=new ot,o=new q2,h=new $2,c={},d=t.maxTextureSize,f={[Es]:On,[On]:Es,[ri]:ri},u=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Db,fragmentShader:Ib}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new qt;m.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new zt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ba;let x=this.type;this.render=function(b,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===k1&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ba);const S=n.getRenderTarget(),C=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Si),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=x!==this.type;O&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=b.length;I<k;I++){const H=b[I],K=H.shadow;if(K===void 0){Ke("WebGLShadowMap:",H,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ae=K.getFrameExtents();s.multiply(ae),r.copy(K.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ae.x),s.x=r.x*ae.x,K.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ae.y),s.y=r.y*ae.y,K.mapSize.y=r.y));const q=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=q,K.map===null||O===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Ur){if(H.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Qn(s.x,s.y,{format:Ts,type:Ri,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),K.map.texture.name=H.name+".shadowMap",K.map.depthTexture=new hr(s.x,s.y,li),K.map.depthTexture.name=H.name+".shadowMapDepth",K.map.depthTexture.format=Gi,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt}else H.isPointLight?(K.map=new $d(s.x),K.map.depthTexture=new G2(s.x,Ti)):(K.map=new Qn(s.x,s.y),K.map.depthTexture=new hr(s.x,s.y,Ti)),K.map.depthTexture.name=H.name+".shadowMap",K.map.depthTexture.format=Gi,this.type===Ba?(K.map.depthTexture.compareFunction=q?Bc:kc,K.map.depthTexture.minFilter=Kt,K.map.depthTexture.magFilter=Kt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);const ie=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();H.isPointLight!==!0&&K.updateMatrices(H,_);for(let F=0;F<ie;F++){const ee=K.getCamera(F);if(H.isPointLight){const se=K.camera,ue=K.matrix,xe=H.distance||se.far;xe!==se.far&&(se.far=xe,se.updateProjectionMatrix()),Ir.setFromMatrixPosition(H.matrixWorld),se.position.copy(Ir),al.copy(se.position),al.add(Ob[F]),se.up.copy(Nb[F]),se.lookAt(al),se.updateMatrixWorld(),ue.makeTranslation(-Ir.x,-Ir.y,-Ir.z),Eu.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),K._frustum.setFromProjectionMatrix(Eu,se.coordinateSystem,se.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,F),n.clear();else{F===0&&(n.setRenderTarget(K.map),n.clear());const se=K.getViewport(F);a.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),L.viewport(a)}i=K.getFrustum(F),w(A,_,ee,H,this.type)}K.isPointLightShadow!==!0&&this.type===Ur&&v(K,_),K.needsUpdate=!1}x=this.type,g.needsUpdate=!1,n.setRenderTarget(S,C,T)};function v(b,A){const _=e.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new Qn(s.x,s.y,{format:Ts,type:Ri}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,_,p,M,null)}function y(b,A,_,S){let C=null;const T=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(T!==void 0)C=T;else if(C=_.isPointLight===!0?h:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=C.uuid,O=A.uuid;let I=c[L];I===void 0&&(I={},c[L]=I);let k=I[O];k===void 0&&(k=C.clone(),I[O]=k,A.addEventListener("dispose",E)),C=k}if(C.visible=A.visible,C.wireframe=A.wireframe,S===Ur?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:f[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=n.properties.get(C);L.light=_}return C}function w(b,A,_,S,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Ur)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const O=e.update(b),I=b.material;if(Array.isArray(I)){const k=O.groups;for(let H=0,K=k.length;H<K;H++){const ae=k[H],q=I[ae.materialIndex];if(q&&q.visible){const ie=y(b,q,S,C);b.onBeforeShadow(n,b,A,_,O,ie,ae),n.renderBufferDirect(_,null,O,ie,b,ae),b.onAfterShadow(n,b,A,_,O,ie,ae)}}}else if(I.visible){const k=y(b,I,S,C);b.onBeforeShadow(n,b,A,_,O,k,null),n.renderBufferDirect(_,null,O,k,b,null),b.onAfterShadow(n,b,A,_,O,k,null)}}const L=b.children;for(let O=0,I=L.length;O<I;O++)w(L[O],A,_,S,C)}function E(b){b.target.removeEventListener("dispose",E);for(const _ in c){const S=c[_],C=b.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function Ub(n,e){function t(){let X=!1;const Se=new ot;let he=null;const Ee=new ot(0,0,0,0);return{setMask:function(De){he!==De&&!X&&(n.colorMask(De,De,De,De),he=De)},setLocked:function(De){X=De},setClear:function(De,fe,Ge,Be,Ut){Ut===!0&&(De*=Be,fe*=Be,Ge*=Be),Se.set(De,fe,Ge,Be),Ee.equals(Se)===!1&&(n.clearColor(De,fe,Ge,Be),Ee.copy(Se))},reset:function(){X=!1,he=null,Ee.set(-1,0,0,0)}}}function i(){let X=!1,Se=!1,he=null,Ee=null,De=null;return{setReversed:function(fe){if(Se!==fe){const Ge=e.get("EXT_clip_control");fe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Se=fe;const Be=De;De=null,this.setClear(Be)}},getReversed:function(){return Se},setTest:function(fe){fe?z(n.DEPTH_TEST):N(n.DEPTH_TEST)},setMask:function(fe){he!==fe&&!X&&(n.depthMask(fe),he=fe)},setFunc:function(fe){if(Se&&(fe=g2[fe]),Ee!==fe){switch(fe){case Sl:n.depthFunc(n.NEVER);break;case El:n.depthFunc(n.ALWAYS);break;case Al:n.depthFunc(n.LESS);break;case Hr:n.depthFunc(n.LEQUAL);break;case Tl:n.depthFunc(n.EQUAL);break;case Rl:n.depthFunc(n.GEQUAL);break;case $a:n.depthFunc(n.GREATER);break;case Cl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=fe}},setLocked:function(fe){X=fe},setClear:function(fe){De!==fe&&(De=fe,Se&&(fe=1-fe),n.clearDepth(fe))},reset:function(){X=!1,he=null,Ee=null,De=null,Se=!1}}}function s(){let X=!1,Se=null,he=null,Ee=null,De=null,fe=null,Ge=null,Be=null,Ut=null;return{setTest:function(yt){X||(yt?z(n.STENCIL_TEST):N(n.STENCIL_TEST))},setMask:function(yt){Se!==yt&&!X&&(n.stencilMask(yt),Se=yt)},setFunc:function(yt,ei,fi){(he!==yt||Ee!==ei||De!==fi)&&(n.stencilFunc(yt,ei,fi),he=yt,Ee=ei,De=fi)},setOp:function(yt,ei,fi){(fe!==yt||Ge!==ei||Be!==fi)&&(n.stencilOp(yt,ei,fi),fe=yt,Ge=ei,Be=fi)},setLocked:function(yt){X=yt},setClear:function(yt){Ut!==yt&&(n.clearStencil(yt),Ut=yt)},reset:function(){X=!1,Se=null,he=null,Ee=null,De=null,fe=null,Ge=null,Be=null,Ut=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,c=new WeakMap;let d={},f={},u={},p=new WeakMap,m=[],M=null,g=!1,x=null,v=null,y=null,w=null,E=null,b=null,A=null,_=new st(0,0,0),S=0,C=!1,T=null,L=null,O=null,I=null,k=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=ae>=2);let ie=null,F={};const ee=n.getParameter(n.SCISSOR_BOX),se=n.getParameter(n.VIEWPORT),ue=new ot().fromArray(ee),xe=new ot().fromArray(se);function Ce(X,Se,he,Ee){const De=new Uint8Array(4),fe=n.createTexture();n.bindTexture(X,fe),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<he;Ge++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Se+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return fe}const B={};B[n.TEXTURE_2D]=Ce(n.TEXTURE_2D,n.TEXTURE_2D,1),B[n.TEXTURE_CUBE_MAP]=Ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[n.TEXTURE_2D_ARRAY]=Ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),B[n.TEXTURE_3D]=Ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),z(n.DEPTH_TEST),a.setFunc(Hr),Me(!1),Ne(Sh),z(n.CULL_FACE),oe(Si);function z(X){d[X]!==!0&&(n.enable(X),d[X]=!0)}function N(X){d[X]!==!1&&(n.disable(X),d[X]=!1)}function Z(X,Se){return u[X]!==Se?(n.bindFramebuffer(X,Se),u[X]=Se,X===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Se),X===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function j(X,Se){let he=m,Ee=!1;if(X){he=p.get(Se),he===void 0&&(he=[],p.set(Se,he));const De=X.textures;if(he.length!==De.length||he[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Ge=De.length;fe<Ge;fe++)he[fe]=n.COLOR_ATTACHMENT0+fe;he.length=De.length,Ee=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(he)}function ce(X){return M!==X?(n.useProgram(X),M=X,!0):!1}const ye={[$s]:n.FUNC_ADD,[B1]:n.FUNC_SUBTRACT,[z1]:n.FUNC_REVERSE_SUBTRACT};ye[H1]=n.MIN,ye[G1]=n.MAX;const _e={[Tc]:n.ZERO,[W1]:n.ONE,[Rc]:n.SRC_COLOR,[Cc]:n.SRC_ALPHA,[$1]:n.SRC_ALPHA_SATURATE,[K1]:n.DST_COLOR,[Y1]:n.DST_ALPHA,[V1]:n.ONE_MINUS_SRC_COLOR,[Lc]:n.ONE_MINUS_SRC_ALPHA,[q1]:n.ONE_MINUS_DST_COLOR,[X1]:n.ONE_MINUS_DST_ALPHA,[Z1]:n.CONSTANT_COLOR,[J1]:n.ONE_MINUS_CONSTANT_COLOR,[Q1]:n.CONSTANT_ALPHA,[j1]:n.ONE_MINUS_CONSTANT_ALPHA};function oe(X,Se,he,Ee,De,fe,Ge,Be,Ut,yt){if(X===Si){g===!0&&(N(n.BLEND),g=!1);return}if(g===!1&&(z(n.BLEND),g=!0),X!==po){if(X!==x||yt!==C){if((v!==$s||E!==$s)&&(n.blendEquation(n.FUNC_ADD),v=$s,E=$s),yt)switch(X){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hi:n.blendFunc(n.ONE,n.ONE);break;case Eh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ah:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:xt("WebGLState: Invalid blending: ",X);break}else switch(X){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Eh:xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ah:xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:xt("WebGLState: Invalid blending: ",X);break}y=null,w=null,b=null,A=null,_.set(0,0,0),S=0,x=X,C=yt}return}De=De||Se,fe=fe||he,Ge=Ge||Ee,(Se!==v||De!==E)&&(n.blendEquationSeparate(ye[Se],ye[De]),v=Se,E=De),(he!==y||Ee!==w||fe!==b||Ge!==A)&&(n.blendFuncSeparate(_e[he],_e[Ee],_e[fe],_e[Ge]),y=he,w=Ee,b=fe,A=Ge),(Be.equals(_)===!1||Ut!==S)&&(n.blendColor(Be.r,Be.g,Be.b,Ut),_.copy(Be),S=Ut),x=X,C=!1}function ge(X,Se){X.side===ri?N(n.CULL_FACE):z(n.CULL_FACE);let he=X.side===On;Se&&(he=!he),Me(he),X.blending===er&&X.transparent===!1?oe(Si):oe(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ee=X.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),lt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):N(n.SAMPLE_ALPHA_TO_COVERAGE)}function Me(X){T!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),T=X)}function Ne(X){X!==F1?(z(n.CULL_FACE),X!==L&&(X===Sh?n.cullFace(n.BACK):X===U1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):N(n.CULL_FACE),L=X}function Ze(X){X!==O&&(K&&n.lineWidth(X),O=X)}function lt(X,Se,he){X?(z(n.POLYGON_OFFSET_FILL),(I!==Se||k!==he)&&(I=Se,k=he,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,he))):N(n.POLYGON_OFFSET_FILL)}function gt(X){X?z(n.SCISSOR_TEST):N(n.SCISSOR_TEST)}function ut(X){X===void 0&&(X=n.TEXTURE0+H-1),ie!==X&&(n.activeTexture(X),ie=X)}function Y(X,Se,he){he===void 0&&(ie===null?he=n.TEXTURE0+H-1:he=ie);let Ee=F[he];Ee===void 0&&(Ee={type:void 0,texture:void 0},F[he]=Ee),(Ee.type!==X||Ee.texture!==Se)&&(ie!==he&&(n.activeTexture(he),ie=he),n.bindTexture(X,Se||B[X]),Ee.type=X,Ee.texture=Se)}function tt(){const X=F[ie];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Xe(){try{n.compressedTexImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function R(){try{n.texSubImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function G(){try{n.texSubImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function me(){try{n.texStorage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function ve(){try{n.texStorage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function re(){try{n.texImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function le(){try{n.texImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function be(X){return f[X]!==void 0?f[X]:n.getParameter(X)}function ke(X,Se){f[X]!==Se&&(n.pixelStorei(X,Se),f[X]=Se)}function Ae(X){ue.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),ue.copy(X))}function we(X){xe.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),xe.copy(X))}function He(X,Se){let he=c.get(Se);he===void 0&&(he=new WeakMap,c.set(Se,he));let Ee=he.get(X);Ee===void 0&&(Ee=n.getUniformBlockIndex(Se,X.name),he.set(X,Ee))}function Ye(X,Se){const Ee=c.get(Se).get(X);h.get(Se)!==Ee&&(n.uniformBlockBinding(Se,Ee,X.__bindingPointIndex),h.set(Se,Ee))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ie=null,F={},u={},p=new WeakMap,m=[],M=null,g=!1,x=null,v=null,y=null,w=null,E=null,b=null,A=null,_=new st(0,0,0),S=0,C=!1,T=null,L=null,O=null,I=null,k=null,ue.set(0,0,n.canvas.width,n.canvas.height),xe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:z,disable:N,bindFramebuffer:Z,drawBuffers:j,useProgram:ce,setBlending:oe,setMaterial:ge,setFlipSided:Me,setCullFace:Ne,setLineWidth:Ze,setPolygonOffset:lt,setScissorTest:gt,activeTexture:ut,bindTexture:Y,unbindTexture:tt,compressedTexImage2D:Xe,compressedTexImage3D:U,texImage2D:re,texImage3D:le,pixelStorei:ke,getParameter:be,updateUBOMapping:He,uniformBlockBinding:Ye,texStorage2D:me,texStorage3D:ve,texSubImage2D:R,texSubImage3D:G,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:Ae,viewport:we,reset:Qe}}function kb(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,d=new WeakMap,f=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(U,R){return m?new OffscreenCanvas(U,R):to("canvas")}function g(U,R,G){let $=1;const te=Xe(U);if((te.width>G||te.height>G)&&($=G/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const me=Math.floor($*te.width),ve=Math.floor($*te.height);u===void 0&&(u=M(me,ve));const re=R?M(me,ve):u;return re.width=me,re.height=ve,re.getContext("2d").drawImage(U,0,0,me,ve),Ke("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+me+"x"+ve+")."),re}else return"data"in U&&Ke("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),U;return U}function x(U){return U.generateMipmaps}function v(U){n.generateMipmap(U)}function y(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(U,R,G,$,te,me=!1){if(U!==null){if(n[U]!==void 0)return n[U];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ve;$&&(ve=e.get("EXT_texture_norm16"),ve||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=R;if(R===n.RED&&(G===n.FLOAT&&(re=n.R32F),G===n.HALF_FLOAT&&(re=n.R16F),G===n.UNSIGNED_BYTE&&(re=n.R8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.R16_EXT),G===n.SHORT&&ve&&(re=ve.R16_SNORM_EXT)),R===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.R8UI),G===n.UNSIGNED_SHORT&&(re=n.R16UI),G===n.UNSIGNED_INT&&(re=n.R32UI),G===n.BYTE&&(re=n.R8I),G===n.SHORT&&(re=n.R16I),G===n.INT&&(re=n.R32I)),R===n.RG&&(G===n.FLOAT&&(re=n.RG32F),G===n.HALF_FLOAT&&(re=n.RG16F),G===n.UNSIGNED_BYTE&&(re=n.RG8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.RG16_EXT),G===n.SHORT&&ve&&(re=ve.RG16_SNORM_EXT)),R===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RG8UI),G===n.UNSIGNED_SHORT&&(re=n.RG16UI),G===n.UNSIGNED_INT&&(re=n.RG32UI),G===n.BYTE&&(re=n.RG8I),G===n.SHORT&&(re=n.RG16I),G===n.INT&&(re=n.RG32I)),R===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RGB8UI),G===n.UNSIGNED_SHORT&&(re=n.RGB16UI),G===n.UNSIGNED_INT&&(re=n.RGB32UI),G===n.BYTE&&(re=n.RGB8I),G===n.SHORT&&(re=n.RGB16I),G===n.INT&&(re=n.RGB32I)),R===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(re=n.RGBA16UI),G===n.UNSIGNED_INT&&(re=n.RGBA32UI),G===n.BYTE&&(re=n.RGBA8I),G===n.SHORT&&(re=n.RGBA16I),G===n.INT&&(re=n.RGBA32I)),R===n.RGB&&(G===n.UNSIGNED_SHORT&&ve&&(re=ve.RGB16_EXT),G===n.SHORT&&ve&&(re=ve.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(re=n.R11F_G11F_B10F)),R===n.RGBA){const le=me?ja:ct.getTransfer(te);G===n.FLOAT&&(re=n.RGBA32F),G===n.HALF_FLOAT&&(re=n.RGBA16F),G===n.UNSIGNED_BYTE&&(re=le===Rt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.RGBA16_EXT),G===n.SHORT&&ve&&(re=ve.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function E(U,R){let G;return U?R===null||R===Ti||R===Wr?G=n.DEPTH24_STENCIL8:R===li?G=n.DEPTH32F_STENCIL8:R===Gr&&(G=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ti||R===Wr?G=n.DEPTH_COMPONENT24:R===li?G=n.DEPTH_COMPONENT32F:R===Gr&&(G=n.DEPTH_COMPONENT16),G}function b(U,R){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Wt&&U.minFilter!==Kt?Math.log2(Math.max(R.width,R.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?R.mipmaps.length:1}function A(U){const R=U.target;R.removeEventListener("dispose",A),S(R),R.isVideoTexture&&d.delete(R),R.isHTMLTexture&&f.delete(R)}function _(U){const R=U.target;R.removeEventListener("dispose",_),T(R)}function S(U){const R=i.get(U);if(R.__webglInit===void 0)return;const G=U.source,$=p.get(G);if($){const te=$[R.__cacheKey];te.usedTimes--,te.usedTimes===0&&C(U),Object.keys($).length===0&&p.delete(G)}i.remove(U)}function C(U){const R=i.get(U);n.deleteTexture(R.__webglTexture);const G=U.source,$=p.get(G);delete $[R.__cacheKey],a.memory.textures--}function T(U){const R=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(R.__webglFramebuffer[$]))for(let te=0;te<R.__webglFramebuffer[$].length;te++)n.deleteFramebuffer(R.__webglFramebuffer[$][te]);else n.deleteFramebuffer(R.__webglFramebuffer[$]);R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer[$])}else{if(Array.isArray(R.__webglFramebuffer))for(let $=0;$<R.__webglFramebuffer.length;$++)n.deleteFramebuffer(R.__webglFramebuffer[$]);else n.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&n.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&n.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let $=0;$<R.__webglColorRenderbuffer.length;$++)R.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(R.__webglColorRenderbuffer[$]);R.__webglDepthRenderbuffer&&n.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const G=U.textures;for(let $=0,te=G.length;$<te;$++){const me=i.get(G[$]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(G[$])}i.remove(U)}let L=0;function O(){L=0}function I(){return L}function k(U){L=U}function H(){const U=L;return U>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,U}function K(U){const R=[];return R.push(U.wrapS),R.push(U.wrapT),R.push(U.wrapR||0),R.push(U.magFilter),R.push(U.minFilter),R.push(U.anisotropy),R.push(U.internalFormat),R.push(U.format),R.push(U.type),R.push(U.generateMipmaps),R.push(U.premultiplyAlpha),R.push(U.flipY),R.push(U.unpackAlignment),R.push(U.colorSpace),R.join()}function ae(U,R){const G=i.get(U);if(U.isVideoTexture&&Y(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&G.__version!==U.version){const $=U.image;if($===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{N(G,U,R);return}}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+R)}function q(U,R){const G=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){N(G,U,R);return}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+R)}function ie(U,R){const G=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){N(G,U,R);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+R)}function F(U,R){const G=i.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&G.__version!==U.version){Z(G,U,R);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+R)}const ee={[Za]:n.REPEAT,[Ui]:n.CLAMP_TO_EDGE,[Ll]:n.MIRRORED_REPEAT},se={[Wt]:n.NEAREST,[n2]:n.NEAREST_MIPMAP_NEAREST,[ia]:n.NEAREST_MIPMAP_LINEAR,[Kt]:n.LINEAR,[Lo]:n.LINEAR_MIPMAP_NEAREST,[vs]:n.LINEAR_MIPMAP_LINEAR},ue={[a2]:n.NEVER,[u2]:n.ALWAYS,[o2]:n.LESS,[kc]:n.LEQUAL,[l2]:n.EQUAL,[Bc]:n.GEQUAL,[c2]:n.GREATER,[h2]:n.NOTEQUAL};function xe(U,R){if(R.type===li&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===Kt||R.magFilter===Lo||R.magFilter===ia||R.magFilter===vs||R.minFilter===Kt||R.minFilter===Lo||R.minFilter===ia||R.minFilter===vs)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,ee[R.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,ee[R.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,ee[R.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,se[R.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,se[R.minFilter]),R.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ue[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Wt||R.minFilter!==ia&&R.minFilter!==vs||R.type===li&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||i.get(R).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(U,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),i.get(R).__currentAnisotropy=R.anisotropy}}}function Ce(U,R){let G=!1;U.__webglInit===void 0&&(U.__webglInit=!0,R.addEventListener("dispose",A));const $=R.source;let te=p.get($);te===void 0&&(te={},p.set($,te));const me=K(R);if(me!==U.__cacheKey){te[me]===void 0&&(te[me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[me].usedTimes++;const ve=te[U.__cacheKey];ve!==void 0&&(te[U.__cacheKey].usedTimes--,ve.usedTimes===0&&C(R)),U.__cacheKey=me,U.__webglTexture=te[me].texture}return G}function B(U,R,G){return Math.floor(Math.floor(U/G)/R)}function z(U,R,G,$){const me=U.updateRanges;if(me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,R.width,R.height,G,$,R.data);else{me.sort((ke,Ae)=>ke.start-Ae.start);let ve=0;for(let ke=1;ke<me.length;ke++){const Ae=me[ve],we=me[ke],He=Ae.start+Ae.count,Ye=B(we.start,R.width,4),Qe=B(Ae.start,R.width,4);we.start<=He+1&&Ye===Qe&&B(we.start+we.count-1,R.width,4)===Ye?Ae.count=Math.max(Ae.count,we.start+we.count-Ae.start):(++ve,me[ve]=we)}me.length=ve+1;const re=t.getParameter(n.UNPACK_ROW_LENGTH),le=t.getParameter(n.UNPACK_SKIP_PIXELS),be=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,R.width);for(let ke=0,Ae=me.length;ke<Ae;ke++){const we=me[ke],He=Math.floor(we.start/4),Ye=Math.ceil(we.count/4),Qe=He%R.width,X=Math.floor(He/R.width),Se=Ye,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,Qe,X,Se,he,G,$,R.data)}U.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,le),t.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function N(U,R,G){let $=n.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),R.isData3DTexture&&($=n.TEXTURE_3D);const te=Ce(U,R),me=R.source;t.bindTexture($,U.__webglTexture,n.TEXTURE0+G);const ve=i.get(me);if(me.version!==ve.__version||te===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&R.image instanceof ImageBitmap)===!1){const he=ct.getPrimaries(ct.workingColorSpace),Ee=R.colorSpace===zn?null:ct.getPrimaries(R.colorSpace),De=R.colorSpace===zn||he===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,R.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,R.unpackAlignment);let le=g(R.image,!1,s.maxTextureSize);le=tt(R,le);const be=r.convert(R.format,R.colorSpace),ke=r.convert(R.type);let Ae=w(R.internalFormat,be,ke,R.normalized,R.colorSpace,R.isVideoTexture);xe($,R);let we;const He=R.mipmaps,Ye=R.isVideoTexture!==!0,Qe=ve.__version===void 0||te===!0,X=me.dataReady,Se=b(R,le);if(R.isDepthTexture)Ae=E(R.format===_s,R.type),Qe&&(Ye?t.texStorage2D(n.TEXTURE_2D,1,Ae,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Ae,le.width,le.height,0,be,ke,null));else if(R.isDataTexture)if(He.length>0){Ye&&Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,He[0].width,He[0].height);for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,be,ke,we.data);R.generateMipmaps=!1}else Ye?(Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,le.width,le.height),X&&z(R,le,be,ke)):t.texImage2D(n.TEXTURE_2D,0,Ae,le.width,le.height,0,be,ke,le.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){Ye&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,He[0].width,He[0].height,le.depth);for(let he=0,Ee=He.length;he<Ee;he++)if(we=He[he],R.format!==Hn)if(be!==null)if(Ye){if(X)if(R.layerUpdates.size>0){const De=iu(we.width,we.height,R.format,R.type);for(const fe of R.layerUpdates){const Ge=we.data.subarray(fe*De/we.data.BYTES_PER_ELEMENT,(fe+1)*De/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,fe,we.width,we.height,1,be,Ge)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,be,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ae,we.width,we.height,le.depth,0,we.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,be,ke,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ae,we.width,we.height,le.depth,0,be,ke,we.data);R.layerUpdates.size>0&&R.clearLayerUpdates()}else{Ye&&Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,He[0].width,He[0].height);for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],R.format!==Hn?be!==null?Ye?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,we.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,we.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,be,ke,we.data)}else if(R.isDataArrayTexture)if(Ye){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,le.width,le.height,le.depth),X)if(R.layerUpdates.size>0){const he=iu(le.width,le.height,R.format,R.type);for(const Ee of R.layerUpdates){const De=le.data.subarray(Ee*he/le.data.BYTES_PER_ELEMENT,(Ee+1)*he/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,le.width,le.height,1,be,ke,De)}R.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,ke,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,le.width,le.height,le.depth,0,be,ke,le.data);else if(R.isData3DTexture)Ye?(Qe&&t.texStorage3D(n.TEXTURE_3D,Se,Ae,le.width,le.height,le.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,ke,le.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,le.width,le.height,le.depth,0,be,ke,le.data);else if(R.isFramebufferTexture){if(Qe)if(Ye)t.texStorage2D(n.TEXTURE_2D,Se,Ae,le.width,le.height);else{let he=le.width,Ee=le.height;for(let De=0;De<Se;De++)t.texImage2D(n.TEXTURE_2D,De,Ae,he,Ee,0,be,ke,null),he>>=1,Ee>>=1}}else if(R.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),le.parentNode!==he){he.appendChild(le),f.add(R),he.onpaint=Ee=>{const De=Ee.changedElements;for(const fe of f)De.includes(fe.image)&&(fe.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,le);else{const De=n.RGBA,fe=n.RGBA,Ge=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,fe,Ge,le)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(He.length>0){if(Ye&&Qe){const he=Xe(He[0]);t.texStorage2D(n.TEXTURE_2D,Se,Ae,he.width,he.height)}for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,be,ke,we):t.texImage2D(n.TEXTURE_2D,he,Ae,be,ke,we);R.generateMipmaps=!1}else if(Ye){if(Qe){const he=Xe(le);t.texStorage2D(n.TEXTURE_2D,Se,Ae,he.width,he.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,ke,le)}else t.texImage2D(n.TEXTURE_2D,0,Ae,be,ke,le);x(R)&&v($),ve.__version=me.version,R.onUpdate&&R.onUpdate(R)}U.__version=R.version}function Z(U,R,G){if(R.image.length!==6)return;const $=Ce(U,R),te=R.source;t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+G);const me=i.get(te);if(te.version!==me.__version||$===!0){t.activeTexture(n.TEXTURE0+G);const ve=ct.getPrimaries(ct.workingColorSpace),re=R.colorSpace===zn?null:ct.getPrimaries(R.colorSpace),le=R.colorSpace===zn||ve===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,R.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,R.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const be=R.isCompressedTexture||R.image[0].isCompressedTexture,ke=R.image[0]&&R.image[0].isDataTexture,Ae=[];for(let fe=0;fe<6;fe++)!be&&!ke?Ae[fe]=g(R.image[fe],!0,s.maxCubemapSize):Ae[fe]=ke?R.image[fe].image:R.image[fe],Ae[fe]=tt(R,Ae[fe]);const we=Ae[0],He=r.convert(R.format,R.colorSpace),Ye=r.convert(R.type),Qe=w(R.internalFormat,He,Ye,R.normalized,R.colorSpace),X=R.isVideoTexture!==!0,Se=me.__version===void 0||$===!0,he=te.dataReady;let Ee=b(R,we);xe(n.TEXTURE_CUBE_MAP,R);let De;if(be){X&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Qe,we.width,we.height);for(let fe=0;fe<6;fe++){De=Ae[fe].mipmaps;for(let Ge=0;Ge<De.length;Ge++){const Be=De[Ge];R.format!==Hn?He!==null?X?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,0,0,Be.width,Be.height,He,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,Qe,Be.width,Be.height,0,Be.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,0,0,Be.width,Be.height,He,Ye,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,Qe,Be.width,Be.height,0,He,Ye,Be.data)}}}else{if(De=R.mipmaps,X&&Se){De.length>0&&Ee++;const fe=Xe(Ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Qe,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ke){X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ae[fe].width,Ae[fe].height,He,Ye,Ae[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Qe,Ae[fe].width,Ae[fe].height,0,He,Ye,Ae[fe].data);for(let Ge=0;Ge<De.length;Ge++){const Ut=De[Ge].image[fe].image;X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,0,0,Ut.width,Ut.height,He,Ye,Ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,Qe,Ut.width,Ut.height,0,He,Ye,Ut.data)}}else{X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,He,Ye,Ae[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Qe,He,Ye,Ae[fe]);for(let Ge=0;Ge<De.length;Ge++){const Be=De[Ge];X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,0,0,He,Ye,Be.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,Qe,He,Ye,Be.image[fe])}}}x(R)&&v(n.TEXTURE_CUBE_MAP),me.__version=te.version,R.onUpdate&&R.onUpdate(R)}U.__version=R.version}function j(U,R,G,$,te,me){const ve=r.convert(G.format,G.colorSpace),re=r.convert(G.type),le=w(G.internalFormat,ve,re,G.normalized,G.colorSpace),be=i.get(R),ke=i.get(G);if(ke.__renderTarget=R,!be.__hasExternalTextures){const Ae=Math.max(1,R.width>>me),we=Math.max(1,R.height>>me);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,me,le,Ae,we,R.depth,0,ve,re,null):t.texImage2D(te,me,le,Ae,we,0,ve,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,U),ut(R)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,te,ke.__webglTexture,0,gt(R)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,te,ke.__webglTexture,me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(U,R,G){if(n.bindRenderbuffer(n.RENDERBUFFER,U),R.depthBuffer){const $=R.depthTexture,te=$&&$.isDepthTexture?$.type:null,me=E(R.stencilBuffer,te),ve=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ut(R)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(R),me,R.width,R.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(R),me,R.width,R.height):n.renderbufferStorage(n.RENDERBUFFER,me,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,U)}else{const $=R.textures;for(let te=0;te<$.length;te++){const me=$[te],ve=r.convert(me.format,me.colorSpace),re=r.convert(me.type),le=w(me.internalFormat,ve,re,me.normalized,me.colorSpace);ut(R)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(R),le,R.width,R.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(R),le,R.width,R.height):n.renderbufferStorage(n.RENDERBUFFER,le,R.width,R.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(U,R,G){const $=R.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,U),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(R.depthTexture);if(te.__renderTarget=R,(!te.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,R.depthTexture.addEventListener("dispose",A)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),xe(n.TEXTURE_CUBE_MAP,R.depthTexture);const be=r.convert(R.depthTexture.format),ke=r.convert(R.depthTexture.type);let Ae;R.depthTexture.format===Gi?Ae=n.DEPTH_COMPONENT24:R.depthTexture.format===_s&&(Ae=n.DEPTH24_STENCIL8);for(let we=0;we<6;we++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Ae,R.width,R.height,0,be,ke,null)}}else ae(R.depthTexture,0);const me=te.__webglTexture,ve=gt(R),re=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,le=R.depthTexture.format===_s?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(R.depthTexture.format===Gi)ut(R)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,me,0);else if(R.depthTexture.format===_s)ut(R)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function _e(U){const R=i.get(U),G=U.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==U.depthTexture){const $=U.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),$){const te=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),R.__depthDisposeCallback=te}R.__boundDepthTexture=$}if(U.depthTexture&&!R.__autoAllocateDepthBuffer)if(G)for(let $=0;$<6;$++)ye(R.__webglFramebuffer[$],U,$);else{const $=U.texture.mipmaps;$&&$.length>0?ye(R.__webglFramebuffer[0],U,0):ye(R.__webglFramebuffer,U,0)}else if(G){R.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,R.__webglFramebuffer[$]),R.__webglDepthbuffer[$]===void 0)R.__webglDepthbuffer[$]=n.createRenderbuffer(),ce(R.__webglDepthbuffer[$],U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=R.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,me)}}else{const $=U.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,R.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=n.createRenderbuffer(),ce(R.__webglDepthbuffer,U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=R.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(U,R,G){const $=i.get(U);R!==void 0&&j($.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&_e(U)}function ge(U){const R=U.texture,G=i.get(U),$=i.get(R);U.addEventListener("dispose",_);const te=U.textures,me=U.isWebGLCubeRenderTarget===!0,ve=te.length>1;if(ve||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=R.version,a.memory.textures++),me){G.__webglFramebuffer=[];for(let re=0;re<6;re++)if(R.mipmaps&&R.mipmaps.length>0){G.__webglFramebuffer[re]=[];for(let le=0;le<R.mipmaps.length;le++)G.__webglFramebuffer[re][le]=n.createFramebuffer()}else G.__webglFramebuffer[re]=n.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){G.__webglFramebuffer=[];for(let re=0;re<R.mipmaps.length;re++)G.__webglFramebuffer[re]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(ve)for(let re=0,le=te.length;re<le;re++){const be=i.get(te[re]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),a.memory.textures++)}if(U.samples>0&&ut(U)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let re=0;re<te.length;re++){const le=te[re];G.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[re]);const be=r.convert(le.format,le.colorSpace),ke=r.convert(le.type),Ae=w(le.internalFormat,be,ke,le.normalized,le.colorSpace,U.isXRRenderTarget===!0),we=gt(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Ae,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,G.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(G.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(me){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),xe(n.TEXTURE_CUBE_MAP,R);for(let re=0;re<6;re++)if(R.mipmaps&&R.mipmaps.length>0)for(let le=0;le<R.mipmaps.length;le++)j(G.__webglFramebuffer[re][le],U,R,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,le);else j(G.__webglFramebuffer[re],U,R,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);x(R)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let re=0,le=te.length;re<le;re++){const be=te[re],ke=i.get(be);let Ae=n.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ae=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,ke.__webglTexture),xe(Ae,be),j(G.__webglFramebuffer,U,be,n.COLOR_ATTACHMENT0+re,Ae,0),x(be)&&v(Ae)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(re=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),xe(re,R),R.mipmaps&&R.mipmaps.length>0)for(let le=0;le<R.mipmaps.length;le++)j(G.__webglFramebuffer[le],U,R,n.COLOR_ATTACHMENT0,re,le);else j(G.__webglFramebuffer,U,R,n.COLOR_ATTACHMENT0,re,0);x(R)&&v(re),t.unbindTexture()}U.depthBuffer&&_e(U)}function Me(U){const R=U.textures;for(let G=0,$=R.length;G<$;G++){const te=R[G];if(x(te)){const me=y(U),ve=i.get(te).__webglTexture;t.bindTexture(me,ve),v(me),t.unbindTexture()}}}const Ne=[],Ze=[];function lt(U){if(U.samples>0){if(ut(U)===!1){const R=U.textures,G=U.width,$=U.height;let te=n.COLOR_BUFFER_BIT;const me=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(U),re=R.length>1;if(re)for(let be=0;be<R.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const le=U.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let be=0;be<R.length;be++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[be]);const ke=i.get(R[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,G,$,0,0,G,$,te,n.NEAREST),h===!0&&(Ne.length=0,Ze.length=0,Ne.push(n.COLOR_ATTACHMENT0+be),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&(Ne.push(me),Ze.push(me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let be=0;be<R.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,ve.__webglColorRenderbuffer[be]);const ke=i.get(R[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&h){const R=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[R])}}}function gt(U){return Math.min(s.maxSamples,U.samples)}function ut(U){const R=i.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Y(U){const R=a.render.frame;d.get(U)!==R&&(d.set(U,R),U.update())}function tt(U,R){const G=U.colorSpace,$=U.format,te=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||G!==Vr&&G!==zn&&(ct.getTransfer(G)===Rt?($!==Hn||te!==Bn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):xt("WebGLTextures: Unsupported texture color space:",G)),R}function Xe(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=k,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ie,this.setTextureCube=F,this.rebindTextures=oe,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=j,this.useMultisampledRTT=ut,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Bb(n,e){function t(i,s=zn){let r;const a=ct.getTransfer(s);if(i===Bn)return n.UNSIGNED_BYTE;if(i===Dc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ic)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ld)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Td)return n.BYTE;if(i===Rd)return n.SHORT;if(i===Gr)return n.UNSIGNED_SHORT;if(i===Pc)return n.INT;if(i===Ti)return n.UNSIGNED_INT;if(i===li)return n.FLOAT;if(i===Ri)return n.HALF_FLOAT;if(i===Pd)return n.ALPHA;if(i===Dd)return n.RGB;if(i===Hn)return n.RGBA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===_s)return n.DEPTH_STENCIL;if(i===Oc)return n.RED;if(i===Nc)return n.RED_INTEGER;if(i===Ts)return n.RG;if(i===Fc)return n.RG_INTEGER;if(i===Uc)return n.RGBA_INTEGER;if(i===za||i===Ha||i===Ga||i===Wa)if(a===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pl||i===Dl||i===Il||i===Ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Dl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Nl||i===Fl||i===Ul||i===kl||i===Bl||i===Ja||i===zl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Nl||i===Fl)return a===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ul)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===kl)return r.COMPRESSED_R11_EAC;if(i===Bl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ja)return r.COMPRESSED_RG11_EAC;if(i===zl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Hl||i===Gl||i===Wl||i===Vl||i===Yl||i===Xl||i===Kl||i===ql||i===$l||i===Zl||i===Jl||i===Ql||i===jl||i===ec)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Hl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Gl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Wl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Kl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ql)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$l)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Zl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ql)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===jl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ec)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===tc||i===nc||i===ic)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===tc)return a===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===sc||i===rc||i===Qa||i===ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===sc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===rc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Wr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const zb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hb=`
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

}`;class Gb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Wd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Mt({vertexShader:zb,fragmentShader:Hb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new Vn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Wb extends Cs{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,c=null,d=null,f=null,u=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",g=new Gb,x={},v=t.getContextAttributes();let y=null,w=null;const E=[],b=[],A=new $e;let _=null,S=null;const C=new kn;C.viewport=new ot;const T=new kn;T.viewport=new ot;const L=[C,T],O=new J2;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getTargetRaySpace()},this.getControllerGrip=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getGripSpace()},this.getHand=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getHandSpace()};function H(B){const z=b.indexOf(B.inputSource);if(z===-1)return;const N=E[z];N!==void 0&&(N.update(B.inputSource,B.frame,c||a),N.dispatchEvent({type:B.type,data:B.inputSource}))}function K(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",ae);for(let B=0;B<E.length;B++){const z=b[B];z!==null&&(b[B]=null,E[B].disconnect(z))}I=null,k=null,g.reset();for(const B in x)delete x[B];if(e.setRenderTarget(y),p=null,u=null,f=null,s=null,w=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),S!==null){const B=S.camera;B.fov=S.fov,B.zoom=S.zoom,B.updateProjectionMatrix(),S=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",K),s.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let N=null,Z=null,j=null;v.depth&&(j=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,N=v.stencil?_s:Gi,Z=v.stencil?Wr:Ti);const ce={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),w=new Qn(u.textureWidth,u.textureHeight,{format:Hn,type:Bn,depthTexture:new hr(u.textureWidth,u.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,N),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const N={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,N),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Qn(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Bn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(o),Ce.setContext(s),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(B){for(let z=0;z<B.removed.length;z++){const N=B.removed[z],Z=b.indexOf(N);Z>=0&&(b[Z]=null,E[Z].disconnect(N))}for(let z=0;z<B.added.length;z++){const N=B.added[z];let Z=b.indexOf(N);if(Z===-1){for(let ce=0;ce<E.length;ce++)if(ce>=b.length){b.push(N),Z=ce;break}else if(b[ce]===null){b[ce]=N,Z=ce;break}if(Z===-1)break}const j=E[Z];j&&j.connect(N)}}const q=new W,ie=new W;function F(B,z,N){q.setFromMatrixPosition(z.matrixWorld),ie.setFromMatrixPosition(N.matrixWorld);const Z=q.distanceTo(ie),j=z.projectionMatrix.elements,ce=N.projectionMatrix.elements,ye=j[14]/(j[10]-1),_e=j[14]/(j[10]+1),oe=(j[9]+1)/j[5],ge=(j[9]-1)/j[5],Me=(j[8]-1)/j[0],Ne=(ce[8]+1)/ce[0],Ze=ye*Me,lt=ye*Ne,gt=Z/(-Me+Ne),ut=gt*-Me;if(z.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(ut),B.translateZ(gt),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),j[10]===-1)B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const Y=ye+gt,tt=_e+gt,Xe=Ze-ut,U=lt+(Z-ut),R=oe*_e/tt*Y,G=ge*_e/tt*Y;B.projectionMatrix.makePerspective(Xe,U,R,G,Y,tt),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function ee(B,z){z===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(z.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let z=B.near,N=B.far;g.texture!==null&&(g.depthNear>0&&(z=g.depthNear),g.depthFar>0&&(N=g.depthFar)),O.near=T.near=C.near=z,O.far=T.far=C.far=N,(I!==O.near||k!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,k=O.far),O.layers.mask=B.layers.mask|6,C.layers.mask=O.layers.mask&-5,T.layers.mask=O.layers.mask&-3;const Z=B.parent,j=O.cameras;ee(O,Z);for(let ce=0;ce<j.length;ce++)ee(j[ce],Z);j.length===2?F(O,C,T):O.projectionMatrix.copy(C.projectionMatrix),S===null&&B.isPerspectiveCamera&&(S={camera:B,fov:B.fov,zoom:B.zoom}),se(B,O,Z)};function se(B,z,N){N===null?B.matrix.copy(z.matrixWorld):(B.matrix.copy(N.matrixWorld),B.matrix.invert(),B.matrix.multiply(z.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=oc*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(B){h=B,u!==null&&(u.fixedFoveation=B),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=B)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(B){return x[B]};let ue=null;function xe(B,z){if(d=z.getViewerPose(c||a),m=z,d!==null){const N=d.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let Z=!1;N.length!==O.cameras.length&&(O.cameras.length=0,Z=!0);for(let _e=0;_e<N.length;_e++){const oe=N[_e];let ge=null;if(p!==null)ge=p.getViewport(oe);else{const Ne=f.getViewSubImage(u,oe);ge=Ne.viewport,_e===0&&(e.setRenderTargetTextures(w,Ne.colorTexture,Ne.depthStencilTexture),e.setRenderTarget(w))}let Me=L[_e];Me===void 0&&(Me=new kn,Me.layers.enable(_e),Me.viewport=new ot,L[_e]=Me),Me.matrix.fromArray(oe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(oe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(ge.x,ge.y,ge.width,ge.height),_e===0&&(O.matrix.copy(Me.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Z===!0&&O.cameras.push(Me)}const j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const _e=f.getDepthInformation(N[0]);_e&&_e.isValid&&_e.texture&&g.init(_e,s.renderState)}if(j&&j.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let _e=0;_e<N.length;_e++){const oe=N[_e].camera;if(oe){let ge=x[oe];ge||(ge=new Wd,x[oe]=ge);const Me=f.getCameraImage(oe);ge.sourceTexture=Me}}}}for(let N=0;N<E.length;N++){const Z=b[N],j=E[N];Z!==null&&j!==void 0&&j.update(Z,z,c||a)}ue&&ue(B,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),m=null}const Ce=new Kd;Ce.setAnimationLoop(xe),this.setAnimationLoop=function(B){ue=B},this.dispose=function(){}}}const Vb=new It,ef=new Je;ef.set(-1,0,0,0,1,0,0,0,1);function Yb(n,e){function t(g,x){g.matrixAutoUpdate===!0&&g.updateMatrix(),x.value.copy(g.matrix)}function i(g,x){x.color.getRGB(g.fogColor.value,Vd(n)),x.isFog?(g.fogNear.value=x.near,g.fogFar.value=x.far):x.isFogExp2&&(g.fogDensity.value=x.density)}function s(g,x,v,y,w){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?r(g,x):x.isMeshLambertMaterial?(r(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(r(g,x),f(g,x)):x.isMeshPhongMaterial?(r(g,x),d(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(r(g,x),u(g,x),x.isMeshPhysicalMaterial&&p(g,x,w)):x.isMeshMatcapMaterial?(r(g,x),m(g,x)):x.isMeshDepthMaterial?r(g,x):x.isMeshDistanceMaterial?(r(g,x),M(g,x)):x.isMeshNormalMaterial?r(g,x):x.isLineBasicMaterial?(a(g,x),x.isLineDashedMaterial&&o(g,x)):x.isPointsMaterial?h(g,x,v,y):x.isSpriteMaterial?c(g,x):x.isShadowMaterial?(g.color.value.copy(x.color),g.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function r(g,x){g.opacity.value=x.opacity,x.color&&g.diffuse.value.copy(x.color),x.emissive&&g.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.bumpMap&&(g.bumpMap.value=x.bumpMap,t(x.bumpMap,g.bumpMapTransform),g.bumpScale.value=x.bumpScale,x.side===On&&(g.bumpScale.value*=-1)),x.normalMap&&(g.normalMap.value=x.normalMap,t(x.normalMap,g.normalMapTransform),g.normalScale.value.copy(x.normalScale),x.side===On&&g.normalScale.value.negate()),x.displacementMap&&(g.displacementMap.value=x.displacementMap,t(x.displacementMap,g.displacementMapTransform),g.displacementScale.value=x.displacementScale,g.displacementBias.value=x.displacementBias),x.emissiveMap&&(g.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,g.emissiveMapTransform)),x.specularMap&&(g.specularMap.value=x.specularMap,t(x.specularMap,g.specularMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest);const v=e.get(x),y=v.envMap,w=v.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(Vb.makeRotationFromEuler(w)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(ef),g.reflectivity.value=x.reflectivity,g.ior.value=x.ior,g.refractionRatio.value=x.refractionRatio),x.lightMap&&(g.lightMap.value=x.lightMap,g.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,g.lightMapTransform)),x.aoMap&&(g.aoMap.value=x.aoMap,g.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,g.aoMapTransform))}function a(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform))}function o(g,x){g.dashSize.value=x.dashSize,g.totalSize.value=x.dashSize+x.gapSize,g.scale.value=x.scale}function h(g,x,v,y){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.size.value=x.size*v,g.scale.value=y*.5,x.map&&(g.map.value=x.map,t(x.map,g.uvTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function c(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.rotation.value=x.rotation,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function d(g,x){g.specular.value.copy(x.specular),g.shininess.value=Math.max(x.shininess,1e-4)}function f(g,x){x.gradientMap&&(g.gradientMap.value=x.gradientMap)}function u(g,x){g.metalness.value=x.metalness,x.metalnessMap&&(g.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,g.metalnessMapTransform)),g.roughness.value=x.roughness,x.roughnessMap&&(g.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,g.roughnessMapTransform)),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)}function p(g,x,v){g.ior.value=x.ior,x.sheen>0&&(g.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),g.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(g.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,g.sheenColorMapTransform)),x.sheenRoughnessMap&&(g.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,g.sheenRoughnessMapTransform))),x.clearcoat>0&&(g.clearcoat.value=x.clearcoat,g.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(g.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,g.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(g.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===On&&g.clearcoatNormalScale.value.negate())),x.dispersion>0&&(g.dispersion.value=x.dispersion),x.retroreflectivity>0&&(g.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(g.iridescence.value=x.iridescence,g.iridescenceIOR.value=x.iridescenceIOR,g.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(g.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,g.iridescenceMapTransform)),x.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),x.transmission>0&&(g.transmission.value=x.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),x.transmissionMap&&(g.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,g.transmissionMapTransform)),g.thickness.value=x.thickness,x.thicknessMap&&(g.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=x.attenuationDistance,g.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(g.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(g.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=x.specularIntensity,g.specularColor.value.copy(x.specularColor),x.specularColorMap&&(g.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,g.specularColorMapTransform)),x.specularIntensityMap&&(g.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,x){x.matcap&&(g.matcap.value=x.matcap)}function M(g,x){const v=e.get(x).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Xb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(w,E){const b=E.program;i.uniformBlockBinding(w,b)}function c(w,E){let b=s[w.id];b===void 0&&(g(w),b=d(w),s[w.id]=b,w.addEventListener("dispose",v));const A=E.program;i.updateUBOMapping(w,A);const _=e.render.frame;r[w.id]!==_&&(u(w),r[w.id]=_)}function d(w){const E=f();w.__bindingPointIndex=E;const b=n.createBuffer(),A=w.__size,_=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function f(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const E=s[w.id],b=w.uniforms,A=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,S=b.length;_<S;_++){const C=b[_];if(Array.isArray(C))for(let T=0,L=C.length;T<L;T++)p(C[T],_,T,A);else p(C,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,E,b,A){if(M(w,E,b,A)===!0){const _=w.__offset,S=w.value;if(Array.isArray(S)){let C=0;for(let T=0;T<S.length;T++){const L=S[T],O=x(L);m(L,w.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(S,w.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,w.__data)}}function m(w,E,b){typeof w=="number"||typeof w=="boolean"?E[0]=w:w.isMatrix3?(E[0]=w.elements[0],E[1]=w.elements[1],E[2]=w.elements[2],E[3]=0,E[4]=w.elements[3],E[5]=w.elements[4],E[6]=w.elements[5],E[7]=0,E[8]=w.elements[6],E[9]=w.elements[7],E[10]=w.elements[8],E[11]=0):ArrayBuffer.isView(w)?E.set(new w.constructor(w.buffer,w.byteOffset,E.length)):w.toArray(E,b)}function M(w,E,b,A){const _=w.value,S=E+"_"+b;if(A[S]===void 0)return typeof _=="number"||typeof _=="boolean"?A[S]=_:ArrayBuffer.isView(_)?A[S]=_.slice():A[S]=_.clone(),!0;{const C=A[S];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(w){const E=w.uniforms;let b=0;const A=16;for(let S=0,C=E.length;S<C;S++){const T=Array.isArray(E[S])?E[S]:[E[S]];for(let L=0,O=T.length;L<O;L++){const I=T[L],k=Array.isArray(I.value)?I.value:[I.value];for(let H=0,K=k.length;H<K;H++){const ae=k[H],q=x(ae),ie=b%A,F=ie%q.boundary,ee=ie+F;b+=F,ee!==0&&A-ee<q.storage&&(b+=A-ee),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=q.storage}}}const _=b%A;return _>0&&(b+=A-_),w.__size=b,w.__cache={},this}function x(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(E.boundary=16,E.storage=w.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",w),E}function v(w){const E=w.target;E.removeEventListener("dispose",v);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function y(){for(const w in s)n.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:h,update:c,dispose:y}}const Kb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gi=null;function qb(){return gi===null&&(gi=new ys(Kb,16,16,Ts,Ri),gi.name="DFG_LUT",gi.minFilter=Kt,gi.magFilter=Kt,gi.wrapS=Ui,gi.wrapT=Ui,gi.generateMipmaps=!1,gi.needsUpdate=!0),gi}class $b{constructor(e={}){const{canvas:t=p2(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Bn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const M=p,g=new Set([Uc,Fc,Nc]),x=new Set([Bn,Ti,Gr,Wr,Dc,Ic]),v=new Uint32Array(4),y=new Int32Array(4),w=new W;let E=null,b=null;const A=[],_=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let T=!1,L=null,O=null,I=null,k=null;this._outputColorSpace=$n;let H=0,K=0,ae=null,q=-1,ie=null;const F=new ot,ee=new ot;let se=null;const ue=new st(0);let xe=0,Ce=t.width,B=t.height,z=1,N=null,Z=null;const j=new ot(0,0,Ce,B),ce=new ot(0,0,Ce,B);let ye=!1;const _e=new no;let oe=!1,ge=!1;const Me=new It,Ne=new W,Ze=new ot,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function ut(){return ae===null?z:1}let Y=i;function tt(D,V){return t.getContext(D,V)}let Xe,U,R,G,$,te,me,ve,re,le,be,ke,Ae,we,He,Ye,Qe,X,Se,he,Ee,De,fe;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ac}`),t.addEventListener("webglcontextlost",Ut,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",ei,!1),Y===null){const V="webgl2";if(Y=tt(V,D),Y===null)throw tt(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ge()}catch(D){throw t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ei,!1),xt("WebGLRenderer: "+D.message),D}function Ge(){Xe=new qv(Y),Xe.init(),Ee=new Bb(Y,Xe),U=new kv(Y,Xe,e,Ee),R=new Ub(Y,Xe),U.reversedDepthBuffer&&u&&R.buffers.depth.setReversed(!0),O=Y.createFramebuffer(),I=Y.createFramebuffer(),k=Y.createFramebuffer(),G=new Jv(Y),$=new wb,te=new kb(Y,Xe,R,$,U,Ee,G),me=new Kv(C),ve=new j2(Y),De=new Fv(Y,ve),re=new $v(Y,ve,G,De),le=new jv(Y,re,ve,De,G),X=new Qv(Y,U,te),He=new Bv($),be=new yb(C,me,Xe,U,De,He),ke=new Yb(C,$),Ae=new Eb,we=new Pb(Xe),Qe=new Nv(C,me,R,le,m,h),Ye=new Fb(C,le,U),fe=new Xb(Y,G,U,R),Se=new Uv(Y,Xe,G),he=new Zv(Y,Xe,G),G.programs=be.programs,C.capabilities=U,C.extensions=Xe,C.properties=$,C.renderLists=Ae,C.shadowMap=Ye,C.state=R,C.info=G}M!==Bn&&(S=new t_(M,t.width,t.height,o,s,r));const Be=new Wb(C,Y);this.xr=Be,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const D=Xe.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Xe.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(D){D!==void 0&&(z=D,this.setSize(Ce,B,!1))},this.getSize=function(D){return D.set(Ce,B)},this.setSize=function(D,V,ne=!0){if(Be.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Ce=D,B=V,t.width=Math.floor(D*z),t.height=Math.floor(V*z),ne===!0&&(t.style.width=D+"px",t.style.height=V+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,D,V)},this.getDrawingBufferSize=function(D){return D.set(Ce*z,B*z).floor()},this.setDrawingBufferSize=function(D,V,ne){Ce=D,B=V,z=ne,t.width=Math.floor(D*ne),t.height=Math.floor(V*ne),this.setViewport(0,0,D,V)},this.setEffects=function(D){if(M===Bn){xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let V=0;V<D.length;V++)if(D[V].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(j)},this.setViewport=function(D,V,ne,J){D.isVector4?j.set(D.x,D.y,D.z,D.w):j.set(D,V,ne,J),R.viewport(F.copy(j).multiplyScalar(z).round())},this.getScissor=function(D){return D.copy(ce)},this.setScissor=function(D,V,ne,J){D.isVector4?ce.set(D.x,D.y,D.z,D.w):ce.set(D,V,ne,J),R.scissor(ee.copy(ce).multiplyScalar(z).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(D){R.setScissorTest(ye=D)},this.setOpaqueSort=function(D){N=D},this.setTransparentSort=function(D){Z=D},this.getClearColor=function(D){return D.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(D=!0,V=!0,ne=!0){let J=0;if(D){let Q=!1;if(ae!==null){const Le=ae.texture.format;Q=g.has(Le)}if(Q){const Le=ae.texture.type,Oe=x.has(Le),Re=Qe.getClearColor(),Fe=Qe.getClearAlpha(),ze=Re.r,nt=Re.g,rt=Re.b;Oe?(v[0]=ze,v[1]=nt,v[2]=rt,v[3]=Fe,Y.clearBufferuiv(Y.COLOR,0,v)):(y[0]=ze,y[1]=nt,y[2]=rt,y[3]=Fe,Y.clearBufferiv(Y.COLOR,0,y))}else J|=Y.COLOR_BUFFER_BIT}V&&(J|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(J|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&Y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),L=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ei,!1),Qe.dispose(),Ae.dispose(),we.dispose(),$.dispose(),me.dispose(),le.dispose(),De.dispose(),fe.dispose(),be.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",Qc),Be.removeEventListener("sessionend",jc),as.stop()};function Ut(D){D.preventDefault(),Lh("WebGLRenderer: Context Lost."),T=!0}function yt(){Lh("WebGLRenderer: Context Restored."),T=!1;const D=G.autoReset,V=Ye.enabled,ne=Ye.autoUpdate,J=Ye.needsUpdate,Q=Ye.type;Ge(),G.autoReset=D,Ye.enabled=V,Ye.autoUpdate=ne,Ye.needsUpdate=J,Ye.type=Q}function ei(D){xt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function fi(D){const V=D.target;V.removeEventListener("dispose",fi),vf(V)}function vf(D){_f(D),$.remove(D)}function _f(D){const V=$.get(D).programs;V!==void 0&&(V.forEach(function(ne){be.releaseProgram(ne)}),D.isShaderMaterial&&be.releaseShaderCache(D))}this.renderBufferDirect=function(D,V,ne,J,Q,Le){V===null&&(V=lt);const Oe=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Re=wf(D,V,ne,J,Q);R.setMaterial(J,Oe);let Fe=ne.index,ze=1;if(J.wireframe===!0){if(Fe=re.getWireframeAttribute(ne),Fe===void 0)return;ze=2}const nt=ne.drawRange,rt=ne.attributes.position;let Ue=nt.start*ze,wt=(nt.start+nt.count)*ze;Le!==null&&(Ue=Math.max(Ue,Le.start*ze),wt=Math.min(wt,(Le.start+Le.count)*ze)),Fe!==null?(Ue=Math.max(Ue,0),wt=Math.min(wt,Fe.count)):rt!=null&&(Ue=Math.max(Ue,0),wt=Math.min(wt,rt.count));const Qt=wt-Ue;if(Qt<0||Qt===1/0)return;De.setup(Q,J,Re,ne,Fe);let Bt,Ot=Se;if(Fe!==null&&(Bt=ve.get(Fe),Ot=he,Ot.setIndex(Bt)),Q.isMesh)J.wireframe===!0?(R.setLineWidth(J.wireframeLinewidth*ut()),Ot.setMode(Y.LINES)):Ot.setMode(Y.TRIANGLES);else if(Q.isLine){let vn=J.linewidth;vn===void 0&&(vn=1),R.setLineWidth(vn*ut()),Q.isLineSegments?Ot.setMode(Y.LINES):Q.isLineLoop?Ot.setMode(Y.LINE_LOOP):Ot.setMode(Y.LINE_STRIP)}else Q.isPoints?Ot.setMode(Y.POINTS):Q.isSprite&&Ot.setMode(Y.TRIANGLES);if(Q.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))Ot.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const vn=Q._multiDrawStarts,Ie=Q._multiDrawCounts,En=Q._multiDrawCount,mt=Fe?ve.get(Fe).bytesPerElement:1,Yn=$.get(J).currentProgram.getUniforms();for(let pi=0;pi<En;pi++)Yn.setValue(Y,"_gl_DrawID",pi),Ot.render(vn[pi]/mt,Ie[pi])}else if(Q.isInstancedMesh)Ot.renderInstances(Ue,Qt,Q.count);else if(ne.isInstancedBufferGeometry){const vn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ie=Math.min(ne.instanceCount,vn);Ot.renderInstances(Ue,Qt,Ie)}else Ot.render(Ue,Qt)};function Jc(D,V,ne,J){L!==null&&D.isNodeMaterial&&L.setObject(J,D),oe===!0&&He.setState(D,ne,!1),D.transparent===!0&&D.side===ri&&D.forceSinglePass===!1?(D.side=On,D.needsUpdate=!0,Qr(D,V,J),D.side=Es,D.needsUpdate=!0,Qr(D,V,J),D.side=ri):Qr(D,V,J)}this.compile=function(D,V,ne=null){ne===null&&(ne=D),L!==null&&L.renderStart(D,V,ne),b=we.get(ne),b.init(V),_.push(b),ne.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),D!==ne&&D.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),L!==null&&L.updateLights(b.state.lightsArray),ge=this.localClippingEnabled,oe=He.init(this.clippingPlanes,ge),oe===!0&&He.setGlobalState(this.clippingPlanes,V),L!==null&&Ye.render(b.state.shadowsArray,ne,V);const J=new Set;return D.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Le=Q.material;if(Le)if(Array.isArray(Le))for(let Oe=0;Oe<Le.length;Oe++){const Re=Le[Oe];Jc(Re,ne,V,Q),J.add(Re)}else Jc(Le,ne,V,Q),J.add(Le)}),b=_.pop(),L!==null&&L.renderEnd(),J},this.compileAsync=function(D,V,ne=null){const J=this.compile(D,V,ne);return new Promise(Q=>{function Le(){if(J.forEach(function(Oe){const Fe=$.get(Oe).currentProgram;(Fe===void 0||Fe.isReady())&&J.delete(Oe)}),J.size===0){Q(D);return}setTimeout(Le,10)}Xe.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let vo=null;function bf(D){vo&&vo(D)}function Qc(){as.stop()}function jc(){as.start()}const as=new Kd;as.setAnimationLoop(bf),typeof self<"u"&&as.setContext(self),this.setAnimationLoop=function(D){vo=D,Be.setAnimationLoop(D),D===null?as.stop():as.start()},Be.addEventListener("sessionstart",Qc),Be.addEventListener("sessionend",jc),this.render=function(D,V){if(V!==void 0&&V.isCamera!==!0){xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;L!==null&&L.renderStart(D,V);const ne=Be.enabled===!0&&Be.isPresenting===!0,J=S!==null&&(ae===null||ne)&&S.begin(C,ae);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(V),V=Be.getCamera()),D.isScene===!0&&D.onBeforeRender(C,D,V,ae),b=we.get(D,_.length),b.init(V),b.state.textureUnits=te.getTextureUnits(),_.push(b),Me.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),_e.setFromProjectionMatrix(Me,wi,V.reversedDepth),ge=this.localClippingEnabled,oe=He.init(this.clippingPlanes,ge),E=Ae.get(D,A.length),E.init(),A.push(E),Be.enabled===!0&&Be.isPresenting===!0){const Oe=C.xr.getDepthSensingMesh();Oe!==null&&_o(Oe,V,-1/0,C.sortObjects)}_o(D,V,0,C.sortObjects),E.finish(),L!==null&&L.updateLights(b.state.lightsArray),C.sortObjects===!0&&E.sort(N,Z),gt=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,gt&&Qe.addToRenderList(E,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&He.beginShadows();const Q=b.state.shadowsArray;if(Ye.render(Q,D,V),oe===!0&&He.endShadows(),(J&&S.hasRenderPass())===!1){const Oe=E.opaque,Re=E.transmissive;if(b.setupLights(),V.isArrayCamera){const Fe=V.cameras;if(Re.length>0)for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze];th(Oe,Re,D,rt)}gt&&Qe.render(D);for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze];eh(E,D,rt,rt.viewport)}}else Re.length>0&&th(Oe,Re,D,V),gt&&Qe.render(D),eh(E,D,V)}ae!==null&&K===0&&(te.updateMultisampleRenderTarget(ae),te.updateRenderTargetMipmap(ae)),J&&S.end(C),D.isScene===!0&&D.onAfterRender(C,D,V),De.resetDefaultState(),q=-1,ie=null,_.pop(),_.length>0?(b=_[_.length-1],te.setTextureUnits(b.state.textureUnits),oe===!0&&He.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,L!==null&&L.renderEnd()};function _o(D,V,ne,J){if(D.visible===!1)return;if(D.layers.test(V.layers)){if(D.isGroup)ne=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(V);else if(D.isLightProbeGrid)b.pushLightProbeGrid(D);else if(D.isLight)b.pushLight(D),D.castShadow&&b.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(_e)){J&&Ze.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Me);const Oe=le.update(D),Re=D.material;Re.visible&&E.push(D,Oe,Re,ne,Ze.z,null,V)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(_e))){const Oe=le.update(D),Re=D.material;if(J&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ze.copy(D.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),Ze.copy(Oe.boundingSphere.center)),Ze.applyMatrix4(D.matrixWorld).applyMatrix4(Me)),Array.isArray(Re)){const Fe=Oe.groups;for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze],Ue=Re[rt.materialIndex];Ue&&Ue.visible&&E.push(D,Oe,Ue,ne,Ze.z,rt,V)}}else Re.visible&&E.push(D,Oe,Re,ne,Ze.z,null,V)}}const Le=D.children;for(let Oe=0,Re=Le.length;Oe<Re;Oe++)_o(Le[Oe],V,ne,J)}function eh(D,V,ne,J){const{opaque:Q,transmissive:Le,transparent:Oe}=D;b.setupLightsView(ne),oe===!0&&He.setGlobalState(C.clippingPlanes,ne),J&&R.viewport(F.copy(J)),Q.length>0&&Jr(Q,V,ne),Le.length>0&&Jr(Le,V,ne),Oe.length>0&&Jr(Oe,V,ne),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function th(D,V,ne,J){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[J.id]===void 0){const Ue=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[J.id]=new Qn(1,1,{generateMipmaps:!0,type:Ue?Ri:Bn,minFilter:vs,samples:Math.max(4,U.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const Le=b.state.transmissionRenderTarget[J.id],Oe=J.viewport||F;Le.setSize(Oe.z*C.transmissionResolutionScale,Oe.w*C.transmissionResolutionScale);const Re=C.getRenderTarget(),Fe=C.getActiveCubeFace(),ze=C.getActiveMipmapLevel();C.setRenderTarget(Le),C.getClearColor(ue),xe=C.getClearAlpha(),xe<1&&C.setClearColor(16777215,.5),C.clear(),gt&&Qe.render(ne);const nt=C.toneMapping;C.toneMapping=Ei;const rt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),b.setupLightsView(J),oe===!0&&He.setGlobalState(C.clippingPlanes,J),Jr(D,ne,J),te.updateMultisampleRenderTarget(Le),te.updateRenderTargetMipmap(Le),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let wt=0,Qt=V.length;wt<Qt;wt++){const Bt=V[wt],{object:Ot,geometry:vn,material:Ie,group:En}=Bt;if(Ie.side===ri&&Ot.layers.test(J.layers)){const mt=Ie.side;Ie.side=On,Ie.needsUpdate=!0,nh(Ot,ne,J,vn,Ie,En),Ie.side=mt,Ie.needsUpdate=!0,Ue=!0}}Ue===!0&&(te.updateMultisampleRenderTarget(Le),te.updateRenderTargetMipmap(Le))}C.setRenderTarget(Re,Fe,ze),C.setClearColor(ue,xe),rt!==void 0&&(J.viewport=rt),C.toneMapping=nt}function Jr(D,V,ne){const J=V.isScene===!0?V.overrideMaterial:null;for(let Q=0,Le=D.length;Q<Le;Q++){const Oe=D[Q],{object:Re,geometry:Fe,group:ze}=Oe;let nt=Oe.material;nt.allowOverride===!0&&J!==null&&(nt=J),Re.layers.test(ne.layers)&&nh(Re,V,ne,Fe,nt,ze)}}function nh(D,V,ne,J,Q,Le){L!==null&&Q.isNodeMaterial&&L.setObject(D,Q),D.onBeforeRender(C,V,ne,J,Q,Le),D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Q.onBeforeRender(C,V,ne,J,D,Le),Q.transparent===!0&&Q.side===ri&&Q.forceSinglePass===!1?(Q.side=On,Q.needsUpdate=!0,C.renderBufferDirect(ne,V,J,Q,D,Le),Q.side=Es,Q.needsUpdate=!0,C.renderBufferDirect(ne,V,J,Q,D,Le),Q.side=ri):C.renderBufferDirect(ne,V,J,Q,D,Le),D.onAfterRender(C,V,ne,J,Q,Le)}function Qr(D,V,ne){V.isScene!==!0&&(V=lt);const J=$.get(D),Q=b.state.lights,Le=b.state.shadowsArray,Oe=Q.state.version,Re=be.getParameters(D,Q.state,Le,V,ne,b.state.lightProbeGridArray),Fe=be.getProgramCacheKey(Re);let ze=J.programs;J.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?V.environment:null,J.fog=V.fog;const nt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;J.envMap=me.get(D.envMap||J.environment,nt),J.envMapRotation=J.environment!==null&&D.envMap===null?V.environmentRotation:D.envMapRotation,ze===void 0&&(D.addEventListener("dispose",fi),ze=new Map,J.programs=ze);let rt=ze.get(Fe);if(rt!==void 0){if(J.currentProgram===rt&&J.lightsStateVersion===Oe)return sh(D,Re),rt}else Re.uniforms=be.getUniforms(D),L!==null&&D.isNodeMaterial&&L.build(D,ne,Re),D.onBeforeCompile(Re,C),rt=be.acquireProgram(Re,Fe),ze.set(Fe,rt),J.uniforms=Re.uniforms;const Ue=J.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ue.clippingPlanes=He.uniform),sh(D,Re),J.needsLights=Ef(D),J.lightsStateVersion=Oe,J.needsLights&&(Ue.ambientLightColor.value=Q.state.ambient,Ue.lightProbe.value=Q.state.probe,Ue.sunLights.value=Q.state.sun,Ue.sunLightShadows.value=Q.state.sunShadow,Ue.directionalLights.value=Q.state.directional,Ue.directionalLightShadows.value=Q.state.directionalShadow,Ue.spotLights.value=Q.state.spot,Ue.spotLightShadows.value=Q.state.spotShadow,Ue.rectAreaLights.value=Q.state.rectArea,Ue.ltc_1.value=Q.state.rectAreaLTC1,Ue.ltc_2.value=Q.state.rectAreaLTC2,Ue.pointLights.value=Q.state.point,Ue.pointLightShadows.value=Q.state.pointShadow,Ue.hemisphereLights.value=Q.state.hemi,Ue.sunShadowMatrix.value=Q.state.sunShadowMatrix,Ue.sunShadowCascade.value=Q.state.sunShadowCascade,Ue.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Ue.spotLightMatrix.value=Q.state.spotLightMatrix,Ue.spotLightMap.value=Q.state.spotLightMap,Ue.pointShadowMatrix.value=Q.state.pointShadowMatrix),J.lightProbeGrid=b.state.lightProbeGridArray.length>0,J.currentProgram=rt,J.uniformsList=null,rt}function ih(D){if(D.uniformsList===null){const V=D.currentProgram.getUniforms();D.uniformsList=Va.seqWithValue(V.seq,D.uniforms)}return D.uniformsList}function sh(D,V){const ne=$.get(D);ne.outputColorSpace=V.outputColorSpace,ne.batching=V.batching,ne.batchingColor=V.batchingColor,ne.instancing=V.instancing,ne.instancingColor=V.instancingColor,ne.instancingMorph=V.instancingMorph,ne.skinning=V.skinning,ne.morphTargets=V.morphTargets,ne.morphNormals=V.morphNormals,ne.morphColors=V.morphColors,ne.morphTargetsCount=V.morphTargetsCount,ne.numClippingPlanes=V.numClippingPlanes,ne.numIntersection=V.numClipIntersection,ne.vertexAlphas=V.vertexAlphas,ne.vertexTangents=V.vertexTangents,ne.toneMapping=V.toneMapping}function yf(D,V){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;w.setFromMatrixPosition(V.matrixWorld);for(let ne=0,J=D.length;ne<J;ne++){const Q=D[ne];if(Q.texture!==null&&Q.boundingBox.containsPoint(w))return Q}return null}function wf(D,V,ne,J,Q){V.isScene!==!0&&(V=lt),te.resetTextureUnits();const Le=V.fog,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?V.environment:null,Re=ae===null?C.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ct.workingColorSpace,Fe=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,ze=me.get(J.envMap||Oe,Fe),nt=J.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,rt=!!ne.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ue=!!ne.morphAttributes.position,wt=!!ne.morphAttributes.normal,Qt=!!ne.morphAttributes.color;let Bt=Ei;J.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Bt=C.toneMapping);const Ot=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,vn=Ot!==void 0?Ot.length:0,Ie=$.get(J),En=b.state.lights;if(oe===!0&&(ge===!0||D!==ie)){const kt=D===ie&&J.id===q;He.setState(J,D,kt)}let mt=!1;J.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==En.state.version||Ie.outputColorSpace!==Re||Q.isBatchedMesh&&Ie.batching===!1||!Q.isBatchedMesh&&Ie.batching===!0||Q.isBatchedMesh&&Ie.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Ie.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Ie.instancing===!1||!Q.isInstancedMesh&&Ie.instancing===!0||Q.isSkinnedMesh&&Ie.skinning===!1||!Q.isSkinnedMesh&&Ie.skinning===!0||Q.isInstancedMesh&&Ie.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Ie.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Ie.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Ie.instancingMorph===!1&&Q.morphTexture!==null||Ie.envMap!==ze||J.fog===!0&&Ie.fog!==Le||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==He.numPlanes||Ie.numIntersection!==He.numIntersection)||Ie.vertexAlphas!==nt||Ie.vertexTangents!==rt||Ie.morphTargets!==Ue||Ie.morphNormals!==wt||Ie.morphColors!==Qt||Ie.toneMapping!==Bt||Ie.morphTargetsCount!==vn||!!Ie.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,Ie.__version=J.version);let Yn=Ie.currentProgram;mt===!0&&(Yn=Qr(J,V,Q),L&&J.isNodeMaterial&&L.onUpdateProgram(J,Yn,Ie));let pi=!1,Yi=!1,Ps=!1;const Pt=Yn.getUniforms(),Zt=Ie.uniforms;if(R.useProgram(Yn.program)&&(pi=!0,Yi=!0,Ps=!0),J.id!==q&&(q=J.id,Yi=!0),Ie.needsLights){const kt=yf(b.state.lightProbeGridArray,Q);Ie.lightProbeGrid!==kt&&(Ie.lightProbeGrid=kt,Yi=!0)}if(pi||ie!==D){R.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Pt.setValue(Y,"projectionMatrix",D.projectionMatrix),Pt.setValue(Y,"viewMatrix",D.matrixWorldInverse);const Ki=Pt.map.cameraPosition;Ki!==void 0&&Ki.setValue(Y,Ne.setFromMatrixPosition(D.matrixWorld)),U.logarithmicDepthBuffer&&Pt.setValue(Y,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Pt.setValue(Y,"isOrthographic",D.isOrthographicCamera===!0),ie!==D&&(ie=D,Yi=!0,Ps=!0)}if(Ie.needsLights&&(En.state.sunShadowMap.length>0&&Pt.setValue(Y,"sunShadowMap",En.state.sunShadowMap,te),En.state.directionalShadowMap.length>0&&Pt.setValue(Y,"directionalShadowMap",En.state.directionalShadowMap,te),En.state.spotShadowMap.length>0&&Pt.setValue(Y,"spotShadowMap",En.state.spotShadowMap,te),En.state.pointShadowMap.length>0&&Pt.setValue(Y,"pointShadowMap",En.state.pointShadowMap,te)),Q.isSkinnedMesh){Pt.setOptional(Y,Q,"bindMatrix"),Pt.setOptional(Y,Q,"bindMatrixInverse");const kt=Q.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Pt.setValue(Y,"boneTexture",kt.boneTexture,te))}Q.isBatchedMesh&&(Pt.setOptional(Y,Q,"batchingTexture"),Pt.setValue(Y,"batchingTexture",Q._matricesTexture,te),Pt.setOptional(Y,Q,"batchingIdTexture"),Pt.setValue(Y,"batchingIdTexture",Q._indirectTexture,te),Pt.setOptional(Y,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Pt.setValue(Y,"batchingColorTexture",Q._colorsTexture,te));const Xi=ne.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&X.update(Q,ne,Yn),(Yi||Ie.receiveShadow!==Q.receiveShadow)&&(Ie.receiveShadow=Q.receiveShadow,Pt.setValue(Y,"receiveShadow",Q.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&V.environment!==null&&(Zt.envMapIntensity.value=V.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=qb()),Yi){if(Pt.setValue(Y,"toneMappingExposure",C.toneMappingExposure),Ie.needsLights&&Sf(Zt,Ps),Le&&J.fog===!0&&ke.refreshFogUniforms(Zt,Le),ke.refreshMaterialUniforms(Zt,J,z,B,b.state.transmissionRenderTarget[D.id]),Ie.needsLights&&Ie.lightProbeGrid){const kt=Ie.lightProbeGrid;Zt.probesSH.value=kt.texture,Zt.probesMin.value.copy(kt.boundingBox.min),Zt.probesMax.value.copy(kt.boundingBox.max),Zt.probesResolution.value.copy(kt.resolution)}Va.upload(Y,ih(Ie),Zt,te)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Va.upload(Y,ih(Ie),Zt,te),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Pt.setValue(Y,"center",Q.center),Pt.setValue(Y,"modelViewMatrix",Q.modelViewMatrix),Pt.setValue(Y,"normalMatrix",Q.normalMatrix),Pt.setValue(Y,"modelMatrix",Q.matrixWorld),J.uniformsGroups!==void 0){const kt=J.uniformsGroups;for(let Ki=0,Ds=kt.length;Ki<Ds;Ki++){const ah=kt[Ki];fe.update(ah,Yn),fe.bind(ah,Yn)}}return Yn}function Sf(D,V){D.ambientLightColor.needsUpdate=V,D.lightProbe.needsUpdate=V,D.sunLights.needsUpdate=V,D.sunLightShadows.needsUpdate=V,D.directionalLights.needsUpdate=V,D.directionalLightShadows.needsUpdate=V,D.pointLights.needsUpdate=V,D.pointLightShadows.needsUpdate=V,D.spotLights.needsUpdate=V,D.spotLightShadows.needsUpdate=V,D.rectAreaLights.needsUpdate=V,D.hemisphereLights.needsUpdate=V}function Ef(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(D,V,ne){const J=$.get(D);J.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),$.get(D.texture).__webglTexture=V,$.get(D.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ne,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,V){const ne=$.get(D);ne.__webglFramebuffer=V,ne.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(D,V=0,ne=0){ae=D,H=V,K=ne;let J=null,Q=!1,Le=!1;if(D){const Re=$.get(D);if(Re.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(Y.FRAMEBUFFER,Re.__webglFramebuffer),F.copy(D.viewport),ee.copy(D.scissor),se=D.scissorTest,R.viewport(F),R.scissor(ee),R.setScissorTest(se),q=-1;return}else if(Re.__webglFramebuffer===void 0)te.setupRenderTarget(D);else if(Re.__hasExternalTextures)te.rebindTextures(D,$.get(D.texture).__webglTexture,$.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const nt=D.depthTexture;if(Re.__boundDepthTexture!==nt){if(nt!==null&&$.has(nt)&&(D.width!==nt.image.width||D.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(D)}}const Fe=D.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Le=!0);const ze=$.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ze[V])?J=ze[V][ne]:J=ze[V],Q=!0):D.samples>0&&te.useMultisampledRTT(D)===!1?J=$.get(D).__webglMultisampledFramebuffer:Array.isArray(ze)?J=ze[ne]:J=ze,F.copy(D.viewport),ee.copy(D.scissor),se=D.scissorTest}else F.copy(j).multiplyScalar(z).floor(),ee.copy(ce).multiplyScalar(z).floor(),se=ye;if(ne!==0&&(J=O),R.bindFramebuffer(Y.FRAMEBUFFER,J)&&R.drawBuffers(D,J),R.viewport(F),R.scissor(ee),R.setScissorTest(se),Q){const Re=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+V,Re.__webglTexture,ne)}else if(Le){const Re=V;for(let Fe=0;Fe<D.textures.length;Fe++){const ze=$.get(D.textures[Fe]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Fe,ze.__webglTexture,ne,Re)}}else if(D!==null&&ne!==0){const Re=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Re.__webglTexture,ne)}q=-1};function rh(D){const V=$.get(D);return(V.__readFormat!==D.format||V.__readType!==D.type)&&(V.__readFormat=D.format,V.__readType=D.type,V.__formatReadable=U.textureFormatReadable(D.format),V.__typeReadable=U.textureTypeReadable(D.type)),V}this.readRenderTargetPixels=function(D,V,ne,J,Q,Le,Oe,Re=0){if(!(D&&D.isWebGLRenderTarget)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Fe=Fe[Oe]),Fe){R.bindFramebuffer(Y.FRAMEBUFFER,Fe);try{const ze=D.textures[Re],nt=ze.format,rt=ze.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Re);const Ue=rh(ze);if(Ue.__formatReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ue.__typeReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=D.width-J&&ne>=0&&ne<=D.height-Q&&Y.readPixels(V,ne,J,Q,Ee.convert(nt),Ee.convert(rt),Le)}finally{const ze=ae!==null?$.get(ae).__webglFramebuffer:null;R.bindFramebuffer(Y.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(D,V,ne,J,Q,Le,Oe,Re=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Fe=Fe[Oe]),Fe)if(V>=0&&V<=D.width-J&&ne>=0&&ne<=D.height-Q){R.bindFramebuffer(Y.FRAMEBUFFER,Fe);const ze=D.textures[Re],nt=ze.format,rt=ze.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Re);const Ue=rh(ze);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const wt=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,wt),Y.bufferData(Y.PIXEL_PACK_BUFFER,Le.byteLength,Y.STREAM_READ),Y.readPixels(V,ne,J,Q,Ee.convert(nt),Ee.convert(rt),0),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null);const Qt=ae!==null?$.get(ae).__webglFramebuffer:null;R.bindFramebuffer(Y.FRAMEBUFFER,Qt);const Bt=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await m2(Y,Bt,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,wt),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Le),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null),Y.deleteBuffer(wt),Y.deleteSync(Bt),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,V=null,ne=0){const J=Math.pow(2,-ne),Q=Math.floor(D.image.width*J),Le=Math.floor(D.image.height*J),Oe=V!==null?V.x:0,Re=V!==null?V.y:0;te.setTexture2D(D,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ne,0,0,Oe,Re,Q,Le),R.unbindTexture()},this.copyTextureToTexture=function(D,V,ne=null,J=null,Q=0,Le=0){let Oe,Re,Fe,ze,nt,rt,Ue,wt,Qt;const Bt=D.isCompressedTexture?D.mipmaps[Le]:D.image;if(ne!==null)Oe=ne.max.x-ne.min.x,Re=ne.max.y-ne.min.y,Fe=ne.isBox3?ne.max.z-ne.min.z:1,ze=ne.min.x,nt=ne.min.y,rt=ne.isBox3?ne.min.z:0;else{const Zt=Math.pow(2,-Q);Oe=Math.floor(Bt.width*Zt),Re=Math.floor(Bt.height*Zt),D.isDataArrayTexture?Fe=Bt.depth:D.isData3DTexture?Fe=Math.floor(Bt.depth*Zt):Fe=1,ze=0,nt=0,rt=0}J!==null?(Ue=J.x,wt=J.y,Qt=J.z):(Ue=0,wt=0,Qt=0);const Ot=Ee.convert(V.format),vn=Ee.convert(V.type);let Ie;V.isData3DTexture?(te.setTexture3D(V,0),Ie=Y.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(te.setTexture2DArray(V,0),Ie=Y.TEXTURE_2D_ARRAY):(te.setTexture2D(V,0),Ie=Y.TEXTURE_2D),R.activeTexture(Y.TEXTURE0),R.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,V.flipY),R.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),R.pixelStorei(Y.UNPACK_ALIGNMENT,V.unpackAlignment);const En=R.getParameter(Y.UNPACK_ROW_LENGTH),mt=R.getParameter(Y.UNPACK_IMAGE_HEIGHT),Yn=R.getParameter(Y.UNPACK_SKIP_PIXELS),pi=R.getParameter(Y.UNPACK_SKIP_ROWS),Yi=R.getParameter(Y.UNPACK_SKIP_IMAGES);R.pixelStorei(Y.UNPACK_ROW_LENGTH,Bt.width),R.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Bt.height),R.pixelStorei(Y.UNPACK_SKIP_PIXELS,ze),R.pixelStorei(Y.UNPACK_SKIP_ROWS,nt),R.pixelStorei(Y.UNPACK_SKIP_IMAGES,rt);const Ps=D.isDataArrayTexture||D.isData3DTexture,Pt=V.isDataArrayTexture||V.isData3DTexture;if(D.isDepthTexture){const Zt=$.get(D),Xi=$.get(V),kt=$.get(Zt.__renderTarget),Ki=$.get(Xi.__renderTarget);R.bindFramebuffer(Y.READ_FRAMEBUFFER,kt.__webglFramebuffer),R.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let Ds=0;Ds<Fe;Ds++)Ps&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(D).__webglTexture,Q,rt+Ds),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(V).__webglTexture,Le,Qt+Ds)),Y.blitFramebuffer(ze,nt,Oe,Re,Ue,wt,Oe,Re,Y.DEPTH_BUFFER_BIT,Y.NEAREST);R.bindFramebuffer(Y.READ_FRAMEBUFFER,null),R.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(Q!==0||D.isRenderTargetTexture||$.has(D)){const Zt=$.get(D),Xi=$.get(V);R.bindFramebuffer(Y.READ_FRAMEBUFFER,I),R.bindFramebuffer(Y.DRAW_FRAMEBUFFER,k);for(let kt=0;kt<Fe;kt++)Ps?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Zt.__webglTexture,Q,rt+kt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Zt.__webglTexture,Q),Pt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Xi.__webglTexture,Le,Qt+kt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Xi.__webglTexture,Le),Q!==0?Y.blitFramebuffer(ze,nt,Oe,Re,Ue,wt,Oe,Re,Y.COLOR_BUFFER_BIT,Y.NEAREST):Pt?Y.copyTexSubImage3D(Ie,Le,Ue,wt,Qt+kt,ze,nt,Oe,Re):Y.copyTexSubImage2D(Ie,Le,Ue,wt,ze,nt,Oe,Re);R.bindFramebuffer(Y.READ_FRAMEBUFFER,null),R.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Pt?D.isDataTexture||D.isData3DTexture?Y.texSubImage3D(Ie,Le,Ue,wt,Qt,Oe,Re,Fe,Ot,vn,Bt.data):V.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ie,Le,Ue,wt,Qt,Oe,Re,Fe,Ot,Bt.data):Y.texSubImage3D(Ie,Le,Ue,wt,Qt,Oe,Re,Fe,Ot,vn,Bt):D.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Le,Ue,wt,Oe,Re,Ot,vn,Bt.data):D.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Le,Ue,wt,Bt.width,Bt.height,Ot,Bt.data):Y.texSubImage2D(Y.TEXTURE_2D,Le,Ue,wt,Oe,Re,Ot,vn,Bt);R.pixelStorei(Y.UNPACK_ROW_LENGTH,En),R.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,mt),R.pixelStorei(Y.UNPACK_SKIP_PIXELS,Yn),R.pixelStorei(Y.UNPACK_SKIP_ROWS,pi),R.pixelStorei(Y.UNPACK_SKIP_IMAGES,Yi),Le===0&&V.generateMipmaps&&Y.generateMipmap(Ie),R.unbindTexture()},this.initRenderTarget=function(D){$.get(D).__webglFramebuffer===void 0&&te.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?te.setTextureCube(D,0):D.isData3DTexture?te.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?te.setTexture2DArray(D,0):te.setTexture2D(D,0),R.unbindTexture()},this.resetState=function(){H=0,K=0,ae=null,R.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const Zb=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function Jb(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:de(e,.55,.42),[l.LEAF2]:de(e+.02,.5,.55),[l.LEAF3]:de(e+.04,.6,.26),[l.BODY]:de(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:de(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:de(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const ln=2.5,Qb=[2.2,ln,.3],ol=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function jb(){const n=new qe({blend:.05}),e=[],t=(b,A)=>{const _=Math.sin(b*127.1+A*311.7)*43758.5453;return _-Math.floor(_)},i=b=>{const A=Math.sin(Math.atan2(b[2],b[0])*9+b[1]*2.3);return A>.75?l.BARKD:A<-.6?l.BARKL:A>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let b=0;b<7;b++){const A=b/7*Math.PI*2+.3,_=.45,S=1.05+t(b,1)*.45;n.chain([[Math.cos(A)*_,.45,-.2+Math.sin(A)*_,.2],[Math.cos(A)*(_+S)*.55,.16,-.2+Math.sin(A)*(_+S)*.55,.13],[Math.cos(A)*S,.02,-.2+Math.sin(A)*S,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const s=(b,A=1)=>n.chain(b,l.TRUNK,{group:A,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=b=>A=>{const _=t(Math.floor(A[0]*9),Math.floor(A[1]*9)+Math.floor(A[2]*9)*7);return A[1]<b[1]-.25||_<.18?l.LEAF3:_>.82?l.LEAF2:void 0};for(const[b,A]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(b,A,l.LEAF,{group:40,rough:.05,paint:r(b)});const a=[-.15,2.92,.15],o=P.norm([1,.07,0]),h=[1.25,.52,.58],c=b=>P.dot(P.sub(b,a),o),d=b=>P.dot(P.sub(b,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:b=>{const A=c(b),_=d(b),S=b[2]>a[2]+h[2]-.04;return S&&Math.hypot(A+.85,_-.02)<.15?Math.hypot(A+.85,_-.02)<.11?l.GLOW:l.FRAME:S&&A>.35&&A<.8&&_>-.42&&_<.38?_>.02&&_<.3&&A>.42&&A<.73?l.GLOW:Math.abs(A-.575)<.2&&_<-.38?l.FRAME:l.BODY2:S&&_>.06&&_<.32&&A>-.6&&A<.25?Math.abs(A+.17)<.02?l.BELLY:l.GLOW:A>h[0]-.05&&_>.05&&_<.35&&Math.abs(b[2]-a[2])<.45?l.MAGIC2:A>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(b[2]-a[2])-.38)<.08?l.FRAME:_>.02?l.BELLY:_<-.42?l.SHADES:void 0}}),e.push({at:P.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:P.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:P.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const b of[-.75,.75]){const A=P.add(P.add(a,P.mul(o,b)),[0,-.5,h[2]-.02]);n.ell(A,[.21,.21,.08],l.SHADES,{group:4,paint:_=>Math.hypot(_[0]-A[0],_[1]-A[1])<.1?l.FRAME:void 0})}n.seg(P.add(a,[1.05,.3,h[2]-.02]),P.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(P.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const f=P.add(a,[-.25,h[1]+.14,0]);n.box(f,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:b=>Math.floor((c(b)+2)*6)%2?l.BODY2:void 0}),n.box(P.add(f,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:P.norm([1,.14,0]),round:.04,group:6});for(const b of[-.18,.18])n.seg(P.add(a,[-1.33,-.45,b]),P.add(a,[-1.3,.62,b]),.02,.02,l.FRAME,{group:7});for(let b=0;b<5;b++)n.seg(P.add(a,[-1.33,-.32+b*.22,-.18]),P.add(a,[-1.33,-.32+b*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,m=1.45;n.seg(u,P.add(u,[0,m,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:b=>{const A=b[1]-u[1],_=Math.atan2(b[2]-u[2],b[0]-u[0]),S=Math.floor(A*6),C=Math.floor((_+Math.PI)*4+S%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&A>.75&&A<1.15?l.GLOW:A*6%1<.12||((_+Math.PI)*4+S%2*.5)%1<.1?l.STONED:t(S,C)<.15&&A<.5?l.MOSS:void 0}}),e.push({at:P.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let b=0;b<8;b++){const A=b/8*Math.PI*2;n.box(P.add(u,[Math.cos(A)*(p-.05),m+.1,Math.sin(A)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(A),0,Math.cos(A)],round:.02,group:9,rough:.008})}const M=P.add(u,[0,m+.1,0]),g=P.add(M,[.08,1.05,-.04]);n.seg(M,g,p-.1,.02,l.HAT1,{group:10,paint:b=>Math.floor((b[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(g,P.add(g,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(P.add(g,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:b=>b[1]>2.58?l.MOSS:void 0}),n.box(P.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(P.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const b of[-.9,.95]){const A=P.add(a,[b,-.55,0]);for(const _ of[-1,1])n.seg(P.add(A,[_*.04,-.08,h[2]+.03]),P.add(A,[_*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const x=[2.05,ln-.05,.3],v=[.85,.05,.62];n.box(x,v,l.WOOD,{round:.02,group:15,paint:b=>(b[2]-x[2]+2)*9%1<.12?l.BARKD:void 0});for(const[b,A]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([b,ln-.1,A],[b,ln-.7,A*.3],.04,.04,l.WOOD,{group:16});const y=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let b=0;b+1<y.length;b++){const[A,_]=[y[b],y[b+1]],S=Math.ceil(Math.hypot(_[0]-A[0],_[1]-A[1])/.32);n.seg([A[0],ln+.42,A[1]],[_[0],ln+.42,_[1]],.025,.025,l.WOOD,{group:17});for(let C=0;C<=S;C++){const T=C/S,L=A[0]+(_[0]-A[0])*T,O=A[1]+(_[1]-A[1])*T;n.seg([L,ln,O],[L,ln+.42,O],.02,.02,l.WOOD,{group:17})}}const w=Qb;n.box([w[0],w[1]+Qs-.02,w[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0}),n.box([w[0]-.2,w[1]+Qs+.22,w[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:b=>Math.floor((b[2]+2)*10)%2?l.BODY2:void 0});for(const[b,A]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([w[0]+b,w[1],w[2]+A],[w[0]-b*.6,w[1]+Qs-.03,w[2]-A*.2],.015,.015,l.FRAME,{group:19});for(const[b,A,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([b,ln,A],[b,ln+.2*_,A],.1*_,.13*_,l.EAR,{group:20}),n.ell([b,ln+.3*_,A],[.16*_,.14*_,.16*_],l.LEAF2,{group:21,rough:.02,paint:S=>t(Math.floor(S[0]*30),Math.floor(S[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:b=>Math.floor((b[2]+2)*5)%2?l.BODY2:void 0});for(const b of[.05,.95])n.seg([1.98,3.4,b],[1.98,ln,b],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const b of[.18,.48])n.seg([1.2,ln-.05,b],[1,.06,b+.12],.018,.018,l.STRAW,{group:25});for(let b=1;b<8;b++){const A=b/8,_=ln-.05-(ln-.11)*A,S=1.2-.2*A;n.seg([S,_,.18+.12*A],[S,_,.48+.12*A],.02,.02,l.WOOD,{group:25})}const E=(b,A,_,S,C)=>{for(let T=0;T<=S;T++){const L=T/S,O=P.lerp(b,A,L);O[1]-=Math.sin(L*Math.PI)*_,C(O,T)}};return E([-.55,3.95,.45],[1.95,3.42,1],.35,9,(b,A)=>{n.ell(b,[.035,.035,.035],ol[A%4],{group:26+A%2,extra:!0})}),E([-.75,4.7,.42],[1.6,3.65,1],.2,7,(b,A)=>{n.ell(b,[.03,.03,.03],ol[(A+2)%4],{group:28+A%2,extra:!0})}),E([2.88,ln+.45,.9],[2.88,ln+.45,-.3],.08,5,(b,A)=>{n.ell(b,[.03,.03,.03],ol[(A+1)%4],{group:30+A%2,extra:!0})}),E([-2,2.8,.1],[-.9,3.6,.5],.15,5,(b,A)=>{n.box(b,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][A%3],{dir:[1,0,.2],round:.005,group:32+A%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,ln+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[w[0],w[1],w[2]],door:P.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function e5(n={},{facing:e="towards",ppm:t=16}={}){const i=jb(),s=xn(i.m,{scale:pr(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let g=0;g<r.w;g++)r.m[M*r.w+g]&&(a=Math.min(a,g),o=Math.max(o,g),h=Math.min(h,M));const c=new pt(o-a+1,r.h-h);for(let M=0;M<c.h;M++)for(let g=0;g<c.w;g++){const x=(M+h)*r.w+g+a;r.m[x]&&c.put(g,M,r.m[x],r.n[x*3],r.n[x*3+1],r.n[x*3+2])}const d=M=>{const[g,x]=s.project(M);return[+(g-a).toFixed(1),+(x-h).toFixed(1)]},f=Math.round(d([0,i.splitY,0])[1]),u=new pt(c.w,c.h),p=new pt(c.w,c.h);for(let M=0;M<c.h;M++)for(let g=0;g<c.w;g++){const x=M*c.w+g,v=c.m[x];v&&(Zb.has(v)||M<f?u:p).put(g,M,v,c.n[x*3],c.n[x*3+1],c.n[x*3+2])}const m=M=>{const[g,x]=d(M);return{x:g,y:x}};return{whole:c,top:u,bot:p,crownY:f,anchors:{base:m([0,0,-.2]),seat:m(i.seat),door:m(i.door),lights:i.lights.map(M=>({...m(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const $t=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Lt=(n,e,t=0)=>$t(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Gt=(n=.2,e=.15)=>t=>{const i=Lt(t,16,3);return Lt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Xt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=$t(s,o)*6.283,c=t*Math.sqrt($t(o,s));n.ell([r+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+$t(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:d=>d[1]>.13?l.LEAF:void 0})}},La=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...P.add(e,P.add(P.mul(a,.25*i),[0,.2*i,0])),.025*i],[...P.add(e,P.add(P.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?l.LEAF:l.LEAF2,{group:t})}},oi=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[($t(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>Lt(a,30)<.3?l.LEAF2:void 0})},ro=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=Lt(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),et=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Gt(.35,.05)}),dr=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function bi(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(f,u,p,m)=>{const M=Math.cos(u),g=Math.sin(u),x=[...f];return x[p]=f[p]*M-f[m]*g,x[m]=f[p]*g+f[m]*M,x},o=f=>a(a(a(f,s,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-s,1,2),c=f=>P.add(o(f),r),d=f=>h(P.sub(f,r));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(o)),f.paint){const u=f.paint;f.paint=(p,m)=>u(d(p),m)}}function ll(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=Gt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?Lt(h,9)<.25?l.STONED:l.SHADES:Gt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,r?.22:.3,.1],l.BODY3,{group:e+1,paint:d=>Math.hypot(d[0]-h,d[1]-.3)<.12?l.FRAME:void 0});if(s)for(const h of[-.45,.45])dr(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const t5={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;ll(n,1),bi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),La(n,[.9,.2,.8],5),La(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){ll(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),ro(n,[.3,3.4,-.1],[1.1,.7,.9],5),oi(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Xt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;ll(n,1),bi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])La(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Au(n,1),ro(n,[.05,.65,0],[.32,.28,.26],3),bi(n,e,{roll:1.35,at:[0,.32,0]}),Xt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Au(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Xt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Or(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Or(n,[0,0,0],1),Or(n,[.5,0,.2],4);const e=n.parts.length;Or(n,[0,0,0],7),bi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Xt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Or(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,P.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(P.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>Lt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Lt(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&Lt(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])et(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Gt(.5,.1)(t)}),bi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Xt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>Lt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Lt(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:Lt(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Xt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){et(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Gt(.2,.1)(e)}}),Xt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Gt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Gt(.3,.3)}),oi(n,[.43,0,.3],[.4,1.9,.43],3,8),oi(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Xt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Gt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),oi(n,[0,0,.06],[.05,1.5,.06],3,10),Xt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Lt(t,6,5)<.25&&t[1]>.4?l.MOSS:Lt(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Xt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Gt(.25,.15)(e)}),La(n,[0,.4,.4],2,.55),Xt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;et(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])et(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),et(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Gt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),et(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(P.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(P.add(e,[.14,.07,0]),P.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Xt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Gt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Gt(.25,.15)});for(let e=0;e<7;e++)dr(n,[($t(e)-.5)*.4,.4+$t(e,2)*1,.2+$t(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);oi(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Au(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])et(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;et(n,P.lerp(t[0],t[1],s),P.lerp(t[4],t[5],s),e,.008),et(n,P.lerp(t[3],t[2],s),P.lerp(t[7],t[6],s),e,.008)}et(n,t[4],[-.45,.95,-.28],e,.015),et(n,t[7],[-.45,.95,.28],e,.015),et(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])et(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],l.BODY3,{group:e+1})}function Or(n,e,t,i=!1){n.box(P.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Gt(.15,.2)}),n.seg(P.add(e,[0,.05,0]),P.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&Lt(s,18)<.2?l.GLOW:Gt(.15,.1)(s)}),i&&dr(n,P.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const n5={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])et(n,[e,0,t],[e*.95,2.1,0],1,.045);et(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])et(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)dr(n,[-.42+($t(e)-.5)*.5,.6+$t(e,2)*.7,($t(e,3)-.5)*.3],.025,10+e);et(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),et(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),oi(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Xt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])et(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)et(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Gt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Gt(.35,.15)(e)});for(let e=0;e<10;e++){const t=$t(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+$t(e)*.5,Math.sin(t)*.3,.025],[.1+$t(e,4)*.6,.7+$t(e,5)*.4,($t(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+$t(e,7)*.6,.5+$t(e,8)*.4,($t(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>Lt(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),ro(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Gt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;et(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),et(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}bi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Xt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Gt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>Lt(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])et(n,[t,.03,-.12],[t,.03,.12],3,.02);bi(n,e,{pitch:.32,at:[0,.42,0]}),Xt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)et(n,t(i,s),t(i,s+1),1,.025),et(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)oi(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Xt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Gt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Gt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),et(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Xt(n,8,.8,6,19)}}},i5=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function s5(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>Lt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?Lt(a,18)<.5?l.LEAF2:l.STONED:s(a[0],a[2])?Lt(a,10,2)<.25?i:l.CLOTH:Lt(a,5,7)<.07?l.MOSS:void 0})}const si=(n,e,t=.045)=>Math.abs(n-e)<t,r5={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){s5(n,4.4+.5,2+.5,l.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(si(Math.abs(i),4.4)||si(Math.abs(s),2)||si(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(si(s,0)||si(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])et(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])et(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)et(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),bi(n,e,{roll:.25,pitch:-.1}),Xt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])et(n,[e,0,0],[e,1.7,0],1,.03);et(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Lt(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)oi(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)dr(n,[($t(e)-.5)*1.2,.06,($t(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Xt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Lt(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?Lt(t,6)<.15?l.MOSS:void 0:Lt(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:s=>Lt(s,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;et(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=P.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],l.FRAME,{dir:P.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?Lt(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});oi(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])et(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)$t(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Gt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),oi(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(si(Math.abs(s),5.2,.06)||si(Math.abs(r),3.3,.06)||si(s,0,.06)||si(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(si(Math.abs(s),5.2-1,.06)||si(Math.abs(r),1.6,.06)))?Lt(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((s+20)*.8)%2?Lt(i,6)<.25?l.LEAF2:l.LEAF:Lt(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Tu(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),ro(n,[.3,1.6,.2],[.35,.25,.3],6),Xt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Tu(n,1),bi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Xt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){et(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Gt(.2,0)}),Xt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])et(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;et(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),et(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Gt(.4,.1)(s)});dr(n,[0,4+.45,.22],.06,4,l.MAGIC2),oi(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;et(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Gt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;et(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,l.ACCENT)}bi(n,e,{pitch:-.2}),Xt(n,8,1,5,31)}}};function Tu(n,e){for(const t of[-1.4,1.4])et(n,[0,0,t],[0,1,t],e,.035,l.BELLY);et(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])et(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const a5={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function o5(n={},e=16){const t=s=>pr(n)*nf[s].size/e,i=s=>s.map(([r,a,o])=>({id:r,x:+(a*t(r)).toFixed(1),z:+(o*t(r)).toFixed(1)}));return{playground:i(i5),...Object.fromEntries(Object.entries(a5).map(([s,r])=>[s,i(r)]))}}const tf=[...Object.entries(t5).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(n5).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(r5).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],nf=Object.fromEntries(tf.map(n=>[n.id,n]));function l5(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.BODY]:[92,118,140],[l.BODY2]:[132,74,42],[l.BODY3]:[34,32,38],[l.FRAME]:[150,152,158],[l.SHADES]:[24,24,30],[l.STONE]:[72,72,80],[l.STONED]:[34,34,40],[l.CLOTH]:[214,210,196],[l.BELLY]:[222,218,206],[l.ACCENT]:[214,92,40],[l.HAT1]:[54,84,120],[l.HAT2]:[86,112,92],[l.MOSS]:de(.26,.45,.45),[l.TRUNK]:de(t,.45,.36),[l.BARK2]:[98,74,52],[l.BARKD]:de(t+.03,.5,.17),[l.LEAF]:de(e,.55,.45),[l.LEAF2]:de(e-.03,.5,.6),[l.LEAF3]:de(e+.03,.6,.28),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,170,80],[l.MAGIC]:de(n.magicHue??.2,.55,1),[l.MAGIC2]:de(n.magicHue??.2,.15,1),[l.LINE]:[24,22,30]}}function c5(n,e={},{ppm:t=16}={}){const i=nf[n];if(!i)throw new Error(`no relic "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=pr(e)*i.size,{sp:a,project:o}=xn(s,{scale:r});let h=0;for(const A of s.parts){if(A.extra||A.cut)continue;const _=A.type==="cone"?[[A.a,A.r1],[A.b,A.r2]]:[[A.c,A.r?Math.max(...A.r):Math.max(A.h[0],A.h[2])]];for(const[S,C]of _)S[1]-C<.3&&(h=Math.max(h,Math.hypot(S[0],S[2])+C))}let c=a.w,d=-1,f=a.h;for(let A=0;A<a.h;A++)for(let _=0;_<a.w;_++)a.m[A*a.w+_]&&(c=Math.min(c,_),d=Math.max(d,_),f=Math.min(f,A));const u=d-c+1,p=a.h-f,m=new pt(u,p),M=new pt(u,p),g=new pt(u,p),x=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-f);for(let A=0;A<p;A++)for(let _=0;_<u;_++){const S=(A+f)*a.w+_+c,C=a.m[S];if(!C)continue;const T=[a.n[S*3],a.n[S*3+1],a.n[S*3+2]];m.put(_,A,C,...T),(A<x?M:g).put(_,A,C,...T)}m.bodyH=a.bodyH;const v=r/t,[y,w]=o([0,0,0]),E=+(y-c).toFixed(1),b=+(w-f).toFixed(1);return{whole:m,top:M,bot:g,crownY:x,origin:{x:E,y:b},metres:{width:+(u/t).toFixed(1),height:+(p/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const Yt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},hi=(n,e,t=0)=>Yt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),dc=n=>{const e=hi(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},h5=n=>e=>{const t=hi(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},yn=(n,e=0)=>t=>{const i=hi(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&hi(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},vt=(n,e,t,i,s,r={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:yn(s,r.courses??5),...r}),Pn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...P.add(P.lerp(e,t,o),[(Yt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,l.LEAF,{group:i,rough:.02,paint:a=>hi(a,30)<.3?l.LEAF2:void 0})},Fi=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Yt(s,r)*6.283,o=t*Math.sqrt(Yt(r,s)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+Yt(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:d=>d[1]>.14?l.LEAF:void 0})}},vi=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:h5(e)}),Un=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:dc}),Dn=(n,e,t,i,s={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&hi(r,5,i)<.7?l.MOSS:hi(r,14)>.9?l.STONED:void 0}),Ru=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),u5={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])vt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];vt(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?l.RUNE:yn(e)(r)):yn(e)})}for(let t=0;t<4;t++)vt(n,[1.3+t*.3,.14,.4+Yt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Yt(t,2)-.5),Yt(t,3)-.5],courses:0});e&&(Pn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Fi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||vt(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;vt(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)vt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Pn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Pn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){vt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?l.STONED:yn(e,0)(s)}),vt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,l.STONE,{group:4,paint:yn(e,0)});vt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Pn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Fi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Yt(t,9)*(t%3===0?1.2:.45);vt(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Yt(t)-.5),Math.cos(i)],courses:0,round:.07})}vt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Fi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){vt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:yn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>hi(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])vt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)vt(n,[-1.2+t*.6,.12,.55+Yt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Yt(t,5)-.5]});e&&(Pn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Pn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;vt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)Ru(n,[(Yt(t)-.5)*.8,.8+Yt(t,2)*.7,(Yt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(Pn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Fi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){vt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:yn(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])vt(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)vt(n,[.5+Yt(t)*1.2,.13,-.3+Yt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Yt(t,5)-.5]});e&&(Pn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Pn(n,[.3,.1,.72],[.5,1.8,.72],5,13),vi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])vt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)vt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),vt(n,[-1.1,.55,0],[.15,.55,.62],4,e),vt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Fi(n,12,1.6,10,14),Pn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:yn(e,0)}),n.ell(s(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:yn(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],l.STONED,{group:1,cut:!0}),Ru(n,s(.12,r),.05,3+(r>0?1:0),l.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:yn(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?l.STONED:yn(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:yn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:yn(e,0)}),e&&(Fi(n,14,1.8,10,16),vi(n,P.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){vt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])vt(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(Pn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Fi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){vt(n,[-.9,.7,0],[.35,.7,.5],1,e),vt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];vt(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}vt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])vt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Pn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Fi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])vt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:yn(e,5)(i)):yn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:yn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)vt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Pn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Pn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Fi(n,12,1.6,10,23))}}},d5={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Dn(n,[(Yt(e)-.5)*.6,.04,(Yt(e,2)-.5)*.4],[.07+Yt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Dn(n,[-.15,.12,0],[.22,.15,.2],1),Dn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Dn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Dn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Dn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),vi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Dn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Dn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Dn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Dn(n,[-1.1,.3,.6],[.4,.35,.35],2),Dn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&hi(e,6)<.3?l.MOSS:hi(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Dn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Dn(n,[.35,.1,.25],[.15,.1,.14],2)}}},f5={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}Un(n,e,1),vi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Un(n,e,1),vi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Un(n,[[0,0,0,.3],[0,.9,0,.26]],1),Un(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Un(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),vi(n,[-1,2.7,0],[.6,.45,.5],4),vi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:dc(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),vi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Un(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:hi(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Un(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Un(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Yt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Yt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Un(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Un(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Un(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Dn(n,[e,i,t],[.3,.24,.26],3);vi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:dc})}Un(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Un(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])vi(n,[e,t,-.1],[.45,.3,.35],3)}}},sf=[...Object.entries(u5).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(d5).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(f5).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],p5=Object.fromEntries(sf.map(n=>[n.id,n]));function m5(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:s([128,126,134]),[l.STONED]:s([64,62,72]),[l.MOSS]:de(.26,.45,.45),[l.TRUNK]:de(i,.45,.36),[l.BARKD]:de(i+.03,.5,.17),[l.BARKL]:de(i,.35,.55),[l.LEAF]:de(t,.55,.45),[l.LEAF2]:de(t-.03,.5,.62),[l.LEAF3]:de(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:de(n.magicHue??.45,.6,1),[l.MAGIC2]:de(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function g5(n,e={},{variant:t=0,ppm:i=16}={}){const s=p5[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new qe({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=pr(e)*s.size,{sp:o,project:h}=xn(r,{scale:a});let c=0;for(const w of r.parts){if(w.extra)continue;const E=w.type==="cone"?[[w.a,w.r1],[w.b,w.r2]]:[[w.c,w.r?Math.max(...w.r):Math.max(w.h[0],w.h[2])]];for(const[b,A]of E)b[1]-A<.3&&(c=Math.max(c,Math.hypot(b[0],b[2])+A))}let d=o.w,f=-1,u=o.h;for(let w=0;w<o.h;w++)for(let E=0;E<o.w;E++)o.m[w*o.w+E]&&(d=Math.min(d,E),f=Math.max(f,E),u=Math.min(u,w));const p=f-d+1,m=o.h-u,M=new pt(p,m),g=new pt(p,m),x=new pt(p,m),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let w=0;w<m;w++)for(let E=0;E<p;E++){const b=(w+u)*o.w+E+d,A=o.m[b];if(!A)continue;const _=[o.n[b*3],o.n[b*3+1],o.n[b*3+2]];M.put(E,w,A,..._),(w<v?g:x).put(E,w,A,..._)}const y=a/i;return{whole:M,top:g,bot:x,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(m/i).toFixed(1),footprint:+(c*y).toFixed(1)}}}const mn=16,cn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},zi=[0,-.42,.9],nn=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,c=r-o,d=i?Math.round(i*t):0,f=m=>d?(m%d+d)%d:m,u=(m,M)=>cn(m,f(M)),p=m=>m*m*(3-2*m);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function Cu(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let c=9,d=9,f=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=a+p,M=o+u,g=(M%h+h)%h,x=m+cn(m,g*3+1),v=M+cn(m*7+2,g),y=Math.hypot(x-s,v-r);y<c?(d=c,c=y,f=cn(m,g)):y<d&&(d=y)}return{edge:d-c,id:f}}const fs=(n,e,t,i=.14)=>Math.abs(n)>1-i*nn(n>0?3:7,e,1.4,t)*1.6,Mo={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(fs(n,e,4,.3))return 0;const i=nn(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&nn(n*2,e,.9,4)>.68?[l.WATER,0]:[s?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(fs(n,e,4,.5))return 0;const i=nn(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(fs(n,e,4,.1))return 0;const i=Cu(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:nn(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(fs(n,e,4,.08))return 0;const i=Cu(n*2,e,2.2,4);return i.edge<.16?[nn(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(cn(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+nn(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(cn(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[nn(n,e,3,4)<.15?l.MOSS:r?l.BARKD:cn(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(fs(n,e,8,.06))return 0;const s=nn(n*4,e,1.1,8);return Math.abs(nn(n*6,e,.7,8)-.5)<.02||Math.abs(nn(n*3+9,e,1.6,8)-.5)<.012?[nn(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[s<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[l.BELLY,.05]:[s<.2?l.MOSS:s>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=nn(n*3,e,2.5,4),a=[0,.35,.6][i];if(fs(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[nn(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&nn(n,e,6,4)>a*.8?[cn(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:r<a?[r<a*.5?l.LEAF:l.LEAF2,.1]:[r>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(fs(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+nn(n,e,3,4)*.06?[Math.abs(r-.5)<.05?l.BARKL:l.TRUNK,.6]:[nn(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&nn(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function cl(n,e,t){const i=new pt(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],zi[0]+(a[1]?(cn(r,s)-.5)*a[1]:0),zi[1]+(a[1]?(cn(s,r)-.5)*a[1]*.5:0),zi[2])}return i}function x5(n,{variant:e=0}={}){const t=Mo[n],i=Math.round(t.width*mn),s=Math.round(t.period*mn);t.width/2;const r=(u,p,m)=>t.surface(u,p,m,e),a=cl(i,s,(u,p)=>r(u/i*2-1,p/mn)),o=Math.round(Math.max(1.5,t.width*.8)*mn),h=cl(i,o,(u,p)=>{const m=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(m));return Math.abs(M)>1||nn(u/mn,p/mn,2)>.25+m?0:r(M,p/mn)}),c=Math.round(t.width*2.4*mn),d=c/2,f=u=>cl(c,c,(p,m)=>{let M=null;for(const g of u){const x=Math.cos(g),v=Math.sin(g),y=(p-d)*x+(m-d)*v,w=-(p-d)*v+(m-d)*x;if(y<-t.width*mn*.5)continue;const E=w/(i/2);Math.abs(E)<=1&&(!M||Math.abs(E)<Math.abs(M.u))&&(M={u:E,v:(d-y)/mn})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-d,m-d)<i*.6):0});return{strip:a,end:h,y:f([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:f([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}function Lu(n,e,{variant:t=0,pad:i=2}={}){const s=Mo[n],r=s.width/2,a=Array.isArray(e[0][0])?e:[e],o=a.flat(),h=o.map(g=>g[0]),c=o.map(g=>g[1]),d=Math.min(...h)-r-i,f=Math.min(...c)-r-i,u=Math.ceil((Math.max(...h)+r+i-d)*mn),p=Math.ceil((Math.max(...c)+r+i-f)*mn),m=[];for(const g of a){let x=0;for(let v=0;v+1<g.length;v++){const y=g[v],w=g[v+1],E=Math.hypot(w[0]-y[0],w[1]-y[1]);m.push({a:y,b:w,l:E,s:x,first:v===0,last:v+2===g.length}),x+=E}}const M=new pt(u,p);for(let g=0;g<p;g++)for(let x=0;x<u;x++){const v=d+(x+.5)/mn,y=f+(g+.5)/mn;let w=null;for(const b of m){const A=b.b[0]-b.a[0],_=b.b[1]-b.a[1],S=((v-b.a[0])*A+(y-b.a[1])*_)/(b.l*b.l);if(S<0&&b.first||S>1&&b.last)continue;const C=Math.max(0,Math.min(1,S)),T=b.a[0]+A*C,L=b.a[1]+_*C,O=Math.hypot(v-T,y-L);O<=r&&(!w||O<w.d)&&(w={d:O,u:((v-T)*-_+(y-L)*A)/b.l/r,v:b.s+C*b.l})}if(!w)continue;const E=s.surface(w.u,(w.v%s.period+s.period)%s.period,!1,t);E&&M.px(x,g,E[0],zi[0],zi[1],zi[2])}return{sp:M,origin:[-d*mn,-f*mn]}}function M5({variant:n=0,length:e=16,radius:t=30}={}){const i=[[0,0],[e,0]],s=[];for(let f=0;f<=12;f++){const u=f/12*(e/t);s.push([Math.sin(u)*t,(1-Math.cos(u))*t])}const r=Lu("railway",i,{variant:n,pad:0}),a=Lu("railway",s,{variant:n,pad:0}),o=Math.max(r.sp.w,a.sp.w+Math.round(a.origin[0]-r.origin[0])),h=Math.max(r.origin[1],a.origin[1]),c=Math.max(r.sp.h-r.origin[1],a.sp.h-a.origin[1])+h,d=new pt(o,Math.ceil(c));for(const f of[a,r])for(let u=0;u<f.sp.h;u++)for(let p=0;p<f.sp.w;p++){const m=f.sp.m[u*f.sp.w+p];if(!m)continue;const M=p+Math.round(r.origin[0]-f.origin[0]),g=u+Math.round(h-f.origin[1]);d.inb(M,g)&&!(d.m[g*o+M]===l.FRAME&&m!==l.FRAME)&&d.px(M,g,m,zi[0],zi[1],zi[2])}return d}const pn=(n,e,t=0)=>cn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Mi=(n=.25,e=.15)=>t=>{const i=pn(t,16,3);return pn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},xi=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Mi(.4,.05)}),Pu=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&pn(s,5,i)<.6?l.MOSS:pn(s,14)>.9?l.STONED:void 0}),ps=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=cn(s,r)*6.283,o=t*Math.sqrt(cn(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+cn(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},hl=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=pn(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),Pa=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(cn(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>pn(a,30)<.3?l.LEAF2:void 0})};function Du(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(d,f,u,p)=>{const m=Math.cos(f),M=Math.sin(f),g=[...d];return g[u]=d[u]*m-d[p]*M,g[p]=d[u]*M+d[p]*m,g},a=d=>r(r(d,i,1,2),t,0,1),o=d=>r(r(d,-t,0,1),-i,1,2),h=d=>P.add(a(d),s),c=d=>o(P.sub(d,s));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(a)),d.paint){const f=d.paint;d.paint=(u,p)=>f(c(u),p)}}const v5={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:Mi(.1,.2)(t)}),Du(n,e,{roll:.15,pitch:.1}),ps(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Pu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),hl(n,[0,.95,0],[.22,.18,.2],2),ps(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(cn(e)-.5)*.3,0,(cn(e,2)-.5)*.2],i=.08+cn(e,3)*.1;n.seg(t,P.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(P.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){xi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:Mi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),Pa(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&pn(t,6,e)<.35?l.MOSS:pn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])Pu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>pn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>pn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>pn(t,12)<.12?l.BARKD:t[1]>.55&&pn(t,5)<.3?l.MOSS:void 0});hl(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:s=>pn(s,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:Mi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?l.FRAME:void 0});Du(n,e,{roll:1.4,at:[0,.3,.3]}),ps(n,14,2.2,4,5),Pa(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?pn(e,9)<.2?l.SHADES:l.GLOW:Mi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>pn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),hl(n,[.7,3.1,-.1],[1,.6,.8],5),ps(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&pn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});xi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),Pa(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),ps(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:Mi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Mi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Mi(.3,.15)(e)}),xi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});ps(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])xi(n,[-.2,0,e],[0,.75,e],1,.05),xi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:Mi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:Mi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>pn(t,9)<.3?l.MOSS:void 0});ps(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])xi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;xi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),xi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])xi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])xi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});Pa(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},rf=Object.entries(v5).map(([n,e])=>({id:n,...e})),_5=Object.fromEntries(rf.map(n=>[n.id,n]));function af(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:de(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:de(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:de(t,.35,.55),[l.TRUNK]:de(t,.45,.36),[l.LEAF]:de(e,.55,.45),[l.LEAF2]:de(e-.03,.5,.6),[l.LEAF3]:de(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:de(n.magicHue??.5,.55,1),[l.MAGIC2]:de(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function b5(n,e={},t=16){const i=_5[n];if(!i)throw new Error(`no path piece "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=pr(e)*1.1,a=xn(s,{scale:r}),o=a.sp;let h=o.w,c=-1,d=o.h;for(let m=0;m<o.h;m++)for(let M=0;M<o.w;M++)o.m[m*o.w+M]&&(h=Math.min(h,M),c=Math.max(c,M),d=Math.min(d,m));const f=new pt(c-h+1,o.h-d);for(let m=0;m<f.h;m++)for(let M=0;M<f.w;M++){const g=(m+d)*o.w+M+h;o.m[g]&&f.put(M,m,o.m[g],o.n[g*3],o.n[g*3+1],o.n[g*3+2])}const[u,p]=a.project([0,0,0]);return{sp:f,origin:{x:+(u-h).toFixed(1),y:+(p-d).toFixed(1)},metres:{width:+(f.w/t).toFixed(1),height:+(f.h/t).toFixed(1)}}}function y5(){const n={};for(const[e,t]of Object.entries(Mo))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const ao=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],w5={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function S5(n=0){const[e,t,i]=w5[ao[n%ao.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function Iu(n,e,t,i){const s=ao[n%ao.length],r=new qe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&ft(_,e,31)<.5;let c=0,d=1,f=.3,u=0,p=n*7;const m=(_,S,C,T)=>L=>{if(T&&Math.abs(Math.sin(L[0]*37+L[1]*23+Math.sin(L[2]*17)*2))<.07)return l.STONED;if(L[1]>_-.02&&(L[2]>S-.06||ft(Math.floor(L[0]*30),Math.floor(L[2]*30),C)<.2)&&ft(Math.floor(L[0]*40),Math.floor(L[2]*40),C+1)<.6)return l.MOSS},M=(_,S,C,T,L,O)=>{const I=h(O),k=1+o*.08;r.ell([_,S,C],[T*1.18,T*1.18,.06],l.STONED,{group:L,cut:!0}),r.ell([_,S,C-.02],[T*k,T*k,.035+o*.025],l.CRYSTAL,{group:900+O,paint:H=>{const K=Math.hypot(H[0]-_,H[1]-S)/(T*k);return I?K<.3?l.GLOW:l.CRYSTAL:K<.2+o*.15?l.MAGIC2:K<.5?l.GLOW:K<.78?l.CRYSTAL:l.GLOW}})},g=(_,S,C,T,L,O,I,k)=>H=>{if(H[0]>_+T-.022){const K=Math.min(C,L)*1.5,ae=(O-L-H[2])/K+.5,q=(S-H[1])/K+.5;if(ae>=0&&ae<=1&&q>=0&&q<=1&&(i?id(i,ae,q,.065):Vu(ae,q,I,.12)))return a&&ft(I,e,5)<.5?l.STONED:l.RUNE}return k(H)},x=s.tiers,v=x[0][1]*x[0][2][0]+.02,y=.08,w=x[0][2][2];r.box([0,y,f-w],[v,y,w],l.STONE,{group:d,round:.03,rough:.006,paint:m(y*2,f,3,a)}),r.box([0,y*.9,f],[v-.06,y*.45,.12],l.STONED,{group:d,cut:!0,paint:_=>_[2]<f-.07?l.GLOW:void 0});for(let _=1;_<x[0][1];_++)r.box([-v+_*v*2/x[0][1],y*.9,f-.06],[.015,y*.45,.06],l.STONE,{group:d});c=y*2,d++;const E=[];x.forEach(([_,S,[C,T,L]],O)=>{const I=_==="tweet"?.09:0,k=S*C*2+(S-1)*(_==="tweet"?.14:.01),H=f-O*.035,K=c+I+T;for(let ae=0;ae<S;ae++){const q=-k/2+C+ae*(C*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&ae===S-1){E.push([q,C,T,L]);continue}const ie=a&&_==="tweet"?[1,.12*(ae%2?1:-1),0]:void 0,F=a&&_==="tweet"?K-.04:K,ee=m(F+T,H-L+L,d,a),se=ae===S-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([q,F,H-L],[C-.005,T,L],l.STONE,{group:d,round:.035,rough:.004,dir:ie,paint:se?g(q,F,T,C-.005,L,H,p++,ee):ee}),_==="bass"&&M(q,K+.02,H,Math.min(C,T)*.72,d,u++),_==="mid"&&(r.ell([q,K,H],[C*.8,T*.7,L*.9],l.STONED,{group:d,cut:!0,paint:ue=>ue[2]<H-L*.45?h(u)?l.STONED:l.GLOW:void 0}),r.box([q,K,H-L*.5],[.018,T*.6,L*.45],l.STONE,{group:d}),u++),_==="horn"){const ue=K+T*.25;r.seg([q,ue,H-L*1.5],[q,ue,H+.03],.03,Math.min(C,T)*.78,l.STONED,{group:d,cut:!0,paint:xe=>xe[2]<H-L*.55?h(u)?l.STONED:l.GLOW:void 0}),M(q,K-T*.6,H,T*.22,d,u++)}if(_==="tweet")for(const ue of[-.5,0,.5])M(q+ue*C*1.15,F,H,T*.55,d,u++);d++}if(_!=="tweet"){const ae=a&&_==="horn"?C:0;r.box([-ae,c+T*2+.012,H-.015],[k/2+.01-ae,.012,.015],l.WOOD,{group:d++,round:.008}),c+=.024}_==="tweet"&&!a&&r.flat([0,c+I/2,H-L],[1,0,0],[0,1,0],k/2,I/2,(ae,q)=>Math.abs(q)<.45&&Math.sin(ae*23)>-.4?l.GLOW:null,{group:d++,bend:0}),c+=T*2+I});const b=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,S,C,T],L)=>{if(a&&L%2){r.seg([_,.03,S],[_+.12,.05,S+.04],.04,.02,l.CRYSTAL,{group:700+L});return}const O=[_+T*C,C,S+.05];r.seg([_,0,S],O,.045+C*.05,.006,l.CRYSTAL,{group:700+L,paint:I=>I[1]>C*(.65-o*.1)&&!a?l.GLOW:void 0}),r.seg([_+.04,0,S-.03],[_+.04+T*C*.5,C*.55,S],.03,.005,l.CRYSTAL,{group:720+L})}),!a)for(const[_,S,C,T]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,b+S-.1,C],[T,T*.8,T],l.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,S,C,T]of E)r.box([_+.45,S*.75,f+.25],[S,C,T],l.STONE,{group:d++,dir:[.6,.8,.2],round:.035,rough:.007,paint:m(1,0,9,!0)});return{m:r,top:b}}function E5(n){const e=new qe({blend:.02}),t=(i,s)=>ft(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:d=>Math.abs(Math.sin(d[0]*41+d[1]*29))<.08?l.STONED:d[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function Ou(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(ft(s,t,1)*n.w),a=Math.floor(ft(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const A5=n=>mc(n)*3,ul=new Map;function T5(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=A5(n),a=e+":"+r;ul.has(a)||ul.set(a,xn(Iu(e,0,"playing").m,{height:r}).s);const o=ul.get(a);if(i==="destroyed")return Ou(xn(E5(e),{scale:o}).sp,3,e*5+1);const{sp:h}=xn(Iu(e,t,i,s).m,{scale:o});return Ou(h,i==="damaged"?4:10+t*2,e*5+t)}const R5=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function C5(){const n={};return R5.forEach(e=>n[e.k]=e.v),n}function L5(n,e,t,i,s){const r=yc(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*pe(i,.9,1.1)),h=uo(i,a,r);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=de(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:rd(o),colours:h}}function P5(n,e,t,i,s){const r=Ft[t].id,a=gr.find(g=>g.id===r),o=dp(r,n,{K:i,makeCanvas:s}),h=[],c=g=>h.push(g)-1,d={big:[],bigWeight:[],small:[],walls:[],set:null},f=(g,x)=>gn(g,x,n,"none",s),u=(g,x)=>{const{parts:v,colours:y}=L5(a,g,n,Ai(e*13+t*101+x*7+1),i);return{bot:c(f(v.bot,y)),top:c(f(v.top,y))}},p=mp(r,n,{K:i,makeCanvas:s}),m=Ft[t].layout.heightMix,M=g=>p.filter(x=>x.heightClass===g).length||1;for(const g of p)d.big.push({bot:c(g.bot),top:c(g.top)}),d.bigWeight.push(m?m[g.heightClass]/M(g.heightClass):g.weight);a.big.forEach(([g],x)=>{g==="tree"&&p.length||(d.big.push({bot:c(o.big[x].sp),top:null}),d.bigWeight.push(p.length?.1:1))}),a.small.forEach(([g,x],v)=>d.small.push(g==="tree"?u(x,500+v):{bot:c(o.small[v].sp),top:null}));for(const g of o.walls)d.walls.push(c(g.sp));return o.setPiece&&(d.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:d,floor:o.floor.sp}}function Nu(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(gn(S0(e,a,o,n,r,i),b0(e,n,i),n,n.cOutline,t));return s}const D5=(n,e,t=!1)=>(t?8:0)+n*2+e;function oo(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function xs(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),c=new Uint8Array(o*h*4),d=new Uint8Array(o*h*4),f=n.map((u,p)=>{const m=i[p],M=oo(u.A,u.w,u.h),g=oo(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const y=v*u.w*4,w=((m.y+v)*o+m.x)*4;c.set(M.subarray(y,y+u.w*4),w),d.set(g.subarray(y,y+u.w*4),w)}let x=0;e:for(let v=u.h-1;v>=0;v--,x++)for(let y=0;y<u.w;y++)if(M[(v*u.w+y)*4+3]>=128)break e;return{uv:[m.x/o,m.y/h,(m.x+u.w)/o,(m.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(x,u.h)}});return{albedo:c,normal:d,width:o,height:h,frames:f}}function I5(n,e){const t=[],i=[],s=l5(n);for(const r of tf){const a=c5(r.id,n);i.push({id:r.id,family:r.family,decal:!!r.decal,frame:t.push(gn(a.whole,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:o5(n)}}function O5(n,e){const t=[],i=[],s=af(n);for(const r of rf){const a=b5(r.id,n);i.push({id:r.id,frame:t.push(gn(a.sp,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,pieces:i}}function N5(n,e){const t=[],i=[],s=m5(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of sf)for(let o=0;o<a.variants;o++){const h=g5(a.id,n,{variant:o}),c=h.crownY>0&&!r(h.top),d=t.push(gn(c?h.bot:h.whole,s,n,"none",e))-1,f=c?t.push(gn(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:d,top:f,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function F5(n,e){if(n.kind==="creature")return{px:xs(Nu(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:r,relics:a,layouts:o}=I5(n.style,e);return{px:xs(r,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:r,pieces:a}=O5(n.style,e);return{px:xs(r,2048),pieces:a}}if(n.kind==="decor"){const{sprites:r,decor:a}=N5(n.style,e);return{px:xs(r,2048),decor:a}}if(n.kind==="party")return{px:xs(Nu(n.style,n.species,e,{..._0(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=P5(n.style,n.seed,n.id,n.K,e);return{px:xs(t),layout:i,floor:{albedo:new Uint8Array(oo(s.A,s.w,s.h)),normal:new Uint8Array(oo(s.N,s.w,s.h)),w:s.w,h:s.h}}}function Fu(n,e,t){const i=new ys(n,e,t,Hn,Bn);return i.magFilter=Wt,i.minFilter=Wt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=zn,i.needsUpdate=!0,i}function of(n){return{albedo:Fu(n.albedo,n.width,n.height),normal:Fu(n.normal,n.width,n.height),frames:n.frames}}const Zs=(n,e=2048)=>of(xs(n,e)),U5="6563f32dea8c",k5="witch-art",Xr="sets";let Da=null;function lf(){return Da||(Da=new Promise(n=>{try{if(typeof indexedDB>"u")return n(null);const e=indexedDB.open(k5,1);e.onupgradeneeded=()=>{try{e.result.createObjectStore(Xr)}catch{}},e.onsuccess=()=>n(e.result),e.onerror=()=>n(null),e.onblocked=()=>n(null)}catch{n(null)}}),Da)}async function B5(n){try{const e=await lf();return e?await new Promise(t=>{try{const i=e.transaction(Xr,"readonly").objectStore(Xr).get(n);i.onsuccess=()=>t(i.result??null),i.onerror=()=>t(null)}catch{t(null)}}):null}catch{return null}}function z5(n,e){lf().then(t=>{if(t)try{const i=t.transaction(Xr,"readwrite");i.onerror=s=>s.preventDefault(),i.objectStore(Xr).put(e,n)}catch{}}).catch(()=>{})}function H5(n){let e=2166136261;for(let t=0;t<n.length;t++)e=Math.imul(e^n.charCodeAt(t),16777619);return(e>>>0).toString(36)}class G5{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i,this.styleHash=H5(JSON.stringify(e));const s=Bf(e),r=u=>gn(Yf(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(m=>r({pose:u,frame:m,facing:p}))))),o=qu;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,m={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let g=0;g<p;g++)m[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFoot[u]=m}for(const[u,p]of[["fast",3],["brake",2]]){const m={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let g=0;g<p;g++)m[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFly[u]=m}this.witch=Zs(a,2048),this.stones=Zs([0,1,2,3].map(u=>this.stone(u)));const h=_p(e);this.props=Zs([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(gn(T5(e,{variant:u,frame:p,state:"playing"}),S5(u),e,e.cOutline));this.soundsystems=Zs(c,2048);const d=e5(e),f=Jb(e);for(const u of[d.bot,d.top])for(let p=Math.max(0,Math.floor(d.anchors.base.y-14));p<u.h;p++)for(let m=0;m<u.w;m++)u.m[p*u.w+m]===l.NOSE&&(u.m[p*u.w+m]=0);if(this.treehouse={atlas:Zs([d.bot,d.top].map(u=>gn(u,f,e,"none")),2048),...d.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(6,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const m=new Worker(new URL(""+new URL("artWorker-C5O5mM1i.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:m,busy:!1};m.onmessage=g=>{M.busy=!1,M.job=void 0,this.receive(g.data),this.dispatch()},m.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;timings=[];get done(){return this.timings.length}styleHash;onFloor=()=>{};stone(e){const t=Ai(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new pt(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,l.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),gn(r,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;cacheKey=e=>e.kind==="party"?null:[U5,this.styleHash,this.key(e),e.kind==="type"?`${e.seed}|${e.K}`:""].join("|");ask(e,t=!1){const i=this.key(e);if(this.inFlight.has(i)){const a=t?this.queue.findIndex(o=>this.key(o)===i):-1;a>0&&this.queue.unshift(...this.queue.splice(a,1));return}this.inFlight.add(i);const s=this.cacheKey(e),r=()=>{t?this.queue.unshift(e):this.queue.push(e),this.dispatch()};if(!s){r();return}B5(s).then(a=>{a&&a.px?this.receive({job:e,result:a,ms:0,cached:!0}):r()},r)}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}if(!e.cached){const i=this.cacheKey(e.job);i&&z5(i,e.result)}const t=of(e.result.px);if(this.timings.push({set:this.key(e.job),ms:e.ms??0,at:performance.now(),cached:!!e.cached}),e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(s=>[s.id,s])),modern:i.filter(s=>s.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:D5});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K},!0),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K})}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift(),r=performance.now(),a=F5(s,(o,h)=>{const c=document.createElement("canvas");return c.width=o,c.height=h,c});this.receive({job:s,result:a,ms:performance.now()-r}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const sr=24,at={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowPower:{value:1.4},uHazeCentre:{value:new $e},uHazeRange:{value:new $e(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:sr},()=>new ot)},uLightCol:{value:Array.from({length:sr},()=>new ot)},uLightCount:{value:0},uDisco:{value:new ot},uDiscoParams:{value:new ot},uDiscoColour:{value:new W(1,1,1)},uScenery:{value:new $e(1e6,1)}};function W5(n,e,t,i=1,s=2.5){const r=(a,o)=>new W(a[0]/255*o,a[1]/255*o,a[2]/255*o);at.uAmb.value.copy(r(de(n.ambientHue,.55,1),n.ambient*i)),at.uMoon.value.copy(r(de(n.moonHue,.35,1),n.moon)),at.uMoonBeam.value.copy(r(de(n.moonHue,.35,1),n.shafts*.25)),at.uBands.value=n.bands,at.uDither.value=n.dither*.5,at.uShafts.value=n.shafts,at.uShaftScale.value=t*2,at.uGlowRgb.value.copy(r(de(n.glowHue,n.glowSat,1),1)),at.uGlowR.value=e,at.uGlowFalloff.value=s,at.uGlowPower.value=n.glowPower,at.uHazeColour.value.copy(r(de(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const di=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${sr}], uLightCol[${sr}];
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
  for (int i = 0; i < ${sr}; i++) {
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
`,ji=2,fn=32,Ms=8,V5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Y5=`
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
    vec2 cell = vec2(mod(float(t), ${Ms}.0), floor(float(t) / ${Ms}.0));
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
`;class X5{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*ji/fn)*fn,c=Math.ceil(o*ji/fn)*fn;this.tilesX=h/fn,this.tilesZ=c/fn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const d=m=>(m.magFilter=m.minFilter=Wt,m.generateMipmaps=!1,m.colorSpace=zn,m.needsUpdate=!0,m);this.texture=d(new ys(new Uint8Array(h*c*4),h,c)),d(this.tile),this.floors=d(new ys(new Uint8Array(64*Ms*48*4*4),64*Ms,192));const f=Array.from({length:32},(m,M)=>new W(...Ft[M]?.floor??[.25,.45,.4])),u=new Mt({vertexShader:V5,fragmentShader:Y5,uniforms:{...at,uAreas:{value:this.texture},uExtent:{value:new ot(r.minX,r.minZ,h/ji,c/ji)},uPixel:{value:s},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(m,M)=>{const g=Ft[M]?.layout.terrain??[];return new W(+g.includes("mounds"),+g.includes("hollows"),+g.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new $e(64,48)},uFloorsSize:{value:new $e(64*Ms,192)},uSat:{value:i.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ot},uCircle:{value:new ot},uSweeps:{value:Array.from({length:4},()=>new ot)},uSweepCount:{value:0},uClearing:{value:new $e(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Vn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new zt(p,u),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new ys(new Uint8Array(fn*fn*4),fn,fn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new ys(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new $e(t%Ms*i.w,Math.floor(t/Ms)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=fn/ji,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),d=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(s-a.minZ)/o,m=[];for(let x=d;x<=f;x++)for(let v=h;v<=c;v++)this.filled[x*this.tilesX+v]||m.push([v,x,(v+.5-u)**2+(x+.5-p)**2]);m.sort((x,v)=>x[2]-v[2]);const M=performance.now();let g=0;for(const[x,v]of m){if(g>0&&performance.now()-M>r)break;this.fillTile(e,x,v),g++}return m.length-g}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=fn/ji,o=s.minX+t*a,h=s.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(d=>d.kind==="pond");for(let d=0;d<fn;d++)for(let f=0;f<fn;f++){const u=o+(f+.5)/ji,p=h+(d+.5)/ji,m=this.map.areaAt(u,p),M=(d*fn+f)*4;let g=0;for(const x of c)Math.hypot(u-x.x,p-x.z)<3*x.size&&(g=255);r[M]=m.type,r[M+1]=Math.round(m.openness*255),r[M+2]=g,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new $e(t*fn,i*fn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const dl=Mo,K5=new Set(["tarmac","railway","stairs","bridges"]),fl=`
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,Uu=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${di}
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
`,q5=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${di}
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
`;class $5{group=new bs;constructor(e,t,i){const s=e.paths,r=e.seed,a=y5(),o=new Map,h=(f,u)=>{const p=e.areaAt(f,u),m=p.cell.join(",");let M=o.get(m);if(!M){const g=(a[Ft[p.type].id]??[]).filter(x=>!K5.has(x)&&dl[x]&&(x!=="magic"||Pe(p.cell[0],p.cell[1],r+831)<.15));M=g.length?g[Math.floor(Pe(p.cell[0],p.cell[1],r+833)*g.length)]:"dirt",o.set(m,M)}return M},c=new Map;s.lines.forEach((f,u)=>{const p=f.kind==="rail"?Math.floor(Pe(u,1,r+835)*3):0,m=f.pts,M=m.length,g=[0];for(let y=1;y<M;y++)g.push(g[y-1]+Math.hypot(m[y][0]-m[y-1][0],m[y][1]-m[y-1][1]));const x=m.map((y,w)=>{const E=m[Math.max(0,w-1)],b=m[Math.min(M-1,w+1)],A=b[0]-E[0],_=b[1]-E[1],S=Math.hypot(A,_)||1;return[-_/S,A/S]}),v=g[M-1];for(let y=0;y<M-1;y++){const w=(m[y][0]+m[y+1][0])/2,E=(m[y][1]+m[y+1][1])/2;if(f.kind==="rail"&&s.railBroken(w,E)||e.hardClear(w,E))continue;const b=f.kind==="stream"?{width:f.half*2,period:4}:null,A=f.kind==="stream"?"stream":f.kind==="rail"?"railway":f.kind==="road"?"tarmac":h(w,E),_=b??dl[A],S=A+":"+p;let C=c.get(S);C||c.set(S,C={pos:[],uv:[]});const T=O=>_.width/2*(f.deadEnd?Math.min(1,(v-g[O])/6):1),L=(O,I)=>{const k=T(O)*I;C.pos.push(m[O][0]+x[O][0]*k,.02,m[O][1]+x[O][1]*k),C.uv.push(I>0?1:0,g[O]/_.period)};L(y,-1),L(y,1),L(y+1,1),L(y,-1),L(y+1,1),L(y+1,-1)}});const d=af(t);for(const f of s.junctions){const u=M5({variant:Math.floor(Pe(f.line,1,r+835)*3)}),p=mn,m=u.w/p,M=u.h/p,g=dl.railway.width/2,x=f.side>0?-f.dz:f.dz,v=f.side>0?f.dx:-f.dx,y=(S,C)=>[f.x+f.dx*(S-g)+x*(C-g),.03,f.z+f.dz*(S-g)+v*(C-g)],w=[y(0,0),y(m,0),y(m,M),y(0,0),y(m,M),y(0,M)].flat(),E=[0,0,1,0,1,1,0,0,1,1,0,1],b=new cc(gn(u,d,t,"none").A);b.magFilter=b.minFilter=Wt,b.generateMipmaps=!1,b.flipY=!1,b.colorSpace=zn;const A=new qt;A.setAttribute("position",new bt(w,3)),A.setAttribute("uvw",new bt(E,2));const _=new zt(A,new Mt({vertexShader:fl,fragmentShader:Uu,transparent:!0,depthWrite:!1,side:ri,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6,uniforms:{...at,uStrip:{value:b},uPixel:{value:i}}}));_.renderOrder=.55,this.group.add(_)}for(const[f,u]of c){const[p,m]=f.split(":"),M=new qt;if(M.setAttribute("position",new bt(u.pos,3)),M.setAttribute("uvw",new bt(u.uv,2)),p==="stream"){const E=new Mt({vertexShader:fl,fragmentShader:q5,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...at,uPixel:{value:i}}}),b=new zt(M,E);b.frustumCulled=!1,b.renderOrder=.4,this.group.add(b);continue}const g=x5(p,{variant:+m}).strip,x=gn(g,d,t,"none"),v=new cc(x.A);v.magFilter=v.minFilter=Wt,v.generateMipmaps=!1,v.flipY=!1,v.wrapT=Za,v.colorSpace=zn;const y=new Mt({vertexShader:fl,fragmentShader:Uu,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...at,uStrip:{value:v},uPixel:{value:i}}}),w=new zt(M,y);w.frustumCulled=!1,w.renderOrder=.5,this.group.add(w)}}}const Z5="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",J5=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,Q5=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,j5=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,ey=`
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
}`;function ms(n,e,t,i=!1){const s=new Qn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=zn,s}class ty{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ms(1,1,Kt,!0),this.scene.depthTexture=new hr(1,1),this.fx.texture.format=Hn;const i=(s,r)=>new Mt({vertexShader:Z5,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(J5,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(Q5,{uSrc:{value:null},uStep:{value:new $e}}),composite:i(j5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new $e},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(ey,{uSrc:{value:null},uTexel:{value:new $e},uDir:{value:new $e},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new zt(new Vn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ms(1,1,Kt);bloomB=ms(1,1,Kt);a=ms(1,1,Kt);b=ms(1,1,Kt);fx=ms(1,1,Kt);fxB=ms(1,1,Kt);fxScene=null;quad;cam=new Vc(-1,1,1,-1,0,1);mats;low=new $e(1,1);out=new $e(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,m=>{m.uScene.value=this.scene.texture,m.uThreshold.value=s.bloom.threshold});for(let m=0;m<2;m++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new st),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const m=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,g=>{g.uSrc.value=this.fx.texture,g.uStep.value.set(.6/m,0)}),this.pass("blur",this.fx,g=>{g.uSrc.value=this.fxB.texture,g.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,d=this.fullResolution?this.out.y/this.low.y:1,f=u=>{u.uTexel.value.set(1/h,1/c),u.uStrength.value=s.tiltShift.strength*d,u.uBand.value=s.tiltShift.band,u.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const ny=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,iy=`
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
}`,sy=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,ry=`
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
}`,ay=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class oy{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...de(r.circleHue2,.4,1).map(g=>g/255));this.ballMat=new Mt({vertexShader:ny,fragmentShader:iy,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:at.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new zt(new Vn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new zt(new Vn(s,h).translate(0,h/2,0),new Mt({fragmentShader:sy,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=r.motes,d=[],f=[];for(let g=0;g<c.count;g++){const x=w=>{const E=Math.sin(g*12.9898+w*78.233)*43758.5453;return E-Math.floor(E)},v=x(1)*Math.PI*2,y=Math.sqrt(x(2))*a.radius*c.column;d.push(a.x+Math.cos(v)*y,.3,a.z+Math.sin(v)*y),f.push(x(3),c.speed*(.6+x(4)*.8),.4+x(5)*1.2,0)}const u=new qt;u.setAttribute("position",new bt(d,3)),u.setAttribute("aMote",new bt(f,4));const p=de(r.circleHue,.55,1);this.motes=new Yr(u,new Mt({vertexShader:ry,fragmentShader:ay,uniforms:{uTime:at.uTime,uRise:{value:c.rise},uTint:{value:new W(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Hi})),this.motes.frustumCulled=!1;const m=de(r.circleHue,.7,1);this.lightRgb=new W(m[0]/255,m[1]/255,m[2]/255);const M=at;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),at.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const ly=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class cy{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],c=[],d=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;d.push({...f.soundsystem,at:f.at,from:u})}for(const f of d){const u=r.transition>0?Math.min(1,(t-f.at)/r.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],m=p.h*this.metresPerPixel,M=sn((u-.55)/.45);if(u<1&&f.from){const x=(f.from.x+f.x)/2,v=(f.from.z+f.z)/2,y=Math.hypot(f.x-x,f.z-v)*1.6;h.push({x,z:v,radius:u*y,strength:1-sn((u-.8)/.2)})}if(M>0&&i(f.x,f.z,p.w*this.metresPerPixel,m)){const x=Pe(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-M)*m,z:f.z,frame:p,flip:x,fresh:s(f.x,f.z,m)})}u>=1&&c.push({x:f.x,y:m*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+r.transition});const g=.85+.15*Math.sin(t*8);M>0&&o.push({x:f.x,y:3,z:f.z,reach:r.lightReach,rgb:ly[f.variant%3],strength:r.lightStrength*g*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}const zr=4;class hy{atlas;index=new Map;colour=new Map;constructor(e,t){const i=t.runeMarkers,s=[],r=[...new Set(Ft.map(o=>o.creature))],a=[i.dormant.glow,...Array.from({length:zr-1},(o,h)=>i.awake.glow[0]+(i.awake.glow[1]-i.awake.glow[0])*h/(zr-2))];for(const o of r){const h=vp(e,{glow:"cyan",sigil:o}),c=ar(o);this.index.set(o,s.length),this.colour.set(o,new W(c[0]/255,c[1]/255,c[2]/255));for(const d of a)s.push(uy(h,c,d))}this.atlas=Zs(s,2048)}frame(e,t){return(this.index.get(e)??0)+Math.max(0,Math.min(zr-1,t))}}function uy(n,e,t){const i=document.createElement("canvas");i.width=n.w,i.height=n.h;const s=i.getContext("2d");s.drawImage(n.A,0,0);const r=s.getImageData(0,0,n.w,n.h),a=r.data;for(let o=0;o<a.length;o+=4){if(a[o+3]!==254)continue;const h=Math.max(a[o],a[o+1],a[o+2])/255,c=Math.max(0,h-.75)*2.4;for(let d=0;d<3;d++)a[o+d]=Math.min(255,(e[d]*(1-c)+255*c)*h*t)}return s.putImageData(r,0,0),{...n,A:i}}const dy=`
attribute vec4 iBeam; // colour rgb, strength
varying vec4 vBeam;
varying float vY;
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`,fy=`
uniform float uShown;
varying vec4 vBeam;
varying float vY;
void main() {
  float a = vBeam.a * uShown * (1.0 - vY) * smoothstep(0.0, 0.08, vY);
  if (a < 0.003) discard;
  gl_FragColor = vec4(vBeam.rgb * a, 1.0);
}
`;class py{constructor(e=64,t=600){this.maxBeams=e,this.maxMotes=t;const i=new Wc(.5,.5,1,8,1,!0);this.beamAttr=new cr(new Float32Array(e*4),4),i.setAttribute("iBeam",this.beamAttr),this.beams=new B2(i,new Mt({vertexShader:dy,fragmentShader:fy,uniforms:{uShown:{value:0}},transparent:!0,depthWrite:!1,blending:Hi,side:ri}),e),this.beams.frustumCulled=!1,this.beams.renderOrder=9,this.mPos=new Float32Array(t*3),this.mCol=new Float32Array(t*4);const s=new qt;s.setAttribute("position",new Cn(this.mPos,3)),s.setAttribute("color",new Cn(this.mCol,4)),this.motes=new Yr(s,new Hd({size:3,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Hi})),this.motes.frustumCulled=!1,this.group.add(this.beams,this.motes)}maxBeams;maxMotes;group=new bs;beams;beamAttr;motes;mPos;mCol;m4=new It;update(e,t,i,s){const r=Math.min(this.maxBeams,e.length);for(let h=0;h<r;h++){const c=e[h];this.m4.makeScale(1.2,t,1.2).setPosition(c.x,t/2,c.z),this.beams.setMatrixAt(h,this.m4),this.beamAttr.setXYZW(h,c.colour.x,c.colour.y,c.colour.z,c.strength)}this.beams.count=r,this.beams.instanceMatrix.needsUpdate=!0,this.beamAttr.needsUpdate=!0,this.beams.material.uniforms.uShown.value=i;const a=Math.min(this.maxMotes,s.length);for(let h=0;h<a;h++){const c=s[h];this.mPos.set([c.x,c.y,c.z],h*3),this.mCol.set([c.colour.x,c.colour.y,c.colour.z,c.alpha],h*4)}const o=this.motes.geometry;o.setDrawRange(0,a),o.getAttribute("position").needsUpdate=!0,o.getAttribute("color").needsUpdate=!0}}function my(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function gy(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=Ai(n.seed*53+t[0]*1031+t[1]*7+509),a=w=>{const E=n.areaAt(w.x,w.z).cell;return E[0]===t[0]&&E[1]===t[1]},o=w=>Pe(Math.round(w.x*10),Math.round(w.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((w,E)=>o(w)-o(E)),c=new Map,d=new Set,f=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),m=(w,E=0)=>(c.get(w)??0)+1<=(d.has(w)?3:2)-E,M=(w,E)=>f.some(b=>my([w.x,w.z],[E.x,E.z],[b.ax,b.az],[b.bx,b.bz])),g=(w,E)=>{f.push({ax:w.x,az:w.z,bx:E.x,bz:E.z,seed:Math.floor(Pe(Math.round(w.x*10),Math.round(E.z*10),n.seed+503)*1e6)}),c.set(w,(c.get(w)??0)+1),c.set(E,(c.get(E)??0)+1)},x=(w,E,b)=>{let A=w,_=E;const S=[w];for(let C=0;C<b&&m(A);C++){const T=[];for(const I of h){if(I===A||!m(I))continue;const k=I.x-A.x,H=I.z-A.z,K=Math.hypot(k,H);if(!(K<i.spanMin||K>i.spanMax)&&!(_&&(k*_[0]+H*_[1])/K<p)&&!M(A,I)&&(T.push({b:I,d:K}),T.length>=16))break}if(!T.length)break;T.sort((I,k)=>k.d-I.d);const{b:L,d:O}=T[Math.floor(r()*Math.min(4,T.length))];g(A,L),_=[(L.x-A.x)/O,(L.z-A.z)/O],S.push(L),A=L}return S},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),y=[];for(const w of h){if(u.length>=v)break;if(c.has(w)||u.some(A=>Math.hypot(A.x-w.x,A.z-w.z)<i.spread))continue;u.push(w);const E=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),b=x(w,null,E);for(let A=1;A<b.length-1;A++){if(r()>=i.junctionChance)continue;const _=b[A],S=b[A+1],C=S.x-_.x,T=S.z-_.z,L=Math.hypot(C,T),O=r()<.5?1:-1;d.add(_),y.push({from:_,heading:[-T/L*O,C/L*O]})}}for(const w of y)x(w.from,w.heading,i.spansPerRun[0]+Math.floor(r()*3));return f}const Nt={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ot(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new $e(1,1)},uWitch:{value:new ot(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new ot(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new ot)},uPartyCol:{value:Array.from({length:16},()=>new W)},uPartyCount:{value:0},uUplight:{value:new ot}},pl=`
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
`,ml=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery, uAppear;
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
${di}
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
`;class Kn{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Vn(1,1);s.translate(0,.5,0),this.geo=new Yc,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...at,...Nt,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uFadePass:{value:0},uFlat:{value:i.flat?1:0},uSilhouette:{value:new ot(0,0,0,0)},...h}),a=i.scenery?{blending:po,blendSrc:Cc,blendDst:Lc}:{},o=new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new zt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new zt(this.geo,new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new zt(this.geo,new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({uSilhouette:{value:new ot(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:$a}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new cr(new Float32Array(t*s),s);return a.setUsage(tr),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}appearU={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const xy=`
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
}`,My=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${di}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,vy=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,_y=`
varying vec3 vWorld;
${di}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,by=`
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
}`,yy=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${di}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class wy{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new st(r));const s={...at,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Mt({vertexShader:xy,fragmentShader:My,uniforms:{...s,uRes:Nt.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new Mt({vertexShader:vy,fragmentShader:_y,uniforms:s}),this.moteMat=new Mt({vertexShader:by,fragmentShader:yy,uniforms:{...at,uMoteColour:{value:new st(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:Hi})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],d=[],f=[],u=[];e.forEach((_,S)=>{const C=Math.hypot(_.bx-_.ax,_.bz-_.az),T=Math.max(2,Math.round(C/a.bulbSpacing)),L=O=>[_.ax+(_.bx-_.ax)*O,o-a.sag*4*O*(1-O)*(C/8),_.az+(_.bz-_.az)*O];for(let O=0;O<=16;O++){const I=L(O/16),k=L((O+1)/16);O<16&&(f.push(...I,...k),u.push(S+O/16,S+(O+1)/16))}for(let O=1;O<T;O++){const I=O/T,k=L(I),H=this.palette[(_.seed+O)%this.palette.length];h.push(...k),c.push(H.r,H.g,H.b),d.push((_.seed*13+O*7)%100/100,S*40+O,t(k[0],k[2])+O*.03,4*I*(1-I))}});const p=new bs,m=new qt;m.setAttribute("position",new bt(h,3)),m.setAttribute("aColour",new bt(c,3)),m.setAttribute("aBulb",new bt(d,4));const M=new qt;M.setAttribute("position",new bt(f,3)),M.setAttribute("aSway",new bt(u,1)),p.add(new Gc(M,this.wireMat),new Yr(m,this.bulbMat));const g=this.game.tuning.party.motes,x=this.game.map,v=[],y=[],w=x.areaSize*1.1,E=Math.round(Math.PI*w*w/400*g.perPatch);for(let _=0;_<E;_++){const S=k=>{const H=Math.sin(s*12.9898+_*78.233+k*37.719)*43758.5453;return H-Math.floor(H)},C=S(1)*Math.PI*2,T=Math.sqrt(S(2))*w,L=i.x+Math.cos(C)*T,O=i.z+Math.sin(C)*T,I=x.areaAt(L,O).cell;I[0]!==r[0]||I[1]!==r[1]||(v.push(L,g.from,O),y.push(S(3),g.speed*(.6+S(4)*.8),.3+S(5)*.8,t(L,O)))}const b=new qt;b.setAttribute("position",new bt(v,3)),b.setAttribute("aMote",new bt(y,4));const A=new Yr(b,this.moteMat);return A.frustumCulled=!1,p.add(A),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=gy(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),c=r.from?e.map.siteOf(r.from[0],r.from[1]):null,d=c?(c.x+h.x)/2:h.x,f=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-d,h.z-f)*1.6:1,p=e.tuning.party.transition,m=(M,g)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-d,g-f)/u)*p;a={lines:o,group:this.build(o,m,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const en=32,Ks=16,Sy=`
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
}`,Ey=`
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
}`;class ku{mesh;geo=new Yc;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Vn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new zt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new cr(r,a).setUsage(tr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,c,d=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=s,this.uv.set(r,f*4),this.col.set([a,o,h,c],f*4),this.draw[f]=d}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const Ay=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],Ty=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class Ry{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=en*Ks;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(en/2,en/2,0,en/2,en/2,en/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,en,en),this.tex=new cc(this.canvas),this.tex.magFilter=Wt,this.tex.minFilter=Wt,this.tex.generateMipmaps=!1;const r=a=>new Mt({vertexShader:Sy,fragmentShader:Ey,uniforms:{...at,uRight:Nt.uRight,uUp:Nt.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Hi});this.standing=new ku(r(0)),this.flat=new ku(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%Ks*en,o=Math.floor(s/Ks)*en;r.clearRect(a,o,en,en),N0(r,e,{x:a+1,y:o+1,size:en-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,en,en);for(let d=3;d<h.data.length;d+=4)h.data[d]=h.data[d]>90?255:0;r.putImageData(h,a,o);const c=ar(e);return this.colours.set(e,new st(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=en*Ks,i=e%Ks*en,s=Math.floor(e/Ks)*en;return[i/t,1-s/t,(i+en)/t,1-(s+en)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,d=h.bond,f=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const b of o.events)b.kind==="fizzled"&&this.fizzles.push({x:b.x,z:b.z,at:e}),b.kind==="invited"&&this.bursts.push({x:b.x,z:b.z,at:e,seed:b.id});this.fizzles=this.fizzles.filter(b=>e-b.at<.7),this.bursts=this.bursts.filter(b=>e-b.at<.9);for(const b of this.bursts){const A=(e-b.at)/.9;for(let _=0;_<28;_++){const S=Pe(b.seed,_,3)*Math.PI*2,C=2+Pe(b.seed,_,5)*3,T=2+Pe(b.seed,_,7)*3,L=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(b.x+Math.cos(S)*C*A,.6+T*A-4*A*A,b.z+Math.sin(S)*C*A,.3,u,L[0],L[1],L[2],1-A)}}const p=(b,A,_)=>{const S=a.creatures[b],C=28,T=_?1:.45;for(let L=0;L<C;L++){const O=Math.PI/2-L/C*Math.PI*2,I=L/C<A;!_&&!I||this.flat.add(S.x+Math.cos(O)*1.5,0,S.z+Math.sin(O)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*T)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[b,A]of o.progress)o.talk?.id!==b&&p(b,Math.min(1,A/dd(a.creatures[b],h)),!1);const m=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),g=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},v=r;for(let b=o.stack.length-1;b>=0;b--){const A=o.stack[b],_=a.creatures[A],S=o.stack.length-1-b,C=this.chain[S],T=(2+_.level*.4)*m.scale,L=Math.sin(e*1.7+S*.9)*m.idleSway*(1+S*.5),O=x.x-c.vx*m.trail+L,I=x.z-c.vz*m.trail;C.vx+=((O-C.x)*m.stiffness-C.vx*m.damping)*M,C.vz+=((I-C.z)*m.stiffness-C.vz*m.damping)*M,C.x+=C.vx*M,C.z+=C.vz*M,x=C,v+=(S===0?m.offset*T:m.gap*T)+T/2;const k=new W(c.x+C.x,v,c.z+C.z);v+=T/2,g.set(A,k);const H=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(k.x,k.y,k.z,T,this.uv(this.slotOf(_.species,_.level)),H.r,H.g,H.b,1)}for(const b of o.placed){const A=a.creatures[b.id],_=this.slotOf(A.species,A.level),S=this.colours.get(A.species),C=.8+.2*Math.sin(e*2+b.id);this.flat.add(b.x,0,b.z,3+A.level*.8,this.uv(_),S.r*C,S.g*C,S.b*C,1,Math.min(1,(e-b.at)/.8)),this.flat.add(b.x,0,b.z,5,u,S.r,S.g,S.b,.25)}const y=h.sigilProjection,w=c.lift*c.lift*(3-2*c.lift);if(w>.01)for(const b of o.placed){const A=a.creatures[b.id],_=this.colours.get(A.species),S=h.treetopHeight-4+y.height,C=.85+.15*Math.sin(e*1.3+b.id);this.flat.add(b.x,S,b.z,(3+A.level*.8)*y.size,this.uv(this.slotOf(A.species,A.level)),_.r,_.g,_.b,y.opacity*w*C);for(let T=1;T<S;T+=1.5)this.standing.add(b.x,T,b.z,.3,u,_.r,_.g,_.b,y.beam*w*C*(.6+.4*Math.sin(T*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(b=>Math.hypot(b.x-c.x,b.z-c.z)<=f.pickRadius)){const b=a.creatures[o.stack[o.stack.length-1]],A=this.colours.get(b.species),_=fd(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+b.level*.8,this.uv(this.slotOf(b.species,b.level)),_?1:A.r,_?.1:A.g,_?.1:A.b,.22)}for(const b of this.fizzles){const A=1-(e-b.at)/.7;this.flat.add(b.x,0,b.z,3*(1+(1-A)*.6),u,1,.15,.1,A)}const E=[...o.stack,...o.placed.map(b=>b.id)];for(const b of E){const A=a.creatures[b],_=this.colours.get(A.species);if(!_)continue;const S=Zp(o,b,c.x,c.z);d.rim&&this.flat.add(A.x,0,A.z,1.8,u,_.r,_.g,_.b,.35);const C=g.get(b)??new W(S.x,.2,S.z);if(d.sparks){const L=Math.max(.5,d.sparkEvery),O=(e+b*.618%1*L)%L;if(O<.7){const I=O/.7;this.standing.add(C.x+(A.x-C.x)*I,C.y+(.6-C.y)*I+Math.sin(I*Math.PI)*1.2,C.z+(A.z-C.z)*I,.35,u,_.r,_.g,_.b,1)}}const T=Math.hypot(A.x-S.x,A.z-S.z);if(d.thread&&T>f.length*.85){const L=Math.min(1,(T-f.length*.85)/f.length),O=Math.min(60,Math.floor(T/1.2));for(let I=1;I<O;I++){const k=(I+e*2%1)/O;this.standing.add(C.x+(A.x-C.x)*k,C.y+(.5-C.y)*k,C.z+(A.z-C.z)*k,.22,u,_.r,_.g,_.b,.25+.75*L)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=r.witch,d=(y,w,E,b)=>{this.v.set(w,E,b).project(t),y.style.left=`${(this.v.x+1)/2*i}px`,y.style.top=`${(1-this.v.y)/2*s}px`},f=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),d(o,c.x-1.2,or(c,r.tuning)+2.2,c.z));return}const p=r.creatures[a.id];if(d(o,c.x-1.2,or(c,r.tuning)+2.2,c.z),d(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(f,Pe(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const m=Math.floor(a.t/$p(p,r.tuning)),M=Math.min(1,a.t/a.total),g=(y,w)=>y[Math.floor(Pe(a.id,w,5)*y.length)%y.length],x=[4,2,0][Math.min(2,p.level)],v=Math.round(x+(4-x)*M);this.emoji(o,g(Ay,m-m%2)),o.classList.toggle("on",m%2===0),m>=1?this.emoji(f,g(Ty[v],m-(m+1)%2)):this.say(f,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=m%2===1?"1":"0.6"}}const Cy=[1,3,5,7,9],cf=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function Ly(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=cf(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),c=n-h*o,d=In(s.duty*t,0,1),u=Pe(e,h,311)<d?sn(c/Math.max(.001,s.fadeIn))*sn((o-c)/Math.max(.001,s.fadeOut)):0,p=Math.floor(c/a),m=Cy.filter(w=>w<=s.maxCount),M=m[Math.floor(Pe(e,h*64+p,313)*m.length)%m.length]??1,g=e%97*.37,x=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+g)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+g*2),y=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:x,open:v,hue:y}}const Py=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,Dy=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Nr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],Iy=n=>{const e=(n%1+1)%1*Nr.length,t=Math.floor(e),i=e-t,s=Nr[t%Nr.length],r=Nr[(t+1)%Nr.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class Oy{constructor(e,t){this.game=t,this.mesh=new Gc(this.geo,new Mt({vertexShader:Py,fragmentShader:Dy,transparent:!0,depthWrite:!1,blending:Hi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new qt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=cf(r),h=o*a.blockBars,c=[],d=[],f=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const m=Ly(e,u.seed,1,r),M=e-u.ready,g=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,x=Math.max(m.on,g),v=g>m.on?a.maxCount:m.count;if(x<=.01)continue;const y=a.spread*Math.PI/180*m.open;for(let w=0;w<v;w++){const E=v===1?0:w/(v-1)-.5,b=a.maxTilt*Math.PI/180,A=Math.max(-b,Math.min(b,E*y+m.sweep)),_=Math.sin(A),S=Math.cos(A),C=-.15*Math.cos(A*3+u.seed),T=Iy(m.hue+w*.07),L=a.opacity*x*p;c.push(u.x,u.y,u.z,u.x+_*a.length,u.y+S*a.length,u.z+C*a.length),d.push(...T,L,...T,L),f.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(d.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Cn(this.pos,3).setUsage(tr)),this.geo.setAttribute("aCol",new Cn(this.col,4).setUsage(tr)),this.geo.setAttribute("aU",new Cn(this.u,1).setUsage(tr))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(d),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*Ny(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(x,v)=>{if(x<o.minX||x>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const y=n.areaAt(x,v).cell;return`${y[0]},${y[1]}`},c=`${e[0]},${e[1]}`,d=Math.ceil(2*r/a),f=s.x-r,u=s.z-r,p=[];for(let x=0;x<=d;x++){for(let v=0;v<=d;v++)p.push(h(f+v*a,u+x*a));yield}const m=new Set,M=Math.max(1,Math.round(a/t)),g=a/M;for(let x=0;x<d;x++,yield)for(let v=0;v<d;v++){const y=[p[x*(d+1)+v],p[x*(d+1)+v+1],p[(x+1)*(d+1)+v],p[(x+1)*(d+1)+v+1]];if(!y.includes(c)||y.every(E=>E===c))continue;const w=[];for(let E=0;E<=M;E++)for(let b=0;b<=M;b++)w.push(h(f+v*a+b*g,u+x*a+E*g));for(let E=0;E<=M;E++)for(let b=0;b<=M;b++){const A=w[E*(M+1)+b],_=f+v*a+b*g,S=u+x*a+E*g;for(const[C,T]of[[1,0],[0,1]]){if(b+C>M||E+T>M)continue;const L=w[(E+T)*(M+1)+b+C];if(A===L||A!==c&&L!==c)continue;const O=_+C*g*.5,I=S+T*g*.5,k=`${Math.round(O*4)},${Math.round(I*4)}`;m.has(k)||(m.add(k),i.push({x:O,z:I,other:A===c?L:A}))}}}}const Fy=`
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
}`,Uy=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${di}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class ky{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Yr(this.geo,new Mt({vertexShader:Fy,fragmentShader:Uy,uniforms:{...at,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Hi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new qt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const d=e.map.siteOf(c.cell[0],c.cell[1]),f=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=f?(f.x+d.x)/2:d.x,p=f?(f.z+d.z)/2:d.z,m=e.map.areaSize*1.6,M=e.tuning.party.transition,g=ar(Ft[e.map.typeOf(c.cell[0],c.cell[1])].creature),x={points:[],colour:new st(g[0]/255,g[1]/255,g[2]/255),on:(v,y)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,y-p)/m)*M,done:!1};this.areas.set(h,x),this.jobs.push({key:h,gen:Ny(e.map,c.cell,t.step,x.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(r.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new bt(r,3)),this.geo.setAttribute("aColour",new bt(a,3)),this.geo.setAttribute("aSpark",new bt(o,2))}}const By=["#ff6fcf","#5fe8ff","#ffe25c"];class zy{canvas=document.createElement("canvas");g;v=new W;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,s,r,a,o,h,c,d){const f=this.v.set(s,1,r).project(e),u=Math.max(Math.abs(f.x),Math.abs(f.y)),p=f.z<1?Math.min(1,Math.max(0,(u-.9)/.25)):1;if(p<=.01){this.canvas.style.display="none";return}let m=f.x,M=f.y;f.z>=1&&(m=-m,M=-M);const g=1/Math.max(Math.abs(m)/.86,Math.abs(M)/.8,1e-6),x=(m*g+1)/2*t,v=(1-M*g)/2*i,y=Math.hypot(s-a,r-o),w=Math.max(.25,Math.min(1,1-y/900));this.canvas.style.display="block",this.canvas.style.left=`${x-48}px`,this.canvas.style.top=`${v-48}px`;const E=this.g,b=Math.atan2(-M,m);E.clearRect(0,0,96,96),E.save(),E.translate(48,48),E.rotate(b);const A=h*c/60,_=A-Math.floor(A);for(let S=0;S<3;S++){const C=(10+S*9+_*9)*(.7+.3*w),T=p*w*(1-(S+_)/3.2);E.strokeStyle=By[S],E.globalAlpha=Math.max(0,T),E.lineWidth=3,E.beginPath(),E.arc(26,0,C,Math.PI-.7,Math.PI+.7),E.stroke()}d&&(E.rotate(-b),E.globalAlpha=.8,E.fillStyle="#fff",E.font="10px monospace",E.textAlign="center",E.fillText(`${Math.round(y)} m`,0,40)),E.restore()}}class Hy{canvas=document.createElement("canvas");g;v=new W;d=new W;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(T,L)=>{const O=this.v.set(T,0,L).project(e);return[(O.x+1)/2*t,(1-O.y)/2*i,O.z]};a.clearRect(0,0,t,i);const h=(T,L,O,I,k)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${k})`,a.lineWidth=1,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke()},c=(T,L,O,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(T,L+1,O+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(T,L,O)},d=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!d||!f)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),m=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,g=Math.min(u.x,m.x),x=Math.max(p.x,M.x),v=Math.min(f.z,m.z),y=d.z;for(let T=Math.ceil(g/10)*10;T<=x;T+=10){const L=o(T,v),O=o(T,y);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}for(let T=Math.ceil(v/10)*10;T<=y;T+=10){const L=o(g,T),O=o(x,T);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}const w=i-6;h(0,w,t,w,.6);for(let T=Math.ceil((u.x-s)/2)*2;s+T<=p.x;T+=2){const L=o(s+T,d.z)[0],O=T%10===0;h(L,w,L,w-(O?10:5),.6),O&&c(`${T}`,L,w-18,"center")}const E=6;h(E,0,E,i,.6);for(let T=Math.ceil((r-d.z)/2)*2;r-T>=f.z-1e-6&&T<400;T+=2){const L=o(s,r-T)[1],O=T%10===0;L<0||L>i||(h(E,L,E+(O?10:5),L,.6),O&&c(`${T}`,E+14,L,"left"))}const b=o(s,r),A=this.ground(e,-1,1-b[1]/i*2),_=this.ground(e,1,1-b[1]/i*2),S=A&&_?Math.round(_.x-A.x):0,C=Math.round(e.position.y);c(`camera ${C} m up · ${S} m across at the witch`,t-12,i-24,"right")}}const Gy=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Wy=`
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
}`;class Vy{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new Mt({vertexShader:Gy,fragmentShader:Wy,uniforms:{...at,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?Si:er}),this.mesh=new zt(new Vn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const Yy=`
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
}`,Xy=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${di}
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
}`;class Ky{mesh;geo=new Yc;attr;capacity=0;constructor(e,t=!0){const i=new Vn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new Mt({vertexShader:Yy,fragmentShader:Xy,uniforms:{...at,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:po,blendSrc:Tc,blendDst:Rc}:{}});this.mesh=new zt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new cr(new Float32Array(this.capacity*4),4),this.attr.setUsage(tr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const qy=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function $y(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}function Zy(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class Jy{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=qy(s),this.renderer=new $b({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Vr,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new kn(s.camera.fov,1,1,900),this.post=new ty(this.renderer,s),this.scene.background=new st(723478),W5({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient,s.glowFalloff),at.uGlowPower.value=s.glowPower,this.assets=new G5(i,t.seed,s.pixelSize),this.ground=new X5(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new Ky(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";at.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new Vy(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Hh,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),at.uHazeRange.value.set(s.haze.near,s.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new $5(t.map,i,this.mpp).group);const o=s.occlusion;this.witchBatch=new Kn(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:at.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Nt.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new Kn(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.markerArt=new hy(i,s),this.markerBatch=new Kn(this.markerArt.atlas,this.mpp,{fade:!0}),this.scene.add(...this.markerBatch.meshes,this.markerFx.group),this.stoneBatch=new Kn(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,c=[],d=t.tuning.dancefloor.stones;for(let u=0;u<d;u++){const p=u/d*Math.PI*2+.3;c.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(c),this.propBatch=new Kn(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new cy(this.assets.soundsystems,this.mpp),this.strings=new wy(this.scene,t),this.leashView=new Ry(this.scene,t),this.lasers=new Oy(this.scene,t),this.borders=new ky(this.scene,t),this.soundBatch=new Kn(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new oy(t.map,s,Nt,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=s.fx==="smooth"?new Mt({transparent:!0,depthWrite:!1,blending:po,blendSrc:Tc,blendDst:Rc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new Mt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new zt(new Vn(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Hh;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;markerArt;markerBatch;markerFx=new py;markerCache={wave:-1,n:-1,list:[]};seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new zy(document.body);rulers=new Hy(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;quick=!1;ghosts=[];ghostLines=null;now=0;stats={forestMs:0,forestMissing:0,sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Nt.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);const e=this.game.map,t=this.game.witch,i=new Map;for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=e.siteOf(r,s),o=e.typeOf(r,s),h=Math.hypot(a.x-t.x,a.z-t.z);i.get(o)<=h||i.set(o,h)}for(let s=0;s<Ft.length;s++)i.has(s)||i.set(s,1/0);if(this.prepared=!0,!this.quick){for(const[s]of[...i].sort((r,a)=>r[1]-a[1]))this.assets.prefetchType(s);for(const s of Ft)this.assets.creatureArt(s.creature)}}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes),this.prepared&&(s.appearU.value=0,this.appearing.set(s,performance.now())))),s}appearing=new Map;prepared=!1;easeAppearing(){const e=performance.now();for(const[t,i]of this.appearing){const s=Math.min(1,(e-i)/800);t.appearU.value=s*s*(3-2*s),s>=1&&this.appearing.delete(t)}}frustum=new no;frustumTo=new no;cullCam=new kn;box=new rs;m4=new It;v3=new W;v3b=new W;v3c=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=Wu({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Zn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const d of[-1,1])for(const f of[-1,1]){const u=this.v3.set(d,f,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let m=u.y<-.001?(p-h.y)/u.y:1/0;m>0||(m=1/0),m=Math.min(m,c),s.push([h.x+u.x*m,h.z+u.z*m])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+r;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,c,d]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+d),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[c,...d]=a.split("|"),[f,u,p]=h??d.map(Number),m=this.game.witch;!(e==="placed"&&Math.hypot(+f-m.x,+u-m.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+u,+p)&&this.pops.push(`${o} ${c} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};if(e!=="placed"||!this.appearing.size)for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastView=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=wh(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,d=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,f=this.budget.radius,u=Math.min(i.haze.far,f+r/2),p=Math.abs(f-this.lastBuild.radius)>=r/3,m=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!d&&!m&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,r),g=(M.minX+M.maxX)/2,x=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2;this.lastView={x:g,z:x,half:v};const y=[],w=at.uMoonDir.value,E=-w.x/Math.max(.2,w.y),b=-w.z/Math.max(.2,w.y),A=new Map,_=(F,ee)=>{let se=A.get(F);se||A.set(F,se=[]),se.push(ee)},S=this.mpp,C=a.angle*Math.PI/180,T=Nt.uUp.value.dot(this.v3.set(0,Math.cos(C),-Math.sin(C))),L=Nt.uUp.value,O=(F,ee,se,ue)=>{const xe=(se.pad??0)*ue;return{x:F-L.x*xe,y:-L.y*xe,z:ee-L.z*xe}};let I=0,k=0;for(const F of t.forest.treesNear(g,x,v)){const ee=this.assets.typeArt(F.type);if(!ee||!ee.layout.big.length)continue;const se=ee.atlas.frames,ue=ee.layout.big[Zy(ee.layout.bigWeight,F.variant)],xe=se[ue.top??ue.bot];if(!this.inView(F.x,F.z,xe.w*S,xe.h*S,r,u))continue;const Ce=xe.h*S,B=i.treeCap,z=Ce>B.from?(B.from+(Ce-B.from)*B.keep)/Ce:1,N=this.mark("tree",F.x,F.z,Ce*z),Z=O(F.x,F.z,se[ue.bot],S*z);_(F.type,{...Z,frame:se[ue.bot],flip:F.flip,fresh:N,scale:z}),ue.top!==null&&_(F.type,{...Z,frame:se[ue.top],flip:F.flip,top:!0,fresh:N,scale:z});const j=xe.w*S,ce=xe.h*S*(ue.top===null?.2:.6);i.shadows.trees&&y.push({x:F.x+E*ce,z:F.z+b*ce,w:j*.8,d:j*.45,scenery:!0}),I++}const H=(F,ee,se)=>{for(const ue of ee){const xe=this.assets.typeArt(ue.type);if(!xe)continue;const Ce=se(xe.layout);if(!Ce.length)continue;const B=Ce[ue.variant%Ce.length],z=xe.atlas.frames,N=z[B.bot],Z=z[B.top??B.bot],j=F==="setpiece"?i.setPieceScale:1,ce=S*j;let ye=ue.x,_e=ue.z;if(B.origin){const Ne=ue.flip?N.w-B.origin.x:B.origin.x;ye+=(N.w/2-Ne)*ce,_e+=(N.h-(N.pad??0)-B.origin.y)*ce*T/Math.max(.2,Math.sin(C))}if(!this.inView(ye,_e,Z.w*ce,Z.h*ce,r,u))continue;const oe=this.mark(F,ue.x,ue.z,Z.h*ce),ge=O(ye,_e,N,ce);_(ue.type,{...ge,frame:N,flip:ue.flip,fresh:oe,scale:j}),B.top!==null&&_(ue.type,{...ge,frame:z[B.top],flip:ue.flip,top:!0,fresh:oe,scale:j});const Me=N.w*ce*.3;F!=="setpiece"&&y.push({x:ue.x,z:ue.z-Me*.4,w:N.w*ce*.8,d:Me,scenery:!0}),k++}};H("small",t.forest.bushesNear(g,x,v),F=>F.small),H("small",t.forest.bedsNear(g,x,v),F=>F.small),H("wall",t.forest.wallsNear(g,x,v),F=>F.walls.map(ee=>({bot:ee,top:null}))),H("setpiece",t.forest.setPiecesNear(g,x,v),F=>F.set===null?[]:[F.set]);const K=this.assets.decorArt(),ae=[];if(K)for(const F of t.forest.decorNear(g,x,v)){const ee=K.families[F.family];if(!ee?.length)continue;const se=ee[F.variant%ee.length],ue=K.atlas.frames,xe=ue[se.bot],Ce=ue[se.top??se.bot];if(!this.inView(F.x,F.z,Ce.w*S,Ce.h*S,r,u))continue;const B=this.mark("decor",F.x,F.z,Ce.h*S),z=O(F.x,F.z,xe,S);ae.push({...z,frame:xe,flip:F.flip,fresh:B}),se.top!==null&&ae.push({...z,frame:ue[se.top],flip:F.flip,top:!0,fresh:B});const N=xe.w*S*.3;y.push({x:F.x,z:F.z-N*.4,w:xe.w*S*.8,d:N,scenery:!0}),k++}const q=this.assets.pathPieceArt();if(q){const F=[],ee=Nt.uRight.value;for(const se of t.map.paths.pieces){if(Math.abs(se.x-g)>v||Math.abs(se.z-x)>v)continue;const ue=q.byId[se.id];if(!ue)continue;const xe=q.atlas.frames[ue.frame],Ce=(ue.originX-xe.w/2)*S,B=Math.max(0,xe.h-(xe.pad??0)-ue.originY)*S,z=O(se.x-ee.x*Ce,se.z-ee.z*Ce+B*T/Math.max(.2,Math.sin(C)),xe,S);if(!this.inView(z.x,z.z,xe.w*S,xe.h*S,r,u))continue;F.push({...z,frame:xe,flip:!1,fresh:this.mark("pathpiece",se.x,se.z,xe.h*S)});const N=xe.w*S*.25;y.push({x:se.x,z:se.z,w:xe.w*S*.7,d:N,scenery:!0}),k++}this.batchFor(this.decorBatches,"pieces",()=>new Kn(q.atlas,S,{scenery:!0,fade:!0}))?.set(F)}const ie=this.assets.relicArt();if(ie){const F=this.camera.getWorldDirection(this.v3b),ee=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),se=Nt.uUp.value,ue=Nt.uRight.value,xe=se.dot(ee)/Math.max(.2,-F.y),Ce=[],B=[],z=(N,Z,j,ce)=>{const ye=ie.atlas.frames[N.frame],_e=N.decal?0:ye.pad??0,oe=(N.originX-ye.w/2)*S*(ce?-1:1),ge=Math.max(0,ye.h-_e-N.originY)*S*xe,Me=N.decal?{x:Z-ue.x*oe,y:0,z:j-ue.z*oe+ge}:O(Z-ue.x*oe,j-ue.z*oe+ge,ye,S);this.inView(Me.x,Me.z,ye.w*S,ye.h*S,r,u)&&((N.decal?B:Ce).push({...Me,frame:ye,flip:ce,fresh:this.mark("relic",Z,j,ye.h*S)}),N.decal||y.push({x:Z,z:j,w:ye.w*S*.6,d:ye.w*S*.22,scenery:!0}),k++)};if(ie.modern.length)for(const N of t.forest.relicsNear(g,x,v))z(ie.modern[N.variant%ie.modern.length],N.x,N.z,N.flip);for(const N of t.map.grounds)if(!(Math.abs(N.x-g)>v+N.r||Math.abs(N.z-x)>v+N.r))for(const Z of ie.layouts[N.kind]??[]){const j=ie.byId[Z.id];j&&z(j,N.x+Z.x,N.z+Z.z,!1)}this.batchFor(this.decorBatches,"relics",()=>new Kn(ie.atlas,S,{scenery:!0,fade:!0}))?.set(Ce),this.batchFor(this.decorBatches,"decals",()=>{const N=new Kn(ie.atlas,S,{scenery:!0,flat:!0});for(const Z of N.meshes)Z.renderOrder=-.5,Z.material.depthWrite=!1;return N})?.set(B)}K&&this.batchFor(this.decorBatches,"all",()=>new Kn(K.atlas,S,{scenery:!0,fade:!0}))?.set(ae);for(const[F,ee]of this.typeBatches)A.has(F)||ee.set([]);for(const[F,ee]of A)this.batchFor(this.typeBatches,F,()=>{const ue=this.assets.typeArt(F);return ue&&new Kn(ue.atlas,S,{scenery:!0,fade:!0})})?.set(ee);{const F=t.map.treehouse;y.push({x:F.x,z:F.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=I,this.stats.bushes=k,this.shadowList=y}drawMarkers(e){const t=this.game,i=t.tuning,s=i.runeMarkers,r=t.witch,a=i.haze.far+20,o=this.markerCache;(o.wave!==t.party.wave||o.n!==t.party.areas.size)&&(o.wave=t.party.wave,o.n=t.party.areas.size,o.list=im(t.party,t.map));const h=gd(t.party,t.map,e),c=t.party.paused?0:h.gone,d=e*i.beat.bpm/60,f=Math.pow(.5+.5*Math.cos(d*Math.PI*2),2),u=[],p=[],m=[],M=[],g=s.scale,x=(y,w,E,b,A=0)=>{const _=this.markerArt.atlas.frames[this.markerArt.frame(E,b)];return this.inView(y,w,_.w*this.mpp*g,_.h*this.mpp*g,6)?(u.push({x:y,y:A,z:w,frame:_,flip:!1,scale:g,fresh:this.mark("marker",y,w,_.h*this.mpp*g)}),!0):!1},v=[];for(const y of o.list){const w=Math.hypot(y.x-r.x,y.z-r.z);if(w>a)continue;const E=Ft[t.map.typeOf(y.cell[0],y.cell[1])].creature,b=this.markerArt.colour.get(E),A=y.awake?1+Math.round(Math.min(1,f*(.4+.6*c))*(zr-2)):0;x(y.x,y.z,E,A);const _=s.awake,S=s.dormant,C=y.awake?(_.light+_.lightBuild*c)*(.55+.45*f):S.light;if(w<s.lightRange&&v.push({d:w,l:{x:y.x,y:.5,z:y.z+1.5,reach:y.awake?_.reach:S.reach,rgb:b,strength:C}}),m.push({x:y.x,z:y.z,colour:b,strength:y.awake?_.beam*(.6+.4*f)*(1+c):S.beam}),y.awake){const T=Math.round(_.motes+_.moteBuild*c);for(let L=0;L<T;L++){const O=(y.cell[0]*31+y.cell[1]*17+L*7.3)%1||.37*(L+1)%1,I=(e*(.25+.15*(L*.618%1))+L/T)%1,k=L*2.399+y.cell[0];M.push({x:y.x+Math.cos(k)*(.6+I*1.4),y:.6+I*7,z:y.z+Math.sin(k)*(.6+I*1.4),colour:b,alpha:(1-I)*(.5+.5*f)*(.6+O*.4)})}}}for(const y of t.party.areas.values()){if(!y.soundsystem||e-y.at>s.flare.time||e<y.at)continue;const w=(e-y.at)/s.flare.time,E=Ft[t.map.typeOf(y.cell[0],y.cell[1])].creature,b=this.markerArt.colour.get(E),A=t.map.soundsystemSpot(y.cell[0],y.cell[1]);x(A.x,A.z,E,zr-1,-w*w*4*g),v.push({d:0,l:{x:A.x,y:2.5,z:A.z,reach:s.awake.reach*1.5,rgb:b,strength:s.flare.light*(1-w)}})}v.sort((y,w)=>y.d-w.d);for(const y of v.slice(0,8))p.push(y.l);return this.markerBatch.set(u),this.markerFx.update(m,s.beamHeight,Ao(r),M),p}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const d=c.leashed?this.assets.partyArt(c.species,c.id,ar(c.species)):void 0,f=d??this.assets.creatureArt(c.species),u=d?`party-${c.id}`:c.species;if(!f)continue;r.set(u,f);const p=f.atlas.frames[f.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const m=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=s.get(u);M||s.set(u,M=[]);const g=(e/o+c.id%4*.25)*Math.PI,x=c.leashed?Math.abs(Math.sin(g))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(g*.5)*.12:0;M.push({x:c.x+v,y:x,z:c.z,frame:p,flip:c.facing<0,fresh:m}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,d]of this.creatureBatches)s.has(c)||d.set([]);for(const[c,d]of s)this.batchFor(this.creatureBatches,c,()=>{const u=r.get(c);return u&&new Kn(u.atlas,this.mpp)})?.set(d);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=Pe(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:c,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(sr,this.game.tuning.lightBudget),r=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,d)=>c.d-d.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=at;let h=0;for(const{l:c,d}of r.slice(0,s)){const f=Math.min(1,Math.max(0,(a-d)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Gc(new qt,new zd({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Nt.uRight.value,i=Nt.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,m)=>[a.x+t.x*p*o+i.x*m*a.h,t.y*p*o+i.y*m*a.h,a.z+t.z*p*o+i.z*m*a.h],c=h(-1,0),d=h(1,0),f=h(1,1),u=h(-1,1);s.push(...c,...d,...d,...f,...f,...u,...u,...c,...c,...f)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new bt(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=Nt.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),c=i[0].pad??0,d=Math.max(0,i[0].h-c-t.base.y)*r,f=c*r,u=s.x-(t.base.x-i[0].w/2)*r,p=s.z+d*h/Math.max(.2,Math.sin(o)),m={x:u-a.x*f,y:-a.y*f,z:p-a.z*f};return this.treehouseBatch.set([{...m,frame:i[0],flip:!1},{...m,frame:i[1],flip:!1,top:!0}]),m}render(e,t=!0){const i=this.game,s=i.tuning,r=wh(i);if(t){const oe=performance.now();this.lastReal&&(this.budget=$y(this.budget,(oe-this.lastReal)/1e3,s)),this.lastReal=oe}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),at.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new W(0,Math.cos(a),-Math.sin(a)),c=new W(r.tx,r.ty,r.tz),d=c.dot(h),f=c.x;c.addScaledVector(h,Math.round(d/o)*o-d),c.x+=Math.round(f/o)*o-f;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=s.spriteTilt;Nt.uUp.value.set(0,1,0).lerp(h,p).normalize(),Nt.uFacing.value.crossVectors(Nt.uRight.value,Nt.uUp.value).normalize();const m=Ao(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const g=this.v3.set(i.witch.x,or(i.witch,s)*.5,i.witch.z).project(this.camera);Nt.uCutout.value.set((g.x*.5+.5)*this.width,(g.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-m),Math.max(1,M.edge*this.width*(1-m))),Nt.uTopFade.value=m,Nt.uDebugCull.value=this.debugCull?1:0;const x=i.witch,v=or(x,s);at.uGlowPos.value.set(x.x,v+s.glowHeight,x.z),at.uHazeCentre.value.set(x.x,x.z),this.updateSources(e);const y=this.partyView.update(i,e,(oe,ge,Me,Ne)=>this.inView(oe,ge,Me,Ne,4),()=>!1);this.soundBatch.set(y.items),this.ground.setSweeps(y.sweeps),this.lasers.update(e,y.playing,x.x,x.z);{const oe=Nt,ge=s.party,Me=[...i.party.areas.values()].map(Ne=>({a:Ne,s:i.map.siteOf(Ne.cell[0],Ne.cell[1])})).sort((Ne,Ze)=>Math.hypot(Ne.s.x-x.x,Ne.s.z-x.z)-Math.hypot(Ze.s.x-x.x,Ze.s.z-x.z)).slice(0,16);Me.forEach(({a:Ne,s:Ze},lt)=>{const gt=Ne.wave===0?1:Math.min(1,Math.max(0,(e-Ne.at)/Math.max(.01,ge.transition)));oe.uParty.value[lt].set(Ze.x,Ze.z,i.map.areaSize*.85,gt);const ut=ar(Ft[i.map.typeOf(Ne.cell[0],Ne.cell[1])].creature);oe.uPartyCol.value[lt].set(ut[0]/255,ut[1]/255,ut[2]/255)}),oe.uPartyCount.value=Me.length,oe.uUplight.value.set(ge.uplight.strength,ge.uplight.pulse,ge.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const w=this.assets.treehouse,E=w.atlas.frames[0],b=this.placeTreehouse(r.angle),A=Nt,_=(oe,ge)=>{const Me=A.uRight.value,Ne=A.uUp.value,Ze=(oe-E.w/2)*this.mpp,lt=(E.h-ge)*this.mpp;return{x:b.x+Me.x*Ze+Ne.x*lt,y:b.y+Me.y*Ze+Ne.y*lt,z:b.z+Me.z*Ze+Ne.z*lt}},S=w.lights.filter(oe=>oe.kind==="lantern"||oe.kind==="window").slice(0,2).map(oe=>({..._(oe.x,oe.y),reach:s.treehouse.lightReach,rgb:new W(oe.rgb[0]/255,oe.rgb[1]/255,oe.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+oe.x))})),C=this.drawMarkers(e);this.setLights([this.dancefloor.update(e,this.ground),...y.lights,...S,...C,...this.forestLights],x.x,x.z),at.uTime.value=e,this.mist?.follow(r.tx,r.tz);const T=Math.sin(e*2.4)*.12,L=x.mode==="rising"&&x.lift<.9,O=x.mode==="descending"&&x.lift>.1;let I=L||O?(L?8:12)+(x.away?2:0)+Math.floor(e*7)%2:x.lean?6+(x.away?1:0):(x.away?3:0)+Math.floor(e*4)%3;if(!L&&!O){const oe=this.assets.witchFly,ge=x.away?"away":"towards";x.braking?I=oe.brake[ge][Math.floor(e*oe.brake.fps)%oe.brake[ge].length]:(x.boost??0)>.7&&(I=oe.fast[ge][Math.floor(e*oe.fast.fps)%oe.fast[ge].length])}const k=i.leash,H=this.assets.witchFoot,K=x.away?"away":"towards";for(const oe of k.events)oe.kind==="placed"||oe.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:oe.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const ae=this.footAct?H[this.footAct.pose].towards.length/H[this.footAct.pose].fps:0,q=!!this.footAct&&e-this.footAct.at<ae+.3,ie=x.mode==="ground"&&(k.talk||k.held||q)?1:0,F=Math.min(.1,Math.max(0,e-this.footTime)),ee=this.foot;this.footTime=e,this.foot+=(ie-this.foot)*Math.min(1,F*8),Math.abs(ie-this.foot)<.01&&(this.foot=ie);const se=(oe,ge)=>{const Me=H[oe][K];return Me[Math.max(0,Math.min(Me.length-1,ge))]};this.foot>.6?q&&this.footAct?I=se(this.footAct.pose,Math.floor((e-this.footAct.at)*H[this.footAct.pose].fps)):k.talk?I=se("talk",Math.floor(e*H.talk.fps)%H.talk[K].length):I=se("stand",Math.floor(e*H.stand.fps)%H.stand[K].length):this.foot>.02&&(I=this.foot>=ee?se("land",Math.floor(this.foot*3)):se("takeoff",Math.floor((1-this.foot)*3)));const ue=this.foot*this.foot*(3-2*this.foot),xe=(v+T-.4)*(1-ue),Ce=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=x.seated?1:Math.max(0,this.seatK-Ce/.6);let B=x.x,z=x.z,N=xe;if(this.seatK>0){const oe=_(w.seat.x,w.seat.y),ge=this.seatK*this.seatK*(3-2*this.seatK),Me=this.camera.getWorldDirection(this.v3);B+=(oe.x-Me.x*.6-B)*ge,N+=(oe.y-Me.y*.6-N)*ge,z+=(oe.z-Me.z*.6-z)*ge,x.seated&&(I=H.sit.towards[Math.floor(e*H.sit.fps)%H.sit.towards.length])}const Z=this.assets.witch.frames[I],j=N+Z.h*this.mpp;this.witchBatch.set([{x:B,y:N,z,frame:Z,flip:x.seated?!1:x.facing<0}]);{const oe=(Ze,lt,gt)=>{const ut=this.v3.set(Ze,lt,gt).project(this.camera);return[(ut.x+1)/2*this.width,(ut.y+1)/2*this.height]},ge=oe(B,N,z),Me=oe(B,j,z),Ne=oe(B+Z.w*this.mpp/2,N,z);Nt.uWitch.value.set((ge[0]+Me[0])/2,(ge[1]+Me[1])/2,Math.abs(Ne[0]-ge[0])+1,Math.abs(Me[1]-ge[1])/2+1),Nt.uWitchDepth.value=-this.v3.set(B,this.seatK>0?N:v,z).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(B,.03,z),this.shadow.scale.setScalar((1-.5*Ao(x))*(1-this.seatK)+.001),this.refresh(),this.easeAppearing();const ce=this.lastView;ce&&(this.stats.forestMissing=i.forest.prefetch(ce.x+x.vx*2,ce.z+x.vz*2,ce.half+64,4)),this.stats.forestMs=i.forest.buildMs,i.forest.buildMs=0,this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,x.x,x.z);const ye=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,ye.x,ye.z,x.x,x.z,e,s.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,j),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),x.x,x.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let _e=0;for(const oe of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])_e+=oe.dropped;_e&&!this.stats.dropped&&console.warn(`view: ${_e} sprite instances set but not drawn`),this.stats.dropped=_e,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const Qy="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",jy="Lab default",ew={},tw={_readme:Qy,name:jy,style:ew};function nw(n=tw){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=C5();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function iw(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let m=p.clientX-a,M=p.clientY-o;const g=Math.hypot(m,M);g>s&&(m*=s/g,M*=s/g),i.style.transform=`translate(${m}px, ${M}px)`;const x=Math.min(1,g/s),v=.15,y=x<v?0:(x-v)/(1-v)/Math.max(1e-6,x);e.x=m/s*y,e.y=M/s*y});const d=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d);const f=(p,m)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",g=>{g.preventDefault(),g.stopPropagation(),m(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const sw=[{version:null,items:["Nothing floats any more: trees, rocks, ruins, the treehouse and set pieces all stand on the ground, and big scenery keeps clear of the soundsystems","Fewer ruins, rocks, relics, stairs and bridges: each is a find now, not clutter","The witch's own light is a tighter pool round her that fades out within about 40 m (try ?glow=50,2.5 to tune it)","Garden walls stand in joined runs along the paths, with flower beds in rows beside them; shrine stones stand in circles; hedges, brambles and rock walls run in lines; water, reeds and boulders gather in clumps, with open ground between","The edge of the see-through hole in the treetops round the witch fades smoothly (no dither)","Big rune stones now mark where every soundsystem will come, glowing with their area's creature's sigil. The next wave's stones wake: they pulse to the beat, throw light and motes, brighter as the wave nears, and send a beam above the trees; when the party arrives the stone flares and sinks as its soundsystem appears. The random rune stones are gone"]},{version:144,items:["Points where a branch line leaves the railway"]},{version:136,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],rw={entries:sw},hn=new URLSearchParams(location.search);let ws=Ap(hn.get("seed"));ws===null&&(ws=Math.floor(Math.random()*1e6),hn.set("seed",String(ws)),history.replaceState(null,"","?"+hn.toString()+location.hash));const Jt={...os,bloom:{...os.bloom},tiltShift:{...os.tiltShift},shadows:{...os.shadows},canopyShadow:{...os.canopyShadow},mist:{...os.mist},party:{...os.party}};hn.get("shadows")==="off"&&(Jt.shadows.on=!1);hn.get("canopy")==="off"&&(Jt.canopyShadow.on=!1);hn.get("mist")==="off"&&(Jt.mist.on=!1);const Ia=hn.get("tilt");Ia==="off"?Jt.tiltShift.on=!1:(Ia==="before"||Ia==="after")&&(Jt.tiltShift.on=!0,Jt.tiltShift.where=Ia);hn.get("bloom")==="off"&&(Jt.bloom.on=!1);hn.get("moonbeams")==="on"&&(Jt.moonbeams=1);const rr=hn.get("glow")?.split(",").map(Number);rr&&rr[0]>0&&(Jt.glowReach=rr[0]);rr&&rr[1]>0&&(Jt.glowFalloff=rr[1]);const gl=hn.get("fx");(gl==="pixel"||gl==="smooth")&&(Jt.fx=gl);const tn=sm(ws,Jt),hf=[30,60,120,300,600,0];function uf(n){Jt.party.interval=n>0?n:1e9,tn.party.paused=n===0,tn.party.nextAt=tn.clock.time+Jt.party.startDelay+Jt.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Xc=Jt.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&hf.includes(+n)&&(Xc=+n)}catch{}const xl=hn.get("wave");xl!==null&&(Xc=xl==="off"?0:Math.max(0,+xl||0));const aw=document.getElementById("game"),Ml=nw(),Kc={viewStart:performance.now(),view:0,ready:0},Gn=new Jy(aw,tn,{...Ml,pixel:Jt.pixelSize,treeSize:Ml.treeSize*Jt.treeHeight,crownWidth:Ml.crownWidth*Jt.crownWidth/Jt.treeHeight});Kc.view=performance.now();Gn.debugCull=hn.get("debug")==="cull";Gn.quick=hn.get("quick")==="1";const Bu=Number(hn.get("scenery"));hn.has("scenery")&&Bu>0&&(Gn.sceneryFixed=Bu);const _r=new N1;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),_r.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),_r.touch.pauseWaves=!0});iw(document.body,_r.touch);Gn.rulers.on=hn.has("debug");const df=()=>{Gn.rulers.on=!Gn.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&df()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),df()});const ff=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&ff.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=ff.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v162 · 60028a8";const ow=document.getElementById("news"),lw="v162 · 60028a8".split(" ")[0],cw=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);ow.innerHTML="<b>What's new</b>"+rw.entries.filter(n=>n.items.length).slice(0,3).map(n=>`<div>${n.version===null?`${lw} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${cw(e)}</li>`).join("")}</ul>`).join("");const hw=document.getElementById("seed");hw.innerHTML=`seed <a href="?seed=${ws}">${ws}</a>`;const fc=document.getElementById("debug"),qc=document.getElementById("start"),pf=document.getElementById("debug-buttons"),$c=document.getElementById("wave"),uw=$c.querySelector(".fill"),dw=$c.querySelector(".label");let ts=hn.has("debug");fc.classList.toggle("on",ts);pf.classList.toggle("on",ts);const mf=()=>Gn.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",mf);mf();let fr=!1;const Zc=document.getElementById("progress"),fw=Zc.querySelector(".fill"),pw=Zc.querySelector(".label"),mw=setInterval(()=>{const n=Gn.assets,e=n.done,t=e+n.pending;fw.style.width=`${t?100*e/t:0}%`,pw.textContent=fr?`the rest of the forest, in the background: ${e} of ${t}`:`growing the forest: ${e} of ${t}`,fr&&!n.pending&&(Zc.classList.add("done"),clearInterval(mw))},250);requestAnimationFrame(()=>setTimeout(async()=>{await Gn.prepare(),fr=!0,Kc.ready=performance.now(),qc.classList.remove("loading")},0));let zu=null;function gf(){if(!fr||!tn.clock.paused)return!1;try{zu??=new AudioContext,zu.resume()}catch{}return tn.clock.paused=!1,qc.style.display="none",_r.clearPresses(),!0}_r.onAny=gf;qc.addEventListener("pointerdown",n=>{n.preventDefault(),gf()});const xf=document.getElementById("waves");xf.innerHTML="waves every "+hf.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");xf.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;uf(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});uf(Xc);document.addEventListener("visibilitychange",()=>{document.hidden&&(Ya=0)});let Hu=0,Ya=0,Gu=60,vl=0,Oa=0;function Mf(n){requestAnimationFrame(Mf);const e=Ya?(n-Ya)/1e3:0;Ya=n,vl++,Oa+=e,Oa>=.5&&(Gu=vl/Oa,vl=0,Oa=0);const t=_r.read();if(t.debug&&(ts=!ts,fc.classList.toggle("on",ts),pf.classList.toggle("on",ts)),Gn.debugReadouts=ts,rm(tn,t,e),!fr)return;const i=gd(tn.party,tn.map,tn.clock.time);uw.style.height=`${(1-i.gone)*100}%`;const s=Jt.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(dw.textContent=`wave ${tn.party.wave} · ${tn.party.areas.size} areas · ${s}`,$c.classList.toggle("paused",tn.party.paused),!(tn.clock.paused&&n-Hu<300)&&(Hu=n,Gn.render(tn.clock.time),ts)){const r=tn.witch,a=Gn.stats;fc.textContent=[`fps    ${Gu.toFixed(0)}`,`seed   ${ws}`,`area   ${xd(tn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${tn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Mf);window.witch={game:tn,view:Gn,areaUnderWitch:()=>xd(tn),areaTypeId:n=>Ft[n].id,spriteUp:()=>Nt.uUp.value,loadTimes:Kc,get ready(){return fr}};
