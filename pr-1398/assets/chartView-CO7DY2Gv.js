const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./landingBake-Dj3vTyEN.js","./linkParams-DCQFaVhS.js","./sigilButton-DZA574mP.js","./party-DWhBRfdC.js","./terrain-DqkqB1CV.js","./stoneStacks-CR0B49hk.js","./beat-CD-Vphhj.js","./musicSet-D72TOc7D.js","./win-QLwibnzB.js","./decisions-DGKY73Ko.js","./viewParams-0HKcrBQ5.js","./generator-DZCkSTvy.js","./mapPrep-DkcqUTiI.js","./settings-DgbBqsIW.js"])))=>i.map(i=>d[i]);
import{bW as vn,bX as pr,bY as Oo,bZ as Ss,N as vu,b_ as Qc,b$ as jc,a0 as eh,c0 as Fa,c1 as Bo,c2 as Or,h as Mu,c3 as Su,c4 as yu,b8 as bu,c5 as Eu,bh as wu,bb as Er,c6 as Tu,c7 as Oa,bS as Au,bc as pl,bd as ml,c8 as Ru,c9 as Cu}from"./terrain-DqkqB1CV.js";import"./generator-DZCkSTvy.js";import{y as Pu,A as ts,h as Lu}from"./party-DWhBRfdC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const th="witch.chart",gl=(i=0)=>({world:i,found:[],won:[],played:[],voyages:[]});function Fv(i){const e=(i??"").trim();if(!e)return 1+Math.floor(Math.random()*2147483646);if(/^\d+$/.test(e))return Number(e)%2147483647;let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%2147483647||1}const nh=i=>{try{return i??globalThis.localStorage??null}catch{return null}},Xr=i=>Array.isArray(i)?i.filter(e=>typeof e=="string"):[];function ih(i){try{const e=nh(i)?.getItem(th);if(!e)return gl();const t=JSON.parse(e),n=Oo,s=a=>!!vn[a]&&!Ss(a),r=Number(t.world);return{world:Number.isInteger(r)&&r>=0&&r<2147483647?r:0,found:Xr(t.found).filter(s),won:Xr(t.won).filter(n),played:Xr(t.played).filter(n),voyages:(Array.isArray(t.voyages)?t.voyages:[]).filter(a=>a&&typeof a.from=="string"&&typeof a.to=="string"&&n(a.from)&&s(a.to)).map(a=>({from:a.from,to:a.to}))}}catch{return gl()}}function Du(i,e){try{nh(e)?.setItem(th,JSON.stringify(i))}catch{}}function Ov(i,e,t){return t?sh(i,e,{won:!1}):i}function sh(i,e,t){if(!Oo(e))return i;const n={world:i.world,found:[...i.found],won:[...i.won],played:[...i.played],voyages:[...i.voyages]};if(n.played.includes(e)||n.played.push(e),!t.won)return n;n.won.includes(e)||n.won.push(e);for(const s of t.found??[])!vn[s]||Ss(s)||s===e||n.found.includes(s)||(n.found.push(s),n.voyages.push({from:e,to:s}));return n}const Iu=(i,e)=>i.found.filter(t=>!Ss(t)&&!i.played.includes(t)&&t!==e),Uu=i=>["home",...i.found];function Bv(){const i=Object.keys(vn),e=[...i],t=e.map(n=>({from:vn[n].phase===0?"home":Nu(n,i.filter(s=>vn[s].phase===vn[n].phase-1)),to:n}));return{world:0,found:e,won:["home"],played:["home",...pr],voyages:t}}function Nu(i,e){const t=(n,s)=>{const r=Math.abs(((n-s)%360+360)%360);return r>180?360-r:r};return e.reduce((n,s)=>t(vn[s].bearing,vn[i].bearing)<t(vn[n].bearing,vn[i].bearing)?s:n,e[0]??"home")}function zv(i,e,t,n){const s=ih(t);if(n!==void 0&&n!==s.world)return s;const r=sh(s,i,e);return Du(r,t),r}const Fu="modulepreload",Ou=function(i,e){return new URL(i,e).href},_l={},xl=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(t.map(u=>{if(u=Ou(u,n),u in _l)return;_l[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const x=a[g];if(x.href===u&&(!f||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":Fu,f||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),f)return new Promise((g,x)=>{p.addEventListener("load",g),p.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},si=vu,Bu={rise:6,turn:240,height:22,from:-45,shadow:.6,disc:!0},zu=i=>({...Bu,...i.chart?.moon??{}}),vl=i=>Math.max(0,Math.min(.6,i.chart?.edgeBand??.18));function ku(i,e){const t=Math.min(1,Math.max(0,i/Math.max(.01,e.rise))),n=t*t*(3-2*t);return{bearing:e.from+Math.max(0,i-e.rise)*360/Math.max(1,e.turn),height:-4+(e.height+4)*n,risen:n}}const zo="186",Hu=0,Ml=1,Gu=2,mr=1,Vu=2,gs=3,oi=0,Wt=1,en=2,Nn=0,Wi=1,ln=2,Sl=3,yl=4,Wu=5,ki=100,Xu=101,qu=102,Yu=103,$u=104,Ku=200,Zu=201,Ju=202,Qu=203,rh=204,ah=205,ju=206,ef=207,tf=208,nf=209,sf=210,rf=211,af=212,of=213,lf=214,Ba=0,za=1,ka=2,$i=3,Ha=4,Ga=5,Va=6,Wa=7,oh=0,cf=1,hf=2,Sn=0,lh=1,ch=2,hh=3,uh=4,fh=5,dh=6,ph=7,mh=300,li=301,Ki=302,qr=303,Yr=304,Br=306,wr=1e3,In=1001,Xa=1002,yt=1003,uf=1004,Ds=1005,et=1006,$r=1007,ai=1008,Vt=1009,gh=1010,_h=1011,ys=1012,ko=1013,bn=1014,hn=1015,un=1016,Ho=1017,Go=1018,Zi=1020,xh=35902,vh=35899,Mh=1021,Sh=1022,nn=1023,Bn=1026,Kn=1027,As=1028,Vo=1029,ci=1030,Wo=1031,Xo=1033,gr=33776,_r=33777,xr=33778,vr=33779,qa=35840,Ya=35841,$a=35842,Ka=35843,Za=36196,Ja=37492,Qa=37496,ja=37488,eo=37489,Tr=37490,to=37491,no=37808,io=37809,so=37810,ro=37811,ao=37812,oo=37813,lo=37814,co=37815,ho=37816,uo=37817,fo=37818,po=37819,mo=37820,go=37821,_o=36492,xo=36494,vo=36495,Mo=36283,So=36284,Ar=36285,yo=36286,ff=3200,bl=0,df=1,_n="",Qt="srgb",bs="srgb-linear",Rr="linear",st="srgb",Kr=7680,kv=7681,Hv=514,Gv=517,pf=519,mf=512,gf=513,_f=514,qo=515,xf=516,vf=517,Yo=518,Mf=519,yh=35044,Vv=35048,El="300 es",Mn=2e3,Es=2001;function Sf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yf(){const i=Cr("canvas");return i.style.display="block",i}const wl={};function Pr(...i){const e="THREE."+i.shift();console.log(e,...i)}function bh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ie(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function $e(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xi(...i){const e=i.join(" ");e in wl||(wl[e]=!0,Ie(...i))}function bf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ef={[Ba]:za,[ka]:Va,[Ha]:Wa,[$i]:Ga,[za]:Ba,[Va]:ka,[Wa]:Ha,[Ga]:$i};class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tl=1234567;const xs=Math.PI/180,ws=180/Math.PI;function Fn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function $o(i,e){return(i%e+e)%e}function wf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Tf(i,e,t){return i!==e?(t-i)/(e-i):0}function vs(i,e,t){return(1-t)*i+t*e}function Af(i,e,t,n){return vs(i,e,1-Math.exp(-t*n))}function Rf(i,e=1){return e-Math.abs($o(i,e*2)-e)}function Cf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Pf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Lf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Df(i,e){return i+Math.random()*(e-i)}function If(i){return i*(.5-Math.random())}function Uf(i){i!==void 0&&(Tl=i);let e=Tl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Nf(i){return i*xs}function Ff(i){return i*ws}function Of(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Bf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function zf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function kf(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),h=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*f,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const xi={DEG2RAD:xs,RAD2DEG:ws,generateUUID:Fn,clamp:qe,euclideanModulo:$o,mapLinear:wf,inverseLerp:Tf,lerp:vs,damp:Af,pingpong:Rf,smoothstep:Cf,smootherstep:Pf,randInt:Lf,randFloat:Df,randFloatSpread:If,seededRandom:Uf,degToRad:Nf,radToDeg:Ff,isPowerOfTwo:Of,ceilPowerOfTwo:Bf,floorPowerOfTwo:zf,setQuaternionFromProperEuler:kf,normalize:rt,denormalize:cn};class ye{static{ye.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ji{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(f!==x||l!==h||c!==p||u!==g){let m=l*h+c*p+u*g+f*x;m<0&&(h=-h,p=-p,g=-g,x=-x,m=-m);let d=1-o;if(m<.9995){const S=Math.acos(m),R=Math.sin(S);d=Math.sin(d*S)/R,o=Math.sin(o*S)/R,l=l*d+h*o,c=c*d+p*o,u=u*d+g*o,f=f*d+x*o}else{l=l*d+h*o,c=c*d+p*o,u=u*d+g*o,f=f*d+x*o;const S=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=S,c*=S,u*=S,f*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],f=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+l*p-c*h,e[t+1]=l*g+u*h+c*f-o*p,e[t+2]=c*g+u*p+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),f=o(r/2),h=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Al.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Al.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zr.copy(this).projectOnVector(e),this.sub(Zr)}reflect(e){return this.sub(Zr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new H,Al=new ji;class Oe{static{Oe.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],S=s[1],R=s[4],v=s[7],y=s[2],E=s[5],A=s[8];return r[0]=a*x+o*S+l*y,r[3]=a*m+o*R+l*E,r[6]=a*d+o*v+l*A,r[1]=c*x+u*S+f*y,r[4]=c*m+u*R+f*E,r[7]=c*d+u*v+f*A,r[2]=h*x+p*S+g*y,r[5]=h*m+p*R+g*E,r[8]=h*d+p*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,g=t*f+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=f*x,e[1]=(s*c-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=h*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jr.makeScale(e,t)),this}rotate(e){return Xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jr.makeRotation(-e)),this}translate(e,t){return Xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Oe,Rl=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cl=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hf(){const i={enabled:!0,workingColorSpace:bs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(s.r=On(s.r),s.g=On(s.g),s.b=On(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_n?Rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[bs]:{primaries:e,whitePoint:n,transfer:Rr,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:st,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}const Ye=Hf();function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class Gf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=Cr("canvas")),vi.width=e.width,vi.height=e.height;const s=vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(On(t[n]/255)*255):t[n]=On(t[n]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vf=0;class Ko{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Fn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Qr(s[a].image)):r.push(Qr(s[a]))}else r=Qr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let Wf=0;const jr=new H;class It extends ui{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=In,s=In,r=et,a=ai,o=nn,l=Vt,c=It.DEFAULT_ANISOTROPY,u=_n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Fn(),this.name="",this.source=new Ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jr).x}get height(){return this.source.getSize(jr).y}get depth(){return this.source.getSize(jr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wr:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case Xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wr:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case Xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=mh;It.DEFAULT_ANISOTROPY=1;class tt{static{tt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,v=(p+1)/2,y=(d+1)/2,E=(u+h)/4,A=(f+x)/4,M=(g+m)/4;return R>v&&R>y?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=E/n,r=A/n):v>y?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=E/s,r=M/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=A/r,s=M/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-x)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xf extends ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:et,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new It(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:et,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ko(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $t extends Xf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Eh extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class nt{static{nt.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,u,f,h,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,f,h,p,g,x,m)}set(e,t,n,s,r,a,o,l,c,u,f,h,p,g,x,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Mi.setFromMatrixColumn(e,0).length(),r=1/Mi.setFromMatrixColumn(e,1).length(),a=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,p=a*f,g=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,g=c*u,x=c*f;t[0]=h+x*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,g=c*u,x=c*f;t[0]=h-x*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,g=o*u,x=o*f;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+x,t[1]=l*f,t[5]=x*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-h*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+g,t[10]=h-x*f}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+x,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yf,e,$f)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Gn.crossVectors(n,Xt),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Gn.crossVectors(n,Xt)),Gn.normalize(),Is.crossVectors(Xt,Gn),s[0]=Gn.x,s[4]=Is.x,s[8]=Xt.x,s[1]=Gn.y,s[5]=Is.y,s[9]=Xt.y,s[2]=Gn.z,s[6]=Is.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],S=n[3],R=n[7],v=n[11],y=n[15],E=s[0],A=s[4],M=s[8],T=s[12],P=s[1],N=s[5],C=s[9],I=s[13],D=s[2],F=s[6],$=s[10],q=s[14],ne=s[3],Z=s[7],Q=s[11],te=s[15];return r[0]=a*E+o*P+l*D+c*ne,r[4]=a*A+o*N+l*F+c*Z,r[8]=a*M+o*C+l*$+c*Q,r[12]=a*T+o*I+l*q+c*te,r[1]=u*E+f*P+h*D+p*ne,r[5]=u*A+f*N+h*F+p*Z,r[9]=u*M+f*C+h*$+p*Q,r[13]=u*T+f*I+h*q+p*te,r[2]=g*E+x*P+m*D+d*ne,r[6]=g*A+x*N+m*F+d*Z,r[10]=g*M+x*C+m*$+d*Q,r[14]=g*T+x*I+m*q+d*te,r[3]=S*E+R*P+v*D+y*ne,r[7]=S*A+R*N+v*F+y*Z,r[11]=S*M+R*C+v*$+y*Q,r[15]=S*T+R*I+v*q+y*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],g=e[3],x=e[7],m=e[11],d=e[15],S=l*p-c*h,R=o*p-c*f,v=o*h-l*f,y=a*p-c*u,E=a*h-l*u,A=a*f-o*u;return t*(x*S-m*R+d*v)-n*(g*S-m*y+d*E)+s*(g*R-x*y+d*A)-r*(g*v-x*E+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],g=e[12],x=e[13],m=e[14],d=e[15],S=t*o-n*a,R=t*l-s*a,v=t*c-r*a,y=n*l-s*o,E=n*c-r*o,A=s*c-r*l,M=u*x-f*g,T=u*m-h*g,P=u*d-p*g,N=f*m-h*x,C=f*d-p*x,I=h*d-p*m,D=S*I-R*C+v*N+y*P-E*T+A*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/D;return e[0]=(o*I-l*C+c*N)*F,e[1]=(s*C-n*I-r*N)*F,e[2]=(x*A-m*E+d*y)*F,e[3]=(h*E-f*A-p*y)*F,e[4]=(l*P-a*I-c*T)*F,e[5]=(t*I-s*P+r*T)*F,e[6]=(m*v-g*A-d*R)*F,e[7]=(u*A-h*v+p*R)*F,e[8]=(a*C-o*P+c*M)*F,e[9]=(n*P-t*C-r*M)*F,e[10]=(g*E-x*v+d*S)*F,e[11]=(f*v-u*E-p*S)*F,e[12]=(o*T-a*N-l*M)*F,e[13]=(t*N-n*T+s*M)*F,e[14]=(x*R-g*y-m*S)*F,e[15]=(u*y-f*R+h*S)*F,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,g=r*f,x=a*u,m=a*f,d=o*f,S=l*c,R=l*u,v=l*f,y=n.x,E=n.y,A=n.z;return s[0]=(1-(x+d))*y,s[1]=(p+v)*y,s[2]=(g-R)*y,s[3]=0,s[4]=(p-v)*E,s[5]=(1-(h+d))*E,s[6]=(m+S)*E,s[7]=0,s[8]=(g+R)*A,s[9]=(m-S)*A,s[10]=(1-(h+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Mi.set(s[0],s[1],s[2]).length();const o=Mi.set(s[4],s[5],s[6]).length(),l=Mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),rn.copy(this);const c=1/a,u=1/o,f=1/l;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,t.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Mn,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s);let g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Mn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Es)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Mn,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Mn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Es)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new H,rn=new nt,Yf=new H(0,0,0),$f=new H(1,1,1),Gn=new H,Is=new H,Xt=new H,Pl=new nt,Ll=new ji;class hi{constructor(e=0,t=0,n=0,s=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class Zo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kf=0;const Dl=new H,Si=new ji,En=new nt,Us=new H,ns=new H,Zf=new H,Jf=new ji,Il=new H(1,0,0),Ul=new H(0,1,0),Nl=new H(0,0,1),Fl={type:"added"},Qf={type:"removed"},yi={type:"childadded",child:null},ea={type:"childremoved",child:null};class At extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new H,t=new hi,n=new ji,s=new H(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new Oe}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(Il,e)}rotateY(e){return this.rotateOnAxis(Ul,e)}rotateZ(e){return this.rotateOnAxis(Nl,e)}translateOnAxis(e,t){return Dl.copy(e).applyQuaternion(this.quaternion),this.position.add(Dl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Il,e)}translateY(e){return this.translateOnAxis(Ul,e)}translateZ(e){return this.translateOnAxis(Nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Us.copy(e):Us.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(ns,Us,this.up):En.lookAt(Us,ns,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Si.setFromRotationMatrix(En),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fl),yi.child=e,this.dispatchEvent(yi),yi.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qf),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fl),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,Zf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,Jf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}At.DEFAULT_UP=new H(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Hi extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jf={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Hi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function na(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=$o(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=na(a,r,e+1/3),this.g=na(a,r,e),this.b=na(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const n=wh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=qi(e.r),this.g=qi(e.g),this.b=qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Ye.workingToColorSpace(Ft.copy(this),e),Math.round(qe(Ft.r*255,0,255))*65536+Math.round(qe(Ft.g*255,0,255))*256+Math.round(qe(Ft.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Ft.copy(this),t);const n=Ft.r,s=Ft.g,r=Ft.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=Qt){Ye.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,s=Ft.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(Ns);const n=vs(Vn.h,Ns.h,t),s=vs(Vn.s,Ns.s,t),r=vs(Vn.l,Ns.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Ne;Ne.NAMES=wh;class bo extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const an=new H,wn=new H,ia=new H,Tn=new H,bi=new H,Ei=new H,Ol=new H,sa=new H,ra=new H,aa=new H,oa=new tt,la=new tt,ca=new tt;class tn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),an.subVectors(e,t),s.cross(an);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){an.subVectors(s,t),wn.subVectors(n,t),ia.subVectors(e,t);const a=an.dot(an),o=an.dot(wn),l=an.dot(ia),c=wn.dot(wn),u=wn.dot(ia),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Tn.x),l.addScaledVector(a,Tn.y),l.addScaledVector(o,Tn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(e,t),la.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(oa,r.x),a.addScaledVector(la,r.y),a.addScaledVector(ca,r.z),a}static isFrontFacing(e,t,n,s){return an.subVectors(n,t),wn.subVectors(e,t),an.cross(wn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),an.cross(wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;bi.subVectors(s,n),Ei.subVectors(r,n),sa.subVectors(e,n);const l=bi.dot(sa),c=Ei.dot(sa);if(l<=0&&c<=0)return t.copy(n);ra.subVectors(e,s);const u=bi.dot(ra),f=Ei.dot(ra);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(bi,a);aa.subVectors(e,r);const p=bi.dot(aa),g=Ei.dot(aa);if(g>=0&&p<=g)return t.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ei,o);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return Ol.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(Ol,o);const d=1/(m+x+h);return a=x*d,o=h*d,t.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fi{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fs.copy(n.boundingBox)),Fs.applyMatrix4(e.matrixWorld),this.union(Fs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Os.subVectors(this.max,is),wi.subVectors(e.a,is),Ti.subVectors(e.b,is),Ai.subVectors(e.c,is),Wn.subVectors(Ti,wi),Xn.subVectors(Ai,Ti),Qn.subVectors(wi,Ai);let t=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-Qn.z,Qn.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,Qn.z,0,-Qn.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-Qn.y,Qn.x,0];return!ha(t,wi,Ti,Ai,Os)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,wi,Ti,Ai,Os))?!1:(Bs.crossVectors(Wn,Xn),t=[Bs.x,Bs.y,Bs.z],ha(t,wi,Ti,Ai,Os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const An=[new H,new H,new H,new H,new H,new H,new H,new H],on=new H,Fs=new fi,wi=new H,Ti=new H,Ai=new H,Wn=new H,Xn=new H,Qn=new H,is=new H,Os=new H,Bs=new H,jn=new H;function ha(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){jn.fromArray(i,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=e.dot(jn),c=t.dot(jn),u=n.dot(jn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ln=ed();function ed(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function td(i){Math.abs(i)>65504&&Ie("DataUtils.toHalfFloat(): Value out of range."),i=qe(i,-65504,65504),Ln.floatView[0]=i;const e=Ln.uint32View[0],t=e>>23&511;return Ln.baseTable[t]+((e&8388607)>>Ln.shiftTable[t])}function nd(i){const e=i>>10;return Ln.uint32View[0]=Ln.mantissaTable[Ln.offsetTable[e]+(i&1023)]+Ln.exponentTable[e],Ln.floatView[0]}class Eo{static toHalfFloat(e){return td(e)}static fromHalfFloat(e){return nd(e)}}const Et=new H,zs=new ye;let id=0;class vt extends ui{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:id++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=yh,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zs.fromBufferAttribute(this,t),zs.applyMatrix3(e),this.setXY(t,zs.x,zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Th extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ah extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const sd=new fi,ss=new H,ua=new H;class di{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):sd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(ua)),this.expandByPoint(ss.copy(e.center).sub(ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let rd=0;const Zt=new nt,fa=new At,Ri=new H,qt=new fi,rs=new fi,Dt=new H;class St extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sf(e)?Ah:Th)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,n){return Zt.makeTranslation(e,t,n),this.applyMatrix4(Zt),this}scale(e,t,n){return Zt.makeScale(e,t,n),this.applyMatrix4(Zt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(qt.min,rs.min),qt.expandByPoint(Dt),Dt.addVectors(qt.max,rs.max),qt.expandByPoint(Dt)):(qt.expandByPoint(rs.min),qt.expandByPoint(rs.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),Dt.add(Ri)),s=Math.max(s,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let M=0;M<n.count;M++)o[M]=new H,l[M]=new H;const c=new H,u=new H,f=new H,h=new ye,p=new ye,g=new ye,x=new H,m=new H;function d(M,T,P){c.fromBufferAttribute(n,M),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,P),h.fromBufferAttribute(r,M),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),u.sub(c),f.sub(c),p.sub(h),g.sub(h);const N=1/(p.x*g.y-g.x*p.y);isFinite(N)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(N),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(N),o[M].add(x),o[T].add(x),o[P].add(x),l[M].add(m),l[T].add(m),l[P].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let M=0,T=S.length;M<T;++M){const P=S[M],N=P.start,C=P.count;for(let I=N,D=N+C;I<D;I+=3)d(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const R=new H,v=new H,y=new H,E=new H;function A(M){y.fromBufferAttribute(s,M),E.copy(y);const T=o[M];R.copy(T),R.sub(y.multiplyScalar(y.dot(T))).normalize(),v.crossVectors(E,T);const N=v.dot(l[M])<0?-1:1;a.setXYZW(M,R.x,R.y,R.z,N)}for(let M=0,T=S.length;M<T;++M){const P=S[M],N=P.start,C=P.count;for(let I=N,D=N+C;I<D;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new H,r=new H,a=new H,o=new H,l=new H,c=new H,u=new H,f=new H;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new vt(h,u,f)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ad{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=yh,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Bt=new H;class Lr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Lr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const da=new H,od=new H,ld=new Oe;class Pn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=da.subVectors(n,t).cross(od.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(da),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ld.getNormalMatrix(e),s=this.coplanarPoint(da).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let cd=0;class pi extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=Wi,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=ah,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ne().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class hd extends pi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ci;const as=new H,Pi=new H,Li=new H,Di=new ye,os=new ye,Rh=new nt,ks=new H,ls=new H,Hs=new H,Bl=new ye,pa=new ye,zl=new ye;class Wv extends At{constructor(e=new hd){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new St;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ad(t,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new Lr(n,3,0,!1)),Ci.setAttribute("uv",new Lr(n,2,3,!1))}this.geometry=Ci,this.material=e,this.center=new ye(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),Rh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Li.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Li.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Gs(ks.set(-.5,-.5,0),Li,a,Pi,s,r),Gs(ls.set(.5,-.5,0),Li,a,Pi,s,r),Gs(Hs.set(.5,.5,0),Li,a,Pi,s,r),Bl.set(0,0),pa.set(1,0),zl.set(1,1);let o=e.ray.intersectTriangle(ks,ls,Hs,!1,as);if(o===null&&(Gs(ls.set(-.5,.5,0),Li,a,Pi,s,r),pa.set(0,1),o=e.ray.intersectTriangle(ks,Hs,ls,!1,as),o===null))return;const l=e.ray.origin.distanceTo(as);l<e.near||l>e.far||t.push({distance:l,point:as.clone(),uv:tn.getInterpolation(as,ks,ls,Hs,Bl,pa,zl,new ye),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Gs(i,e,t,n,s,r){Di.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(os.x=r*Di.x-s*Di.y,os.y=s*Di.x+r*Di.y):os.copy(Di),i.copy(e),i.x+=os.x,i.y+=os.y,i.applyMatrix4(Rh)}const Rn=new H,ma=new H,Vs=new H,Ws=new H;class zr{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Rn.copy(this.origin).addScaledVector(this.direction,t),Rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ma.copy(e).add(t).multiplyScalar(.5),Vs.copy(t).sub(e).normalize(),Ws.copy(this.origin).sub(ma);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Vs),o=Ws.dot(this.direction),l=-Ws.dot(Vs),c=Ws.lengthSq(),u=Math.abs(1-a*a);let f,h,p,g;if(u>0)if(f=a*l-o,h=a*o-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const x=1/u;f*=x,h*=x,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ma).addScaledVector(Vs,h),p}intersectSphere(e,t){if(e.radius<0)return null;Rn.subVectors(e.center,this.origin);const n=Rn.dot(this.direction),s=Rn.dot(Rn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Rn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,h=e.y-a.y,p=e.z-a.z,g=t.x-a.x,x=t.y-a.y,m=t.z-a.z,d=n.x-a.x,S=n.y-a.y,R=n.z-a.z,v=Math.abs(l),y=Math.abs(c),E=Math.abs(u);let A,M,T,P,N,C,I,D,F,$,q,ne;if(v>=y&&v>=E?(T=l,C=f,F=g,ne=d,l>=0?(A=c,M=u,P=h,N=p,I=x,D=m,$=S,q=R):(A=u,M=c,P=p,N=h,I=m,D=x,$=R,q=S)):y>=E?(T=c,C=h,F=x,ne=S,c>=0?(A=u,M=l,P=p,N=f,I=m,D=g,$=R,q=d):(A=l,M=u,P=f,N=p,I=g,D=m,$=d,q=R)):(T=u,C=p,F=m,ne=R,u>=0?(A=l,M=c,P=f,N=h,I=g,D=x,$=d,q=S):(A=c,M=l,P=h,N=f,I=x,D=g,$=S,q=d)),T===0)return null;const Z=A/T,Q=M/T,te=1/T,Se=P-Z*C,_e=N-Q*C,Ze=I-Z*F,ze=D-Q*F,Me=$-Z*ne,G=q-Q*ne,K=Me*ze-G*Ze,le=Se*G-_e*Me,we=Ze*_e-ze*Se;if(s){if(K<0||le<0||we<0)return null}else if((K<0||le<0||we<0)&&(K>0||le>0||we>0))return null;const ae=K+le+we;if(ae===0)return null;const Ue=te*(K*C+le*F+we*ne);return(ae>0?Ue<0:Ue>0)?null:this.at(Ue/ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cn extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const kl=new nt,ei=new zr,Xs=new di,Hl=new H,qs=new H,Ys=new H,$s=new H,ga=new H,Ks=new H,Gl=new H,Zs=new H;class ot extends At{constructor(e=new St,t=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ks.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(ga.fromBufferAttribute(f,e),a?Ks.addScaledVector(ga,u):Ks.addScaledVector(ga.sub(t),u))}t.add(Ks)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),ei.copy(e.ray).recast(e.near),!(Xs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Xs,Hl)===null||ei.origin.distanceToSquared(Hl)>(e.far-e.near)**2))&&(kl.copy(r).invert(),ei.copy(e.ray).applyMatrix4(kl),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,y=R;v<y;v+=3){const E=o.getX(v),A=o.getX(v+1),M=o.getX(v+2);s=Js(this,d,e,n,c,u,f,E,A,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const S=o.getX(m),R=o.getX(m+1),v=o.getX(m+2);s=Js(this,a,e,n,c,u,f,S,R,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),R=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,y=R;v<y;v+=3){const E=v,A=v+1,M=v+2;s=Js(this,d,e,n,c,u,f,E,A,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const S=m,R=m+1,v=m+2;s=Js(this,a,e,n,c,u,f,S,R,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function ud(i,e,t,n,s,r,a,o){let l;if(e.side===Wt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===oi,o),l===null)return null;Zs.copy(o),Zs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Zs);return c<t.near||c>t.far?null:{distance:c,point:Zs.clone(),object:i}}function Js(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,qs),i.getVertexPosition(l,Ys),i.getVertexPosition(c,$s);const u=ud(i,e,t,n,qs,Ys,$s,Gl);if(u){const f=new H;tn.getBarycoord(Gl,qs,Ys,$s,f),s&&(u.uv=tn.getInterpolatedAttribute(s,o,l,c,f,new ye)),r&&(u.uv1=tn.getInterpolatedAttribute(r,o,l,c,f,new ye)),a&&(u.normal=tn.getInterpolatedAttribute(a,o,l,c,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new H,materialIndex:0};tn.getNormal(qs,Ys,$s,h.normal),u.face=h,u.barycoord=f}return u}class mi extends It{constructor(e=null,t=1,n=1,s,r,a,o,l,c=yt,u=yt,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vl extends vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ii=new nt,Wl=new nt,Qs=[],Xl=new fi,fd=new nt,cs=new ot,hs=new di;class Xv extends ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,fd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),Xl.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(Xl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),hs.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hs.copy(this.boundingSphere),hs.applyMatrix4(n),e.ray.intersectsSphere(hs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ii),Wl.multiplyMatrices(n,Ii),cs.matrixWorld=Wl,cs.raycast(e,Qs);for(let a=0,o=Qs.length;a<o;a++){const l=Qs[a];l.instanceId=r,l.object=this,t.push(l)}Qs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Vl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mi(new Float32Array(s*this.count),s,this.count,As,hn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ti=new di,dd=new ye(.5,.5),js=new H;class Jo{constructor(e=new Pn,t=new Pn,n=new Pn,s=new Pn,r=new Pn,a=new Pn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],g=r[8],x=r[9],m=r[10],d=r[11],S=r[12],R=r[13],v=r[14],y=r[15];if(s[0].setComponents(c-a,p-u,d-g,y-S).normalize(),s[1].setComponents(c+a,p+u,d+g,y+S).normalize(),s[2].setComponents(c+o,p+f,d+x,y+R).normalize(),s[3].setComponents(c-o,p-f,d-x,y-R).normalize(),n)s[4].setComponents(l,h,m,v).normalize(),s[5].setComponents(c-l,p-h,d-m,y-v).normalize();else if(s[4].setComponents(c-l,p-h,d-m,y-v).normalize(),t===Mn)s[5].setComponents(c+l,p+h,d+m,y+v).normalize();else if(t===Es)s[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){ti.center.set(0,0,0);const t=dd.distanceTo(e.center);return ti.radius=.7071067811865476+t,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(js.x=s.normal.x>0?e.max.x:e.min.x,js.y=s.normal.y>0?e.max.y:e.min.y,js.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(js)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pd extends pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dr=new H,Ir=new H,ql=new nt,us=new zr,er=new di,_a=new H,Yl=new H;class md extends At{constructor(e=new St,t=new pd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Dr.fromBufferAttribute(t,s-1),Ir.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Dr.distanceTo(Ir);e.setAttribute("lineDistance",new _t(n,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(s),er.radius+=r,e.ray.intersectsSphere(er)===!1)return;ql.copy(s).invert(),us.copy(e.ray).applyMatrix4(ql);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=c){const d=u.getX(x),S=u.getX(x+1),R=tr(this,e,us,l,d,S,x);R&&t.push(R)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(p),d=tr(this,e,us,l,x,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=c){const d=tr(this,e,us,l,x,x+1,x);d&&t.push(d)}if(this.isLineLoop){const x=tr(this,e,us,l,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function tr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Dr.fromBufferAttribute(o,s),Ir.fromBufferAttribute(o,r),t.distanceSqToSegment(Dr,Ir,_a,Yl)>n)return;_a.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_a);if(!(c<e.near||c>e.far))return{distance:c,point:Yl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const $l=new H,Kl=new H;class qv extends md{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)$l.fromBufferAttribute(t,s),Kl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$l.distanceTo(Kl);e.setAttribute("lineDistance",new _t(n,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gd extends pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zl=new nt,wo=new zr,nr=new di,ir=new H;class Yv extends At{constructor(e=new St,t=new gd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,e.ray.intersectsSphere(nr)===!1)return;Zl.copy(s).invert(),wo.copy(e.ray).applyMatrix4(Zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,x=p;g<x;g++){const m=c.getX(g);ir.fromBufferAttribute(f,m),Jl(ir,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=h,x=p;g<x;g++)ir.fromBufferAttribute(f,g),Jl(ir,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jl(i,e,t,n,s,r,a){const o=wo.distanceSqToPoint(i);if(o<t){const l=new H;wo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ch extends It{constructor(e=[],t=li,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $v extends It{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ji extends It{constructor(e,t,n=bn,s,r,a,o=yt,l=yt,c,u=Bn,f=1){if(u!==Bn&&u!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class _d extends Ji{constructor(e,t=bn,n=li,s,r,a=yt,o=yt,l,c=Bn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ph extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rs extends St{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(f,2));function g(x,m,d,S,R,v,y,E,A,M,T){const P=v/A,N=y/M,C=v/2,I=y/2,D=E/2,F=A+1,$=M+1;let q=0,ne=0;const Z=new H;for(let Q=0;Q<$;Q++){const te=Q*N-I;for(let Se=0;Se<F;Se++){const _e=Se*P-C;Z[x]=_e*S,Z[m]=te*R,Z[d]=D,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[d]=E>0?1:-1,u.push(Z.x,Z.y,Z.z),f.push(Se/A),f.push(1-Q/M),q+=1}}for(let Q=0;Q<M;Q++)for(let te=0;te<A;te++){const Se=h+te+F*Q,_e=h+te+F*(Q+1),Ze=h+(te+1)+F*(Q+1),ze=h+(te+1)+F*Q;l.push(Se,_e,ze),l.push(_e,Ze,ze),ne+=6}o.addGroup(p,ne,T),p+=ne,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ur extends St{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new H,u=new ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const p=n+f/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(o,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Qo extends St{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],p=[];let g=0;const x=[],m=n/2;let d=0;S(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new _t(f,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(p,2));function S(){const v=new H,y=new H;let E=0;const A=(t-e)/n;for(let M=0;M<=r;M++){const T=[],P=M/r,N=P*(t-e)+e;for(let C=0;C<=s;C++){const I=C/s,D=I*l+o,F=Math.sin(D),$=Math.cos(D);y.x=N*F,y.y=-P*n+m,y.z=N*$,f.push(y.x,y.y,y.z),v.set(F,A,$).normalize(),h.push(v.x,v.y,v.z),p.push(I,1-P),T.push(g++)}x.push(T)}for(let M=0;M<s;M++)for(let T=0;T<r;T++){const P=x[T][M],N=x[T+1][M],C=x[T+1][M+1],I=x[T][M+1];(e>0||T!==0)&&(u.push(P,N,I),E+=3),(t>0||T!==r-1)&&(u.push(N,C,I),E+=3)}c.addGroup(d,E,0),d+=E}function R(v){const y=g,E=new ye,A=new H;let M=0;const T=v===!0?e:t,P=v===!0?1:-1;for(let C=1;C<=s;C++)f.push(0,m*P,0),h.push(0,P,0),p.push(.5,.5),g++;const N=g;for(let C=0;C<=s;C++){const D=C/s*l+o,F=Math.cos(D),$=Math.sin(D);A.x=T*$,A.y=m*P,A.z=T*F,f.push(A.x,A.y,A.z),h.push(0,P,0),E.x=F*.5+.5,E.y=$*.5*P+.5,p.push(E.x,E.y),g++}for(let C=0;C<s;C++){const I=y+C,D=N+C;v===!0?u.push(D,D+1,I):u.push(D+1,D,I),M+=3}c.addGroup(d,M,v===!0?1:2),d+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Un extends St{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,f=e/o,h=t/l,p=[],g=[],x=[],m=[];for(let d=0;d<u;d++){const S=d*h-a;for(let R=0;R<c;R++){const v=R*f-r;g.push(v,-S,0),x.push(0,0,1),m.push(R/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<o;S++){const R=S+c*d,v=S+c*(d+1),y=S+1+c*(d+1),E=S+1+c*d;p.push(R,v,E),p.push(v,y,E)}this.setIndex(p),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.width,e.height,e.widthSegments,e.heightSegments)}}class Nr extends St{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let f=e;const h=(t-e)/s,p=new H,g=new ye;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let x=0;x<s;x++){const m=x*(n+1);for(let d=0;d<n;d++){const S=d+m,R=S,v=S+n+1,y=S+n+2,E=S+1;o.push(R,v,E),o.push(v,y,E)}}this.setIndex(o),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Ql(s))s.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Ql(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const s in n)e[s]=n[s]}return e}function Ql(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function xd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const vd={clone:Qi,merge:zt};var Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=xd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ne().setHex(s.value);break;case"v2":this.uniforms[n].value=new ye().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new tt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new nt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class yd extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bd extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ed extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Dh extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class wd extends Dh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const xa=new nt,jl=new H,ec=new H;class Td{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jo,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;jl.setFromMatrixPosition(e.matrixWorld),t.position.copy(jl),ec.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ec),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(xa,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Es||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sr=new H,rr=new ji,pn=new H;class Ih extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(sr,rr,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,pn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(sr,rr,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qn=new H,tc=new ye,nc=new ye;class jt extends Ih{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,tc,nc),t.subVectors(nc,tc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class kr extends Ih{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ad extends Td{constructor(){super(new kr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rd extends Dh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Ad}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Kv extends St{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ui=-90,Ni=1;class Cd extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const r=new jt(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const a=new jt(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const o=new jt(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const l=new jt(Ui,Ni,e,t);l.layers=this.layers,this.add(l);const c=new jt(Ui,Ni,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Es)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pd extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ic=new nt;class Ld{constructor(e,t,n=0,s=1/0){this.ray=new zr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Zo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ic.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ic),this}intersectObject(e,t=!0,n=[]){return To(e,this,n,t),n.sort(sc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)To(e[s],this,n,t);return n.sort(sc),n}}function sc(i,e){return i.distance-e.distance}function To(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)To(r[a],e,t,!0)}}class Uh{static{Uh.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function rc(i,e,t,n){const s=Dd(n);switch(t){case Mh:return i*e;case As:return i*e/s.components*s.byteLength;case Vo:return i*e/s.components*s.byteLength;case ci:return i*e*2/s.components*s.byteLength;case Wo:return i*e*2/s.components*s.byteLength;case Sh:return i*e*3/s.components*s.byteLength;case nn:return i*e*4/s.components*s.byteLength;case Xo:return i*e*4/s.components*s.byteLength;case gr:case _r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xr:case vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:case Ka:return Math.max(i,16)*Math.max(e,8)/4;case qa:case $a:return Math.max(i,8)*Math.max(e,8)/2;case Za:case Ja:case ja:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qa:case Tr:case to:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case io:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ao:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case oo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ho:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case uo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case _o:case xo:case vo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Mo:case So:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ar:case yo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dd(i){switch(i){case Vt:case gh:return{byteLength:1,components:1};case ys:case _h:case un:return{byteLength:2,components:1};case Ho:case Go:return{byteLength:2,components:4};case bn:case ko:case hn:return{byteLength:4,components:1};case xh:case vh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zo}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zo);function Nh(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Id(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,f[h]=x)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ud=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nd=`#ifdef USE_ALPHAHASH
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
#endif`,Fd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Od=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kd=`#ifdef USE_AOMAP
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
#endif`,Hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gd=`#ifdef USE_BATCHING
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
#endif`,Vd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yd=`#ifdef USE_IRIDESCENCE
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
#endif`,$d=`#ifdef USE_BUMPMAP
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
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,np=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ip=`#define PI 3.141592653589793
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
} // validated`,sp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rp=`vec3 transformedNormal = objectNormal;
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
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,op=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",up=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fp=`#ifdef USE_ENVMAP
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
#endif`,dp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sp=`#ifdef USE_GRADIENTMAP
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
}`,yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lp=`PhysicalMaterial material;
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
#endif`,Dp=`uniform sampler2D dfgLUT;
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
}`,Ip=`
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
#endif`,Up=`#if defined( RE_IndirectDiffuse )
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wp=`#if defined( USE_POINTS_UV )
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
#endif`,Xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zp=`#ifdef USE_MORPHTARGETS
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
#endif`,Jp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,im=`#ifdef USE_NORMALMAP
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
#endif`,sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,am=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,om=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,um=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vm=`float getShadowMask() {
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
}`,Mm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sm=`#ifdef USE_SKINNING
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
#endif`,ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bm=`#ifdef USE_SKINNING
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
#endif`,Em=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Am=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rm=`#ifdef USE_TRANSMISSION
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
#endif`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Um=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,Fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Om=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`#include <common>
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
}`,Hm=`#if DEPTH_PACKING == 3200
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
}`,Gm=`#define DISTANCE
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
}`,Vm=`#define DISTANCE
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
}`,Wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qm=`uniform float scale;
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
}`,Ym=`uniform vec3 diffuse;
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
}`,$m=`#include <common>
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
}`,Km=`uniform vec3 diffuse;
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
}`,Zm=`#define LAMBERT
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
}`,Jm=`#define LAMBERT
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
}`,Qm=`#define MATCAP
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
}`,jm=`#define MATCAP
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
}`,e0=`#define NORMAL
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
}`,t0=`#define NORMAL
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
}`,n0=`#define PHONG
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
}`,i0=`#define PHONG
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
}`,s0=`#define STANDARD
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
}`,r0=`#define STANDARD
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
}`,a0=`#define TOON
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
}`,o0=`#define TOON
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
}`,l0=`uniform float size;
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
}`,c0=`uniform vec3 diffuse;
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
}`,h0=`#include <common>
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
}`,u0=`uniform vec3 color;
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
}`,f0=`uniform float rotation;
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
}`,d0=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Ud,alphahash_pars_fragment:Nd,alphamap_fragment:Fd,alphamap_pars_fragment:Od,alphatest_fragment:Bd,alphatest_pars_fragment:zd,aomap_fragment:kd,aomap_pars_fragment:Hd,batching_pars_vertex:Gd,batching_vertex:Vd,begin_vertex:Wd,beginnormal_vertex:Xd,bsdfs:qd,iridescence_fragment:Yd,bumpmap_pars_fragment:$d,clipping_planes_fragment:Kd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Jd,clipping_planes_vertex:Qd,color_fragment:jd,color_pars_fragment:ep,color_pars_vertex:tp,color_vertex:np,common:ip,cube_uv_reflection_fragment:sp,defaultnormal_vertex:rp,displacementmap_pars_vertex:ap,displacementmap_vertex:op,emissivemap_fragment:lp,emissivemap_pars_fragment:cp,colorspace_fragment:hp,colorspace_pars_fragment:up,envmap_fragment:fp,envmap_common_pars_fragment:dp,envmap_pars_fragment:pp,envmap_pars_vertex:mp,envmap_physical_pars_fragment:Tp,envmap_vertex:gp,fog_vertex:_p,fog_pars_vertex:xp,fog_fragment:vp,fog_pars_fragment:Mp,gradientmap_pars_fragment:Sp,lightmap_pars_fragment:yp,lights_lambert_fragment:bp,lights_lambert_pars_fragment:Ep,lights_pars_begin:wp,lights_toon_fragment:Ap,lights_toon_pars_fragment:Rp,lights_phong_fragment:Cp,lights_phong_pars_fragment:Pp,lights_physical_fragment:Lp,lights_physical_pars_fragment:Dp,lights_fragment_begin:Ip,lights_fragment_maps:Up,lights_fragment_end:Np,lightprobes_pars_fragment:Fp,logdepthbuf_fragment:Op,logdepthbuf_pars_fragment:Bp,logdepthbuf_pars_vertex:zp,logdepthbuf_vertex:kp,map_fragment:Hp,map_pars_fragment:Gp,map_particle_fragment:Vp,map_particle_pars_fragment:Wp,metalnessmap_fragment:Xp,metalnessmap_pars_fragment:qp,morphinstance_vertex:Yp,morphcolor_vertex:$p,morphnormal_vertex:Kp,morphtarget_pars_vertex:Zp,morphtarget_vertex:Jp,normal_fragment_begin:Qp,normal_fragment_maps:jp,normal_pars_fragment:em,normal_pars_vertex:tm,normal_vertex:nm,normalmap_pars_fragment:im,clearcoat_normal_fragment_begin:sm,clearcoat_normal_fragment_maps:rm,clearcoat_pars_fragment:am,iridescence_pars_fragment:om,opaque_fragment:lm,packing:cm,premultiplied_alpha_fragment:hm,project_vertex:um,dithering_fragment:fm,dithering_pars_fragment:dm,roughnessmap_fragment:pm,roughnessmap_pars_fragment:mm,shadowmap_pars_fragment:gm,shadowmap_pars_vertex:_m,shadowmap_vertex:xm,shadowmask_pars_fragment:vm,skinbase_vertex:Mm,skinning_pars_vertex:Sm,skinning_vertex:ym,skinnormal_vertex:bm,specularmap_fragment:Em,specularmap_pars_fragment:wm,tonemapping_fragment:Tm,tonemapping_pars_fragment:Am,transmission_fragment:Rm,transmission_pars_fragment:Cm,uv_pars_fragment:Pm,uv_pars_vertex:Lm,uv_vertex:Dm,worldpos_vertex:Im,background_vert:Um,background_frag:Nm,backgroundCube_vert:Fm,backgroundCube_frag:Om,cube_vert:Bm,cube_frag:zm,depth_vert:km,depth_frag:Hm,distance_vert:Gm,distance_frag:Vm,equirect_vert:Wm,equirect_frag:Xm,linedashed_vert:qm,linedashed_frag:Ym,meshbasic_vert:$m,meshbasic_frag:Km,meshlambert_vert:Zm,meshlambert_frag:Jm,meshmatcap_vert:Qm,meshmatcap_frag:jm,meshnormal_vert:e0,meshnormal_frag:t0,meshphong_vert:n0,meshphong_frag:i0,meshphysical_vert:s0,meshphysical_frag:r0,meshtoon_vert:a0,meshtoon_frag:o0,points_vert:l0,points_frag:c0,shadow_vert:h0,shadow_frag:u0,sprite_vert:f0,sprite_frag:d0},de={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},gn={basic:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:zt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:zt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ne(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:zt([de.points,de.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:zt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:zt([de.common,de.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:zt([de.sprite,de.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:zt([de.common,de.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:zt([de.lights,de.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};gn.physical={uniforms:zt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const ar={r:0,b:0,g:0},p0=new nt,Fh=new Oe;Fh.set(-1,0,0,0,1,0,0,0,1);function m0(i,e,t,n,s,r){const a=new Ne(0);let o=s===!0?0:1,l,c,u=null,f=0,h=null;function p(S){let R=S.isScene===!0?S.background:null;if(R&&R.isTexture){const v=S.backgroundBlurriness>0;R=e.get(R,v)}return R}function g(S){let R=!1;const v=p(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),R=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(S,R){const v=p(R);v&&(v.isCubeTexture||v.mapping===Br)?(c===void 0&&(c=new ot(new Rs(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:Qi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(p0.makeRotationFromEuler(R.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Fh),c.material.toneMapped=Ye.getTransfer(v.colorSpace)!==st,(u!==v||f!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ot(new Un(2,2),new Tt({name:"BackgroundMaterial",uniforms:Qi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(v.colorSpace)!==st,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,h=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,R){S.getRGB(ar,Lh(i)),t.buffers.color.setClear(ar.r,ar.g,ar.b,R,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,R=1){a.set(S),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:x,dispose:d}}function g0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(N,C,I,D,F){let $=!1;const q=f(N,D,I,C);r!==q&&(r=q,c(r.object)),$=p(N,D,I,F),$&&g(N,D,I,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,v(N,C,I,D),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function f(N,C,I,D){const F=D.wireframe===!0;let $=n[C.id];$===void 0&&($={},n[C.id]=$);const q=N.isInstancedMesh===!0?N.id:0;let ne=$[q];ne===void 0&&(ne={},$[q]=ne);let Z=ne[I.id];Z===void 0&&(Z={},ne[I.id]=Z);let Q=Z[F];return Q===void 0&&(Q=h(l()),Z[F]=Q),Q}function h(N){const C=[],I=[],D=[];for(let F=0;F<t;F++)C[F]=0,I[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:D,object:N,attributes:{},index:null}}function p(N,C,I,D){const F=r.attributes,$=C.attributes;let q=0;const ne=I.getAttributes();for(const Z in ne)if(ne[Z].location>=0){const te=F[Z];let Se=$[Z];if(Se===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(Se=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(Se=N.instanceColor)),te===void 0||te.attribute!==Se||Se&&te.data!==Se.data)return!0;q++}return r.attributesNum!==q||r.index!==D}function g(N,C,I,D){const F={},$=C.attributes;let q=0;const ne=I.getAttributes();for(const Z in ne)if(ne[Z].location>=0){let te=$[Z];te===void 0&&(Z==="instanceMatrix"&&N.instanceMatrix&&(te=N.instanceMatrix),Z==="instanceColor"&&N.instanceColor&&(te=N.instanceColor));const Se={};Se.attribute=te,te&&te.data&&(Se.data=te.data),F[Z]=Se,q++}r.attributes=F,r.attributesNum=q,r.index=D}function x(){const N=r.newAttributes;for(let C=0,I=N.length;C<I;C++)N[C]=0}function m(N){d(N,0)}function d(N,C){const I=r.newAttributes,D=r.enabledAttributes,F=r.attributeDivisors;I[N]=1,D[N]===0&&(i.enableVertexAttribArray(N),D[N]=1),F[N]!==C&&(i.vertexAttribDivisor(N,C),F[N]=C)}function S(){const N=r.newAttributes,C=r.enabledAttributes;for(let I=0,D=C.length;I<D;I++)C[I]!==N[I]&&(i.disableVertexAttribArray(I),C[I]=0)}function R(N,C,I,D,F,$,q){q===!0?i.vertexAttribIPointer(N,C,I,F,$):i.vertexAttribPointer(N,C,I,D,F,$)}function v(N,C,I,D){x();const F=D.attributes,$=I.getAttributes(),q=C.defaultAttributeValues;for(const ne in $){const Z=$[ne];if(Z.location>=0){let Q=F[ne];if(Q===void 0&&(ne==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),ne==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){const te=Q.normalized,Se=Q.itemSize,_e=e.get(Q);if(_e===void 0)continue;const Ze=_e.buffer,ze=_e.type,Me=_e.bytesPerElement,G=ze===i.INT||ze===i.UNSIGNED_INT||Q.gpuType===ko;if(Q.isInterleavedBufferAttribute){const K=Q.data,le=K.stride,we=Q.offset;if(K.isInstancedInterleavedBuffer){for(let ae=0;ae<Z.locationSize;ae++)d(Z.location+ae,K.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ae=0;ae<Z.locationSize;ae++)m(Z.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let ae=0;ae<Z.locationSize;ae++)R(Z.location+ae,Se/Z.locationSize,ze,te,le*Me,(we+Se/Z.locationSize*ae)*Me,G)}else{if(Q.isInstancedBufferAttribute){for(let K=0;K<Z.locationSize;K++)d(Z.location+K,Q.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let K=0;K<Z.locationSize;K++)m(Z.location+K);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let K=0;K<Z.locationSize;K++)R(Z.location+K,Se/Z.locationSize,ze,te,Se*Me,Se/Z.locationSize*K*Me,G)}}else if(q!==void 0){const te=q[ne];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(Z.location,te);break;case 3:i.vertexAttrib3fv(Z.location,te);break;case 4:i.vertexAttrib4fv(Z.location,te);break;default:i.vertexAttrib1fv(Z.location,te)}}}}S()}function y(){T();for(const N in n){const C=n[N];for(const I in C){const D=C[I];for(const F in D){const $=D[F];for(const q in $)u($[q].object),delete $[q];delete D[F]}}delete n[N]}}function E(N){if(n[N.id]===void 0)return;const C=n[N.id];for(const I in C){const D=C[I];for(const F in D){const $=D[F];for(const q in $)u($[q].object),delete $[q];delete D[F]}}delete n[N.id]}function A(N){for(const C in n){const I=n[C];for(const D in I){const F=I[D];if(F[N.id]===void 0)continue;const $=F[N.id];for(const q in $)u($[q].object),delete $[q];delete F[N.id]}}}function M(N){for(const C in n){const I=n[C],D=N.isInstancedMesh===!0?N.id:0,F=I[D];if(F!==void 0){for(const $ in F){const q=F[$];for(const ne in q)u(q[ne].object),delete q[ne];delete F[$]}delete I[D],Object.keys(I).length===0&&delete n[C]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function _0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function x0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const M=A===un&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Vt&&A!==hn&&!M&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ie("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:R,maxFragmentUniforms:v,maxSamples:y,samples:E}}function v0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Pn,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:n,R=S*4;let v=d.clippingState||null;l.value=v,v=u(g,h,R,p);for(let y=0;y!==R;++y)v[y]=t[y];d.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,p,g){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const d=p+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let R=0,v=p;R!==x;++R,v+=4)a.copy(f[R]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Gi=4,M0=6,S0=20,y0=256,fs=new kr,ac=new Ne;let va=null,Ma=0,Sa=0,ya=!1;const b0=new H,ni=new H;class oc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=b0}=r;va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(va,Ma,Sa),this._renderer.xr.enabled=ya,e.scissorTest=!1,Fi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===li||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Sa=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:et,minFilter:et,generateMipmaps:!1,type:un,format:nn,colorSpace:bs,depthBuffer:!1},s=lc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=E0(r)),this._blurMaterial=T0(r,e,t),this._ggxMaterial=w0(r,e,t)}return s}_compileMaterial(e){const t=new ot(new St,e);this._renderer.compile(t,fs)}_sceneToCubeUV(e,t,n,s,r){const l=new jt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(ac),f.toneMapping=Sn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ot(new Rs,new Cn({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let d=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,d=!0):(m.color.copy(ac),d=!0);for(let R=0;R<6;R++){const v=R%3;v===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):v===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));const y=this._cubeSize;Fi(s,v*y,R>2?y:0,y,y),f.setRenderTarget(s),d&&f.render(x,l),f.render(e,l)}f.toneMapping=p,f.autoClear=h,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===li||e.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Fi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,fs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,p=f*h,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Gi?n-g+Gi:0),d=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,Fi(r,m,d,3*x,2*x),s.setRenderTarget(r),s.render(o,fs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Fi(e,m,d,3*x,2*x),s.setRenderTarget(e),s.render(o,fs)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Gi?s-this._lodMax+Gi:0),h=4*(this._cubeSize-u);Fi(t,f,h,3*u,2*u),a.setRenderTarget(t),a.render(l,fs)}}function E0(i){const e=[],t=[];let n=i;const s=i-Gi+1+M0;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,p=3,g=new Float32Array(p*h*f),x=new Float32Array(p*h*f);for(let d=0;d<f;d++){const S=d%3*2/3-1,R=d>2?0:-1,v=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];g.set(v,p*h*d);for(let y=0;y<h;y++){const E=u[y*2]*2-1,A=u[y*2+1]*2-1;d===0?ni.set(1,A,E):d===1?ni.set(-E,1,-A):d===2?ni.set(-E,A,1):d===3?ni.set(-1,A,-E):d===4?ni.set(-E,-1,A):ni.set(E,A,-1),ni.toArray(x,(d*h+y)*p)}}const m=new St;m.setAttribute("position",new vt(g,p)),m.setAttribute("outputDirection",new vt(x,p)),t.push(new ot(m,null)),n>Gi&&n--}return{lodMeshes:t,sizeLods:e}}function lc(i,e,t){const n=new $t(i,e,t);return n.texture.mapping=Br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function w0(i,e,t){return new Tt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:y0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function T0(i,e,t){return new Tt({name:"SphericalGaussianBlur",defines:{SAMPLES:S0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Hr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function cc(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function hc(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Hr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Oh extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ch(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Rs(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Nn});r.uniforms.tEquirect.value=t;const a=new ot(s,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=et),new Cd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function A0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===qr||p===Yr)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new Oh(g.height);return x.fromEquirectangularTexture(i,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===qr||p===Yr,x=p===li||p===Ki;if(g||x){let m=t.get(h);const d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new oc(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||x&&S&&l(S)?(n===null&&(n=new oc(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===qr?h.mapping=li:p===Yr&&(h.mapping=Ki),h}function l(h){let p=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function R0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Xi("WebGLRenderer: "+n+" extension not supported."),s}}}function C0(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const S=p.array;x=p.version;for(let R=0,v=S.length;R<v;R+=3){const y=S[R+0],E=S[R+1],A=S[R+2];h.push(y,E,E,A,A,y)}}else{const S=g.array;x=g.version;for(let R=0,v=S.length/3-1;R<v;R+=3){const y=R+0,E=R+1,A=R+2;h.push(y,E,E,A,A,y)}}const m=new(g.count>=65535?Ah:Th)(h,1);m.version=x;const d=r.get(f);d&&e.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function P0(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){i.drawElements(n,h,r,f*a),t.update(h,n,1)}function c(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*a,p),t.update(h,n,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let x=0;for(let m=0;m<p;m++)x+=h[m];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function L0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function D0(i,e,t){const n=new WeakMap,s=new tt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let T=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let R=0;p===!0&&(R=1),g===!0&&(R=2),x===!0&&(R=3);let v=o.attributes.position.count*R,y=1;v>e.maxTextureSize&&(y=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const E=new Float32Array(v*y*4*f),A=new Eh(E,v,y,f);A.type=hn,A.needsUpdate=!0;const M=R*4;for(let P=0;P<f;P++){const N=m[P],C=d[P],I=S[P],D=v*y*4*P;for(let F=0;F<N.count;F++){const $=F*M;p===!0&&(s.fromBufferAttribute(N,F),E[D+$+0]=s.x,E[D+$+1]=s.y,E[D+$+2]=s.z,E[D+$+3]=0),g===!0&&(s.fromBufferAttribute(C,F),E[D+$+4]=s.x,E[D+$+5]=s.y,E[D+$+6]=s.z,E[D+$+7]=0),x===!0&&(s.fromBufferAttribute(I,F),E[D+$+8]=s.x,E[D+$+9]=s.y,E[D+$+10]=s.z,E[D+$+11]=I.itemSize===4?s.w:1)}}h={count:f,texture:A,size:new ye(v,y)},n.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function I0(i,e,t,n,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,h=e.get(c,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const U0={[lh]:"LINEAR_TONE_MAPPING",[ch]:"REINHARD_TONE_MAPPING",[hh]:"CINEON_TONE_MAPPING",[uh]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[ph]:"NEUTRAL_TONE_MAPPING",[fh]:"CUSTOM_TONE_MAPPING"};function N0(i,e,t,n,s,r){const a=new $t(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new St;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));const u=new yd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ot(c,u),h=new kr(-1,1,1,-1,0,1);let p=null,g=null,x=!1,m,d=null,S=[],R=!1;this.setSize=function(v,y){a.setSize(v,y),o!==null&&o.setSize(v,y),l!==null&&l.setSize(v,y);for(let E=0;E<S.length;E++){const A=S[E];A.setSize&&A.setSize(v,y)}},this.setEffects=function(v){S=v,R=S.length>0&&S[0].isRenderPass===!0;const y=a.width,E=a.height;S.length>0&&o===null&&(o=new $t(y,E,{type:un,depthBuffer:!1,stencilBuffer:!1}),l=new $t(y,E,{type:un,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){const M=S[A];M.setSize&&M.setSize(y,E)}},this.begin=function(v,y){if(x||v.toneMapping===Sn&&S.length===0)return!1;if(d=y,y!==null){const E=y.width,A=y.height;(a.width!==E||a.height!==A)&&this.setSize(E,A)}return R===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=Sn,!0},this.hasRenderPass=function(){return R},this.end=function(v,y){v.toneMapping=m,x=!0;let E=a,A=o;for(let M=0;M<S.length;M++){const T=S[M];T.enabled!==!1&&(T.render(v,A,E,y),T.needsSwap!==!1&&(E=A,A=A===o?l:o))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,u.defines={},Ye.getTransfer(p)===st&&(u.defines.SRGB_TRANSFER="");const M=U0[g];M&&(u.defines[M]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(d),v.render(f,h),d=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Bh=new It,Ao=new Ji(1,1),zh=new Eh,kh=new qf,Hh=new Ch,uc=[],fc=[],dc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function es(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uc[s];if(r===void 0&&(r=new Float32Array(s),uc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Gr(i,e){let t=fc[e];t===void 0&&(t=new Int32Array(e),fc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function F0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function O0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function B0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function k0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;mc.set(n),i.uniformMatrix2fv(this.addr,!1,mc),Pt(t,n)}}function H0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;pc.set(n),i.uniformMatrix3fv(this.addr,!1,pc),Pt(t,n)}}function G0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;dc.set(n),i.uniformMatrix4fv(this.addr,!1,dc),Pt(t,n)}}function V0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function W0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function X0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function q0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function Y0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function K0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function Z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function J0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ao.compareFunction=t.isReversedDepthBuffer()?Yo:qo,r=Ao):r=Bh,t.setTexture2D(e||r,s)}function Q0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kh,s)}function j0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hh,s)}function eg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zh,s)}function tg(i){switch(i){case 5126:return F0;case 35664:return O0;case 35665:return B0;case 35666:return z0;case 35674:return k0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return V0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return Y0;case 36294:return $0;case 36295:return K0;case 36296:return Z0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return eg}}function ng(i,e){i.uniform1fv(this.addr,e)}function ig(i,e){const t=es(e,this.size,2);i.uniform2fv(this.addr,t)}function sg(i,e){const t=es(e,this.size,3);i.uniform3fv(this.addr,t)}function rg(i,e){const t=es(e,this.size,4);i.uniform4fv(this.addr,t)}function ag(i,e){const t=es(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function og(i,e){const t=es(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lg(i,e){const t=es(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function cg(i,e){i.uniform1iv(this.addr,e)}function hg(i,e){i.uniform2iv(this.addr,e)}function ug(i,e){i.uniform3iv(this.addr,e)}function fg(i,e){i.uniform4iv(this.addr,e)}function dg(i,e){i.uniform1uiv(this.addr,e)}function pg(i,e){i.uniform2uiv(this.addr,e)}function mg(i,e){i.uniform3uiv(this.addr,e)}function gg(i,e){i.uniform4uiv(this.addr,e)}function _g(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ao:a=Bh;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function xg(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kh,r[a])}function vg(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Hh,r[a])}function Mg(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||zh,r[a])}function Sg(i){switch(i){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return rg;case 35674:return ag;case 35675:return og;case 35676:return lg;case 5124:case 35670:return cg;case 35667:case 35671:return hg;case 35668:case 35672:return ug;case 35669:case 35673:return fg;case 5125:return dg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return vg;case 36289:case 36303:case 36311:case 36292:return Mg}}class yg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tg(t.type)}}class bg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sg(t.type)}}class Eg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function gc(i,e){i.seq.push(e),i.map[e.id]=e}function wg(i,e,t){const n=i.name,s=n.length;for(ba.lastIndex=0;;){const r=ba.exec(n),a=ba.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){gc(t,c===void 0?new yg(o,i,e):new bg(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Eg(o),gc(t,f)),t=f}}}class Mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);wg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function _c(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Tg=37297;let Ag=0;function Rg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const xc=new Oe;function Cg(i){Ye._getMatrix(xc,Ye.workingColorSpace,i);const e=`mat3( ${xc.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case Rr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Rg(i.getShaderSource(e),o)}else return r}function Pg(i,e){const t=Cg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Lg={[lh]:"Linear",[ch]:"Reinhard",[hh]:"Cineon",[uh]:"ACESFilmic",[dh]:"AgX",[ph]:"Neutral",[fh]:"Custom"};function Dg(i,e){const t=Lg[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const or=new H;function Ig(){Ye.getLuminanceCoefficients(or);const i=or.x.toFixed(4),e=or.y.toFixed(4),t=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ug(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function Ng(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function _s(i){return i!==""}function Mc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Og=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ro(i){return i.replace(Og,zg)}const Bg=new Map;function zg(i,e){let t=He[e];if(t===void 0){const n=Bg.get(e);if(n!==void 0)t=He[n],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ro(t)}const kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(i){return i.replace(kg,Hg)}function Hg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Gg={[mr]:"SHADOWMAP_TYPE_PCF",[gs]:"SHADOWMAP_TYPE_VSM"};function Vg(i){return Gg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Wg={[li]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE_UV"};function Xg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Wg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const qg={[Ki]:"ENVMAP_MODE_REFRACTION"};function Yg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":qg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $g={[oh]:"ENVMAP_BLENDING_MULTIPLY",[cf]:"ENVMAP_BLENDING_MIX",[hf]:"ENVMAP_BLENDING_ADD"};function Kg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":$g[i.combine]||"ENVMAP_BLENDING_NONE"}function Zg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Jg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Vg(t),c=Xg(t),u=Yg(t),f=Kg(t),h=Zg(t),p=Ug(t),g=Ng(r),x=s.createProgram();let m,d,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),d.length>0&&(d+=`
`)):(m=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),d=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sn?"#define TONE_MAPPING":"",t.toneMapping!==Sn?He.tonemapping_pars_fragment:"",t.toneMapping!==Sn?Dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Pg("linearToOutputTexel",t.outputColorSpace),Ig(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_s).join(`
`)),a=Ro(a),a=Mc(a,t),a=Sc(a,t),o=Ro(o),o=Mc(o,t),o=Sc(o,t),a=yc(a),o=yc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===El?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===El?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const R=S+m+a,v=S+d+o,y=_c(s,s.VERTEX_SHADER,R),E=_c(s,s.FRAGMENT_SHADER,v);s.attachShader(x,y),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(N){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(x)||"",I=s.getShaderInfoLog(y)||"",D=s.getShaderInfoLog(E)||"",F=C.trim(),$=I.trim(),q=D.trim();let ne=!0,Z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,y,E);else{const Q=vc(s,y,"vertex"),te=vc(s,E,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+F+`
`+Q+`
`+te)}else F!==""?Ie("WebGLProgram: Program Info Log:",F):($===""||q==="")&&(Z=!1);Z&&(N.diagnostics={runnable:ne,programLog:F,vertexShader:{log:$,prefix:m},fragmentShader:{log:q,prefix:d}})}s.deleteShader(y),s.deleteShader(E),M=new Mr(s,x),T=Fg(s,x)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(x,Tg)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ag++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=E,this}let Qg=0;class jg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new e_(e),t.set(e,n)),n}}class e_{constructor(e){this.id=Qg++,this.code=e,this.usedTimes=0}}function t_(i){return i===ci||i===Tr||i===Ar}function n_(i,e,t,n,s,r){const a=new Zo,o=new jg,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function x(M,T,P,N,C,I){const D=N.fog,F=C.geometry,$=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,q=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,ne=e.get(M.envMap||$,q),Z=ne&&ne.mapping===Br?ne.image.height:null,Q=p[M.type];M.precision!==null&&(h=n.getMaxPrecision(M.precision),h!==M.precision&&Ie("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const te=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Se=te!==void 0?te.length:0;let _e=0;F.morphAttributes.position!==void 0&&(_e=1),F.morphAttributes.normal!==void 0&&(_e=2),F.morphAttributes.color!==void 0&&(_e=3);let Ze,ze,Me,G;if(Q){const dt=gn[Q];Ze=dt.vertexShader,ze=dt.fragmentShader}else{Ze=M.vertexShader,ze=M.fragmentShader;const dt=o.getVertexShaderStage(M),Qe=o.getFragmentShaderStage(M);o.update(M,dt,Qe),Me=dt.id,G=Qe.id}const K=i.getRenderTarget(),le=i.state.buffers.depth.getReversed(),we=C.isInstancedMesh===!0,ae=C.isBatchedMesh===!0,Ue=!!M.map,Ve=!!M.matcap,Fe=!!ne,We=!!M.aoMap,it=!!M.lightMap,Ge=!!M.bumpMap&&M.wireframe===!1,lt=!!M.normalMap,ct=!!M.displacementMap,Lt=!!M.emissiveMap,mt=!!M.metalnessMap,xt=!!M.roughnessMap,z=M.anisotropy>0,Rt=M.clearcoat>0,L=M.dispersion>0,w=M.retroreflectivity>0,_=M.iridescence>0,U=M.sheen>0,B=M.transmission>0,X=z&&!!M.anisotropyMap,ie=Rt&&!!M.clearcoatMap,re=Rt&&!!M.clearcoatNormalMap,J=Rt&&!!M.clearcoatRoughnessMap,j=_&&!!M.iridescenceMap,oe=_&&!!M.iridescenceThicknessMap,Ce=U&&!!M.sheenColorMap,fe=U&&!!M.sheenRoughnessMap,ce=!!M.specularMap,Pe=!!M.specularColorMap,De=!!M.specularIntensityMap,Be=B&&!!M.transmissionMap,k=B&&!!M.thicknessMap,he=!!M.gradientMap,ee=!!M.alphaMap,ue=M.alphaTest>0,ge=!!M.alphaHash,se=!!M.extensions;let Le=Sn;M.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Le=i.toneMapping);const Te={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:Ze,fragmentShader:ze,defines:M.defines,customVertexShaderID:Me,customFragmentShaderID:G,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:ae,batchingColor:ae&&C._colorsTexture!==null,instancing:we,instancingColor:we&&C.instanceColor!==null,instancingMorph:we&&C.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Ue,matcap:Ve,envMap:Fe,envMapMode:Fe&&ne.mapping,envMapCubeUVHeight:Z,aoMap:We,lightMap:it,bumpMap:Ge,normalMap:lt,displacementMap:ct,emissiveMap:Lt,normalMapObjectSpace:lt&&M.normalMapType===df,normalMapTangentSpace:lt&&M.normalMapType===bl,packedNormalMap:lt&&M.normalMapType===bl&&t_(M.normalMap.format),metalnessMap:mt,roughnessMap:xt,anisotropy:z,anisotropyMap:X,clearcoat:Rt,clearcoatMap:ie,clearcoatNormalMap:re,clearcoatRoughnessMap:J,dispersion:L,retroreflection:w,iridescence:_,iridescenceMap:j,iridescenceThicknessMap:oe,sheen:U,sheenColorMap:Ce,sheenRoughnessMap:fe,specularMap:ce,specularColorMap:Pe,specularIntensityMap:De,transmission:B,transmissionMap:Be,thicknessMap:k,gradientMap:he,opaque:M.transparent===!1&&M.blending===Wi&&M.alphaToCoverage===!1,alphaMap:ee,alphaTest:ue,alphaHash:ge,combine:M.combine,mapUv:Ue&&g(M.map.channel),aoMapUv:We&&g(M.aoMap.channel),lightMapUv:it&&g(M.lightMap.channel),bumpMapUv:Ge&&g(M.bumpMap.channel),normalMapUv:lt&&g(M.normalMap.channel),displacementMapUv:ct&&g(M.displacementMap.channel),emissiveMapUv:Lt&&g(M.emissiveMap.channel),metalnessMapUv:mt&&g(M.metalnessMap.channel),roughnessMapUv:xt&&g(M.roughnessMap.channel),anisotropyMapUv:X&&g(M.anisotropyMap.channel),clearcoatMapUv:ie&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:fe&&g(M.sheenRoughnessMap.channel),specularMapUv:ce&&g(M.specularMap.channel),specularColorMapUv:Pe&&g(M.specularColorMap.channel),specularIntensityMapUv:De&&g(M.specularIntensityMap.channel),transmissionMapUv:Be&&g(M.transmissionMap.channel),thicknessMapUv:k&&g(M.thicknessMap.channel),alphaMapUv:ee&&g(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(lt||z),vertexNormals:!!F.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!F.attributes.uv&&(Ue||ee),fog:!!D,useFog:M.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||F.attributes.normal===void 0&&lt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:le,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:_e,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:I.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ue&&M.map.isVideoTexture===!0&&Ye.getTransfer(M.map.colorSpace)===st,decodeVideoTextureEmissive:Lt&&M.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(M.emissiveMap.colorSpace)===st,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===en,flipSided:M.side===Wt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:se&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&M.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function m(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)T.push(P),T.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(d(T,M),S(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function d(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numSunLights),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numSunLightShadows),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function S(M,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function R(M){const T=p[M.type];let P;if(T){const N=gn[T];P=vd.clone(N.uniforms)}else P=M.uniforms;return P}function v(M,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new Jg(i,T,M,s),c.push(P),u.set(T,P)),P}function y(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),u.delete(M.cacheKey),M.destroy()}}function E(M){o.remove(M)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:R,acquireProgram:v,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:A}}function i_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function s_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ec(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,x,m,d){let S=i[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:d},i[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=g,S.materialVariant=a(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=m,S.group=d),e++,S}function l(h,p,g,x,m,d,S){S.reversedDepth===!0&&(m=-m);const R=o(h,p,g,x,m,d);g.transmission>0?n.push(R):g.transparent===!0?s.push(R):t.push(R)}function c(h,p,g,x,m,d){const S=o(h,p,g,x,m,d);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function u(h,p){t.length>1&&t.sort(h||s_),n.length>1&&n.sort(p||Ec),s.length>1&&s.sort(p||Ec)}function f(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function r_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new wc,i.set(n,[a])):s>=r.length?(a=new wc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function a_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new Ne};break;case"SpotLight":t={position:new H,direction:new H,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function o_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let l_=0;function c_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function h_(i){const e=new a_,t=o_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const s=new H,r=new nt,a=new nt;function o(c){let u=0,f=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,S=0,R=0,v=0,y=0,E=0,A=0,M=0,T=0,P=0;c.sort(c_);for(let C=0,I=c.length;C<I;C++){const D=c[C],F=D.color,$=D.intensity,q=D.distance;let ne=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ci?ne=D.shadow.map.texture:ne=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=F.r*$,f+=F.g*$,h+=F.b*$;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],$);P++}else if(D.isSunLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,te=t.get(D);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=te,n.sunShadowMap[g]=ne;const Se=Q.getViewportCount();for(let _e=0;_e<Se;_e++)n.sunShadowMatrix[x+_e]=Q.getMatrix(_e),n.sunShadowCascade[x+_e]=Q._cascadeData[_e];x+=Se,g++}n.sun[p]=Z,p++}else if(D.isDirectionalLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,te=t.get(D);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=ne,n.directionalShadowMatrix[m]=D.shadow.matrix,y++}n.directional[m]=Z,m++}else if(D.isSpotLight){const Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(F).multiplyScalar($),Z.distance=q,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[S]=Z;const Q=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,Q.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[S]=Q.matrix,D.castShadow){const te=t.get(D);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,n.spotShadow[S]=te,n.spotShadowMap[S]=ne,A++}S++}else if(D.isRectAreaLight){const Z=e.get(D);Z.color.copy(F).multiplyScalar($),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[R]=Z,R++}else if(D.isPointLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){const Q=D.shadow,te=t.get(D);te.shadowIntensity=Q.intensity,te.shadowBias=Q.bias,te.shadowNormalBias=Q.normalBias,te.shadowRadius=Q.radius,te.shadowMapSize=Q.mapSize,te.shadowCameraNear=Q.camera.near,te.shadowCameraFar=Q.camera.far,n.pointShadow[d]=te,n.pointShadowMap[d]=ne,n.pointShadowMatrix[d]=D.shadow.matrix,E++}n.point[d]=Z,d++}else if(D.isHemisphereLight){const Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar($),Z.groundColor.copy(D.groundColor).multiplyScalar($),n.hemi[v]=Z,v++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const N=n.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==d||N.spotLength!==S||N.rectAreaLength!==R||N.hemiLength!==v||N.numSunShadows!==g||N.numDirectionalShadows!==y||N.numPointShadows!==E||N.numSpotShadows!==A||N.numSpotMaps!==M||N.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=m,n.spot.length=S,n.rectArea.length=R,n.point.length=d,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+M-T,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,N.sunLength=p,N.directionalLength=m,N.pointLength=d,N.spotLength=S,N.rectAreaLength=R,N.hemiLength=v,N.numSunShadows=g,N.numDirectionalShadows=y,N.numPointShadows=E,N.numSpotShadows=A,N.numSpotMaps=M,N.numLightProbes=P,n.version=l_++)}function l(c,u){let f=0,h=0,p=0,g=0,x=0,m=0;const d=u.matrixWorldInverse;for(let S=0,R=c.length;S<R;S++){const v=c[S];if(v.isSunLight){const y=n.sun[f];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(d),f++}else if(v.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),h++}else if(v.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(v.isRectAreaLight){const y=n.rectArea[x];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(v.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(d),p++}else if(v.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function Tc(i){const e=new h_(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function u_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Tc(i),e.set(s,[o])):r>=a.length?(o=new Tc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const f_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,d_=`uniform sampler2D shadow_pass;
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
}`,p_=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],m_=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Ac=new nt,ds=new H,Ea=new H;function g_(i,e,t){let n=new Jo;const s=new ye,r=new ye,a=new tt,o=new bd,l=new Ed,c={},u=t.maxTextureSize,f={[oi]:Wt,[Wt]:oi,[en]:en},h=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:f_,fragmentShader:d_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ot(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mr;let d=this.type;this.render=function(E,A,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Vu&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=mr);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Nn),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const I=d!==this.type;I&&A.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(F=>F.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,F=E.length;D<F;D++){const $=E[D],q=$.shadow;if(q===void 0){Ie("WebGLShadowMap:",$,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const ne=q.getFrameExtents();s.multiply(ne),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,q.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Z,q.map===null||I===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===gs){if($.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new $t(s.x,s.y,{format:ci,type:un,minFilter:et,magFilter:et,generateMipmaps:!1}),q.map.texture.name=$.name+".shadowMap",q.map.depthTexture=new Ji(s.x,s.y,hn),q.map.depthTexture.name=$.name+".shadowMapDepth",q.map.depthTexture.format=Bn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=yt,q.map.depthTexture.magFilter=yt}else $.isPointLight?(q.map=new Oh(s.x),q.map.depthTexture=new _d(s.x,bn)):(q.map=new $t(s.x,s.y),q.map.depthTexture=new Ji(s.x,s.y,bn)),q.map.depthTexture.name=$.name+".shadowMap",q.map.depthTexture.format=Bn,this.type===mr?(q.map.depthTexture.compareFunction=Z?Yo:qo,q.map.depthTexture.minFilter=et,q.map.depthTexture.magFilter=et):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=yt,q.map.depthTexture.magFilter=yt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);const Q=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();$.isPointLight!==!0&&q.updateMatrices($,M);for(let te=0;te<Q;te++){const Se=q.getCamera(te);if($.isPointLight){const _e=q.camera,Ze=q.matrix,ze=$.distance||_e.far;ze!==_e.far&&(_e.far=ze,_e.updateProjectionMatrix()),ds.setFromMatrixPosition($.matrixWorld),_e.position.copy(ds),Ea.copy(_e.position),Ea.add(p_[te]),_e.up.copy(m_[te]),_e.lookAt(Ea),_e.updateMatrixWorld(),Ze.makeTranslation(-ds.x,-ds.y,-ds.z),Ac.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Ac,_e.coordinateSystem,_e.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,te),i.clear();else{te===0&&(i.setRenderTarget(q.map),i.clear());const _e=q.getViewport(te);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),C.viewport(a)}n=q.getFrustum(te),v(A,M,Se,$,this.type)}q.isPointLightShadow!==!0&&this.type===gs&&S(q,M),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,N)};function S(E,A){const M=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new $t(s.x,s.y,{format:ci,type:un}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,M,h,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,M,p,x,null)}function R(E,A,M,T){let P=null;const N=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)P=N;else if(P=M.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const C=P.uuid,I=A.uuid;let D=c[C];D===void 0&&(D={},c[C]=D);let F=D[I];F===void 0&&(F=P.clone(),D[I]=F,A.addEventListener("dispose",y)),P=F}if(P.visible=A.visible,P.wireframe=A.wireframe,T===gs?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:f[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const C=i.properties.get(P);C.light=M}return P}function v(E,A,M,T,P){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===gs)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const I=e.update(E),D=E.material;if(Array.isArray(D)){const F=I.groups;for(let $=0,q=F.length;$<q;$++){const ne=F[$],Z=D[ne.materialIndex];if(Z&&Z.visible){const Q=R(E,Z,T,P);E.onBeforeShadow(i,E,A,M,I,Q,ne),i.renderBufferDirect(M,null,I,Q,E,ne),E.onAfterShadow(i,E,A,M,I,Q,ne)}}}else if(D.visible){const F=R(E,D,T,P);E.onBeforeShadow(i,E,A,M,I,F,null),i.renderBufferDirect(M,null,I,F,E,null),E.onAfterShadow(i,E,A,M,I,F,null)}}const C=E.children;for(let I=0,D=C.length;I<D;I++)v(C[I],A,M,T,P)}function y(E){E.target.removeEventListener("dispose",y);for(const M in c){const T=c[M],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function __(i,e){function t(){let k=!1;const he=new tt;let ee=null;const ue=new tt(0,0,0,0);return{setMask:function(ge){ee!==ge&&!k&&(i.colorMask(ge,ge,ge,ge),ee=ge)},setLocked:function(ge){k=ge},setClear:function(ge,se,Le,Te,dt){dt===!0&&(ge*=Te,se*=Te,Le*=Te),he.set(ge,se,Le,Te),ue.equals(he)===!1&&(i.clearColor(ge,se,Le,Te),ue.copy(he))},reset:function(){k=!1,ee=null,ue.set(-1,0,0,0)}}}function n(){let k=!1,he=!1,ee=null,ue=null,ge=null;return{setReversed:function(se){if(he!==se){const Le=e.get("EXT_clip_control");se?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),he=se;const Te=ge;ge=null,this.setClear(Te)}},getReversed:function(){return he},setTest:function(se){se?K(i.DEPTH_TEST):le(i.DEPTH_TEST)},setMask:function(se){ee!==se&&!k&&(i.depthMask(se),ee=se)},setFunc:function(se){if(he&&(se=Ef[se]),ue!==se){switch(se){case Ba:i.depthFunc(i.NEVER);break;case za:i.depthFunc(i.ALWAYS);break;case ka:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Ha:i.depthFunc(i.EQUAL);break;case Ga:i.depthFunc(i.GEQUAL);break;case Va:i.depthFunc(i.GREATER);break;case Wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=se}},setLocked:function(se){k=se},setClear:function(se){ge!==se&&(ge=se,he&&(se=1-se),i.clearDepth(se))},reset:function(){k=!1,ee=null,ue=null,ge=null,he=!1}}}function s(){let k=!1,he=null,ee=null,ue=null,ge=null,se=null,Le=null,Te=null,dt=null;return{setTest:function(Qe){k||(Qe?K(i.STENCIL_TEST):le(i.STENCIL_TEST))},setMask:function(Qe){he!==Qe&&!k&&(i.stencilMask(Qe),he=Qe)},setFunc:function(Qe,sn,fn){(ee!==Qe||ue!==sn||ge!==fn)&&(i.stencilFunc(Qe,sn,fn),ee=Qe,ue=sn,ge=fn)},setOp:function(Qe,sn,fn){(se!==Qe||Le!==sn||Te!==fn)&&(i.stencilOp(Qe,sn,fn),se=Qe,Le=sn,Te=fn)},setLocked:function(Qe){k=Qe},setClear:function(Qe){dt!==Qe&&(i.clearStencil(Qe),dt=Qe)},reset:function(){k=!1,he=null,ee=null,ue=null,ge=null,se=null,Le=null,Te=null,dt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},p=new WeakMap,g=[],x=null,m=!1,d=null,S=null,R=null,v=null,y=null,E=null,A=null,M=new Ne(0,0,0),T=0,P=!1,N=null,C=null,I=null,D=null,F=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,ne=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=ne>=1):Z.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=ne>=2);let Q=null,te={};const Se=i.getParameter(i.SCISSOR_BOX),_e=i.getParameter(i.VIEWPORT),Ze=new tt().fromArray(Se),ze=new tt().fromArray(_e);function Me(k,he,ee,ue){const ge=new Uint8Array(4),se=i.createTexture();i.bindTexture(k,se),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<ee;Le++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,ge):i.texImage2D(he+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ge);return se}const G={};G[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc($i),Ge(!1),lt(Ml),K(i.CULL_FACE),We(Nn);function K(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function le(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function we(k,he){return h[k]!==he?(i.bindFramebuffer(k,he),h[k]=he,k===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=he),k===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=he),!0):!1}function ae(k,he){let ee=g,ue=!1;if(k){ee=p.get(he),ee===void 0&&(ee=[],p.set(he,ee));const ge=k.textures;if(ee.length!==ge.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Le=ge.length;se<Le;se++)ee[se]=i.COLOR_ATTACHMENT0+se;ee.length=ge.length,ue=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ue=!0);ue&&i.drawBuffers(ee)}function Ue(k){return x!==k?(i.useProgram(k),x=k,!0):!1}const Ve={[ki]:i.FUNC_ADD,[Xu]:i.FUNC_SUBTRACT,[qu]:i.FUNC_REVERSE_SUBTRACT};Ve[Yu]=i.MIN,Ve[$u]=i.MAX;const Fe={[Ku]:i.ZERO,[Zu]:i.ONE,[Ju]:i.SRC_COLOR,[rh]:i.SRC_ALPHA,[sf]:i.SRC_ALPHA_SATURATE,[tf]:i.DST_COLOR,[ju]:i.DST_ALPHA,[Qu]:i.ONE_MINUS_SRC_COLOR,[ah]:i.ONE_MINUS_SRC_ALPHA,[nf]:i.ONE_MINUS_DST_COLOR,[ef]:i.ONE_MINUS_DST_ALPHA,[rf]:i.CONSTANT_COLOR,[af]:i.ONE_MINUS_CONSTANT_COLOR,[of]:i.CONSTANT_ALPHA,[lf]:i.ONE_MINUS_CONSTANT_ALPHA};function We(k,he,ee,ue,ge,se,Le,Te,dt,Qe){if(k===Nn){m===!0&&(le(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),k!==Wu){if(k!==d||Qe!==P){if((S!==ki||y!==ki)&&(i.blendEquation(i.FUNC_ADD),S=ki,y=ki),Qe)switch(k){case Wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFunc(i.ONE,i.ONE);break;case Sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$e("WebGLState: Invalid blending: ",k);break}else switch(k){case Wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ln:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Sl:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yl:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",k);break}R=null,v=null,E=null,A=null,M.set(0,0,0),T=0,d=k,P=Qe}return}ge=ge||he,se=se||ee,Le=Le||ue,(he!==S||ge!==y)&&(i.blendEquationSeparate(Ve[he],Ve[ge]),S=he,y=ge),(ee!==R||ue!==v||se!==E||Le!==A)&&(i.blendFuncSeparate(Fe[ee],Fe[ue],Fe[se],Fe[Le]),R=ee,v=ue,E=se,A=Le),(Te.equals(M)===!1||dt!==T)&&(i.blendColor(Te.r,Te.g,Te.b,dt),M.copy(Te),T=dt),d=k,P=!1}function it(k,he){k.side===en?le(i.CULL_FACE):K(i.CULL_FACE);let ee=k.side===Wt;he&&(ee=!ee),Ge(ee),k.blending===Wi&&k.transparent===!1?We(Nn):We(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const ue=k.stencilWrite;o.setTest(ue),ue&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Lt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(k){N!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),N=k)}function lt(k){k!==Hu?(K(i.CULL_FACE),k!==C&&(k===Ml?i.cullFace(i.BACK):k===Gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):le(i.CULL_FACE),C=k}function ct(k){k!==I&&(q&&i.lineWidth(k),I=k)}function Lt(k,he,ee){k?(K(i.POLYGON_OFFSET_FILL),(D!==he||F!==ee)&&(D=he,F=ee,a.getReversed()&&(he=-he),i.polygonOffset(he,ee))):le(i.POLYGON_OFFSET_FILL)}function mt(k){k?K(i.SCISSOR_TEST):le(i.SCISSOR_TEST)}function xt(k){k===void 0&&(k=i.TEXTURE0+$-1),Q!==k&&(i.activeTexture(k),Q=k)}function z(k,he,ee){ee===void 0&&(Q===null?ee=i.TEXTURE0+$-1:ee=Q);let ue=te[ee];ue===void 0&&(ue={type:void 0,texture:void 0},te[ee]=ue),(ue.type!==k||ue.texture!==he)&&(Q!==ee&&(i.activeTexture(ee),Q=ee),i.bindTexture(k,he||G[k]),ue.type=k,ue.texture=he)}function Rt(){const k=te[Q];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function L(){try{i.compressedTexImage2D(...arguments)}catch(k){$e("WebGLState:",k)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(k){$e("WebGLState:",k)}}function _(){try{i.texSubImage2D(...arguments)}catch(k){$e("WebGLState:",k)}}function U(){try{i.texSubImage3D(...arguments)}catch(k){$e("WebGLState:",k)}}function B(){try{i.compressedTexSubImage2D(...arguments)}catch(k){$e("WebGLState:",k)}}function X(){try{i.compressedTexSubImage3D(...arguments)}catch(k){$e("WebGLState:",k)}}function ie(){try{i.texStorage2D(...arguments)}catch(k){$e("WebGLState:",k)}}function re(){try{i.texStorage3D(...arguments)}catch(k){$e("WebGLState:",k)}}function J(){try{i.texImage2D(...arguments)}catch(k){$e("WebGLState:",k)}}function j(){try{i.texImage3D(...arguments)}catch(k){$e("WebGLState:",k)}}function oe(k){return f[k]!==void 0?f[k]:i.getParameter(k)}function Ce(k,he){f[k]!==he&&(i.pixelStorei(k,he),f[k]=he)}function fe(k){Ze.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Ze.copy(k))}function ce(k){ze.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),ze.copy(k))}function Pe(k,he){let ee=c.get(he);ee===void 0&&(ee=new WeakMap,c.set(he,ee));let ue=ee.get(k);ue===void 0&&(ue=i.getUniformBlockIndex(he,k.name),ee.set(k,ue))}function De(k,he){const ue=c.get(he).get(k);l.get(he)!==ue&&(i.uniformBlockBinding(he,ue,k.__bindingPointIndex),l.set(he,ue))}function Be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},Q=null,te={},h={},p=new WeakMap,g=[],x=null,m=!1,d=null,S=null,R=null,v=null,y=null,E=null,A=null,M=new Ne(0,0,0),T=0,P=!1,N=null,C=null,I=null,D=null,F=null,Ze.set(0,0,i.canvas.width,i.canvas.height),ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:le,bindFramebuffer:we,drawBuffers:ae,useProgram:Ue,setBlending:We,setMaterial:it,setFlipSided:Ge,setCullFace:lt,setLineWidth:ct,setPolygonOffset:Lt,setScissorTest:mt,activeTexture:xt,bindTexture:z,unbindTexture:Rt,compressedTexImage2D:L,compressedTexImage3D:w,texImage2D:J,texImage3D:j,pixelStorei:Ce,getParameter:oe,updateUBOMapping:Pe,uniformBlockBinding:De,texStorage2D:ie,texStorage3D:re,texSubImage2D:_,texSubImage3D:U,compressedTexSubImage2D:B,compressedTexSubImage3D:X,scissor:fe,viewport:ce,reset:Be}}function x_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,_){return g?new OffscreenCanvas(w,_):Cr("canvas")}function m(w,_,U){let B=1;const X=L(w);if((X.width>U||X.height>U)&&(B=U/Math.max(X.width,X.height)),B<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ie=Math.floor(B*X.width),re=Math.floor(B*X.height);h===void 0&&(h=x(ie,re));const J=_?x(ie,re):h;return J.width=ie,J.height=re,J.getContext("2d").drawImage(w,0,0,ie,re),Ie("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+ie+"x"+re+")."),J}else return"data"in w&&Ie("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),w;return w}function d(w){return w.generateMipmaps}function S(w){i.generateMipmap(w)}function R(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(w,_,U,B,X,ie=!1){if(w!==null){if(i[w]!==void 0)return i[w];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let re;B&&(re=e.get("EXT_texture_norm16"),re||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=_;if(_===i.RED&&(U===i.FLOAT&&(J=i.R32F),U===i.HALF_FLOAT&&(J=i.R16F),U===i.UNSIGNED_BYTE&&(J=i.R8),U===i.UNSIGNED_SHORT&&re&&(J=re.R16_EXT),U===i.SHORT&&re&&(J=re.R16_SNORM_EXT)),_===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.R8UI),U===i.UNSIGNED_SHORT&&(J=i.R16UI),U===i.UNSIGNED_INT&&(J=i.R32UI),U===i.BYTE&&(J=i.R8I),U===i.SHORT&&(J=i.R16I),U===i.INT&&(J=i.R32I)),_===i.RG&&(U===i.FLOAT&&(J=i.RG32F),U===i.HALF_FLOAT&&(J=i.RG16F),U===i.UNSIGNED_BYTE&&(J=i.RG8),U===i.UNSIGNED_SHORT&&re&&(J=re.RG16_EXT),U===i.SHORT&&re&&(J=re.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RG8UI),U===i.UNSIGNED_SHORT&&(J=i.RG16UI),U===i.UNSIGNED_INT&&(J=i.RG32UI),U===i.BYTE&&(J=i.RG8I),U===i.SHORT&&(J=i.RG16I),U===i.INT&&(J=i.RG32I)),_===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGB8UI),U===i.UNSIGNED_SHORT&&(J=i.RGB16UI),U===i.UNSIGNED_INT&&(J=i.RGB32UI),U===i.BYTE&&(J=i.RGB8I),U===i.SHORT&&(J=i.RGB16I),U===i.INT&&(J=i.RGB32I)),_===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),U===i.UNSIGNED_INT&&(J=i.RGBA32UI),U===i.BYTE&&(J=i.RGBA8I),U===i.SHORT&&(J=i.RGBA16I),U===i.INT&&(J=i.RGBA32I)),_===i.RGB&&(U===i.UNSIGNED_SHORT&&re&&(J=re.RGB16_EXT),U===i.SHORT&&re&&(J=re.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),_===i.RGBA){const j=ie?Rr:Ye.getTransfer(X);U===i.FLOAT&&(J=i.RGBA32F),U===i.HALF_FLOAT&&(J=i.RGBA16F),U===i.UNSIGNED_BYTE&&(J=j===st?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&re&&(J=re.RGBA16_EXT),U===i.SHORT&&re&&(J=re.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function y(w,_){let U;return w?_===null||_===bn||_===Zi?U=i.DEPTH24_STENCIL8:_===hn?U=i.DEPTH32F_STENCIL8:_===ys&&(U=i.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===bn||_===Zi?U=i.DEPTH_COMPONENT24:_===hn?U=i.DEPTH_COMPONENT32F:_===ys&&(U=i.DEPTH_COMPONENT16),U}function E(w,_){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==yt&&w.minFilter!==et?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function A(w){const _=w.target;_.removeEventListener("dispose",A),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function M(w){const _=w.target;_.removeEventListener("dispose",M),N(_)}function T(w){const _=n.get(w);if(_.__webglInit===void 0)return;const U=w.source,B=p.get(U);if(B){const X=B[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&P(w),Object.keys(B).length===0&&p.delete(U)}n.remove(w)}function P(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const U=w.source,B=p.get(U);delete B[_.__cacheKey],a.memory.textures--}function N(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(_.__webglFramebuffer[B]))for(let X=0;X<_.__webglFramebuffer[B].length;X++)i.deleteFramebuffer(_.__webglFramebuffer[B][X]);else i.deleteFramebuffer(_.__webglFramebuffer[B]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[B])}else{if(Array.isArray(_.__webglFramebuffer))for(let B=0;B<_.__webglFramebuffer.length;B++)i.deleteFramebuffer(_.__webglFramebuffer[B]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let B=0;B<_.__webglColorRenderbuffer.length;B++)_.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[B]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=w.textures;for(let B=0,X=U.length;B<X;B++){const ie=n.get(U[B]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(U[B])}n.remove(w)}let C=0;function I(){C=0}function D(){return C}function F(w){C=w}function $(){const w=C;return w>=s.maxTextures&&Ie("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function q(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function ne(w,_){const U=n.get(w);if(w.isVideoTexture&&z(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&U.__version!==w.version){const B=w.image;if(B===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{le(U,w,_);return}}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+_)}function Z(w,_){const U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){le(U,w,_);return}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+_)}function Q(w,_){const U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){le(U,w,_);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+_)}function te(w,_){const U=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&U.__version!==w.version){we(U,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+_)}const Se={[wr]:i.REPEAT,[In]:i.CLAMP_TO_EDGE,[Xa]:i.MIRRORED_REPEAT},_e={[yt]:i.NEAREST,[uf]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[et]:i.LINEAR,[$r]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},Ze={[mf]:i.NEVER,[Mf]:i.ALWAYS,[gf]:i.LESS,[qo]:i.LEQUAL,[_f]:i.EQUAL,[Yo]:i.GEQUAL,[xf]:i.GREATER,[vf]:i.NOTEQUAL};function ze(w,_){if(_.type===hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===et||_.magFilter===$r||_.magFilter===Ds||_.magFilter===ai||_.minFilter===et||_.minFilter===$r||_.minFilter===Ds||_.minFilter===ai)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Se[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Se[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Se[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,_e[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,_e[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Ze[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===yt||_.minFilter!==Ds&&_.minFilter!==ai||_.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Me(w,_){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",A));const B=_.source;let X=p.get(B);X===void 0&&(X={},p.set(B,X));const ie=q(_);if(ie!==w.__cacheKey){X[ie]===void 0&&(X[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),X[ie].usedTimes++;const re=X[w.__cacheKey];re!==void 0&&(X[w.__cacheKey].usedTimes--,re.usedTimes===0&&P(_)),w.__cacheKey=ie,w.__webglTexture=X[ie].texture}return U}function G(w,_,U){return Math.floor(Math.floor(w/U)/_)}function K(w,_,U,B){const ie=w.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,U,B,_.data);else{ie.sort((Ce,fe)=>Ce.start-fe.start);let re=0;for(let Ce=1;Ce<ie.length;Ce++){const fe=ie[re],ce=ie[Ce],Pe=fe.start+fe.count,De=G(ce.start,_.width,4),Be=G(fe.start,_.width,4);ce.start<=Pe+1&&De===Be&&G(ce.start+ce.count-1,_.width,4)===De?fe.count=Math.max(fe.count,ce.start+ce.count-fe.start):(++re,ie[re]=ce)}ie.length=re+1;const J=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),oe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Ce=0,fe=ie.length;Ce<fe;Ce++){const ce=ie[Ce],Pe=Math.floor(ce.start/4),De=Math.ceil(ce.count/4),Be=Pe%_.width,k=Math.floor(Pe/_.width),he=De,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Be,k,he,ee,U,B,_.data)}w.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,oe)}}function le(w,_,U){let B=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(B=i.TEXTURE_3D);const X=Me(w,_),ie=_.source;t.bindTexture(B,w.__webglTexture,i.TEXTURE0+U);const re=n.get(ie);if(ie.version!==re.__version||X===!0){if(t.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ee=Ye.getPrimaries(Ye.workingColorSpace),ue=_.colorSpace===_n?null:Ye.getPrimaries(_.colorSpace),ge=_.colorSpace===_n||ee===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let j=m(_.image,!1,s.maxTextureSize);j=Rt(_,j);const oe=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type);let fe=v(_.internalFormat,oe,Ce,_.normalized,_.colorSpace,_.isVideoTexture);ze(B,_);let ce;const Pe=_.mipmaps,De=_.isVideoTexture!==!0,Be=re.__version===void 0||X===!0,k=ie.dataReady,he=E(_,j);if(_.isDepthTexture)fe=y(_.format===Kn,_.type),Be&&(De?t.texStorage2D(i.TEXTURE_2D,1,fe,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,fe,j.width,j.height,0,oe,Ce,null));else if(_.isDataTexture)if(Pe.length>0){De&&Be&&t.texStorage2D(i.TEXTURE_2D,he,fe,Pe[0].width,Pe[0].height);for(let ee=0,ue=Pe.length;ee<ue;ee++)ce=Pe[ee],De?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,oe,Ce,ce.data):t.texImage2D(i.TEXTURE_2D,ee,fe,ce.width,ce.height,0,oe,Ce,ce.data);_.generateMipmaps=!1}else De?(Be&&t.texStorage2D(i.TEXTURE_2D,he,fe,j.width,j.height),k&&K(_,j,oe,Ce)):t.texImage2D(i.TEXTURE_2D,0,fe,j.width,j.height,0,oe,Ce,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){De&&Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,fe,Pe[0].width,Pe[0].height,j.depth);for(let ee=0,ue=Pe.length;ee<ue;ee++)if(ce=Pe[ee],_.format!==nn)if(oe!==null)if(De){if(k)if(_.layerUpdates.size>0){const ge=rc(ce.width,ce.height,_.format,_.type);for(const se of _.layerUpdates){const Le=ce.data.subarray(se*ge/ce.data.BYTES_PER_ELEMENT,(se+1)*ge/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,se,ce.width,ce.height,1,oe,Le)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,j.depth,oe,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,fe,ce.width,ce.height,j.depth,0,ce.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,j.depth,oe,Ce,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,fe,ce.width,ce.height,j.depth,0,oe,Ce,ce.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{De&&Be&&t.texStorage2D(i.TEXTURE_2D,he,fe,Pe[0].width,Pe[0].height);for(let ee=0,ue=Pe.length;ee<ue;ee++)ce=Pe[ee],_.format!==nn?oe!==null?De?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,oe,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,fe,ce.width,ce.height,0,ce.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,oe,Ce,ce.data):t.texImage2D(i.TEXTURE_2D,ee,fe,ce.width,ce.height,0,oe,Ce,ce.data)}else if(_.isDataArrayTexture)if(De){if(Be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,fe,j.width,j.height,j.depth),k)if(_.layerUpdates.size>0){const ee=rc(j.width,j.height,_.format,_.type);for(const ue of _.layerUpdates){const ge=j.data.subarray(ue*ee/j.data.BYTES_PER_ELEMENT,(ue+1)*ee/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ue,j.width,j.height,1,oe,Ce,ge)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,oe,Ce,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,fe,j.width,j.height,j.depth,0,oe,Ce,j.data);else if(_.isData3DTexture)De?(Be&&t.texStorage3D(i.TEXTURE_3D,he,fe,j.width,j.height,j.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,oe,Ce,j.data)):t.texImage3D(i.TEXTURE_3D,0,fe,j.width,j.height,j.depth,0,oe,Ce,j.data);else if(_.isFramebufferTexture){if(Be)if(De)t.texStorage2D(i.TEXTURE_2D,he,fe,j.width,j.height);else{let ee=j.width,ue=j.height;for(let ge=0;ge<he;ge++)t.texImage2D(i.TEXTURE_2D,ge,fe,ee,ue,0,oe,Ce,null),ee>>=1,ue>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),j.parentNode!==ee){ee.appendChild(j),f.add(_),ee.onpaint=ue=>{const ge=ue.changedElements;for(const se of f)ge.includes(se.image)&&(se.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const ge=i.RGBA,se=i.RGBA,Le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ge,se,Le,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(De&&Be){const ee=L(Pe[0]);t.texStorage2D(i.TEXTURE_2D,he,fe,ee.width,ee.height)}for(let ee=0,ue=Pe.length;ee<ue;ee++)ce=Pe[ee],De?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,oe,Ce,ce):t.texImage2D(i.TEXTURE_2D,ee,fe,oe,Ce,ce);_.generateMipmaps=!1}else if(De){if(Be){const ee=L(j);t.texStorage2D(i.TEXTURE_2D,he,fe,ee.width,ee.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,Ce,j)}else t.texImage2D(i.TEXTURE_2D,0,fe,oe,Ce,j);d(_)&&S(B),re.__version=ie.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function we(w,_,U){if(_.image.length!==6)return;const B=Me(w,_),X=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+U);const ie=n.get(X);if(X.version!==ie.__version||B===!0){t.activeTexture(i.TEXTURE0+U);const re=Ye.getPrimaries(Ye.workingColorSpace),J=_.colorSpace===_n?null:Ye.getPrimaries(_.colorSpace),j=_.colorSpace===_n||re===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,Ce=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let se=0;se<6;se++)!oe&&!Ce?fe[se]=m(_.image[se],!0,s.maxCubemapSize):fe[se]=Ce?_.image[se].image:_.image[se],fe[se]=Rt(_,fe[se]);const ce=fe[0],Pe=r.convert(_.format,_.colorSpace),De=r.convert(_.type),Be=v(_.internalFormat,Pe,De,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,he=ie.__version===void 0||B===!0,ee=X.dataReady;let ue=E(_,ce);ze(i.TEXTURE_CUBE_MAP,_);let ge;if(oe){k&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,Be,ce.width,ce.height);for(let se=0;se<6;se++){ge=fe[se].mipmaps;for(let Le=0;Le<ge.length;Le++){const Te=ge[Le];_.format!==nn?Pe!==null?k?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le,0,0,Te.width,Te.height,Pe,Te.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le,Be,Te.width,Te.height,0,Te.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le,0,0,Te.width,Te.height,Pe,De,Te.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le,Be,Te.width,Te.height,0,Pe,De,Te.data)}}}else{if(ge=_.mipmaps,k&&he){ge.length>0&&ue++;const se=L(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,Be,se.width,se.height)}for(let se=0;se<6;se++)if(Ce){k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,fe[se].width,fe[se].height,Pe,De,fe[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Be,fe[se].width,fe[se].height,0,Pe,De,fe[se].data);for(let Le=0;Le<ge.length;Le++){const dt=ge[Le].image[se].image;k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le+1,0,0,dt.width,dt.height,Pe,De,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le+1,Be,dt.width,dt.height,0,Pe,De,dt.data)}}else{k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Pe,De,fe[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Be,Pe,De,fe[se]);for(let Le=0;Le<ge.length;Le++){const Te=ge[Le];k?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le+1,0,0,Pe,De,Te.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Le+1,Be,Pe,De,Te.image[se])}}}d(_)&&S(i.TEXTURE_CUBE_MAP),ie.__version=X.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ae(w,_,U,B,X,ie){const re=r.convert(U.format,U.colorSpace),J=r.convert(U.type),j=v(U.internalFormat,re,J,U.normalized,U.colorSpace),oe=n.get(_),Ce=n.get(U);if(Ce.__renderTarget=_,!oe.__hasExternalTextures){const fe=Math.max(1,_.width>>ie),ce=Math.max(1,_.height>>ie);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?t.texImage3D(X,ie,j,fe,ce,_.depth,0,re,J,null):t.texImage2D(X,ie,j,fe,ce,0,re,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),xt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,X,Ce.__webglTexture,0,mt(_)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,X,Ce.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(w,_,U){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const B=_.depthTexture,X=B&&B.isDepthTexture?B.type:null,ie=y(_.stencilBuffer,X),re=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),ie,_.width,_.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),ie,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ie,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,w)}else{const B=_.textures;for(let X=0;X<B.length;X++){const ie=B[X],re=r.convert(ie.format,ie.colorSpace),J=r.convert(ie.type),j=v(ie.internalFormat,re,J,ie.normalized,ie.colorSpace);xt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt(_),j,_.width,_.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt(_),j,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,j,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ve(w,_,U){const B=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=n.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),B){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),X.__webglTexture===void 0){X.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),ze(i.TEXTURE_CUBE_MAP,_.depthTexture);const oe=r.convert(_.depthTexture.format),Ce=r.convert(_.depthTexture.type);let fe;_.depthTexture.format===Bn?fe=i.DEPTH_COMPONENT24:_.depthTexture.format===Kn&&(fe=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,fe,_.width,_.height,0,oe,Ce,null)}}else ne(_.depthTexture,0);const ie=X.__webglTexture,re=mt(_),J=B?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,j=_.depthTexture.format===Kn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Bn)xt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,ie,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,j,J,ie,0);else if(_.depthTexture.format===Kn)xt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,ie,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,j,J,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Fe(w){const _=n.get(w),U=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const B=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),B){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,B.removeEventListener("dispose",X)};B.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=B}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let B=0;B<6;B++)Ve(_.__webglFramebuffer[B],w,B);else{const B=w.texture.mipmaps;B&&B.length>0?Ve(_.__webglFramebuffer[0],w,0):Ve(_.__webglFramebuffer,w,0)}else if(U){_.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[B]),_.__webglDepthbuffer[B]===void 0)_.__webglDepthbuffer[B]=i.createRenderbuffer(),Ue(_.__webglDepthbuffer[B],w,!1);else{const X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,ie)}}else{const B=w.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ue(_.__webglDepthbuffer,w,!1);else{const X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(w,_,U){const B=n.get(w);_!==void 0&&ae(B.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Fe(w)}function it(w){const _=w.texture,U=n.get(w),B=n.get(_);w.addEventListener("dispose",M);const X=w.textures,ie=w.isWebGLCubeRenderTarget===!0,re=X.length>1;if(re||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=_.version,a.memory.textures++),ie){U.__webglFramebuffer=[];for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[J]=[];for(let j=0;j<_.mipmaps.length;j++)U.__webglFramebuffer[J][j]=i.createFramebuffer()}else U.__webglFramebuffer[J]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let J=0;J<_.mipmaps.length;J++)U.__webglFramebuffer[J]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(re)for(let J=0,j=X.length;J<j;J++){const oe=n.get(X[J]);oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xt(w)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let J=0;J<X.length;J++){const j=X[J];U.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[J]);const oe=r.convert(j.format,j.colorSpace),Ce=r.convert(j.type),fe=v(j.internalFormat,oe,Ce,j.normalized,j.colorSpace,w.isXRRenderTarget===!0),ce=mt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,fe,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,U.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(U.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),ze(i.TEXTURE_CUBE_MAP,_);for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)ae(U.__webglFramebuffer[J][j],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,j);else ae(U.__webglFramebuffer[J],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);d(_)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let J=0,j=X.length;J<j;J++){const oe=X[J],Ce=n.get(oe);let fe=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(fe=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,Ce.__webglTexture),ze(fe,oe),ae(U.__webglFramebuffer,w,oe,i.COLOR_ATTACHMENT0+J,fe,0),d(oe)&&S(fe)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,B.__webglTexture),ze(J,_),_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)ae(U.__webglFramebuffer[j],w,_,i.COLOR_ATTACHMENT0,J,j);else ae(U.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,J,0);d(_)&&S(J),t.unbindTexture()}w.depthBuffer&&Fe(w)}function Ge(w){const _=w.textures;for(let U=0,B=_.length;U<B;U++){const X=_[U];if(d(X)){const ie=R(w),re=n.get(X).__webglTexture;t.bindTexture(ie,re),S(ie),t.unbindTexture()}}}const lt=[],ct=[];function Lt(w){if(w.samples>0){if(xt(w)===!1){const _=w.textures,U=w.width,B=w.height;let X=i.COLOR_BUFFER_BIT;const ie=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(w),J=_.length>1;if(J)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const j=w.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ce=n.get(_[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ce,0)}i.blitFramebuffer(0,0,U,B,0,0,U,B,X,i.NEAREST),l===!0&&(lt.length=0,ct.length=0,lt.push(i.COLOR_ATTACHMENT0+oe),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(lt.push(ie),ct.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ct)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ce=n.get(_[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,Ce,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function mt(w){return Math.min(s.maxSamples,w.samples)}function xt(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(w){const _=a.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function Rt(w,_){const U=w.colorSpace,B=w.format,X=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==bs&&U!==_n&&(Ye.getTransfer(U)===st?(B!==nn||X!==Vt)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",U)),_}function L(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=I,this.getTextureUnits=D,this.setTextureUnits=F,this.setTexture2D=ne,this.setTexture2DArray=Z,this.setTexture3D=Q,this.setTextureCube=te,this.rebindTextures=We,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function v_(i,e){function t(n,s=_n){let r;const a=Ye.getTransfer(s);if(n===Vt)return i.UNSIGNED_BYTE;if(n===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gh)return i.BYTE;if(n===_h)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===ko)return i.INT;if(n===bn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===un)return i.HALF_FLOAT;if(n===Mh)return i.ALPHA;if(n===Sh)return i.RGB;if(n===nn)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===Kn)return i.DEPTH_STENCIL;if(n===As)return i.RED;if(n===Vo)return i.RED_INTEGER;if(n===ci)return i.RG;if(n===Wo)return i.RG_INTEGER;if(n===Xo)return i.RGBA_INTEGER;if(n===gr||n===_r||n===xr||n===vr)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qa||n===Ya||n===$a||n===Ka)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Za||n===Ja||n===Qa||n===ja||n===eo||n===Tr||n===to)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Za||n===Ja)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qa)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ja)return r.COMPRESSED_R11_EAC;if(n===eo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Tr)return r.COMPRESSED_RG11_EAC;if(n===to)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===no)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===io)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===so)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ao)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ho)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===po)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===go)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===xo||n===vo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mo||n===So||n===Ar||n===yo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Mo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ar)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S_=`
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

}`;class y_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ph(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:M_,fragmentShader:S_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b_ extends ui{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new y_,d={},S=t.getContextAttributes();let R=null,v=null;const y=[],E=[],A=new ye;let M=null,T=null;const P=new jt;P.viewport=new tt;const N=new jt;N.viewport=new tt;const C=[P,N],I=new Pd;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let K=y[G];return K===void 0&&(K=new ta,y[G]=K),K.getTargetRaySpace()},this.getControllerGrip=function(G){let K=y[G];return K===void 0&&(K=new ta,y[G]=K),K.getGripSpace()},this.getHand=function(G){let K=y[G];return K===void 0&&(K=new ta,y[G]=K),K.getHandSpace()};function $(G){const K=E.indexOf(G.inputSource);if(K===-1)return;const le=y[K];le!==void 0&&(le.update(G.inputSource,G.frame,c||a),le.dispatchEvent({type:G.type,data:G.inputSource}))}function q(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",ne);for(let G=0;G<y.length;G++){const K=E[G];K!==null&&(E[G]=null,y[G].disconnect(K))}D=null,F=null,m.reset();for(const G in d)delete d[G];if(e.setRenderTarget(R),p=null,h=null,f=null,s=null,v=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(A.width,A.height,!1),T!==null){const G=T.camera;G.fov=T.fov,G.zoom=T.zoom,G.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",q),s.addEventListener("inputsourceschange",ne),S.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,we=null,ae=null;S.depth&&(ae=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=S.stencil?Kn:Bn,we=S.stencil?Zi:bn);const Ue={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ue),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new $t(h.textureWidth,h.textureHeight,{format:nn,type:Vt,depthTexture:new Ji(h.textureWidth,h.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const le={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,le),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new $t(p.framebufferWidth,p.framebufferHeight,{format:nn,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(G){for(let K=0;K<G.removed.length;K++){const le=G.removed[K],we=E.indexOf(le);we>=0&&(E[we]=null,y[we].disconnect(le))}for(let K=0;K<G.added.length;K++){const le=G.added[K];let we=E.indexOf(le);if(we===-1){for(let Ue=0;Ue<y.length;Ue++)if(Ue>=E.length){E.push(le),we=Ue;break}else if(E[Ue]===null){E[Ue]=le,we=Ue;break}if(we===-1)break}const ae=y[we];ae&&ae.connect(le)}}const Z=new H,Q=new H;function te(G,K,le){Z.setFromMatrixPosition(K.matrixWorld),Q.setFromMatrixPosition(le.matrixWorld);const we=Z.distanceTo(Q),ae=K.projectionMatrix.elements,Ue=le.projectionMatrix.elements,Ve=ae[14]/(ae[10]-1),Fe=ae[14]/(ae[10]+1),We=(ae[9]+1)/ae[5],it=(ae[9]-1)/ae[5],Ge=(ae[8]-1)/ae[0],lt=(Ue[8]+1)/Ue[0],ct=Ve*Ge,Lt=Ve*lt,mt=we/(-Ge+lt),xt=mt*-Ge;if(K.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(xt),G.translateZ(mt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ae[10]===-1)G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const z=Ve+mt,Rt=Fe+mt,L=ct-xt,w=Lt+(we-xt),_=We*Fe/Rt*z,U=it*Fe/Rt*z;G.projectionMatrix.makePerspective(L,w,_,U,z,Rt),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Se(G,K){K===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(K.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let K=G.near,le=G.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(le=m.depthFar)),I.near=N.near=P.near=K,I.far=N.far=P.far=le,(D!==I.near||F!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),D=I.near,F=I.far),I.layers.mask=G.layers.mask|6,P.layers.mask=I.layers.mask&-5,N.layers.mask=I.layers.mask&-3;const we=G.parent,ae=I.cameras;Se(I,we);for(let Ue=0;Ue<ae.length;Ue++)Se(ae[Ue],we);ae.length===2?te(I,P,N):I.projectionMatrix.copy(P.projectionMatrix),T===null&&G.isPerspectiveCamera&&(T={camera:G,fov:G.fov,zoom:G.zoom}),_e(G,I,we)};function _e(G,K,le){le===null?G.matrix.copy(K.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(K.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ws*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(G){return d[G]};let Ze=null;function ze(G,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const le=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let we=!1;le.length!==I.cameras.length&&(I.cameras.length=0,we=!0);for(let Fe=0;Fe<le.length;Fe++){const We=le[Fe];let it=null;if(p!==null)it=p.getViewport(We);else{const lt=f.getViewSubImage(h,We);it=lt.viewport,Fe===0&&(e.setRenderTargetTextures(v,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(v))}let Ge=C[Fe];Ge===void 0&&(Ge=new jt,Ge.layers.enable(Fe),Ge.viewport=new tt,C[Fe]=Ge),Ge.matrix.fromArray(We.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(We.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(it.x,it.y,it.width,it.height),Fe===0&&(I.matrix.copy(Ge.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),we===!0&&I.cameras.push(Ge)}const ae=s.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=n.getBinding();const Fe=f.getDepthInformation(le[0]);Fe&&Fe.isValid&&Fe.texture&&m.init(Fe,s.renderState)}if(ae&&ae.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let Fe=0;Fe<le.length;Fe++){const We=le[Fe].camera;if(We){let it=d[We];it||(it=new Ph,d[We]=it);const Ge=f.getCameraImage(We);it.sourceTexture=Ge}}}}for(let le=0;le<y.length;le++){const we=E[le],ae=y[le];we!==null&&ae!==void 0&&ae.update(we,K,c||a)}Ze&&Ze(G,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const Me=new Nh;Me.setAnimationLoop(ze),this.setAnimationLoop=function(G){Ze=G},this.dispose=function(){}}}const E_=new nt,Gh=new Oe;Gh.set(-1,0,0,0,1,0,0,0,1);function w_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Lh(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,R,v){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,S,R):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Wt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Wt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=e.get(d),R=S.envMap,v=S.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(E_.makeRotationFromEuler(v)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Gh),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,R){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=R*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Wt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const S=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const E=y.program;n.uniformBlockBinding(v,E)}function c(v,y){let E=s[v.id];E===void 0&&(m(v),E=u(v),s[v.id]=E,v.addEventListener("dispose",S));const A=y.program;n.updateUBOMapping(v,A);const M=e.render.frame;r[v.id]!==M&&(h(v),r[v.id]=M)}function u(v){const y=f();v.__bindingPointIndex=y;const E=i.createBuffer(),A=v.__size,M=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const y=s[v.id],E=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let M=0,T=E.length;M<T;M++){const P=E[M];if(Array.isArray(P))for(let N=0,C=P.length;N<C;N++)p(P[N],M,N,A);else p(P,M,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,y,E,A){if(x(v,y,E,A)===!0){const M=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let N=0;N<T.length;N++){const C=T[N],I=d(C);g(C,v.__data,P),typeof C!="number"&&typeof C!="boolean"&&!C.isMatrix3&&!ArrayBuffer.isView(C)&&(P+=I.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,v.__data)}}function g(v,y,E){typeof v=="number"||typeof v=="boolean"?y[0]=v:v.isMatrix3?(y[0]=v.elements[0],y[1]=v.elements[1],y[2]=v.elements[2],y[3]=0,y[4]=v.elements[3],y[5]=v.elements[4],y[6]=v.elements[5],y[7]=0,y[8]=v.elements[6],y[9]=v.elements[7],y[10]=v.elements[8],y[11]=0):ArrayBuffer.isView(v)?y.set(new v.constructor(v.buffer,v.byteOffset,y.length)):v.toArray(y,E)}function x(v,y,E,A){const M=v.value,T=y+"_"+E;if(A[T]===void 0)return typeof M=="number"||typeof M=="boolean"?A[T]=M:ArrayBuffer.isView(M)?A[T]=M.slice():A[T]=M.clone(),!0;{const P=A[T];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return A[T]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(P.equals(M)===!1)return P.copy(M),!0}}return!1}function m(v){const y=v.uniforms;let E=0;const A=16;for(let T=0,P=y.length;T<P;T++){const N=Array.isArray(y[T])?y[T]:[y[T]];for(let C=0,I=N.length;C<I;C++){const D=N[C],F=Array.isArray(D.value)?D.value:[D.value];for(let $=0,q=F.length;$<q;$++){const ne=F[$],Z=d(ne),Q=E%A,te=Q%Z.boundary,Se=Q+te;E+=te,Se!==0&&A-Se<Z.storage&&(E+=A-Se),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=Z.storage}}}const M=E%A;return M>0&&(E+=A-M),v.__size=E,v.__cache={},this}function d(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",v),y}function S(v){const y=v.target;y.removeEventListener("dispose",S);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function R(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}const A_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mn=null;function R_(){return mn===null&&(mn=new mi(A_,16,16,ci,un),mn.name="DFG_LUT",mn.minFilter=et,mn.magFilter=et,mn.wrapS=In,mn.wrapT=In,mn.generateMipmaps=!1,mn.needsUpdate=!0),mn}class C_{constructor(e={}){const{canvas:t=yf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Vt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=p,m=new Set([Xo,Wo,Vo]),d=new Set([Vt,bn,ys,Zi,Ho,Go]),S=new Uint32Array(4),R=new Int32Array(4),v=new H;let y=null,E=null;const A=[],M=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,C=null,I=null,D=null,F=null;this._outputColorSpace=Qt;let $=0,q=0,ne=null,Z=-1,Q=null;const te=new tt,Se=new tt;let _e=null;const Ze=new Ne(0);let ze=0,Me=t.width,G=t.height,K=1,le=null,we=null;const ae=new tt(0,0,Me,G),Ue=new tt(0,0,Me,G);let Ve=!1;const Fe=new Jo;let We=!1,it=!1;const Ge=new nt,lt=new H,ct=new tt,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function xt(){return ne===null?K:1}let z=n;function Rt(b,O){return t.getContext(b,O)}let L,w,_,U,B,X,ie,re,J,j,oe,Ce,fe,ce,Pe,De,Be,k,he,ee,ue,ge,se;try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zo}`),t.addEventListener("webglcontextlost",dt,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",sn,!1),z===null){const O="webgl2";if(z=Rt(O,b),z===null)throw Rt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(b){throw t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),$e("WebGLRenderer: "+b.message),b}function Le(){L=new R0(z),L.init(),ue=new v_(z,L),w=new x0(z,L,e,ue),_=new __(z,L),w.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),I=z.createFramebuffer(),D=z.createFramebuffer(),F=z.createFramebuffer(),U=new L0(z),B=new i_,X=new x_(z,L,_,B,w,ue,U),ie=new A0(P),re=new Id(z),ge=new g0(z,re),J=new C0(z,re,U,ge),j=new I0(z,J,re,ge,U),k=new D0(z,w,X),Pe=new v0(B),oe=new n_(P,ie,L,w,ge,Pe),Ce=new w_(P,B),fe=new r_,ce=new u_(L),Be=new m0(P,ie,_,j,g,l),De=new g_(P,j,w),se=new T_(z,U,w,_),he=new _0(z,L,U),ee=new P0(z,L,U),U.programs=oe.programs,P.capabilities=w,P.extensions=L,P.properties=B,P.renderLists=fe,P.shadowMap=De,P.state=_,P.info=U}x!==Vt&&(T=new N0(x,t.width,t.height,o,s,r));const Te=new b_(P,z);this.xr=Te,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const b=L.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=L.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(Me,G,!1))},this.getSize=function(b){return b.set(Me,G)},this.setSize=function(b,O,Y=!0){if(Te.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}Me=b,G=O,t.width=Math.floor(b*K),t.height=Math.floor(O*K),Y===!0&&(t.style.width=b+"px",t.style.height=O+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(Me*K,G*K).floor()},this.setDrawingBufferSize=function(b,O,Y){Me=b,G=O,K=Y,t.width=Math.floor(b*Y),t.height=Math.floor(O*Y),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(x===Vt){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(te)},this.getViewport=function(b){return b.copy(ae)},this.setViewport=function(b,O,Y,V){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,O,Y,V),_.viewport(te.copy(ae).multiplyScalar(K).round())},this.getScissor=function(b){return b.copy(Ue)},this.setScissor=function(b,O,Y,V){b.isVector4?Ue.set(b.x,b.y,b.z,b.w):Ue.set(b,O,Y,V),_.scissor(Se.copy(Ue).multiplyScalar(K).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(b){_.setScissorTest(Ve=b)},this.setOpaqueSort=function(b){le=b},this.setTransparentSort=function(b){we=b},this.getClearColor=function(b){return b.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,Y=!0){let V=0;if(b){let W=!1;if(ne!==null){const me=ne.texture.format;W=m.has(me)}if(W){const me=ne.texture.type,ve=d.has(me),pe=Be.getClearColor(),be=Be.getClearAlpha(),Ae=pe.r,ke=pe.g,Xe=pe.b;ve?(S[0]=Ae,S[1]=ke,S[2]=Xe,S[3]=be,z.clearBufferuiv(z.COLOR,0,S)):(R[0]=Ae,R[1]=ke,R[2]=Xe,R[3]=be,z.clearBufferiv(z.COLOR,0,R))}else V|=z.COLOR_BUFFER_BIT}O&&(V|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(V|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&z.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),C=b},this.dispose=function(){t.removeEventListener("webglcontextlost",dt,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),Be.dispose(),fe.dispose(),ce.dispose(),B.dispose(),ie.dispose(),j.dispose(),ge.dispose(),se.dispose(),oe.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",rl),Te.removeEventListener("sessionend",al),Jn.stop()};function dt(b){b.preventDefault(),Pr("WebGLRenderer: Context Lost."),N=!0}function Qe(){Pr("WebGLRenderer: Context Restored."),N=!1;const b=U.autoReset,O=De.enabled,Y=De.autoUpdate,V=De.needsUpdate,W=De.type;Le(),U.autoReset=b,De.enabled=O,De.autoUpdate=Y,De.needsUpdate=V,De.type=W}function sn(b){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function fn(b){const O=b.target;O.removeEventListener("dispose",fn),fu(O)}function fu(b){du(b),B.remove(b)}function du(b){const O=B.get(b).programs;O!==void 0&&(O.forEach(function(Y){oe.releaseProgram(Y)}),b.isShaderMaterial&&oe.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,Y,V,W,me){O===null&&(O=Lt);const ve=W.isMesh&&W.matrixWorld.determinantAffine()<0,pe=gu(b,O,Y,V,W);_.setMaterial(V,ve);let be=Y.index,Ae=1;if(V.wireframe===!0){if(be=J.getWireframeAttribute(Y),be===void 0)return;Ae=2}const ke=Y.drawRange,Xe=Y.attributes.position;let Ee=ke.start*Ae,je=(ke.start+ke.count)*Ae;me!==null&&(Ee=Math.max(Ee,me.start*Ae),je=Math.min(je,(me.start+me.count)*Ae)),be!==null?(Ee=Math.max(Ee,0),je=Math.min(je,be.count)):Xe!=null&&(Ee=Math.max(Ee,0),je=Math.min(je,Xe.count));const bt=je-Ee;if(bt<0||bt===1/0)return;ge.setup(W,V,pe,Y,be);let gt,ht=he;if(be!==null&&(gt=re.get(be),ht=ee,ht.setIndex(gt)),W.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*xt()),ht.setMode(z.LINES)):ht.setMode(z.TRIANGLES);else if(W.isLine){let Ut=V.linewidth;Ut===void 0&&(Ut=1),_.setLineWidth(Ut*xt()),W.isLineSegments?ht.setMode(z.LINES):W.isLineLoop?ht.setMode(z.LINE_LOOP):ht.setMode(z.LINE_STRIP)}else W.isPoints?ht.setMode(z.POINTS):W.isSprite&&ht.setMode(z.TRIANGLES);if(W.isBatchedMesh)if(L.get("WEBGL_multi_draw"))ht.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ut=W._multiDrawStarts,xe=W._multiDrawCounts,Ot=W._multiDrawCount,Ke=be?re.get(be).bytesPerElement:1,Kt=B.get(V).currentProgram.getUniforms();for(let dn=0;dn<Ot;dn++)Kt.setValue(z,"_gl_DrawID",dn),ht.render(Ut[dn]/Ke,xe[dn])}else if(W.isInstancedMesh)ht.renderInstances(Ee,bt,W.count);else if(Y.isInstancedBufferGeometry){const Ut=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,xe=Math.min(Y.instanceCount,Ut);ht.renderInstances(Ee,bt,xe)}else ht.render(Ee,bt)};function sl(b,O,Y,V){C!==null&&b.isNodeMaterial&&C.setObject(V,b),We===!0&&Pe.setState(b,Y,!1),b.transparent===!0&&b.side===en&&b.forceSinglePass===!1?(b.side=Wt,b.needsUpdate=!0,Ls(b,O,V),b.side=oi,b.needsUpdate=!0,Ls(b,O,V),b.side=en):Ls(b,O,V)}this.compile=function(b,O,Y=null){Y===null&&(Y=b),C!==null&&C.renderStart(b,O,Y),E=ce.get(Y),E.init(O),M.push(E),Y.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),b!==Y&&b.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights(),C!==null&&C.updateLights(E.state.lightsArray),it=this.localClippingEnabled,We=Pe.init(this.clippingPlanes,it),We===!0&&Pe.setGlobalState(this.clippingPlanes,O),C!==null&&De.render(E.state.shadowsArray,Y,O);const V=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const me=W.material;if(me)if(Array.isArray(me))for(let ve=0;ve<me.length;ve++){const pe=me[ve];sl(pe,Y,O,W),V.add(pe)}else sl(me,Y,O,W),V.add(me)}),E=M.pop(),C!==null&&C.renderEnd(),V},this.compileAsync=function(b,O,Y=null){const V=this.compile(b,O,Y);return new Promise(W=>{function me(){if(V.forEach(function(ve){const be=B.get(ve).currentProgram;(be===void 0||be.isReady())&&V.delete(ve)}),V.size===0){W(b);return}setTimeout(me,10)}L.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Vr=null;function pu(b){Vr&&Vr(b)}function rl(){Jn.stop()}function al(){Jn.start()}const Jn=new Nh;Jn.setAnimationLoop(pu),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(b){Vr=b,Te.setAnimationLoop(b),b===null?Jn.stop():Jn.start()},Te.addEventListener("sessionstart",rl),Te.addEventListener("sessionend",al),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;C!==null&&C.renderStart(b,O);const Y=Te.enabled===!0&&Te.isPresenting===!0,V=T!==null&&(ne===null||Y)&&T.begin(P,ne);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(O),O=Te.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,O,ne),E=ce.get(b,M.length),E.init(O),E.state.textureUnits=X.getTextureUnits(),M.push(E),Ge.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Fe.setFromProjectionMatrix(Ge,Mn,O.reversedDepth),it=this.localClippingEnabled,We=Pe.init(this.clippingPlanes,it),y=fe.get(b,A.length),y.init(),A.push(y),Te.enabled===!0&&Te.isPresenting===!0){const ve=P.xr.getDepthSensingMesh();ve!==null&&Wr(ve,O,-1/0,P.sortObjects)}Wr(b,O,0,P.sortObjects),y.finish(),C!==null&&C.updateLights(E.state.lightsArray),P.sortObjects===!0&&y.sort(le,we),mt=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,mt&&Be.addToRenderList(y,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),We===!0&&Pe.beginShadows();const W=E.state.shadowsArray;if(De.render(W,b,O),We===!0&&Pe.endShadows(),(V&&T.hasRenderPass())===!1){const ve=y.opaque,pe=y.transmissive;if(E.setupLights(),O.isArrayCamera){const be=O.cameras;if(pe.length>0)for(let Ae=0,ke=be.length;Ae<ke;Ae++){const Xe=be[Ae];ll(ve,pe,b,Xe)}mt&&Be.render(b);for(let Ae=0,ke=be.length;Ae<ke;Ae++){const Xe=be[Ae];ol(y,b,Xe,Xe.viewport)}}else pe.length>0&&ll(ve,pe,b,O),mt&&Be.render(b),ol(y,b,O)}ne!==null&&q===0&&(X.updateMultisampleRenderTarget(ne),X.updateRenderTargetMipmap(ne)),V&&T.end(P),b.isScene===!0&&b.onAfterRender(P,b,O),ge.resetDefaultState(),Z=-1,Q=null,M.pop(),M.length>0?(E=M[M.length-1],X.setTextureUnits(E.state.textureUnits),We===!0&&Pe.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,C!==null&&C.renderEnd()};function Wr(b,O,Y,V){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(Fe)){V&&ct.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ge);const ve=j.update(b),pe=b.material;pe.visible&&y.push(b,ve,pe,Y,ct.z,null,O)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(Fe))){const ve=j.update(b),pe=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ct.copy(b.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),ct.copy(ve.boundingSphere.center)),ct.applyMatrix4(b.matrixWorld).applyMatrix4(Ge)),Array.isArray(pe)){const be=ve.groups;for(let Ae=0,ke=be.length;Ae<ke;Ae++){const Xe=be[Ae],Ee=pe[Xe.materialIndex];Ee&&Ee.visible&&y.push(b,ve,Ee,Y,ct.z,Xe,O)}}else pe.visible&&y.push(b,ve,pe,Y,ct.z,null,O)}}const me=b.children;for(let ve=0,pe=me.length;ve<pe;ve++)Wr(me[ve],O,Y,V)}function ol(b,O,Y,V){const{opaque:W,transmissive:me,transparent:ve}=b;E.setupLightsView(Y),We===!0&&Pe.setGlobalState(P.clippingPlanes,Y),V&&_.viewport(te.copy(V)),W.length>0&&Ps(W,O,Y),me.length>0&&Ps(me,O,Y),ve.length>0&&Ps(ve,O,Y),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function ll(b,O,Y,V){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[V.id]===void 0){const Ee=L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[V.id]=new $t(1,1,{generateMipmaps:!0,type:Ee?un:Vt,minFilter:ai,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const me=E.state.transmissionRenderTarget[V.id],ve=V.viewport||te;me.setSize(ve.z*P.transmissionResolutionScale,ve.w*P.transmissionResolutionScale);const pe=P.getRenderTarget(),be=P.getActiveCubeFace(),Ae=P.getActiveMipmapLevel();P.setRenderTarget(me),P.getClearColor(Ze),ze=P.getClearAlpha(),ze<1&&P.setClearColor(16777215,.5),P.clear(),mt&&Be.render(Y);const ke=P.toneMapping;P.toneMapping=Sn;const Xe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),We===!0&&Pe.setGlobalState(P.clippingPlanes,V),Ps(b,Y,V),X.updateMultisampleRenderTarget(me),X.updateRenderTargetMipmap(me),L.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let je=0,bt=O.length;je<bt;je++){const gt=O[je],{object:ht,geometry:Ut,material:xe,group:Ot}=gt;if(xe.side===en&&ht.layers.test(V.layers)){const Ke=xe.side;xe.side=Wt,xe.needsUpdate=!0,cl(ht,Y,V,Ut,xe,Ot),xe.side=Ke,xe.needsUpdate=!0,Ee=!0}}Ee===!0&&(X.updateMultisampleRenderTarget(me),X.updateRenderTargetMipmap(me))}P.setRenderTarget(pe,be,Ae),P.setClearColor(Ze,ze),Xe!==void 0&&(V.viewport=Xe),P.toneMapping=ke}function Ps(b,O,Y){const V=O.isScene===!0?O.overrideMaterial:null;for(let W=0,me=b.length;W<me;W++){const ve=b[W],{object:pe,geometry:be,group:Ae}=ve;let ke=ve.material;ke.allowOverride===!0&&V!==null&&(ke=V),pe.layers.test(Y.layers)&&cl(pe,O,Y,be,ke,Ae)}}function cl(b,O,Y,V,W,me){C!==null&&W.isNodeMaterial&&C.setObject(b,W),b.onBeforeRender(P,O,Y,V,W,me),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(P,O,Y,V,b,me),W.transparent===!0&&W.side===en&&W.forceSinglePass===!1?(W.side=Wt,W.needsUpdate=!0,P.renderBufferDirect(Y,O,V,W,b,me),W.side=oi,W.needsUpdate=!0,P.renderBufferDirect(Y,O,V,W,b,me),W.side=en):P.renderBufferDirect(Y,O,V,W,b,me),b.onAfterRender(P,O,Y,V,W,me)}function Ls(b,O,Y){O.isScene!==!0&&(O=Lt);const V=B.get(b),W=E.state.lights,me=E.state.shadowsArray,ve=W.state.version,pe=oe.getParameters(b,W.state,me,O,Y,E.state.lightProbeGridArray),be=oe.getProgramCacheKey(pe);let Ae=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;const ke=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=ie.get(b.envMap||V.environment,ke),V.envMapRotation=V.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ae===void 0&&(b.addEventListener("dispose",fn),Ae=new Map,V.programs=Ae);let Xe=Ae.get(be);if(Xe!==void 0){if(V.currentProgram===Xe&&V.lightsStateVersion===ve)return ul(b,pe),Xe}else pe.uniforms=oe.getUniforms(b),C!==null&&b.isNodeMaterial&&C.build(b,Y,pe),b.onBeforeCompile(pe,P),Xe=oe.acquireProgram(pe,be),Ae.set(be,Xe),V.uniforms=pe.uniforms;const Ee=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ee.clippingPlanes=Pe.uniform),ul(b,pe),V.needsLights=xu(b),V.lightsStateVersion=ve,V.needsLights&&(Ee.ambientLightColor.value=W.state.ambient,Ee.lightProbe.value=W.state.probe,Ee.sunLights.value=W.state.sun,Ee.sunLightShadows.value=W.state.sunShadow,Ee.directionalLights.value=W.state.directional,Ee.directionalLightShadows.value=W.state.directionalShadow,Ee.spotLights.value=W.state.spot,Ee.spotLightShadows.value=W.state.spotShadow,Ee.rectAreaLights.value=W.state.rectArea,Ee.ltc_1.value=W.state.rectAreaLTC1,Ee.ltc_2.value=W.state.rectAreaLTC2,Ee.pointLights.value=W.state.point,Ee.pointLightShadows.value=W.state.pointShadow,Ee.hemisphereLights.value=W.state.hemi,Ee.sunShadowMatrix.value=W.state.sunShadowMatrix,Ee.sunShadowCascade.value=W.state.sunShadowCascade,Ee.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ee.spotLightMatrix.value=W.state.spotLightMatrix,Ee.spotLightMap.value=W.state.spotLightMap,Ee.pointShadowMatrix.value=W.state.pointShadowMatrix),V.lightProbeGrid=E.state.lightProbeGridArray.length>0,V.currentProgram=Xe,V.uniformsList=null,Xe}function hl(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Mr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function ul(b,O){const Y=B.get(b);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function mu(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(O.matrixWorld);for(let Y=0,V=b.length;Y<V;Y++){const W=b[Y];if(W.texture!==null&&W.boundingBox.containsPoint(v))return W}return null}function gu(b,O,Y,V,W){O.isScene!==!0&&(O=Lt),X.resetTextureUnits();const me=O.fog,ve=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,pe=ne===null?P.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ye.workingColorSpace,be=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ae=ie.get(V.envMap||ve,be),ke=V.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xe=!!Y.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ee=!!Y.morphAttributes.position,je=!!Y.morphAttributes.normal,bt=!!Y.morphAttributes.color;let gt=Sn;V.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(gt=P.toneMapping);const ht=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ut=ht!==void 0?ht.length:0,xe=B.get(V),Ot=E.state.lights;if(We===!0&&(it===!0||b!==Q)){const pt=b===Q&&V.id===Z;Pe.setState(V,b,pt)}let Ke=!1;V.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Ot.state.version||xe.outputColorSpace!==pe||W.isBatchedMesh&&xe.batching===!1||!W.isBatchedMesh&&xe.batching===!0||W.isBatchedMesh&&xe.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&xe.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&xe.instancing===!1||!W.isInstancedMesh&&xe.instancing===!0||W.isSkinnedMesh&&xe.skinning===!1||!W.isSkinnedMesh&&xe.skinning===!0||W.isInstancedMesh&&xe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&xe.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&xe.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&xe.instancingMorph===!1&&W.morphTexture!==null||xe.envMap!==Ae||V.fog===!0&&xe.fog!==me||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Pe.numPlanes||xe.numIntersection!==Pe.numIntersection)||xe.vertexAlphas!==ke||xe.vertexTangents!==Xe||xe.morphTargets!==Ee||xe.morphNormals!==je||xe.morphColors!==bt||xe.toneMapping!==gt||xe.morphTargetsCount!==Ut||!!xe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,xe.__version=V.version);let Kt=xe.currentProgram;Ke===!0&&(Kt=Ls(V,O,W),C&&V.isNodeMaterial&&C.onUpdateProgram(V,Kt,xe));let dn=!1,zn=!1,gi=!1;const at=Kt.getUniforms(),Mt=xe.uniforms;if(_.useProgram(Kt.program)&&(dn=!0,zn=!0,gi=!0),V.id!==Z&&(Z=V.id,zn=!0),xe.needsLights){const pt=mu(E.state.lightProbeGridArray,W);xe.lightProbeGrid!==pt&&(xe.lightProbeGrid=pt,zn=!0)}if(dn||Q!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),at.setValue(z,"projectionMatrix",b.projectionMatrix),at.setValue(z,"viewMatrix",b.matrixWorldInverse);const Hn=at.map.cameraPosition;Hn!==void 0&&Hn.setValue(z,lt.setFromMatrixPosition(b.matrixWorld)),w.logarithmicDepthBuffer&&at.setValue(z,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&at.setValue(z,"isOrthographic",b.isOrthographicCamera===!0),Q!==b&&(Q=b,zn=!0,gi=!0)}if(xe.needsLights&&(Ot.state.sunShadowMap.length>0&&at.setValue(z,"sunShadowMap",Ot.state.sunShadowMap,X),Ot.state.directionalShadowMap.length>0&&at.setValue(z,"directionalShadowMap",Ot.state.directionalShadowMap,X),Ot.state.spotShadowMap.length>0&&at.setValue(z,"spotShadowMap",Ot.state.spotShadowMap,X),Ot.state.pointShadowMap.length>0&&at.setValue(z,"pointShadowMap",Ot.state.pointShadowMap,X)),W.isSkinnedMesh){at.setOptional(z,W,"bindMatrix"),at.setOptional(z,W,"bindMatrixInverse");const pt=W.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),at.setValue(z,"boneTexture",pt.boneTexture,X))}W.isBatchedMesh&&(at.setOptional(z,W,"batchingTexture"),at.setValue(z,"batchingTexture",W._matricesTexture,X),at.setOptional(z,W,"batchingIdTexture"),at.setValue(z,"batchingIdTexture",W._indirectTexture,X),at.setOptional(z,W,"batchingColorTexture"),W._colorsTexture!==null&&at.setValue(z,"batchingColorTexture",W._colorsTexture,X));const kn=Y.morphAttributes;if((kn.position!==void 0||kn.normal!==void 0||kn.color!==void 0)&&k.update(W,Y,Kt),(zn||xe.receiveShadow!==W.receiveShadow)&&(xe.receiveShadow=W.receiveShadow,at.setValue(z,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&(Mt.envMapIntensity.value=O.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=R_()),zn){if(at.setValue(z,"toneMappingExposure",P.toneMappingExposure),xe.needsLights&&_u(Mt,gi),me&&V.fog===!0&&Ce.refreshFogUniforms(Mt,me),Ce.refreshMaterialUniforms(Mt,V,K,G,E.state.transmissionRenderTarget[b.id]),xe.needsLights&&xe.lightProbeGrid){const pt=xe.lightProbeGrid;Mt.probesSH.value=pt.texture,Mt.probesMin.value.copy(pt.boundingBox.min),Mt.probesMax.value.copy(pt.boundingBox.max),Mt.probesResolution.value.copy(pt.resolution)}Mr.upload(z,hl(xe),Mt,X)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Mr.upload(z,hl(xe),Mt,X),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&at.setValue(z,"center",W.center),at.setValue(z,"modelViewMatrix",W.modelViewMatrix),at.setValue(z,"normalMatrix",W.normalMatrix),at.setValue(z,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){const pt=V.uniformsGroups;for(let Hn=0,_i=pt.length;Hn<_i;Hn++){const dl=pt[Hn];se.update(dl,Kt),se.bind(dl,Kt)}}return Kt}function _u(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.sunLights.needsUpdate=O,b.sunLightShadows.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function xu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(b,O,Y){const V=B.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),B.get(b.texture).__webglTexture=O,B.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Y,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const Y=B.get(b);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,Y=0){ne=b,$=O,q=Y;let V=null,W=!1,me=!1;if(b){const pe=B.get(b);if(pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,pe.__webglFramebuffer),te.copy(b.viewport),Se.copy(b.scissor),_e=b.scissorTest,_.viewport(te),_.scissor(Se),_.setScissorTest(_e),Z=-1;return}else if(pe.__webglFramebuffer===void 0)X.setupRenderTarget(b);else if(pe.__hasExternalTextures)X.rebindTextures(b,B.get(b.texture).__webglTexture,B.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ke=b.depthTexture;if(pe.__boundDepthTexture!==ke){if(ke!==null&&B.has(ke)&&(b.width!==ke.image.width||b.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(b)}}const be=b.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(me=!0);const Ae=B.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ae[O])?V=Ae[O][Y]:V=Ae[O],W=!0):b.samples>0&&X.useMultisampledRTT(b)===!1?V=B.get(b).__webglMultisampledFramebuffer:Array.isArray(Ae)?V=Ae[Y]:V=Ae,te.copy(b.viewport),Se.copy(b.scissor),_e=b.scissorTest}else te.copy(ae).multiplyScalar(K).floor(),Se.copy(Ue).multiplyScalar(K).floor(),_e=Ve;if(Y!==0&&(V=I),_.bindFramebuffer(z.FRAMEBUFFER,V)&&_.drawBuffers(b,V),_.viewport(te),_.scissor(Se),_.setScissorTest(_e),W){const pe=B.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,pe.__webglTexture,Y)}else if(me){const pe=O;for(let be=0;be<b.textures.length;be++){const Ae=B.get(b.textures[be]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+be,Ae.__webglTexture,Y,pe)}}else if(b!==null&&Y!==0){const pe=B.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,pe.__webglTexture,Y)}Z=-1};function fl(b){const O=B.get(b);return(O.__readFormat!==b.format||O.__readType!==b.type)&&(O.__readFormat=b.format,O.__readType=b.type,O.__formatReadable=w.textureFormatReadable(b.format),O.__typeReadable=w.textureTypeReadable(b.type)),O}this.readRenderTargetPixels=function(b,O,Y,V,W,me,ve,pe=0){if(!(b&&b.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=B.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be){_.bindFramebuffer(z.FRAMEBUFFER,be);try{const Ae=b.textures[pe],ke=Ae.format,Xe=Ae.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+pe);const Ee=fl(Ae);if(Ee.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-V&&Y>=0&&Y<=b.height-W&&z.readPixels(O,Y,V,W,ue.convert(ke),ue.convert(Xe),me)}finally{const Ae=ne!==null?B.get(ne).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(b,O,Y,V,W,me,ve,pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=B.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ve!==void 0&&(be=be[ve]),be)if(O>=0&&O<=b.width-V&&Y>=0&&Y<=b.height-W){_.bindFramebuffer(z.FRAMEBUFFER,be);const Ae=b.textures[pe],ke=Ae.format,Xe=Ae.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+pe);const Ee=fl(Ae);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,je),z.bufferData(z.PIXEL_PACK_BUFFER,me.byteLength,z.STREAM_READ),z.readPixels(O,Y,V,W,ue.convert(ke),ue.convert(Xe),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const bt=ne!==null?B.get(ne).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,bt);const gt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await bf(z,gt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,je),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,me),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(je),z.deleteSync(gt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,Y=0){const V=Math.pow(2,-Y),W=Math.floor(b.image.width*V),me=Math.floor(b.image.height*V),ve=O!==null?O.x:0,pe=O!==null?O.y:0;X.setTexture2D(b,0),z.copyTexSubImage2D(z.TEXTURE_2D,Y,0,0,ve,pe,W,me),_.unbindTexture()},this.copyTextureToTexture=function(b,O,Y=null,V=null,W=0,me=0){let ve,pe,be,Ae,ke,Xe,Ee,je,bt;const gt=b.isCompressedTexture?b.mipmaps[me]:b.image;if(Y!==null)ve=Y.max.x-Y.min.x,pe=Y.max.y-Y.min.y,be=Y.isBox3?Y.max.z-Y.min.z:1,Ae=Y.min.x,ke=Y.min.y,Xe=Y.isBox3?Y.min.z:0;else{const Mt=Math.pow(2,-W);ve=Math.floor(gt.width*Mt),pe=Math.floor(gt.height*Mt),b.isDataArrayTexture?be=gt.depth:b.isData3DTexture?be=Math.floor(gt.depth*Mt):be=1,Ae=0,ke=0,Xe=0}V!==null?(Ee=V.x,je=V.y,bt=V.z):(Ee=0,je=0,bt=0);const ht=ue.convert(O.format),Ut=ue.convert(O.type);let xe;O.isData3DTexture?(X.setTexture3D(O,0),xe=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(X.setTexture2DArray(O,0),xe=z.TEXTURE_2D_ARRAY):(X.setTexture2D(O,0),xe=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);const Ot=_.getParameter(z.UNPACK_ROW_LENGTH),Ke=_.getParameter(z.UNPACK_IMAGE_HEIGHT),Kt=_.getParameter(z.UNPACK_SKIP_PIXELS),dn=_.getParameter(z.UNPACK_SKIP_ROWS),zn=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,gt.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,gt.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Ae),_.pixelStorei(z.UNPACK_SKIP_ROWS,ke),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Xe);const gi=b.isDataArrayTexture||b.isData3DTexture,at=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const Mt=B.get(b),kn=B.get(O),pt=B.get(Mt.__renderTarget),Hn=B.get(kn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,pt.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let _i=0;_i<be;_i++)gi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,B.get(b).__webglTexture,W,Xe+_i),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,B.get(O).__webglTexture,me,bt+_i)),z.blitFramebuffer(Ae,ke,ve,pe,Ee,je,ve,pe,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||B.has(b)){const Mt=B.get(b),kn=B.get(O);_.bindFramebuffer(z.READ_FRAMEBUFFER,D),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,F);for(let pt=0;pt<be;pt++)gi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Mt.__webglTexture,W,Xe+pt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Mt.__webglTexture,W),at?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,kn.__webglTexture,me,bt+pt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,kn.__webglTexture,me),W!==0?z.blitFramebuffer(Ae,ke,ve,pe,Ee,je,ve,pe,z.COLOR_BUFFER_BIT,z.NEAREST):at?z.copyTexSubImage3D(xe,me,Ee,je,bt+pt,Ae,ke,ve,pe):z.copyTexSubImage2D(xe,me,Ee,je,Ae,ke,ve,pe);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else at?b.isDataTexture||b.isData3DTexture?z.texSubImage3D(xe,me,Ee,je,bt,ve,pe,be,ht,Ut,gt.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(xe,me,Ee,je,bt,ve,pe,be,ht,gt.data):z.texSubImage3D(xe,me,Ee,je,bt,ve,pe,be,ht,Ut,gt):b.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,me,Ee,je,ve,pe,ht,Ut,gt.data):b.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,me,Ee,je,gt.width,gt.height,ht,gt.data):z.texSubImage2D(z.TEXTURE_2D,me,Ee,je,ve,pe,ht,Ut,gt);_.pixelStorei(z.UNPACK_ROW_LENGTH,Ot),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ke),_.pixelStorei(z.UNPACK_SKIP_PIXELS,Kt),_.pixelStorei(z.UNPACK_SKIP_ROWS,dn),_.pixelStorei(z.UNPACK_SKIP_IMAGES,zn),me===0&&O.generateMipmaps&&z.generateMipmap(xe),_.unbindTexture()},this.initRenderTarget=function(b){B.get(b).__webglFramebuffer===void 0&&X.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?X.setTextureCube(b,0):b.isData3DTexture?X.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?X.setTexture2DArray(b,0):X.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){$=0,q=0,ne=null,_.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const lr={land:[34,58,56],land2:[46,76,68],sand:[222,202,146],coast:[24,30,52]},Vh=(i,e)=>{const t=i.length,n=(e+Math.PI)/(Math.PI*2)*t,s=Math.floor(n),r=n-s;return i[(s%t+t)%t]*(1-r)+i[((s+1)%t+t)%t]*r};function Zv(i,e,{n:t=30,sigil:n=jc(i),colour:s=eh(n),sigilShare:r=.45,minScale:a=.62}={}){const o=Math.max(...e),l=Math.max(a,Math.min(1,o))/o,c=(t/2-1.5)*l,u=t/2,f=(v,y)=>{const E=v+.5-u,A=y+.5-u;return Math.hypot(E,A)<=c*Vh(e,Math.atan2(A,E))},h=new Uint8ClampedArray(t*t*4),p=(v,y)=>{h[v*4]=y[0],h[v*4+1]=y[1],h[v*4+2]=y[2],h[v*4+3]=255},g=new Uint8Array(t*t);for(let v=0;v<t;v++)for(let y=0;y<t;y++)g[v*t+y]=f(y,v)?1:0;const x=(v,y)=>v>=0&&y>=0&&v<t&&y<t&&g[y*t+v]===1,m=(v,y)=>!x(v-1,y)||!x(v+1,y)||!x(v,y-1)||!x(v,y+1);for(let v=0;v<t;v++)for(let y=0;y<t;y++){const E=v*t+y;x(y,v)?p(E,m(y,v)?lr.sand:Math.hypot(y+.5-u,v+.5-u)<c*.55?lr.land:lr.land2):(x(y-1,v)||x(y+1,v)||x(y,v-1)||x(y,v+1))&&p(E,lr.coast)}const d=Math.max(11,Math.round(t*r*Math.min(1,l*Math.max(...e)+.2))),S=Math.round((t-d)/2),R=Qc(n,d);for(let v=0;v<d;v++)for(let y=0;y<d;y++)R[v*d+y]<1/0&&g[(v+S)*t+y+S]&&p((v+S)*t+y+S,s);return{w:t,h:t,rgba:h}}function P_(i,{steps:e=i.length}={}){const t=[],n=.48/Math.max(1,...i);for(let s=0;s<e;s++){const r=-Math.PI+s/e*Math.PI*2,a=n*Vh(i,r);t.push([.5+a*Math.cos(r),.5+a*Math.sin(r)])}return t}function L_(i,e,t,n,s,r=16){const a=i(e,t,n);let o=a.y;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,u=i(e+Math.cos(c)*s,t,n+Math.sin(c)*s);u.y<o&&(o=u.y)}return{x:a.x,y:o}}function D_(i,e,t){const n=i+(e-i)*Math.min(1,Math.max(0,t)*8);return Math.abs(n-e)<.01?e:n}const I_=i=>i>=128?2:i>=64?1:0,Zn=.055,U_=Or*1.55,N_=Or*.42;function F_(i,e,t,n){const s=n[0]-t[0],r=n[1]-t[1],a=s*s+r*r,o=a?Math.max(0,Math.min(1,((i-t[0])*s+(e-t[1])*r)/a)):0;return Math.hypot(i-t[0]-s*o,e-t[1]-r*o)}const Co=(i,e,t)=>t.dot?Math.hypot(i-t.pts[0][0],e-t.pts[0][1]):t.pts.slice(1).reduce((n,s,r)=>Math.min(n,F_(i,e,t.pts[r],s)),1/0),ps=new Map;function O_(i,e=128,{tier:t=I_(e)}={}){const n=`${i}|${e}|${t}`;if(ps.has(n))return ps.get(n);const s=new Uint8Array(e*e);if(t<=0){const u=Qc(i,e);for(let f=0;f<u.length;f++)s[f]=u[f]<1/0?1:0;return ps.set(n,s),s}if(t>=2){const u=H_(i,e);return ps.set(n,u),u}const r=Fa(i,1).map(u=>({...u,pts:u.pts.map(([f,h])=>[Zn+f*(1-2*Zn),Zn+h*(1-2*Zn)])})),a=U_/2,o=N_/2,l=1/e,c=Math.max(Bo*1.5,a*1.1);for(let u=0;u<e;u++)for(let f=0;f<e;f++){const h=(f+.5)*l,p=(u+.5)*l;let g=0;for(const x of r){const m=Co(h,p,x),d=x.dot?c:a;if(!(m>=d)){g=x.dot?m/d>.38&&m/d<.62?0:1:m<Math.max(o,l*.6)?0:1;break}}s[u*e+f]=g}return ps.set(n,s),s}const B_=.055,Rc=Or*.85,z_=Or*.28,Cc=Bo*1.15,k_=Bo*.42;function wa(i,e,t=e){const n=new Float32Array(e*t),s=1e9,r=1,a=Math.SQRT2;for(let l=0;l<e*t;l++)n[l]=i[l]?s:0;const o=(l,c)=>l<0||c<0||l>=e||c>=t?0:n[c*e+l];for(let l=0;l<t;l++)for(let c=0;c<e;c++){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c-1,l)+r,o(c,l-1)+r,o(c-1,l-1)+a,o(c+1,l-1)+a))}for(let l=t-1;l>=0;l--)for(let c=e-1;c>=0;c--){const u=l*e+c;n[u]&&(n[u]=Math.min(n[u],o(c+1,l)+r,o(c,l+1)+r,o(c+1,l+1)+a,o(c-1,l+1)+a))}return n}function H_(i,e){const t=1/e,n=Fa(i,2).map(S=>({...S,pts:S.pts.map(([R,v])=>[Zn+R*(1-2*Zn),Zn+v*(1-2*Zn)])})),s=Fa(i,0).length,r=n.filter(S=>!S.dot),a=n.filter(S=>S.dot),o=new Set(n.slice(s).filter(S=>!S.dot)),l=new Float32Array(e*e),c=new Float32Array(e*e),u=new Uint8Array(e*e);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=(R+.5)*t,y=(S+.5)*t;let E=1/0,A=1/0;for(const M of r){const T=Co(v,y,M);o.has(M)?A=Math.min(A,T):E=Math.min(E,T)}c[S*e+R]=A,E=Math.min(E,A+Rc*.35);for(const M of a)E=Math.min(E,Co(v,y,M)-Cc*.4);l[S*e+R]=E,E<Rc&&(u[S*e+R]=1)}{const S=B_*e,R=Math.ceil(S)+2,v=e+2*R,y=new Uint8Array(v*v).fill(1);for(let T=0;T<e;T++)for(let P=0;P<e;P++)y[(T+R)*v+P+R]=u[T*e+P]?0:1;const E=wa(y,v),A=new Uint8Array(v*v);for(let T=0;T<v*v;T++)A[T]=!y[T]||E[T]<=S?1:0;const M=wa(A,v);for(let T=0;T<e;T++)for(let P=0;P<e;P++){const N=(T+R)*v+P+R;A[N]&&M[N]>S&&(u[T*e+P]=1)}}{const S=new Uint8Array(e*e),R=[];for(let v=0;v<e;v++)R.push(v,(e-1)*e+v,v*e,v*e+e-1);for(;R.length;){const v=R.pop();if(S[v]||u[v])continue;S[v]=1;const y=v%e,E=v/e|0;y>0&&R.push(v-1),y<e-1&&R.push(v+1),E>0&&R.push(v-e),E<e-1&&R.push(v+e)}for(let v=0;v<e*e;v++)S[v]||(u[v]=1)}const f=wa(u,e),h=[],p=.085*e,g=[];for(let S=0;S<e*e;S++)f[S]>p&&l[S]*e>p*.8&&g.push(S);g.sort((S,R)=>f[R]-f[S]);for(const S of g){if(h.length>=3)break;const R=S%e,v=S/e|0,y=Math.min(f[S],l[S]*e)*.8;h.some(E=>Math.hypot(E.x-R,E.y-v)<E.r+y+2)||h.push({x:R,y:v,r:y,turn:G_(i,h.length)})}const x=new Uint8Array(e*e),m=Math.max(1,z_*e),d=Math.max(m*3.2,4);for(let S=0;S<e;S++)for(let R=0;R<e;R++){const v=S*e+R;if(!u[v])continue;const y=(R+.5)*t,E=(S+.5)*t,A=f[v];let M=1;l[v]*e<m/2+.5&&A>m*.9&&(M=0),c[v]*e<m*.36+.5&&A>m*1.4&&(M=0);for(const P of a){const N=Math.hypot(y-P.pts[0][0],E-P.pts[0][1]);N<Cc&&(M=N<k_?1:0)}let T=!1;for(const P of h){const N=R+.5-P.x,C=S+.5-P.y,I=Math.hypot(N,C);if(I>P.r)continue;T=!0;const D=Math.max(1.3,P.r/(m*2.6)),F=(Math.atan2(C,N)/(Math.PI*2)+1+P.turn)%1,$=P.r/D;M=(I/$-F+8)%1<.58||I<m*.8?1:0,I>P.r-m&&(M=0)}!T&&M&&l[v]*e>m*1.8&&A>d*1.2&&A%d<m&&(M=0),x[v]=M}return x}const G_=(i,e)=>{let t=2166136261;for(const n of i+e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e3/1e3};function V_(i){const e=i.light;return e&&e.mood==="spooky"?e.spooky:null}function W_(i,e){e?.grade?i.set(e.grade,e.gradeDesat,e.gradePivot,0):i.set(0,0,1,0)}function Pc(i,e,t,n,s=1){e=(e%1+1)%1,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));const r=Math.floor(e*6),a=e*6-r,o=cr(n*(1-t),s),l=cr(n*(1-a*t),s),c=cr(n*(1-(1-a)*t),s),u=cr(n,s);switch(r%6){case 0:i.set(u,c,o);break;case 1:i.set(l,u,o);break;case 2:i.set(o,u,c);break;case 3:i.set(o,l,u);break;case 4:i.set(c,o,u);break;default:i.set(u,o,l)}}const cr=(i,e)=>Math.round(i*255)/255*e,X_=["hazeHue","hazeSat","haze","gradeHue","gradeSat","mist"];class Jv{constructor(e){this.M=e,this.cur=this.target("")}M;cur;targets=new Map;target(e){let t=this.targets.get(e);if(!t){const n=this.M.areas?.[e]??{};t={hazeHue:this.M.hazeHue,hazeSat:this.M.hazeSat,haze:this.M.haze,gradeHue:this.M.gradeHue,gradeSat:this.M.gradeSat,mist:this.M.mist,...n},this.targets.set(e,t)}return t}update(e,t,n,s,r){const a=this.target(e),o=1-Math.exp(-Math.max(0,t)*(this.M.areaEase??.5)),l=this.cur;for(const c of X_)if(c==="hazeHue"||c==="gradeHue"){const u=(a[c]-l[c]+1.5)%1-.5;l[c]=(l[c]+u*o+1)%1}else l[c]+=(a[c]-l[c])*o;if(Pc(n,l.hazeHue,l.hazeSat,1,l.haze),s){Pc(s,l.gradeHue,l.gradeSat,1);const c=.3*s.x+.55*s.y+.15*s.z;c>0&&s.set(s.x/c,s.y/c,s.z/c)}r?.setStrength(l.mist)}}function*q_(i,e){const t={wait:i,here:e};return yield t,t.value}const Wh=i=>typeof i=="object"&&i!==null&&"here"in i&&!("later"in i);function*Qv(i,e){const t={later:!0,wait:i,here:e,got:!1};return yield t,t}function*jv(i){return i.got||(i.value=yield*q_(()=>i.promise,i.here)),i.got=!0,i.value}const Xh=i=>typeof i=="object"&&i!==null&&"later"in i;function Y_(i){for(;;){const e=i.next();if(e.done)return e.value;Xh(e.value)?(e.value.value=e.value.here(),e.value.got=!0):Wh(e.value)?e.value.value=e.value.here():e.value&&qh(e.value)}}const Ta=[];async function eM(i,e,t=8,n=K_){const s={longest:0,longestAt:"",slices:0,ms:0,slow:[]};await Dc();let r="";const a=n();for(;;){const o=n();for(s.slices++;;){const l=n(),c=i.next(),u=n()-l;if(u>s.longest&&(s.longest=u,s.longestAt=r),u>4&&(s.slow.length<10||u>s.slow[9][0])&&(s.slow.push([Math.round(u),r]),s.slow.sort((f,h)=>h[0]-f[0]),s.slow.length=Math.min(10,s.slow.length)),c.done)return s.ms=n()-a,Ta.push({...s,what:e}),Ta.length>8&&Ta.shift(),c.value;if(Xh(c.value)){const f=c.value;f.promise=Lc(f).then(h=>(f.value=h,f.got=!0,h));continue}if(Wh(c.value)){const f=c.value;f.value=await Lc(f);break}if(c.value&&(r=c.value,qh(c.value)),n()-o>=t)break}await Dc()}}const $_=2e4;async function Lc(i){let e;const t=new Promise(n=>{e=setTimeout(()=>n("late"),$_)});try{const n=await Promise.race([i.wait(),t]);return n==="late"?i.here():n}catch{return i.here()}finally{clearTimeout(e)}}const K_=()=>performance.now(),qh=i=>{try{performance.mark(`witch:build-${i}`)}catch{}};function Dc(){return new Promise(i=>{if(typeof requestAnimationFrame>"u"||typeof document>"u"||document.hidden){setTimeout(i,0);return}let e=!1;const t=()=>{e||(e=!0,i())};requestAnimationFrame(()=>setTimeout(t,0)),setTimeout(t,100)})}const Ic=1,Z_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",J_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,Q_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,j_=`
uniform vec2 uAt; uniform float uR, uSoft, uAspect, uAll, uK; varying vec2 vUv;
void main() {
  float d = length((vUv - uAt) * vec2(uAspect, 1.0));
  float a = uAll > 0.5 ? 1.0 - uK : smoothstep(uR - uSoft, uR, d);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}`,ex=.8,tx=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn, uKoDim, uBroken; uniform vec4 uGrade, uPool, uIris, uIris2; uniform vec3 uGradeTint; varying vec2 vUv;
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
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${ex.toFixed(2)} * pool));
  }
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
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
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,nx=`
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
}`;function Yn(i,e,t,n=!1){const s=new $t(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,stencilBuffer:n,generateMipmaps:!1});return s.texture.colorSpace=_n,s}class ix{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Yn(1,1,et,!0),this.scene.depthTexture=new Ji(1,1,Zi),this.scene.depthTexture.format=Kn,this.fx.texture.format=nn;const n=(s,r)=>new Tt({vertexShader:Z_,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:n(J_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(Q_,{uSrc:{value:null},uStep:{value:new ye}}),veil:Object.assign(n(j_,{uAt:{value:new ye(.5,.5)},uR:{value:0},uSoft:{value:.15},uAspect:{value:1},uAll:{value:0},uK:{value:0}}),{transparent:!0,blending:Wi}),composite:n(tx,{uScene:{value:null},uBloom:{value:null},uLow:{value:new ye},uBloomStrength:{value:0},uKoDim:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0},uBroken:{value:0},uGrade:{value:new tt},uPool:{value:new tt},uIris:{value:new tt},uIris2:{value:new tt},uGradeTint:{value:new H(1,1,1)}}),tilt:n(nx,{uSrc:{value:null},uDepth:{value:null},uTexel:{value:new ye},uDir:{value:new ye},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5},uSkyBlur:{value:1},uSharp:{value:null},uSharpOn:{value:0}})},this.quad=new ot(new Un(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Yn(1,1,et);bloomB=Yn(1,1,et);a=Yn(1,1,et);b=Yn(1,1,et);fx=Yn(1,1,et);fxB=Yn(1,1,et);sharpMask=Yn(1,1,yt);sharp=[];fxScene=null;quad;cam=new kr(-1,1,1,-1,0,1);mats;low=new ye(1,1);out=new ye(1,1);fxRes=new ye(1,1);lift=0;tilt=1;get pool(){return this.mats.composite.uniforms.uPool.value}get iris(){return this.mats.composite.uniforms.uIris.value}get iris2(){return this.mats.composite.uniforms.uIris2.value}set koDim(e){this.mats.composite.uniforms.uKoDim.value=e}get sceneTarget(){return this.scene}get lowSize(){return this.low}get fxSize(){return this.fxRes}sizes(){return{scene:[this.scene.width,this.scene.height],fx:[this.fx.width,this.fx.height],bloom:[this.bright.width,this.bright.height],out:[this.out.x,this.out.y]}}resize(e,t,n,s){this.low.set(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.fxRes.set(r,a),this.fx.setSize(r,a),this.fxB.setSize(r,a),this.out.set(n,s),this.scene.setSize(e,t);const o=Math.max(1,Math.round(e/2)),l=Math.max(1,Math.round(t/2));this.bright.setSize(o,l),this.bloomB.setSize(o,l),this.a.setSize(e,t),this.b.setSize(e,t),this.sharpMask.setSize(e,t)}behind=1;behindAt=null;drawScene(e,t){const n=this.renderer,s=this.behind;if(s>=1){n.render(e,t);return}const r=t.layers.mask,a=n.autoClear;if(s<=0){const g=n.getClearColor(this.clear),x=n.getClearAlpha();t.layers.set(Ic),n.setClearColor(0,1),n.render(e,t),n.setClearColor(g,x),t.layers.mask=r;return}n.render(e,t);const o=n.getRenderTarget(),l=o?.width??1,c=o?.height??1,u=l/c,f=this.behindAt,h=f?Math.max(...[[0,0],[1,0],[0,1],[1,1]].map(([g,x])=>Math.hypot((g-f.x)*u,x-f.y))):0,p=.15;n.autoClear=!1,this.pass("veil",o,g=>{g.uAll.value=f?0:1,g.uK.value=s,g.uAt.value.copy(f??g.uAt.value),g.uAspect.value=u,g.uSoft.value=p,g.uR.value=s*(h+p)}),n.clearDepth(),t.layers.set(Ic),n.render(e,t),t.layers.mask=r,n.autoClear=a}clear=new Ne;pass(e,t,n){const s=this.mats[e];n(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}compile(){const e=new bo;for(const t of Object.values(this.mats)){const n=new ot(this.quad.geometry,t);n.frustumCulled=!1,e.add(n)}return this.renderer.compileAsync(e,this.cam)}sceneMs=0;render(e,t){Y_(this.renderSteps(e,t))}*renderSteps(e,t,n=!0){const s=n?null:this.b,r=this.renderer,a=this.tuning;r.setRenderTarget(this.scene);const o=performance.now();this.drawScene(e,t),this.sceneMs=performance.now()-o,yield;const l=a.bloom.on&&a.bloom.strength>0;if(l){const x=this.bright.width,m=this.bright.height;this.pass("bright",this.bright,d=>{d.uScene.value=this.scene.texture,d.uThreshold.value=a.bloom.threshold}),yield;for(let d=0;d<2;d++)this.pass("blur",this.bloomB,S=>{S.uSrc.value=this.bright.texture,S.uStep.value.set(1/x,0)}),this.pass("blur",this.bright,S=>{S.uSrc.value=this.bloomB.texture,S.uStep.value.set(0,1/m)}),yield}const c=!!this.fxScene&&a.suspects.effectsLayer;if(this.fxScene){const x=r.getClearColor(new Ne),m=r.getClearAlpha();r.setRenderTarget(this.fx),r.setClearColor(0,0),r.clear(),r.render(this.fxScene,t),r.setClearColor(x,m),yield;const d=this.low.x,S=this.low.y;this.pass("blur",this.fxB,R=>{R.uSrc.value=this.fx.texture,R.uStep.value.set(.6/d,0)}),this.pass("blur",this.fx,R=>{R.uSrc.value=this.fxB.texture,R.uStep.value.set(0,.6/S)}),yield}const u=a.tiltShift.on&&a.tiltShift.strength>0&&this.tilt>0;if(this.pass("composite",u?this.a:s,x=>{x.uScene.value=this.scene.texture,x.uBloom.value=this.bright.texture,x.uLow.value.copy(this.low),x.uBloomStrength.value=l?a.bloom.strength:0,x.uBlack.value=a.tone.black,x.uGamma.value=a.tone.gamma,x.uFx.value=this.fx.texture,x.uFxOn.value=c?1:0,x.uBroken.value=a.suspects.showBroken?1:0,this.setGrade(x)}),!u)return;yield;const f=this.drawSharp(t),h=this.a.width,p=this.a.height,g=x=>{const m=a.tiltShift,d=Math.max(0,Math.min(1,this.lift)),S=d*d*(3-2*d);x.uDepth.value=this.scene.depthTexture,x.uTexel.value.set(1/h,1/p),x.uStrength.value=(m.strength+(m.treetop.strength-m.strength)*S)*this.tilt,x.uBand.value=m.band+(m.treetop.band-m.band)*S,x.uCentre.value=1-m.centre,x.uSkyBlur.value=m.skyBlur??1,x.uSharp.value=this.sharpMask.texture,x.uSharpOn.value=f?1:0};this.pass("tilt",this.b,x=>{g(x),x.uSrc.value=this.a.texture,x.uDir.value.set(1,0)}),yield,this.pass("tilt",s===this.b?this.a:s,x=>{g(x),x.uSrc.value=this.b.texture,x.uDir.value.set(0,1)})}drawSharp(e){const t=this.tuning.tiltShift.stackSharp!==!1?this.sharp.filter(o=>o.mesh.visible&&(o.mesh.geometry.instanceCount??0)>0):[];if(!t.length)return!1;const n=this.renderer,s=n.autoClear,r=n.getClearColor(this.clear),a=n.getClearAlpha();n.setRenderTarget(this.sharpMask),n.setClearColor(0,0),n.clear(!0,!1,!1),n.autoClear=!1;for(const o of t){const l=o.mesh.material;o.mesh.material=o.mask,n.render(o.mesh,e),o.mesh.material=l}return n.autoClear=s,n.setClearColor(r,a),!0}get gradeTint(){return this.mats.composite.uniforms.uGradeTint.value}gradeOf;setGrade(e){const t=V_(this.tuning);if(W_(e.uGrade.value,t),t!==this.gradeOf&&(this.gradeOf=t,t)){const[n,s,r]=Mu(t.gradeHue,t.gradeSat,1).map(o=>o/255),a=.3*n+.55*s+.15*r;e.uGradeTint.value.set(n/a,s/a,r/a)}}}const ri=100,Ht=ri/Su,hr=[{from:0,px:48},{from:64,px:128},{from:128,px:256}],Ms=5,sx=240,rx=6,ax=40;function Aa(i){for(let e=i.length-1;e>=0;e--)if(i[e]>=65535)return new Uint32Array(i);return new Uint16Array(i)}function ox(i,e){const t=new Float32Array(i.length);for(let n=0;n<e.length;n+=3){const s=e[n],r=e[n+1],a=e[n+2],o=s*3,l=r*3,c=a*3,u=i[o],f=i[o+1],h=i[o+2],p=i[l],g=i[l+1],x=i[l+2],m=i[c],d=i[c+1],S=i[c+2],R=m-p,v=d-g,y=S-x,E=u-p,A=f-g,M=h-x,T=v*M-y*A,P=y*E-R*M,N=R*A-v*E;t[o]=t[o]+T,t[o+1]=t[o+1]+P,t[o+2]=t[o+2]+N,t[l]=t[l]+T,t[l+1]=t[l+1]+P,t[l+2]=t[l+2]+N,t[c]=t[c]+T,t[c+1]=t[c+1]+P,t[c+2]=t[c+2]+N}for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],a=t[n+2],o=1/(Math.sqrt(s*s+r*r+a*a)||1);t[n]=s*o,t[n+1]=r*o,t[n+2]=a*o}return t}function Yh(i,e){const{cols:t,rows:n,step:s}=i,r=t*n,a=new Float32Array(r*3),o=[];let l=0;for(let d=0;d<n;d++)for(let S=0;S<t;S++){const R=d*t+S,v=i.h[R],y=v>0?.04+v*e*Ms:-.12;a[R*3]=(i.x0+S*s)*e,a[R*3+1]=y,a[R*3+2]=(i.z0+d*s)*e,l=Math.max(l,y)}for(let d=0;d<n-1;d++)for(let S=0;S<t-1;S++){const R=d*t+S,v=R+1,y=R+t,E=y+1;i.h[R]<=0&&i.h[v]<=0&&i.h[y]<=0&&i.h[E]<=0||o.push(R,y,v,v,y,E)}const c=Aa(o),u=ox(a,c);let f=.1;for(let d=0;d<r;d++)f=Math.max(f,a[d*3+1]);const h=new Uint8Array(r);for(let d=0;d<r;d++)h[d]=Math.round(Math.max(0,Math.min(1,a[d*3+1]/f))*255);const p=new Float32Array(r*3),g=new Float32Array(r),x=[];for(let d=0;d<r;d++)p[d*3]=a[d*3],p[d*3+1]=.03,p[d*3+2]=a[d*3+2],g[d]=i.h[d]>0||i.water?.[d]===2?0:Math.min(1,-i.h[d]/sx);for(let d=0;d<n-1;d++)for(let S=0;S<t-1;S++){const R=d*t+S,v=R+1,y=R+t,E=y+1;g[R]>=1&&g[v]>=1&&g[y]>=1&&g[E]>=1||i.h[R]>0&&i.h[v]>0&&i.h[y]>0&&i.h[E]>0||x.push(R,y,v,v,y,E)}let m=null;if(i.water&&i.level){const d=i.water,S=i.level,R=new Float32Array(r*3),v=new Float32Array(r),y=[];for(let A=0;A<r;A++){const M=d[A]===2?S[A]:0;R[A*3]=a[A*3],R[A*3+1]=.06+M*e*Ms,R[A*3+2]=a[A*3+2],v[A]=d[A]===2?Math.min(1,(S[A]-i.h[A])/rx):0}for(let A=0;A<n;A++)for(let M=0;M<t;M++){const T=A*t+M;if(d[T]!==2){for(const P of[T-1,T+1,T-t,T+t])if(P>=0&&P<r&&d[P]===2){R[T*3+1]=.06+S[P]*e*Ms;break}}}const E=new Float32Array(r);if(i.looks)for(let A=0;A<r;A++)E[A]=i.looks[A];{const A=new Float32Array(r),M=1.4142;for(let C=0;C<r;C++)A[C]=d[C]===2?1e9:0;for(let C=0;C<n;C++)for(let I=0;I<t;I++){const D=C*t+I;if(!A[D])continue;let F=A[D];I>0&&(F=Math.min(F,A[D-1]+1)),C>0&&(F=Math.min(F,A[D-t]+1),I>0&&(F=Math.min(F,A[D-t-1]+M)),I<t-1&&(F=Math.min(F,A[D-t+1]+M))),A[D]=F}for(let C=n-1;C>=0;C--)for(let I=t-1;I>=0;I--){const D=C*t+I;if(!A[D])continue;let F=A[D];I<t-1&&(F=Math.min(F,A[D+1]+1)),C<n-1&&(F=Math.min(F,A[D+t]+1),I<t-1&&(F=Math.min(F,A[D+t+1]+M)),I>0&&(F=Math.min(F,A[D+t-1]+M))),A[D]=F}const T=new Int32Array(r).fill(-1),P=[],N=[];for(let C=0;C<r;C++){if(E[C]!==7||d[C]!==2||T[C]>=0)continue;const I=P.length;let D=0;for(P.push(0),N.push(C),T[C]=I;N.length;){const F=N.pop(),$=F%t;D=Math.max(D,A[F]);for(const q of[$>0?F-1:-1,$<t-1?F+1:-1,F-t,F+t])q>=0&&q<r&&d[q]===2&&T[q]<0&&(T[q]=I,N.push(q))}P[I]=D}for(let C=0;C<r;C++)d[C]!==2||!E[C]||(v[C]=T[C]>=0?Math.min(1,(A[C]-.5)/Math.max(1,P[T[C]]-.5)):Math.min(1,(A[C]-.5)*s/ax))}for(let A=0;A<n-1;A++)for(let M=0;M<t-1;M++){const T=A*t+M,P=T+1,N=T+t,C=N+1;E[T]===4||E[P]===4||E[N]===4||E[C]===4||(d[T]===2||d[P]===2||d[N]===2||d[C]===2)&&y.push(T,N,P,P,N,C)}y.length&&(m={lp:R,ld:v,lk:E,li:Aa(y)})}return{pos:a,normal:u,idx:c,top:l,tile:h,tmax:f,flat:p,depth:g,wi:Aa(x),lakes:m}}const Uc=[8,5.5,8,11,13,15],lx=i=>i.id==="home"?Uc[0]:Uc[Math.max(1,Math.min(5,i.phase))],$h=11,Ra=$h*2.3,Nc=2048,Kh=(i,e,t)=>`
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
}`,cx=`
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${Kh("moonLit","hAtMap",16)}`,jo=`
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${Kh("moonLit","hAtTile",20)}`,Zh=2,Jh=1,hx=96,ux=16,fx=$h*Jh,dx=9,px=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,mx=`
uniform float uTime, uR, uRings; uniform vec3 uMoonDir; varying vec3 vW;
${cx}
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
}`,gx=`
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`,_x="varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }",xx=`
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
}`,vx=`attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Mx=`
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`,Sx=`
varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,yx=`
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${jo}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`,bx=`
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,Ex=`
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${jo}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`,wx={deep:new Ne(.08,.2,.34),pale:new Ne(.22,.46,.52)},Fc={deep:new Ne(.15,.28,.37),pale:new Ne(.3,.52,.56)},Tx=`
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Ax=`
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${jo}
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
}`,ms=i=>i*i*(3-2*i),Rx=i=>i*i,Yt={frame:1.6,swoop:2.8,run:1.2,dist:600,pitchDeg:50,onward:60},Cx=.9;function Px(i,e=24,t=0,n){const s=n??O_(i,e,{tier:t}),r=new Uint8Array(e*e*4);for(let o=0;o<e;o++)for(let l=0;l<e;l++){const c=o*e+l,u=((e-1-o)*e+l)*4;s[c]&&r.set([255,255,255,255],u)}const a=new mi(r,e,e);return a.magFilter=yt,a.minFilter=yt,a.needsUpdate=!0,a}function Lx(){const e=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=Math.hypot(s+.5-32,n+.5-32)/32,a=Math.max(0,1-r)**2;e.set([255,255,255,Math.round(a*255)],(n*64+s)*4)}const t=new mi(e,64,64);return t.magFilter=et,t.minFilter=et,t.needsUpdate=!0,t}function Dx(){const e=new Uint8Array(4096),t=7,n=(r,a,o)=>{if(r<0||a<0||r>=32||a>=32)return;const l=(a*32+r)*4;e.set([255,255,255,Math.max(e[l+3],Math.round(o*255))],l)};for(let r=0;r<t;r++){const a=r/t*Math.PI*2+.4,o=32*(.38+.04*Math.sin(r*2.3)),l=Math.round(32/2+Math.cos(a)*o),c=Math.round(32/2+Math.sin(a)*o),u=1+r%2;n(l,c,1);for(let f=1;f<=u;f++){const h=1-f/(u+1);n(l+f,c,h),n(l-f,c,h),n(l,c+f,h),n(l,c-f,h)}}const s=new mi(e,32,32);return s.magFilter=yt,s.minFilter=et,s.needsUpdate=!0,s}function Ix(i){const e=i.outline,t=lx(i);if(e&&e.loops.some(a=>a.sea)){const l=Ht;let c=0;for(const f of e.loops)if(f.sea)for(let h=0;h<f.pts.length;h+=2)c=Math.max(c,Math.hypot(f.pts[h]-0,f.pts[h+1]-0));const u=[];for(const f of e.loops){const h=f.pts.length/2,p=h>160?2:1,g=[];for(let x=0;x<h;x+=p)g.push(new ye((f.pts[x*2]-0)*l,-(f.pts[x*2+1]-0)*l));g.length>=3&&u.push({pts:g,sea:f.sea})}if(u.some(f=>f.sea))return{loops:u,k:l,cx:0,cz:0,reach:c*l}}const n=P_(i.radii).map(([a,o])=>new ye(a-.5,-(o-.5))),s=Math.max(...n.map(a=>a.length())),r=t/s;return{loops:[{pts:n.map(a=>a.multiplyScalar(r)),sea:!0}],k:0,cx:0,cz:0,reach:t}}const Oc=new H,Bc=(i,e=1)=>new Ne(i[0]/255*e,i[1]/255*e,i[2]/255*e);class Po{constructor(e,t){this.canvas=e,this.tuning=t,this.renderer=new C_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=bs,this.camera=new jt(t.camera.fov??40,1,1,4e3),this.postTuning={...t,bloom:{...t.bloom}},this.post=new ix(this.renderer,this.postTuning),this.scene.background=new Ne(329230),this.scene.add(new wd(7372992,1581104,2.6));const n=new Rd(13688063,3.2);n.position.set(-30,60,-90),this.scene.add(n),this.moonLight=n;const s=new St;s.setAttribute("position",new _t([-1,-1,0,3,-1,0,-1,3,0],3)),this.skyU={uRes:{value:new ye(1,1)},uTime:this.uTime,uMoon:{value:new ye(.28,.88)}};const r=new ot(s,new Tt({vertexShader:_x,fragmentShader:xx,uniforms:this.skyU,depthWrite:!1,depthTest:!0,depthFunc:$i}));r.frustumCulled=!1,r.renderOrder=9,this.scene.add(r),this.buildSea(),this.ring=new ot(new Nr(.92,1,64).rotateX(-Math.PI/2),new Cn({color:11066623,transparent:!0,blending:ln,depthWrite:!1})),this.ring.position.y=.15,this.ring.visible=!1,this.scene.add(this.ring)}canvas;tuning;renderer;camera;scene=new bo;post;postTuning;isles=new Map;lines=[];voyages=[];uTime={value:0};glow=Lx();sparkle=Dx();skyU;ring;focus=new H;aim=new H;dist=130;distTo=130;distOpen=130;distMax=200;sized=!1;pitch=.95;selected=null;orbit=0;yaw=0;flight=null;get flying(){return!!this.flight}w=1;h=1;unheight(e){const t=e.userData.hb;t&&(this.hScene.remove(t),this.hBodies=this.hBodies.filter(n=>n.hb!==t),this.markHeights())}markHeights(){this.hDirty||(this.hSince=this.now),this.hDirty=!0,this.hDue=Math.min(this.hSince+2,this.now+.5)}hSince=0;now=0;hDue=0;set(e,t){for(const n of this.isles.values())this.unheight(n.group);for(const n of this.isles.values())this.scene.remove(n.group);for(const n of this.lines)this.scene.remove(n);this.isles.clear(),this.lines=[];for(const n of e)this.isles.set(n.id,this.island(n));this.voyages=t;for(const n of t){const s=this.isles.get(n.from),r=this.isles.get(n.to);s&&r&&this.lines.push(this.voyage(s,r))}this.selected&&!this.isles.has(this.selected)&&(this.selected=null)}reshape(e,t){const n=this.isles.get(e);if(!n)return;const s=!n.pick;this.unheight(n.group),this.scene.remove(n.group);const r=this.island({...n.d,outline:t});s&&(r.rose=this.now),this.isles.set(e,r);for(const a of this.lines)this.scene.remove(a);this.lines=this.voyages.flatMap(a=>{const o=this.isles.get(a.from),l=this.isles.get(a.to);return o&&l?[this.voyage(o,l)]:[]})}island(e){const t=new Hi,n=e.x*ri,s=e.y*ri;t.position.set(n,0,s),this.scene.add(t);const{k:r,reach:a}=Ix(e),o=e.unknown?.72:e.sail?1:.85,l=e.outline?.ground;if(!l||!(r>0))return{d:e,group:t,x:n,z:s,top:1,reach:a};const{cols:c,rows:u,step:f}=l,h=e.outline.mesh??Yh(l,r),p=l.rgb instanceof Uint8Array?l.rgb:Uint8Array.from(l.rgb),g=new St;g.setAttribute("position",new vt(h.pos,3)),g.setAttribute("color",new vt(p,3,!0)),g.setAttribute("normal",new vt(h.normal,3)),g.setIndex(new vt(h.idx,1));const x=new mi(h.tile,c,u,As,Vt);x.unpackAlignment=1,x.minFilter=x.magFilter=et,x.needsUpdate=!0;const m={uTile:{value:x},uTileB:{value:new tt(l.x0*r,l.z0*r,1/(f*r),0)},uTileN:{value:new ye(c,u)},uTileMax:{value:h.tmax},uYScale:{value:1}},d=new ot(g,new Tt({vertexShader:Sx,fragmentShader:yx,uniforms:{...this.groundU,...m,uDim:{value:o}},vertexColors:!0})),S=h.top,R=new St;R.setAttribute("position",new vt(h.flat,3)),R.setAttribute("aDepth",new vt(h.depth,1)),R.setIndex(new vt(h.wi,1));const v=(E,A)=>new Tt({vertexShader:bx,fragmentShader:Ex,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uOpaque:{value:A},uDeep:{value:E.deep},uPale:{value:E.pale}},transparent:A<1,depthWrite:A>=1});if(t.add(new ot(R,v(wx,0))),h.lakes){const E=h.lakes,A=new St;A.setAttribute("position",new vt(E.lp,3)),A.setAttribute("aDepth",new vt(E.ld,1)),A.setAttribute("aLook",new vt(E.lk,1)),A.setIndex(new vt(E.li,1)),t.add(new ot(A,new Tt({vertexShader:Tx,fragmentShader:Ax,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uTime:this.uTime,uScale:{value:30*r},uDeep:{value:Fc.deep},uPale:{value:Fc.pale}}})))}t.add(d);{const E=new ot(d.geometry,this.heightMat);E.matrixAutoUpdate=!1,E.frustumCulled=!1,this.hScene.add(E),this.hBodies.push({hb:E,body:d}),t.userData.hb=E,this.markHeights()}const y={d:e,group:t,pick:d,x:n,z:s,top:S,reach:a,tileU:m};if(e.outline?.sigils?.length&&this.sigilInk.set(e.sigil,e.outline.sigils),e.sail){const E=eh(e.sigil),A=Math.max(dx,a*Jh),M=new ot(new Un(A,A).rotateX(-Math.PI/2),new Cn({map:this.sigilArt(e.sigil,0),color:Bc(E,.95),transparent:!0,blending:ln,depthWrite:!1}));M.position.y=S+.35,t.add(M),y.sigil=M,y.tier=0,y.size=A;const T=new ot(new Un(A*1.6,A*1.6).rotateX(-Math.PI/2),new Cn({map:this.glow,color:Bc(E,.16),transparent:!0,blending:ln,depthWrite:!1}));if(T.position.y=S+.25,t.add(T),y.glow=T,e.fresh){const P=new ot(new Un(A*1.9,A*1.9).rotateX(-Math.PI/2),new Cn({map:this.sparkle,color:new Ne(1,.95,.78),transparent:!0,blending:ln,depthWrite:!1}));P.position.y=S+.3,t.add(P),y.spark=P}}if(e.won){const E=a*1.3,A=new ot(new Nr(E*.95,E,96).rotateX(-Math.PI/2),new Cn({color:15250538,transparent:!0,blending:ln,depthWrite:!1}));A.position.y=.12,t.add(A)}return y}moonShared={uShadow:{value:0},uMoonV:{value:new H(-.3,.6,-.9).normalize()}};hmap=new $t(Nc,Nc,{depthBuffer:!0,minFilter:et,magFilter:et,generateMipmaps:!1});moonU={...this.moonShared,uHMap:{value:this.hmap.texture},uHR:{value:ri*1.02},uHMax:{value:8}};hScene=new bo;hBodies=[];hDirty=!0;moonLight=null;moonT0=0;moonLast;moonP=new H;seaMoon={value:new H(-.3,.6,-.9)};stillMoon=null;heightMat=new Tt({vertexShader:"uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",fragmentShader:"uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",uniforms:{uHR:this.moonU.uHR,uHMax:this.moonU.uHMax},side:en});groundU={...this.moonShared,uMoon:{value:new H(-.3,.6,-.9).normalize()},uShade:{value:new H(-.7,.45,-.55).normalize()},uRise:{value:3}};moonFrame(e){const t=this.tuning,n=zu(t);(this.moonLast===void 0||e-this.moonLast>1||e<this.moonLast)&&(this.moonT0=e),this.moonLast=e;const s=this.stillMoon!==null?{bearing:this.stillMoon,height:n.height,risen:1}:ku(e-this.moonT0,n),r=xi.degToRad(s.bearing),a=xi.degToRad(s.height),o=this.moonShared.uMoonV.value.set(Math.sin(r)*Math.cos(a),Math.sin(a),-Math.cos(r)*Math.cos(a));this.moonShared.uShadow.value=n.shadow*s.risen,this.groundU.uMoon.value.copy(o),this.groundU.uShade.value.set(Math.sin(r)*.8,.45,-Math.cos(r)*.8).normalize(),this.seaMoon.value.copy(o),this.moonLight?.position.copy(o).multiplyScalar(100);const l=this.skyU.uMoon.value;if(!n.disc)l.set(-1,-1);else{this.camera.updateMatrixWorld();const g=this.moonP.copy(o).multiplyScalar(this.seaR*1.6).project(this.camera);g.z>1||g.z<-1?l.set(-1,-1):l.set((g.x+1)/2,(g.y+1)/2)}vl(t)!==this.band&&this.buildSea();for(const g of this.isles.values())g.tileU&&(g.tileU.uYScale.value=g.group.scale.y);if((!this.hDirty||e<this.hDue)&&!this.flight)return;this.hDirty=!1;let c=1;for(const{hb:g,body:x}of this.hBodies){x.updateWorldMatrix(!0,!1),g.matrix.copy(x.matrixWorld),g.matrix.elements[13]-=x.parent?.position.y??0,g.matrixWorld.copy(g.matrix);const m=x.geometry;m.boundingBox||m.computeBoundingBox(),c=Math.max(c,m.boundingBox.max.y)}this.moonU.uHMax.value=c*1.05;const u=this.renderer,f=u.getRenderTarget(),h=u.getClearColor(new Ne),p=u.getClearAlpha();u.setRenderTarget(this.hmap),u.setClearColor(0,1),u.clear(),u.render(this.hScene,this.camera),u.setRenderTarget(f),u.setClearColor(h,p)}sea=null;fall=null;band=-1;seaR=ri*1.02;buildSea(){for(const t of[this.sea,this.fall])t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose());this.band=vl(this.tuning);const e=this.seaR=ri*1.02*(1+this.band);this.moonU.uHR.value=e,this.markHeights(),this.sea=new ot(new Ur(e,160).rotateX(-Math.PI/2),new Tt({vertexShader:px,fragmentShader:mx,uniforms:{...this.moonU,uTime:this.uTime,uR:{value:e},uRings:{value:ri*1.02},uMoonDir:this.seaMoon}})),this.fall=new ot(new Qo(e,e*.97,40,160,1,!0).translate(0,-20,0),new Tt({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:gx,uniforms:{uTime:this.uTime},transparent:!0,depthWrite:!1,side:en})),this.scene.add(this.sea,this.fall)}sigilArts=new Map;sigilInk=new Map;sigilArt(e,t){const n=`${e}|${t}`;let s=this.sigilArts.get(n);if(!s){const r=this.sigilInk.get(e)?.[t];s=Px(e,hr[t].px,t,r&&r.px===hr[t].px?r.ink:void 0),this.sigilArts.set(n,s)}return s}voyage(e,t){const n=new ye(e.x,e.z),s=new ye(t.x,t.z),r=s.clone().sub(n),a=r.length(),o=new ye(-r.y,r.x).normalize(),l=n.clone().add(s).multiplyScalar(.5).add(o.multiplyScalar(a*.12)),c=48,u=.9,f=[],h=[],p=[],g=[],x=v=>{const y=1-v;return new ye(y*y*n.x+2*y*v*l.x+v*v*s.x,y*y*n.y+2*y*v*l.y+v*v*s.y)},m=e.reach/a*1.1,d=1-t.reach/a*1.1;for(let v=0;v<=c;v++){const y=m+(d-m)*(v/c),E=x(y),A=x(Math.min(1,y+.01)),M=A.sub(E).normalize(),T=new ye(-M.y,M.x).multiplyScalar(u);if(f.push(E.x+T.x,.2,E.y+T.y,E.x-T.x,.2,E.y-T.y),h.push(v/c,0,v/c,1),p.push(y*a,y*a),v<c){const P=v*2;g.push(P,P+1,P+2,P+1,P+3,P+2)}}const S=new St;S.setAttribute("position",new _t(f,3)),S.setAttribute("uv",new _t(h,2)),S.setAttribute("aAlong",new _t(p,1)),S.setIndex(g);const R=new ot(S,new Tt({vertexShader:vx,fragmentShader:Mx,uniforms:{uTime:this.uTime,uColour:{value:new Ne(1,.72,.38)}},transparent:!0,blending:ln,depthWrite:!1,side:en}));return this.scene.add(R),R}reset(){this.set([],[]),this.selected=null,this.flight=null,this.orbit=0,this.yaw=0,this.pitch=.95,this.focus.set(0,0,0),this.aim.set(0,0,0),this.sized=!1,this.moonLast=void 0,this.stillMoon=null}dispose(){this.scene.traverse(e=>{const t=e;t.geometry?.dispose();for(const n of[].concat(t.material??[])){for(const s of Object.values(n))s instanceof It&&s.dispose();n.dispose()}}),this.glow.dispose(),this.sparkle.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}fly(e,t,n={}){const s=this.isles.get(e);if(!s)return!1;this.select(e),this.orbit=0,this.yaw=0;const{keys:r,G:a}=this.flightKeys(s,n),o=new Hi,l=a?(()=>{const f=Math.round(-a.z0/a.step),h=Math.round(-a.x0/a.step);return .06+Math.max(0,a.h[f*a.cols+h]??0)*Ht*Ms})():s.top,c=new ot(new Ur(1,32).rotateX(-Math.PI/2),new Cn({color:new Ne(.9,.5,1.2),transparent:!0,opacity:.9,blending:ln,depthWrite:!1})),u=new ot(new Un(5,5).rotateX(-Math.PI/2),new Cn({map:this.glow,color:new Ne(.7,.4,1),transparent:!0,opacity:.8,blending:ln,depthWrite:!1}));return o.add(c,u),o.position.y=l+.05,o.scale.setScalar(22*Ht),s.group.add(o),this.flight={id:e,t:0,keys:r,done:t,speed:Yt.onward*2/Yt.run,floor:o,size:s.size??1,rate:1,wall:0,hold:n.hold,slow:n.slow},!0}flightKeys(e,t){const n=e.d.outline?.ground;let s=e.d.outline?e.d.outline.box.maxZ:e.reach/Ht;if(n){const u=Math.round(-n.x0/n.step);for(let f=Math.max(0,Math.round(-n.z0/n.step));f<n.rows;f++)if(!(n.h[f*n.cols+u]>0)){s=n.z0+f*n.step;break}}const r=xi.degToRad(t.pitchDeg??Yt.pitchDeg),a=(t.dist??Yt.dist)*Ht,o=e.z+(s+(t.sea??-40))*Ht,l=o+Yt.onward*Ht;return{keys:[{x:this.focus.x,z:this.focus.z,dist:this.dist,pitch:this.pitch,at:0,ease:ms},{x:e.x,z:e.z,dist:Math.max(Ra,e.reach*4.2),pitch:.95,at:Yt.frame,ease:ms},{x:e.x,z:l,dist:a,pitch:r,at:Yt.frame+Yt.swoop,ease:ms},{x:e.x,z:o,dist:a,pitch:r,at:Yt.frame+Yt.swoop+Yt.run,ease:Rx}],G:n}}flightEnd(e,t={}){const n=this.isles.get(e);if(!n)return null;const s=this.flightKeys(n,t).keys.at(-1);return{x:0,z:(s.z+Math.cos(s.pitch)*s.dist-n.z)/Ht,height:Math.sin(s.pitch)*s.dist/Ht,pitch:s.pitch,fov:this.camera.fov,speed:Yt.onward*2/Yt.run}}skipFlight(){this.flight&&(this.flight.t=this.flight.keys.at(-1).at,this.flight.rate=1,this.flight.slow=void 0,this.flight.held=!1)}flyFrame(e,t){const n=this.flight,s=this.isles.get(n.id),r=n.keys.at(-1).at;n.wall+=e;const a=n.slow,o=!!a&&n.t>=n.keys[1].at&&n.wall<a.cap&&!!n.hold?.();a&&(n.rate+=((o?a.rate*Math.min(1,(r-n.t)/1):1)-n.rate)*(1-Math.exp(-e/Math.max(.01,a.ease)))),n.held=o,n.t=Math.min(r,n.t+e*n.rate);let l=1;for(;l<n.keys.length-1&&n.t>n.keys[l].at;)l++;const c=n.keys[l-1],u=n.keys[l],f=u.ease(Math.min(1,Math.max(0,(n.t-c.at)/(u.at-c.at)))),h=(x,m)=>x+(m-x)*f;this.focus.set(h(c.x,u.x),0,h(c.z,u.z)),this.aim.copy(this.focus),this.dist=this.distTo=h(c.dist,u.dist),this.pitch=h(c.pitch,u.pitch);const p=ms(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(n.keys[2].at-n.keys[1].at))));s.group.scale.y=1+(1/Ms-1)*p;const g=ms(Math.min(1,n.t/n.keys[1].at));if(s.sigil){const x=1+(60*Ht/n.size-1)*g;s.sigil.scale.set(x,1,x),s.glow?.scale.set(x,1,x)}n.floor.rotation.y=t*.6,n.floor.children[0].scale.setScalar(.9+.1*Math.sin(t*6))}select(e,t=!1){this.selected=e&&this.isles.has(e)?e:null;const n=this.selected?this.isles.get(this.selected):null;this.aim.set(n?n.x:0,0,n?n.z:0),t&&this.focus.copy(this.aim)}zoom(e){this.distTo=Math.max(Ra,Math.min(this.distMax,this.distTo*e))}pick(e,t){const n=this.canvas.getBoundingClientRect(),s=new ye((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),r=new Ld;r.setFromCamera(s,this.camera);const a=r.intersectObjects([...this.isles.values()].flatMap(u=>u.pick?[u.pick]:[]),!1)[0];if(a){for(const[u,f]of this.isles)if(f.pick===a.object)return u}const o=new H;if(!r.ray.intersectPlane(new Pn(new H(0,1,0),0),o))return null;let l=null,c=1/0;for(const[u,f]of this.isles){const h=Math.hypot(f.x-o.x,f.z-o.z)-f.reach;h<c&&(c=h,l=u)}return c<6?l:null}moonDisc(){const e=this.skyU.uMoon.value;if(e.x<0||e.x>1||e.y<0||e.y>1)return null;const t=this.canvas.getBoundingClientRect();return{x:t.left+e.x*t.width,y:t.top+(1-e.y)*t.height,r:.045*t.height}}screenTopOf(e){const t=this.isles.get(e);if(!t)return null;const n=this.canvas.getBoundingClientRect(),s=new H,r=Math.max(t.reach,(t.size??0)*.8*(t.glow?.scale.x??1),(t.size??0)*.95*(t.spark?.scale.x??0));return L_((a,o,l)=>(s.set(a,o+t.group.position.y,l).project(this.camera),{x:(s.x+1)/2*n.width,y:(1-s.y)/2*n.height}),t.x,t.top,t.z,r)}screenOf(e){const t=this.isles.get(e);if(!t)return null;const n=new H(t.x,t.top,t.z).project(this.camera),s=this.canvas.getBoundingClientRect();return{x:(n.x+1)/2*s.width,y:(1-n.y)/2*s.height}}made={w:0,h:0};resize(e,t){const n=Zh,s=Math.max(1,Math.ceil(e/n)),r=Math.max(1,Math.ceil(t/n));if(this.sized&&s===this.w&&r===this.h)return;this.w=s,this.h=r,(this.made.w!==s||this.made.h!==r)&&(this.renderer.setSize(s,r,!1),this.post.resize(s,r,s,r),this.made={w:s,h:r}),this.canvas.style.width=`${this.w*n}px`,this.canvas.style.height=`${this.h*n}px`,this.camera.aspect=this.w/this.h,this.camera.updateProjectionMatrix(),this.skyU.uRes.value.set(this.w,this.h),this.postTuning.bloom.strength=this.tuning.bloom.strength*Math.max(.3,Math.min(1,(this.h-60)/180));const a=l=>fx*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*l),o=this.distOpen;this.distOpen=a(hx),this.distMax=a(ux),this.sized?(this.distTo=Math.max(Ra,Math.min(this.distMax,this.distTo*(this.distOpen/o))),this.dist=this.distTo):(this.dist=this.distTo=this.distOpen,this.sized=!0)}frame(e,t){this.uTime.value=t,this.now=t;const n=1-Math.exp(-e*3.2);this.flight?this.flyFrame(e,t):(this.focus.lerp(this.aim,n),this.dist+=(this.distTo-this.dist)*n),this.yaw+=e*this.orbit;const s=Math.cos(this.pitch)*this.dist,r=Math.sin(this.yaw),a=Math.cos(this.yaw);this.camera.position.set(this.focus.x+s*r,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+s*a);const o=this.orbit||this.flight?0:this.dist*.035;this.camera.lookAt(this.focus.x,0,this.focus.z+o);const l=Math.max(.5,this.dist*.25),c=this.dist*3+400;(Math.abs(l-this.camera.near)>.01||Math.abs(c-this.camera.far)>1)&&(this.camera.near=l,this.camera.far=c,this.camera.updateProjectionMatrix()),this.post.lift=0;for(const h of this.isles.values()){const p=.85+.15*Math.sin(t*1.6+h.x*.1),g=h.d.id===this.selected;let x=1;if(h.sigil){const d=h.sigil.material,S=h.size*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(Oc.set(h.x,h.top,h.z)));x=S>220?Math.max(0,1-(S-220)/260):1,d.opacity=p*x,h.sigil.visible=x>0;let R=0;for(let v=1;v<hr.length;v++)S>=hr[v].from&&(R=v);R!==h.tier&&(h.tier=R,d.map=this.sigilArt(h.d.sigil,R),d.needsUpdate=!0)}if(h.glow&&(h.glow.material.opacity=(g?.85:.7)*p*x,h.glow.visible=h.sigil?.visible??!0),h.spark){const d=.5+.5*Math.sin(t*4.2+h.x*.3),S=h.spark.material;S.opacity=(.45+.55*d)*x,h.spark.visible=h.sigil?.visible??!0;const R=h.size*1.9*this.h/(2*Math.tan(xi.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(Oc.set(h.x,h.top,h.z))),v=(h.sigil?h.sigil.scale.x:1)*Math.max(1,32/Math.max(1,R));h.spark.scale.set(v,1,v),h.spark.rotation.y=t*.25}let m=0;if(h.rose!==void 0){const d=Math.min(1,(t-h.rose)/Cx),S=1-(1-d)**3;m=-(h.top+.6)*(1-S),d>=1&&(h.rose=void 0)}h.group.position.y=m+(g?Math.sin(t*2)*.12:0)}const u=this.selected?this.isles.get(this.selected):null;if(this.ring.visible=!!u&&!this.flight,u){const h=u.reach*1.6*(1+.04*Math.sin(t*3));this.ring.position.set(u.x,.15,u.z),this.ring.scale.set(h,1,h),this.ring.material.opacity=.7+.3*Math.sin(t*3)}this.moonFrame(t),this.post.render(this.scene,this.camera);const f=this.flight;if(f&&f.t>=f.keys.at(-1).at&&!f.held){const h=this.isles.get(f.id),p=this.camera.position;this.flight=null,f.done({cam:{x:(p.x-h.x)/Ht,z:(p.z-h.z)/Ht,height:p.y/Ht,pitch:this.pitch,fov:this.camera.fov,speed:f.speed*f.rate},still:this.canvas.toDataURL("image/jpeg",.88)})}}}let Gt=null;function Qh(i){return Gt?.prep?(Gt.prep=!1,Gt.chart):Gt&&!Gt.busy?(Gt.busy=!0,Gt.chart):Gt?new Po(document.createElement("canvas"),i):(Gt={chart:new Po(document.createElement("canvas"),i),busy:!0},Gt.chart)}function jh(i){if(Gt?.chart!==i){i.dispose();return}i.reset(),Gt.busy=!1}function zc(i,e){const r=new Float32Array(81),a=new Uint8Array(81),o=new Float32Array(81),l=new Uint8Array(81),c=new Uint8Array(243).fill(120);for(let h=0;h<9;h++)for(let p=0;p<9;p++){const g=h*9+p,x=Math.hypot(p-4,h-4);r[g]=x<3.5?40-x*8:-20,x<1.2?(a[g]=2,o[g]=r[g]+2,l[g]=1):r[g]<=0&&(a[g]=1)}const u={x0:-400,z0:-400,step:100,cols:9,rows:9,h:r,rgb:c,water:a,level:o,looks:l},f=new Float32Array([-300,0,0,-300,300,0,0,300]);return{id:i,x:e,y:0,phase:1,radii:[1,1,1,1],sail:!0,unknown:!1,won:!0,sigil:"home",outline:{loops:[{pts:f,sea:!0}],box:{minX:-300,maxX:300,minZ:-300,maxZ:300},ground:u,mesh:Yh(u,Ht)}}}async function tM(i){if(Gt)return;const e=Qh(i),t=Gt;t.prep=!0;try{e.resize(innerWidth*.92-4,innerHeight*.92-4),e.set([zc("home",0),zc("standIn",.2)],[{from:"home",to:"standIn"}]);const n=e;if(await Promise.all([n.scene,n.hScene].map(s=>e.renderer.compileAsync(s,e.camera))).catch(()=>{}),!t.prep)return;e.frame(1/60,0),e.frame(1/60,3);for(const s of e.renderer.info.programs??[])s.getUniforms()}finally{t.prep&&(t.prep=!1,jh(e),performance.mark("witch:chart-prepared"))}}const kc={33321:1,33323:2,32849:4,32856:4,35905:4,35907:4,33325:2,33327:4,34843:8,34842:8,33326:4,33328:8,34837:16,34836:16,33329:1,33330:1,33331:2,33332:2,33333:4,33334:4,33335:2,33336:2,33337:4,33338:4,33339:8,33340:8,36238:4,36220:4,36232:8,36214:8,36226:16,36208:16,32857:4,35898:4,35901:4,32854:2,32855:2,36194:2,33189:2,33190:4,36012:4,35056:4,36013:8,36168:1,34041:4},Hc={6408:4,6407:3,6406:1,6409:1,6410:2,6403:1,33319:2,36244:1,33320:2,36248:3,36249:4,6402:1},Ux={5121:1,5120:1,5123:2,5122:2,5125:4,5124:4,5126:4,5131:2,36193:2},Gc={32819:2,32820:2,33635:2,34042:4,33640:4,35899:4,35902:4,36269:8},Nx=33984,ur=34067,Oi=34069,Fx=32879,Ox=1285;function ii(i,e,t){return kc[i]?kc[i]:t!==void 0&&Gc[t]?Gc[t]:(Hc[e??i]??Hc[i]??4)*(t!==void 0?Ux[t]??1:1)}function nM(i,e){return Math.max(i.floor,Math.min(i.ceil,i.mb*e/(i.refWidth*i.refHeight)))}const Sr=new Map;function Bx(i,e){return Sr.has(i)||i.addEventListener("dispose",()=>Sr.delete(i)),Sr.set(i,e),i}class iM{constructor(e,t=()=>0){this.gl=e,this.canvasBytes=t;const n=e,s=this,r=(u,f,h=!1)=>{const p=n[u];typeof p=="function"&&(n[u]=function(...g){h&&f(g);const x=p.apply(e,g);return h||f(g),x})},a=u=>u>=Oi&&u<Oi+6?ur:u,o=u=>s.bound.get(s.unit<<16|a(u))??null,l=(u,f,h)=>{const p=o(u);if(!p)return;let g=s.tex.get(p);g||s.tex.set(p,g={levels:new Map,bytes:0});const x=(u-(a(u)===ur?Oi:0))*64+f,m=g.levels.get(x)??0;g.levels.set(x,h),g.bytes+=h-m,s.texBytes+=h-m};r("activeTexture",u=>{s.unit=u[0]-Nx}),r("bindTexture",u=>{s.bound.set(s.unit<<16|u[0],u[1]??null)}),r("texImage2D",u=>{const[f,h,p]=u;if(u.length>=8){const[,,,g,x,,m,d]=u;l(f,h,g*x*ii(p,m,d))}else if(u.length===6){const g=u[5],x=g?.videoWidth||g?.displayWidth||g?.width||0,m=g?.videoHeight||g?.displayHeight||g?.height||0;l(f,h,x*m*ii(p,u[3],u[4]))}}),r("texImage3D",u=>{const[f,h,p,g,x,m,,d,S]=u;l(f,h,g*x*m*ii(p,d,S))}),r("compressedTexImage2D",u=>{const[f,h]=u,p=u[u.length-1];l(f,h,typeof p=="number"?p:p?.byteLength??0)}),r("texStorage2D",u=>{const[f,h,p,g,x]=u,m=ii(p),d=f===ur?6:1;for(let S=0;S<d;S++)for(let R=0;R<h;R++)l(d>1?Oi+S:f,R,Math.max(1,g>>R)*Math.max(1,x>>R)*m)}),r("texStorage3D",u=>{const[f,h,p,g,x,m]=u,d=ii(p);for(let S=0;S<h;S++)l(f,S,Math.max(1,g>>S)*Math.max(1,x>>S)*(f===Fx?Math.max(1,m>>S):m)*d)}),r("generateMipmap",u=>{const f=u[0],h=f===ur?6:1,p=o(f),g=p&&s.tex.get(p);if(g)for(let x=0;x<h;x++){const m=h>1?Oi+x:f,d=g.levels.get((m-(h>1?Oi:0))*64)??0;l(m,63,Math.round(d/3))}}),r("deleteTexture",u=>{const f=s.tex.get(u[0]);f&&(s.texBytes-=f.bytes,s.tex.delete(u[0]))},!0),r("copyTexImage2D",u=>{const[f,h,p,,,g,x]=u;l(f,h,g*x*ii(p))}),r("framebufferTexture2D",u=>{u[3]&&s.attached.add(u[3])}),r("framebufferTextureLayer",u=>{u[2]&&s.attached.add(u[2])}),r("bindRenderbuffer",u=>{s.rb=u[1]??null});const c=(u,f,h,p)=>{if(!s.rb)return;const g=s.rbs.get(s.rb)??0,x=f*h*ii(u)*Math.max(1,p);s.rbs.set(s.rb,x),s.rbBytes+=x-g};r("renderbufferStorage",u=>{const[,f,h,p]=u;c(f,h,p,1)}),r("renderbufferStorageMultisample",u=>{const[,f,h,p,g]=u;c(h,p,g,f)}),r("deleteRenderbuffer",u=>{const f=s.rbs.get(u[0]);f!==void 0&&(s.rbBytes-=f,s.rbs.delete(u[0]))},!0)}gl;canvasBytes;tex=new Map;rbs=new Map;bound=new Map;unit=0;rb=null;attached=new WeakSet;texBytes=0;rbBytes=0;ooms=0;reset(){this.tex.clear(),this.rbs.clear(),this.bound.clear(),this.texBytes=this.rbBytes=0,this.unit=0,this.rb=null}get total(){return this.texBytes+this.rbBytes+this.canvasBytes()}bytesOf(e,t){const n=t&&e.properties.get(t).__webglTexture;return n&&this.tex.get(n)?.bytes||0}report(e){const t={},n=new Set,s=(o,l)=>{const c=l&&e.properties.get(l).__webglTexture,u=c&&!n.has(c)&&this.tex.get(c);u&&(n.add(c),t[o]=(t[o]??0)+u.bytes)};for(const[o,l]of Sr)if(o.isRenderTarget){const c=o;for(const u of c.textures)s(l,u);s(l,c.depthTexture)}else s(l,o);let r=0,a=0;for(const[o,l]of this.tex)n.has(o)||(this.attached.has(o)?a+=l.bytes:r+=l.bytes);return t.other=r,t.targets=(t.targets??0)+a+this.rbBytes,t.canvas=this.canvasBytes(),{total:this.total,byKind:t,textures:this.tex.size,buffers:this.rbs.size}}check(){let e=!1;for(let t=0,n=this.gl.getError();n&&t<8;t++,n=this.gl.getError())n===Ox&&(e=!0);return e&&this.ooms++,e}}function sM(i,e,t){const n=r=>(r/1048576).toFixed(0),s=Object.entries(i.byKind).filter(([,r])=>r>=524288).sort((r,a)=>a[1]-r[1]).map(([r,a])=>`${r} ${n(a)}`);return`gpu    ${n(i.total)} of ${e.toFixed(0)} MB  ${s.join("  ")}${t?`  · ${t} let go`:""}`}const wt=2,Re=400,Jt=8,ft=8,zx=Array.from({length:2*ft+1},(i,e)=>Float32Array.from({length:2*ft+1},(t,n)=>{const s=Math.hypot(e-ft,n-ft)*wt;return s<=ft*wt?s:0})),ut=Re+2*(ft+Jt),kt=64,Bi=24,Ca=8;function Vc(i,e,t=e.length){let n=i,s=1;for(let r=0;r<t;r+=3){const a=e[r];if(a<=0)continue;const o=Math.min(e[r+2],a>=1?1/0:a/(1-a));n+=o*e[r+1],s+=o}return n/s}const zi=(i,e)=>(i+32768)*65536+(e+32768),$n=(i,e)=>(i+1048576)*2097152+(e+1048576),kx=i=>Eo.fromHalfFloat(Eo.toHalfFloat(i)),yn={uHeight:{value:null},uHeightWin:{value:new tt(0,Re,0,0)},uBend:{value:new tt(0,0,0,0)},uBendFwd:{value:new ye(0,-1)}},Hx=`
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
  if (uBend.x <= 0.0) return w;
  float d = max(0.0, dot(w.xz - uBend.yz, uBendFwd));
  return vec3(w.x, w.y - uBend.x * d * d, w.z);
}
`,Gx=Hx+`
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
`,Vx=Gx+`
vec4 clipOf(vec3 w) { return projectionMatrix * viewMatrix * vec4(bendW(w), 1.0); }
`;function rM(i){return new Tt({vertexShader:`attribute vec4 color;
varying vec4 vCol;
uniform float uSize;
${Vx}
void main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,fragmentShader:`varying vec4 vCol;
void main() { gl_FragColor = vCol; }`,uniforms:{...yn,uSize:{value:i}},transparent:!0,depthWrite:!1,blending:ln})}function Wx(i,e,t,n){const s=Re*wt*.5,r=Math.max(Math.abs(i-t),Math.abs(e-n)),a=Math.min(1,Math.max(0,(r-(s-60))/44));return 1-a*a*(3-2*a)}class yr{constructor(e,t,n){this.map=e,this.forest=t;const s=this.H=n.maxSlope?{...n,scale:Math.max(n.scale,yu*n.amplitude/n.maxSlope)}:n;this.limit=n.maxSlope?n.maxSlope*.85:0,this.PATH_EDGE=Math.max(6,s.amplitude*.6),this.PLATEAU_FADE=Math.max(16,s.amplitude*2),eu=s.on?s.amplitude:0;{const h=bu(e.bounds,e.tuning),p=e.tuning.beach;if(h&&p){const g=Math.max(1,p.ease);let x=0;for(const m of h.sand)x=Math.max(x,m);this.beach={b:h,ease:g,hSand:p.sand,hSea:p.sea,inland:x+g+1}}}this.texture=new mi(this.half,Re,Re,As,un);const r=Bx(this.texture,"ground");r.magFilter=r.minFilter=et,r.wrapS=r.wrapT=wr,r.generateMipmaps=!1,r.colorSpace=_n,r.needsUpdate=!0,yn.uHeight.value=r;const a=e,o=a.tuning,l=a.dancefloor,c=a.treehouse,u=[],f=(h,p,g)=>{const x=u.find(d=>Math.hypot(d.x-h,d.z-p)<d.r+g),m={x:h,z:p,r:g,h:x?x.h:this.plateaued(h,p,!1)};u.push(m),this.addCircle(m)};this.indexPaths(),f(l.x,l.z,Pu(o)+2),f(c.x,c.z,o.treehouse.clear+2);for(const h of a.grounds)f(h.x,h.z,h.r+2);for(const h of a.scenes??[])f(h.x,h.z,h.r+2);for(const h of a.legendClearings??[])f(h.x,h.z,h.r+2);for(const[h,p]of a.cells){const g=a.soundsystemSpot(h,p);(h!==a.centreCell[0]||p!==a.centreCell[1])&&f(g.x,g.z,o.soundsystemFootprint+2);const x=a.setPieceSpot(h,p);x&&f(x.x,x.z,o.setPieceFootprint*o.setPieceScale+2)}}map;forest;texture;half=new Uint16Array(Re*Re);data=new Float32Array(Re*Re);ci=0;cj=0;filled=!1;circles=new Map;pondBuckets=new Set;pondsAt=[NaN,NaN];ahead=new Map;srcV=new Float32Array(ut*ut);srcI=new Int32Array(ut*ut).fill(-2147483648);srcJ=new Int32Array(ut*ut);limit=0;segs=new Float64Array(0);segGrid=new Map;segH=new Float64Array(0);lnId=new Float64Array(16);lnW=new Float64Array(16);lnS=new Float64Array(16);lnK=new Float64Array(16);prepared="";PATH_EDGE;PLATEAU_FADE;H;raw(e,t){if(!this.H.on)return 0;const n=Eu(this.map,e,t,this.H),s=this.beach;if(!s||s.b.land.roughDistAt(e,t)>s.inland+8)return n;const r=s.b.land.distAt(e,t),a=s.b.sandAt(e,t),o=a-r;return o<-s.ease?n:o<0?n+(s.hSand-n)*ts((o+s.ease)/s.ease):s.hSand+(s.hSea-s.hSand)*ts(Math.min(1,o/Math.max(1,a+s.b.out)))}beach=null;addCircle(e){const t=e.r+this.PLATEAU_FADE;for(let n=Math.floor((e.z-t)/kt);n<=Math.floor((e.z+t)/kt);n++)for(let s=Math.floor((e.x-t)/kt);s<=Math.floor((e.x+t)/kt);s++){const r=zi(s,n);let a=this.circles.get(r);a||this.circles.set(r,a=[]),a.push(e)}}ponds(e,t){const n=zi(e,t);if(!this.pondBuckets.has(n)){this.pondBuckets.add(n);for(const s of this.forest.lightsNear((e+.5)*kt,(t+.5)*kt,kt*.75))s.kind==="pond"&&Math.floor(s.x/kt)===e&&Math.floor(s.z/kt)===t&&this.addCircle({x:s.x,z:s.z,r:3*s.size+1.5,h:this.pondLevel(s.x,s.z),pond:!0})}}pondLevels=new Map;pondLevel(e,t){const n=f=>`${f.x},${f.z}`,s=this.pondLevels.get(n({x:e,z:t}));if(s!==void 0)return s;const r=12,a=f=>3*f.size+1.5,o=this.forest.lightsNear(e,t,8).find(f=>f.kind==="pond"&&f.x===e&&f.z===t);if(!o)return this.plateaued(e,t,!1);const l=[o],c=new Set([n(o)]);for(let f=0;f<l.length&&l.length<100;f++){const h=l[f];for(const p of this.forest.lightsNear(h.x,h.z,a(h)+r+20))p.kind==="pond"&&!c.has(n(p))&&Math.hypot(p.x-h.x,p.z-h.z)<a(h)+a(p)+r&&(c.add(n(p)),l.push(p))}const u=Math.min(...l.map(f=>this.plateaued(f.x,f.z,!1)));for(const f of l)this.pondLevels.set(n(f),u);return u}platPulls=new Float64Array(48);srcPulls=new Float64Array(48);static pull(e,t,n,s,r){if(t+3>e.length){const a=new Float64Array(e.length*2);a.set(e),e=a}return e[t]=n,e[t+1]=s,e[t+2]=r,e}plateaued(e,t,n=!0){let s=this.raw(e,t);const r=Math.floor(e/kt),a=Math.floor(t/kt),o=Math.ceil((this.PLATEAU_FADE+16)/kt);if(n&&(r!==this.pondsAt[0]||a!==this.pondsAt[1])){for(let u=-o;u<=o;u++)for(let f=-o;f<=o;f++)this.ponds(r+f,a+u);this.pondsAt[0]=r,this.pondsAt[1]=a}const l=this.circles.get(zi(r,a));let c=0;if(l)for(let u=0;u<l.length;u++){const f=l[u];if(f.pond&&!n)continue;const h=e-f.x,p=t-f.z,g=Math.sqrt(h*h+p*p);g<f.r+this.PLATEAU_FADE&&(this.platPulls=yr.pull(this.platPulls,c,1-ts((g-f.r)/this.PLATEAU_FADE),f.h,1e6),c+=3)}return Vc(s,this.platPulls,c)}indexPaths(){const e=this.map.paths.lines,t=[];e.forEach((n,s)=>{for(let r=0;r<n.pts.length-1;r+=4){const[a,o]=[n.pts[r],n.pts[Math.min(r+4,n.pts.length-1)]],l=o[0]-a[0],c=o[1]-a[1],u=t.length/Ca,f=n.half+this.PATH_EDGE;t.push(a[0],a[1],l,c,l*l+c*c||1,n.half,s,r);for(let h=Math.floor((Math.min(a[1],o[1])-f)/Bi);h<=Math.floor((Math.max(a[1],o[1])+f)/Bi);h++)for(let p=Math.floor((Math.min(a[0],o[0])-f)/Bi);p<=Math.floor((Math.max(a[0],o[0])+f)/Bi);p++){const g=zi(p,h);let x=this.segGrid.get(g);x||this.segGrid.set(g,x=[]),x.push(u)}}}),this.segs=Float64Array.from(t),this.segH=new Float64Array(t.length/Ca*2).fill(NaN)}sourceAt(e,t){if(!this.H.on)return 0;const n=this.plateaued(e,t),s=this.segGrid.get(zi(Math.floor(e/Bi),Math.floor(t/Bi)));if(!s)return n;const r=this.segs,a=this.lnId,o=this.lnW,l=this.lnS,c=this.lnK;let u=0;for(let p=0;p<s.length;p++){const g=s[p],x=g*Ca,m=r[x],d=r[x+1],S=r[x+2],R=r[x+3],v=r[x+5],y=Math.min(1,Math.max(0,((e-m)*S+(t-d)*R)/r[x+4])),E=e-m-S*y,A=t-d-R*y,M=Math.sqrt(E*E+A*A);if(M>v+this.PATH_EDGE)continue;const T=r[x+6],P=1-ts((M-v)/this.PATH_EDGE),N=P*P*P*P+1e-9;Number.isNaN(this.segH[g*2])&&(this.segH[g*2]=this.plateaued(m,d),this.segH[g*2+1]=this.plateaued(m+S,d+R));const C=this.segH[g*2]*(1-y)+this.segH[g*2+1]*y;let I=0;for(;I<u&&a[I]!==T;)I++;if(I===u){if(u===a.length)continue;a[I]=T,o[I]=0,l[I]=0,c[I]=0,u++}o[I]=Math.max(o[I],P),l[I]+=N*C,c[I]+=N}if(!u)return n;let f=0;for(let p=0;p<u;p++)this.srcPulls=yr.pull(this.srcPulls,f,o[p],l[p]/c[p],1e3),f+=3;const h=this.circles.get(zi(Math.floor(e/kt),Math.floor(t/kt)));if(h)for(let p=0;p<h.length;p++){const g=h[p],x=e-g.x,m=t-g.z,d=Math.sqrt(x*x+m*m);d<g.r+this.PATH_EDGE&&(this.srcPulls=yr.pull(this.srcPulls,f,1-ts((d-g.r)/this.PATH_EDGE),g.h,1e6),f+=3)}return Vc(n,this.srcPulls,f)}src(e,t){const n=(t%ut+ut)%ut*ut+(e%ut+ut)%ut;return(this.srcI[n]!==e||this.srcJ[n]!==t)&&(this.srcV[n]=this.sourceAt(e*wt,t*wt),this.srcI[n]=e,this.srcJ[n]=t),this.srcV[n]}limited(e,t,n=!1){const s=this.src(e,t);if(!(this.limit>0))return s;const r=this.srcV,a=this.srcI,o=this.srcJ,l=this.cols,c=this.limit;for(let h=0;h<=2*ft;h++)l[h]=((e+h-ft)%ut+ut)%ut;let u=s,f=s;for(let h=-ft;h<=ft;h++){const p=((t+h)%ut+ut)%ut*ut,g=zx[h+ft];for(let x=-ft;x<=ft;x++){const m=g[x+ft];if(m===0)continue;const d=p+l[x+ft],S=e+x,R=t+h,v=n||a[d]===S&&o[d]===R?r[d]:this.src(S,R),y=c*m;v+y<u&&(u=v+y),v-y>f&&(f=v-y)}}return(u+f)/2}cols=new Int32Array(2*ft+1);ensure(e,t,n,s){if(this.limit>0)for(let r=n-ft;r<s+ft;r++)for(let a=e-ft;a<t+ft;a++)this.src(a,r)}limitedBlock(e,t,n,s,r){const a=t-e,o=s-n;if(a<=0||o<=0)return;if(!(this.limit>0)){for(let m=n;m<s;m++)for(let d=e;d<t;d++)r(d,m,this.src(d,m));return}this.ensure(e,t,n,s);const l=a+2*ft,c=o+2*ft,u=this.srcV,f=2*ft+1,h=new Float64Array(l*c);for(let m=0;m<c;m++){const d=((n-ft+m)%ut+ut)%ut*ut;for(let S=0;S<l;S++)h[m*l+S]=u[d+((e-ft+S)%ut+ut)%ut]}const p=new Float64Array(c*a),g=new Float64Array(c*a);for(let m=0;m<c;m++)for(let d=0;d<a;d++){let S=1/0,R=-1/0;for(let v=0;v<f;v++){const y=h[m*l+d+v];y<S&&(S=y),y>R&&(R=y)}p[m*a+d]=S,g[m*a+d]=R}const x=this.limit*wt*(1-1e-6);for(let m=0;m<o;m++)for(let d=0;d<a;d++){let S=1/0,R=-1/0;for(let E=0;E<f;E++){const A=p[(m+E)*a+d],M=g[(m+E)*a+d];A<S&&(S=A),M>R&&(R=M)}const v=e+d,y=n+m;r(v,y,R-S<x?h[(m+ft)*l+d+ft]:this.limited(v,y,!0))}}gained(e,t,n,s,r){const a=Re/2,o=e-a,l=t-a,c=n-a,u=s-a;if(!r||Math.abs(e-n)>=Re||Math.abs(t-s)>=Re)return[[o,o+Re,l,l+Re]];const f=[];return e>n?f.push([c+Re,o+Re,l,l+Re]):e<n&&f.push([o,c,l,l+Re]),t>s?f.push([o,o+Re,u+Re,l+Re]):t<s&&f.push([o,o+Re,l,u]),f}put(e,t){const n=$n(e,t),s=this.ahead.get(n);s!==void 0&&this.ahead.delete(n);const r=(t%Re+Re)%Re*Re+(e%Re+Re)%Re,a=s??this.limited(e,t,!0);this.half[r]=Eo.toHalfFloat(a),this.data[r]=kx(a)}dispose(){this.texture.dispose()}follow(e,t){const n=Math.round(e/wt/Jt)*Jt,s=Math.round(t/wt/Jt)*Jt;if(this.filled&&n===this.ci&&s===this.cj)return!1;const r=Re/2,a=n-r,o=s-r,l=this.ci-r,c=this.cj-r,u=(f,h)=>this.filled&&f>=l&&f<l+Re&&h>=c&&h<c+Re;if(this.H.on){for(const[f,h,p,g]of this.gained(n,s,this.ci,this.cj,this.filled)){const x=this.ahead;let m=!1;for(let d=p;d<g&&!m;d++)for(let S=f;S<h;S++)if(!x.has($n(S,d))){m=!0;break}m&&this.limitedBlock(f,h,p,g,(d,S,R)=>{!u(d,S)&&!x.has($n(d,S))&&x.set($n(d,S),R)})}for(let f=o;f<o+Re;f++)for(let h=a;h<a+Re;h++)u(h,f)||this.put(h,f)}return this.ci=n,this.cj=s,this.filled=!0,this.texture.needsUpdate=!0,yn.uHeightWin.value.set(this.H.on?wt:0,Re,n*wt,s*wt),!0}*fillSteps(e,t){if(this.filled||!this.H.on){this.follow(e,t);return}const n=Math.round(e/wt/Jt)*Jt,s=Math.round(t/wt/Jt)*Jt,r=Re/2,a=n-r,o=s-r,l=8,c=(u,f,h)=>{const p=$n(u,f);this.ahead.has(p)||this.ahead.set(p,h)};for(let u=o;u<o+Re;u+=l)yield,this.limitedBlock(a,a+Re,u,Math.min(u+l,o+Re),c);for(let u=o;u<o+Re;u+=l){yield;for(let f=u;f<Math.min(u+l,o+Re);f++)for(let h=a;h<a+Re;h++)this.put(h,f)}this.ci=n,this.cj=s,this.filled=!0,this.texture.needsUpdate=!0,yn.uHeightWin.value.set(wt,Re,n*wt,s*wt)}prepare(e,t,n){if(!this.H.on||!this.filled)return!0;this.ahead.size>Re*Jt*6&&this.ahead.clear();const s=Math.abs(e)>1?Math.sign(e)*Jt:0,r=Math.abs(t)>1?Math.sign(t)*Jt:0;if(!s&&!r)return!0;const a=`${this.ci},${this.cj},${s},${r}`;if(a===this.prepared)return!0;const o=performance.now(),l=16,c=(u,f,h)=>{const p=$n(u,f);this.ahead.has(p)||this.ahead.set(p,h)};for(const[u,f,h,p]of this.gained(this.ci+s,this.cj+r,this.ci,this.cj,!0)){const g=p-h>=f-u;for(let x=g?h:u;x<(g?p:f);x+=l){const m=Math.min(x+l,g?p:f),[d,S,R,v]=g?[u,f,x,m]:[x,m,h,p];if(!(this.ahead.has($n(d,R))&&this.ahead.has($n(S-1,v-1)))){if(performance.now()-o>n)return!1;this.limitedBlock(d,S,R,v,c)}}}return this.prepared=a,!0}heightAt(e,t){if(!this.H.on||!this.filled)return 0;const n=Wx(e,t,this.ci*wt,this.cj*wt);if(n<=0)return 0;const s=e/wt,r=t/wt,a=Math.floor(s),o=Math.floor(r),l=s-a,c=r-o,u=this.data,f=(a%Re+Re)%Re,h=((a+1)%Re+Re)%Re,p=(o%Re+Re)%Re*Re,g=((o+1)%Re+Re)%Re*Re,x=u[p+f],m=u[p+h],d=u[g+f],S=u[g+h],R=x+(m-x)*l,v=d+(S-d)*l;return(R+(v-R)*c)*n}}let eu=0,Lo=null;function aM(i){Lo=i}function el(i,e){return Lo?Lo.heightAt(i,e):0}function Xx(i){const e=yn.uBend.value,t=yn.uBendFwd.value;if(e.x<=0)return i;const n=Math.max(0,(i.x-e.y)*t.x+(i.z-e.z)*t.y);return i.y-=e.x*n*n,i}function qx(i,e,t,n,s=1/0){if(t<=0||i<=0)return!0;const r=yn.uBend.value,a=Math.max(1,n.z-r.z),o=n.y+eu+3,l=-a+Math.sqrt(a*a+o/t);if(i<=l)return!0;if(i>l+s)return!1;const c=(o+t*l*l)/(l+a);return(o-e+t*i*i)/(i+a)<=c+.02}function Yx(i,e,t,n){const s=yn.uBend.value,r=yn.uBendFwd.value;if(s.x<=0)return!0;const a=(i-s.y)*r.x+(t-s.z)*r.y;if(a<=0)return!0;const o=Math.max(1,-((n.x-s.y)*r.x+(n.z-s.z)*r.y)),l=n.y+s.w+3,c=-o+Math.sqrt(o*o+l/s.x);if(a<=c)return!0;const u=(l+s.x*c*c)/(c+o);return(l-e+s.x*a*a)/(a+o)<=u+.02}function oM(i,e,t,n){return Yx(i,e+el(i,t),t,n)}function $x(i){return i.y+=el(i.x,i.z),Xx(i)}const Cs=3,Wc=new Map;function lM(i,e=3){const t=`${i}:${e}`,n=Wc.get(t);if(n)return n;const s=Math.round(i*1.7)+4,r=Math.round(i*1.5)+4,a=Math.max(2,Math.round(i/10)),o=Array.from({length:Math.max(1,e)},(C,I)=>a+I);let l=0;for(let C=1;C<o.length;C++)l+=Math.round((o[C]+o[C-1])*.55);const c=Math.max(1,o[0]+2+l-Math.round(s*.28)),u=0,f=c+s/2,h=Math.ceil(c+s+1),p=s*.4,g=r*.3,x=u+r*.6,m=[[.5,.35,.33],[.25,.47,.25],[.75,.45,.27],[.1,.66,.17],[.9,.64,.18],[.34,.76,.22],[.66,.77,.21]].map(([C,I,D])=>[c+C*s,u+I*r,D*r]),d=(C,I)=>{const D=C+.5,F=I+.5;if(((D-f)/p)**2+((F-x)/g)**2<=1)return!0;for(const[$,q,ne]of m)if((D-$)**2+(F-q)**2<=ne*ne)return!0;return!1},S=[];let R=Math.round(c+s*.28),v=0;for(let C=-o[o.length-1];C<=o[o.length-1];C++)for(let I=0;I<r+4;I++)d(R+C,I)&&(v=Math.max(v,I));let y=v+2+o[o.length-1];for(let C=o.length-1;C>=0;C--)S.unshift({x:R,y,r:o[C]}),C&&(y+=o[C]+o[C-1]+1,R-=Math.round((o[C]+o[C-1])*.55));const E=S[0].y+o[0]+1,A=(C,I)=>{if(d(C,I))return!0;const D=C+.5,F=I+.5;for(const $ of S)if((D-$.x)**2+(F-$.y)**2<=$.r*$.r+.6)return!0;return!1},M=new Uint8Array(h*E);for(let C=0;C<E;C++)for(let I=0;I<h;I++)A(I,C)&&(M[C*h+I]=2);for(let C=0;C<2;C++)for(let I=0;I<E;I++)for(let D=0;D<h;D++){const F=I*h+D;M[F]&&+(D>0&&!!M[F-1])+ +(D<h-1&&!!M[F+1])+ +(I>0&&!!M[F-h])+ +(I<E-1&&!!M[F+h])<2&&(M[F]=0)}const T=(C,I)=>C>=0&&I>=0&&C<h&&I<E&&M[I*h+C]!==0,P=[];for(let C=0;C<E;C++)for(let I=0;I<h;I++)M[C*h+I]&&(!T(I-1,C)||!T(I+1,C)||!T(I,C-1)||!T(I,C+1))&&P.push(C*h+I);for(const C of P)M[C]=1;const N={w:h,h:E,px:M,box:{x:Math.round(f-i/2),y:Math.round(u+r*.55-i/2),n:i},foot:{x:S[0].x,y:S[0].y},puffs:S};return Wc.set(t,N),N}function Kx(i,e,t,n){for(let s=0;s<i.px.length;s++){const r=i.px[s]===1?e:i.px[s]===2?t:null,a=s*4;if(!r){n[a+3]=0;continue}n[a]=r[0],n[a+1]=r[1],n[a+2]=r[2],n[a+3]=Math.round(r[3]*255)}}function cM(i,e,t,n=!0){if(!n)return{kind:"emoji",alpha:1};const s=Math.max(.2,t.hold),r=i+e%11*s*.29,a=Math.floor(r/s),o=r-a*s,l=a%2===0?"emoji":Lu(e,a,9127)<t.flask?"flask":"sigil",c=Math.max(.001,Math.min(t.fade,s/2)),u=Math.max(0,Math.min(1,o/c,(s-o)/c));return{kind:l,alpha:u*u*(3-2*u)}}const Xc=(i,e)=>Math.round(i/e)*e;function tu(i,e){if(e===void 0)return 1;const t=i.bubbles.levelScale??[1];return t[Math.max(0,Math.min(t.length-1,e))]}const Zx=(i,e)=>Math.max(1,Math.round(Cs*tu(i,e)));function Jx(i,e,t,n){const s=tu(t,n),r=t.pixelSize*t.bubbles.scale*s,a=t.bubbles.emojiPixels;i.style.setProperty("--px",`${Zx(t,n)}px`),e.style.width=e.style.height=`${Math.round(a*r)}px`}const Do=new Map,Fr=new Map;function nu(i,e){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d",{willReadFrequently:!0});let s=null;if(n){n.font=`${e-1}px sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e/2,e/2+.5),s=n.getImageData(0,0,e,e);for(let r=3;r<s.data.length;r+=4)s.data[r]=s.data[r]<110?0:255;n.putImageData(s,0,0)}return Fr.set(`${i}:${e}`,s),t}function iu(i,e){const t=`${i}:${e}`;let n=Do.get(t);return n||(n=nu(i,e).toDataURL(),Do.set(t,n),n)}function su(i,e){return Fr.has(`${i}:${e}`)||nu(i,e),Fr.get(`${i}:${e}`)??null}const qc=new Set;function hM(i,e,t){const n=`${i}:${e}`;if(!qc.has(n)){const s=document.createElement("canvas");s.width=s.height=e;const r=s.getContext("2d",{willReadFrequently:!0});let a=null;if(r){t(r,e),a=r.getImageData(0,0,e,e);for(let o=3;o<a.data.length;o+=4)a.data[o]=a.data[o]<110?0:255;r.putImageData(a,0,0)}Fr.set(n,a),Do.set(n,s.toDataURL()),qc.add(n)}return i}function Qx(i,e){const t=document.createElement("img");return t.src=iu(i,e),t.width=t.height=e,t.style.imageRendering="pixelated",t.style.display="block",t}function uM(i){const e=document.createElement("div"),t=document.createElement("img");return e.className="bubble",t.style.imageRendering="pixelated",t.style.display="block",e.append(t),i.append(e),{el:e,img:t}}function fM(i,e,t,n,s){i.dataset.e===t&&i.dataset.l===`${s}`||(i.dataset.e=t,i.dataset.l=`${s}`,e.src=iu(t,n.bubbles.emojiPixels),Jx(i,e,n,s))}function dM(i,e){const t=document.createElement("div"),n=document.createElement("canvas");return t.className=`thought ${e}`,n.className="cloud",t.append(n),i.append(t),t}function pM(i,e,t,n,s=Cs){const r=`${e.w}x${e.h}:${t}:${n}:${s}`;if(i.dataset.c===r)return;i.dataset.c=r;const a=i.firstChild,o=a.getContext("2d");if(a.width=e.w,a.height=e.h,a.style.width=`${e.w*s}px`,a.style.height=`${e.h*s}px`,i.style.width=a.style.width,i.style.height=a.style.height,!o)return;const l=o.createImageData(e.w,e.h);Kx(e,t,n,l.data),o.putImageData(l,0,0)}function jx(i,e,t,n,s,r,a,o=Cs){n=`${n}@${o}`;let l=i.querySelector(`.${t}`);if(!l||l.dataset.k!==n){const c=r();c.classList.add(t),c.dataset.k=n;const u=Math.floor((e.box.n-s)/2);Object.assign(c.style,{position:"absolute",width:`${s*o}px`,height:`${s*o}px`,left:`${(e.box.x+u)*o}px`,top:`${(e.box.y+u)*o}px`}),l?l.replaceWith(c):i.append(c),l=c}for(const c of i.querySelectorAll(":scope > :not(.cloud)"))c.style.display=c===l?"":"none";l.style.opacity=a.toFixed(2)}function mM(i,e,t,n,s,r=Cs){jx(i,e,"emoji",`${t}:${n}`,n,()=>Qx(t,n),s,r)}function gM(i,e,t,n=Cs){return{left:Xc(e-(i.foot.x+.5)*n,n),top:Xc(t-(i.foot.y+.5)*n,n)}}const Je=40,ru=4,Dn=13,xn=17;let Pa=null;function au(){if(Pa)return Pa;const i=[];for(let e=0;e<Je;e++)for(let t=0;t<Je;t++){const n=t+.5-Je/2,s=e+.5-Je/2,r=Math.hypot(n,s);Math.abs(r-Dn)>.7||i.push(t,e,(Math.atan2(n,-s)/(Math.PI*2)+1)%1)}return Pa=i}function Io(i,e,t,n,s,r,a,o){const l=t/2,c=Math.cos(e),u=Math.sin(e),f=-u,h=c;for(let p=0;p<t;p++)for(let g=0;g<t;g++){const x=g+.5-l,m=p+.5-l,d=x*c+m*u,S=x*f+m*h;d<n||d>s||Math.abs(S)<=r*(s-d)/(s-n)+.25&&i.dot(g,p,a,o)}}function ev(i,e,t,n,s,r,a,o,l=1){const c=e.getWorldDirection(i),u=c.x,f=c.z,h=Math.hypot(u,f)||1,p=s-a,g=r-o,x=(p*u+g*f)/h,m=(p*-f+g*u)/h,d=yn.uBend.value,S=-(r-d.z),R=el(s,r),v=$x(i.set(s,l,r)).project(e),y=v.z<1&&qx(S,R+l,d.x,e.position),E=Math.max(Math.abs(v.x),Math.abs(v.y)),A=y?Math.min(1,Math.max(0,(E-.9)/.25)):1,M=m,T=-x,P=1/Math.max(Math.abs(M)/(.84*t/2),Math.abs(T)/(.76*n/2),1e-9);return{show:A,ex:t/2+M*P,ey:n/2+T*P,angle:Math.atan2(T,M),sx:(v.x+1)/2*t,sy:(1-v.y)/2*n,seen:y}}function _M(i,e,t,n,s){const r=[],a=e/2,o=Math.cos(i),l=Math.sin(i),c=-l,u=o;for(let f=0;f<e;f++)for(let h=0;h<e;h++){const p=h+.5-a,g=f+.5-a,x=p*o+g*l,m=p*c+g*u;x<t||x>n||Math.abs(m)<=s*(n-x)/(n-t)+.25&&r.push([h,f])}return r}const tv={spots:[],reset(){this.spots.length=0},claim(i,e,t,n,s=!0){const r=-Math.sin(t),a=Math.cos(t),o=(u,f)=>this.spots.every(h=>Math.hypot(h.x-u,h.y-f)>=h.r+n);let l=i,c=e;for(let u=0;s&&u<8&&!o(l,c);u++){const f=(u%2?-1:1)*Math.ceil((u+1)/2)*n*2;l=i+r*f,c=e+a*f}return this.spots.push({x:l,y:c,r:n}),{x:l,y:c}}};class ou{constructor(e,t=ru,n=1){this.scale=t,this.canvas.width=this.canvas.height=Je,Object.assign(this.canvas.style,{position:"fixed",width:`${Je*t}px`,height:`${Je*t}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none",opacity:`${n}`}),this.label.style.opacity=`${n}`,Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:'16px "Tiny5", ui-monospace, monospace',lineHeight:"16px",whiteSpace:"nowrap",color:"#e8e2f4",background:"rgba(14, 9, 22, 0.72)",padding:"2px 4px 0",transform:"translate(-50%, -50%)",webkitFontSmoothing:"none"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData(Je,Je)}scale;canvas=document.createElement("canvas");label=document.createElement("div");g;img;hide(){this.canvas.style.display="none",this.label.style.display="none"}dispose(){this.canvas.remove(),this.label.remove()}text="";textW=0;say(e,t,n,s,r,a,o){const l=this.label;l.style.display="block",e!==this.text&&(this.text=l.textContent=e,this.textW=l.offsetWidth||e.length*9),l.style.color=t;const c=o+Math.abs(r)*this.textW/2+Math.abs(a)*9;l.style.left=`${n+r*c}px`,l.style.top=`${s+a*c}px`}place(e,t,n=1){const s=Je*this.scale*n;this.canvas.style.display="block",this.canvas.style.width=this.canvas.style.height=`${s}px`,this.canvas.style.left=`${e-s/2}px`,this.canvas.style.top=`${t-s/2}px`}clear(){this.img.data.fill(0)}dot(e,t,n,s){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=Je||t>=Je||s<=.02)return;const r=(t*Je+e)*4;if(this.img.data[r+3]>=s*255)return;const a=this.img.data;a[r]=n[0],a[r+1]=n[1],a[r+2]=n[2],a[r+3]=Math.round(Math.min(1,s)*255)}flush(){this.g.putImageData(this.img,0,0)}}function nv(i,e,t,n=Math.PI/2,s){i.clear();const r=au();for(let o=0;o<r.length;o+=3)i.dot(r[o],r[o+1],e,1);const a=su(t,xn);if(a&&a.data.some((o,l)=>l%4===3&&o>0)){const o=Math.floor((Je-xn)/2),l=a.data;for(let c=0;c<xn;c++)for(let u=0;u<xn;u++){const f=(c*xn+u)*4;l[f+3]&&i.dot(o+u,o+c,[l[f],l[f+1],l[f+2]],1)}}else if(s){const o=Math.floor((Je-s[0].length)/2),l=Math.floor((Je-s.length)/2);for(let c=0;c<s.length;c++)for(let u=0;u<s[c].length;u++)s[c][u]!=="."&&i.dot(o+u,l+c,e,1)}Io(i,n,Je,Dn+2,Dn+7,3.5,e,1),i.flush()}const iv=Dn+7,sv=i=>{const e=t=>{const n=((t+i*6)%6+6)%6;return 1-Math.max(0,Math.min(1,Math.min(n,4-n)))};return[e(5),e(3),e(1)]},fr={plate:0,vivid:0},Yc=[10,8,20],Uo=i=>{const e=(i[0]+i[1]+i[2])/3,t=i.map(s=>s*.55+e*.45),n=Math.max(...i)*.95/Math.max(1,...t);return t.map(s=>Math.min(255,s*n))},rv=["....##########.","....##########.","....##......##.","....##########.","....##......##.","....##......##.","....##......##.","....##......##.","....##......##.",".####....#####.","#####...######.","#####...######.",".###.....####.."],xM=["..........+...+","......+.....+..","...........+...",".......+.+.....","....##....+..+.","...####.+......","..######...+...","..#######......",".########..+...",".#########.....","###########....","##########.....","########......."],av=["...............","####...####...#","#..####...####.","#.+..#..+.#..#.","#.++.#.+++#..#.","#..+.#..+.#.+#.","#....#....#.++.","#.+..#....#..#.","#.++.#..+.#..#.","####.####.####.","....####...####","..............."],vM=[".........###...","........####...",".......####....","......#####....","......#####....",".....######....",".....######....","....#######....","....+++++++....","..###########..","###############",".#############."],MM=[".....+++++.....",".....#####.....","......#.#......","......#.#......",".....##.##.....","...###...###...","..#.........#..",".#.+.........#.",".#+++++++++++#.","#++.++++++++++#","#++++++++.++++#","#+++++++++++++#",".#+++++++++++#.","..#+++++++++#..","...#########..."],ov=20,lv=3,cv=(i,e,t)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i))*t,hv=6;class SM{constructor(e,t=ru,n=1){this.opacity=n,this.cue=new ou(e,t,n)}opacity;cue;v=new H;glyphs=new Map;lastFill=0;flashAt=-1/0;shown=-1;dispose(){this.cue.dispose()}pop(){const e=this.cue.label;e.style.animation="none",e.offsetWidth,e.style.animation="bpm-up 1.4s ease-out"}fade(e){if(Math.abs(e-this.shown)<.01)return;this.shown=e;const t=`${(e*this.opacity).toFixed(2)}`;this.cue.canvas.style.opacity=t,this.cue.label.style.opacity=t}update(e,t,n,s,r,a,o,l,c,u){const f=this.cue;if(c<this.lastFill-.5&&(this.flashAt=o),this.lastFill=c,!s){f.hide();return}const h=s.top??3.2,p=ev(this.v,e,t,n,s.x,s.z,r,a,h),g=Math.hypot(s.x-r,s.z-a),x=1-p.show,m=x*x*(3-2*x),d=1-.3*m*(1-Math.min(1,Math.max(0,(g-12)/28))),S=f.scale*d,R=Je*S/2,v=m*lv*Math.sin(o*Math.PI),y=Math.min(p.sy-(s.gap??ov),(s.above??1/0)-hv),E=Math.max(R+4,y-(Dn+7)*S)+v;let A=p.ex+(p.sx-p.ex)*m,M=p.ey+(E-p.ey)*m;const T=cv(p.angle,Math.PI/2,m);({x:A,y:M}=tv.claim(A,M,T,Je*f.scale*d*.42)),f.place(A,M,d),f.clear();const P=o*l/60,N=Math.pow(.5+.5*Math.cos(P%1*Math.PI*2),2),C=Math.max(0,1-(o-this.flashAt)/.5),I=Me=>{const G=Uo(Me),K=fr.vivid;return K>0?G.map((le,we)=>Math.min(255,le+(Me[we]-le)*K)):G},D=Me=>{const G=sv(Me);return I([G[0]*255,G[1]*255,G[2]*255])},F=s.rainbow?D(o*.25):I([s.colour.x*255,s.colour.y*255,s.colour.z*255]),$=Me=>Me.map(G=>Math.min(255,G*(.9+.15*N)+255*C*.4)),q=$(F);if(fr.plate>0){const Me=Dn+2.2;for(let G=0;G<Je;G++)for(let K=0;K<Je;K++)Math.hypot(K+.5-Je/2,G+.5-Je/2)<=Me&&f.dot(K,G,Yc,fr.plate);Io(f,T,Je,Dn+1,Dn+8.5,5,Yc,fr.plate)}const ne=Dn,Z=au(),Q=F.map(Me=>Me*.55);for(let Me=0;Me<Z.length;Me+=3){const G=s.rainbow?D(Z[Me+2]+o*.25):null;Z[Me+2]<=c||C>0?f.dot(Z[Me],Z[Me+1],G?$(G):q,1):f.dot(Z[Me],Z[Me+1],G?G.map(K=>K*.55):Q,.9)}const te=s.emoji?su(s.emoji,xn):null;if(te&&te.data.some((Me,G)=>G%4===3&&Me>0)){const Me=Math.floor((Je-xn)/2),G=te.data;for(let K=0;K<xn;K++)for(let le=0;le<xn;le++){const we=(K*xn+le)*4;G[we+3]&&f.dot(Me+le,Me+K,[G[we],G[we+1],G[we+2]],1)}}else if(s.notes||s.glyph){const Me=s.glyphColour?Uo([s.glyphColour.x*255,s.glyphColour.y*255,s.glyphColour.z*255]).map(ae=>Math.min(255,ae*(.9+.15*N)+255*C*.4)):q,G=s.glyph??rv,K=Math.floor((Je-G[0].length)/2),le=Math.floor((Je-G.length)/2),we=Me.map(ae=>Math.min(255,ae*.6+255*.4));for(let ae=0;ae<G.length;ae++){const Ue=G[ae];for(let Ve=0;Ve<Ue.length;Ve++){const Fe=Ue[Ve];Fe==="#"?f.dot(K+Ve,le+ae,Me,1):Fe==="+"&&f.dot(K+Ve,le+ae,we,1)}}}else if(s.species){const Me=Math.max(8,Math.min(Je-6,Math.round(s.sigilSize??17))),G=`${s.species}:${Me}`;let K=this.glyphs.get(G);K||(K=wu(s.species,Me),this.glyphs.set(G,K));const le=Math.floor((Je-K.w)/2);for(let we=0;we<K.w;we++)for(let ae=0;ae<K.w;ae++)K.m[we*K.w+ae]&&f.dot(le+ae,le+we,q,1)}if(Io(f,T,Je,ne+2,ne+7,3.5,q,1),f.flush(),!(u!==""&&(!!u||g>20))){f.label.style.display="none";return}const _e=-Math.cos(T)*(1-m)+m,Ze=-Math.sin(T)*(1-m),ze=Math.hypot(_e,Ze)||1;f.say(u??`${Math.round(g)} m`,`rgb(${F.map(Math.round).join(",")})`,A,M,_e/ze,Ze/ze,(ne+1.5)*f.scale*d)}}const uv=Uo([232,180,106]),No=3,fv=4,dr=Je*No/2+6;class dv{cue;angle=NaN;shown=1;constructor(e=document.body){this.cue=new ou(e,No),this.cue.canvas.style.zIndex="3"}update(e,t,n,s=1,r=0){if(this.shown=D_(this.shown,s,r),!e||this.shown<=0){this.cue.hide(),this.angle=NaN;return}this.cue.canvas.style.opacity=`${this.shown}`;const a=iv*No+fv+Math.abs(Math.sin(n*Math.PI))*3,o=e.x,l=e.y-a,c=Math.max(dr,Math.min(t.width-dr,o)),u=Math.max(dr,Math.min(t.height-dr,l)),f=c!==o||u!==l,h=f?Math.atan2(e.y-u,e.x-c):Math.PI/2;Math.abs(h-this.angle)<=.02||(nv(this.cue,uv,"🧭",h,av),this.angle=h),this.cue.place(t.left+c,t.top+u)}dispose(){this.cue.dispose()}}function lu(i,e=0){if(i!=="home"&&!Er(i))return null;const t=Tu(e).islands.get(i);return t?{x:t.x,y:t.y}:null}function pv(i,e,t,n){const s=i.find(u=>u.id===e),r=Math.hypot(t,n);if(!s||!r)return null;const a=t/r,o=n/r;let l=null,c=1/0;for(const u of i){if(u.id===e)continue;const f=u.x-s.x,h=u.y-s.y,p=Math.hypot(f,h);if(!p)continue;const g=(f*a+h*o)/p;if(g<.5)continue;const x=p*(2-g);x<c&&(c=x,l=u.id)}return l}const Ts="witch.arrive",mv=3e4,tl=()=>{try{return sessionStorage}catch{return null}};function gv(i,e,t,n=tl(),s=Date.now()){const r={v:1,island:i,world:e,at:s,...t};try{n?.setItem(Ts,JSON.stringify(r))}catch{try{n?.setItem(Ts,JSON.stringify({...r,still:""}))}catch{}}}function yM(i,e=tl(),t=Date.now()){let n=null;try{n=JSON.parse(e?.getItem(Ts)??"null"),e?.removeItem(Ts)}catch{return null}return!n||n.v!==1||n.island!==i||!(t-n.at>=0&&t-n.at<mv)||!n.cam?null:n}function bM(i=tl()){try{i?.removeItem(Ts)}catch{}}const Fo=32,cu=(i,e)=>i==="home"?0:Er(i,e)?.phase??1;function hu(i,e){const t=n=>Math.hypot(n.x-e.x,n.y-e.y);return[...i].sort((n,s)=>n.phase-s.phase||t(n)-t(s)).map(n=>n.id)}function $c(i,e){const t=s=>Math.hypot(s.x-e.x,s.y-e.y),n=i.filter(s=>s.id==="home"||s.sail).sort((s,r)=>s.id==="home"?-1:r.id==="home"?1:t(s)-t(r));return[...n.map(s=>s.id),...hu(i.filter(s=>!n.includes(s)),e)]}function _v(i){const e=["home",...Oa].map(t=>{const n=lu(t,i);return{id:t,x:n?.x??9,y:n?.y??0,phase:cu(t,i)}});return hu(e,{x:0,y:0})}let Vi=null;function EM(i,e,t,n){if(Vi)return;let s;try{s=new Worker(new URL(""+new URL("chartOutlines.worker-nz2KVKWO.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return}Vi=s,s.onmessage=r=>{if(!("warmDone"in r.data)){n?.(r.data.warmed,r.data.made);return}s.terminate(),Vi=null,t?.(r.data.made,r.data.kept)},s.onerror=()=>{s.terminate(),Vi=null},s.postMessage({world:i,found:e,ids:_v(i),step:Fo,warm:!0})}function wM(){Vi?.terminate(),Vi=null}function xv(i,e=Math.random){const t=new URL(i);return t.searchParams.set("seed",String(Math.floor(e()*1e6))),t.toString()}function TM(i,e){const t=i.get("sail");return t==="inplace"||t==="reload"?t:e.sail?.inPlace?"inplace":"reload"}const vv=["arrive","wave","cleared","at","mode","zoom","set","found","bot","quest","arena","fight","pack","partyover","shot"];function AM(i,e,t,n){const s=new URLSearchParams({island:e,seed:String(t)});n!=null&&s.set("world",String(n));const r=new Set([...vv,"island","seed","world"]);for(const[a,o]of i)r.has(a)||s.append(a,o);return s}function RM(i,e,t,n){return new URL(`./?island=${i}&seed=${e}&arrive=1${t!=null?`&world=${t}`:""}`,n).href}function CM(i,e){const t=new Set((i.get("set")??"").split(";").map(n=>n.split("=")[0]).filter(Boolean));for(const n of e)n.apply.knob&&i.has(`d_${n.id}`)&&t.add(n.apply.knob);return t}function PM(i,e,t=Math.random){if(i==="bot"){const n=new URL(e);return n.searchParams.delete("bot"),n.toString()}return xv(e,t)}function LM(i,e){const t=new URL(e).searchParams,n=Au(t.get("seed"));if(n===null)throw new Error(`a new night in place: no seed in ${e}`);return{how:i,island:t.get("island")??"",seed:n,world:t.has("world")?Number(t.get("world")):void 0,params:t}}class DM{constructor(e,t){this.h=e,this.onBack=t}h;onBack;armed=!1;url="";sailed(e){this.url=e,this.h.pushState({witch:"night"},"",e),this.h.pushState({witch:"guard"},"",e),this.armed=!0}popped(){return this.armed?(this.h.pushState({witch:"guard"},"",this.url),this.onBack(),!0):!1}}async function IM(i,e,t,n=()=>{}){try{return await i(),!0}catch(s){try{n(s)}catch{}return t(e),!1}}function UM(i){return i&&Oo(i)?i:null}function NM(i){return i==="over"?"Back to the afterparty":"Back to the party"}function Mv(i,e,t){return i&&i.island===e&&i.world===t?"stay":"sail"}function Sv(i,e,t,n){return i??(e&&e.world===t?e.island:void 0)??n??"home"}const yv={"game.moveUp":{context:"game",name:"Move up",about:"Fly or walk up the screen.",keys:["KeyW","ArrowUp"],mouse:[],pad:["lsUp"]},"game.moveDown":{context:"game",name:"Move down",about:"Fly or walk down the screen.",keys:["KeyS","ArrowDown"],mouse:[],pad:["lsDown"]},"game.moveLeft":{context:"game",name:"Move left",about:"Fly or walk left.",keys:["KeyA","ArrowLeft"],mouse:[],pad:["lsLeft"]},"game.moveRight":{context:"game",name:"Move right",about:"Fly or walk right.",keys:["KeyD","ArrowRight"],mouse:[],pad:["lsRight"]},"game.aimUp":{context:"game",name:"Aim up",about:"Aim the 💌 up the screen (with the mouse: the cursor aims).",keys:[],mouse:[],pad:["rsUp"]},"game.aimDown":{context:"game",name:"Aim down",about:"Aim the 💌 down the screen.",keys:[],mouse:[],pad:["rsDown"]},"game.aimLeft":{context:"game",name:"Aim left",about:"Aim the 💌 left.",keys:[],mouse:[],pad:["rsLeft"]},"game.aimRight":{context:"game",name:"Aim right",about:"Aim the 💌 right.",keys:[],mouse:[],pad:["rsRight"]},"game.rise":{context:"game",name:"Rise / land",about:'Rise to the treetops, or land. Nothing else (Ed: "rising is not quite a free action").',keys:["Space"],mouse:[],pad:["square"]},"game.use":{context:"game",name:"Use",about:"Use what's here: open a station, take a rune, put down or pick up a sigil. Held: a run, picking up or putting down as she goes.",keys:["KeyE"],mouse:[],pad:["cross"]},"game.invite":{context:"game",name:"Invite 💌",about:"Throw 💌 invites where she aims (held: keep throwing).",keys:["Digit1"],mouse:["left"],pad:["R2","L2"]},"game.dodge":{context:"game",name:"Dodge",about:"Blink the way she's going.",keys:[],mouse:["right"],pad:["circle"]},"game.cycleNext":{context:"game",name:"Next sigil",about:"Cycle the stack: the bottom sigil (the next put down) to the top.",keys:["KeyQ"],mouse:[],pad:["R1"]},"game.cyclePrev":{context:"game",name:"Previous sigil",about:"Cycle the stack back: the top sigil to the bottom.",keys:[],mouse:[],pad:["L1"]},"game.hat":{context:"game",name:"Hat",about:"Put her hat down, or pick one up (on the keyboard: hold Use with nothing to do).",keys:[],mouse:[],pad:["triangle"]},"game.boost":{context:"game",name:"Broom spell",about:"Her broom's spell, if it has one (the boost, the ley jump, the ground pound).",keys:["KeyR"],mouse:[],pad:["L3"]},"game.zoomIn":{context:"game",name:"Zoom in",about:"Bring the camera in.",keys:["KeyZ","Equal","NumpadAdd"],mouse:["wheelUp"],pad:["up"]},"game.zoomOut":{context:"game",name:"Zoom out",about:"Take the camera out.",keys:["KeyX","Minus","NumpadSubtract"],mouse:["wheelDown"],pad:["down"]},"game.autoTalk":{context:"game",name:"Auto-talk",about:"Turn auto-talk on or off (off, she talks while Talk is held).",keys:["KeyT"],mouse:[],pad:[]},"game.talk":{context:"game",name:"Talk",about:"With auto-talk off, she talks while this is held.",keys:["ShiftLeft","ShiftRight"],mouse:[],pad:[]},"game.debug":{context:"game",name:"Debug",about:"The debug overlay.",keys:["Backquote"],mouse:[],pad:["share"]},"game.nextWave":{context:"game",name:"Next wave",about:"Playtest: bring the next wave now.",keys:["KeyN"],mouse:[],pad:[],dev:!0},"game.pauseWaves":{context:"game",name:"Pause waves",about:"Playtest: pause or resume the waves' timer.",keys:["KeyP"],mouse:[],pad:[],dev:!0},"game.cycleSpeakers":{context:"game",name:"Cycle speakers",about:"Debug: every speaker on to its next state.",keys:["KeyK"],mouse:[],pad:[],dev:!0},"game.inviteNearest":{context:"game",name:"Invite nearest",about:"Debug: invite the nearest creature.",keys:["KeyI"],mouse:[],pad:[],dev:!0},"game.feedNearest":{context:"game",name:"Feed nearest",about:"Debug: the nearest party animal eats a berry.",keys:["KeyB"],mouse:[],pad:[],dev:!0},"game.happyNearest":{context:"game",name:"Cheer nearest",about:"Debug: the nearest creature happy at once.",keys:["KeyO"],mouse:[],pad:[],dev:!0},"global.pause":{context:"global",name:"Pause",about:"Pause everything (a still for screenshots, with a stamp of where you are).",keys:["Escape"],mouse:[],pad:["options"]},"menu.up":{context:"menu",name:"Menu up",about:"Move the highlight up.",keys:["KeyW","ArrowUp"],mouse:[],pad:["up","lsUp"]},"menu.down":{context:"menu",name:"Menu down",about:"Move the highlight down.",keys:["KeyS","ArrowDown"],mouse:[],pad:["down","lsDown"]},"menu.left":{context:"menu",name:"Menu left",about:"Move the highlight left (on a slider: less).",keys:["KeyA","ArrowLeft"],mouse:[],pad:["left","lsLeft"]},"menu.right":{context:"menu",name:"Menu right",about:"Move the highlight right (on a slider: more).",keys:["KeyD","ArrowRight"],mouse:[],pad:["right","lsRight"]},"menu.choose":{context:"menu",name:"Choose",about:"Choose what's highlighted (at the sea chart: sail).",keys:["Space","Enter","NumpadEnter"],mouse:[],pad:["cross"]},"menu.back":{context:"menu",name:"Back",about:"Go back, or close the menu.",keys:["KeyE"],mouse:[],pad:["circle"]},"menu.tabPrev":{context:"menu",name:"Previous tab",about:"The tab to the left.",keys:[],mouse:[],pad:["L1"]},"menu.tabNext":{context:"menu",name:"Next tab",about:"The tab to the right.",keys:[],mouse:[],pad:["R1"]},"menu.zoomIn":{context:"menu",name:"Menu zoom in",about:"Zoom the sea chart or the telescope in.",keys:[],mouse:[],pad:["R2"]},"menu.zoomOut":{context:"menu",name:"Menu zoom out",about:"Zoom the sea chart or the telescope out.",keys:[],mouse:[],pad:["L2"]}},bv={actions:yv},Yi={cross:0,circle:1,square:2,triangle:3,L1:4,R1:5,L2:6,R2:7,share:8,options:9,L3:10,R3:11,up:12,down:13,left:14,right:15,home:16},nl={lsUp:[1,-1],lsDown:[1,1],lsLeft:[0,-1],lsRight:[0,1],rsUp:[3,-1],rsDown:[3,1],rsLeft:[2,-1],rsRight:[2,1]},uu=["left","right","middle","wheelUp","wheelDown"],La=.18,Da=.5,br=Object.entries(bv.actions).map(([i,e])=>({...e,id:i,context:e.context})),Kc=new Map(br.map(i=>[i.id,i])),Ia="witch.bindings",Zc=i=>{const e={};return Array.isArray(i.keys)&&(e.keys=i.keys.filter(t=>typeof t=="string"&&t.length>0)),Array.isArray(i.mouse)&&(e.mouse=i.mouse.filter(t=>uu.includes(t))),Array.isArray(i.pad)&&(e.pad=i.pad.filter(t=>t in Yi||t in nl)),e};class Ev{constructor(e=null){this.storage=e;try{const t=JSON.parse(e?.getItem(Ia)??"{}");for(const[n,s]of Object.entries(t??{}))Kc.has(n)&&s&&typeof s=="object"&&(this.own[n]=Zc(s))}catch{}this.build()}storage;own={};live=new Map;listeners=new Set;version=0;list(){return br.map(e=>({...e,...this.get(e.id),isDefault:!this.own[e.id]}))}get(e){const t=this.live.get(e);if(!t)throw new Error(`no action ${e}`);return t}set(e,t){const n=Kc.get(e);if(!n)throw new Error(`no action ${e}`);const s=[...(t.mouse??[]).filter(l=>!uu.includes(l)),...(t.pad??[]).filter(l=>!(l in Yi)&&!(l in nl))];if(s.length)throw new Error(`not a mouse or pad input: ${s.join(", ")}`);const r={...this.get(e),...Zc(t)},a=l=>JSON.stringify(r[l])===JSON.stringify(n[l]),o={};for(const l of["keys","mouse","pad"])a(l)||(o[l]=r[l]);return Object.keys(o).length?this.own[e]=o:delete this.own[e],this.changed(),this.conflicts()}reset(e){delete this.own[e],this.changed()}resetAll(){this.own={},this.changed()}conflicts(){const e=new Map;for(const n of br){const s=this.get(n.id),r=[...s.keys.map(a=>`key:${a}`),...s.mouse.map(a=>`mouse:${a}`),...s.pad.map(a=>`pad:${a}`)];for(const a of n.context==="global"?["game","menu"]:[n.context])for(const o of new Set(r)){const l=`${a}|${o}`;e.set(l,[...e.get(l)??[],n.id])}}const t=[];for(const[n,s]of e)if(s.length>1){const[r,a]=[n.slice(0,n.indexOf("|")),n.slice(n.indexOf("|")+1)];t.push({context:r,input:a,actions:s})}return t}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}keys(e){return this.get(e).keys}mouse(e){return this.get(e).mouse}pad(e){return this.get(e).pad}padValue(e,t,n){let s=0;for(const r of this.get(e).pad)s=Math.max(s,Ua(r,t,n));return s}padPressed(e,t,n,s,r=[]){return this.get(e).pad.some(a=>Ua(a,t,n)>=Da&&Ua(a,s,r)<Da)}padHeld(e,t,n){return this.padValue(e,t,n)>=Da}padButtons(e){return this.get(e).pad.filter(t=>t in Yi).map(t=>Yi[t])}build(){this.live.clear();for(const e of br){const t=this.own[e.id]??{};this.live.set(e.id,{keys:[...t.keys??e.keys],mouse:[...t.mouse??e.mouse],pad:[...t.pad??e.pad]})}}changed(){this.build(),this.version++;try{Object.keys(this.own).length?this.storage?.setItem(Ia,JSON.stringify(this.own)):this.storage?.removeItem(Ia)}catch{}for(const e of this.listeners)e()}}function Ua(i,e,t){if(i in Yi)return e[Yi[i]]?1:0;const n=nl[i];if(!n)return 0;const[s,r]=n,a=s<2?0:2,o=t[a]??0,l=t[a+1]??0,c=Math.hypot(o,l);if(c<La)return 0;const u=(Math.min(1,c)-La)/(1-La)/c;return Math.max(0,r*(t[s]??0)*u)}const wv={cross:"✕",circle:"○",square:"□",triangle:"△",up:"d-pad up",down:"d-pad down",left:"d-pad left",right:"d-pad right",lsUp:"left stick",lsDown:"left stick",lsLeft:"left stick",lsRight:"left stick",rsUp:"right stick",rsDown:"right stick",rsLeft:"right stick",rsRight:"right stick",options:"Options",share:"Share",home:"PS"};function Na(i,e=il){const t=[...new Set(e.pad(i).map(n=>wv[n]??n))];return t.length?t.join(" or "):"none"}function Tv(i){const e=/^(?:Key([A-Z])|Digit(\d))$/.exec(i);return e?e[1]??e[2]:{Space:"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Escape:"Esc",Backquote:"~",Equal:"+",Minus:"−",NumpadAdd:"+",NumpadSubtract:"−",Enter:"Enter",NumpadEnter:"Enter"}[i]??i}function FM(i,e=il){const t={left:"left click",right:"right click",middle:"middle click",wheelUp:"wheel up",wheelDown:"wheel down"},n=[...new Set([...e.mouse(i).map(s=>t[s]??s),...e.keys(i).map(Tv)])];return n.length?n.join(" or "):"none"}const Av=(()=>{try{return typeof localStorage<"u"?localStorage:null}catch{return null}})(),il=new Ev(Av),Rv={near:{sea:-40,dist:600,pitchDeg:50},far:{sea:420,dist:520,pitchDeg:38},skim:{sea:520,dist:360,pitchDeg:24}},Cv=()=>{const i=typeof location>"u"?null:new URLSearchParams(location.search).get("dive");return i&&Rv[i]||si.arrive?.handoff||{}},Jc="witch.chart.sailAnywhere",Pv=`
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
`,Lv=`
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="corner"></div>
<div class="hold-ring" hidden></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;function Dv(i,e){const t=i.find(n=>n.id===e)??{x:0,y:0};return i.filter(n=>n.fresh).sort((n,s)=>Math.hypot(n.x-t.x,n.y-t.y)-Math.hypot(s.x-t.x,s.y-t.y)).map(n=>n.id)}function OM(i,e){const t=e.mode,n=t==="miniature",s=t==="sail";if(!document.getElementById("chart-view-style")){const L=document.createElement("style");L.id="chart-view-style",L.textContent=Pv,document.head.append(L)}const r=document.createElement("div");r.className="chart-view",r.innerHTML=Lv,i.append(r);const a=L=>r.querySelector(`.${L}`),o=n?new Po(r.querySelector("canvas"),si):Qh(si),l=o.canvas;n||(l.setAttribute("aria-label","The sea chart"),r.querySelector("canvas").replaceWith(l));const c=new AbortController,u={signal:c.signal};n&&(a("top").hidden=!0,a("bottom").hidden=!0);for(const L of e.corner??[]){const w=document.createElement("button");w.textContent=L.label,L.title&&(w.title=L.title),w.addEventListener("click",()=>L.onClick(),u),a("corner").append(w)}a("sail").hidden=!0;const f=s?e.table:void 0;let h=!1;const p=()=>{h||(h=!0,S(),f.onLeave())},g=si.chart?.sailHold??1.2;let x=null;const m=L=>!!L&&!T(L)&&!!y.find(w=>w.id===L)?.sail,d=(L,w,_=null)=>{!f||h||x||!m(L)||o.flying||(x={id:L,from:performance.now(),at:_,by:w})};function S(L){x&&(!L||x.by===L)&&(x=null,a("hold-ring").hidden=!0)}function R(){if(!x)return;if(x.id!==o.selected){S();return}const L=Math.min(1,(performance.now()-x.from)/1e3/Math.max(.05,g)),w=a("hold-ring"),_=r.getBoundingClientRect(),U=x.at??o.screenOf(x.id)??{x:_.left+_.width/2,y:_.top+_.height/2};if(w.hidden=!1,w.style.left=`${U.x-_.left}px`,w.style.top=`${U.y-_.top}px`,w.style.background=`conic-gradient(rgba(255,214,140,.95) ${L*360}deg, rgba(20,14,32,.6) 0deg)`,L>=1){const B=x.id;S(),Q(B)}}a("home").hidden=!s||!!f,a("sail-any").hidden=!s,a("close").hidden=!e.onClose||!!f,f&&(r.classList.add("table"),a("top").hidden=!0,a("world").hidden=!0,a("zoom-in").hidden=!0,a("zoom-out").hidden=!0,a("corner").append(a("sail-any"))),a("hint").textContent=f?`point, or the arrows / d-pad / left stick, to choose · hold the mouse, Space or Enter (${Na("menu.choose")} on a pad) on an island to sail · E (${Na("menu.back")}) to put it down · sigils: islands you can sail to · gold rings: won`:s?`Tap an island to look at it, again to sail · arrows / stick to choose, Enter / ${Na("menu.choose")} to sail · sigils: islands you can sail to · gold rings: won`:"Tap an island to look at it · arrows / stick to choose · sigils: islands you can sail to · gold rings: won",n&&(o.orbit=.12);let v=e.save??ih(),y=[];const E=new Map;let A=(()=>{try{return localStorage.getItem(Jc)==="1"}catch{return!1}})();const M=()=>e.world??v.world,T=L=>!!L&&Mv(e.here,L,M())==="stay",P=L=>`./?island=${L}${e.world!=null?`&world=${M()}`:""}`;let N=null;const C=new Map,I=Cv(),D=L=>{let w=C.get(L);return w===void 0&&(w=Math.floor(Math.random()*1e6),C.set(L,w)),w},F=L=>{if(!s||n||N?.island===L)return;if(N?.job.then(_=>_?.stop()),N?.map.then(_=>_?.stop()),!L||!y.find(_=>_.id===L)?.sail||e.noBake?.(L)||T(L)){N=null;return}const w=xl(()=>import("./landingBake-Dj3vTyEN.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]),import.meta.url).then(_=>_.bakeLanding(L,e.world,D(L))).catch(()=>null);N={island:L,job:w,map:w.then(_=>_?xl(()=>import("./mapPrep-DkcqUTiI.js").then(U=>U.m),__vite__mapDeps([12,4,3,1,2,5,6,7,8,9,13]),import.meta.url).then(U=>U.startMapPrep(L,e.world,_.seed)):null).catch(()=>null)}},$=()=>{const L=v.voyages.at(-1)?.to;if((B=>!!B&&!!y.find(X=>X.id===B)?.sail)(L))return L;const _=y.find(B=>B.id==="home"),U=y.filter(B=>B.id!=="home"&&v.found.includes(B.id)&&B.sail);return U.sort((B,X)=>Math.hypot(B.x-(_?.x??0),B.y-(_?.y??0))-Math.hypot(X.x-(_?.x??0),X.y-(_?.y??0))),U[0]?.id??"home"};let q=null;const ne=async L=>{const w=N?.island===L?await N.job:null,_=w?.seed??D(L);await w?.settle();const U=N?.island===L?await N.map:null;U&&await Promise.race([U.done,new Promise(X=>setTimeout(X,8e3))]);const B=q={island:L,seed:_,ready:!1};performance.mark("chart:depart");try{await e.onDepart(L,_,o.flightEnd(L,I))}finally{B.ready=!0,performance.mark("chart:ready")}},Z=async(L,w)=>{if(performance.mark("chart:flown"),q?.island===L){performance.mark("chart:go"),e.onSail?.(L,q.seed,w);return}const _=N?.island===L?await N.job:null,U=_?.seed??D(L);await _?.settle();const B=N?.island===L?await N.map:null;B&&await Promise.race([B.done,new Promise(X=>setTimeout(X,8e3))]),performance.mark("chart:go"),e.onSail?e.onSail(L,U,w):location.href=`${P(L)}&seed=${U}&arrive=1`},Q=L=>{const w=y.find(X=>X.id===L);if(!s||o.flying)return;if(T(L)){f||(e.onStay??e.onClose)?.();return}if(!w?.sail)return;const _=M();performance.mark("chart:sail"),F(L);const U=!!e.onDepart&&!!e.onSail&&o.flightEnd(L,I)!==null,B=U?{hold:()=>q?.island!==L||!q.ready,slow:si.arrive?.hold}:{};if(!o.fly(L,X=>{gv(L,_,X),Z(L,X)},{...I,...B})){Z(L);return}U&&ne(L),r.classList.add("flying"),e.onFly?.(),requestAnimationFrame(()=>z())};let te=null,Se=null;const _e=new Map;let Ze=new Map;const ze=()=>{const L=y.find(w=>w.id===(o.selected??"home"))??y[0];Ze=new Map($c(y,L??{x:0,y:0}).map((w,_)=>[w,_]))},Me=L=>{const w=y.find(_=>_.id===L.id);!w||L.world!==M()||(_e.get(L.id)??w.outline)?.detail&&!L.detail||_e.set(L.id,L)};function G(){if(!_e.size)return;let L=null,w=1/0;for(const U of _e.values()){const B=U.id===o.selected&&U.detail?-1:Ze.get(U.id)??1e9;B<w&&(w=B,L=U)}_e.delete(L.id);const _=y.find(U=>U.id===L.id);if(!(!_||L.world!==M())){_.outline=L,o.reshape(L.id,L);{const U=y.filter(B=>B.outline).length;U===1&&performance.mark("chart:island1"),U===y.length&&performance.mark("chart:islands")}}}const K=()=>{if(!te){try{te=new Worker(new URL(""+new URL("chartOutlines.worker-nz2KVKWO.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}te.onmessage=L=>Me(L.data)}return te};function le(L){const w=!te,_=K();w&&_?.postMessage({world:M(),found:[...v.found],ids:[],step:Fo}),_?.postMessage({detail:L})}function we(){const L=M(),w=[...v.found],_=y.find(B=>B.id===(o.selected??v.voyages.at(-1)?.to??"home"))??y[0],U=$c(y.filter(B=>!B.outline&&!_e.has(B.id)),_);if(!U.length){Se&&(clearInterval(Se),Se=null);return}K()?.postMessage({world:L,found:w,ids:U,step:Fo,cacheOnly:n}),n&&!Se&&(Se=setInterval(we,4e3))}function ae(){const L=new Set(A?["home",...pr]:Uu(v)),w=new Set(v.won),_=M(),U=new Set(Iu(v,e.here?.island)),B=(ie,re,J)=>{const j=lu(ie,_),oe=Ss(ie);return{id:ie,x:j.x,y:j.y,phase:cu(ie,_),radii:re,sail:L.has(ie)&&!oe,unknown:oe,won:w.has(ie),fresh:L.has(ie)&&!oe&&U.has(ie),sigil:J}};y=[B("home",pl(ml(Ru(_,Cu(v.found))),si.map?.coast).radii,jc("home"))];for(const ie of Oa)y.push(B(ie,pl(ml(Er(ie,_)),si.islands?.coast).radii,ie));o.set(y,v.voyages);for(const ie of E.values())ie.dispose();if(E.clear(),!n)for(const ie of Dv(y,e.here?.island??v.voyages.at(-1)?.to??"home"))E.set(ie,new dv(r));_e.clear(),ze(),we();const X=v.found.filter(ie=>!Ss(ie)).length;a("status").textContent=`${X?`${X} of ${pr.length} islands found${e.countUncharted?` (and ${Oa.length-pr.length} not yet charted)`:""}`:"do a legend's quest and win the night to find its island"}${v.won.length?` · ${v.won.length} won`:""}${e.note?` · ${e.note}`:""}`,a("world").textContent=`World seed: ${_}${e.world!=null&&e.world!==v.world?" (from the link)":""}`,a("home").href=P("home"),a("home").textContent=T("home")?e.here.label:"Sail home"}function Ue(L,w=!1,_=!0){o.select(L,w),ze(),_&&F(L),L&&te&&!y.find(re=>re.id===L)?.outline&&!_e.has(L)&&te.postMessage({first:L}),L&&!n&&!(_e.get(L)??y.find(re=>re.id===L)?.outline)?.detail&&le(L);const U=y.find(re=>re.id===L),B=a("card"),X=a("sail");if(!U||n){B.hidden=!0;return}B.hidden=!1;const ie=L==="home"?0:Er(L,M())?.phase??0;a("name").textContent=L==="home"?"Home":U.unknown?"Uncharted waters":U.sail?`The ${L}'s island`:"An island not yet found",a("phase").textContent=L==="home"?"the Ent's island, the middle of the world":`phase ${ie}`,a("state").textContent=(T(L)?"you're here · ":"")+(U.unknown?"not yet charted":U.won?"won":U.sail?L!=="home"&&!v.found.includes(L)?"not found yet: 🧪 testing, you can sail there":v.played.includes(L)?"played, not yet won":"found: you can sail there":"do its legend's quest in a night you win to find it"),X.hidden=!s||!(U.sail||T(L))||!!f&&T(L),X.href=P(L),X.textContent=T(L)?e.here.label:f?"Hold to sail":"Sail there"}if(a("sail").addEventListener("click",L=>{L.preventDefault(),f||Q(o.selected)}),f){const L=a("sail");L.addEventListener("pointerdown",w=>{w.preventDefault();const _=L.getBoundingClientRect();d(o.selected,"pointer",{x:_.left+_.width/2,y:_.top+_.height/2})},u);for(const w of["pointerup","pointerleave","pointercancel"])L.addEventListener(w,()=>S("pointer"),u)}a("home").addEventListener("click",L=>{L.preventDefault(),Ue("home",!0),Q("home")}),a("close").addEventListener("click",()=>e.onClose?.());const Ve=new Map;let Fe=0,We=null;n||(l.addEventListener("pointerdown",L=>{if(f&&!h&&!o.flying&&L.isPrimary){const w=o.pick(L.clientX,L.clientY);w&&(w!==o.selected&&Ue(w),d(w,"pointer",{x:L.clientX,y:L.clientY}))}if(Ve.set(L.pointerId,{x:L.clientX,y:L.clientY}),We={x:L.clientX,y:L.clientY},Ve.size===2){const[w,_]=[...Ve.values()];Fe=Math.hypot(w.x-_.x,w.y-_.y)}},u),l.addEventListener("pointermove",L=>{if(x?.by==="pointer"&&x.at&&Math.hypot(L.clientX-x.at.x,L.clientY-x.at.y)>12&&S("pointer"),!!Ve.has(L.pointerId)&&(Ve.set(L.pointerId,{x:L.clientX,y:L.clientY}),Ve.size===2)){const[w,_]=[...Ve.values()],U=Math.hypot(w.x-_.x,w.y-_.y);Fe>0&&U>0&&o.zoom(Fe/U),Fe=U,We=null}},u),l.addEventListener("pointerup",L=>{if(S("pointer"),h)return;if(o.flying){Ve.delete(L.pointerId),o.skipFlight();return}const w=Ve.size===1&&We&&Math.hypot(L.clientX-We.x,L.clientY-We.y)<8;if(Ve.delete(L.pointerId),Ve.size<2&&(Fe=0),!w)return;const _=o.pick(L.clientX,L.clientY);f||(_&&_===o.selected?Q(_):_&&Ue(_))},u),l.addEventListener("pointercancel",L=>{Ve.delete(L.pointerId),Fe=0,S("pointer")},u),l.addEventListener("wheel",L=>{L.preventDefault(),o.zoom(Math.exp(L.deltaY*.0015))},{passive:!1,...u}),a("zoom-in").addEventListener("click",()=>o.zoom(.75)),a("zoom-out").addEventListener("click",()=>o.zoom(1.33)));const it=(L,w)=>{const _=pv(y,o.selected??"home",L,w);_&&Ue(_)},Ge=L=>{if(o.flying){L.preventDefault(),o.skipFlight();return}if(L.target?.closest?.("input")||L.target?.closest?.("button, a")&&(L.key==="Enter"||L.key===" "))return;const w={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};if(!h){if(f&&(L.code==="KeyE"||L.key==="Escape")){L.preventDefault(),L.repeat||p();return}w[L.key]?(L.preventDefault(),it(...w[L.key])):f&&(L.key==="Enter"||L.key===" ")?(L.preventDefault(),L.repeat||d(o.selected,"key")):L.key==="Enter"||L.key===" "?(L.preventDefault(),Q(o.selected)):L.key==="+"||L.key==="="?o.zoom(.8):L.key==="-"||L.key==="_"?o.zoom(1.25):L.key==="Escape"&&e.onClose&&(L.preventDefault(),e.onClose())}};n||addEventListener("keydown",Ge);const lt=L=>{f&&(L.key==="Enter"||L.key===" ")&&S("key")};f&&addEventListener("keyup",lt);let ct=0,Lt=!0;function mt(L){const w=[...navigator.getGamepads?.()??[]].find(re=>re?.connected);if(!w)return;if(ct-=L,o.flying){w.buttons.some(re=>re.pressed)&&o.skipFlight();return}if(h)return;const _=w.buttons.map(re=>re.pressed),U=re=>il.padHeld(re,_,w.axes),B=U("menu.right")?1:U("menu.left")?-1:0,X=U("menu.down")?1:U("menu.up")?-1:0;(B||X)&&ct<=0?(it(B,X),ct=.28):!B&&!X&&(ct=0);const ie=U("menu.choose")&&!Lt;U("menu.choose")||(Lt=!1),f?U("menu.choose")&&!Lt?d(o.selected,"pad"):S("pad"):ie&&ct<=0&&(Q(o.selected),ct=.5),U("menu.back")&&ct<=0&&(f?p():e.onClose&&e.onClose(),ct=.5),U("menu.zoomOut")&&o.zoom(1+L),U("menu.zoomIn")&&o.zoom(1-L*.8)}const xt=()=>{const L=a("sail-any");L.setAttribute("aria-pressed",String(A)),L.textContent=A?"🧪 Test: sailing anywhere (on)":"🧪 Test: sail anywhere"};xt(),a("sail-any").addEventListener("click",()=>{A=!A;try{localStorage.setItem(Jc,A?"1":"0")}catch{}xt();const L=o.selected;ae(),Ue(L)});const z=(L,w)=>{if(n&&e.size){const _=Zh;o.resize(e.size.w*_,e.size.h*_);return}o.resize(L??(r.clientWidth||i.clientWidth||innerWidth),w??(r.clientHeight||i.clientHeight||innerHeight))};z(),a("status").textContent="charting the sea…";let Rt=!1;return setTimeout(()=>{Rt||(ae(),Ue(Sv(e.start,e.here,M(),v.voyages.at(-1)?.to),!0,!1),F($()))},50),{canvas:l,chart:o,islands:()=>y,update(L,w){n||mt(L),R(),G(),o.frame(L,w);const _=l.getBoundingClientRect();for(const[U,B]of E)B.update(!o.flying&&!h?o.screenTopOf(U):null,_,w,U===o.selected?0:1,L)},resize:z,choose:Ue,dispose(){Rt=!0,_e.clear(),removeEventListener("keydown",Ge),removeEventListener("keyup",lt),Se&&(clearInterval(Se),Se=null),te?.terminate(),te=null,c.abort();for(const L of E.values())L.dispose();n?o.dispose():jh(o),r.remove()}}}export{Qo as $,pf as A,hd as B,Ne as C,Ji as D,ln as E,hn as F,Va as G,yn as H,Kv as I,Wv as J,Hi as K,et as L,ot as M,yt as N,kr as O,wv as P,oM as Q,As as R,Tt as S,si as T,bn as U,tt as V,$t as W,$x as X,tu as Y,$v as Z,q_ as _,Bv as a,nM as a$,Xv as a0,en as a1,St as a2,vt as a3,Yv as a4,rM as a5,nt as a6,qx as a7,el as a8,qv as a9,Gx as aA,uM as aB,iu as aC,Jx as aD,hM as aE,su as aF,V_ as aG,dM as aH,lM as aI,Zx as aJ,pM as aK,cM as aL,mM as aM,jx as aN,gM as aO,Xc as aP,Cs as aQ,Qx as aR,Zv as aS,Wi as aT,Gv as aU,za as aV,fM as aW,SM as aX,Nn as aY,Zu as aZ,sM as a_,pd as aa,_t as ab,Xx as ac,$u as ad,rv as ae,sv as af,Cn as ag,wr as ah,Yx as ai,In as aj,ci as ak,Qv as al,Hx as am,un as an,jv as ao,Eo as ap,Kr as aq,Hv as ar,Ur as as,Qt as at,Ju as au,Ku as av,aM as aw,yr as ax,$i as ay,bo as az,il as b,Pc as b0,pi as b1,zu as b2,Je as b3,ou as b4,ev as b5,tv as b6,_M as b7,vM as b8,MM as b9,zv as bA,Iu as bB,UM as bC,NM as bD,Du as bE,Ov as bF,bM as bG,AM as bH,DM as bI,LM as bJ,Yi as bK,nl as bL,br as bM,xM as ba,fr as bb,C_ as bc,iM as bd,bs as be,jt as bf,ix as bg,Jv as bh,Ic as bi,Dc as bj,eM as bk,Jo as bl,fi as bm,Pn as bn,Ld as bo,xl as bp,FM as bq,av as br,xn as bs,CM as bt,yM as bu,ih as bv,EM as bw,PM as bx,TM as by,IM as bz,tM as c,RM as d,Ta as e,Un as f,ye as g,mi as h,nn as i,Vt as j,Tv as k,_n as l,OM as m,Bx as n,H as o,Na as p,kv as q,Y_ as r,wM as s,ah as t,rh as u,Wu as v,Fv as w,Vx as x,Vl as y,Vv as z};
