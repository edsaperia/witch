const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./landingBake-DuZduamm.js","./linkParams-CfRGUFyl.js","./mushrooms-DP3Ug9y6.js","./saveSlots-Z9oplkuS.js","./game-BwquRF4R.js","./finds-DDv5ki6C.js","./decisions-CIgjOb5z.js","./viewParams-Cn3OYuKL.js","./style-BTF5dez-.js","./mapPrep-BmY2AUNZ.js","./housePieces-C65lVGT7.js"])))=>i.map(i=>d[i]);
import{d4 as mn,d5 as ps,d6 as Xo,d7 as xr,d8 as fu,d9 as pu,aU as mu,da as Ga,db as qo,dc as Hs,h as Gh,dd as Vh,cx as Wh,cz as Xh,bR as Va,cE as qh,de as Yh,cV as $h,cC as Dr,aX as Kh,df as Al,c$ as Zh,dg as Jh,dh as ms,di as Qh,dj as jh,dk as Js,ba as ed,bJ as td,ct as nd,bL as id,bD as Es,dl as rd,dm as Wa,d3 as sd,bE as Rl,bF as Cl,dn as ad,dp as od}from"./mushrooms-DP3Ug9y6.js";import{t as ld,ag as Ts,ah as cd}from"./finds-DDv5ki6C.js";import{s as Gs,l as ud}from"./saveSlots-Z9oplkuS.js";const gu="witch.chart",Pl=(i=0)=>({world:i,found:[],won:[],played:[],voyages:[]});function Py(i){const e=(i??"").trim();if(!e)return 1+Math.floor(Math.random()*2147483646);if(/^\d+$/.test(e))return Number(e)%2147483647;let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%2147483647||1}const vu=i=>{try{return i??Gs??null}catch{return null}},Qs=i=>Array.isArray(i)?i.filter(e=>typeof e=="string"):[];function _u(i){try{const e=vu(i)?.getItem(gu);if(!e)return Pl();const t=JSON.parse(e),n=Xo,r=a=>!!mn[a]&&!xr(a),s=Number(t.world);return{world:Number.isInteger(s)&&s>=0&&s<2147483647?s:0,found:Qs(t.found).filter(r),won:Qs(t.won).filter(n),played:Qs(t.played).filter(n),voyages:(Array.isArray(t.voyages)?t.voyages:[]).filter(a=>a&&typeof a.from=="string"&&typeof a.to=="string"&&n(a.from)&&r(a.to)).map(a=>({from:a.from,to:a.to}))}}catch{return Pl()}}function hd(i,e){try{vu(e)?.setItem(gu,JSON.stringify(i))}catch{}}function Ly(i,e,t){return t?xu(i,e,{won:!1}):i}function xu(i,e,t){if(!Xo(e))return i;const n={world:i.world,found:[...i.found],won:[...i.won],played:[...i.played],voyages:[...i.voyages]};if(n.played.includes(e)||n.played.push(e),!t.won)return n;n.won.includes(e)||n.won.push(e);for(const r of t.found??[])!mn[r]||xr(r)||r===e||n.found.includes(r)||(n.found.push(r),n.voyages.push({from:e,to:r}));return n}const dd=(i,e)=>i.found.filter(t=>!xr(t)&&!i.played.includes(t)&&t!==e),fd=i=>["home",...i.found];function Dy(){const i=Object.keys(mn),e=[...i],t=e.map(n=>({from:mn[n].phase===0?"home":pd(n,i.filter(r=>mn[r].phase===mn[n].phase-1)),to:n}));return{world:0,found:e,won:["home"],played:["home",...ps],voyages:t}}function pd(i,e){const t=(n,r)=>{const s=Math.abs(((n-r)%360+360)%360);return s>180?360-s:s};return e.reduce((n,r)=>t(mn[r].bearing,mn[i].bearing)<t(mn[n].bearing,mn[i].bearing)?r:n,e[0]??"home")}function Uy(i,e,t,n){const r=_u(t);if(n!==void 0&&n!==r.world)return r;const s=xu(r,i,e);return hd(s,t),s}const md="modulepreload",gd=function(i,e){return new URL(i,e).href},Ll={},Dl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(t.map(u=>{if(u=gd(u,n),u in Ll)return;Ll[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const y=a[g];if(y.href===u&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":md,d||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((g,y)=>{p.addEventListener("load",g),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},ni=ld,vd={rise:6,turn:240,height:22,from:-45,shadow:.6,disc:!0},_d=i=>({...vd,...i.chart?.moon??{}}),Ul=i=>Math.max(0,Math.min(.6,i.chart?.edgeBand??.18));function xd(i,e){const t=Math.min(1,Math.max(0,i/Math.max(.01,e.rise))),n=t*t*(3-2*t);return{bearing:e.from+Math.max(0,i-e.rise)*360/Math.max(1,e.turn),height:-4+(e.height+4)*n,risen:n}}const Yo="186",yd=0,Il=1,Sd=2,gs=1,Md=2,fr=3,si=0,Ht=1,Zt=2,Pn=0,zi=1,rn=2,Nl=3,Fl=4,bd=5,Fi=100,wd=101,Ed=102,Td=103,Ad=104,Rd=200,Cd=201,Pd=202,Ld=203,yu=204,Su=205,Dd=206,Ud=207,Id=208,Nd=209,Fd=210,Od=211,kd=212,Bd=213,zd=214,Xa=0,qa=1,Ya=2,Xi=3,$a=4,Ka=5,Za=6,Ja=7,Mu=0,Hd=1,Gd=2,vn=0,bu=1,wu=2,Eu=3,Tu=4,Au=5,Ru=6,Cu=7,Pu=300,ai=301,qi=302,js=303,ea=304,Vs=306,As=1e3,Rn=1001,Qa=1002,_t=1003,Vd=1004,Ur=1005,st=1006,ta=1007,ri=1008,zt=1009,Lu=1010,Du=1011,yr=1012,$o=1013,_n=1014,an=1015,on=1016,Ko=1017,Zo=1018,Yi=1020,Uu=35902,Iu=35899,Nu=1021,Fu=1022,Qt=1023,Un=1026,Wn=1027,Tr=1028,Jo=1029,oi=1030,Qo=1031,jo=1033,vs=33776,_s=33777,xs=33778,ys=33779,ja=35840,eo=35841,to=35842,no=35843,io=36196,ro=37492,so=37496,ao=37488,oo=37489,Rs=37490,lo=37491,co=37808,uo=37809,ho=37810,fo=37811,po=37812,mo=37813,go=37814,vo=37815,_o=37816,xo=37817,yo=37818,So=37819,Mo=37820,bo=37821,wo=36492,Eo=36494,To=36495,Ao=36283,Ro=36284,Cs=36285,Co=36286,Wd=3200,Ol=0,Xd=1,fn="",$t="srgb",Sr="srgb-linear",Ps="linear",ot="srgb",na=7680,Iy=7681,Ny=514,Fy=517,qd=519,Yd=512,$d=513,Kd=514,el=515,Zd=516,Jd=517,tl=518,Qd=519,Ou=35044,Oy=35048,kl="300 es",gn=2e3,Mr=2001;function jd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ls(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ef(){const i=Ls("canvas");return i.style.display="block",i}const Bl={};function Ds(...i){const e="THREE."+i.shift();console.log(e,...i)}function ku(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=ku(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=ku(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Hi(...i){const e=i.join(" ");e in Bl||(Bl[e]=!0,Oe(...i))}function tf(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const nf={[Xa]:qa,[Ya]:Za,[$a]:Ja,[Xi]:Ka,[qa]:Xa,[Za]:Ya,[Ja]:$a,[Ka]:Xi};class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zl=1234567;const gr=Math.PI/180,br=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function nl(i,e){return(i%e+e)%e}function rf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function sf(i,e,t){return i!==e?(t-i)/(e-i):0}function vr(i,e,t){return(1-t)*i+t*e}function af(i,e,t,n){return vr(i,e,1-Math.exp(-t*n))}function of(i,e=1){return e-Math.abs(nl(i,e*2)-e)}function lf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function uf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function hf(i,e){return i+Math.random()*(e-i)}function df(i){return i*(.5-Math.random())}function ff(i){i!==void 0&&(zl=i);let e=zl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pf(i){return i*gr}function mf(i){return i*br}function gf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function vf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _f(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xf(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const gi={DEG2RAD:gr,RAD2DEG:br,generateUUID:Ln,clamp:Ye,euclideanModulo:nl,mapLinear:rf,inverseLerp:sf,lerp:vr,damp:af,pingpong:of,smoothstep:lf,smootherstep:cf,randInt:uf,randFloat:hf,randFloatSpread:df,seededRandom:ff,degToRad:pf,radToDeg:mf,isPowerOfTwo:gf,ceilPowerOfTwo:vf,floorPowerOfTwo:_f,setQuaternionFromProperEuler:xf,normalize:lt,denormalize:sn};class Me{static{Me.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],p=s[a+1],g=s[a+2],y=s[a+3];if(d!==y||l!==h||c!==p||u!==g){let m=l*h+c*p+u*g+d*y;m<0&&(h=-h,p=-p,g=-g,y=-y,m=-m);let f=1-o;if(m<.9995){const S=Math.acos(m),R=Math.sin(S);f=Math.sin(f*S)/R,o=Math.sin(o*S)/R,l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+y*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+y*o;const S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-o*p,e[t+2]=c*g+u*p+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),h=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{static{B.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ia.copy(this).projectOnVector(e),this.sub(ia)}reflect(e){return this.sub(ia.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ia=new B,Hl=new Zi;class ze{static{ze.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],y=r[0],m=r[3],f=r[6],S=r[1],R=r[4],v=r[7],M=r[2],w=r[5],A=r[8];return s[0]=a*y+o*S+l*M,s[3]=a*m+o*R+l*w,s[6]=a*f+o*v+l*A,s[1]=c*y+u*S+d*M,s[4]=c*m+u*R+d*w,s[7]=c*f+u*v+d*A,s[2]=h*y+p*S+g*M,s[5]=h*m+p*R+g*w,s[8]=h*f+p*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,p=c*s-a*l,g=t*d+n*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(r*c-u*n)*y,e[2]=(o*n-r*a)*y,e[3]=h*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=p*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ra.makeScale(e,t)),this}rotate(e){return Hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ra.makeRotation(-e)),this}translate(e,t){return Hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ra.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new ze,Gl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yf(){const i={enabled:!0,workingColorSpace:Sr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=Dn(r.r),r.g=Dn(r.g),r.b=Dn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===fn?Ps:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Sr]:{primaries:e,whitePoint:n,transfer:Ps,toXYZ:Gl,fromXYZ:Vl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:Gl,fromXYZ:Vl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}const Ze=yf();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class Sf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=Ls("canvas")),vi.width=e.width,vi.height=e.height;const r=vi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ls("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Dn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Dn(t[n]/255)*255):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mf=0;class il{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(sa(r[a].image)):s.push(sa(r[a]))}else s=sa(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let bf=0;const aa=new B;class Pt extends ci{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=Rn,r=Rn,s=st,a=ri,o=Qt,l=zt,c=Pt.DEFAULT_ANISOTROPY,u=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=Ln(),this.name="",this.source=new il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(aa).x}get height(){return this.source.getSize(aa).y}get depth(){return this.source.getSize(aa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case As:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case As:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Pu;Pt.DEFAULT_ANISOTROPY=1;class je{static{je.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,v=(p+1)/2,M=(f+1)/2,w=(u+h)/4,A=(d+y)/4,_=(g+m)/4;return R>v&&R>M?R<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(R),r=w/n,s=A/n):v>M?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=w/r,s=_/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=A/s,r=_/s),this.set(n,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-y)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wf extends ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:st,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new je(0,0,e,t),this.scissorTest=!1,this.viewport=new je(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Pt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:st,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new il(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xt extends wf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bu extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_t,this.minFilter=_t,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ef extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=_t,this.minFilter=_t,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class at{static{at.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m)}set(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/_i.setFromMatrixColumn(e,0).length(),s=1/_i.setFromMatrixColumn(e,1).length(),a=1/_i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,g=o*u,y=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,y=c*d;t[0]=h+y*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,y=c*d;t[0]=h-y*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*d,g=o*u,y=o*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+y,t[1]=l*d,t[5]=y*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=y-h*d,t[8]=g*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-y*d}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+y,t[5]=a*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tf,e,Af)}lookAt(e,t,n){const r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),kn.crossVectors(n,Gt),kn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),kn.crossVectors(n,Gt)),kn.normalize(),Ir.crossVectors(Gt,kn),r[0]=kn.x,r[4]=Ir.x,r[8]=Gt.x,r[1]=kn.y,r[5]=Ir.y,r[9]=Gt.y,r[2]=kn.z,r[6]=Ir.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],S=n[3],R=n[7],v=n[11],M=n[15],w=r[0],A=r[4],_=r[8],E=r[12],L=r[1],I=r[5],C=r[9],U=r[13],D=r[2],N=r[6],J=r[10],Z=r[14],ie=r[3],j=r[7],ee=r[11],ne=r[15];return s[0]=a*w+o*L+l*D+c*ie,s[4]=a*A+o*I+l*N+c*j,s[8]=a*_+o*C+l*J+c*ee,s[12]=a*E+o*U+l*Z+c*ne,s[1]=u*w+d*L+h*D+p*ie,s[5]=u*A+d*I+h*N+p*j,s[9]=u*_+d*C+h*J+p*ee,s[13]=u*E+d*U+h*Z+p*ne,s[2]=g*w+y*L+m*D+f*ie,s[6]=g*A+y*I+m*N+f*j,s[10]=g*_+y*C+m*J+f*ee,s[14]=g*E+y*U+m*Z+f*ne,s[3]=S*w+R*L+v*D+M*ie,s[7]=S*A+R*I+v*N+M*j,s[11]=S*_+R*C+v*J+M*ee,s[15]=S*E+R*U+v*Z+M*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],y=e[7],m=e[11],f=e[15],S=l*p-c*h,R=o*p-c*d,v=o*h-l*d,M=a*p-c*u,w=a*h-l*u,A=a*d-o*u;return t*(y*S-m*R+f*v)-n*(g*S-m*M+f*w)+r*(g*R-y*M+f*A)-s*(g*v-y*w+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],y=e[13],m=e[14],f=e[15],S=t*o-n*a,R=t*l-r*a,v=t*c-s*a,M=n*l-r*o,w=n*c-s*o,A=r*c-s*l,_=u*y-d*g,E=u*m-h*g,L=u*f-p*g,I=d*m-h*y,C=d*f-p*y,U=h*f-p*m,D=S*U-R*C+v*I+M*L-w*E+A*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/D;return e[0]=(o*U-l*C+c*I)*N,e[1]=(r*C-n*U-s*I)*N,e[2]=(y*A-m*w+f*M)*N,e[3]=(h*w-d*A-p*M)*N,e[4]=(l*L-a*U-c*E)*N,e[5]=(t*U-r*L+s*E)*N,e[6]=(m*v-g*A-f*R)*N,e[7]=(u*A-h*v+p*R)*N,e[8]=(a*C-o*L+c*_)*N,e[9]=(n*L-t*C-s*_)*N,e[10]=(g*w-y*v+f*S)*N,e[11]=(d*v-u*w-p*S)*N,e[12]=(o*E-a*I-l*_)*N,e[13]=(t*I-n*E+r*_)*N,e[14]=(y*R-g*M-m*S)*N,e[15]=(u*M-d*R+h*S)*N,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,p=s*u,g=s*d,y=a*u,m=a*d,f=o*d,S=l*c,R=l*u,v=l*d,M=n.x,w=n.y,A=n.z;return r[0]=(1-(y+f))*M,r[1]=(p+v)*M,r[2]=(g-R)*M,r[3]=0,r[4]=(p-v)*w,r[5]=(1-(h+f))*w,r[6]=(m+S)*w,r[7]=0,r[8]=(g+R)*A,r[9]=(m-S)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=_i.set(r[0],r[1],r[2]).length();const o=_i.set(r[4],r[5],r[6]).length(),l=_i.set(r[8],r[9],r[10]).length();s<0&&(a=-a),en.copy(this);const c=1/a,u=1/o,d=1/l;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,t.setFromRotationMatrix(en),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=gn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===gn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Mr)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=gn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===gn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===Mr)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const _i=new B,en=new at,Tf=new B(0,0,0),Af=new B(1,1,1),kn=new B,Ir=new B,Gt=new B,Wl=new at,Xl=new Zi;class li{constructor(e=0,t=0,n=0,r=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xl.setFromEuler(this),this.setFromQuaternion(Xl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class rl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Rf=0;const ql=new B,xi=new Zi,xn=new at,Nr=new B,Qi=new B,Cf=new B,Pf=new Zi,Yl=new B(1,0,0),$l=new B(0,1,0),Kl=new B(0,0,1),Zl={type:"added"},Lf={type:"removed"},yi={type:"childadded",child:null},oa={type:"childremoved",child:null};class Tt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new B,t=new li,n=new Zi,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new ze}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(Yl,e)}rotateY(e){return this.rotateOnAxis($l,e)}rotateZ(e){return this.rotateOnAxis(Kl,e)}translateOnAxis(e,t){return ql.copy(e).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yl,e)}translateY(e){return this.translateOnAxis($l,e)}translateZ(e){return this.translateOnAxis(Kl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nr.copy(e):Nr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Qi,Nr,this.up):xn.lookAt(Nr,Qi,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),xi.setFromRotationMatrix(xn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zl),yi.child=e,this.dispatchEvent(yi),yi.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lf),oa.child=e,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zl),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,e,Cf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Pf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Tt.DEFAULT_UP=new B(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oi extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Df={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Df)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function ca(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ze.workingColorSpace){if(e=nl(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ca(a,s,e+1/3),this.g=ca(a,s,e),this.b=ca(a,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=$t){function n(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=zu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Ze.workingToColorSpace(Ut.copy(this),e),Math.round(Ye(Ut.r*255,0,255))*65536+Math.round(Ye(Ut.g*255,0,255))*256+Math.round(Ye(Ut.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,r=Ut.g,s=Ut.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=$t){Ze.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,r=Ut.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(Fr);const n=vr(Bn.h,Fr.h,t),r=vr(Bn.s,Fr.s,t),s=vr(Bn.l,Fr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new ke;ke.NAMES=zu;class Po extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const tn=new B,yn=new B,ua=new B,Sn=new B,Si=new B,Mi=new B,Jl=new B,ha=new B,da=new B,fa=new B,pa=new je,ma=new je,ga=new je;class Jt{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),tn.subVectors(e,t),r.cross(tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){tn.subVectors(r,t),yn.subVectors(n,t),ua.subVectors(e,t);const a=tn.dot(tn),o=tn.dot(yn),l=tn.dot(ua),c=yn.dot(yn),u=yn.dot(ua),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return pa.setScalar(0),ma.setScalar(0),ga.setScalar(0),pa.fromBufferAttribute(e,t),ma.fromBufferAttribute(e,n),ga.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(pa,s.x),a.addScaledVector(ma,s.y),a.addScaledVector(ga,s.z),a}static isFrontFacing(e,t,n,r){return tn.subVectors(n,t),yn.subVectors(e,t),tn.cross(yn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),tn.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Jt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Si.subVectors(r,n),Mi.subVectors(s,n),ha.subVectors(e,n);const l=Si.dot(ha),c=Mi.dot(ha);if(l<=0&&c<=0)return t.copy(n);da.subVectors(e,r);const u=Si.dot(da),d=Mi.dot(da);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Si,a);fa.subVectors(e,s);const p=Si.dot(fa),g=Mi.dot(fa);if(g>=0&&p<=g)return t.copy(s);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Mi,o);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Jl.subVectors(s,r),o=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(Jl,o);const f=1/(m+y+h);return a=y*f,o=h*f,t.copy(n).addScaledVector(Si,a).addScaledVector(Mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ui{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(s,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ji),kr.subVectors(this.max,ji),bi.subVectors(e.a,ji),wi.subVectors(e.b,ji),Ei.subVectors(e.c,ji),zn.subVectors(wi,bi),Hn.subVectors(Ei,wi),$n.subVectors(bi,Ei);let t=[0,-zn.z,zn.y,0,-Hn.z,Hn.y,0,-$n.z,$n.y,zn.z,0,-zn.x,Hn.z,0,-Hn.x,$n.z,0,-$n.x,-zn.y,zn.x,0,-Hn.y,Hn.x,0,-$n.y,$n.x,0];return!va(t,bi,wi,Ei,kr)||(t=[1,0,0,0,1,0,0,0,1],!va(t,bi,wi,Ei,kr))?!1:(Br.crossVectors(zn,Hn),t=[Br.x,Br.y,Br.z],va(t,bi,wi,Ei,kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mn=[new B,new B,new B,new B,new B,new B,new B,new B],nn=new B,Or=new ui,bi=new B,wi=new B,Ei=new B,zn=new B,Hn=new B,$n=new B,ji=new B,kr=new B,Br=new B,Kn=new B;function va(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Kn.fromArray(i,s);const o=r.x*Math.abs(Kn.x)+r.y*Math.abs(Kn.y)+r.z*Math.abs(Kn.z),l=e.dot(Kn),c=t.dot(Kn),u=n.dot(Kn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Tn=Uf();function Uf(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function If(i){Math.abs(i)>65504&&Oe("DataUtils.toHalfFloat(): Value out of range."),i=Ye(i,-65504,65504),Tn.floatView[0]=i;const e=Tn.uint32View[0],t=e>>23&511;return Tn.baseTable[t]+((e&8388607)>>Tn.shiftTable[t])}function Nf(i){const e=i>>10;return Tn.uint32View[0]=Tn.mantissaTable[Tn.offsetTable[e]+(i&1023)]+Tn.exponentTable[e],Tn.floatView[0]}class Ff{static toHalfFloat(e){return If(e)}static fromHalfFloat(e){return Nf(e)}}const wt=new B,zr=new Me;let Of=0;class xt extends ci{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ou,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXY(t,zr.x,zr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Hu extends xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Gu extends xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const kf=new ui,er=new B,_a=new B;class hi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):kf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(er,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_a.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(_a)),this.expandByPoint(er.copy(e.center).sub(_a))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Bf=0;const Yt=new at,xa=new Tt,Ti=new B,Vt=new ui,tr=new ui,Ct=new B;class St extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jd(e)?Gu:Hu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Vt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(Vt.min,tr.min),Vt.expandByPoint(Ct),Ct.addVectors(Vt.max,tr.max),Vt.expandByPoint(Ct)):(Vt.expandByPoint(tr.min),Vt.expandByPoint(tr.max))}Vt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ct.fromBufferAttribute(o,c),l&&(Ti.fromBufferAttribute(e,c),Ct.add(Ti)),r=Math.max(r,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new B,l[_]=new B;const c=new B,u=new B,d=new B,h=new Me,p=new Me,g=new Me,y=new B,m=new B;function f(_,E,L){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,L),h.fromBufferAttribute(s,_),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,L),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(I),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(I),o[_].add(y),o[E].add(y),o[L].add(y),l[_].add(m),l[E].add(m),l[L].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,E=S.length;_<E;++_){const L=S[_],I=L.start,C=L.count;for(let U=I,D=I+C;U<D;U+=3)f(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const R=new B,v=new B,M=new B,w=new B;function A(_){M.fromBufferAttribute(r,_),w.copy(M);const E=o[_];R.copy(E),R.sub(M.multiplyScalar(M.dot(E))).normalize(),v.crossVectors(w,E);const I=v.dot(l[_])<0?-1:1;a.setXYZW(_,R.x,R.y,R.z,I)}for(let _=0,E=S.length;_<E;++_){const L=S[_],I=L.start,C=L.count;for(let U=I,D=I+C;U<D;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new xt(h,u,d)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ou,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Nt=new B;class Us{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Ds("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Us(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ds("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ya=new B,Hf=new B,Gf=new ze;class En{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ya.subVectors(n,t).cross(Hf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(ya),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Gf.getNormalMatrix(e),r=this.coplanarPoint(ya).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Vf=0;class di extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=zi,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yu,this.blendDst=Su,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=na,this.stencilZFail=na,this.stencilZPass=na,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new En().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wf extends di{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ai;const nr=new B,Ri=new B,Ci=new B,Pi=new Me,ir=new Me,Vu=new at,Hr=new B,rr=new B,Gr=new B,Ql=new Me,Sa=new Me,jl=new Me;class ky extends Tt{constructor(e=new Wf){if(super(),this.isSprite=!0,this.type="Sprite",Ai===void 0){Ai=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zf(t,5);Ai.setIndex([0,1,2,0,2,3]),Ai.setAttribute("position",new Us(n,3,0,!1)),Ai.setAttribute("uv",new Us(n,2,3,!1))}this.geometry=Ai,this.material=e,this.center=new Me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ri.setFromMatrixScale(this.matrixWorld),Vu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ci.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ri.multiplyScalar(-Ci.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;Vr(Hr.set(-.5,-.5,0),Ci,a,Ri,r,s),Vr(rr.set(.5,-.5,0),Ci,a,Ri,r,s),Vr(Gr.set(.5,.5,0),Ci,a,Ri,r,s),Ql.set(0,0),Sa.set(1,0),jl.set(1,1);let o=e.ray.intersectTriangle(Hr,rr,Gr,!1,nr);if(o===null&&(Vr(rr.set(-.5,.5,0),Ci,a,Ri,r,s),Sa.set(0,1),o=e.ray.intersectTriangle(Hr,Gr,rr,!1,nr),o===null))return;const l=e.ray.origin.distanceTo(nr);l<e.near||l>e.far||t.push({distance:l,point:nr.clone(),uv:Jt.getInterpolation(nr,Hr,rr,Gr,Ql,Sa,jl,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Vr(i,e,t,n,r,s){Pi.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ir.x=s*Pi.x-r*Pi.y,ir.y=r*Pi.x+s*Pi.y):ir.copy(Pi),i.copy(e),i.x+=ir.x,i.y+=ir.y,i.applyMatrix4(Vu)}const bn=new B,Ma=new B,Wr=new B,Xr=new B;class Ws{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ma.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),Xr.copy(this.origin).sub(Ma);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Wr),o=Xr.dot(this.direction),l=-Xr.dot(Wr),c=Xr.lengthSq(),u=Math.abs(1-a*a);let d,h,p,g;if(u>0)if(d=a*l-o,h=a*o-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const y=1/u;d*=y,h*=y,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ma).addScaledVector(Wr,h),p}intersectSphere(e,t){if(e.radius<0)return null;bn.subVectors(e.center,this.origin);const n=bn.dot(this.direction),r=bn.dot(bn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,g=t.x-a.x,y=t.y-a.y,m=t.z-a.z,f=n.x-a.x,S=n.y-a.y,R=n.z-a.z,v=Math.abs(l),M=Math.abs(c),w=Math.abs(u);let A,_,E,L,I,C,U,D,N,J,Z,ie;if(v>=M&&v>=w?(E=l,C=d,N=g,ie=f,l>=0?(A=c,_=u,L=h,I=p,U=y,D=m,J=S,Z=R):(A=u,_=c,L=p,I=h,U=m,D=y,J=R,Z=S)):M>=w?(E=c,C=h,N=y,ie=S,c>=0?(A=u,_=l,L=p,I=d,U=m,D=g,J=R,Z=f):(A=l,_=u,L=d,I=p,U=g,D=m,J=f,Z=R)):(E=u,C=p,N=m,ie=R,u>=0?(A=l,_=c,L=d,I=h,U=g,D=y,J=f,Z=S):(A=c,_=l,L=h,I=d,U=y,D=g,J=S,Z=f)),E===0)return null;const j=A/E,ee=_/E,ne=1/E,Re=L-j*C,Te=I-ee*C,$e=U-j*N,Be=D-ee*N,He=J-j*ie,G=Z-ee*ie,K=He*Be-G*$e,ae=Re*G-Te*He,ge=$e*Te-Be*Re;if(r){if(K<0||ae<0||ge<0)return null}else if((K<0||ae<0||ge<0)&&(K>0||ae>0||ge>0))return null;const ce=K+ae+ge;if(ce===0)return null;const ve=ne*(K*C+ae*N+ge*ie);return(ce>0?ve<0:ve>0)?null:this.at(ve/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wn extends di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=Mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ec=new at,Zn=new Ws,qr=new hi,tc=new B,Yr=new B,$r=new B,Kr=new B,ba=new B,Zr=new B,nc=new B,Jr=new B;class ut extends Tt{constructor(e=new St,t=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(ba.fromBufferAttribute(d,e),a?Zr.addScaledVector(ba,u):Zr.addScaledVector(ba.sub(t),u))}t.add(Zr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(s),Zn.copy(e.ray).recast(e.near),!(qr.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(qr,tc)===null||Zn.origin.distanceToSquared(tc)>(e.far-e.near)**2))&&(ec.copy(s).invert(),Zn.copy(e.ray).applyMatrix4(ec),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,M=R;v<M;v+=3){const w=o.getX(v),A=o.getX(v+1),_=o.getX(v+2);r=Qr(this,f,e,n,c,u,d,w,A,_),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const S=o.getX(m),R=o.getX(m+1),v=o.getX(m+2);r=Qr(this,a,e,n,c,u,d,S,R,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,M=R;v<M;v+=3){const w=v,A=v+1,_=v+2;r=Qr(this,f,e,n,c,u,d,w,A,_),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const S=m,R=m+1,v=m+2;r=Qr(this,a,e,n,c,u,d,S,R,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Xf(i,e,t,n,r,s,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===si,o),l===null)return null;Jr.copy(o),Jr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Jr);return c<t.near||c>t.far?null:{distance:c,point:Jr.clone(),object:i}}function Qr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Yr),i.getVertexPosition(l,$r),i.getVertexPosition(c,Kr);const u=Xf(i,e,t,n,Yr,$r,Kr,nc);if(u){const d=new B;Jt.getBarycoord(nc,Yr,$r,Kr,d),r&&(u.uv=Jt.getInterpolatedAttribute(r,o,l,c,d,new Me)),s&&(u.uv1=Jt.getInterpolatedAttribute(s,o,l,c,d,new Me)),a&&(u.normal=Jt.getInterpolatedAttribute(a,o,l,c,d,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new B,materialIndex:0};Jt.getNormal(Yr,$r,Kr,h.normal),u.face=h,u.barycoord=d}return u}class fi extends Pt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=_t,u=_t,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ic extends xt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Li=new at,rc=new at,jr=[],sc=new ui,qf=new at,sr=new ut,ar=new hi;class By extends ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ic(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,qf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),sc.copy(e.boundingBox).applyMatrix4(Li),this.boundingBox.union(sc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),ar.copy(e.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ar.copy(this.boundingSphere),ar.applyMatrix4(n),e.ray.intersectsSphere(ar)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Li),rc.multiplyMatrices(n,Li),sr.matrixWorld=rc,sr.raycast(e,jr);for(let a=0,o=jr.length;a<o;a++){const l=jr[a];l.instanceId=s,l.object=this,t.push(l)}jr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ic(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new fi(new Float32Array(r*this.count),r,this.count,Tr,an));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Jn=new hi,Yf=new Me(.5,.5),es=new B;class sl{constructor(e=new En,t=new En,n=new En,r=new En,s=new En,a=new En){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],p=s[7],g=s[8],y=s[9],m=s[10],f=s[11],S=s[12],R=s[13],v=s[14],M=s[15];if(r[0].setComponents(c-a,p-u,f-g,M-S).normalize(),r[1].setComponents(c+a,p+u,f+g,M+S).normalize(),r[2].setComponents(c+o,p+d,f+y,M+R).normalize(),r[3].setComponents(c-o,p-d,f-y,M-R).normalize(),n)r[4].setComponents(l,h,m,v).normalize(),r[5].setComponents(c-l,p-h,f-m,M-v).normalize();else if(r[4].setComponents(c-l,p-h,f-m,M-v).normalize(),t===gn)r[5].setComponents(c+l,p+h,f+m,M+v).normalize();else if(t===Mr)r[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=Yf.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(es.x=r.normal.x>0?e.max.x:e.min.x,es.y=r.normal.y>0?e.max.y:e.min.y,es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $f extends di{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Is=new B,Ns=new B,ac=new at,or=new Ws,ts=new hi,wa=new B,oc=new B;class Kf extends Tt{constructor(e=new St,t=new $f){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Is.fromBufferAttribute(t,r-1),Ns.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Is.distanceTo(Ns);e.setAttribute("lineDistance",new vt(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;ac.copy(r).invert(),or.copy(e.ray).applyMatrix4(ac);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){const f=u.getX(y),S=u.getX(y+1),R=ns(this,e,or,l,f,S,y);R&&t.push(R)}if(this.isLineLoop){const y=u.getX(g-1),m=u.getX(p),f=ns(this,e,or,l,y,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){const f=ns(this,e,or,l,y,y+1,y);f&&t.push(f)}if(this.isLineLoop){const y=ns(this,e,or,l,g-1,p,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ns(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Is.fromBufferAttribute(o,r),Ns.fromBufferAttribute(o,s),t.distanceSqToSegment(Is,Ns,wa,oc)>n)return;wa.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(wa);if(!(c<e.near||c>e.far))return{distance:c,point:oc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const lc=new B,cc=new B;class zy extends Kf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)lc.fromBufferAttribute(t,r),cc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+lc.distanceTo(cc);e.setAttribute("lineDistance",new vt(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zf extends di{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const uc=new at,Lo=new Ws,is=new hi,rs=new B;class Hy extends Tt{constructor(e=new St,t=new Zf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(r),is.radius+=s,e.ray.intersectsSphere(is)===!1)return;uc.copy(r).invert(),Lo.copy(e.ray).applyMatrix4(uc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,y=p;g<y;g++){const m=c.getX(g);rs.fromBufferAttribute(d,m),hc(rs,m,l,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=h,y=p;g<y;g++)rs.fromBufferAttribute(d,g),hc(rs,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function hc(i,e,t,n,r,s,a){const o=Lo.distanceSqToPoint(i);if(o<t){const l=new B;Lo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Gy extends Pt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=_t,this.minFilter=_t,this.generateMipmaps=!1,this.needsUpdate=!0}}class Wu extends Pt{constructor(e=[],t=ai,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vy extends Pt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $i extends Pt{constructor(e,t,n=_n,r,s,a,o=_t,l=_t,c,u=Un,d=1){if(u!==Un&&u!==Wn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new il(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Jf extends $i{constructor(e,t=_n,n=ai,r,s,a=_t,o=_t,l,c=Un){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xu extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ar extends St{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2));function g(y,m,f,S,R,v,M,w,A,_,E){const L=v/A,I=M/_,C=v/2,U=M/2,D=w/2,N=A+1,J=_+1;let Z=0,ie=0;const j=new B;for(let ee=0;ee<J;ee++){const ne=ee*I-U;for(let Re=0;Re<N;Re++){const Te=Re*L-C;j[y]=Te*S,j[m]=ne*R,j[f]=D,c.push(j.x,j.y,j.z),j[y]=0,j[m]=0,j[f]=w>0?1:-1,u.push(j.x,j.y,j.z),d.push(Re/A),d.push(1-ee/_),Z+=1}}for(let ee=0;ee<_;ee++)for(let ne=0;ne<A;ne++){const Re=h+ne+N*ee,Te=h+ne+N*(ee+1),$e=h+(ne+1)+N*(ee+1),Be=h+(ne+1)+N*ee;l.push(Re,Te,Be),l.push(Te,$e,Be),ie+=6}o.addGroup(p,ie,E),p+=ie,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ar(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fs extends St{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new B,u=new Me;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const p=n+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(o,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class al extends St{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let g=0;const y=[],m=n/2;let f=0;S(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new vt(d,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(p,2));function S(){const v=new B,M=new B;let w=0;const A=(t-e)/n;for(let _=0;_<=s;_++){const E=[],L=_/s,I=L*(t-e)+e;for(let C=0;C<=r;C++){const U=C/r,D=U*l+o,N=Math.sin(D),J=Math.cos(D);M.x=I*N,M.y=-L*n+m,M.z=I*J,d.push(M.x,M.y,M.z),v.set(N,A,J).normalize(),h.push(v.x,v.y,v.z),p.push(U,1-L),E.push(g++)}y.push(E)}for(let _=0;_<r;_++)for(let E=0;E<s;E++){const L=y[E][_],I=y[E+1][_],C=y[E+1][_+1],U=y[E][_+1];(e>0||E!==0)&&(u.push(L,I,U),w+=3),(t>0||E!==s-1)&&(u.push(I,C,U),w+=3)}c.addGroup(f,w,0),f+=w}function R(v){const M=g,w=new Me,A=new B;let _=0;const E=v===!0?e:t,L=v===!0?1:-1;for(let C=1;C<=r;C++)d.push(0,m*L,0),h.push(0,L,0),p.push(.5,.5),g++;const I=g;for(let C=0;C<=r;C++){const D=C/r*l+o,N=Math.cos(D),J=Math.sin(D);A.x=E*J,A.y=m*L,A.z=E*N,d.push(A.x,A.y,A.z),h.push(0,L,0),w.x=N*.5+.5,w.y=J*.5*L+.5,p.push(w.x,w.y),g++}for(let C=0;C<r;C++){const U=M+C,D=I+C;v===!0?u.push(D,D+1,U):u.push(D+1,D,U),_+=3}c.addGroup(f,_,v===!0?1:2),f+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new al(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cn extends St{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,p=[],g=[],y=[],m=[];for(let f=0;f<u;f++){const S=f*h-a;for(let R=0;R<c;R++){const v=R*d-s;g.push(v,-S,0),y.push(0,0,1),m.push(R/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const R=S+c*f,v=S+c*(f+1),M=S+1+c*(f+1),w=S+1+c*f;p.push(R,v,w),p.push(v,M,w)}this.setIndex(p),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(y,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Os extends St{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/r,p=new B,g=new Me;for(let y=0;y<=r;y++){for(let m=0;m<=n;m++){const f=s+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let y=0;y<r;y++){const m=y*(n+1);for(let f=0;f<n;f++){const S=f+m,R=S,v=S+n+1,M=S+n+2,w=S+1;o.push(R,v,w),o.push(v,M,w)}}this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function Ki(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(dc(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(dc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Ft(i){const e={};for(let t=0;t<i.length;t++){const n=Ki(i[t]);for(const r in n)e[r]=n[r]}return e}function dc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Qf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function qu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const jf={clone:Ki,merge:Ft};var ep=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Et extends di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ep,this.fragmentShader=tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=Qf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ke().setHex(r.value);break;case"v2":this.uniforms[n].value=new Me().fromArray(r.value);break;case"v3":this.uniforms[n].value=new B().fromArray(r.value);break;case"v4":this.uniforms[n].value=new je().fromArray(r.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[n].value=new at().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class np extends Et{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ip extends di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rp extends di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Yu extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class sp extends Yu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ea=new at,fc=new B,pc=new B;class ap{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=zt,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sl,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(fc),pc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ea,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===Mr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ss=new B,as=new Zi,un=new B;class $u extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ss,as,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,as,un.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ss,as,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,as,un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new B,mc=new Me,gc=new Me;class Kt extends $u{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=br*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return br*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z)}getViewSize(e,t){return this.getViewBounds(e,mc,gc),t.subVectors(gc,mc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xs extends $u{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class op extends ap{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lp extends Yu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new op}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Wy extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Di=-90,Ui=1;class cp extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt(Di,Ui,e,t);r.layers=this.layers,this.add(r);const s=new Kt(Di,Ui,e,t);s.layers=this.layers,this.add(s);const a=new Kt(Di,Ui,e,t);a.layers=this.layers,this.add(a);const o=new Kt(Di,Ui,e,t);o.layers=this.layers,this.add(o);const l=new Kt(Di,Ui,e,t);l.layers=this.layers,this.add(l);const c=new Kt(Di,Ui,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class up extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vc=new at;class hp{constructor(e,t,n=0,r=1/0){this.ray=new Ws(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(e,t=!0,n=[]){return Do(e,this,n,t),n.sort(_c),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Do(e[r],this,n,t);return n.sort(_c),n}}function _c(i,e){return i.distance-e.distance}function Do(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Do(s[a],e,t,!0)}}class Ku{static{Ku.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function xc(i,e,t,n){const r=dp(n);switch(t){case Nu:return i*e;case Tr:return i*e/r.components*r.byteLength;case Jo:return i*e/r.components*r.byteLength;case oi:return i*e*2/r.components*r.byteLength;case Qo:return i*e*2/r.components*r.byteLength;case Fu:return i*e*3/r.components*r.byteLength;case Qt:return i*e*4/r.components*r.byteLength;case jo:return i*e*4/r.components*r.byteLength;case vs:case _s:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xs:case ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case eo:case no:return Math.max(i,16)*Math.max(e,8)/4;case ja:case to:return Math.max(i,8)*Math.max(e,8)/2;case io:case ro:case ao:case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case so:case Rs:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wo:case Eo:case To:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ao:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Cs:case Co:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dp(i){switch(i){case zt:case Lu:return{byteLength:1,components:1};case yr:case Du:case on:return{byteLength:2,components:1};case Ko:case Zo:return{byteLength:2,components:4};case _n:case $o:case an:return{byteLength:4,components:1};case Uu:case Iu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);function Zu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fp(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],y=d[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,d[h]=y)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const y=d[p];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var pp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mp=`#ifdef USE_ALPHAHASH
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
#endif`,gp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_p=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yp=`#ifdef USE_AOMAP
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
#endif`,Sp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mp=`#ifdef USE_BATCHING
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
#endif`,bp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ep=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ap=`#ifdef USE_IRIDESCENCE
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
#endif`,Rp=`#ifdef USE_BUMPMAP
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
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Up=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Np=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Fp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Op=`#define PI 3.141592653589793
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
} // validated`,kp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bp=`vec3 transformedNormal = objectNormal;
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
#endif`,zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qp=`#ifdef USE_ENVMAP
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
#endif`,Yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Jp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,em=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tm=`#ifdef USE_GRADIENTMAP
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
}`,nm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,im=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,am=`#ifdef USE_ENVMAP
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
#endif`,om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hm=`PhysicalMaterial material;
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
#endif`,dm=`uniform sampler2D dfgLUT;
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
}`,fm=`
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
#endif`,pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,mm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,vm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_m=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ym=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wm=`#if defined( USE_POINTS_UV )
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
#endif`,Em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Am=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pm=`#ifdef USE_MORPHTARGETS
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
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Um=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Om=`#ifdef USE_NORMALMAP
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
#endif`,km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$m=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jm=`float getShadowMask() {
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
}`,eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tg=`#ifdef USE_SKINNING
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
#endif`,ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ig=`#ifdef USE_SKINNING
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
#endif`,rg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,og=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lg=`#ifdef USE_TRANSMISSION
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
#endif`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mg=`uniform sampler2D t2D;
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
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`#include <common>
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
}`,Sg=`#if DEPTH_PACKING == 3200
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
}`,Mg=`#define DISTANCE
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
}`,bg=`#define DISTANCE
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
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`uniform float scale;
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
}`,Ag=`uniform vec3 diffuse;
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
}`,Rg=`#include <common>
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
}`,Cg=`uniform vec3 diffuse;
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
}`,Pg=`#define LAMBERT
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
}`,Lg=`#define LAMBERT
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
}`,Dg=`#define MATCAP
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
}`,Ug=`#define MATCAP
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
}`,Ig=`#define NORMAL
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
}`,Ng=`#define NORMAL
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
}`,Fg=`#define PHONG
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
}`,Og=`#define PHONG
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
}`,kg=`#define STANDARD
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
}`,Bg=`#define STANDARD
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
}`,zg=`#define TOON
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
}`,Hg=`#define TOON
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
}`,Gg=`uniform float size;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Xg=`uniform vec3 color;
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
}`,qg=`uniform float rotation;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:pp,alphahash_pars_fragment:mp,alphamap_fragment:gp,alphamap_pars_fragment:vp,alphatest_fragment:_p,alphatest_pars_fragment:xp,aomap_fragment:yp,aomap_pars_fragment:Sp,batching_pars_vertex:Mp,batching_vertex:bp,begin_vertex:wp,beginnormal_vertex:Ep,bsdfs:Tp,iridescence_fragment:Ap,bumpmap_pars_fragment:Rp,clipping_planes_fragment:Cp,clipping_planes_pars_fragment:Pp,clipping_planes_pars_vertex:Lp,clipping_planes_vertex:Dp,color_fragment:Up,color_pars_fragment:Ip,color_pars_vertex:Np,color_vertex:Fp,common:Op,cube_uv_reflection_fragment:kp,defaultnormal_vertex:Bp,displacementmap_pars_vertex:zp,displacementmap_vertex:Hp,emissivemap_fragment:Gp,emissivemap_pars_fragment:Vp,colorspace_fragment:Wp,colorspace_pars_fragment:Xp,envmap_fragment:qp,envmap_common_pars_fragment:Yp,envmap_pars_fragment:$p,envmap_pars_vertex:Kp,envmap_physical_pars_fragment:am,envmap_vertex:Zp,fog_vertex:Jp,fog_pars_vertex:Qp,fog_fragment:jp,fog_pars_fragment:em,gradientmap_pars_fragment:tm,lightmap_pars_fragment:nm,lights_lambert_fragment:im,lights_lambert_pars_fragment:rm,lights_pars_begin:sm,lights_toon_fragment:om,lights_toon_pars_fragment:lm,lights_phong_fragment:cm,lights_phong_pars_fragment:um,lights_physical_fragment:hm,lights_physical_pars_fragment:dm,lights_fragment_begin:fm,lights_fragment_maps:pm,lights_fragment_end:mm,lightprobes_pars_fragment:gm,logdepthbuf_fragment:vm,logdepthbuf_pars_fragment:_m,logdepthbuf_pars_vertex:xm,logdepthbuf_vertex:ym,map_fragment:Sm,map_pars_fragment:Mm,map_particle_fragment:bm,map_particle_pars_fragment:wm,metalnessmap_fragment:Em,metalnessmap_pars_fragment:Tm,morphinstance_vertex:Am,morphcolor_vertex:Rm,morphnormal_vertex:Cm,morphtarget_pars_vertex:Pm,morphtarget_vertex:Lm,normal_fragment_begin:Dm,normal_fragment_maps:Um,normal_pars_fragment:Im,normal_pars_vertex:Nm,normal_vertex:Fm,normalmap_pars_fragment:Om,clearcoat_normal_fragment_begin:km,clearcoat_normal_fragment_maps:Bm,clearcoat_pars_fragment:zm,iridescence_pars_fragment:Hm,opaque_fragment:Gm,packing:Vm,premultiplied_alpha_fragment:Wm,project_vertex:Xm,dithering_fragment:qm,dithering_pars_fragment:Ym,roughnessmap_fragment:$m,roughnessmap_pars_fragment:Km,shadowmap_pars_fragment:Zm,shadowmap_pars_vertex:Jm,shadowmap_vertex:Qm,shadowmask_pars_fragment:jm,skinbase_vertex:eg,skinning_pars_vertex:tg,skinning_vertex:ng,skinnormal_vertex:ig,specularmap_fragment:rg,specularmap_pars_fragment:sg,tonemapping_fragment:ag,tonemapping_pars_fragment:og,transmission_fragment:lg,transmission_pars_fragment:cg,uv_pars_fragment:ug,uv_pars_vertex:hg,uv_vertex:dg,worldpos_vertex:fg,background_vert:pg,background_frag:mg,backgroundCube_vert:gg,backgroundCube_frag:vg,cube_vert:_g,cube_frag:xg,depth_vert:yg,depth_frag:Sg,distance_vert:Mg,distance_frag:bg,equirect_vert:wg,equirect_frag:Eg,linedashed_vert:Tg,linedashed_frag:Ag,meshbasic_vert:Rg,meshbasic_frag:Cg,meshlambert_vert:Pg,meshlambert_frag:Lg,meshmatcap_vert:Dg,meshmatcap_frag:Ug,meshnormal_vert:Ig,meshnormal_frag:Ng,meshphong_vert:Fg,meshphong_frag:Og,meshphysical_vert:kg,meshphysical_frag:Bg,meshtoon_vert:zg,meshtoon_frag:Hg,points_vert:Gg,points_frag:Vg,shadow_vert:Wg,shadow_frag:Xg,sprite_vert:qg,sprite_frag:Yg},pe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},dn={basic:{uniforms:Ft([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ft([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ft([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ft([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ft([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new ke(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ft([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ft([pe.points,pe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ft([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ft([pe.common,pe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ft([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ft([pe.sprite,pe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Ft([pe.common,pe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Ft([pe.lights,pe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};dn.physical={uniforms:Ft([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const os={r:0,b:0,g:0},$g=new at,Ju=new ze;Ju.set(-1,0,0,0,1,0,0,0,1);function Kg(i,e,t,n,r,s){const a=new ke(0);let o=r===!0?0:1,l,c,u=null,d=0,h=null;function p(S){let R=S.isScene===!0?S.background:null;if(R&&R.isTexture){const v=S.backgroundBlurriness>0;R=e.get(R,v)}return R}function g(S){let R=!1;const v=p(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),R=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(S,R){const v=p(R);v&&(v.isCubeTexture||v.mapping===Vs)?(c===void 0&&(c=new ut(new Ar(1,1,1),new Et({name:"BackgroundCubeMaterial",uniforms:Ki(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($g.makeRotationFromEuler(R.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ju),c.material.toneMapped=Ze.getTransfer(v.colorSpace)!==ot,(u!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ut(new Cn(2,2),new Et({name:"BackgroundMaterial",uniforms:Ki(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(v.colorSpace)!==ot,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,R){S.getRGB(os,qu(i)),t.buffers.color.setClear(os.r,os.g,os.b,R,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,R=1){a.set(S),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:y,dispose:f}}function Zg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(I,C,U,D,N){let J=!1;const Z=d(I,D,U,C);s!==Z&&(s=Z,c(s.object)),J=p(I,D,U,N),J&&g(I,D,U,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,v(I,C,U,D),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function d(I,C,U,D){const N=D.wireframe===!0;let J=n[C.id];J===void 0&&(J={},n[C.id]=J);const Z=I.isInstancedMesh===!0?I.id:0;let ie=J[Z];ie===void 0&&(ie={},J[Z]=ie);let j=ie[U.id];j===void 0&&(j={},ie[U.id]=j);let ee=j[N];return ee===void 0&&(ee=h(l()),j[N]=ee),ee}function h(I){const C=[],U=[],D=[];for(let N=0;N<t;N++)C[N]=0,U[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:D,object:I,attributes:{},index:null}}function p(I,C,U,D){const N=s.attributes,J=C.attributes;let Z=0;const ie=U.getAttributes();for(const j in ie)if(ie[j].location>=0){const ne=N[j];let Re=J[j];if(Re===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(Re=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(Re=I.instanceColor)),ne===void 0||ne.attribute!==Re||Re&&ne.data!==Re.data)return!0;Z++}return s.attributesNum!==Z||s.index!==D}function g(I,C,U,D){const N={},J=C.attributes;let Z=0;const ie=U.getAttributes();for(const j in ie)if(ie[j].location>=0){let ne=J[j];ne===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(ne=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(ne=I.instanceColor));const Re={};Re.attribute=ne,ne&&ne.data&&(Re.data=ne.data),N[j]=Re,Z++}s.attributes=N,s.attributesNum=Z,s.index=D}function y(){const I=s.newAttributes;for(let C=0,U=I.length;C<U;C++)I[C]=0}function m(I){f(I,0)}function f(I,C){const U=s.newAttributes,D=s.enabledAttributes,N=s.attributeDivisors;U[I]=1,D[I]===0&&(i.enableVertexAttribArray(I),D[I]=1),N[I]!==C&&(i.vertexAttribDivisor(I,C),N[I]=C)}function S(){const I=s.newAttributes,C=s.enabledAttributes;for(let U=0,D=C.length;U<D;U++)C[U]!==I[U]&&(i.disableVertexAttribArray(U),C[U]=0)}function R(I,C,U,D,N,J,Z){Z===!0?i.vertexAttribIPointer(I,C,U,N,J):i.vertexAttribPointer(I,C,U,D,N,J)}function v(I,C,U,D){y();const N=D.attributes,J=U.getAttributes(),Z=C.defaultAttributeValues;for(const ie in J){const j=J[ie];if(j.location>=0){let ee=N[ie];if(ee===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor)),ee!==void 0){const ne=ee.normalized,Re=ee.itemSize,Te=e.get(ee);if(Te===void 0)continue;const $e=Te.buffer,Be=Te.type,He=Te.bytesPerElement,G=Be===i.INT||Be===i.UNSIGNED_INT||ee.gpuType===$o;if(ee.isInterleavedBufferAttribute){const K=ee.data,ae=K.stride,ge=ee.offset;if(K.isInstancedInterleavedBuffer){for(let ce=0;ce<j.locationSize;ce++)f(j.location+ce,K.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ce=0;ce<j.locationSize;ce++)m(j.location+ce);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let ce=0;ce<j.locationSize;ce++)R(j.location+ce,Re/j.locationSize,Be,ne,ae*He,(ge+Re/j.locationSize*ce)*He,G)}else{if(ee.isInstancedBufferAttribute){for(let K=0;K<j.locationSize;K++)f(j.location+K,ee.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let K=0;K<j.locationSize;K++)m(j.location+K);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let K=0;K<j.locationSize;K++)R(j.location+K,Re/j.locationSize,Be,ne,Re*He,Re/j.locationSize*K*He,G)}}else if(Z!==void 0){const ne=Z[ie];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(j.location,ne);break;case 3:i.vertexAttrib3fv(j.location,ne);break;case 4:i.vertexAttrib4fv(j.location,ne);break;default:i.vertexAttrib1fv(j.location,ne)}}}}S()}function M(){E();for(const I in n){const C=n[I];for(const U in C){const D=C[U];for(const N in D){const J=D[N];for(const Z in J)u(J[Z].object),delete J[Z];delete D[N]}}delete n[I]}}function w(I){if(n[I.id]===void 0)return;const C=n[I.id];for(const U in C){const D=C[U];for(const N in D){const J=D[N];for(const Z in J)u(J[Z].object),delete J[Z];delete D[N]}}delete n[I.id]}function A(I){for(const C in n){const U=n[C];for(const D in U){const N=U[D];if(N[I.id]===void 0)continue;const J=N[I.id];for(const Z in J)u(J[Z].object),delete J[Z];delete N[I.id]}}}function _(I){for(const C in n){const U=n[C],D=I.isInstancedMesh===!0?I.id:0,N=U[D];if(N!==void 0){for(const J in N){const Z=N[J];for(const ie in Z)u(Z[ie].object),delete Z[ie];delete N[J]}delete U[D],Object.keys(U).length===0&&delete n[C]}}}function E(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function Jg(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Qg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Qt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==zt&&A!==an&&!_&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Oe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:R,maxFragmentUniforms:v,maxSamples:M,samples:w}}function jg(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new En,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,R=S*4;let v=f.clippingState||null;l.value=v,v=u(g,h,R,p);for(let M=0;M!==R;++M)v[M]=t[M];f.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const f=p+y*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let R=0,v=p;R!==y;++R,v+=4)a.copy(d[R]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const ki=4,e0=6,t0=20,n0=256,lr=new Xs,yc=new ke;let Ta=null,Aa=0,Ra=0,Ca=!1;const i0=new B,Qn=new B;class Sc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=i0}=s;Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ta,Aa,Ra),this._renderer.xr.enabled=Ca,e.scissorTest=!1,Ii(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ai||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:st,minFilter:st,generateMipmaps:!1,type:on,format:Qt,colorSpace:Sr,depthBuffer:!1},r=Mc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=r0(s)),this._blurMaterial=a0(s,e,t),this._ggxMaterial=s0(s,e,t)}return r}_compileMaterial(e){const t=new ut(new St,e);this._renderer.compile(t,lr)}_sceneToCubeUV(e,t,n,r,s){const l=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(yc),d.toneMapping=vn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new Ar,new wn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let f=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,f=!0):(m.color.copy(yc),f=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[R],s.y,s.z)):v===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[R]));const M=this._cubeSize;Ii(r,v*M,R>2?M:0,M,M),d.setRenderTarget(r),f&&d.render(y,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ai||e.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ii(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,lr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-ki?n-g+ki:0),f=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,Ii(s,m,f,3*y,2*y),r.setRenderTarget(s),r.render(o,lr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Ii(e,m,f,3*y,2*y),r.setRenderTarget(e),r.render(o,lr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-ki?r-this._lodMax+ki:0),h=4*(this._cubeSize-u);Ii(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,lr)}}function r0(i){const e=[],t=[];let n=i;const r=i-ki+1+e0;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,g=new Float32Array(p*h*d),y=new Float32Array(p*h*d);for(let f=0;f<d;f++){const S=f%3*2/3-1,R=f>2?0:-1,v=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];g.set(v,p*h*f);for(let M=0;M<h;M++){const w=u[M*2]*2-1,A=u[M*2+1]*2-1;f===0?Qn.set(1,A,w):f===1?Qn.set(-w,1,-A):f===2?Qn.set(-w,A,1):f===3?Qn.set(-1,A,-w):f===4?Qn.set(-w,-1,A):Qn.set(w,A,-1),Qn.toArray(y,(f*h+M)*p)}}const m=new St;m.setAttribute("position",new xt(g,p)),m.setAttribute("outputDirection",new xt(y,p)),t.push(new ut(m,null)),n>ki&&n--}return{lodMeshes:t,sizeLods:e}}function Mc(i,e,t){const n=new Xt(i,e,t);return n.texture.mapping=Vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ii(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function s0(i,e,t){return new Et({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:n0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function a0(i,e,t){return new Et({name:"SphericalGaussianBlur",defines:{SAMPLES:t0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function bc(){return new Et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function wc(){return new Et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function qs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Qu extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Wu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ar(5,5,5),s=new Et({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Pn});s.uniforms.tEquirect.value=t;const a=new ut(r,s),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=st),new cp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function o0(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===js||p===ea)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new Qu(g.height);return y.fromEquirectangularTexture(i,h),e.set(h,y),h.addEventListener("dispose",c),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===js||p===ea,y=p===ai||p===qi;if(g||y){let m=t.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Sc(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||y&&S&&l(S)?(n===null&&(n=new Sc(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===js?h.mapping=ai:p===ea&&(h.mapping=qi),h}function l(h){let p=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function l0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Hi("WebGLRenderer: "+n+" extension not supported."),r}}}function c0(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(d){const h=[],p=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(p!==null){const S=p.array;y=p.version;for(let R=0,v=S.length;R<v;R+=3){const M=S[R+0],w=S[R+1],A=S[R+2];h.push(M,w,w,A,A,M)}}else{const S=g.array;y=g.version;for(let R=0,v=S.length/3-1;R<v;R+=3){const M=R+0,w=R+1,A=R+2;h.push(M,w,w,A,A,M)}}const m=new(g.count>=65535?Gu:Hu)(h,1);m.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function u0(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,s,d*a,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,p);let y=0;for(let m=0;m<p;m++)y+=h[m];t.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function h0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function d0(i,e,t){const n=new WeakMap,r=new je;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let E=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let R=0;p===!0&&(R=1),g===!0&&(R=2),y===!0&&(R=3);let v=o.attributes.position.count*R,M=1;v>e.maxTextureSize&&(M=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const w=new Float32Array(v*M*4*d),A=new Bu(w,v,M,d);A.type=an,A.needsUpdate=!0;const _=R*4;for(let L=0;L<d;L++){const I=m[L],C=f[L],U=S[L],D=v*M*4*L;for(let N=0;N<I.count;N++){const J=N*_;p===!0&&(r.fromBufferAttribute(I,N),w[D+J+0]=r.x,w[D+J+1]=r.y,w[D+J+2]=r.z,w[D+J+3]=0),g===!0&&(r.fromBufferAttribute(C,N),w[D+J+4]=r.x,w[D+J+5]=r.y,w[D+J+6]=r.z,w[D+J+7]=0),y===!0&&(r.fromBufferAttribute(U,N),w[D+J+8]=r.x,w[D+J+9]=r.y,w[D+J+10]=r.z,w[D+J+11]=U.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new Me(v,M)},n.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function f0(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const p0={[bu]:"LINEAR_TONE_MAPPING",[wu]:"REINHARD_TONE_MAPPING",[Eu]:"CINEON_TONE_MAPPING",[Tu]:"ACES_FILMIC_TONE_MAPPING",[Ru]:"AGX_TONE_MAPPING",[Cu]:"NEUTRAL_TONE_MAPPING",[Au]:"CUSTOM_TONE_MAPPING"};function m0(i,e,t,n,r,s){const a=new Xt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new St;c.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new vt([0,2,0,0,2,0],2));const u=new np({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ut(c,u),h=new Xs(-1,1,1,-1,0,1);let p=null,g=null,y=!1,m,f=null,S=[],R=!1;this.setSize=function(v,M){a.setSize(v,M),o!==null&&o.setSize(v,M),l!==null&&l.setSize(v,M);for(let w=0;w<S.length;w++){const A=S[w];A.setSize&&A.setSize(v,M)}},this.setEffects=function(v){S=v,R=S.length>0&&S[0].isRenderPass===!0;const M=a.width,w=a.height;S.length>0&&o===null&&(o=new Xt(M,w,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new Xt(M,w,{type:on,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){const _=S[A];_.setSize&&_.setSize(M,w)}},this.begin=function(v,M){if(y||v.toneMapping===vn&&S.length===0)return!1;if(f=M,M!==null){const w=M.width,A=M.height;(a.width!==w||a.height!==A)&&this.setSize(w,A)}return R===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=vn,!0},this.hasRenderPass=function(){return R},this.end=function(v,M){v.toneMapping=m,y=!0;let w=a,A=o;for(let _=0;_<S.length;_++){const E=S[_];E.enabled!==!1&&(E.render(v,A,w,M),E.needsSwap!==!1&&(w=A,A=A===o?l:o))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,u.defines={},Ze.getTransfer(p)===ot&&(u.defines.SRGB_TRANSFER="");const _=p0[g];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(f),v.render(d,h),f=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const ju=new Pt,Uo=new $i(1,1),eh=new Bu,th=new Ef,nh=new Wu,Ec=[],Tc=[],Ac=new Float32Array(16),Rc=new Float32Array(9),Cc=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ec[r];if(s===void 0&&(s=new Float32Array(r),Ec[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function At(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Rt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ys(i,e){let t=Tc[e];t===void 0&&(t=new Int32Array(e),Tc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function g0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function v0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2fv(this.addr,e),Rt(t,e)}}function _0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;i.uniform3fv(this.addr,e),Rt(t,e)}}function x0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4fv(this.addr,e),Rt(t,e)}}function y0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Cc.set(n),i.uniformMatrix2fv(this.addr,!1,Cc),Rt(t,n)}}function S0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Rc.set(n),i.uniformMatrix3fv(this.addr,!1,Rc),Rt(t,n)}}function M0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;Ac.set(n),i.uniformMatrix4fv(this.addr,!1,Ac),Rt(t,n)}}function b0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function w0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2iv(this.addr,e),Rt(t,e)}}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3iv(this.addr,e),Rt(t,e)}}function T0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4iv(this.addr,e),Rt(t,e)}}function A0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2uiv(this.addr,e),Rt(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3uiv(this.addr,e),Rt(t,e)}}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4uiv(this.addr,e),Rt(t,e)}}function L0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Uo.compareFunction=t.isReversedDepthBuffer()?tl:el,s=Uo):s=ju,t.setTexture2D(e||s,r)}function D0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||th,r)}function U0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||nh,r)}function I0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||eh,r)}function N0(i){switch(i){case 5126:return g0;case 35664:return v0;case 35665:return _0;case 35666:return x0;case 35674:return y0;case 35675:return S0;case 35676:return M0;case 5124:case 35670:return b0;case 35667:case 35671:return w0;case 35668:case 35672:return E0;case 35669:case 35673:return T0;case 5125:return A0;case 36294:return R0;case 36295:return C0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return I0}}function F0(i,e){i.uniform1fv(this.addr,e)}function O0(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function k0(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function B0(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function z0(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function H0(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function G0(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function V0(i,e){i.uniform1iv(this.addr,e)}function W0(i,e){i.uniform2iv(this.addr,e)}function X0(i,e){i.uniform3iv(this.addr,e)}function q0(i,e){i.uniform4iv(this.addr,e)}function Y0(i,e){i.uniform1uiv(this.addr,e)}function $0(i,e){i.uniform2uiv(this.addr,e)}function K0(i,e){i.uniform3uiv(this.addr,e)}function Z0(i,e){i.uniform4uiv(this.addr,e)}function J0(i,e,t){const n=this.cache,r=e.length,s=Ys(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Uo:a=ju;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Q0(i,e,t){const n=this.cache,r=e.length,s=Ys(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||th,s[a])}function j0(i,e,t){const n=this.cache,r=e.length,s=Ys(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||nh,s[a])}function ev(i,e,t){const n=this.cache,r=e.length,s=Ys(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||eh,s[a])}function tv(i){switch(i){case 5126:return F0;case 35664:return O0;case 35665:return k0;case 35666:return B0;case 35674:return z0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return V0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return $0;case 36295:return K0;case 36296:return Z0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return ev}}class nv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=N0(t.type)}}class iv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tv(t.type)}}class rv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function Pc(i,e){i.seq.push(e),i.map[e.id]=e}function sv(i,e,t){const n=i.name,r=n.length;for(Pa.lastIndex=0;;){const s=Pa.exec(n),a=Pa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Pc(t,c===void 0?new nv(o,i,e):new iv(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new rv(o),Pc(t,d)),t=d}}}class Ss{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sv(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Lc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const av=37297;let ov=0;function lv(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Dc=new ze;function cv(i){Ze._getMatrix(Dc,Ze.workingColorSpace,i);const e=`mat3( ${Dc.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Ps:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Uc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+lv(i.getShaderSource(e),o)}else return s}function uv(i,e){const t=cv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const hv={[bu]:"Linear",[wu]:"Reinhard",[Eu]:"Cineon",[Tu]:"ACESFilmic",[Ru]:"AgX",[Cu]:"Neutral",[Au]:"Custom"};function dv(i,e){const t=hv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ls=new B;function fv(){Ze.getLuminanceCoefficients(ls);const i=ls.x.toFixed(4),e=ls.y.toFixed(4),t=ls.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function mv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function pr(i){return i!==""}function Ic(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Io(i){return i.replace(vv,xv)}const _v=new Map;function xv(i,e){let t=Xe[e];if(t===void 0){const n=_v.get(e);if(n!==void 0)t=Xe[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Io(t)}const yv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(i){return i.replace(yv,Sv)}function Sv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Oc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Mv={[gs]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function bv(i){return Mv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wv={[ai]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE_UV"};function Ev(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":wv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Tv={[qi]:"ENVMAP_MODE_REFRACTION"};function Av(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Tv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rv={[Mu]:"ENVMAP_BLENDING_MULTIPLY",[Hd]:"ENVMAP_BLENDING_MIX",[Gd]:"ENVMAP_BLENDING_ADD"};function Cv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rv[i.combine]||"ENVMAP_BLENDING_NONE"}function Pv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Lv(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=bv(t),c=Ev(t),u=Av(t),d=Cv(t),h=Pv(t),p=pv(t),g=mv(s),y=r.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),f.length>0&&(f+=`
`)):(m=[Oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),f=[Oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==vn?dv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,uv("linearToOutputTexel",t.outputColorSpace),fv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pr).join(`
`)),a=Io(a),a=Ic(a,t),a=Nc(a,t),o=Io(o),o=Ic(o,t),o=Nc(o,t),a=Fc(a),o=Fc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const R=S+m+a,v=S+f+o,M=Lc(r,r.VERTEX_SHADER,R),w=Lc(r,r.FRAGMENT_SHADER,v);r.attachShader(y,M),r.attachShader(y,w),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(I){if(i.debug.checkShaderErrors){const C=r.getProgramInfoLog(y)||"",U=r.getShaderInfoLog(M)||"",D=r.getShaderInfoLog(w)||"",N=C.trim(),J=U.trim(),Z=D.trim();let ie=!0,j=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,M,w);else{const ee=Uc(r,M,"vertex"),ne=Uc(r,w,"fragment");Je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+ee+`
`+ne)}else N!==""?Oe("WebGLProgram: Program Info Log:",N):(J===""||Z==="")&&(j=!1);j&&(I.diagnostics={runnable:ie,programLog:N,vertexShader:{log:J,prefix:m},fragmentShader:{log:Z,prefix:f}})}r.deleteShader(M),r.deleteShader(w),_=new Ss(r,y),E=gv(r,y)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(y,av)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ov++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=w,this}let Dv=0;class Uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Iv(e),t.set(e,n)),n}}class Iv{constructor(e){this.id=Dv++,this.code=e,this.usedTimes=0}}function Nv(i){return i===oi||i===Rs||i===Cs}function Fv(i,e,t,n,r,s){const a=new rl,o=new Uv,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,E,L,I,C,U){const D=I.fog,N=C.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ie=e.get(_.envMap||J,Z),j=ie&&ie.mapping===Vs?ie.image.height:null,ee=p[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&Oe("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const ne=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Re=ne!==void 0?ne.length:0;let Te=0;N.morphAttributes.position!==void 0&&(Te=1),N.morphAttributes.normal!==void 0&&(Te=2),N.morphAttributes.color!==void 0&&(Te=3);let $e,Be,He,G;if(ee){const ft=dn[ee];$e=ft.vertexShader,Be=ft.fragmentShader}else{$e=_.vertexShader,Be=_.fragmentShader;const ft=o.getVertexShaderStage(_),it=o.getFragmentShaderStage(_);o.update(_,ft,it),He=ft.id,G=it.id}const K=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),ge=C.isInstancedMesh===!0,ce=C.isBatchedMesh===!0,ve=!!_.map,tt=!!_.matcap,Ne=!!ie,Fe=!!_.aoMap,Le=!!_.lightMap,he=!!_.bumpMap&&_.wireframe===!1,Ie=!!_.normalMap,dt=!!_.displacementMap,nt=!!_.emissiveMap,Ve=!!_.metalnessMap,mt=!!_.roughnessMap,F=_.anisotropy>0,Mt=_.clearcoat>0,et=_.dispersion>0,P=_.retroreflectivity>0,x=_.iridescence>0,H=_.sheen>0,$=_.transmission>0,T=F&&!!_.anisotropyMap,V=Mt&&!!_.clearcoatMap,X=Mt&&!!_.clearcoatNormalMap,z=Mt&&!!_.clearcoatRoughnessMap,W=x&&!!_.iridescenceMap,re=x&&!!_.iridescenceThicknessMap,ue=H&&!!_.sheenColorMap,le=H&&!!_.sheenRoughnessMap,oe=!!_.specularMap,be=!!_.specularColorMap,Ue=!!_.specularIntensityMap,Ge=$&&!!_.transmissionMap,k=$&&!!_.thicknessMap,de=!!_.gradientMap,te=!!_.alphaMap,fe=_.alphaTest>0,xe=!!_.alphaHash,se=!!_.extensions;let De=vn;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(De=i.toneMapping);const Ae={shaderID:ee,shaderType:_.type,shaderName:_.name,vertexShader:$e,fragmentShader:Be,defines:_.defines,customVertexShaderID:He,customFragmentShaderID:G,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:ce,batchingColor:ce&&C._colorsTexture!==null,instancing:ge,instancingColor:ge&&C.instanceColor!==null,instancingMorph:ge&&C.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ve,matcap:tt,envMap:Ne,envMapMode:Ne&&ie.mapping,envMapCubeUVHeight:j,aoMap:Fe,lightMap:Le,bumpMap:he,normalMap:Ie,displacementMap:dt,emissiveMap:nt,normalMapObjectSpace:Ie&&_.normalMapType===Xd,normalMapTangentSpace:Ie&&_.normalMapType===Ol,packedNormalMap:Ie&&_.normalMapType===Ol&&Nv(_.normalMap.format),metalnessMap:Ve,roughnessMap:mt,anisotropy:F,anisotropyMap:T,clearcoat:Mt,clearcoatMap:V,clearcoatNormalMap:X,clearcoatRoughnessMap:z,dispersion:et,retroreflection:P,iridescence:x,iridescenceMap:W,iridescenceThicknessMap:re,sheen:H,sheenColorMap:ue,sheenRoughnessMap:le,specularMap:oe,specularColorMap:be,specularIntensityMap:Ue,transmission:$,transmissionMap:Ge,thicknessMap:k,gradientMap:de,opaque:_.transparent===!1&&_.blending===zi&&_.alphaToCoverage===!1,alphaMap:te,alphaTest:fe,alphaHash:xe,combine:_.combine,mapUv:ve&&g(_.map.channel),aoMapUv:Fe&&g(_.aoMap.channel),lightMapUv:Le&&g(_.lightMap.channel),bumpMapUv:he&&g(_.bumpMap.channel),normalMapUv:Ie&&g(_.normalMap.channel),displacementMapUv:dt&&g(_.displacementMap.channel),emissiveMapUv:nt&&g(_.emissiveMap.channel),metalnessMapUv:Ve&&g(_.metalnessMap.channel),roughnessMapUv:mt&&g(_.roughnessMap.channel),anisotropyMapUv:T&&g(_.anisotropyMap.channel),clearcoatMapUv:V&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:X&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:le&&g(_.sheenRoughnessMap.channel),specularMapUv:oe&&g(_.specularMap.channel),specularColorMapUv:be&&g(_.specularColorMap.channel),specularIntensityMapUv:Ue&&g(_.specularIntensityMap.channel),transmissionMapUv:Ge&&g(_.transmissionMap.channel),thicknessMapUv:k&&g(_.thicknessMap.channel),alphaMapUv:te&&g(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Ie||F),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!N.attributes.uv&&(ve||te),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&Ie===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ae,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Te,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:ve&&_.map.isVideoTexture===!0&&Ze.getTransfer(_.map.colorSpace)===ot,decodeVideoTextureEmissive:nt&&_.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(_.emissiveMap.colorSpace)===ot,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Zt,flipSided:_.side===Ht,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:se&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&_.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)E.push(L),E.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(f(E,_),S(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function f(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function S(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function R(_){const E=p[_.type];let L;if(E){const I=dn[E];L=jf.clone(I.uniforms)}else L=_.uniforms;return L}function v(_,E){let L=u.get(E);return L!==void 0?++L.usedTimes:(L=new Lv(i,E,_,r),c.push(L),u.set(E,L)),L}function M(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:R,acquireProgram:v,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:A}}function Ov(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function kv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function kc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Bc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,y,m,f){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:m,group:f},i[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=g,S.materialVariant=a(h),S.groupOrder=y,S.renderOrder=h.renderOrder,S.z=m,S.group=f),e++,S}function l(h,p,g,y,m,f,S){S.reversedDepth===!0&&(m=-m);const R=o(h,p,g,y,m,f);g.transmission>0?n.push(R):g.transparent===!0?r.push(R):t.push(R)}function c(h,p,g,y,m,f){const S=o(h,p,g,y,m,f);g.transmission>0?n.unshift(S):g.transparent===!0?r.unshift(S):t.unshift(S)}function u(h,p){t.length>1&&t.sort(h||kv),n.length>1&&n.sort(p||kc),r.length>1&&r.sort(p||kc)}function d(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function Bv(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Bc,i.set(n,[a])):r>=s.length?(a=new Bc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function zv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new ke};break;case"SpotLight":t={position:new B,direction:new B,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Hv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gv=0;function Vv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Wv(i){const e=new zv,t=Hv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const r=new B,s=new at,a=new at;function o(c){let u=0,d=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let p=0,g=0,y=0,m=0,f=0,S=0,R=0,v=0,M=0,w=0,A=0,_=0,E=0,L=0;c.sort(Vv);for(let C=0,U=c.length;C<U;C++){const D=c[C],N=D.color,J=D.intensity,Z=D.distance;let ie=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===oi?ie=D.shadow.map.texture:ie=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=N.r*J,d+=N.g*J,h+=N.b*J;else if(D.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(D.sh.coefficients[j],J);L++}else if(D.isSunLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[g]=ne,n.sunShadowMap[g]=ie;const Re=ee.getViewportCount();for(let Te=0;Te<Re;Te++)n.sunShadowMatrix[y+Te]=ee.getMatrix(Te),n.sunShadowCascade[y+Te]=ee._cascadeData[Te];y+=Re,g++}n.sun[p]=j,p++}else if(D.isDirectionalLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.directionalShadow[m]=ne,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=D.shadow.matrix,M++}n.directional[m]=j,m++}else if(D.isSpotLight){const j=e.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(N).multiplyScalar(J),j.distance=Z,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,n.spot[S]=j;const ee=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,ee.updateMatrices(D),D.castShadow&&E++),n.spotLightMatrix[S]=ee.matrix,D.castShadow){const ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.spotShadow[S]=ne,n.spotShadowMap[S]=ie,A++}S++}else if(D.isRectAreaLight){const j=e.get(D);j.color.copy(N).multiplyScalar(J),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),n.rectArea[R]=j,R++}else if(D.isPointLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),j.distance=D.distance,j.decay=D.decay,D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,ne.shadowCameraNear=ee.camera.near,ne.shadowCameraFar=ee.camera.far,n.pointShadow[f]=ne,n.pointShadowMap[f]=ie,n.pointShadowMatrix[f]=D.shadow.matrix,w++}n.point[f]=j,f++}else if(D.isHemisphereLight){const j=e.get(D);j.skyColor.copy(D.color).multiplyScalar(J),j.groundColor.copy(D.groundColor).multiplyScalar(J),n.hemi[v]=j,v++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const I=n.hash;(I.sunLength!==p||I.directionalLength!==m||I.pointLength!==f||I.spotLength!==S||I.rectAreaLength!==R||I.hemiLength!==v||I.numSunShadows!==g||I.numDirectionalShadows!==M||I.numPointShadows!==w||I.numSpotShadows!==A||I.numSpotMaps!==_||I.numLightProbes!==L)&&(n.sun.length=p,n.directional.length=m,n.spot.length=S,n.rectArea.length=R,n.point.length=f,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=L,I.sunLength=p,I.directionalLength=m,I.pointLength=f,I.spotLength=S,I.rectAreaLength=R,I.hemiLength=v,I.numSunShadows=g,I.numDirectionalShadows=M,I.numPointShadows=w,I.numSpotShadows=A,I.numSpotMaps=_,I.numLightProbes=L,n.version=Gv++)}function l(c,u){let d=0,h=0,p=0,g=0,y=0,m=0;const f=u.matrixWorldInverse;for(let S=0,R=c.length;S<R;S++){const v=c[S];if(v.isSunLight){const M=n.sun[d];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(f),d++}else if(v.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(v.isSpotLight){const M=n.spot[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),g++}else if(v.isRectAreaLight){const M=n.rectArea[y];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(v.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){const M=n.point[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){const M=n.hemi[m];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function zc(i){const e=new Wv(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Xv(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new zc(i),e.set(r,[o])):s>=a.length?(o=new zc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yv=`uniform sampler2D shadow_pass;
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
}`,$v=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Kv=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Hc=new at,cr=new B,La=new B;function Zv(i,e,t){let n=new sl;const r=new Me,s=new Me,a=new je,o=new ip,l=new rp,c={},u=t.maxTextureSize,d={[si]:Ht,[Ht]:si,[Zt]:Zt},h=new Et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:qv,fragmentShader:Yv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gs;let f=this.type;this.render=function(w,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Md&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=gs);const E=i.getRenderTarget(),L=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Pn),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const U=f!==this.type;U&&A.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(N=>N.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,N=w.length;D<N;D++){const J=w[D],Z=J.shadow;if(Z===void 0){Oe("WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const ie=Z.getFrameExtents();r.multiply(ie),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,Z.mapSize.y=s.y));const j=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=j,Z.map===null||U===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===fr){if(J.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Xt(r.x,r.y,{format:oi,type:on,minFilter:st,magFilter:st,generateMipmaps:!1}),Z.map.texture.name=J.name+".shadowMap",Z.map.depthTexture=new $i(r.x,r.y,an),Z.map.depthTexture.name=J.name+".shadowMapDepth",Z.map.depthTexture.format=Un,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=_t,Z.map.depthTexture.magFilter=_t}else J.isPointLight?(Z.map=new Qu(r.x),Z.map.depthTexture=new Jf(r.x,_n)):(Z.map=new Xt(r.x,r.y),Z.map.depthTexture=new $i(r.x,r.y,_n)),Z.map.depthTexture.name=J.name+".shadowMap",Z.map.depthTexture.format=Un,this.type===gs?(Z.map.depthTexture.compareFunction=j?tl:el,Z.map.depthTexture.minFilter=st,Z.map.depthTexture.magFilter=st):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=_t,Z.map.depthTexture.magFilter=_t);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);const ee=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();J.isPointLight!==!0&&Z.updateMatrices(J,_);for(let ne=0;ne<ee;ne++){const Re=Z.getCamera(ne);if(J.isPointLight){const Te=Z.camera,$e=Z.matrix,Be=J.distance||Te.far;Be!==Te.far&&(Te.far=Be,Te.updateProjectionMatrix()),cr.setFromMatrixPosition(J.matrixWorld),Te.position.copy(cr),La.copy(Te.position),La.add($v[ne]),Te.up.copy(Kv[ne]),Te.lookAt(La),Te.updateMatrixWorld(),$e.makeTranslation(-cr.x,-cr.y,-cr.z),Hc.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Hc,Te.coordinateSystem,Te.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,ne),i.clear();else{ne===0&&(i.setRenderTarget(Z.map),i.clear());const Te=Z.getViewport(ne);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),C.viewport(a)}n=Z.getFrustum(ne),v(A,_,Re,J,this.type)}Z.isPointLightShadow!==!0&&this.type===fr&&S(Z,_),Z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,L,I)};function S(w,A){const _=e.update(y);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Xt(r.x,r.y,{format:oi,type:on}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,_,h,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,_,p,y,null)}function R(w,A,_,E){let L=null;const I=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)L=I;else if(L=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const C=L.uuid,U=A.uuid;let D=c[C];D===void 0&&(D={},c[C]=D);let N=D[U];N===void 0&&(N=L.clone(),D[U]=N,A.addEventListener("dispose",M)),L=N}if(L.visible=A.visible,L.wireframe=A.wireframe,E===fr?L.side=A.shadowSide!==null?A.shadowSide:A.side:L.side=A.shadowSide!==null?A.shadowSide:d[A.side],L.alphaMap=A.alphaMap,L.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,L.map=A.map,L.clipShadows=A.clipShadows,L.clippingPlanes=A.clippingPlanes,L.clipIntersection=A.clipIntersection,L.displacementMap=A.displacementMap,L.displacementScale=A.displacementScale,L.displacementBias=A.displacementBias,L.wireframeLinewidth=A.wireframeLinewidth,L.linewidth=A.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const C=i.properties.get(L);C.light=_}return L}function v(w,A,_,E,L){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===fr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const U=e.update(w),D=w.material;if(Array.isArray(D)){const N=U.groups;for(let J=0,Z=N.length;J<Z;J++){const ie=N[J],j=D[ie.materialIndex];if(j&&j.visible){const ee=R(w,j,E,L);w.onBeforeShadow(i,w,A,_,U,ee,ie),i.renderBufferDirect(_,null,U,ee,w,ie),w.onAfterShadow(i,w,A,_,U,ee,ie)}}}else if(D.visible){const N=R(w,D,E,L);w.onBeforeShadow(i,w,A,_,U,N,null),i.renderBufferDirect(_,null,U,N,w,null),w.onAfterShadow(i,w,A,_,U,N,null)}}const C=w.children;for(let U=0,D=C.length;U<D;U++)v(C[U],A,_,E,L)}function M(w){w.target.removeEventListener("dispose",M);for(const _ in c){const E=c[_],L=w.target.uuid;L in E&&(E[L].dispose(),delete E[L])}}}function Jv(i,e){function t(){let k=!1;const de=new je;let te=null;const fe=new je(0,0,0,0);return{setMask:function(xe){te!==xe&&!k&&(i.colorMask(xe,xe,xe,xe),te=xe)},setLocked:function(xe){k=xe},setClear:function(xe,se,De,Ae,ft){ft===!0&&(xe*=Ae,se*=Ae,De*=Ae),de.set(xe,se,De,Ae),fe.equals(de)===!1&&(i.clearColor(xe,se,De,Ae),fe.copy(de))},reset:function(){k=!1,te=null,fe.set(-1,0,0,0)}}}function n(){let k=!1,de=!1,te=null,fe=null,xe=null;return{setReversed:function(se){if(de!==se){const De=e.get("EXT_clip_control");se?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),de=se;const Ae=xe;xe=null,this.setClear(Ae)}},getReversed:function(){return de},setTest:function(se){se?K(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(se){te!==se&&!k&&(i.depthMask(se),te=se)},setFunc:function(se){if(de&&(se=nf[se]),fe!==se){switch(se){case Xa:i.depthFunc(i.NEVER);break;case qa:i.depthFunc(i.ALWAYS);break;case Ya:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case $a:i.depthFunc(i.EQUAL);break;case Ka:i.depthFunc(i.GEQUAL);break;case Za:i.depthFunc(i.GREATER);break;case Ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=se}},setLocked:function(se){k=se},setClear:function(se){xe!==se&&(xe=se,de&&(se=1-se),i.clearDepth(se))},reset:function(){k=!1,te=null,fe=null,xe=null,de=!1}}}function r(){let k=!1,de=null,te=null,fe=null,xe=null,se=null,De=null,Ae=null,ft=null;return{setTest:function(it){k||(it?K(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(it){de!==it&&!k&&(i.stencilMask(it),de=it)},setFunc:function(it,jt,ln){(te!==it||fe!==jt||xe!==ln)&&(i.stencilFunc(it,jt,ln),te=it,fe=jt,xe=ln)},setOp:function(it,jt,ln){(se!==it||De!==jt||Ae!==ln)&&(i.stencilOp(it,jt,ln),se=it,De=jt,Ae=ln)},setLocked:function(it){k=it},setClear:function(it){ft!==it&&(i.clearStencil(it),ft=it)},reset:function(){k=!1,de=null,te=null,fe=null,xe=null,se=null,De=null,Ae=null,ft=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h={},p=new WeakMap,g=[],y=null,m=!1,f=null,S=null,R=null,v=null,M=null,w=null,A=null,_=new ke(0,0,0),E=0,L=!1,I=null,C=null,U=null,D=null,N=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ie=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(j)[1]),Z=ie>=1):j.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Z=ie>=2);let ee=null,ne={};const Re=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),$e=new je().fromArray(Re),Be=new je().fromArray(Te);function He(k,de,te,fe){const xe=new Uint8Array(4),se=i.createTexture();i.bindTexture(k,se),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<te;De++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(de+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return se}const G={};G[i.TEXTURE_2D]=He(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=He(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=He(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=He(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(Xi),he(!1),Ie(Il),K(i.CULL_FACE),Fe(Pn);function K(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function ae(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function ge(k,de){return h[k]!==de?(i.bindFramebuffer(k,de),h[k]=de,k===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=de),k===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=de),!0):!1}function ce(k,de){let te=g,fe=!1;if(k){te=p.get(de),te===void 0&&(te=[],p.set(de,te));const xe=k.textures;if(te.length!==xe.length||te[0]!==i.COLOR_ATTACHMENT0){for(let se=0,De=xe.length;se<De;se++)te[se]=i.COLOR_ATTACHMENT0+se;te.length=xe.length,fe=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,fe=!0);fe&&i.drawBuffers(te)}function ve(k){return y!==k?(i.useProgram(k),y=k,!0):!1}const tt={[Fi]:i.FUNC_ADD,[wd]:i.FUNC_SUBTRACT,[Ed]:i.FUNC_REVERSE_SUBTRACT};tt[Td]=i.MIN,tt[Ad]=i.MAX;const Ne={[Rd]:i.ZERO,[Cd]:i.ONE,[Pd]:i.SRC_COLOR,[yu]:i.SRC_ALPHA,[Fd]:i.SRC_ALPHA_SATURATE,[Id]:i.DST_COLOR,[Dd]:i.DST_ALPHA,[Ld]:i.ONE_MINUS_SRC_COLOR,[Su]:i.ONE_MINUS_SRC_ALPHA,[Nd]:i.ONE_MINUS_DST_COLOR,[Ud]:i.ONE_MINUS_DST_ALPHA,[Od]:i.CONSTANT_COLOR,[kd]:i.ONE_MINUS_CONSTANT_COLOR,[Bd]:i.CONSTANT_ALPHA,[zd]:i.ONE_MINUS_CONSTANT_ALPHA};function Fe(k,de,te,fe,xe,se,De,Ae,ft,it){if(k===Pn){m===!0&&(ae(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),k!==bd){if(k!==f||it!==L){if((S!==Fi||M!==Fi)&&(i.blendEquation(i.FUNC_ADD),S=Fi,M=Fi),it)switch(k){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rn:i.blendFunc(i.ONE,i.ONE);break;case Nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",k);break}else switch(k){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nl:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fl:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",k);break}R=null,v=null,w=null,A=null,_.set(0,0,0),E=0,f=k,L=it}return}xe=xe||de,se=se||te,De=De||fe,(de!==S||xe!==M)&&(i.blendEquationSeparate(tt[de],tt[xe]),S=de,M=xe),(te!==R||fe!==v||se!==w||De!==A)&&(i.blendFuncSeparate(Ne[te],Ne[fe],Ne[se],Ne[De]),R=te,v=fe,w=se,A=De),(Ae.equals(_)===!1||ft!==E)&&(i.blendColor(Ae.r,Ae.g,Ae.b,ft),_.copy(Ae),E=ft),f=k,L=!1}function Le(k,de){k.side===Zt?ae(i.CULL_FACE):K(i.CULL_FACE);let te=k.side===Ht;de&&(te=!te),he(te),k.blending===zi&&k.transparent===!1?Fe(Pn):Fe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const fe=k.stencilWrite;o.setTest(fe),fe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),nt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function he(k){I!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),I=k)}function Ie(k){k!==yd?(K(i.CULL_FACE),k!==C&&(k===Il?i.cullFace(i.BACK):k===Sd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),C=k}function dt(k){k!==U&&(Z&&i.lineWidth(k),U=k)}function nt(k,de,te){k?(K(i.POLYGON_OFFSET_FILL),(D!==de||N!==te)&&(D=de,N=te,a.getReversed()&&(de=-de),i.polygonOffset(de,te))):ae(i.POLYGON_OFFSET_FILL)}function Ve(k){k?K(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function mt(k){k===void 0&&(k=i.TEXTURE0+J-1),ee!==k&&(i.activeTexture(k),ee=k)}function F(k,de,te){te===void 0&&(ee===null?te=i.TEXTURE0+J-1:te=ee);let fe=ne[te];fe===void 0&&(fe={type:void 0,texture:void 0},ne[te]=fe),(fe.type!==k||fe.texture!==de)&&(ee!==te&&(i.activeTexture(te),ee=te),i.bindTexture(k,de||G[k]),fe.type=k,fe.texture=de)}function Mt(){const k=ne[ee];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function et(){try{i.compressedTexImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function x(){try{i.texSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function H(){try{i.texSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function T(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function V(){try{i.texStorage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function X(){try{i.texStorage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function z(){try{i.texImage2D(...arguments)}catch(k){Je("WebGLState:",k)}}function W(){try{i.texImage3D(...arguments)}catch(k){Je("WebGLState:",k)}}function re(k){return d[k]!==void 0?d[k]:i.getParameter(k)}function ue(k,de){d[k]!==de&&(i.pixelStorei(k,de),d[k]=de)}function le(k){$e.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),$e.copy(k))}function oe(k){Be.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Be.copy(k))}function be(k,de){let te=c.get(de);te===void 0&&(te=new WeakMap,c.set(de,te));let fe=te.get(k);fe===void 0&&(fe=i.getUniformBlockIndex(de,k.name),te.set(k,fe))}function Ue(k,de){const fe=c.get(de).get(k);l.get(de)!==fe&&(i.uniformBlockBinding(de,fe,k.__bindingPointIndex),l.set(de,fe))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,ne={},h={},p=new WeakMap,g=[],y=null,m=!1,f=null,S=null,R=null,v=null,M=null,w=null,A=null,_=new ke(0,0,0),E=0,L=!1,I=null,C=null,U=null,D=null,N=null,$e.set(0,0,i.canvas.width,i.canvas.height),Be.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:ae,bindFramebuffer:ge,drawBuffers:ce,useProgram:ve,setBlending:Fe,setMaterial:Le,setFlipSided:he,setCullFace:Ie,setLineWidth:dt,setPolygonOffset:nt,setScissorTest:Ve,activeTexture:mt,bindTexture:F,unbindTexture:Mt,compressedTexImage2D:et,compressedTexImage3D:P,texImage2D:z,texImage3D:W,pixelStorei:ue,getParameter:re,updateUBOMapping:be,uniformBlockBinding:Ue,texStorage2D:V,texStorage3D:X,texSubImage2D:x,texSubImage3D:H,compressedTexSubImage2D:$,compressedTexSubImage3D:T,scissor:le,viewport:oe,reset:Ge}}function Qv(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,x){return g?new OffscreenCanvas(P,x):Ls("canvas")}function m(P,x,H){let $=1;const T=et(P);if((T.width>H||T.height>H)&&($=H/Math.max(T.width,T.height)),$<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const V=Math.floor($*T.width),X=Math.floor($*T.height);h===void 0&&(h=y(V,X));const z=x?y(V,X):h;return z.width=V,z.height=X,z.getContext("2d").drawImage(P,0,0,V,X),Oe("WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+V+"x"+X+")."),z}else return"data"in P&&Oe("WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),P;return P}function f(P){return P.generateMipmaps}function S(P){i.generateMipmap(P)}function R(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,x,H,$,T,V=!1){if(P!==null){if(i[P]!==void 0)return i[P];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let X;$&&(X=e.get("EXT_texture_norm16"),X||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=x;if(x===i.RED&&(H===i.FLOAT&&(z=i.R32F),H===i.HALF_FLOAT&&(z=i.R16F),H===i.UNSIGNED_BYTE&&(z=i.R8),H===i.UNSIGNED_SHORT&&X&&(z=X.R16_EXT),H===i.SHORT&&X&&(z=X.R16_SNORM_EXT)),x===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.R8UI),H===i.UNSIGNED_SHORT&&(z=i.R16UI),H===i.UNSIGNED_INT&&(z=i.R32UI),H===i.BYTE&&(z=i.R8I),H===i.SHORT&&(z=i.R16I),H===i.INT&&(z=i.R32I)),x===i.RG&&(H===i.FLOAT&&(z=i.RG32F),H===i.HALF_FLOAT&&(z=i.RG16F),H===i.UNSIGNED_BYTE&&(z=i.RG8),H===i.UNSIGNED_SHORT&&X&&(z=X.RG16_EXT),H===i.SHORT&&X&&(z=X.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RG8UI),H===i.UNSIGNED_SHORT&&(z=i.RG16UI),H===i.UNSIGNED_INT&&(z=i.RG32UI),H===i.BYTE&&(z=i.RG8I),H===i.SHORT&&(z=i.RG16I),H===i.INT&&(z=i.RG32I)),x===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(z=i.RGB16UI),H===i.UNSIGNED_INT&&(z=i.RGB32UI),H===i.BYTE&&(z=i.RGB8I),H===i.SHORT&&(z=i.RGB16I),H===i.INT&&(z=i.RGB32I)),x===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),H===i.UNSIGNED_INT&&(z=i.RGBA32UI),H===i.BYTE&&(z=i.RGBA8I),H===i.SHORT&&(z=i.RGBA16I),H===i.INT&&(z=i.RGBA32I)),x===i.RGB&&(H===i.UNSIGNED_SHORT&&X&&(z=X.RGB16_EXT),H===i.SHORT&&X&&(z=X.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(z=i.R11F_G11F_B10F)),x===i.RGBA){const W=V?Ps:Ze.getTransfer(T);H===i.FLOAT&&(z=i.RGBA32F),H===i.HALF_FLOAT&&(z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(z=W===ot?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&X&&(z=X.RGBA16_EXT),H===i.SHORT&&X&&(z=X.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function M(P,x){let H;return P?x===null||x===_n||x===Yi?H=i.DEPTH24_STENCIL8:x===an?H=i.DEPTH32F_STENCIL8:x===yr&&(H=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_n||x===Yi?H=i.DEPTH_COMPONENT24:x===an?H=i.DEPTH_COMPONENT32F:x===yr&&(H=i.DEPTH_COMPONENT16),H}function w(P,x){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==_t&&P.minFilter!==st?Math.log2(Math.max(x.width,x.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?x.mipmaps.length:1}function A(P){const x=P.target;x.removeEventListener("dispose",A),E(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&d.delete(x)}function _(P){const x=P.target;x.removeEventListener("dispose",_),I(x)}function E(P){const x=n.get(P);if(x.__webglInit===void 0)return;const H=P.source,$=p.get(H);if($){const T=$[x.__cacheKey];T.usedTimes--,T.usedTimes===0&&L(P),Object.keys($).length===0&&p.delete(H)}n.remove(P)}function L(P){const x=n.get(P);i.deleteTexture(x.__webglTexture);const H=P.source,$=p.get(H);delete $[x.__cacheKey],a.memory.textures--}function I(P){const x=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let T=0;T<x.__webglFramebuffer[$].length;T++)i.deleteFramebuffer(x.__webglFramebuffer[$][T]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const H=P.textures;for(let $=0,T=H.length;$<T;$++){const V=n.get(H[$]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(H[$])}n.remove(P)}let C=0;function U(){C=0}function D(){return C}function N(P){C=P}function J(){const P=C;return P>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function Z(P){const x=[];return x.push(P.wrapS),x.push(P.wrapT),x.push(P.wrapR||0),x.push(P.magFilter),x.push(P.minFilter),x.push(P.anisotropy),x.push(P.internalFormat),x.push(P.format),x.push(P.type),x.push(P.generateMipmaps),x.push(P.premultiplyAlpha),x.push(P.flipY),x.push(P.unpackAlignment),x.push(P.colorSpace),x.join()}function ie(P,x){const H=n.get(P);if(P.isVideoTexture&&F(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const $=P.image;if($===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(H,P,x);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+x)}function j(P,x){const H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ae(H,P,x);return}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+x)}function ee(P,x){const H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ae(H,P,x);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+x)}function ne(P,x){const H=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&H.__version!==P.version){ge(H,P,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+x)}const Re={[As]:i.REPEAT,[Rn]:i.CLAMP_TO_EDGE,[Qa]:i.MIRRORED_REPEAT},Te={[_t]:i.NEAREST,[Vd]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[st]:i.LINEAR,[ta]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},$e={[Yd]:i.NEVER,[Qd]:i.ALWAYS,[$d]:i.LESS,[el]:i.LEQUAL,[Kd]:i.EQUAL,[tl]:i.GEQUAL,[Zd]:i.GREATER,[Jd]:i.NOTEQUAL};function Be(P,x){if(x.type===an&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===st||x.magFilter===ta||x.magFilter===Ur||x.magFilter===ri||x.minFilter===st||x.minFilter===ta||x.minFilter===Ur||x.minFilter===ri)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Re[x.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Re[x.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Re[x.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Te[x.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Te[x.minFilter]),x.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,$e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===_t||x.minFilter!==Ur&&x.minFilter!==ri||x.type===an&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function He(P,x){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,x.addEventListener("dispose",A));const $=x.source;let T=p.get($);T===void 0&&(T={},p.set($,T));const V=Z(x);if(V!==P.__cacheKey){T[V]===void 0&&(T[V]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),T[V].usedTimes++;const X=T[P.__cacheKey];X!==void 0&&(T[P.__cacheKey].usedTimes--,X.usedTimes===0&&L(x)),P.__cacheKey=V,P.__webglTexture=T[V].texture}return H}function G(P,x,H){return Math.floor(Math.floor(P/H)/x)}function K(P,x,H,$){const V=P.updateRanges;if(V.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,H,$,x.data);else{V.sort((ue,le)=>ue.start-le.start);let X=0;for(let ue=1;ue<V.length;ue++){const le=V[X],oe=V[ue],be=le.start+le.count,Ue=G(oe.start,x.width,4),Ge=G(le.start,x.width,4);oe.start<=be+1&&Ue===Ge&&G(oe.start+oe.count-1,x.width,4)===Ue?le.count=Math.max(le.count,oe.start+oe.count-le.start):(++X,V[X]=oe)}V.length=X+1;const z=t.getParameter(i.UNPACK_ROW_LENGTH),W=t.getParameter(i.UNPACK_SKIP_PIXELS),re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ue=0,le=V.length;ue<le;ue++){const oe=V[ue],be=Math.floor(oe.start/4),Ue=Math.ceil(oe.count/4),Ge=be%x.width,k=Math.floor(be/x.width),de=Ue,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Ge,k,de,te,H,$,x.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,W),t.pixelStorei(i.UNPACK_SKIP_ROWS,re)}}function ae(P,x,H){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const T=He(P,x),V=x.source;t.bindTexture($,P.__webglTexture,i.TEXTURE0+H);const X=n.get(V);if(V.version!==X.__version||T===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const te=Ze.getPrimaries(Ze.workingColorSpace),fe=x.colorSpace===fn?null:Ze.getPrimaries(x.colorSpace),xe=x.colorSpace===fn||te===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let W=m(x.image,!1,r.maxTextureSize);W=Mt(x,W);const re=s.convert(x.format,x.colorSpace),ue=s.convert(x.type);let le=v(x.internalFormat,re,ue,x.normalized,x.colorSpace,x.isVideoTexture);Be($,x);let oe;const be=x.mipmaps,Ue=x.isVideoTexture!==!0,Ge=X.__version===void 0||T===!0,k=V.dataReady,de=w(x,W);if(x.isDepthTexture)le=M(x.format===Wn,x.type),Ge&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,le,W.width,W.height):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,re,ue,null));else if(x.isDataTexture)if(be.length>0){Ue&&Ge&&t.texStorage2D(i.TEXTURE_2D,de,le,be[0].width,be[0].height);for(let te=0,fe=be.length;te<fe;te++)oe=be[te],Ue?k&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,re,ue,oe.data):t.texImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,re,ue,oe.data);x.generateMipmaps=!1}else Ue?(Ge&&t.texStorage2D(i.TEXTURE_2D,de,le,W.width,W.height),k&&K(x,W,re,ue)):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,re,ue,W.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ue&&Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,le,be[0].width,be[0].height,W.depth);for(let te=0,fe=be.length;te<fe;te++)if(oe=be[te],x.format!==Qt)if(re!==null)if(Ue){if(k)if(x.layerUpdates.size>0){const xe=xc(oe.width,oe.height,x.format,x.type);for(const se of x.layerUpdates){const De=oe.data.subarray(se*xe/oe.data.BYTES_PER_ELEMENT,(se+1)*xe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,se,oe.width,oe.height,1,re,De)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,W.depth,re,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,le,oe.width,oe.height,W.depth,0,oe.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,W.depth,re,ue,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,le,oe.width,oe.height,W.depth,0,re,ue,oe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ue&&Ge&&t.texStorage2D(i.TEXTURE_2D,de,le,be[0].width,be[0].height);for(let te=0,fe=be.length;te<fe;te++)oe=be[te],x.format!==Qt?re!==null?Ue?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,re,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,oe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?k&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,re,ue,oe.data):t.texImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,re,ue,oe.data)}else if(x.isDataArrayTexture)if(Ue){if(Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,le,W.width,W.height,W.depth),k)if(x.layerUpdates.size>0){const te=xc(W.width,W.height,x.format,x.type);for(const fe of x.layerUpdates){const xe=W.data.subarray(fe*te/W.data.BYTES_PER_ELEMENT,(fe+1)*te/W.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,W.width,W.height,1,re,ue,xe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,re,ue,W.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,W.width,W.height,W.depth,0,re,ue,W.data);else if(x.isData3DTexture)Ue?(Ge&&t.texStorage3D(i.TEXTURE_3D,de,le,W.width,W.height,W.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,re,ue,W.data)):t.texImage3D(i.TEXTURE_3D,0,le,W.width,W.height,W.depth,0,re,ue,W.data);else if(x.isFramebufferTexture){if(Ge)if(Ue)t.texStorage2D(i.TEXTURE_2D,de,le,W.width,W.height);else{let te=W.width,fe=W.height;for(let xe=0;xe<de;xe++)t.texImage2D(i.TEXTURE_2D,xe,le,te,fe,0,re,ue,null),te>>=1,fe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),W.parentNode!==te){te.appendChild(W),d.add(x),te.onpaint=fe=>{const xe=fe.changedElements;for(const se of d)xe.includes(se.image)&&(se.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,W);else{const xe=i.RGBA,se=i.RGBA,De=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,se,De,W)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(Ue&&Ge){const te=et(be[0]);t.texStorage2D(i.TEXTURE_2D,de,le,te.width,te.height)}for(let te=0,fe=be.length;te<fe;te++)oe=be[te],Ue?k&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,re,ue,oe):t.texImage2D(i.TEXTURE_2D,te,le,re,ue,oe);x.generateMipmaps=!1}else if(Ue){if(Ge){const te=et(W);t.texStorage2D(i.TEXTURE_2D,de,le,te.width,te.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,ue,W)}else t.texImage2D(i.TEXTURE_2D,0,le,re,ue,W);f(x)&&S($),X.__version=V.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function ge(P,x,H){if(x.image.length!==6)return;const $=He(P,x),T=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);const V=n.get(T);if(T.version!==V.__version||$===!0){t.activeTexture(i.TEXTURE0+H);const X=Ze.getPrimaries(Ze.workingColorSpace),z=x.colorSpace===fn?null:Ze.getPrimaries(x.colorSpace),W=x.colorSpace===fn||X===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);const re=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,le=[];for(let se=0;se<6;se++)!re&&!ue?le[se]=m(x.image[se],!0,r.maxCubemapSize):le[se]=ue?x.image[se].image:x.image[se],le[se]=Mt(x,le[se]);const oe=le[0],be=s.convert(x.format,x.colorSpace),Ue=s.convert(x.type),Ge=v(x.internalFormat,be,Ue,x.normalized,x.colorSpace),k=x.isVideoTexture!==!0,de=V.__version===void 0||$===!0,te=T.dataReady;let fe=w(x,oe);Be(i.TEXTURE_CUBE_MAP,x);let xe;if(re){k&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Ge,oe.width,oe.height);for(let se=0;se<6;se++){xe=le[se].mipmaps;for(let De=0;De<xe.length;De++){const Ae=xe[De];x.format!==Qt?be!==null?k?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,0,0,Ae.width,Ae.height,be,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,Ge,Ae.width,Ae.height,0,Ae.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,0,0,Ae.width,Ae.height,be,Ue,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,Ge,Ae.width,Ae.height,0,be,Ue,Ae.data)}}}else{if(xe=x.mipmaps,k&&de){xe.length>0&&fe++;const se=et(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Ge,se.width,se.height)}for(let se=0;se<6;se++)if(ue){k?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,le[se].width,le[se].height,be,Ue,le[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ge,le[se].width,le[se].height,0,be,Ue,le[se].data);for(let De=0;De<xe.length;De++){const ft=xe[De].image[se].image;k?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,0,0,ft.width,ft.height,be,Ue,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,Ge,ft.width,ft.height,0,be,Ue,ft.data)}}else{k?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,be,Ue,le[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ge,be,Ue,le[se]);for(let De=0;De<xe.length;De++){const Ae=xe[De];k?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,0,0,be,Ue,Ae.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,Ge,be,Ue,Ae.image[se])}}}f(x)&&S(i.TEXTURE_CUBE_MAP),V.__version=T.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function ce(P,x,H,$,T,V){const X=s.convert(H.format,H.colorSpace),z=s.convert(H.type),W=v(H.internalFormat,X,z,H.normalized,H.colorSpace),re=n.get(x),ue=n.get(H);if(ue.__renderTarget=x,!re.__hasExternalTextures){const le=Math.max(1,x.width>>V),oe=Math.max(1,x.height>>V);T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?t.texImage3D(T,V,W,le,oe,x.depth,0,X,z,null):t.texImage2D(T,V,W,le,oe,0,X,z,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,T,ue.__webglTexture,0,Ve(x)):(T===i.TEXTURE_2D||T>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,T,ue.__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ve(P,x,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),x.depthBuffer){const $=x.depthTexture,T=$&&$.isDepthTexture?$.type:null,V=M(x.stencilBuffer,T),X=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve(x),V,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve(x),V,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,V,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,P)}else{const $=x.textures;for(let T=0;T<$.length;T++){const V=$[T],X=s.convert(V.format,V.colorSpace),z=s.convert(V.type),W=v(V.internalFormat,X,z,V.normalized,V.colorSpace);mt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve(x),W,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve(x),W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function tt(P,x,H){const $=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const T=n.get(x.depthTexture);if(T.__renderTarget=x,(!T.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$){if(T.__webglInit===void 0&&(T.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),T.__webglTexture===void 0){T.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture),Be(i.TEXTURE_CUBE_MAP,x.depthTexture);const re=s.convert(x.depthTexture.format),ue=s.convert(x.depthTexture.type);let le;x.depthTexture.format===Un?le=i.DEPTH_COMPONENT24:x.depthTexture.format===Wn&&(le=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,le,x.width,x.height,0,re,ue,null)}}else ie(x.depthTexture,0);const V=T.__webglTexture,X=Ve(x),z=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,W=x.depthTexture.format===Wn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Un)mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,z,V,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,W,z,V,0);else if(x.depthTexture.format===Wn)mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,z,V,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,W,z,V,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(P){const x=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==P.depthTexture){const $=P.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const T=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",T)};$.addEventListener("dispose",T),x.__depthDisposeCallback=T}x.__boundDepthTexture=$}if(P.depthTexture&&!x.__autoAllocateDepthBuffer)if(H)for(let $=0;$<6;$++)tt(x.__webglFramebuffer[$],P,$);else{const $=P.texture.mipmaps;$&&$.length>0?tt(x.__webglFramebuffer[0],P,0):tt(x.__webglFramebuffer,P,0)}else if(H){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),ve(x.__webglDepthbuffer[$],P,!1);else{const T=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,V)}}else{const $=P.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ve(x.__webglDepthbuffer,P,!1);else{const T=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,V)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(P,x,H){const $=n.get(P);x!==void 0&&ce($.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ne(P)}function Le(P){const x=P.texture,H=n.get(P),$=n.get(x);P.addEventListener("dispose",_);const T=P.textures,V=P.isWebGLCubeRenderTarget===!0,X=T.length>1;if(X||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),V){H.__webglFramebuffer=[];for(let z=0;z<6;z++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[z]=[];for(let W=0;W<x.mipmaps.length;W++)H.__webglFramebuffer[z][W]=i.createFramebuffer()}else H.__webglFramebuffer[z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let z=0;z<x.mipmaps.length;z++)H.__webglFramebuffer[z]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(X)for(let z=0,W=T.length;z<W;z++){const re=n.get(T[z]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&mt(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let z=0;z<T.length;z++){const W=T[z];H.__webglColorRenderbuffer[z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[z]);const re=s.convert(W.format,W.colorSpace),ue=s.convert(W.type),le=v(W.internalFormat,re,ue,W.normalized,W.colorSpace,P.isXRRenderTarget===!0),oe=Ve(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,le,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,H.__webglColorRenderbuffer[z])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ve(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(V){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Be(i.TEXTURE_CUBE_MAP,x);for(let z=0;z<6;z++)if(x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)ce(H.__webglFramebuffer[z][W],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,W);else ce(H.__webglFramebuffer[z],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);f(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let z=0,W=T.length;z<W;z++){const re=T[z],ue=n.get(re);let le=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Be(le,re),ce(H.__webglFramebuffer,P,re,i.COLOR_ATTACHMENT0+z,le,0),f(re)&&S(le)}t.unbindTexture()}else{let z=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(z=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(z,$.__webglTexture),Be(z,x),x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)ce(H.__webglFramebuffer[W],P,x,i.COLOR_ATTACHMENT0,z,W);else ce(H.__webglFramebuffer,P,x,i.COLOR_ATTACHMENT0,z,0);f(x)&&S(z),t.unbindTexture()}P.depthBuffer&&Ne(P)}function he(P){const x=P.textures;for(let H=0,$=x.length;H<$;H++){const T=x[H];if(f(T)){const V=R(P),X=n.get(T).__webglTexture;t.bindTexture(V,X),S(V),t.unbindTexture()}}}const Ie=[],dt=[];function nt(P){if(P.samples>0){if(mt(P)===!1){const x=P.textures,H=P.width,$=P.height;let T=i.COLOR_BUFFER_BIT;const V=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=n.get(P),z=x.length>1;if(z)for(let re=0;re<x.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);const W=P.texture.mipmaps;W&&W.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let re=0;re<x.length;re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(T|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(T|=i.STENCIL_BUFFER_BIT)),z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,X.__webglColorRenderbuffer[re]);const ue=n.get(x[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ue,0)}i.blitFramebuffer(0,0,H,$,0,0,H,$,T,i.NEAREST),l===!0&&(Ie.length=0,dt.length=0,Ie.push(i.COLOR_ATTACHMENT0+re),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Ie.push(V),dt.push(V),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),z)for(let re=0;re<x.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,X.__webglColorRenderbuffer[re]);const ue=n.get(x[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const x=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ve(P){return Math.min(r.maxSamples,P.samples)}function mt(P){const x=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function F(P){const x=a.render.frame;u.get(P)!==x&&(u.set(P,x),P.update())}function Mt(P,x){const H=P.colorSpace,$=P.format,T=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Sr&&H!==fn&&(Ze.getTransfer(H)===ot?($!==Qt||T!==zt)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",H)),x}function et(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=N,this.setTexture2D=ie,this.setTexture2DArray=j,this.setTexture3D=ee,this.setTextureCube=ne,this.rebindTextures=Fe,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jv(i,e){function t(n,r=fn){let s;const a=Ze.getTransfer(r);if(n===zt)return i.UNSIGNED_BYTE;if(n===Ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Zo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Iu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lu)return i.BYTE;if(n===Du)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===$o)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===on)return i.HALF_FLOAT;if(n===Nu)return i.ALPHA;if(n===Fu)return i.RGB;if(n===Qt)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===Wn)return i.DEPTH_STENCIL;if(n===Tr)return i.RED;if(n===Jo)return i.RED_INTEGER;if(n===oi)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===jo)return i.RGBA_INTEGER;if(n===vs||n===_s||n===xs||n===ys)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===vs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===vs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ys)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ja||n===eo||n===to||n===no)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ja)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===ro||n===so||n===ao||n===oo||n===Rs||n===lo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===io||n===ro)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===so)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===ao)return s.COMPRESSED_R11_EAC;if(n===oo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Rs)return s.COMPRESSED_RG11_EAC;if(n===lo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===co||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo||n===yo||n===So||n===Mo||n===bo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===co)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wo||n===Eo||n===To)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===wo)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===To)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ao||n===Ro||n===Cs||n===Co)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ao)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const e_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t_=`
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

}`;class n_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Et({vertexShader:e_,fragmentShader:t_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i_ extends ci{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const y=typeof XRWebGLBinding<"u",m=new n_,f={},S=t.getContextAttributes();let R=null,v=null;const M=[],w=[],A=new Me;let _=null,E=null;const L=new Kt;L.viewport=new je;const I=new Kt;I.viewport=new je;const C=[L,I],U=new up;let D=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let K=M[G];return K===void 0&&(K=new la,M[G]=K),K.getTargetRaySpace()},this.getControllerGrip=function(G){let K=M[G];return K===void 0&&(K=new la,M[G]=K),K.getGripSpace()},this.getHand=function(G){let K=M[G];return K===void 0&&(K=new la,M[G]=K),K.getHandSpace()};function J(G){const K=w.indexOf(G.inputSource);if(K===-1)return;const ae=M[K];ae!==void 0&&(ae.update(G.inputSource,G.frame,c||a),ae.dispatchEvent({type:G.type,data:G.inputSource}))}function Z(){r.removeEventListener("select",J),r.removeEventListener("selectstart",J),r.removeEventListener("selectend",J),r.removeEventListener("squeeze",J),r.removeEventListener("squeezestart",J),r.removeEventListener("squeezeend",J),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",ie);for(let G=0;G<M.length;G++){const K=w[G];K!==null&&(w[G]=null,M[G].disconnect(K))}D=null,N=null,m.reset();for(const G in f)delete f[G];if(e.setRenderTarget(R),p=null,h=null,d=null,r=null,v=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),E!==null){const G=E.camera;G.fov=E.fov,G.zoom=E.zoom,G.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",J),r.addEventListener("selectstart",J),r.addEventListener("selectend",J),r.addEventListener("squeeze",J),r.addEventListener("squeezestart",J),r.addEventListener("squeezeend",J),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ge=null,ce=null;S.depth&&(ce=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=S.stencil?Wn:Un,ge=S.stencil?Yi:_n);const ve={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(ve),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Xt(h.textureWidth,h.textureHeight,{format:Qt,type:zt,depthTexture:new $i(h.textureWidth,h.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const ae={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Xt(p.framebufferWidth,p.framebufferHeight,{format:Qt,type:zt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),He.setContext(r),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(G){for(let K=0;K<G.removed.length;K++){const ae=G.removed[K],ge=w.indexOf(ae);ge>=0&&(w[ge]=null,M[ge].disconnect(ae))}for(let K=0;K<G.added.length;K++){const ae=G.added[K];let ge=w.indexOf(ae);if(ge===-1){for(let ve=0;ve<M.length;ve++)if(ve>=w.length){w.push(ae),ge=ve;break}else if(w[ve]===null){w[ve]=ae,ge=ve;break}if(ge===-1)break}const ce=M[ge];ce&&ce.connect(ae)}}const j=new B,ee=new B;function ne(G,K,ae){j.setFromMatrixPosition(K.matrixWorld),ee.setFromMatrixPosition(ae.matrixWorld);const ge=j.distanceTo(ee),ce=K.projectionMatrix.elements,ve=ae.projectionMatrix.elements,tt=ce[14]/(ce[10]-1),Ne=ce[14]/(ce[10]+1),Fe=(ce[9]+1)/ce[5],Le=(ce[9]-1)/ce[5],he=(ce[8]-1)/ce[0],Ie=(ve[8]+1)/ve[0],dt=tt*he,nt=tt*Ie,Ve=ge/(-he+Ie),mt=Ve*-he;if(K.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(mt),G.translateZ(Ve),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ce[10]===-1)G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const F=tt+Ve,Mt=Ne+Ve,et=dt-mt,P=nt+(ge-mt),x=Fe*Ne/Mt*F,H=Le*Ne/Mt*F;G.projectionMatrix.makePerspective(et,P,x,H,F,Mt),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Re(G,K){K===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(K.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let K=G.near,ae=G.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),U.near=I.near=L.near=K,U.far=I.far=L.far=ae,(D!==U.near||N!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,N=U.far),U.layers.mask=G.layers.mask|6,L.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;const ge=G.parent,ce=U.cameras;Re(U,ge);for(let ve=0;ve<ce.length;ve++)Re(ce[ve],ge);ce.length===2?ne(U,L,I):U.projectionMatrix.copy(L.projectionMatrix),E===null&&G.isPerspectiveCamera&&(E={camera:G,fov:G.fov,zoom:G.zoom}),Te(G,U,ge)};function Te(G,K,ae){ae===null?G.matrix.copy(K.matrixWorld):(G.matrix.copy(ae.matrixWorld),G.matrix.invert(),G.matrix.multiply(K.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=br*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(G){return f[G]};let $e=null;function Be(G,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ge=!1;ae.length!==U.cameras.length&&(U.cameras.length=0,ge=!0);for(let Ne=0;Ne<ae.length;Ne++){const Fe=ae[Ne];let Le=null;if(p!==null)Le=p.getViewport(Fe);else{const Ie=d.getViewSubImage(h,Fe);Le=Ie.viewport,Ne===0&&(e.setRenderTargetTextures(v,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(v))}let he=C[Ne];he===void 0&&(he=new Kt,he.layers.enable(Ne),he.viewport=new je,C[Ne]=he),he.matrix.fromArray(Fe.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(Fe.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Le.x,Le.y,Le.width,Le.height),Ne===0&&(U.matrix.copy(he.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ge===!0&&U.cameras.push(he)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const Ne=d.getDepthInformation(ae[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,r.renderState)}if(ce&&ce.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Ne=0;Ne<ae.length;Ne++){const Fe=ae[Ne].camera;if(Fe){let Le=f[Fe];Le||(Le=new Xu,f[Fe]=Le);const he=d.getCameraImage(Fe);Le.sourceTexture=he}}}}for(let ae=0;ae<M.length;ae++){const ge=w[ae],ce=M[ae];ge!==null&&ce!==void 0&&ce.update(ge,K,c||a)}$e&&$e(G,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const He=new Zu;He.setAnimationLoop(Be),this.setAnimationLoop=function(G){$e=G},this.dispose=function(){}}}const r_=new at,ih=new ze;ih.set(-1,0,0,0,1,0,0,0,1);function s_(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,qu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,R,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,R):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ht&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ht&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),R=S.envMap,v=S.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(r_.makeRotationFromEuler(v)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ih),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,R){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=R*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ht&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function a_(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const w=M.program;n.uniformBlockBinding(v,w)}function c(v,M){let w=r[v.id];w===void 0&&(m(v),w=u(v),r[v.id]=w,v.addEventListener("dispose",S));const A=M.program;n.updateUBOMapping(v,A);const _=e.render.frame;s[v.id]!==_&&(h(v),s[v.id]=_)}function u(v){const M=d();v.__bindingPointIndex=M;const w=i.createBuffer(),A=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,A,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,w),w}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const M=r[v.id],w=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let _=0,E=w.length;_<E;_++){const L=w[_];if(Array.isArray(L))for(let I=0,C=L.length;I<C;I++)p(L[I],_,I,A);else p(L,_,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,M,w,A){if(y(v,M,w,A)===!0){const _=v.__offset,E=v.value;if(Array.isArray(E)){let L=0;for(let I=0;I<E.length;I++){const C=E[I],U=f(C);g(C,v.__data,L),typeof C!="number"&&typeof C!="boolean"&&!C.isMatrix3&&!ArrayBuffer.isView(C)&&(L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function g(v,M,w){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,w)}function y(v,M,w,A){const _=v.value,E=M+"_"+w;if(A[E]===void 0)return typeof _=="number"||typeof _=="boolean"?A[E]=_:ArrayBuffer.isView(_)?A[E]=_.slice():A[E]=_.clone(),!0;{const L=A[E];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return A[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function m(v){const M=v.uniforms;let w=0;const A=16;for(let E=0,L=M.length;E<L;E++){const I=Array.isArray(M[E])?M[E]:[M[E]];for(let C=0,U=I.length;C<U;C++){const D=I[C],N=Array.isArray(D.value)?D.value:[D.value];for(let J=0,Z=N.length;J<Z;J++){const ie=N[J],j=f(ie),ee=w%A,ne=ee%j.boundary,Re=ee+ne;w+=ne,Re!==0&&A-Re<j.storage&&(w+=A-Re),D.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=j.storage}}}const _=w%A;return _>0&&(w+=A-_),v.__size=w,v.__cache={},this}function f(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",v),M}function S(v){const M=v.target;M.removeEventListener("dispose",S);const w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function R(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:R}}const o_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hn=null;function l_(){return hn===null&&(hn=new fi(o_,16,16,oi,on),hn.name="DFG_LUT",hn.minFilter=st,hn.magFilter=st,hn.wrapS=Rn,hn.wrapT=Rn,hn.generateMipmaps=!1,hn.needsUpdate=!0),hn}class c_{constructor(e={}){const{canvas:t=ef(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=zt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=p,m=new Set([jo,Qo,Jo]),f=new Set([zt,_n,yr,Yi,Ko,Zo]),S=new Uint32Array(4),R=new Int32Array(4),v=new B;let M=null,w=null;const A=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let I=!1,C=null,U=null,D=null,N=null;this._outputColorSpace=$t;let J=0,Z=0,ie=null,j=-1,ee=null;const ne=new je,Re=new je;let Te=null;const $e=new ke(0);let Be=0,He=t.width,G=t.height,K=1,ae=null,ge=null;const ce=new je(0,0,He,G),ve=new je(0,0,He,G);let tt=!1;const Ne=new sl;let Fe=!1,Le=!1;const he=new at,Ie=new B,dt=new je,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function mt(){return ie===null?K:1}let F=n;function Mt(b,O){return t.getContext(b,O)}let et,P,x,H,$,T,V,X,z,W,re,ue,le,oe,be,Ue,Ge,k,de,te,fe,xe,se;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yo}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",jt,!1),F===null){const O="webgl2";if(F=Mt(O,b),F===null)throw Mt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(b){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",jt,!1),Je("WebGLRenderer: "+b.message),b}function De(){et=new l0(F),et.init(),fe=new jv(F,et),P=new Qg(F,et,e,fe),x=new Jv(F,et),P.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),U=F.createFramebuffer(),D=F.createFramebuffer(),N=F.createFramebuffer(),H=new h0(F),$=new Ov,T=new Qv(F,et,x,$,P,fe,H),V=new o0(L),X=new fp(F),xe=new Zg(F,X),z=new c0(F,X,H,xe),W=new f0(F,z,X,xe,H),k=new d0(F,P,T),be=new jg($),re=new Fv(L,V,et,P,xe,be),ue=new s_(L,$),le=new Bv,oe=new Xv(et),Ge=new Kg(L,V,x,W,g,l),Ue=new Zv(L,W,P),se=new a_(F,H,P,x),de=new Jg(F,et,H),te=new u0(F,et,H),H.programs=re.programs,L.capabilities=P,L.extensions=et,L.properties=$,L.renderLists=le,L.shadowMap=Ue,L.state=x,L.info=H}y!==zt&&(E=new m0(y,t.width,t.height,o,r,s));const Ae=new i_(L,F);this.xr=Ae,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=et.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=et.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(He,G,!1))},this.getSize=function(b){return b.set(He,G)},this.setSize=function(b,O,Q=!0){if(Ae.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}He=b,G=O,t.width=Math.floor(b*K),t.height=Math.floor(O*K),Q===!0&&(t.style.width=b+"px",t.style.height=O+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(He*K,G*K).floor()},this.setDrawingBufferSize=function(b,O,Q){He=b,G=O,K=Q,t.width=Math.floor(b*Q),t.height=Math.floor(O*Q),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(y===zt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(ce)},this.setViewport=function(b,O,Q,q){b.isVector4?ce.set(b.x,b.y,b.z,b.w):ce.set(b,O,Q,q),x.viewport(ne.copy(ce).multiplyScalar(K).round())},this.getScissor=function(b){return b.copy(ve)},this.setScissor=function(b,O,Q,q){b.isVector4?ve.set(b.x,b.y,b.z,b.w):ve.set(b,O,Q,q),x.scissor(Re.copy(ve).multiplyScalar(K).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(b){x.setScissorTest(tt=b)},this.setOpaqueSort=function(b){ae=b},this.setTransparentSort=function(b){ge=b},this.getClearColor=function(b){return b.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,Q=!0){let q=0;if(b){let Y=!1;if(ie!==null){const _e=ie.texture.format;Y=m.has(_e)}if(Y){const _e=ie.texture.type,Se=f.has(_e),me=Ge.getClearColor(),we=Ge.getClearAlpha(),Ce=me.r,We=me.g,qe=me.b;Se?(S[0]=Ce,S[1]=We,S[2]=qe,S[3]=we,F.clearBufferuiv(F.COLOR,0,S)):(R[0]=Ce,R[1]=We,R[2]=qe,R[3]=we,F.clearBufferiv(F.COLOR,0,R))}else q|=F.COLOR_BUFFER_BIT}O&&(q|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),C=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",jt,!1),Ge.dispose(),le.dispose(),oe.dispose(),$.dispose(),V.dispose(),W.dispose(),xe.dispose(),se.dispose(),re.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",_l),Ae.removeEventListener("sessionend",xl),Yn.stop()};function ft(b){b.preventDefault(),Ds("WebGLRenderer: Context Lost."),I=!0}function it(){Ds("WebGLRenderer: Context Restored."),I=!1;const b=H.autoReset,O=Ue.enabled,Q=Ue.autoUpdate,q=Ue.needsUpdate,Y=Ue.type;De(),H.autoReset=b,Ue.enabled=O,Ue.autoUpdate=Q,Ue.needsUpdate=q,Ue.type=Y}function jt(b){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ln(b){const O=b.target;O.removeEventListener("dispose",ln),Nh(O)}function Nh(b){Fh(b),$.remove(b)}function Fh(b){const O=$.get(b).programs;O!==void 0&&(O.forEach(function(Q){re.releaseProgram(Q)}),b.isShaderMaterial&&re.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,Q,q,Y,_e){O===null&&(O=nt);const Se=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,me=Bh(b,O,Q,q,Y);x.setMaterial(q,Se);let we=Q.index,Ce=1;if(q.wireframe===!0){if(we=z.getWireframeAttribute(Q),we===void 0)return;Ce=2}const We=Q.drawRange,qe=Q.attributes.position;let Ee=We.start*Ce,rt=(We.start+We.count)*Ce;_e!==null&&(Ee=Math.max(Ee,_e.start*Ce),rt=Math.min(rt,(_e.start+_e.count)*Ce)),we!==null?(Ee=Math.max(Ee,0),rt=Math.min(rt,we.count)):qe!=null&&(Ee=Math.max(Ee,0),rt=Math.min(rt,qe.count));const bt=rt-Ee;if(bt<0||bt===1/0)return;xe.setup(Y,q,me,Q,we);let gt,ht=de;if(we!==null&&(gt=X.get(we),ht=te,ht.setIndex(gt)),Y.isMesh)q.wireframe===!0?(x.setLineWidth(q.wireframeLinewidth*mt()),ht.setMode(F.LINES)):ht.setMode(F.TRIANGLES);else if(Y.isLine){let Lt=q.linewidth;Lt===void 0&&(Lt=1),x.setLineWidth(Lt*mt()),Y.isLineSegments?ht.setMode(F.LINES):Y.isLineLoop?ht.setMode(F.LINE_LOOP):ht.setMode(F.LINE_STRIP)}else Y.isPoints?ht.setMode(F.POINTS):Y.isSprite&&ht.setMode(F.TRIANGLES);if(Y.isBatchedMesh)if(et.get("WEBGL_multi_draw"))ht.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Lt=Y._multiDrawStarts,ye=Y._multiDrawCounts,It=Y._multiDrawCount,Qe=we?X.get(we).bytesPerElement:1,qt=$.get(q).currentProgram.getUniforms();for(let cn=0;cn<It;cn++)qt.setValue(F,"_gl_DrawID",cn),ht.render(Lt[cn]/Qe,ye[cn])}else if(Y.isInstancedMesh)ht.renderInstances(Ee,bt,Y.count);else if(Q.isInstancedBufferGeometry){const Lt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,ye=Math.min(Q.instanceCount,Lt);ht.renderInstances(Ee,bt,ye)}else ht.render(Ee,bt)};function vl(b,O,Q,q){C!==null&&b.isNodeMaterial&&C.setObject(q,b),Fe===!0&&be.setState(b,Q,!1),b.transparent===!0&&b.side===Zt&&b.forceSinglePass===!1?(b.side=Ht,b.needsUpdate=!0,Lr(b,O,q),b.side=si,b.needsUpdate=!0,Lr(b,O,q),b.side=Zt):Lr(b,O,q)}this.compile=function(b,O,Q=null){Q===null&&(Q=b),C!==null&&C.renderStart(b,O,Q),w=oe.get(Q),w.init(O),_.push(w),Q.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),b!==Q&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),w.setupLights(),C!==null&&C.updateLights(w.state.lightsArray),Le=this.localClippingEnabled,Fe=be.init(this.clippingPlanes,Le),Fe===!0&&be.setGlobalState(this.clippingPlanes,O),C!==null&&Ue.render(w.state.shadowsArray,Q,O);const q=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const _e=Y.material;if(_e)if(Array.isArray(_e))for(let Se=0;Se<_e.length;Se++){const me=_e[Se];vl(me,Q,O,Y),q.add(me)}else vl(_e,Q,O,Y),q.add(_e)}),w=_.pop(),C!==null&&C.renderEnd(),q},this.compileAsync=function(b,O,Q=null){const q=this.compile(b,O,Q);return new Promise(Y=>{function _e(){if(q.forEach(function(Se){const we=$.get(Se).currentProgram;(we===void 0||we.isReady())&&q.delete(Se)}),q.size===0){Y(b);return}setTimeout(_e,10)}et.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Ks=null;function Oh(b){Ks&&Ks(b)}function _l(){Yn.stop()}function xl(){Yn.start()}const Yn=new Zu;Yn.setAnimationLoop(Oh),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(b){Ks=b,Ae.setAnimationLoop(b),b===null?Yn.stop():Yn.start()},Ae.addEventListener("sessionstart",_l),Ae.addEventListener("sessionend",xl),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;C!==null&&C.renderStart(b,O);const Q=Ae.enabled===!0&&Ae.isPresenting===!0,q=E!==null&&(ie===null||Q)&&E.begin(L,ie);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(O),O=Ae.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,O,ie),w=oe.get(b,_.length),w.init(O),w.state.textureUnits=T.getTextureUnits(),_.push(w),he.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ne.setFromProjectionMatrix(he,gn,O.reversedDepth),Le=this.localClippingEnabled,Fe=be.init(this.clippingPlanes,Le),M=le.get(b,A.length),M.init(),A.push(M),Ae.enabled===!0&&Ae.isPresenting===!0){const Se=L.xr.getDepthSensingMesh();Se!==null&&Zs(Se,O,-1/0,L.sortObjects)}Zs(b,O,0,L.sortObjects),M.finish(),C!==null&&C.updateLights(w.state.lightsArray),L.sortObjects===!0&&M.sort(ae,ge),Ve=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,Ve&&Ge.addToRenderList(M,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&be.beginShadows();const Y=w.state.shadowsArray;if(Ue.render(Y,b,O),Fe===!0&&be.endShadows(),(q&&E.hasRenderPass())===!1){const Se=M.opaque,me=M.transmissive;if(w.setupLights(),O.isArrayCamera){const we=O.cameras;if(me.length>0)for(let Ce=0,We=we.length;Ce<We;Ce++){const qe=we[Ce];Sl(Se,me,b,qe)}Ve&&Ge.render(b);for(let Ce=0,We=we.length;Ce<We;Ce++){const qe=we[Ce];yl(M,b,qe,qe.viewport)}}else me.length>0&&Sl(Se,me,b,O),Ve&&Ge.render(b),yl(M,b,O)}ie!==null&&Z===0&&(T.updateMultisampleRenderTarget(ie),T.updateRenderTargetMipmap(ie)),q&&E.end(L),b.isScene===!0&&b.onAfterRender(L,b,O),xe.resetDefaultState(),j=-1,ee=null,_.pop(),_.length>0?(w=_[_.length-1],T.setTextureUnits(w.state.textureUnits),Fe===!0&&be.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,C!==null&&C.renderEnd()};function Zs(b,O,Q,q){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)Q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)w.pushLightProbeGrid(b);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Ne)){q&&dt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(he);const Se=W.update(b),me=b.material;me.visible&&M.push(b,Se,me,Q,dt.z,null,O)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Ne))){const Se=W.update(b),me=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),dt.copy(b.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),dt.copy(Se.boundingSphere.center)),dt.applyMatrix4(b.matrixWorld).applyMatrix4(he)),Array.isArray(me)){const we=Se.groups;for(let Ce=0,We=we.length;Ce<We;Ce++){const qe=we[Ce],Ee=me[qe.materialIndex];Ee&&Ee.visible&&M.push(b,Se,Ee,Q,dt.z,qe,O)}}else me.visible&&M.push(b,Se,me,Q,dt.z,null,O)}}const _e=b.children;for(let Se=0,me=_e.length;Se<me;Se++)Zs(_e[Se],O,Q,q)}function yl(b,O,Q,q){const{opaque:Y,transmissive:_e,transparent:Se}=b;w.setupLightsView(Q),Fe===!0&&be.setGlobalState(L.clippingPlanes,Q),q&&x.viewport(ne.copy(q)),Y.length>0&&Pr(Y,O,Q),_e.length>0&&Pr(_e,O,Q),Se.length>0&&Pr(Se,O,Q),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Sl(b,O,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[q.id]===void 0){const Ee=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[q.id]=new Xt(1,1,{generateMipmaps:!0,type:Ee?on:zt,minFilter:ri,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const _e=w.state.transmissionRenderTarget[q.id],Se=q.viewport||ne;_e.setSize(Se.z*L.transmissionResolutionScale,Se.w*L.transmissionResolutionScale);const me=L.getRenderTarget(),we=L.getActiveCubeFace(),Ce=L.getActiveMipmapLevel();L.setRenderTarget(_e),L.getClearColor($e),Be=L.getClearAlpha(),Be<1&&L.setClearColor(16777215,.5),L.clear(),Ve&&Ge.render(Q);const We=L.toneMapping;L.toneMapping=vn;const qe=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),w.setupLightsView(q),Fe===!0&&be.setGlobalState(L.clippingPlanes,q),Pr(b,Q,q),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e),et.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let rt=0,bt=O.length;rt<bt;rt++){const gt=O[rt],{object:ht,geometry:Lt,material:ye,group:It}=gt;if(ye.side===Zt&&ht.layers.test(q.layers)){const Qe=ye.side;ye.side=Ht,ye.needsUpdate=!0,Ml(ht,Q,q,Lt,ye,It),ye.side=Qe,ye.needsUpdate=!0,Ee=!0}}Ee===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e))}L.setRenderTarget(me,we,Ce),L.setClearColor($e,Be),qe!==void 0&&(q.viewport=qe),L.toneMapping=We}function Pr(b,O,Q){const q=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,_e=b.length;Y<_e;Y++){const Se=b[Y],{object:me,geometry:we,group:Ce}=Se;let We=Se.material;We.allowOverride===!0&&q!==null&&(We=q),me.layers.test(Q.layers)&&Ml(me,O,Q,we,We,Ce)}}function Ml(b,O,Q,q,Y,_e){C!==null&&Y.isNodeMaterial&&C.setObject(b,Y),b.onBeforeRender(L,O,Q,q,Y,_e),b.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(L,O,Q,q,b,_e),Y.transparent===!0&&Y.side===Zt&&Y.forceSinglePass===!1?(Y.side=Ht,Y.needsUpdate=!0,L.renderBufferDirect(Q,O,q,Y,b,_e),Y.side=si,Y.needsUpdate=!0,L.renderBufferDirect(Q,O,q,Y,b,_e),Y.side=Zt):L.renderBufferDirect(Q,O,q,Y,b,_e),b.onAfterRender(L,O,Q,q,Y,_e)}function Lr(b,O,Q){O.isScene!==!0&&(O=nt);const q=$.get(b),Y=w.state.lights,_e=w.state.shadowsArray,Se=Y.state.version,me=re.getParameters(b,Y.state,_e,O,Q,w.state.lightProbeGridArray),we=re.getProgramCacheKey(me);let Ce=q.programs;q.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,q.fog=O.fog;const We=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;q.envMap=V.get(b.envMap||q.environment,We),q.envMapRotation=q.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",ln),Ce=new Map,q.programs=Ce);let qe=Ce.get(we);if(qe!==void 0){if(q.currentProgram===qe&&q.lightsStateVersion===Se)return wl(b,me),qe}else me.uniforms=re.getUniforms(b),C!==null&&b.isNodeMaterial&&C.build(b,Q,me),b.onBeforeCompile(me,L),qe=re.acquireProgram(me,we),Ce.set(we,qe),q.uniforms=me.uniforms;const Ee=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ee.clippingPlanes=be.uniform),wl(b,me),q.needsLights=Hh(b),q.lightsStateVersion=Se,q.needsLights&&(Ee.ambientLightColor.value=Y.state.ambient,Ee.lightProbe.value=Y.state.probe,Ee.sunLights.value=Y.state.sun,Ee.sunLightShadows.value=Y.state.sunShadow,Ee.directionalLights.value=Y.state.directional,Ee.directionalLightShadows.value=Y.state.directionalShadow,Ee.spotLights.value=Y.state.spot,Ee.spotLightShadows.value=Y.state.spotShadow,Ee.rectAreaLights.value=Y.state.rectArea,Ee.ltc_1.value=Y.state.rectAreaLTC1,Ee.ltc_2.value=Y.state.rectAreaLTC2,Ee.pointLights.value=Y.state.point,Ee.pointLightShadows.value=Y.state.pointShadow,Ee.hemisphereLights.value=Y.state.hemi,Ee.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ee.sunShadowCascade.value=Y.state.sunShadowCascade,Ee.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ee.spotLightMatrix.value=Y.state.spotLightMatrix,Ee.spotLightMap.value=Y.state.spotLightMap,Ee.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=w.state.lightProbeGridArray.length>0,q.currentProgram=qe,q.uniformsList=null,qe}function bl(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Ss.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function wl(b,O){const Q=$.get(b);Q.outputColorSpace=O.outputColorSpace,Q.batching=O.batching,Q.batchingColor=O.batchingColor,Q.instancing=O.instancing,Q.instancingColor=O.instancingColor,Q.instancingMorph=O.instancingMorph,Q.skinning=O.skinning,Q.morphTargets=O.morphTargets,Q.morphNormals=O.morphNormals,Q.morphColors=O.morphColors,Q.morphTargetsCount=O.morphTargetsCount,Q.numClippingPlanes=O.numClippingPlanes,Q.numIntersection=O.numClipIntersection,Q.vertexAlphas=O.vertexAlphas,Q.vertexTangents=O.vertexTangents,Q.toneMapping=O.toneMapping}function kh(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(O.matrixWorld);for(let Q=0,q=b.length;Q<q;Q++){const Y=b[Q];if(Y.texture!==null&&Y.boundingBox.containsPoint(v))return Y}return null}function Bh(b,O,Q,q,Y){O.isScene!==!0&&(O=nt),T.resetTextureUnits();const _e=O.fog,Se=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?O.environment:null,me=ie===null?L.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ze.workingColorSpace,we=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Ce=V.get(q.envMap||Se,we),We=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,qe=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ee=!!Q.morphAttributes.position,rt=!!Q.morphAttributes.normal,bt=!!Q.morphAttributes.color;let gt=vn;q.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(gt=L.toneMapping);const ht=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Lt=ht!==void 0?ht.length:0,ye=$.get(q),It=w.state.lights;if(Fe===!0&&(Le===!0||b!==ee)){const pt=b===ee&&q.id===j;be.setState(q,b,pt)}let Qe=!1;q.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==It.state.version||ye.outputColorSpace!==me||Y.isBatchedMesh&&ye.batching===!1||!Y.isBatchedMesh&&ye.batching===!0||Y.isBatchedMesh&&ye.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&ye.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&ye.instancing===!1||!Y.isInstancedMesh&&ye.instancing===!0||Y.isSkinnedMesh&&ye.skinning===!1||!Y.isSkinnedMesh&&ye.skinning===!0||Y.isInstancedMesh&&ye.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&ye.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&ye.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&ye.instancingMorph===!1&&Y.morphTexture!==null||ye.envMap!==Ce||q.fog===!0&&ye.fog!==_e||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==be.numPlanes||ye.numIntersection!==be.numIntersection)||ye.vertexAlphas!==We||ye.vertexTangents!==qe||ye.morphTargets!==Ee||ye.morphNormals!==rt||ye.morphColors!==bt||ye.toneMapping!==gt||ye.morphTargetsCount!==Lt||!!ye.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,ye.__version=q.version);let qt=ye.currentProgram;Qe===!0&&(qt=Lr(q,O,Y),C&&q.isNodeMaterial&&C.onUpdateProgram(q,qt,ye));let cn=!1,Nn=!1,pi=!1;const ct=qt.getUniforms(),yt=ye.uniforms;if(x.useProgram(qt.program)&&(cn=!0,Nn=!0,pi=!0),q.id!==j&&(j=q.id,Nn=!0),ye.needsLights){const pt=kh(w.state.lightProbeGridArray,Y);ye.lightProbeGrid!==pt&&(ye.lightProbeGrid=pt,Nn=!0)}if(cn||ee!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ct.setValue(F,"projectionMatrix",b.projectionMatrix),ct.setValue(F,"viewMatrix",b.matrixWorldInverse);const On=ct.map.cameraPosition;On!==void 0&&On.setValue(F,Ie.setFromMatrixPosition(b.matrixWorld)),P.logarithmicDepthBuffer&&ct.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ct.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),ee!==b&&(ee=b,Nn=!0,pi=!0)}if(ye.needsLights&&(It.state.sunShadowMap.length>0&&ct.setValue(F,"sunShadowMap",It.state.sunShadowMap,T),It.state.directionalShadowMap.length>0&&ct.setValue(F,"directionalShadowMap",It.state.directionalShadowMap,T),It.state.spotShadowMap.length>0&&ct.setValue(F,"spotShadowMap",It.state.spotShadowMap,T),It.state.pointShadowMap.length>0&&ct.setValue(F,"pointShadowMap",It.state.pointShadowMap,T)),Y.isSkinnedMesh){ct.setOptional(F,Y,"bindMatrix"),ct.setOptional(F,Y,"bindMatrixInverse");const pt=Y.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ct.setValue(F,"boneTexture",pt.boneTexture,T))}Y.isBatchedMesh&&(ct.setOptional(F,Y,"batchingTexture"),ct.setValue(F,"batchingTexture",Y._matricesTexture,T),ct.setOptional(F,Y,"batchingIdTexture"),ct.setValue(F,"batchingIdTexture",Y._indirectTexture,T),ct.setOptional(F,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ct.setValue(F,"batchingColorTexture",Y._colorsTexture,T));const Fn=Q.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&k.update(Y,Q,qt),(Nn||ye.receiveShadow!==Y.receiveShadow)&&(ye.receiveShadow=Y.receiveShadow,ct.setValue(F,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&O.environment!==null&&(yt.envMapIntensity.value=O.environmentIntensity),yt.dfgLUT!==void 0&&(yt.dfgLUT.value=l_()),Nn){if(ct.setValue(F,"toneMappingExposure",L.toneMappingExposure),ye.needsLights&&zh(yt,pi),_e&&q.fog===!0&&ue.refreshFogUniforms(yt,_e),ue.refreshMaterialUniforms(yt,q,K,G,w.state.transmissionRenderTarget[b.id]),ye.needsLights&&ye.lightProbeGrid){const pt=ye.lightProbeGrid;yt.probesSH.value=pt.texture,yt.probesMin.value.copy(pt.boundingBox.min),yt.probesMax.value.copy(pt.boundingBox.max),yt.probesResolution.value.copy(pt.resolution)}Ss.upload(F,bl(ye),yt,T)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ss.upload(F,bl(ye),yt,T),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ct.setValue(F,"center",Y.center),ct.setValue(F,"modelViewMatrix",Y.modelViewMatrix),ct.setValue(F,"normalMatrix",Y.normalMatrix),ct.setValue(F,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const pt=q.uniformsGroups;for(let On=0,mi=pt.length;On<mi;On++){const Tl=pt[On];se.update(Tl,qt),se.bind(Tl,qt)}}return qt}function zh(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.sunLights.needsUpdate=O,b.sunLightShadows.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Hh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(b,O,Q){const q=$.get(b);q.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),$.get(b.texture).__webglTexture=O,$.get(b.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Q,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const Q=$.get(b);Q.__webglFramebuffer=O,Q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,Q=0){ie=b,J=O,Z=Q;let q=null,Y=!1,_e=!1;if(b){const me=$.get(b);if(me.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(F.FRAMEBUFFER,me.__webglFramebuffer),ne.copy(b.viewport),Re.copy(b.scissor),Te=b.scissorTest,x.viewport(ne),x.scissor(Re),x.setScissorTest(Te),j=-1;return}else if(me.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(me.__hasExternalTextures)T.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const We=b.depthTexture;if(me.__boundDepthTexture!==We){if(We!==null&&$.has(We)&&(b.width!==We.image.width||b.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const we=b.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(_e=!0);const Ce=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[O])?q=Ce[O][Q]:q=Ce[O],Y=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?q=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?q=Ce[Q]:q=Ce,ne.copy(b.viewport),Re.copy(b.scissor),Te=b.scissorTest}else ne.copy(ce).multiplyScalar(K).floor(),Re.copy(ve).multiplyScalar(K).floor(),Te=tt;if(Q!==0&&(q=U),x.bindFramebuffer(F.FRAMEBUFFER,q)&&x.drawBuffers(b,q),x.viewport(ne),x.scissor(Re),x.setScissorTest(Te),Y){const me=$.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,me.__webglTexture,Q)}else if(_e){const me=O;for(let we=0;we<b.textures.length;we++){const Ce=$.get(b.textures[we]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+we,Ce.__webglTexture,Q,me)}}else if(b!==null&&Q!==0){const me=$.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,me.__webglTexture,Q)}j=-1};function El(b){const O=$.get(b);return(O.__readFormat!==b.format||O.__readType!==b.type)&&(O.__readFormat=b.format,O.__readType=b.type,O.__formatReadable=P.textureFormatReadable(b.format),O.__typeReadable=P.textureTypeReadable(b.type)),O}this.readRenderTargetPixels=function(b,O,Q,q,Y,_e,Se,me=0){if(!(b&&b.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we){x.bindFramebuffer(F.FRAMEBUFFER,we);try{const Ce=b.textures[me],We=Ce.format,qe=Ce.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);const Ee=El(Ce);if(Ee.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-q&&Q>=0&&Q<=b.height-Y&&F.readPixels(O,Q,q,Y,fe.convert(We),fe.convert(qe),_e)}finally{const Ce=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(b,O,Q,q,Y,_e,Se,me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we)if(O>=0&&O<=b.width-q&&Q>=0&&Q<=b.height-Y){x.bindFramebuffer(F.FRAMEBUFFER,we);const Ce=b.textures[me],We=Ce.format,qe=Ce.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);const Ee=El(Ce);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const rt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,rt),F.bufferData(F.PIXEL_PACK_BUFFER,_e.byteLength,F.STREAM_READ),F.readPixels(O,Q,q,Y,fe.convert(We),fe.convert(qe),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const bt=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,bt);const gt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await tf(F,gt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,rt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,_e),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(rt),F.deleteSync(gt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,Q=0){const q=Math.pow(2,-Q),Y=Math.floor(b.image.width*q),_e=Math.floor(b.image.height*q),Se=O!==null?O.x:0,me=O!==null?O.y:0;T.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,Se,me,Y,_e),x.unbindTexture()},this.copyTextureToTexture=function(b,O,Q=null,q=null,Y=0,_e=0){let Se,me,we,Ce,We,qe,Ee,rt,bt;const gt=b.isCompressedTexture?b.mipmaps[_e]:b.image;if(Q!==null)Se=Q.max.x-Q.min.x,me=Q.max.y-Q.min.y,we=Q.isBox3?Q.max.z-Q.min.z:1,Ce=Q.min.x,We=Q.min.y,qe=Q.isBox3?Q.min.z:0;else{const yt=Math.pow(2,-Y);Se=Math.floor(gt.width*yt),me=Math.floor(gt.height*yt),b.isDataArrayTexture?we=gt.depth:b.isData3DTexture?we=Math.floor(gt.depth*yt):we=1,Ce=0,We=0,qe=0}q!==null?(Ee=q.x,rt=q.y,bt=q.z):(Ee=0,rt=0,bt=0);const ht=fe.convert(O.format),Lt=fe.convert(O.type);let ye;O.isData3DTexture?(T.setTexture3D(O,0),ye=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),ye=F.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),ye=F.TEXTURE_2D),x.activeTexture(F.TEXTURE0),x.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),x.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),x.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const It=x.getParameter(F.UNPACK_ROW_LENGTH),Qe=x.getParameter(F.UNPACK_IMAGE_HEIGHT),qt=x.getParameter(F.UNPACK_SKIP_PIXELS),cn=x.getParameter(F.UNPACK_SKIP_ROWS),Nn=x.getParameter(F.UNPACK_SKIP_IMAGES);x.pixelStorei(F.UNPACK_ROW_LENGTH,gt.width),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,gt.height),x.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(F.UNPACK_SKIP_ROWS,We),x.pixelStorei(F.UNPACK_SKIP_IMAGES,qe);const pi=b.isDataArrayTexture||b.isData3DTexture,ct=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const yt=$.get(b),Fn=$.get(O),pt=$.get(yt.__renderTarget),On=$.get(Fn.__renderTarget);x.bindFramebuffer(F.READ_FRAMEBUFFER,pt.__webglFramebuffer),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let mi=0;mi<we;mi++)pi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(b).__webglTexture,Y,qe+mi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(O).__webglTexture,_e,bt+mi)),F.blitFramebuffer(Ce,We,Se,me,Ee,rt,Se,me,F.DEPTH_BUFFER_BIT,F.NEAREST);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||$.has(b)){const yt=$.get(b),Fn=$.get(O);x.bindFramebuffer(F.READ_FRAMEBUFFER,D),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,N);for(let pt=0;pt<we;pt++)pi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,yt.__webglTexture,Y,qe+pt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,yt.__webglTexture,Y),ct?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Fn.__webglTexture,_e,bt+pt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Fn.__webglTexture,_e),Y!==0?F.blitFramebuffer(Ce,We,Se,me,Ee,rt,Se,me,F.COLOR_BUFFER_BIT,F.NEAREST):ct?F.copyTexSubImage3D(ye,_e,Ee,rt,bt+pt,Ce,We,Se,me):F.copyTexSubImage2D(ye,_e,Ee,rt,Ce,We,Se,me);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ct?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(ye,_e,Ee,rt,bt,Se,me,we,ht,Lt,gt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(ye,_e,Ee,rt,bt,Se,me,we,ht,gt.data):F.texSubImage3D(ye,_e,Ee,rt,bt,Se,me,we,ht,Lt,gt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,_e,Ee,rt,Se,me,ht,Lt,gt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,_e,Ee,rt,gt.width,gt.height,ht,gt.data):F.texSubImage2D(F.TEXTURE_2D,_e,Ee,rt,Se,me,ht,Lt,gt);x.pixelStorei(F.UNPACK_ROW_LENGTH,It),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Qe),x.pixelStorei(F.UNPACK_SKIP_PIXELS,qt),x.pixelStorei(F.UNPACK_SKIP_ROWS,cn),x.pixelStorei(F.UNPACK_SKIP_IMAGES,Nn),_e===0&&O.generateMipmaps&&F.generateMipmap(ye),x.unbindTexture()},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){J=0,Z=0,ie=null,x.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}function u_(i,e,t,n,r){i.wall=r??i.wall+e,!i.dueNotified&&i.wall>=n&&(i.dueNotified=!0,i.landingDue?.());const s=i.slow,a=i.t>=t&&!!i.hold?.(),o=!!s&&a&&i.wall<s.cap;s&&(i.rate+=((o?s.rate*Math.min(1,n-i.t):1)-i.rate)*(1-Math.exp(-e/Math.max(.01,s.ease)))),i.held=a,i.t=Math.min(n,i.t+e*i.rate)}const cs={land:[34,58,56],land2:[46,76,68],sand:[222,202,146],coast:[24,30,52]},rh=(i,e)=>{const t=i.length,n=(e+Math.PI)/(Math.PI*2)*t,r=Math.floor(n),s=n-r;return i[(r%t+t)%t]*(1-s)+i[((r+1)%t+t)%t]*s};function Xy(i,e,{n:t=30,sigil:n=pu(i),colour:r=mu(n),sigilShare:s=.45,minScale:a=.62}={}){const o=Math.max(...e),l=Math.max(a,Math.min(1,o))/o,c=(t/2-1.5)*l,u=t/2,d=(v,M)=>{const w=v+.5-u,A=M+.5-u;return Math.hypot(w,A)<=c*rh(e,Math.atan2(A,w))},h=new Uint8ClampedArray(t*t*4),p=(v,M)=>{h[v*4]=M[0],h[v*4+1]=M[1],h[v*4+2]=M[2],h[v*4+3]=255},g=new Uint8Array(t*t);for(let v=0;v<t;v++)for(let M=0;M<t;M++)g[v*t+M]=d(M,v)?1:0;const y=(v,M)=>v>=0&&M>=0&&v<t&&M<t&&g[M*t+v]===1,m=(v,M)=>!y(v-1,M)||!y(v+1,M)||!y(v,M-1)||!y(v,M+1);for(let v=0;v<t;v++)for(let M=0;M<t;M++){const w=v*t+M;y(M,v)?p(w,m(M,v)?cs.sand:Math.hypot(M+.5-u,v+.5-u)<c*.55?cs.land:cs.land2):(y(M-1,v)||y(M+1,v)||y(M,v-1)||y(M,v+1))&&p(w,cs.coast)}const f=Math.max(11,Math.round(t*s*Math.min(1,l*Math.max(...e)+.2))),S=Math.round((t-f)/2),R=fu(n,f);for(let v=0;v<f;v++)for(let M=0;M<f;M++)R[v*f+M]<1/0&&g[(v+S)*t+M+S]&&p((v+S)*t+M+S,r);return{w:t,h:t,rgba:h}}function h_(i,{steps:e=i.length}={}){const t=[],n=.48/Math.max(1,...i);for(let r=0;r<e;r++){const s=-Math.PI+r/e*Math.PI*2,a=n*rh(i,s);t.push([.5+a*Math.cos(s),.5+a*Math.sin(s)])}return t}function d_(i,e,t,n,r,s=16){const a=i(e,t,n);let o=a.y;for(let l=0;l<s;l++){const c=l/s*Math.PI*2,u=i(e+Math.cos(c)*r,t,n+Math.sin(c)*r);u.y<o&&(o=u.y)}return{x:a.x,y:o}}function f_(i,e,t){const n=i+(e-i)*Math.min(1,Math.max(0,t)*8);return Math.abs(n-e)<.01?e:n}const p_=i=>i>=128?2:i>=64?1:0,Xn=.055,m_=Hs*1.55,g_=Hs*.42;function v_(i,e,t,n){const r=n[0]-t[0],s=n[1]-t[1],a=r*r+s*s,o=a?Math.max(0,Math.min(1,((i-t[0])*r+(e-t[1])*s)/a)):0;return Math.hypot(i-t[0]-r*o,e-t[1]-s*o)}const No=(i,e,t)=>t.dot?Math.hypot(i-t.pts[0][0],e-t.pts[0][1]):t.pts.slice(1).reduce((n,r,s)=>Math.min(n,v_(i,e,t.pts[s],r)),1/0),ur=new Map;function __(i,e=128,{tier:t=p_(e)}={}){const n=`${i}|${e}|${t}`;if(ur.has(n))return ur.get(n);const r=new Uint8Array(e*e);if(t<=0){const u=fu(i,e);for(let d=0;d<u.length;d++)r[d]=u[d]<1/0?1:0;return ur.set(n,r),r}if(t>=2){const u=M_(i,e);return ur.set(n,u),u}const s=Ga(i,1).map(u=>({...u,pts:u.pts.map(([d,h])=>[Xn+d*(1-2*Xn),Xn+h*(1-2*Xn)])})),a=m_/2,o=g_/2,l=1/e,c=Math.max(qo*1.5,a*1.1);for(let u=0;u<e;u++)for(let d=0;d<e;d++){const h=(d+.5)*l,p=(u+.5)*l;let g=0;for(const y of s){const m=No(h,p,y),f=y.dot?c:a;if(!(m>=f)){g=y.dot?m/f>.38&&m/f<.62?0:1:m<Math.max(o,l*.6)?0:1;break}}r[u*e+d]=g}return ur.set(n,r),r}const x_=.055,Gc=Hs*.85,y_=Hs*.28,Vc=qo*1.15,S_=qo*.42;function Da(i,e,t=e){const n=new Float32Array(e*t),r=1e9,s=1,a=Math.SQRT2;for(let l=0;l<e*t;l++)n[l]=i[l]?r:0;const o=(l,c)=>l<0||c<0||l>=e||c>=t?0:n[c*e+l];for(let l=0;l<t;l++)for(let c=0;c<e;c++){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c-1,l)+s,o(c,l-1)+s,o(c-1,l-1)+a,o(c+1,l-1)+a))}for(let l=t-1;l>=0;l--)for(let c=e-1;c>=0;c--){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c+1,l)+s,o(c,l+1)+s,o(c+1,l+1)+a,o(c-1,l+1)+a))}return n}function M_(i,e){const t=1/e,n=Ga(i,2).map(S=>({...S,pts:S.pts.map(([R,v])=>[Xn+R*(1-2*Xn),Xn+v*(1-2*Xn)])})),r=Ga(i,0).length,s=n.filter(S=>!S.dot),a=n.filter(S=>S.dot),o=new Set(n.slice(r).filter(S=>!S.dot)),l=new Float32Array(e*e),c=new Float32Array(e*e),u=new Uint8Array(e*e);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=(R+.5)*t,M=(S+.5)*t;let w=1/0,A=1/0;for(const _ of s){const E=No(v,M,_);o.has(_)?A=Math.min(A,E):w=Math.min(w,E)}c[S*e+R]=A,w=Math.min(w,A+Gc*.35);for(const _ of a)w=Math.min(w,No(v,M,_)-Vc*.4);l[S*e+R]=w,w<Gc&&(u[S*e+R]=1)}{const S=x_*e,R=Math.ceil(S)+2,v=e+2*R,M=new Uint8Array(v*v).fill(1);for(let E=0;E<e;E++)for(let L=0;L<e;L++)M[(E+R)*v+L+R]=u[E*e+L]?0:1;const w=Da(M,v),A=new Uint8Array(v*v);for(let E=0;E<v*v;E++)A[E]=!M[E]||w[E]<=S?1:0;const _=Da(A,v);for(let E=0;E<e;E++)for(let L=0;L<e;L++){const I=(E+R)*v+L+R;A[I]&&_[I]>S&&(u[E*e+L]=1)}}{const S=new Uint8Array(e*e),R=[];for(let v=0;v<e;v++)R.push(v,(e-1)*e+v,v*e,v*e+e-1);for(;R.length;){const v=R.pop();if(S[v]||u[v])continue;S[v]=1;const M=v%e,w=v/e|0;M>0&&R.push(v-1),M<e-1&&R.push(v+1),w>0&&R.push(v-e),w<e-1&&R.push(v+e)}for(let v=0;v<e*e;v++)S[v]||(u[v]=1)}const d=Da(u,e),h=[],p=.085*e,g=[];for(let S=0;S<e*e;S++)d[S]>p&&l[S]*e>p*.8&&g.push(S);g.sort((S,R)=>d[R]-d[S]);for(const S of g){if(h.length>=3)break;const R=S%e,v=S/e|0,M=Math.min(d[S],l[S]*e)*.8;h.some(w=>Math.hypot(w.x-R,w.y-v)<w.r+M+2)||h.push({x:R,y:v,r:M,turn:b_(i,h.length)})}const y=new Uint8Array(e*e),m=Math.max(1,y_*e),f=Math.max(m*3.2,4);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=S*e+R;if(!u[v])continue;const M=(R+.5)*t,w=(S+.5)*t,A=d[v];let _=1;l[v]*e<m/2+.5&&A>m*.9&&(_=0),c[v]*e<m*.36+.5&&A>m*1.4&&(_=0);for(const L of a){const I=Math.hypot(M-L.pts[0][0],w-L.pts[0][1]);I<Vc&&(_=I<S_?1:0)}let E=!1;for(const L of h){const I=R+.5-L.x,C=S+.5-L.y,U=Math.hypot(I,C);if(U>L.r)continue;E=!0;const D=Math.max(1.3,L.r/(m*2.6)),N=(Math.atan2(C,I)/(Math.PI*2)+1+L.turn)%1,J=L.r/D;_=(U/J-N+8)%1<.58||U<m*.8?1:0,U>L.r-m&&(_=0)}!E&&_&&l[v]*e>m*1.8&&A>f*1.2&&A%f<m&&(_=0),y[v]=_}return y}const b_=(i,e)=>{let t=2166136261;for(const n of i+e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e3/1e3};function w_(i){const e=i.light;return e&&e.mood==="spooky"?e.spooky:null}function E_(i,e){e?.grade?i.set(e.grade,e.gradeDesat,e.gradePivot,0):i.set(0,0,1,0)}function Wc(i,e,t,n,r=1){e=(e%1+1)%1,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));const s=Math.floor(e*6),a=e*6-s,o=us(n*(1-t),r),l=us(n*(1-a*t),r),c=us(n*(1-(1-a)*t),r),u=us(n,r);switch(s%6){case 0:i.set(u,c,o);break;case 1:i.set(l,u,o);break;case 2:i.set(o,u,c);break;case 3:i.set(o,l,u);break;case 4:i.set(c,o,u);break;default:i.set(u,o,l)}}const us=(i,e)=>Math.round(i*255)/255*e,T_=["hazeHue","hazeSat","haze","gradeHue","gradeSat","mist"];class qy{constructor(e){this.M=e,this.cur=this.target("")}M;cur;targets=new Map;target(e){let t=this.targets.get(e);if(!t){const n=this.M.areas?.[e]??{};t={hazeHue:this.M.hazeHue,hazeSat:this.M.hazeSat,haze:this.M.haze,gradeHue:this.M.gradeHue,gradeSat:this.M.gradeSat,mist:this.M.mist,...n},this.targets.set(e,t)}return t}update(e,t,n,r,s){const a=this.target(e),o=1-Math.exp(-Math.max(0,t)*(this.M.areaEase??.5)),l=this.cur;for(const c of T_)if(c==="hazeHue"||c==="gradeHue"){const u=(a[c]-l[c]+1.5)%1-.5;l[c]=(l[c]+u*o+1)%1}else l[c]+=(a[c]-l[c])*o;if(Wc(n,l.hazeHue,l.hazeSat,1,l.haze),r){Wc(r,l.gradeHue,l.gradeSat,1);const c=.3*r.x+.55*r.y+.15*r.z;c>0&&r.set(r.x/c,r.y/c,r.z/c)}s?.setStrength(l.mist)}}function*A_(i,e){const t={wait:i,here:e};return yield t,t.value}const sh=i=>typeof i=="object"&&i!==null&&"here"in i&&!("later"in i);function*Yy(i,e){const t={later:!0,wait:i,here:e,got:!1};return yield t,t}function*$y(i){return i.got||(i.value=yield*A_(()=>i.promise,i.here)),i.got=!0,i.value}const ah=i=>typeof i=="object"&&i!==null&&"later"in i;function R_(i){for(;;){const e=i.next();if(e.done)return e.value;ah(e.value)?(e.value.value=e.value.here(),e.value.got=!0):sh(e.value)?e.value.value=e.value.here():e.value&&oh(e.value)}}const Ua=[];async function Ky(i,e,t=8,n=P_){const r={longest:0,longestAt:"",slices:0,ms:0,slow:[]};await qc();let s="";const a=n();for(;;){const o=n();for(r.slices++;;){const l=n(),c=i.next(),u=n()-l;if(u>r.longest&&(r.longest=u,r.longestAt=s),u>4&&(r.slow.length<10||u>r.slow[9][0])&&(r.slow.push([Math.round(u),s]),r.slow.sort((d,h)=>h[0]-d[0]),r.slow.length=Math.min(10,r.slow.length)),c.done)return r.ms=n()-a,Ua.push({...r,what:e}),Ua.length>8&&Ua.shift(),c.value;if(ah(c.value)){const d=c.value;d.promise=Xc(d).then(h=>(d.value=h,d.got=!0,h));continue}if(sh(c.value)){const d=c.value;d.value=await Xc(d);break}if(c.value&&(s=c.value,oh(c.value)),n()-o>=t)break}await qc()}}const C_=2e4;async function Xc(i){let e;const t=new Promise(n=>{e=setTimeout(()=>n("late"),C_)});try{const n=await Promise.race([i.wait(),t]);return n==="late"?i.here():n}catch(n){return ud(n,"sliced build worker fallback"),i.here()}finally{clearTimeout(e)}}const P_=()=>performance.now(),oh=i=>{try{performance.mark(`witch:build-${i}`)}catch{}};function qc(){return new Promise(i=>{if(typeof requestAnimationFrame>"u"||typeof document>"u"||document.hidden){setTimeout(i,0);return}let e=!1;const t=()=>{e||(e=!0,i())};requestAnimationFrame(()=>setTimeout(t,0)),setTimeout(t,100)})}const L_=JSON.parse(`[{"key":"blue+blue+blue","recipe":["blue","blue","blue"],"effect":"bullet-time","name":"Bullet Time","description":"The world slows to a crawl while she keeps her speed. Only she and nearby threats retain their colour.","comingSoon":true,"id":1},{"key":"blue+blue+purple","recipe":["blue","blue","purple"],"effect":"moon-boots","name":"Moon Boots","description":"Taking off becomes a huge bouncing leap with no steering in the air.","comingSoon":true,"id":2},{"key":"blue+blue+pink","recipe":["blue","blue","pink"],"effect":"echo","name":"Echo","description":"Neon copies trail behind her, echoing her movements and invitations.","comingSoon":true,"id":3},{"key":"blue+blue+red","recipe":["blue","blue","red"],"effect":"the-fear","name":"The Fear","description":"Shadows become creatures, phantom footsteps surround her, and familiar animals loom twice their size.","comingSoon":true,"id":4},{"key":"blue+blue+orange","recipe":["blue","blue","orange"],"effect":"alone","name":"Alone","description":"Everyone vanishes and the world stands still. She can wander the empty forest.","comingSoon":true,"id":5},{"key":"blue+blue+yellow","recipe":["blue","blue","yellow"],"effect":"walking-wood","name":"Walking Wood","description":"The trees move around as if they can walk.","comingSoon":true,"id":6},{"key":"blue+blue+green","recipe":["blue","blue","green"],"effect":"skylight","name":"Floor Becomes Sky","description":"Ground and small foliage disappear into the starfield, while the ground's bend still hides objects beyond the horizon.","comingSoon":false,"id":7},{"key":"blue+blue+turquoise","recipe":["blue","blue","turquoise"],"effect":"brass-band","name":"Brass Band","description":"Every instrument in the music becomes a trumpet.","comingSoon":true,"id":8},{"key":"blue+blue+white","recipe":["blue","blue","white"],"effect":"big-moon","name":"Big Moon","description":"An enormous moon fills the sky, with a strong luminous halo.","comingSoon":false,"id":9},{"key":"blue+purple+purple","recipe":["blue","purple","purple"],"effect":"ravine","name":"Ravine","description":"The bend inverted: the world curves up around her, as if at the bottom of a ravine.","comingSoon":false,"id":10},{"key":"blue+pink+purple","recipe":["blue","purple","pink"],"effect":"chunky","name":"Chunky","description":"Much bigger pixels.","comingSoon":false,"id":11},{"key":"blue+purple+red","recipe":["blue","purple","red"],"effect":"superhot","name":"Superhot","description":"Time only moves forward when she's moving (the wave countdown still creeps while she stands still).","comingSoon":true,"id":12},{"key":"blue+orange+purple","recipe":["blue","purple","orange"],"effect":"orbit","name":"Orbit","description":"The treetops three times higher; the camera close to her; looking down on the forest as if from space.","comingSoon":true,"id":13},{"key":"blue+purple+yellow","recipe":["blue","purple","yellow"],"effect":"mirror-forest","name":"Mirror Forest","description":"Every creature looks like her.","comingSoon":true,"id":14},{"key":"blue+green+purple","recipe":["blue","purple","green"],"effect":"skinny-dip","name":"Skinny Dip","description":"Every party witch wears only her hat, boots and a few strategically placed sparkles.","comingSoon":true,"id":15},{"key":"blue+purple+turquoise","recipe":["blue","purple","turquoise"],"effect":"pride","name":"Pride","description":"She gets the party rainbow trail.","comingSoon":true,"id":16},{"key":"blue+purple+white","recipe":["blue","purple","white"],"effect":"earsight","name":"Earsight","description":"Only things that make sound are visible.","comingSoon":true,"id":17},{"key":"blue+pink+pink","recipe":["blue","pink","pink"],"effect":"roadworks","name":"Roadworks","description":"The forest is covered in large traffic cones that shrink until they vanish.","comingSoon":true,"id":18},{"key":"blue+pink+red","recipe":["blue","pink","red"],"effect":"mirrorball","name":"Mirrorball","description":"The disco ball is huge.","comingSoon":true,"id":19},{"key":"blue+orange+pink","recipe":["blue","pink","orange"],"effect":"drift","name":"Drift","description":"The movement controls slowly rotate, with a dizzy look (gentle screen sway, swirling edges, colour smear).","comingSoon":true,"id":20},{"key":"blue+pink+yellow","recipe":["blue","pink","yellow"],"effect":"blinker","name":"Blinker","description":"Moving on the ground is all blinks, with no blink cooldown.","comingSoon":true,"id":21},{"key":"blue+green+pink","recipe":["blue","pink","green"],"effect":"inverse-perspective","name":"Inverse Perspective","description":"Creatures look bigger the further away they are; up close they all but vanish.","comingSoon":true,"id":22},{"key":"blue+pink+turquoise","recipe":["blue","pink","turquoise"],"effect":"drum-solo","name":"Drum Solo","description":"The music is just a drum solo.","comingSoon":true,"id":23},{"key":"blue+pink+white","recipe":["blue","pink","white"],"effect":"watched","name":"Watched","description":"Every legend on the map stands and stares at her.","comingSoon":true,"id":24},{"key":"blue+red+red","recipe":["blue","red","red"],"effect":"giant-trees","name":"Giant Trees","description":"The trees are three times taller.","comingSoon":true,"id":25},{"key":"blue+orange+red","recipe":["blue","red","orange"],"effect":"night-vision","name":"Night Vision","description":"The forest turns black and phosphor green. A rising electronic whine gives way to creature sounds alone.","comingSoon":false,"id":26},{"key":"blue+red+yellow","recipe":["blue","red","yellow"],"effect":"flask-finder","name":"Flask Finder","description":"Flasks are easier to find.","comingSoon":true,"id":27},{"key":"blue+green+red","recipe":["blue","red","green"],"effect":"left-hook","name":"Left Hook","description":"Unlimited dodges, but they always veer left.","comingSoon":true,"id":28},{"key":"blue+red+turquoise","recipe":["blue","red","turquoise"],"effect":"stiltwalkers","name":"Stiltwalkers","description":"Familiar animal bodies stand high on impossibly long legs, tapering from normal hips to tiny feet.","comingSoon":false,"id":29},{"key":"blue+red+white","recipe":["blue","red","white"],"effect":"thick-canopy","name":"Thick Canopy","description":"The canopy closes over her; every colour grows vivid and the lighting gains deep contrast.","comingSoon":false,"id":30},{"key":"blue+orange+orange","recipe":["blue","orange","orange"],"effect":"the-whole-route","name":"The Whole Route","description":"The entire route across the island shines into view.","comingSoon":true,"id":31},{"key":"blue+orange+yellow","recipe":["blue","orange","yellow"],"effect":"dreamseer","name":"Dreamseer","description":"The area a legend's dream points to is easier to see.","comingSoon":true,"id":32},{"key":"blue+green+orange","recipe":["blue","orange","green"],"effect":"paper-theatre","name":"Paper Theatre","description":"Everything becomes flat, wobbling cardboard cutouts.","comingSoon":true,"id":33},{"key":"blue+orange+turquoise","recipe":["blue","orange","turquoise"],"effect":"woodcut","name":"Woodcut","description":"Black-and-white engraving, crosshatched shadows.","comingSoon":true,"id":34},{"key":"blue+orange+white","recipe":["blue","orange","white"],"effect":"kaleidoscope","name":"Kaleidoscope","description":"The screen mirrored into six slices round her.","comingSoon":true,"id":35},{"key":"blue+yellow+yellow","recipe":["blue","yellow","yellow"],"effect":"breathing","name":"Breathing","description":"Ground, trees and rocks swell and shrink with the bpm.","comingSoon":true,"id":36},{"key":"blue+green+yellow","recipe":["blue","yellow","green"],"effect":"daybreak","name":"Daybreak","description":"The sun rises; a bright, ordinary green forest.","comingSoon":true,"id":37},{"key":"blue+turquoise+yellow","recipe":["blue","yellow","turquoise"],"effect":"snow-globe","name":"Snow Globe","description":"Heavy snow, muffled sound, glass-curved screen edges.","comingSoon":true,"id":38},{"key":"blue+white+yellow","recipe":["blue","yellow","white"],"effect":"tiny-witch","name":"Tiny Witch","description":"Quarter size, smaller hitbox, camera at her level.","comingSoon":true,"id":39},{"key":"blue+green+green","recipe":["blue","green","green"],"effect":"giant-witch","name":"Giant Witch","description":"Enormous; nothing else changes.","comingSoon":true,"id":40},{"key":"blue+green+turquoise","recipe":["blue","green","turquoise"],"effect":"featherweight","name":"Featherweight","description":"Sigils weigh nothing, but she floats and can't stop dead on the ground.","comingSoon":true,"id":41},{"key":"blue+green+white","recipe":["blue","green","white"],"effect":"foresight","name":"Foresight","description":"Attack telegraphs twice as early, in garish colours.","comingSoon":true,"id":42},{"key":"blue+turquoise+turquoise","recipe":["blue","turquoise","turquoise"],"effect":"chipmunks","name":"Chipmunks","description":"Every sound at double pitch.","comingSoon":true,"id":43},{"key":"blue+turquoise+white","recipe":["blue","turquoise","white"],"effect":"loop-the-loop","name":"Loop the Loop","description":"Rising does a loop-the-loop instead.","comingSoon":true,"id":44},{"key":"blue+white+white","recipe":["blue","white","white"],"effect":"worm-s-eye","name":"Worm's Eye","description":"The camera drops very low, almost level with the ground.","comingSoon":false,"id":45},{"key":"purple+purple+purple","recipe":["purple","purple","purple"],"effect":"cartoon","name":"Cartoon","description":"Thick outlines, flat colours, a pictorial pow burst on hits.","comingSoon":true,"id":46},{"key":"pink+purple+purple","recipe":["purple","purple","pink"],"effect":"underwater","name":"Underwater","description":"The world ripples like water, sounds turn muffled and bubbly, and movement feels weightless.","comingSoon":true,"id":47},{"key":"purple+purple+red","recipe":["purple","purple","red"],"effect":"moonwalk","name":"Moonwalk","description":"She always faces backwards; 💌s still fly forward.","comingSoon":true,"id":48},{"key":"orange+purple+purple","recipe":["purple","purple","orange"],"effect":"hiccups","name":"Hiccups","description":"A tiny involuntary blink every few seconds.","comingSoon":true,"id":49},{"key":"purple+purple+yellow","recipe":["purple","purple","yellow"],"effect":"stopmotion","name":"Stopmotion","description":"The world at 6 fps; she runs smoothly.","comingSoon":true,"id":50},{"key":"green+purple+purple","recipe":["purple","purple","green"],"effect":"fireflies","name":"Fireflies","description":"Everything moving leaves glowing dots hanging in the air.","comingSoon":true,"id":51},{"key":"purple+purple+turquoise","recipe":["purple","purple","turquoise"],"effect":"heat-vision","name":"Heat Vision","description":"Cold blue scenery surrounds warm animals, glowing hotter with danger. Music falls silent; creature sounds drop an octave beneath slow, muffled mask breathing.","comingSoon":false,"id":52},{"key":"purple+purple+white","recipe":["purple","purple","white"],"effect":"fisheye","name":"Fisheye","description":"Extreme wide angle; she sees further, everything bends.","comingSoon":true,"id":53},{"key":"pink+pink+purple","recipe":["purple","pink","pink"],"effect":"synaesthesia","name":"Synaesthesia","description":"Colours pulse with the music, one colour per instrument, floods on the kick.","comingSoon":true,"id":54},{"key":"pink+purple+red","recipe":["purple","pink","red"],"effect":"mirror-floor","name":"Mirror Floor","description":"The ground becomes a glossy mirror of everything above it.","comingSoon":true,"id":55},{"key":"orange+pink+purple","recipe":["purple","pink","orange"],"effect":"silent-film","name":"Silent Film","description":"Film grain and scratches, sepia, the world as a silent film.","comingSoon":true,"id":56},{"key":"pink+purple+yellow","recipe":["purple","pink","yellow"],"effect":"masterplan","name":"Masterplan","description":"See how packs intend to move and attack: targets, destination slots, roles, formations and attack geometry.","comingSoon":true,"id":57},{"key":"green+pink+purple","recipe":["purple","pink","green"],"effect":"stiltwalkers","name":"Stiltwalkers","description":"Familiar animal bodies stand high on impossibly long legs, tapering from normal hips to tiny feet.","comingSoon":false,"id":58},{"key":"pink+purple+turquoise","recipe":["purple","pink","turquoise"],"effect":"contour-dream","name":"Contour Dream","description":"Vivid contour bands run across ground, animals and scenery.","comingSoon":true,"id":59},{"key":"pink+purple+white","recipe":["purple","pink","white"],"effect":"bottomless","name":"Bottomless","description":"The ground becomes a starfield, with creatures apparently standing over an abyss.","comingSoon":true,"id":60},{"key":"purple+red+red","recipe":["purple","red","red"],"effect":"aurora-outlines","name":"Aurora Outlines","description":"Luminous coloured edges replace most solid surfaces.","comingSoon":false,"id":61},{"key":"orange+purple+red","recipe":["purple","red","orange"],"effect":"folded-space","name":"Folded Space","description":"Repeated mirrored sectors fold the forest around her.","comingSoon":true,"id":62},{"key":"purple+red+yellow","recipe":["purple","red","yellow"],"effect":"sliced-world","name":"Sliced World","description":"Horizontal world-height bands disappear, revealing stacked slices through animals and scenery.","comingSoon":true,"id":63},{"key":"green+purple+red","recipe":["purple","red","green"],"effect":"the-audience","name":"The Audience","description":"Amplify existing watching-tree lean and lag until the forest visibly follows her passage.","comingSoon":false,"id":64},{"key":"purple+red+turquoise","recipe":["purple","red","turquoise"],"effect":"concertina","name":"Concertina","description":"Shared scene deformation squeezes and stretches distance sideways.","comingSoon":true,"id":65},{"key":"purple+red+white","recipe":["purple","red","white"],"effect":"far-sight","name":"Far Sight","description":"Nearby scenery dissolves into haze while distant scenery is unnaturally crisp.","comingSoon":true,"id":66},{"key":"orange+orange+purple","recipe":["purple","orange","orange"],"effect":"the-world-is-late","name":"The World Is Late","description":"Her light, canopy opening and tree attention follow her past position, catching up when she stops.","comingSoon":true,"id":67},{"key":"orange+purple+yellow","recipe":["purple","orange","yellow"],"effect":"sympathetic-forest","name":"Sympathetic Forest","description":"Trees crouch with attack wind-up, stretch with lunges and flinch when animals are hit.","comingSoon":true,"id":68},{"key":"green+orange+purple","recipe":["purple","orange","green"],"effect":"bad-reception","name":"Bad Reception","description":"Musical clarity makes the view sharp; damaged music warps habitat patterns and drives mist.","comingSoon":true,"id":69},{"key":"orange+purple+turquoise","recipe":["purple","orange","turquoise"],"effect":"borrowed-habits","name":"Borrowed Habits","description":"Vegetation acquires nearby animals' idle quirks: sniffing, shivering, stretching and happy bouncing.","comingSoon":true,"id":70},{"key":"orange+purple+white","recipe":["purple","orange","white"],"effect":"someone-is-having-a-bad-dream","name":"Someone Is Having a Bad Dream","description":"A legend's growing restlessness changes mist, grade and tree motion; its kin's arrival lets the scene relax.","comingSoon":true,"id":71},{"key":"purple+yellow+yellow","recipe":["purple","yellow","yellow"],"effect":"too-much-happening","name":"Too Much Happening","description":"Nearby combat makes the scene increasingly luminous until a fight dissolves into light, then settles.","comingSoon":true,"id":72},{"key":"green+purple+yellow","recipe":["purple","yellow","green"],"effect":"the-forest-counts","name":"The Forest Counts","description":"Wind and mist advance in musical steps while she and animals remain fluid.","comingSoon":false,"id":73},{"key":"purple+turquoise+yellow","recipe":["purple","yellow","turquoise"],"effect":"spilling-habitats","name":"Spilling Habitats","description":"Ground textures and habitat colours spill across borders while trees and inhabitants stay put.","comingSoon":true,"id":74},{"key":"purple+white+yellow","recipe":["purple","yellow","white"],"effect":"seeing-through-seeing","name":"Seeing Through Seeing","description":"Perceive the masks that erase the canopy to make her visible.","comingSoon":true,"id":75},{"key":"green+green+purple","recipe":["purple","green","green"],"effect":"lovesick-leaves","name":"Lovesick Leaves","description":"Current affection controls nearby leaf colour, glow or motion.","comingSoon":true,"id":76},{"key":"green+purple+turquoise","recipe":["purple","green","turquoise"],"effect":"borrowed-attention","name":"Borrowed Attention","description":"The light pool or canopy opening follows an animal's current target rather than her.","comingSoon":true,"id":77},{"key":"green+purple+white","recipe":["purple","green","white"],"effect":"held-breath","name":"Held Breath","description":"Wave/pulse progress gradually tightens the world bend or swells scenery, releasing as the wave arrives.","comingSoon":true,"id":78},{"key":"purple+turquoise+turquoise","recipe":["purple","turquoise","turquoise"],"effect":"out-of-time","name":"Out of Time","description":"Mist, wind, plants and other animations borrow the wrong clock.","comingSoon":true,"id":79},{"key":"purple+turquoise+white","recipe":["purple","turquoise","white"],"effect":"pack-weather","name":"Pack Weather","description":"A nearby pack's approach, tell, combo and lull become wind and atmospheric phases.","comingSoon":true,"id":80},{"key":"purple+white+white","recipe":["purple","white","white"],"effect":"pressure-beneath-the-feet","name":"Pressure Beneath the Feet","description":"Attack wind-up locally raises or depresses the drawn ground; release sends a ripple.","comingSoon":true,"id":81},{"key":"pink+pink+pink","recipe":["pink","pink","pink"],"effect":"distant-giants","name":"Distant Giants","description":"Scenery grows with distance while nearby trees shrink.","comingSoon":true,"id":82},{"key":"pink+pink+red","recipe":["pink","pink","red"],"effect":"musical-ground","name":"Musical Ground","description":"Bass drives apparent ground height, percussion drives vegetation, melody drives light.","comingSoon":true,"id":83},{"key":"orange+pink+pink","recipe":["pink","pink","orange"],"effect":"forest-current","name":"Forest Current","description":"Pack movement/steering becomes the foliage force field; the entire forest streams toward targets.","comingSoon":true,"id":84},{"key":"pink+pink+yellow","recipe":["pink","pink","yellow"],"effect":"luminous-footprints","name":"Luminous Footprints","description":"Extend the disturbance field's lifetime and colour it so every passage remains visible.","comingSoon":true,"id":85},{"key":"green+pink+pink","recipe":["pink","pink","green"],"effect":"rolling-sea","name":"Rolling Sea","description":"Landing ripples persist and overlap until the ground and its plants roll like waves.","comingSoon":true,"id":86},{"key":"pink+pink+turquoise","recipe":["pink","pink","turquoise"],"effect":"thick-air","name":"Thick Air","description":"Animals pull the image behind them like syrup.","comingSoon":true,"id":87},{"key":"pink+pink+white","recipe":["pink","pink","white"],"effect":"mushroom-lenses","name":"Mushroom Lenses","description":"Mushrooms become local magnifying/distorting lenses.","comingSoon":true,"id":88},{"key":"pink+red+red","recipe":["pink","red","red"],"effect":"underwater-light","name":"Underwater Light","description":"Moving caustic-like patterns sweep over the whole forest without necessarily changing movement or sound.","comingSoon":true,"id":89},{"key":"orange+pink+red","recipe":["pink","red","orange"],"effect":"striped-intentions","name":"Striped Intentions","description":"Attack preparation tightens patterned illumination around its source, then releases.","comingSoon":true,"id":90},{"key":"pink+red+yellow","recipe":["pink","red","yellow"],"effect":"wax-menagerie","name":"Wax Menagerie","description":"Animals gleam like wax, wet paint or polished metal.","comingSoon":true,"id":91},{"key":"green+pink+red","recipe":["pink","red","green"],"effect":"inside-out-relief","name":"Inside-Out Relief","description":"Reverse or exaggerate surface normals so bumps look like hollows and light seems to come from impossible directions.","comingSoon":true,"id":92},{"key":"pink+red+turquoise","recipe":["pink","red","turquoise"],"effect":"living-bark","name":"Living Bark","description":"Bark and surface colour climb trees while silhouettes remain still.","comingSoon":true,"id":93},{"key":"pink+red+white","recipe":["pink","red","white"],"effect":"travelling-markings","name":"Travelling Markings","description":"Animal markings flow independently of their bodies.","comingSoon":true,"id":94},{"key":"orange+orange+pink","recipe":["pink","orange","orange"],"effect":"long-echoes","name":"Long Echoes","description":"Sparse world-position pose echoes become numerous and long-lived.","comingSoon":true,"id":95},{"key":"orange+pink+yellow","recipe":["pink","orange","yellow"],"effect":"recursive-memories","name":"Recursive Memories","description":"Previous screen images shrink, rotate or drift into the current one.","comingSoon":true,"id":96},{"key":"green+orange+pink","recipe":["pink","orange","green"],"effect":"changing-materials","name":"Changing Materials","description":"A moving world-space boundary turns trees to ink, creatures to silhouettes and ground to contours, then restores them.","comingSoon":true,"id":97},{"key":"orange+pink+turquoise","recipe":["pink","orange","turquoise"],"effect":"wandering-shadows","name":"Wandering Shadows","description":"Separate shadows from their owners and drive them from another signal.","comingSoon":true,"id":98},{"key":"orange+pink+white","recipe":["pink","orange","white"],"effect":"growing-personalities","name":"Growing Personalities","description":"Mushrooms become impossibly tall, squat or twisted, with curling stems and lifted cap rims.","comingSoon":true,"id":99},{"key":"pink+yellow+yellow","recipe":["pink","yellow","yellow"],"effect":"hall-of-mirrors","name":"Hall of Mirrors","description":"Every movement leaves an endless trail of overlapping images.","comingSoon":true,"id":100},{"key":"green+pink+yellow","recipe":["pink","yellow","green"],"effect":"glow-up","name":"Glow Up","description":"Everything glows until the forest blazes with light.","comingSoon":false,"id":101},{"key":"pink+turquoise+yellow","recipe":["pink","yellow","turquoise"],"effect":"miniature","name":"Miniature","description":"The island looks like a tiny toy world.","comingSoon":false,"id":102},{"key":"pink+white+yellow","recipe":["pink","yellow","white"],"effect":"little-planet","name":"Little Planet","description":"The world curves sharply away like a tiny planet.","comingSoon":false,"id":103},{"key":"green+green+pink","recipe":["pink","green","green"],"effect":"wireframe","name":"Wireframe","description":"The world becomes a web of fine lines tracing every surface.","comingSoon":true,"id":104},{"key":"green+pink+turquoise","recipe":["pink","green","turquoise"],"effect":"mix-up","name":"Mix-up","description":"Creatures wear mismatched fragments of other creatures’ appearances.","comingSoon":true,"id":105},{"key":"green+pink+white","recipe":["pink","green","white"],"effect":"mannequins","name":"Mannequins","description":"Everyone freezes in a single pose and slides across the ground.","comingSoon":true,"id":106},{"key":"pink+turquoise+turquoise","recipe":["pink","turquoise","turquoise"],"effect":"cutaway","name":"Cutaway","description":"Nearby surfaces disappear, revealing the insides of trees and the treehouse.","comingSoon":true,"id":107},{"key":"pink+turquoise+white","recipe":["pink","turquoise","white"],"effect":"hue-spin","name":"Hue Spin","description":"Every colour slowly turns into another.","comingSoon":false,"id":108},{"key":"pink+white+white","recipe":["pink","white","white"],"effect":"vertigo","name":"Vertigo","description":"Treetop flight feels dizzyingly high: a wide, steep view and blurred distant ground exaggerate the drop below.","comingSoon":false,"id":109},{"key":"red+red+red","recipe":["red","red","red"],"effect":"unassigned-110","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":110},{"key":"orange+red+red","recipe":["red","red","orange"],"effect":"unassigned-111","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":111},{"key":"red+red+yellow","recipe":["red","red","yellow"],"effect":"unassigned-112","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":112},{"key":"green+red+red","recipe":["red","red","green"],"effect":"unassigned-113","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":113},{"key":"red+red+turquoise","recipe":["red","red","turquoise"],"effect":"unassigned-114","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":114},{"key":"red+red+white","recipe":["red","red","white"],"effect":"unassigned-115","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":115},{"key":"orange+orange+red","recipe":["red","orange","orange"],"effect":"unassigned-116","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":116},{"key":"orange+red+yellow","recipe":["red","orange","yellow"],"effect":"unassigned-117","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":117},{"key":"green+orange+red","recipe":["red","orange","green"],"effect":"unassigned-118","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":118},{"key":"orange+red+turquoise","recipe":["red","orange","turquoise"],"effect":"unassigned-119","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":119},{"key":"orange+red+white","recipe":["red","orange","white"],"effect":"unassigned-120","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":120},{"key":"red+yellow+yellow","recipe":["red","yellow","yellow"],"effect":"unassigned-121","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":121},{"key":"green+red+yellow","recipe":["red","yellow","green"],"effect":"unassigned-122","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":122},{"key":"red+turquoise+yellow","recipe":["red","yellow","turquoise"],"effect":"unassigned-123","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":123},{"key":"red+white+yellow","recipe":["red","yellow","white"],"effect":"unassigned-124","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":124},{"key":"green+green+red","recipe":["red","green","green"],"effect":"unassigned-125","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":125},{"key":"green+red+turquoise","recipe":["red","green","turquoise"],"effect":"unassigned-126","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":126},{"key":"green+red+white","recipe":["red","green","white"],"effect":"unassigned-127","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":127},{"key":"red+turquoise+turquoise","recipe":["red","turquoise","turquoise"],"effect":"unassigned-128","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":128},{"key":"red+turquoise+white","recipe":["red","turquoise","white"],"effect":"unassigned-129","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":129},{"key":"red+white+white","recipe":["red","white","white"],"effect":"unassigned-130","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":130},{"key":"orange+orange+orange","recipe":["orange","orange","orange"],"effect":"unassigned-131","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":131},{"key":"orange+orange+yellow","recipe":["orange","orange","yellow"],"effect":"unassigned-132","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":132},{"key":"green+orange+orange","recipe":["orange","orange","green"],"effect":"unassigned-133","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":133},{"key":"orange+orange+turquoise","recipe":["orange","orange","turquoise"],"effect":"unassigned-134","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":134},{"key":"orange+orange+white","recipe":["orange","orange","white"],"effect":"unassigned-135","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":135},{"key":"orange+yellow+yellow","recipe":["orange","yellow","yellow"],"effect":"unassigned-136","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":136},{"key":"green+orange+yellow","recipe":["orange","yellow","green"],"effect":"unassigned-137","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":137},{"key":"orange+turquoise+yellow","recipe":["orange","yellow","turquoise"],"effect":"unassigned-138","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":138},{"key":"orange+white+yellow","recipe":["orange","yellow","white"],"effect":"unassigned-139","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":139},{"key":"green+green+orange","recipe":["orange","green","green"],"effect":"unassigned-140","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":140},{"key":"green+orange+turquoise","recipe":["orange","green","turquoise"],"effect":"unassigned-141","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":141},{"key":"green+orange+white","recipe":["orange","green","white"],"effect":"unassigned-142","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":142},{"key":"orange+turquoise+turquoise","recipe":["orange","turquoise","turquoise"],"effect":"unassigned-143","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":143},{"key":"orange+turquoise+white","recipe":["orange","turquoise","white"],"effect":"unassigned-144","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":144},{"key":"orange+white+white","recipe":["orange","white","white"],"effect":"unassigned-145","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":145},{"key":"yellow+yellow+yellow","recipe":["yellow","yellow","yellow"],"effect":"unassigned-146","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":146},{"key":"green+yellow+yellow","recipe":["yellow","yellow","green"],"effect":"unassigned-147","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":147},{"key":"turquoise+yellow+yellow","recipe":["yellow","yellow","turquoise"],"effect":"unassigned-148","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":148},{"key":"white+yellow+yellow","recipe":["yellow","yellow","white"],"effect":"unassigned-149","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":149},{"key":"green+green+yellow","recipe":["yellow","green","green"],"effect":"unassigned-150","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":150},{"key":"green+turquoise+yellow","recipe":["yellow","green","turquoise"],"effect":"unassigned-151","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":151},{"key":"green+white+yellow","recipe":["yellow","green","white"],"effect":"unassigned-152","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":152},{"key":"turquoise+turquoise+yellow","recipe":["yellow","turquoise","turquoise"],"effect":"unassigned-153","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":153},{"key":"turquoise+white+yellow","recipe":["yellow","turquoise","white"],"effect":"unassigned-154","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":154},{"key":"white+white+yellow","recipe":["yellow","white","white"],"effect":"unassigned-155","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":155},{"key":"green+green+green","recipe":["green","green","green"],"effect":"unassigned-156","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":156},{"key":"green+green+turquoise","recipe":["green","green","turquoise"],"effect":"unassigned-157","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":157},{"key":"green+green+white","recipe":["green","green","white"],"effect":"unassigned-158","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":158},{"key":"green+turquoise+turquoise","recipe":["green","turquoise","turquoise"],"effect":"unassigned-159","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":159},{"key":"green+turquoise+white","recipe":["green","turquoise","white"],"effect":"unassigned-160","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":160},{"key":"green+white+white","recipe":["green","white","white"],"effect":"unassigned-161","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":161},{"key":"turquoise+turquoise+turquoise","recipe":["turquoise","turquoise","turquoise"],"effect":"unassigned-162","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":162},{"key":"turquoise+turquoise+white","recipe":["turquoise","turquoise","white"],"effect":"unassigned-163","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":163},{"key":"turquoise+white+white","recipe":["turquoise","white","white"],"effect":"unassigned-164","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":164},{"key":"white+white+white","recipe":["white","white","white"],"effect":"unassigned-165","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":165}]`),D_=L_,U_=new Map(D_.map(i=>[i.key,i])),I_=i=>U_.get(typeof i=="string"?i:[...i].sort().join("+"));function lh(i,e){return!i||e<i.at?0:Math.max(0,Math.min(1,(i.until-e)/120))}const Pe=(i,e,t,n,r,s=.05)=>({key:i,label:e,default:t,min:n,max:r,step:s}),ol={"hue-spin":[Pe("period","Colour cycle (game seconds)",20,2,120,1),Pe("offset","Starting colour rotation (degrees)",120,0,360,1),Pe("strength","Colour rotation strength",1,0,1),Pe("soundDepth","Sound sweep (octaves)",2,0,4,.1)],"night-vision":[Pe("brightness","Shadow brightness",3,1,6,.1),Pe("blackFloor","Black level",0,0,.3,.01),Pe("grade","Night-colour strength × normal",.2,0,1,.05)],"heat-vision":[Pe("coldBrightness","Cold scenery brightness",.35,.1,1,.05),Pe("dangerGain","Danger heat strength",1,0,2,.1),Pe("breathVolume","Mask breathing volume",.35,0,1,.05),Pe("breathRate","Breaths per second",.18,.08,.5,.01)],"the-forest-counts":[Pe("beats","Beats per scenery step",1,.25,4,.25),Pe("speed","Scenery clock speed",4,.25,12,.25),Pe("soundDepth","Stepped sound range (octaves)",2,0,4,.1)],"the-audience":[Pe("radius","Watching distance (metres)",35,0,100,1),Pe("lean","Tree lean (metres)",4,0,12,.1),Pe("lag","Following delay (seconds)",2,.05,8,.05)],chunky:[Pe("multiplier","Pixel size × normal",4,1,12,.25)],"trip-audio":[Pe("mix","Trip sound treatment",1,0,1),Pe("cutoff","Sound brightness (Hz)",2600,200,12e3,100),Pe("motion","Sound brightness motion (octaves)",.6,0,2,.05),Pe("speed","Sound motion speed (Hz)",.18,.02,2,.02),Pe("flutter","Sound flutter",.18,0,.7,.01)],miniature:[Pe("blur","Toy-world blur",7,0,16,.1),Pe("band","Sharp strip width",.12,.02,1,.01),Pe("centre","Focus position from top",.55,0,1,.01)],"worm-s-eye":[Pe("angle","Low camera angle (degrees)",3,1,25,.5),Pe("distance","Camera distance × normal",.4,.1,2,.05)],stiltwalkers:[Pe("length","Leg extension",6,1,12,.25),Pe("tip","Leg-tip thickness × hip",.08,.02,.5,.01)],"trip-indicator":[Pe("strength","Edge wobble (art pixels)",1.5,0,30,.1),Pe("speed","Wobble speed",1.2,0,12,.1),Pe("waveSize","Wave size (screen fraction)",.3,.02,2,.01),Pe("reach","Reach from screen edges",.2,0,1,.01)],ravine:[Pe("bendMultiplier","Upward bend × treetop bend",2,0,30,.1),Pe("minimumBend","Minimum upward bend",.001,0,.03,1e-4)],"little-planet":[Pe("bendMultiplier","Extra bend × treetop bend",6,0,50,.1),Pe("minimumBend","Minimum extra bend",.002,0,.05,1e-4)],"glow-up":[Pe("thresholdScale","Bloom threshold × normal",0,0,2),Pe("minimumBoost","Minimum bloom boost",1.5,0,12,.1),Pe("strengthMultiplier","Extra bloom × normal strength",3,0,20,.1)],"big-moon":[Pe("size","Moon size × normal",10,.1,40,.1),Pe("glow","Moon glow × normal",6,0,30,.1)],"thick-canopy":[Pe("closure","Canopy closure",1,0,1),Pe("saturation","Colour saturation",1.9,0,5,.1),Pe("blackFloor","Black point",.16,0,.8,.01),Pe("gamma","Lighting contrast × normal",1.2,.2,4)],vertigo:[Pe("angle","Camera angle (degrees)",72,10,85,1),Pe("angleMix","Camera angle influence",.7,0,1),Pe("distance","Camera distance × normal",1.8,.5,5,.1),Pe("fov","Wide field of view (degrees)",80,30,120,1),Pe("blur","Extra distance blur",5,0,20,.1),Pe("band","Sharp band × normal",.3,.05,2)],"aurora-outlines":[Pe("strength","Outline effect strength",1,0,1),Pe("edgeLow","Edge threshold",.025,0,1,.005),Pe("edgeHigh","Edge softness upper threshold",.3,.005,2,.005),Pe("background","Original surface brightness",.035,0,1,.005)],skylight:[Pe("ground","Ground disappearance",1,0,1),Pe("foliage","Small foliage disappearance",1,0,1)]},$s=Object.fromEntries(Object.entries(ol).map(([i,e])=>[i,Object.fromEntries(e.map(t=>[t.key,t.default]))])),Ot=i=>$s[i]??{};function Zy(i,e,t){const n=ol[i]?.find(r=>r.key===e);!n||!Number.isFinite(t)||($s[i][e]=Math.max(n.min,Math.min(n.max,t)))}function Jy(i){for(const[e,t]of Object.entries(ol))if(!i||i===e)for(const n of t)$s[e][n.key]=n.default}const Qy=()=>({version:1,effects:Object.fromEntries(Object.entries($s).map(([i,e])=>[i,{...e}]))});function N_(i,e){const t=Math.max(0,Math.min(1,e));if(!t)return i;const n=Ot("miniature"),r=(s,a)=>s+(a-s)*t;return{...i,on:!0,strength:r(i.on?i.strength:0,n.blur),band:r(i.band,n.band),centre:r(i.centre,n.centre),treetop:{...i.treetop,strength:r(i.on?i.treetop.strength:0,n.blur),band:r(i.treetop.band,n.band)}}}function jy(i,e){const t=Math.max(0,Math.min(1,e)),n=Ot("the-audience"),r=i??{on:!1,radius:9,lean:0,lag:.45};return t?{on:!0,radius:r.radius+(n.radius-r.radius)*t,lean:(r.on?r.lean:0)*(1-t)+n.lean*t,lag:r.lag+(n.lag-r.lag)*t}:r}function eS(i){const e=Math.max(0,Math.min(1,i)),t=Ot("stiltwalkers");return{length:1+(t.length-1)*e,tip:e?t.tip:1,strength:e}}const tS=i=>lh(i.mushrooms?.trips[i.witches[0]?.id??0],i.clock.time);function F_(i){const e=Math.cos(i),t=Math.sin(i)/Math.sqrt(3),n=(1-e)/3;return[e+n,n-t,n+t]}function nS(i,e,t){if(t<=0)return i;const n=1+(Ot("chunky").multiplier-1)*t;return n===1?i:Math.max(i,Math.round(i*n*e)/e)}function iS(i,e){const t=i.mushrooms?.trips[i.witches[0]?.id??0],n=t&&I_(t.key);return n&&!n.comingSoon&&n.effect===e?lh(t,i.clock.time):0}const rS=(i,e,t,n)=>{const r=Ot("ravine"),s=Ot("little-planet");return i*(1-t)-Math.max(r.minimumBend,e*r.bendMultiplier)*t+Math.max(s.minimumBend,e*s.bendMultiplier)*n},O_=(i,e,t)=>{const n=Ot("glow-up");return{threshold:i*(1+(n.thresholdScale-1)*t),strength:e+Math.max(n.minimumBoost,e*n.strengthMultiplier)*t}},sS=(i,e)=>i*Math.max(0,Math.min(1,e)),aS=(i,e,t,n)=>{const r=Ot("vertigo");return{angle:i+(r.angle-i)*n*r.angleMix,distance:e*(1+(r.distance-1)*n),fov:t+(r.fov-t)*n}},oS=(i,e,t)=>{if(t<=0)return{angle:i,distance:e};const n=Ot("worm-s-eye");return{angle:i+(n.angle-i)*t,distance:e*(1+(n.distance-1)*t)}},k_=(i,e,t)=>{const n=Ot("thick-canopy");return{black:i+(n.blackFloor-i)*t,gamma:e*(1+(n.gamma-1)*t),saturation:1+(n.saturation-1)*t}};function B_(i,e,t,n){if(n<=0)return{black:i,gamma:e,grade:t};const r=Ot("night-vision");return{black:i+(r.blackFloor-i)*n,gamma:e*(1+(1/r.brightness-1)*n),grade:t*(1+(r.grade-1)*n)}}const Yc=1,z_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",H_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,G_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,V_=`
uniform vec2 uAt; uniform float uR, uSoft, uAspect, uAll, uK; varying vec2 vUv;
void main() {
  float d = length((vUv - uAt) * vec2(uAspect, 1.0));
  float a = uAll > 0.5 ? 1.0 - uK : smoothstep(uR - uSoft, uR, d);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}`,W_=.8,X_=`
uniform vec4 uPotionStyle; // saturation boost, edges, edge threshold, edge upper threshold
uniform float uPotionBackground, uPotionTime, uNightVision;
uniform vec4 uPotionHue; // cyclic RGB rotation coefficients, blend strength
uniform vec4 uPotionWobble; // amplitude in art pixels, speed, wave size, edge reach
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uBroken, uPotionFade; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
float edgeLuma(vec2 p) { return dot(texture2D(uScene, p).rgb, vec3(0.3, 0.55, 0.15)); }
float potionEdge(vec2 p) {
  vec2 d = 1.0 / uLow;
  float tl = edgeLuma(p + d * vec2(-1.0, 1.0)), tc = edgeLuma(p + d * vec2(0.0, 1.0)), tr = edgeLuma(p + d);
  float ml = edgeLuma(p + d * vec2(-1.0, 0.0)), mr = edgeLuma(p + d * vec2(1.0, 0.0));
  float bl = edgeLuma(p - d), bc = edgeLuma(p + d * vec2(0.0, -1.0)), br = edgeLuma(p + d * vec2(1.0, -1.0));
  return smoothstep(uPotionStyle.z, max(uPotionStyle.z + 0.001, uPotionStyle.w), length(vec2(tr + 2.0 * mr + br - tl - 2.0 * ml - bl, tl + 2.0 * tc + tr - bl - 2.0 * bc - br)));
}
float irisHash(float n) { return fract(sin(n * 91.345) * 47453.21); }
// The knockout's iris and its record at a pixel q from its centre (low-res pixels), over the picture's colour there.
vec3 irisShade(vec2 q, vec3 base) {
  float d = length(q), R = uIris.z * uLow.y;
  if (d > R) return base * (1.0 - uIris.w);
  if (uIris2.y <= 0.0) return base;
  float L = max(3.0, uIris2.w * uLow.y), a = fract(atan(q.y, q.x) / 6.2831853 - uIris2.x), sector = floor(a * 16.0) / 16.0;
  vec3 rec;
  if (d < 1.5) rec = vec3(0.04); // the spindle
  else if (d < L) { rec = vec3(1.0, 0.31, 0.78) * (0.82 + 0.18 * step(0.5, fract(sector * 2.0))); if (sector < 0.07 && d > L * 0.3) rec = vec3(1.0, 0.96, 0.9); } // the label, pink, its white mark turning
  else if (d < L + 1.0) rec = vec3(0.02); // the label's edge
  else { rec = vec3(0.08, 0.07, 0.1) + 0.06 * step(1.0, mod(floor(d), 3.0)); if (abs(fract(a + 0.25) - 0.5) < 0.05 || abs(fract(a + 0.75) - 0.5) < 0.05) rec += 0.2; } // the vinyl, its grooves, the light's sheen across it
  if (d > R - 1.0) rec = vec3(0.02); // its rim
  return mix(base, rec, uIris2.y);
}
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  if (uPotionWobble.x > 0.0 && uPotionWobble.w > 0.0) {
    float edge = smoothstep(1.0 - uPotionWobble.w, 1.0, max(abs(vUv.x * 2.0 - 1.0), abs(vUv.y * 2.0 - 1.0)));
    vec2 wave = sin(vec2(vUv.y, vUv.x) * (6.2831853 / uPotionWobble.z) + uPotionTime * uPotionWobble.y + vec2(0.0, 1.7));
    p = clamp(p + wave * edge * uPotionWobble.x / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  }
  vec3 c = texture2D(uScene, p).rgb;
  // (the circle hunt: a scene pixel that's not a number, infinite or negative shows red, magenta or yellow)
  if (uBroken > 0.5) { bool nan = !(c.r == c.r) || !(c.g == c.g) || !(c.b == c.b) || any(isnan(c)); if (nan) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; } if (any(isinf(c)) || max(c.r, max(c.g, c.b)) > 60000.0) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } if (min(c.r, min(c.g, c.b)) < 0.0) { gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); return; } }
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  // The mood's grade (render/mood.ts; spooky): the dark and middle tones drained of colour toward
  // the grade's tint (deep blue-green, violet), the bright left as they are, so the party's lights and
  // her glow stay warm in a cold wood. x: amount, y: how much colour goes, z: the brightness above
  // which nothing is graded.
  if (uGrade.x > 0.0) {
    float l = dot(c, vec3(0.3, 0.55, 0.15));
    // Her light's pool spared (uPool: its centre and half-widths on screen; render/view.ts), so her warm light still shows
    // on a dark floor (the art director's round 3: in the fern forest "her light doesn't show").
    float pool = uPool.z > 0.0 ? 1.0 - smoothstep(0.35, 1.0, length((vUv - uPool.xy) / uPool.zw)) : 0.0;
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${W_.toFixed(2)} * pool));
  }
  c += texture2D(uBloom, uPotionWobble.x > 0.0 ? p : vUv).rgb * uBloomStrength;
  if (uPotionStyle.x != 0.0) c = max(vec3(0.0), mix(vec3(dot(c, vec3(0.3, 0.55, 0.15))), c, 1.0 + uPotionStyle.x));
  if (uPotionStyle.y > 0.0) {
    float edge = potionEdge(p);
    vec3 tint = 0.25 + 0.75 * (0.5 + 0.5 * cos(vec3(0.0, 2.1, 4.2) + (vUv.x + vUv.y) * 7.0));
    c = mix(c, c * uPotionBackground + tint * edge, uPotionStyle.y);
  }
  if (uPotionHue.w > 0.0) {
    vec3 spun = vec3(dot(c, uPotionHue.xyz), dot(c, uPotionHue.zxy), dot(c, uPotionHue.yzx));
    c = mix(c, max(vec3(0.0), spun), uPotionHue.w);
  }
  if (uNightVision > 0.0) {
    float phosphor = clamp(dot(c, vec3(0.3, 0.55, 0.15)), 0.0, 1.0);
    vec3 green = mix(vec3(0.025, 0.95, 0.12) * phosphor, vec3(0.78, 1.0, 0.72), smoothstep(0.65, 1.0, phosphor));
    c = mix(c, green, uNightVision);
  }
  // Knocked down with her hat on (Ed, 2026-10-07): the rest of the screen dims, her spot and her hat floating down left lit
  // (round her light's pool, uPool, and well above it, where the hat starts).
  if (uKoDim > 0.0) { vec2 q = (vUv - uPool.xy - vec2(0.0, 0.06)) * vec2(uLow.x / uLow.y, 1.0); c *= 1.0 - uKoDim * smoothstep(0.12, 0.32, uPool.z > 0.0 ? length(q) : 9.0); } // (her spot lit: about a tenth of the screen's height round her, a little above her feet)
  // The iris (render/koIris.ts): uIris its centre on screen, its radius (a share of the screen's height) and how dark outside;
  // uIris2 the record's turn, how far it shows, the rewind smear, and its label's radius. All by whole low-res pixels, so it reads
  // at any px. The smear drags the picture (the record) backwards in bands of rows for a few frames at the cut.
  if (uIris.z > 0.0) {
    vec2 q = floor(vUv * uLow) + 0.5 - uIris.xy * uLow;
    if (uIris2.z > 0.0) {
      float row = floor(vUv.y * uLow.y / 3.0), sh = floor((3.0 + irisHash(row + floor(uIris2.x * 9.0)) * 14.0) * uIris2.z);
      vec3 s = vec3(0.0); for (int i = 0; i < 4; i++) s += irisShade(q + vec2(float(i) * sh, 0.0), c);
      c = s * 0.25;
      if (mod(floor(vUv.y * uLow.y), 2.0) < 1.0) c *= 1.0 - 0.3 * uIris2.z; // (scanlines, a tape winding back)
    } else c = irisShade(q, c);
  }
  gl_FragColor = vec4(min(c, vec3(1.0)) * (1.0 - uPotionFade), 1.0);
}`,q_=`
uniform sampler2D uSrc, uDepth, uSharp; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre, uSkyBlur, uSharpOn; varying vec2 vUv;
void main() {
  // The sky over the bend (nothing drawn there: the far plane) is blurred with everything else, as
  // the last pass over the finished, bent image (Ed, round 12: "the tilt shift effect has to be applied
  // after the bend shader").
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  // The sky (nothing drawn there: the far plane) takes only uSkyBlur of it, so its stars stay perceptible, softly.
  float r = uStrength * smoothstep(0.0, 1.0, d) * (texture2D(uDepth, vUv).r >= 0.99999 ? uSkyBlur : 1.0);
  // Her sigil stack (Post.sharp's mask) is left as drawn, and kept out of the blur round it, as if drawn over the blurred picture.
  bool sharp = uSharpOn > 0.5;
  if (r < 0.35 || (sharp && texture2D(uSharp, vUv).a > 0.5)) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    vec2 at = vUv + uDir * uTexel * t * r;
    if (sharp && texture2D(uSharp, at).a > 0.5) continue;
    c += texture2D(uSrc, at).rgb * k; w += k;
  }
  gl_FragColor = w > 0.0 ? vec4(c / w, 1.0) : texture2D(uSrc, vUv);
}`;function Vn(i,e,t,n=!1){const r=new Xt(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,stencilBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=fn,r}class Y_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Vn(1,1,st,!0),this.scene.depthTexture=new $i(1,1,Yi),this.scene.depthTexture.format=Wn,this.fx.texture.format=Qt;const n=(r,s)=>new Et({vertexShader:z_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(H_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(G_,{uSrc:{value:null},uStep:{value:new Me}}),veil:Object.assign(n(V_,{uAt:{value:new Me(.5,.5)},uR:{value:0},uSoft:{value:.15},uAspect:{value:1},uAll:{value:0},uK:{value:0}}),{transparent:!0,blending:zi}),composite:n(X_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Me},uBloomStrength:{value:0},uKoDim:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0},uBroken:{value:0},uGrade:{value:new je},uPool:{value:new je},uIris:{value:new je},uIris2:{value:new je},uGradeTint:{value:new B(1,1,1)}}),tilt:n(q_,{uSrc:{value:null},uDepth:{value:null},uTexel:{value:new Me},uDir:{value:new Me},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5},uSkyBlur:{value:1},uSharp:{value:null},uSharpOn:{value:0}})},this.mats.composite.uniforms.uPotionFade={value:0},this.mats.composite.uniforms.uPotionStyle={value:new je},this.mats.composite.uniforms.uPotionBackground={value:.035},this.mats.composite.uniforms.uPotionHue={value:new je(1,0,0,0)},this.mats.composite.uniforms.uNightVision={value:0},this.mats.composite.uniforms.uPotionTime={value:0},this.mats.composite.uniforms.uPotionWobble={value:new je},this.quad=new ut(new Cn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Vn(1,1,st);bloomB=Vn(1,1,st);a=Vn(1,1,st);b=Vn(1,1,st);fx=Vn(1,1,st);fxB=Vn(1,1,st);sharpMask=Vn(1,1,_t);sharp=[];fxScene=null;quad;cam=new Xs(-1,1,1,-1,0,1);mats;low=new Me(1,1);out=new Me(1,1);fxRes=new Me(1,1);lift=0;potionGlow=0;potionCanopy=0;potionNightVision=0;potionVertigo=0;potionMiniature=0;potionHue=0;potionHuePhase=0;potionEdges=0;potionWobble=0;potionTime=0;tilt=1;get pool(){return this.mats.composite.uniforms.uPool.value}get iris(){return this.mats.composite.uniforms.uIris.value}get iris2(){return this.mats.composite.uniforms.uIris2.value}set koDim(e){this.mats.composite.uniforms.uKoDim.value=e}set potionFade(e){this.mats.composite.uniforms.uPotionFade.value=Math.max(0,Math.min(1,e))}get sceneTarget(){return this.scene}get lowSize(){return this.low}get fxSize(){return this.fxRes}sizes(){return{scene:[this.scene.width,this.scene.height],fx:[this.fx.width,this.fx.height],bloom:[this.bright.width,this.bright.height],out:[this.out.x,this.out.y]}}resize(e,t,n,r){this.low.set(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.fxRes.set(s,a),this.fx.setSize(s,a),this.fxB.setSize(s,a),this.out.set(n,r),this.scene.setSize(e,t);const o=Math.max(1,Math.round(e/2)),l=Math.max(1,Math.round(t/2));this.bright.setSize(o,l),this.bloomB.setSize(o,l),this.a.setSize(e,t),this.b.setSize(e,t),this.sharpMask.setSize(e,t)}behind=1;behindAt=null;drawScene(e,t){const n=this.renderer,r=this.behind;if(r>=1){n.render(e,t);return}const s=t.layers.mask,a=n.autoClear;if(r<=0){const g=n.getClearColor(this.clear),y=n.getClearAlpha();t.layers.set(Yc),n.setClearColor(0,1),n.render(e,t),n.setClearColor(g,y),t.layers.mask=s;return}n.render(e,t);const o=n.getRenderTarget(),l=o?.width??1,c=o?.height??1,u=l/c,d=this.behindAt,h=d?Math.max(...[[0,0],[1,0],[0,1],[1,1]].map(([g,y])=>Math.hypot((g-d.x)*u,y-d.y))):0,p=.15;n.autoClear=!1,this.pass("veil",o,g=>{g.uAll.value=d?0:1,g.uK.value=r,g.uAt.value.copy(d??g.uAt.value),g.uAspect.value=u,g.uSoft.value=p,g.uR.value=r*(h+p)}),n.clearDepth(),t.layers.set(Yc),n.render(e,t),t.layers.mask=s,n.autoClear=a}clear=new ke;pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}compile(){const e=new Po;for(const t of Object.values(this.mats)){const n=new ut(this.quad.geometry,t);n.frustumCulled=!1,e.add(n)}return this.renderer.compileAsync(e,this.cam)}sceneMs=0;render(e,t){R_(this.renderSteps(e,t))}*renderSteps(e,t,n=!0){const r=n?null:this.b,s=this.renderer,a=this.tuning;s.setRenderTarget(this.scene);const o=performance.now();this.drawScene(e,t),this.sceneMs=performance.now()-o,yield;const l=O_(a.bloom.threshold,a.bloom.on?a.bloom.strength:0,this.potionGlow),c=l.strength>0;if(c){const f=this.bright.width,S=this.bright.height;this.pass("bright",this.bright,R=>{R.uScene.value=this.scene.texture,R.uThreshold.value=l.threshold}),yield;for(let R=0;R<2;R++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/S)}),yield}const u=!!this.fxScene&&a.suspects.effectsLayer;if(this.fxScene){const f=s.getClearColor(new ke),S=s.getClearAlpha();s.setRenderTarget(this.fx),s.setClearColor(0,0),s.clear(),s.render(this.fxScene,t),s.setClearColor(f,S),yield;const R=this.low.x,v=this.low.y;this.pass("blur",this.fxB,M=>{M.uSrc.value=this.fx.texture,M.uStep.value.set(.6/R,0)}),this.pass("blur",this.fx,M=>{M.uSrc.value=this.fxB.texture,M.uStep.value.set(0,.6/v)}),yield}const d=N_(a.tiltShift,this.potionMiniature),h=(d.on&&d.strength>0||this.potionVertigo>0)&&this.tilt>0;if(this.pass("composite",h?this.a:r,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=c?l.strength:0;const S=k_(a.tone.black,a.tone.gamma,this.potionCanopy);f.uBlack.value=S.black,f.uGamma.value=S.gamma;const R=Ot("aurora-outlines"),v=Ot("trip-indicator");f.uPotionStyle.value.set(S.saturation-1,this.potionEdges*R.strength,R.edgeLow,R.edgeHigh),f.uPotionBackground.value=R.background,f.uNightVision.value=this.potionNightVision,f.uPotionTime.value=this.potionTime;const M=F_(this.potionHuePhase);if(f.uPotionHue.value.set(...M,this.potionHue*Ot("hue-spin").strength),f.uPotionWobble.value.set(v.strength*this.potionWobble,v.speed,v.waveSize,v.reach),f.uFx.value=this.fx.texture,f.uFxOn.value=u?1:0,f.uBroken.value=a.suspects.showBroken?1:0,this.setGrade(f),this.potionNightVision>0){const w=B_(f.uBlack.value,f.uGamma.value,f.uGrade.value.x,this.potionNightVision);f.uBlack.value=w.black,f.uGamma.value=w.gamma,f.uGrade.value.x=w.grade}}),!h)return;yield;const p=this.drawSharp(t),g=this.a.width,y=this.a.height,m=f=>{const S=d,R=Math.max(0,Math.min(1,this.lift)),v=R*R*(3-2*R);f.uDepth.value=this.scene.depthTexture,f.uTexel.value.set(1/g,1/y),f.uStrength.value=(S.strength+(S.treetop.strength-S.strength)*v)*this.tilt,f.uBand.value=S.band+(S.treetop.band-S.band)*v,f.uCentre.value=1-S.centre,S.on||(f.uStrength.value=0);const M=Ot("vertigo");f.uStrength.value+=M.blur*this.potionVertigo*this.tilt,f.uBand.value*=1+(M.band-1)*this.potionVertigo,f.uSkyBlur.value=S.skyBlur??1,f.uSharp.value=this.sharpMask.texture,f.uSharpOn.value=p?1:0};this.pass("tilt",this.b,f=>{m(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),yield,this.pass("tilt",r===this.b?this.a:r,f=>{m(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}drawSharp(e){const t=this.tuning.tiltShift.stackSharp!==!1?this.sharp.filter(o=>o.mesh.visible&&(o.mesh.geometry.instanceCount??0)>0):[];if(!t.length)return!1;const n=this.renderer,r=n.autoClear,s=n.getClearColor(this.clear),a=n.getClearAlpha();n.setRenderTarget(this.sharpMask),n.setClearColor(0,0),n.clear(!0,!1,!1),n.autoClear=!1;for(const o of t){const l=o.mesh.material;o.mesh.material=o.mask,n.render(o.mesh,e),o.mesh.material=l}return n.autoClear=r,n.setClearColor(s,a),!0}get gradeTint(){return this.mats.composite.uniforms.uGradeTint.value}gradeOf;setGrade(e){const t=w_(this.tuning);if(E_(e.uGrade.value,t),t!==this.gradeOf&&(this.gradeOf=t,t)){const[n,r,s]=Gh(t.gradeHue,t.gradeSat,1).map(o=>o/255),a=.3*n+.55*r+.15*s;e.uGradeTint.value.set(n/a,r/a,s/a)}}}const ii=100,kt=ii/Vh,hs=[{from:0,px:48},{from:64,px:128},{from:128,px:256}],_r=5,$_=240,K_=6,Z_=40;function Ia(i){for(let e=i.length-1;e>=0;e--)if(i[e]>=65535)return new Uint32Array(i);return new Uint16Array(i)}function J_(i,e){const t=new Float32Array(i.length);for(let n=0;n<e.length;n+=3){const r=e[n],s=e[n+1],a=e[n+2],o=r*3,l=s*3,c=a*3,u=i[o],d=i[o+1],h=i[o+2],p=i[l],g=i[l+1],y=i[l+2],m=i[c],f=i[c+1],S=i[c+2],R=m-p,v=f-g,M=S-y,w=u-p,A=d-g,_=h-y,E=v*_-M*A,L=M*w-R*_,I=R*A-v*w;t[o]=t[o]+E,t[o+1]=t[o+1]+L,t[o+2]=t[o+2]+I,t[l]=t[l]+E,t[l+1]=t[l+1]+L,t[l+2]=t[l+2]+I,t[c]=t[c]+E,t[c+1]=t[c+1]+L,t[c+2]=t[c+2]+I}for(let n=0;n<t.length;n+=3){const r=t[n],s=t[n+1],a=t[n+2],o=1/(Math.sqrt(r*r+s*s+a*a)||1);t[n]=r*o,t[n+1]=s*o,t[n+2]=a*o}return t}function ch(i,e){const{cols:t,rows:n,step:r}=i,s=t*n,a=new Float32Array(s*3),o=[];let l=0;for(let f=0;f<n;f++)for(let S=0;S<t;S++){const R=f*t+S,v=i.h[R],M=v>0?.04+v*e*_r:-.12;a[R*3]=(i.x0+S*r)*e,a[R*3+1]=M,a[R*3+2]=(i.z0+f*r)*e,l=Math.max(l,M)}for(let f=0;f<n-1;f++)for(let S=0;S<t-1;S++){const R=f*t+S,v=R+1,M=R+t,w=M+1;i.h[R]<=0&&i.h[v]<=0&&i.h[M]<=0&&i.h[w]<=0||o.push(R,M,v,v,M,w)}const c=Ia(o),u=J_(a,c);let d=.1;for(let f=0;f<s;f++)d=Math.max(d,a[f*3+1]);const h=new Uint8Array(s);for(let f=0;f<s;f++)h[f]=Math.round(Math.max(0,Math.min(1,a[f*3+1]/d))*255);const p=new Float32Array(s*3),g=new Float32Array(s),y=[];for(let f=0;f<s;f++)p[f*3]=a[f*3],p[f*3+1]=.03,p[f*3+2]=a[f*3+2],g[f]=i.h[f]>0||i.water?.[f]===2?0:Math.min(1,-i.h[f]/$_);for(let f=0;f<n-1;f++)for(let S=0;S<t-1;S++){const R=f*t+S,v=R+1,M=R+t,w=M+1;g[R]>=1&&g[v]>=1&&g[M]>=1&&g[w]>=1||i.h[R]>0&&i.h[v]>0&&i.h[M]>0&&i.h[w]>0||y.push(R,M,v,v,M,w)}let m=null;if(i.water&&i.level){const f=i.water,S=i.level,R=new Float32Array(s*3),v=new Float32Array(s),M=[];for(let A=0;A<s;A++){const _=f[A]===2?S[A]:0;R[A*3]=a[A*3],R[A*3+1]=.06+_*e*_r,R[A*3+2]=a[A*3+2],v[A]=f[A]===2?Math.min(1,(S[A]-i.h[A])/K_):0}for(let A=0;A<n;A++)for(let _=0;_<t;_++){const E=A*t+_;if(f[E]!==2){for(const L of[E-1,E+1,E-t,E+t])if(L>=0&&L<s&&f[L]===2){R[E*3+1]=.06+S[L]*e*_r;break}}}const w=new Float32Array(s);if(i.looks)for(let A=0;A<s;A++)w[A]=i.looks[A];{const A=new Float32Array(s),_=1.4142;for(let C=0;C<s;C++)A[C]=f[C]===2?1e9:0;for(let C=0;C<n;C++)for(let U=0;U<t;U++){const D=C*t+U;if(!A[D])continue;let N=A[D];U>0&&(N=Math.min(N,A[D-1]+1)),C>0&&(N=Math.min(N,A[D-t]+1),U>0&&(N=Math.min(N,A[D-t-1]+_)),U<t-1&&(N=Math.min(N,A[D-t+1]+_))),A[D]=N}for(let C=n-1;C>=0;C--)for(let U=t-1;U>=0;U--){const D=C*t+U;if(!A[D])continue;let N=A[D];U<t-1&&(N=Math.min(N,A[D+1]+1)),C<n-1&&(N=Math.min(N,A[D+t]+1),U<t-1&&(N=Math.min(N,A[D+t+1]+_)),U>0&&(N=Math.min(N,A[D+t-1]+_))),A[D]=N}const E=new Int32Array(s).fill(-1),L=[],I=[];for(let C=0;C<s;C++){if(w[C]!==7||f[C]!==2||E[C]>=0)continue;const U=L.length;let D=0;for(L.push(0),I.push(C),E[C]=U;I.length;){const N=I.pop(),J=N%t;D=Math.max(D,A[N]);for(const Z of[J>0?N-1:-1,J<t-1?N+1:-1,N-t,N+t])Z>=0&&Z<s&&f[Z]===2&&E[Z]<0&&(E[Z]=U,I.push(Z))}L[U]=D}for(let C=0;C<s;C++)f[C]!==2||!w[C]||(v[C]=E[C]>=0?Math.min(1,(A[C]-.5)/Math.max(1,L[E[C]]-.5)):Math.min(1,(A[C]-.5)*r/Z_))}for(let A=0;A<n-1;A++)for(let _=0;_<t-1;_++){const E=A*t+_,L=E+1,I=E+t,C=I+1;w[E]===4||w[L]===4||w[I]===4||w[C]===4||(f[E]===2||f[L]===2||f[I]===2||f[C]===2)&&M.push(E,I,L,L,I,C)}M.length&&(m={lp:R,ld:v,lk:w,li:Ia(M)})}return{pos:a,normal:u,idx:c,top:l,tile:h,tmax:d,flat:p,depth:g,wi:Ia(y),lakes:m}}const $c=[8,5.5,8,11,13,15],Q_=i=>i.id==="home"?$c[0]:$c[Math.max(1,Math.min(5,i.phase))],uh=11,Na=uh*2.3,Kc=2048,hh=(i,e,t)=>`
float ${i}(vec3 w, float tanK) {
  if (uShadow <= 0.0) return 1.0;
  float fl = max(length(uMoonV.xz), 1e-4); vec2 d = uMoonV.xz / fl; float tanE = uMoonV.y / fl * tanK;
  float reach = min(80.0, uTop / max(tanE, 0.05)), occ = 0.0;
  for (int i = 1; i <= ${t}; i++) {
    float u = float(i) / ${t}.0, t = reach * u * u + 0.06;
    float above = ${e}(w.xz + d * t) - (w.y + t * tanE) - 0.03;
    occ = max(occ, smoothstep(0.0, 0.05 + 0.05 * t, above));
  }
  return 1.0 - uShadow * occ;
}`,j_=`
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${hh("moonLit","hAtMap",16)}`,ll=`
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${hh("moonLit","hAtTile",20)}`,dh=2,fh=1,ex=96,tx=16,nx=uh*fh,ix=9,rx=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,sx=`
uniform float uTime, uR, uRings; uniform vec3 uMoonDir; varying vec3 vW;
${j_}
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
void main() {
  float r = length(vW.xz) / uR;
  vec3 deep = vec3(0.035, 0.06, 0.15), shal = vec3(0.07, 0.12, 0.27);
  vec3 c = mix(shal, deep, smoothstep(0.0, 1.0, r));
  float w = n(vW.xz * 0.35 + vec2(uTime * 0.25, uTime * 0.17)) * 0.6 + n(vW.xz * 0.9 - vec2(uTime * 0.31, -uTime * 0.2)) * 0.4;
  c += vec3(0.03, 0.05, 0.09) * w;
  // the moon's glitter: a band of bright ripples from the camera's side up toward the moon, in the north
  float band = exp(-pow(vW.x - uMoonDir.x * 40.0, 2.0) / 900.0);
  c += vec3(0.55, 0.6, 0.7) * band * step(0.93, w) * 0.8;
  c *= moonLit(vec3(vW.x, 0.0, vW.z), 1.0); // (the islands shadows on the water)
  // the phases' rings, faint (dashed round)
  float rp = length(vW.xz) / uRings; // (the rings by the islands' own radius, the empty band past them: #746)
  for (int p = 1; p <= 5; p++) { float rr = 0.02 + float(p) * 0.165; float d = abs(rp - rr);
    float dash = step(0.5, fract(atan(vW.z, vW.x) * 24.0 / 6.2832 * float(p)));
    c += vec3(0.05, 0.08, 0.16) * (1.0 - smoothstep(0.0, 0.004, d)) * dash; }
  // the rim: lighter where the water gathers to pour off
  c += vec3(0.12, 0.2, 0.32) * smoothstep(0.965, 1.0, r);
  gl_FragColor = vec4(c, 1.0);
}`,ax=`
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`,ox="varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }",lx=`
uniform vec2 uRes; uniform float uTime; uniform vec2 uMoon; varying vec2 vNdc;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 px = floor((vNdc * 0.5 + 0.5) * uRes), uv = px / uRes;
  vec3 c = mix(vec3(0.02, 0.025, 0.06), vec3(0.06, 0.07, 0.16), smoothstep(1.0, 0.2, uv.y));
  float s = h(px); if (s > 0.9965) { float tw = 0.6 + 0.4 * sin(uTime * (1.0 + h(px + 3.0) * 3.0) + s * 40.0); c += vec3(0.75, 0.78, 0.9) * tw * (s > 0.9992 ? 1.3 : 0.7); }
  vec2 m = uMoon * uRes; float d = length(px - m), R = uRes.y * 0.045;
  if (d < R) { float lit = smoothstep(R, R * 0.2, length(px - m - vec2(R * 0.35, 0.0))); c = mix(vec3(0.85, 0.87, 0.8), vec3(0.18, 0.2, 0.28), 1.0 - lit); }
  else c += vec3(0.25, 0.28, 0.4) * exp(-(d - R) / (R * 1.6)) * 0.35;
  gl_FragColor = vec4(c, 1.0);
}`,cx=`attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,ux=`
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`,hx=`
varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,dx=`
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${ll}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`,fx=`
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,px=`
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${ll}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`,mx={deep:new ke(.08,.2,.34),pale:new ke(.22,.46,.52)},Zc={deep:new ke(.15,.28,.37),pale:new ke(.3,.52,.56)},gx=`
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,vx=`
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${ll}
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
// round things scattered one to a cell (floes, pads): x how far inside the nearest (1 its middle, 0 its edge, below 0 outside), y its cell's own number
vec2 dots(vec2 p, float r) {
  vec2 i = floor(p), best = vec2(-1.0, 0.0);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 c = i + vec2(x, y), o = c + 0.2 + 0.6 * vec2(h(c), h(c + 9.1)); float rr = r * (0.6 + 0.5 * h(c + 3.7)), k = 1.0 - length(p - o) / rr;
    if (k > best.x) best = vec2(k, h(c + 5.3));
  }
  return best;
}
void main() {
  float d = clamp(vD, 0.0, 1.0), a = pow(1.0 - d, 1.6); vec2 p = vP / uScale; // (p in about 30 m steps)
  vec3 c; int uLook = int(vLook + 0.5);
  if (uLook == 1) {
    float crack = smoothstep(0.035, 0.0, abs(n(p * 0.9) - 0.5)) * 0.5 + smoothstep(0.03, 0.0, abs(n(p * 2.1 + 7.0) - 0.5)) * 0.3;
    c = mix(vec3(0.3, 0.42, 0.52), vec3(0.6, 0.68, 0.76), a * a) + vec3(0.1, 0.12, 0.14) * crack * (1.0 - a);
    c *= 0.9 + 0.1 * n(p * 3.0);
  } else if (uLook == 2) {
    float t = uTime * 0.12, f = n(p * 0.8 + vec2(t, -t * 0.7)) * 0.6 + n(p * 2.3 - vec2(t * 1.3, t)) * 0.4;
    vec3 hot = mix(vec3(1.0, 0.36, 0.06), vec3(1.25, 0.86, 0.3), smoothstep(0.45, 0.8, f));
    float crust = max(smoothstep(0.35, 0.85, a), smoothstep(0.32, 0.18, f) * 0.85);
    c = mix(hot, vec3(0.1, 0.05, 0.04), crust);
    gl_FragColor = vec4(c * mix(1.0, uDim, 0.5), 1.0); return; // (it glows: dimmed less, and not by the night)
  } else if (uLook == 3) {
    c = mix(vec3(0.06, 0.36, 0.42), vec3(0.62, 0.78, 0.6), a * a) + vec3(0.05) * n(p * 2.0 + uTime * 0.05);
  } else if (uLook == 4) {
    c = mix(vec3(0.02, 0.055, 0.06), vec3(0.1, 0.26, 0.19), a * a * a);
  } else if (uLook == 5) {
    c = mix(vec3(0.36, 0.62, 0.62), vec3(0.62, 0.8, 0.78), a * a);
    vec2 f = dots(p * 3.0, 0.42); float floe = step(0.0, f.x) * step(0.35, a) * step(0.3, f.y + a * 0.6);
    c = mix(c, vec3(0.78, 0.86, 0.9) * (0.92 + 0.08 * f.x), floe);
  } else if (uLook == 6) { // (a tar pit: near-black, a glossy sheen, oil-slick rainbows drifting, slow bubbles, bones by its edge)
    float t = uTime * 0.02;
    vec2 q = p * 0.8 + (vec2(n(p * 0.5 + vec2(t, 2.0)), n(p * 0.5 - vec2(t, 7.0))) - 0.5) * 2.4; // (the swirls: p warped, slowly)
    vec2 e = vec2(0.04, 0.0); float g0 = n(q * 1.5), gx = n((q + e) * 1.5) - g0, gz = n((q + e.yx) * 1.5) - g0;
    vec3 N = normalize(vec3(-gx * 6.0, 1.0, -gz * 6.0)), V = normalize(cameraPosition - vW); // (its slow, heavy undulation)
    float spec = pow(max(dot(N, normalize(uMoonV + V)), 0.0), 30.0), fres = pow(1.0 - max(V.y, 0.0), 3.0);
    c = vec3(0.028, 0.025, 0.03) + vec3(0.12, 0.13, 0.16) * (0.5 * fres + 0.6 * smoothstep(0.5, 0.85, g0)); // (black, the sky's sheen at a slant and along its swells)
    float slick = smoothstep(0.44, 0.66, n(q * 0.6 + 13.0)) * smoothstep(0.02, 0.2, d); // (patches of oil, not at its very edge)
    vec3 rainbow = 0.5 + 0.5 * cos(6.2832 * (n(q * 1.3 - vec2(t * 3.0, 0.0)) * 2.0 + d * 0.6 + vec3(0.0, 0.33, 0.67)));
    c += rainbow * rainbow * slick * (0.36 + 0.2 * fres); // (squared: purer bands, as a film's)
    // the bubbles: a few cells each swelling a dome for most of its cycle, then a ring as it pops
    vec2 bc = floor(p * 0.8), bf = fract(p * 0.8) - 0.5 - (vec2(h(bc), h(bc + 4.1)) - 0.5) * 0.4;
    float ph = fract(uTime * (0.06 + 0.05 * h(bc + 8.3)) + h(bc + 2.9)), live = step(0.55, h(bc + 6.7)) * step(0.15, d), r = length(bf);
    float dome = step(ph, 0.86) * smoothstep(0.0, 0.86, ph) * 0.32, pop = step(0.86, ph) * (ph - 0.86) / 0.14;
    float inDome = live * step(r, dome);
    c = mix(c, vec3(0.03, 0.03, 0.035) + vec3(0.45, 0.45, 0.5) * smoothstep(0.45, 0.0, length(bf + vec2(0.35, 0.35) * dome) / max(dome, 1e-3)), inDome); // (a dome, lit up and to the left)
    c += live * step(0.0, dome - 0.02) * smoothstep(0.03, 0.0, abs(r - dome)) * vec3(0.2, 0.2, 0.24); // (its rim)
    c += live * pop * smoothstep(0.04, 0.0, abs(r - 0.06 - pop * 0.34)) * (1.0 - pop) * vec3(0.4, 0.4, 0.45);
    c += vec3(0.75, 0.78, 0.9) * spec * (1.0 - inDome * 0.5);
    // half-sunk bones by its edge: a rib cage's arcs, or a skull, pale and sparse
    vec2 kc = floor(p * 2.2), kf = fract(p * 2.2) - 0.5; float ko = h(kc + 1.7);
    if (ko > 0.88 && d < 0.22) {
      float arcs = 0.0; for (int k = 0; k < 3; k++) { vec2 o = kf - vec2(-0.18 + 0.18 * float(k), 0.08); arcs = max(arcs, smoothstep(0.07, 0.0, abs(length(o) - 0.16)) * step(o.y, 0.0)); }
      float skull = smoothstep(0.17, 0.12, length((kf - vec2(0.05, -0.05)) * vec2(1.0, 1.3)));
      c = mix(c, vec3(0.95, 0.9, 0.76) * (0.85 + 0.15 * n(kf * 9.0 + kc)), ko > 0.94 ? skull : arcs);
    }
    c = mix(c, vec3(0.07, 0.055, 0.045), smoothstep(0.05, 0.0, d)); // (its dull, sticky lip)
  } else if (uLook == 7) { // (Ed's reference, a Yellowstone pool from above: a deep blue throat, teal, green, a wide yellow and orange band, a white lip)
    float r = clamp(d + (n(p * 3.0) - 0.5) * 0.08, 0.0, 1.0);
    c = mix(vec3(0.95, 0.42, 0.06), vec3(1.0, 0.72, 0.12), smoothstep(0.08, 0.32, r));
    c = mix(c, vec3(0.42, 0.72, 0.22), smoothstep(0.32, 0.48, r));
    c = mix(c, vec3(0.08, 0.66, 0.64), smoothstep(0.46, 0.64, r));
    c = mix(c, vec3(0.03, 0.2, 0.42), smoothstep(0.78, 1.0, r));
    c = mix(c, vec3(0.92, 0.9, 0.84), smoothstep(0.07, 0.0, d)); // (the crusted white lip)
  } else if (uLook == 8) {
    c = mix(vec3(0.08, 0.22, 0.16), vec3(0.16, 0.34, 0.22), a);
    vec2 f = dots(p * 1.6, 0.55); float pad = step(0.0, f.x) * step(0.25, f.y);
    c = mix(c, vec3(0.26, 0.56, 0.22) * (0.75 + 0.35 * f.x), pad);
    c = mix(c, vec3(1.0, 0.66, 0.82), step(0.72, f.x) * step(0.7, f.y)); // (a flower on a few)
  } else c = mix(uDeep, uPale, a * a);
  gl_FragColor = vec4(c * uDim * moonLit(vL, 1.0 / uYScale), 1.0);
}`,hr=i=>i*i*(3-2*i),_x=i=>i*i,Wt={frame:1.6,swoop:2.8,run:1.2,dist:600,pitchDeg:50,onward:60},xx=.9;function yx(i,e=24,t=0,n){const r=n??__(i,e,{tier:t}),s=new Uint8Array(e*e*4);for(let o=0;o<e;o++)for(let l=0;l<e;l++){const c=o*e+l,u=((e-1-o)*e+l)*4;r[c]&&s.set([255,255,255,255],u)}const a=new fi(s,e,e);return a.magFilter=_t,a.minFilter=_t,a.needsUpdate=!0,a}function Sx(){const e=new Uint8Array(16384);for(let n=0;n<64;n++)for(let r=0;r<64;r++){const s=Math.hypot(r+.5-32,n+.5-32)/32,a=Math.max(0,1-s)**2;e.set([255,255,255,Math.round(a*255)],(n*64+r)*4)}const t=new fi(e,64,64);return t.magFilter=st,t.minFilter=st,t.needsUpdate=!0,t}function Mx(){const e=new Uint8Array(4096),t=7,n=(s,a,o)=>{if(s<0||a<0||s>=32||a>=32)return;const l=(a*32+s)*4;e.set([255,255,255,Math.max(e[l+3],Math.round(o*255))],l)};for(let s=0;s<t;s++){const a=s/t*Math.PI*2+.4,o=32*(.38+.04*Math.sin(s*2.3)),l=Math.round(32/2+Math.cos(a)*o),c=Math.round(32/2+Math.sin(a)*o),u=1+s%2;n(l,c,1);for(let d=1;d<=u;d++){const h=1-d/(u+1);n(l+d,c,h),n(l-d,c,h),n(l,c+d,h),n(l,c-d,h)}}const r=new fi(e,32,32);return r.magFilter=_t,r.minFilter=st,r.needsUpdate=!0,r}function bx(i){const e=i.outline,t=Q_(i);if(e&&e.loops.some(a=>a.sea)){const l=kt;let c=0;for(const d of e.loops)if(d.sea)for(let h=0;h<d.pts.length;h+=2)c=Math.max(c,Math.hypot(d.pts[h]-0,d.pts[h+1]-0));const u=[];for(const d of e.loops){const h=d.pts.length/2,p=h>160?2:1,g=[];for(let y=0;y<h;y+=p)g.push(new Me((d.pts[y*2]-0)*l,-(d.pts[y*2+1]-0)*l));g.length>=3&&u.push({pts:g,sea:d.sea})}if(u.some(d=>d.sea))return{loops:u,k:l,cx:0,cz:0,reach:c*l}}const n=h_(i.radii).map(([a,o])=>new Me(a-.5,-(o-.5))),r=Math.max(...n.map(a=>a.length())),s=t/r;return{loops:[{pts:n.map(a=>a.multiplyScalar(s)),sea:!0}],k:0,cx:0,cz:0,reach:t}}const Jc=new B,Qc=(i,e=1)=>new ke(i[0]/255*e,i[1]/255*e,i[2]/255*e);class Fo{constructor(e,t){this.canvas=e,this.tuning=t,this.renderer=new c_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=Sr,this.camera=new Kt(t.camera.fov??40,1,1,4e3),this.postTuning={...t,bloom:{...t.bloom}},this.post=new Y_(this.renderer,this.postTuning),this.scene.background=new ke(329230),this.scene.add(new sp(7372992,1581104,2.6));const n=new lp(13688063,3.2);n.position.set(-30,60,-90),this.scene.add(n),this.moonLight=n;const r=new St;r.setAttribute("position",new vt([-1,-1,0,3,-1,0,-1,3,0],3)),this.skyU={uRes:{value:new Me(1,1)},uTime:this.uTime,uMoon:{value:new Me(.28,.88)}};const s=new ut(r,new Et({vertexShader:ox,fragmentShader:lx,uniforms:this.skyU,depthWrite:!1,depthTest:!0,depthFunc:Xi}));s.frustumCulled=!1,s.renderOrder=9,this.scene.add(s),this.buildSea(),this.ring=new ut(new Os(.92,1,64).rotateX(-Math.PI/2),new wn({color:11066623,transparent:!0,blending:rn,depthWrite:!1})),this.ring.position.y=.15,this.ring.visible=!1,this.scene.add(this.ring)}canvas;tuning;renderer;camera;scene=new Po;post;postTuning;isles=new Map;lines=[];voyages=[];uTime={value:0};glow=Sx();sparkle=Mx();skyU;ring;focus=new B;aim=new B;dist=130;distTo=130;distOpen=130;distMax=200;sized=!1;pitch=.95;selected=null;orbit=0;yaw=0;flight=null;get flying(){return!!this.flight}w=1;h=1;unheight(e){const t=e.userData.hb;t&&(this.hScene.remove(t),this.hBodies=this.hBodies.filter(n=>n.hb!==t),this.markHeights())}markHeights(){this.hDirty||(this.hSince=this.now),this.hDirty=!0,this.hDue=Math.min(this.hSince+2,this.now+.5)}hSince=0;now=0;hDue=0;set(e,t){for(const n of this.isles.values())this.unheight(n.group);for(const n of this.isles.values())this.scene.remove(n.group);for(const n of this.lines)this.scene.remove(n);this.isles.clear(),this.lines=[];for(const n of e)this.isles.set(n.id,this.island(n));this.voyages=t;for(const n of t){const r=this.isles.get(n.from),s=this.isles.get(n.to);r&&s&&this.lines.push(this.voyage(r,s))}this.selected&&!this.isles.has(this.selected)&&(this.selected=null)}reshape(e,t){const n=this.isles.get(e);if(!n)return;const r=!n.pick;this.unheight(n.group),this.scene.remove(n.group);const s=this.island({...n.d,outline:t});r&&(s.rose=this.now),this.isles.set(e,s);for(const a of this.lines)this.scene.remove(a);this.lines=this.voyages.flatMap(a=>{const o=this.isles.get(a.from),l=this.isles.get(a.to);return o&&l?[this.voyage(o,l)]:[]})}island(e){const t=new Oi,n=e.x*ii,r=e.y*ii;t.position.set(n,0,r),this.scene.add(t);const{k:s,reach:a}=bx(e),o=e.unknown?.72:e.sail?1:.85,l=e.outline?.ground;if(!l||!(s>0))return{d:e,group:t,x:n,z:r,top:1,reach:a};const{cols:c,rows:u,step:d}=l,h=e.outline.mesh??ch(l,s),p=l.rgb instanceof Uint8Array?l.rgb:Uint8Array.from(l.rgb),g=new St;g.setAttribute("position",new xt(h.pos,3)),g.setAttribute("color",new xt(p,3,!0)),g.setAttribute("normal",new xt(h.normal,3)),g.setIndex(new xt(h.idx,1));const y=new fi(h.tile,c,u,Tr,zt);y.unpackAlignment=1,y.minFilter=y.magFilter=st,y.needsUpdate=!0;const m={uTile:{value:y},uTileB:{value:new je(l.x0*s,l.z0*s,1/(d*s),0)},uTileN:{value:new Me(c,u)},uTileMax:{value:h.tmax},uYScale:{value:1}},f=new ut(g,new Et({vertexShader:hx,fragmentShader:dx,uniforms:{...this.groundU,...m,uDim:{value:o}},vertexColors:!0})),S=h.top,R=new St;R.setAttribute("position",new xt(h.flat,3)),R.setAttribute("aDepth",new xt(h.depth,1)),R.setIndex(new xt(h.wi,1));const v=(w,A)=>new Et({vertexShader:fx,fragmentShader:px,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uOpaque:{value:A},uDeep:{value:w.deep},uPale:{value:w.pale}},transparent:A<1,depthWrite:A>=1});if(t.add(new ut(R,v(mx,0))),h.lakes){const w=h.lakes,A=new St;A.setAttribute("position",new xt(w.lp,3)),A.setAttribute("aDepth",new xt(w.ld,1)),A.setAttribute("aLook",new xt(w.lk,1)),A.setIndex(new xt(w.li,1)),t.add(new ut(A,new Et({vertexShader:gx,fragmentShader:vx,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uTime:this.uTime,uScale:{value:30*s},uDeep:{value:Zc.deep},uPale:{value:Zc.pale}}})))}t.add(f);{const w=new ut(f.geometry,this.heightMat);w.matrixAutoUpdate=!1,w.frustumCulled=!1,this.hScene.add(w),this.hBodies.push({hb:w,body:f}),t.userData.hb=w,this.markHeights()}const M={d:e,group:t,pick:f,x:n,z:r,top:S,reach:a,tileU:m};if(e.outline?.sigils?.length&&this.sigilInk.set(e.sigil,e.outline.sigils),e.sail){const w=mu(e.sigil),A=Math.max(ix,a*fh),_=new ut(new Cn(A,A).rotateX(-Math.PI/2),new wn({map:this.sigilArt(e.sigil,0),color:Qc(w,.95),transparent:!0,blending:rn,depthWrite:!1}));_.position.y=S+.35,t.add(_),M.sigil=_,M.tier=0,M.size=A;const E=new ut(new Cn(A*1.6,A*1.6).rotateX(-Math.PI/2),new wn({map:this.glow,color:Qc(w,.16),transparent:!0,blending:rn,depthWrite:!1}));if(E.position.y=S+.25,t.add(E),M.glow=E,e.fresh){const L=new ut(new Cn(A*1.9,A*1.9).rotateX(-Math.PI/2),new wn({map:this.sparkle,color:new ke(1,.95,.78),transparent:!0,blending:rn,depthWrite:!1}));L.position.y=S+.3,t.add(L),M.spark=L}}if(e.won){const w=a*1.3,A=new ut(new Os(w*.95,w,96).rotateX(-Math.PI/2),new wn({color:15250538,transparent:!0,blending:rn,depthWrite:!1}));A.position.y=.12,t.add(A)}return M}moonShared={uShadow:{value:0},uMoonV:{value:new B(-.3,.6,-.9).normalize()}};hmap=new Xt(Kc,Kc,{depthBuffer:!0,minFilter:st,magFilter:st,generateMipmaps:!1});moonU={...this.moonShared,uHMap:{value:this.hmap.texture},uHR:{value:ii*1.02},uHMax:{value:8}};hScene=new Po;hBodies=[];hDirty=!0;moonLight=null;moonT0=0;moonLast;moonP=new B;seaMoon={value:new B(-.3,.6,-.9)};stillMoon=null;heightMat=new Et({vertexShader:"uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",fragmentShader:"uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",uniforms:{uHR:this.moonU.uHR,uHMax:this.moonU.uHMax},side:Zt});groundU={...this.moonShared,uMoon:{value:new B(-.3,.6,-.9).normalize()},uShade:{value:new B(-.7,.45,-.55).normalize()},uRise:{value:3}};moonFrame(e){const t=this.tuning,n=_d(t);(this.moonLast===void 0||e-this.moonLast>1||e<this.moonLast)&&(this.moonT0=e),this.moonLast=e;const r=this.stillMoon!==null?{bearing:this.stillMoon,height:n.height,risen:1}:xd(e-this.moonT0,n),s=gi.degToRad(r.bearing),a=gi.degToRad(r.height),o=this.moonShared.uMoonV.value.set(Math.sin(s)*Math.cos(a),Math.sin(a),-Math.cos(s)*Math.cos(a));this.moonShared.uShadow.value=n.shadow*r.risen,this.groundU.uMoon.value.copy(o),this.groundU.uShade.value.set(Math.sin(s)*.8,.45,-Math.cos(s)*.8).normalize(),this.seaMoon.value.copy(o),this.moonLight?.position.copy(o).multiplyScalar(100);const l=this.skyU.uMoon.value;if(!n.disc)l.set(-1,-1);else{this.camera.updateMatrixWorld();const g=this.moonP.copy(o).multiplyScalar(this.seaR*1.6).project(this.camera);g.z>1||g.z<-1?l.set(-1,-1):l.set((g.x+1)/2,(g.y+1)/2)}Ul(t)!==this.band&&this.buildSea();for(const g of this.isles.values())g.tileU&&(g.tileU.uYScale.value=g.group.scale.y);if((!this.hDirty||e<this.hDue)&&!this.flight)return;this.hDirty=!1;let c=1;for(const{hb:g,body:y}of this.hBodies){y.updateWorldMatrix(!0,!1),g.matrix.copy(y.matrixWorld),g.matrix.elements[13]-=y.parent?.position.y??0,g.matrixWorld.copy(g.matrix);const m=y.geometry;m.boundingBox||m.computeBoundingBox(),c=Math.max(c,m.boundingBox.max.y)}this.moonU.uHMax.value=c*1.05;const u=this.renderer,d=u.getRenderTarget(),h=u.getClearColor(new ke),p=u.getClearAlpha();u.setRenderTarget(this.hmap),u.setClearColor(0,1),u.clear(),u.render(this.hScene,this.camera),u.setRenderTarget(d),u.setClearColor(h,p)}sea=null;fall=null;band=-1;seaR=ii*1.02;buildSea(){for(const t of[this.sea,this.fall])t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose());this.band=Ul(this.tuning);const e=this.seaR=ii*1.02*(1+this.band);this.moonU.uHR.value=e,this.markHeights(),this.sea=new ut(new Fs(e,160).rotateX(-Math.PI/2),new Et({vertexShader:rx,fragmentShader:sx,uniforms:{...this.moonU,uTime:this.uTime,uR:{value:e},uRings:{value:ii*1.02},uMoonDir:this.seaMoon}})),this.fall=new ut(new al(e,e*.97,40,160,1,!0).translate(0,-20,0),new Et({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ax,uniforms:{uTime:this.uTime},transparent:!0,depthWrite:!1,side:Zt})),this.scene.add(this.sea,this.fall)}sigilArts=new Map;sigilInk=new Map;sigilArt(e,t){const n=`${e}|${t}`;let r=this.sigilArts.get(n);if(!r){const s=this.sigilInk.get(e)?.[t];r=yx(e,hs[t].px,t,s&&s.px===hs[t].px?s.ink:void 0),this.sigilArts.set(n,r)}return r}voyage(e,t){const n=new Me(e.x,e.z),r=new Me(t.x,t.z),s=r.clone().sub(n),a=s.length(),o=new Me(-s.y,s.x).normalize(),l=n.clone().add(r).multiplyScalar(.5).add(o.multiplyScalar(a*.12)),c=48,u=.9,d=[],h=[],p=[],g=[],y=v=>{const M=1-v;return new Me(M*M*n.x+2*M*v*l.x+v*v*r.x,M*M*n.y+2*M*v*l.y+v*v*r.y)},m=e.reach/a*1.1,f=1-t.reach/a*1.1;for(let v=0;v<=c;v++){const M=m+(f-m)*(v/c),w=y(M),A=y(Math.min(1,M+.01)),_=A.sub(w).normalize(),E=new Me(-_.y,_.x).multiplyScalar(u);if(d.push(w.x+E.x,.2,w.y+E.y,w.x-E.x,.2,w.y-E.y),h.push(v/c,0,v/c,1),p.push(M*a,M*a),v<c){const L=v*2;g.push(L,L+1,L+2,L+1,L+3,L+2)}}const S=new St;S.setAttribute("position",new vt(d,3)),S.setAttribute("uv",new vt(h,2)),S.setAttribute("aAlong",new vt(p,1)),S.setIndex(g);const R=new ut(S,new Et({vertexShader:cx,fragmentShader:ux,uniforms:{uTime:this.uTime,uColour:{value:new ke(1,.72,.38)}},transparent:!0,blending:rn,depthWrite:!1,side:Zt}));return this.scene.add(R),R}reset(){this.set([],[]),this.selected=null,this.flight=null,this.orbit=0,this.yaw=0,this.pitch=.95,this.focus.set(0,0,0),this.aim.set(0,0,0),this.sized=!1,this.moonLast=void 0,this.stillMoon=null}dispose(){this.scene.traverse(e=>{const t=e;t.geometry?.dispose();for(const n of[].concat(t.material??[])){for(const r of Object.values(n))r instanceof Pt&&r.dispose();n.dispose()}}),this.glow.dispose(),this.sparkle.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}fly(e,t,n={}){const r=this.isles.get(e);if(!r)return!1;this.select(e),this.orbit=0,this.yaw=0;const{keys:s,G:a}=this.flightKeys(r,n),o=new Oi,l=a?(()=>{const h=Math.round(-a.z0/a.step),p=Math.round(-a.x0/a.step);return .06+Math.max(0,a.h[h*a.cols+p]??0)*kt*_r})():r.top,c=new ut(new Fs(1,32).rotateX(-Math.PI/2),new wn({color:new ke(.9,.5,1.2),transparent:!0,opacity:.9,blending:rn,depthWrite:!1})),u=new ut(new Cn(5,5).rotateX(-Math.PI/2),new wn({map:this.glow,color:new ke(.7,.4,1),transparent:!0,opacity:.8,blending:rn,depthWrite:!1}));o.add(c,u),o.position.y=l+.05,o.scale.setScalar(22*kt),r.group.add(o);const d=performance.now();return this.flight={id:e,t:0,keys:s,done:t,speed:Wt.onward*2/Wt.run,floor:o,size:r.size??1,rate:1,wall:0,wallStart:d,hold:n.hold,slow:n.slow,landingDue:()=>n.landingDue?.(d+s.at(-1).at*1e3)},!0}flightKeys(e,t){const n=e.d.outline?.ground;let r=e.d.outline?e.d.outline.box.maxZ:e.reach/kt;if(n){const u=Math.round(-n.x0/n.step);for(let d=Math.max(0,Math.round(-n.z0/n.step));d<n.rows;d++)if(!(n.h[d*n.cols+u]>0)){r=n.z0+d*n.step;break}}const s=gi.degToRad(t.pitchDeg??Wt.pitchDeg),a=(t.dist??Wt.dist)*kt,o=e.z+(r+(t.sea??-40))*kt,l=o+Wt.onward*kt;return{keys:[{x:this.focus.x,z:this.focus.z,dist:this.dist,pitch:this.pitch,at:0,ease:hr},{x:e.x,z:e.z,dist:Math.max(Na,e.reach*4.2),pitch:.95,at:Wt.frame,ease:hr},{x:e.x,z:l,dist:a,pitch:s,at:Wt.frame+Wt.swoop,ease:hr},{x:e.x,z:o,dist:a,pitch:s,at:Wt.frame+Wt.swoop+Wt.run,ease:_x}],G:n}}flightEnd(e,t={}){const n=this.isles.get(e);if(!n)return null;const r=this.flightKeys(n,t).keys.at(-1);return{x:0,z:(r.z+Math.cos(r.pitch)*r.dist-n.z)/kt,height:Math.sin(r.pitch)*r.dist/kt,pitch:r.pitch,fov:this.camera.fov,speed:Wt.onward*2/Wt.run}}skipFlight(){this.flight&&(this.flight.t=this.flight.keys.at(-1).at,this.flight.rate=1,this.flight.slow=void 0,this.flight.held=!1)}flyFrame(e,t){const n=this.flight,r=this.isles.get(n.id),s=n.keys.at(-1).at;u_(n,e,n.keys[1].at,s,(performance.now()-n.wallStart)/1e3);let a=1;for(;a<n.keys.length-1&&n.t>n.keys[a].at;)a++;const o=n.keys[a-1],l=n.keys[a],c=l.ease(Math.min(1,Math.max(0,(n.t-o.at)/(l.at-o.at)))),u=(p,g)=>p+(g-p)*c;this.focus.set(u(o.x,l.x),0,u(o.z,l.z)),this.aim.copy(this.focus),this.dist=this.distTo=u(o.dist,l.dist),this.pitch=u(o.pitch,l.pitch);const d=hr(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(n.keys[2].at-n.keys[1].at))));r.group.scale.y=1+(1/_r-1)*d;const h=hr(Math.min(1,n.t/n.keys[1].at));if(r.sigil){const p=1+(60*kt/n.size-1)*h;r.sigil.scale.set(p,1,p),r.glow?.scale.set(p,1,p)}n.floor.rotation.y=t*.6,n.floor.children[0].scale.setScalar(.9+.1*Math.sin(t*6))}select(e,t=!1){this.selected=e&&this.isles.has(e)?e:null;const n=this.selected?this.isles.get(this.selected):null;this.aim.set(n?n.x:0,0,n?n.z:0),t&&this.focus.copy(this.aim)}zoom(e){this.distTo=Math.max(Na,Math.min(this.distMax,this.distTo*e))}pick(e,t){const n=this.canvas.getBoundingClientRect(),r=new Me((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),s=new hp;s.setFromCamera(r,this.camera);const a=s.intersectObjects([...this.isles.values()].flatMap(u=>u.pick?[u.pick]:[]),!1)[0];if(a){for(const[u,d]of this.isles)if(d.pick===a.object)return u}const o=new B;if(!s.ray.intersectPlane(new En(new B(0,1,0),0),o))return null;let l=null,c=1/0;for(const[u,d]of this.isles){const h=Math.hypot(d.x-o.x,d.z-o.z)-d.reach;h<c&&(c=h,l=u)}return c<6?l:null}moonDisc(){const e=this.skyU.uMoon.value;if(e.x<0||e.x>1||e.y<0||e.y>1)return null;const t=this.canvas.getBoundingClientRect();return{x:t.left+e.x*t.width,y:t.top+(1-e.y)*t.height,r:.045*t.height}}screenTopOf(e){const t=this.isles.get(e);if(!t)return null;const n=this.canvas.getBoundingClientRect(),r=new B,s=Math.max(t.reach,(t.size??0)*.8*(t.glow?.scale.x??1),(t.size??0)*.95*(t.spark?.scale.x??0));return d_((a,o,l)=>(r.set(a,o+t.group.position.y,l).project(this.camera),{x:(r.x+1)/2*n.width,y:(1-r.y)/2*n.height}),t.x,t.top,t.z,s)}screenOf(e){const t=this.isles.get(e);if(!t)return null;const n=new B(t.x,t.top,t.z).project(this.camera),r=this.canvas.getBoundingClientRect();return{x:(n.x+1)/2*r.width,y:(1-n.y)/2*r.height}}made={w:0,h:0};resize(e,t){const n=dh,r=Math.max(1,Math.ceil(e/n)),s=Math.max(1,Math.ceil(t/n));if(this.sized&&r===this.w&&s===this.h)return;this.w=r,this.h=s,(this.made.w!==r||this.made.h!==s)&&(this.renderer.setSize(r,s,!1),this.post.resize(r,s,r,s),this.made={w:r,h:s}),this.canvas.style.width=`${this.w*n}px`,this.canvas.style.height=`${this.h*n}px`,this.camera.aspect=this.w/this.h,this.camera.updateProjectionMatrix(),this.skyU.uRes.value.set(this.w,this.h),this.postTuning.bloom.strength=this.tuning.bloom.strength*Math.max(.3,Math.min(1,(this.h-60)/180));const a=l=>nx*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*l),o=this.distOpen;this.distOpen=a(ex),this.distMax=a(tx),this.sized?(this.distTo=Math.max(Na,Math.min(this.distMax,this.distTo*(this.distOpen/o))),this.dist=this.distTo):(this.dist=this.distTo=this.distOpen,this.sized=!0)}frame(e,t){this.uTime.value=t,this.now=t;const n=1-Math.exp(-e*3.2);this.flight?this.flyFrame(e,t):(this.focus.lerp(this.aim,n),this.dist+=(this.distTo-this.dist)*n),this.yaw+=e*this.orbit;const r=Math.cos(this.pitch)*this.dist,s=Math.sin(this.yaw),a=Math.cos(this.yaw);this.camera.position.set(this.focus.x+r*s,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+r*a);const o=this.orbit||this.flight?0:this.dist*.035;this.camera.lookAt(this.focus.x,0,this.focus.z+o);const l=Math.max(.5,this.dist*.25),c=this.dist*3+400;(Math.abs(l-this.camera.near)>.01||Math.abs(c-this.camera.far)>1)&&(this.camera.near=l,this.camera.far=c,this.camera.updateProjectionMatrix()),this.post.lift=0;for(const h of this.isles.values()){const p=.85+.15*Math.sin(t*1.6+h.x*.1),g=h.d.id===this.selected;let y=1;if(h.sigil){const f=h.sigil.material,S=h.size*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(Jc.set(h.x,h.top,h.z)));y=S>220?Math.max(0,1-(S-220)/260):1,f.opacity=p*y,h.sigil.visible=y>0;let R=0;for(let v=1;v<hs.length;v++)S>=hs[v].from&&(R=v);R!==h.tier&&(h.tier=R,f.map=this.sigilArt(h.d.sigil,R),f.needsUpdate=!0)}if(h.glow&&(h.glow.material.opacity=(g?.85:.7)*p*y,h.glow.visible=h.sigil?.visible??!0),h.spark){const f=.5+.5*Math.sin(t*4.2+h.x*.3),S=h.spark.material;S.opacity=(.45+.55*f)*y,h.spark.visible=h.sigil?.visible??!0;const R=h.size*1.9*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(Jc.set(h.x,h.top,h.z))),v=(h.sigil?h.sigil.scale.x:1)*Math.max(1,32/Math.max(1,R));h.spark.scale.set(v,1,v),h.spark.rotation.y=t*.25}let m=0;if(h.rose!==void 0){const f=Math.min(1,(t-h.rose)/xx),S=1-(1-f)**3;m=-(h.top+.6)*(1-S),f>=1&&(h.rose=void 0)}h.group.position.y=m+(g?Math.sin(t*2)*.12:0)}const u=this.selected?this.isles.get(this.selected):null;if(this.ring.visible=!!u&&!this.flight,u){const h=u.reach*1.6*(1+.04*Math.sin(t*3));this.ring.position.set(u.x,.15,u.z),this.ring.scale.set(h,1,h),this.ring.material.opacity=.7+.3*Math.sin(t*3)}this.moonFrame(t),this.post.render(this.scene,this.camera);const d=this.flight;if(d&&d.t>=d.keys.at(-1).at&&!d.held){const h=this.isles.get(d.id),p=this.camera.position;this.flight=null,d.done({cam:{x:(p.x-h.x)/kt,z:(p.z-h.z)/kt,height:p.y/kt,pitch:this.pitch,fov:this.camera.fov,speed:d.speed*d.rate},still:this.canvas.toDataURL("image/jpeg",.88)})}}}let Bt=null;function ph(i){return Bt?.prep?(Bt.prep=!1,Bt.chart):Bt&&!Bt.busy?(Bt.busy=!0,Bt.chart):Bt?new Fo(document.createElement("canvas"),i):(Bt={chart:new Fo(document.createElement("canvas"),i),busy:!0},Bt.chart)}function mh(i){if(Bt?.chart!==i){i.dispose();return}i.reset(),Bt.busy=!1}function jc(i,e){const s=new Float32Array(81),a=new Uint8Array(81),o=new Float32Array(81),l=new Uint8Array(81),c=new Uint8Array(243).fill(120);for(let h=0;h<9;h++)for(let p=0;p<9;p++){const g=h*9+p,y=Math.hypot(p-4,h-4);s[g]=y<3.5?40-y*8:-20,y<1.2?(a[g]=2,o[g]=s[g]+2,l[g]=1):s[g]<=0&&(a[g]=1)}const u={x0:-400,z0:-400,step:100,cols:9,rows:9,h:s,rgb:c,water:a,level:o,looks:l},d=new Float32Array([-300,0,0,-300,300,0,0,300]);return{id:i,x:e,y:0,phase:1,radii:[1,1,1,1],sail:!0,unknown:!1,won:!0,sigil:"home",outline:{loops:[{pts:d,sea:!0}],box:{minX:-300,maxX:300,minZ:-300,maxZ:300},ground:u,mesh:ch(u,kt)}}}async function lS(i){if(Bt)return;const e=ph(i),t=Bt;t.prep=!0;try{e.resize(innerWidth*.92-4,innerHeight*.92-4),e.set([jc("home",0),jc("standIn",.2)],[{from:"home",to:"standIn"}]);const n=e;if(await Promise.all([n.scene,n.hScene].map(r=>e.renderer.compileAsync(r,e.camera))).catch(()=>{}),!t.prep)return;e.frame(1/60,0),e.frame(1/60,3);for(const r of e.renderer.info.programs??[])r.getUniforms()}finally{t.prep&&(t.prep=!1,mh(e),performance.mark("witch:chart-prepared"))}}const wx={hat:{shape:"classic",height:1.11,brim:1.45,tilt:.734,band:1.26},hair:"long",top:"jacket",cloak:"short",broom:{kind:"classic",length:1.2,bend:-.673,bristles:1.096,thickness:.67},accessories:{phones:!1,shades:!1,glowsticks:!1,scarf:!0,satchel:!0,pendant:!1,earrings:!1,lantern:!1,vial:!1,book:!1,patches:!1,bumbag:!1,purse:!1,tote:!1,duffel:!1,briefcase:!1,clutch:!1,messenger:!1,wristband:!1,chunky:!1},cloakLength:2.318,scarfLength:2.275,bagSize:2.512,backpackSize:0,palette:{hair:[0,0,.1775],hat:[.8333,1,.3],headphones:[.0833,1,1],top:[.0833,.5,1],jacket:[.8333,1,.3],jeans:[.6667,.5,1],sneakers:[.0833,.5,1],broom:[.0833,1,.3],bristles:[.1667,1,.74],skin:[.07,.22,.96],pattern:[.1667,.12,1],trim:[0,.72,1],flower:[.9167,.5,1],flower2:[.1667,.5,1],cup:[0,.72,1],glow:[.9167,.72,1],glow2:[.3333,.72,1],shades:[.5833,1,.13],frame:[.0833,.5,1],cloak:[.75,1,.3],scarf:[.5,.5,1],satchel:[.0833,1,.3],lantern:[0,0,.295],book:[0,0,.1775],bumbag:[0,0,.53],band:[.9167,.72,1],vial:[.6667,.12,1],plume:[.9167,1,.3],gold:[.0833,.72,1],backpack:[.3333,1,1]}},Ex=null,gh={genome:wx,broom:Ex},Tx="The starting appearance for a brand-new witch. Detailed notes and decisions: docs/notes/config-history/default-look.md.",Ax=Xh,vh=Wh;function cS(i,e){const t=e&&Va.some(n=>e[n])?Object.fromEntries(Va.map(n=>[n,e[n]??null])):null;return JSON.stringify({_:Tx,genome:i?vh(JSON.parse(JSON.stringify(i))):null,broom:t},null,2)+`
`}function uS(i=gh){if(!i.genome||typeof i.genome!="object")return null;const e=vh(JSON.parse(JSON.stringify(i.genome)));return Ax(e).length?null:e}function hS(i=gh){const e=Yh(),t=i.broom;if(t&&typeof t=="object")for(const n of Va){const r=t[n];typeof r=="string"&&qh(r)?.slot===n&&(e[n]=r)}return e}const cl=()=>{try{return new URLSearchParams(globalThis.location?.search??"").get("newWitch")==="1"}catch{return!1}};function dS(i){const e=new URL(i);for(const t of["hat","hats","parts","bag"])e.searchParams.delete(t);return e.searchParams.set("newWitch","1"),e.toString()}const eu=new WeakMap,Rx=_h(null);function _h(i){const e=new Map,t=new Set,n=r=>{t.has(r)||(t.add(r),console.warn(`[storage] ${r}: browser storage unavailable; changes are kept for this page only.`))};return{getItem(r){if(e.has(r))return e.get(r);try{if(i)return i.getItem(r)}catch{}return n(r),null},setItem(r,s){e.set(r,s);try{if(i){i.setItem(r,s),e.delete(r);return}}catch{}throw n(r),new Error(`Browser storage refused ${r}`)}}}function Cx(i){if(i===void 0&&(i=Gs),!i)return Rx;let e=eu.get(i);return e||(e=_h(i),eu.set(i,e)),e}const ul="witch.hats",hl=Cx;function ks(i){if(cl())return[];try{const e=JSON.parse(hl(i)?.getItem(ul)??"[]");return Array.isArray(e)?Ts.filter(t=>e.includes(t)):[]}catch{return[]}}function fS(i,e){const t=ks(e);if(Ts.includes(i)&&!t.includes(i)&&t.push(i),!cl())try{hl(e)?.setItem(ul,JSON.stringify([...t].sort()))}catch{}return ks(e)}function pS(i,e){if(!cl())try{hl(e).setItem(ul,JSON.stringify(ks(e).filter(t=>t!==i)))}catch{}}function Px(i,e,t){const n=i.get("hats");if(n==="all"||n==="*")return"*";const r=n!==null?Ts.filter(s=>n.split(",").includes(s)):ks(t);return i.get("hat")!==null&&Ts.includes(e)&&!r.includes(e)&&r.push(e),r.join(",")}const Oo="witch.debug.unlockAll",xh=i=>{try{return i??Gs??null}catch{return null}};function dl(i){try{return xh(i)?.getItem(Oo)==="1"}catch{return!1}}function mS(i,e){try{const t=xh(e);i?t?.setItem(Oo,"1"):t?.removeItem(Oo)}catch{}}function gS(i){for(const e of $h)i.mushrooms.baskets[e]=Math.max(20,i.mushrooms.baskets[e])}const vS=(i,e=dl())=>e?new Set([...i,...cd.map(t=>t.id)]):new Set(i),_S=(i,e=dl())=>e?new Set([...i,...Jh]):new Set(i);function xS(i,e,t=new URLSearchParams){const n=Px(t,t.get("hat")??"none");i.spells.hats=e||n==="*"?void 0:n.split(",").filter(Boolean);const r=i.house?.hats;if(!r)return;for(let a=0;a<r.length;a++)r[a]&&!Dr(i.spells,r[a])&&(r[a]="");const s=new Set([i.spells.hat,...i.hat.left.map(a=>a.spell),...r.filter(Boolean)]);if(Kh.layout?.hatPoints.length){i.house?.hatOverflow&&(i.house.hatOverflow=i.house.hatOverflow.filter(a=>Dr(i.spells,a))),Al.forEach(a=>{!s.has(a)&&Dr(i.spells,a)&&Zh(i,a)});return}Al.forEach((a,o)=>{!r[o]&&!s.has(a)&&Dr(i.spells,a)&&(r[o]=a,s.add(a))})}const tu={33321:1,33323:2,32849:4,32856:4,35905:4,35907:4,33325:2,33327:4,34843:8,34842:8,33326:4,33328:8,34837:16,34836:16,33329:1,33330:1,33331:2,33332:2,33333:4,33334:4,33335:2,33336:2,33337:4,33338:4,33339:8,33340:8,36238:4,36220:4,36232:8,36214:8,36226:16,36208:16,32857:4,35898:4,35901:4,32854:2,32855:2,36194:2,33189:2,33190:4,36012:4,35056:4,36013:8,36168:1,34041:4},nu={6408:4,6407:3,6406:1,6409:1,6410:2,6403:1,33319:2,36244:1,33320:2,36248:3,36249:4,6402:1},Lx={5121:1,5120:1,5123:2,5122:2,5125:4,5124:4,5126:4,5131:2,36193:2},iu={32819:2,32820:2,33635:2,34042:4,33640:4,35899:4,35902:4,36269:8},Dx=33984,ds=34067,Ni=34069,Ux=32879,Ix=1285;function jn(i,e,t){return tu[i]?tu[i]:t!==void 0&&iu[t]?iu[t]:(nu[e??i]??nu[i]??4)*(t!==void 0?Lx[t]??1:1)}function yS(i,e){return Math.max(i.floor,Math.min(i.ceil,i.mb*e/(i.refWidth*i.refHeight)))}const Ms=new Map;function Nx(i,e){return Ms.has(i)||i.addEventListener("dispose",()=>Ms.delete(i)),Ms.set(i,e),i}class SS{constructor(e,t=()=>0){this.gl=e,this.canvasBytes=t;const n=e,r=this,s=(u,d,h=!1)=>{const p=n[u];typeof p=="function"&&(n[u]=function(...g){h&&d(g);const y=p.apply(e,g);return h||d(g),y})},a=u=>u>=Ni&&u<Ni+6?ds:u,o=u=>r.bound.get(r.unit<<16|a(u))??null,l=(u,d,h)=>{const p=o(u);if(!p)return;let g=r.tex.get(p);g||r.tex.set(p,g={levels:new Map,bytes:0});const y=(u-(a(u)===ds?Ni:0))*64+d,m=g.levels.get(y)??0;g.levels.set(y,h),g.bytes+=h-m,r.texBytes+=h-m};s("activeTexture",u=>{r.unit=u[0]-Dx}),s("bindTexture",u=>{r.bound.set(r.unit<<16|u[0],u[1]??null)}),s("texImage2D",u=>{const[d,h,p]=u;if(u.length>=8){const[,,,g,y,,m,f]=u;l(d,h,g*y*jn(p,m,f))}else if(u.length===6){const g=u[5],y=g?.videoWidth||g?.displayWidth||g?.width||0,m=g?.videoHeight||g?.displayHeight||g?.height||0;l(d,h,y*m*jn(p,u[3],u[4]))}}),s("texImage3D",u=>{const[d,h,p,g,y,m,,f,S]=u;l(d,h,g*y*m*jn(p,f,S))}),s("compressedTexImage2D",u=>{const[d,h]=u,p=u[u.length-1];l(d,h,typeof p=="number"?p:p?.byteLength??0)}),s("texStorage2D",u=>{const[d,h,p,g,y]=u,m=jn(p),f=d===ds?6:1;for(let S=0;S<f;S++)for(let R=0;R<h;R++)l(f>1?Ni+S:d,R,Math.max(1,g>>R)*Math.max(1,y>>R)*m)}),s("texStorage3D",u=>{const[d,h,p,g,y,m]=u,f=jn(p);for(let S=0;S<h;S++)l(d,S,Math.max(1,g>>S)*Math.max(1,y>>S)*(d===Ux?Math.max(1,m>>S):m)*f)}),s("generateMipmap",u=>{const d=u[0],h=d===ds?6:1,p=o(d),g=p&&r.tex.get(p);if(g)for(let y=0;y<h;y++){const m=h>1?Ni+y:d,f=g.levels.get((m-(h>1?Ni:0))*64)??0;l(m,63,Math.round(f/3))}}),s("deleteTexture",u=>{const d=r.tex.get(u[0]);d&&(r.texBytes-=d.bytes,r.tex.delete(u[0]))},!0),s("copyTexImage2D",u=>{const[d,h,p,,,g,y]=u;l(d,h,g*y*jn(p))}),s("framebufferTexture2D",u=>{u[3]&&r.attached.add(u[3])}),s("framebufferTextureLayer",u=>{u[2]&&r.attached.add(u[2])}),s("bindRenderbuffer",u=>{r.rb=u[1]??null});const c=(u,d,h,p)=>{if(!r.rb)return;const g=r.rbs.get(r.rb)??0,y=d*h*jn(u)*Math.max(1,p);r.rbs.set(r.rb,y),r.rbBytes+=y-g};s("renderbufferStorage",u=>{const[,d,h,p]=u;c(d,h,p,1)}),s("renderbufferStorageMultisample",u=>{const[,d,h,p,g]=u;c(h,p,g,d)}),s("deleteRenderbuffer",u=>{const d=r.rbs.get(u[0]);d!==void 0&&(r.rbBytes-=d,r.rbs.delete(u[0]))},!0)}gl;canvasBytes;tex=new Map;rbs=new Map;bound=new Map;unit=0;rb=null;attached=new WeakSet;texBytes=0;rbBytes=0;ooms=0;reset(){this.tex.clear(),this.rbs.clear(),this.bound.clear(),this.texBytes=this.rbBytes=0,this.unit=0,this.rb=null}get total(){return this.texBytes+this.rbBytes+this.canvasBytes()}bytesOf(e,t){const n=t&&e.properties.get(t).__webglTexture;return n&&this.tex.get(n)?.bytes||0}report(e){const t={},n=new Set,r=(o,l)=>{const c=l&&e.properties.get(l).__webglTexture,u=c&&!n.has(c)&&this.tex.get(c);u&&(n.add(c),t[o]=(t[o]??0)+u.bytes)};for(const[o,l]of Ms)if(o.isRenderTarget){const c=o;for(const u of c.textures)r(l,u);r(l,c.depthTexture)}else r(l,o);let s=0,a=0;for(const[o,l]of this.tex)n.has(o)||(this.attached.has(o)?a+=l.bytes:s+=l.bytes);return t.other=s,t.targets=(t.targets??0)+a+this.rbBytes,t.canvas=this.canvasBytes(),{total:this.total,byKind:t,textures:this.tex.size,buffers:this.rbs.size}}check(){let e=!1;for(let t=0,n=this.gl.getError();n&&t<8;t++,n=this.gl.getError())n===Ix&&(e=!0);return e&&this.ooms++,e}}function MS(i,e,t){const n=s=>(s/1048576).toFixed(0),r=Object.entries(i.byKind).filter(([,s])=>s>=524288).sort((s,a)=>a[1]-s[1]).map(([s,a])=>`${s} ${n(a)}`);return`gpu    ${n(i.total)} of ${e.toFixed(0)} MB  ${r.join("  ")}${t?`  · ${t} let go`:""}`}const In={uHeight:{value:null},uHeightWin:{value:new je(0,ms,0,0)},uBend:{value:new je(0,0,0,0)},uBendFwd:{value:new Me(0,-1)}},Fx=`
uniform sampler2D uHeight;
uniform vec4 uHeightWin, uBend;
uniform vec2 uBendFwd;
float groundH(vec2 p) {
  if (uHeightWin.x <= 0.0) return 0.0;
  float hw = uHeightWin.y * uHeightWin.x * 0.5;
  vec2 e = abs(p - uHeightWin.zw);
  float k = 1.0 - smoothstep(hw - 60.0, hw - 16.0, max(e.x, e.y));
  if (k <= 0.0) return 0.0;
  return texture2D(uHeight, (p / uHeightWin.x + 0.5) / uHeightWin.y).r * k;
}
vec3 onGround(vec3 p) { return vec3(p.x, p.y + groundH(p.xz), p.z); }
vec3 bendW(vec3 w) {
  if (uBend.x == 0.0) return w;
  float d = max(0.0, dot(w.xz - uBend.yz, uBendFwd));
  return vec3(w.x, w.y - uBend.x * d * d, w.z);
}
`,Ox=Fx+`
// 1 if a (lifted, unbent) world point shows over the bent ground's horizon, 0 if the bend hides it
// (seenOverBend's twin): for what is drawn without a depth test, like lights glimmering through the
// canopy, so they don't show through the earth (Ed, v256).
float overBend(vec3 w) {
  if (uBend.x <= 0.0) return 1.0;
  float ahead = dot(w.xz - uBend.yz, uBendFwd);
  if (ahead <= 0.0) return 1.0;
  float D = max(1.0, -dot(cameraPosition.xz - uBend.yz, uBendFwd)), H = cameraPosition.y + uBend.w + 3.0; // (uBend.w: the hills' amplitude)
  float dh = -D + sqrt(D * D + H / uBend.x);
  if (ahead <= dh) return 1.0;
  float m = (H + uBend.x * dh * dh) / (dh + D);
  return (H - w.y + uBend.x * ahead * ahead) / (ahead + D) <= m + 0.02 ? 1.0 : 0.0;
}
// 1 if nothing of the bent, rolling ground stands between a (lifted, unbent) world point and the camera, 0 if it hides it:
// the bend's horizon, and the hills on the way, marched in 16 steps along the line of sight, both bent as drawn (Ed, 2026-10-06:
// "I shouldn't see anything on the ground that's obscured when it goes past the bend"). For what is drawn without a depth
// test, or past one (the ley line through the trees, its pixel heads), so it hides where the earth would hide it.
float groundSeen(vec3 w) {
  if (overBend(w) < 0.5) return 0.0;
  vec3 b = bendW(w);
  for (int i = 1; i < 16; i++) {
    vec3 q = mix(b, cameraPosition, float(i) / 16.0);
    if (bendW(vec3(q.x, groundH(q.xz), q.z)).y > q.y + 0.3) return 0.0;
  }
  return 1.0;
}
`,kx=Ox+`
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
`;function bS(i){return new Et({vertexShader:`attribute vec4 color;
varying vec4 vCol;
uniform float uSize;
${kx}
void main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,fragmentShader:`varying vec4 vCol;
void main() { gl_FragColor = vCol; }`,uniforms:{...In,uSize:{value:i}},transparent:!0,depthWrite:!1,blending:rn})}class wS extends Qh{texture;constructor(e,t,n){const r=performance.now();super(e,t,n,Ff,jh(e)),yh=this.H.on?this.H.amplitude:0,this.texture=new fi(this.half,ms,ms,Tr,on);const s=Nx(this.texture,"ground");s.magFilter=s.minFilter=st,s.wrapS=s.wrapT=As,s.generateMipmaps=!1,s.colorSpace=fn,s.needsUpdate=!0,In.uHeight.value=s,this.filled&&this.changed();try{performance.mark("witch:height-prep-source",{detail:{seed:e.seed,status:this.prepSource,ms:performance.now()-r,filled:this.filled,ci:this.ci,cj:this.cj}})}catch{}}changed(){this.texture.needsUpdate=!0,In.uHeightWin.value.set(this.H.on?Js:0,ms,this.ci*Js,this.cj*Js)}dispose(){this.texture.dispose()}}let yh=0,ko=null;function ES(i){ko=i}function wr(i,e){return ko?ko.heightAt(i,e):0}function Bo(i){const e=In.uBend.value,t=In.uBendFwd.value;if(e.x===0)return i;const n=Math.max(0,(i.x-e.y)*t.x+(i.z-e.z)*t.y);return i.y-=e.x*n*n,i}function Bx(i,e,t,n,r=1/0){if(t<=0||i<=0)return!0;const s=In.uBend.value,a=Math.max(1,n.z-s.z),o=n.y+yh+3,l=-a+Math.sqrt(a*a+o/t);if(i<=l)return!0;if(i>l+r)return!1;const c=(o+t*l*l)/(l+a);return(o-e+t*i*i)/(i+a)<=c+.02}function Sh(i,e,t,n){const r=In.uBend.value,s=In.uBendFwd.value;if(r.x<=0)return!0;const a=(i-r.y)*s.x+(t-r.z)*s.y;if(a<=0)return!0;const o=Math.max(1,-((n.x-r.y)*s.x+(n.z-r.z)*s.y)),l=n.y+r.w+3,c=-o+Math.sqrt(o*o+l/r.x);if(a<=c)return!0;const u=(l+r.x*c*c)/(c+o);return(l-e+r.x*a*a)/(a+o)<=u+.02}function TS(i,e,t,n){return Sh(i,e+wr(i,t),t,n)}const ru=16,ei={x:0,y:0,z:0},dr={x:0,y:0,z:0};function AS(i,e,t,n){const r=e+wr(i,t);if(!Sh(i,r,t,n))return!1;ei.x=i,ei.y=r,ei.z=t,Bo(ei);const s=ei.x,a=ei.y,o=ei.z;for(let l=1;l<ru;l++){const c=l/ru,u=s+(n.x-s)*c,d=a+(n.y-a)*c,h=o+(n.z-o)*c;if(dr.x=u,dr.y=wr(u,h),dr.z=h,Bo(dr),dr.y>d+.3)return!1}return!0}function zx(i){return i.y+=wr(i.x,i.z),Bo(i)}const Rr=3,su=new Map;function RS(i,e=3){const t=`${i}:${e}`,n=su.get(t);if(n)return n;const r=Math.round(i*1.7)+4,s=Math.round(i*1.5)+4,a=Math.max(2,Math.round(i/10)),o=Array.from({length:Math.max(1,e)},(C,U)=>a+U);let l=0;for(let C=1;C<o.length;C++)l+=Math.round((o[C]+o[C-1])*.55);const c=Math.max(1,o[0]+2+l-Math.round(r*.28)),u=0,d=c+r/2,h=Math.ceil(c+r+1),p=r*.4,g=s*.3,y=u+s*.6,m=[[.5,.35,.33],[.25,.47,.25],[.75,.45,.27],[.1,.66,.17],[.9,.64,.18],[.34,.76,.22],[.66,.77,.21]].map(([C,U,D])=>[c+C*r,u+U*s,D*s]),f=(C,U)=>{const D=C+.5,N=U+.5;if(((D-d)/p)**2+((N-y)/g)**2<=1)return!0;for(const[J,Z,ie]of m)if((D-J)**2+(N-Z)**2<=ie*ie)return!0;return!1},S=[];let R=Math.round(c+r*.28),v=0;for(let C=-o[o.length-1];C<=o[o.length-1];C++)for(let U=0;U<s+4;U++)f(R+C,U)&&(v=Math.max(v,U));let M=v+2+o[o.length-1];for(let C=o.length-1;C>=0;C--)S.unshift({x:R,y:M,r:o[C]}),C&&(M+=o[C]+o[C-1]+1,R-=Math.round((o[C]+o[C-1])*.55));const w=S[0].y+o[0]+1,A=(C,U)=>{if(f(C,U))return!0;const D=C+.5,N=U+.5;for(const J of S)if((D-J.x)**2+(N-J.y)**2<=J.r*J.r+.6)return!0;return!1},_=new Uint8Array(h*w);for(let C=0;C<w;C++)for(let U=0;U<h;U++)A(U,C)&&(_[C*h+U]=2);for(let C=0;C<2;C++)for(let U=0;U<w;U++)for(let D=0;D<h;D++){const N=U*h+D;_[N]&&+(D>0&&!!_[N-1])+ +(D<h-1&&!!_[N+1])+ +(U>0&&!!_[N-h])+ +(U<w-1&&!!_[N+h])<2&&(_[N]=0)}const E=(C,U)=>C>=0&&U>=0&&C<h&&U<w&&_[U*h+C]!==0,L=[];for(let C=0;C<w;C++)for(let U=0;U<h;U++)_[C*h+U]&&(!E(U-1,C)||!E(U+1,C)||!E(U,C-1)||!E(U,C+1))&&L.push(C*h+U);for(const C of L)_[C]=1;const I={w:h,h:w,px:_,box:{x:Math.round(d-i/2),y:Math.round(u+s*.55-i/2),n:i},foot:{x:S[0].x,y:S[0].y},puffs:S};return su.set(t,I),I}function Hx(i,e,t,n){for(let r=0;r<i.px.length;r++){const s=i.px[r]===1?e:i.px[r]===2?t:null,a=r*4;if(!s){n[a+3]=0;continue}n[a]=s[0],n[a+1]=s[1],n[a+2]=s[2],n[a+3]=Math.round(s[3]*255)}}function CS(i,e,t,n=!0){if(!n)return{kind:"emoji",alpha:1};const r=Math.max(.2,t.hold),s=i+e%11*r*.29,a=Math.floor(s/r),o=s-a*r,l=a%2===0?"emoji":ed(e,a,9127)<t.flask?"flask":"sigil",c=Math.max(.001,Math.min(t.fade,r/2)),u=Math.max(0,Math.min(1,o/c,(r-o)/c));return{kind:l,alpha:u*u*(3-2*u)}}const au=(i,e)=>Math.round(i/e)*e;function Mh(i,e){if(e===void 0)return 1;const t=i.bubbles.levelScale??[1];return t[Math.max(0,Math.min(t.length-1,e))]}const Gx=(i,e)=>Math.max(1,Math.round(Rr*Mh(i,e)));function Vx(i,e,t,n){const r=Mh(t,n),s=t.pixelSize*t.bubbles.scale*r,a=t.bubbles.emojiPixels;i.style.setProperty("--px",`${Gx(t,n)}px`),e.style.width=e.style.height=`${Math.round(a*s)}px`}const zo=new Map,Bs=new Map;function bh(i,e){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d",{willReadFrequently:!0});let r=null;if(n){n.font=`${e-1}px sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e/2,e/2+.5),r=n.getImageData(0,0,e,e);for(let s=3;s<r.data.length;s+=4)r.data[s]=r.data[s]<110?0:255;n.putImageData(r,0,0)}return Bs.set(`${i}:${e}`,r),t}function wh(i,e){const t=`${i}:${e}`;let n=zo.get(t);return n||(n=bh(i,e).toDataURL(),zo.set(t,n),n)}function Eh(i,e){return Bs.has(`${i}:${e}`)||bh(i,e),Bs.get(`${i}:${e}`)??null}const ou=new Set;function PS(i,e,t){const n=`${i}:${e}`;if(!ou.has(n)){const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d",{willReadFrequently:!0});let a=null;if(s){t(s,e),a=s.getImageData(0,0,e,e);for(let o=3;o<a.data.length;o+=4)a.data[o]=a.data[o]<110?0:255;s.putImageData(a,0,0)}Bs.set(n,a),zo.set(n,r.toDataURL()),ou.add(n)}return i}function Wx(i,e){const t=document.createElement("img");return t.src=wh(i,e),t.width=t.height=e,t.style.imageRendering="pixelated",t.style.display="block",t}function LS(i){const e=document.createElement("div"),t=document.createElement("img");return e.className="bubble",t.style.imageRendering="pixelated",t.style.display="block",e.append(t),i.append(e),{el:e,img:t}}function DS(i,e,t,n,r){i.dataset.e===t&&i.dataset.l===`${r}`||(i.dataset.e=t,i.dataset.l=`${r}`,e.src=wh(t,n.bubbles.emojiPixels),Vx(i,e,n,r))}function US(i,e){const t=document.createElement("div"),n=document.createElement("canvas");return t.className=`thought ${e}`,n.className="cloud",t.append(n),i.append(t),t}function IS(i,e,t,n,r=Rr){const s=`${e.w}x${e.h}:${t}:${n}:${r}`;if(i.dataset.c===s)return;i.dataset.c=s;const a=i.firstChild,o=a.getContext("2d");if(a.width=e.w,a.height=e.h,a.style.width=`${e.w*r}px`,a.style.height=`${e.h*r}px`,i.style.width=a.style.width,i.style.height=a.style.height,!o)return;const l=o.createImageData(e.w,e.h);Hx(e,t,n,l.data),o.putImageData(l,0,0)}function Xx(i,e,t,n,r,s,a,o=Rr){n=`${n}@${o}`;let l=i.querySelector(`.${t}`);if(!l||l.dataset.k!==n){const c=s();c.classList.add(t),c.dataset.k=n;const u=Math.floor((e.box.n-r)/2);Object.assign(c.style,{position:"absolute",width:`${r*o}px`,height:`${r*o}px`,left:`${(e.box.x+u)*o}px`,top:`${(e.box.y+u)*o}px`}),l?l.replaceWith(c):i.append(c),l=c}for(const c of i.querySelectorAll(":scope > :not(.cloud)"))c.style.display=c===l?"":"none";l.style.opacity=a.toFixed(2)}function NS(i,e,t,n,r,s=Rr){Xx(i,e,"emoji",`${t}:${n}`,n,()=>Wx(t,n),r,s)}function FS(i,e,t,n=Rr){return{left:au(e-(i.foot.x+.5)*n,n),top:au(t-(i.foot.y+.5)*n,n)}}const Ke=40,Th=4,An=13,pn=17;let Fa=null;function Ah(){if(Fa)return Fa;const i=[];for(let e=0;e<Ke;e++)for(let t=0;t<Ke;t++){const n=t+.5-Ke/2,r=e+.5-Ke/2,s=Math.hypot(n,r);Math.abs(s-An)>.7||i.push(t,e,(Math.atan2(n,-r)/(Math.PI*2)+1)%1)}return Fa=i}function Ho(i,e,t,n,r,s,a,o){const l=t/2,c=Math.cos(e),u=Math.sin(e),d=-u,h=c;for(let p=0;p<t;p++)for(let g=0;g<t;g++){const y=g+.5-l,m=p+.5-l,f=y*c+m*u,S=y*d+m*h;f<n||f>r||Math.abs(S)<=s*(r-f)/(r-n)+.25&&i.dot(g,p,a,o)}}function qx(i,e,t,n,r,s,a,o,l=1){const c=e.getWorldDirection(i),u=c.x,d=c.z,h=Math.hypot(u,d)||1,p=r-a,g=s-o,y=(p*u+g*d)/h,m=(p*-d+g*u)/h,f=In.uBend.value,S=-(s-f.z),R=wr(r,s),v=zx(i.set(r,l,s)).project(e),M=v.z<1&&Bx(S,R+l,f.x,e.position),w=Math.max(Math.abs(v.x),Math.abs(v.y)),A=M?Math.min(1,Math.max(0,(w-.9)/.25)):1,_=m,E=-y,L=1/Math.max(Math.abs(_)/(.84*t/2),Math.abs(E)/(.76*n/2),1e-9);return{show:A,ex:t/2+_*L,ey:n/2+E*L,angle:Math.atan2(E,_),sx:(v.x+1)/2*t,sy:(1-v.y)/2*n,seen:M}}function OS(i,e,t,n,r){const s=[],a=e/2,o=Math.cos(i),l=Math.sin(i),c=-l,u=o;for(let d=0;d<e;d++)for(let h=0;h<e;h++){const p=h+.5-a,g=d+.5-a,y=p*o+g*l,m=p*c+g*u;y<t||y>n||Math.abs(m)<=r*(n-y)/(n-t)+.25&&s.push([h,d])}return s}const Yx={spots:[],reset(){this.spots.length=0},claim(i,e,t,n,r=!0){const s=-Math.sin(t),a=Math.cos(t),o=(u,d)=>this.spots.every(h=>Math.hypot(h.x-u,h.y-d)>=h.r+n);let l=i,c=e;for(let u=0;r&&u<8&&!o(l,c);u++){const d=(u%2?-1:1)*Math.ceil((u+1)/2)*n*2;l=i+s*d,c=e+a*d}return this.spots.push({x:l,y:c,r:n}),{x:l,y:c}}};class Rh{constructor(e,t=Th,n=1){this.scale=t,this.canvas.width=this.canvas.height=Ke,Object.assign(this.canvas.style,{position:"fixed",width:`${Ke*t}px`,height:`${Ke*t}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none",opacity:`${n}`}),this.label.style.opacity=`${n}`,Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:'16px "Tiny5", ui-monospace, monospace',lineHeight:"16px",whiteSpace:"nowrap",color:"#e8e2f4",background:"rgba(14, 9, 22, 0.72)",padding:"2px 4px 0",transform:"translate(-50%, -50%)",webkitFontSmoothing:"none"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData(Ke,Ke)}scale;canvas=document.createElement("canvas");label=document.createElement("div");g;img;hide(){this.canvas.style.display="none",this.label.style.display="none"}dispose(){this.canvas.remove(),this.label.remove()}text="";textW=0;say(e,t,n,r,s,a,o){const l=this.label;l.style.display="block",e!==this.text&&(this.text=l.textContent=e,this.textW=l.offsetWidth||e.length*9),l.style.color=t;const c=o+Math.abs(s)*this.textW/2+Math.abs(a)*9;l.style.left=`${n+s*c}px`,l.style.top=`${r+a*c}px`}place(e,t,n=1){const r=Ke*this.scale*n;this.canvas.style.display="block",this.canvas.style.width=this.canvas.style.height=`${r}px`,this.canvas.style.left=`${e-r/2}px`,this.canvas.style.top=`${t-r/2}px`}clear(){this.img.data.fill(0)}dot(e,t,n,r){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=Ke||t>=Ke||r<=.02)return;const s=(t*Ke+e)*4;if(this.img.data[s+3]>=r*255)return;const a=this.img.data;a[s]=n[0],a[s+1]=n[1],a[s+2]=n[2],a[s+3]=Math.round(Math.min(1,r)*255)}flush(){this.g.putImageData(this.img,0,0)}}function $x(i,e,t,n=Math.PI/2,r){i.clear();const s=Ah();for(let o=0;o<s.length;o+=3)i.dot(s[o],s[o+1],e,1);const a=Eh(t,pn);if(a&&a.data.some((o,l)=>l%4===3&&o>0)){const o=Math.floor((Ke-pn)/2),l=a.data;for(let c=0;c<pn;c++)for(let u=0;u<pn;u++){const d=(c*pn+u)*4;l[d+3]&&i.dot(o+u,o+c,[l[d],l[d+1],l[d+2]],1)}}else if(r){const o=Math.floor((Ke-r[0].length)/2),l=Math.floor((Ke-r.length)/2);for(let c=0;c<r.length;c++)for(let u=0;u<r[c].length;u++)r[c][u]!=="."&&i.dot(o+u,l+c,e,1)}Ho(i,n,Ke,An+2,An+7,3.5,e,1),i.flush()}const Kx=An+7,Zx=i=>{const e=t=>{const n=((t+i*6)%6+6)%6;return 1-Math.max(0,Math.min(1,Math.min(n,4-n)))};return[e(5),e(3),e(1)]},ti={plate:0,vivid:0,track:.55},Oa=[10,8,20],Go=i=>{const e=(i[0]+i[1]+i[2])/3,t=i.map(r=>r*.55+e*.45),n=Math.max(...i)*.95/Math.max(1,...t);return t.map(r=>Math.min(255,r*n))},Jx=["....##########.","....##########.","....##......##.","....##########.","....##......##.","....##......##.","....##......##.","....##......##.","....##......##.",".####....#####.","#####...######.","#####...######.",".###.....####.."],Qx=["...............","####...####...#","#..####...####.","#.+..#..+.#..#.","#.++.#.+++#..#.","#..+.#..+.#.+#.","#....#....#.++.","#.+..#....#..#.","#.++.#..+.#..#.","####.####.####.","....####...####","..............."],kS=[".........###...","........####...",".......####....","......#####....","......#####....",".....######....",".....######....","....#######....","....+++++++....","..###########..","###############",".#############."],BS=[".....+++++.....",".....#####.....","......#.#......","......#.#......",".....##.##.....","...###...###...","..#.........#..",".#.+.........#.",".#+++++++++++#.","#++.++++++++++#","#++++++++.++++#","#+++++++++++++#",".#+++++++++++#.","..#+++++++++#..","...#########..."],zS=(()=>{const i=[];for(let e=0;e<15;e++){let t="";for(let n=0;n<15;n++){const r=Math.hypot(n-7,(e-8.5)*1.05);t+=e<2?n===7?"#":".":r>6.5?".":r>5.6||n%3===1||e%3===0?"#":"+"}i.push(t)}return i})(),jx=20,ey=3,ty=(i,e,t)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i))*t,ny=6;class HS{constructor(e,t=Th,n=1){this.opacity=n,this.cue=new Rh(e,t,n)}opacity;cue;v=new B;glyphs=new Map;lastFill=0;flashAt=-1/0;shown=-1;dispose(){this.cue.dispose()}pop(){const e=this.cue.label;e.style.animation="none",e.offsetWidth,e.style.animation="bpm-up 1.4s ease-out"}fade(e){if(Math.abs(e-this.shown)<.01)return;this.shown=e;const t=`${(e*this.opacity).toFixed(2)}`;this.cue.canvas.style.opacity=t,this.cue.label.style.opacity=t,this.cue.canvas.style.visibility=this.cue.label.style.visibility=t==="0.00"?"hidden":"visible"}update(e,t,n,r,s,a,o,l,c,u){const d=this.cue;if(c<this.lastFill-.5&&(this.flashAt=o),this.lastFill=c,!r){d.hide();return}const h=r.top??3.2,p=qx(this.v,e,t,n,r.x,r.z,s,a,h),g=Math.hypot(r.x-s,r.z-a),y=1-p.show,m=y*y*(3-2*y),f=(1-.3*m*(1-Math.min(1,Math.max(0,(g-12)/28))))*(r.scale??1),S=d.scale*f,R=Ke*S/2,v=m*ey*Math.sin(o*Math.PI),M=Math.min(p.sy-(r.gap??jx),(r.above??1/0)-ny),w=Math.max(R+4,M-(An+7)*S)+v;let A=p.ex+(p.sx-p.ex)*m,_=p.ey+(w-p.ey)*m;const E=ty(p.angle,Math.PI/2,m);({x:A,y:_}=Yx.claim(A,_,E,Ke*d.scale*f*.42)),d.place(A,_,f),d.clear();const L=o*l/60,I=Math.pow(.5+.5*Math.cos(L%1*Math.PI*2),2),C=Math.max(0,1-(o-this.flashAt)/.5),U=G=>{const K=Go(G),ae=ti.vivid;return ae>0?K.map((ge,ce)=>Math.min(255,ge+(G[ce]-ge)*ae)):K},D=G=>{const K=Zx(G);return U([K[0]*255,K[1]*255,K[2]*255])},N=r.rainbow?D(o*.25):U([r.colour.x*255,r.colour.y*255,r.colour.z*255]),J=G=>G.map(K=>Math.min(255,K*(.9+.15*I)+255*C*.4)),Z=J(N);if(ti.plate>0&&!r.bare){const G=An+2.2;for(let K=0;K<Ke;K++)for(let ae=0;ae<Ke;ae++)Math.hypot(ae+.5-Ke/2,K+.5-Ke/2)<=G&&d.dot(ae,K,Oa,ti.plate);Ho(d,E,Ke,An+1,An+8.5,5,Oa,ti.plate)}const ie=G=>{const K=(G[0]+G[1]+G[2])/3,ae=ti.track,ge=Math.min(1,ae*.8);return G.map(ce=>(K+(ce-K)*ge)*ae)},j=An,ee=Ah(),ne=ie(N);for(let G=0;G<(r.bare?0:ee.length);G+=3){const K=r.rainbow?D(ee[G+2]+o*.25):null;ee[G+2]<=c||C>0?d.dot(ee[G],ee[G+1],K?J(K):Z,1):d.dot(ee[G],ee[G+1],K?ie(K):ne,.9)}const Re=r.emoji?Eh(r.emoji,pn):null;if(Re&&Re.data.some((G,K)=>K%4===3&&G>0)){const G=Math.floor((Ke-pn)/2),K=Re.data;for(let ae=0;ae<pn;ae++)for(let ge=0;ge<pn;ge++){const ce=(ae*pn+ge)*4;K[ce+3]&&d.dot(G+ge,G+ae,[K[ce],K[ce+1],K[ce+2]],1)}}else if(r.notes||r.glyph){const G=r.glyphColour?Go([r.glyphColour.x*255,r.glyphColour.y*255,r.glyphColour.z*255]).map(ve=>Math.min(255,ve*(.9+.15*I)+255*C*.4)):Z,K=r.glyph??Jx,ae=Math.floor((Ke-K[0].length)/2),ge=Math.floor((Ke-K.length)/2),ce=G.map(ve=>Math.min(255,ve*.6+255*.4));for(let ve=0;ve<K.length;ve++){const tt=K[ve];for(let Ne=0;Ne<tt.length;Ne++){const Fe=tt[Ne];Fe==="#"?d.dot(ae+Ne,ge+ve,G,1):Fe==="+"&&d.dot(ae+Ne,ge+ve,ce,1)}}}else if(r.species){const G=Math.max(8,Math.min(Ke-6,Math.round(r.sigilSize??17))),K=`${r.species}:${G}${r.bold?":bold":""}`;let ae=this.glyphs.get(K);ae||(ae=r.bold&&td(r.species,G)||nd(r.species,G),this.glyphs.set(K,ae));const ge=ae.w,ce=ae.m,ve=r.crown?id(Math.round(ge*.7)):null,tt=Math.floor((Ke-ae.w)/2),Ne=ve?Math.floor((Ke-(ge+ve.h+1))/2)+ve.h+1:tt,Fe=ve?{ox:Math.floor((Ke-ve.w)/2),oy:Ne-ve.h-1}:null;if(r.bare&&ti.plate>0){const Le=(he,Ie)=>he>=tt&&Ie>=Ne&&he<tt+ge&&Ie<Ne+ge&&!!ce[(Ie-Ne)*ge+he-tt]||!!ve&&!!Fe&&he>=Fe.ox&&Ie>=Fe.oy&&he<Fe.ox+ve.w&&Ie<Fe.oy+ve.h&&!!ve.m[(Ie-Fe.oy)*ve.w+he-Fe.ox];for(let he=0;he<Ke;he++)for(let Ie=0;Ie<Ke;Ie++)!Le(Ie,he)&&(Le(Ie-1,he)||Le(Ie+1,he)||Le(Ie,he-1)||Le(Ie,he+1)||Le(Ie-1,he-1)||Le(Ie+1,he+1)||Le(Ie-1,he+1)||Le(Ie+1,he-1))&&d.dot(Ie,he,Oa,ti.plate)}if(r.shine){const Le=J([r.colour.x*255,r.colour.y*255,r.colour.z*255]),he=nt=>Le.map(Ve=>Ve+(255-Ve)*nt),Ie=o/2.6%1,dt=Ie<.4?Ie/.4*1.6-.3:-9;for(let nt=0;nt<ge;nt++)for(let Ve=0;Ve<ge;Ve++){if(!ce[nt*ge+Ve])continue;const mt=Math.abs(((Ve+.5)/ge+1-(nt+.5)/ge)/2-dt)<.13;d.dot(tt+Ve,Ne+nt,mt?he(.85):Le,1)}if(ve&&Fe)for(let nt=0;nt<ve.h;nt++)for(let Ve=0;Ve<ve.w;Ve++)ve.m[nt*ve.w+Ve]&&d.dot(Fe.ox+Ve,Fe.oy+nt,Le,1)}else{for(let Le=0;Le<ge;Le++)for(let he=0;he<ge;he++)ce[Le*ge+he]&&d.dot(tt+he,Ne+Le,Z,1);if(ve&&Fe)for(let Le=0;Le<ve.h;Le++)for(let he=0;he<ve.w;he++)ve.m[Le*ve.w+he]&&d.dot(Fe.ox+he,Fe.oy+Le,Z,1)}}if(Ho(d,E,Ke,j+2,j+7,3.5,Z,1),d.flush(),!(u!==""&&(!!u||g>20))){d.label.style.display="none";return}const $e=-Math.cos(E)*(1-m)+m,Be=-Math.sin(E)*(1-m),He=Math.hypot($e,Be)||1;d.say(u??`${Math.round(g)} m`,`rgb(${N.map(Math.round).join(",")})`,A,_,$e/He,Be/He,(j+1.5)*d.scale*f)}}const iy=Go([232,180,106]),Vo=3,ry=4,fs=Ke*Vo/2+6;class sy{cue;angle=NaN;shown=1;constructor(e=document.body){this.cue=new Rh(e,Vo),this.cue.canvas.style.zIndex="3"}update(e,t,n,r=1,s=0){if(this.shown=f_(this.shown,r,s),!e||this.shown<=0){this.cue.hide(),this.angle=NaN;return}this.cue.canvas.style.opacity=`${this.shown}`;const a=Kx*Vo+ry+Math.abs(Math.sin(n*Math.PI))*3,o=e.x,l=e.y-a,c=Math.max(fs,Math.min(t.width-fs,o)),u=Math.max(fs,Math.min(t.height-fs,l)),d=c!==o||u!==l,h=d?Math.atan2(e.y-u,e.x-c):Math.PI/2;Math.abs(h-this.angle)<=.02||($x(this.cue,iy,"🧭",h,Qx),this.angle=h),this.cue.place(t.left+c,t.top+u)}dispose(){this.cue.dispose()}}function Ch(i,e=0){if(i!=="home"&&!Es(i))return null;const t=rd(e).islands.get(i);return t?{x:t.x,y:t.y}:null}function ay(i,e,t,n){const r=i.find(u=>u.id===e),s=Math.hypot(t,n);if(!r||!s)return null;const a=t/s,o=n/s;let l=null,c=1/0;for(const u of i){if(u.id===e)continue;const d=u.x-r.x,h=u.y-r.y,p=Math.hypot(d,h);if(!p)continue;const g=(d*a+h*o)/p;if(g<.5)continue;const y=p*(2-g);y<c&&(c=y,l=u.id)}return l}const fl=()=>{const i=globalThis.__travelProbe;return i?.trace?.capabilities?.workerMessages?i:void 0},Vi=new WeakMap,lu=new WeakMap;let oy=0,ly=0;const pl=()=>performance.timeOrigin+performance.now();function cy(i,e,t,n){const r=fl();if(!r?.record)return;const s=i.seed,a={jobId:`job-${++oy}`,jobKind:e,id:t,enqueuedEpochMs:pl(),queueDepth:n,...typeof s=="number"?{seed:s}:{}};Vi.set(i,a),r.record({kind:"worker-job",phase:"enqueue",...a,at:performance.now()})}function GS(i,e){const t=Vi.get(i);t&&(fl()?.record?.({kind:"worker-job",phase:"cancel",...t,reason:e,endedEpochMs:pl(),at:performance.now()}),Vi.delete(i))}function mr(i,e,t,n,r=0){const s=fl();if(!s?.record){i.postMessage(e);return}Vi.has(e)||cy(e,t,n,r);let a=lu.get(i);a===void 0&&(a=i._travelWorkerIndex??++ly,lu.set(i,a));const o={...Vi.get(e),workerIndex:a};Vi.set(e,o),s.record({kind:"worker-job",phase:"dispatch",...o,at:performance.now(),dispatchEpochMs:pl()}),i.postMessage({...e,__witchJobTrace:o})}const Er="witch.arrive",uy=3e4,ml=()=>{try{return sessionStorage}catch{return null}};function hy(i,e,t,n=ml(),r=Date.now()){const s={v:1,island:i,world:e,at:r,...t};try{n?.setItem(Er,JSON.stringify(s))}catch{try{n?.setItem(Er,JSON.stringify({...s,still:""}))}catch{}}}function VS(i,e=ml(),t=Date.now()){let n=null;try{n=JSON.parse(e?.getItem(Er)??"null"),e?.removeItem(Er)}catch{return null}return!n||n.v!==1||n.island!==i||!(t-n.at>=0&&t-n.at<uy)||!n.cam?null:n}function WS(i=ml()){try{i?.removeItem(Er)}catch{}}const Wo=32,Ph=(i,e)=>i==="home"?0:Es(i,e)?.phase??1;function Lh(i,e){const t=n=>Math.hypot(n.x-e.x,n.y-e.y);return[...i].sort((n,r)=>n.phase-r.phase||t(n)-t(r)).map(n=>n.id)}function cu(i,e){const t=r=>Math.hypot(r.x-e.x,r.y-e.y),n=i.filter(r=>r.id==="home"||r.sail).sort((r,s)=>r.id==="home"?-1:s.id==="home"?1:t(r)-t(s));return[...n.map(r=>r.id),...Lh(i.filter(r=>!n.includes(r)),e)]}function dy(i){const e=["home",...Wa].map(t=>{const n=Ch(t,i);return{id:t,x:n?.x??9,y:n?.y??0,phase:Ph(t,i)}});return Lh(e,{x:0,y:0})}let Bi=null;function XS(i,e,t,n){if(Bi)return;let r;try{r=new Worker(new URL(""+new URL("chartOutlines.worker-D3LcSddb.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return}Bi=r,r.onmessage=a=>{if(!("warmDone"in a.data)){n?.(a.data.warmed,a.data.made);return}r.terminate(),Bi=null,t?.(a.data.made,a.data.kept)},r.onerror=()=>{r.terminate(),Bi=null};const s=dy(i);mr(r,{world:i,found:e,ids:s,step:Wo,warm:!0},"chart:request","warm",s.length)}function qS(){Bi?.terminate(),Bi=null}function fy(i,e=Math.random){const t=new URL(i);return t.searchParams.set("seed",String(Math.floor(e()*1e6))),t.toString()}function YS(i,e){const t=i.get("sail");return t==="inplace"||t==="reload"?t:e.sail?.inPlace?"inplace":"reload"}const py=["arrive","wave","cleared","at","mode","zoom","set","found","bot","quest","arena","fight","pack","partyover","shot"];function $S(i,e,t,n){const r=new URLSearchParams({island:e,seed:String(t)});n!=null&&r.set("world",String(n));const s=new Set([...py,"island","seed","world"]);for(const[a,o]of i)s.has(a)||r.append(a,o);return r}function KS(i,e,t,n){return new URL(`./?island=${i}&seed=${e}&arrive=1${t!=null?`&world=${t}`:""}`,n).href}function ZS(i,e){const t=new Set((i.get("set")??"").split(";").map(n=>n.split("=")[0]).filter(Boolean));for(const n of e)n.apply.knob&&i.has(`d_${n.id}`)&&t.add(n.apply.knob);return t}function JS(i,e,t=Math.random){if(i==="bot"){const n=new URL(e);return n.searchParams.delete("bot"),n.toString()}return fy(e,t)}function QS(i,e){const t=new URL(e).searchParams,n=sd(t.get("seed"));if(n===null)throw new Error(`a new night in place: no seed in ${e}`);return{how:i,island:t.get("island")??"",seed:n,world:t.has("world")?Number(t.get("world")):void 0,params:t}}class jS{constructor(e,t){this.h=e,this.onBack=t}h;onBack;armed=!1;url="";sailed(e){this.url=e,this.h.pushState({witch:"night"},"",e),this.h.pushState({witch:"guard"},"",e),this.armed=!0}popped(){return this.armed?(this.h.pushState({witch:"guard"},"",this.url),this.onBack(),!0):!1}}async function eM(i,e,t,n=()=>{}){try{return await i(),!0}catch(r){try{n(r)}catch{}return t(e),!1}}function tM(i){return i&&Xo(i)?i:null}function nM(i){return i==="over"?"Back to the afterparty":"Back to the party"}function my(i,e,t){return i&&i.island===e&&i.world===t?"stay":"sail"}function gy(i,e,t,n){return i??(e&&e.world===t?e.island:void 0)??n??"home"}const vy={"game.moveUp":{context:"game",name:"Move up",about:"Fly or walk up the screen.",keys:["KeyW","ArrowUp"],mouse:[],pad:["lsUp"]},"game.moveDown":{context:"game",name:"Move down",about:"Fly or walk down the screen.",keys:["KeyS","ArrowDown"],mouse:[],pad:["lsDown"]},"game.moveLeft":{context:"game",name:"Move left",about:"Fly or walk left.",keys:["KeyA","ArrowLeft"],mouse:[],pad:["lsLeft"]},"game.moveRight":{context:"game",name:"Move right",about:"Fly or walk right.",keys:["KeyD","ArrowRight"],mouse:[],pad:["lsRight"]},"game.aimUp":{context:"game",name:"Aim up",about:"Aim the 💌 up the screen (with the mouse: the cursor aims).",keys:[],mouse:[],pad:["rsUp"]},"game.aimDown":{context:"game",name:"Aim down",about:"Aim the 💌 down the screen.",keys:[],mouse:[],pad:["rsDown"]},"game.aimLeft":{context:"game",name:"Aim left",about:"Aim the 💌 left.",keys:[],mouse:[],pad:["rsLeft"]},"game.aimRight":{context:"game",name:"Aim right",about:"Aim the 💌 right.",keys:[],mouse:[],pad:["rsRight"]},"game.rise":{context:"game",name:"Rise / land",about:'Rise to the treetops, or land. Nothing else (Ed: "rising is not quite a free action").',keys:["Space"],mouse:[],pad:["cross"]},"game.use":{context:"game",name:"Use",about:"Use what's here: open a station, take a rune, put down or pick up a sigil. Held: a run, picking up or putting down as she goes.",keys:["KeyE"],mouse:[],pad:["square"]},"game.invite":{context:"game",name:"Invite 💌",about:"Throw 💌 invites where she aims (held: keep throwing).",keys:["Digit1"],mouse:["left"],pad:["R2"]},"game.dodge":{context:"game",name:"Dodge",about:"Blink the way she's going.",keys:[],mouse:["right"],pad:["L2","circle"]},"game.cycleNext":{context:"game",name:"Next sigil",about:"Cycle the stack: the bottom sigil (the next put down) to the top.",keys:["KeyQ"],mouse:[],pad:["R1"]},"game.cyclePrev":{context:"game",name:"Previous sigil",about:"Cycle the stack back: the top sigil to the bottom.",keys:[],mouse:[],pad:["L1"]},"game.hat":{context:"game",name:"Hat",about:"Put her hat down, or pick one up (on the keyboard: hold Use with nothing to do).",keys:[],mouse:[],pad:["triangle"]},"game.boost":{context:"game",name:"Broom spell",about:"Her broom's spell, if it has one (the boost, the ley jump, the ground pound).",keys:["KeyR"],mouse:[],pad:["L3"]},"game.zoomIn":{context:"game",name:"Zoom in",about:"Bring the camera in.",keys:["KeyZ","Equal","NumpadAdd"],mouse:["wheelUp"],pad:["down"]},"game.zoomOut":{context:"game",name:"Zoom out",about:"Take the camera out.",keys:["KeyX","Minus","NumpadSubtract"],mouse:["wheelDown"],pad:["up"]},"game.autoTalk":{context:"game",name:"Auto-talk",about:"Turn auto-talk on or off (off, she talks while Talk is held).",keys:["KeyT"],mouse:[],pad:[]},"game.talk":{context:"game",name:"Talk",about:"With auto-talk off, she talks while this is held.",keys:["ShiftLeft","ShiftRight"],mouse:[],pad:[]},"game.debug":{context:"game",name:"Debug",about:"The debug overlay.",keys:["Backquote"],mouse:[],pad:["share"]},"game.nextWave":{context:"game",name:"Next wave",about:"Playtest: bring the next wave now.",keys:["KeyN"],mouse:[],pad:[],dev:!0},"game.pauseWaves":{context:"game",name:"Pause waves",about:"Playtest: pause or resume the waves' timer.",keys:["KeyP"],mouse:[],pad:[],dev:!0},"game.cycleSpeakers":{context:"game",name:"Cycle speakers",about:"Debug: every speaker on to its next state.",keys:["KeyK"],mouse:[],pad:[],dev:!0},"game.inviteNearest":{context:"game",name:"Invite nearest",about:"Debug: invite the nearest creature.",keys:["KeyI"],mouse:[],pad:[],dev:!0},"game.feedNearest":{context:"game",name:"Feed nearest",about:"Debug: the nearest party animal eats a berry.",keys:["KeyB"],mouse:[],pad:[],dev:!0},"game.happyNearest":{context:"game",name:"Cheer nearest",about:"Debug: the nearest creature happy at once.",keys:["KeyO"],mouse:[],pad:[],dev:!0},"global.pause":{context:"global",name:"Pause",about:"Pause everything (a still for screenshots, with a stamp of where you are).",keys:["Escape"],mouse:[],pad:["options"]},"menu.up":{context:"menu",name:"Menu up",about:"Move the highlight up.",keys:["KeyW","ArrowUp"],mouse:[],pad:["up","lsUp"]},"menu.down":{context:"menu",name:"Menu down",about:"Move the highlight down.",keys:["KeyS","ArrowDown"],mouse:[],pad:["down","lsDown"]},"menu.left":{context:"menu",name:"Menu left",about:"Move the highlight left (on a slider: less).",keys:["KeyA","ArrowLeft"],mouse:[],pad:["left","lsLeft"]},"menu.right":{context:"menu",name:"Menu right",about:"Move the highlight right (on a slider: more).",keys:["KeyD","ArrowRight"],mouse:[],pad:["right","lsRight"]},"menu.choose":{context:"menu",name:"Choose",about:"Choose what's highlighted (at the sea chart: sail).",keys:["Space","Enter","NumpadEnter"],mouse:[],pad:["cross"]},"menu.back":{context:"menu",name:"Back",about:"Go back, or close the menu.",keys:["KeyE"],mouse:[],pad:["circle"]},"menu.tabPrev":{context:"menu",name:"Previous tab",about:"The tab to the left.",keys:[],mouse:[],pad:["L1"]},"menu.tabNext":{context:"menu",name:"Next tab",about:"The tab to the right.",keys:[],mouse:[],pad:["R1"]},"menu.zoomIn":{context:"menu",name:"Menu zoom in",about:"Zoom the sea chart or the telescope in.",keys:[],mouse:[],pad:["R2"]},"menu.zoomOut":{context:"menu",name:"Menu zoom out",about:"Zoom the sea chart or the telescope out.",keys:[],mouse:[],pad:["L2"]}},_y={actions:vy},Wi={cross:0,circle:1,square:2,triangle:3,L1:4,R1:5,L2:6,R2:7,share:8,options:9,L3:10,R3:11,up:12,down:13,left:14,right:15,home:16},gl={lsUp:[1,-1],lsDown:[1,1],lsLeft:[0,-1],lsRight:[0,1],rsUp:[3,-1],rsDown:[3,1],rsLeft:[2,-1],rsRight:[2,1]},Dh=["left","right","middle","wheelUp","wheelDown"],ka=.18,Ba=.5,bs=Object.entries(_y.actions).map(([i,e])=>({...e,id:i,context:e.context})),uu=new Map(bs.map(i=>[i.id,i])),za="witch.bindings",hu=i=>{const e={};return Array.isArray(i.keys)&&(e.keys=i.keys.filter(t=>typeof t=="string"&&t.length>0)),Array.isArray(i.mouse)&&(e.mouse=i.mouse.filter(t=>Dh.includes(t))),Array.isArray(i.pad)&&(e.pad=i.pad.filter(t=>t in Wi||t in gl)),e};class xy{constructor(e=null){this.storage=e;try{const t=JSON.parse(e?.getItem(za)??"{}");for(const[n,r]of Object.entries(t??{}))uu.has(n)&&r&&typeof r=="object"&&(this.own[n]=hu(r))}catch{}this.build()}storage;own={};live=new Map;listeners=new Set;version=0;list(){return bs.map(e=>({...e,...this.get(e.id),isDefault:!this.own[e.id]}))}get(e){const t=this.live.get(e);if(!t)throw new Error(`no action ${e}`);return t}set(e,t){const n=uu.get(e);if(!n)throw new Error(`no action ${e}`);const r=[...(t.mouse??[]).filter(l=>!Dh.includes(l)),...(t.pad??[]).filter(l=>!(l in Wi)&&!(l in gl))];if(r.length)throw new Error(`not a mouse or pad input: ${r.join(", ")}`);const s={...this.get(e),...hu(t)},a=l=>JSON.stringify(s[l])===JSON.stringify(n[l]),o={};for(const l of["keys","mouse","pad"])a(l)||(o[l]=s[l]);return Object.keys(o).length?this.own[e]=o:delete this.own[e],this.changed(),this.conflicts()}reset(e){delete this.own[e],this.changed()}resetAll(){this.own={},this.changed()}conflicts(){const e=new Map;for(const n of bs){const r=this.get(n.id),s=[...r.keys.map(a=>`key:${a}`),...r.mouse.map(a=>`mouse:${a}`),...r.pad.map(a=>`pad:${a}`)];for(const a of n.context==="global"?["game","menu"]:[n.context])for(const o of new Set(s)){const l=`${a}|${o}`;e.set(l,[...e.get(l)??[],n.id])}}const t=[];for(const[n,r]of e)if(r.length>1){const[s,a]=[n.slice(0,n.indexOf("|")),n.slice(n.indexOf("|")+1)];t.push({context:s,input:a,actions:r})}return t}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}keys(e){return this.get(e).keys}mouse(e){return this.get(e).mouse}pad(e){return this.get(e).pad}padValue(e,t,n){let r=0;for(const s of this.get(e).pad)r=Math.max(r,Ha(s,t,n));return r}padPressed(e,t,n,r,s=[]){return this.get(e).pad.some(a=>Ha(a,t,n)>=Ba&&Ha(a,r,s)<Ba)}padHeld(e,t,n){return this.padValue(e,t,n)>=Ba}padButtons(e){return this.get(e).pad.filter(t=>t in Wi).map(t=>Wi[t])}build(){this.live.clear();for(const e of bs){const t=this.own[e.id]??{};this.live.set(e.id,{keys:[...t.keys??e.keys],mouse:[...t.mouse??e.mouse],pad:[...t.pad??e.pad]})}}changed(){this.build(),this.version++;try{Object.keys(this.own).length?this.storage?.setItem(za,JSON.stringify(this.own)):this.storage?.removeItem(za)}catch{}for(const e of this.listeners)e()}}function Ha(i,e,t){if(i in Wi)return e[Wi[i]]?1:0;const n=gl[i];if(!n)return 0;const[r,s]=n,a=r<2?0:2,o=t[a]??0,l=t[a+1]??0,c=Math.hypot(o,l);if(c<ka)return 0;const u=(Math.min(1,c)-ka)/(1-ka)/c;return Math.max(0,s*(t[r]??0)*u)}const Uh={cross:"✕",circle:"○",square:"□",triangle:"△",up:"d-pad up",down:"d-pad down",left:"d-pad left",right:"d-pad right",lsUp:"left stick",lsDown:"left stick",lsLeft:"left stick",lsRight:"left stick",rsUp:"right stick",rsDown:"right stick",rsLeft:"right stick",rsRight:"right stick",options:"Options",share:"Share",home:"PS"};function qn(i,e=Cr){const t=[...new Set(e.pad(i).map(n=>Uh[n]??n))];return t.length?t.join(" or "):"none"}function Ih(i){const e=/^(?:Key([A-Z])|Digit(\d))$/.exec(i);return e?e[1]??e[2]:{Space:"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Escape:"Esc",Backquote:"~",Equal:"+",Minus:"−",NumpadAdd:"+",NumpadSubtract:"−",Enter:"Enter",NumpadEnter:"Enter"}[i]??i}function ws(i,e=Cr){const t={left:"left click",right:"right click",middle:"middle click",wheelUp:"wheel up",wheelDown:"wheel down"},n=[...new Set([...e.mouse(i).map(r=>t[r]??r),...e.keys(i).map(Ih)])];return n.length?n.join(" or "):"none"}const yy=Gs,Cr=new xy(yy);function zs(i){const e=i==="menu"?["menu.up","menu.down","menu.left","menu.right"]:["Up","Down","Left","Right"].map(n=>`${i}${n}`),t=[...new Set(e.flatMap(n=>Cr.pad(n).map(r=>(Uh[r]??r).replace(/^d-pad .*/,"d-pad"))))];return t.length?t.join(" or "):"none"}function iM(i){for(const e of i.querySelectorAll("[data-key]")){const t=Cr.keys(e.dataset.key)[0];e.textContent=t?Ih(t):"(none)"}for(const e of i.querySelectorAll("[data-pad]"))e.textContent=qn(e.dataset.pad);for(const e of i.querySelectorAll("[data-pad-move]"))e.textContent=zs(e.dataset.padMove)}function rM(i){return i==="pad"?`${zs("menu")} or ${zs("game.aim")} look round   ${qn("menu.zoomIn")} / ${qn("menu.zoomOut")} zoom   ${qn("menu.back")} ⏏`:i==="touch"?"movement control looks round   + / − zoom   sigil to leave":`mouse or arrow keys look round   wheel / ${ws("menu.zoomIn")} / ${ws("menu.zoomOut")} zoom   ${ws("menu.back")} ⏏`}function Sy(i,e,t){const n="sigils: islands you can sail to · gold rings: won";return i==="pad"?`${zs("menu")} to choose${t?` · ${e?"hold ":""}${qn("menu.choose")} to sail`:""} · ${qn("menu.zoomIn")} / ${qn("menu.zoomOut")} zoom${e?` · ${qn("menu.back")} to put it down`:""} · ${n}`:i==="touch"?`Tap an island to look at it${t?e?" · hold it to sail":", again to sail":""} · pinch to zoom · ${n}`:`point or arrows to choose${t?` · ${e?"hold the mouse or ":""}Space / Enter to sail`:""} · wheel to zoom${e?` · ${ws("menu.back")} to put it down`:""} · ${n}`}const My={near:{sea:-40,dist:600,pitchDeg:50},far:{sea:420,dist:520,pitchDeg:38},skim:{sea:520,dist:360,pitchDeg:24}},by=()=>{const i=typeof location>"u"?null:new URLSearchParams(location.search).get("dive");return i&&My[i]||ni.arrive?.handoff||{}},du="witch.chart.sailAnywhere",wy=`
.chart-view { position: absolute; inset: 0; overflow: hidden; background: #05060e; color: #e8e2f4; font: 14px/1.4 ui-monospace, "SF Mono", Menlo, Consolas, monospace; touch-action: none; --dim: #9a93b4; --panel: rgba(10, 9, 22, .78); --accent: #e8b46a; }
.chart-view canvas { position: absolute; left: 0; top: 0; display: block; image-rendering: pixelated; image-rendering: crisp-edges; cursor: pointer; }
.chart-view .top { position: absolute; left: 0; right: 0; top: 0; padding: max(10px, env(safe-area-inset-top)) 16px 8px; text-align: center; pointer-events: none; background: linear-gradient(#05060ecc, #05060e00); }
.chart-view h1 { margin: 0; font-size: 16px; letter-spacing: .14em; }
.chart-view .status { color: var(--dim); font-size: 12px; min-height: 1.4em; }
.chart-view .bottom { position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 16px max(12px, env(safe-area-inset-bottom)); display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; }
.chart-view .bottom > * { pointer-events: auto; }
.chart-view.flying .top, .chart-view.flying .bottom { visibility: hidden; }
.chart-view .card { background: var(--panel); border: 1px solid #3a2f5c; border-radius: 8px; padding: 8px 14px; min-width: min(320px, 100%); max-width: 100%; box-sizing: border-box; text-align: center; }
.chart-view .name { font-size: 16px; font-weight: bold; }
.chart-view .phase, .chart-view .state { color: var(--dim); font-size: 12px; }
.chart-view .bar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.chart-view button, .chart-view a.btn { font: inherit; font-size: 13px; color: #e8e2f4; background: var(--panel); border: 1px solid #3a2f5c; border-radius: 6px; padding: 8px 14px; min-height: 36px; box-sizing: border-box; cursor: pointer; text-decoration: none; }
.chart-view .sail-any { border-style: dashed; color: var(--dim); }
.chart-view .sail-any[aria-pressed="true"] { color: #e8e2f4; border-color: var(--accent); background: #3a2a14; }
.chart-view button:hover, .chart-view a.btn:hover, .chart-view button:focus-visible, .chart-view a.btn:focus-visible { border-color: var(--accent); outline: none; }
.chart-view a.btn.sail { border-color: var(--accent); color: var(--accent); margin-top: 6px; display: inline-block; }
.chart-view [hidden] { display: none !important; }
.chart-view .hint, .chart-view .world { color: var(--dim); font-size: 11px; text-align: center; }
.chart-view .hold-ring { position: absolute; width: 58px; height: 58px; margin: -29px 0 0 -29px; border-radius: 50%; pointer-events: none; z-index: 3; box-shadow: 0 0 0 3px rgba(20,14,32,.7) inset; -webkit-mask: radial-gradient(circle, transparent 21px, #000 22px); mask: radial-gradient(circle, transparent 21px, #000 22px); }
.chart-view .corner { position: absolute; right: 12px; top: max(10px, env(safe-area-inset-top)); display: flex; gap: 8px; z-index: 2; }
`,Ey=`
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="corner"></div>
<div class="hold-ring" hidden></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;function Ty(i,e){const t=i.find(n=>n.id===e)??{x:0,y:0};return i.filter(n=>n.fresh).sort((n,r)=>Math.hypot(n.x-t.x,n.y-t.y)-Math.hypot(r.x-t.x,r.y-t.y)).map(n=>n.id)}function sM(i,e){const t=e.mode,n=t==="miniature",r=t==="sail";if(!document.getElementById("chart-view-style")){const T=document.createElement("style");T.id="chart-view-style",T.textContent=wy,document.head.append(T)}const s=document.createElement("div");s.className="chart-view",s.innerHTML=Ey,i.append(s);const a=T=>s.querySelector(`.${T}`),o=n?new Fo(s.querySelector("canvas"),ni):ph(ni),l=o.canvas;n||(l.setAttribute("aria-label","The sea chart"),s.querySelector("canvas").replaceWith(l));const c=new AbortController,u={signal:c.signal};n&&(a("top").hidden=!0,a("bottom").hidden=!0);for(const T of e.corner??[]){const V=document.createElement("button");V.textContent=T.label,T.title&&(V.title=T.title),V.addEventListener("click",()=>T.onClick(),u),a("corner").append(V)}a("sail").hidden=!0;const d=r?e.table:void 0;let h=!1;const p=()=>{h||(h=!0,S(),d.onLeave())},g=ni.chart?.sailHold??1.2;let y=null;const m=T=>!!T&&!U(T)&&!!E.find(V=>V.id===T)?.sail,f=(T,V,X=null)=>{!d||h||y||!m(T)||o.flying||(y={id:T,from:performance.now(),at:X,by:V})};function S(T){y&&(!T||y.by===T)&&(y=null,a("hold-ring").hidden=!0)}function R(){if(!y)return;if(y.id!==o.selected){S();return}const T=Math.min(1,(performance.now()-y.from)/1e3/Math.max(.05,g)),V=a("hold-ring"),X=s.getBoundingClientRect(),z=y.at??o.screenOf(y.id)??{x:X.left+X.width/2,y:X.top+X.height/2};if(V.hidden=!1,V.style.left=`${z.x-X.left}px`,V.style.top=`${z.y-X.top}px`,V.style.background=`conic-gradient(rgba(255,214,140,.95) ${T*360}deg, rgba(20,14,32,.6) 0deg)`,T>=1){const W=y.id;S(),$e(W)}}a("home").hidden=!r||!!d,a("sail-any").hidden=!r,a("close").hidden=!e.onClose||!!d,d&&(s.classList.add("table"),a("top").hidden=!0,a("world").hidden=!0,a("zoom-in").hidden=!0,a("zoom-out").hidden=!0,a("corner").append(a("sail-any")));let v="keys";const M=a("hint"),w=()=>{const T=Sy(v,!!d,r);M.textContent!==T&&(M.textContent=T)},A=T=>{v=T,w()};w(),s.addEventListener("pointerdown",T=>A(T.pointerType==="touch"?"touch":"keys"),u),s.addEventListener("pointermove",T=>{T.pointerType==="mouse"&&A("keys")},u),n&&(o.orbit=.12);let _=e.save??_u(),E=[];const L=new Map;let I=(()=>{try{return localStorage.getItem(du)==="1"}catch{return!1}})();const C=()=>e.world??_.world,U=T=>!!T&&my(e.here,T,C())==="stay",D=T=>`./?island=${T}${e.world!=null?`&world=${C()}`:""}`;let N=null;const J=new Map,Z=by(),ie=T=>{let V=J.get(T);return V===void 0&&(V=Math.floor(Math.random()*1e6),J.set(T,V)),V},j=T=>{if(!r||n||N?.island===T)return;if(N?.job.then(X=>X?.stop()),N?.map.then(X=>X?.stop()),!T||!E.find(X=>X.id===T)?.sail||e.noBake?.(T)||U(T)){N=null;return}const V=Dl(()=>import("./landingBake-DuZduamm.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url).then(X=>X.bakeLanding(T,e.world,ie(T))).catch(()=>null);N={island:T,job:V,map:V.then(X=>X?Dl(()=>import("./mapPrep-BmY2AUNZ.js").then(z=>z.ax),__vite__mapDeps([9,2,1,3,4,5,6,10]),import.meta.url).then(z=>z.startMapPrep(T,e.world,X.seed)):null).catch(()=>null)}},ee=()=>{const T=_.voyages.at(-1)?.to;if((W=>!!W&&!!E.find(re=>re.id===W)?.sail)(T))return T;const X=E.find(W=>W.id==="home"),z=E.filter(W=>W.id!=="home"&&_.found.includes(W.id)&&W.sail);return z.sort((W,re)=>Math.hypot(W.x-(X?.x??0),W.y-(X?.y??0))-Math.hypot(re.x-(X?.x??0),re.y-(X?.y??0))),z[0]?.id??"home"};let ne=null;const Re=async T=>{const V=N?.island===T?await N.job:null,X=V?.seed??ie(T);await V?.settle();const z=N?.island===T?await N.map:null;z&&await Promise.race([z.done,new Promise(re=>setTimeout(re,8e3))]);const W=ne={island:T,seed:X,ready:!1};performance.mark("chart:depart");try{await e.onDepart(T,X,o.flightEnd(T,Z))}finally{W.ready=!0,performance.mark("chart:ready")}},Te=async(T,V)=>{if(performance.mark("chart:flown"),ne?.island===T){performance.mark("chart:go"),e.onSail?.(T,ne.seed,V);return}const X=N?.island===T?await N.job:null,z=X?.seed??ie(T);await X?.settle();const W=N?.island===T?await N.map:null;W&&await Promise.race([W.done,new Promise(re=>setTimeout(re,8e3))]),performance.mark("chart:go"),e.onSail?e.onSail(T,z,V):location.href=`${D(T)}&seed=${z}&arrive=1`},$e=T=>{const V=E.find(re=>re.id===T);if(!r||o.flying)return;if(U(T)){d||(e.onStay??e.onClose)?.();return}if(!V?.sail)return;const X=C();performance.mark("chart:sail"),j(T);const z=!!e.onDepart&&!!e.onSail&&o.flightEnd(T,Z)!==null,W=z?{hold:()=>ne?.island!==T||!ne.ready,slow:ni.arrive?.hold,landingDue:e.onLandingDue}:{};if(!o.fly(T,re=>{hy(T,X,re),Te(T,re)},{...Z,...W})){Te(T);return}z&&Re(T),s.classList.add("flying"),e.onFly?.(),requestAnimationFrame(()=>H())};let Be=null,He=null;const G=new Map;let K=new Map;const ae=()=>{const T=E.find(V=>V.id===(o.selected??"home"))??E[0];K=new Map(cu(E,T??{x:0,y:0}).map((V,X)=>[V,X]))},ge=T=>{const V=E.find(X=>X.id===T.id);!V||T.world!==C()||(G.get(T.id)??V.outline)?.detail&&!T.detail||G.set(T.id,T)};function ce(){if(!G.size)return;let T=null,V=1/0;for(const z of G.values()){const W=z.id===o.selected&&z.detail?-1:K.get(z.id)??1e9;W<V&&(V=W,T=z)}G.delete(T.id);const X=E.find(z=>z.id===T.id);if(!(!X||T.world!==C())){X.outline=T,o.reshape(T.id,T);{const z=E.filter(W=>W.outline).length;z===1&&performance.mark("chart:island1"),z===E.length&&performance.mark("chart:islands")}}}const ve=()=>{if(!Be){try{Be=new Worker(new URL(""+new URL("chartOutlines.worker-D3LcSddb.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}Be.onmessage=T=>ge(T.data)}return Be};function tt(T){const V=!Be,X=ve();V&&X&&mr(X,{world:C(),found:[..._.found],ids:[],step:Wo},"chart:request","initialize"),X&&mr(X,{detail:T},"chart:request",T)}function Ne(){const T=C(),V=[..._.found],X=E.find(re=>re.id===(o.selected??_.voyages.at(-1)?.to??"home"))??E[0],z=cu(E.filter(re=>!re.outline&&!G.has(re.id)),X);if(!z.length){He&&(clearInterval(He),He=null);return}const W=ve();W&&mr(W,{world:T,found:V,ids:z,step:Wo,cacheOnly:n},"chart:request","outlines",z.length),n&&!He&&(He=setInterval(Ne,4e3))}function Fe(){const T=new Set(I||dl()?["home",...ps]:fd(_)),V=new Set(_.won),X=C(),z=new Set(dd(_,e.here?.island)),W=(ue,le,oe)=>{const be=Ch(ue,X),Ue=xr(ue);return{id:ue,x:be.x,y:be.y,phase:Ph(ue,X),radii:le,sail:T.has(ue)&&!Ue,unknown:Ue,won:V.has(ue),fresh:T.has(ue)&&!Ue&&z.has(ue),sigil:oe}};E=[W("home",Rl(Cl(ad(X,od(_.found))),ni.map?.coast).radii,pu("home"))];for(const ue of Wa)E.push(W(ue,Rl(Cl(Es(ue,X)),ni.islands?.coast).radii,ue));o.set(E,_.voyages);for(const ue of L.values())ue.dispose();if(L.clear(),!n)for(const ue of Ty(E,e.here?.island??_.voyages.at(-1)?.to??"home"))L.set(ue,new sy(s));G.clear(),ae(),Ne();const re=_.found.filter(ue=>!xr(ue)).length;a("status").textContent=`${re?`${re} of ${ps.length} islands found${e.countUncharted?` (and ${Wa.length-ps.length} not yet charted)`:""}`:"do a legend's quest and win the night to find its island"}${_.won.length?` · ${_.won.length} won`:""}${e.note?` · ${e.note}`:""}`,a("world").textContent=`World seed: ${X}${e.world!=null&&e.world!==_.world?" (from the link)":""}`,a("home").href=D("home"),a("home").textContent=U("home")?e.here.label:"Sail home"}function Le(T,V=!1,X=!0){o.select(T,V),ae(),X&&j(T),T&&Be&&!E.find(le=>le.id===T)?.outline&&!G.has(T)&&mr(Be,{first:T},"chart:request",T),T&&!n&&!(G.get(T)??E.find(le=>le.id===T)?.outline)?.detail&&tt(T);const z=E.find(le=>le.id===T),W=a("card"),re=a("sail");if(!z||n){W.hidden=!0;return}W.hidden=!1;const ue=T==="home"?0:Es(T,C())?.phase??0;a("name").textContent=T==="home"?"Home":z.unknown?"Uncharted waters":z.sail?`The ${T}'s island`:"An island not yet found",a("phase").textContent=T==="home"?"the Ent's island, the middle of the world":`phase ${ue}`,a("state").textContent=(U(T)?"you're here · ":"")+(z.unknown?"not yet charted":z.won?"won":z.sail?T!=="home"&&!_.found.includes(T)?"not found yet: 🧪 testing, you can sail there":_.played.includes(T)?"played, not yet won":"found: you can sail there":"do its legend's quest in a night you win to find it"),re.hidden=!r||!(z.sail||U(T))||!!d&&U(T),re.href=D(T),re.textContent=U(T)?e.here.label:d?"Hold to sail":"Sail there"}if(a("sail").addEventListener("click",T=>{T.preventDefault(),d||$e(o.selected)}),d){const T=a("sail");T.addEventListener("pointerdown",V=>{V.preventDefault();const X=T.getBoundingClientRect();f(o.selected,"pointer",{x:X.left+X.width/2,y:X.top+X.height/2})},u);for(const V of["pointerup","pointerleave","pointercancel"])T.addEventListener(V,()=>S("pointer"),u)}a("home").addEventListener("click",T=>{T.preventDefault(),Le("home",!0),$e("home")}),a("close").addEventListener("click",()=>e.onClose?.());const he=new Map;let Ie=0,dt=null;n||(l.addEventListener("pointerdown",T=>{if(d&&!h&&!o.flying&&T.isPrimary){const V=o.pick(T.clientX,T.clientY);V&&(V!==o.selected&&Le(V),f(V,"pointer",{x:T.clientX,y:T.clientY}))}if(he.set(T.pointerId,{x:T.clientX,y:T.clientY}),dt={x:T.clientX,y:T.clientY},he.size===2){const[V,X]=[...he.values()];Ie=Math.hypot(V.x-X.x,V.y-X.y)}},u),l.addEventListener("pointermove",T=>{if(y?.by==="pointer"&&y.at&&Math.hypot(T.clientX-y.at.x,T.clientY-y.at.y)>12&&S("pointer"),!!he.has(T.pointerId)&&(he.set(T.pointerId,{x:T.clientX,y:T.clientY}),he.size===2)){const[V,X]=[...he.values()],z=Math.hypot(V.x-X.x,V.y-X.y);Ie>0&&z>0&&o.zoom(Ie/z),Ie=z,dt=null}},u),l.addEventListener("pointerup",T=>{if(S("pointer"),h)return;if(o.flying){he.delete(T.pointerId),o.skipFlight();return}const V=he.size===1&&dt&&Math.hypot(T.clientX-dt.x,T.clientY-dt.y)<8;if(he.delete(T.pointerId),he.size<2&&(Ie=0),!V)return;const X=o.pick(T.clientX,T.clientY);d||(X&&X===o.selected?$e(X):X&&Le(X))},u),l.addEventListener("pointercancel",T=>{he.delete(T.pointerId),Ie=0,S("pointer")},u),l.addEventListener("wheel",T=>{T.preventDefault(),o.zoom(Math.exp(T.deltaY*.0015))},{passive:!1,...u}),a("zoom-in").addEventListener("click",()=>o.zoom(.75)),a("zoom-out").addEventListener("click",()=>o.zoom(1.33)));const nt=(T,V)=>{const X=ay(E,o.selected??"home",T,V);X&&Le(X)},Ve=T=>{if(A("keys"),o.flying){T.preventDefault(),o.skipFlight();return}if(T.target?.closest?.("input")||T.target?.closest?.("button, a")&&(T.key==="Enter"||T.key===" "))return;const V={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};if(!h){if(d&&(T.code==="KeyE"||T.key==="Escape")){T.preventDefault(),T.repeat||p();return}V[T.key]?(T.preventDefault(),nt(...V[T.key])):d&&(T.key==="Enter"||T.key===" ")?(T.preventDefault(),T.repeat||f(o.selected,"key")):T.key==="Enter"||T.key===" "?(T.preventDefault(),$e(o.selected)):T.key==="+"||T.key==="="?o.zoom(.8):T.key==="-"||T.key==="_"?o.zoom(1.25):T.key==="Escape"&&e.onClose&&(T.preventDefault(),e.onClose())}};n||addEventListener("keydown",Ve);const mt=T=>{d&&(T.key==="Enter"||T.key===" ")&&S("key")};d&&addEventListener("keyup",mt);let F=0,Mt=!0,et=[];function P(T){const V=[...navigator.getGamepads?.()??[]].find(oe=>oe?.connected);if(!V)return;const X=V.buttons.map(oe=>oe.pressed);if((X.some((oe,be)=>oe&&!et[be])||V.axes.some(oe=>Math.abs(oe)>.5))&&A("pad"),et=X,F-=T,o.flying){V.buttons.some(oe=>oe.pressed)&&o.skipFlight();return}if(h)return;const z=V.buttons.map(oe=>oe.pressed),W=oe=>Cr.padHeld(oe,z,V.axes),re=W("menu.right")?1:W("menu.left")?-1:0,ue=W("menu.down")?1:W("menu.up")?-1:0;(re||ue)&&F<=0?(nt(re,ue),F=.28):!re&&!ue&&(F=0);const le=W("menu.choose")&&!Mt;W("menu.choose")||(Mt=!1),d?W("menu.choose")&&!Mt?f(o.selected,"pad"):S("pad"):le&&F<=0&&($e(o.selected),F=.5),W("menu.back")&&F<=0&&(d?p():e.onClose&&e.onClose(),F=.5),W("menu.zoomOut")&&o.zoom(1+T),W("menu.zoomIn")&&o.zoom(1-T*.8)}const x=()=>{const T=a("sail-any");T.setAttribute("aria-pressed",String(I)),T.textContent=I?"🧪 Test: sailing anywhere (on)":"🧪 Test: sail anywhere"};x(),a("sail-any").addEventListener("click",()=>{I=!I;try{localStorage.setItem(du,I?"1":"0")}catch{}x();const T=o.selected;Fe(),Le(T)});const H=(T,V)=>{if(n&&e.size){const X=dh;o.resize(e.size.w*X,e.size.h*X);return}o.resize(T??(s.clientWidth||i.clientWidth||innerWidth),V??(s.clientHeight||i.clientHeight||innerHeight))};H(),a("status").textContent="charting the sea…";let $=!1;return setTimeout(()=>{$||(Fe(),Le(gy(e.start,e.here,C(),_.voyages.at(-1)?.to),!0,!1),j(ee()))},50),{canvas:l,chart:o,islands:()=>E,update(T,V){n||(P(T),w()),R(),ce(),o.frame(T,V);const X=l.getBoundingClientRect();for(const[z,W]of L)W.update(!o.flying&&!h?o.screenTopOf(z):null,X,V,z===o.selected?0:1,T)},resize:H,choose:Le,dispose(){$=!0,G.clear(),removeEventListener("keydown",Ve),removeEventListener("keyup",mt),He&&(clearInterval(He),He=null),Be?.terminate(),Be=null,c.abort();for(const T of L.values())T.dispose();n?o.dispose():mh(o),s.remove()}}}export{Oi as $,on as A,St as B,Rn as C,fi as D,$y as E,vt as F,Vy as G,In as H,xt as I,Hy as J,bS as K,st as L,ut as M,_t as N,Su as O,Cn as P,A_ as Q,Tr as R,Et as S,ni as T,zt as U,je as V,al as W,ic as X,By as Y,Zt as Z,rn as _,Dy as a,Wc as a$,at as a0,Oy as a1,Wy as a2,zx as a3,Cd as a4,Pd as a5,Rd as a6,MS as a7,yS as a8,di as a9,PS as aA,Eh as aB,US as aC,RS as aD,Gx as aE,IS as aF,CS as aG,NS as aH,Xx as aI,FS as aJ,au as aK,Rr as aL,Wx as aM,Xy as aN,sl as aO,hi as aP,AS as aQ,Fy as aR,w_ as aS,eS as aT,wn as aU,sS as aV,aS as aW,oS as aX,tS as aY,rS as aZ,_d as a_,Bx as aa,wr as ab,zy as ac,$f as ad,Bo as ae,Jx as af,Zx as ag,Ed as ah,Fi as ai,ke as aj,Po as ak,$u as al,ky as am,Wf as an,Gy as ao,na as ap,Ny as aq,Za as ar,LS as as,DS as at,TS as au,wh as av,iS as aw,Ot as ax,Mh as ay,Vx as az,Cr as b,$S as b$,Pn as b0,jy as b1,I_ as b2,N_ as b3,Ke as b4,Rh as b5,qx as b6,Yx as b7,OS as b8,HS as b9,Y_ as bA,ui as bB,hp as bC,Dl as bD,cl as bE,uS as bF,rM as bG,Qx as bH,pn as bI,lh as bJ,ZS as bK,VS as bL,dl as bM,dS as bN,cS as bO,mS as bP,gS as bQ,xS as bR,_S as bS,Uy as bT,_u as bU,YS as bV,eM as bW,hd as bX,Ly as bY,JS as bZ,WS as b_,kS as ba,BS as bb,zS as bc,ti as bd,Xt as be,Xs as bf,Sh as bg,Yc as bh,Ky as bi,qc as bj,Fs as bk,$t as bl,ES as bm,wS as bn,Xi as bo,Ox as bp,Iy as bq,qd as br,qa as bs,qy as bt,nS as bu,En as bv,c_ as bw,SS as bx,Sr as by,Kt as bz,KS as c,tM as c0,nM as c1,QS as c2,dd as c3,vS as c4,XS as c5,iM as c6,jS as c7,Ad as c8,an as c9,$i as ca,_n as cb,Cx as cc,hS as cd,pS as ce,fS as cf,Px as cg,Wi as ch,gl as ci,bs as cj,Ih as ck,Uh as cl,ws as cm,D_ as cn,ol as co,Jy as cp,Zy as cq,Qy as cr,Ua as d,GS as e,cy as f,mr as g,kx as h,fn as i,oi as j,Nx as k,As as l,sM as m,Me as n,Yy as o,lS as p,B as q,Fx as r,qS as s,R_ as t,bd as u,zi as v,Py as w,yu as x,Ff as y,Qt as z};
