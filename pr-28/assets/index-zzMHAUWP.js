(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function jn(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Re(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ki(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),l=Re(i,s,t),d=Re(i+1,s,t),f=Re(i,s+1,t),u=Re(i+1,s+1,t);return l+(d-l)*o+(f-l)*h+(l-d-f+u)*o*h}const Zn=(n,e,t)=>n+(e-n)*t,In=(n,e,t)=>Math.min(t,Math.max(e,n)),sn=n=>{const e=In(n,0,1);return e*e*(3-2*e)};function Df(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=In(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function _o(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function If(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),l=In(n.zoomStep+Math.sign(e),0,h-1),d=h>1?l/(h-1):0;let f=i.x*o.lookAhead,u=i.z*o.lookAhead;const m=Math.hypot(f,u);m>o.lookAheadMax&&(f*=o.lookAheadMax/m,u*=o.lookAheadMax/m);const p=1-Math.exp(-o.lookAheadEase*r),M=n.ax+(f-n.ax)*p,g=n.az+(u-n.az)*p,[x,v]=_o(n.tx,n.vx,t.x+M,o.follow,r),[b,w]=_o(n.ty,n.vy,t.y,o.follow,r),[E,y]=_o(n.tz,n.vz,t.z+g,o.follow,r),A=n.zoom+(d-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r)),S=a.treetop,R=In((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(S.boost-1)),0,1),T=(n.pull??0)+(S.cameraPull*R*sn(_)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:l,zoom:A,tx:x,ty:b,tz:E,vx:v,vy:w,vz:y,ax:M,az:g,lift:In(_,0,1),pull:T}}function Xu(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=sn(e),a=Zn(Zn(i.angleIn,i.angleOut,n.zoom),Zn(s.angleIn,s.angleOut,n.zoom),r),o=Zn(Zn(i.distanceIn,i.distanceOut,n.zoom),Zn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0)),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Of=.1,Nf=()=>({time:0,paused:!0});function Ff(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Of,e);return n.time+=t,t}const Uf={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},kf={types:Uf};function qr(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function $r(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const pe=(n,e,t)=>e+(t-e)*n(),xc=(n,e)=>e[Math.floor(n()*e.length)];function ft(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function wi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),l=ft(i,s,t),d=ft(i+1,s,t),f=ft(i,s+1,t),u=ft(i+1,s+1,t);return l+(d-l)*o+(f-l)*h+(l-d-f+u)*o*h}function de(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,l,d]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(l*255),Math.round(d*255)]}const c={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},yo=4;function Ku(n,e,t,i=.12){const s=(r,a,o,h)=>{const l=o-r,d=h-a,f=Math.max(0,Math.min(1,((n-r)*l+(e-a)*d)/(l*l+d*d)));return Math.hypot(n-r-l*f,e-a-d*f)<i};switch((t%yo+yo)%yo){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const Bf=new Set([c.GLINT,c.MAGIC,c.MAGIC2,c.RUNE,c.GLOW,c.COLLAR,c.WOKEN]);function uh(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),l=r(o),d=r(o+1),f=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(d[0]-l[0],d[1]-l[1])/1.5),t);for(let m=0;m<u;m++){const p=m/u,M=p*p,g=M*p;s.push([0,1].map(x=>.5*(2*l[x]+(-h[x]+d[x])*p+(2*h[x]-5*l[x]+4*d[x]-f[x])*M+(-h[x]+3*l[x]-3*d[x]+f[x])*g)))}}return e||s.push(n[i-1]),s}function zf(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const l=n[Math.max(0,h-1)],d=n[Math.min(r-1,h+1)];let f=d[0]-l[0],u=d[1]-l[1];const m=Math.hypot(f,u)||1;f/=m,u/=m;const p=n[h][2]/2;i.push([n[h][0]-u*p,n[h][1]+f*p]),s.push([n[h][0]+u*p,n[h][1]-f*p])}const a=(h,l,d,f)=>{let u=h[0]-l[0],m=h[1]-l[1];const p=Math.hypot(u,m)||1;return[h[0]+u/p*d/2*f,h[1]+m/p*d/2*f]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const bt=(n,e)=>[n[0]+e[0],n[1]+e[1]],Tn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function co(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],l=n[(o+1)%n.length];let d=l[0]-h[0],f=l[1]-h[1];const u=Math.hypot(d,f)||1,m=f/u*r,p=-d/u*r;for(let M=1;M<=i;M++){const g=(M-.5)/i,x=Tn(h,l,g),v=[x[0]+m*s-d/u*s*.5,x[1]+p*s-f/u*s*.5];a.push(Tn(h,l,g-.45/i),v,Tn(h,l,g+.35/i))}}return a}function dh(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let l=0,d=t.length-1;l<t.length;d=l++){const[f,u]=t[l],[m,p]=t[d];u>o!=p>o&&h.push(f+(o-u)/(p-u)*(m-f))}h.sort((l,d)=>l-d);for(let l=0;l+1<h.length;l+=2)for(let d=Math.max(0,Math.ceil(h[l]-.5));d<=Math.min(n-1,Math.floor(h[l+1]-.5));d++)i[a*n+d]=1}return i}function Hf(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,l,d,f,u)=>{const m=l+f,p=d+u;let M,g;if(m<0||p<0||m>=n||p>=e)M=f,g=u;else{const x=p*n+m;M=s[x]+f,g=r[x]+u}M*M+g*g<a(h)&&(s[h]=M,r[h]=g)};for(let h=0;h<e;h++){for(let l=0;l<n;l++){const d=h*n+l;t[d]&&(o(d,l,h,-1,0),o(d,l,h,0,-1),o(d,l,h,-1,-1),o(d,l,h,1,-1))}for(let l=n-1;l>=0;l--){const d=h*n+l;t[d]&&o(d,l,h,1,0)}}for(let h=e-1;h>=0;h--){for(let l=n-1;l>=0;l--){const d=h*n+l;t[d]&&(o(d,l,h,1,0),o(d,l,h,0,1),o(d,l,h,1,1),o(d,l,h,-1,1))}for(let l=0;l<n;l++){const d=h*n+l;t[d]&&o(d,l,h,-1,0)}}return{vx:s,vy:r}}class pt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:l=0,seed:d=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let m=Math.max(0,Math.floor(e-i-1));m<Math.min(this.w,e+i+1);m++){const p=(m+.5-e)/i,M=(u+.5-t)/s,g=p*p+M*M;if(g>1)continue;const x=u*this.w+m;if(o&&!o.has(this.m[x]))continue;if(h<1){const E=l?wi(m/3.2,u/3.2,d)*l+(1-l)*.5:.5;if(ft(m,u,d+77)>h*(.4+E*1.2)*(1.15-g*.5))continue}const v=p*f,b=M*f,w=Math.hypot(v,b,Math.sqrt(Math.max(0,1-g))+.15);this.px(m,u,r,v/w,b/w,(Math.sqrt(Math.max(0,1-g))+.15)/w)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let d=0;d<=l;d++){const f=d/l,u=e+(i-e)*f,m=t+(s-t)*f,p=Math.max(.5,(r+(a-r)*f)/2);for(let M=Math.floor(m-p);M<=m+p;M++)for(let g=Math.floor(u-p);g<=u+p;g++){const x=(g+.5-u)/p,v=(M+.5-m)/p;if(x*x+v*v>1)continue;const b=x*h,w=Math.hypot(b,v*.3,1);this.px(g,M,o,b/w,v*.3/w,1/w)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const l=(p,M,g,x,v,b)=>(p-v)*(x-b)-(g-v)*(M-b),d=Math.max(0,Math.floor(Math.min(i,r,o))),f=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),m=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let p=u;p<m;p++)for(let M=d;M<f;M++){const g=M+.5,x=p+.5,v=l(g,x,i,s,r,a),b=l(g,x,r,a,o,h),w=l(g,x,o,h,i,s);(v<0||b<0||w<0)&&(v>0||b>0||w>0)||this.px(M,p,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(dh(this.w,this.h,uh(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(zf(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:l=[0,0],lineMat:d=c.LINE}={}){const{w:f,h:u}=this;if(o)for(let g=0;g<f*u;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:m,vy:p}=Hf(f,u,e);let M=r;if(!M){for(let g=0;g<f*u;g++)e[g]&&(M=Math.max(M,Math.hypot(m[g],p[g])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let g=0;g<u;g++)for(let x=0;x<f;x++){const v=g*f+x;if(!e[v])continue;if(h){this.m[v]=t;continue}const b=Math.hypot(m[v],p[v]),w=Math.min(1,Math.max(0,(b-.5)/M)),E=Math.min(2.6,(1-w)/Math.sqrt(Math.max(.02,1-(1-w)*(1-w))))*a;let y=m[v]/(b||1)*E+l[0],A=p[v]/(b||1)*E+l[1];const _=Math.hypot(y,A,1);this.m[v]=t,this.n[v*3]=y/_,this.n[v*3+1]=A/_,this.n[v*3+2]=1/_}if(s&&!h){const g=[];for(let x=0;x<u;x++)for(let v=0;v<f;v++){const b=x*f+v;if(e[b])for(const[w,E]of[[1,0],[-1,0],[0,1],[0,-1]]){const y=v+w,A=x+E;if(y<0||A<0||y>=f||A>=u)continue;const _=A*f+y;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==d){g.push(b);break}}}for(const x of g)this.m[x]=d}if(!h)for(let g=0;g<f*u;g++)e[g]&&(this.g[g]=i);return e}mark(e,t,i,s={}){return this.fillMask(dh(this.w,this.h,uh(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(d=>d.length)),h=new Uint8Array(this.w*this.h),l=new Map;e.forEach((d,f)=>[...d].forEach((u,m)=>{const p=t[u];if(!p)return;const M=i+(a?o-1-m:m),g=s+f;this.inb(M,g)&&(h[g*this.w+M]=1,l.set(g*this.w+M,p))})),this.fillMask(h,c.BODY,{round:r,depth:2.5});for(const[d,f]of l)this.m[d]=f}}function gn(n,e,t,i=t.outline,s=qr){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),l=o(),d=o(),f=h.getContext("2d").createImageData(r,a),u=l.getContext("2d").createImageData(r,a),m=d.getContext("2d").createImageData(r,a),p=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let g=0;g<r;g++){const x=M*r+g,v=n.m[x],b=x*4;if(!v){if(!p)continue;const _=[n.get(g+1,M),n.get(g-1,M),n.get(g,M+1),n.get(g,M-1)].find(R=>R);if(!_)continue;const S=p==="tint"?(e[_]||[0,0,0]).map(R=>R*.35|0):p;f.data.set([...S,255],b),u.data.set([128,128,255,255],b),m.data.set([128,128,255,255],b);continue}let w=e[v];v===c.LINE&&!w&&(w=p==="tint"||!p?(e[c.BODY2]||[0,0,0]).map(_=>_*.55|0):p),w=w||[255,0,255],f.data.set([...w,Bf.has(v)?254:255],b);const E=n.n[x*3],y=n.n[x*3+1],A=n.n[x*3+2];u.data.set([E*127+128,y*127+128,A*255,255],b),m.data.set([-E*127+128,y*127+128,A*255,255],b)}return h.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(u,0,0),d.getContext("2d").putImageData(m,0,0),{A:h,N:l,NF:d,w:r,h:a}}const ns=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},zr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Vt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Jn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],P={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Jn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ns,cross:zr,dot:Vt};function fh(n,e=[0,1,0]){const t=ns(n);let i=zr(e,t);Math.hypot(...i)<1e-4&&(i=zr([0,0,1],t)),i=ns(i);const s=zr(t,i);return[t,s,i]}function qu(n,e){const t=Vt(n,e.axes[0]),i=Vt(n,e.axes[1]),s=Vt(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),l=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return l>1e-9?h*(h-1)/l:-Math.min(r,a,o)}function $u(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,l=Vt(n,t),d=l-i,f=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],u=Vt(f,f),m=l*l*i,p=d*d*i,M=Math.sign(s)*s*s*u;return Math.sign(d)*r*p>M?Math.sqrt(u+p)*a-h:Math.sign(l)*r*m<M?Math.sqrt(u+m)*a-o:(Math.sqrt(u*r*a)+l*s)*a-o}function Zu(n,e){const t=Math.abs(Vt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Vt(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Vt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const Gf=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),ph=(n,e)=>n.type==="ell"?qu(Jn(e,n.cw),n):n.type==="box"?Zu(Jn(e,n.cw),n):$u(Jn(e,n.aw),n),yr=(n,e)=>n.rough?ph(n,e)+Gf(e,n.rough):ph(n,e);class qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?fh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?fh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:ns(t),v:ns(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=qu(Jn(e,i.c),i);else if(i.type==="box")s=Zu(Jn(e,i.c),i);else{const r=Jn(i.b,i.a),a=Math.max(1e-9,Vt(r,r)),o=i.r1-i.r2;s=$u(Jn(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const mh={towards:.6,away:-.6},Wf=.52;function xn(n,{height:e,scale:t,facing:i="towards",yaw:s=mh[i]??mh.towards,pitch:r=Wf,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),l=Math.cos(r),d=Math.sin(r),f=F=>[F[0]*o-F[2]*h,F[1],F[0]*h+F[2]*o],u=F=>[F[0]*o+F[2]*h,F[1],-F[0]*h+F[2]*o],m=[0,-d,-l],p=[0,l,-d],M=[1,0,0],g=[0,d,l],x=n.blend,v=n.parts.map(F=>{if(F.type==="ell"){const oe=f(F.c),ge=F.axes.map(f),Me=Math.max(...F.r);return{...F,cw:oe,axes:ge,bc:oe,br:Me+(F.rough||0)*1.5}}if(F.type==="box"){const oe=f(F.c),ge=F.axes.map(f);return{...F,cw:oe,axes:ge,bc:oe,br:Math.hypot(...F.h)+(F.rough||0)*1.5}}const Z=f(F.a),j=f(F.b),ce=Jn(j,Z),ye=Math.max(1e-9,Vt(ce,ce)),be=F.r1-F.r2;return{...F,aw:Z,ba:ce,l2:ye,rr:be,a2:ye-be*be,il2:1/ye,bc:P.lerp(Z,j,.5),br:Math.sqrt(ye)/2+Math.max(F.r1,F.r2)}}),b=n.flats.map(F=>{const Z=f(F.c),j=f(F.u),ce=f(F.v);return{...F,cw:Z,uw:j,vw:ce,nw:ns(zr(j,ce)),bc:Z,br:Math.hypot(F.su,F.sv)}}),w=[...v,...b],E=F=>{const Z=Vt(F.bc,M),j=Vt(F.bc,p),ce=F.br+(F.uw?0:x);return[Z-ce,Z+ce,j-ce,j+ce]};for(const F of w)[F.x0,F.x1,F.u0,F.u1]=E(F);const y=w.filter(F=>!F.extra&&!F.cut),A=Math.min(...y.map(F=>F.u0+(F.uw?0:x))),_=Math.max(...y.map(F=>F.u1-(F.uw?0:x))),S=t??e/Math.max(1e-6,_-A),R=Math.min(...w.map(F=>F.x0)),T=Math.max(...w.map(F=>F.x1)),L=Math.min(...w.map(F=>F.u0)),O=Math.max(...w.map(F=>F.u1)),I=Math.ceil((T-R)*S)+4,k=Math.ceil((O-L)*S)+2,H=new pt(I,k),K=new Float32Array(I*k).fill(1/0),ae=new Int16Array(I*k).fill(-1),q=8,ie=Math.ceil(I/q),N=Math.ceil(k/q),ee=Array.from({length:ie*N},()=>[]);w.forEach((F,Z)=>{const j=Math.max(0,Math.floor((F.x0-R)*S/q)),ce=Math.min(ie-1,Math.floor(((F.x1-R)*S+2)/q)),ye=Math.max(0,Math.floor((O-F.u1)*S/q)),be=Math.min(N-1,Math.floor(((O-F.u0)*S+1)/q));for(let oe=ye;oe<=be;oe++)for(let ge=j;ge<=ce;ge++)ee[oe*ie+ge].push(Z)});const se=.25/S,ue=(F,Z)=>{const j=Math.max(x-Math.abs(F-Z),0)/x;return Math.min(F,Z)-j*j*x*.25};for(let F=0;F<k;F++)for(let Z=0;Z<I;Z++){const j=ee[Math.floor(F/q)*ie+Math.floor(Z/q)];if(!j.length)continue;const ce=R+(Z+.5-1)/S,ye=O-(F+.5)/S,be=P.add(P.add(P.mul(M,ce),P.mul(p,ye)),P.mul(g,50));let oe=1/0,ge=-1/0;const Me=[],Ne=[];for(const tt of j){const Xe=w[tt],U=Jn(be,Xe.bc),C=Vt(U,m),G=Xe.br+(Xe.uw?0:x),$=Vt(U,U)-G*G,te=C*C-$;if(te<0)continue;if(Xe.uw){Ne.push(Xe);continue}if(Xe.cut){Me.push(Xe);continue}const me=Math.sqrt(te);oe=Math.min(oe,-C-me),ge=Math.max(ge,-C+me),Me.push(Xe)}let Ze=1/0,lt=-1,gt=0,ut=null;if(Me.length){const tt=new Map;for(const C of Me){let G=tt.get(C.group);G||tt.set(C.group,G=[]),G.push(C)}const Xe=(C,G)=>{let $=1/0;for(const te of C)te.cut||($=$===1/0?yr(te,G):ue($,yr(te,G)));for(const te of C)te.cut&&($=Math.max($,-yr(te,G)));return $};let U=Math.max(0,oe);for(let C=0;C<96&&U<ge;C++){const G=P.add(be,P.mul(m,U));let $=1/0,te=null;for(const[me,ve]of tt){const re=Xe(ve,G);re<$&&($=re,te=me)}if($<se){const me=tt.get(te),ve=.5/S;ut=ns([Xe(me,[G[0]+ve,G[1],G[2]])-Xe(me,[G[0]-ve,G[1],G[2]]),Xe(me,[G[0],G[1]+ve,G[2]])-Xe(me,[G[0],G[1]-ve,G[2]]),Xe(me,[G[0],G[1],G[2]+ve])-Xe(me,[G[0],G[1],G[2]-ve])]);let re=me[0],le=1/0;for(const _e of me){if(_e.cut)continue;const ke=yr(_e,G);ke<le&&(le=ke,re=_e)}for(const _e of me)if(_e.cut&&-yr(_e,G)>le-se*2){re=_e;break}Ze=U,lt=te,gt=re.paint?re.paint(u(G),re)??re.mat:re.mat;break}U+=Math.max($*.9,se*.5)}}for(const tt of Ne){const Xe=Vt(m,tt.nw);if(Math.abs(Xe)<1e-4)continue;const U=Vt(Jn(tt.cw,be),tt.nw)/Xe;if(U>=Ze)continue;const C=P.add(be,P.mul(m,U)),G=Jn(C,tt.cw),$=Vt(G,tt.uw)/tt.su,te=Vt(G,tt.vw)/tt.sv;if(Math.abs($)>1||Math.abs(te)>1)continue;const me=tt.mask($,te);if(!me)continue;let ve=Xe>0?P.mul(tt.nw,-1):tt.nw;ve=ns(P.add(ve,P.add(P.mul(tt.uw,$*tt.bend),P.mul(tt.vw,te*tt.bend*.5)))),Ze=U,lt=tt.group,gt=me,ut=ve}if(!ut||!gt)continue;const Y=F*I+Z;K[Y]=Ze,ae[Y]=lt,H.px(Z,F,gt,Vt(ut,M),-Vt(ut,p),Vt(ut,g))}const xe=[];for(let F=0;F<k;F++)for(let Z=0;Z<I;Z++){const j=F*I+Z;if(H.m[j])for(const[ce,ye]of[[1,0],[-1,0],[0,1],[0,-1]]){const be=Z+ce,oe=F+ye;if(be<0||oe<0||be>=I||oe>=k)continue;const ge=oe*I+be;if(H.m[ge]&&ae[ge]!==ae[j]&&K[ge]-K[j]>a){xe.push(j);break}}}for(const F of xe)[c.EYE,c.GLINT,c.MAGIC,c.MAGIC2,c.NOSE,c.COLLAR,c.WOKEN,c.RUNE,c.GLOW].includes(H.m[F])||(H.m[F]=c.LINE);for(let F=0;F<k;F++)for(let Z=0;Z<I;Z++){const j=F*I+Z;if(H.m[j]!==c.EYE)continue;const ce=F>0&&H.m[j-I]===c.EYE,ye=Z>0&&H.m[j-1]===c.EYE,be=Z+1<I&&H.m[j+1]===c.EYE&&F+1<k&&H.m[j+I]===c.EYE;!ce&&!ye&&be&&(H.m[j]=c.GLINT)}let Le=-1;for(let F=k-1;F>=0&&Le<0;F--)for(let Z=0;Z<I;Z++)if(H.m[F*I+Z]){Le=F;break}const B=Le>=0&&Le<k-1?k-1-Le:0;if(Le>=0&&Le<k-1){const F=k-1-Le;for(let Z=k-1;Z>=0;Z--)for(let j=0;j<I;j++){const ce=Z*I+j,ye=(Z-F)*I+j,be=Z-F>=0;H.m[ce]=be?H.m[ye]:0,H.g[ce]=be?H.g[ye]:0;for(let oe=0;oe<3;oe++)H.n[ce*3+oe]=be?H.n[ye*3+oe]:0}}return H.bodyH=Math.round((_-A)*S),{sp:H,s:S,project:F=>{const Z=f(F);return[+((Z[0]-R)*S+1).toFixed(1),+((O-Vt(Z,p))*S+B).toFixed(1)]}}}const hi=(n,e=9,t=.3)=>ft(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Es={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=c.EAR,t=c.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},Vf={hair:c.HAIR,hat:c.HAT,headphones:c.PHONES,top:c.TOP,jacket:c.JACKET,jeans:c.JEANS,sneakers:c.SHOES,broom:c.BROOM,bristles:c.STRAW,skin:c.SKIN},gh={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Yf(n,e=gh){const t={...gh,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(Vf)){const[o,h,l]=t[r];s[a]=de(i[r]??o,h,l)}return s[c.EYE]=[24,18,30],s[c.GLINT]=[255,255,245],s[c.NOSE]=[20,16,24],s[c.MAGIC]=de(n.glowHue??.13,.5,1),s[c.MAGIC2]=de(n.glowHue??.13,.15,1),s[c.BELLY]=[245,245,240],s}const Xf={rise:.78,descend:-.66,brake:.44};function Kf(n){const e=new qe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=p=>i-s*(p/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,c.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],c.STRAW,{dir:[1,s*1.6,0],group:3,paint:p=>p[0]<-.76?c.MAGIC2:p[0]>-.5?c.BROOM:void 0});const o=[-1,1].map(p=>[.5,a(.5)+.03,p*.045]),h=[-1,1].map(p=>[.2,i+.24+r[1],p*.1]);for(const p of[0,1]){const M=p?1:-1,g=M>0?7:5;e.seg(h[p],o[p],.04,.03,c.JACKET,{group:g}),e.ell(o[p],[.035,.03,.035],c.SKIN,{group:g})}const l=[.3+r[0],i+.27+r[1],0],d=[.07,i+.28+r[1]*.5,0],f=[-.15,i+.35+r[2],0];e.ell(d,[.17,.1,.11],c.JACKET,{dir:[1,-.25,0],group:1,paint:p=>p[1]<d[1]-.04&&Math.abs(p[2])<.055?c.TOP:void 0}),e.ell(f,[.11,.08,.1],c.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...P.add(f,[-.02,.06,0]),.07],[...P.add(f,[-.18,.08+r[0]*2,0]),.05],[...P.add(f,[-.34,.05+r[1]*3,.02]),.025]],c.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([p,M],g)=>{const x=g?6:4,v=P.add(f,[-.04,0,g?.06:-.06]);e.seg(v,p,.055,.045,c.JEANS,{group:x}),e.seg(p,M,.045,.04,c.JEANS,{group:x}),e.ell(P.add(M,[-.05,0,0]),[.08,.04,.045],c.SHOES,{dir:[-1,.3,0],group:x,paint:b=>b[1]<M[1]-.03?c.BELLY:void 0})}),e.ell(l,[.11,.115,.1],c.SKIN,{group:8,paint:p=>p[0]<l[0]-.01||p[1]>l[1]+.075?c.HAIR:void 0});for(const p of[-1,1]){const M=qe.surface(l,[.11,.115,.1],P.norm([.85,.1,p*.45]));e.ell(M,[.026,.036,.026],c.BELLY,{group:8}),e.ell(P.add(M,[.012,0,p*.004]),[.014,.018,.014],c.EYE,{group:8})}e.ell(qe.surface(l,[.11,.115,.1],P.norm([1,-.45,0])),[.012,.016,.04],c.BELLY,{group:8}),e.chain([[...P.add(l,[-.06,.03,0]),.065],[...P.add(l,[-.22,.05+r[1]*2,.01]),.05],[...P.add(l,[-.4,.06+r[2]*3,.02]),.03],[...P.add(l,[-.55,.07+r[0]*3,.02]),.012]],c.HAIR,{group:9});for(const p of[-1,1])e.ell(P.add(l,[-.015,0,p*.105]),[.05,.055,.03],c.PHONES,{group:10});e.chain([[...P.add(l,[-.005,.03,-.095]),.015],[...P.add(l,[-.02,.12,0]),.015],[...P.add(l,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const m=P.add(l,[-.1+r[0],.2+r[1]*2,0]);e.ell(m,[.16,.014,.15],c.HAT,{dir:[1,.9,0],group:11}),e.chain([[...P.add(m,[-.02,.02,0]),.08],[...P.add(m,[-.14,.13,0]),.04],[...P.add(m,[-.3,.14+r[2]*2,0]),.012]],c.HAT,{group:11,paint:p=>Math.hypot(p[0]-m[0],p[1]-m[1])<.06?c.MAGIC:void 0}),e.seg(P.add(m,[.08,-.02,.08]),P.add(l,[.04,-.09,.08]),.008,.008,c.HAT,{group:11});for(const[p,M,g,x]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([p-v,M,g],[p-v-x,M,g],.01,.004,c.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),e}const Ju={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},js=.34,Qu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},qf={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Qu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,js+.14,.15],far:[.18,js+.14,-.13],hand:"rest"}))};function $f(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=P.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function Zf(n,e){const t=qf[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Qu,...t[e%t.length]},s=new qe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?js+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,l=!!i.broom.astride,d=o-.04,f=l?[1,0,0]:P.norm(i.broom.dir),u=l?[-.36,d,0]:i.broom.binding,m=S=>P.add(u,P.mul(f,S));s.seg(m(0),m(l?.98:1.1),.022,.018,c.BROOM,{group:2}),s.ell(m(-.13),[.17,.07,.08],c.STRAW,{dir:f,group:3,paint:S=>{const R=P.dot(P.sub(S,u),f);return R<-.22?c.MAGIC2:R>-.01?c.BROOM:void 0}});for(const S of[-1,1]){const R=S>0?6:4,T=[h,o,S*.07],L=i.sit?i.swing*S:0,O=i.sit?[.24+L,.09+Math.max(0,L)*.6,S*.1]:S>0&&i.legUp?i.legUp:[(S>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),S*.1],I=i.sit?[.21,o+.01,S*.09]:$f(T,O,.21);s.seg(T,I,.055,.045,c.JEANS,{group:R}),s.seg(I,O,.045,.04,c.JEANS,{group:R});const k=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(P.add(O,k),[.08,.04,.045],c.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:R,paint:H=>H[1]<O[1]+k[1]-.015?c.BELLY:void 0})}const p=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],g=[h,o+.03,0];s.ell(g,[.1,.08,.105],c.JEANS,{group:1});const x=P.add(g,P.add(P.mul(p,.19),[0,i.breathe,0]));s.ell(x,[.1,.15+i.breathe*.5,.115],c.JACKET,{dir:M,group:1,paint:S=>P.dot(P.sub(S,x),M)>.045&&Math.abs(S[2])<.05?c.TOP:void 0}),s.chain([[...P.add(x,P.add(P.mul(M,-.07),P.mul(p,-.08))),.07],[...P.add(x,P.add(P.mul(M,-.11-a),P.mul(p,-.2))),.05],[...P.add(x,P.add(P.mul(M,-.13-a*1.6),P.mul(p,-.29))),.025]],c.JACKET,{group:12});const v=P.add(x,P.add(P.mul(p,.27),[i.look*.03,0,i.tilt*.04])),b=S=>P.add(x,P.add(P.mul(p,.1),[0,0,S*.12])),w=l?[.28,d+.03,-.05]:m(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,f[1]))),E=l?[.28,d+.03,.05]:i.free;for(const S of[-1,1]){const R=S>0?7:5,T=b(S),L=S>0?E:i.far||w,O=S>0&&i.elbow?i.elbow:P.add(P.lerp(T,L,.5),[-.03,-.02,S*.05]);s.seg(T,O,.04,.035,c.JACKET,{group:R}),s.seg(O,L,.035,.03,c.JACKET,{group:R});const I=S>0&&!l?i.hand:"grip";if(I==="palm")s.ell(L,[.045,.02,.04],c.SKIN,{group:R});else if(I==="down")s.ell(L,[.045,.02,.04],c.SKIN,{dir:[1,.15,0],group:R});else if(I==="wave"){s.ell(L,[.03,.045,.04],c.SKIN,{group:R});for(const k of[-1,0,1])s.seg(P.add(L,[0,.03,k*.02]),P.add(L,[k*.01,.065,k*.03]),.01,.008,c.SKIN,{group:R})}else I==="point"?(s.ell(L,[.035,.03,.035],c.SKIN,{group:R}),s.seg(P.add(L,[0,.02,0]),P.add(L,[.01,.08,0]),.012,.01,c.SKIN,{group:R})):s.ell(L,[.035,.03,.035],c.SKIN,{group:R})}s.ell(v,[.11,.115,.1],c.SKIN,{group:8,paint:S=>S[0]<v[0]-.01||S[1]>v[1]+.075?c.HAIR:void 0});for(const S of[-1,1])s.ell(qe.surface(v,[.11,.115,.1],P.norm([.85,.05+i.look,S*.45+i.tilt*.1])),[.016,.026,.016],c.EYE,{group:8});i.mouth&&s.ell(qe.surface(v,[.11,.115,.1],P.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],c.NOSE,{group:8}),s.chain([[...P.add(v,[-.06,.02,0]),.06],[...P.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...P.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],c.HAIR,{group:9});for(const S of[-1,1])s.ell(P.add(v,[-.015,0,S*.105]),[.05,.055,.03],c.PHONES,{group:10});s.chain([[...P.add(v,[-.005,.03,-.095]),.015],[...P.add(v,[-.005,.11,-.05]),.015],[...P.add(v,[-.005,.125,0]),.015],[...P.add(v,[-.005,.11,.05]),.015],[...P.add(v,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const y=P.add(v,[-.03,.1,i.tilt*.02]),A=i.tilt*.05,_=P.add(y,[-.16-a*.5,.27,A*2]);return s.ell(y,[.16,.014,.15],c.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...P.add(y,[0,.01,0]),.085],[...P.add(y,[-.05,.17,A]),.045],[..._,.012]],c.HAT,{group:11,paint:S=>S[1]<y[1]+.045?c.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),s.anchors.hand=E,s.anchors.hatTip=_,s}function ju({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return Kf(n);if(Ju[t])return Zf(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new qe({blend:.03}),h=a?0:[0,.025,.045][n%3],l=a?0:[0,.015,-.01][n%3]+(e?.08:0),d=.42+h,f=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,f)),m=a?[.02,.06][n%2]:[0,.03,.05][n%3],p=s?1:i?-.6:0;o.seg([-.5,d-l*2,0],[.62,d+l*3,0],.022,.018,c.BROOM,{group:2}),r?o.ell([-.56,d-.08,0],[.17,.07,.09],c.STRAW,{dir:[.55,1,0],group:3,paint:b=>b[1]<d-.18?c.MAGIC2:b[1]>d-.01?c.BROOM:void 0}):o.ell([-.62,d-l*2-.01,0],[.17,.07,.08],c.STRAW,{dir:[1,l,0],group:3,paint:b=>b[0]<-.72?c.MAGIC2:b[0]>-.5?c.BROOM:void 0});for(const b of[-1,1]){const w=[-.04,d+.06,b*.07],E=r?[.18,d-.01,b*.14]:s?[.16,d-.05,b*.14]:i?[.06,d-.07,b*.14]:[.12+f*.5,d-.02,b*.14],y=r?b>0?[.44,d-.02+m,b*.13]:[.3,d-.16,b*.13]:s?[.2,d-.26,b*.13]:i?[-.1,d-.23,b*.13]:[.08+f,d-.2,b*.13];o.seg(w,E,.055,.045,c.JEANS,{group:b>0?6:4}),o.seg(E,y,.045,.04,c.JEANS,{group:b>0?6:4}),o.ell(P.add(y,[.05,-.02,0]),[.08,.04,.045],c.SHOES,{group:b>0?6:4,paint:A=>A[1]<y[1]-.04?c.BELLY:void 0})}o.ell([-.04,d+.08,0],[.11,.07,.1],c.JEANS,{group:1});const M=[0+f*.8,d+.26-Math.abs(f)*.3,0];o.ell(M,[.1,.16,.11],c.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:b=>b[0]>M[0]+.04&&Math.abs(b[2])<.055?c.TOP:void 0}),r?o.chain([[...P.add(M,[-.08,-.06,0]),.07],[...P.add(M,[-.02,.12+m,.02]),.05],[...P.add(M,[.14,.18+m,.03]),.025]],c.JACKET,{group:12}):a&&o.chain([[...P.add(M,[-.08,-.1,0]),.07],[...P.add(M,[-.2,-.12+p*(.08+m),0]),.05],[...P.add(M,[-.3,-.12+p*(.16+m*1.5),.02]),.025]],c.JACKET,{group:12});const g=P.add(M,[.03+f*.5,.26,0]),x=P.add(g,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const b of[-1,1]){const w=P.add(M,[.01,.11,b*.11]),E=s&&b>0?P.add(x,[.1,.01,.1]):r?[.3,d+.03,b*.05]:[.26+f,d+.03,b*.05],y=s&&b>0?P.add(w,[.1,.02,.1]):P.lerp(w,E,.5);o.seg(w,y,.04,.035,c.JACKET,{group:b>0?7:5}),o.seg(y,E,.035,.03,c.JACKET,{group:b>0?7:5}),o.ell(E,[.035,.03,.035],c.SKIN,{group:b>0?7:5})}o.ell(g,[.11,.115,.1],c.SKIN,{group:8,paint:b=>b[0]<g[0]-.01||b[1]>g[1]+.075?c.HAIR:void 0});for(const b of[-1,1])o.ell(qe.surface(g,[.11,.115,.1],P.norm([.85,.05,b*.45])),[.016,.026,.016],c.EYE,{group:8});r?o.chain([[...P.add(g,[-.06,.06,0]),.06],[...P.add(g,[.04,.13+m,.03]),.045],[...P.add(g,[.2,.08+m,.04]),.02]],c.HAIR,{group:9}):o.chain([[...P.add(g,[-.06,.02,0]),.06],[...P.add(g,[-.18-u,-.05+m+p*.1,.02]),.045],[...P.add(g,[-.3-u*1.5,-.08+m*1.6+p*.22,.03]),.02]],c.HAIR,{group:9});for(const b of[-1,1])o.ell(P.add(g,[-.015,0,b*.105]),[.05,.055,.03],c.PHONES,{group:10});o.chain([[...P.add(g,[-.005,.03,-.095]),.015],[...P.add(g,[-.005,.11,-.05]),.015],[...P.add(g,[-.005,.125,0]),.015],[...P.add(g,[-.005,.11,.05]),.015],[...P.add(g,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const v=i?.1:0;if(o.ell(x,[.16,.014,.15],c.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(r?[[...P.add(x,[0,.01,0]),.085],[...P.add(x,[.06,.16,0]),.045],[...P.add(x,[.2,.22+m*.5,0]),.012]]:[[...P.add(x,[0,.01,0]),.085],[...P.add(x,[-.05-u-v*.5,.17-v*.3,0]),.045],[...P.add(x,[-.16-u*1.5-v,.27+m*.5-v*.5,0]),.012]],c.HAT,{group:11,paint:b=>b[1]<x[1]+.045?c.MAGIC:void 0}),a){const b=Xf[t]+(r?[0,.06][n%2]:0),w=Math.cos(b),E=Math.sin(b),y=[0,d,0],A=T=>[y[0]+(T[0]-y[0])*w-(T[1]-y[1])*E,y[1]+(T[0]-y[0])*E+(T[1]-y[1])*w,T[2]],_=T=>[y[0]+(T[0]-y[0])*w+(T[1]-y[1])*E,y[1]-(T[0]-y[0])*E+(T[1]-y[1])*w,T[2]],S=T=>[T[0]*w-T[1]*E,T[0]*E+T[1]*w,T[2]];for(const T of o.parts)if(T.type==="ell"?(T.c=A(T.c),T.axes=T.axes.map(S)):(T.a=A(T.a),T.b=A(T.b)),T.paint){const L=T.paint;T.paint=(O,I)=>L(_(O),I)}for(const T of o.flats)T.c=A(T.c),T.u=S(T.u),T.v=S(T.v);const R=Math.min(...o.parts.map(T=>T.type==="ell"?T.c[1]-Math.max(...T.r):Math.min(T.a[1]-T.r1,T.b[1]-T.r2)));if(R<.08)for(const T of o.parts){const L=.08-R;T.type==="ell"?T.c=[T.c[0],T.c[1]+L,T.c[2]]:(T.a=[T.a[0],T.a[1]+L,T.a[2]],T.b=[T.b[0],T.b[1]+L,T.b[2]])}if(r){const T=A([-.45,d-.24,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.055-L*.008;o.ell([T[0]+.1+O*.08,Math.max(.04,T[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],L<2?c.BELLY:L%2?c.MAGIC:c.MAGIC2,{group:25+L,extra:!0})}}if(i){const T=A([-.8,d,0]);for(let L=0;L<5;L++){const O=L+n*.5,I=.05-L*.007;o.ell([T[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,T[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],L%2?c.MAGIC:c.MAGIC2,{group:20+L,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),o}const Mc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),wo=new Map,ed=n=>(wo.has(n)||wo.set(n,xn(ju({frame:0}),{height:n}).s),wo.get(n)),mr=(n={})=>ed(Mc(n));function Jf(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s}={}){const r=Mc(n),a=ju({frame:e,lean:t,pose:s}),{sp:o,project:h}=s?xn(a,{scale:ed(r),facing:i}):xn(a,{height:r,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let l=0;for(let d=0;d<400&&l<6;d++){const f=d*37%o.w,u=d*53%Math.floor(o.h*.8);o.get(f,u)||o.get(f+1,u)||o.get(f-1,u)||o.get(f,u+1)||o.get(f,u-1)||(f*7+u*13+e*5)%11||(o.px(f,u,c.MAGIC2),l++)}return o}const dt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Zs=n=>{const e=dt(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?c.BARKD:e>.88?c.BARKL:void 0},Qf=n=>e=>{const t=dt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?c.LEAF3:t>.8?c.LEAF2:void 0},Ci=(n,e,t,i,s=!0)=>n.ell(e,t,c.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?c.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?c.STONED:void 0}),ea=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:Qf(e)}),un=(n,e,t)=>n.chain(e,c.TRUNK,{group:t,rough:.012,paint:Zs}),ta=(n,e,t,i,s,r=.3,a=c.LEAF2)=>{for(let o=0;o<e;o++){const h=dt(s,o)*6.283,l=t*Math.sqrt(dt(o,s)),d=Math.cos(h)*l,f=Math.sin(h)*l*.7;n.ell([d,r*.3,f],[.07,r*(.35+dt(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?c.LEAF:void 0})}},na=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],c.WATER,{group:i}),jf={"sleeping-giant"(n){const e=t=>i=>{const s=dt(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?c.LEAF3:s>.86?c.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,c.MOSS,{group:1,rough:.03,paint:e()});Ci(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],c.STONED,{group:3});Ci(n,[-.2,.16,.95],[.2,.15,.18],4),Ci(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],c.LEAF3,{group:6,rough:.03}),ta(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],c.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?c.MOSS:void 0}),na(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+dt(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+dt(e,2)*.7,a=P.add(s,[0,r,0]);n.seg(s,a,.12,.09,c.TRUNK,{group:3+e,rough:.02,paint:Zs});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,l=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...P.add(a,P.add(P.mul(l,.45),[0,.18,0])),.04],[...P.add(a,P.add(P.mul(l,.9),[0,-.15,0])),.015]],o%2?c.LEAF:c.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Ci(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){na(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=P.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],c.WOOD,{dir:t,group:2,paint:i=>(P.dot(P.sub(i,e),[0,1,0])*9+9)%1<.14?c.BARKD:i[1]>.35&&dt(Math.floor(i[0]*9))<.4?c.MOSS:void 0}),n.ell(P.add(e,[0,.14,0]),[1.2,.4,.47],c.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(P.add(e,P.add(P.mul(t,i*.4),[0,.1,-.42])),P.add(e,P.add(P.mul(t,i*.4),[0,.1,.42])),.04,.04,c.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,c.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],c.WOOD,{dir:[1.2,-.8,-.15],group:4}),ta(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=P.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],c.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?c.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],c.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],c.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,l=Math.hypot(o,h),d=Math.atan2(h,o);return l>r*.82||l<r*.18?c.BARKD:Math.abs(Math.sin(d*4))<.2?c.WOOD:c.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],c.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?c.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,c.WOOD,{group:8});for(let t=0;t<14;t++){const i=dt(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(dt(t,o)-.5)*.5,.25+o*.25+dt(o,t)*.2,r*(1-o*.3)+(dt(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,c.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],c.LEAF,{group:14,rough:.03,paint:h=>dt(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?c.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])un(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])ea(n,t,i,3);un(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],c.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return dt(i,s)<.3?c.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,c.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],c.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+dt(e)*.35;n.box(P.add(i,[0,s/2,0]),[.13,s/2,.1],c.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?c.RUNE:a[1]>s*.85?c.MOSS:void 0});const r=P.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,P.add(r,[0,.16,0]),.035,.03,c.CLOTH,{group:12}),n.ell(P.add(r,[0,.18,0]),[.1,.06,.1],c.ACCENT,{group:13,paint:a=>dt(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?c.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],P.add(e,[Math.cos(s)*.08,.1+dt(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?c.TRUNK:c.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],c.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],c.BARKD,{group:4,rough:.03,paint:i=>dt(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?c.GLOW:i[1]>.3?c.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,c.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?c.BARKL:void 0})},"root-arch"(n){un(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),un(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),un(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),un(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])ea(n,e,t,4);for(let e=0;e<4;e++)Ci(n,[-.7+e*.45,.12,(dt(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],c.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?c.MAGIC:e[1]>.62?c.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],c.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?c.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?c.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?c.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],c.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>dt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?c.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,c.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Ci(n,[-1.4+e*.7,.12,.9+dt(e)*.3],[.2,.15,.18],4+e);ta(n,16,1.8,10,9,.25)},"heron-rookery"(n){un(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{un(n,[[...s,.07],[...r,.04]],2),n.ell(P.add(r,[0,.08,0]),[.34,.13,.3],c.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?c.STRAW:o[1]<r[1]+.02?c.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])ea(n,s,r,7);const t=P.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],c.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?c.STONE:void 0}),n.chain([[...P.add(t,[.12*i,.06*i,0]),.035*i],[...P.add(t,[.2*i,.22*i,0]),.03*i],[...P.add(t,[.16*i,.32*i,0]),.04*i]],c.BELLY,{group:10}),n.seg(P.add(t,[.18*i,.33*i,0]),P.add(t,[.36*i,.3*i,0]),.015*i,.005*i,c.BODY2,{group:11});for(const s of[-.04,.04])n.seg(P.add(t,[0,-.06*i,s]),P.add(t,[.02,-.42,s]),.012,.012,c.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],c.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],c.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&dt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?c.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,c.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?c.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],c.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?c.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],c.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+dt(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,P.add(s,[0,.18,0]),.015,.012,c.LEAF2,{group:6}),n.ell(P.add(s,[0,.2,0]),[.05,.04,.05],[c.FLOWER,c.BELLY,c.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],c.LEAF,{group:1,rough:.05,paint:t=>{const i=dt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?c.ACCENT:i<.2?c.BARKD:t[1]<.4?c.LEAF3:i>.85?c.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],c.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,c.TRUNK,{group:3,paint:t=>t[1]>.6?c.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?c.BARKD:void 0})},"stilt-hut"(n){na(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,c.WOOD,{group:2,paint:i=>i[1]<.15?c.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],c.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?c.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],c.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?c.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],c.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?c.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,c.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,c.WOOD,{group:6});for(let e=0;e<26;e++){const t=dt(e,7)*6.283,i=1.5+dt(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+dt(e,9)*.5;n.seg(s,P.add(s,[0,r,0]),.028,.02,c.LEAF2,{group:10+e%3}),e%3===0&&n.ell(P.add(s,[0,r-.05,0]),[.025,.07,.025],c.BARKD,{group:13})}},"bog-shrine"(n){na(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,c.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?c.BARKD:e[1]>1.85?c.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],c.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+dt(e)*.25,Math.sin(t)*.8],.05,.04,c.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],c.EAR,{group:5}),Ci(n,[.3,.07,.3],[.09,.07,.08],6,!1),Ci(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],c.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?c.MAGIC2:void 0});ta(n,20,2,10,11,.3,c.WEB)},"raven-tree"(n){un(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>un(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),un(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),un(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],c.SHADES,{dir:[1,.2,0],group:r}),n.ell(P.add(s,[.11,.07,0]),[.05,.05,.045],c.SHADES,{group:r}),n.seg(P.add(s,[.15,.07,0]),P.add(s,[.22,.05,0]),.015,.004,c.BODY2,{group:r}),n.seg(P.add(s,[-.1,0,0]),P.add(s,[-.22,-.04,0]),.04,.015,c.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],P.add(i,[0,.3,0]),.01,.01,c.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(P.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),P.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,c.FRAME,{group:14})}n.seg(P.add(i,[0,-.27,0]),P.add(i,[0,-.25,0]),.22,.22,c.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],c.LEAF2,{group:1,rough:.03,paint:e=>dt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?c.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],c.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],c.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?c.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],c.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],c.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Ci(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(P.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),P.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,c.FRAME,{group:6})}n.seg(P.add(t,[0,-.3,0]),t,.05,.05,c.FRAME,{group:6}),n.ell(P.add(t,[0,.14,0]),[.2,.07,.2],c.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],c.TRUNK,{group:1,rough:.015,paint:Zs}),n.ell([0,.58,0],[.84,.06,.78],c.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?c.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],c.TRUNK,{round:.1,rough:.01,group:2,paint:Zs});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],c.TRUNK,{round:.06,group:3,paint:Zs});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;un(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,c.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?c.BARKL:Zs(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,c.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],c.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,c.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?c.BARKL:void 0})}},"swing-beech"(n){un(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),un(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),un(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;un(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])ea(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,c.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],c.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(dt(e,1)-.5)*3,.05+dt(e,2)*.5,(dt(e,3)-.3)*1.6],[.022,.022,.022],c.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,c.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],c.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,c.WOOD,{group:3});const e=t=>{const i=dt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?c.BELLY:i<.2?c.STRAW:i>.85?c.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,c.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],c.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,c.WOOD,{group:5})}},td={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function e0(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new pt(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function t0(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[c.TRUNK]:de(i,.45,.36),[c.BARKD]:de(i+.03,.5,.17),[c.BARKL]:de(i,.35,.55),[c.BARK2]:de(i+.02,.45,.26),[c.LEAF]:de(t,.55,.45),[c.LEAF2]:de(t-.03,.5,.62),[c.LEAF3]:de(t+.03,.6,.26),[c.STONE]:[122,120,128],[c.STONED]:[62,60,70],[c.MOSS]:de(.26,.45,.45),[c.WOOD]:[128,92,58],[c.STRAW]:[190,162,104],[c.CLOTH]:[228,220,200],[c.EAR]:[168,96,66],[c.FRAME]:[150,128,84],[c.SHADES]:[30,28,36],[c.ACCENT]:[196,40,52],[c.BELLY]:[232,228,214],[c.BODY2]:[210,170,60],[c.FLOWER]:[180,140,230],[c.WEB]:[228,228,234],[c.WATER]:[52,78,104],[c.NOSE]:[16,14,20],[c.GLOW]:[255,120,40],[c.MAGIC]:de(e.magicHue??.45,.6,1),[c.MAGIC2]:de(e.magicHue??.45,.2,1),[c.RUNE]:[120,230,255],[c.LINE]:[24,22,30]}}function n0(n,e,t,i=16){const s=new qe({blend:.05});jf[n](s),s.ell([0,.004,0],[.01,.004,.01],c.NOSE,{group:0});const r=(Object.values(td).find(([u])=>u===n)||[,,1])[2],a=xn(s,{scale:mr(t)*r}),{sp:o,x0:h,y0:l}=e0(a.sp),[d,f]=a.project([0,0,0]);return{sp:o,colours:t0(e,t),origin:{x:+(d-h).toFixed(1),y:+(f-l).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const i0=1.3,s0=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*i0,n.growth],wr=(n,e,t=1)=>Math.round(e.size*s0(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),vc=(n,e)=>{const t=$r(e);for(let i=0;i<9;i++){const s=Math.floor(pe(t,2,n.w-2)),r=Math.floor(pe(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,c.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,c.MAGIC)}};function ho(n,e,t,i,s,r,a,o){const h=P.add(e,[-i*.7,i*(.75+s),t*i*.35]),l=P.norm(P.sub(h,e)),d=P.norm(P.sub([1,0,0],P.mul(l,P.dot([1,0,0],l)))),f=Math.hypot(...P.sub(h,e));n.flat(P.add(P.lerp(e,h,.5),P.mul(d,-i*.14)),l,d,f*.55,i*.34,Es.wing(r,a),{group:o,extra:!0})}const bc=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),wr(1,e)*t*.72))):n===2?Math.round(Math.max(wr(1,e)*t*1.08,Math.min(wr(2,e,t),wr(1,e)*1.4))):wr(n,e)*t;let Fa=null;function r0(n,e){const t=Fa;Fa=n;try{return e()}finally{Fa=t}}const a0=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},o0=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function _c(n){const e=Fa,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:P.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:P.norm([1,.4,0])},a=P.norm(r.dir),o=P.norm(P.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=P.cross(a,o),l=[],d=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const g=M/16*Math.PI*2,x=P.add(P.mul(o,Math.cos(g)),P.mul(h,Math.sin(g)));let v=0;for(;v<.8&&n.field(P.add(r.c,P.mul(x,v)))<0;)v+=.01;v>=.8&&(v=r.r),l.push([...P.add(r.c,P.mul(x,v+d*.7)),d])}n.chain(l,c.COLLAR,{group:60,extra:!0});const f=l.reduce((M,g)=>g[0]-g[1]*.6+g[2]*.5>M[0]-M[1]*.6+M[2]*.5?g:M),u=d*1.3*(r.tag||1),m=P.norm(P.add(P.norm(P.sub(f.slice(0,3),r.c)),[.3,-.5,.3]));let p=f.slice(0,3);for(let M=0;M<60&&n.field(p)<u*.4;M++)p=P.add(p,P.mul(m,.01));n.ell(p,[u,u,u*.6],c.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||P.add(qe.surface(i.c,i.r,P.norm([-.15,1,.1])),[0,s*.1,0]),o=P.norm([.3,1,.35]),h=r*1.5,l=P.add(a,P.mul(o,h));n.seg(P.add(a,P.mul(o,-r*.1)),l,r*.48,r*.04,c.HAT1,{group:61,extra:!0,paint:d=>Math.floor(P.dot(P.sub(d,a),o)/(h/5)+10)%2?c.HAT2:void 0}),n.ell(l,[r*.17,r*.17,r*.17],c.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=l=>P.add(l,P.mul(P.norm(P.sub(l,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,c.SHADES,{group:62,extra:!0}),n.ell(P.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],c.GLINT,{group:62,extra:!0});else for(const l of[r,a]){const d=P.norm(P.sub(l,i.c)),f=P.norm(P.cross([0,1,0],d)),u=P.cross(d,f),m=e.glasses==="heart"?o0:a0,p=h*1.5;n.flat(o(l),f,u,p,p,(M,g)=>m(M,g)?m(M*1.3,g*1.3)?c.SHADES:c.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,c.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=P.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],c.SHOE,{group:r.group,extra:!0,paint:l=>l[1]<h[1]-o*(a?.45:.4)?c.SOLE:e.shoes==="glitter"&&hi(l,60,.28)?c.GLINT:void 0})}}function l0(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,l=N=>a&&n.legend.includes(N),d=new qe,f=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,m=h?.55:o?.9:1.04,p=t?-.04:0,M=1+p,g=r.chest*(a?1.06:1)/m+p,x=r.tuck/m+p,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),b=.06*r.legW*(a?1.1:h?1.7:1),w=r.back==="hump"?.1:0,E=r.back==="arch"?.1:0,y=g+.12,A=N=>{if(r.belly&&N[1]<y&&N[0]>-u*.5)return c.BELLY;if(r.saddle&&N[1]>M-.18&&N[0]<u*.55)return c.BODY2;if(r.spots&&N[1]>g+.1&&hi(N,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?c.BELLY:r.spots==="young"?void 0:c.BODY3;if(r.ridge&&N[1]>M-.08+w*.5)return c.BODY3};if(d.ell([u*.48,(M+g)/2+w*.5,0],[u*.62,(M-g)/2+w*.5,v],c.BODY,{paint:A}),d.ell([-u*.5,(M+x)/2+E*.6,0],[u*.58,(M-x)/2+E*.6,v*.93],c.BODY,{paint:A}),d.ell([0,(M+(g+x)/2)/2+.02,0],[u*.6,(M-(g+x)/2)/2,v*.9],c.BODY,{paint:A}),r.ridge)for(let N=0;N<(a?16:10);N++){const ee=-u*.8+N*u*1.75/(a?15:9),se=(.07+(a?.04:0))*(1+.5*Math.max(0,ee/u));d.ell([ee,M+.02+w*Math.max(0,1-Math.abs(ee/u-.5)*2)+se*.5,0],[se,.03,v*.25],c.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let N=0;N<14;N++){const ee=N/14*Math.PI*2;d.ell([u*Math.cos(ee)*.7,(M+g)/2+Math.sin(ee)*.2,v*(N%2?.5:-.5)],[.16,.14,.14],c.BODY)}const _=[.32,-.32][t],S=(N,ee)=>{const se=ee*v*.62,ue=N?u*.62:-u*.62,xe=(N?1:-1)*ee*_,Le=N?g+.1:x+.15,B=(N?ee:-ee)*(t?1:-1)>0?.06:0,z=[ue+Math.sin(xe)*.2+(N?.02:.1),Math.max(.3,Le*.55),se],F=[ue+Math.sin(xe)*.42,.05+B,se],Z=[ue,Le+.12,se*.8],j=ee>0?r.legMat||c.BODY:r.legMat?c.BODY3:c.BODY2,ce=N?[[...Z,b*1.5],[...z,b*1.05],[...F,b*.9]]:[[...Z,b*2*(r.haunch||1)],[...P.add(z,[-.12,.06,0]),b*1.2],[...P.add(F,[-.06*(r.hindFoot||1),.12,0]),b*.9],[...F,b*.9]];d.chain(ce,j,{group:ee>0?6+(N?1:0):2,paint:r.socks?be=>be[1]<r.socks?c.BODY3:void 0:void 0});const ye=(r.paw==="hoof"?.07:.09)*r.legW**.5*(N?1:r.hindFoot||1);d.ell(P.add(F,[ye*.5,-.01,0]),[ye,b*.9,b*1.1],r.paw==="hoof"?c.NOSE:j,{group:ee>0?6+(N?1:0):2}),d.anchors.feet.push({c:P.add(F,[ye*.5,-.01,0]),r:Math.max(ye,b*1.1),group:ee>0?6+(N?1:0):2})};for(const N of[-1,1])S(!0,N),S(!1,N);const R=[u*.82,M-.12,0],T=[R[0]+Math.cos(r.neckAng)*r.neck*.9,R[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];d.seg(R,T,r.neckW*.55,r.neckW*.42,c.BODY,{paint:N=>r.belly&&N[1]<(R[1]+T[1])/2-.05?c.BELLY:r.face==="dark"?c.BODY2:void 0});const L=N=>{if(r.face==="badger")return Math.abs(N[2])<f*.22+(N[0]-T[0])*.1||N[1]<T[1]-f*.1?c.BELLY:c.BODY3;if(r.face==="dark")return c.BODY2;if((r.belly||r.muzzle)&&N[1]<T[1]-f*.35)return c.BELLY};d.ell(T,[f*1.05,f*.92,f*.88],c.BODY,{paint:L});const O=f*r.snout*(h?.55:o?.78:1),I=f*r.snoutD*.55,k=[T[0]+f*.65+O*.5,T[1]-f*.28,0];d.ell(k,[O*.62+f*.2,I,I*.95],c.BODY,{dir:[1,-.25,0],paint:N=>(r.muzzle||r.belly)&&N[1]<k[1]-I*.1?c.BELLY:L(N)});const H=[k[0]+O*.62+f*.1,k[1]-.02,0];d.ell(H,[f*(r.disc?.1:.12),f*(r.disc?.2:.12),f*(r.disc?.2:.15)],c.NOSE,{group:1});for(const N of[-1,1]){const ee=qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,N*.62]));d.ell(ee,[f*.13,f*.16,f*.13].map(se=>se*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?c.MAGIC2:c.EYE,{group:1})}d.anchors.head={c:T,r:[f*1.05,f*.92,f*.88],top:[T[0]-f*.1,T[1]+f*.82,0]},d.anchors.eyes={pts:[-1,1].map(N=>qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,N*.62]))),size:f*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},d.anchors.neck={c:P.lerp(R,T,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:P.norm(P.sub(T,R)),tag:h?1.8:o?1.3:1};for(const N of[-1,1]){const ee=r.ear,se=[T[0]-f*.15,T[1]+f*.7,N*f*.5],ue=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(ee==="none")continue;if(ee==="round"){d.ell(se,[f*.22,f*.25*ue,f*.1],c.BODY,{group:1,paint:ce=>ce[0]>se[0]+f*.02?c.EAR:void 0});continue}const xe=ee==="long",Le=ee==="small"?-.6:0,B=f*.55*ue*(ee==="big"?1.35:xe?2.2:1),z=f*.3*(ee==="big"?1.2:xe?1.35:1),F=P.norm([Le*.6-(xe?.3:.12),1,N*.3]),Z=P.norm([.55,.2,N]),j=P.norm(P.cross(Z,F));d.flat(P.add(se,P.mul(F,B)),j,F,z,B,Es.ear(c.BODY,c.EAR,c.BODY3),{group:5+(N>0?0:20),extra:xe}),ee==="tuft"&&d.seg(P.add(se,[0,B*1.4,N*.02]),P.add(se,[0,B*1.85,N*.04]),f*.05,f*.02,c.BODY3,{group:1})}const K=[-u*1.05,M-.1+E*.5,0],ae=t?.04:-.02;if(l("tails")||c0(d,l("starTail")?"star":r.tail,K,u,M,ae),r.horns)for(const N of[-1,1]){const ee=o?.6:h?.35:l("hornsGlow")?1.4:1,se=[];for(let ue=0;ue<=8;ue++){const xe=.3-ue/8*Math.PI*1.6,Le=f*.65*ee*(1-.45*ue/8);se.push([T[0]-f*.1+Math.cos(xe)*Le,T[1]+f*.45+Math.sin(xe)*Le,N*(f*.6+ue*.015)]),se[ue].push(f*.2*ee*(1-.6*ue/8))}d.chain(se,l("hornsGlow")?c.MAGIC:c.ACCENT,{group:13})}if(r.antlers||l("jackalope"))for(const N of[-1,1])h0(d,r,[T[0]-f*.05,T[1]+f*.75,N*f*.4],N,e,l);if(r.tusks)for(const N of[-1,1]){const ee=o?.4:h?0:l("tusksBig")?1.3:.75;if(!ee)continue;const se=[k[0]+O*.25,k[1]-I*.4,N*I*.8];d.chain([[...se,.045*ee],[...P.add(se,[.1*ee,.1*ee,N*.03]),.04*ee],[...P.add(se,[.06*ee,.24*ee,N*.05]),.02*ee]],c.ACCENT,{group:8})}r.teeth&&!h&&d.ell([H[0]-f*.1,H[1]-f*.25,0],[f*.08,f*.14,f*.12],c.ACCENT,{group:1});const q=N=>[-u*.9+N*u*1.65,M+w*Math.max(0,1-Math.abs(N-.8)*3)+E*(1-Math.abs(N-.4)*2),0];if(l("wings"))for(const N of[-1,1])ho(d,[u*.2,M,N*v*.5],N,1.15,t?.1:0,N>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(N>0?10:0));if(l("mane")||l("flames"))for(let N=0;N<7;N++){const ee=N/6,se=P.lerp(P.add(T,[-f*.5,f*.3,0]),q(.55),ee),ue=[.4,.3,.45,.28,.38,.25,.3][N],xe=P.norm([-.35-(t?.1:0),1,0]);d.flat(P.add(se,P.mul(xe,ue*.5)),[1,0,0],xe,ue*.32,ue*.55,Es.flame(N%2?c.MAGIC:c.MAGIC2,c.MAGIC2),{group:60+N%2,extra:!0})}if(l("tails"))for(let N=0;N<7;N++){const ee=Math.PI*(.55+N*.08),se=(N-3)*.1,ue=P.add(K,[Math.cos(ee)*.9,Math.sin(ee)*.85,se]);d.chain([[...K,.1],[...P.lerp(K,ue,.5),.17],[...ue,.08]],N%2?c.BODY2:c.BODY,{group:70,extra:!0}),d.ell(ue,[.09,.09,.09],c.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((N,ee)=>{const se=q(N),ue=[.3,.5,.4,.6,.35][ee];d.ell(P.add(se,[0,ue*.45,(ee%2-.5)*.1]),[ue*.55,.08,.08],c.MAGIC,{dir:[(ee-2)*.12,1,0],group:80+ee%2,extra:!0,paint:xe=>xe[2]>0?c.MAGIC2:void 0})}),l("moss")){for(let N=0;N<6;N++)d.ell(q(.08+N*.15),[u*.22,.07,v*.85],c.LEAF,{group:85,extra:!0});for(const[N,ee]of[[.25,.55],[.5,.8],[.75,.45]]){const se=q(N);d.seg(se,P.add(se,[0,ee*.7,0]),.04,.025,c.TRUNK,{group:86,extra:!0}),d.ell(P.add(se,[0,ee*.8,0]),[ee*.28,ee*.26,ee*.28],c.LEAF2,{group:87,extra:!0,paint:ue=>ue[1]<se[1]+ee*.72?c.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const ee=q(N);d.ell(P.add(ee,[0,.12,v*.3]),[.07,.035,.07],c.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let N=0;N<3;N++){const ee=[];for(let se=0;se<9;se++){const ue=se/8;ee.push([u*(.5-ue*2.2),M+.05+N*.1+ue*(.25+N*.12)+Math.sin(ue*6+t+N)*.07,(N-1)*.18,.04*(1-ue*.6)])}d.chain(ee,N%2?c.MAGIC2:c.MAGIC,{group:90+N,extra:!0})}_c(d);const{sp:ie}=xn(d,{height:bc(e,i,r.hgt),facing:s});return a&&vc(ie,n.id.length*7919),ie}function c0(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],c.BODY,{...a,paint:h=>h[1]<.32?c.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],c.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?c.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(P.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?c.BELLY:c.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?c.BODY3:void 0:void 0}):e==="puff"?n.ell(P.add(t,[-.04,.02,0]),[.11,.11,.1],c.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?c.MAGIC:c.BODY,{...a,extra:!0,paint:e==="star"?h=>hi(h,14,.12)?c.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],c.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],c.BODY,{...a,paint:h=>h[0]<o(1.45)?c.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,c.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],c.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],c.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],c.BODY3,a))}function h0(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?c.MAGIC2:c.MAGIC:c.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const d=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const g=P.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,g,d*1.3,d*1.2,h,l);for(let x=0;x<5;x++){const v=.35+x*.3,b=P.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),w=(.24+.05*(x%2))*o;n.ell(P.add(g,P.mul(b,w*.55)),[w*.6,d*1.5,d*.6],h,{...l,dir:b,up:[0,0,1]})}return}const u=P.add(t,[-.18*o,.3*o,f*.4]),m=P.add(t,[-.25*o,.62*o,f*.8]),p=P.add(t,[-.1*o,.95*o,f]);n.chain([[...t,d*1.2],[...u,d],[...m,d*.85],[...p,d*.4]],h,l);const M=(g,x,v,b)=>n.seg(g,P.add(g,P.mul(P.norm(x),v)),b,b*.35,h,l);M(P.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,d*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,d*.7),o>.7&&(M(m,[.8,1,0],.28*o,d*.6),M(p,[.3,1,i*.2],.18*o,d*.5))}function u0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=p=>r&&n.legend.includes(p),l=new qe,d=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+d;for(const p of[-1,1]){const M=t&&p>0?.04:0;l.seg([.05,.2,p*.14],[.08,.05+M,p*.15],.07,.06,c.BODY2,{group:2});for(const g of[-.04,0,.04])l.ell([.16,.03+M,p*.15+g],[.06,.025,.02],c.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+M,p*.15],r:.08,group:p>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],c.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+d,0],[.36,.52,.36],c.BODY,{paint:p=>p[0]>.12&&p[1]<u-f*.5?Math.floor(p[1]*18)%3===0&&hi(p,16,.5)?c.BODY2:c.BELLY:void 0}),!h("wings"))for(const p of[-1,1])l.ell([-.06,.58+d,p*.3],[.4,.3,.08],c.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:p>0?4:2,paint:M=>hi(M,12,.15)?c.BODY3:void 0});l.ell([0,u,0],[f,f*.9,f],c.BODY);for(const p of[-1,1]){const M=P.norm([.75,-.05,p*.4+.35]),g=P.add(qe.surface([0,u,0],[f,f*.9,f],M),P.mul(M,-f*.05));l.ell(g,[f*.22,f*.46,f*.4],c.BELLY,{group:1,dir:M});const x=P.add(g,P.mul(M,f*.14));l.ell(x,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),r?c.MAGIC:c.IRIS,{group:1,dir:M}),l.ell(P.add(x,P.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),r?c.MAGIC2:c.EYE,{group:1,dir:M}),(l.anchors.eyes||={pts:[],size:f*.22}).pts.push(P.add(x,P.mul(M,f*.07))),o||l.ell([f*.05,u+f*.8,p*f*.6],[f*.32,f*.12,f*.08],c.BODY2,{dir:[-.1,1,p*.7],up:[1,0,0],group:1})}if(l.ell(qe.surface([0,u,0],[f,f*.9,f],P.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],c.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const p of[-1,1])ho(l,[-.05,.8+d,p*.3],p,1.3,t?.12:0,p>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(p>0?10:0));if(h("eyesRing"))for(let p=0;p<7;p++){const M=Math.PI*(.15+p/6*.7);l.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(p-3)*.15],[.07,.07,.07],c.MAGIC2,{group:95+p,extra:!0}),l.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(p-3)*.15],[.035,.035,.035],c.EYE,{group:95+p,extra:!0})}l.anchors.head={c:[0,u,0],r:[f,f*.9,f]},l.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},_c(l);const{sp:m}=xn(l,{height:bc(e,i,.95),facing:s});return r&&vc(m,31),m}const is=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(qe.surface(e,t,P.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>qe.surface(e,t,P.norm(o))),size:s}},nd=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],c.NOSE,{group:0});function ei(n,e,t,i,s,r){_c(n);const{sp:a}=xn(n,{height:bc(t,i,s),facing:r});return t===3&&vc(a,e.id.length*131),a}const id=(n,e,t)=>{n.ell(e,[t,t*.35,t],c.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?c.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(P.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],c.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},yc=(n,e)=>e.forEach(([t,i],s)=>n.ell(P.add(t,[0,i*.45,0]),[i*.55,.07,.07],c.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?c.MAGIC2:void 0}));function d0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,c.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],l=[.5,.32,.38];a.ell(h,l,c.BODY2,{paint:f=>hi(f,22,.3)?c.BODY3:hi(f,19,.12)?c.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),m=f/46*.9+.05,p=P.norm([Math.cos(u)*Math.sin(m*Math.PI*.5)-.25,Math.cos(m*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(m*Math.PI*.5)]);p[0]>.55||a.ell(P.add(qe.surface(h,l,p),P.mul(p,.02)),[.1,.025,.025],f%4?c.BODY2:c.BODY3,{dir:P.add(p,[-.4,0,0]),group:1})}const d=[.48,.22,0];return a.ell(d,[.22,.14,.15],c.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],c.NOSE,{group:1}),is(a,d,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?c.MAGIC2:c.EYE),r&&yc(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),ei(a,n,e,i,.6,s)}function f0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.05:0;for(const d of[-1,1])a.ell([-.22,.16,d*.36],[.24,.13,.12],d>0?c.BODY:c.BODY2,{dir:[1,.3,0],group:d>0?6:2,paint:f=>hi(f,14,.15)?c.BODY3:void 0}),a.ell([.05,.04,d*.4],[.16,.04,.08],d>0?c.BODY:c.BODY2,{group:d>0?6:2}),a.seg([.35,.2+o,d*.24],[.42,.03,d*.3],.05,.04,d>0?c.BODY:c.BODY2,{group:d>0?7:2}),a.anchors.feet.push({c:[.45,.03,d*.3],r:.06,group:d>0?7:2},{c:[.12,.04,d*.4],r:.08,group:d>0?6:2});const h=[0,.3+o,0],l=[.5,.28,.4];a.ell(h,l,c.BODY,{paint:d=>d[1]<h[1]-.12?c.BELLY:d[0]>.38&&Math.abs(d[1]-(h[1]-.02))<.018?c.LINE:hi(d,14,.22)?c.BODY3:void 0});for(const d of[-1,1]){const f=[.3,.55+o,d*.17];a.ell(f,[.1,.09,.1],c.BODY,{group:1}),a.ell(qe.surface(f,[.1,.09,.1],P.norm([.6,.5,d*.5])),[.05,.05,.05],r?c.MAGIC2:c.IRIS,{group:1}),a.ell(qe.surface(f,[.11,.1,.11],P.norm([.65,.45,d*.5])),[.03,.015,.03],c.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(d=>qe.surface([.3,.55+o,d*.17],[.1,.09,.1],P.norm([.6,.5,d*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&id(a,[.15,.66+o,0],.16),ei(a,n,e,i,.55,s)}function p0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new qe,l=t?.02:0;for(const u of[-1,1]){const m=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+m,u*.08],.03,.025,c.NOSE,{group:u>0?7:2}),h.ell([.08,.02+m,u*.08],[.08,.015,.04],c.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+m,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],c.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+l,0],[.42,.26,.24],c.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+l,u*.2],[.45,.17,.05],c.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const d=[.36,.84+l,0],f=a?.19:.16;if(h.ell(d,[f*1.1,f,f*.95],c.BODY,{paint:u=>u[1]>d[1]+f*.55?c.BELLY:void 0}),h.ell(P.add(d,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],c.NOSE,{dir:[1,-.2,0],group:1}),is(h,d,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,r?c.MAGIC2:c.EYE),o("wings"))for(const u of[-1,1])ho(h,[-.05,.65+l,u*.18],u,1.1,t?.1:0,u>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const m=Math.PI*(.2+u/5*.6);h.ell([Math.cos(m)*.25-.1,.95+Math.sin(m)*.45,(u-2.5)*.12],[.06,.06,.06],c.MAGIC2,{group:95+u,extra:!0})}return ei(h,n,e,i,.75,s)}function m0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,l=.55,d=a("wingsBig")?1.5:1;nd(o,0,.3*d);for(const u of[-1,1]){const m=[0,l+.05,u*.1],p=[.05,l+(h?.35:-.05),u*.45*d],M=[[-.05,l+(h?.45:-.15),u*.85*d],[-.25,l+(h?.2:-.25),u*.75*d],[-.3,l+(h?0:-.25),u*.4*d]],g=a("wingsBig")?c.MAGIC:c.BODY2,x=a("wingsBig")?c.MAGIC2:c.BODY3;o.seg(m,p,.03,.025,x,{group:11});for(const y of M)o.seg(p,y,.02,.012,x,{group:11});const v=P.sub(M[0],m),b=P.norm(v),w=P.norm(P.sub(M[2],p)),E=P.norm(P.sub(w,P.mul(b,P.dot(w,b))));o.flat(P.add(P.lerp(m,M[0],.5),P.mul(E,.12*d)),b,E,Math.hypot(...v)*.55,.3*d,Es.membrane(g),{group:10+(u>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],c.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],c.BODY,{group:1});for(const u of[-1,1])o.ell(P.add(f,[-.02,.15,u*.07]),[.12,.045,.02],c.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:m=>m[0]>f[0]-.01?c.EAR:void 0});return is(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?c.MAGIC2:c.EYE),o.ell(qe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],c.NOSE,{group:1}),ei(o,n,e,i,.55,s)}function g0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,c.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],c.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],c.BODY,{paint:h=>h[1]>.45?c.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],c.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],c.NOSE,{group:1});for(const h of[-1,1]){const l=[.32,.1-(h>0?o:0),h*.34];a.ell(l,[.13,.035,.12],c.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let d=0;d<4;d++)a.ell(P.add(l,[.14,-.01,h*(d-1.5)*.05]),[.05,.015,.015],c.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35])),[.015,.015,.015],r?c.MAGIC2:c.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&id(a,[.15,.62,0],.15),ei(a,n,e,i,.55,s)}function x0(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new qe;for(const f of[-1,1])for(let u=0;u<3;u++){const m=.25-u*.25,p=(u+(f>0?1:0)+t)%2?.06:-.06,M=[m,.22,f*.2];o.chain([[...M,.03],[m+p+(1-u)*.06,.32,f*.42,.025],[m+p*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?c.BODY2:c.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],c.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?c.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?c.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],c.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],c.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),d=a("horn")?c.MAGIC:c.BODY3;for(const f of[-1,1]){const u=P.add(h,[.08,.02,f*.1]),m=P.add(u,[l*.7,l*.45,f*l*.15]),p=P.add(m,[l*.25,-l*.12,-f*l*.12]);o.chain([[...u,.045],[...m,.035],[...p,.015]],d,{group:8+(f>0?1:0)}),o.seg(P.lerp(u,m,.55),P.add(P.lerp(u,m,.55),[0,l*.22,0]),.02,.008,d,{group:8})}for(const f of[-1,1])o.chain([[...P.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],c.BODY3,{group:9,extra:!0});return is(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?c.MAGIC2:c.EYE,9),a("crystals")&&yc(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),ei(o,n,e,i,.5,s)}function M0(n,e,t,i,s="towards"){const r=e===3,a=new qe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],c.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],c.SKIN,{group:1});for(const d of[-1,1])a.seg([.7+o,.32,d*.04],[.78+o,.55,d*.1],.018,.014,c.SKIN,{group:5}),a.ell([.78+o,.57,d*.1],[.03,.03,.03],r?c.MAGIC2:c.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(d=>[.78+o,.57,d*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],l=r?c.MAGIC:c.BODY;return a.ell(h,[.32,.32,.22],l,{group:3,paint:d=>{const f=Math.atan2(d[1]-h[1],d[0]-h[0]);return((Math.hypot(d[0]-h[0],d[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?c.MAGIC2:c.BODY3:void 0}}),ei(a,n,e,i,.45,s)}function v0(n,e,t,i,s="towards"){const r=e===3,a=new qe;for(const o of[-1,1])for(let h=0;h<7;h++){const l=-.45+h*.15,d=(h+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+d,.01,o*.33],.025,.015,c.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],c.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],c.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?c.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?c.LINE:void 0)}),is(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?c.MAGIC2:c.EYE),r&&yc(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),ei(a,n,e,i,.4,s)}function b0(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=m=>r&&n.legend.includes(m),h=new qe,l=t?.7:0,d=[];for(let m=0;m<=12;m++){const p=m/12;d.push([-.9+p*1.2,.07,Math.sin(p*Math.PI*2+l)*.25*(1-p*.5),.03+.045*Math.sin(Math.min(1,p*1.4)*Math.PI/2)])}d.push([.38,.25,d[12][2],.07],[.42,.45,d[12][2]*.8,.065]),h.chain(d,c.BODY,{paint:m=>m[1]<.05&&m[0]<.35?c.BELLY:hi([m[0]*1.5,m[1],m[2]],14,.3)?c.BODY3:void 0});const f=[.5,.5,d[13][2]*.8],u=a?.11:.09;if(h.ell(f,[u*1.5,u*.75,u],c.BODY,{dir:[1,-.15,0],group:1}),is(h,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?c.MAGIC2:c.EYE),t||h.seg(P.add(f,[u*1.4,-u*.2,0]),P.add(f,[u*2.3,-u*.3,0]),.01,.008,c.SKIN,{group:1}),h.anchors.feet.push({c:P.add(d[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,d[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const m of[-1,1])ho(h,[0,.2,m*.05],m,.9,t?.1:0,m>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(m>0?10:0));return ei(h,n,e,i,.45,s)}function _0(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new qe,h=t===0,l=.55,d=a("wingsBig")?1.45:1,f=a("wingsBig")?c.MAGIC:c.BODY;nd(o,0,.3*d);for(const u of[-1,1]){const m=h?.5:-.1,p=P.norm([.35,m,u]),M=P.norm([-.3,m*.6,u]);o.flat(P.add([0,l,u*.05],P.mul(p,.38*d)),p,P.norm(P.cross(p,[0,1,0])),.4*d,.24*d,Es.spotted(f,c.BELLY,c.BODY3),{group:10+(u>0?1:0)}),o.flat(P.add([-.05,l,u*.05],P.mul(M,.26*d)),M,P.norm(P.cross(M,[0,1,0])),.27*d,.17*d,Es.spotted(a("wingsBig")?c.MAGIC2:c.BODY2,c.BODY2,c.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,l+.08,u*.03,.015],[.2,l+.25,u*.1,.025],[.24,l+.32,u*.14,.012]],c.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],c.BELLY,{group:1,paint:u=>hi(u,30,.25)?c.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],c.BELLY,{group:1}),is(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?c.MAGIC2:c.EYE),ei(o,n,e,i,.5,s)}function y0(n,e,t,i,s="towards"){const r=e===3,a=l=>r&&n.legend.includes(l),o=new qe,h=t?.05:0;for(let l=0;l<9;l++){const d=l/8,f=-.6+d*1.15;o.ell([f,.12+Math.sin(d*Math.PI)*(.06+h),0],[.08,.1-d*.02,.12-d*.03],l<2?c.MAGIC2:l%2?c.BODY2:c.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],c.MAGIC2,{group:3,paint:l=>l[1]<.2?c.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,c.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],c.BODY3,{group:1}),is(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?c.MAGIC2:c.EYE),ei(o,n,e,i,.4,s)}function w0(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new qe,h=[.15,.28,0];for(const d of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,m=(f+(d>0?0:1)+t)%2?.05:-.05,p=P.add(h,[.05-f*.04,0,d*.1]),M=P.add(p,[Math.cos(u)*.3*(f<2?1:-.6)+m,.3,d*.3]),g=P.add(p,[Math.cos(u)*.55*(f<2?1:-.8)+m*1.5,-.28,d*.55]);o.chain([[...p,.03],[...M,.028],[...g,.015]],d>0?c.BODY2:c.BODY3,{group:d>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],c.BODY,{paint:d=>(Math.abs(d[2])<.03||Math.abs(d[0]+.28)<.03)&&d[1]>.45?c.BELLY:void 0}),o.ell(h,[.18,.13,.17],c.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([d,f])=>qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[d,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4])),[.025,.025,.025],l?c.MAGIC2:c.EYE,{group:1});if(l)for(let d=0;d<5;d++){const f=Math.PI*(.2+d/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(d-2)*.12],[.06,.06,.06],c.MAGIC2,{group:95+d,extra:!0})}return ei(o,n,e,i,.5,s)}const S0=new Map(Object.entries({owl:u0,hedgehog:d0,toad:f0,raven:p0,bat:m0,mole:g0,beetle:x0,snail:M0,woodlouse:v0,snake:b0,moth:_0,glowworm:y0,spider:w0})),wc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:c.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],sd=Object.fromEntries(wc.map(n=>[n.id,n])),yl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],wl={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},E0=["bar","star","heart"];function A0(n,e=!0){const t=$r((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*yl.length):null,glasses:i||t()<.4?E0[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(wl)[Math.floor(t()*3)]:null}}function T0(n,e,t=null){const i=R0(n,e);if(!t)return i;if(t.collar&&(i[c.COLLAR]=Array.isArray(t.collar)?t.collar:i[c.MAGIC]),t.hat!=null){const[s,r,a]=yl[t.hat%yl.length];i[c.HAT1]=s,i[c.HAT2]=r,i[c.POM]=a}if(t.glasses&&(i[c.SHADES]=[22,18,32],i[c.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=wl[t.shoes]||wl.sneakers;i[c.SHOE]=s,i[c.SOLE]=r}if(t.woken){i[c.WOKEN]=[255,40,36];for(const s of[c.BODY,c.BODY2,c.BODY3,c.BELLY,c.ACCENT,c.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function R0(n,e){const t=sd[n],i=e.cVal/.85,s=e.cSat/.6,r=de(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:de(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=de(e.magicHue+t.hue*.3,.6,1),h=de(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[c.BODY]:r,[c.BODY2]:de(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[c.BODY3]:de(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[c.BELLY]:a,[c.ACCENT]:l?[236,226,200]:de(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[c.MAGIC]:o,[c.MAGIC2]:h,[c.LEAF]:de(.3,.55,.55),[c.LEAF2]:de(.25,.5,.75),[c.LEAF3]:de(.33,.6,.35),[c.TRUNK]:de(.07,.45,.32),[c.EYE]:[24,18,30],[c.PUPIL]:[70,40,90],[c.GLINT]:[255,255,245],[c.NOSE]:[38,28,36],[c.EAR]:de(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[c.IRIS]:t.plan==="owl"?[255,176,40]:de(.12,.7,.85),[c.SKIN]:[238,158,192]}}const C0=["size","growth","pixel","head","eye","legs","long","fur"],Sr=new Map;function L0(n,e,t,i,s="towards",r=null){const a=sd[n]||wc[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...C0.map(d=>i[d]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Sr.get(h);if(!l){if(l=r0(o,()=>a.q?l0(a,e,t,i,s):S0.get(a.plan)(a,e,t,i,s)),o?.woken)for(let d=0;d<l.m.length;d++)(l.m[d]===c.EYE||l.m[d]===c.IRIS||l.m[d]===c.PUPIL)&&(l.m[d]=c.WOKEN);Sr.size>600&&Sr.delete(Sr.keys().next().value),Sr.set(h,l)}return l}const uo=.07,Sc=.048,je=(...n)=>({l:n}),Dt=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),dn=(n,e)=>({d:[n,e]}),St=(n,e=.86)=>je([.5,e],[.5,n]),Et=Dt(.5,.76,.13,25,155),P0=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},At=(...n)=>n.flatMap(e=>[e,P0(e)]);function Li(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,l=(n[1]+e[1])/2,d=s/r,f=-i/r,u=(o-Math.abs(a))*Math.sign(a),m=h-d*u,p=l-f*u,M=Math.atan2(n[1]-p,n[0]-m)*180/Math.PI;let x=Math.atan2(e[1]-p,e[0]-m)*180/Math.PI-M;for(;x>180;)x-=360;for(;x<-180;)x+=360;return Dt(m,p,o,M,M+x)}const D0=(n,e,t,i,s,r=24)=>je(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),I0=(n,e,t,i,s,r=0,a=40)=>je(...Array.from({length:a+1},(o,h)=>{const l=h/a,d=(r+l*s*360)*Math.PI/180,f=t+(i-t)*l;return[n+f*Math.cos(d),e+f*Math.sin(d)]})),ia=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return je([n+t*a,e+t*o],[n+i*a,e+i*o])}),O0={wolf:[St(.3),je([.28,.08],[.5,.3],[.72,.08]),Dt(.5,.55,.2,-55,55),Et,dn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[St(.34),je([.36,.06],[.5,.34],[.64,.06]),Dt(.67,.66,.17,180,-80),dn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),Et],badger:[St(.1),je([.24,.3],[.76,.3]),...At(je([.33,.14],[.33,.56])),Et,...At(dn(.24,.3))],boar:[St(.16),...At(Dt(.36,.24,.15,45,180)),...ia(.5,.16,0,.1,[-130,-90,-50]),Et],stag:[St(.42),...At(je([.5,.42],[.34,.26],[.3,.06]),je([.335,.25],[.16,.2]),je([.32,.15],[.18,.07])),Et],hare:[St(.44),...At(je([.5,.44],[.4,.34],[.38,.06])),Dt(.62,.66,.09,180,540),Et,...At(dn(.38,.06))],owl:[St(.44),...At(Dt(.33,.3,.13,0,360),je([.24,.18],[.18,.05])),Et,...At(dn(.33,.3))],bear:[St(.24),je([.24,.3],[.76,.3]),...At(Dt(.3,.3,.09,180,360)),...At(je([.36,.5],[.32,.62])),Et],hedgehog:[St(.52),Dt(.5,.52,.2,180,360),...ia(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),Et],squirrel:[St(.2),je([.5,.2],[.4,.08]),Dt(.66,.4,.16,100,-200),dn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),Et],toad:[St(.42),je([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...At(Dt(.34,.3,.1,0,360)),Et,...At(dn(.16,.54))],otter:[St(.24),Dt(.5,.5,.28,-100,100),dn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Li([.18,.64],[.36,.64],.3),Et],lynx:[St(.32),je([.26,.2],[.5,.32],[.74,.2]),...At(je([.26,.2],[.26,.06])),je([.5,.68],[.66,.62]),Et,...At(dn(.26,.06))],elk:[St(.3),...At(je([.5,.3],[.42,.2]),Dt(.3,.16,.12,0,180),je([.18,.16],[.14,.06])),je([.5,.44],[.6,.52]),Et],raven:[St(.14),je([.5,.14],[.3,.22]),je([.18,.56],[.5,.38],[.82,.56]),Et,dn(.58,.17),...At(dn(.18,.56))],bat:[St(.3),Dt(.5,.16,.14,20,160),...At(je([.5,.38],[.12,.26]),Li([.12,.26],[.24,.46],-.25),Li([.24,.46],[.38,.5],-.3),Li([.38,.5],[.5,.52],-.3)),Et],mole:[St(.44),Dt(.5,.3,.16,0,180),...ia(.5,.3,.19,.3,[-160,-125,-55,-20]),je([.5,.14],[.5,.04]),Et],beaver:[St(.36),je([.32,.2],[.68,.2]),...At(je([.44,.2],[.44,.34])),je([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),Et],stoat:[St(.18),Dt(.5,.44,.24,180,360),je([.5,.18],[.6,.08]),Et,...At(dn(.26,.44))],snail:[St(.52),I0(.5,.33,.03,.2,1.6,90),je([.66,.2],[.76,.06]),Et,dn(.76,.06)],ram:[St(.24),...At(Dt(.36,.24,.14,0,-250)),Et,...At(dn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[St(.24),Dt(.5,.52,.22,205,335),Dt(.5,.66,.24,205,335),Dt(.5,.38,.2,205,335),...At(je([.5,.24],[.32,.06])),Et],snake:[St(.16),D0(.5,.82,.2,.2,1.25),je([.5,.2],[.5,.11]),...At(je([.5,.11],[.42,.045])),Et],moth:[St(.2),...At(je([.5,.3],[.16,.18],[.24,.5],[.5,.4]),je([.5,.5],[.3,.64],[.5,.66]),Dt(.38,.16,.12,0,-110)),Et],marten:[St(.32),je([.3,.2],[.5,.32],[.7,.2]),...At(Dt(.3,.14,.07,90,-180)),Dt(.28,.56,.22,0,150),dn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),Et],salamander:[St(.3),Li([.5,.3],[.5,.06],.35),Li([.5,.3],[.5,.06],-.35),...At(je([.5,.42],[.32,.38],[.26,.48]),je([.5,.64],[.32,.6],[.26,.7])),Et,...At(dn(.38,.52))],glowworm:[St(.4),Dt(.5,.27,.1,90,450),...ia(.5,.27,.15,.25,[0,60,120,180,240,300]),Et],spider:[je([.5,.05],[.5,.3]),St(.5),Dt(.5,.4,.11,-90,270),...At(...[-150,-170,170,150].map(n=>je([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Et,dn(.5,.05)],dormouse:[St(.12),Dt(.5,.46,.24,-60,250),...At(Dt(.34,.16,.08,90,-180)),Li([.56,.38],[.7,.38],-.4),Et],beetle:[St(.36),...At(Dt(.66,.26,.2,160,250)),Li([.5,.38],[.5,.82],.25),Li([.5,.38],[.5,.82],-.25),Et]},xh={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},N0={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},or=n=>xh[N0[n]]||xh.cyan,F0=[255,255,250],U0=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),Mh=n=>`rgb(${n.join(",")})`;function k0(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Ua(n){if(n.d)return{dot:!0,pts:[n.d],len:Sc*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(l,d)=>{const f=(a+(o-a)*d/h)*Math.PI/180;return[i+r*Math.cos(f),s+r*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const Sl=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},So=new Map;function rd(n){return So.has(n)||So.set(n,Sl((O0[n]||[]).map(e=>({...Ua(e),w:uo,part:"sigil"})))),So.get(n)}const Eo=new Map;function B0(n,e=0){const t=n+":"+e;if(Eo.has(t))return Eo.get(t);const i=e===null?null:k0(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=uo*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const m=p=>Ua({a:[.5,.5,p,90,450]});for(let p=0;p<i.rings;p++)h.push({...m(.44-p*.06),w:o,part:"ring"});for(let p=0;p<i.dots;p++){const M=(90+p*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let p=0;p<16;p++){const M=(90+p*22.5)*Math.PI/180,g=.44-.06+.014,x=.44-.014;h.push({...Ua({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let p=0;p<i.rays;p++){const M=(90+p*360/i.rays)*Math.PI/180,g=.44+.02,x=.5-o/2;h.push({...Ua({l:[[.5+g*Math.cos(M),.5+g*Math.sin(M)],[.5+x*Math.cos(M),.5+x*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),d=rd(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([m,p])=>[r+m*s,r+p*s]),w:u.w*s*l,r:Sc*s*l,part:"sigil"})),f={level:e,frame:i,k:s,strokes:[...Sl(h,0,h.length?.15:0),...Sl(d,h.length?.15:0,1)]};return Eo.set(t,f),f}function z0(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function H0(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=or(e),progress:o=1,glow:h=!0}={}){const l=B0(e,r),d=l.frame?l.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const f=(u,m,p,M)=>{n.globalAlpha=p,n.strokeStyle=n.fillStyle=Mh(u),n.shadowColor=Mh(a),n.shadowBlur=M;for(const g of l.strokes){const x=z0(g,o);if(x){if(n.beginPath(),g.dot){n.arc(x[0][0],x[0][1],g.r*(m>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=g.w*m,x.forEach((v,b)=>b?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(f(a,2.4,Math.min(d,.7)*.55,s/12),f(U0(a,F0,.72),.62,1,s/30)):f(a,1,1,0),n.restore()}function G0(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<Sc+i-uo/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],l=r.pts[o],d=l[0]-h[0],f=l[1]-h[1],u=d*d+f*f,m=Math.sqrt(u),p=u?Math.max(0,Math.min(1,((e-h[0])*d+(t-h[1])*f)/u)):0;if(Math.hypot(e-h[0]-d*p,t-h[1]-f*p)<i){const M=r.start+(a+p*m)/r.len*(r.end-r.start);M<s&&(s=M)}a+=m}}return s}function ad(n,e,t,i=uo/2){return G0(rd(n),e,t,i)<1/0}wc.map(n=>n.id);const Ur=new Set([c.TRUNK,c.BARK2,c.BARKD,c.BARKL,c.BELLY]);function wn(n,e,t,i,s,r,{mat:a=c.LEAF,group:o=30,ragged:h=1}={}){const d=[];for(let x=0;x<9;x++){const v=x/9*Math.PI*2,b=1+(r()-.5)*.35*(s.clump+.3);d.push([e[0]+Math.cos(v)*t*b,e[1]+Math.sin(v)*i*b*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(co(d,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([bt(e,[-t*1.1,i*.15]),bt(e,[t*1.1,i*.1]),bt(e,[t*1.1,i*1.2]),bt(e,[-t*1.1,i*1.2])],c.LEAF3,[a]),n.mark([bt(e,[-t*.75,-i*.55]),bt(e,[t*.25,-i*.95]),bt(e,[t*.55,-i*.35]),bt(e,[-t*.2,-i*.05])],c.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),m=Math.ceil(e[0]+t*1.2),p=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),g=r()*1e4|0;for(let x=p;x<=M;x++)for(let v=u;v<=m;v++){const b=n.get(v,x);if(b!==a&&b!==c.LEAF2&&b!==c.LEAF3)continue;const w=ft(v,x,g),E=wi(v/2,x/2,g)*.5+w*.5;E<.16*s.density?n.recolour(v,x,b===c.LEAF2?a:c.LEAF2):E>1-.16*s.density&&n.recolour(v,x,b===c.LEAF3?a:c.LEAF3)}}function Mn(n,e,t,i,s,r,a,o,{mat:h=c.TRUNK,bend:l=1,group:d=10,line:f=!1}={}){const u=[e],m=4;let p=t,M=e;for(let g=1;g<=m;g++)p+=(o()-.5)*.7*a.gnarl*l,M=bt(M,[Math.cos(p)*i/m,Math.sin(p)*i/m]),u.push(M);return n.limb(u.map((g,x)=>[...g,s+(r-s)*x/m]),h,{group:d,line:f,round:a.round,cap:.6,capEnd:1}),{end:M,ang:p,pts:u}}function Wi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],c.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const l=h%2?1:-1,d=(8+r()*16)*a*(.4+s.roots),f=(2+r()*3)*a,u=[e+l*i*.2,t-i*.5],m=[e+l*(i*.55+d*.4),t-f],p=[e+l*(i*.5+d),t-.5];n.limb([[...u,i*.55],[...m,i*.28],[...p,1.2]],c.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function ss(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==c.TRUNK)continue;const a=t?wi(s/1.3,i/6,21):wi(s/6,i/1.3,21);a>1-e.bark*.42||ft(s,i,4)<e.bark*.05?n.m[r]=c.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=c.BARKL)}}function Vn(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let m=0;m<n.w;m++)n.m[u*n.w+m]&&(i=Math.min(i,m),s=Math.max(s,m),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),l=Math.max(0,r-1),d=n.h-l,f=new pt(h,d);for(let u=0;u<d;u++)for(let m=0;m<h;m++){const p=(u+l)*n.w+m+o,M=u*h+m;f.m[M]=n.m[p],f.g[M]=n.g[p],f.n[M*3]=n.n[p*3],f.n[M*3+1]=n.n[p*3+1],f.n[M*3+2]=n.n[p*3+2]}return{sp:f,crownY:t-l}}const di=n=>(n.crownWidth||3)/3;function W0(n,e,t){const i=di(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new pt(s,r),o=s/2,h=r,l=e.treeTrunks||1,d=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let m=r;const p=(M,g,x,v,b)=>{const w=Mn(a,M,g,x,v,v*.65,e,n,{group:12});if(b===0){u.push(w.end);return}const E=n()<.35?3:2;for(let y=0;y<E;y++){const A=(y-(E-1)/2)*pe(n,.5,.85)*(b===3?1.4:1);p(w.end,w.ang+A+(n()-.5)*.25,x*pe(n,.6,.78),v*.62,b-1)}b<=2&&u.push(Tn(M,w.end,.7))};for(let M=0;M<l;M++){const g=f+(l>1?(M/(l-1)-.5)*.8:0),x=[o+(M-(l-1)/2)*d*.6,h],v=Mn(a,x,-Math.PI/2+g,r*.36*(l>1?pe(n,.75,1.15):1),d,d*.72,e,n,{bend:1.4});m=Math.min(m,v.end[1]);for(const b of[-1,1])p(v.end,-Math.PI/2+g*.5+b*pe(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),r*.22*(.75+.25*i)*(l>1?.7:1),d*.7,l>2?2:3);if(l===1&&n()<.7&&p(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,d*.55,2),M===0&&e.treeHollow){const b=Tn(x,v.end,.38);a.ellipse(b[0],b[1],d*.28,d*.5,c.NOSE,{round:.3})}}if(Wi(a,o,h,d*Math.sqrt(l),e,n,t),ss(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const g=u[M],x=u[M+1],v=Math.hypot(x[0]-g[0],x[1]-g[1]);if(v<40*t)for(let b=0;b<=v;b++){const w=Tn(g,x,b/v);a.px(w[0],w[1]+Math.sin(b/v*Math.PI)*v*.15,c.WEB,0,0,1)}}if(e.treeBare)return Vn(a,o,m+4*t);u.sort((M,g)=>M[1]-g[1]);for(const M of u)wn(a,bt(M,[0,-3*t]),pe(n,14,21)*t,pe(n,10,14)*t,e,n,{mat:n()<.35?c.LEAF3:c.LEAF});for(const M of u)n()<.75&&wn(a,bt(M,[pe(n,-9,9)*t,pe(n,-12,-3)*t]),pe(n,10,15)*t,pe(n,7,10)*t,e,n);return Vn(a,o,m+4*t)}function V0(n,e,t){const i=.8+.2*di(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],c.TRUNK,{group:10,round:e.round}),Wi(a,o,h,6*t,e,n,t*.6),ss(a,e);const l=Math.round(pe(n,9,12));for(let d=l-1;d>=0;d--){const f=d/(l-1),u=6*t+f*r*.7,m=(5+f*36)*t*i*pe(n,.9,1.1),p=(5+f*13)*t,M=[[o,u-4*t],[o+m*.5,u+p*.3],[o+m,u+p],[o+m*.7,u+p*1.15],[o,u+p*.7],[o-m*.7,u+p*1.15],[o-m,u+p],[o-m*.5,u+p*.3]];a.shape(co(M,1,7,Math.max(2,Math.round(m/(3*t))),2*t,1),c.LEAF,{group:30+d,line:!1,round:e.round}),a.mark([[o-m,u+p*.55],[o+m,u+p*.55],[o+m,u+p*1.4],[o-m,u+p*1.4]],c.LEAF3,[c.LEAF]),a.mark([[o-m*.55,u-2*t],[o+m*.1,u-3*t],[o+m*.1,u+p*.45],[o-m*.7,u+p*.7]],c.LEAF2,[c.LEAF])}return Vn(a,o,r*.82)}function Y0(n,e,t){const i=di(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new pt(s,r),o=s/2,h=r,l=13*t,d=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,l,l*.8,e,n,{bend:1.6}),f=[];for(let p=0;p<5;p++){const M=p%2?1:-1,g=-Math.PI/2+M*pe(n,.55,1.25)*(.7+.3*i),x=Mn(a,d.end,g,r*pe(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});f.push(x.end)}Wi(a,o,h,l,e,n,t),ss(a,e);for(const p of f)wn(a,bt(p,[0,-2*t]),pe(n,20,28)*t,pe(n,9,12)*t,e,n);wn(a,bt(d.end,[0,-8*t]),24*t,11*t,e,n);let u=s,m=0;for(const p of f)u=Math.min(u,p[0]-22*t),m=Math.max(m,p[0]+22*t);for(let p=u;p<m;p+=pe(n,1,1.7)){let M=r;for(let b=0;b<r;b++)if(a.get(p,b)===c.LEAF||a.get(p,b)===c.LEAF2||a.get(p,b)===c.LEAF3){M=b;break}if(M>=r)continue;const g=Math.abs(p-o)/(s/2),x=(h-M)*pe(n,.5,.9)*(1-g*.3),v=ft(p|0,1,9)<.4?c.LEAF2:c.LEAF;for(let b=M+2;b<Math.min(h-2,M+x);b++){const w=Math.round(Math.sin(b*.12+p)*.7);ft(p|0,b,5)<.2+e.density*.8&&a.px(p+w,b,(b-M)/x>.8?c.LEAF3:v,w*.3,.2,.95)}}return Vn(a,o,d.end[1]+6*t)}function od(n,e,t){const i=.7+.3*di(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new pt(s,r),o=s/2,h=r,l=(n()-.5)*.25+(e.treeLean||0),d=Mn(a,[o,h],-Math.PI/2+l,r*.85,5*t,2*t,e,n,{mat:c.BARK2,bend:.4});for(let u=0;u<d.pts.length-1;u++)for(let m=0;m<1;m+=1/8){const p=Tn(d.pts[u],d.pts[u+1],m+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(p[0]+M,p[1])===c.BARK2&&n()<.8&&a.recolour(p[0]+M,p[1],c.BARKD)}const f=[d.end];for(let u=0;u<7;u++){const m=pe(n,.35,.9),p=Tn(d.pts[0],d.end,m),M=u%2?1:-1,g=Mn(a,p,-Math.PI/2+M*pe(n,.5,1),r*pe(n,.12,.2)*i,2*t,1,e,n,{mat:c.BARKD,group:12});f.push(g.end)}for(const u of f)wn(a,u,pe(n,9,13)*t*i,pe(n,7,10)*t,e,n,{mat:c.LEAF2,ragged:1.3});return Vn(a,o,r*.55)}function X0(n,e,t){const i=di(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new pt(s,r),o=s/2,h=r,l=10*t,d=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,l,l*.75,e,n,{bend:1.2}),f=[];for(const p of[-1,1,-1,1]){const M=Mn(a,d.end,-Math.PI/2+p*pe(n,.7,1.15)*(.7+.3*i),r*pe(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});f.push(M.end,Tn(d.end,M.end,.55))}Wi(a,o,h,l,e,n,t),ss(a,e);const u=Math.round(pe(n,2,3)),m=Math.min(...f.map(p=>p[1]));for(let p=0;p<u;p++){const M=m-6*t+p*9*t,g=(95-p*12)*t*(.65+.35*i);for(let x=0;x<5;x++)wn(a,[o+(x-2)*g*.36+pe(n,-5,5)*t,M+pe(n,-3,3)*t],g*pe(n,.2,.26),7*t,e,n,{mat:p===u-1?c.LEAF:c.LEAF3})}return Vn(a,o,d.end[1]+4*t)}function gr(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:l=c.FLOWER,dotTall:d=!1,mats:f=[c.LEAF,c.LEAF2,c.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),m=Math.ceil(e[0]+t*1.3),p=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),g=s()*1e4|0;for(let x=p;x<=M;x++)for(let v=u;v<=m;v++){const b=n.get(v,x);if(!f.includes(b))continue;const w=wi(v/r,x/r,g),E=ft(v,x,g);a&&w<a?n.recolour(v,x,c.LEAF3):w>1-o&&n.recolour(v,x,c.LEAF2),h&&E<h&&b!==c.LEAF3&&(n.recolour(v,x,l),d&&n.recolour(v,x-1,l))}}function Vi(n,e,t,i){const s=di(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new pt(r,a),h=r/2,l=a,d=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(d),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),m=[];let p=a;const M=(E,y,A,_,S)=>{const R=Mn(o,E,y,A,_,_*.65,e,n,{group:12,mat:i.limbMat||c.TRUNK,bend:i.bend??1});if(S===0){m.push(R.end);return}const T=n()<(i.fork??.35)?3:2;for(let L=0;L<T;L++)M(R.end,R.ang+(L-(T-1)/2)*pe(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,A*pe(n,.6,.78),_*.62,S-1);S<=2&&m.push(Tn(E,R.end,.7))};for(let E=0;E<d;E++){const y=u+(d>1?(E/(d-1)-.5)*(i.fan||.8):0),A=[h+(E-(d-1)/2)*f*.6,l],_=Mn(o,A,-Math.PI/2+y,a*(i.trunk||.36)*(d>1?pe(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||c.TRUNK});p=Math.min(p,_.end[1]);for(let S=0;S<(i.limbs||2);S++){const R=S%2?1:-1;M(_.end,-Math.PI/2+y*.5+R*pe(n,.5,1)*(i.spreadA||.8)*(d>1?.7:1),a*(i.limb||.22)*(d>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(_.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,f*.55,2),E===0&&e.treeHollow){const S=Tn(A,_.end,.38);o.ellipse(S[0],S[1],f*.28,f*.5,c.NOSE,{round:.3})}}if(i.noRoots||Wi(o,h,l,f*Math.sqrt(d),e,n,t*(i.rootK||1)),i.smooth||ss(o,e),e.treeBare)return Vn(o,h,p+4*t);m.sort((E,y)=>E[1]-y[1]);const[g,x]=i.clumpR||[12,18],v=i.flat||.7,b=[],w=(E,y,A,_)=>{wn(o,E,y,A,e,n,{mat:_,ragged:i.ragged||1}),b.push([E,y,A])};for(const E of m)w(bt(E,[0,-3*t]),pe(n,g,x)*t,pe(n,g,x)*t*v,n()<(i.darkBack??.35)?c.LEAF3:c.LEAF);for(const E of m)n()<(i.extra??.7)&&w(bt(E,[pe(n,-9,9)*t,pe(n,-12,-3)*t]),pe(n,g,x)*t*.7,pe(n,g,x)*t*v*.7,c.LEAF);if(i.dome){const E=Math.min(...m.map(S=>S[1])),y=m.map(S=>S[0]),A=(Math.min(...y)+Math.max(...y))/2,_=(Math.max(...y)-Math.min(...y))/2;for(let S=0;S<i.dome;S++){const R=S/Math.max(1,i.dome-1)-.5;w([A+R*_*1.1,E-(1-4*R*R)*14*t-pe(n,2,6)*t],pe(n,g,x)*t*1.1,pe(n,g,x)*t*v,c.LEAF)}}if(i.layers)for(const[E,y,A]of b)for(let _=-A;_<A;_+=Math.max(3,i.layers*t))for(let S=-y;S<y;S++)o.get(E[0]+S,E[1]+_)===c.LEAF&&o.recolour(E[0]+S,E[1]+_,c.LEAF3);for(const[E,y,A]of b)gr(o,E,y,A,n,i.tex||{});return Vn(o,h,p+4*t)}function K0(n,e,t){return Vi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function q0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:c.BARK2,limbMat:c.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function $0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function Z0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function J0(n,e,t){return Vi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function Q0(n,e,t){return Vi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function j0(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:c.BARK2,limbMat:c.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function ep(n,e,t){const i=.7+.3*di(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new pt(s,r),o=s/2,h=r,l=e.treeTrunks||1,d=(n()-.5)*.2+(e.treeLean||0),f=[];for(let m=0;m<l;m++){const p=Mn(a,[o+(m-(l-1)/2)*5*t,h],-Math.PI/2+d+(l>1?(m/(l-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(l),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const g=pe(n,.3,.97),x=Tn(p.pts[0],p.end,g),v=M%2?1:-1,b=(1-g*.6)*r*.12*i,w=Mn(a,x,-Math.PI/2+v*pe(n,.7,1.2),b,2*t,1,e,n,{group:12,mat:c.BARKD});f.push([w.end,(8+(1-g)*6)*t*i],[Tn(x,w.end,.4),(7+(1-g)*4)*t*i])}f.push([p.end,7*t])}Wi(a,o,h,6*t,e,n,t*.6),ss(a,e);for(const[m,p]of f)wn(a,m,p,p*.8,e,n,{mat:n()<.5?c.LEAF3:c.LEAF});for(const[m,p]of f)gr(a,m,p,p*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:c.BARKD});const u=Math.min(...f.map(([m])=>m[1]));return Vn(a,o,u+(h-u)*.45)}function tp(n,e,t){const i=.8+.2*di(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new pt(s,r),o=s/2,h=r,l=Mn(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});ss(a,e);for(let f=0;f<a.h*.55;f++)for(let u=0;u<s;u++)(a.get(u,f)===c.TRUNK||a.get(u,f)===c.BARKD)&&a.recolour(u,f,ft(u,f,3)<.15?c.BARKD:c.BELLY);Wi(a,o,h,8*t,e,n,t*.7);const d=[];for(let f=0;f<6;f++){const u=pe(n,.55,1),m=Tn(l.pts[0],l.end,u),p=f%2?1:-1,M=Mn(a,m,-Math.PI/2+p*pe(n,.6,1.3),r*pe(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:c.BELLY});d.push(M.end)}d.push(l.end);for(const f of d)wn(a,bt(f,[0,-2*t]),pe(n,13,19)*t*i,pe(n,4,6)*t,e,n,{mat:c.LEAF,ragged:1.3});for(const f of d)gr(a,bt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Vn(a,o,Math.min(...d.map(f=>f[1]))+8*t)}function np(n,e,t){const i=di(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new pt(s,r),o=s/2,h=r,l=e.treeTrunks||3,d=9*t*(e.treeThick||1.2);for(let m=0;m<l;m++)Mn(a,[o+(m-(l-1)/2)*d*.5,h],-Math.PI/2+(m-(l-1)/2)*.35+(e.treeLean||0),r*.3,d,d*.6,e,n,{mat:c.BELLY,bend:1.6});for(let m=0;m<r;m++)for(let p=0;p<s;p++)a.get(p,m)===c.BELLY&&(p+Math.round(m/6))%4===0&&a.recolour(p,m,c.BARKD);Wi(a,o,h,d*1.4,e,n,t);const f=h-r*.3,u=[];for(let m=0;m<9;m++){const p=Math.PI+m/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(p)*M,f+Math.sin(p)*M*.55+10*t],pe(n,16,22)*t])}for(let m=0;m<7;m++)u.push([[o+(m/6-.5)*(60+30*i)*t,f-pe(n,4,22)*t],pe(n,20,26)*t]);u.push([[o,f-24*t],26*t]);for(const[m,p]of u)wn(a,m,p,p*.7,e,n,{mat:c.LEAF3,ragged:.6});for(const[m,p]of u)gr(a,m,p,p*.7,n,{grain:.7,holes:0,flecks:.08,mats:[c.LEAF,c.LEAF2,c.LEAF3]});return Vn(a,o,f+4*t)}function ip(n,e,t){return Vi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function sp(n,e,t){const i=.8+.2*di(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],c.BARK2,{group:10,round:e.round});const l=[];for(let d=0;d<10;d++){const f=d/9,u=10*t+f*r*.72,m=(5+f*28)*t*i,p=1+Math.round(f*3);for(let M=0;M<p;M++)l.push([[o+(p>1?(M/(p-1)-.5)*m*1.3:0)+pe(n,-2,2)*t,u+pe(n,-2,2)*t],(6+f*5)*t])}for(const[d,f]of l)wn(a,d,f*1.2,f,e,n,{mat:c.LEAF3,ragged:.7});for(const[d,f]of l)gr(a,d,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[c.LEAF,c.LEAF2,c.LEAF3]});return Vn(a,o,r*.85)}function rp(n,e,t){return Vi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:c.BARK2,limbMat:c.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function ap(n,e,t){const i=od(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([c.LEAF,c.LEAF2,c.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||ft(r,1,7)<.35)continue;const o=(s.h-a)*pe(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===c.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,ft(r,h,2)<.3?c.LEAF:c.LEAF2,0,.2,.95)}return i}function op(n,e,t){const i=.8+.2*di(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new pt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],c.TRUNK,{group:10,round:e.round}),Wi(a,o,h,6*t,e,n,t*.5),ss(a,e);const l=14;for(let d=0;d<l;d++){const f=d/(l-1),u=8*t+f*r*.68,m=(4+f*30)*t*i;for(let p=0;p<4;p++){const M=[o+(p/3-.5)*m*1.6,u+Math.abs(p/3-.5)*6*t];wn(a,M,m*.35+2*t,4*t,e,n,{mat:c.LEAF2,ragged:1.6}),gr(a,M,m*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[c.LEAF,c.LEAF2]})}}return Vn(a,o,r*.8)}const lp=6;function cp(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,l=r.low||(r.low=new Uint8Array(o*h)),d=Math.ceil(a+lp*i);if(d>=h-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-f)/.5)),m=!!t.treeBare,p=S=>{const R=[];let T=-1;for(let L=0;L<=o;L++){const O=L<o&&Ur.has(r.m[S*o+L]);O&&T<0&&(T=L),!O&&T>=0&&(R.push([T,L-1]),T=-1)}return R},M=(S,R)=>S.reduce((T,L)=>!T||Math.abs((L[0]+L[1])/2-R)<Math.abs((T[0]+T[1])/2-R)?L:T,null),g=S=>{const R=r.m.slice(),T=r.n.slice();S();for(let L=0;L<R.length;L++)r.m[L]!==R[L]&&((L/o|0)<d||R[L]&&!Ur.has(R[L])&&!l[L]?(r.m[L]=R[L],r.n[L*3]=T[L*3],r.n[L*3+1]=T[L*3+1],r.n[L*3+2]=T[L*3+2]):l[L]=1)},x=()=>{for(let S=0;S<8;S++){const R=Math.round(pe(e,d,h-3)),T=p(R);if(T.length){const L=xc(e,T),O=e()<.5?-1:1;return{x:O<0?L[0]:L[1],y:R,side:O}}}return null},v=m?0:1,b=h-1;let w=o,E=0;for(let S=0;S<d*o;S++)if(r.m[S]&&!Ur.has(r.m[S])){const R=S%o;w=Math.min(w,R),E=Math.max(E,R)}const y=Math.max(6*i,(E-w)*.22);s.moss&&g(()=>{for(let S=Math.max(d,Math.round(h-(h-d)*.4));S<h;S++)for(let R=0;R<o;R++){const T=S*o+R;if(!Ur.has(r.m[T]))continue;const L=S>0&&!r.m[T-o];(wi(R/2.5,S/2.5,41)>1-s.moss*(.35+.4*(S-d)/(h-d))||L&&ft(R,S,9)<s.moss*.6)&&(r.m[T]=ft(R,S,5)<.3?c.LEAF2:c.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&g(()=>{let S=o/2;const R=b-(b-d)*pe(e,.45,.95)*Math.min(1,s.ivy+.3),T=e()*6;for(let L=b-1;L>R;L--){const O=M(p(L),S);if(!O)break;if(S=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(L*.22+T)),r.px(S,L,c.LEAF3,0,0,1),ft(Math.round(S),L,13)<.45){const I=ft(L,3,2)<.5?-1:1;r.px(S+I,L,c.LEAF,I*.5,-.3,.8),r.px(S+I*2,L,c.LEAF3,I*.6,0,.8),r.px(S+I,L-1,ft(S,L,4)<.4?c.LEAF2:c.LEAF3,0,-.6,.8)}}});const A=Math.round(s.sprigs*v*(5+8*u)*(h-d)/(40*i));for(let S=0;S<A;S++){const R=x();if(!R)break;const T=pe(e,3,5.5)*i;g(()=>wn(r,[R.x+R.side*T*.6,R.y],T,T*.75,t,e,{mat:e()<.4?c.LEAF3:c.LEAF,ragged:.8}))}const _=Math.round(s.boughs*v*(3+4*u)*(h-d)/(45*i)+(e()<s.boughs*v?1:0));for(let S=0;S<_;S++){const R=x();if(!R)break;g(()=>{const T=Mn(r,[R.x,R.y],-Math.PI/2+R.side*pe(e,.9,1.35),Math.min(y,pe(e,10,20)*i),2*i,1,t,e,{group:12,mat:c.TRUNK}),L=pe(e,6,9.5)*i;wn(r,bt(T.end,[0,-1*i]),L,L*.65,t,e,{mat:e()<.4?c.LEAF3:c.LEAF})})}if(s.skirt&&v){const S=Math.round(3+s.skirt*5+u*3);for(let R=0;R<S;R++)g(()=>{const T=Math.round(pe(e,Math.max(d,h-(h-d)*.8),h-4*i)),L=M(p(T),o/2);if(!L)return;const O=R%2?1:-1,I=O<0?L[0]:L[1],k=Math.min(y*1.3,pe(e,14,24)*i*(.6+s.skirt*.5)),H=Mn(r,[I,T],-Math.PI/2+O*pe(e,1.6,1.95),k,1.6*i,1,t,e,{group:12,mat:c.BARKD});wn(r,Tn([I,T],H.end,.6),k*.5,3.5*i,t,e,{mat:e()<.5?c.LEAF3:c.LEAF,ragged:1.2})})}return n}const hp={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},up=(n,e)=>(t,i,s)=>cp(n(t,i,s),t,i,s,e),Ka={broad:{fn:W0,name:"gnarled broadleaf",grow:"normal"},fir:{fn:V0,name:"spruce",grow:"narrow",hue:.06},willow:{fn:Y0,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:od,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:X0,name:"field maple",grow:"normal",hue:.01},oak:{fn:K0,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:q0,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:$0,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:Z0,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:J0,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:Q0,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:j0,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:ep,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:tp,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:np,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:ip,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:sp,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:rp,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:ap,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:op,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Ka))e.bare=e.fn,e.fn=up(e.fn,hp[n]||{});const dp=new Map(Object.entries(Ka).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),Ec=n=>Ka[n]||Ka.broad;function fo(n,e,t){const i=dp.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,l={[c.TRUNK]:de(e.trunkHue,.45*e.sat,.34),[c.BARKD]:de(e.trunkHue+.03,.5*e.sat,.17),[c.BARKL]:de(e.trunkHue-.01,.38*e.sat,.5),[c.BARK2]:[222,220,212],[c.LEAF]:de(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[c.LEAF2]:de(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[c.LEAF3]:de(h+.03,Math.min(1,.66*e.sat*s),.38*r),[c.WEB]:[225,225,232]};return i?.trunk&&(l[c.BARK2]=de(...i.trunk)),i?.upper&&(l[c.BELLY]=de(...i.upper)),i?.dot&&(l[c.FLOWER]=i.dot),l}function ld(n){const{sp:e,crownY:t}=n,i=new pt(e.w,e.h),s=new pt(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Ur.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function fp(n,e){const t=e.bushSize,i=xc(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new pt(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let l=0;l<h;l++)wn(a,[s/2+pe(n,-9,9)*t,r-8*t+pe(n,-4,2)*t],pe(n,7,10)*t,pe(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const d=s/2+pe(n,-12,12)*t,f=r-pe(n,5,17)*t;a.get(d,f)&&a.recolour(d,f,c.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const l=-Math.PI/2+(h/6-.5)*2.4;let d=s/2,f=r-1;for(let u=0;u<15*t;u++)d+=Math.cos(l)*.9,f+=Math.sin(l)*.9+u*.06,a.put(d,f,h%2?c.LEAF3:c.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(a.put(d,f-1,c.LEAF2,0,-.5,.85),a.put(d+Math.sign(Math.cos(l)),f+1,c.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const l=s/2+pe(n,-13,13)*t,d=pe(n,5,15)*t,f=pe(n,-3,3);for(let u=0;u<d;u++)a.put(l+f*u/d*(u/d),r-1-u,u>d*.65?c.LEAF2:u<d*.3?c.LEAF3:c.LEAF,f*.1,-.3,.9)}const o=fo(n,e,null);return o[c.FLOWER]=de(n(),.55,.95),{sp:a,colours:o}}const Ve=(n,e={})=>["tree",{type:n,...e}],We=(n,e={})=>[n,e],xr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[We("water",{w:1.6})],small:[We("grass",{h:1.4})],big:[We("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[We("fern")],big:[Ve("larch",{scale:1.1}),Ve("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[We("stump",{snag:!0})],big:[Ve("sycamore",{trunks:3,gnarl:.9}),Ve("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[We("henge")],small:[We("stones")],big:[We("boulder")],set:We("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[We("bramble",{bare:!0})],big:[Ve("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ve("birch",{scale:.75})],big:[Ve("lime",{trunks:3,thick:1.4}),Ve("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[We("mound",{brown:!0})],big:[Ve("hazel",{gnarl:1,scale:.95}),Ve("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[We("wall")],small:[We("flowerbed")],big:[Ve("willow")],set:We("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ve("broad",{trunks:4,scale:.5,thin:!0})],big:[Ve("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[We("flowers",{hue:.98,leafy:!0})],big:[Ve("yew",{scale:1.4,gnarl:1,lean:.35}),Ve("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[We("stones",{big:!0})],big:[Ve("fir",{scale:1.2}),Ve("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[We("stump",{grass:!0})],big:[Ve("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[We("shrub",{flower:[250,245,235]})],big:[Ve("chestnut",{scale:1.1}),Ve("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[We("cones",{acorn:!0}),We("log",{branch:!0})],big:[Ve("oak",{gnarl:.9,hollow:!0}),Ve("holly",{minor:!0,scale:.8})],set:Ve("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[We("bramble")],small:[We("shrub",{flower:[200,30,60]})],big:[Ve("pine",{scale:1.2}),Ve("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[We("water"),We("reeds",{tall:!0})],small:[We("reeds")],big:[Ve("willow"),Ve("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[We("water",{w:2})],small:[Ve("broad",{scale:.45})],big:[Ve("alder",{scale:.95,gnarl:.3}),Ve("willow",{minor:!0,scale:.8})],set:We("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[We("boulder",{big:!0})],small:[We("stones",{big:!0})],big:[Ve("rowan",{scale:1.1}),Ve("pine",{minor:!0})],set:We("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[We("water",{bog:!0})],small:[We("reeds",{cotton:!0})],big:[Ve("birch",{scale:.8,dark:!0}),Ve("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[We("log",{branch:!0})],big:[Ve("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[We("rockwall")],small:[We("stalagmite")],big:[Ve("broad",{bare:!0}),Ve("yew",{minor:!0,scale:.8})],set:We("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[We("mound",{brown:!0,small:!0})],big:[Ve("flat",{scale:1.1}),Ve("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[We("water",{w:2})],small:[We("stump",{gnawed:!0})],big:[Ve("weepingBirch"),Ve("alder",{minor:!0,scale:.8})],set:We("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[We("fungi")],big:[We("log",{rot:!0})],set:We("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[We("shrub",{flower:[250,205,40],spiky:!0})],big:[Ve("birch",{lean:.45,scale:.75}),Ve("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[We("cones")],big:[Ve("pine",{scale:1.35}),Ve("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[We("rockwall",{moss:!0})],small:[We("fern")],big:[We("boulder",{moss:!0,big:!0})],set:We("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[We("fern")],big:[Ve("beech",{gnarl:.2,scale:1.1}),Ve("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[We("hedge",{berries:!0})],small:[We("web")],big:[Ve("holly",{scale:.9}),Ve("yew",{minor:!0,scale:.7})],set:Ve("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[We("bramble")],small:[We("shrub",{flower:[250,230,170]})],big:[Ve("hazel",{trunks:5,scale:.7,thin:!0}),Ve("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(td)){const i=xr.find(s=>s.id===n);i&&!i.set&&(i.set=We(e,{three:!0}),i.text={...i.text,set:t})}const cd=Object.fromEntries(xr.map(n=>[n.id,n])),pp=["ruins","rocks","freak","lake","modern"],Tt=(n,e,t,i,s,r,a,o,h,l,d={})=>({pattern:n,...d,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(pp.map((f,u)=>[f,h[1][u]]))},feel:l}),Ht=[0,0],mp={moor:Tt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Tt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ht,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Tt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ht,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Tt("rings",.35,.8,[1,[10,14]],null,.3,Ht,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Tt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ht,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Tt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ht,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Tt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ht,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Tt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ht,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Tt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Tt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Tt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ht,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Tt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Tt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ht,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Tt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ht,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Tt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ht,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Tt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ht,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Tt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ht,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Tt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Tt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ht,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Tt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ht,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Tt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ht,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Tt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ht,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Tt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ht,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Tt("groves",.5,.7,[2,[6,10]],null,.7,Ht,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Tt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Tt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ht,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Tt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ht,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Tt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ht,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Tt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ht,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Tt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ht,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of xr)n.layout=mp[n.id];function gp(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new pt(t,i),l=n.id.length*131;for(let M=0;M<i;M++)for(let g=0;g<t;g++){const x=(wi(g/7,M/5,l)*(t-g)*(i-M)+wi((g-t)/7,M/5,l)*g*(i-M)+wi(g/7,(M-i)/5,l)*(t-g)*M+wi((g-t)/7,(M-i)/5,l)*g*M)/(t*i),v=x<.38?c.BODY2:x>.64?c.BELLY:c.BODY;h.px(g,M,v,0,-.42,.91)}const d=$r(l),f=(M,g,x)=>h.px((M%t+t)%t,(g%i+i)%i,x,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const g=Math.floor(d()*t),x=Math.floor(d()*i);if(s==="needles"){const v=d()<.5?1:-1;for(let b=0;b<3;b++)f(g+b*v,x+(b>>1),d()<.5?c.BODY2:c.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let b=0;b<v;b++)f(g,x-b,b===v-1?c.LEAF2:c.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&d()<.5&&f(g+1,x-v,c.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(f(g,x,c.ACCENT),d()<.6&&f(g+1,x,c.ACCENT),d()<.4&&f(g,x+1,c.BODY2),s==="roots"&&d()<.5)for(let v=0;v<5;v++)f(g+v,x+(v>2?1:0),c.TRUNK)}else if(s==="leaves")f(g,x,c.FLOWER),f(g+1,x,c.FLOWER),d()<.5&&f(g,x+1,c.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)f(g+v,x,c.BODY2)}const m={flowers:de(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:de(r+.02,.65,.6)}[s]||de(r,.3,.6),p={[c.BODY]:de(r,a*e.sat,o),[c.BODY2]:de(r+.02,a*e.sat*1.1,o*.78),[c.BELLY]:de(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[c.ACCENT]:s==="needles"?de(.07,.5,.5):de(.1,.08,.62),[c.FLOWER]:m,[c.LEAF]:de(n.leaf,.55*e.sat,.45),[c.LEAF2]:de(n.leaf-.03,.5*e.sat,.62),[c.TRUNK]:de(e.trunkHue,.4,.3)};return{sp:h,colours:p}}const gs=n=>({[c.ACCENT]:de(.1,.06,.6),[c.BODY2]:de(.62,.08,.4),[c.BELLY]:de(.1,.05,.78),[c.LEAF]:de(.27,.5,.45),[c.LEAF2]:de(.25,.45,.62),[c.NOSE]:[20,16,24]});function er(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const l=h/8*Math.PI*2,d=1+(r()-.5)*.3;o.push([e[0]+Math.cos(l)*t*d,e[1]+Math.sin(l)*i*d*(Math.sin(l)>0?.5:1)])}n.shape(o,c.ACCENT,{group:5,line:!0,round:s.round}),n.mark([bt(e,[-t,i*.1]),bt(e,[t,i*.1]),bt(e,[t,i]),bt(e,[-t,i])],c.BODY2,[c.ACCENT]),n.mark([bt(e,[-t*.6,-i*.8]),bt(e,[t*.1,-i*1.1]),bt(e,[t*.3,-i*.5]),bt(e,[-t*.3,-i*.3])],c.BELLY,[c.ACCENT]),a&&n.mark(co([bt(e,[-t*1.1,-i*.55]),bt(e,[0,-i*1.3]),bt(e,[t*1.1,-i*.5]),bt(e,[t*.6,-i*.2]),bt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),c.LEAF,[c.ACCENT,c.BELLY,c.BODY2])}function ka(n,e,t,i,s,r){const a={[c.LEAF]:de(t.leaf,.6*i.sat,.55),[c.LEAF2]:de(t.leaf-.05,.55*i.sat,.78),[c.LEAF3]:de(t.leaf+.03,.66*i.sat,.36)},o={[c.TRUNK]:de(i.trunkHue,.45*i.sat,.34),[c.BARKD]:de(i.trunkHue+.03,.5*i.sat,.17),[c.BARKL]:de(i.trunkHue-.01,.38*i.sat,.5),[c.BELLY]:de(i.trunkHue+.02,.3,.7)},h={[c.MAGIC]:[60,110,150],[c.MAGIC2]:[150,200,220],[c.BODY2]:[35,70,100]};if(n==="tree"){const M=Ec(e.type).fn,g={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},x=M(s,g,i.treeSize*r*(e.scale||1)*pe(s,.9,1.1)),v=fo(s,g,M);return e.dark&&(v[c.LEAF]=v[c.LEAF3],v[c.LEAF3]=de(t.leaf+.05,.7,.22)),v[c.NOSE]=[20,16,24],v[c.WEB]=[225,225,232],{sp:x.sp,colours:v}}if(n==="shrub"){const M=fp(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let g=0;g<M.sp.m.length;g++)M.sp.m[g]&&ft(g,1,3)<(e.spiky?.18:.1)&&M.sp.m[g]!==c.TRUNK&&(M.sp.m[g]=c.FLOWER);return M.colours[c.FLOWER]=e.flower,M}const l=Math.round(48*r*(e.w||1)),d=Math.round(32*r),f=new pt(l,d),u=l/2,m=d;let p={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,g=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&f.shape([[u-20*r,m-2],[u-18*r,m-6*r],[u+18*r,m-6*r],[u+20*r,m-2],[u+20*r,m],[u-20*r,m]],c.ACCENT,{group:2,line:!0});for(let x=0;x<M;x++){const v=u+pe(s,-16,16)*r,b=g*pe(s,.5,1),w=n==="fern"?pe(s,-6,6)*r:pe(s,-2,2)*r,E=m-1-(n==="flowerbed"?5*r:0);for(let y=0;y<b;y++){const A=y/b;f.px(v+w*A*A,E-y,A>.7?c.LEAF2:A<.3?c.LEAF3:c.LEAF,w*.05,-.3,.9),n==="fern"&&y%2&&f.px(v+w*A*A+(w>0?1:-1),E-y+1,c.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let y=0;y<(e.cotton?2:3);y++)f.px(v+w,E-b-y,e.cotton?c.WEB:c.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(f.px(v+w,E-b,c.FLOWER,0,-.5,.85),f.px(v+w+1,E-b,c.FLOWER,0,-.5,.85))}if(p={...a,[c.FLOWER]:n==="flowerbed"?xc(s,[[230,80,120],[250,210,60],[150,110,230]]):de(e.hue??.95,.6,.85),[c.TRUNK]:de(.07,.5,.35),[c.WEB]:[240,240,235],[c.ACCENT]:de(.08,.1,.55)},n==="flowerbed"){for(let x=0;x<f.m.length;x++)f.m[x]===c.FLOWER&&ft(x,2,7)<.5&&(f.m[x]=c.BELLY);p[c.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)er(f,[u+pe(s,-14,14)*r,m-(e.big?5:2.5)*r],(e.big?6:3)*r*pe(s,.7,1.2),(e.big?5:2.5)*r,i,s);p=gs()}else if(n==="boulder")er(f,[u,m-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),p={...gs(),...a,[c.ACCENT]:de(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*r,m],[u-8*r,m-18*r],[u-4*r,m-28*r],[u+5*r,m-27*r],[u+8*r,m-14*r],[u+7*r,m]],c.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*r,m-30*r],[u+9*r,m-30*r],[u+9*r,m-22*r],[u-9*r,m-18*r]],c.LEAF,[c.ACCENT]),p={...gs(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,g=(e.small?5:8)*r;f.shape(co([[u-M,m],[u-M*.6,m-g*.8],[u,m-g],[u+M*.6,m-g*.8],[u+M,m]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?c.LEAF:c.TRUNK,{group:5,round:i.round}),f.mark([[u-M,m-g*.45],[u+M,m-g*.45],[u+M,m],[u-M,m]],e.moss?c.LEAF3:c.BARKD,[e.moss?c.LEAF:c.TRUNK]),p={...a,...o,[c.TRUNK]:de(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(f.limb([[u,m,M*2.2],[u,m-8*r,M*1.6]],c.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-M*.8,m-8*r],[u,m-10*r-(e.gnawed?4*r:0)],[u+M*.8,m-8*r],[u,m-7*r]],c.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+M*.4,m-8*r,2.5*r],[u+M*1.6,m-15*r,1.5*r]],c.TRUNK,{group:7,round:i.round}),e.grass)for(let g=0;g<20;g++){const x=u+pe(s,-14,14)*r,v=pe(s,6,13)*r;for(let b=0;b<v;b++)f.px(x,m-1-b,b>v*.6?c.LEAF2:c.LEAF,0,-.3,.9)}p={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,g=(e.giant?14:e.branch?3:8)*r;if(f.limb([[u-M/2,m-g/2,g],[u+M/2,m-g/2-(e.branch?2*r:0),g*.9]],c.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+M/2-g*.1,m-g],[u+M/2+g*.2,m-g/2],[u+M/2-g*.1,m],[u+M/2-g*.3,m-g/2]],c.BELLY,{group:6,round:i.round}),e.rot)for(let x=0;x<(e.giant?6:3);x++){const v=u+pe(s,-M/2,M/3);f.shape([[v-3*r,m-g*.9],[v,m-g-3*r],[v+3*r,m-g*.9]],c.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,m-g,g*.7],[u+5*r,m-g-6*r,g*.4]],c.TRUNK,{group:6,round:i.round}),p={...o,[c.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const g=u+pe(s,-12,12)*r,x=pe(s,3,7)*r,v=pe(s,3,5)*r;f.limb([[g,m,1.6*r],[g,m-x,1.4*r]],c.BELLY,{group:5}),f.shape([[g-v,m-x],[g,m-x-v*.8],[g+v,m-x]],M%2?c.FLOWER:c.MAGIC,{group:6+M%2,line:!0,round:i.round})}p={[c.BELLY]:[225,215,195],[c.FLOWER]:[190,80,50],[c.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const g=u+pe(s,-14,14)*r,x=m-2*r;f.ellipse(g,x,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,c.TRUNK,{round:i.round}),e.acorn?f.ellipse(g,x-1.6*r,1.8*r,1*r,c.BARKD,{round:i.round}):f.px(g,x-1,c.BARKL)}p=o}else if(n==="water"){const M=22*r*(e.w||1),g=6*r;f.shape([[u-M,m-g],[u-M*.3,m-g*1.5],[u+M*.6,m-g*1.2],[u+M,m-g*.5],[u+M*.4,m],[u-M*.7,m-g*.2]],c.MAGIC,{group:5,round:.2});for(let x=0;x<6;x++){const v=u+pe(s,-M*.6,M*.6),b=m-g*pe(s,.4,1.1);for(let w=0;w<3*r;w++)f.recolour(v+w,b,c.MAGIC2)}p=e.bog?{[c.MAGIC]:[60,70,50],[c.MAGIC2]:[120,130,90]}:h;for(let x=0;x<f.m.length;x++)f.m[x]===c.MAGIC?f.m[x]=c.BODY:f.m[x]===c.MAGIC2&&(f.m[x]=c.BELLY);p={[c.BODY]:p[c.MAGIC],[c.BELLY]:p[c.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,g=(n==="hedge"?18:12)*r;for(let x=0;x<(n==="hedge"?6:4);x++){const v=u+pe(s,-M*.8,M*.8),b=m-g*pe(s,.4,.7);f.ellipse(v,b,pe(s,6,9)*r,g*.45,n==="hedge"?c.LEAF3:c.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:x})}for(let x=0;x<8;x++){let b=u+pe(s,-M,M),w=m;for(let E=0;E<g*1.2;E++)b+=Math.sin(E*.3+x)*.8,w-=.8,f.px(b,w,c.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let x=0;x<f.m.length;x++)f.m[x]&&f.m[x]!==c.TRUNK&&ft(x,5,9)<.05&&(f.m[x]=c.FLOWER);p={...a,...o,[c.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,g=12*r;f.shape([[u-M,m],[u-M,m-g],[u+M,m-g],[u+M,m]],c.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-M-1,m-g],[u-M-1,m-g-2*r],[u+M+1,m-g-2*r],[u+M+1,m-g]],c.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+M-6*r,m-g-2*r],[u+M-6*r,m-g-7*r],[u+M,m-g-7*r],[u+M,m-g-2*r]],c.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+M-3*r,m-g-9*r,3*r,2.5*r,c.BELLY,{round:i.round});for(let x=m-g+3*r;x<m;x+=4*r)for(let v=u-M;v<u+M;v++)f.recolour(v,x,c.BODY2);p=gs()}else if(n==="rockwall"){for(let M=0;M<5;M++)er(f,[u+(M-2)*9*r,m-pe(s,8,14)*r],8*r,10*r,i,s,e.moss);p={...gs(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const g=u+pe(s,-14,14)*r,x=pe(s,5,11)*r;f.shape([[g-3*r,m],[g-1*r,m-x],[g+1*r,m-x],[g+3*r,m]],c.ACCENT,{group:5,line:!0,round:i.round})}p=gs()}else if(n==="web"){const M=[u,m-14*r],g=11*r;for(let x=0;x<8;x++){const v=x/8*Math.PI*2;for(let b=0;b<g;b++)f.px(M[0]+Math.cos(v)*b,M[1]+Math.sin(v)*b,c.WEB,0,0,1)}for(let x=3*r;x<g;x+=3*r)for(let v=0;v<Math.PI*2;v+=.05)f.px(M[0]+Math.cos(v)*x,M[1]+Math.sin(v)*x,c.WEB,0,0,1);p={[c.WEB]:[225,230,240]}}return{sp:f,colours:p}}function xp(n,e,t,i,s,r){if(e.three)return n0(n,t,i);if(n==="tree"||n==="log")return ka(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new pt(a,o),l=a/2,d=o;let f={...gs(),[c.LEAF]:de(t.leaf,.55,.5),[c.LEAF2]:de(t.leaf-.04,.5,.7),[c.TRUNK]:de(i.trunkHue,.45,.34),[c.BARKD]:de(i.trunkHue+.03,.5,.17),[c.MAGIC]:de(i.magicHue,.6,1),[c.MAGIC2]:de(i.magicHue,.2,1)};if(n==="shrine")h.shape([[l-16*r,d],[l-14*r,d-6*r],[l+14*r,d-6*r],[l+16*r,d]],c.ACCENT,{group:5,line:!0,depth:2}),h.shape([[l-9*r,d-6*r],[l-9*r,d-26*r],[l+9*r,d-26*r],[l+9*r,d-6*r]],c.ACCENT,{group:6,line:!0,depth:2}),h.shape([[l-5*r,d-10*r],[l-5*r,d-20*r],[l,d-23*r],[l+5*r,d-20*r],[l+5*r,d-10*r]],c.NOSE,{group:7}),h.shape([[l-13*r,d-26*r],[l,d-34*r],[l+13*r,d-26*r]],c.BODY2,{group:8,line:!0,depth:2}),h.ellipse(l,d-13*r,2.5*r,2.5*r,c.MAGIC2,{round:.5}),h.mark([[l-14*r,d-36*r],[l+2*r,d-36*r],[l-4*r,d-24*r],[l-14*r,d-24*r]],c.LEAF,[c.BODY2,c.ACCENT]);else if(n==="pavilion"){h.shape([[l-26*r,d],[l-26*r,d-4*r],[l+26*r,d-4*r],[l+26*r,d]],c.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[l+u*r,d-4*r,4*r],[l+u*r,d-34*r,4*r]],u===-7||u===7?c.BODY2:c.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[l-28*r,d-34*r],[l-28*r,d-38*r],[l+28*r,d-38*r],[l+28*r,d-34*r]],c.ACCENT,{group:8,line:!0,depth:2}),h.shape([[l-24*r,d-38*r],[l-16*r,d-54*r],[l,d-60*r],[l+16*r,d-54*r],[l+24*r,d-38*r]],c.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=ka("water",{w:1.8},t,i,s,r);for(let m=0;m<u.sp.m.length;m++){const p=m%u.sp.w,M=m/u.sp.w|0,g=Math.round(l-u.sp.w/2+p),x=d-u.sp.h+M;u.sp.m[m]&&h.inb(g,x)&&h.px(g,x,u.sp.m[m]===c.BODY?c.IRIS:c.PUPIL,0,-.42,.91)}h.limb([[l-34*r,d-6*r,9*r],[l+34*r,d-10*r,8*r]],c.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[c.IRIS]=[60,110,150],f[c.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,m,p,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])er(h,[l+u*r,d-m*r],p*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,m,p,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])er(h,[l+u*r,d-m*r],p*r,M*r,i,s,m>30);h.shape([[l-15*r,d],[l-14*r,d-18*r],[l-4*r,d-28*r],[l+6*r,d-27*r],[l+14*r,d-16*r],[l+15*r,d]],c.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=ka("water",{w:1.9},t,i,s,r);for(let m=0;m<u.sp.m.length;m++){const p=m%u.sp.w,M=m/u.sp.w|0,g=Math.round(l-u.sp.w/2+p),x=d-u.sp.h+M-10*r;u.sp.m[m]&&h.inb(g,x)&&h.px(g,x,u.sp.m[m]===c.BODY?c.IRIS:c.PUPIL,0,-.42,.91)}for(let m=0;m<26;m++){const p=l+pe(s,-32,32)*r,M=d-pe(s,2,14)*r,g=pe(s,-.5,.5),x=pe(s,8,16)*r;h.limb([[p-Math.cos(g)*x/2,M-Math.sin(g)*x/2,2.6*r],[p+Math.cos(g)*x/2,M+Math.sin(g)*x/2,2*r]],m%3?c.TRUNK:c.BARKD,{group:6+m%2,line:!0})}f[c.IRIS]=[60,110,150],f[c.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,m,p,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])er(h,[l+u*r,d-m*r],p*r,M*r,i,s,!0);for(let u=l-6*r;u<l+6*r;u++)for(let m=d-50*r;m<d-4*r;m++)h.px(u,m,ft(u|0,m/3|0,4)<.3?c.PUPIL:c.IRIS,0,-.2,.98);h.shape([[l-18*r,d],[l-14*r,d-6*r],[l+14*r,d-6*r],[l+18*r,d]],c.IRIS,{group:10,round:.2}),f[c.IRIS]=[90,150,190],f[c.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function Mp(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=qr}={}){const s=cd[n];if(!s)throw new Error(`no area type "${n}"`);const r=$r(n.split("").reduce((d,f)=>d*31+f.charCodeAt(0),7)>>>0),a=(d,f,u)=>({sp:gn(d.sp,d.colours,e,"none",i),kind:f,text:u}),o=gp(s,e),h=d=>(d||[]).map(([f,u])=>a(ka(f,u,s,e,r,t),f,"")),l={def:s,floor:{sp:gn(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(l.walls.forEach(d=>d.text=s.text.wall),l.small.forEach(d=>d.text=s.text.small),l.big.forEach(d=>d.text=s.text.big),s.set){const d=xp(s.set[0],s.set[1],s,e,r,t);l.setPiece={...a(d,s.set[0],s.text.set),metres:d.metres,origin:d.origin}}return l}const vp=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],bp=16;function _p(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=qr,ppm:s=bp}={}){const r=cd[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const l=n.split("").reduce((u,m)=>u*31+m.charCodeAt(0),11)>>>0,d=[];let f=0;for(const u of vp)for(let m=0;m<u.count;m++,f++){const p=h.length&&(f===2||f===6)?h[(f===6?1:0)%h.length]:o[f%o.length],M=Ec(p.type),g=M.fn,x=$r(l*7+f*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*m/(u.count-1):(u.range[0]+u.range[1])/2,b=u.id==="sapling",w=u.id==="tall"||u.id==="giant",E=M.grow,y=E==="willow",A=E==="narrow"||p.bare,_=E==="wide",R=y?1+(v-1)*.45:E==="small"?1+(v-1)*.5:_?1+(v-1)*.75:v,T=(b?.78:1)*(y?1+Math.max(0,v-1)*.55:_?1+Math.max(0,v-1)*.45:A&&w?p.bare?.6:.85:w?1.06:1),L={...e,crownWidth:(e.crownWidth||3)*T,leafHue:r.leaf+(p.dark?.05:0),gnarl:Math.min(1,(p.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:p.bare,treeTrunks:b?1:p.trunks,treeLean:p.lean,treeThick:b?void 0:w&&p.thick?p.thick*1.1:p.thick,treeThin:b||p.thin,treeHollow:w&&p.hollow,treeWebs:p.webs},O=g(x,L,e.treeSize*t*(p.scale||1)*R*pe(x,.95,1.05)),I=fo(x,L,g);p.dark&&(I[c.LEAF]=I[c.LEAF3],I[c.LEAF3]=de(r.leaf+.05,.7,.22)),I[c.NOSE]=[20,16,24],I[c.WEB]=[225,225,232];const k=ld(O),H=ae=>gn(ae,I,e,"none",i),K=ae=>+(ae/s).toFixed(2);d.push({heightClass:u.id,species:p.type,scale:+R.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:H(O.sp),top:H(k.top),bot:H(k.bot),crownY:O.crownY,metres:{height:K(O.sp.h),crownBase:K(O.sp.h-O.crownY),crownHeight:K(O.crownY),crownRadius:K(O.sp.w/2)}})}return d}const yp={[c.ACCENT]:[150,145,140],[c.BODY2]:[95,92,100],[c.TRUNK]:[110,70,40],[c.BARKD]:[60,38,24],[c.MAGIC]:[255,130,40],[c.MAGIC2]:[255,228,120],[c.NOSE]:[30,24,26]};function wp(n){const e=new qe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?c.ACCENT:c.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,c.TRUNK,{group:20,paint:s=>s[0]>.12?c.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,c.TRUNK,{group:21,paint:s=>s[0]<-.12?c.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Es.flame(c.MAGIC,c.MAGIC2),{group:30+o,bend:.1}));const i=xn(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,c.MAGIC2)}return i}const Ba={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function hd(n,e){const t=new qe({blend:.04}),i=Object.keys(Ba).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=P.norm([Math.sin(r),.22,Math.cos(r)]),h=P.norm(P.cross(o,a)),l=[0,.46,0],d=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(g,x)=>d.some(v=>v.some((b,w)=>{const E=v[w+1];if(!E)return!1;const y=E[0]-b[0],A=E[1]-b[1],_=Math.max(0,Math.min(1,((g-b[0])*y+(x-b[1])*A)/(y*y+A*A)));return Math.hypot(g-b[0]-y*_,x-b[1]-A*_)<.014})),u=g=>{const x=P.sub(g,l),v=[P.dot(x,a),P.dot(x,h)+.46,P.dot(x,o)];if(v[2]>s-.02){const b=(v[0]+.17)/.34,w=(.8-v[1])/.5;if(e){const E=(v[0]+.27)/.54,y=(.8-v[1])/.58;if(E>=0&&E<=1&&y>=0&&y<=1&&ad(e,E,y,.055))return c.RUNE}else if(b>=0&&b<=1&&w>=0&&w<=1&&Ku(b,w,i+1,.1))return c.RUNE}if(f(v[0],v[1]))return c.STONED;if(v[1]>.86&&ft(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&ft(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return c.MOSS};t.box(l,[.28,.46,s],c.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(P.add(P.add(l,P.mul(h,.53)),P.mul(a,.2)),[.3,.12,.2],c.STONE,{group:1,dir:P.add(a,P.mul(h,.35)),up:h,cut:!0,paint:u});for(const[g,x,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([g,.015,x],[v,v*.4,v],c.MOSS,{group:2});for(let g=0;g<9;g++){const x=-.3+g*.07,v=.12+g%3*.025-g*.02,b=.07+g*37%5/60;t.seg([x,0,v],[x+(g%3-1)*.02,b,v+.01],.012,.004,g%3?c.LEAF:c.LEAF2,{group:10+g})}const m={[c.STONE]:[132,134,142],[c.STONED]:[70,70,80],[c.MOSS]:[86,120,62],[c.LEAF]:[80,125,60],[c.LEAF2]:[130,160,80],[c.RUNE]:Ba[n][0],[c.MAGIC2]:Ba[n][1],[c.LINE]:[40,40,50]},p=xn(t,{height:44}).sp;let M=0;for(let g=0;g<600&&M<5;g++){const x=Math.floor(ft(g,i,9)*p.w),v=Math.floor(ft(g,i,10)*p.h*.8);p.get(x,v)||p.get(x+1,v)||p.get(x-1,v)||p.get(x,v+1)||p.get(x,v-1)||(p.px(x,v,M%2?c.RUNE:c.MAGIC2),M++)}return{sp:p,colours:m}}function Sp(){const n=new qe({blend:.03});n.ell([0,0,0],[.62,.025,.38],c.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?c.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?c.LEAF:c.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],c.ACCENT,{group:30});return{sp:xn(n,{height:22}).sp,colours:{[c.WATER]:[40,70,95],[c.BODY2]:[70,60,45],[c.LEAF]:[80,125,60],[c.LEAF2]:[130,160,80],[c.ACCENT]:[130,128,125]}}}function Ep(n,{glow:e="cyan",sigil:t,makeCanvas:i=qr}={}){const s=hd(e,t);return gn(s.sp,s.colours,n,"none",i)}function Ap(n,{makeCanvas:e=qr}={}){const t=(l,d)=>gn(l,d,n,"none",e),i={campfire:[0,1,2].map(l=>t(wp(l),yp)),stones:{},pond:null};for(const l of Object.keys(Ba)){const d=hd(l);i.stones[l]=t(d.sp,d.colours)}const s=Sp(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let l=0;l<s.sp.m.length;l++)s.sp.m[l]===c.WATER&&h.data.set([255,255,255,255],l*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function Tp(n,e){const t=new Map,i=new Map,s=(h,l,d)=>(h*2097152+(l+1048576))*2097152+(d+1048576),r=(h,l,d)=>{const f=s(h,l,d);let u=t.get(f);if(!u){const m=Math.pow(2,-h);u=[m*(l+Re(l*7+h,d,n)),m*(d+Re(l,d*13+h,n+1))],t.set(f,u)}return u},a=(h,l,d)=>{const f=Math.pow(2,-h),u=Math.floor(l/f),m=Math.floor(d/f);let p=u,M=m,g=1/0;for(let x=-2;x<=2;x++)for(let v=-2;v<=2;v++){const b=r(h,u+x,m+v),w=(b[0]-l)**2+(b[1]-d)**2;w<g&&(g=w,p=u+x,M=m+v)}return[p,M]},o=(h,l,d)=>{const f=s(h,l,d);let u=i.get(f);if(u)return u;if(h===0)u=[l,d];else{const m=r(h,l,d),p=a(h-1,m[0],m[1]);u=o(h-1,p[0],p[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(h,l)=>r(0,h,l),partition(h,l){const d=a(e,h,l);return o(e,d[0],d[1])},centreness(h,l,d){const f=r(0,d[0],d[1]),u=Math.hypot(h-f[0],l-f[1]);let m=1/0;const p=Math.floor(h),M=Math.floor(l);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const v=p+g,b=M+x;if(v===d[0]&&b===d[1])continue;const w=r(0,v,b);m=Math.min(m,Math.hypot(h-w[0],l-w[1]))}return Math.min(1,2*u/(u+m))},openness(h,l){let d=1/0,f=1/0;const u=Math.floor(h),m=Math.floor(l);for(let p=-2;p<=2;p++)for(let M=-2;M<=2;M++){const g=r(0,u+p,m+M),x=Math.hypot(h-g[0],l-g[1]);x<d?(f=d,d=x):x<f&&(f=x)}return Math.min(1,2*d/(d+f))}}}function vh(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],l=Math.hypot(o[0]-a[0],o[1]-a[1]),d=Math.max(1,Math.ceil(l/e));for(let f=0;f<d;f++){const u=f/d,m=u*u,p=m*u,M=(g,x,v,b)=>.5*(2*x+(-g+v)*u+(2*g-5*x+4*v-b)*m+(-g+3*x-3*v+b)*p);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const Rp=new Set(["stream","wetland","bog","beaver-pond"]);class Cp{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=jn(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(p,M)=>p===0?[i.minX+M*r,i.minZ]:p===1?[i.maxX,i.minZ+M*a]:p===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(p,M,g,x)=>{const v=M[0]-p[0],b=M[1]-p[1],w=Math.hypot(v,b),E=Math.max(2,Math.round(w/g)),y=[p];let A=0;for(let _=1;_<E;_++){A=In(A+(s()-.5)*x,-x,x);const S=_/E;y.push([In(p[0]+v*S-b/w*A,i.minX,i.maxX),In(p[1]+b*S+v/w*A,i.minZ,i.maxZ)])}return y.push(M),vh(y,3)},l=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let p=0;p<l;p++){const M=Math.floor(s()*4),g=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,x=h(o(M,.15+s()*.7),o(g,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:x,half:t.railHalf}),p===0&&x.length>20){const v=Math.floor(x.length*(.3+s()*.4)),b=x[v],w=Math.floor(s()*4),E=h(b,o(w,.2+s()*.6),300,120);this.lines.push({kind:"rail",pts:E,half:t.railHalf});const y=x[v+1][0]-b[0],A=x[v+1][1]-b[1],_=Math.hypot(y,A)||1,S=E[Math.min(E.length-1,6)],R=y*(S[1]-b[1])-A*(S[0]-b[0]);this.junctions.push({x:b[0],z:b[1],dx:y/_,dz:A/_,side:R>=0?1:-1,line:this.lines.length-2})}}const d=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let p=0;p<d;p++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),240,110),half:t.roadHalf})}const f=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let p=0;p<f;p++){const M=Math.floor(s()*4),g=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(g,.1+s()*.8),90,70),half:t.streamHalf})}const u=(p,M)=>Rp.has(Ft[e.typeOf(p,M)].id);for(const[p,M]of e.neighbours){const[g,x]=p.split(",").map(Number);if(u(g,x))for(const v of M){const[b,w]=v.split(",").map(Number);if(p>v||!u(b,w))continue;const[E,y]=this.trim(e.siteOf(g,x),e.siteOf(b,w),this.clearOf(g,x),this.clearOf(b,w));E&&this.lines.push({kind:"stream",pts:this.meander(E,y,s),half:t.streamHalf})}}const m=new Set;for(const[p,M]of e.neighbours){const[g,x]=p.split(",").map(Number);for(const v of M){const b=p<v?`${p}|${v}`:`${v}|${p}`;if(m.has(b))continue;m.add(b);const[w,E]=v.split(",").map(Number);if(w<0||E<0||w>=e.n||E>=e.n||Re(g*31+w,x*31+E,e.seed+811)>t.linkChance)continue;const[y,A]=this.trim(e.siteOf(g,x),e.siteOf(w,E),this.clearOf(g,x),this.clearOf(w,E));y&&this.lines.push({kind:"path",pts:this.meander(y,A,s),half:t.pathHalf})}if(Re(g,x,e.seed+813)<t.deadEndChance){const v=e.siteOf(g,x),b=s()*Math.PI*2,w=30+s()*40,E=this.clearOf(g,x),y={x:v.x+Math.cos(b)*E,z:v.z+Math.sin(b)*E};this.lines.push({kind:"path",pts:this.meander(y,{x:y.x+Math.cos(b)*w,z:y.z+Math.sin(b)*w},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((p,M)=>{for(let g=0;g<p.pts.length-1;g++){const[x,v]=[p.pts[g],p.pts[g+1]],b=p.half+4;for(let w=Math.floor((Math.min(x[0],v[0])-b)/this.cell);w<=Math.floor((Math.max(x[0],v[0])+b)/this.cell);w++)for(let E=Math.floor((Math.min(x[1],v[1])-b)/this.cell);E<=Math.floor((Math.max(x[1],v[1])+b)/this.cell);E++){const y=`${w},${E}`;let A=this.grid.get(y);A||this.grid.set(y,A=[]),A.push([M,g])}}}),this.placePieces()}map;lines=[];pieces=[];junctions=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,s=(o,h,l,d)=>{if(e.hardClear(h,l)||e.reserved(h,l,d)||this.pieces.some(p=>Math.hypot(p.x-h,p.z-l)<Math.max(i.pieceGap,p.r+d)))return;const f={id:o,x:h,z:l,r:d};this.pieces.push(f);const u=`${Math.floor(h/this.cell)},${Math.floor(l/this.cell)}`;let m=this.pieceGrid.get(u);m||this.pieceGrid.set(u,m=[]),m.push(f)},r=(o,h,l)=>{const d=o.pts[h],f=o.pts[Math.min(o.pts.length-1,h+1)],u=f[0]-d[0],m=f[1]-d[1],p=Math.hypot(u,m)||1;return[d[0]-m/p*l,d[1]+u/p*l]};this.lines.forEach((o,h)=>{let l=0,d=!1;for(let f=1;f<o.pts.length;f++){const[u,m]=o.pts[f],p=Math.hypot(u-o.pts[f-1][0],m-o.pts[f-1][1]);if(l+=p,o.kind==="rail"){const M=this.railBroken(u,m);if(M&&!d&&Re(h,f,t+841)<.5&&s("buffer-stop",u,m,4),d=M,l>=i.landmarkSpacing){l=0;const g=Re(h,f,t+843);if(g<i.landmarkChance){const x=["goods-wagon","carriage","platform","signal-gantry"];s(x[Math.floor(Re(h,f,t+845)*x.length)],u,m,7)}else g<i.landmarkChance+.3&&!M&&s("signal-post",...r(o,f,o.half-.6),1.2)}}else o.kind==="road"&&l>=i.vergeSpacing&&(l=0,s("verge-post",...r(o,f,(Re(h,f,t+847)<.5?1:-1)*(o.half-.7)),.8))}if(o.kind==="path"&&!o.deadEnd){const f=p=>{const M=Ft[e.areaAt(p[0],p[1]).type];return["rocky-slope","ravine","cave-mouth"].includes(M.id)||!!M.layout.terrain?.includes("hollows")},u=[o.pts[0],o.pts[o.pts.length-1]].filter(f),m=u[Math.floor(Re(h,7,t+849)*u.length)];m&&Re(Math.round(m[0]),Math.round(m[1]),t+849)<i.stairsChance&&s(Re(Math.round(m[1]),3,t+851)<.7?"stairs":"stairs-turn",m[0],m[1],3)}});const a=new Set;this.lines.forEach((o,h)=>{if(!(o.kind!=="path"&&o.kind!=="road"))for(let l=0;l<o.pts.length-1;l++){const d=o.pts[l],f=o.pts[l+1],u=`${Math.floor(d[0]/this.cell)},${Math.floor(d[1]/this.cell)}`;for(const[m,p]of this.grid.get(u)??[]){const M=this.lines[m];if(M.kind!=="stream"&&!(M.kind==="rail"&&o.kind==="road"))continue;const g=M.pts[p],x=M.pts[p+1],v=Lp(d,f,g,x);if(!v)continue;const b=`${h}|${m}|${Math.round(v[0]/20)},${Math.round(v[1]/20)}`;a.has(b)||(a.add(b),M.kind==="stream"?s(o.kind==="road"||Re(h,m,t+853)<.5?"footbridge":"rope-bridge",v[0],v[1],4):s("level-crossing",...r(o,l,o.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)if(!(!i&&!s)){for(const r of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+s}`)??[])if(Math.hypot(r.x-e,r.z-t)<r.r)return r}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?i.dancefloor.radius+i.tuning.dancefloor.clearing+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],l=Math.min(18,a*.15),d=i()<.5?1:-1;for(let f=1;f<o;f++){const u=f/o,m=l*(.4+.6*i())*(f%2?d:-d);h.push([e.x+s*u-r/a*m,e.z+r*u+s/a*m])}return h.push([t.x,t.z]),vh(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[l,d]=[h.pts[o],h.pts[o+1]],f=d[0]-l[0],u=d[1]-l[1],m=f*f+u*u||1,p=In(((e-l[0])*f+(t-l[1])*u)/m,0,1),M=Math.hypot(e-l[0]-f*p,t-l[1]-u*p);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return ki(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function Lp(n,e,t,i){const s=[e[0]-n[0],e[1]-n[1]],r=[i[0]-t[0],i[1]-t[1]],a=s[0]*r[1]-s[1]*r[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a,h=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+s[0]*o,n[1]+s[1]*o]:null}const Pp=kf.types,Ft=xr.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Pp[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),qn=(n,e)=>n+","+e;function Dp(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Ip(n,e,t,i){const s=new Map,r=(h,l)=>{if(h[0]===l[0]&&h[1]===l[1])return;const d=qn(h[0],h[1]),f=qn(l[0],l[1]);s.has(d)||s.set(d,new Set),s.has(f)||s.set(f,new Set),s.get(d).add(f),s.get(f).add(d)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const l=[];for(let d=0;d<=a;d++){const f=n.partition(e+d/i,e+h/i);l.push(f),d>0&&r(f,l[d-1]),h>0&&r(f,o[d])}o=l}return s}function Op(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=Ft.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(B,z)=>{const F=B/s,Z=z/s;return[F+o*(ki(F/a,Z/a,n+91)-.5)*2,Z+o*(ki(F/a,Z/a,n+92)-.5)*2]},l=(B,z)=>{let F=B*s,Z=z*s;for(let j=0;j<30;j++){const[ce,ye]=h(F,Z);F+=(B-ce)*s,Z+=(z-ye)*s}return[F,Z]},d=Tp(n,e.borderLayers),f=-i,u=t+i,m=Ip(d,f,u,6),p=new Map,M=jn(n*5+1);for(let B=f;B<u;B++)for(let z=f;z<u;z++){const F=new Set;for(let ce=-2;ce<=2;ce++)for(let ye=-2;ye<=2;ye++){const be=p.get(qn(z+ye,B+ce));be!==void 0&&F.add(be)}for(const ce of m.get(qn(z,B))??[]){const ye=p.get(ce);ye!==void 0&&F.add(ye)}const Z=[...Array(r).keys()].filter(ce=>!F.has(ce)),j=Z.length?Z:[...Array(r).keys()];p.set(qn(z,B),j[Math.floor(M()*j.length)])}const g=(B,z)=>p.get(qn(B,z))??Math.floor(Re(B,z,n+17)*r),x=Math.floor(t/2),v=(B,z)=>{const F=d.site(B,z),Z=d.partition(F[0],F[1]);return Z[0]===B&&Z[1]===z};let b=[x,x];for(const[B,z]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(x+B,x+z)){b=[x+B,x+z];break}const w=(B,z)=>{const F=d.site(B,z),Z=l(F[0],F[1]);return{x:Z[0],z:Z[1]}},E=w(b[0],b[1]),y=(B,z)=>{const[F,Z]=h(B,z),j=d.partition(F,Z);return{cell:j,type:g(j[0],j[1]),openness:d.openness(F,Z)}},A=(B,z)=>{const F=Ft[g(B,z)];return F.setPiece&&Re(B,z,n+61)<e.setPieceChance?F.setPiece:null},_=e.dancefloor.radius,S=_+e.dancefloor.clearing,R=(B,z,F,Z)=>{const j=y(B,z).cell;return j[0]===F&&j[1]===Z},T=new Map,L=(B,z)=>{const F=qn(B,z),Z=T.get(F);if(Z)return Z;const j=w(B,z),ce=jn(n*17+B*53+z*911);let[ye,be]=[j.x,j.z];if(!R(j.x,j.z,B,z))e:for(let ge=2;ge<s*.75*1.5;ge+=2)for(let Me=0;Me<16;Me++){const Ne=Me/16*Math.PI*2,Ze=j.x+Math.cos(Ne)*ge,lt=j.z+Math.sin(Ne)*ge;if(R(Ze,lt,B,z)){[ye,be]=[Ze,lt];break e}}let oe={x:ye,z:be};for(let ge=0;ge<24;ge++){const Me=ce()*Math.PI*2,Ne=3+ce()*4,Ze=ye+Math.cos(Me)*Ne,lt=be+Math.sin(Me)*Ne+3;if(R(Ze,lt,B,z)){oe={x:Ze,z:lt};break}}return T.set(F,oe),oe},O=e.treehouse,I=O.angle*Math.PI/180,k={x:E.x+Math.cos(I)*(S+O.distance),z:E.z+Math.sin(I)*(S+O.distance)},H=new Map,K=(B,z)=>{const F=qn(B,z);if(H.has(F))return H.get(F);let Z=null;if(A(B,z)&&!(B===b[0]&&z===b[1])){const j=e.setPieceFootprint*e.setPieceScale,ce=e.reserveMargin,ye=[qn(B,z),...m.get(qn(B,z))??[]].map(ge=>{const[Me,Ne]=ge.split(",").map(Number);return L(Me,Ne)}),be=(ge,Me)=>R(ge,Me,B,z)&&ye.every(Ne=>Math.hypot(ge-Ne.x,Me-Ne.z)>=j+e.soundsystemFootprint+ce)&&Math.hypot(ge-E.x,Me-E.z)>=j+S+ce&&Math.hypot(ge-k.x,Me-k.z)>=j+O.clear+ce,oe=w(B,z);e:for(let ge=0;ge<=s*.35;ge+=3)for(let Me=0;Me<(ge?16:1);Me++){const Ne=Me/16*Math.PI*2,Ze=oe.x+Math.cos(Ne)*ge,lt=oe.z-4+Math.sin(Ne)*ge;if(be(Ze,lt)){Z={x:Ze,z:lt};break e}}}return H.set(F,Z),Z},ae=[],q=(B,z,F)=>{const Z=e.reserveMargin,j=y(B,z).cell;if(Math.hypot(B-E.x,z-E.z)<F+S+Z||Math.hypot(B-k.x,z-k.z)<F+O.clear+Z)return!0;for(const ce of ae)if(Math.hypot(B-ce.x,z-ce.z)<F+ce.r+Z)return!0;for(const ce of[qn(j[0],j[1]),...m.get(qn(j[0],j[1]))??[]]){const[ye,be]=ce.split(",").map(Number);if(!(ye===b[0]&&be===b[1])){const ge=L(ye,be);if(Math.hypot(B-ge.x,z-ge.z)<F+e.soundsystemFootprint+Z)return!0}const oe=K(ye,be);if(oe&&Math.hypot(B-oe.x,z-oe.z)<F+e.setPieceFootprint*e.setPieceScale+Z)return!0}return!1},ie=e.grounds;for(let B=0;B<t;B++)for(let z=0;z<t;z++){if(z===b[0]&&B===b[1]||Re(z,B,n+871)>=ie.chance)continue;const F=ie.kinds[Math.floor(Re(z,B,n+873)*ie.kinds.length)],Z=ie.radius[F]??8,j=Re(z,B,n+875)*Math.PI*2,ce=w(z,B);e:for(const ye of[Z+6,Z+14,Z+24])for(let be=0;be<12;be++){const oe=j+be/12*Math.PI*2,ge=ce.x+Math.cos(oe)*ye,Me=ce.z+Math.sin(oe)*ye;if(R(ge,Me,z,B)&&!q(ge,Me,Z)){ae.push({kind:F,x:ge,z:Me,r:Z});break e}}}const N=(B,z,F)=>{if(Math.hypot(B-E.x,z-E.z)<S||Math.hypot(B-k.x,z-k.z)<O.clear)return!0;for(const ce of ae)if(Math.abs(B-ce.x)<ce.r&&Math.abs(z-ce.z)<ce.r&&Math.hypot(B-ce.x,z-ce.z)<ce.r)return!0;const Z=K(F[0],F[1]);if(Z&&Math.hypot(B-Z.x,z-Z.z)<e.setPieceClear*e.setPieceScale)return!0;if(F[0]===b[0]&&F[1]===b[1])return!1;const j=L(F[0],F[1]);return Math.hypot(B-j.x,z-j.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},ee=(B,z)=>{const[F,Z]=h(B,z);return N(B,z,d.partition(F,Z))},se=(B,z)=>{const[F,Z]=h(B,z);if(N(B,z,d.partition(F,Z)))return 0;const j=1-sn((ki(B/e.gladeScale,z/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return sn((d.openness(F,Z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*j},ue=(B,z)=>Math.min(1,Math.hypot(B-b[0],z-b[1])/(t/2)),xe=s*.5,Le={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:d,centreCell:b,dancefloor:{x:E.x,z:E.z,radius:_},treehouse:k,grounds:ae,start:{x:k.x,z:k.z+1},bounds:{minX:xe,maxX:t*s-xe,minZ:xe,maxZ:t*s-xe},extent:{minX:f*s,maxX:u*s,minZ:f*s,maxZ:u*s},typeOf:g,areaAt:y,siteOf:w,treeWeight:se,hardClear:ee,neighbours:m,setPieceOf:A,soundsystemSpot:L,setPieceSpot:K,reserved:q,remoteness:ue,paths:null};return Le.paths=new Cp(Le),Le}function Ac(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function Np(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const lr=(n,e)=>Zn(e.groundHeight,e.treetopHeight,sn(n.lift)),Ao=n=>sn(n.lift);function Fp(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const l=Math.hypot(o,h);l>1&&(o/=l,h/=l);const d=sn(a),f=Zn(i.groundSpeed,i.treetopSpeed,d),u=1-Math.exp(-i.groundAcceleration*t),m=n.vx+(o*i.groundSpeed-n.vx)*u,p=n.vz+(h*i.groundSpeed-n.vz)*u,M=Up(n,o,h,t,i);let g=Zn(m,M.vx,d),x=Zn(p,M.vz,d);const v=M.boost*d,b=M.braking&&d>.5;let w=n.x+g*t,E=n.z+x*t;(w<s.minX||w>s.maxX)&&(w=In(w,s.minX,s.maxX),g=0),(E<s.minZ||E>s.maxZ)&&(E=In(E,s.minZ,s.maxZ),x=0);const y=g>.3?1:g<-.3?-1:n.facing,A=Math.hypot(g,x),_=Ac(g,x,n.away,Math.max(1,f*.15),i);return{x:w,z:E,vx:g,vz:x,lift:a,mode:r,facing:y,away:_,lean:A>f*i.leanAt,boost:v,braking:b}}function Up(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,l=!1;if(a<.1){const b=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*b,vz:n.vz*b,boost:h*b,braking:!1}}const d=e/a,f=t/a;let u=d,m=f,p=0;if(o>2){const b=n.vx/o,w=n.vz/o;p=Math.acos(In(b*d+w*f,-1,1));const E=b*f-w*d,y=r.turnRate*(1-.5*h)*Math.PI/180,A=Math.min(p,y*i)*(E>=0?1:-1),_=Math.cos(A),S=Math.sin(A);u=b*_-w*S,m=b*S+w*_}const M=p*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),l=o>s.treetopSpeed*.5):h=Math.max(0,h-i*.5);const g=s.treetopSpeed*(1+(r.boost-1)*h)*a,x=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(g-o)*x;return{vx:u*v,vz:m*v,boost:h,braking:l}}const Ls=3;function kp(n,e,t=.5,i=1){const s=n.tuning,r=In(e,0,1),a=Math.max(0,Math.round(Zn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<Bp(n,r)?1:0,h=Math.max(0,a-o),l=Math.round(h*s.adultShareFar*sn((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),d=Math.round((h-l)*s.youngShareFar*r);return{babies:Math.max(0,h-l-d),young:d,adults:l,legends:o}}const Bp=(n,e)=>n.tuning.legendChanceFar*sn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),ud=n=>n.areaSize*.75,qa=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function zp(n,e,t,i,s){if(qa(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,l=i+Math.sin(o)*r;if(qa(n,h,l,e))return[h,l]}return[t,i]}function $a(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(qa(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Hp(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=jn(n.seed*7919+o*131+a*977+3),l=Ft[n.typeOf(o,a)],d=n.siteOf(o,a),f=n.remoteness(o,a),u=kp(n,f,Re(o,a,n.seed+43),Re(o,a,n.seed+47)),m=M=>{const g=[o,a],x=ud(n),[v,b]=zp(n,g,d.x,d.z,x),w={cell:g,homeX:d.x,homeZ:d.z,range:x,anchorX:v,anchorZ:b},[E,y]=$a(n,w,h);return{id:i++,species:l.creature,level:M,...w,x:E,z:y,tx:E,tz:y,rest:h()*3,speed:(M===Ls?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:jn(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(m(0));for(let M=0;M<u.young;M++)e.push(m(1));for(let M=0;M<u.adults;M++)e.push(m(2));const p=t.legendNextToHome&&o===s+1&&a===r;(u.legends||p)&&e.push(m(3))}return e}function Gp(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=$a(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!qa(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=Ac(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===Ls?1.5:4)}function Wp(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=jn(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=$a(a,o,h),[o.tx,o.tz]=$a(a,o,h),o.rest=h()*2}o.seen=r,Gp(o,s,a)}}const Vp={wall:"run",hedge:"run",bramble:"run",rockwall:"run",henge:"ring",water:"clump",reeds:"clump",boulder:"clump"},Yp={wall:2.4,hedge:2.2,bramble:2,rockwall:2.8},dd=new Map(xr.map(n=>[n.id,{wall:n.wall?.[0]?.[0]??null,beds:n.small?.[0]?.[0]==="flowerbed"}]));function Xp(n,e,t){const i=n.typeOf(e,t),s=Ft[i],r=n.tuning.walls,a={walls:[],beds:[]},o=dd.get(s.id);if(!o?.wall)return a;const h=Vp[o.wall]??"clump",l=jn(n.seed*97+e*7919+t*104729+17),d=n.siteOf(e,t),f=n.areaSize;let u=0;const m=(x,v)=>{const b=n.areaAt(x,v).cell;return b[0]===e&&b[1]===t},p=(x,v)=>m(x,v)&&!n.hardClear(x,v)&&!n.reserved(x,v,1.5)&&n.paths.clearance(x,v).bushes!==0,M=(x,v,b)=>p(v,b)?(x.push({x:v,z:b,type:i,variant:Math.floor(Re(e*131+u,t*37+u++,n.seed+311)*1e6),flip:l()<.5}),!0):!1,g=()=>{let x={x:d.x,z:d.z};for(let v=0;v<10;v++){const b=l()*Math.PI*2,w=f*(.12+l()*.3);if(x={x:d.x+Math.cos(b)*w,z:d.z+Math.sin(b)*w},p(x.x,x.z))break}return x};if(h==="run"){const x=r.runs[0]+Math.floor(l()*(r.runs[1]-r.runs[0]+1)),v=Yp[o.wall]??2.4;for(let b=0;b<x;b++){const w=g(),E=n.paths.at(w.x,w.z,18);let y=Math.cos(l()*Math.PI*2),A=0;A=Math.sqrt(1-y*y)*(l()<.5?1:-1);let _=w.x,S=w.z;if(E){const L=n.paths.lines[E.line],O=L.pts[E.seg],I=L.pts[E.seg+1],k=Math.hypot(I[0]-O[0],I[1]-O[1])||1;y=(I[0]-O[0])/k,A=(I[1]-O[1])/k;const H=l()<.5?1:-1,K=L.half+2.5;_=O[0]-A*K*H,S=O[1]+y*K*H}const R=r.runLength[0]+Math.floor(l()*(r.runLength[1]-r.runLength[0]+1)),T=l()<r.gateChance?Math.floor(R/2):-1;for(let L=0;L<R;L++){if(L===T||L===T+1)continue;const O=_+y*v*L,I=S+A*v*L;M(a.walls,O,I)&&o.beds&&L%2===0&&M(a.beds,O-A*1.8,I+y*1.8)}}}else if(h==="ring"){const x=r.rings[0]+Math.floor(l()*(r.rings[1]-r.rings[0]+1));for(let v=0;v<x;v++){let b=v===0?n.setPieceSpot(e,t):null,w=b??g(),E=0;for(let y=0;y<6;y++){const A=r.ringStones[0]+Math.floor(l()*(r.ringStones[1]-r.ringStones[0]+1)),_=l()*Math.PI*2;E=b?n.tuning.setPieceFootprint*n.tuning.setPieceScale+3+l()*3:r.ringRadius[0]+l()*(r.ringRadius[1]-r.ringRadius[0]);const S=Array.from({length:A},(R,T)=>{const L=_+T/A*Math.PI*2+(l()-.5)*.15;return[w.x+Math.cos(L)*E,w.z+Math.sin(L)*E]});if(S.filter(([R,T])=>p(R,T)).length*2>=A){for(const[R,T]of S)M(a.walls,R,T);break}b=null,w=g()}if(l()<r.avenueChance){const y=l()*Math.PI*2,A=Math.cos(y),_=Math.sin(y);for(let S=1;S<=4;S++)for(const R of[-1,1])M(a.walls,w.x+A*(E+S*4)-_*R*2.5,w.z+_*(E+S*4)+A*R*2.5)}}if(l()<r.loneChance){const v=g();M(a.walls,v.x,v.z)}}else{const x=r.clumps[0]+Math.floor(l()*(r.clumps[1]-r.clumps[0]+1));for(let v=0;v<x;v++){const b=g(),w=r.clumpSize[0]+Math.floor(l()*(r.clumpSize[1]-r.clumpSize[0]+1));for(let E=0;E<w;E++){const y=l()*Math.PI*2,A=Math.sqrt(l())*r.clumpRadius;M(a.walls,b.x+Math.cos(y)*A,b.z+Math.sin(y)*A)}}}return a}function Kp(n,e){return!!dd.get(Ft[e].id)?.beds}const qp=4,Ct=32;function $p(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function fd(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(ki(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Re(i,s,r+1)-.5)*a.width*a.stray,l=(ki(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Re(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+l).type}function Tc(n,e,t,i){const s=n.tuning,r=s.density,a=Ft[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const l=ki(e/r.patchScale,t/r.patchScale,o+91),d=r.patchMin+(r.patchMax-r.patchMin)*sn((l-.25)/.5),f=n.treeWeight(e,t)*a.density*d*Zp(n,e,t,a)*s.treeDensity;return Math.max(f,r.lone)*h}function Zp(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=ki(e/a,t/a,s+93);return 1+r*(2.2*sn((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*sn((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*sn((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*sn((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function bh(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=$p(n),h=n.tuning.crownHalfWidth,l=Math.ceil(t*Ct/s),d=Math.ceil((t+1)*Ct/s);for(let f=l;f<d;f++){const u=f&1?.5:0,m=Math.ceil(e*Ct/i-u),p=Math.ceil((e+1)*Ct/i-u);for(let M=m;M<p;M++){const g=(M+u+(Re(M,f,r+101)-.5)*.7)*i,x=(f+(Re(M,f,r+102)-.5)*.7)*s,v=fd(n,g,x,M,f,r+106),b=Tc(n,g,x,v);Re(M,f,r+103)>=b||n.hardClear(g,x-o)||n.hardClear(g-h,x-o)||n.hardClear(g+h,x-o)||a.push({x:g,z:x,type:v,variant:Math.floor(Re(M,f,r+104)*1000003),flip:Re(M,f,r+105)<.5})}}return a}function _h(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*Ct/i),o=Math.ceil((t+1)*Ct/i),h=Math.ceil(e*Ct/i),l=Math.ceil((e+1)*Ct/i);for(let d=a;d<o;d++)for(let f=h;f<l;f++){const u=(f+Re(f,d,s+201)-.5)*i,m=(d+Re(f,d,s+202)-.5)*i,p=1+n.tuning.bushClump*(2*sn((ki(u/13,m/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,m).bushes;if(M===0)continue;const g=fd(n,u,m,f,d,s+206);if(Kp(n,g))continue;const x=1-Math.min(1,Tc(n,u,m,g)/.8);Re(f,d,s+203)>(.15+.85*x)*Ft[g].layout.undergrowth*n.tuning.bushDensity*p*M||Math.hypot(u-n.dancefloor.x,m-n.dancefloor.z)<n.dancefloor.radius+2||n.hardClear(u,m)||r.push({x:u,z:m,type:g,variant:Math.floor(Re(f,d,s+204)*qp),flip:Re(f,d,s+205)<.5})}return r}function Jp(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=(e+(Re(e,t,r+501)-.5)*.8)*s,o=(t+(Re(e,t,r+502)-.5)*.8)*s,h=n.areaAt(a,o),l=Ft[h.type].layout,d=l.decor,f=d?d.rate/.3:1,u=l.terrain?.includes("rocky")?2:1,m=d?[d.ruins,d.rocks*u,d.freak]:[i.ruins,i.rocks*u,i.freak],p=m[0]+m[1]+m[2]||1,M=(i.ruins+i.rocks+i.freak)*f*(d?(d.ruins+d.rocks+d.freak)/Math.max(.01,d.ruins+d.rocks+d.freak+d.lake+d.modern):1)*(u>1?1.5:1),g=Re(e,t,r+503);if(g>=M||h.openness<i.clearing||n.hardClear(a,o)||n.paths.at(a,o,i.pathGap)||n.reserved(a,o,i.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6)return null;const x=1-Math.min(1,Tc(n,a,o,h.type)/.8);if(Re(e,t,r+504)>.35+.65*x)return null;const v=g/M*p,b=v<m[0]?"ruins":v<m[0]+m[1]?"rocks":"freak";return{x:a,z:o,family:b,variant:Math.floor(Re(e,t,r+505)*1e6),flip:Re(e,t,r+506)<.5,rank:Re(e,t,r+507)}}function pd(n,e,t,i,s,r,a){const o=[],h=Math.ceil(t/e)+1;for(let l=r;l<a;l++)for(let d=i;d<s;d++){const f=n(d,l);if(!f)continue;let u=!0;for(let m=-h;m<=h&&u;m++)for(let p=-h;p<=h;p++){if(!p&&!m)continue;const M=n(d+p,l+m);if(M&&M.rank>f.rank&&Math.hypot(M.x-f.x,M.z-f.z)<t){u=!1;break}}u&&o.push(f)}return o}function yh(n,e,t){const i=n.tuning.decor,s=i.spacing;return pd((r,a)=>Jp(n,r,a),s,i.minGap,Math.ceil(e*Ct/s),Math.ceil((e+1)*Ct/s),Math.ceil(t*Ct/s),Math.ceil((t+1)*Ct/s)).map(({rank:r,...a})=>a)}function Qp(n,e,t){const i=n.tuning.relics,s=i.spacing,r=n.seed,a=(e+(Re(e,t,r+881)-.5)*.8)*s,o=(t+(Re(e,t,r+882)-.5)*.8)*s,h=n.areaAt(a,o),l=Ft[h.type].layout.decor,d=l?l.modern/Math.max(.01,l.ruins+l.rocks+l.freak+l.lake+l.modern):.1,f=n.paths.at(a,o,20),u=f&&(f.kind==="road"||f.kind==="rail")?i.nearRoad:1;return Re(e,t,r+883)>=i.chance*(.5+5*d)*u||h.openness<n.tuning.decor.clearing||n.hardClear(a,o)||n.paths.at(a,o,2)||n.paths.pieceAt(a,o)||n.reserved(a,o,n.tuning.decor.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+6?null:{x:a,z:o,variant:Math.floor(Re(e,t,r+884)*1e6),flip:Re(e,t,r+885)<.5,rank:Re(e,t,r+886)}}function wh(n,e,t){const i=n.tuning.relics,s=i.spacing;return pd((r,a)=>Qp(n,r,a),s,i.minGap,Math.ceil(e*Ct/s),Math.ceil((e+1)*Ct/s),Math.ceil(t*Ct/s),Math.ceil((t+1)*Ct/s)).map(({rank:r,...a})=>a)}const jp=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Sh(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Ct/s),h=Math.ceil((t+1)*Ct/s),l=Math.ceil(e*Ct/s),d=Math.ceil((e+1)*Ct/s);for(let f=o;f<h;f++)for(let u=l;u<d;u++){const m=(u+(Re(u,f,r+401)-.5)*.7)*s,p=(f+(Re(u,f,r+402)-.5)*.7)*s;if(Math.hypot(m-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const M=n.areaAt(m,p),g=M.openness<.35||M.openness>.8?1:.25,x=Re(u,f,r+403),b=(jp.has(Ft[M.type].id)||!!Ft[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*g,w=i.campfire*g,E=i.magicStone*g,y=x<b?"pond":x<b+w?"campfire":x<b+w+E?"stone":null;y&&a.push({x:m,z:p,kind:y,size:.75+Re(u,f,r+404)*.5})}return a}class Rc{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;wallFeatureCache=new Map;lights=new Map;decor=new Map;relics=new Map;buildMs=0;static KEEP=2500;centre={x:0,z:0};chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/Ct);r<=Math.floor((t+i)/Ct);r++)for(let a=Math.floor((e-i)/Ct);a<=Math.floor((e+i)/Ct);a++)s.push([a,r]);return s}evict(e,t=Rc.KEEP,i=Ct){if(e.size<=t)return;const s=this.centre,r=[...e.keys()].map(a=>{const[o,h]=a.split(",").map(Number);return[a,((o+.5)*i-s.x)**2+((h+.5)*i-s.z)**2]});r.sort((a,o)=>o[1]-a[1]);for(const[a]of r.slice(0,e.size-Math.floor(t*.8)))e.delete(a)}chunk(e,t,i,s){const r=i+","+s;let a=e.get(r);if(!a){const o=performance.now();a=t(i,s),this.buildMs+=performance.now()-o,e.set(r,a)}return a}gather(e,t,i,s,r){this.centre={x:i,z:s},this.evict(e);const a=[];for(const[o,h]of this.chunks(i,s,r))for(const l of this.chunk(e,t,o,h))Math.abs(l.x-i)<=r&&Math.abs(l.z-s)<=r&&a.push(l);return a}kinds(){const e=this.map;return[[this.trees,(t,i)=>bh(e,t,i)],[this.bushes,(t,i)=>_h(e,t,i)],[this.decor,(t,i)=>yh(e,t,i)],[this.relics,(t,i)=>wh(e,t,i)],[this.lights,(t,i)=>Sh(e,t,i)]]}prefetch(e,t,i,s){const r=performance.now(),a=this.kinds(),o=this.chunks(e,t,i).filter(([u,m])=>a.some(([p])=>!p.has(u+","+m)));o.sort((u,m)=>((u[0]+.5)*Ct-e)**2+((u[1]+.5)*Ct-t)**2-(((m[0]+.5)*Ct-e)**2+((m[1]+.5)*Ct-t)**2));let h=0;for(const[u,m]of o){if(h>0&&performance.now()-r>s)break;for(const[p,M]of a)this.chunk(p,M,u,m);h++}const l=this.map.areaSize,d=[];for(let u=Math.floor((t-i)/l)-1;u<=Math.floor((t+i)/l)+1;u++)for(let m=Math.floor((e-i)/l)-1;m<=Math.floor((e+i)/l)+1;m++)this.wallFeatureCache.has(m+","+u)||d.push([m,u,((m+.5)*l-e)**2+((u+.5)*l-t)**2]);d.sort((u,m)=>u[2]-m[2]);let f=0;for(const[u,m]of d){if(performance.now()-r>s)break;this.featuresOf(u,m),f++}return o.length-h+d.length-f}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>bh(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>_h(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>Sh(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>yh(this.map,s,r),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(s,r)=>wh(this.map,s,r),e,t,i)}features(e,t,i,s){const r=this.map.areaSize,a=[];this.centre={x:e,z:t},this.evict(this.wallFeatureCache,400,r);for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++)for(const l of s(this.featuresOf(h,o)))Math.abs(l.x-e)<=i&&Math.abs(l.z-t)<=i&&a.push(l);return a}featuresOf(e,t){const i=e+","+t;let s=this.wallFeatureCache.get(i);if(!s){const r=performance.now();s=Xp(this.map,e,t),this.buildMs+=performance.now()-r,this.wallFeatureCache.set(i,s)}return s}wallsNear(e,t,i){return this.features(e,t,i,s=>s.walls)}bedsNear(e,t,i){return this.features(e,t,i,s=>s.beds)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const l=s.setPieceSpot(h,o);l&&Math.abs(l.x-e)<=i&&Math.abs(l.z-t)<=i&&a.push({x:l.x,z:l.z,type:s.typeOf(h,o),variant:0,flip:Re(h,o,s.seed+71)<.5})}return a}}const em=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),md=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],tm=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],El=n=>!n.leashed&&n.level!==Ls;function gd(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function To(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!El(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function Eh(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function nm(n,e,t,i,s,r,a,o,h=()=>!1){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const l=o.invite,d=o.leash,f=u=>e[u];if(t.talk&&s){const u=n.talk?f(n.talk.id):null;if(u&&!u.leashed&&Math.hypot(u.x-i.x,u.z-i.z)<=l.cancelDistance)n.talk.t+=a,n.progress.set(u.id,n.talk.t),u.rest=Math.max(u.rest,.2),u.moving=!1,u.facing=i.x>=u.x?1:-1,u.away=i.z<u.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(Eh(n,u,u.x,u.z,r),n.progress.delete(u.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const m=To(e,i.x,i.z,l.talkRange)??To(e,i.x,i.z,l.talkRange,!0);n.talk=m?{id:m.id,refused:!El(m),t:n.progress.get(m.id)??0,total:El(m)?md(m,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[u,m]of n.progress){if(n.talk?.id===u)continue;const p=m-a*l.decayRate;p<=0||e[u].leashed?n.progress.delete(u):n.progress.set(u,p)}if(t.inviteNearest){const u=To(e,i.x,i.z,1/0);u&&Eh(n,u,u.x,u.z,r)}if(t.sigil&&s){let u=-1,m=d.pickRadius;if(n.placed.forEach((p,M)=>{const g=Math.hypot(p.x-i.x,p.z-i.z);g<=m&&(m=g,u=M)}),u>=0){const[p]=n.placed.splice(u,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];xd(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const u of n.stack)h(u)||Ah(f(u),i.x,i.z,a,o);for(const u of n.placed)h(u.id)||Ah(f(u.id),u.x,u.z,a,o)}const xd=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function Ah(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const m=Math.hypot(n.x-e,n.z-t),p=a*.5/m;n.tx=e+(n.x-e)*p,n.tz=t+(n.z-t)*p,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const m=n.rand()*Math.PI*2,p=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(m)*p,n.tz=t+Math.sin(m)*p,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,l=n.tz-n.z,d=Math.hypot(h,l);if(d<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,r.runSpeed*(n.level===Ls?.6:1)):n.speed*1.5,u=Math.min(d,f*i);n.x+=h/d*u,n.z+=l/d*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=Ac(h,l,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const Md=(n,e)=>n>=Ls?1/0:e.berries.toEvolve[Math.min(n,e.berries.toEvolve.length-1)],Al=(n,e)=>n.leashed&&n.level<Ls&&!e.evolving.has(n.id);function im(n,e){const t=e.berries,i=jn(n.seed*6151+29),s=[],r=[];for(let o=0;o<n.n;o++)for(let h=0;h<n.n;h++){if(h===n.centreCell[0]&&o===n.centreCell[1])continue;const l=n.siteOf(h,o),d=jn(n.seed*3571+h*389+o*7741+17),f=s.length;for(let M=0;M<t.bushesPerArea*12&&s.length-f<t.bushesPerArea;M++){const g=d()*Math.PI*2,x=n.areaSize*(.15+d()*.5),v=l.x+Math.cos(g)*x,b=l.z+Math.sin(g)*x,w=n.areaAt(v,b);w.cell[0]!==h||w.cell[1]!==o||n.hardClear(v,b)||n.paths.at(v,b,1.5)||s.slice(f).some(E=>Math.hypot(E.x-v,E.z-b)<3)||s.push({x:v,z:b,type:w.type,variant:Math.floor(d()*1e6),flip:d()<.5})}const u=s.length-f,m=Math.min(u,t.perArea[0]+Math.floor(d()*(t.perArea[1]-t.perArea[0]+1))),p=Array.from({length:u},(M,g)=>f+g);for(let M=p.length-1;M>0;M--){const g=Math.floor(d()*(M+1));[p[M],p[g]]=[p[g],p[M]]}for(let M=0;M<m;M++)r.push({id:r.length,bush:p[M],claimedBy:null})}const a=new Int32Array(s.length).fill(-1);for(const o of r)a[o.bush]=o.id;return{bushes:s,berries:r,onBush:a,fed:new Map,feeding:new Map,evolving:new Map,ateAt:new Map,events:[],rand:i}}function sm(n,e){n.onBush[e.bush]=-1;const t=n.bushes.length-n.berries.length;if(t>0){let i=Math.floor(n.rand()*t);for(let s=0;s<n.bushes.length;s++)if(n.onBush[s]<0&&s!==e.bush&&i--<=0){e.bush=s;break}}n.onBush[e.bush]=e.id,e.claimedBy=null}function rm(n,e,t,i){let s=null,r=i*i;for(const a of n.berries){if(a.claimedBy!==null)continue;const o=n.bushes[a.bush],h=(o.x-e)**2+(o.z-t)**2;h<=r&&(r=h,s=a)}return s}function Cc(n,e){const t=n.feeding.get(e);if(t){const i=n.berries[t.berry];i.claimedBy===e&&(i.claimedBy=null),n.feeding.delete(e)}}function vd(n,e,t,i){if(e.level>=Ls||n.evolving.has(e.id))return;const s=(n.fed.get(e.id)??0)+1;if(n.ateAt.set(e.id,t),s>=Md(e.level,i)){n.fed.set(e.id,0);const r=60/i.beat.bpm*4,a=(Math.floor(t/r)+2)*r;n.evolving.set(e.id,{from:e.level,to:e.level+1,at:a,since:t}),Cc(n,e.id),n.events.push({kind:"evolving",id:e.id,x:e.x,z:e.z,at:t})}else n.fed.set(e.id,s)}function am(n,e,t,i,s,r){n.events=[];const a=r.berries;for(const[o,h]of n.evolving)if(i>=h.at){const l=e[o];l.level=h.to,n.evolving.delete(o),n.events.push({kind:"evolved",id:o,x:l.x,z:l.z,at:i})}for(const[o,h]of n.feeding){const l=e[o],d=n.berries[h.berry],f=n.bushes[d.bush],u=t(o);if(!Al(l,n)||!u||Math.hypot(f.x-u.x,f.z-u.z)>a.seekRadius+r.leash.length){Cc(n,o);continue}const m=f.x-l.x,p=f.z-l.z+.6,M=Math.hypot(m,p);if(!h.eating){if(M>.3){const g=Math.min(M,l.speed*1.5*s);l.x+=m/M*g,l.z+=p/M*g,Math.abs(m)>.02&&(l.facing=m>0?1:-1),l.away=p<-.3&&Math.abs(p)>Math.abs(m),l.moving=!0,l.walk+=s*4;continue}h.eating=!0,h.eatLeft=a.eatTime}if(l.moving=!1,l.away=!0,h.eatLeft-=s,h.eatLeft<=0){n.feeding.delete(o),n.events.push({kind:"ate",id:o,x:f.x,z:f.z,at:i}),sm(n,d);const g=n.bushes[d.bush];n.events.push({kind:"regrew",id:d.id,x:g.x,z:g.z,at:i}),vd(n,l,i,r),l.rest=.6,l.away=!1}}for(const o of e){if(!Al(o,n)||n.feeding.has(o.id))continue;const h=t(o.id);if(!h)continue;const l=rm(n,o.x,o.z,a.seekRadius);if(!l)continue;const d=n.bushes[l.bush];Math.hypot(d.x-h.x,d.z-h.z)>a.seekRadius+r.leash.length||(l.claimedBy=o.id,n.feeding.set(o.id,{berry:l.id,eating:!1,eatLeft:0}),n.events.push({kind:"claimed",id:o.id,x:d.x,z:d.z,at:i}))}}function om(n,e,t,i,s,r){let a=null,o=1/0;for(const h of e)if(Al(h,n)){const l=Math.hypot(h.x-t,h.z-i);l<o&&(o=l,a=h)}return a&&(Cc(n,a.id),vd(n,a,s,r),n.events.push({kind:"ate",id:a.id,x:a.x,z:a.z,at:s})),a}const lm=n=>`${n[0]},${n[1]}`;function cm(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[lm(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function hm(n,e){const t=Math.floor(Re(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}const um=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function bd(n,e){const t=n.wave+1,i=new Map;for(const[a,o]of n.areas)for(const h of e.neighbours.get(a)??[]){if(n.areas.has(h)||i.has(h))continue;const l=h.split(",").map(Number);um(e,l)&&i.set(h,{key:h,cell:l,from:o.cell})}const s=[...i.values()].sort((a,o)=>Re(a.cell[0],a.cell[1],e.seed+t)-Re(o.cell[0],o.cell[1],e.seed+t)),r=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;return s.slice(0,r)}function _d(n,e,t){const i=n.wave+1,s=[];for(const{key:r,cell:a,from:o}of bd(n,e)){const h={cell:a,wave:i,at:t,from:o,soundsystem:hm(e,a)};n.areas.set(r,h),s.push(h)}return n.wave=i,s}function dm(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,_d(n,e,t))}function yd(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function fm(n,e){const t=new Set(bd(n,e).map(s=>s.key)),i=[];for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=`${r},${s}`;if(n.areas.has(a))continue;const o=e.soundsystemSpot(r,s);i.push({key:a,cell:[r,s],x:o.x,z:o.z,awake:t.has(a)})}return i}function pm(n,e){const t=Op(n,e),i={...Np(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new Rc(t),creatures:Hp(t),clock:Nf(),witch:i,camera:Df(e,i.x,lr(i,e),i.z),party:cm(t),leash:em(),berries:im(t,e)}}function mm(n,e,t){const i=Ff(n.clock,t);if(i===0)return;n.witch=Fp(n.witch,e,i,n.tuning,n.map.bounds),n.camera=If(n.camera,e.zoom,{x:n.witch.x,y:lr(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(_d(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),dm(n.party,n.map,n.clock.time,i),Wp(n.creatures,n.witch.x,n.witch.z,gm(n),i,n.clock.time,n.map);const s=n.berries,r=a=>s.feeding.has(a)||s.evolving.has(a);nm(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning,r),e.feedNearest&&om(s,n.creatures,n.witch.x,n.witch.z,n.clock.time,n.tuning),am(s,n.creatures,a=>gd(n.leash,a,n.witch.x,n.witch.z),n.clock.time,i,n.tuning)}const gm=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+ud(n.map)*2.5),Th=n=>Xu(n.camera,n.camera.lift,n.tuning);function wd(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Ft[e.type].name+(t?` (set piece: ${t})`:"")}const xm="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Mm="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",vm=20,bm=28,_m=4,ym=.7,wm=4,Sm="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Em=1,Am=.2,Tm=.18,Rm=.25,Cm=38,Lm="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",Pm={width:20,scale:40,stray:.5},Dm="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",Im={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},Om=.16,Nm=.8,Fm=2.25,Um="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",km={from:20,keep:.35},Bm=1.7,zm=4.6,Hm=2.8,Gm=10.5,Wm=11.25,Vm=3.4,Ym="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",Xm=17.5,Km=32,qm=10,$m="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRate degrees a second (half that at full boost), so she swoops in arcs; a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second (and she brakes); letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",Zm={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,glideTime:1,sharpTurnBleed:3,cameraPull:.06},Jm=28,Qm=.7,jm={awayEnter:55,awayLeave:65},eg=.7,tg=.55,ng=1.4,ig=24,sg="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",rg={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},ag="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches along the ground (nothing beyond); glowFalloff: how fast it falls off, as (1 - distance/glowReach)^glowFalloff (2.5: about half at 12 m with a 50 m reach, a faint tail to 40 m). ?glow=<reach>,<falloff> in the URL tries other values live. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",og=3,lg=50,cg=2.5,hg=8,ug=1,dg=16,fg=12,pg=20,mg="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",gg="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), full under her, falling off as glowFalloff says out to glowReach metres, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",xg={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Mg=.65,vg="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",bg={bpm:120},_g="Berries and evolving (Ed): every area has bushesPerArea berry bushes (normal bushes of that area) and perArea [min, max] berries on distinct ones at the start. Party animals (invited, not legends) walk to a berry within seekRadius metres, eat it (eatTime seconds) and go back; the berry grows again at once on a free berry bush somewhere else on the map. After toEvolve berries (babies, young, adults) a party animal evolves on the next bar line; adults become legends (the only way to get a party legend). colour: the berry's (shiny dark cherry red); glow: its soft halo's strength. B (debug) feeds the nearest party animal one berry.",yg={perArea:[8,12],bushesPerArea:20,seekRadius:15,eatTime:1.2,toEvolve:[5,10,30],colour:"#9e1024",glow:.8},wg="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",Sg="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",Eg={height:3,opacity:.65,beam:.25,size:1},Ag={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},Tg="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Rg={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Cg="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Lg={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},Pg="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",Dg={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},Ig={spacing:10,campfire:.012,magicStone:0,pond:.02,wetPond:.12},Og={near:150,far:360},Ng="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Fg={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},Ug="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",kg="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Bg={on:!0,strength:.7,trees:!1},zg={on:!0,strength:.45,height:18,cover:.55,wind:.6},Hg={on:!0,strength:.12,height:3,wind:.8},Gg="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Wg="smooth",Vg="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",Yg=0,Xg="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing, at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",Kg={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},qg="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",$g={emojiPixels:11,scale:1},Zg="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",Jg={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},Qg="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).",jg={spacing:34,chance:.0067,nearRoad:4,minGap:80},e1="Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.",t1={runs:[3,5],runLength:[5,10],gateChance:.5,rings:[1,2],ringStones:[6,12],ringRadius:[6,11],avenueChance:.35,loneChance:.3,clumps:[2,4],clumpSize:[3,6],clumpRadius:5},n1="Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. beamHeight: the beacon's height (metres); lightRange: stones within this many metres light the scene. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives.",i1={scale:2.25,beamHeight:46,lightRange:160,dormant:{glow:.5,light:.55,reach:12,beam:.1},awake:{glow:[.7,1],light:.9,lightBuild:1,reach:18,beam:.3,motes:8,moteBuild:12},flare:{time:1.6,light:3.5}},s1="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",r1={spacing:26,ruins:.01,rocks:.03,freak:.004,minGap:80,clearing:.3,pathGap:2,footprint:4},a1="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next; stairs (stairsChance) only where a path goes down into a steep or sunken area, one flight per path at most; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",o1={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,pieceGap:40,stairsChance:.4,treesOnBroken:.35,edgeBushes:3,bushBoost:3},l1="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",c1={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},h1={length:8,runSpeed:4,pickRadius:2,spacing:4},u1={rim:!0,sparks:!0,thread:!0,sparkEvery:4},d1="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",f1={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},p1="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",m1={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},g1="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",x1={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},M1="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",v1={screenFraction:.8,edge:.1},b1="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",_1={black:.03,gamma:1.35,ambient:.35},y1={on:!0,strength:.7,threshold:.55},w1={on:!0,where:"before",strength:3,band:.4,centre:.55},S1="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",E1=2,A1=20,T1=1.3,R1=.5,C1=.35,L1=.35,P1=.25,D1=!0,I1=.55,O1=600,N1=.6,F1="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement.",U1=.25,k1=1.8,B1=9,z1="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",H1=7,G1=6,W1=3,V1=1.5,Y1=.35,X1={_readme:xm,_map:Mm,mapAreas:vm,areaSize:bm,areaScale:_m,areaSizeVariance:ym,borderLayers:wm,_trees:Sm,treeDensity:Em,clearingSize:Am,clearingFalloff:Tm,gladeAmount:Rm,gladeScale:Cm,_areaEdgeBlend:Lm,areaEdgeBlend:Pm,_density:Dm,density:Im,bushDensity:Om,bushClump:Nm,treeHeight:Fm,_treeCap:Um,treeCap:km,crownWidth:Bm,treeSpacingX:zm,treeSpacingZ:Hm,crownHalfWidth:Gm,crownHeight:Wm,bushSpacing:Vm,_witch:Ym,groundSpeed:Xm,treetopSpeed:Km,acceleration:qm,_treetop:$m,treetop:Zm,groundAcceleration:Jm,leanAt:Qm,facing:jm,riseTime:eg,descendTime:tg,groundHeight:ng,treetopHeight:ig,_camera:sg,camera:rg,_look:ag,pixelSize:og,glowReach:lg,glowFalloff:cg,glowHeight:hg,spriteTilt:ug,artPixelsPerMetre:dg,viewMargin:fg,lightBudget:pg,_lightSources:mg,_lights:gg,lights:xg,glowPower:Mg,_beat:vg,beat:bg,_berries:_g,berries:yg,_occlusion:wg,_sigilProjection:Sg,sigilProjection:Eg,occlusion:Ag,_stack:Tg,stack:Rg,_lasers:Cg,lasers:Lg,_borders:Pg,borders:Dg,lightSources:Ig,haze:Og,_scenery:Ng,scenery:Fg,_post:Ug,_shadows:kg,shadows:Bg,canopyShadow:zg,mist:Hg,_fx:Gg,fx:Wg,_moonbeams:Vg,moonbeams:Yg,_treehouse:Xg,treehouse:Kg,_bubbles:qg,bubbles:$g,_grounds:Zg,grounds:Jg,_relics:Qg,relics:jg,_walls:e1,walls:t1,_runeMarkers:n1,runeMarkers:i1,_decor:s1,decor:r1,_paths:a1,paths:o1,_invite:l1,invite:c1,leash:h1,bond:u1,_party:d1,party:f1,_stringLights:p1,stringLights:m1,_dancefloor:g1,dancefloor:x1,_canopyCutout:M1,canopyCutout:v1,_tone:b1,tone:_1,bloom:y1,tiltShift:w1,_creatures:S1,creaturesNear:E1,creaturesFar:A1,creatureCurve:T1,youngShareFar:R1,adultsFrom:C1,adultShareFar:L1,legendChanceFar:P1,legendNextToHome:D1,legendsFrom:I1,creatureSimRadius:O1,creatureSpeed:N1,_setPieces:F1,setPieceChance:U1,setPieceScale:k1,setPieceClear:B1,_placement:z1,setPieceFootprint:H1,soundsystemFootprint:G1,reserveMargin:W1,treeMarginFromSoundsystem:V1,legendSpeed:Y1},os=X1;class K1{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFRB]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,s=x=>this.pressed.has(x);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),l=s("Backquote"),d=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=s("KeyE")||s("KeyR");const u=s("KeyI"),m=s("KeyB");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const v=R=>!!x.buttons[R]?.pressed,w=x.buttons.some((R,T)=>R.pressed&&!this.padPrev[T])&&!!this.onAny?.(),E=R=>!w&&v(R)&&!this.padPrev[R];let y=x.axes[0]??0,A=x.axes[1]??0;const _=Math.hypot(y,A),S=.18;if(_<S)y=0,A=0;else{const R=(Math.min(1,_)-S)/(1-S)/_;y*=R,A*=R}y+=(v(15)?1:0)-(v(14)?1:0),A+=(v(13)?1:0)-(v(12)?1:0),r+=y,a+=A,E(3)&&(o=!0),(E(4)||E(6))&&(h+=1),(E(5)||E(7))&&(h-=1),E(8)&&(l=!0),v(0)&&(d=!0),E(2)&&(f=!0),this.padPrev=x.buttons.map(R=>R.pressed);break}const M=this.touch;r+=M.x,a+=M.y,M.toggle&&(o=!0),h+=M.zoom,M.debug&&(l=!0),M.talk&&(d=!0),M.sigil&&(f=!0),M.toggle=!1,M.zoom=0,M.debug=!1,M.sigil=!1;const g=Math.hypot(r,a);return g>1&&(r/=g,a/=g),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:l,nextWave:e,pauseWaves:t,talk:d,sigil:f,inviteNearest:u,feedNearest:m}}}const Lc="186",q1=0,Rh=1,$1=2,za=1,Z1=2,kr=3,As=0,On=1,ai=2,Ei=0,tr=1,Hi=2,Ch=3,Lh=4,po=5,Js=100,J1=101,Q1=102,j1=103,e2=104,Pc=200,t2=201,Dc=202,n2=203,Ic=204,Oc=205,i2=206,s2=207,r2=208,a2=209,o2=210,l2=211,c2=212,h2=213,u2=214,Tl=0,Rl=1,Cl=2,Gr=3,Ll=4,Pl=5,Za=6,Dl=7,Sd=0,d2=1,f2=2,Ai=0,Ed=1,Ad=2,Td=3,Rd=4,Cd=5,Ld=6,Pd=7,Dd=300,Ts=301,cr=302,Ro=303,Co=304,mo=306,Ja=1e3,Ui=1001,Il=1002,Wt=1003,p2=1004,sa=1005,Kt=1006,Lo=1007,bs=1008,zn=1009,Id=1010,Od=1011,Wr=1012,Nc=1013,Ti=1014,ci=1015,Ri=1016,Fc=1017,Uc=1018,Vr=1020,Nd=35902,Fd=35899,Ud=1021,kd=1022,Gn=1023,Gi=1026,_s=1027,kc=1028,Bc=1029,Rs=1030,zc=1031,Hc=1033,Ha=33776,Ga=33777,Wa=33778,Va=33779,Ol=35840,Nl=35841,Fl=35842,Ul=35843,kl=36196,Bl=37492,zl=37496,Hl=37488,Gl=37489,Qa=37490,Wl=37491,Vl=37808,Yl=37809,Xl=37810,Kl=37811,ql=37812,$l=37813,Zl=37814,Jl=37815,Ql=37816,jl=37817,ec=37818,tc=37819,nc=37820,ic=37821,sc=36492,rc=36494,ac=36495,oc=36283,lc=36284,ja=36285,cc=36286,m2=3200,Ph=0,g2=1,Hn="",$n="srgb",Yr="srgb-linear",eo="linear",Rt="srgb",Po=7680,x2=519,M2=512,v2=513,b2=514,Gc=515,_2=516,y2=517,Wc=518,w2=519,S2=35044,nr=35048,Dh="300 es",Si=2e3,to=2001;function E2(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function no(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function A2(){const n=no("canvas");return n.style.display="block",n}const Ih={};function Oh(...n){const e="THREE."+n.shift();console.log(e,...n)}function Bd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=Bd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function xt(...n){n=Bd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ir(...n){const e=n.join(" ");e in Ih||(Ih[e]=!0,Ke(...n))}function T2(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const R2={[Tl]:Rl,[Cl]:Za,[Ll]:Dl,[Gr]:Pl,[Rl]:Tl,[Za]:Cl,[Dl]:Ll,[Pl]:Gr};class Ps{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Do=Math.PI/180,hc=180/Math.PI;function Zr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]).toLowerCase()}function ht(n,e,t){return Math.max(e,Math.min(t,n))}function C2(n,e){return(n%e+e)%e}function Io(n,e,t){return(1-t)*n+t*e}function Er(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class $e{static{$e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],l=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],m=r[a+1],p=r[a+2],M=r[a+3];if(f!==M||h!==u||l!==m||d!==p){let g=h*u+l*m+d*p+f*M;g<0&&(u=-u,m=-m,p=-p,M=-M,g=-g);let x=1-o;if(g<.9995){const v=Math.acos(g),b=Math.sin(v);x=Math.sin(x*v)/b,o=Math.sin(o*v)/b,h=h*x+u*o,l=l*x+m*o,d=d*x+p*o,f=f*x+M*o}else{h=h*x+u*o,l=l*x+m*o,d=d*x+p*o,f=f*x+M*o;const v=1/Math.sqrt(h*h+l*l+d*d+f*f);h*=v,l*=v,d*=v,f*=v}}e[t]=h,e[t+1]=l,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],l=i[s+2],d=i[s+3],f=r[a],u=r[a+1],m=r[a+2],p=r[a+3];return e[t]=o*p+d*f+h*m-l*u,e[t+1]=h*p+d*u+l*f-o*m,e[t+2]=l*p+d*m+o*u-h*f,e[t+3]=d*p-o*f-h*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,l=o(i/2),d=o(s/2),f=o(r/2),u=h(i/2),m=h(s/2),p=h(r/2);switch(a){case"XYZ":this._x=u*d*f+l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f-u*m*p;break;case"YXZ":this._x=u*d*f+l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f+u*m*p;break;case"ZXY":this._x=u*d*f-l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f-u*m*p;break;case"ZYX":this._x=u*d*f-l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f+u*m*p;break;case"YZX":this._x=u*d*f+l*m*p,this._y=l*m*f+u*d*p,this._z=l*d*p-u*m*f,this._w=l*d*f-u*m*p;break;case"XZY":this._x=u*d*f-l*m*p,this._y=l*m*f-u*d*p,this._z=l*d*p+u*m*f,this._w=l*d*f+u*m*p;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],l=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-h)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(d-h)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(h+d)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(h+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+s*l-r*h,this._y=s*d+a*h+r*o-i*l,this._z=r*d+a*l+i*h-s*o,this._w=a*d-i*o-s*h-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);h=Math.sin(h*l)/d,t=Math.sin(t*l)/d,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,l=2*(a*s-o*i),d=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+h*l+a*f-o*d,this.y=i+h*d+o*l-r*f,this.z=s+h*f+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Oo.copy(this).projectOnVector(e),this.sub(Oo)}reflect(e){return this.sub(Oo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oo=new W,Nh=new Mr;class Je{static{Je.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,l)}set(e,t,i,s,r,a,o,h,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=h,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],l=i[1],d=i[4],f=i[7],u=i[2],m=i[5],p=i[8],M=s[0],g=s[3],x=s[6],v=s[1],b=s[4],w=s[7],E=s[2],y=s[5],A=s[8];return r[0]=a*M+o*v+h*E,r[3]=a*g+o*b+h*y,r[6]=a*x+o*w+h*A,r[1]=l*M+d*v+f*E,r[4]=l*g+d*b+f*y,r[7]=l*x+d*w+f*A,r[2]=u*M+m*v+p*E,r[5]=u*g+m*b+p*y,r[8]=u*x+m*w+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*r*d+i*o*h+s*r*l-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],d=e[8],f=d*a-o*l,u=o*h-d*r,m=l*r-a*h,p=t*f+i*u+s*m;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/p;return e[0]=f*M,e[1]=(s*l-d*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(d*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=m*M,e[7]=(i*h-l*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(i*h,i*l,-i*(h*a+l*o)+a+e,-s*l,s*h,-s*(-l*a+h*o)+o+t,0,0,1),this}scale(e,t){return ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(No.makeScale(e,t)),this}rotate(e){return ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(No.makeRotation(-e)),this}translate(e,t){return ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(No.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const No=new Je,Fh=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uh=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function L2(){const n={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Rt&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Rt&&(s.r=sr(s.r),s.g=sr(s.g),s.b=sr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?eo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ir("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ir("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Yr]:{primaries:e,whitePoint:i,transfer:eo,toXYZ:Fh,fromXYZ:Uh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:e,whitePoint:i,transfer:Rt,toXYZ:Fh,fromXYZ:Uh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}}),n}const ct=L2();function Bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ns;class P2{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ns===void 0&&(Ns=no("canvas")),Ns.width=e.width,Ns.height=e.height;const s=Ns.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ns}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=no("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Bi(t[i]/255)*255):t[i]=Bi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let D2=0;class Vc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:D2++}),this.uuid=Zr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Fo(s[a].image)):r.push(Fo(s[a]))}else r=Fo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Fo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?P2.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let I2=0;const Uo=new W;class Sn extends Ps{constructor(e=Sn.DEFAULT_IMAGE,t=Sn.DEFAULT_MAPPING,i=Ui,s=Ui,r=Kt,a=bs,o=Gn,h=zn,l=Sn.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:I2++}),this.uuid=Zr(),this.name="",this.source=new Vc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uo).x}get height(){return this.source.getSize(Uo).y}get depth(){return this.source.getSize(Uo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ja:e.x=e.x-Math.floor(e.x);break;case Ui:e.x=e.x<0?0:1;break;case Il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ja:e.y=e.y-Math.floor(e.y);break;case Ui:e.y=e.y<0?0:1;break;case Il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Dd;Sn.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,l=h[0],d=h[4],f=h[8],u=h[1],m=h[5],p=h[9],M=h[2],g=h[6],x=h[10];if(Math.abs(d-u)<.01&&Math.abs(f-M)<.01&&Math.abs(p-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+M)<.1&&Math.abs(p+g)<.1&&Math.abs(l+m+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,w=(m+1)/2,E=(x+1)/2,y=(d+u)/4,A=(f+M)/4,_=(p+g)/4;return b>w&&b>E?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=y/i,r=A/i):w>E?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=y/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=_/r),this.set(i,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(f-M)*(f-M)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(f-M)/v,this.z=(u-d)/v,this.w=Math.acos((l+m+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class O2 extends Ps{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Sn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Vc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends O2{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zd extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class N2 extends Sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class It{static{It.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,l,d,f,u,m,p,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,l,d,f,u,m,p,M,g)}set(e,t,i,s,r,a,o,h,l,d,f,u,m,p,M,g){const x=this.elements;return x[0]=e,x[4]=t,x[8]=i,x[12]=s,x[1]=r,x[5]=a,x[9]=o,x[13]=h,x[2]=l,x[6]=d,x[10]=f,x[14]=u,x[3]=m,x[7]=p,x[11]=M,x[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Fs.setFromMatrixColumn(e,0).length(),r=1/Fs.setFromMatrixColumn(e,1).length(),a=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*d,m=a*f,p=o*d,M=o*f;t[0]=h*d,t[4]=-h*f,t[8]=l,t[1]=m+p*l,t[5]=u-M*l,t[9]=-o*h,t[2]=M-u*l,t[6]=p+m*l,t[10]=a*h}else if(e.order==="YXZ"){const u=h*d,m=h*f,p=l*d,M=l*f;t[0]=u+M*o,t[4]=p*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=m*o-p,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*d,m=h*f,p=l*d,M=l*f;t[0]=u-M*o,t[4]=-a*f,t[8]=p+m*o,t[1]=m+p*o,t[5]=a*d,t[9]=M-u*o,t[2]=-a*l,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*d,m=a*f,p=o*d,M=o*f;t[0]=h*d,t[4]=p*l-m,t[8]=u*l+M,t[1]=h*f,t[5]=M*l+u,t[9]=m*l-p,t[2]=-l,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,m=a*l,p=o*h,M=o*l;t[0]=h*d,t[4]=M-u*f,t[8]=p*f+m,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=m*f+p,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*h,m=a*l,p=o*h,M=o*l;t[0]=h*d,t[4]=-f,t[8]=l*d,t[1]=u*f+M,t[5]=a*d,t[9]=m*f-p,t[2]=p*f-m,t[6]=o*d,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(F2,e,U2)}lookAt(e,t,i){const s=this.elements;return Nn.subVectors(e,t),Nn.lengthSq()===0&&(Nn.z=1),Nn.normalize(),qi.crossVectors(i,Nn),qi.lengthSq()===0&&(Math.abs(i.z)===1?Nn.x+=1e-4:Nn.z+=1e-4,Nn.normalize(),qi.crossVectors(i,Nn)),qi.normalize(),ra.crossVectors(Nn,qi),s[0]=qi.x,s[4]=ra.x,s[8]=Nn.x,s[1]=qi.y,s[5]=ra.y,s[9]=Nn.y,s[2]=qi.z,s[6]=ra.z,s[10]=Nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],l=i[12],d=i[1],f=i[5],u=i[9],m=i[13],p=i[2],M=i[6],g=i[10],x=i[14],v=i[3],b=i[7],w=i[11],E=i[15],y=s[0],A=s[4],_=s[8],S=s[12],R=s[1],T=s[5],L=s[9],O=s[13],I=s[2],k=s[6],H=s[10],K=s[14],ae=s[3],q=s[7],ie=s[11],N=s[15];return r[0]=a*y+o*R+h*I+l*ae,r[4]=a*A+o*T+h*k+l*q,r[8]=a*_+o*L+h*H+l*ie,r[12]=a*S+o*O+h*K+l*N,r[1]=d*y+f*R+u*I+m*ae,r[5]=d*A+f*T+u*k+m*q,r[9]=d*_+f*L+u*H+m*ie,r[13]=d*S+f*O+u*K+m*N,r[2]=p*y+M*R+g*I+x*ae,r[6]=p*A+M*T+g*k+x*q,r[10]=p*_+M*L+g*H+x*ie,r[14]=p*S+M*O+g*K+x*N,r[3]=v*y+b*R+w*I+E*ae,r[7]=v*A+b*T+w*k+E*q,r[11]=v*_+b*L+w*H+E*ie,r[15]=v*S+b*O+w*K+E*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],l=e[13],d=e[2],f=e[6],u=e[10],m=e[14],p=e[3],M=e[7],g=e[11],x=e[15],v=h*m-l*u,b=o*m-l*f,w=o*u-h*f,E=a*m-l*d,y=a*u-h*d,A=a*f-o*d;return t*(M*v-g*b+x*w)-i*(p*v-g*E+x*y)+s*(p*b-M*E+x*A)-r*(p*w-M*y+g*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(r*d-o*h)+s*(r*l-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],d=e[8],f=e[9],u=e[10],m=e[11],p=e[12],M=e[13],g=e[14],x=e[15],v=t*o-i*a,b=t*h-s*a,w=t*l-r*a,E=i*h-s*o,y=i*l-r*o,A=s*l-r*h,_=d*M-f*p,S=d*g-u*p,R=d*x-m*p,T=f*g-u*M,L=f*x-m*M,O=u*x-m*g,I=v*O-b*L+w*T+E*R-y*S+A*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return e[0]=(o*O-h*L+l*T)*k,e[1]=(s*L-i*O-r*T)*k,e[2]=(M*A-g*y+x*E)*k,e[3]=(u*y-f*A-m*E)*k,e[4]=(h*R-a*O-l*S)*k,e[5]=(t*O-s*R+r*S)*k,e[6]=(g*w-p*A-x*b)*k,e[7]=(d*A-u*w+m*b)*k,e[8]=(a*L-o*R+l*_)*k,e[9]=(i*R-t*L-r*_)*k,e[10]=(p*y-M*w+x*v)*k,e[11]=(f*w-d*y-m*v)*k,e[12]=(o*S-a*T-h*_)*k,e[13]=(t*T-i*S+s*_)*k,e[14]=(M*b-p*E-g*v)*k,e[15]=(d*E-f*b+u*v)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-s*h,l*h+s*o,0,l*o+s*h,d*o+i,d*h-s*a,0,l*h-s*o,d*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,l=r+r,d=a+a,f=o+o,u=r*l,m=r*d,p=r*f,M=a*d,g=a*f,x=o*f,v=h*l,b=h*d,w=h*f,E=i.x,y=i.y,A=i.z;return s[0]=(1-(M+x))*E,s[1]=(m+w)*E,s[2]=(p-b)*E,s[3]=0,s[4]=(m-w)*y,s[5]=(1-(u+x))*y,s[6]=(g+v)*y,s[7]=0,s[8]=(p+b)*A,s[9]=(g-v)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Fs.set(s[0],s[1],s[2]).length();const o=Fs.set(s[4],s[5],s[6]).length(),h=Fs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ni.copy(this);const l=1/a,d=1/o,f=1/h;return ni.elements[0]*=l,ni.elements[1]*=l,ni.elements[2]*=l,ni.elements[4]*=d,ni.elements[5]*=d,ni.elements[6]*=d,ni.elements[8]*=f,ni.elements[9]*=f,ni.elements[10]*=f,t.setFromRotationMatrix(ni),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=Si,h=!1){const l=this.elements,d=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),m=(i+s)/(i-s);let p,M;if(h)p=r/(a-r),M=a*r/(a-r);else if(o===Si)p=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===to)p=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Si,h=!1){const l=this.elements,d=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),m=-(i+s)/(i-s);let p,M;if(h)p=1/(a-r),M=a/(a-r);else if(o===Si)p=-2/(a-r),M=-(a+r)/(a-r);else if(o===to)p=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=p,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fs=new W,ni=new It,F2=new W(0,0,0),U2=new W(1,1,1),qi=new W,ra=new W,Nn=new W,kh=new It,Bh=new Mr;class Cs{constructor(e=0,t=0,i=0,s=Cs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],d=s[9],f=s[2],u=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return kh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bh.setFromEuler(this),this.setFromQuaternion(Bh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cs.DEFAULT_ORDER="XYZ";class Hd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let k2=0;const zh=new W,Us=new Mr,Pi=new It,aa=new W,Ar=new W,B2=new W,z2=new Mr,Hh=new W(1,0,0),Gh=new W(0,1,0),Wh=new W(0,0,1),Vh={type:"added"},H2={type:"removed"},ks={type:"childadded",child:null},ko={type:"childremoved",child:null};class Rn extends Ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:k2++}),this.uuid=Zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new W,t=new Cs,i=new Mr,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new It},normalMatrix:{value:new Je}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(Hh,e)}rotateY(e){return this.rotateOnAxis(Gh,e)}rotateZ(e){return this.rotateOnAxis(Wh,e)}translateOnAxis(e,t){return zh.copy(e).applyQuaternion(this.quaternion),this.position.add(zh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hh,e)}translateY(e){return this.translateOnAxis(Gh,e)}translateZ(e){return this.translateOnAxis(Wh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?aa.copy(e):aa.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(Ar,aa,this.up):Pi.lookAt(aa,Ar,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),Us.setFromRotationMatrix(Pi),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(xt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vh),ks.child=e,this.dispatchEvent(ks),ks.child=null):xt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H2),ko.child=e,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vh),ks.child=e,this.dispatchEvent(ks),ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,B2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,z2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,d=h.length;l<d;l++){const f=h[l];r(e.shapes,f)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),l=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),m=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){const h=[];for(const l in o){const d=o[l];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rn.DEFAULT_UP=new W(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ys extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const G2={type:"move"};class Bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,i),x=this._getHandJoint(l,M);g!==null&&(x.matrix.fromArray(g.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=g.radius),x.visible=g!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=d.position.distanceTo(f.position),m=.02,p=.005;l.inputState.pinching&&u>m+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(G2)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ys;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},oa={h:0,s:0,l:0};function zo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class st{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ct.workingColorSpace){if(e=C2(e,1),t=ht(t,0,1),i=ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=zo(a,r,e+1/3),this.g=zo(a,r,e),this.b=zo(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=$n){function i(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$n){const i=Gd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$n){return ct.workingToColorSpace(_n.copy(this),e),Math.round(ht(_n.r*255,0,255))*65536+Math.round(ht(_n.g*255,0,255))*256+Math.round(ht(_n.b*255,0,255))}getHexString(e=$n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(_n.copy(this),t);const i=_n.r,s=_n.g,r=_n.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,l;const d=(o+a)/2;if(o===a)h=0,l=0;else{const f=a-o;switch(l=d<=.5?f/(a+o):f/(2-a-o),a){case i:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-i)/f+2;break;case r:h=(i-s)/f+4;break}h/=6}return e.h=h,e.s=l,e.l=d,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=$n){ct.workingToColorSpace(_n.copy(this),e);const t=_n.r,i=_n.g,s=_n.b;return e!==$n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(oa);const i=Io($i.h,oa.h,t),s=Io($i.s,oa.s,t),r=Io($i.l,oa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new st;st.NAMES=Gd;class Yh extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cs,this.environmentIntensity=1,this.environmentRotation=new Cs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ii=new W,Di=new W,Ho=new W,Ii=new W,Bs=new W,zs=new W,Xh=new W,Go=new W,Wo=new W,Vo=new W,Yo=new ot,Xo=new ot,Ko=new ot;class oi{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ii.subVectors(e,t),s.cross(ii);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ii.subVectors(s,t),Di.subVectors(i,t),Ho.subVectors(e,t);const a=ii.dot(ii),o=ii.dot(Di),h=ii.dot(Ho),l=Di.dot(Di),d=Di.dot(Ho),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,m=(l*h-o*d)*u,p=(a*d-o*h)*u;return r.set(1-m-p,p,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Ii)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Ii.x),h.addScaledVector(a,Ii.y),h.addScaledVector(o,Ii.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return Yo.setScalar(0),Xo.setScalar(0),Ko.setScalar(0),Yo.fromBufferAttribute(e,t),Xo.fromBufferAttribute(e,i),Ko.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Yo,r.x),a.addScaledVector(Xo,r.y),a.addScaledVector(Ko,r.z),a}static isFrontFacing(e,t,i,s){return ii.subVectors(i,t),Di.subVectors(e,t),ii.cross(Di).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ii.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return oi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return oi.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Bs.subVectors(s,i),zs.subVectors(r,i),Go.subVectors(e,i);const h=Bs.dot(Go),l=zs.dot(Go);if(h<=0&&l<=0)return t.copy(i);Wo.subVectors(e,s);const d=Bs.dot(Wo),f=zs.dot(Wo);if(d>=0&&f<=d)return t.copy(s);const u=h*f-d*l;if(u<=0&&h>=0&&d<=0)return a=h/(h-d),t.copy(i).addScaledVector(Bs,a);Vo.subVectors(e,r);const m=Bs.dot(Vo),p=zs.dot(Vo);if(p>=0&&m<=p)return t.copy(r);const M=m*l-h*p;if(M<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(i).addScaledVector(zs,o);const g=d*p-m*f;if(g<=0&&f-d>=0&&m-p>=0)return Xh.subVectors(r,s),o=(f-d)/(f-d+(m-p)),t.copy(s).addScaledVector(Xh,o);const x=1/(g+M+u);return a=M*x,o=u*x,t.copy(i).addScaledVector(Bs,a).addScaledVector(zs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class rs{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,si):si.fromBufferAttribute(r,a),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),la.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),la.copy(i.boundingBox)),la.applyMatrix4(e.matrixWorld),this.union(la)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),ca.subVectors(this.max,Tr),Hs.subVectors(e.a,Tr),Gs.subVectors(e.b,Tr),Ws.subVectors(e.c,Tr),Zi.subVectors(Gs,Hs),Ji.subVectors(Ws,Gs),ls.subVectors(Hs,Ws);let t=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-ls.z,ls.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,ls.z,0,-ls.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-ls.y,ls.x,0];return!qo(t,Hs,Gs,Ws,ca)||(t=[1,0,0,0,1,0,0,0,1],!qo(t,Hs,Gs,Ws,ca))?!1:(ha.crossVectors(Zi,Ji),t=[ha.x,ha.y,ha.z],qo(t,Hs,Gs,Ws,ca))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Oi=[new W,new W,new W,new W,new W,new W,new W,new W],si=new W,la=new rs,Hs=new W,Gs=new W,Ws=new W,Zi=new W,Ji=new W,ls=new W,Tr=new W,ca=new W,ha=new W,cs=new W;function qo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){cs.fromArray(n,r);const o=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),h=e.dot(cs),l=t.dot(cs),d=i.dot(cs);if(Math.max(-Math.max(h,l,d),Math.min(h,l,d))>o)return!1}return!0}const jt=new W,ua=new $e;let W2=0;class Cn extends Ps{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:W2++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=S2,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ua.fromBufferAttribute(this,t),ua.applyMatrix3(e),this.setXY(t,ua.x,ua.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Er(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Er(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Er(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Er(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),s=Ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),s=Ln(s,this.array),r=Ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wd extends Cn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Vd extends Cn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class _t extends Cn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const V2=new rs,Rr=new W,$o=new W;class Ds{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):V2.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Rr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add($o)),this.expandByPoint(Rr.copy(e.center).sub($o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Y2=0;const Kn=new It,Zo=new Rn,Vs=new W,Fn=new rs,Cr=new rs,on=new W;class qt extends Ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Y2++}),this.uuid=Zr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(E2(e)?Vd:Wd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,i){return Kn.makeTranslation(e,t,i),this.applyMatrix4(Kn),this}scale(e,t,i){return Kn.makeScale(e,t,i),this.applyMatrix4(Kn),this}lookAt(e){return Zo.lookAt(e),Zo.updateMatrix(),this.applyMatrix4(Zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Fn.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Fn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Fn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Fn.min),this.boundingBox.expandByPoint(Fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Cr.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(Fn.min,Cr.min),Fn.expandByPoint(on),on.addVectors(Fn.max,Cr.max),Fn.expandByPoint(on)):(Fn.expandByPoint(Cr.min),Fn.expandByPoint(Cr.max))}Fn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)on.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(on));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)on.fromBufferAttribute(o,l),h&&(Vs.fromBufferAttribute(e,l),on.add(Vs)),s=Math.max(s,i.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Cn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new W,h[_]=new W;const l=new W,d=new W,f=new W,u=new $e,m=new $e,p=new $e,M=new W,g=new W;function x(_,S,R){l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,S),f.fromBufferAttribute(i,R),u.fromBufferAttribute(r,_),m.fromBufferAttribute(r,S),p.fromBufferAttribute(r,R),d.sub(l),f.sub(l),m.sub(u),p.sub(u);const T=1/(m.x*p.y-p.x*m.y);isFinite(T)&&(M.copy(d).multiplyScalar(p.y).addScaledVector(f,-m.y).multiplyScalar(T),g.copy(f).multiplyScalar(m.x).addScaledVector(d,-p.x).multiplyScalar(T),o[_].add(M),o[S].add(M),o[R].add(M),h[_].add(g),h[S].add(g),h[R].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,S=v.length;_<S;++_){const R=v[_],T=R.start,L=R.count;for(let O=T,I=T+L;O<I;O+=3)x(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const b=new W,w=new W,E=new W,y=new W;function A(_){E.fromBufferAttribute(s,_),y.copy(E);const S=o[_];b.copy(S),b.sub(E.multiplyScalar(E.dot(S))).normalize(),w.crossVectors(y,S);const T=w.dot(h[_])<0?-1:1;a.setXYZW(_,b.x,b.y,b.z,T)}for(let _=0,S=v.length;_<S;++_){const R=v[_],T=R.start,L=R.count;for(let O=T,I=T+L;O<I;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Cn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const s=new W,r=new W,a=new W,o=new W,h=new W,l=new W,d=new W,f=new W;if(e)for(let u=0,m=e.count;u<m;u+=3){const p=e.getX(u+0),M=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,g),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,p),h.fromBufferAttribute(i,M),l.fromBufferAttribute(i,g),o.add(d),h.add(d),l.add(d),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,m=t.count;u<m;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(o,h){const l=o.array,d=o.itemSize,f=o.normalized,u=new l.constructor(h.length*d);let m=0,p=0;for(let M=0,g=h.length;M<g;M++){o.isInterleavedBufferAttribute?m=h[M]*o.data.stride+o.offset:m=h[M]*d;for(let x=0;x<d;x++)u[p++]=l[m++]}return new Cn(u,d,f)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=e(h,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let d=0,f=l.length;d<f;d++){const u=l[d],m=e(u,i);h.push(m)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(e[l]=h[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const l=i[h];e.data.attributes[h]=l.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],d=[];for(let f=0,u=l.length;f<u;f++){const m=l[f];d.push(m.toJSON(e.data))}d.length>0&&(s[h]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],f=r[l];for(let u=0,m=f.length;u<m;u++)d.push(f[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jo=new W,X2=new W,K2=new Je;class es{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Jo.subVectors(i,t).cross(X2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Jo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||K2.getNormalMatrix(e),s=this.coplanarPoint(Jo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let q2=0;class vr extends Ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:q2++}),this.uuid=Zr(),this.name="",this.type="Material",this.blending=tr,this.side=As,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Oc,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=x2,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Po,this.stencilZFail=Po,this.stencilZPass=Po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new st().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new es().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ni=new W,Qo=new W,da=new W,fa=new W;class Yc{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Qo.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),fa.copy(this.origin).sub(Qo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(da),o=fa.dot(this.direction),h=-fa.dot(da),l=fa.lengthSq(),d=Math.abs(1-a*a);let f,u,m,p;if(d>0)if(f=a*h-o,u=a*o-h,p=r*d,f>=0)if(u>=-p)if(u<=p){const M=1/d;f*=M,u*=M,m=f*(f+a*u+2*o)+u*(a*f+u+2*h)+l}else u=r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*h)+l;else u=-r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*h)+l;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-h),r),m=-f*f+u*(u+2*h)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-h),r),m=u*(u+2*h)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-h),r),m=-f*f+u*(u+2*h)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*h)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Qo).addScaledVector(da,u),m}intersectSphere(e,t){if(e.radius<0)return null;Ni.subVectors(e.center,this.origin);const i=Ni.dot(this.direction),s=Ni.dot(Ni)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,h=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,h=(e.min.z-u.z)*f),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,l=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,m=e.z-a.z,p=t.x-a.x,M=t.y-a.y,g=t.z-a.z,x=i.x-a.x,v=i.y-a.y,b=i.z-a.z,w=Math.abs(h),E=Math.abs(l),y=Math.abs(d);let A,_,S,R,T,L,O,I,k,H,K,ae;if(w>=E&&w>=y?(S=h,L=f,k=p,ae=x,h>=0?(A=l,_=d,R=u,T=m,O=M,I=g,H=v,K=b):(A=d,_=l,R=m,T=u,O=g,I=M,H=b,K=v)):E>=y?(S=l,L=u,k=M,ae=v,l>=0?(A=d,_=h,R=m,T=f,O=g,I=p,H=b,K=x):(A=h,_=d,R=f,T=m,O=p,I=g,H=x,K=b)):(S=d,L=m,k=g,ae=b,d>=0?(A=h,_=l,R=f,T=u,O=p,I=M,H=x,K=v):(A=l,_=h,R=u,T=f,O=M,I=p,H=v,K=x)),S===0)return null;const q=A/S,ie=_/S,N=1/S,ee=R-q*L,se=T-ie*L,ue=O-q*k,xe=I-ie*k,Le=H-q*ae,B=K-ie*ae,z=Le*xe-B*ue,F=ee*B-se*Le,Z=ue*se-xe*ee;if(s){if(z<0||F<0||Z<0)return null}else if((z<0||F<0||Z<0)&&(z>0||F>0||Z>0))return null;const j=z+F+Z;if(j===0)return null;const ce=N*(z*L+F*k+Z*ae);return(j>0?ce<0:ce>0)?null:this.at(ce/j,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yd extends vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cs,this.combine=Sd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kh=new It,hs=new Yc,pa=new Ds,qh=new W,ma=new W,ga=new W,xa=new W,jo=new W,Ma=new W,$h=new W,va=new W;class zt extends Rn{constructor(e=new qt,t=new Yd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ma.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const d=o[h],f=r[h];d!==0&&(jo.fromBufferAttribute(f,e),a?Ma.addScaledVector(jo,d):Ma.addScaledVector(jo.sub(t),d))}t.add(Ma)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),pa.copy(i.boundingSphere),pa.applyMatrix4(r),hs.copy(e.ray).recast(e.near),!(pa.containsPoint(hs.origin)===!1&&(hs.intersectSphere(pa,qh)===null||hs.origin.distanceToSquared(qh)>(e.far-e.near)**2))&&(Kh.copy(r).invert(),hs.copy(e.ray).applyMatrix4(Kh),!(i.boundingBox!==null&&hs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,M=u.length;p<M;p++){const g=u[p],x=a[g.materialIndex],v=Math.max(g.start,m.start),b=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let w=v,E=b;w<E;w+=3){const y=o.getX(w),A=o.getX(w+1),_=o.getX(w+2);s=ba(this,x,e,i,l,d,f,y,A,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let g=p,x=M;g<x;g+=3){const v=o.getX(g),b=o.getX(g+1),w=o.getX(g+2);s=ba(this,a,e,i,l,d,f,v,b,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let p=0,M=u.length;p<M;p++){const g=u[p],x=a[g.materialIndex],v=Math.max(g.start,m.start),b=Math.min(h.count,Math.min(g.start+g.count,m.start+m.count));for(let w=v,E=b;w<E;w+=3){const y=w,A=w+1,_=w+2;s=ba(this,x,e,i,l,d,f,y,A,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,m.start),M=Math.min(h.count,m.start+m.count);for(let g=p,x=M;g<x;g+=3){const v=g,b=g+1,w=g+2;s=ba(this,a,e,i,l,d,f,v,b,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function $2(n,e,t,i,s,r,a,o){let h;if(e.side===On?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===As,o),h===null)return null;va.copy(o),va.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(va);return l<t.near||l>t.far?null:{distance:l,point:va.clone(),object:n}}function ba(n,e,t,i,s,r,a,o,h,l){n.getVertexPosition(o,ma),n.getVertexPosition(h,ga),n.getVertexPosition(l,xa);const d=$2(n,e,t,i,ma,ga,xa,$h);if(d){const f=new W;oi.getBarycoord($h,ma,ga,xa,f),s&&(d.uv=oi.getInterpolatedAttribute(s,o,h,l,f,new $e)),r&&(d.uv1=oi.getInterpolatedAttribute(r,o,h,l,f,new $e)),a&&(d.normal=oi.getInterpolatedAttribute(a,o,h,l,f,new W),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:h,c:l,normal:new W,materialIndex:0};oi.getNormal(ma,ga,xa,u.normal),d.face=u,d.barycoord=f}return d}class ws extends Sn{constructor(e=null,t=1,i=1,s,r,a,o,h,l=Wt,d=Wt,f,u){super(null,a,o,h,l,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hr extends Cn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ys=new It,Zh=new It,_a=[],Jh=new rs,Z2=new It,Lr=new zt,Pr=new Ds;class J2 extends zt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Z2)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ys),Jh.copy(e.boundingBox).applyMatrix4(Ys),this.boundingBox.union(Jh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ds),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ys),Pr.copy(e.boundingSphere).applyMatrix4(Ys),this.boundingSphere.union(Pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Lr.geometry=this.geometry,Lr.material=this.material,Lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(i),e.ray.intersectsSphere(Pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ys),Zh.multiplyMatrices(i,Ys),Lr.matrixWorld=Zh,Lr.raycast(e,_a);for(let a=0,o=_a.length;a<o;a++){const h=_a[a];h.instanceId=r,h.object=this,t.push(h)}_a.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new hr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ws(new Float32Array(s*this.count),s,this.count,kc,ci));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;return r[h]=o,r.set(i,h+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const us=new Ds,Q2=new $e(.5,.5),ya=new W;class io{constructor(e=new es,t=new es,i=new es,s=new es,r=new es,a=new es){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Si,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],l=r[3],d=r[4],f=r[5],u=r[6],m=r[7],p=r[8],M=r[9],g=r[10],x=r[11],v=r[12],b=r[13],w=r[14],E=r[15];if(s[0].setComponents(l-a,m-d,x-p,E-v).normalize(),s[1].setComponents(l+a,m+d,x+p,E+v).normalize(),s[2].setComponents(l+o,m+f,x+M,E+b).normalize(),s[3].setComponents(l-o,m-f,x-M,E-b).normalize(),i)s[4].setComponents(h,u,g,w).normalize(),s[5].setComponents(l-h,m-u,x-g,E-w).normalize();else if(s[4].setComponents(l-h,m-u,x-g,E-w).normalize(),t===Si)s[5].setComponents(l+h,m+u,x+g,E+w).normalize();else if(t===to)s[5].setComponents(h,u,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(e){us.center.set(0,0,0);const t=Q2.distanceTo(e.center);return us.radius=.7071067811865476+t,us.applyMatrix4(e.matrixWorld),this.intersectsSphere(us)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ya.x=s.normal.x>0?e.max.x:e.min.x,ya.y=s.normal.y>0?e.max.y:e.min.y,ya.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ya)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xd extends vr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const so=new W,ro=new W,Qh=new It,Dr=new Yc,wa=new Ds,el=new W,jh=new W;class j2 extends Rn{constructor(e=new qt,t=new Xd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)so.fromBufferAttribute(t,s-1),ro.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=so.distanceTo(ro);e.setAttribute("lineDistance",new _t(i,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;Qh.copy(s).invert(),Dr.copy(e.ray).applyMatrix4(Qh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let M=m,g=p-1;M<g;M+=l){const x=d.getX(M),v=d.getX(M+1),b=Sa(this,e,Dr,h,x,v,M);b&&t.push(b)}if(this.isLineLoop){const M=d.getX(p-1),g=d.getX(m),x=Sa(this,e,Dr,h,M,g,p-1);x&&t.push(x)}}else{const m=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let M=m,g=p-1;M<g;M+=l){const x=Sa(this,e,Dr,h,M,M+1,M);x&&t.push(x)}if(this.isLineLoop){const M=Sa(this,e,Dr,h,p-1,m,p-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sa(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(so.fromBufferAttribute(o,s),ro.fromBufferAttribute(o,r),t.distanceSqToSegment(so,ro,el,jh)>i)return;el.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(el);if(!(l<e.near||l>e.far))return{distance:l,point:jh.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const eu=new W,tu=new W;class Xc extends j2{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)eu.fromBufferAttribute(t,s),tu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+eu.distanceTo(tu);e.setAttribute("lineDistance",new _t(i,1))}else Ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kd extends vr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nu=new It,uc=new Yc,Ea=new Ds,Aa=new W;class Xr extends Rn{constructor(e=new qt,t=new Kd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ea.copy(i.boundingSphere),Ea.applyMatrix4(s),Ea.radius+=r,e.ray.intersectsSphere(Ea)===!1)return;nu.copy(s).invert(),uc.copy(e.ray).applyMatrix4(nu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=i.index,f=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let p=u,M=m;p<M;p++){const g=l.getX(p);Aa.fromBufferAttribute(f,g),iu(Aa,g,h,s,e,t,this)}}else{const u=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let p=u,M=m;p<M;p++)Aa.fromBufferAttribute(f,p),iu(Aa,p,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function iu(n,e,t,i,s,r,a){const o=uc.distanceSqToPoint(n);if(o<t){const h=new W;uc.closestPointToPoint(n,h),h.applyMatrix4(i);const l=s.ray.origin.distanceTo(h);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class qd extends Sn{constructor(e=[],t=Ts,i,s,r,a,o,h,l,d){super(e,t,i,s,r,a,o,h,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dc extends Sn{constructor(e,t,i,s,r,a,o,h,l){super(e,t,i,s,r,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ur extends Sn{constructor(e,t,i=Ti,s,r,a,o=Wt,h=Wt,l,d=Gi,f=1){if(d!==Gi&&d!==_s)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,h,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ex extends ur{constructor(e,t=Ti,i=Ts,s,r,a=Wt,o=Wt,h,l=Gi){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,h,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $d extends Sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Jr extends qt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],d=[],f=[];let u=0,m=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,s,a,2),p("x","z","y",1,-1,e,i,-t,s,a,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function p(M,g,x,v,b,w,E,y,A,_,S){const R=w/A,T=E/_,L=w/2,O=E/2,I=y/2,k=A+1,H=_+1;let K=0,ae=0;const q=new W;for(let ie=0;ie<H;ie++){const N=ie*T-O;for(let ee=0;ee<k;ee++){const se=ee*R-L;q[M]=se*v,q[g]=N*b,q[x]=I,l.push(q.x,q.y,q.z),q[M]=0,q[g]=0,q[x]=y>0?1:-1,d.push(q.x,q.y,q.z),f.push(ee/A),f.push(1-ie/_),K+=1}}for(let ie=0;ie<_;ie++)for(let N=0;N<A;N++){const ee=u+N+k*ie,se=u+N+k*(ie+1),ue=u+(N+1)+k*(ie+1),xe=u+(N+1)+k*ie;h.push(ee,se,xe),h.push(se,ue,xe),ae+=6}o.addGroup(m,ae,S),m+=ae,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Kc extends qt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],u=[],m=[];let p=0;const M=[],g=i/2;let x=0;v(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new _t(f,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(m,2));function v(){const w=new W,E=new W;let y=0;const A=(t-e)/i;for(let _=0;_<=r;_++){const S=[],R=_/r,T=R*(t-e)+e;for(let L=0;L<=s;L++){const O=L/s,I=O*h+o,k=Math.sin(I),H=Math.cos(I);E.x=T*k,E.y=-R*i+g,E.z=T*H,f.push(E.x,E.y,E.z),w.set(k,A,H).normalize(),u.push(w.x,w.y,w.z),m.push(O,1-R),S.push(p++)}M.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){const R=M[S][_],T=M[S+1][_],L=M[S+1][_+1],O=M[S][_+1];(e>0||S!==0)&&(d.push(R,T,O),y+=3),(t>0||S!==r-1)&&(d.push(T,L,O),y+=3)}l.addGroup(x,y,0),x+=y}function b(w){const E=p,y=new $e,A=new W;let _=0;const S=w===!0?e:t,R=w===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,g*R,0),u.push(0,R,0),m.push(.5,.5),p++;const T=p;for(let L=0;L<=s;L++){const I=L/s*h+o,k=Math.cos(I),H=Math.sin(I);A.x=S*H,A.y=g*R,A.z=S*k,f.push(A.x,A.y,A.z),u.push(0,R,0),y.x=k*.5+.5,y.y=H*.5*R+.5,m.push(y.x,y.y),p++}for(let L=0;L<s;L++){const O=E+L,I=T+L;w===!0?d.push(I,I+1,O):d.push(I+1,I,O),_+=3}l.addGroup(x,_,w===!0?1:2),x+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yn extends qt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),l=o+1,d=h+1,f=e/o,u=t/h,m=[],p=[],M=[],g=[];for(let x=0;x<d;x++){const v=x*u-a;for(let b=0;b<l;b++){const w=b*f-r;p.push(w,-v,0),M.push(0,0,1),g.push(b/o),g.push(1-x/h)}}for(let x=0;x<h;x++)for(let v=0;v<o;v++){const b=v+l*x,w=v+l*(x+1),E=v+1+l*(x+1),y=v+1+l*x;m.push(b,w,y),m.push(w,E,y)}this.setIndex(m),this.setAttribute("position",new _t(p,3)),this.setAttribute("normal",new _t(M,3)),this.setAttribute("uv",new _t(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.width,e.height,e.widthSegments,e.heightSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(su(s))s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(su(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function An(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const s in i)e[s]=i[s]}return e}function su(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function tx(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Zd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const nx={clone:dr,merge:An};var ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends vr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ix,this.fragmentShader=sx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=tx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new st().setHex(s.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ot().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Je().fromArray(s.value);break;case"m4":this.uniforms[i].value=new It().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class rx extends Mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ax extends vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=m2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ox extends vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ta=new W,Ra=new Mr,gi=new W;class Jd extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ta,Ra,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ta,Ra,gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ta,Ra,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ta,Ra,gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new W,ru=new $e,au=new $e;class Bn extends Jd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Do*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hc*2*Math.atan(Math.tan(Do*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,ru,au),t.subVectors(au,ru)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Do*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/l,s*=a.width/h,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class qc extends Jd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,h=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $c extends qt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Xs=-90,Ks=1;class lx extends Rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bn(Xs,Ks,e,t);s.layers=this.layers,this.add(s);const r=new Bn(Xs,Ks,e,t);r.layers=this.layers,this.add(r);const a=new Bn(Xs,Ks,e,t);a.layers=this.layers,this.add(a);const o=new Bn(Xs,Ks,e,t);o.layers=this.layers,this.add(o);const h=new Bn(Xs,Ks,e,t);h.layers=this.layers,this.add(h);const l=new Bn(Xs,Ks,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const l of t)this.remove(l);if(e===Si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===to)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,m),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class cx extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Qd{static{Qd.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function ou(n,e,t,i){const s=hx(i);switch(t){case Ud:return n*e;case kc:return n*e/s.components*s.byteLength;case Bc:return n*e/s.components*s.byteLength;case Rs:return n*e*2/s.components*s.byteLength;case zc:return n*e*2/s.components*s.byteLength;case kd:return n*e*3/s.components*s.byteLength;case Gn:return n*e*4/s.components*s.byteLength;case Hc:return n*e*4/s.components*s.byteLength;case Ha:case Ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wa:case Va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Nl:case Ul:return Math.max(n,16)*Math.max(e,8)/4;case Ol:case Fl:return Math.max(n,8)*Math.max(e,8)/2;case kl:case Bl:case Hl:case Gl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case zl:case Qa:case Wl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Xl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Kl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ql:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case $l:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ql:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case jl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ec:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case tc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case nc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ic:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case sc:case rc:case ac:return Math.ceil(n/4)*Math.ceil(e/4)*16;case oc:case lc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ja:case cc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hx(n){switch(n){case zn:case Id:return{byteLength:1,components:1};case Wr:case Od:case Ri:return{byteLength:2,components:1};case Fc:case Uc:return{byteLength:2,components:4};case Ti:case Nc:case ci:return{byteLength:4,components:1};case Nd:case Fd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lc}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lc);function jd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function ux(n){const e=new WeakMap;function t(o,h){const l=o.array,d=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,l){const d=h.array,f=h.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,d);else{f.sort((m,p)=>m.start-p.start);let u=0;for(let m=1;m<f.length;m++){const p=f[u],M=f[m];M.start<=p.start+p.count+1?p.count=Math.max(p.count,M.start+M.count-p.start):(++u,f[u]=M)}f.length=u+1;for(let m=0,p=f.length;m<p;m++){const M=f[m];n.bufferSubData(l,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}var dx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fx=`#ifdef USE_ALPHAHASH
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
#endif`,px=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mx=`#ifdef USE_AOMAP
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
#endif`,vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bx=`#ifdef USE_BATCHING
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
#endif`,_x=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ex=`#ifdef USE_IRIDESCENCE
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
#endif`,Ax=`#ifdef USE_BUMPMAP
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
#endif`,Tx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Px=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ix=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Nx=`#define PI 3.141592653589793
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
} // validated`,Fx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ux=`vec3 transformedNormal = objectNormal;
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
#endif`,kx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,Kx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,$x=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jx=`#ifdef USE_GRADIENTMAP
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
}`,eM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,sM=`#ifdef USE_ENVMAP
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
#endif`,rM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cM=`PhysicalMaterial material;
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
#endif`,hM=`uniform sampler2D dfgLUT;
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
}`,uM=`
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
#endif`,dM=`#if defined( RE_IndirectDiffuse )
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
#endif`,fM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,mM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_M=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yM=`#if defined( USE_POINTS_UV )
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
#endif`,wM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,EM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,AM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RM=`#ifdef USE_MORPHTARGETS
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
#endif`,CM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,PM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,DM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,NM=`#ifdef USE_NORMALMAP
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
#endif`,FM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,UM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,BM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,HM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,GM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,WM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,VM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,YM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,KM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$M=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,JM=`float getShadowMask() {
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
}`,QM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jM=`#ifdef USE_SKINNING
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
#endif`,ev=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tv=`#ifdef USE_SKINNING
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
#endif`,nv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,av=`#ifdef USE_TRANSMISSION
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
#endif`,ov=`#ifdef USE_TRANSMISSION
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
#endif`,lv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fv=`uniform sampler2D t2D;
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
}`,pv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`#include <common>
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
}`,vv=`#if DEPTH_PACKING == 3200
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
}`,bv=`#define DISTANCE
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
}`,_v=`#define DISTANCE
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
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sv=`uniform float scale;
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
}`,Ev=`uniform vec3 diffuse;
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
}`,Av=`#include <common>
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
}`,Tv=`uniform vec3 diffuse;
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
}`,Rv=`#define LAMBERT
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
}`,Cv=`#define LAMBERT
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
}`,Lv=`#define MATCAP
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
}`,Pv=`#define MATCAP
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
}`,Dv=`#define NORMAL
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
}`,Iv=`#define NORMAL
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
}`,Ov=`#define PHONG
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
}`,Nv=`#define PHONG
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
}`,Fv=`#define STANDARD
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
}`,Uv=`#define STANDARD
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
}`,kv=`#define TOON
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
}`,Bv=`#define TOON
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
}`,zv=`uniform float size;
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
}`,Hv=`uniform vec3 diffuse;
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
}`,Gv=`#include <common>
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
}`,Wv=`uniform vec3 color;
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
}`,Vv=`uniform float rotation;
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
}`,Yv=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:dx,alphahash_pars_fragment:fx,alphamap_fragment:px,alphamap_pars_fragment:mx,alphatest_fragment:gx,alphatest_pars_fragment:xx,aomap_fragment:Mx,aomap_pars_fragment:vx,batching_pars_vertex:bx,batching_vertex:_x,begin_vertex:yx,beginnormal_vertex:wx,bsdfs:Sx,iridescence_fragment:Ex,bumpmap_pars_fragment:Ax,clipping_planes_fragment:Tx,clipping_planes_pars_fragment:Rx,clipping_planes_pars_vertex:Cx,clipping_planes_vertex:Lx,color_fragment:Px,color_pars_fragment:Dx,color_pars_vertex:Ix,color_vertex:Ox,common:Nx,cube_uv_reflection_fragment:Fx,defaultnormal_vertex:Ux,displacementmap_pars_vertex:kx,displacementmap_vertex:Bx,emissivemap_fragment:zx,emissivemap_pars_fragment:Hx,colorspace_fragment:Gx,colorspace_pars_fragment:Wx,envmap_fragment:Vx,envmap_common_pars_fragment:Yx,envmap_pars_fragment:Xx,envmap_pars_vertex:Kx,envmap_physical_pars_fragment:sM,envmap_vertex:qx,fog_vertex:$x,fog_pars_vertex:Zx,fog_fragment:Jx,fog_pars_fragment:Qx,gradientmap_pars_fragment:jx,lightmap_pars_fragment:eM,lights_lambert_fragment:tM,lights_lambert_pars_fragment:nM,lights_pars_begin:iM,lights_toon_fragment:rM,lights_toon_pars_fragment:aM,lights_phong_fragment:oM,lights_phong_pars_fragment:lM,lights_physical_fragment:cM,lights_physical_pars_fragment:hM,lights_fragment_begin:uM,lights_fragment_maps:dM,lights_fragment_end:fM,lightprobes_pars_fragment:pM,logdepthbuf_fragment:mM,logdepthbuf_pars_fragment:gM,logdepthbuf_pars_vertex:xM,logdepthbuf_vertex:MM,map_fragment:vM,map_pars_fragment:bM,map_particle_fragment:_M,map_particle_pars_fragment:yM,metalnessmap_fragment:wM,metalnessmap_pars_fragment:SM,morphinstance_vertex:EM,morphcolor_vertex:AM,morphnormal_vertex:TM,morphtarget_pars_vertex:RM,morphtarget_vertex:CM,normal_fragment_begin:LM,normal_fragment_maps:PM,normal_pars_fragment:DM,normal_pars_vertex:IM,normal_vertex:OM,normalmap_pars_fragment:NM,clearcoat_normal_fragment_begin:FM,clearcoat_normal_fragment_maps:UM,clearcoat_pars_fragment:kM,iridescence_pars_fragment:BM,opaque_fragment:zM,packing:HM,premultiplied_alpha_fragment:GM,project_vertex:WM,dithering_fragment:VM,dithering_pars_fragment:YM,roughnessmap_fragment:XM,roughnessmap_pars_fragment:KM,shadowmap_pars_fragment:qM,shadowmap_pars_vertex:$M,shadowmap_vertex:ZM,shadowmask_pars_fragment:JM,skinbase_vertex:QM,skinning_pars_vertex:jM,skinning_vertex:ev,skinnormal_vertex:tv,specularmap_fragment:nv,specularmap_pars_fragment:iv,tonemapping_fragment:sv,tonemapping_pars_fragment:rv,transmission_fragment:av,transmission_pars_fragment:ov,uv_pars_fragment:lv,uv_pars_vertex:cv,uv_vertex:hv,worldpos_vertex:uv,background_vert:dv,background_frag:fv,backgroundCube_vert:pv,backgroundCube_frag:mv,cube_vert:gv,cube_frag:xv,depth_vert:Mv,depth_frag:vv,distance_vert:bv,distance_frag:_v,equirect_vert:yv,equirect_frag:wv,linedashed_vert:Sv,linedashed_frag:Ev,meshbasic_vert:Av,meshbasic_frag:Tv,meshlambert_vert:Rv,meshlambert_frag:Cv,meshmatcap_vert:Lv,meshmatcap_frag:Pv,meshnormal_vert:Dv,meshnormal_frag:Iv,meshphong_vert:Ov,meshphong_frag:Nv,meshphysical_vert:Fv,meshphysical_frag:Uv,meshtoon_vert:kv,meshtoon_frag:Bv,points_vert:zv,points_frag:Hv,shadow_vert:Gv,shadow_frag:Wv,sprite_vert:Vv,sprite_frag:Yv},Te={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},_i={basic:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:An([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:An([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:An([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new st(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:An([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:An([Te.points,Te.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:An([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:An([Te.common,Te.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:An([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:An([Te.sprite,Te.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:An([Te.common,Te.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:An([Te.lights,Te.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};_i.physical={uniforms:An([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const Ca={r:0,b:0,g:0},Xv=new It,ef=new Je;ef.set(-1,0,0,0,1,0,0,0,1);function Kv(n,e,t,i,s,r){const a=new st(0);let o=s===!0?0:1,h,l,d=null,f=0,u=null;function m(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){const w=v.backgroundBlurriness>0;b=e.get(b,w)}return b}function p(v){let b=!1;const w=m(v);w===null?g(a,o):w&&w.isColor&&(g(w,1),b=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,b){const w=m(b);w&&(w.isCubeTexture||w.mapping===mo)?(l===void 0&&(l=new zt(new Jr(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:dr(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,y,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=w,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Xv.makeRotationFromEuler(b.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ef),l.material.toneMapped=ct.getTransfer(w.colorSpace)!==Rt,(d!==w||f!==w.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new zt(new Yn(2,2),new Mt({name:"BackgroundMaterial",uniforms:dr(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:As,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.toneMapped=ct.getTransfer(w.colorSpace)!==Rt,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function g(v,b){v.getRGB(Ca,Zd(n)),t.buffers.color.setClear(Ca.r,Ca.g,Ca.b,b,r)}function x(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:p,addToRenderList:M,dispose:x}}function qv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(T,L,O,I,k){let H=!1;const K=f(T,I,O,L);r!==K&&(r=K,l(r.object)),H=m(T,I,O,k),H&&p(T,I,O,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,w(T,L,O,I),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function h(){return n.createVertexArray()}function l(T){return n.bindVertexArray(T)}function d(T){return n.deleteVertexArray(T)}function f(T,L,O,I){const k=I.wireframe===!0;let H=i[L.id];H===void 0&&(H={},i[L.id]=H);const K=T.isInstancedMesh===!0?T.id:0;let ae=H[K];ae===void 0&&(ae={},H[K]=ae);let q=ae[O.id];q===void 0&&(q={},ae[O.id]=q);let ie=q[k];return ie===void 0&&(ie=u(h()),q[k]=ie),ie}function u(T){const L=[],O=[],I=[];for(let k=0;k<t;k++)L[k]=0,O[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:I,object:T,attributes:{},index:null}}function m(T,L,O,I){const k=r.attributes,H=L.attributes;let K=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){const N=k[q];let ee=H[q];if(ee===void 0&&(q==="instanceMatrix"&&T.instanceMatrix&&(ee=T.instanceMatrix),q==="instanceColor"&&T.instanceColor&&(ee=T.instanceColor)),N===void 0||N.attribute!==ee||ee&&N.data!==ee.data)return!0;K++}return r.attributesNum!==K||r.index!==I}function p(T,L,O,I){const k={},H=L.attributes;let K=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){let N=H[q];N===void 0&&(q==="instanceMatrix"&&T.instanceMatrix&&(N=T.instanceMatrix),q==="instanceColor"&&T.instanceColor&&(N=T.instanceColor));const ee={};ee.attribute=N,N&&N.data&&(ee.data=N.data),k[q]=ee,K++}r.attributes=k,r.attributesNum=K,r.index=I}function M(){const T=r.newAttributes;for(let L=0,O=T.length;L<O;L++)T[L]=0}function g(T){x(T,0)}function x(T,L){const O=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;O[T]=1,I[T]===0&&(n.enableVertexAttribArray(T),I[T]=1),k[T]!==L&&(n.vertexAttribDivisor(T,L),k[T]=L)}function v(){const T=r.newAttributes,L=r.enabledAttributes;for(let O=0,I=L.length;O<I;O++)L[O]!==T[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function b(T,L,O,I,k,H,K){K===!0?n.vertexAttribIPointer(T,L,O,k,H):n.vertexAttribPointer(T,L,O,I,k,H)}function w(T,L,O,I){M();const k=I.attributes,H=O.getAttributes(),K=L.defaultAttributeValues;for(const ae in H){const q=H[ae];if(q.location>=0){let ie=k[ae];if(ie===void 0&&(ae==="instanceMatrix"&&T.instanceMatrix&&(ie=T.instanceMatrix),ae==="instanceColor"&&T.instanceColor&&(ie=T.instanceColor)),ie!==void 0){const N=ie.normalized,ee=ie.itemSize,se=e.get(ie);if(se===void 0)continue;const ue=se.buffer,xe=se.type,Le=se.bytesPerElement,B=xe===n.INT||xe===n.UNSIGNED_INT||ie.gpuType===Nc;if(ie.isInterleavedBufferAttribute){const z=ie.data,F=z.stride,Z=ie.offset;if(z.isInstancedInterleavedBuffer){for(let j=0;j<q.locationSize;j++)x(q.location+j,z.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let j=0;j<q.locationSize;j++)g(q.location+j);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let j=0;j<q.locationSize;j++)b(q.location+j,ee/q.locationSize,xe,N,F*Le,(Z+ee/q.locationSize*j)*Le,B)}else{if(ie.isInstancedBufferAttribute){for(let z=0;z<q.locationSize;z++)x(q.location+z,ie.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let z=0;z<q.locationSize;z++)g(q.location+z);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let z=0;z<q.locationSize;z++)b(q.location+z,ee/q.locationSize,xe,N,ee*Le,ee/q.locationSize*z*Le,B)}}else if(K!==void 0){const N=K[ae];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(q.location,N);break;case 3:n.vertexAttrib3fv(q.location,N);break;case 4:n.vertexAttrib4fv(q.location,N);break;default:n.vertexAttrib1fv(q.location,N)}}}}v()}function E(){S();for(const T in i){const L=i[T];for(const O in L){const I=L[O];for(const k in I){const H=I[k];for(const K in H)d(H[K].object),delete H[K];delete I[k]}}delete i[T]}}function y(T){if(i[T.id]===void 0)return;const L=i[T.id];for(const O in L){const I=L[O];for(const k in I){const H=I[k];for(const K in H)d(H[K].object),delete H[K];delete I[k]}}delete i[T.id]}function A(T){for(const L in i){const O=i[L];for(const I in O){const k=O[I];if(k[T.id]===void 0)continue;const H=k[T.id];for(const K in H)d(H[K].object),delete H[K];delete k[T.id]}}}function _(T){for(const L in i){const O=i[L],I=T.isInstancedMesh===!0?T.id:0,k=O[I];if(k!==void 0){for(const H in k){const K=k[H];for(const ae in K)d(K[ae].object),delete K[ae];delete k[H]}delete O[I],Object.keys(O).length===0&&delete i[L]}}}function S(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:y,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:g,disableUnusedAttributes:v}}function $v(n,e,t){let i;function s(h){i=h}function r(h,l){n.drawArrays(i,h,l),t.update(l,i,1)}function a(h,l,d){d!==0&&(n.drawArraysInstanced(i,h,l,d),t.update(l,i,d))}function o(h,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,l,0,d);let u=0;for(let m=0;m<d;m++)u+=l[m];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Zv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Gn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==zn&&A!==ci&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=h(l);d!==l&&(Ke("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),y=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:p,maxTextureSize:M,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:w,maxSamples:E,samples:y}}function Jv(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new es,o=new Je,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const m=f.length!==0||u||i!==0||s;return s=u,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,m){const p=f.clippingPlanes,M=f.clipIntersection,g=f.clipShadows,x=n.get(f);if(!s||p===null||p.length===0||r&&!g)r?d(null):l();else{const v=r?0:i,b=v*4;let w=x.clippingState||null;h.value=w,w=d(p,u,b,m);for(let E=0;E!==b;++E)w[E]=t[E];x.clippingState=w,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function l(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,m,p){const M=f!==null?f.length:0;let g=null;if(M!==0){if(g=h.value,p!==!0||g===null){const x=m+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<x)&&(g=new Float32Array(x));for(let b=0,w=m;b!==M;++b,w+=4)a.copy(f[b]).applyMatrix4(v,o),a.normal.toArray(g,w),g[w+3]=a.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}const Qs=4,Qv=6,jv=20,eb=256,Ir=new qc,lu=new st;let tl=null,nl=0,il=0,sl=!1;const tb=new W,ds=new W;class cu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=tb}=r;tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(tl,nl,il),this._renderer.xr.enabled=sl,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ts||e.mapping===cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tl=this._renderer.getRenderTarget(),nl=this._renderer.getActiveCubeFace(),il=this._renderer.getActiveMipmapLevel(),sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Ri,format:Gn,colorSpace:Yr,depthBuffer:!1},s=hu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hu(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=nb(r)),this._blurMaterial=sb(r,e,t),this._ggxMaterial=ib(r,e,t)}return s}_compileMaterial(e){const t=new zt(new qt,e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,i,s,r){const h=new Bn(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(lu),f.toneMapping=Ai,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new Jr,new Yd({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,g=M.material;let x=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,x=!0):(g.color.copy(lu),x=!0);for(let b=0;b<6;b++){const w=b%3;w===0?(h.up.set(0,l[b],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+d[b],r.y,r.z)):w===1?(h.up.set(0,0,l[b]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+d[b],r.z)):(h.up.set(0,l[b],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+d[b]));const E=this._cubeSize;qs(s,w*E,b>2?E:0,E,E),f.setRenderTarget(s),x&&f.render(M,h),f.render(e,h)}f.toneMapping=m,f.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ts||e.mapping===cr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=du()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;qs(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,Ir)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),u=l*1.25,m=f*u,{_lodMax:p}=this,M=this._sizeLods[i],g=3*M*(i>p-Qs?i-p+Qs:0),x=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=m,h.mipInt.value=p-t,qs(r,g,x,3*M,2*M),s.setRenderTarget(r),s.render(o,Ir),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=p-i,qs(e,g,x,3*M,2*M),s.setRenderTarget(e),s.render(o,Ir)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const d=this._sizeLods[s],f=3*d*(s>this._lodMax-Qs?s-this._lodMax+Qs:0),u=4*(this._cubeSize-d);qs(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(h,Ir)}}function nb(n){const e=[],t=[];let i=n;const s=n-Qs+1+Qv;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,l=1+o,d=[h,h,l,h,l,l,h,h,l,l,h,l],f=6,u=6,m=3,p=new Float32Array(m*u*f),M=new Float32Array(m*u*f);for(let x=0;x<f;x++){const v=x%3*2/3-1,b=x>2?0:-1,w=[v,b,0,v+2/3,b,0,v+2/3,b+1,0,v,b,0,v+2/3,b+1,0,v,b+1,0];p.set(w,m*u*x);for(let E=0;E<u;E++){const y=d[E*2]*2-1,A=d[E*2+1]*2-1;x===0?ds.set(1,A,y):x===1?ds.set(-y,1,-A):x===2?ds.set(-y,A,1):x===3?ds.set(-1,A,-y):x===4?ds.set(-y,-1,A):ds.set(y,A,-1),ds.toArray(M,(x*u+E)*m)}}const g=new qt;g.setAttribute("position",new Cn(p,m)),g.setAttribute("outputDirection",new Cn(M,m)),t.push(new zt(g,null)),i>Qs&&i--}return{lodMeshes:t,sizeLods:e}}function hu(n,e,t){const i=new Qn(n,e,t);return i.texture.mapping=mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function ib(n,e,t){return new Mt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:go(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function sb(n,e,t){return new Mt({name:"SphericalGaussianBlur",defines:{SAMPLES:jv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:go(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function uu(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:go(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function du(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function go(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class tf extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new qd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jr(5,5,5),r=new Mt({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:On,blending:Ei});r.uniforms.tEquirect.value=t;const a=new zt(s,r),o=t.minFilter;return t.minFilter===bs&&(t.minFilter=Kt),new lx(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function rb(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===Ro||m===Co)if(e.has(u)){const p=e.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const M=new tf(p.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",l),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,p=m===Ro||m===Co,M=m===Ts||m===cr;if(p||M){let g=t.get(u);const x=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==x)return i===null&&(i=new cu(n)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const v=u.image;return p&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new cu(n)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,m){return m===Ro?u.mapping=Ts:m===Co&&(u.mapping=cr),u}function h(u){let m=0;const p=6;for(let M=0;M<p;M++)u[M]!==void 0&&m++;return m===p}function l(u){const m=u.target;m.removeEventListener("dispose",l);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function ab(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ir("WebGLRenderer: "+i+" extension not supported."),s}}}function ob(n,e,t,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];const m=r.get(u);m&&(e.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(f){const u=f.attributes;for(const m in u)e.update(u[m],n.ARRAY_BUFFER)}function l(f){const u=[],m=f.index,p=f.attributes.position;let M=0;if(p===void 0)return;if(m!==null){const v=m.array;M=m.version;for(let b=0,w=v.length;b<w;b+=3){const E=v[b+0],y=v[b+1],A=v[b+2];u.push(E,y,y,A,A,E)}}else{const v=p.array;M=p.version;for(let b=0,w=v.length/3-1;b<w;b+=3){const E=b+0,y=b+1,A=b+2;u.push(E,y,y,A,A,E)}}const g=new(p.count>=65535?Vd:Wd)(u,1);g.version=M;const x=r.get(f);x&&e.remove(x),r.set(f,g)}function d(f){const u=r.get(f);if(u){const m=f.index;m!==null&&u.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:d}}function lb(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function h(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function l(f,u,m){m!==0&&(n.drawElementsInstanced(i,u,r,f*a,m),t.update(u,i,m))}function d(f,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,m);let M=0;for(let g=0;g<m;g++)M+=u[g];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=d}function cb(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:xt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function hb(n,e,t){const i=new WeakMap,s=new ot;function r(a,o,h){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let S=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),p===!0&&(b=2),M===!0&&(b=3);let w=o.attributes.position.count*b,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const y=new Float32Array(w*E*4*f),A=new zd(y,w,E,f);A.type=ci,A.needsUpdate=!0;const _=b*4;for(let R=0;R<f;R++){const T=g[R],L=x[R],O=v[R],I=w*E*4*R;for(let k=0;k<T.count;k++){const H=k*_;m===!0&&(s.fromBufferAttribute(T,k),y[I+H+0]=s.x,y[I+H+1]=s.y,y[I+H+2]=s.z,y[I+H+3]=0),p===!0&&(s.fromBufferAttribute(L,k),y[I+H+4]=s.x,y[I+H+5]=s.y,y[I+H+6]=s.z,y[I+H+7]=0),M===!0&&(s.fromBufferAttribute(O,k),y[I+H+8]=s.x,y[I+H+9]=s.y,y[I+H+10]=s.z,y[I+H+11]=O.itemSize===4?s.w:1)}}u={count:f,texture:A,size:new $e(w,E)},i.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const p=o.morphTargetsRelative?1:1-m;h.getUniforms().setValue(n,"morphTargetBaseInfluence",p),h.getUniforms().setValue(n,"morphTargetInfluences",l)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function ub(n,e,t,i,s){let r=new WeakMap;function a(l){const d=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",h)===!1&&l.addEventListener("dispose",h),r.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function o(){r=new WeakMap}function h(l){const d=l.target;d.removeEventListener("dispose",h),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const db={[Ed]:"LINEAR_TONE_MAPPING",[Ad]:"REINHARD_TONE_MAPPING",[Td]:"CINEON_TONE_MAPPING",[Rd]:"ACES_FILMIC_TONE_MAPPING",[Ld]:"AGX_TONE_MAPPING",[Pd]:"NEUTRAL_TONE_MAPPING",[Cd]:"CUSTOM_TONE_MAPPING"};function fb(n,e,t,i,s,r){const a=new Qn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const l=new qt;l.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new _t([0,2,0,0,2,0],2));const d=new rx({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new zt(l,d),u=new qc(-1,1,1,-1,0,1);let m=null,p=null,M=!1,g,x=null,v=[],b=!1;this.setSize=function(w,E){a.setSize(w,E),o!==null&&o.setSize(w,E),h!==null&&h.setSize(w,E);for(let y=0;y<v.length;y++){const A=v[y];A.setSize&&A.setSize(w,E)}},this.setEffects=function(w){v=w,b=v.length>0&&v[0].isRenderPass===!0;const E=a.width,y=a.height;v.length>0&&o===null&&(o=new Qn(E,y,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),h=new Qn(E,y,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){const _=v[A];_.setSize&&_.setSize(E,y)}},this.begin=function(w,E){if(M||w.toneMapping===Ai&&v.length===0)return!1;if(x=E,E!==null){const y=E.width,A=E.height;(a.width!==y||a.height!==A)&&this.setSize(y,A)}return b===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=Ai,!0},this.hasRenderPass=function(){return b},this.end=function(w,E){w.toneMapping=g,M=!0;let y=a,A=o;for(let _=0;_<v.length;_++){const S=v[_];S.enabled!==!1&&(S.render(w,A,y,E),S.needsSwap!==!1&&(y=A,A=A===o?h:o))}if(m!==w.outputColorSpace||p!==w.toneMapping){m=w.outputColorSpace,p=w.toneMapping,d.defines={},ct.getTransfer(m)===Rt&&(d.defines.SRGB_TRANSFER="");const _=db[p];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,w.setRenderTarget(x),w.render(f,u),x=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),l.dispose(),d.dispose()}}const nf=new Sn,fc=new ur(1,1),sf=new zd,rf=new N2,af=new qd,fu=[],pu=[],mu=new Float32Array(16),gu=new Float32Array(9),xu=new Float32Array(4);function br(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=fu[s];if(r===void 0&&(r=new Float32Array(s),fu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function rn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function xo(n,e){let t=pu[e];t===void 0&&(t=new Int32Array(e),pu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function gb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function xb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function Mb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;xu.set(i),n.uniformMatrix2fv(this.addr,!1,xu),an(t,i)}}function vb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;gu.set(i),n.uniformMatrix3fv(this.addr,!1,gu),an(t,i)}}function bb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(rn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(rn(t,i))return;mu.set(i),n.uniformMatrix4fv(this.addr,!1,mu),an(t,i)}}function _b(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function yb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function wb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function Sb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function Eb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ab(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function Tb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function Rb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function Cb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(fc.compareFunction=t.isReversedDepthBuffer()?Wc:Gc,r=fc):r=nf,t.setTexture2D(e||r,s)}function Lb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||rf,s)}function Pb(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||af,s)}function Db(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||sf,s)}function Ib(n){switch(n){case 5126:return pb;case 35664:return mb;case 35665:return gb;case 35666:return xb;case 35674:return Mb;case 35675:return vb;case 35676:return bb;case 5124:case 35670:return _b;case 35667:case 35671:return yb;case 35668:case 35672:return wb;case 35669:case 35673:return Sb;case 5125:return Eb;case 36294:return Ab;case 36295:return Tb;case 36296:return Rb;case 35678:case 36198:case 36298:case 36306:case 35682:return Cb;case 35679:case 36299:case 36307:return Lb;case 35680:case 36300:case 36308:case 36293:return Pb;case 36289:case 36303:case 36311:case 36292:return Db}}function Ob(n,e){n.uniform1fv(this.addr,e)}function Nb(n,e){const t=br(e,this.size,2);n.uniform2fv(this.addr,t)}function Fb(n,e){const t=br(e,this.size,3);n.uniform3fv(this.addr,t)}function Ub(n,e){const t=br(e,this.size,4);n.uniform4fv(this.addr,t)}function kb(n,e){const t=br(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Bb(n,e){const t=br(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zb(n,e){const t=br(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Hb(n,e){n.uniform1iv(this.addr,e)}function Gb(n,e){n.uniform2iv(this.addr,e)}function Wb(n,e){n.uniform3iv(this.addr,e)}function Vb(n,e){n.uniform4iv(this.addr,e)}function Yb(n,e){n.uniform1uiv(this.addr,e)}function Xb(n,e){n.uniform2uiv(this.addr,e)}function Kb(n,e){n.uniform3uiv(this.addr,e)}function qb(n,e){n.uniform4uiv(this.addr,e)}function $b(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=fc:a=nf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Zb(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||rf,r[a])}function Jb(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||af,r[a])}function Qb(n,e,t){const i=this.cache,s=e.length,r=xo(t,s);rn(i,r)||(n.uniform1iv(this.addr,r),an(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||sf,r[a])}function jb(n){switch(n){case 5126:return Ob;case 35664:return Nb;case 35665:return Fb;case 35666:return Ub;case 35674:return kb;case 35675:return Bb;case 35676:return zb;case 5124:case 35670:return Hb;case 35667:case 35671:return Gb;case 35668:case 35672:return Wb;case 35669:case 35673:return Vb;case 5125:return Yb;case 36294:return Xb;case 36295:return Kb;case 36296:return qb;case 35678:case 36198:case 36298:case 36306:case 35682:return $b;case 35679:case 36299:case 36307:return Zb;case 35680:case 36300:case 36308:case 36293:return Jb;case 36289:case 36303:case 36311:case 36292:return Qb}}class e_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ib(t.type)}}class t_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jb(t.type)}}class n_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const rl=/(\w+)(\])?(\[|\.)?/g;function Mu(n,e){n.seq.push(e),n.map[e.id]=e}function i_(n,e,t){const i=n.name,s=i.length;for(rl.lastIndex=0;;){const r=rl.exec(i),a=rl.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){Mu(t,l===void 0?new e_(o,n,e):new t_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new n_(o),Mu(t,f)),t=f}}}class Ya{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);i_(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function vu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const s_=37297;let r_=0;function a_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const bu=new Je;function o_(n){ct._getMatrix(bu,ct.workingColorSpace,n);const e=`mat3( ${bu.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case eo:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function _u(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+a_(n.getShaderSource(e),o)}else return r}function l_(n,e){const t=o_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const c_={[Ed]:"Linear",[Ad]:"Reinhard",[Td]:"Cineon",[Rd]:"ACESFilmic",[Ld]:"AgX",[Pd]:"Neutral",[Cd]:"Custom"};function h_(n,e){const t=c_[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const La=new W;function u_(){ct.getLuminanceCoefficients(La);const n=La.x.toFixed(4),e=La.y.toFixed(4),t=La.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function f_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function p_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Br(n){return n!==""}function yu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(n){return n.replace(m_,x_)}const g_=new Map;function x_(n,e){let t=it[e];if(t===void 0){const i=g_.get(e);if(i!==void 0)t=it[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return pc(t)}const M_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Su(n){return n.replace(M_,v_)}function v_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Eu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const b_={[za]:"SHADOWMAP_TYPE_PCF",[kr]:"SHADOWMAP_TYPE_VSM"};function __(n){return b_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const y_={[Ts]:"ENVMAP_TYPE_CUBE",[cr]:"ENVMAP_TYPE_CUBE",[mo]:"ENVMAP_TYPE_CUBE_UV"};function w_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":y_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const S_={[cr]:"ENVMAP_MODE_REFRACTION"};function E_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":S_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const A_={[Sd]:"ENVMAP_BLENDING_MULTIPLY",[d2]:"ENVMAP_BLENDING_MIX",[f2]:"ENVMAP_BLENDING_ADD"};function T_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":A_[n.combine]||"ENVMAP_BLENDING_NONE"}function R_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function C_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=__(t),l=w_(t),d=E_(t),f=T_(t),u=R_(t),m=d_(t),p=f_(r),M=s.createProgram();let g,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Br).join(`
`),g.length>0&&(g+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Br).join(`
`),x.length>0&&(x+=`
`)):(g=[Eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),x=[Eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?it.tonemapping_pars_fragment:"",t.toneMapping!==Ai?h_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,l_("linearToOutputTexel",t.outputColorSpace),u_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Br).join(`
`)),a=pc(a),a=yu(a,t),a=wu(a,t),o=pc(o),o=yu(o,t),o=wu(o,t),a=Su(a),o=Su(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,x=["#define varying in",t.glslVersion===Dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const b=v+g+a,w=v+x+o,E=vu(s,s.VERTEX_SHADER,b),y=vu(s,s.FRAGMENT_SHADER,w);s.attachShader(M,E),s.attachShader(M,y),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(T){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(M)||"",O=s.getShaderInfoLog(E)||"",I=s.getShaderInfoLog(y)||"",k=L.trim(),H=O.trim(),K=I.trim();let ae=!0,q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,y);else{const ie=_u(s,E,"vertex"),N=_u(s,y,"fragment");xt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+k+`
`+ie+`
`+N)}else k!==""?Ke("WebGLProgram: Program Info Log:",k):(H===""||K==="")&&(q=!1);q&&(T.diagnostics={runnable:ae,programLog:k,vertexShader:{log:H,prefix:g},fragmentShader:{log:K,prefix:x}})}s.deleteShader(E),s.deleteShader(y),_=new Ya(s,M),S=p_(s,M)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(M,s_)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=y,this}let L_=0;class P_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new D_(e),t.set(e,i)),i}}class D_{constructor(e){this.id=L_++,this.code=e,this.usedTimes=0}}function I_(n){return n===Rs||n===Qa||n===ja}function O_(n,e,t,i,s,r){const a=new Hd,o=new P_,h=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return h.add(_),_===0?"uv":`uv${_}`}function M(_,S,R,T,L,O){const I=T.fog,k=L.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?T.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ae=e.get(_.envMap||H,K),q=ae&&ae.mapping===mo?ae.image.height:null,ie=m[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ke("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const N=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ee=N!==void 0?N.length:0;let se=0;k.morphAttributes.position!==void 0&&(se=1),k.morphAttributes.normal!==void 0&&(se=2),k.morphAttributes.color!==void 0&&(se=3);let ue,xe,Le,B;if(ie){const Ut=_i[ie];ue=Ut.vertexShader,xe=Ut.fragmentShader}else{ue=_.vertexShader,xe=_.fragmentShader;const Ut=o.getVertexShaderStage(_),yt=o.getFragmentShaderStage(_);o.update(_,Ut,yt),Le=Ut.id,B=yt.id}const z=n.getRenderTarget(),F=n.state.buffers.depth.getReversed(),Z=L.isInstancedMesh===!0,j=L.isBatchedMesh===!0,ce=!!_.map,ye=!!_.matcap,be=!!ae,oe=!!_.aoMap,ge=!!_.lightMap,Me=!!_.bumpMap&&_.wireframe===!1,Ne=!!_.normalMap,Ze=!!_.displacementMap,lt=!!_.emissiveMap,gt=!!_.metalnessMap,ut=!!_.roughnessMap,Y=_.anisotropy>0,tt=_.clearcoat>0,Xe=_.dispersion>0,U=_.retroreflectivity>0,C=_.iridescence>0,G=_.sheen>0,$=_.transmission>0,te=Y&&!!_.anisotropyMap,me=tt&&!!_.clearcoatMap,ve=tt&&!!_.clearcoatNormalMap,re=tt&&!!_.clearcoatRoughnessMap,le=C&&!!_.iridescenceMap,_e=C&&!!_.iridescenceThicknessMap,ke=G&&!!_.sheenColorMap,Ae=G&&!!_.sheenRoughnessMap,we=!!_.specularMap,He=!!_.specularColorMap,Ye=!!_.specularIntensityMap,Qe=$&&!!_.transmissionMap,X=$&&!!_.thicknessMap,Se=!!_.gradientMap,he=!!_.alphaMap,Ee=_.alphaTest>0,De=!!_.alphaHash,fe=!!_.extensions;let Ge=Ai;_.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Ge=n.toneMapping);const Be={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:xe,defines:_.defines,customVertexShaderID:Le,customFragmentShaderID:B,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:j,batchingColor:j&&L._colorsTexture!==null,instancing:Z,instancingColor:Z&&L.instanceColor!==null,instancingMorph:Z&&L.morphTexture!==null,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ce,matcap:ye,envMap:be,envMapMode:be&&ae.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:ge,bumpMap:Me,normalMap:Ne,displacementMap:Ze,emissiveMap:lt,normalMapObjectSpace:Ne&&_.normalMapType===g2,normalMapTangentSpace:Ne&&_.normalMapType===Ph,packedNormalMap:Ne&&_.normalMapType===Ph&&I_(_.normalMap.format),metalnessMap:gt,roughnessMap:ut,anisotropy:Y,anisotropyMap:te,clearcoat:tt,clearcoatMap:me,clearcoatNormalMap:ve,clearcoatRoughnessMap:re,dispersion:Xe,retroreflection:U,iridescence:C,iridescenceMap:le,iridescenceThicknessMap:_e,sheen:G,sheenColorMap:ke,sheenRoughnessMap:Ae,specularMap:we,specularColorMap:He,specularIntensityMap:Ye,transmission:$,transmissionMap:Qe,thicknessMap:X,gradientMap:Se,opaque:_.transparent===!1&&_.blending===tr&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:Ee,alphaHash:De,combine:_.combine,mapUv:ce&&p(_.map.channel),aoMapUv:oe&&p(_.aoMap.channel),lightMapUv:ge&&p(_.lightMap.channel),bumpMapUv:Me&&p(_.bumpMap.channel),normalMapUv:Ne&&p(_.normalMap.channel),displacementMapUv:Ze&&p(_.displacementMap.channel),emissiveMapUv:lt&&p(_.emissiveMap.channel),metalnessMapUv:gt&&p(_.metalnessMap.channel),roughnessMapUv:ut&&p(_.roughnessMap.channel),anisotropyMapUv:te&&p(_.anisotropyMap.channel),clearcoatMapUv:me&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:ve&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&p(_.sheenRoughnessMap.channel),specularMapUv:we&&p(_.specularMap.channel),specularColorMapUv:He&&p(_.specularColorMap.channel),specularIntensityMapUv:Ye&&p(_.specularIntensityMap.channel),transmissionMapUv:Qe&&p(_.transmissionMap.channel),thicknessMapUv:X&&p(_.thicknessMap.channel),alphaMapUv:he&&p(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ne||Y),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!k.attributes.uv&&(ce||he),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&Ne===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:F,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:se,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:ce&&_.map.isVideoTexture===!0&&ct.getTransfer(_.map.colorSpace)===Rt,decodeVideoTextureEmissive:lt&&_.emissiveMap.isVideoTexture===!0&&ct.getTransfer(_.emissiveMap.colorSpace)===Rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ai,flipSided:_.side===On,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:fe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&_.extensions.multiDraw===!0||j)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Be.vertexUv1s=h.has(1),Be.vertexUv2s=h.has(2),Be.vertexUv3s=h.has(3),h.clear(),Be}function g(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const R in _.defines)S.push(R),S.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(x(S,_),v(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function x(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function v(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){const S=m[_.type];let R;if(S){const T=_i[S];R=nx.clone(T.uniforms)}else R=_.uniforms;return R}function w(_,S){let R=d.get(S);return R!==void 0?++R.usedTimes:(R=new C_(n,S,_,s),l.push(R),d.set(S,R)),R}function E(_){if(--_.usedTimes===0){const S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:b,acquireProgram:w,releaseProgram:E,releaseShaderCache:y,programs:l,dispose:A}}function N_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function F_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Au(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Tu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,p,M,g,x){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:m,material:p,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:g,group:x},n[e]=v):(v.id=u.id,v.object=u,v.geometry=m,v.material=p,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=g,v.group=x),e++,v}function h(u,m,p,M,g,x,v){v.reversedDepth===!0&&(g=-g);const b=o(u,m,p,M,g,x);p.transmission>0?i.push(b):p.transparent===!0?s.push(b):t.push(b)}function l(u,m,p,M,g,x){const v=o(u,m,p,M,g,x);p.transmission>0?i.unshift(v):p.transparent===!0?s.unshift(v):t.unshift(v)}function d(u,m){t.length>1&&t.sort(u||F_),i.length>1&&i.sort(m||Au),s.length>1&&s.sort(m||Au)}function f(){for(let u=e,m=n.length;u<m;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:l,finish:f,sort:d}}function U_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Tu,n.set(i,[a])):s>=r.length?(a=new Tu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function k_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new st};break;case"SpotLight":t={position:new W,direction:new W,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function B_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let z_=0;function H_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function G_(n){const e=new k_,t=B_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const s=new W,r=new It,a=new It;function o(l){let d=0,f=0,u=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let m=0,p=0,M=0,g=0,x=0,v=0,b=0,w=0,E=0,y=0,A=0,_=0,S=0,R=0;l.sort(H_);for(let L=0,O=l.length;L<O;L++){const I=l[L],k=I.color,H=I.intensity,K=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Rs?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*H,f+=k.g*H,u+=k.b*H;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],H);R++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,N=t.get(I);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),i.sunShadow[p]=N,i.sunShadowMap[p]=ae;const ee=ie.getViewportCount();for(let se=0;se<ee;se++)i.sunShadowMatrix[M+se]=ie.getMatrix(se),i.sunShadowCascade[M+se]=ie._cascadeData[se];M+=ee,p++}i.sun[m]=q,m++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,N=t.get(I);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,i.directionalShadow[g]=N,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=I.shadow.matrix,E++}i.directional[g]=q,g++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(k).multiplyScalar(H),q.distance=K,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[v]=q;const ie=I.shadow;if(I.map&&(i.spotLightMap[_]=I.map,_++,ie.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[v]=ie.matrix,I.castShadow){const N=t.get(I);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,i.spotShadow[v]=N,i.spotShadowMap[v]=ae,A++}v++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(k).multiplyScalar(H),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[b]=q,b++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const ie=I.shadow,N=t.get(I);N.shadowIntensity=ie.intensity,N.shadowBias=ie.bias,N.shadowNormalBias=ie.normalBias,N.shadowRadius=ie.radius,N.shadowMapSize=ie.mapSize,N.shadowCameraNear=ie.camera.near,N.shadowCameraFar=ie.camera.far,i.pointShadow[x]=N,i.pointShadowMap[x]=ae,i.pointShadowMatrix[x]=I.shadow.matrix,y++}i.point[x]=q,x++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(H),q.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[w]=q,w++}}b>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const T=i.hash;(T.sunLength!==m||T.directionalLength!==g||T.pointLength!==x||T.spotLength!==v||T.rectAreaLength!==b||T.hemiLength!==w||T.numSunShadows!==p||T.numDirectionalShadows!==E||T.numPointShadows!==y||T.numSpotShadows!==A||T.numSpotMaps!==_||T.numLightProbes!==R)&&(i.sun.length=m,i.directional.length=g,i.spot.length=v,i.rectArea.length=b,i.point.length=x,i.hemi.length=w,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=y,i.pointShadowMap.length=y,i.pointShadowMatrix.length=y,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-S,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=R,T.sunLength=m,T.directionalLength=g,T.pointLength=x,T.spotLength=v,T.rectAreaLength=b,T.hemiLength=w,T.numSunShadows=p,T.numDirectionalShadows=E,T.numPointShadows=y,T.numSpotShadows=A,T.numSpotMaps=_,T.numLightProbes=R,i.version=z_++)}function h(l,d){let f=0,u=0,m=0,p=0,M=0,g=0;const x=d.matrixWorldInverse;for(let v=0,b=l.length;v<b;v++){const w=l[v];if(w.isSunLight){const E=i.sun[f];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(x),f++}else if(w.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),u++}else if(w.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(x),p++}else if(w.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),a.identity(),r.copy(w.matrixWorld),r.premultiply(x),a.extractRotation(r),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(w.isPointLight){const E=i.point[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(x),m++}else if(w.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(x),g++}}}return{setup:o,setupView:h,state:i}}function Ru(n){const e=new G_(n),t=[],i=[],s=[];function r(u){f.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function W_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Ru(n),e.set(s,[o])):r>=a.length?(o=new Ru(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const V_=`void main() {
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
}`,X_=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],K_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Cu=new It,Or=new W,al=new W;function q_(n,e,t){let i=new io;const s=new $e,r=new $e,a=new ot,o=new ax,h=new ox,l={},d=t.maxTextureSize,f={[As]:On,[On]:As,[ai]:ai},u=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:V_,fragmentShader:Y_}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const p=new qt;p.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new zt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=za;let x=this.type;this.render=function(y,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;this.type===Z1&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=za);const S=n.getRenderTarget(),R=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Ei),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=x!==this.type;O&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=y.length;I<k;I++){const H=y[I],K=H.shadow;if(K===void 0){Ke("WebGLShadowMap:",H,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ae=K.getFrameExtents();s.multiply(ae),r.copy(K.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ae.x),s.x=r.x*ae.x,K.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ae.y),s.y=r.y*ae.y,K.mapSize.y=r.y));const q=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=q,K.map===null||O===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===kr){if(H.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Qn(s.x,s.y,{format:Rs,type:Ri,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),K.map.texture.name=H.name+".shadowMap",K.map.depthTexture=new ur(s.x,s.y,ci),K.map.depthTexture.name=H.name+".shadowMapDepth",K.map.depthTexture.format=Gi,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt}else H.isPointLight?(K.map=new tf(s.x),K.map.depthTexture=new ex(s.x,Ti)):(K.map=new Qn(s.x,s.y),K.map.depthTexture=new ur(s.x,s.y,Ti)),K.map.depthTexture.name=H.name+".shadowMap",K.map.depthTexture.format=Gi,this.type===za?(K.map.depthTexture.compareFunction=q?Wc:Gc,K.map.depthTexture.minFilter=Kt,K.map.depthTexture.magFilter=Kt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);const ie=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();H.isPointLight!==!0&&K.updateMatrices(H,_);for(let N=0;N<ie;N++){const ee=K.getCamera(N);if(H.isPointLight){const se=K.camera,ue=K.matrix,xe=H.distance||se.far;xe!==se.far&&(se.far=xe,se.updateProjectionMatrix()),Or.setFromMatrixPosition(H.matrixWorld),se.position.copy(Or),al.copy(se.position),al.add(X_[N]),se.up.copy(K_[N]),se.lookAt(al),se.updateMatrixWorld(),ue.makeTranslation(-Or.x,-Or.y,-Or.z),Cu.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),K._frustum.setFromProjectionMatrix(Cu,se.coordinateSystem,se.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,N),n.clear();else{N===0&&(n.setRenderTarget(K.map),n.clear());const se=K.getViewport(N);a.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),L.viewport(a)}i=K.getFrustum(N),w(A,_,ee,H,this.type)}K.isPointLightShadow!==!0&&this.type===kr&&v(K,_),K.needsUpdate=!1}x=this.type,g.needsUpdate=!1,n.setRenderTarget(S,R,T)};function v(y,A){const _=e.update(M);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null?y.mapPass=new Qn(s.x,s.y,{format:Rs,type:Ri}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value.set(y.map.width,y.map.height),u.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,M,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value.set(y.map.width,y.map.height),m.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(A,null,_,m,M,null)}function b(y,A,_,S){let R=null;const T=_.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(T!==void 0)R=T;else if(R=_.isPointLight===!0?h:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=R.uuid,O=A.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let k=I[O];k===void 0&&(k=R.clone(),I[O]=k,A.addEventListener("dispose",E)),R=k}if(R.visible=A.visible,R.wireframe=A.wireframe,S===kr?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:f[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const L=n.properties.get(R);L.light=_}return R}function w(y,A,_,S,R){if(y.visible===!1)return;if(y.layers.test(A.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&R===kr)&&(!y.frustumCulled||y.intersectsFrustum(i))){y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,y.matrixWorld);const O=e.update(y),I=y.material;if(Array.isArray(I)){const k=O.groups;for(let H=0,K=k.length;H<K;H++){const ae=k[H],q=I[ae.materialIndex];if(q&&q.visible){const ie=b(y,q,S,R);y.onBeforeShadow(n,y,A,_,O,ie,ae),n.renderBufferDirect(_,null,O,ie,y,ae),y.onAfterShadow(n,y,A,_,O,ie,ae)}}}else if(I.visible){const k=b(y,I,S,R);y.onBeforeShadow(n,y,A,_,O,k,null),n.renderBufferDirect(_,null,O,k,y,null),y.onAfterShadow(n,y,A,_,O,k,null)}}const L=y.children;for(let O=0,I=L.length;O<I;O++)w(L[O],A,_,S,R)}function E(y){y.target.removeEventListener("dispose",E);for(const _ in l){const S=l[_],R=y.target.uuid;R in S&&(S[R].dispose(),delete S[R])}}}function $_(n,e){function t(){let X=!1;const Se=new ot;let he=null;const Ee=new ot(0,0,0,0);return{setMask:function(De){he!==De&&!X&&(n.colorMask(De,De,De,De),he=De)},setLocked:function(De){X=De},setClear:function(De,fe,Ge,Be,Ut){Ut===!0&&(De*=Be,fe*=Be,Ge*=Be),Se.set(De,fe,Ge,Be),Ee.equals(Se)===!1&&(n.clearColor(De,fe,Ge,Be),Ee.copy(Se))},reset:function(){X=!1,he=null,Ee.set(-1,0,0,0)}}}function i(){let X=!1,Se=!1,he=null,Ee=null,De=null;return{setReversed:function(fe){if(Se!==fe){const Ge=e.get("EXT_clip_control");fe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Se=fe;const Be=De;De=null,this.setClear(Be)}},getReversed:function(){return Se},setTest:function(fe){fe?z(n.DEPTH_TEST):F(n.DEPTH_TEST)},setMask:function(fe){he!==fe&&!X&&(n.depthMask(fe),he=fe)},setFunc:function(fe){if(Se&&(fe=R2[fe]),Ee!==fe){switch(fe){case Tl:n.depthFunc(n.NEVER);break;case Rl:n.depthFunc(n.ALWAYS);break;case Cl:n.depthFunc(n.LESS);break;case Gr:n.depthFunc(n.LEQUAL);break;case Ll:n.depthFunc(n.EQUAL);break;case Pl:n.depthFunc(n.GEQUAL);break;case Za:n.depthFunc(n.GREATER);break;case Dl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=fe}},setLocked:function(fe){X=fe},setClear:function(fe){De!==fe&&(De=fe,Se&&(fe=1-fe),n.clearDepth(fe))},reset:function(){X=!1,he=null,Ee=null,De=null,Se=!1}}}function s(){let X=!1,Se=null,he=null,Ee=null,De=null,fe=null,Ge=null,Be=null,Ut=null;return{setTest:function(yt){X||(yt?z(n.STENCIL_TEST):F(n.STENCIL_TEST))},setMask:function(yt){Se!==yt&&!X&&(n.stencilMask(yt),Se=yt)},setFunc:function(yt,ti,pi){(he!==yt||Ee!==ti||De!==pi)&&(n.stencilFunc(yt,ti,pi),he=yt,Ee=ti,De=pi)},setOp:function(yt,ti,pi){(fe!==yt||Ge!==ti||Be!==pi)&&(n.stencilOp(yt,ti,pi),fe=yt,Ge=ti,Be=pi)},setLocked:function(yt){X=yt},setClear:function(yt){Ut!==yt&&(n.clearStencil(yt),Ut=yt)},reset:function(){X=!1,Se=null,he=null,Ee=null,De=null,fe=null,Ge=null,Be=null,Ut=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,l=new WeakMap;let d={},f={},u={},m=new WeakMap,p=[],M=null,g=!1,x=null,v=null,b=null,w=null,E=null,y=null,A=null,_=new st(0,0,0),S=0,R=!1,T=null,L=null,O=null,I=null,k=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=ae>=2);let ie=null,N={};const ee=n.getParameter(n.SCISSOR_BOX),se=n.getParameter(n.VIEWPORT),ue=new ot().fromArray(ee),xe=new ot().fromArray(se);function Le(X,Se,he,Ee){const De=new Uint8Array(4),fe=n.createTexture();n.bindTexture(X,fe),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ge=0;Ge<he;Ge++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Se,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Se+Ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return fe}const B={};B[n.TEXTURE_2D]=Le(n.TEXTURE_2D,n.TEXTURE_2D,1),B[n.TEXTURE_CUBE_MAP]=Le(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[n.TEXTURE_2D_ARRAY]=Le(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),B[n.TEXTURE_3D]=Le(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),z(n.DEPTH_TEST),a.setFunc(Gr),Me(!1),Ne(Rh),z(n.CULL_FACE),oe(Ei);function z(X){d[X]!==!0&&(n.enable(X),d[X]=!0)}function F(X){d[X]!==!1&&(n.disable(X),d[X]=!1)}function Z(X,Se){return u[X]!==Se?(n.bindFramebuffer(X,Se),u[X]=Se,X===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Se),X===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Se),!0):!1}function j(X,Se){let he=p,Ee=!1;if(X){he=m.get(Se),he===void 0&&(he=[],m.set(Se,he));const De=X.textures;if(he.length!==De.length||he[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Ge=De.length;fe<Ge;fe++)he[fe]=n.COLOR_ATTACHMENT0+fe;he.length=De.length,Ee=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(he)}function ce(X){return M!==X?(n.useProgram(X),M=X,!0):!1}const ye={[Js]:n.FUNC_ADD,[J1]:n.FUNC_SUBTRACT,[Q1]:n.FUNC_REVERSE_SUBTRACT};ye[j1]=n.MIN,ye[e2]=n.MAX;const be={[Pc]:n.ZERO,[t2]:n.ONE,[Dc]:n.SRC_COLOR,[Ic]:n.SRC_ALPHA,[o2]:n.SRC_ALPHA_SATURATE,[r2]:n.DST_COLOR,[i2]:n.DST_ALPHA,[n2]:n.ONE_MINUS_SRC_COLOR,[Oc]:n.ONE_MINUS_SRC_ALPHA,[a2]:n.ONE_MINUS_DST_COLOR,[s2]:n.ONE_MINUS_DST_ALPHA,[l2]:n.CONSTANT_COLOR,[c2]:n.ONE_MINUS_CONSTANT_COLOR,[h2]:n.CONSTANT_ALPHA,[u2]:n.ONE_MINUS_CONSTANT_ALPHA};function oe(X,Se,he,Ee,De,fe,Ge,Be,Ut,yt){if(X===Ei){g===!0&&(F(n.BLEND),g=!1);return}if(g===!1&&(z(n.BLEND),g=!0),X!==po){if(X!==x||yt!==R){if((v!==Js||E!==Js)&&(n.blendEquation(n.FUNC_ADD),v=Js,E=Js),yt)switch(X){case tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hi:n.blendFunc(n.ONE,n.ONE);break;case Ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Lh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:xt("WebGLState: Invalid blending: ",X);break}else switch(X){case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ch:xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lh:xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:xt("WebGLState: Invalid blending: ",X);break}b=null,w=null,y=null,A=null,_.set(0,0,0),S=0,x=X,R=yt}return}De=De||Se,fe=fe||he,Ge=Ge||Ee,(Se!==v||De!==E)&&(n.blendEquationSeparate(ye[Se],ye[De]),v=Se,E=De),(he!==b||Ee!==w||fe!==y||Ge!==A)&&(n.blendFuncSeparate(be[he],be[Ee],be[fe],be[Ge]),b=he,w=Ee,y=fe,A=Ge),(Be.equals(_)===!1||Ut!==S)&&(n.blendColor(Be.r,Be.g,Be.b,Ut),_.copy(Be),S=Ut),x=X,R=!1}function ge(X,Se){X.side===ai?F(n.CULL_FACE):z(n.CULL_FACE);let he=X.side===On;Se&&(he=!he),Me(he),X.blending===tr&&X.transparent===!1?oe(Ei):oe(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ee=X.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),lt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):F(n.SAMPLE_ALPHA_TO_COVERAGE)}function Me(X){T!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),T=X)}function Ne(X){X!==q1?(z(n.CULL_FACE),X!==L&&(X===Rh?n.cullFace(n.BACK):X===$1?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):F(n.CULL_FACE),L=X}function Ze(X){X!==O&&(K&&n.lineWidth(X),O=X)}function lt(X,Se,he){X?(z(n.POLYGON_OFFSET_FILL),(I!==Se||k!==he)&&(I=Se,k=he,a.getReversed()&&(Se=-Se),n.polygonOffset(Se,he))):F(n.POLYGON_OFFSET_FILL)}function gt(X){X?z(n.SCISSOR_TEST):F(n.SCISSOR_TEST)}function ut(X){X===void 0&&(X=n.TEXTURE0+H-1),ie!==X&&(n.activeTexture(X),ie=X)}function Y(X,Se,he){he===void 0&&(ie===null?he=n.TEXTURE0+H-1:he=ie);let Ee=N[he];Ee===void 0&&(Ee={type:void 0,texture:void 0},N[he]=Ee),(Ee.type!==X||Ee.texture!==Se)&&(ie!==he&&(n.activeTexture(he),ie=he),n.bindTexture(X,Se||B[X]),Ee.type=X,Ee.texture=Se)}function tt(){const X=N[ie];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Xe(){try{n.compressedTexImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function C(){try{n.texSubImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function G(){try{n.texSubImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function me(){try{n.texStorage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function ve(){try{n.texStorage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function re(){try{n.texImage2D(...arguments)}catch(X){xt("WebGLState:",X)}}function le(){try{n.texImage3D(...arguments)}catch(X){xt("WebGLState:",X)}}function _e(X){return f[X]!==void 0?f[X]:n.getParameter(X)}function ke(X,Se){f[X]!==Se&&(n.pixelStorei(X,Se),f[X]=Se)}function Ae(X){ue.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),ue.copy(X))}function we(X){xe.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),xe.copy(X))}function He(X,Se){let he=l.get(Se);he===void 0&&(he=new WeakMap,l.set(Se,he));let Ee=he.get(X);Ee===void 0&&(Ee=n.getUniformBlockIndex(Se,X.name),he.set(X,Ee))}function Ye(X,Se){const Ee=l.get(Se).get(X);h.get(Se)!==Ee&&(n.uniformBlockBinding(Se,Ee,X.__bindingPointIndex),h.set(Se,Ee))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ie=null,N={},u={},m=new WeakMap,p=[],M=null,g=!1,x=null,v=null,b=null,w=null,E=null,y=null,A=null,_=new st(0,0,0),S=0,R=!1,T=null,L=null,O=null,I=null,k=null,ue.set(0,0,n.canvas.width,n.canvas.height),xe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:z,disable:F,bindFramebuffer:Z,drawBuffers:j,useProgram:ce,setBlending:oe,setMaterial:ge,setFlipSided:Me,setCullFace:Ne,setLineWidth:Ze,setPolygonOffset:lt,setScissorTest:gt,activeTexture:ut,bindTexture:Y,unbindTexture:tt,compressedTexImage2D:Xe,compressedTexImage3D:U,texImage2D:re,texImage3D:le,pixelStorei:ke,getParameter:_e,updateUBOMapping:He,uniformBlockBinding:Ye,texStorage2D:me,texStorage3D:ve,texSubImage2D:C,texSubImage3D:G,compressedTexSubImage2D:$,compressedTexSubImage3D:te,scissor:Ae,viewport:we,reset:Qe}}function Z_(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $e,d=new WeakMap,f=new Set;let u;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(U,C){return p?new OffscreenCanvas(U,C):no("canvas")}function g(U,C,G){let $=1;const te=Xe(U);if((te.width>G||te.height>G)&&($=G/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const me=Math.floor($*te.width),ve=Math.floor($*te.height);u===void 0&&(u=M(me,ve));const re=C?M(me,ve):u;return re.width=me,re.height=ve,re.getContext("2d").drawImage(U,0,0,me,ve),Ke("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+me+"x"+ve+")."),re}else return"data"in U&&Ke("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),U;return U}function x(U){return U.generateMipmaps}function v(U){n.generateMipmap(U)}function b(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(U,C,G,$,te,me=!1){if(U!==null){if(n[U]!==void 0)return n[U];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ve;$&&(ve=e.get("EXT_texture_norm16"),ve||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=C;if(C===n.RED&&(G===n.FLOAT&&(re=n.R32F),G===n.HALF_FLOAT&&(re=n.R16F),G===n.UNSIGNED_BYTE&&(re=n.R8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.R16_EXT),G===n.SHORT&&ve&&(re=ve.R16_SNORM_EXT)),C===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.R8UI),G===n.UNSIGNED_SHORT&&(re=n.R16UI),G===n.UNSIGNED_INT&&(re=n.R32UI),G===n.BYTE&&(re=n.R8I),G===n.SHORT&&(re=n.R16I),G===n.INT&&(re=n.R32I)),C===n.RG&&(G===n.FLOAT&&(re=n.RG32F),G===n.HALF_FLOAT&&(re=n.RG16F),G===n.UNSIGNED_BYTE&&(re=n.RG8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.RG16_EXT),G===n.SHORT&&ve&&(re=ve.RG16_SNORM_EXT)),C===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RG8UI),G===n.UNSIGNED_SHORT&&(re=n.RG16UI),G===n.UNSIGNED_INT&&(re=n.RG32UI),G===n.BYTE&&(re=n.RG8I),G===n.SHORT&&(re=n.RG16I),G===n.INT&&(re=n.RG32I)),C===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RGB8UI),G===n.UNSIGNED_SHORT&&(re=n.RGB16UI),G===n.UNSIGNED_INT&&(re=n.RGB32UI),G===n.BYTE&&(re=n.RGB8I),G===n.SHORT&&(re=n.RGB16I),G===n.INT&&(re=n.RGB32I)),C===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(re=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(re=n.RGBA16UI),G===n.UNSIGNED_INT&&(re=n.RGBA32UI),G===n.BYTE&&(re=n.RGBA8I),G===n.SHORT&&(re=n.RGBA16I),G===n.INT&&(re=n.RGBA32I)),C===n.RGB&&(G===n.UNSIGNED_SHORT&&ve&&(re=ve.RGB16_EXT),G===n.SHORT&&ve&&(re=ve.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(re=n.R11F_G11F_B10F)),C===n.RGBA){const le=me?eo:ct.getTransfer(te);G===n.FLOAT&&(re=n.RGBA32F),G===n.HALF_FLOAT&&(re=n.RGBA16F),G===n.UNSIGNED_BYTE&&(re=le===Rt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&ve&&(re=ve.RGBA16_EXT),G===n.SHORT&&ve&&(re=ve.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function E(U,C){let G;return U?C===null||C===Ti||C===Vr?G=n.DEPTH24_STENCIL8:C===ci?G=n.DEPTH32F_STENCIL8:C===Wr&&(G=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ti||C===Vr?G=n.DEPTH_COMPONENT24:C===ci?G=n.DEPTH_COMPONENT32F:C===Wr&&(G=n.DEPTH_COMPONENT16),G}function y(U,C){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Wt&&U.minFilter!==Kt?Math.log2(Math.max(C.width,C.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?C.mipmaps.length:1}function A(U){const C=U.target;C.removeEventListener("dispose",A),S(C),C.isVideoTexture&&d.delete(C),C.isHTMLTexture&&f.delete(C)}function _(U){const C=U.target;C.removeEventListener("dispose",_),T(C)}function S(U){const C=i.get(U);if(C.__webglInit===void 0)return;const G=U.source,$=m.get(G);if($){const te=$[C.__cacheKey];te.usedTimes--,te.usedTimes===0&&R(U),Object.keys($).length===0&&m.delete(G)}i.remove(U)}function R(U){const C=i.get(U);n.deleteTexture(C.__webglTexture);const G=U.source,$=m.get(G);delete $[C.__cacheKey],a.memory.textures--}function T(U){const C=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(C.__webglFramebuffer[$]))for(let te=0;te<C.__webglFramebuffer[$].length;te++)n.deleteFramebuffer(C.__webglFramebuffer[$][te]);else n.deleteFramebuffer(C.__webglFramebuffer[$]);C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer[$])}else{if(Array.isArray(C.__webglFramebuffer))for(let $=0;$<C.__webglFramebuffer.length;$++)n.deleteFramebuffer(C.__webglFramebuffer[$]);else n.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&n.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let $=0;$<C.__webglColorRenderbuffer.length;$++)C.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(C.__webglColorRenderbuffer[$]);C.__webglDepthRenderbuffer&&n.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const G=U.textures;for(let $=0,te=G.length;$<te;$++){const me=i.get(G[$]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(G[$])}i.remove(U)}let L=0;function O(){L=0}function I(){return L}function k(U){L=U}function H(){const U=L;return U>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,U}function K(U){const C=[];return C.push(U.wrapS),C.push(U.wrapT),C.push(U.wrapR||0),C.push(U.magFilter),C.push(U.minFilter),C.push(U.anisotropy),C.push(U.internalFormat),C.push(U.format),C.push(U.type),C.push(U.generateMipmaps),C.push(U.premultiplyAlpha),C.push(U.flipY),C.push(U.unpackAlignment),C.push(U.colorSpace),C.join()}function ae(U,C){const G=i.get(U);if(U.isVideoTexture&&Y(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&G.__version!==U.version){const $=U.image;if($===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{F(G,U,C);return}}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+C)}function q(U,C){const G=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){F(G,U,C);return}else U.isExternalTexture&&(G.__webglTexture=U.sourceTexture?U.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+C)}function ie(U,C){const G=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&G.__version!==U.version){F(G,U,C);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+C)}function N(U,C){const G=i.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&G.__version!==U.version){Z(G,U,C);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+C)}const ee={[Ja]:n.REPEAT,[Ui]:n.CLAMP_TO_EDGE,[Il]:n.MIRRORED_REPEAT},se={[Wt]:n.NEAREST,[p2]:n.NEAREST_MIPMAP_NEAREST,[sa]:n.NEAREST_MIPMAP_LINEAR,[Kt]:n.LINEAR,[Lo]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ue={[M2]:n.NEVER,[w2]:n.ALWAYS,[v2]:n.LESS,[Gc]:n.LEQUAL,[b2]:n.EQUAL,[Wc]:n.GEQUAL,[_2]:n.GREATER,[y2]:n.NOTEQUAL};function xe(U,C){if(C.type===ci&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===Kt||C.magFilter===Lo||C.magFilter===sa||C.magFilter===bs||C.minFilter===Kt||C.minFilter===Lo||C.minFilter===sa||C.minFilter===bs)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,ee[C.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,ee[C.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,ee[C.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,se[C.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,se[C.minFilter]),C.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ue[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Wt||C.minFilter!==sa&&C.minFilter!==bs||C.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||i.get(C).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(U,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy}}}function Le(U,C){let G=!1;U.__webglInit===void 0&&(U.__webglInit=!0,C.addEventListener("dispose",A));const $=C.source;let te=m.get($);te===void 0&&(te={},m.set($,te));const me=K(C);if(me!==U.__cacheKey){te[me]===void 0&&(te[me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[me].usedTimes++;const ve=te[U.__cacheKey];ve!==void 0&&(te[U.__cacheKey].usedTimes--,ve.usedTimes===0&&R(C)),U.__cacheKey=me,U.__webglTexture=te[me].texture}return G}function B(U,C,G){return Math.floor(Math.floor(U/G)/C)}function z(U,C,G,$){const me=U.updateRanges;if(me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,C.width,C.height,G,$,C.data);else{me.sort((ke,Ae)=>ke.start-Ae.start);let ve=0;for(let ke=1;ke<me.length;ke++){const Ae=me[ve],we=me[ke],He=Ae.start+Ae.count,Ye=B(we.start,C.width,4),Qe=B(Ae.start,C.width,4);we.start<=He+1&&Ye===Qe&&B(we.start+we.count-1,C.width,4)===Ye?Ae.count=Math.max(Ae.count,we.start+we.count-Ae.start):(++ve,me[ve]=we)}me.length=ve+1;const re=t.getParameter(n.UNPACK_ROW_LENGTH),le=t.getParameter(n.UNPACK_SKIP_PIXELS),_e=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,C.width);for(let ke=0,Ae=me.length;ke<Ae;ke++){const we=me[ke],He=Math.floor(we.start/4),Ye=Math.ceil(we.count/4),Qe=He%C.width,X=Math.floor(He/C.width),Se=Ye,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,Qe,X,Se,he,G,$,C.data)}U.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,le),t.pixelStorei(n.UNPACK_SKIP_ROWS,_e)}}function F(U,C,G){let $=n.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),C.isData3DTexture&&($=n.TEXTURE_3D);const te=Le(U,C),me=C.source;t.bindTexture($,U.__webglTexture,n.TEXTURE0+G);const ve=i.get(me);if(me.version!==ve.__version||te===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const he=ct.getPrimaries(ct.workingColorSpace),Ee=C.colorSpace===Hn?null:ct.getPrimaries(C.colorSpace),De=C.colorSpace===Hn||he===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment);let le=g(C.image,!1,s.maxTextureSize);le=tt(C,le);const _e=r.convert(C.format,C.colorSpace),ke=r.convert(C.type);let Ae=w(C.internalFormat,_e,ke,C.normalized,C.colorSpace,C.isVideoTexture);xe($,C);let we;const He=C.mipmaps,Ye=C.isVideoTexture!==!0,Qe=ve.__version===void 0||te===!0,X=me.dataReady,Se=y(C,le);if(C.isDepthTexture)Ae=E(C.format===_s,C.type),Qe&&(Ye?t.texStorage2D(n.TEXTURE_2D,1,Ae,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Ae,le.width,le.height,0,_e,ke,null));else if(C.isDataTexture)if(He.length>0){Ye&&Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,He[0].width,He[0].height);for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,_e,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,_e,ke,we.data);C.generateMipmaps=!1}else Ye?(Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,le.width,le.height),X&&z(C,le,_e,ke)):t.texImage2D(n.TEXTURE_2D,0,Ae,le.width,le.height,0,_e,ke,le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Ye&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,He[0].width,He[0].height,le.depth);for(let he=0,Ee=He.length;he<Ee;he++)if(we=He[he],C.format!==Gn)if(_e!==null)if(Ye){if(X)if(C.layerUpdates.size>0){const De=ou(we.width,we.height,C.format,C.type);for(const fe of C.layerUpdates){const Ge=we.data.subarray(fe*De/we.data.BYTES_PER_ELEMENT,(fe+1)*De/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,fe,we.width,we.height,1,_e,Ge)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,_e,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ae,we.width,we.height,le.depth,0,we.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,le.depth,_e,ke,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ae,we.width,we.height,le.depth,0,_e,ke,we.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{Ye&&Qe&&t.texStorage2D(n.TEXTURE_2D,Se,Ae,He[0].width,He[0].height);for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],C.format!==Gn?_e!==null?Ye?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,_e,we.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,we.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,_e,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ae,we.width,we.height,0,_e,ke,we.data)}else if(C.isDataArrayTexture)if(Ye){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ae,le.width,le.height,le.depth),X)if(C.layerUpdates.size>0){const he=ou(le.width,le.height,C.format,C.type);for(const Ee of C.layerUpdates){const De=le.data.subarray(Ee*he/le.data.BYTES_PER_ELEMENT,(Ee+1)*he/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,le.width,le.height,1,_e,ke,De)}C.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,_e,ke,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,le.width,le.height,le.depth,0,_e,ke,le.data);else if(C.isData3DTexture)Ye?(Qe&&t.texStorage3D(n.TEXTURE_3D,Se,Ae,le.width,le.height,le.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,_e,ke,le.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,le.width,le.height,le.depth,0,_e,ke,le.data);else if(C.isFramebufferTexture){if(Qe)if(Ye)t.texStorage2D(n.TEXTURE_2D,Se,Ae,le.width,le.height);else{let he=le.width,Ee=le.height;for(let De=0;De<Se;De++)t.texImage2D(n.TEXTURE_2D,De,Ae,he,Ee,0,_e,ke,null),he>>=1,Ee>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),le.parentNode!==he){he.appendChild(le),f.add(C),he.onpaint=Ee=>{const De=Ee.changedElements;for(const fe of f)De.includes(fe.image)&&(fe.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,le);else{const De=n.RGBA,fe=n.RGBA,Ge=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,fe,Ge,le)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(He.length>0){if(Ye&&Qe){const he=Xe(He[0]);t.texStorage2D(n.TEXTURE_2D,Se,Ae,he.width,he.height)}for(let he=0,Ee=He.length;he<Ee;he++)we=He[he],Ye?X&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,_e,ke,we):t.texImage2D(n.TEXTURE_2D,he,Ae,_e,ke,we);C.generateMipmaps=!1}else if(Ye){if(Qe){const he=Xe(le);t.texStorage2D(n.TEXTURE_2D,Se,Ae,he.width,he.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,ke,le)}else t.texImage2D(n.TEXTURE_2D,0,Ae,_e,ke,le);x(C)&&v($),ve.__version=me.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function Z(U,C,G){if(C.image.length!==6)return;const $=Le(U,C),te=C.source;t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+G);const me=i.get(te);if(te.version!==me.__version||$===!0){t.activeTexture(n.TEXTURE0+G);const ve=ct.getPrimaries(ct.workingColorSpace),re=C.colorSpace===Hn?null:ct.getPrimaries(C.colorSpace),le=C.colorSpace===Hn||ve===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const _e=C.isCompressedTexture||C.image[0].isCompressedTexture,ke=C.image[0]&&C.image[0].isDataTexture,Ae=[];for(let fe=0;fe<6;fe++)!_e&&!ke?Ae[fe]=g(C.image[fe],!0,s.maxCubemapSize):Ae[fe]=ke?C.image[fe].image:C.image[fe],Ae[fe]=tt(C,Ae[fe]);const we=Ae[0],He=r.convert(C.format,C.colorSpace),Ye=r.convert(C.type),Qe=w(C.internalFormat,He,Ye,C.normalized,C.colorSpace),X=C.isVideoTexture!==!0,Se=me.__version===void 0||$===!0,he=te.dataReady;let Ee=y(C,we);xe(n.TEXTURE_CUBE_MAP,C);let De;if(_e){X&&Se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Qe,we.width,we.height);for(let fe=0;fe<6;fe++){De=Ae[fe].mipmaps;for(let Ge=0;Ge<De.length;Ge++){const Be=De[Ge];C.format!==Gn?He!==null?X?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,0,0,Be.width,Be.height,He,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,Qe,Be.width,Be.height,0,Be.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,0,0,Be.width,Be.height,He,Ye,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge,Qe,Be.width,Be.height,0,He,Ye,Be.data)}}}else{if(De=C.mipmaps,X&&Se){De.length>0&&Ee++;const fe=Xe(Ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Qe,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ke){X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ae[fe].width,Ae[fe].height,He,Ye,Ae[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Qe,Ae[fe].width,Ae[fe].height,0,He,Ye,Ae[fe].data);for(let Ge=0;Ge<De.length;Ge++){const Ut=De[Ge].image[fe].image;X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,0,0,Ut.width,Ut.height,He,Ye,Ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,Qe,Ut.width,Ut.height,0,He,Ye,Ut.data)}}else{X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,He,Ye,Ae[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Qe,He,Ye,Ae[fe]);for(let Ge=0;Ge<De.length;Ge++){const Be=De[Ge];X?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,0,0,He,Ye,Be.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ge+1,Qe,He,Ye,Be.image[fe])}}}x(C)&&v(n.TEXTURE_CUBE_MAP),me.__version=te.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function j(U,C,G,$,te,me){const ve=r.convert(G.format,G.colorSpace),re=r.convert(G.type),le=w(G.internalFormat,ve,re,G.normalized,G.colorSpace),_e=i.get(C),ke=i.get(G);if(ke.__renderTarget=C,!_e.__hasExternalTextures){const Ae=Math.max(1,C.width>>me),we=Math.max(1,C.height>>me);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,me,le,Ae,we,C.depth,0,ve,re,null):t.texImage2D(te,me,le,Ae,we,0,ve,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,U),ut(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,te,ke.__webglTexture,0,gt(C)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,te,ke.__webglTexture,me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(U,C,G){if(n.bindRenderbuffer(n.RENDERBUFFER,U),C.depthBuffer){const $=C.depthTexture,te=$&&$.isDepthTexture?$.type:null,me=E(C.stencilBuffer,te),ve=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ut(C)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(C),me,C.width,C.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(C),me,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,me,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,U)}else{const $=C.textures;for(let te=0;te<$.length;te++){const me=$[te],ve=r.convert(me.format,me.colorSpace),re=r.convert(me.type),le=w(me.internalFormat,ve,re,me.normalized,me.colorSpace);ut(C)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(C),le,C.width,C.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(C),le,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,le,C.width,C.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(U,C,G){const $=C.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,U),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(C.depthTexture);if(te.__renderTarget=C,(!te.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),$){if(te.__webglInit===void 0&&(te.__webglInit=!0,C.depthTexture.addEventListener("dispose",A)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),xe(n.TEXTURE_CUBE_MAP,C.depthTexture);const _e=r.convert(C.depthTexture.format),ke=r.convert(C.depthTexture.type);let Ae;C.depthTexture.format===Gi?Ae=n.DEPTH_COMPONENT24:C.depthTexture.format===_s&&(Ae=n.DEPTH24_STENCIL8);for(let we=0;we<6;we++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Ae,C.width,C.height,0,_e,ke,null)}}else ae(C.depthTexture,0);const me=te.__webglTexture,ve=gt(C),re=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,le=C.depthTexture.format===_s?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(C.depthTexture.format===Gi)ut(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,me,0);else if(C.depthTexture.format===_s)ut(C)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,le,re,me,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,le,re,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function be(U){const C=i.get(U),G=U.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==U.depthTexture){const $=U.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),$){const te=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),C.__depthDisposeCallback=te}C.__boundDepthTexture=$}if(U.depthTexture&&!C.__autoAllocateDepthBuffer)if(G)for(let $=0;$<6;$++)ye(C.__webglFramebuffer[$],U,$);else{const $=U.texture.mipmaps;$&&$.length>0?ye(C.__webglFramebuffer[0],U,0):ye(C.__webglFramebuffer,U,0)}else if(G){C.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[$]),C.__webglDepthbuffer[$]===void 0)C.__webglDepthbuffer[$]=n.createRenderbuffer(),ce(C.__webglDepthbuffer[$],U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=C.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,me)}}else{const $=U.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=n.createRenderbuffer(),ce(C.__webglDepthbuffer,U,!1);else{const te=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=C.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,me),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(U,C,G){const $=i.get(U);C!==void 0&&j($.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&be(U)}function ge(U){const C=U.texture,G=i.get(U),$=i.get(C);U.addEventListener("dispose",_);const te=U.textures,me=U.isWebGLCubeRenderTarget===!0,ve=te.length>1;if(ve||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=C.version,a.memory.textures++),me){G.__webglFramebuffer=[];for(let re=0;re<6;re++)if(C.mipmaps&&C.mipmaps.length>0){G.__webglFramebuffer[re]=[];for(let le=0;le<C.mipmaps.length;le++)G.__webglFramebuffer[re][le]=n.createFramebuffer()}else G.__webglFramebuffer[re]=n.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){G.__webglFramebuffer=[];for(let re=0;re<C.mipmaps.length;re++)G.__webglFramebuffer[re]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(ve)for(let re=0,le=te.length;re<le;re++){const _e=i.get(te[re]);_e.__webglTexture===void 0&&(_e.__webglTexture=n.createTexture(),a.memory.textures++)}if(U.samples>0&&ut(U)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let re=0;re<te.length;re++){const le=te[re];G.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[re]);const _e=r.convert(le.format,le.colorSpace),ke=r.convert(le.type),Ae=w(le.internalFormat,_e,ke,le.normalized,le.colorSpace,U.isXRRenderTarget===!0),we=gt(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Ae,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,G.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(G.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(me){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),xe(n.TEXTURE_CUBE_MAP,C);for(let re=0;re<6;re++)if(C.mipmaps&&C.mipmaps.length>0)for(let le=0;le<C.mipmaps.length;le++)j(G.__webglFramebuffer[re][le],U,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,le);else j(G.__webglFramebuffer[re],U,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);x(C)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let re=0,le=te.length;re<le;re++){const _e=te[re],ke=i.get(_e);let Ae=n.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ae=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,ke.__webglTexture),xe(Ae,_e),j(G.__webglFramebuffer,U,_e,n.COLOR_ATTACHMENT0+re,Ae,0),x(_e)&&v(Ae)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(re=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),xe(re,C),C.mipmaps&&C.mipmaps.length>0)for(let le=0;le<C.mipmaps.length;le++)j(G.__webglFramebuffer[le],U,C,n.COLOR_ATTACHMENT0,re,le);else j(G.__webglFramebuffer,U,C,n.COLOR_ATTACHMENT0,re,0);x(C)&&v(re),t.unbindTexture()}U.depthBuffer&&be(U)}function Me(U){const C=U.textures;for(let G=0,$=C.length;G<$;G++){const te=C[G];if(x(te)){const me=b(U),ve=i.get(te).__webglTexture;t.bindTexture(me,ve),v(me),t.unbindTexture()}}}const Ne=[],Ze=[];function lt(U){if(U.samples>0){if(ut(U)===!1){const C=U.textures,G=U.width,$=U.height;let te=n.COLOR_BUFFER_BIT;const me=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(U),re=C.length>1;if(re)for(let _e=0;_e<C.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const le=U.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let _e=0;_e<C.length;_e++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[_e]);const ke=i.get(C[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,G,$,0,0,G,$,te,n.NEAREST),h===!0&&(Ne.length=0,Ze.length=0,Ne.push(n.COLOR_ATTACHMENT0+_e),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&(Ne.push(me),Ze.push(me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let _e=0;_e<C.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,ve.__webglColorRenderbuffer[_e]);const ke=i.get(C[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&h){const C=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[C])}}}function gt(U){return Math.min(s.maxSamples,U.samples)}function ut(U){const C=i.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Y(U){const C=a.render.frame;d.get(U)!==C&&(d.set(U,C),U.update())}function tt(U,C){const G=U.colorSpace,$=U.format,te=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||G!==Yr&&G!==Hn&&(ct.getTransfer(G)===Rt?($!==Gn||te!==zn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):xt("WebGLTextures: Unsupported texture color space:",G)),C}function Xe(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(l.width=U.naturalWidth||U.width,l.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(l.width=U.displayWidth,l.height=U.displayHeight):(l.width=U.width,l.height=U.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=k,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ie,this.setTextureCube=N,this.rebindTextures=oe,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=j,this.useMultisampledRTT=ut,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function J_(n,e){function t(i,s=Hn){let r;const a=ct.getTransfer(s);if(i===zn)return n.UNSIGNED_BYTE;if(i===Fc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Id)return n.BYTE;if(i===Od)return n.SHORT;if(i===Wr)return n.UNSIGNED_SHORT;if(i===Nc)return n.INT;if(i===Ti)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===Ri)return n.HALF_FLOAT;if(i===Ud)return n.ALPHA;if(i===kd)return n.RGB;if(i===Gn)return n.RGBA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===_s)return n.DEPTH_STENCIL;if(i===kc)return n.RED;if(i===Bc)return n.RED_INTEGER;if(i===Rs)return n.RG;if(i===zc)return n.RG_INTEGER;if(i===Hc)return n.RGBA_INTEGER;if(i===Ha||i===Ga||i===Wa||i===Va)if(a===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ol||i===Nl||i===Fl||i===Ul)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===kl||i===Bl||i===zl||i===Hl||i===Gl||i===Qa||i===Wl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===kl||i===Bl)return a===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===zl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Hl)return r.COMPRESSED_R11_EAC;if(i===Gl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Qa)return r.COMPRESSED_RG11_EAC;if(i===Wl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Vl||i===Yl||i===Xl||i===Kl||i===ql||i===$l||i===Zl||i===Jl||i===Ql||i===jl||i===ec||i===tc||i===nc||i===ic)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Vl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Yl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ql)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$l)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Jl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ql)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jl)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ec)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===tc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nc)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ic)return a===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sc||i===rc||i===ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===sc)return a===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===oc||i===lc||i===ja||i===cc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===oc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Vr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Q_=`
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

}`;class e5{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new $d(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Mt({vertexShader:Q_,fragmentShader:j_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new Yn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t5 extends Ps{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,d=null,f=null,u=null,m=null,p=null;const M=typeof XRWebGLBinding<"u",g=new e5,x={},v=t.getContextAttributes();let b=null,w=null;const E=[],y=[],A=new $e;let _=null,S=null;const R=new Bn;R.viewport=new ot;const T=new Bn;T.viewport=new ot;const L=[R,T],O=new cx;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getTargetRaySpace()},this.getControllerGrip=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getGripSpace()},this.getHand=function(B){let z=E[B];return z===void 0&&(z=new Bo,E[B]=z),z.getHandSpace()};function H(B){const z=y.indexOf(B.inputSource);if(z===-1)return;const F=E[z];F!==void 0&&(F.update(B.inputSource,B.frame,l||a),F.dispatchEvent({type:B.type,data:B.inputSource}))}function K(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",ae);for(let B=0;B<E.length;B++){const z=y[B];z!==null&&(y[B]=null,E[B].disconnect(z))}I=null,k=null,g.reset();for(const B in x)delete x[B];if(e.setRenderTarget(b),m=null,u=null,f=null,s=null,w=null,Le.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),S!==null){const B=S.camera;B.fov=S.fov,B.zoom=S.zoom,B.updateProjectionMatrix(),S=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(B){l=B},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",K),s.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let F=null,Z=null,j=null;v.depth&&(j=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=v.stencil?_s:Gi,Z=v.stencil?Vr:Ti);const ce={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),w=new Qn(u.textureWidth,u.textureHeight,{format:Gn,type:zn,depthTexture:new ur(u.textureWidth,u.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const F={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,F),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new Qn(m.framebufferWidth,m.framebufferHeight,{format:Gn,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),Le.setContext(s),Le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(B){for(let z=0;z<B.removed.length;z++){const F=B.removed[z],Z=y.indexOf(F);Z>=0&&(y[Z]=null,E[Z].disconnect(F))}for(let z=0;z<B.added.length;z++){const F=B.added[z];let Z=y.indexOf(F);if(Z===-1){for(let ce=0;ce<E.length;ce++)if(ce>=y.length){y.push(F),Z=ce;break}else if(y[ce]===null){y[ce]=F,Z=ce;break}if(Z===-1)break}const j=E[Z];j&&j.connect(F)}}const q=new W,ie=new W;function N(B,z,F){q.setFromMatrixPosition(z.matrixWorld),ie.setFromMatrixPosition(F.matrixWorld);const Z=q.distanceTo(ie),j=z.projectionMatrix.elements,ce=F.projectionMatrix.elements,ye=j[14]/(j[10]-1),be=j[14]/(j[10]+1),oe=(j[9]+1)/j[5],ge=(j[9]-1)/j[5],Me=(j[8]-1)/j[0],Ne=(ce[8]+1)/ce[0],Ze=ye*Me,lt=ye*Ne,gt=Z/(-Me+Ne),ut=gt*-Me;if(z.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(ut),B.translateZ(gt),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),j[10]===-1)B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const Y=ye+gt,tt=be+gt,Xe=Ze-ut,U=lt+(Z-ut),C=oe*be/tt*Y,G=ge*be/tt*Y;B.projectionMatrix.makePerspective(Xe,U,C,G,Y,tt),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function ee(B,z){z===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(z.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let z=B.near,F=B.far;g.texture!==null&&(g.depthNear>0&&(z=g.depthNear),g.depthFar>0&&(F=g.depthFar)),O.near=T.near=R.near=z,O.far=T.far=R.far=F,(I!==O.near||k!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,k=O.far),O.layers.mask=B.layers.mask|6,R.layers.mask=O.layers.mask&-5,T.layers.mask=O.layers.mask&-3;const Z=B.parent,j=O.cameras;ee(O,Z);for(let ce=0;ce<j.length;ce++)ee(j[ce],Z);j.length===2?N(O,R,T):O.projectionMatrix.copy(R.projectionMatrix),S===null&&B.isPerspectiveCamera&&(S={camera:B,fov:B.fov,zoom:B.zoom}),se(B,O,Z)};function se(B,z,F){F===null?B.matrix.copy(z.matrixWorld):(B.matrix.copy(F.matrixWorld),B.matrix.invert(),B.matrix.multiply(z.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(z.projectionMatrix),B.projectionMatrixInverse.copy(z.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=hc*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&m===null))return h},this.setFoveation=function(B){h=B,u!==null&&(u.fixedFoveation=B),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=B)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(B){return x[B]};let ue=null;function xe(B,z){if(d=z.getViewerPose(l||a),p=z,d!==null){const F=d.views;m!==null&&(e.setRenderTargetFramebuffer(w,m.framebuffer),e.setRenderTarget(w));let Z=!1;F.length!==O.cameras.length&&(O.cameras.length=0,Z=!0);for(let be=0;be<F.length;be++){const oe=F[be];let ge=null;if(m!==null)ge=m.getViewport(oe);else{const Ne=f.getViewSubImage(u,oe);ge=Ne.viewport,be===0&&(e.setRenderTargetTextures(w,Ne.colorTexture,Ne.depthStencilTexture),e.setRenderTarget(w))}let Me=L[be];Me===void 0&&(Me=new Bn,Me.layers.enable(be),Me.viewport=new ot,L[be]=Me),Me.matrix.fromArray(oe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(oe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(ge.x,ge.y,ge.width,ge.height),be===0&&(O.matrix.copy(Me.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Z===!0&&O.cameras.push(Me)}const j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const be=f.getDepthInformation(F[0]);be&&be.isValid&&be.texture&&g.init(be,s.renderState)}if(j&&j.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let be=0;be<F.length;be++){const oe=F[be].camera;if(oe){let ge=x[oe];ge||(ge=new $d,x[oe]=ge);const Me=f.getCameraImage(oe);ge.sourceTexture=Me}}}}for(let F=0;F<E.length;F++){const Z=y[F],j=E[F];Z!==null&&j!==void 0&&j.update(Z,z,l||a)}ue&&ue(B,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),p=null}const Le=new jd;Le.setAnimationLoop(xe),this.setAnimationLoop=function(B){ue=B},this.dispose=function(){}}}const n5=new It,of=new Je;of.set(-1,0,0,0,1,0,0,0,1);function i5(n,e){function t(g,x){g.matrixAutoUpdate===!0&&g.updateMatrix(),x.value.copy(g.matrix)}function i(g,x){x.color.getRGB(g.fogColor.value,Zd(n)),x.isFog?(g.fogNear.value=x.near,g.fogFar.value=x.far):x.isFogExp2&&(g.fogDensity.value=x.density)}function s(g,x,v,b,w){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?r(g,x):x.isMeshLambertMaterial?(r(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(r(g,x),f(g,x)):x.isMeshPhongMaterial?(r(g,x),d(g,x),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(r(g,x),u(g,x),x.isMeshPhysicalMaterial&&m(g,x,w)):x.isMeshMatcapMaterial?(r(g,x),p(g,x)):x.isMeshDepthMaterial?r(g,x):x.isMeshDistanceMaterial?(r(g,x),M(g,x)):x.isMeshNormalMaterial?r(g,x):x.isLineBasicMaterial?(a(g,x),x.isLineDashedMaterial&&o(g,x)):x.isPointsMaterial?h(g,x,v,b):x.isSpriteMaterial?l(g,x):x.isShadowMaterial?(g.color.value.copy(x.color),g.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function r(g,x){g.opacity.value=x.opacity,x.color&&g.diffuse.value.copy(x.color),x.emissive&&g.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.bumpMap&&(g.bumpMap.value=x.bumpMap,t(x.bumpMap,g.bumpMapTransform),g.bumpScale.value=x.bumpScale,x.side===On&&(g.bumpScale.value*=-1)),x.normalMap&&(g.normalMap.value=x.normalMap,t(x.normalMap,g.normalMapTransform),g.normalScale.value.copy(x.normalScale),x.side===On&&g.normalScale.value.negate()),x.displacementMap&&(g.displacementMap.value=x.displacementMap,t(x.displacementMap,g.displacementMapTransform),g.displacementScale.value=x.displacementScale,g.displacementBias.value=x.displacementBias),x.emissiveMap&&(g.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,g.emissiveMapTransform)),x.specularMap&&(g.specularMap.value=x.specularMap,t(x.specularMap,g.specularMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest);const v=e.get(x),b=v.envMap,w=v.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(n5.makeRotationFromEuler(w)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(of),g.reflectivity.value=x.reflectivity,g.ior.value=x.ior,g.refractionRatio.value=x.refractionRatio),x.lightMap&&(g.lightMap.value=x.lightMap,g.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,g.lightMapTransform)),x.aoMap&&(g.aoMap.value=x.aoMap,g.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,g.aoMapTransform))}function a(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform))}function o(g,x){g.dashSize.value=x.dashSize,g.totalSize.value=x.dashSize+x.gapSize,g.scale.value=x.scale}function h(g,x,v,b){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.size.value=x.size*v,g.scale.value=b*.5,x.map&&(g.map.value=x.map,t(x.map,g.uvTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function l(g,x){g.diffuse.value.copy(x.color),g.opacity.value=x.opacity,g.rotation.value=x.rotation,x.map&&(g.map.value=x.map,t(x.map,g.mapTransform)),x.alphaMap&&(g.alphaMap.value=x.alphaMap,t(x.alphaMap,g.alphaMapTransform)),x.alphaTest>0&&(g.alphaTest.value=x.alphaTest)}function d(g,x){g.specular.value.copy(x.specular),g.shininess.value=Math.max(x.shininess,1e-4)}function f(g,x){x.gradientMap&&(g.gradientMap.value=x.gradientMap)}function u(g,x){g.metalness.value=x.metalness,x.metalnessMap&&(g.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,g.metalnessMapTransform)),g.roughness.value=x.roughness,x.roughnessMap&&(g.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,g.roughnessMapTransform)),x.envMap&&(g.envMapIntensity.value=x.envMapIntensity)}function m(g,x,v){g.ior.value=x.ior,x.sheen>0&&(g.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),g.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(g.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,g.sheenColorMapTransform)),x.sheenRoughnessMap&&(g.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,g.sheenRoughnessMapTransform))),x.clearcoat>0&&(g.clearcoat.value=x.clearcoat,g.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(g.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,g.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(g.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===On&&g.clearcoatNormalScale.value.negate())),x.dispersion>0&&(g.dispersion.value=x.dispersion),x.retroreflectivity>0&&(g.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(g.iridescence.value=x.iridescence,g.iridescenceIOR.value=x.iridescenceIOR,g.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(g.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,g.iridescenceMapTransform)),x.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),x.transmission>0&&(g.transmission.value=x.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),x.transmissionMap&&(g.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,g.transmissionMapTransform)),g.thickness.value=x.thickness,x.thicknessMap&&(g.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=x.attenuationDistance,g.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(g.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(g.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=x.specularIntensity,g.specularColor.value.copy(x.specularColor),x.specularColorMap&&(g.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,g.specularColorMapTransform)),x.specularIntensityMap&&(g.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,x){x.matcap&&(g.matcap.value=x.matcap)}function M(g,x){const v=e.get(x).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function s5(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(w,E){const y=E.program;i.uniformBlockBinding(w,y)}function l(w,E){let y=s[w.id];y===void 0&&(g(w),y=d(w),s[w.id]=y,w.addEventListener("dispose",v));const A=E.program;i.updateUBOMapping(w,A);const _=e.render.frame;r[w.id]!==_&&(u(w),r[w.id]=_)}function d(w){const E=f();w.__bindingPointIndex=E;const y=n.createBuffer(),A=w.__size,_=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,y),y}function f(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const E=s[w.id],y=w.uniforms,A=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,S=y.length;_<S;_++){const R=y[_];if(Array.isArray(R))for(let T=0,L=R.length;T<L;T++)m(R[T],_,T,A);else m(R,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(w,E,y,A){if(M(w,E,y,A)===!0){const _=w.__offset,S=w.value;if(Array.isArray(S)){let R=0;for(let T=0;T<S.length;T++){const L=S[T],O=x(L);p(L,w.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(S,w.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,w.__data)}}function p(w,E,y){typeof w=="number"||typeof w=="boolean"?E[0]=w:w.isMatrix3?(E[0]=w.elements[0],E[1]=w.elements[1],E[2]=w.elements[2],E[3]=0,E[4]=w.elements[3],E[5]=w.elements[4],E[6]=w.elements[5],E[7]=0,E[8]=w.elements[6],E[9]=w.elements[7],E[10]=w.elements[8],E[11]=0):ArrayBuffer.isView(w)?E.set(new w.constructor(w.buffer,w.byteOffset,E.length)):w.toArray(E,y)}function M(w,E,y,A){const _=w.value,S=E+"_"+y;if(A[S]===void 0)return typeof _=="number"||typeof _=="boolean"?A[S]=_:ArrayBuffer.isView(_)?A[S]=_.slice():A[S]=_.clone(),!0;{const R=A[S];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return A[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function g(w){const E=w.uniforms;let y=0;const A=16;for(let S=0,R=E.length;S<R;S++){const T=Array.isArray(E[S])?E[S]:[E[S]];for(let L=0,O=T.length;L<O;L++){const I=T[L],k=Array.isArray(I.value)?I.value:[I.value];for(let H=0,K=k.length;H<K;H++){const ae=k[H],q=x(ae),ie=y%A,N=ie%q.boundary,ee=ie+N;y+=N,ee!==0&&A-ee<q.storage&&(y+=A-ee),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=q.storage}}}const _=y%A;return _>0&&(y+=A-_),w.__size=y,w.__cache={},this}function x(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(E.boundary=16,E.storage=w.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",w),E}function v(w){const E=w.target;E.removeEventListener("dispose",v);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function b(){for(const w in s)n.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:h,update:l,dispose:b}}const r5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let xi=null;function a5(){return xi===null&&(xi=new ws(r5,16,16,Rs,Ri),xi.name="DFG_LUT",xi.minFilter=Kt,xi.magFilter=Kt,xi.wrapS=Ui,xi.wrapT=Ui,xi.generateMipmaps=!1,xi.needsUpdate=!0),xi}class o5{constructor(e={}){const{canvas:t=A2(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=zn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const M=m,g=new Set([Hc,zc,Bc]),x=new Set([zn,Ti,Wr,Vr,Fc,Uc]),v=new Uint32Array(4),b=new Int32Array(4),w=new W;let E=null,y=null;const A=[],_=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let T=!1,L=null,O=null,I=null,k=null;this._outputColorSpace=$n;let H=0,K=0,ae=null,q=-1,ie=null;const N=new ot,ee=new ot;let se=null;const ue=new st(0);let xe=0,Le=t.width,B=t.height,z=1,F=null,Z=null;const j=new ot(0,0,Le,B),ce=new ot(0,0,Le,B);let ye=!1;const be=new io;let oe=!1,ge=!1;const Me=new It,Ne=new W,Ze=new ot,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function ut(){return ae===null?z:1}let Y=i;function tt(D,V){return t.getContext(D,V)}let Xe,U,C,G,$,te,me,ve,re,le,_e,ke,Ae,we,He,Ye,Qe,X,Se,he,Ee,De,fe;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lc}`),t.addEventListener("webglcontextlost",Ut,!1),t.addEventListener("webglcontextrestored",yt,!1),t.addEventListener("webglcontextcreationerror",ti,!1),Y===null){const V="webgl2";if(Y=tt(V,D),Y===null)throw tt(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ge()}catch(D){throw t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ti,!1),xt("WebGLRenderer: "+D.message),D}function Ge(){Xe=new ab(Y),Xe.init(),Ee=new J_(Y,Xe),U=new Zv(Y,Xe,e,Ee),C=new $_(Y,Xe),U.reversedDepthBuffer&&u&&C.buffers.depth.setReversed(!0),O=Y.createFramebuffer(),I=Y.createFramebuffer(),k=Y.createFramebuffer(),G=new cb(Y),$=new N_,te=new Z_(Y,Xe,C,$,U,Ee,G),me=new rb(R),ve=new ux(Y),De=new qv(Y,ve),re=new ob(Y,ve,G,De),le=new ub(Y,re,ve,De,G),X=new hb(Y,U,te),He=new Jv($),_e=new O_(R,me,Xe,U,De,He),ke=new i5(R,$),Ae=new U_,we=new W_(Xe),Qe=new Kv(R,me,C,le,p,h),Ye=new q_(R,le,U),fe=new s5(Y,G,U,C),Se=new $v(Y,Xe,G),he=new lb(Y,Xe,G),G.programs=_e.programs,R.capabilities=U,R.extensions=Xe,R.properties=$,R.renderLists=Ae,R.shadowMap=Ye,R.state=C,R.info=G}M!==zn&&(S=new fb(M,t.width,t.height,o,s,r));const Be=new t5(R,Y);this.xr=Be,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const D=Xe.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Xe.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(D){D!==void 0&&(z=D,this.setSize(Le,B,!1))},this.getSize=function(D){return D.set(Le,B)},this.setSize=function(D,V,ne=!0){if(Be.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Le=D,B=V,t.width=Math.floor(D*z),t.height=Math.floor(V*z),ne===!0&&(t.style.width=D+"px",t.style.height=V+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,D,V)},this.getDrawingBufferSize=function(D){return D.set(Le*z,B*z).floor()},this.setDrawingBufferSize=function(D,V,ne){Le=D,B=V,z=ne,t.width=Math.floor(D*ne),t.height=Math.floor(V*ne),this.setViewport(0,0,D,V)},this.setEffects=function(D){if(M===zn){xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let V=0;V<D.length;V++)if(D[V].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(N)},this.getViewport=function(D){return D.copy(j)},this.setViewport=function(D,V,ne,J){D.isVector4?j.set(D.x,D.y,D.z,D.w):j.set(D,V,ne,J),C.viewport(N.copy(j).multiplyScalar(z).round())},this.getScissor=function(D){return D.copy(ce)},this.setScissor=function(D,V,ne,J){D.isVector4?ce.set(D.x,D.y,D.z,D.w):ce.set(D,V,ne,J),C.scissor(ee.copy(ce).multiplyScalar(z).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(D){C.setScissorTest(ye=D)},this.setOpaqueSort=function(D){F=D},this.setTransparentSort=function(D){Z=D},this.getClearColor=function(D){return D.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(D=!0,V=!0,ne=!0){let J=0;if(D){let Q=!1;if(ae!==null){const Pe=ae.texture.format;Q=g.has(Pe)}if(Q){const Pe=ae.texture.type,Oe=x.has(Pe),Ce=Qe.getClearColor(),Fe=Qe.getClearAlpha(),ze=Ce.r,nt=Ce.g,rt=Ce.b;Oe?(v[0]=ze,v[1]=nt,v[2]=rt,v[3]=Fe,Y.clearBufferuiv(Y.COLOR,0,v)):(b[0]=ze,b[1]=nt,b[2]=rt,b[3]=Fe,Y.clearBufferiv(Y.COLOR,0,b))}else J|=Y.COLOR_BUFFER_BIT}V&&(J|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(J|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&Y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),L=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",yt,!1),t.removeEventListener("webglcontextcreationerror",ti,!1),Qe.dispose(),Ae.dispose(),we.dispose(),$.dispose(),me.dispose(),le.dispose(),De.dispose(),fe.dispose(),_e.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",nh),Be.removeEventListener("sessionend",ih),as.stop()};function Ut(D){D.preventDefault(),Oh("WebGLRenderer: Context Lost."),T=!0}function yt(){Oh("WebGLRenderer: Context Restored."),T=!1;const D=G.autoReset,V=Ye.enabled,ne=Ye.autoUpdate,J=Ye.needsUpdate,Q=Ye.type;Ge(),G.autoReset=D,Ye.enabled=V,Ye.autoUpdate=ne,Ye.needsUpdate=J,Ye.type=Q}function ti(D){xt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function pi(D){const V=D.target;V.removeEventListener("dispose",pi),Ef(V)}function Ef(D){Af(D),$.remove(D)}function Af(D){const V=$.get(D).programs;V!==void 0&&(V.forEach(function(ne){_e.releaseProgram(ne)}),D.isShaderMaterial&&_e.releaseShaderCache(D))}this.renderBufferDirect=function(D,V,ne,J,Q,Pe){V===null&&(V=lt);const Oe=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Ce=Cf(D,V,ne,J,Q);C.setMaterial(J,Oe);let Fe=ne.index,ze=1;if(J.wireframe===!0){if(Fe=re.getWireframeAttribute(ne),Fe===void 0)return;ze=2}const nt=ne.drawRange,rt=ne.attributes.position;let Ue=nt.start*ze,wt=(nt.start+nt.count)*ze;Pe!==null&&(Ue=Math.max(Ue,Pe.start*ze),wt=Math.min(wt,(Pe.start+Pe.count)*ze)),Fe!==null?(Ue=Math.max(Ue,0),wt=Math.min(wt,Fe.count)):rt!=null&&(Ue=Math.max(Ue,0),wt=Math.min(wt,rt.count));const Qt=wt-Ue;if(Qt<0||Qt===1/0)return;De.setup(Q,J,Ce,ne,Fe);let Bt,Ot=Se;if(Fe!==null&&(Bt=ve.get(Fe),Ot=he,Ot.setIndex(Bt)),Q.isMesh)J.wireframe===!0?(C.setLineWidth(J.wireframeLinewidth*ut()),Ot.setMode(Y.LINES)):Ot.setMode(Y.TRIANGLES);else if(Q.isLine){let vn=J.linewidth;vn===void 0&&(vn=1),C.setLineWidth(vn*ut()),Q.isLineSegments?Ot.setMode(Y.LINES):Q.isLineLoop?Ot.setMode(Y.LINE_LOOP):Ot.setMode(Y.LINE_STRIP)}else Q.isPoints?Ot.setMode(Y.POINTS):Q.isSprite&&Ot.setMode(Y.TRIANGLES);if(Q.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))Ot.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const vn=Q._multiDrawStarts,Ie=Q._multiDrawCounts,En=Q._multiDrawCount,mt=Fe?ve.get(Fe).bytesPerElement:1,Xn=$.get(J).currentProgram.getUniforms();for(let mi=0;mi<En;mi++)Xn.setValue(Y,"_gl_DrawID",mi),Ot.render(vn[mi]/mt,Ie[mi])}else if(Q.isInstancedMesh)Ot.renderInstances(Ue,Qt,Q.count);else if(ne.isInstancedBufferGeometry){const vn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ie=Math.min(ne.instanceCount,vn);Ot.renderInstances(Ue,Qt,Ie)}else Ot.render(Ue,Qt)};function th(D,V,ne,J){L!==null&&D.isNodeMaterial&&L.setObject(J,D),oe===!0&&He.setState(D,ne,!1),D.transparent===!0&&D.side===ai&&D.forceSinglePass===!1?(D.side=On,D.needsUpdate=!0,jr(D,V,J),D.side=As,D.needsUpdate=!0,jr(D,V,J),D.side=ai):jr(D,V,J)}this.compile=function(D,V,ne=null){ne===null&&(ne=D),L!==null&&L.renderStart(D,V,ne),y=we.get(ne),y.init(V),_.push(y),ne.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(y.pushLight(Q),Q.castShadow&&y.pushShadow(Q))}),D!==ne&&D.traverseVisible(function(Q){Q.isLight&&Q.layers.test(V.layers)&&(y.pushLight(Q),Q.castShadow&&y.pushShadow(Q))}),y.setupLights(),L!==null&&L.updateLights(y.state.lightsArray),ge=this.localClippingEnabled,oe=He.init(this.clippingPlanes,ge),oe===!0&&He.setGlobalState(this.clippingPlanes,V),L!==null&&Ye.render(y.state.shadowsArray,ne,V);const J=new Set;return D.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Pe=Q.material;if(Pe)if(Array.isArray(Pe))for(let Oe=0;Oe<Pe.length;Oe++){const Ce=Pe[Oe];th(Ce,ne,V,Q),J.add(Ce)}else th(Pe,ne,V,Q),J.add(Pe)}),y=_.pop(),L!==null&&L.renderEnd(),J},this.compileAsync=function(D,V,ne=null){const J=this.compile(D,V,ne);return new Promise(Q=>{function Pe(){if(J.forEach(function(Oe){const Fe=$.get(Oe).currentProgram;(Fe===void 0||Fe.isReady())&&J.delete(Oe)}),J.size===0){Q(D);return}setTimeout(Pe,10)}Xe.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let vo=null;function Tf(D){vo&&vo(D)}function nh(){as.stop()}function ih(){as.start()}const as=new jd;as.setAnimationLoop(Tf),typeof self<"u"&&as.setContext(self),this.setAnimationLoop=function(D){vo=D,Be.setAnimationLoop(D),D===null?as.stop():as.start()},Be.addEventListener("sessionstart",nh),Be.addEventListener("sessionend",ih),this.render=function(D,V){if(V!==void 0&&V.isCamera!==!0){xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;L!==null&&L.renderStart(D,V);const ne=Be.enabled===!0&&Be.isPresenting===!0,J=S!==null&&(ae===null||ne)&&S.begin(R,ae);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(V),V=Be.getCamera()),D.isScene===!0&&D.onBeforeRender(R,D,V,ae),y=we.get(D,_.length),y.init(V),y.state.textureUnits=te.getTextureUnits(),_.push(y),Me.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),be.setFromProjectionMatrix(Me,Si,V.reversedDepth),ge=this.localClippingEnabled,oe=He.init(this.clippingPlanes,ge),E=Ae.get(D,A.length),E.init(),A.push(E),Be.enabled===!0&&Be.isPresenting===!0){const Oe=R.xr.getDepthSensingMesh();Oe!==null&&bo(Oe,V,-1/0,R.sortObjects)}bo(D,V,0,R.sortObjects),E.finish(),L!==null&&L.updateLights(y.state.lightsArray),R.sortObjects===!0&&E.sort(F,Z),gt=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,gt&&Qe.addToRenderList(E,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&He.beginShadows();const Q=y.state.shadowsArray;if(Ye.render(Q,D,V),oe===!0&&He.endShadows(),(J&&S.hasRenderPass())===!1){const Oe=E.opaque,Ce=E.transmissive;if(y.setupLights(),V.isArrayCamera){const Fe=V.cameras;if(Ce.length>0)for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze];rh(Oe,Ce,D,rt)}gt&&Qe.render(D);for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze];sh(E,D,rt,rt.viewport)}}else Ce.length>0&&rh(Oe,Ce,D,V),gt&&Qe.render(D),sh(E,D,V)}ae!==null&&K===0&&(te.updateMultisampleRenderTarget(ae),te.updateRenderTargetMipmap(ae)),J&&S.end(R),D.isScene===!0&&D.onAfterRender(R,D,V),De.resetDefaultState(),q=-1,ie=null,_.pop(),_.length>0?(y=_[_.length-1],te.setTextureUnits(y.state.textureUnits),oe===!0&&He.setGlobalState(R.clippingPlanes,y.state.camera)):y=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,L!==null&&L.renderEnd()};function bo(D,V,ne,J){if(D.visible===!1)return;if(D.layers.test(V.layers)){if(D.isGroup)ne=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(V);else if(D.isLightProbeGrid)y.pushLightProbeGrid(D);else if(D.isLight)y.pushLight(D),D.castShadow&&y.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(be)){J&&Ze.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Me);const Oe=le.update(D),Ce=D.material;Ce.visible&&E.push(D,Oe,Ce,ne,Ze.z,null,V)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(be))){const Oe=le.update(D),Ce=D.material;if(J&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ze.copy(D.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),Ze.copy(Oe.boundingSphere.center)),Ze.applyMatrix4(D.matrixWorld).applyMatrix4(Me)),Array.isArray(Ce)){const Fe=Oe.groups;for(let ze=0,nt=Fe.length;ze<nt;ze++){const rt=Fe[ze],Ue=Ce[rt.materialIndex];Ue&&Ue.visible&&E.push(D,Oe,Ue,ne,Ze.z,rt,V)}}else Ce.visible&&E.push(D,Oe,Ce,ne,Ze.z,null,V)}}const Pe=D.children;for(let Oe=0,Ce=Pe.length;Oe<Ce;Oe++)bo(Pe[Oe],V,ne,J)}function sh(D,V,ne,J){const{opaque:Q,transmissive:Pe,transparent:Oe}=D;y.setupLightsView(ne),oe===!0&&He.setGlobalState(R.clippingPlanes,ne),J&&C.viewport(N.copy(J)),Q.length>0&&Qr(Q,V,ne),Pe.length>0&&Qr(Pe,V,ne),Oe.length>0&&Qr(Oe,V,ne),C.buffers.depth.setTest(!0),C.buffers.depth.setMask(!0),C.buffers.color.setMask(!0),C.setPolygonOffset(!1)}function rh(D,V,ne,J){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[J.id]===void 0){const Ue=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[J.id]=new Qn(1,1,{generateMipmaps:!0,type:Ue?Ri:zn,minFilter:bs,samples:Math.max(4,U.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const Pe=y.state.transmissionRenderTarget[J.id],Oe=J.viewport||N;Pe.setSize(Oe.z*R.transmissionResolutionScale,Oe.w*R.transmissionResolutionScale);const Ce=R.getRenderTarget(),Fe=R.getActiveCubeFace(),ze=R.getActiveMipmapLevel();R.setRenderTarget(Pe),R.getClearColor(ue),xe=R.getClearAlpha(),xe<1&&R.setClearColor(16777215,.5),R.clear(),gt&&Qe.render(ne);const nt=R.toneMapping;R.toneMapping=Ai;const rt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),y.setupLightsView(J),oe===!0&&He.setGlobalState(R.clippingPlanes,J),Qr(D,ne,J),te.updateMultisampleRenderTarget(Pe),te.updateRenderTargetMipmap(Pe),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let wt=0,Qt=V.length;wt<Qt;wt++){const Bt=V[wt],{object:Ot,geometry:vn,material:Ie,group:En}=Bt;if(Ie.side===ai&&Ot.layers.test(J.layers)){const mt=Ie.side;Ie.side=On,Ie.needsUpdate=!0,ah(Ot,ne,J,vn,Ie,En),Ie.side=mt,Ie.needsUpdate=!0,Ue=!0}}Ue===!0&&(te.updateMultisampleRenderTarget(Pe),te.updateRenderTargetMipmap(Pe))}R.setRenderTarget(Ce,Fe,ze),R.setClearColor(ue,xe),rt!==void 0&&(J.viewport=rt),R.toneMapping=nt}function Qr(D,V,ne){const J=V.isScene===!0?V.overrideMaterial:null;for(let Q=0,Pe=D.length;Q<Pe;Q++){const Oe=D[Q],{object:Ce,geometry:Fe,group:ze}=Oe;let nt=Oe.material;nt.allowOverride===!0&&J!==null&&(nt=J),Ce.layers.test(ne.layers)&&ah(Ce,V,ne,Fe,nt,ze)}}function ah(D,V,ne,J,Q,Pe){L!==null&&Q.isNodeMaterial&&L.setObject(D,Q),D.onBeforeRender(R,V,ne,J,Q,Pe),D.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),Q.onBeforeRender(R,V,ne,J,D,Pe),Q.transparent===!0&&Q.side===ai&&Q.forceSinglePass===!1?(Q.side=On,Q.needsUpdate=!0,R.renderBufferDirect(ne,V,J,Q,D,Pe),Q.side=As,Q.needsUpdate=!0,R.renderBufferDirect(ne,V,J,Q,D,Pe),Q.side=ai):R.renderBufferDirect(ne,V,J,Q,D,Pe),D.onAfterRender(R,V,ne,J,Q,Pe)}function jr(D,V,ne){V.isScene!==!0&&(V=lt);const J=$.get(D),Q=y.state.lights,Pe=y.state.shadowsArray,Oe=Q.state.version,Ce=_e.getParameters(D,Q.state,Pe,V,ne,y.state.lightProbeGridArray),Fe=_e.getProgramCacheKey(Ce);let ze=J.programs;J.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?V.environment:null,J.fog=V.fog;const nt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;J.envMap=me.get(D.envMap||J.environment,nt),J.envMapRotation=J.environment!==null&&D.envMap===null?V.environmentRotation:D.envMapRotation,ze===void 0&&(D.addEventListener("dispose",pi),ze=new Map,J.programs=ze);let rt=ze.get(Fe);if(rt!==void 0){if(J.currentProgram===rt&&J.lightsStateVersion===Oe)return lh(D,Ce),rt}else Ce.uniforms=_e.getUniforms(D),L!==null&&D.isNodeMaterial&&L.build(D,ne,Ce),D.onBeforeCompile(Ce,R),rt=_e.acquireProgram(Ce,Fe),ze.set(Fe,rt),J.uniforms=Ce.uniforms;const Ue=J.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ue.clippingPlanes=He.uniform),lh(D,Ce),J.needsLights=Pf(D),J.lightsStateVersion=Oe,J.needsLights&&(Ue.ambientLightColor.value=Q.state.ambient,Ue.lightProbe.value=Q.state.probe,Ue.sunLights.value=Q.state.sun,Ue.sunLightShadows.value=Q.state.sunShadow,Ue.directionalLights.value=Q.state.directional,Ue.directionalLightShadows.value=Q.state.directionalShadow,Ue.spotLights.value=Q.state.spot,Ue.spotLightShadows.value=Q.state.spotShadow,Ue.rectAreaLights.value=Q.state.rectArea,Ue.ltc_1.value=Q.state.rectAreaLTC1,Ue.ltc_2.value=Q.state.rectAreaLTC2,Ue.pointLights.value=Q.state.point,Ue.pointLightShadows.value=Q.state.pointShadow,Ue.hemisphereLights.value=Q.state.hemi,Ue.sunShadowMatrix.value=Q.state.sunShadowMatrix,Ue.sunShadowCascade.value=Q.state.sunShadowCascade,Ue.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Ue.spotLightMatrix.value=Q.state.spotLightMatrix,Ue.spotLightMap.value=Q.state.spotLightMap,Ue.pointShadowMatrix.value=Q.state.pointShadowMatrix),J.lightProbeGrid=y.state.lightProbeGridArray.length>0,J.currentProgram=rt,J.uniformsList=null,rt}function oh(D){if(D.uniformsList===null){const V=D.currentProgram.getUniforms();D.uniformsList=Ya.seqWithValue(V.seq,D.uniforms)}return D.uniformsList}function lh(D,V){const ne=$.get(D);ne.outputColorSpace=V.outputColorSpace,ne.batching=V.batching,ne.batchingColor=V.batchingColor,ne.instancing=V.instancing,ne.instancingColor=V.instancingColor,ne.instancingMorph=V.instancingMorph,ne.skinning=V.skinning,ne.morphTargets=V.morphTargets,ne.morphNormals=V.morphNormals,ne.morphColors=V.morphColors,ne.morphTargetsCount=V.morphTargetsCount,ne.numClippingPlanes=V.numClippingPlanes,ne.numIntersection=V.numClipIntersection,ne.vertexAlphas=V.vertexAlphas,ne.vertexTangents=V.vertexTangents,ne.toneMapping=V.toneMapping}function Rf(D,V){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;w.setFromMatrixPosition(V.matrixWorld);for(let ne=0,J=D.length;ne<J;ne++){const Q=D[ne];if(Q.texture!==null&&Q.boundingBox.containsPoint(w))return Q}return null}function Cf(D,V,ne,J,Q){V.isScene!==!0&&(V=lt),te.resetTextureUnits();const Pe=V.fog,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?V.environment:null,Ce=ae===null?R.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ct.workingColorSpace,Fe=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,ze=me.get(J.envMap||Oe,Fe),nt=J.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,rt=!!ne.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ue=!!ne.morphAttributes.position,wt=!!ne.morphAttributes.normal,Qt=!!ne.morphAttributes.color;let Bt=Ai;J.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Bt=R.toneMapping);const Ot=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,vn=Ot!==void 0?Ot.length:0,Ie=$.get(J),En=y.state.lights;if(oe===!0&&(ge===!0||D!==ie)){const kt=D===ie&&J.id===q;He.setState(J,D,kt)}let mt=!1;J.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==En.state.version||Ie.outputColorSpace!==Ce||Q.isBatchedMesh&&Ie.batching===!1||!Q.isBatchedMesh&&Ie.batching===!0||Q.isBatchedMesh&&Ie.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Ie.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Ie.instancing===!1||!Q.isInstancedMesh&&Ie.instancing===!0||Q.isSkinnedMesh&&Ie.skinning===!1||!Q.isSkinnedMesh&&Ie.skinning===!0||Q.isInstancedMesh&&Ie.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Ie.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Ie.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Ie.instancingMorph===!1&&Q.morphTexture!==null||Ie.envMap!==ze||J.fog===!0&&Ie.fog!==Pe||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==He.numPlanes||Ie.numIntersection!==He.numIntersection)||Ie.vertexAlphas!==nt||Ie.vertexTangents!==rt||Ie.morphTargets!==Ue||Ie.morphNormals!==wt||Ie.morphColors!==Qt||Ie.toneMapping!==Bt||Ie.morphTargetsCount!==vn||!!Ie.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(mt=!0):(mt=!0,Ie.__version=J.version);let Xn=Ie.currentProgram;mt===!0&&(Xn=jr(J,V,Q),L&&J.isNodeMaterial&&L.onUpdateProgram(J,Xn,Ie));let mi=!1,Yi=!1,Is=!1;const Pt=Xn.getUniforms(),Zt=Ie.uniforms;if(C.useProgram(Xn.program)&&(mi=!0,Yi=!0,Is=!0),J.id!==q&&(q=J.id,Yi=!0),Ie.needsLights){const kt=Rf(y.state.lightProbeGridArray,Q);Ie.lightProbeGrid!==kt&&(Ie.lightProbeGrid=kt,Yi=!0)}if(mi||ie!==D){C.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Pt.setValue(Y,"projectionMatrix",D.projectionMatrix),Pt.setValue(Y,"viewMatrix",D.matrixWorldInverse);const Ki=Pt.map.cameraPosition;Ki!==void 0&&Ki.setValue(Y,Ne.setFromMatrixPosition(D.matrixWorld)),U.logarithmicDepthBuffer&&Pt.setValue(Y,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Pt.setValue(Y,"isOrthographic",D.isOrthographicCamera===!0),ie!==D&&(ie=D,Yi=!0,Is=!0)}if(Ie.needsLights&&(En.state.sunShadowMap.length>0&&Pt.setValue(Y,"sunShadowMap",En.state.sunShadowMap,te),En.state.directionalShadowMap.length>0&&Pt.setValue(Y,"directionalShadowMap",En.state.directionalShadowMap,te),En.state.spotShadowMap.length>0&&Pt.setValue(Y,"spotShadowMap",En.state.spotShadowMap,te),En.state.pointShadowMap.length>0&&Pt.setValue(Y,"pointShadowMap",En.state.pointShadowMap,te)),Q.isSkinnedMesh){Pt.setOptional(Y,Q,"bindMatrix"),Pt.setOptional(Y,Q,"bindMatrixInverse");const kt=Q.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Pt.setValue(Y,"boneTexture",kt.boneTexture,te))}Q.isBatchedMesh&&(Pt.setOptional(Y,Q,"batchingTexture"),Pt.setValue(Y,"batchingTexture",Q._matricesTexture,te),Pt.setOptional(Y,Q,"batchingIdTexture"),Pt.setValue(Y,"batchingIdTexture",Q._indirectTexture,te),Pt.setOptional(Y,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Pt.setValue(Y,"batchingColorTexture",Q._colorsTexture,te));const Xi=ne.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&X.update(Q,ne,Xn),(Yi||Ie.receiveShadow!==Q.receiveShadow)&&(Ie.receiveShadow=Q.receiveShadow,Pt.setValue(Y,"receiveShadow",Q.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&V.environment!==null&&(Zt.envMapIntensity.value=V.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=a5()),Yi){if(Pt.setValue(Y,"toneMappingExposure",R.toneMappingExposure),Ie.needsLights&&Lf(Zt,Is),Pe&&J.fog===!0&&ke.refreshFogUniforms(Zt,Pe),ke.refreshMaterialUniforms(Zt,J,z,B,y.state.transmissionRenderTarget[D.id]),Ie.needsLights&&Ie.lightProbeGrid){const kt=Ie.lightProbeGrid;Zt.probesSH.value=kt.texture,Zt.probesMin.value.copy(kt.boundingBox.min),Zt.probesMax.value.copy(kt.boundingBox.max),Zt.probesResolution.value.copy(kt.resolution)}Ya.upload(Y,oh(Ie),Zt,te)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ya.upload(Y,oh(Ie),Zt,te),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Pt.setValue(Y,"center",Q.center),Pt.setValue(Y,"modelViewMatrix",Q.modelViewMatrix),Pt.setValue(Y,"normalMatrix",Q.normalMatrix),Pt.setValue(Y,"modelMatrix",Q.matrixWorld),J.uniformsGroups!==void 0){const kt=J.uniformsGroups;for(let Ki=0,Os=kt.length;Ki<Os;Ki++){const hh=kt[Ki];fe.update(hh,Xn),fe.bind(hh,Xn)}}return Xn}function Lf(D,V){D.ambientLightColor.needsUpdate=V,D.lightProbe.needsUpdate=V,D.sunLights.needsUpdate=V,D.sunLightShadows.needsUpdate=V,D.directionalLights.needsUpdate=V,D.directionalLightShadows.needsUpdate=V,D.pointLights.needsUpdate=V,D.pointLightShadows.needsUpdate=V,D.spotLights.needsUpdate=V,D.spotLightShadows.needsUpdate=V,D.rectAreaLights.needsUpdate=V,D.hemisphereLights.needsUpdate=V}function Pf(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(D,V,ne){const J=$.get(D);J.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),$.get(D.texture).__webglTexture=V,$.get(D.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ne,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,V){const ne=$.get(D);ne.__webglFramebuffer=V,ne.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(D,V=0,ne=0){ae=D,H=V,K=ne;let J=null,Q=!1,Pe=!1;if(D){const Ce=$.get(D);if(Ce.__useDefaultFramebuffer!==void 0){C.bindFramebuffer(Y.FRAMEBUFFER,Ce.__webglFramebuffer),N.copy(D.viewport),ee.copy(D.scissor),se=D.scissorTest,C.viewport(N),C.scissor(ee),C.setScissorTest(se),q=-1;return}else if(Ce.__webglFramebuffer===void 0)te.setupRenderTarget(D);else if(Ce.__hasExternalTextures)te.rebindTextures(D,$.get(D.texture).__webglTexture,$.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const nt=D.depthTexture;if(Ce.__boundDepthTexture!==nt){if(nt!==null&&$.has(nt)&&(D.width!==nt.image.width||D.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(D)}}const Fe=D.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Pe=!0);const ze=$.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ze[V])?J=ze[V][ne]:J=ze[V],Q=!0):D.samples>0&&te.useMultisampledRTT(D)===!1?J=$.get(D).__webglMultisampledFramebuffer:Array.isArray(ze)?J=ze[ne]:J=ze,N.copy(D.viewport),ee.copy(D.scissor),se=D.scissorTest}else N.copy(j).multiplyScalar(z).floor(),ee.copy(ce).multiplyScalar(z).floor(),se=ye;if(ne!==0&&(J=O),C.bindFramebuffer(Y.FRAMEBUFFER,J)&&C.drawBuffers(D,J),C.viewport(N),C.scissor(ee),C.setScissorTest(se),Q){const Ce=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ce.__webglTexture,ne)}else if(Pe){const Ce=V;for(let Fe=0;Fe<D.textures.length;Fe++){const ze=$.get(D.textures[Fe]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Fe,ze.__webglTexture,ne,Ce)}}else if(D!==null&&ne!==0){const Ce=$.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ce.__webglTexture,ne)}q=-1};function ch(D){const V=$.get(D);return(V.__readFormat!==D.format||V.__readType!==D.type)&&(V.__readFormat=D.format,V.__readType=D.type,V.__formatReadable=U.textureFormatReadable(D.format),V.__typeReadable=U.textureTypeReadable(D.type)),V}this.readRenderTargetPixels=function(D,V,ne,J,Q,Pe,Oe,Ce=0){if(!(D&&D.isWebGLRenderTarget)){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Fe=Fe[Oe]),Fe){C.bindFramebuffer(Y.FRAMEBUFFER,Fe);try{const ze=D.textures[Ce],nt=ze.format,rt=ze.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ce);const Ue=ch(ze);if(Ue.__formatReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ue.__typeReadable===!1){xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=D.width-J&&ne>=0&&ne<=D.height-Q&&Y.readPixels(V,ne,J,Q,Ee.convert(nt),Ee.convert(rt),Pe)}finally{const ze=ae!==null?$.get(ae).__webglFramebuffer:null;C.bindFramebuffer(Y.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(D,V,ne,J,Q,Pe,Oe,Ce=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=$.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Oe!==void 0&&(Fe=Fe[Oe]),Fe)if(V>=0&&V<=D.width-J&&ne>=0&&ne<=D.height-Q){C.bindFramebuffer(Y.FRAMEBUFFER,Fe);const ze=D.textures[Ce],nt=ze.format,rt=ze.type;D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ce);const Ue=ch(ze);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const wt=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,wt),Y.bufferData(Y.PIXEL_PACK_BUFFER,Pe.byteLength,Y.STREAM_READ),Y.readPixels(V,ne,J,Q,Ee.convert(nt),Ee.convert(rt),0),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null);const Qt=ae!==null?$.get(ae).__webglFramebuffer:null;C.bindFramebuffer(Y.FRAMEBUFFER,Qt);const Bt=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await T2(Y,Bt,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,wt),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Pe),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,null),Y.deleteBuffer(wt),Y.deleteSync(Bt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,V=null,ne=0){const J=Math.pow(2,-ne),Q=Math.floor(D.image.width*J),Pe=Math.floor(D.image.height*J),Oe=V!==null?V.x:0,Ce=V!==null?V.y:0;te.setTexture2D(D,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ne,0,0,Oe,Ce,Q,Pe),C.unbindTexture()},this.copyTextureToTexture=function(D,V,ne=null,J=null,Q=0,Pe=0){let Oe,Ce,Fe,ze,nt,rt,Ue,wt,Qt;const Bt=D.isCompressedTexture?D.mipmaps[Pe]:D.image;if(ne!==null)Oe=ne.max.x-ne.min.x,Ce=ne.max.y-ne.min.y,Fe=ne.isBox3?ne.max.z-ne.min.z:1,ze=ne.min.x,nt=ne.min.y,rt=ne.isBox3?ne.min.z:0;else{const Zt=Math.pow(2,-Q);Oe=Math.floor(Bt.width*Zt),Ce=Math.floor(Bt.height*Zt),D.isDataArrayTexture?Fe=Bt.depth:D.isData3DTexture?Fe=Math.floor(Bt.depth*Zt):Fe=1,ze=0,nt=0,rt=0}J!==null?(Ue=J.x,wt=J.y,Qt=J.z):(Ue=0,wt=0,Qt=0);const Ot=Ee.convert(V.format),vn=Ee.convert(V.type);let Ie;V.isData3DTexture?(te.setTexture3D(V,0),Ie=Y.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(te.setTexture2DArray(V,0),Ie=Y.TEXTURE_2D_ARRAY):(te.setTexture2D(V,0),Ie=Y.TEXTURE_2D),C.activeTexture(Y.TEXTURE0),C.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,V.flipY),C.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),C.pixelStorei(Y.UNPACK_ALIGNMENT,V.unpackAlignment);const En=C.getParameter(Y.UNPACK_ROW_LENGTH),mt=C.getParameter(Y.UNPACK_IMAGE_HEIGHT),Xn=C.getParameter(Y.UNPACK_SKIP_PIXELS),mi=C.getParameter(Y.UNPACK_SKIP_ROWS),Yi=C.getParameter(Y.UNPACK_SKIP_IMAGES);C.pixelStorei(Y.UNPACK_ROW_LENGTH,Bt.width),C.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Bt.height),C.pixelStorei(Y.UNPACK_SKIP_PIXELS,ze),C.pixelStorei(Y.UNPACK_SKIP_ROWS,nt),C.pixelStorei(Y.UNPACK_SKIP_IMAGES,rt);const Is=D.isDataArrayTexture||D.isData3DTexture,Pt=V.isDataArrayTexture||V.isData3DTexture;if(D.isDepthTexture){const Zt=$.get(D),Xi=$.get(V),kt=$.get(Zt.__renderTarget),Ki=$.get(Xi.__renderTarget);C.bindFramebuffer(Y.READ_FRAMEBUFFER,kt.__webglFramebuffer),C.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let Os=0;Os<Fe;Os++)Is&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(D).__webglTexture,Q,rt+Os),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,$.get(V).__webglTexture,Pe,Qt+Os)),Y.blitFramebuffer(ze,nt,Oe,Ce,Ue,wt,Oe,Ce,Y.DEPTH_BUFFER_BIT,Y.NEAREST);C.bindFramebuffer(Y.READ_FRAMEBUFFER,null),C.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(Q!==0||D.isRenderTargetTexture||$.has(D)){const Zt=$.get(D),Xi=$.get(V);C.bindFramebuffer(Y.READ_FRAMEBUFFER,I),C.bindFramebuffer(Y.DRAW_FRAMEBUFFER,k);for(let kt=0;kt<Fe;kt++)Is?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Zt.__webglTexture,Q,rt+kt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Zt.__webglTexture,Q),Pt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Xi.__webglTexture,Pe,Qt+kt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Xi.__webglTexture,Pe),Q!==0?Y.blitFramebuffer(ze,nt,Oe,Ce,Ue,wt,Oe,Ce,Y.COLOR_BUFFER_BIT,Y.NEAREST):Pt?Y.copyTexSubImage3D(Ie,Pe,Ue,wt,Qt+kt,ze,nt,Oe,Ce):Y.copyTexSubImage2D(Ie,Pe,Ue,wt,ze,nt,Oe,Ce);C.bindFramebuffer(Y.READ_FRAMEBUFFER,null),C.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Pt?D.isDataTexture||D.isData3DTexture?Y.texSubImage3D(Ie,Pe,Ue,wt,Qt,Oe,Ce,Fe,Ot,vn,Bt.data):V.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ie,Pe,Ue,wt,Qt,Oe,Ce,Fe,Ot,Bt.data):Y.texSubImage3D(Ie,Pe,Ue,wt,Qt,Oe,Ce,Fe,Ot,vn,Bt):D.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Pe,Ue,wt,Oe,Ce,Ot,vn,Bt.data):D.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Pe,Ue,wt,Bt.width,Bt.height,Ot,Bt.data):Y.texSubImage2D(Y.TEXTURE_2D,Pe,Ue,wt,Oe,Ce,Ot,vn,Bt);C.pixelStorei(Y.UNPACK_ROW_LENGTH,En),C.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,mt),C.pixelStorei(Y.UNPACK_SKIP_PIXELS,Xn),C.pixelStorei(Y.UNPACK_SKIP_ROWS,mi),C.pixelStorei(Y.UNPACK_SKIP_IMAGES,Yi),Pe===0&&V.generateMipmaps&&Y.generateMipmap(Ie),C.unbindTexture()},this.initRenderTarget=function(D){$.get(D).__webglFramebuffer===void 0&&te.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?te.setTextureCube(D,0):D.isData3DTexture?te.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?te.setTexture2DArray(D,0):te.setTexture2D(D,0),C.unbindTexture()},this.resetState=function(){H=0,K=0,ae=null,C.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const l5=new Set([c.LEAF,c.LEAF2,c.LEAF3]);function c5(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[c.TRUNK]:[92,66,48],[c.BARK2]:[70,50,38],[c.BARKD]:[44,32,28],[c.BARKL]:[124,94,68],[c.LEAF]:de(e,.55,.42),[c.LEAF2]:de(e+.02,.5,.55),[c.LEAF3]:de(e+.04,.6,.26),[c.BODY]:de(t,.62,.72),[c.BELLY]:[236,226,204],[c.BODY2]:de(t+.5,.45,.6),[c.BODY3]:[40,36,46],[c.FRAME]:[196,200,210],[c.SHADES]:[28,26,32],[c.HAT1]:[74,70,96],[c.HAT2]:[96,88,122],[c.STONE]:[118,116,124],[c.STONED]:[64,62,72],[c.MOSS]:[80,112,60],[c.WOOD]:[148,104,62],[c.STRAW]:[196,168,112],[c.CLOTH]:[232,220,196],[c.ACCENT]:de(.95,.6,.85),[c.EAR]:[176,96,64],[c.GLOW]:[255,190,96],[c.MAGIC2]:[255,236,190],[c.COLLAR]:[255,80,200],[c.RUNE]:[80,230,255],[c.WOKEN]:[255,214,80],[c.MAGIC]:[180,110,255],[c.LINE]:[24,22,30],[c.NOSE]:[14,12,18]}}const ln=2.5,h5=[2.2,ln,.3],ol=[c.COLLAR,c.RUNE,c.WOKEN,c.MAGIC];function u5(){const n=new qe({blend:.05}),e=[],t=(y,A)=>{const _=Math.sin(y*127.1+A*311.7)*43758.5453;return _-Math.floor(_)},i=y=>{const A=Math.sin(Math.atan2(y[2],y[0])*9+y[1]*2.3);return A>.75?c.BARKD:A<-.6?c.BARKL:A>.35?c.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],c.TRUNK,{group:1,rough:.025,paint:i});for(let y=0;y<7;y++){const A=y/7*Math.PI*2+.3,_=.45,S=1.05+t(y,1)*.45;n.chain([[Math.cos(A)*_,.45,-.2+Math.sin(A)*_,.2],[Math.cos(A)*(_+S)*.55,.16,-.2+Math.sin(A)*(_+S)*.55,.13],[Math.cos(A)*S,.02,-.2+Math.sin(A)*S,.05]],c.TRUNK,{group:1,rough:.015,paint:i})}const s=(y,A=1)=>n.chain(y,c.TRUNK,{group:A,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=y=>A=>{const _=t(Math.floor(A[0]*9),Math.floor(A[1]*9)+Math.floor(A[2]*9)*7);return A[1]<y[1]-.25||_<.18?c.LEAF3:_>.82?c.LEAF2:void 0};for(const[y,A]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(y,A,c.LEAF,{group:40,rough:.05,paint:r(y)});const a=[-.15,2.92,.15],o=P.norm([1,.07,0]),h=[1.25,.52,.58],l=y=>P.dot(P.sub(y,a),o),d=y=>P.dot(P.sub(y,a),[-o[1],o[0],0]);n.box(a,h,c.BODY,{dir:o,round:.22,group:3,paint:y=>{const A=l(y),_=d(y),S=y[2]>a[2]+h[2]-.04;return S&&Math.hypot(A+.85,_-.02)<.15?Math.hypot(A+.85,_-.02)<.11?c.GLOW:c.FRAME:S&&A>.35&&A<.8&&_>-.42&&_<.38?_>.02&&_<.3&&A>.42&&A<.73?c.GLOW:Math.abs(A-.575)<.2&&_<-.38?c.FRAME:c.BODY2:S&&_>.06&&_<.32&&A>-.6&&A<.25?Math.abs(A+.17)<.02?c.BELLY:c.GLOW:A>h[0]-.05&&_>.05&&_<.35&&Math.abs(y[2]-a[2])<.45?c.MAGIC2:A>h[0]-.06&&Math.abs(_+.2)<.07&&Math.abs(Math.abs(y[2]-a[2])-.38)<.08?c.FRAME:_>.02?c.BELLY:_<-.42?c.SHADES:void 0}}),e.push({at:P.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:P.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:P.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const y of[-.75,.75]){const A=P.add(P.add(a,P.mul(o,y)),[0,-.5,h[2]-.02]);n.ell(A,[.21,.21,.08],c.SHADES,{group:4,paint:_=>Math.hypot(_[0]-A[0],_[1]-A[1])<.1?c.FRAME:void 0})}n.seg(P.add(a,[1.05,.3,h[2]-.02]),P.add(a,[1.2,.32,h[2]+.14]),.015,.015,c.FRAME,{group:5}),n.box(P.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],c.FRAME,{group:5,round:.015});const f=P.add(a,[-.25,h[1]+.14,0]);n.box(f,[.95,.1,.5],c.CLOTH,{dir:o,round:.05,group:6,paint:y=>Math.floor((l(y)+2)*6)%2?c.BODY2:void 0}),n.box(P.add(f,[0,.14,0]),[1,.05,.54],c.BELLY,{dir:P.norm([1,.14,0]),round:.04,group:6});for(const y of[-.18,.18])n.seg(P.add(a,[-1.33,-.45,y]),P.add(a,[-1.3,.62,y]),.02,.02,c.FRAME,{group:7});for(let y=0;y<5;y++)n.seg(P.add(a,[-1.33,-.32+y*.22,-.18]),P.add(a,[-1.33,-.32+y*.22,.18]),.014,.014,c.FRAME,{group:7});const u=[-.75,3.25,-.05],m=.44,p=1.45;n.seg(u,P.add(u,[0,p,0]),m,m-.04,c.STONE,{group:8,rough:.012,paint:y=>{const A=y[1]-u[1],_=Math.atan2(y[2]-u[2],y[0]-u[0]),S=Math.floor(A*6),R=Math.floor((_+Math.PI)*4+S%2*.5);return Math.abs(_-Math.PI/2+.35)<.07&&A>.75&&A<1.15?c.GLOW:A*6%1<.12||((_+Math.PI)*4+S%2*.5)%1<.1?c.STONED:t(S,R)<.15&&A<.5?c.MOSS:void 0}}),e.push({at:P.add(u,[.2,.95,m+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let y=0;y<8;y++){const A=y/8*Math.PI*2;n.box(P.add(u,[Math.cos(A)*(m-.05),p+.1,Math.sin(A)*(m-.05)]),[.1,.1,.08],c.STONE,{dir:[-Math.sin(A),0,Math.cos(A)],round:.02,group:9,rough:.008})}const M=P.add(u,[0,p+.1,0]),g=P.add(M,[.08,1.05,-.04]);n.seg(M,g,m-.1,.02,c.HAT1,{group:10,paint:y=>Math.floor((y[1]-M[1])*7)%2?c.HAT2:void 0}),n.seg(g,P.add(g,[0,.45,0]),.015,.012,c.FRAME,{group:11}),n.box(P.add(g,[.17,.37,0]),[.16,.06,.01],c.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],c.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:y=>y[1]>2.58?c.MOSS:void 0}),n.box(P.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],c.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(P.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],c.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const y of[-.9,.95]){const A=P.add(a,[y,-.55,0]);for(const _ of[-1,1])n.seg(P.add(A,[_*.04,-.08,h[2]+.03]),P.add(A,[_*.04,.1,h[2]+.03]),.025,.025,c.STRAW,{group:14})}const x=[2.05,ln-.05,.3],v=[.85,.05,.62];n.box(x,v,c.WOOD,{round:.02,group:15,paint:y=>(y[2]-x[2]+2)*9%1<.12?c.BARKD:void 0});for(const[y,A]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([y,ln-.1,A],[y,ln-.7,A*.3],.04,.04,c.WOOD,{group:16});const b=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let y=0;y+1<b.length;y++){const[A,_]=[b[y],b[y+1]],S=Math.ceil(Math.hypot(_[0]-A[0],_[1]-A[1])/.32);n.seg([A[0],ln+.42,A[1]],[_[0],ln+.42,_[1]],.025,.025,c.WOOD,{group:17});for(let R=0;R<=S;R++){const T=R/S,L=A[0]+(_[0]-A[0])*T,O=A[1]+(_[1]-A[1])*T;n.seg([L,ln,O],[L,ln+.42,O],.02,.02,c.WOOD,{group:17})}}const w=h5;n.box([w[0],w[1]+js-.02,w[2]],[.2,.025,.2],c.CLOTH,{round:.02,group:18,paint:y=>Math.floor((y[2]+2)*10)%2?c.BODY2:void 0}),n.box([w[0]-.2,w[1]+js+.22,w[2]],[.025,.24,.2],c.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:y=>Math.floor((y[2]+2)*10)%2?c.BODY2:void 0});for(const[y,A]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([w[0]+y,w[1],w[2]+A],[w[0]-y*.6,w[1]+js-.03,w[2]-A*.2],.015,.015,c.FRAME,{group:19});for(const[y,A,_]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([y,ln,A],[y,ln+.2*_,A],.1*_,.13*_,c.EAR,{group:20}),n.ell([y,ln+.3*_,A],[.16*_,.14*_,.16*_],c.LEAF2,{group:21,rough:.02,paint:S=>t(Math.floor(S[0]*30),Math.floor(S[1]*30))<.25?c.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],c.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:y=>Math.floor((y[2]+2)*5)%2?c.BODY2:void 0});for(const y of[.05,.95])n.seg([1.98,3.4,y],[1.98,ln,y],.02,.02,c.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,c.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],c.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const y of[.18,.48])n.seg([1.2,ln-.05,y],[1,.06,y+.12],.018,.018,c.STRAW,{group:25});for(let y=1;y<8;y++){const A=y/8,_=ln-.05-(ln-.11)*A,S=1.2-.2*A;n.seg([S,_,.18+.12*A],[S,_,.48+.12*A],.02,.02,c.WOOD,{group:25})}const E=(y,A,_,S,R)=>{for(let T=0;T<=S;T++){const L=T/S,O=P.lerp(y,A,L);O[1]-=Math.sin(L*Math.PI)*_,R(O,T)}};return E([-.55,3.95,.45],[1.95,3.42,1],.35,9,(y,A)=>{n.ell(y,[.035,.035,.035],ol[A%4],{group:26+A%2,extra:!0})}),E([-.75,4.7,.42],[1.6,3.65,1],.2,7,(y,A)=>{n.ell(y,[.03,.03,.03],ol[(A+2)%4],{group:28+A%2,extra:!0})}),E([2.88,ln+.45,.9],[2.88,ln+.45,-.3],.08,5,(y,A)=>{n.ell(y,[.03,.03,.03],ol[(A+1)%4],{group:30+A%2,extra:!0})}),E([-2,2.8,.1],[-.9,3.6,.5],.15,5,(y,A)=>{n.box(y,[.05,.06,.01],[c.ACCENT,c.BODY2,c.CLOTH][A%3],{dir:[1,0,.2],round:.005,group:32+A%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,ln+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],c.NOSE,{group:0}),{m:n,lights:e,seat:[w[0],w[1],w[2]],door:P.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function d5(n={},{facing:e="towards",ppm:t=16}={}){const i=u5(),s=xn(i.m,{scale:mr(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let g=0;g<r.w;g++)r.m[M*r.w+g]&&(a=Math.min(a,g),o=Math.max(o,g),h=Math.min(h,M));const l=new pt(o-a+1,r.h-h);for(let M=0;M<l.h;M++)for(let g=0;g<l.w;g++){const x=(M+h)*r.w+g+a;r.m[x]&&l.put(g,M,r.m[x],r.n[x*3],r.n[x*3+1],r.n[x*3+2])}const d=M=>{const[g,x]=s.project(M);return[+(g-a).toFixed(1),+(x-h).toFixed(1)]},f=Math.round(d([0,i.splitY,0])[1]),u=new pt(l.w,l.h),m=new pt(l.w,l.h);for(let M=0;M<l.h;M++)for(let g=0;g<l.w;g++){const x=M*l.w+g,v=l.m[x];v&&(l5.has(v)||M<f?u:m).put(g,M,v,l.n[x*3],l.n[x*3+1],l.n[x*3+2])}const p=M=>{const[g,x]=d(M);return{x:g,y:x}};return{whole:l,top:u,bot:m,crownY:f,anchors:{base:p([0,0,-.2]),seat:p(i.seat),door:p(i.door),lights:i.lights.map(M=>({...p(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(l.h/t).toFixed(1),width:+(l.w/t).toFixed(1)}}}const $t=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Lt=(n,e,t=0)=>$t(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Gt=(n=.2,e=.15)=>t=>{const i=Lt(t,16,3);return Lt(t,6,5)<e&&t[1]>.1?c.MOSS:i>1-n*.7?c.BODY2:void 0},Xt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=$t(s,o)*6.283,l=t*Math.sqrt($t(o,s));n.ell([r+Math.cos(h)*l,.07,a+Math.sin(h)*l*.7],[.07,.1+$t(o,4)*.08,.07],c.LEAF2,{group:i+o%3,paint:d=>d[1]>.13?c.LEAF:void 0})}},Pa=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...P.add(e,P.add(P.mul(a,.25*i),[0,.2*i,0])),.025*i],[...P.add(e,P.add(P.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?c.LEAF:c.LEAF2,{group:t})}},li=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[($t(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,c.LEAF,{group:i,paint:a=>Lt(a,30)<.3?c.LEAF2:void 0})},ao=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:s=>{const r=Lt(s,10,2);return s[1]<e[1]-.15||r<.2?c.LEAF3:r>.8?c.LEAF2:void 0}}),et=(n,e,t,i,s=.025,r=c.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Gt(.35,.05)}),fr=(n,e,t,i,s=c.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function yi(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(f,u,m,p)=>{const M=Math.cos(u),g=Math.sin(u),x=[...f];return x[m]=f[m]*M-f[p]*g,x[p]=f[m]*g+f[p]*M,x},o=f=>a(a(a(f,s,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-s,1,2),l=f=>P.add(o(f),r),d=f=>h(P.sub(f,r));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=l(f.a),f.b=l(f.b)):(f.c=l(f.c),f.axes=f.axes.map(o)),f.paint){const u=f.paint;f.paint=(m,p)=>u(d(m),p)}}function ll(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],c.BODY,{round:.14,group:e,paint:h=>{const l=Gt(.3,.12)(h);return l||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?c.MAGIC2:c.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?c.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],c.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?Lt(h,9)<.25?c.STONED:c.SHADES:Gt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const l of[-.66,.66])n.ell([h,.3,l],[.3,r?.22:.3,.1],c.BODY3,{group:e+1,paint:d=>Math.hypot(d[0]-h,d[1]-.3)<.12?c.FRAME:void 0});if(s)for(const h of[-.45,.45])fr(n,[t+.05,o+a*.2,h],.07,e+2,c.MAGIC2)}const f5={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;ll(n,1),yi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],c.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?c.MOSS:void 0}),Pa(n,[.9,.2,.8],5),Pa(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],c.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){ll(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],c.TRUNK,{group:4,rough:.015}),ao(n,[.3,3.4,-.1],[1.1,.7,.9],5),li(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Xt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;ll(n,1),yi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])Pa(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Lu(n,1),ao(n,[.05,.65,0],[.32,.28,.26],3),yi(n,e,{roll:1.35,at:[0,.32,0]}),Xt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Lu(n,1),n.ell([0,.78,0],[.2,.08,.17],c.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?c.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],c.BELLY,{group:4});Xt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Nr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Nr(n,[0,0,0],1),Nr(n,[.5,0,.2],4);const e=n.parts.length;Nr(n,[0,0,0],7),yi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Xt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Nr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,P.add(i,[0,.08,0]),.02,.02,c.CLOTH,{group:5}),n.ell(P.add(i,[0,.1,0]),[.06,.035,.06],c.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],c.STONE,{round:.03,group:1,rough:.01,paint:t=>Lt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?c.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Lt(t,12)<.3?c.STONE:c.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?c.BELLY:t[1]>.1&&Lt(t,6,4)<.12?c.MOSS:void 0});for(const t of[-1.6,-.4])et(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],c.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?c.STONED:Gt(.5,.1)(t)}),yi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],c.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?c.MOSS:void 0}),Xt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],c.STONE,{round:.02,group:1,paint:e=>Lt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Lt(e,20)<.4?c.LEAF2:c.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?c.CLOTH:Lt(e,6)<.08?c.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Xt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){et(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],c.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?c.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?c.FRAME:Gt(.2,.1)(e)}}),Xt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],c.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?c.SHADES:Gt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],c.ACCENT,{round:.06,group:2,paint:Gt(.3,.3)}),li(n,[.43,0,.3],[.4,1.9,.43],3,8),li(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Xt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],c.FRAME,{group:1,paint:Gt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],c.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],c.SHADES,{group:2}),li(n,[0,0,.06],[.05,1.5,.06],3,10),Xt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Lt(t,6,5)<.25&&t[1]>.4?c.MOSS:Lt(t,14)>.9?c.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],c.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],c.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],c.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],c.CLOTH,{round:.08,group:4,paint:e});Xt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],c.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?c.SHADES:c.FRAME:Gt(.25,.15)(e)}),Pa(n,[0,.4,.4],2,.55),Xt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;et(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])et(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],c.SHADES,{group:4}),et(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],c.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],c.BELLY,{group:1,paint:Gt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],c.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],c.WATER,{group:2}),et(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],c.BODY3,{group:4,dir:[1,.3,0]}),n.ell(P.add(e,[.1,.07,0]),[.05,.05,.045],c.BODY3,{group:4}),n.seg(P.add(e,[.14,.07,0]),P.add(e,[.2,.04,0]),.012,.004,c.ACCENT,{group:4}),Xt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],c.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?c.SHADES:Gt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],c.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Gt(.25,.15)});for(let e=0;e<7;e++)fr(n,[($t(e)-.5)*.4,.4+$t(e,2)*1,.2+$t(e,3)*.3],.03,10+e,e%2?c.MAGIC:c.MAGIC2);li(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Lu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])et(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;et(n,P.lerp(t[0],t[1],s),P.lerp(t[4],t[5],s),e,.008),et(n,P.lerp(t[3],t[2],s),P.lerp(t[7],t[6],s),e,.008)}et(n,t[4],[-.45,.95,-.28],e,.015),et(n,t[7],[-.45,.95,.28],e,.015),et(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,c.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])et(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],c.BODY3,{group:e+1})}function Nr(n,e,t,i=!1){n.box(P.add(e,[0,.03,0]),[.24,.03,.24],c.ACCENT,{round:.02,group:t,paint:Gt(.15,.2)}),n.seg(P.add(e,[0,.05,0]),P.add(e,[0,.72,0]),.2,.03,c.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?c.MAGIC2:c.CLOTH:i&&Lt(s,18)<.2?c.GLOW:Gt(.15,.1)(s)}),i&&fr(n,P.add(e,[0,.78,0]),.05,t+2,c.MAGIC2)}const p5={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])et(n,[e,0,t],[e*.95,2.1,0],1,.045);et(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])et(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],c.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)fr(n,[-.42+($t(e)-.5)*.5,.6+$t(e,2)*.7,($t(e,3)-.5)*.3],.025,10+e);et(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),et(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],c.BODY3,{round:.02,group:5,dir:[1,0,.5]}),li(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Xt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])et(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)et(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],c.FRAME,{group:2,paint:Gt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],c.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?c.FRAME:Gt(.35,.15)(e)});for(let e=0;e<10;e++){const t=$t(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+$t(e)*.5,Math.sin(t)*.3,.025],[.1+$t(e,4)*.6,.7+$t(e,5)*.4,($t(e,6)-.5)*.4,.015]],c.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+$t(e,7)*.6,.5+$t(e,8)*.4,($t(e,9)-.5)*.5],[.2,.14,.16],c.LEAF,{group:7,rough:.03,paint:i=>Lt(i,30)<.1?c.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,c.TRUNK,{group:8}),ao(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],c.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?c.FRAME:Gt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;et(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),et(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}yi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],c.MOSS,{group:4}),Xt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],c.FRAME,{round:.02,group:1,paint:Gt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],c.WOOD,{round:.02,group:2,paint:t=>Lt(t,8)<.2?c.MOSS:void 0});for(const t of[-1.05,1.05])et(n,[t,.03,-.12],[t,.03,.12],3,.02);yi(n,e,{pitch:.32,at:[0,.42,0]}),Xt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)et(n,t(i,s),t(i,s+1),1,.025),et(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)li(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Xt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,c.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],c.BODY,{group:2,paint:Gt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],c.BODY,{group:2,paint:Gt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],c.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],c.SHADES,{group:3}),et(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],c.STONE,{group:5}),Xt(n,8,.8,6,19)}}},m5=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function g5(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>Lt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?Lt(a,18)<.5?c.LEAF2:c.STONED:s(a[0],a[2])?Lt(a,10,2)<.25?i:c.CLOTH:Lt(a,5,7)<.07?c.MOSS:void 0})}const ri=(n,e,t=.045)=>Math.abs(n-e)<t,x5={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){g5(n,4.4+.5,2+.5,c.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(ri(Math.abs(i),4.4)||ri(Math.abs(s),2)||ri(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(ri(s,0)||ri(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])et(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],c.CLOTH,{group:2,paint:e=>e[1]>.5?c.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?c.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],c.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])et(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)et(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],c.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],c.WOOD,{group:2}),yi(n,e,{roll:.25,pitch:-.1}),Xt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])et(n,[e,0,0],[e,1.7,0],1,.03);et(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],c.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Lt(e,5)<.15?c.BODY2:c.FRAME:c.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],c.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)li(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)fr(n,[($t(e)-.5)*1.2,.06,($t(e,2)-.5)*.8],.06,1+e,e%2?c.MAGIC:c.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],c.LEAF3,{group:9}),Xt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],c.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Lt(t,8)<.2?c.LEAF2:c.BARK2:i<=.78?Lt(t,6)<.15?c.MOSS:void 0:Lt(t,6,3)<.3?c.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],c.BELLY,{group:2,round:.02,paint:s=>Lt(s,20)<.3?c.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],c.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;et(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=P.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],c.FRAME,{dir:P.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?Lt(o,5)<.2?c.BODY2:c.FRAME:c.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],c.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],c.WOOD,{group:3});li(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])et(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)$t(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],c.HAT1,{group:2+e,round:.01,paint:Gt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],c.FRAME,{group:5}),li(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],c.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(ri(Math.abs(s),5.2,.06)||ri(Math.abs(r),3.3,.06)||ri(s,0,.06)||ri(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(ri(Math.abs(s),5.2-1,.06)||ri(Math.abs(r),1.6,.06)))?Lt(i,8,2)<.3?c.LEAF2:c.CLOTH:Math.floor((s+20)*.8)%2?Lt(i,6)<.25?c.LEAF2:c.LEAF:Lt(i,5,9)<.1?c.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Pu(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,c.TRUNK,{group:5}),ao(n,[.3,1.6,.2],[.35,.25,.3],6),Xt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Pu(n,1),yi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Xt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){et(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],c.ACCENT,{group:2,dir:[1,-.3,.1],paint:Gt(.2,0)}),Xt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])et(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;et(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),et(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],c.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?c.MAGIC2:c.SHADES:Gt(.4,.1)(s)});fr(n,[0,4+.45,.22],.06,4,c.MAGIC2),li(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;et(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],c.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?c.ACCENT:Gt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;et(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,c.ACCENT)}yi(n,e,{pitch:-.2}),Xt(n,8,1,5,31)}}};function Pu(n,e){for(const t of[-1.4,1.4])et(n,[0,0,t],[0,1,t],e,.035,c.BELLY);et(n,[0,1,-1.4],[0,1,1.4],e,.035,c.BELLY);for(const t of[-1.4,1.4])et(n,[0,1,t],[-.6,0,t],e+1,.02,c.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],c.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?c.CLOTH:c.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],c.CLOTH,{group:e+2,cut:!0})}const M5={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function v5(n={},e=16){const t=s=>mr(n)*cf[s].size/e,i=s=>s.map(([r,a,o])=>({id:r,x:+(a*t(r)).toFixed(1),z:+(o*t(r)).toFixed(1)}));return{playground:i(m5),...Object.fromEntries(Object.entries(M5).map(([s,r])=>[s,i(r)]))}}const lf=[...Object.entries(f5).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(p5).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(x5).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],cf=Object.fromEntries(lf.map(n=>[n.id,n]));function b5(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[c.BODY]:[92,118,140],[c.BODY2]:[132,74,42],[c.BODY3]:[34,32,38],[c.FRAME]:[150,152,158],[c.SHADES]:[24,24,30],[c.STONE]:[72,72,80],[c.STONED]:[34,34,40],[c.CLOTH]:[214,210,196],[c.BELLY]:[222,218,206],[c.ACCENT]:[214,92,40],[c.HAT1]:[54,84,120],[c.HAT2]:[86,112,92],[c.MOSS]:de(.26,.45,.45),[c.TRUNK]:de(t,.45,.36),[c.BARK2]:[98,74,52],[c.BARKD]:de(t+.03,.5,.17),[c.LEAF]:de(e,.55,.45),[c.LEAF2]:de(e-.03,.5,.6),[c.LEAF3]:de(e+.03,.6,.28),[c.WOOD]:[120,88,56],[c.STRAW]:[180,156,104],[c.WATER]:[44,70,96],[c.NOSE]:[14,12,18],[c.GLOW]:[255,170,80],[c.MAGIC]:de(n.magicHue??.2,.55,1),[c.MAGIC2]:de(n.magicHue??.2,.15,1),[c.LINE]:[24,22,30]}}function _5(n,e={},{ppm:t=16}={}){const i=cf[n];if(!i)throw new Error(`no relic "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],c.NOSE,{group:0});const r=mr(e)*i.size,{sp:a,project:o}=xn(s,{scale:r});let h=0;for(const A of s.parts){if(A.extra||A.cut)continue;const _=A.type==="cone"?[[A.a,A.r1],[A.b,A.r2]]:[[A.c,A.r?Math.max(...A.r):Math.max(A.h[0],A.h[2])]];for(const[S,R]of _)S[1]-R<.3&&(h=Math.max(h,Math.hypot(S[0],S[2])+R))}let l=a.w,d=-1,f=a.h;for(let A=0;A<a.h;A++)for(let _=0;_<a.w;_++)a.m[A*a.w+_]&&(l=Math.min(l,_),d=Math.max(d,_),f=Math.min(f,A));const u=d-l+1,m=a.h-f,p=new pt(u,m),M=new pt(u,m),g=new pt(u,m),x=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-f);for(let A=0;A<m;A++)for(let _=0;_<u;_++){const S=(A+f)*a.w+_+l,R=a.m[S];if(!R)continue;const T=[a.n[S*3],a.n[S*3+1],a.n[S*3+2]];p.put(_,A,R,...T),(A<x?M:g).put(_,A,R,...T)}p.bodyH=a.bodyH;const v=r/t,[b,w]=o([0,0,0]),E=+(b-l).toFixed(1),y=+(w-f).toFixed(1);return{whole:p,top:M,bot:g,crownY:x,origin:{x:E,y},metres:{width:+(u/t).toFixed(1),height:+(m/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const Yt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},ui=(n,e,t=0)=>Yt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),mc=n=>{const e=ui(n,12);return e<.14?c.BARKD:e>.88?c.BARKL:void 0},y5=n=>e=>{const t=ui(e,10,3);return e[1]<n[1]-.2||t<.2?c.LEAF3:t>.8?c.LEAF2:void 0},yn=(n,e=0)=>t=>{const i=ui(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&ui(t,3,1)<(n?.75:.45)?c.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?c.STONED:void 0},vt=(n,e,t,i,s,r={})=>n.box(e,t,c.STONE,{round:.03,rough:.012,group:i,paint:yn(s,r.courses??5),...r}),Pn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...P.add(P.lerp(e,t,o),[(Yt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,c.LEAF,{group:i,rough:.02,paint:a=>ui(a,30)<.3?c.LEAF2:void 0})},Fi=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Yt(s,r)*6.283,o=t*Math.sqrt(Yt(r,s)),h=Math.cos(a)*o,l=Math.sin(a)*o*.7;n.ell([h,.08,l],[.07,.1+Yt(r,4)*.08,.07],c.LEAF2,{group:i+r%3,paint:d=>d[1]>.14?c.LEAF:void 0})}},bi=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:y5(e)}),Un=(n,e,t)=>n.chain(e,c.TRUNK,{group:t,rough:.012,paint:mc}),Dn=(n,e,t,i,s={})=>n.ell(e,t,c.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&ui(r,5,i)<.7?c.MOSS:ui(r,14)>.9?c.STONED:void 0}),Du=(n,e,t,i,s=c.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),w5={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])vt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];vt(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?c.RUNE:yn(e)(r)):yn(e)})}for(let t=0;t<4;t++)vt(n,[1.3+t*.3,.14,.4+Yt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Yt(t,2)-.5),Yt(t,3)-.5],courses:0});e&&(Pn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Fi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||vt(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;vt(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)vt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Pn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Pn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],c.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){vt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,c.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?c.STONED:yn(e,0)(s)}),vt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,c.STONE,{group:4,paint:yn(e,0)});vt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Pn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Fi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Yt(t,9)*(t%3===0?1.2:.45);vt(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Yt(t)-.5),Math.cos(i)],courses:0,round:.07})}vt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Fi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){vt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:yn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],c.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],c.MAGIC2,{group:2,extra:!0,paint:t=>ui(t,18)<.5?c.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])vt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)vt(n,[-1.2+t*.6,.12,.55+Yt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Yt(t,5)-.5]});e&&(Pn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Pn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;vt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],c.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],c.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,c.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,c.STRAW,{group:5});for(let t=0;t<4;t++)Du(n,[(Yt(t)-.5)*.8,.8+Yt(t,2)*.7,(Yt(t,3)-.5)*.6],.03,10+t,t%2?c.MAGIC:c.MAGIC2);e&&(Pn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Fi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){vt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?c.NOSE:yn(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])vt(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],c.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)vt(n,[.5+Yt(t)*1.2,.13,-.3+Yt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Yt(t,5)-.5]});e&&(Pn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Pn(n,[.3,.1,.72],[.5,1.8,.72],5,13),bi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])vt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)vt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],c.NOSE,{group:3}),vt(n,[-1.1,.55,0],[.15,.55,.62],4,e),vt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Fi(n,12,1.6,10,14),Pn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],c.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:yn(e,0)}),n.ell(s(.3,0),[.62,.14,.16],c.STONE,{group:2,paint:yn(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],c.STONED,{group:1,cut:!0}),Du(n,s(.12,r),.05,3+(r>0?1:0),c.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],c.STONE,{group:5,paint:yn(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],c.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?c.STONED:yn(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],c.STONE,{group:7,rough:.02,paint:yn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],c.STONE,{group:8,paint:yn(e,0)}),e&&(Fi(n,14,1.8,10,16),bi(n,P.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){vt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],c.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])vt(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,c.BARKD,{group:3});e&&(Pn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Fi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){vt(n,[-.9,.7,0],[.35,.7,.5],1,e),vt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];vt(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}vt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])vt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Pn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Fi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])vt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?c.RUNE:yn(e,5)(i)):yn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],c.STONE,{group:3,paint:yn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,c.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,c.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)vt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Pn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Pn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Fi(n,12,1.6,10,23))}}},S5={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Dn(n,[(Yt(e)-.5)*.6,.04,(Yt(e,2)-.5)*.4],[.07+Yt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Dn(n,[-.15,.12,0],[.22,.15,.2],1),Dn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Dn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Dn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Dn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,c.TRUNK,{group:3}),bi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Dn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Dn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Dn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Dn(n,[-1.1,.3,.6],[.4,.35,.35],2),Dn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],c.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&ui(e,6)<.3?c.MOSS:ui(e,14)>.9?c.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Dn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Dn(n,[.35,.1,.25],[.15,.1,.14],2)}}},E5={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}Un(n,e,1),bi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Un(n,e,1),bi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Un(n,[[0,0,0,.3],[0,.9,0,.26]],1),Un(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Un(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],c.BARKD,{group:1,cut:!0}),bi(n,[-1,2.7,0],[.6,.45,.5],4),bi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],c.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?c.BARKD:c.ACCENT:c.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?c.BARKD:c.GLOW:mc(e)}),n.ell([.12,.45,.72],[.03,.03,.03],c.FRAME,{group:2}),bi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Un(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,c.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?c.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],c.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?c.BODY2:ui(e,8)<.18?c.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],c.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?c.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Un(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Un(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Yt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Yt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Un(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Un(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Un(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Dn(n,[e,i,t],[.3,.24,.26],3);bi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],c.TRUNK,{group:1,rough:.02,paint:mc})}Un(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Un(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])bi(n,[e,t,-.1],[.45,.3,.35],3)}}},hf=[...Object.entries(w5).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(S5).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(E5).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],A5=Object.fromEntries(hf.map(n=>[n.id,n]));function T5(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[c.STONE]:s([128,126,134]),[c.STONED]:s([64,62,72]),[c.MOSS]:de(.26,.45,.45),[c.TRUNK]:de(i,.45,.36),[c.BARKD]:de(i+.03,.5,.17),[c.BARKL]:de(i,.35,.55),[c.LEAF]:de(t,.55,.45),[c.LEAF2]:de(t-.03,.5,.62),[c.LEAF3]:de(t+.03,.6,.26),[c.WOOD]:[120,88,56],[c.STRAW]:[180,156,104],[c.SHADES]:[70,46,36],[c.FRAME]:[190,160,90],[c.NOSE]:[14,12,18],[c.CLOTH]:[226,216,196],[c.BELLY]:[240,236,226],[c.ACCENT]:[176,52,60],[c.BODY2]:[150,110,90],[c.WATER]:[44,70,96],[c.RUNE]:[120,230,255],[c.MAGIC]:de(n.magicHue??.45,.6,1),[c.MAGIC2]:de(n.magicHue??.45,.2,1),[c.GLOW]:[255,190,96],[c.LINE]:[24,22,30]}}function R5(n,e={},{variant:t=0,ppm:i=16}={}){const s=A5[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new qe({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],c.NOSE,{group:0});const a=mr(e)*s.size,{sp:o,project:h}=xn(r,{scale:a});let l=0;for(const w of r.parts){if(w.extra)continue;const E=w.type==="cone"?[[w.a,w.r1],[w.b,w.r2]]:[[w.c,w.r?Math.max(...w.r):Math.max(w.h[0],w.h[2])]];for(const[y,A]of E)y[1]-A<.3&&(l=Math.max(l,Math.hypot(y[0],y[2])+A))}let d=o.w,f=-1,u=o.h;for(let w=0;w<o.h;w++)for(let E=0;E<o.w;E++)o.m[w*o.w+E]&&(d=Math.min(d,E),f=Math.max(f,E),u=Math.min(u,w));const m=f-d+1,p=o.h-u,M=new pt(m,p),g=new pt(m,p),x=new pt(m,p),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let w=0;w<p;w++)for(let E=0;E<m;E++){const y=(w+u)*o.w+E+d,A=o.m[y];if(!A)continue;const _=[o.n[y*3],o.n[y*3+1],o.n[y*3+2]];M.put(E,w,A,..._),(w<v?g:x).put(E,w,A,..._)}const b=a/i;return{whole:M,top:g,bot:x,crownY:v,metres:{width:+(m/i).toFixed(1),height:+(p/i).toFixed(1),footprint:+(l*b).toFixed(1)}}}const mn=16,cn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},zi=[0,-.42,.9],nn=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,l=r-o,d=i?Math.round(i*t):0,f=p=>d?(p%d+d)%d:p,u=(p,M)=>cn(p,f(M)),m=p=>p*p*(3-2*p);return(u(a,o)*(1-m(h))+u(a+1,o)*m(h))*(1-m(l))+(u(a,o+1)*(1-m(h))+u(a+1,o+1)*m(h))*m(l)};function Iu(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let l=9,d=9,f=0;for(let u=-1;u<=1;u++)for(let m=-1;m<=1;m++){const p=a+m,M=o+u,g=(M%h+h)%h,x=p+cn(p,g*3+1),v=M+cn(p*7+2,g),b=Math.hypot(x-s,v-r);b<l?(d=l,l=b,f=cn(p,g)):b<d&&(d=b)}return{edge:d-l,id:f}}const fs=(n,e,t,i=.14)=>Math.abs(n)>1-i*nn(n>0?3:7,e,1.4,t)*1.6,Mo={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(fs(n,e,4,.3))return 0;const i=nn(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?c.LEAF2:c.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&nn(n*2,e,.9,4)>.68?[c.WATER,0]:[s?i<.5?c.BARK2:c.BARKD:i<.3?c.BARK2:i>.8?c.LEAF3:c.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(fs(n,e,4,.5))return 0;const i=nn(n*2,e,3,4);return i<.35?0:[i>.75?c.BARK2:c.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(fs(n,e,4,.1))return 0;const i=Iu(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[c.MOSS,.1]:i.id<.08?0:[i.id<.25?c.STONED:nn(n,e,4,4)<.2?c.MOSS:c.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(fs(n,e,4,.08))return 0;const i=Iu(n*2,e,2.2,4);return i.edge<.16?[nn(n,e,3,4)<.3?c.MOSS:c.STONED,.05]:[i.id<.2?c.STONED:i.id>.85?c.BELLY:c.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(cn(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+nn(n,e,4,4)*.1?0:[o>.45?c.MOSS:c.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[c.BARKD,.1];if(cn(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[nn(n,e,3,4)<.15?c.MOSS:r?c.BARKD:cn(i%8,5)<.4?c.BARK2:c.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(fs(n,e,8,.06))return 0;const s=nn(n*4,e,1.1,8);return Math.abs(nn(n*6,e,.7,8)-.5)<.02||Math.abs(nn(n*3+9,e,1.6,8)-.5)<.012?[nn(n,e,6,8)<.5?c.LEAF2:c.STONED,0]:Math.abs(n)>.9?[s<.5?c.LEAF2:c.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[c.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[c.BELLY,.05]:[s<.2?c.MOSS:s>.85?c.STONED:c.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=nn(n*3,e,2.5,4),a=[0,.35,.6][i];if(fs(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[nn(n,e,8,4)<a*.5?c.LEAF2:o<.018?c.FRAME:c.SHADES,.3];const h=Math.floor(e*6/4),l=e*6/4-h;return Math.abs(n)<.55&&l<.38&&nn(n,e,6,4)>a*.8?[cn(h%6,2)<.25||l<.06||l>.32?c.BARKD:c.BARK2,.2]:r<a?[r<a*.5?c.LEAF:c.LEAF2,.1]:[r>.7?c.STONED:c.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(fs(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+nn(n,e,3,4)*.06?[Math.abs(r-.5)<.05?c.BARKL:c.TRUNK,.6]:[nn(n,e,2,4)<.4?c.BARKD:c.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?c.MAGIC2:c.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[c.RUNE,0]:Math.abs(n)<.4&&nn(n,e,3,4)>.62?[c.LEAF3,.1]:0}}};function cl(n,e,t){const i=new pt(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],zi[0]+(a[1]?(cn(r,s)-.5)*a[1]:0),zi[1]+(a[1]?(cn(s,r)-.5)*a[1]*.5:0),zi[2])}return i}function C5(n,{variant:e=0}={}){const t=Mo[n],i=Math.round(t.width*mn),s=Math.round(t.period*mn);t.width/2;const r=(u,m,p)=>t.surface(u,m,p,e),a=cl(i,s,(u,m)=>r(u/i*2-1,m/mn)),o=Math.round(Math.max(1.5,t.width*.8)*mn),h=cl(i,o,(u,m)=>{const p=m/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(p));return Math.abs(M)>1||nn(u/mn,m/mn,2)>.25+p?0:r(M,m/mn)}),l=Math.round(t.width*2.4*mn),d=l/2,f=u=>cl(l,l,(m,p)=>{let M=null;for(const g of u){const x=Math.cos(g),v=Math.sin(g),b=(m-d)*x+(p-d)*v,w=-(m-d)*v+(p-d)*x;if(b<-t.width*mn*.5)continue;const E=w/(i/2);Math.abs(E)<=1&&(!M||Math.abs(E)<Math.abs(M.u))&&(M={u:E,v:(d-b)/mn})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(m-d,p-d)<i*.6):0});return{strip:a,end:h,y:f([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:f([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}function Ou(n,e,{variant:t=0,pad:i=2}={}){const s=Mo[n],r=s.width/2,a=Array.isArray(e[0][0])?e:[e],o=a.flat(),h=o.map(g=>g[0]),l=o.map(g=>g[1]),d=Math.min(...h)-r-i,f=Math.min(...l)-r-i,u=Math.ceil((Math.max(...h)+r+i-d)*mn),m=Math.ceil((Math.max(...l)+r+i-f)*mn),p=[];for(const g of a){let x=0;for(let v=0;v+1<g.length;v++){const b=g[v],w=g[v+1],E=Math.hypot(w[0]-b[0],w[1]-b[1]);p.push({a:b,b:w,l:E,s:x,first:v===0,last:v+2===g.length}),x+=E}}const M=new pt(u,m);for(let g=0;g<m;g++)for(let x=0;x<u;x++){const v=d+(x+.5)/mn,b=f+(g+.5)/mn;let w=null;for(const y of p){const A=y.b[0]-y.a[0],_=y.b[1]-y.a[1],S=((v-y.a[0])*A+(b-y.a[1])*_)/(y.l*y.l);if(S<0&&y.first||S>1&&y.last)continue;const R=Math.max(0,Math.min(1,S)),T=y.a[0]+A*R,L=y.a[1]+_*R,O=Math.hypot(v-T,b-L);O<=r&&(!w||O<w.d)&&(w={d:O,u:((v-T)*-_+(b-L)*A)/y.l/r,v:y.s+R*y.l})}if(!w)continue;const E=s.surface(w.u,(w.v%s.period+s.period)%s.period,!1,t);E&&M.px(x,g,E[0],zi[0],zi[1],zi[2])}return{sp:M,origin:[-d*mn,-f*mn]}}function L5({variant:n=0,length:e=16,radius:t=30}={}){const i=[[0,0],[e,0]],s=[];for(let f=0;f<=12;f++){const u=f/12*(e/t);s.push([Math.sin(u)*t,(1-Math.cos(u))*t])}const r=Ou("railway",i,{variant:n,pad:0}),a=Ou("railway",s,{variant:n,pad:0}),o=Math.max(r.sp.w,a.sp.w+Math.round(a.origin[0]-r.origin[0])),h=Math.max(r.origin[1],a.origin[1]),l=Math.max(r.sp.h-r.origin[1],a.sp.h-a.origin[1])+h,d=new pt(o,Math.ceil(l));for(const f of[a,r])for(let u=0;u<f.sp.h;u++)for(let m=0;m<f.sp.w;m++){const p=f.sp.m[u*f.sp.w+m];if(!p)continue;const M=m+Math.round(r.origin[0]-f.origin[0]),g=u+Math.round(h-f.origin[1]);d.inb(M,g)&&!(d.m[g*o+M]===c.FRAME&&p!==c.FRAME)&&d.px(M,g,p,zi[0],zi[1],zi[2])}return d}const pn=(n,e,t=0)=>cn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),vi=(n=.25,e=.15)=>t=>{const i=pn(t,16,3);return pn(t,6,5)<e&&t[1]>.1?c.MOSS:i>1-n*.7?c.BODY2:void 0},Mi=(n,e,t,i,s=.025,r=c.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:vi(.4,.05)}),Nu=(n,e,t,i)=>n.ell(e,t,c.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&pn(s,5,i)<.6?c.MOSS:pn(s,14)>.9?c.STONED:void 0}),ps=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=cn(s,r)*6.283,o=t*Math.sqrt(cn(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+cn(r,4)*.08,.07],c.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?c.LEAF:void 0})}},hl=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:s=>{const r=pn(s,10,2);return s[1]<e[1]-.15||r<.2?c.LEAF3:r>.8?c.LEAF2:void 0}}),Da=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(cn(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,c.LEAF,{group:i,paint:a=>pn(a,30)<.3?c.LEAF2:void 0})};function Fu(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(d,f,u,m)=>{const p=Math.cos(f),M=Math.sin(f),g=[...d];return g[u]=d[u]*p-d[m]*M,g[m]=d[u]*M+d[m]*p,g},a=d=>r(r(d,i,1,2),t,0,1),o=d=>r(r(d,-t,0,1),-i,1,2),h=d=>P.add(a(d),s),l=d=>o(P.sub(d,s));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(a)),d.paint){const f=d.paint;d.paint=(u,m)=>f(l(u),m)}}const P5={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],c.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?c.SHADES:vi(.1,.2)(t)}),Fu(n,e,{roll:.15,pitch:.1}),ps(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],c.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],c.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Nu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,c.WOOD,{group:1,paint:e=>e[1]<.12?c.MOSS:e[1]>.5?c.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,c.TRUNK,{group:1}),hl(n,[0,.95,0],[.22,.18,.2],2),ps(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(cn(e)-.5)*.3,0,(cn(e,2)-.5)*.2],i=.08+cn(e,3)*.1;n.seg(t,P.add(t,[0,i,0]),.015,.012,c.CLOTH,{group:1}),n.ell(P.add(t,[0,i+.02,0]),[.05,.03,.05],c.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?c.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],c.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?c.RUNE:e[1]>.32?c.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){Mi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],c.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?c.BELLY:vi(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],c.SHADES,{group:3}),Da(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],c.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&pn(t,6,e)<.35?c.MOSS:pn(t,14)>.9?c.STONED:void 0});for(const e of[-.7,.7])Nu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],c.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>pn(t,6,e)<.3&&t[1]>.2+e*.4?c.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],c.STONE,{round:.03,group:3,paint:e=>pn(e,6)<.3&&e[1]>.6?c.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],c.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],c.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],c.TRUNK,{group:2+e%2,rough:.015,paint:t=>pn(t,12)<.12?c.BARKD:t[1]>.55&&pn(t,5)<.3?c.MOSS:void 0});hl(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],c.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],c.WOOD,{round:.01,group:2+(e&1),paint:s=>pn(s,10)<.15?c.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,c.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],c.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],c.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,c.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],c.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,c.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],c.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?c.SHADES:vi(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],c.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?c.FRAME:void 0});Fu(n,e,{roll:1.4,at:[0,.3,.3]}),ps(n,14,2.2,4,5),Da(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],c.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?pn(e,9)<.2?c.SHADES:c.GLOW:vi(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],c.MOSS,{group:2,paint:e=>pn(e,6)<.3?c.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],c.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],c.TRUNK,{group:4,rough:.015}),hl(n,[.7,3.1,-.1],[1,.6,.8],5),ps(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],c.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?c.BELLY:e[1]>.66&&pn(e,5)<.25?c.MOSS:(e[0]+9)*2.5%1<.06?c.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],c.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],c.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],c.FRAME,{group:2});Mi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],c.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?c.SHADES:void 0}),Da(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),ps(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],c.BELLY,{round:.03,group:1,paint:vi(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],c.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?c.ACCENT:vi(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],c.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?c.ACCENT:vi(.3,.15)(e)}),Mi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],c.BELLY,{dir:[1,e,0],group:5});ps(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])Mi(n,[-.2,0,e],[0,.75,e],1,.05),Mi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,c.FRAME,{group:2,paint:vi(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],c.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],c.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?c.BELLY:vi(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,c.SHADES,{group:4,paint:t=>t[1]>.05?c.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],c.WOOD,{group:5,paint:t=>pn(t,9)<.3?c.MOSS:void 0});ps(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])Mi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;Mi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),Mi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])Mi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])Mi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],c.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?c.FRAME:void 0});Da(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},uf=Object.entries(P5).map(([n,e])=>({id:n,...e})),D5=Object.fromEntries(uf.map(n=>[n.id,n]));function df(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[c.STONE]:[118,116,124],[c.STONED]:[58,56,66],[c.MOSS]:de(.26,.45,.45),[c.BELLY]:[220,216,204],[c.CLOTH]:[208,204,188],[c.BARK2]:[104,80,56],[c.BARKD]:de(t+.03,.5,.17),[c.BODY2]:[128,98,70],[c.BARKL]:de(t,.35,.55),[c.TRUNK]:de(t,.45,.36),[c.LEAF]:de(e,.55,.45),[c.LEAF2]:de(e-.03,.5,.6),[c.LEAF3]:de(e+.03,.6,.28),[c.WOOD]:[128,94,60],[c.STRAW]:[180,156,104],[c.FRAME]:[168,120,92],[c.SHADES]:[26,26,32],[c.ACCENT]:[176,52,46],[c.HAT1]:[66,92,74],[c.WATER]:[44,70,96],[c.NOSE]:[14,12,18],[c.GLOW]:[255,196,110],[c.MAGIC]:de(n.magicHue??.5,.55,1),[c.MAGIC2]:de(n.magicHue??.5,.15,1),[c.RUNE]:[150,240,255],[c.LINE]:[24,22,30]}}function I5(n,e={},t=16){const i=D5[n];if(!i)throw new Error(`no path piece "${n}"`);const s=new qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],c.NOSE,{group:0});const r=mr(e)*1.1,a=xn(s,{scale:r}),o=a.sp;let h=o.w,l=-1,d=o.h;for(let p=0;p<o.h;p++)for(let M=0;M<o.w;M++)o.m[p*o.w+M]&&(h=Math.min(h,M),l=Math.max(l,M),d=Math.min(d,p));const f=new pt(l-h+1,o.h-d);for(let p=0;p<f.h;p++)for(let M=0;M<f.w;M++){const g=(p+d)*o.w+M+h;o.m[g]&&f.put(M,p,o.m[g],o.n[g*3],o.n[g*3+1],o.n[g*3+2])}const[u,m]=a.project([0,0,0]);return{sp:f,origin:{x:+(u-h).toFixed(1),y:+(m-d).toFixed(1)},metres:{width:+(f.w/t).toFixed(1),height:+(f.h/t).toFixed(1)}}}function O5(){const n={};for(const[e,t]of Object.entries(Mo))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const oo=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],N5={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function F5(n=0){const[e,t,i]=N5[oo[n%oo.length].crystal];return{[c.STONE]:[78,80,94],[c.STONED]:[36,36,48],[c.MOSS]:[72,108,58],[c.CRYSTAL]:i,[c.RUNE]:e,[c.GLOW]:e,[c.MAGIC2]:t,[c.WOOD]:[150,96,52],[c.LINE]:[24,24,34]}}function Uu(n,e,t,i){const s=oo[n%oo.length],r=new qe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&ft(_,e,31)<.5;let l=0,d=1,f=.3,u=0,m=n*7;const p=(_,S,R,T)=>L=>{if(T&&Math.abs(Math.sin(L[0]*37+L[1]*23+Math.sin(L[2]*17)*2))<.07)return c.STONED;if(L[1]>_-.02&&(L[2]>S-.06||ft(Math.floor(L[0]*30),Math.floor(L[2]*30),R)<.2)&&ft(Math.floor(L[0]*40),Math.floor(L[2]*40),R+1)<.6)return c.MOSS},M=(_,S,R,T,L,O)=>{const I=h(O),k=1+o*.08;r.ell([_,S,R],[T*1.18,T*1.18,.06],c.STONED,{group:L,cut:!0}),r.ell([_,S,R-.02],[T*k,T*k,.035+o*.025],c.CRYSTAL,{group:900+O,paint:H=>{const K=Math.hypot(H[0]-_,H[1]-S)/(T*k);return I?K<.3?c.GLOW:c.CRYSTAL:K<.2+o*.15?c.MAGIC2:K<.5?c.GLOW:K<.78?c.CRYSTAL:c.GLOW}})},g=(_,S,R,T,L,O,I,k)=>H=>{if(H[0]>_+T-.022){const K=Math.min(R,L)*1.5,ae=(O-L-H[2])/K+.5,q=(S-H[1])/K+.5;if(ae>=0&&ae<=1&&q>=0&&q<=1&&(i?ad(i,ae,q,.065):Ku(ae,q,I,.12)))return a&&ft(I,e,5)<.5?c.STONED:c.RUNE}return k(H)},x=s.tiers,v=x[0][1]*x[0][2][0]+.02,b=.08,w=x[0][2][2];r.box([0,b,f-w],[v,b,w],c.STONE,{group:d,round:.03,rough:.006,paint:p(b*2,f,3,a)}),r.box([0,b*.9,f],[v-.06,b*.45,.12],c.STONED,{group:d,cut:!0,paint:_=>_[2]<f-.07?c.GLOW:void 0});for(let _=1;_<x[0][1];_++)r.box([-v+_*v*2/x[0][1],b*.9,f-.06],[.015,b*.45,.06],c.STONE,{group:d});l=b*2,d++;const E=[];x.forEach(([_,S,[R,T,L]],O)=>{const I=_==="tweet"?.09:0,k=S*R*2+(S-1)*(_==="tweet"?.14:.01),H=f-O*.035,K=l+I+T;for(let ae=0;ae<S;ae++){const q=-k/2+R+ae*(R*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&ae===S-1){E.push([q,R,T,L]);continue}const ie=a&&_==="tweet"?[1,.12*(ae%2?1:-1),0]:void 0,N=a&&_==="tweet"?K-.04:K,ee=p(N+T,H-L+L,d,a),se=ae===S-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([q,N,H-L],[R-.005,T,L],c.STONE,{group:d,round:.035,rough:.004,dir:ie,paint:se?g(q,N,T,R-.005,L,H,m++,ee):ee}),_==="bass"&&M(q,K+.02,H,Math.min(R,T)*.72,d,u++),_==="mid"&&(r.ell([q,K,H],[R*.8,T*.7,L*.9],c.STONED,{group:d,cut:!0,paint:ue=>ue[2]<H-L*.45?h(u)?c.STONED:c.GLOW:void 0}),r.box([q,K,H-L*.5],[.018,T*.6,L*.45],c.STONE,{group:d}),u++),_==="horn"){const ue=K+T*.25;r.seg([q,ue,H-L*1.5],[q,ue,H+.03],.03,Math.min(R,T)*.78,c.STONED,{group:d,cut:!0,paint:xe=>xe[2]<H-L*.55?h(u)?c.STONED:c.GLOW:void 0}),M(q,K-T*.6,H,T*.22,d,u++)}if(_==="tweet")for(const ue of[-.5,0,.5])M(q+ue*R*1.15,N,H,T*.55,d,u++);d++}if(_!=="tweet"){const ae=a&&_==="horn"?R:0;r.box([-ae,l+T*2+.012,H-.015],[k/2+.01-ae,.012,.015],c.WOOD,{group:d++,round:.008}),l+=.024}_==="tweet"&&!a&&r.flat([0,l+I/2,H-L],[1,0,0],[0,1,0],k/2,I/2,(ae,q)=>Math.abs(q)<.45&&Math.sin(ae*23)>-.4?c.GLOW:null,{group:d++,bend:0}),l+=T*2+I});const y=l;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([_,S,R,T],L)=>{if(a&&L%2){r.seg([_,.03,S],[_+.12,.05,S+.04],.04,.02,c.CRYSTAL,{group:700+L});return}const O=[_+T*R,R,S+.05];r.seg([_,0,S],O,.045+R*.05,.006,c.CRYSTAL,{group:700+L,paint:I=>I[1]>R*(.65-o*.1)&&!a?c.GLOW:void 0}),r.seg([_+.04,0,S-.03],[_+.04+T*R*.5,R*.55,S],.03,.005,c.CRYSTAL,{group:720+L})}),!a)for(const[_,S,R,T]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,y+S-.1,R],[T,T*.8,T],c.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,S,R,T]of E)r.box([_+.45,S*.75,f+.25],[S,R,T],c.STONE,{group:d++,dir:[.6,.8,.2],round:.035,rough:.007,paint:p(1,0,9,!0)});return{m:r,top:y}}function U5(n){const e=new qe({blend:.02}),t=(i,s)=>ft(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],c.GLOW,{group:1,paint:i=>i[1]>.16?c.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,c.GLOW,{group:2,paint:i=>i[1]>.35?c.MAGIC2:c.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,l=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,l*.7,o],[h*1.3,h,h*1.1],c.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:d=>Math.abs(Math.sin(d[0]*41+d[1]*29))<.08?c.STONED:d[1]>l*.7+h*.6&&t(i,4)<.25?c.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],c.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?c.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,c.CRYSTAL,{group:60+i})}return e}function ku(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(ft(s,t,1)*n.w),a=Math.floor(ft(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?c.GLOW:c.MAGIC2),i++)}return n}const k5=n=>Mc(n)*3,ul=new Map;function B5(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=k5(n),a=e+":"+r;ul.has(a)||ul.set(a,xn(Uu(e,0,"playing").m,{height:r}).s);const o=ul.get(a);if(i==="destroyed")return ku(xn(U5(e),{scale:o}).sp,3,e*5+1);const{sp:h}=xn(Uu(e,t,i,s).m,{scale:o});return ku(h,i==="damaged"?4:10+t*2,e*5+t)}const z5=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function H5(){const n={};return z5.forEach(e=>n[e.k]=e.v),n}function G5(n,e,t,i,s){const r=Ec(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*pe(i,.9,1.1)),h=fo(i,a,r);return e.dark&&(h[c.LEAF]=h[c.LEAF3],h[c.LEAF3]=de(n.leaf+.05,.7,.22)),h[c.NOSE]=[20,16,24],h[c.GLINT]=[235,235,240],{parts:ld(o),colours:h}}function W5(n,e,t,i,s){const r=Ft[t].id,a=xr.find(g=>g.id===r),o=Mp(r,n,{K:i,makeCanvas:s}),h=[],l=g=>h.push(g)-1,d={big:[],bigWeight:[],small:[],walls:[],set:null},f=(g,x)=>gn(g,x,n,"none",s),u=(g,x)=>{const{parts:v,colours:b}=G5(a,g,n,jn(e*13+t*101+x*7+1),i);return{bot:l(f(v.bot,b)),top:l(f(v.top,b))}},m=_p(r,n,{K:i,makeCanvas:s}),p=Ft[t].layout.heightMix,M=g=>m.filter(x=>x.heightClass===g).length||1;for(const g of m)d.big.push({bot:l(g.bot),top:l(g.top)}),d.bigWeight.push(p?p[g.heightClass]/M(g.heightClass):g.weight);a.big.forEach(([g],x)=>{g==="tree"&&m.length||(d.big.push({bot:l(o.big[x].sp),top:null}),d.bigWeight.push(m.length?.1:1))}),a.small.forEach(([g,x],v)=>d.small.push(g==="tree"?u(x,500+v):{bot:l(o.small[v].sp),top:null}));for(const g of o.walls)d.walls.push(l(g.sp));return o.setPiece&&(d.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:l(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:d,floor:o.floor.sp}}function Bu(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(gn(L0(e,a,o,n,r,i),T0(e,n,i),n,n.cOutline,t));return s}const V5=(n,e,t=!1)=>(t?8:0)+n*2+e;function lo(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function xs(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),l=new Uint8Array(o*h*4),d=new Uint8Array(o*h*4),f=n.map((u,m)=>{const p=i[m],M=lo(u.A,u.w,u.h),g=lo(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const b=v*u.w*4,w=((p.y+v)*o+p.x)*4;l.set(M.subarray(b,b+u.w*4),w),d.set(g.subarray(b,b+u.w*4),w)}let x=0;e:for(let v=u.h-1;v>=0;v--,x++)for(let b=0;b<u.w;b++)if(M[(v*u.w+b)*4+3]>=128)break e;return{uv:[p.x/o,p.y/h,(p.x+u.w)/o,(p.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(x,u.h)}});return{albedo:l,normal:d,width:o,height:h,frames:f}}function Y5(n,e){const t=[],i=[],s=b5(n);for(const r of lf){const a=_5(r.id,n);i.push({id:r.id,family:r.family,decal:!!r.decal,frame:t.push(gn(a.whole,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:v5(n)}}function X5(n,e){const t=[],i=[],s=df(n);for(const r of uf){const a=I5(r.id,n);i.push({id:r.id,frame:t.push(gn(a.sp,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,pieces:i}}function K5(n,e){const t=[],i=[],s=T5(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of hf)for(let o=0;o<a.variants;o++){const h=R5(a.id,n,{variant:o}),l=h.crownY>0&&!r(h.top),d=t.push(gn(l?h.bot:h.whole,s,n,"none",e))-1,f=l?t.push(gn(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:d,top:f,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function q5(n,e){if(n.kind==="creature")return{px:xs(Bu(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:r,relics:a,layouts:o}=Y5(n.style,e);return{px:xs(r,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:r,pieces:a}=X5(n.style,e);return{px:xs(r,2048),pieces:a}}if(n.kind==="decor"){const{sprites:r,decor:a}=K5(n.style,e);return{px:xs(r,2048),decor:a}}if(n.kind==="party")return{px:xs(Bu(n.style,n.species,e,{...A0(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=W5(n.style,n.seed,n.id,n.K,e);return{px:xs(t),layout:i,floor:{albedo:new Uint8Array(lo(s.A,s.w,s.h)),normal:new Uint8Array(lo(s.N,s.w,s.h)),w:s.w,h:s.h}}}function zu(n,e,t){const i=new ws(n,e,t,Gn,zn);return i.magFilter=Wt,i.minFilter=Wt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Hn,i.needsUpdate=!0,i}function ff(n){return{albedo:zu(n.albedo,n.width,n.height),normal:zu(n.normal,n.width,n.height),frames:n.frames}}const Ms=(n,e=2048)=>ff(xs(n,e)),$5="6563f32dea8c",Z5="witch-art",Kr="sets";let Ia=null;function pf(){return Ia||(Ia=new Promise(n=>{try{if(typeof indexedDB>"u")return n(null);const e=indexedDB.open(Z5,1);e.onupgradeneeded=()=>{try{e.result.createObjectStore(Kr)}catch{}},e.onsuccess=()=>n(e.result),e.onerror=()=>n(null),e.onblocked=()=>n(null)}catch{n(null)}}),Ia)}async function J5(n){try{const e=await pf();return e?await new Promise(t=>{try{const i=e.transaction(Kr,"readonly").objectStore(Kr).get(n);i.onsuccess=()=>t(i.result??null),i.onerror=()=>t(null)}catch{t(null)}}):null}catch{return null}}function Q5(n,e){pf().then(t=>{if(t)try{const i=t.transaction(Kr,"readwrite");i.onerror=s=>s.preventDefault(),i.objectStore(Kr).put(e,n)}catch{}}).catch(()=>{})}function j5(n){let e=2166136261;for(let t=0;t<n.length;t++)e=Math.imul(e^n.charCodeAt(t),16777619);return(e>>>0).toString(36)}class ey{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i,this.styleHash=j5(JSON.stringify(e));const s=Yf(e),r=u=>gn(Jf(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(m=>[0,1].map(p=>r({pose:u,frame:p,facing:m}))))),o=Ju;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const m=o[u].frames,p={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let g=0;g<m;g++)p[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFoot[u]=p}for(const[u,m]of[["fast",3],["brake",2]]){const p={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let g=0;g<m;g++)p[M].push(a.length),a.push(r({pose:u,frame:g,facing:M}));this.witchFly[u]=p}this.witch=Ms(a,2048),this.stones=Ms([0,1,2,3].map(u=>this.stone(u)));const h=Ap(e);this.props=Ms([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const l=[];for(let u=0;u<3;u++)for(let m=0;m<3;m++)l.push(gn(B5(e,{variant:u,frame:m,state:"playing"}),F5(u),e,e.cOutline));this.soundsystems=Ms(l,2048);const d=d5(e),f=c5(e);for(const u of[d.bot,d.top])for(let m=Math.max(0,Math.floor(d.anchors.base.y-14));m<u.h;m++)for(let p=0;p<u.w;p++)u.m[m*u.w+p]===c.NOSE&&(u.m[m*u.w+p]=0);if(this.treehouse={atlas:Ms([d.bot,d.top].map(u=>gn(u,f,e,"none")),2048),...d.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(6,(navigator.hardwareConcurrency||2)-1));try{for(let m=0;m<u;m++){const p=new Worker(new URL(""+new URL("artWorker-C5O5mM1i.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:p,busy:!1};p.onmessage=g=>{M.busy=!1,M.job=void 0,this.receive(g.data),this.dispatch()},p.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};stones;props;soundsystems;treehouse;K;version=0;timings=[];get done(){return this.timings.length}styleHash;onFloor=()=>{};stone(e){const t=jn(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new pt(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,c.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,c.BODY2,{round:this.style.round,onlyOn:new Set([c.BODY]),density:.5,seed:e}),gn(r,{[c.BODY]:[178,174,162],[c.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;cacheKey=e=>e.kind==="party"?null:[$5,this.styleHash,this.key(e),e.kind==="type"?`${e.seed}|${e.K}`:""].join("|");ask(e,t=!1){const i=this.key(e);if(this.inFlight.has(i)){const a=t?this.queue.findIndex(o=>this.key(o)===i):-1;a>0&&this.queue.unshift(...this.queue.splice(a,1));return}this.inFlight.add(i);const s=this.cacheKey(e),r=()=>{t?this.queue.unshift(e):this.queue.push(e),this.dispatch()};if(!s){r();return}J5(s).then(a=>{a&&a.px?this.receive({job:e,result:a,ms:0,cached:!0}):r()},r)}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}if(!e.cached){const i=this.cacheKey(e.job);i&&Q5(i,e.result)}const t=ff(e.result.px);if(this.timings.push({set:this.key(e.job),ms:e.ms??0,at:performance.now(),cached:!!e.cached}),e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(s=>[s.id,s])),modern:i.filter(s=>s.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:V5});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K},!0),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K})}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift(),r=performance.now(),a=q5(s,(o,h)=>{const l=document.createElement("canvas");return l.width=o,l.height=h,l});this.receive({job:s,result:a,ms:performance.now()-r}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const rr=24,at={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowPower:{value:1.4},uHazeCentre:{value:new $e},uHazeRange:{value:new $e(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:rr},()=>new ot)},uLightCol:{value:Array.from({length:rr},()=>new ot)},uLightCount:{value:0},uDisco:{value:new ot},uDiscoParams:{value:new ot},uDiscoColour:{value:new W(1,1,1)},uScenery:{value:new $e(1e6,1)}};function ty(n,e,t,i=1,s=2.5){const r=(a,o)=>new W(a[0]/255*o,a[1]/255*o,a[2]/255*o);at.uAmb.value.copy(r(de(n.ambientHue,.55,1),n.ambient*i)),at.uMoon.value.copy(r(de(n.moonHue,.35,1),n.moon)),at.uMoonBeam.value.copy(r(de(n.moonHue,.35,1),n.shafts*.25)),at.uBands.value=n.bands,at.uDither.value=n.dither*.5,at.uShafts.value=n.shafts,at.uShaftScale.value=t*2,at.uGlowRgb.value.copy(r(de(n.glowHue,n.glowSat,1),1)),at.uGlowR.value=e,at.uGlowFalloff.value=s,at.uGlowPower.value=n.glowPower,at.uHazeColour.value.copy(r(de(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const fi=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${rr}], uLightCol[${rr}];
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
  for (int i = 0; i < ${rr}; i++) {
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
`,ji=2,fn=32,vs=8,ny=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,iy=`
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
${fi}
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
`;class sy{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*ji/fn)*fn,l=Math.ceil(o*ji/fn)*fn;this.tilesX=h/fn,this.tilesZ=l/fn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const d=p=>(p.magFilter=p.minFilter=Wt,p.generateMipmaps=!1,p.colorSpace=Hn,p.needsUpdate=!0,p);this.texture=d(new ws(new Uint8Array(h*l*4),h,l)),d(this.tile),this.floors=d(new ws(new Uint8Array(64*vs*48*4*4),64*vs,192));const f=Array.from({length:32},(p,M)=>new W(...Ft[M]?.floor??[.25,.45,.4])),u=new Mt({vertexShader:ny,fragmentShader:iy,uniforms:{...at,uAreas:{value:this.texture},uExtent:{value:new ot(r.minX,r.minZ,h/ji,l/ji)},uPixel:{value:s},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(p,M)=>{const g=Ft[M]?.layout.terrain??[];return new W(+g.includes("mounds"),+g.includes("hollows"),+g.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new $e(64,48)},uFloorsSize:{value:new $e(64*vs,192)},uSat:{value:i.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ot},uCircle:{value:new ot},uSweeps:{value:Array.from({length:4},()=>new ot)},uSweepCount:{value:0},uClearing:{value:new $e(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),m=new Yn(a+400,o+400);m.rotateX(-Math.PI/2),this.mesh=new zt(m,u),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new ws(new Uint8Array(fn*fn*4),fn,fn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new ws(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new $e(t%vs*i.w,Math.floor(t/vs)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=fn/ji,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),d=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,m=(s-a.minZ)/o,p=[];for(let x=d;x<=f;x++)for(let v=h;v<=l;v++)this.filled[x*this.tilesX+v]||p.push([v,x,(v+.5-u)**2+(x+.5-m)**2]);p.sort((x,v)=>x[2]-v[2]);const M=performance.now();let g=0;for(const[x,v]of p){if(g>0&&performance.now()-M>r)break;this.fillTile(e,x,v),g++}return p.length-g}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=fn/ji,o=s.minX+t*a,h=s.minZ+i*a,l=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(d=>d.kind==="pond");for(let d=0;d<fn;d++)for(let f=0;f<fn;f++){const u=o+(f+.5)/ji,m=h+(d+.5)/ji,p=this.map.areaAt(u,m),M=(d*fn+f)*4;let g=0;for(const x of l)Math.hypot(u-x.x,m-x.z)<3*x.size&&(g=255);r[M]=p.type,r[M+1]=Math.round(p.openness*255),r[M+2]=g,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new $e(t*fn,i*fn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const dl=Mo,ry=new Set(["tarmac","railway","stairs","bridges"]),fl=`
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,Hu=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${fi}
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
`,ay=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${fi}
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
`;class oy{group=new ys;constructor(e,t,i){const s=e.paths,r=e.seed,a=O5(),o=new Map,h=(f,u)=>{const m=e.areaAt(f,u),p=m.cell.join(",");let M=o.get(p);if(!M){const g=(a[Ft[m.type].id]??[]).filter(x=>!ry.has(x)&&dl[x]&&(x!=="magic"||Re(m.cell[0],m.cell[1],r+831)<.15));M=g.length?g[Math.floor(Re(m.cell[0],m.cell[1],r+833)*g.length)]:"dirt",o.set(p,M)}return M},l=new Map;s.lines.forEach((f,u)=>{const m=f.kind==="rail"?Math.floor(Re(u,1,r+835)*3):0,p=f.pts,M=p.length,g=[0];for(let b=1;b<M;b++)g.push(g[b-1]+Math.hypot(p[b][0]-p[b-1][0],p[b][1]-p[b-1][1]));const x=p.map((b,w)=>{const E=p[Math.max(0,w-1)],y=p[Math.min(M-1,w+1)],A=y[0]-E[0],_=y[1]-E[1],S=Math.hypot(A,_)||1;return[-_/S,A/S]}),v=g[M-1];for(let b=0;b<M-1;b++){const w=(p[b][0]+p[b+1][0])/2,E=(p[b][1]+p[b+1][1])/2;if(f.kind==="rail"&&s.railBroken(w,E)||e.hardClear(w,E))continue;const y=f.kind==="stream"?{width:f.half*2,period:4}:null,A=f.kind==="stream"?"stream":f.kind==="rail"?"railway":f.kind==="road"?"tarmac":h(w,E),_=y??dl[A],S=A+":"+m;let R=l.get(S);R||l.set(S,R={pos:[],uv:[]});const T=O=>_.width/2*(f.deadEnd?Math.min(1,(v-g[O])/6):1),L=(O,I)=>{const k=T(O)*I;R.pos.push(p[O][0]+x[O][0]*k,.02,p[O][1]+x[O][1]*k),R.uv.push(I>0?1:0,g[O]/_.period)};L(b,-1),L(b,1),L(b+1,1),L(b,-1),L(b+1,1),L(b+1,-1)}});const d=df(t);for(const f of s.junctions){const u=L5({variant:Math.floor(Re(f.line,1,r+835)*3)}),m=mn,p=u.w/m,M=u.h/m,g=dl.railway.width/2,x=f.side>0?-f.dz:f.dz,v=f.side>0?f.dx:-f.dx,b=(S,R)=>[f.x+f.dx*(S-g)+x*(R-g),.03,f.z+f.dz*(S-g)+v*(R-g)],w=[b(0,0),b(p,0),b(p,M),b(0,0),b(p,M),b(0,M)].flat(),E=[0,0,1,0,1,1,0,0,1,1,0,1],y=new dc(gn(u,d,t,"none").A);y.magFilter=y.minFilter=Wt,y.generateMipmaps=!1,y.flipY=!1,y.colorSpace=Hn;const A=new qt;A.setAttribute("position",new _t(w,3)),A.setAttribute("uvw",new _t(E,2));const _=new zt(A,new Mt({vertexShader:fl,fragmentShader:Hu,transparent:!0,depthWrite:!1,side:ai,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6,uniforms:{...at,uStrip:{value:y},uPixel:{value:i}}}));_.renderOrder=.55,this.group.add(_)}for(const[f,u]of l){const[m,p]=f.split(":"),M=new qt;if(M.setAttribute("position",new _t(u.pos,3)),M.setAttribute("uvw",new _t(u.uv,2)),m==="stream"){const E=new Mt({vertexShader:fl,fragmentShader:ay,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...at,uPixel:{value:i}}}),y=new zt(M,E);y.frustumCulled=!1,y.renderOrder=.4,this.group.add(y);continue}const g=C5(m,{variant:+p}).strip,x=gn(g,d,t,"none"),v=new dc(x.A);v.magFilter=v.minFilter=Wt,v.generateMipmaps=!1,v.flipY=!1,v.wrapT=Ja,v.colorSpace=Hn;const b=new Mt({vertexShader:fl,fragmentShader:Hu,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...at,uStrip:{value:v},uPixel:{value:i}}}),w=new zt(M,b);w.frustumCulled=!1,w.renderOrder=.5,this.group.add(w)}}}const ly="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",cy=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,hy=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,uy=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,dy=`
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
}`;function ms(n,e,t,i=!1){const s=new Qn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Hn,s}class fy{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ms(1,1,Kt,!0),this.scene.depthTexture=new ur(1,1),this.fx.texture.format=Gn;const i=(s,r)=>new Mt({vertexShader:ly,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(cy,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(hy,{uSrc:{value:null},uStep:{value:new $e}}),composite:i(uy,{uScene:{value:null},uBloom:{value:null},uLow:{value:new $e},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(dy,{uSrc:{value:null},uTexel:{value:new $e},uDir:{value:new $e},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new zt(new Yn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ms(1,1,Kt);bloomB=ms(1,1,Kt);a=ms(1,1,Kt);b=ms(1,1,Kt);fx=ms(1,1,Kt);fxB=ms(1,1,Kt);fxScene=null;quad;cam=new qc(-1,1,1,-1,0,1);mats;low=new $e(1,1);out=new $e(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,m=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=s.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/m)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new st),m=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,m);const p=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,g=>{g.uSrc.value=this.fx.texture,g.uStep.value.set(.6/p,0)}),this.pass("blur",this.fx,g=>{g.uSrc.value=this.fxB.texture,g.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,l=this.a.height,d=this.fullResolution?this.out.y/this.low.y:1,f=u=>{u.uTexel.value.set(1/h,1/l),u.uStrength.value=s.tiltShift.strength*d,u.uBand.value=s.tiltShift.band,u.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const py=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,my=`
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
}`,gy=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,xy=`
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
}`,My=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class vy{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...de(r.circleHue2,.4,1).map(g=>g/255));this.ballMat=new Mt({vertexShader:py,fragmentShader:my,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:at.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new zt(new Yn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new zt(new Yn(s,h).translate(0,h/2,0),new Mt({fragmentShader:gy,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=r.motes,d=[],f=[];for(let g=0;g<l.count;g++){const x=w=>{const E=Math.sin(g*12.9898+w*78.233)*43758.5453;return E-Math.floor(E)},v=x(1)*Math.PI*2,b=Math.sqrt(x(2))*a.radius*l.column;d.push(a.x+Math.cos(v)*b,.3,a.z+Math.sin(v)*b),f.push(x(3),l.speed*(.6+x(4)*.8),.4+x(5)*1.2,0)}const u=new qt;u.setAttribute("position",new _t(d,3)),u.setAttribute("aMote",new _t(f,4));const m=de(r.circleHue,.55,1);this.motes=new Xr(u,new Mt({vertexShader:xy,fragmentShader:My,uniforms:{uTime:at.uTime,uRise:{value:l.rise},uTint:{value:new W(m[0]/255,m[1]/255,m[2]/255)}},transparent:!0,depthWrite:!1,blending:Hi})),this.motes.frustumCulled=!1;const p=de(r.circleHue,.7,1);this.lightRgb=new W(p[0]/255,p[1]/255,p[2]/255);const M=at;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),at.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const by=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class _y{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],l=[],d=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;d.push({...f.soundsystem,at:f.at,from:u})}for(const f of d){const u=r.transition>0?Math.min(1,(t-f.at)/r.transition):1,m=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],p=m.h*this.metresPerPixel,M=sn((u-.55)/.45);if(u<1&&f.from){const x=(f.from.x+f.x)/2,v=(f.from.z+f.z)/2,b=Math.hypot(f.x-x,f.z-v)*1.6;h.push({x,z:v,radius:u*b,strength:1-sn((u-.8)/.2)})}if(M>0&&i(f.x,f.z,m.w*this.metresPerPixel,p)){const x=Re(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-M)*p,z:f.z,frame:m,flip:x,fresh:s(f.x,f.z,p)})}u>=1&&l.push({x:f.x,y:p*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+r.transition});const g=.85+.15*Math.sin(t*8);M>0&&o.push({x:f.x,y:3,z:f.z,reach:r.lightReach,rgb:by[f.variant%3],strength:r.lightStrength*g*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:l}}}const Hr=4;class yy{atlas;index=new Map;colour=new Map;constructor(e,t){const i=t.runeMarkers,s=[],r=[...new Set(Ft.map(o=>o.creature))],a=[i.dormant.glow,...Array.from({length:Hr-1},(o,h)=>i.awake.glow[0]+(i.awake.glow[1]-i.awake.glow[0])*h/(Hr-2))];for(const o of r){const h=Ep(e,{glow:"cyan",sigil:o}),l=or(o);this.index.set(o,s.length),this.colour.set(o,new W(l[0]/255,l[1]/255,l[2]/255));for(const d of a)s.push(wy(h,l,d))}this.atlas=Ms(s,2048)}frame(e,t){return(this.index.get(e)??0)+Math.max(0,Math.min(Hr-1,t))}}function wy(n,e,t){const i=document.createElement("canvas");i.width=n.w,i.height=n.h;const s=i.getContext("2d");s.drawImage(n.A,0,0);const r=s.getImageData(0,0,n.w,n.h),a=r.data;for(let o=0;o<a.length;o+=4){if(a[o+3]!==254)continue;const h=Math.max(a[o],a[o+1],a[o+2])/255,l=Math.max(0,h-.75)*2.4;for(let d=0;d<3;d++)a[o+d]=Math.min(255,(e[d]*(1-l)+255*l)*h*t)}return s.putImageData(r,0,0),{...n,A:i}}const Sy=`
attribute vec4 iBeam; // colour rgb, strength
varying vec4 vBeam;
varying float vY;
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`,Ey=`
uniform float uShown;
varying vec4 vBeam;
varying float vY;
void main() {
  float a = vBeam.a * uShown * (1.0 - vY) * smoothstep(0.0, 0.08, vY);
  if (a < 0.003) discard;
  gl_FragColor = vec4(vBeam.rgb * a, 1.0);
}
`;class Ay{constructor(e=64,t=600){this.maxBeams=e,this.maxMotes=t;const i=new Kc(.5,.5,1,8,1,!0);this.beamAttr=new hr(new Float32Array(e*4),4),i.setAttribute("iBeam",this.beamAttr),this.beams=new J2(i,new Mt({vertexShader:Sy,fragmentShader:Ey,uniforms:{uShown:{value:0}},transparent:!0,depthWrite:!1,blending:Hi,side:ai}),e),this.beams.frustumCulled=!1,this.beams.renderOrder=9,this.mPos=new Float32Array(t*3),this.mCol=new Float32Array(t*4);const s=new qt;s.setAttribute("position",new Cn(this.mPos,3)),s.setAttribute("color",new Cn(this.mCol,4)),this.motes=new Xr(s,new Kd({size:3,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Hi})),this.motes.frustumCulled=!1,this.group.add(this.beams,this.motes)}maxBeams;maxMotes;group=new ys;beams;beamAttr;motes;mPos;mCol;m4=new It;update(e,t,i,s){const r=Math.min(this.maxBeams,e.length);for(let h=0;h<r;h++){const l=e[h];this.m4.makeScale(1.2,t,1.2).setPosition(l.x,t/2,l.z),this.beams.setMatrixAt(h,this.m4),this.beamAttr.setXYZW(h,l.colour.x,l.colour.y,l.colour.z,l.strength)}this.beams.count=r,this.beams.instanceMatrix.needsUpdate=!0,this.beamAttr.needsUpdate=!0,this.beams.material.uniforms.uShown.value=i;const a=Math.min(this.maxMotes,s.length);for(let h=0;h<a;h++){const l=s[h];this.mPos.set([l.x,l.y,l.z],h*3),this.mCol.set([l.colour.x,l.colour.y,l.colour.z,l.alpha],h*4)}const o=this.motes.geometry;o.setDrawRange(0,a),o.getAttribute("position").needsUpdate=!0,o.getAttribute("color").needsUpdate=!0}}function Ty(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function Ry(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=jn(n.seed*53+t[0]*1031+t[1]*7+509),a=w=>{const E=n.areaAt(w.x,w.z).cell;return E[0]===t[0]&&E[1]===t[1]},o=w=>Re(Math.round(w.x*10),Math.round(w.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((w,E)=>o(w)-o(E)),l=new Map,d=new Set,f=[],u=[],m=Math.cos(i.coneAngle*Math.PI/180),p=(w,E=0)=>(l.get(w)??0)+1<=(d.has(w)?3:2)-E,M=(w,E)=>f.some(y=>Ty([w.x,w.z],[E.x,E.z],[y.ax,y.az],[y.bx,y.bz])),g=(w,E)=>{f.push({ax:w.x,az:w.z,bx:E.x,bz:E.z,seed:Math.floor(Re(Math.round(w.x*10),Math.round(E.z*10),n.seed+503)*1e6)}),l.set(w,(l.get(w)??0)+1),l.set(E,(l.get(E)??0)+1)},x=(w,E,y)=>{let A=w,_=E;const S=[w];for(let R=0;R<y&&p(A);R++){const T=[];for(const I of h){if(I===A||!p(I))continue;const k=I.x-A.x,H=I.z-A.z,K=Math.hypot(k,H);if(!(K<i.spanMin||K>i.spanMax)&&!(_&&(k*_[0]+H*_[1])/K<m)&&!M(A,I)&&(T.push({b:I,d:K}),T.length>=16))break}if(!T.length)break;T.sort((I,k)=>k.d-I.d);const{b:L,d:O}=T[Math.floor(r()*Math.min(4,T.length))];g(A,L),_=[(L.x-A.x)/O,(L.z-A.z)/O],S.push(L),A=L}return S},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),b=[];for(const w of h){if(u.length>=v)break;if(l.has(w)||u.some(A=>Math.hypot(A.x-w.x,A.z-w.z)<i.spread))continue;u.push(w);const E=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),y=x(w,null,E);for(let A=1;A<y.length-1;A++){if(r()>=i.junctionChance)continue;const _=y[A],S=y[A+1],R=S.x-_.x,T=S.z-_.z,L=Math.hypot(R,T),O=r()<.5?1:-1;d.add(_),b.push({from:_,heading:[-T/L*O,R/L*O]})}}for(const w of b)x(w.from,w.heading,i.spansPerRun[0]+Math.floor(r()*3));return f}const Nt={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ot(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new $e(1,1)},uWitch:{value:new ot(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new ot(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new ot)},uPartyCol:{value:Array.from({length:16},()=>new W)},uPartyCount:{value:0},uUplight:{value:new ot}},pl=`
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec4 iFlags; // flip, top half, just appeared (debug), glow (0-1: white)
varying vec2 vUv;
varying vec3 vWorld;
varying vec4 vFlags;
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
varying vec4 vFlags;
varying float vFront;
${fi}
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
  // Glowing white (a party animal evolving), by vFlags.w.
  if (vFlags.w > 0.0 && uSilhouette.a <= 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vFlags.w);
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld) * uAppear; // and a set just drawn fades in
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class kn{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Yn(1,1);s.translate(0,.5,0),this.geo=new $c,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...at,...Nt,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uFadePass:{value:0},uFlat:{value:i.flat?1:0},uSilhouette:{value:new ot(0,0,0,0)},...h}),a=i.scenery?{blending:po,blendSrc:Ic,blendDst:Oc}:{},o=new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new zt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new zt(this.geo,new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,l=new zt(this.geo,new Mt({vertexShader:pl,fragmentShader:ml,uniforms:r({uSilhouette:{value:new ot(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Za}));l.frustumCulled=!1,l.renderOrder=12,this.meshes.push(l)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new hr(new Float32Array(t*s),s);return a.setUsage(nr),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(4,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}appearU={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*4]=a.flip?1:0,r[o*4+1]=a.top?1:0,r[o*4+2]=a.fresh?1:0,r[o*4+3]=a.glow??0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Cy=`
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
}`,Ly=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${fi}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,Py=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,Dy=`
varying vec3 vWorld;
${fi}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,Iy=`
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
}`,Oy=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${fi}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class Ny{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new st(r));const s={...at,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Mt({vertexShader:Cy,fragmentShader:Ly,uniforms:{...s,uRes:Nt.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new Mt({vertexShader:Py,fragmentShader:Dy,uniforms:s}),this.moteMat=new Mt({vertexShader:Iy,fragmentShader:Oy,uniforms:{...at,uMoteColour:{value:new st(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:Hi})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],l=[],d=[],f=[],u=[];e.forEach((_,S)=>{const R=Math.hypot(_.bx-_.ax,_.bz-_.az),T=Math.max(2,Math.round(R/a.bulbSpacing)),L=O=>[_.ax+(_.bx-_.ax)*O,o-a.sag*4*O*(1-O)*(R/8),_.az+(_.bz-_.az)*O];for(let O=0;O<=16;O++){const I=L(O/16),k=L((O+1)/16);O<16&&(f.push(...I,...k),u.push(S+O/16,S+(O+1)/16))}for(let O=1;O<T;O++){const I=O/T,k=L(I),H=this.palette[(_.seed+O)%this.palette.length];h.push(...k),l.push(H.r,H.g,H.b),d.push((_.seed*13+O*7)%100/100,S*40+O,t(k[0],k[2])+O*.03,4*I*(1-I))}});const m=new ys,p=new qt;p.setAttribute("position",new _t(h,3)),p.setAttribute("aColour",new _t(l,3)),p.setAttribute("aBulb",new _t(d,4));const M=new qt;M.setAttribute("position",new _t(f,3)),M.setAttribute("aSway",new _t(u,1)),m.add(new Xc(M,this.wireMat),new Xr(p,this.bulbMat));const g=this.game.tuning.party.motes,x=this.game.map,v=[],b=[],w=x.areaSize*1.1,E=Math.round(Math.PI*w*w/400*g.perPatch);for(let _=0;_<E;_++){const S=k=>{const H=Math.sin(s*12.9898+_*78.233+k*37.719)*43758.5453;return H-Math.floor(H)},R=S(1)*Math.PI*2,T=Math.sqrt(S(2))*w,L=i.x+Math.cos(R)*T,O=i.z+Math.sin(R)*T,I=x.areaAt(L,O).cell;I[0]!==r[0]||I[1]!==r[1]||(v.push(L,g.from,O),b.push(S(3),g.speed*(.6+S(4)*.8),.3+S(5)*.8,t(L,O)))}const y=new qt;y.setAttribute("position",new _t(v,3)),y.setAttribute("aMote",new _t(b,4));const A=new Xr(y,this.moteMat);return A.frustumCulled=!1,m.add(A),m.traverse(_=>{_.frustumCulled=!1}),m}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=Ry(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),l=r.from?e.map.siteOf(r.from[0],r.from[1]):null,d=l?(l.x+h.x)/2:h.x,f=l?(l.z+h.z)/2:h.z,u=l?Math.hypot(h.x-d,h.z-f)*1.6:1,m=e.tuning.party.transition,p=(M,g)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-d,g-f)/u)*m;a={lines:o,group:this.build(o,p,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const en=32,$s=16,Fy=`
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
}`,Uy=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${fi}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class gl{mesh;geo=new $c;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Yn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new zt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new hr(r,a).setUsage(nr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,l,d=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=s,this.uv.set(r,f*4),this.col.set([a,o,h,l],f*4),this.draw[f]=d}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const ky=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],By=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class zy{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=en*$s;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(en/2,en/2,0,en/2,en/2,en/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,en,en),this.tex=new dc(this.canvas),this.tex.magFilter=Wt,this.tex.minFilter=Wt,this.tex.generateMipmaps=!1;const r=(o,h=!0)=>new Mt({vertexShader:Fy,fragmentShader:Uy,uniforms:{...at,uRight:Nt.uRight,uUp:Nt.uUp,uFlat:{value:o},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,depthTest:h,blending:Hi});this.standing=new gl(r(0)),this.flat=new gl(r(1)),this.over=new gl(r(0,!1)),e.add(this.standing.mesh,this.flat.mesh,this.over.mesh);const a=t.tuning.berries.colour.replace("#","");this.berryRgb=[0,2,4].map(o=>parseInt(a.slice(o,o+2),16)/255)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;over;evolved=new Map;berryRgb;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%$s*en,o=Math.floor(s/$s)*en;r.clearRect(a,o,en,en),H0(r,e,{x:a+1,y:o+1,size:en-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,en,en);for(let d=3;d<h.data.length;d+=4)h.data[d]=h.data[d]>90?255:0;r.putImageData(h,a,o);const l=or(e);return this.colours.set(e,new st(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,s}drawBerries(e){const t=this.game,i=t.berries,s=t.tuning,r=t.witch,a=this.uv(0),[o,h,l]=this.berryRgb,d=s.berries.glow,f=r.lift>.5,u=f?260:90,m=60/s.beat.bpm;for(const p of i.events)p.kind==="evolved"&&this.evolved.set(p.id,e);for(const[p,M]of this.evolved)e-M>1&&this.evolved.delete(p);for(const p of i.berries){const M=i.bushes[p.bush];if(Math.abs(M.x-r.x)>u||Math.abs(M.z-r.z)>u)continue;const g=.85+.15*Math.sin(e*2.3+p.id);f?this.over.add(M.x,1,M.z+.25,.9,a,o*1.6*g,h*1.6,l*1.6,.8*d):(this.standing.add(M.x,.8,M.z+.3,1.5,a,o*.9,h*.9,l*.9,.6*d*g),this.standing.add(M.x-.07,.86,M.z+.32,.25,a,1,.9,.9,.7*g))}for(const p of t.creatures){if(!p.leashed||i.evolving.has(p.id))continue;const M=Md(p.level,s),g=i.ateAt.get(p.id);if(!Number.isFinite(M)||Math.hypot(p.x-r.x,p.z-r.z)>20&&!(g!==void 0&&e-g<3))continue;const x=i.fed.get(p.id)??0,v=28;for(let b=0;b<v;b++){const w=Math.PI/2-b/v*Math.PI*2,E=b/v<x/M;this.flat.add(p.x+Math.cos(w)*1.5,0,p.z+Math.sin(w)*1.1,.35,a,E?1:.9,E?.25:.9,E?.3:1,E?.9:.15)}}for(const[p,M]of i.evolving){const g=t.creatures[p],x=Math.min(1,(e-M.since)/Math.max(.1,M.at-M.since)),v=.6+.4*Math.cos(e/m*Math.PI*2);for(let b=0;b<18;b++){const w=(e*(.5+x)+b/18)%1,E=b*2.4+e*(2+4*x),y=1.6*(1-.6*x)*(1-w*.4);this.standing.add(g.x+Math.cos(E)*y,.2+w*3.2,g.z+Math.sin(E)*y*.7,.3,a,1,.95,.75,(1-w)*v)}}for(const[p,M]of this.evolved){const g=t.creatures[p],x=e-M;x<.25&&this.standing.add(g.x,1.2,g.z,6*(1-x/.25)+1,a,1,1,1,1-x/.25);const v=x/1;for(let b=0;b<36;b++){const w=Re(p,b,13)*Math.PI*2,E=2.5+Re(p,b,17)*3.5,y=2+Re(p,b,19)*4,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][b%5];this.standing.add(g.x+Math.cos(w)*E*v,.8+y*v-4*v*v,g.z+Math.sin(w)*E*v,.35,a,A[0],A[1],A[2],1-v)}}}uv(e){const t=en*$s,i=e%$s*en,s=Math.floor(e/$s)*en;return[i/t,1-s/t,(i+en)/t,1-(s+en)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,l=a.witch,d=h.bond,f=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin(),this.over.begin(),this.drawBerries(e);for(const y of o.events)y.kind==="fizzled"&&this.fizzles.push({x:y.x,z:y.z,at:e}),y.kind==="invited"&&this.bursts.push({x:y.x,z:y.z,at:e,seed:y.id});this.fizzles=this.fizzles.filter(y=>e-y.at<.7),this.bursts=this.bursts.filter(y=>e-y.at<.9);for(const y of this.bursts){const A=(e-y.at)/.9;for(let _=0;_<28;_++){const S=Re(y.seed,_,3)*Math.PI*2,R=2+Re(y.seed,_,5)*3,T=2+Re(y.seed,_,7)*3,L=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(y.x+Math.cos(S)*R*A,.6+T*A-4*A*A,y.z+Math.sin(S)*R*A,.3,u,L[0],L[1],L[2],1-A)}}const m=(y,A,_)=>{const S=a.creatures[y],R=28,T=_?1:.45;for(let L=0;L<R;L++){const O=Math.PI/2-L/R*Math.PI*2,I=L/R<A;!_&&!I||this.flat.add(S.x+Math.cos(O)*1.5,0,S.z+Math.sin(O)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*T)}};o.talk&&m(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[y,A]of o.progress)o.talk?.id!==y&&m(y,Math.min(1,A/md(a.creatures[y],h)),!1);const p=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),g=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},v=r;for(let y=o.stack.length-1;y>=0;y--){const A=o.stack[y],_=a.creatures[A],S=o.stack.length-1-y,R=this.chain[S],T=(2+_.level*.4)*p.scale,L=Math.sin(e*1.7+S*.9)*p.idleSway*(1+S*.5),O=x.x-l.vx*p.trail+L,I=x.z-l.vz*p.trail;R.vx+=((O-R.x)*p.stiffness-R.vx*p.damping)*M,R.vz+=((I-R.z)*p.stiffness-R.vz*p.damping)*M,R.x+=R.vx*M,R.z+=R.vz*M,x=R,v+=(S===0?p.offset*T:p.gap*T)+T/2;const k=new W(l.x+R.x,v,l.z+R.z);v+=T/2,g.set(A,k);const H=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(k.x,k.y,k.z,T,this.uv(this.slotOf(_.species,_.level)),H.r,H.g,H.b,1)}for(const y of o.placed){const A=a.creatures[y.id],_=this.slotOf(A.species,A.level),S=this.colours.get(A.species),R=.8+.2*Math.sin(e*2+y.id);this.flat.add(y.x,0,y.z,3+A.level*.8,this.uv(_),S.r*R,S.g*R,S.b*R,1,Math.min(1,(e-y.at)/.8)),this.flat.add(y.x,0,y.z,5,u,S.r,S.g,S.b,.25)}const b=h.sigilProjection,w=l.lift*l.lift*(3-2*l.lift);if(w>.01)for(const y of o.placed){const A=a.creatures[y.id],_=this.colours.get(A.species),S=h.treetopHeight-4+b.height,R=.85+.15*Math.sin(e*1.3+y.id);this.flat.add(y.x,S,y.z,(3+A.level*.8)*b.size,this.uv(this.slotOf(A.species,A.level)),_.r,_.g,_.b,b.opacity*w*R);for(let T=1;T<S;T+=1.5)this.standing.add(y.x,T,y.z,.3,u,_.r,_.g,_.b,b.beam*w*R*(.6+.4*Math.sin(T*.8-e*3)))}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(y=>Math.hypot(y.x-l.x,y.z-l.z)<=f.pickRadius)){const y=a.creatures[o.stack[o.stack.length-1]],A=this.colours.get(y.species),_=xd(o,l.x,l.z,h);this.flat.add(l.x,0,l.z,3+y.level*.8,this.uv(this.slotOf(y.species,y.level)),_?1:A.r,_?.1:A.g,_?.1:A.b,.22)}for(const y of this.fizzles){const A=1-(e-y.at)/.7;this.flat.add(y.x,0,y.z,3*(1+(1-A)*.6),u,1,.15,.1,A)}const E=[...o.stack,...o.placed.map(y=>y.id)];for(const y of E){const A=a.creatures[y],_=this.colours.get(A.species);if(!_)continue;const S=gd(o,y,l.x,l.z);d.rim&&this.flat.add(A.x,0,A.z,1.8,u,_.r,_.g,_.b,.35);const R=g.get(y)??new W(S.x,.2,S.z);if(d.sparks){const L=Math.max(.5,d.sparkEvery),O=(e+y*.618%1*L)%L;if(O<.7){const I=O/.7;this.standing.add(R.x+(A.x-R.x)*I,R.y+(.6-R.y)*I+Math.sin(I*Math.PI)*1.2,R.z+(A.z-R.z)*I,.35,u,_.r,_.g,_.b,1)}}const T=Math.hypot(A.x-S.x,A.z-S.z);if(d.thread&&T>f.length*.85){const L=Math.min(1,(T-f.length*.85)/f.length),O=Math.min(60,Math.floor(T/1.2));for(let I=1;I<O;I++){const k=(I+e*2%1)/O;this.standing.add(R.x+(A.x-R.x)*k,R.y+(.5-R.y)*k,R.z+(A.z-R.z)*k,.22,u,_.r,_.g,_.b,.25+.75*L)}}}this.standing.end(),this.flat.end(),this.over.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let l=3;l<h.data.length;l+=4)h.data[l]=h.data[l]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const l=r.witch,d=(b,w,E,y)=>{this.v.set(w,E,y).project(t),b.style.left=`${(this.v.x+1)/2*i}px`,b.style.top=`${(1-this.v.y)/2*s}px`},f=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),d(o,l.x-1.2,lr(l,r.tuning)+2.2,l.z));return}const m=r.creatures[a.id];if(d(o,l.x-1.2,lr(l,r.tuning)+2.2,l.z),d(h,m.x,1.2+m.level*.8,m.z),a.refused){o.classList.remove("on"),this.emoji(f,Re(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const p=Math.floor(a.t/tm(m,r.tuning)),M=Math.min(1,a.t/a.total),g=(b,w)=>b[Math.floor(Re(a.id,w,5)*b.length)%b.length],x=[4,2,0][Math.min(2,m.level)],v=Math.round(x+(4-x)*M);this.emoji(o,g(ky,p-p%2)),o.classList.toggle("on",p%2===0),p>=1?this.emoji(f,g(By[v],p-(p+1)%2)):this.say(f,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=p%2===1?"1":"0.6"}}const Hy=[1,3,5,7,9],mf=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function Gy(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=mf(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),l=n-h*o,d=In(s.duty*t,0,1),u=Re(e,h,311)<d?sn(l/Math.max(.001,s.fadeIn))*sn((o-l)/Math.max(.001,s.fadeOut)):0,m=Math.floor(l/a),p=Hy.filter(w=>w<=s.maxCount),M=p[Math.floor(Re(e,h*64+m,313)*p.length)%p.length]??1,g=e%97*.37,x=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+g)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+g*2),b=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:x,open:v,hue:b}}const Wy=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,Vy=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Fr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],Yy=n=>{const e=(n%1+1)%1*Fr.length,t=Math.floor(e),i=e-t,s=Fr[t%Fr.length],r=Fr[(t+1)%Fr.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class Xy{constructor(e,t){this.game=t,this.mesh=new Xc(this.geo,new Mt({vertexShader:Wy,fragmentShader:Vy,transparent:!0,depthWrite:!1,blending:Hi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new qt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=mf(r),h=o*a.blockBars,l=[],d=[],f=[];if(a.on)for(const u of t){const m=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(m<=0)continue;const p=Gy(e,u.seed,1,r),M=e-u.ready,g=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,x=Math.max(p.on,g),v=g>p.on?a.maxCount:p.count;if(x<=.01)continue;const b=a.spread*Math.PI/180*p.open;for(let w=0;w<v;w++){const E=v===1?0:w/(v-1)-.5,y=a.maxTilt*Math.PI/180,A=Math.max(-y,Math.min(y,E*b+p.sweep)),_=Math.sin(A),S=Math.cos(A),R=-.15*Math.cos(A*3+u.seed),T=Yy(p.hue+w*.07),L=a.opacity*x*m;l.push(u.x,u.y,u.z,u.x+_*a.length,u.y+S*a.length,u.z+R*a.length),d.push(...T,L,...T,L),f.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(d.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Cn(this.pos,3).setUsage(nr)),this.geo.setAttribute("aCol",new Cn(this.col,4).setUsage(nr)),this.geo.setAttribute("aU",new Cn(this.u,1).setUsage(nr))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(d),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*Ky(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(x,v)=>{if(x<o.minX||x>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const b=n.areaAt(x,v).cell;return`${b[0]},${b[1]}`},l=`${e[0]},${e[1]}`,d=Math.ceil(2*r/a),f=s.x-r,u=s.z-r,m=[];for(let x=0;x<=d;x++){for(let v=0;v<=d;v++)m.push(h(f+v*a,u+x*a));yield}const p=new Set,M=Math.max(1,Math.round(a/t)),g=a/M;for(let x=0;x<d;x++,yield)for(let v=0;v<d;v++){const b=[m[x*(d+1)+v],m[x*(d+1)+v+1],m[(x+1)*(d+1)+v],m[(x+1)*(d+1)+v+1]];if(!b.includes(l)||b.every(E=>E===l))continue;const w=[];for(let E=0;E<=M;E++)for(let y=0;y<=M;y++)w.push(h(f+v*a+y*g,u+x*a+E*g));for(let E=0;E<=M;E++)for(let y=0;y<=M;y++){const A=w[E*(M+1)+y],_=f+v*a+y*g,S=u+x*a+E*g;for(const[R,T]of[[1,0],[0,1]]){if(y+R>M||E+T>M)continue;const L=w[(E+T)*(M+1)+y+R];if(A===L||A!==l&&L!==l)continue;const O=_+R*g*.5,I=S+T*g*.5,k=`${Math.round(O*4)},${Math.round(I*4)}`;p.has(k)||(p.add(k),i.push({x:O,z:I,other:A===l?L:A}))}}}}const qy=`
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
}`,$y=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${fi}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class Zy{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Xr(this.geo,new Mt({vertexShader:qy,fragmentShader:$y,uniforms:{...at,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Hi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new qt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,l]of e.party.areas){if(this.areas.has(h))continue;const d=e.map.siteOf(l.cell[0],l.cell[1]),f=l.from?e.map.siteOf(l.from[0],l.from[1]):null,u=f?(f.x+d.x)/2:d.x,m=f?(f.z+d.z)/2:d.z,p=e.map.areaSize*1.6,M=e.tuning.party.transition,g=or(Ft[e.map.typeOf(l.cell[0],l.cell[1])].creature),x={points:[],colour:new st(g[0]/255,g[1]/255,g[2]/255),on:(v,b)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(v-u,b-m)/p)*M,done:!1};this.areas.set(h,x),this.jobs.push({key:h,gen:Ky(e.map,l.cell,t.step,x.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const l of h.points)l.other!=="edge"&&e.party.areas.has(l.other)||(r.push(l.x,.15,l.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,h.on(l.x,l.z)));this.geo.setAttribute("position",new _t(r,3)),this.geo.setAttribute("aColour",new _t(a,3)),this.geo.setAttribute("aSpark",new _t(o,2))}}const Jy=["#ff6fcf","#5fe8ff","#ffe25c"];class Qy{canvas=document.createElement("canvas");g;v=new W;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,s,r,a,o,h,l,d){const f=this.v.set(s,1,r).project(e),u=Math.max(Math.abs(f.x),Math.abs(f.y)),m=f.z<1?Math.min(1,Math.max(0,(u-.9)/.25)):1;if(m<=.01){this.canvas.style.display="none";return}let p=f.x,M=f.y;f.z>=1&&(p=-p,M=-M);const g=1/Math.max(Math.abs(p)/.86,Math.abs(M)/.8,1e-6),x=(p*g+1)/2*t,v=(1-M*g)/2*i,b=Math.hypot(s-a,r-o),w=Math.max(.25,Math.min(1,1-b/900));this.canvas.style.display="block",this.canvas.style.left=`${x-48}px`,this.canvas.style.top=`${v-48}px`;const E=this.g,y=Math.atan2(-M,p);E.clearRect(0,0,96,96),E.save(),E.translate(48,48),E.rotate(y);const A=h*l/60,_=A-Math.floor(A);for(let S=0;S<3;S++){const R=(10+S*9+_*9)*(.7+.3*w),T=m*w*(1-(S+_)/3.2);E.strokeStyle=Jy[S],E.globalAlpha=Math.max(0,T),E.lineWidth=3,E.beginPath(),E.arc(26,0,R,Math.PI-.7,Math.PI+.7),E.stroke()}d&&(E.rotate(-y),E.globalAlpha=.8,E.fillStyle="#fff",E.font="10px monospace",E.textAlign="center",E.fillText(`${Math.round(b)} m`,0,40)),E.restore()}}class jy{canvas=document.createElement("canvas");g;v=new W;d=new W;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(T,L)=>{const O=this.v.set(T,0,L).project(e);return[(O.x+1)/2*t,(1-O.y)/2*i,O.z]};a.clearRect(0,0,t,i);const h=(T,L,O,I,k)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${k})`,a.lineWidth=1,a.beginPath(),a.moveTo(T,L),a.lineTo(O,I),a.stroke()},l=(T,L,O,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(T,L+1,O+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(T,L,O)},d=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!d||!f)return;const u=this.ground(e,-1,-1),m=this.ground(e,1,-1),p=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??m,g=Math.min(u.x,p.x),x=Math.max(m.x,M.x),v=Math.min(f.z,p.z),b=d.z;for(let T=Math.ceil(g/10)*10;T<=x;T+=10){const L=o(T,v),O=o(T,b);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}for(let T=Math.ceil(v/10)*10;T<=b;T+=10){const L=o(g,T),O=o(x,T);h(L[0],L[1],O[0],O[1],T%50===0?.28:.1)}const w=i-6;h(0,w,t,w,.6);for(let T=Math.ceil((u.x-s)/2)*2;s+T<=m.x;T+=2){const L=o(s+T,d.z)[0],O=T%10===0;h(L,w,L,w-(O?10:5),.6),O&&l(`${T}`,L,w-18,"center")}const E=6;h(E,0,E,i,.6);for(let T=Math.ceil((r-d.z)/2)*2;r-T>=f.z-1e-6&&T<400;T+=2){const L=o(s,r-T)[1],O=T%10===0;L<0||L>i||(h(E,L,E+(O?10:5),L,.6),O&&l(`${T}`,E+14,L,"left"))}const y=o(s,r),A=this.ground(e,-1,1-y[1]/i*2),_=this.ground(e,1,1-y[1]/i*2),S=A&&_?Math.round(_.x-A.x):0,R=Math.round(e.position.y);l(`camera ${R} m up · ${S} m across at the witch`,t-12,i-24,"right")}}const ew=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,tw=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${fi}
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
}`;class nw{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new Mt({vertexShader:ew,fragmentShader:tw,uniforms:{...at,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?Ei:tr}),this.mesh=new zt(new Yn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const iw=`
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
}`,sw=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${fi}
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
}`;class rw{mesh;geo=new $c;attr;capacity=0;constructor(e,t=!0){const i=new Yn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new Mt({vertexShader:iw,fragmentShader:sw,uniforms:{...at,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:po,blendSrc:Pc,blendDst:Dc}:{}});this.mesh=new zt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new hr(new Float32Array(this.capacity*4),4),this.attr.setUsage(nr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const aw=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function ow(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}const xl=["..ss..",".rwrr.","rrrrrd","rrrrdd",".rrdd.","..dd.."];function lw(n){const e=xl[0].length,t=xl.length,i=n.replace("#",""),s=[0,2,4].map(p=>parseInt(i.slice(p,p+2),16)),a={r:s,d:(p=>s.map(M=>Math.max(0,Math.min(255,Math.round(M*p)))))(.55),w:[255,236,236],s:[70,52,30]},o=()=>{const p=document.createElement("canvas");return p.width=e,p.height=t,p},h=o(),l=o(),d=h.getContext("2d"),f=l.getContext("2d"),u=d.createImageData(e,t),m=f.createImageData(e,t);for(let p=0;p<t;p++)for(let M=0;M<e;M++){const g=xl[p][M],x=(p*e+M)*4;if(g===".")continue;const v=a[g];u.data.set([v[0],v[1],v[2],255],x),m.data.set([128,128,255,255],x)}return d.putImageData(u,0,0),f.putImageData(m,0,0),{A:h,N:l,w:e,h:t}}function cw(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class hw{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=aw(s),this.renderer=new o5({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Yr,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new Bn(s.camera.fov,1,1,900),this.post=new fy(this.renderer,s),this.scene.background=new st(723478),ty({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient,s.glowFalloff),at.uGlowPower.value=s.glowPower,this.assets=new ey(i,t.seed,s.pixelSize),this.ground=new sy(t.map,t.forest,i,this.mpp),this.assets.onFloor=(u,m)=>this.ground.setFloor(u,m);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new rw(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";at.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new nw(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Yh,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),at.uHazeRange.value.set(s.haze.near,s.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new oy(t.map,i,this.mpp).group);const o=s.occlusion;this.witchBatch=new kn(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:at.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Nt.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new kn(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.markerArt=new yy(i,s),this.markerBatch=new kn(this.markerArt.atlas,this.mpp,{fade:!0}),this.scene.add(...this.markerBatch.meshes,this.markerFx.group),this.stoneBatch=new kn(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,l=[],d=t.tuning.dancefloor.stones;for(let u=0;u<d;u++){const m=u/d*Math.PI*2+.3;l.push({x:h.x+Math.cos(m)*h.radius,y:0,z:h.z+Math.sin(m)*h.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(l),this.propBatch=new kn(this.assets.props,this.mpp,{fade:!0}),this.berryBatch=new kn(Ms([lw(s.berries.colour)],64),this.mpp,{unlit:!0}),this.scene.add(...this.berryBatch.meshes),this.scene.add(...this.propBatch.meshes),this.partyView=new _y(this.assets.soundsystems,this.mpp),this.strings=new Ny(this.scene,t),this.leashView=new zy(this.scene,t),this.lasers=new Xy(this.scene,t),this.borders=new Zy(this.scene,t),this.soundBatch=new kn(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new vy(t.map,s,Nt,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=s.fx==="smooth"?new Mt({transparent:!0,depthWrite:!1,blending:po,blendSrc:Pc,blendDst:Dc,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new Mt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new zt(new Yn(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Yh;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;markerArt;markerBatch;markerFx=new Ay;markerCache={wave:-1,n:-1,list:[]};seatK=1;seatTime=0;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new Qy(document.body);rulers=new jy(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;quick=!1;ghosts=[];ghostLines=null;now=0;stats={berries:0,forestMs:0,forestMissing:0,sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Nt.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);const e=this.game.map,t=this.game.witch,i=new Map;for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=e.siteOf(r,s),o=e.typeOf(r,s),h=Math.hypot(a.x-t.x,a.z-t.z);i.get(o)<=h||i.set(o,h)}for(let s=0;s<Ft.length;s++)i.has(s)||i.set(s,1/0);if(this.prepared=!0,!this.quick){for(const[s]of[...i].sort((r,a)=>r[1]-a[1]))this.assets.prefetchType(s);for(const s of Ft)this.assets.creatureArt(s.creature)}}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes),this.prepared&&(s.appearU.value=0,this.appearing.set(s,performance.now())))),s}appearing=new Map;prepared=!1;easeAppearing(){const e=performance.now();for(const[t,i]of this.appearing){const s=Math.min(1,(e-i)/800);t.appearU.value=s*s*(3-2*s),s>=1&&this.appearing.delete(t)}}frustum=new io;frustumTo=new io;cullCam=new Bn;box=new rs;m4=new It;v3=new W;v3b=new W;v3c=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=Xu({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Zn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,l=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const d of[-1,1])for(const f of[-1,1]){const u=this.v3.set(d,f,1).unproject(o).sub(h).normalize();for(const m of[0,25]){let p=u.y<-.001?(m-h.y)/u.y:1/0;p>0||(p=1/0),p=Math.min(p,l),s.push([h.x+u.x*p,h.z+u.z*p])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,l=a+r;return(e-o)**2+(t-h)**2>l*l?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,l,d]=a??o.map(Number);this.ghosts.push({x:+h,z:+l,h:Math.max(1,+d),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[l,...d]=a.split("|"),[f,u,m]=h??d.map(Number),p=this.game.witch;!(e==="placed"&&Math.hypot(+f-p.x,+u-p.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+u,+m)&&this.pops.push(`${o} ${l} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};if(e!=="placed"||!this.appearing.size)for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastView=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=Th(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,d=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,f=this.budget.radius,u=Math.min(i.haze.far,f+r/2),m=Math.abs(f-this.lastBuild.radius)>=r/3,p=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||l!==h.lift;if(!e&&!d&&!p&&!m&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const M=this.viewRect(u,r),g=(M.minX+M.maxX)/2,x=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2;this.lastView={x:g,z:x,half:v};const b=[],w=at.uMoonDir.value,E=-w.x/Math.max(.2,w.y),y=-w.z/Math.max(.2,w.y),A=new Map,_=(N,ee)=>{let se=A.get(N);se||A.set(N,se=[]),se.push(ee)},S=this.mpp,R=a.angle*Math.PI/180,T=Nt.uUp.value.dot(this.v3.set(0,Math.cos(R),-Math.sin(R))),L=Nt.uUp.value,O=(N,ee,se,ue)=>{const xe=(se.pad??0)*ue;return{x:N-L.x*xe,y:-L.y*xe,z:ee-L.z*xe}};let I=0,k=0;for(const N of t.forest.treesNear(g,x,v)){const ee=this.assets.typeArt(N.type);if(!ee||!ee.layout.big.length)continue;const se=ee.atlas.frames,ue=ee.layout.big[cw(ee.layout.bigWeight,N.variant)],xe=se[ue.top??ue.bot];if(!this.inView(N.x,N.z,xe.w*S,xe.h*S,r,u))continue;const Le=xe.h*S,B=i.treeCap,z=Le>B.from?(B.from+(Le-B.from)*B.keep)/Le:1,F=this.mark("tree",N.x,N.z,Le*z),Z=O(N.x,N.z,se[ue.bot],S*z);_(N.type,{...Z,frame:se[ue.bot],flip:N.flip,fresh:F,scale:z}),ue.top!==null&&_(N.type,{...Z,frame:se[ue.top],flip:N.flip,top:!0,fresh:F,scale:z});const j=xe.w*S,ce=xe.h*S*(ue.top===null?.2:.6);i.shadows.trees&&b.push({x:N.x+E*ce,z:N.z+y*ce,w:j*.8,d:j*.45,scenery:!0}),I++}const H=(N,ee,se)=>{for(const ue of ee){const xe=this.assets.typeArt(ue.type);if(!xe)continue;const Le=se(xe.layout);if(!Le.length)continue;const B=Le[ue.variant%Le.length],z=xe.atlas.frames,F=z[B.bot],Z=z[B.top??B.bot],j=N==="setpiece"?i.setPieceScale:1,ce=S*j;let ye=ue.x,be=ue.z;if(B.origin){const Ne=ue.flip?F.w-B.origin.x:B.origin.x;ye+=(F.w/2-Ne)*ce,be+=(F.h-(F.pad??0)-B.origin.y)*ce*T/Math.max(.2,Math.sin(R))}if(!this.inView(ye,be,Z.w*ce,Z.h*ce,r,u))continue;const oe=this.mark(N,ue.x,ue.z,Z.h*ce),ge=O(ye,be,F,ce);_(ue.type,{...ge,frame:F,flip:ue.flip,fresh:oe,scale:j}),B.top!==null&&_(ue.type,{...ge,frame:z[B.top],flip:ue.flip,top:!0,fresh:oe,scale:j});const Me=F.w*ce*.3;N!=="setpiece"&&b.push({x:ue.x,z:ue.z-Me*.4,w:F.w*ce*.8,d:Me,scenery:!0}),k++}};H("small",t.forest.bushesNear(g,x,v),N=>N.small),H("small",t.forest.bedsNear(g,x,v),N=>N.small),H("berrybush",t.berries.bushes.filter(N=>Math.abs(N.x-g)<=v&&Math.abs(N.z-x)<=v),N=>N.small),H("wall",t.forest.wallsNear(g,x,v),N=>N.walls.map(ee=>({bot:ee,top:null}))),H("setpiece",t.forest.setPiecesNear(g,x,v),N=>N.set===null?[]:[N.set]);const K=this.assets.decorArt(),ae=[];if(K)for(const N of t.forest.decorNear(g,x,v)){const ee=K.families[N.family];if(!ee?.length)continue;const se=ee[N.variant%ee.length],ue=K.atlas.frames,xe=ue[se.bot],Le=ue[se.top??se.bot];if(!this.inView(N.x,N.z,Le.w*S,Le.h*S,r,u))continue;const B=this.mark("decor",N.x,N.z,Le.h*S),z=O(N.x,N.z,xe,S);ae.push({...z,frame:xe,flip:N.flip,fresh:B}),se.top!==null&&ae.push({...z,frame:ue[se.top],flip:N.flip,top:!0,fresh:B});const F=xe.w*S*.3;b.push({x:N.x,z:N.z-F*.4,w:xe.w*S*.8,d:F,scenery:!0}),k++}const q=this.assets.pathPieceArt();if(q){const N=[],ee=Nt.uRight.value;for(const se of t.map.paths.pieces){if(Math.abs(se.x-g)>v||Math.abs(se.z-x)>v)continue;const ue=q.byId[se.id];if(!ue)continue;const xe=q.atlas.frames[ue.frame],Le=(ue.originX-xe.w/2)*S,B=Math.max(0,xe.h-(xe.pad??0)-ue.originY)*S,z=O(se.x-ee.x*Le,se.z-ee.z*Le+B*T/Math.max(.2,Math.sin(R)),xe,S);if(!this.inView(z.x,z.z,xe.w*S,xe.h*S,r,u))continue;N.push({...z,frame:xe,flip:!1,fresh:this.mark("pathpiece",se.x,se.z,xe.h*S)});const F=xe.w*S*.25;b.push({x:se.x,z:se.z,w:xe.w*S*.7,d:F,scenery:!0}),k++}this.batchFor(this.decorBatches,"pieces",()=>new kn(q.atlas,S,{scenery:!0,fade:!0}))?.set(N)}const ie=this.assets.relicArt();if(ie){const N=this.camera.getWorldDirection(this.v3b),ee=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),se=Nt.uUp.value,ue=Nt.uRight.value,xe=se.dot(ee)/Math.max(.2,-N.y),Le=[],B=[],z=(F,Z,j,ce)=>{const ye=ie.atlas.frames[F.frame],be=F.decal?0:ye.pad??0,oe=(F.originX-ye.w/2)*S*(ce?-1:1),ge=Math.max(0,ye.h-be-F.originY)*S*xe,Me=F.decal?{x:Z-ue.x*oe,y:0,z:j-ue.z*oe+ge}:O(Z-ue.x*oe,j-ue.z*oe+ge,ye,S);this.inView(Me.x,Me.z,ye.w*S,ye.h*S,r,u)&&((F.decal?B:Le).push({...Me,frame:ye,flip:ce,fresh:this.mark("relic",Z,j,ye.h*S)}),F.decal||b.push({x:Z,z:j,w:ye.w*S*.6,d:ye.w*S*.22,scenery:!0}),k++)};if(ie.modern.length)for(const F of t.forest.relicsNear(g,x,v))z(ie.modern[F.variant%ie.modern.length],F.x,F.z,F.flip);for(const F of t.map.grounds)if(!(Math.abs(F.x-g)>v+F.r||Math.abs(F.z-x)>v+F.r))for(const Z of ie.layouts[F.kind]??[]){const j=ie.byId[Z.id];j&&z(j,F.x+Z.x,F.z+Z.z,!1)}this.batchFor(this.decorBatches,"relics",()=>new kn(ie.atlas,S,{scenery:!0,fade:!0}))?.set(Le),this.batchFor(this.decorBatches,"decals",()=>{const F=new kn(ie.atlas,S,{scenery:!0,flat:!0});for(const Z of F.meshes)Z.renderOrder=-.5,Z.material.depthWrite=!1;return F})?.set(B)}K&&this.batchFor(this.decorBatches,"all",()=>new kn(K.atlas,S,{scenery:!0,fade:!0}))?.set(ae);for(const[N,ee]of this.typeBatches)A.has(N)||ee.set([]);for(const[N,ee]of A)this.batchFor(this.typeBatches,N,()=>{const ue=this.assets.typeArt(N);return ue&&new kn(ue.atlas,S,{scenery:!0,fade:!0})})?.set(ee);{const N=t.map.treehouse;b.push({x:N.x,z:N.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=I,this.stats.bushes=k,this.shadowList=b}drawMarkers(e){const t=this.game,i=t.tuning,s=i.runeMarkers,r=t.witch,a=i.haze.far+20,o=this.markerCache;(o.wave!==t.party.wave||o.n!==t.party.areas.size)&&(o.wave=t.party.wave,o.n=t.party.areas.size,o.list=fm(t.party,t.map));const h=yd(t.party,t.map,e),l=t.party.paused?0:h.gone,d=e*i.beat.bpm/60,f=Math.pow(.5+.5*Math.cos(d*Math.PI*2),2),u=[],m=[],p=[],M=[],g=s.scale,x=(b,w,E,y,A=0)=>{const _=this.markerArt.atlas.frames[this.markerArt.frame(E,y)];return this.inView(b,w,_.w*this.mpp*g,_.h*this.mpp*g,6)?(u.push({x:b,y:A,z:w,frame:_,flip:!1,scale:g,fresh:this.mark("marker",b,w,_.h*this.mpp*g)}),!0):!1},v=[];for(const b of o.list){const w=Math.hypot(b.x-r.x,b.z-r.z);if(w>a)continue;const E=Ft[t.map.typeOf(b.cell[0],b.cell[1])].creature,y=this.markerArt.colour.get(E),A=b.awake?1+Math.round(Math.min(1,f*(.4+.6*l))*(Hr-2)):0;x(b.x,b.z,E,A);const _=s.awake,S=s.dormant,R=b.awake?(_.light+_.lightBuild*l)*(.55+.45*f):S.light;if(w<s.lightRange&&v.push({d:w,l:{x:b.x,y:.5,z:b.z+1.5,reach:b.awake?_.reach:S.reach,rgb:y,strength:R}}),p.push({x:b.x,z:b.z,colour:y,strength:b.awake?_.beam*(.6+.4*f)*(1+l):S.beam}),b.awake){const T=Math.round(_.motes+_.moteBuild*l);for(let L=0;L<T;L++){const O=(b.cell[0]*31+b.cell[1]*17+L*7.3)%1||.37*(L+1)%1,I=(e*(.25+.15*(L*.618%1))+L/T)%1,k=L*2.399+b.cell[0];M.push({x:b.x+Math.cos(k)*(.6+I*1.4),y:.6+I*7,z:b.z+Math.sin(k)*(.6+I*1.4),colour:y,alpha:(1-I)*(.5+.5*f)*(.6+O*.4)})}}}for(const b of t.party.areas.values()){if(!b.soundsystem||e-b.at>s.flare.time||e<b.at)continue;const w=(e-b.at)/s.flare.time,E=Ft[t.map.typeOf(b.cell[0],b.cell[1])].creature,y=this.markerArt.colour.get(E),A=t.map.soundsystemSpot(b.cell[0],b.cell[1]);x(A.x,A.z,E,Hr-1,-w*w*4*g),v.push({d:0,l:{x:A.x,y:2.5,z:A.z,reach:s.awake.reach*1.5,rgb:y,strength:s.flare.light*(1-w)}})}v.sort((b,w)=>b.d-w.d);for(const b of v.slice(0,8))m.push(b.l);return this.markerBatch.set(u),this.markerFx.update(p,s.beamHeight,Ao(r),M),m}berryBatch;regrewAt=new Map;evolvedAt=new Map;drawBerries(e){const t=this.game,i=t.berries,s=t.witch,r=t.tuning.haze.far,a=this.berryBatch.atlas.frames[0],o=[];for(const h of i.events)h.kind==="regrew"&&this.regrewAt.set(h.id,e),h.kind==="evolved"&&this.evolvedAt.set(h.id,e);for(const[h,l]of this.regrewAt)e-l>.6&&this.regrewAt.delete(h);for(const[h,l]of this.evolvedAt)e-l>1.2&&this.evolvedAt.delete(h);for(const h of i.berries){const l=i.bushes[h.bush];if(Math.abs(l.x-s.x)>r||Math.abs(l.z-s.z)>r||!this.inView(l.x,l.z,.5,1.2,2))continue;const d=this.regrewAt.get(h.id),f=d===void 0?1:Math.min(1,(e-d)/.5);f<=.05||o.push({x:l.x,y:.75,z:l.z+.25,frame:a,flip:!1,scale:f})}this.berryBatch.set(o),this.stats.berries=o.length}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>i||Math.abs(l.z-t.witch.z)>i)continue;const d=l.leashed?this.assets.partyArt(l.species,l.id,or(l.species)):void 0,f=d??this.assets.creatureArt(l.species),u=d?`party-${l.id}`:l.species;if(!f)continue;r.set(u,f);const m=f.atlas.frames[f.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,m.w*this.mpp,m.h*this.mpp,4))continue;const p=this.mark("creature",l.x,l.z,m.h*this.mpp,l.id);let M=s.get(u);M||s.set(u,M=[]);const g=(e/o+l.id%4*.25)*Math.PI,x=l.leashed?Math.abs(Math.sin(g))*(l.moving?.15:.4):0,v=l.leashed&&!l.moving?Math.sin(g*.5)*.12:0,b=t.berries.evolving.get(l.id),w=this.evolvedAt.get(l.id);let E=0,y=1;if(b){const A=Math.min(1,(e-b.since)/Math.max(.1,b.at-b.since)),_=.5+.5*Math.cos(e/o*Math.PI*2);E=Math.min(1,(.25+.5*A)*(.55+.45*_)+(b.at-e<.12?1:0))}else if(w!==void 0){const A=e-w;E=Math.max(0,1-A/.2),y=1+.3*Math.max(0,1-A/.5)**2}M.push({x:l.x+v,y:x,z:l.z,frame:m,flip:l.facing<0,fresh:p,glow:E,scale:y}),a.push({x:l.x,z:l.z,w:m.w*this.mpp*.7,d:m.w*this.mpp*.25}),h++}for(const[l,d]of this.creatureBatches)s.has(l)||d.set([]);for(const[l,d]of s)this.batchFor(this.creatureBatches,l,()=>{const u=r.get(l);return u&&new kn(u.atlas,this.mpp)})?.set(d);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=Re(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,l.w*this.mpp,l.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:l,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(rr,this.game.tuning.lightBudget),r=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-i)-l.reach})).sort((l,d)=>l.d-d.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=at;let h=0;for(const{l,d}of r.slice(0,s)){const f=Math.min(1,Math.max(0,(a-d)/15));o.uLightPos.value[h].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[h].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Xc(new qt,new Xd({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Nt.uRight.value,i=Nt.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(m,p)=>[a.x+t.x*m*o+i.x*p*a.h,t.y*m*o+i.y*p*a.h,a.z+t.z*m*o+i.z*p*a.h],l=h(-1,0),d=h(1,0),f=h(1,1),u=h(-1,1);s.push(...l,...d,...d,...f,...f,...u,...u,...l,...l,...f)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new _t(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=Nt.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),l=i[0].pad??0,d=Math.max(0,i[0].h-l-t.base.y)*r,f=l*r,u=s.x-(t.base.x-i[0].w/2)*r,m=s.z+d*h/Math.max(.2,Math.sin(o)),p={x:u-a.x*f,y:-a.y*f,z:m-a.z*f};return this.treehouseBatch.set([{...p,frame:i[0],flip:!1},{...p,frame:i[1],flip:!1,top:!0}]),p}render(e,t=!0){const i=this.game,s=i.tuning,r=Th(i);if(t){const oe=performance.now();this.lastReal&&(this.budget=ow(this.budget,(oe-this.lastReal)/1e3,s)),this.lastReal=oe}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),at.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new W(0,Math.cos(a),-Math.sin(a)),l=new W(r.tx,r.ty,r.tz),d=l.dot(h),f=l.x;l.addScaledVector(h,Math.round(d/o)*o-d),l.x+=Math.round(f/o)*o-f;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(l).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const m=s.spriteTilt;Nt.uUp.value.set(0,1,0).lerp(h,m).normalize(),Nt.uFacing.value.crossVectors(Nt.uRight.value,Nt.uUp.value).normalize();const p=Ao(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const g=this.v3.set(i.witch.x,lr(i.witch,s)*.5,i.witch.z).project(this.camera);Nt.uCutout.value.set((g.x*.5+.5)*this.width,(g.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-p),Math.max(1,M.edge*this.width*(1-p))),Nt.uTopFade.value=p,Nt.uDebugCull.value=this.debugCull?1:0;const x=i.witch,v=lr(x,s);at.uGlowPos.value.set(x.x,v+s.glowHeight,x.z),at.uHazeCentre.value.set(x.x,x.z),this.updateSources(e);const b=this.partyView.update(i,e,(oe,ge,Me,Ne)=>this.inView(oe,ge,Me,Ne,4),()=>!1);this.soundBatch.set(b.items),this.ground.setSweeps(b.sweeps),this.lasers.update(e,b.playing,x.x,x.z);{const oe=Nt,ge=s.party,Me=[...i.party.areas.values()].map(Ne=>({a:Ne,s:i.map.siteOf(Ne.cell[0],Ne.cell[1])})).sort((Ne,Ze)=>Math.hypot(Ne.s.x-x.x,Ne.s.z-x.z)-Math.hypot(Ze.s.x-x.x,Ze.s.z-x.z)).slice(0,16);Me.forEach(({a:Ne,s:Ze},lt)=>{const gt=Ne.wave===0?1:Math.min(1,Math.max(0,(e-Ne.at)/Math.max(.01,ge.transition)));oe.uParty.value[lt].set(Ze.x,Ze.z,i.map.areaSize*.85,gt);const ut=or(Ft[i.map.typeOf(Ne.cell[0],Ne.cell[1])].creature);oe.uPartyCol.value[lt].set(ut[0]/255,ut[1]/255,ut[2]/255)}),oe.uPartyCount.value=Me.length,oe.uUplight.value.set(ge.uplight.strength,ge.uplight.pulse,ge.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const w=this.assets.treehouse,E=w.atlas.frames[0],y=this.placeTreehouse(r.angle),A=Nt,_=(oe,ge)=>{const Me=A.uRight.value,Ne=A.uUp.value,Ze=(oe-E.w/2)*this.mpp,lt=(E.h-ge)*this.mpp;return{x:y.x+Me.x*Ze+Ne.x*lt,y:y.y+Me.y*Ze+Ne.y*lt,z:y.z+Me.z*Ze+Ne.z*lt}},S=w.lights.filter(oe=>oe.kind==="lantern"||oe.kind==="window").slice(0,2).map(oe=>({..._(oe.x,oe.y),reach:s.treehouse.lightReach,rgb:new W(oe.rgb[0]/255,oe.rgb[1]/255,oe.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+oe.x))})),R=this.drawMarkers(e);this.setLights([this.dancefloor.update(e,this.ground),...b.lights,...S,...R,...this.forestLights],x.x,x.z),at.uTime.value=e,this.mist?.follow(r.tx,r.tz);const T=Math.sin(e*2.4)*.12,L=x.mode==="rising"&&x.lift<.9,O=x.mode==="descending"&&x.lift>.1;let I=L||O?(L?8:12)+(x.away?2:0)+Math.floor(e*7)%2:x.lean?6+(x.away?1:0):(x.away?3:0)+Math.floor(e*4)%3;if(!L&&!O){const oe=this.assets.witchFly,ge=x.away?"away":"towards";x.braking?I=oe.brake[ge][Math.floor(e*oe.brake.fps)%oe.brake[ge].length]:(x.boost??0)>.7&&(I=oe.fast[ge][Math.floor(e*oe.fast.fps)%oe.fast[ge].length])}const k=i.leash,H=this.assets.witchFoot,K=x.away?"away":"towards";for(const oe of k.events)oe.kind==="placed"||oe.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:oe.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const ae=this.footAct?H[this.footAct.pose].towards.length/H[this.footAct.pose].fps:0,q=!!this.footAct&&e-this.footAct.at<ae+.3,ie=x.mode==="ground"&&(k.talk||k.held||q)?1:0,N=Math.min(.1,Math.max(0,e-this.footTime)),ee=this.foot;this.footTime=e,this.foot+=(ie-this.foot)*Math.min(1,N*8),Math.abs(ie-this.foot)<.01&&(this.foot=ie);const se=(oe,ge)=>{const Me=H[oe][K];return Me[Math.max(0,Math.min(Me.length-1,ge))]};this.foot>.6?q&&this.footAct?I=se(this.footAct.pose,Math.floor((e-this.footAct.at)*H[this.footAct.pose].fps)):k.talk?I=se("talk",Math.floor(e*H.talk.fps)%H.talk[K].length):I=se("stand",Math.floor(e*H.stand.fps)%H.stand[K].length):this.foot>.02&&(I=this.foot>=ee?se("land",Math.floor(this.foot*3)):se("takeoff",Math.floor((1-this.foot)*3)));const ue=this.foot*this.foot*(3-2*this.foot),xe=(v+T-.4)*(1-ue),Le=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=x.seated?1:Math.max(0,this.seatK-Le/.6);let B=x.x,z=x.z,F=xe;if(this.seatK>0){const oe=_(w.seat.x,w.seat.y),ge=this.seatK*this.seatK*(3-2*this.seatK),Me=this.camera.getWorldDirection(this.v3);B+=(oe.x-Me.x*.6-B)*ge,F+=(oe.y-Me.y*.6-F)*ge,z+=(oe.z-Me.z*.6-z)*ge,x.seated&&(I=H.sit.towards[Math.floor(e*H.sit.fps)%H.sit.towards.length])}const Z=this.assets.witch.frames[I],j=F+Z.h*this.mpp;this.witchBatch.set([{x:B,y:F,z,frame:Z,flip:x.seated?!1:x.facing<0}]);{const oe=(Ze,lt,gt)=>{const ut=this.v3.set(Ze,lt,gt).project(this.camera);return[(ut.x+1)/2*this.width,(ut.y+1)/2*this.height]},ge=oe(B,F,z),Me=oe(B,j,z),Ne=oe(B+Z.w*this.mpp/2,F,z);Nt.uWitch.value.set((ge[0]+Me[0])/2,(ge[1]+Me[1])/2,Math.abs(Ne[0]-ge[0])+1,Math.abs(Me[1]-ge[1])/2+1),Nt.uWitchDepth.value=-this.v3.set(B,this.seatK>0?F:v,z).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(B,.03,z),this.shadow.scale.setScalar((1-.5*Ao(x))*(1-this.seatK)+.001),this.refresh(),this.easeAppearing();const ce=this.lastView;ce&&(this.stats.forestMissing=i.forest.prefetch(ce.x+x.vx*2,ce.z+x.vz*2,ce.half+64,4)),this.stats.forestMs=i.forest.buildMs,i.forest.buildMs=0,this.drawCreatures(e),this.drawBerries(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,x.x,x.z);const ye=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,ye.x,ye.z,x.x,x.z,e,s.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,j),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),x.x,x.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let be=0;for(const oe of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])be+=oe.dropped;be&&!this.stats.dropped&&console.warn(`view: ${be} sprite instances set but not drawn`),this.stats.dropped=be,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const uw="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",dw="Lab default",fw={},pw={_readme:uw,name:dw,style:fw};function mw(n=pw){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=H5();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function gw(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",m=>{if(!(m.pointerType==="mouse"||r!==null)){h(),r=m.pointerId,a=m.clientX,o=m.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(m.pointerId)}catch{}m.preventDefault()}}),l.addEventListener("pointermove",m=>{if(m.pointerId!==r)return;let p=m.clientX-a,M=m.clientY-o;const g=Math.hypot(p,M);g>s&&(p*=s/g,M*=s/g),i.style.transform=`translate(${p}px, ${M}px)`;const x=Math.min(1,g/s),v=.15,b=x<v?0:(x-v)/(1-v)/Math.max(1e-6,x);e.x=p/s*b,e.y=M/s*b});const d=m=>{m.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",d),l.addEventListener("pointercancel",d);const f=(m,p)=>{const M=n.querySelector(m);M.addEventListener("pointerdown",g=>{g.preventDefault(),g.stopPropagation(),p(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const m of["pointerup","pointerleave","pointercancel"])u.addEventListener(m,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",m=>{h(),m.touches.length===3&&(e.debug=!0)},{passive:!0})}const xw=[{version:null,items:["Berries: every area has bushes with shiny dark-red berries (8–12 per area), glowing softly at night and glinting red through the treetops","Party animals walk over to a berry near them and eat it; it grows again somewhere else in the forest","Feed a party animal enough berries and it evolves (babies after 5, young after 10, adults after 30): it glows and pulses for a bar, then flashes into its next size with a burst of sparkles. Adults become legends: the only way to get a party legend","A red ring round each party animal shows how close it is to evolving (near the witch, and just after it eats). Debug: B feeds the nearest party animal a berry","Nothing floats any more: trees, rocks, ruins, the treehouse and set pieces all stand on the ground, and big scenery keeps clear of the soundsystems","Fewer ruins, rocks, relics, stairs and bridges: each is a find now, not clutter","The witch's own light is a tighter pool round her that fades out within about 40 m (try ?glow=50,2.5 to tune it)","Garden walls stand in joined runs along the paths, with flower beds in rows beside them; shrine stones stand in circles; hedges, brambles and rock walls run in lines; water, reeds and boulders gather in clumps, with open ground between","The edge of the see-through hole in the treetops round the witch fades smoothly (no dither)","Big rune stones now mark where every soundsystem will come, glowing with their area's creature's sigil. The next wave's stones wake: they pulse to the beat, throw light and motes, brighter as the wave nears, and send a beam above the trees; when the party arrives the stone flares and sinks as its soundsystem appears. The random rune stones are gone"]},{version:144,items:["Points where a branch line leaves the railway"]},{version:136,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],Mw={entries:xw},hn=new URLSearchParams(location.search);let Ss=Dp(hn.get("seed"));Ss===null&&(Ss=Math.floor(Math.random()*1e6),hn.set("seed",String(Ss)),history.replaceState(null,"","?"+hn.toString()+location.hash));const Jt={...os,bloom:{...os.bloom},tiltShift:{...os.tiltShift},shadows:{...os.shadows},canopyShadow:{...os.canopyShadow},mist:{...os.mist},party:{...os.party}};hn.get("shadows")==="off"&&(Jt.shadows.on=!1);hn.get("canopy")==="off"&&(Jt.canopyShadow.on=!1);hn.get("mist")==="off"&&(Jt.mist.on=!1);const Oa=hn.get("tilt");Oa==="off"?Jt.tiltShift.on=!1:(Oa==="before"||Oa==="after")&&(Jt.tiltShift.on=!0,Jt.tiltShift.where=Oa);hn.get("bloom")==="off"&&(Jt.bloom.on=!1);hn.get("moonbeams")==="on"&&(Jt.moonbeams=1);const ar=hn.get("glow")?.split(",").map(Number);ar&&ar[0]>0&&(Jt.glowReach=ar[0]);ar&&ar[1]>0&&(Jt.glowFalloff=ar[1]);const Ml=hn.get("fx");(Ml==="pixel"||Ml==="smooth")&&(Jt.fx=Ml);const tn=pm(Ss,Jt),gf=[30,60,120,300,600,0];function xf(n){Jt.party.interval=n>0?n:1e9,tn.party.paused=n===0,tn.party.nextAt=tn.clock.time+Jt.party.startDelay+Jt.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Zc=Jt.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&gf.includes(+n)&&(Zc=+n)}catch{}const vl=hn.get("wave");vl!==null&&(Zc=vl==="off"?0:Math.max(0,+vl||0));const vw=document.getElementById("game"),bl=mw(),Jc={viewStart:performance.now(),view:0,ready:0},Wn=new hw(vw,tn,{...bl,pixel:Jt.pixelSize,treeSize:bl.treeSize*Jt.treeHeight,crownWidth:bl.crownWidth*Jt.crownWidth/Jt.treeHeight});Jc.view=performance.now();Wn.debugCull=hn.get("debug")==="cull";Wn.quick=hn.get("quick")==="1";const Gu=Number(hn.get("scenery"));hn.has("scenery")&&Gu>0&&(Wn.sceneryFixed=Gu);const _r=new K1;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),_r.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),_r.touch.pauseWaves=!0});gw(document.body,_r.touch);Wn.rulers.on=hn.has("debug");const Mf=()=>{Wn.rulers.on=!Wn.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&Mf()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),Mf()});const vf=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&vf.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=vf.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v170 · 1ac53c9";const bw=document.getElementById("news"),_w="v170 · 1ac53c9".split(" ")[0],yw=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);bw.innerHTML="<b>What's new</b>"+Mw.entries.filter(n=>n.items.length).slice(0,3).map(n=>`<div>${n.version===null?`${_w} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${yw(e)}</li>`).join("")}</ul>`).join("");const ww=document.getElementById("seed");ww.innerHTML=`seed <a href="?seed=${Ss}">${Ss}</a>`;const gc=document.getElementById("debug"),Qc=document.getElementById("start"),bf=document.getElementById("debug-buttons"),jc=document.getElementById("wave"),Sw=jc.querySelector(".fill"),Ew=jc.querySelector(".label");let ts=hn.has("debug");gc.classList.toggle("on",ts);bf.classList.toggle("on",ts);const _f=()=>Wn.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",_f);_f();let pr=!1;const eh=document.getElementById("progress"),Aw=eh.querySelector(".fill"),Tw=eh.querySelector(".label"),Rw=setInterval(()=>{const n=Wn.assets,e=n.done,t=e+n.pending;Aw.style.width=`${t?100*e/t:0}%`,Tw.textContent=pr?`the rest of the forest, in the background: ${e} of ${t}`:`growing the forest: ${e} of ${t}`,pr&&!n.pending&&(eh.classList.add("done"),clearInterval(Rw))},250);requestAnimationFrame(()=>setTimeout(async()=>{await Wn.prepare(),pr=!0,Jc.ready=performance.now(),Qc.classList.remove("loading")},0));let Wu=null;function yf(){if(!pr||!tn.clock.paused)return!1;try{Wu??=new AudioContext,Wu.resume()}catch{}return tn.clock.paused=!1,Qc.style.display="none",_r.clearPresses(),!0}_r.onAny=yf;Qc.addEventListener("pointerdown",n=>{n.preventDefault(),yf()});const wf=document.getElementById("waves");wf.innerHTML="waves every "+gf.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");wf.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;xf(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});xf(Zc);document.addEventListener("visibilitychange",()=>{document.hidden&&(Xa=0)});let Vu=0,Xa=0,Yu=60,_l=0,Na=0;function Sf(n){requestAnimationFrame(Sf);const e=Xa?(n-Xa)/1e3:0;Xa=n,_l++,Na+=e,Na>=.5&&(Yu=_l/Na,_l=0,Na=0);const t=_r.read();if(t.debug&&(ts=!ts,gc.classList.toggle("on",ts),bf.classList.toggle("on",ts)),Wn.debugReadouts=ts,mm(tn,t,e),!pr)return;const i=yd(tn.party,tn.map,tn.clock.time);Sw.style.height=`${(1-i.gone)*100}%`;const s=Jt.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(Ew.textContent=`wave ${tn.party.wave} · ${tn.party.areas.size} areas · ${s}`,jc.classList.toggle("paused",tn.party.paused),!(tn.clock.paused&&n-Vu<300)&&(Vu=n,Wn.render(tn.clock.time),ts)){const r=tn.witch,a=Wn.stats;gc.textContent=[`fps    ${Yu.toFixed(0)}`,`seed   ${Ss}`,`area   ${wd(tn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${tn.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(Sf);window.witch={game:tn,view:Wn,areaUnderWitch:()=>wd(tn),areaTypeId:n=>Ft[n].id,spriteUp:()=>Nt.uUp.value,loadTimes:Jc,get ready(){return pr}};
