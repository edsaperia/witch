const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./landingBake-DiwcojU0.js","./linkParams-BL7RsUzp.js","./forest-CQJcoyjh.js","./witch-Cz5T9dyy.js","./party-Dw8E8rRw.js","./saveSlots-Z9oplkuS.js","./opening-BraME8n6.js","./mushrooms-DqBBWQz2.js","./finds-DHD-CX4v.js","./beat-CkslUQXH.js","./stoneStacks-CMrgqGJu.js","./decisions-C_aHMX4K.js","./storageFallback-KKnOllmF.js","./viewParams-k6c3gfOE.js","./style-Bn2S48P4.js","./generator-DvIYU5z4.js","./potionSettings-BJW2Ha-p.js","./mapPrep-B40ZO8sC.js","./settings-Ck492Ved.js","./housePieces-BDJXp2lB.js"])))=>i.map(i=>d[i]);
import{bv as pn,bw as mr,bx as qo,by as xs,bz as pu,bA as mu,aa as gu,bB as Va,bC as Yo,bD as Gr,bE as Gh,ai as Wa,ba as Vh,bF as Wh,bG as Xh,b9 as Ds,ac as qh,bH as Rl,bs as Yh,bI as gr,bJ as $h,bK as Kh,bL as Zr,aU as Zh,aZ as Jh,aW as Qh,aO as Tr,bM as jh,bN as Xa,br as ef,aP as Cl,aQ as Pl,bO as tf,bP as nf}from"./forest-CQJcoyjh.js";import{t as sf,ah as Ar,ai as rf}from"./finds-DHD-CX4v.js";import{s as $o,l as af}from"./saveSlots-Z9oplkuS.js";import"./generator-DvIYU5z4.js";import{p as Ft,a as of,e as _u}from"./potionSettings-BJW2Ha-p.js";import{h as lf,A as cf,C as uf}from"./witch-Cz5T9dyy.js";import{M as hf}from"./mushrooms-DqBBWQz2.js";import{f as ff}from"./storageFallback-KKnOllmF.js";import{h as df}from"./party-Dw8E8rRw.js";const vu="witch.chart",Ll=(i=0)=>({world:i,found:[],won:[],played:[],voyages:[]});function UM(i){const e=(i??"").trim();if(!e)return 1+Math.floor(Math.random()*2147483646);if(/^\d+$/.test(e))return Number(e)%2147483647;let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%2147483647||1}const xu=i=>{try{return i??$o??null}catch{return null}},Jr=i=>Array.isArray(i)?i.filter(e=>typeof e=="string"):[];function Mu(i){try{const e=xu(i)?.getItem(vu);if(!e)return Ll();const t=JSON.parse(e),n=qo,s=a=>!!pn[a]&&!xs(a),r=Number(t.world);return{world:Number.isInteger(r)&&r>=0&&r<2147483647?r:0,found:Jr(t.found).filter(s),won:Jr(t.won).filter(n),played:Jr(t.played).filter(n),voyages:(Array.isArray(t.voyages)?t.voyages:[]).filter(a=>a&&typeof a.from=="string"&&typeof a.to=="string"&&n(a.from)&&s(a.to)).map(a=>({from:a.from,to:a.to}))}}catch{return Ll()}}function pf(i,e){try{xu(e)?.setItem(vu,JSON.stringify(i))}catch{}}function NM(i,e,t){return t?Su(i,e,{won:!1}):i}function Su(i,e,t){if(!qo(e))return i;const n={world:i.world,found:[...i.found],won:[...i.won],played:[...i.played],voyages:[...i.voyages]};if(n.played.includes(e)||n.played.push(e),!t.won)return n;n.won.includes(e)||n.won.push(e);for(const s of t.found??[])!pn[s]||xs(s)||s===e||n.found.includes(s)||(n.found.push(s),n.voyages.push({from:e,to:s}));return n}const mf=(i,e)=>i.found.filter(t=>!xs(t)&&!i.played.includes(t)&&t!==e),gf=i=>["home",...i.found];function FM(){const i=Object.keys(pn),e=[...i],t=e.map(n=>({from:pn[n].phase===0?"home":_f(n,i.filter(s=>pn[s].phase===pn[n].phase-1)),to:n}));return{world:0,found:e,won:["home"],played:["home",...mr],voyages:t}}function _f(i,e){const t=(n,s)=>{const r=Math.abs(((n-s)%360+360)%360);return r>180?360-r:r};return e.reduce((n,s)=>t(pn[s].bearing,pn[i].bearing)<t(pn[n].bearing,pn[i].bearing)?s:n,e[0]??"home")}function OM(i,e,t,n){const s=Mu(t);if(n!==void 0&&n!==s.world)return s;const r=Su(s,i,e);return pf(r,t),r}const vf="modulepreload",xf=function(i,e){return new URL(i,e).href},Dl={},Il=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(t.map(u=>{if(u=xf(u,n),u in Dl)return;Dl[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const M=a[g];if(M.href===u&&(!f||M.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":vf,f||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),f)return new Promise((g,M)=>{p.addEventListener("load",g),p.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},ti=sf,Mf={rise:6,turn:240,height:22,from:-45,shadow:.6,disc:!0},Sf=i=>({...Mf,...i.chart?.moon??{}}),Ul=i=>Math.max(0,Math.min(.6,i.chart?.edgeBand??.18));function yf(i,e){const t=Math.min(1,Math.max(0,i/Math.max(.01,e.rise))),n=t*t*(3-2*t);return{bearing:e.from+Math.max(0,i-e.rise)*360/Math.max(1,e.turn),height:-4+(e.height+4)*n,risen:n}}const Ko="186",bf=0,Nl=1,Ef=2,_r=1,wf=2,ds=3,ri=0,zt=1,Kt=2,Cn=0,zi=1,nn=2,Fl=3,Ol=4,Tf=5,Fi=100,Af=101,Rf=102,Cf=103,Pf=104,Lf=200,Df=201,If=202,Uf=203,yu=204,bu=205,Nf=206,Ff=207,Of=208,Bf=209,kf=210,zf=211,Hf=212,Gf=213,Vf=214,qa=0,Ya=1,$a=2,Xi=3,Ka=4,Za=5,Ja=6,Qa=7,Eu=0,Wf=1,Xf=2,gn=0,wu=1,Tu=2,Au=3,Ru=4,Cu=5,Pu=6,Lu=7,Du=300,ai=301,qi=302,Qr=303,jr=304,Vr=306,Rr=1e3,An=1001,ja=1002,_t=1003,qf=1004,Is=1005,st=1006,ea=1007,ii=1008,kt=1009,Iu=1010,Uu=1011,Ms=1012,Zo=1013,_n=1014,rn=1015,an=1016,Jo=1017,Qo=1018,Yi=1020,Nu=35902,Fu=35899,Ou=1021,Bu=1022,Jt=1023,Dn=1026,Vn=1027,Ts=1028,jo=1029,oi=1030,el=1031,tl=1033,vr=33776,xr=33777,Mr=33778,Sr=33779,eo=35840,to=35841,no=35842,io=35843,so=36196,ro=37492,ao=37496,oo=37488,lo=37489,Cr=37490,co=37491,uo=37808,ho=37809,fo=37810,po=37811,mo=37812,go=37813,_o=37814,vo=37815,xo=37816,Mo=37817,So=37818,yo=37819,bo=37820,Eo=37821,wo=36492,To=36494,Ao=36495,Ro=36283,Co=36284,Pr=36285,Po=36286,Yf=3200,Bl=0,$f=1,fn="",Yt="srgb",Ss="srgb-linear",Lr="linear",at="srgb",ta=7680,BM=7681,kM=514,zM=517,Kf=519,Zf=512,Jf=513,Qf=514,nl=515,jf=516,ed=517,il=518,td=519,ku=35044,HM=35048,kl="300 es",mn=2e3,ys=2001;function nd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function id(){const i=Dr("canvas");return i.style.display="block",i}const zl={};function Ir(...i){const e="THREE."+i.shift();console.log(e,...i)}function zu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Fe(...i){i=zu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=zu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Hi(...i){const e=i.join(" ");e in zl||(zl[e]=!0,Fe(...i))}function sd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const rd={[qa]:Ya,[$a]:Ja,[Ka]:Qa,[Xi]:Za,[Ya]:qa,[Ja]:$a,[Qa]:Ka,[Za]:Xi};class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hl=1234567;const gs=Math.PI/180,bs=180/Math.PI;function Pn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function sl(i,e){return(i%e+e)%e}function ad(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function od(i,e,t){return i!==e?(t-i)/(e-i):0}function _s(i,e,t){return(1-t)*i+t*e}function ld(i,e,t,n){return _s(i,e,1-Math.exp(-t*n))}function cd(i,e=1){return e-Math.abs(sl(i,e*2)-e)}function ud(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function hd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function fd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function dd(i,e){return i+Math.random()*(e-i)}function pd(i){return i*(.5-Math.random())}function md(i){i!==void 0&&(Hl=i);let e=Hl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gd(i){return i*gs}function _d(i){return i*bs}function vd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function xd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Md(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Sd(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),h=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const gi={DEG2RAD:gs,RAD2DEG:bs,generateUUID:Pn,clamp:qe,euclideanModulo:sl,mapLinear:ad,inverseLerp:od,lerp:_s,damp:ld,pingpong:cd,smoothstep:ud,smootherstep:hd,randInt:fd,randFloat:dd,randFloatSpread:pd,seededRandom:md,degToRad:gd,radToDeg:_d,isPowerOfTwo:vd,ceilPowerOfTwo:xd,floorPowerOfTwo:Md,setQuaternionFromProperEuler:Sd,normalize:ot,denormalize:sn};class ye{static{ye.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],p=r[a+1],g=r[a+2],M=r[a+3];if(f!==M||l!==h||c!==p||u!==g){let m=l*h+c*p+u*g+f*M;m<0&&(h=-h,p=-p,g=-g,M=-M,m=-m);let d=1-o;if(m<.9995){const S=Math.acos(m),R=Math.sin(S);d=Math.sin(d*S)/R,o=Math.sin(o*S)/R,l=l*d+h*o,c=c*d+p*o,u=u*d+g*o,f=f*d+M*o}else{l=l*d+h*o,c=c*d+p*o,u=u*d+g*o,f=f*d+M*o;const S=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=S,c*=S,u*=S,f*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],f=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+l*p-c*h,e[t+1]=l*g+u*h+c*f-o*p,e[t+2]=c*g+u*p+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),f=o(r/2),h=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{static{k.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return na.copy(this).projectOnVector(e),this.sub(na)}reflect(e){return this.sub(na.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new k,Gl=new Zi;class ke{static{ke.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],p=n[5],g=n[8],M=s[0],m=s[3],d=s[6],S=s[1],R=s[4],_=s[7],y=s[2],E=s[5],A=s[8];return r[0]=a*M+o*S+l*y,r[3]=a*m+o*R+l*E,r[6]=a*d+o*_+l*A,r[1]=c*M+u*S+f*y,r[4]=c*m+u*R+f*E,r[7]=c*d+u*_+f*A,r[2]=h*M+p*S+g*y,r[5]=h*m+p*R+g*E,r[8]=h*d+p*_+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,g=t*f+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=f*M,e[1]=(s*c-u*n)*M,e[2]=(o*n-s*a)*M,e[3]=h*M,e[4]=(u*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ia.makeScale(e,t)),this}rotate(e){return Hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ia.makeRotation(-e)),this}translate(e,t){return Hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ia.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ia=new ke,Vl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yd(){const i={enabled:!0,workingColorSpace:Ss,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Ln(s.r),s.g=Ln(s.g),s.b=Ln(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Gi(s.r),s.g=Gi(s.g),s.b=Gi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fn?Lr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ss]:{primaries:e,whitePoint:n,transfer:Lr,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}const Ke=yd();function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class bd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_i===void 0&&(_i=Dr("canvas")),_i.width=e.width,_i.height=e.height;const s=_i.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=_i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ln(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ln(t[n]/255)*255):t[n]=Ln(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ed=0;class rl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Pn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sa(s[a].image)):r.push(sa(s[a]))}else r=sa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let wd=0;const ra=new k;class Ct extends ci{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=An,s=An,r=st,a=ii,o=Jt,l=kt,c=Ct.DEFAULT_ANISOTROPY,u=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Pn(),this.name="",this.source=new rl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rr:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rr:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Du;Ct.DEFAULT_ANISOTROPY=1;class Ze{static{Ze.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],M=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,_=(p+1)/2,y=(d+1)/2,E=(u+h)/4,A=(f+M)/4,v=(g+m)/4;return R>_&&R>y?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=E/n,r=A/n):_>y?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=v/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=A/r,s=v/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(f-M)*(f-M)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-M)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Td extends ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:st,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ct(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:st,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new rl(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wt extends Td{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hu extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=_t,this.minFilter=_t,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ad extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=_t,this.minFilter=_t,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class rt{static{rt.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,f,h,p,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,f,h,p,g,M,m)}set(e,t,n,s,r,a,o,l,c,u,f,h,p,g,M,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=M,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),a=1/vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,p=a*f,g=o*u,M=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=h-M*c,t[9]=-o*l,t[2]=M-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,g=c*u,M=c*f;t[0]=h+M*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=M+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,g=c*u,M=c*f;t[0]=h-M*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=M-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,g=o*u,M=o*f;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+M,t[1]=l*f,t[5]=M*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,M=o*c;t[0]=l*u,t[4]=M-h*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+g,t[10]=h-M*f}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,M=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+M,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=M*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rd,e,Cd)}lookAt(e,t,n){const s=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),On.crossVectors(n,Ht),On.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),On.crossVectors(n,Ht)),On.normalize(),Us.crossVectors(Ht,On),s[0]=On.x,s[4]=Us.x,s[8]=Ht.x,s[1]=On.y,s[5]=Us.y,s[9]=Ht.y,s[2]=On.z,s[6]=Us.z,s[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],p=n[13],g=n[2],M=n[6],m=n[10],d=n[14],S=n[3],R=n[7],_=n[11],y=n[15],E=s[0],A=s[4],v=s[8],w=s[12],L=s[1],U=s[5],C=s[9],I=s[13],D=s[2],N=s[6],J=s[10],Z=s[14],ie=s[3],j=s[7],ee=s[11],ne=s[15];return r[0]=a*E+o*L+l*D+c*ie,r[4]=a*A+o*U+l*N+c*j,r[8]=a*v+o*C+l*J+c*ee,r[12]=a*w+o*I+l*Z+c*ne,r[1]=u*E+f*L+h*D+p*ie,r[5]=u*A+f*U+h*N+p*j,r[9]=u*v+f*C+h*J+p*ee,r[13]=u*w+f*I+h*Z+p*ne,r[2]=g*E+M*L+m*D+d*ie,r[6]=g*A+M*U+m*N+d*j,r[10]=g*v+M*C+m*J+d*ee,r[14]=g*w+M*I+m*Z+d*ne,r[3]=S*E+R*L+_*D+y*ie,r[7]=S*A+R*U+_*N+y*j,r[11]=S*v+R*C+_*J+y*ee,r[15]=S*w+R*I+_*Z+y*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],g=e[3],M=e[7],m=e[11],d=e[15],S=l*p-c*h,R=o*p-c*f,_=o*h-l*f,y=a*p-c*u,E=a*h-l*u,A=a*f-o*u;return t*(M*S-m*R+d*_)-n*(g*S-m*y+d*E)+s*(g*R-M*y+d*A)-r*(g*_-M*E+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],g=e[12],M=e[13],m=e[14],d=e[15],S=t*o-n*a,R=t*l-s*a,_=t*c-r*a,y=n*l-s*o,E=n*c-r*o,A=s*c-r*l,v=u*M-f*g,w=u*m-h*g,L=u*d-p*g,U=f*m-h*M,C=f*d-p*M,I=h*d-p*m,D=S*I-R*C+_*U+y*L-E*w+A*v;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/D;return e[0]=(o*I-l*C+c*U)*N,e[1]=(s*C-n*I-r*U)*N,e[2]=(M*A-m*E+d*y)*N,e[3]=(h*E-f*A-p*y)*N,e[4]=(l*L-a*I-c*w)*N,e[5]=(t*I-s*L+r*w)*N,e[6]=(m*_-g*A-d*R)*N,e[7]=(u*A-h*_+p*R)*N,e[8]=(a*C-o*L+c*v)*N,e[9]=(n*L-t*C-r*v)*N,e[10]=(g*E-M*_+d*S)*N,e[11]=(f*_-u*E-p*S)*N,e[12]=(o*w-a*U-l*v)*N,e[13]=(t*U-n*w+s*v)*N,e[14]=(M*R-g*y-m*S)*N,e[15]=(u*y-f*R+h*S)*N,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,g=r*f,M=a*u,m=a*f,d=o*f,S=l*c,R=l*u,_=l*f,y=n.x,E=n.y,A=n.z;return s[0]=(1-(M+d))*y,s[1]=(p+_)*y,s[2]=(g-R)*y,s[3]=0,s[4]=(p-_)*E,s[5]=(1-(h+d))*E,s[6]=(m+S)*E,s[7]=0,s[8]=(g+R)*A,s[9]=(m-S)*A,s[10]=(1-(h+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=vi.set(s[0],s[1],s[2]).length();const o=vi.set(s[4],s[5],s[6]).length(),l=vi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),jt.copy(this);const c=1/a,u=1/o,f=1/l;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=u,jt.elements[5]*=u,jt.elements[6]*=u,jt.elements[8]*=f,jt.elements[9]*=f,jt.elements[10]*=f,t.setFromRotationMatrix(jt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=mn,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s);let g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===mn)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===ys)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=mn,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===mn)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===ys)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vi=new k,jt=new rt,Rd=new k(0,0,0),Cd=new k(1,1,1),On=new k,Us=new k,Ht=new k,Xl=new rt,ql=new Zi;class li{constructor(e=0,t=0,n=0,s=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ql.setFromEuler(this),this.setFromQuaternion(ql,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class al{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pd=0;const Yl=new k,xi=new Zi,vn=new rt,Ns=new k,Qi=new k,Ld=new k,Dd=new Zi,$l=new k(1,0,0),Kl=new k(0,1,0),Zl=new k(0,0,1),Jl={type:"added"},Id={type:"removed"},Mi={type:"childadded",child:null},aa={type:"childremoved",child:null};class wt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new k,t=new li,n=new Zi,s=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new ke}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis($l,e)}rotateY(e){return this.rotateOnAxis(Kl,e)}rotateZ(e){return this.rotateOnAxis(Zl,e)}translateOnAxis(e,t){return Yl.copy(e).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($l,e)}translateY(e){return this.translateOnAxis(Kl,e)}translateZ(e){return this.translateOnAxis(Zl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ns.copy(e):Ns.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Qi,Ns,this.up):vn.lookAt(Ns,Qi,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(vn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jl),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Id),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jl),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,e,Ld),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Dd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}wt.DEFAULT_UP=new k(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oi extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ud={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),d=this._getHandJoint(c,M);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ud)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function la(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=sl(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=la(a,r,e+1/3),this.g=la(a,r,e),this.b=la(a,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function n(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const n=Gu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ke.workingToColorSpace(Dt.copy(this),e),Math.round(qe(Dt.r*255,0,255))*65536+Math.round(qe(Dt.g*255,0,255))*256+Math.round(qe(Dt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Dt.copy(this),t);const n=Dt.r,s=Dt.g,r=Dt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Yt){Ke.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,s=Dt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(Fs);const n=_s(Bn.h,Fs.h,t),s=_s(Bn.s,Fs.s,t),r=_s(Bn.l,Fs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Oe;Oe.NAMES=Gu;class Lo extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const en=new k,xn=new k,ca=new k,Mn=new k,Si=new k,yi=new k,Ql=new k,ua=new k,ha=new k,fa=new k,da=new Ze,pa=new Ze,ma=new Ze;class Zt{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),en.subVectors(e,t),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){en.subVectors(s,t),xn.subVectors(n,t),ca.subVectors(e,t);const a=en.dot(en),o=en.dot(xn),l=en.dot(ca),c=xn.dot(xn),u=xn.dot(ca),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return da.setScalar(0),pa.setScalar(0),ma.setScalar(0),da.fromBufferAttribute(e,t),pa.fromBufferAttribute(e,n),ma.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(da,r.x),a.addScaledVector(pa,r.y),a.addScaledVector(ma,r.z),a}static isFrontFacing(e,t,n,s){return en.subVectors(n,t),xn.subVectors(e,t),en.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),en.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Si.subVectors(s,n),yi.subVectors(r,n),ua.subVectors(e,n);const l=Si.dot(ua),c=yi.dot(ua);if(l<=0&&c<=0)return t.copy(n);ha.subVectors(e,s);const u=Si.dot(ha),f=yi.dot(ha);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Si,a);fa.subVectors(e,r);const p=Si.dot(fa),g=yi.dot(fa);if(g>=0&&p<=g)return t.copy(r);const M=p*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(yi,o);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return Ql.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(Ql,o);const d=1/(m+M+h);return a=M*d,o=h*d,t.copy(n).addScaledVector(Si,a).addScaledVector(yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ui{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,tn):tn.fromBufferAttribute(r,a),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Os.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Os.copy(n.boundingBox)),Os.applyMatrix4(e.matrixWorld),this.union(Os)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ji),Bs.subVectors(this.max,ji),bi.subVectors(e.a,ji),Ei.subVectors(e.b,ji),wi.subVectors(e.c,ji),kn.subVectors(Ei,bi),zn.subVectors(wi,Ei),Yn.subVectors(bi,wi);let t=[0,-kn.z,kn.y,0,-zn.z,zn.y,0,-Yn.z,Yn.y,kn.z,0,-kn.x,zn.z,0,-zn.x,Yn.z,0,-Yn.x,-kn.y,kn.x,0,-zn.y,zn.x,0,-Yn.y,Yn.x,0];return!ga(t,bi,Ei,wi,Bs)||(t=[1,0,0,0,1,0,0,0,1],!ga(t,bi,Ei,wi,Bs))?!1:(ks.crossVectors(kn,zn),t=[ks.x,ks.y,ks.z],ga(t,bi,Ei,wi,Bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new k,new k,new k,new k,new k,new k,new k,new k],tn=new k,Os=new ui,bi=new k,Ei=new k,wi=new k,kn=new k,zn=new k,Yn=new k,ji=new k,Bs=new k,ks=new k,$n=new k;function ga(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$n.fromArray(i,r);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=e.dot($n),c=t.dot($n),u=n.dot($n);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const wn=Nd();function Nd(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Fd(i){Math.abs(i)>65504&&Fe("DataUtils.toHalfFloat(): Value out of range."),i=qe(i,-65504,65504),wn.floatView[0]=i;const e=wn.uint32View[0],t=e>>23&511;return wn.baseTable[t]+((e&8388607)>>wn.shiftTable[t])}function Od(i){const e=i>>10;return wn.uint32View[0]=wn.mantissaTable[wn.offsetTable[e]+(i&1023)]+wn.exponentTable[e],wn.floatView[0]}class Bd{static toHalfFloat(e){return Fd(e)}static fromHalfFloat(e){return Od(e)}}const bt=new k,zs=new ye;let kd=0;class vt extends ci{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ku,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zs.fromBufferAttribute(this,t),zs.applyMatrix3(e),this.setXY(t,zs.x,zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Vu extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Wu extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const zd=new ui,es=new k,_a=new k;class hi{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):zd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);const t=es.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(es,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_a.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(_a)),this.expandByPoint(es.copy(e.center).sub(_a))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Hd=0;const qt=new rt,va=new wt,Ti=new k,Gt=new ui,ts=new ui,Rt=new k;class Mt extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nd(e)?Wu:Vu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return va.lookAt(e),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Gt.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(Gt.min,ts.min),Gt.expandByPoint(Rt),Rt.addVectors(Gt.max,ts.max),Gt.expandByPoint(Rt)):(Gt.expandByPoint(ts.min),Gt.expandByPoint(ts.max))}Gt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Rt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Rt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Rt.fromBufferAttribute(o,c),l&&(Ti.fromBufferAttribute(e,c),Rt.add(Ti)),s=Math.max(s,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new k,l[v]=new k;const c=new k,u=new k,f=new k,h=new ye,p=new ye,g=new ye,M=new k,m=new k;function d(v,w,L){c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,L),h.fromBufferAttribute(r,v),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,L),u.sub(c),f.sub(c),p.sub(h),g.sub(h);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(U),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(U),o[v].add(M),o[w].add(M),o[L].add(M),l[v].add(m),l[w].add(m),l[L].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,w=S.length;v<w;++v){const L=S[v],U=L.start,C=L.count;for(let I=U,D=U+C;I<D;I+=3)d(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const R=new k,_=new k,y=new k,E=new k;function A(v){y.fromBufferAttribute(s,v),E.copy(y);const w=o[v];R.copy(w),R.sub(y.multiplyScalar(y.dot(w))).normalize(),_.crossVectors(E,w);const U=_.dot(l[v])<0?-1:1;a.setXYZW(v,R.x,R.y,R.z,U)}for(let v=0,w=S.length;v<w;++v){const L=S[v],U=L.start,C=L.count;for(let I=U,D=U+C;I<D;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new k,r=new k,a=new k,o=new k,l=new k,c=new k,u=new k,f=new k;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),M=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new vt(h,u,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ku,this.updateRanges=[],this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Ut=new k;class Ur{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ir("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ur(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ir("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const xa=new k,Vd=new k,Wd=new ke;class En{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=xa.subVectors(n,t).cross(Vd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(xa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Wd.getNormalMatrix(e),s=this.coplanarPoint(xa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Xd=0;class fi extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=zi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yu,this.blendDst=bu,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ta,this.stencilZFail=ta,this.stencilZPass=ta,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new En().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qd extends fi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ai;const ns=new k,Ri=new k,Ci=new k,Pi=new ye,is=new ye,Xu=new rt,Hs=new k,ss=new k,Gs=new k,jl=new ye,Ma=new ye,ec=new ye;class GM extends wt{constructor(e=new qd){if(super(),this.isSprite=!0,this.type="Sprite",Ai===void 0){Ai=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gd(t,5);Ai.setIndex([0,1,2,0,2,3]),Ai.setAttribute("position",new Ur(n,3,0,!1)),Ai.setAttribute("uv",new Ur(n,2,3,!1))}this.geometry=Ai,this.material=e,this.center=new ye(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ri.setFromMatrixScale(this.matrixWorld),Xu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ci.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ri.multiplyScalar(-Ci.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Vs(Hs.set(-.5,-.5,0),Ci,a,Ri,s,r),Vs(ss.set(.5,-.5,0),Ci,a,Ri,s,r),Vs(Gs.set(.5,.5,0),Ci,a,Ri,s,r),jl.set(0,0),Ma.set(1,0),ec.set(1,1);let o=e.ray.intersectTriangle(Hs,ss,Gs,!1,ns);if(o===null&&(Vs(ss.set(-.5,.5,0),Ci,a,Ri,s,r),Ma.set(0,1),o=e.ray.intersectTriangle(Hs,Gs,ss,!1,ns),o===null))return;const l=e.ray.origin.distanceTo(ns);l<e.near||l>e.far||t.push({distance:l,point:ns.clone(),uv:Zt.getInterpolation(ns,Hs,ss,Gs,jl,Ma,ec,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Vs(i,e,t,n,s,r){Pi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(is.x=r*Pi.x-s*Pi.y,is.y=s*Pi.x+r*Pi.y):is.copy(Pi),i.copy(e),i.x+=is.x,i.y+=is.y,i.applyMatrix4(Xu)}const yn=new k,Sa=new k,Ws=new k,Xs=new k;class Wr{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Sa.copy(e).add(t).multiplyScalar(.5),Ws.copy(t).sub(e).normalize(),Xs.copy(this.origin).sub(Sa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ws),o=Xs.dot(this.direction),l=-Xs.dot(Ws),c=Xs.lengthSq(),u=Math.abs(1-a*a);let f,h,p,g;if(u>0)if(f=a*l-o,h=a*o-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const M=1/u;f*=M,h*=M,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Sa).addScaledVector(Ws,h),p}intersectSphere(e,t){if(e.radius<0)return null;yn.subVectors(e.center,this.origin);const n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,p=e.z-a.z,g=t.x-a.x,M=t.y-a.y,m=t.z-a.z,d=n.x-a.x,S=n.y-a.y,R=n.z-a.z,_=Math.abs(l),y=Math.abs(c),E=Math.abs(u);let A,v,w,L,U,C,I,D,N,J,Z,ie;if(_>=y&&_>=E?(w=l,C=f,N=g,ie=d,l>=0?(A=c,v=u,L=h,U=p,I=M,D=m,J=S,Z=R):(A=u,v=c,L=p,U=h,I=m,D=M,J=R,Z=S)):y>=E?(w=c,C=h,N=M,ie=S,c>=0?(A=u,v=l,L=p,U=f,I=m,D=g,J=R,Z=d):(A=l,v=u,L=f,U=p,I=g,D=m,J=d,Z=R)):(w=u,C=p,N=m,ie=R,u>=0?(A=l,v=c,L=f,U=h,I=g,D=M,J=d,Z=S):(A=c,v=l,L=h,U=f,I=M,D=g,J=S,Z=d)),w===0)return null;const j=A/w,ee=v/w,ne=1/w,Re=L-j*C,Te=U-ee*C,Ye=I-j*N,Be=D-ee*N,ze=J-j*ie,G=Z-ee*ie,K=ze*Be-G*Ye,ae=Re*G-Te*ze,ge=Ye*Te-Be*Re;if(s){if(K<0||ae<0||ge<0)return null}else if((K<0||ae<0||ge<0)&&(K>0||ae>0||ge>0))return null;const ce=K+ae+ge;if(ce===0)return null;const _e=ne*(K*C+ae*N+ge*ie);return(ce>0?_e<0:_e>0)?null:this.at(_e/ce,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bn extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=Eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tc=new rt,Kn=new Wr,qs=new hi,nc=new k,Ys=new k,$s=new k,Ks=new k,ya=new k,Zs=new k,ic=new k,Js=new k;class ct extends wt{constructor(e=new Mt,t=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Zs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(ya.fromBufferAttribute(f,e),a?Zs.addScaledVector(ya,u):Zs.addScaledVector(ya.sub(t),u))}t.add(Zs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(qs.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(qs,nc)===null||Kn.origin.distanceToSquared(nc)>(e.far-e.near)**2))&&(tc.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(tc),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,y=R;_<y;_+=3){const E=o.getX(_),A=o.getX(_+1),v=o.getX(_+2);s=Qs(this,d,e,n,c,u,f,E,A,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=g,d=M;m<d;m+=3){const S=o.getX(m),R=o.getX(m+1),_=o.getX(m+2);s=Qs(this,a,e,n,c,u,f,S,R,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=S,y=R;_<y;_+=3){const E=_,A=_+1,v=_+2;s=Qs(this,d,e,n,c,u,f,E,A,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=g,d=M;m<d;m+=3){const S=m,R=m+1,_=m+2;s=Qs(this,a,e,n,c,u,f,S,R,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Yd(i,e,t,n,s,r,a,o){let l;if(e.side===zt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ri,o),l===null)return null;Js.copy(o),Js.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Js);return c<t.near||c>t.far?null:{distance:c,point:Js.clone(),object:i}}function Qs(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ys),i.getVertexPosition(l,$s),i.getVertexPosition(c,Ks);const u=Yd(i,e,t,n,Ys,$s,Ks,ic);if(u){const f=new k;Zt.getBarycoord(ic,Ys,$s,Ks,f),s&&(u.uv=Zt.getInterpolatedAttribute(s,o,l,c,f,new ye)),r&&(u.uv1=Zt.getInterpolatedAttribute(r,o,l,c,f,new ye)),a&&(u.normal=Zt.getInterpolatedAttribute(a,o,l,c,f,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new k,materialIndex:0};Zt.getNormal(Ys,$s,Ks,h.normal),u.face=h,u.barycoord=f}return u}class di extends Ct{constructor(e=null,t=1,n=1,s,r,a,o,l,c=_t,u=_t,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sc extends vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Li=new rt,rc=new rt,js=[],ac=new ui,$d=new rt,rs=new ct,as=new hi;class VM extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new sc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$d)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),ac.copy(e.boundingBox).applyMatrix4(Li),this.boundingBox.union(ac)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Li),as.copy(e.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(as)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(n),e.ray.intersectsSphere(as)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Li),rc.multiplyMatrices(n,Li),rs.matrixWorld=rc,rs.raycast(e,js);for(let a=0,o=js.length;a<o;a++){const l=js[a];l.instanceId=r,l.object=this,t.push(l)}js.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new sc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new di(new Float32Array(s*this.count),s,this.count,Ts,rn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zn=new hi,Kd=new ye(.5,.5),er=new k;class ol{constructor(e=new En,t=new En,n=new En,s=new En,r=new En,a=new En){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],g=r[8],M=r[9],m=r[10],d=r[11],S=r[12],R=r[13],_=r[14],y=r[15];if(s[0].setComponents(c-a,p-u,d-g,y-S).normalize(),s[1].setComponents(c+a,p+u,d+g,y+S).normalize(),s[2].setComponents(c+o,p+f,d+M,y+R).normalize(),s[3].setComponents(c-o,p-f,d-M,y-R).normalize(),n)s[4].setComponents(l,h,m,_).normalize(),s[5].setComponents(c-l,p-h,d-m,y-_).normalize();else if(s[4].setComponents(c-l,p-h,d-m,y-_).normalize(),t===mn)s[5].setComponents(c+l,p+h,d+m,y+_).normalize();else if(t===ys)s[5].setComponents(l,h,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=Kd.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(er.x=s.normal.x>0?e.max.x:e.min.x,er.y=s.normal.y>0?e.max.y:e.min.y,er.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zd extends fi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Nr=new k,Fr=new k,oc=new rt,os=new Wr,tr=new hi,ba=new k,lc=new k;class Jd extends wt{constructor(e=new Mt,t=new Zd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Nr.fromBufferAttribute(t,s-1),Fr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Nr.distanceTo(Fr);e.setAttribute("lineDistance",new gt(n,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(s),tr.radius+=r,e.ray.intersectsSphere(tr)===!1)return;oc.copy(s).invert(),os.copy(e.ray).applyMatrix4(oc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=c){const d=u.getX(M),S=u.getX(M+1),R=nr(this,e,os,l,d,S,M);R&&t.push(R)}if(this.isLineLoop){const M=u.getX(g-1),m=u.getX(p),d=nr(this,e,os,l,M,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=c){const d=nr(this,e,os,l,M,M+1,M);d&&t.push(d)}if(this.isLineLoop){const M=nr(this,e,os,l,g-1,p,g-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function nr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Nr.fromBufferAttribute(o,s),Fr.fromBufferAttribute(o,r),t.distanceSqToSegment(Nr,Fr,ba,lc)>n)return;ba.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ba);if(!(c<e.near||c>e.far))return{distance:c,point:lc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const cc=new k,uc=new k;class WM extends Jd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)cc.fromBufferAttribute(t,s),uc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+cc.distanceTo(uc);e.setAttribute("lineDistance",new gt(n,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qd extends fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hc=new rt,Do=new Wr,ir=new hi,sr=new k;class XM extends wt{constructor(e=new Mt,t=new Qd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),ir.radius+=r,e.ray.intersectsSphere(ir)===!1)return;hc.copy(s).invert(),Do.copy(e.ray).applyMatrix4(hc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,M=p;g<M;g++){const m=c.getX(g);sr.fromBufferAttribute(f,m),fc(sr,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=h,M=p;g<M;g++)sr.fromBufferAttribute(f,g),fc(sr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fc(i,e,t,n,s,r,a){const o=Do.distanceSqToPoint(i);if(o<t){const l=new k;Do.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class qM extends Ct{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=_t,this.minFilter=_t,this.generateMipmaps=!1,this.needsUpdate=!0}}class qu extends Ct{constructor(e=[],t=ai,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class YM extends Ct{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $i extends Ct{constructor(e,t,n=_n,s,r,a,o=_t,l=_t,c,u=Dn,f=1){if(u!==Dn&&u!==Vn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class jd extends $i{constructor(e,t=_n,n=ai,s,r,a=_t,o=_t,l,c=Dn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yu extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class As extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(f,2));function g(M,m,d,S,R,_,y,E,A,v,w){const L=_/A,U=y/v,C=_/2,I=y/2,D=E/2,N=A+1,J=v+1;let Z=0,ie=0;const j=new k;for(let ee=0;ee<J;ee++){const ne=ee*U-I;for(let Re=0;Re<N;Re++){const Te=Re*L-C;j[M]=Te*S,j[m]=ne*R,j[d]=D,c.push(j.x,j.y,j.z),j[M]=0,j[m]=0,j[d]=E>0?1:-1,u.push(j.x,j.y,j.z),f.push(Re/A),f.push(1-ee/v),Z+=1}}for(let ee=0;ee<v;ee++)for(let ne=0;ne<A;ne++){const Re=h+ne+N*ee,Te=h+ne+N*(ee+1),Ye=h+(ne+1)+N*(ee+1),Be=h+(ne+1)+N*ee;l.push(Re,Te,Be),l.push(Te,Ye,Be),ie+=6}o.addGroup(p,ie,w),p+=ie,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new As(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Or extends Mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new k,u=new ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const p=n+f/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ll extends Mt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],p=[];let g=0;const M=[],m=n/2;let d=0;S(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(p,2));function S(){const _=new k,y=new k;let E=0;const A=(t-e)/n;for(let v=0;v<=r;v++){const w=[],L=v/r,U=L*(t-e)+e;for(let C=0;C<=s;C++){const I=C/s,D=I*l+o,N=Math.sin(D),J=Math.cos(D);y.x=U*N,y.y=-L*n+m,y.z=U*J,f.push(y.x,y.y,y.z),_.set(N,A,J).normalize(),h.push(_.x,_.y,_.z),p.push(I,1-L),w.push(g++)}M.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){const L=M[w][v],U=M[w+1][v],C=M[w+1][v+1],I=M[w][v+1];(e>0||w!==0)&&(u.push(L,U,I),E+=3),(t>0||w!==r-1)&&(u.push(U,C,I),E+=3)}c.addGroup(d,E,0),d+=E}function R(_){const y=g,E=new ye,A=new k;let v=0;const w=_===!0?e:t,L=_===!0?1:-1;for(let C=1;C<=s;C++)f.push(0,m*L,0),h.push(0,L,0),p.push(.5,.5),g++;const U=g;for(let C=0;C<=s;C++){const D=C/s*l+o,N=Math.cos(D),J=Math.sin(D);A.x=w*J,A.y=m*L,A.z=w*N,f.push(A.x,A.y,A.z),h.push(0,L,0),E.x=N*.5+.5,E.y=J*.5*L+.5,p.push(E.x,E.y),g++}for(let C=0;C<s;C++){const I=y+C,D=U+C;_===!0?u.push(D,D+1,I):u.push(D+1,D,I),v+=3}c.addGroup(d,v,_===!0?1:2),d+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rn extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,f=e/o,h=t/l,p=[],g=[],M=[],m=[];for(let d=0;d<u;d++){const S=d*h-a;for(let R=0;R<c;R++){const _=R*f-r;g.push(_,-S,0),M.push(0,0,1),m.push(R/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<o;S++){const R=S+c*d,_=S+c*(d+1),y=S+1+c*(d+1),E=S+1+c*d;p.push(R,_,E),p.push(_,y,E)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(M,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Br extends Mt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let f=e;const h=(t-e)/s,p=new k,g=new ye;for(let M=0;M<=s;M++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let M=0;M<s;M++){const m=M*(n+1);for(let d=0;d<n;d++){const S=d+m,R=S,_=S+n+1,y=S+n+2,E=S+1;o.push(R,_,E),o.push(_,y,E)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Br(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function Ki(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(dc(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(dc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Ki(i[t]);for(const s in n)e[s]=n[s]}return e}function dc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ep(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $u(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const tp={clone:Ki,merge:Nt};var np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ip=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Et extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=np,this.fragmentShader=ip,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=ep(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new ye().fromArray(s.value);break;case"v3":this.uniforms[n].value=new k().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ze().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class sp extends Et{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rp extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ap extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ku extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class op extends Ku{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ea=new rt,pc=new k,mc=new k;class lp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=kt,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;pc.setFromMatrixPosition(e.matrixWorld),t.position.copy(pc),mc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ea,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ys||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rr=new k,ar=new Zi,cn=new k;class Zu extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(rr,ar,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rr,ar,cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(rr,ar,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rr,ar,cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new k,gc=new ye,_c=new ye;class $t extends Zu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-e/Hn.z)}getViewSize(e,t){return this.getViewBounds(e,gc,_c),t.subVectors(_c,gc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xr extends Zu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cp extends lp{constructor(){super(new Xr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class up extends Ku{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new cp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class $M extends Mt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Di=-90,Ii=1;class hp extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $t(Di,Ii,e,t);s.layers=this.layers,this.add(s);const r=new $t(Di,Ii,e,t);r.layers=this.layers,this.add(r);const a=new $t(Di,Ii,e,t);a.layers=this.layers,this.add(a);const o=new $t(Di,Ii,e,t);o.layers=this.layers,this.add(o);const l=new $t(Di,Ii,e,t);l.layers=this.layers,this.add(l);const c=new $t(Di,Ii,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class fp extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vc=new rt;class dp{constructor(e,t,n=0,s=1/0){this.ray=new Wr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new al,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(e,t=!0,n=[]){return Io(e,this,n,t),n.sort(xc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Io(e[s],this,n,t);return n.sort(xc),n}}function xc(i,e){return i.distance-e.distance}function Io(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Io(r[a],e,t,!0)}}class Ju{static{Ju.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function Mc(i,e,t,n){const s=pp(n);switch(t){case Ou:return i*e;case Ts:return i*e/s.components*s.byteLength;case jo:return i*e/s.components*s.byteLength;case oi:return i*e*2/s.components*s.byteLength;case el:return i*e*2/s.components*s.byteLength;case Bu:return i*e*3/s.components*s.byteLength;case Jt:return i*e*4/s.components*s.byteLength;case tl:return i*e*4/s.components*s.byteLength;case vr:case xr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mr:case Sr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case to:case io:return Math.max(i,16)*Math.max(e,8)/4;case eo:case no:return Math.max(i,8)*Math.max(e,8)/2;case so:case ro:case oo:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ao:case Cr:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _o:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wo:case To:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ro:case Co:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Pr:case Po:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pp(i){switch(i){case kt:case Iu:return{byteLength:1,components:1};case Ms:case Uu:case an:return{byteLength:2,components:1};case Jo:case Qo:return{byteLength:2,components:4};case _n:case Zo:case rn:return{byteLength:4,components:1};case Nu:case Fu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);function Qu(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function mp(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],M=f[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++h,f[h]=M)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const M=f[p];i.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_p=`#ifdef USE_ALPHAHASH
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
#endif`,vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sp=`#ifdef USE_ALPHATEST
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
#endif`,bp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ep=`#ifdef USE_BATCHING
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
#endif`,wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cp=`#ifdef USE_IRIDESCENCE
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
#endif`,Pp=`#ifdef USE_BUMPMAP
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
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Np=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,kp=`#define PI 3.141592653589793
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
} // validated`,zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hp=`vec3 transformedNormal = objectNormal;
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
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$p=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,em=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,im=`#ifdef USE_GRADIENTMAP
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
}`,sm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,om=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dm=`PhysicalMaterial material;
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
#endif`,pm=`uniform sampler2D dfgLUT;
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
}`,mm=`
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
#endif`,gm=`#if defined( RE_IndirectDiffuse )
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
#endif`,_m=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ym=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Em=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tm=`#if defined( USE_POINTS_UV )
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
#endif`,Am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`#ifdef USE_MORPHTARGETS
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
#endif`,Im=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Um=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,km=`#ifdef USE_NORMALMAP
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
#endif`,zm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ym=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$m=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,t0=`float getShadowMask() {
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
}`,n0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,a0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,u0=`#ifdef USE_TRANSMISSION
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
#endif`,h0=`#ifdef USE_TRANSMISSION
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_0=`uniform sampler2D t2D;
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
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
}`,b0=`#if DEPTH_PACKING == 3200
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
}`,E0=`#define DISTANCE
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
}`,w0=`#define DISTANCE
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`uniform float scale;
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
}`,C0=`uniform vec3 diffuse;
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
}`,P0=`#include <common>
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
}`,L0=`uniform vec3 diffuse;
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
}`,D0=`#define LAMBERT
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
}`,I0=`#define LAMBERT
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
}`,U0=`#define MATCAP
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
}`,N0=`#define MATCAP
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
}`,F0=`#define NORMAL
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
}`,O0=`#define NORMAL
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
}`,B0=`#define PHONG
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
}`,k0=`#define PHONG
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
}`,z0=`#define STANDARD
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
}`,H0=`#define STANDARD
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
}`,G0=`#define TOON
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
}`,V0=`#define TOON
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
}`,W0=`uniform float size;
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
}`,X0=`uniform vec3 diffuse;
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
}`,q0=`#include <common>
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
}`,Y0=`uniform vec3 color;
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
}`,$0=`uniform float rotation;
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
}`,K0=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:gp,alphahash_pars_fragment:_p,alphamap_fragment:vp,alphamap_pars_fragment:xp,alphatest_fragment:Mp,alphatest_pars_fragment:Sp,aomap_fragment:yp,aomap_pars_fragment:bp,batching_pars_vertex:Ep,batching_vertex:wp,begin_vertex:Tp,beginnormal_vertex:Ap,bsdfs:Rp,iridescence_fragment:Cp,bumpmap_pars_fragment:Pp,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Dp,clipping_planes_pars_vertex:Ip,clipping_planes_vertex:Up,color_fragment:Np,color_pars_fragment:Fp,color_pars_vertex:Op,color_vertex:Bp,common:kp,cube_uv_reflection_fragment:zp,defaultnormal_vertex:Hp,displacementmap_pars_vertex:Gp,displacementmap_vertex:Vp,emissivemap_fragment:Wp,emissivemap_pars_fragment:Xp,colorspace_fragment:qp,colorspace_pars_fragment:Yp,envmap_fragment:$p,envmap_common_pars_fragment:Kp,envmap_pars_fragment:Zp,envmap_pars_vertex:Jp,envmap_physical_pars_fragment:lm,envmap_vertex:Qp,fog_vertex:jp,fog_pars_vertex:em,fog_fragment:tm,fog_pars_fragment:nm,gradientmap_pars_fragment:im,lightmap_pars_fragment:sm,lights_lambert_fragment:rm,lights_lambert_pars_fragment:am,lights_pars_begin:om,lights_toon_fragment:cm,lights_toon_pars_fragment:um,lights_phong_fragment:hm,lights_phong_pars_fragment:fm,lights_physical_fragment:dm,lights_physical_pars_fragment:pm,lights_fragment_begin:mm,lights_fragment_maps:gm,lights_fragment_end:_m,lightprobes_pars_fragment:vm,logdepthbuf_fragment:xm,logdepthbuf_pars_fragment:Mm,logdepthbuf_pars_vertex:Sm,logdepthbuf_vertex:ym,map_fragment:bm,map_pars_fragment:Em,map_particle_fragment:wm,map_particle_pars_fragment:Tm,metalnessmap_fragment:Am,metalnessmap_pars_fragment:Rm,morphinstance_vertex:Cm,morphcolor_vertex:Pm,morphnormal_vertex:Lm,morphtarget_pars_vertex:Dm,morphtarget_vertex:Im,normal_fragment_begin:Um,normal_fragment_maps:Nm,normal_pars_fragment:Fm,normal_pars_vertex:Om,normal_vertex:Bm,normalmap_pars_fragment:km,clearcoat_normal_fragment_begin:zm,clearcoat_normal_fragment_maps:Hm,clearcoat_pars_fragment:Gm,iridescence_pars_fragment:Vm,opaque_fragment:Wm,packing:Xm,premultiplied_alpha_fragment:qm,project_vertex:Ym,dithering_fragment:$m,dithering_pars_fragment:Km,roughnessmap_fragment:Zm,roughnessmap_pars_fragment:Jm,shadowmap_pars_fragment:Qm,shadowmap_pars_vertex:jm,shadowmap_vertex:e0,shadowmask_pars_fragment:t0,skinbase_vertex:n0,skinning_pars_vertex:i0,skinning_vertex:s0,skinnormal_vertex:r0,specularmap_fragment:a0,specularmap_pars_fragment:o0,tonemapping_fragment:l0,tonemapping_pars_fragment:c0,transmission_fragment:u0,transmission_pars_fragment:h0,uv_pars_fragment:f0,uv_pars_vertex:d0,uv_vertex:p0,worldpos_vertex:m0,background_vert:g0,background_frag:_0,backgroundCube_vert:v0,backgroundCube_frag:x0,cube_vert:M0,cube_frag:S0,depth_vert:y0,depth_frag:b0,distance_vert:E0,distance_frag:w0,equirect_vert:T0,equirect_frag:A0,linedashed_vert:R0,linedashed_frag:C0,meshbasic_vert:P0,meshbasic_frag:L0,meshlambert_vert:D0,meshlambert_frag:I0,meshmatcap_vert:U0,meshmatcap_frag:N0,meshnormal_vert:F0,meshnormal_frag:O0,meshphong_vert:B0,meshphong_frag:k0,meshphysical_vert:z0,meshphysical_frag:H0,meshtoon_vert:G0,meshtoon_frag:V0,points_vert:W0,points_frag:X0,shadow_vert:q0,shadow_frag:Y0,sprite_vert:$0,sprite_frag:K0},pe={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},hn={basic:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Nt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Nt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Nt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Nt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Nt([pe.points,pe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Nt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Nt([pe.common,pe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Nt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Nt([pe.sprite,pe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Nt([pe.common,pe.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Nt([pe.lights,pe.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};hn.physical={uniforms:Nt([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const or={r:0,b:0,g:0},Z0=new rt,ju=new ke;ju.set(-1,0,0,0,1,0,0,0,1);function J0(i,e,t,n,s,r){const a=new Oe(0);let o=s===!0?0:1,l,c,u=null,f=0,h=null;function p(S){let R=S.isScene===!0?S.background:null;if(R&&R.isTexture){const _=S.backgroundBlurriness>0;R=e.get(R,_)}return R}function g(S){let R=!1;const _=p(S);_===null?m(a,o):_&&_.isColor&&(m(_,1),R=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(S,R){const _=p(R);_&&(_.isCubeTexture||_.mapping===Vr)?(c===void 0&&(c=new ct(new As(1,1,1),new Et({name:"BackgroundCubeMaterial",uniforms:Ki(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Z0.makeRotationFromEuler(R.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ju),c.material.toneMapped=Ke.getTransfer(_.colorSpace)!==at,(u!==_||f!==_.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ct(new Rn(2,2),new Et({name:"BackgroundMaterial",uniforms:Ki(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(_.colorSpace)!==at,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,R){S.getRGB(or,$u(i)),t.buffers.color.setClear(or.r,or.g,or.b,R,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,R=1){a.set(S),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:M,dispose:d}}function Q0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(U,C,I,D,N){let J=!1;const Z=f(U,D,I,C);r!==Z&&(r=Z,c(r.object)),J=p(U,D,I,N),J&&g(U,D,I,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,_(U,C,I,D),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(U){return i.bindVertexArray(U)}function u(U){return i.deleteVertexArray(U)}function f(U,C,I,D){const N=D.wireframe===!0;let J=n[C.id];J===void 0&&(J={},n[C.id]=J);const Z=U.isInstancedMesh===!0?U.id:0;let ie=J[Z];ie===void 0&&(ie={},J[Z]=ie);let j=ie[I.id];j===void 0&&(j={},ie[I.id]=j);let ee=j[N];return ee===void 0&&(ee=h(l()),j[N]=ee),ee}function h(U){const C=[],I=[],D=[];for(let N=0;N<t;N++)C[N]=0,I[N]=0,D[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:D,object:U,attributes:{},index:null}}function p(U,C,I,D){const N=r.attributes,J=C.attributes;let Z=0;const ie=I.getAttributes();for(const j in ie)if(ie[j].location>=0){const ne=N[j];let Re=J[j];if(Re===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(Re=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(Re=U.instanceColor)),ne===void 0||ne.attribute!==Re||Re&&ne.data!==Re.data)return!0;Z++}return r.attributesNum!==Z||r.index!==D}function g(U,C,I,D){const N={},J=C.attributes;let Z=0;const ie=I.getAttributes();for(const j in ie)if(ie[j].location>=0){let ne=J[j];ne===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(ne=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(ne=U.instanceColor));const Re={};Re.attribute=ne,ne&&ne.data&&(Re.data=ne.data),N[j]=Re,Z++}r.attributes=N,r.attributesNum=Z,r.index=D}function M(){const U=r.newAttributes;for(let C=0,I=U.length;C<I;C++)U[C]=0}function m(U){d(U,0)}function d(U,C){const I=r.newAttributes,D=r.enabledAttributes,N=r.attributeDivisors;I[U]=1,D[U]===0&&(i.enableVertexAttribArray(U),D[U]=1),N[U]!==C&&(i.vertexAttribDivisor(U,C),N[U]=C)}function S(){const U=r.newAttributes,C=r.enabledAttributes;for(let I=0,D=C.length;I<D;I++)C[I]!==U[I]&&(i.disableVertexAttribArray(I),C[I]=0)}function R(U,C,I,D,N,J,Z){Z===!0?i.vertexAttribIPointer(U,C,I,N,J):i.vertexAttribPointer(U,C,I,D,N,J)}function _(U,C,I,D){M();const N=D.attributes,J=I.getAttributes(),Z=C.defaultAttributeValues;for(const ie in J){const j=J[ie];if(j.location>=0){let ee=N[ie];if(ee===void 0&&(ie==="instanceMatrix"&&U.instanceMatrix&&(ee=U.instanceMatrix),ie==="instanceColor"&&U.instanceColor&&(ee=U.instanceColor)),ee!==void 0){const ne=ee.normalized,Re=ee.itemSize,Te=e.get(ee);if(Te===void 0)continue;const Ye=Te.buffer,Be=Te.type,ze=Te.bytesPerElement,G=Be===i.INT||Be===i.UNSIGNED_INT||ee.gpuType===Zo;if(ee.isInterleavedBufferAttribute){const K=ee.data,ae=K.stride,ge=ee.offset;if(K.isInstancedInterleavedBuffer){for(let ce=0;ce<j.locationSize;ce++)d(j.location+ce,K.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ce=0;ce<j.locationSize;ce++)m(j.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Ye);for(let ce=0;ce<j.locationSize;ce++)R(j.location+ce,Re/j.locationSize,Be,ne,ae*ze,(ge+Re/j.locationSize*ce)*ze,G)}else{if(ee.isInstancedBufferAttribute){for(let K=0;K<j.locationSize;K++)d(j.location+K,ee.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let K=0;K<j.locationSize;K++)m(j.location+K);i.bindBuffer(i.ARRAY_BUFFER,Ye);for(let K=0;K<j.locationSize;K++)R(j.location+K,Re/j.locationSize,Be,ne,Re*ze,Re/j.locationSize*K*ze,G)}}else if(Z!==void 0){const ne=Z[ie];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(j.location,ne);break;case 3:i.vertexAttrib3fv(j.location,ne);break;case 4:i.vertexAttrib4fv(j.location,ne);break;default:i.vertexAttrib1fv(j.location,ne)}}}}S()}function y(){w();for(const U in n){const C=n[U];for(const I in C){const D=C[I];for(const N in D){const J=D[N];for(const Z in J)u(J[Z].object),delete J[Z];delete D[N]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const C=n[U.id];for(const I in C){const D=C[I];for(const N in D){const J=D[N];for(const Z in J)u(J[Z].object),delete J[Z];delete D[N]}}delete n[U.id]}function A(U){for(const C in n){const I=n[C];for(const D in I){const N=I[D];if(N[U.id]===void 0)continue;const J=N[U.id];for(const Z in J)u(J[Z].object),delete J[Z];delete N[U.id]}}}function v(U){for(const C in n){const I=n[C],D=U.isInstancedMesh===!0?U.id:0,N=I[D];if(N!==void 0){for(const J in N){const Z=N[J];for(const ie in Z)u(Z[ie].object),delete Z[ie];delete N[J]}delete I[D],Object.keys(I).length===0&&delete n[C]}}}function w(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:m,disableUnusedAttributes:S}}function j0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function eg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Jt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===an&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==kt&&A!==rn&&!v&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Fe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:R,maxFragmentUniforms:_,maxSamples:y,samples:E}}function tg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new En,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,M=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:n,R=S*4;let _=d.clippingState||null;l.value=_,_=u(g,h,R,p);for(let y=0;y!==R;++y)_[y]=t[y];d.clippingState=_,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,p,g){const M=f!==null?f.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const d=p+M*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let R=0,_=p;R!==M;++R,_+=4)a.copy(f[R]).applyMatrix4(S,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const Bi=4,ng=6,ig=20,sg=256,ls=new Xr,Sc=new Oe;let wa=null,Ta=0,Aa=0,Ra=!1;const rg=new k,Jn=new k;class yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=rg}=r;wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wa,Ta,Aa),this._renderer.xr.enabled=Ra,e.scissorTest=!1,Ui(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ai||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:st,minFilter:st,generateMipmaps:!1,type:an,format:Jt,colorSpace:Ss,depthBuffer:!1},s=bc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ag(r)),this._blurMaterial=lg(r,e,t),this._ggxMaterial=og(r,e,t)}return s}_compileMaterial(e){const t=new ct(new Mt,e);this._renderer.compile(t,ls)}_sceneToCubeUV(e,t,n,s,r){const l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Sc),f.toneMapping=gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new As,new bn({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let d=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,d=!0):(m.color.copy(Sc),d=!0);for(let R=0;R<6;R++){const _=R%3;_===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):_===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));const y=this._cubeSize;Ui(s,_*y,R>2?y:0,y,y),f.setRenderTarget(s),d&&f.render(M,l),f.render(e,l)}f.toneMapping=p,f.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ai||e.mapping===qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ec());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ui(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ls)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,p=f*h,{_lodMax:g}=this,M=this._sizeLods[n],m=3*M*(n>g-Bi?n-g+Bi:0),d=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,Ui(r,m,d,3*M,2*M),s.setRenderTarget(r),s.render(o,ls),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ui(e,m,d,3*M,2*M),s.setRenderTarget(e),s.render(o,ls)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Bi?s-this._lodMax+Bi:0),h=4*(this._cubeSize-u);Ui(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(l,ls)}}function ag(i){const e=[],t=[];let n=i;const s=i-Bi+1+ng;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,p=3,g=new Float32Array(p*h*f),M=new Float32Array(p*h*f);for(let d=0;d<f;d++){const S=d%3*2/3-1,R=d>2?0:-1,_=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];g.set(_,p*h*d);for(let y=0;y<h;y++){const E=u[y*2]*2-1,A=u[y*2+1]*2-1;d===0?Jn.set(1,A,E):d===1?Jn.set(-E,1,-A):d===2?Jn.set(-E,A,1):d===3?Jn.set(-1,A,-E):d===4?Jn.set(-E,-1,A):Jn.set(E,A,-1),Jn.toArray(M,(d*h+y)*p)}}const m=new Mt;m.setAttribute("position",new vt(g,p)),m.setAttribute("outputDirection",new vt(M,p)),t.push(new ct(m,null)),n>Bi&&n--}return{lodMeshes:t,sizeLods:e}}function bc(i,e,t){const n=new Wt(i,e,t);return n.texture.mapping=Vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ui(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function og(i,e,t){return new Et({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qr(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function lg(i,e,t){return new Et({name:"SphericalGaussianBlur",defines:{SAMPLES:ig,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qr(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ec(){return new Et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qr(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function wc(){return new Et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function qr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class eh extends Wt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new qu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new As(5,5,5),r=new Et({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:Cn});r.uniforms.tEquirect.value=t;const a=new ct(s,r),o=t.minFilter;return t.minFilter===ii&&(t.minFilter=st),new hp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function cg(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===Qr||p===jr)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const M=new eh(g.height);return M.fromEquirectangularTexture(i,h),e.set(h,M),h.addEventListener("dispose",c),o(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===Qr||p===jr,M=p===ai||p===qi;if(g||M){let m=t.get(h);const d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new yc(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||M&&S&&l(S)?(n===null&&(n=new yc(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===Qr?h.mapping=ai:p===jr&&(h.mapping=qi),h}function l(h){let p=0;const g=6;for(let M=0;M<g;M++)h[M]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function ug(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Hi("WebGLRenderer: "+n+" extension not supported."),s}}}function hg(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,g=f.attributes.position;let M=0;if(g===void 0)return;if(p!==null){const S=p.array;M=p.version;for(let R=0,_=S.length;R<_;R+=3){const y=S[R+0],E=S[R+1],A=S[R+2];h.push(y,E,E,A,A,y)}}else{const S=g.array;M=g.version;for(let R=0,_=S.length/3-1;R<_;R+=3){const y=R+0,E=R+1,A=R+2;h.push(y,E,E,A,A,y)}}const m=new(g.count>=65535?Wu:Vu)(h,1);m.version=M;const d=r.get(f);d&&e.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function fg(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){i.drawElements(n,h,r,f*a),t.update(h,n,1)}function c(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*a,p),t.update(h,n,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let M=0;for(let m=0;m<p;m++)M+=h[m];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function dg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function pg(i,e,t){const n=new WeakMap,s=new Ze;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let R=0;p===!0&&(R=1),g===!0&&(R=2),M===!0&&(R=3);let _=o.attributes.position.count*R,y=1;_>e.maxTextureSize&&(y=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const E=new Float32Array(_*y*4*f),A=new Hu(E,_,y,f);A.type=rn,A.needsUpdate=!0;const v=R*4;for(let L=0;L<f;L++){const U=m[L],C=d[L],I=S[L],D=_*y*4*L;for(let N=0;N<U.count;N++){const J=N*v;p===!0&&(s.fromBufferAttribute(U,N),E[D+J+0]=s.x,E[D+J+1]=s.y,E[D+J+2]=s.z,E[D+J+3]=0),g===!0&&(s.fromBufferAttribute(C,N),E[D+J+4]=s.x,E[D+J+5]=s.y,E[D+J+6]=s.z,E[D+J+7]=0),M===!0&&(s.fromBufferAttribute(I,N),E[D+J+8]=s.x,E[D+J+9]=s.y,E[D+J+10]=s.z,E[D+J+11]=I.itemSize===4?s.w:1)}}h={count:f,texture:A,size:new ye(_,y)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function mg(i,e,t,n,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,h=e.get(c,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const gg={[wu]:"LINEAR_TONE_MAPPING",[Tu]:"REINHARD_TONE_MAPPING",[Au]:"CINEON_TONE_MAPPING",[Ru]:"ACES_FILMIC_TONE_MAPPING",[Pu]:"AGX_TONE_MAPPING",[Lu]:"NEUTRAL_TONE_MAPPING",[Cu]:"CUSTOM_TONE_MAPPING"};function _g(i,e,t,n,s,r){const a=new Wt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Mt;c.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new gt([0,2,0,0,2,0],2));const u=new sp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ct(c,u),h=new Xr(-1,1,1,-1,0,1);let p=null,g=null,M=!1,m,d=null,S=[],R=!1;this.setSize=function(_,y){a.setSize(_,y),o!==null&&o.setSize(_,y),l!==null&&l.setSize(_,y);for(let E=0;E<S.length;E++){const A=S[E];A.setSize&&A.setSize(_,y)}},this.setEffects=function(_){S=_,R=S.length>0&&S[0].isRenderPass===!0;const y=a.width,E=a.height;S.length>0&&o===null&&(o=new Wt(y,E,{type:an,depthBuffer:!1,stencilBuffer:!1}),l=new Wt(y,E,{type:an,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){const v=S[A];v.setSize&&v.setSize(y,E)}},this.begin=function(_,y){if(M||_.toneMapping===gn&&S.length===0)return!1;if(d=y,y!==null){const E=y.width,A=y.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return R===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=gn,!0},this.hasRenderPass=function(){return R},this.end=function(_,y){_.toneMapping=m,M=!0;let E=a,A=o;for(let v=0;v<S.length;v++){const w=S[v];w.enabled!==!1&&(w.render(_,A,E,y),w.needsSwap!==!1&&(E=A,A=A===o?l:o))}if(p!==_.outputColorSpace||g!==_.toneMapping){p=_.outputColorSpace,g=_.toneMapping,u.defines={},Ke.getTransfer(p)===at&&(u.defines.SRGB_TRANSFER="");const v=gg[g];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(d),_.render(f,h),d=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const th=new Ct,Uo=new $i(1,1),nh=new Hu,ih=new Ad,sh=new qu,Tc=[],Ac=[],Rc=new Float32Array(16),Cc=new Float32Array(9),Pc=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Tc[s];if(r===void 0&&(r=new Float32Array(s),Tc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Tt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Yr(i,e){let t=Ac[e];t===void 0&&(t=new Int32Array(e),Ac[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Mg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function yg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Pc.set(n),i.uniformMatrix2fv(this.addr,!1,Pc),At(t,n)}}function bg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Cc.set(n),i.uniformMatrix3fv(this.addr,!1,Cc),At(t,n)}}function Eg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Rc.set(n),i.uniformMatrix4fv(this.addr,!1,Rc),At(t,n)}}function wg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function Cg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function Dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Uo.compareFunction=t.isReversedDepthBuffer()?il:nl,r=Uo):r=th,t.setTexture2D(e||r,s)}function Ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ih,s)}function Ng(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sh,s)}function Fg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||nh,s)}function Og(i){switch(i){case 5126:return vg;case 35664:return xg;case 35665:return Mg;case 35666:return Sg;case 35674:return yg;case 35675:return bg;case 35676:return Eg;case 5124:case 35670:return wg;case 35667:case 35671:return Tg;case 35668:case 35672:return Ag;case 35669:case 35673:return Rg;case 5125:return Cg;case 36294:return Pg;case 36295:return Lg;case 36296:return Dg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Ng;case 36289:case 36303:case 36311:case 36292:return Fg}}function Bg(i,e){i.uniform1fv(this.addr,e)}function kg(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function zg(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function Hg(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Gg(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vg(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wg(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xg(i,e){i.uniform1iv(this.addr,e)}function qg(i,e){i.uniform2iv(this.addr,e)}function Yg(i,e){i.uniform3iv(this.addr,e)}function $g(i,e){i.uniform4iv(this.addr,e)}function Kg(i,e){i.uniform1uiv(this.addr,e)}function Zg(i,e){i.uniform2uiv(this.addr,e)}function Jg(i,e){i.uniform3uiv(this.addr,e)}function Qg(i,e){i.uniform4uiv(this.addr,e)}function jg(i,e,t){const n=this.cache,s=e.length,r=Yr(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Uo:a=th;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function e_(i,e,t){const n=this.cache,s=e.length,r=Yr(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ih,r[a])}function t_(i,e,t){const n=this.cache,s=e.length,r=Yr(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||sh,r[a])}function n_(i,e,t){const n=this.cache,s=e.length,r=Yr(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||nh,r[a])}function i_(i){switch(i){case 5126:return Bg;case 35664:return kg;case 35665:return zg;case 35666:return Hg;case 35674:return Gg;case 35675:return Vg;case 35676:return Wg;case 5124:case 35670:return Xg;case 35667:case 35671:return qg;case 35668:case 35672:return Yg;case 35669:case 35673:return $g;case 5125:return Kg;case 36294:return Zg;case 36295:return Jg;case 36296:return Qg;case 35678:case 36198:case 36298:case 36306:case 35682:return jg;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return t_;case 36289:case 36303:case 36311:case 36292:return n_}}class s_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Og(t.type)}}class r_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=i_(t.type)}}class a_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ca=/(\w+)(\])?(\[|\.)?/g;function Lc(i,e){i.seq.push(e),i.map[e.id]=e}function o_(i,e,t){const n=i.name,s=n.length;for(Ca.lastIndex=0;;){const r=Ca.exec(n),a=Ca.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Lc(t,c===void 0?new s_(o,i,e):new r_(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new a_(o),Lc(t,f)),t=f}}}class yr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);o_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Dc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const l_=37297;let c_=0;function u_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Ic=new ke;function h_(i){Ke._getMatrix(Ic,Ke.workingColorSpace,i);const e=`mat3( ${Ic.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Lr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Uc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+u_(i.getShaderSource(e),o)}else return r}function f_(i,e){const t=h_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const d_={[wu]:"Linear",[Tu]:"Reinhard",[Au]:"Cineon",[Ru]:"ACESFilmic",[Pu]:"AgX",[Lu]:"Neutral",[Cu]:"Custom"};function p_(i,e){const t=d_[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lr=new k;function m_(){Ke.getLuminanceCoefficients(lr);const i=lr.x.toFixed(4),e=lr.y.toFixed(4),t=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function __(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function v_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ps(i){return i!==""}function Nc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const x_=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(i){return i.replace(x_,S_)}const M_=new Map;function S_(i,e){let t=We[e];if(t===void 0){const n=M_.get(e);if(n!==void 0)t=We[n],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return No(t)}const y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oc(i){return i.replace(y_,b_)}function b_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const E_={[_r]:"SHADOWMAP_TYPE_PCF",[ds]:"SHADOWMAP_TYPE_VSM"};function w_(i){return E_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const T_={[ai]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[Vr]:"ENVMAP_TYPE_CUBE_UV"};function A_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":T_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const R_={[qi]:"ENVMAP_MODE_REFRACTION"};function C_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":R_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const P_={[Eu]:"ENVMAP_BLENDING_MULTIPLY",[Wf]:"ENVMAP_BLENDING_MIX",[Xf]:"ENVMAP_BLENDING_ADD"};function L_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":P_[i.combine]||"ENVMAP_BLENDING_NONE"}function D_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function I_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=w_(t),c=A_(t),u=C_(t),f=L_(t),h=D_(t),p=g_(t),g=__(r),M=s.createProgram();let m,d,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),d.length>0&&(d+=`
`)):(m=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),d=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gn?"#define TONE_MAPPING":"",t.toneMapping!==gn?We.tonemapping_pars_fragment:"",t.toneMapping!==gn?p_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,f_("linearToOutputTexel",t.outputColorSpace),m_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ps).join(`
`)),a=No(a),a=Nc(a,t),a=Fc(a,t),o=No(o),o=Nc(o,t),o=Fc(o,t),a=Oc(a),o=Oc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const R=S+m+a,_=S+d+o,y=Dc(s,s.VERTEX_SHADER,R),E=Dc(s,s.FRAGMENT_SHADER,_);s.attachShader(M,y),s.attachShader(M,E),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(U){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(M)||"",I=s.getShaderInfoLog(y)||"",D=s.getShaderInfoLog(E)||"",N=C.trim(),J=I.trim(),Z=D.trim();let ie=!0,j=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,y,E);else{const ee=Uc(s,y,"vertex"),ne=Uc(s,E,"fragment");Je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+N+`
`+ee+`
`+ne)}else N!==""?Fe("WebGLProgram: Program Info Log:",N):(J===""||Z==="")&&(j=!1);j&&(U.diagnostics={runnable:ie,programLog:N,vertexShader:{log:J,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(y),s.deleteShader(E),v=new yr(s,M),w=v_(s,M)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(M,l_)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=c_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=y,this.fragmentShader=E,this}let U_=0;class N_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new F_(e),t.set(e,n)),n}}class F_{constructor(e){this.id=U_++,this.code=e,this.usedTimes=0}}function O_(i){return i===oi||i===Cr||i===Pr}function B_(i,e,t,n,s,r){const a=new al,o=new N_,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function M(v,w,L,U,C,I){const D=U.fog,N=C.geometry,J=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||J,Z),j=ie&&ie.mapping===Vr?ie.image.height:null,ee=p[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const ne=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Re=ne!==void 0?ne.length:0;let Te=0;N.morphAttributes.position!==void 0&&(Te=1),N.morphAttributes.normal!==void 0&&(Te=2),N.morphAttributes.color!==void 0&&(Te=3);let Ye,Be,ze,G;if(ee){const ft=hn[ee];Ye=ft.vertexShader,Be=ft.fragmentShader}else{Ye=v.vertexShader,Be=v.fragmentShader;const ft=o.getVertexShaderStage(v),nt=o.getFragmentShaderStage(v);o.update(v,ft,nt),ze=ft.id,G=nt.id}const K=i.getRenderTarget(),ae=i.state.buffers.depth.getReversed(),ge=C.isInstancedMesh===!0,ce=C.isBatchedMesh===!0,_e=!!v.map,et=!!v.matcap,Ue=!!ie,Ne=!!v.aoMap,Pe=!!v.lightMap,he=!!v.bumpMap&&v.wireframe===!1,Ie=!!v.normalMap,ht=!!v.displacementMap,tt=!!v.emissiveMap,Ge=!!v.metalnessMap,pt=!!v.roughnessMap,F=v.anisotropy>0,St=v.clearcoat>0,je=v.dispersion>0,P=v.retroreflectivity>0,x=v.iridescence>0,H=v.sheen>0,$=v.transmission>0,T=F&&!!v.anisotropyMap,V=St&&!!v.clearcoatMap,X=St&&!!v.clearcoatNormalMap,z=St&&!!v.clearcoatRoughnessMap,W=x&&!!v.iridescenceMap,se=x&&!!v.iridescenceThicknessMap,ue=H&&!!v.sheenColorMap,le=H&&!!v.sheenRoughnessMap,oe=!!v.specularMap,be=!!v.specularColorMap,De=!!v.specularIntensityMap,He=$&&!!v.transmissionMap,B=$&&!!v.thicknessMap,fe=!!v.gradientMap,te=!!v.alphaMap,de=v.alphaTest>0,xe=!!v.alphaHash,re=!!v.extensions;let Le=gn;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Le=i.toneMapping);const Ae={shaderID:ee,shaderType:v.type,shaderName:v.name,vertexShader:Ye,fragmentShader:Be,defines:v.defines,customVertexShaderID:ze,customFragmentShaderID:G,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:ce,batchingColor:ce&&C._colorsTexture!==null,instancing:ge,instancingColor:ge&&C.instanceColor!==null,instancingMorph:ge&&C.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:_e,matcap:et,envMap:Ue,envMapMode:Ue&&ie.mapping,envMapCubeUVHeight:j,aoMap:Ne,lightMap:Pe,bumpMap:he,normalMap:Ie,displacementMap:ht,emissiveMap:tt,normalMapObjectSpace:Ie&&v.normalMapType===$f,normalMapTangentSpace:Ie&&v.normalMapType===Bl,packedNormalMap:Ie&&v.normalMapType===Bl&&O_(v.normalMap.format),metalnessMap:Ge,roughnessMap:pt,anisotropy:F,anisotropyMap:T,clearcoat:St,clearcoatMap:V,clearcoatNormalMap:X,clearcoatRoughnessMap:z,dispersion:je,retroreflection:P,iridescence:x,iridescenceMap:W,iridescenceThicknessMap:se,sheen:H,sheenColorMap:ue,sheenRoughnessMap:le,specularMap:oe,specularColorMap:be,specularIntensityMap:De,transmission:$,transmissionMap:He,thicknessMap:B,gradientMap:fe,opaque:v.transparent===!1&&v.blending===zi&&v.alphaToCoverage===!1,alphaMap:te,alphaTest:de,alphaHash:xe,combine:v.combine,mapUv:_e&&g(v.map.channel),aoMapUv:Ne&&g(v.aoMap.channel),lightMapUv:Pe&&g(v.lightMap.channel),bumpMapUv:he&&g(v.bumpMap.channel),normalMapUv:Ie&&g(v.normalMap.channel),displacementMapUv:ht&&g(v.displacementMap.channel),emissiveMapUv:tt&&g(v.emissiveMap.channel),metalnessMapUv:Ge&&g(v.metalnessMap.channel),roughnessMapUv:pt&&g(v.roughnessMap.channel),anisotropyMapUv:T&&g(v.anisotropyMap.channel),clearcoatMapUv:V&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:X&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:le&&g(v.sheenRoughnessMap.channel),specularMapUv:oe&&g(v.specularMap.channel),specularColorMapUv:be&&g(v.specularColorMap.channel),specularIntensityMapUv:De&&g(v.specularIntensityMap.channel),transmissionMapUv:He&&g(v.transmissionMap.channel),thicknessMapUv:B&&g(v.thicknessMap.channel),alphaMapUv:te&&g(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Ie||F),vertexNormals:!!N.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!N.attributes.uv&&(_e||te),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||N.attributes.normal===void 0&&Ie===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ae,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Te,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Le,decodeVideoTexture:_e&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:tt&&v.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Kt,flipSided:v.side===zt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:re&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&v.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)w.push(L),w.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(d(w,v),S(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function d(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function S(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function R(v){const w=p[v.type];let L;if(w){const U=hn[w];L=tp.clone(U.uniforms)}else L=v.uniforms;return L}function _(v,w){let L=u.get(w);return L!==void 0?++L.usedTimes:(L=new I_(i,w,v,s),c.push(L),u.set(w,L)),L}function y(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:R,acquireProgram:_,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:A}}function k_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function z_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function kc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,M,m,d){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:m,group:d},i[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=g,S.materialVariant=a(h),S.groupOrder=M,S.renderOrder=h.renderOrder,S.z=m,S.group=d),e++,S}function l(h,p,g,M,m,d,S){S.reversedDepth===!0&&(m=-m);const R=o(h,p,g,M,m,d);g.transmission>0?n.push(R):g.transparent===!0?s.push(R):t.push(R)}function c(h,p,g,M,m,d){const S=o(h,p,g,M,m,d);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function u(h,p){t.length>1&&t.sort(h||z_),n.length>1&&n.sort(p||kc),s.length>1&&s.sort(p||kc)}function f(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function H_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new zc,i.set(n,[a])):s>=r.length?(a=new zc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function G_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new k,color:new Oe};break;case"SpotLight":t={position:new k,direction:new k,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function V_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let W_=0;function X_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function q_(i){const e=new G_,t=V_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);const s=new k,r=new rt,a=new rt;function o(c){let u=0,f=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let p=0,g=0,M=0,m=0,d=0,S=0,R=0,_=0,y=0,E=0,A=0,v=0,w=0,L=0;c.sort(X_);for(let C=0,I=c.length;C<I;C++){const D=c[C],N=D.color,J=D.intensity,Z=D.distance;let ie=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===oi?ie=D.shadow.map.texture:ie=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=N.r*J,f+=N.g*J,h+=N.b*J;else if(D.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(D.sh.coefficients[j],J);L++}else if(D.isSunLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[g]=ne,n.sunShadowMap[g]=ie;const Re=ee.getViewportCount();for(let Te=0;Te<Re;Te++)n.sunShadowMatrix[M+Te]=ee.getMatrix(Te),n.sunShadowCascade[M+Te]=ee._cascadeData[Te];M+=Re,g++}n.sun[p]=j,p++}else if(D.isDirectionalLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.directionalShadow[m]=ne,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=D.shadow.matrix,y++}n.directional[m]=j,m++}else if(D.isSpotLight){const j=e.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(N).multiplyScalar(J),j.distance=Z,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,n.spot[S]=j;const ee=D.shadow;if(D.map&&(n.spotLightMap[v]=D.map,v++,ee.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[S]=ee.matrix,D.castShadow){const ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.spotShadow[S]=ne,n.spotShadowMap[S]=ie,A++}S++}else if(D.isRectAreaLight){const j=e.get(D);j.color.copy(N).multiplyScalar(J),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),n.rectArea[R]=j,R++}else if(D.isPointLight){const j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),j.distance=D.distance,j.decay=D.decay,D.castShadow){const ee=D.shadow,ne=t.get(D);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,ne.shadowCameraNear=ee.camera.near,ne.shadowCameraFar=ee.camera.far,n.pointShadow[d]=ne,n.pointShadowMap[d]=ie,n.pointShadowMatrix[d]=D.shadow.matrix,E++}n.point[d]=j,d++}else if(D.isHemisphereLight){const j=e.get(D);j.skyColor.copy(D.color).multiplyScalar(J),j.groundColor.copy(D.groundColor).multiplyScalar(J),n.hemi[_]=j,_++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const U=n.hash;(U.sunLength!==p||U.directionalLength!==m||U.pointLength!==d||U.spotLength!==S||U.rectAreaLength!==R||U.hemiLength!==_||U.numSunShadows!==g||U.numDirectionalShadows!==y||U.numPointShadows!==E||U.numSpotShadows!==A||U.numSpotMaps!==v||U.numLightProbes!==L)&&(n.sun.length=p,n.directional.length=m,n.spot.length=S,n.rectArea.length=R,n.point.length=d,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=L,U.sunLength=p,U.directionalLength=m,U.pointLength=d,U.spotLength=S,U.rectAreaLength=R,U.hemiLength=_,U.numSunShadows=g,U.numDirectionalShadows=y,U.numPointShadows=E,U.numSpotShadows=A,U.numSpotMaps=v,U.numLightProbes=L,n.version=W_++)}function l(c,u){let f=0,h=0,p=0,g=0,M=0,m=0;const d=u.matrixWorldInverse;for(let S=0,R=c.length;S<R;S++){const _=c[S];if(_.isSunLight){const y=n.sun[f];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(d),f++}else if(_.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),h++}else if(_.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(_.isRectAreaLight){const y=n.rectArea[M];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(_.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),M++}else if(_.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(d),p++}else if(_.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function Hc(i){const e=new q_(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Y_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Hc(i),e.set(s,[o])):r>=a.length?(o=new Hc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const $_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,K_=`uniform sampler2D shadow_pass;
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
}`,Z_=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],J_=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Gc=new rt,cs=new k,Pa=new k;function Q_(i,e,t){let n=new ol;const s=new ye,r=new ye,a=new Ze,o=new rp,l=new ap,c={},u=t.maxTextureSize,f={[ri]:zt,[zt]:ri,[Kt]:Kt},h=new Et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:$_,fragmentShader:K_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Mt;g.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ct(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_r;let d=this.type;this.render=function(E,A,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===wf&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_r);const w=i.getRenderTarget(),L=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Cn),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const I=d!==this.type;I&&A.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(N=>N.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,N=E.length;D<N;D++){const J=E[D],Z=J.shadow;if(Z===void 0){Fe("WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const ie=Z.getFrameExtents();s.multiply(ie),r.copy(Z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,Z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,Z.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=j,Z.map===null||I===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===ds){if(J.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Wt(s.x,s.y,{format:oi,type:an,minFilter:st,magFilter:st,generateMipmaps:!1}),Z.map.texture.name=J.name+".shadowMap",Z.map.depthTexture=new $i(s.x,s.y,rn),Z.map.depthTexture.name=J.name+".shadowMapDepth",Z.map.depthTexture.format=Dn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=_t,Z.map.depthTexture.magFilter=_t}else J.isPointLight?(Z.map=new eh(s.x),Z.map.depthTexture=new jd(s.x,_n)):(Z.map=new Wt(s.x,s.y),Z.map.depthTexture=new $i(s.x,s.y,_n)),Z.map.depthTexture.name=J.name+".shadowMap",Z.map.depthTexture.format=Dn,this.type===_r?(Z.map.depthTexture.compareFunction=j?il:nl,Z.map.depthTexture.minFilter=st,Z.map.depthTexture.magFilter=st):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=_t,Z.map.depthTexture.magFilter=_t);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);const ee=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();J.isPointLight!==!0&&Z.updateMatrices(J,v);for(let ne=0;ne<ee;ne++){const Re=Z.getCamera(ne);if(J.isPointLight){const Te=Z.camera,Ye=Z.matrix,Be=J.distance||Te.far;Be!==Te.far&&(Te.far=Be,Te.updateProjectionMatrix()),cs.setFromMatrixPosition(J.matrixWorld),Te.position.copy(cs),Pa.copy(Te.position),Pa.add(Z_[ne]),Te.up.copy(J_[ne]),Te.lookAt(Pa),Te.updateMatrixWorld(),Ye.makeTranslation(-cs.x,-cs.y,-cs.z),Gc.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(Gc,Te.coordinateSystem,Te.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,ne),i.clear();else{ne===0&&(i.setRenderTarget(Z.map),i.clear());const Te=Z.getViewport(ne);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),C.viewport(a)}n=Z.getFrustum(ne),_(A,v,Re,J,this.type)}Z.isPointLightShadow!==!0&&this.type===ds&&S(Z,v),Z.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(w,L,U)};function S(E,A){const v=e.update(M);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Wt(s.x,s.y,{format:oi,type:an}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,v,h,M,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,v,p,M,null)}function R(E,A,v,w){let L=null;const U=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)L=U;else if(L=v.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const C=L.uuid,I=A.uuid;let D=c[C];D===void 0&&(D={},c[C]=D);let N=D[I];N===void 0&&(N=L.clone(),D[I]=N,A.addEventListener("dispose",y)),L=N}if(L.visible=A.visible,L.wireframe=A.wireframe,w===ds?L.side=A.shadowSide!==null?A.shadowSide:A.side:L.side=A.shadowSide!==null?A.shadowSide:f[A.side],L.alphaMap=A.alphaMap,L.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,L.map=A.map,L.clipShadows=A.clipShadows,L.clippingPlanes=A.clippingPlanes,L.clipIntersection=A.clipIntersection,L.displacementMap=A.displacementMap,L.displacementScale=A.displacementScale,L.displacementBias=A.displacementBias,L.wireframeLinewidth=A.wireframeLinewidth,L.linewidth=A.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const C=i.properties.get(L);C.light=v}return L}function _(E,A,v,w,L){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===ds)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const I=e.update(E),D=E.material;if(Array.isArray(D)){const N=I.groups;for(let J=0,Z=N.length;J<Z;J++){const ie=N[J],j=D[ie.materialIndex];if(j&&j.visible){const ee=R(E,j,w,L);E.onBeforeShadow(i,E,A,v,I,ee,ie),i.renderBufferDirect(v,null,I,ee,E,ie),E.onAfterShadow(i,E,A,v,I,ee,ie)}}}else if(D.visible){const N=R(E,D,w,L);E.onBeforeShadow(i,E,A,v,I,N,null),i.renderBufferDirect(v,null,I,N,E,null),E.onAfterShadow(i,E,A,v,I,N,null)}}const C=E.children;for(let I=0,D=C.length;I<D;I++)_(C[I],A,v,w,L)}function y(E){E.target.removeEventListener("dispose",y);for(const v in c){const w=c[v],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function j_(i,e){function t(){let B=!1;const fe=new Ze;let te=null;const de=new Ze(0,0,0,0);return{setMask:function(xe){te!==xe&&!B&&(i.colorMask(xe,xe,xe,xe),te=xe)},setLocked:function(xe){B=xe},setClear:function(xe,re,Le,Ae,ft){ft===!0&&(xe*=Ae,re*=Ae,Le*=Ae),fe.set(xe,re,Le,Ae),de.equals(fe)===!1&&(i.clearColor(xe,re,Le,Ae),de.copy(fe))},reset:function(){B=!1,te=null,de.set(-1,0,0,0)}}}function n(){let B=!1,fe=!1,te=null,de=null,xe=null;return{setReversed:function(re){if(fe!==re){const Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),fe=re;const Ae=xe;xe=null,this.setClear(Ae)}},getReversed:function(){return fe},setTest:function(re){re?K(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(re){te!==re&&!B&&(i.depthMask(re),te=re)},setFunc:function(re){if(fe&&(re=rd[re]),de!==re){switch(re){case qa:i.depthFunc(i.NEVER);break;case Ya:i.depthFunc(i.ALWAYS);break;case $a:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case Ka:i.depthFunc(i.EQUAL);break;case Za:i.depthFunc(i.GEQUAL);break;case Ja:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=re}},setLocked:function(re){B=re},setClear:function(re){xe!==re&&(xe=re,fe&&(re=1-re),i.clearDepth(re))},reset:function(){B=!1,te=null,de=null,xe=null,fe=!1}}}function s(){let B=!1,fe=null,te=null,de=null,xe=null,re=null,Le=null,Ae=null,ft=null;return{setTest:function(nt){B||(nt?K(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(nt){fe!==nt&&!B&&(i.stencilMask(nt),fe=nt)},setFunc:function(nt,Qt,on){(te!==nt||de!==Qt||xe!==on)&&(i.stencilFunc(nt,Qt,on),te=nt,de=Qt,xe=on)},setOp:function(nt,Qt,on){(re!==nt||Le!==Qt||Ae!==on)&&(i.stencilOp(nt,Qt,on),re=nt,Le=Qt,Ae=on)},setLocked:function(nt){B=nt},setClear:function(nt){ft!==nt&&(i.clearStencil(nt),ft=nt)},reset:function(){B=!1,fe=null,te=null,de=null,xe=null,re=null,Le=null,Ae=null,ft=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},p=new WeakMap,g=[],M=null,m=!1,d=null,S=null,R=null,_=null,y=null,E=null,A=null,v=new Oe(0,0,0),w=0,L=!1,U=null,C=null,I=null,D=null,N=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ie=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(j)[1]),Z=ie>=1):j.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Z=ie>=2);let ee=null,ne={};const Re=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),Ye=new Ze().fromArray(Re),Be=new Ze().fromArray(Te);function ze(B,fe,te,de){const xe=new Uint8Array(4),re=i.createTexture();i.bindTexture(B,re),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<te;Le++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(fe+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return re}const G={};G[i.TEXTURE_2D]=ze(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(Xi),he(!1),Ie(Nl),K(i.CULL_FACE),Ne(Cn);function K(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function ae(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function ge(B,fe){return h[B]!==fe?(i.bindFramebuffer(B,fe),h[B]=fe,B===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=fe),B===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function ce(B,fe){let te=g,de=!1;if(B){te=p.get(fe),te===void 0&&(te=[],p.set(fe,te));const xe=B.textures;if(te.length!==xe.length||te[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Le=xe.length;re<Le;re++)te[re]=i.COLOR_ATTACHMENT0+re;te.length=xe.length,de=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,de=!0);de&&i.drawBuffers(te)}function _e(B){return M!==B?(i.useProgram(B),M=B,!0):!1}const et={[Fi]:i.FUNC_ADD,[Af]:i.FUNC_SUBTRACT,[Rf]:i.FUNC_REVERSE_SUBTRACT};et[Cf]=i.MIN,et[Pf]=i.MAX;const Ue={[Lf]:i.ZERO,[Df]:i.ONE,[If]:i.SRC_COLOR,[yu]:i.SRC_ALPHA,[kf]:i.SRC_ALPHA_SATURATE,[Of]:i.DST_COLOR,[Nf]:i.DST_ALPHA,[Uf]:i.ONE_MINUS_SRC_COLOR,[bu]:i.ONE_MINUS_SRC_ALPHA,[Bf]:i.ONE_MINUS_DST_COLOR,[Ff]:i.ONE_MINUS_DST_ALPHA,[zf]:i.CONSTANT_COLOR,[Hf]:i.ONE_MINUS_CONSTANT_COLOR,[Gf]:i.CONSTANT_ALPHA,[Vf]:i.ONE_MINUS_CONSTANT_ALPHA};function Ne(B,fe,te,de,xe,re,Le,Ae,ft,nt){if(B===Cn){m===!0&&(ae(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),B!==Tf){if(B!==d||nt!==L){if((S!==Fi||y!==Fi)&&(i.blendEquation(i.FUNC_ADD),S=Fi,y=Fi),nt)switch(B){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFunc(i.ONE,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ol:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",B);break}else switch(B){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fl:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",B);break}R=null,_=null,E=null,A=null,v.set(0,0,0),w=0,d=B,L=nt}return}xe=xe||fe,re=re||te,Le=Le||de,(fe!==S||xe!==y)&&(i.blendEquationSeparate(et[fe],et[xe]),S=fe,y=xe),(te!==R||de!==_||re!==E||Le!==A)&&(i.blendFuncSeparate(Ue[te],Ue[de],Ue[re],Ue[Le]),R=te,_=de,E=re,A=Le),(Ae.equals(v)===!1||ft!==w)&&(i.blendColor(Ae.r,Ae.g,Ae.b,ft),v.copy(Ae),w=ft),d=B,L=!1}function Pe(B,fe){B.side===Kt?ae(i.CULL_FACE):K(i.CULL_FACE);let te=B.side===zt;fe&&(te=!te),he(te),B.blending===zi&&B.transparent===!1?Ne(Cn):Ne(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const de=B.stencilWrite;o.setTest(de),de&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),tt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function he(B){U!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),U=B)}function Ie(B){B!==bf?(K(i.CULL_FACE),B!==C&&(B===Nl?i.cullFace(i.BACK):B===Ef?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),C=B}function ht(B){B!==I&&(Z&&i.lineWidth(B),I=B)}function tt(B,fe,te){B?(K(i.POLYGON_OFFSET_FILL),(D!==fe||N!==te)&&(D=fe,N=te,a.getReversed()&&(fe=-fe),i.polygonOffset(fe,te))):ae(i.POLYGON_OFFSET_FILL)}function Ge(B){B?K(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function pt(B){B===void 0&&(B=i.TEXTURE0+J-1),ee!==B&&(i.activeTexture(B),ee=B)}function F(B,fe,te){te===void 0&&(ee===null?te=i.TEXTURE0+J-1:te=ee);let de=ne[te];de===void 0&&(de={type:void 0,texture:void 0},ne[te]=de),(de.type!==B||de.texture!==fe)&&(ee!==te&&(i.activeTexture(te),ee=te),i.bindTexture(B,fe||G[B]),de.type=B,de.texture=fe)}function St(){const B=ne[ee];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function je(){try{i.compressedTexImage2D(...arguments)}catch(B){Je("WebGLState:",B)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(B){Je("WebGLState:",B)}}function x(){try{i.texSubImage2D(...arguments)}catch(B){Je("WebGLState:",B)}}function H(){try{i.texSubImage3D(...arguments)}catch(B){Je("WebGLState:",B)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(B){Je("WebGLState:",B)}}function T(){try{i.compressedTexSubImage3D(...arguments)}catch(B){Je("WebGLState:",B)}}function V(){try{i.texStorage2D(...arguments)}catch(B){Je("WebGLState:",B)}}function X(){try{i.texStorage3D(...arguments)}catch(B){Je("WebGLState:",B)}}function z(){try{i.texImage2D(...arguments)}catch(B){Je("WebGLState:",B)}}function W(){try{i.texImage3D(...arguments)}catch(B){Je("WebGLState:",B)}}function se(B){return f[B]!==void 0?f[B]:i.getParameter(B)}function ue(B,fe){f[B]!==fe&&(i.pixelStorei(B,fe),f[B]=fe)}function le(B){Ye.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Ye.copy(B))}function oe(B){Be.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Be.copy(B))}function be(B,fe){let te=c.get(fe);te===void 0&&(te=new WeakMap,c.set(fe,te));let de=te.get(B);de===void 0&&(de=i.getUniformBlockIndex(fe,B.name),te.set(B,de))}function De(B,fe){const de=c.get(fe).get(B);l.get(fe)!==de&&(i.uniformBlockBinding(fe,de,B.__bindingPointIndex),l.set(fe,de))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},ee=null,ne={},h={},p=new WeakMap,g=[],M=null,m=!1,d=null,S=null,R=null,_=null,y=null,E=null,A=null,v=new Oe(0,0,0),w=0,L=!1,U=null,C=null,I=null,D=null,N=null,Ye.set(0,0,i.canvas.width,i.canvas.height),Be.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:ae,bindFramebuffer:ge,drawBuffers:ce,useProgram:_e,setBlending:Ne,setMaterial:Pe,setFlipSided:he,setCullFace:Ie,setLineWidth:ht,setPolygonOffset:tt,setScissorTest:Ge,activeTexture:pt,bindTexture:F,unbindTexture:St,compressedTexImage2D:je,compressedTexImage3D:P,texImage2D:z,texImage3D:W,pixelStorei:ue,getParameter:se,updateUBOMapping:be,uniformBlockBinding:De,texStorage2D:V,texStorage3D:X,texSubImage2D:x,texSubImage3D:H,compressedTexSubImage2D:$,compressedTexSubImage3D:T,scissor:le,viewport:oe,reset:He}}function ev(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,x){return g?new OffscreenCanvas(P,x):Dr("canvas")}function m(P,x,H){let $=1;const T=je(P);if((T.width>H||T.height>H)&&($=H/Math.max(T.width,T.height)),$<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const V=Math.floor($*T.width),X=Math.floor($*T.height);h===void 0&&(h=M(V,X));const z=x?M(V,X):h;return z.width=V,z.height=X,z.getContext("2d").drawImage(P,0,0,V,X),Fe("WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+V+"x"+X+")."),z}else return"data"in P&&Fe("WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),P;return P}function d(P){return P.generateMipmaps}function S(P){i.generateMipmap(P)}function R(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,x,H,$,T,V=!1){if(P!==null){if(i[P]!==void 0)return i[P];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let X;$&&(X=e.get("EXT_texture_norm16"),X||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=x;if(x===i.RED&&(H===i.FLOAT&&(z=i.R32F),H===i.HALF_FLOAT&&(z=i.R16F),H===i.UNSIGNED_BYTE&&(z=i.R8),H===i.UNSIGNED_SHORT&&X&&(z=X.R16_EXT),H===i.SHORT&&X&&(z=X.R16_SNORM_EXT)),x===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.R8UI),H===i.UNSIGNED_SHORT&&(z=i.R16UI),H===i.UNSIGNED_INT&&(z=i.R32UI),H===i.BYTE&&(z=i.R8I),H===i.SHORT&&(z=i.R16I),H===i.INT&&(z=i.R32I)),x===i.RG&&(H===i.FLOAT&&(z=i.RG32F),H===i.HALF_FLOAT&&(z=i.RG16F),H===i.UNSIGNED_BYTE&&(z=i.RG8),H===i.UNSIGNED_SHORT&&X&&(z=X.RG16_EXT),H===i.SHORT&&X&&(z=X.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RG8UI),H===i.UNSIGNED_SHORT&&(z=i.RG16UI),H===i.UNSIGNED_INT&&(z=i.RG32UI),H===i.BYTE&&(z=i.RG8I),H===i.SHORT&&(z=i.RG16I),H===i.INT&&(z=i.RG32I)),x===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(z=i.RGB16UI),H===i.UNSIGNED_INT&&(z=i.RGB32UI),H===i.BYTE&&(z=i.RGB8I),H===i.SHORT&&(z=i.RGB16I),H===i.INT&&(z=i.RGB32I)),x===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),H===i.UNSIGNED_INT&&(z=i.RGBA32UI),H===i.BYTE&&(z=i.RGBA8I),H===i.SHORT&&(z=i.RGBA16I),H===i.INT&&(z=i.RGBA32I)),x===i.RGB&&(H===i.UNSIGNED_SHORT&&X&&(z=X.RGB16_EXT),H===i.SHORT&&X&&(z=X.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(z=i.R11F_G11F_B10F)),x===i.RGBA){const W=V?Lr:Ke.getTransfer(T);H===i.FLOAT&&(z=i.RGBA32F),H===i.HALF_FLOAT&&(z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(z=W===at?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&X&&(z=X.RGBA16_EXT),H===i.SHORT&&X&&(z=X.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function y(P,x){let H;return P?x===null||x===_n||x===Yi?H=i.DEPTH24_STENCIL8:x===rn?H=i.DEPTH32F_STENCIL8:x===Ms&&(H=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_n||x===Yi?H=i.DEPTH_COMPONENT24:x===rn?H=i.DEPTH_COMPONENT32F:x===Ms&&(H=i.DEPTH_COMPONENT16),H}function E(P,x){return d(P)===!0||P.isFramebufferTexture&&P.minFilter!==_t&&P.minFilter!==st?Math.log2(Math.max(x.width,x.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?x.mipmaps.length:1}function A(P){const x=P.target;x.removeEventListener("dispose",A),w(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function v(P){const x=P.target;x.removeEventListener("dispose",v),U(x)}function w(P){const x=n.get(P);if(x.__webglInit===void 0)return;const H=P.source,$=p.get(H);if($){const T=$[x.__cacheKey];T.usedTimes--,T.usedTimes===0&&L(P),Object.keys($).length===0&&p.delete(H)}n.remove(P)}function L(P){const x=n.get(P);i.deleteTexture(x.__webglTexture);const H=P.source,$=p.get(H);delete $[x.__cacheKey],a.memory.textures--}function U(P){const x=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let T=0;T<x.__webglFramebuffer[$].length;T++)i.deleteFramebuffer(x.__webglFramebuffer[$][T]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const H=P.textures;for(let $=0,T=H.length;$<T;$++){const V=n.get(H[$]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(H[$])}n.remove(P)}let C=0;function I(){C=0}function D(){return C}function N(P){C=P}function J(){const P=C;return P>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),C+=1,P}function Z(P){const x=[];return x.push(P.wrapS),x.push(P.wrapT),x.push(P.wrapR||0),x.push(P.magFilter),x.push(P.minFilter),x.push(P.anisotropy),x.push(P.internalFormat),x.push(P.format),x.push(P.type),x.push(P.generateMipmaps),x.push(P.premultiplyAlpha),x.push(P.flipY),x.push(P.unpackAlignment),x.push(P.colorSpace),x.join()}function ie(P,x){const H=n.get(P);if(P.isVideoTexture&&F(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const $=P.image;if($===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(H,P,x);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+x)}function j(P,x){const H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ae(H,P,x);return}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+x)}function ee(P,x){const H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ae(H,P,x);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+x)}function ne(P,x){const H=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&H.__version!==P.version){ge(H,P,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+x)}const Re={[Rr]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[ja]:i.MIRRORED_REPEAT},Te={[_t]:i.NEAREST,[qf]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[st]:i.LINEAR,[ea]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},Ye={[Zf]:i.NEVER,[td]:i.ALWAYS,[Jf]:i.LESS,[nl]:i.LEQUAL,[Qf]:i.EQUAL,[il]:i.GEQUAL,[jf]:i.GREATER,[ed]:i.NOTEQUAL};function Be(P,x){if(x.type===rn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===st||x.magFilter===ea||x.magFilter===Is||x.magFilter===ii||x.minFilter===st||x.minFilter===ea||x.minFilter===Is||x.minFilter===ii)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Re[x.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Re[x.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Re[x.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Te[x.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Te[x.minFilter]),x.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===_t||x.minFilter!==Is&&x.minFilter!==ii||x.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ze(P,x){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,x.addEventListener("dispose",A));const $=x.source;let T=p.get($);T===void 0&&(T={},p.set($,T));const V=Z(x);if(V!==P.__cacheKey){T[V]===void 0&&(T[V]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),T[V].usedTimes++;const X=T[P.__cacheKey];X!==void 0&&(T[P.__cacheKey].usedTimes--,X.usedTimes===0&&L(x)),P.__cacheKey=V,P.__webglTexture=T[V].texture}return H}function G(P,x,H){return Math.floor(Math.floor(P/H)/x)}function K(P,x,H,$){const V=P.updateRanges;if(V.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,H,$,x.data);else{V.sort((ue,le)=>ue.start-le.start);let X=0;for(let ue=1;ue<V.length;ue++){const le=V[X],oe=V[ue],be=le.start+le.count,De=G(oe.start,x.width,4),He=G(le.start,x.width,4);oe.start<=be+1&&De===He&&G(oe.start+oe.count-1,x.width,4)===De?le.count=Math.max(le.count,oe.start+oe.count-le.start):(++X,V[X]=oe)}V.length=X+1;const z=t.getParameter(i.UNPACK_ROW_LENGTH),W=t.getParameter(i.UNPACK_SKIP_PIXELS),se=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ue=0,le=V.length;ue<le;ue++){const oe=V[ue],be=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),He=be%x.width,B=Math.floor(be/x.width),fe=De,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,He),t.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,He,B,fe,te,H,$,x.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,W),t.pixelStorei(i.UNPACK_SKIP_ROWS,se)}}function ae(P,x,H){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const T=ze(P,x),V=x.source;t.bindTexture($,P.__webglTexture,i.TEXTURE0+H);const X=n.get(V);if(V.version!==X.__version||T===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const te=Ke.getPrimaries(Ke.workingColorSpace),de=x.colorSpace===fn?null:Ke.getPrimaries(x.colorSpace),xe=x.colorSpace===fn||te===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let W=m(x.image,!1,s.maxTextureSize);W=St(x,W);const se=r.convert(x.format,x.colorSpace),ue=r.convert(x.type);let le=_(x.internalFormat,se,ue,x.normalized,x.colorSpace,x.isVideoTexture);Be($,x);let oe;const be=x.mipmaps,De=x.isVideoTexture!==!0,He=X.__version===void 0||T===!0,B=V.dataReady,fe=E(x,W);if(x.isDepthTexture)le=y(x.format===Vn,x.type),He&&(De?t.texStorage2D(i.TEXTURE_2D,1,le,W.width,W.height):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,se,ue,null));else if(x.isDataTexture)if(be.length>0){De&&He&&t.texStorage2D(i.TEXTURE_2D,fe,le,be[0].width,be[0].height);for(let te=0,de=be.length;te<de;te++)oe=be[te],De?B&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,se,ue,oe.data):t.texImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,se,ue,oe.data);x.generateMipmaps=!1}else De?(He&&t.texStorage2D(i.TEXTURE_2D,fe,le,W.width,W.height),B&&K(x,W,se,ue)):t.texImage2D(i.TEXTURE_2D,0,le,W.width,W.height,0,se,ue,W.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){De&&He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,le,be[0].width,be[0].height,W.depth);for(let te=0,de=be.length;te<de;te++)if(oe=be[te],x.format!==Jt)if(se!==null)if(De){if(B)if(x.layerUpdates.size>0){const xe=Mc(oe.width,oe.height,x.format,x.type);for(const re of x.layerUpdates){const Le=oe.data.subarray(re*xe/oe.data.BYTES_PER_ELEMENT,(re+1)*xe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,re,oe.width,oe.height,1,se,Le)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,W.depth,se,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,le,oe.width,oe.height,W.depth,0,oe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,oe.width,oe.height,W.depth,se,ue,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,le,oe.width,oe.height,W.depth,0,se,ue,oe.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{De&&He&&t.texStorage2D(i.TEXTURE_2D,fe,le,be[0].width,be[0].height);for(let te=0,de=be.length;te<de;te++)oe=be[te],x.format!==Jt?se!==null?De?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,se,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,oe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?B&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,oe.width,oe.height,se,ue,oe.data):t.texImage2D(i.TEXTURE_2D,te,le,oe.width,oe.height,0,se,ue,oe.data)}else if(x.isDataArrayTexture)if(De){if(He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,le,W.width,W.height,W.depth),B)if(x.layerUpdates.size>0){const te=Mc(W.width,W.height,x.format,x.type);for(const de of x.layerUpdates){const xe=W.data.subarray(de*te/W.data.BYTES_PER_ELEMENT,(de+1)*te/W.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,de,W.width,W.height,1,se,ue,xe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,se,ue,W.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,W.width,W.height,W.depth,0,se,ue,W.data);else if(x.isData3DTexture)De?(He&&t.texStorage3D(i.TEXTURE_3D,fe,le,W.width,W.height,W.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,se,ue,W.data)):t.texImage3D(i.TEXTURE_3D,0,le,W.width,W.height,W.depth,0,se,ue,W.data);else if(x.isFramebufferTexture){if(He)if(De)t.texStorage2D(i.TEXTURE_2D,fe,le,W.width,W.height);else{let te=W.width,de=W.height;for(let xe=0;xe<fe;xe++)t.texImage2D(i.TEXTURE_2D,xe,le,te,de,0,se,ue,null),te>>=1,de>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),W.parentNode!==te){te.appendChild(W),f.add(x),te.onpaint=de=>{const xe=de.changedElements;for(const re of f)xe.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,W);else{const xe=i.RGBA,re=i.RGBA,Le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,re,Le,W)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(De&&He){const te=je(be[0]);t.texStorage2D(i.TEXTURE_2D,fe,le,te.width,te.height)}for(let te=0,de=be.length;te<de;te++)oe=be[te],De?B&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,se,ue,oe):t.texImage2D(i.TEXTURE_2D,te,le,se,ue,oe);x.generateMipmaps=!1}else if(De){if(He){const te=je(W);t.texStorage2D(i.TEXTURE_2D,fe,le,te.width,te.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,ue,W)}else t.texImage2D(i.TEXTURE_2D,0,le,se,ue,W);d(x)&&S($),X.__version=V.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function ge(P,x,H){if(x.image.length!==6)return;const $=ze(P,x),T=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);const V=n.get(T);if(T.version!==V.__version||$===!0){t.activeTexture(i.TEXTURE0+H);const X=Ke.getPrimaries(Ke.workingColorSpace),z=x.colorSpace===fn?null:Ke.getPrimaries(x.colorSpace),W=x.colorSpace===fn||X===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);const se=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,le=[];for(let re=0;re<6;re++)!se&&!ue?le[re]=m(x.image[re],!0,s.maxCubemapSize):le[re]=ue?x.image[re].image:x.image[re],le[re]=St(x,le[re]);const oe=le[0],be=r.convert(x.format,x.colorSpace),De=r.convert(x.type),He=_(x.internalFormat,be,De,x.normalized,x.colorSpace),B=x.isVideoTexture!==!0,fe=V.__version===void 0||$===!0,te=T.dataReady;let de=E(x,oe);Be(i.TEXTURE_CUBE_MAP,x);let xe;if(se){B&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,de,He,oe.width,oe.height);for(let re=0;re<6;re++){xe=le[re].mipmaps;for(let Le=0;Le<xe.length;Le++){const Ae=xe[Le];x.format!==Jt?be!==null?B?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ae.width,Ae.height,be,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,He,Ae.width,Ae.height,0,Ae.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ae.width,Ae.height,be,De,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,He,Ae.width,Ae.height,0,be,De,Ae.data)}}}else{if(xe=x.mipmaps,B&&fe){xe.length>0&&de++;const re=je(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,de,He,re.width,re.height)}for(let re=0;re<6;re++)if(ue){B?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,le[re].width,le[re].height,be,De,le[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,He,le[re].width,le[re].height,0,be,De,le[re].data);for(let Le=0;Le<xe.length;Le++){const ft=xe[Le].image[re].image;B?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,ft.width,ft.height,be,De,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,He,ft.width,ft.height,0,be,De,ft.data)}}else{B?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,be,De,le[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,He,be,De,le[re]);for(let Le=0;Le<xe.length;Le++){const Ae=xe[Le];B?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,be,De,Ae.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,He,be,De,Ae.image[re])}}}d(x)&&S(i.TEXTURE_CUBE_MAP),V.__version=T.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function ce(P,x,H,$,T,V){const X=r.convert(H.format,H.colorSpace),z=r.convert(H.type),W=_(H.internalFormat,X,z,H.normalized,H.colorSpace),se=n.get(x),ue=n.get(H);if(ue.__renderTarget=x,!se.__hasExternalTextures){const le=Math.max(1,x.width>>V),oe=Math.max(1,x.height>>V);T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?t.texImage3D(T,V,W,le,oe,x.depth,0,X,z,null):t.texImage2D(T,V,W,le,oe,0,X,z,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),pt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,T,ue.__webglTexture,0,Ge(x)):(T===i.TEXTURE_2D||T>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,T,ue.__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(P,x,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),x.depthBuffer){const $=x.depthTexture,T=$&&$.isDepthTexture?$.type:null,V=y(x.stencilBuffer,T),X=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(x),V,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(x),V,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,V,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,P)}else{const $=x.textures;for(let T=0;T<$.length;T++){const V=$[T],X=r.convert(V.format,V.colorSpace),z=r.convert(V.type),W=_(V.internalFormat,X,z,V.normalized,V.colorSpace);pt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(x),W,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(x),W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function et(P,x,H){const $=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const T=n.get(x.depthTexture);if(T.__renderTarget=x,(!T.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$){if(T.__webglInit===void 0&&(T.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),T.__webglTexture===void 0){T.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture),Be(i.TEXTURE_CUBE_MAP,x.depthTexture);const se=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let le;x.depthTexture.format===Dn?le=i.DEPTH_COMPONENT24:x.depthTexture.format===Vn&&(le=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,le,x.width,x.height,0,se,ue,null)}}else ie(x.depthTexture,0);const V=T.__webglTexture,X=Ge(x),z=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,W=x.depthTexture.format===Vn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Dn)pt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,z,V,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,W,z,V,0);else if(x.depthTexture.format===Vn)pt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,z,V,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,W,z,V,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ue(P){const x=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==P.depthTexture){const $=P.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const T=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",T)};$.addEventListener("dispose",T),x.__depthDisposeCallback=T}x.__boundDepthTexture=$}if(P.depthTexture&&!x.__autoAllocateDepthBuffer)if(H)for(let $=0;$<6;$++)et(x.__webglFramebuffer[$],P,$);else{const $=P.texture.mipmaps;$&&$.length>0?et(x.__webglFramebuffer[0],P,0):et(x.__webglFramebuffer,P,0)}else if(H){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),_e(x.__webglDepthbuffer[$],P,!1);else{const T=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,V)}}else{const $=P.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),_e(x.__webglDepthbuffer,P,!1);else{const T=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,V)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(P,x,H){const $=n.get(P);x!==void 0&&ce($.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ue(P)}function Pe(P){const x=P.texture,H=n.get(P),$=n.get(x);P.addEventListener("dispose",v);const T=P.textures,V=P.isWebGLCubeRenderTarget===!0,X=T.length>1;if(X||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),V){H.__webglFramebuffer=[];for(let z=0;z<6;z++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[z]=[];for(let W=0;W<x.mipmaps.length;W++)H.__webglFramebuffer[z][W]=i.createFramebuffer()}else H.__webglFramebuffer[z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let z=0;z<x.mipmaps.length;z++)H.__webglFramebuffer[z]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(X)for(let z=0,W=T.length;z<W;z++){const se=n.get(T[z]);se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&pt(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let z=0;z<T.length;z++){const W=T[z];H.__webglColorRenderbuffer[z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[z]);const se=r.convert(W.format,W.colorSpace),ue=r.convert(W.type),le=_(W.internalFormat,se,ue,W.normalized,W.colorSpace,P.isXRRenderTarget===!0),oe=Ge(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,le,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,H.__webglColorRenderbuffer[z])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(V){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Be(i.TEXTURE_CUBE_MAP,x);for(let z=0;z<6;z++)if(x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)ce(H.__webglFramebuffer[z][W],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,W);else ce(H.__webglFramebuffer[z],P,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);d(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let z=0,W=T.length;z<W;z++){const se=T[z],ue=n.get(se);let le=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Be(le,se),ce(H.__webglFramebuffer,P,se,i.COLOR_ATTACHMENT0+z,le,0),d(se)&&S(le)}t.unbindTexture()}else{let z=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(z=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(z,$.__webglTexture),Be(z,x),x.mipmaps&&x.mipmaps.length>0)for(let W=0;W<x.mipmaps.length;W++)ce(H.__webglFramebuffer[W],P,x,i.COLOR_ATTACHMENT0,z,W);else ce(H.__webglFramebuffer,P,x,i.COLOR_ATTACHMENT0,z,0);d(x)&&S(z),t.unbindTexture()}P.depthBuffer&&Ue(P)}function he(P){const x=P.textures;for(let H=0,$=x.length;H<$;H++){const T=x[H];if(d(T)){const V=R(P),X=n.get(T).__webglTexture;t.bindTexture(V,X),S(V),t.unbindTexture()}}}const Ie=[],ht=[];function tt(P){if(P.samples>0){if(pt(P)===!1){const x=P.textures,H=P.width,$=P.height;let T=i.COLOR_BUFFER_BIT;const V=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=n.get(P),z=x.length>1;if(z)for(let se=0;se<x.length;se++)t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);const W=P.texture.mipmaps;W&&W.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let se=0;se<x.length;se++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(T|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(T|=i.STENCIL_BUFFER_BIT)),z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,X.__webglColorRenderbuffer[se]);const ue=n.get(x[se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ue,0)}i.blitFramebuffer(0,0,H,$,0,0,H,$,T,i.NEAREST),l===!0&&(Ie.length=0,ht.length=0,Ie.push(i.COLOR_ATTACHMENT0+se),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Ie.push(V),ht.push(V),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ht)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),z)for(let se=0;se<x.length;se++){t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,X.__webglColorRenderbuffer[se]);const ue=n.get(x[se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const x=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ge(P){return Math.min(s.maxSamples,P.samples)}function pt(P){const x=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function F(P){const x=a.render.frame;u.get(P)!==x&&(u.set(P,x),P.update())}function St(P,x){const H=P.colorSpace,$=P.format,T=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Ss&&H!==fn&&(Ke.getTransfer(H)===at?($!==Jt||T!==kt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",H)),x}function je(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=I,this.getTextureUnits=D,this.setTextureUnits=N,this.setTexture2D=ie,this.setTexture2DArray=j,this.setTexture3D=ee,this.setTextureCube=ne,this.rebindTextures=Ne,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tv(i,e){function t(n,s=fn){let r;const a=Ke.getTransfer(s);if(n===kt)return i.UNSIGNED_BYTE;if(n===Jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Iu)return i.BYTE;if(n===Uu)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===Zo)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===rn)return i.FLOAT;if(n===an)return i.HALF_FLOAT;if(n===Ou)return i.ALPHA;if(n===Bu)return i.RGB;if(n===Jt)return i.RGBA;if(n===Dn)return i.DEPTH_COMPONENT;if(n===Vn)return i.DEPTH_STENCIL;if(n===Ts)return i.RED;if(n===jo)return i.RED_INTEGER;if(n===oi)return i.RG;if(n===el)return i.RG_INTEGER;if(n===tl)return i.RGBA_INTEGER;if(n===vr||n===xr||n===Mr||n===Sr)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===eo||n===to||n===no||n===io)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===to)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===so||n===ro||n===ao||n===oo||n===lo||n===Cr||n===co)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===so||n===ro)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ao)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===oo)return r.COMPRESSED_R11_EAC;if(n===lo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Cr)return r.COMPRESSED_RG11_EAC;if(n===co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo||n===So||n===yo||n===bo||n===Eo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ho)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===po)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===go)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_o)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===So)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wo||n===To||n===Ao)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===wo)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ro||n===Co||n===Pr||n===Po)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ro)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Po)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const nv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iv=`
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

}`;class sv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Yu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Et({vertexShader:nv,fragmentShader:iv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rv extends ci{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const M=typeof XRWebGLBinding<"u",m=new sv,d={},S=t.getContextAttributes();let R=null,_=null;const y=[],E=[],A=new ye;let v=null,w=null;const L=new $t;L.viewport=new Ze;const U=new $t;U.viewport=new Ze;const C=[L,U],I=new fp;let D=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let K=y[G];return K===void 0&&(K=new oa,y[G]=K),K.getTargetRaySpace()},this.getControllerGrip=function(G){let K=y[G];return K===void 0&&(K=new oa,y[G]=K),K.getGripSpace()},this.getHand=function(G){let K=y[G];return K===void 0&&(K=new oa,y[G]=K),K.getHandSpace()};function J(G){const K=E.indexOf(G.inputSource);if(K===-1)return;const ae=y[K];ae!==void 0&&(ae.update(G.inputSource,G.frame,c||a),ae.dispatchEvent({type:G.type,data:G.inputSource}))}function Z(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",ie);for(let G=0;G<y.length;G++){const K=E[G];K!==null&&(E[G]=null,y[G].disconnect(K))}D=null,N=null,m.reset();for(const G in d)delete d[G];if(e.setRenderTarget(R),p=null,h=null,f=null,s=null,_=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),w!==null){const G=w.camera;G.fov=w.fov,G.zoom=w.zoom,G.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ge=null,ce=null;S.depth&&(ce=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=S.stencil?Vn:Dn,ge=S.stencil?Yi:_n);const _e={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(_e),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Wt(h.textureWidth,h.textureHeight,{format:Jt,type:kt,depthTexture:new $i(h.textureWidth,h.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const ae={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Wt(p.framebufferWidth,p.framebufferHeight,{format:Jt,type:kt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ze.setContext(s),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(G){for(let K=0;K<G.removed.length;K++){const ae=G.removed[K],ge=E.indexOf(ae);ge>=0&&(E[ge]=null,y[ge].disconnect(ae))}for(let K=0;K<G.added.length;K++){const ae=G.added[K];let ge=E.indexOf(ae);if(ge===-1){for(let _e=0;_e<y.length;_e++)if(_e>=E.length){E.push(ae),ge=_e;break}else if(E[_e]===null){E[_e]=ae,ge=_e;break}if(ge===-1)break}const ce=y[ge];ce&&ce.connect(ae)}}const j=new k,ee=new k;function ne(G,K,ae){j.setFromMatrixPosition(K.matrixWorld),ee.setFromMatrixPosition(ae.matrixWorld);const ge=j.distanceTo(ee),ce=K.projectionMatrix.elements,_e=ae.projectionMatrix.elements,et=ce[14]/(ce[10]-1),Ue=ce[14]/(ce[10]+1),Ne=(ce[9]+1)/ce[5],Pe=(ce[9]-1)/ce[5],he=(ce[8]-1)/ce[0],Ie=(_e[8]+1)/_e[0],ht=et*he,tt=et*Ie,Ge=ge/(-he+Ie),pt=Ge*-he;if(K.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(pt),G.translateZ(Ge),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ce[10]===-1)G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const F=et+Ge,St=Ue+Ge,je=ht-pt,P=tt+(ge-pt),x=Ne*Ue/St*F,H=Pe*Ue/St*F;G.projectionMatrix.makePerspective(je,P,x,H,F,St),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Re(G,K){K===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(K.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let K=G.near,ae=G.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),I.near=U.near=L.near=K,I.far=U.far=L.far=ae,(D!==I.near||N!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),D=I.near,N=I.far),I.layers.mask=G.layers.mask|6,L.layers.mask=I.layers.mask&-5,U.layers.mask=I.layers.mask&-3;const ge=G.parent,ce=I.cameras;Re(I,ge);for(let _e=0;_e<ce.length;_e++)Re(ce[_e],ge);ce.length===2?ne(I,L,U):I.projectionMatrix.copy(L.projectionMatrix),w===null&&G.isPerspectiveCamera&&(w={camera:G,fov:G.fov,zoom:G.zoom}),Te(G,I,ge)};function Te(G,K,ae){ae===null?G.matrix.copy(K.matrixWorld):(G.matrix.copy(ae.matrixWorld),G.matrix.invert(),G.matrix.multiply(K.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=bs*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(G){return d[G]};let Ye=null;function Be(G,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let ge=!1;ae.length!==I.cameras.length&&(I.cameras.length=0,ge=!0);for(let Ue=0;Ue<ae.length;Ue++){const Ne=ae[Ue];let Pe=null;if(p!==null)Pe=p.getViewport(Ne);else{const Ie=f.getViewSubImage(h,Ne);Pe=Ie.viewport,Ue===0&&(e.setRenderTargetTextures(_,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(_))}let he=C[Ue];he===void 0&&(he=new $t,he.layers.enable(Ue),he.viewport=new Ze,C[Ue]=he),he.matrix.fromArray(Ne.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(Ne.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),Ue===0&&(I.matrix.copy(he.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),ge===!0&&I.cameras.push(he)}const ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=n.getBinding();const Ue=f.getDepthInformation(ae[0]);Ue&&Ue.isValid&&Ue.texture&&m.init(Ue,s.renderState)}if(ce&&ce.includes("camera-access")&&M){e.state.unbindTexture(),f=n.getBinding();for(let Ue=0;Ue<ae.length;Ue++){const Ne=ae[Ue].camera;if(Ne){let Pe=d[Ne];Pe||(Pe=new Yu,d[Ne]=Pe);const he=f.getCameraImage(Ne);Pe.sourceTexture=he}}}}for(let ae=0;ae<y.length;ae++){const ge=E[ae],ce=y[ae];ge!==null&&ce!==void 0&&ce.update(ge,K,c||a)}Ye&&Ye(G,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ze=new Qu;ze.setAnimationLoop(Be),this.setAnimationLoop=function(G){Ye=G},this.dispose=function(){}}}const av=new rt,rh=new ke;rh.set(-1,0,0,0,1,0,0,0,1);function ov(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,$u(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,R,_){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,_)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),M(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,S,R):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===zt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===zt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=e.get(d),R=S.envMap,_=S.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(_)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(rh),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,R){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=R*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===zt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function M(m,d){const S=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lv(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const E=y.program;n.uniformBlockBinding(_,E)}function c(_,y){let E=s[_.id];E===void 0&&(m(_),E=u(_),s[_.id]=E,_.addEventListener("dispose",S));const A=y.program;n.updateUBOMapping(_,A);const v=e.render.frame;r[_.id]!==v&&(h(_),r[_.id]=v)}function u(_){const y=f();_.__bindingPointIndex=y;const E=i.createBuffer(),A=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const y=s[_.id],E=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let v=0,w=E.length;v<w;v++){const L=E[v];if(Array.isArray(L))for(let U=0,C=L.length;U<C;U++)p(L[U],v,U,A);else p(L,v,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,y,E,A){if(M(_,y,E,A)===!0){const v=_.__offset,w=_.value;if(Array.isArray(w)){let L=0;for(let U=0;U<w.length;U++){const C=w[U],I=d(C);g(C,_.__data,L),typeof C!="number"&&typeof C!="boolean"&&!C.isMatrix3&&!ArrayBuffer.isView(C)&&(L+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function g(_,y,E){typeof _=="number"||typeof _=="boolean"?y[0]=_:_.isMatrix3?(y[0]=_.elements[0],y[1]=_.elements[1],y[2]=_.elements[2],y[3]=0,y[4]=_.elements[3],y[5]=_.elements[4],y[6]=_.elements[5],y[7]=0,y[8]=_.elements[6],y[9]=_.elements[7],y[10]=_.elements[8],y[11]=0):ArrayBuffer.isView(_)?y.set(new _.constructor(_.buffer,_.byteOffset,y.length)):_.toArray(y,E)}function M(_,y,E,A){const v=_.value,w=y+"_"+E;if(A[w]===void 0)return typeof v=="number"||typeof v=="boolean"?A[w]=v:ArrayBuffer.isView(v)?A[w]=v.slice():A[w]=v.clone(),!0;{const L=A[w];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return A[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function m(_){const y=_.uniforms;let E=0;const A=16;for(let w=0,L=y.length;w<L;w++){const U=Array.isArray(y[w])?y[w]:[y[w]];for(let C=0,I=U.length;C<I;C++){const D=U[C],N=Array.isArray(D.value)?D.value:[D.value];for(let J=0,Z=N.length;J<Z;J++){const ie=N[J],j=d(ie),ee=E%A,ne=ee%j.boundary,Re=ee+ne;E+=ne,Re!==0&&A-Re<j.storage&&(E+=A-Re),D.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=j.storage}}}const v=E%A;return v>0&&(E+=A-v),_.__size=E,_.__cache={},this}function d(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(y.boundary=16,y.storage=_.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",_),y}function S(_){const y=_.target;y.removeEventListener("dispose",S);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function R(){for(const _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}const cv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let un=null;function uv(){return un===null&&(un=new di(cv,16,16,oi,an),un.name="DFG_LUT",un.minFilter=st,un.magFilter=st,un.wrapS=An,un.wrapT=An,un.generateMipmaps=!1,un.needsUpdate=!0),un}class hv{constructor(e={}){const{canvas:t=id(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=kt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const M=p,m=new Set([tl,el,jo]),d=new Set([kt,_n,Ms,Yi,Jo,Qo]),S=new Uint32Array(4),R=new Int32Array(4),_=new k;let y=null,E=null;const A=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let U=!1,C=null,I=null,D=null,N=null;this._outputColorSpace=Yt;let J=0,Z=0,ie=null,j=-1,ee=null;const ne=new Ze,Re=new Ze;let Te=null;const Ye=new Oe(0);let Be=0,ze=t.width,G=t.height,K=1,ae=null,ge=null;const ce=new Ze(0,0,ze,G),_e=new Ze(0,0,ze,G);let et=!1;const Ue=new ol;let Ne=!1,Pe=!1;const he=new rt,Ie=new k,ht=new Ze,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function pt(){return ie===null?K:1}let F=n;function St(b,O){return t.getContext(b,O)}let je,P,x,H,$,T,V,X,z,W,se,ue,le,oe,be,De,He,B,fe,te,de,xe,re;try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ko}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",nt,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),F===null){const O="webgl2";if(F=St(O,b),F===null)throw St(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(b){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Je("WebGLRenderer: "+b.message),b}function Le(){je=new ug(F),je.init(),de=new tv(F,je),P=new eg(F,je,e,de),x=new j_(F,je),P.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),I=F.createFramebuffer(),D=F.createFramebuffer(),N=F.createFramebuffer(),H=new dg(F),$=new k_,T=new ev(F,je,x,$,P,de,H),V=new cg(L),X=new mp(F),xe=new Q0(F,X),z=new hg(F,X,H,xe),W=new mg(F,z,X,xe,H),B=new pg(F,P,T),be=new tg($),se=new B_(L,V,je,P,xe,be),ue=new ov(L,$),le=new H_,oe=new Y_(je),He=new J0(L,V,x,W,g,l),De=new Q_(L,W,P),re=new lv(F,H,P,x),fe=new j0(F,je,H),te=new fg(F,je,H),H.programs=se.programs,L.capabilities=P,L.extensions=je,L.properties=$,L.renderLists=le,L.shadowMap=De,L.state=x,L.info=H}M!==kt&&(w=new _g(M,t.width,t.height,o,s,r));const Ae=new rv(L,F);this.xr=Ae,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=je.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=je.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(ze,G,!1))},this.getSize=function(b){return b.set(ze,G)},this.setSize=function(b,O,Q=!0){if(Ae.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ze=b,G=O,t.width=Math.floor(b*K),t.height=Math.floor(O*K),Q===!0&&(t.style.width=b+"px",t.style.height=O+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(ze*K,G*K).floor()},this.setDrawingBufferSize=function(b,O,Q){ze=b,G=O,K=Q,t.width=Math.floor(b*Q),t.height=Math.floor(O*Q),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(M===kt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(ce)},this.setViewport=function(b,O,Q,q){b.isVector4?ce.set(b.x,b.y,b.z,b.w):ce.set(b,O,Q,q),x.viewport(ne.copy(ce).multiplyScalar(K).round())},this.getScissor=function(b){return b.copy(_e)},this.setScissor=function(b,O,Q,q){b.isVector4?_e.set(b.x,b.y,b.z,b.w):_e.set(b,O,Q,q),x.scissor(Re.copy(_e).multiplyScalar(K).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(b){x.setScissorTest(et=b)},this.setOpaqueSort=function(b){ae=b},this.setTransparentSort=function(b){ge=b},this.getClearColor=function(b){return b.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,Q=!0){let q=0;if(b){let Y=!1;if(ie!==null){const ve=ie.texture.format;Y=m.has(ve)}if(Y){const ve=ie.texture.type,Se=d.has(ve),me=He.getClearColor(),Ee=He.getClearAlpha(),Ce=me.r,Ve=me.g,Xe=me.b;Se?(S[0]=Ce,S[1]=Ve,S[2]=Xe,S[3]=Ee,F.clearBufferuiv(F.COLOR,0,S)):(R[0]=Ce,R[1]=Ve,R[2]=Xe,R[3]=Ee,F.clearBufferiv(F.COLOR,0,R))}else q|=F.COLOR_BUFFER_BIT}O&&(q|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),C=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),He.dispose(),le.dispose(),oe.dispose(),$.dispose(),V.dispose(),W.dispose(),xe.dispose(),re.dispose(),se.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",xl),Ae.removeEventListener("sessionend",Ml),qn.stop()};function ft(b){b.preventDefault(),Ir("WebGLRenderer: Context Lost."),U=!0}function nt(){Ir("WebGLRenderer: Context Restored."),U=!1;const b=H.autoReset,O=De.enabled,Q=De.autoUpdate,q=De.needsUpdate,Y=De.type;Le(),H.autoReset=b,De.enabled=O,De.autoUpdate=Q,De.needsUpdate=q,De.type=Y}function Qt(b){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function on(b){const O=b.target;O.removeEventListener("dispose",on),Nh(O)}function Nh(b){Fh(b),$.remove(b)}function Fh(b){const O=$.get(b).programs;O!==void 0&&(O.forEach(function(Q){se.releaseProgram(Q)}),b.isShaderMaterial&&se.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,Q,q,Y,ve){O===null&&(O=tt);const Se=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,me=kh(b,O,Q,q,Y);x.setMaterial(q,Se);let Ee=Q.index,Ce=1;if(q.wireframe===!0){if(Ee=z.getWireframeAttribute(Q),Ee===void 0)return;Ce=2}const Ve=Q.drawRange,Xe=Q.attributes.position;let we=Ve.start*Ce,it=(Ve.start+Ve.count)*Ce;ve!==null&&(we=Math.max(we,ve.start*Ce),it=Math.min(it,(ve.start+ve.count)*Ce)),Ee!==null?(we=Math.max(we,0),it=Math.min(it,Ee.count)):Xe!=null&&(we=Math.max(we,0),it=Math.min(it,Xe.count));const yt=it-we;if(yt<0||yt===1/0)return;xe.setup(Y,q,me,Q,Ee);let mt,ut=fe;if(Ee!==null&&(mt=X.get(Ee),ut=te,ut.setIndex(mt)),Y.isMesh)q.wireframe===!0?(x.setLineWidth(q.wireframeLinewidth*pt()),ut.setMode(F.LINES)):ut.setMode(F.TRIANGLES);else if(Y.isLine){let Pt=q.linewidth;Pt===void 0&&(Pt=1),x.setLineWidth(Pt*pt()),Y.isLineSegments?ut.setMode(F.LINES):Y.isLineLoop?ut.setMode(F.LINE_LOOP):ut.setMode(F.LINE_STRIP)}else Y.isPoints?ut.setMode(F.POINTS):Y.isSprite&&ut.setMode(F.TRIANGLES);if(Y.isBatchedMesh)if(je.get("WEBGL_multi_draw"))ut.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Pt=Y._multiDrawStarts,Me=Y._multiDrawCounts,It=Y._multiDrawCount,Qe=Ee?X.get(Ee).bytesPerElement:1,Xt=$.get(q).currentProgram.getUniforms();for(let ln=0;ln<It;ln++)Xt.setValue(F,"_gl_DrawID",ln),ut.render(Pt[ln]/Qe,Me[ln])}else if(Y.isInstancedMesh)ut.renderInstances(we,yt,Y.count);else if(Q.isInstancedBufferGeometry){const Pt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Me=Math.min(Q.instanceCount,Pt);ut.renderInstances(we,yt,Me)}else ut.render(we,yt)};function vl(b,O,Q,q){C!==null&&b.isNodeMaterial&&C.setObject(q,b),Ne===!0&&be.setState(b,Q,!1),b.transparent===!0&&b.side===Kt&&b.forceSinglePass===!1?(b.side=zt,b.needsUpdate=!0,Ls(b,O,q),b.side=ri,b.needsUpdate=!0,Ls(b,O,q),b.side=Kt):Ls(b,O,q)}this.compile=function(b,O,Q=null){Q===null&&(Q=b),C!==null&&C.renderStart(b,O,Q),E=oe.get(Q),E.init(O),v.push(E),Q.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(E.pushLight(Y),Y.castShadow&&E.pushShadow(Y))}),b!==Q&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(E.pushLight(Y),Y.castShadow&&E.pushShadow(Y))}),E.setupLights(),C!==null&&C.updateLights(E.state.lightsArray),Pe=this.localClippingEnabled,Ne=be.init(this.clippingPlanes,Pe),Ne===!0&&be.setGlobalState(this.clippingPlanes,O),C!==null&&De.render(E.state.shadowsArray,Q,O);const q=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const ve=Y.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){const me=ve[Se];vl(me,Q,O,Y),q.add(me)}else vl(ve,Q,O,Y),q.add(ve)}),E=v.pop(),C!==null&&C.renderEnd(),q},this.compileAsync=function(b,O,Q=null){const q=this.compile(b,O,Q);return new Promise(Y=>{function ve(){if(q.forEach(function(Se){const Ee=$.get(Se).currentProgram;(Ee===void 0||Ee.isReady())&&q.delete(Se)}),q.size===0){Y(b);return}setTimeout(ve,10)}je.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let $r=null;function Oh(b){$r&&$r(b)}function xl(){qn.stop()}function Ml(){qn.start()}const qn=new Qu;qn.setAnimationLoop(Oh),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(b){$r=b,Ae.setAnimationLoop(b),b===null?qn.stop():qn.start()},Ae.addEventListener("sessionstart",xl),Ae.addEventListener("sessionend",Ml),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;C!==null&&C.renderStart(b,O);const Q=Ae.enabled===!0&&Ae.isPresenting===!0,q=w!==null&&(ie===null||Q)&&w.begin(L,ie);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(O),O=Ae.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,O,ie),E=oe.get(b,v.length),E.init(O),E.state.textureUnits=T.getTextureUnits(),v.push(E),he.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ue.setFromProjectionMatrix(he,mn,O.reversedDepth),Pe=this.localClippingEnabled,Ne=be.init(this.clippingPlanes,Pe),y=le.get(b,A.length),y.init(),A.push(y),Ae.enabled===!0&&Ae.isPresenting===!0){const Se=L.xr.getDepthSensingMesh();Se!==null&&Kr(Se,O,-1/0,L.sortObjects)}Kr(b,O,0,L.sortObjects),y.finish(),C!==null&&C.updateLights(E.state.lightsArray),L.sortObjects===!0&&y.sort(ae,ge),Ge=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,Ge&&He.addToRenderList(y,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ne===!0&&be.beginShadows();const Y=E.state.shadowsArray;if(De.render(Y,b,O),Ne===!0&&be.endShadows(),(q&&w.hasRenderPass())===!1){const Se=y.opaque,me=y.transmissive;if(E.setupLights(),O.isArrayCamera){const Ee=O.cameras;if(me.length>0)for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const Xe=Ee[Ce];yl(Se,me,b,Xe)}Ge&&He.render(b);for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const Xe=Ee[Ce];Sl(y,b,Xe,Xe.viewport)}}else me.length>0&&yl(Se,me,b,O),Ge&&He.render(b),Sl(y,b,O)}ie!==null&&Z===0&&(T.updateMultisampleRenderTarget(ie),T.updateRenderTargetMipmap(ie)),q&&w.end(L),b.isScene===!0&&b.onAfterRender(L,b,O),xe.resetDefaultState(),j=-1,ee=null,v.pop(),v.length>0?(E=v[v.length-1],T.setTextureUnits(E.state.textureUnits),Ne===!0&&be.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,C!==null&&C.renderEnd()};function Kr(b,O,Q,q){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)Q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Ue)){q&&ht.setFromMatrixPosition(b.matrixWorld).applyMatrix4(he);const Se=W.update(b),me=b.material;me.visible&&y.push(b,Se,me,Q,ht.z,null,O)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Ue))){const Se=W.update(b),me=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ht.copy(b.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),ht.copy(Se.boundingSphere.center)),ht.applyMatrix4(b.matrixWorld).applyMatrix4(he)),Array.isArray(me)){const Ee=Se.groups;for(let Ce=0,Ve=Ee.length;Ce<Ve;Ce++){const Xe=Ee[Ce],we=me[Xe.materialIndex];we&&we.visible&&y.push(b,Se,we,Q,ht.z,Xe,O)}}else me.visible&&y.push(b,Se,me,Q,ht.z,null,O)}}const ve=b.children;for(let Se=0,me=ve.length;Se<me;Se++)Kr(ve[Se],O,Q,q)}function Sl(b,O,Q,q){const{opaque:Y,transmissive:ve,transparent:Se}=b;E.setupLightsView(Q),Ne===!0&&be.setGlobalState(L.clippingPlanes,Q),q&&x.viewport(ne.copy(q)),Y.length>0&&Ps(Y,O,Q),ve.length>0&&Ps(ve,O,Q),Se.length>0&&Ps(Se,O,Q),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function yl(b,O,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[q.id]===void 0){const we=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[q.id]=new Wt(1,1,{generateMipmaps:!0,type:we?an:kt,minFilter:ii,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const ve=E.state.transmissionRenderTarget[q.id],Se=q.viewport||ne;ve.setSize(Se.z*L.transmissionResolutionScale,Se.w*L.transmissionResolutionScale);const me=L.getRenderTarget(),Ee=L.getActiveCubeFace(),Ce=L.getActiveMipmapLevel();L.setRenderTarget(ve),L.getClearColor(Ye),Be=L.getClearAlpha(),Be<1&&L.setClearColor(16777215,.5),L.clear(),Ge&&He.render(Q);const Ve=L.toneMapping;L.toneMapping=gn;const Xe=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),E.setupLightsView(q),Ne===!0&&be.setGlobalState(L.clippingPlanes,q),Ps(b,Q,q),T.updateMultisampleRenderTarget(ve),T.updateRenderTargetMipmap(ve),je.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let it=0,yt=O.length;it<yt;it++){const mt=O[it],{object:ut,geometry:Pt,material:Me,group:It}=mt;if(Me.side===Kt&&ut.layers.test(q.layers)){const Qe=Me.side;Me.side=zt,Me.needsUpdate=!0,bl(ut,Q,q,Pt,Me,It),Me.side=Qe,Me.needsUpdate=!0,we=!0}}we===!0&&(T.updateMultisampleRenderTarget(ve),T.updateRenderTargetMipmap(ve))}L.setRenderTarget(me,Ee,Ce),L.setClearColor(Ye,Be),Xe!==void 0&&(q.viewport=Xe),L.toneMapping=Ve}function Ps(b,O,Q){const q=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,ve=b.length;Y<ve;Y++){const Se=b[Y],{object:me,geometry:Ee,group:Ce}=Se;let Ve=Se.material;Ve.allowOverride===!0&&q!==null&&(Ve=q),me.layers.test(Q.layers)&&bl(me,O,Q,Ee,Ve,Ce)}}function bl(b,O,Q,q,Y,ve){C!==null&&Y.isNodeMaterial&&C.setObject(b,Y),b.onBeforeRender(L,O,Q,q,Y,ve),b.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(L,O,Q,q,b,ve),Y.transparent===!0&&Y.side===Kt&&Y.forceSinglePass===!1?(Y.side=zt,Y.needsUpdate=!0,L.renderBufferDirect(Q,O,q,Y,b,ve),Y.side=ri,Y.needsUpdate=!0,L.renderBufferDirect(Q,O,q,Y,b,ve),Y.side=Kt):L.renderBufferDirect(Q,O,q,Y,b,ve),b.onAfterRender(L,O,Q,q,Y,ve)}function Ls(b,O,Q){O.isScene!==!0&&(O=tt);const q=$.get(b),Y=E.state.lights,ve=E.state.shadowsArray,Se=Y.state.version,me=se.getParameters(b,Y.state,ve,O,Q,E.state.lightProbeGridArray),Ee=se.getProgramCacheKey(me);let Ce=q.programs;q.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,q.fog=O.fog;const Ve=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;q.envMap=V.get(b.envMap||q.environment,Ve),q.envMapRotation=q.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",on),Ce=new Map,q.programs=Ce);let Xe=Ce.get(Ee);if(Xe!==void 0){if(q.currentProgram===Xe&&q.lightsStateVersion===Se)return wl(b,me),Xe}else me.uniforms=se.getUniforms(b),C!==null&&b.isNodeMaterial&&C.build(b,Q,me),b.onBeforeCompile(me,L),Xe=se.acquireProgram(me,Ee),Ce.set(Ee,Xe),q.uniforms=me.uniforms;const we=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(we.clippingPlanes=be.uniform),wl(b,me),q.needsLights=Hh(b),q.lightsStateVersion=Se,q.needsLights&&(we.ambientLightColor.value=Y.state.ambient,we.lightProbe.value=Y.state.probe,we.sunLights.value=Y.state.sun,we.sunLightShadows.value=Y.state.sunShadow,we.directionalLights.value=Y.state.directional,we.directionalLightShadows.value=Y.state.directionalShadow,we.spotLights.value=Y.state.spot,we.spotLightShadows.value=Y.state.spotShadow,we.rectAreaLights.value=Y.state.rectArea,we.ltc_1.value=Y.state.rectAreaLTC1,we.ltc_2.value=Y.state.rectAreaLTC2,we.pointLights.value=Y.state.point,we.pointLightShadows.value=Y.state.pointShadow,we.hemisphereLights.value=Y.state.hemi,we.sunShadowMatrix.value=Y.state.sunShadowMatrix,we.sunShadowCascade.value=Y.state.sunShadowCascade,we.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,we.spotLightMatrix.value=Y.state.spotLightMatrix,we.spotLightMap.value=Y.state.spotLightMap,we.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=E.state.lightProbeGridArray.length>0,q.currentProgram=Xe,q.uniformsList=null,Xe}function El(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=yr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function wl(b,O){const Q=$.get(b);Q.outputColorSpace=O.outputColorSpace,Q.batching=O.batching,Q.batchingColor=O.batchingColor,Q.instancing=O.instancing,Q.instancingColor=O.instancingColor,Q.instancingMorph=O.instancingMorph,Q.skinning=O.skinning,Q.morphTargets=O.morphTargets,Q.morphNormals=O.morphNormals,Q.morphColors=O.morphColors,Q.morphTargetsCount=O.morphTargetsCount,Q.numClippingPlanes=O.numClippingPlanes,Q.numIntersection=O.numClipIntersection,Q.vertexAlphas=O.vertexAlphas,Q.vertexTangents=O.vertexTangents,Q.toneMapping=O.toneMapping}function Bh(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;_.setFromMatrixPosition(O.matrixWorld);for(let Q=0,q=b.length;Q<q;Q++){const Y=b[Q];if(Y.texture!==null&&Y.boundingBox.containsPoint(_))return Y}return null}function kh(b,O,Q,q,Y){O.isScene!==!0&&(O=tt),T.resetTextureUnits();const ve=O.fog,Se=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?O.environment:null,me=ie===null?L.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ke.workingColorSpace,Ee=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Ce=V.get(q.envMap||Se,Ee),Ve=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Xe=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),we=!!Q.morphAttributes.position,it=!!Q.morphAttributes.normal,yt=!!Q.morphAttributes.color;let mt=gn;q.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(mt=L.toneMapping);const ut=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Pt=ut!==void 0?ut.length:0,Me=$.get(q),It=E.state.lights;if(Ne===!0&&(Pe===!0||b!==ee)){const dt=b===ee&&q.id===j;be.setState(q,b,dt)}let Qe=!1;q.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==It.state.version||Me.outputColorSpace!==me||Y.isBatchedMesh&&Me.batching===!1||!Y.isBatchedMesh&&Me.batching===!0||Y.isBatchedMesh&&Me.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Me.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Me.instancing===!1||!Y.isInstancedMesh&&Me.instancing===!0||Y.isSkinnedMesh&&Me.skinning===!1||!Y.isSkinnedMesh&&Me.skinning===!0||Y.isInstancedMesh&&Me.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Me.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Me.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Me.instancingMorph===!1&&Y.morphTexture!==null||Me.envMap!==Ce||q.fog===!0&&Me.fog!==ve||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==be.numPlanes||Me.numIntersection!==be.numIntersection)||Me.vertexAlphas!==Ve||Me.vertexTangents!==Xe||Me.morphTargets!==we||Me.morphNormals!==it||Me.morphColors!==yt||Me.toneMapping!==mt||Me.morphTargetsCount!==Pt||!!Me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Me.__version=q.version);let Xt=Me.currentProgram;Qe===!0&&(Xt=Ls(q,O,Y),C&&q.isNodeMaterial&&C.onUpdateProgram(q,Xt,Me));let ln=!1,Un=!1,pi=!1;const lt=Xt.getUniforms(),xt=Me.uniforms;if(x.useProgram(Xt.program)&&(ln=!0,Un=!0,pi=!0),q.id!==j&&(j=q.id,Un=!0),Me.needsLights){const dt=Bh(E.state.lightProbeGridArray,Y);Me.lightProbeGrid!==dt&&(Me.lightProbeGrid=dt,Un=!0)}if(ln||ee!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),lt.setValue(F,"projectionMatrix",b.projectionMatrix),lt.setValue(F,"viewMatrix",b.matrixWorldInverse);const Fn=lt.map.cameraPosition;Fn!==void 0&&Fn.setValue(F,Ie.setFromMatrixPosition(b.matrixWorld)),P.logarithmicDepthBuffer&&lt.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&lt.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),ee!==b&&(ee=b,Un=!0,pi=!0)}if(Me.needsLights&&(It.state.sunShadowMap.length>0&&lt.setValue(F,"sunShadowMap",It.state.sunShadowMap,T),It.state.directionalShadowMap.length>0&&lt.setValue(F,"directionalShadowMap",It.state.directionalShadowMap,T),It.state.spotShadowMap.length>0&&lt.setValue(F,"spotShadowMap",It.state.spotShadowMap,T),It.state.pointShadowMap.length>0&&lt.setValue(F,"pointShadowMap",It.state.pointShadowMap,T)),Y.isSkinnedMesh){lt.setOptional(F,Y,"bindMatrix"),lt.setOptional(F,Y,"bindMatrixInverse");const dt=Y.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),lt.setValue(F,"boneTexture",dt.boneTexture,T))}Y.isBatchedMesh&&(lt.setOptional(F,Y,"batchingTexture"),lt.setValue(F,"batchingTexture",Y._matricesTexture,T),lt.setOptional(F,Y,"batchingIdTexture"),lt.setValue(F,"batchingIdTexture",Y._indirectTexture,T),lt.setOptional(F,Y,"batchingColorTexture"),Y._colorsTexture!==null&&lt.setValue(F,"batchingColorTexture",Y._colorsTexture,T));const Nn=Q.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&B.update(Y,Q,Xt),(Un||Me.receiveShadow!==Y.receiveShadow)&&(Me.receiveShadow=Y.receiveShadow,lt.setValue(F,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&O.environment!==null&&(xt.envMapIntensity.value=O.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=uv()),Un){if(lt.setValue(F,"toneMappingExposure",L.toneMappingExposure),Me.needsLights&&zh(xt,pi),ve&&q.fog===!0&&ue.refreshFogUniforms(xt,ve),ue.refreshMaterialUniforms(xt,q,K,G,E.state.transmissionRenderTarget[b.id]),Me.needsLights&&Me.lightProbeGrid){const dt=Me.lightProbeGrid;xt.probesSH.value=dt.texture,xt.probesMin.value.copy(dt.boundingBox.min),xt.probesMax.value.copy(dt.boundingBox.max),xt.probesResolution.value.copy(dt.resolution)}yr.upload(F,El(Me),xt,T)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(yr.upload(F,El(Me),xt,T),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&lt.setValue(F,"center",Y.center),lt.setValue(F,"modelViewMatrix",Y.modelViewMatrix),lt.setValue(F,"normalMatrix",Y.normalMatrix),lt.setValue(F,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const dt=q.uniformsGroups;for(let Fn=0,mi=dt.length;Fn<mi;Fn++){const Al=dt[Fn];re.update(Al,Xt),re.bind(Al,Xt)}}return Xt}function zh(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.sunLights.needsUpdate=O,b.sunLightShadows.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Hh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(b,O,Q){const q=$.get(b);q.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),$.get(b.texture).__webglTexture=O,$.get(b.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Q,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const Q=$.get(b);Q.__webglFramebuffer=O,Q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,Q=0){ie=b,J=O,Z=Q;let q=null,Y=!1,ve=!1;if(b){const me=$.get(b);if(me.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(F.FRAMEBUFFER,me.__webglFramebuffer),ne.copy(b.viewport),Re.copy(b.scissor),Te=b.scissorTest,x.viewport(ne),x.scissor(Re),x.setScissorTest(Te),j=-1;return}else if(me.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(me.__hasExternalTextures)T.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ve=b.depthTexture;if(me.__boundDepthTexture!==Ve){if(Ve!==null&&$.has(Ve)&&(b.width!==Ve.image.width||b.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const Ee=b.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ve=!0);const Ce=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[O])?q=Ce[O][Q]:q=Ce[O],Y=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?q=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?q=Ce[Q]:q=Ce,ne.copy(b.viewport),Re.copy(b.scissor),Te=b.scissorTest}else ne.copy(ce).multiplyScalar(K).floor(),Re.copy(_e).multiplyScalar(K).floor(),Te=et;if(Q!==0&&(q=I),x.bindFramebuffer(F.FRAMEBUFFER,q)&&x.drawBuffers(b,q),x.viewport(ne),x.scissor(Re),x.setScissorTest(Te),Y){const me=$.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,me.__webglTexture,Q)}else if(ve){const me=O;for(let Ee=0;Ee<b.textures.length;Ee++){const Ce=$.get(b.textures[Ee]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ee,Ce.__webglTexture,Q,me)}}else if(b!==null&&Q!==0){const me=$.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,me.__webglTexture,Q)}j=-1};function Tl(b){const O=$.get(b);return(O.__readFormat!==b.format||O.__readType!==b.type)&&(O.__readFormat=b.format,O.__readType=b.type,O.__formatReadable=P.textureFormatReadable(b.format),O.__typeReadable=P.textureTypeReadable(b.type)),O}this.readRenderTargetPixels=function(b,O,Q,q,Y,ve,Se,me=0){if(!(b&&b.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee){x.bindFramebuffer(F.FRAMEBUFFER,Ee);try{const Ce=b.textures[me],Ve=Ce.format,Xe=Ce.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);const we=Tl(Ce);if(we.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-q&&Q>=0&&Q<=b.height-Y&&F.readPixels(O,Q,q,Y,de.convert(Ve),de.convert(Xe),ve)}finally{const Ce=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(b,O,Q,q,Y,ve,Se,me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(Ee=Ee[Se]),Ee)if(O>=0&&O<=b.width-q&&Q>=0&&Q<=b.height-Y){x.bindFramebuffer(F.FRAMEBUFFER,Ee);const Ce=b.textures[me],Ve=Ce.format,Xe=Ce.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+me);const we=Tl(Ce);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.bufferData(F.PIXEL_PACK_BUFFER,ve.byteLength,F.STREAM_READ),F.readPixels(O,Q,q,Y,de.convert(Ve),de.convert(Xe),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const yt=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,yt);const mt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await sd(F,mt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,it),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ve),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(it),F.deleteSync(mt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,Q=0){const q=Math.pow(2,-Q),Y=Math.floor(b.image.width*q),ve=Math.floor(b.image.height*q),Se=O!==null?O.x:0,me=O!==null?O.y:0;T.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,Se,me,Y,ve),x.unbindTexture()},this.copyTextureToTexture=function(b,O,Q=null,q=null,Y=0,ve=0){let Se,me,Ee,Ce,Ve,Xe,we,it,yt;const mt=b.isCompressedTexture?b.mipmaps[ve]:b.image;if(Q!==null)Se=Q.max.x-Q.min.x,me=Q.max.y-Q.min.y,Ee=Q.isBox3?Q.max.z-Q.min.z:1,Ce=Q.min.x,Ve=Q.min.y,Xe=Q.isBox3?Q.min.z:0;else{const xt=Math.pow(2,-Y);Se=Math.floor(mt.width*xt),me=Math.floor(mt.height*xt),b.isDataArrayTexture?Ee=mt.depth:b.isData3DTexture?Ee=Math.floor(mt.depth*xt):Ee=1,Ce=0,Ve=0,Xe=0}q!==null?(we=q.x,it=q.y,yt=q.z):(we=0,it=0,yt=0);const ut=de.convert(O.format),Pt=de.convert(O.type);let Me;O.isData3DTexture?(T.setTexture3D(O,0),Me=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),Me=F.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),Me=F.TEXTURE_2D),x.activeTexture(F.TEXTURE0),x.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),x.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),x.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const It=x.getParameter(F.UNPACK_ROW_LENGTH),Qe=x.getParameter(F.UNPACK_IMAGE_HEIGHT),Xt=x.getParameter(F.UNPACK_SKIP_PIXELS),ln=x.getParameter(F.UNPACK_SKIP_ROWS),Un=x.getParameter(F.UNPACK_SKIP_IMAGES);x.pixelStorei(F.UNPACK_ROW_LENGTH,mt.width),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,mt.height),x.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),x.pixelStorei(F.UNPACK_SKIP_ROWS,Ve),x.pixelStorei(F.UNPACK_SKIP_IMAGES,Xe);const pi=b.isDataArrayTexture||b.isData3DTexture,lt=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const xt=$.get(b),Nn=$.get(O),dt=$.get(xt.__renderTarget),Fn=$.get(Nn.__renderTarget);x.bindFramebuffer(F.READ_FRAMEBUFFER,dt.__webglFramebuffer),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let mi=0;mi<Ee;mi++)pi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(b).__webglTexture,Y,Xe+mi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,$.get(O).__webglTexture,ve,yt+mi)),F.blitFramebuffer(Ce,Ve,Se,me,we,it,Se,me,F.DEPTH_BUFFER_BIT,F.NEAREST);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||$.has(b)){const xt=$.get(b),Nn=$.get(O);x.bindFramebuffer(F.READ_FRAMEBUFFER,D),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,N);for(let dt=0;dt<Ee;dt++)pi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,xt.__webglTexture,Y,Xe+dt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xt.__webglTexture,Y),lt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Nn.__webglTexture,ve,yt+dt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Nn.__webglTexture,ve),Y!==0?F.blitFramebuffer(Ce,Ve,Se,me,we,it,Se,me,F.COLOR_BUFFER_BIT,F.NEAREST):lt?F.copyTexSubImage3D(Me,ve,we,it,yt+dt,Ce,Ve,Se,me):F.copyTexSubImage2D(Me,ve,we,it,Ce,Ve,Se,me);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else lt?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Me,ve,we,it,yt,Se,me,Ee,ut,Pt,mt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(Me,ve,we,it,yt,Se,me,Ee,ut,mt.data):F.texSubImage3D(Me,ve,we,it,yt,Se,me,Ee,ut,Pt,mt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ve,we,it,Se,me,ut,Pt,mt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ve,we,it,mt.width,mt.height,ut,mt.data):F.texSubImage2D(F.TEXTURE_2D,ve,we,it,Se,me,ut,Pt,mt);x.pixelStorei(F.UNPACK_ROW_LENGTH,It),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Qe),x.pixelStorei(F.UNPACK_SKIP_PIXELS,Xt),x.pixelStorei(F.UNPACK_SKIP_ROWS,ln),x.pixelStorei(F.UNPACK_SKIP_IMAGES,Un),ve===0&&O.generateMipmaps&&F.generateMipmap(Me),x.unbindTexture()},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){J=0,Z=0,ie=null,x.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function fv(i,e,t,n,s){i.wall=s??i.wall+e,!i.dueNotified&&i.wall>=n&&(i.dueNotified=!0,i.landingDue?.());const r=i.slow,a=i.t>=t&&!!i.hold?.(),o=!!r&&a&&i.wall<r.cap;r&&(i.rate+=((o?r.rate*Math.min(1,n-i.t):1)-i.rate)*(1-Math.exp(-e/Math.max(.01,r.ease)))),i.held=a,i.t=Math.min(n,i.t+e*i.rate)}const cr={land:[34,58,56],land2:[46,76,68],sand:[222,202,146],coast:[24,30,52]},ah=(i,e)=>{const t=i.length,n=(e+Math.PI)/(Math.PI*2)*t,s=Math.floor(n),r=n-s;return i[(s%t+t)%t]*(1-r)+i[((s+1)%t+t)%t]*r};function KM(i,e,{n:t=30,sigil:n=mu(i),colour:s=gu(n),sigilShare:r=.45,minScale:a=.62}={}){const o=Math.max(...e),l=Math.max(a,Math.min(1,o))/o,c=(t/2-1.5)*l,u=t/2,f=(_,y)=>{const E=_+.5-u,A=y+.5-u;return Math.hypot(E,A)<=c*ah(e,Math.atan2(A,E))},h=new Uint8ClampedArray(t*t*4),p=(_,y)=>{h[_*4]=y[0],h[_*4+1]=y[1],h[_*4+2]=y[2],h[_*4+3]=255},g=new Uint8Array(t*t);for(let _=0;_<t;_++)for(let y=0;y<t;y++)g[_*t+y]=f(y,_)?1:0;const M=(_,y)=>_>=0&&y>=0&&_<t&&y<t&&g[y*t+_]===1,m=(_,y)=>!M(_-1,y)||!M(_+1,y)||!M(_,y-1)||!M(_,y+1);for(let _=0;_<t;_++)for(let y=0;y<t;y++){const E=_*t+y;M(y,_)?p(E,m(y,_)?cr.sand:Math.hypot(y+.5-u,_+.5-u)<c*.55?cr.land:cr.land2):(M(y-1,_)||M(y+1,_)||M(y,_-1)||M(y,_+1))&&p(E,cr.coast)}const d=Math.max(11,Math.round(t*r*Math.min(1,l*Math.max(...e)+.2))),S=Math.round((t-d)/2),R=pu(n,d);for(let _=0;_<d;_++)for(let y=0;y<d;y++)R[_*d+y]<1/0&&g[(_+S)*t+y+S]&&p((_+S)*t+y+S,s);return{w:t,h:t,rgba:h}}function dv(i,{steps:e=i.length}={}){const t=[],n=.48/Math.max(1,...i);for(let s=0;s<e;s++){const r=-Math.PI+s/e*Math.PI*2,a=n*ah(i,r);t.push([.5+a*Math.cos(r),.5+a*Math.sin(r)])}return t}function pv(i,e,t,n,s,r=16){const a=i(e,t,n);let o=a.y;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,u=i(e+Math.cos(c)*s,t,n+Math.sin(c)*s);u.y<o&&(o=u.y)}return{x:a.x,y:o}}function mv(i,e,t){const n=i+(e-i)*Math.min(1,Math.max(0,t)*8);return Math.abs(n-e)<.01?e:n}const gv=i=>i>=128?2:i>=64?1:0,Wn=.055,_v=Gr*1.55,vv=Gr*.42;function xv(i,e,t,n){const s=n[0]-t[0],r=n[1]-t[1],a=s*s+r*r,o=a?Math.max(0,Math.min(1,((i-t[0])*s+(e-t[1])*r)/a)):0;return Math.hypot(i-t[0]-s*o,e-t[1]-r*o)}const Fo=(i,e,t)=>t.dot?Math.hypot(i-t.pts[0][0],e-t.pts[0][1]):t.pts.slice(1).reduce((n,s,r)=>Math.min(n,xv(i,e,t.pts[r],s)),1/0),us=new Map;function Mv(i,e=128,{tier:t=gv(e)}={}){const n=`${i}|${e}|${t}`;if(us.has(n))return us.get(n);const s=new Uint8Array(e*e);if(t<=0){const u=pu(i,e);for(let f=0;f<u.length;f++)s[f]=u[f]<1/0?1:0;return us.set(n,s),s}if(t>=2){const u=Ev(i,e);return us.set(n,u),u}const r=Va(i,1).map(u=>({...u,pts:u.pts.map(([f,h])=>[Wn+f*(1-2*Wn),Wn+h*(1-2*Wn)])})),a=_v/2,o=vv/2,l=1/e,c=Math.max(Yo*1.5,a*1.1);for(let u=0;u<e;u++)for(let f=0;f<e;f++){const h=(f+.5)*l,p=(u+.5)*l;let g=0;for(const M of r){const m=Fo(h,p,M),d=M.dot?c:a;if(!(m>=d)){g=M.dot?m/d>.38&&m/d<.62?0:1:m<Math.max(o,l*.6)?0:1;break}}s[u*e+f]=g}return us.set(n,s),s}const Sv=.055,Vc=Gr*.85,yv=Gr*.28,Wc=Yo*1.15,bv=Yo*.42;function La(i,e,t=e){const n=new Float32Array(e*t),s=1e9,r=1,a=Math.SQRT2;for(let l=0;l<e*t;l++)n[l]=i[l]?s:0;const o=(l,c)=>l<0||c<0||l>=e||c>=t?0:n[c*e+l];for(let l=0;l<t;l++)for(let c=0;c<e;c++){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c-1,l)+r,o(c,l-1)+r,o(c-1,l-1)+a,o(c+1,l-1)+a))}for(let l=t-1;l>=0;l--)for(let c=e-1;c>=0;c--){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c+1,l)+r,o(c,l+1)+r,o(c+1,l+1)+a,o(c-1,l+1)+a))}return n}function Ev(i,e){const t=1/e,n=Va(i,2).map(S=>({...S,pts:S.pts.map(([R,_])=>[Wn+R*(1-2*Wn),Wn+_*(1-2*Wn)])})),s=Va(i,0).length,r=n.filter(S=>!S.dot),a=n.filter(S=>S.dot),o=new Set(n.slice(s).filter(S=>!S.dot)),l=new Float32Array(e*e),c=new Float32Array(e*e),u=new Uint8Array(e*e);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const _=(R+.5)*t,y=(S+.5)*t;let E=1/0,A=1/0;for(const v of r){const w=Fo(_,y,v);o.has(v)?A=Math.min(A,w):E=Math.min(E,w)}c[S*e+R]=A,E=Math.min(E,A+Vc*.35);for(const v of a)E=Math.min(E,Fo(_,y,v)-Wc*.4);l[S*e+R]=E,E<Vc&&(u[S*e+R]=1)}{const S=Sv*e,R=Math.ceil(S)+2,_=e+2*R,y=new Uint8Array(_*_).fill(1);for(let w=0;w<e;w++)for(let L=0;L<e;L++)y[(w+R)*_+L+R]=u[w*e+L]?0:1;const E=La(y,_),A=new Uint8Array(_*_);for(let w=0;w<_*_;w++)A[w]=!y[w]||E[w]<=S?1:0;const v=La(A,_);for(let w=0;w<e;w++)for(let L=0;L<e;L++){const U=(w+R)*_+L+R;A[U]&&v[U]>S&&(u[w*e+L]=1)}}{const S=new Uint8Array(e*e),R=[];for(let _=0;_<e;_++)R.push(_,(e-1)*e+_,_*e,_*e+e-1);for(;R.length;){const _=R.pop();if(S[_]||u[_])continue;S[_]=1;const y=_%e,E=_/e|0;y>0&&R.push(_-1),y<e-1&&R.push(_+1),E>0&&R.push(_-e),E<e-1&&R.push(_+e)}for(let _=0;_<e*e;_++)S[_]||(u[_]=1)}const f=La(u,e),h=[],p=.085*e,g=[];for(let S=0;S<e*e;S++)f[S]>p&&l[S]*e>p*.8&&g.push(S);g.sort((S,R)=>f[R]-f[S]);for(const S of g){if(h.length>=3)break;const R=S%e,_=S/e|0,y=Math.min(f[S],l[S]*e)*.8;h.some(E=>Math.hypot(E.x-R,E.y-_)<E.r+y+2)||h.push({x:R,y:_,r:y,turn:wv(i,h.length)})}const M=new Uint8Array(e*e),m=Math.max(1,yv*e),d=Math.max(m*3.2,4);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const _=S*e+R;if(!u[_])continue;const y=(R+.5)*t,E=(S+.5)*t,A=f[_];let v=1;l[_]*e<m/2+.5&&A>m*.9&&(v=0),c[_]*e<m*.36+.5&&A>m*1.4&&(v=0);for(const L of a){const U=Math.hypot(y-L.pts[0][0],E-L.pts[0][1]);U<Wc&&(v=U<bv?1:0)}let w=!1;for(const L of h){const U=R+.5-L.x,C=S+.5-L.y,I=Math.hypot(U,C);if(I>L.r)continue;w=!0;const D=Math.max(1.3,L.r/(m*2.6)),N=(Math.atan2(C,U)/(Math.PI*2)+1+L.turn)%1,J=L.r/D;v=(I/J-N+8)%1<.58||I<m*.8?1:0,I>L.r-m&&(v=0)}!w&&v&&l[_]*e>m*1.8&&A>d*1.2&&A%d<m&&(v=0),M[_]=v}return M}const wv=(i,e)=>{let t=2166136261;for(const n of i+e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e3/1e3};function Tv(i){const e=i.light;return e&&e.mood==="spooky"?e.spooky:null}function Av(i,e){e?.grade?i.set(e.grade,e.gradeDesat,e.gradePivot,0):i.set(0,0,1,0)}function Xc(i,e,t,n,s=1){e=(e%1+1)%1,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));const r=Math.floor(e*6),a=e*6-r,o=ur(n*(1-t),s),l=ur(n*(1-a*t),s),c=ur(n*(1-(1-a)*t),s),u=ur(n,s);switch(r%6){case 0:i.set(u,c,o);break;case 1:i.set(l,u,o);break;case 2:i.set(o,u,c);break;case 3:i.set(o,l,u);break;case 4:i.set(c,o,u);break;default:i.set(u,o,l)}}const ur=(i,e)=>Math.round(i*255)/255*e,Rv=["hazeHue","hazeSat","haze","gradeHue","gradeSat","mist"];class ZM{constructor(e){this.M=e,this.cur=this.target("")}M;cur;targets=new Map;target(e){let t=this.targets.get(e);if(!t){const n=this.M.areas?.[e]??{};t={hazeHue:this.M.hazeHue,hazeSat:this.M.hazeSat,haze:this.M.haze,gradeHue:this.M.gradeHue,gradeSat:this.M.gradeSat,mist:this.M.mist,...n},this.targets.set(e,t)}return t}update(e,t,n,s,r){const a=this.target(e),o=1-Math.exp(-Math.max(0,t)*(this.M.areaEase??.5)),l=this.cur;for(const c of Rv)if(c==="hazeHue"||c==="gradeHue"){const u=(a[c]-l[c]+1.5)%1-.5;l[c]=(l[c]+u*o+1)%1}else l[c]+=(a[c]-l[c])*o;if(Xc(n,l.hazeHue,l.hazeSat,1,l.haze),s){Xc(s,l.gradeHue,l.gradeSat,1);const c=.3*s.x+.55*s.y+.15*s.z;c>0&&s.set(s.x/c,s.y/c,s.z/c)}r?.setStrength(l.mist)}}function*Cv(i,e){const t={wait:i,here:e};return yield t,t.value}const oh=i=>typeof i=="object"&&i!==null&&"here"in i&&!("later"in i);function*JM(i,e){const t={later:!0,wait:i,here:e,got:!1};return yield t,t}function*QM(i){return i.got||(i.value=yield*Cv(()=>i.promise,i.here)),i.got=!0,i.value}const lh=i=>typeof i=="object"&&i!==null&&"later"in i;function Pv(i){for(;;){const e=i.next();if(e.done)return e.value;lh(e.value)?(e.value.value=e.value.here(),e.value.got=!0):oh(e.value)?e.value.value=e.value.here():e.value&&ch(e.value)}}const Da=[];async function jM(i,e,t=8,n=Dv){const s={longest:0,longestAt:"",slices:0,ms:0,slow:[]};await Yc();let r="";const a=n();for(;;){const o=n();for(s.slices++;;){const l=n(),c=i.next(),u=n()-l;if(u>s.longest&&(s.longest=u,s.longestAt=r),u>4&&(s.slow.length<10||u>s.slow[9][0])&&(s.slow.push([Math.round(u),r]),s.slow.sort((f,h)=>h[0]-f[0]),s.slow.length=Math.min(10,s.slow.length)),c.done)return s.ms=n()-a,Da.push({...s,what:e}),Da.length>8&&Da.shift(),c.value;if(lh(c.value)){const f=c.value;f.promise=qc(f).then(h=>(f.value=h,f.got=!0,h));continue}if(oh(c.value)){const f=c.value;f.value=await qc(f);break}if(c.value&&(r=c.value,ch(c.value)),n()-o>=t)break}await Yc()}}const Lv=2e4;async function qc(i){let e;const t=new Promise(n=>{e=setTimeout(()=>n("late"),Lv)});try{const n=await Promise.race([i.wait(),t]);return n==="late"?i.here():n}catch(n){return af(n,"sliced build worker fallback"),i.here()}finally{clearTimeout(e)}}const Dv=()=>performance.now(),ch=i=>{try{performance.mark(`witch:build-${i}`)}catch{}};function Yc(){return new Promise(i=>{if(typeof requestAnimationFrame>"u"||typeof document>"u"||document.hidden){setTimeout(i,0);return}let e=!1;const t=()=>{e||(e=!0,i())};requestAnimationFrame(()=>setTimeout(t,0)),setTimeout(t,100)})}function Iv(i,e){const t=Math.max(0,Math.min(1,e));if(!t)return i;const n=Ft("miniature"),s=(r,a)=>r+(a-r)*t;return{...i,on:!0,strength:s(i.on?i.strength:0,n.blur),band:s(i.band,n.band),centre:s(i.centre,n.centre),treetop:{...i.treetop,strength:s(i.on?i.treetop.strength:0,n.blur),band:s(i.treetop.band,n.band)}}}function eS(i,e){const t=Math.max(0,Math.min(1,e)),n=Ft("the-audience"),s=i??{on:!1,radius:9,lean:0,lag:.45};return t?{on:!0,radius:s.radius+(n.radius-s.radius)*t,lean:(s.on?s.lean:0)*(1-t)+n.lean*t,lag:s.lag+(n.lag-s.lag)*t}:s}function tS(i){const e=Math.max(0,Math.min(1,i)),t=Ft("stiltwalkers");return{length:1+(t.length-1)*e,tip:e?t.tip:1,strength:e}}const nS=i=>_u(i.mushrooms?.trips[i.witches[0]?.id??0],i.clock.time);function Uv(i){const e=Math.cos(i),t=Math.sin(i)/Math.sqrt(3),n=(1-e)/3;return[e+n,n-t,n+t]}function iS(i,e,t){if(t<=0)return i;const n=1+(Ft("chunky").multiplier-1)*t;return n===1?i:Math.max(i,Math.round(i*n*e)/e)}function sS(i,e){const t=i.mushrooms?.trips[i.witches[0]?.id??0],n=t&&of(t.key);return n&&!n.comingSoon&&n.effect===e?_u(t,i.clock.time):0}const rS=(i,e,t,n)=>{const s=Ft("ravine"),r=Ft("little-planet");return i*(1-t)-Math.max(s.minimumBend,e*s.bendMultiplier)*t+Math.max(r.minimumBend,e*r.bendMultiplier)*n},Nv=(i,e,t)=>{const n=Ft("glow-up");return{threshold:i*(1+(n.thresholdScale-1)*t),strength:e+Math.max(n.minimumBoost,e*n.strengthMultiplier)*t}},aS=(i,e)=>i*Math.max(0,Math.min(1,e)),oS=(i,e,t,n)=>{const s=Ft("vertigo");return{angle:i+(s.angle-i)*n*s.angleMix,distance:e*(1+(s.distance-1)*n),fov:t+(s.fov-t)*n}},lS=(i,e,t)=>{if(t<=0)return{angle:i,distance:e};const n=Ft("worm-s-eye");return{angle:i+(n.angle-i)*t,distance:e*(1+(n.distance-1)*t)}},Fv=(i,e,t)=>{const n=Ft("thick-canopy");return{black:i+(n.blackFloor-i)*t,gamma:e*(1+(n.gamma-1)*t),saturation:1+(n.saturation-1)*t}};function Ov(i,e,t,n){if(n<=0)return{black:i,gamma:e,grade:t};const s=Ft("night-vision");return{black:i+(s.blackFloor-i)*n,gamma:e*(1+(1/s.brightness-1)*n),grade:t*(1+(s.grade-1)*n)}}const si=4,Ia=2,hr=1,$c=2/(2**24-1),Ua=.65;class Bv{shapes=Array.from({length:si},()=>new Ze);states=Array.from({length:si},()=>new Ze);count=0;world=null;time=-1/0;castAt=null;rings=[];point=new k;edge=new k;right=new k;reset(){this.count=0,this.rings.length=0,this.castAt=null,this.time=-1/0,this.world=null}update(e,t,n,s,r,a,o,l){(e!==this.world||t<this.time)&&this.reset(),this.world=e,this.time=t,this.count=0,r&&r.at<=t&&r.at!==this.castAt&&Number.isFinite(r.at)&&(this.castAt=r.at,t>=r.at&&t-r.at<Ua&&(this.rings.length>=si-1&&this.rings.shift(),this.rings.push({...r})));let c=0;for(const f of this.rings)t>=f.at&&t-f.at<Ua&&(this.rings[c++]=f);if(this.rings.length=c,!n)return;let u=6400;for(const f of s){const h=(f.x-l.x)**2+(f.z-l.z)**2;if(f.scale>.1&&h<u){const p=this.count;this.count=0,this.project(f.x,2.3,f.z,1.1,2.2,0,t%120,Math.min(1,f.scale)*1.5,0,a,o),this.count?u=h:this.count=p}}for(const f of this.rings)this.project(f.x,f.y,f.z,8,8,1,(t-f.at)/Ua,2,f.baseY??0,a,o)}project(e,t,n,s,r,a,o,l,c,u,f){if(this.count>=si)return;const h=f(this.point.set(e,t,n));if(this.edge.copy(h).applyMatrix4(u.matrixWorldInverse),this.edge.z>=-u.near||(h.project(u),h.z<-1||h.z>1))return;const p=h.x*.5+.5,g=h.y*.5+.5,M=this.right.setFromMatrixColumn(u.matrixWorld,0).multiplyScalar(s);f(this.edge.set(e,t,n)).add(M).project(u);const m=Math.abs(this.edge.x*.5+.5-p);if(f(this.edge.set(e,t+r,n)).project(u),this.edge.z<-1||this.edge.z>1)return;const d=Math.abs(this.edge.y*.5+.5-g);f(this.edge.set(e,c,n)).project(u);const S=Math.max(h.z,this.edge.z)*.5+.5;!(m>0&&d>0)||p+m<0||p-m>1||g+d<0||g-d>1||(this.shapes[this.count].set(p,g,m,d),this.states[this.count++].set(S,a,o,l))}}const kv=`
uniform sampler2D uRefractionDepth;
uniform int uRefractionCount;
uniform vec4 uRefractionShape[${si}]; // centre uv, half-width/height uv
uniform vec4 uRefractionState[${si}]; // protected support depth, kind (plume/ring), clock/phase, art-pixel strength
float refractionDepthAt(vec2 p) {
  // Exact DEPTH24 texels plus a one-art-pixel foreground halo protect thin/faint silhouette edges.
  ivec2 size = textureSize(uRefractionDepth, 0), cell = ivec2(floor(p * vec2(size)));
  float depth = 1.0;
  for (int y = -${hr}; y <= ${hr}; y++) for (int x = -${hr}; x <= ${hr}; x++) {
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
  for (int i = 0; i < ${si}; i++) {
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
    if (depth < state.x + ${$c.toFixed(12)}) continue;
    guardDepth = max(guardDepth, state.x);
    offset += direction * mask * state.w;
  }
  // Whole art-pixel offsets and texel-centre clamps: never borrow a hidden/imaginary screen pixel.
  offset = floor(clamp(offset, vec2(-${Ia.toFixed(1)}), vec2(${Ia.toFixed(1)})) + 0.5);
  if (all(equal(offset, vec2(0.0)))) return p;
  vec2 at = (clamp(floor(p * uLow) + offset, vec2(0.0), uLow - 1.0) + 0.5) / uLow;
  // Keep the refraction displacement bounded even for diagnostic fractional coordinates.
  if (any(greaterThan(abs(at - p) * uLow, vec2(${Ia.toFixed(1)} + 0.0001)))) return p;
  float sourceDepth = refractionDepthAt(at);
  // Conservative source guard too: background heat cannot pull a foreground silhouette sideways.
  if (sourceDepth < guardDepth + ${$c.toFixed(12)}) return p;
  return at;
}
`,Kc=1,zv="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Hv=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,Gv=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,Vv=`
uniform vec2 uAt; uniform float uR, uSoft, uAspect, uAll, uK; varying vec2 vUv;
void main() {
  float d = length((vUv - uAt) * vec2(uAspect, 1.0));
  float a = uAll > 0.5 ? 1.0 - uK : smoothstep(uR - uSoft, uR, d);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}`,Wv=.8,Xv=`
uniform vec4 uPotionStyle; // saturation boost, edges, edge threshold, edge upper threshold
uniform float uPotionBackground, uPotionTime, uNightVision;
uniform vec4 uPotionHue; // cyclic RGB rotation coefficients, blend strength
uniform vec4 uPotionWobble; // amplitude in art pixels, speed, wave size, edge reach
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uBroken, uPotionFade; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
${kv}
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
  p = refractScene(p);
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
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${Wv.toFixed(2)} * pool));
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
}`,qv=`
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
}`;function Gn(i,e,t,n=!1){const s=new Wt(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,stencilBuffer:n,generateMipmaps:!1});return s.texture.colorSpace=fn,s}class Yv{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Gn(1,1,st,!0),this.scene.depthTexture=new $i(1,1,Yi),this.scene.depthTexture.format=Vn,this.fx.texture.format=Jt;const n=(s,r)=>new Et({vertexShader:zv,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:n(Hv,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(Gv,{uSrc:{value:null},uStep:{value:new ye}}),veil:Object.assign(n(Vv,{uAt:{value:new ye(.5,.5)},uR:{value:0},uSoft:{value:.15},uAspect:{value:1},uAll:{value:0},uK:{value:0}}),{transparent:!0,blending:zi}),composite:n(Xv,{uScene:{value:null},uBloom:{value:null},uLow:{value:new ye},uBloomStrength:{value:0},uKoDim:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0},uBroken:{value:0},uGrade:{value:new Ze},uPool:{value:new Ze},uIris:{value:new Ze},uIris2:{value:new Ze},uGradeTint:{value:new k(1,1,1)}}),tilt:n(qv,{uSrc:{value:null},uDepth:{value:null},uTexel:{value:new ye},uDir:{value:new ye},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5},uSkyBlur:{value:1},uSharp:{value:null},uSharpOn:{value:0}})},this.mats.composite.uniforms.uPotionFade={value:0},this.mats.composite.uniforms.uPotionStyle={value:new Ze},this.mats.composite.uniforms.uPotionBackground={value:.035},this.mats.composite.uniforms.uPotionHue={value:new Ze(1,0,0,0)},this.mats.composite.uniforms.uNightVision={value:0},this.mats.composite.uniforms.uPotionTime={value:0},this.mats.composite.uniforms.uPotionWobble={value:new Ze},this.mats.composite.uniforms.uRefractionDepth={value:this.scene.depthTexture},this.mats.composite.uniforms.uRefractionCount={value:0},this.mats.composite.uniforms.uRefractionShape={value:this.refraction.shapes},this.mats.composite.uniforms.uRefractionState={value:this.refraction.states},this.quad=new ct(new Rn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;refraction=new Bv;refractionEnabled=new URLSearchParams(globalThis.location?.search??"").get("refraction")==="1";scene;bright=Gn(1,1,st);bloomB=Gn(1,1,st);a=Gn(1,1,st);b=Gn(1,1,st);fx=Gn(1,1,st);fxB=Gn(1,1,st);sharpMask=Gn(1,1,_t);sharp=[];fxScene=null;quad;cam=new Xr(-1,1,1,-1,0,1);mats;low=new ye(1,1);out=new ye(1,1);fxRes=new ye(1,1);lift=0;potionGlow=0;potionCanopy=0;potionNightVision=0;potionVertigo=0;potionMiniature=0;potionHue=0;potionHuePhase=0;potionEdges=0;potionWobble=0;potionTime=0;tilt=1;get pool(){return this.mats.composite.uniforms.uPool.value}get iris(){return this.mats.composite.uniforms.uIris.value}get iris2(){return this.mats.composite.uniforms.uIris2.value}set koDim(e){this.mats.composite.uniforms.uKoDim.value=e}set potionFade(e){this.mats.composite.uniforms.uPotionFade.value=Math.max(0,Math.min(1,e))}get sceneTarget(){return this.scene}get lowSize(){return this.low}get fxSize(){return this.fxRes}sizes(){return{scene:[this.scene.width,this.scene.height],fx:[this.fx.width,this.fx.height],bloom:[this.bright.width,this.bright.height],out:[this.out.x,this.out.y]}}resize(e,t,n,s){this.low.set(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.fxRes.set(r,a),this.fx.setSize(r,a),this.fxB.setSize(r,a),this.out.set(n,s),this.scene.setSize(e,t);const o=Math.max(1,Math.round(e/2)),l=Math.max(1,Math.round(t/2));this.bright.setSize(o,l),this.bloomB.setSize(o,l),this.a.setSize(e,t),this.b.setSize(e,t),this.sharpMask.setSize(e,t)}behind=1;behindAt=null;drawScene(e,t){const n=this.renderer,s=this.behind;if(s>=1){n.render(e,t);return}const r=t.layers.mask,a=n.autoClear;if(s<=0){const g=n.getClearColor(this.clear),M=n.getClearAlpha();t.layers.set(Kc),n.setClearColor(0,1),n.render(e,t),n.setClearColor(g,M),t.layers.mask=r;return}n.render(e,t);const o=n.getRenderTarget(),l=o?.width??1,c=o?.height??1,u=l/c,f=this.behindAt,h=f?Math.max(...[[0,0],[1,0],[0,1],[1,1]].map(([g,M])=>Math.hypot((g-f.x)*u,M-f.y))):0,p=.15;n.autoClear=!1,this.pass("veil",o,g=>{g.uAll.value=f?0:1,g.uK.value=s,g.uAt.value.copy(f??g.uAt.value),g.uAspect.value=u,g.uSoft.value=p,g.uR.value=s*(h+p)}),n.clearDepth(),t.layers.set(Kc),n.render(e,t),t.layers.mask=r,n.autoClear=a}clear=new Oe;pass(e,t,n){const s=this.mats[e];n(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}compile(){const e=new Lo;for(const t of Object.values(this.mats)){const n=new ct(this.quad.geometry,t);n.frustumCulled=!1,e.add(n)}return this.renderer.compileAsync(e,this.cam)}sceneMs=0;render(e,t){Pv(this.renderSteps(e,t))}*renderSteps(e,t,n=!0){const s=n?null:this.b,r=this.renderer,a=this.tuning;r.setRenderTarget(this.scene);const o=performance.now();this.drawScene(e,t),this.sceneMs=performance.now()-o,yield;const l=Nv(a.bloom.threshold,a.bloom.on?a.bloom.strength:0,this.potionGlow),c=l.strength>0;if(c){const d=this.bright.width,S=this.bright.height;this.pass("bright",this.bright,R=>{R.uScene.value=this.scene.texture,R.uThreshold.value=l.threshold}),yield;for(let R=0;R<2;R++)this.pass("blur",this.bloomB,_=>{_.uSrc.value=this.bright.texture,_.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,_=>{_.uSrc.value=this.bloomB.texture,_.uStep.value.set(0,1/S)}),yield}const u=!!this.fxScene&&a.suspects.effectsLayer;if(this.fxScene){const d=r.getClearColor(new Oe),S=r.getClearAlpha();r.setRenderTarget(this.fx),r.setClearColor(0,0),r.clear(),r.render(this.fxScene,t),r.setClearColor(d,S),yield;const R=this.low.x,_=this.low.y;this.pass("blur",this.fxB,y=>{y.uSrc.value=this.fx.texture,y.uStep.value.set(.6/R,0)}),this.pass("blur",this.fx,y=>{y.uSrc.value=this.fxB.texture,y.uStep.value.set(0,.6/_)}),yield}const f=Iv(a.tiltShift,this.potionMiniature),h=(f.on&&f.strength>0||this.potionVertigo>0)&&this.tilt>0;if(this.pass("composite",h?this.a:s,d=>{d.uRefractionCount.value=this.refractionEnabled?this.refraction.count:0,d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=c?l.strength:0;const S=Fv(a.tone.black,a.tone.gamma,this.potionCanopy);d.uBlack.value=S.black,d.uGamma.value=S.gamma;const R=Ft("aurora-outlines"),_=Ft("trip-indicator");d.uPotionStyle.value.set(S.saturation-1,this.potionEdges*R.strength,R.edgeLow,R.edgeHigh),d.uPotionBackground.value=R.background,d.uNightVision.value=this.potionNightVision,d.uPotionTime.value=this.potionTime;const y=Uv(this.potionHuePhase);if(d.uPotionHue.value.set(...y,this.potionHue*Ft("hue-spin").strength),d.uPotionWobble.value.set(_.strength*this.potionWobble,_.speed,_.waveSize,_.reach),d.uFx.value=this.fx.texture,d.uFxOn.value=u?1:0,d.uBroken.value=a.suspects.showBroken?1:0,this.setGrade(d),this.potionNightVision>0){const E=Ov(d.uBlack.value,d.uGamma.value,d.uGrade.value.x,this.potionNightVision);d.uBlack.value=E.black,d.uGamma.value=E.gamma,d.uGrade.value.x=E.grade}}),!h)return;yield;const p=this.drawSharp(t),g=this.a.width,M=this.a.height,m=d=>{const S=f,R=Math.max(0,Math.min(1,this.lift)),_=R*R*(3-2*R);d.uDepth.value=this.scene.depthTexture,d.uTexel.value.set(1/g,1/M),d.uStrength.value=(S.strength+(S.treetop.strength-S.strength)*_)*this.tilt,d.uBand.value=S.band+(S.treetop.band-S.band)*_,d.uCentre.value=1-S.centre,S.on||(d.uStrength.value=0);const y=Ft("vertigo");d.uStrength.value+=y.blur*this.potionVertigo*this.tilt,d.uBand.value*=1+(y.band-1)*this.potionVertigo,d.uSkyBlur.value=S.skyBlur??1,d.uSharp.value=this.sharpMask.texture,d.uSharpOn.value=p?1:0};this.pass("tilt",this.b,d=>{m(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),yield,this.pass("tilt",s===this.b?this.a:s,d=>{m(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}drawSharp(e){const t=this.tuning.tiltShift.stackSharp!==!1?this.sharp.filter(o=>o.mesh.visible&&(o.mesh.geometry.instanceCount??0)>0):[];if(!t.length)return!1;const n=this.renderer,s=n.autoClear,r=n.getClearColor(this.clear),a=n.getClearAlpha();n.setRenderTarget(this.sharpMask),n.setClearColor(0,0),n.clear(!0,!1,!1),n.autoClear=!1;for(const o of t){const l=o.mesh.material;o.mesh.material=o.mask,n.render(o.mesh,e),o.mesh.material=l}return n.autoClear=s,n.setClearColor(r,a),!0}get gradeTint(){return this.mats.composite.uniforms.uGradeTint.value}gradeOf;setGrade(e){const t=Tv(this.tuning);if(Av(e.uGrade.value,t),t!==this.gradeOf&&(this.gradeOf=t,t)){const[n,s,r]=lf(t.gradeHue,t.gradeSat,1).map(o=>o/255),a=.3*n+.55*s+.15*r;e.uGradeTint.value.set(n/a,s/a,r/a)}}}const ni=100,Ot=ni/Gh,fr=[{from:0,px:48},{from:64,px:128},{from:128,px:256}],vs=5,$v=240,Kv=6,Zv=40;function Na(i){for(let e=i.length-1;e>=0;e--)if(i[e]>=65535)return new Uint32Array(i);return new Uint16Array(i)}function Jv(i,e){const t=new Float32Array(i.length);for(let n=0;n<e.length;n+=3){const s=e[n],r=e[n+1],a=e[n+2],o=s*3,l=r*3,c=a*3,u=i[o],f=i[o+1],h=i[o+2],p=i[l],g=i[l+1],M=i[l+2],m=i[c],d=i[c+1],S=i[c+2],R=m-p,_=d-g,y=S-M,E=u-p,A=f-g,v=h-M,w=_*v-y*A,L=y*E-R*v,U=R*A-_*E;t[o]=t[o]+w,t[o+1]=t[o+1]+L,t[o+2]=t[o+2]+U,t[l]=t[l]+w,t[l+1]=t[l+1]+L,t[l+2]=t[l+2]+U,t[c]=t[c]+w,t[c+1]=t[c+1]+L,t[c+2]=t[c+2]+U}for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],a=t[n+2],o=1/(Math.sqrt(s*s+r*r+a*a)||1);t[n]=s*o,t[n+1]=r*o,t[n+2]=a*o}return t}function uh(i,e){const{cols:t,rows:n,step:s}=i,r=t*n,a=new Float32Array(r*3),o=[];let l=0;for(let d=0;d<n;d++)for(let S=0;S<t;S++){const R=d*t+S,_=i.h[R],y=_>0?.04+_*e*vs:-.12;a[R*3]=(i.x0+S*s)*e,a[R*3+1]=y,a[R*3+2]=(i.z0+d*s)*e,l=Math.max(l,y)}for(let d=0;d<n-1;d++)for(let S=0;S<t-1;S++){const R=d*t+S,_=R+1,y=R+t,E=y+1;i.h[R]<=0&&i.h[_]<=0&&i.h[y]<=0&&i.h[E]<=0||o.push(R,y,_,_,y,E)}const c=Na(o),u=Jv(a,c);let f=.1;for(let d=0;d<r;d++)f=Math.max(f,a[d*3+1]);const h=new Uint8Array(r);for(let d=0;d<r;d++)h[d]=Math.round(Math.max(0,Math.min(1,a[d*3+1]/f))*255);const p=new Float32Array(r*3),g=new Float32Array(r),M=[];for(let d=0;d<r;d++)p[d*3]=a[d*3],p[d*3+1]=.03,p[d*3+2]=a[d*3+2],g[d]=i.h[d]>0||i.water?.[d]===2?0:Math.min(1,-i.h[d]/$v);for(let d=0;d<n-1;d++)for(let S=0;S<t-1;S++){const R=d*t+S,_=R+1,y=R+t,E=y+1;g[R]>=1&&g[_]>=1&&g[y]>=1&&g[E]>=1||i.h[R]>0&&i.h[_]>0&&i.h[y]>0&&i.h[E]>0||M.push(R,y,_,_,y,E)}let m=null;if(i.water&&i.level){const d=i.water,S=i.level,R=new Float32Array(r*3),_=new Float32Array(r),y=[];for(let A=0;A<r;A++){const v=d[A]===2?S[A]:0;R[A*3]=a[A*3],R[A*3+1]=.06+v*e*vs,R[A*3+2]=a[A*3+2],_[A]=d[A]===2?Math.min(1,(S[A]-i.h[A])/Kv):0}for(let A=0;A<n;A++)for(let v=0;v<t;v++){const w=A*t+v;if(d[w]!==2){for(const L of[w-1,w+1,w-t,w+t])if(L>=0&&L<r&&d[L]===2){R[w*3+1]=.06+S[L]*e*vs;break}}}const E=new Float32Array(r);if(i.looks)for(let A=0;A<r;A++)E[A]=i.looks[A];{const A=new Float32Array(r),v=1.4142;for(let C=0;C<r;C++)A[C]=d[C]===2?1e9:0;for(let C=0;C<n;C++)for(let I=0;I<t;I++){const D=C*t+I;if(!A[D])continue;let N=A[D];I>0&&(N=Math.min(N,A[D-1]+1)),C>0&&(N=Math.min(N,A[D-t]+1),I>0&&(N=Math.min(N,A[D-t-1]+v)),I<t-1&&(N=Math.min(N,A[D-t+1]+v))),A[D]=N}for(let C=n-1;C>=0;C--)for(let I=t-1;I>=0;I--){const D=C*t+I;if(!A[D])continue;let N=A[D];I<t-1&&(N=Math.min(N,A[D+1]+1)),C<n-1&&(N=Math.min(N,A[D+t]+1),I<t-1&&(N=Math.min(N,A[D+t+1]+v)),I>0&&(N=Math.min(N,A[D+t-1]+v))),A[D]=N}const w=new Int32Array(r).fill(-1),L=[],U=[];for(let C=0;C<r;C++){if(E[C]!==7||d[C]!==2||w[C]>=0)continue;const I=L.length;let D=0;for(L.push(0),U.push(C),w[C]=I;U.length;){const N=U.pop(),J=N%t;D=Math.max(D,A[N]);for(const Z of[J>0?N-1:-1,J<t-1?N+1:-1,N-t,N+t])Z>=0&&Z<r&&d[Z]===2&&w[Z]<0&&(w[Z]=I,U.push(Z))}L[I]=D}for(let C=0;C<r;C++)d[C]!==2||!E[C]||(_[C]=w[C]>=0?Math.min(1,(A[C]-.5)/Math.max(1,L[w[C]]-.5)):Math.min(1,(A[C]-.5)*s/Zv))}for(let A=0;A<n-1;A++)for(let v=0;v<t-1;v++){const w=A*t+v,L=w+1,U=w+t,C=U+1;E[w]===4||E[L]===4||E[U]===4||E[C]===4||(d[w]===2||d[L]===2||d[U]===2||d[C]===2)&&y.push(w,U,L,L,U,C)}y.length&&(m={lp:R,ld:_,lk:E,li:Na(y)})}return{pos:a,normal:u,idx:c,top:l,tile:h,tmax:f,flat:p,depth:g,wi:Na(M),lakes:m}}const Zc=[8,5.5,8,11,13,15],Qv=i=>i.id==="home"?Zc[0]:Zc[Math.max(1,Math.min(5,i.phase))],hh=11,Fa=hh*2.3,Jc=2048,fh=(i,e,t)=>`
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
}`,jv=`
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${fh("moonLit","hAtMap",16)}`,cl=`
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${fh("moonLit","hAtTile",20)}`,dh=2,ph=1,ex=96,tx=16,nx=hh*ph,ix=9,sx=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,rx=`
uniform float uTime, uR, uRings; uniform vec3 uMoonDir; varying vec3 vW;
${jv}
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
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fx=`
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${cl}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`,dx=`
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,px=`
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${cl}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`,mx={deep:new Oe(.08,.2,.34),pale:new Oe(.22,.46,.52)},Qc={deep:new Oe(.15,.28,.37),pale:new Oe(.3,.52,.56)},gx=`
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,_x=`
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${cl}
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
}`,hs=i=>i*i*(3-2*i),vx=i=>i*i,Vt={frame:1.6,swoop:2.8,run:1.2,dist:600,pitchDeg:50,onward:60},xx=.9;function Mx(i,e=24,t=0,n){const s=n??Mv(i,e,{tier:t}),r=new Uint8Array(e*e*4);for(let o=0;o<e;o++)for(let l=0;l<e;l++){const c=o*e+l,u=((e-1-o)*e+l)*4;s[c]&&r.set([255,255,255,255],u)}const a=new di(r,e,e);return a.magFilter=_t,a.minFilter=_t,a.needsUpdate=!0,a}function Sx(){const e=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=Math.hypot(s+.5-32,n+.5-32)/32,a=Math.max(0,1-r)**2;e.set([255,255,255,Math.round(a*255)],(n*64+s)*4)}const t=new di(e,64,64);return t.magFilter=st,t.minFilter=st,t.needsUpdate=!0,t}function yx(){const e=new Uint8Array(4096),t=7,n=(r,a,o)=>{if(r<0||a<0||r>=32||a>=32)return;const l=(a*32+r)*4;e.set([255,255,255,Math.max(e[l+3],Math.round(o*255))],l)};for(let r=0;r<t;r++){const a=r/t*Math.PI*2+.4,o=32*(.38+.04*Math.sin(r*2.3)),l=Math.round(32/2+Math.cos(a)*o),c=Math.round(32/2+Math.sin(a)*o),u=1+r%2;n(l,c,1);for(let f=1;f<=u;f++){const h=1-f/(u+1);n(l+f,c,h),n(l-f,c,h),n(l,c+f,h),n(l,c-f,h)}}const s=new di(e,32,32);return s.magFilter=_t,s.minFilter=st,s.needsUpdate=!0,s}function bx(i){const e=i.outline,t=Qv(i);if(e&&e.loops.some(a=>a.sea)){const l=Ot;let c=0;for(const f of e.loops)if(f.sea)for(let h=0;h<f.pts.length;h+=2)c=Math.max(c,Math.hypot(f.pts[h]-0,f.pts[h+1]-0));const u=[];for(const f of e.loops){const h=f.pts.length/2,p=h>160?2:1,g=[];for(let M=0;M<h;M+=p)g.push(new ye((f.pts[M*2]-0)*l,-(f.pts[M*2+1]-0)*l));g.length>=3&&u.push({pts:g,sea:f.sea})}if(u.some(f=>f.sea))return{loops:u,k:l,cx:0,cz:0,reach:c*l}}const n=dv(i.radii).map(([a,o])=>new ye(a-.5,-(o-.5))),s=Math.max(...n.map(a=>a.length())),r=t/s;return{loops:[{pts:n.map(a=>a.multiplyScalar(r)),sea:!0}],k:0,cx:0,cz:0,reach:t}}const jc=new k,eu=(i,e=1)=>new Oe(i[0]/255*e,i[1]/255*e,i[2]/255*e);class Oo{constructor(e,t){this.canvas=e,this.tuning=t,this.renderer=new hv({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=Ss,this.camera=new $t(t.camera.fov??40,1,1,4e3),this.postTuning={...t,bloom:{...t.bloom}},this.post=new Yv(this.renderer,this.postTuning),this.scene.background=new Oe(329230),this.scene.add(new op(7372992,1581104,2.6));const n=new up(13688063,3.2);n.position.set(-30,60,-90),this.scene.add(n),this.moonLight=n;const s=new Mt;s.setAttribute("position",new gt([-1,-1,0,3,-1,0,-1,3,0],3)),this.skyU={uRes:{value:new ye(1,1)},uTime:this.uTime,uMoon:{value:new ye(.28,.88)}};const r=new ct(s,new Et({vertexShader:ox,fragmentShader:lx,uniforms:this.skyU,depthWrite:!1,depthTest:!0,depthFunc:Xi}));r.frustumCulled=!1,r.renderOrder=9,this.scene.add(r),this.buildSea(),this.ring=new ct(new Br(.92,1,64).rotateX(-Math.PI/2),new bn({color:11066623,transparent:!0,blending:nn,depthWrite:!1})),this.ring.position.y=.15,this.ring.visible=!1,this.scene.add(this.ring)}canvas;tuning;renderer;camera;scene=new Lo;post;postTuning;isles=new Map;lines=[];voyages=[];uTime={value:0};glow=Sx();sparkle=yx();skyU;ring;focus=new k;aim=new k;dist=130;distTo=130;distOpen=130;distMax=200;sized=!1;pitch=.95;selected=null;orbit=0;yaw=0;flight=null;get flying(){return!!this.flight}w=1;h=1;unheight(e){const t=e.userData.hb;t&&(this.hScene.remove(t),this.hBodies=this.hBodies.filter(n=>n.hb!==t),this.markHeights())}markHeights(){this.hDirty||(this.hSince=this.now),this.hDirty=!0,this.hDue=Math.min(this.hSince+2,this.now+.5)}hSince=0;now=0;hDue=0;set(e,t){for(const n of this.isles.values())this.unheight(n.group);for(const n of this.isles.values())this.scene.remove(n.group);for(const n of this.lines)this.scene.remove(n);this.isles.clear(),this.lines=[];for(const n of e)this.isles.set(n.id,this.island(n));this.voyages=t;for(const n of t){const s=this.isles.get(n.from),r=this.isles.get(n.to);s&&r&&this.lines.push(this.voyage(s,r))}this.selected&&!this.isles.has(this.selected)&&(this.selected=null)}reshape(e,t){const n=this.isles.get(e);if(!n)return;const s=!n.pick;this.unheight(n.group),this.scene.remove(n.group);const r=this.island({...n.d,outline:t});s&&(r.rose=this.now),this.isles.set(e,r);for(const a of this.lines)this.scene.remove(a);this.lines=this.voyages.flatMap(a=>{const o=this.isles.get(a.from),l=this.isles.get(a.to);return o&&l?[this.voyage(o,l)]:[]})}island(e){const t=new Oi,n=e.x*ni,s=e.y*ni;t.position.set(n,0,s),this.scene.add(t);const{k:r,reach:a}=bx(e),o=e.unknown?.72:e.sail?1:.85,l=e.outline?.ground;if(!l||!(r>0))return{d:e,group:t,x:n,z:s,top:1,reach:a};const{cols:c,rows:u,step:f}=l,h=e.outline.mesh??uh(l,r),p=l.rgb instanceof Uint8Array?l.rgb:Uint8Array.from(l.rgb),g=new Mt;g.setAttribute("position",new vt(h.pos,3)),g.setAttribute("color",new vt(p,3,!0)),g.setAttribute("normal",new vt(h.normal,3)),g.setIndex(new vt(h.idx,1));const M=new di(h.tile,c,u,Ts,kt);M.unpackAlignment=1,M.minFilter=M.magFilter=st,M.needsUpdate=!0;const m={uTile:{value:M},uTileB:{value:new Ze(l.x0*r,l.z0*r,1/(f*r),0)},uTileN:{value:new ye(c,u)},uTileMax:{value:h.tmax},uYScale:{value:1}},d=new ct(g,new Et({vertexShader:hx,fragmentShader:fx,uniforms:{...this.groundU,...m,uDim:{value:o}},vertexColors:!0})),S=h.top,R=new Mt;R.setAttribute("position",new vt(h.flat,3)),R.setAttribute("aDepth",new vt(h.depth,1)),R.setIndex(new vt(h.wi,1));const _=(E,A)=>new Et({vertexShader:dx,fragmentShader:px,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uOpaque:{value:A},uDeep:{value:E.deep},uPale:{value:E.pale}},transparent:A<1,depthWrite:A>=1});if(t.add(new ct(R,_(mx,0))),h.lakes){const E=h.lakes,A=new Mt;A.setAttribute("position",new vt(E.lp,3)),A.setAttribute("aDepth",new vt(E.ld,1)),A.setAttribute("aLook",new vt(E.lk,1)),A.setIndex(new vt(E.li,1)),t.add(new ct(A,new Et({vertexShader:gx,fragmentShader:_x,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uTime:this.uTime,uScale:{value:30*r},uDeep:{value:Qc.deep},uPale:{value:Qc.pale}}})))}t.add(d);{const E=new ct(d.geometry,this.heightMat);E.matrixAutoUpdate=!1,E.frustumCulled=!1,this.hScene.add(E),this.hBodies.push({hb:E,body:d}),t.userData.hb=E,this.markHeights()}const y={d:e,group:t,pick:d,x:n,z:s,top:S,reach:a,tileU:m};if(e.outline?.sigils?.length&&this.sigilInk.set(e.sigil,e.outline.sigils),e.sail){const E=gu(e.sigil),A=Math.max(ix,a*ph),v=new ct(new Rn(A,A).rotateX(-Math.PI/2),new bn({map:this.sigilArt(e.sigil,0),color:eu(E,.95),transparent:!0,blending:nn,depthWrite:!1}));v.position.y=S+.35,t.add(v),y.sigil=v,y.tier=0,y.size=A;const w=new ct(new Rn(A*1.6,A*1.6).rotateX(-Math.PI/2),new bn({map:this.glow,color:eu(E,.16),transparent:!0,blending:nn,depthWrite:!1}));if(w.position.y=S+.25,t.add(w),y.glow=w,e.fresh){const L=new ct(new Rn(A*1.9,A*1.9).rotateX(-Math.PI/2),new bn({map:this.sparkle,color:new Oe(1,.95,.78),transparent:!0,blending:nn,depthWrite:!1}));L.position.y=S+.3,t.add(L),y.spark=L}}if(e.won){const E=a*1.3,A=new ct(new Br(E*.95,E,96).rotateX(-Math.PI/2),new bn({color:15250538,transparent:!0,blending:nn,depthWrite:!1}));A.position.y=.12,t.add(A)}return y}moonShared={uShadow:{value:0},uMoonV:{value:new k(-.3,.6,-.9).normalize()}};hmap=new Wt(Jc,Jc,{depthBuffer:!0,minFilter:st,magFilter:st,generateMipmaps:!1});moonU={...this.moonShared,uHMap:{value:this.hmap.texture},uHR:{value:ni*1.02},uHMax:{value:8}};hScene=new Lo;hBodies=[];hDirty=!0;moonLight=null;moonT0=0;moonLast;moonP=new k;seaMoon={value:new k(-.3,.6,-.9)};stillMoon=null;heightMat=new Et({vertexShader:"uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",fragmentShader:"uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",uniforms:{uHR:this.moonU.uHR,uHMax:this.moonU.uHMax},side:Kt});groundU={...this.moonShared,uMoon:{value:new k(-.3,.6,-.9).normalize()},uShade:{value:new k(-.7,.45,-.55).normalize()},uRise:{value:3}};moonFrame(e){const t=this.tuning,n=Sf(t);(this.moonLast===void 0||e-this.moonLast>1||e<this.moonLast)&&(this.moonT0=e),this.moonLast=e;const s=this.stillMoon!==null?{bearing:this.stillMoon,height:n.height,risen:1}:yf(e-this.moonT0,n),r=gi.degToRad(s.bearing),a=gi.degToRad(s.height),o=this.moonShared.uMoonV.value.set(Math.sin(r)*Math.cos(a),Math.sin(a),-Math.cos(r)*Math.cos(a));this.moonShared.uShadow.value=n.shadow*s.risen,this.groundU.uMoon.value.copy(o),this.groundU.uShade.value.set(Math.sin(r)*.8,.45,-Math.cos(r)*.8).normalize(),this.seaMoon.value.copy(o),this.moonLight?.position.copy(o).multiplyScalar(100);const l=this.skyU.uMoon.value;if(!n.disc)l.set(-1,-1);else{this.camera.updateMatrixWorld();const g=this.moonP.copy(o).multiplyScalar(this.seaR*1.6).project(this.camera);g.z>1||g.z<-1?l.set(-1,-1):l.set((g.x+1)/2,(g.y+1)/2)}Ul(t)!==this.band&&this.buildSea();for(const g of this.isles.values())g.tileU&&(g.tileU.uYScale.value=g.group.scale.y);if((!this.hDirty||e<this.hDue)&&!this.flight)return;this.hDirty=!1;let c=1;for(const{hb:g,body:M}of this.hBodies){M.updateWorldMatrix(!0,!1),g.matrix.copy(M.matrixWorld),g.matrix.elements[13]-=M.parent?.position.y??0,g.matrixWorld.copy(g.matrix);const m=M.geometry;m.boundingBox||m.computeBoundingBox(),c=Math.max(c,m.boundingBox.max.y)}this.moonU.uHMax.value=c*1.05;const u=this.renderer,f=u.getRenderTarget(),h=u.getClearColor(new Oe),p=u.getClearAlpha();u.setRenderTarget(this.hmap),u.setClearColor(0,1),u.clear(),u.render(this.hScene,this.camera),u.setRenderTarget(f),u.setClearColor(h,p)}sea=null;fall=null;band=-1;seaR=ni*1.02;buildSea(){for(const t of[this.sea,this.fall])t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose());this.band=Ul(this.tuning);const e=this.seaR=ni*1.02*(1+this.band);this.moonU.uHR.value=e,this.markHeights(),this.sea=new ct(new Or(e,160).rotateX(-Math.PI/2),new Et({vertexShader:sx,fragmentShader:rx,uniforms:{...this.moonU,uTime:this.uTime,uR:{value:e},uRings:{value:ni*1.02},uMoonDir:this.seaMoon}})),this.fall=new ct(new ll(e,e*.97,40,160,1,!0).translate(0,-20,0),new Et({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:ax,uniforms:{uTime:this.uTime},transparent:!0,depthWrite:!1,side:Kt})),this.scene.add(this.sea,this.fall)}sigilArts=new Map;sigilInk=new Map;sigilArt(e,t){const n=`${e}|${t}`;let s=this.sigilArts.get(n);if(!s){const r=this.sigilInk.get(e)?.[t];s=Mx(e,fr[t].px,t,r&&r.px===fr[t].px?r.ink:void 0),this.sigilArts.set(n,s)}return s}voyage(e,t){const n=new ye(e.x,e.z),s=new ye(t.x,t.z),r=s.clone().sub(n),a=r.length(),o=new ye(-r.y,r.x).normalize(),l=n.clone().add(s).multiplyScalar(.5).add(o.multiplyScalar(a*.12)),c=48,u=.9,f=[],h=[],p=[],g=[],M=_=>{const y=1-_;return new ye(y*y*n.x+2*y*_*l.x+_*_*s.x,y*y*n.y+2*y*_*l.y+_*_*s.y)},m=e.reach/a*1.1,d=1-t.reach/a*1.1;for(let _=0;_<=c;_++){const y=m+(d-m)*(_/c),E=M(y),A=M(Math.min(1,y+.01)),v=A.sub(E).normalize(),w=new ye(-v.y,v.x).multiplyScalar(u);if(f.push(E.x+w.x,.2,E.y+w.y,E.x-w.x,.2,E.y-w.y),h.push(_/c,0,_/c,1),p.push(y*a,y*a),_<c){const L=_*2;g.push(L,L+1,L+2,L+1,L+3,L+2)}}const S=new Mt;S.setAttribute("position",new gt(f,3)),S.setAttribute("uv",new gt(h,2)),S.setAttribute("aAlong",new gt(p,1)),S.setIndex(g);const R=new ct(S,new Et({vertexShader:cx,fragmentShader:ux,uniforms:{uTime:this.uTime,uColour:{value:new Oe(1,.72,.38)}},transparent:!0,blending:nn,depthWrite:!1,side:Kt}));return this.scene.add(R),R}reset(){this.set([],[]),this.selected=null,this.flight=null,this.orbit=0,this.yaw=0,this.pitch=.95,this.focus.set(0,0,0),this.aim.set(0,0,0),this.sized=!1,this.moonLast=void 0,this.stillMoon=null}dispose(){this.scene.traverse(e=>{const t=e;t.geometry?.dispose();for(const n of[].concat(t.material??[])){for(const s of Object.values(n))s instanceof Ct&&s.dispose();n.dispose()}}),this.glow.dispose(),this.sparkle.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}fly(e,t,n={}){const s=this.isles.get(e);if(!s)return!1;this.select(e),this.orbit=0,this.yaw=0;const{keys:r,G:a}=this.flightKeys(s,n),o=new Oi,l=a?(()=>{const h=Math.round(-a.z0/a.step),p=Math.round(-a.x0/a.step);return .06+Math.max(0,a.h[h*a.cols+p]??0)*Ot*vs})():s.top,c=new ct(new Or(1,32).rotateX(-Math.PI/2),new bn({color:new Oe(.9,.5,1.2),transparent:!0,opacity:.9,blending:nn,depthWrite:!1})),u=new ct(new Rn(5,5).rotateX(-Math.PI/2),new bn({map:this.glow,color:new Oe(.7,.4,1),transparent:!0,opacity:.8,blending:nn,depthWrite:!1}));o.add(c,u),o.position.y=l+.05,o.scale.setScalar(22*Ot),s.group.add(o);const f=performance.now();return this.flight={id:e,t:0,keys:r,done:t,speed:Vt.onward*2/Vt.run,floor:o,size:s.size??1,rate:1,wall:0,wallStart:f,hold:n.hold,slow:n.slow,landingDue:()=>n.landingDue?.(f+r.at(-1).at*1e3)},!0}flightKeys(e,t){const n=e.d.outline?.ground;let s=e.d.outline?e.d.outline.box.maxZ:e.reach/Ot;if(n){const u=Math.round(-n.x0/n.step);for(let f=Math.max(0,Math.round(-n.z0/n.step));f<n.rows;f++)if(!(n.h[f*n.cols+u]>0)){s=n.z0+f*n.step;break}}const r=gi.degToRad(t.pitchDeg??Vt.pitchDeg),a=(t.dist??Vt.dist)*Ot,o=e.z+(s+(t.sea??-40))*Ot,l=o+Vt.onward*Ot;return{keys:[{x:this.focus.x,z:this.focus.z,dist:this.dist,pitch:this.pitch,at:0,ease:hs},{x:e.x,z:e.z,dist:Math.max(Fa,e.reach*4.2),pitch:.95,at:Vt.frame,ease:hs},{x:e.x,z:l,dist:a,pitch:r,at:Vt.frame+Vt.swoop,ease:hs},{x:e.x,z:o,dist:a,pitch:r,at:Vt.frame+Vt.swoop+Vt.run,ease:vx}],G:n}}flightEnd(e,t={}){const n=this.isles.get(e);if(!n)return null;const s=this.flightKeys(n,t).keys.at(-1);return{x:0,z:(s.z+Math.cos(s.pitch)*s.dist-n.z)/Ot,height:Math.sin(s.pitch)*s.dist/Ot,pitch:s.pitch,fov:this.camera.fov,speed:Vt.onward*2/Vt.run}}skipFlight(){this.flight&&(this.flight.t=this.flight.keys.at(-1).at,this.flight.rate=1,this.flight.slow=void 0,this.flight.held=!1)}flyFrame(e,t){const n=this.flight,s=this.isles.get(n.id),r=n.keys.at(-1).at;fv(n,e,n.keys[1].at,r,(performance.now()-n.wallStart)/1e3);let a=1;for(;a<n.keys.length-1&&n.t>n.keys[a].at;)a++;const o=n.keys[a-1],l=n.keys[a],c=l.ease(Math.min(1,Math.max(0,(n.t-o.at)/(l.at-o.at)))),u=(p,g)=>p+(g-p)*c;this.focus.set(u(o.x,l.x),0,u(o.z,l.z)),this.aim.copy(this.focus),this.dist=this.distTo=u(o.dist,l.dist),this.pitch=u(o.pitch,l.pitch);const f=hs(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(n.keys[2].at-n.keys[1].at))));s.group.scale.y=1+(1/vs-1)*f;const h=hs(Math.min(1,n.t/n.keys[1].at));if(s.sigil){const p=1+(60*Ot/n.size-1)*h;s.sigil.scale.set(p,1,p),s.glow?.scale.set(p,1,p)}n.floor.rotation.y=t*.6,n.floor.children[0].scale.setScalar(.9+.1*Math.sin(t*6))}select(e,t=!1){this.selected=e&&this.isles.has(e)?e:null;const n=this.selected?this.isles.get(this.selected):null;this.aim.set(n?n.x:0,0,n?n.z:0),t&&this.focus.copy(this.aim)}zoom(e){this.distTo=Math.max(Fa,Math.min(this.distMax,this.distTo*e))}pick(e,t){const n=this.canvas.getBoundingClientRect(),s=new ye((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),r=new dp;r.setFromCamera(s,this.camera);const a=r.intersectObjects([...this.isles.values()].flatMap(u=>u.pick?[u.pick]:[]),!1)[0];if(a){for(const[u,f]of this.isles)if(f.pick===a.object)return u}const o=new k;if(!r.ray.intersectPlane(new En(new k(0,1,0),0),o))return null;let l=null,c=1/0;for(const[u,f]of this.isles){const h=Math.hypot(f.x-o.x,f.z-o.z)-f.reach;h<c&&(c=h,l=u)}return c<6?l:null}moonDisc(){const e=this.skyU.uMoon.value;if(e.x<0||e.x>1||e.y<0||e.y>1)return null;const t=this.canvas.getBoundingClientRect();return{x:t.left+e.x*t.width,y:t.top+(1-e.y)*t.height,r:.045*t.height}}screenTopOf(e){const t=this.isles.get(e);if(!t)return null;const n=this.canvas.getBoundingClientRect(),s=new k,r=Math.max(t.reach,(t.size??0)*.8*(t.glow?.scale.x??1),(t.size??0)*.95*(t.spark?.scale.x??0));return pv((a,o,l)=>(s.set(a,o+t.group.position.y,l).project(this.camera),{x:(s.x+1)/2*n.width,y:(1-s.y)/2*n.height}),t.x,t.top,t.z,r)}screenOf(e){const t=this.isles.get(e);if(!t)return null;const n=new k(t.x,t.top,t.z).project(this.camera),s=this.canvas.getBoundingClientRect();return{x:(n.x+1)/2*s.width,y:(1-n.y)/2*s.height}}made={w:0,h:0};resize(e,t){const n=dh,s=Math.max(1,Math.ceil(e/n)),r=Math.max(1,Math.ceil(t/n));if(this.sized&&s===this.w&&r===this.h)return;this.w=s,this.h=r,(this.made.w!==s||this.made.h!==r)&&(this.renderer.setSize(s,r,!1),this.post.resize(s,r,s,r),this.made={w:s,h:r}),this.canvas.style.width=`${this.w*n}px`,this.canvas.style.height=`${this.h*n}px`,this.camera.aspect=this.w/this.h,this.camera.updateProjectionMatrix(),this.skyU.uRes.value.set(this.w,this.h),this.postTuning.bloom.strength=this.tuning.bloom.strength*Math.max(.3,Math.min(1,(this.h-60)/180));const a=l=>nx*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*l),o=this.distOpen;this.distOpen=a(ex),this.distMax=a(tx),this.sized?(this.distTo=Math.max(Fa,Math.min(this.distMax,this.distTo*(this.distOpen/o))),this.dist=this.distTo):(this.dist=this.distTo=this.distOpen,this.sized=!0)}frame(e,t){this.uTime.value=t,this.now=t;const n=1-Math.exp(-e*3.2);this.flight?this.flyFrame(e,t):(this.focus.lerp(this.aim,n),this.dist+=(this.distTo-this.dist)*n),this.yaw+=e*this.orbit;const s=Math.cos(this.pitch)*this.dist,r=Math.sin(this.yaw),a=Math.cos(this.yaw);this.camera.position.set(this.focus.x+s*r,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+s*a);const o=this.orbit||this.flight?0:this.dist*.035;this.camera.lookAt(this.focus.x,0,this.focus.z+o);const l=Math.max(.5,this.dist*.25),c=this.dist*3+400;(Math.abs(l-this.camera.near)>.01||Math.abs(c-this.camera.far)>1)&&(this.camera.near=l,this.camera.far=c,this.camera.updateProjectionMatrix()),this.post.lift=0;for(const h of this.isles.values()){const p=.85+.15*Math.sin(t*1.6+h.x*.1),g=h.d.id===this.selected;let M=1;if(h.sigil){const d=h.sigil.material,S=h.size*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(jc.set(h.x,h.top,h.z)));M=S>220?Math.max(0,1-(S-220)/260):1,d.opacity=p*M,h.sigil.visible=M>0;let R=0;for(let _=1;_<fr.length;_++)S>=fr[_].from&&(R=_);R!==h.tier&&(h.tier=R,d.map=this.sigilArt(h.d.sigil,R),d.needsUpdate=!0)}if(h.glow&&(h.glow.material.opacity=(g?.85:.7)*p*M,h.glow.visible=h.sigil?.visible??!0),h.spark){const d=.5+.5*Math.sin(t*4.2+h.x*.3),S=h.spark.material;S.opacity=(.45+.55*d)*M,h.spark.visible=h.sigil?.visible??!0;const R=h.size*1.9*this.h/(2*Math.tan(gi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(jc.set(h.x,h.top,h.z))),_=(h.sigil?h.sigil.scale.x:1)*Math.max(1,32/Math.max(1,R));h.spark.scale.set(_,1,_),h.spark.rotation.y=t*.25}let m=0;if(h.rose!==void 0){const d=Math.min(1,(t-h.rose)/xx),S=1-(1-d)**3;m=-(h.top+.6)*(1-S),d>=1&&(h.rose=void 0)}h.group.position.y=m+(g?Math.sin(t*2)*.12:0)}const u=this.selected?this.isles.get(this.selected):null;if(this.ring.visible=!!u&&!this.flight,u){const h=u.reach*1.6*(1+.04*Math.sin(t*3));this.ring.position.set(u.x,.15,u.z),this.ring.scale.set(h,1,h),this.ring.material.opacity=.7+.3*Math.sin(t*3)}this.moonFrame(t),this.post.render(this.scene,this.camera);const f=this.flight;if(f&&f.t>=f.keys.at(-1).at&&!f.held){const h=this.isles.get(f.id),p=this.camera.position;this.flight=null,f.done({cam:{x:(p.x-h.x)/Ot,z:(p.z-h.z)/Ot,height:p.y/Ot,pitch:this.pitch,fov:this.camera.fov,speed:f.speed*f.rate},still:this.canvas.toDataURL("image/jpeg",.88)})}}}let Bt=null;function mh(i){return Bt?.prep?(Bt.prep=!1,Bt.chart):Bt&&!Bt.busy?(Bt.busy=!0,Bt.chart):Bt?new Oo(document.createElement("canvas"),i):(Bt={chart:new Oo(document.createElement("canvas"),i),busy:!0},Bt.chart)}function gh(i){if(Bt?.chart!==i){i.dispose();return}i.reset(),Bt.busy=!1}function tu(i,e){const r=new Float32Array(81),a=new Uint8Array(81),o=new Float32Array(81),l=new Uint8Array(81),c=new Uint8Array(243).fill(120);for(let h=0;h<9;h++)for(let p=0;p<9;p++){const g=h*9+p,M=Math.hypot(p-4,h-4);r[g]=M<3.5?40-M*8:-20,M<1.2?(a[g]=2,o[g]=r[g]+2,l[g]=1):r[g]<=0&&(a[g]=1)}const u={x0:-400,z0:-400,step:100,cols:9,rows:9,h:r,rgb:c,water:a,level:o,looks:l},f=new Float32Array([-300,0,0,-300,300,0,0,300]);return{id:i,x:e,y:0,phase:1,radii:[1,1,1,1],sail:!0,unknown:!1,won:!0,sigil:"home",outline:{loops:[{pts:f,sea:!0}],box:{minX:-300,maxX:300,minZ:-300,maxZ:300},ground:u,mesh:uh(u,Ot)}}}async function cS(i){if(Bt)return;const e=mh(i),t=Bt;t.prep=!0;try{e.resize(innerWidth*.92-4,innerHeight*.92-4),e.set([tu("home",0),tu("standIn",.2)],[{from:"home",to:"standIn"}]);const n=e;if(await Promise.all([n.scene,n.hScene].map(s=>e.renderer.compileAsync(s,e.camera))).catch(()=>{}),!t.prep)return;e.frame(1/60,0),e.frame(1/60,3);for(const s of e.renderer.info.programs??[])s.getUniforms()}finally{t.prep&&(t.prep=!1,gh(e),performance.mark("witch:chart-prepared"))}}const Ex={hat:{shape:"classic",height:1.11,brim:1.45,tilt:.734,band:1.26},hair:"long",top:"jacket",cloak:"short",broom:{kind:"classic",length:1.2,bend:-.673,bristles:1.096,thickness:.67},accessories:{phones:!1,shades:!1,glowsticks:!1,scarf:!0,satchel:!0,pendant:!1,earrings:!1,lantern:!1,vial:!1,book:!1,patches:!1,bumbag:!1,purse:!1,tote:!1,duffel:!1,briefcase:!1,clutch:!1,messenger:!1,wristband:!1,chunky:!1},cloakLength:2.318,scarfLength:2.275,bagSize:2.512,backpackSize:0,palette:{hair:[0,0,.1775],hat:[.8333,1,.3],headphones:[.0833,1,1],top:[.0833,.5,1],jacket:[.8333,1,.3],jeans:[.6667,.5,1],sneakers:[.0833,.5,1],broom:[.0833,1,.3],bristles:[.1667,1,.74],skin:[.07,.22,.96],pattern:[.1667,.12,1],trim:[0,.72,1],flower:[.9167,.5,1],flower2:[.1667,.5,1],cup:[0,.72,1],glow:[.9167,.72,1],glow2:[.3333,.72,1],shades:[.5833,1,.13],frame:[.0833,.5,1],cloak:[.75,1,.3],scarf:[.5,.5,1],satchel:[.0833,1,.3],lantern:[0,0,.295],book:[0,0,.1775],bumbag:[0,0,.53],band:[.9167,.72,1],vial:[.6667,.12,1],plume:[.9167,1,.3],gold:[.0833,.72,1],backpack:[.3333,1,1]}},wx=null,_h={genome:Ex,broom:wx},Tx="The starting appearance for a brand-new witch. Detailed notes and decisions: docs/notes/config-history/default-look.md.",Ax=uf,vh=cf;function uS(i,e){const t=e&&Wa.some(n=>e[n])?Object.fromEntries(Wa.map(n=>[n,e[n]??null])):null;return JSON.stringify({_:Tx,genome:i?vh(JSON.parse(JSON.stringify(i))):null,broom:t},null,2)+`
`}function hS(i=_h){if(!i.genome||typeof i.genome!="object")return null;const e=vh(JSON.parse(JSON.stringify(i.genome)));return Ax(e).length?null:e}function fS(i=_h){const e=Wh(),t=i.broom;if(t&&typeof t=="object")for(const n of Wa){const s=t[n];typeof s=="string"&&Vh(s)?.slot===n&&(e[n]=s)}return e}const ul=()=>{try{return new URLSearchParams(globalThis.location?.search??"").get("newWitch")==="1"}catch{return!1}};function dS(i){const e=new URL(i);for(const t of["hat","hats","parts","bag"])e.searchParams.delete(t);return e.searchParams.set("newWitch","1"),e.toString()}const hl="witch.hats",fl=ff;function kr(i){if(ul())return[];try{const e=JSON.parse(fl(i)?.getItem(hl)??"[]");return Array.isArray(e)?Ar.filter(t=>e.includes(t)):[]}catch{return[]}}function pS(i,e){const t=kr(e);if(Ar.includes(i)&&!t.includes(i)&&t.push(i),!ul())try{fl(e)?.setItem(hl,JSON.stringify([...t].sort()))}catch{}return kr(e)}function mS(i,e){if(!ul())try{fl(e).setItem(hl,JSON.stringify(kr(e).filter(t=>t!==i)))}catch{}}function Rx(i,e,t){const n=i.get("hats");if(n==="all"||n==="*")return"*";const s=n!==null?Ar.filter(r=>n.split(",").includes(r)):kr(t);return i.get("hat")!==null&&Ar.includes(e)&&!s.includes(e)&&s.push(e),s.join(",")}const Bo="witch.debug.unlockAll",xh=i=>{try{return i??$o??null}catch{return null}};function dl(i){try{return xh(i)?.getItem(Bo)==="1"}catch{return!1}}function gS(i,e){try{const t=xh(e);i?t?.setItem(Bo,"1"):t?.removeItem(Bo)}catch{}}function _S(i){for(const e of hf)i.mushrooms.baskets[e]=Math.max(20,i.mushrooms.baskets[e])}const vS=(i,e=dl())=>e?new Set([...i,...rf.map(t=>t.id)]):new Set(i),xS=(i,e=dl())=>e?new Set([...i,...Xh]):new Set(i);function MS(i,e,t=new URLSearchParams){const n=Rx(t,t.get("hat")??"none");i.spells.hats=e||n==="*"?void 0:n.split(",").filter(Boolean);const s=i.house?.hats;if(!s)return;for(let a=0;a<s.length;a++)s[a]&&!Ds(i.spells,s[a])&&(s[a]="");const r=new Set([i.spells.hat,...i.hat.left.map(a=>a.spell),...s.filter(Boolean)]);if(qh.layout?.hatPoints.length){i.house?.hatOverflow&&(i.house.hatOverflow=i.house.hatOverflow.filter(a=>Ds(i.spells,a))),Rl.forEach(a=>{!r.has(a)&&Ds(i.spells,a)&&Yh(i,a)});return}Rl.forEach((a,o)=>{!s[o]&&!r.has(a)&&Ds(i.spells,a)&&(s[o]=a,r.add(a))})}const nu={33321:1,33323:2,32849:4,32856:4,35905:4,35907:4,33325:2,33327:4,34843:8,34842:8,33326:4,33328:8,34837:16,34836:16,33329:1,33330:1,33331:2,33332:2,33333:4,33334:4,33335:2,33336:2,33337:4,33338:4,33339:8,33340:8,36238:4,36220:4,36232:8,36214:8,36226:16,36208:16,32857:4,35898:4,35901:4,32854:2,32855:2,36194:2,33189:2,33190:4,36012:4,35056:4,36013:8,36168:1,34041:4},iu={6408:4,6407:3,6406:1,6409:1,6410:2,6403:1,33319:2,36244:1,33320:2,36248:3,36249:4,6402:1},Cx={5121:1,5120:1,5123:2,5122:2,5125:4,5124:4,5126:4,5131:2,36193:2},su={32819:2,32820:2,33635:2,34042:4,33640:4,35899:4,35902:4,36269:8},Px=33984,dr=34067,Ni=34069,Lx=32879,Dx=1285;function Qn(i,e,t){return nu[i]?nu[i]:t!==void 0&&su[t]?su[t]:(iu[e??i]??iu[i]??4)*(t!==void 0?Cx[t]??1:1)}function SS(i,e){return Math.max(i.floor,Math.min(i.ceil,i.mb*e/(i.refWidth*i.refHeight)))}const br=new Map;function Ix(i,e){return br.has(i)||i.addEventListener("dispose",()=>br.delete(i)),br.set(i,e),i}class yS{constructor(e,t=()=>0){this.gl=e,this.canvasBytes=t;const n=e,s=this,r=(u,f,h=!1)=>{const p=n[u];typeof p=="function"&&(n[u]=function(...g){h&&f(g);const M=p.apply(e,g);return h||f(g),M})},a=u=>u>=Ni&&u<Ni+6?dr:u,o=u=>s.bound.get(s.unit<<16|a(u))??null,l=(u,f,h)=>{const p=o(u);if(!p)return;let g=s.tex.get(p);g||s.tex.set(p,g={levels:new Map,bytes:0});const M=(u-(a(u)===dr?Ni:0))*64+f,m=g.levels.get(M)??0;g.levels.set(M,h),g.bytes+=h-m,s.texBytes+=h-m};r("activeTexture",u=>{s.unit=u[0]-Px}),r("bindTexture",u=>{s.bound.set(s.unit<<16|u[0],u[1]??null)}),r("texImage2D",u=>{const[f,h,p]=u;if(u.length>=8){const[,,,g,M,,m,d]=u;l(f,h,g*M*Qn(p,m,d))}else if(u.length===6){const g=u[5],M=g?.videoWidth||g?.displayWidth||g?.width||0,m=g?.videoHeight||g?.displayHeight||g?.height||0;l(f,h,M*m*Qn(p,u[3],u[4]))}}),r("texImage3D",u=>{const[f,h,p,g,M,m,,d,S]=u;l(f,h,g*M*m*Qn(p,d,S))}),r("compressedTexImage2D",u=>{const[f,h]=u,p=u[u.length-1];l(f,h,typeof p=="number"?p:p?.byteLength??0)}),r("texStorage2D",u=>{const[f,h,p,g,M]=u,m=Qn(p),d=f===dr?6:1;for(let S=0;S<d;S++)for(let R=0;R<h;R++)l(d>1?Ni+S:f,R,Math.max(1,g>>R)*Math.max(1,M>>R)*m)}),r("texStorage3D",u=>{const[f,h,p,g,M,m]=u,d=Qn(p);for(let S=0;S<h;S++)l(f,S,Math.max(1,g>>S)*Math.max(1,M>>S)*(f===Lx?Math.max(1,m>>S):m)*d)}),r("generateMipmap",u=>{const f=u[0],h=f===dr?6:1,p=o(f),g=p&&s.tex.get(p);if(g)for(let M=0;M<h;M++){const m=h>1?Ni+M:f,d=g.levels.get((m-(h>1?Ni:0))*64)??0;l(m,63,Math.round(d/3))}}),r("deleteTexture",u=>{const f=s.tex.get(u[0]);f&&(s.texBytes-=f.bytes,s.tex.delete(u[0]))},!0),r("copyTexImage2D",u=>{const[f,h,p,,,g,M]=u;l(f,h,g*M*Qn(p))}),r("framebufferTexture2D",u=>{u[3]&&s.attached.add(u[3])}),r("framebufferTextureLayer",u=>{u[2]&&s.attached.add(u[2])}),r("bindRenderbuffer",u=>{s.rb=u[1]??null});const c=(u,f,h,p)=>{if(!s.rb)return;const g=s.rbs.get(s.rb)??0,M=f*h*Qn(u)*Math.max(1,p);s.rbs.set(s.rb,M),s.rbBytes+=M-g};r("renderbufferStorage",u=>{const[,f,h,p]=u;c(f,h,p,1)}),r("renderbufferStorageMultisample",u=>{const[,f,h,p,g]=u;c(h,p,g,f)}),r("deleteRenderbuffer",u=>{const f=s.rbs.get(u[0]);f!==void 0&&(s.rbBytes-=f,s.rbs.delete(u[0]))},!0)}gl;canvasBytes;tex=new Map;rbs=new Map;bound=new Map;unit=0;rb=null;attached=new WeakSet;texBytes=0;rbBytes=0;ooms=0;reset(){this.tex.clear(),this.rbs.clear(),this.bound.clear(),this.texBytes=this.rbBytes=0,this.unit=0,this.rb=null}get total(){return this.texBytes+this.rbBytes+this.canvasBytes()}bytesOf(e,t){const n=t&&e.properties.get(t).__webglTexture;return n&&this.tex.get(n)?.bytes||0}report(e){const t={},n=new Set,s=(o,l)=>{const c=l&&e.properties.get(l).__webglTexture,u=c&&!n.has(c)&&this.tex.get(c);u&&(n.add(c),t[o]=(t[o]??0)+u.bytes)};for(const[o,l]of br)if(o.isRenderTarget){const c=o;for(const u of c.textures)s(l,u);s(l,c.depthTexture)}else s(l,o);let r=0,a=0;for(const[o,l]of this.tex)n.has(o)||(this.attached.has(o)?a+=l.bytes:r+=l.bytes);return t.other=r,t.targets=(t.targets??0)+a+this.rbBytes,t.canvas=this.canvasBytes(),{total:this.total,byKind:t,textures:this.tex.size,buffers:this.rbs.size}}check(){let e=!1;for(let t=0,n=this.gl.getError();n&&t<8;t++,n=this.gl.getError())n===Dx&&(e=!0);return e&&this.ooms++,e}}function bS(i,e,t){const n=r=>(r/1048576).toFixed(0),s=Object.entries(i.byKind).filter(([,r])=>r>=524288).sort((r,a)=>a[1]-r[1]).map(([r,a])=>`${r} ${n(a)}`);return`gpu    ${n(i.total)} of ${e.toFixed(0)} MB  ${s.join("  ")}${t?`  · ${t} let go`:""}`}const In={uHeight:{value:null},uHeightWin:{value:new Ze(0,gr,0,0)},uBend:{value:new Ze(0,0,0,0)},uBendFwd:{value:new ye(0,-1)}},Ux=`
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
`,Nx=Ux+`
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
`,Fx=Nx+`
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
`;function ES(i){return new Et({vertexShader:`attribute vec4 color;
varying vec4 vCol;
uniform float uSize;
${Fx}
void main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,fragmentShader:`varying vec4 vCol;
void main() { gl_FragColor = vCol; }`,uniforms:{...In,uSize:{value:i}},transparent:!0,depthWrite:!1,blending:nn})}class wS extends $h{texture;constructor(e,t,n){const s=performance.now();super(e,t,n,Bd,Kh(e)),Mh=this.H.on?this.H.amplitude:0,this.texture=new di(this.half,gr,gr,Ts,an);const r=Ix(this.texture,"ground");r.magFilter=r.minFilter=st,r.wrapS=r.wrapT=Rr,r.generateMipmaps=!1,r.colorSpace=fn,r.needsUpdate=!0,In.uHeight.value=r,this.filled&&this.changed();try{performance.mark("witch:height-prep-source",{detail:{seed:e.seed,status:this.prepSource,ms:performance.now()-s,filled:this.filled,ci:this.ci,cj:this.cj}})}catch{}}changed(){this.texture.needsUpdate=!0,In.uHeightWin.value.set(this.H.on?Zr:0,gr,this.ci*Zr,this.cj*Zr)}dispose(){this.texture.dispose()}}let Mh=0,ko=null;function TS(i){ko=i}function Es(i,e){return ko?ko.heightAt(i,e):0}function zo(i){const e=In.uBend.value,t=In.uBendFwd.value;if(e.x===0)return i;const n=Math.max(0,(i.x-e.y)*t.x+(i.z-e.z)*t.y);return i.y-=e.x*n*n,i}function Ox(i,e,t,n,s=1/0){if(t<=0||i<=0)return!0;const r=In.uBend.value,a=Math.max(1,n.z-r.z),o=n.y+Mh+3,l=-a+Math.sqrt(a*a+o/t);if(i<=l)return!0;if(i>l+s)return!1;const c=(o+t*l*l)/(l+a);return(o-e+t*i*i)/(i+a)<=c+.02}function Sh(i,e,t,n){const s=In.uBend.value,r=In.uBendFwd.value;if(s.x<=0)return!0;const a=(i-s.y)*r.x+(t-s.z)*r.y;if(a<=0)return!0;const o=Math.max(1,-((n.x-s.y)*r.x+(n.z-s.z)*r.y)),l=n.y+s.w+3,c=-o+Math.sqrt(o*o+l/s.x);if(a<=c)return!0;const u=(l+s.x*c*c)/(c+o);return(l-e+s.x*a*a)/(a+o)<=u+.02}function AS(i,e,t,n){return Sh(i,e+Es(i,t),t,n)}const ru=16,jn={x:0,y:0,z:0},fs={x:0,y:0,z:0};function RS(i,e,t,n){const s=e+Es(i,t);if(!Sh(i,s,t,n))return!1;jn.x=i,jn.y=s,jn.z=t,zo(jn);const r=jn.x,a=jn.y,o=jn.z;for(let l=1;l<ru;l++){const c=l/ru,u=r+(n.x-r)*c,f=a+(n.y-a)*c,h=o+(n.z-o)*c;if(fs.x=u,fs.y=Es(u,h),fs.z=h,zo(fs),fs.y>f+.3)return!1}return!0}function Bx(i){return i.y+=Es(i.x,i.z),zo(i)}const Rs=3,au=new Map;function CS(i,e=3){const t=`${i}:${e}`,n=au.get(t);if(n)return n;const s=Math.round(i*1.7)+4,r=Math.round(i*1.5)+4,a=Math.max(2,Math.round(i/10)),o=Array.from({length:Math.max(1,e)},(C,I)=>a+I);let l=0;for(let C=1;C<o.length;C++)l+=Math.round((o[C]+o[C-1])*.55);const c=Math.max(1,o[0]+2+l-Math.round(s*.28)),u=0,f=c+s/2,h=Math.ceil(c+s+1),p=s*.4,g=r*.3,M=u+r*.6,m=[[.5,.35,.33],[.25,.47,.25],[.75,.45,.27],[.1,.66,.17],[.9,.64,.18],[.34,.76,.22],[.66,.77,.21]].map(([C,I,D])=>[c+C*s,u+I*r,D*r]),d=(C,I)=>{const D=C+.5,N=I+.5;if(((D-f)/p)**2+((N-M)/g)**2<=1)return!0;for(const[J,Z,ie]of m)if((D-J)**2+(N-Z)**2<=ie*ie)return!0;return!1},S=[];let R=Math.round(c+s*.28),_=0;for(let C=-o[o.length-1];C<=o[o.length-1];C++)for(let I=0;I<r+4;I++)d(R+C,I)&&(_=Math.max(_,I));let y=_+2+o[o.length-1];for(let C=o.length-1;C>=0;C--)S.unshift({x:R,y,r:o[C]}),C&&(y+=o[C]+o[C-1]+1,R-=Math.round((o[C]+o[C-1])*.55));const E=S[0].y+o[0]+1,A=(C,I)=>{if(d(C,I))return!0;const D=C+.5,N=I+.5;for(const J of S)if((D-J.x)**2+(N-J.y)**2<=J.r*J.r+.6)return!0;return!1},v=new Uint8Array(h*E);for(let C=0;C<E;C++)for(let I=0;I<h;I++)A(I,C)&&(v[C*h+I]=2);for(let C=0;C<2;C++)for(let I=0;I<E;I++)for(let D=0;D<h;D++){const N=I*h+D;v[N]&&+(D>0&&!!v[N-1])+ +(D<h-1&&!!v[N+1])+ +(I>0&&!!v[N-h])+ +(I<E-1&&!!v[N+h])<2&&(v[N]=0)}const w=(C,I)=>C>=0&&I>=0&&C<h&&I<E&&v[I*h+C]!==0,L=[];for(let C=0;C<E;C++)for(let I=0;I<h;I++)v[C*h+I]&&(!w(I-1,C)||!w(I+1,C)||!w(I,C-1)||!w(I,C+1))&&L.push(C*h+I);for(const C of L)v[C]=1;const U={w:h,h:E,px:v,box:{x:Math.round(f-i/2),y:Math.round(u+r*.55-i/2),n:i},foot:{x:S[0].x,y:S[0].y},puffs:S};return au.set(t,U),U}function kx(i,e,t,n){for(let s=0;s<i.px.length;s++){const r=i.px[s]===1?e:i.px[s]===2?t:null,a=s*4;if(!r){n[a+3]=0;continue}n[a]=r[0],n[a+1]=r[1],n[a+2]=r[2],n[a+3]=Math.round(r[3]*255)}}function PS(i,e,t,n=!0){if(!n)return{kind:"emoji",alpha:1};const s=Math.max(.2,t.hold),r=i+e%11*s*.29,a=Math.floor(r/s),o=r-a*s,l=a%2===0?"emoji":df(e,a,9127)<t.flask?"flask":"sigil",c=Math.max(.001,Math.min(t.fade,s/2)),u=Math.max(0,Math.min(1,o/c,(s-o)/c));return{kind:l,alpha:u*u*(3-2*u)}}const ou=(i,e)=>Math.round(i/e)*e;function yh(i,e){if(e===void 0)return 1;const t=i.bubbles.levelScale??[1];return t[Math.max(0,Math.min(t.length-1,e))]}const zx=(i,e)=>Math.max(1,Math.round(Rs*yh(i,e)));function Hx(i,e,t,n){const s=yh(t,n),r=t.pixelSize*t.bubbles.scale*s,a=t.bubbles.emojiPixels;i.style.setProperty("--px",`${zx(t,n)}px`),e.style.width=e.style.height=`${Math.round(a*r)}px`}const Ho=new Map,zr=new Map;function bh(i,e){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d",{willReadFrequently:!0});let s=null;if(n){n.font=`${e-1}px sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e/2,e/2+.5),s=n.getImageData(0,0,e,e);for(let r=3;r<s.data.length;r+=4)s.data[r]=s.data[r]<110?0:255;n.putImageData(s,0,0)}return zr.set(`${i}:${e}`,s),t}function Eh(i,e){const t=`${i}:${e}`;let n=Ho.get(t);return n||(n=bh(i,e).toDataURL(),Ho.set(t,n),n)}function wh(i,e){return zr.has(`${i}:${e}`)||bh(i,e),zr.get(`${i}:${e}`)??null}const lu=new Set;function LS(i,e,t){const n=`${i}:${e}`;if(!lu.has(n)){const s=document.createElement("canvas");s.width=s.height=e;const r=s.getContext("2d",{willReadFrequently:!0});let a=null;if(r){t(r,e),a=r.getImageData(0,0,e,e);for(let o=3;o<a.data.length;o+=4)a.data[o]=a.data[o]<110?0:255;r.putImageData(a,0,0)}zr.set(n,a),Ho.set(n,s.toDataURL()),lu.add(n)}return i}function Gx(i,e){const t=document.createElement("img");return t.src=Eh(i,e),t.width=t.height=e,t.style.imageRendering="pixelated",t.style.display="block",t}function DS(i){const e=document.createElement("div"),t=document.createElement("img");return e.className="bubble",t.style.imageRendering="pixelated",t.style.display="block",e.append(t),i.append(e),{el:e,img:t}}function IS(i,e,t,n,s){i.dataset.e===t&&i.dataset.l===`${s}`||(i.dataset.e=t,i.dataset.l=`${s}`,e.src=Eh(t,n.bubbles.emojiPixels),Hx(i,e,n,s))}function US(i,e){const t=document.createElement("div"),n=document.createElement("canvas");return t.className=`thought ${e}`,n.className="cloud",t.append(n),i.append(t),t}function NS(i,e,t,n,s=Rs){const r=`${e.w}x${e.h}:${t}:${n}:${s}`;if(i.dataset.c===r)return;i.dataset.c=r;const a=i.firstChild,o=a.getContext("2d");if(a.width=e.w,a.height=e.h,a.style.width=`${e.w*s}px`,a.style.height=`${e.h*s}px`,i.style.width=a.style.width,i.style.height=a.style.height,!o)return;const l=o.createImageData(e.w,e.h);kx(e,t,n,l.data),o.putImageData(l,0,0)}function Vx(i,e,t,n,s,r,a,o=Rs){n=`${n}@${o}`;let l=i.querySelector(`.${t}`);if(!l||l.dataset.k!==n){const c=r();c.classList.add(t),c.dataset.k=n;const u=Math.floor((e.box.n-s)/2);Object.assign(c.style,{position:"absolute",width:`${s*o}px`,height:`${s*o}px`,left:`${(e.box.x+u)*o}px`,top:`${(e.box.y+u)*o}px`}),l?l.replaceWith(c):i.append(c),l=c}for(const c of i.querySelectorAll(":scope > :not(.cloud)"))c.style.display=c===l?"":"none";l.style.opacity=a.toFixed(2)}function FS(i,e,t,n,s,r=Rs){Vx(i,e,"emoji",`${t}:${n}`,n,()=>Gx(t,n),s,r)}function OS(i,e,t,n=Rs){return{left:ou(e-(i.foot.x+.5)*n,n),top:ou(t-(i.foot.y+.5)*n,n)}}const $e=40,Th=4,Tn=13,dn=17;let Oa=null;function Ah(){if(Oa)return Oa;const i=[];for(let e=0;e<$e;e++)for(let t=0;t<$e;t++){const n=t+.5-$e/2,s=e+.5-$e/2,r=Math.hypot(n,s);Math.abs(r-Tn)>.7||i.push(t,e,(Math.atan2(n,-s)/(Math.PI*2)+1)%1)}return Oa=i}function Go(i,e,t,n,s,r,a,o){const l=t/2,c=Math.cos(e),u=Math.sin(e),f=-u,h=c;for(let p=0;p<t;p++)for(let g=0;g<t;g++){const M=g+.5-l,m=p+.5-l,d=M*c+m*u,S=M*f+m*h;d<n||d>s||Math.abs(S)<=r*(s-d)/(s-n)+.25&&i.dot(g,p,a,o)}}function Wx(i,e,t,n,s,r,a,o,l=1){const c=e.getWorldDirection(i),u=c.x,f=c.z,h=Math.hypot(u,f)||1,p=s-a,g=r-o,M=(p*u+g*f)/h,m=(p*-f+g*u)/h,d=In.uBend.value,S=-(r-d.z),R=Es(s,r),_=Bx(i.set(s,l,r)).project(e),y=_.z<1&&Ox(S,R+l,d.x,e.position),E=Math.max(Math.abs(_.x),Math.abs(_.y)),A=y?Math.min(1,Math.max(0,(E-.9)/.25)):1,v=m,w=-M,L=1/Math.max(Math.abs(v)/(.84*t/2),Math.abs(w)/(.76*n/2),1e-9);return{show:A,ex:t/2+v*L,ey:n/2+w*L,angle:Math.atan2(w,v),sx:(_.x+1)/2*t,sy:(1-_.y)/2*n,seen:y}}function BS(i,e,t,n,s){const r=[],a=e/2,o=Math.cos(i),l=Math.sin(i),c=-l,u=o;for(let f=0;f<e;f++)for(let h=0;h<e;h++){const p=h+.5-a,g=f+.5-a,M=p*o+g*l,m=p*c+g*u;M<t||M>n||Math.abs(m)<=s*(n-M)/(n-t)+.25&&r.push([h,f])}return r}const Xx={spots:[],reset(){this.spots.length=0},claim(i,e,t,n,s=!0){const r=-Math.sin(t),a=Math.cos(t),o=(u,f)=>this.spots.every(h=>Math.hypot(h.x-u,h.y-f)>=h.r+n);let l=i,c=e;for(let u=0;s&&u<8&&!o(l,c);u++){const f=(u%2?-1:1)*Math.ceil((u+1)/2)*n*2;l=i+r*f,c=e+a*f}return this.spots.push({x:l,y:c,r:n}),{x:l,y:c}}};class Rh{constructor(e,t=Th,n=1){this.scale=t,this.canvas.width=this.canvas.height=$e,Object.assign(this.canvas.style,{position:"fixed",width:`${$e*t}px`,height:`${$e*t}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none",opacity:`${n}`}),this.label.style.opacity=`${n}`,Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:'16px "Tiny5", ui-monospace, monospace',lineHeight:"16px",whiteSpace:"nowrap",color:"#e8e2f4",background:"rgba(14, 9, 22, 0.72)",padding:"2px 4px 0",transform:"translate(-50%, -50%)",webkitFontSmoothing:"none"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData($e,$e)}scale;canvas=document.createElement("canvas");label=document.createElement("div");g;img;hide(){this.canvas.style.display="none",this.label.style.display="none"}dispose(){this.canvas.remove(),this.label.remove()}text="";textW=0;say(e,t,n,s,r,a,o){const l=this.label;l.style.display="block",e!==this.text&&(this.text=l.textContent=e,this.textW=l.offsetWidth||e.length*9),l.style.color=t;const c=o+Math.abs(r)*this.textW/2+Math.abs(a)*9;l.style.left=`${n+r*c}px`,l.style.top=`${s+a*c}px`}place(e,t,n=1){const s=$e*this.scale*n;this.canvas.style.display="block",this.canvas.style.width=this.canvas.style.height=`${s}px`,this.canvas.style.left=`${e-s/2}px`,this.canvas.style.top=`${t-s/2}px`}clear(){this.img.data.fill(0)}dot(e,t,n,s){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=$e||t>=$e||s<=.02)return;const r=(t*$e+e)*4;if(this.img.data[r+3]>=s*255)return;const a=this.img.data;a[r]=n[0],a[r+1]=n[1],a[r+2]=n[2],a[r+3]=Math.round(Math.min(1,s)*255)}flush(){this.g.putImageData(this.img,0,0)}}function qx(i,e,t,n=Math.PI/2,s){i.clear();const r=Ah();for(let o=0;o<r.length;o+=3)i.dot(r[o],r[o+1],e,1);const a=wh(t,dn);if(a&&a.data.some((o,l)=>l%4===3&&o>0)){const o=Math.floor(($e-dn)/2),l=a.data;for(let c=0;c<dn;c++)for(let u=0;u<dn;u++){const f=(c*dn+u)*4;l[f+3]&&i.dot(o+u,o+c,[l[f],l[f+1],l[f+2]],1)}}else if(s){const o=Math.floor(($e-s[0].length)/2),l=Math.floor(($e-s.length)/2);for(let c=0;c<s.length;c++)for(let u=0;u<s[c].length;u++)s[c][u]!=="."&&i.dot(o+u,l+c,e,1)}Go(i,n,$e,Tn+2,Tn+7,3.5,e,1),i.flush()}const Yx=Tn+7,$x=i=>{const e=t=>{const n=((t+i*6)%6+6)%6;return 1-Math.max(0,Math.min(1,Math.min(n,4-n)))};return[e(5),e(3),e(1)]},ei={plate:0,vivid:0,track:.55},Ba=[10,8,20],Vo=i=>{const e=(i[0]+i[1]+i[2])/3,t=i.map(s=>s*.55+e*.45),n=Math.max(...i)*.95/Math.max(1,...t);return t.map(s=>Math.min(255,s*n))},Kx=["....##########.","....##########.","....##......##.","....##########.","....##......##.","....##......##.","....##......##.","....##......##.","....##......##.",".####....#####.","#####...######.","#####...######.",".###.....####.."],Zx=["...............","####...####...#","#..####...####.","#.+..#..+.#..#.","#.++.#.+++#..#.","#..+.#..+.#.+#.","#....#....#.++.","#.+..#....#..#.","#.++.#..+.#..#.","####.####.####.","....####...####","..............."],kS=[".........###...","........####...",".......####....","......#####....","......#####....",".....######....",".....######....","....#######....","....+++++++....","..###########..","###############",".#############."],zS=[".....+++++.....",".....#####.....","......#.#......","......#.#......",".....##.##.....","...###...###...","..#.........#..",".#.+.........#.",".#+++++++++++#.","#++.++++++++++#","#++++++++.++++#","#+++++++++++++#",".#+++++++++++#.","..#+++++++++#..","...#########..."],HS=(()=>{const i=[];for(let e=0;e<15;e++){let t="";for(let n=0;n<15;n++){const s=Math.hypot(n-7,(e-8.5)*1.05);t+=e<2?n===7?"#":".":s>6.5?".":s>5.6||n%3===1||e%3===0?"#":"+"}i.push(t)}return i})(),Jx=20,Qx=3,jx=(i,e,t)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i))*t,eM=6;class GS{constructor(e,t=Th,n=1){this.opacity=n,this.cue=new Rh(e,t,n)}opacity;cue;v=new k;glyphs=new Map;lastFill=0;flashAt=-1/0;shown=-1;dispose(){this.cue.dispose()}pop(){const e=this.cue.label;e.style.animation="none",e.offsetWidth,e.style.animation="bpm-up 1.4s ease-out"}fade(e){if(Math.abs(e-this.shown)<.01)return;this.shown=e;const t=`${(e*this.opacity).toFixed(2)}`;this.cue.canvas.style.opacity=t,this.cue.label.style.opacity=t,this.cue.canvas.style.visibility=this.cue.label.style.visibility=t==="0.00"?"hidden":"visible"}update(e,t,n,s,r,a,o,l,c,u){const f=this.cue;if(c<this.lastFill-.5&&(this.flashAt=o),this.lastFill=c,!s){f.hide();return}const h=s.top??3.2,p=Wx(this.v,e,t,n,s.x,s.z,r,a,h),g=Math.hypot(s.x-r,s.z-a),M=1-p.show,m=M*M*(3-2*M),d=(1-.3*m*(1-Math.min(1,Math.max(0,(g-12)/28))))*(s.scale??1),S=f.scale*d,R=$e*S/2,_=m*Qx*Math.sin(o*Math.PI),y=Math.min(p.sy-(s.gap??Jx),(s.above??1/0)-eM),E=Math.max(R+4,y-(Tn+7)*S)+_;let A=p.ex+(p.sx-p.ex)*m,v=p.ey+(E-p.ey)*m;const w=jx(p.angle,Math.PI/2,m);({x:A,y:v}=Xx.claim(A,v,w,$e*f.scale*d*.42)),f.place(A,v,d),f.clear();const L=o*l/60,U=Math.pow(.5+.5*Math.cos(L%1*Math.PI*2),2),C=Math.max(0,1-(o-this.flashAt)/.5),I=G=>{const K=Vo(G),ae=ei.vivid;return ae>0?K.map((ge,ce)=>Math.min(255,ge+(G[ce]-ge)*ae)):K},D=G=>{const K=$x(G);return I([K[0]*255,K[1]*255,K[2]*255])},N=s.rainbow?D(o*.25):I([s.colour.x*255,s.colour.y*255,s.colour.z*255]),J=G=>G.map(K=>Math.min(255,K*(.9+.15*U)+255*C*.4)),Z=J(N);if(ei.plate>0&&!s.bare){const G=Tn+2.2;for(let K=0;K<$e;K++)for(let ae=0;ae<$e;ae++)Math.hypot(ae+.5-$e/2,K+.5-$e/2)<=G&&f.dot(ae,K,Ba,ei.plate);Go(f,w,$e,Tn+1,Tn+8.5,5,Ba,ei.plate)}const ie=G=>{const K=(G[0]+G[1]+G[2])/3,ae=ei.track,ge=Math.min(1,ae*.8);return G.map(ce=>(K+(ce-K)*ge)*ae)},j=Tn,ee=Ah(),ne=ie(N);for(let G=0;G<(s.bare?0:ee.length);G+=3){const K=s.rainbow?D(ee[G+2]+o*.25):null;ee[G+2]<=c||C>0?f.dot(ee[G],ee[G+1],K?J(K):Z,1):f.dot(ee[G],ee[G+1],K?ie(K):ne,.9)}const Re=s.emoji?wh(s.emoji,dn):null;if(Re&&Re.data.some((G,K)=>K%4===3&&G>0)){const G=Math.floor(($e-dn)/2),K=Re.data;for(let ae=0;ae<dn;ae++)for(let ge=0;ge<dn;ge++){const ce=(ae*dn+ge)*4;K[ce+3]&&f.dot(G+ge,G+ae,[K[ce],K[ce+1],K[ce+2]],1)}}else if(s.notes||s.glyph){const G=s.glyphColour?Vo([s.glyphColour.x*255,s.glyphColour.y*255,s.glyphColour.z*255]).map(_e=>Math.min(255,_e*(.9+.15*U)+255*C*.4)):Z,K=s.glyph??Kx,ae=Math.floor(($e-K[0].length)/2),ge=Math.floor(($e-K.length)/2),ce=G.map(_e=>Math.min(255,_e*.6+255*.4));for(let _e=0;_e<K.length;_e++){const et=K[_e];for(let Ue=0;Ue<et.length;Ue++){const Ne=et[Ue];Ne==="#"?f.dot(ae+Ue,ge+_e,G,1):Ne==="+"&&f.dot(ae+Ue,ge+_e,ce,1)}}}else if(s.species){const G=Math.max(8,Math.min($e-6,Math.round(s.sigilSize??17))),K=`${s.species}:${G}${s.bold?":bold":""}`;let ae=this.glyphs.get(K);ae||(ae=s.bold&&Zh(s.species,G)||Jh(s.species,G),this.glyphs.set(K,ae));const ge=ae.w,ce=ae.m,_e=s.crown?Qh(Math.round(ge*.7)):null,et=Math.floor(($e-ae.w)/2),Ue=_e?Math.floor(($e-(ge+_e.h+1))/2)+_e.h+1:et,Ne=_e?{ox:Math.floor(($e-_e.w)/2),oy:Ue-_e.h-1}:null;if(s.bare&&ei.plate>0){const Pe=(he,Ie)=>he>=et&&Ie>=Ue&&he<et+ge&&Ie<Ue+ge&&!!ce[(Ie-Ue)*ge+he-et]||!!_e&&!!Ne&&he>=Ne.ox&&Ie>=Ne.oy&&he<Ne.ox+_e.w&&Ie<Ne.oy+_e.h&&!!_e.m[(Ie-Ne.oy)*_e.w+he-Ne.ox];for(let he=0;he<$e;he++)for(let Ie=0;Ie<$e;Ie++)!Pe(Ie,he)&&(Pe(Ie-1,he)||Pe(Ie+1,he)||Pe(Ie,he-1)||Pe(Ie,he+1)||Pe(Ie-1,he-1)||Pe(Ie+1,he+1)||Pe(Ie-1,he+1)||Pe(Ie+1,he-1))&&f.dot(Ie,he,Ba,ei.plate)}if(s.shine){const Pe=J([s.colour.x*255,s.colour.y*255,s.colour.z*255]),he=tt=>Pe.map(Ge=>Ge+(255-Ge)*tt),Ie=o/2.6%1,ht=Ie<.4?Ie/.4*1.6-.3:-9;for(let tt=0;tt<ge;tt++)for(let Ge=0;Ge<ge;Ge++){if(!ce[tt*ge+Ge])continue;const pt=Math.abs(((Ge+.5)/ge+1-(tt+.5)/ge)/2-ht)<.13;f.dot(et+Ge,Ue+tt,pt?he(.85):Pe,1)}if(_e&&Ne)for(let tt=0;tt<_e.h;tt++)for(let Ge=0;Ge<_e.w;Ge++)_e.m[tt*_e.w+Ge]&&f.dot(Ne.ox+Ge,Ne.oy+tt,Pe,1)}else{for(let Pe=0;Pe<ge;Pe++)for(let he=0;he<ge;he++)ce[Pe*ge+he]&&f.dot(et+he,Ue+Pe,Z,1);if(_e&&Ne)for(let Pe=0;Pe<_e.h;Pe++)for(let he=0;he<_e.w;he++)_e.m[Pe*_e.w+he]&&f.dot(Ne.ox+he,Ne.oy+Pe,Z,1)}}if(Go(f,w,$e,j+2,j+7,3.5,Z,1),f.flush(),!(u!==""&&(!!u||g>20))){f.label.style.display="none";return}const Ye=-Math.cos(w)*(1-m)+m,Be=-Math.sin(w)*(1-m),ze=Math.hypot(Ye,Be)||1;f.say(u??`${Math.round(g)} m`,`rgb(${N.map(Math.round).join(",")})`,A,v,Ye/ze,Be/ze,(j+1.5)*f.scale*d)}}const tM=Vo([232,180,106]),Wo=3,nM=4,pr=$e*Wo/2+6;class iM{cue;angle=NaN;shown=1;constructor(e=document.body){this.cue=new Rh(e,Wo),this.cue.canvas.style.zIndex="3"}update(e,t,n,s=1,r=0){if(this.shown=mv(this.shown,s,r),!e||this.shown<=0){this.cue.hide(),this.angle=NaN;return}this.cue.canvas.style.opacity=`${this.shown}`;const a=Yx*Wo+nM+Math.abs(Math.sin(n*Math.PI))*3,o=e.x,l=e.y-a,c=Math.max(pr,Math.min(t.width-pr,o)),u=Math.max(pr,Math.min(t.height-pr,l)),f=c!==o||u!==l,h=f?Math.atan2(e.y-u,e.x-c):Math.PI/2;Math.abs(h-this.angle)<=.02||(qx(this.cue,tM,"🧭",h,Zx),this.angle=h),this.cue.place(t.left+c,t.top+u)}dispose(){this.cue.dispose()}}function Ch(i,e=0){if(i!=="home"&&!Tr(i))return null;const t=jh(e).islands.get(i);return t?{x:t.x,y:t.y}:null}function sM(i,e,t,n){const s=i.find(u=>u.id===e),r=Math.hypot(t,n);if(!s||!r)return null;const a=t/r,o=n/r;let l=null,c=1/0;for(const u of i){if(u.id===e)continue;const f=u.x-s.x,h=u.y-s.y,p=Math.hypot(f,h);if(!p)continue;const g=(f*a+h*o)/p;if(g<.5)continue;const M=p*(2-g);M<c&&(c=M,l=u.id)}return l}const pl=()=>{const i=globalThis.__travelProbe;return i?.trace?.capabilities?.workerMessages?i:void 0},Vi=new WeakMap,cu=new WeakMap;let rM=0,aM=0;const ml=()=>performance.timeOrigin+performance.now();function oM(i,e,t,n){const s=pl();if(!s?.record)return;const r=i.seed,a={jobId:`job-${++rM}`,jobKind:e,id:t,enqueuedEpochMs:ml(),queueDepth:n,...typeof r=="number"?{seed:r}:{}};Vi.set(i,a),s.record({kind:"worker-job",phase:"enqueue",...a,at:performance.now()})}function VS(i,e){const t=Vi.get(i);t&&(pl()?.record?.({kind:"worker-job",phase:"cancel",...t,reason:e,endedEpochMs:ml(),at:performance.now()}),Vi.delete(i))}function ms(i,e,t,n,s=0){const r=pl();if(!r?.record){i.postMessage(e);return}Vi.has(e)||oM(e,t,n,s);let a=cu.get(i);a===void 0&&(a=i._travelWorkerIndex??++aM,cu.set(i,a));const o={...Vi.get(e),workerIndex:a};Vi.set(e,o),r.record({kind:"worker-job",phase:"dispatch",...o,at:performance.now(),dispatchEpochMs:ml()}),i.postMessage({...e,__witchJobTrace:o})}const ws="witch.arrive",lM=3e4,gl=()=>{try{return sessionStorage}catch{return null}};function cM(i,e,t,n=gl(),s=Date.now()){const r={v:1,island:i,world:e,at:s,...t};try{n?.setItem(ws,JSON.stringify(r))}catch{try{n?.setItem(ws,JSON.stringify({...r,still:""}))}catch{}}}function WS(i,e=gl(),t=Date.now()){let n=null;try{n=JSON.parse(e?.getItem(ws)??"null"),e?.removeItem(ws)}catch{return null}return!n||n.v!==1||n.island!==i||!(t-n.at>=0&&t-n.at<lM)||!n.cam?null:n}function XS(i=gl()){try{i?.removeItem(ws)}catch{}}const Xo=32,Ph=(i,e)=>i==="home"?0:Tr(i,e)?.phase??1;function Lh(i,e){const t=n=>Math.hypot(n.x-e.x,n.y-e.y);return[...i].sort((n,s)=>n.phase-s.phase||t(n)-t(s)).map(n=>n.id)}function uu(i,e){const t=s=>Math.hypot(s.x-e.x,s.y-e.y),n=i.filter(s=>s.id==="home"||s.sail).sort((s,r)=>s.id==="home"?-1:r.id==="home"?1:t(s)-t(r));return[...n.map(s=>s.id),...Lh(i.filter(s=>!n.includes(s)),e)]}function uM(i){const e=["home",...Xa].map(t=>{const n=Ch(t,i);return{id:t,x:n?.x??9,y:n?.y??0,phase:Ph(t,i)}});return Lh(e,{x:0,y:0})}let ki=null;function qS(i,e,t,n){if(ki)return;let s;try{s=new Worker(new URL(""+new URL("chartOutlines.worker-BuRcArGB.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return}ki=s,s.onmessage=a=>{if(!("warmDone"in a.data)){n?.(a.data.warmed,a.data.made);return}s.terminate(),ki=null,t?.(a.data.made,a.data.kept)},s.onerror=()=>{s.terminate(),ki=null};const r=uM(i);ms(s,{world:i,found:e,ids:r,step:Xo,warm:!0},"chart:request","warm",r.length)}function YS(){ki?.terminate(),ki=null}function hM(i,e=Math.random){const t=new URL(i);return t.searchParams.set("seed",String(Math.floor(e()*1e6))),t.toString()}function $S(i,e){const t=i.get("sail");return t==="inplace"||t==="reload"?t:e.sail?.inPlace?"inplace":"reload"}const fM=["arrive","wave","cleared","at","mode","zoom","set","found","bot","quest","arena","fight","pack","partyover","shot"];function KS(i,e,t,n){const s=new URLSearchParams({island:e,seed:String(t)});n!=null&&s.set("world",String(n));const r=new Set([...fM,"island","seed","world"]);for(const[a,o]of i)r.has(a)||s.append(a,o);return s}function ZS(i,e,t,n){return new URL(`./?island=${i}&seed=${e}&arrive=1${t!=null?`&world=${t}`:""}`,n).href}function JS(i,e){const t=new Set((i.get("set")??"").split(";").map(n=>n.split("=")[0]).filter(Boolean));for(const n of e)n.apply.knob&&i.has(`d_${n.id}`)&&t.add(n.apply.knob);return t}function QS(i,e,t=Math.random){if(i==="bot"){const n=new URL(e);return n.searchParams.delete("bot"),n.toString()}return hM(e,t)}function jS(i,e){const t=new URL(e).searchParams,n=ef(t.get("seed"));if(n===null)throw new Error(`a new night in place: no seed in ${e}`);return{how:i,island:t.get("island")??"",seed:n,world:t.has("world")?Number(t.get("world")):void 0,params:t}}class ey{constructor(e,t){this.h=e,this.onBack=t}h;onBack;armed=!1;url="";sailed(e){this.url=e,this.h.pushState({witch:"night"},"",e),this.h.pushState({witch:"guard"},"",e),this.armed=!0}popped(){return this.armed?(this.h.pushState({witch:"guard"},"",this.url),this.onBack(),!0):!1}}async function ty(i,e,t,n=()=>{}){try{return await i(),!0}catch(s){try{n(s)}catch{}return t(e),!1}}function ny(i){return i&&qo(i)?i:null}function iy(i){return i==="over"?"Back to the afterparty":"Back to the party"}function dM(i,e,t){return i&&i.island===e&&i.world===t?"stay":"sail"}function pM(i,e,t,n){return i??(e&&e.world===t?e.island:void 0)??n??"home"}const mM={"game.moveUp":{context:"game",name:"Move up",about:"Fly or walk up the screen.",keys:["KeyW","ArrowUp"],mouse:[],pad:["lsUp"]},"game.moveDown":{context:"game",name:"Move down",about:"Fly or walk down the screen.",keys:["KeyS","ArrowDown"],mouse:[],pad:["lsDown"]},"game.moveLeft":{context:"game",name:"Move left",about:"Fly or walk left.",keys:["KeyA","ArrowLeft"],mouse:[],pad:["lsLeft"]},"game.moveRight":{context:"game",name:"Move right",about:"Fly or walk right.",keys:["KeyD","ArrowRight"],mouse:[],pad:["lsRight"]},"game.aimUp":{context:"game",name:"Aim up",about:"Aim the 💌 up the screen (with the mouse: the cursor aims).",keys:[],mouse:[],pad:["rsUp"]},"game.aimDown":{context:"game",name:"Aim down",about:"Aim the 💌 down the screen.",keys:[],mouse:[],pad:["rsDown"]},"game.aimLeft":{context:"game",name:"Aim left",about:"Aim the 💌 left.",keys:[],mouse:[],pad:["rsLeft"]},"game.aimRight":{context:"game",name:"Aim right",about:"Aim the 💌 right.",keys:[],mouse:[],pad:["rsRight"]},"game.rise":{context:"game",name:"Rise / land",about:'Rise to the treetops, or land. Nothing else (Ed: "rising is not quite a free action").',keys:["Space"],mouse:[],pad:["cross"]},"game.use":{context:"game",name:"Use",about:"Use what's here: open a station, take a rune, put down or pick up a sigil. Held: a run, picking up or putting down as she goes.",keys:["KeyE"],mouse:[],pad:["square"]},"game.invite":{context:"game",name:"Invite 💌",about:"Throw 💌 invites where she aims (held: keep throwing).",keys:["Digit1"],mouse:["left"],pad:["R2"]},"game.dodge":{context:"game",name:"Dodge",about:"Blink the way she's going.",keys:[],mouse:["right"],pad:["L2","circle"]},"game.cycleNext":{context:"game",name:"Next sigil",about:"Cycle the stack: the bottom sigil (the next put down) to the top.",keys:["KeyQ"],mouse:[],pad:["R1"]},"game.cyclePrev":{context:"game",name:"Previous sigil",about:"Cycle the stack back: the top sigil to the bottom.",keys:[],mouse:[],pad:["L1"]},"game.hat":{context:"game",name:"Hat",about:"Put her hat down, or pick one up (on the keyboard: hold Use with nothing to do).",keys:[],mouse:[],pad:["triangle"]},"game.boost":{context:"game",name:"Broom spell",about:"Her broom's spell, if it has one (the boost, the ley jump, the ground pound).",keys:["KeyR"],mouse:[],pad:["L3"]},"game.zoomIn":{context:"game",name:"Zoom in",about:"Bring the camera in.",keys:["KeyZ","Equal","NumpadAdd"],mouse:["wheelUp"],pad:["down"]},"game.zoomOut":{context:"game",name:"Zoom out",about:"Take the camera out.",keys:["KeyX","Minus","NumpadSubtract"],mouse:["wheelDown"],pad:["up"]},"game.autoTalk":{context:"game",name:"Auto-talk",about:"Turn auto-talk on or off (off, she talks while Talk is held).",keys:["KeyT"],mouse:[],pad:[]},"game.talk":{context:"game",name:"Talk",about:"With auto-talk off, she talks while this is held.",keys:["ShiftLeft","ShiftRight"],mouse:[],pad:[]},"game.debug":{context:"game",name:"Debug",about:"The debug overlay.",keys:["Backquote"],mouse:[],pad:["share"]},"game.nextWave":{context:"game",name:"Next wave",about:"Playtest: bring the next wave now.",keys:["KeyN"],mouse:[],pad:[],dev:!0},"game.pauseWaves":{context:"game",name:"Pause waves",about:"Playtest: pause or resume the waves' timer.",keys:["KeyP"],mouse:[],pad:[],dev:!0},"game.cycleSpeakers":{context:"game",name:"Cycle speakers",about:"Debug: every speaker on to its next state.",keys:["KeyK"],mouse:[],pad:[],dev:!0},"game.inviteNearest":{context:"game",name:"Invite nearest",about:"Debug: invite the nearest creature.",keys:["KeyI"],mouse:[],pad:[],dev:!0},"game.feedNearest":{context:"game",name:"Feed nearest",about:"Debug: the nearest party animal eats a berry.",keys:["KeyB"],mouse:[],pad:[],dev:!0},"game.happyNearest":{context:"game",name:"Cheer nearest",about:"Debug: the nearest creature happy at once.",keys:["KeyO"],mouse:[],pad:[],dev:!0},"global.pause":{context:"global",name:"Pause",about:"Pause everything (a still for screenshots, with a stamp of where you are).",keys:["Escape"],mouse:[],pad:["options"]},"menu.up":{context:"menu",name:"Menu up",about:"Move the highlight up.",keys:["KeyW","ArrowUp"],mouse:[],pad:["up","lsUp"]},"menu.down":{context:"menu",name:"Menu down",about:"Move the highlight down.",keys:["KeyS","ArrowDown"],mouse:[],pad:["down","lsDown"]},"menu.left":{context:"menu",name:"Menu left",about:"Move the highlight left (on a slider: less).",keys:["KeyA","ArrowLeft"],mouse:[],pad:["left","lsLeft"]},"menu.right":{context:"menu",name:"Menu right",about:"Move the highlight right (on a slider: more).",keys:["KeyD","ArrowRight"],mouse:[],pad:["right","lsRight"]},"menu.choose":{context:"menu",name:"Choose",about:"Choose what's highlighted (at the sea chart: sail).",keys:["Space","Enter","NumpadEnter"],mouse:[],pad:["cross"]},"menu.back":{context:"menu",name:"Back",about:"Go back, or close the menu.",keys:["KeyE"],mouse:[],pad:["circle"]},"menu.tabPrev":{context:"menu",name:"Previous tab",about:"The tab to the left.",keys:[],mouse:[],pad:["L1"]},"menu.tabNext":{context:"menu",name:"Next tab",about:"The tab to the right.",keys:[],mouse:[],pad:["R1"]},"menu.zoomIn":{context:"menu",name:"Menu zoom in",about:"Zoom the sea chart or the telescope in.",keys:[],mouse:[],pad:["R2"]},"menu.zoomOut":{context:"menu",name:"Menu zoom out",about:"Zoom the sea chart or the telescope out.",keys:[],mouse:[],pad:["L2"]}},gM={actions:mM},Wi={cross:0,circle:1,square:2,triangle:3,L1:4,R1:5,L2:6,R2:7,share:8,options:9,L3:10,R3:11,up:12,down:13,left:14,right:15,home:16},_l={lsUp:[1,-1],lsDown:[1,1],lsLeft:[0,-1],lsRight:[0,1],rsUp:[3,-1],rsDown:[3,1],rsLeft:[2,-1],rsRight:[2,1]},Dh=["left","right","middle","wheelUp","wheelDown"],ka=.18,za=.5,Er=Object.entries(gM.actions).map(([i,e])=>({...e,id:i,context:e.context})),hu=new Map(Er.map(i=>[i.id,i])),Ha="witch.bindings",fu=i=>{const e={};return Array.isArray(i.keys)&&(e.keys=i.keys.filter(t=>typeof t=="string"&&t.length>0)),Array.isArray(i.mouse)&&(e.mouse=i.mouse.filter(t=>Dh.includes(t))),Array.isArray(i.pad)&&(e.pad=i.pad.filter(t=>t in Wi||t in _l)),e};class _M{constructor(e=null){this.storage=e;try{const t=JSON.parse(e?.getItem(Ha)??"{}");for(const[n,s]of Object.entries(t??{}))hu.has(n)&&s&&typeof s=="object"&&(this.own[n]=fu(s))}catch{}this.build()}storage;own={};live=new Map;listeners=new Set;version=0;list(){return Er.map(e=>({...e,...this.get(e.id),isDefault:!this.own[e.id]}))}get(e){const t=this.live.get(e);if(!t)throw new Error(`no action ${e}`);return t}set(e,t){const n=hu.get(e);if(!n)throw new Error(`no action ${e}`);const s=[...(t.mouse??[]).filter(l=>!Dh.includes(l)),...(t.pad??[]).filter(l=>!(l in Wi)&&!(l in _l))];if(s.length)throw new Error(`not a mouse or pad input: ${s.join(", ")}`);const r={...this.get(e),...fu(t)},a=l=>JSON.stringify(r[l])===JSON.stringify(n[l]),o={};for(const l of["keys","mouse","pad"])a(l)||(o[l]=r[l]);return Object.keys(o).length?this.own[e]=o:delete this.own[e],this.changed(),this.conflicts()}reset(e){delete this.own[e],this.changed()}resetAll(){this.own={},this.changed()}conflicts(){const e=new Map;for(const n of Er){const s=this.get(n.id),r=[...s.keys.map(a=>`key:${a}`),...s.mouse.map(a=>`mouse:${a}`),...s.pad.map(a=>`pad:${a}`)];for(const a of n.context==="global"?["game","menu"]:[n.context])for(const o of new Set(r)){const l=`${a}|${o}`;e.set(l,[...e.get(l)??[],n.id])}}const t=[];for(const[n,s]of e)if(s.length>1){const[r,a]=[n.slice(0,n.indexOf("|")),n.slice(n.indexOf("|")+1)];t.push({context:r,input:a,actions:s})}return t}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}keys(e){return this.get(e).keys}mouse(e){return this.get(e).mouse}pad(e){return this.get(e).pad}padValue(e,t,n){let s=0;for(const r of this.get(e).pad)s=Math.max(s,Ga(r,t,n));return s}padPressed(e,t,n,s,r=[]){return this.get(e).pad.some(a=>Ga(a,t,n)>=za&&Ga(a,s,r)<za)}padHeld(e,t,n){return this.padValue(e,t,n)>=za}padButtons(e){return this.get(e).pad.filter(t=>t in Wi).map(t=>Wi[t])}build(){this.live.clear();for(const e of Er){const t=this.own[e.id]??{};this.live.set(e.id,{keys:[...t.keys??e.keys],mouse:[...t.mouse??e.mouse],pad:[...t.pad??e.pad]})}}changed(){this.build(),this.version++;try{Object.keys(this.own).length?this.storage?.setItem(Ha,JSON.stringify(this.own)):this.storage?.removeItem(Ha)}catch{}for(const e of this.listeners)e()}}function Ga(i,e,t){if(i in Wi)return e[Wi[i]]?1:0;const n=_l[i];if(!n)return 0;const[s,r]=n,a=s<2?0:2,o=t[a]??0,l=t[a+1]??0,c=Math.hypot(o,l);if(c<ka)return 0;const u=(Math.min(1,c)-ka)/(1-ka)/c;return Math.max(0,r*(t[s]??0)*u)}const Ih={cross:"✕",circle:"○",square:"□",triangle:"△",up:"d-pad up",down:"d-pad down",left:"d-pad left",right:"d-pad right",lsUp:"left stick",lsDown:"left stick",lsLeft:"left stick",lsRight:"left stick",rsUp:"right stick",rsDown:"right stick",rsLeft:"right stick",rsRight:"right stick",options:"Options",share:"Share",home:"PS"};function Xn(i,e=Cs){const t=[...new Set(e.pad(i).map(n=>Ih[n]??n))];return t.length?t.join(" or "):"none"}function Uh(i){const e=/^(?:Key([A-Z])|Digit(\d))$/.exec(i);return e?e[1]??e[2]:{Space:"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Escape:"Esc",Backquote:"~",Equal:"+",Minus:"−",NumpadAdd:"+",NumpadSubtract:"−",Enter:"Enter",NumpadEnter:"Enter"}[i]??i}function wr(i,e=Cs){const t={left:"left click",right:"right click",middle:"middle click",wheelUp:"wheel up",wheelDown:"wheel down"},n=[...new Set([...e.mouse(i).map(s=>t[s]??s),...e.keys(i).map(Uh)])];return n.length?n.join(" or "):"none"}const vM=$o,Cs=new _M(vM);function Hr(i){const e=i==="menu"?["menu.up","menu.down","menu.left","menu.right"]:["Up","Down","Left","Right"].map(n=>`${i}${n}`),t=[...new Set(e.flatMap(n=>Cs.pad(n).map(s=>(Ih[s]??s).replace(/^d-pad .*/,"d-pad"))))];return t.length?t.join(" or "):"none"}function sy(i){for(const e of i.querySelectorAll("[data-key]")){const t=Cs.keys(e.dataset.key)[0];e.textContent=t?Uh(t):"(none)"}for(const e of i.querySelectorAll("[data-pad]"))e.textContent=Xn(e.dataset.pad);for(const e of i.querySelectorAll("[data-pad-move]"))e.textContent=Hr(e.dataset.padMove)}function ry(i){return i==="pad"?`${Hr("menu")} or ${Hr("game.aim")} look round   ${Xn("menu.zoomIn")} / ${Xn("menu.zoomOut")} zoom   ${Xn("menu.back")} ⏏`:i==="touch"?"movement control looks round   + / − zoom   sigil to leave":`mouse or arrow keys look round   wheel / ${wr("menu.zoomIn")} / ${wr("menu.zoomOut")} zoom   ${wr("menu.back")} ⏏`}function xM(i,e,t){const n="sigils: islands you can sail to · gold rings: won";return i==="pad"?`${Hr("menu")} to choose${t?` · ${e?"hold ":""}${Xn("menu.choose")} to sail`:""} · ${Xn("menu.zoomIn")} / ${Xn("menu.zoomOut")} zoom${e?` · ${Xn("menu.back")} to put it down`:""} · ${n}`:i==="touch"?`Tap an island to look at it${t?e?" · hold it to sail":", again to sail":""} · pinch to zoom · ${n}`:`point or arrows to choose${t?` · ${e?"hold the mouse or ":""}Space / Enter to sail`:""} · wheel to zoom${e?` · ${wr("menu.back")} to put it down`:""} · ${n}`}const MM={near:{sea:-40,dist:600,pitchDeg:50},far:{sea:420,dist:520,pitchDeg:38},skim:{sea:520,dist:360,pitchDeg:24}},SM=()=>{const i=typeof location>"u"?null:new URLSearchParams(location.search).get("dive");return i&&MM[i]||ti.arrive?.handoff||{}},du="witch.chart.sailAnywhere",yM=`
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
`,bM=`
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="corner"></div>
<div class="hold-ring" hidden></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;function EM(i,e){const t=i.find(n=>n.id===e)??{x:0,y:0};return i.filter(n=>n.fresh).sort((n,s)=>Math.hypot(n.x-t.x,n.y-t.y)-Math.hypot(s.x-t.x,s.y-t.y)).map(n=>n.id)}function ay(i,e){const t=e.mode,n=t==="miniature",s=t==="sail";if(!document.getElementById("chart-view-style")){const T=document.createElement("style");T.id="chart-view-style",T.textContent=yM,document.head.append(T)}const r=document.createElement("div");r.className="chart-view",r.innerHTML=bM,i.append(r);const a=T=>r.querySelector(`.${T}`),o=n?new Oo(r.querySelector("canvas"),ti):mh(ti),l=o.canvas;n||(l.setAttribute("aria-label","The sea chart"),r.querySelector("canvas").replaceWith(l));const c=new AbortController,u={signal:c.signal};n&&(a("top").hidden=!0,a("bottom").hidden=!0);for(const T of e.corner??[]){const V=document.createElement("button");V.textContent=T.label,T.title&&(V.title=T.title),V.addEventListener("click",()=>T.onClick(),u),a("corner").append(V)}a("sail").hidden=!0;const f=s?e.table:void 0;let h=!1;const p=()=>{h||(h=!0,S(),f.onLeave())},g=ti.chart?.sailHold??1.2;let M=null;const m=T=>!!T&&!I(T)&&!!w.find(V=>V.id===T)?.sail,d=(T,V,X=null)=>{!f||h||M||!m(T)||o.flying||(M={id:T,from:performance.now(),at:X,by:V})};function S(T){M&&(!T||M.by===T)&&(M=null,a("hold-ring").hidden=!0)}function R(){if(!M)return;if(M.id!==o.selected){S();return}const T=Math.min(1,(performance.now()-M.from)/1e3/Math.max(.05,g)),V=a("hold-ring"),X=r.getBoundingClientRect(),z=M.at??o.screenOf(M.id)??{x:X.left+X.width/2,y:X.top+X.height/2};if(V.hidden=!1,V.style.left=`${z.x-X.left}px`,V.style.top=`${z.y-X.top}px`,V.style.background=`conic-gradient(rgba(255,214,140,.95) ${T*360}deg, rgba(20,14,32,.6) 0deg)`,T>=1){const W=M.id;S(),Ye(W)}}a("home").hidden=!s||!!f,a("sail-any").hidden=!s,a("close").hidden=!e.onClose||!!f,f&&(r.classList.add("table"),a("top").hidden=!0,a("world").hidden=!0,a("zoom-in").hidden=!0,a("zoom-out").hidden=!0,a("corner").append(a("sail-any")));let _="keys";const y=a("hint"),E=()=>{const T=xM(_,!!f,s);y.textContent!==T&&(y.textContent=T)},A=T=>{_=T,E()};E(),r.addEventListener("pointerdown",T=>A(T.pointerType==="touch"?"touch":"keys"),u),r.addEventListener("pointermove",T=>{T.pointerType==="mouse"&&A("keys")},u),n&&(o.orbit=.12);let v=e.save??Mu(),w=[];const L=new Map;let U=(()=>{try{return localStorage.getItem(du)==="1"}catch{return!1}})();const C=()=>e.world??v.world,I=T=>!!T&&dM(e.here,T,C())==="stay",D=T=>`./?island=${T}${e.world!=null?`&world=${C()}`:""}`;let N=null;const J=new Map,Z=SM(),ie=T=>{let V=J.get(T);return V===void 0&&(V=Math.floor(Math.random()*1e6),J.set(T,V)),V},j=T=>{if(!s||n||N?.island===T)return;if(N?.job.then(X=>X?.stop()),N?.map.then(X=>X?.stop()),!T||!w.find(X=>X.id===T)?.sail||e.noBake?.(T)||I(T)){N=null;return}const V=Il(()=>import("./landingBake-DiwcojU0.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]),import.meta.url).then(X=>X.bakeLanding(T,e.world,ie(T))).catch(()=>null);N={island:T,job:V,map:V.then(X=>X?Il(()=>import("./mapPrep-B40ZO8sC.js").then(z=>z.am),__vite__mapDeps([17,2,3,4,1,5,6,7,8,9,10,11,12,18,15,19]),import.meta.url).then(z=>z.startMapPrep(T,e.world,X.seed)):null).catch(()=>null)}},ee=()=>{const T=v.voyages.at(-1)?.to;if((W=>!!W&&!!w.find(se=>se.id===W)?.sail)(T))return T;const X=w.find(W=>W.id==="home"),z=w.filter(W=>W.id!=="home"&&v.found.includes(W.id)&&W.sail);return z.sort((W,se)=>Math.hypot(W.x-(X?.x??0),W.y-(X?.y??0))-Math.hypot(se.x-(X?.x??0),se.y-(X?.y??0))),z[0]?.id??"home"};let ne=null;const Re=async T=>{const V=N?.island===T?await N.job:null,X=V?.seed??ie(T);await V?.settle();const z=N?.island===T?await N.map:null;z&&await Promise.race([z.done,new Promise(se=>setTimeout(se,8e3))]);const W=ne={island:T,seed:X,ready:!1};performance.mark("chart:depart");try{await e.onDepart(T,X,o.flightEnd(T,Z))}finally{W.ready=!0,performance.mark("chart:ready")}},Te=async(T,V)=>{if(performance.mark("chart:flown"),ne?.island===T){performance.mark("chart:go"),e.onSail?.(T,ne.seed,V);return}const X=N?.island===T?await N.job:null,z=X?.seed??ie(T);await X?.settle();const W=N?.island===T?await N.map:null;W&&await Promise.race([W.done,new Promise(se=>setTimeout(se,8e3))]),performance.mark("chart:go"),e.onSail?e.onSail(T,z,V):location.href=`${D(T)}&seed=${z}&arrive=1`},Ye=T=>{const V=w.find(se=>se.id===T);if(!s||o.flying)return;if(I(T)){f||(e.onStay??e.onClose)?.();return}if(!V?.sail)return;const X=C();performance.mark("chart:sail"),j(T);const z=!!e.onDepart&&!!e.onSail&&o.flightEnd(T,Z)!==null,W=z?{hold:()=>ne?.island!==T||!ne.ready,slow:ti.arrive?.hold,landingDue:e.onLandingDue}:{};if(!o.fly(T,se=>{cM(T,X,se),Te(T,se)},{...Z,...W})){Te(T);return}z&&Re(T),r.classList.add("flying"),e.onFly?.(),requestAnimationFrame(()=>H())};let Be=null,ze=null;const G=new Map;let K=new Map;const ae=()=>{const T=w.find(V=>V.id===(o.selected??"home"))??w[0];K=new Map(uu(w,T??{x:0,y:0}).map((V,X)=>[V,X]))},ge=T=>{const V=w.find(X=>X.id===T.id);!V||T.world!==C()||(G.get(T.id)??V.outline)?.detail&&!T.detail||G.set(T.id,T)};function ce(){if(!G.size)return;let T=null,V=1/0;for(const z of G.values()){const W=z.id===o.selected&&z.detail?-1:K.get(z.id)??1e9;W<V&&(V=W,T=z)}G.delete(T.id);const X=w.find(z=>z.id===T.id);if(!(!X||T.world!==C())){X.outline=T,o.reshape(T.id,T);{const z=w.filter(W=>W.outline).length;z===1&&performance.mark("chart:island1"),z===w.length&&performance.mark("chart:islands")}}}const _e=()=>{if(!Be){try{Be=new Worker(new URL(""+new URL("chartOutlines.worker-BuRcArGB.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}Be.onmessage=T=>ge(T.data)}return Be};function et(T){const V=!Be,X=_e();V&&X&&ms(X,{world:C(),found:[...v.found],ids:[],step:Xo},"chart:request","initialize"),X&&ms(X,{detail:T},"chart:request",T)}function Ue(){const T=C(),V=[...v.found],X=w.find(se=>se.id===(o.selected??v.voyages.at(-1)?.to??"home"))??w[0],z=uu(w.filter(se=>!se.outline&&!G.has(se.id)),X);if(!z.length){ze&&(clearInterval(ze),ze=null);return}const W=_e();W&&ms(W,{world:T,found:V,ids:z,step:Xo,cacheOnly:n},"chart:request","outlines",z.length),n&&!ze&&(ze=setInterval(Ue,4e3))}function Ne(){const T=new Set(U||dl()?["home",...mr]:gf(v)),V=new Set(v.won),X=C(),z=new Set(mf(v,e.here?.island)),W=(ue,le,oe)=>{const be=Ch(ue,X),De=xs(ue);return{id:ue,x:be.x,y:be.y,phase:Ph(ue,X),radii:le,sail:T.has(ue)&&!De,unknown:De,won:V.has(ue),fresh:T.has(ue)&&!De&&z.has(ue),sigil:oe}};w=[W("home",Cl(Pl(tf(X,nf(v.found))),ti.map?.coast).radii,mu("home"))];for(const ue of Xa)w.push(W(ue,Cl(Pl(Tr(ue,X)),ti.islands?.coast).radii,ue));o.set(w,v.voyages);for(const ue of L.values())ue.dispose();if(L.clear(),!n)for(const ue of EM(w,e.here?.island??v.voyages.at(-1)?.to??"home"))L.set(ue,new iM(r));G.clear(),ae(),Ue();const se=v.found.filter(ue=>!xs(ue)).length;a("status").textContent=`${se?`${se} of ${mr.length} islands found${e.countUncharted?` (and ${Xa.length-mr.length} not yet charted)`:""}`:"do a legend's quest and win the night to find its island"}${v.won.length?` · ${v.won.length} won`:""}${e.note?` · ${e.note}`:""}`,a("world").textContent=`World seed: ${X}${e.world!=null&&e.world!==v.world?" (from the link)":""}`,a("home").href=D("home"),a("home").textContent=I("home")?e.here.label:"Sail home"}function Pe(T,V=!1,X=!0){o.select(T,V),ae(),X&&j(T),T&&Be&&!w.find(le=>le.id===T)?.outline&&!G.has(T)&&ms(Be,{first:T},"chart:request",T),T&&!n&&!(G.get(T)??w.find(le=>le.id===T)?.outline)?.detail&&et(T);const z=w.find(le=>le.id===T),W=a("card"),se=a("sail");if(!z||n){W.hidden=!0;return}W.hidden=!1;const ue=T==="home"?0:Tr(T,C())?.phase??0;a("name").textContent=T==="home"?"Home":z.unknown?"Uncharted waters":z.sail?`The ${T}'s island`:"An island not yet found",a("phase").textContent=T==="home"?"the Ent's island, the middle of the world":`phase ${ue}`,a("state").textContent=(I(T)?"you're here · ":"")+(z.unknown?"not yet charted":z.won?"won":z.sail?T!=="home"&&!v.found.includes(T)?"not found yet: 🧪 testing, you can sail there":v.played.includes(T)?"played, not yet won":"found: you can sail there":"do its legend's quest in a night you win to find it"),se.hidden=!s||!(z.sail||I(T))||!!f&&I(T),se.href=D(T),se.textContent=I(T)?e.here.label:f?"Hold to sail":"Sail there"}if(a("sail").addEventListener("click",T=>{T.preventDefault(),f||Ye(o.selected)}),f){const T=a("sail");T.addEventListener("pointerdown",V=>{V.preventDefault();const X=T.getBoundingClientRect();d(o.selected,"pointer",{x:X.left+X.width/2,y:X.top+X.height/2})},u);for(const V of["pointerup","pointerleave","pointercancel"])T.addEventListener(V,()=>S("pointer"),u)}a("home").addEventListener("click",T=>{T.preventDefault(),Pe("home",!0),Ye("home")}),a("close").addEventListener("click",()=>e.onClose?.());const he=new Map;let Ie=0,ht=null;n||(l.addEventListener("pointerdown",T=>{if(f&&!h&&!o.flying&&T.isPrimary){const V=o.pick(T.clientX,T.clientY);V&&(V!==o.selected&&Pe(V),d(V,"pointer",{x:T.clientX,y:T.clientY}))}if(he.set(T.pointerId,{x:T.clientX,y:T.clientY}),ht={x:T.clientX,y:T.clientY},he.size===2){const[V,X]=[...he.values()];Ie=Math.hypot(V.x-X.x,V.y-X.y)}},u),l.addEventListener("pointermove",T=>{if(M?.by==="pointer"&&M.at&&Math.hypot(T.clientX-M.at.x,T.clientY-M.at.y)>12&&S("pointer"),!!he.has(T.pointerId)&&(he.set(T.pointerId,{x:T.clientX,y:T.clientY}),he.size===2)){const[V,X]=[...he.values()],z=Math.hypot(V.x-X.x,V.y-X.y);Ie>0&&z>0&&o.zoom(Ie/z),Ie=z,ht=null}},u),l.addEventListener("pointerup",T=>{if(S("pointer"),h)return;if(o.flying){he.delete(T.pointerId),o.skipFlight();return}const V=he.size===1&&ht&&Math.hypot(T.clientX-ht.x,T.clientY-ht.y)<8;if(he.delete(T.pointerId),he.size<2&&(Ie=0),!V)return;const X=o.pick(T.clientX,T.clientY);f||(X&&X===o.selected?Ye(X):X&&Pe(X))},u),l.addEventListener("pointercancel",T=>{he.delete(T.pointerId),Ie=0,S("pointer")},u),l.addEventListener("wheel",T=>{T.preventDefault(),o.zoom(Math.exp(T.deltaY*.0015))},{passive:!1,...u}),a("zoom-in").addEventListener("click",()=>o.zoom(.75)),a("zoom-out").addEventListener("click",()=>o.zoom(1.33)));const tt=(T,V)=>{const X=sM(w,o.selected??"home",T,V);X&&Pe(X)},Ge=T=>{if(A("keys"),o.flying){T.preventDefault(),o.skipFlight();return}if(T.target?.closest?.("input")||T.target?.closest?.("button, a")&&(T.key==="Enter"||T.key===" "))return;const V={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};if(!h){if(f&&(T.code==="KeyE"||T.key==="Escape")){T.preventDefault(),T.repeat||p();return}V[T.key]?(T.preventDefault(),tt(...V[T.key])):f&&(T.key==="Enter"||T.key===" ")?(T.preventDefault(),T.repeat||d(o.selected,"key")):T.key==="Enter"||T.key===" "?(T.preventDefault(),Ye(o.selected)):T.key==="+"||T.key==="="?o.zoom(.8):T.key==="-"||T.key==="_"?o.zoom(1.25):T.key==="Escape"&&e.onClose&&(T.preventDefault(),e.onClose())}};n||addEventListener("keydown",Ge);const pt=T=>{f&&(T.key==="Enter"||T.key===" ")&&S("key")};f&&addEventListener("keyup",pt);let F=0,St=!0,je=[];function P(T){const V=[...navigator.getGamepads?.()??[]].find(oe=>oe?.connected);if(!V)return;const X=V.buttons.map(oe=>oe.pressed);if((X.some((oe,be)=>oe&&!je[be])||V.axes.some(oe=>Math.abs(oe)>.5))&&A("pad"),je=X,F-=T,o.flying){V.buttons.some(oe=>oe.pressed)&&o.skipFlight();return}if(h)return;const z=V.buttons.map(oe=>oe.pressed),W=oe=>Cs.padHeld(oe,z,V.axes),se=W("menu.right")?1:W("menu.left")?-1:0,ue=W("menu.down")?1:W("menu.up")?-1:0;(se||ue)&&F<=0?(tt(se,ue),F=.28):!se&&!ue&&(F=0);const le=W("menu.choose")&&!St;W("menu.choose")||(St=!1),f?W("menu.choose")&&!St?d(o.selected,"pad"):S("pad"):le&&F<=0&&(Ye(o.selected),F=.5),W("menu.back")&&F<=0&&(f?p():e.onClose&&e.onClose(),F=.5),W("menu.zoomOut")&&o.zoom(1+T),W("menu.zoomIn")&&o.zoom(1-T*.8)}const x=()=>{const T=a("sail-any");T.setAttribute("aria-pressed",String(U)),T.textContent=U?"🧪 Test: sailing anywhere (on)":"🧪 Test: sail anywhere"};x(),a("sail-any").addEventListener("click",()=>{U=!U;try{localStorage.setItem(du,U?"1":"0")}catch{}x();const T=o.selected;Ne(),Pe(T)});const H=(T,V)=>{if(n&&e.size){const X=dh;o.resize(e.size.w*X,e.size.h*X);return}o.resize(T??(r.clientWidth||i.clientWidth||innerWidth),V??(r.clientHeight||i.clientHeight||innerHeight))};H(),a("status").textContent="charting the sea…";let $=!1;return setTimeout(()=>{$||(Ne(),Pe(pM(e.start,e.here,C(),v.voyages.at(-1)?.to),!0,!1),j(ee()))},50),{canvas:l,chart:o,islands:()=>w,update(T,V){n||(P(T),E()),R(),ce(),o.frame(T,V);const X=l.getBoundingClientRect();for(const[z,W]of L)W.update(!o.flying&&!h?o.screenTopOf(z):null,X,V,z===o.selected?0:1,T)},resize:H,choose:Pe,dispose(){$=!0,G.clear(),removeEventListener("keydown",Ge),removeEventListener("keyup",pt),ze&&(clearInterval(ze),ze=null),Be?.terminate(),Be=null,c.abort();for(const T of L.values())T.dispose();n?o.dispose():gh(o),r.remove()}}}export{$x as $,nn as A,ll as B,YM as C,di as D,VM as E,qM as F,Oi as G,Kc as H,sc as I,In as J,Fx as K,Mt as L,fi as M,_t as N,vt as O,Rn as P,XM as Q,Jt as R,qd as S,ti as T,rt as U,Ze as V,Ox as W,WM as X,Zd as Y,gt as Z,Kx as _,FM as a,Ya as a$,$M as a0,Ux as a1,Oe as a2,Tf as a3,Rf as a4,yu as a5,Df as a6,Fi as a7,Lf as a8,bn as a9,Xi as aA,Nx as aB,BM as aC,Kf as aD,ES as aE,DS as aF,Eh as aG,Hx as aH,LS as aI,wh as aJ,Tv as aK,US as aL,CS as aM,zx as aN,NS as aO,PS as aP,FS as aQ,Vx as aR,OS as aS,ou as aT,Rs as aU,Gx as aV,KM as aW,ol as aX,hi as aY,RS as aZ,zM as a_,Ts as aa,kt as ab,st as ac,Rr as ad,Wt as ae,Xr as af,Sh as ag,VS as ah,oM as ai,ms as aj,An as ak,oi as al,JM as am,bu as an,Bd as ao,an as ap,QM as aq,HM as ar,ta as as,kM as at,Ja as au,Or as av,Yt as aw,If as ax,TS as ay,wS as az,Cs as b,KS as b$,IS as b0,GS as b1,Cn as b2,bS as b3,SS as b4,Xc as b5,sS as b6,tS as b7,aS as b8,oS as b9,dp as bA,Il as bB,ul as bC,hS as bD,ry as bE,Zx as bF,dn as bG,JS as bH,WS as bI,XS as bJ,Mu as bK,sy as bL,qS as bM,dl as bN,dS as bO,uS as bP,QS as bQ,$S as bR,ty as bS,mf as bT,ny as bU,iy as bV,vS as bW,OM as bX,pf as bY,NM as bZ,xS as b_,lS as ba,nS as bb,rS as bc,Sf as bd,eS as be,Iv as bf,$e as bg,Rh as bh,Wx as bi,Xx as bj,BS as bk,kS as bl,zS as bm,HS as bn,ei as bo,hv as bp,yS as bq,Ss as br,$t as bs,Yv as bt,ZM as bu,Yc as bv,jM as bw,iS as bx,ui as by,En as bz,ZS as c,ey as c0,gS as c1,_S as c2,MS as c3,jS as c4,Pf as c5,rn as c6,$i as c7,_n as c8,fS as c9,mS as ca,pS as cb,Rx as cc,Wi as cd,_l as ce,Er as cf,Uh as cg,Ih as ch,wr as ci,Da as d,GM as e,k as f,AS as g,Bx as h,yh as i,Ix as j,fn as k,Et as l,ay as m,Kt as n,Lo as o,cS as p,Zu as q,ct as r,YS as s,zo as t,Es as u,ye as v,UM as w,zi as x,Pv as y,Cv as z};
