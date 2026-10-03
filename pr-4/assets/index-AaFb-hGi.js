(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Bi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Nt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const On=(i,e,t)=>i+(e-i)*t,Yi=(i,e,t)=>Math.min(t,Math.max(e,i)),Zr=i=>{const e=Yi(i,0,1);return e*e*(3-2*e)};function xc(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=Yi(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n}}function vc(i,e,t,n,r){const s=Math.max(1,r.camera.zoomSteps),a=Yi(i.zoomStep+Math.sign(e),0,s-1),c=s>1?a/(s-1):0,o=1-Math.exp(-8*n),l=1-Math.exp(-r.camera.follow*n);return{zoomStep:a,zoom:i.zoom+(c-i.zoom)*o,tx:i.tx+(t.x-i.tx)*l,ty:i.ty+(t.y-i.ty)*l,tz:i.tz+(t.z-i.tz)*l}}function Mc(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=Zr(e),a=On(On(n.angleIn,n.angleOut,i.zoom),On(r.angleIn,r.angleOut,i.zoom),s),c=On(On(n.distanceIn,n.distanceOut,i.zoom),On(r.distanceIn,r.distanceOut,i.zoom),s),o=a*Math.PI/180;return{angle:a,distance:c,x:i.tx,y:i.ty+Math.sin(o)*c,z:i.tz+Math.cos(o)*c,tx:i.tx,ty:i.ty,tz:i.tz}}const Sc=.1,Ec=()=>({time:0,paused:!0});function bc(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Sc,e);return i.time+=t,t}const yc=[{id:"type-01",name:"Green broadleaf wood",leafHue:0,trees:["wBroad"],creature:"wolf",groundHue:0},{id:"type-02",name:"Blue fir forest",leafHue:.26,trees:["wFir"],creature:"fox",groundHue:.031},{id:"type-03",name:"Autumn oak wood",leafHue:-.22,trees:["wBroad","wFlat"],creature:"badger",groundHue:-.026},{id:"type-04",name:"Silver birch grove",leafHue:.08,trees:["wBirch"],creature:"boar",groundHue:.01},{id:"type-05",name:"Weeping willow marsh",leafHue:.04,trees:["wWillow"],creature:"stag",groundHue:.005},{id:"type-06",name:"Fern gully",leafHue:-.04,trees:["wPalm"],creature:"hare",groundHue:-.005},{id:"type-07",name:"Flat-crowned heath",leafHue:-.12,trees:["wFlat"],creature:"owl",groundHue:-.014},{id:"type-08",name:"Deep pine forest",leafHue:.18,trees:["wFir","wBroad"],creature:"bear",groundHue:.022},{id:"type-09",name:"Golden birch wood",leafHue:-.16,trees:["wBirch"],creature:"hedgehog",groundHue:-.019},{id:"type-10",name:"Teal willow fen",leafHue:.2,trees:["wWillow","wPalm"],creature:"squirrel",groundHue:.024},{id:"type-11",name:"Red maple wood",leafHue:-.3,trees:["wBroad"],creature:"toad",groundHue:-.036},{id:"type-12",name:"Violet fir hollow",leafHue:.42,trees:["wFir"],creature:"otter",groundHue:.05},{id:"type-13",name:"Lime fern dell",leafHue:-.08,trees:["wPalm","wBirch"],creature:"lynx",groundHue:-.01},{id:"type-14",name:"Copper heath",leafHue:-.26,trees:["wFlat","wBirch"],creature:"elk",groundHue:-.031},{id:"type-15",name:"Sea-green willows",leafHue:.14,trees:["wWillow"],creature:"raven",groundHue:.017},{id:"type-16",name:"Indigo pinewood",leafHue:.34,trees:["wFir","wFlat"],creature:"bat",groundHue:.041},{id:"type-17",name:"Olive broadleaf thicket",leafHue:-.06,trees:["wBroad","wWillow"],creature:"mole",groundHue:-.007},{id:"type-18",name:"Rose-leaf grove",leafHue:.62,trees:["wBroad","wBirch"],creature:"beaver",groundHue:.074},{id:"type-19",name:"Cyan fern hollow",leafHue:.24,trees:["wPalm"],creature:"stoat",groundHue:.029},{id:"type-20",name:"Amber flat-crowns",leafHue:-.19,trees:["wFlat"],creature:"beetle",groundHue:-.023},{id:"type-21",name:"Mossy oakwood",leafHue:.02,trees:["wBroad","wFlat"],creature:"wolf",groundHue:.002},{id:"type-22",name:"Frost fir ridge",leafHue:.3,trees:["wFir","wBirch"],creature:"fox",groundHue:.036},{id:"type-23",name:"Rust willow bog",leafHue:-.24,trees:["wWillow"],creature:"boar",groundHue:-.029},{id:"type-24",name:"Jade birch wood",leafHue:.1,trees:["wBirch","wPalm"],creature:"stag",groundHue:.012},{id:"type-25",name:"Plum fern wood",leafHue:.52,trees:["wPalm","wBroad"],creature:"owl",groundHue:.062},{id:"type-26",name:"Yellow broadleaf",leafHue:-.13,trees:["wBroad"],creature:"bear",groundHue:-.016},{id:"type-27",name:"Blue-green flat-crowns",leafHue:.16,trees:["wFlat","wFir"],creature:"hare",groundHue:.019},{id:"type-28",name:"Magenta willow glade",leafHue:.7,trees:["wWillow","wBirch"],creature:"squirrel",groundHue:.084},{id:"type-29",name:"Dark fir wood",leafHue:.22,trees:["wFir"],creature:"elk",groundHue:.026},{id:"type-30",name:"Ochre fern heath",leafHue:-.1,trees:["wPalm","wFlat"],creature:"raven",groundHue:-.012}],Tc={types:yc};function Ac(i,e){const t=new Map,n=new Map,r=(o,l,h)=>(o*2097152+(l+1048576))*2097152+(h+1048576),s=(o,l,h)=>{const d=r(o,l,h);let u=t.get(d);if(!u){const p=Math.pow(2,-o);u=[p*(l+Nt(l*7+o,h,i)),p*(h+Nt(l,h*13+o,i+1))],t.set(d,u)}return u},a=(o,l,h)=>{const d=Math.pow(2,-o),u=Math.floor(l/d),p=Math.floor(h/d);let g=u,_=p,m=1/0;for(let f=-2;f<=2;f++)for(let M=-2;M<=2;M++){const y=s(o,u+f,p+M),S=(y[0]-l)**2+(y[1]-h)**2;S<m&&(m=S,g=u+f,_=p+M)}return[g,_]},c=(o,l,h)=>{const d=r(o,l,h);let u=n.get(d);if(u)return u;if(o===0)u=[l,h];else{const p=s(o,l,h),g=a(o-1,p[0],p[1]);u=c(o-1,g[0],g[1])}return n.set(d,u),u};return{seed:i,depth:e,site:(o,l)=>s(0,o,l),partition(o,l){const h=a(e,o,l);return c(e,h[0],h[1])},centreness(o,l,h){const d=s(0,h[0],h[1]),u=Math.hypot(o-d[0],l-d[1]);let p=1/0;const g=Math.floor(o),_=Math.floor(l);for(let m=-2;m<=2;m++)for(let f=-2;f<=2;f++){const M=g+m,y=_+f;if(M===h[0]&&y===h[1])continue;const S=s(0,M,y);p=Math.min(p,Math.hypot(o-S[0],l-S[1]))}return Math.min(1,2*u/(u+p))},openness(o,l){let h=1/0,d=1/0;const u=Math.floor(o),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const m=s(0,u+g,p+_),f=Math.hypot(o-m[0],l-m[1]);f<h?(d=h,h=f):f<d&&(d=f)}return Math.min(1,2*h/(h+d))}}}const er=Tc.types,yi=(i,e)=>i+","+e;function wc(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function Bc(i,e,t,n){const r=new Map,s=(o,l)=>{if(o[0]===l[0]&&o[1]===l[1])return;const h=yi(o[0],o[1]),d=yi(l[0],l[1]);r.has(h)||r.set(h,new Set),r.has(d)||r.set(d,new Set),r.get(h).add(d),r.get(d).add(h)},a=(t-e)*n;let c=[];for(let o=0;o<=a;o++){const l=[];for(let h=0;h<=a;h++){const d=i.partition(e+h/n,e+o/n);l.push(d),h>0&&s(d,l[h-1]),o>0&&s(d,c[h])}c=l}return r}function Rc(i,e){const t=e.mapAreas,n=2,r=e.areaSize,s=er.length,a=Ac(i,e.borderLayers),c=-n,o=t+n,l=Bc(a,c,o,6),h=new Map,d=Bi(i*5+1);for(let v=c;v<o;v++)for(let w=c;w<o;w++){const P=new Set;for(let X=-2;X<=2;X++)for(let N=-2;N<=2;N++){const V=h.get(yi(w+N,v+X));V!==void 0&&P.add(V)}for(const X of l.get(yi(w,v))??[]){const N=h.get(X);N!==void 0&&P.add(N)}const U=[...Array(s).keys()].filter(X=>!P.has(X)),z=U.length?U:[...Array(s).keys()];h.set(yi(w,v),z[Math.floor(d()*z.length)])}const u=(v,w)=>h.get(yi(v,w))??Math.floor(Nt(v,w,i+17)*s),p=Math.floor(t/2),g=(v,w)=>{const P=a.site(v,w),U=a.partition(P[0],P[1]);return U[0]===v&&U[1]===w};let _=[p,p];for(const[v,w]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(g(p+v,p+w)){_=[p+v,p+w];break}const m=(v,w)=>{const P=a.site(v,w);return{x:P[0]*r,z:P[1]*r}},f=m(_[0],_[1]),M=e.clearingSize*.75,y=(v,w)=>{const P=v/r,U=w/r,z=a.partition(P,U);return{cell:z,type:u(z[0],z[1]),openness:a.openness(P,U)}},S=4.5,T=S*2.2,A=(v,w)=>{if(Math.hypot(v-f.x,w-f.z)<T)return 0;const P=a.openness(v/r,w/r);return Math.min(1,Math.pow(Math.max(0,(P-M)/Math.max(.01,e.clearingEdge)),1.6))*e.treeDensity},R=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:a,centreCell:_,dancefloor:{x:f.x,z:f.z,radius:S},start:{x:f.x,z:f.z+2},bounds:{minX:R,maxX:t*r-R,minZ:R,maxZ:t*r-R},extent:{minX:c*r,maxX:o*r,minZ:c*r,maxZ:o*r},typeOf:u,areaAt:y,siteOf:m,treeWeight:A,neighbours:l}}const Cc=(i,e)=>i.tuning.clearingSize*.75*i.areaSize*.5*(e===2?.55:.8);function Pc(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell,a=`${r+1},${s}`;for(let c=0;c<i.n;c++)for(let o=0;o<i.n;o++){const l=Bi(i.seed*7919+o*131+c*977+3),h=er[i.typeOf(o,c)],d=i.siteOf(o,c),u=g=>{const _=Cc(i,g),m=l()*Math.PI*2,f=Math.sqrt(l())*_,M=d.x+Math.cos(m)*f,y=d.z+Math.sin(m)*f;return{id:n++,species:h.creature,cell:[o,c],level:g,homeX:d.x,homeZ:d.z,range:_,x:M,z:y,tx:M,tz:y,rest:l()*3,speed:(g===2?t.legendSpeed:t.creatureSpeed)*(.7+l()*.6),facing:l()<.5?1:-1,moving:!1,walk:l(),rand:Bi(i.seed*31+n*7+11)}},p=Math.max(0,t.creaturesPerClearing+Math.floor(l()*3)-1);for(let g=0;g<p;g++)e.push(u(l()<.6?0:1));(`${o},${c}`===a||Nt(o,c,i.seed+41)<t.legendChance)&&e.push(u(2))}return e}function Lc(i,e){if(i.rest>0){i.rest-=e,i.moving=!1;return}const t=i.tx-i.x,n=i.tz-i.z,r=Math.hypot(t,n);if(r<.05){const a=i.rand()*Math.PI*2,c=Math.sqrt(i.rand())*i.range;i.tx=i.homeX+Math.cos(a)*c,i.tz=i.homeZ+Math.sin(a)*c,i.rest=.8+i.rand()*3.5,i.moving=!1;return}const s=Math.min(r,i.speed*e);i.x+=t/r*s,i.z+=n/r*s,Math.abs(t)>.02&&(i.facing=t>0?1:-1),i.moving=!0,i.walk+=e*(i.level===2?1.5:4)}const La=6,cl=4,Kt=32;function Dc(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function Ic(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],c=Dc(i),o=i.tuning.crownHalfWidth,l=Math.ceil(t*Kt/r),h=Math.ceil((t+1)*Kt/r);for(let d=l;d<h;d++){const u=d&1?.5:0,p=Math.ceil(e*Kt/n-u),g=Math.ceil((e+1)*Kt/n-u);for(let _=p;_<g;_++){const m=(_+u+(Nt(_,d,s+101)-.5)*.7)*n,f=(d+(Nt(_,d,s+102)-.5)*.7)*r;if(Nt(_,d,s+103)>=i.treeWeight(m,f)||i.treeWeight(m,f-c)===0||i.treeWeight(m-o,f-c)===0||i.treeWeight(m+o,f-c)===0)continue;const M=i.areaAt(m,f);a.push({x:m,z:f,type:M.type,variant:Math.floor(Nt(_,d,s+104)*La),flip:Nt(_,d,s+105)<.5})}}return a}function Nc(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*Kt/n),c=Math.ceil((t+1)*Kt/n),o=Math.ceil(e*Kt/n),l=Math.ceil((e+1)*Kt/n);for(let h=a;h<c;h++)for(let d=o;d<l;d++){const u=(d+(Nt(d,h,r+201)-.5)*.9)*n,p=(h+(Nt(d,h,r+202)-.5)*.9)*n;Nt(d,h,r+203)>(.12+Math.min(1,i.treeWeight(u,p))*.3)*i.tuning.bushDensity||s.push({x:u,z:p,type:i.areaAt(u,p).type,variant:Math.floor(Nt(d,h,r+204)*cl),flip:Nt(d,h,r+205)<.5})}return s}class Uc{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/Kt);s<=Math.floor((t+n)/Kt);s++)for(let a=Math.floor((e-n)/Kt);a<=Math.floor((e+n)/Kt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[c,o]of this.chunks(n,r,s)){const l=c+","+o;let h=e.get(l);h||(h=t(c,o),e.set(l,h));for(const d of h)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>Ic(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>Nc(this.map,r,s),e,t,n)}}function Fc(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Da=(i,e)=>On(e.groundHeight,e.treetopHeight,Zr(i.lift)),io=i=>Zr(i.lift);function Oc(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let c=e.moveX,o=e.moveZ;const l=Math.hypot(c,o);l>1&&(c/=l,o/=l);const h=On(n.groundSpeed,n.treetopSpeed,Zr(a)),d=1-Math.exp(-n.acceleration*t);let u=i.vx+(c*h-i.vx)*d,p=i.vz+(o*h-i.vz)*d,g=i.x+u*t,_=i.z+p*t;(g<r.minX||g>r.maxX)&&(g=Yi(g,r.minX,r.maxX),u=0),(_<r.minZ||_>r.maxZ)&&(_=Yi(_,r.minZ,r.maxZ),p=0);const m=u>.3?1:u<-.3?-1:i.facing;return{x:g,z:_,vx:u,vz:p,lift:a,mode:s,facing:m}}function zc(i,e){const t=Rc(i,e),n=Fc(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Uc(t),creatures:Pc(t),clock:Ec(),witch:n,camera:xc(e,n.x,Da(n,e),n.z)}}function kc(i,e,t){const n=bc(i.clock,t);if(n!==0){i.witch=Oc(i.witch,e,n,i.tuning,i.map.bounds),i.camera=vc(i.camera,e.zoom,{x:i.witch.x,y:Da(i.witch,i.tuning),z:i.witch.z},n,i.tuning);for(const r of i.creatures)Lc(r,n)}}const Hc=i=>Mc(i.camera,i.witch.lift,i.tuning);function ul(i){const e=i.map.areaAt(i.witch.x,i.witch.z);return er[e.type].name}const Gc="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Wc="The forest: 20 x 20 areas cut by the fractal partition; borderLayers sets how wiggly borders are.",Vc=20,Xc=28,Yc=4,qc="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how large the open middle of each area is; clearingEdge: how gradually trees thin toward it (small is a sharp edge); trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Kc=.9,Zc=.55,$c=.3,Jc=1,Qc=5,jc=3,eu=4.5,tu=5,nu=3.4,iu="Speeds per mode, and how long rising and descending take.",ru=6,su=14,au=10,ou=.7,lu=.55,cu=1.4,uu=11,hu="Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",du={fov:32,ground:{angleIn:34,angleOut:48,distanceIn:26,distanceOut:52},treetop:{angleIn:50,angleOut:62,distanceIn:40,distanceOut:80},zoomSteps:4,startZoom:1,follow:6},fu="pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",pu=2,mu=8,gu=1,_u=1,xu=16,vu=70,Mu="Per clearing: how many babies and young; legendChance: the share of areas with a legend in their clearing.",Su=3,Eu=.08,bu=.6,yu=.35,Tu={_readme:Gc,_map:Wc,mapAreas:Vc,areaSize:Xc,borderLayers:Yc,_trees:qc,treeDensity:Kc,clearingSize:Zc,clearingEdge:$c,bushDensity:Jc,treeSpacingX:Qc,treeSpacingZ:jc,crownHalfWidth:eu,crownHeight:tu,bushSpacing:nu,_witch:iu,groundSpeed:ru,treetopSpeed:su,acceleration:au,riseTime:ou,descendTime:lu,groundHeight:cu,treetopHeight:uu,_camera:hu,camera:du,_look:fu,pixelSize:pu,glowReach:mu,glowHeight:gu,spriteTilt:_u,artPixelsPerMetre:xu,drawRadius:vu,_creatures:Mu,creaturesPerClearing:Su,legendChance:Eu,creatureSpeed:bu,legendSpeed:yu},hl=Tu;class Au{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let n=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),s=t("Space"),a=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),c=t("Backquote");this.pressed.clear();const o=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of o){if(!d)continue;const u=S=>!!d.buttons[S]?.pressed,g=d.buttons.some((S,T)=>S.pressed&&!this.padPrev[T])&&!!this.onAny?.(),_=S=>!g&&u(S)&&!this.padPrev[S];let m=d.axes[0]??0,f=d.axes[1]??0;const M=Math.hypot(m,f),y=.18;if(M<y)m=0,f=0;else{const S=(Math.min(1,M)-y)/(1-y)/M;m*=S,f*=S}m+=(u(15)?1:0)-(u(14)?1:0),f+=(u(13)?1:0)-(u(12)?1:0),n+=m,r+=f,_(0)&&(s=!0),(_(4)||_(6))&&(a+=1),(_(5)||_(7))&&(a-=1),_(8)&&(c=!0),this.padPrev=d.buttons.map(S=>S.pressed);break}const l=this.touch;n+=l.x,r+=l.y,l.toggle&&(s=!0),a+=l.zoom,l.debug&&(c=!0),l.toggle=!1,l.zoom=0,l.debug=!1;const h=Math.hypot(n,r);return h>1&&(n/=h,r/=h),{moveX:n,moveZ:r,toggleMode:s,zoom:Math.sign(a),debug:c}}}const Ia="186",wu=0,ro=1,Bu=2,Pr=1,Ru=2,Gi=3,ei=0,Ut=1,bn=2,An=0,Xi=1,so=2,ao=3,oo=4,Cu=5,Ei=100,Pu=101,Lu=102,Du=103,Iu=104,Nu=200,Uu=201,Fu=202,Ou=203,dl=204,fl=205,zu=206,ku=207,Hu=208,Gu=209,Wu=210,Vu=211,Xu=212,Yu=213,qu=214,Hs=0,Gs=1,Ws=2,qi=3,Vs=4,Xs=5,Ys=6,qs=7,pl=0,Ku=1,Zu=2,fn=0,ml=1,gl=2,_l=3,xl=4,vl=5,Ml=6,Sl=7,El=300,ti=301,Ri=302,os=303,ls=304,$r=306,Ks=1e3,yn=1001,Zs=1002,Et=1003,$u=1004,ar=1005,Ct=1006,cs=1007,Jn=1008,Ht=1009,bl=1010,yl=1011,Ki=1012,Na=1013,mn=1014,hn=1015,gn=1016,Ua=1017,Fa=1018,Zi=1020,Tl=35902,Al=35899,wl=1021,Bl=1022,Zt=1023,Rn=1026,Qn=1027,Rl=1028,Oa=1029,ni=1030,za=1031,ka=1033,Lr=33776,Dr=33777,Ir=33778,Nr=33779,$s=35840,Js=35841,Qs=35842,js=35843,ea=36196,ta=37492,na=37496,ia=37488,ra=37489,Or=37490,sa=37491,aa=37808,oa=37809,la=37810,ca=37811,ua=37812,ha=37813,da=37814,fa=37815,pa=37816,ma=37817,ga=37818,_a=37819,xa=37820,va=37821,Ma=36492,Sa=36494,Ea=36495,ba=36283,ya=36284,zr=36285,Ta=36286,Ju=3200,lo=0,Qu=1,un="",Yt="srgb",$i="srgb-linear",kr="linear",ot="srgb",us=7680,ju=519,eh=512,th=513,nh=514,Ha=515,ih=516,rh=517,Ga=518,sh=519,ah=35044,oh=35048,co="300 es",dn=2e3,Hr=2001;function lh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ch(){const i=Gr("canvas");return i.style.display="block",i}const uo={};function ho(...i){const e="THREE."+i.shift();console.log(e,...i)}function Cl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=Cl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function et(...i){i=Cl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ai(...i){const e=i.join(" ");e in uo||(uo[e]=!0,Oe(...i))}function uh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const hh={[Hs]:Gs,[Ws]:Ys,[Vs]:qs,[qi]:Xs,[Gs]:Hs,[Ys]:Ws,[qs]:Vs,[Xs]:qi};class si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hs=Math.PI/180,Aa=180/Math.PI;function tr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function dh(i,e){return(i%e+e)%e}function ds(i,e,t){return(1-t)*i+t*e}function Ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class tt{static{tt.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,c){let o=n[r+0],l=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(d!==_||o!==u||l!==p||h!==g){let m=o*u+l*p+h*g+d*_;m<0&&(u=-u,p=-p,g=-g,_=-_,m=-m);let f=1-c;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);f=Math.sin(f*M)/y,c=Math.sin(c*M)/y,o=o*f+u*c,l=l*f+p*c,h=h*f+g*c,d=d*f+_*c}else{o=o*f+u*c,l=l*f+p*c,h=h*f+g*c,d=d*f+_*c;const M=1/Math.sqrt(o*o+l*l+h*h+d*d);o*=M,l*=M,h*=M,d*=M}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const c=n[r],o=n[r+1],l=n[r+2],h=n[r+3],d=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=c*g+h*d+o*p-l*u,e[t+1]=o*g+h*u+l*d-c*p,e[t+2]=l*g+h*p+c*u-o*d,e[t+3]=h*g-c*d-o*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(r/2),d=c(s/2),u=o(n/2),p=o(r/2),g=o(s/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],d=t[10],u=n+c+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-o)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>c&&n>d){const p=2*Math.sqrt(1+n-c-d);this._w=(h-o)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(c>d){const p=2*Math.sqrt(1+c-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(o+h)/p}else{const p=2*Math.sqrt(1+d-n-c);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(o+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+r*l-s*o,this._y=r*h+a*o+s*c-n*l,this._z=s*h+a*l+n*o-r*c,this._w=a*h-n*c-r*o-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,r=-r,s=-s,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+r*t,this._z=this._z*o+s*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+r*t,this._z=this._z*o+s*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*r-c*n),h=2*(c*t-s*r),d=2*(s*n-a*t);return this.x=t+o*l+a*d-c*h,this.y=n+o*h+c*l-s*d,this.z=r+o*d+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,c=t.y,o=t.z;return this.x=r*o-s*c,this.y=s*a-n*o,this.z=n*c-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fs.copy(this).projectOnVector(e),this.sub(fs)}reflect(e){return this.sub(fs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fs=new H,fo=new Pi;class ze{static{ze.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,o,l)}set(e,t,n,r,s,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=c,h[3]=t,h[4]=s,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=r[0],m=r[3],f=r[6],M=r[1],y=r[4],S=r[7],T=r[2],A=r[5],R=r[8];return s[0]=a*_+c*M+o*T,s[3]=a*m+c*y+o*A,s[6]=a*f+c*S+o*R,s[1]=l*_+h*M+d*T,s[4]=l*m+h*y+d*A,s[7]=l*f+h*S+d*R,s[2]=u*_+p*M+g*T,s[5]=u*m+p*y+g*A,s[8]=u*f+p*S+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*s*h+n*c*o+r*s*l-r*a*o}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],d=h*a-c*l,u=c*o-h*s,p=l*s-a*o,g=t*d+n*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*l-h*n)*_,e[2]=(c*n-r*a)*_,e[3]=u*_,e[4]=(h*t-r*o)*_,e[5]=(r*s-c*t)*_,e[6]=p*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,c){const o=Math.cos(s),l=Math.sin(s);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-r*l,r*o,-r*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Ai("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ps.makeScale(e,t)),this}rotate(e){return Ai("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ps.makeRotation(-e)),this}translate(e,t){return Ai("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ps.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ps=new ze,po=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mo=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fh(){const i={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=wn(r.r),r.g=wn(r.g),r.b=wn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=wi(r.r),r.g=wi(r.g),r.b=wi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===un?kr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ai("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ai("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$i]:{primaries:e,whitePoint:n,transfer:kr,toXYZ:po,fromXYZ:mo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:po,fromXYZ:mo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}const Ye=fh();function wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ci;class ph{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ci===void 0&&(ci=Gr("canvas")),ci.width=e.width,ci.height=e.height;const r=ci.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=wn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wn(t[n]/255)*255):t[n]=wn(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mh=0;class Wa{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=tr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,c=r.length;a<c;a++)r[a].isDataTexture?s.push(ms(r[a].image)):s.push(ms(r[a]))}else s=ms(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ms(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ph.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let gh=0;const gs=new H;class Dt extends si{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=yn,r=yn,s=Ct,a=Jn,c=Zt,o=Ht,l=Dt.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=tr(),this.name="",this.source=new Wa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(gs).x}get height(){return this.source.getSize(gs).y}get depth(){return this.source.getSize(gs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==El)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ks:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ks:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=El;Dt.DEFAULT_ANISOTROPY=1;class mt{static{mt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const o=e.elements,l=o[0],h=o[4],d=o[8],u=o[1],p=o[5],g=o[9],_=o[2],m=o[6],f=o[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,S=(p+1)/2,T=(f+1)/2,A=(h+u)/4,R=(d+_)/4,v=(g+m)/4;return y>S&&y>T?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=A/n,s=R/n):S>T?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=A/r,s=v/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=R/s,r=v/s),this.set(n,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _h extends si{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Dt(r),a=n.count;for(let c=0;c<a;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Wa(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends _h{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pl extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Et,this.minFilter=Et,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xh extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Et,this.minFilter=Et,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class vt{static{vt.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,c,o,l,h,d,u,p,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,o,l,h,d,u,p,g,_,m)}set(e,t,n,r,s,a,c,o,l,h,d,u,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=c,f[13]=o,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/ui.setFromMatrixColumn(e,0).length(),s=1/ui.setFromMatrixColumn(e,1).length(),a=1/ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(r),l=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,p=a*d,g=c*h,_=c*d;t[0]=o*h,t[4]=-o*d,t[8]=l,t[1]=p+g*l,t[5]=u-_*l,t[9]=-c*o,t[2]=_-u*l,t[6]=g+p*l,t[10]=a*o}else if(e.order==="YXZ"){const u=o*h,p=o*d,g=l*h,_=l*d;t[0]=u+_*c,t[4]=g*c-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-c,t[2]=p*c-g,t[6]=_+u*c,t[10]=a*o}else if(e.order==="ZXY"){const u=o*h,p=o*d,g=l*h,_=l*d;t[0]=u-_*c,t[4]=-a*d,t[8]=g+p*c,t[1]=p+g*c,t[5]=a*h,t[9]=_-u*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=c*h,_=c*d;t[0]=o*h,t[4]=g*l-p,t[8]=u*l+_,t[1]=o*d,t[5]=_*l+u,t[9]=p*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const u=a*o,p=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=_-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*o,p=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=c*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vh,e,Mh)}lookAt(e,t,n){const r=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Dn.crossVectors(n,Ot),Dn.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Dn.crossVectors(n,Ot)),Dn.normalize(),or.crossVectors(Ot,Dn),r[0]=Dn.x,r[4]=or.x,r[8]=Ot.x,r[1]=Dn.y,r[5]=or.y,r[9]=Ot.y,r[2]=Dn.z,r[6]=or.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],y=n[7],S=n[11],T=n[15],A=r[0],R=r[4],v=r[8],w=r[12],P=r[1],U=r[5],z=r[9],X=r[13],N=r[2],V=r[6],j=r[10],$=r[14],se=r[3],k=r[7],Z=r[11],ee=r[15];return s[0]=a*A+c*P+o*N+l*se,s[4]=a*R+c*U+o*V+l*k,s[8]=a*v+c*z+o*j+l*Z,s[12]=a*w+c*X+o*$+l*ee,s[1]=h*A+d*P+u*N+p*se,s[5]=h*R+d*U+u*V+p*k,s[9]=h*v+d*z+u*j+p*Z,s[13]=h*w+d*X+u*$+p*ee,s[2]=g*A+_*P+m*N+f*se,s[6]=g*R+_*U+m*V+f*k,s[10]=g*v+_*z+m*j+f*Z,s[14]=g*w+_*X+m*$+f*ee,s[3]=M*A+y*P+S*N+T*se,s[7]=M*R+y*U+S*V+T*k,s[11]=M*v+y*z+S*j+T*Z,s[15]=M*w+y*X+S*$+T*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15],M=o*p-l*u,y=c*p-l*d,S=c*u-o*d,T=a*p-l*h,A=a*u-o*h,R=a*d-c*h;return t*(_*M-m*y+f*S)-n*(g*M-m*T+f*A)+r*(g*y-_*T+f*R)-s*(g*S-_*A+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(s*h-c*o)+r*(s*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],M=t*c-n*a,y=t*o-r*a,S=t*l-s*a,T=n*o-r*c,A=n*l-s*c,R=r*l-s*o,v=h*_-d*g,w=h*m-u*g,P=h*f-p*g,U=d*m-u*_,z=d*f-p*_,X=u*f-p*m,N=M*X-y*z+S*U+T*P-A*w+R*v;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/N;return e[0]=(c*X-o*z+l*U)*V,e[1]=(r*z-n*X-s*U)*V,e[2]=(_*R-m*A+f*T)*V,e[3]=(u*A-d*R-p*T)*V,e[4]=(o*P-a*X-l*w)*V,e[5]=(t*X-r*P+s*w)*V,e[6]=(m*S-g*R-f*y)*V,e[7]=(h*R-u*S+p*y)*V,e[8]=(a*z-c*P+l*v)*V,e[9]=(n*P-t*z-s*v)*V,e[10]=(g*A-_*S+f*M)*V,e[11]=(d*S-h*A-p*M)*V,e[12]=(c*w-a*U-o*v)*V,e[13]=(t*U-n*w+r*v)*V,e[14]=(_*y-g*T-m*M)*V,e[15]=(h*T-d*y+u*M)*V,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,c=e.y,o=e.z,l=s*a,h=s*c;return this.set(l*a+n,l*c-r*o,l*o+r*c,0,l*c+r*o,h*c+n,h*o-r*a,0,l*o-r*c,h*o+r*a,s*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,c=t._z,o=t._w,l=s+s,h=a+a,d=c+c,u=s*l,p=s*h,g=s*d,_=a*h,m=a*d,f=c*d,M=o*l,y=o*h,S=o*d,T=n.x,A=n.y,R=n.z;return r[0]=(1-(_+f))*T,r[1]=(p+S)*T,r[2]=(g-y)*T,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(u+f))*A,r[6]=(m+M)*A,r[7]=0,r[8]=(g+y)*R,r[9]=(m-M)*R,r[10]=(1-(u+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ui.set(r[0],r[1],r[2]).length();const c=ui.set(r[4],r[5],r[6]).length(),o=ui.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Qt.copy(this);const l=1/a,h=1/c,d=1/o;return Qt.elements[0]*=l,Qt.elements[1]*=l,Qt.elements[2]*=l,Qt.elements[4]*=h,Qt.elements[5]*=h,Qt.elements[6]*=h,Qt.elements[8]*=d,Qt.elements[9]*=d,Qt.elements[10]*=d,t.setFromRotationMatrix(Qt),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,r,s,a,c=dn,o=!1){const l=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r);let g,_;if(o)g=s/(a-s),_=a*s/(a-s);else if(c===dn)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(c===Hr)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,c=dn,o=!1){const l=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,_;if(o)g=1/(a-s),_=a/(a-s);else if(c===dn)g=-2/(a-s),_=-(a+s)/(a-s);else if(c===Hr)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ui=new H,Qt=new vt,vh=new H(0,0,0),Mh=new H(1,1,1),Dn=new H,or=new H,Ot=new H,go=new vt,_o=new Pi;class ii{constructor(e=0,t=0,n=0,r=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],c=r[8],o=r[1],l=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(c,p));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return go.makeRotationFromQuaternion(e),this.setFromRotationMatrix(go,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _o.setFromEuler(this),this.setFromQuaternion(_o,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Ll{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sh=0;const xo=new H,hi=new Pi,xn=new vt,lr=new H,Ui=new H,Eh=new H,bh=new Pi,vo=new H(1,0,0),Mo=new H(0,1,0),So=new H(0,0,1),Eo={type:"added"},yh={type:"removed"},di={type:"childadded",child:null},_s={type:"childremoved",child:null};class Gt extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new H,t=new ii,n=new Pi,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ll,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(vo,e)}rotateY(e){return this.rotateOnAxis(Mo,e)}rotateZ(e){return this.rotateOnAxis(So,e)}translateOnAxis(e,t){return xo.copy(e).applyQuaternion(this.quaternion),this.position.add(xo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vo,e)}translateY(e){return this.translateOnAxis(Mo,e)}translateZ(e){return this.translateOnAxis(So,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lr.copy(e):lr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Ui,lr,this.up):xn.lookAt(lr,Ui,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),hi.setFromRotationMatrix(xn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Eo),di.child=e,this.dispatchEvent(di),di.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yh),_s.child=e,this.dispatchEvent(_s),_s.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Eo),di.child=e,this.dispatchEvent(di),di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Eh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,bh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,c=s.length;a<c;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const d=o[l];s(e.shapes,d)}else s(e.shapes,o)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(s(e.materials,this.material[o]));r.material=c}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];r.animations.push(s(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Gt.DEFAULT_UP=new H(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class cr extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Th={type:"move"};class xs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Th)))}return c!==null&&(c.visible=r!==null),o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new cr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Dl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},ur={h:0,s:0,l:0};function vs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ye.workingColorSpace){if(e=dh(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=vs(a,s,e+1/3),this.g=vs(a,s,e),this.b=vs(a,s,e-1/3)}return Ye.colorSpaceToWorking(this,r),this}setStyle(e,t=Yt){function n(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],c=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const n=Dl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wn(e.r),this.g=wn(e.g),this.b=wn(e.b),this}copyLinearToSRGB(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ye.workingToColorSpace(Rt.copy(this),e),Math.round(qe(Rt.r*255,0,255))*65536+Math.round(qe(Rt.g*255,0,255))*256+Math.round(qe(Rt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Rt.copy(this),t);const n=Rt.r,r=Rt.g,s=Rt.b,a=Math.max(n,r,s),c=Math.min(n,r,s);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const d=a-c;switch(l=h<=.5?d/(a+c):d/(2-a-c),a){case n:o=(r-s)/d+(r<s?6:0);break;case r:o=(s-n)/d+2;break;case s:o=(n-r)/d+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Yt){Ye.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,r=Rt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(ur);const n=ds(In.h,ur.h,t),r=ds(In.s,ur.s,t),s=ds(In.l,ur.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new it;it.NAMES=Dl;class Ah extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jt=new H,vn=new H,Ms=new H,Mn=new H,fi=new H,pi=new H,bo=new H,Ss=new H,Es=new H,bs=new H,ys=new mt,Ts=new mt,As=new mt;class tn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),jt.subVectors(e,t),r.cross(jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){jt.subVectors(r,t),vn.subVectors(n,t),Ms.subVectors(e,t);const a=jt.dot(jt),c=jt.dot(vn),o=jt.dot(Ms),l=vn.dot(vn),h=vn.dot(Ms),d=a*l-c*c;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(l*o-c*h)*u,g=(a*h-c*o)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,r,s,a,c,o){return this.getBarycoord(e,t,n,r,Mn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(s,Mn.x),o.addScaledVector(a,Mn.y),o.addScaledVector(c,Mn.z),o)}static getInterpolatedAttribute(e,t,n,r,s,a){return ys.setScalar(0),Ts.setScalar(0),As.setScalar(0),ys.fromBufferAttribute(e,t),Ts.fromBufferAttribute(e,n),As.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ys,s.x),a.addScaledVector(Ts,s.y),a.addScaledVector(As,s.z),a}static isFrontFacing(e,t,n,r){return jt.subVectors(n,t),vn.subVectors(e,t),jt.cross(vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),jt.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,c;fi.subVectors(r,n),pi.subVectors(s,n),Ss.subVectors(e,n);const o=fi.dot(Ss),l=pi.dot(Ss);if(o<=0&&l<=0)return t.copy(n);Es.subVectors(e,r);const h=fi.dot(Es),d=pi.dot(Es);if(h>=0&&d<=h)return t.copy(r);const u=o*d-h*l;if(u<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(fi,a);bs.subVectors(e,s);const p=fi.dot(bs),g=pi.dot(bs);if(g>=0&&p<=g)return t.copy(s);const _=p*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(pi,c);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return bo.subVectors(s,r),c=(d-h)/(d-h+(p-g)),t.copy(r).addScaledVector(bo,c);const f=1/(m+_+u);return a=_*f,c=u*f,t.copy(n).addScaledVector(fi,a).addScaledVector(pi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class nr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=s.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(s,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hr.copy(n.boundingBox)),hr.applyMatrix4(e.matrixWorld),this.union(hr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fi),dr.subVectors(this.max,Fi),mi.subVectors(e.a,Fi),gi.subVectors(e.b,Fi),_i.subVectors(e.c,Fi),Nn.subVectors(gi,mi),Un.subVectors(_i,gi),Xn.subVectors(mi,_i);let t=[0,-Nn.z,Nn.y,0,-Un.z,Un.y,0,-Xn.z,Xn.y,Nn.z,0,-Nn.x,Un.z,0,-Un.x,Xn.z,0,-Xn.x,-Nn.y,Nn.x,0,-Un.y,Un.x,0,-Xn.y,Xn.x,0];return!ws(t,mi,gi,_i,dr)||(t=[1,0,0,0,1,0,0,0,1],!ws(t,mi,gi,_i,dr))?!1:(fr.crossVectors(Nn,Un),t=[fr.x,fr.y,fr.z],ws(t,mi,gi,_i,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new H,new H,new H,new H,new H,new H,new H,new H],en=new H,hr=new nr,mi=new H,gi=new H,_i=new H,Nn=new H,Un=new H,Xn=new H,Fi=new H,dr=new H,fr=new H,Yn=new H;function ws(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Yn.fromArray(i,s);const c=r.x*Math.abs(Yn.x)+r.y*Math.abs(Yn.y)+r.z*Math.abs(Yn.z),o=e.dot(Yn),l=t.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const St=new H,pr=new tt;let wh=0;class pn extends si{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ah,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXY(t,pr.x,pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Il extends pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Nl extends pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Bn extends pn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Bh=new nr,Oi=new H,Bs=new H;class Va{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oi.subVectors(e,this.center);const t=Oi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Oi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oi.copy(e.center).add(Bs)),this.expandByPoint(Oi.copy(e.center).sub(Bs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Rh=0;const Xt=new vt,Rs=new Gt,xi=new H,zt=new nr,zi=new nr,Tt=new H;class _n extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lh(e)?Nl:Il)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return Rs.lookAt(e),Rs.updateMatrix(),this.applyMatrix4(Rs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bn(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Va);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const c=t[s];zi.setFromBufferAttribute(c),this.morphTargetsRelative?(Tt.addVectors(zt.min,zi.min),zt.expandByPoint(Tt),Tt.addVectors(zt.max,zi.max),zt.expandByPoint(Tt)):(zt.expandByPoint(zi.min),zt.expandByPoint(zi.max))}zt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const c=t[s],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)Tt.fromBufferAttribute(c,l),o&&(xi.fromBufferAttribute(e,l),Tt.add(xi)),r=Math.max(r,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new pn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new H,o[v]=new H;const l=new H,h=new H,d=new H,u=new tt,p=new tt,g=new tt,_=new H,m=new H;function f(v,w,P){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,P),u.fromBufferAttribute(s,v),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,P),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(U),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),c[v].add(_),c[w].add(_),c[P].add(_),o[v].add(m),o[w].add(m),o[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,w=M.length;v<w;++v){const P=M[v],U=P.start,z=P.count;for(let X=U,N=U+z;X<N;X+=3)f(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const y=new H,S=new H,T=new H,A=new H;function R(v){T.fromBufferAttribute(r,v),A.copy(T);const w=c[v];y.copy(w),y.sub(T.multiplyScalar(T.dot(w))).normalize(),S.crossVectors(A,w);const U=S.dot(o[v])<0?-1:1;a.setXYZW(v,y.x,y.y,y.z,U)}for(let v=0,w=M.length;v<w;++v){const P=M[v],U=P.start,z=P.count;for(let X=U,N=U+z;X<N;X+=3)R(e.getX(X+0)),R(e.getX(X+1)),R(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new H,s=new H,a=new H,c=new H,o=new H,l=new H,h=new H,d=new H;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,d=c.normalized,u=new l.constructor(o.length*h);let p=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?p=o[_]*c.data.stride+c.offset:p=o[_]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new pn(u,h,d)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _n,n=this.index.array,r=this.attributes;for(const c in r){const o=r[c],l=e(o,n);t.setAttribute(c,l)}const s=this.morphAttributes;for(const c in s){const o=[],l=s[c];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,n);o.push(p)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const r={};let s=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(r[o]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cs=new H,Ch=new H,Ph=new ze;class zn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Cs.subVectors(n,t).cross(Ch.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Cs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ph.getNormalMatrix(e),r=this.coplanarPoint(Cs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Lh=0;class Jr extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=tr(),this.name="",this.type="Material",this.blending=Xi,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=fl,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ju,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const c in s){const o=s[c];delete o.metadata,a.push(o)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new zn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new tt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new tt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const En=new H,Ps=new H,mr=new H,gr=new H;class Dh{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ps.copy(e).add(t).multiplyScalar(.5),mr.copy(t).sub(e).normalize(),gr.copy(this.origin).sub(Ps);const s=e.distanceTo(t)*.5,a=-this.direction.dot(mr),c=gr.dot(this.direction),o=-gr.dot(mr),l=gr.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*o-c,u=a*c-o,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+a*u+2*c)+u*(a*d+u+2*o)+l}else u=s,d=Math.max(0,-(a*u+c)),p=-d*d+u*(u+2*o)+l;else u=-s,d=Math.max(0,-(a*u+c)),p=-d*d+u*(u+2*o)+l;else u<=-g?(d=Math.max(0,-(-a*s+c)),u=d>0?-s:Math.min(Math.max(-s,-o),s),p=-d*d+u*(u+2*o)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-o),s),p=u*(u+2*o)+l):(d=Math.max(0,-(a*s+c)),u=d>0?s:Math.min(Math.max(-s,-o),s),p=-d*d+u*(u+2*o)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+c)),p=-d*d+u*(u+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ps).addScaledVector(mr,u),p}intersectSphere(e,t){if(e.radius<0)return null;En.subVectors(e.center,this.origin);const n=En.dot(this.direction),r=En.dot(En)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(c=(e.min.z-u.z)*d,o=(e.max.z-u.z)*d):(c=(e.max.z-u.z)*d,o=(e.min.z-u.z)*d),n>o||c>r)||((c>n||n!==n)&&(n=c),(o<r||r!==r)&&(r=o),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,c=this.direction,o=c.x,l=c.y,h=c.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,_=t.y-a.y,m=t.z-a.z,f=n.x-a.x,M=n.y-a.y,y=n.z-a.z,S=Math.abs(o),T=Math.abs(l),A=Math.abs(h);let R,v,w,P,U,z,X,N,V,j,$,se;if(S>=T&&S>=A?(w=o,z=d,V=g,se=f,o>=0?(R=l,v=h,P=u,U=p,X=_,N=m,j=M,$=y):(R=h,v=l,P=p,U=u,X=m,N=_,j=y,$=M)):T>=A?(w=l,z=u,V=_,se=M,l>=0?(R=h,v=o,P=p,U=d,X=m,N=g,j=y,$=f):(R=o,v=h,P=d,U=p,X=g,N=m,j=f,$=y)):(w=h,z=p,V=m,se=y,h>=0?(R=o,v=l,P=d,U=u,X=g,N=_,j=f,$=M):(R=l,v=o,P=u,U=d,X=_,N=g,j=M,$=f)),w===0)return null;const k=R/w,Z=v/w,ee=1/w,ye=P-k*z,Be=U-Z*z,at=X-k*V,Ve=N-Z*V,Ze=j-k*se,J=$-Z*se,ie=Ze*Ve-J*at,Se=ye*J-Be*Ze,Fe=at*Be-Ve*ye;if(r){if(ie<0||Se<0||Fe<0)return null}else if((ie<0||Se<0||Fe<0)&&(ie>0||Se>0||Fe>0))return null;const ve=ie+Se+Fe;if(ve===0)return null;const K=ee*(ie*z+Se*V+Fe*se);return(ve>0?K<0:K>0)?null:this.at(K/ve,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ul extends Jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yo=new vt,qn=new Dh,_r=new Va,To=new H,xr=new H,vr=new H,Mr=new H,Ls=new H,Sr=new H,Ao=new H,Er=new H;class $t extends Gt{constructor(e=new _n,t=new Ul){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(s&&c){Sr.set(0,0,0);for(let o=0,l=s.length;o<l;o++){const h=c[o],d=s[o];h!==0&&(Ls.fromBufferAttribute(d,e),a?Sr.addScaledVector(Ls,h):Sr.addScaledVector(Ls.sub(t),h))}t.add(Sr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),qn.copy(e.ray).recast(e.near),!(_r.containsPoint(qn.origin)===!1&&(qn.intersectSphere(_r,To)===null||qn.origin.distanceToSquared(To)>(e.far-e.near)**2))&&(yo.copy(s).invert(),qn.copy(e.ray).applyMatrix4(yo),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,c=s.index,o=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=M,T=y;S<T;S+=3){const A=c.getX(S),R=c.getX(S+1),v=c.getX(S+2);r=br(this,f,e,n,l,h,d,A,R,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=c.getX(m),y=c.getX(m+1),S=c.getX(m+2);r=br(this,a,e,n,l,h,d,M,y,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),y=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=M,T=y;S<T;S+=3){const A=S,R=S+1,v=S+2;r=br(this,f,e,n,l,h,d,A,R,v),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,y=m+1,S=m+2;r=br(this,a,e,n,l,h,d,M,y,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Ih(i,e,t,n,r,s,a,c){let o;if(e.side===Ut?o=n.intersectTriangle(a,s,r,!0,c):o=n.intersectTriangle(r,s,a,e.side===ei,c),o===null)return null;Er.copy(c),Er.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Er);return l<t.near||l>t.far?null:{distance:l,point:Er.clone(),object:i}}function br(i,e,t,n,r,s,a,c,o,l){i.getVertexPosition(c,xr),i.getVertexPosition(o,vr),i.getVertexPosition(l,Mr);const h=Ih(i,e,t,n,xr,vr,Mr,Ao);if(h){const d=new H;tn.getBarycoord(Ao,xr,vr,Mr,d),r&&(h.uv=tn.getInterpolatedAttribute(r,c,o,l,d,new tt)),s&&(h.uv1=tn.getInterpolatedAttribute(s,c,o,l,d,new tt)),a&&(h.normal=tn.getInterpolatedAttribute(a,c,o,l,d,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:c,b:o,c:l,normal:new H,materialIndex:0};tn.getNormal(xr,vr,Mr,u.normal),h.face=u,h.barycoord=d}return h}class Wr extends Dt{constructor(e=null,t=1,n=1,r,s,a,c,o,l=Et,h=Et,d,u){super(null,a,c,o,l,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nh extends pn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Kn=new Va,Uh=new tt(.5,.5),yr=new H;class Fl{constructor(e=new zn,t=new zn,n=new zn,r=new zn,s=new zn,a=new zn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(r),c[4].copy(s),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){const r=this.planes,s=e.elements,a=s[0],c=s[1],o=s[2],l=s[3],h=s[4],d=s[5],u=s[6],p=s[7],g=s[8],_=s[9],m=s[10],f=s[11],M=s[12],y=s[13],S=s[14],T=s[15];if(r[0].setComponents(l-a,p-h,f-g,T-M).normalize(),r[1].setComponents(l+a,p+h,f+g,T+M).normalize(),r[2].setComponents(l+c,p+d,f+_,T+y).normalize(),r[3].setComponents(l-c,p-d,f-_,T-y).normalize(),n)r[4].setComponents(o,u,m,S).normalize(),r[5].setComponents(l-o,p-u,f-m,T-S).normalize();else if(r[4].setComponents(l-o,p-u,f-m,T-S).normalize(),t===dn)r[5].setComponents(l+o,p+u,f+m,T+S).normalize();else if(t===Hr)r[5].setComponents(o,u,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);const t=Uh.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(yr.x=r.normal.x>0?e.max.x:e.min.x,yr.y=r.normal.y>0?e.max.y:e.min.y,yr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ol extends Dt{constructor(e=[],t=ti,n,r,s,a,c,o,l,h){super(e,t,n,r,s,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ji extends Dt{constructor(e,t,n=mn,r,s,a,c=Et,o=Et,l,h=Rn,d=1){if(h!==Rn&&h!==Qn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Fh extends Ji{constructor(e,t=mn,n=ti,r,s,a=Et,c=Et,o,l=Rn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,c,o,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class zl extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ir extends _n{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const c=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const o=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(o),this.setAttribute("position",new Bn(l,3)),this.setAttribute("normal",new Bn(h,3)),this.setAttribute("uv",new Bn(d,2));function g(_,m,f,M,y,S,T,A,R,v,w){const P=S/R,U=T/v,z=S/2,X=T/2,N=A/2,V=R+1,j=v+1;let $=0,se=0;const k=new H;for(let Z=0;Z<j;Z++){const ee=Z*U-X;for(let ye=0;ye<V;ye++){const Be=ye*P-z;k[_]=Be*M,k[m]=ee*y,k[f]=N,l.push(k.x,k.y,k.z),k[_]=0,k[m]=0,k[f]=A>0?1:-1,h.push(k.x,k.y,k.z),d.push(ye/R),d.push(1-Z/v),$+=1}}for(let Z=0;Z<v;Z++)for(let ee=0;ee<R;ee++){const ye=u+ee+V*Z,Be=u+ee+V*(Z+1),at=u+(ee+1)+V*(Z+1),Ve=u+(ee+1)+V*Z;o.push(ye,Be,Ve),o.push(Be,at,Ve),se+=6}c.addGroup(p,se,w),p+=se,u+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ir(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ai extends _n{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,c=Math.floor(n),o=Math.floor(r),l=c+1,h=o+1,d=e/c,u=t/o,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const M=f*u-a;for(let y=0;y<l;y++){const S=y*d-s;g.push(S,-M,0),_.push(0,0,1),m.push(y/c),m.push(1-f/o)}}for(let f=0;f<o;f++)for(let M=0;M<c;M++){const y=M+l*f,S=M+l*(f+1),T=M+1+l*(f+1),A=M+1+l*f;p.push(y,S,A),p.push(S,T,A)}this.setIndex(p),this.setAttribute("position",new Bn(g,3)),this.setAttribute("normal",new Bn(_,3)),this.setAttribute("uv",new Bn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ci(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(wo(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(wo(r[0])){const s=[];for(let a=0,c=r.length;a<c;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=Ci(i[t]);for(const r in n)e[r]=n[r]}return e}function wo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Oh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const zh={clone:Ci,merge:Lt};var kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wt extends Jr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kh,this.fragmentShader=Hh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=Oh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new it().setHex(r.value);break;case"v2":this.uniforms[n].value=new tt().fromArray(r.value);break;case"v3":this.uniforms[n].value=new H().fromArray(r.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[n].value=new vt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Gh extends Wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wh extends Jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vh extends Jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Tr=new H,Ar=new Pi,on=new H;class Hl extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tr,Ar,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,Ar,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Tr,Ar,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,Ar,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new H,Bo=new tt,Ro=new tt;class qt extends Hl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Aa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Aa*2*Math.atan(Math.tan(hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Bo,Ro),t.subVectors(Ro,Bo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/o,t-=a.offsetY*n/l,r*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Gl extends Hl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,c=r+t,o=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Xh extends _n{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const vi=-90,Mi=1;class Yh extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new qt(vi,Mi,e,t);r.layers=this.layers,this.add(r);const s=new qt(vi,Mi,e,t);s.layers=this.layers,this.add(s);const a=new qt(vi,Mi,e,t);a.layers=this.layers,this.add(a);const c=new qt(vi,Mi,e,t);c.layers=this.layers,this.add(c);const o=new qt(vi,Mi,e,t);o.layers=this.layers,this.add(o);const l=new qt(vi,Mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,c,o]=t;for(const l of t)this.remove(l);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,c,o,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qh extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Wl{static{Wl.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Co(i,e,t,n){const r=Kh(n);switch(t){case wl:return i*e;case Rl:return i*e/r.components*r.byteLength;case Oa:return i*e/r.components*r.byteLength;case ni:return i*e*2/r.components*r.byteLength;case za:return i*e*2/r.components*r.byteLength;case Bl:return i*e*3/r.components*r.byteLength;case Zt:return i*e*4/r.components*r.byteLength;case ka:return i*e*4/r.components*r.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Nr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Js:case js:return Math.max(i,16)*Math.max(e,8)/4;case $s:case Qs:return Math.max(i,8)*Math.max(e,8)/2;case ea:case ta:case ia:case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case na:case Or:case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case la:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case da:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case va:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ma:case Sa:case Ea:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ba:case ya:return Math.ceil(i/4)*Math.ceil(e/4)*8;case zr:case Ta:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kh(i){switch(i){case Ht:case bl:return{byteLength:1,components:1};case Ki:case yl:case gn:return{byteLength:2,components:1};case Ua:case Fa:return{byteLength:2,components:4};case mn:case Na:case hn:return{byteLength:4,components:1};case Tl:case Al:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ia}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ia);function Vl(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Zh(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,l,h),c.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:d}}function n(c,o,l){const h=o.array,d=o.updateRanges;if(i.bindBuffer(l,c),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:r,remove:s,update:a}}var $h=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jh=`#ifdef USE_ALPHAHASH
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
#endif`,Qh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ed=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nd=`#ifdef USE_AOMAP
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
#endif`,id=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rd=`#ifdef USE_BATCHING
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
#endif`,sd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ad=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ld=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cd=`#ifdef USE_IRIDESCENCE
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
#endif`,ud=`#ifdef USE_BUMPMAP
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
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,vd=`#define PI 3.141592653589793
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
} // validated`,Md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sd=`vec3 transformedNormal = objectNormal;
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
#endif`,Ed=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ad="gl_FragColor = linearToOutputTexel( gl_FragColor );",wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bd=`#ifdef USE_ENVMAP
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
#endif`,Rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
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
#endif`,Pd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Dd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Id=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ud=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fd=`#ifdef USE_GRADIENTMAP
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
}`,Od=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Gd=`#ifdef USE_ENVMAP
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
#endif`,Wd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qd=`PhysicalMaterial material;
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
#endif`,Kd=`uniform sampler2D dfgLUT;
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
}`,Zd=`
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
#endif`,$d=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ef=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,of=`#if defined( USE_POINTS_UV )
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
#endif`,lf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,df=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ff=`#ifdef USE_MORPHTARGETS
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
#endif`,pf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Mf=`#ifdef USE_NORMALMAP
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
#endif`,Sf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ef=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uf=`float getShadowMask() {
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
}`,Ff=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Of=`#ifdef USE_SKINNING
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
#endif`,zf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kf=`#ifdef USE_SKINNING
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
#endif`,Hf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xf=`#ifdef USE_TRANSMISSION
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
#endif`,Yf=`#ifdef USE_TRANSMISSION
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
#endif`,qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qf=`uniform sampler2D t2D;
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,np=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ip=`#include <common>
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
}`,rp=`#if DEPTH_PACKING == 3200
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
}`,sp=`#define DISTANCE
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
}`,ap=`#define DISTANCE
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`uniform float scale;
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
}`,up=`uniform vec3 diffuse;
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
}`,hp=`#include <common>
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
}`,dp=`uniform vec3 diffuse;
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
}`,fp=`#define LAMBERT
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
}`,pp=`#define LAMBERT
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
}`,mp=`#define MATCAP
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
}`,gp=`#define MATCAP
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
}`,_p=`#define NORMAL
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
}`,xp=`#define NORMAL
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
}`,vp=`#define PHONG
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
}`,Mp=`#define PHONG
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
}`,Sp=`#define STANDARD
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
}`,Ep=`#define STANDARD
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
}`,bp=`#define TOON
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
}`,yp=`#define TOON
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
}`,Tp=`uniform float size;
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
}`,Ap=`uniform vec3 diffuse;
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
}`,wp=`#include <common>
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
}`,Bp=`uniform vec3 color;
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
}`,Rp=`uniform float rotation;
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:$h,alphahash_pars_fragment:Jh,alphamap_fragment:Qh,alphamap_pars_fragment:jh,alphatest_fragment:ed,alphatest_pars_fragment:td,aomap_fragment:nd,aomap_pars_fragment:id,batching_pars_vertex:rd,batching_vertex:sd,begin_vertex:ad,beginnormal_vertex:od,bsdfs:ld,iridescence_fragment:cd,bumpmap_pars_fragment:ud,clipping_planes_fragment:hd,clipping_planes_pars_fragment:dd,clipping_planes_pars_vertex:fd,clipping_planes_vertex:pd,color_fragment:md,color_pars_fragment:gd,color_pars_vertex:_d,color_vertex:xd,common:vd,cube_uv_reflection_fragment:Md,defaultnormal_vertex:Sd,displacementmap_pars_vertex:Ed,displacementmap_vertex:bd,emissivemap_fragment:yd,emissivemap_pars_fragment:Td,colorspace_fragment:Ad,colorspace_pars_fragment:wd,envmap_fragment:Bd,envmap_common_pars_fragment:Rd,envmap_pars_fragment:Cd,envmap_pars_vertex:Pd,envmap_physical_pars_fragment:Gd,envmap_vertex:Ld,fog_vertex:Dd,fog_pars_vertex:Id,fog_fragment:Nd,fog_pars_fragment:Ud,gradientmap_pars_fragment:Fd,lightmap_pars_fragment:Od,lights_lambert_fragment:zd,lights_lambert_pars_fragment:kd,lights_pars_begin:Hd,lights_toon_fragment:Wd,lights_toon_pars_fragment:Vd,lights_phong_fragment:Xd,lights_phong_pars_fragment:Yd,lights_physical_fragment:qd,lights_physical_pars_fragment:Kd,lights_fragment_begin:Zd,lights_fragment_maps:$d,lights_fragment_end:Jd,lightprobes_pars_fragment:Qd,logdepthbuf_fragment:jd,logdepthbuf_pars_fragment:ef,logdepthbuf_pars_vertex:tf,logdepthbuf_vertex:nf,map_fragment:rf,map_pars_fragment:sf,map_particle_fragment:af,map_particle_pars_fragment:of,metalnessmap_fragment:lf,metalnessmap_pars_fragment:cf,morphinstance_vertex:uf,morphcolor_vertex:hf,morphnormal_vertex:df,morphtarget_pars_vertex:ff,morphtarget_vertex:pf,normal_fragment_begin:mf,normal_fragment_maps:gf,normal_pars_fragment:_f,normal_pars_vertex:xf,normal_vertex:vf,normalmap_pars_fragment:Mf,clearcoat_normal_fragment_begin:Sf,clearcoat_normal_fragment_maps:Ef,clearcoat_pars_fragment:bf,iridescence_pars_fragment:yf,opaque_fragment:Tf,packing:Af,premultiplied_alpha_fragment:wf,project_vertex:Bf,dithering_fragment:Rf,dithering_pars_fragment:Cf,roughnessmap_fragment:Pf,roughnessmap_pars_fragment:Lf,shadowmap_pars_fragment:Df,shadowmap_pars_vertex:If,shadowmap_vertex:Nf,shadowmask_pars_fragment:Uf,skinbase_vertex:Ff,skinning_pars_vertex:Of,skinning_vertex:zf,skinnormal_vertex:kf,specularmap_fragment:Hf,specularmap_pars_fragment:Gf,tonemapping_fragment:Wf,tonemapping_pars_fragment:Vf,transmission_fragment:Xf,transmission_pars_fragment:Yf,uv_pars_fragment:qf,uv_pars_vertex:Kf,uv_vertex:Zf,worldpos_vertex:$f,background_vert:Jf,background_frag:Qf,backgroundCube_vert:jf,backgroundCube_frag:ep,cube_vert:tp,cube_frag:np,depth_vert:ip,depth_frag:rp,distance_vert:sp,distance_frag:ap,equirect_vert:op,equirect_frag:lp,linedashed_vert:cp,linedashed_frag:up,meshbasic_vert:hp,meshbasic_frag:dp,meshlambert_vert:fp,meshlambert_frag:pp,meshmatcap_vert:mp,meshmatcap_frag:gp,meshnormal_vert:_p,meshnormal_frag:xp,meshphong_vert:vp,meshphong_frag:Mp,meshphysical_vert:Sp,meshphysical_frag:Ep,meshtoon_vert:bp,meshtoon_frag:yp,points_vert:Tp,points_frag:Ap,shadow_vert:wp,shadow_frag:Bp,sprite_vert:Rp,sprite_frag:Cp},fe={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},cn={basic:{uniforms:Lt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Lt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Lt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Lt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Lt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new it(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Lt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Lt([fe.points,fe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Lt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Lt([fe.common,fe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Lt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Lt([fe.sprite,fe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Lt([fe.common,fe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Lt([fe.lights,fe.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};cn.physical={uniforms:Lt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const wr={r:0,b:0,g:0},Pp=new vt,Xl=new ze;Xl.set(-1,0,0,0,1,0,0,0,1);function Lp(i,e,t,n,r,s){const a=new it(0);let c=r===!0?0:1,o,l,h=null,d=0,u=null;function p(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const S=M.backgroundBlurriness>0;y=e.get(y,S)}return y}function g(M){let y=!1;const S=p(M);S===null?m(a,c):S&&S.isColor&&(m(S,1),y=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,y){const S=p(y);S&&(S.isCubeTexture||S.mapping===$r)?(l===void 0&&(l=new $t(new ir(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:Ci(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Pp.makeRotationFromEuler(y.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Xl),l.material.toneMapped=Ye.getTransfer(S.colorSpace)!==ot,(h!==S||d!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(o===void 0&&(o=new $t(new ai(2,2),new Wt({name:"BackgroundMaterial",uniforms:Ci(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=S,o.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,o.material.toneMapped=Ye.getTransfer(S.colorSpace)!==ot,S.matrixAutoUpdate===!0&&S.updateMatrix(),o.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=S,d=S.version,u=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,y){M.getRGB(wr,kl(i)),t.buffers.color.setClear(wr.r,wr.g,wr.b,y,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:f}}function Dp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function c(U,z,X,N,V){let j=!1;const $=d(U,N,X,z);s!==$&&(s=$,l(s.object)),j=p(U,N,X,V),j&&g(U,N,X,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(U,z,X,N),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function o(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function d(U,z,X,N){const V=N.wireframe===!0;let j=n[z.id];j===void 0&&(j={},n[z.id]=j);const $=U.isInstancedMesh===!0?U.id:0;let se=j[$];se===void 0&&(se={},j[$]=se);let k=se[X.id];k===void 0&&(k={},se[X.id]=k);let Z=k[V];return Z===void 0&&(Z=u(o()),k[V]=Z),Z}function u(U){const z=[],X=[],N=[];for(let V=0;V<t;V++)z[V]=0,X[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:X,attributeDivisors:N,object:U,attributes:{},index:null}}function p(U,z,X,N){const V=s.attributes,j=z.attributes;let $=0;const se=X.getAttributes();for(const k in se)if(se[k].location>=0){const ee=V[k];let ye=j[k];if(ye===void 0&&(k==="instanceMatrix"&&U.instanceMatrix&&(ye=U.instanceMatrix),k==="instanceColor"&&U.instanceColor&&(ye=U.instanceColor)),ee===void 0||ee.attribute!==ye||ye&&ee.data!==ye.data)return!0;$++}return s.attributesNum!==$||s.index!==N}function g(U,z,X,N){const V={},j=z.attributes;let $=0;const se=X.getAttributes();for(const k in se)if(se[k].location>=0){let ee=j[k];ee===void 0&&(k==="instanceMatrix"&&U.instanceMatrix&&(ee=U.instanceMatrix),k==="instanceColor"&&U.instanceColor&&(ee=U.instanceColor));const ye={};ye.attribute=ee,ee&&ee.data&&(ye.data=ee.data),V[k]=ye,$++}s.attributes=V,s.attributesNum=$,s.index=N}function _(){const U=s.newAttributes;for(let z=0,X=U.length;z<X;z++)U[z]=0}function m(U){f(U,0)}function f(U,z){const X=s.newAttributes,N=s.enabledAttributes,V=s.attributeDivisors;X[U]=1,N[U]===0&&(i.enableVertexAttribArray(U),N[U]=1),V[U]!==z&&(i.vertexAttribDivisor(U,z),V[U]=z)}function M(){const U=s.newAttributes,z=s.enabledAttributes;for(let X=0,N=z.length;X<N;X++)z[X]!==U[X]&&(i.disableVertexAttribArray(X),z[X]=0)}function y(U,z,X,N,V,j,$){$===!0?i.vertexAttribIPointer(U,z,X,V,j):i.vertexAttribPointer(U,z,X,N,V,j)}function S(U,z,X,N){_();const V=N.attributes,j=X.getAttributes(),$=z.defaultAttributeValues;for(const se in j){const k=j[se];if(k.location>=0){let Z=V[se];if(Z===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(Z=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(Z=U.instanceColor)),Z!==void 0){const ee=Z.normalized,ye=Z.itemSize,Be=e.get(Z);if(Be===void 0)continue;const at=Be.buffer,Ve=Be.type,Ze=Be.bytesPerElement,J=Ve===i.INT||Ve===i.UNSIGNED_INT||Z.gpuType===Na;if(Z.isInterleavedBufferAttribute){const ie=Z.data,Se=ie.stride,Fe=Z.offset;if(ie.isInstancedInterleavedBuffer){for(let ve=0;ve<k.locationSize;ve++)f(k.location+ve,ie.meshPerAttribute);U.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ve=0;ve<k.locationSize;ve++)m(k.location+ve);i.bindBuffer(i.ARRAY_BUFFER,at);for(let ve=0;ve<k.locationSize;ve++)y(k.location+ve,ye/k.locationSize,Ve,ee,Se*Ze,(Fe+ye/k.locationSize*ve)*Ze,J)}else{if(Z.isInstancedBufferAttribute){for(let ie=0;ie<k.locationSize;ie++)f(k.location+ie,Z.meshPerAttribute);U.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ie=0;ie<k.locationSize;ie++)m(k.location+ie);i.bindBuffer(i.ARRAY_BUFFER,at);for(let ie=0;ie<k.locationSize;ie++)y(k.location+ie,ye/k.locationSize,Ve,ee,ye*Ze,ye/k.locationSize*ie*Ze,J)}}else if($!==void 0){const ee=$[se];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(k.location,ee);break;case 3:i.vertexAttrib3fv(k.location,ee);break;case 4:i.vertexAttrib4fv(k.location,ee);break;default:i.vertexAttrib1fv(k.location,ee)}}}}M()}function T(){w();for(const U in n){const z=n[U];for(const X in z){const N=z[X];for(const V in N){const j=N[V];for(const $ in j)h(j[$].object),delete j[$];delete N[V]}}delete n[U]}}function A(U){if(n[U.id]===void 0)return;const z=n[U.id];for(const X in z){const N=z[X];for(const V in N){const j=N[V];for(const $ in j)h(j[$].object),delete j[$];delete N[V]}}delete n[U.id]}function R(U){for(const z in n){const X=n[z];for(const N in X){const V=X[N];if(V[U.id]===void 0)continue;const j=V[U.id];for(const $ in j)h(j[$].object),delete j[$];delete V[U.id]}}}function v(U){for(const z in n){const X=n[z],N=U.isInstancedMesh===!0?U.id:0,V=X[N];if(V!==void 0){for(const j in V){const $=V[j];for(const se in $)h($[se].object),delete $[se];delete V[j]}delete X[N],Object.keys(X).length===0&&delete n[z]}}}function w(){P(),a=!0,s!==r&&(s=r,l(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:w,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Ip(i,e,t){let n;function r(o){n=o}function s(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=c}function Np(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Zt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ht&&R!==hn&&!v&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function o(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:S,maxSamples:T,samples:A}}function Up(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new zn,c=new ze,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||r;return r=u,n=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const M=s?0:n,y=M*4;let S=f.clippingState||null;o.value=S,S=h(g,u,y,p);for(let T=0;T!==y;++T)S[T]=t[T];f.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const f=p+_*4,M=u.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,S=p;y!==_;++y,S+=4)a.copy(d[y]).applyMatrix4(M,c),a.normal.toArray(m,S),m[S+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Ti=4,Fp=6,Op=20,zp=256,ki=new Gl,Po=new it;let Ds=null,Is=0,Ns=0,Us=!1;const kp=new H,Zn=new H;class Lo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:c=kp}=s;Ds=this._renderer.getRenderTarget(),Is=this._renderer.getActiveCubeFace(),Ns=this._renderer.getActiveMipmapLevel(),Us=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=No(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Io(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ds,Is,Ns),this._renderer.xr.enabled=Us,e.scissorTest=!1,Si(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ti||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ds=this._renderer.getRenderTarget(),Is=this._renderer.getActiveCubeFace(),Ns=this._renderer.getActiveMipmapLevel(),Us=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:gn,format:Zt,colorSpace:$i,depthBuffer:!1},r=Do(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Do(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Hp(s)),this._blurMaterial=Wp(s,e,t),this._ggxMaterial=Gp(s,e,t)}return r}_compileMaterial(e){const t=new $t(new _n,e);this._renderer.compile(t,ki)}_sceneToCubeUV(e,t,n,r,s){const o=new qt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Po),d.toneMapping=fn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new ir,new Ul({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let f=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(Po),f=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(o.up.set(0,l[y],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x+h[y],s.y,s.z)):S===1?(o.up.set(0,0,l[y]),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y+h[y],s.z)):(o.up.set(0,l[y],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y,s.z+h[y]));const T=this._cubeSize;Si(r,S*T,y>2?T:0,T,T),d.setRenderTarget(r),f&&d.render(_,o),d.render(e,o)}d.toneMapping=p,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ti||e.mapping===Ri;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=No()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Io());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const c=s.uniforms;c.envMap.value=e;const o=this._cubeSize;Si(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,ki)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,p=d*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Ti?n-g+Ti:0),f=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=p,o.mipInt.value=g-t,Si(s,m,f,3*_,2*_),r.setRenderTarget(s),r.render(c,ki),o.envMap.value=s.texture,o.roughness.value=0,o.mipInt.value=g-n,Si(e,m,f,3*_,2*_),r.setRenderTarget(e),r.render(c,ki)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,c=this._blurMaterial,o=this._lodMeshes[r];o.material=c;const l=c.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-Ti?r-this._lodMax+Ti:0),u=4*(this._cubeSize-h);Si(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(o,ki)}}function Hp(i){const e=[],t=[];let n=i;const r=i-Ti+1+Fp;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const c=1/(a-2),o=-c,l=1+c,h=[o,o,l,o,l,l,o,o,l,l,o,l],d=6,u=6,p=3,g=new Float32Array(p*u*d),_=new Float32Array(p*u*d);for(let f=0;f<d;f++){const M=f%3*2/3-1,y=f>2?0:-1,S=[M,y,0,M+2/3,y,0,M+2/3,y+1,0,M,y,0,M+2/3,y+1,0,M,y+1,0];g.set(S,p*u*f);for(let T=0;T<u;T++){const A=h[T*2]*2-1,R=h[T*2+1]*2-1;f===0?Zn.set(1,R,A):f===1?Zn.set(-A,1,-R):f===2?Zn.set(-A,R,1):f===3?Zn.set(-1,R,-A):f===4?Zn.set(-A,-1,R):Zn.set(A,R,-1),Zn.toArray(_,(f*u+T)*p)}}const m=new _n;m.setAttribute("position",new pn(g,p)),m.setAttribute("outputDirection",new pn(_,p)),t.push(new $t(m,null)),n>Ti&&n--}return{lodMeshes:t,sizeLods:e}}function Do(i,e,t){const n=new rn(i,e,t);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Si(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Gp(i,e,t){return new Wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Wp(i,e,t){return new Wt({name:"SphericalGaussianBlur",defines:{SAMPLES:Op,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Io(){return new Wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function No(){return new Wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Qr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Yl extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ol(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ir(5,5,5),s=new Wt({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:An});s.uniforms.tEquirect.value=t;const a=new $t(r,s),c=t.minFilter;return t.minFilter===Jn&&(t.minFilter=Ct),new Yh(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Vp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===os||p===ls)if(e.has(u)){const g=e.get(u).texture;return c(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new Yl(g.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",l),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===os||p===ls,_=p===ti||p===Ri;if(g||_){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new Lo(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Lo(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function c(u,p){return p===os?u.mapping=ti:p===ls&&(u.mapping=Ri),u}function o(u){let p=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Xp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ai("WebGLRenderer: "+n+" extension not supported."),r}}}function Yp(i,e,t,n){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function o(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(g===void 0)return;if(p!==null){const M=p.array;_=p.version;for(let y=0,S=M.length;y<S;y+=3){const T=M[y+0],A=M[y+1],R=M[y+2];u.push(T,A,A,R,R,T)}}else{const M=g.array;_=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){const T=y+0,A=y+1,R=y+2;u.push(T,A,A,R,R,T)}}const m=new(g.count>=65535?Nl:Il)(u,1);m.version=_;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:c,update:o,getWireframeAttribute:h}}function qp(i,e,t){let n;function r(d){n=d}let s,a;function c(d){s=d.type,a=d.bytesPerElement}function o(d,u){i.drawElements(n,u,s,d*a),t.update(u,n,1)}function l(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,s,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,p);let _=0;for(let m=0;m<p;m++)_+=u[m];t.update(_,n,1)}this.setMode=r,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function Kp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(s/3);break;case i.LINES:t.lines+=c*(s/2);break;case i.LINE_STRIP:t.lines+=c*(s-1);break;case i.LINE_LOOP:t.lines+=c*s;break;case i.POINTS:t.points+=c*s;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Zp(i,e,t){const n=new WeakMap,r=new mt;function s(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(c);if(u===void 0||u.count!==d){let w=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const p=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],f=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let S=c.attributes.position.count*y,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*T*4*d),R=new Pl(A,S,T,d);R.type=hn,R.needsUpdate=!0;const v=y*4;for(let P=0;P<d;P++){const U=m[P],z=f[P],X=M[P],N=S*T*4*P;for(let V=0;V<U.count;V++){const j=V*v;p===!0&&(r.fromBufferAttribute(U,V),A[N+j+0]=r.x,A[N+j+1]=r.y,A[N+j+2]=r.z,A[N+j+3]=0),g===!0&&(r.fromBufferAttribute(z,V),A[N+j+4]=r.x,A[N+j+5]=r.y,A[N+j+6]=r.z,A[N+j+7]=0),_===!0&&(r.fromBufferAttribute(X,V),A[N+j+8]=r.x,A[N+j+9]=r.y,A[N+j+10]=r.z,A[N+j+11]=X.itemSize===4?r.w:1)}}u={count:d,texture:R,size:new tt(S,T)},n.set(c,u),c.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=c.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function $p(i,e,t,n,r){let s=new WeakMap;function a(l){const h=r.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function c(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const Jp={[ml]:"LINEAR_TONE_MAPPING",[gl]:"REINHARD_TONE_MAPPING",[_l]:"CINEON_TONE_MAPPING",[xl]:"ACES_FILMIC_TONE_MAPPING",[Ml]:"AGX_TONE_MAPPING",[Sl]:"NEUTRAL_TONE_MAPPING",[vl]:"CUSTOM_TONE_MAPPING"};function Qp(i,e,t,n,r,s){const a=new rn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let c=null,o=null;const l=new _n;l.setAttribute("position",new Bn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bn([0,2,0,0,2,0],2));const h=new Gh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new $t(l,h),u=new Gl(-1,1,1,-1,0,1);let p=null,g=null,_=!1,m,f=null,M=[],y=!1;this.setSize=function(S,T){a.setSize(S,T),c!==null&&c.setSize(S,T),o!==null&&o.setSize(S,T);for(let A=0;A<M.length;A++){const R=M[A];R.setSize&&R.setSize(S,T)}},this.setEffects=function(S){M=S,y=M.length>0&&M[0].isRenderPass===!0;const T=a.width,A=a.height;M.length>0&&c===null&&(c=new rn(T,A,{type:gn,depthBuffer:!1,stencilBuffer:!1}),o=new rn(T,A,{type:gn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){const v=M[R];v.setSize&&v.setSize(T,A)}},this.begin=function(S,T){if(_||S.toneMapping===fn&&M.length===0)return!1;if(f=T,T!==null){const A=T.width,R=T.height;(a.width!==A||a.height!==R)&&this.setSize(A,R)}return y===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=fn,!0},this.hasRenderPass=function(){return y},this.end=function(S,T){S.toneMapping=m,_=!0;let A=a,R=c;for(let v=0;v<M.length;v++){const w=M[v];w.enabled!==!1&&(w.render(S,R,A,T),w.needsSwap!==!1&&(A=R,R=R===c?o:c))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,h.defines={},Ye.getTransfer(p)===ot&&(h.defines.SRGB_TRANSFER="");const v=Jp[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=A.texture,S.setRenderTarget(f),S.render(d,u),f=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),c!==null&&c.dispose(),o!==null&&o.dispose(),l.dispose(),h.dispose()}}const ql=new Dt,wa=new Ji(1,1),Kl=new Pl,Zl=new xh,$l=new Ol,Uo=[],Fo=[],Oo=new Float32Array(16),zo=new Float32Array(9),ko=new Float32Array(4);function Li(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Uo[r];if(s===void 0&&(s=new Float32Array(r),Uo[r]=s),e!==0){n.toArray(s,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(s,c)}return s}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=Fo[e];t===void 0&&(t=new Int32Array(e),Fo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function jp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function im(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;ko.set(n),i.uniformMatrix2fv(this.addr,!1,ko),yt(t,n)}}function rm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;zo.set(n),i.uniformMatrix3fv(this.addr,!1,zo),yt(t,n)}}function sm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;Oo.set(n),i.uniformMatrix4fv(this.addr,!1,Oo),yt(t,n)}}function am(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function om(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function um(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function pm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(wa.compareFunction=t.isReversedDepthBuffer()?Ga:Ha,s=wa):s=ql,t.setTexture2D(e||s,r)}function mm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Zl,r)}function gm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||$l,r)}function _m(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Kl,r)}function xm(i){switch(i){case 5126:return jp;case 35664:return em;case 35665:return tm;case 35666:return nm;case 35674:return im;case 35675:return rm;case 35676:return sm;case 5124:case 35670:return am;case 35667:case 35671:return om;case 35668:case 35672:return lm;case 35669:case 35673:return cm;case 5125:return um;case 36294:return hm;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return _m}}function vm(i,e){i.uniform1fv(this.addr,e)}function Mm(i,e){const t=Li(e,this.size,2);i.uniform2fv(this.addr,t)}function Sm(i,e){const t=Li(e,this.size,3);i.uniform3fv(this.addr,t)}function Em(i,e){const t=Li(e,this.size,4);i.uniform4fv(this.addr,t)}function bm(i,e){const t=Li(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ym(i,e){const t=Li(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tm(i,e){const t=Li(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Am(i,e){i.uniform1iv(this.addr,e)}function wm(i,e){i.uniform2iv(this.addr,e)}function Bm(i,e){i.uniform3iv(this.addr,e)}function Rm(i,e){i.uniform4iv(this.addr,e)}function Cm(i,e){i.uniform1uiv(this.addr,e)}function Pm(i,e){i.uniform2uiv(this.addr,e)}function Lm(i,e){i.uniform3uiv(this.addr,e)}function Dm(i,e){i.uniform4uiv(this.addr,e)}function Im(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=wa:a=ql;for(let c=0;c!==r;++c)t.setTexture2D(e[c]||a,s[c])}function Nm(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Zl,s[a])}function Um(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||$l,s[a])}function Fm(i,e,t){const n=this.cache,r=e.length,s=jr(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Kl,s[a])}function Om(i){switch(i){case 5126:return vm;case 35664:return Mm;case 35665:return Sm;case 35666:return Em;case 35674:return bm;case 35675:return ym;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return wm;case 35668:case 35672:return Bm;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}class zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xm(t.type)}}class km{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Om(t.type)}}class Hm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const c=r[s];c.setValue(e,t[c.id],n)}}}const Fs=/(\w+)(\])?(\[|\.)?/g;function Ho(i,e){i.seq.push(e),i.map[e.id]=e}function Gm(i,e,t){const n=i.name,r=n.length;for(Fs.lastIndex=0;;){const s=Fs.exec(n),a=Fs.lastIndex;let c=s[1];const o=s[2]==="]",l=s[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===r){Ho(t,l===void 0?new zm(c,i,e):new km(c,i,e));break}else{let d=t.map[c];d===void 0&&(d=new Hm(c),Ho(t,d)),t=d}}}class Ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);Gm(c,o,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const c=t[s],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Go(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Wm=37297;let Vm=0;function Xm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Wo=new ze;function Ym(i){Ye._getMatrix(Wo,Ye.workingColorSpace,i);const e=`mat3( ${Wo.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case kr:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Vo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Xm(i.getShaderSource(e),c)}else return s}function qm(i,e){const t=Ym(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Km={[ml]:"Linear",[gl]:"Reinhard",[_l]:"Cineon",[xl]:"ACESFilmic",[Ml]:"AgX",[Sl]:"Neutral",[vl]:"Custom"};function Zm(i,e){const t=Km[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Br=new H;function $m(){Ye.getLuminanceCoefficients(Br);const i=Br.x.toFixed(4),e=Br.y.toFixed(4),t=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wi).join(`
`)}function Qm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function jm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let c=1;s.type===i.FLOAT_MAT2&&(c=2),s.type===i.FLOAT_MAT3&&(c=3),s.type===i.FLOAT_MAT4&&(c=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function Wi(i){return i!==""}function Xo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const e0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ba(i){return i.replace(e0,n0)}const t0=new Map;function n0(i,e){let t=Ge[e];if(t===void 0){const n=t0.get(e);if(n!==void 0)t=Ge[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ba(t)}const i0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qo(i){return i.replace(i0,r0)}function r0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ko(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const s0={[Pr]:"SHADOWMAP_TYPE_PCF",[Gi]:"SHADOWMAP_TYPE_VSM"};function a0(i){return s0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const o0={[ti]:"ENVMAP_TYPE_CUBE",[Ri]:"ENVMAP_TYPE_CUBE",[$r]:"ENVMAP_TYPE_CUBE_UV"};function l0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":o0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const c0={[Ri]:"ENVMAP_MODE_REFRACTION"};function u0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":c0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const h0={[pl]:"ENVMAP_BLENDING_MULTIPLY",[Ku]:"ENVMAP_BLENDING_MIX",[Zu]:"ENVMAP_BLENDING_ADD"};function d0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":h0[i.combine]||"ENVMAP_BLENDING_NONE"}function f0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function p0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=a0(t),l=l0(t),h=u0(t),d=d0(t),u=f0(t),p=Jm(t),g=Qm(s),_=r.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),f.length>0&&(f+=`
`)):(m=[Ko(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),f=[Ko(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==fn?Zm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,qm("linearToOutputTexel",t.outputColorSpace),$m(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),a=Ba(a),a=Xo(a,t),a=Yo(a,t),c=Ba(c),c=Xo(c,t),c=Yo(c,t),a=qo(a),c=qo(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=M+m+a,S=M+f+c,T=Go(r,r.VERTEX_SHADER,y),A=Go(r,r.FRAGMENT_SHADER,S);r.attachShader(_,T),r.attachShader(_,A),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(U){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(_)||"",X=r.getShaderInfoLog(T)||"",N=r.getShaderInfoLog(A)||"",V=z.trim(),j=X.trim(),$=N.trim();let se=!0,k=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,T,A);else{const Z=Vo(r,T,"vertex"),ee=Vo(r,A,"fragment");et("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+V+`
`+Z+`
`+ee)}else V!==""?Oe("WebGLProgram: Program Info Log:",V):(j===""||$==="")&&(k=!1);k&&(U.diagnostics={runnable:se,programLog:V,vertexShader:{log:j,prefix:m},fragmentShader:{log:$,prefix:f}})}r.deleteShader(T),r.deleteShader(A),v=new Ur(r,_),w=jm(r,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(_,Wm)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=A,this}let m0=0;class g0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _0(e),t.set(e,n)),n}}class _0{constructor(e){this.id=m0++,this.code=e,this.usedTimes=0}}function x0(i){return i===ni||i===Or||i===zr}function v0(i,e,t,n,r,s){const a=new Ll,c=new g0,o=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,w,P,U,z,X){const N=U.fog,V=z.geometry,j=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,se=e.get(v.envMap||j,$),k=se&&se.mapping===$r?se.image.height:null,Z=p[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ee=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ye=ee!==void 0?ee.length:0;let Be=0;V.morphAttributes.position!==void 0&&(Be=1),V.morphAttributes.normal!==void 0&&(Be=2),V.morphAttributes.color!==void 0&&(Be=3);let at,Ve,Ze,J;if(Z){const ht=cn[Z];at=ht.vertexShader,Ve=ht.fragmentShader}else{at=v.vertexShader,Ve=v.fragmentShader;const ht=c.getVertexShaderStage(v),rt=c.getFragmentShaderStage(v);c.update(v,ht,rt),Ze=ht.id,J=rt.id}const ie=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Fe=z.isInstancedMesh===!0,ve=z.isBatchedMesh===!0,K=!!v.map,xe=!!v.matcap,ge=!!se,Pe=!!v.aoMap,we=!!v.lightMap,Me=!!v.bumpMap&&v.wireframe===!1,We=!!v.normalMap,$e=!!v.displacementMap,ft=!!v.emissiveMap,Je=!!v.metalnessMap,nt=!!v.roughnessMap,L=v.anisotropy>0,_t=v.clearcoat>0,Qe=v.dispersion>0,B=v.retroreflectivity>0,x=v.iridescence>0,F=v.sheen>0,O=v.transmission>0,q=L&&!!v.anisotropyMap,ae=_t&&!!v.clearcoatMap,oe=_t&&!!v.clearcoatNormalMap,Q=_t&&!!v.clearcoatRoughnessMap,ne=x&&!!v.iridescenceMap,le=x&&!!v.iridescenceThicknessMap,Le=F&&!!v.sheenColorMap,de=F&&!!v.sheenRoughnessMap,ce=!!v.specularMap,De=!!v.specularColorMap,Ne=!!v.specularIntensityMap,ke=O&&!!v.transmissionMap,I=O&&!!v.thicknessMap,ue=!!v.gradientMap,te=!!v.alphaMap,he=v.alphaTest>0,_e=!!v.alphaHash,re=!!v.extensions;let Ie=fn;v.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const Re={shaderID:Z,shaderType:v.type,shaderName:v.name,vertexShader:at,fragmentShader:Ve,defines:v.defines,customVertexShaderID:Ze,customFragmentShaderID:J,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:ve,batchingColor:ve&&z._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&z.instanceColor!==null,instancingMorph:Fe&&z.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:K,matcap:xe,envMap:ge,envMapMode:ge&&se.mapping,envMapCubeUVHeight:k,aoMap:Pe,lightMap:we,bumpMap:Me,normalMap:We,displacementMap:$e,emissiveMap:ft,normalMapObjectSpace:We&&v.normalMapType===Qu,normalMapTangentSpace:We&&v.normalMapType===lo,packedNormalMap:We&&v.normalMapType===lo&&x0(v.normalMap.format),metalnessMap:Je,roughnessMap:nt,anisotropy:L,anisotropyMap:q,clearcoat:_t,clearcoatMap:ae,clearcoatNormalMap:oe,clearcoatRoughnessMap:Q,dispersion:Qe,retroreflection:B,iridescence:x,iridescenceMap:ne,iridescenceThicknessMap:le,sheen:F,sheenColorMap:Le,sheenRoughnessMap:de,specularMap:ce,specularColorMap:De,specularIntensityMap:Ne,transmission:O,transmissionMap:ke,thicknessMap:I,gradientMap:ue,opaque:v.transparent===!1&&v.blending===Xi&&v.alphaToCoverage===!1,alphaMap:te,alphaTest:he,alphaHash:_e,combine:v.combine,mapUv:K&&g(v.map.channel),aoMapUv:Pe&&g(v.aoMap.channel),lightMapUv:we&&g(v.lightMap.channel),bumpMapUv:Me&&g(v.bumpMap.channel),normalMapUv:We&&g(v.normalMap.channel),displacementMapUv:$e&&g(v.displacementMap.channel),emissiveMapUv:ft&&g(v.emissiveMap.channel),metalnessMapUv:Je&&g(v.metalnessMap.channel),roughnessMapUv:nt&&g(v.roughnessMap.channel),anisotropyMapUv:q&&g(v.anisotropyMap.channel),clearcoatMapUv:ae&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:de&&g(v.sheenRoughnessMap.channel),specularMapUv:ce&&g(v.specularMap.channel),specularColorMapUv:De&&g(v.specularColorMap.channel),specularIntensityMapUv:Ne&&g(v.specularIntensityMap.channel),transmissionMapUv:ke&&g(v.transmissionMap.channel),thicknessMapUv:I&&g(v.thicknessMap.channel),alphaMapUv:te&&g(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(We||L),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!V.attributes.uv&&(K||te),fog:!!N,useFog:v.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&We===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Se,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Be,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:K&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===ot,decodeVideoTextureEmissive:ft&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===bn,flipSided:v.side===Ut,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:re&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&v.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Re.vertexUv1s=o.has(1),Re.vertexUv2s=o.has(2),Re.vertexUv3s=o.has(3),o.clear(),Re}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)w.push(P),w.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(f(w,v),M(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function f(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function M(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function y(v){const w=p[v.type];let P;if(w){const U=cn[w];P=zh.clone(U.uniforms)}else P=v.uniforms;return P}function S(v,w){let P=h.get(w);return P!==void 0?++P.usedTimes:(P=new p0(i,w,v,r),l.push(P),h.set(w,P)),P}function T(v){if(--v.usedTimes===0){const w=l.indexOf(v);l[w]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){c.remove(v)}function R(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:y,acquireProgram:S,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:R}}function M0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function r(a,c,o){i.get(a)[c]=o}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function S0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Zo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function $o(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function c(u,p,g,_,m,f){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:f},i[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=f),e++,M}function o(u,p,g,_,m,f,M){M.reversedDepth===!0&&(m=-m);const y=c(u,p,g,_,m,f);g.transmission>0?n.push(y):g.transparent===!0?r.push(y):t.push(y)}function l(u,p,g,_,m,f){const M=c(u,p,g,_,m,f);g.transmission>0?n.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function h(u,p){t.length>1&&t.sort(u||S0),n.length>1&&n.sort(p||Zo),r.length>1&&r.sort(p||Zo)}function d(){for(let u=e,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:d,sort:h}}function E0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new $o,i.set(n,[a])):r>=s.length?(a=new $o,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function b0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new it};break;case"SpotLight":t={position:new H,direction:new H,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function y0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let T0=0;function A0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function w0(i){const e=new b0,t=y0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);const r=new H,s=new vt,a=new vt;function c(l){let h=0,d=0,u=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,y=0,S=0,T=0,A=0,R=0,v=0,w=0,P=0;l.sort(A0);for(let z=0,X=l.length;z<X;z++){const N=l[z],V=N.color,j=N.intensity,$=N.distance;let se=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ni?se=N.shadow.map.texture:se=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=V.r*j,d+=V.g*j,u+=V.b*j;else if(N.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(N.sh.coefficients[k],j);P++}else if(N.isSunLight){const k=e.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Z=N.shadow,ee=t.get(N);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=se;const ye=Z.getViewportCount();for(let Be=0;Be<ye;Be++)n.sunShadowMatrix[_+Be]=Z.getMatrix(Be),n.sunShadowCascade[_+Be]=Z._cascadeData[Be];_+=ye,g++}n.sun[p]=k,p++}else if(N.isDirectionalLight){const k=e.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Z=N.shadow,ee=t.get(N);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=N.shadow.matrix,T++}n.directional[m]=k,m++}else if(N.isSpotLight){const k=e.get(N);k.position.setFromMatrixPosition(N.matrixWorld),k.color.copy(V).multiplyScalar(j),k.distance=$,k.coneCos=Math.cos(N.angle),k.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),k.decay=N.decay,n.spot[M]=k;const Z=N.shadow;if(N.map&&(n.spotLightMap[v]=N.map,v++,Z.updateMatrices(N),N.castShadow&&w++),n.spotLightMatrix[M]=Z.matrix,N.castShadow){const ee=t.get(N);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.spotShadow[M]=ee,n.spotShadowMap[M]=se,R++}M++}else if(N.isRectAreaLight){const k=e.get(N);k.color.copy(V).multiplyScalar(j),k.halfWidth.set(N.width*.5,0,0),k.halfHeight.set(0,N.height*.5,0),n.rectArea[y]=k,y++}else if(N.isPointLight){const k=e.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),k.distance=N.distance,k.decay=N.decay,N.castShadow){const Z=N.shadow,ee=t.get(N);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,n.pointShadow[f]=ee,n.pointShadowMap[f]=se,n.pointShadowMatrix[f]=N.shadow.matrix,A++}n.point[f]=k,f++}else if(N.isHemisphereLight){const k=e.get(N);k.skyColor.copy(N.color).multiplyScalar(j),k.groundColor.copy(N.groundColor).multiplyScalar(j),n.hemi[S]=k,S++}}y>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const U=n.hash;(U.sunLength!==p||U.directionalLength!==m||U.pointLength!==f||U.spotLength!==M||U.rectAreaLength!==y||U.hemiLength!==S||U.numSunShadows!==g||U.numDirectionalShadows!==T||U.numPointShadows!==A||U.numSpotShadows!==R||U.numSpotMaps!==v||U.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=y,n.point.length=f,n.hemi.length=S,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,U.sunLength=p,U.directionalLength=m,U.pointLength=f,U.spotLength=M,U.rectAreaLength=y,U.hemiLength=S,U.numSunShadows=g,U.numDirectionalShadows=T,U.numPointShadows=A,U.numSpotShadows=R,U.numSpotMaps=v,U.numLightProbes=P,n.version=T0++)}function o(l,h){let d=0,u=0,p=0,g=0,_=0,m=0;const f=h.matrixWorldInverse;for(let M=0,y=l.length;M<y;M++){const S=l[M];if(S.isSunLight){const T=n.sun[d];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),d++}else if(S.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),u++}else if(S.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),g++}else if(S.isRectAreaLight){const T=n.rectArea[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),a.identity(),s.copy(S.matrixWorld),s.premultiply(f),a.extractRotation(s),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){const T=n.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:c,setupView:o,state:n}}function Jo(i){const e=new w0(i),t=[],n=[],r=[];function s(u){d.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function c(u){n.push(u)}function o(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function B0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let c;return a===void 0?(c=new Jo(i),e.set(r,[c])):s>=a.length?(c=new Jo(i),a.push(c)):c=a[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const R0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
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
}`,P0=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],L0=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Qo=new vt,Hi=new H,Os=new H;function D0(i,e,t){let n=new Fl;const r=new tt,s=new tt,a=new mt,c=new Wh,o=new Vh,l={},h=t.maxTextureSize,d={[ei]:Ut,[Ut]:ei,[bn]:bn},u=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:R0,fragmentShader:C0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new _n;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $t(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pr;let f=this.type;this.render=function(A,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Ru&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Pr);const w=i.getRenderTarget(),P=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),z=i.state;z.setBlending(An),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const X=f!==this.type;X&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(V=>V.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,V=A.length;N<V;N++){const j=A[N],$=j.shadow;if($===void 0){Oe("WebGLShadowMap:",j,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const se=$.getFrameExtents();r.multiply(se),s.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/se.x),r.x=s.x*se.x,$.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/se.y),r.y=s.y*se.y,$.mapSize.y=s.y));const k=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=k,$.map===null||X===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Gi){if(j.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new rn(r.x,r.y,{format:ni,type:gn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),$.map.texture.name=j.name+".shadowMap",$.map.depthTexture=new Ji(r.x,r.y,hn),$.map.depthTexture.name=j.name+".shadowMapDepth",$.map.depthTexture.format=Rn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Et,$.map.depthTexture.magFilter=Et}else j.isPointLight?($.map=new Yl(r.x),$.map.depthTexture=new Fh(r.x,mn)):($.map=new rn(r.x,r.y),$.map.depthTexture=new Ji(r.x,r.y,mn)),$.map.depthTexture.name=j.name+".shadowMap",$.map.depthTexture.format=Rn,this.type===Pr?($.map.depthTexture.compareFunction=k?Ga:Ha,$.map.depthTexture.minFilter=Ct,$.map.depthTexture.magFilter=Ct):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Et,$.map.depthTexture.magFilter=Et);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const Z=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();j.isPointLight!==!0&&$.updateMatrices(j,v);for(let ee=0;ee<Z;ee++){const ye=$.getCamera(ee);if(j.isPointLight){const Be=$.camera,at=$.matrix,Ve=j.distance||Be.far;Ve!==Be.far&&(Be.far=Ve,Be.updateProjectionMatrix()),Hi.setFromMatrixPosition(j.matrixWorld),Be.position.copy(Hi),Os.copy(Be.position),Os.add(P0[ee]),Be.up.copy(L0[ee]),Be.lookAt(Os),Be.updateMatrixWorld(),at.makeTranslation(-Hi.x,-Hi.y,-Hi.z),Qo.multiplyMatrices(Be.projectionMatrix,Be.matrixWorldInverse),$._frustum.setFromProjectionMatrix(Qo,Be.coordinateSystem,Be.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,ee),i.clear();else{ee===0&&(i.setRenderTarget($.map),i.clear());const Be=$.getViewport(ee);a.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),z.viewport(a)}n=$.getFrustum(ee),S(R,v,ye,j,this.type)}$.isPointLightShadow!==!0&&this.type===Gi&&M($,v),$.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(w,P,U)};function M(A,R){const v=e.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new rn(r.x,r.y,{format:ni,type:gn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,v,u,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,v,p,_,null)}function y(A,R,v,w){let P=null;const U=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)P=U;else if(P=v.isPointLight===!0?o:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const z=P.uuid,X=R.uuid;let N=l[z];N===void 0&&(N={},l[z]=N);let V=N[X];V===void 0&&(V=P.clone(),N[X]=V,R.addEventListener("dispose",T)),P=V}if(P.visible=R.visible,P.wireframe=R.wireframe,w===Gi?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:d[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const z=i.properties.get(P);z.light=v}return P}function S(A,R,v,w,P){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===Gi)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const X=e.update(A),N=A.material;if(Array.isArray(N)){const V=X.groups;for(let j=0,$=V.length;j<$;j++){const se=V[j],k=N[se.materialIndex];if(k&&k.visible){const Z=y(A,k,w,P);A.onBeforeShadow(i,A,R,v,X,Z,se),i.renderBufferDirect(v,null,X,Z,A,se),A.onAfterShadow(i,A,R,v,X,Z,se)}}}else if(N.visible){const V=y(A,N,w,P);A.onBeforeShadow(i,A,R,v,X,V,null),i.renderBufferDirect(v,null,X,V,A,null),A.onAfterShadow(i,A,R,v,X,V,null)}}const z=A.children;for(let X=0,N=z.length;X<N;X++)S(z[X],R,v,w,P)}function T(A){A.target.removeEventListener("dispose",T);for(const v in l){const w=l[v],P=A.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function I0(i,e){function t(){let I=!1;const ue=new mt;let te=null;const he=new mt(0,0,0,0);return{setMask:function(_e){te!==_e&&!I&&(i.colorMask(_e,_e,_e,_e),te=_e)},setLocked:function(_e){I=_e},setClear:function(_e,re,Ie,Re,ht){ht===!0&&(_e*=Re,re*=Re,Ie*=Re),ue.set(_e,re,Ie,Re),he.equals(ue)===!1&&(i.clearColor(_e,re,Ie,Re),he.copy(ue))},reset:function(){I=!1,te=null,he.set(-1,0,0,0)}}}function n(){let I=!1,ue=!1,te=null,he=null,_e=null;return{setReversed:function(re){if(ue!==re){const Ie=e.get("EXT_clip_control");re?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),ue=re;const Re=_e;_e=null,this.setClear(Re)}},getReversed:function(){return ue},setTest:function(re){re?ie(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(re){te!==re&&!I&&(i.depthMask(re),te=re)},setFunc:function(re){if(ue&&(re=hh[re]),he!==re){switch(re){case Hs:i.depthFunc(i.NEVER);break;case Gs:i.depthFunc(i.ALWAYS);break;case Ws:i.depthFunc(i.LESS);break;case qi:i.depthFunc(i.LEQUAL);break;case Vs:i.depthFunc(i.EQUAL);break;case Xs:i.depthFunc(i.GEQUAL);break;case Ys:i.depthFunc(i.GREATER);break;case qs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=re}},setLocked:function(re){I=re},setClear:function(re){_e!==re&&(_e=re,ue&&(re=1-re),i.clearDepth(re))},reset:function(){I=!1,te=null,he=null,_e=null,ue=!1}}}function r(){let I=!1,ue=null,te=null,he=null,_e=null,re=null,Ie=null,Re=null,ht=null;return{setTest:function(rt){I||(rt?ie(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(rt){ue!==rt&&!I&&(i.stencilMask(rt),ue=rt)},setFunc:function(rt,Jt,sn){(te!==rt||he!==Jt||_e!==sn)&&(i.stencilFunc(rt,Jt,sn),te=rt,he=Jt,_e=sn)},setOp:function(rt,Jt,sn){(re!==rt||Ie!==Jt||Re!==sn)&&(i.stencilOp(rt,Jt,sn),re=rt,Ie=Jt,Re=sn)},setLocked:function(rt){I=rt},setClear:function(rt){ht!==rt&&(i.clearStencil(rt),ht=rt)},reset:function(){I=!1,ue=null,te=null,he=null,_e=null,re=null,Ie=null,Re=null,ht=null}}}const s=new t,a=new n,c=new r,o=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],_=null,m=!1,f=null,M=null,y=null,S=null,T=null,A=null,R=null,v=new it(0,0,0),w=0,P=!1,U=null,z=null,X=null,N=null,V=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,se=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(k)[1]),$=se>=1):k.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),$=se>=2);let Z=null,ee={};const ye=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),at=new mt().fromArray(ye),Ve=new mt().fromArray(Be);function Ze(I,ue,te,he){const _e=new Uint8Array(4),re=i.createTexture();i.bindTexture(I,re),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<te;Ie++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(ue+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return re}const J={};J[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ie(i.DEPTH_TEST),a.setFunc(qi),Me(!1),We(ro),ie(i.CULL_FACE),Pe(An);function ie(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Se(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Fe(I,ue){return u[I]!==ue?(i.bindFramebuffer(I,ue),u[I]=ue,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ue),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function ve(I,ue){let te=g,he=!1;if(I){te=p.get(ue),te===void 0&&(te=[],p.set(ue,te));const _e=I.textures;if(te.length!==_e.length||te[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Ie=_e.length;re<Ie;re++)te[re]=i.COLOR_ATTACHMENT0+re;te.length=_e.length,he=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,he=!0);he&&i.drawBuffers(te)}function K(I){return _!==I?(i.useProgram(I),_=I,!0):!1}const xe={[Ei]:i.FUNC_ADD,[Pu]:i.FUNC_SUBTRACT,[Lu]:i.FUNC_REVERSE_SUBTRACT};xe[Du]=i.MIN,xe[Iu]=i.MAX;const ge={[Nu]:i.ZERO,[Uu]:i.ONE,[Fu]:i.SRC_COLOR,[dl]:i.SRC_ALPHA,[Wu]:i.SRC_ALPHA_SATURATE,[Hu]:i.DST_COLOR,[zu]:i.DST_ALPHA,[Ou]:i.ONE_MINUS_SRC_COLOR,[fl]:i.ONE_MINUS_SRC_ALPHA,[Gu]:i.ONE_MINUS_DST_COLOR,[ku]:i.ONE_MINUS_DST_ALPHA,[Vu]:i.CONSTANT_COLOR,[Xu]:i.ONE_MINUS_CONSTANT_COLOR,[Yu]:i.CONSTANT_ALPHA,[qu]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(I,ue,te,he,_e,re,Ie,Re,ht,rt){if(I===An){m===!0&&(Se(i.BLEND),m=!1);return}if(m===!1&&(ie(i.BLEND),m=!0),I!==Cu){if(I!==f||rt!==P){if((M!==Ei||T!==Ei)&&(i.blendEquation(i.FUNC_ADD),M=Ei,T=Ei),rt)switch(I){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case so:i.blendFunc(i.ONE,i.ONE);break;case ao:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:et("WebGLState: Invalid blending: ",I);break}else switch(I){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case so:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ao:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oo:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",I);break}y=null,S=null,A=null,R=null,v.set(0,0,0),w=0,f=I,P=rt}return}_e=_e||ue,re=re||te,Ie=Ie||he,(ue!==M||_e!==T)&&(i.blendEquationSeparate(xe[ue],xe[_e]),M=ue,T=_e),(te!==y||he!==S||re!==A||Ie!==R)&&(i.blendFuncSeparate(ge[te],ge[he],ge[re],ge[Ie]),y=te,S=he,A=re,R=Ie),(Re.equals(v)===!1||ht!==w)&&(i.blendColor(Re.r,Re.g,Re.b,ht),v.copy(Re),w=ht),f=I,P=!1}function we(I,ue){I.side===bn?Se(i.CULL_FACE):ie(i.CULL_FACE);let te=I.side===Ut;ue&&(te=!te),Me(te),I.blending===Xi&&I.transparent===!1?Pe(An):Pe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const he=I.stencilWrite;c.setTest(he),he&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ft(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(I){U!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),U=I)}function We(I){I!==wu?(ie(i.CULL_FACE),I!==z&&(I===ro?i.cullFace(i.BACK):I===Bu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),z=I}function $e(I){I!==X&&($&&i.lineWidth(I),X=I)}function ft(I,ue,te){I?(ie(i.POLYGON_OFFSET_FILL),(N!==ue||V!==te)&&(N=ue,V=te,a.getReversed()&&(ue=-ue),i.polygonOffset(ue,te))):Se(i.POLYGON_OFFSET_FILL)}function Je(I){I?ie(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function nt(I){I===void 0&&(I=i.TEXTURE0+j-1),Z!==I&&(i.activeTexture(I),Z=I)}function L(I,ue,te){te===void 0&&(Z===null?te=i.TEXTURE0+j-1:te=Z);let he=ee[te];he===void 0&&(he={type:void 0,texture:void 0},ee[te]=he),(he.type!==I||he.texture!==ue)&&(Z!==te&&(i.activeTexture(te),Z=te),i.bindTexture(I,ue||J[I]),he.type=I,he.texture=ue)}function _t(){const I=ee[Z];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Qe(){try{i.compressedTexImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function F(){try{i.texSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function O(){try{i.compressedTexSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function ae(){try{i.texStorage2D(...arguments)}catch(I){et("WebGLState:",I)}}function oe(){try{i.texStorage3D(...arguments)}catch(I){et("WebGLState:",I)}}function Q(){try{i.texImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function ne(){try{i.texImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function le(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function Le(I,ue){d[I]!==ue&&(i.pixelStorei(I,ue),d[I]=ue)}function de(I){at.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),at.copy(I))}function ce(I){Ve.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Ve.copy(I))}function De(I,ue){let te=l.get(ue);te===void 0&&(te=new WeakMap,l.set(ue,te));let he=te.get(I);he===void 0&&(he=i.getUniformBlockIndex(ue,I.name),te.set(I,he))}function Ne(I,ue){const he=l.get(ue).get(I);o.get(ue)!==he&&(i.uniformBlockBinding(ue,he,I.__bindingPointIndex),o.set(ue,he))}function ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Z=null,ee={},u={},p=new WeakMap,g=[],_=null,m=!1,f=null,M=null,y=null,S=null,T=null,A=null,R=null,v=new it(0,0,0),w=0,P=!1,U=null,z=null,X=null,N=null,V=null,at.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),c.reset()}return{buffers:{color:s,depth:a,stencil:c},enable:ie,disable:Se,bindFramebuffer:Fe,drawBuffers:ve,useProgram:K,setBlending:Pe,setMaterial:we,setFlipSided:Me,setCullFace:We,setLineWidth:$e,setPolygonOffset:ft,setScissorTest:Je,activeTexture:nt,bindTexture:L,unbindTexture:_t,compressedTexImage2D:Qe,compressedTexImage3D:B,texImage2D:Q,texImage3D:ne,pixelStorei:Le,getParameter:le,updateUBOMapping:De,uniformBlockBinding:Ne,texStorage2D:ae,texStorage3D:oe,texSubImage2D:x,texSubImage3D:F,compressedTexSubImage2D:O,compressedTexSubImage3D:q,scissor:de,viewport:ce,reset:ke}}function N0(i,e,t,n,r,s,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new tt,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(B,x){return g?new OffscreenCanvas(B,x):Gr("canvas")}function m(B,x,F){let O=1;const q=Qe(B);if((q.width>F||q.height>F)&&(O=F/Math.max(q.width,q.height)),O<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const ae=Math.floor(O*q.width),oe=Math.floor(O*q.height);u===void 0&&(u=_(ae,oe));const Q=x?_(ae,oe):u;return Q.width=ae,Q.height=oe,Q.getContext("2d").drawImage(B,0,0,ae,oe),Oe("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ae+"x"+oe+")."),Q}else return"data"in B&&Oe("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),B;return B}function f(B){return B.generateMipmaps}function M(B){i.generateMipmap(B)}function y(B){return B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?i.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(B,x,F,O,q,ae=!1){if(B!==null){if(i[B]!==void 0)return i[B];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let oe;O&&(oe=e.get("EXT_texture_norm16"),oe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===i.RED&&(F===i.FLOAT&&(Q=i.R32F),F===i.HALF_FLOAT&&(Q=i.R16F),F===i.UNSIGNED_BYTE&&(Q=i.R8),F===i.UNSIGNED_SHORT&&oe&&(Q=oe.R16_EXT),F===i.SHORT&&oe&&(Q=oe.R16_SNORM_EXT)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.R8UI),F===i.UNSIGNED_SHORT&&(Q=i.R16UI),F===i.UNSIGNED_INT&&(Q=i.R32UI),F===i.BYTE&&(Q=i.R8I),F===i.SHORT&&(Q=i.R16I),F===i.INT&&(Q=i.R32I)),x===i.RG&&(F===i.FLOAT&&(Q=i.RG32F),F===i.HALF_FLOAT&&(Q=i.RG16F),F===i.UNSIGNED_BYTE&&(Q=i.RG8),F===i.UNSIGNED_SHORT&&oe&&(Q=oe.RG16_EXT),F===i.SHORT&&oe&&(Q=oe.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.RG8UI),F===i.UNSIGNED_SHORT&&(Q=i.RG16UI),F===i.UNSIGNED_INT&&(Q=i.RG32UI),F===i.BYTE&&(Q=i.RG8I),F===i.SHORT&&(Q=i.RG16I),F===i.INT&&(Q=i.RG32I)),x===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),F===i.UNSIGNED_INT&&(Q=i.RGB32UI),F===i.BYTE&&(Q=i.RGB8I),F===i.SHORT&&(Q=i.RGB16I),F===i.INT&&(Q=i.RGB32I)),x===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),F===i.UNSIGNED_INT&&(Q=i.RGBA32UI),F===i.BYTE&&(Q=i.RGBA8I),F===i.SHORT&&(Q=i.RGBA16I),F===i.INT&&(Q=i.RGBA32I)),x===i.RGB&&(F===i.UNSIGNED_SHORT&&oe&&(Q=oe.RGB16_EXT),F===i.SHORT&&oe&&(Q=oe.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),x===i.RGBA){const ne=ae?kr:Ye.getTransfer(q);F===i.FLOAT&&(Q=i.RGBA32F),F===i.HALF_FLOAT&&(Q=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Q=ne===ot?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&oe&&(Q=oe.RGBA16_EXT),F===i.SHORT&&oe&&(Q=oe.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function T(B,x){let F;return B?x===null||x===mn||x===Zi?F=i.DEPTH24_STENCIL8:x===hn?F=i.DEPTH32F_STENCIL8:x===Ki&&(F=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===mn||x===Zi?F=i.DEPTH_COMPONENT24:x===hn?F=i.DEPTH_COMPONENT32F:x===Ki&&(F=i.DEPTH_COMPONENT16),F}function A(B,x){return f(B)===!0||B.isFramebufferTexture&&B.minFilter!==Et&&B.minFilter!==Ct?Math.log2(Math.max(x.width,x.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?x.mipmaps.length:1}function R(B){const x=B.target;x.removeEventListener("dispose",R),w(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function v(B){const x=B.target;x.removeEventListener("dispose",v),U(x)}function w(B){const x=n.get(B);if(x.__webglInit===void 0)return;const F=B.source,O=p.get(F);if(O){const q=O[x.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(B),Object.keys(O).length===0&&p.delete(F)}n.remove(B)}function P(B){const x=n.get(B);i.deleteTexture(x.__webglTexture);const F=B.source,O=p.get(F);delete O[x.__cacheKey],a.memory.textures--}function U(B){const x=n.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),n.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(x.__webglFramebuffer[O]))for(let q=0;q<x.__webglFramebuffer[O].length;q++)i.deleteFramebuffer(x.__webglFramebuffer[O][q]);else i.deleteFramebuffer(x.__webglFramebuffer[O]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[O])}else{if(Array.isArray(x.__webglFramebuffer))for(let O=0;O<x.__webglFramebuffer.length;O++)i.deleteFramebuffer(x.__webglFramebuffer[O]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let O=0;O<x.__webglColorRenderbuffer.length;O++)x.__webglColorRenderbuffer[O]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[O]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=B.textures;for(let O=0,q=F.length;O<q;O++){const ae=n.get(F[O]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(F[O])}n.remove(B)}let z=0;function X(){z=0}function N(){return z}function V(B){z=B}function j(){const B=z;return B>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+r.maxTextures),z+=1,B}function $(B){const x=[];return x.push(B.wrapS),x.push(B.wrapT),x.push(B.wrapR||0),x.push(B.magFilter),x.push(B.minFilter),x.push(B.anisotropy),x.push(B.internalFormat),x.push(B.format),x.push(B.type),x.push(B.generateMipmaps),x.push(B.premultiplyAlpha),x.push(B.flipY),x.push(B.unpackAlignment),x.push(B.colorSpace),x.join()}function se(B,x){const F=n.get(B);if(B.isVideoTexture&&L(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&F.__version!==B.version){const O=B.image;if(O===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(F,B,x);return}}else B.isExternalTexture&&(F.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function k(B,x){const F=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&F.__version!==B.version){Se(F,B,x);return}else B.isExternalTexture&&(F.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function Z(B,x){const F=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&F.__version!==B.version){Se(F,B,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function ee(B,x){const F=n.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&F.__version!==B.version){Fe(F,B,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}const ye={[Ks]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[Zs]:i.MIRRORED_REPEAT},Be={[Et]:i.NEAREST,[$u]:i.NEAREST_MIPMAP_NEAREST,[ar]:i.NEAREST_MIPMAP_LINEAR,[Ct]:i.LINEAR,[cs]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},at={[eh]:i.NEVER,[sh]:i.ALWAYS,[th]:i.LESS,[Ha]:i.LEQUAL,[nh]:i.EQUAL,[Ga]:i.GEQUAL,[ih]:i.GREATER,[rh]:i.NOTEQUAL};function Ve(B,x){if(x.type===hn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ct||x.magFilter===cs||x.magFilter===ar||x.magFilter===Jn||x.minFilter===Ct||x.minFilter===cs||x.minFilter===ar||x.minFilter===Jn)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,ye[x.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,ye[x.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,ye[x.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,Be[x.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,Be[x.minFilter]),x.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,at[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Et||x.minFilter!==ar&&x.minFilter!==Jn||x.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Ze(B,x){let F=!1;B.__webglInit===void 0&&(B.__webglInit=!0,x.addEventListener("dispose",R));const O=x.source;let q=p.get(O);q===void 0&&(q={},p.set(O,q));const ae=$(x);if(ae!==B.__cacheKey){q[ae]===void 0&&(q[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),q[ae].usedTimes++;const oe=q[B.__cacheKey];oe!==void 0&&(q[B.__cacheKey].usedTimes--,oe.usedTimes===0&&P(x)),B.__cacheKey=ae,B.__webglTexture=q[ae].texture}return F}function J(B,x,F){return Math.floor(Math.floor(B/F)/x)}function ie(B,x,F,O){const ae=B.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,F,O,x.data);else{ae.sort((Le,de)=>Le.start-de.start);let oe=0;for(let Le=1;Le<ae.length;Le++){const de=ae[oe],ce=ae[Le],De=de.start+de.count,Ne=J(ce.start,x.width,4),ke=J(de.start,x.width,4);ce.start<=De+1&&Ne===ke&&J(ce.start+ce.count-1,x.width,4)===Ne?de.count=Math.max(de.count,ce.start+ce.count-de.start):(++oe,ae[oe]=ce)}ae.length=oe+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Le=0,de=ae.length;Le<de;Le++){const ce=ae[Le],De=Math.floor(ce.start/4),Ne=Math.ceil(ce.count/4),ke=De%x.width,I=Math.floor(De/x.width),ue=Ne,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,ke,I,ue,te,F,O,x.data)}B.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function Se(B,x,F){let O=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(O=i.TEXTURE_3D);const q=Ze(B,x),ae=x.source;t.bindTexture(O,B.__webglTexture,i.TEXTURE0+F);const oe=n.get(ae);if(ae.version!==oe.__version||q===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const te=Ye.getPrimaries(Ye.workingColorSpace),he=x.colorSpace===un?null:Ye.getPrimaries(x.colorSpace),_e=x.colorSpace===un||te===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ne=m(x.image,!1,r.maxTextureSize);ne=_t(x,ne);const le=s.convert(x.format,x.colorSpace),Le=s.convert(x.type);let de=S(x.internalFormat,le,Le,x.normalized,x.colorSpace,x.isVideoTexture);Ve(O,x);let ce;const De=x.mipmaps,Ne=x.isVideoTexture!==!0,ke=oe.__version===void 0||q===!0,I=ae.dataReady,ue=A(x,ne);if(x.isDepthTexture)de=T(x.format===Qn,x.type),ke&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,de,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Le,null));else if(x.isDataTexture)if(De.length>0){Ne&&ke&&t.texStorage2D(i.TEXTURE_2D,ue,de,De[0].width,De[0].height);for(let te=0,he=De.length;te<he;te++)ce=De[te],Ne?I&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Le,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Le,ce.data);x.generateMipmaps=!1}else Ne?(ke&&t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height),I&&ie(x,ne,le,Le)):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Le,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ne&&ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,De[0].width,De[0].height,ne.depth);for(let te=0,he=De.length;te<he;te++)if(ce=De[te],x.format!==Zt)if(le!==null)if(Ne){if(I)if(x.layerUpdates.size>0){const _e=Co(ce.width,ce.height,x.format,x.type);for(const re of x.layerUpdates){const Ie=ce.data.subarray(re*_e/ce.data.BYTES_PER_ELEMENT,(re+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,re,ce.width,ce.height,1,le,Ie)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,ce.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,Le,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,le,Le,ce.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ne&&ke&&t.texStorage2D(i.TEXTURE_2D,ue,de,De[0].width,De[0].height);for(let te=0,he=De.length;te<he;te++)ce=De[te],x.format!==Zt?le!==null?Ne?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?I&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Le,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Le,ce.data)}else if(x.isDataArrayTexture)if(Ne){if(ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,ne.width,ne.height,ne.depth),I)if(x.layerUpdates.size>0){const te=Co(ne.width,ne.height,x.format,x.type);for(const he of x.layerUpdates){const _e=ne.data.subarray(he*te/ne.data.BYTES_PER_ELEMENT,(he+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,ne.width,ne.height,1,le,Le,_e)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,le,Le,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,ne.width,ne.height,ne.depth,0,le,Le,ne.data);else if(x.isData3DTexture)Ne?(ke&&t.texStorage3D(i.TEXTURE_3D,ue,de,ne.width,ne.height,ne.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,le,Le,ne.data)):t.texImage3D(i.TEXTURE_3D,0,de,ne.width,ne.height,ne.depth,0,le,Le,ne.data);else if(x.isFramebufferTexture){if(ke)if(Ne)t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height);else{let te=ne.width,he=ne.height;for(let _e=0;_e<ue;_e++)t.texImage2D(i.TEXTURE_2D,_e,de,te,he,0,le,Le,null),te>>=1,he>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),d.add(x),te.onpaint=he=>{const _e=he.changedElements;for(const re of d)_e.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const _e=i.RGBA,re=i.RGBA,Ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,_e,re,Ie,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ne&&ke){const te=Qe(De[0]);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}for(let te=0,he=De.length;te<he;te++)ce=De[te],Ne?I&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,le,Le,ce):t.texImage2D(i.TEXTURE_2D,te,de,le,Le,ce);x.generateMipmaps=!1}else if(Ne){if(ke){const te=Qe(ne);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Le,ne)}else t.texImage2D(i.TEXTURE_2D,0,de,le,Le,ne);f(x)&&M(O),oe.__version=ae.version,x.onUpdate&&x.onUpdate(x)}B.__version=x.version}function Fe(B,x,F){if(x.image.length!==6)return;const O=Ze(B,x),q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+F);const ae=n.get(q);if(q.version!==ae.__version||O===!0){t.activeTexture(i.TEXTURE0+F);const oe=Ye.getPrimaries(Ye.workingColorSpace),Q=x.colorSpace===un?null:Ye.getPrimaries(x.colorSpace),ne=x.colorSpace===un||oe===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const le=x.isCompressedTexture||x.image[0].isCompressedTexture,Le=x.image[0]&&x.image[0].isDataTexture,de=[];for(let re=0;re<6;re++)!le&&!Le?de[re]=m(x.image[re],!0,r.maxCubemapSize):de[re]=Le?x.image[re].image:x.image[re],de[re]=_t(x,de[re]);const ce=de[0],De=s.convert(x.format,x.colorSpace),Ne=s.convert(x.type),ke=S(x.internalFormat,De,Ne,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,ue=ae.__version===void 0||O===!0,te=q.dataReady;let he=A(x,ce);Ve(i.TEXTURE_CUBE_MAP,x);let _e;if(le){I&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,ke,ce.width,ce.height);for(let re=0;re<6;re++){_e=de[re].mipmaps;for(let Ie=0;Ie<_e.length;Ie++){const Re=_e[Ie];x.format!==Zt?De!==null?I?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,ke,Re.width,Re.height,0,Re.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Re.width,Re.height,De,Ne,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,ke,Re.width,Re.height,0,De,Ne,Re.data)}}}else{if(_e=x.mipmaps,I&&ue){_e.length>0&&he++;const re=Qe(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,ke,re.width,re.height)}for(let re=0;re<6;re++)if(Le){I?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,de[re].width,de[re].height,De,Ne,de[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ke,de[re].width,de[re].height,0,De,Ne,de[re].data);for(let Ie=0;Ie<_e.length;Ie++){const ht=_e[Ie].image[re].image;I?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,ht.width,ht.height,De,Ne,ht.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,ke,ht.width,ht.height,0,De,Ne,ht.data)}}else{I?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,De,Ne,de[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ke,De,Ne,de[re]);for(let Ie=0;Ie<_e.length;Ie++){const Re=_e[Ie];I?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,De,Ne,Re.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,ke,De,Ne,Re.image[re])}}}f(x)&&M(i.TEXTURE_CUBE_MAP),ae.__version=q.version,x.onUpdate&&x.onUpdate(x)}B.__version=x.version}function ve(B,x,F,O,q,ae){const oe=s.convert(F.format,F.colorSpace),Q=s.convert(F.type),ne=S(F.internalFormat,oe,Q,F.normalized,F.colorSpace),le=n.get(x),Le=n.get(F);if(Le.__renderTarget=x,!le.__hasExternalTextures){const de=Math.max(1,x.width>>ae),ce=Math.max(1,x.height>>ae);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,ae,ne,de,ce,x.depth,0,oe,Q,null):t.texImage2D(q,ae,ne,de,ce,0,oe,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),nt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,q,Le.__webglTexture,0,Je(x)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,q,Le.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function K(B,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,B),x.depthBuffer){const O=x.depthTexture,q=O&&O.isDepthTexture?O.type:null,ae=T(x.stencilBuffer,q),oe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;nt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je(x),ae,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je(x),ae,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ae,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,B)}else{const O=x.textures;for(let q=0;q<O.length;q++){const ae=O[q],oe=s.convert(ae.format,ae.colorSpace),Q=s.convert(ae.type),ne=S(ae.internalFormat,oe,Q,ae.normalized,ae.colorSpace);nt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je(x),ne,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je(x),ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(B,x,F){const O=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(x.depthTexture);if(q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),O){if(q.__webglInit===void 0&&(q.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x.depthTexture);const le=s.convert(x.depthTexture.format),Le=s.convert(x.depthTexture.type);let de;x.depthTexture.format===Rn?de=i.DEPTH_COMPONENT24:x.depthTexture.format===Qn&&(de=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,x.width,x.height,0,le,Le,null)}}else se(x.depthTexture,0);const ae=q.__webglTexture,oe=Je(x),Q=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,ne=x.depthTexture.format===Qn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Rn)nt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,ae,0);else if(x.depthTexture.format===Qn)nt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ge(B){const x=n.get(B),F=B.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==B.depthTexture){const O=B.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),O){const q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,O.removeEventListener("dispose",q)};O.addEventListener("dispose",q),x.__depthDisposeCallback=q}x.__boundDepthTexture=O}if(B.depthTexture&&!x.__autoAllocateDepthBuffer)if(F)for(let O=0;O<6;O++)xe(x.__webglFramebuffer[O],B,O);else{const O=B.texture.mipmaps;O&&O.length>0?xe(x.__webglFramebuffer[0],B,0):xe(x.__webglFramebuffer,B,0)}else if(F){x.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[O]),x.__webglDepthbuffer[O]===void 0)x.__webglDepthbuffer[O]=i.createRenderbuffer(),K(x.__webglDepthbuffer[O],B,!1);else{const q=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ae)}}else{const O=B.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),K(x.__webglDepthbuffer,B,!1);else{const q=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(B,x,F){const O=n.get(B);x!==void 0&&ve(O.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&ge(B)}function we(B){const x=B.texture,F=n.get(B),O=n.get(x);B.addEventListener("dispose",v);const q=B.textures,ae=B.isWebGLCubeRenderTarget===!0,oe=q.length>1;if(oe||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=x.version,a.memory.textures++),ae){F.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[Q]=[];for(let ne=0;ne<x.mipmaps.length;ne++)F.__webglFramebuffer[Q][ne]=i.createFramebuffer()}else F.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)F.__webglFramebuffer[Q]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(oe)for(let Q=0,ne=q.length;Q<ne;Q++){const le=n.get(q[Q]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(B.samples>0&&nt(B)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Q=0;Q<q.length;Q++){const ne=q[Q];F.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[Q]);const le=s.convert(ne.format,ne.colorSpace),Le=s.convert(ne.type),de=S(ne.internalFormat,le,Le,ne.normalized,ne.colorSpace,B.isXRRenderTarget===!0),ce=Je(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,de,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,F.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),K(F.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)ve(F.__webglFramebuffer[Q][ne],B,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ne);else ve(F.__webglFramebuffer[Q],B,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);f(x)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let Q=0,ne=q.length;Q<ne;Q++){const le=q[Q],Le=n.get(le);let de=i.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(de=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,Le.__webglTexture),Ve(de,le),ve(F.__webglFramebuffer,B,le,i.COLOR_ATTACHMENT0+Q,de,0),f(le)&&M(de)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Q=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,O.__webglTexture),Ve(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)ve(F.__webglFramebuffer[ne],B,x,i.COLOR_ATTACHMENT0,Q,ne);else ve(F.__webglFramebuffer,B,x,i.COLOR_ATTACHMENT0,Q,0);f(x)&&M(Q),t.unbindTexture()}B.depthBuffer&&ge(B)}function Me(B){const x=B.textures;for(let F=0,O=x.length;F<O;F++){const q=x[F];if(f(q)){const ae=y(B),oe=n.get(q).__webglTexture;t.bindTexture(ae,oe),M(ae),t.unbindTexture()}}}const We=[],$e=[];function ft(B){if(B.samples>0){if(nt(B)===!1){const x=B.textures,F=B.width,O=B.height;let q=i.COLOR_BUFFER_BIT;const ae=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(B),Q=x.length>1;if(Q)for(let le=0;le<x.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const ne=B.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<x.length;le++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Le=n.get(x[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,F,O,0,0,F,O,q,i.NEAREST),o===!0&&(We.length=0,$e.length=0,We.push(i.COLOR_ATTACHMENT0+le),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(We.push(ae),$e.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,$e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let le=0;le<x.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Le=n.get(x[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&o){const x=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Je(B){return Math.min(r.maxSamples,B.samples)}function nt(B){const x=n.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function L(B){const x=a.render.frame;h.get(B)!==x&&(h.set(B,x),B.update())}function _t(B,x){const F=B.colorSpace,O=B.format,q=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||F!==$i&&F!==un&&(Ye.getTransfer(F)===ot?(O!==Zt||q!==Ht)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",F)),x}function Qe(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(l.width=B.naturalWidth||B.width,l.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(l.width=B.displayWidth,l.height=B.displayHeight):(l.width=B.width,l.height=B.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=X,this.getTextureUnits=N,this.setTextureUnits=V,this.setTexture2D=se,this.setTexture2DArray=k,this.setTexture3D=Z,this.setTextureCube=ee,this.rebindTextures=Pe,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=nt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function U0(i,e){function t(n,r=un){let s;const a=Ye.getTransfer(r);if(n===Ht)return i.UNSIGNED_BYTE;if(n===Ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Fa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Al)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===bl)return i.BYTE;if(n===yl)return i.SHORT;if(n===Ki)return i.UNSIGNED_SHORT;if(n===Na)return i.INT;if(n===mn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===gn)return i.HALF_FLOAT;if(n===wl)return i.ALPHA;if(n===Bl)return i.RGB;if(n===Zt)return i.RGBA;if(n===Rn)return i.DEPTH_COMPONENT;if(n===Qn)return i.DEPTH_STENCIL;if(n===Rl)return i.RED;if(n===Oa)return i.RED_INTEGER;if(n===ni)return i.RG;if(n===za)return i.RG_INTEGER;if(n===ka)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ir||n===Nr)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$s||n===Js||n===Qs||n===js)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===$s)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Js)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===js)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ea||n===ta||n===na||n===ia||n===ra||n===Or||n===sa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ea||n===ta)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===na)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ia)return s.COMPRESSED_R11_EAC;if(n===ra)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Or)return s.COMPRESSED_RG11_EAC;if(n===sa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===aa||n===oa||n===la||n===ca||n===ua||n===ha||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===aa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===la)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ua)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===da)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ma)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ga)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_a)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xa)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===va)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ma||n===Sa||n===Ea)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ma)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ea)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ba||n===ya||n===zr||n===Ta)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ba)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ya)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ta)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
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

}`;class z0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new zl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wt({vertexShader:F0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k0 extends si{constructor(e,t){super();const n=this;let r=null,s=1,a=null,c="local-floor",o=1,l=null,h=null,d=null,u=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new z0,f={},M=t.getContextAttributes();let y=null,S=null;const T=[],A=[],R=new tt;let v=null,w=null;const P=new qt;P.viewport=new mt;const U=new qt;U.viewport=new mt;const z=[P,U],X=new qh;let N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ie=T[J];return ie===void 0&&(ie=new xs,T[J]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(J){let ie=T[J];return ie===void 0&&(ie=new xs,T[J]=ie),ie.getGripSpace()},this.getHand=function(J){let ie=T[J];return ie===void 0&&(ie=new xs,T[J]=ie),ie.getHandSpace()};function j(J){const ie=A.indexOf(J.inputSource);if(ie===-1)return;const Se=T[ie];Se!==void 0&&(Se.update(J.inputSource,J.frame,l||a),Se.dispatchEvent({type:J.type,data:J.inputSource}))}function $(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",se);for(let J=0;J<T.length;J++){const ie=A[J];ie!==null&&(A[J]=null,T[J].disconnect(ie))}N=null,V=null,m.reset();for(const J in f)delete f[J];if(e.setRenderTarget(y),p=null,u=null,d=null,r=null,S=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),w!==null){const J=w.camera;J.fov=w.fov,J.zoom=w.zoom,J.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){c=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",$),r.addEventListener("inputsourceschange",se),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Fe=null,ve=null;M.depth&&(ve=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=M.stencil?Qn:Rn,Fe=M.stencil?Zi:mn);const K={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(K),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new rn(u.textureWidth,u.textureHeight,{format:Zt,type:Ht,depthTexture:new Ji(u.textureWidth,u.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Se={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Se),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new rn(p.framebufferWidth,p.framebufferHeight,{format:Zt,type:Ht,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await r.requestReferenceSpace(c),Ze.setContext(r),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(J){for(let ie=0;ie<J.removed.length;ie++){const Se=J.removed[ie],Fe=A.indexOf(Se);Fe>=0&&(A[Fe]=null,T[Fe].disconnect(Se))}for(let ie=0;ie<J.added.length;ie++){const Se=J.added[ie];let Fe=A.indexOf(Se);if(Fe===-1){for(let K=0;K<T.length;K++)if(K>=A.length){A.push(Se),Fe=K;break}else if(A[K]===null){A[K]=Se,Fe=K;break}if(Fe===-1)break}const ve=T[Fe];ve&&ve.connect(Se)}}const k=new H,Z=new H;function ee(J,ie,Se){k.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(Se.matrixWorld);const Fe=k.distanceTo(Z),ve=ie.projectionMatrix.elements,K=Se.projectionMatrix.elements,xe=ve[14]/(ve[10]-1),ge=ve[14]/(ve[10]+1),Pe=(ve[9]+1)/ve[5],we=(ve[9]-1)/ve[5],Me=(ve[8]-1)/ve[0],We=(K[8]+1)/K[0],$e=xe*Me,ft=xe*We,Je=Fe/(-Me+We),nt=Je*-Me;if(ie.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(nt),J.translateZ(Je),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ve[10]===-1)J.projectionMatrix.copy(ie.projectionMatrix),J.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const L=xe+Je,_t=ge+Je,Qe=$e-nt,B=ft+(Fe-nt),x=Pe*ge/_t*L,F=we*ge/_t*L;J.projectionMatrix.makePerspective(Qe,B,x,F,L,_t),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ye(J,ie){ie===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ie.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let ie=J.near,Se=J.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(Se=m.depthFar)),X.near=U.near=P.near=ie,X.far=U.far=P.far=Se,(N!==X.near||V!==X.far)&&(r.updateRenderState({depthNear:X.near,depthFar:X.far}),N=X.near,V=X.far),X.layers.mask=J.layers.mask|6,P.layers.mask=X.layers.mask&-5,U.layers.mask=X.layers.mask&-3;const Fe=J.parent,ve=X.cameras;ye(X,Fe);for(let K=0;K<ve.length;K++)ye(ve[K],Fe);ve.length===2?ee(X,P,U):X.projectionMatrix.copy(P.projectionMatrix),w===null&&J.isPerspectiveCamera&&(w={camera:J,fov:J.fov,zoom:J.zoom}),Be(J,X,Fe)};function Be(J,ie,Se){Se===null?J.matrix.copy(ie.matrixWorld):(J.matrix.copy(Se.matrixWorld),J.matrix.invert(),J.matrix.multiply(ie.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ie.projectionMatrix),J.projectionMatrixInverse.copy(ie.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Aa*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&p===null))return o},this.setFoveation=function(J){o=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(X)},this.getCameraTexture=function(J){return f[J]};let at=null;function Ve(J,ie){if(h=ie.getViewerPose(l||a),g=ie,h!==null){const Se=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Fe=!1;Se.length!==X.cameras.length&&(X.cameras.length=0,Fe=!0);for(let ge=0;ge<Se.length;ge++){const Pe=Se[ge];let we=null;if(p!==null)we=p.getViewport(Pe);else{const We=d.getViewSubImage(u,Pe);we=We.viewport,ge===0&&(e.setRenderTargetTextures(S,We.colorTexture,We.depthStencilTexture),e.setRenderTarget(S))}let Me=z[ge];Me===void 0&&(Me=new qt,Me.layers.enable(ge),Me.viewport=new mt,z[ge]=Me),Me.matrix.fromArray(Pe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Pe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(we.x,we.y,we.width,we.height),ge===0&&(X.matrix.copy(Me.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Fe===!0&&X.cameras.push(Me)}const ve=r.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const ge=d.getDepthInformation(Se[0]);ge&&ge.isValid&&ge.texture&&m.init(ge,r.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let ge=0;ge<Se.length;ge++){const Pe=Se[ge].camera;if(Pe){let we=f[Pe];we||(we=new zl,f[Pe]=we);const Me=d.getCameraImage(Pe);we.sourceTexture=Me}}}}for(let Se=0;Se<T.length;Se++){const Fe=A[Se],ve=T[Se];Fe!==null&&ve!==void 0&&ve.update(Fe,ie,l||a)}at&&at(J,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Ze=new Vl;Ze.setAnimationLoop(Ve),this.setAnimationLoop=function(J){at=J},this.dispose=function(){}}}const H0=new vt,Jl=new ze;Jl.set(-1,0,0,0,1,0,0,0,1);function G0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,kl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,M,y,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&c(m,f)):f.isPointsMaterial?o(m,f,M,y):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ut&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ut&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(H0.makeRotationFromEuler(S)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jl),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function c(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function o(m,f,M,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=y*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ut&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function W0(i,e,t,n){let r={},s={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(S,T){const A=T.program;n.uniformBlockBinding(S,A)}function l(S,T){let A=r[S.id];A===void 0&&(m(S),A=h(S),r[S.id]=A,S.addEventListener("dispose",M));const R=T.program;n.updateUBOMapping(S,R);const v=e.render.frame;s[S.id]!==v&&(u(S),s[S.id]=v)}function h(S){const T=d();S.__bindingPointIndex=T;const A=i.createBuffer(),R=S.__size,v=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,A),A}function d(){for(let S=0;S<c;S++)if(a.indexOf(S)===-1)return a.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const T=r[S.id],A=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let v=0,w=A.length;v<w;v++){const P=A[v];if(Array.isArray(P))for(let U=0,z=P.length;U<z;U++)p(P[U],v,U,R);else p(P,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,T,A,R){if(_(S,T,A,R)===!0){const v=S.__offset,w=S.value;if(Array.isArray(w)){let P=0;for(let U=0;U<w.length;U++){const z=w[U],X=f(z);g(z,S.__data,P),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(P+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,S.__data)}}function g(S,T,A){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,A)}function _(S,T,A,R){const v=S.value,w=T+"_"+A;if(R[w]===void 0)return typeof v=="number"||typeof v=="boolean"?R[w]=v:ArrayBuffer.isView(v)?R[w]=v.slice():R[w]=v.clone(),!0;{const P=R[w];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(S){const T=S.uniforms;let A=0;const R=16;for(let w=0,P=T.length;w<P;w++){const U=Array.isArray(T[w])?T[w]:[T[w]];for(let z=0,X=U.length;z<X;z++){const N=U[z],V=Array.isArray(N.value)?N.value:[N.value];for(let j=0,$=V.length;j<$;j++){const se=V[j],k=f(se),Z=A%R,ee=Z%k.boundary,ye=Z+ee;A+=ee,ye!==0&&R-ye<k.storage&&(A+=R-ye),N.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=k.storage}}}const v=A%R;return v>0&&(A+=R-v),S.__size=A,S.__cache={},this}function f(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),T}function M(S){const T=S.target;T.removeEventListener("dispose",M);const A=a.indexOf(T.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function y(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:o,update:l,dispose:y}}const V0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function X0(){return ln===null&&(ln=new Wr(V0,16,16,ni,gn),ln.name="DFG_LUT",ln.minFilter=Ct,ln.magFilter=Ct,ln.wrapS=yn,ln.wrapT=yn,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Y0{constructor(e={}){const{canvas:t=ch(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Ht}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=p,m=new Set([ka,za,Oa]),f=new Set([Ht,mn,Ki,Zi,Ua,Fa]),M=new Uint32Array(4),y=new Int32Array(4),S=new H;let T=null,A=null;const R=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let U=!1,z=null,X=null,N=null,V=null;this._outputColorSpace=Yt;let j=0,$=0,se=null,k=-1,Z=null;const ee=new mt,ye=new mt;let Be=null;const at=new it(0);let Ve=0,Ze=t.width,J=t.height,ie=1,Se=null,Fe=null;const ve=new mt(0,0,Ze,J),K=new mt(0,0,Ze,J);let xe=!1;const ge=new Fl;let Pe=!1,we=!1;const Me=new vt,We=new H,$e=new mt,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function nt(){return se===null?ie:1}let L=n;function _t(b,D){return t.getContext(b,D)}let Qe,B,x,F,O,q,ae,oe,Q,ne,le,Le,de,ce,De,Ne,ke,I,ue,te,he,_e,re;try{const b={alpha:!0,depth:r,stencil:s,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ia}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),L===null){const D="webgl2";if(L=_t(D,b),L===null)throw _t(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(b){throw t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),et("WebGLRenderer: "+b.message),b}function Ie(){Qe=new Xp(L),Qe.init(),he=new U0(L,Qe),B=new Np(L,Qe,e,he),x=new I0(L,Qe),B.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),X=L.createFramebuffer(),N=L.createFramebuffer(),V=L.createFramebuffer(),F=new Kp(L),O=new M0,q=new N0(L,Qe,x,O,B,he,F),ae=new Vp(P),oe=new Zh(L),_e=new Dp(L,oe),Q=new Yp(L,oe,F,_e),ne=new $p(L,Q,oe,_e,F),I=new Zp(L,B,q),De=new Up(O),le=new v0(P,ae,Qe,B,_e,De),Le=new G0(P,O),de=new E0,ce=new B0(Qe),ke=new Lp(P,ae,x,ne,g,o),Ne=new D0(P,ne,B),re=new W0(L,F,B,x),ue=new Ip(L,Qe,F),te=new qp(L,Qe,F),F.programs=le.programs,P.capabilities=B,P.extensions=Qe,P.properties=O,P.renderLists=de,P.shadowMap=Ne,P.state=x,P.info=F}_!==Ht&&(w=new Qp(_,t.width,t.height,c,r,s));const Re=new k0(P,L);this.xr=Re,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Qe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Qe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(b){b!==void 0&&(ie=b,this.setSize(Ze,J,!1))},this.getSize=function(b){return b.set(Ze,J)},this.setSize=function(b,D,Y=!0){if(Re.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=b,J=D,t.width=Math.floor(b*ie),t.height=Math.floor(D*ie),Y===!0&&(t.style.width=b+"px",t.style.height=D+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(Ze*ie,J*ie).floor()},this.setDrawingBufferSize=function(b,D,Y){Ze=b,J=D,ie=Y,t.width=Math.floor(b*Y),t.height=Math.floor(D*Y),this.setViewport(0,0,b,D)},this.setEffects=function(b){if(_===Ht){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let D=0;D<b.length;D++)if(b[D].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ee)},this.getViewport=function(b){return b.copy(ve)},this.setViewport=function(b,D,Y,G){b.isVector4?ve.set(b.x,b.y,b.z,b.w):ve.set(b,D,Y,G),x.viewport(ee.copy(ve).multiplyScalar(ie).round())},this.getScissor=function(b){return b.copy(K)},this.setScissor=function(b,D,Y,G){b.isVector4?K.set(b.x,b.y,b.z,b.w):K.set(b,D,Y,G),x.scissor(ye.copy(K).multiplyScalar(ie).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(b){x.setScissorTest(xe=b)},this.setOpaqueSort=function(b){Se=b},this.setTransparentSort=function(b){Fe=b},this.getClearColor=function(b){return b.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(b=!0,D=!0,Y=!0){let G=0;if(b){let W=!1;if(se!==null){const me=se.texture.format;W=m.has(me)}if(W){const me=se.texture.type,be=f.has(me),pe=ke.getClearColor(),Te=ke.getClearAlpha(),Ce=pe.r,He=pe.g,Xe=pe.b;be?(M[0]=Ce,M[1]=He,M[2]=Xe,M[3]=Te,L.clearBufferuiv(L.COLOR,0,M)):(y[0]=Ce,y[1]=He,y[2]=Xe,y[3]=Te,L.clearBufferiv(L.COLOR,0,y))}else G|=L.COLOR_BUFFER_BIT}D&&(G|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),z=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),ke.dispose(),de.dispose(),ce.dispose(),O.dispose(),ae.dispose(),ne.dispose(),_e.dispose(),re.dispose(),le.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Ka),Re.removeEventListener("sessionend",Za),Vn.stop()};function ht(b){b.preventDefault(),ho("WebGLRenderer: Context Lost."),U=!0}function rt(){ho("WebGLRenderer: Context Restored."),U=!1;const b=F.autoReset,D=Ne.enabled,Y=Ne.autoUpdate,G=Ne.needsUpdate,W=Ne.type;Ie(),F.autoReset=b,Ne.enabled=D,Ne.autoUpdate=Y,Ne.needsUpdate=G,Ne.type=W}function Jt(b){et("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function sn(b){const D=b.target;D.removeEventListener("dispose",sn),hc(D)}function hc(b){dc(b),O.remove(b)}function dc(b){const D=O.get(b).programs;D!==void 0&&(D.forEach(function(Y){le.releaseProgram(Y)}),b.isShaderMaterial&&le.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,Y,G,W,me){D===null&&(D=ft);const be=W.isMesh&&W.matrixWorld.determinantAffine()<0,pe=mc(b,D,Y,G,W);x.setMaterial(G,be);let Te=Y.index,Ce=1;if(G.wireframe===!0){if(Te=Q.getWireframeAttribute(Y),Te===void 0)return;Ce=2}const He=Y.drawRange,Xe=Y.attributes.position;let Ae=He.start*Ce,st=(He.start+He.count)*Ce;me!==null&&(Ae=Math.max(Ae,me.start*Ce),st=Math.min(st,(me.start+me.count)*Ce)),Te!==null?(Ae=Math.max(Ae,0),st=Math.min(st,Te.count)):Xe!=null&&(Ae=Math.max(Ae,0),st=Math.min(st,Xe.count));const Mt=st-Ae;if(Mt<0||Mt===1/0)return;_e.setup(W,G,pe,Y,Te);let pt,ct=ue;if(Te!==null&&(pt=oe.get(Te),ct=te,ct.setIndex(pt)),W.isMesh)G.wireframe===!0?(x.setLineWidth(G.wireframeLinewidth*nt()),ct.setMode(L.LINES)):ct.setMode(L.TRIANGLES);else if(W.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),x.setLineWidth(wt*nt()),W.isLineSegments?ct.setMode(L.LINES):W.isLineLoop?ct.setMode(L.LINE_LOOP):ct.setMode(L.LINE_STRIP)}else W.isPoints?ct.setMode(L.POINTS):W.isSprite&&ct.setMode(L.TRIANGLES);if(W.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))ct.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const wt=W._multiDrawStarts,Ee=W._multiDrawCounts,Pt=W._multiDrawCount,je=Te?oe.get(Te).bytesPerElement:1,Vt=O.get(G).currentProgram.getUniforms();for(let an=0;an<Pt;an++)Vt.setValue(L,"_gl_DrawID",an),ct.render(wt[an]/je,Ee[an])}else if(W.isInstancedMesh)ct.renderInstances(Ae,Mt,W.count);else if(Y.isInstancedBufferGeometry){const wt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ee=Math.min(Y.instanceCount,wt);ct.renderInstances(Ae,Mt,Ee)}else ct.render(Ae,Mt)};function qa(b,D,Y,G){z!==null&&b.isNodeMaterial&&z.setObject(G,b),Pe===!0&&De.setState(b,Y,!1),b.transparent===!0&&b.side===bn&&b.forceSinglePass===!1?(b.side=Ut,b.needsUpdate=!0,sr(b,D,G),b.side=ei,b.needsUpdate=!0,sr(b,D,G),b.side=bn):sr(b,D,G)}this.compile=function(b,D,Y=null){Y===null&&(Y=b),z!==null&&z.renderStart(b,D,Y),A=ce.get(Y),A.init(D),v.push(A),Y.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),b!==Y&&b.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),A.setupLights(),z!==null&&z.updateLights(A.state.lightsArray),we=this.localClippingEnabled,Pe=De.init(this.clippingPlanes,we),Pe===!0&&De.setGlobalState(this.clippingPlanes,D),z!==null&&Ne.render(A.state.shadowsArray,Y,D);const G=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const me=W.material;if(me)if(Array.isArray(me))for(let be=0;be<me.length;be++){const pe=me[be];qa(pe,Y,D,W),G.add(pe)}else qa(me,Y,D,W),G.add(me)}),A=v.pop(),z!==null&&z.renderEnd(),G},this.compileAsync=function(b,D,Y=null){const G=this.compile(b,D,Y);return new Promise(W=>{function me(){if(G.forEach(function(be){const Te=O.get(be).currentProgram;(Te===void 0||Te.isReady())&&G.delete(be)}),G.size===0){W(b);return}setTimeout(me,10)}Qe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ss=null;function fc(b){ss&&ss(b)}function Ka(){Vn.stop()}function Za(){Vn.start()}const Vn=new Vl;Vn.setAnimationLoop(fc),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(b){ss=b,Re.setAnimationLoop(b),b===null?Vn.stop():Vn.start()},Re.addEventListener("sessionstart",Ka),Re.addEventListener("sessionend",Za),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;z!==null&&z.renderStart(b,D);const Y=Re.enabled===!0&&Re.isPresenting===!0,G=w!==null&&(se===null||Y)&&w.begin(P,se);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(D),D=Re.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,D,se),A=ce.get(b,v.length),A.init(D),A.state.textureUnits=q.getTextureUnits(),v.push(A),Me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ge.setFromProjectionMatrix(Me,dn,D.reversedDepth),we=this.localClippingEnabled,Pe=De.init(this.clippingPlanes,we),T=de.get(b,R.length),T.init(),R.push(T),Re.enabled===!0&&Re.isPresenting===!0){const be=P.xr.getDepthSensingMesh();be!==null&&as(be,D,-1/0,P.sortObjects)}as(b,D,0,P.sortObjects),T.finish(),z!==null&&z.updateLights(A.state.lightsArray),P.sortObjects===!0&&T.sort(Se,Fe),Je=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,Je&&ke.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&De.beginShadows();const W=A.state.shadowsArray;if(Ne.render(W,b,D),Pe===!0&&De.endShadows(),(G&&w.hasRenderPass())===!1){const be=T.opaque,pe=T.transmissive;if(A.setupLights(),D.isArrayCamera){const Te=D.cameras;if(pe.length>0)for(let Ce=0,He=Te.length;Ce<He;Ce++){const Xe=Te[Ce];Ja(be,pe,b,Xe)}Je&&ke.render(b);for(let Ce=0,He=Te.length;Ce<He;Ce++){const Xe=Te[Ce];$a(T,b,Xe,Xe.viewport)}}else pe.length>0&&Ja(be,pe,b,D),Je&&ke.render(b),$a(T,b,D)}se!==null&&$===0&&(q.updateMultisampleRenderTarget(se),q.updateRenderTargetMipmap(se)),G&&w.end(P),b.isScene===!0&&b.onAfterRender(P,b,D),_e.resetDefaultState(),k=-1,Z=null,v.pop(),v.length>0?(A=v[v.length-1],q.setTextureUnits(A.state.textureUnits),Pe===!0&&De.setGlobalState(P.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,z!==null&&z.renderEnd()};function as(b,D,Y,G){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLightProbeGrid)A.pushLightProbeGrid(b);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(ge)){G&&$e.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Me);const be=ne.update(b),pe=b.material;pe.visible&&T.push(b,be,pe,Y,$e.z,null,D)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(ge))){const be=ne.update(b),pe=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),$e.copy(b.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),$e.copy(be.boundingSphere.center)),$e.applyMatrix4(b.matrixWorld).applyMatrix4(Me)),Array.isArray(pe)){const Te=be.groups;for(let Ce=0,He=Te.length;Ce<He;Ce++){const Xe=Te[Ce],Ae=pe[Xe.materialIndex];Ae&&Ae.visible&&T.push(b,be,Ae,Y,$e.z,Xe,D)}}else pe.visible&&T.push(b,be,pe,Y,$e.z,null,D)}}const me=b.children;for(let be=0,pe=me.length;be<pe;be++)as(me[be],D,Y,G)}function $a(b,D,Y,G){const{opaque:W,transmissive:me,transparent:be}=b;A.setupLightsView(Y),Pe===!0&&De.setGlobalState(P.clippingPlanes,Y),G&&x.viewport(ee.copy(G)),W.length>0&&rr(W,D,Y),me.length>0&&rr(me,D,Y),be.length>0&&rr(be,D,Y),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ja(b,D,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[G.id]===void 0){const Ae=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[G.id]=new rn(1,1,{generateMipmaps:!0,type:Ae?gn:Ht,minFilter:Jn,samples:Math.max(4,B.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const me=A.state.transmissionRenderTarget[G.id],be=G.viewport||ee;me.setSize(be.z*P.transmissionResolutionScale,be.w*P.transmissionResolutionScale);const pe=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(me),P.getClearColor(at),Ve=P.getClearAlpha(),Ve<1&&P.setClearColor(16777215,.5),P.clear(),Je&&ke.render(Y);const He=P.toneMapping;P.toneMapping=fn;const Xe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),A.setupLightsView(G),Pe===!0&&De.setGlobalState(P.clippingPlanes,G),rr(b,Y,G),q.updateMultisampleRenderTarget(me),q.updateRenderTargetMipmap(me),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let st=0,Mt=D.length;st<Mt;st++){const pt=D[st],{object:ct,geometry:wt,material:Ee,group:Pt}=pt;if(Ee.side===bn&&ct.layers.test(G.layers)){const je=Ee.side;Ee.side=Ut,Ee.needsUpdate=!0,Qa(ct,Y,G,wt,Ee,Pt),Ee.side=je,Ee.needsUpdate=!0,Ae=!0}}Ae===!0&&(q.updateMultisampleRenderTarget(me),q.updateRenderTargetMipmap(me))}P.setRenderTarget(pe,Te,Ce),P.setClearColor(at,Ve),Xe!==void 0&&(G.viewport=Xe),P.toneMapping=He}function rr(b,D,Y){const G=D.isScene===!0?D.overrideMaterial:null;for(let W=0,me=b.length;W<me;W++){const be=b[W],{object:pe,geometry:Te,group:Ce}=be;let He=be.material;He.allowOverride===!0&&G!==null&&(He=G),pe.layers.test(Y.layers)&&Qa(pe,D,Y,Te,He,Ce)}}function Qa(b,D,Y,G,W,me){z!==null&&W.isNodeMaterial&&z.setObject(b,W),b.onBeforeRender(P,D,Y,G,W,me),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(P,D,Y,G,b,me),W.transparent===!0&&W.side===bn&&W.forceSinglePass===!1?(W.side=Ut,W.needsUpdate=!0,P.renderBufferDirect(Y,D,G,W,b,me),W.side=ei,W.needsUpdate=!0,P.renderBufferDirect(Y,D,G,W,b,me),W.side=bn):P.renderBufferDirect(Y,D,G,W,b,me),b.onAfterRender(P,D,Y,G,W,me)}function sr(b,D,Y){D.isScene!==!0&&(D=ft);const G=O.get(b),W=A.state.lights,me=A.state.shadowsArray,be=W.state.version,pe=le.getParameters(b,W.state,me,D,Y,A.state.lightProbeGridArray),Te=le.getProgramCacheKey(pe);let Ce=G.programs;G.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?D.environment:null,G.fog=D.fog;const He=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;G.envMap=ae.get(b.envMap||G.environment,He),G.envMapRotation=G.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",sn),Ce=new Map,G.programs=Ce);let Xe=Ce.get(Te);if(Xe!==void 0){if(G.currentProgram===Xe&&G.lightsStateVersion===be)return eo(b,pe),Xe}else pe.uniforms=le.getUniforms(b),z!==null&&b.isNodeMaterial&&z.build(b,Y,pe),b.onBeforeCompile(pe,P),Xe=le.acquireProgram(pe,Te),Ce.set(Te,Xe),G.uniforms=pe.uniforms;const Ae=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=De.uniform),eo(b,pe),G.needsLights=_c(b),G.lightsStateVersion=be,G.needsLights&&(Ae.ambientLightColor.value=W.state.ambient,Ae.lightProbe.value=W.state.probe,Ae.sunLights.value=W.state.sun,Ae.sunLightShadows.value=W.state.sunShadow,Ae.directionalLights.value=W.state.directional,Ae.directionalLightShadows.value=W.state.directionalShadow,Ae.spotLights.value=W.state.spot,Ae.spotLightShadows.value=W.state.spotShadow,Ae.rectAreaLights.value=W.state.rectArea,Ae.ltc_1.value=W.state.rectAreaLTC1,Ae.ltc_2.value=W.state.rectAreaLTC2,Ae.pointLights.value=W.state.point,Ae.pointLightShadows.value=W.state.pointShadow,Ae.hemisphereLights.value=W.state.hemi,Ae.sunShadowMatrix.value=W.state.sunShadowMatrix,Ae.sunShadowCascade.value=W.state.sunShadowCascade,Ae.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ae.spotLightMatrix.value=W.state.spotLightMatrix,Ae.spotLightMap.value=W.state.spotLightMap,Ae.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=A.state.lightProbeGridArray.length>0,G.currentProgram=Xe,G.uniformsList=null,Xe}function ja(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=Ur.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function eo(b,D){const Y=O.get(b);Y.outputColorSpace=D.outputColorSpace,Y.batching=D.batching,Y.batchingColor=D.batchingColor,Y.instancing=D.instancing,Y.instancingColor=D.instancingColor,Y.instancingMorph=D.instancingMorph,Y.skinning=D.skinning,Y.morphTargets=D.morphTargets,Y.morphNormals=D.morphNormals,Y.morphColors=D.morphColors,Y.morphTargetsCount=D.morphTargetsCount,Y.numClippingPlanes=D.numClippingPlanes,Y.numIntersection=D.numClipIntersection,Y.vertexAlphas=D.vertexAlphas,Y.vertexTangents=D.vertexTangents,Y.toneMapping=D.toneMapping}function pc(b,D){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let Y=0,G=b.length;Y<G;Y++){const W=b[Y];if(W.texture!==null&&W.boundingBox.containsPoint(S))return W}return null}function mc(b,D,Y,G,W){D.isScene!==!0&&(D=ft),q.resetTextureUnits();const me=D.fog,be=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?D.environment:null,pe=se===null?P.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ye.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ce=ae.get(G.envMap||be,Te),He=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xe=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ae=!!Y.morphAttributes.position,st=!!Y.morphAttributes.normal,Mt=!!Y.morphAttributes.color;let pt=fn;G.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(pt=P.toneMapping);const ct=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,wt=ct!==void 0?ct.length:0,Ee=O.get(G),Pt=A.state.lights;if(Pe===!0&&(we===!0||b!==Z)){const dt=b===Z&&G.id===k;De.setState(G,b,dt)}let je=!1;G.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Pt.state.version||Ee.outputColorSpace!==pe||W.isBatchedMesh&&Ee.batching===!1||!W.isBatchedMesh&&Ee.batching===!0||W.isBatchedMesh&&Ee.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ee.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ee.instancing===!1||!W.isInstancedMesh&&Ee.instancing===!0||W.isSkinnedMesh&&Ee.skinning===!1||!W.isSkinnedMesh&&Ee.skinning===!0||W.isInstancedMesh&&Ee.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ee.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ee.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ee.instancingMorph===!1&&W.morphTexture!==null||Ee.envMap!==Ce||G.fog===!0&&Ee.fog!==me||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==De.numPlanes||Ee.numIntersection!==De.numIntersection)||Ee.vertexAlphas!==He||Ee.vertexTangents!==Xe||Ee.morphTargets!==Ae||Ee.morphNormals!==st||Ee.morphColors!==Mt||Ee.toneMapping!==pt||Ee.morphTargetsCount!==wt||!!Ee.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,Ee.__version=G.version);let Vt=Ee.currentProgram;je===!0&&(Vt=sr(G,D,W),z&&G.isNodeMaterial&&z.onUpdateProgram(G,Vt,Ee));let an=!1,Cn=!1,oi=!1;const lt=Vt.getUniforms(),xt=Ee.uniforms;if(x.useProgram(Vt.program)&&(an=!0,Cn=!0,oi=!0),G.id!==k&&(k=G.id,Cn=!0),Ee.needsLights){const dt=pc(A.state.lightProbeGridArray,W);Ee.lightProbeGrid!==dt&&(Ee.lightProbeGrid=dt,Cn=!0)}if(an||Z!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),lt.setValue(L,"projectionMatrix",b.projectionMatrix),lt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Ln=lt.map.cameraPosition;Ln!==void 0&&Ln.setValue(L,We.setFromMatrixPosition(b.matrixWorld)),B.logarithmicDepthBuffer&&lt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&lt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),Z!==b&&(Z=b,Cn=!0,oi=!0)}if(Ee.needsLights&&(Pt.state.sunShadowMap.length>0&&lt.setValue(L,"sunShadowMap",Pt.state.sunShadowMap,q),Pt.state.directionalShadowMap.length>0&&lt.setValue(L,"directionalShadowMap",Pt.state.directionalShadowMap,q),Pt.state.spotShadowMap.length>0&&lt.setValue(L,"spotShadowMap",Pt.state.spotShadowMap,q),Pt.state.pointShadowMap.length>0&&lt.setValue(L,"pointShadowMap",Pt.state.pointShadowMap,q)),W.isSkinnedMesh){lt.setOptional(L,W,"bindMatrix"),lt.setOptional(L,W,"bindMatrixInverse");const dt=W.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),lt.setValue(L,"boneTexture",dt.boneTexture,q))}W.isBatchedMesh&&(lt.setOptional(L,W,"batchingTexture"),lt.setValue(L,"batchingTexture",W._matricesTexture,q),lt.setOptional(L,W,"batchingIdTexture"),lt.setValue(L,"batchingIdTexture",W._indirectTexture,q),lt.setOptional(L,W,"batchingColorTexture"),W._colorsTexture!==null&&lt.setValue(L,"batchingColorTexture",W._colorsTexture,q));const Pn=Y.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&I.update(W,Y,Vt),(Cn||Ee.receiveShadow!==W.receiveShadow)&&(Ee.receiveShadow=W.receiveShadow,lt.setValue(L,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&D.environment!==null&&(xt.envMapIntensity.value=D.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=X0()),Cn){if(lt.setValue(L,"toneMappingExposure",P.toneMappingExposure),Ee.needsLights&&gc(xt,oi),me&&G.fog===!0&&Le.refreshFogUniforms(xt,me),Le.refreshMaterialUniforms(xt,G,ie,J,A.state.transmissionRenderTarget[b.id]),Ee.needsLights&&Ee.lightProbeGrid){const dt=Ee.lightProbeGrid;xt.probesSH.value=dt.texture,xt.probesMin.value.copy(dt.boundingBox.min),xt.probesMax.value.copy(dt.boundingBox.max),xt.probesResolution.value.copy(dt.resolution)}Ur.upload(L,ja(Ee),xt,q)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ur.upload(L,ja(Ee),xt,q),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&lt.setValue(L,"center",W.center),lt.setValue(L,"modelViewMatrix",W.modelViewMatrix),lt.setValue(L,"normalMatrix",W.normalMatrix),lt.setValue(L,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const dt=G.uniformsGroups;for(let Ln=0,li=dt.length;Ln<li;Ln++){const no=dt[Ln];re.update(no,Vt),re.bind(no,Vt)}}return Vt}function gc(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.sunLights.needsUpdate=D,b.sunLightShadows.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function _c(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(b,D,Y){const G=O.get(b);G.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),O.get(b.texture).__webglTexture=D,O.get(b.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,D){const Y=O.get(b);Y.__webglFramebuffer=D,Y.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,Y=0){se=b,j=D,$=Y;let G=null,W=!1,me=!1;if(b){const pe=O.get(b);if(pe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(L.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(b.viewport),ye.copy(b.scissor),Be=b.scissorTest,x.viewport(ee),x.scissor(ye),x.setScissorTest(Be),k=-1;return}else if(pe.__webglFramebuffer===void 0)q.setupRenderTarget(b);else if(pe.__hasExternalTextures)q.rebindTextures(b,O.get(b.texture).__webglTexture,O.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const He=b.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&O.has(He)&&(b.width!==He.image.width||b.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(b)}}const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(me=!0);const Ce=O.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?G=Ce[D][Y]:G=Ce[D],W=!0):b.samples>0&&q.useMultisampledRTT(b)===!1?G=O.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?G=Ce[Y]:G=Ce,ee.copy(b.viewport),ye.copy(b.scissor),Be=b.scissorTest}else ee.copy(ve).multiplyScalar(ie).floor(),ye.copy(K).multiplyScalar(ie).floor(),Be=xe;if(Y!==0&&(G=X),x.bindFramebuffer(L.FRAMEBUFFER,G)&&x.drawBuffers(b,G),x.viewport(ee),x.scissor(ye),x.setScissorTest(Be),W){const pe=O.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,pe.__webglTexture,Y)}else if(me){const pe=D;for(let Te=0;Te<b.textures.length;Te++){const Ce=O.get(b.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,Y,pe)}}else if(b!==null&&Y!==0){const pe=O.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,pe.__webglTexture,Y)}k=-1};function to(b){const D=O.get(b);return(D.__readFormat!==b.format||D.__readType!==b.type)&&(D.__readFormat=b.format,D.__readType=b.type,D.__formatReadable=B.textureFormatReadable(b.format),D.__typeReadable=B.textureTypeReadable(b.type)),D}this.readRenderTargetPixels=function(b,D,Y,G,W,me,be,pe=0){if(!(b&&b.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=O.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){x.bindFramebuffer(L.FRAMEBUFFER,Te);try{const Ce=b.textures[pe],He=Ce.format,Xe=Ce.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+pe);const Ae=to(Ce);if(Ae.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-G&&Y>=0&&Y<=b.height-W&&L.readPixels(D,Y,G,W,he.convert(He),he.convert(Xe),me)}finally{const Ce=se!==null?O.get(se).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(b,D,Y,G,W,me,be,pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=O.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te)if(D>=0&&D<=b.width-G&&Y>=0&&Y<=b.height-W){x.bindFramebuffer(L.FRAMEBUFFER,Te);const Ce=b.textures[pe],He=Ce.format,Xe=Ce.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+pe);const Ae=to(Ce);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,st),L.bufferData(L.PIXEL_PACK_BUFFER,me.byteLength,L.STREAM_READ),L.readPixels(D,Y,G,W,he.convert(He),he.convert(Xe),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);const Mt=se!==null?O.get(se).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Mt);const pt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await uh(L,pt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,st),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,me),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(st),L.deleteSync(pt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,D=null,Y=0){const G=Math.pow(2,-Y),W=Math.floor(b.image.width*G),me=Math.floor(b.image.height*G),be=D!==null?D.x:0,pe=D!==null?D.y:0;q.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,be,pe,W,me),x.unbindTexture()},this.copyTextureToTexture=function(b,D,Y=null,G=null,W=0,me=0){let be,pe,Te,Ce,He,Xe,Ae,st,Mt;const pt=b.isCompressedTexture?b.mipmaps[me]:b.image;if(Y!==null)be=Y.max.x-Y.min.x,pe=Y.max.y-Y.min.y,Te=Y.isBox3?Y.max.z-Y.min.z:1,Ce=Y.min.x,He=Y.min.y,Xe=Y.isBox3?Y.min.z:0;else{const xt=Math.pow(2,-W);be=Math.floor(pt.width*xt),pe=Math.floor(pt.height*xt),b.isDataArrayTexture?Te=pt.depth:b.isData3DTexture?Te=Math.floor(pt.depth*xt):Te=1,Ce=0,He=0,Xe=0}G!==null?(Ae=G.x,st=G.y,Mt=G.z):(Ae=0,st=0,Mt=0);const ct=he.convert(D.format),wt=he.convert(D.type);let Ee;D.isData3DTexture?(q.setTexture3D(D,0),Ee=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(q.setTexture2DArray(D,0),Ee=L.TEXTURE_2D_ARRAY):(q.setTexture2D(D,0),Ee=L.TEXTURE_2D),x.activeTexture(L.TEXTURE0),x.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),x.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),x.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Pt=x.getParameter(L.UNPACK_ROW_LENGTH),je=x.getParameter(L.UNPACK_IMAGE_HEIGHT),Vt=x.getParameter(L.UNPACK_SKIP_PIXELS),an=x.getParameter(L.UNPACK_SKIP_ROWS),Cn=x.getParameter(L.UNPACK_SKIP_IMAGES);x.pixelStorei(L.UNPACK_ROW_LENGTH,pt.width),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt.height),x.pixelStorei(L.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(L.UNPACK_SKIP_ROWS,He),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Xe);const oi=b.isDataArrayTexture||b.isData3DTexture,lt=D.isDataArrayTexture||D.isData3DTexture;if(b.isDepthTexture){const xt=O.get(b),Pn=O.get(D),dt=O.get(xt.__renderTarget),Ln=O.get(Pn.__renderTarget);x.bindFramebuffer(L.READ_FRAMEBUFFER,dt.__webglFramebuffer),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let li=0;li<Te;li++)oi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,O.get(b).__webglTexture,W,Xe+li),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,O.get(D).__webglTexture,me,Mt+li)),L.blitFramebuffer(Ce,He,be,pe,Ae,st,be,pe,L.DEPTH_BUFFER_BIT,L.NEAREST);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||O.has(b)){const xt=O.get(b),Pn=O.get(D);x.bindFramebuffer(L.READ_FRAMEBUFFER,N),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,V);for(let dt=0;dt<Te;dt++)oi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xt.__webglTexture,W,Xe+dt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xt.__webglTexture,W),lt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pn.__webglTexture,me,Mt+dt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pn.__webglTexture,me),W!==0?L.blitFramebuffer(Ce,He,be,pe,Ae,st,be,pe,L.COLOR_BUFFER_BIT,L.NEAREST):lt?L.copyTexSubImage3D(Ee,me,Ae,st,Mt+dt,Ce,He,be,pe):L.copyTexSubImage2D(Ee,me,Ae,st,Ce,He,be,pe);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else lt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ee,me,Ae,st,Mt,be,pe,Te,ct,wt,pt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(Ee,me,Ae,st,Mt,be,pe,Te,ct,pt.data):L.texSubImage3D(Ee,me,Ae,st,Mt,be,pe,Te,ct,wt,pt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,me,Ae,st,be,pe,ct,wt,pt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,me,Ae,st,pt.width,pt.height,ct,pt.data):L.texSubImage2D(L.TEXTURE_2D,me,Ae,st,be,pe,ct,wt,pt);x.pixelStorei(L.UNPACK_ROW_LENGTH,Pt),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,je),x.pixelStorei(L.UNPACK_SKIP_PIXELS,Vt),x.pixelStorei(L.UNPACK_SKIP_ROWS,an),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Cn),me===0&&D.generateMipmaps&&L.generateMipmap(Ee),x.unbindTexture()},this.initRenderTarget=function(b){O.get(b).__webglFramebuffer===void 0&&q.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?q.setTextureCube(b,0):b.isData3DTexture?q.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?q.setTexture2DArray(b,0):q.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){j=0,$=0,se=null,x.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}function q0(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function es(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Ue=(i,e,t)=>e+(t-e)*i(),K0=(i,e)=>e[Math.floor(i()*e.length)];function nn(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Vr(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,c=s*s*(3-2*s),o=a*a*(3-2*a),l=nn(n,r,t),h=nn(n+1,r,t),d=nn(n,r+1,t),u=nn(n+1,r+1,t);return l+(h-l)*c+(d-l)*o+(l-h-d+u)*c*o}function ut(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),c=t*(1-(1-r)*e),[o,l,h]=[[t,c,s],[a,t,s],[s,t,c],[s,a,t],[c,s,t],[t,s,a]][n%6];return[Math.round(o*255),Math.round(l*255),Math.round(h*255)]}const E={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27},Z0=new Set([E.GLINT,E.FLOWER,E.MAGIC,E.MAGIC2]);function jo(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=c=>e?i[(c+n)%n]:i[Math.max(0,Math.min(n-1,c))],a=e?n:n-1;for(let c=0;c<a;c++){const o=s(c-1),l=s(c),h=s(c+1),d=s(c+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-l[0],h[1]-l[1])/1.5),t);for(let p=0;p<u;p++){const g=p/u,_=g*g,m=_*g;r.push([0,1].map(f=>.5*(2*l[f]+(-o[f]+h[f])*g+(2*o[f]-5*l[f]+4*h[f]-d[f])*_+(-o[f]+3*l[f]-3*h[f]+d[f])*m)))}}return e||r.push(i[n-1]),r}function Ra(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let o=0;o<s;o++){const l=i[Math.max(0,o-1)],h=i[Math.min(s-1,o+1)];let d=h[0]-l[0],u=h[1]-l[1];const p=Math.hypot(d,u)||1;d/=p,u/=p;const g=i[o][2]/2;n.push([i[o][0]-u*g,i[o][1]+d*g]),r.push([i[o][0]+u*g,i[o][1]-d*g])}const a=(o,l,h,d)=>{let u=o[0]-l[0],p=o[1]-l[1];const g=Math.hypot(u,p)||1;return[o[0]+u/g*h/2*d,o[1]+p/g*h/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const el=([i,e],[t,n],r)=>{const s=Math.cos(r),a=Math.sin(r);return[t+(i-t)*s-(e-n)*a,n+(i-t)*a+(e-n)*s]},C=(i,e)=>[i[0]+e[0],i[1]+e[1]],Ke=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function gt(i,e,t,n,r,s=1){const a=[];for(let c=0;c<i.length;c++){if(a.push(i[c]),c<e||c>=t)continue;const o=i[c],l=i[(c+1)%i.length];let h=l[0]-o[0],d=l[1]-o[1];const u=Math.hypot(h,d)||1,p=d/u*s,g=-h/u*s;for(let _=1;_<=n;_++){const m=(_-.5)/n,f=Ke(o,l,m),M=[f[0]+p*r-h/u*r*.5,f[1]+g*r-d/u*r*.5];a.push(Ke(o,l,m-.45/n),M,Ke(o,l,m+.35/n))}}return a}function tl(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const c=a+.5,o=[];for(let l=0,h=t.length-1;l<t.length;h=l++){const[d,u]=t[l],[p,g]=t[h];u>c!=g>c&&o.push(d+(c-u)/(g-u)*(p-d))}o.sort((l,h)=>l-h);for(let l=0;l+1<o.length;l+=2)for(let h=Math.max(0,Math.ceil(o[l]-.5));h<=Math.min(i-1,Math.floor(o[l+1]-.5));h++)n[a*i+h]=1}return n}function $0(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let o=0;o<i*e;o++)t[o]&&(r[o]=1e4,s[o]=1e4);const a=o=>r[o]*r[o]+s[o]*s[o],c=(o,l,h,d,u)=>{const p=l+d,g=h+u;let _,m;if(p<0||g<0||p>=i||g>=e)_=d,m=u;else{const f=g*i+p;_=r[f]+d,m=s[f]+u}_*_+m*m<a(o)&&(r[o]=_,s[o]=m)};for(let o=0;o<e;o++){for(let l=0;l<i;l++){const h=o*i+l;t[h]&&(c(h,l,o,-1,0),c(h,l,o,0,-1),c(h,l,o,-1,-1),c(h,l,o,1,-1))}for(let l=i-1;l>=0;l--){const h=o*i+l;t[h]&&c(h,l,o,1,0)}}for(let o=e-1;o>=0;o--){for(let l=i-1;l>=0;l--){const h=o*i+l;t[h]&&(c(h,l,o,1,0),c(h,l,o,0,1),c(h,l,o,1,1),c(h,l,o,-1,1))}for(let l=0;l<i;l++){const h=o*i+l;t[h]&&c(h,l,o,-1,0)}}return{vx:r,vy:s}}class Ft{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const c=t*this.w+e;this.m[c]=n,this.n[c*3]=r,this.n[c*3+1]=s,this.n[c*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:c,density:o=1,noise:l=0,seed:h=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let p=Math.max(0,Math.floor(e-n-1));p<Math.min(this.w,e+n+1);p++){const g=(p+.5-e)/n,_=(u+.5-t)/r,m=g*g+_*_;if(m>1)continue;const f=u*this.w+p;if(c&&!c.has(this.m[f]))continue;if(o<1){const T=l?Vr(p/3.2,u/3.2,h)*l+(1-l)*.5:.5;if(nn(p,u,h+77)>o*(.4+T*1.2)*(1.15-m*.5))continue}const M=g*d,y=_*d,S=Math.hypot(M,y,Math.sqrt(Math.max(0,1-m))+.15);this.px(p,u,s,M/S,y/S,(Math.sqrt(Math.max(0,1-m))+.15)/S)}}line(e,t,n,r,s,a,c,o=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let h=0;h<=l;h++){const d=h/l,u=e+(n-e)*d,p=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let _=Math.floor(p-g);_<=p+g;_++)for(let m=Math.floor(u-g);m<=u+g;m++){const f=(m+.5-u)/g,M=(_+.5-p)/g;if(f*f+M*M>1)continue;const y=f*o,S=Math.hypot(y,M*.3,1);this.px(m,_,c,y/S,M*.3/S,1/S)}}}tri(e,t){let[[n,r],[s,a],[c,o]]=e;n*=this.sx,s*=this.sx,c*=this.sx;const l=(g,_,m,f,M,y)=>(g-M)*(f-y)-(m-M)*(_-y),h=Math.max(0,Math.floor(Math.min(n,s,c))),d=Math.min(this.w,Math.ceil(Math.max(n,s,c))),u=Math.max(0,Math.floor(Math.min(r,a,o))),p=Math.min(this.h,Math.ceil(Math.max(r,a,o)));for(let g=u;g<p;g++)for(let _=h;_<d;_++){const m=_+.5,f=g+.5,M=l(m,f,n,r,s,a),y=l(m,f,s,a,c,o),S=l(m,f,c,o,n,r);(M<0||y<0||S<0)&&(M>0||y>0||S>0)||this.px(_,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(tl(this.w,this.h,jo(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(Ra(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:c=null,keepNormals:o=!1,tilt:l=[0,0],lineMat:h=E.LINE}={}){const{w:d,h:u}=this;if(c)for(let m=0;m<d*u;m++)e[m]&&!c.has(this.m[m])&&(e[m]=0);const{vx:p,vy:g}=$0(d,u,e);let _=s;if(!_){for(let m=0;m<d*u;m++)e[m]&&(_=Math.max(_,Math.hypot(p[m],g[m])));_=Math.max(1.5,Math.min(_*.9,2.5+_*.35))}for(let m=0;m<u;m++)for(let f=0;f<d;f++){const M=m*d+f;if(!e[M])continue;if(o){this.m[M]=t;continue}const y=Math.hypot(p[M],g[M]),S=Math.min(1,Math.max(0,(y-.5)/_)),T=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*a;let A=p[M]/(y||1)*T+l[0],R=g[M]/(y||1)*T+l[1];const v=Math.hypot(A,R,1);this.m[M]=t,this.n[M*3]=A/v,this.n[M*3+1]=R/v,this.n[M*3+2]=1/v}if(r&&!o){const m=[];for(let f=0;f<u;f++)for(let M=0;M<d;M++){const y=f*d+M;if(e[y])for(const[S,T]of[[1,0],[-1,0],[0,1],[0,-1]]){const A=M+S,R=f+T;if(A<0||R<0||A>=d||R>=u)continue;const v=R*d+A;if(!e[v]&&this.m[v]&&this.g[v]!==n&&this.m[v]!==h){m.push(y);break}}}for(const f of m)this.m[f]=h}if(!o)for(let m=0;m<d*u;m++)e[m]&&(this.g[m]=n);return e}mark(e,t,n,r={}){return this.fillMask(tl(this.w,this.h,jo(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const c=Math.max(...e.map(h=>h.length)),o=new Uint8Array(this.w*this.h),l=new Map;e.forEach((h,d)=>[...h].forEach((u,p)=>{const g=t[u];if(!g)return;const _=n+(a?c-1-p:p),m=r+d;this.inb(_,m)&&(o[m*this.w+_]=1,l.set(m*this.w+_,g))})),this.fillMask(o,E.BODY,{round:s,depth:2.5});for(const[h,d]of l)this.m[h]=d}}function Xr(i,e,t,n=t.outline,r=q0){const{w:s,h:a}=i,c=()=>r(s,a),o=c(),l=c(),h=c(),d=o.getContext("2d").createImageData(s,a),u=l.getContext("2d").createImageData(s,a),p=h.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let _=0;_<a;_++)for(let m=0;m<s;m++){const f=_*s+m,M=i.m[f],y=f*4;if(!M){if(!g)continue;const v=[i.get(m+1,_),i.get(m-1,_),i.get(m,_+1),i.get(m,_-1)].find(P=>P);if(!v)continue;const w=g==="tint"?(e[v]||[0,0,0]).map(P=>P*.35|0):g;d.data.set([...w,255],y),u.data.set([128,128,255,255],y),p.data.set([128,128,255,255],y);continue}let S=e[M];M===E.LINE&&!S&&(S=g==="tint"||!g?(e[E.BODY2]||[0,0,0]).map(v=>v*.55|0):g),S=S||[255,0,255],d.data.set([...S,Z0.has(M)?254:255],y);const T=i.n[f*3],A=i.n[f*3+1],R=i.n[f*3+2];u.data.set([T*127+128,A*127+128,R*255,255],y),p.data.set([-T*127+128,A*127+128,R*255,255],y)}return o.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(p,0,0),{A:o,N:l,NF:h,w:s,h:a}}const J0=new Set([E.TRUNK,E.BARK2,E.BARKD,E.BARKL]);function ri(i,e,t,n,r,s,{mat:a=E.LEAF,group:c=30,ragged:o=1}={}){const h=[];for(let f=0;f<9;f++){const M=f/9*Math.PI*2,y=1+(s()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(M)*t*y,e[1]+Math.sin(M)*n*y*(Math.sin(M)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(gt(h,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*o,1),a,{group:c,line:!1,round:r.round}),i.mark([C(e,[-t*1.1,n*.15]),C(e,[t*1.1,n*.1]),C(e,[t*1.1,n*1.2]),C(e,[-t*1.1,n*1.2])],E.LEAF3,[a]),i.mark([C(e,[-t*.75,-n*.55]),C(e,[t*.25,-n*.95]),C(e,[t*.55,-n*.35]),C(e,[-t*.2,-n*.05])],E.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),_=Math.ceil(e[1]+n*1.2),m=s()*1e4|0;for(let f=g;f<=_;f++)for(let M=u;M<=p;M++){const y=i.get(M,f);if(y!==a&&y!==E.LEAF2&&y!==E.LEAF3)continue;const S=nn(M,f,m),T=Vr(M/2,f/2,m)*.5+S*.5;T<.16*r.density?i.recolour(M,f,y===E.LEAF2?a:E.LEAF2):T>1-.16*r.density&&i.recolour(M,f,y===E.LEAF3?a:E.LEAF3)}}function kn(i,e,t,n,r,s,a,c,{mat:o=E.TRUNK,bend:l=1,group:h=10,line:d=!1}={}){const u=[e],p=4;let g=t,_=e;for(let m=1;m<=p;m++)g+=(c()-.5)*.7*a.gnarl*l,_=C(_,[Math.cos(g)*n/p,Math.sin(g)*n/p]),u.push(_);return i.limb(u.map((m,f)=>[...m,r+(s-r)*f/p]),o,{group:h,line:d,round:a.round,cap:.6,capEnd:1}),{end:_,ang:g,pts:u}}function ts(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],E.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const c=Math.round(2+r.roots*4);for(let o=0;o<c;o++){const l=o%2?1:-1,h=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,u=[e+l*n*.2,t-n*.5],p=[e+l*(n*.55+h*.4),t-d],g=[e+l*(n*.5+h),t-.5];i.limb([[...u,n*.55],[...p,n*.28],[...g,1.2]],E.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function ns(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==E.TRUNK)continue;const a=t?Vr(r/1.3,n/6,21):Vr(r/6,n/1.3,21);a>1-e.bark*.42||nn(r,n,4)<e.bark*.05?i.m[s]=E.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=E.BARKL)}}function Di(i,e,t){let n=i.w,r=-1,s=i.h;for(let u=0;u<i.h;u++)for(let p=0;p<i.w;p++)i.m[u*i.w+p]&&(n=Math.min(n,p),r=Math.max(r,p),s=Math.min(s,u));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,c=Math.max(0,Math.floor(e-a)),o=Math.min(i.w-c,Math.ceil(a*2)+1),l=Math.max(0,s-1),h=i.h-l,d=new Ft(o,h);for(let u=0;u<h;u++)for(let p=0;p<o;p++){const g=(u+l)*i.w+p+c,_=u*o+p;d.m[_]=i.m[g],d.g[_]=i.g[g],d.n[_*3]=i.n[g*3],d.n[_*3+1]=i.n[g*3+1],d.n[_*3+2]=i.n[g*3+2]}return{sp:d,crownY:t-l}}const Ii=i=>(i.crownWidth||3)/3;function Ql(i,e,t){const n=Ii(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new Ft(r,s),c=r/2,o=s,l=12*t,h=(i()-.5)*.5*e.gnarl,d=kn(a,[c,o],-Math.PI/2+h,s*.36,l,l*.72,e,i,{bend:1.4}),u=[],p=(g,_,m,f,M)=>{const y=kn(a,g,_,m,f,f*.65,e,i,{group:12});if(M===0){u.push(y.end);return}const S=i()<.35?3:2;for(let T=0;T<S;T++){const A=(T-(S-1)/2)*Ue(i,.5,.85)*(M===3?1.4:1);p(y.end,y.ang+A+(i()-.5)*.25,m*Ue(i,.6,.78),f*.62,M-1)}M<=2&&u.push(Ke(g,y.end,.7))};for(const g of[-1,1])p(d.end,-Math.PI/2+g*Ue(i,.55,.95)*(.7+.3*n),s*.22*(.75+.25*n),l*.7,3);i()<.7&&p(d.end,-Math.PI/2+(i()-.5)*.3,s*.18,l*.55,2),ts(a,c+Math.cos(-Math.PI/2+h)*0,o,l,e,i,t),ns(a,e),u.sort((g,_)=>g[1]-_[1]);for(const g of u)ri(a,C(g,[0,-3*t]),Ue(i,14,21)*t,Ue(i,10,14)*t,e,i,{mat:i()<.35?E.LEAF3:E.LEAF});for(const g of u)i()<.75&&ri(a,C(g,[Ue(i,-9,9)*t,Ue(i,-12,-3)*t]),Ue(i,10,15)*t,Ue(i,7,10)*t,e,i);return Di(a,c,d.end[1]+4*t)}function jl(i,e,t){const n=.8+.2*Ii(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new Ft(r,s),c=r/2,o=s;a.limb([[c,o,6*t],[c,o-s*.5,4*t],[c,6*t,1.5]],E.TRUNK,{group:10,round:e.round}),ts(a,c,o,6*t,e,i,t*.6),ns(a,e);const l=Math.round(Ue(i,9,12));for(let h=l-1;h>=0;h--){const d=h/(l-1),u=6*t+d*s*.7,p=(5+d*36)*t*n*Ue(i,.9,1.1),g=(5+d*13)*t,_=[[c,u-4*t],[c+p*.5,u+g*.3],[c+p,u+g],[c+p*.7,u+g*1.15],[c,u+g*.7],[c-p*.7,u+g*1.15],[c-p,u+g],[c-p*.5,u+g*.3]];a.shape(gt(_,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),E.LEAF,{group:30+h,line:!1,round:e.round}),a.mark([[c-p,u+g*.55],[c+p,u+g*.55],[c+p,u+g*1.4],[c-p,u+g*1.4]],E.LEAF3,[E.LEAF]),a.mark([[c-p*.55,u-2*t],[c+p*.1,u-3*t],[c+p*.1,u+g*.45],[c-p*.7,u+g*.7]],E.LEAF2,[E.LEAF])}return Di(a,c,s*.82)}function Q0(i,e,t){const n=Ii(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new Ft(r,s),c=r/2,o=s,l=13*t,h=kn(a,[c,o],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),d=[];for(let g=0;g<5;g++){const _=g%2?1:-1,m=-Math.PI/2+_*Ue(i,.55,1.25)*(.7+.3*n),f=kn(a,h.end,m,s*Ue(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});d.push(f.end)}ts(a,c,o,l,e,i,t),ns(a,e);for(const g of d)ri(a,C(g,[0,-2*t]),Ue(i,20,28)*t,Ue(i,9,12)*t,e,i);ri(a,C(h.end,[0,-8*t]),24*t,11*t,e,i);let u=r,p=0;for(const g of d)u=Math.min(u,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=u;g<p;g+=Ue(i,1,1.7)){let _=s;for(let y=0;y<s;y++)if(a.get(g,y)===E.LEAF||a.get(g,y)===E.LEAF2||a.get(g,y)===E.LEAF3){_=y;break}if(_>=s)continue;const m=Math.abs(g-c)/(r/2),f=(o-_)*Ue(i,.5,.9)*(1-m*.3),M=nn(g|0,1,9)<.4?E.LEAF2:E.LEAF;for(let y=_+2;y<Math.min(o-2,_+f);y++){const S=Math.round(Math.sin(y*.12+g)*.7);nn(g|0,y,5)<.2+e.density*.8&&a.px(g+S,y,(y-_)/f>.8?E.LEAF3:M,S*.3,.2,.95)}}return Di(a,c,h.end[1]+6*t)}function j0(i,e,t){const n=.7+.3*Ii(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new Ft(r,s),c=r/2,o=s,l=(i()-.5)*.25,h=kn(a,[c,o],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:E.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const g=Ke(h.pts[u],h.pts[u+1],p+i()*.1);if(i()<.55)for(let _=-3;_<=3;_++)a.get(g[0]+_,g[1])===E.BARK2&&i()<.8&&a.recolour(g[0]+_,g[1],E.BARKD)}const d=[h.end];for(let u=0;u<7;u++){const p=Ue(i,.35,.9),g=Ke(h.pts[0],h.end,p),_=u%2?1:-1,m=kn(a,g,-Math.PI/2+_*Ue(i,.5,1),s*Ue(i,.12,.2)*n,2*t,1,e,i,{mat:E.BARKD,group:12});d.push(m.end)}for(const u of d)ri(a,u,Ue(i,9,13)*t*n,Ue(i,7,10)*t,e,i,{mat:E.LEAF2,ragged:1.3});return Di(a,c,s*.55)}function eg(i,e,t){const n=.8+.2*Ii(e),r=Math.round(150*t*n),s=Math.round(140*t),a=new Ft(r,s),c=r/2,o=s,l=Ue(i,-14,14)*t,h=[c+l,s*.3],d=[];for(let p=0;p<=6;p++){const g=p/6;d.push([c+l*g*g,o-(o-h[1])*g,(7-g*2)*t])}a.limb(d,E.TRUNK,{group:10,round:e.round});for(let p=Math.round(h[1]);p<o;p+=Math.max(2,Math.round(3*t)))for(let g=0;g<r;g++)a.get(g,p)===E.TRUNK&&a.recolour(g,p,E.BARKD);const u=Math.round(Ue(i,9,12));for(let p=0;p<u;p++){const g=-Math.PI/2+(p/(u-1)-.5)*Math.PI*1.35,_=Ue(i,36,50)*t*n;let m=h.slice(),f=g;const M=p%2===0;for(let y=0;y<_;y++){const S=y/_;f=g+Math.sign(Math.cos(g))*S*1.3*Math.abs(Math.cos(g))+(Math.abs(Math.cos(g))<.3?S*.8*Math.sign(p-u/2):0),m=[m[0]+Math.cos(f),m[1]+Math.sin(f)+S*.9],a.px(m[0],m[1],M?E.LEAF3:E.LEAF,Math.cos(f)*.3,-.3,.9);const T=(1-S*.8)*6*t;if(!(y%2))for(let A=1;A<T;A++){const R=-Math.sin(f),v=Math.cos(f);a.px(m[0]+R*A,m[1]+v*A*.8+A*.35,M?E.LEAF3:A>T*.6?E.LEAF2:E.LEAF,R*.5,.3,.8),a.px(m[0]-R*A,m[1]-v*A*.8+A*.35,M?E.LEAF3:E.LEAF,-R*.5,-.2,.85)}}}for(let p=0;p<10;p+=.25){const g=(10-p)*.4*t,_=C(h,[Math.cos(p)*g,-6*t+Math.sin(p)*g]);a.px(_[0],_[1],E.LEAF2,0,-.5,.85)}return Di(a,c,h[1]+6*t)}function tg(i,e,t){const n=Ii(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new Ft(r,s),c=r/2,o=s,l=10*t,h=kn(a,[c,o],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const _=kn(a,h.end,-Math.PI/2+g*Ue(i,.7,1.15)*(.7+.3*n),s*Ue(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});d.push(_.end,Ke(h.end,_.end,.55))}ts(a,c,o,l,e,i,t),ns(a,e);const u=Math.round(Ue(i,2,3)),p=Math.min(...d.map(g=>g[1]));for(let g=0;g<u;g++){const _=p-6*t+g*9*t,m=(95-g*12)*t*(.65+.35*n);for(let f=0;f<5;f++)ri(a,[c+(f-2)*m*.36+Ue(i,-5,5)*t,_+Ue(i,-3,3)*t],m*Ue(i,.2,.26),7*t,e,i,{mat:g===u-1?E.LEAF:E.LEAF3})}return Di(a,c,h.end[1]+4*t)}const nl=[["wBroad",Ql],["wFir",jl],["wWillow",Q0],["wBirch",j0],["wPalm",eg],["wFlat",tg]];function ng(i,e){const t=nl.reduce((r,[s])=>r+e[s],0)||1;let n=i()*t;for(const[r,s]of nl)if(n-=e[r],n<=0)return s;return Ql}function ec(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===jl?.06:0);return{[E.TRUNK]:ut(e.trunkHue,.45*e.sat,.34),[E.BARKD]:ut(e.trunkHue+.03,.5*e.sat,.17),[E.BARKL]:ut(e.trunkHue-.01,.38*e.sat,.5),[E.BARK2]:[222,220,212],[E.LEAF]:ut(n,.62*e.sat,.58),[E.LEAF2]:ut(n-.05,.55*e.sat,.8),[E.LEAF3]:ut(n+.03,.66*e.sat,.38)}}function ig(i){const{sp:e,crownY:t}=i,n=new Ft(e.w,e.h),r=new Ft(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const c=s*e.w+a,o=e.m[c];if(!o)continue;(J0.has(o)&&s>=t?r:n).put(a,s,o,e.n[c*3],e.n[c*3+1],e.n[c*3+2])}return{top:n,bot:r}}function rg(i,e){const t=e.bushSize,n=K0(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new Ft(r,s);if(n==="round"||n==="shrub"){const o=n==="shrub"?5:3;for(let l=0;l<o;l++)ri(a,[r/2+Ue(i,-9,9)*t,s-8*t+Ue(i,-4,2)*t],Ue(i,7,10)*t,Ue(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const h=r/2+Ue(i,-12,12)*t,d=s-Ue(i,5,17)*t;a.get(h,d)&&a.recolour(h,d,E.FLOWER)}}else if(n==="fern")for(let o=0;o<7;o++){const l=-Math.PI/2+(o/6-.5)*2.4;let h=r/2,d=s-1;for(let u=0;u<15*t;u++)h+=Math.cos(l)*.9,d+=Math.sin(l)*.9+u*.06,a.put(h,d,o%2?E.LEAF3:E.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(a.put(h,d-1,E.LEAF2,0,-.5,.85),a.put(h+Math.sign(Math.cos(l)),d+1,E.LEAF,0,.3,.9))}else for(let o=0;o<18*t;o++){const l=r/2+Ue(i,-13,13)*t,h=Ue(i,5,15)*t,d=Ue(i,-3,3);for(let u=0;u<h;u++)a.put(l+d*u/h*(u/h),s-1-u,u>h*.65?E.LEAF2:u<h*.3?E.LEAF3:E.LEAF,d*.1,-.3,.9)}const c=ec(i,e,null);return c[E.FLOWER]=ut(i(),.55,.95),{sp:a,colours:c}}const tc={wolf:{rows:["...........d..d....","..........dBedBe...","..........BBBBBBB..",".bb......BBBBBBBB..","bBb......BBBBEGBB..","bBb...bbbBBBBEEBWWN",".bBBBBBBBBBBBBWWWW.","..BBBBBBBBBBBBWWW..","..BBBBBBBBBBBWW....","..BBWWWWWWBBBB.....","..BB.b....BB.b.....","..dd.d....dd.d....."],walk:["...BBb...b.BB......","...ddd...d.dd......"]},boar:{rows:["...........bb.....",".....BBBBBBBbB....","...BBWWWWWWBBBB...","..BBBBBBBBBBBBGB..",".bBWWWWWWWWBBBEBBBN","..BBBBBBBBBBBBBBBBN","..BWWWWWWWWBBBBBb..","...BBBBBBBBBBBB....","...BB.b....BB.b....","...dd.d....dd.d...."],walk:["....BBb...b.BB.....","....ddd...d.dd....."]},owl:{rows:[".b......b.",".bBBBBBBb.","BBWWBBWWBB","BWEGWWEGWB","BWEEAAEEWB","BBWWWAWWBB","bBWWWWWWBb","bBWbWWbWBb","bBWWWWWWBb",".bBWbWWBb.","..BBBBBB..","..A....A.."],walk:["...A..A..."]},fox:{rows:["..........d...d...",".........dBe.dBe..",".........BBBBBBB..","WB......BBBBBGBB..","WBB.....BBBBBEBWWN",".BBB.BBBBBBBBBWWW.","..BBBBBBBBBBBWWW..","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..dd.d....dd.d....","..dd.d....dd.d...."],walk:["...dd.d..d.dd.....","...dd.d..d.dd....."]},badger:{rows:["..........dd.......","...BBBBBBBWWWW.....",".BBBBBBBBWdGdWW....","BBBBBBBBBWdEddddN..","BBBBBBBBBBWWWWW....",".BBBBBBBBBBBBB.....",".dd.d.....dd.d.....",".dd.d.....dd.d....."],walk:["..dd.d...d.dd......","..dd.d...d.dd......"]},stag:{rows:["...........bb.b...","..........BeBBe...","..........BBBBB...","..........BBBGBB..","..........BBBEBBBN","..W......BBBB.WW..",".WBBBBBBBBBBB.....",".BWBBWBBWBBBB.....","..BBBBBBBBBBW.....","..BBWWWWWWBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},hare:{rows:["........dd.......","........Be.d.....","........Be.Bd....","........BeBBe....",".......BBBBB.....",".......BBBGBB....","..W...BBBBEBBN...",".WWBBBBBBBBWW....","..BBBBBBBBBW.....",".BBBBBBBBBW......",".BBBWWWWBB.......",".dddd...dd......."],walk:["dddd....d.d......"]},bear:{rows:[".........bb..bb..",".........BeBBBe..","........BBBBBBBB.","..BBBB..BBBBBGBB.",".BBBBBBBBBBBBEBWW","BBBBBBBBBBBBBBWWN","BBBBBBBBBBBBBBB..","BBBBBBBBBBBBBB...",".BBBbBBBBBBbBB...",".BB.bb...BB.bb...",".dd.dd...dd.dd..."],walk:["..BBbb..bBB.b....","..dddd..ddd.d...."]},squirrel:{rows:[".bb.............","bBBb......d..d..","bBBBb....dB.dB..",".bBBb....BBBBB..","..bBB...BBBBGB..","..bBB...BBBBEBBN","...BB..BBBBBWW..","...BBBBBBBBWW...","....BBBBBBBW....","....BBWWWBBB....","....dd...dd....."],walk:[".....dd.d.d....."]},otter:{rows:["............BBB....","..........BBBBBB...",".......BBBBBBBGBB..","....BBBBBBBBBBEBWWN","BBBBBBBBBBBBBBWWWW.",".BBBBBBBBBBBBWWW...","..BBWWWWWWBBBB.....","...dd.....dd......."],walk:["....dd...dd........"]},lynx:{rows:["..........d...d...","..........d...d...",".........BeB.Be...",".........BBBBBBB..",".........BBBBGBBB.",".d.......BBBBEBWWN",".dB......BBBBBWWW.","..BBBBBBBBBBBWW...","..BdBBdBBdBBBB....","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..BB.b....BB.b....","..dd.d....dd.d...."],walk:["...BB.b..bBB......","...dd.d..ddd......"]},elk:{rows:["..........b..b....","..........BBBB....","..........BBBGB...","..........BBBEBBB.",".........BBBBBBBBN",".b......BBBB..BB..",".BBBBBBBBBBB......",".BBBBBBBBBBB......","..BBBBBBBBBB......","..BBbbbbbbBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},beaver:{rows:["..........bb......","........BBBBBB....","......BBBBBBGBB...","....BBBBBBBBEBBB..","...BBBBBBBBBBBBBN.","...BBBBBBBBBBBAA..","...BBBBBBBBBBB.A..","dddBBBBBBBBBB.....","ddd.BBB...BB......","....dd....dd......"],walk:[".....dd..dd......."]},stoat:{rows:["...........BB.....","..........BBBBB...",".........BBBGBB...","dd.BBBBBBBBBEBBN..","dBBBBBBBBBBBWWW...","...BBBBBBBBWWW....","...BWWWWWWBB......","...dd....dd......."],walk:["....dd..dd........"]},hedgehog:{rows:["....bdbdb......","..bdbdbdbdb....",".bdbdbdbdbdbe..","dbdbdbdbdbWWW..","bdbdbdbdbWGWW..","dbdbdbdbWWEWWWN",".WWWWWWWWWWWW..","..dd.....dd...."],walk:["...dd...dd....."]},toad:{rows:["........BBB...","......BBIEB...","..BBBBBBBBBB..",".BBdBBBBdBBBB.","BBBBBBdBBBBBBB","BBdBBBBBBBLLLL","BBBBWWWWWWWWB.",".BBBBWWWWWBB..","BBBB....BB...."],walk:[".BBBB...BB...."]},raven:{rows:[".......BBB.....","......BBBBB....","......BBGBBNN..","......BBEBNNNN.","....BBBBBBNN...","..bbBBBBBBB....","bbbBBbBBBBB....","bb..bBBBBBB....","......BBBB.....","......N.N......","......NNNN....."],walk:["......N..N.....",".....NN.NN....."]},bat:{rows:["...d.....d...","...Bd...dB...","...BBBBBBB...","b..BGBBBGB..b","bb.BEBBBEB.bb","bbbbBBNBBbbbb","bbbbBBBBBbbbb",".bb.BBBBB.bb.","b...BBBBB...b",".....d.d....."],walk:["...BGBBBGB...","...BEBBBEB...",".bbbBBNBBbbb.","bbbbBBBBBbbbb","bbbbBBBBBbbbb","bb..BBBBB..bb","b....d.d....b"]},mole:{rows:["....BBBBB......","..BBBBBBBBB....",".BBBBBBBBBBB...","BBBBBBBBBBEBSS.","BBBBBBBBBBBBSSS","BBBBBBBBBBBB...",".BBBBBBBSSBB...","S.SS...SSSS...."],walk:[".SS.....SSSS..."]},beetle:{rows:["..........A.A.","...bbbbb..AA..",".bBBBBBBbBBA..","bBWBBBBBbBGB..","bBBBBBBBbBB...",".bbbbbbbbb....",".d.d.d.d.d...."],walk:["d.d.d.d.d....."]}},nc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.6,sat:.14,val:.74,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:E.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],ic=Object.fromEntries(nc.map(i=>[i.id,i]));function sg(i,e){const t=ic[i],n=e.cVal/.85,r=e.cSat/.6,s=ut(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ut(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),c=ut(e.magicHue+t.hue*.3,.6,1),o=ut(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk"].includes(t.id);return{[E.BODY]:s,[E.BODY2]:ut(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[E.BODY3]:ut(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[E.BELLY]:a,[E.ACCENT]:l?[236,226,200]:ut(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[E.MAGIC]:c,[E.MAGIC2]:o,[E.LEAF]:ut(.3,.55,.55),[E.LEAF2]:ut(.25,.5,.75),[E.LEAF3]:ut(.33,.6,.35),[E.TRUNK]:ut(.07,.45,.32),[E.EYE]:[24,18,30],[E.PUPIL]:[70,40,90],[E.GLINT]:[255,255,245],[E.NOSE]:[38,28,36],[E.EAR]:ut(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[E.IRIS]:t.plan==="owl"?[255,176,40]:ut(.12,.7,.85),[E.SKIN]:[238,158,192]}}const Hn=(i,e)=>Math.round(e.size*Math.pow(Math.sqrt(e.growth),i)*(i?2/(e.pixel||2):1));function ag(i,e,t,n){const r=ic[i]||nc[0];if(e===0&&tc[r.id])return og(r.id,t,n);if(r.q)return cg(r,e,t,n);const s={owl:Sg,raven:_g,bat:xg,toad:gg,hedgehog:mg,mole:vg,beetle:Mg}[r.plan];return s(r,e,t,n)}function og(i,e,t){const n=tc[i],r=e&&n.walk?n.rows.slice(0,n.rows.length-n.walk.length).concat(n.walk):n.rows,s=Math.max(...r.map(o=>o.length))+2,a=r.length+1,c=new Ft(s,a);return c.grid(r,lg,1,1,{round:t.round}),c}const lg={B:E.BODY,b:E.BODY2,d:E.BODY3,W:E.BELLY,A:E.ACCENT,E:E.EYE,G:E.GLINT,N:E.NOSE,I:E.IRIS,P:E.PUPIL,e:E.EAR,L:E.LINE,S:E.SKIN};class Gn{constructor(){this.ops=[]}shape(e,t,n={}){return this.ops.push({k:"shape",pts:e,mat:t,o:n}),this}limb(e,t,n={}){return this.ops.push({k:"limb",pts:e,mat:t,o:n}),this}mark(e,t,n,r={}){return this.ops.push({k:"mark",pts:e,mat:t,onlyOn:n,o:r}),this}fn(e){return this.ops.push({k:"fn",f:e}),this}draw(e,t,n=1,r=null){if(r)for(const f of this.ops)f.pts&&(f.pts=f.pts.map(M=>{const[y,S,T=1]=r(M);return M.length>2?[y,S,M[2]*T]:[y,S]}));const s=[],a=[];for(const f of this.ops)if(f.pts)for(const M of f.pts){const y=f.k==="limb"?(M[2]||0)/2:0;s.push([M[0]-y,M[1]-y],[M[0]+y,M[1]+y]),f.o.extra||a.push([M[0],M[1]-y])}const c=Math.min(...a.map(f=>f[1])),o=e/-c,l=Math.min(...s.map(f=>f[0])),h=Math.max(...s.map(f=>f[0])),d=Math.min(...s.map(f=>f[1])),u=Math.ceil((h-l)*o)+2*n+2,p=Math.ceil(-d*o)+n+1,g=new Ft(u,p),_=f=>[(f[0]-l)*o+n+1,p+f[1]*o],m={sp:g,s:o,T:_,W:u,H:p};for(const f of this.ops){const M={round:t,...f.o};o<40&&!M.extra&&(M.line=!1),f.k==="shape"?g.shape(f.pts.map(_),f.mat,M):f.k==="limb"?g.limb(f.pts.map(y=>[..._(y),y[2]*o]),f.mat,M):f.k==="mark"?g.mark(f.pts.map(_),f.mat,f.onlyOn,M):f.f(m)}return g}}function Yr(i,e,t,n,{iris:r=!1,glow:s=!1}={}){e=Math.round(e),t=Math.round(t);const a=(l,h,d)=>i.px(e+l,t+h,d,0,0,1);if(n<2){a(0,0,E.EYE);return}if(n<3){a(0,0,E.EYE),a(0,1,E.EYE),a(-1,1,E.EYE),a(0,0,s?E.MAGIC2:E.GLINT);return}const c=Math.round(n*1.25),o=Math.round(n);for(let l=0;l<o;l++)for(let h=0;h<c;h++){const d=(h+.5)/c*2-1,u=(l+.5)/o*2-1,p=d*d+u*u;p>1.15||a(h-c+1,l,(s||r)&&p<.62&&p>.08&&o>=4?s?E.MAGIC:E.IRIS:E.EYE)}a(-Math.floor(c/2)+1,Math.floor((o-1)/2)-(o>=4?1:0),E.GLINT),c>=6&&a(-Math.floor(c/2)+2,Math.floor((o-1)/2)-1,E.GLINT)}function cg(i,e,t,n){const r={legW:1,earS:1,snoutTaper:.75,haunch:1,hindFoot:1,hgt:1,...i.q},s=e===2,a=K=>s&&i.legend.includes(K),c=e===1,o=r.hr*(c?1.22:1)*(n.head/.44)**.5,l=r.len*(c?.9:1.04)*n.long*.84,h=(c?.92:1.04)*n.legs**.5,d=t?-.05:0,u=-1+d,p=-r.chest*(s?1.1:1)/h+d,g=-r.tuck/h+d,_=new Gn,m=r.legW*(s?1.15:1),f=r.legMat||E.BODY,M=[.36,-.36][t]*(r.stride||1),y=[l*.14,-.13],S=r.back==="arch"?.14:0,T=r.back==="hump"?.12:0,A=[-l*.62,u+.28-S*.5],R=[l*.6,u+.42],v=K=>{const xe=r.hindFoot;return[A,[-l*.42,g+.2],[-l*.74-(xe-1)*.1,-.24/xe],[-l*.7-(xe-1)*.05,-.05],[-l*.6+(xe-1)*.22,0]].map(Pe=>el(Pe,A,K*M))},w=K=>[R,[l*.64,p+.06],[l*.6,-.2],[l*.63,-.05],[l*.72,0]].map(xe=>el(xe,R,-K*M*.9)),P=(K,xe)=>{const ge=Math.max(...K.map(Me=>Me[1])),Pe=(0-K[0][1])/(ge-K[0][1]),we=K.map(Me=>[Me[0],K[0][1]+(Me[1]-K[0][1])*Pe]);return[[...we[0],xe],[...we[1],.15*m],[...we[2],.095*m],[...we[3],.085*m],[...we[4],.07*m]]},U=(K,xe,ge,Pe=1)=>{const we=K[K.length-1],Me=(r.paw==="hoof"?.1:.13)*Pe,We=r.paw==="hoof"?.09:.075;_.shape([[we[0]-Me*.55,-We],[we[0]+Me*.2,-We*1.1],[we[0]+Me*.6,-We*.3],[we[0]+Me*.55,0],[we[0]-Me*.6,0]],r.paw==="hoof"?E.NOSE:xe,ge)},z=(K,xe,ge,Pe,we,Me=[0,0])=>{const We=P(K,ge).map($e=>[$e[0]+Me[0],$e[1]+Me[1],$e[2]]);_.limb(We,xe,{cap:1,capEnd:.4,...Pe}),U(We.map($e=>[$e[0],$e[1]]),xe,Pe,we)};if(a("wings")&&qr(_,[l*.25,u-.05],s,t,-1),a("tails"))for(let K=0;K<7;K++){const xe=Math.PI*(.62+K*.085)+(t?.03:0),ge=[-l*.95,u+.15],Pe=.95+K%2*.12,we=C(ge,[Math.cos(xe)*Pe,-Math.sin(xe)*Pe]),Me=C(Ke(ge,we,.55),[Math.sin(xe)*.08,Math.cos(xe)*.08]);_.limb([[...ge,.12],[...Me,.34],[...Ke(Me,we,.6),.28],[...we,.12]],K%2?E.BODY2:E.BODY,{group:70+K%2,line:!0,extra:!0}),_.shape([C(we,[Math.cos(xe)*.07,-Math.sin(xe)*.07]),C(Ke(Me,we,.7),[Math.sin(xe)*.13,Math.cos(xe)*.13]),C(Ke(Me,we,.7),[-Math.sin(xe)*.13,-Math.cos(xe)*.13])],E.MAGIC2,{group:72,extra:!0})}const X=f===E.BODY?E.BODY2:E.BODY3;z(w(-1),X,.19*m,{group:2},1,y),z(v(-1),X,.3*m*r.haunch,{group:2},r.hindFoot,y);const N=[-l*1,u+.18-S*.3];a("tails")||ug(_,a("starTail")?"star":r.tail,N,l,u,t);let V=[[-l*1.04,u+.14-S],[-l*.5,u+.02-S*1.3],[l*.1,u+.06-T*.5-S*.6],[l*.55,u-.03-T],[l*.95,u+.22-T*.5],[l*1.06,p-.2],[l*.8,p],[l*.3,p+(g-p)*.2],[-l*.25,g],[-l*.72,g+.02],[-l*1.1,u+.42-S*.5]];r.ridge&&(V=gt(V,0,4,s?10:7,s?.1:.07,1)),r.shaggy&&(V=gt(V,6,9,s?6:4,.04,1)),_.shape(V,E.BODY,{group:1,tilt:[0,-.3]});const j=[l*.78,u+.2],$=r.neckAng,se=C(j,[Math.cos($)*r.neck*.85,-Math.sin($)*r.neck*.85]),k=C(se,[o*.2,0]);_.limb([[...j,r.neckW*1.3],[...Ke(j,se,.55),r.neckW*1.05],[...se,r.neckW*.9]],E.BODY,{group:1,cap:0,capEnd:1});const Z=o*r.snout*(c?.75:1)*.72,ee=o*r.snoutD*1.1,ye=r.snoutTaper;let Be=[[-o*.85,-o*.1],[-o*.4,-o*.78],[o*.35,-o*.72],[o*.85,-o*.38],[o*.8+Z*.6,-ee*.65*(1+ye)/2+o*.02],[o*.85+Z,-ee*.5*ye],[o*.9+Z,ee*.25*ye],[o*.75+Z,ee*.42*ye+o*.1],[o*.35,o*.55],[-o*.3,o*.7],[-o*.85,o*.3]].map(K=>C(k,K));r.cheeks&&(Be=gt(Be,8,10,3,o*.22,1));const at=(K,xe,ge,Pe)=>hg(_,r,C(k,[K*o,-o*.55]),o,o*r.earS*xe,ge,Pe,t),Ve=(K,xe,ge)=>dg(_,r,C(k,[K*o,-o*.6]),o,e,a,xe,ge);if((r.antlers||a("jackalope"))&&Ve(.42,a("antlersGlow")?E.MAGIC:E.ACCENT,{group:11,line:!0,extra:!0}),!r.antlers&&a("jackalope")&&Ve(.1,E.ACCENT,{group:12,line:!0,extra:!0}),at(.42,.85,E.BODY2,{group:4}),_.shape(Be,E.BODY,{group:1,line:!1}),at(-.3,1,E.BODY,{group:5,line:!0}),r.antlers&&Ve(-.05,a("antlersGlow")?E.MAGIC2:E.ACCENT,{group:12,line:!0,extra:!0}),z(v(1),f,.36*m*r.haunch,{group:6,line:!0},r.hindFoot),z(w(1),f,.2*m,{group:7,line:!0}),r.saddle&&_.mark([[-l*1.15,u-.05-S],[l*.5,u-.1],[l*.85,u+.1],[l*.3,u+.2],[-l*.5,u+.24],[-l*1.2,u+.3]],E.BODY2,[E.BODY]),r.belly){const K=E.BELLY;_.mark([[l*.55,p-.3],[l*1.15,p-.32],[l*1,p+.1],[l*.2,p+.05],[-l*.4,g+.05],[-l*.3,g-.08]],K,[E.BODY]),_.mark([k,C(k,[o*.5+Z,o*.2]),C(k,[o*.8+Z,ee*.5]),C(k,[-o*.2,o*.9]),C(k,[-o*.7,o*.5])],K,[E.BODY])}if(r.muzzle&&_.mark([C(k,[o*.55,-o*.2]),C(k,[o*1.2+Z,-ee]),C(k,[o*1.2+Z,ee*.8]),C(k,[o*.4,o*.6])],E.BELLY,[E.BODY]),r.face==="badger"){_.mark([C(k,[-o*1.1,-o]),C(k,[o*1.3+Z,-ee]),C(k,[o*1.3+Z,ee]),C(k,[-o*1.1,o])],E.BELLY,[E.BODY]);for(const K of[-.05,.42])_.mark([C(k,[-o*.9,-o*(.85-K)]),C(k,[-o*.4,-o*(.95-K)]),C(k,[o*.9+Z*.9,-ee*.35+o*K*.25]),C(k,[o*.9+Z*.9,-ee*.15+o*K*.3]),C(k,[-o*.3,-o*(.4-K)]),C(k,[-o*.9,-o*(.35-K)])],E.BODY3,[E.BELLY])}if(r.rump&&_.mark([[-l*1.2,u+.12],[-l*.95,u+.14],[-l*.92,u+.45],[-l*1.2,u+.45]],E.BELLY,[E.BODY]),r.paw==="paw"&&!r.socks){const K=P(w(1),0)[4];_.mark([[K[0]-.08,-.18],[K[0]+.09,-.18],[K[0]+.12,0],[K[0]-.08,0]],E.BELLY,[E.BODY])}_.fn(({sp:K,T:xe,s:ge})=>{if(r.socks){const we=xe([0,-r.socks])[1];for(let Me=Math.floor(we);Me<K.h;Me++)for(let We=0;We<K.w;We++){const $e=Me*K.w+We;[2,6,7].includes(K.g[$e])&&[E.BODY,E.BODY2].includes(K.m[$e])&&(K.m[$e]=E.BODY3)}}if((r.spots==="young"?c:r.spots)&&ge>18){const we=Math.max(3,Math.round(ge*.09)),Me=r.spots==="young"?E.BELLY:E.BODY3,[,We]=xe([0,u+.1]),[,$e]=xe([0,p+.05]);for(let ft=We;ft<$e;ft+=we)for(let Je=0;Je<K.w;Je+=we){const nt=Je+((ft/we|0)%2?we>>1:0)+(nn(Je,ft,3)*2|0),L=ft*K.w+nt;K.m[L]===E.BODY&&K.g[L]===1&&K.m[L+1]===E.BODY&&nn(Je,ft,5)<.25+n.fur&&(K.m[L]=Me,ge>40&&(K.m[L+1]=Me))}}});const Ze=k[0]+o*.32,J=k[1]-o*.24,ie=C(k,[o*.88+Z,-ee*.45*ye]);if(_.fn(({sp:K,T:xe,s:ge})=>{const Pe=Math.max(2,Math.round(o*ge*(c?.42:.3)*n.eye)),[we,Me]=xe([Ze,J]);Yr(K,we,Me,Pe,{glow:s&&!r.tusks});const[We,$e]=xe([k[0]+o*.78,k[1]-o*.46]);Yr(K,We,$e,Math.max(1,Pe-1),{glow:s&&!r.tusks});const[ft,Je]=xe(ie),nt=Math.max(1,Math.round(o*ge*(r.disc?.22:.14)));for(let B=0;B<=nt;B++)for(let x=-nt;x<=Math.round(nt*.3);x++)K.get(ft+x,Je+B)&&x*x/(nt*nt)+B*B/((nt+1)*(nt+1))<=1&&K.recolour(ft+x,Je+B,E.NOSE);r.disc&&K.recolour(ft-1,Je+nt,E.BODY3);const L=xe(C(k,[o*.85+Z,ee*.2*ye+o*.06])),_t=xe(C(k,[o*.55+Z*.45,ee*.32*ye+o*.12])),Qe=Math.ceil(Math.hypot(_t[0]-L[0],_t[1]-L[1]));if(ge*o>6)for(let B=0;B<=Qe;B++)K.recolour(L[0]+(_t[0]-L[0])*B/Qe,L[1]+(_t[1]-L[1])*B/Qe,E.LINE);if(r.teeth){const[B,x]=xe(C(k,[o*.8+Z,ee*.35*ye+o*.1])),F=Math.max(1,Math.round(o*ge*.14));for(let O=0;O<F*2;O++)for(let q=0;q<F;q++)K.px(B-q,x+O,E.ACCENT,0,0,1)}if(r.whiskers&&ge*o>8)for(const B of[-1,1]){const[x,F]=xe(C(k,[o*.75+Z,ee*.1]));for(let O=1;O<=Math.round(o*ge*.4);O++)K.get(x+O,F+B*(O>>1))||K.px(x+O,F+B*(O>>1),E.LINE)}}),r.tusks){const K=c?.35:a("tusksBig")?1.25:.7,xe=C(k,[o*.45+Z*.6,ee*.3]);_.limb([[...xe,.075*K**.5],[...C(xe,[o*.3*K,-o*.2*K]),.07*K**.5],[...C(xe,[o*.38*K,-o*.6*K]),.045*K**.5],[...C(xe,[o*.15*K,-o*.95*K]),.012]],E.ACCENT,{group:8,line:!0,cap:.6,extra:!0})}r.ridge&&_.mark(gt([[-l*1.05,u+.12],[-l*.5,u+.01],[l*.1,u+.05-T*.5],[l*.55,u-.04-T],[l*.9,u+.2],[l*.5,u+.12],[-l*.5,u+.16]],0,4,s?10:7,.07,1),E.BODY3,[E.BODY,E.LINE]);const Se=K=>[-l*.9+K*l*1.6,u+.02-S*(1-Math.abs(K-.45)*1.6)-T*Math.max(0,1-Math.abs(K-.85)*3)];if(a("crystals")&&Xa(_,Se),a("moss")&&fg(_,Se,l,t),a("ribbons")&&pg(_,l,u,t),a("mane"))for(let K=0;K<6;K++){const xe=K/5,ge=Ke(C(se,[-o*.3,-o*.6]),[l*.25,u+.02],xe),Pe=[.42,.3,.5,.26,.36,.22][K],we=.16-xe*.04,Me=t?.04:0;_.limb([[...ge,we],[...C(ge,[-.03,-Pe*.45]),we*1.05],[...C(ge,[-.14-Me,-Pe*.8]),we*.6],[...C(ge,[-.1-Me*2,-Pe*1.05]),we*.3],[...C(ge,[.02-Me,-Pe*1.2]),.01]],K%2?E.MAGIC:E.MAGIC2,{group:60+K%2,line:!0,extra:!0,cap:1,capEnd:.5})}a("wings")&&qr(_,[l*.15,u+.02],s,t,1);const Fe=([K,xe])=>{const ge=Math.max(-1.2,Math.min(.75,K/l)),Pe=1+.1*ge;return[K,xe*Pe-.08*Math.max(0,-ge),Pe]},ve=_.draw(Hn(e,n)*r.hgt,n.round,1,Fe);return s&&Wn(ve,i.id),ve}function ug(i,e,t,n,r,s,a,c){const o=s?.03:-.01,l={group:3,line:!0},h=d=>-n*d;if(e==="brush")i.shape(gt([C(t,[0,-.04]),[h(1.3),r+.26+o],[h(1.46),r+.6],[h(1.36),-.36+o],[h(1.2),-.36],[h(1.16),r+.66],[h(1),r+.4]],1,4,5,.05,1),E.BODY,l),i.mark([[h(1.5),-.5+o],[h(1.1),-.5],[h(1.2),-.3],[h(1.4),-.3]],E.BODY3,[E.BODY]);else if(e==="bushy"){const d=[h(1.05)-.95,r+.5+o];i.shape(gt([C(t,[0,-.05]),[h(1.05)-.3,r+.05+o],[h(1.05)-.7,r+.2+o],[d[0]-.05,d[1]-.08],[d[0]-.02,d[1]+.1],[h(1.05)-.6,r+.6+o],[h(1.05)-.25,r+.52],[h(1),r+.4]],2,6,5,.045,1),E.BODY,l),i.mark([[d[0]-.2,d[1]-.3],[d[0]+.22,d[1]-.3],[d[0]+.22,d[1]+.3],[d[0]-.2,d[1]+.3]],E.BELLY,[E.BODY])}else if(e==="stub")i.shape([C(t,[.04,-.04]),C(t,[-.12,-.1+o]),C(t,[-.16,.02+o]),C(t,[-.04,.12])],E.BODY,l);else if(e==="deer")i.shape([C(t,[.03,-.04]),C(t,[-.07,-.06+o]),C(t,[-.09,.06+o]),C(t,[-.01,.11])],E.BELLY,l),i.mark([C(t,[.04,-.08]),C(t,[-.12,-.08]),C(t,[-.1,-.02]),C(t,[.04,-.02])],E.BODY,[E.BELLY]);else if(e==="bob")i.shape([C(t,[.04,-.06]),C(t,[-.16,-.12+o]),C(t,[-.24,-.02+o]),C(t,[-.04,.12])],E.BODY,l),i.mark([C(t,[-.14,-.2]),C(t,[-.3,-.1]),C(t,[-.3,.05]),C(t,[-.14,.05])],E.BODY3,[E.BODY]);else if(e==="puff")i.shape(gt([C(t,[.04,-.1]),C(t,[-.14,-.16]),C(t,[-.2,.02]),C(t,[-.04,.1])],0,3,2,.03,1),E.BELLY,l);else if(e==="squirrel"||e==="star"){const d=e==="star"?E.MAGIC:E.BODY,u=[[...t,.16],[h(1.3),r-.05+o,.36],[h(1.32),r-.65+o,.46],[h(1),r-1.05+o,.44],[h(.62),r-1.02+o,.3],[h(.45),r-.82+o,.12]];i.shape(gt(Ra(u),0,6,9,.05,1),d,{...l,extra:!0}),i.mark(Ra([[h(1.18),r-.1,.12],[h(1.18),r-.62,.2],[h(.98),r-.9,.2],[h(.7),r-.92,.1]]),e==="star"?E.MAGIC2:E.BODY2,[d]),e==="star"&&i.fn(({sp:p,T:g,s:_})=>{const m=es(7);for(let f=0;f<9;f++){const[M,y]=g([h(Ue(m,.7,1.4)),r-Ue(m,.1,1)]);if((p.get(M,y)===E.MAGIC||p.get(M,y)===E.MAGIC2)&&(p.px(M,y,E.GLINT),_>40))for(const[S,T]of[[1,0],[-1,0],[0,1],[0,-1]])[E.MAGIC,E.MAGIC2].includes(p.get(M+S,y+T))&&p.px(M+S,y+T,E.GLINT)}})}else if(e==="otter")i.limb([[...t,.26],[h(1.3),r+.5+o,.18],[h(1.6),-.12,.1],[h(1.85),-.06+o,.04]],E.BODY,l);else if(e==="stoat")i.limb([[...t,.12],[h(1.25),r+.12+o,.1],[h(1.5),r+.02+o,.09],[h(1.65),r-.05+o,.07]],E.BODY,l),i.mark([[h(1.48),r-.25],[h(1.8),r-.25],[h(1.8),r+.25],[h(1.48),r+.25]],E.BODY3,[E.BODY]);else if(e==="flat"){i.limb([[...t,.14],[h(1.15),r+.6,.1]],E.BODY2,l);const d=[h(1.35),-.12+o*.5];i.shape([C(d,[.22,-.06]),C(d,[0,-.11]),C(d,[-.3,-.07]),C(d,[-.36,.02]),C(d,[-.2,.07]),C(d,[.2,.05])],E.BODY3,l),i.fn(({sp:u,T:p,s:g})=>{if(g<30)return;const[_,m]=p(C(d,[-.32,-.1])),[f,M]=p(C(d,[.2,.06]));for(let y=m;y<=M;y++)for(let S=_;S<=f;S++)(S+y)%4===0&&u.get(S,y)===E.BODY3&&u.recolour(S,y,E.LINE)})}else e==="thin"&&(i.limb([[...t,.07],[h(1.1),r+.3,.05],[h(1.12)+o,r+.55,.035]],E.BODY,{group:3}),i.shape(gt([[h(1.15)+o,r+.5],[h(1.08)+o,r+.55],[h(1.12)+o,r+.72],[h(1.17)+o,r+.7]],1,3,2,.04,1),E.BODY3,{group:3}))}function hg(i,e,t,n,r,s,a,c){const o=e.ear;if(o==="round"){i.shape([C(t,[-n*.32,.02]),C(t,[-n*.3,-r*.32]),C(t,[-n*.05,-r*.45]),C(t,[n*.15,-r*.25]),C(t,[n*.18,.02])],s,a),i.mark([C(t,[-n*.2,-.01]),C(t,[-n*.18,-r*.2]),C(t,[n*.02,-r*.28]),C(t,[n*.08,-.01])],E.EAR,[s]);return}if(o==="long"){const h=C(t,[-r*.32,-r*1.05+(c?.02:0)]);i.shape([C(t,[-n*.25,.02]),C(Ke(t,h,.5),[-n*.2,0]),C(h,[-n*.05,-n*.05]),C(h,[n*.12,n*.1]),C(Ke(t,h,.5),[n*.24,n*.05]),C(t,[n*.25,0])],s,a),i.mark([C(Ke(t,h,.15),[-n*.05,0]),C(Ke(t,h,.8),[0,0]),C(Ke(t,h,.5),[n*.14,n*.03])],E.EAR,[s]),i.mark([C(h,[-n*.3,-n*.3]),C(h,[n*.3,-n*.2]),C(Ke(t,h,.85),[n*.3,n*.1]),C(Ke(t,h,.85),[-n*.3,0])],E.BODY3,[s,E.EAR]);return}const l=o==="small"?[C(t,[-n*.25,.02]),C(t,[-n*.55,-r*.55]),C(t,[-n*.62,-r*.62]),C(t,[n*.2,-n*.08])]:[C(t,[-n*.3,.02]),C(t,[-n*.25,-r*.6]),C(t,[-n*.12,-r*1.02]),C(t,[-n*.05,-r*1.04]),C(t,[n*.22,-r*.45]),C(t,[n*.3,-n*.02])];i.shape(l,s,a),o!=="small"&&i.mark([C(t,[-n*.15,-r*.15]),C(t,[-n*.1,-r*.7]),C(t,[n*.1,-r*.35]),C(t,[n*.12,-r*.1])],E.EAR,[s]),i.mark([C(t,[-n*.3,-r*.72]),C(t,[-n*.1,-r*1.1]),C(t,[n*.1,-r*.9]),C(t,[n*.3,-r*.62])],E.BODY3,[s,E.EAR]),o==="tuft"&&i.limb([[...C(t,[-n*.08,-r*.98]),.045],[...C(t,[-n*.02,-r*1.35]),.02]],E.BODY3,{...a,extra:!0})}function dg(i,e,t,n,r,s,a,c){const o=!e.antlers,l=o?.45:[0,.5,.9][r]*(s("antlersGlow")?1.15:1);if(!l)return;const h=(m,f,M,y)=>i.limb([[...m,y],[...C(m,[Math.cos(f)*M*.6,-Math.sin(f)*M*.6]),y*.7],[...C(m,[Math.cos(f)*M,-Math.sin(f)*M*1.05]),y*.3]],a,{...c,capEnd:.6}),d=.07*Math.max(.7,l);if(e.antlers==="palm"){const m=C(t,[-.2*l,-.12*l]),f=C(m,[-.32*l,-.18*l]);i.limb([[...t,d*1.3],[...m,d*1.1],[...Ke(m,f,.6),d]],a,c);const M=[C(m,[0,-.02*l]),C(f,[.18*l,-.2*l]),C(f,[-.05*l,-.3*l]),C(f,[-.38*l,-.2*l]),C(f,[-.42*l,.02*l]),C(f,[-.15*l,.12*l])];i.shape(gt(M,1,4,r===2?4:3,.09*l,1),a,c),h(C(m,[.02*l,0]),.5,.22*l,d*.7);return}const u=C(t,[-.22*l,-.28*l]),p=C(t,[-.3*l,-.62*l]),g=C(t,[-.16*l,-.92*l]),_=C(t,[.02*l,-1.02*l]);i.limb([[...t,d*1.25],[...u,d],[...p,d*.85],[...g,d*.65],[..._,d*.3]],a,{...c,capEnd:.6}),h(C(t,[-.06*l,-.08*l]),.45,.3*l,d*.8),(l>.4||o)&&h(u,.7,.32*l,d*.7),l>.7&&(h(p,.85,.3*l,d*.6),h(g,1.1,.2*l,d*.5),h(g,2.3,.16*l,d*.45))}function Xa(i,e,t){[.32,.5,.38,.62,.42,.3].forEach((r,s)=>{const a=.12+s*.14,c=C(e(a),[0,.08]),o=(s-2.5)*.08,l=r*.32,h=C(c,[o*r,-r]),d=[C(c,[-l*.5,0]),C(c,[-l*.55+o*r*.7,-r*.72]),h,C(c,[l*.55+o*r*.7,-r*.72]),C(c,[l*.5,0])];i.shape(d,E.MAGIC,{group:80+s%2,line:!0,extra:!0}),i.mark([C(c,[0,0]),C(c,[o*r*.7,-r*.72]),h,C(c,[l*.55+o*r*.7,-r*.72]),C(c,[l*.5,0])],E.MAGIC2,[E.MAGIC])})}function fg(i,e,t,n){const r=[],s=[];for(let a=0;a<=8;a++){const c=e(.05+a*.11);r.push(C(c,[0,-.08])),s.unshift(C(c,[0,.14]))}i.shape(gt([...r,...s],0,8,2,.05,1),E.LEAF,{group:85,line:!0,extra:!0});for(const[a,c]of[[.22,.55],[.5,.8],[.75,.45]]){const o=C(e(a),[0,-.02]),l=n?.02:0;i.limb([[...o,.07],[...C(o,[l,-c*.6]),.04]],E.TRUNK,{group:86,line:!0,extra:!0});const h=C(o,[l,-c*.75]),d=c*.32;i.shape(gt([C(h,[0,-d]),C(h,[d*.9,-d*.3]),C(h,[d,d*.4]),C(h,[0,d*.6]),C(h,[-d,d*.4]),C(h,[-d*.9,-d*.3])],0,6,2,d*.2,1),E.LEAF2,{group:87,line:!0,extra:!0}),i.mark([C(h,[-d*.2,-d*.1]),C(h,[d*.9,0]),C(h,[d*.8,d*.5]),C(h,[-d*.5,d*.5])],E.LEAF,[E.LEAF2])}for(const a of[.1,.38,.62,.9]){const c=C(e(a),[0,-.06]);i.limb([[...c,.04],[...C(c,[0,-.1]),.035]],E.BELLY,{group:88,extra:!0}),i.shape([C(c,[-.08,-.1]),C(c,[0,-.17]),C(c,[.08,-.1])],E.MAGIC,{group:89,line:!0,extra:!0})}}function pg(i,e,t,n){for(let r=0;r<3;r++){const s=[],a=n*.8+r*1.7;for(let c=0;c<=8;c++){const o=c/8;s.push([e*(.55-o*2.2),t+.05-r*.1-o*(.25+r*.12)+Math.sin(o*6+a)*.1*o,.07*(1-o*.7)])}i.limb(s,r%2?E.MAGIC2:E.MAGIC,{group:90+r,line:!0,extra:!0})}}function rc(i,{sh:e,wrist:t,tip:n,d0:r,d1:s,l0:a,l1:c,w:o=.13,mat:l=E.MAGIC,light:h=E.MAGIC2,n:d=11,group:u=10}){const p=f=>f<.45?Ke(e,t,f/.45):Ke(t,n,(f-.45)/.55),g=[];for(let f=0;f<=d;f++){const M=f/d,y=Ke(r,s,M),S=Math.hypot(...y),T=a+(c-a)*M*M,A=p(M);g.push({b:A,e:[A[0]+y[0]/S*T,A[1]+y[1]/S*T]})}const _=[];for(let f=d;f>=0;f--)_.push(g[f].e),f&&_.push(Ke(Ke(g[f].e,g[f-1].e,.5),Ke(g[f].b,g[f-1].b,.5),.14));i.shape([C(e,[0,-o*.5]),C(t,[0,-o*.5]),C(n,[0,-o*.4]),..._],l,{group:u,line:!0,extra:!0});for(let f=0;f<d;f+=2)i.mark([g[f].b,g[f+1].b,Ke(g[f+1].b,g[f+1].e,1.02),Ke(g[f].b,g[f].e,1.02)],h,[l]);const m=[];for(let f=d;f>=0;f--)m.push(Ke(g[f].b,g[f].e,.33));i.shape(gt([C(e,[0,-o*.6]),C(t,[0,-o*.6]),C(n,[0,-o*.5]),...m],3,3+d,1,o*.25,1),h,{group:u+1,line:!0,extra:!0})}function qr(i,e,t,n,r){const s=r<0,a=n?-.06:0,c=C(e,s?[.1,-.06]:[0,0]),o=s?.9:1;rc(i,{sh:c,wrist:C(c,[-.25*o,-.72*o+a]),tip:C(c,[-1*o,-1*o+a*1.5]),d0:[-.85,.55],d1:[-1,.25],l0:.22*o,l1:.8*o,mat:s?E.BODY2:E.MAGIC,light:s?E.MAGIC:E.MAGIC2,group:s?40:50})}function Wn(i,e){const t=es(e.length*7919);for(let n=0;n<8;n++){const r=Math.floor(Ue(t,2,i.w-2)),s=Math.floor(Ue(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,E.MAGIC2),n%3===0))for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]])i.get(r+a,s+c)||i.px(r+a,s+c,E.MAGIC)}}function sc(i,e,t,n,r){const s=[C(e,[-t/2,0]),C(e,[-t/2,-n*.35]),C(e,[t/2,-n*.35]),C(e,[t/2,0])],a=[s[0],C(e,[-t*.55,-n]),C(e,[-t*.3,-n*.45]),C(e,[-t*.15,-n*1.05]),C(e,[0,-n*.5]),C(e,[t*.15,-n*1.05]),C(e,[t*.3,-n*.45]),C(e,[t*.55,-n]),s[3]];i.shape(a,E.MAGIC,{group:95,line:!0,extra:!0}),i.mark([C(e,[-t*.6,-n*.05]),C(e,[t*.6,-n*.05]),C(e,[t*.6,-n*.3]),C(e,[-t*.6,-n*.3])],E.MAGIC2,[E.MAGIC]),i.fn(({sp:c,T:o})=>{for(const l of[-.3,0,.3]){const[h,d]=o(C(e,[t*l,-n*.17]));c.recolour(h,d,E.GLINT)}})}function mg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Gn,o=t?.02:0;for(const[u,p,g]of[[-.45,E.BODY3,2],[.3,E.BODY3,2]])c.limb([[u+.05,-.25,.14],[u+.08+o,0,.1]],p,{group:g});c.shape([[-.6,-.3],[.45,-.38],[.55,-.15],[.1,-.08],[-.55,-.12]],E.BELLY,{group:1,line:!0});let l=[[-.75,-.15],[-.82,-.5],[-.55,-.9],[-.05,-1],[.35,-.88],[.58,-.58],[.5,-.3],[.15,-.38],[-.3,-.28]];l=gt(l,0,6,s?3:r?6:4,s?.06:.09,1),c.shape(l,E.BODY2,{group:3,line:!0}),c.fn(({sp:u,T:p,s:g})=>{if(g<18)return;const _=es(11),[m,f]=p([-.85,-1.05]),[M,y]=p([.6,-.2]),S=Math.round((M-m)*(y-f)/9);for(let T=0;T<S;T++){const A=Math.round(Ue(_,m,M)),R=Math.round(Ue(_,f,y)),v=Math.max(2,Math.round(g*.05));if(u.g[R*u.w+A]===3){for(let w=0;w<v;w++){const P=A-w,U=R+(w>>1);u.g[U*u.w+P]===3&&u.m[U*u.w+P]!==E.LINE&&(u.m[U*u.w+P]=E.BODY3)}u.g[R*u.w+A+1]===3&&(u.m[R*u.w+A+1]=E.BELLY)}}});const h=s?.16:.24;c.shape([[.35,-.68],[.58,-.6],[.68+h,-.4],[.7+h,-.3],[.6,-.18],[.32,-.22]],E.BELLY,{group:4,line:!0}),c.shape([[.38,-.7],[.48,-.78],[.55,-.66],[.46,-.6]],E.BODY,{group:5,line:!0}),c.fn(({sp:u,T:p,s:g})=>{const[_,m]=p([.7+h,-.36]),f=Math.max(1,Math.round(g*.035));for(let S=-f;S<=f;S++)for(let T=-f;T<=0;T++)u.recolour(_+T,m+S,E.NOSE);const[M,y]=p([.58,-.5]);Yr(u,M,y,Math.max(2,Math.round(g*(s?.1:.07)*n.eye)),{glow:r})}),a("crystals")&&Xa(c,u=>[-.7+u*1.2,-.98+Math.pow(u-.45,2)*1.4]);const d=c.draw(Hn(e,n)*.55,n.round);return r&&Wn(d,i.id),d}function gg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Gn,o=t?-.05:0;c.limb([[-.35,-.35+o,.28],[-.05,-.12,.18],[-.4,-.04,.12],[-.1,0,.08]],E.BODY2,{group:2}),c.limb([[.45,-.35+o,.12],[.62,0,.08]],E.BODY2,{group:2});const l=[[-.7,-.18+o],[-.72,-.5+o],[-.4,-.8+o],[.1,-.86+o],[.5,-.74+o],[.76,-.52+o],[.8,-.36+o],[.62,-.18+o],[.1,-.08+o],[-.4,-.08+o]];c.shape(l,E.BODY,{group:1,line:!0}),c.mark([[-.5,-.3+o],[.3,-.42+o],[.8,-.38+o],[.65,-.1+o],[-.4,-.05+o]],E.BELLY,[E.BODY]),c.shape([[.18,-.78+o],[.28,-.98+o],[.48,-1+o],[.58,-.8+o]],E.BODY,{group:1}),c.limb([[-.3,-.45+o,.34],[.02,-.14,.2],[-.42,-.05,.13],[-.06,0,.09]],E.BODY,{group:6,line:!0});const h=()=>{c.limb([[.46,-.32+o,.16],[.56,-.14,.11],[.64,0,.08]],E.BODY,{group:7,line:!0});for(const u of[-.06,.64])c.shape([[u-.06,-.04],[u+.14,-.05],[u+.16,0],[u-.06,0]],E.BODY,{group:7})};c.fn(({sp:u,T:p,s:g})=>{if(g>18){const T=es(5);for(let A=0;A<40;A++){const[R,v]=p([Ue(T,-.65,.55),Ue(T,-.8,-.35)+o]);u.m[v*u.w+R]===E.BODY&&u.g[v*u.w+R]===1&&(u.m[v*u.w+R]=E.BODY3,g>50&&u.recolour(R+1,v-1,E.BELLY))}}const[_,m]=p([.79,-.4+o]),[f]=p([.35,0]);for(let T=f;T<=_;T++)u.recolour(T,m+Math.round((_-T)*.08),E.LINE);const[M,y]=p([.42,-.88+o]),S=Math.max(2,Math.round(g*(s?.17:.13)*n.eye));if(Qi(u,M,y,S,r),S>=4)for(let T=-Math.floor(S/2)+1;T<Math.floor(S/2);T++)u.px(M+T,y,E.EYE)}),h(),a("crown")&&sc(c,[.38,-1+o],.5,.32);const d=c.draw(Hn(e,n)*.5,n.round);return r&&Wn(d,i.id),d}function _g(i,e,t,n){const r=e===2,s=e===1,a=p=>r&&i.legend.includes(p),c=new Gn,o=t?.02:0;a("wings")&&qr(c,[.05,-.72],r,t,-1);for(const[p,g,_]of[[-.02,2,E.BODY3],[.1,7,E.NOSE]]){const m=t&&g===7?-.04:0;c.limb([[p,-.32,.07],[p+.04,-.02+m,.05]],_,{group:g}),c.shape([[p-.1,-.04+m],[p+.2,-.05+m],[p+.2,0+m],[p-.1,0+m]],_,{group:g})}c.shape(gt([[-.25,-.48+o],[-.95,-.3],[-1,-.2],[-.25,-.3]],1,2,3,.04,1),E.BODY2,{group:3,line:!0}),c.shape([[.38,-.78+o],[.42,-.52],[.18,-.3],[-.25,-.3],[-.48,-.45],[-.2,-.72+o]],E.BODY,{group:1,line:!0});const l=s?.21:.17,h=[.45,-.86+o];c.shape(gt([C(h,[-l*.9,0]),C(h,[-l*.4,-l*.95]),C(h,[l*.5,-l*.85]),C(h,[l*.95,-l*.1]),C(h,[l*.6,l*.9]),C(h,[-l*.2,l*1.6]),C(h,[-l*.8,l*1.2])],4,6,3,.03,1),E.BODY,{group:1});const d=s?.28:.38;c.shape([C(h,[l*.6,-l*.45]),C(h,[l+d*.6,-l*.45]),C(h,[l+d,-l*.05]),C(h,[l+d*.95,l*.15]),C(h,[l+d*.4,l*.2]),C(h,[l*.6,l*.35])],E.NOSE,{group:8,line:!0}),a("wings")||c.shape(gt([[.28,-.72+o],[-.1,-.42],[-.75,-.3],[-.75,-.36],[-.2,-.66+o]],1,3,4,.04,1),E.BODY2,{group:4,line:!0}),c.fn(({sp:p,T:g,s:_})=>{const[m,f]=g(C(h,[l*.35,-l*.2]));if(Yr(p,m,f,Math.max(2,Math.round(_*(s?.1:.07)*n.eye)),{glow:r}),_>30){const[M,y]=g(C(h,[l*.1,-l*.7]));p.recolour(M,y,E.BELLY),p.recolour(M+1,y,E.BELLY)}}),a("eyesRing")&&c.fn(({sp:p,T:g,s:_})=>{const m=Math.max(3,Math.round(_*.09));for(let f=0;f<5;f++){const M=Math.PI*(1.15+f*.17),[y,S]=g(C(h,[Math.cos(M)*.55-.15,Math.sin(M)*.5+.05]));Qi(p,y,S,m,!0,!0)}}),a("wings")&&qr(c,[-.02,-.66],r,t,1);const u=c.draw(Hn(e,n)*.6,n.round);return r&&Wn(u,i.id),u}function xg(i,e,t,n){const r=e===2,s=e===1,a=_=>r&&i.legend.includes(_),c=new Gn,o=a("wingsBig")?1.5:s?.85:1,l=t===0,h=-.25;for(const _ of[-1,1]){const m=(R,v)=>[_*R*o,v+h],f=m(.12/o,-.62),M=l?m(.55,-1):m(.6,-.62),y=l?[m(1,-.95),m(1.05,-.62),m(.8,-.32)]:[m(1.05,-.45),m(.9,-.18),m(.6,-.02)],S=m(.12/o,-.38),T=[f,M,y[0]];for(let R=1;R<y.length;R++)T.push(Ke(Ke(y[R-1],y[R],.5),M,.22),y[R]);T.push(Ke(Ke(y[2],S,.5),M,.1),S);const A=a("wingsBig")?E.MAGIC:E.BODY2;c.shape(_<0?T.slice().reverse():T,A,{group:10+(_>0?1:0),line:!0,extra:!0,depth:2});for(const R of y)c.limb([[...M,.05],[...R,.02]],a("wingsBig")?E.MAGIC2:E.BODY3,{group:12,extra:!0});c.limb([[...f,.07],[...M,.05]],a("wingsBig")?E.MAGIC2:E.BODY3,{group:12,extra:!0})}const d=[0,-.5+h];c.shape(gt([C(d,[0,-.25]),C(d,[.17,-.12]),C(d,[.16,.15]),C(d,[0,.28]),C(d,[-.16,.15]),C(d,[-.17,-.12])],2,5,3,.03,1),E.BODY,{group:1,line:!0});const u=[0,-.82+h],p=s?.17:.14;for(const _ of[-1,1])c.shape([C(u,[_*p*.3,-p*.6]),C(u,[_*p*1.05,-p*2.3]),C(u,[_*p*1.2,-p*.3])],E.BODY,{group:2,line:!0}),c.mark([C(u,[_*p*.55,-p*.7]),C(u,[_*p*1,-p*1.9]),C(u,[_*p*1,-p*.5])],E.EAR,[E.BODY]);c.shape([C(u,[0,-p]),C(u,[p,-p*.3]),C(u,[p*.7,p*.8]),C(u,[0,p]),C(u,[-p*.7,p*.8]),C(u,[-p,-p*.3])],E.BODY,{group:1}),c.fn(({sp:_,T:m,s:f})=>{for(const S of[-1,1]){const[T,A]=m(C(u,[S*p*.42,-p*.1]));f*p>7?Qi(_,T,A,Math.max(2,Math.round(f*p*.4*n.eye)),r):_.px(T,A,E.EYE)}const[M,y]=m(C(u,[0,p*.45]));_.recolour(M,y,E.NOSE),_.recolour(M-1,y,E.NOSE),f>30&&(_.recolour(M-2,y+2,E.GLINT),_.recolour(M+1,y+2,E.GLINT))});for(const _ of[-1,1])c.limb([[_*.08,-.28+h,.05],[_*.1,-.18+h,.04]],E.BODY3,{group:3});const g=c.draw(Hn(e,n)*.45,n.round);return r&&Wn(g,i.id),g}function vg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Gn,o=t?.03:0;c.limb([[-.5,-.25,.14],[-.48,0,.1]],E.SKIN,{group:2}),c.limb([[-.7,-.3,.08],[-.85,-.2,.05]],E.SKIN,{group:2});const l=s?.22:.32;c.shape([[-.75,-.12],[-.82,-.5],[-.45,-.95],[.15,-1],[.55,-.8],[.8,-.55],[.8,-.35],[.55,-.2],[0,-.08]],E.BODY,{group:1,line:!0}),c.shape([[.7,-.58],[.8+l,-.5],[.84+l,-.42],[.8+l,-.36],[.72,-.36]],E.SKIN,{group:4,line:!0}),c.mark([[-.6,-.85],[.3,-.98],[.5,-.8],[-.3,-.72]],E.BODY2,[E.BODY]);const h=(u,p,g)=>{c.limb([[u-.05,-.4,.14],[u+.02,-.16-o,.11]],p,{group:g,line:!0}),c.shape([[u-.06,-.2-o],[u+.12,-.22-o],[u+.2,-.08-o],[u+.06,-.03],[u-.08,-.06]],E.SKIN,{group:g,line:!0});for(let _=0;_<4;_++)c.limb([[u+.08+_*.045,-.08-o*(_%2),.035],[u+.14+_*.05,0,.015]],E.ACCENT,{group:g+1,line:!0,extra:!0})};h(.25,E.BODY2,5),h(.45,E.BODY,7),c.fn(({sp:u,T:p,s:g})=>{const[_,m]=p([.62,-.62]);u.px(_,m,r?E.MAGIC2:E.EYE),g>40&&u.px(_-1,m,r?E.MAGIC:E.EYE);const[f,M]=p([.84+l,-.45]);u.recolour(f,M,E.NOSE),u.recolour(f,M+1,E.NOSE)}),a("crown")&&sc(c,[.25,-.98],.42,.3);const d=c.draw(Hn(e,n)*.45,n.round);return r&&Wn(d,i.id),d}function Mg(i,e,t,n){const r=e===2,s=p=>r&&i.legend.includes(p),a=new Gn,c=(p,g,_,m,f)=>{const M=(_+(g>0?1:0)+t)%2?.06:-.06,y=[p,-.3],S=[p+g*0+M+(_-1)*.1,-.42],T=[p+M*1.5+(_-1)*.22,0];a.limb([[...y,.07],[...S,.06],[...T,.03]],m,{group:f,line:!0})};for(let p=0;p<3;p++)c(-.3+p*.35,-1,p,E.BODY3,2);const o=[.3,.55,.8][e]*(s("horn")?1.3:1),l=s("horn")?E.MAGIC:E.BODY2,h=[.62,-.5],d=(p,g,_)=>{const m=C(h,[.12,p]),f=C(m,[o*.9,-o*.45]),M=C(m,[o*1.05,-o*.2]);a.limb([[...m,.1],[...C(m,[o*.45,-o*.4]),.085],[...f,.06],[...M,.02]],g,{group:_,line:!0,extra:!0,capEnd:.5}),a.limb([[...C(m,[o*.5,-o*.4]),.05],[...C(m,[o*.62,-o*.18]),.015]],g,{group:_,line:!0,extra:!0})};d(-.02,s("horn")?E.MAGIC:E.BODY3,3),a.shape([[-.8,-.25],[-.78,-.6],[-.35,-.85],[.12,-.8],[.3,-.58],[.25,-.28],[-.3,-.18]],E.BODY,{group:1,line:!0}),a.mark([[-.65,-.65],[-.3,-.8],[.05,-.76],[-.2,-.68]],E.BELLY,[E.BODY]),a.shape([[.22,-.68],[.48,-.7],[.58,-.5],[.5,-.3],[.24,-.3]],E.BODY,{group:4,line:!0}),a.shape([[.5,-.62],[.72,-.6],[.78,-.45],[.68,-.36],[.5,-.4]],E.BODY2,{group:5,line:!0}),d(.04,l,6),a.limb([[.7,-.6,.025],[.78,-.75,.02],[.9,-.72,.02]],E.BODY3,{group:9,extra:!0});for(let p=0;p<3;p++)c(-.2+p*.35,1,p,E.BODY2,7);a.fn(({sp:p,T:g,s:_})=>{const[m,f]=g([-.78,-.42]),[M,y]=g([.28,-.5]);if(_>25)for(let A=m+2;A<M-2;A++)p.recolour(A,Math.round(f+(y-f)*(A-m)/(M-m))-Math.round(Math.sin((A-m)/(M-m)*Math.PI)*_*.12),E.LINE);const[S,T]=g([.66,-.52]);p.px(S,T,r?E.MAGIC2:E.GLINT)}),s("crystals")&&Xa(a,p=>[-.7+p*.9,-.82+Math.pow(p-.5,2)*.8]);const u=a.draw(Hn(e,n)*.4,n.round);return r&&Wn(u,i.id),u}function Sg(i,e,t,n){const r=e===2,s=e===1,a=m=>r&&i.legend.includes(m),c=new Gn,o=t?-.02:0,l=s?.52:.5,h=s?.4:.34,d=(s?-1.02:-1.1)+o;a("wings")&&il(c,-1,t);for(const[m,f]of[[-.12,E.ACCENT],[.14,E.ACCENT]]){const M=t&&m>0?-.03:0;c.limb([[m,-.2,.12],[m+.02,-.05+M,.09]],E.BODY2,{group:2}),c.shape([[m-.07,-.06+M],[m+.1,-.07+M],[m+.16,0+M],[m+.1,0+M],[m-.08,0+M]],f,{group:2})}c.shape([[-.3,-.4],[-.48,-.12],[-.4,-.05],[-.18,-.2]],E.BODY2,{group:3,line:!0});const u=[[0,-1+o],[l*.85,-.85+o],[l*1.02,-.5],[l*.8,-.16],[0,-.12],[-l*.85,-.2],[-l*1.02,-.55],[-l*.8,-.88+o]];c.shape(u,E.BODY,{group:1,line:!0}),c.mark([[0,-.9+o],[l*.7,-.75],[l*.75,-.35],[l*.3,-.15],[-l*.2,-.18],[-l*.45,-.5],[-l*.3,-.85]],E.BELLY,[E.BODY]),c.fn(({sp:m,T:f,s:M})=>{if(M<18)return;const[y,S]=f([-l*.3,-.85]),[T,A]=f([l*.7,-.25]),R=Math.max(3,Math.round(M*.09));for(let v=S+R;v<A;v+=R)for(let w=y;w<T;w+=R){const P=(v/R|0)%2?R>>1:0;m.recolour(w+P,v,m.get(w+P,v)===E.BELLY?E.BODY2:m.get(w+P,v)),M>40&&m.recolour(w+P,v+1,m.get(w+P,v+1)===E.BELLY?E.BODY2:m.get(w+P,v+1))}}),a("wings")||c.shape(gt([[-l*.55,-.88+o],[-l*.05,-.78+o],[l*.15,-.45],[-l*.1,-.15],[-l*.45,-.1],[-l*.85,-.35],[-l*.95,-.7]],2,6,s?4:6,.045,1),E.BODY2,{group:4,line:!0}),c.fn(({sp:m,T:f,s:M})=>{if(!(M<18||a("wings")))for(const[y,S]of[[-.35,-.6],[-.15,-.5],[-.5,-.45],[-.3,-.35],[-.6,-.3]]){const[T,A]=f([y*l/.5,S]);m.recolour(T,A,E.BODY3),m.recolour(T+1,A,E.BODY3)}}),c.shape([[0,d-h*.82],[h*.95,d-h*.72],[h*1.2,d-h*.05],[h*.9,d+h*.6],[0,d+h*.78],[-h*.9,d+h*.6],[-h*1.2,d-h*.05],[-h*.95,d-h*.72]],E.BODY,{group:1});for(const m of[-1,1])c.shape(gt([[m*h*.5,d-h*.78],[m*h*1.05,d-h*1.25],[m*h*1.12,d-h*1.32],[m*h*1,d-h*.6]],0,1,2,.05,-m),E.BODY2,{group:5,line:!0});const p=h*.22,g=m=>m<0?.68:1.08;for(const m of[-1,1])c.mark([[p+m*h*.05,d-h*.55],[p+m*h*.7*g(m),d-h*.62],[p+m*h*.98*g(m),d-h*.05],[p+m*h*.68*g(m),d+h*.5],[p+m*h*.05,d+h*.4]],E.BELLY,[E.BODY]);c.fn(({sp:m,T:f,s:M})=>{const y=Math.max(2,Math.round(h*M*(s?.55:.45)*n.eye));for(const v of[-1,1]){const[w,P]=f([p+v*h*.45*g(v),d-h*.18]),U=Math.max(2,Math.round(y*(v<0?.8:1)));Qi(m,w,P,U,r)}const[S,T]=f([p+h*.05,d+h*.05]),A=Math.max(2,Math.round(h*M*.32)),R=Math.max(1,Math.round(A*.4));for(let v=0;v<A;v++)for(let w=-R;w<=R;w++)Math.abs(w)<=R*(1-v/A)+.3&&m.px(S+w,T+v,v===A-1||w===R?E.BODY3:E.ACCENT,w/(R+1)*.5,-.2,.85)}),a("eyesRing")&&c.fn(({sp:m,T:f,s:M})=>{const y=Math.max(3,Math.round(M*.1));for(let S=0;S<7;S++){const T=Math.PI*(1.1+S/6*.8),[A,R]=f([Math.cos(T)*h*2,d-h*.3+Math.sin(T)*h*1.6]);Qi(m,A,R,y,!0,!0)}}),a("wings")&&il(c,1,t);const _=c.draw(Hn(e,n),n.round);return r&&Wn(_,i.id),_}function Qi(i,e,t,n,r,s=!1){const a=n/2;for(let c=-Math.ceil(a);c<=Math.ceil(a);c++)for(let o=-Math.ceil(a);o<=Math.ceil(a);o++){const l=Math.hypot(o,c)/a;if(l>1.05)continue;const h=l>.82,d=s?l<.45?E.EYE:h?E.MAGIC:E.MAGIC2:h&&a>=2?E.NOSE:l<.5?E.EYE:r?E.MAGIC2:E.IRIS;i.px(e+o,t+c,d,o/(a+1)*.4,c/(a+1)*.4,.9)}s||i.px(e+Math.round(a*.35),t-Math.round(a*.35),E.GLINT)}function il(i,e,t){const n=e,r=t?-.08:0,s=e<0;rc(i,{sh:[.3*n,-.85],wrist:[1*n,-1.38+r],tip:[1.6*n,-1.55+r*1.5],d0:[.15*n,1],d1:[.9*n,.55],l0:.42,l1:.72,mat:s?E.BODY2:E.MAGIC,light:s?E.MAGIC:E.MAGIC2,group:s?40:50})}const Eg=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:4},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Cloak hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0}];function bg(){const i={};return Eg.forEach(e=>i[e.k]=e.v),i}const zs=[".........HH.........","........HHHH........",".......HHHHHH.......","......HHHHHHHH......","....HHHHHHHHHHHH....","........SSS.........",".......SSESS........",".......hSSSS........","......hCCCC.........",".....hhCCCCC........",".....h.CCCCCC.......",".......CCCCCCC......",".......CCCCCCCC.....","TTTT.BBBBBBBBBBBBBBB","TTTTTBBBBBBBBBBBBBBB","TTTT......CC.CC....."];function yg(){const i=new Ft(zs[0].length,zs.length),e={H:E.CLOTH,S:E.SKIN,E:E.EYE,h:E.HAIR,C:E.CLOTH,B:E.BROOM,T:E.STRAW};return zs.forEach((t,n)=>[...t].forEach((r,s)=>e[r]&&i.put(s,n,e[r]))),i}const Tg=i=>({[E.CLOTH]:ut(i.cloakHue,.55,.6),[E.SKIN]:[240,205,170],[E.EYE]:[20,14,26],[E.HAIR]:ut(i.hairHue,.7,.85),[E.BROOM]:ut(i.trunkHue+.02,.55,.6),[E.STRAW]:[230,190,100]}),Ag=["wBroad","wFir","wWillow","wBirch","wPalm","wFlat"];function wg(i,e){const t=er[e],n=i.areaContrast,r={...i,leafHue:i.leafHue+t.leafHue*(n/.6),leafVariety:i.leafVariety*.5};for(const s of Ag)r[s]=t.trees.includes(s)?i[s]+n*2:i[s]*(1-n*.8);return r}function Bg(i,e,t,n,r){const s=wg(i,t),a=(o,l)=>Xr(o,l,i,i.outline,r),c=[];for(let o=0;o<La;o++){const l=Bi(e*13+t*101+o*7+1),h=ng(l,s),d=h(l,s,i.treeSize*n*Ue(l,.85,1.15)),u=ec(l,s,h),p=ig(d);c.push(a(p.bot,u),a(p.top,u))}for(let o=0;o<cl;o++){const l=rg(Bi(e*7+t*31+o*3),{...s,bushSize:i.bushSize*n});c.push(a(l.sp,l.colours))}return c}const Rg=(i,e)=>i*2+(e?1:0),Cg=i=>La*2+i;function Pg(i,e,t){const n=[];for(let r=0;r<3;r++)for(let s=0;s<2;s++)n.push(Xr(ag(e,r,s,i),sg(e,i),i,i.cOutline,t));return n}const Lg=(i,e)=>i*2+e;function rl(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Ca(i,e=2048){const n=[];let r=0,s=0,a=0,c=1;for(const u of i)r+u.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),c=Math.max(c,r);const o=Math.max(1,s+a),l=new Uint8Array(c*o*4),h=new Uint8Array(c*o*4),d=i.map((u,p)=>{const g=n[p],_=rl(u.A,u.w,u.h),m=rl(u.N,u.w,u.h);for(let f=0;f<u.h;f++){const M=f*u.w*4,y=((g.y+f)*c+g.x)*4;l.set(_.subarray(M,M+u.w*4),y),h.set(m.subarray(M,M+u.w*4),y)}return{uv:[g.x/c,g.y/o,(g.x+u.w)/c,(g.y+u.h)/o],w:u.w,h:u.h}});return{albedo:l,normal:h,width:c,height:o,frames:d}}function Dg(i,e){return i.kind==="type"?Ca(Bg(i.style,i.seed,i.id,i.K,e)):Ca(Pg(i.style,i.id,e),1024)}function sl(i,e,t){const n=new Wr(i,e,t,Zt,Ht);return n.magFilter=Et,n.minFilter=Et,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=un,n.needsUpdate=!0,n}function ac(i){return{albedo:sl(i.albedo,i.width,i.height),normal:sl(i.normal,i.width,i.height),frames:i.frames}}const al=(i,e=2048)=>ac(Ca(i,e));class Ig{constructor(e,t,n){if(this.style=e,this.seed=t,this.K=2/n,this.witch=al([Xr(yg(),Tg(e),e,"dark")]),this.stones=al([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let s=0;s<r;s++){const a=new Worker(new URL(""+new URL("artWorker-BzSASWEQ.js",import.meta.url).href,import.meta.url),{type:"module"}),c={w:a,busy:!1};a.onmessage=o=>{c.busy=!1,c.job=void 0,this.receive(o.data),this.dispatch()},a.onerror=()=>{this.useWorkers=!1,c.job&&this.queue.unshift(c.job),c.busy=!1,c.job=void 0},this.workers.push(c)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;stone(e){const t=Bi(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new Ft(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,E.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,E.BODY2,{round:this.style.round,onlyOn:new Set([E.BODY]),density:.5,seed:e}),Xr(s,{[E.BODY]:[178,174,162],[E.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.px){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=ac(e.px);e.job.kind==="type"?this.types.set(e.job.id,{atlas:t,treeFrame:Rg,bushFrame:Cg}):this.creatures.set(e.job.id,{atlas:t,frame:Lg}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,px:Dg(r,(s,a)=>{const c=document.createElement("canvas");return c.width=s,c.height=a,c})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const kt={uAmb:{value:new H},uMoon:{value:new H},uMoonDir:{value:new H(-.45,.75,.5).normalize()},uMoonBeam:{value:new H},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new H},uGlowRgb:{value:new H},uGlowR:{value:8},uGlowPower:{value:1.4}};function Ng(i,e,t){const n=(r,s)=>new H(r[0]/255*s,r[1]/255*s,r[2]/255*s);kt.uAmb.value.copy(n(ut(i.ambientHue,.55,1),i.ambient)),kt.uMoon.value.copy(n(ut(i.moonHue,.35,1),i.moon)),kt.uMoonBeam.value.copy(n(ut(i.moonHue,.35,1),i.shafts*.25)),kt.uBands.value=i.bands,kt.uDither.value=i.dither*.5,kt.uShafts.value=i.shafts,kt.uShaftScale.value=t*2,kt.uGlowRgb.value.copy(n(ut(i.glowHue,i.glowSat,1),1)),kt.uGlowR.value=e,kt.uGlowPower.value=i.glowPower}const oc=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower;

float lightStep(float f) {
  float q = f * uBands;
  float fr = fract(q);
  if (uDither > 0.0 && abs(fr - 0.5) < uDither * 0.5) q += mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.5 : -0.5;
  return max(0.0, floor(q)) / uBands;
}

// N: world normal; P: world position. Returns the light falling on that pixel.
vec3 nightLight(vec3 N, vec3 P) {
  vec3 l = uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)));
  if (uShafts > 0.0) {
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
`,$n=2,At=32,Ug=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Fg=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform float uTypeHue[32];
uniform float uGroundHue, uGroundVal, uSat, uContrast;
uniform vec3 uFloor; // dancefloor x, z, radius
varying vec3 vWorld;
${oc}
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
  float gh = uGroundHue + (area.a > 0.5 ? uTypeHue[t] * uContrast / 0.6 : 0.0);
  float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
  vec3 c = hsv(gh, 0.5 * uSat, uGroundVal);
  if (v < 0.38) c = hsv(gh + 0.04, 0.55 * uSat, uGroundVal * 0.8);
  else if (v > 0.66) c = hsv(gh - 0.03, 0.45 * uSat, uGroundVal * 1.15);
  else if (hash(px * 0.37) < 0.04) c = hsv(gh + 0.1, 0.3 * uSat, uGroundVal * 0.9);
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The dancefloor: a worn ring of pale stones.
  float r = length(p - uFloor.xy);
  if (r < uFloor.z) c = mix(c, vec3(0.42, 0.42, 0.38), 0.25);
  if (abs(r - uFloor.z) < uPixel * 1.5 && hash(px * 0.71) < 0.8) c = vec3(150.0, 150.0, 135.0) / 255.0;
  gl_FragColor = vec4(min(vec3(1.0), c * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 1.25), 1.0);
}
`;class Og{constructor(e,t,n){this.map=e;const r=e.extent,s=r.maxX-r.minX,a=r.maxZ-r.minZ,c=Math.ceil(s*$n/At)*At,o=Math.ceil(a*$n/At)*At;this.tilesX=c/At,this.tilesZ=o/At,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const l=p=>(p.magFilter=p.minFilter=Et,p.generateMipmaps=!1,p.colorSpace=un,p.needsUpdate=!0,p);this.texture=l(new Wr(new Uint8Array(c*o*4),c,o)),l(this.tile);const h=new Array(32).fill(0);er.forEach((p,g)=>h[g]=p.groundHue);const d=new Wt({vertexShader:Ug,fragmentShader:Fg,uniforms:{...kt,uAreas:{value:this.texture},uExtent:{value:new mt(r.minX,r.minZ,c/$n,o/$n)},uPixel:{value:n},uTypeHue:{value:h},uGroundHue:{value:t.groundHue},uGroundVal:{value:t.groundVal},uSat:{value:t.sat},uContrast:{value:t.areaContrast},uFloor:{value:new H(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)}}}),u=new ai(s+400,a+400);u.rotateX(-Math.PI/2),this.mesh=new $t(u,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Wr(new Uint8Array(At*At*4),At,At);filled;tilesX;tilesZ;initialised=!1;fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),this.initialised=!0);const a=this.map.extent,c=At/$n,o=(t-a.minX)/c,l=(n-a.minZ)/c,h=Math.ceil(r/c),d=[];for(let g=Math.max(0,Math.floor(l)-h);g<=Math.min(this.tilesZ-1,Math.floor(l)+h);g++)for(let _=Math.max(0,Math.floor(o)-h);_<=Math.min(this.tilesX-1,Math.floor(o)+h);_++)this.filled[g*this.tilesX+_]||d.push([_,g,(_+.5-o)**2+(g+.5-l)**2]);d.sort((g,_)=>g[2]-_[2]);const u=performance.now();let p=0;for(const[g,_]of d){if(p>0&&performance.now()-u>s)break;this.fillTile(e,g,_),p++}return d.length-p}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data;for(let a=0;a<At;a++)for(let c=0;c<At;c++){const o=r.minX+(t*At+c+.5)/$n,l=r.minZ+(n*At+a+.5)/$n,h=this.map.areaAt(o,l),d=(a*At+c)*4;s[d]=h.type,s[d+1]=Math.round(h.openness*255),s[d+2]=0,s[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new tt(t*At,n*At)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const bi={uRight:{value:new H(1,0,0)},uUp:{value:new H(0,1,0)},uFacing:{value:new H(0,0,1)},uTopFade:{value:0}},zg=`
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
`,kg=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${oc}
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
  if (uUnlit > 0.5 || a.a < 0.999) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), 1.0);
}
`;class Rr{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new ai(1,1);r.translate(0,.5,0),this.geo=new Xh,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Wt({vertexShader:zg,fragmentShader:kg,uniforms:{...kt,...bi,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new $t(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,s)=>{const a=new Nh(new Float32Array(t*r),r);return a.setUsage(oh),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,c)=>{t[c*3]=a.x,t[c*3+1]=a.y,t[c*3+2]=a.z,n[c*2]=a.frame.w*this.metresPerPixel,n[c*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,c*4),s[c*2]=a.flip?1:0,s[c*2+1]=a.top?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class Hg{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new Y0({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=$i,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new qt(r.camera.fov,1,.5,600),this.scene.background=new it(723478),Ng(n,r.glowReach,this.mpp),this.assets=new Ig(n,t.seed,r.pixelSize),this.ground=new Og(t.map,n,this.mpp),this.scene.add(this.ground.mesh),this.witchBatch=new Rr(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new Rr(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,a=[];for(let o=0;o<9;o++){const l=o/9*Math.PI*2+.3;a.push({x:s.x+Math.cos(l)*s.radius,y:0,z:s.z+Math.sin(l)*s.radius,frame:this.assets.stones.frames[o%4],flip:o%2===0})}this.stoneBatch.set(a);const c=new Wt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new $t(new ai(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Ah;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,z:1/0,version:-1};prefetch=!1;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n)),this.renderer.setSize(this.width,this.height,!1),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.refresh(!0),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.prefetch=!0,this.refresh(!0)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}refresh(e=!1){const t=this.game,n=t.camera,r=t.tuning.drawRadius,s=n.tx,a=n.tz-r*.25;if(!e&&Math.hypot(s-this.lastBuild.x,a-this.lastBuild.z)<6&&this.assets.version===this.lastBuild.version)return;this.lastBuild={x:s,z:a,version:this.assets.version};const c=new Map,o=(_,m)=>{let f=c.get(_);f||c.set(_,f=[]),f.push(m)},l=t.map.areaSize,h=r+l*1.5;if(this.prefetch)for(let _=Math.floor((a-h)/l);_<=Math.floor((a+h)/l);_++)for(let m=Math.floor((s-h)/l);m<=Math.floor((s+h)/l);m++)this.assets.prefetchType(t.map.typeOf(m,_));const d=t.forest.treesNear(s,a,r),u=t.forest.bushesNear(s,a,r*.8);let p=0,g=0;for(const _ of d){const m=this.assets.typeArt(_.type);if(!m)continue;const f=m.atlas.frames;o(_.type,{x:_.x,y:0,z:_.z,frame:f[m.treeFrame(_.variant,!1)],flip:_.flip}),o(_.type,{x:_.x,y:0,z:_.z,frame:f[m.treeFrame(_.variant,!0)],flip:_.flip,top:!0}),p++}for(const _ of u){const m=this.assets.typeArt(_.type);m&&(o(_.type,{x:_.x,y:0,z:_.z,frame:m.atlas.frames[m.bushFrame(_.variant)],flip:_.flip}),g++)}for(const[_,m]of this.typeBatches)c.has(_)||m.set([]);for(const[_,m]of c)this.batchFor(this.typeBatches,_,()=>{const M=this.assets.typeArt(_);return M&&new Rr(M.atlas,this.mpp)})?.set(m);this.stats.trees=p,this.stats.bushes=g}drawCreatures(){const e=this.game,t=e.camera,n=e.tuning.drawRadius,r=new Map;let s=0;for(const a of e.creatures){if(Math.abs(a.x-t.tx)>n||Math.abs(a.z-t.tz)>n)continue;const c=this.assets.creatureArt(a.species);if(!c)continue;const o=c.atlas.frames[c.frame(a.level,a.moving?Math.floor(a.walk)%2:0)];let l=r.get(a.species);l||r.set(a.species,l=[]),l.push({x:a.x,y:0,z:a.z,frame:o,flip:a.facing<0}),s++}for(const[a,c]of this.creatureBatches)r.has(a)||c.set([]);for(const[a,c]of r)this.batchFor(this.creatureBatches,a,()=>{const l=this.assets.creatureArt(a);return l&&new Rr(l.atlas,this.mpp)})?.set(c);this.stats.creatures=s}render(e){const t=this.game,n=t.tuning,r=Hc(t),s=r.angle*Math.PI/180,a=2*r.distance*Math.tan(n.camera.fov*Math.PI/360)/this.height,c=new H(0,Math.cos(s),-Math.sin(s)),o=new H(r.tx,r.ty,r.tz),l=o.dot(c),h=o.x;o.addScaledVector(c,Math.round(l/a)*a-l),o.x+=Math.round(h/a)*a-h;const d=new H(0,Math.sin(s),Math.cos(s)).multiplyScalar(r.distance);this.camera.position.copy(o).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(o);const u=n.spriteTilt;bi.uUp.value.set(0,1,0).lerp(c,u).normalize(),bi.uFacing.value.crossVectors(bi.uRight.value,bi.uUp.value).normalize(),bi.uTopFade.value=io(t.witch);const p=t.witch,g=Da(p,n);kt.uGlowPos.value.set(p.x,g+n.glowHeight,p.z);const _=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:p.x,y:g+_-.4,z:p.z,frame:this.assets.witch.frames[0],flip:p.facing<0}]),this.shadow.position.set(p.x,.03,p.z),this.shadow.scale.setScalar(1-.5*io(p)),this.refresh(),this.drawCreatures(),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,r.tx,r.tz-10,n.drawRadius+20,3),this.stats.pendingArt=this.assets.pending,this.renderer.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const Gg="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Wg="Lab default",Vg={},Xg={_readme:Gg,name:Wg,style:Vg};function Yg(i=Xg){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=bg();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function qg(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,c=0;const o=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",u=>{if(!(u.pointerType==="mouse"||s!==null)){o(),s=u.pointerId,a=u.clientX,c=u.clientY,t.style.left=a+"px",t.style.top=c+"px",t.classList.add("on");try{l.setPointerCapture(u.pointerId)}catch{}u.preventDefault()}}),l.addEventListener("pointermove",u=>{if(u.pointerId!==s)return;let p=u.clientX-a,g=u.clientY-c;const _=Math.hypot(p,g);_>r&&(p*=r/_,g*=r/_),n.style.transform=`translate(${p}px, ${g}px)`;const m=Math.min(1,_/r),f=.15,M=m<f?0:(m-f)/(1-f)/Math.max(1e-6,m);e.x=p/r*M,e.y=g/r*M});const h=u=>{u.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h);const d=(u,p)=>{const g=i.querySelector(u);g.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),p(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",u=>{o(),u.touches.length===3&&(e.debug=!0)},{passive:!0})}const Kr=new URLSearchParams(location.search);let jn=wc(Kr.get("seed"));jn===null&&(jn=Math.floor(Math.random()*1e6),Kr.set("seed",String(jn)),history.replaceState(null,"","?"+Kr.toString()+location.hash));const Tn=zc(jn,hl),Kg=document.getElementById("game"),ji=new Hg(Kg,Tn,{...Yg(),pixel:hl.pixelSize}),is=new Au;qg(document.body,is.touch);const Zg=document.getElementById("seed");Zg.innerHTML=`seed <a href="?seed=${jn}">${jn}</a>`;const Pa=document.getElementById("debug"),Ya=document.getElementById("start");let Vi=Kr.has("debug");Pa.classList.toggle("on",Vi);const lc=()=>ji.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",lc);lc();let rs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await ji.prepare(),rs=!0,Ya.classList.remove("loading")},0));let ol=null;function cc(){if(!rs||!Tn.clock.paused)return!1;try{ol??=new AudioContext,ol.resume()}catch{}return Tn.clock.paused=!1,Ya.style.display="none",is.clearPresses(),!0}is.onAny=cc;Ya.addEventListener("pointerdown",i=>{i.preventDefault(),cc()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Fr=0)});let Fr=0,ll=60,ks=0,Cr=0;function uc(i){requestAnimationFrame(uc);const e=Fr?(i-Fr)/1e3:0;Fr=i,ks++,Cr+=e,Cr>=.5&&(ll=ks/Cr,ks=0,Cr=0);const t=is.read();if(t.debug&&(Vi=!Vi,Pa.classList.toggle("on",Vi)),kc(Tn,t,e),!!rs&&(ji.render(i/1e3),Vi)){const n=Tn.witch,r=ji.stats;Pa.textContent=[`fps    ${ll.toFixed(0)}`,`seed   ${jn}`,`area   ${ul(Tn)}`,`mode   ${n.mode}`,`at     ${n.x.toFixed(0)}, ${n.z.toFixed(0)} m   zoom ${Tn.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(uc);window.witch={game:Tn,view:ji,areaUnderWitch:()=>ul(Tn),get ready(){return rs}};
