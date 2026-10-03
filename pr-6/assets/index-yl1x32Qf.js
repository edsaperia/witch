(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function xi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Je(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function $o(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Je(n,r,t),u=Je(n+1,r,t),f=Je(n,r+1,t),h=Je(n+1,r+1,t);return l+(u-l)*o+(f-l)*c+(l-u-f+h)*o*c}const Mn=(i,e,t)=>i+(e-i)*t,vi=(i,e,t)=>Math.min(t,Math.max(e,i)),ii=i=>{const e=vi(i,0,1);return e*e*(3-2*e)};function Tu(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=vi(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Hs(i,e,t,n,r){const s=n*r,a=Math.exp(-s),o=i-t,c=e+n*o;return[t+(o+c*r)*a,(e-n*c*r)*a]}function Au(i,e,t,n,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=vi(i.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let f=n.x*o.lookAhead,h=n.z*o.lookAhead;const d=Math.hypot(f,h);d>o.lookAheadMax&&(f*=o.lookAheadMax/d,h*=o.lookAheadMax/d);const g=1-Math.exp(-o.lookAheadEase*s),_=i.ax+(f-i.ax)*g,m=i.az+(h-i.az)*g,[p,v]=Hs(i.tx,i.vx,t.x+_,o.follow,s),[E,y]=Hs(i.ty,i.vy,t.y,o.follow,s),[T,w]=Hs(i.tz,i.vz,t.z+m,o.follow,s),C=i.zoom+(u-i.zoom)*(1-Math.exp(-o.zoomEase*s)),S=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:C,tx:p,ty:E,tz:T,vx:v,vy:y,vz:w,ax:_,az:m,lift:vi(S,0,1)}}function hc(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=ii(e),a=Mn(Mn(n.angleIn,n.angleOut,i.zoom),Mn(r.angleIn,r.angleOut,i.zoom),s),o=Mn(Mn(n.distanceIn,n.distanceOut,i.zoom),Mn(r.distanceIn,r.distanceOut,i.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const Ru=.1,Cu=()=>({time:0,paused:!0});function Lu(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Ru,e);return i.time+=t,t}const Pu={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Du={types:Pu};function xo(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function vo(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Se=(i,e,t)=>e+(t-e)*i(),fc=(i,e)=>e[Math.floor(i()*e.length)];function Mt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function jn(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Mt(n,r,t),u=Mt(n+1,r,t),f=Mt(n,r+1,t),h=Mt(n+1,r+1,t);return l+(u-l)*o+(f-l)*c+(l-u-f+h)*o*c}function Ee(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const x={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41},Vs=4;function dc(i,e,t,n=.12){const r=(s,a,o,c)=>{const l=o-s,u=c-a,f=Math.max(0,Math.min(1,((i-s)*l+(e-a)*u)/(l*l+u*u)));return Math.hypot(i-s-l*f,e-a-u*f)<n};switch((t%Vs+Vs)%Vs){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const Iu=new Set([x.GLINT,x.FLOWER,x.MAGIC,x.MAGIC2,x.RUNE,x.GLOW]);function Jo(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],a=e?n:n-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),u=s(o+1),f=s(o+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let d=0;d<h;d++){const g=d/h,_=g*g,m=_*g;r.push([0,1].map(p=>.5*(2*l[p]+(-c[p]+u[p])*g+(2*c[p]-5*l[p]+4*u[p]-f[p])*_+(-c[p]+3*l[p]-3*u[p]+f[p])*m)))}}return e||r.push(i[n-1]),r}function Nu(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let c=0;c<s;c++){const l=i[Math.max(0,c-1)],u=i[Math.min(s-1,c+1)];let f=u[0]-l[0],h=u[1]-l[1];const d=Math.hypot(f,h)||1;f/=d,h/=d;const g=i[c][2]/2;n.push([i[c][0]-h*g,i[c][1]+f*g]),r.push([i[c][0]+h*g,i[c][1]-f*g])}const a=(c,l,u,f)=>{let h=c[0]-l[0],d=c[1]-l[1];const g=Math.hypot(h,d)||1;return[c[0]+h/g*u/2*f,c[1]+d/g*u/2*f]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const _t=(i,e)=>[i[0]+e[0],i[1]+e[1]],zn=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function Ds(i,e,t,n,r,s=1){const a=[];for(let o=0;o<i.length;o++){if(a.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let u=l[0]-c[0],f=l[1]-c[1];const h=Math.hypot(u,f)||1,d=f/h*s,g=-u/h*s;for(let _=1;_<=n;_++){const m=(_-.5)/n,p=zn(c,l,m),v=[p[0]+d*r-u/h*r*.5,p[1]+g*r-f/h*r*.5];a.push(zn(c,l,m-.45/n),v,zn(c,l,m+.35/n))}}return a}function Qo(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[f,h]=t[l],[d,g]=t[u];h>o!=g>o&&c.push(f+(o-h)/(g-h)*(d-f))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(i-1,Math.floor(c[l+1]-.5));u++)n[a*i+u]=1}return n}function Uu(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,u,f,h)=>{const d=l+f,g=u+h;let _,m;if(d<0||g<0||d>=i||g>=e)_=f,m=h;else{const p=g*i+d;_=r[p]+f,m=s[p]+h}_*_+m*m<a(c)&&(r[c]=_,s[c]=m)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const u=c*i+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<i;l++){const u=c*i+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:s}}class Kt{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:f=1}=a;e*=this.sx,n*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let d=Math.max(0,Math.floor(e-n-1));d<Math.min(this.w,e+n+1);d++){const g=(d+.5-e)/n,_=(h+.5-t)/r,m=g*g+_*_;if(m>1)continue;const p=h*this.w+d;if(o&&!o.has(this.m[p]))continue;if(c<1){const T=l?jn(d/3.2,h/3.2,u)*l+(1-l)*.5:.5;if(Mt(d,h,u+77)>c*(.4+T*1.2)*(1.15-m*.5))continue}const v=g*f,E=_*f,y=Math.hypot(v,E,Math.sqrt(Math.max(0,1-m))+.15);this.px(d,h,s,v/y,E/y,(Math.sqrt(Math.max(0,1-m))+.15)/y)}}line(e,t,n,r,s,a,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let u=0;u<=l;u++){const f=u/l,h=e+(n-e)*f,d=t+(r-t)*f,g=Math.max(.5,(s+(a-s)*f)/2);for(let _=Math.floor(d-g);_<=d+g;_++)for(let m=Math.floor(h-g);m<=h+g;m++){const p=(m+.5-h)/g,v=(_+.5-d)/g;if(p*p+v*v>1)continue;const E=p*c,y=Math.hypot(E,v*.3,1);this.px(m,_,o,E/y,v*.3/y,1/y)}}}tri(e,t){let[[n,r],[s,a],[o,c]]=e;n*=this.sx,s*=this.sx,o*=this.sx;const l=(g,_,m,p,v,E)=>(g-v)*(p-E)-(m-v)*(_-E),u=Math.max(0,Math.floor(Math.min(n,s,o))),f=Math.min(this.w,Math.ceil(Math.max(n,s,o))),h=Math.max(0,Math.floor(Math.min(r,a,c))),d=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=h;g<d;g++)for(let _=u;_<f;_++){const m=_+.5,p=g+.5,v=l(m,p,n,r,s,a),E=l(m,p,s,a,o,c),y=l(m,p,o,c,n,r);(v<0||E<0||y<0)&&(v>0||E>0||y>0)||this.px(_,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(Qo(this.w,this.h,Jo(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(Nu(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=x.LINE}={}){const{w:f,h}=this;if(o)for(let m=0;m<f*h;m++)e[m]&&!o.has(this.m[m])&&(e[m]=0);const{vx:d,vy:g}=Uu(f,h,e);let _=s;if(!_){for(let m=0;m<f*h;m++)e[m]&&(_=Math.max(_,Math.hypot(d[m],g[m])));_=Math.max(1.5,Math.min(_*.9,2.5+_*.35))}for(let m=0;m<h;m++)for(let p=0;p<f;p++){const v=m*f+p;if(!e[v])continue;if(c){this.m[v]=t;continue}const E=Math.hypot(d[v],g[v]),y=Math.min(1,Math.max(0,(E-.5)/_)),T=Math.min(2.6,(1-y)/Math.sqrt(Math.max(.02,1-(1-y)*(1-y))))*a;let w=d[v]/(E||1)*T+l[0],C=g[v]/(E||1)*T+l[1];const S=Math.hypot(w,C,1);this.m[v]=t,this.n[v*3]=w/S,this.n[v*3+1]=C/S,this.n[v*3+2]=1/S}if(r&&!c){const m=[];for(let p=0;p<h;p++)for(let v=0;v<f;v++){const E=p*f+v;if(e[E])for(const[y,T]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=v+y,C=p+T;if(w<0||C<0||w>=f||C>=h)continue;const S=C*f+w;if(!e[S]&&this.m[S]&&this.g[S]!==n&&this.m[S]!==u){m.push(E);break}}}for(const p of m)this.m[p]=u}if(!c)for(let m=0;m<f*h;m++)e[m]&&(this.g[m]=n);return e}mark(e,t,n,r={}){return this.fillMask(Qo(this.w,this.h,Jo(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,f)=>[...u].forEach((h,d)=>{const g=t[h];if(!g)return;const _=n+(a?o-1-d:d),m=r+f;this.inb(_,m)&&(c[m*this.w+_]=1,l.set(m*this.w+_,g))})),this.fillMask(c,x.BODY,{round:s,depth:2.5});for(const[u,f]of l)this.m[u]=f}}function ti(i,e,t,n=t.outline,r=xo){const{w:s,h:a}=i,o=()=>r(s,a),c=o(),l=o(),u=o(),f=c.getContext("2d").createImageData(s,a),h=l.getContext("2d").createImageData(s,a),d=u.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let _=0;_<a;_++)for(let m=0;m<s;m++){const p=_*s+m,v=i.m[p],E=p*4;if(!v){if(!g)continue;const S=[i.get(m+1,_),i.get(m-1,_),i.get(m,_+1),i.get(m,_-1)].find(L=>L);if(!S)continue;const R=g==="tint"?(e[S]||[0,0,0]).map(L=>L*.35|0):g;f.data.set([...R,255],E),h.data.set([128,128,255,255],E),d.data.set([128,128,255,255],E);continue}let y=e[v];v===x.LINE&&!y&&(y=g==="tint"||!g?(e[x.BODY2]||[0,0,0]).map(S=>S*.55|0):g),y=y||[255,0,255],f.data.set([...y,Iu.has(v)?254:255],E);const T=i.n[p*3],w=i.n[p*3+1],C=i.n[p*3+2];h.data.set([T*127+128,w*127+128,C*255,255],E),d.data.set([-T*127+128,w*127+128,C*255,255],E)}return c.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(d,0,0),{A:c,N:l,NF:u,w:s,h:a}}const ni=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},yr=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],wt=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],ei=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],$={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:ei,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:ni,cross:yr,dot:wt};function jo(i,e=[0,1,0]){const t=ni(i);let n=yr(e,t);Math.hypot(...n)<1e-4&&(n=yr([0,0,1],t)),n=ni(n);const r=yr(t,n);return[t,r,n]}function Fu(i,e){const t=wt(i,e.axes[0]),n=wt(i,e.axes[1]),r=wt(i,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,n/a,r/o),l=Math.hypot(t/(s*s),n/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function Ou(i,e){const{ba:t,l2:n,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=wt(i,t),u=l-n,f=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],h=wt(f,f),d=l*l*n,g=u*u*n,_=Math.sign(r)*r*r*h;return Math.sign(u)*s*g>_?Math.sqrt(h+g)*a-c:Math.sign(l)*s*d<_?Math.sqrt(h+d)*a-o:(Math.sqrt(h*s*a)+l*r)*a-o}function Bu(i,e){const t=Math.abs(wt(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(wt(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(wt(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const zu=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),el=(i,e)=>i.type==="ell"?Fu(ei(e,i.cw),i):i.type==="box"?Bu(ei(e,i.cw),i):Ou(ei(e,i.aw),i),lr=(i,e)=>i.rough?el(i,e)+zu(e,i.rough):el(i,e);class st{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e}ell(e,t,n,r={}){const s=r.axes||(r.dir?jo(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const s=r.axes||(r.dir?jo(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,s,a,o={}){return this.flats.push({c:e,u:ni(t),v:ni(n),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const tl={towards:.6,away:-.6},ku=.52;function En(i,{height:e,scale:t,facing:n="towards",yaw:r=tl[n]??tl.towards,pitch:s=ku,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),u=Math.sin(s),f=I=>[I[0]*o-I[2]*c,I[1],I[0]*c+I[2]*o],h=I=>[I[0]*o+I[2]*c,I[1],-I[0]*c+I[2]*o],d=[0,-u,-l],g=[0,l,-u],_=[1,0,0],m=[0,u,l],p=i.blend,v=i.parts.map(I=>{if(I.type==="ell"){const Ge=f(I.c),Ne=I.axes.map(f),Ze=Math.max(...I.r);return{...I,cw:Ge,axes:Ne,bc:Ge,br:Ze+(I.rough||0)*1.5}}if(I.type==="box"){const Ge=f(I.c),Ne=I.axes.map(f);return{...I,cw:Ge,axes:Ne,bc:Ge,br:Math.hypot(...I.h)+(I.rough||0)*1.5}}const Y=f(I.a),se=f(I.b),xe=ei(se,Y),ce=Math.max(1e-9,wt(xe,xe)),Te=I.r1-I.r2;return{...I,aw:Y,ba:xe,l2:ce,rr:Te,a2:ce-Te*Te,il2:1/ce,bc:$.lerp(Y,se,.5),br:Math.sqrt(ce)/2+Math.max(I.r1,I.r2)}}),E=i.flats.map(I=>{const Y=f(I.c),se=f(I.u),xe=f(I.v);return{...I,cw:Y,uw:se,vw:xe,nw:ni(yr(se,xe)),bc:Y,br:Math.hypot(I.su,I.sv)}}),y=[...v,...E],T=I=>{const Y=wt(I.bc,_),se=wt(I.bc,g),xe=I.br+(I.uw?0:p);return[Y-xe,Y+xe,se-xe,se+xe]};for(const I of y)[I.x0,I.x1,I.u0,I.u1]=T(I);const w=y.filter(I=>!I.extra&&!I.cut),C=Math.min(...w.map(I=>I.u0+(I.uw?0:p))),S=Math.max(...w.map(I=>I.u1-(I.uw?0:p))),R=t??e/Math.max(1e-6,S-C),L=Math.min(...y.map(I=>I.x0)),D=Math.max(...y.map(I=>I.x1)),V=Math.min(...y.map(I=>I.u0)),N=Math.max(...y.map(I=>I.u1)),P=Math.ceil((D-L)*R)+4,U=Math.ceil((N-V)*R)+2,k=new Kt(P,U),X=new Float32Array(P*U).fill(1/0),j=new Int16Array(P*U).fill(-1),Z=8,te=Math.ceil(P/Z),F=Math.ceil(U/Z),re=Array.from({length:te*F},()=>[]);y.forEach((I,Y)=>{const se=Math.max(0,Math.floor((I.x0-L)*R/Z)),xe=Math.min(te-1,Math.floor(((I.x1-L)*R+2)/Z)),ce=Math.max(0,Math.floor((N-I.u1)*R/Z)),Te=Math.min(F-1,Math.floor(((N-I.u0)*R+1)/Z));for(let Ge=ce;Ge<=Te;Ge++)for(let Ne=se;Ne<=xe;Ne++)re[Ge*te+Ne].push(Y)});const ae=.25/R,we=(I,Y)=>{const se=Math.max(p-Math.abs(I-Y),0)/p;return Math.min(I,Y)-se*se*p*.25};for(let I=0;I<U;I++)for(let Y=0;Y<P;Y++){const se=re[Math.floor(I/Z)*te+Math.floor(Y/Z)];if(!se.length)continue;const xe=L+(Y+.5-1)/R,ce=N-(I+.5)/R,Te=$.add($.add($.mul(_,xe),$.mul(g,ce)),$.mul(m,50));let Ge=1/0,Ne=-1/0;const Ze=[],lt=[];for(const He of se){const O=y[He],ct=ei(Te,O.bc),ze=wt(ct,d),A=O.br+(O.uw?0:p),M=wt(ct,ct)-A*A,G=ze*ze-M;if(G<0)continue;if(O.uw){lt.push(O);continue}if(O.cut){Ze.push(O);continue}const W=Math.sqrt(G);Ge=Math.min(Ge,-ze-W),Ne=Math.max(Ne,-ze+W),Ze.push(O)}let Ye=1/0,ht=-1,yt=0,bt=null;if(Ze.length){const He=new Map;for(const ze of Ze){let A=He.get(ze.group);A||He.set(ze.group,A=[]),A.push(ze)}const O=(ze,A)=>{let M=1/0;for(const G of ze)G.cut||(M=M===1/0?lr(G,A):we(M,lr(G,A)));for(const G of ze)G.cut&&(M=Math.max(M,-lr(G,A)));return M};let ct=Math.max(0,Ge);for(let ze=0;ze<96&&ct<Ne;ze++){const A=$.add(Te,$.mul(d,ct));let M=1/0,G=null;for(const[W,Q]of He){const le=O(Q,A);le<M&&(M=le,G=W)}if(M<ae){const W=He.get(G),Q=.5/R;bt=ni([O(W,[A[0]+Q,A[1],A[2]])-O(W,[A[0]-Q,A[1],A[2]]),O(W,[A[0],A[1]+Q,A[2]])-O(W,[A[0],A[1]-Q,A[2]]),O(W,[A[0],A[1],A[2]+Q])-O(W,[A[0],A[1],A[2]-Q])]);let le=W[0],ue=1/0;for(const ee of W){if(ee.cut)continue;const ne=lr(ee,A);ne<ue&&(ue=ne,le=ee)}for(const ee of W)if(ee.cut&&-lr(ee,A)>ue-ae*2){le=ee;break}Ye=ct,ht=G,yt=le.paint?le.paint(h(A),le)??le.mat:le.mat;break}ct+=Math.max(M*.9,ae*.5)}}for(const He of lt){const O=wt(d,He.nw);if(Math.abs(O)<1e-4)continue;const ct=wt(ei(He.cw,Te),He.nw)/O;if(ct>=Ye)continue;const ze=$.add(Te,$.mul(d,ct)),A=ei(ze,He.cw),M=wt(A,He.uw)/He.su,G=wt(A,He.vw)/He.sv;if(Math.abs(M)>1||Math.abs(G)>1)continue;const W=He.mask(M,G);if(!W)continue;let Q=O>0?$.mul(He.nw,-1):He.nw;Q=ni($.add(Q,$.add($.mul(He.uw,M*He.bend),$.mul(He.vw,G*He.bend*.5)))),Ye=ct,ht=He.group,yt=W,bt=Q}if(!bt||!yt)continue;const pt=I*P+Y;X[pt]=Ye,j[pt]=ht,k.px(Y,I,yt,wt(bt,_),-wt(bt,g),wt(bt,m))}const Fe=[];for(let I=0;I<U;I++)for(let Y=0;Y<P;Y++){const se=I*P+Y;if(k.m[se])for(const[xe,ce]of[[1,0],[-1,0],[0,1],[0,-1]]){const Te=Y+xe,Ge=I+ce;if(Te<0||Ge<0||Te>=P||Ge>=U)continue;const Ne=Ge*P+Te;if(k.m[Ne]&&j[Ne]!==j[se]&&X[Ne]-X[se]>a){Fe.push(se);break}}}for(const I of Fe)[x.EYE,x.GLINT,x.MAGIC,x.MAGIC2,x.NOSE].includes(k.m[I])||(k.m[I]=x.LINE);for(let I=0;I<U;I++)for(let Y=0;Y<P;Y++){const se=I*P+Y;if(k.m[se]!==x.EYE)continue;const xe=I>0&&k.m[se-P]===x.EYE,ce=Y>0&&k.m[se-1]===x.EYE,Te=Y+1<P&&k.m[se+1]===x.EYE&&I+1<U&&k.m[se+P]===x.EYE;!xe&&!ce&&Te&&(k.m[se]=x.GLINT)}let ke=-1;for(let I=U-1;I>=0&&ke<0;I--)for(let Y=0;Y<P;Y++)if(k.m[I*P+Y]){ke=I;break}if(ke>=0&&ke<U-1){const I=U-1-ke;for(let Y=U-1;Y>=0;Y--)for(let se=0;se<P;se++){const xe=Y*P+se,ce=(Y-I)*P+se,Te=Y-I>=0;k.m[xe]=Te?k.m[ce]:0,k.g[xe]=Te?k.g[ce]:0;for(let Ge=0;Ge<3;Ge++)k.n[xe*3+Ge]=Te?k.n[ce*3+Ge]:0}}return{sp:k,s:R}}const An=(i,e=9,t=.3)=>Mt(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,Mi={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>s||n<a?null:n>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=x.EAR,t=x.BODY3)=>(n,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(n)>a?null:s>.82?t:Math.abs(n)<a*.5&&s<.7&&s>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const a=Math.hypot(n-.35,r-.1);return a<.18?t:a<.3?e:i}},Gu=new Set([x.TRUNK,x.BARK2,x.BARKD,x.BARKL]);function Si(i,e,t,n,r,s,{mat:a=x.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let p=0;p<9;p++){const v=p/9*Math.PI*2,E=1+(s()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(v)*t*E,e[1]+Math.sin(v)*n*E*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(Ds(u,0,9,f,Math.max(1.2,Math.min(t,n)*.14)*c,1),a,{group:o,line:!1,round:r.round}),i.mark([_t(e,[-t*1.1,n*.15]),_t(e,[t*1.1,n*.1]),_t(e,[t*1.1,n*1.2]),_t(e,[-t*1.1,n*1.2])],x.LEAF3,[a]),i.mark([_t(e,[-t*.75,-n*.55]),_t(e,[t*.25,-n*.95]),_t(e,[t*.55,-n*.35]),_t(e,[-t*.2,-n*.05])],x.LEAF2,[a]);const h=Math.floor(e[0]-t*1.2),d=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),_=Math.ceil(e[1]+n*1.2),m=s()*1e4|0;for(let p=g;p<=_;p++)for(let v=h;v<=d;v++){const E=i.get(v,p);if(E!==a&&E!==x.LEAF2&&E!==x.LEAF3)continue;const y=Mt(v,p,m),T=jn(v/2,p/2,m)*.5+y*.5;T<.16*r.density?i.recolour(v,p,E===x.LEAF2?a:x.LEAF2):T>1-.16*r.density&&i.recolour(v,p,E===x.LEAF3?a:x.LEAF3)}}function ri(i,e,t,n,r,s,a,o,{mat:c=x.TRUNK,bend:l=1,group:u=10,line:f=!1}={}){const h=[e],d=4;let g=t,_=e;for(let m=1;m<=d;m++)g+=(o()-.5)*.7*a.gnarl*l,_=_t(_,[Math.cos(g)*n/d,Math.sin(g)*n/d]),h.push(_);return i.limb(h.map((m,p)=>[...m,r+(s-r)*p/d]),c,{group:u,line:f,round:a.round,cap:.6,capEnd:1}),{end:_,ang:g,pts:h}}function Is(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],x.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+s()*16)*a*(.4+r.roots),f=(2+s()*3)*a,h=[e+l*n*.2,t-n*.5],d=[e+l*(n*.55+u*.4),t-f],g=[e+l*(n*.5+u),t-.5];i.limb([[...h,n*.55],[...d,n*.28],[...g,1.2]],x.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Ns(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==x.TRUNK)continue;const a=t?jn(r/1.3,n/6,21):jn(r/6,n/1.3,21);a>1-e.bark*.42||Mt(r,n,4)<e.bark*.05?i.m[s]=x.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=x.BARKL)}}function Qi(i,e,t){let n=i.w,r=-1,s=i.h;for(let h=0;h<i.h;h++)for(let d=0;d<i.w;d++)i.m[h*i.w+d]&&(n=Math.min(n,d),r=Math.max(r,d),s=Math.min(s,h));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(i.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),u=i.h-l,f=new Kt(c,u);for(let h=0;h<u;h++)for(let d=0;d<c;d++){const g=(h+l)*i.w+d+o,_=h*c+d;f.m[_]=i.m[g],f.g[_]=i.g[g],f.n[_*3]=i.n[g*3],f.n[_*3+1]=i.n[g*3+1],f.n[_*3+2]=i.n[g*3+2]}return{sp:f,crownY:t-l}}const Cr=i=>(i.crownWidth||3)/3;function pc(i,e,t){const n=Cr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new Kt(r,s),o=r/2,c=s,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(i()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let d=s;const g=(_,m,p,v,E)=>{const y=ri(a,_,m,p,v,v*.65,e,i,{group:12});if(E===0){h.push(y.end);return}const T=i()<.35?3:2;for(let w=0;w<T;w++){const C=(w-(T-1)/2)*Se(i,.5,.85)*(E===3?1.4:1);g(y.end,y.ang+C+(i()-.5)*.25,p*Se(i,.6,.78),v*.62,E-1)}E<=2&&h.push(zn(_,y.end,.7))};for(let _=0;_<l;_++){const m=f+(l>1?(_/(l-1)-.5)*.8:0),p=[o+(_-(l-1)/2)*u*.6,c],v=ri(a,p,-Math.PI/2+m,s*.36*(l>1?Se(i,.75,1.15):1),u,u*.72,e,i,{bend:1.4});d=Math.min(d,v.end[1]);for(const E of[-1,1])g(v.end,-Math.PI/2+m*.5+E*Se(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),s*.22*(.75+.25*n)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&i()<.7&&g(v.end,-Math.PI/2+(i()-.5)*.3,s*.18,u*.55,2),_===0&&e.treeHollow){const E=zn(p,v.end,.38);a.ellipse(E[0],E[1],u*.28,u*.5,x.NOSE,{round:.3})}}if(Is(a,o,c,u*Math.sqrt(l),e,i,t),Ns(a,e),e.treeWebs)for(let _=0;_+1<h.length;_+=2){const m=h[_],p=h[_+1],v=Math.hypot(p[0]-m[0],p[1]-m[1]);if(v<40*t)for(let E=0;E<=v;E++){const y=zn(m,p,E/v);a.px(y[0],y[1]+Math.sin(E/v*Math.PI)*v*.15,x.GLINT,0,0,1)}}if(e.treeBare)return Qi(a,o,d+4*t);h.sort((_,m)=>_[1]-m[1]);for(const _ of h)Si(a,_t(_,[0,-3*t]),Se(i,14,21)*t,Se(i,10,14)*t,e,i,{mat:i()<.35?x.LEAF3:x.LEAF});for(const _ of h)i()<.75&&Si(a,_t(_,[Se(i,-9,9)*t,Se(i,-12,-3)*t]),Se(i,10,15)*t,Se(i,7,10)*t,e,i);return Qi(a,o,d+4*t)}function Mo(i,e,t){const n=.8+.2*Cr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new Kt(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],x.TRUNK,{group:10,round:e.round}),Is(a,o,c,6*t,e,i,t*.6),Ns(a,e);const l=Math.round(Se(i,9,12));for(let u=l-1;u>=0;u--){const f=u/(l-1),h=6*t+f*s*.7,d=(5+f*36)*t*n*Se(i,.9,1.1),g=(5+f*13)*t,_=[[o,h-4*t],[o+d*.5,h+g*.3],[o+d,h+g],[o+d*.7,h+g*1.15],[o,h+g*.7],[o-d*.7,h+g*1.15],[o-d,h+g],[o-d*.5,h+g*.3]];a.shape(Ds(_,1,7,Math.max(2,Math.round(d/(3*t))),2*t,1),x.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[o-d,h+g*.55],[o+d,h+g*.55],[o+d,h+g*1.4],[o-d,h+g*1.4]],x.LEAF3,[x.LEAF]),a.mark([[o-d*.55,h-2*t],[o+d*.1,h-3*t],[o+d*.1,h+g*.45],[o-d*.7,h+g*.7]],x.LEAF2,[x.LEAF])}return Qi(a,o,s*.82)}function mc(i,e,t){const n=Cr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new Kt(r,s),o=r/2,c=s,l=13*t,u=ri(a,[o,c],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),f=[];for(let g=0;g<5;g++){const _=g%2?1:-1,m=-Math.PI/2+_*Se(i,.55,1.25)*(.7+.3*n),p=ri(a,u.end,m,s*Se(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});f.push(p.end)}Is(a,o,c,l,e,i,t),Ns(a,e);for(const g of f)Si(a,_t(g,[0,-2*t]),Se(i,20,28)*t,Se(i,9,12)*t,e,i);Si(a,_t(u.end,[0,-8*t]),24*t,11*t,e,i);let h=r,d=0;for(const g of f)h=Math.min(h,g[0]-22*t),d=Math.max(d,g[0]+22*t);for(let g=h;g<d;g+=Se(i,1,1.7)){let _=s;for(let E=0;E<s;E++)if(a.get(g,E)===x.LEAF||a.get(g,E)===x.LEAF2||a.get(g,E)===x.LEAF3){_=E;break}if(_>=s)continue;const m=Math.abs(g-o)/(r/2),p=(c-_)*Se(i,.5,.9)*(1-m*.3),v=Mt(g|0,1,9)<.4?x.LEAF2:x.LEAF;for(let E=_+2;E<Math.min(c-2,_+p);E++){const y=Math.round(Math.sin(E*.12+g)*.7);Mt(g|0,E,5)<.2+e.density*.8&&a.px(g+y,E,(E-_)/p>.8?x.LEAF3:v,y*.3,.2,.95)}}return Qi(a,o,u.end[1]+6*t)}function gc(i,e,t){const n=.7+.3*Cr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new Kt(r,s),o=r/2,c=s,l=(i()-.5)*.25+(e.treeLean||0),u=ri(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:x.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let d=0;d<1;d+=1/8){const g=zn(u.pts[h],u.pts[h+1],d+i()*.1);if(i()<.55)for(let _=-3;_<=3;_++)a.get(g[0]+_,g[1])===x.BARK2&&i()<.8&&a.recolour(g[0]+_,g[1],x.BARKD)}const f=[u.end];for(let h=0;h<7;h++){const d=Se(i,.35,.9),g=zn(u.pts[0],u.end,d),_=h%2?1:-1,m=ri(a,g,-Math.PI/2+_*Se(i,.5,1),s*Se(i,.12,.2)*n,2*t,1,e,i,{mat:x.BARKD,group:12});f.push(m.end)}for(const h of f)Si(a,h,Se(i,9,13)*t*n,Se(i,7,10)*t,e,i,{mat:x.LEAF2,ragged:1.3});return Qi(a,o,s*.55)}function _c(i,e,t){const n=Cr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new Kt(r,s),o=r/2,c=s,l=10*t,u=ri(a,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const _=ri(a,u.end,-Math.PI/2+g*Se(i,.7,1.15)*(.7+.3*n),s*Se(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});f.push(_.end,zn(u.end,_.end,.55))}Is(a,o,c,l,e,i,t),Ns(a,e);const h=Math.round(Se(i,2,3)),d=Math.min(...f.map(g=>g[1]));for(let g=0;g<h;g++){const _=d-6*t+g*9*t,m=(95-g*12)*t*(.65+.35*n);for(let p=0;p<5;p++)Si(a,[o+(p-2)*m*.36+Se(i,-5,5)*t,_+Se(i,-3,3)*t],m*Se(i,.2,.26),7*t,e,i,{mat:g===h-1?x.LEAF:x.LEAF3})}return Qi(a,o,u.end[1]+4*t)}function So(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===Mo?.06:0);return{[x.TRUNK]:Ee(e.trunkHue,.45*e.sat,.34),[x.BARKD]:Ee(e.trunkHue+.03,.5*e.sat,.17),[x.BARKL]:Ee(e.trunkHue-.01,.38*e.sat,.5),[x.BARK2]:[222,220,212],[x.LEAF]:Ee(n,.62*e.sat,.58),[x.LEAF2]:Ee(n-.05,.55*e.sat,.8),[x.LEAF3]:Ee(n+.03,.66*e.sat,.38)}}function Hu(i){const{sp:e,crownY:t}=i,n=new Kt(e.w,e.h),r=new Kt(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(Gu.has(c)&&s>=t?r:n).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function Vu(i,e){const t=e.bushSize,n=fc(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new Kt(r,s);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Si(a,[r/2+Se(i,-9,9)*t,s-8*t+Se(i,-4,2)*t],Se(i,7,10)*t,Se(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+Se(i,-12,12)*t,f=s-Se(i,5,17)*t;a.get(u,f)&&a.recolour(u,f,x.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,f=s-1;for(let h=0;h<15*t;h++)u+=Math.cos(l)*.9,f+=Math.sin(l)*.9+h*.06,a.put(u,f,c%2?x.LEAF3:x.LEAF,Math.cos(l)*.4,-.2,.9),h%2&&(a.put(u,f-1,x.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(l)),f+1,x.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+Se(i,-13,13)*t,u=Se(i,5,15)*t,f=Se(i,-3,3);for(let h=0;h<u;h++)a.put(l+f*h/u*(h/u),s-1-h,h>u*.65?x.LEAF2:h<u*.3?x.LEAF3:x.LEAF,f*.1,-.3,.9)}const o=So(i,e,null);return o[x.FLOWER]=Ee(i(),.55,.95),{sp:a,colours:o}}const it=(i,e={})=>["tree",{type:i,...e}],Ue=(i,e={})=>[i,e],yo=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ue("water",{w:1.6})],small:[Ue("grass",{h:1.4})],big:[Ue("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ue("fern")],big:[it("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ue("stump",{snag:!0})],big:[it("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ue("henge")],small:[Ue("stones")],big:[Ue("boulder")],set:Ue("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ue("bramble",{bare:!0})],big:[it("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[it("birch",{scale:.75})],big:[it("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ue("mound",{brown:!0})],big:[it("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ue("wall")],small:[Ue("flowerbed")],big:[it("willow")],set:Ue("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[it("broad",{trunks:4,scale:.5,thin:!0})],big:[it("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ue("flowers",{hue:.98,leafy:!0})],big:[it("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ue("stones",{big:!0})],big:[it("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ue("stump",{grass:!0})],big:[it("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ue("shrub",{flower:[250,245,235]})],big:[it("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ue("cones",{acorn:!0}),Ue("log",{branch:!0})],big:[it("broad",{gnarl:.9,hollow:!0})],set:it("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ue("bramble")],small:[Ue("shrub",{flower:[200,30,60]})],big:[it("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ue("water"),Ue("reeds",{tall:!0})],small:[Ue("reeds")],big:[it("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ue("water",{w:2})],small:[it("broad",{scale:.45})],big:[it("broad",{scale:.95,gnarl:.3})],set:Ue("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ue("boulder",{big:!0})],small:[Ue("stones",{big:!0})],big:[it("fir")],set:Ue("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ue("water",{bog:!0})],small:[Ue("reeds",{cotton:!0})],big:[it("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ue("log",{branch:!0})],big:[it("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ue("rockwall")],small:[Ue("stalagmite")],big:[it("broad",{bare:!0})],set:Ue("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ue("mound",{brown:!0,small:!0})],big:[it("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ue("water",{w:2})],small:[Ue("stump",{gnawed:!0})],big:[it("birch")],set:Ue("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ue("fungi")],big:[Ue("log",{rot:!0})],set:Ue("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ue("shrub",{flower:[250,205,40],spiky:!0})],big:[it("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ue("cones")],big:[it("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ue("rockwall",{moss:!0})],small:[Ue("fern")],big:[Ue("boulder",{moss:!0,big:!0})],set:Ue("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ue("fern")],big:[it("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ue("hedge",{berries:!0})],small:[Ue("web")],big:[it("broad",{scale:.7,dark:!0})],set:it("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ue("bramble")],small:[Ue("shrub",{flower:[250,230,170]})],big:[it("broad",{trunks:5,scale:.7,thin:!0})]}],Wu=Object.fromEntries(yo.map(i=>[i.id,i]));function Xu(i,e,t=64,n=48){const[r,s,a,o]=i.floor,c=new Kt(t,n),l=i.id.length*131;for(let _=0;_<n;_++)for(let m=0;m<t;m++){const p=(jn(m/7,_/5,l)*(t-m)*(n-_)+jn((m-t)/7,_/5,l)*m*(n-_)+jn(m/7,(_-n)/5,l)*(t-m)*_+jn((m-t)/7,(_-n)/5,l)*m*_)/(t*n),v=p<.38?x.BODY2:p>.64?x.BELLY:x.BODY;c.px(m,_,v,0,-.42,.91)}const u=vo(l),f=(_,m,p)=>c.px((_%t+t)%t,(m%n+n)%n,p,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let _=0;_<h;_++){const m=Math.floor(u()*t),p=Math.floor(u()*n);if(r==="needles"){const v=u()<.5?1:-1;for(let E=0;E<3;E++)f(m+E*v,p+(E>>1),u()<.5?x.BODY2:x.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const v=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<v;E++)f(m,p-E,E===v-1?x.LEAF2:x.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&f(m+1,p-v,x.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(m,p,x.ACCENT),u()<.6&&f(m+1,p,x.ACCENT),u()<.4&&f(m,p+1,x.BODY2),r==="roots"&&u()<.5)for(let v=0;v<5;v++)f(m+v,p+(v>2?1:0),x.TRUNK)}else if(r==="leaves")f(m,p,x.FLOWER),f(m+1,p,x.FLOWER),u()<.5&&f(m,p+1,x.ACCENT);else if(r==="mud"||r==="earth")for(let v=0;v<3;v++)f(m+v,p,x.BODY2)}const d={flowers:Ee(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:Ee(s+.02,.65,.6)}[r]||Ee(s,.3,.6),g={[x.BODY]:Ee(s,a*e.sat,o),[x.BODY2]:Ee(s+.02,a*e.sat*1.1,o*.78),[x.BELLY]:Ee(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[x.ACCENT]:r==="needles"?Ee(.07,.5,.5):Ee(.1,.08,.62),[x.FLOWER]:d,[x.LEAF]:Ee(i.leaf,.55*e.sat,.45),[x.LEAF2]:Ee(i.leaf-.03,.5*e.sat,.62),[x.TRUNK]:Ee(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const fi=i=>({[x.ACCENT]:Ee(.1,.06,.6),[x.BODY2]:Ee(.62,.08,.4),[x.BELLY]:Ee(.1,.05,.78),[x.LEAF]:Ee(.27,.5,.45),[x.LEAF2]:Ee(.25,.45,.62),[x.NOSE]:[20,16,24]});function Ki(i,e,t,n,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*n*u*(Math.sin(l)>0?.5:1)])}i.shape(o,x.ACCENT,{group:5,line:!0,round:r.round}),i.mark([_t(e,[-t,n*.1]),_t(e,[t,n*.1]),_t(e,[t,n]),_t(e,[-t,n])],x.BODY2,[x.ACCENT]),i.mark([_t(e,[-t*.6,-n*.8]),_t(e,[t*.1,-n*1.1]),_t(e,[t*.3,-n*.5]),_t(e,[-t*.3,-n*.3])],x.BELLY,[x.ACCENT]),a&&i.mark(Ds([_t(e,[-t*1.1,-n*.55]),_t(e,[0,-n*1.3]),_t(e,[t*1.1,-n*.5]),_t(e,[t*.6,-n*.2]),_t(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),x.LEAF,[x.ACCENT,x.BELLY,x.BODY2])}function us(i,e,t,n,r,s){const a={[x.LEAF]:Ee(t.leaf,.6*n.sat,.55),[x.LEAF2]:Ee(t.leaf-.05,.55*n.sat,.78),[x.LEAF3]:Ee(t.leaf+.03,.66*n.sat,.36)},o={[x.TRUNK]:Ee(n.trunkHue,.45*n.sat,.34),[x.BARKD]:Ee(n.trunkHue+.03,.5*n.sat,.17),[x.BARKL]:Ee(n.trunkHue-.01,.38*n.sat,.5),[x.BELLY]:Ee(n.trunkHue+.02,.3,.7)},c={[x.MAGIC]:[60,110,150],[x.MAGIC2]:[150,200,220],[x.BODY2]:[35,70,100]};if(i==="tree"){const _={broad:pc,fir:Mo,willow:mc,birch:gc,flat:_c}[e.type],m={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},p=_(r,m,n.treeSize*s*(e.scale||1)*Se(r,.9,1.1)),v=So(r,m,_);return e.dark&&(v[x.LEAF]=v[x.LEAF3],v[x.LEAF3]=Ee(t.leaf+.05,.7,.22)),v[x.NOSE]=[20,16,24],v[x.GLINT]=[235,235,240],{sp:p.sp,colours:v}}if(i==="shrub"){const _=Vu(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let m=0;m<_.sp.m.length;m++)_.sp.m[m]&&Mt(m,1,3)<(e.spiky?.18:.1)&&_.sp.m[m]!==x.TRUNK&&(_.sp.m[m]=x.FLOWER);return _.colours[x.FLOWER]=e.flower,_}const l=Math.round(48*s*(e.w||1)),u=Math.round(32*s),f=new Kt(l,u),h=l/2,d=u;let g={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const _=i==="flowerbed"?40:24,m=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&f.shape([[h-20*s,d-2],[h-18*s,d-6*s],[h+18*s,d-6*s],[h+20*s,d-2],[h+20*s,d],[h-20*s,d]],x.ACCENT,{group:2,line:!0});for(let p=0;p<_;p++){const v=h+Se(r,-16,16)*s,E=m*Se(r,.5,1),y=i==="fern"?Se(r,-6,6)*s:Se(r,-2,2)*s,T=d-1-(i==="flowerbed"?5*s:0);for(let w=0;w<E;w++){const C=w/E;f.px(v+y*C*C,T-w,C>.7?x.LEAF2:C<.3?x.LEAF3:x.LEAF,y*.05,-.3,.9),i==="fern"&&w%2&&f.px(v+y*C*C+(y>0?1:-1),T-w+1,x.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let w=0;w<(e.cotton?2:3);w++)f.px(v+y,T-E-w,e.cotton?x.GLINT:x.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(f.px(v+y,T-E,x.FLOWER,0,-.5,.85),f.px(v+y+1,T-E,x.FLOWER,0,-.5,.85))}if(g={...a,[x.FLOWER]:i==="flowerbed"?fc(r,[[230,80,120],[250,210,60],[150,110,230]]):Ee(e.hue??.95,.6,.85),[x.TRUNK]:Ee(.07,.5,.35),[x.GLINT]:[240,240,235],[x.ACCENT]:Ee(.08,.1,.55)},i==="flowerbed"){for(let p=0;p<f.m.length;p++)f.m[p]===x.FLOWER&&Mt(p,2,7)<.5&&(f.m[p]=x.MAGIC2);g[x.MAGIC2]=[250,245,240]}}else if(i==="stones"){for(let _=0;_<(e.big?3:6);_++)Ki(f,[h+Se(r,-14,14)*s,d-(e.big?5:2.5)*s],(e.big?6:3)*s*Se(r,.7,1.2),(e.big?5:2.5)*s,n,r);g=fi()}else if(i==="boulder")Ki(f,[h,d-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),g={...fi(),...a,[x.ACCENT]:Ee(.1,.06,.6)};else if(i==="henge")f.shape([[h-7*s,d],[h-8*s,d-18*s],[h-4*s,d-28*s],[h+5*s,d-27*s],[h+8*s,d-14*s],[h+7*s,d]],x.ACCENT,{group:5,line:!0,round:n.round}),f.mark([[h-9*s,d-30*s],[h+9*s,d-30*s],[h+9*s,d-22*s],[h-9*s,d-18*s]],x.LEAF,[x.ACCENT]),g={...fi(),...a};else if(i==="mound"){const _=(e.small?8:14)*s,m=(e.small?5:8)*s;f.shape(Ds([[h-_,d],[h-_*.6,d-m*.8],[h,d-m],[h+_*.6,d-m*.8],[h+_,d]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?x.LEAF:x.TRUNK,{group:5,round:n.round}),f.mark([[h-_,d-m*.45],[h+_,d-m*.45],[h+_,d],[h-_,d]],e.moss?x.LEAF3:x.BARKD,[e.moss?x.LEAF:x.TRUNK]),g={...a,...o,[x.TRUNK]:Ee(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const _=6*s;if(f.limb([[h,d,_*2.2],[h,d-8*s,_*1.6]],x.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),f.shape([[h-_*.8,d-8*s],[h,d-10*s-(e.gnawed?4*s:0)],[h+_*.8,d-8*s],[h,d-7*s]],x.BELLY,{group:6,round:n.round}),e.snag&&f.limb([[h+_*.4,d-8*s,2.5*s],[h+_*1.6,d-15*s,1.5*s]],x.TRUNK,{group:7,round:n.round}),e.grass)for(let m=0;m<20;m++){const p=h+Se(r,-14,14)*s,v=Se(r,6,13)*s;for(let E=0;E<v;E++)f.px(p,d-1-E,E>v*.6?x.LEAF2:x.LEAF,0,-.3,.9)}g={...a,...o}}else if(i==="log"){const _=(e.giant?46:e.branch?18:30)*s,m=(e.giant?14:e.branch?3:8)*s;if(f.limb([[h-_/2,d-m/2,m],[h+_/2,d-m/2-(e.branch?2*s:0),m*.9]],x.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||f.shape([[h+_/2-m*.1,d-m],[h+_/2+m*.2,d-m/2],[h+_/2-m*.1,d],[h+_/2-m*.3,d-m/2]],x.BELLY,{group:6,round:n.round}),e.rot)for(let p=0;p<(e.giant?6:3);p++){const v=h+Se(r,-_/2,_/3);f.shape([[v-3*s,d-m*.9],[v,d-m-3*s],[v+3*s,d-m*.9]],x.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&f.limb([[h,d-m,m*.7],[h+5*s,d-m-6*s,m*.4]],x.TRUNK,{group:6,round:n.round}),g={...o,[x.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let _=0;_<5;_++){const m=h+Se(r,-12,12)*s,p=Se(r,3,7)*s,v=Se(r,3,5)*s;f.limb([[m,d,1.6*s],[m,d-p,1.4*s]],x.BELLY,{group:5}),f.shape([[m-v,d-p],[m,d-p-v*.8],[m+v,d-p]],_%2?x.FLOWER:x.MAGIC,{group:6+_%2,line:!0,round:n.round})}g={[x.BELLY]:[225,215,195],[x.FLOWER]:[190,80,50],[x.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let _=0;_<6;_++){const m=h+Se(r,-14,14)*s,p=d-2*s;f.ellipse(m,p,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,x.TRUNK,{round:n.round}),e.acorn?f.ellipse(m,p-1.6*s,1.8*s,1*s,x.BARKD,{round:n.round}):f.px(m,p-1,x.BARKL)}g=o}else if(i==="water"){const _=22*s*(e.w||1),m=6*s;f.shape([[h-_,d-m],[h-_*.3,d-m*1.5],[h+_*.6,d-m*1.2],[h+_,d-m*.5],[h+_*.4,d],[h-_*.7,d-m*.2]],x.MAGIC,{group:5,round:.2});for(let p=0;p<6;p++){const v=h+Se(r,-_*.6,_*.6),E=d-m*Se(r,.4,1.1);for(let y=0;y<3*s;y++)f.recolour(v+y,E,x.MAGIC2)}g=e.bog?{[x.MAGIC]:[60,70,50],[x.MAGIC2]:[120,130,90]}:c;for(let p=0;p<f.m.length;p++)f.m[p]===x.MAGIC?f.m[p]=x.BODY:f.m[p]===x.MAGIC2&&(f.m[p]=x.BELLY);g={[x.BODY]:g[x.MAGIC],[x.BELLY]:g[x.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const _=22*s,m=(i==="hedge"?18:12)*s;for(let p=0;p<(i==="hedge"?6:4);p++){const v=h+Se(r,-_*.8,_*.8),E=d-m*Se(r,.4,.7);f.ellipse(v,E,Se(r,6,9)*s,m*.45,i==="hedge"?x.LEAF3:x.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:p})}for(let p=0;p<8;p++){let E=h+Se(r,-_,_),y=d;for(let T=0;T<m*1.2;T++)E+=Math.sin(T*.3+p)*.8,y-=.8,f.px(E,y,x.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let p=0;p<f.m.length;p++)f.m[p]&&f.m[p]!==x.TRUNK&&Mt(p,5,9)<.05&&(f.m[p]=x.FLOWER);g={...a,...o,[x.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const _=22*s,m=12*s;f.shape([[h-_,d],[h-_,d-m],[h+_,d-m],[h+_,d]],x.ACCENT,{group:5,line:!0,depth:2}),f.shape([[h-_-1,d-m],[h-_-1,d-m-2*s],[h+_+1,d-m-2*s],[h+_+1,d-m]],x.BELLY,{group:6,line:!0,depth:2}),f.shape([[h+_-6*s,d-m-2*s],[h+_-6*s,d-m-7*s],[h+_,d-m-7*s],[h+_,d-m-2*s]],x.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(h+_-3*s,d-m-9*s,3*s,2.5*s,x.BELLY,{round:n.round});for(let p=d-m+3*s;p<d;p+=4*s)for(let v=h-_;v<h+_;v++)f.recolour(v,p,x.BODY2);g=fi()}else if(i==="rockwall"){for(let _=0;_<5;_++)Ki(f,[h+(_-2)*9*s,d-Se(r,8,14)*s],8*s,10*s,n,r,e.moss);g={...fi(),...a}}else if(i==="stalagmite"){for(let _=0;_<4;_++){const m=h+Se(r,-14,14)*s,p=Se(r,5,11)*s;f.shape([[m-3*s,d],[m-1*s,d-p],[m+1*s,d-p],[m+3*s,d]],x.ACCENT,{group:5,line:!0,round:n.round})}g=fi()}else if(i==="web"){const _=[h,d-14*s],m=11*s;for(let p=0;p<8;p++){const v=p/8*Math.PI*2;for(let E=0;E<m;E++)f.px(_[0]+Math.cos(v)*E,_[1]+Math.sin(v)*E,x.GLINT,0,0,1)}for(let p=3*s;p<m;p+=3*s)for(let v=0;v<Math.PI*2;v+=.05)f.px(_[0]+Math.cos(v)*p,_[1]+Math.sin(v)*p,x.GLINT,0,0,1);g={[x.GLINT]:[225,230,240]}}return{sp:f,colours:g}}function Yu(i,e,t,n,r,s){if(i==="tree"||i==="log")return us(i,e,t,n,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new Kt(a,o),l=a/2,u=o;let f={...fi(),[x.LEAF]:Ee(t.leaf,.55,.5),[x.LEAF2]:Ee(t.leaf-.04,.5,.7),[x.TRUNK]:Ee(n.trunkHue,.45,.34),[x.BARKD]:Ee(n.trunkHue+.03,.5,.17),[x.MAGIC]:Ee(n.magicHue,.6,1),[x.MAGIC2]:Ee(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+16*s,u]],x.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,u-6*s],[l-9*s,u-26*s],[l+9*s,u-26*s],[l+9*s,u-6*s]],x.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,u-10*s],[l-5*s,u-20*s],[l,u-23*s],[l+5*s,u-20*s],[l+5*s,u-10*s]],x.NOSE,{group:7}),c.shape([[l-13*s,u-26*s],[l,u-34*s],[l+13*s,u-26*s]],x.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*s,2.5*s,2.5*s,x.MAGIC2,{round:.5}),c.mark([[l-14*s,u-36*s],[l+2*s,u-36*s],[l-4*s,u-24*s],[l-14*s,u-24*s]],x.LEAF,[x.BODY2,x.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*s,u],[l-26*s,u-4*s],[l+26*s,u-4*s],[l+26*s,u]],x.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])c.limb([[l+h*s,u-4*s,4*s],[l+h*s,u-34*s,4*s]],h===-7||h===7?x.BODY2:x.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,u-34*s],[l-28*s,u-38*s],[l+28*s,u-38*s],[l+28*s,u-34*s]],x.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,u-38*s],[l-16*s,u-54*s],[l,u-60*s],[l+16*s,u-54*s],[l+24*s,u-38*s]],x.BELLY,{group:9,line:!0})}else if(i==="bridge"){const h=us("water",{w:1.8},t,n,r,s);for(let d=0;d<h.sp.m.length;d++){const g=d%h.sp.w,_=d/h.sp.w|0,m=Math.round(l-h.sp.w/2+g),p=u-h.sp.h+_;h.sp.m[d]&&c.inb(m,p)&&c.px(m,p,h.sp.m[d]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}c.limb([[l-34*s,u-6*s,9*s],[l+34*s,u-10*s,8*s]],x.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[x.IRIS]=[60,110,150],f[x.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[h,d,g,_]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Ki(c,[l+h*s,u-d*s],g*s,_*s,n,r,!0);else if(i==="cave"){for(const[h,d,g,_]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Ki(c,[l+h*s,u-d*s],g*s,_*s,n,r,d>30);c.shape([[l-15*s,u],[l-14*s,u-18*s],[l-4*s,u-28*s],[l+6*s,u-27*s],[l+14*s,u-16*s],[l+15*s,u]],x.NOSE,{group:9,line:!0})}else if(i==="dam"){const h=us("water",{w:1.9},t,n,r,s);for(let d=0;d<h.sp.m.length;d++){const g=d%h.sp.w,_=d/h.sp.w|0,m=Math.round(l-h.sp.w/2+g),p=u-h.sp.h+_-10*s;h.sp.m[d]&&c.inb(m,p)&&c.px(m,p,h.sp.m[d]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}for(let d=0;d<26;d++){const g=l+Se(r,-32,32)*s,_=u-Se(r,2,14)*s,m=Se(r,-.5,.5),p=Se(r,8,16)*s;c.limb([[g-Math.cos(m)*p/2,_-Math.sin(m)*p/2,2.6*s],[g+Math.cos(m)*p/2,_+Math.sin(m)*p/2,2*s]],d%3?x.TRUNK:x.BARKD,{group:6+d%2,line:!0})}f[x.IRIS]=[60,110,150],f[x.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[h,d,g,_]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Ki(c,[l+h*s,u-d*s],g*s,_*s,n,r,!0);for(let h=l-6*s;h<l+6*s;h++)for(let d=u-50*s;d<u-4*s;d++)c.px(h,d,Mt(h|0,d/3|0,4)<.3?x.PUPIL:x.IRIS,0,-.2,.98);c.shape([[l-18*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+18*s,u]],x.IRIS,{group:10,round:.2}),f[x.IRIS]=[90,150,190],f[x.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function qu(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=xo}={}){const r=Wu[i];if(!r)throw new Error(`no area type "${i}"`);const s=vo(i.split("").reduce((u,f)=>u*31+f.charCodeAt(0),7)>>>0),a=(u,f,h)=>({sp:ti(u.sp,u.colours,e,"none",n),kind:f,text:h}),o=Xu(r,e),c=u=>(u||[]).map(([f,h])=>a(us(f,h,r,e,s,t),f,"")),l={def:r,floor:{sp:ti(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};return l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set&&(l.setPiece=a(Yu(r.set[0],r.set[1],r,e,s,t),r.set[0],r.text.set)),l}const Ku={[x.ACCENT]:[150,145,140],[x.BODY2]:[95,92,100],[x.TRUNK]:[110,70,40],[x.BARKD]:[60,38,24],[x.MAGIC]:[255,130,40],[x.MAGIC2]:[255,228,120],[x.NOSE]:[30,24,26]};function Zu(i){const e=new st({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?x.ACCENT:x.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,x.TRUNK,{group:20,paint:r=>r[0]>.12?x.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,x.TRUNK,{group:21,paint:r=>r[0]<-.12?x.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][i%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((i+o)%3-1)*.1,1,0],a*.38,a*.5,Mi.flame(x.MAGIC,x.MAGIC2),{group:30+o,bend:.1}));const n=En(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(n.w/2+Math.sin(r*2.3+i)*n.w*.25),a=Math.floor(n.h*(.12+r*.08));n.get(s,a)||n.px(s,a,x.MAGIC2)}return n}const hs={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function $u(i){const e=new st({blend:.04}),t=Object.keys(hs).indexOf(i),n=.08,r=.4,s=[Math.cos(r),0,-Math.sin(r)],a=$.norm([Math.sin(r),.22,Math.cos(r)]),o=$.norm($.cross(a,s)),c=[0,.46,0],l=[[[.2-t*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+t*.03,.05],[-.17,.16],[-.21,.25]]],u=(_,m)=>l.some(p=>p.some((v,E)=>{const y=p[E+1];if(!y)return!1;const T=y[0]-v[0],w=y[1]-v[1],C=Math.max(0,Math.min(1,((_-v[0])*T+(m-v[1])*w)/(T*T+w*w)));return Math.hypot(_-v[0]-T*C,m-v[1]-w*C)<.014})),f=_=>{const m=$.sub(_,c),p=[$.dot(m,s),$.dot(m,o)+.46,$.dot(m,a)];if(p[2]>n-.02){const v=(p[0]+.17)/.34,E=(.8-p[1])/.5;if(v>=0&&v<=1&&E>=0&&E<=1&&dc(v,E,t+1,.1))return x.RUNE}if(u(p[0],p[1]))return x.STONED;if(p[1]>.86&&Mt(Math.floor(p[0]*30),Math.floor(p[2]*30),3)<.3||p[1]<.12&&Mt(Math.floor(p[0]*35),Math.floor(p[1]*35)+Math.floor(p[2]*35)*7,5)<.55)return x.MOSS};e.box(c,[.28,.46,n],x.STONE,{group:1,axes:[s,o,a],round:.06,paint:f}),e.box($.add($.add(c,$.mul(o,.53)),$.mul(s,.2)),[.3,.12,.2],x.STONE,{group:1,dir:$.add(s,$.mul(o,.35)),up:o,cut:!0,paint:f});for(const[_,m,p]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])e.ell([_,.015,m],[p,p*.4,p],x.MOSS,{group:2});for(let _=0;_<9;_++){const m=-.3+_*.07,p=.12+_%3*.025-_*.02,v=.07+_*37%5/60;e.seg([m,0,p],[m+(_%3-1)*.02,v,p+.01],.012,.004,_%3?x.LEAF:x.LEAF2,{group:10+_})}const h={[x.STONE]:[132,134,142],[x.STONED]:[70,70,80],[x.MOSS]:[86,120,62],[x.LEAF]:[80,125,60],[x.LEAF2]:[130,160,80],[x.RUNE]:hs[i][0],[x.MAGIC2]:hs[i][1],[x.LINE]:[40,40,50]},d=En(e,{height:44}).sp;let g=0;for(let _=0;_<600&&g<5;_++){const m=Math.floor(Mt(_,t,9)*d.w),p=Math.floor(Mt(_,t,10)*d.h*.8);d.get(m,p)||d.get(m+1,p)||d.get(m-1,p)||d.get(m,p+1)||d.get(m,p-1)||(d.px(m,p,g%2?x.RUNE:x.MAGIC2),g++)}return{sp:d,colours:h}}function Ju(){const i=new st({blend:.03});i.ell([0,0,0],[.62,.025,.38],x.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?x.BODY2:void 0});for(let t=0;t<16;t++){const n=Math.PI*(.85+t/15*.9),r=Math.cos(n)*.6,s=Math.sin(n)*.36,a=.18+t*37%10/40;i.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?x.LEAF:x.LEAF2,{group:10+t})}for(const[t,n,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])i.ell([t,.02,n],[r,r*.5,r],x.ACCENT,{group:30});return{sp:En(i,{height:22}).sp,colours:{[x.WATER]:[40,70,95],[x.BODY2]:[70,60,45],[x.LEAF]:[80,125,60],[x.LEAF2]:[130,160,80],[x.ACCENT]:[130,128,125]}}}function Qu(i,{makeCanvas:e=xo}={}){const t=(l,u)=>ti(l,u,i,"none",e),n={campfire:[0,1,2].map(l=>t(Zu(l),Ku)),stones:{},pond:null};for(const l of Object.keys(hs)){const u=$u(l);n.stones[l]=t(u.sp,u.colours)}const r=Ju(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===x.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,n.pond=s,n}function ju(i,e){const t=new Map,n=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),s=(c,l,u)=>{const f=r(c,l,u);let h=t.get(f);if(!h){const d=Math.pow(2,-c);h=[d*(l+Je(l*7+c,u,i)),d*(u+Je(l,u*13+c,i+1))],t.set(f,h)}return h},a=(c,l,u)=>{const f=Math.pow(2,-c),h=Math.floor(l/f),d=Math.floor(u/f);let g=h,_=d,m=1/0;for(let p=-2;p<=2;p++)for(let v=-2;v<=2;v++){const E=s(c,h+p,d+v),y=(E[0]-l)**2+(E[1]-u)**2;y<m&&(m=y,g=h+p,_=d+v)}return[g,_]},o=(c,l,u)=>{const f=r(c,l,u);let h=n.get(f);if(h)return h;if(c===0)h=[l,u];else{const d=s(c,l,u),g=a(c-1,d[0],d[1]);h=o(c-1,g[0],g[1])}return n.set(f,h),h};return{seed:i,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const u=a(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const f=s(0,u[0],u[1]),h=Math.hypot(c-f[0],l-f[1]);let d=1/0;const g=Math.floor(c),_=Math.floor(l);for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){const v=g+m,E=_+p;if(v===u[0]&&E===u[1])continue;const y=s(0,v,E);d=Math.min(d,Math.hypot(c-y[0],l-y[1]))}return Math.min(1,2*h/(h+d))},openness(c,l){let u=1/0,f=1/0;const h=Math.floor(c),d=Math.floor(l);for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const m=s(0,h+g,d+_),p=Math.hypot(c-m[0],l-m[1]);p<u?(f=u,u=p):p<f&&(f=p)}return Math.min(1,2*u/(u+f))}}}const eh=Du.types,mn=yo.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:eh[i.id]?.treeDensity??1})),Xi=(i,e)=>i+","+e;function th(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function nh(i,e,t,n){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=Xi(c[0],c[1]),f=Xi(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(f)||r.set(f,new Set),r.get(u).add(f),r.get(f).add(u)},a=(t-e)*n;let o=[];for(let c=0;c<=a;c++){const l=[];for(let u=0;u<=a;u++){const f=i.partition(e+u/n,e+c/n);l.push(f),u>0&&s(f,l[u-1]),c>0&&s(f,o[u])}o=l}return r}function ih(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=mn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(N,P)=>{const U=N/r,k=P/r;return[U+o*($o(U/a,k/a,i+91)-.5)*2,k+o*($o(U/a,k/a,i+92)-.5)*2]},l=(N,P)=>{let U=N*r,k=P*r;for(let X=0;X<30;X++){const[j,Z]=c(U,k);U+=(N-j)*r,k+=(P-Z)*r}return[U,k]},u=ju(i,e.borderLayers),f=-n,h=t+n,d=nh(u,f,h,6),g=new Map,_=xi(i*5+1);for(let N=f;N<h;N++)for(let P=f;P<h;P++){const U=new Set;for(let j=-2;j<=2;j++)for(let Z=-2;Z<=2;Z++){const te=g.get(Xi(P+Z,N+j));te!==void 0&&U.add(te)}for(const j of d.get(Xi(P,N))??[]){const Z=g.get(j);Z!==void 0&&U.add(Z)}const k=[...Array(s).keys()].filter(j=>!U.has(j)),X=k.length?k:[...Array(s).keys()];g.set(Xi(P,N),X[Math.floor(_()*X.length)])}const m=(N,P)=>g.get(Xi(N,P))??Math.floor(Je(N,P,i+17)*s),p=Math.floor(t/2),v=(N,P)=>{const U=u.site(N,P),k=u.partition(U[0],U[1]);return k[0]===N&&k[1]===P};let E=[p,p];for(const[N,P]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(p+N,p+P)){E=[p+N,p+P];break}const y=(N,P)=>{const U=u.site(N,P),k=l(U[0],U[1]);return{x:k[0],z:k[1]}},T=y(E[0],E[1]),w=(N,P)=>{const[U,k]=c(N,P),X=u.partition(U,k);return{cell:X,type:m(X[0],X[1]),openness:u.openness(U,k)}},C=e.dancefloor.radius,S=C+e.dancefloor.clearing,R=(N,P)=>{if(Math.hypot(N-T.x,P-T.z)<S)return 0;const[U,k]=c(N,P);return ii((u.openness(U,k)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},L=(N,P)=>{const U=mn[m(N,P)];return U.setPiece&&Je(N,P,i+61)<e.setPieceChance?U.setPiece:null},D=(N,P)=>Math.min(1,Math.hypot(N-E[0],P-E[1])/(t/2)),V=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:u,centreCell:E,dancefloor:{x:T.x,z:T.z,radius:C},start:{x:T.x,z:T.z+2},bounds:{minX:V,maxX:t*r-V,minZ:V,maxZ:t*r-V},extent:{minX:f*r,maxX:h*r,minZ:f*r,maxZ:h*r},typeOf:m,areaAt:w,siteOf:y,treeWeight:R,neighbours:d,setPieceOf:L,remoteness:D}}function rh(i,e,t=.5,n=1){const r=i.tuning,s=vi(e,0,1),a=Math.max(0,Math.round(Mn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&n<sh(i,s)?1:0,c=Math.round(Math.max(0,a-o)*r.youngShareFar*s);return{babies:Math.max(0,a-o-c),young:c,legends:o}}const sh=(i,e)=>i.tuning.legendChanceFar*ii((e-i.tuning.legendsFrom)/Math.max(.01,1-i.tuning.legendsFrom)),ah=i=>i.areaSize*.75,vs=(i,e,t,n)=>{const r=i.areaAt(e,t).cell;return r[0]===n[0]&&r[1]===n[1]};function xc(i,e,t,n,r){if(vs(i,t,n,e))return[t,n];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;if(vs(i,c,l,e))return[c,l]}return[t,n]}function Ms(i,e,t){for(let n=0;n<12;n++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(vs(i,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function oh(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let o=0;o<i.n;o++){if(o===r&&a===s)continue;const c=xi(i.seed*7919+o*131+a*977+3),l=mn[i.typeOf(o,a)],u=i.siteOf(o,a),f=i.remoteness(o,a),h=rh(i,f,Je(o,a,i.seed+43),Je(o,a,i.seed+47)),d=_=>{const m=[o,a],p=ah(i),[v,E]=xc(i,m,u.x,u.z,p),y={cell:m,homeX:u.x,homeZ:u.z,range:p,anchorX:v,anchorZ:E},[T,w]=Ms(i,y,c);return{id:n++,species:l.creature,level:_,...y,x:T,z:w,tx:T,tz:w,rest:c()*3,speed:(_===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,rand:xi(i.seed*31+n*7+11)}};for(let _=0;_<h.babies;_++)e.push(d(0));for(let _=0;_<h.young;_++)e.push(d(1));const g=t.legendNextToHome&&o===r+1&&a===s;(h.legends||g)&&e.push(d(2))}return e}function lh(i,e,t){if(i.rest>0){i.rest-=e,i.moving=!1;return}const n=i.tx-i.x,r=i.tz-i.z,s=Math.hypot(n,r);if(s<.05){[i.tx,i.tz]=Ms(t,i,i.rand),i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(s,i.speed*e),o=i.x+n/s*a,c=i.z+r/s*a;if(!vs(t,o,c,i.cell)){i.tx=i.x,i.tz=i.z,i.moving=!1;return}i.x=o,i.z=c,Math.abs(n)>.02&&(i.facing=n>0?1:-1),r<-.3*s?i.away=!0:r>.3*s&&(i.away=!1),i.moving=!0,i.walk+=e*(i.level===2?1.5:4)}function ch(i,e,t,n,r,s,a){for(const o of i)if(!(Math.abs(o.homeX-e)>n||Math.abs(o.homeZ-t)>n)){if(s-o.seen>3){const c=xi(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=Ms(a,o,c),[o.tx,o.tz]=Ms(a,o,c),o.rest=c()*2}o.seen=s,lh(o,r,a)}}const vc=6,uh=4,Ct=32;function hh(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function fh(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],o=hh(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*Ct/r),u=Math.ceil((t+1)*Ct/r);for(let f=l;f<u;f++){const h=f&1?.5:0,d=Math.ceil(e*Ct/n-h),g=Math.ceil((e+1)*Ct/n-h);for(let _=d;_<g;_++){const m=(_+h+(Je(_,f,s+101)-.5)*.7)*n,p=(f+(Je(_,f,s+102)-.5)*.7)*r,v=i.areaAt(m,p);Je(_,f,s+103)>=i.treeWeight(m,p)*mn[v.type].treeDensity||i.treeWeight(m,p-o)===0||i.treeWeight(m-c,p-o)===0||i.treeWeight(m+c,p-o)===0||a.push({x:m,z:p,type:v.type,variant:Math.floor(Je(_,f,s+104)*vc),flip:Je(_,f,s+105)<.5})}}return a}function dh(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*Ct/n),o=Math.ceil((t+1)*Ct/n),c=Math.ceil(e*Ct/n),l=Math.ceil((e+1)*Ct/n);for(let u=a;u<o;u++)for(let f=c;f<l;f++){const h=(f+(Je(f,u,r+201)-.5)*.9)*n,d=(u+(Je(f,u,r+202)-.5)*.9)*n;Je(f,u,r+203)>(.12+Math.min(1,i.treeWeight(h,d))*.3)*i.tuning.bushDensity||Math.hypot(h-i.dancefloor.x,d-i.dancefloor.z)<i.dancefloor.radius+2||s.push({x:h,z:d,type:i.areaAt(h,d).type,variant:Math.floor(Je(f,u,r+204)*uh),flip:Je(f,u,r+205)<.5})}return s}function ph(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*Ct/n),o=Math.ceil((t+1)*Ct/n),c=Math.ceil(e*Ct/n),l=Math.ceil((e+1)*Ct/n);for(let u=a;u<o;u++)for(let f=c;f<l;f++){if(Je(f,u,r+303)>i.tuning.wallDensity)continue;const h=(f+(Je(f,u,r+301)-.5)*.6)*n,d=(u+(Je(f,u,r+302)-.5)*.6)*n,g=i.areaAt(h,d);g.openness<.82||!mn[g.type].hasWalls||Math.hypot(h-i.dancefloor.x,d-i.dancefloor.z)<i.dancefloor.radius+4||s.push({x:h,z:d,type:g.type,variant:Math.floor(Je(f,u,r+304)*4),flip:Je(f,u,r+305)<.5})}return s}const mh=new Set(["wetland","stream","bog","beaver-pond","moor"]);function gh(i,e,t){const n=i.tuning.lightSources,r=n.spacing,s=i.seed,a=[],o=Math.ceil(t*Ct/r),c=Math.ceil((t+1)*Ct/r),l=Math.ceil(e*Ct/r),u=Math.ceil((e+1)*Ct/r);for(let f=o;f<c;f++)for(let h=l;h<u;h++){const d=(h+(Je(h,f,s+401)-.5)*.7)*r,g=(f+(Je(h,f,s+402)-.5)*.7)*r;if(Math.hypot(d-i.dancefloor.x,g-i.dancefloor.z)<i.dancefloor.radius+i.tuning.dancefloor.clearing+4)continue;const _=i.areaAt(d,g),m=_.openness<.35||_.openness>.8?1:.25,p=Je(h,f,s+403),E=(mh.has(mn[_.type].id)?n.wetPond:n.pond)*m,y=n.campfire*m,T=n.magicStone*m,w=p<E?"pond":p<E+y?"campfire":p<E+y+T?"stone":null;w&&a.push({x:d,z:g,kind:w,size:.75+Je(h,f,s+404)*.5})}return a}class _h{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/Ct);s<=Math.floor((t+n)/Ct);s++)for(let a=Math.floor((e-n)/Ct);a<=Math.floor((e+n)/Ct);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(n,r,s)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const f of u)Math.abs(f.x-n)<=s&&Math.abs(f.z-r)<=s&&a.push(f)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>fh(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>dh(this.map,r,s),e,t,n)}lightsNear(e,t,n){return this.gather(this.lights,(r,s)=>gh(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>ph(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-n)/s)-1;o<=Math.floor((t+n)/s)+1;o++)for(let c=Math.floor((e-n)/s)-1;c<=Math.floor((e+n)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:Je(c,o,r.seed+71)<.5})}return a}}const xh=i=>`${i[0]},${i[1]}`;function vh(i){const e={cell:i.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[xh(i.centreCell),e]]),wave:0,nextAt:i.tuning.party.startDelay+i.tuning.party.interval,paused:!1}}function Mh(i,e){const t=i.siteOf(e[0],e[1]),n=xi(i.seed*17+e[0]*53+e[1]*911),[r,s]=xc(i,[e[0],e[1]],t.x,t.z,i.areaSize*.75),a=Math.floor(Je(e[0],e[1],i.seed+77)*3)%3;for(let o=0;o<24;o++){const c=n()*Math.PI*2,l=3+n()*4,u=r+Math.cos(c)*l,f=s+Math.sin(c)*l+3,h=i.areaAt(u,f).cell;if(h[0]===e[0]&&h[1]===e[1])return{x:u,z:f,variant:a}}return{x:r,z:s,variant:a}}const Sh=(i,e)=>e[0]>=0&&e[1]>=0&&e[0]<i.n&&e[1]<i.n;function Mc(i,e,t){const n=i.wave+1,r=[],s=new Map,a=new Map;for(const[l,u]of i.areas)for(const f of e.neighbours.get(l)??[]){if(i.areas.has(f)||s.has(f))continue;const h=f.split(",").map(Number);Sh(e,h)&&(s.set(f,h),a.set(f,u.cell))}const o=[...s.entries()].sort((l,u)=>Je(l[1][0],l[1][1],e.seed+n)-Je(u[1][0],u[1][1],e.seed+n)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,u]of o.slice(0,c)){const f={cell:u,wave:n,at:t,from:a.get(l)??null,soundsystem:Mh(e,u)};i.areas.set(l,f),r.push(f)}return i.wave=n,r}function yh(i,e,t,n){return i.paused?(i.nextAt+=n,[]):t<i.nextAt?[]:(i.nextAt+=e.tuning.party.interval,Mc(i,e,t))}function bh(i,e,t){const n=Math.max(0,i.nextAt-t),r=e.tuning.party.interval;return{left:n,gone:1-Math.min(1,n/r)}}function Eh(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const Ss=(i,e)=>Mn(e.groundHeight,e.treetopHeight,ii(i.lift)),nl=i=>ii(i.lift);function wh(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=Mn(n.groundSpeed,n.treetopSpeed,ii(a)),f=1-Math.exp(-n.acceleration*t);let h=i.vx+(o*u-i.vx)*f,d=i.vz+(c*u-i.vz)*f,g=i.x+h*t,_=i.z+d*t;(g<r.minX||g>r.maxX)&&(g=vi(g,r.minX,r.maxX),h=0),(_<r.minZ||_>r.maxZ)&&(_=vi(_,r.minZ,r.maxZ),d=0);const m=h>.3?1:h<-.3?-1:i.facing,p=Math.hypot(h,d),v=Math.max(1,u*.15),E=d<-v&&-d>Math.abs(h)*.5?!0:d>v&&d>Math.abs(h)*.5?!1:i.away;return{x:g,z:_,vx:h,vz:d,lift:a,mode:s,facing:m,away:E,lean:p>u*n.leanAt}}function Th(i,e){const t=ih(i,e),n=Eh(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new _h(t),creatures:oh(t),clock:Cu(),witch:n,camera:Tu(e,n.x,Ss(n,e),n.z),party:vh(t)}}function Ah(i,e,t){const n=Lu(i.clock,t);n!==0&&(i.witch=wh(i.witch,e,n,i.tuning,i.map.bounds),i.camera=Au(i.camera,e.zoom,{x:i.witch.x,y:Ss(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),e.pauseWaves&&(i.party.paused=!i.party.paused),e.nextWave&&(Mc(i.party,i.map,i.clock.time),i.party.nextAt=i.clock.time+i.tuning.party.interval),yh(i.party,i.map,i.clock.time,n),ch(i.creatures,i.witch.x,i.witch.z,i.tuning.creatureSimRadius,n,i.clock.time,i.map))}const il=i=>hc(i.camera,i.camera.lift,i.tuning);function Sc(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return mn[e.type].name+(t?` (set piece: ${t})`:"")}const Rh="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Ch="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Lh=20,Ph=28,Dh=4,Ih=.7,Nh=4,Uh="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Fh=.9,Oh=.1,Bh=.5,zh=1,kh=1.5,Gh=1.7,Hh=7,Vh=4,Wh=7,Xh=7.5,Yh=3.4,qh=4,Kh=.6,Zh="Speeds per mode, and how long rising and descending take. leanAt: the share of the top speed above which she leans into her flight.",$h=14,Jh=32,Qh=10,jh=.7,ef=.7,tf=.55,nf=1.4,rf=16,sf="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",af={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},of="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",lf=3,cf=8,uf=1,hf=1,ff=16,df=12,pf=12,mf="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",gf={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},_f={near:150,far:360},xf="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",vf="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Mf={on:!0,strength:.7},Sf={on:!0,strength:.45,height:12,cover:.55,wind:.6},yf={on:!0,strength:.12,height:3,wind:.8},bf="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",Ef={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:22,lightStrength:1.1},wf="Colourful string lights between trees in every partified area: up to perArea lines, at height metres, sagging sag metres, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second, and glow: the strength of the one soft light each line casts.",Tf={on:!0,perArea:14,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8,glow:.35},Af="The dancefloor: a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Rf={radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:28,lightStrength:1.4,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Cf="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Lf={screenFraction:.8,edge:.1},Pf="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Df={black:.03,gamma:1.35,ambient:.35},If={on:!0,strength:.7,threshold:.55},Nf={on:!0,where:"before",strength:3,band:.4,centre:.55},Uf="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures within creatureSimRadius metres of the witch move.",Ff=2,Of=20,Bf=1.3,zf=.5,kf=.25,Gf=!0,Hf=.55,Vf=420,Wf=.6,Xf="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Yf=.25,qf=.35,Kf={_readme:Rh,_map:Ch,mapAreas:Lh,areaSize:Ph,areaScale:Dh,areaSizeVariance:Ih,borderLayers:Nh,_trees:Uh,treeDensity:Fh,clearingSize:Oh,clearingFalloff:Bh,bushDensity:zh,treeHeight:kh,crownWidth:Gh,treeSpacingX:Hh,treeSpacingZ:Vh,crownHalfWidth:Wh,crownHeight:Xh,bushSpacing:Yh,wallSpacing:qh,wallDensity:Kh,_witch:Zh,groundSpeed:$h,treetopSpeed:Jh,acceleration:Qh,leanAt:jh,riseTime:ef,descendTime:tf,groundHeight:nf,treetopHeight:rf,_camera:sf,camera:af,_look:of,pixelSize:lf,glowReach:cf,glowHeight:uf,spriteTilt:hf,artPixelsPerMetre:ff,viewMargin:df,lightBudget:pf,_lightSources:mf,lightSources:gf,haze:_f,_post:xf,_shadows:vf,shadows:Mf,canopyShadow:Sf,mist:yf,_party:bf,party:Ef,_stringLights:wf,stringLights:Tf,_dancefloor:Af,dancefloor:Rf,_canopyCutout:Cf,canopyCutout:Lf,_tone:Pf,tone:Df,bloom:If,tiltShift:Nf,_creatures:Uf,creaturesNear:Ff,creaturesFar:Of,creatureCurve:Bf,youngShareFar:zf,legendChanceFar:kf,legendNextToHome:Gf,legendsFrom:Hf,creatureSimRadius:Vf,creatureSpeed:Wf,_setPieces:Xf,setPieceChance:Yf,legendSpeed:qf},Ci=Kf;class Zf{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQENP]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const n=d=>this.keys.has(d)?1:0,r=d=>this.pressed.has(d);let s=n("KeyD")+n("ArrowRight")-n("KeyA")-n("ArrowLeft"),a=n("KeyS")+n("ArrowDown")-n("KeyW")-n("ArrowUp"),o=r("Space"),c=(r("KeyQ")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyE")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote");this.pressed.clear();const u=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of u){if(!d)continue;const g=w=>!!d.buttons[w]?.pressed,m=d.buttons.some((w,C)=>w.pressed&&!this.padPrev[C])&&!!this.onAny?.(),p=w=>!m&&g(w)&&!this.padPrev[w];let v=d.axes[0]??0,E=d.axes[1]??0;const y=Math.hypot(v,E),T=.18;if(y<T)v=0,E=0;else{const w=(Math.min(1,y)-T)/(1-T)/y;v*=w,E*=w}v+=(g(15)?1:0)-(g(14)?1:0),E+=(g(13)?1:0)-(g(12)?1:0),s+=v,a+=E,p(0)&&(o=!0),(p(4)||p(6))&&(c+=1),(p(5)||p(7))&&(c-=1),p(8)&&(l=!0),this.padPrev=d.buttons.map(w=>w.pressed);break}const f=this.touch;s+=f.x,a+=f.y,f.toggle&&(o=!0),c+=f.zoom,f.debug&&(l=!0),f.toggle=!1,f.zoom=0,f.debug=!1;const h=Math.hypot(s,a);return h>1&&(s/=h,a/=h),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t}}}const bo="186",$f=0,rl=1,Jf=2,fs=1,Qf=2,vr=3,yi=0,qt=1,On=2,kn=0,br=1,sl=2,al=3,ol=4,jf=5,Wi=100,ed=101,td=102,nd=103,id=104,rd=200,sd=201,ad=202,od=203,yc=204,bc=205,ld=206,cd=207,ud=208,hd=209,fd=210,dd=211,pd=212,md=213,gd=214,Ta=0,Aa=1,Ra=2,Er=3,Ca=4,La=5,Pa=6,Da=7,Ec=0,_d=1,xd=2,wn=0,wc=1,Tc=2,Ac=3,Rc=4,Cc=5,Lc=6,Pc=7,Dc=300,bi=301,ji=302,Ws=303,Xs=304,Us=306,Ia=1e3,Bn=1001,Na=1002,Lt=1003,vd=1004,Ur=1005,Tt=1006,Ys=1007,mi=1008,jt=1009,Ic=1010,Nc=1011,wr=1012,Eo=1013,Rn=1014,yn=1015,Cn=1016,wo=1017,To=1018,Tr=1020,Uc=35902,Fc=35899,Oc=1021,Bc=1022,rn=1023,Hn=1026,gi=1027,zc=1028,Ao=1029,Ei=1030,Ro=1031,Co=1033,ds=33776,ps=33777,ms=33778,gs=33779,Ua=35840,Fa=35841,Oa=35842,Ba=35843,za=36196,ka=37492,Ga=37496,Ha=37488,Va=37489,ys=37490,Wa=37491,Xa=37808,Ya=37809,qa=37810,Ka=37811,Za=37812,$a=37813,Ja=37814,Qa=37815,ja=37816,eo=37817,to=37818,no=37819,io=37820,ro=37821,so=36492,ao=36494,oo=36495,lo=36283,co=36284,bs=36285,uo=36286,Md=3200,ll=0,Sd=1,dn="",nn="srgb",Ar="srgb-linear",Es="linear",ut="srgb",qs=7680,yd=519,bd=512,Ed=513,wd=514,Lo=515,Td=516,Ad=517,Po=518,Rd=519,Cd=35044,kc=35048,cl="300 es",bn=2e3,ws=2001;function Ld(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ts(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){const i=Ts("canvas");return i.style.display="block",i}const ul={};function hl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Gc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=Gc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function nt(...i){i=Gc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Zi(...i){const e=i.join(" ");e in ul||(ul[e]=!0,Be(...i))}function Dd(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Id={[Ta]:Aa,[Ra]:Pa,[Ca]:Da,[Er]:La,[Aa]:Ta,[Pa]:Ra,[Da]:Ca,[La]:Er};class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ks=Math.PI/180,ho=180/Math.PI;function Lr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Nd(i,e){return(i%e+e)%e}function Zs(i,e,t){return(1-t)*i+t*e}function cr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],f=n[r+3],h=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(f!==_||c!==h||l!==d||u!==g){let m=c*h+l*d+u*g+f*_;m<0&&(h=-h,d=-d,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){const v=Math.acos(m),E=Math.sin(v);p=Math.sin(p*v)/E,o=Math.sin(o*v)/E,c=c*p+h*o,l=l*p+d*o,u=u*p+g*o,f=f*p+_*o}else{c=c*p+h*o,l=l*p+d*o,u=u*p+g*o,f=f*p+_*o;const v=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=v,l*=v,u*=v,f*=v}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],f=s[a],h=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*f+c*d-l*h,e[t+1]=c*g+u*h+l*f-o*d,e[t+2]=l*g+u*d+o*h-c*f,e[t+3]=u*g-o*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),f=o(s/2),h=c(n/2),d=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(a-r)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-l)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $s.copy(this).projectOnVector(e),this.sub($s)}reflect(e){return this.sub($s.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $s=new H,fl=new nr;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],v=r[1],E=r[4],y=r[7],T=r[2],w=r[5],C=r[8];return s[0]=a*_+o*v+c*T,s[3]=a*m+o*E+c*w,s[6]=a*p+o*y+c*C,s[1]=l*_+u*v+f*T,s[4]=l*m+u*E+f*w,s[7]=l*p+u*y+f*C,s[2]=h*_+d*v+g*T,s[5]=h*m+d*E+g*w,s[8]=h*p+d*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,h=o*c-u*s,d=l*s-a*c,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*l-u*n)*_,e[2]=(o*n-r*a)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Js.makeScale(e,t)),this}rotate(e){return Zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Js.makeRotation(-e)),this}translate(e,t){return Zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Js.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Js=new Ve,dl=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ud(){const i={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=$i(r.r),r.g=$i(r.g),r.b=$i(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===dn?Es:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ar]:{primaries:e,whitePoint:n,transfer:Es,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const Qe=Ud();function Gn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class Fd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=Ts("canvas")),Li.width=e.width,Li.height=e.height;const r=Li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ts("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Gn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gn(t[n]/255)*255):t[n]=Gn(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Od=0;class Do{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Lr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Qs(r[a].image)):s.push(Qs(r[a]))}else s=Qs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Qs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Bd=0;const js=new H;class Wt extends Ti{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,n=Bn,r=Bn,s=Tt,a=mi,o=rn,c=jt,l=Wt.DEFAULT_ANISOTROPY,u=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Lr(),this.name="",this.source=new Do(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(js).x}get height(){return this.source.getSize(js).y}get depth(){return this.source.getSize(js).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ia:e.x=e.x-Math.floor(e.x);break;case Bn:e.x=e.x<0?0:1;break;case Na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ia:e.y=e.y-Math.floor(e.y);break;case Bn:e.y=e.y<0?0:1;break;case Na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Dc;Wt.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,y=(d+1)/2,T=(p+1)/2,w=(u+h)/4,C=(f+_)/4,S=(g+m)/4;return E>y&&E>T?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=w/n,s=C/n):y>T?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=w/r,s=S/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=C/s,r=S/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-_)/v,this.z=(h-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zd extends Ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Wt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Tt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Do(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends zd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hc extends Wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends Wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class St{static{St.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,u,f,h,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,f,h,d,g,_,m)}set(e,t,n,r,s,a,o,c,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Pi.setFromMatrixColumn(e,0).length(),s=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,g=o*u,_=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h-_*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=o*u,_=o*f;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=c*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gd,e,Hd)}lookAt(e,t,n){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Yn.crossVectors(n,$t),Yn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Yn.crossVectors(n,$t)),Yn.normalize(),Fr.crossVectors($t,Yn),r[0]=Yn.x,r[4]=Fr.x,r[8]=$t.x,r[1]=Yn.y,r[5]=Fr.y,r[9]=$t.y,r[2]=Yn.z,r[6]=Fr.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],E=n[7],y=n[11],T=n[15],w=r[0],C=r[4],S=r[8],R=r[12],L=r[1],D=r[5],V=r[9],N=r[13],P=r[2],U=r[6],k=r[10],X=r[14],j=r[3],Z=r[7],te=r[11],F=r[15];return s[0]=a*w+o*L+c*P+l*j,s[4]=a*C+o*D+c*U+l*Z,s[8]=a*S+o*V+c*k+l*te,s[12]=a*R+o*N+c*X+l*F,s[1]=u*w+f*L+h*P+d*j,s[5]=u*C+f*D+h*U+d*Z,s[9]=u*S+f*V+h*k+d*te,s[13]=u*R+f*N+h*X+d*F,s[2]=g*w+_*L+m*P+p*j,s[6]=g*C+_*D+m*U+p*Z,s[10]=g*S+_*V+m*k+p*te,s[14]=g*R+_*N+m*X+p*F,s[3]=v*w+E*L+y*P+T*j,s[7]=v*C+E*D+y*U+T*Z,s[11]=v*S+E*V+y*k+T*te,s[15]=v*R+E*N+y*X+T*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],v=c*d-l*h,E=o*d-l*f,y=o*h-c*f,T=a*d-l*u,w=a*h-c*u,C=a*f-o*u;return t*(_*v-m*E+p*y)-n*(g*v-m*T+p*w)+r*(g*E-_*T+p*C)-s*(g*y-_*w+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(s*u-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=t*o-n*a,E=t*c-r*a,y=t*l-s*a,T=n*c-r*o,w=n*l-s*o,C=r*l-s*c,S=u*_-f*g,R=u*m-h*g,L=u*p-d*g,D=f*m-h*_,V=f*p-d*_,N=h*p-d*m,P=v*N-E*V+y*D+T*L-w*R+C*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/P;return e[0]=(o*N-c*V+l*D)*U,e[1]=(r*V-n*N-s*D)*U,e[2]=(_*C-m*w+p*T)*U,e[3]=(h*w-f*C-d*T)*U,e[4]=(c*L-a*N-l*R)*U,e[5]=(t*N-r*L+s*R)*U,e[6]=(m*y-g*C-p*E)*U,e[7]=(u*C-h*y+d*E)*U,e[8]=(a*V-o*L+l*S)*U,e[9]=(n*L-t*V-s*S)*U,e[10]=(g*w-_*y+p*v)*U,e[11]=(f*y-u*w-d*v)*U,e[12]=(o*R-a*D-c*S)*U,e[13]=(t*D-n*R+r*S)*U,e[14]=(_*E-g*T-m*v)*U,e[15]=(u*T-f*E+h*v)*U,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,h=s*l,d=s*u,g=s*f,_=a*u,m=a*f,p=o*f,v=c*l,E=c*u,y=c*f,T=n.x,w=n.y,C=n.z;return r[0]=(1-(_+p))*T,r[1]=(d+y)*T,r[2]=(g-E)*T,r[3]=0,r[4]=(d-y)*w,r[5]=(1-(h+p))*w,r[6]=(m+v)*w,r[7]=0,r[8]=(g+E)*C,r[9]=(m-v)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Pi.set(r[0],r[1],r[2]).length();const o=Pi.set(r[4],r[5],r[6]).length(),c=Pi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),un.copy(this);const l=1/a,u=1/o,f=1/c;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=f,un.elements[9]*=f,un.elements[10]*=f,t.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=bn,c=!1){const l=this.elements,u=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let g,_;if(c)g=s/(a-s),_=a*s/(a-s);else if(o===bn)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===ws)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=bn,c=!1){const l=this.elements,u=2/(t-e),f=2/(n-r),h=-(t+e)/(t-e),d=-(n+r)/(n-r);let g,_;if(c)g=1/(a-s),_=a/(a-s);else if(o===bn)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===ws)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Pi=new H,un=new St,Gd=new H(0,0,0),Hd=new H(1,1,1),Yn=new H,Fr=new H,$t=new H,ml=new St,gl=new nr;class wi{constructor(e=0,t=0,n=0,r=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Vc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vd=0;const _l=new H,Di=new nr,Pn=new St,Or=new H,ur=new H,Wd=new H,Xd=new nr,xl=new H(1,0,0),vl=new H(0,1,0),Ml=new H(0,0,1),Sl={type:"added"},Yd={type:"removed"},Ii={type:"childadded",child:null},ea={type:"childremoved",child:null};class Xt extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new H,t=new wi,n=new nr,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ve}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(xl,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(Ml,e)}translateOnAxis(e,t){return _l.copy(e).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xl,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(Ml,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Or.copy(e):Or.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ur,Or,this.up):Pn.lookAt(Or,ur,this.up),this.quaternion.setFromRotationMatrix(Pn),r&&(Pn.extractRotation(r.matrixWorld),Di.setFromRotationMatrix(Pn),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yd),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,e,Wd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,Xd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Xt.DEFAULT_UP=new H(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Mr extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qd={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qd)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Mr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function na(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Qe.workingColorSpace){if(e=Nd(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=na(a,s,e+1/3),this.g=na(a,s,e),this.b=na(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const n=Wc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gn(e.r),this.g=Gn(e.g),this.b=Gn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return Qe.workingToColorSpace(zt.copy(this),e),Math.round(je(zt.r*255,0,255))*65536+Math.round(je(zt.g*255,0,255))*256+Math.round(je(zt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(zt.copy(this),t);const n=zt.r,r=zt.g,s=zt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=nn){Qe.workingToColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,r=zt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL(Br);const n=Zs(qn.h,Br.h,t),r=Zs(qn.s,Br.s,t),s=Zs(qn.l,Br.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new et;et.NAMES=Wc;class Kd extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const hn=new H,Dn=new H,ia=new H,In=new H,Ni=new H,Ui=new H,yl=new H,ra=new H,sa=new H,aa=new H,oa=new rt,la=new rt,ca=new rt;class pn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),hn.subVectors(e,t),r.cross(hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){hn.subVectors(r,t),Dn.subVectors(n,t),ia.subVectors(e,t);const a=hn.dot(hn),o=hn.dot(Dn),c=hn.dot(ia),l=Dn.dot(Dn),u=Dn.dot(ia),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(l*c-o*u)*h,g=(a*u-o*c)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,In)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,In.x),c.addScaledVector(a,In.y),c.addScaledVector(o,In.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(e,t),la.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(oa,s.x),a.addScaledVector(la,s.y),a.addScaledVector(ca,s.z),a}static isFrontFacing(e,t,n,r){return hn.subVectors(n,t),Dn.subVectors(e,t),hn.cross(Dn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),hn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ni.subVectors(r,n),Ui.subVectors(s,n),ra.subVectors(e,n);const c=Ni.dot(ra),l=Ui.dot(ra);if(c<=0&&l<=0)return t.copy(n);sa.subVectors(e,r);const u=Ni.dot(sa),f=Ui.dot(sa);if(u>=0&&f<=u)return t.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ni,a);aa.subVectors(e,s);const d=Ni.dot(aa),g=Ui.dot(aa);if(g>=0&&d<=g)return t.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ui,o);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return yl.subVectors(s,r),o=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(yl,o);const p=1/(m+_+h);return a=_*p,o=h*p,t.copy(n).addScaledVector(Ni,a).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ir{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fn):fn.fromBufferAttribute(s,a),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),kr.subVectors(this.max,hr),Fi.subVectors(e.a,hr),Oi.subVectors(e.b,hr),Bi.subVectors(e.c,hr),Kn.subVectors(Oi,Fi),Zn.subVectors(Bi,Oi),oi.subVectors(Fi,Bi);let t=[0,-Kn.z,Kn.y,0,-Zn.z,Zn.y,0,-oi.z,oi.y,Kn.z,0,-Kn.x,Zn.z,0,-Zn.x,oi.z,0,-oi.x,-Kn.y,Kn.x,0,-Zn.y,Zn.x,0,-oi.y,oi.x,0];return!ua(t,Fi,Oi,Bi,kr)||(t=[1,0,0,0,1,0,0,0,1],!ua(t,Fi,Oi,Bi,kr))?!1:(Gr.crossVectors(Kn,Zn),t=[Gr.x,Gr.y,Gr.z],ua(t,Fi,Oi,Bi,kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new H,new H,new H,new H,new H,new H,new H,new H],fn=new H,zr=new ir,Fi=new H,Oi=new H,Bi=new H,Kn=new H,Zn=new H,oi=new H,hr=new H,kr=new H,Gr=new H,li=new H;function ua(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){li.fromArray(i,s);const o=r.x*Math.abs(li.x)+r.y*Math.abs(li.y)+r.z*Math.abs(li.z),c=e.dot(li),l=t.dot(li),u=n.dot(li);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Rt=new H,Hr=new We;let Zd=0;class Tn extends Ti{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cd,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hr.fromBufferAttribute(this,t),Hr.applyMatrix3(e),this.setXY(t,Hr.x,Hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=cr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),r=Yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),r=Yt(r,this.array),s=Yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Xc extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yc extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const $d=new ir,fr=new H,ha=new H;class Pr{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$d.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);const t=fr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(fr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(ha)),this.expandByPoint(fr.copy(e.center).sub(ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Jd=0;const tn=new St,fa=new Xt,zi=new H,Jt=new ir,dr=new ir,Nt=new H;class Zt extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ld(e)?Yc:Xc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,n){return tn.makeTranslation(e,t,n),this.applyMatrix4(tn),this}scale(e,t,n){return tn.makeScale(e,t,n),this.applyMatrix4(tn),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ir);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(Jt.min,dr.min),Jt.expandByPoint(Nt),Nt.addVectors(Jt.max,dr.max),Jt.expandByPoint(Nt)):(Jt.expandByPoint(dr.min),Jt.expandByPoint(dr.max))}Jt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Nt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Nt.fromBufferAttribute(o,l),c&&(zi.fromBufferAttribute(e,l),Nt.add(zi)),r=Math.max(r,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Tn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new H,c[S]=new H;const l=new H,u=new H,f=new H,h=new We,d=new We,g=new We,_=new H,m=new H;function p(S,R,L){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,L),h.fromBufferAttribute(s,S),d.fromBufferAttribute(s,R),g.fromBufferAttribute(s,L),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),o[S].add(_),o[R].add(_),o[L].add(_),c[S].add(m),c[R].add(m),c[L].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let S=0,R=v.length;S<R;++S){const L=v[S],D=L.start,V=L.count;for(let N=D,P=D+V;N<P;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const E=new H,y=new H,T=new H,w=new H;function C(S){T.fromBufferAttribute(r,S),w.copy(T);const R=o[S];E.copy(R),E.sub(T.multiplyScalar(T.dot(R))).normalize(),y.crossVectors(w,R);const D=y.dot(c[S])<0?-1:1;a.setXYZW(S,E.x,E.y,E.z,D)}for(let S=0,R=v.length;S<R;++S){const L=v[S],D=L.start,V=L.count;for(let N=D,P=D+V;N<P;N+=3)C(e.getX(N+0)),C(e.getX(N+1)),C(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new H,s=new H,a=new H,o=new H,c=new H,l=new H,u=new H,f=new H;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new Tn(h,u,f)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const da=new H,Qd=new H,jd=new Ve;class Qn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=da.subVectors(n,t).cross(Qd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(da),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||jd.getNormalMatrix(e),r=this.coplanarPoint(da).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ep=0;class rr extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Lr(),this.name="",this.type="Material",this.blending=br,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=bc,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qs,this.stencilZFail=qs,this.stencilZPass=qs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Qn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new We().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Un=new H,pa=new H,Vr=new H,Wr=new H;class Io{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){pa.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Wr.copy(this.origin).sub(pa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Wr.dot(this.direction),c=-Wr.dot(Vr),l=Wr.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*c-o,h=a*o-c,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(pa).addScaledVector(Vr,h),d}intersectSphere(e,t){if(e.radius<0)return null;Un.subVectors(e.center,this.origin);const n=Un.dot(this.direction),r=Un.dot(Un)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,d=e.z-a.z,g=t.x-a.x,_=t.y-a.y,m=t.z-a.z,p=n.x-a.x,v=n.y-a.y,E=n.z-a.z,y=Math.abs(c),T=Math.abs(l),w=Math.abs(u);let C,S,R,L,D,V,N,P,U,k,X,j;if(y>=T&&y>=w?(R=c,V=f,U=g,j=p,c>=0?(C=l,S=u,L=h,D=d,N=_,P=m,k=v,X=E):(C=u,S=l,L=d,D=h,N=m,P=_,k=E,X=v)):T>=w?(R=l,V=h,U=_,j=v,l>=0?(C=u,S=c,L=d,D=f,N=m,P=g,k=E,X=p):(C=c,S=u,L=f,D=d,N=g,P=m,k=p,X=E)):(R=u,V=d,U=m,j=E,u>=0?(C=c,S=l,L=f,D=h,N=g,P=_,k=p,X=v):(C=l,S=c,L=h,D=f,N=_,P=g,k=v,X=p)),R===0)return null;const Z=C/R,te=S/R,F=1/R,re=L-Z*V,ae=D-te*V,we=N-Z*U,Fe=P-te*U,ke=k-Z*j,I=X-te*j,Y=ke*Fe-I*we,se=re*I-ae*ke,xe=we*ae-Fe*re;if(r){if(Y<0||se<0||xe<0)return null}else if((Y<0||se<0||xe<0)&&(Y>0||se>0||xe>0))return null;const ce=Y+se+xe;if(ce===0)return null;const Te=F*(Y*V+se*U+xe*j);return(ce>0?Te<0:Te>0)?null:this.at(Te/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qc extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bl=new St,ci=new Io,Xr=new Pr,El=new H,Yr=new H,qr=new H,Kr=new H,ma=new H,Zr=new H,wl=new H,$r=new H;class Ft extends Xt{constructor(e=new Zt,t=new qc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(ma.fromBufferAttribute(f,e),a?Zr.addScaledVector(ma,u):Zr.addScaledVector(ma.sub(t),u))}t.add(Zr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(s),ci.copy(e.ray).recast(e.near),!(Xr.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Xr,El)===null||ci.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(bl.copy(s).invert(),ci.copy(e.ray).applyMatrix4(bl),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),E=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=v,T=E;y<T;y+=3){const w=o.getX(y),C=o.getX(y+1),S=o.getX(y+2);r=Jr(this,p,e,n,l,u,f,w,C,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);r=Jr(this,a,e,n,l,u,f,v,E,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),E=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=v,T=E;y<T;y+=3){const w=y,C=y+1,S=y+2;r=Jr(this,p,e,n,l,u,f,w,C,S),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,E=m+1,y=m+2;r=Jr(this,a,e,n,l,u,f,v,E,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function tp(i,e,t,n,r,s,a,o){let c;if(e.side===qt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===yi,o),c===null)return null;$r.copy(o),$r.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($r);return l<t.near||l>t.far?null:{distance:l,point:$r.clone(),object:i}}function Jr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Yr),i.getVertexPosition(c,qr),i.getVertexPosition(l,Kr);const u=tp(i,e,t,n,Yr,qr,Kr,wl);if(u){const f=new H;pn.getBarycoord(wl,Yr,qr,Kr,f),r&&(u.uv=pn.getInterpolatedAttribute(r,o,c,l,f,new We)),s&&(u.uv1=pn.getInterpolatedAttribute(s,o,c,l,f,new We)),a&&(u.normal=pn.getInterpolatedAttribute(a,o,c,l,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new H,materialIndex:0};pn.getNormal(Yr,qr,Kr,h.normal),u.face=h,u.barycoord=f}return u}class Yi extends Wt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Lt,u=Lt,f,h){super(null,a,o,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Kc extends Tn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ui=new Pr,np=new We(.5,.5),Qr=new H;class As{constructor(e=new Qn,t=new Qn,n=new Qn,r=new Qn,s=new Qn,a=new Qn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],f=s[5],h=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],v=s[12],E=s[13],y=s[14],T=s[15];if(r[0].setComponents(l-a,d-u,p-g,T-v).normalize(),r[1].setComponents(l+a,d+u,p+g,T+v).normalize(),r[2].setComponents(l+o,d+f,p+_,T+E).normalize(),r[3].setComponents(l-o,d-f,p-_,T-E).normalize(),n)r[4].setComponents(c,h,m,y).normalize(),r[5].setComponents(l-c,d-h,p-m,T-y).normalize();else if(r[4].setComponents(l-c,d-h,p-m,T-y).normalize(),t===bn)r[5].setComponents(l+c,d+h,p+m,T+y).normalize();else if(t===ws)r[5].setComponents(c,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){ui.center.set(0,0,0);const t=np.distanceTo(e.center);return ui.radius=.7071067811865476+t,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Qr.x=r.normal.x>0?e.max.x:e.min.x,Qr.y=r.normal.y>0?e.max.y:e.min.y,Qr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ip extends rr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Rs=new H,Cs=new H,Tl=new St,pr=new Io,jr=new Pr,ga=new H,Al=new H;class rp extends Xt{constructor(e=new Zt,t=new ip){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Rs.fromBufferAttribute(t,r-1),Cs.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Rs.distanceTo(Cs);e.setAttribute("lineDistance",new kt(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(r),jr.radius+=s,e.ray.intersectsSphere(jr)===!1)return;Tl.copy(r).invert(),pr.copy(e.ray).applyMatrix4(Tl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),E=es(this,e,pr,c,p,v,_);E&&t.push(E)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=es(this,e,pr,c,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=es(this,e,pr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=es(this,e,pr,c,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function es(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Rs.fromBufferAttribute(o,r),Cs.fromBufferAttribute(o,s),t.distanceSqToSegment(Rs,Cs,ga,Al)>n)return;ga.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ga);if(!(l<e.near||l>e.far))return{distance:l,point:Al.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Rl=new H,Cl=new H;class sp extends rp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Rl.fromBufferAttribute(t,r),Cl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Rl.distanceTo(Cl);e.setAttribute("lineDistance",new kt(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ap extends rr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ll=new St,fo=new Io,ts=new Pr,ns=new H;class op extends Xt{constructor(e=new Zt,t=new ap){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;Ll.copy(r).invert(),fo.copy(e.ray).applyMatrix4(Ll);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=h,_=d;g<_;g++){const m=l.getX(g);ns.fromBufferAttribute(f,m),Pl(ns,m,c,r,e,t,this)}}else{const h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=h,_=d;g<_;g++)ns.fromBufferAttribute(f,g),Pl(ns,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Pl(i,e,t,n,r,s,a){const o=fo.distanceSqToPoint(i);if(o<t){const c=new H;fo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Zc extends Wt{constructor(e=[],t=bi,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rr extends Wt{constructor(e,t,n=Rn,r,s,a,o=Lt,c=Lt,l,u=Hn,f=1){if(u!==Hn&&u!==gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Do(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class lp extends Rr{constructor(e,t=Rn,n=bi,r,s,a=Lt,o=Lt,c,l=Hn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $c extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Dr extends Zt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(u,3)),this.setAttribute("uv",new kt(f,2));function g(_,m,p,v,E,y,T,w,C,S,R){const L=y/C,D=T/S,V=y/2,N=T/2,P=w/2,U=C+1,k=S+1;let X=0,j=0;const Z=new H;for(let te=0;te<k;te++){const F=te*D-N;for(let re=0;re<U;re++){const ae=re*L-V;Z[_]=ae*v,Z[m]=F*E,Z[p]=P,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=w>0?1:-1,u.push(Z.x,Z.y,Z.z),f.push(re/C),f.push(1-te/S),X+=1}}for(let te=0;te<S;te++)for(let F=0;F<C;F++){const re=h+F+U*te,ae=h+F+U*(te+1),we=h+(F+1)+U*(te+1),Fe=h+(F+1)+U*te;c.push(re,ae,Fe),c.push(ae,we,Fe),j+=6}o.addGroup(d,j,R),d+=j,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class on extends Zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,f=e/o,h=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*h-a;for(let E=0;E<l;E++){const y=E*f-s;g.push(y,-v,0),_.push(0,0,1),m.push(E/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const E=v+l*p,y=v+l*(p+1),T=v+1+l*(p+1),w=v+1+l*p;d.push(E,y,w),d.push(y,T,w)}this.setIndex(d),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(_,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.width,e.height,e.widthSegments,e.heightSegments)}}function er(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Dl(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Dl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Ht(i){const e={};for(let t=0;t<i.length;t++){const n=er(i[t]);for(const r in n)e[r]=n[r]}return e}function Dl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function cp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const up={clone:er,merge:Ht};var hp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pt extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=cp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new et().setHex(r.value);break;case"v2":this.uniforms[n].value=new We().fromArray(r.value);break;case"v3":this.uniforms[n].value=new H().fromArray(r.value);break;case"v4":this.uniforms[n].value=new rt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[n].value=new St().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class dp extends Pt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pp extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mp extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const is=new H,rs=new nr,xn=new H;class Qc extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(is,rs,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(is,rs,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $n=new H,Il=new We,Nl=new We;class Qt extends Qc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ho*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ho*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($n.x,$n.y).multiplyScalar(-e/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-e/$n.z)}getViewSize(e,t){return this.getViewBounds(e,Il,Nl),t.subVectors(Nl,Il)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class No extends Qc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jc extends Zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const ki=-90,Gi=1;class gp extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Qt(ki,Gi,e,t);r.layers=this.layers,this.add(r);const s=new Qt(ki,Gi,e,t);s.layers=this.layers,this.add(s);const a=new Qt(ki,Gi,e,t);a.layers=this.layers,this.add(a);const o=new Qt(ki,Gi,e,t);o.layers=this.layers,this.add(o);const c=new Qt(ki,Gi,e,t);c.layers=this.layers,this.add(c);const l=new Qt(ki,Gi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _p extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class eu{static{eu.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Ul(i,e,t,n){const r=xp(n);switch(t){case Oc:return i*e;case zc:return i*e/r.components*r.byteLength;case Ao:return i*e/r.components*r.byteLength;case Ei:return i*e*2/r.components*r.byteLength;case Ro:return i*e*2/r.components*r.byteLength;case Bc:return i*e*3/r.components*r.byteLength;case rn:return i*e*4/r.components*r.byteLength;case Co:return i*e*4/r.components*r.byteLength;case ds:case ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ms:case gs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Ua:case Oa:return Math.max(i,8)*Math.max(e,8)/2;case za:case ka:case Ha:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case ys:case Wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case to:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case no:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case io:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ro:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case so:case ao:case oo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case lo:case co:return Math.ceil(i/4)*Math.ceil(e/4)*8;case bs:case uo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xp(i){switch(i){case jt:case Ic:return{byteLength:1,components:1};case wr:case Nc:case Cn:return{byteLength:2,components:1};case wo:case To:return{byteLength:2,components:4};case Rn:case Eo:case yn:return{byteLength:4,components:1};case Uc:case Fc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bo}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bo);function tu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function vp(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Mp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sp=`#ifdef USE_ALPHAHASH
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
#endif`,yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ep=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tp=`#ifdef USE_AOMAP
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
#endif`,Ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rp=`#ifdef USE_BATCHING
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
#endif`,Cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
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
#endif`,Np=`#ifdef USE_BUMPMAP
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
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Vp=`#define PI 3.141592653589793
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
} // validated`,Wp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xp=`vec3 transformedNormal = objectNormal;
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
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$p="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qp=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
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
#endif`,tm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
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
#endif`,im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,om=`#ifdef USE_GRADIENTMAP
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
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fm=`#ifdef USE_ENVMAP
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
#endif`,dm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_m=`PhysicalMaterial material;
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
#endif`,xm=`uniform sampler2D dfgLUT;
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
}`,vm=`
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
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ym=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lm=`#if defined( USE_POINTS_UV )
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
#endif`,Pm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`#ifdef USE_MORPHTARGETS
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
#endif`,Om=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vm=`#ifdef USE_NORMALMAP
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
#endif`,Wm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Km=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,e0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,t0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,s0=`float getShadowMask() {
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
}`,a0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,o0=`#ifdef USE_SKINNING
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
#endif`,l0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,c0=`#ifdef USE_SKINNING
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
#endif`,u0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,h0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,d0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,p0=`#ifdef USE_TRANSMISSION
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
#endif`,m0=`#ifdef USE_TRANSMISSION
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const M0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,S0=`uniform sampler2D t2D;
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
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`#include <common>
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
}`,A0=`#if DEPTH_PACKING == 3200
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
}`,R0=`#define DISTANCE
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
}`,C0=`#define DISTANCE
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
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,P0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`uniform float scale;
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
}`,I0=`uniform vec3 diffuse;
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
}`,N0=`#include <common>
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
}`,U0=`uniform vec3 diffuse;
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
}`,F0=`#define LAMBERT
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
}`,O0=`#define LAMBERT
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
}`,B0=`#define MATCAP
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
}`,z0=`#define MATCAP
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
}`,k0=`#define NORMAL
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
}`,G0=`#define NORMAL
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
}`,H0=`#define PHONG
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
}`,V0=`#define PHONG
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
}`,W0=`#define STANDARD
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
}`,X0=`#define STANDARD
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
}`,Y0=`#define TOON
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
}`,q0=`#define TOON
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
}`,K0=`uniform float size;
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
}`,Z0=`uniform vec3 diffuse;
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
}`,$0=`#include <common>
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
}`,J0=`uniform vec3 color;
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
}`,Q0=`uniform float rotation;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:Mp,alphahash_pars_fragment:Sp,alphamap_fragment:yp,alphamap_pars_fragment:bp,alphatest_fragment:Ep,alphatest_pars_fragment:wp,aomap_fragment:Tp,aomap_pars_fragment:Ap,batching_pars_vertex:Rp,batching_vertex:Cp,begin_vertex:Lp,beginnormal_vertex:Pp,bsdfs:Dp,iridescence_fragment:Ip,bumpmap_pars_fragment:Np,clipping_planes_fragment:Up,clipping_planes_pars_fragment:Fp,clipping_planes_pars_vertex:Op,clipping_planes_vertex:Bp,color_fragment:zp,color_pars_fragment:kp,color_pars_vertex:Gp,color_vertex:Hp,common:Vp,cube_uv_reflection_fragment:Wp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:Yp,displacementmap_vertex:qp,emissivemap_fragment:Kp,emissivemap_pars_fragment:Zp,colorspace_fragment:$p,colorspace_pars_fragment:Jp,envmap_fragment:Qp,envmap_common_pars_fragment:jp,envmap_pars_fragment:em,envmap_pars_vertex:tm,envmap_physical_pars_fragment:fm,envmap_vertex:nm,fog_vertex:im,fog_pars_vertex:rm,fog_fragment:sm,fog_pars_fragment:am,gradientmap_pars_fragment:om,lightmap_pars_fragment:lm,lights_lambert_fragment:cm,lights_lambert_pars_fragment:um,lights_pars_begin:hm,lights_toon_fragment:dm,lights_toon_pars_fragment:pm,lights_phong_fragment:mm,lights_phong_pars_fragment:gm,lights_physical_fragment:_m,lights_physical_pars_fragment:xm,lights_fragment_begin:vm,lights_fragment_maps:Mm,lights_fragment_end:Sm,lightprobes_pars_fragment:ym,logdepthbuf_fragment:bm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:wm,logdepthbuf_vertex:Tm,map_fragment:Am,map_pars_fragment:Rm,map_particle_fragment:Cm,map_particle_pars_fragment:Lm,metalnessmap_fragment:Pm,metalnessmap_pars_fragment:Dm,morphinstance_vertex:Im,morphcolor_vertex:Nm,morphnormal_vertex:Um,morphtarget_pars_vertex:Fm,morphtarget_vertex:Om,normal_fragment_begin:Bm,normal_fragment_maps:zm,normal_pars_fragment:km,normal_pars_vertex:Gm,normal_vertex:Hm,normalmap_pars_fragment:Vm,clearcoat_normal_fragment_begin:Wm,clearcoat_normal_fragment_maps:Xm,clearcoat_pars_fragment:Ym,iridescence_pars_fragment:qm,opaque_fragment:Km,packing:Zm,premultiplied_alpha_fragment:$m,project_vertex:Jm,dithering_fragment:Qm,dithering_pars_fragment:jm,roughnessmap_fragment:e0,roughnessmap_pars_fragment:t0,shadowmap_pars_fragment:n0,shadowmap_pars_vertex:i0,shadowmap_vertex:r0,shadowmask_pars_fragment:s0,skinbase_vertex:a0,skinning_pars_vertex:o0,skinning_vertex:l0,skinnormal_vertex:c0,specularmap_fragment:u0,specularmap_pars_fragment:h0,tonemapping_fragment:f0,tonemapping_pars_fragment:d0,transmission_fragment:p0,transmission_pars_fragment:m0,uv_pars_fragment:g0,uv_pars_vertex:_0,uv_vertex:x0,worldpos_vertex:v0,background_vert:M0,background_frag:S0,backgroundCube_vert:y0,backgroundCube_frag:b0,cube_vert:E0,cube_frag:w0,depth_vert:T0,depth_frag:A0,distance_vert:R0,distance_frag:C0,equirect_vert:L0,equirect_frag:P0,linedashed_vert:D0,linedashed_frag:I0,meshbasic_vert:N0,meshbasic_frag:U0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:B0,meshmatcap_frag:z0,meshnormal_vert:k0,meshnormal_frag:G0,meshphong_vert:H0,meshphong_frag:V0,meshphysical_vert:W0,meshphysical_frag:X0,meshtoon_vert:Y0,meshtoon_frag:q0,points_vert:K0,points_frag:Z0,shadow_vert:$0,shadow_frag:J0,sprite_vert:Q0,sprite_frag:j0},ge={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Sn={basic:{uniforms:Ht([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Ht([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Ht([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Ht([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Ht([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new et(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Ht([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Ht([ge.points,ge.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Ht([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Ht([ge.common,ge.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Ht([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Ht([ge.sprite,ge.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Ht([ge.common,ge.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Ht([ge.lights,ge.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Sn.physical={uniforms:Ht([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const ss={r:0,b:0,g:0},eg=new St,nu=new Ve;nu.set(-1,0,0,0,1,0,0,0,1);function tg(i,e,t,n,r,s){const a=new et(0);let o=r===!0?0:1,c,l,u=null,f=0,h=null;function d(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const y=v.backgroundBlurriness>0;E=e.get(E,y)}return E}function g(v){let E=!1;const y=d(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,E){const y=d(E);y&&(y.isCubeTexture||y.mapping===Us)?(l===void 0&&(l=new Ft(new Dr(1,1,1),new Pt({name:"BackgroundCubeMaterial",uniforms:er(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(eg.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nu),l.material.toneMapped=Qe.getTransfer(y.colorSpace)!==ut,(u!==y||f!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ft(new on(2,2),new Pt({name:"BackgroundMaterial",uniforms:er(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(y.colorSpace)!==ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,E){v.getRGB(ss,Jc(i)),t.buffers.color.setClear(ss.r,ss.g,ss.b,E,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:_,dispose:p}}function ng(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(D,V,N,P,U){let k=!1;const X=f(D,P,N,V);s!==X&&(s=X,l(s.object)),k=d(D,P,N,U),k&&g(D,P,N,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,y(D,V,N,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function f(D,V,N,P){const U=P.wireframe===!0;let k=n[V.id];k===void 0&&(k={},n[V.id]=k);const X=D.isInstancedMesh===!0?D.id:0;let j=k[X];j===void 0&&(j={},k[X]=j);let Z=j[N.id];Z===void 0&&(Z={},j[N.id]=Z);let te=Z[U];return te===void 0&&(te=h(c()),Z[U]=te),te}function h(D){const V=[],N=[],P=[];for(let U=0;U<t;U++)V[U]=0,N[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:N,attributeDivisors:P,object:D,attributes:{},index:null}}function d(D,V,N,P){const U=s.attributes,k=V.attributes;let X=0;const j=N.getAttributes();for(const Z in j)if(j[Z].location>=0){const F=U[Z];let re=k[Z];if(re===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(re=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(re=D.instanceColor)),F===void 0||F.attribute!==re||re&&F.data!==re.data)return!0;X++}return s.attributesNum!==X||s.index!==P}function g(D,V,N,P){const U={},k=V.attributes;let X=0;const j=N.getAttributes();for(const Z in j)if(j[Z].location>=0){let F=k[Z];F===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(F=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(F=D.instanceColor));const re={};re.attribute=F,F&&F.data&&(re.data=F.data),U[Z]=re,X++}s.attributes=U,s.attributesNum=X,s.index=P}function _(){const D=s.newAttributes;for(let V=0,N=D.length;V<N;V++)D[V]=0}function m(D){p(D,0)}function p(D,V){const N=s.newAttributes,P=s.enabledAttributes,U=s.attributeDivisors;N[D]=1,P[D]===0&&(i.enableVertexAttribArray(D),P[D]=1),U[D]!==V&&(i.vertexAttribDivisor(D,V),U[D]=V)}function v(){const D=s.newAttributes,V=s.enabledAttributes;for(let N=0,P=V.length;N<P;N++)V[N]!==D[N]&&(i.disableVertexAttribArray(N),V[N]=0)}function E(D,V,N,P,U,k,X){X===!0?i.vertexAttribIPointer(D,V,N,U,k):i.vertexAttribPointer(D,V,N,P,U,k)}function y(D,V,N,P){_();const U=P.attributes,k=N.getAttributes(),X=V.defaultAttributeValues;for(const j in k){const Z=k[j];if(Z.location>=0){let te=U[j];if(te===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(te=D.instanceColor)),te!==void 0){const F=te.normalized,re=te.itemSize,ae=e.get(te);if(ae===void 0)continue;const we=ae.buffer,Fe=ae.type,ke=ae.bytesPerElement,I=Fe===i.INT||Fe===i.UNSIGNED_INT||te.gpuType===Eo;if(te.isInterleavedBufferAttribute){const Y=te.data,se=Y.stride,xe=te.offset;if(Y.isInstancedInterleavedBuffer){for(let ce=0;ce<Z.locationSize;ce++)p(Z.location+ce,Y.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ce=0;ce<Z.locationSize;ce++)m(Z.location+ce);i.bindBuffer(i.ARRAY_BUFFER,we);for(let ce=0;ce<Z.locationSize;ce++)E(Z.location+ce,re/Z.locationSize,Fe,F,se*ke,(xe+re/Z.locationSize*ce)*ke,I)}else{if(te.isInstancedBufferAttribute){for(let Y=0;Y<Z.locationSize;Y++)p(Z.location+Y,te.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Y=0;Y<Z.locationSize;Y++)m(Z.location+Y);i.bindBuffer(i.ARRAY_BUFFER,we);for(let Y=0;Y<Z.locationSize;Y++)E(Z.location+Y,re/Z.locationSize,Fe,F,re*ke,re/Z.locationSize*Y*ke,I)}}else if(X!==void 0){const F=X[j];if(F!==void 0)switch(F.length){case 2:i.vertexAttrib2fv(Z.location,F);break;case 3:i.vertexAttrib3fv(Z.location,F);break;case 4:i.vertexAttrib4fv(Z.location,F);break;default:i.vertexAttrib1fv(Z.location,F)}}}}v()}function T(){R();for(const D in n){const V=n[D];for(const N in V){const P=V[N];for(const U in P){const k=P[U];for(const X in k)u(k[X].object),delete k[X];delete P[U]}}delete n[D]}}function w(D){if(n[D.id]===void 0)return;const V=n[D.id];for(const N in V){const P=V[N];for(const U in P){const k=P[U];for(const X in k)u(k[X].object),delete k[X];delete P[U]}}delete n[D.id]}function C(D){for(const V in n){const N=n[V];for(const P in N){const U=N[P];if(U[D.id]===void 0)continue;const k=U[D.id];for(const X in k)u(k[X].object),delete k[X];delete U[D.id]}}}function S(D){for(const V in n){const N=n[V],P=D.isInstancedMesh===!0?D.id:0,U=N[P];if(U!==void 0){for(const k in U){const X=U[k];for(const j in X)u(X[j].object),delete X[j];delete U[k]}delete N[P],Object.keys(N).length===0&&delete n[V]}}}function R(){L(),a=!0,s!==r&&(s=r,l(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function ig(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function rg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===Cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==jt&&C!==yn&&!S&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:T,samples:w}}function sg(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Qn,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const v=s?0:n,E=v*4;let y=p.clippingState||null;c.value=y,y=u(g,h,E,d);for(let T=0;T!==E;++T)y[T]=t[T];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=d;E!==_;++E,y+=4)a.copy(f[E]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const qi=4,ag=6,og=20,lg=256,mr=new No,Fl=new et;let _a=null,xa=0,va=0,Ma=!1;const cg=new H,hi=new H;class Ol{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=cg}=s;_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_a,xa,va),this._renderer.xr.enabled=Ma,e.scissorTest=!1,Hi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tt,minFilter:Tt,generateMipmaps:!1,type:Cn,format:rn,colorSpace:Ar,depthBuffer:!1},r=Bl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bl(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ug(s)),this._blurMaterial=fg(s,e,t),this._ggxMaterial=hg(s,e,t)}return r}_compileMaterial(e){const t=new Ft(new Zt,e);this._renderer.compile(t,mr)}_sceneToCubeUV(e,t,n,r,s){const c=new Qt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Fl),f.toneMapping=wn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ft(new Dr,new qc({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,p=!0):(m.color.copy(Fl),p=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[E],s.y,s.z)):y===1?(c.up.set(0,0,l[E]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[E],s.z)):(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[E]));const T=this._cubeSize;Hi(r,y*T,E>2?T:0,T,T),f.setRenderTarget(r),p&&f.render(_,c),f.render(e,c)}f.toneMapping=d,f.autoClear=h,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===bi||e.mapping===ji;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Hi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,mr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,d=f*h,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-qi?n-g+qi:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=g-t,Hi(s,m,p,3*_,2*_),r.setRenderTarget(s),r.render(o,mr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,Hi(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(o,mr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-qi?r-this._lodMax+qi:0),h=4*(this._cubeSize-u);Hi(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(c,mr)}}function ug(i){const e=[],t=[];let n=i;const r=i-qi+1+ag;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,d=3,g=new Float32Array(d*h*f),_=new Float32Array(d*h*f);for(let p=0;p<f;p++){const v=p%3*2/3-1,E=p>2?0:-1,y=[v,E,0,v+2/3,E,0,v+2/3,E+1,0,v,E,0,v+2/3,E+1,0,v,E+1,0];g.set(y,d*h*p);for(let T=0;T<h;T++){const w=u[T*2]*2-1,C=u[T*2+1]*2-1;p===0?hi.set(1,C,w):p===1?hi.set(-w,1,-C):p===2?hi.set(-w,C,1):p===3?hi.set(-1,C,-w):p===4?hi.set(-w,-1,C):hi.set(w,C,-1),hi.toArray(_,(p*h+T)*d)}}const m=new Zt;m.setAttribute("position",new Tn(g,d)),m.setAttribute("outputDirection",new Tn(_,d)),t.push(new Ft(m,null)),n>qi&&n--}return{lodMeshes:t,sizeLods:e}}function Bl(i,e,t){const n=new an(i,e,t);return n.texture.mapping=Us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function hg(i,e,t){return new Pt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fs(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function fg(i,e,t){return new Pt({name:"SphericalGaussianBlur",defines:{SAMPLES:og,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Fs(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function zl(){return new Pt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fs(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function kl(){return new Pt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Fs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class iu extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Zc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Dr(5,5,5),s=new Pt({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:kn});s.uniforms.tEquirect.value=t;const a=new Ft(r,s),o=t.minFilter;return t.minFilter===mi&&(t.minFilter=Tt),new gp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function dg(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Ws||d===Xs)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const _=new iu(g.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",l),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,g=d===Ws||d===Xs,_=d===bi||d===ji;if(g||_){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Ol(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const v=h.image;return g&&v&&v.height>0||_&&v&&c(v)?(n===null&&(n=new Ol(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===Ws?h.mapping=bi:d===Xs&&(h.mapping=ji),h}function c(h){let d=0;const g=6;for(let _=0;_<g;_++)h[_]!==void 0&&d++;return d===g}function l(h){const d=h.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function pg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Zi("WebGLRenderer: "+n+" extension not supported."),r}}}function mg(i,e,t,n){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const v=d.array;_=d.version;for(let E=0,y=v.length;E<y;E+=3){const T=v[E+0],w=v[E+1],C=v[E+2];h.push(T,w,w,C,C,T)}}else{const v=g.array;_=g.version;for(let E=0,y=v.length/3-1;E<y;E+=3){const T=E+0,w=E+1,C=E+2;h.push(T,w,w,C,C,T)}}const m=new(g.count>=65535?Yc:Xc)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function gg(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,h){i.drawElements(n,h,s,f*a),t.update(h,n,1)}function l(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,s,f*a,d),t.update(h,n,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,d);let _=0;for(let m=0;m<d;m++)_+=h[m];t.update(_,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function _g(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function xg(i,e,t){const n=new WeakMap,r=new rt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let R=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",R)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let E=0;d===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let y=o.attributes.position.count*E,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const w=new Float32Array(y*T*4*f),C=new Hc(w,y,T,f);C.type=yn,C.needsUpdate=!0;const S=E*4;for(let L=0;L<f;L++){const D=m[L],V=p[L],N=v[L],P=y*T*4*L;for(let U=0;U<D.count;U++){const k=U*S;d===!0&&(r.fromBufferAttribute(D,U),w[P+k+0]=r.x,w[P+k+1]=r.y,w[P+k+2]=r.z,w[P+k+3]=0),g===!0&&(r.fromBufferAttribute(V,U),w[P+k+4]=r.x,w[P+k+5]=r.y,w[P+k+6]=r.z,w[P+k+7]=0),_===!0&&(r.fromBufferAttribute(N,U),w[P+k+8]=r.x,w[P+k+9]=r.y,w[P+k+10]=r.z,w[P+k+11]=N.itemSize===4?r.w:1)}}h={count:f,texture:C,size:new We(y,T)},n.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function vg(i,e,t,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,f=l.geometry,h=e.get(l,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Mg={[wc]:"LINEAR_TONE_MAPPING",[Tc]:"REINHARD_TONE_MAPPING",[Ac]:"CINEON_TONE_MAPPING",[Rc]:"ACES_FILMIC_TONE_MAPPING",[Lc]:"AGX_TONE_MAPPING",[Pc]:"NEUTRAL_TONE_MAPPING",[Cc]:"CUSTOM_TONE_MAPPING"};function Sg(i,e,t,n,r,s){const a=new an(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Zt;l.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new kt([0,2,0,0,2,0],2));const u=new dp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ft(l,u),h=new No(-1,1,1,-1,0,1);let d=null,g=null,_=!1,m,p=null,v=[],E=!1;this.setSize=function(y,T){a.setSize(y,T),o!==null&&o.setSize(y,T),c!==null&&c.setSize(y,T);for(let w=0;w<v.length;w++){const C=v[w];C.setSize&&C.setSize(y,T)}},this.setEffects=function(y){v=y,E=v.length>0&&v[0].isRenderPass===!0;const T=a.width,w=a.height;v.length>0&&o===null&&(o=new an(T,w,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),c=new an(T,w,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<v.length;C++){const S=v[C];S.setSize&&S.setSize(T,w)}},this.begin=function(y,T){if(_||y.toneMapping===wn&&v.length===0)return!1;if(p=T,T!==null){const w=T.width,C=T.height;(a.width!==w||a.height!==C)&&this.setSize(w,C)}return E===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=wn,!0},this.hasRenderPass=function(){return E},this.end=function(y,T){y.toneMapping=m,_=!0;let w=a,C=o;for(let S=0;S<v.length;S++){const R=v[S];R.enabled!==!1&&(R.render(y,C,w,T),R.needsSwap!==!1&&(w=C,C=C===o?c:o))}if(d!==y.outputColorSpace||g!==y.toneMapping){d=y.outputColorSpace,g=y.toneMapping,u.defines={},Qe.getTransfer(d)===ut&&(u.defines.SRGB_TRANSFER="");const S=Mg[g];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(p),y.render(f,h),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const ru=new Wt,po=new Rr(1,1),su=new Hc,au=new kd,ou=new Zc,Gl=[],Hl=[],Vl=new Float32Array(16),Wl=new Float32Array(9),Xl=new Float32Array(4);function sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Gl[r];if(s===void 0&&(s=new Float32Array(r),Gl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Os(i,e){let t=Hl[e];t===void 0&&(t=new Int32Array(e),Hl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function Eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function Tg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Xl.set(n),i.uniformMatrix2fv(this.addr,!1,Xl),It(t,n)}}function Ag(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Wl.set(n),i.uniformMatrix3fv(this.addr,!1,Wl),It(t,n)}}function Rg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Vl.set(n),i.uniformMatrix4fv(this.addr,!1,Vl),It(t,n)}}function Cg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function Dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function Ig(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function Ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function Fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function Og(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(po.compareFunction=t.isReversedDepthBuffer()?Po:Lo,s=po):s=ru,t.setTexture2D(e||s,r)}function Bg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||au,r)}function zg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ou,r)}function kg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||su,r)}function Gg(i){switch(i){case 5126:return yg;case 35664:return bg;case 35665:return Eg;case 35666:return wg;case 35674:return Tg;case 35675:return Ag;case 35676:return Rg;case 5124:case 35670:return Cg;case 35667:case 35671:return Lg;case 35668:case 35672:return Pg;case 35669:case 35673:return Dg;case 5125:return Ig;case 36294:return Ng;case 36295:return Ug;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return kg}}function Hg(i,e){i.uniform1fv(this.addr,e)}function Vg(i,e){const t=sr(e,this.size,2);i.uniform2fv(this.addr,t)}function Wg(i,e){const t=sr(e,this.size,3);i.uniform3fv(this.addr,t)}function Xg(i,e){const t=sr(e,this.size,4);i.uniform4fv(this.addr,t)}function Yg(i,e){const t=sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function qg(i,e){const t=sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Kg(i,e){const t=sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zg(i,e){i.uniform1iv(this.addr,e)}function $g(i,e){i.uniform2iv(this.addr,e)}function Jg(i,e){i.uniform3iv(this.addr,e)}function Qg(i,e){i.uniform4iv(this.addr,e)}function jg(i,e){i.uniform1uiv(this.addr,e)}function e_(i,e){i.uniform2uiv(this.addr,e)}function t_(i,e){i.uniform3uiv(this.addr,e)}function n_(i,e){i.uniform4uiv(this.addr,e)}function i_(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Dt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=po:a=ru;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function r_(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Dt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||au,s[a])}function s_(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Dt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ou,s[a])}function a_(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Dt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||su,s[a])}function o_(i){switch(i){case 5126:return Hg;case 35664:return Vg;case 35665:return Wg;case 35666:return Xg;case 35674:return Yg;case 35675:return qg;case 35676:return Kg;case 5124:case 35670:return Zg;case 35667:case 35671:return $g;case 35668:case 35672:return Jg;case 35669:case 35673:return Qg;case 5125:return jg;case 36294:return e_;case 36295:return t_;case 36296:return n_;case 35678:case 36198:case 36298:case 36306:case 35682:return i_;case 35679:case 36299:case 36307:return r_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return a_}}class l_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Gg(t.type)}}class c_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=o_(t.type)}}class u_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function Yl(i,e){i.seq.push(e),i.map[e.id]=e}function h_(i,e,t){const n=i.name,r=n.length;for(Sa.lastIndex=0;;){const s=Sa.exec(n),a=Sa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Yl(t,l===void 0?new l_(o,i,e):new c_(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new u_(o),Yl(t,f)),t=f}}}class _s{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);h_(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function ql(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const f_=37297;let d_=0;function p_(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Kl=new Ve;function m_(i){Qe._getMatrix(Kl,Qe.workingColorSpace,i);const e=`mat3( ${Kl.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Es:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+p_(i.getShaderSource(e),o)}else return s}function g_(i,e){const t=m_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const __={[wc]:"Linear",[Tc]:"Reinhard",[Ac]:"Cineon",[Rc]:"ACESFilmic",[Lc]:"AgX",[Pc]:"Neutral",[Cc]:"Custom"};function x_(i,e){const t=__[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const as=new H;function v_(){Qe.getLuminanceCoefficients(as);const i=as.x.toFixed(4),e=as.y.toFixed(4),t=as.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function M_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function S_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function y_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Sr(i){return i!==""}function $l(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const b_=/^[ \t]*#include +<([\w\d./]+)>/gm;function mo(i){return i.replace(b_,w_)}const E_=new Map;function w_(i,e){let t=Ke[e];if(t===void 0){const n=E_.get(e);if(n!==void 0)t=Ke[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return mo(t)}const T_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ql(i){return i.replace(T_,A_)}function A_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const R_={[fs]:"SHADOWMAP_TYPE_PCF",[vr]:"SHADOWMAP_TYPE_VSM"};function C_(i){return R_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const L_={[bi]:"ENVMAP_TYPE_CUBE",[ji]:"ENVMAP_TYPE_CUBE",[Us]:"ENVMAP_TYPE_CUBE_UV"};function P_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":L_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const D_={[ji]:"ENVMAP_MODE_REFRACTION"};function I_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":D_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const N_={[Ec]:"ENVMAP_BLENDING_MULTIPLY",[_d]:"ENVMAP_BLENDING_MIX",[xd]:"ENVMAP_BLENDING_ADD"};function U_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":N_[i.combine]||"ENVMAP_BLENDING_NONE"}function F_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function O_(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=C_(t),l=P_(t),u=I_(t),f=U_(t),h=F_(t),d=M_(t),g=S_(s),_=r.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Sr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Sr).join(`
`),p.length>0&&(p+=`
`)):(m=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),p=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Ke.tonemapping_pars_fragment:"",t.toneMapping!==wn?x_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,g_("linearToOutputTexel",t.outputColorSpace),v_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sr).join(`
`)),a=mo(a),a=$l(a,t),a=Jl(a,t),o=mo(o),o=$l(o,t),o=Jl(o,t),a=Ql(a),o=Ql(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=v+m+a,y=v+p+o,T=ql(r,r.VERTEX_SHADER,E),w=ql(r,r.FRAGMENT_SHADER,y);r.attachShader(_,T),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(D){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(_)||"",N=r.getShaderInfoLog(T)||"",P=r.getShaderInfoLog(w)||"",U=V.trim(),k=N.trim(),X=P.trim();let j=!0,Z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,T,w);else{const te=Zl(r,T,"vertex"),F=Zl(r,w,"fragment");nt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+te+`
`+F)}else U!==""?Be("WebGLProgram: Program Info Log:",U):(k===""||X==="")&&(Z=!1);Z&&(D.diagnostics={runnable:j,programLog:U,vertexShader:{log:k,prefix:m},fragmentShader:{log:X,prefix:p}})}r.deleteShader(T),r.deleteShader(w),S=new _s(r,_),R=y_(r,_)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,f_)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=d_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}let B_=0;class z_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new k_(e),t.set(e,n)),n}}class k_{constructor(e){this.id=B_++,this.code=e,this.usedTimes=0}}function G_(i){return i===Ei||i===ys||i===bs}function H_(i,e,t,n,r,s){const a=new Vc,o=new z_,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function _(S,R,L,D,V,N){const P=D.fog,U=V.geometry,k=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,X=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,j=e.get(S.envMap||k,X),Z=j&&j.mapping===Us?j.image.height:null,te=d[S.type];S.precision!==null&&(h=n.getMaxPrecision(S.precision),h!==S.precision&&Be("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const F=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,re=F!==void 0?F.length:0;let ae=0;U.morphAttributes.position!==void 0&&(ae=1),U.morphAttributes.normal!==void 0&&(ae=2),U.morphAttributes.color!==void 0&&(ae=3);let we,Fe,ke,I;if(te){const mt=Sn[te];we=mt.vertexShader,Fe=mt.fragmentShader}else{we=S.vertexShader,Fe=S.fragmentShader;const mt=o.getVertexShaderStage(S),at=o.getFragmentShaderStage(S);o.update(S,mt,at),ke=mt.id,I=at.id}const Y=i.getRenderTarget(),se=i.state.buffers.depth.getReversed(),xe=V.isInstancedMesh===!0,ce=V.isBatchedMesh===!0,Te=!!S.map,Ge=!!S.matcap,Ne=!!j,Ze=!!S.aoMap,lt=!!S.lightMap,Ye=!!S.bumpMap&&S.wireframe===!1,ht=!!S.normalMap,yt=!!S.displacementMap,bt=!!S.emissiveMap,pt=!!S.metalnessMap,He=!!S.roughnessMap,O=S.anisotropy>0,ct=S.clearcoat>0,ze=S.dispersion>0,A=S.retroreflectivity>0,M=S.iridescence>0,G=S.sheen>0,W=S.transmission>0,Q=O&&!!S.anisotropyMap,le=ct&&!!S.clearcoatMap,ue=ct&&!!S.clearcoatNormalMap,ee=ct&&!!S.clearcoatRoughnessMap,ne=M&&!!S.iridescenceMap,he=M&&!!S.iridescenceThicknessMap,Pe=G&&!!S.sheenColorMap,me=G&&!!S.sheenRoughnessMap,fe=!!S.specularMap,De=!!S.specularColorMap,Oe=!!S.specularIntensityMap,Xe=W&&!!S.transmissionMap,z=W&&!!S.thicknessMap,de=!!S.gradientMap,ie=!!S.alphaMap,pe=S.alphaTest>0,Me=!!S.alphaHash,oe=!!S.extensions;let Ie=wn;S.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const Ce={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:we,fragmentShader:Fe,defines:S.defines,customVertexShaderID:ke,customFragmentShaderID:I,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:ce,batchingColor:ce&&V._colorsTexture!==null,instancing:xe,instancingColor:xe&&V.instanceColor!==null,instancingMorph:xe&&V.morphTexture!==null,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Te,matcap:Ge,envMap:Ne,envMapMode:Ne&&j.mapping,envMapCubeUVHeight:Z,aoMap:Ze,lightMap:lt,bumpMap:Ye,normalMap:ht,displacementMap:yt,emissiveMap:bt,normalMapObjectSpace:ht&&S.normalMapType===Sd,normalMapTangentSpace:ht&&S.normalMapType===ll,packedNormalMap:ht&&S.normalMapType===ll&&G_(S.normalMap.format),metalnessMap:pt,roughnessMap:He,anisotropy:O,anisotropyMap:Q,clearcoat:ct,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:ee,dispersion:ze,retroreflection:A,iridescence:M,iridescenceMap:ne,iridescenceThicknessMap:he,sheen:G,sheenColorMap:Pe,sheenRoughnessMap:me,specularMap:fe,specularColorMap:De,specularIntensityMap:Oe,transmission:W,transmissionMap:Xe,thicknessMap:z,gradientMap:de,opaque:S.transparent===!1&&S.blending===br&&S.alphaToCoverage===!1,alphaMap:ie,alphaTest:pe,alphaHash:Me,combine:S.combine,mapUv:Te&&g(S.map.channel),aoMapUv:Ze&&g(S.aoMap.channel),lightMapUv:lt&&g(S.lightMap.channel),bumpMapUv:Ye&&g(S.bumpMap.channel),normalMapUv:ht&&g(S.normalMap.channel),displacementMapUv:yt&&g(S.displacementMap.channel),emissiveMapUv:bt&&g(S.emissiveMap.channel),metalnessMapUv:pt&&g(S.metalnessMap.channel),roughnessMapUv:He&&g(S.roughnessMap.channel),anisotropyMapUv:Q&&g(S.anisotropyMap.channel),clearcoatMapUv:le&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(S.sheenRoughnessMap.channel),specularMapUv:fe&&g(S.specularMap.channel),specularColorMapUv:De&&g(S.specularColorMap.channel),specularIntensityMapUv:Oe&&g(S.specularIntensityMap.channel),transmissionMapUv:Xe&&g(S.transmissionMap.channel),thicknessMapUv:z&&g(S.thicknessMap.channel),alphaMapUv:ie&&g(S.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ht||O),vertexNormals:!!U.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!U.attributes.uv&&(Te||ie),fog:!!P,useFog:S.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||U.attributes.normal===void 0&&ht===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:se,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ae,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===ut,decodeVideoTextureEmissive:bt&&S.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(S.emissiveMap.colorSpace)===ut,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===On,flipSided:S.side===qt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(S){const R=[];if(S.shaderID?R.push(S.shaderID):(R.push(S.customVertexShaderID),R.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)R.push(L),R.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(p(R,S),v(R,S),R.push(i.outputColorSpace)),R.push(S.customProgramCacheKey),R.join()}function p(S,R){S.push(R.precision),S.push(R.outputColorSpace),S.push(R.envMapMode),S.push(R.envMapCubeUVHeight),S.push(R.mapUv),S.push(R.alphaMapUv),S.push(R.lightMapUv),S.push(R.aoMapUv),S.push(R.bumpMapUv),S.push(R.normalMapUv),S.push(R.displacementMapUv),S.push(R.emissiveMapUv),S.push(R.metalnessMapUv),S.push(R.roughnessMapUv),S.push(R.anisotropyMapUv),S.push(R.clearcoatMapUv),S.push(R.clearcoatNormalMapUv),S.push(R.clearcoatRoughnessMapUv),S.push(R.iridescenceMapUv),S.push(R.iridescenceThicknessMapUv),S.push(R.sheenColorMapUv),S.push(R.sheenRoughnessMapUv),S.push(R.specularMapUv),S.push(R.specularColorMapUv),S.push(R.specularIntensityMapUv),S.push(R.transmissionMapUv),S.push(R.thicknessMapUv),S.push(R.combine),S.push(R.fogExp2),S.push(R.sizeAttenuation),S.push(R.morphTargetsCount),S.push(R.morphAttributeCount),S.push(R.numSunLights),S.push(R.numDirLights),S.push(R.numPointLights),S.push(R.numSpotLights),S.push(R.numSpotLightMaps),S.push(R.numHemiLights),S.push(R.numRectAreaLights),S.push(R.numSunLightShadows),S.push(R.numDirLightShadows),S.push(R.numPointLightShadows),S.push(R.numSpotLightShadows),S.push(R.numSpotLightShadowsWithMaps),S.push(R.numLightProbes),S.push(R.shadowMapType),S.push(R.toneMapping),S.push(R.numClippingPlanes),S.push(R.numClipIntersection),S.push(R.depthPacking)}function v(S,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function E(S){const R=d[S.type];let L;if(R){const D=Sn[R];L=up.clone(D.uniforms)}else L=S.uniforms;return L}function y(S,R){let L=u.get(R);return L!==void 0?++L.usedTimes:(L=new O_(i,R,S,r),l.push(L),u.set(R,L)),L}function T(S){if(--S.usedTimes===0){const R=l.indexOf(S);l[R]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function w(S){o.remove(S)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:C}}function V_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function W_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ec(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function tc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,g,_,m,p){let v=i[e];return v===void 0?(v={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:p},i[e]=v):(v.id=h.id,v.object=h,v.geometry=d,v.material=g,v.materialVariant=a(h),v.groupOrder=_,v.renderOrder=h.renderOrder,v.z=m,v.group=p),e++,v}function c(h,d,g,_,m,p,v){v.reversedDepth===!0&&(m=-m);const E=o(h,d,g,_,m,p);g.transmission>0?n.push(E):g.transparent===!0?r.push(E):t.push(E)}function l(h,d,g,_,m,p){const v=o(h,d,g,_,m,p);g.transmission>0?n.unshift(v):g.transparent===!0?r.unshift(v):t.unshift(v)}function u(h,d){t.length>1&&t.sort(h||W_),n.length>1&&n.sort(d||ec),r.length>1&&r.sort(d||ec)}function f(){for(let h=e,d=i.length;h<d;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function X_(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new tc,i.set(n,[a])):r>=s.length?(a=new tc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Y_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new et};break;case"SpotLight":t={position:new H,direction:new H,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function q_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let K_=0;function Z_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $_(i){const e=new Y_,t=q_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);const r=new H,s=new St,a=new St;function o(l){let u=0,f=0,h=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,E=0,y=0,T=0,w=0,C=0,S=0,R=0,L=0;l.sort(Z_);for(let V=0,N=l.length;V<N;V++){const P=l[V],U=P.color,k=P.intensity,X=P.distance;let j=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ei?j=P.shadow.map.texture:j=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=U.r*k,f+=U.g*k,h+=U.b*k;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(P.sh.coefficients[Z],k);L++}else if(P.isSunLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,F=t.get(P);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[g]=F,n.sunShadowMap[g]=j;const re=te.getViewportCount();for(let ae=0;ae<re;ae++)n.sunShadowMatrix[_+ae]=te.getMatrix(ae),n.sunShadowCascade[_+ae]=te._cascadeData[ae];_+=re,g++}n.sun[d]=Z,d++}else if(P.isDirectionalLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,F=t.get(P);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,n.directionalShadow[m]=F,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=P.shadow.matrix,T++}n.directional[m]=Z,m++}else if(P.isSpotLight){const Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(U).multiplyScalar(k),Z.distance=X,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,n.spot[v]=Z;const te=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,te.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[v]=te.matrix,P.castShadow){const F=t.get(P);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,n.spotShadow[v]=F,n.spotShadowMap[v]=j,C++}v++}else if(P.isRectAreaLight){const Z=e.get(P);Z.color.copy(U).multiplyScalar(k),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),n.rectArea[E]=Z,E++}else if(P.isPointLight){const Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){const te=P.shadow,F=t.get(P);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,F.shadowCameraNear=te.camera.near,F.shadowCameraFar=te.camera.far,n.pointShadow[p]=F,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=P.shadow.matrix,w++}n.point[p]=Z,p++}else if(P.isHemisphereLight){const Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(k),Z.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[y]=Z,y++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const D=n.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==v||D.rectAreaLength!==E||D.hemiLength!==y||D.numSunShadows!==g||D.numDirectionalShadows!==T||D.numPointShadows!==w||D.numSpotShadows!==C||D.numSpotMaps!==S||D.numLightProbes!==L)&&(n.sun.length=d,n.directional.length=m,n.spot.length=v,n.rectArea.length=E,n.point.length=p,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+S-R,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,D.sunLength=d,D.directionalLength=m,D.pointLength=p,D.spotLength=v,D.rectAreaLength=E,D.hemiLength=y,D.numSunShadows=g,D.numDirectionalShadows=T,D.numPointShadows=w,D.numSpotShadows=C,D.numSpotMaps=S,D.numLightProbes=L,n.version=K_++)}function c(l,u){let f=0,h=0,d=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){const y=l[v];if(y.isSunLight){const T=n.sun[f];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),f++}else if(y.isDirectionalLight){const T=n.directional[h];T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),h++}else if(y.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),g++}else if(y.isRectAreaLight){const T=n.rectArea[_];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){const T=n.hemi[m];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function nc(i){const e=new $_(i),t=[],n=[],r=[];function s(h){f.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function J_(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new nc(i),e.set(r,[o])):s>=a.length?(o=new nc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j_=`uniform sampler2D shadow_pass;
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
}`,ex=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],tx=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],ic=new St,gr=new H,ya=new H;function nx(i,e,t){let n=new As;const r=new We,s=new We,a=new rt,o=new pp,c=new mp,l={},u=t.maxTextureSize,f={[yi]:qt,[qt]:yi,[On]:On},h=new Pt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Q_,fragmentShader:j_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Zt;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ft(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fs;let p=this.type;this.render=function(w,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Qf&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fs);const R=i.getRenderTarget(),L=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(kn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const N=p!==this.type;N&&C.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(U=>U.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,U=w.length;P<U;P++){const k=w[P],X=k.shadow;if(X===void 0){Be("WebGLShadowMap:",k,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const j=X.getFrameExtents();r.multiply(j),s.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,X.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,X.mapSize.y=s.y));const Z=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Z,X.map===null||N===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===vr){if(k.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new an(r.x,r.y,{format:Ei,type:Cn,minFilter:Tt,magFilter:Tt,generateMipmaps:!1}),X.map.texture.name=k.name+".shadowMap",X.map.depthTexture=new Rr(r.x,r.y,yn),X.map.depthTexture.name=k.name+".shadowMapDepth",X.map.depthTexture.format=Hn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Lt,X.map.depthTexture.magFilter=Lt}else k.isPointLight?(X.map=new iu(r.x),X.map.depthTexture=new lp(r.x,Rn)):(X.map=new an(r.x,r.y),X.map.depthTexture=new Rr(r.x,r.y,Rn)),X.map.depthTexture.name=k.name+".shadowMap",X.map.depthTexture.format=Hn,this.type===fs?(X.map.depthTexture.compareFunction=Z?Po:Lo,X.map.depthTexture.minFilter=Tt,X.map.depthTexture.magFilter=Tt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Lt,X.map.depthTexture.magFilter=Lt);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==r.x||X.map.height!==r.y)&&X.map.setSize(r.x,r.y);const te=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();k.isPointLight!==!0&&X.updateMatrices(k,S);for(let F=0;F<te;F++){const re=X.getCamera(F);if(k.isPointLight){const ae=X.camera,we=X.matrix,Fe=k.distance||ae.far;Fe!==ae.far&&(ae.far=Fe,ae.updateProjectionMatrix()),gr.setFromMatrixPosition(k.matrixWorld),ae.position.copy(gr),ya.copy(ae.position),ya.add(ex[F]),ae.up.copy(tx[F]),ae.lookAt(ya),ae.updateMatrixWorld(),we.makeTranslation(-gr.x,-gr.y,-gr.z),ic.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),X._frustum.setFromProjectionMatrix(ic,ae.coordinateSystem,ae.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,F),i.clear();else{F===0&&(i.setRenderTarget(X.map),i.clear());const ae=X.getViewport(F);a.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),V.viewport(a)}n=X.getFrustum(F),y(C,S,re,k,this.type)}X.isPointLightShadow!==!0&&this.type===vr&&v(X,S),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(R,L,D)};function v(w,C){const S=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new an(r.x,r.y,{format:Ei,type:Cn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,S,h,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,S,d,_,null)}function E(w,C,S,R){let L=null;const D=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)L=D;else if(L=S.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const V=L.uuid,N=C.uuid;let P=l[V];P===void 0&&(P={},l[V]=P);let U=P[N];U===void 0&&(U=L.clone(),P[N]=U,C.addEventListener("dispose",T)),L=U}if(L.visible=C.visible,L.wireframe=C.wireframe,R===vr?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:f[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,S.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const V=i.properties.get(L);V.light=S}return L}function y(w,C,S,R,L){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===vr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const N=e.update(w),P=w.material;if(Array.isArray(P)){const U=N.groups;for(let k=0,X=U.length;k<X;k++){const j=U[k],Z=P[j.materialIndex];if(Z&&Z.visible){const te=E(w,Z,R,L);w.onBeforeShadow(i,w,C,S,N,te,j),i.renderBufferDirect(S,null,N,te,w,j),w.onAfterShadow(i,w,C,S,N,te,j)}}}else if(P.visible){const U=E(w,P,R,L);w.onBeforeShadow(i,w,C,S,N,U,null),i.renderBufferDirect(S,null,N,U,w,null),w.onAfterShadow(i,w,C,S,N,U,null)}}const V=w.children;for(let N=0,P=V.length;N<P;N++)y(V[N],C,S,R,L)}function T(w){w.target.removeEventListener("dispose",T);for(const S in l){const R=l[S],L=w.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function ix(i,e){function t(){let z=!1;const de=new rt;let ie=null;const pe=new rt(0,0,0,0);return{setMask:function(Me){ie!==Me&&!z&&(i.colorMask(Me,Me,Me,Me),ie=Me)},setLocked:function(Me){z=Me},setClear:function(Me,oe,Ie,Ce,mt){mt===!0&&(Me*=Ce,oe*=Ce,Ie*=Ce),de.set(Me,oe,Ie,Ce),pe.equals(de)===!1&&(i.clearColor(Me,oe,Ie,Ce),pe.copy(de))},reset:function(){z=!1,ie=null,pe.set(-1,0,0,0)}}}function n(){let z=!1,de=!1,ie=null,pe=null,Me=null;return{setReversed:function(oe){if(de!==oe){const Ie=e.get("EXT_clip_control");oe?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),de=oe;const Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(oe){oe?Y(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(oe){ie!==oe&&!z&&(i.depthMask(oe),ie=oe)},setFunc:function(oe){if(de&&(oe=Id[oe]),pe!==oe){switch(oe){case Ta:i.depthFunc(i.NEVER);break;case Aa:i.depthFunc(i.ALWAYS);break;case Ra:i.depthFunc(i.LESS);break;case Er:i.depthFunc(i.LEQUAL);break;case Ca:i.depthFunc(i.EQUAL);break;case La:i.depthFunc(i.GEQUAL);break;case Pa:i.depthFunc(i.GREATER);break;case Da:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=oe}},setLocked:function(oe){z=oe},setClear:function(oe){Me!==oe&&(Me=oe,de&&(oe=1-oe),i.clearDepth(oe))},reset:function(){z=!1,ie=null,pe=null,Me=null,de=!1}}}function r(){let z=!1,de=null,ie=null,pe=null,Me=null,oe=null,Ie=null,Ce=null,mt=null;return{setTest:function(at){z||(at?Y(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(at){de!==at&&!z&&(i.stencilMask(at),de=at)},setFunc:function(at,cn,gn){(ie!==at||pe!==cn||Me!==gn)&&(i.stencilFunc(at,cn,gn),ie=at,pe=cn,Me=gn)},setOp:function(at,cn,gn){(oe!==at||Ie!==cn||Ce!==gn)&&(i.stencilOp(at,cn,gn),oe=at,Ie=cn,Ce=gn)},setLocked:function(at){z=at},setClear:function(at){mt!==at&&(i.clearStencil(at),mt=at)},reset:function(){z=!1,de=null,ie=null,pe=null,Me=null,oe=null,Ie=null,Ce=null,mt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,v=null,E=null,y=null,T=null,w=null,C=null,S=new et(0,0,0),R=0,L=!1,D=null,V=null,N=null,P=null,U=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=j>=1):Z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=j>=2);let te=null,F={};const re=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),we=new rt().fromArray(re),Fe=new rt().fromArray(ae);function ke(z,de,ie,pe){const Me=new Uint8Array(4),oe=i.createTexture();i.bindTexture(z,oe),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<ie;Ie++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(de+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return oe}const I={};I[i.TEXTURE_2D]=ke(i.TEXTURE_2D,i.TEXTURE_2D,1),I[i.TEXTURE_CUBE_MAP]=ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[i.TEXTURE_2D_ARRAY]=ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),I[i.TEXTURE_3D]=ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(i.DEPTH_TEST),a.setFunc(Er),Ye(!1),ht(rl),Y(i.CULL_FACE),Ze(kn);function Y(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function se(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function xe(z,de){return h[z]!==de?(i.bindFramebuffer(z,de),h[z]=de,z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=de),z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=de),!0):!1}function ce(z,de){let ie=g,pe=!1;if(z){ie=d.get(de),ie===void 0&&(ie=[],d.set(de,ie));const Me=z.textures;if(ie.length!==Me.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ie=Me.length;oe<Ie;oe++)ie[oe]=i.COLOR_ATTACHMENT0+oe;ie.length=Me.length,pe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ie)}function Te(z){return _!==z?(i.useProgram(z),_=z,!0):!1}const Ge={[Wi]:i.FUNC_ADD,[ed]:i.FUNC_SUBTRACT,[td]:i.FUNC_REVERSE_SUBTRACT};Ge[nd]=i.MIN,Ge[id]=i.MAX;const Ne={[rd]:i.ZERO,[sd]:i.ONE,[ad]:i.SRC_COLOR,[yc]:i.SRC_ALPHA,[fd]:i.SRC_ALPHA_SATURATE,[ud]:i.DST_COLOR,[ld]:i.DST_ALPHA,[od]:i.ONE_MINUS_SRC_COLOR,[bc]:i.ONE_MINUS_SRC_ALPHA,[hd]:i.ONE_MINUS_DST_COLOR,[cd]:i.ONE_MINUS_DST_ALPHA,[dd]:i.CONSTANT_COLOR,[pd]:i.ONE_MINUS_CONSTANT_COLOR,[md]:i.CONSTANT_ALPHA,[gd]:i.ONE_MINUS_CONSTANT_ALPHA};function Ze(z,de,ie,pe,Me,oe,Ie,Ce,mt,at){if(z===kn){m===!0&&(se(i.BLEND),m=!1);return}if(m===!1&&(Y(i.BLEND),m=!0),z!==jf){if(z!==p||at!==L){if((v!==Wi||T!==Wi)&&(i.blendEquation(i.FUNC_ADD),v=Wi,T=Wi),at)switch(z){case br:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sl:i.blendFunc(i.ONE,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ol:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:nt("WebGLState: Invalid blending: ",z);break}else switch(z){case br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case al:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ol:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",z);break}E=null,y=null,w=null,C=null,S.set(0,0,0),R=0,p=z,L=at}return}Me=Me||de,oe=oe||ie,Ie=Ie||pe,(de!==v||Me!==T)&&(i.blendEquationSeparate(Ge[de],Ge[Me]),v=de,T=Me),(ie!==E||pe!==y||oe!==w||Ie!==C)&&(i.blendFuncSeparate(Ne[ie],Ne[pe],Ne[oe],Ne[Ie]),E=ie,y=pe,w=oe,C=Ie),(Ce.equals(S)===!1||mt!==R)&&(i.blendColor(Ce.r,Ce.g,Ce.b,mt),S.copy(Ce),R=mt),p=z,L=!1}function lt(z,de){z.side===On?se(i.CULL_FACE):Y(i.CULL_FACE);let ie=z.side===qt;de&&(ie=!ie),Ye(ie),z.blending===br&&z.transparent===!1?Ze(kn):Ze(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),s.setMask(z.colorWrite);const pe=z.stencilWrite;o.setTest(pe),pe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),bt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?Y(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(z){D!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),D=z)}function ht(z){z!==$f?(Y(i.CULL_FACE),z!==V&&(z===rl?i.cullFace(i.BACK):z===Jf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),V=z}function yt(z){z!==N&&(X&&i.lineWidth(z),N=z)}function bt(z,de,ie){z?(Y(i.POLYGON_OFFSET_FILL),(P!==de||U!==ie)&&(P=de,U=ie,a.getReversed()&&(de=-de),i.polygonOffset(de,ie))):se(i.POLYGON_OFFSET_FILL)}function pt(z){z?Y(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function He(z){z===void 0&&(z=i.TEXTURE0+k-1),te!==z&&(i.activeTexture(z),te=z)}function O(z,de,ie){ie===void 0&&(te===null?ie=i.TEXTURE0+k-1:ie=te);let pe=F[ie];pe===void 0&&(pe={type:void 0,texture:void 0},F[ie]=pe),(pe.type!==z||pe.texture!==de)&&(te!==ie&&(i.activeTexture(ie),te=ie),i.bindTexture(z,de||I[z]),pe.type=z,pe.texture=de)}function ct(){const z=F[te];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ze(){try{i.compressedTexImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function M(){try{i.texSubImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function G(){try{i.texSubImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function le(){try{i.texStorage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function ue(){try{i.texStorage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function ee(){try{i.texImage2D(...arguments)}catch(z){nt("WebGLState:",z)}}function ne(){try{i.texImage3D(...arguments)}catch(z){nt("WebGLState:",z)}}function he(z){return f[z]!==void 0?f[z]:i.getParameter(z)}function Pe(z,de){f[z]!==de&&(i.pixelStorei(z,de),f[z]=de)}function me(z){we.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),we.copy(z))}function fe(z){Fe.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),Fe.copy(z))}function De(z,de){let ie=l.get(de);ie===void 0&&(ie=new WeakMap,l.set(de,ie));let pe=ie.get(z);pe===void 0&&(pe=i.getUniformBlockIndex(de,z.name),ie.set(z,pe))}function Oe(z,de){const pe=l.get(de).get(z);c.get(de)!==pe&&(i.uniformBlockBinding(de,pe,z.__bindingPointIndex),c.set(de,pe))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},te=null,F={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,v=null,E=null,y=null,T=null,w=null,C=null,S=new et(0,0,0),R=0,L=!1,D=null,V=null,N=null,P=null,U=null,we.set(0,0,i.canvas.width,i.canvas.height),Fe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:se,bindFramebuffer:xe,drawBuffers:ce,useProgram:Te,setBlending:Ze,setMaterial:lt,setFlipSided:Ye,setCullFace:ht,setLineWidth:yt,setPolygonOffset:bt,setScissorTest:pt,activeTexture:He,bindTexture:O,unbindTexture:ct,compressedTexImage2D:ze,compressedTexImage3D:A,texImage2D:ee,texImage3D:ne,pixelStorei:Pe,getParameter:he,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:le,texStorage3D:ue,texSubImage2D:M,texSubImage3D:G,compressedTexSubImage2D:W,compressedTexSubImage3D:Q,scissor:me,viewport:fe,reset:Xe}}function rx(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,M){return g?new OffscreenCanvas(A,M):Ts("canvas")}function m(A,M,G){let W=1;const Q=ze(A);if((Q.width>G||Q.height>G)&&(W=G/Math.max(Q.width,Q.height)),W<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const le=Math.floor(W*Q.width),ue=Math.floor(W*Q.height);h===void 0&&(h=_(le,ue));const ee=M?_(le,ue):h;return ee.width=le,ee.height=ue,ee.getContext("2d").drawImage(A,0,0,le,ue),Be("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+ue+")."),ee}else return"data"in A&&Be("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function p(A){return A.generateMipmaps}function v(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,M,G,W,Q,le=!1){if(A!==null){if(i[A]!==void 0)return i[A];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;W&&(ue=e.get("EXT_texture_norm16"),ue||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=M;if(M===i.RED&&(G===i.FLOAT&&(ee=i.R32F),G===i.HALF_FLOAT&&(ee=i.R16F),G===i.UNSIGNED_BYTE&&(ee=i.R8),G===i.UNSIGNED_SHORT&&ue&&(ee=ue.R16_EXT),G===i.SHORT&&ue&&(ee=ue.R16_SNORM_EXT)),M===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.R8UI),G===i.UNSIGNED_SHORT&&(ee=i.R16UI),G===i.UNSIGNED_INT&&(ee=i.R32UI),G===i.BYTE&&(ee=i.R8I),G===i.SHORT&&(ee=i.R16I),G===i.INT&&(ee=i.R32I)),M===i.RG&&(G===i.FLOAT&&(ee=i.RG32F),G===i.HALF_FLOAT&&(ee=i.RG16F),G===i.UNSIGNED_BYTE&&(ee=i.RG8),G===i.UNSIGNED_SHORT&&ue&&(ee=ue.RG16_EXT),G===i.SHORT&&ue&&(ee=ue.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RG8UI),G===i.UNSIGNED_SHORT&&(ee=i.RG16UI),G===i.UNSIGNED_INT&&(ee=i.RG32UI),G===i.BYTE&&(ee=i.RG8I),G===i.SHORT&&(ee=i.RG16I),G===i.INT&&(ee=i.RG32I)),M===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),G===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),G===i.UNSIGNED_INT&&(ee=i.RGB32UI),G===i.BYTE&&(ee=i.RGB8I),G===i.SHORT&&(ee=i.RGB16I),G===i.INT&&(ee=i.RGB32I)),M===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),G===i.UNSIGNED_INT&&(ee=i.RGBA32UI),G===i.BYTE&&(ee=i.RGBA8I),G===i.SHORT&&(ee=i.RGBA16I),G===i.INT&&(ee=i.RGBA32I)),M===i.RGB&&(G===i.UNSIGNED_SHORT&&ue&&(ee=ue.RGB16_EXT),G===i.SHORT&&ue&&(ee=ue.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),M===i.RGBA){const ne=le?Es:Qe.getTransfer(Q);G===i.FLOAT&&(ee=i.RGBA32F),G===i.HALF_FLOAT&&(ee=i.RGBA16F),G===i.UNSIGNED_BYTE&&(ee=ne===ut?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ue&&(ee=ue.RGBA16_EXT),G===i.SHORT&&ue&&(ee=ue.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function T(A,M){let G;return A?M===null||M===Rn||M===Tr?G=i.DEPTH24_STENCIL8:M===yn?G=i.DEPTH32F_STENCIL8:M===wr&&(G=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Rn||M===Tr?G=i.DEPTH_COMPONENT24:M===yn?G=i.DEPTH_COMPONENT32F:M===wr&&(G=i.DEPTH_COMPONENT16),G}function w(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==Tt?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){const M=A.target;M.removeEventListener("dispose",C),R(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&f.delete(M)}function S(A){const M=A.target;M.removeEventListener("dispose",S),D(M)}function R(A){const M=n.get(A);if(M.__webglInit===void 0)return;const G=A.source,W=d.get(G);if(W){const Q=W[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(A),Object.keys(W).length===0&&d.delete(G)}n.remove(A)}function L(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const G=A.source,W=d.get(G);delete W[M.__cacheKey],a.memory.textures--}function D(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(M.__webglFramebuffer[W]))for(let Q=0;Q<M.__webglFramebuffer[W].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[W][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[W]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[W])}else{if(Array.isArray(M.__webglFramebuffer))for(let W=0;W<M.__webglFramebuffer.length;W++)i.deleteFramebuffer(M.__webglFramebuffer[W]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let W=0;W<M.__webglColorRenderbuffer.length;W++)M.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[W]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=A.textures;for(let W=0,Q=G.length;W<Q;W++){const le=n.get(G[W]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(G[W])}n.remove(A)}let V=0;function N(){V=0}function P(){return V}function U(A){V=A}function k(){const A=V;return A>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),V+=1,A}function X(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function j(A,M){const G=n.get(A);if(A.isVideoTexture&&O(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&G.__version!==A.version){const W=A.image;if(W===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{se(G,A,M);return}}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+M)}function Z(A,M){const G=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){se(G,A,M);return}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+M)}function te(A,M){const G=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){se(G,A,M);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+M)}function F(A,M){const G=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&G.__version!==A.version){xe(G,A,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+M)}const re={[Ia]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Na]:i.MIRRORED_REPEAT},ae={[Lt]:i.NEAREST,[vd]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[Tt]:i.LINEAR,[Ys]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},we={[bd]:i.NEVER,[Rd]:i.ALWAYS,[Ed]:i.LESS,[Lo]:i.LEQUAL,[wd]:i.EQUAL,[Po]:i.GEQUAL,[Td]:i.GREATER,[Ad]:i.NOTEQUAL};function Fe(A,M){if(M.type===yn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Tt||M.magFilter===Ys||M.magFilter===Ur||M.magFilter===mi||M.minFilter===Tt||M.minFilter===Ys||M.minFilter===Ur||M.minFilter===mi)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,re[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,re[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,re[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ae[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ae[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,we[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Lt||M.minFilter!==Ur&&M.minFilter!==mi||M.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ke(A,M){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",C));const W=M.source;let Q=d.get(W);Q===void 0&&(Q={},d.set(W,Q));const le=X(M);if(le!==A.__cacheKey){Q[le]===void 0&&(Q[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Q[le].usedTimes++;const ue=Q[A.__cacheKey];ue!==void 0&&(Q[A.__cacheKey].usedTimes--,ue.usedTimes===0&&L(M)),A.__cacheKey=le,A.__webglTexture=Q[le].texture}return G}function I(A,M,G){return Math.floor(Math.floor(A/G)/M)}function Y(A,M,G,W){const le=A.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,G,W,M.data);else{le.sort((Pe,me)=>Pe.start-me.start);let ue=0;for(let Pe=1;Pe<le.length;Pe++){const me=le[ue],fe=le[Pe],De=me.start+me.count,Oe=I(fe.start,M.width,4),Xe=I(me.start,M.width,4);fe.start<=De+1&&Oe===Xe&&I(fe.start+fe.count-1,M.width,4)===Oe?me.count=Math.max(me.count,fe.start+fe.count-me.start):(++ue,le[ue]=fe)}le.length=ue+1;const ee=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let Pe=0,me=le.length;Pe<me;Pe++){const fe=le[Pe],De=Math.floor(fe.start/4),Oe=Math.ceil(fe.count/4),Xe=De%M.width,z=Math.floor(De/M.width),de=Oe,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,z),t.texSubImage2D(i.TEXTURE_2D,0,Xe,z,de,ie,G,W,M.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function se(A,M,G){let W=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(W=i.TEXTURE_3D);const Q=ke(A,M),le=M.source;t.bindTexture(W,A.__webglTexture,i.TEXTURE0+G);const ue=n.get(le);if(le.version!==ue.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const ie=Qe.getPrimaries(Qe.workingColorSpace),pe=M.colorSpace===dn?null:Qe.getPrimaries(M.colorSpace),Me=M.colorSpace===dn||ie===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let ne=m(M.image,!1,r.maxTextureSize);ne=ct(M,ne);const he=s.convert(M.format,M.colorSpace),Pe=s.convert(M.type);let me=y(M.internalFormat,he,Pe,M.normalized,M.colorSpace,M.isVideoTexture);Fe(W,M);let fe;const De=M.mipmaps,Oe=M.isVideoTexture!==!0,Xe=ue.__version===void 0||Q===!0,z=le.dataReady,de=w(M,ne);if(M.isDepthTexture)me=T(M.format===gi,M.type),Xe&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,me,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,me,ne.width,ne.height,0,he,Pe,null));else if(M.isDataTexture)if(De.length>0){Oe&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,he,Pe,fe.data);M.generateMipmaps=!1}else Oe?(Xe&&t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height),z&&Y(M,ne,he,Pe)):t.texImage2D(i.TEXTURE_2D,0,me,ne.width,ne.height,0,he,Pe,ne.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Oe&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,De[0].width,De[0].height,ne.depth);for(let ie=0,pe=De.length;ie<pe;ie++)if(fe=De[ie],M.format!==rn)if(he!==null)if(Oe){if(z)if(M.layerUpdates.size>0){const Me=Ul(fe.width,fe.height,M.format,M.type);for(const oe of M.layerUpdates){const Ie=fe.data.subarray(oe*Me/fe.data.BYTES_PER_ELEMENT,(oe+1)*Me/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,oe,fe.width,fe.height,1,he,Ie)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,he,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,me,fe.width,fe.height,ne.depth,0,fe.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,he,Pe,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,me,fe.width,fe.height,ne.depth,0,he,Pe,fe.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Oe&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],M.format!==rn?he!==null?Oe?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,fe.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,he,Pe,fe.data)}else if(M.isDataArrayTexture)if(Oe){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,ne.width,ne.height,ne.depth),z)if(M.layerUpdates.size>0){const ie=Ul(ne.width,ne.height,M.format,M.type);for(const pe of M.layerUpdates){const Me=ne.data.subarray(pe*ie/ne.data.BYTES_PER_ELEMENT,(pe+1)*ie/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,ne.width,ne.height,1,he,Pe,Me)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(M.isData3DTexture)Oe?(Xe&&t.texStorage3D(i.TEXTURE_3D,de,me,ne.width,ne.height,ne.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)):t.texImage3D(i.TEXTURE_3D,0,me,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(M.isFramebufferTexture){if(Xe)if(Oe)t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height);else{let ie=ne.width,pe=ne.height;for(let Me=0;Me<de;Me++)t.texImage2D(i.TEXTURE_2D,Me,me,ie,pe,0,he,Pe,null),ie>>=1,pe>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),ne.parentNode!==ie){ie.appendChild(ne),f.add(M),ie.onpaint=pe=>{const Me=pe.changedElements;for(const oe of f)Me.includes(oe.image)&&(oe.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const Me=i.RGBA,oe=i.RGBA,Ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,oe,Ie,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Oe&&Xe){const ie=ze(De[0]);t.texStorage2D(i.TEXTURE_2D,de,me,ie.width,ie.height)}for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,he,Pe,fe):t.texImage2D(i.TEXTURE_2D,ie,me,he,Pe,fe);M.generateMipmaps=!1}else if(Oe){if(Xe){const ie=ze(ne);t.texStorage2D(i.TEXTURE_2D,de,me,ie.width,ie.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Pe,ne)}else t.texImage2D(i.TEXTURE_2D,0,me,he,Pe,ne);p(M)&&v(W),ue.__version=le.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function xe(A,M,G){if(M.image.length!==6)return;const W=ke(A,M),Q=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+G);const le=n.get(Q);if(Q.version!==le.__version||W===!0){t.activeTexture(i.TEXTURE0+G);const ue=Qe.getPrimaries(Qe.workingColorSpace),ee=M.colorSpace===dn?null:Qe.getPrimaries(M.colorSpace),ne=M.colorSpace===dn||ue===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const he=M.isCompressedTexture||M.image[0].isCompressedTexture,Pe=M.image[0]&&M.image[0].isDataTexture,me=[];for(let oe=0;oe<6;oe++)!he&&!Pe?me[oe]=m(M.image[oe],!0,r.maxCubemapSize):me[oe]=Pe?M.image[oe].image:M.image[oe],me[oe]=ct(M,me[oe]);const fe=me[0],De=s.convert(M.format,M.colorSpace),Oe=s.convert(M.type),Xe=y(M.internalFormat,De,Oe,M.normalized,M.colorSpace),z=M.isVideoTexture!==!0,de=le.__version===void 0||W===!0,ie=Q.dataReady;let pe=w(M,fe);Fe(i.TEXTURE_CUBE_MAP,M);let Me;if(he){z&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Xe,fe.width,fe.height);for(let oe=0;oe<6;oe++){Me=me[oe].mipmaps;for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];M.format!==rn?De!==null?z?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie,0,0,Ce.width,Ce.height,De,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie,Xe,Ce.width,Ce.height,0,Ce.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie,0,0,Ce.width,Ce.height,De,Oe,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie,Xe,Ce.width,Ce.height,0,De,Oe,Ce.data)}}}else{if(Me=M.mipmaps,z&&de){Me.length>0&&pe++;const oe=ze(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Xe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Pe){z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,me[oe].width,me[oe].height,De,Oe,me[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,me[oe].width,me[oe].height,0,De,Oe,me[oe].data);for(let Ie=0;Ie<Me.length;Ie++){const mt=Me[Ie].image[oe].image;z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie+1,0,0,mt.width,mt.height,De,Oe,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie+1,Xe,mt.width,mt.height,0,De,Oe,mt.data)}}else{z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,De,Oe,me[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,De,Oe,me[oe]);for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie+1,0,0,De,Oe,Ce.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ie+1,Xe,De,Oe,Ce.image[oe])}}}p(M)&&v(i.TEXTURE_CUBE_MAP),le.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ce(A,M,G,W,Q,le){const ue=s.convert(G.format,G.colorSpace),ee=s.convert(G.type),ne=y(G.internalFormat,ue,ee,G.normalized,G.colorSpace),he=n.get(M),Pe=n.get(G);if(Pe.__renderTarget=M,!he.__hasExternalTextures){const me=Math.max(1,M.width>>le),fe=Math.max(1,M.height>>le);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,le,ne,me,fe,M.depth,0,ue,ee,null):t.texImage2D(Q,le,ne,me,fe,0,ue,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),He(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Q,Pe.__webglTexture,0,pt(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Q,Pe.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(A,M,G){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const W=M.depthTexture,Q=W&&W.isDepthTexture?W.type:null,le=T(M.stencilBuffer,Q),ue=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;He(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(M),le,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(M),le,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,le,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,A)}else{const W=M.textures;for(let Q=0;Q<W.length;Q++){const le=W[Q],ue=s.convert(le.format,le.colorSpace),ee=s.convert(le.type),ne=y(le.internalFormat,ue,ee,le.normalized,le.colorSpace);He(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(M),ne,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(M),ne,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ne,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ge(A,M,G){const W=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(M.depthTexture);if(Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,M.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,M.depthTexture);const he=s.convert(M.depthTexture.format),Pe=s.convert(M.depthTexture.type);let me;M.depthTexture.format===Hn?me=i.DEPTH_COMPONENT24:M.depthTexture.format===gi&&(me=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,me,M.width,M.height,0,he,Pe,null)}}else j(M.depthTexture,0);const le=Q.__webglTexture,ue=pt(M),ee=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ne=M.depthTexture.format===gi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===Hn)He(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ee,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,ee,le,0);else if(M.depthTexture.format===gi)He(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ee,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,ee,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(A){const M=n.get(A),G=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const W=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),W){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,W.removeEventListener("dispose",Q)};W.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=W}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(G)for(let W=0;W<6;W++)Ge(M.__webglFramebuffer[W],A,W);else{const W=A.texture.mipmaps;W&&W.length>0?Ge(M.__webglFramebuffer[0],A,0):Ge(M.__webglFramebuffer,A,0)}else if(G){M.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[W]),M.__webglDepthbuffer[W]===void 0)M.__webglDepthbuffer[W]=i.createRenderbuffer(),Te(M.__webglDepthbuffer[W],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=M.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}else{const W=A.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Te(M.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ze(A,M,G){const W=n.get(A);M!==void 0&&ce(W.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ne(A)}function lt(A){const M=A.texture,G=n.get(A),W=n.get(M);A.addEventListener("dispose",S);const Q=A.textures,le=A.isWebGLCubeRenderTarget===!0,ue=Q.length>1;if(ue||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=M.version,a.memory.textures++),le){G.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[ee]=[];for(let ne=0;ne<M.mipmaps.length;ne++)G.__webglFramebuffer[ee][ne]=i.createFramebuffer()}else G.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let ee=0;ee<M.mipmaps.length;ee++)G.__webglFramebuffer[ee]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ue)for(let ee=0,ne=Q.length;ee<ne;ee++){const he=n.get(Q[ee]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&He(A)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ee=0;ee<Q.length;ee++){const ne=Q[ee];G.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ee]);const he=s.convert(ne.format,ne.colorSpace),Pe=s.convert(ne.type),me=y(ne.internalFormat,he,Pe,ne.normalized,ne.colorSpace,A.isXRRenderTarget===!0),fe=pt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,me,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,G.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Te(G.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,M);for(let ee=0;ee<6;ee++)if(M.mipmaps&&M.mipmaps.length>0)for(let ne=0;ne<M.mipmaps.length;ne++)ce(G.__webglFramebuffer[ee][ne],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ne);else ce(G.__webglFramebuffer[ee],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);p(M)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let ee=0,ne=Q.length;ee<ne;ee++){const he=Q[ee],Pe=n.get(he);let me=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Pe.__webglTexture),Fe(me,he),ce(G.__webglFramebuffer,A,he,i.COLOR_ATTACHMENT0+ee,me,0),p(he)&&v(me)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,W.__webglTexture),Fe(ee,M),M.mipmaps&&M.mipmaps.length>0)for(let ne=0;ne<M.mipmaps.length;ne++)ce(G.__webglFramebuffer[ne],A,M,i.COLOR_ATTACHMENT0,ee,ne);else ce(G.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,ee,0);p(M)&&v(ee),t.unbindTexture()}A.depthBuffer&&Ne(A)}function Ye(A){const M=A.textures;for(let G=0,W=M.length;G<W;G++){const Q=M[G];if(p(Q)){const le=E(A),ue=n.get(Q).__webglTexture;t.bindTexture(le,ue),v(le),t.unbindTexture()}}}const ht=[],yt=[];function bt(A){if(A.samples>0){if(He(A)===!1){const M=A.textures,G=A.width,W=A.height;let Q=i.COLOR_BUFFER_BIT;const le=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(A),ee=M.length>1;if(ee)for(let he=0;he<M.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ne=A.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let he=0;he<M.length;he++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Pe=n.get(M[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,G,W,0,0,G,W,Q,i.NEAREST),c===!0&&(ht.length=0,yt.length=0,ht.push(i.COLOR_ATTACHMENT0+he),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ht.push(le),yt.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let he=0;he<M.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Pe=n.get(M[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function pt(A){return Math.min(r.maxSamples,A.samples)}function He(A){const M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function O(A){const M=a.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ct(A,M){const G=A.colorSpace,W=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==Ar&&G!==dn&&(Qe.getTransfer(G)===ut?(W!==rn||Q!==jt)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",G)),M}function ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.getTextureUnits=P,this.setTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=Z,this.setTexture3D=te,this.setTextureCube=F,this.rebindTextures=Ze,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=He,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sx(i,e){function t(n,r=dn){let s;const a=Qe.getTransfer(r);if(n===jt)return i.UNSIGNED_BYTE;if(n===wo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===To)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ic)return i.BYTE;if(n===Nc)return i.SHORT;if(n===wr)return i.UNSIGNED_SHORT;if(n===Eo)return i.INT;if(n===Rn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===Oc)return i.ALPHA;if(n===Bc)return i.RGB;if(n===rn)return i.RGBA;if(n===Hn)return i.DEPTH_COMPONENT;if(n===gi)return i.DEPTH_STENCIL;if(n===zc)return i.RED;if(n===Ao)return i.RED_INTEGER;if(n===Ei)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Co)return i.RGBA_INTEGER;if(n===ds||n===ps||n===ms||n===gs)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ps)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ua||n===Fa||n===Oa||n===Ba)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ua)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ba)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===ka||n===Ga||n===Ha||n===Va||n===ys||n===Wa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===za||n===ka)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ga)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return s.COMPRESSED_R11_EAC;if(n===Va)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ys)return s.COMPRESSED_RG11_EAC;if(n===Wa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Xa||n===Ya||n===qa||n===Ka||n===Za||n===$a||n===Ja||n===Qa||n===ja||n===eo||n===to||n===no||n===io||n===ro)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Xa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ka)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$a)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ja)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===eo)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===to)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===no)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===io)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ro)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===so||n===ao||n===oo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===so)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ao)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lo||n===co||n===bs||n===uo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===lo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===co)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const ax=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ox=`
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

}`;class lx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new $c(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pt({vertexShader:ax,fragmentShader:ox,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new on(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cx extends Ti{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new lx,p={},v=t.getContextAttributes();let E=null,y=null;const T=[],w=[],C=new We;let S=null,R=null;const L=new Qt;L.viewport=new rt;const D=new Qt;D.viewport=new rt;const V=[L,D],N=new _p;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let Y=T[I];return Y===void 0&&(Y=new ta,T[I]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(I){let Y=T[I];return Y===void 0&&(Y=new ta,T[I]=Y),Y.getGripSpace()},this.getHand=function(I){let Y=T[I];return Y===void 0&&(Y=new ta,T[I]=Y),Y.getHandSpace()};function k(I){const Y=w.indexOf(I.inputSource);if(Y===-1)return;const se=T[Y];se!==void 0&&(se.update(I.inputSource,I.frame,l||a),se.dispatchEvent({type:I.type,data:I.inputSource}))}function X(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let I=0;I<T.length;I++){const Y=w[I];Y!==null&&(w[I]=null,T[I].disconnect(Y))}P=null,U=null,m.reset();for(const I in p)delete p[I];if(e.setRenderTarget(E),d=null,h=null,f=null,r=null,y=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(C.width,C.height,!1),R!==null){const I=R.camera;I.fov=R.fov,I.zoom=R.zoom,I.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){s=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(I){if(r=I,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,xe=null,ce=null;v.depth&&(ce=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=v.stencil?gi:Hn,xe=v.stencil?Tr:Rn);const Te={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Te),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new an(h.textureWidth,h.textureHeight,{format:rn,type:jt,depthTexture:new Rr(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const se={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new an(d.framebufferWidth,d.framebufferHeight,{format:rn,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(I){for(let Y=0;Y<I.removed.length;Y++){const se=I.removed[Y],xe=w.indexOf(se);xe>=0&&(w[xe]=null,T[xe].disconnect(se))}for(let Y=0;Y<I.added.length;Y++){const se=I.added[Y];let xe=w.indexOf(se);if(xe===-1){for(let Te=0;Te<T.length;Te++)if(Te>=w.length){w.push(se),xe=Te;break}else if(w[Te]===null){w[Te]=se,xe=Te;break}if(xe===-1)break}const ce=T[xe];ce&&ce.connect(se)}}const Z=new H,te=new H;function F(I,Y,se){Z.setFromMatrixPosition(Y.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);const xe=Z.distanceTo(te),ce=Y.projectionMatrix.elements,Te=se.projectionMatrix.elements,Ge=ce[14]/(ce[10]-1),Ne=ce[14]/(ce[10]+1),Ze=(ce[9]+1)/ce[5],lt=(ce[9]-1)/ce[5],Ye=(ce[8]-1)/ce[0],ht=(Te[8]+1)/Te[0],yt=Ge*Ye,bt=Ge*ht,pt=xe/(-Ye+ht),He=pt*-Ye;if(Y.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(He),I.translateZ(pt),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),ce[10]===-1)I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const O=Ge+pt,ct=Ne+pt,ze=yt-He,A=bt+(xe-He),M=Ze*Ne/ct*O,G=lt*Ne/ct*O;I.projectionMatrix.makePerspective(ze,A,M,G,O,ct),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function re(I,Y){Y===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(Y.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(r===null)return;let Y=I.near,se=I.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(se=m.depthFar)),N.near=D.near=L.near=Y,N.far=D.far=L.far=se,(P!==N.near||U!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,U=N.far),N.layers.mask=I.layers.mask|6,L.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;const xe=I.parent,ce=N.cameras;re(N,xe);for(let Te=0;Te<ce.length;Te++)re(ce[Te],xe);ce.length===2?F(N,L,D):N.projectionMatrix.copy(L.projectionMatrix),R===null&&I.isPerspectiveCamera&&(R={camera:I,fov:I.fov,zoom:I.zoom}),ae(I,N,xe)};function ae(I,Y,se){se===null?I.matrix.copy(Y.matrixWorld):(I.matrix.copy(se.matrixWorld),I.matrix.invert(),I.matrix.multiply(Y.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(Y.projectionMatrix),I.projectionMatrixInverse.copy(Y.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=ho*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(I){c=I,h!==null&&(h.fixedFoveation=I),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=I)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(I){return p[I]};let we=null;function Fe(I,Y){if(u=Y.getViewerPose(l||a),g=Y,u!==null){const se=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let xe=!1;se.length!==N.cameras.length&&(N.cameras.length=0,xe=!0);for(let Ne=0;Ne<se.length;Ne++){const Ze=se[Ne];let lt=null;if(d!==null)lt=d.getViewport(Ze);else{const ht=f.getViewSubImage(h,Ze);lt=ht.viewport,Ne===0&&(e.setRenderTargetTextures(y,ht.colorTexture,ht.depthStencilTexture),e.setRenderTarget(y))}let Ye=V[Ne];Ye===void 0&&(Ye=new Qt,Ye.layers.enable(Ne),Ye.viewport=new rt,V[Ne]=Ye),Ye.matrix.fromArray(Ze.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Ze.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(lt.x,lt.y,lt.width,lt.height),Ne===0&&(N.matrix.copy(Ye.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),xe===!0&&N.cameras.push(Ye)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Ne=f.getDepthInformation(se[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,r.renderState)}if(ce&&ce.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Ne=0;Ne<se.length;Ne++){const Ze=se[Ne].camera;if(Ze){let lt=p[Ze];lt||(lt=new $c,p[Ze]=lt);const Ye=f.getCameraImage(Ze);lt.sourceTexture=Ye}}}}for(let se=0;se<T.length;se++){const xe=w[se],ce=T[se];xe!==null&&ce!==void 0&&ce.update(xe,Y,l||a)}we&&we(I,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}const ke=new tu;ke.setAnimationLoop(Fe),this.setAnimationLoop=function(I){we=I},this.dispose=function(){}}}const ux=new St,lu=new Ve;lu.set(-1,0,0,0,1,0,0,0,1);function hx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,E,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,E):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),E=v.envMap,y=v.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(ux.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(lu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function fx(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,T){const w=T.program;n.uniformBlockBinding(y,w)}function l(y,T){let w=r[y.id];w===void 0&&(m(y),w=u(y),r[y.id]=w,y.addEventListener("dispose",v));const C=T.program;n.updateUBOMapping(y,C);const S=e.render.frame;s[y.id]!==S&&(h(y),s[y.id]=S)}function u(y){const T=f();y.__bindingPointIndex=T;const w=i.createBuffer(),C=y.__size,S=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,C,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const T=r[y.id],w=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let S=0,R=w.length;S<R;S++){const L=w[S];if(Array.isArray(L))for(let D=0,V=L.length;D<V;D++)d(L[D],S,D,C);else d(L,S,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,T,w,C){if(_(y,T,w,C)===!0){const S=y.__offset,R=y.value;if(Array.isArray(R)){let L=0;for(let D=0;D<R.length;D++){const V=R[D],N=p(V);g(V,y.__data,L),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(L+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(R,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,y.__data)}}function g(y,T,w){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,w)}function _(y,T,w,C){const S=y.value,R=T+"_"+w;if(C[R]===void 0)return typeof S=="number"||typeof S=="boolean"?C[R]=S:ArrayBuffer.isView(S)?C[R]=S.slice():C[R]=S.clone(),!0;{const L=C[R];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return C[R]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(L.equals(S)===!1)return L.copy(S),!0}}return!1}function m(y){const T=y.uniforms;let w=0;const C=16;for(let R=0,L=T.length;R<L;R++){const D=Array.isArray(T[R])?T[R]:[T[R]];for(let V=0,N=D.length;V<N;V++){const P=D[V],U=Array.isArray(P.value)?P.value:[P.value];for(let k=0,X=U.length;k<X;k++){const j=U[k],Z=p(j),te=w%C,F=te%Z.boundary,re=te+F;w+=F,re!==0&&C-re<Z.storage&&(w+=C-re),P.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=w,w+=Z.storage}}}const S=w%C;return S>0&&(w+=C-S),y.__size=w,y.__cache={},this}function p(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",y),T}function v(y){const T=y.target;T.removeEventListener("dispose",v);const w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function E(){for(const y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:E}}const dx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vn=null;function px(){return vn===null&&(vn=new Yi(dx,16,16,Ei,Cn),vn.name="DFG_LUT",vn.minFilter=Tt,vn.magFilter=Tt,vn.wrapS=Bn,vn.wrapT=Bn,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}class mx{constructor(e={}){const{canvas:t=Pd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=jt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([Co,Ro,Ao]),p=new Set([jt,Rn,wr,Tr,wo,To]),v=new Uint32Array(4),E=new Int32Array(4),y=new H;let T=null,w=null;const C=[],S=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let D=!1,V=null,N=null,P=null,U=null;this._outputColorSpace=nn;let k=0,X=0,j=null,Z=-1,te=null;const F=new rt,re=new rt;let ae=null;const we=new et(0);let Fe=0,ke=t.width,I=t.height,Y=1,se=null,xe=null;const ce=new rt(0,0,ke,I),Te=new rt(0,0,ke,I);let Ge=!1;const Ne=new As;let Ze=!1,lt=!1;const Ye=new St,ht=new H,yt=new rt,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function He(){return j===null?Y:1}let O=n;function ct(b,B){return t.getContext(b,B)}let ze,A,M,G,W,Q,le,ue,ee,ne,he,Pe,me,fe,De,Oe,Xe,z,de,ie,pe,Me,oe;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bo}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",cn,!1),O===null){const B="webgl2";if(O=ct(B,b),O===null)throw ct(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(b){throw t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",cn,!1),nt("WebGLRenderer: "+b.message),b}function Ie(){ze=new pg(O),ze.init(),pe=new sx(O,ze),A=new rg(O,ze,e,pe),M=new ix(O,ze),A.reversedDepthBuffer&&h&&M.buffers.depth.setReversed(!0),N=O.createFramebuffer(),P=O.createFramebuffer(),U=O.createFramebuffer(),G=new _g(O),W=new V_,Q=new rx(O,ze,M,W,A,pe,G),le=new dg(L),ue=new vp(O),Me=new ng(O,ue),ee=new mg(O,ue,G,Me),ne=new vg(O,ee,ue,Me,G),z=new xg(O,A,Q),De=new sg(W),he=new H_(L,le,ze,A,Me,De),Pe=new hx(L,W),me=new X_,fe=new J_(ze),Xe=new tg(L,le,M,ne,g,c),Oe=new nx(L,ne,A),oe=new fx(O,G,A,M),de=new ig(O,ze,G),ie=new gg(O,ze,G),G.programs=he.programs,L.capabilities=A,L.extensions=ze,L.properties=W,L.renderLists=me,L.shadowMap=Oe,L.state=M,L.info=G}_!==jt&&(R=new Sg(_,t.width,t.height,o,r,s));const Ce=new cx(L,O);this.xr=Ce,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=ze.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ze.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(ke,I,!1))},this.getSize=function(b){return b.set(ke,I)},this.setSize=function(b,B,J=!0){if(Ce.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=b,I=B,t.width=Math.floor(b*Y),t.height=Math.floor(B*Y),J===!0&&(t.style.width=b+"px",t.style.height=B+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(ke*Y,I*Y).floor()},this.setDrawingBufferSize=function(b,B,J){ke=b,I=B,Y=J,t.width=Math.floor(b*J),t.height=Math.floor(B*J),this.setViewport(0,0,b,B)},this.setEffects=function(b){if(_===jt){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let B=0;B<b.length;B++)if(b[B].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(F)},this.getViewport=function(b){return b.copy(ce)},this.setViewport=function(b,B,J,q){b.isVector4?ce.set(b.x,b.y,b.z,b.w):ce.set(b,B,J,q),M.viewport(F.copy(ce).multiplyScalar(Y).round())},this.getScissor=function(b){return b.copy(Te)},this.setScissor=function(b,B,J,q){b.isVector4?Te.set(b.x,b.y,b.z,b.w):Te.set(b,B,J,q),M.scissor(re.copy(Te).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(b){M.setScissorTest(Ge=b)},this.setOpaqueSort=function(b){se=b},this.setTransparentSort=function(b){xe=b},this.getClearColor=function(b){return b.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,J=!0){let q=0;if(b){let K=!1;if(j!==null){const ve=j.texture.format;K=m.has(ve)}if(K){const ve=j.texture.type,be=p.has(ve),_e=Xe.getClearColor(),Ae=Xe.getClearAlpha(),Le=_e.r,qe=_e.g,$e=_e.b;be?(v[0]=Le,v[1]=qe,v[2]=$e,v[3]=Ae,O.clearBufferuiv(O.COLOR,0,v)):(E[0]=Le,E[1]=qe,E[2]=$e,E[3]=Ae,O.clearBufferiv(O.COLOR,0,E))}else q|=O.COLOR_BUFFER_BIT}B&&(q|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&O.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),V=b},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",cn,!1),Xe.dispose(),me.dispose(),fe.dispose(),W.dispose(),le.dispose(),ne.dispose(),Me.dispose(),oe.dispose(),he.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Go),Ce.removeEventListener("sessionend",Ho),ai.stop()};function mt(b){b.preventDefault(),hl("WebGLRenderer: Context Lost."),D=!0}function at(){hl("WebGLRenderer: Context Restored."),D=!1;const b=G.autoReset,B=Oe.enabled,J=Oe.autoUpdate,q=Oe.needsUpdate,K=Oe.type;Ie(),G.autoReset=b,Oe.enabled=B,Oe.autoUpdate=J,Oe.needsUpdate=q,Oe.type=K}function cn(b){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function gn(b){const B=b.target;B.removeEventListener("dispose",gn),vu(B)}function vu(b){Mu(b),W.remove(b)}function Mu(b){const B=W.get(b).programs;B!==void 0&&(B.forEach(function(J){he.releaseProgram(J)}),b.isShaderMaterial&&he.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,J,q,K,ve){B===null&&(B=bt);const be=K.isMesh&&K.matrixWorld.determinantAffine()<0,_e=bu(b,B,J,q,K);M.setMaterial(q,be);let Ae=J.index,Le=1;if(q.wireframe===!0){if(Ae=ee.getWireframeAttribute(J),Ae===void 0)return;Le=2}const qe=J.drawRange,$e=J.attributes.position;let Re=qe.start*Le,ot=(qe.start+qe.count)*Le;ve!==null&&(Re=Math.max(Re,ve.start*Le),ot=Math.min(ot,(ve.start+ve.count)*Le)),Ae!==null?(Re=Math.max(Re,0),ot=Math.min(ot,Ae.count)):$e!=null&&(Re=Math.max(Re,0),ot=Math.min(ot,$e.count));const At=ot-Re;if(At<0||At===1/0)return;Me.setup(K,q,_e,J,Ae);let xt,dt=de;if(Ae!==null&&(xt=ue.get(Ae),dt=ie,dt.setIndex(xt)),K.isMesh)q.wireframe===!0?(M.setLineWidth(q.wireframeLinewidth*He()),dt.setMode(O.LINES)):dt.setMode(O.TRIANGLES);else if(K.isLine){let Ot=q.linewidth;Ot===void 0&&(Ot=1),M.setLineWidth(Ot*He()),K.isLineSegments?dt.setMode(O.LINES):K.isLineLoop?dt.setMode(O.LINE_LOOP):dt.setMode(O.LINE_STRIP)}else K.isPoints?dt.setMode(O.POINTS):K.isSprite&&dt.setMode(O.TRIANGLES);if(K.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))dt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ot=K._multiDrawStarts,ye=K._multiDrawCounts,Gt=K._multiDrawCount,tt=Ae?ue.get(Ae).bytesPerElement:1,en=W.get(q).currentProgram.getUniforms();for(let _n=0;_n<Gt;_n++)en.setValue(O,"_gl_DrawID",_n),dt.render(Ot[_n]/tt,ye[_n])}else if(K.isInstancedMesh)dt.renderInstances(Re,At,K.count);else if(J.isInstancedBufferGeometry){const Ot=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ye=Math.min(J.instanceCount,Ot);dt.renderInstances(Re,At,ye)}else dt.render(Re,At)};function ko(b,B,J,q){V!==null&&b.isNodeMaterial&&V.setObject(q,b),Ze===!0&&De.setState(b,J,!1),b.transparent===!0&&b.side===On&&b.forceSinglePass===!1?(b.side=qt,b.needsUpdate=!0,Nr(b,B,q),b.side=yi,b.needsUpdate=!0,Nr(b,B,q),b.side=On):Nr(b,B,q)}this.compile=function(b,B,J=null){J===null&&(J=b),V!==null&&V.renderStart(b,B,J),w=fe.get(J),w.init(B),S.push(w),J.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),b!==J&&b.traverseVisible(function(K){K.isLight&&K.layers.test(B.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),w.setupLights(),V!==null&&V.updateLights(w.state.lightsArray),lt=this.localClippingEnabled,Ze=De.init(this.clippingPlanes,lt),Ze===!0&&De.setGlobalState(this.clippingPlanes,B),V!==null&&Oe.render(w.state.shadowsArray,J,B);const q=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const ve=K.material;if(ve)if(Array.isArray(ve))for(let be=0;be<ve.length;be++){const _e=ve[be];ko(_e,J,B,K),q.add(_e)}else ko(ve,J,B,K),q.add(ve)}),w=S.pop(),V!==null&&V.renderEnd(),q},this.compileAsync=function(b,B,J=null){const q=this.compile(b,B,J);return new Promise(K=>{function ve(){if(q.forEach(function(be){const Ae=W.get(be).currentProgram;(Ae===void 0||Ae.isReady())&&q.delete(be)}),q.size===0){K(b);return}setTimeout(ve,10)}ze.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ks=null;function Su(b){ks&&ks(b)}function Go(){ai.stop()}function Ho(){ai.start()}const ai=new tu;ai.setAnimationLoop(Su),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(b){ks=b,Ce.setAnimationLoop(b),b===null?ai.stop():ai.start()},Ce.addEventListener("sessionstart",Go),Ce.addEventListener("sessionend",Ho),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;V!==null&&V.renderStart(b,B);const J=Ce.enabled===!0&&Ce.isPresenting===!0,q=R!==null&&(j===null||J)&&R.begin(L,j);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(B),B=Ce.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,B,j),w=fe.get(b,S.length),w.init(B),w.state.textureUnits=Q.getTextureUnits(),S.push(w),Ye.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ne.setFromProjectionMatrix(Ye,bn,B.reversedDepth),lt=this.localClippingEnabled,Ze=De.init(this.clippingPlanes,lt),T=me.get(b,C.length),T.init(),C.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){const be=L.xr.getDepthSensingMesh();be!==null&&Gs(be,B,-1/0,L.sortObjects)}Gs(b,B,0,L.sortObjects),T.finish(),V!==null&&V.updateLights(w.state.lightsArray),L.sortObjects===!0&&T.sort(se,xe),pt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,pt&&Xe.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&De.beginShadows();const K=w.state.shadowsArray;if(Oe.render(K,b,B),Ze===!0&&De.endShadows(),(q&&R.hasRenderPass())===!1){const be=T.opaque,_e=T.transmissive;if(w.setupLights(),B.isArrayCamera){const Ae=B.cameras;if(_e.length>0)for(let Le=0,qe=Ae.length;Le<qe;Le++){const $e=Ae[Le];Wo(be,_e,b,$e)}pt&&Xe.render(b);for(let Le=0,qe=Ae.length;Le<qe;Le++){const $e=Ae[Le];Vo(T,b,$e,$e.viewport)}}else _e.length>0&&Wo(be,_e,b,B),pt&&Xe.render(b),Vo(T,b,B)}j!==null&&X===0&&(Q.updateMultisampleRenderTarget(j),Q.updateRenderTargetMipmap(j)),q&&R.end(L),b.isScene===!0&&b.onAfterRender(L,b,B),Me.resetDefaultState(),Z=-1,te=null,S.pop(),S.length>0?(w=S[S.length-1],Q.setTextureUnits(w.state.textureUnits),Ze===!0&&De.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,V!==null&&V.renderEnd()};function Gs(b,B,J,q){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLightProbeGrid)w.pushLightProbeGrid(b);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Ne)){q&&yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ye);const be=ne.update(b),_e=b.material;_e.visible&&T.push(b,be,_e,J,yt.z,null,B)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Ne))){const be=ne.update(b),_e=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),yt.copy(b.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),yt.copy(be.boundingSphere.center)),yt.applyMatrix4(b.matrixWorld).applyMatrix4(Ye)),Array.isArray(_e)){const Ae=be.groups;for(let Le=0,qe=Ae.length;Le<qe;Le++){const $e=Ae[Le],Re=_e[$e.materialIndex];Re&&Re.visible&&T.push(b,be,Re,J,yt.z,$e,B)}}else _e.visible&&T.push(b,be,_e,J,yt.z,null,B)}}const ve=b.children;for(let be=0,_e=ve.length;be<_e;be++)Gs(ve[be],B,J,q)}function Vo(b,B,J,q){const{opaque:K,transmissive:ve,transparent:be}=b;w.setupLightsView(J),Ze===!0&&De.setGlobalState(L.clippingPlanes,J),q&&M.viewport(F.copy(q)),K.length>0&&Ir(K,B,J),ve.length>0&&Ir(ve,B,J),be.length>0&&Ir(be,B,J),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Wo(b,B,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[q.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[q.id]=new an(1,1,{generateMipmaps:!0,type:Re?Cn:jt,minFilter:mi,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const ve=w.state.transmissionRenderTarget[q.id],be=q.viewport||F;ve.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);const _e=L.getRenderTarget(),Ae=L.getActiveCubeFace(),Le=L.getActiveMipmapLevel();L.setRenderTarget(ve),L.getClearColor(we),Fe=L.getClearAlpha(),Fe<1&&L.setClearColor(16777215,.5),L.clear(),pt&&Xe.render(J);const qe=L.toneMapping;L.toneMapping=wn;const $e=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),w.setupLightsView(q),Ze===!0&&De.setGlobalState(L.clippingPlanes,q),Ir(b,J,q),Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ot=0,At=B.length;ot<At;ot++){const xt=B[ot],{object:dt,geometry:Ot,material:ye,group:Gt}=xt;if(ye.side===On&&dt.layers.test(q.layers)){const tt=ye.side;ye.side=qt,ye.needsUpdate=!0,Xo(dt,J,q,Ot,ye,Gt),ye.side=tt,ye.needsUpdate=!0,Re=!0}}Re===!0&&(Q.updateMultisampleRenderTarget(ve),Q.updateRenderTargetMipmap(ve))}L.setRenderTarget(_e,Ae,Le),L.setClearColor(we,Fe),$e!==void 0&&(q.viewport=$e),L.toneMapping=qe}function Ir(b,B,J){const q=B.isScene===!0?B.overrideMaterial:null;for(let K=0,ve=b.length;K<ve;K++){const be=b[K],{object:_e,geometry:Ae,group:Le}=be;let qe=be.material;qe.allowOverride===!0&&q!==null&&(qe=q),_e.layers.test(J.layers)&&Xo(_e,B,J,Ae,qe,Le)}}function Xo(b,B,J,q,K,ve){V!==null&&K.isNodeMaterial&&V.setObject(b,K),b.onBeforeRender(L,B,J,q,K,ve),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(L,B,J,q,b,ve),K.transparent===!0&&K.side===On&&K.forceSinglePass===!1?(K.side=qt,K.needsUpdate=!0,L.renderBufferDirect(J,B,q,K,b,ve),K.side=yi,K.needsUpdate=!0,L.renderBufferDirect(J,B,q,K,b,ve),K.side=On):L.renderBufferDirect(J,B,q,K,b,ve),b.onAfterRender(L,B,J,q,K,ve)}function Nr(b,B,J){B.isScene!==!0&&(B=bt);const q=W.get(b),K=w.state.lights,ve=w.state.shadowsArray,be=K.state.version,_e=he.getParameters(b,K.state,ve,B,J,w.state.lightProbeGridArray),Ae=he.getProgramCacheKey(_e);let Le=q.programs;q.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,q.fog=B.fog;const qe=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;q.envMap=le.get(b.envMap||q.environment,qe),q.envMapRotation=q.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Le===void 0&&(b.addEventListener("dispose",gn),Le=new Map,q.programs=Le);let $e=Le.get(Ae);if($e!==void 0){if(q.currentProgram===$e&&q.lightsStateVersion===be)return qo(b,_e),$e}else _e.uniforms=he.getUniforms(b),V!==null&&b.isNodeMaterial&&V.build(b,J,_e),b.onBeforeCompile(_e,L),$e=he.acquireProgram(_e,Ae),Le.set(Ae,$e),q.uniforms=_e.uniforms;const Re=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=De.uniform),qo(b,_e),q.needsLights=wu(b),q.lightsStateVersion=be,q.needsLights&&(Re.ambientLightColor.value=K.state.ambient,Re.lightProbe.value=K.state.probe,Re.sunLights.value=K.state.sun,Re.sunLightShadows.value=K.state.sunShadow,Re.directionalLights.value=K.state.directional,Re.directionalLightShadows.value=K.state.directionalShadow,Re.spotLights.value=K.state.spot,Re.spotLightShadows.value=K.state.spotShadow,Re.rectAreaLights.value=K.state.rectArea,Re.ltc_1.value=K.state.rectAreaLTC1,Re.ltc_2.value=K.state.rectAreaLTC2,Re.pointLights.value=K.state.point,Re.pointLightShadows.value=K.state.pointShadow,Re.hemisphereLights.value=K.state.hemi,Re.sunShadowMatrix.value=K.state.sunShadowMatrix,Re.sunShadowCascade.value=K.state.sunShadowCascade,Re.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Re.spotLightMatrix.value=K.state.spotLightMatrix,Re.spotLightMap.value=K.state.spotLightMap,Re.pointShadowMatrix.value=K.state.pointShadowMatrix),q.lightProbeGrid=w.state.lightProbeGridArray.length>0,q.currentProgram=$e,q.uniformsList=null,$e}function Yo(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=_s.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function qo(b,B){const J=W.get(b);J.outputColorSpace=B.outputColorSpace,J.batching=B.batching,J.batchingColor=B.batchingColor,J.instancing=B.instancing,J.instancingColor=B.instancingColor,J.instancingMorph=B.instancingMorph,J.skinning=B.skinning,J.morphTargets=B.morphTargets,J.morphNormals=B.morphNormals,J.morphColors=B.morphColors,J.morphTargetsCount=B.morphTargetsCount,J.numClippingPlanes=B.numClippingPlanes,J.numIntersection=B.numClipIntersection,J.vertexAlphas=B.vertexAlphas,J.vertexTangents=B.vertexTangents,J.toneMapping=B.toneMapping}function yu(b,B){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let J=0,q=b.length;J<q;J++){const K=b[J];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function bu(b,B,J,q,K){B.isScene!==!0&&(B=bt),Q.resetTextureUnits();const ve=B.fog,be=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?B.environment:null,_e=j===null?L.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Qe.workingColorSpace,Ae=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Le=le.get(q.envMap||be,Ae),qe=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,$e=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!J.morphAttributes.position,ot=!!J.morphAttributes.normal,At=!!J.morphAttributes.color;let xt=wn;q.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(xt=L.toneMapping);const dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Ot=dt!==void 0?dt.length:0,ye=W.get(q),Gt=w.state.lights;if(Ze===!0&&(lt===!0||b!==te)){const gt=b===te&&q.id===Z;De.setState(q,b,gt)}let tt=!1;q.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==Gt.state.version||ye.outputColorSpace!==_e||K.isBatchedMesh&&ye.batching===!1||!K.isBatchedMesh&&ye.batching===!0||K.isBatchedMesh&&ye.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&ye.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&ye.instancing===!1||!K.isInstancedMesh&&ye.instancing===!0||K.isSkinnedMesh&&ye.skinning===!1||!K.isSkinnedMesh&&ye.skinning===!0||K.isInstancedMesh&&ye.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&ye.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&ye.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&ye.instancingMorph===!1&&K.morphTexture!==null||ye.envMap!==Le||q.fog===!0&&ye.fog!==ve||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==De.numPlanes||ye.numIntersection!==De.numIntersection)||ye.vertexAlphas!==qe||ye.vertexTangents!==$e||ye.morphTargets!==Re||ye.morphNormals!==ot||ye.morphColors!==At||ye.toneMapping!==xt||ye.morphTargetsCount!==Ot||!!ye.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,ye.__version=q.version);let en=ye.currentProgram;tt===!0&&(en=Nr(q,B,K),V&&q.isNodeMaterial&&V.onUpdateProgram(q,en,ye));let _n=!1,Vn=!1,Ai=!1;const ft=en.getUniforms(),Et=ye.uniforms;if(M.useProgram(en.program)&&(_n=!0,Vn=!0,Ai=!0),q.id!==Z&&(Z=q.id,Vn=!0),ye.needsLights){const gt=yu(w.state.lightProbeGridArray,K);ye.lightProbeGrid!==gt&&(ye.lightProbeGrid=gt,Vn=!0)}if(_n||te!==b){M.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ft.setValue(O,"projectionMatrix",b.projectionMatrix),ft.setValue(O,"viewMatrix",b.matrixWorldInverse);const Xn=ft.map.cameraPosition;Xn!==void 0&&Xn.setValue(O,ht.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&ft.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ft.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),te!==b&&(te=b,Vn=!0,Ai=!0)}if(ye.needsLights&&(Gt.state.sunShadowMap.length>0&&ft.setValue(O,"sunShadowMap",Gt.state.sunShadowMap,Q),Gt.state.directionalShadowMap.length>0&&ft.setValue(O,"directionalShadowMap",Gt.state.directionalShadowMap,Q),Gt.state.spotShadowMap.length>0&&ft.setValue(O,"spotShadowMap",Gt.state.spotShadowMap,Q),Gt.state.pointShadowMap.length>0&&ft.setValue(O,"pointShadowMap",Gt.state.pointShadowMap,Q)),K.isSkinnedMesh){ft.setOptional(O,K,"bindMatrix"),ft.setOptional(O,K,"bindMatrixInverse");const gt=K.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ft.setValue(O,"boneTexture",gt.boneTexture,Q))}K.isBatchedMesh&&(ft.setOptional(O,K,"batchingTexture"),ft.setValue(O,"batchingTexture",K._matricesTexture,Q),ft.setOptional(O,K,"batchingIdTexture"),ft.setValue(O,"batchingIdTexture",K._indirectTexture,Q),ft.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&ft.setValue(O,"batchingColorTexture",K._colorsTexture,Q));const Wn=J.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&z.update(K,J,en),(Vn||ye.receiveShadow!==K.receiveShadow)&&(ye.receiveShadow=K.receiveShadow,ft.setValue(O,"receiveShadow",K.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&B.environment!==null&&(Et.envMapIntensity.value=B.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=px()),Vn){if(ft.setValue(O,"toneMappingExposure",L.toneMappingExposure),ye.needsLights&&Eu(Et,Ai),ve&&q.fog===!0&&Pe.refreshFogUniforms(Et,ve),Pe.refreshMaterialUniforms(Et,q,Y,I,w.state.transmissionRenderTarget[b.id]),ye.needsLights&&ye.lightProbeGrid){const gt=ye.lightProbeGrid;Et.probesSH.value=gt.texture,Et.probesMin.value.copy(gt.boundingBox.min),Et.probesMax.value.copy(gt.boundingBox.max),Et.probesResolution.value.copy(gt.resolution)}_s.upload(O,Yo(ye),Et,Q)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(_s.upload(O,Yo(ye),Et,Q),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ft.setValue(O,"center",K.center),ft.setValue(O,"modelViewMatrix",K.modelViewMatrix),ft.setValue(O,"normalMatrix",K.normalMatrix),ft.setValue(O,"modelMatrix",K.matrixWorld),q.uniformsGroups!==void 0){const gt=q.uniformsGroups;for(let Xn=0,Ri=gt.length;Xn<Ri;Xn++){const Zo=gt[Xn];oe.update(Zo,en),oe.bind(Zo,en)}}return en}function Eu(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.sunLights.needsUpdate=B,b.sunLightShadows.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function wu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(b,B,J){const q=W.get(b);q.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),W.get(b.texture).__webglTexture=B,W.get(b.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){const J=W.get(b);J.__webglFramebuffer=B,J.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,J=0){j=b,k=B,X=J;let q=null,K=!1,ve=!1;if(b){const _e=W.get(b);if(_e.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(O.FRAMEBUFFER,_e.__webglFramebuffer),F.copy(b.viewport),re.copy(b.scissor),ae=b.scissorTest,M.viewport(F),M.scissor(re),M.setScissorTest(ae),Z=-1;return}else if(_e.__webglFramebuffer===void 0)Q.setupRenderTarget(b);else if(_e.__hasExternalTextures)Q.rebindTextures(b,W.get(b.texture).__webglTexture,W.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const qe=b.depthTexture;if(_e.__boundDepthTexture!==qe){if(qe!==null&&W.has(qe)&&(b.width!==qe.image.width||b.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(b)}}const Ae=b.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ve=!0);const Le=W.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Le[B])?q=Le[B][J]:q=Le[B],K=!0):b.samples>0&&Q.useMultisampledRTT(b)===!1?q=W.get(b).__webglMultisampledFramebuffer:Array.isArray(Le)?q=Le[J]:q=Le,F.copy(b.viewport),re.copy(b.scissor),ae=b.scissorTest}else F.copy(ce).multiplyScalar(Y).floor(),re.copy(Te).multiplyScalar(Y).floor(),ae=Ge;if(J!==0&&(q=N),M.bindFramebuffer(O.FRAMEBUFFER,q)&&M.drawBuffers(b,q),M.viewport(F),M.scissor(re),M.setScissorTest(ae),K){const _e=W.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,_e.__webglTexture,J)}else if(ve){const _e=B;for(let Ae=0;Ae<b.textures.length;Ae++){const Le=W.get(b.textures[Ae]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ae,Le.__webglTexture,J,_e)}}else if(b!==null&&J!==0){const _e=W.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,_e.__webglTexture,J)}Z=-1};function Ko(b){const B=W.get(b);return(B.__readFormat!==b.format||B.__readType!==b.type)&&(B.__readFormat=b.format,B.__readType=b.type,B.__formatReadable=A.textureFormatReadable(b.format),B.__typeReadable=A.textureTypeReadable(b.type)),B}this.readRenderTargetPixels=function(b,B,J,q,K,ve,be,_e=0){if(!(b&&b.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){M.bindFramebuffer(O.FRAMEBUFFER,Ae);try{const Le=b.textures[_e],qe=Le.format,$e=Le.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_e);const Re=Ko(Le);if(Re.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-q&&J>=0&&J<=b.height-K&&O.readPixels(B,J,q,K,pe.convert(qe),pe.convert($e),ve)}finally{const Le=j!==null?W.get(j).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(b,B,J,q,K,ve,be,_e=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae)if(B>=0&&B<=b.width-q&&J>=0&&J<=b.height-K){M.bindFramebuffer(O.FRAMEBUFFER,Ae);const Le=b.textures[_e],qe=Le.format,$e=Le.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+_e);const Re=Ko(Le);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ot),O.bufferData(O.PIXEL_PACK_BUFFER,ve.byteLength,O.STREAM_READ),O.readPixels(B,J,q,K,pe.convert(qe),pe.convert($e),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const At=j!==null?W.get(j).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,At);const xt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Dd(O,xt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ot),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ve),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(ot),O.deleteSync(xt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,J=0){const q=Math.pow(2,-J),K=Math.floor(b.image.width*q),ve=Math.floor(b.image.height*q),be=B!==null?B.x:0,_e=B!==null?B.y:0;Q.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,be,_e,K,ve),M.unbindTexture()},this.copyTextureToTexture=function(b,B,J=null,q=null,K=0,ve=0){let be,_e,Ae,Le,qe,$e,Re,ot,At;const xt=b.isCompressedTexture?b.mipmaps[ve]:b.image;if(J!==null)be=J.max.x-J.min.x,_e=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Le=J.min.x,qe=J.min.y,$e=J.isBox3?J.min.z:0;else{const Et=Math.pow(2,-K);be=Math.floor(xt.width*Et),_e=Math.floor(xt.height*Et),b.isDataArrayTexture?Ae=xt.depth:b.isData3DTexture?Ae=Math.floor(xt.depth*Et):Ae=1,Le=0,qe=0,$e=0}q!==null?(Re=q.x,ot=q.y,At=q.z):(Re=0,ot=0,At=0);const dt=pe.convert(B.format),Ot=pe.convert(B.type);let ye;B.isData3DTexture?(Q.setTexture3D(B,0),ye=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Q.setTexture2DArray(B,0),ye=O.TEXTURE_2D_ARRAY):(Q.setTexture2D(B,0),ye=O.TEXTURE_2D),M.activeTexture(O.TEXTURE0),M.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),M.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),M.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);const Gt=M.getParameter(O.UNPACK_ROW_LENGTH),tt=M.getParameter(O.UNPACK_IMAGE_HEIGHT),en=M.getParameter(O.UNPACK_SKIP_PIXELS),_n=M.getParameter(O.UNPACK_SKIP_ROWS),Vn=M.getParameter(O.UNPACK_SKIP_IMAGES);M.pixelStorei(O.UNPACK_ROW_LENGTH,xt.width),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,xt.height),M.pixelStorei(O.UNPACK_SKIP_PIXELS,Le),M.pixelStorei(O.UNPACK_SKIP_ROWS,qe),M.pixelStorei(O.UNPACK_SKIP_IMAGES,$e);const Ai=b.isDataArrayTexture||b.isData3DTexture,ft=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){const Et=W.get(b),Wn=W.get(B),gt=W.get(Et.__renderTarget),Xn=W.get(Wn.__renderTarget);M.bindFramebuffer(O.READ_FRAMEBUFFER,gt.__webglFramebuffer),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Ri=0;Ri<Ae;Ri++)Ai&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(b).__webglTexture,K,$e+Ri),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(B).__webglTexture,ve,At+Ri)),O.blitFramebuffer(Le,qe,be,_e,Re,ot,be,_e,O.DEPTH_BUFFER_BIT,O.NEAREST);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||W.has(b)){const Et=W.get(b),Wn=W.get(B);M.bindFramebuffer(O.READ_FRAMEBUFFER,P),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,U);for(let gt=0;gt<Ae;gt++)Ai?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Et.__webglTexture,K,$e+gt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Et.__webglTexture,K),ft?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Wn.__webglTexture,ve,At+gt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Wn.__webglTexture,ve),K!==0?O.blitFramebuffer(Le,qe,be,_e,Re,ot,be,_e,O.COLOR_BUFFER_BIT,O.NEAREST):ft?O.copyTexSubImage3D(ye,ve,Re,ot,At+gt,Le,qe,be,_e):O.copyTexSubImage2D(ye,ve,Re,ot,Le,qe,be,_e);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ft?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(ye,ve,Re,ot,At,be,_e,Ae,dt,Ot,xt.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(ye,ve,Re,ot,At,be,_e,Ae,dt,xt.data):O.texSubImage3D(ye,ve,Re,ot,At,be,_e,Ae,dt,Ot,xt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ve,Re,ot,be,_e,dt,Ot,xt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ve,Re,ot,xt.width,xt.height,dt,xt.data):O.texSubImage2D(O.TEXTURE_2D,ve,Re,ot,be,_e,dt,Ot,xt);M.pixelStorei(O.UNPACK_ROW_LENGTH,Gt),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,tt),M.pixelStorei(O.UNPACK_SKIP_PIXELS,en),M.pixelStorei(O.UNPACK_SKIP_ROWS,_n),M.pixelStorei(O.UNPACK_SKIP_IMAGES,Vn),ve===0&&B.generateMipmaps&&O.generateMipmap(ye),M.unbindTexture()},this.initRenderTarget=function(b){W.get(b).__webglFramebuffer===void 0&&Q.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Q.setTextureCube(b,0):b.isData3DTexture?Q.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Q.setTexture2DArray(b,0):Q.setTexture2D(b,0),M.unbindTexture()},this.resetState=function(){k=0,X=0,j=null,M.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const gx={hair:x.HAIR,hat:x.HAT,headphones:x.PHONES,top:x.TOP,jacket:x.JACKET,jeans:x.JEANS,sneakers:x.SHOES,broom:x.BROOM,bristles:x.STRAW,skin:x.SKIN},rc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function _x(i,e=rc){const t={...rc,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[s,a]of Object.entries(gx)){const[o,c,l]=t[s];r[a]=Ee(n[s]??o,c,l)}return r[x.EYE]=[24,18,30],r[x.GLINT]=[255,255,245],r[x.NOSE]=[20,16,24],r[x.MAGIC]=Ee(i.glowHue??.13,.5,1),r[x.MAGIC2]=Ee(i.glowHue??.13,.15,1),r[x.BELLY]=[245,245,240],r}function xx({frame:i=0,lean:e=!1}={}){const t=new st({blend:.03}),n=[0,.025,.045][i%3],r=[0,.015,-.01][i%3]+(e?.08:0),s=.42+n,a=e?.1:0,o=[0,.03,.05][i%3];t.ell([.02,.005,0],[.2,.005,.12],x.NOSE,{group:0}),t.seg([-.5,s-r*2,0],[.62,s+r*3,0],.022,.018,x.BROOM,{group:2}),t.ell([-.62,s-r*2-.01,0],[.17,.07,.08],x.STRAW,{dir:[1,r,0],group:3,paint:f=>f[0]<-.72?x.MAGIC2:f[0]>-.5?x.BROOM:void 0});for(const f of[-1,1]){const h=[-.04,s+.06,f*.07],d=[.12+a*.5,s-.02,f*.14],g=[.08+a,s-.2,f*.13];t.seg(h,d,.055,.045,x.JEANS,{group:f>0?6:4}),t.seg(d,g,.045,.04,x.JEANS,{group:f>0?6:4}),t.ell($.add(g,[.05,-.02,0]),[.08,.04,.045],x.SHOES,{group:f>0?6:4,paint:_=>_[1]<g[1]-.04?x.BELLY:void 0})}t.ell([-.04,s+.08,0],[.11,.07,.1],x.JEANS,{group:1});const c=[0+a*.8,s+.26-a*.3,0];t.ell(c,[.1,.16,.11],x.JACKET,{dir:[a*2.5,1,0],up:[-1,0,0],group:1,paint:f=>f[0]>c[0]+.04&&Math.abs(f[2])<.055?x.TOP:void 0});for(const f of[-1,1]){const h=$.add(c,[.01,.11,f*.11]),d=[.26+a,s+.03,f*.05];t.seg(h,$.lerp(h,d,.5),.04,.035,x.JACKET,{group:f>0?7:5}),t.seg($.lerp(h,d,.5),d,.035,.03,x.JACKET,{group:f>0?7:5}),t.ell(d,[.035,.03,.035],x.SKIN,{group:f>0?7:5})}const l=$.add(c,[.03+a*.5,.26,0]);t.ell(l,[.11,.115,.1],x.SKIN,{group:8,paint:f=>f[0]<l[0]-.01||f[1]>l[1]+.075?x.HAIR:void 0});for(const f of[-1,1])t.ell(st.surface(l,[.11,.115,.1],$.norm([.85,.05,f*.45])),[.016,.026,.016],x.EYE,{group:8});t.chain([[...$.add(l,[-.06,.02,0]),.06],[...$.add(l,[-.18-a,-.05+o,.02]),.045],[...$.add(l,[-.3-a*1.5,-.08+o*1.6,.03]),.02]],x.HAIR,{group:9});for(const f of[-1,1])t.ell($.add(l,[-.015,0,f*.105]),[.05,.055,.03],x.PHONES,{group:10});t.chain([[...$.add(l,[-.005,.03,-.095]),.015],[...$.add(l,[-.005,.11,-.05]),.015],[...$.add(l,[-.005,.125,0]),.015],[...$.add(l,[-.005,.11,.05]),.015],[...$.add(l,[-.005,.03,.095]),.015]],x.PHONES,{group:10});const u=$.add(l,[-.03,.1,0]);return t.ell(u,[.16,.014,.15],x.HAT,{dir:[1,.25,0],group:11}),t.chain([[...$.add(u,[0,.01,0]),.085],[...$.add(u,[-.05-a,.17,0]),.045],[...$.add(u,[-.16-a*1.5,.27+o*.5,0]),.012]],x.HAT,{group:11,paint:f=>f[1]<u[1]+.045?x.MAGIC:void 0}),t}const cu=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9);function vx(i={},{frame:e=0,lean:t=!1,facing:n="towards"}={}){const r=cu(i),{sp:s}=En(xx({frame:e,lean:t}),{height:r,facing:n});let a=0;for(let o=0;o<400&&a<6;o++){const c=o*37%s.w,l=o*53%Math.floor(s.h*.8);s.get(c,l)||s.get(c+1,l)||s.get(c-1,l)||s.get(c,l+1)||s.get(c,l-1)||(c*7+l*13+e*5)%11||(s.px(c,l,x.MAGIC2),a++)}return s}const sc=(i,e,t=1)=>Math.round(e.size*Math.pow(Math.sqrt(e.growth),i)*(2/(e.pixel||2))*1.9*t),Uo=(i,e)=>{const t=vo(e);for(let n=0;n<9;n++){const r=Math.floor(Se(t,2,i.w-2)),s=Math.floor(Se(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,x.MAGIC2),n%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+a,s+o,x.MAGIC)}};function Bs(i,e,t,n,r,s,a,o){const c=$.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=$.norm($.sub(c,e)),u=$.norm($.sub([1,0,0],$.mul(l,$.dot([1,0,0],l)))),f=Math.hypot(...$.sub(c,e));i.flat($.add($.lerp(e,c,.5),$.mul(u,-n*.14)),l,u,f*.55,n*.34,Mi.wing(s,a),{group:o,extra:!0})}const Fo=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),sc(1,e)*t*.72))):sc(i,e)*t;function Mx(i,e,t,n,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...i.q},a=e===2,o=e===1,c=e===0,l=F=>a&&i.legend.includes(F),u=new st,f=s.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,h=s.len*(c?.8:o?.9:1.02)*n.long,d=c?.55:o?.9:1.04,g=t?-.04:0,_=1+g,m=s.chest*(a?1.06:1)/d+g,p=s.tuck/d+g,v=s.bw*(c?1.15:1)*(s.legW>1.2?1.15:1),E=.06*s.legW*(a?1.1:c?1.7:1),y=s.back==="hump"?.1:0,T=s.back==="arch"?.1:0,w=m+.12,C=F=>{if(s.belly&&F[1]<w&&F[0]>-h*.5)return x.BELLY;if(s.saddle&&F[1]>_-.18&&F[0]<h*.55)return x.BODY2;if(s.spots&&F[1]>m+.1&&An(F,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?x.BELLY:s.spots==="young"?void 0:x.BODY3;if(s.ridge&&F[1]>_-.08+y*.5)return x.BODY3};if(u.ell([h*.48,(_+m)/2+y*.5,0],[h*.62,(_-m)/2+y*.5,v],x.BODY,{paint:C}),u.ell([-h*.5,(_+p)/2+T*.6,0],[h*.58,(_-p)/2+T*.6,v*.93],x.BODY,{paint:C}),u.ell([0,(_+(m+p)/2)/2+.02,0],[h*.6,(_-(m+p)/2)/2,v*.9],x.BODY,{paint:C}),s.ridge)for(let F=0;F<(a?16:10);F++){const re=-h*.8+F*h*1.75/(a?15:9),ae=(.07+(a?.04:0))*(1+.5*Math.max(0,re/h));u.ell([re,_+.02+y*Math.max(0,1-Math.abs(re/h-.5)*2)+ae*.5,0],[ae,.03,v*.25],x.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let F=0;F<14;F++){const re=F/14*Math.PI*2;u.ell([h*Math.cos(re)*.7,(_+m)/2+Math.sin(re)*.2,v*(F%2?.5:-.5)],[.16,.14,.14],x.BODY)}const S=[.32,-.32][t],R=(F,re)=>{const ae=re*v*.62,we=F?h*.62:-h*.62,Fe=(F?1:-1)*re*S,ke=F?m+.1:p+.15,I=(F?re:-re)*(t?1:-1)>0?.06:0,Y=[we+Math.sin(Fe)*.2+(F?.02:.1),Math.max(.3,ke*.55),ae],se=[we+Math.sin(Fe)*.42,.05+I,ae],xe=[we,ke+.12,ae*.8],ce=re>0?s.legMat||x.BODY:s.legMat?x.BODY3:x.BODY2,Te=F?[[...xe,E*1.5],[...Y,E*1.05],[...se,E*.9]]:[[...xe,E*2*(s.haunch||1)],[...$.add(Y,[-.12,.06,0]),E*1.2],[...$.add(se,[-.06*(s.hindFoot||1),.12,0]),E*.9],[...se,E*.9]];u.chain(Te,ce,{group:re>0?6+(F?1:0):2,paint:s.socks?Ne=>Ne[1]<s.socks?x.BODY3:void 0:void 0});const Ge=(s.paw==="hoof"?.07:.09)*s.legW**.5*(F?1:s.hindFoot||1);u.ell($.add(se,[Ge*.5,-.01,0]),[Ge,E*.9,E*1.1],s.paw==="hoof"?x.NOSE:ce,{group:re>0?6+(F?1:0):2})};for(const F of[-1,1])R(!0,F),R(!1,F);const L=[h*.82,_-.12,0],D=[L[0]+Math.cos(s.neckAng)*s.neck*.9,L[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];u.seg(L,D,s.neckW*.55,s.neckW*.42,x.BODY,{paint:F=>s.belly&&F[1]<(L[1]+D[1])/2-.05?x.BELLY:s.face==="dark"?x.BODY2:void 0});const V=F=>{if(s.face==="badger")return Math.abs(F[2])<f*.22+(F[0]-D[0])*.1||F[1]<D[1]-f*.1?x.BELLY:x.BODY3;if(s.face==="dark")return x.BODY2;if((s.belly||s.muzzle)&&F[1]<D[1]-f*.35)return x.BELLY};u.ell(D,[f*1.05,f*.92,f*.88],x.BODY,{paint:V});const N=f*s.snout*(c?.55:o?.78:1),P=f*s.snoutD*.55,U=[D[0]+f*.65+N*.5,D[1]-f*.28,0];u.ell(U,[N*.62+f*.2,P,P*.95],x.BODY,{dir:[1,-.25,0],paint:F=>(s.muzzle||s.belly)&&F[1]<U[1]-P*.1?x.BELLY:V(F)});const k=[U[0]+N*.62+f*.1,U[1]-.02,0];u.ell(k,[f*(s.disc?.1:.12),f*(s.disc?.2:.12),f*(s.disc?.2:.15)],x.NOSE,{group:1});for(const F of[-1,1]){const re=st.surface(D,[f*1.05,f*.92,f*.88],$.norm([.75,.32,F*.62]));u.ell(re,[f*.13,f*.16,f*.13].map(ae=>ae*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?x.MAGIC2:x.EYE,{group:1})}for(const F of[-1,1]){const re=s.ear,ae=[D[0]-f*.15,D[1]+f*.7,F*f*.5],we=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){u.ell(ae,[f*.22,f*.25*we,f*.1],x.BODY,{group:1,paint:Te=>Te[0]>ae[0]+f*.02?x.EAR:void 0});continue}const Fe=re==="long",ke=re==="small"?-.6:0,I=f*.55*we*(re==="big"?1.35:Fe?2.2:1),Y=f*.3*(re==="big"?1.2:Fe?1.35:1),se=$.norm([ke*.6-(Fe?.3:.12),1,F*.3]),xe=$.norm([.55,.2,F]),ce=$.norm($.cross(xe,se));u.flat($.add(ae,$.mul(se,I)),ce,se,Y,I,Mi.ear(x.BODY,x.EAR,x.BODY3),{group:5+(F>0?0:20),extra:Fe}),re==="tuft"&&u.seg($.add(ae,[0,I*1.4,F*.02]),$.add(ae,[0,I*1.85,F*.04]),f*.05,f*.02,x.BODY3,{group:1})}const X=[-h*1.05,_-.1+T*.5,0],j=t?.04:-.02;if(l("tails")||Sx(u,l("starTail")?"star":s.tail,X,h,_,j),s.horns)for(const F of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,ae=[];for(let we=0;we<=8;we++){const Fe=.3-we/8*Math.PI*1.6,ke=f*.65*re*(1-.45*we/8);ae.push([D[0]-f*.1+Math.cos(Fe)*ke,D[1]+f*.45+Math.sin(Fe)*ke,F*(f*.6+we*.015)]),ae[we].push(f*.2*re*(1-.6*we/8))}u.chain(ae,l("hornsGlow")?x.MAGIC:x.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const F of[-1,1])yx(u,s,[D[0]-f*.05,D[1]+f*.75,F*f*.4],F,e,l);if(s.tusks)for(const F of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const ae=[U[0]+N*.25,U[1]-P*.4,F*P*.8];u.chain([[...ae,.045*re],[...$.add(ae,[.1*re,.1*re,F*.03]),.04*re],[...$.add(ae,[.06*re,.24*re,F*.05]),.02*re]],x.ACCENT,{group:8})}s.teeth&&!c&&u.ell([k[0]-f*.1,k[1]-f*.25,0],[f*.08,f*.14,f*.12],x.ACCENT,{group:1});const Z=F=>[-h*.9+F*h*1.65,_+y*Math.max(0,1-Math.abs(F-.8)*3)+T*(1-Math.abs(F-.4)*2),0];if(l("wings"))for(const F of[-1,1])Bs(u,[h*.2,_,F*v*.5],F,1.15,t?.1:0,F>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(F>0?10:0));if(l("mane")||l("flames"))for(let F=0;F<7;F++){const re=F/6,ae=$.lerp($.add(D,[-f*.5,f*.3,0]),Z(.55),re),we=[.4,.3,.45,.28,.38,.25,.3][F],Fe=$.norm([-.35-(t?.1:0),1,0]);u.flat($.add(ae,$.mul(Fe,we*.5)),[1,0,0],Fe,we*.32,we*.55,Mi.flame(F%2?x.MAGIC:x.MAGIC2,x.MAGIC2),{group:60+F%2,extra:!0})}if(l("tails"))for(let F=0;F<7;F++){const re=Math.PI*(.55+F*.08),ae=(F-3)*.1,we=$.add(X,[Math.cos(re)*.9,Math.sin(re)*.85,ae]);u.chain([[...X,.1],[...$.lerp(X,we,.5),.17],[...we,.08]],F%2?x.BODY2:x.BODY,{group:70,extra:!0}),u.ell(we,[.09,.09,.09],x.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((F,re)=>{const ae=Z(F),we=[.3,.5,.4,.6,.35][re];u.ell($.add(ae,[0,we*.45,(re%2-.5)*.1]),[we*.55,.08,.08],x.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Fe=>Fe[2]>0?x.MAGIC2:void 0})}),l("moss")){for(let F=0;F<6;F++)u.ell(Z(.08+F*.15),[h*.22,.07,v*.85],x.LEAF,{group:85,extra:!0});for(const[F,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ae=Z(F);u.seg(ae,$.add(ae,[0,re*.7,0]),.04,.025,x.TRUNK,{group:86,extra:!0}),u.ell($.add(ae,[0,re*.8,0]),[re*.28,re*.26,re*.28],x.LEAF2,{group:87,extra:!0,paint:we=>we[1]<ae[1]+re*.72?x.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const re=Z(F);u.ell($.add(re,[0,.12,v*.3]),[.07,.035,.07],x.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let F=0;F<3;F++){const re=[];for(let ae=0;ae<9;ae++){const we=ae/8;re.push([h*(.5-we*2.2),_+.05+F*.1+we*(.25+F*.12)+Math.sin(we*6+t+F)*.07,(F-1)*.18,.04*(1-we*.6)])}u.chain(re,F%2?x.MAGIC2:x.MAGIC,{group:90+F,extra:!0})}const{sp:te}=En(u,{height:Fo(e,n,s.hgt),facing:r});return a&&Uo(te,i.id.length*7919),te}function Sx(i,e,t,n,r,s){const a={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],x.BODY,{...a,paint:c=>c[1]<.32?x.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],x.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?x.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell($.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?x.BELLY:x.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?x.BODY3:void 0:void 0}):e==="puff"?i.ell($.add(t,[-.04,.02,0]),[.11,.11,.1],x.BELLY,a):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?x.MAGIC:x.BODY,{...a,extra:!0,paint:e==="star"?c=>An(c,14,.12)?x.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],x.BODY,a):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],x.BODY,{...a,paint:c=>c[0]<o(1.45)?x.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,x.BODY2,a),i.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],x.BODY3,a)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],x.BODY,a),i.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],x.BODY3,a))}function yx(i,e,t,n,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?n>0?x.MAGIC2:x.MAGIC:x.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),f=n*.35*o;if(e.antlers==="palm"){const m=$.add(t,[-.06*o,.12*o,f*.3]);i.seg(t,m,u*1.3,u*1.2,c,l);for(let p=0;p<5;p++){const v=.35+p*.3,E=$.norm([-Math.cos(v),Math.sin(v)*.9,n*.55]),y=(.24+.05*(p%2))*o;i.ell($.add(m,$.mul(E,y*.55)),[y*.6,u*1.5,u*.6],c,{...l,dir:E,up:[0,0,1]})}return}const h=$.add(t,[-.18*o,.3*o,f*.4]),d=$.add(t,[-.25*o,.62*o,f*.8]),g=$.add(t,[-.1*o,.95*o,f]);i.chain([[...t,u*1.2],[...h,u],[...d,u*.85],[...g,u*.4]],c,l);const _=(m,p,v,E)=>i.seg(m,$.add(m,$.mul($.norm(p),v)),E,E*.35,c,l);_($.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,u*.8),(o>.4||a)&&_(h,[1,.9,0],.3*o,u*.7),o>.7&&(_(d,[.8,1,0],.28*o,u*.6),_(g,[.3,1,n*.2],.18*o,u*.5))}function bx(i,e,t,n,r="towards"){const s=e===2,a=e===1,o=e===0,c=g=>s&&i.legend.includes(g),l=new st,u=t?.03:0,f=o?.48:a?.42:.36,h=(o?.95:1.08)+u;for(const g of[-1,1]){const _=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+_,g*.15],.07,.06,x.BODY2,{group:2});for(const m of[-.04,0,.04])l.ell([.16,.03+_,g*.15+m],[.06,.025,.02],x.ACCENT,{group:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],x.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],x.BODY,{paint:g=>g[0]>.12&&g[1]<h-f*.5?Math.floor(g[1]*18)%3===0&&An(g,16,.5)?x.BODY2:x.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+u,g*.3],[.4,.3,.08],x.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:_=>An(_,12,.15)?x.BODY3:void 0});l.ell([0,h,0],[f,f*.9,f],x.BODY);for(const g of[-1,1]){const _=$.norm([.75,-.05,g*.4+.35]),m=$.add(st.surface([0,h,0],[f,f*.9,f],_),$.mul(_,-f*.05));l.ell(m,[f*.22,f*.46,f*.4],x.BELLY,{group:1,dir:_});const p=$.add(m,$.mul(_,f*.14));l.ell(p,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),s?x.MAGIC:x.IRIS,{group:1,dir:_}),l.ell($.add(p,$.mul(_,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),s?x.MAGIC2:x.EYE,{group:1,dir:_}),o||l.ell([f*.05,h+f*.8,g*f*.6],[f*.32,f*.12,f*.08],x.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(st.surface([0,h,0],[f,f*.9,f],$.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],x.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])Bs(l,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const _=Math.PI*(.15+g/6*.7);l.ell([Math.cos(_)*.2-.1,h+.1+Math.sin(_)*.6,(g-3)*.15],[.07,.07,.07],x.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(_)*.2-.05,h+.1+Math.sin(_)*.6,(g-3)*.15],[.035,.035,.035],x.EYE,{group:95+g,extra:!0})}const{sp:d}=En(l,{height:Fo(e,n,.95),facing:r});return s&&Uo(d,31),d}const si=(i,e,t,n,r,s)=>{for(const a of n)i.ell(st.surface(e,t,$.norm(a)),[r,r*1.2,r],s,{group:1})},uu=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],x.NOSE,{group:0});function ln(i,e,t,n,r,s){const{sp:a}=En(i,{height:Fo(t,n,r),facing:s});return t===2&&Uo(a,e.id.length*131),a}const hu=(i,e,t)=>{i.ell(e,[t,t*.35,t],x.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?x.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell($.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],x.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Oo=(i,e)=>e.forEach(([t,n],r)=>i.ell($.add(t,[0,n*.45,0]),[n*.55,.07,.07],x.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?x.MAGIC2:void 0}));function Ex(i,e,t,n,r="towards"){const s=e===2,a=new st,o=t?.03:0;for(const[f,h]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,h],[f+(h>0?o:-o),.03,h],.06,.05,x.BODY3,{group:h>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,x.BODY2,{paint:f=>An(f,22,.3)?x.BODY3:An(f,19,.12)?x.BELLY:void 0});for(let f=0;f<46;f++){const h=f*2.399%(Math.PI*2),d=f/46*.9+.05,g=$.norm([Math.cos(h)*Math.sin(d*Math.PI*.5)-.25,Math.cos(d*Math.PI*.5)*.9+.1,Math.sin(h)*Math.sin(d*Math.PI*.5)]);g[0]>.55||a.ell($.add(st.surface(c,l,g),$.mul(g,.02)),[.1,.025,.025],f%4?x.BODY2:x.BODY3,{dir:$.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return a.ell(u,[.22,.14,.15],x.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],x.NOSE,{group:1}),si(a,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?x.MAGIC2:x.EYE),s&&Oo(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),ln(a,i,e,n,.6,r)}function wx(i,e,t,n,r="towards"){const s=e===2,a=new st,o=t?.05:0;for(const u of[-1,1])a.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?x.BODY:x.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:f=>An(f,14,.15)?x.BODY3:void 0}),a.ell([.05,.04,u*.4],[.16,.04,.08],u>0?x.BODY:x.BODY2,{group:u>0?6:2}),a.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?x.BODY:x.BODY2,{group:u>0?7:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,x.BODY,{paint:u=>u[1]<c[1]-.12?x.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?x.LINE:An(u,14,.22)?x.BODY3:void 0});for(const u of[-1,1]){const f=[.3,.55+o,u*.17];a.ell(f,[.1,.09,.1],x.BODY,{group:1}),a.ell(st.surface(f,[.1,.09,.1],$.norm([.6,.5,u*.5])),[.05,.05,.05],s?x.MAGIC2:x.IRIS,{group:1}),a.ell(st.surface(f,[.11,.1,.11],$.norm([.65,.45,u*.5])),[.03,.015,.03],x.EYE,{group:1})}return s&&hu(a,[.15,.66+o,0],.16),ln(a,i,e,n,.55,r)}function Tx(i,e,t,n,r="towards"){const s=e===2,a=e===1,o=h=>s&&i.legend.includes(h),c=new st,l=t?.02:0;for(const h of[-1,1]){const d=t&&h>0?.04:0;c.seg([0,.3,h*.08],[.03,.03+d,h*.08],.03,.025,x.NOSE,{group:h>0?7:2}),c.ell([.08,.02+d,h*.08],[.08,.015,.04],x.NOSE,{group:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],x.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],x.BODY,{dir:[1,.45,0]}),!o("wings"))for(const h of[-1,1])c.ell([-.1,.55+l,h*.2],[.45,.17,.05],x.BODY2,{dir:[-1,-.25,0],group:h>0?4:2});const u=[.36,.84+l,0],f=a?.19:.16;if(c.ell(u,[f*1.1,f,f*.95],x.BODY,{paint:h=>h[1]>u[1]+f*.55?x.BELLY:void 0}),c.ell($.add(u,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],x.NOSE,{dir:[1,-.2,0],group:1}),si(c,u,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,s?x.MAGIC2:x.EYE),o("wings"))for(const h of[-1,1])Bs(c,[-.05,.65+l,h*.18],h,1.1,t?.1:0,h>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(h>0?10:0));if(o("eyesRing"))for(let h=0;h<6;h++){const d=Math.PI*(.2+h/5*.6);c.ell([Math.cos(d)*.25-.1,.95+Math.sin(d)*.45,(h-2.5)*.12],[.06,.06,.06],x.MAGIC2,{group:95+h,extra:!0})}return ln(c,i,e,n,.75,r)}function Ax(i,e,t,n,r="towards"){const s=e===2,a=h=>s&&i.legend.includes(h),o=new st,c=t===0,l=.55,u=a("wingsBig")?1.5:1;uu(o,0,.3*u);for(const h of[-1,1]){const d=[0,l+.05,h*.1],g=[.05,l+(c?.35:-.05),h*.45*u],_=[[-.05,l+(c?.45:-.15),h*.85*u],[-.25,l+(c?.2:-.25),h*.75*u],[-.3,l+(c?0:-.25),h*.4*u]],m=a("wingsBig")?x.MAGIC:x.BODY2,p=a("wingsBig")?x.MAGIC2:x.BODY3;o.seg(d,g,.03,.025,p,{group:11});for(const w of _)o.seg(g,w,.02,.012,p,{group:11});const v=$.sub(_[0],d),E=$.norm(v),y=$.norm($.sub(_[2],g)),T=$.norm($.sub(y,$.mul(E,$.dot(y,E))));o.flat($.add($.lerp(d,_[0],.5),$.mul(T,.12*u)),E,T,Math.hypot(...v)*.55,.3*u,Mi.membrane(m),{group:10+(h>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],x.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],x.BODY,{group:1});for(const h of[-1,1])o.ell($.add(f,[-.02,.15,h*.07]),[.12,.045,.02],x.BODY,{dir:[.1,1,h*.3],up:[1,0,0],group:1,paint:d=>d[0]>f[0]-.01?x.EAR:void 0});return si(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?x.MAGIC2:x.EYE),o.ell(st.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],x.NOSE,{group:1}),ln(o,i,e,n,.55,r)}function Rx(i,e,t,n,r="towards"){const s=e===2,a=new st,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,x.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],x.SKIN,{group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],x.BODY,{paint:c=>c[1]>.45?x.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],x.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],x.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],x.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)a.ell($.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],x.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(st.surface([0,.3,0],[.52,.29,.33],$.norm([.85,.3,c*.35])),[.015,.015,.015],s?x.MAGIC2:x.EYE,{group:1});return s&&hu(a,[.15,.62,0],.15),ln(a,i,e,n,.55,r)}function Cx(i,e,t,n,r="towards"){const s=e===2,a=f=>s&&i.legend.includes(f),o=new st;for(const f of[-1,1])for(let h=0;h<3;h++){const d=.25-h*.25,g=(h+(f>0?1:0)+t)%2?.06:-.06,_=[d,.22,f*.2];o.chain([[..._,.03],[d+g+(1-h)*.06,.32,f*.42,.025],[d+g*1.5+(1-h)*.15,.02,f*.55,.015]],f>0?x.BODY2:x.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],x.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?x.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?x.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],x.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],x.BODY2,{group:1});const l=[.3,.5,.75][e]*(a("horn")?1.3:1),u=a("horn")?x.MAGIC:x.BODY3;for(const f of[-1,1]){const h=$.add(c,[.08,.02,f*.1]),d=$.add(h,[l*.7,l*.45,f*l*.15]),g=$.add(d,[l*.25,-l*.12,-f*l*.12]);o.chain([[...h,.045],[...d,.035],[...g,.015]],u,{group:8+(f>0?1:0)}),o.seg($.lerp(h,d,.55),$.add($.lerp(h,d,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const f of[-1,1])o.chain([[...$.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],x.BODY3,{group:9,extra:!0});return si(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.02,s?x.MAGIC2:x.GLINT),a("crystals")&&Oo(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),ln(o,i,e,n,.5,r)}function Lx(i,e,t,n,r="towards"){const s=e===2,a=new st,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],x.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],x.SKIN,{group:1});for(const u of[-1,1])a.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,x.SKIN,{group:5}),a.ell([.78+o,.57,u*.1],[.03,.03,.03],s?x.MAGIC2:x.EYE,{group:5});const c=[-.12,.4,0],l=s?x.MAGIC:x.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const f=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?x.MAGIC2:x.BODY3:void 0}}),ln(a,i,e,n,.45,r)}function Px(i,e,t,n,r="towards"){const s=e===2,a=new st;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,x.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],x.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],x.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?x.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?x.LINE:void 0)}),si(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?x.MAGIC2:x.EYE),s&&Oo(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),ln(a,i,e,n,.4,r)}function Dx(i,e,t,n,r="towards"){const s=e===2,a=e===1,o=d=>s&&i.legend.includes(d),c=new st,l=t?.7:0,u=[];for(let d=0;d<=12;d++){const g=d/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,x.BODY,{paint:d=>d[1]<.05&&d[0]<.35?x.BELLY:An([d[0]*1.5,d[1],d[2]],14,.3)?x.BODY3:void 0});const f=[.5,.5,u[13][2]*.8],h=a?.11:.09;if(c.ell(f,[h*1.5,h*.75,h],x.BODY,{dir:[1,-.15,0],group:1}),si(c,f,[h*1.5,h*.75,h],[[.5,.5,.7],[.5,.5,-.7]],h*.22,s?x.MAGIC2:x.EYE),t||c.seg($.add(f,[h*1.4,-h*.2,0]),$.add(f,[h*2.3,-h*.3,0]),.01,.008,x.SKIN,{group:1}),o("wings"))for(const d of[-1,1])Bs(c,[0,.2,d*.05],d,.9,t?.1:0,d>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(d>0?10:0));return ln(c,i,e,n,.45,r)}function Ix(i,e,t,n,r="towards"){const s=e===2,a=h=>s&&i.legend.includes(h),o=new st,c=t===0,l=.55,u=a("wingsBig")?1.45:1,f=a("wingsBig")?x.MAGIC:x.BODY;uu(o,0,.3*u);for(const h of[-1,1]){const d=c?.5:-.1,g=$.norm([.35,d,h]),_=$.norm([-.3,d*.6,h]);o.flat($.add([0,l,h*.05],$.mul(g,.38*u)),g,$.norm($.cross(g,[0,1,0])),.4*u,.24*u,Mi.spotted(f,x.BELLY,x.BODY3),{group:10+(h>0?1:0)}),o.flat($.add([-.05,l,h*.05],$.mul(_,.26*u)),_,$.norm($.cross(_,[0,1,0])),.27*u,.17*u,Mi.spotted(a("wingsBig")?x.MAGIC2:x.BODY2,x.BODY2,x.BODY2),{group:12+(h>0?1:0)}),o.chain([[.12,l+.08,h*.03,.015],[.2,l+.25,h*.1,.025],[.24,l+.32,h*.14,.012]],x.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],x.BELLY,{group:1,paint:h=>An(h,30,.25)?x.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],x.BELLY,{group:1}),si(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?x.MAGIC2:x.EYE),ln(o,i,e,n,.5,r)}function Nx(i,e,t,n,r="towards"){const s=e===2,a=l=>s&&i.legend.includes(l),o=new st,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,f=-.6+u*1.15;o.ell([f,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?x.MAGIC2:l%2?x.BODY2:x.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],x.MAGIC2,{group:3,paint:l=>l[1]<.2?x.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,x.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],x.BODY3,{group:1}),si(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?x.MAGIC2:x.EYE),ln(o,i,e,n,.4,r)}function Ux(i,e,t,n,r="towards"){const s=e===2,a=u=>s&&i.legend.includes(u),o=new st,c=[.15,.28,0];for(const u of[-1,1])for(let f=0;f<4;f++){const h=-.6+f*.4,d=(f+(u>0?0:1)+t)%2?.05:-.05,g=$.add(c,[.05-f*.04,0,u*.1]),_=$.add(g,[Math.cos(h)*.3*(f<2?1:-.6)+d,.3,u*.3]),m=$.add(g,[Math.cos(h)*.55*(f<2?1:-.8)+d*1.5,-.28,u*.55]);o.chain([[...g,.03],[..._,.028],[...m,.015]],u>0?x.BODY2:x.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],x.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?x.BELLY:void 0}),o.ell(c,[.18,.13,.17],x.BODY2,{group:1});const l=a("eyesRing");for(const[u,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(st.surface(c,[.18,.13,.17],$.norm([.9,u*6,f*4])),[.025,.025,.025],l?x.MAGIC2:x.EYE,{group:1});if(l)for(let u=0;u<5;u++){const f=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(u-2)*.12],[.06,.06,.06],x.MAGIC2,{group:95+u,extra:!0})}return ln(o,i,e,n,.5,r)}const Fx=new Map(Object.entries({owl:bx,hedgehog:Ex,toad:wx,raven:Tx,bat:Ax,mole:Rx,beetle:Cx,snail:Lx,woodlouse:Px,snake:Dx,moth:Ix,glowworm:Nx,spider:Ux})),fu=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:x.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],du=Object.fromEntries(fu.map(i=>[i.id,i]));function Ox(i,e){const t=du[i],n=e.cVal/.85,r=e.cSat/.6,s=Ee(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:Ee(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=Ee(e.magicHue+t.hue*.3,.6,1),c=Ee(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[x.BODY]:s,[x.BODY2]:Ee(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[x.BODY3]:Ee(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[x.BELLY]:a,[x.ACCENT]:l?[236,226,200]:Ee(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[x.MAGIC]:o,[x.MAGIC2]:c,[x.LEAF]:Ee(.3,.55,.55),[x.LEAF2]:Ee(.25,.5,.75),[x.LEAF3]:Ee(.33,.6,.35),[x.TRUNK]:Ee(.07,.45,.32),[x.EYE]:[24,18,30],[x.PUPIL]:[70,40,90],[x.GLINT]:[255,255,245],[x.NOSE]:[38,28,36],[x.EAR]:Ee(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[x.IRIS]:t.plan==="owl"?[255,176,40]:Ee(.12,.7,.85),[x.SKIN]:[238,158,192]}}const Bx=["size","growth","pixel","head","eye","legs","long","fur"],_r=new Map;function zx(i,e,t,n,r="towards"){const s=du[i]||fu[0],a=[s.id,e,t,r,...Bx.map(c=>n[c])].join("|");let o=_r.get(a);return o||(o=s.q?Mx(s,e,t,n,r):Fx.get(s.plan)(s,e,t,n,r),_r.size>600&&_r.delete(_r.keys().next().value),_r.set(a,o)),o}const Ls=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],kx={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function Gx(i=0){const[e,t,n]=kx[Ls[i%Ls.length].crystal];return{[x.STONE]:[78,80,94],[x.STONED]:[36,36,48],[x.MOSS]:[72,108,58],[x.CRYSTAL]:n,[x.RUNE]:e,[x.GLOW]:e,[x.MAGIC2]:t,[x.WOOD]:[150,96,52],[x.LINE]:[24,24,34]}}function ac(i,e,t){const n=Ls[i%Ls.length],r=new st({blend:.02}),s=t==="damaged",a=s?0:[0,.5,1][e%3],o=C=>s&&Mt(C,e,31)<.5;let c=0,l=1,u=.3,f=0,h=i*7;const d=(C,S,R,L)=>D=>{if(L&&Math.abs(Math.sin(D[0]*37+D[1]*23+Math.sin(D[2]*17)*2))<.07)return x.STONED;if(D[1]>C-.02&&(D[2]>S-.06||Mt(Math.floor(D[0]*30),Math.floor(D[2]*30),R)<.2)&&Mt(Math.floor(D[0]*40),Math.floor(D[2]*40),R+1)<.6)return x.MOSS},g=(C,S,R,L,D,V)=>{const N=o(V),P=1+a*.08;r.ell([C,S,R],[L*1.18,L*1.18,.06],x.STONED,{group:D,cut:!0}),r.ell([C,S,R-.02],[L*P,L*P,.035+a*.025],x.CRYSTAL,{group:900+V,paint:U=>{const k=Math.hypot(U[0]-C,U[1]-S)/(L*P);return N?k<.3?x.GLOW:x.CRYSTAL:k<.2+a*.15?x.MAGIC2:k<.5?x.GLOW:k<.78?x.CRYSTAL:x.GLOW}})},_=(C,S,R,L,D,V,N,P)=>U=>{if(U[0]>C+L-.022){const k=Math.min(R,D)*1.5,X=(V-D-U[2])/k+.5,j=(S-U[1])/k+.5;if(X>=0&&X<=1&&j>=0&&j<=1&&dc(X,j,N,.12))return s&&Mt(N,e,5)<.5?x.STONED:x.RUNE}return P(U)},m=n.tiers,p=m[0][1]*m[0][2][0]+.02,v=.08,E=m[0][2][2];r.box([0,v,u-E],[p,v,E],x.STONE,{group:l,round:.03,rough:.006,paint:d(v*2,u,3,s)}),r.box([0,v*.9,u],[p-.06,v*.45,.12],x.STONED,{group:l,cut:!0,paint:C=>C[2]<u-.07?x.GLOW:void 0});for(let C=1;C<m[0][1];C++)r.box([-p+C*p*2/m[0][1],v*.9,u-.06],[.015,v*.45,.06],x.STONE,{group:l});c=v*2,l++;const y=[];m.forEach(([C,S,[R,L,D]],V)=>{const N=C==="tweet"?.09:0,P=S*R*2+(S-1)*(C==="tweet"?.14:.01),U=u-V*.035,k=c+N+L;for(let X=0;X<S;X++){const j=-P/2+R+X*(R*2+(C==="tweet"?.14:.01));if(s&&C==="horn"&&X===S-1){y.push([j,R,L,D]);continue}const Z=s&&C==="tweet"?[1,.12*(X%2?1:-1),0]:void 0,te=s&&C==="tweet"?k-.04:k,F=d(te+L,U-D+D,l,s),re=X===S-1-(s&&C==="horn"?1:0)&&C!=="tweet";if(r.box([j,te,U-D],[R-.005,L,D],x.STONE,{group:l,round:.035,rough:.004,dir:Z,paint:re?_(j,te,L,R-.005,D,U,h++,F):F}),C==="bass"&&g(j,k+.02,U,Math.min(R,L)*.72,l,f++),C==="mid"&&(r.ell([j,k,U],[R*.8,L*.7,D*.9],x.STONED,{group:l,cut:!0,paint:ae=>ae[2]<U-D*.45?o(f)?x.STONED:x.GLOW:void 0}),r.box([j,k,U-D*.5],[.018,L*.6,D*.45],x.STONE,{group:l}),f++),C==="horn"){const ae=k+L*.25;r.seg([j,ae,U-D*1.5],[j,ae,U+.03],.03,Math.min(R,L)*.78,x.STONED,{group:l,cut:!0,paint:we=>we[2]<U-D*.55?o(f)?x.STONED:x.GLOW:void 0}),g(j,k-L*.6,U,L*.22,l,f++)}if(C==="tweet")for(const ae of[-.5,0,.5])g(j+ae*R*1.15,te,U,L*.55,l,f++);l++}if(C!=="tweet"){const X=s&&C==="horn"?R:0;r.box([-X,c+L*2+.012,U-.015],[P/2+.01-X,.012,.015],x.WOOD,{group:l++,round:.008}),c+=.024}C==="tweet"&&!s&&r.flat([0,c+N/2,U-D],[1,0,0],[0,1,0],P/2,N/2,(X,j)=>Math.abs(j)<.45&&Math.sin(X*23)>-.4?x.GLOW:null,{group:l++,bend:0}),c+=L*2+N});const T=c;if([[-p-.04,.25,.34,-.3],[p+.02,.2,.3,.35],[-p+.15,.4,.22,-.1],[p-.2,.42,.18,.2],[.1,.45,.16,.15],[-p-.1,-.25,.26,-.4],[p+.08,-.2,.24,.45]].forEach(([C,S,R,L],D)=>{if(s&&D%2){r.seg([C,.03,S],[C+.12,.05,S+.04],.04,.02,x.CRYSTAL,{group:700+D});return}const V=[C+L*R,R,S+.05];r.seg([C,0,S],V,.045+R*.05,.006,x.CRYSTAL,{group:700+D,paint:N=>N[1]>R*(.65-a*.1)&&!s?x.GLOW:void 0}),r.seg([C+.04,0,S-.03],[C+.04+L*R*.5,R*.55,S],.03,.005,x.CRYSTAL,{group:720+D})}),!s)for(const[C,S,R,L]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([C,T+S-.1,R],[L,L*.8,L],x.STONE,{group:800+Math.round(C*100),extra:!0,rough:.004});for(const[C,S,R,L]of y)r.box([C+.45,S*.75,u+.25],[S,R,L],x.STONE,{group:l++,dir:[.6,.8,.2],round:.035,rough:.007,paint:d(1,0,9,!0)});return{m:r,top:T}}function Hx(i){const e=new st({blend:.02}),t=(n,r)=>Mt(n,r,i*13+7);e.ell([.1,.1,.62],[.14,.12,.1],x.GLOW,{group:1,paint:n=>n[1]>.16?x.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,x.GLOW,{group:2,paint:n=>n[1]>.35?x.MAGIC2:x.CRYSTAL});for(let n=0;n<16;n++){const r=n*2.4,s=.15+t(n,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(n,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],x.STONE,{group:10+n,dir:[Math.cos(r*1.7),.4+t(n,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:u=>Math.abs(Math.sin(u[0]*41+u[1]*29))<.08?x.STONED:u[1]>l*.7+c*.6&&t(n,4)<.25?x.MOSS:void 0})}for(let n=0;n<4;n++){const r=n*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],x.CRYSTAL,{group:50+n,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(n,5)<.3?x.GLOW:void 0})}for(let n=0;n<4;n++){const r=-.7+n*.45;e.seg([r,0,.4-n*.1],[r+.1,.08+t(n,6)*.1,.42-n*.1],.03,.01,x.CRYSTAL,{group:60+n})}return e}function oc(i,e,t){let n=0;for(let r=0;r<2e3&&n<e;r++){const s=Math.floor(Mt(r,t,1)*i.w),a=Math.floor(Mt(r,t,2)*i.h*.7);i.get(s,a)||i.get(s+1,a)||i.get(s-1,a)||i.get(s,a+1)||i.get(s,a-1)||i.get(s,a+2)||(i.px(s,a,n%3?x.GLOW:x.MAGIC2),n++)}return i}const Vx=i=>cu(i)*3,ba=new Map;function Wx(i={},{variant:e=0,frame:t=0,state:n="playing"}={}){const r=Vx(i),s=e+":"+r;ba.has(s)||ba.set(s,En(ac(e,0,"playing").m,{height:r}).s);const a=ba.get(s);if(n==="destroyed")return oc(En(Hx(e),{scale:a}).sp,3,e*5+1);const{sp:o}=En(ac(e,t,n).m,{scale:a});return oc(o,n==="damaged"?4:10+t*2,e*5+t)}const Xx=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function Yx(){const i={};return Xx.forEach(e=>i[e.k]=e.v),i}const qx={broad:pc,fir:Mo,willow:mc,birch:gc,flat:_c};function Kx(i,e,t,n,r){const s=qx[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(n,a,t.treeSize*r*(e.scale||1)*Se(n,.9,1.1)),c=So(n,a,s);return e.dark&&(c[x.LEAF]=c[x.LEAF3],c[x.LEAF3]=Ee(i.leaf+.05,.7,.22)),c[x.NOSE]=[20,16,24],c[x.GLINT]=[235,235,240],{parts:Hu(o),colours:c}}function Zx(i,e,t,n,r){const s=mn[t].id,a=yo.find(d=>d.id===s),o=qu(s,i,{K:n,makeCanvas:r}),c=[],l=d=>c.push(d)-1,u={big:[],small:[],walls:[],set:null},f=(d,g)=>ti(d,g,i,"none",r),h=(d,g)=>{const{parts:_,colours:m}=Kx(a,d,i,xi(e*13+t*101+g*7+1),n);return{bot:l(f(_.bot,m)),top:l(f(_.top,m))}};a.big.forEach(([d,g],_)=>{if(d!=="tree"){u.big.push({bot:l(o.big[_].sp),top:null});return}const m=Math.max(1,Math.round(vc/a.big.length));for(let p=0;p<m;p++)u.big.push(h(g,_*17+p))}),a.small.forEach(([d,g],_)=>u.small.push(d==="tree"?h(g,500+_):{bot:l(o.small[_].sp),top:null}));for(const d of o.walls)u.walls.push(l(d.sp));return o.setPiece&&(u.set=a.set?.[0]==="tree"?h(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function $x(i,e,t){const n=[];for(const r of["towards","away"])for(let s=0;s<3;s++)for(let a=0;a<2;a++)n.push(ti(zx(e,s,a,i,r),Ox(e,i),i,i.cOutline,t));return n}const Jx=(i,e,t=!1)=>(t?6:0)+i*2+e;function Ps(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function go(i,e=2048){const n=[];let r=0,s=0,a=0,o=1;for(const h of i)r+h.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=h.w+1,a=Math.max(a,h.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),f=i.map((h,d)=>{const g=n[d],_=Ps(h.A,h.w,h.h),m=Ps(h.N,h.w,h.h);for(let p=0;p<h.h;p++){const v=p*h.w*4,E=((g.y+p)*o+g.x)*4;l.set(_.subarray(v,v+h.w*4),E),u.set(m.subarray(v,v+h.w*4),E)}return{uv:[g.x/o,g.y/c,(g.x+h.w)/o,(g.y+h.h)/c],w:h.w,h:h.h}});return{albedo:l,normal:u,width:o,height:c,frames:f}}function Qx(i,e){if(i.kind==="creature")return{px:go($x(i.style,i.id,e),2048)};const{sprites:t,layout:n,floor:r}=Zx(i.style,i.seed,i.id,i.K,e);return{px:go(t),layout:n,floor:{albedo:new Uint8Array(Ps(r.A,r.w,r.h)),normal:new Uint8Array(Ps(r.N,r.w,r.h)),w:r.w,h:r.h}}}function lc(i,e,t){const n=new Yi(i,e,t,rn,jt);return n.magFilter=Lt,n.minFilter=Lt,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=dn,n.needsUpdate=!0,n}function pu(i){return{albedo:lc(i.albedo,i.width,i.height),normal:lc(i.normal,i.width,i.height),frames:i.frames}}const os=(i,e=2048)=>pu(go(i,e));class jx{constructor(e,t,n){this.style=e,this.seed=t,this.K=2/n;const r=_x(e),s=c=>ti(vx(e,c),r,e,e.cOutline);this.witch=os([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})]),1024),this.stones=os([0,1,2,3].map(c=>this.stone(c)));const a=Qu(e);this.props=os([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(ti(Wx(e,{variant:c,frame:l,state:"playing"}),Gx(c),e,e.cOutline));if(this.soundsystems=os(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const u=new Worker(new URL(""+new URL("artWorker-Dv-yxxpp.js",import.meta.url).href,import.meta.url),{type:"module"}),f={w:u,busy:!1};u.onmessage=h=>{f.busy=!1,f.job=void 0,this.receive(h.data),this.dispatch()},u.onerror=()=>{this.useWorkers=!1,f.job&&this.queue.unshift(f.job),f.busy=!1,f.job=void 0},this.workers.push(f)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=xi(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new Kt(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,x.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,x.BODY2,{round:this.style.round,onlyOn:new Set([x.BODY]),density:.5,seed:e}),ti(s,{[x.BODY]:[178,174,162],[x.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=pu(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:Jx}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:Qx(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Ji=16,vt={uAmb:{value:new H},uMoon:{value:new H},uMoonDir:{value:new H(-.45,.75,.5).normalize()},uMoonBeam:{value:new H},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new H},uGlowRgb:{value:new H},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new H},uTime:{value:0},uLightPos:{value:Array.from({length:Ji},()=>new rt)},uLightCol:{value:Array.from({length:Ji},()=>new rt)},uLightCount:{value:0},uDisco:{value:new rt},uDiscoParams:{value:new rt},uDiscoColour:{value:new H(1,1,1)}};function ev(i,e,t,n=1){const r=(s,a)=>new H(s[0]/255*a,s[1]/255*a,s[2]/255*a);vt.uAmb.value.copy(r(Ee(i.ambientHue,.55,1),i.ambient*n)),vt.uMoon.value.copy(r(Ee(i.moonHue,.35,1),i.moon)),vt.uMoonBeam.value.copy(r(Ee(i.moonHue,.35,1),i.shafts*.25)),vt.uBands.value=i.bands,vt.uDither.value=i.dither*.5,vt.uShafts.value=i.shafts,vt.uShaftScale.value=t*2,vt.uGlowRgb.value.copy(r(Ee(i.glowHue,i.glowSat,1),1)),vt.uGlowR.value=e,vt.uGlowPower.value=i.glowPower,vt.uHazeColour.value.copy(r(Ee(i.ambientHue-.08,.55,1),.16*Math.sqrt(n)))}const ar=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Ji}], uLightCol[${Ji}];
uniform int uLightCount;
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;

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
  for (int i = 0; i < ${Ji}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    float ndl = max(0.0, dot(N, lv / max(ld, 1e-4))) * 0.7 + 0.3;
    float fall = 1.0 - ld / reach;
    l += uLightCol[i].rgb * lightStep(min(1.0, ndl * fall * fall * uLightCol[i].w));
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
`,Jn=2,Ut=32,di=8,tv=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,nv=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
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
${ar}
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
    vec2 cell = vec2(mod(float(t), ${di}.0), floor(float(t) / ${di}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
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
    if (leaves + edge < cover) moonK = 1.0 - uCanopy.x;
  }
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, moonK);
  gl_FragColor = vec4(haze(min(vec3(1.0), c * light * 1.25), vWorld), 1.0);
}
`;class iv{constructor(e,t,n,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*Jn/Ut)*Ut,l=Math.ceil(o*Jn/Ut)*Ut;this.tilesX=c/Ut,this.tilesZ=l/Ut,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=g=>(g.magFilter=g.minFilter=Lt,g.generateMipmaps=!1,g.colorSpace=dn,g.needsUpdate=!0,g);this.texture=u(new Yi(new Uint8Array(c*l*4),c,l)),u(this.tile),this.floors=u(new Yi(new Uint8Array(64*di*48*4*4),64*di,192));const f=Array.from({length:32},(g,_)=>new H(...mn[_]?.floor??[.25,.45,.4])),h=new Pt({vertexShader:tv,fragmentShader:nv,uniforms:{...vt,uAreas:{value:this.texture},uExtent:{value:new rt(s.minX,s.minZ,c/Jn,l/Jn)},uPixel:{value:r},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*di,192)},uSat:{value:n.sat},uFloor:{value:new H(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new rt},uCircle:{value:new rt},uSweeps:{value:Array.from({length:4},()=>new rt)},uSweepCount:{value:0},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new on(a+400,o+400);d.rotateX(-Math.PI/2),this.mesh=new Ft(d,h),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new Yi(new Uint8Array(Ut*Ut*4),Ut,Ut);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,n=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>n[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,n,r){this.mesh.material.uniforms.uCircle.value.set(e,t,n,r)}setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new Yi(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new We(t%di*n.w,Math.floor(t/di)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=Ut/Jn,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),u=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),h=(n-a.minX)/o,d=(r-a.minZ)/o,g=[];for(let p=u;p<=f;p++)for(let v=c;v<=l;v++)this.filled[p*this.tilesX+v]||g.push([v,p,(v+.5-h)**2+(p+.5-d)**2]);g.sort((p,v)=>p[2]-v[2]);const _=performance.now();let m=0;for(const[p,v]of g){if(m>0&&performance.now()-_>s)break;this.fillTile(e,p,v),m++}return g.length-m}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data,a=Ut/Jn,o=r.minX+t*a,c=r.minZ+n*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(u=>u.kind==="pond");for(let u=0;u<Ut;u++)for(let f=0;f<Ut;f++){const h=o+(f+.5)/Jn,d=c+(u+.5)/Jn,g=this.map.areaAt(h,d),_=(u*Ut+f)*4;let m=0;for(const p of l)Math.hypot(h-p.x,d-p.z)<3*p.size&&(m=255);s[_]=g.type,s[_+1]=Math.round(g.openness*255),s[_+2]=m,s[_+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*Ut,n*Ut)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const rv="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",sv=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,av=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,ov=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,lv=`
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
}`;function xr(i,e,t,n=!1){const r=new an(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=dn,r}class cv{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=xr(1,1,Tt,!0);const n=(r,s)=>new Pt({vertexShader:rv,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(sv,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(av,{uSrc:{value:null},uStep:{value:new We}}),composite:n(ov,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1}}),tilt:n(lv,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Ft(new on(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=xr(1,1,Tt);bloomB=xr(1,1,Tt);a=xr(1,1,Tt);b=xr(1,1,Tt);quad;cam=new No(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,n,r){this.low.set(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const f=this.bright.width,h=this.bright.height;this.pass("bright",this.bright,d=>{d.uScene.value=this.scene.texture,d.uThreshold.value=r.bloom.threshold});for(let d=0;d<2;d++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/h)})}const a=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",a?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=s?r.bloom.strength:0,f.uBlack.value=r.tone.black,f.uGamma.value=r.tone.gamma}),!a)return;const o=this.a.width,c=this.a.height,l=this.fullResolution?this.out.y/this.low.y:1,u=f=>{f.uTexel.value.set(1/o,1/c),f.uStrength.value=r.tiltShift.strength*l,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{u(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{u(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const uv=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,hv=`
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
}`,fv=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`;class dv{constructor(e,t,n,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new H(a.x,0,a.z);const o=new H(...Ee(s.circleHue2,.4,1).map(f=>f/255));this.ballMat=new Pt({vertexShader:uv,fragmentShader:hv,uniforms:{...n,uSize:{value:s.discoSize/2},uTime:vt.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Ft(new on(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Ft(new on(r,c).translate(0,c/2,0),new Pt({fragmentShader:fv,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=Ee(s.circleHue,.7,1);this.lightRgb=new H(l[0]/255,l[1]/255,l[2]/255);const u=vt;u.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),u.uDiscoColour.value.copy(o)}tuning;ball;beam;ballMat;lightRgb;centre;update(e,t){const n=this.tuning.dancefloor,r=.75+.25*Math.sin(e*n.pulse*Math.PI*2);t.setCircle(n.circleHue,n.circleHue2,.7+.3*r,e*n.runeSpeed/60*Math.PI*2);const s=n.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+n.discoSize/2,this.centre.z),vt.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:n.lightReach,rgb:this.lightRgb,strength:n.lightStrength*r}}}const pv=[new H(.25,.85,1),new H(.7,.4,1),new H(1,.65,.2)];class mv{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,n,r){const s=e.tuning.party,a=[],o=[],c=[],l=[this.homeSoundsystem(e)];for(const[,u]of e.party.areas){if(!u.soundsystem)continue;const f=u.from?e.map.siteOf(u.from[0],u.from[1]):null;l.push({...u.soundsystem,at:u.at,from:f})}for(const u of l){const f=s.transition>0?Math.min(1,(t-u.at)/s.transition):1,h=this.atlas.frames[u.variant*3+Math.floor(t*6)%3],d=h.h*this.metresPerPixel,g=ii((f-.55)/.45);if(f<1&&u.from){const m=(u.from.x+u.x)/2,p=(u.from.z+u.z)/2,v=Math.hypot(u.x-m,u.z-p)*1.6;c.push({x:m,z:p,radius:f*v,strength:1-ii((f-.8)/.2)})}g>0&&n(u.x,u.z,h.w*this.metresPerPixel,d)&&a.push({x:u.x,y:-(1-g)*d,z:u.z,frame:h,flip:!1,fresh:r(u.x,u.z,d)});const _=.85+.15*Math.sin(t*8);g>0&&o.push({x:u.x,y:3,z:u.z,reach:s.lightReach,rgb:pv[u.variant%3],strength:s.lightStrength*_*g*(1+(1-f)*2)})}return{items:a,lights:o,sweeps:c}}}function gv(i,e,t){const n=i.tuning,r=n.stringLights,s=i.siteOf(t[0],t[1]),a=u=>{const f=i.areaAt(u.x,u.z);return f.cell[0]===t[0]&&f.cell[1]===t[1]&&f.openness>n.clearingSize&&f.openness<n.clearingSize+n.clearingFalloff*.8},o=e.treesNear(s.x,s.z,i.areaSize*.75).filter(a).sort((u,f)=>Je(Math.round(u.x*10),Math.round(u.z*10),i.seed+501)-Je(Math.round(f.x*10),Math.round(f.z*10),i.seed+501)),c=new Set,l=[];for(const u of o){if(l.length>=r.perArea)break;if(c.has(u))continue;let f=null,h=1/0;for(const d of o){if(d===u||c.has(d))continue;const g=Math.hypot(u.x-d.x,u.z-d.z);g>=4&&g<=12&&g<h&&(h=g,f=d)}f&&(c.add(u),c.add(f),l.push({ax:u.x,az:u.z,bx:f.x,bz:f.z,seed:Math.floor(Je(Math.round(u.x*10),Math.round(f.z*10),i.seed+503)*1e6)}))}return l}const _v=`
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, time it switches on, sway (0 at the ends)
uniform float uWind, uNear, uTime;
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
  gl_PointSize = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`,xv=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying float vOn;
varying vec2 vB;
${ar}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b, vWorld), 1.0);
}`,vv=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,Mv=`
varying vec3 vWorld;
${ar}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`;class Sv{constructor(e,t){this.scene=e,this.game=t;const n=t.tuning.stringLights;this.palette=n.palette.map(s=>new et(s));const r={...vt,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Pt({vertexShader:_v,fragmentShader:xv,uniforms:{...r,uNear:{value:60},uTwinkle:{value:n.twinkle},uChase:{value:n.chaseSpeed}}}),this.wireMat=new Pt({vertexShader:vv,fragmentShader:Mv,uniforms:r})}scene;game;built=new Map;palette;bulbMat;wireMat;build(e,t){const n=this.game.tuning.stringLights,r=n.height,s=[],a=[],o=[],c=[],l=[];e.forEach((d,g)=>{const _=Math.hypot(d.bx-d.ax,d.bz-d.az),m=Math.max(2,Math.round(_/n.bulbSpacing)),p=v=>[d.ax+(d.bx-d.ax)*v,r-n.sag*4*v*(1-v)*(_/8),d.az+(d.bz-d.az)*v];for(let v=0;v<=16;v++){const E=p(v/16),y=p((v+1)/16);v<16&&(c.push(...E,...y),l.push(g+v/16,g+(v+1)/16))}for(let v=1;v<m;v++){const E=v/m,y=p(E),T=this.palette[(d.seed+v)%this.palette.length];s.push(...y),a.push(T.r,T.g,T.b),o.push((d.seed*13+v*7)%100/100,g*40+v,t(y[0],y[2])+v*.03,4*E*(1-E))}});const u=new Mr,f=new Zt;f.setAttribute("position",new kt(s,3)),f.setAttribute("aColour",new kt(a,3)),f.setAttribute("aBulb",new kt(o,4));const h=new Zt;return h.setAttribute("position",new kt(c,3)),h.setAttribute("aSway",new kt(l,1)),u.add(new sp(h,this.wireMat),new op(f,this.bulbMat)),u}update(e){const t=this.game,n=t.tuning.stringLights,r=[];if(!n.on)return r;for(const[s,a]of t.party.areas){let o=this.built.get(s);if(!o){const c=gv(t.map,t.forest,a.cell),l=t.map.siteOf(a.cell[0],a.cell[1]),u=a.from?t.map.siteOf(a.from[0],a.from[1]):null,f=u?(u.x+l.x)/2:l.x,h=u?(u.z+l.z)/2:l.z,d=u?Math.hypot(l.x-f,l.z-h)*1.6:1,g=t.tuning.party.transition,_=(m,p)=>a.wave===0?-1:a.at+Math.min(1,Math.hypot(m-f,p-h)/d)*g;o={lines:c,group:this.build(c,_),on:a.wave===0?-1:a.at},this.scene.add(o.group),this.built.set(s,o)}o.lines.forEach((c,l)=>{const u=this.palette[(c.seed+l)%this.palette.length];e>o.on&&r.push({x:(c.ax+c.bx)/2,y:n.height-1,z:(c.az+c.bz)/2,reach:10,rgb:new H(u.r,u.g,u.b),strength:n.glow})})}return r}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const yv=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,bv=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${ar}
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
}`;class Ev{constructor(e,t,n,r){this.height=t,this.mat=new Pt({vertexShader:yv,fragmentShader:bv,uniforms:{...vt,uStrength:{value:e},uWind:{value:n},uPixel:{value:r}},depthWrite:!1}),this.mesh=new Ft(new on(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const wv=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,Tv=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${ar}
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
}`;class Av{mesh;geo=new jc;attr;capacity=0;constructor(e){const t=new on(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const n=new Pt({vertexShader:wv,fragmentShader:Tv,uniforms:{...vt,uStrength:{value:e}},depthWrite:!1});this.mesh=new Ft(this.geo,n),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new Kc(new Float32Array(this.capacity*4),4),this.attr.setUsage(kc),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Fn={uRight:{value:new H(1,0,0)},uUp:{value:new H(0,1,0)},uFacing:{value:new H(0,0,1)},uTopFade:{value:0},uCutout:{value:new rt(0,0,0,1)},uDebugCull:{value:0}},Rv=`
uniform vec3 uRight, uUp;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec3 iFlags;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
void main() {
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}
`,Cv=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
${ar}
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
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a dithered hole round the witch, which closes as she rises.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = smoothstep(uCutout.z - uCutout.w, uCutout.z, d);
    if (bayer(gl_FragCoord.xy) >= max(shown, uTopFade)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(haze(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), vWorld), 1.0);
}
`;class Vi{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new on(1,1);r.translate(0,.5,0),this.geo=new jc,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Pt({vertexShader:Rv,fragmentShader:Cv,uniforms:{...vt,...Fn,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Ft(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,s)=>{const a=new Kc(new Float32Array(t*r),r);return a.setUsage(kc),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z,n[o*2]=a.frame.w*this.metresPerPixel,n[o*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class Lv{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new mx({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Ar,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new Qt(r.camera.fov,1,1,900),this.post=new cv(this.renderer,r),this.scene.background=new et(723478),ev(n,r.glowReach,this.mpp,r.tone.ambient),this.assets=new jx(n,t.seed,r.pixelSize),this.ground=new iv(t.map,t.forest,n,this.mpp),this.assets.onFloor=(u,f)=>this.ground.setFloor(u,f);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new Av(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new Ev(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),vt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new Vi(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new Vi(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const a=t.map.dancefloor,o=[],c=t.tuning.dancefloor.stones;for(let u=0;u<c;u++){const f=u/c*Math.PI*2+.3;o.push({x:a.x+Math.cos(f)*a.radius,y:0,z:a.z+Math.sin(f)*a.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(o),this.propBatch=new Vi(this.assets.props,this.mpp),this.scene.add(this.propBatch.mesh),this.partyView=new mv(this.assets.soundsystems,this.mpp),this.strings=new Sv(this.scene,t),this.soundBatch=new Vi(this.assets.soundsystems,this.mpp),this.scene.add(this.soundBatch.mesh),this.dancefloor=new dv(t.map,r,Fn,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam);const l=new Pt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Ft(new on(1.4,.7).rotateX(-Math.PI/2),l),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Kd;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;dancefloor;propBatch;partyView;strings;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<mn.length;e++)this.assets.prefetchType(e);for(const e of mn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new As;frustumTo=new As;cullCam=new Qt;box=new ir;m4=new St;v3=new H;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const n=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(n)*t.distance,t.tz+Math.cos(n)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,n=this.camera;n.updateMatrixWorld(),this.m4.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=hc({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=n.fov,o.aspect=n.aspect,o.near=n.near,o.far=n.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Mn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-n.x,c.z-n.z)+t;for(const u of[-1,1])for(const f of[-1,1]){const h=this.v3.set(u,f,1).unproject(o).sub(c).normalize();for(const d of[0,25]){let g=h.y<-.001?(d-c.y)/h.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+h.x*g,c.z+h.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,n,r,s){const a=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+s;return(e-a)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-n/2-s,-s,t-r-s),this.box.max.set(e+n/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,n*.5,n]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<.9&&Math.abs(o.y)<.9&&o.z<1)return!0}return!1}mark(e,t,n,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=`${e}|${t.toFixed(1)}|${n.toFixed(1)}|${r.toFixed(1)}|${s}`;return a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const n=this.tracks[e];if(t&&this.assets.pending===0&&n.before.size>0){const s=(a,o)=>{const[c,l,u,f]=a.split("|");this.inInnerView(+l,+u,+f)&&this.pops.push(`${o} ${c} ${(+l).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of n.now)n.before.has(a)||s(a,"appeared");for(const a of n.before)n.now.has(a)||s(a,"vanished")}n.before=n.now,n.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,s=n.viewMargin,a=il(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,u=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,f=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!u&&!f&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const h=this.viewRect(n.haze.far,s),d=(h.minX+h.maxX)/2,g=(h.minZ+h.maxZ)/2,_=Math.max(h.maxX-h.minX,h.maxZ-h.minZ)/2,m=[],p=vt.uMoonDir.value,v=-p.x/Math.max(.2,p.y),E=-p.z/Math.max(.2,p.y),y=new Map,T=(L,D)=>{let V=y.get(L);V||y.set(L,V=[]),V.push(D)},w=this.mpp;let C=0,S=0;for(const L of t.forest.treesNear(d,g,_)){const D=this.assets.typeArt(L.type);if(!D||!D.layout.big.length)continue;const V=D.atlas.frames,N=D.layout.big[L.variant%D.layout.big.length],P=V[N.top??N.bot];if(!this.inView(L.x,L.z,P.w*w,P.h*w,s))continue;const U=this.mark("tree",L.x,L.z,P.h*w);T(L.type,{x:L.x,y:0,z:L.z,frame:V[N.bot],flip:L.flip,fresh:U}),N.top!==null&&T(L.type,{x:L.x,y:0,z:L.z,frame:V[N.top],flip:L.flip,top:!0,fresh:U});const k=P.w*w,X=P.h*w*(N.top===null?.2:.6);m.push({x:L.x+v*X,z:L.z+E*X,w:k*.8,d:k*.45}),C++}const R=(L,D,V)=>{for(const N of D){const P=this.assets.typeArt(N.type);if(!P)continue;const U=V(P.layout);if(!U.length)continue;const k=U[N.variant%U.length],X=P.atlas.frames,j=X[k.bot],Z=X[k.top??k.bot];if(!this.inView(N.x,N.z,Z.w*w,Z.h*w,s))continue;const te=this.mark(L,N.x,N.z,Z.h*w);T(N.type,{x:N.x,y:0,z:N.z,frame:j,flip:N.flip,fresh:te}),k.top!==null&&T(N.type,{x:N.x,y:0,z:N.z,frame:X[k.top],flip:N.flip,top:!0,fresh:te}),m.push({x:N.x,z:N.z,w:j.w*w*.8,d:j.w*w*.3}),S++}};R("small",t.forest.bushesNear(d,g,_),L=>L.small),R("wall",t.forest.wallsNear(d,g,_),L=>L.walls.map(D=>({bot:D,top:null}))),R("setpiece",t.forest.setPiecesNear(d,g,_),L=>L.set===null?[]:[L.set]);for(const[L,D]of this.typeBatches)y.has(L)||D.set([]);for(const[L,D]of y)this.batchFor(this.typeBatches,L,()=>{const N=this.assets.typeArt(L);return N&&new Vi(N.atlas,w)})?.set(D);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,n.haze.far+s),this.stats.trees=C,this.stats.bushes=S,this.shadowList=m}drawCreatures(){const e=this.game,t=e.tuning.haze.far+20,n=new Map,r=[];let s=0;for(const a of e.creatures){if(Math.abs(a.x-e.witch.x)>t||Math.abs(a.z-e.witch.z)>t)continue;const o=this.assets.creatureArt(a.species);if(!o)continue;const c=o.atlas.frames[o.frame(a.level,a.moving?Math.floor(a.walk)%2:0,a.away)];if(!this.inView(a.x,a.z,c.w*this.mpp,c.h*this.mpp,4))continue;const l=this.mark("creature",a.homeX,a.homeZ,0,a.id);let u=n.get(a.species);u||n.set(a.species,u=[]),u.push({x:a.x,y:0,z:a.z,frame:c,flip:a.facing<0,fresh:l}),r.push({x:a.x,z:a.z,w:c.w*this.mpp*.7,d:c.w*this.mpp*.25}),s++}for(const[a,o]of this.creatureBatches)n.has(a)||o.set([]);for(const[a,o]of n)this.batchFor(this.creatureBatches,a,()=>{const l=this.assets.creatureArt(a);return l&&new Vi(l.atlas,this.mpp)})?.set(o);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(r))}fire=new H(1,.5,.16);runeCyan=new H(.3,.9,1);runeViolet=new H(.75,.45,1);runeGreen=new H(.45,1,.5);updateSources(e){const t=this.assets.props.frames,n=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=Je(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:13*s.size,rgb:this.fire,strength:1.6*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:10*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:1.1*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(n),this.forestLights=r}setLights(e,t,n){const r=Math.min(Ji,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-n)-l.reach})).sort((l,u)=>l.d-u.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=vt;let c=0;for(const{l,d:u}of s.slice(0,r)){const f=Math.min(1,Math.max(0,(a-u)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*f),c++}o.uLightCount.value=c,this.stats.lights=c}render(e,t=!0){const n=this.game,r=n.tuning,s=il(n),a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new H(0,Math.cos(a),-Math.sin(a)),l=new H(s.tx,s.ty,s.tz),u=l.dot(c),f=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(f/o)*o-f;const h=new H(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(h),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const d=r.spriteTilt;Fn.uUp.value.set(0,1,0).lerp(c,d).normalize(),Fn.uFacing.value.crossVectors(Fn.uRight.value,Fn.uUp.value).normalize();const g=nl(n.witch),_=r.canopyCutout;this.camera.updateMatrixWorld();const m=this.v3.set(n.witch.x,Ss(n.witch,r)*.5,n.witch.z).project(this.camera);Fn.uCutout.value.set((m.x*.5+.5)*this.width,(m.y*.5+.5)*this.height,.5*_.screenFraction*this.width*(1-g),Math.max(1,_.edge*this.width*(1-g))),Fn.uTopFade.value=g,Fn.uDebugCull.value=this.debugCull?1:0;const p=n.witch,v=Ss(p,r);vt.uGlowPos.value.set(p.x,v+r.glowHeight,p.z),vt.uHazeCentre.value.set(p.x,p.z),this.updateSources(e);const E=this.partyView.update(n,e,(w,C,S,R)=>this.inView(w,C,S,R,4),()=>!1);this.soundBatch.set(E.items),this.ground.setSweeps(E.sweeps),this.setLights([this.dancefloor.update(e,this.ground),...E.lights,...this.strings.update(e),...this.forestLights],p.x,p.z),vt.uTime.value=e,this.mist?.follow(s.tx,s.tz);const y=Math.sin(e*2.4)*.12,T=p.lean?6+(p.away?1:0):(p.away?3:0)+Math.floor(e*4)%3;this.witchBatch.set([{x:p.x,y:v+y-.4,z:p.z,frame:this.assets.witch.frames[T],flip:p.facing<0}]),this.shadow.position.set(p.x,.03,p.z),this.shadow.scale.setScalar(1-.5*nl(p)),this.refresh(),this.drawCreatures(),this.checkPops("moving"),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),p.x,p.z,4),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const Pv="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Dv="Lab default",Iv={},Nv={_readme:Pv,name:Dv,style:Iv};function Uv(i=Nv){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=Yx();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function Fv(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",h=>{if(!(h.pointerType==="mouse"||s!==null)){c(),s=h.pointerId,a=h.clientX,o=h.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(h.pointerId)}catch{}h.preventDefault()}}),l.addEventListener("pointermove",h=>{if(h.pointerId!==s)return;let d=h.clientX-a,g=h.clientY-o;const _=Math.hypot(d,g);_>r&&(d*=r/_,g*=r/_),n.style.transform=`translate(${d}px, ${g}px)`;const m=Math.min(1,_/r),p=.15,v=m<p?0:(m-p)/(1-p)/Math.max(1e-6,m);e.x=d/r*v,e.y=g/r*v});const u=h=>{h.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const f=(h,d)=>{const g=i.querySelector(h);g.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),d(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",h=>{c(),h.touches.length===3&&(e.debug=!0)},{passive:!0})}const Ln=new URLSearchParams(location.search);let _i=th(Ln.get("seed"));_i===null&&(_i=Math.floor(Math.random()*1e6),Ln.set("seed",String(_i)),history.replaceState(null,"","?"+Ln.toString()+location.hash));const sn={...Ci,bloom:{...Ci.bloom},tiltShift:{...Ci.tiltShift},shadows:{...Ci.shadows},canopyShadow:{...Ci.canopyShadow},mist:{...Ci.mist}};Ln.get("shadows")==="off"&&(sn.shadows.on=!1);Ln.get("canopy")==="off"&&(sn.canopyShadow.on=!1);Ln.get("mist")==="off"&&(sn.mist.on=!1);const ls=Ln.get("tilt");ls==="off"?sn.tiltShift.on=!1:(ls==="before"||ls==="after")&&(sn.tiltShift.on=!0,sn.tiltShift.where=ls);Ln.get("bloom")==="off"&&(sn.bloom.on=!1);const Vt=Th(_i,sn),Ov=document.getElementById("game"),Ea=Uv(),tr=new Lv(Ov,Vt,{...Ea,pixel:sn.pixelSize,treeSize:Ea.treeSize*sn.treeHeight,crownWidth:Ea.crownWidth*sn.crownWidth/sn.treeHeight});tr.debugCull=Ln.get("debug")==="cull";const or=new Zf;document.getElementById("next-wave").addEventListener("pointerdown",i=>{i.preventDefault(),or.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",i=>{i.preventDefault(),or.touch.pauseWaves=!0});Fv(document.body,or.touch);document.getElementById("version").textContent="v27 · ef8a47d";const Bv=document.getElementById("seed");Bv.innerHTML=`seed <a href="?seed=${_i}">${_i}</a>`;const _o=document.getElementById("debug"),Bo=document.getElementById("start"),mu=document.getElementById("debug-buttons"),zo=document.getElementById("wave"),zv=zo.querySelector(".fill"),kv=zo.querySelector(".label");let pi=Ln.has("debug");_o.classList.toggle("on",pi);mu.classList.toggle("on",pi);const gu=()=>tr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",gu);gu();let zs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await tr.prepare(),zs=!0,Bo.classList.remove("loading")},0));let cc=null;function _u(){if(!zs||!Vt.clock.paused)return!1;try{cc??=new AudioContext,cc.resume()}catch{}return Vt.clock.paused=!1,Bo.style.display="none",or.clearPresses(),!0}or.onAny=_u;Bo.addEventListener("pointerdown",i=>{i.preventDefault(),_u()});document.addEventListener("visibilitychange",()=>{document.hidden&&(xs=0)});let xs=0,uc=60,wa=0,cs=0;function xu(i){requestAnimationFrame(xu);const e=xs?(i-xs)/1e3:0;xs=i,wa++,cs+=e,cs>=.5&&(uc=wa/cs,wa=0,cs=0);const t=or.read();if(t.debug&&(pi=!pi,_o.classList.toggle("on",pi),mu.classList.toggle("on",pi)),Ah(Vt,t,e),!zs)return;const n=bh(Vt.party,Vt.map,Vt.clock.time);if(zv.style.height=`${(1-n.gone)*100}%`,kv.textContent=`wave ${Vt.party.wave} · ${Vt.party.areas.size} areas · ${Math.ceil(n.left)} s`,zo.classList.toggle("paused",Vt.party.paused),tr.render(i/1e3),pi){const r=Vt.witch,s=tr.stats;_o.textContent=[`fps    ${uc.toFixed(0)}`,`seed   ${_i}`,`area   ${Sc(Vt)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${Vt.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(xu);window.witch={game:Vt,view:tr,areaUnderWitch:()=>Sc(Vt),get ready(){return zs}};
