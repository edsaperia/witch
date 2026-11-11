const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mapPrep-a2PZH5fK.js","./mushrooms-C24qQbp6.js","./linkParams-CZYos6XN.js","./saveSlots-adtOazhL.js","./game-CyZrjdrn.js","./finds-D0XrOOcw.js","./decisions-DHUAtR8i.js","./housePieces-73CIiFGk.js","./landingBake-CQLJwy21.js","./viewParams-BMOaEWUp.js","./style-CHcrV8Vu.js"])))=>i.map(i=>d[i]);
import{dj as mn,dk as gs,dl as Qo,dm as Yi,dn as Mu,dp as bu,bd as wu,dq as $a,dr as jo,ds as Vs,h as ed,dt as td,Q as nd,R as id,bq as Ka,U as rd,dh as sd,da as ad,cV as Ir,a0 as od,du as Nl,a5 as ld,Z as cd,bk as ud,dv as vs,dw as hd,dx as dd,dy as ea,bf as fd,ck as pd,cP as md,cm as gd,cf as As,dz as vd,dA as Za,dg as xd,bu as Wn,cg as Fl,ch as kl,dB as _d}from"./mushrooms-C24qQbp6.js";import{a as Ws,l as yd,s as Sd,c as Eu,b as Ol,f as Md}from"./saveSlots-adtOazhL.js";import{at as Rs,I as bd}from"./finds-D0XrOOcw.js";const Tu="witch.chart",Ja=(i=0)=>({world:i,found:[],won:[],played:[],voyages:[]});function jy(i){const e=(i??"").trim();if(!e)return 1+Math.floor(Math.random()*2147483646);if(/^\d+$/.test(e))return Number(e)%2147483647;let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%2147483647||1}const Au=i=>{try{return i??Ws??null}catch{return null}},ta=i=>Array.isArray(i)?i.filter(e=>typeof e=="string"):[];function Ru(i){try{const e=Au(i)?.getItem(Tu);if(!e)return Ja();const t=JSON.parse(e),n=Qo,r=a=>!!mn[a]&&!Yi(a),s=Number(t.world);return{world:Number.isInteger(s)&&s>=0&&s<2147483647?s:0,found:ta(t.found).filter(r),won:ta(t.won).filter(n),played:ta(t.played).filter(n),voyages:(Array.isArray(t.voyages)?t.voyages:[]).filter(a=>a&&typeof a.from=="string"&&typeof a.to=="string"&&n(a.from)&&r(a.to)).map(a=>({from:a.from,to:a.to}))}}catch{return Ja()}}function wd(i,e){try{Au(e)?.setItem(Tu,JSON.stringify(i))}catch{}}function eS(i,e,t){return t?Cu(i,e,{won:!1}):i}function Cu(i,e,t){if(!Qo(e))return i;const n={world:i.world,found:[...i.found],won:[...i.won],played:[...i.played],voyages:[...i.voyages]};if(n.played.includes(e)||n.played.push(e),!t.won)return n;n.won.includes(e)||n.won.push(e);for(const r of t.found??[])!mn[r]||Yi(r)||r===e||n.found.includes(r)||(n.found.push(r),n.voyages.push({from:e,to:r}));return n}const Ed=(i,e)=>i.found.filter(t=>!Yi(t)&&!i.played.includes(t)&&t!==e),Pu=i=>["home",...i.found];function tS(){const i=Object.keys(mn),e=[...i],t=e.map(n=>({from:mn[n].phase===0?"home":Td(n,i.filter(r=>mn[r].phase===mn[n].phase-1)),to:n}));return{world:0,found:e,won:["home"],played:["home",...gs],voyages:t}}function Td(i,e){const t=(n,r)=>{const s=Math.abs(((n-r)%360+360)%360);return s>180?360-s:s};return e.reduce((n,r)=>t(mn[r].bearing,mn[i].bearing)<t(mn[n].bearing,mn[i].bearing)?r:n,e[0]??"home")}function nS(i,e,t,n){const r=Ru(t);if(n!==void 0&&n!==r.world)return r;const s=Cu(r,i,e);return wd(s,t),s}const Ad="modulepreload",Rd=function(i,e){return new URL(i,e).href},Bl={},zl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(t.map(u=>{if(u=Rd(u,n),u in Bl)return;Bl[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const y=a[g];if(y.href===u&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Ad,d||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((g,y)=>{p.addEventListener("load",g),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Cd={rise:6,turn:240,height:22,from:-45,shadow:.6,disc:!0},Pd=i=>({...Cd,...i.chart?.moon??{}}),Hl=i=>Math.max(0,Math.min(.6,i.chart?.edgeBand??.18));function Ld(i,e){const t=Math.min(1,Math.max(0,i/Math.max(.01,e.rise))),n=t*t*(3-2*t);return{bearing:e.from+Math.max(0,i-e.rise)*360/Math.max(1,e.turn),height:-4+(e.height+4)*n,risen:n}}const el="186",Dd=0,Gl=1,Id=2,xs=1,Ud=2,gr=3,oi=0,Ht=1,Kt=2,Ln=0,Gi=1,nn=2,Vl=3,Wl=4,Nd=5,Bi=100,Fd=101,kd=102,Od=103,Bd=104,zd=200,Hd=201,Gd=202,Vd=203,Lu=204,Du=205,Wd=206,Xd=207,qd=208,Yd=209,$d=210,Kd=211,Zd=212,Jd=213,Qd=214,Qa=0,ja=1,eo=2,$i=3,to=4,no=5,io=6,ro=7,Iu=0,jd=1,ef=2,vn=0,Uu=1,Nu=2,Fu=3,ku=4,Ou=5,Bu=6,zu=7,Hu=300,li=301,Ki=302,na=303,ia=304,Xs=306,Cs=1e3,Cn=1001,so=1002,xt=1003,tf=1004,Ur=1005,at=1006,ra=1007,si=1008,zt=1009,Gu=1010,Vu=1011,Mr=1012,tl=1013,_n=1014,an=1015,on=1016,nl=1017,il=1018,Zi=1020,Wu=35902,Xu=35899,qu=1021,Yu=1022,Jt=1023,Un=1026,qn=1027,Rr=1028,rl=1029,ci=1030,sl=1031,al=1033,_s=33776,ys=33777,Ss=33778,Ms=33779,ao=35840,oo=35841,lo=35842,co=35843,uo=36196,ho=37492,fo=37496,po=37488,mo=37489,Ps=37490,go=37491,vo=37808,xo=37809,_o=37810,yo=37811,So=37812,Mo=37813,bo=37814,wo=37815,Eo=37816,To=37817,Ao=37818,Ro=37819,Co=37820,Po=37821,Lo=36492,Do=36494,Io=36495,Uo=36283,No=36284,Ls=36285,Fo=36286,nf=3200,Xl=0,rf=1,fn="",Yt="srgb",br="srgb-linear",Ds="linear",lt="srgb",sa=7680,iS=7681,rS=514,sS=517,sf=519,af=512,of=513,lf=514,ol=515,cf=516,uf=517,ll=518,hf=519,$u=35044,aS=35048,ql="300 es",gn=2e3,wr=2001;function df(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Is(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ff(){const i=Is("canvas");return i.style.display="block",i}const Yl={};function Us(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ku(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=Ku(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function je(...i){i=Ku(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vi(...i){const e=i.join(" ");e in Yl||(Yl[e]=!0,Oe(...i))}function pf(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const mf={[Qa]:ja,[eo]:io,[to]:ro,[$i]:no,[ja]:Qa,[io]:eo,[ro]:to,[no]:$i};class hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $l=1234567;const _r=Math.PI/180,Er=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function cl(i,e){return(i%e+e)%e}function gf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function vf(i,e,t){return i!==e?(t-i)/(e-i):0}function yr(i,e,t){return(1-t)*i+t*e}function xf(i,e,t,n){return yr(i,e,1-Math.exp(-t*n))}function _f(i,e=1){return e-Math.abs(cl(i,e*2)-e)}function yf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Sf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Mf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bf(i,e){return i+Math.random()*(e-i)}function wf(i){return i*(.5-Math.random())}function Ef(i){i!==void 0&&($l=i);let e=$l+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tf(i){return i*_r}function Af(i){return i*Er}function Rf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Cf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Lf(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const xi={DEG2RAD:_r,RAD2DEG:Er,generateUUID:Dn,clamp:Ke,euclideanModulo:cl,mapLinear:gf,inverseLerp:vf,lerp:yr,damp:xf,pingpong:_f,smoothstep:yf,smootherstep:Sf,randInt:Mf,randFloat:bf,randFloatSpread:wf,seededRandom:Ef,degToRad:Tf,radToDeg:Af,isPowerOfTwo:Rf,ceilPowerOfTwo:Cf,floorPowerOfTwo:Pf,setQuaternionFromProperEuler:Lf,normalize:ct,denormalize:sn};class Ee{static{Ee.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class er{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],p=s[a+1],g=s[a+2],y=s[a+3];if(d!==y||l!==h||c!==p||u!==g){let m=l*h+c*p+u*g+d*y;m<0&&(h=-h,p=-p,g=-g,y=-y,m=-m);let f=1-o;if(m<.9995){const S=Math.acos(m),R=Math.sin(S);f=Math.sin(f*S)/R,o=Math.sin(o*S)/R,l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+y*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+y*o;const S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-o*p,e[t+2]=c*g+u*p+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),h=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{static{B.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return aa.copy(this).projectOnVector(e),this.sub(aa)}reflect(e){return this.sub(aa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const aa=new B,Kl=new er;class ze{static{ze.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],y=r[0],m=r[3],f=r[6],S=r[1],R=r[4],v=r[7],M=r[2],E=r[5],A=r[8];return s[0]=a*y+o*S+l*M,s[3]=a*m+o*R+l*E,s[6]=a*f+o*v+l*A,s[1]=c*y+u*S+d*M,s[4]=c*m+u*R+d*E,s[7]=c*f+u*v+d*A,s[2]=h*y+p*S+g*M,s[5]=h*m+p*R+g*E,s[8]=h*f+p*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*s,p=c*s-a*l,g=t*d+n*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(r*c-u*n)*y,e[2]=(o*n-r*a)*y,e[3]=h*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=p*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(oa.makeScale(e,t)),this}rotate(e){return Vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(oa.makeRotation(-e)),this}translate(e,t){return Vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(oa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const oa=new ze,Zl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Df(){const i={enabled:!0,workingColorSpace:br,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===lt&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(r.r=Wi(r.r),r.g=Wi(r.g),r.b=Wi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===fn?Ds:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[br]:{primaries:e,whitePoint:n,transfer:Ds,toXYZ:Zl,fromXYZ:Jl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Zl,fromXYZ:Jl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}const Je=Df();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class If{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_i===void 0&&(_i=Is("canvas")),_i.width=e.width,_i.height=e.height;const r=_i.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=_i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Is("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uf=0;class ul{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(la(r[a].image)):s.push(la(r[a]))}else s=la(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function la(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?If.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let Nf=0;const ca=new B;class Lt extends hi{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=Cn,r=Cn,s=at,a=si,o=Jt,l=zt,c=Lt.DEFAULT_ANISOTROPY,u=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Dn(),this.name="",this.source=new ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ca).x}get height(){return this.source.getSize(ca).y}get depth(){return this.source.getSize(ca).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cs:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case so:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cs:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case so:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Hu;Lt.DEFAULT_ANISOTROPY=1;class Ye{static{Ye.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,v=(p+1)/2,M=(f+1)/2,E=(u+h)/4,A=(d+y)/4,x=(g+m)/4;return R>v&&R>M?R<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(R),r=E/n,s=A/n):v>M?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=E/r,s=x/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=A/s,r=x/s),this.set(n,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-y)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ff extends hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:at,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Lt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:at,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ul(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wt extends Ff{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Zu extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kf extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class ot{static{ot.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m)}set(e,t,n,r,s,a,o,l,c,u,d,h,p,g,y,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/yi.setFromMatrixColumn(e,0).length(),s=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,g=o*u,y=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-y*c,t[9]=-o*l,t[2]=y-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,y=c*d;t[0]=h+y*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=y+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,y=c*d;t[0]=h-y*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=y-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*d,g=o*u,y=o*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+y,t[1]=l*d,t[5]=y*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=y-h*d,t[8]=g*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-y*d}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+y,t[5]=a*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Of,e,Bf)}lookAt(e,t,n){const r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),On.crossVectors(n,Gt),On.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),On.crossVectors(n,Gt)),On.normalize(),Nr.crossVectors(Gt,On),r[0]=On.x,r[4]=Nr.x,r[8]=Gt.x,r[1]=On.y,r[5]=Nr.y,r[9]=Gt.y,r[2]=On.z,r[6]=Nr.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],S=n[3],R=n[7],v=n[11],M=n[15],E=r[0],A=r[4],x=r[8],w=r[12],L=r[1],U=r[5],C=r[9],I=r[13],D=r[2],N=r[6],$=r[10],Y=r[14],se=r[3],Z=r[7],ne=r[11],re=r[15];return s[0]=a*E+o*L+l*D+c*se,s[4]=a*A+o*U+l*N+c*Z,s[8]=a*x+o*C+l*$+c*ne,s[12]=a*w+o*I+l*Y+c*re,s[1]=u*E+d*L+h*D+p*se,s[5]=u*A+d*U+h*N+p*Z,s[9]=u*x+d*C+h*$+p*ne,s[13]=u*w+d*I+h*Y+p*re,s[2]=g*E+y*L+m*D+f*se,s[6]=g*A+y*U+m*N+f*Z,s[10]=g*x+y*C+m*$+f*ne,s[14]=g*w+y*I+m*Y+f*re,s[3]=S*E+R*L+v*D+M*se,s[7]=S*A+R*U+v*N+M*Z,s[11]=S*x+R*C+v*$+M*ne,s[15]=S*w+R*I+v*Y+M*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],y=e[7],m=e[11],f=e[15],S=l*p-c*h,R=o*p-c*d,v=o*h-l*d,M=a*p-c*u,E=a*h-l*u,A=a*d-o*u;return t*(y*S-m*R+f*v)-n*(g*S-m*M+f*E)+r*(g*R-y*M+f*A)-s*(g*v-y*E+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],y=e[13],m=e[14],f=e[15],S=t*o-n*a,R=t*l-r*a,v=t*c-s*a,M=n*l-r*o,E=n*c-s*o,A=r*c-s*l,x=u*y-d*g,w=u*m-h*g,L=u*f-p*g,U=d*m-h*y,C=d*f-p*y,I=h*f-p*m,D=S*I-R*C+v*U+M*L-E*w+A*x;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/D;return e[0]=(o*I-l*C+c*U)*N,e[1]=(r*C-n*I-s*U)*N,e[2]=(y*A-m*E+f*M)*N,e[3]=(h*E-d*A-p*M)*N,e[4]=(l*L-a*I-c*w)*N,e[5]=(t*I-r*L+s*w)*N,e[6]=(m*v-g*A-f*R)*N,e[7]=(u*A-h*v+p*R)*N,e[8]=(a*C-o*L+c*x)*N,e[9]=(n*L-t*C-s*x)*N,e[10]=(g*E-y*v+f*S)*N,e[11]=(d*v-u*E-p*S)*N,e[12]=(o*w-a*U-l*x)*N,e[13]=(t*U-n*w+r*x)*N,e[14]=(y*R-g*M-m*S)*N,e[15]=(u*M-d*R+h*S)*N,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,h=s*c,p=s*u,g=s*d,y=a*u,m=a*d,f=o*d,S=l*c,R=l*u,v=l*d,M=n.x,E=n.y,A=n.z;return r[0]=(1-(y+f))*M,r[1]=(p+v)*M,r[2]=(g-R)*M,r[3]=0,r[4]=(p-v)*E,r[5]=(1-(h+f))*E,r[6]=(m+S)*E,r[7]=0,r[8]=(g+R)*A,r[9]=(m-S)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=yi.set(r[0],r[1],r[2]).length();const o=yi.set(r[4],r[5],r[6]).length(),l=yi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),jt.copy(this);const c=1/a,u=1/o,d=1/l;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=u,jt.elements[5]*=u,jt.elements[6]*=u,jt.elements[8]*=d,jt.elements[9]*=d,jt.elements[10]*=d,t.setFromRotationMatrix(jt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=gn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===gn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===wr)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=gn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===gn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===wr)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const yi=new B,jt=new ot,Of=new B(0,0,0),Bf=new B(1,1,1),On=new B,Nr=new B,Gt=new B,Ql=new ot,jl=new er;class ui{constructor(e=0,t=0,n=0,r=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ql.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ql,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jl.setFromEuler(this),this.setFromQuaternion(jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class hl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zf=0;const ec=new B,Si=new er,yn=new ot,Fr=new B,nr=new B,Hf=new B,Gf=new er,tc=new B(1,0,0),nc=new B(0,1,0),ic=new B(0,0,1),rc={type:"added"},Vf={type:"removed"},Mi={type:"childadded",child:null},ua={type:"childremoved",child:null};class Et extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new B,t=new ui,n=new er,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new ze}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(tc,e)}rotateY(e){return this.rotateOnAxis(nc,e)}rotateZ(e){return this.rotateOnAxis(ic,e)}translateOnAxis(e,t){return ec.copy(e).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tc,e)}translateY(e){return this.translateOnAxis(nc,e)}translateZ(e){return this.translateOnAxis(ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fr.copy(e):Fr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(nr,Fr,this.up):yn.lookAt(Fr,nr,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(yn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rc),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vf),ua.child=e,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rc),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,Gf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Et.DEFAULT_UP=new B(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zi extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wf={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},kr={h:0,s:0,l:0};function da(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=cl(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=da(a,s,e+1/3),this.g=da(a,s,e),this.b=da(a,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=Yt){function n(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const n=Ju[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Je.workingToColorSpace(Ut.copy(this),e),Math.round(Ke(Ut.r*255,0,255))*65536+Math.round(Ke(Ut.g*255,0,255))*256+Math.round(Ke(Ut.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,r=Ut.g,s=Ut.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=Yt){Je.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,r=Ut.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(kr);const n=yr(Bn.h,kr.h,t),r=yr(Bn.s,kr.s,t),s=yr(Bn.l,kr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Be;Be.NAMES=Ju;class ko extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const en=new B,Sn=new B,fa=new B,Mn=new B,bi=new B,wi=new B,sc=new B,pa=new B,ma=new B,ga=new B,va=new Ye,xa=new Ye,_a=new Ye;class Zt{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),en.subVectors(e,t),r.cross(en);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){en.subVectors(r,t),Sn.subVectors(n,t),fa.subVectors(e,t);const a=en.dot(en),o=en.dot(Sn),l=en.dot(fa),c=Sn.dot(Sn),u=Sn.dot(fa),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return va.setScalar(0),xa.setScalar(0),_a.setScalar(0),va.fromBufferAttribute(e,t),xa.fromBufferAttribute(e,n),_a.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(va,s.x),a.addScaledVector(xa,s.y),a.addScaledVector(_a,s.z),a}static isFrontFacing(e,t,n,r){return en.subVectors(n,t),Sn.subVectors(e,t),en.cross(Sn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),en.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Zt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;bi.subVectors(r,n),wi.subVectors(s,n),pa.subVectors(e,n);const l=bi.dot(pa),c=wi.dot(pa);if(l<=0&&c<=0)return t.copy(n);ma.subVectors(e,r);const u=bi.dot(ma),d=wi.dot(ma);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(bi,a);ga.subVectors(e,s);const p=bi.dot(ga),g=wi.dot(ga);if(g>=0&&p<=g)return t.copy(s);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(wi,o);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return sc.subVectors(s,r),o=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(sc,o);const f=1/(m+y+h);return a=y*f,o=h*f,t.copy(n).addScaledVector(bi,a).addScaledVector(wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class di{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,tn):tn.fromBufferAttribute(s,a),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Br.subVectors(this.max,ir),Ei.subVectors(e.a,ir),Ti.subVectors(e.b,ir),Ai.subVectors(e.c,ir),zn.subVectors(Ti,Ei),Hn.subVectors(Ai,Ti),Zn.subVectors(Ei,Ai);let t=[0,-zn.z,zn.y,0,-Hn.z,Hn.y,0,-Zn.z,Zn.y,zn.z,0,-zn.x,Hn.z,0,-Hn.x,Zn.z,0,-Zn.x,-zn.y,zn.x,0,-Hn.y,Hn.x,0,-Zn.y,Zn.x,0];return!ya(t,Ei,Ti,Ai,Br)||(t=[1,0,0,0,1,0,0,0,1],!ya(t,Ei,Ti,Ai,Br))?!1:(zr.crossVectors(zn,Hn),t=[zr.x,zr.y,zr.z],ya(t,Ei,Ti,Ai,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bn=[new B,new B,new B,new B,new B,new B,new B,new B],tn=new B,Or=new di,Ei=new B,Ti=new B,Ai=new B,zn=new B,Hn=new B,Zn=new B,ir=new B,Br=new B,zr=new B,Jn=new B;function ya(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Jn.fromArray(i,s);const o=r.x*Math.abs(Jn.x)+r.y*Math.abs(Jn.y)+r.z*Math.abs(Jn.z),l=e.dot(Jn),c=t.dot(Jn),u=n.dot(Jn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const An=Xf();function Xf(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function qf(i){Math.abs(i)>65504&&Oe("DataUtils.toHalfFloat(): Value out of range."),i=Ke(i,-65504,65504),An.floatView[0]=i;const e=An.uint32View[0],t=e>>23&511;return An.baseTable[t]+((e&8388607)>>An.shiftTable[t])}function Yf(i){const e=i>>10;return An.uint32View[0]=An.mantissaTable[An.offsetTable[e]+(i&1023)]+An.exponentTable[e],An.floatView[0]}class $f{static toHalfFloat(e){return qf(e)}static fromHalfFloat(e){return Yf(e)}}const bt=new B,Hr=new Ee;let Kf=0;class _t extends hi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$u,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hr.fromBufferAttribute(this,t),Hr.applyMatrix3(e),this.setXY(t,Hr.x,Hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Qu extends _t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ju extends _t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends _t{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Zf=new di,rr=new B,Sa=new B;class fi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Zf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(Sa)),this.expandByPoint(rr.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Jf=0;const qt=new ot,Ma=new Et,Ri=new B,Vt=new di,sr=new di,Pt=new B;class St extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(df(e)?ju:Qu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return Ma.lookAt(e),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Vt.setFromBufferAttribute(s),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];sr.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(Vt.min,sr.min),Vt.expandByPoint(Pt),Pt.addVectors(Vt.max,sr.max),Vt.expandByPoint(Pt)):(Vt.expandByPoint(sr.min),Vt.expandByPoint(sr.max))}Vt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Pt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pt.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),Pt.add(Ri)),r=Math.max(r,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new _t(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new B,l[x]=new B;const c=new B,u=new B,d=new B,h=new Ee,p=new Ee,g=new Ee,y=new B,m=new B;function f(x,w,L){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,L),h.fromBufferAttribute(s,x),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,L),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(U),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(U),o[x].add(y),o[w].add(y),o[L].add(y),l[x].add(m),l[w].add(m),l[L].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let x=0,w=S.length;x<w;++x){const L=S[x],U=L.start,C=L.count;for(let I=U,D=U+C;I<D;I+=3)f(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const R=new B,v=new B,M=new B,E=new B;function A(x){M.fromBufferAttribute(r,x),E.copy(M);const w=o[x];R.copy(w),R.sub(M.multiplyScalar(M.dot(w))).normalize(),v.crossVectors(E,w);const U=v.dot(l[x])<0?-1:1;a.setXYZW(x,R.x,R.y,R.z,U)}for(let x=0,w=S.length;x<w;++x){const L=S[x],U=L.start,C=L.count;for(let I=U,D=U+C;I<D;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new _t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new _t(h,u,d)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$u,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Ft=new B;class Ns{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Us("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new _t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ns(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Us("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ba=new B,jf=new B,ep=new ze;class Tn{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ba.subVectors(n,t).cross(jf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(ba),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ep.getNormalMatrix(e),r=this.coplanarPoint(ba).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let tp=0;class pi extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Gi,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lu,this.blendDst=Du,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sa,this.stencilZFail=sa,this.stencilZPass=sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Tn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ee().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class np extends pi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ci;const ar=new B,Pi=new B,Li=new B,Di=new Ee,or=new Ee,eh=new ot,Gr=new B,lr=new B,Vr=new B,ac=new Ee,wa=new Ee,oc=new Ee;class oS extends Et{constructor(e=new np){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qf(t,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new Ns(n,3,0,!1)),Ci.setAttribute("uv",new Ns(n,2,3,!1))}this.geometry=Ci,this.material=e,this.center=new Ee(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),eh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Li.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Li.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;Wr(Gr.set(-.5,-.5,0),Li,a,Pi,r,s),Wr(lr.set(.5,-.5,0),Li,a,Pi,r,s),Wr(Vr.set(.5,.5,0),Li,a,Pi,r,s),ac.set(0,0),wa.set(1,0),oc.set(1,1);let o=e.ray.intersectTriangle(Gr,lr,Vr,!1,ar);if(o===null&&(Wr(lr.set(-.5,.5,0),Li,a,Pi,r,s),wa.set(0,1),o=e.ray.intersectTriangle(Gr,Vr,lr,!1,ar),o===null))return;const l=e.ray.origin.distanceTo(ar);l<e.near||l>e.far||t.push({distance:l,point:ar.clone(),uv:Zt.getInterpolation(ar,Gr,lr,Vr,ac,wa,oc,new Ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Wr(i,e,t,n,r,s){Di.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(or.x=s*Di.x-r*Di.y,or.y=r*Di.x+s*Di.y):or.copy(Di),i.copy(e),i.x+=or.x,i.y+=or.y,i.applyMatrix4(eh)}const wn=new B,Ea=new B,Xr=new B,qr=new B;class qs{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wn.copy(this.origin).addScaledVector(this.direction,t),wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ea.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),qr.copy(this.origin).sub(Ea);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=qr.dot(this.direction),l=-qr.dot(Xr),c=qr.lengthSq(),u=Math.abs(1-a*a);let d,h,p,g;if(u>0)if(d=a*l-o,h=a*o-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const y=1/u;d*=y,h*=y,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ea).addScaledVector(Xr,h),p}intersectSphere(e,t){if(e.radius<0)return null;wn.subVectors(e.center,this.origin);const n=wn.dot(this.direction),r=wn.dot(wn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,wn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,g=t.x-a.x,y=t.y-a.y,m=t.z-a.z,f=n.x-a.x,S=n.y-a.y,R=n.z-a.z,v=Math.abs(l),M=Math.abs(c),E=Math.abs(u);let A,x,w,L,U,C,I,D,N,$,Y,se;if(v>=M&&v>=E?(w=l,C=d,N=g,se=f,l>=0?(A=c,x=u,L=h,U=p,I=y,D=m,$=S,Y=R):(A=u,x=c,L=p,U=h,I=m,D=y,$=R,Y=S)):M>=E?(w=c,C=h,N=y,se=S,c>=0?(A=u,x=l,L=p,U=d,I=m,D=g,$=R,Y=f):(A=l,x=u,L=d,U=p,I=g,D=m,$=f,Y=R)):(w=u,C=p,N=m,se=R,u>=0?(A=l,x=c,L=d,U=h,I=g,D=y,$=f,Y=S):(A=c,x=l,L=h,U=d,I=y,D=g,$=S,Y=f)),w===0)return null;const Z=A/w,ne=x/w,re=1/w,Pe=L-Z*C,Re=U-ne*C,qe=I-Z*N,Xe=D-ne*N,Ge=$-Z*se,H=Y-ne*se,X=Ge*Xe-H*qe,le=Pe*H-Re*Ge,ve=qe*Re-Xe*Pe;if(r){if(X<0||le<0||ve<0)return null}else if((X<0||le<0||ve<0)&&(X>0||le>0||ve>0))return null;const he=X+le+ve;if(he===0)return null;const ye=re*(X*C+le*N+ve*se);return(he>0?ye<0:ye>0)?null:this.at(ye/he,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class En extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Iu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lc=new ot,Qn=new qs,Yr=new fi,cc=new B,$r=new B,Kr=new B,Zr=new B,Ta=new B,Jr=new B,uc=new B,Qr=new B;class ht extends Et{constructor(e=new St,t=new En){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Jr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Ta.fromBufferAttribute(d,e),a?Jr.addScaledVector(Ta,u):Jr.addScaledVector(Ta.sub(t),u))}t.add(Jr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(Yr.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Yr,cc)===null||Qn.origin.distanceToSquared(cc)>(e.far-e.near)**2))&&(lc.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,M=R;v<M;v+=3){const E=o.getX(v),A=o.getX(v+1),x=o.getX(v+2);r=jr(this,f,e,n,c,u,d,E,A,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const S=o.getX(m),R=o.getX(m+1),v=o.getX(m+2);r=jr(this,a,e,n,c,u,d,S,R,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,M=R;v<M;v+=3){const E=v,A=v+1,x=v+2;r=jr(this,f,e,n,c,u,d,E,A,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const S=m,R=m+1,v=m+2;r=jr(this,a,e,n,c,u,d,S,R,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function ip(i,e,t,n,r,s,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===oi,o),l===null)return null;Qr.copy(o),Qr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Qr);return c<t.near||c>t.far?null:{distance:c,point:Qr.clone(),object:i}}function jr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,$r),i.getVertexPosition(l,Kr),i.getVertexPosition(c,Zr);const u=ip(i,e,t,n,$r,Kr,Zr,uc);if(u){const d=new B;Zt.getBarycoord(uc,$r,Kr,Zr,d),r&&(u.uv=Zt.getInterpolatedAttribute(r,o,l,c,d,new Ee)),s&&(u.uv1=Zt.getInterpolatedAttribute(s,o,l,c,d,new Ee)),a&&(u.normal=Zt.getInterpolatedAttribute(a,o,l,c,d,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new B,materialIndex:0};Zt.getNormal($r,Kr,Zr,h.normal),u.face=h,u.barycoord=d}return u}class mi extends Lt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=xt,u=xt,d,h){super(null,a,o,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hc extends _t{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ii=new ot,dc=new ot,es=[],fc=new di,rp=new ot,cr=new ht,ur=new fi;class lS extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,rp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),fc.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(fc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),ur.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(cr.geometry=this.geometry,cr.material=this.material,cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ur.copy(this.boundingSphere),ur.applyMatrix4(n),e.ray.intersectsSphere(ur)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ii),dc.multiplyMatrices(n,Ii),cr.matrixWorld=dc,cr.raycast(e,es);for(let a=0,o=es.length;a<o;a++){const l=es[a];l.instanceId=s,l.object=this,t.push(l)}es.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new hc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new mi(new Float32Array(r*this.count),r,this.count,Rr,an));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const jn=new fi,sp=new Ee(.5,.5),ts=new B;class dl{constructor(e=new Tn,t=new Tn,n=new Tn,r=new Tn,s=new Tn,a=new Tn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],p=s[7],g=s[8],y=s[9],m=s[10],f=s[11],S=s[12],R=s[13],v=s[14],M=s[15];if(r[0].setComponents(c-a,p-u,f-g,M-S).normalize(),r[1].setComponents(c+a,p+u,f+g,M+S).normalize(),r[2].setComponents(c+o,p+d,f+y,M+R).normalize(),r[3].setComponents(c-o,p-d,f-y,M-R).normalize(),n)r[4].setComponents(l,h,m,v).normalize(),r[5].setComponents(c-l,p-h,f-m,M-v).normalize();else if(r[4].setComponents(c-l,p-h,f-m,M-v).normalize(),t===gn)r[5].setComponents(c+l,p+h,f+m,M+v).normalize();else if(t===wr)r[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){jn.center.set(0,0,0);const t=sp.distanceTo(e.center);return jn.radius=.7071067811865476+t,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ts.x=r.normal.x>0?e.max.x:e.min.x,ts.y=r.normal.y>0?e.max.y:e.min.y,ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ap extends pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fs=new B,ks=new B,pc=new ot,hr=new qs,ns=new fi,Aa=new B,mc=new B;class op extends Et{constructor(e=new St,t=new ap){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Fs.fromBufferAttribute(t,r-1),ks.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Fs.distanceTo(ks);e.setAttribute("lineDistance",new vt(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(r),ns.radius+=s,e.ray.intersectsSphere(ns)===!1)return;pc.copy(r).invert(),hr.copy(e.ray).applyMatrix4(pc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){const f=u.getX(y),S=u.getX(y+1),R=is(this,e,hr,l,f,S,y);R&&t.push(R)}if(this.isLineLoop){const y=u.getX(g-1),m=u.getX(p),f=is(this,e,hr,l,y,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=p,m=g-1;y<m;y+=c){const f=is(this,e,hr,l,y,y+1,y);f&&t.push(f)}if(this.isLineLoop){const y=is(this,e,hr,l,g-1,p,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function is(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Fs.fromBufferAttribute(o,r),ks.fromBufferAttribute(o,s),t.distanceSqToSegment(Fs,ks,Aa,mc)>n)return;Aa.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Aa);if(!(c<e.near||c>e.far))return{distance:c,point:mc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const gc=new B,vc=new B;class cS extends op{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)gc.fromBufferAttribute(t,r),vc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+gc.distanceTo(vc);e.setAttribute("lineDistance",new vt(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lp extends pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xc=new ot,Oo=new qs,rs=new fi,ss=new B;class uS extends Et{constructor(e=new St,t=new lp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rs.copy(n.boundingSphere),rs.applyMatrix4(r),rs.radius+=s,e.ray.intersectsSphere(rs)===!1)return;xc.copy(r).invert(),Oo.copy(e.ray).applyMatrix4(xc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,y=p;g<y;g++){const m=c.getX(g);ss.fromBufferAttribute(d,m),_c(ss,m,l,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=h,y=p;g<y;g++)ss.fromBufferAttribute(d,g),_c(ss,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function _c(i,e,t,n,r,s,a){const o=Oo.distanceSqToPoint(i);if(o<t){const l=new B;Oo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class hS extends Lt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=xt,this.minFilter=xt,this.generateMipmaps=!1,this.needsUpdate=!0}}class th extends Lt{constructor(e=[],t=li,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dS extends Lt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ji extends Lt{constructor(e,t,n=_n,r,s,a,o=xt,l=xt,c,u=Un,d=1){if(u!==Un&&u!==qn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ul(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class cp extends Ji{constructor(e,t=_n,n=li,r,s,a=xt,o=xt,l,c=Un){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class nh extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Cr extends St{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(d,2));function g(y,m,f,S,R,v,M,E,A,x,w){const L=v/A,U=M/x,C=v/2,I=M/2,D=E/2,N=A+1,$=x+1;let Y=0,se=0;const Z=new B;for(let ne=0;ne<$;ne++){const re=ne*U-I;for(let Pe=0;Pe<N;Pe++){const Re=Pe*L-C;Z[y]=Re*S,Z[m]=re*R,Z[f]=D,c.push(Z.x,Z.y,Z.z),Z[y]=0,Z[m]=0,Z[f]=E>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(Pe/A),d.push(1-ne/x),Y+=1}}for(let ne=0;ne<x;ne++)for(let re=0;re<A;re++){const Pe=h+re+N*ne,Re=h+re+N*(ne+1),qe=h+(re+1)+N*(ne+1),Xe=h+(re+1)+N*ne;l.push(Pe,Re,Xe),l.push(Re,qe,Xe),se+=6}o.addGroup(p,se,w),p+=se,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Os extends St{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new B,u=new Ee;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const p=n+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(o,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class fl extends St{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let g=0;const y=[],m=n/2;let f=0;S(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new vt(d,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(p,2));function S(){const v=new B,M=new B;let E=0;const A=(t-e)/n;for(let x=0;x<=s;x++){const w=[],L=x/s,U=L*(t-e)+e;for(let C=0;C<=r;C++){const I=C/r,D=I*l+o,N=Math.sin(D),$=Math.cos(D);M.x=U*N,M.y=-L*n+m,M.z=U*$,d.push(M.x,M.y,M.z),v.set(N,A,$).normalize(),h.push(v.x,v.y,v.z),p.push(I,1-L),w.push(g++)}y.push(w)}for(let x=0;x<r;x++)for(let w=0;w<s;w++){const L=y[w][x],U=y[w+1][x],C=y[w+1][x+1],I=y[w][x+1];(e>0||w!==0)&&(u.push(L,U,I),E+=3),(t>0||w!==s-1)&&(u.push(U,C,I),E+=3)}c.addGroup(f,E,0),f+=E}function R(v){const M=g,E=new Ee,A=new B;let x=0;const w=v===!0?e:t,L=v===!0?1:-1;for(let C=1;C<=r;C++)d.push(0,m*L,0),h.push(0,L,0),p.push(.5,.5),g++;const U=g;for(let C=0;C<=r;C++){const D=C/r*l+o,N=Math.cos(D),$=Math.sin(D);A.x=w*$,A.y=m*L,A.z=w*N,d.push(A.x,A.y,A.z),h.push(0,L,0),E.x=N*.5+.5,E.y=$*.5*L+.5,p.push(E.x,E.y),g++}for(let C=0;C<r;C++){const I=M+C,D=U+C;v===!0?u.push(D,D+1,I):u.push(D+1,D,I),x+=3}c.addGroup(f,x,v===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pn extends St{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,h=t/l,p=[],g=[],y=[],m=[];for(let f=0;f<u;f++){const S=f*h-a;for(let R=0;R<c;R++){const v=R*d-s;g.push(v,-S,0),y.push(0,0,1),m.push(R/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const R=S+c*f,v=S+c*(f+1),M=S+1+c*(f+1),E=S+1+c*f;p.push(R,v,E),p.push(v,M,E)}this.setIndex(p),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(y,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Bs extends St{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/r,p=new B,g=new Ee;for(let y=0;y<=r;y++){for(let m=0;m<=n;m++){const f=s+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let y=0;y<r;y++){const m=y*(n+1);for(let f=0;f<n;f++){const S=f+m,R=S,v=S+n+1,M=S+n+2,E=S+1;o.push(R,v,E),o.push(v,M,E)}}this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(yc(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(yc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function kt(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const r in n)e[r]=n[r]}return e}function yc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function up(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ih(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const hp={clone:Qi,merge:kt};var dp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wt extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=up(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Be().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ee().fromArray(r.value);break;case"v3":this.uniforms[n].value=new B().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Ye().fromArray(r.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(r.value);break;case"m4":this.uniforms[n].value=new ot().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pp extends wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mp extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gp extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class rh extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class vp extends rh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ra=new ot,Sc=new B,Mc=new B;class xp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=zt,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dl,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sc),Mc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Mc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ra,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===wr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const as=new B,os=new er,un=new B;class sh extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(as,os,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,un.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(as,os,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new B,bc=new Ee,wc=new Ee;class $t extends sh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z)}getViewSize(e,t){return this.getViewBounds(e,bc,wc),t.subVectors(wc,bc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(_r*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ys extends sh{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _p extends xp{constructor(){super(new Ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yp extends rh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new _p}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class fS extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ui=-90,Ni=1;class Sp extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $t(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const s=new $t(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const a=new $t(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const o=new $t(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const l=new $t(Ui,Ni,e,t);l.layers=this.layers,this.add(l);const c=new $t(Ui,Ni,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mp extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ec=new ot;class bp{constructor(e,t,n=0,r=1/0){this.ray=new qs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new hl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ec.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(e,t=!0,n=[]){return Bo(e,this,n,t),n.sort(Tc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Bo(e[r],this,n,t);return n.sort(Tc),n}}function Tc(i,e){return i.distance-e.distance}function Bo(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Bo(s[a],e,t,!0)}}class ah{static{ah.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Ac(i,e,t,n){const r=wp(n);switch(t){case qu:return i*e;case Rr:return i*e/r.components*r.byteLength;case rl:return i*e/r.components*r.byteLength;case ci:return i*e*2/r.components*r.byteLength;case sl:return i*e*2/r.components*r.byteLength;case Yu:return i*e*3/r.components*r.byteLength;case Jt:return i*e*4/r.components*r.byteLength;case al:return i*e*4/r.components*r.byteLength;case _s:case ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ss:case Ms:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oo:case co:return Math.max(i,16)*Math.max(e,8)/4;case ao:case lo:return Math.max(i,8)*Math.max(e,8)/2;case uo:case ho:case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fo:case Ps:case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case _o:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case bo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case wo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Po:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Lo:case Do:case Io:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Uo:case No:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ls:case Fo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wp(i){switch(i){case zt:case Gu:return{byteLength:1,components:1};case Mr:case Vu:case on:return{byteLength:2,components:1};case nl:case il:return{byteLength:2,components:4};case _n:case tl:case an:return{byteLength:4,components:1};case Wu:case Xu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);function oh(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ep(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],y=d[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,d[h]=y)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const y=d[p];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
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
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
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
#endif`,Up=`#ifdef USE_BATCHING
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
#endif`,Np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bp=`#ifdef USE_IRIDESCENCE
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
#endif`,zp=`#ifdef USE_BUMPMAP
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Kp=`#define PI 3.141592653589793
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
} // validated`,Zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rm=`#ifdef USE_ENVMAP
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
#endif`,sm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
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
#endif`,om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
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
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xm=`#ifdef USE_ENVMAP
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
#endif`,_m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
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
#endif`,wm=`uniform sampler2D dfgLUT;
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
}`,Em=`
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
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Im=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fm=`#if defined( USE_POINTS_UV )
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
#endif`,km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`#ifdef USE_MORPHTARGETS
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
#endif`,Vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Km=`#ifdef USE_NORMALMAP
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
#endif`,Zm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hg=`float getShadowMask() {
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
}`,dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fg=`#ifdef USE_SKINNING
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
#endif`,pg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mg=`#ifdef USE_SKINNING
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
#endif`,gg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_g=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yg=`#ifdef USE_TRANSMISSION
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
#endif`,Sg=`#ifdef USE_TRANSMISSION
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Eg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ag=`uniform sampler2D t2D;
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
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`#include <common>
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
}`,Ig=`#if DEPTH_PACKING == 3200
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
}`,Ug=`#define DISTANCE
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
}`,Ng=`#define DISTANCE
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`uniform float scale;
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
}`,Bg=`uniform vec3 diffuse;
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
}`,zg=`#include <common>
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
}`,Hg=`uniform vec3 diffuse;
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
}`,Gg=`#define LAMBERT
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
}`,Vg=`#define LAMBERT
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
}`,Wg=`#define MATCAP
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
}`,Xg=`#define MATCAP
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
}`,qg=`#define NORMAL
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
}`,Yg=`#define NORMAL
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
}`,$g=`#define PHONG
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
}`,Kg=`#define PHONG
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
}`,Zg=`#define STANDARD
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
}`,Jg=`#define STANDARD
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
}`,Qg=`#define TOON
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
}`,jg=`#define TOON
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
}`,e0=`uniform float size;
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
}`,t0=`uniform vec3 diffuse;
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
}`,n0=`#include <common>
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
}`,i0=`uniform vec3 color;
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
}`,r0=`uniform float rotation;
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
}`,s0=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Tp,alphahash_pars_fragment:Ap,alphamap_fragment:Rp,alphamap_pars_fragment:Cp,alphatest_fragment:Pp,alphatest_pars_fragment:Lp,aomap_fragment:Dp,aomap_pars_fragment:Ip,batching_pars_vertex:Up,batching_vertex:Np,begin_vertex:Fp,beginnormal_vertex:kp,bsdfs:Op,iridescence_fragment:Bp,bumpmap_pars_fragment:zp,clipping_planes_fragment:Hp,clipping_planes_pars_fragment:Gp,clipping_planes_pars_vertex:Vp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:$p,common:Kp,cube_uv_reflection_fragment:Zp,defaultnormal_vertex:Jp,displacementmap_pars_vertex:Qp,displacementmap_vertex:jp,emissivemap_fragment:em,emissivemap_pars_fragment:tm,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:rm,envmap_common_pars_fragment:sm,envmap_pars_fragment:am,envmap_pars_vertex:om,envmap_physical_pars_fragment:xm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:um,fog_fragment:hm,fog_pars_fragment:dm,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:vm,lights_toon_fragment:_m,lights_toon_pars_fragment:ym,lights_phong_fragment:Sm,lights_phong_pars_fragment:Mm,lights_physical_fragment:bm,lights_physical_pars_fragment:wm,lights_fragment_begin:Em,lights_fragment_maps:Tm,lights_fragment_end:Am,lightprobes_pars_fragment:Rm,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:Pm,logdepthbuf_pars_vertex:Lm,logdepthbuf_vertex:Dm,map_fragment:Im,map_pars_fragment:Um,map_particle_fragment:Nm,map_particle_pars_fragment:Fm,metalnessmap_fragment:km,metalnessmap_pars_fragment:Om,morphinstance_vertex:Bm,morphcolor_vertex:zm,morphnormal_vertex:Hm,morphtarget_pars_vertex:Gm,morphtarget_vertex:Vm,normal_fragment_begin:Wm,normal_fragment_maps:Xm,normal_pars_fragment:qm,normal_pars_vertex:Ym,normal_vertex:$m,normalmap_pars_fragment:Km,clearcoat_normal_fragment_begin:Zm,clearcoat_normal_fragment_maps:Jm,clearcoat_pars_fragment:Qm,iridescence_pars_fragment:jm,opaque_fragment:eg,packing:tg,premultiplied_alpha_fragment:ng,project_vertex:ig,dithering_fragment:rg,dithering_pars_fragment:sg,roughnessmap_fragment:ag,roughnessmap_pars_fragment:og,shadowmap_pars_fragment:lg,shadowmap_pars_vertex:cg,shadowmap_vertex:ug,shadowmask_pars_fragment:hg,skinbase_vertex:dg,skinning_pars_vertex:fg,skinning_vertex:pg,skinnormal_vertex:mg,specularmap_fragment:gg,specularmap_pars_fragment:vg,tonemapping_fragment:xg,tonemapping_pars_fragment:_g,transmission_fragment:yg,transmission_pars_fragment:Sg,uv_pars_fragment:Mg,uv_pars_vertex:bg,uv_vertex:wg,worldpos_vertex:Eg,background_vert:Tg,background_frag:Ag,backgroundCube_vert:Rg,backgroundCube_frag:Cg,cube_vert:Pg,cube_frag:Lg,depth_vert:Dg,depth_frag:Ig,distance_vert:Ug,distance_frag:Ng,equirect_vert:Fg,equirect_frag:kg,linedashed_vert:Og,linedashed_frag:Bg,meshbasic_vert:zg,meshbasic_frag:Hg,meshlambert_vert:Gg,meshlambert_frag:Vg,meshmatcap_vert:Wg,meshmatcap_frag:Xg,meshnormal_vert:qg,meshnormal_frag:Yg,meshphong_vert:$g,meshphong_frag:Kg,meshphysical_vert:Zg,meshphysical_frag:Jg,meshtoon_vert:Qg,meshtoon_frag:jg,points_vert:e0,points_frag:t0,shadow_vert:n0,shadow_frag:i0,sprite_vert:r0,sprite_frag:s0},ge={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},dn={basic:{uniforms:kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:kt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:kt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Be(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:kt([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:kt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:kt([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:kt([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:kt([ge.common,ge.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:kt([ge.lights,ge.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};dn.physical={uniforms:kt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ls={r:0,b:0,g:0},a0=new ot,lh=new ze;lh.set(-1,0,0,0,1,0,0,0,1);function o0(i,e,t,n,r,s){const a=new Be(0);let o=r===!0?0:1,l,c,u=null,d=0,h=null;function p(S){let R=S.isScene===!0?S.background:null;if(R&&R.isTexture){const v=S.backgroundBlurriness>0;R=e.get(R,v)}return R}function g(S){let R=!1;const v=p(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),R=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(S,R){const v=p(R);v&&(v.isCubeTexture||v.mapping===Xs)?(c===void 0&&(c=new ht(new Cr(1,1,1),new wt({name:"BackgroundCubeMaterial",uniforms:Qi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(a0.makeRotationFromEuler(R.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(lh),c.material.toneMapped=Je.getTransfer(v.colorSpace)!==lt,(u!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ht(new Pn(2,2),new wt({name:"BackgroundMaterial",uniforms:Qi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Je.getTransfer(v.colorSpace)!==lt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,R){S.getRGB(ls,ih(i)),t.buffers.color.setClear(ls.r,ls.g,ls.b,R,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,R=1){a.set(S),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:y,dispose:f}}function l0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(U,C,I,D,N){let $=!1;const Y=d(U,D,I,C);s!==Y&&(s=Y,c(s.object)),$=p(U,D,I,N),$&&g(U,D,I,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,v(U,C,I,D),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(U){return i.bindVertexArray(U)}function u(U){return i.deleteVertexArray(U)}function d(U,C,I,D){const N=D.wireframe===!0;let $=n[C.id];$===void 0&&($={},n[C.id]=$);const Y=U.isInstancedMesh===!0?U.id:0;let se=$[Y];se===void 0&&(se={},$[Y]=se);let Z=se[I.id];Z===void 0&&(Z={},se[I.id]=Z);let ne=Z[N];return ne===void 0&&(ne=h(l()),Z[N]=ne),ne}function h(U){const C=[],I=[],D=[];for(let N=0;N<t;N++)C[N]=0,I[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:D,object:U,attributes:{},index:null}}function p(U,C,I,D){const N=s.attributes,$=C.attributes;let Y=0;const se=I.getAttributes();for(const Z in se)if(se[Z].location>=0){const re=N[Z];let Pe=$[Z];if(Pe===void 0&&(Z==="instanceMatrix"&&U.instanceMatrix&&(Pe=U.instanceMatrix),Z==="instanceColor"&&U.instanceColor&&(Pe=U.instanceColor)),re===void 0||re.attribute!==Pe||Pe&&re.data!==Pe.data)return!0;Y++}return s.attributesNum!==Y||s.index!==D}function g(U,C,I,D){const N={},$=C.attributes;let Y=0;const se=I.getAttributes();for(const Z in se)if(se[Z].location>=0){let re=$[Z];re===void 0&&(Z==="instanceMatrix"&&U.instanceMatrix&&(re=U.instanceMatrix),Z==="instanceColor"&&U.instanceColor&&(re=U.instanceColor));const Pe={};Pe.attribute=re,re&&re.data&&(Pe.data=re.data),N[Z]=Pe,Y++}s.attributes=N,s.attributesNum=Y,s.index=D}function y(){const U=s.newAttributes;for(let C=0,I=U.length;C<I;C++)U[C]=0}function m(U){f(U,0)}function f(U,C){const I=s.newAttributes,D=s.enabledAttributes,N=s.attributeDivisors;I[U]=1,D[U]===0&&(i.enableVertexAttribArray(U),D[U]=1),N[U]!==C&&(i.vertexAttribDivisor(U,C),N[U]=C)}function S(){const U=s.newAttributes,C=s.enabledAttributes;for(let I=0,D=C.length;I<D;I++)C[I]!==U[I]&&(i.disableVertexAttribArray(I),C[I]=0)}function R(U,C,I,D,N,$,Y){Y===!0?i.vertexAttribIPointer(U,C,I,N,$):i.vertexAttribPointer(U,C,I,D,N,$)}function v(U,C,I,D){y();const N=D.attributes,$=I.getAttributes(),Y=C.defaultAttributeValues;for(const se in $){const Z=$[se];if(Z.location>=0){let ne=N[se];if(ne===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(ne=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(ne=U.instanceColor)),ne!==void 0){const re=ne.normalized,Pe=ne.itemSize,Re=e.get(ne);if(Re===void 0)continue;const qe=Re.buffer,Xe=Re.type,Ge=Re.bytesPerElement,H=Xe===i.INT||Xe===i.UNSIGNED_INT||ne.gpuType===tl;if(ne.isInterleavedBufferAttribute){const X=ne.data,le=X.stride,ve=ne.offset;if(X.isInstancedInterleavedBuffer){for(let he=0;he<Z.locationSize;he++)f(Z.location+he,X.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let he=0;he<Z.locationSize;he++)m(Z.location+he);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let he=0;he<Z.locationSize;he++)R(Z.location+he,Pe/Z.locationSize,Xe,re,le*Ge,(ve+Pe/Z.locationSize*he)*Ge,H)}else{if(ne.isInstancedBufferAttribute){for(let X=0;X<Z.locationSize;X++)f(Z.location+X,ne.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let X=0;X<Z.locationSize;X++)m(Z.location+X);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let X=0;X<Z.locationSize;X++)R(Z.location+X,Pe/Z.locationSize,Xe,re,Pe*Ge,Pe/Z.locationSize*X*Ge,H)}}else if(Y!==void 0){const re=Y[se];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(Z.location,re);break;case 3:i.vertexAttrib3fv(Z.location,re);break;case 4:i.vertexAttrib4fv(Z.location,re);break;default:i.vertexAttrib1fv(Z.location,re)}}}}S()}function M(){w();for(const U in n){const C=n[U];for(const I in C){const D=C[I];for(const N in D){const $=D[N];for(const Y in $)u($[Y].object),delete $[Y];delete D[N]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const C=n[U.id];for(const I in C){const D=C[I];for(const N in D){const $=D[N];for(const Y in $)u($[Y].object),delete $[Y];delete D[N]}}delete n[U.id]}function A(U){for(const C in n){const I=n[C];for(const D in I){const N=I[D];if(N[U.id]===void 0)continue;const $=N[U.id];for(const Y in $)u($[Y].object),delete $[Y];delete N[U.id]}}}function x(U){for(const C in n){const I=n[C],D=U.isInstancedMesh===!0?U.id:0,N=I[D];if(N!==void 0){for(const $ in N){const Y=N[$];for(const se in Y)u(Y[se].object),delete Y[se];delete N[$]}delete I[D],Object.keys(I).length===0&&delete n[C]}}}function w(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function c0(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function u0(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Jt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const x=A===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==zt&&A!==an&&!x&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Oe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:R,maxFragmentUniforms:v,maxSamples:M,samples:E}}function h0(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Tn,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,R=S*4;let v=f.clippingState||null;l.value=v,v=u(g,h,R,p);for(let M=0;M!==R;++M)v[M]=t[M];f.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const f=p+y*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let R=0,v=p;R!==y;++R,v+=4)a.copy(d[R]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const Hi=4,d0=6,f0=20,p0=256,dr=new Ys,Rc=new Be;let Ca=null,Pa=0,La=0,Da=!1;const m0=new B,ei=new B;class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=m0}=s;Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ca,Pa,La),this._renderer.xr.enabled=Da,e.scissorTest=!1,Fi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===li||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:at,minFilter:at,generateMipmaps:!1,type:on,format:Jt,colorSpace:br,depthBuffer:!1},r=Pc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=g0(s)),this._blurMaterial=x0(s,e,t),this._ggxMaterial=v0(s,e,t)}return r}_compileMaterial(e){const t=new ht(new St,e);this._renderer.compile(t,dr)}_sceneToCubeUV(e,t,n,r,s){const l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Rc),d.toneMapping=vn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ht(new Cr,new En({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let f=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,f=!0):(m.color.copy(Rc),f=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[R],s.y,s.z)):v===1?(l.up.set(0,0,c[R]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[R],s.z)):(l.up.set(0,c[R],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[R]));const M=this._cubeSize;Fi(r,v*M,R>2?M:0,M,M),d.setRenderTarget(r),f&&d.render(y,l),d.render(e,l)}d.toneMapping=p,d.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===li||e.mapping===Ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Fi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,p=d*h,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-Hi?n-g+Hi:0),f=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,Fi(s,m,f,3*y,2*y),r.setRenderTarget(s),r.render(o,dr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Fi(e,m,f,3*y,2*y),r.setRenderTarget(e),r.render(o,dr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-Hi?r-this._lodMax+Hi:0),h=4*(this._cubeSize-u);Fi(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,dr)}}function g0(i){const e=[],t=[];let n=i;const r=i-Hi+1+d0;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,p=3,g=new Float32Array(p*h*d),y=new Float32Array(p*h*d);for(let f=0;f<d;f++){const S=f%3*2/3-1,R=f>2?0:-1,v=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];g.set(v,p*h*f);for(let M=0;M<h;M++){const E=u[M*2]*2-1,A=u[M*2+1]*2-1;f===0?ei.set(1,A,E):f===1?ei.set(-E,1,-A):f===2?ei.set(-E,A,1):f===3?ei.set(-1,A,-E):f===4?ei.set(-E,-1,A):ei.set(E,A,-1),ei.toArray(y,(f*h+M)*p)}}const m=new St;m.setAttribute("position",new _t(g,p)),m.setAttribute("outputDirection",new _t(y,p)),t.push(new ht(m,null)),n>Hi&&n--}return{lodMeshes:t,sizeLods:e}}function Pc(i,e,t){const n=new Wt(i,e,t);return n.texture.mapping=Xs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function v0(i,e,t){return new wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:p0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function x0(i,e,t){return new wt({name:"SphericalGaussianBlur",defines:{SAMPLES:f0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Lc(){return new wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$s(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Dc(){return new wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$s(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function $s(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ch extends Wt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new th(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Cr(5,5,5),s=new wt({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Ln});s.uniforms.tEquirect.value=t;const a=new ht(r,s),o=t.minFilter;return t.minFilter===si&&(t.minFilter=at),new Sp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function _0(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===na||p===ia)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new ch(g.height);return y.fromEquirectangularTexture(i,h),e.set(h,y),h.addEventListener("dispose",c),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===na||p===ia,y=p===li||p===Ki;if(g||y){let m=t.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Cc(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||y&&S&&l(S)?(n===null&&(n=new Cc(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===na?h.mapping=li:p===ia&&(h.mapping=Ki),h}function l(h){let p=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function y0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Vi("WebGLRenderer: "+n+" extension not supported."),r}}}function S0(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(d){const h=[],p=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(p!==null){const S=p.array;y=p.version;for(let R=0,v=S.length;R<v;R+=3){const M=S[R+0],E=S[R+1],A=S[R+2];h.push(M,E,E,A,A,M)}}else{const S=g.array;y=g.version;for(let R=0,v=S.length/3-1;R<v;R+=3){const M=R+0,E=R+1,A=R+2;h.push(M,E,E,A,A,M)}}const m=new(g.count>=65535?ju:Qu)(h,1);m.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function M0(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,s,d*a),t.update(h,n,1)}function c(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,s,d*a,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,p);let y=0;for(let m=0;m<p;m++)y+=h[m];t.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function b0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function w0(i,e,t){const n=new WeakMap,r=new Ye;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let R=0;p===!0&&(R=1),g===!0&&(R=2),y===!0&&(R=3);let v=o.attributes.position.count*R,M=1;v>e.maxTextureSize&&(M=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const E=new Float32Array(v*M*4*d),A=new Zu(E,v,M,d);A.type=an,A.needsUpdate=!0;const x=R*4;for(let L=0;L<d;L++){const U=m[L],C=f[L],I=S[L],D=v*M*4*L;for(let N=0;N<U.count;N++){const $=N*x;p===!0&&(r.fromBufferAttribute(U,N),E[D+$+0]=r.x,E[D+$+1]=r.y,E[D+$+2]=r.z,E[D+$+3]=0),g===!0&&(r.fromBufferAttribute(C,N),E[D+$+4]=r.x,E[D+$+5]=r.y,E[D+$+6]=r.z,E[D+$+7]=0),y===!0&&(r.fromBufferAttribute(I,N),E[D+$+8]=r.x,E[D+$+9]=r.y,E[D+$+10]=r.z,E[D+$+11]=I.itemSize===4?r.w:1)}}h={count:d,texture:A,size:new Ee(v,M)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function E0(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const T0={[Uu]:"LINEAR_TONE_MAPPING",[Nu]:"REINHARD_TONE_MAPPING",[Fu]:"CINEON_TONE_MAPPING",[ku]:"ACES_FILMIC_TONE_MAPPING",[Bu]:"AGX_TONE_MAPPING",[zu]:"NEUTRAL_TONE_MAPPING",[Ou]:"CUSTOM_TONE_MAPPING"};function A0(i,e,t,n,r,s){const a=new Wt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new St;c.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new vt([0,2,0,0,2,0],2));const u=new pp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ht(c,u),h=new Ys(-1,1,1,-1,0,1);let p=null,g=null,y=!1,m,f=null,S=[],R=!1;this.setSize=function(v,M){a.setSize(v,M),o!==null&&o.setSize(v,M),l!==null&&l.setSize(v,M);for(let E=0;E<S.length;E++){const A=S[E];A.setSize&&A.setSize(v,M)}},this.setEffects=function(v){S=v,R=S.length>0&&S[0].isRenderPass===!0;const M=a.width,E=a.height;S.length>0&&o===null&&(o=new Wt(M,E,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new Wt(M,E,{type:on,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){const x=S[A];x.setSize&&x.setSize(M,E)}},this.begin=function(v,M){if(y||v.toneMapping===vn&&S.length===0)return!1;if(f=M,M!==null){const E=M.width,A=M.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return R===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=vn,!0},this.hasRenderPass=function(){return R},this.end=function(v,M){v.toneMapping=m,y=!0;let E=a,A=o;for(let x=0;x<S.length;x++){const w=S[x];w.enabled!==!1&&(w.render(v,A,E,M),w.needsSwap!==!1&&(E=A,A=A===o?l:o))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,u.defines={},Je.getTransfer(p)===lt&&(u.defines.SRGB_TRANSFER="");const x=T0[g];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(f),v.render(d,h),f=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const uh=new Lt,zo=new Ji(1,1),hh=new Zu,dh=new kf,fh=new th,Ic=[],Uc=[],Nc=new Float32Array(16),Fc=new Float32Array(9),kc=new Float32Array(4);function tr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ic[r];if(s===void 0&&(s=new Float32Array(r),Ic[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ks(i,e){let t=Uc[e];t===void 0&&(t=new Int32Array(e),Uc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function R0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function L0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function D0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;kc.set(n),i.uniformMatrix2fv(this.addr,!1,kc),Ct(t,n)}}function I0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Fc.set(n),i.uniformMatrix3fv(this.addr,!1,Fc),Ct(t,n)}}function U0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),Ct(t,n)}}function N0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function F0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function k0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function O0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function B0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function H0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function G0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function V0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(zo.compareFunction=t.isReversedDepthBuffer()?ll:ol,s=zo):s=uh,t.setTexture2D(e||s,r)}function W0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||dh,r)}function X0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||fh,r)}function q0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||hh,r)}function Y0(i){switch(i){case 5126:return R0;case 35664:return C0;case 35665:return P0;case 35666:return L0;case 35674:return D0;case 35675:return I0;case 35676:return U0;case 5124:case 35670:return N0;case 35667:case 35671:return F0;case 35668:case 35672:return k0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return z0;case 36295:return H0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return X0;case 36289:case 36303:case 36311:case 36292:return q0}}function $0(i,e){i.uniform1fv(this.addr,e)}function K0(i,e){const t=tr(e,this.size,2);i.uniform2fv(this.addr,t)}function Z0(i,e){const t=tr(e,this.size,3);i.uniform3fv(this.addr,t)}function J0(i,e){const t=tr(e,this.size,4);i.uniform4fv(this.addr,t)}function Q0(i,e){const t=tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function j0(i,e){const t=tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ev(i,e){const t=tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function tv(i,e){i.uniform1iv(this.addr,e)}function nv(i,e){i.uniform2iv(this.addr,e)}function iv(i,e){i.uniform3iv(this.addr,e)}function rv(i,e){i.uniform4iv(this.addr,e)}function sv(i,e){i.uniform1uiv(this.addr,e)}function av(i,e){i.uniform2uiv(this.addr,e)}function ov(i,e){i.uniform3uiv(this.addr,e)}function lv(i,e){i.uniform4uiv(this.addr,e)}function cv(i,e,t){const n=this.cache,r=e.length,s=Ks(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=zo:a=uh;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function uv(i,e,t){const n=this.cache,r=e.length,s=Ks(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||dh,s[a])}function hv(i,e,t){const n=this.cache,r=e.length,s=Ks(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||fh,s[a])}function dv(i,e,t){const n=this.cache,r=e.length,s=Ks(t,r);Rt(n,s)||(i.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hh,s[a])}function fv(i){switch(i){case 5126:return $0;case 35664:return K0;case 35665:return Z0;case 35666:return J0;case 35674:return Q0;case 35675:return j0;case 35676:return ev;case 5124:case 35670:return tv;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return rv;case 5125:return sv;case 36294:return av;case 36295:return ov;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return hv;case 36289:case 36303:case 36311:case 36292:return dv}}class pv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Y0(t.type)}}class mv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fv(t.type)}}class gv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ia=/(\w+)(\])?(\[|\.)?/g;function Oc(i,e){i.seq.push(e),i.map[e.id]=e}function vv(i,e,t){const n=i.name,r=n.length;for(Ia.lastIndex=0;;){const s=Ia.exec(n),a=Ia.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Oc(t,c===void 0?new pv(o,i,e):new mv(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new gv(o),Oc(t,d)),t=d}}}class bs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);vv(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Bc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xv=37297;let _v=0;function yv(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const zc=new ze;function Sv(i){Je._getMatrix(zc,Je.workingColorSpace,i);const e=`mat3( ${zc.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case Ds:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+yv(i.getShaderSource(e),o)}else return s}function Mv(i,e){const t=Sv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const bv={[Uu]:"Linear",[Nu]:"Reinhard",[Fu]:"Cineon",[ku]:"ACESFilmic",[Bu]:"AgX",[zu]:"Neutral",[Ou]:"Custom"};function wv(i,e){const t=bv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const cs=new B;function Ev(){Je.getLuminanceCoefficients(cs);const i=cs.x.toFixed(4),e=cs.y.toFixed(4),t=cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function Av(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vr(i){return i!==""}function Gc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ho(i){return i.replace(Cv,Lv)}const Pv=new Map;function Lv(i,e){let t=We[e];if(t===void 0){const n=Pv.get(e);if(n!==void 0)t=We[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ho(t)}const Dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(i){return i.replace(Dv,Iv)}function Iv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Uv={[xs]:"SHADOWMAP_TYPE_PCF",[gr]:"SHADOWMAP_TYPE_VSM"};function Nv(i){return Uv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Fv={[li]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Xs]:"ENVMAP_TYPE_CUBE_UV"};function kv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Fv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ov={[Ki]:"ENVMAP_MODE_REFRACTION"};function Bv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ov[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const zv={[Iu]:"ENVMAP_BLENDING_MULTIPLY",[jd]:"ENVMAP_BLENDING_MIX",[ef]:"ENVMAP_BLENDING_ADD"};function Hv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":zv[i.combine]||"ENVMAP_BLENDING_NONE"}function Gv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Vv(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Nv(t),c=kv(t),u=Bv(t),d=Hv(t),h=Gv(t),p=Tv(t),g=Av(s),y=r.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),f.length>0&&(f+=`
`)):(m=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),f=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?We.tonemapping_pars_fragment:"",t.toneMapping!==vn?wv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Mv("linearToOutputTexel",t.outputColorSpace),Ev(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vr).join(`
`)),a=Ho(a),a=Gc(a,t),a=Vc(a,t),o=Ho(o),o=Gc(o,t),o=Vc(o,t),a=Wc(a),o=Wc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const R=S+m+a,v=S+f+o,M=Bc(r,r.VERTEX_SHADER,R),E=Bc(r,r.FRAGMENT_SHADER,v);r.attachShader(y,M),r.attachShader(y,E),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(U){if(i.debug.checkShaderErrors){const C=r.getProgramInfoLog(y)||"",I=r.getShaderInfoLog(M)||"",D=r.getShaderInfoLog(E)||"",N=C.trim(),$=I.trim(),Y=D.trim();let se=!0,Z=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,M,E);else{const ne=Hc(r,M,"vertex"),re=Hc(r,E,"fragment");je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+N+`
`+ne+`
`+re)}else N!==""?Oe("WebGLProgram: Program Info Log:",N):($===""||Y==="")&&(Z=!1);Z&&(U.diagnostics={runnable:se,programLog:N,vertexShader:{log:$,prefix:m},fragmentShader:{log:Y,prefix:f}})}r.deleteShader(M),r.deleteShader(E),x=new bs(r,y),w=Rv(r,y)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(y,xv)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_v++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=E,this}let Wv=0;class Xv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new qv(e),t.set(e,n)),n}}class qv{constructor(e){this.id=Wv++,this.code=e,this.usedTimes=0}}function Yv(i){return i===ci||i===Ps||i===Ls}function $v(i,e,t,n,r,s){const a=new hl,o=new Xv,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,w,L,U,C,I){const D=U.fog,N=C.geometry,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,se=e.get(x.envMap||$,Y),Z=se&&se.mapping===Xs?se.image.height:null,ne=p[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Oe("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const re=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Pe=re!==void 0?re.length:0;let Re=0;N.morphAttributes.position!==void 0&&(Re=1),N.morphAttributes.normal!==void 0&&(Re=2),N.morphAttributes.color!==void 0&&(Re=3);let qe,Xe,Ge,H;if(ne){const ft=dn[ne];qe=ft.vertexShader,Xe=ft.fragmentShader}else{qe=x.vertexShader,Xe=x.fragmentShader;const ft=o.getVertexShaderStage(x),rt=o.getFragmentShaderStage(x);o.update(x,ft,rt),Ge=ft.id,H=rt.id}const X=i.getRenderTarget(),le=i.state.buffers.depth.getReversed(),ve=C.isInstancedMesh===!0,he=C.isBatchedMesh===!0,ye=!!x.map,it=!!x.matcap,Ne=!!se,ke=!!x.aoMap,Fe=!!x.lightMap,Se=!!x.bumpMap&&x.wireframe===!1,Ie=!!x.normalMap,et=!!x.displacementMap,Qe=!!x.emissiveMap,He=!!x.metalnessMap,mt=!!x.roughnessMap,O=x.anisotropy>0,Tt=x.clearcoat>0,nt=x.dispersion>0,P=x.retroreflectivity>0,_=x.iridescence>0,z=x.sheen>0,q=x.transmission>0,Q=O&&!!x.anisotropyMap,ue=Tt&&!!x.clearcoatMap,fe=Tt&&!!x.clearcoatNormalMap,j=Tt&&!!x.clearcoatRoughnessMap,T=_&&!!x.iridescenceMap,G=_&&!!x.iridescenceThicknessMap,J=z&&!!x.sheenColorMap,te=z&&!!x.sheenRoughnessMap,ie=!!x.specularMap,ae=!!x.specularColorMap,pe=!!x.specularIntensityMap,Ue=q&&!!x.transmissionMap,k=q&&!!x.thicknessMap,ce=!!x.gradientMap,ee=!!x.alphaMap,me=x.alphaTest>0,Me=!!x.alphaHash,oe=!!x.extensions;let De=vn;x.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(De=i.toneMapping);const Ce={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:qe,fragmentShader:Xe,defines:x.defines,customVertexShaderID:Ge,customFragmentShaderID:H,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:he,batchingColor:he&&C._colorsTexture!==null,instancing:ve,instancingColor:ve&&C.instanceColor!==null,instancingMorph:ve&&C.morphTexture!==null,outputColorSpace:X===null?i.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ye,matcap:it,envMap:Ne,envMapMode:Ne&&se.mapping,envMapCubeUVHeight:Z,aoMap:ke,lightMap:Fe,bumpMap:Se,normalMap:Ie,displacementMap:et,emissiveMap:Qe,normalMapObjectSpace:Ie&&x.normalMapType===rf,normalMapTangentSpace:Ie&&x.normalMapType===Xl,packedNormalMap:Ie&&x.normalMapType===Xl&&Yv(x.normalMap.format),metalnessMap:He,roughnessMap:mt,anisotropy:O,anisotropyMap:Q,clearcoat:Tt,clearcoatMap:ue,clearcoatNormalMap:fe,clearcoatRoughnessMap:j,dispersion:nt,retroreflection:P,iridescence:_,iridescenceMap:T,iridescenceThicknessMap:G,sheen:z,sheenColorMap:J,sheenRoughnessMap:te,specularMap:ie,specularColorMap:ae,specularIntensityMap:pe,transmission:q,transmissionMap:Ue,thicknessMap:k,gradientMap:ce,opaque:x.transparent===!1&&x.blending===Gi&&x.alphaToCoverage===!1,alphaMap:ee,alphaTest:me,alphaHash:Me,combine:x.combine,mapUv:ye&&g(x.map.channel),aoMapUv:ke&&g(x.aoMap.channel),lightMapUv:Fe&&g(x.lightMap.channel),bumpMapUv:Se&&g(x.bumpMap.channel),normalMapUv:Ie&&g(x.normalMap.channel),displacementMapUv:et&&g(x.displacementMap.channel),emissiveMapUv:Qe&&g(x.emissiveMap.channel),metalnessMapUv:He&&g(x.metalnessMap.channel),roughnessMapUv:mt&&g(x.roughnessMap.channel),anisotropyMapUv:Q&&g(x.anisotropyMap.channel),clearcoatMapUv:ue&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:T&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:G&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:J&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:te&&g(x.sheenRoughnessMap.channel),specularMapUv:ie&&g(x.specularMap.channel),specularColorMapUv:ae&&g(x.specularColorMap.channel),specularIntensityMapUv:pe&&g(x.specularIntensityMap.channel),transmissionMapUv:Ue&&g(x.transmissionMap.channel),thicknessMapUv:k&&g(x.thicknessMap.channel),alphaMapUv:ee&&g(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Ie||O),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!N.attributes.uv&&(ye||ee),fog:!!D,useFog:x.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&Ie===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:le,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:Re,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:ye&&x.map.isVideoTexture===!0&&Je.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:Qe&&x.emissiveMap.isVideoTexture===!0&&Je.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Kt,flipSided:x.side===Ht,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:oe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&x.extensions.multiDraw===!0||he)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)w.push(L),w.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(f(w,x),S(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function S(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function R(x){const w=p[x.type];let L;if(w){const U=dn[w];L=hp.clone(U.uniforms)}else L=x.uniforms;return L}function v(x,w){let L=u.get(w);return L!==void 0?++L.usedTimes:(L=new Vv(i,w,x,r),c.push(L),u.set(w,L)),L}function M(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:R,acquireProgram:v,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:A}}function Kv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Zv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,y,m,f){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:m,group:f},i[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=g,S.materialVariant=a(h),S.groupOrder=y,S.renderOrder=h.renderOrder,S.z=m,S.group=f),e++,S}function l(h,p,g,y,m,f,S){S.reversedDepth===!0&&(m=-m);const R=o(h,p,g,y,m,f);g.transmission>0?n.push(R):g.transparent===!0?r.push(R):t.push(R)}function c(h,p,g,y,m,f){const S=o(h,p,g,y,m,f);g.transmission>0?n.unshift(S):g.transparent===!0?r.unshift(S):t.unshift(S)}function u(h,p){t.length>1&&t.sort(h||Zv),n.length>1&&n.sort(p||qc),r.length>1&&r.sort(p||qc)}function d(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function Jv(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Yc,i.set(n,[a])):r>=s.length?(a=new Yc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Qv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Be};break;case"SpotLight":t={position:new B,direction:new B,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function jv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ex=0;function tx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function nx(i){const e=new Qv,t=jv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const r=new B,s=new ot,a=new ot;function o(c){let u=0,d=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let p=0,g=0,y=0,m=0,f=0,S=0,R=0,v=0,M=0,E=0,A=0,x=0,w=0,L=0;c.sort(tx);for(let C=0,I=c.length;C<I;C++){const D=c[C],N=D.color,$=D.intensity,Y=D.distance;let se=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ci?se=D.shadow.map.texture:se=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=N.r*$,d+=N.g*$,h+=N.b*$;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],$);L++}else if(D.isSunLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ne=D.shadow,re=t.get(D);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),n.sunShadow[g]=re,n.sunShadowMap[g]=se;const Pe=ne.getViewportCount();for(let Re=0;Re<Pe;Re++)n.sunShadowMatrix[y+Re]=ne.getMatrix(Re),n.sunShadowCascade[y+Re]=ne._cascadeData[Re];y+=Pe,g++}n.sun[p]=Z,p++}else if(D.isDirectionalLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ne=D.shadow,re=t.get(D);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.directionalShadow[m]=re,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=D.shadow.matrix,M++}n.directional[m]=Z,m++}else if(D.isSpotLight){const Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(N).multiplyScalar($),Z.distance=Y,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[S]=Z;const ne=D.shadow;if(D.map&&(n.spotLightMap[x]=D.map,x++,ne.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[S]=ne.matrix,D.castShadow){const re=t.get(D);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.spotShadow[S]=re,n.spotShadowMap[S]=se,A++}S++}else if(D.isRectAreaLight){const Z=e.get(D);Z.color.copy(N).multiplyScalar($),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[R]=Z,R++}else if(D.isPointLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){const ne=D.shadow,re=t.get(D);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,re.shadowCameraNear=ne.camera.near,re.shadowCameraFar=ne.camera.far,n.pointShadow[f]=re,n.pointShadowMap[f]=se,n.pointShadowMatrix[f]=D.shadow.matrix,E++}n.point[f]=Z,f++}else if(D.isHemisphereLight){const Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar($),Z.groundColor.copy(D.groundColor).multiplyScalar($),n.hemi[v]=Z,v++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const U=n.hash;(U.sunLength!==p||U.directionalLength!==m||U.pointLength!==f||U.spotLength!==S||U.rectAreaLength!==R||U.hemiLength!==v||U.numSunShadows!==g||U.numDirectionalShadows!==M||U.numPointShadows!==E||U.numSpotShadows!==A||U.numSpotMaps!==x||U.numLightProbes!==L)&&(n.sun.length=p,n.directional.length=m,n.spot.length=S,n.rectArea.length=R,n.point.length=f,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-w,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=L,U.sunLength=p,U.directionalLength=m,U.pointLength=f,U.spotLength=S,U.rectAreaLength=R,U.hemiLength=v,U.numSunShadows=g,U.numDirectionalShadows=M,U.numPointShadows=E,U.numSpotShadows=A,U.numSpotMaps=x,U.numLightProbes=L,n.version=ex++)}function l(c,u){let d=0,h=0,p=0,g=0,y=0,m=0;const f=u.matrixWorldInverse;for(let S=0,R=c.length;S<R;S++){const v=c[S];if(v.isSunLight){const M=n.sun[d];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(f),d++}else if(v.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),h++}else if(v.isSpotLight){const M=n.spot[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(f),g++}else if(v.isRectAreaLight){const M=n.rectArea[y];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),a.identity(),s.copy(v.matrixWorld),s.premultiply(f),a.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){const M=n.point[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){const M=n.hemi[m];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function $c(i){const e=new nx(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function ix(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new $c(i),e.set(r,[o])):s>=a.length?(o=new $c(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sx=`uniform sampler2D shadow_pass;
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
}`,ax=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],ox=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Kc=new ot,fr=new B,Ua=new B;function lx(i,e,t){let n=new dl;const r=new Ee,s=new Ee,a=new Ye,o=new mp,l=new gp,c={},u=t.maxTextureSize,d={[oi]:Ht,[Ht]:oi,[Kt]:Kt},h=new wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:rx,fragmentShader:sx}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new _t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ht(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xs;let f=this.type;this.render=function(E,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Ud&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=xs);const w=i.getRenderTarget(),L=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Ln),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const I=f!==this.type;I&&A.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(N=>N.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,N=E.length;D<N;D++){const $=E[D],Y=$.shadow;if(Y===void 0){Oe("WebGLShadowMap:",$,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const se=Y.getFrameExtents();r.multiply(se),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/se.x),r.x=s.x*se.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/se.y),r.y=s.y*se.y,Y.mapSize.y=s.y));const Z=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=Z,Y.map===null||I===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===gr){if($.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Wt(r.x,r.y,{format:ci,type:on,minFilter:at,magFilter:at,generateMipmaps:!1}),Y.map.texture.name=$.name+".shadowMap",Y.map.depthTexture=new Ji(r.x,r.y,an),Y.map.depthTexture.name=$.name+".shadowMapDepth",Y.map.depthTexture.format=Un,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=xt,Y.map.depthTexture.magFilter=xt}else $.isPointLight?(Y.map=new ch(r.x),Y.map.depthTexture=new cp(r.x,_n)):(Y.map=new Wt(r.x,r.y),Y.map.depthTexture=new Ji(r.x,r.y,_n)),Y.map.depthTexture.name=$.name+".shadowMap",Y.map.depthTexture.format=Un,this.type===xs?(Y.map.depthTexture.compareFunction=Z?ll:ol,Y.map.depthTexture.minFilter=at,Y.map.depthTexture.magFilter=at):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=xt,Y.map.depthTexture.magFilter=xt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);const ne=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();$.isPointLight!==!0&&Y.updateMatrices($,x);for(let re=0;re<ne;re++){const Pe=Y.getCamera(re);if($.isPointLight){const Re=Y.camera,qe=Y.matrix,Xe=$.distance||Re.far;Xe!==Re.far&&(Re.far=Xe,Re.updateProjectionMatrix()),fr.setFromMatrixPosition($.matrixWorld),Re.position.copy(fr),Ua.copy(Re.position),Ua.add(ax[re]),Re.up.copy(ox[re]),Re.lookAt(Ua),Re.updateMatrixWorld(),qe.makeTranslation(-fr.x,-fr.y,-fr.z),Kc.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Kc,Re.coordinateSystem,Re.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,re),i.clear();else{re===0&&(i.setRenderTarget(Y.map),i.clear());const Re=Y.getViewport(re);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),C.viewport(a)}n=Y.getFrustum(re),v(A,x,Pe,$,this.type)}Y.isPointLightShadow!==!0&&this.type===gr&&S(Y,x),Y.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(w,L,U)};function S(E,A){const x=e.update(y);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Wt(r.x,r.y,{format:ci,type:on}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,x,h,y,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,x,p,y,null)}function R(E,A,x,w){let L=null;const U=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)L=U;else if(L=x.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const C=L.uuid,I=A.uuid;let D=c[C];D===void 0&&(D={},c[C]=D);let N=D[I];N===void 0&&(N=L.clone(),D[I]=N,A.addEventListener("dispose",M)),L=N}if(L.visible=A.visible,L.wireframe=A.wireframe,w===gr?L.side=A.shadowSide!==null?A.shadowSide:A.side:L.side=A.shadowSide!==null?A.shadowSide:d[A.side],L.alphaMap=A.alphaMap,L.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,L.map=A.map,L.clipShadows=A.clipShadows,L.clippingPlanes=A.clippingPlanes,L.clipIntersection=A.clipIntersection,L.displacementMap=A.displacementMap,L.displacementScale=A.displacementScale,L.displacementBias=A.displacementBias,L.wireframeLinewidth=A.wireframeLinewidth,L.linewidth=A.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const C=i.properties.get(L);C.light=x}return L}function v(E,A,x,w,L){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===gr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const I=e.update(E),D=E.material;if(Array.isArray(D)){const N=I.groups;for(let $=0,Y=N.length;$<Y;$++){const se=N[$],Z=D[se.materialIndex];if(Z&&Z.visible){const ne=R(E,Z,w,L);E.onBeforeShadow(i,E,A,x,I,ne,se),i.renderBufferDirect(x,null,I,ne,E,se),E.onAfterShadow(i,E,A,x,I,ne,se)}}}else if(D.visible){const N=R(E,D,w,L);E.onBeforeShadow(i,E,A,x,I,N,null),i.renderBufferDirect(x,null,I,N,E,null),E.onAfterShadow(i,E,A,x,I,N,null)}}const C=E.children;for(let I=0,D=C.length;I<D;I++)v(C[I],A,x,w,L)}function M(E){E.target.removeEventListener("dispose",M);for(const x in c){const w=c[x],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function cx(i,e){function t(){let k=!1;const ce=new Ye;let ee=null;const me=new Ye(0,0,0,0);return{setMask:function(Me){ee!==Me&&!k&&(i.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){k=Me},setClear:function(Me,oe,De,Ce,ft){ft===!0&&(Me*=Ce,oe*=Ce,De*=Ce),ce.set(Me,oe,De,Ce),me.equals(ce)===!1&&(i.clearColor(Me,oe,De,Ce),me.copy(ce))},reset:function(){k=!1,ee=null,me.set(-1,0,0,0)}}}function n(){let k=!1,ce=!1,ee=null,me=null,Me=null;return{setReversed:function(oe){if(ce!==oe){const De=e.get("EXT_clip_control");oe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ce=oe;const Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return ce},setTest:function(oe){oe?X(i.DEPTH_TEST):le(i.DEPTH_TEST)},setMask:function(oe){ee!==oe&&!k&&(i.depthMask(oe),ee=oe)},setFunc:function(oe){if(ce&&(oe=mf[oe]),me!==oe){switch(oe){case Qa:i.depthFunc(i.NEVER);break;case ja:i.depthFunc(i.ALWAYS);break;case eo:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case to:i.depthFunc(i.EQUAL);break;case no:i.depthFunc(i.GEQUAL);break;case io:i.depthFunc(i.GREATER);break;case ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=oe}},setLocked:function(oe){k=oe},setClear:function(oe){Me!==oe&&(Me=oe,ce&&(oe=1-oe),i.clearDepth(oe))},reset:function(){k=!1,ee=null,me=null,Me=null,ce=!1}}}function r(){let k=!1,ce=null,ee=null,me=null,Me=null,oe=null,De=null,Ce=null,ft=null;return{setTest:function(rt){k||(rt?X(i.STENCIL_TEST):le(i.STENCIL_TEST))},setMask:function(rt){ce!==rt&&!k&&(i.stencilMask(rt),ce=rt)},setFunc:function(rt,Qt,ln){(ee!==rt||me!==Qt||Me!==ln)&&(i.stencilFunc(rt,Qt,ln),ee=rt,me=Qt,Me=ln)},setOp:function(rt,Qt,ln){(oe!==rt||De!==Qt||Ce!==ln)&&(i.stencilOp(rt,Qt,ln),oe=rt,De=Qt,Ce=ln)},setLocked:function(rt){k=rt},setClear:function(rt){ft!==rt&&(i.clearStencil(rt),ft=rt)},reset:function(){k=!1,ce=null,ee=null,me=null,Me=null,oe=null,De=null,Ce=null,ft=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h={},p=new WeakMap,g=[],y=null,m=!1,f=null,S=null,R=null,v=null,M=null,E=null,A=null,x=new Be(0,0,0),w=0,L=!1,U=null,C=null,I=null,D=null,N=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,se=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=se>=1):Z.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=se>=2);let ne=null,re={};const Pe=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),qe=new Ye().fromArray(Pe),Xe=new Ye().fromArray(Re);function Ge(k,ce,ee,me){const Me=new Uint8Array(4),oe=i.createTexture();i.bindTexture(k,oe),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<ee;De++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ce+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return oe}const H={};H[i.TEXTURE_2D]=Ge(i.TEXTURE_2D,i.TEXTURE_2D,1),H[i.TEXTURE_CUBE_MAP]=Ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[i.TEXTURE_2D_ARRAY]=Ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),H[i.TEXTURE_3D]=Ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),X(i.DEPTH_TEST),a.setFunc($i),Se(!1),Ie(Gl),X(i.CULL_FACE),ke(Ln);function X(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function le(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function ve(k,ce){return h[k]!==ce?(i.bindFramebuffer(k,ce),h[k]=ce,k===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ce),k===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function he(k,ce){let ee=g,me=!1;if(k){ee=p.get(ce),ee===void 0&&(ee=[],p.set(ce,ee));const Me=k.textures;if(ee.length!==Me.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,De=Me.length;oe<De;oe++)ee[oe]=i.COLOR_ATTACHMENT0+oe;ee.length=Me.length,me=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,me=!0);me&&i.drawBuffers(ee)}function ye(k){return y!==k?(i.useProgram(k),y=k,!0):!1}const it={[Bi]:i.FUNC_ADD,[Fd]:i.FUNC_SUBTRACT,[kd]:i.FUNC_REVERSE_SUBTRACT};it[Od]=i.MIN,it[Bd]=i.MAX;const Ne={[zd]:i.ZERO,[Hd]:i.ONE,[Gd]:i.SRC_COLOR,[Lu]:i.SRC_ALPHA,[$d]:i.SRC_ALPHA_SATURATE,[qd]:i.DST_COLOR,[Wd]:i.DST_ALPHA,[Vd]:i.ONE_MINUS_SRC_COLOR,[Du]:i.ONE_MINUS_SRC_ALPHA,[Yd]:i.ONE_MINUS_DST_COLOR,[Xd]:i.ONE_MINUS_DST_ALPHA,[Kd]:i.CONSTANT_COLOR,[Zd]:i.ONE_MINUS_CONSTANT_COLOR,[Jd]:i.CONSTANT_ALPHA,[Qd]:i.ONE_MINUS_CONSTANT_ALPHA};function ke(k,ce,ee,me,Me,oe,De,Ce,ft,rt){if(k===Ln){m===!0&&(le(i.BLEND),m=!1);return}if(m===!1&&(X(i.BLEND),m=!0),k!==Nd){if(k!==f||rt!==L){if((S!==Bi||M!==Bi)&&(i.blendEquation(i.FUNC_ADD),S=Bi,M=Bi),rt)switch(k){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFunc(i.ONE,i.ONE);break;case Vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:je("WebGLState: Invalid blending: ",k);break}else switch(k){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vl:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",k);break}R=null,v=null,E=null,A=null,x.set(0,0,0),w=0,f=k,L=rt}return}Me=Me||ce,oe=oe||ee,De=De||me,(ce!==S||Me!==M)&&(i.blendEquationSeparate(it[ce],it[Me]),S=ce,M=Me),(ee!==R||me!==v||oe!==E||De!==A)&&(i.blendFuncSeparate(Ne[ee],Ne[me],Ne[oe],Ne[De]),R=ee,v=me,E=oe,A=De),(Ce.equals(x)===!1||ft!==w)&&(i.blendColor(Ce.r,Ce.g,Ce.b,ft),x.copy(Ce),w=ft),f=k,L=!1}function Fe(k,ce){k.side===Kt?le(i.CULL_FACE):X(i.CULL_FACE);let ee=k.side===Ht;ce&&(ee=!ee),Se(ee),k.blending===Gi&&k.transparent===!1?ke(Ln):ke(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const me=k.stencilWrite;o.setTest(me),me&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Qe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Se(k){U!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),U=k)}function Ie(k){k!==Dd?(X(i.CULL_FACE),k!==C&&(k===Gl?i.cullFace(i.BACK):k===Id?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):le(i.CULL_FACE),C=k}function et(k){k!==I&&(Y&&i.lineWidth(k),I=k)}function Qe(k,ce,ee){k?(X(i.POLYGON_OFFSET_FILL),(D!==ce||N!==ee)&&(D=ce,N=ee,a.getReversed()&&(ce=-ce),i.polygonOffset(ce,ee))):le(i.POLYGON_OFFSET_FILL)}function He(k){k?X(i.SCISSOR_TEST):le(i.SCISSOR_TEST)}function mt(k){k===void 0&&(k=i.TEXTURE0+$-1),ne!==k&&(i.activeTexture(k),ne=k)}function O(k,ce,ee){ee===void 0&&(ne===null?ee=i.TEXTURE0+$-1:ee=ne);let me=re[ee];me===void 0&&(me={type:void 0,texture:void 0},re[ee]=me),(me.type!==k||me.texture!==ce)&&(ne!==ee&&(i.activeTexture(ee),ne=ee),i.bindTexture(k,ce||H[k]),me.type=k,me.texture=ce)}function Tt(){const k=re[ne];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function nt(){try{i.compressedTexImage2D(...arguments)}catch(k){je("WebGLState:",k)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(k){je("WebGLState:",k)}}function _(){try{i.texSubImage2D(...arguments)}catch(k){je("WebGLState:",k)}}function z(){try{i.texSubImage3D(...arguments)}catch(k){je("WebGLState:",k)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(k){je("WebGLState:",k)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(k){je("WebGLState:",k)}}function ue(){try{i.texStorage2D(...arguments)}catch(k){je("WebGLState:",k)}}function fe(){try{i.texStorage3D(...arguments)}catch(k){je("WebGLState:",k)}}function j(){try{i.texImage2D(...arguments)}catch(k){je("WebGLState:",k)}}function T(){try{i.texImage3D(...arguments)}catch(k){je("WebGLState:",k)}}function G(k){return d[k]!==void 0?d[k]:i.getParameter(k)}function J(k,ce){d[k]!==ce&&(i.pixelStorei(k,ce),d[k]=ce)}function te(k){qe.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),qe.copy(k))}function ie(k){Xe.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Xe.copy(k))}function ae(k,ce){let ee=c.get(ce);ee===void 0&&(ee=new WeakMap,c.set(ce,ee));let me=ee.get(k);me===void 0&&(me=i.getUniformBlockIndex(ce,k.name),ee.set(k,me))}function pe(k,ce){const me=c.get(ce).get(k);l.get(ce)!==me&&(i.uniformBlockBinding(ce,me,k.__bindingPointIndex),l.set(ce,me))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},h={},p=new WeakMap,g=[],y=null,m=!1,f=null,S=null,R=null,v=null,M=null,E=null,A=null,x=new Be(0,0,0),w=0,L=!1,U=null,C=null,I=null,D=null,N=null,qe.set(0,0,i.canvas.width,i.canvas.height),Xe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:X,disable:le,bindFramebuffer:ve,drawBuffers:he,useProgram:ye,setBlending:ke,setMaterial:Fe,setFlipSided:Se,setCullFace:Ie,setLineWidth:et,setPolygonOffset:Qe,setScissorTest:He,activeTexture:mt,bindTexture:O,unbindTexture:Tt,compressedTexImage2D:nt,compressedTexImage3D:P,texImage2D:j,texImage3D:T,pixelStorei:J,getParameter:G,updateUBOMapping:ae,uniformBlockBinding:pe,texStorage2D:ue,texStorage3D:fe,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:te,viewport:ie,reset:Ue}}function ux(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ee,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,_){return g?new OffscreenCanvas(P,_):Is("canvas")}function m(P,_,z){let q=1;const Q=nt(P);if((Q.width>z||Q.height>z)&&(q=z/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ue=Math.floor(q*Q.width),fe=Math.floor(q*Q.height);h===void 0&&(h=y(ue,fe));const j=_?y(ue,fe):h;return j.width=ue,j.height=fe,j.getContext("2d").drawImage(P,0,0,ue,fe),Oe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ue+"x"+fe+")."),j}else return"data"in P&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function f(P){return P.generateMipmaps}function S(P){i.generateMipmap(P)}function R(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,_,z,q,Q,ue=!1){if(P!==null){if(i[P]!==void 0)return i[P];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let fe;q&&(fe=e.get("EXT_texture_norm16"),fe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===i.RED&&(z===i.FLOAT&&(j=i.R32F),z===i.HALF_FLOAT&&(j=i.R16F),z===i.UNSIGNED_BYTE&&(j=i.R8),z===i.UNSIGNED_SHORT&&fe&&(j=fe.R16_EXT),z===i.SHORT&&fe&&(j=fe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.R8UI),z===i.UNSIGNED_SHORT&&(j=i.R16UI),z===i.UNSIGNED_INT&&(j=i.R32UI),z===i.BYTE&&(j=i.R8I),z===i.SHORT&&(j=i.R16I),z===i.INT&&(j=i.R32I)),_===i.RG&&(z===i.FLOAT&&(j=i.RG32F),z===i.HALF_FLOAT&&(j=i.RG16F),z===i.UNSIGNED_BYTE&&(j=i.RG8),z===i.UNSIGNED_SHORT&&fe&&(j=fe.RG16_EXT),z===i.SHORT&&fe&&(j=fe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RG8UI),z===i.UNSIGNED_SHORT&&(j=i.RG16UI),z===i.UNSIGNED_INT&&(j=i.RG32UI),z===i.BYTE&&(j=i.RG8I),z===i.SHORT&&(j=i.RG16I),z===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGB8UI),z===i.UNSIGNED_SHORT&&(j=i.RGB16UI),z===i.UNSIGNED_INT&&(j=i.RGB32UI),z===i.BYTE&&(j=i.RGB8I),z===i.SHORT&&(j=i.RGB16I),z===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),z===i.UNSIGNED_INT&&(j=i.RGBA32UI),z===i.BYTE&&(j=i.RGBA8I),z===i.SHORT&&(j=i.RGBA16I),z===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(z===i.UNSIGNED_SHORT&&fe&&(j=fe.RGB16_EXT),z===i.SHORT&&fe&&(j=fe.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){const T=ue?Ds:Je.getTransfer(Q);z===i.FLOAT&&(j=i.RGBA32F),z===i.HALF_FLOAT&&(j=i.RGBA16F),z===i.UNSIGNED_BYTE&&(j=T===lt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&fe&&(j=fe.RGBA16_EXT),z===i.SHORT&&fe&&(j=fe.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(P,_){let z;return P?_===null||_===_n||_===Zi?z=i.DEPTH24_STENCIL8:_===an?z=i.DEPTH32F_STENCIL8:_===Mr&&(z=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===_n||_===Zi?z=i.DEPTH_COMPONENT24:_===an?z=i.DEPTH_COMPONENT32F:_===Mr&&(z=i.DEPTH_COMPONENT16),z}function E(P,_){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==xt&&P.minFilter!==at?Math.log2(Math.max(_.width,_.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?_.mipmaps.length:1}function A(P){const _=P.target;_.removeEventListener("dispose",A),w(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(P){const _=P.target;_.removeEventListener("dispose",x),U(_)}function w(P){const _=n.get(P);if(_.__webglInit===void 0)return;const z=P.source,q=p.get(z);if(q){const Q=q[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&L(P),Object.keys(q).length===0&&p.delete(z)}n.remove(P)}function L(P){const _=n.get(P);i.deleteTexture(_.__webglTexture);const z=P.source,q=p.get(z);delete q[_.__cacheKey],a.memory.textures--}function U(P){const _=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let Q=0;Q<_.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=P.textures;for(let q=0,Q=z.length;q<Q;q++){const ue=n.get(z[q]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(P)}let C=0;function I(){C=0}function D(){return C}function N(P){C=P}function $(){const P=C;return P>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),C+=1,P}function Y(P){const _=[];return _.push(P.wrapS),_.push(P.wrapT),_.push(P.wrapR||0),_.push(P.magFilter),_.push(P.minFilter),_.push(P.anisotropy),_.push(P.internalFormat),_.push(P.format),_.push(P.type),_.push(P.generateMipmaps),_.push(P.premultiplyAlpha),_.push(P.flipY),_.push(P.unpackAlignment),_.push(P.colorSpace),_.join()}function se(P,_){const z=n.get(P);if(P.isVideoTexture&&O(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const q=P.image;if(q===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{le(z,P,_);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+_)}function Z(P,_){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){le(z,P,_);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+_)}function ne(P,_){const z=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){le(z,P,_);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+_)}function re(P,_){const z=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){ve(z,P,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+_)}const Pe={[Cs]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[so]:i.MIRRORED_REPEAT},Re={[xt]:i.NEAREST,[tf]:i.NEAREST_MIPMAP_NEAREST,[Ur]:i.NEAREST_MIPMAP_LINEAR,[at]:i.LINEAR,[ra]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},qe={[af]:i.NEVER,[hf]:i.ALWAYS,[of]:i.LESS,[ol]:i.LEQUAL,[lf]:i.EQUAL,[ll]:i.GEQUAL,[cf]:i.GREATER,[uf]:i.NOTEQUAL};function Xe(P,_){if(_.type===an&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===at||_.magFilter===ra||_.magFilter===Ur||_.magFilter===si||_.minFilter===at||_.minFilter===ra||_.minFilter===Ur||_.minFilter===si)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Pe[_.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Pe[_.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Pe[_.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Re[_.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Re[_.minFilter]),_.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,qe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===xt||_.minFilter!==Ur&&_.minFilter!==si||_.type===an&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ge(P,_){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,_.addEventListener("dispose",A));const q=_.source;let Q=p.get(q);Q===void 0&&(Q={},p.set(q,Q));const ue=Y(_);if(ue!==P.__cacheKey){Q[ue]===void 0&&(Q[ue]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[ue].usedTimes++;const fe=Q[P.__cacheKey];fe!==void 0&&(Q[P.__cacheKey].usedTimes--,fe.usedTimes===0&&L(_)),P.__cacheKey=ue,P.__webglTexture=Q[ue].texture}return z}function H(P,_,z){return Math.floor(Math.floor(P/z)/_)}function X(P,_,z,q){const ue=P.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,z,q,_.data);else{ue.sort((J,te)=>J.start-te.start);let fe=0;for(let J=1;J<ue.length;J++){const te=ue[fe],ie=ue[J],ae=te.start+te.count,pe=H(ie.start,_.width,4),Ue=H(te.start,_.width,4);ie.start<=ae+1&&pe===Ue&&H(ie.start+ie.count-1,_.width,4)===pe?te.count=Math.max(te.count,ie.start+ie.count-te.start):(++fe,ue[fe]=ie)}ue.length=fe+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),T=t.getParameter(i.UNPACK_SKIP_PIXELS),G=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let J=0,te=ue.length;J<te;J++){const ie=ue[J],ae=Math.floor(ie.start/4),pe=Math.ceil(ie.count/4),Ue=ae%_.width,k=Math.floor(ae/_.width),ce=pe,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Ue,k,ce,ee,z,q,_.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,T),t.pixelStorei(i.UNPACK_SKIP_ROWS,G)}}function le(P,_,z){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);const Q=Ge(P,_),ue=_.source;t.bindTexture(q,P.__webglTexture,i.TEXTURE0+z);const fe=n.get(ue);if(ue.version!==fe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ee=Je.getPrimaries(Je.workingColorSpace),me=_.colorSpace===fn?null:Je.getPrimaries(_.colorSpace),Me=_.colorSpace===fn||ee===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let T=m(_.image,!1,r.maxTextureSize);T=Tt(_,T);const G=s.convert(_.format,_.colorSpace),J=s.convert(_.type);let te=v(_.internalFormat,G,J,_.normalized,_.colorSpace,_.isVideoTexture);Xe(q,_);let ie;const ae=_.mipmaps,pe=_.isVideoTexture!==!0,Ue=fe.__version===void 0||Q===!0,k=ue.dataReady,ce=E(_,T);if(_.isDepthTexture)te=M(_.format===qn,_.type),Ue&&(pe?t.texStorage2D(i.TEXTURE_2D,1,te,T.width,T.height):t.texImage2D(i.TEXTURE_2D,0,te,T.width,T.height,0,G,J,null));else if(_.isDataTexture)if(ae.length>0){pe&&Ue&&t.texStorage2D(i.TEXTURE_2D,ce,te,ae[0].width,ae[0].height);for(let ee=0,me=ae.length;ee<me;ee++)ie=ae[ee],pe?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ie.width,ie.height,G,J,ie.data):t.texImage2D(i.TEXTURE_2D,ee,te,ie.width,ie.height,0,G,J,ie.data);_.generateMipmaps=!1}else pe?(Ue&&t.texStorage2D(i.TEXTURE_2D,ce,te,T.width,T.height),k&&X(_,T,G,J)):t.texImage2D(i.TEXTURE_2D,0,te,T.width,T.height,0,G,J,T.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){pe&&Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,te,ae[0].width,ae[0].height,T.depth);for(let ee=0,me=ae.length;ee<me;ee++)if(ie=ae[ee],_.format!==Jt)if(G!==null)if(pe){if(k)if(_.layerUpdates.size>0){const Me=Ac(ie.width,ie.height,_.format,_.type);for(const oe of _.layerUpdates){const De=ie.data.subarray(oe*Me/ie.data.BYTES_PER_ELEMENT,(oe+1)*Me/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,oe,ie.width,ie.height,1,G,De)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ie.width,ie.height,T.depth,G,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,te,ie.width,ie.height,T.depth,0,ie.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pe?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ie.width,ie.height,T.depth,G,J,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,te,ie.width,ie.height,T.depth,0,G,J,ie.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{pe&&Ue&&t.texStorage2D(i.TEXTURE_2D,ce,te,ae[0].width,ae[0].height);for(let ee=0,me=ae.length;ee<me;ee++)ie=ae[ee],_.format!==Jt?G!==null?pe?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ie.width,ie.height,G,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,te,ie.width,ie.height,0,ie.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pe?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ie.width,ie.height,G,J,ie.data):t.texImage2D(i.TEXTURE_2D,ee,te,ie.width,ie.height,0,G,J,ie.data)}else if(_.isDataArrayTexture)if(pe){if(Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,te,T.width,T.height,T.depth),k)if(_.layerUpdates.size>0){const ee=Ac(T.width,T.height,_.format,_.type);for(const me of _.layerUpdates){const Me=T.data.subarray(me*ee/T.data.BYTES_PER_ELEMENT,(me+1)*ee/T.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,T.width,T.height,1,G,J,Me)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,T.width,T.height,T.depth,G,J,T.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,te,T.width,T.height,T.depth,0,G,J,T.data);else if(_.isData3DTexture)pe?(Ue&&t.texStorage3D(i.TEXTURE_3D,ce,te,T.width,T.height,T.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,T.width,T.height,T.depth,G,J,T.data)):t.texImage3D(i.TEXTURE_3D,0,te,T.width,T.height,T.depth,0,G,J,T.data);else if(_.isFramebufferTexture){if(Ue)if(pe)t.texStorage2D(i.TEXTURE_2D,ce,te,T.width,T.height);else{let ee=T.width,me=T.height;for(let Me=0;Me<ce;Me++)t.texImage2D(i.TEXTURE_2D,Me,te,ee,me,0,G,J,null),ee>>=1,me>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),T.parentNode!==ee){ee.appendChild(T),d.add(_),ee.onpaint=me=>{const Me=me.changedElements;for(const oe of d)Me.includes(oe.image)&&(oe.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,T);else{const Me=i.RGBA,oe=i.RGBA,De=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,oe,De,T)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ae.length>0){if(pe&&Ue){const ee=nt(ae[0]);t.texStorage2D(i.TEXTURE_2D,ce,te,ee.width,ee.height)}for(let ee=0,me=ae.length;ee<me;ee++)ie=ae[ee],pe?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,G,J,ie):t.texImage2D(i.TEXTURE_2D,ee,te,G,J,ie);_.generateMipmaps=!1}else if(pe){if(Ue){const ee=nt(T);t.texStorage2D(i.TEXTURE_2D,ce,te,ee.width,ee.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,G,J,T)}else t.texImage2D(i.TEXTURE_2D,0,te,G,J,T);f(_)&&S(q),fe.__version=ue.version,_.onUpdate&&_.onUpdate(_)}P.__version=_.version}function ve(P,_,z){if(_.image.length!==6)return;const q=Ge(P,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+z);const ue=n.get(Q);if(Q.version!==ue.__version||q===!0){t.activeTexture(i.TEXTURE0+z);const fe=Je.getPrimaries(Je.workingColorSpace),j=_.colorSpace===fn?null:Je.getPrimaries(_.colorSpace),T=_.colorSpace===fn||fe===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,T);const G=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,te=[];for(let oe=0;oe<6;oe++)!G&&!J?te[oe]=m(_.image[oe],!0,r.maxCubemapSize):te[oe]=J?_.image[oe].image:_.image[oe],te[oe]=Tt(_,te[oe]);const ie=te[0],ae=s.convert(_.format,_.colorSpace),pe=s.convert(_.type),Ue=v(_.internalFormat,ae,pe,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,ce=ue.__version===void 0||q===!0,ee=Q.dataReady;let me=E(_,ie);Xe(i.TEXTURE_CUBE_MAP,_);let Me;if(G){k&&ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ue,ie.width,ie.height);for(let oe=0;oe<6;oe++){Me=te[oe].mipmaps;for(let De=0;De<Me.length;De++){const Ce=Me[De];_.format!==Jt?ae!==null?k?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De,0,0,Ce.width,Ce.height,ae,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De,Ue,Ce.width,Ce.height,0,Ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De,0,0,Ce.width,Ce.height,ae,pe,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De,Ue,Ce.width,Ce.height,0,ae,pe,Ce.data)}}}else{if(Me=_.mipmaps,k&&ce){Me.length>0&&me++;const oe=nt(te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ue,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(J){k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,te[oe].width,te[oe].height,ae,pe,te[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ue,te[oe].width,te[oe].height,0,ae,pe,te[oe].data);for(let De=0;De<Me.length;De++){const ft=Me[De].image[oe].image;k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De+1,0,0,ft.width,ft.height,ae,pe,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De+1,Ue,ft.width,ft.height,0,ae,pe,ft.data)}}else{k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ae,pe,te[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ue,ae,pe,te[oe]);for(let De=0;De<Me.length;De++){const Ce=Me[De];k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De+1,0,0,ae,pe,Ce.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,De+1,Ue,ae,pe,Ce.image[oe])}}}f(_)&&S(i.TEXTURE_CUBE_MAP),ue.__version=Q.version,_.onUpdate&&_.onUpdate(_)}P.__version=_.version}function he(P,_,z,q,Q,ue){const fe=s.convert(z.format,z.colorSpace),j=s.convert(z.type),T=v(z.internalFormat,fe,j,z.normalized,z.colorSpace),G=n.get(_),J=n.get(z);if(J.__renderTarget=_,!G.__hasExternalTextures){const te=Math.max(1,_.width>>ue),ie=Math.max(1,_.height>>ue);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,ue,T,te,ie,_.depth,0,fe,j,null):t.texImage2D(Q,ue,T,te,ie,0,fe,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,J.__webglTexture,0,He(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,J.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(P,_,z){if(i.bindRenderbuffer(i.RENDERBUFFER,P),_.depthBuffer){const q=_.depthTexture,Q=q&&q.isDepthTexture?q.type:null,ue=M(_.stencilBuffer,Q),fe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(_),ue,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(_),ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,P)}else{const q=_.textures;for(let Q=0;Q<q.length;Q++){const ue=q[Q],fe=s.convert(ue.format,ue.colorSpace),j=s.convert(ue.type),T=v(ue.internalFormat,fe,j,ue.normalized,ue.colorSpace);mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(_),T,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(_),T,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,T,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function it(P,_,z){const q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_.depthTexture);const G=s.convert(_.depthTexture.format),J=s.convert(_.depthTexture.type);let te;_.depthTexture.format===Un?te=i.DEPTH_COMPONENT24:_.depthTexture.format===qn&&(te=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,te,_.width,_.height,0,G,J,null)}}else se(_.depthTexture,0);const ue=Q.__webglTexture,fe=He(_),j=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,T=_.depthTexture.format===qn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Un)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,T,j,ue,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,T,j,ue,0);else if(_.depthTexture.format===qn)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,T,j,ue,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,T,j,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(P){const _=n.get(P),z=P.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==P.depthTexture){const q=P.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=q}if(P.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)it(_.__webglFramebuffer[q],P,q);else{const q=P.texture.mipmaps;q&&q.length>0?it(_.__webglFramebuffer[0],P,0):it(_.__webglFramebuffer,P,0)}else if(z){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),ye(_.__webglDepthbuffer[q],P,!1);else{const Q=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ue)}}else{const q=P.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ye(_.__webglDepthbuffer,P,!1);else{const Q=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(P,_,z){const q=n.get(P);_!==void 0&&he(q.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ne(P)}function Fe(P){const _=P.texture,z=n.get(P),q=n.get(_);P.addEventListener("dispose",x);const Q=P.textures,ue=P.isWebGLCubeRenderTarget===!0,fe=Q.length>1;if(fe||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),ue){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let T=0;T<_.mipmaps.length;T++)z.__webglFramebuffer[j][T]=i.createFramebuffer()}else z.__webglFramebuffer[j]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)z.__webglFramebuffer[j]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(fe)for(let j=0,T=Q.length;j<T;j++){const G=n.get(Q[j]);G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&mt(P)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<Q.length;j++){const T=Q[j];z.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[j]);const G=s.convert(T.format,T.colorSpace),J=s.convert(T.type),te=v(T.internalFormat,G,J,T.normalized,T.colorSpace,P.isXRRenderTarget===!0),ie=He(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,te,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,z.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let T=0;T<_.mipmaps.length;T++)he(z.__webglFramebuffer[j][T],P,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,T);else he(z.__webglFramebuffer[j],P,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);f(_)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let j=0,T=Q.length;j<T;j++){const G=Q[j],J=n.get(G);let te=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(te=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),Xe(te,G),he(z.__webglFramebuffer,P,G,i.COLOR_ATTACHMENT0+j,te,0),f(G)&&S(te)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(j=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,q.__webglTexture),Xe(j,_),_.mipmaps&&_.mipmaps.length>0)for(let T=0;T<_.mipmaps.length;T++)he(z.__webglFramebuffer[T],P,_,i.COLOR_ATTACHMENT0,j,T);else he(z.__webglFramebuffer,P,_,i.COLOR_ATTACHMENT0,j,0);f(_)&&S(j),t.unbindTexture()}P.depthBuffer&&Ne(P)}function Se(P){const _=P.textures;for(let z=0,q=_.length;z<q;z++){const Q=_[z];if(f(Q)){const ue=R(P),fe=n.get(Q).__webglTexture;t.bindTexture(ue,fe),S(ue),t.unbindTexture()}}}const Ie=[],et=[];function Qe(P){if(P.samples>0){if(mt(P)===!1){const _=P.textures,z=P.width,q=P.height;let Q=i.COLOR_BUFFER_BIT;const ue=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(P),j=_.length>1;if(j)for(let G=0;G<_.length;G++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const T=P.texture.mipmaps;T&&T.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let G=0;G<_.length;G++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[G]);const J=n.get(_[G]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,Q,i.NEAREST),l===!0&&(Ie.length=0,et.length=0,Ie.push(i.COLOR_ATTACHMENT0+G),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Ie.push(ue),et.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,et)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let G=0;G<_.length;G++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.RENDERBUFFER,fe.__webglColorRenderbuffer[G]);const J=n.get(_[G]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const _=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function He(P){return Math.min(r.maxSamples,P.samples)}function mt(P){const _=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function O(P){const _=a.render.frame;u.get(P)!==_&&(u.set(P,_),P.update())}function Tt(P,_){const z=P.colorSpace,q=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==br&&z!==fn&&(Je.getTransfer(z)===lt?(q!==Jt||Q!==zt)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",z)),_}function nt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=I,this.getTextureUnits=D,this.setTextureUnits=N,this.setTexture2D=se,this.setTexture2DArray=Z,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=ke,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=he,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function hx(i,e){function t(n,r=fn){let s;const a=Je.getTransfer(r);if(n===zt)return i.UNSIGNED_BYTE;if(n===nl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===il)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gu)return i.BYTE;if(n===Vu)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===tl)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===on)return i.HALF_FLOAT;if(n===qu)return i.ALPHA;if(n===Yu)return i.RGB;if(n===Jt)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===qn)return i.DEPTH_STENCIL;if(n===Rr)return i.RED;if(n===rl)return i.RED_INTEGER;if(n===ci)return i.RG;if(n===sl)return i.RG_INTEGER;if(n===al)return i.RGBA_INTEGER;if(n===_s||n===ys||n===Ss||n===Ms)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===_s)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===_s)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ys)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ss)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ms)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ao||n===oo||n===lo||n===co)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ao)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===co)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===uo||n===ho||n===fo||n===po||n===mo||n===Ps||n===go)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===uo||n===ho)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===fo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===po)return s.COMPRESSED_R11_EAC;if(n===mo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ps)return s.COMPRESSED_RG11_EAC;if(n===go)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===vo||n===xo||n===_o||n===yo||n===So||n===Mo||n===bo||n===wo||n===Eo||n===To||n===Ao||n===Ro||n===Co||n===Po)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_o)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===So)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===To)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ro)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Co)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Po)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lo||n===Do||n===Io)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Lo)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Do)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Io)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uo||n===No||n===Ls||n===Fo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Uo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===No)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ls)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const dx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fx=`
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

}`;class px{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new nh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wt({vertexShader:dx,fragmentShader:fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new Pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mx extends hi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const y=typeof XRWebGLBinding<"u",m=new px,f={},S=t.getContextAttributes();let R=null,v=null;const M=[],E=[],A=new Ee;let x=null,w=null;const L=new $t;L.viewport=new Ye;const U=new $t;U.viewport=new Ye;const C=[L,U],I=new Mp;let D=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let X=M[H];return X===void 0&&(X=new ha,M[H]=X),X.getTargetRaySpace()},this.getControllerGrip=function(H){let X=M[H];return X===void 0&&(X=new ha,M[H]=X),X.getGripSpace()},this.getHand=function(H){let X=M[H];return X===void 0&&(X=new ha,M[H]=X),X.getHandSpace()};function $(H){const X=E.indexOf(H.inputSource);if(X===-1)return;const le=M[X];le!==void 0&&(le.update(H.inputSource,H.frame,c||a),le.dispatchEvent({type:H.type,data:H.inputSource}))}function Y(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",se);for(let H=0;H<M.length;H++){const X=E[H];X!==null&&(E[H]=null,M[H].disconnect(X))}D=null,N=null,m.reset();for(const H in f)delete f[H];if(e.setRenderTarget(R),p=null,h=null,d=null,r=null,v=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),w!==null){const H=w.camera;H.fov=w.fov,H.zoom=w.zoom,H.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",se),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,ve=null,he=null;S.depth&&(he=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=S.stencil?qn:Un,ve=S.stencil?Zi:_n);const ye={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Wt(h.textureWidth,h.textureHeight,{format:Jt,type:zt,depthTexture:new Ji(h.textureWidth,h.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const le={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,le),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Wt(p.framebufferWidth,p.framebufferHeight,{format:Jt,type:zt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ge.setContext(r),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(H){for(let X=0;X<H.removed.length;X++){const le=H.removed[X],ve=E.indexOf(le);ve>=0&&(E[ve]=null,M[ve].disconnect(le))}for(let X=0;X<H.added.length;X++){const le=H.added[X];let ve=E.indexOf(le);if(ve===-1){for(let ye=0;ye<M.length;ye++)if(ye>=E.length){E.push(le),ve=ye;break}else if(E[ye]===null){E[ye]=le,ve=ye;break}if(ve===-1)break}const he=M[ve];he&&he.connect(le)}}const Z=new B,ne=new B;function re(H,X,le){Z.setFromMatrixPosition(X.matrixWorld),ne.setFromMatrixPosition(le.matrixWorld);const ve=Z.distanceTo(ne),he=X.projectionMatrix.elements,ye=le.projectionMatrix.elements,it=he[14]/(he[10]-1),Ne=he[14]/(he[10]+1),ke=(he[9]+1)/he[5],Fe=(he[9]-1)/he[5],Se=(he[8]-1)/he[0],Ie=(ye[8]+1)/ye[0],et=it*Se,Qe=it*Ie,He=ve/(-Se+Ie),mt=He*-Se;if(X.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(mt),H.translateZ(He),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),he[10]===-1)H.projectionMatrix.copy(X.projectionMatrix),H.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const O=it+He,Tt=Ne+He,nt=et-mt,P=Qe+(ve-mt),_=ke*Ne/Tt*O,z=Fe*Ne/Tt*O;H.projectionMatrix.makePerspective(nt,P,_,z,O,Tt),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function Pe(H,X){X===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(X.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let X=H.near,le=H.far;m.texture!==null&&(m.depthNear>0&&(X=m.depthNear),m.depthFar>0&&(le=m.depthFar)),I.near=U.near=L.near=X,I.far=U.far=L.far=le,(D!==I.near||N!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),D=I.near,N=I.far),I.layers.mask=H.layers.mask|6,L.layers.mask=I.layers.mask&-5,U.layers.mask=I.layers.mask&-3;const ve=H.parent,he=I.cameras;Pe(I,ve);for(let ye=0;ye<he.length;ye++)Pe(he[ye],ve);he.length===2?re(I,L,U):I.projectionMatrix.copy(L.projectionMatrix),w===null&&H.isPerspectiveCamera&&(w={camera:H,fov:H.fov,zoom:H.zoom}),Re(H,I,ve)};function Re(H,X,le){le===null?H.matrix.copy(X.matrixWorld):(H.matrix.copy(le.matrixWorld),H.matrix.invert(),H.matrix.multiply(X.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(X.projectionMatrix),H.projectionMatrixInverse.copy(X.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Er*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(H){return f[H]};let qe=null;function Xe(H,X){if(u=X.getViewerPose(c||a),g=X,u!==null){const le=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ve=!1;le.length!==I.cameras.length&&(I.cameras.length=0,ve=!0);for(let Ne=0;Ne<le.length;Ne++){const ke=le[Ne];let Fe=null;if(p!==null)Fe=p.getViewport(ke);else{const Ie=d.getViewSubImage(h,ke);Fe=Ie.viewport,Ne===0&&(e.setRenderTargetTextures(v,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(v))}let Se=C[Ne];Se===void 0&&(Se=new $t,Se.layers.enable(Ne),Se.viewport=new Ye,C[Ne]=Se),Se.matrix.fromArray(ke.transform.matrix),Se.matrix.decompose(Se.position,Se.quaternion,Se.scale),Se.projectionMatrix.fromArray(ke.projectionMatrix),Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(),Se.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Ne===0&&(I.matrix.copy(Se.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),ve===!0&&I.cameras.push(Se)}const he=r.enabledFeatures;if(he&&he.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const Ne=d.getDepthInformation(le[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,r.renderState)}if(he&&he.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Ne=0;Ne<le.length;Ne++){const ke=le[Ne].camera;if(ke){let Fe=f[ke];Fe||(Fe=new nh,f[ke]=Fe);const Se=d.getCameraImage(ke);Fe.sourceTexture=Se}}}}for(let le=0;le<M.length;le++){const ve=E[le],he=M[le];ve!==null&&he!==void 0&&he.update(ve,X,c||a)}qe&&qe(H,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}const Ge=new oh;Ge.setAnimationLoop(Xe),this.setAnimationLoop=function(H){qe=H},this.dispose=function(){}}}const gx=new ot,ph=new ze;ph.set(-1,0,0,0,1,0,0,0,1);function vx(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ih(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,R,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,R):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ht&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ht&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),R=S.envMap,v=S.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(gx.makeRotationFromEuler(v)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ph),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,R){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=R*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ht&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function xx(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const E=M.program;n.uniformBlockBinding(v,E)}function c(v,M){let E=r[v.id];E===void 0&&(m(v),E=u(v),r[v.id]=E,v.addEventListener("dispose",S));const A=M.program;n.updateUBOMapping(v,A);const x=e.render.frame;s[v.id]!==x&&(h(v),s[v.id]=x)}function u(v){const M=d();v.__bindingPointIndex=M;const E=i.createBuffer(),A=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,E),E}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const M=r[v.id],E=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,w=E.length;x<w;x++){const L=E[x];if(Array.isArray(L))for(let U=0,C=L.length;U<C;U++)p(L[U],x,U,A);else p(L,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,M,E,A){if(y(v,M,E,A)===!0){const x=v.__offset,w=v.value;if(Array.isArray(w)){let L=0;for(let U=0;U<w.length;U++){const C=w[U],I=f(C);g(C,v.__data,L),typeof C!="number"&&typeof C!="boolean"&&!C.isMatrix3&&!ArrayBuffer.isView(C)&&(L+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function g(v,M,E){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,E)}function y(v,M,E,A){const x=v.value,w=M+"_"+E;if(A[w]===void 0)return typeof x=="number"||typeof x=="boolean"?A[w]=x:ArrayBuffer.isView(x)?A[w]=x.slice():A[w]=x.clone(),!0;{const L=A[w];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return A[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function m(v){const M=v.uniforms;let E=0;const A=16;for(let w=0,L=M.length;w<L;w++){const U=Array.isArray(M[w])?M[w]:[M[w]];for(let C=0,I=U.length;C<I;C++){const D=U[C],N=Array.isArray(D.value)?D.value:[D.value];for(let $=0,Y=N.length;$<Y;$++){const se=N[$],Z=f(se),ne=E%A,re=ne%Z.boundary,Pe=ne+re;E+=re,Pe!==0&&A-Pe<Z.storage&&(E+=A-Pe),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=Z.storage}}}const x=E%A;return x>0&&(E+=A-x),v.__size=E,v.__cache={},this}function f(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",v),M}function S(v){const M=v.target;M.removeEventListener("dispose",S);const E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function R(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:R}}const _x=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hn=null;function yx(){return hn===null&&(hn=new mi(_x,16,16,ci,on),hn.name="DFG_LUT",hn.minFilter=at,hn.magFilter=at,hn.wrapS=Cn,hn.wrapT=Cn,hn.generateMipmaps=!1,hn.needsUpdate=!0),hn}class Sx{constructor(e={}){const{canvas:t=ff(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=zt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=p,m=new Set([al,sl,rl]),f=new Set([zt,_n,Mr,Zi,nl,il]),S=new Uint32Array(4),R=new Int32Array(4),v=new B;let M=null,E=null;const A=[],x=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let U=!1,C=null,I=null,D=null,N=null;this._outputColorSpace=Yt;let $=0,Y=0,se=null,Z=-1,ne=null;const re=new Ye,Pe=new Ye;let Re=null;const qe=new Be(0);let Xe=0,Ge=t.width,H=t.height,X=1,le=null,ve=null;const he=new Ye(0,0,Ge,H),ye=new Ye(0,0,Ge,H);let it=!1;const Ne=new dl;let ke=!1,Fe=!1;const Se=new ot,Ie=new B,et=new Ye,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function mt(){return se===null?X:1}let O=n;function Tt(b,F){return t.getContext(b,F)}let nt,P,_,z,q,Q,ue,fe,j,T,G,J,te,ie,ae,pe,Ue,k,ce,ee,me,Me,oe;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${el}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),O===null){const F="webgl2";if(O=Tt(F,b),O===null)throw Tt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(b){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),je("WebGLRenderer: "+b.message),b}function De(){nt=new y0(O),nt.init(),me=new hx(O,nt),P=new u0(O,nt,e,me),_=new cx(O,nt),P.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),I=O.createFramebuffer(),D=O.createFramebuffer(),N=O.createFramebuffer(),z=new b0(O),q=new Kv,Q=new ux(O,nt,_,q,P,me,z),ue=new _0(L),fe=new Ep(O),Me=new l0(O,fe),j=new S0(O,fe,z,Me),T=new E0(O,j,fe,Me,z),k=new w0(O,P,Q),ae=new h0(q),G=new $v(L,ue,nt,P,Me,ae),J=new vx(L,q),te=new Jv,ie=new ix(nt),Ue=new o0(L,ue,_,T,g,l),pe=new lx(L,T,P),oe=new xx(O,z,P,_),ce=new c0(O,nt,z),ee=new M0(O,nt,z),z.programs=G.programs,L.capabilities=P,L.extensions=nt,L.properties=q,L.renderLists=te,L.shadowMap=pe,L.state=_,L.info=z}y!==zt&&(w=new A0(y,t.width,t.height,o,r,s));const Ce=new mx(L,O);this.xr=Ce,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=nt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=nt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(Ge,H,!1))},this.getSize=function(b){return b.set(Ge,H)},this.setSize=function(b,F,K=!0){if(Ce.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=b,H=F,t.width=Math.floor(b*X),t.height=Math.floor(F*X),K===!0&&(t.style.width=b+"px",t.style.height=F+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(Ge*X,H*X).floor()},this.setDrawingBufferSize=function(b,F,K){Ge=b,H=F,X=K,t.width=Math.floor(b*K),t.height=Math.floor(F*K),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(y===zt){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(re)},this.getViewport=function(b){return b.copy(he)},this.setViewport=function(b,F,K,V){b.isVector4?he.set(b.x,b.y,b.z,b.w):he.set(b,F,K,V),_.viewport(re.copy(he).multiplyScalar(X).round())},this.getScissor=function(b){return b.copy(ye)},this.setScissor=function(b,F,K,V){b.isVector4?ye.set(b.x,b.y,b.z,b.w):ye.set(b,F,K,V),_.scissor(Pe.copy(ye).multiplyScalar(X).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(b){_.setScissorTest(it=b)},this.setOpaqueSort=function(b){le=b},this.setTransparentSort=function(b){ve=b},this.getClearColor=function(b){return b.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,K=!0){let V=0;if(b){let W=!1;if(se!==null){const _e=se.texture.format;W=m.has(_e)}if(W){const _e=se.texture.type,we=f.has(_e),xe=Ue.getClearColor(),Te=Ue.getClearAlpha(),Le=xe.r,Ve=xe.g,$e=xe.b;we?(S[0]=Le,S[1]=Ve,S[2]=$e,S[3]=Te,O.clearBufferuiv(O.COLOR,0,S)):(R[0]=Le,R[1]=Ve,R[2]=$e,R[3]=Te,O.clearBufferiv(O.COLOR,0,R))}else V|=O.COLOR_BUFFER_BIT}F&&(V|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),C=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Ue.dispose(),te.dispose(),ie.dispose(),q.dispose(),ue.dispose(),T.dispose(),Me.dispose(),oe.dispose(),G.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Tl),Ce.removeEventListener("sessionend",Al),Kn.stop()};function ft(b){b.preventDefault(),Us("WebGLRenderer: Context Lost."),U=!0}function rt(){Us("WebGLRenderer: Context Restored."),U=!1;const b=z.autoReset,F=pe.enabled,K=pe.autoUpdate,V=pe.needsUpdate,W=pe.type;De(),z.autoReset=b,pe.enabled=F,pe.autoUpdate=K,pe.needsUpdate=V,pe.type=W}function Qt(b){je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ln(b){const F=b.target;F.removeEventListener("dispose",ln),Yh(F)}function Yh(b){$h(b),q.remove(b)}function $h(b){const F=q.get(b).programs;F!==void 0&&(F.forEach(function(K){G.releaseProgram(K)}),b.isShaderMaterial&&G.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,K,V,W,_e){F===null&&(F=Qe);const we=W.isMesh&&W.matrixWorld.determinantAffine()<0,xe=Jh(b,F,K,V,W);_.setMaterial(V,we);let Te=K.index,Le=1;if(V.wireframe===!0){if(Te=j.getWireframeAttribute(K),Te===void 0)return;Le=2}const Ve=K.drawRange,$e=K.attributes.position;let Ae=Ve.start*Le,st=(Ve.start+Ve.count)*Le;_e!==null&&(Ae=Math.max(Ae,_e.start*Le),st=Math.min(st,(_e.start+_e.count)*Le)),Te!==null?(Ae=Math.max(Ae,0),st=Math.min(st,Te.count)):$e!=null&&(Ae=Math.max(Ae,0),st=Math.min(st,$e.count));const Mt=st-Ae;if(Mt<0||Mt===1/0)return;Me.setup(W,V,xe,K,Te);let gt,dt=ce;if(Te!==null&&(gt=fe.get(Te),dt=ee,dt.setIndex(gt)),W.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*mt()),dt.setMode(O.LINES)):dt.setMode(O.TRIANGLES);else if(W.isLine){let Dt=V.linewidth;Dt===void 0&&(Dt=1),_.setLineWidth(Dt*mt()),W.isLineSegments?dt.setMode(O.LINES):W.isLineLoop?dt.setMode(O.LINE_LOOP):dt.setMode(O.LINE_STRIP)}else W.isPoints?dt.setMode(O.POINTS):W.isSprite&&dt.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))dt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Dt=W._multiDrawStarts,be=W._multiDrawCounts,Nt=W._multiDrawCount,tt=Te?fe.get(Te).bytesPerElement:1,Xt=q.get(V).currentProgram.getUniforms();for(let cn=0;cn<Nt;cn++)Xt.setValue(O,"_gl_DrawID",cn),dt.render(Dt[cn]/tt,be[cn])}else if(W.isInstancedMesh)dt.renderInstances(Ae,Mt,W.count);else if(K.isInstancedBufferGeometry){const Dt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,be=Math.min(K.instanceCount,Dt);dt.renderInstances(Ae,Mt,be)}else dt.render(Ae,Mt)};function El(b,F,K,V){C!==null&&b.isNodeMaterial&&C.setObject(V,b),ke===!0&&ae.setState(b,K,!1),b.transparent===!0&&b.side===Kt&&b.forceSinglePass===!1?(b.side=Ht,b.needsUpdate=!0,Dr(b,F,V),b.side=oi,b.needsUpdate=!0,Dr(b,F,V),b.side=Kt):Dr(b,F,V)}this.compile=function(b,F,K=null){K===null&&(K=b),C!==null&&C.renderStart(b,F,K),E=ie.get(K),E.init(F),x.push(E),K.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),b!==K&&b.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights(),C!==null&&C.updateLights(E.state.lightsArray),Fe=this.localClippingEnabled,ke=ae.init(this.clippingPlanes,Fe),ke===!0&&ae.setGlobalState(this.clippingPlanes,F),C!==null&&pe.render(E.state.shadowsArray,K,F);const V=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const _e=W.material;if(_e)if(Array.isArray(_e))for(let we=0;we<_e.length;we++){const xe=_e[we];El(xe,K,F,W),V.add(xe)}else El(_e,K,F,W),V.add(_e)}),E=x.pop(),C!==null&&C.renderEnd(),V},this.compileAsync=function(b,F,K=null){const V=this.compile(b,F,K);return new Promise(W=>{function _e(){if(V.forEach(function(we){const Te=q.get(we).currentProgram;(Te===void 0||Te.isReady())&&V.delete(we)}),V.size===0){W(b);return}setTimeout(_e,10)}nt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Qs=null;function Kh(b){Qs&&Qs(b)}function Tl(){Kn.stop()}function Al(){Kn.start()}const Kn=new oh;Kn.setAnimationLoop(Kh),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(b){Qs=b,Ce.setAnimationLoop(b),b===null?Kn.stop():Kn.start()},Ce.addEventListener("sessionstart",Tl),Ce.addEventListener("sessionend",Al),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;C!==null&&C.renderStart(b,F);const K=Ce.enabled===!0&&Ce.isPresenting===!0,V=w!==null&&(se===null||K)&&w.begin(L,se);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(F),F=Ce.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,F,se),E=ie.get(b,x.length),E.init(F),E.state.textureUnits=Q.getTextureUnits(),x.push(E),Se.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ne.setFromProjectionMatrix(Se,gn,F.reversedDepth),Fe=this.localClippingEnabled,ke=ae.init(this.clippingPlanes,Fe),M=te.get(b,A.length),M.init(),A.push(M),Ce.enabled===!0&&Ce.isPresenting===!0){const we=L.xr.getDepthSensingMesh();we!==null&&js(we,F,-1/0,L.sortObjects)}js(b,F,0,L.sortObjects),M.finish(),C!==null&&C.updateLights(E.state.lightsArray),L.sortObjects===!0&&M.sort(le,ve),He=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,He&&Ue.addToRenderList(M,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ke===!0&&ae.beginShadows();const W=E.state.shadowsArray;if(pe.render(W,b,F),ke===!0&&ae.endShadows(),(V&&w.hasRenderPass())===!1){const we=M.opaque,xe=M.transmissive;if(E.setupLights(),F.isArrayCamera){const Te=F.cameras;if(xe.length>0)for(let Le=0,Ve=Te.length;Le<Ve;Le++){const $e=Te[Le];Cl(we,xe,b,$e)}He&&Ue.render(b);for(let Le=0,Ve=Te.length;Le<Ve;Le++){const $e=Te[Le];Rl(M,b,$e,$e.viewport)}}else xe.length>0&&Cl(we,xe,b,F),He&&Ue.render(b),Rl(M,b,F)}se!==null&&Y===0&&(Q.updateMultisampleRenderTarget(se),Q.updateRenderTargetMipmap(se)),V&&w.end(L),b.isScene===!0&&b.onAfterRender(L,b,F),Me.resetDefaultState(),Z=-1,ne=null,x.pop(),x.length>0?(E=x[x.length-1],Q.setTextureUnits(E.state.textureUnits),ke===!0&&ae.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,C!==null&&C.renderEnd()};function js(b,F,K,V){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Ne)){V&&et.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Se);const we=T.update(b),xe=b.material;xe.visible&&M.push(b,we,xe,K,et.z,null,F)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Ne))){const we=T.update(b),xe=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),et.copy(b.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),et.copy(we.boundingSphere.center)),et.applyMatrix4(b.matrixWorld).applyMatrix4(Se)),Array.isArray(xe)){const Te=we.groups;for(let Le=0,Ve=Te.length;Le<Ve;Le++){const $e=Te[Le],Ae=xe[$e.materialIndex];Ae&&Ae.visible&&M.push(b,we,Ae,K,et.z,$e,F)}}else xe.visible&&M.push(b,we,xe,K,et.z,null,F)}}const _e=b.children;for(let we=0,xe=_e.length;we<xe;we++)js(_e[we],F,K,V)}function Rl(b,F,K,V){const{opaque:W,transmissive:_e,transparent:we}=b;E.setupLightsView(K),ke===!0&&ae.setGlobalState(L.clippingPlanes,K),V&&_.viewport(re.copy(V)),W.length>0&&Lr(W,F,K),_e.length>0&&Lr(_e,F,K),we.length>0&&Lr(we,F,K),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Cl(b,F,K,V){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[V.id]===void 0){const Ae=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[V.id]=new Wt(1,1,{generateMipmaps:!0,type:Ae?on:zt,minFilter:si,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const _e=E.state.transmissionRenderTarget[V.id],we=V.viewport||re;_e.setSize(we.z*L.transmissionResolutionScale,we.w*L.transmissionResolutionScale);const xe=L.getRenderTarget(),Te=L.getActiveCubeFace(),Le=L.getActiveMipmapLevel();L.setRenderTarget(_e),L.getClearColor(qe),Xe=L.getClearAlpha(),Xe<1&&L.setClearColor(16777215,.5),L.clear(),He&&Ue.render(K);const Ve=L.toneMapping;L.toneMapping=vn;const $e=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),ke===!0&&ae.setGlobalState(L.clippingPlanes,V),Lr(b,K,V),Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let st=0,Mt=F.length;st<Mt;st++){const gt=F[st],{object:dt,geometry:Dt,material:be,group:Nt}=gt;if(be.side===Kt&&dt.layers.test(V.layers)){const tt=be.side;be.side=Ht,be.needsUpdate=!0,Pl(dt,K,V,Dt,be,Nt),be.side=tt,be.needsUpdate=!0,Ae=!0}}Ae===!0&&(Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e))}L.setRenderTarget(xe,Te,Le),L.setClearColor(qe,Xe),$e!==void 0&&(V.viewport=$e),L.toneMapping=Ve}function Lr(b,F,K){const V=F.isScene===!0?F.overrideMaterial:null;for(let W=0,_e=b.length;W<_e;W++){const we=b[W],{object:xe,geometry:Te,group:Le}=we;let Ve=we.material;Ve.allowOverride===!0&&V!==null&&(Ve=V),xe.layers.test(K.layers)&&Pl(xe,F,K,Te,Ve,Le)}}function Pl(b,F,K,V,W,_e){C!==null&&W.isNodeMaterial&&C.setObject(b,W),b.onBeforeRender(L,F,K,V,W,_e),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(L,F,K,V,b,_e),W.transparent===!0&&W.side===Kt&&W.forceSinglePass===!1?(W.side=Ht,W.needsUpdate=!0,L.renderBufferDirect(K,F,V,W,b,_e),W.side=oi,W.needsUpdate=!0,L.renderBufferDirect(K,F,V,W,b,_e),W.side=Kt):L.renderBufferDirect(K,F,V,W,b,_e),b.onAfterRender(L,F,K,V,W,_e)}function Dr(b,F,K){F.isScene!==!0&&(F=Qe);const V=q.get(b),W=E.state.lights,_e=E.state.shadowsArray,we=W.state.version,xe=G.getParameters(b,W.state,_e,F,K,E.state.lightProbeGridArray),Te=G.getProgramCacheKey(xe);let Le=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;const Ve=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=ue.get(b.envMap||V.environment,Ve),V.envMapRotation=V.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Le===void 0&&(b.addEventListener("dispose",ln),Le=new Map,V.programs=Le);let $e=Le.get(Te);if($e!==void 0){if(V.currentProgram===$e&&V.lightsStateVersion===we)return Dl(b,xe),$e}else xe.uniforms=G.getUniforms(b),C!==null&&b.isNodeMaterial&&C.build(b,K,xe),b.onBeforeCompile(xe,L),$e=G.acquireProgram(xe,Te),Le.set(Te,$e),V.uniforms=xe.uniforms;const Ae=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=ae.uniform),Dl(b,xe),V.needsLights=jh(b),V.lightsStateVersion=we,V.needsLights&&(Ae.ambientLightColor.value=W.state.ambient,Ae.lightProbe.value=W.state.probe,Ae.sunLights.value=W.state.sun,Ae.sunLightShadows.value=W.state.sunShadow,Ae.directionalLights.value=W.state.directional,Ae.directionalLightShadows.value=W.state.directionalShadow,Ae.spotLights.value=W.state.spot,Ae.spotLightShadows.value=W.state.spotShadow,Ae.rectAreaLights.value=W.state.rectArea,Ae.ltc_1.value=W.state.rectAreaLTC1,Ae.ltc_2.value=W.state.rectAreaLTC2,Ae.pointLights.value=W.state.point,Ae.pointLightShadows.value=W.state.pointShadow,Ae.hemisphereLights.value=W.state.hemi,Ae.sunShadowMatrix.value=W.state.sunShadowMatrix,Ae.sunShadowCascade.value=W.state.sunShadowCascade,Ae.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ae.spotLightMatrix.value=W.state.spotLightMatrix,Ae.spotLightMap.value=W.state.spotLightMap,Ae.pointShadowMatrix.value=W.state.pointShadowMatrix),V.lightProbeGrid=E.state.lightProbeGridArray.length>0,V.currentProgram=$e,V.uniformsList=null,$e}function Ll(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=bs.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function Dl(b,F){const K=q.get(b);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function Zh(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let K=0,V=b.length;K<V;K++){const W=b[K];if(W.texture!==null&&W.boundingBox.containsPoint(v))return W}return null}function Jh(b,F,K,V,W){F.isScene!==!0&&(F=Qe),Q.resetTextureUnits();const _e=F.fog,we=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,xe=se===null?L.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Je.workingColorSpace,Te=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Le=ue.get(V.envMap||we,Te),Ve=V.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,$e=!!K.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!K.morphAttributes.position,st=!!K.morphAttributes.normal,Mt=!!K.morphAttributes.color;let gt=vn;V.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(gt=L.toneMapping);const dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Dt=dt!==void 0?dt.length:0,be=q.get(V),Nt=E.state.lights;if(ke===!0&&(Fe===!0||b!==ne)){const pt=b===ne&&V.id===Z;ae.setState(V,b,pt)}let tt=!1;V.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Nt.state.version||be.outputColorSpace!==xe||W.isBatchedMesh&&be.batching===!1||!W.isBatchedMesh&&be.batching===!0||W.isBatchedMesh&&be.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&be.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&be.instancing===!1||!W.isInstancedMesh&&be.instancing===!0||W.isSkinnedMesh&&be.skinning===!1||!W.isSkinnedMesh&&be.skinning===!0||W.isInstancedMesh&&be.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&be.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&be.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&be.instancingMorph===!1&&W.morphTexture!==null||be.envMap!==Le||V.fog===!0&&be.fog!==_e||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ae.numPlanes||be.numIntersection!==ae.numIntersection)||be.vertexAlphas!==Ve||be.vertexTangents!==$e||be.morphTargets!==Ae||be.morphNormals!==st||be.morphColors!==Mt||be.toneMapping!==gt||be.morphTargetsCount!==Dt||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,be.__version=V.version);let Xt=be.currentProgram;tt===!0&&(Xt=Dr(V,F,W),C&&V.isNodeMaterial&&C.onUpdateProgram(V,Xt,be));let cn=!1,Nn=!1,gi=!1;const ut=Xt.getUniforms(),yt=be.uniforms;if(_.useProgram(Xt.program)&&(cn=!0,Nn=!0,gi=!0),V.id!==Z&&(Z=V.id,Nn=!0),be.needsLights){const pt=Zh(E.state.lightProbeGridArray,W);be.lightProbeGrid!==pt&&(be.lightProbeGrid=pt,Nn=!0)}if(cn||ne!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ut.setValue(O,"projectionMatrix",b.projectionMatrix),ut.setValue(O,"viewMatrix",b.matrixWorldInverse);const kn=ut.map.cameraPosition;kn!==void 0&&kn.setValue(O,Ie.setFromMatrixPosition(b.matrixWorld)),P.logarithmicDepthBuffer&&ut.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ut.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),ne!==b&&(ne=b,Nn=!0,gi=!0)}if(be.needsLights&&(Nt.state.sunShadowMap.length>0&&ut.setValue(O,"sunShadowMap",Nt.state.sunShadowMap,Q),Nt.state.directionalShadowMap.length>0&&ut.setValue(O,"directionalShadowMap",Nt.state.directionalShadowMap,Q),Nt.state.spotShadowMap.length>0&&ut.setValue(O,"spotShadowMap",Nt.state.spotShadowMap,Q),Nt.state.pointShadowMap.length>0&&ut.setValue(O,"pointShadowMap",Nt.state.pointShadowMap,Q)),W.isSkinnedMesh){ut.setOptional(O,W,"bindMatrix"),ut.setOptional(O,W,"bindMatrixInverse");const pt=W.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ut.setValue(O,"boneTexture",pt.boneTexture,Q))}W.isBatchedMesh&&(ut.setOptional(O,W,"batchingTexture"),ut.setValue(O,"batchingTexture",W._matricesTexture,Q),ut.setOptional(O,W,"batchingIdTexture"),ut.setValue(O,"batchingIdTexture",W._indirectTexture,Q),ut.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&ut.setValue(O,"batchingColorTexture",W._colorsTexture,Q));const Fn=K.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&k.update(W,K,Xt),(Nn||be.receiveShadow!==W.receiveShadow)&&(be.receiveShadow=W.receiveShadow,ut.setValue(O,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(yt.envMapIntensity.value=F.environmentIntensity),yt.dfgLUT!==void 0&&(yt.dfgLUT.value=yx()),Nn){if(ut.setValue(O,"toneMappingExposure",L.toneMappingExposure),be.needsLights&&Qh(yt,gi),_e&&V.fog===!0&&J.refreshFogUniforms(yt,_e),J.refreshMaterialUniforms(yt,V,X,H,E.state.transmissionRenderTarget[b.id]),be.needsLights&&be.lightProbeGrid){const pt=be.lightProbeGrid;yt.probesSH.value=pt.texture,yt.probesMin.value.copy(pt.boundingBox.min),yt.probesMax.value.copy(pt.boundingBox.max),yt.probesResolution.value.copy(pt.resolution)}bs.upload(O,Ll(be),yt,Q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(bs.upload(O,Ll(be),yt,Q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ut.setValue(O,"center",W.center),ut.setValue(O,"modelViewMatrix",W.modelViewMatrix),ut.setValue(O,"normalMatrix",W.normalMatrix),ut.setValue(O,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){const pt=V.uniformsGroups;for(let kn=0,vi=pt.length;kn<vi;kn++){const Ul=pt[kn];oe.update(Ul,Xt),oe.bind(Ul,Xt)}}return Xt}function Qh(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.sunLights.needsUpdate=F,b.sunLightShadows.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function jh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(b,F,K){const V=q.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),q.get(b.texture).__webglTexture=F,q.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:K,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const K=q.get(b);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,K=0){se=b,$=F,Y=K;let V=null,W=!1,_e=!1;if(b){const xe=q.get(b);if(xe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(O.FRAMEBUFFER,xe.__webglFramebuffer),re.copy(b.viewport),Pe.copy(b.scissor),Re=b.scissorTest,_.viewport(re),_.scissor(Pe),_.setScissorTest(Re),Z=-1;return}else if(xe.__webglFramebuffer===void 0)Q.setupRenderTarget(b);else if(xe.__hasExternalTextures)Q.rebindTextures(b,q.get(b.texture).__webglTexture,q.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ve=b.depthTexture;if(xe.__boundDepthTexture!==Ve){if(Ve!==null&&q.has(Ve)&&(b.width!==Ve.image.width||b.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(b)}}const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(_e=!0);const Le=q.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Le[F])?V=Le[F][K]:V=Le[F],W=!0):b.samples>0&&Q.useMultisampledRTT(b)===!1?V=q.get(b).__webglMultisampledFramebuffer:Array.isArray(Le)?V=Le[K]:V=Le,re.copy(b.viewport),Pe.copy(b.scissor),Re=b.scissorTest}else re.copy(he).multiplyScalar(X).floor(),Pe.copy(ye).multiplyScalar(X).floor(),Re=it;if(K!==0&&(V=I),_.bindFramebuffer(O.FRAMEBUFFER,V)&&_.drawBuffers(b,V),_.viewport(re),_.scissor(Pe),_.setScissorTest(Re),W){const xe=q.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,xe.__webglTexture,K)}else if(_e){const xe=F;for(let Te=0;Te<b.textures.length;Te++){const Le=q.get(b.textures[Te]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Te,Le.__webglTexture,K,xe)}}else if(b!==null&&K!==0){const xe=q.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,xe.__webglTexture,K)}Z=-1};function Il(b){const F=q.get(b);return(F.__readFormat!==b.format||F.__readType!==b.type)&&(F.__readFormat=b.format,F.__readType=b.type,F.__formatReadable=P.textureFormatReadable(b.format),F.__typeReadable=P.textureTypeReadable(b.type)),F}this.readRenderTargetPixels=function(b,F,K,V,W,_e,we,xe=0){if(!(b&&b.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te){_.bindFramebuffer(O.FRAMEBUFFER,Te);try{const Le=b.textures[xe],Ve=Le.format,$e=Le.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+xe);const Ae=Il(Le);if(Ae.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-V&&K>=0&&K<=b.height-W&&O.readPixels(F,K,V,W,me.convert(Ve),me.convert($e),_e)}finally{const Le=se!==null?q.get(se).__webglFramebuffer:null;_.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(b,F,K,V,W,_e,we,xe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te)if(F>=0&&F<=b.width-V&&K>=0&&K<=b.height-W){_.bindFramebuffer(O.FRAMEBUFFER,Te);const Le=b.textures[xe],Ve=Le.format,$e=Le.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+xe);const Ae=Il(Le);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,st),O.bufferData(O.PIXEL_PACK_BUFFER,_e.byteLength,O.STREAM_READ),O.readPixels(F,K,V,W,me.convert(Ve),me.convert($e),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Mt=se!==null?q.get(se).__webglFramebuffer:null;_.bindFramebuffer(O.FRAMEBUFFER,Mt);const gt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await pf(O,gt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,st),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,_e),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(st),O.deleteSync(gt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,K=0){const V=Math.pow(2,-K),W=Math.floor(b.image.width*V),_e=Math.floor(b.image.height*V),we=F!==null?F.x:0,xe=F!==null?F.y:0;Q.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,K,0,0,we,xe,W,_e),_.unbindTexture()},this.copyTextureToTexture=function(b,F,K=null,V=null,W=0,_e=0){let we,xe,Te,Le,Ve,$e,Ae,st,Mt;const gt=b.isCompressedTexture?b.mipmaps[_e]:b.image;if(K!==null)we=K.max.x-K.min.x,xe=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Le=K.min.x,Ve=K.min.y,$e=K.isBox3?K.min.z:0;else{const yt=Math.pow(2,-W);we=Math.floor(gt.width*yt),xe=Math.floor(gt.height*yt),b.isDataArrayTexture?Te=gt.depth:b.isData3DTexture?Te=Math.floor(gt.depth*yt):Te=1,Le=0,Ve=0,$e=0}V!==null?(Ae=V.x,st=V.y,Mt=V.z):(Ae=0,st=0,Mt=0);const dt=me.convert(F.format),Dt=me.convert(F.type);let be;F.isData3DTexture?(Q.setTexture3D(F,0),be=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),be=O.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),be=O.TEXTURE_2D),_.activeTexture(O.TEXTURE0),_.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);const Nt=_.getParameter(O.UNPACK_ROW_LENGTH),tt=_.getParameter(O.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(O.UNPACK_SKIP_PIXELS),cn=_.getParameter(O.UNPACK_SKIP_ROWS),Nn=_.getParameter(O.UNPACK_SKIP_IMAGES);_.pixelStorei(O.UNPACK_ROW_LENGTH,gt.width),_.pixelStorei(O.UNPACK_IMAGE_HEIGHT,gt.height),_.pixelStorei(O.UNPACK_SKIP_PIXELS,Le),_.pixelStorei(O.UNPACK_SKIP_ROWS,Ve),_.pixelStorei(O.UNPACK_SKIP_IMAGES,$e);const gi=b.isDataArrayTexture||b.isData3DTexture,ut=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const yt=q.get(b),Fn=q.get(F),pt=q.get(yt.__renderTarget),kn=q.get(Fn.__renderTarget);_.bindFramebuffer(O.READ_FRAMEBUFFER,pt.__webglFramebuffer),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let vi=0;vi<Te;vi++)gi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,q.get(b).__webglTexture,W,$e+vi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,q.get(F).__webglTexture,_e,Mt+vi)),O.blitFramebuffer(Le,Ve,we,xe,Ae,st,we,xe,O.DEPTH_BUFFER_BIT,O.NEAREST);_.bindFramebuffer(O.READ_FRAMEBUFFER,null),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||q.has(b)){const yt=q.get(b),Fn=q.get(F);_.bindFramebuffer(O.READ_FRAMEBUFFER,D),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,N);for(let pt=0;pt<Te;pt++)gi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,yt.__webglTexture,W,$e+pt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,yt.__webglTexture,W),ut?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fn.__webglTexture,_e,Mt+pt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Fn.__webglTexture,_e),W!==0?O.blitFramebuffer(Le,Ve,we,xe,Ae,st,we,xe,O.COLOR_BUFFER_BIT,O.NEAREST):ut?O.copyTexSubImage3D(be,_e,Ae,st,Mt+pt,Le,Ve,we,xe):O.copyTexSubImage2D(be,_e,Ae,st,Le,Ve,we,xe);_.bindFramebuffer(O.READ_FRAMEBUFFER,null),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ut?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(be,_e,Ae,st,Mt,we,xe,Te,dt,Dt,gt.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(be,_e,Ae,st,Mt,we,xe,Te,dt,gt.data):O.texSubImage3D(be,_e,Ae,st,Mt,we,xe,Te,dt,Dt,gt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,_e,Ae,st,we,xe,dt,Dt,gt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,_e,Ae,st,gt.width,gt.height,dt,gt.data):O.texSubImage2D(O.TEXTURE_2D,_e,Ae,st,we,xe,dt,Dt,gt);_.pixelStorei(O.UNPACK_ROW_LENGTH,Nt),_.pixelStorei(O.UNPACK_IMAGE_HEIGHT,tt),_.pixelStorei(O.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(O.UNPACK_SKIP_ROWS,cn),_.pixelStorei(O.UNPACK_SKIP_IMAGES,Nn),_e===0&&F.generateMipmaps&&O.generateMipmap(be),_.unbindTexture()},this.initRenderTarget=function(b){q.get(b).__webglFramebuffer===void 0&&Q.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Q.setTextureCube(b,0):b.isData3DTexture?Q.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Q.setTexture2DArray(b,0):Q.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){$=0,Y=0,se=null,_.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}function Mx(i,e,t,n,r){i.wall=r??i.wall+e,!i.dueNotified&&i.wall>=n&&(i.dueNotified=!0,i.landingDue?.());const s=i.slow,a=i.t>=t&&!!i.hold?.(),o=!!s&&a&&i.wall<s.cap;s&&(i.rate+=((o?s.rate*Math.min(1,n-i.t):1)-i.rate)*(1-Math.exp(-e/Math.max(.01,s.ease)))),i.held=a,i.t=Math.min(n,i.t+e*i.rate)}const us={land:[34,58,56],land2:[46,76,68],sand:[222,202,146],coast:[24,30,52]},mh=(i,e)=>{const t=i.length,n=(e+Math.PI)/(Math.PI*2)*t,r=Math.floor(n),s=n-r;return i[(r%t+t)%t]*(1-s)+i[((r+1)%t+t)%t]*s};function pS(i,e,{n:t=30,sigil:n=bu(i),colour:r=wu(n),sigilShare:s=.45,minScale:a=.62}={}){const o=Math.max(...e),l=Math.max(a,Math.min(1,o))/o,c=(t/2-1.5)*l,u=t/2,d=(v,M)=>{const E=v+.5-u,A=M+.5-u;return Math.hypot(E,A)<=c*mh(e,Math.atan2(A,E))},h=new Uint8ClampedArray(t*t*4),p=(v,M)=>{h[v*4]=M[0],h[v*4+1]=M[1],h[v*4+2]=M[2],h[v*4+3]=255},g=new Uint8Array(t*t);for(let v=0;v<t;v++)for(let M=0;M<t;M++)g[v*t+M]=d(M,v)?1:0;const y=(v,M)=>v>=0&&M>=0&&v<t&&M<t&&g[M*t+v]===1,m=(v,M)=>!y(v-1,M)||!y(v+1,M)||!y(v,M-1)||!y(v,M+1);for(let v=0;v<t;v++)for(let M=0;M<t;M++){const E=v*t+M;y(M,v)?p(E,m(M,v)?us.sand:Math.hypot(M+.5-u,v+.5-u)<c*.55?us.land:us.land2):(y(M-1,v)||y(M+1,v)||y(M,v-1)||y(M,v+1))&&p(E,us.coast)}const f=Math.max(11,Math.round(t*s*Math.min(1,l*Math.max(...e)+.2))),S=Math.round((t-f)/2),R=Mu(n,f);for(let v=0;v<f;v++)for(let M=0;M<f;M++)R[v*f+M]<1/0&&g[(v+S)*t+M+S]&&p((v+S)*t+M+S,r);return{w:t,h:t,rgba:h}}function bx(i,{steps:e=i.length}={}){const t=[],n=.48/Math.max(1,...i);for(let r=0;r<e;r++){const s=-Math.PI+r/e*Math.PI*2,a=n*mh(i,s);t.push([.5+a*Math.cos(s),.5+a*Math.sin(s)])}return t}function wx(i,e,t,n,r,s=16){const a=i(e,t,n);let o=a.y;for(let l=0;l<s;l++){const c=l/s*Math.PI*2,u=i(e+Math.cos(c)*r,t,n+Math.sin(c)*r);u.y<o&&(o=u.y)}return{x:a.x,y:o}}function Ex(i,e,t){const n=i+(e-i)*Math.min(1,Math.max(0,t)*8);return Math.abs(n-e)<.01?e:n}const Tx=i=>i>=128?2:i>=64?1:0,Yn=.055,Ax=Vs*1.55,Rx=Vs*.42;function Cx(i,e,t,n){const r=n[0]-t[0],s=n[1]-t[1],a=r*r+s*s,o=a?Math.max(0,Math.min(1,((i-t[0])*r+(e-t[1])*s)/a)):0;return Math.hypot(i-t[0]-r*o,e-t[1]-s*o)}const Go=(i,e,t)=>t.dot?Math.hypot(i-t.pts[0][0],e-t.pts[0][1]):t.pts.slice(1).reduce((n,r,s)=>Math.min(n,Cx(i,e,t.pts[s],r)),1/0),pr=new Map;function Px(i,e=128,{tier:t=Tx(e)}={}){const n=`${i}|${e}|${t}`;if(pr.has(n))return pr.get(n);const r=new Uint8Array(e*e);if(t<=0){const u=Mu(i,e);for(let d=0;d<u.length;d++)r[d]=u[d]<1/0?1:0;return pr.set(n,r),r}if(t>=2){const u=Ux(i,e);return pr.set(n,u),u}const s=$a(i,1).map(u=>({...u,pts:u.pts.map(([d,h])=>[Yn+d*(1-2*Yn),Yn+h*(1-2*Yn)])})),a=Ax/2,o=Rx/2,l=1/e,c=Math.max(jo*1.5,a*1.1);for(let u=0;u<e;u++)for(let d=0;d<e;d++){const h=(d+.5)*l,p=(u+.5)*l;let g=0;for(const y of s){const m=Go(h,p,y),f=y.dot?c:a;if(!(m>=f)){g=y.dot?m/f>.38&&m/f<.62?0:1:m<Math.max(o,l*.6)?0:1;break}}r[u*e+d]=g}return pr.set(n,r),r}const Lx=.055,Zc=Vs*.85,Dx=Vs*.28,Jc=jo*1.15,Ix=jo*.42;function Na(i,e,t=e){const n=new Float32Array(e*t),r=1e9,s=1,a=Math.SQRT2;for(let l=0;l<e*t;l++)n[l]=i[l]?r:0;const o=(l,c)=>l<0||c<0||l>=e||c>=t?0:n[c*e+l];for(let l=0;l<t;l++)for(let c=0;c<e;c++){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c-1,l)+s,o(c,l-1)+s,o(c-1,l-1)+a,o(c+1,l-1)+a))}for(let l=t-1;l>=0;l--)for(let c=e-1;c>=0;c--){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c+1,l)+s,o(c,l+1)+s,o(c+1,l+1)+a,o(c-1,l+1)+a))}return n}function Ux(i,e){const t=1/e,n=$a(i,2).map(S=>({...S,pts:S.pts.map(([R,v])=>[Yn+R*(1-2*Yn),Yn+v*(1-2*Yn)])})),r=$a(i,0).length,s=n.filter(S=>!S.dot),a=n.filter(S=>S.dot),o=new Set(n.slice(r).filter(S=>!S.dot)),l=new Float32Array(e*e),c=new Float32Array(e*e),u=new Uint8Array(e*e);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=(R+.5)*t,M=(S+.5)*t;let E=1/0,A=1/0;for(const x of s){const w=Go(v,M,x);o.has(x)?A=Math.min(A,w):E=Math.min(E,w)}c[S*e+R]=A,E=Math.min(E,A+Zc*.35);for(const x of a)E=Math.min(E,Go(v,M,x)-Jc*.4);l[S*e+R]=E,E<Zc&&(u[S*e+R]=1)}{const S=Lx*e,R=Math.ceil(S)+2,v=e+2*R,M=new Uint8Array(v*v).fill(1);for(let w=0;w<e;w++)for(let L=0;L<e;L++)M[(w+R)*v+L+R]=u[w*e+L]?0:1;const E=Na(M,v),A=new Uint8Array(v*v);for(let w=0;w<v*v;w++)A[w]=!M[w]||E[w]<=S?1:0;const x=Na(A,v);for(let w=0;w<e;w++)for(let L=0;L<e;L++){const U=(w+R)*v+L+R;A[U]&&x[U]>S&&(u[w*e+L]=1)}}{const S=new Uint8Array(e*e),R=[];for(let v=0;v<e;v++)R.push(v,(e-1)*e+v,v*e,v*e+e-1);for(;R.length;){const v=R.pop();if(S[v]||u[v])continue;S[v]=1;const M=v%e,E=v/e|0;M>0&&R.push(v-1),M<e-1&&R.push(v+1),E>0&&R.push(v-e),E<e-1&&R.push(v+e)}for(let v=0;v<e*e;v++)S[v]||(u[v]=1)}const d=Na(u,e),h=[],p=.085*e,g=[];for(let S=0;S<e*e;S++)d[S]>p&&l[S]*e>p*.8&&g.push(S);g.sort((S,R)=>d[R]-d[S]);for(const S of g){if(h.length>=3)break;const R=S%e,v=S/e|0,M=Math.min(d[S],l[S]*e)*.8;h.some(E=>Math.hypot(E.x-R,E.y-v)<E.r+M+2)||h.push({x:R,y:v,r:M,turn:Nx(i,h.length)})}const y=new Uint8Array(e*e),m=Math.max(1,Dx*e),f=Math.max(m*3.2,4);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=S*e+R;if(!u[v])continue;const M=(R+.5)*t,E=(S+.5)*t,A=d[v];let x=1;l[v]*e<m/2+.5&&A>m*.9&&(x=0),c[v]*e<m*.36+.5&&A>m*1.4&&(x=0);for(const L of a){const U=Math.hypot(M-L.pts[0][0],E-L.pts[0][1]);U<Jc&&(x=U<Ix?1:0)}let w=!1;for(const L of h){const U=R+.5-L.x,C=S+.5-L.y,I=Math.hypot(U,C);if(I>L.r)continue;w=!0;const D=Math.max(1.3,L.r/(m*2.6)),N=(Math.atan2(C,U)/(Math.PI*2)+1+L.turn)%1,$=L.r/D;x=(I/$-N+8)%1<.58||I<m*.8?1:0,I>L.r-m&&(x=0)}!w&&x&&l[v]*e>m*1.8&&A>f*1.2&&A%f<m&&(x=0),y[v]=x}return y}const Nx=(i,e)=>{let t=2166136261;for(const n of i+e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e3/1e3};function Fx(i){const e=i.light;return e&&e.mood==="spooky"?e.spooky:null}function kx(i,e){e?.grade?i.set(e.grade,e.gradeDesat,e.gradePivot,0):i.set(0,0,1,0)}function Qc(i,e,t,n,r=1){e=(e%1+1)%1,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));const s=Math.floor(e*6),a=e*6-s,o=hs(n*(1-t),r),l=hs(n*(1-a*t),r),c=hs(n*(1-(1-a)*t),r),u=hs(n,r);switch(s%6){case 0:i.set(u,c,o);break;case 1:i.set(l,u,o);break;case 2:i.set(o,u,c);break;case 3:i.set(o,l,u);break;case 4:i.set(c,o,u);break;default:i.set(u,o,l)}}const hs=(i,e)=>Math.round(i*255)/255*e,Ox=["hazeHue","hazeSat","haze","gradeHue","gradeSat","mist"];class mS{constructor(e){this.M=e,this.cur=this.target("")}M;cur;targets=new Map;target(e){let t=this.targets.get(e);if(!t){const n=this.M.areas?.[e]??{};t={hazeHue:this.M.hazeHue,hazeSat:this.M.hazeSat,haze:this.M.haze,gradeHue:this.M.gradeHue,gradeSat:this.M.gradeSat,mist:this.M.mist,...n},this.targets.set(e,t)}return t}update(e,t,n,r,s){const a=this.target(e),o=1-Math.exp(-Math.max(0,t)*(this.M.areaEase??.5)),l=this.cur;for(const c of Ox)if(c==="hazeHue"||c==="gradeHue"){const u=(a[c]-l[c]+1.5)%1-.5;l[c]=(l[c]+u*o+1)%1}else l[c]+=(a[c]-l[c])*o;if(Qc(n,l.hazeHue,l.hazeSat,1,l.haze),r){Qc(r,l.gradeHue,l.gradeSat,1);const c=.3*r.x+.55*r.y+.15*r.z;c>0&&r.set(r.x/c,r.y/c,r.z/c)}s?.setStrength(l.mist)}}function*Bx(i,e){const t={wait:i,here:e};return yield t,t.value}const gh=i=>typeof i=="object"&&i!==null&&"here"in i&&!("later"in i);function*gS(i,e){const t={later:!0,wait:i,here:e,got:!1};return yield t,t}function*vS(i){return i.got||(i.value=yield*Bx(()=>i.promise,i.here)),i.got=!0,i.value}const vh=i=>typeof i=="object"&&i!==null&&"later"in i;function zx(i){for(;;){const e=i.next();if(e.done)return e.value;vh(e.value)?(e.value.value=e.value.here(),e.value.got=!0):gh(e.value)?e.value.value=e.value.here():e.value&&xh(e.value)}}const Fa=[],Hx=8;async function xS(i,e,t=Hx,n=Vx){const r={longest:0,longestAt:"",slices:0,ms:0,slow:[]};await eu();let s="";const a=n();for(;;){const o=n();for(r.slices++;;){const l=n(),c=i.next(),u=n()-l;if(u>r.longest&&(r.longest=u,r.longestAt=s),u>4&&(r.slow.length<10||u>r.slow[9][0])&&(r.slow.push([Math.round(u),s]),r.slow.sort((d,h)=>h[0]-d[0]),r.slow.length=Math.min(10,r.slow.length)),c.done)return r.ms=n()-a,Fa.push({...r,what:e}),Fa.length>8&&Fa.shift(),c.value;if(vh(c.value)){const d=c.value;d.promise=jc(d).then(h=>(d.value=h,d.got=!0,h));continue}if(gh(c.value)){const d=c.value;d.value=await jc(d);break}if(c.value&&(s=c.value,xh(c.value)),n()-o>=t)break}await eu()}}const Gx=2e4;async function jc(i){let e;const t=new Promise(n=>{e=setTimeout(()=>n("late"),Gx)});try{const n=await Promise.race([i.wait(),t]);return n==="late"?i.here():n}catch(n){return yd(n,"sliced build worker fallback"),i.here()}finally{clearTimeout(e)}}const Vx=()=>performance.now(),xh=i=>{try{performance.mark(`witch:build-${i}`)}catch{}};function eu(){return new Promise(i=>{if(typeof requestAnimationFrame>"u"||typeof document>"u"||document.hidden){setTimeout(i,0);return}let e=!1;const t=()=>{e||(e=!0,i())};requestAnimationFrame(()=>setTimeout(t,0)),setTimeout(t,100)})}const Wx=JSON.parse(`[{"key":"blue+blue+blue","recipe":["blue","blue","blue"],"effect":"bullet-time","name":"Bullet Time","description":"The world slows to a crawl while she keeps her speed. Only she and nearby threats retain their colour.","comingSoon":true,"id":1},{"key":"blue+blue+purple","recipe":["blue","blue","purple"],"effect":"moon-boots","name":"Moon Boots","description":"Taking off becomes a huge bouncing leap with no steering in the air.","comingSoon":true,"id":2},{"key":"blue+blue+pink","recipe":["blue","blue","pink"],"effect":"echo","name":"Echo","description":"Neon copies trail behind her, echoing her movements and invitations.","comingSoon":true,"id":3},{"key":"blue+blue+red","recipe":["blue","blue","red"],"effect":"the-fear","name":"The Fear","description":"Shadows stalk and startle her but cannot hurt her. She hears phantom footsteps, and familiar animals loom twice their size.","comingSoon":true,"id":4},{"key":"blue+blue+orange","recipe":["blue","blue","orange"],"effect":"alone","name":"Alone","description":"She wanders a private, harmless copy of the island alone. Her body lies on the grass in the shared world until she wakes there.","comingSoon":true,"id":5},{"key":"blue+blue+yellow","recipe":["blue","blue","yellow"],"effect":"walking-wood","name":"Walking Wood","description":"The trees move around as if they can walk.","comingSoon":false,"id":6},{"key":"blue+blue+green","recipe":["blue","blue","green"],"effect":"skylight","name":"Floor Becomes Sky","description":"Ground and small foliage disappear into the starfield, while the ground's bend still hides objects beyond the horizon.","comingSoon":false,"id":7},{"key":"blue+blue+turquoise","recipe":["blue","blue","turquoise"],"effect":"brass-band","name":"Brass Band","description":"Every instrument in the music becomes a trumpet.","comingSoon":true,"id":8},{"key":"blue+blue+white","recipe":["blue","blue","white"],"effect":"big-moon","name":"Big Moon","description":"An enormous moon fills the sky, with a strong luminous halo.","comingSoon":false,"id":9},{"key":"blue+purple+purple","recipe":["blue","purple","purple"],"effect":"ravine","name":"Ravine","description":"The bend inverted: the world curves up around her, as if at the bottom of a ravine.","comingSoon":false,"id":10},{"key":"blue+pink+purple","recipe":["blue","purple","pink"],"effect":"chunky","name":"Chunky","description":"Much bigger pixels.","comingSoon":false,"id":11},{"key":"blue+purple+red","recipe":["blue","purple","red"],"effect":"superhot","name":"Superhot","description":"Time only moves forward when she's moving (the wave countdown still creeps while she stands still).","comingSoon":true,"id":12},{"key":"blue+orange+purple","recipe":["blue","purple","orange"],"effect":"orbit","name":"Orbit","description":"The treetops three times higher; the camera close to her; looking down on the forest as if from space.","comingSoon":true,"id":13},{"key":"blue+purple+yellow","recipe":["blue","purple","yellow"],"effect":"mirror-forest","name":"Mirror Forest","description":"Every creature looks like her.","comingSoon":true,"id":14},{"key":"blue+green+purple","recipe":["blue","purple","green"],"effect":"skinny-dip","name":"Skinny Dip","description":"Every party witch wears only her hat, boots and a few strategically placed sparkles.","comingSoon":true,"id":15},{"key":"blue+purple+turquoise","recipe":["blue","purple","turquoise"],"effect":"pride","name":"Pride","description":"She gets the party rainbow trail.","comingSoon":true,"id":16},{"key":"blue+purple+white","recipe":["blue","purple","white"],"effect":"earsight","name":"Earsight","description":"Each sound sends out a ripple that briefly reveals nearby ground, trees and animals.","comingSoon":true,"id":17},{"key":"blue+pink+pink","recipe":["blue","pink","pink"],"effect":"roadworks","name":"Roadworks","description":"The forest is covered in large traffic cones that shrink until they vanish.","comingSoon":true,"id":18},{"key":"blue+pink+red","recipe":["blue","pink","red"],"effect":"mirrorball","name":"Mirrorball","description":"The moon becomes a giant turning disco ball, sweeping coloured dots of light across the world.","comingSoon":false,"id":19},{"key":"blue+orange+pink","recipe":["blue","pink","orange"],"effect":"drift","name":"Drift","description":"The movement controls slowly rotate, with a dizzy look (gentle screen sway, swirling edges, colour smear).","comingSoon":true,"id":20},{"key":"blue+pink+yellow","recipe":["blue","pink","yellow"],"effect":"blinker","name":"Blinker","description":"Moving on the ground is all blinks, with no blink cooldown.","comingSoon":true,"id":21},{"key":"blue+green+pink","recipe":["blue","pink","green"],"effect":"inverse-perspective","name":"Inverse Perspective","description":"Creatures look bigger the further away they are; up close they all but vanish.","comingSoon":true,"id":22},{"key":"blue+pink+turquoise","recipe":["blue","pink","turquoise"],"effect":"drum-solo","name":"Drum Solo","description":"The music is just a drum solo.","comingSoon":true,"id":23},{"key":"blue+pink+white","recipe":["blue","pink","white"],"effect":"watched","name":"Watched","description":"Every legend on the map stands and stares at her.","comingSoon":true,"id":24},{"key":"blue+red+red","recipe":["blue","red","red"],"effect":"giant-trees","name":"Giant Trees","description":"The trees are three times taller.","comingSoon":false,"id":25},{"key":"blue+orange+red","recipe":["blue","red","orange"],"effect":"night-vision","name":"Night Vision","description":"The forest turns black and phosphor green. A rising electronic whine gives way to creature sounds alone.","comingSoon":false,"id":26},{"key":"blue+red+yellow","recipe":["blue","red","yellow"],"effect":"flask-finder","name":"Flask Finder","description":"Flasks are easier to find.","comingSoon":true,"id":27},{"key":"blue+green+red","recipe":["blue","red","green"],"effect":"left-hook","name":"Left Hook","description":"Unlimited dodges, but they always veer left.","comingSoon":true,"id":28},{"key":"blue+red+turquoise","recipe":["blue","red","turquoise"],"effect":"stiltwalkers","name":"Stiltwalkers","description":"Familiar animal bodies stand high on impossibly long legs, tapering from normal hips to tiny feet.","comingSoon":false,"id":29},{"key":"blue+red+white","recipe":["blue","red","white"],"effect":"thick-canopy","name":"Thick Canopy","description":"The canopy closes over her; every colour grows vivid and the lighting gains deep contrast.","comingSoon":false,"id":30},{"key":"blue+orange+orange","recipe":["blue","orange","orange"],"effect":"the-whole-route","name":"The Whole Route","description":"Her own connected sigil routes shine across the island, visible from end to end.","comingSoon":true,"id":31},{"key":"blue+orange+yellow","recipe":["blue","orange","yellow"],"effect":"dreamseer","name":"Dreamseer","description":"The area a legend's dream points to is easier to see.","comingSoon":true,"id":32},{"key":"blue+green+orange","recipe":["blue","orange","green"],"effect":"paper-theatre","name":"Paper Theatre","description":"Everything becomes flat, wobbling cardboard cutouts.","comingSoon":true,"id":33},{"key":"blue+orange+turquoise","recipe":["blue","orange","turquoise"],"effect":"woodcut","name":"Woodcut","description":"Black-and-white engraving, crosshatched shadows.","comingSoon":false,"id":34},{"key":"blue+orange+white","recipe":["blue","orange","white"],"effect":"kaleidoscope","name":"Kaleidoscope","description":"The screen mirrored into six slices round her.","comingSoon":false,"id":35},{"key":"blue+yellow+yellow","recipe":["blue","yellow","yellow"],"effect":"breathing","name":"Breathing","description":"Ground, trees and rocks swell and shrink with the bpm.","comingSoon":true,"id":36},{"key":"blue+green+yellow","recipe":["blue","yellow","green"],"effect":"daybreak","name":"Daybreak","description":"The sun rises; a bright, ordinary green forest.","comingSoon":true,"id":37},{"key":"blue+turquoise+yellow","recipe":["blue","yellow","turquoise"],"effect":"snow-globe","name":"Snow Globe","description":"Heavy snow, muffled sound, glass-curved screen edges.","comingSoon":true,"id":38},{"key":"blue+white+yellow","recipe":["blue","yellow","white"],"effect":"tiny-witch","name":"Tiny Witch","description":"Quarter size, smaller hitbox, camera at her level.","comingSoon":true,"id":39},{"key":"blue+green+green","recipe":["blue","green","green"],"effect":"giant-witch","name":"Giant Witch","description":"Enormous; nothing else changes.","comingSoon":true,"id":40},{"key":"blue+green+turquoise","recipe":["blue","green","turquoise"],"effect":"featherweight","name":"Featherweight","description":"Sigils weigh nothing, but she floats and can't stop dead on the ground.","comingSoon":true,"id":41},{"key":"blue+green+white","recipe":["blue","green","white"],"effect":"foresight","name":"Foresight","description":"Attack telegraphs twice as early, in garish colours.","comingSoon":true,"id":42},{"key":"blue+turquoise+turquoise","recipe":["blue","turquoise","turquoise"],"effect":"chipmunks","name":"Chipmunks","description":"Every sound at double pitch.","comingSoon":true,"id":43},{"key":"blue+turquoise+white","recipe":["blue","turquoise","white"],"effect":"loop-the-loop","name":"Loop the Loop","description":"Rising does a loop-the-loop instead.","comingSoon":true,"id":44},{"key":"blue+white+white","recipe":["blue","white","white"],"effect":"worm-s-eye","name":"Worm's Eye","description":"The camera drops very low, almost level with the ground.","comingSoon":false,"id":45},{"key":"purple+purple+purple","recipe":["purple","purple","purple"],"effect":"cartoon","name":"Cartoon","description":"Thick outlines, flat colours, a pictorial pow burst on hits.","comingSoon":true,"id":46},{"key":"pink+purple+purple","recipe":["purple","purple","pink"],"effect":"underwater","name":"Underwater","description":"The world ripples like water, sounds turn muffled and bubbly, and movement feels weightless.","comingSoon":true,"id":47},{"key":"purple+purple+red","recipe":["purple","purple","red"],"effect":"moonwalk","name":"Moonwalk","description":"She always faces backwards; 💌s still fly forward.","comingSoon":true,"id":48},{"key":"orange+purple+purple","recipe":["purple","purple","orange"],"effect":"hiccups","name":"Hiccups","description":"A tiny involuntary blink every few seconds.","comingSoon":true,"id":49},{"key":"purple+purple+yellow","recipe":["purple","purple","yellow"],"effect":"stopmotion","name":"Stopmotion","description":"The world at 6 fps; she runs smoothly.","comingSoon":true,"id":50},{"key":"green+purple+purple","recipe":["purple","purple","green"],"effect":"fireflies","name":"Fireflies","description":"Everything moving leaves glowing dots hanging in the air.","comingSoon":true,"id":51},{"key":"purple+purple+turquoise","recipe":["purple","purple","turquoise"],"effect":"heat-vision","name":"Heat Vision","description":"Cold blue scenery surrounds warm animals, glowing hotter with danger. Music falls silent; creature sounds drop an octave beneath slow, muffled mask breathing.","comingSoon":false,"id":52},{"key":"purple+purple+white","recipe":["purple","purple","white"],"effect":"fisheye","name":"Fisheye","description":"Extreme wide angle; she sees further, everything bends.","comingSoon":true,"id":53},{"key":"pink+pink+purple","recipe":["purple","pink","pink"],"effect":"synaesthesia","name":"Synaesthesia","description":"Colours pulse with the music, one colour per instrument, floods on the kick.","comingSoon":true,"id":54},{"key":"pink+purple+red","recipe":["purple","pink","red"],"effect":"mirror-floor","name":"Mirror Floor","description":"The ground becomes a glossy mirror of everything above it.","comingSoon":true,"id":55},{"key":"orange+pink+purple","recipe":["purple","pink","orange"],"effect":"silent-film","name":"Silent Film","description":"Film grain and scratches, sepia, the world as a silent film.","comingSoon":false,"id":56},{"key":"pink+purple+yellow","recipe":["purple","pink","yellow"],"effect":"masterplan","name":"Masterplan","description":"See how packs intend to move and attack: targets, destination slots, roles, formations and attack geometry.","comingSoon":false,"id":57},{"key":"green+pink+purple","recipe":["purple","pink","green"],"effect":"stiltwalkers","name":"Stiltwalkers","description":"Familiar animal bodies stand high on impossibly long legs, tapering from normal hips to tiny feet.","comingSoon":false,"id":58},{"key":"pink+purple+turquoise","recipe":["purple","pink","turquoise"],"effect":"contour-dream","name":"Contour Dream","description":"Vivid contour bands run across ground, animals and scenery.","comingSoon":false,"id":59},{"key":"pink+purple+white","recipe":["purple","pink","white"],"effect":"bottomless","name":"Bottomless","description":"The ground becomes a starfield, with creatures apparently standing over an abyss.","comingSoon":true,"id":60},{"key":"purple+red+red","recipe":["purple","red","red"],"effect":"aurora-outlines","name":"Aurora Outlines","description":"Luminous coloured edges replace most solid surfaces.","comingSoon":false,"id":61},{"key":"orange+purple+red","recipe":["purple","red","orange"],"effect":"folded-space","name":"Folded Space","description":"The landscape folds along fixed creases in the island. She can walk across the ridges and valleys.","comingSoon":false,"id":62},{"key":"purple+red+yellow","recipe":["purple","red","yellow"],"effect":"sliced-world","name":"Sliced World","description":"Horizontal world-height bands disappear, revealing stacked slices through animals and scenery.","comingSoon":true,"id":63},{"key":"green+purple+red","recipe":["purple","red","green"],"effect":"the-audience","name":"The Audience","description":"Amplify existing watching-tree lean and lag until the forest visibly follows her passage.","comingSoon":false,"id":64},{"key":"purple+red+turquoise","recipe":["purple","red","turquoise"],"effect":"concertina","name":"Concertina","description":"Shared scene deformation squeezes and stretches distance sideways.","comingSoon":false,"id":65},{"key":"purple+red+white","recipe":["purple","red","white"],"effect":"far-sight","name":"Far Sight","description":"Nearby scenery dissolves into haze while distant scenery is unnaturally crisp.","comingSoon":true,"id":66},{"key":"orange+orange+purple","recipe":["purple","orange","orange"],"effect":"the-world-is-late","name":"The World Is Late","description":"Her light, canopy opening and tree attention follow her past position, catching up when she stops.","comingSoon":true,"id":67},{"key":"orange+purple+yellow","recipe":["purple","orange","yellow"],"effect":"sympathetic-forest","name":"Sympathetic Forest","description":"Trees crouch with attack wind-up, stretch with lunges and flinch when animals are hit.","comingSoon":true,"id":68},{"key":"green+orange+purple","recipe":["purple","orange","green"],"effect":"bad-reception","name":"Bad Reception","description":"Musical clarity makes the view sharp; damaged music warps habitat patterns and drives mist.","comingSoon":true,"id":69},{"key":"orange+purple+turquoise","recipe":["purple","orange","turquoise"],"effect":"borrowed-habits","name":"Borrowed Habits","description":"Vegetation acquires nearby animals' idle quirks: sniffing, shivering, stretching and happy bouncing.","comingSoon":true,"id":70},{"key":"orange+purple+white","recipe":["purple","orange","white"],"effect":"someone-is-having-a-bad-dream","name":"Someone Is Having a Bad Dream","description":"A legend's growing restlessness changes mist, grade and tree motion; its kin's arrival lets the scene relax.","comingSoon":true,"id":71},{"key":"purple+yellow+yellow","recipe":["purple","yellow","yellow"],"effect":"too-much-happening","name":"Too Much Happening","description":"Nearby combat makes the scene increasingly luminous until a fight dissolves into light, then settles.","comingSoon":true,"id":72},{"key":"green+purple+yellow","recipe":["purple","yellow","green"],"effect":"the-forest-counts","name":"The Forest Counts","description":"Wind and mist advance in musical steps while she and animals remain fluid.","comingSoon":false,"id":73},{"key":"purple+turquoise+yellow","recipe":["purple","yellow","turquoise"],"effect":"spilling-habitats","name":"Spilling Habitats","description":"Ground textures and habitat colours spill across borders while trees and inhabitants stay put.","comingSoon":true,"id":74},{"key":"purple+white+yellow","recipe":["purple","yellow","white"],"effect":"seeing-through-seeing","name":"Seeing Through Seeing","description":"Perceive the masks that erase the canopy to make her visible.","comingSoon":false,"id":75},{"key":"green+green+purple","recipe":["purple","green","green"],"effect":"lovesick-leaves","name":"Lovesick Leaves","description":"Current affection controls nearby leaf colour, glow or motion.","comingSoon":true,"id":76},{"key":"green+purple+turquoise","recipe":["purple","green","turquoise"],"effect":"borrowed-attention","name":"Borrowed Attention","description":"The light pool or canopy opening follows an animal's current target rather than her.","comingSoon":true,"id":77},{"key":"green+purple+white","recipe":["purple","green","white"],"effect":"held-breath","name":"Held Breath","description":"Wave/pulse progress gradually tightens the world bend or swells scenery, releasing as the wave arrives.","comingSoon":false,"id":78},{"key":"purple+turquoise+turquoise","recipe":["purple","turquoise","turquoise"],"effect":"out-of-time","name":"Out of Time","description":"Mist, wind, plants and other animations borrow the wrong clock.","comingSoon":false,"id":79},{"key":"purple+turquoise+white","recipe":["purple","turquoise","white"],"effect":"pack-weather","name":"Pack Weather","description":"A nearby pack's approach, tell, combo and lull become wind and atmospheric phases.","comingSoon":true,"id":80},{"key":"purple+white+white","recipe":["purple","white","white"],"effect":"pressure-beneath-the-feet","name":"Pressure Beneath the Feet","description":"Attack wind-up locally raises or depresses the drawn ground; release sends a ripple.","comingSoon":true,"id":81},{"key":"pink+pink+pink","recipe":["pink","pink","pink"],"effect":"distant-giants","name":"Distant Giants","description":"Scenery grows with distance while nearby trees shrink.","comingSoon":false,"id":82},{"key":"pink+pink+red","recipe":["pink","pink","red"],"effect":"musical-ground","name":"Musical Ground","description":"Bass drives apparent ground height, percussion drives vegetation, melody drives light.","comingSoon":true,"id":83},{"key":"orange+pink+pink","recipe":["pink","pink","orange"],"effect":"forest-current","name":"Forest Current","description":"Pack movement/steering becomes the foliage force field; the entire forest streams toward targets.","comingSoon":true,"id":84},{"key":"pink+pink+yellow","recipe":["pink","pink","yellow"],"effect":"luminous-footprints","name":"Luminous Footprints","description":"Extend the disturbance field's lifetime and colour it so every passage remains visible.","comingSoon":true,"id":85},{"key":"green+pink+pink","recipe":["pink","pink","green"],"effect":"rolling-sea","name":"Rolling Sea","description":"Landing ripples persist and overlap until the ground and its plants roll like waves.","comingSoon":true,"id":86},{"key":"pink+pink+turquoise","recipe":["pink","pink","turquoise"],"effect":"thick-air","name":"Thick Air","description":"Animals pull the image behind them like syrup.","comingSoon":true,"id":87},{"key":"pink+pink+white","recipe":["pink","pink","white"],"effect":"mushroom-lenses","name":"Mushroom Lenses","description":"Mushrooms become local magnifying/distorting lenses.","comingSoon":true,"id":88},{"key":"pink+red+red","recipe":["pink","red","red"],"effect":"underwater-light","name":"Underwater Light","description":"Moving caustic-like patterns sweep over the whole forest without necessarily changing movement or sound.","comingSoon":false,"id":89},{"key":"orange+pink+red","recipe":["pink","red","orange"],"effect":"striped-intentions","name":"Striped Intentions","description":"Attack preparation tightens patterned illumination around its source, then releases.","comingSoon":true,"id":90},{"key":"pink+red+yellow","recipe":["pink","red","yellow"],"effect":"wax-menagerie","name":"Wax Menagerie","description":"Animals gleam like wax, wet paint or polished metal.","comingSoon":true,"id":91},{"key":"green+pink+red","recipe":["pink","red","green"],"effect":"inside-out-relief","name":"Inside-Out Relief","description":"Reverse or exaggerate surface normals so bumps look like hollows and light seems to come from impossible directions.","comingSoon":false,"id":92},{"key":"pink+red+turquoise","recipe":["pink","red","turquoise"],"effect":"living-bark","name":"Living Bark","description":"Bark and surface colour climb trees while silhouettes remain still.","comingSoon":false,"id":93},{"key":"pink+red+white","recipe":["pink","red","white"],"effect":"travelling-markings","name":"Travelling Markings","description":"Animal markings flow independently of their bodies.","comingSoon":true,"id":94},{"key":"orange+orange+pink","recipe":["pink","orange","orange"],"effect":"long-echoes","name":"Long Echoes","description":"Sparse world-position pose echoes become numerous and long-lived.","comingSoon":true,"id":95},{"key":"orange+pink+yellow","recipe":["pink","orange","yellow"],"effect":"recursive-memories","name":"Recursive Memories","description":"Previous screen images shrink, rotate or drift into the current one.","comingSoon":true,"id":96},{"key":"green+orange+pink","recipe":["pink","orange","green"],"effect":"changing-materials","name":"Changing Materials","description":"A moving world-space boundary turns trees to ink, creatures to silhouettes and ground to contours, then restores them.","comingSoon":true,"id":97},{"key":"orange+pink+turquoise","recipe":["pink","orange","turquoise"],"effect":"wandering-shadows","name":"Wandering Shadows","description":"Separate shadows from their owners and drive them from another signal.","comingSoon":true,"id":98},{"key":"orange+pink+white","recipe":["pink","orange","white"],"effect":"growing-personalities","name":"Growing Personalities","description":"Mushrooms become impossibly tall, squat or twisted, with curling stems and lifted cap rims.","comingSoon":true,"id":99},{"key":"pink+yellow+yellow","recipe":["pink","yellow","yellow"],"effect":"hall-of-mirrors","name":"Hall of Mirrors","description":"Every movement leaves an endless trail of overlapping images.","comingSoon":true,"id":100},{"key":"green+pink+yellow","recipe":["pink","yellow","green"],"effect":"glow-up","name":"Glow Up","description":"Everything glows until the forest blazes with light.","comingSoon":false,"id":101},{"key":"pink+turquoise+yellow","recipe":["pink","yellow","turquoise"],"effect":"miniature","name":"Miniature","description":"The island looks like a tiny toy world.","comingSoon":false,"id":102},{"key":"pink+white+yellow","recipe":["pink","yellow","white"],"effect":"little-planet","name":"Little Planet","description":"The world curves sharply away like a tiny planet.","comingSoon":false,"id":103},{"key":"green+green+pink","recipe":["pink","green","green"],"effect":"wireframe","name":"Wireframe","description":"The world becomes a web of fine lines tracing every surface.","comingSoon":true,"id":104},{"key":"green+pink+turquoise","recipe":["pink","green","turquoise"],"effect":"mix-up","name":"Mix-up","description":"Creatures wear mismatched fragments of other creatures’ appearances.","comingSoon":true,"id":105},{"key":"green+pink+white","recipe":["pink","green","white"],"effect":"mannequins","name":"Mannequins","description":"Everyone freezes in a single pose and slides across the ground.","comingSoon":true,"id":106},{"key":"pink+turquoise+turquoise","recipe":["pink","turquoise","turquoise"],"effect":"cutaway","name":"Cutaway","description":"Nearby surfaces disappear, revealing the insides of trees and the treehouse.","comingSoon":true,"id":107},{"key":"pink+turquoise+white","recipe":["pink","turquoise","white"],"effect":"hue-spin","name":"Hue Spin","description":"Every colour slowly turns into another.","comingSoon":false,"id":108},{"key":"pink+white+white","recipe":["pink","white","white"],"effect":"vertigo","name":"Vertigo","description":"Treetop flight feels dizzyingly high: a wide, steep view and blurred distant ground exaggerate the drop below.","comingSoon":false,"id":109},{"key":"red+red+red","recipe":["red","red","red"],"effect":"unassigned-110","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":110},{"key":"orange+red+red","recipe":["red","red","orange"],"effect":"unassigned-111","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":111},{"key":"red+red+yellow","recipe":["red","red","yellow"],"effect":"unassigned-112","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":112},{"key":"green+red+red","recipe":["red","red","green"],"effect":"unassigned-113","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":113},{"key":"red+red+turquoise","recipe":["red","red","turquoise"],"effect":"unassigned-114","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":114},{"key":"red+red+white","recipe":["red","red","white"],"effect":"unassigned-115","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":115},{"key":"orange+orange+red","recipe":["red","orange","orange"],"effect":"unassigned-116","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":116},{"key":"orange+red+yellow","recipe":["red","orange","yellow"],"effect":"unassigned-117","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":117},{"key":"green+orange+red","recipe":["red","orange","green"],"effect":"unassigned-118","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":118},{"key":"orange+red+turquoise","recipe":["red","orange","turquoise"],"effect":"unassigned-119","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":119},{"key":"orange+red+white","recipe":["red","orange","white"],"effect":"unassigned-120","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":120},{"key":"red+yellow+yellow","recipe":["red","yellow","yellow"],"effect":"unassigned-121","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":121},{"key":"green+red+yellow","recipe":["red","yellow","green"],"effect":"unassigned-122","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":122},{"key":"red+turquoise+yellow","recipe":["red","yellow","turquoise"],"effect":"unassigned-123","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":123},{"key":"red+white+yellow","recipe":["red","yellow","white"],"effect":"unassigned-124","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":124},{"key":"green+green+red","recipe":["red","green","green"],"effect":"unassigned-125","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":125},{"key":"green+red+turquoise","recipe":["red","green","turquoise"],"effect":"unassigned-126","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":126},{"key":"green+red+white","recipe":["red","green","white"],"effect":"unassigned-127","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":127},{"key":"red+turquoise+turquoise","recipe":["red","turquoise","turquoise"],"effect":"unassigned-128","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":128},{"key":"red+turquoise+white","recipe":["red","turquoise","white"],"effect":"unassigned-129","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":129},{"key":"red+white+white","recipe":["red","white","white"],"effect":"unassigned-130","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":130},{"key":"orange+orange+orange","recipe":["orange","orange","orange"],"effect":"unassigned-131","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":131},{"key":"orange+orange+yellow","recipe":["orange","orange","yellow"],"effect":"unassigned-132","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":132},{"key":"green+orange+orange","recipe":["orange","orange","green"],"effect":"unassigned-133","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":133},{"key":"orange+orange+turquoise","recipe":["orange","orange","turquoise"],"effect":"unassigned-134","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":134},{"key":"orange+orange+white","recipe":["orange","orange","white"],"effect":"unassigned-135","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":135},{"key":"orange+yellow+yellow","recipe":["orange","yellow","yellow"],"effect":"unassigned-136","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":136},{"key":"green+orange+yellow","recipe":["orange","yellow","green"],"effect":"unassigned-137","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":137},{"key":"orange+turquoise+yellow","recipe":["orange","yellow","turquoise"],"effect":"unassigned-138","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":138},{"key":"orange+white+yellow","recipe":["orange","yellow","white"],"effect":"unassigned-139","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":139},{"key":"green+green+orange","recipe":["orange","green","green"],"effect":"unassigned-140","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":140},{"key":"green+orange+turquoise","recipe":["orange","green","turquoise"],"effect":"unassigned-141","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":141},{"key":"green+orange+white","recipe":["orange","green","white"],"effect":"unassigned-142","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":142},{"key":"orange+turquoise+turquoise","recipe":["orange","turquoise","turquoise"],"effect":"unassigned-143","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":143},{"key":"orange+turquoise+white","recipe":["orange","turquoise","white"],"effect":"unassigned-144","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":144},{"key":"orange+white+white","recipe":["orange","white","white"],"effect":"unassigned-145","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":145},{"key":"yellow+yellow+yellow","recipe":["yellow","yellow","yellow"],"effect":"unassigned-146","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":146},{"key":"green+yellow+yellow","recipe":["yellow","yellow","green"],"effect":"unassigned-147","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":147},{"key":"turquoise+yellow+yellow","recipe":["yellow","yellow","turquoise"],"effect":"unassigned-148","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":148},{"key":"white+yellow+yellow","recipe":["yellow","yellow","white"],"effect":"unassigned-149","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":149},{"key":"green+green+yellow","recipe":["yellow","green","green"],"effect":"unassigned-150","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":150},{"key":"green+turquoise+yellow","recipe":["yellow","green","turquoise"],"effect":"unassigned-151","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":151},{"key":"green+white+yellow","recipe":["yellow","green","white"],"effect":"unassigned-152","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":152},{"key":"turquoise+turquoise+yellow","recipe":["yellow","turquoise","turquoise"],"effect":"unassigned-153","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":153},{"key":"turquoise+white+yellow","recipe":["yellow","turquoise","white"],"effect":"unassigned-154","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":154},{"key":"white+white+yellow","recipe":["yellow","white","white"],"effect":"unassigned-155","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":155},{"key":"green+green+green","recipe":["green","green","green"],"effect":"unassigned-156","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":156},{"key":"green+green+turquoise","recipe":["green","green","turquoise"],"effect":"unassigned-157","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":157},{"key":"green+green+white","recipe":["green","green","white"],"effect":"unassigned-158","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":158},{"key":"green+turquoise+turquoise","recipe":["green","turquoise","turquoise"],"effect":"unassigned-159","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":159},{"key":"green+turquoise+white","recipe":["green","turquoise","white"],"effect":"unassigned-160","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":160},{"key":"green+white+white","recipe":["green","white","white"],"effect":"unassigned-161","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":161},{"key":"turquoise+turquoise+turquoise","recipe":["turquoise","turquoise","turquoise"],"effect":"unassigned-162","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":162},{"key":"turquoise+turquoise+white","recipe":["turquoise","turquoise","white"],"effect":"unassigned-163","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":163},{"key":"turquoise+white+white","recipe":["turquoise","white","white"],"effect":"unassigned-164","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":164},{"key":"white+white+white","recipe":["white","white","white"],"effect":"unassigned-165","name":"Unassigned recipe","description":"This combination has not been assigned an effect yet.","comingSoon":true,"id":165}]`),Xx=Wx,qx=new Map(Xx.map(i=>[i.key,i])),_h=i=>qx.get(typeof i=="string"?i:[...i].sort().join("+"));function pl(i,e){return!i||e<i.at?0:Math.max(0,Math.min(1,(i.until-e)/120))}const de=(i,e,t,n,r,s=.05)=>({key:i,label:e,default:t,min:n,max:r,step:s}),ml={masterplan:[de("range","Visible animal plans (metres)",60,10,160,1),de("opacity","Plan line brightness",.85,.1,1)],mirrorball:[de("size","Mirror moon size × normal",5,1,12,.25),de("spin","Ball rotation (radians per second)",.32,.02,1,.01),de("spots","Reflected light brightness",1.4,0,4,.1)],woodcut:[de("spacing","Hatch spacing (art pixels)",5,3,12,1)],kaleidoscope:[de("sectors","Mirrored wedges",6,4,16,2)],"hue-spin":[de("period","Colour cycle (game seconds)",20,2,120,1),de("offset","Starting colour rotation (degrees)",120,0,360,1),de("strength","Colour rotation strength",1,0,1),de("soundDepth","Sound sweep (octaves)",2,0,4,.1)],"night-vision":[de("brightness","Shadow brightness",3,1,6,.1),de("blackFloor","Black level",0,0,.3,.01),de("grade","Night-colour strength × normal",.2,0,1,.05)],"heat-vision":[de("coldBrightness","Cold scenery brightness",.35,.1,1,.05),de("dangerGain","Danger heat strength",1,0,2,.1),de("breathVolume","Mask breathing volume",.35,0,1,.05),de("breathRate","Breaths per second",.18,.08,.5,.01)],"the-forest-counts":[de("beats","Beats per scenery step",1,.25,4,.25),de("speed","Scenery clock speed",4,.25,12,.25),de("soundDepth","Stepped sound range (octaves)",2,0,4,.1)],"the-audience":[de("radius","Watching distance (metres)",35,0,100,1),de("lean","Tree lean (metres)",4,0,12,.1),de("lag","Following delay (seconds)",2,.05,8,.05)],chunky:[de("multiplier","Pixel size × normal",4,1,12,.25)],"trip-audio":[de("mix","Trip sound treatment",1,0,1),de("cutoff","Sound brightness (Hz)",2600,200,12e3,100),de("motion","Sound brightness motion (octaves)",.6,0,2,.05),de("speed","Sound motion speed (Hz)",.18,.02,2,.02),de("flutter","Sound flutter",.18,0,.7,.01)],miniature:[de("blur","Toy-world blur",7,0,16,.1),de("band","Sharp strip width",.12,.02,1,.01),de("centre","Focus position from top",.55,0,1,.01)],"worm-s-eye":[de("angle","Low camera angle (degrees)",3,1,25,.5),de("distance","Camera distance × normal",.4,.1,2,.05)],stiltwalkers:[de("length","Leg extension",6,1,12,.25),de("tip","Leg-tip thickness × hip",.08,.02,.5,.01)],"folded-space":[de("period","Metres between ridges",40,16,100,1),de("height","Fold height (metres)",18,0,50,1)],"silent-film":[de("grain","Film grain",.16,0,.4,.01),de("scratches","Scratched frames",.28,0,1,.01),de("rate","Film frames per second",12,4,24,1)],"contour-dream":[de("interval","Metres between contours",1.5,.25,5,.05),de("width","Contour line width",.12,.04,.4,.01)],"walking-wood":[de("value","Stride length (metres)",3,.25,8,.25)],"giant-trees":[de("value","Tree height × normal",3,1,6,.1)],concertina:[de("value","Pleat spacing (metres)",55,15,120,1)],"seeing-through-seeing":[de("value","Mask ink brightness",.9,.1,1,.05)],"held-breath":[de("value","Peak ground bend",.002,1e-4,.01,1e-4)],"out-of-time":[de("value","Clock excursion (seconds)",7,1,20,.5)],"distant-giants":[de("value","Distant scenery scale",3.5,1.5,7,.1)],"underwater-light":[de("value","Caustic brightness",1.8,.2,4,.1)],"inside-out-relief":[de("value","Reversed relief",1,.1,2,.1)],"living-bark":[de("value","Colour climb (metres/second)",2,.2,6,.1)],"trip-indicator":[de("strength","Edge wobble (art pixels)",1.5,0,30,.1),de("speed","Wobble speed",1.2,0,12,.1),de("waveSize","Wave size (screen fraction)",.3,.02,2,.01),de("reach","Reach from screen edges",.2,0,1,.01)],ravine:[de("bendMultiplier","Upward bend × treetop bend",2,0,30,.1),de("minimumBend","Minimum upward bend",.001,0,.03,1e-4)],"little-planet":[de("bendMultiplier","Extra bend × treetop bend",6,0,50,.1),de("minimumBend","Minimum extra bend",.002,0,.05,1e-4)],"glow-up":[de("thresholdScale","Bloom threshold × normal",0,0,2),de("minimumBoost","Minimum bloom boost",1.5,0,12,.1),de("strengthMultiplier","Extra bloom × normal strength",3,0,20,.1)],"big-moon":[de("size","Moon size × normal",10,.1,40,.1),de("glow","Moon glow × normal",6,0,30,.1)],"thick-canopy":[de("closure","Canopy closure",1,0,1),de("saturation","Colour saturation",1.9,0,5,.1),de("blackFloor","Black point",.16,0,.8,.01),de("gamma","Lighting contrast × normal",1.2,.2,4)],vertigo:[de("angle","Camera angle (degrees)",72,10,85,1),de("angleMix","Camera angle influence",.7,0,1),de("distance","Camera distance × normal",1.8,.5,5,.1),de("fov","Wide field of view (degrees)",80,30,120,1),de("blur","Extra distance blur",5,0,20,.1),de("band","Sharp band × normal",.3,.05,2)],"aurora-outlines":[de("strength","Outline effect strength",1,0,1),de("edgeLow","Edge threshold",.025,0,1,.005),de("edgeHigh","Edge softness upper threshold",.3,.005,2,.005),de("background","Original surface brightness",.035,0,1,.005)],skylight:[de("ground","Ground disappearance",1,0,1),de("foliage","Small foliage disappearance",1,0,1)]},Zs=Object.fromEntries(Object.entries(ml).map(([i,e])=>[i,Object.fromEntries(e.map(t=>[t.key,t.default]))])),At=i=>Zs[i]??{};function _S(i,e,t){const n=ml[i]?.find(r=>r.key===e);!n||!Number.isFinite(t)||(Zs[i][e]=Math.max(n.min,Math.min(n.max,t)))}function yS(i){for(const[e,t]of Object.entries(ml))if(!i||i===e)for(const n of t)Zs[e][n.key]=n.default}const SS=()=>({version:1,effects:Object.fromEntries(Object.entries(Zs).map(([i,e])=>[i,{...e}]))});function Yx(i,e){const t=Math.max(0,Math.min(1,e));if(!t)return i;const n=At("miniature"),r=(s,a)=>s+(a-s)*t;return{...i,on:!0,strength:r(i.on?i.strength:0,n.blur),band:r(i.band,n.band),centre:r(i.centre,n.centre),treetop:{...i.treetop,strength:r(i.on?i.treetop.strength:0,n.blur),band:r(i.treetop.band,n.band)}}}function MS(i,e){const t=Math.max(0,Math.min(1,e)),n=At("the-audience"),r=i??{on:!1,radius:9,lean:0,lag:.45};return t?{on:!0,radius:r.radius+(n.radius-r.radius)*t,lean:(r.on?r.lean:0)*(1-t)+n.lean*t,lag:r.lag+(n.lag-r.lag)*t}:r}function bS(i){const e=Math.max(0,Math.min(1,i)),t=At("stiltwalkers");return{length:1+(t.length-1)*e,tip:e?t.tip:1,strength:e}}const wS=i=>pl(i.mushrooms?.trips[i.witches[0]?.id??0],i.clock.time);function $x(i){const e=Math.cos(i),t=Math.sin(i)/Math.sqrt(3),n=(1-e)/3;return[e+n,n-t,n+t]}function ES(i,e,t){if(t<=0)return i;const n=1+(At("chunky").multiplier-1)*t;return n===1?i:Math.max(i,Math.round(i*n*e)/e)}function TS(i,e){const t=i.mushrooms?.trips[i.witches[0]?.id??0],n=t&&_h(t.key);return n&&!n.comingSoon&&n.effect===e?pl(t,i.clock.time):0}const AS=(i,e,t,n)=>{const r=At("ravine"),s=At("little-planet");return i*(1-t)-Math.max(r.minimumBend,e*r.bendMultiplier)*t+Math.max(s.minimumBend,e*s.bendMultiplier)*n},Kx=(i,e,t)=>{const n=At("glow-up");return{threshold:i*(1+(n.thresholdScale-1)*t),strength:e+Math.max(n.minimumBoost,e*n.strengthMultiplier)*t}},RS=(i,e)=>i*Math.max(0,Math.min(1,e)),CS=(i,e,t,n)=>{const r=At("vertigo");return{angle:i+(r.angle-i)*n*r.angleMix,distance:e*(1+(r.distance-1)*n),fov:t+(r.fov-t)*n}},PS=(i,e,t)=>{if(t<=0)return{angle:i,distance:e};const n=At("worm-s-eye");return{angle:i+(n.angle-i)*t,distance:e*(1+(n.distance-1)*t)}},Zx=(i,e,t)=>{const n=At("thick-canopy");return{black:i+(n.blackFloor-i)*t,gamma:e*(1+(n.gamma-1)*t),saturation:1+(n.saturation-1)*t}};function Jx(i,e,t,n){if(n<=0)return{black:i,gamma:e,grade:t};const r=At("night-vision");return{black:i+(r.blackFloor-i)*n,gamma:e*(1+(1/r.brightness-1)*n),grade:t*(1+(r.grade-1)*n)}}const ai=4,ka=2,ds=1,tu=2/(2**24-1),Oa=.65;class Qx{shapes=Array.from({length:ai},()=>new Ye);states=Array.from({length:ai},()=>new Ye);count=0;world=null;time=-1/0;castAt=null;rings=[];point=new B;edge=new B;right=new B;reset(){this.count=0,this.rings.length=0,this.castAt=null,this.time=-1/0,this.world=null}update(e,t,n,r,s,a,o,l){(e!==this.world||t<this.time)&&this.reset(),this.world=e,this.time=t,this.count=0,s&&s.at<=t&&s.at!==this.castAt&&Number.isFinite(s.at)&&(this.castAt=s.at,t>=s.at&&t-s.at<Oa&&(this.rings.length>=ai-1&&this.rings.shift(),this.rings.push({...s})));let c=0;for(const d of this.rings)t>=d.at&&t-d.at<Oa&&(this.rings[c++]=d);if(this.rings.length=c,!n)return;let u=6400;for(const d of r){const h=(d.x-l.x)**2+(d.z-l.z)**2;if(d.scale>.1&&h<u){const p=this.count;this.count=0,this.project(d.x,2.3,d.z,1.1,2.2,0,t%120,Math.min(1,d.scale)*1.5,0,a,o),this.count?u=h:this.count=p}}for(const d of this.rings)this.project(d.x,d.y,d.z,8,8,1,(t-d.at)/Oa,2,d.baseY??0,a,o)}project(e,t,n,r,s,a,o,l,c,u,d){if(this.count>=ai)return;const h=d(this.point.set(e,t,n));if(this.edge.copy(h).applyMatrix4(u.matrixWorldInverse),this.edge.z>=-u.near||(h.project(u),h.z<-1||h.z>1))return;const p=h.x*.5+.5,g=h.y*.5+.5,y=this.right.setFromMatrixColumn(u.matrixWorld,0).multiplyScalar(r);d(this.edge.set(e,t,n)).add(y).project(u);const m=Math.abs(this.edge.x*.5+.5-p);if(d(this.edge.set(e,t+s,n)).project(u),this.edge.z<-1||this.edge.z>1)return;const f=Math.abs(this.edge.y*.5+.5-g);d(this.edge.set(e,c,n)).project(u);const S=Math.max(h.z,this.edge.z)*.5+.5;!(m>0&&f>0)||p+m<0||p-m>1||g+f<0||g-f>1||(this.shapes[this.count].set(p,g,m,f),this.states[this.count++].set(S,a,o,l))}}const jx=`
uniform sampler2D uRefractionDepth;
uniform int uRefractionCount;
uniform vec4 uRefractionShape[${ai}]; // centre uv, half-width/height uv
uniform vec4 uRefractionState[${ai}]; // protected support depth, kind (plume/ring), clock/phase, art-pixel strength
float refractionDepthAt(vec2 p) {
  // Exact DEPTH24 texels plus a one-art-pixel foreground halo protect thin/faint silhouette edges.
  ivec2 size = textureSize(uRefractionDepth, 0), cell = ivec2(floor(p * vec2(size)));
  float depth = 1.0;
  for (int y = -${ds}; y <= ${ds}; y++) for (int x = -${ds}; x <= ${ds}; x++) {
    ivec2 at = clamp(cell + ivec2(x, y), ivec2(0), size - ivec2(1));
    depth = min(depth, texelFetch(uRefractionDepth, at, 0).r);
  }
  return depth;
}
vec2 refractScene(vec2 p) {
  if (uRefractionCount == 0) return p;
  float depth = -1.0;
  float guardDepth = 0.0;
  vec2 offset = vec2(0.0);
  for (int i = 0; i < ${ai}; i++) {
    if (i >= uRefractionCount) break;
    vec4 shape = uRefractionShape[i], state = uRefractionState[i];
    vec2 q = (p - shape.xy) / max(shape.zw, vec2(0.000001));
    float r = length(q), mask;
    vec2 direction;
    if (state.y < 0.5) {
      mask = max(0.0, 1.0 - dot(q, q)); mask *= mask;
      direction = vec2(sin(q.y * 11.0 - state.z * 3.0), 0.25 * sin(q.x * 9.0 + q.y * 6.0 - state.z * 2.0));
    } else {
      mask = max(0.0, 1.0 - abs(r - state.z) / 0.12); mask *= mask * (1.0 - state.z);
      direction = r > 0.00001 ? q / r : vec2(0.0);
    }
    if (mask <= 0.0) continue;
    if (depth < 0.0) depth = refractionDepthAt(p);
    if (depth < state.x + ${tu.toFixed(12)}) continue;
    guardDepth = max(guardDepth, state.x);
    offset += direction * mask * state.w;
  }
  // Whole art-pixel offsets and texel-centre clamps: never borrow a hidden/imaginary screen pixel.
  offset = floor(clamp(offset, vec2(-${ka.toFixed(1)}), vec2(${ka.toFixed(1)})) + 0.5);
  if (all(equal(offset, vec2(0.0)))) return p;
  vec2 at = (clamp(floor(p * uLow) + offset, vec2(0.0), uLow - 1.0) + 0.5) / uLow;
  // Keep the refraction displacement bounded even for diagnostic fractional coordinates.
  if (any(greaterThan(abs(at - p) * uLow, vec2(${ka.toFixed(1)} + 0.0001)))) return p;
  float sourceDepth = refractionDepthAt(at);
  // Conservative source guard too: background heat cannot pull a foreground silhouette sideways.
  if (sourceDepth < guardDepth + ${tu.toFixed(12)}) return p;
  return at;
}
`,e_=1,t_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",n_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,i_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,r_=`
uniform sampler2D uSrc; uniform vec2 uAt; uniform float uR, uSoft, uAspect, uAll, uK; varying vec2 vUv;
void main() {
  float d = length((vUv - uAt) * vec2(uAspect, 1.0));
  float hidden = uAll > 0.5 ? 1.0 - uK : smoothstep(uR - uSoft, uR, d);
  gl_FragColor = vec4(texture2D(uSrc, vUv).rgb, hidden);
}`,s_="uniform sampler2D uSrc; varying vec2 vUv; void main() { gl_FragColor = texture2D(uSrc, vUv); }",a_=.8,o_=`
uniform vec4 uPotionStyle; // saturation boost, edges, edge threshold, edge upper threshold
uniform vec4 uSilentFilm; // envelope, grain, scratch probability, frame rate
uniform float uPotionBackground, uPotionTime, uNightVision;
uniform vec4 uPrintFold; // print amount, hatch spacing, folded view amount, wedge count
uniform vec4 uPotionHue; // cyclic RGB rotation coefficients, blend strength
uniform vec4 uPotionWobble; // amplitude in art pixels, speed, wave size, edge reach
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uBroken, uPotionFade; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
${jx}
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
  vec2 sampleUv = vUv;
  if (uPrintFold.z > 0.0) {
    vec2 centre = uPool.z > 0.0 ? uPool.xy : vec2(0.5);
    vec2 q = (p - centre) * uLow;
    float wedge = 6.2831853 / uPrintFold.w;
    float angle = abs(mod(atan(q.y, q.x) + wedge, 2.0 * wedge) - wedge);
    vec2 folded = centre + length(q) * vec2(cos(angle), sin(angle)) / uLow;
    sampleUv = mix(vUv, clamp(folded, 0.5 / uLow, 1.0 - 0.5 / uLow), uPrintFold.z);
    p = (floor(sampleUv * uLow) + 0.5) / uLow;
  }
  p = refractScene(p);
  if (uPotionWobble.x > 0.0 && uPotionWobble.w > 0.0) {
    float edge = smoothstep(1.0 - uPotionWobble.w, 1.0, max(abs(vUv.x * 2.0 - 1.0), abs(vUv.y * 2.0 - 1.0)));
    vec2 wave = sin(vec2(vUv.y, vUv.x) * (6.2831853 / uPotionWobble.z) + uPotionTime * uPotionWobble.y + vec2(0.0, 1.7));
    p = clamp(p + wave * edge * uPotionWobble.x / uLow, 0.5 / uLow, 1.0 - 0.5 / uLow);
  }
  vec3 c = texture2D(uScene, p).rgb;
  // (the circle hunt: a scene pixel that's not a number, infinite or negative shows red, magenta or yellow)
  if (uBroken > 0.5) { bool nan = !(c.r == c.r) || !(c.g == c.g) || !(c.b == c.b) || any(isnan(c)); if (nan) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; } if (any(isinf(c)) || max(c.r, max(c.g, c.b)) > 60000.0) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } if (min(c.r, min(c.g, c.b)) < 0.0) { gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); return; } }
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, sampleUv); c = c * (1.0 - f.a) + f.rgb; }
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
    float pool = uPool.z > 0.0 ? 1.0 - smoothstep(0.35, 1.0, length((sampleUv - uPool.xy) / uPool.zw)) : 0.0;
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${a_.toFixed(2)} * pool));
  }
  c += texture2D(uBloom, uPotionWobble.x > 0.0 ? p : sampleUv).rgb * uBloomStrength;
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
  if (uPrintFold.x > 0.0) {
    vec2 px = floor(p * uLow);
    float tone = sqrt(clamp(dot(c, vec3(.30, .55, .15)), 0.0, 1.0));
    float ink = max(step(tone * uPrintFold.y, mod(px.x + px.y, uPrintFold.y)),
      step(min(1.0, tone * 2.0) * uPrintFold.y, mod(px.x - px.y, uPrintFold.y)));
    ink = max(ink, smoothstep(.12, .35, potionEdge(p)));
    c = mix(c, mix(vec3(.98, .95, .85), vec3(.055, .042, .065), ink), uPrintFold.x);
  }
  if (uNightVision > 0.0) {
    float phosphor = clamp(dot(c, vec3(0.3, 0.55, 0.15)), 0.0, 1.0);
    vec3 green = mix(vec3(0.025, 0.95, 0.12) * phosphor, vec3(0.78, 1.0, 0.72), smoothstep(0.65, 1.0, phosphor));
    c = mix(c, green, uNightVision);
  }
  if (uSilentFilm.x > 0.0) {
    float frame = floor(uPotionTime * uSilentFilm.w);
    vec2 px = floor(vUv * uLow);
    float grain = irisHash(dot(px, vec2(1., 93.)) + frame * 57.) - .5;
    float exposure = sqrt(clamp(dot(c, vec3(.299, .587, .114)), 0., 1.));
    float scratchX = floor(irisHash(floor(frame / 4.)) * uLow.x);
    float scratch = (1. - step(.5, abs(px.x - scratchX))) * step(1. - uSilentFilm.z, irisHash(frame + 11.));
    vec3 printColour = vec3(1., .83, .58) * clamp(exposure + grain * uSilentFilm.y + .27 * scratch, 0., 1.);
    c = mix(c, printColour, uSilentFilm.x);
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
}`,l_=`
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
}`;function Vn(i,e,t,n=!1){const r=new Wt(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,stencilBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=fn,r}class c_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Vn(1,1,at,!0),this.scene.depthTexture=new Ji(1,1,Zi),this.scene.depthTexture.format=qn,this.fx.texture.format=Jt;const n=(r,s)=>new wt({vertexShader:t_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(n_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(i_,{uSrc:{value:null},uStep:{value:new Ee}}),copy:n(s_,{uSrc:{value:null}}),veil:Object.assign(n(r_,{uSrc:{value:null},uAt:{value:new Ee(.5,.5)},uR:{value:0},uSoft:{value:.15},uAspect:{value:1},uAll:{value:0},uK:{value:0}}),{transparent:!0,blending:Gi}),composite:n(o_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ee},uBloomStrength:{value:0},uKoDim:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0},uBroken:{value:0},uGrade:{value:new Ye},uPool:{value:new Ye},uIris:{value:new Ye},uIris2:{value:new Ye},uGradeTint:{value:new B(1,1,1)}}),tilt:n(l_,{uSrc:{value:null},uDepth:{value:null},uTexel:{value:new Ee},uDir:{value:new Ee},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5},uSkyBlur:{value:1},uSharp:{value:null},uSharpOn:{value:0}})},this.mats.composite.uniforms.uPotionFade={value:0},this.mats.composite.uniforms.uPotionStyle={value:new Ye},this.mats.composite.uniforms.uPotionBackground={value:.035},this.mats.composite.uniforms.uPrintFold={value:new Ye(0,5,0,6)},this.mats.composite.uniforms.uPotionHue={value:new Ye(1,0,0,0)},this.mats.composite.uniforms.uSilentFilm={value:new Ye},this.mats.composite.uniforms.uNightVision={value:0},this.mats.composite.uniforms.uPotionTime={value:0},this.mats.composite.uniforms.uPotionWobble={value:new Ye},this.mats.composite.uniforms.uRefractionDepth={value:this.scene.depthTexture},this.mats.composite.uniforms.uRefractionCount={value:0},this.mats.composite.uniforms.uRefractionShape={value:this.refraction.shapes},this.mats.composite.uniforms.uRefractionState={value:this.refraction.states},this.quad=new ht(new Pn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;refraction=new Qx;refractionEnabled=new URLSearchParams(globalThis.location?.search??"").get("refraction")==="1";refractionParty=!1;scene;bright=Vn(1,1,at);bloomB=Vn(1,1,at);a=Vn(1,1,at);b=Vn(1,1,at);fx=Vn(1,1,at);fxB=Vn(1,1,at);sharpMask=Vn(1,1,xt);sharp=[];fxScene=null;quad;cam=new Ys(-1,1,1,-1,0,1);mats;low=new Ee(1,1);out=new Ee(1,1);fxRes=new Ee(1,1);lift=0;potionGlow=0;bedBloom=1;potionCanopy=0;potionNightVision=0;potionVertigo=0;potionMiniature=0;potionWoodcut=0;potionFold=0;potionHue=0;potionHuePhase=0;potionEdges=0;potionWobble=0;potionSilentFilm=0;potionTime=0;tilt=1;get pool(){return this.mats.composite.uniforms.uPool.value}get iris(){return this.mats.composite.uniforms.uIris.value}get iris2(){return this.mats.composite.uniforms.uIris2.value}set koDim(e){this.mats.composite.uniforms.uKoDim.value=e}set potionFade(e){this.mats.composite.uniforms.uPotionFade.value=Math.max(0,Math.min(1,e))}get sceneTarget(){return this.scene}get lowSize(){return this.low}get fxSize(){return this.fxRes}sizes(){return{scene:[this.scene.width,this.scene.height],fx:[this.fx.width,this.fx.height],bloom:[this.bright.width,this.bright.height],out:[this.out.x,this.out.y]}}resize(e,t,n,r){this.low.set(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.fxRes.set(s,a),this.fx.setSize(s,a),this.fxB.setSize(s,a),this.out.set(n,r),this.scene.setSize(e,t);const o=Math.max(1,Math.round(e/2)),l=Math.max(1,Math.round(t/2));this.bright.setSize(o,l),this.bloomB.setSize(o,l),this.a.setSize(e,t),this.b.setSize(e,t),this.sharpMask.setSize(e,t)}behind=1;behindAt=null;drawScene(e,t){const n=this.renderer,r=this.behind;if(r>=1){n.render(e,t);return}const s=n.getRenderTarget();if(r<=0||!s){this.houseAlone(e,t);return}this.houseAlone(e,t),this.pass("copy",this.a,p=>{p.uSrc.value=s.texture}),n.setRenderTarget(s),n.render(e,t);const a=s.width,o=s.height,l=a/o,c=this.behindAt,u=c?Math.max(...[[0,0],[1,0],[0,1],[1,1]].map(([p,g])=>Math.hypot((p-c.x)*l,g-c.y))):0,d=.15,h=n.autoClear;n.autoClear=!1;try{this.pass("veil",s,p=>{p.uSrc.value=this.a.texture,p.uAll.value=c?0:1,p.uK.value=r,p.uAt.value.copy(c??p.uAt.value),p.uAspect.value=l,p.uSoft.value=d,p.uR.value=r*(u+d)})}finally{n.autoClear=h}}houseAlone(e,t){const n=this.renderer,r=t.layers.mask,s=n.autoClear,a=e.background,o=n.getClearColor(this.clear),l=n.getClearAlpha();t.layers.set(e_),n.setClearColor(0,1),n.autoClear=!0,e.background=null;try{n.render(e,t)}finally{e.background=a,n.setClearColor(o,l),t.layers.mask=r,n.autoClear=s}}clear=new Be;pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}compile(){const e=new ko;for(const t of Object.values(this.mats)){const n=new ht(this.quad.geometry,t);n.frustumCulled=!1,e.add(n)}return this.renderer.compileAsync(e,this.cam)}sceneMs=0;render(e,t){zx(this.renderSteps(e,t))}*renderSteps(e,t,n=!0){const r=n?null:this.b,s=this.renderer,a=this.tuning;s.setRenderTarget(this.scene);const o=performance.now();this.drawScene(e,t),this.sceneMs=performance.now()-o,yield;const l=Kx(a.bloom.threshold,a.bloom.on?a.bloom.strength*this.bedBloom:0,this.potionGlow),c=l.strength>0;if(c){const f=this.bright.width,S=this.bright.height;this.pass("bright",this.bright,R=>{R.uScene.value=this.scene.texture,R.uThreshold.value=l.threshold}),yield;for(let R=0;R<2;R++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/S)}),yield}const u=!!this.fxScene&&a.suspects.effectsLayer;if(this.fxScene){const f=s.getClearColor(new Be),S=s.getClearAlpha();s.setRenderTarget(this.fx),s.setClearColor(0,0),s.clear(),s.render(this.fxScene,t),s.setClearColor(f,S),yield;const R=this.low.x,v=this.low.y;this.pass("blur",this.fxB,M=>{M.uSrc.value=this.fx.texture,M.uStep.value.set(.6/R,0)}),this.pass("blur",this.fx,M=>{M.uSrc.value=this.fxB.texture,M.uStep.value.set(0,.6/v)}),yield}const d=Yx(a.tiltShift,this.potionMiniature),h=(d.on&&d.strength>0||this.potionVertigo>0)&&this.tilt>0;if(this.pass("composite",h?this.a:r,f=>{f.uRefractionCount.value=this.refractionEnabled||this.refractionParty?this.refraction.count:0,f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=c?l.strength:0;const S=Zx(a.tone.black,a.tone.gamma,this.potionCanopy);f.uBlack.value=S.black,f.uGamma.value=S.gamma;const R=At("aurora-outlines"),v=At("trip-indicator");f.uPotionStyle.value.set(S.saturation-1,this.potionEdges*R.strength,R.edgeLow,R.edgeHigh),f.uPotionBackground.value=R.background;const M=At("silent-film");f.uSilentFilm.value.set(this.potionSilentFilm,M.grain,M.scratches,M.rate),f.uNightVision.value=this.potionNightVision,f.uPotionTime.value=this.potionTime,f.uPrintFold.value.set(this.potionWoodcut,At("woodcut").spacing,this.potionFold,Math.round(At("kaleidoscope").sectors/2)*2);const E=$x(this.potionHuePhase);if(f.uPotionHue.value.set(...E,this.potionHue*At("hue-spin").strength),f.uPotionWobble.value.set(v.strength*this.potionWobble,v.speed,v.waveSize,v.reach),f.uFx.value=this.fx.texture,f.uFxOn.value=u?1:0,f.uBroken.value=a.suspects.showBroken?1:0,this.setGrade(f),this.potionNightVision>0){const A=Jx(f.uBlack.value,f.uGamma.value,f.uGrade.value.x,this.potionNightVision);f.uBlack.value=A.black,f.uGamma.value=A.gamma,f.uGrade.value.x=A.grade}}),!h)return;yield;const p=this.drawSharp(t),g=this.a.width,y=this.a.height,m=f=>{const S=d,R=Math.max(0,Math.min(1,this.lift)),v=R*R*(3-2*R);f.uDepth.value=this.scene.depthTexture,f.uTexel.value.set(1/g,1/y),f.uStrength.value=(S.strength+(S.treetop.strength-S.strength)*v)*this.tilt,f.uBand.value=S.band+(S.treetop.band-S.band)*v,f.uCentre.value=1-S.centre,S.on||(f.uStrength.value=0);const M=At("vertigo");f.uStrength.value+=M.blur*this.potionVertigo*this.tilt,f.uBand.value*=1+(M.band-1)*this.potionVertigo,f.uSkyBlur.value=S.skyBlur??1,f.uSharp.value=this.sharpMask.texture,f.uSharpOn.value=p?1:0};this.pass("tilt",this.b,f=>{m(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),yield,this.pass("tilt",r===this.b?this.a:r,f=>{m(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}drawSharp(e){const t=this.tuning.tiltShift.stackSharp!==!1?this.sharp.filter(o=>o.mesh.visible&&(o.mesh.geometry.instanceCount??0)>0):[];if(!t.length)return!1;const n=this.renderer,r=n.autoClear,s=n.getClearColor(this.clear),a=n.getClearAlpha();n.setRenderTarget(this.sharpMask),n.setClearColor(0,0),n.clear(!0,!1,!1),n.autoClear=!1;for(const o of t){const l=o.mesh.material;o.mesh.material=o.mask,n.render(o.mesh,e),o.mesh.material=l}return n.autoClear=r,n.setClearColor(s,a),!0}get gradeTint(){return this.mats.composite.uniforms.uGradeTint.value}gradeOf;setGrade(e){const t=Fx(this.tuning);if(kx(e.uGrade.value,t),t!==this.gradeOf&&(this.gradeOf=t,t)){const[n,r,s]=ed(t.gradeHue,t.gradeSat,1).map(o=>o/255),a=.3*n+.55*r+.15*s;e.uGradeTint.value.set(n/a,r/a,s/a)}}}const ri=100,Ot=ri/td,fs=[{from:0,px:48},{from:64,px:128},{from:128,px:256}],Sr=5,u_=240,h_=6,d_=40;function Ba(i){for(let e=i.length-1;e>=0;e--)if(i[e]>=65535)return new Uint32Array(i);return new Uint16Array(i)}function f_(i,e){const t=new Float32Array(i.length);for(let n=0;n<e.length;n+=3){const r=e[n],s=e[n+1],a=e[n+2],o=r*3,l=s*3,c=a*3,u=i[o],d=i[o+1],h=i[o+2],p=i[l],g=i[l+1],y=i[l+2],m=i[c],f=i[c+1],S=i[c+2],R=m-p,v=f-g,M=S-y,E=u-p,A=d-g,x=h-y,w=v*x-M*A,L=M*E-R*x,U=R*A-v*E;t[o]=t[o]+w,t[o+1]=t[o+1]+L,t[o+2]=t[o+2]+U,t[l]=t[l]+w,t[l+1]=t[l+1]+L,t[l+2]=t[l+2]+U,t[c]=t[c]+w,t[c+1]=t[c+1]+L,t[c+2]=t[c+2]+U}for(let n=0;n<t.length;n+=3){const r=t[n],s=t[n+1],a=t[n+2],o=1/(Math.sqrt(r*r+s*s+a*a)||1);t[n]=r*o,t[n+1]=s*o,t[n+2]=a*o}return t}function yh(i,e){const{cols:t,rows:n,step:r}=i,s=t*n,a=new Float32Array(s*3),o=[];let l=0;for(let f=0;f<n;f++)for(let S=0;S<t;S++){const R=f*t+S,v=i.h[R],M=v>0?.04+v*e*Sr:-.12;a[R*3]=(i.x0+S*r)*e,a[R*3+1]=M,a[R*3+2]=(i.z0+f*r)*e,l=Math.max(l,M)}for(let f=0;f<n-1;f++)for(let S=0;S<t-1;S++){const R=f*t+S,v=R+1,M=R+t,E=M+1;i.h[R]<=0&&i.h[v]<=0&&i.h[M]<=0&&i.h[E]<=0||o.push(R,M,v,v,M,E)}const c=Ba(o),u=f_(a,c);let d=.1;for(let f=0;f<s;f++)d=Math.max(d,a[f*3+1]);const h=new Uint8Array(s);for(let f=0;f<s;f++)h[f]=Math.round(Math.max(0,Math.min(1,a[f*3+1]/d))*255);const p=new Float32Array(s*3),g=new Float32Array(s),y=[];for(let f=0;f<s;f++)p[f*3]=a[f*3],p[f*3+1]=.03,p[f*3+2]=a[f*3+2],g[f]=i.h[f]>0||i.water?.[f]===2?0:Math.min(1,-i.h[f]/u_);for(let f=0;f<n-1;f++)for(let S=0;S<t-1;S++){const R=f*t+S,v=R+1,M=R+t,E=M+1;g[R]>=1&&g[v]>=1&&g[M]>=1&&g[E]>=1||i.h[R]>0&&i.h[v]>0&&i.h[M]>0&&i.h[E]>0||y.push(R,M,v,v,M,E)}let m=null;if(i.water&&i.level){const f=i.water,S=i.level,R=new Float32Array(s*3),v=new Float32Array(s),M=[];for(let A=0;A<s;A++){const x=f[A]===2?S[A]:0;R[A*3]=a[A*3],R[A*3+1]=.06+x*e*Sr,R[A*3+2]=a[A*3+2],v[A]=f[A]===2?Math.min(1,(S[A]-i.h[A])/h_):0}for(let A=0;A<n;A++)for(let x=0;x<t;x++){const w=A*t+x;if(f[w]!==2){for(const L of[w-1,w+1,w-t,w+t])if(L>=0&&L<s&&f[L]===2){R[w*3+1]=.06+S[L]*e*Sr;break}}}const E=new Float32Array(s);if(i.looks)for(let A=0;A<s;A++)E[A]=i.looks[A];{const A=new Float32Array(s),x=1.4142;for(let C=0;C<s;C++)A[C]=f[C]===2?1e9:0;for(let C=0;C<n;C++)for(let I=0;I<t;I++){const D=C*t+I;if(!A[D])continue;let N=A[D];I>0&&(N=Math.min(N,A[D-1]+1)),C>0&&(N=Math.min(N,A[D-t]+1),I>0&&(N=Math.min(N,A[D-t-1]+x)),I<t-1&&(N=Math.min(N,A[D-t+1]+x))),A[D]=N}for(let C=n-1;C>=0;C--)for(let I=t-1;I>=0;I--){const D=C*t+I;if(!A[D])continue;let N=A[D];I<t-1&&(N=Math.min(N,A[D+1]+1)),C<n-1&&(N=Math.min(N,A[D+t]+1),I<t-1&&(N=Math.min(N,A[D+t+1]+x)),I>0&&(N=Math.min(N,A[D+t-1]+x))),A[D]=N}const w=new Int32Array(s).fill(-1),L=[],U=[];for(let C=0;C<s;C++){if(E[C]!==7||f[C]!==2||w[C]>=0)continue;const I=L.length;let D=0;for(L.push(0),U.push(C),w[C]=I;U.length;){const N=U.pop(),$=N%t;D=Math.max(D,A[N]);for(const Y of[$>0?N-1:-1,$<t-1?N+1:-1,N-t,N+t])Y>=0&&Y<s&&f[Y]===2&&w[Y]<0&&(w[Y]=I,U.push(Y))}L[I]=D}for(let C=0;C<s;C++)f[C]!==2||!E[C]||(v[C]=w[C]>=0?Math.min(1,(A[C]-.5)/Math.max(1,L[w[C]]-.5)):Math.min(1,(A[C]-.5)*r/d_))}for(let A=0;A<n-1;A++)for(let x=0;x<t-1;x++){const w=A*t+x,L=w+1,U=w+t,C=U+1;E[w]===4||E[L]===4||E[U]===4||E[C]===4||(f[w]===2||f[L]===2||f[U]===2||f[C]===2)&&M.push(w,U,L,L,U,C)}M.length&&(m={lp:R,ld:v,lk:E,li:Ba(M)})}return{pos:a,normal:u,idx:c,top:l,tile:h,tmax:d,flat:p,depth:g,wi:Ba(y),lakes:m}}const nu=[8,5.5,8,11,13,15],p_=i=>i.id==="home"?nu[0]:nu[Math.max(1,Math.min(5,i.phase))],Sh=11,za=Sh*2.3,iu=2048,Mh=(i,e,t)=>`
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
}`,m_=`
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${Mh("moonLit","hAtMap",16)}`,gl=`
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${Mh("moonLit","hAtTile",20)}`,bh=2,wh=1,g_=96,v_=16,x_=Sh*wh,__=9,y_=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,S_=`
uniform float uTime, uR, uRings; uniform vec3 uMoonDir, uToGame; varying vec3 vW;
${m_}
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
  c *= uToGame; // (a sail's flight coming down to the hand-off: the game's sea's colour, SeaChart.seaToGame)
  gl_FragColor = vec4(c, 1.0);
}`,M_=`
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`,b_="varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }",w_=`
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
}`,E_=`attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,T_=`
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`,A_=`
varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,R_=`
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${gl}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`,C_=`
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,P_=`
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${gl}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`,L_={deep:new Be(.08,.2,.34),pale:new Be(.22,.46,.52)},ru={deep:new Be(.15,.28,.37),pale:new Be(.3,.52,.56)},D_=`
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,I_=`
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${gl}
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
}`,ki=i=>i*i*(3-2*i),U_=i=>i*i,rn={frame:1.6,swoop:2.8,run:1.2,dist:600,pitchDeg:50,onward:60};function N_(i){const e=rn.frame+rn.swoop+rn.run,t=i&&i>0?i/e:1;return{frame:rn.frame*t,swoop:rn.swoop*t,run:rn.run*t}}const Ha=[1.18,1.18,.79],F_=.9;function k_(i,e=24,t=0,n){const r=n??Px(i,e,{tier:t}),s=new Uint8Array(e*e*4);for(let o=0;o<e;o++)for(let l=0;l<e;l++){const c=o*e+l,u=((e-1-o)*e+l)*4;r[c]&&s.set([255,255,255,255],u)}const a=new mi(s,e,e);return a.magFilter=xt,a.minFilter=xt,a.needsUpdate=!0,a}function O_(){const e=new Uint8Array(16384);for(let n=0;n<64;n++)for(let r=0;r<64;r++){const s=Math.hypot(r+.5-32,n+.5-32)/32,a=Math.max(0,1-s)**2;e.set([255,255,255,Math.round(a*255)],(n*64+r)*4)}const t=new mi(e,64,64);return t.magFilter=at,t.minFilter=at,t.needsUpdate=!0,t}function B_(){const e=new Uint8Array(4096),t=7,n=(s,a,o)=>{if(s<0||a<0||s>=32||a>=32)return;const l=(a*32+s)*4;e.set([255,255,255,Math.max(e[l+3],Math.round(o*255))],l)};for(let s=0;s<t;s++){const a=s/t*Math.PI*2+.4,o=32*(.38+.04*Math.sin(s*2.3)),l=Math.round(32/2+Math.cos(a)*o),c=Math.round(32/2+Math.sin(a)*o),u=1+s%2;n(l,c,1);for(let d=1;d<=u;d++){const h=1-d/(u+1);n(l+d,c,h),n(l-d,c,h),n(l,c+d,h),n(l,c-d,h)}}const r=new mi(e,32,32);return r.magFilter=xt,r.minFilter=at,r.needsUpdate=!0,r}function z_(i){const e=i.outline,t=p_(i);if(e&&e.loops.some(a=>a.sea)){const l=Ot;let c=0;for(const d of e.loops)if(d.sea)for(let h=0;h<d.pts.length;h+=2)c=Math.max(c,Math.hypot(d.pts[h]-0,d.pts[h+1]-0));const u=[];for(const d of e.loops){const h=d.pts.length/2,p=h>160?2:1,g=[];for(let y=0;y<h;y+=p)g.push(new Ee((d.pts[y*2]-0)*l,-(d.pts[y*2+1]-0)*l));g.length>=3&&u.push({pts:g,sea:d.sea})}if(u.some(d=>d.sea))return{loops:u,k:l,cx:0,cz:0,reach:c*l}}const n=bx(i.radii).map(([a,o])=>new Ee(a-.5,-(o-.5))),r=Math.max(...n.map(a=>a.length())),s=t/r;return{loops:[{pts:n.map(a=>a.multiplyScalar(s)),sea:!0}],k:0,cx:0,cz:0,reach:t}}const su=new B,au=(i,e=1)=>new Be(i[0]/255*e,i[1]/255*e,i[2]/255*e);class Vo{constructor(e,t){this.canvas=e,this.tuning=t,this.renderer=new Sx({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=br,this.camera=new $t(t.camera.fov??40,1,1,4e3),this.postTuning={...t,bloom:{...t.bloom}},this.post=new c_(this.renderer,this.postTuning),this.scene.background=new Be(329230),this.scene.add(new vp(7372992,1581104,2.6));const n=new yp(13688063,3.2);n.position.set(-30,60,-90),this.scene.add(n),this.moonLight=n;const r=new St;r.setAttribute("position",new vt([-1,-1,0,3,-1,0,-1,3,0],3)),this.skyU={uRes:{value:new Ee(1,1)},uTime:this.uTime,uMoon:{value:new Ee(.28,.88)}};const s=new ht(r,new wt({vertexShader:b_,fragmentShader:w_,uniforms:this.skyU,depthWrite:!1,depthTest:!0,depthFunc:$i}));s.frustumCulled=!1,s.renderOrder=9,this.scene.add(s),this.buildSea(),this.ring=new ht(new Bs(.92,1,64).rotateX(-Math.PI/2),new En({color:11066623,transparent:!0,blending:nn,depthWrite:!1})),this.ring.position.y=.15,this.ring.visible=!1,this.scene.add(this.ring)}canvas;tuning;renderer;camera;scene=new ko;post;postTuning;isles=new Map;lines=[];voyages=[];uTime={value:0};glow=O_();sparkle=B_();skyU;ring;focus=new B;aim=new B;dist=130;distTo=130;distOpen=130;distMax=200;sized=!1;pitch=.95;selected=null;orbit=0;yaw=0;flight=null;get flying(){return!!this.flight}w=1;h=1;unheight(e){const t=e.userData.hb;t&&(this.hScene.remove(t),this.hBodies=this.hBodies.filter(n=>n.hb!==t),this.markHeights())}markHeights(){this.hDirty||(this.hSince=this.now),this.hDirty=!0,this.hDue=Math.min(this.hSince+2,this.now+.5)}hSince=0;now=0;hDue=0;set(e,t){for(const n of this.isles.values())this.unheight(n.group);for(const n of this.isles.values())this.scene.remove(n.group);for(const n of this.lines)this.scene.remove(n);this.isles.clear(),this.lines=[];for(const n of e)this.isles.set(n.id,this.island(n));this.voyages=t;for(const n of t){const r=this.isles.get(n.from),s=this.isles.get(n.to);r&&s&&this.lines.push(this.voyage(r,s))}this.selected&&!this.isles.has(this.selected)&&(this.selected=null)}reshape(e,t){const n=this.isles.get(e);if(!n)return;const r=!n.pick;this.unheight(n.group),this.scene.remove(n.group);const s=this.island({...n.d,outline:t});r&&(s.rose=this.now),this.isles.set(e,s);for(const a of this.lines)this.scene.remove(a);this.lines=this.voyages.flatMap(a=>{const o=this.isles.get(a.from),l=this.isles.get(a.to);return o&&l?[this.voyage(o,l)]:[]})}island(e){const t=new zi,n=e.x*ri,r=e.y*ri;t.position.set(n,0,r),this.scene.add(t);const{k:s,reach:a}=z_(e),o=e.unknown?.72:e.sail?1:.85,l=e.outline?.ground;if(!l||!(s>0))return{d:e,group:t,x:n,z:r,top:1,reach:a};const{cols:c,rows:u,step:d}=l,h=e.outline.mesh??yh(l,s),p=l.rgb instanceof Uint8Array?l.rgb:Uint8Array.from(l.rgb),g=new St;g.setAttribute("position",new _t(h.pos,3)),g.setAttribute("color",new _t(p,3,!0)),g.setAttribute("normal",new _t(h.normal,3)),g.setIndex(new _t(h.idx,1));const y=new mi(h.tile,c,u,Rr,zt);y.unpackAlignment=1,y.minFilter=y.magFilter=at,y.needsUpdate=!0;const m={uTile:{value:y},uTileB:{value:new Ye(l.x0*s,l.z0*s,1/(d*s),0)},uTileN:{value:new Ee(c,u)},uTileMax:{value:h.tmax},uYScale:{value:1}},f=new ht(g,new wt({vertexShader:A_,fragmentShader:R_,uniforms:{...this.groundU,...m,uDim:{value:o}},vertexColors:!0})),S=h.top,R=new St;R.setAttribute("position",new _t(h.flat,3)),R.setAttribute("aDepth",new _t(h.depth,1)),R.setIndex(new _t(h.wi,1));const v=(E,A)=>new wt({vertexShader:C_,fragmentShader:P_,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uOpaque:{value:A},uDeep:{value:E.deep},uPale:{value:E.pale}},transparent:A<1,depthWrite:A>=1});if(t.add(new ht(R,v(L_,0))),h.lakes){const E=h.lakes,A=new St;A.setAttribute("position",new _t(E.lp,3)),A.setAttribute("aDepth",new _t(E.ld,1)),A.setAttribute("aLook",new _t(E.lk,1)),A.setIndex(new _t(E.li,1)),t.add(new ht(A,new wt({vertexShader:D_,fragmentShader:I_,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uTime:this.uTime,uScale:{value:30*s},uDeep:{value:ru.deep},uPale:{value:ru.pale}}})))}t.add(f);{const E=new ht(f.geometry,this.heightMat);E.matrixAutoUpdate=!1,E.frustumCulled=!1,this.hScene.add(E),this.hBodies.push({hb:E,body:f}),t.userData.hb=E,this.markHeights()}const M={d:e,group:t,pick:f,x:n,z:r,top:S,reach:a,tileU:m};if(e.outline?.sigils?.length&&this.sigilInk.set(e.sigil,e.outline.sigils),e.sail){const E=wu(e.sigil),A=Math.max(__,a*wh),x=new ht(new Pn(A,A).rotateX(-Math.PI/2),new En({map:this.sigilArt(e.sigil,0),color:au(E,.95),transparent:!0,blending:nn,depthWrite:!1}));x.position.y=S+.35,t.add(x),M.sigil=x,M.tier=0,M.size=A;const w=new ht(new Pn(A*1.6,A*1.6).rotateX(-Math.PI/2),new En({map:this.glow,color:au(E,.16),transparent:!0,blending:nn,depthWrite:!1}));if(w.position.y=S+.25,t.add(w),M.glow=w,e.fresh){const L=new ht(new Pn(A*1.9,A*1.9).rotateX(-Math.PI/2),new En({map:this.sparkle,color:new Be(1,.95,.78),transparent:!0,blending:nn,depthWrite:!1}));L.position.y=S+.3,t.add(L),M.spark=L}}if(e.won){const E=a*1.3,A=new ht(new Bs(E*.95,E,96).rotateX(-Math.PI/2),new En({color:15250538,transparent:!0,blending:nn,depthWrite:!1}));A.position.y=.12,t.add(A)}return M}moonShared={uShadow:{value:0},uMoonV:{value:new B(-.3,.6,-.9).normalize()}};hmap=new Wt(iu,iu,{depthBuffer:!0,minFilter:at,magFilter:at,generateMipmaps:!1});moonU={...this.moonShared,uHMap:{value:this.hmap.texture},uHR:{value:ri*1.02},uHMax:{value:8}};hScene=new ko;hBodies=[];hDirty=!0;moonLight=null;moonT0=0;moonLast;moonP=new B;seaMoon={value:new B(-.3,.6,-.9)};seaToGame={value:new B(1,1,1)};stillMoon=null;heightMat=new wt({vertexShader:"uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",fragmentShader:"uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",uniforms:{uHR:this.moonU.uHR,uHMax:this.moonU.uHMax},side:Kt});groundU={...this.moonShared,uMoon:{value:new B(-.3,.6,-.9).normalize()},uShade:{value:new B(-.7,.45,-.55).normalize()},uRise:{value:3}};moonFrame(e){const t=this.tuning,n=Pd(t);(this.moonLast===void 0||e-this.moonLast>1||e<this.moonLast)&&(this.moonT0=e),this.moonLast=e;const r=this.stillMoon!==null?{bearing:this.stillMoon,height:n.height,risen:1}:Ld(e-this.moonT0,n),s=xi.degToRad(r.bearing),a=xi.degToRad(r.height),o=this.moonShared.uMoonV.value.set(Math.sin(s)*Math.cos(a),Math.sin(a),-Math.cos(s)*Math.cos(a));this.moonShared.uShadow.value=n.shadow*r.risen,this.groundU.uMoon.value.copy(o),this.groundU.uShade.value.set(Math.sin(s)*.8,.45,-Math.cos(s)*.8).normalize(),this.seaMoon.value.copy(o),this.moonLight?.position.copy(o).multiplyScalar(100);const l=this.skyU.uMoon.value;if(!n.disc)l.set(-1,-1);else{this.camera.updateMatrixWorld();const g=this.moonP.copy(o).multiplyScalar(this.seaR*1.6).project(this.camera);g.z>1||g.z<-1?l.set(-1,-1):l.set((g.x+1)/2,(g.y+1)/2)}Hl(t)!==this.band&&this.buildSea();for(const g of this.isles.values())g.tileU&&(g.tileU.uYScale.value=g.group.scale.y);if((!this.hDirty||e<this.hDue)&&!this.flight)return;this.hDirty=!1;let c=1;for(const{hb:g,body:y}of this.hBodies){y.updateWorldMatrix(!0,!1),g.matrix.copy(y.matrixWorld),g.matrix.elements[13]-=y.parent?.position.y??0,g.matrixWorld.copy(g.matrix);const m=y.geometry;m.boundingBox||m.computeBoundingBox(),c=Math.max(c,m.boundingBox.max.y)}this.moonU.uHMax.value=c*1.05;const u=this.renderer,d=u.getRenderTarget(),h=u.getClearColor(new Be),p=u.getClearAlpha();u.setRenderTarget(this.hmap),u.setClearColor(0,1),u.clear(),u.render(this.hScene,this.camera),u.setRenderTarget(d),u.setClearColor(h,p)}sea=null;fall=null;band=-1;seaR=ri*1.02;buildSea(){for(const t of[this.sea,this.fall])t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose());this.band=Hl(this.tuning);const e=this.seaR=ri*1.02*(1+this.band);this.moonU.uHR.value=e,this.markHeights(),this.sea=new ht(new Os(e,160).rotateX(-Math.PI/2),new wt({vertexShader:y_,fragmentShader:S_,uniforms:{...this.moonU,uTime:this.uTime,uR:{value:e},uRings:{value:ri*1.02},uMoonDir:this.seaMoon,uToGame:this.seaToGame}})),this.fall=new ht(new fl(e,e*.97,40,160,1,!0).translate(0,-20,0),new wt({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:M_,uniforms:{uTime:this.uTime},transparent:!0,depthWrite:!1,side:Kt})),this.scene.add(this.sea,this.fall)}sigilArts=new Map;sigilInk=new Map;sigilArt(e,t){const n=`${e}|${t}`;let r=this.sigilArts.get(n);if(!r){const s=this.sigilInk.get(e)?.[t];r=k_(e,fs[t].px,t,s&&s.px===fs[t].px?s.ink:void 0),this.sigilArts.set(n,r)}return r}voyage(e,t){const n=new Ee(e.x,e.z),r=new Ee(t.x,t.z),s=r.clone().sub(n),a=s.length(),o=new Ee(-s.y,s.x).normalize(),l=n.clone().add(r).multiplyScalar(.5).add(o.multiplyScalar(a*.12)),c=48,u=.9,d=[],h=[],p=[],g=[],y=v=>{const M=1-v;return new Ee(M*M*n.x+2*M*v*l.x+v*v*r.x,M*M*n.y+2*M*v*l.y+v*v*r.y)},m=e.reach/a*1.1,f=1-t.reach/a*1.1;for(let v=0;v<=c;v++){const M=m+(f-m)*(v/c),E=y(M),A=y(Math.min(1,M+.01)),x=A.sub(E).normalize(),w=new Ee(-x.y,x.x).multiplyScalar(u);if(d.push(E.x+w.x,.2,E.y+w.y,E.x-w.x,.2,E.y-w.y),h.push(v/c,0,v/c,1),p.push(M*a,M*a),v<c){const L=v*2;g.push(L,L+1,L+2,L+1,L+3,L+2)}}const S=new St;S.setAttribute("position",new vt(d,3)),S.setAttribute("uv",new vt(h,2)),S.setAttribute("aAlong",new vt(p,1)),S.setIndex(g);const R=new ht(S,new wt({vertexShader:E_,fragmentShader:T_,uniforms:{uTime:this.uTime,uColour:{value:new Be(1,.72,.38)}},transparent:!0,blending:nn,depthWrite:!1,side:Kt}));return this.scene.add(R),R}reset(){this.set([],[]),this.selected=null,this.flight=null,this.orbit=0,this.yaw=0,this.pitch=.95,this.focus.set(0,0,0),this.aim.set(0,0,0),this.sized=!1,this.moonLast=void 0,this.stillMoon=null}dispose(){this.scene.traverse(e=>{const t=e;t.geometry?.dispose();for(const n of[].concat(t.material??[])){for(const r of Object.values(n))r instanceof Lt&&r.dispose();n.dispose()}}),this.glow.dispose(),this.sparkle.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}fly(e,t,n={}){const r=this.isles.get(e);if(!r)return!1;this.select(e),this.orbit=0,this.yaw=0;const{keys:s,G:a}=this.flightKeys(r,n),o=this.legs(),l=new zi,c=a?(()=>{const p=Math.round(-a.z0/a.step),g=Math.round(-a.x0/a.step);return .06+Math.max(0,a.h[p*a.cols+g]??0)*Ot*Sr})():r.top,u=new ht(new Os(1,32).rotateX(-Math.PI/2),new En({color:new Be(.9,.5,1.2),transparent:!0,opacity:.9,blending:nn,depthWrite:!1})),d=new ht(new Pn(5,5).rotateX(-Math.PI/2),new En({map:this.glow,color:new Be(.7,.4,1),transparent:!0,opacity:.8,blending:nn,depthWrite:!1}));l.add(u,d),l.position.y=c+.05,l.scale.setScalar(22*Ot),r.group.add(l);const h=performance.now();return this.flight={id:e,t:0,keys:s,done:t,speed:rn.onward*2/o.run,floor:l,size:r.size??1,rate:1,wall:0,wallStart:h,hold:n.hold,slow:n.slow,landingDue:()=>n.landingDue?.(h+s.at(-1).at*1e3)},!0}flightKeys(e,t){const n=e.d.outline?.ground;let r=e.d.outline?e.d.outline.box.maxZ:e.reach/Ot;if(n){const d=Math.round(-n.x0/n.step);for(let h=Math.max(0,Math.round(-n.z0/n.step));h<n.rows;h++)if(!(n.h[h*n.cols+d]>0)){r=n.z0+h*n.step;break}}const s=this.legs(),a=xi.degToRad(t.pitchDeg??rn.pitchDeg),o=(t.dist??rn.dist)*Ot,l=e.z+(r+(t.sea??-40))*Ot,c=l+rn.onward*Ot;return{keys:[{x:this.focus.x,z:this.focus.z,dist:this.dist,pitch:this.pitch,at:0,ease:ki},{x:e.x,z:e.z,dist:Math.max(za,e.reach*4.2),pitch:.95,at:s.frame,ease:ki},{x:e.x,z:c,dist:o,pitch:a,at:s.frame+s.swoop,ease:ki},{x:e.x,z:l,dist:o,pitch:a,at:s.frame+s.swoop+s.run,ease:U_}],G:n}}flightEnd(e,t={}){const n=this.isles.get(e);if(!n)return null;const r=this.flightKeys(n,t).keys.at(-1);return{x:0,z:(r.z+Math.cos(r.pitch)*r.dist-n.z)/Ot,height:Math.sin(r.pitch)*r.dist/Ot,pitch:r.pitch,fov:this.camera.fov,speed:rn.onward*2/this.legs().run}}legs(){return N_(this.tuning.arrive?.zoom)}get flightFramed(){const e=this.flight;return!!e&&e.t>=e.keys[1].at}flyFrame(e,t){const n=this.flight,r=this.isles.get(n.id),s=n.keys.at(-1).at;Mx(n,e,n.keys[1].at,s,(performance.now()-n.wallStart)/1e3);let a=1;for(;a<n.keys.length-1&&n.t>n.keys[a].at;)a++;const o=n.keys[a-1],l=n.keys[a],c=l.ease(Math.min(1,Math.max(0,(n.t-o.at)/(l.at-o.at)))),u=(g,y)=>g+(y-g)*c;this.focus.set(u(o.x,l.x),0,u(o.z,l.z)),this.aim.copy(this.focus),this.dist=this.distTo=u(o.dist,l.dist),this.pitch=u(o.pitch,l.pitch);const d=ki(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(n.keys[2].at-n.keys[1].at))));r.group.scale.y=1+(1/Sr-1)*d;const h=ki(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(s-n.keys[1].at))));this.seaToGame.value.set(1+(Ha[0]-1)*h,1+(Ha[1]-1)*h,1+(Ha[2]-1)*h);const p=ki(Math.min(1,n.t/n.keys[1].at));if(r.sigil){const g=1+(60*Ot/n.size-1)*p;r.sigil.scale.set(g,1,g),r.glow?.scale.set(g,1,g)}n.floor.rotation.y=t*.6,n.floor.children[0].scale.setScalar(.9+.1*Math.sin(t*6))}select(e,t=!1){this.selected=e&&this.isles.has(e)?e:null;const n=this.selected?this.isles.get(this.selected):null;this.aim.set(n?n.x:0,0,n?n.z:0),t&&this.focus.copy(this.aim)}zoom(e){this.distTo=Math.max(za,Math.min(this.distMax,this.distTo*e))}pick(e,t){const n=this.canvas.getBoundingClientRect(),r=new Ee((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),s=new bp;s.setFromCamera(r,this.camera);const a=s.intersectObjects([...this.isles.values()].flatMap(u=>u.pick?[u.pick]:[]),!1)[0];if(a){for(const[u,d]of this.isles)if(d.pick===a.object)return u}const o=new B;if(!s.ray.intersectPlane(new Tn(new B(0,1,0),0),o))return null;let l=null,c=1/0;for(const[u,d]of this.isles){const h=Math.hypot(d.x-o.x,d.z-o.z)-d.reach;h<c&&(c=h,l=u)}return c<6?l:null}moonDisc(){const e=this.skyU.uMoon.value;if(e.x<0||e.x>1||e.y<0||e.y>1)return null;const t=this.canvas.getBoundingClientRect();return{x:t.left+e.x*t.width,y:t.top+(1-e.y)*t.height,r:.045*t.height}}screenTopOf(e){const t=this.isles.get(e);if(!t)return null;const n=this.canvas.getBoundingClientRect(),r=new B,s=Math.max(t.reach,(t.size??0)*.8*(t.glow?.scale.x??1),(t.size??0)*.95*(t.spark?.scale.x??0));return wx((a,o,l)=>(r.set(a,o+t.group.position.y,l).project(this.camera),{x:(r.x+1)/2*n.width,y:(1-r.y)/2*n.height}),t.x,t.top,t.z,s)}screenOf(e){const t=this.isles.get(e);if(!t)return null;const n=new B(t.x,t.top,t.z).project(this.camera),r=this.canvas.getBoundingClientRect();return{x:(n.x+1)/2*r.width,y:(1-n.y)/2*r.height}}made={w:0,h:0};resize(e,t){const n=bh,r=Math.max(1,Math.ceil(e/n)),s=Math.max(1,Math.ceil(t/n));if(this.sized&&r===this.w&&s===this.h)return;this.w=r,this.h=s,(this.made.w!==r||this.made.h!==s)&&(this.renderer.setSize(r,s,!1),this.post.resize(r,s,r,s),this.made={w:r,h:s}),this.canvas.style.width=`${this.w*n}px`,this.canvas.style.height=`${this.h*n}px`,this.camera.aspect=this.w/this.h,this.camera.updateProjectionMatrix(),this.skyU.uRes.value.set(this.w,this.h),this.postTuning.bloom.strength=this.tuning.bloom.strength*Math.max(.3,Math.min(1,(this.h-60)/180));const a=l=>x_*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*l),o=this.distOpen;this.distOpen=a(g_),this.distMax=a(v_),this.sized?(this.distTo=Math.max(za,Math.min(this.distMax,this.distTo*(this.distOpen/o))),this.dist=this.distTo):(this.dist=this.distTo=this.distOpen,this.sized=!0)}frame(e,t){this.uTime.value=t,this.now=t;const n=1-Math.exp(-e*3.2);this.flight?this.flyFrame(e,t):(this.focus.lerp(this.aim,n),this.dist+=(this.distTo-this.dist)*n,this.seaToGame.value.set(1,1,1)),this.yaw+=e*this.orbit;const r=Math.cos(this.pitch)*this.dist,s=Math.sin(this.yaw),a=Math.cos(this.yaw);this.camera.position.set(this.focus.x+r*s,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+r*a);const o=this.orbit||this.flight?0:this.dist*.035;this.camera.lookAt(this.focus.x,0,this.focus.z+o);const l=Math.max(.5,this.dist*.25),c=this.dist*3+400;(Math.abs(l-this.camera.near)>.01||Math.abs(c-this.camera.far)>1)&&(this.camera.near=l,this.camera.far=c,this.camera.updateProjectionMatrix()),this.post.lift=0;for(const h of this.isles.values()){const p=.85+.15*Math.sin(t*1.6+h.x*.1),g=h.d.id===this.selected;let y=1;if(h.sigil){const f=h.sigil.material,S=h.size*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(su.set(h.x,h.top,h.z)));y=S>220?Math.max(0,1-(S-220)/260):1,f.opacity=p*y,h.sigil.visible=y>0;let R=0;for(let v=1;v<fs.length;v++)S>=fs[v].from&&(R=v);R!==h.tier&&(h.tier=R,f.map=this.sigilArt(h.d.sigil,R),f.needsUpdate=!0)}if(h.glow&&(h.glow.material.opacity=(g?.85:.7)*p*y,h.glow.visible=h.sigil?.visible??!0),h.spark){const f=.5+.5*Math.sin(t*4.2+h.x*.3),S=h.spark.material;S.opacity=(.45+.55*f)*y,h.spark.visible=h.sigil?.visible??!0;const R=h.size*1.9*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(su.set(h.x,h.top,h.z))),v=(h.sigil?h.sigil.scale.x:1)*Math.max(1,32/Math.max(1,R));h.spark.scale.set(v,1,v),h.spark.rotation.y=t*.25}let m=0;if(h.rose!==void 0){const f=Math.min(1,(t-h.rose)/F_),S=1-(1-f)**3;m=-(h.top+.6)*(1-S),f>=1&&(h.rose=void 0)}h.group.position.y=m+(g?Math.sin(t*2)*.12:0)}const u=this.selected?this.isles.get(this.selected):null;if(this.ring.visible=!!u&&!this.flight,u){const h=u.reach*1.6*(1+.04*Math.sin(t*3));this.ring.position.set(u.x,.15,u.z),this.ring.scale.set(h,1,h),this.ring.material.opacity=.7+.3*Math.sin(t*3)}this.moonFrame(t),this.post.render(this.scene,this.camera);const d=this.flight;if(d&&d.t>=d.keys.at(-1).at&&!d.held){const h=this.isles.get(d.id),p=this.camera.position;this.flight=null,d.done({cam:{x:(p.x-h.x)/Ot,z:(p.z-h.z)/Ot,height:p.y/Ot,pitch:this.pitch,fov:this.camera.fov,speed:d.speed*d.rate},still:this.canvas.toDataURL("image/jpeg",.88)})}}}let Bt=null;function Eh(i){return Bt?.prep?(Bt.prep=!1,Bt.chart):Bt&&!Bt.busy?(Bt.busy=!0,Bt.chart):Bt?new Vo(document.createElement("canvas"),i):(Bt={chart:new Vo(document.createElement("canvas"),i),busy:!0},Bt.chart)}function Th(i){if(Bt?.chart!==i){i.dispose();return}i.reset(),Bt.busy=!1}function ou(i,e){const s=new Float32Array(81),a=new Uint8Array(81),o=new Float32Array(81),l=new Uint8Array(81),c=new Uint8Array(243).fill(120);for(let h=0;h<9;h++)for(let p=0;p<9;p++){const g=h*9+p,y=Math.hypot(p-4,h-4);s[g]=y<3.5?40-y*8:-20,y<1.2?(a[g]=2,o[g]=s[g]+2,l[g]=1):s[g]<=0&&(a[g]=1)}const u={x0:-400,z0:-400,step:100,cols:9,rows:9,h:s,rgb:c,water:a,level:o,looks:l},d=new Float32Array([-300,0,0,-300,300,0,0,300]);return{id:i,x:e,y:0,phase:1,radii:[1,1,1,1],sail:!0,unknown:!1,won:!0,sigil:"home",outline:{loops:[{pts:d,sea:!0}],box:{minX:-300,maxX:300,minZ:-300,maxZ:300},ground:u,mesh:yh(u,Ot)}}}async function LS(i){if(Bt)return;const e=Eh(i),t=Bt;t.prep=!0;try{e.resize(innerWidth*.92-4,innerHeight*.92-4),e.set([ou("home",0),ou("standIn",.2)],[{from:"home",to:"standIn"}]);const n=e;if(await Promise.all([n.scene,n.hScene].map(r=>e.renderer.compileAsync(r,e.camera))).catch(()=>{}),!t.prep)return;e.frame(1/60,0),e.frame(1/60,3);for(const r of e.renderer.info.programs??[])r.getUniforms()}finally{t.prep&&(t.prep=!1,Th(e),performance.mark("witch:chart-prepared"))}}const H_={hat:{shape:"classic",height:1.11,brim:1.45,tilt:.734,band:1.26},hair:"long",top:"jacket",cloak:"short",broom:{kind:"classic",length:1.2,bend:-.673,bristles:1.096,thickness:.67},accessories:{phones:!1,shades:!1,glowsticks:!1,scarf:!0,satchel:!0,pendant:!1,earrings:!1,lantern:!1,vial:!1,book:!1,patches:!1,bumbag:!1,purse:!1,tote:!1,duffel:!1,briefcase:!1,clutch:!1,messenger:!1,wristband:!1,chunky:!1},cloakLength:2.318,scarfLength:2.275,bagSize:2.512,backpackSize:0,palette:{hair:[0,0,.1775],hat:[.8333,1,.3],headphones:[.0833,1,1],top:[.0833,.5,1],jacket:[.8333,1,.3],jeans:[.6667,.5,1],sneakers:[.0833,.5,1],broom:[.0833,1,.3],bristles:[.1667,1,.74],skin:[.2662,.3221,.8157],pattern:[.1667,.12,1],trim:[0,.72,1],flower:[.9167,.5,1],flower2:[.1667,.5,1],cup:[0,.72,1],glow:[.9167,.72,1],glow2:[.3333,.72,1],shades:[.5833,1,.13],frame:[.0833,.5,1],cloak:[.75,1,.3],scarf:[.5,.5,1],satchel:[.0833,1,.3],lantern:[0,0,.295],book:[0,0,.1775],bumbag:[0,0,.53],band:[.9167,.72,1],vial:[.6667,.12,1],plume:[.9167,1,.3],gold:[.0833,.72,1],backpack:[.3333,1,1]}},G_=null,Ah={genome:H_,broom:G_},V_="The starting appearance for a brand-new witch. Detailed notes and decisions: docs/notes/config-history/default-look.md.",W_=id,Rh=nd;function DS(i,e){const t=e&&Ka.some(n=>e[n])?Object.fromEntries(Ka.map(n=>[n,e[n]??null])):null;return JSON.stringify({_:V_,genome:i?Rh(JSON.parse(JSON.stringify(i))):null,broom:t},null,2)+`
`}function IS(i=Ah){if(!i.genome||typeof i.genome!="object")return null;const e=Rh(JSON.parse(JSON.stringify(i.genome)));return W_(e).length?null:e}function US(i=Ah){const e=sd(),t=i.broom;if(t&&typeof t=="object")for(const n of Ka){const r=t[n];typeof r=="string"&&rd(r)?.slot===n&&(e[n]=r)}return e}const vl=()=>{try{return new URLSearchParams(globalThis.location?.search??"").get("newWitch")==="1"}catch{return!1}};function NS(i){const e=new URL(i);for(const t of["hat","hats","parts","bag"])e.searchParams.delete(t);return e.searchParams.set("newWitch","1"),e.toString()}const lu=new WeakMap,X_=Ch(null);function Ch(i){const e=new Map,t=new Set,n=r=>{t.has(r)||(t.add(r),console.warn(`[storage] ${r}: browser storage unavailable; changes are kept for this page only.`))};return{getItem(r){if(e.has(r))return e.get(r);try{if(i)return i.getItem(r)}catch{}return n(r),null},setItem(r,s){e.set(r,s);try{if(i){i.setItem(r,s),e.delete(r);return}}catch{}throw n(r),new Error(`Browser storage refused ${r}`)}}}function q_(i){if(i===void 0&&(i=Ws),!i)return X_;let e=lu.get(i);return e||(e=Ch(i),lu.set(i,e)),e}const xl="witch.hats",_l=q_;function zs(i){if(vl())return[];try{const e=JSON.parse(_l(i)?.getItem(xl)??"[]");return Array.isArray(e)?Rs.filter(t=>e.includes(t)):[]}catch{return[]}}function FS(i,e){const t=zs(e);if(Rs.includes(i)&&!t.includes(i)&&t.push(i),!vl())try{_l(e)?.setItem(xl,JSON.stringify([...t].sort()))}catch{}return zs(e)}function kS(i,e){if(!vl())try{_l(e).setItem(xl,JSON.stringify(zs(e).filter(t=>t!==i)))}catch{}}function Y_(i,e,t){const n=i.get("hats");if(n==="all"||n==="*")return"*";const r=n!==null?Rs.filter(s=>n.split(",").includes(s)):zs(t);return i.get("hat")!==null&&Rs.includes(e)&&!r.includes(e)&&r.push(e),r.join(",")}const Wo="witch.debug.unlockAll",Ph=i=>{try{return i??Ws??null}catch{return null}};function yl(i){try{return Ph(i)?.getItem(Wo)==="1"}catch{return!1}}function OS(i,e){try{const t=Ph(e);i?t?.setItem(Wo,"1"):t?.removeItem(Wo)}catch{}}function BS(i){for(const e of ad)i.mushrooms.baskets[e]=Math.max(20,i.mushrooms.baskets[e])}const zS=(i,e=yl())=>e?new Set([...i,...bd.map(t=>t.id)]):new Set(i),HS=(i,e=yl())=>e?new Set([...i,...cd]):new Set(i);function GS(i,e,t=new URLSearchParams){const n=Y_(t,t.get("hat")??"none");i.spells.hats=e||n==="*"?void 0:n.split(",").filter(Boolean);const r=i.house?.hats;if(!r)return;for(let a=0;a<r.length;a++)r[a]&&!Ir(i.spells,r[a])&&(r[a]="");const s=new Set([i.spells.hat,...i.hat.left.map(a=>a.spell),...r.filter(Boolean)]);if(od.layout?.hatPoints.length){i.house?.hatOverflow&&(i.house.hatOverflow=i.house.hatOverflow.filter(a=>Ir(i.spells,a))),Nl.forEach(a=>{!s.has(a)&&Ir(i.spells,a)&&ld(i,a)});return}Nl.forEach((a,o)=>{!r[o]&&!s.has(a)&&Ir(i.spells,a)&&(r[o]=a,s.add(a))})}const cu={33321:1,33323:2,32849:4,32856:4,35905:4,35907:4,33325:2,33327:4,34843:8,34842:8,33326:4,33328:8,34837:16,34836:16,33329:1,33330:1,33331:2,33332:2,33333:4,33334:4,33335:2,33336:2,33337:4,33338:4,33339:8,33340:8,36238:4,36220:4,36232:8,36214:8,36226:16,36208:16,32857:4,35898:4,35901:4,32854:2,32855:2,36194:2,33189:2,33190:4,36012:4,35056:4,36013:8,36168:1,34041:4},uu={6408:4,6407:3,6406:1,6409:1,6410:2,6403:1,33319:2,36244:1,33320:2,36248:3,36249:4,6402:1},$_={5121:1,5120:1,5123:2,5122:2,5125:4,5124:4,5126:4,5131:2,36193:2},hu={32819:2,32820:2,33635:2,34042:4,33640:4,35899:4,35902:4,36269:8},K_=33984,ps=34067,Oi=34069,Z_=32879,J_=1285;function ti(i,e,t){return cu[i]?cu[i]:t!==void 0&&hu[t]?hu[t]:(uu[e??i]??uu[i]??4)*(t!==void 0?$_[t]??1:1)}function VS(i,e){return Math.max(i.floor,Math.min(i.ceil,i.mb*e/(i.refWidth*i.refHeight)))}const ws=new Map;function Q_(i,e){return ws.has(i)||i.addEventListener("dispose",()=>ws.delete(i)),ws.set(i,e),i}class WS{constructor(e,t=()=>0){this.gl=e,this.canvasBytes=t;const n=e,r=this,s=(u,d,h=!1)=>{const p=n[u];typeof p=="function"&&(n[u]=function(...g){h&&d(g);const y=p.apply(e,g);return h||d(g),y})},a=u=>u>=Oi&&u<Oi+6?ps:u,o=u=>r.bound.get(r.unit<<16|a(u))??null,l=(u,d,h)=>{r.allocs++;const p=o(u);if(!p)return;let g=r.tex.get(p);g||r.tex.set(p,g={levels:new Map,bytes:0});const y=(u-(a(u)===ps?Oi:0))*64+d,m=g.levels.get(y)??0;g.levels.set(y,h),g.bytes+=h-m,r.texBytes+=h-m};s("activeTexture",u=>{r.unit=u[0]-K_}),s("bindTexture",u=>{r.bound.set(r.unit<<16|u[0],u[1]??null)}),s("texImage2D",u=>{const[d,h,p]=u;if(u.length>=8){const[,,,g,y,,m,f]=u;l(d,h,g*y*ti(p,m,f))}else if(u.length===6){const g=u[5],y=g?.videoWidth||g?.displayWidth||g?.width||0,m=g?.videoHeight||g?.displayHeight||g?.height||0;l(d,h,y*m*ti(p,u[3],u[4]))}}),s("texImage3D",u=>{const[d,h,p,g,y,m,,f,S]=u;l(d,h,g*y*m*ti(p,f,S))}),s("compressedTexImage2D",u=>{const[d,h]=u,p=u[u.length-1];l(d,h,typeof p=="number"?p:p?.byteLength??0)}),s("texStorage2D",u=>{const[d,h,p,g,y]=u,m=ti(p),f=d===ps?6:1;for(let S=0;S<f;S++)for(let R=0;R<h;R++)l(f>1?Oi+S:d,R,Math.max(1,g>>R)*Math.max(1,y>>R)*m)}),s("texStorage3D",u=>{const[d,h,p,g,y,m]=u,f=ti(p);for(let S=0;S<h;S++)l(d,S,Math.max(1,g>>S)*Math.max(1,y>>S)*(d===Z_?Math.max(1,m>>S):m)*f)}),s("generateMipmap",u=>{const d=u[0],h=d===ps?6:1,p=o(d),g=p&&r.tex.get(p);if(g)for(let y=0;y<h;y++){const m=h>1?Oi+y:d,f=g.levels.get((m-(h>1?Oi:0))*64)??0;l(m,63,Math.round(f/3))}}),s("deleteTexture",u=>{const d=r.tex.get(u[0]);d&&(r.texBytes-=d.bytes,r.tex.delete(u[0]))},!0),s("copyTexImage2D",u=>{const[d,h,p,,,g,y]=u;l(d,h,g*y*ti(p))}),s("framebufferTexture2D",u=>{u[3]&&r.attached.add(u[3])}),s("framebufferTextureLayer",u=>{u[2]&&r.attached.add(u[2])}),s("bindRenderbuffer",u=>{r.rb=u[1]??null});const c=(u,d,h,p)=>{if(r.allocs++,!r.rb)return;const g=r.rbs.get(r.rb)??0,y=d*h*ti(u)*Math.max(1,p);r.rbs.set(r.rb,y),r.rbBytes+=y-g};s("renderbufferStorage",u=>{const[,d,h,p]=u;c(d,h,p,1)}),s("renderbufferStorageMultisample",u=>{const[,d,h,p,g]=u;c(h,p,g,d)}),s("bufferData",()=>{r.allocs++}),s("deleteRenderbuffer",u=>{const d=r.rbs.get(u[0]);d!==void 0&&(r.rbBytes-=d,r.rbs.delete(u[0]))},!0)}gl;canvasBytes;tex=new Map;rbs=new Map;bound=new Map;unit=0;rb=null;attached=new WeakSet;texBytes=0;rbBytes=0;allocs=0;ooms=0;errorReads=0;reset(){this.tex.clear(),this.rbs.clear(),this.bound.clear(),this.texBytes=this.rbBytes=0,this.unit=0,this.rb=null}get total(){return this.texBytes+this.rbBytes+this.canvasBytes()}bytesOf(e,t){const n=t&&e.properties.get(t).__webglTexture;return n&&this.tex.get(n)?.bytes||0}report(e){const t={},n=new Set,r=(o,l)=>{const c=l&&e.properties.get(l).__webglTexture,u=c&&!n.has(c)&&this.tex.get(c);u&&(n.add(c),t[o]=(t[o]??0)+u.bytes)};for(const[o,l]of ws)if(o.isRenderTarget){const c=o;for(const u of c.textures)r(l,u);r(l,c.depthTexture)}else r(l,o);let s=0,a=0;for(const[o,l]of this.tex)n.has(o)||(this.attached.has(o)?a+=l.bytes:s+=l.bytes);return t.other=s,t.targets=(t.targets??0)+a+this.rbBytes,t.canvas=this.canvasBytes(),{total:this.total,byKind:t,textures:this.tex.size,buffers:this.rbs.size}}check(){let e=!1;this.allocs=0,this.errorReads++;for(let t=0,n=this.gl.getError();n&&t<8;t++,n=this.gl.getError())n===J_&&(e=!0);return e&&this.ooms++,e}checkIfAllocated(){return this.allocs>0?this.check():!1}}function XS(i,e,t){const n=s=>(s/1048576).toFixed(0),r=Object.entries(i.byKind).filter(([,s])=>s>=524288).sort((s,a)=>a[1]-s[1]).map(([s,a])=>`${s} ${n(a)}`);return`gpu    ${n(i.total)} of ${e.toFixed(0)} MB  ${r.join("  ")}${t?`  · ${t} let go`:""}`}const Js={"walking-wood":{id:6,cutoff:1050,sweep:.9},"giant-trees":{id:25,cutoff:720,sweep:.3},concertina:{id:65,cutoff:1700,sweep:1.6},"seeing-through-seeing":{id:75,cutoff:6200,sweep:.4},"held-breath":{id:78,cutoff:900,sweep:2},"out-of-time":{id:79,cutoff:2200,sweep:1.1},"distant-giants":{id:82,cutoff:1400,sweep:.6},"underwater-light":{id:89,cutoff:1150,sweep:.65},"inside-out-relief":{id:92,cutoff:3100,sweep:.8},"living-bark":{id:93,cutoff:1950,sweep:.75}};function j_(i){return i&&Object.hasOwn(Js,i)?i:void 0}function qS(i){const e=i.mushrooms?.trips[i.witches[0]?.id??0];if(!e)return;const t=_h(e.key),n=j_(t?.effect);if(!n||t?.comingSoon)return;const r=pl(e,i.clock.time);if(!r)return;const s=At(n).value,a=n==="held-breath"?i.party?.pulse?ud(i.party,i.map,i.clock.time).gone:0:i.clock.time;return{...Js[n],effect:n,amount:r,setting:s,phase:a}}function ey(i,e,t,n){const r=2*Math.PI/n;return t*.9/r*(Math.sin(i*r)-Math.sin(e*r))}function YS(i,e,t){return i+e*t*(1+Math.sin(i*.75))}const Lh={value:new Ye},ty=`
#ifndef WITCH_LANDSCAPE_TRIP
#define WITCH_LANDSCAPE_TRIP
uniform vec4 uLandscapeTrip; // stable effect ID, envelope, lab value, game time or wave progress
${Object.entries(Js).map(([i,e])=>`#define TRIP_${i.replaceAll("-","_").toUpperCase()} ${e.id}.0`).join(`
`)}
#endif
`,xn={uLandscapeTrip:Lh,uHeight:{value:null},uHeightWin:{value:new Ye(0,vs,0,0)},uBend:{value:new Ye(0,0,0,0)},uBendFwd:{value:new Ee(0,-1)},uWorldFold:{value:new B(0,40,0)}},ny=`
${ty}
uniform sampler2D uHeight;
uniform vec4 uHeightWin, uBend;
uniform vec2 uBendFwd;
uniform vec3 uWorldFold;
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
  if (uWorldFold.x > 0.0) {
    float phase = dot(w.xz, vec2(.8, .6)) / uWorldFold.y;
    w.y += uWorldFold.x * abs(fract(phase) * 2.0 - 1.0) - uWorldFold.z;
  }
  if (uLandscapeTrip.x == TRIP_CONCERTINA) {
    float k = 6.2831853 / uLandscapeTrip.z;
    w.x += uLandscapeTrip.y * .9 / k * (sin(w.x * k) - sin(uBend.y * k));
  }
  if (uBend.x == 0.0) return w;
  float d = max(0.0, dot(w.xz - uBend.yz, uBendFwd));
  return vec3(w.x, w.y - uBend.x * d * d, w.z);
}
`,iy=ny+`
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
`,ry=iy+`
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
`;function $S(i){return new wt({vertexShader:`attribute vec4 color;
varying vec4 vCol;
uniform float uSize;
${ry}
void main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,fragmentShader:`varying vec4 vCol;
void main() { gl_FragColor = vCol; }`,uniforms:{...xn,uSize:{value:i}},transparent:!0,depthWrite:!1,blending:nn})}class KS extends hd{texture;constructor(e,t,n){const r=performance.now();super(e,t,n,$f,dd(e)),Dh=this.H.on?this.H.amplitude:0,this.texture=new mi(this.half,vs,vs,Rr,on);const s=Q_(this.texture,"ground");s.magFilter=s.minFilter=at,s.wrapS=s.wrapT=Cs,s.generateMipmaps=!1,s.colorSpace=fn,s.needsUpdate=!0,xn.uHeight.value=s,this.filled&&this.changed();try{performance.mark("witch:height-prep-source",{detail:{seed:e.seed,status:this.prepSource,ms:performance.now()-r,filled:this.filled,ci:this.ci,cj:this.cj}})}catch{}}changed(){this.texture.needsUpdate=!0,xn.uHeightWin.value.set(this.H.on?ea:0,vs,this.ci*ea,this.cj*ea)}dispose(){this.texture.dispose()}}let Dh=0,Xo=null;function ZS(i){Xo=i}function Tr(i,e){return Xo?Xo.heightAt(i,e):0}function sy(i,e,t,n){const r=(.8*i+.6*e)/n;return t*Math.abs(2*(r-Math.floor(r))-1)}function qo(i){const e=xn.uWorldFold.value;e.x>0&&(i.y+=sy(i.x,i.z,e.x,e.y)-e.z);const t=xn.uBend.value,n=xn.uBendFwd.value,r=Lh.value;if(r.x===Js.concertina.id&&(i.x+=ey(i.x,t.y,r.y,r.z)),t.x===0)return i;const s=Math.max(0,(i.x-t.y)*n.x+(i.z-t.z)*n.y);return i.y-=t.x*s*s,i}function ay(i,e,t,n,r=1/0){if(t<=0||i<=0)return!0;const s=xn.uBend.value,a=Math.max(1,n.z-s.z),o=n.y+Dh+3,l=-a+Math.sqrt(a*a+o/t);if(i<=l)return!0;if(i>l+r)return!1;const c=(o+t*l*l)/(l+a);return(o-e+t*i*i)/(i+a)<=c+.02}function Ih(i,e,t,n){const r=xn.uBend.value,s=xn.uBendFwd.value;if(r.x<=0)return!0;const a=(i-r.y)*s.x+(t-r.z)*s.y;if(a<=0)return!0;const o=Math.max(1,-((n.x-r.y)*s.x+(n.z-r.z)*s.y)),l=n.y+r.w+3,c=-o+Math.sqrt(o*o+l/r.x);if(a<=c)return!0;const u=(l+r.x*c*c)/(c+o);return(l-e+r.x*a*a)/(a+o)<=u+.02}function JS(i,e,t,n){return Ih(i,e+Tr(i,t),t,n)}const du=16,ni={x:0,y:0,z:0},mr={x:0,y:0,z:0};function QS(i,e,t,n){const r=e+Tr(i,t);if(!Ih(i,r,t,n))return!1;ni.x=i,ni.y=r,ni.z=t,qo(ni);const s=ni.x,a=ni.y,o=ni.z;for(let l=1;l<du;l++){const c=l/du,u=s+(n.x-s)*c,d=a+(n.y-a)*c,h=o+(n.z-o)*c;if(mr.x=u,mr.y=Tr(u,h),mr.z=h,qo(mr),mr.y>d+.3)return!1}return!0}function oy(i){return i.y+=Tr(i.x,i.z),qo(i)}const Pr=3,fu=new Map;function jS(i,e=3){const t=`${i}:${e}`,n=fu.get(t);if(n)return n;const r=Math.round(i*1.7)+4,s=Math.round(i*1.5)+4,a=Math.max(2,Math.round(i/10)),o=Array.from({length:Math.max(1,e)},(C,I)=>a+I);let l=0;for(let C=1;C<o.length;C++)l+=Math.round((o[C]+o[C-1])*.55);const c=Math.max(1,o[0]+2+l-Math.round(r*.28)),u=0,d=c+r/2,h=Math.ceil(c+r+1),p=r*.4,g=s*.3,y=u+s*.6,m=[[.5,.35,.33],[.25,.47,.25],[.75,.45,.27],[.1,.66,.17],[.9,.64,.18],[.34,.76,.22],[.66,.77,.21]].map(([C,I,D])=>[c+C*r,u+I*s,D*s]),f=(C,I)=>{const D=C+.5,N=I+.5;if(((D-d)/p)**2+((N-y)/g)**2<=1)return!0;for(const[$,Y,se]of m)if((D-$)**2+(N-Y)**2<=se*se)return!0;return!1},S=[];let R=Math.round(c+r*.28),v=0;for(let C=-o[o.length-1];C<=o[o.length-1];C++)for(let I=0;I<s+4;I++)f(R+C,I)&&(v=Math.max(v,I));let M=v+2+o[o.length-1];for(let C=o.length-1;C>=0;C--)S.unshift({x:R,y:M,r:o[C]}),C&&(M+=o[C]+o[C-1]+1,R-=Math.round((o[C]+o[C-1])*.55));const E=S[0].y+o[0]+1,A=(C,I)=>{if(f(C,I))return!0;const D=C+.5,N=I+.5;for(const $ of S)if((D-$.x)**2+(N-$.y)**2<=$.r*$.r+.6)return!0;return!1},x=new Uint8Array(h*E);for(let C=0;C<E;C++)for(let I=0;I<h;I++)A(I,C)&&(x[C*h+I]=2);for(let C=0;C<2;C++)for(let I=0;I<E;I++)for(let D=0;D<h;D++){const N=I*h+D;x[N]&&+(D>0&&!!x[N-1])+ +(D<h-1&&!!x[N+1])+ +(I>0&&!!x[N-h])+ +(I<E-1&&!!x[N+h])<2&&(x[N]=0)}const w=(C,I)=>C>=0&&I>=0&&C<h&&I<E&&x[I*h+C]!==0,L=[];for(let C=0;C<E;C++)for(let I=0;I<h;I++)x[C*h+I]&&(!w(I-1,C)||!w(I+1,C)||!w(I,C-1)||!w(I,C+1))&&L.push(C*h+I);for(const C of L)x[C]=1;const U={w:h,h:E,px:x,box:{x:Math.round(d-i/2),y:Math.round(u+s*.55-i/2),n:i},foot:{x:S[0].x,y:S[0].y},puffs:S};return fu.set(t,U),U}function ly(i,e,t,n){for(let r=0;r<i.px.length;r++){const s=i.px[r]===1?e:i.px[r]===2?t:null,a=r*4;if(!s){n[a+3]=0;continue}n[a]=s[0],n[a+1]=s[1],n[a+2]=s[2],n[a+3]=Math.round(s[3]*255)}}function eM(i,e,t,n=!0){if(!n)return{kind:"emoji",alpha:1};const r=Math.max(.2,t.hold),s=i+e%11*r*.29,a=Math.floor(s/r),o=s-a*r,l=a%2===0?"emoji":fd(e,a,9127)<t.flask?"flask":"sigil",c=Math.max(.001,Math.min(t.fade,r/2)),u=Math.max(0,Math.min(1,o/c,(r-o)/c));return{kind:l,alpha:u*u*(3-2*u)}}const pu=(i,e)=>Math.round(i/e)*e;function Uh(i,e){if(e===void 0)return 1;const t=i.bubbles.levelScale??[1];return t[Math.max(0,Math.min(t.length-1,e))]}const cy=(i,e)=>Math.max(1,Math.round(Pr*Uh(i,e)));function uy(i,e,t,n){const r=Uh(t,n),s=t.pixelSize*t.bubbles.scale*r,a=t.bubbles.emojiPixels;i.style.setProperty("--px",`${cy(t,n)}px`),e.style.width=e.style.height=`${Math.round(a*s)}px`}const Yo=new Map,Hs=new Map;function Nh(i,e){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d",{willReadFrequently:!0});let r=null;if(n){n.font=`${e-1}px sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e/2,e/2+.5),r=n.getImageData(0,0,e,e);for(let s=3;s<r.data.length;s+=4)r.data[s]=r.data[s]<110?0:255;n.putImageData(r,0,0)}return Hs.set(`${i}:${e}`,r),t}function Fh(i,e){const t=`${i}:${e}`;let n=Yo.get(t);return n||(n=Nh(i,e).toDataURL(),Yo.set(t,n),n)}function kh(i,e){return Hs.has(`${i}:${e}`)||Nh(i,e),Hs.get(`${i}:${e}`)??null}const mu=new Set;function tM(i,e,t){const n=`${i}:${e}`;if(!mu.has(n)){const r=document.createElement("canvas");r.width=r.height=e;const s=r.getContext("2d",{willReadFrequently:!0});let a=null;if(s){t(s,e),a=s.getImageData(0,0,e,e);for(let o=3;o<a.data.length;o+=4)a.data[o]=a.data[o]<110?0:255;s.putImageData(a,0,0)}Hs.set(n,a),Yo.set(n,r.toDataURL()),mu.add(n)}return i}function hy(i,e){const t=document.createElement("img");return t.src=Fh(i,e),t.width=t.height=e,t.style.imageRendering="pixelated",t.style.display="block",t}function nM(i){const e=document.createElement("div"),t=document.createElement("img");return e.className="bubble",t.style.imageRendering="pixelated",t.style.display="block",e.append(t),i.append(e),{el:e,img:t}}function iM(i,e,t,n,r){i.dataset.e===t&&i.dataset.l===`${r}`||(i.dataset.e=t,i.dataset.l=`${r}`,e.src=Fh(t,n.bubbles.emojiPixels),uy(i,e,n,r))}function rM(i,e){const t=document.createElement("div"),n=document.createElement("canvas");return t.className=`thought ${e}`,n.className="cloud",t.append(n),i.append(t),t}function sM(i,e,t,n,r=Pr){const s=`${e.w}x${e.h}:${t}:${n}:${r}`;if(i.dataset.c===s)return;i.dataset.c=s;const a=i.firstChild,o=a.getContext("2d");if(a.width=e.w,a.height=e.h,a.style.width=`${e.w*r}px`,a.style.height=`${e.h*r}px`,i.style.width=a.style.width,i.style.height=a.style.height,!o)return;const l=o.createImageData(e.w,e.h);ly(e,t,n,l.data),o.putImageData(l,0,0)}function dy(i,e,t,n,r,s,a,o=Pr){n=`${n}@${o}`;let l=i.querySelector(`.${t}`);if(!l||l.dataset.k!==n){const c=s();c.classList.add(t),c.dataset.k=n;const u=Math.floor((e.box.n-r)/2);Object.assign(c.style,{position:"absolute",width:`${r*o}px`,height:`${r*o}px`,left:`${(e.box.x+u)*o}px`,top:`${(e.box.y+u)*o}px`}),l?l.replaceWith(c):i.append(c),l=c}for(const c of i.querySelectorAll(":scope > :not(.cloud)"))c.style.display=c===l?"":"none";l.style.opacity=a.toFixed(2)}function aM(i,e,t,n,r,s=Pr){dy(i,e,"emoji",`${t}:${n}`,n,()=>hy(t,n),r,s)}function oM(i,e,t,n=Pr){return{left:pu(e-(i.foot.x+.5)*n,n),top:pu(t-(i.foot.y+.5)*n,n)}}const Ze=40,Oh=4,Rn=13,pn=17;let Ga=null;function Bh(){if(Ga)return Ga;const i=[];for(let e=0;e<Ze;e++)for(let t=0;t<Ze;t++){const n=t+.5-Ze/2,r=e+.5-Ze/2,s=Math.hypot(n,r);Math.abs(s-Rn)>.7||i.push(t,e,(Math.atan2(n,-r)/(Math.PI*2)+1)%1)}return Ga=i}function $o(i,e,t,n,r,s,a,o){const l=t/2,c=Math.cos(e),u=Math.sin(e),d=-u,h=c;for(let p=0;p<t;p++)for(let g=0;g<t;g++){const y=g+.5-l,m=p+.5-l,f=y*c+m*u,S=y*d+m*h;f<n||f>r||Math.abs(S)<=s*(r-f)/(r-n)+.25&&i.dot(g,p,a,o)}}function fy(i,e,t,n,r,s,a,o,l=1){const c=e.getWorldDirection(i),u=c.x,d=c.z,h=Math.hypot(u,d)||1,p=r-a,g=s-o,y=(p*u+g*d)/h,m=(p*-d+g*u)/h,f=xn.uBend.value,S=-(s-f.z),R=Tr(r,s),v=oy(i.set(r,l,s)).project(e),M=v.z<1&&ay(S,R+l,f.x,e.position),E=Math.max(Math.abs(v.x),Math.abs(v.y)),A=M?Math.min(1,Math.max(0,(E-.9)/.25)):1,x=m,w=-y,L=1/Math.max(Math.abs(x)/(.84*t/2),Math.abs(w)/(.76*n/2),1e-9);return{show:A,ex:t/2+x*L,ey:n/2+w*L,angle:Math.atan2(w,x),sx:(v.x+1)/2*t,sy:(1-v.y)/2*n,seen:M}}function lM(i,e,t,n,r){const s=[],a=e/2,o=Math.cos(i),l=Math.sin(i),c=-l,u=o;for(let d=0;d<e;d++)for(let h=0;h<e;h++){const p=h+.5-a,g=d+.5-a,y=p*o+g*l,m=p*c+g*u;y<t||y>n||Math.abs(m)<=r*(n-y)/(n-t)+.25&&s.push([h,d])}return s}const py={spots:[],reset(){this.spots.length=0},claim(i,e,t,n,r=!0){const s=-Math.sin(t),a=Math.cos(t),o=(u,d)=>this.spots.every(h=>Math.hypot(h.x-u,h.y-d)>=h.r+n);let l=i,c=e;for(let u=0;r&&u<8&&!o(l,c);u++){const d=(u%2?-1:1)*Math.ceil((u+1)/2)*n*2;l=i+s*d,c=e+a*d}return this.spots.push({x:l,y:c,r:n}),{x:l,y:c}}};class zh{constructor(e,t=Oh,n=1){this.scale=t,this.canvas.width=this.canvas.height=Ze,Object.assign(this.canvas.style,{position:"fixed",width:`${Ze*t}px`,height:`${Ze*t}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none",opacity:`${n}`}),this.label.style.opacity=`${n}`,Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:'16px "Tiny5", ui-monospace, monospace',lineHeight:"16px",whiteSpace:"nowrap",color:"#e8e2f4",background:"rgba(14, 9, 22, 0.72)",padding:"2px 4px 0",transform:"translate(-50%, -50%)",webkitFontSmoothing:"none"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData(Ze,Ze)}scale;canvas=document.createElement("canvas");label=document.createElement("div");g;img;hide(){this.canvas.style.display="none",this.label.style.display="none"}dispose(){this.canvas.remove(),this.label.remove()}text="";textW=0;say(e,t,n,r,s,a,o){const l=this.label;l.style.display="block",e!==this.text&&(this.text=l.textContent=e,this.textW=l.offsetWidth||e.length*9),l.style.color=t;const c=o+Math.abs(s)*this.textW/2+Math.abs(a)*9;l.style.left=`${n+s*c}px`,l.style.top=`${r+a*c}px`}place(e,t,n=1){const r=Ze*this.scale*n;this.canvas.style.display="block",this.canvas.style.width=this.canvas.style.height=`${r}px`,this.canvas.style.left=`${e-r/2}px`,this.canvas.style.top=`${t-r/2}px`}clear(){this.img.data.fill(0)}dot(e,t,n,r){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=Ze||t>=Ze||r<=.02)return;const s=(t*Ze+e)*4;if(this.img.data[s+3]>=r*255)return;const a=this.img.data;a[s]=n[0],a[s+1]=n[1],a[s+2]=n[2],a[s+3]=Math.round(Math.min(1,r)*255)}flush(){this.g.putImageData(this.img,0,0)}}function my(i,e,t,n=Math.PI/2,r){i.clear();const s=Bh();for(let o=0;o<s.length;o+=3)i.dot(s[o],s[o+1],e,1);const a=kh(t,pn);if(a&&a.data.some((o,l)=>l%4===3&&o>0)){const o=Math.floor((Ze-pn)/2),l=a.data;for(let c=0;c<pn;c++)for(let u=0;u<pn;u++){const d=(c*pn+u)*4;l[d+3]&&i.dot(o+u,o+c,[l[d],l[d+1],l[d+2]],1)}}else if(r){const o=Math.floor((Ze-r[0].length)/2),l=Math.floor((Ze-r.length)/2);for(let c=0;c<r.length;c++)for(let u=0;u<r[c].length;u++)r[c][u]!=="."&&i.dot(o+u,l+c,e,1)}$o(i,n,Ze,Rn+2,Rn+7,3.5,e,1),i.flush()}const gy=Rn+7,vy=i=>{const e=t=>{const n=((t+i*6)%6+6)%6;return 1-Math.max(0,Math.min(1,Math.min(n,4-n)))};return[e(5),e(3),e(1)]},ii={plate:0,vivid:0,track:.55},Va=[10,8,20],Ko=i=>{const e=(i[0]+i[1]+i[2])/3,t=i.map(r=>r*.55+e*.45),n=Math.max(...i)*.95/Math.max(1,...t);return t.map(r=>Math.min(255,r*n))},xy=["....##########.","....##########.","....##......##.","....##########.","....##......##.","....##......##.","....##......##.","....##......##.","....##......##.",".####....#####.","#####...######.","#####...######.",".###.....####.."],_y=["...............","####...####...#","#..####...####.","#.+..#..+.#..#.","#.++.#.+++#..#.","#..+.#..+.#.+#.","#....#....#.++.","#.+..#....#..#.","#.++.#..+.#..#.","####.####.####.","....####...####","..............."],cM=[".........###...","........####...",".......####....","......#####....","......#####....",".....######....",".....######....","....#######....","....+++++++....","..###########..","###############",".#############."],uM=[".....+++++.....",".....#####.....","......#.#......","......#.#......",".....##.##.....","...###...###...","..#.........#..",".#.+.........#.",".#+++++++++++#.","#++.++++++++++#","#++++++++.++++#","#+++++++++++++#",".#+++++++++++#.","..#+++++++++#..","...#########..."],hM=(()=>{const i=[];for(let e=0;e<15;e++){let t="";for(let n=0;n<15;n++){const r=Math.hypot(n-7,(e-8.5)*1.05);t+=e<2?n===7?"#":".":r>6.5?".":r>5.6||n%3===1||e%3===0?"#":"+"}i.push(t)}return i})(),yy=20,Sy=3,My=(i,e,t)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i))*t,by=6;class dM{constructor(e,t=Oh,n=1){this.opacity=n,this.cue=new zh(e,t,n)}opacity;cue;v=new B;glyphs=new Map;lastFill=0;flashAt=-1/0;shown=-1;dispose(){this.cue.dispose()}pop(){const e=this.cue.label;e.style.animation="none",e.offsetWidth,e.style.animation="bpm-up 1.4s ease-out"}fade(e){if(Math.abs(e-this.shown)<.01)return;this.shown=e;const t=`${(e*this.opacity).toFixed(2)}`;this.cue.canvas.style.opacity=t,this.cue.label.style.opacity=t,this.cue.canvas.style.visibility=this.cue.label.style.visibility=t==="0.00"?"hidden":"visible"}update(e,t,n,r,s,a,o,l,c,u){const d=this.cue;if(c<this.lastFill-.5&&(this.flashAt=o),this.lastFill=c,!r){d.hide();return}const h=r.top??3.2,p=fy(this.v,e,t,n,r.x,r.z,s,a,h),g=Math.hypot(r.x-s,r.z-a),y=1-p.show,m=y*y*(3-2*y),f=(1-.3*m*(1-Math.min(1,Math.max(0,(g-12)/28))))*(r.scale??1),S=d.scale*f,R=Ze*S/2,v=m*Sy*Math.sin(o*Math.PI),M=Math.min(p.sy-(r.gap??yy),(r.above??1/0)-by),E=Math.max(R+4,M-(Rn+7)*S)+v;let A=p.ex+(p.sx-p.ex)*m,x=p.ey+(E-p.ey)*m;const w=My(p.angle,Math.PI/2,m);({x:A,y:x}=py.claim(A,x,w,Ze*d.scale*f*.42)),d.place(A,x,f),d.clear();const L=o*l/60,U=Math.pow(.5+.5*Math.cos(L%1*Math.PI*2),2),C=Math.max(0,1-(o-this.flashAt)/.5),I=H=>{const X=Ko(H),le=ii.vivid;return le>0?X.map((ve,he)=>Math.min(255,ve+(H[he]-ve)*le)):X},D=H=>{const X=vy(H);return I([X[0]*255,X[1]*255,X[2]*255])},N=r.rainbow?D(o*.25):I([r.colour.x*255,r.colour.y*255,r.colour.z*255]),$=H=>H.map(X=>Math.min(255,X*(.9+.15*U)+255*C*.4)),Y=$(N);if(ii.plate>0&&!r.bare){const H=Rn+2.2;for(let X=0;X<Ze;X++)for(let le=0;le<Ze;le++)Math.hypot(le+.5-Ze/2,X+.5-Ze/2)<=H&&d.dot(le,X,Va,ii.plate);$o(d,w,Ze,Rn+1,Rn+8.5,5,Va,ii.plate)}const se=H=>{const X=(H[0]+H[1]+H[2])/3,le=ii.track,ve=Math.min(1,le*.8);return H.map(he=>(X+(he-X)*ve)*le)},Z=Rn,ne=Bh(),re=se(N);for(let H=0;H<(r.bare?0:ne.length);H+=3){const X=r.rainbow?D(ne[H+2]+o*.25):null;ne[H+2]<=c||C>0?d.dot(ne[H],ne[H+1],X?$(X):Y,1):d.dot(ne[H],ne[H+1],X?se(X):re,.9)}const Pe=r.emoji?kh(r.emoji,pn):null;if(Pe&&Pe.data.some((H,X)=>X%4===3&&H>0)){const H=Math.floor((Ze-pn)/2),X=Pe.data;for(let le=0;le<pn;le++)for(let ve=0;ve<pn;ve++){const he=(le*pn+ve)*4;X[he+3]&&d.dot(H+ve,H+le,[X[he],X[he+1],X[he+2]],1)}}else if(r.notes||r.glyph){const H=r.glyphColour?Ko([r.glyphColour.x*255,r.glyphColour.y*255,r.glyphColour.z*255]).map(ye=>Math.min(255,ye*(.9+.15*U)+255*C*.4)):Y,X=r.glyph??xy,le=Math.floor((Ze-X[0].length)/2),ve=Math.floor((Ze-X.length)/2),he=H.map(ye=>Math.min(255,ye*.6+255*.4));for(let ye=0;ye<X.length;ye++){const it=X[ye];for(let Ne=0;Ne<it.length;Ne++){const ke=it[Ne];ke==="#"?d.dot(le+Ne,ve+ye,H,1):ke==="+"&&d.dot(le+Ne,ve+ye,he,1)}}}else if(r.species){const H=Math.max(8,Math.min(Ze-6,Math.round(r.sigilSize??17))),X=`${r.species}:${H}${r.bold?":bold":""}`;let le=this.glyphs.get(X);le||(le=r.bold&&pd(r.species,H)||md(r.species,H),this.glyphs.set(X,le));const ve=le.w,he=le.m,ye=r.crown?gd(Math.round(ve*.7)):null,it=Math.floor((Ze-le.w)/2),Ne=ye?Math.floor((Ze-(ve+ye.h+1))/2)+ye.h+1:it,ke=ye?{ox:Math.floor((Ze-ye.w)/2),oy:Ne-ye.h-1}:null;if(r.bare&&ii.plate>0){const Fe=(Se,Ie)=>Se>=it&&Ie>=Ne&&Se<it+ve&&Ie<Ne+ve&&!!he[(Ie-Ne)*ve+Se-it]||!!ye&&!!ke&&Se>=ke.ox&&Ie>=ke.oy&&Se<ke.ox+ye.w&&Ie<ke.oy+ye.h&&!!ye.m[(Ie-ke.oy)*ye.w+Se-ke.ox];for(let Se=0;Se<Ze;Se++)for(let Ie=0;Ie<Ze;Ie++)!Fe(Ie,Se)&&(Fe(Ie-1,Se)||Fe(Ie+1,Se)||Fe(Ie,Se-1)||Fe(Ie,Se+1)||Fe(Ie-1,Se-1)||Fe(Ie+1,Se+1)||Fe(Ie-1,Se+1)||Fe(Ie+1,Se-1))&&d.dot(Ie,Se,Va,ii.plate)}if(r.shine){const Fe=$([r.colour.x*255,r.colour.y*255,r.colour.z*255]),Se=Qe=>Fe.map(He=>He+(255-He)*Qe),Ie=o/2.6%1,et=Ie<.4?Ie/.4*1.6-.3:-9;for(let Qe=0;Qe<ve;Qe++)for(let He=0;He<ve;He++){if(!he[Qe*ve+He])continue;const mt=Math.abs(((He+.5)/ve+1-(Qe+.5)/ve)/2-et)<.13;d.dot(it+He,Ne+Qe,mt?Se(.85):Fe,1)}if(ye&&ke)for(let Qe=0;Qe<ye.h;Qe++)for(let He=0;He<ye.w;He++)ye.m[Qe*ye.w+He]&&d.dot(ke.ox+He,ke.oy+Qe,Fe,1)}else{for(let Fe=0;Fe<ve;Fe++)for(let Se=0;Se<ve;Se++)he[Fe*ve+Se]&&d.dot(it+Se,Ne+Fe,Y,1);if(ye&&ke)for(let Fe=0;Fe<ye.h;Fe++)for(let Se=0;Se<ye.w;Se++)ye.m[Fe*ye.w+Se]&&d.dot(ke.ox+Se,ke.oy+Fe,Y,1)}}if($o(d,w,Ze,Z+2,Z+7,3.5,Y,1),d.flush(),!(u!==""&&(!!u||g>20))){d.label.style.display="none";return}const qe=-Math.cos(w)*(1-m)+m,Xe=-Math.sin(w)*(1-m),Ge=Math.hypot(qe,Xe)||1;d.say(u??`${Math.round(g)} m`,`rgb(${N.map(Math.round).join(",")})`,A,x,qe/Ge,Xe/Ge,(Z+1.5)*d.scale*f)}}const wy=Ko([232,180,106]),Zo=3,Ey=4,ms=Ze*Zo/2+6;class Ty{cue;angle=NaN;shown=1;constructor(e=document.body){this.cue=new zh(e,Zo),this.cue.canvas.style.zIndex="3"}update(e,t,n,r=1,s=0){if(this.shown=Ex(this.shown,r,s),!e||this.shown<=0){this.cue.hide(),this.angle=NaN;return}this.cue.canvas.style.opacity=`${this.shown}`;const a=gy*Zo+Ey+Math.abs(Math.sin(n*Math.PI))*3,o=e.x,l=e.y-a,c=Math.max(ms,Math.min(t.width-ms,o)),u=Math.max(ms,Math.min(t.height-ms,l)),d=c!==o||u!==l,h=d?Math.atan2(e.y-u,e.x-c):Math.PI/2;Math.abs(h-this.angle)<=.02||(my(this.cue,wy,"🧭",h,_y),this.angle=h),this.cue.place(t.left+c,t.top+u)}dispose(){this.cue.dispose()}}function Hh(i,e=0){if(i!=="home"&&!As(i))return null;const t=vd(e).islands.get(i);return t?{x:t.x,y:t.y}:null}function Ay(i,e,t,n){const r=i.find(u=>u.id===e),s=Math.hypot(t,n);if(!r||!s)return null;const a=t/s,o=n/s;let l=null,c=1/0;for(const u of i){if(u.id===e)continue;const d=u.x-r.x,h=u.y-r.y,p=Math.hypot(d,h);if(!p)continue;const g=(d*a+h*o)/p;if(g<.5)continue;const y=p*(2-g);y<c&&(c=y,l=u.id)}return l}class Ry{constructor(e,t){this.island=e,this.early=t}island;early;committed=!1;frame(e){return this.committed||!this.early||!e?!1:(this.committed=!0,!0)}handOver(){this.committed=!0}press(e,t=!1){return e&&!t&&!this.committed?"cancel":"none"}}const Sl=()=>{const i=globalThis.__travelProbe;return i?.trace?.capabilities?.workerMessages?i:void 0},Xi=new WeakMap,gu=new WeakMap;let Cy=0,Py=0;const Ml=()=>performance.timeOrigin+performance.now();function Ly(i,e,t,n){const r=Sl();if(!r?.record)return;const s=i.seed,a={jobId:`job-${++Cy}`,jobKind:e,id:t,enqueuedEpochMs:Ml(),queueDepth:n,...typeof s=="number"?{seed:s}:{}};Xi.set(i,a),r.record({kind:"worker-job",phase:"enqueue",...a,at:performance.now()})}function fM(i,e){const t=Xi.get(i);t&&(Sl()?.record?.({kind:"worker-job",phase:"cancel",...t,reason:e,endedEpochMs:Ml(),at:performance.now()}),Xi.delete(i))}function xr(i,e,t,n,r=0){const s=Sl();if(!s?.record){i.postMessage(e);return}Xi.has(e)||Ly(e,t,n,r);let a=gu.get(i);a===void 0&&(a=i._travelWorkerIndex??++Py,gu.set(i,a));const o={...Xi.get(e),workerIndex:a};Xi.set(e,o),s.record({kind:"worker-job",phase:"dispatch",...o,at:performance.now(),dispatchEpochMs:Ml()}),i.postMessage({...e,__witchJobTrace:o})}const Ar="witch.arrive",Dy=3e4,bl=()=>Sd();function Iy(i,e,t,n=bl(),r=Date.now()){const s={v:1,island:i,world:e,at:r,...t};try{n?.setItem(Ar,JSON.stringify(s))}catch{try{n?.setItem(Ar,JSON.stringify({...s,still:""}))}catch{}}}function pM(i,e=bl(),t=Date.now()){let n=null;try{n=JSON.parse(e?.getItem(Ar)??"null"),e?.removeItem(Ar)}catch{return null}return!n||n.v!==1||n.island!==i||!(t-n.at>=0&&t-n.at<Dy)||!n.cam?null:n}function mM(i=bl()){try{i?.removeItem(Ar)}catch{}}const Jo=32,Gh=(i,e)=>i==="home"?0:As(i,e)?.phase??1;function Vh(i,e){const t=n=>Math.hypot(n.x-e.x,n.y-e.y);return[...i].sort((n,r)=>n.phase-r.phase||t(n)-t(r)).map(n=>n.id)}function vu(i,e){const t=r=>Math.hypot(r.x-e.x,r.y-e.y),n=i.filter(r=>r.id==="home"||r.sail).sort((r,s)=>r.id==="home"?-1:s.id==="home"?1:t(r)-t(s));return[...n.map(r=>r.id),...Vh(i.filter(r=>!n.includes(r)),e)]}function Uy(i){const e=["home",...Za].map(t=>{const n=Hh(t,i);return{id:t,x:n?.x??9,y:n?.y??0,phase:Gh(t,i)}});return Vh(e,{x:0,y:0})}let Xn=null;function xu(i,e){const t=new Set(Pu({...Ja(i),found:e}));return Uy(i).filter(n=>t.has(n)&&(n==="home"||!Yi(n)))}function gM(i,e,t,n,r=xu(i,e),s){if(Xn)return;const a=new Set(xu(i,e));r=[...new Set(r)].filter(l=>a.has(l));let o;try{o=new Worker(new URL(""+new URL("chartOutlines.worker-DHr_avRh.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{s?.();return}Xn=o,o.onmessage=l=>{Xn===o&&"warmDone"in l.data&&(o.terminate(),Xn=null,t?.(l.data.made,l.data.kept))},o.onerror=()=>{Xn===o&&(o.terminate(),Xn=null,s?.())},xr(o,{world:i,found:e,ids:r,step:Jo,warm:!0,cold:Eu()},"chart:request","warm",r.length)}function vM(){const i=Xn;Xn=null,i?.terminate()}function Ny(i,e=Math.random){const t=new URL(i);return t.searchParams.set("seed",String(Math.floor(e()*1e6))),t.toString()}function xM(i,e){const t=i.get("sail");return t==="inplace"||t==="reload"?t:e.sail?.inPlace?"inplace":"reload"}const Fy=["arrive","wave","cleared","at","mode","zoom","set","found","bot","quest","arena","fight","pack","partyover","shot"];function _M(i,e,t,n){const r=new URLSearchParams({island:e,seed:String(t)});n!=null&&r.set("world",String(n));const s=new Set([...Fy,"island","seed","world"]);for(const[a,o]of i)s.has(a)||r.append(a,o);return r}function yM(i,e,t,n){return new URL(`./?island=${i}&seed=${e}&arrive=1${t!=null?`&world=${t}`:""}`,n).href}function SM(i,e){const t=new Set((i.get("set")??"").split(";").map(n=>n.split("=")[0]).filter(Boolean));for(const n of e)n.apply.knob&&i.has(`d_${n.id}`)&&t.add(n.apply.knob);return t}function MM(i,e,t=Math.random){if(i==="bot"){const n=new URL(e);return n.searchParams.delete("bot"),n.toString()}return Ny(e,t)}function bM(i,e){const t=new URL(e).searchParams,n=xd(t.get("seed"));if(n===null)throw new Error(`a new night in place: no seed in ${e}`);return{how:i,island:t.get("island")??"",seed:n,world:t.has("world")?Number(t.get("world")):void 0,params:t}}class wM{constructor(e,t){this.h=e,this.onBack=t}h;onBack;armed=!1;url="";sailed(e){this.url=e,this.h.pushState({witch:"night"},"",e),this.h.pushState({witch:"guard"},"",e),this.armed=!0}popped(){return this.armed?(this.h.pushState({witch:"guard"},"",this.url),this.onBack(),!0):!1}}async function EM(i,e,t,n=()=>{}){try{return await i(),!0}catch(r){try{n(r)}catch{}return t(e),!1}}function TM(i){return i&&Qo(i)?i:null}function AM(i){return i==="over"?"Back to the afterparty":"Back to the party"}function ky(i,e,t){return i&&i.island===e&&i.world===t?"stay":"sail"}function Oy(i,e,t,n){return i??(e&&e.world===t?e.island:void 0)??n??"home"}const By={"game.moveUp":{context:"game",name:"Move up",about:"Fly or walk up the screen.",keys:["KeyW","ArrowUp"],mouse:[],pad:["lsUp"]},"game.moveDown":{context:"game",name:"Move down",about:"Fly or walk down the screen.",keys:["KeyS","ArrowDown"],mouse:[],pad:["lsDown"]},"game.moveLeft":{context:"game",name:"Move left",about:"Fly or walk left.",keys:["KeyA","ArrowLeft"],mouse:[],pad:["lsLeft"]},"game.moveRight":{context:"game",name:"Move right",about:"Fly or walk right.",keys:["KeyD","ArrowRight"],mouse:[],pad:["lsRight"]},"game.aimUp":{context:"game",name:"Aim up",about:"Aim the 💌 up the screen (with the mouse: the cursor aims).",keys:[],mouse:[],pad:["rsUp"]},"game.aimDown":{context:"game",name:"Aim down",about:"Aim the 💌 down the screen.",keys:[],mouse:[],pad:["rsDown"]},"game.aimLeft":{context:"game",name:"Aim left",about:"Aim the 💌 left.",keys:[],mouse:[],pad:["rsLeft"]},"game.aimRight":{context:"game",name:"Aim right",about:"Aim the 💌 right.",keys:[],mouse:[],pad:["rsRight"]},"game.rise":{context:"game",name:"Rise / land",about:'Rise to the treetops, or land. Nothing else (Ed: "rising is not quite a free action").',keys:["Space"],mouse:[],pad:["cross"]},"game.use":{context:"game",name:"Use",about:"Use what's here: open a station, take a rune, put down or pick up a sigil; at her decks once the party's on, the party start again. Held: a run, picking up or putting down as she goes.",keys:["KeyE"],mouse:[],pad:["square"]},"game.invite":{context:"game",name:"Invite 💌",about:"Throw 💌 invites where she aims (held: keep throwing).",keys:["Digit1"],mouse:["left"],pad:["R2"]},"game.dodge":{context:"game",name:"Dodge",about:"Blink the way she's going.",keys:[],mouse:["right"],pad:["L2","circle"]},"game.cycleNext":{context:"game",name:"Next sigil",about:"Cycle the stack: the bottom sigil (the next put down) to the top.",keys:["KeyQ"],mouse:[],pad:["R1"]},"game.cyclePrev":{context:"game",name:"Previous sigil",about:"Cycle the stack back: the top sigil to the bottom.",keys:[],mouse:[],pad:["L1"]},"game.hat":{context:"game",name:"Hat",about:"Put her hat down, or pick one up (on the keyboard: hold Use with nothing to do).",keys:[],mouse:[],pad:["triangle"]},"game.boost":{context:"game",name:"Broom spell",about:"Her broom's spell, if it has one (the boost, the ley jump, the ground pound).",keys:["KeyR"],mouse:[],pad:["L3"]},"game.zoomIn":{context:"game",name:"Zoom in",about:"Bring the camera in.",keys:["KeyZ","Equal","NumpadAdd"],mouse:["wheelUp"],pad:["down"]},"game.zoomOut":{context:"game",name:"Zoom out",about:"Take the camera out.",keys:["KeyX","Minus","NumpadSubtract"],mouse:["wheelDown"],pad:["up"]},"game.autoTalk":{context:"game",name:"Auto-talk",about:"Turn auto-talk on or off (off, she talks while Talk is held).",keys:["KeyT"],mouse:[],pad:[]},"game.talk":{context:"game",name:"Talk",about:"With auto-talk off, she talks while this is held.",keys:["ShiftLeft","ShiftRight"],mouse:[],pad:[]},"game.debug":{context:"game",name:"Debug",about:"The debug overlay.",keys:["Backquote"],mouse:[],pad:["share"]},"game.nextWave":{context:"game",name:"Next wave",about:"Playtest: bring the next wave now.",keys:["KeyN"],mouse:[],pad:[],dev:!0},"game.pauseWaves":{context:"game",name:"Pause waves",about:"Playtest: pause or resume the waves' timer.",keys:["KeyP"],mouse:[],pad:[],dev:!0},"game.cycleSpeakers":{context:"game",name:"Cycle speakers",about:"Debug: every speaker on to its next state.",keys:["KeyK"],mouse:[],pad:[],dev:!0},"game.inviteNearest":{context:"game",name:"Invite nearest",about:"Debug: invite the nearest creature.",keys:["KeyI"],mouse:[],pad:[],dev:!0},"game.feedNearest":{context:"game",name:"Feed nearest",about:"Debug: the nearest party animal eats a berry.",keys:["KeyB"],mouse:[],pad:[],dev:!0},"game.happyNearest":{context:"game",name:"Cheer nearest",about:"Debug: the nearest creature happy at once.",keys:["KeyO"],mouse:[],pad:[],dev:!0},"global.pause":{context:"global",name:"Pause",about:"Pause everything (a still for screenshots, with a stamp of where you are).",keys:["Escape"],mouse:[],pad:["options"]},"menu.up":{context:"menu",name:"Menu up",about:"Move the highlight up.",keys:["KeyW","ArrowUp"],mouse:[],pad:["up","lsUp"]},"menu.down":{context:"menu",name:"Menu down",about:"Move the highlight down.",keys:["KeyS","ArrowDown"],mouse:[],pad:["down","lsDown"]},"menu.left":{context:"menu",name:"Menu left",about:"Move the highlight left (on a slider: less).",keys:["KeyA","ArrowLeft"],mouse:[],pad:["left","lsLeft"]},"menu.right":{context:"menu",name:"Menu right",about:"Move the highlight right (on a slider: more).",keys:["KeyD","ArrowRight"],mouse:[],pad:["right","lsRight"]},"menu.choose":{context:"menu",name:"Choose",about:"Choose what's highlighted (at the sea chart: sail).",keys:["Space","Enter","NumpadEnter"],mouse:[],pad:["cross"]},"menu.back":{context:"menu",name:"Back",about:"Go back, or close the menu.",keys:["KeyE"],mouse:[],pad:["circle"]},"menu.tabPrev":{context:"menu",name:"Previous tab",about:"The tab to the left.",keys:[],mouse:[],pad:["L1"]},"menu.tabNext":{context:"menu",name:"Next tab",about:"The tab to the right.",keys:[],mouse:[],pad:["R1"]},"menu.zoomIn":{context:"menu",name:"Menu zoom in",about:"Zoom the sea chart or the telescope in.",keys:[],mouse:[],pad:["R2"]},"menu.zoomOut":{context:"menu",name:"Menu zoom out",about:"Zoom the sea chart or the telescope out.",keys:[],mouse:[],pad:["L2"]}},zy={actions:By},qi={cross:0,circle:1,square:2,triangle:3,L1:4,R1:5,L2:6,R2:7,share:8,options:9,L3:10,R3:11,up:12,down:13,left:14,right:15,home:16},wl={lsUp:[1,-1],lsDown:[1,1],lsLeft:[0,-1],lsRight:[0,1],rsUp:[3,-1],rsDown:[3,1],rsLeft:[2,-1],rsRight:[2,1]},Wh=["left","right","middle","wheelUp","wheelDown"],Wa=.18,Xa=.5,Es=Object.entries(zy.actions).map(([i,e])=>({...e,id:i,context:e.context})),_u=new Map(Es.map(i=>[i.id,i])),qa="witch.bindings",yu=i=>{const e={};return Array.isArray(i.keys)&&(e.keys=i.keys.filter(t=>typeof t=="string"&&t.length>0)),Array.isArray(i.mouse)&&(e.mouse=i.mouse.filter(t=>Wh.includes(t))),Array.isArray(i.pad)&&(e.pad=i.pad.filter(t=>t in qi||t in wl)),e};class Hy{constructor(e=null){this.storage=e;try{const t=JSON.parse(e?.getItem(qa)??"{}");for(const[n,r]of Object.entries(t??{}))_u.has(n)&&r&&typeof r=="object"&&(this.own[n]=yu(r))}catch{}this.build()}storage;own={};live=new Map;listeners=new Set;version=0;list(){return Es.map(e=>({...e,...this.get(e.id),isDefault:!this.own[e.id]}))}get(e){const t=this.live.get(e);if(!t)throw new Error(`no action ${e}`);return t}set(e,t){const n=_u.get(e);if(!n)throw new Error(`no action ${e}`);const r=[...(t.mouse??[]).filter(l=>!Wh.includes(l)),...(t.pad??[]).filter(l=>!(l in qi)&&!(l in wl))];if(r.length)throw new Error(`not a mouse or pad input: ${r.join(", ")}`);const s={...this.get(e),...yu(t)},a=l=>JSON.stringify(s[l])===JSON.stringify(n[l]),o={};for(const l of["keys","mouse","pad"])a(l)||(o[l]=s[l]);return Object.keys(o).length?this.own[e]=o:delete this.own[e],this.changed(),this.conflicts()}reset(e){delete this.own[e],this.changed()}resetAll(){this.own={},this.changed()}conflicts(){const e=new Map;for(const n of Es){const r=this.get(n.id),s=[...r.keys.map(a=>`key:${a}`),...r.mouse.map(a=>`mouse:${a}`),...r.pad.map(a=>`pad:${a}`)];for(const a of n.context==="global"?["game","menu"]:[n.context])for(const o of new Set(s)){const l=`${a}|${o}`;e.set(l,[...e.get(l)??[],n.id])}}const t=[];for(const[n,r]of e)if(r.length>1){const[s,a]=[n.slice(0,n.indexOf("|")),n.slice(n.indexOf("|")+1)];t.push({context:s,input:a,actions:r})}return t}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}keys(e){return this.get(e).keys}mouse(e){return this.get(e).mouse}pad(e){return this.get(e).pad}padValue(e,t,n){let r=0;for(const s of this.get(e).pad)r=Math.max(r,Ya(s,t,n));return r}padPressed(e,t,n,r,s=[]){return this.get(e).pad.some(a=>Ya(a,t,n)>=Xa&&Ya(a,r,s)<Xa)}padHeld(e,t,n){return this.padValue(e,t,n)>=Xa}padButtons(e){return this.get(e).pad.filter(t=>t in qi).map(t=>qi[t])}build(){this.live.clear();for(const e of Es){const t=this.own[e.id]??{};this.live.set(e.id,{keys:[...t.keys??e.keys],mouse:[...t.mouse??e.mouse],pad:[...t.pad??e.pad]})}}changed(){this.build(),this.version++;try{Object.keys(this.own).length?this.storage?.setItem(qa,JSON.stringify(this.own)):this.storage?.removeItem(qa)}catch{}for(const e of this.listeners)e()}}function Ya(i,e,t){if(i in qi)return e[qi[i]]?1:0;const n=wl[i];if(!n)return 0;const[r,s]=n,a=r<2?0:2,o=t[a]??0,l=t[a+1]??0,c=Math.hypot(o,l);if(c<Wa)return 0;const u=(Math.min(1,c)-Wa)/(1-Wa)/c;return Math.max(0,s*(t[r]??0)*u)}const Xh={cross:"✕",circle:"○",square:"□",triangle:"△",up:"d-pad up",down:"d-pad down",left:"d-pad left",right:"d-pad right",lsUp:"left stick",lsDown:"left stick",lsLeft:"left stick",lsRight:"left stick",rsUp:"right stick",rsDown:"right stick",rsLeft:"right stick",rsRight:"right stick",options:"Options",share:"Share",home:"PS"};function $n(i,e=ji){const t=[...new Set(e.pad(i).map(n=>Xh[n]??n))];return t.length?t.join(" or "):"none"}function qh(i){const e=/^(?:Key([A-Z])|Digit(\d))$/.exec(i);return e?e[1]??e[2]:{Space:"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Escape:"Esc",Backquote:"~",Equal:"+",Minus:"−",NumpadAdd:"+",NumpadSubtract:"−",Enter:"Enter",NumpadEnter:"Enter"}[i]??i}function Ts(i,e=ji){const t={left:"left click",right:"right click",middle:"middle click",wheelUp:"wheel up",wheelDown:"wheel down"},n=[...new Set([...e.mouse(i).map(r=>t[r]??r),...e.keys(i).map(qh)])];return n.length?n.join(" or "):"none"}const Gy=Ws,ji=new Hy(Gy);function Gs(i){const e=i==="menu"?["menu.up","menu.down","menu.left","menu.right"]:["Up","Down","Left","Right"].map(n=>`${i}${n}`),t=[...new Set(e.flatMap(n=>ji.pad(n).map(r=>(Xh[r]??r).replace(/^d-pad .*/,"d-pad"))))];return t.length?t.join(" or "):"none"}function RM(i){for(const e of i.querySelectorAll("[data-key]")){const t=ji.keys(e.dataset.key)[0];e.textContent=t?qh(t):"(none)"}for(const e of i.querySelectorAll("[data-pad]"))e.textContent=$n(e.dataset.pad);for(const e of i.querySelectorAll("[data-pad-move]"))e.textContent=Gs(e.dataset.padMove)}function CM(i){return i==="pad"?`${Gs("menu")} or ${Gs("game.aim")} look round   ${$n("menu.zoomIn")} / ${$n("menu.zoomOut")} zoom   ${$n("menu.back")} ⏏`:i==="touch"?"movement control looks round   + / − zoom   sigil to leave":`mouse or arrow keys look round   wheel / ${Ts("menu.zoomIn")} / ${Ts("menu.zoomOut")} zoom   ${Ts("menu.back")} ⏏`}function Vy(i,e,t){const n="sigils: islands you can sail to · gold rings: won";return i==="pad"?`${Gs("menu")} to choose${t?` · ${e?"hold ":""}${$n("menu.choose")} to sail`:""} · ${$n("menu.zoomIn")} / ${$n("menu.zoomOut")} zoom${e?` · ${$n("menu.back")} to put it down`:""} · ${n}`:i==="touch"?`Tap an island to look at it${t?e?" · hold it to sail":", again to sail":""} · pinch to zoom · ${n}`:`point or arrows to choose${t?` · ${e?"hold the mouse or ":""}Space / Enter to sail`:""} · wheel to zoom${e?` · ${Ts("menu.back")} to put it down`:""} · ${n}`}const Wy={near:{sea:-40,dist:600,pitchDeg:50},far:{sea:420,dist:520,pitchDeg:38},skim:{sea:520,dist:360,pitchDeg:24}},Xy=()=>{const i=typeof location>"u"?null:new URLSearchParams(location.search).get("dive");return i&&Wy[i]||Wn.arrive?.handoff||{}},Su="witch.chart.sailAnywhere",qy=8e3,Yy=`
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
`,$y=`
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="corner"></div>
<div class="hold-ring" hidden></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;function Ky(i,e){const t=i.find(n=>n.id===e)??{x:0,y:0};return i.filter(n=>n.fresh).sort((n,r)=>Math.hypot(n.x-t.x,n.y-t.y)-Math.hypot(r.x-t.x,r.y-t.y)).map(n=>n.id)}function PM(i,e){const t=e.mode,n=t==="miniature",r=t==="sail";if(!document.getElementById("chart-view-style")){const T=document.createElement("style");T.id="chart-view-style",T.textContent=Yy,document.head.append(T)}const s=document.createElement("div");s.className="chart-view",s.innerHTML=$y,i.append(s);const a=T=>s.querySelector(`.${T}`),o=n?new Vo(s.querySelector("canvas"),Wn):Eh(Wn),l=o.canvas;n||(l.setAttribute("aria-label","The sea chart"),s.querySelector("canvas").replaceWith(l));const c=new AbortController,u={signal:c.signal};n&&(a("top").hidden=!0,a("bottom").hidden=!0);for(const T of e.corner??[]){const G=document.createElement("button");G.textContent=T.label,T.title&&(G.title=T.title),G.addEventListener("click",()=>T.onClick(),u),a("corner").append(G)}a("sail").hidden=!0;const d=r?e.table:void 0;let h=!1;const p=()=>{h||(h=!0,S(),d.onLeave())},g=Wn.chart?.sailHold??1.2;let y=null;const m=T=>!!T&&!I(T)&&!!w.find(G=>G.id===T)?.sail,f=(T,G,J=null)=>{!d||h||y||!m(T)||o.flying||(y={id:T,from:performance.now(),at:J,by:G})};function S(T){y&&(!T||y.by===T)&&(y=null,a("hold-ring").hidden=!0)}function R(){if(!y)return;if(y.id!==o.selected){S();return}const T=Math.min(1,(performance.now()-y.from)/1e3/Math.max(.05,g)),G=a("hold-ring"),J=s.getBoundingClientRect(),te=y.at??o.screenOf(y.id)??{x:J.left+J.width/2,y:J.top+J.height/2};if(G.hidden=!1,G.style.left=`${te.x-J.left}px`,G.style.top=`${te.y-J.top}px`,G.style.background=`conic-gradient(rgba(255,214,140,.95) ${T*360}deg, rgba(20,14,32,.6) 0deg)`,T>=1){const ie=y.id;S(),Ge(ie)}}a("home").hidden=!r||!!d,a("sail-any").hidden=!r,a("close").hidden=!e.onClose||!!d,d&&(s.classList.add("table"),a("top").hidden=!0,a("world").hidden=!0,a("zoom-in").hidden=!0,a("zoom-out").hidden=!0,a("corner").append(a("sail-any")));let v="keys";const M=a("hint"),E=()=>{const T=Vy(v,!!d,r);M.textContent!==T&&(M.textContent=T)},A=T=>{v=T,E()};E(),s.addEventListener("pointerdown",T=>A(T.pointerType==="touch"?"touch":"keys"),u),s.addEventListener("pointermove",T=>{T.pointerType==="mouse"&&A("keys")},u),n&&(o.orbit=.12);let x=e.save??Ru(),w=[];const L=new Map;let U=(()=>{try{return Ol()?.getItem(Su)==="1"}catch{return!1}})();const C=()=>e.world??x.world,I=T=>!!T&&ky(e.here,T,C())==="stay",D=T=>Md(`./?island=${T}${e.world!=null?`&world=${C()}`:""}`);let N=null;const $=new Map,Y=Xy(),se=T=>{let G=$.get(T);return G===void 0&&(G=Math.floor(Math.random()*1e6),$.set(T,G)),G},Z=T=>{if(!r||n||N?.island===T)return;if(N?.job.then(ae=>ae?.stop()),N?.map.then(ae=>ae?.stop()),!T||!w.find(ae=>ae.id===T)?.sail||e.noBake?.(T)||I(T)){N=null;return}const G=se(T),J={island:T},te=zl(()=>import("./mapPrep-a2PZH5fK.js").then(ae=>ae.aS),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url).then(ae=>ae.startMapPrep(T,e.world,G)).catch(()=>null),ie=te.then(ae=>ae?Promise.race([ae.done,new Promise(pe=>setTimeout(pe,qy))]):null).then(()=>N===J?zl(()=>import("./landingBake-CQLJwy21.js"),__vite__mapDeps([8,2,1,3,4,5,6,9,10]),import.meta.url).then(ae=>ae.bakeLanding(T,e.world,G)):null).catch(()=>null);N=Object.assign(J,{job:ie,map:te})},ne=()=>{const T=x.voyages.at(-1)?.to;if((ie=>!!ie&&!!w.find(ae=>ae.id===ie)?.sail)(T))return T;const J=w.find(ie=>ie.id==="home"),te=w.filter(ie=>ie.id!=="home"&&x.found.includes(ie.id)&&ie.sail);return te.sort((ie,ae)=>Math.hypot(ie.x-(J?.x??0),ie.y-(J?.y??0))-Math.hypot(ae.x-(J?.x??0),ae.y-(J?.y??0))),te[0]?.id??"home"};let re=null;const Pe=async T=>{const G=se(T),J=N?.island===T?await N.map:null;J&&await Promise.race([J.done,new Promise(ie=>setTimeout(ie,8e3))]);const te=re={island:T,seed:G,ready:!1};performance.mark("chart:depart");try{await e.onDepart(T,G,o.flightEnd(T,Y))}finally{te.ready=!0,performance.mark("chart:ready")}},Re=async(T,G)=>{if(performance.mark("chart:flown"),re?.island===T){performance.mark("chart:go"),e.onSail?.(T,re.seed,G);return}const J=N?.island===T?await N.job:null,te=J?.seed??se(T);await J?.settle();const ie=N?.island===T?await N.map:null;ie&&await Promise.race([ie.done,new Promise(ae=>setTimeout(ae,8e3))]),performance.mark("chart:go"),e.onSail?e.onSail(T,te,G):location.href=`${D(T)}&seed=${te}&arrive=1`};let qe=null;const Xe=()=>{qe?.frame(o.flightFramed)&&Pe(qe.island)},Ge=T=>{const G=w.find(ae=>ae.id===T);if(!r||o.flying)return;if(I(T)){d||(e.onStay??e.onClose)?.();return}if(!G?.sail)return;const J=C();performance.mark("chart:sail"),Z(T);const te=!!e.onDepart&&!!e.onSail&&o.flightEnd(T,Y)!==null,ie=te?{hold:()=>re?.island!==T||!re.ready,slow:Wn.arrive?.hold,landingDue:e.onLandingDue}:{};if(!o.fly(T,ae=>{qe?.handOver(),Iy(T,J,ae),Re(T,ae)},{...Y,...ie})){Re(T);return}qe=new Ry(T,te),s.classList.add("flying"),e.onFly?.(),requestAnimationFrame(()=>fe())};let H=null,X=null;const le=new Map;let ve=new Map;const he=()=>{const T=w.find(G=>G.id===(o.selected??"home"))??w[0];ve=new Map(vu(w,T??{x:0,y:0}).map((G,J)=>[G,J]))},ye=T=>{const G=w.find(J=>J.id===T.id);!G||T.world!==C()||(le.get(T.id)??G.outline)?.detail&&!T.detail||le.set(T.id,T)};function it(){if(!le.size)return;let T=null,G=1/0;for(const te of le.values()){const ie=te.id===o.selected&&te.detail?-1:ve.get(te.id)??1e9;ie<G&&(G=ie,T=te)}le.delete(T.id);const J=w.find(te=>te.id===T.id);if(!(!J||T.world!==C())){J.outline=T,o.reshape(T.id,T);{const te=w.filter(ie=>ie.outline).length;te===1&&performance.mark("chart:island1"),te===w.length&&performance.mark("chart:islands")}}}const Ne=()=>{if(!H){try{H=new Worker(new URL(""+new URL("chartOutlines.worker-DHr_avRh.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}H.onmessage=T=>ye(T.data)}return H};function ke(T){const G=!H,J=Ne();G&&J&&xr(J,{world:C(),found:[...x.found],ids:[],step:Jo},"chart:request","initialize"),J&&xr(J,{detail:T},"chart:request",T)}function Fe(){const T=C(),G=[...x.found],J=w.find(ae=>ae.id===(o.selected??x.voyages.at(-1)?.to??"home"))??w[0],te=vu(w.filter(ae=>!ae.outline&&!le.has(ae.id)),J);if(!te.length){X&&(clearInterval(X),X=null);return}const ie=Ne();ie&&xr(ie,{world:T,found:G,ids:te,step:Jo,cacheOnly:n,cold:Eu()},"chart:request","outlines",te.length),n&&!X&&(X=setInterval(Fe,4e3))}function Se(){const T=new Set(U||yl()?["home",...gs]:Pu(x)),G=new Set(x.won),J=C(),te=new Set(Ed(x,e.here?.island)),ie=(pe,Ue,k)=>{const ce=Hh(pe,J),ee=Yi(pe);return{id:pe,x:ce.x,y:ce.y,phase:Gh(pe,J),radii:Ue,sail:T.has(pe)&&!ee,unknown:ee,won:G.has(pe),fresh:T.has(pe)&&!ee&&te.has(pe),sigil:k}};w=[ie("home",Fl(kl(_d(J,x.found,Wn.home.start)),Wn.map?.coast).radii,bu("home"))];for(const pe of Za)w.push(ie(pe,Fl(kl(As(pe,J)),Wn.islands?.coast).radii,pe));o.set(w,x.voyages);for(const pe of L.values())pe.dispose();if(L.clear(),!n)for(const pe of Ky(w,e.here?.island??x.voyages.at(-1)?.to??"home"))L.set(pe,new Ty(s));le.clear(),he(),Fe();const ae=x.found.filter(pe=>!Yi(pe)).length;a("status").textContent=`${ae?`${ae} of ${gs.length} islands found${e.countUncharted?` (and ${Za.length-gs.length} not yet charted)`:""}`:"do a legend's quest and win the night to find its island"}${x.won.length?` · ${x.won.length} won`:""}${e.note?` · ${e.note}`:""}`,a("world").textContent=`World seed: ${J}${e.world!=null&&e.world!==x.world?" (from the link)":""}`,a("home").href=D("home"),a("home").textContent=I("home")?e.here.label:"Sail home"}function Ie(T,G=!1,J=!0){o.select(T,G),he(),J&&Z(T),T&&H&&!w.find(Ue=>Ue.id===T)?.outline&&!le.has(T)&&xr(H,{first:T},"chart:request",T),T&&!n&&!(le.get(T)??w.find(Ue=>Ue.id===T)?.outline)?.detail&&ke(T);const te=w.find(Ue=>Ue.id===T),ie=a("card"),ae=a("sail");if(!te||n){ie.hidden=!0;return}ie.hidden=!1;const pe=T==="home"?0:As(T,C())?.phase??0;a("name").textContent=T==="home"?"Home":te.unknown?"Uncharted waters":te.sail?`The ${T}'s island`:"An island not yet found",a("phase").textContent=T==="home"?"the Ent's island, the middle of the world":`phase ${pe}`,a("state").textContent=(I(T)?"you're here · ":"")+(te.unknown?"not yet charted":te.won?"won":te.sail?T!=="home"&&!x.found.includes(T)?"not found yet: 🧪 testing, you can sail there":x.played.includes(T)?"played, not yet won":"found: you can sail there":"do its legend's quest in a night you win to find it"),ae.hidden=!r||!(te.sail||I(T))||!!d&&I(T),ae.href=D(T),ae.textContent=I(T)?e.here.label:d?"Hold to sail":"Sail there"}if(a("sail").addEventListener("click",T=>{T.preventDefault(),d||Ge(o.selected)}),d){const T=a("sail");T.addEventListener("pointerdown",G=>{G.preventDefault();const J=T.getBoundingClientRect();f(o.selected,"pointer",{x:J.left+J.width/2,y:J.top+J.height/2})},u);for(const G of["pointerup","pointerleave","pointercancel"])T.addEventListener(G,()=>S("pointer"),u)}a("home").addEventListener("click",T=>{T.preventDefault(),Ie("home",!0),Ge("home")}),a("close").addEventListener("click",()=>e.onClose?.());const et=new Map;let Qe=0,He=null;n||(l.addEventListener("pointerdown",T=>{if(!o.flying){if(d&&!h&&!o.flying&&T.isPrimary){const G=o.pick(T.clientX,T.clientY);G&&(G!==o.selected&&Ie(G),f(G,"pointer",{x:T.clientX,y:T.clientY}))}if(et.set(T.pointerId,{x:T.clientX,y:T.clientY}),He={x:T.clientX,y:T.clientY},et.size===2){const[G,J]=[...et.values()];Qe=Math.hypot(G.x-J.x,G.y-J.y)}}},u),l.addEventListener("pointermove",T=>{if(y?.by==="pointer"&&y.at&&Math.hypot(T.clientX-y.at.x,T.clientY-y.at.y)>12&&S("pointer"),!!et.has(T.pointerId)&&(et.set(T.pointerId,{x:T.clientX,y:T.clientY}),et.size===2)){const[G,J]=[...et.values()],te=Math.hypot(G.x-J.x,G.y-J.y);Qe>0&&te>0&&o.zoom(Qe/te),Qe=te,He=null}},u),l.addEventListener("pointerup",T=>{if(S("pointer"),h)return;if(o.flying){et.delete(T.pointerId);return}const G=et.size===1&&He&&Math.hypot(T.clientX-He.x,T.clientY-He.y)<8;if(et.delete(T.pointerId),et.size<2&&(Qe=0),!G)return;const J=o.pick(T.clientX,T.clientY);d||(J&&J===o.selected?Ge(J):J&&Ie(J))},u),l.addEventListener("pointercancel",T=>{et.delete(T.pointerId),Qe=0,S("pointer")},u),l.addEventListener("wheel",T=>{T.preventDefault(),o.zoom(Math.exp(T.deltaY*.0015))},{passive:!1,...u}),a("zoom-in").addEventListener("click",()=>o.zoom(.75)),a("zoom-out").addEventListener("click",()=>o.zoom(1.33)));const mt=(T,G)=>{const J=Ay(w,o.selected??"home",T,G);J&&Ie(J)},O=T=>d?T.code==="KeyE":T.key==="Escape",Tt=()=>qe?.committed?!1:d?(p(),!0):e.onClose?(e.onClose(),!0):!1,nt=T=>{if(A("keys"),o.flying){T.preventDefault(),qe?.press(O(T),T.repeat)==="cancel"&&Tt();return}if(T.target?.closest?.("input")||T.target?.closest?.("button, a")&&(T.key==="Enter"||T.key===" "))return;const G={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};if(!h){if(d&&O(T)){T.preventDefault(),T.repeat||p();return}G[T.key]?(T.preventDefault(),mt(...G[T.key])):d&&(T.key==="Enter"||T.key===" ")?(T.preventDefault(),T.repeat||f(o.selected,"key")):T.key==="Enter"||T.key===" "?(T.preventDefault(),Ge(o.selected)):T.key==="+"||T.key==="="?o.zoom(.8):T.key==="-"||T.key==="_"?o.zoom(1.25):O(T)&&e.onClose&&(T.preventDefault(),e.onClose())}};n||addEventListener("keydown",nt);const P=T=>{d&&(T.key==="Enter"||T.key===" ")&&S("key")};d&&addEventListener("keyup",P);let _=0,z=!0,q=[];function Q(T){const G=[...navigator.getGamepads?.()??[]].find(ce=>ce?.connected);if(!G)return;const J=G.buttons.map(ce=>ce.pressed);(J.some((ce,ee)=>ce&&!q[ee])||G.axes.some(ce=>Math.abs(ce)>.5))&&A("pad");const te=ji.padPressed("menu.back",J,G.axes,q);if(q=J,_-=T,o.flying){qe?.press(te)==="cancel"&&Tt();return}if(h)return;const ie=G.buttons.map(ce=>ce.pressed),ae=ce=>ji.padHeld(ce,ie,G.axes),pe=ae("menu.right")?1:ae("menu.left")?-1:0,Ue=ae("menu.down")?1:ae("menu.up")?-1:0;(pe||Ue)&&_<=0?(mt(pe,Ue),_=.28):!pe&&!Ue&&(_=0);const k=ae("menu.choose")&&!z;ae("menu.choose")||(z=!1),d?ae("menu.choose")&&!z?f(o.selected,"pad"):S("pad"):k&&_<=0&&(Ge(o.selected),_=.5),ae("menu.back")&&_<=0&&(d?p():e.onClose&&e.onClose(),_=.5),ae("menu.zoomOut")&&o.zoom(1+T),ae("menu.zoomIn")&&o.zoom(1-T*.8)}const ue=()=>{const T=a("sail-any");T.setAttribute("aria-pressed",String(U)),T.textContent=U?"🧪 Test: sailing anywhere (on)":"🧪 Test: sail anywhere"};ue(),a("sail-any").addEventListener("click",()=>{U=!U;try{Ol()?.setItem(Su,U?"1":"0")}catch{}ue();const T=o.selected;Se(),Ie(T)});const fe=(T,G)=>{if(n&&e.size){const J=bh;o.resize(e.size.w*J,e.size.h*J);return}o.resize(T??(s.clientWidth||i.clientWidth||innerWidth),G??(s.clientHeight||i.clientHeight||innerHeight))};fe(),a("status").textContent="charting the sea…";let j=!1;return setTimeout(()=>{j||(Se(),Ie(Oy(e.start,e.here,C(),x.voyages.at(-1)?.to),!0,!1),Z(ne()))},50),{canvas:l,chart:o,islands:()=>w,update(T,G){n||(Q(T),E()),R(),it(),o.frame(T,G),Xe();const J=l.getBoundingClientRect();for(const[te,ie]of L)ie.update(!o.flying&&!h?o.screenTopOf(te):null,J,G,te===o.selected?0:1,T)},resize:fe,choose:Ie,closable:()=>!qe?.committed,dispose(){j=!0,le.clear(),removeEventListener("keydown",nt),removeEventListener("keyup",P),X&&(clearInterval(X),X=null),H?.terminate(),H=null,c.abort();for(const T of L.values())T.dispose();n?o.dispose():Th(o),s.remove()}}}export{Ee as $,nn as A,St as B,fl as C,Kt as D,vM as E,vt as F,zi as G,xn as H,hc as I,yM as J,Fa as K,cS as L,ot as M,xy as N,fM as O,uS as P,Ly as Q,Jt as R,wt as S,xr as T,Rr as U,B as V,zt as W,Cn as X,ci as Y,Cs as Z,Ye as _,tS as a,PS as a$,gS as a0,ny as a1,at as a2,Nd as a3,Gi as a4,Lu as a5,Du as a6,$f as a7,on as a8,vS as a9,Uh as aA,eu as aB,uy as aC,tM as aD,kh as aE,rM as aF,jS as aG,cy as aH,sM as aI,eM as aJ,aM as aK,dy as aL,oM as aM,pu as aN,Pr as aO,hy as aP,pS as aQ,dl as aR,fi as aS,QS as aT,sS as aU,Fx as aV,bS as aW,qS as aX,Lh as aY,RS as aZ,CS as a_,$S as aa,aS as ab,fS as ac,Hd as ad,Gd as ae,zd as af,XS as ag,VS as ah,pi as ai,Be as aj,kd as ak,Bi as al,ko as am,sh as an,oS as ao,np as ap,hS as aq,sa as ar,rS as as,io as at,nM as au,iM as av,JS as aw,Fh as ax,TS as ay,At as az,ji as b,EM as b$,sy as b0,wS as b1,AS as b2,Pd as b3,Qc as b4,Ln as b5,Js as b6,YS as b7,MS as b8,_h as b9,Tn as bA,Sx as bB,WS as bC,br as bD,$t as bE,c_ as bF,Hx as bG,di as bH,bp as bI,zl as bJ,vl as bK,IS as bL,CM as bM,_y as bN,pn as bO,pl as bP,SM as bQ,pM as bR,yl as bS,NS as bT,DS as bU,OS as bV,BS as bW,GS as bX,HS as bY,Ru as bZ,xM as b_,Yx as ba,Ze as bb,zh as bc,fy as bd,py as be,lM as bf,dM as bg,cM as bh,uM as bi,hM as bj,ii as bk,Wt as bl,Ys as bm,Ih as bn,xS as bo,Os as bp,Yt as bq,ZS as br,KS as bs,$i as bt,iS as bu,sf as bv,ja as bw,iy as bx,mS as by,ES as bz,Bx as c,wd as c0,eS as c1,MM as c2,_M as c3,mM as c4,TM as c5,AM as c6,bM as c7,Ed as c8,xu as c9,RM as ca,gM as cb,zS as cc,wM as cd,q_ as ce,ty as cf,an as cg,Ji as ch,_n as ci,Bd as cj,Yd as ck,US as cl,kS as cm,FS as cn,Y_ as co,qi as cp,wl as cq,Es as cr,qh as cs,Xh as ct,Ts as cu,Xx as cv,ml as cw,yS as cx,_S as cy,SS as cz,lS as d,ry as e,_t as f,Tr as g,ap as h,qo as i,vy as j,Q_ as k,mi as l,PM as m,nS as n,xt as o,oy as p,fn as q,zx as r,ay as s,dS as t,ht as u,En as v,jy as w,Pn as x,e_ as y,LS as z};
