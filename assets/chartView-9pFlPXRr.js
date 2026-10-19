const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./landingBake-G0PpPpFa.js","./linkParams-B-zVI-va.js","./dancefloor-BDP8illp.js","./party-BtYrGq7A.js","./leash-C2z_gWCO.js","./musicSet-D1QoJaEk.js","./beat-BZz7vh16.js","./sigilButton-DmBzsSaz.js","./win-B6dHR-W6.js","./decisions-DvAjw9fS.js","./viewParams-7Sk_8UY3.js","./generator-fU7xQznT.js","./mapPrep-DjdJOR3q.js","./settings-CKSLgavb.js"])))=>i.map(i=>d[i]);
import{ba as ln,bb as Wr,bc as $l,bd as Jr,be as ou,I as lu,bf as Zl,bg as Jl,ap as Ql,bh as na,bi as Ja,bj as us,h as cu,bk as uu,aO as Qr,bl as hu,bm as ia,aP as bo,bn as fu,bo as du}from"./dancefloor-BDP8illp.js";import"./generator-fU7xQznT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const jl="witch.chart",ra=(i=0)=>({world:i,found:[],won:[],played:[],voyages:[]});function pu(i){const e=(i??"").trim();if(!e)return 1+Math.floor(Math.random()*2147483646);if(/^\d+$/.test(e))return Number(e)%2147483647;let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%2147483647||1}const ec=i=>{try{return i??globalThis.localStorage??null}catch{return null}},xs=i=>Array.isArray(i)?i.filter(e=>typeof e=="string"):[];function tc(i){try{const e=ec(i)?.getItem(jl);if(!e)return ra();const t=JSON.parse(e),n=$l,r=a=>!!ln[a]&&!Jr(a),s=Number(t.world);return{world:Number.isInteger(s)&&s>=0&&s<2147483647?s:0,found:xs(t.found).filter(r),won:xs(t.won).filter(n),played:xs(t.played).filter(n),voyages:(Array.isArray(t.voyages)?t.voyages:[]).filter(a=>a&&typeof a.from=="string"&&typeof a.to=="string"&&n(a.from)&&r(a.to)).map(a=>({from:a.from,to:a.to}))}}catch{return ra()}}function nc(i,e){try{ec(e)?.setItem(jl,JSON.stringify(i))}catch{}}function mu(i,e){const t=ra(i);return nc(t,e),t}function v_(i,e,t){return t?ic(i,e,{won:!1}):i}function ic(i,e,t){if(!$l(e))return i;const n={world:i.world,found:[...i.found],won:[...i.won],played:[...i.played],voyages:[...i.voyages]};if(n.played.includes(e)||n.played.push(e),!t.won)return n;n.won.includes(e)||n.won.push(e);for(const r of t.found??[])!ln[r]||Jr(r)||r===e||n.found.includes(r)||(n.found.push(r),n.voyages.push({from:e,to:r}));return n}const gu=i=>["home",...i.found];function x_(){const i=Object.keys(ln),e=[...i],t=e.map(n=>({from:ln[n].phase===0?"home":_u(n,i.filter(r=>ln[r].phase===ln[n].phase-1)),to:n}));return{world:0,found:e,won:["home"],played:["home",...Wr],voyages:t}}function _u(i,e){const t=(n,r)=>{const s=Math.abs(((n-r)%360+360)%360);return s>180?360-s:s};return e.reduce((n,r)=>t(ln[r].bearing,ln[i].bearing)<t(ln[n].bearing,ln[i].bearing)?r:n,e[0]??"home")}function M_(i,e,t,n){const r=tc(t);if(n!==void 0&&n!==r.world)return r;const s=ic(r,i,e);return nc(s,t),s}const vu="modulepreload",xu=function(i,e){return new URL(i,e).href},To={},wo=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let c=function(h){return Promise.all(h.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(t.map(h=>{if(h=xu(h,n),h in To)return;To[h]=!0;const d=h.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const M=a[g];if(M.href===h&&(!d||M.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":vu,d||(p.as="script"),p.crossOrigin="",p.href=h,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((g,M)=>{p.addEventListener("load",g),p.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};function Mu(i){let e=2166136261;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0)%1000003}const Su=i=>10*Math.max(1,Math.min(5,Math.round(i)+1)),Ao=64;function Ro(i,e,t=96){const n=i.kind==="home",r=i.seed??Mu(i.kind),s=i.areas??(n?Ao:Su(i.phase??0)),a=ou(r,e),o=Math.sqrt(s/Ao),l=new Float32Array(t);for(let c=0;c<t;c++)l[c]=o*a(-Math.PI+c/t*Math.PI*2);return{radii:l,seed:r,areas:s}}const ur=lu,yu={rise:6,turn:240,height:22,from:-45,shadow:.6,disc:!0},Eu=i=>({...yu,...i.chart?.moon??{}}),Co=i=>Math.max(0,Math.min(.6,i.chart?.edgeBand??.18));function bu(i,e){const t=Math.min(1,Math.max(0,i/Math.max(.01,e.rise))),n=t*t*(3-2*t);return{bearing:e.from+Math.max(0,i-e.rise)*360/Math.max(1,e.turn),height:-4+(e.height+4)*n,risen:n}}const Qa="186",Tu=0,Po=1,wu=2,Xr=1,Au=2,Zi=3,Kn=0,Ot=1,Yt=2,En=0,Qi=1,vn=2,Lo=3,Do=4,Ru=5,yi=100,Cu=101,Pu=102,Lu=103,Du=104,Iu=200,Uu=201,Nu=202,Fu=203,rc=204,sc=205,Ou=206,Bu=207,zu=208,ku=209,Hu=210,Gu=211,Vu=212,Wu=213,Xu=214,sa=0,aa=1,oa=2,Ri=3,la=4,ca=5,ua=6,ha=7,ac=0,qu=1,Yu=2,un=0,oc=1,lc=2,cc=3,uc=4,hc=5,fc=6,dc=7,pc=300,$n=301,Ci=302,Ms=303,Ss=304,hs=306,fa=1e3,yn=1001,da=1002,St=1003,Ku=1004,hr=1005,it=1006,ys=1007,Yn=1008,Ft=1009,mc=1010,gc=1011,nr=1012,ja=1013,hn=1014,tn=1015,fn=1016,eo=1017,to=1018,Pi=1020,_c=35902,vc=35899,xc=1021,Mc=1022,$t=1023,wn=1026,Fn=1027,fs=1028,no=1029,Zn=1030,io=1031,ro=1033,qr=33776,Yr=33777,Kr=33778,$r=33779,pa=35840,ma=35841,ga=35842,_a=35843,va=36196,xa=37492,Ma=37496,Sa=37488,ya=37489,jr=37490,Ea=37491,ba=37808,Ta=37809,wa=37810,Aa=37811,Ra=37812,Ca=37813,Pa=37814,La=37815,Da=37816,Ia=37817,Ua=37818,Na=37819,Fa=37820,Oa=37821,Ba=36492,za=36494,ka=36495,Ha=36283,Ga=36284,es=36285,Va=36286,$u=3200,Io=0,Zu=1,Mn="",Xt="srgb",ir="srgb-linear",ts="linear",et="srgb",Es=7680,S_=7681,y_=514,E_=517,Ju=519,Qu=512,ju=513,eh=514,so=515,th=516,nh=517,ao=518,ih=519,Sc=35044,b_=35048,Uo="300 es",cn=2e3,rr=2001;function rh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ns(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sh(){const i=ns("canvas");return i.style.display="block",i}const No={};function is(...i){const e="THREE."+i.shift();console.log(e,...i)}function yc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Le(...i){i=yc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function qe(...i){i=yc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function wi(...i){const e=i.join(" ");e in No||(No[e]=!0,Le(...i))}function ah(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const oh={[sa]:aa,[oa]:ua,[la]:ha,[Ri]:ca,[aa]:sa,[ua]:oa,[ha]:la,[ca]:Ri};class Qn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fo=1234567;const ji=Math.PI/180,sr=180/Math.PI;function bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function oo(i,e){return(i%e+e)%e}function lh(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function ch(i,e,t){return i!==e?(t-i)/(e-i):0}function er(i,e,t){return(1-t)*i+t*e}function uh(i,e,t,n){return er(i,e,1-Math.exp(-t*n))}function hh(i,e=1){return e-Math.abs(oo(i,e*2)-e)}function fh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function dh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ph(i,e){return i+Math.floor(Math.random()*(e-i+1))}function mh(i,e){return i+Math.random()*(e-i)}function gh(i){return i*(.5-Math.random())}function _h(i){i!==void 0&&(Fo=i);let e=Fo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vh(i){return i*ji}function xh(i){return i*sr}function Mh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Sh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Eh(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),d=s((e-n)/2),u=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ni={DEG2RAD:ji,RAD2DEG:sr,generateUUID:bn,clamp:Ve,euclideanModulo:oo,mapLinear:lh,inverseLerp:ch,lerp:er,damp:uh,pingpong:hh,smoothstep:fh,smootherstep:dh,randInt:ph,randFloat:mh,randFloatSpread:gh,seededRandom:_h,degToRad:vh,radToDeg:xh,isPowerOfTwo:Mh,ceilPowerOfTwo:Sh,floorPowerOfTwo:yh,setQuaternionFromProperEuler:Eh,normalize:tt,denormalize:en};class Se{static{Se.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ii{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],p=s[a+1],g=s[a+2],M=s[a+3];if(d!==M||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+d*M;m<0&&(u=-u,p=-p,g=-g,M=-M,m=-m);let f=1-o;if(m<.9995){const b=Math.acos(m),A=Math.sin(b);f=Math.sin(f*b)/A,o=Math.sin(o*b)/A,l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+M*o}else{l=l*f+u*o,c=c*f+p*o,h=h*f+g*o,d=d*f+M*o;const b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-o*p,e[t+2]=c*g+h*p+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),u=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{static{B.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bs.copy(this).projectOnVector(e),this.sub(bs)}reflect(e){return this.sub(bs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bs=new B,Oo=new Ii;class Ue{static{Ue.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],M=r[0],m=r[3],f=r[6],b=r[1],A=r[4],v=r[7],y=r[2],E=r[5],w=r[8];return s[0]=a*M+o*b+l*y,s[3]=a*m+o*A+l*E,s[6]=a*f+o*v+l*w,s[1]=c*M+h*b+d*y,s[4]=c*m+h*A+d*E,s[7]=c*f+h*v+d*w,s[2]=u*M+p*b+g*y,s[5]=u*m+p*A+g*E,s[8]=u*f+p*v+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,p=c*s-a*l,g=t*d+n*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=d*M,e[1]=(r*c-h*n)*M,e[2]=(o*n-r*a)*M,e[3]=u*M,e[4]=(h*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=p*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ts.makeScale(e,t)),this}rotate(e){return wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ts.makeRotation(-e)),this}translate(e,t){return wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ts.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ts=new Ue,Bo=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zo=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bh(){const i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===et&&(r.r=Tn(r.r),r.g=Tn(r.g),r.b=Tn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(r.r=Ai(r.r),r.g=Ai(r.g),r.b=Ai(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mn?ts:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:e,whitePoint:n,transfer:ts,toXYZ:Bo,fromXYZ:zo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:n,transfer:et,toXYZ:Bo,fromXYZ:zo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),i}const Xe=bh();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ai(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ri;class Th{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ri===void 0&&(ri=ns("canvas")),ri.width=e.width,ri.height=e.height;const r=ri.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ri}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ns("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Tn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wh=0;class lo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ws(r[a].image)):s.push(ws(r[a]))}else s=ws(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ws(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Th.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let Ah=0;const As=new B;class wt extends Qn{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=yn,r=yn,s=it,a=Yn,o=$t,l=Ft,c=wt.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=bn(),this.name="",this.source=new lo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(As).x}get height(){return this.source.getSize(As).y}get depth(){return this.source.getSize(As).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=pc;wt.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,v=(p+1)/2,y=(f+1)/2,E=(h+u)/4,w=(d+M)/4,x=(g+m)/4;return A>v&&A>y?A<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(A),r=E/n,s=w/n):v>y?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=E/r,s=x/r):y<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),n=w/s,r=x/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-M)/b,this.z=(u-h)/b,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rh extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:it,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new wt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:it,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new lo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gt extends Rh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ec extends wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ch extends wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Je{static{Je.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,h,d,u,p,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,u,p,g,M,m)}set(e,t,n,r,s,a,o,l,c,h,d,u,p,g,M,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/si.setFromMatrixColumn(e,0).length(),s=1/si.setFromMatrixColumn(e,1).length(),a=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,p=a*d,g=o*h,M=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,M=c*d;t[0]=u+M*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=o*h,M=o*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+M,t[1]=l*d,t[5]=M*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=M-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-M*d}else if(e.order==="XZY"){const u=a*l,p=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+M,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ph,e,Lh)}lookAt(e,t,n){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Pn.crossVectors(n,Bt),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Pn.crossVectors(n,Bt)),Pn.normalize(),fr.crossVectors(Bt,Pn),r[0]=Pn.x,r[4]=fr.x,r[8]=Bt.x,r[1]=Pn.y,r[5]=fr.y,r[9]=Bt.y,r[2]=Pn.z,r[6]=fr.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],M=n[6],m=n[10],f=n[14],b=n[3],A=n[7],v=n[11],y=n[15],E=r[0],w=r[4],x=r[8],T=r[12],P=r[1],I=r[5],D=r[9],z=r[13],L=r[2],O=r[6],X=r[10],q=r[14],ie=r[3],Y=r[7],j=r[11],ee=r[15];return s[0]=a*E+o*P+l*L+c*ie,s[4]=a*w+o*I+l*O+c*Y,s[8]=a*x+o*D+l*X+c*j,s[12]=a*T+o*z+l*q+c*ee,s[1]=h*E+d*P+u*L+p*ie,s[5]=h*w+d*I+u*O+p*Y,s[9]=h*x+d*D+u*X+p*j,s[13]=h*T+d*z+u*q+p*ee,s[2]=g*E+M*P+m*L+f*ie,s[6]=g*w+M*I+m*O+f*Y,s[10]=g*x+M*D+m*X+f*j,s[14]=g*T+M*z+m*q+f*ee,s[3]=b*E+A*P+v*L+y*ie,s[7]=b*w+A*I+v*O+y*Y,s[11]=b*x+A*D+v*X+y*j,s[15]=b*T+A*z+v*q+y*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],M=e[7],m=e[11],f=e[15],b=l*p-c*u,A=o*p-c*d,v=o*u-l*d,y=a*p-c*h,E=a*u-l*h,w=a*d-o*h;return t*(M*b-m*A+f*v)-n*(g*b-m*y+f*E)+r*(g*A-M*y+f*w)-s*(g*v-M*E+m*w)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],M=e[13],m=e[14],f=e[15],b=t*o-n*a,A=t*l-r*a,v=t*c-s*a,y=n*l-r*o,E=n*c-s*o,w=r*c-s*l,x=h*M-d*g,T=h*m-u*g,P=h*f-p*g,I=d*m-u*M,D=d*f-p*M,z=u*f-p*m,L=b*z-A*D+v*I+y*P-E*T+w*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/L;return e[0]=(o*z-l*D+c*I)*O,e[1]=(r*D-n*z-s*I)*O,e[2]=(M*w-m*E+f*y)*O,e[3]=(u*E-d*w-p*y)*O,e[4]=(l*P-a*z-c*T)*O,e[5]=(t*z-r*P+s*T)*O,e[6]=(m*v-g*w-f*A)*O,e[7]=(h*w-u*v+p*A)*O,e[8]=(a*D-o*P+c*x)*O,e[9]=(n*P-t*D-s*x)*O,e[10]=(g*E-M*v+f*b)*O,e[11]=(d*v-h*E-p*b)*O,e[12]=(o*T-a*I-l*x)*O,e[13]=(t*I-n*T+r*x)*O,e[14]=(M*A-g*y-m*b)*O,e[15]=(h*y-d*A+u*b)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,p=s*h,g=s*d,M=a*h,m=a*d,f=o*d,b=l*c,A=l*h,v=l*d,y=n.x,E=n.y,w=n.z;return r[0]=(1-(M+f))*y,r[1]=(p+v)*y,r[2]=(g-A)*y,r[3]=0,r[4]=(p-v)*E,r[5]=(1-(u+f))*E,r[6]=(m+b)*E,r[7]=0,r[8]=(g+A)*w,r[9]=(m-b)*w,r[10]=(1-(u+M))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=si.set(r[0],r[1],r[2]).length();const o=si.set(r[4],r[5],r[6]).length(),l=si.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Jt.copy(this);const c=1/a,h=1/o,d=1/l;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=h,Jt.elements[5]*=h,Jt.elements[6]*=h,Jt.elements[8]*=d,Jt.elements[9]*=d,Jt.elements[10]*=d,t.setFromRotationMatrix(Jt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=cn,l=!1){const c=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r);let g,M;if(l)g=s/(a-s),M=a*s/(a-s);else if(o===cn)g=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===rr)g=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=cn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,M;if(l)g=1/(a-s),M=a/(a-s);else if(o===cn)g=-2/(a-s),M=-(a+s)/(a-s);else if(o===rr)g=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const si=new B,Jt=new Je,Ph=new B(0,0,0),Lh=new B(1,1,1),Pn=new B,fr=new B,Bt=new B,ko=new Je,Ho=new Ii;class Jn{constructor(e=0,t=0,n=0,r=Jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ko.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ko,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ho.setFromEuler(this),this.setFromQuaternion(Ho,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jn.DEFAULT_ORDER="XYZ";class co{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dh=0;const Go=new B,ai=new Ii,dn=new Je,dr=new B,Fi=new B,Ih=new B,Uh=new Ii,Vo=new B(1,0,0),Wo=new B(0,1,0),Xo=new B(0,0,1),qo={type:"added"},Nh={type:"removed"},oi={type:"childadded",child:null},Rs={type:"childremoved",child:null};class xt extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new B,t=new Jn,n=new Ii,r=new B(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Je},normalMatrix:{value:new Ue}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Vo,e)}rotateY(e){return this.rotateOnAxis(Wo,e)}rotateZ(e){return this.rotateOnAxis(Xo,e)}translateOnAxis(e,t){return Go.copy(e).applyQuaternion(this.quaternion),this.position.add(Go.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vo,e)}translateY(e){return this.translateOnAxis(Wo,e)}translateZ(e){return this.translateOnAxis(Xo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dr.copy(e):dr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Fi,dr,this.up):dn.lookAt(dr,Fi,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),ai.setFromRotationMatrix(dn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qo),oi.child=e,this.dispatchEvent(oi),oi.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qo),oi.child=e,this.dispatchEvent(oi),oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,e,Ih),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,Uh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xt.DEFAULT_UP=new B(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ei extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fh={type:"move"};class Cs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),f=this._getHandJoint(c,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fh)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ei;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Ps(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Xe.workingColorSpace){if(e=oo(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ps(a,s,e+1/3),this.g=Ps(a,s,e),this.b=Ps(a,s,e-1/3)}return Xe.colorSpaceToWorking(this,r),this}setStyle(e,t=Xt){function n(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const n=bc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Xe.workingToColorSpace(Pt.copy(this),e),Math.round(Ve(Pt.r*255,0,255))*65536+Math.round(Ve(Pt.g*255,0,255))*256+Math.round(Ve(Pt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Pt.copy(this),t);const n=Pt.r,r=Pt.g,s=Pt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=Xt){Xe.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,r=Pt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(pr);const n=er(Ln.h,pr.h,t),r=er(Ln.s,pr.s,t),s=er(Ln.l,pr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Ie;Ie.NAMES=bc;class Yo extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qt=new B,pn=new B,Ls=new B,mn=new B,li=new B,ci=new B,Ko=new B,Ds=new B,Is=new B,Us=new B,Ns=new rt,Fs=new rt,Os=new rt;class Kt{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Qt.subVectors(e,t),r.cross(Qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Qt.subVectors(r,t),pn.subVectors(n,t),Ls.subVectors(e,t);const a=Qt.dot(Qt),o=Qt.dot(pn),l=Qt.dot(Ls),c=pn.dot(pn),h=pn.dot(Ls),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mn.x),l.addScaledVector(a,mn.y),l.addScaledVector(o,mn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ns.setScalar(0),Fs.setScalar(0),Os.setScalar(0),Ns.fromBufferAttribute(e,t),Fs.fromBufferAttribute(e,n),Os.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ns,s.x),a.addScaledVector(Fs,s.y),a.addScaledVector(Os,s.z),a}static isFrontFacing(e,t,n,r){return Qt.subVectors(n,t),pn.subVectors(e,t),Qt.cross(pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Qt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;li.subVectors(r,n),ci.subVectors(s,n),Ds.subVectors(e,n);const l=li.dot(Ds),c=ci.dot(Ds);if(l<=0&&c<=0)return t.copy(n);Is.subVectors(e,r);const h=li.dot(Is),d=ci.dot(Is);if(h>=0&&d<=h)return t.copy(r);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(li,a);Us.subVectors(e,s);const p=li.dot(Us),g=ci.dot(Us);if(g>=0&&p<=g)return t.copy(s);const M=p*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ci,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Ko.subVectors(s,r),o=(d-h)/(d-h+(p-g)),t.copy(r).addScaledVector(Ko,o);const f=1/(m+M+u);return a=M*f,o=u*f,t.copy(n).addScaledVector(li,a).addScaledVector(ci,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class jn{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(s,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),gr.subVectors(this.max,Oi),ui.subVectors(e.a,Oi),hi.subVectors(e.b,Oi),fi.subVectors(e.c,Oi),Dn.subVectors(hi,ui),In.subVectors(fi,hi),kn.subVectors(ui,fi);let t=[0,-Dn.z,Dn.y,0,-In.z,In.y,0,-kn.z,kn.y,Dn.z,0,-Dn.x,In.z,0,-In.x,kn.z,0,-kn.x,-Dn.y,Dn.x,0,-In.y,In.x,0,-kn.y,kn.x,0];return!Bs(t,ui,hi,fi,gr)||(t=[1,0,0,0,1,0,0,0,1],!Bs(t,ui,hi,fi,gr))?!1:(_r.crossVectors(Dn,In),t=[_r.x,_r.y,_r.z],Bs(t,ui,hi,fi,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gn=[new B,new B,new B,new B,new B,new B,new B,new B],jt=new B,mr=new jn,ui=new B,hi=new B,fi=new B,Dn=new B,In=new B,kn=new B,Oi=new B,gr=new B,_r=new B,Hn=new B;function Bs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Hn.fromArray(i,s);const o=r.x*Math.abs(Hn.x)+r.y*Math.abs(Hn.y)+r.z*Math.abs(Hn.z),l=e.dot(Hn),c=t.dot(Hn),h=n.dot(Hn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Sn=Oh();function Oh(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function Bh(i){Math.abs(i)>65504&&Le("DataUtils.toHalfFloat(): Value out of range."),i=Ve(i,-65504,65504),Sn.floatView[0]=i;const e=Sn.uint32View[0],t=e>>23&511;return Sn.baseTable[t]+((e&8388607)>>Sn.shiftTable[t])}function zh(i){const e=i>>10;return Sn.uint32View[0]=Sn.mantissaTable[Sn.offsetTable[e]+(i&1023)]+Sn.exponentTable[e],Sn.floatView[0]}class T_{static toHalfFloat(e){return Bh(e)}static fromHalfFloat(e){return zh(e)}}const vt=new B,vr=new Se;let kh=0;class dt extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Sc,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXY(t,vr.x,vr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=en(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=en(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=en(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=en(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=en(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),r=tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Tc extends dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wc extends dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ht extends dt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Hh=new jn,Bi=new B,zs=new B;class ei{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Hh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Bi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(zs)),this.expandByPoint(Bi.copy(e.center).sub(zs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Gh=0;const Wt=new Je,ks=new xt,di=new B,zt=new jn,zi=new jn,Tt=new B;class mt extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rh(e)?wc:Tc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ue().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return ks.lookAt(e),ks.updateMatrix(),this.applyMatrix4(ks.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ht(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];zi.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(zt.min,zi.min),zt.expandByPoint(Tt),Tt.addVectors(zt.max,zi.max),zt.expandByPoint(Tt)):(zt.expandByPoint(zi.min),zt.expandByPoint(zi.max))}zt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Tt.fromBufferAttribute(o,c),l&&(di.fromBufferAttribute(e,c),Tt.add(di)),r=Math.max(r,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new B,l[x]=new B;const c=new B,h=new B,d=new B,u=new Se,p=new Se,g=new Se,M=new B,m=new B;function f(x,T,P){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(s,x),p.fromBufferAttribute(s,T),g.fromBufferAttribute(s,P),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(I),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),o[x].add(M),o[T].add(M),o[P].add(M),l[x].add(m),l[T].add(m),l[P].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,T=b.length;x<T;++x){const P=b[x],I=P.start,D=P.count;for(let z=I,L=I+D;z<L;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const A=new B,v=new B,y=new B,E=new B;function w(x){y.fromBufferAttribute(r,x),E.copy(y);const T=o[x];A.copy(T),A.sub(y.multiplyScalar(y.dot(T))).normalize(),v.crossVectors(E,T);const I=v.dot(l[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,I)}for(let x=0,T=b.length;x<T;++x){const P=b[x],I=P.start,D=P.count;for(let z=I,L=I+D;z<L;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,h=new B,d=new B;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new dt(u,h,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Sc,this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Dt=new B;class rs{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=en(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=en(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=en(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=en(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=en(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),r=tt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){is("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){is("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Hs=new B,Wh=new B,Xh=new Ue;class xn{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Hs.subVectors(n,t).cross(Wh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Hs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xh.getNormalMatrix(e),r=this.coplanarPoint(Hs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let qh=0;class ti extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=bn(),this.name="",this.type="Material",this.blending=Qi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rc,this.blendDst=sc,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ju,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new xn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Se().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Se().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yh extends ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let pi;const ki=new B,mi=new B,gi=new B,_i=new Se,Hi=new Se,Ac=new Je,xr=new B,Gi=new B,Mr=new B,$o=new Se,Gs=new Se,Zo=new Se;class w_ extends xt{constructor(e=new Yh){if(super(),this.isSprite=!0,this.type="Sprite",pi===void 0){pi=new mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vh(t,5);pi.setIndex([0,1,2,0,2,3]),pi.setAttribute("position",new rs(n,3,0,!1)),pi.setAttribute("uv",new rs(n,2,3,!1))}this.geometry=pi,this.material=e,this.center=new Se(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mi.setFromMatrixScale(this.matrixWorld),Ac.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mi.multiplyScalar(-gi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;Sr(xr.set(-.5,-.5,0),gi,a,mi,r,s),Sr(Gi.set(.5,-.5,0),gi,a,mi,r,s),Sr(Mr.set(.5,.5,0),gi,a,mi,r,s),$o.set(0,0),Gs.set(1,0),Zo.set(1,1);let o=e.ray.intersectTriangle(xr,Gi,Mr,!1,ki);if(o===null&&(Sr(Gi.set(-.5,.5,0),gi,a,mi,r,s),Gs.set(0,1),o=e.ray.intersectTriangle(xr,Mr,Gi,!1,ki),o===null))return;const l=e.ray.origin.distanceTo(ki);l<e.near||l>e.far||t.push({distance:l,point:ki.clone(),uv:Kt.getInterpolation(ki,xr,Gi,Mr,$o,Gs,Zo,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Sr(i,e,t,n,r,s){_i.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Hi.x=s*_i.x-r*_i.y,Hi.y=r*_i.x+s*_i.y):Hi.copy(_i),i.copy(e),i.x+=Hi.x,i.y+=Hi.y,i.applyMatrix4(Ac)}const _n=new B,Vs=new B,yr=new B,Er=new B;class ds{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Vs.copy(e).add(t).multiplyScalar(.5),yr.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(Vs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(yr),o=Er.dot(this.direction),l=-Er.dot(yr),c=Er.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*l-o,u=a*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const M=1/h;d*=M,u*=M,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Vs).addScaledVector(yr,u),p}intersectSphere(e,t){if(e.radius<0)return null;_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),r=_n.dot(_n)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,M=t.y-a.y,m=t.z-a.z,f=n.x-a.x,b=n.y-a.y,A=n.z-a.z,v=Math.abs(l),y=Math.abs(c),E=Math.abs(h);let w,x,T,P,I,D,z,L,O,X,q,ie;if(v>=y&&v>=E?(T=l,D=d,O=g,ie=f,l>=0?(w=c,x=h,P=u,I=p,z=M,L=m,X=b,q=A):(w=h,x=c,P=p,I=u,z=m,L=M,X=A,q=b)):y>=E?(T=c,D=u,O=M,ie=b,c>=0?(w=h,x=l,P=p,I=d,z=m,L=g,X=A,q=f):(w=l,x=h,P=d,I=p,z=g,L=m,X=f,q=A)):(T=h,D=p,O=m,ie=A,h>=0?(w=l,x=c,P=d,I=u,z=g,L=M,X=f,q=b):(w=c,x=l,P=u,I=d,z=M,L=g,X=b,q=f)),T===0)return null;const Y=w/T,j=x/T,ee=1/T,Ce=P-Y*D,ye=I-j*D,Ke=z-Y*O,He=L-j*O,We=X-Y*ie,K=q-j*ie,C=We*He-K*Ke,te=Ce*K-ye*We,ne=Ke*ye-He*Ce;if(r){if(C<0||te<0||ne<0)return null}else if((C<0||te<0||ne<0)&&(C>0||te>0||ne>0))return null;const se=C+te+ne;if(se===0)return null;const Te=ee*(C*D+te*O+ne*ie);return(se>0?Te<0:Te>0)?null:this.at(Te/se,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nn extends ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jo=new Je,Gn=new ds,br=new ei,Qo=new B,Tr=new B,wr=new B,Ar=new B,Ws=new B,Rr=new B,jo=new B,Cr=new B;class lt extends xt{constructor(e=new mt,t=new Nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Rr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(Ws.fromBufferAttribute(d,e),a?Rr.addScaledVector(Ws,h):Rr.addScaledVector(Ws.sub(t),h))}t.add(Rr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(br.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(br,Qo)===null||Gn.origin.distanceToSquared(Qo)>(e.far-e.near)**2))&&(Jo.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(Jo),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,y=A;v<y;v+=3){const E=o.getX(v),w=o.getX(v+1),x=o.getX(v+2);r=Pr(this,f,e,n,c,h,d,E,w,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){const b=o.getX(m),A=o.getX(m+1),v=o.getX(m+2);r=Pr(this,a,e,n,c,h,d,b,A,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,y=A;v<y;v+=3){const E=v,w=v+1,x=v+2;r=Pr(this,f,e,n,c,h,d,E,w,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let m=g,f=M;m<f;m+=3){const b=m,A=m+1,v=m+2;r=Pr(this,a,e,n,c,h,d,b,A,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Kh(i,e,t,n,r,s,a,o){let l;if(e.side===Ot?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Kn,o),l===null)return null;Cr.copy(o),Cr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Cr);return c<t.near||c>t.far?null:{distance:c,point:Cr.clone(),object:i}}function Pr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,wr),i.getVertexPosition(c,Ar);const h=Kh(i,e,t,n,Tr,wr,Ar,jo);if(h){const d=new B;Kt.getBarycoord(jo,Tr,wr,Ar,d),r&&(h.uv=Kt.getInterpolatedAttribute(r,o,l,c,d,new Se)),s&&(h.uv1=Kt.getInterpolatedAttribute(s,o,l,c,d,new Se)),a&&(h.normal=Kt.getInterpolatedAttribute(a,o,l,c,d,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new B,materialIndex:0};Kt.getNormal(Tr,wr,Ar,u.normal),h.face=u,h.barycoord=d}return h}class ar extends wt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=St,h=St,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class el extends dt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const vi=new Je,tl=new Je,Lr=[],nl=new jn,$h=new Je,Vi=new lt,Wi=new ei;class A_ extends lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new el(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,$h)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),nl.copy(e.boundingBox).applyMatrix4(vi),this.boundingBox.union(nl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vi),Wi.copy(e.boundingSphere).applyMatrix4(vi),this.boundingSphere.union(Wi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Vi.geometry=this.geometry,Vi.material=this.material,Vi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wi.copy(this.boundingSphere),Wi.applyMatrix4(n),e.ray.intersectsSphere(Wi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,vi),tl.multiplyMatrices(n,vi),Vi.matrixWorld=tl,Vi.raycast(e,Lr);for(let a=0,o=Lr.length;a<o;a++){const l=Lr[a];l.instanceId=s,l.object=this,t.push(l)}Lr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new el(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ar(new Float32Array(r*this.count),r,this.count,fs,tn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Vn=new ei,Zh=new Se(.5,.5),Dr=new B;class uo{constructor(e=new xn,t=new xn,n=new xn,r=new xn,s=new xn,a=new xn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=cn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],p=s[7],g=s[8],M=s[9],m=s[10],f=s[11],b=s[12],A=s[13],v=s[14],y=s[15];if(r[0].setComponents(c-a,p-h,f-g,y-b).normalize(),r[1].setComponents(c+a,p+h,f+g,y+b).normalize(),r[2].setComponents(c+o,p+d,f+M,y+A).normalize(),r[3].setComponents(c-o,p-d,f-M,y-A).normalize(),n)r[4].setComponents(l,u,m,v).normalize(),r[5].setComponents(c-l,p-u,f-m,y-v).normalize();else if(r[4].setComponents(c-l,p-u,f-m,y-v).normalize(),t===cn)r[5].setComponents(c+l,p+u,f+m,y+v).normalize();else if(t===rr)r[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=Zh.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Dr.x=r.normal.x>0?e.max.x:e.min.x,Dr.y=r.normal.y>0?e.max.y:e.min.y,Dr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Jh extends ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ss=new B,as=new B,il=new Je,Xi=new ds,Ir=new ei,Xs=new B,rl=new B;class Qh extends xt{constructor(e=new mt,t=new Jh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ss.fromBufferAttribute(t,r-1),as.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ss.distanceTo(as);e.setAttribute("lineDistance",new ht(n,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(r),Ir.radius+=s,e.ray.intersectsSphere(Ir)===!1)return;il.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(il);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=c){const f=h.getX(M),b=h.getX(M+1),A=Ur(this,e,Xi,l,f,b,M);A&&t.push(A)}if(this.isLineLoop){const M=h.getX(g-1),m=h.getX(p),f=Ur(this,e,Xi,l,M,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=p,m=g-1;M<m;M+=c){const f=Ur(this,e,Xi,l,M,M+1,M);f&&t.push(f)}if(this.isLineLoop){const M=Ur(this,e,Xi,l,g-1,p,g-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ur(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(ss.fromBufferAttribute(o,r),as.fromBufferAttribute(o,s),t.distanceSqToSegment(ss,as,Xs,rl)>n)return;Xs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xs);if(!(c<e.near||c>e.far))return{distance:c,point:rl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const sl=new B,al=new B;class R_ extends Qh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)sl.fromBufferAttribute(t,r),al.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+sl.distanceTo(al);e.setAttribute("lineDistance",new ht(n,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jh extends ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ol=new Je,Wa=new ds,Nr=new ei,Fr=new B;class C_ extends xt{constructor(e=new mt,t=new jh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(r),Nr.radius+=s,e.ray.intersectsSphere(Nr)===!1)return;ol.copy(r).invert(),Wa.copy(e.ray).applyMatrix4(ol);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=u,M=p;g<M;g++){const m=c.getX(g);Fr.fromBufferAttribute(d,m),ll(Fr,m,l,r,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,M=p;g<M;g++)Fr.fromBufferAttribute(d,g),ll(Fr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ll(i,e,t,n,r,s,a){const o=Wa.distanceSqToPoint(i);if(o<t){const l=new B;Wa.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Rc extends wt{constructor(e=[],t=$n,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class P_ extends wt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Li extends wt{constructor(e,t,n=hn,r,s,a,o=St,l=St,c,h=wn,d=1){if(h!==wn&&h!==Fn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ef extends Li{constructor(e,t=hn,n=$n,r,s,a=St,o=St,l,c=wn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cc extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class or extends mt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(d,2));function g(M,m,f,b,A,v,y,E,w,x,T){const P=v/w,I=y/x,D=v/2,z=y/2,L=E/2,O=w+1,X=x+1;let q=0,ie=0;const Y=new B;for(let j=0;j<X;j++){const ee=j*I-z;for(let Ce=0;Ce<O;Ce++){const ye=Ce*P-D;Y[M]=ye*b,Y[m]=ee*A,Y[f]=L,c.push(Y.x,Y.y,Y.z),Y[M]=0,Y[m]=0,Y[f]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(Ce/w),d.push(1-j/x),q+=1}}for(let j=0;j<x;j++)for(let ee=0;ee<w;ee++){const Ce=u+ee+O*j,ye=u+ee+O*(j+1),Ke=u+(ee+1)+O*(j+1),He=u+(ee+1)+O*j;l.push(Ce,ye,He),l.push(ye,Ke,He),ie+=6}o.addGroup(p,ie,T),p+=ie,u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class os extends mt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new B,h=new Se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const p=n+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(o,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new os(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ho extends mt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],u=[],p=[];let g=0;const M=[],m=n/2;let f=0;b(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(p,2));function b(){const v=new B,y=new B;let E=0;const w=(t-e)/n;for(let x=0;x<=s;x++){const T=[],P=x/s,I=P*(t-e)+e;for(let D=0;D<=r;D++){const z=D/r,L=z*l+o,O=Math.sin(L),X=Math.cos(L);y.x=I*O,y.y=-P*n+m,y.z=I*X,d.push(y.x,y.y,y.z),v.set(O,w,X).normalize(),u.push(v.x,v.y,v.z),p.push(z,1-P),T.push(g++)}M.push(T)}for(let x=0;x<r;x++)for(let T=0;T<s;T++){const P=M[T][x],I=M[T+1][x],D=M[T+1][x+1],z=M[T][x+1];(e>0||T!==0)&&(h.push(P,I,z),E+=3),(t>0||T!==s-1)&&(h.push(I,D,z),E+=3)}c.addGroup(f,E,0),f+=E}function A(v){const y=g,E=new Se,w=new B;let x=0;const T=v===!0?e:t,P=v===!0?1:-1;for(let D=1;D<=r;D++)d.push(0,m*P,0),u.push(0,P,0),p.push(.5,.5),g++;const I=g;for(let D=0;D<=r;D++){const L=D/r*l+o,O=Math.cos(L),X=Math.sin(L);w.x=T*X,w.y=m*P,w.z=T*O,d.push(w.x,w.y,w.z),u.push(0,P,0),E.x=O*.5+.5,E.y=X*.5*P+.5,p.push(E.x,E.y),g++}for(let D=0;D<r;D++){const z=y+D,L=I+D;v===!0?h.push(L,L+1,z):h.push(L+1,L,z),x+=3}c.addGroup(f,x,v===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bn extends mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,p=[],g=[],M=[],m=[];for(let f=0;f<h;f++){const b=f*u-a;for(let A=0;A<c;A++){const v=A*d-s;g.push(v,-b,0),M.push(0,0,1),m.push(A/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){const A=b+c*f,v=b+c*(f+1),y=b+1+c*(f+1),E=b+1+c*f;p.push(A,v,E),p.push(v,y,E)}this.setIndex(p),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(M,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ls extends mt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/r,p=new B,g=new Se;for(let M=0;M<=r;M++){for(let m=0;m<=n;m++){const f=s+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let M=0;M<r;M++){const m=M*(n+1);for(let f=0;f<n;f++){const b=f+m,A=b,v=b+n+1,y=b+n+2,E=b+1;o.push(A,v,E),o.push(v,y,E)}}this.setIndex(o),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function Di(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(cl(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(cl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=Di(i[t]);for(const r in n)e[r]=n[r]}return e}function cl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function tf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Pc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const nf={clone:Di,merge:It};var rf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=tf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(r.value);break;case"v2":this.uniforms[n].value=new Se().fromArray(r.value);break;case"v3":this.uniforms[n].value=new B().fromArray(r.value);break;case"v4":this.uniforms[n].value=new rt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ue().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Je().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class af extends Mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class of extends ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$u,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lf extends ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Lc extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class cf extends Lc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const qs=new Je,ul=new B,hl=new B;class uf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=Ft,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uo,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;ul.setFromMatrixPosition(e.matrixWorld),t.position.copy(ul),hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){qs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(qs,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===rr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(qs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Or=new B,Br=new Ii,sn=new B;class Dc extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Or,Br,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,Br,sn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Or,Br,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,Br,sn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Un=new B,fl=new Se,dl=new Se;class qt extends Dc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,fl,dl),t.subVectors(dl,fl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ji*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ps extends Dc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hf extends uf{constructor(){super(new ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ff extends Lc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new hf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class L_ extends mt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const xi=-90,Mi=1;class df extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new qt(xi,Mi,e,t);r.layers=this.layers,this.add(r);const s=new qt(xi,Mi,e,t);s.layers=this.layers,this.add(s);const a=new qt(xi,Mi,e,t);a.layers=this.layers,this.add(a);const o=new qt(xi,Mi,e,t);o.layers=this.layers,this.add(o);const l=new qt(xi,Mi,e,t);l.layers=this.layers,this.add(l);const c=new qt(xi,Mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pf extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const pl=new Je;class mf{constructor(e,t,n=0,r=1/0){this.ray=new ds(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pl),this}intersectObject(e,t=!0,n=[]){return Xa(e,this,n,t),n.sort(ml),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Xa(e[r],this,n,t);return n.sort(ml),n}}function ml(i,e){return i.distance-e.distance}function Xa(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Xa(s[a],e,t,!0)}}class Ic{static{Ic.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function gl(i,e,t,n){const r=gf(n);switch(t){case xc:return i*e;case fs:return i*e/r.components*r.byteLength;case no:return i*e/r.components*r.byteLength;case Zn:return i*e*2/r.components*r.byteLength;case io:return i*e*2/r.components*r.byteLength;case Mc:return i*e*3/r.components*r.byteLength;case $t:return i*e*4/r.components*r.byteLength;case ro:return i*e*4/r.components*r.byteLength;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Kr:case $r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ma:case _a:return Math.max(i,16)*Math.max(e,8)/4;case pa:case ga:return Math.max(i,8)*Math.max(e,8)/2;case va:case xa:case Sa:case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ma:case jr:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case La:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ba:case za:case ka:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ha:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*8;case es:case Va:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gf(i){switch(i){case Ft:case mc:return{byteLength:1,components:1};case nr:case gc:case fn:return{byteLength:2,components:1};case eo:case to:return{byteLength:2,components:4};case hn:case ja:case tn:return{byteLength:4,components:1};case _c:case vc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qa}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qa);function Uc(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function _f(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],M=d[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,d[u]=M)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const M=d[p];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xf=`#ifdef USE_ALPHAHASH
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
#endif`,Mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ef=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bf=`#ifdef USE_AOMAP
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
#endif`,Tf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wf=`#ifdef USE_BATCHING
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
#endif`,Af=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Lf=`#ifdef USE_IRIDESCENCE
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
#endif`,Df=`#ifdef USE_BUMPMAP
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
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Hf=`#define PI 3.141592653589793
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
} // validated`,Gf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vf=`vec3 transformedNormal = objectNormal;
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
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
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
#endif`,td=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sd=`#ifdef USE_GRADIENTMAP
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
}`,ad=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,od=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ud=`#ifdef USE_ENVMAP
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
#endif`,hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,md=`PhysicalMaterial material;
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
#endif`,gd=`uniform sampler2D dfgLUT;
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
}`,_d=`
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
#endif`,vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,xd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Md=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ed=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Td=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ad=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rd=`#if defined( USE_POINTS_UV )
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
#endif`,Cd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ld=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Id=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ud=`#ifdef USE_MORPHTARGETS
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
#endif`,Nd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Od=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Hd=`#ifdef USE_NORMALMAP
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
#endif`,Gd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ip=`float getShadowMask() {
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
}`,rp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sp=`#ifdef USE_SKINNING
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
#endif`,ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,op=`#ifdef USE_SKINNING
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
#endif`,lp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fp=`#ifdef USE_TRANSMISSION
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
#endif`,dp=`#ifdef USE_TRANSMISSION
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xp=`uniform sampler2D t2D;
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`#include <common>
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
}`,Tp=`#if DEPTH_PACKING == 3200
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
}`,wp=`#define DISTANCE
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
}`,Ap=`#define DISTANCE
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`uniform float scale;
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
}`,Lp=`uniform vec3 diffuse;
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
}`,Dp=`#include <common>
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Up=`#define LAMBERT
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
}`,Np=`#define LAMBERT
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
}`,Fp=`#define MATCAP
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
}`,Op=`#define MATCAP
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
}`,Bp=`#define NORMAL
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
}`,zp=`#define NORMAL
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
}`,kp=`#define PHONG
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
}`,Hp=`#define PHONG
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
}`,Gp=`#define STANDARD
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
}`,Vp=`#define STANDARD
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
}`,Wp=`#define TOON
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
}`,Xp=`#define TOON
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
}`,qp=`uniform float size;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,$p=`uniform vec3 color;
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
}`,Zp=`uniform float rotation;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:vf,alphahash_pars_fragment:xf,alphamap_fragment:Mf,alphamap_pars_fragment:Sf,alphatest_fragment:yf,alphatest_pars_fragment:Ef,aomap_fragment:bf,aomap_pars_fragment:Tf,batching_pars_vertex:wf,batching_vertex:Af,begin_vertex:Rf,beginnormal_vertex:Cf,bsdfs:Pf,iridescence_fragment:Lf,bumpmap_pars_fragment:Df,clipping_planes_fragment:If,clipping_planes_pars_fragment:Uf,clipping_planes_pars_vertex:Nf,clipping_planes_vertex:Ff,color_fragment:Of,color_pars_fragment:Bf,color_pars_vertex:zf,color_vertex:kf,common:Hf,cube_uv_reflection_fragment:Gf,defaultnormal_vertex:Vf,displacementmap_pars_vertex:Wf,displacementmap_vertex:Xf,emissivemap_fragment:qf,emissivemap_pars_fragment:Yf,colorspace_fragment:Kf,colorspace_pars_fragment:$f,envmap_fragment:Zf,envmap_common_pars_fragment:Jf,envmap_pars_fragment:Qf,envmap_pars_vertex:jf,envmap_physical_pars_fragment:ud,envmap_vertex:ed,fog_vertex:td,fog_pars_vertex:nd,fog_fragment:id,fog_pars_fragment:rd,gradientmap_pars_fragment:sd,lightmap_pars_fragment:ad,lights_lambert_fragment:od,lights_lambert_pars_fragment:ld,lights_pars_begin:cd,lights_toon_fragment:hd,lights_toon_pars_fragment:fd,lights_phong_fragment:dd,lights_phong_pars_fragment:pd,lights_physical_fragment:md,lights_physical_pars_fragment:gd,lights_fragment_begin:_d,lights_fragment_maps:vd,lights_fragment_end:xd,lightprobes_pars_fragment:Md,logdepthbuf_fragment:Sd,logdepthbuf_pars_fragment:yd,logdepthbuf_pars_vertex:Ed,logdepthbuf_vertex:bd,map_fragment:Td,map_pars_fragment:wd,map_particle_fragment:Ad,map_particle_pars_fragment:Rd,metalnessmap_fragment:Cd,metalnessmap_pars_fragment:Pd,morphinstance_vertex:Ld,morphcolor_vertex:Dd,morphnormal_vertex:Id,morphtarget_pars_vertex:Ud,morphtarget_vertex:Nd,normal_fragment_begin:Fd,normal_fragment_maps:Od,normal_pars_fragment:Bd,normal_pars_vertex:zd,normal_vertex:kd,normalmap_pars_fragment:Hd,clearcoat_normal_fragment_begin:Gd,clearcoat_normal_fragment_maps:Vd,clearcoat_pars_fragment:Wd,iridescence_pars_fragment:Xd,opaque_fragment:qd,packing:Yd,premultiplied_alpha_fragment:Kd,project_vertex:$d,dithering_fragment:Zd,dithering_pars_fragment:Jd,roughnessmap_fragment:Qd,roughnessmap_pars_fragment:jd,shadowmap_pars_fragment:ep,shadowmap_pars_vertex:tp,shadowmap_vertex:np,shadowmask_pars_fragment:ip,skinbase_vertex:rp,skinning_pars_vertex:sp,skinning_vertex:ap,skinnormal_vertex:op,specularmap_fragment:lp,specularmap_pars_fragment:cp,tonemapping_fragment:up,tonemapping_pars_fragment:hp,transmission_fragment:fp,transmission_pars_fragment:dp,uv_pars_fragment:pp,uv_pars_vertex:mp,uv_vertex:gp,worldpos_vertex:_p,background_vert:vp,background_frag:xp,backgroundCube_vert:Mp,backgroundCube_frag:Sp,cube_vert:yp,cube_frag:Ep,depth_vert:bp,depth_frag:Tp,distance_vert:wp,distance_frag:Ap,equirect_vert:Rp,equirect_frag:Cp,linedashed_vert:Pp,linedashed_frag:Lp,meshbasic_vert:Dp,meshbasic_frag:Ip,meshlambert_vert:Up,meshlambert_frag:Np,meshmatcap_vert:Fp,meshmatcap_frag:Op,meshnormal_vert:Bp,meshnormal_frag:zp,meshphong_vert:kp,meshphong_frag:Hp,meshphysical_vert:Gp,meshphysical_frag:Vp,meshtoon_vert:Wp,meshtoon_frag:Xp,points_vert:qp,points_frag:Yp,shadow_vert:Kp,shadow_frag:$p,sprite_vert:Zp,sprite_frag:Jp},de={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},on={basic:{uniforms:It([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:It([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:It([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:It([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:It([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:It([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:It([de.points,de.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:It([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:It([de.common,de.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:It([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:It([de.sprite,de.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:It([de.common,de.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:It([de.lights,de.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};on.physical={uniforms:It([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const zr={r:0,b:0,g:0},Qp=new Je,Nc=new Ue;Nc.set(-1,0,0,0,1,0,0,0,1);function jp(i,e,t,n,r,s){const a=new Ie(0);let o=r===!0?0:1,l,c,h=null,d=0,u=null;function p(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){const v=b.backgroundBlurriness>0;A=e.get(A,v)}return A}function g(b){let A=!1;const v=p(b);v===null?m(a,o):v&&v.isColor&&(m(v,1),A=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(b,A){const v=p(A);v&&(v.isCubeTexture||v.mapping===hs)?(c===void 0&&(c=new lt(new or(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:Di(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qp.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Nc),c.material.toneMapped=Xe.getTransfer(v.colorSpace)!==et,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new lt(new Bn(2,2),new Mt({name:"BackgroundMaterial",uniforms:Di(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(v.colorSpace)!==et,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,A){b.getRGB(zr,Pc(i)),t.buffers.color.setClear(zr.r,zr.g,zr.b,A,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,A=1){a.set(b),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:M,dispose:f}}function em(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(I,D,z,L,O){let X=!1;const q=d(I,L,z,D);s!==q&&(s=q,c(s.object)),X=p(I,L,z,O),X&&g(I,L,z,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,v(I,D,z,L),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function d(I,D,z,L){const O=L.wireframe===!0;let X=n[D.id];X===void 0&&(X={},n[D.id]=X);const q=I.isInstancedMesh===!0?I.id:0;let ie=X[q];ie===void 0&&(ie={},X[q]=ie);let Y=ie[z.id];Y===void 0&&(Y={},ie[z.id]=Y);let j=Y[O];return j===void 0&&(j=u(l()),Y[O]=j),j}function u(I){const D=[],z=[],L=[];for(let O=0;O<t;O++)D[O]=0,z[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:L,object:I,attributes:{},index:null}}function p(I,D,z,L){const O=s.attributes,X=D.attributes;let q=0;const ie=z.getAttributes();for(const Y in ie)if(ie[Y].location>=0){const ee=O[Y];let Ce=X[Y];if(Ce===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(Ce=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(Ce=I.instanceColor)),ee===void 0||ee.attribute!==Ce||Ce&&ee.data!==Ce.data)return!0;q++}return s.attributesNum!==q||s.index!==L}function g(I,D,z,L){const O={},X=D.attributes;let q=0;const ie=z.getAttributes();for(const Y in ie)if(ie[Y].location>=0){let ee=X[Y];ee===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor));const Ce={};Ce.attribute=ee,ee&&ee.data&&(Ce.data=ee.data),O[Y]=Ce,q++}s.attributes=O,s.attributesNum=q,s.index=L}function M(){const I=s.newAttributes;for(let D=0,z=I.length;D<z;D++)I[D]=0}function m(I){f(I,0)}function f(I,D){const z=s.newAttributes,L=s.enabledAttributes,O=s.attributeDivisors;z[I]=1,L[I]===0&&(i.enableVertexAttribArray(I),L[I]=1),O[I]!==D&&(i.vertexAttribDivisor(I,D),O[I]=D)}function b(){const I=s.newAttributes,D=s.enabledAttributes;for(let z=0,L=D.length;z<L;z++)D[z]!==I[z]&&(i.disableVertexAttribArray(z),D[z]=0)}function A(I,D,z,L,O,X,q){q===!0?i.vertexAttribIPointer(I,D,z,O,X):i.vertexAttribPointer(I,D,z,L,O,X)}function v(I,D,z,L){M();const O=L.attributes,X=z.getAttributes(),q=D.defaultAttributeValues;for(const ie in X){const Y=X[ie];if(Y.location>=0){let j=O[ie];if(j===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(j=I.instanceColor)),j!==void 0){const ee=j.normalized,Ce=j.itemSize,ye=e.get(j);if(ye===void 0)continue;const Ke=ye.buffer,He=ye.type,We=ye.bytesPerElement,K=He===i.INT||He===i.UNSIGNED_INT||j.gpuType===ja;if(j.isInterleavedBufferAttribute){const C=j.data,te=C.stride,ne=j.offset;if(C.isInstancedInterleavedBuffer){for(let se=0;se<Y.locationSize;se++)f(Y.location+se,C.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=C.meshPerAttribute*C.count)}else for(let se=0;se<Y.locationSize;se++)m(Y.location+se);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let se=0;se<Y.locationSize;se++)A(Y.location+se,Ce/Y.locationSize,He,ee,te*We,(ne+Ce/Y.locationSize*se)*We,K)}else{if(j.isInstancedBufferAttribute){for(let C=0;C<Y.locationSize;C++)f(Y.location+C,j.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let C=0;C<Y.locationSize;C++)m(Y.location+C);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let C=0;C<Y.locationSize;C++)A(Y.location+C,Ce/Y.locationSize,He,ee,Ce*We,Ce/Y.locationSize*C*We,K)}}else if(q!==void 0){const ee=q[ie];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(Y.location,ee);break;case 3:i.vertexAttrib3fv(Y.location,ee);break;case 4:i.vertexAttrib4fv(Y.location,ee);break;default:i.vertexAttrib1fv(Y.location,ee)}}}}b()}function y(){T();for(const I in n){const D=n[I];for(const z in D){const L=D[z];for(const O in L){const X=L[O];for(const q in X)h(X[q].object),delete X[q];delete L[O]}}delete n[I]}}function E(I){if(n[I.id]===void 0)return;const D=n[I.id];for(const z in D){const L=D[z];for(const O in L){const X=L[O];for(const q in X)h(X[q].object),delete X[q];delete L[O]}}delete n[I.id]}function w(I){for(const D in n){const z=n[D];for(const L in z){const O=z[L];if(O[I.id]===void 0)continue;const X=O[I.id];for(const q in X)h(X[q].object),delete X[q];delete O[I.id]}}}function x(I){for(const D in n){const z=n[D],L=I.isInstancedMesh===!0?I.id:0,O=z[L];if(O!==void 0){for(const X in O){const q=O[X];for(const ie in q)h(q[ie].object),delete q[ie];delete O[X]}delete z[L],Object.keys(z).length===0&&delete n[D]}}}function T(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:M,enableAttribute:m,disableUnusedAttributes:b}}function tm(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function nm(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==$t&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const x=w===fn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Ft&&w!==tn&&!x&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Le("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:v,maxSamples:y,samples:E}}function im(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new xn,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||r;return r=u,n=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const b=s?0:n,A=b*4;let v=f.clippingState||null;l.value=v,v=h(g,u,A,p);for(let y=0;y!==A;++y)v[y]=t[y];f.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const f=p+M*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,v=p;A!==M;++A,v+=4)a.copy(d[A]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const bi=4,rm=6,sm=20,am=256,qi=new ps,_l=new Ie;let Ys=null,Ks=0,$s=0,Zs=!1;const om=new B,Wn=new B;class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=om}=s;Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ys,Ks,$s),this._renderer.xr.enabled=Zs,e.scissorTest=!1,Si(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$n||e.mapping===Ci?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ys=this._renderer.getRenderTarget(),Ks=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:it,minFilter:it,generateMipmaps:!1,type:fn,format:$t,colorSpace:ir,depthBuffer:!1},r=xl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xl(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lm(s)),this._blurMaterial=um(s,e,t),this._ggxMaterial=cm(s,e,t)}return r}_compileMaterial(e){const t=new lt(new mt,e);this._renderer.compile(t,qi)}_sceneToCubeUV(e,t,n,r,s){const l=new qt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(_l),d.toneMapping=un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new or,new Nn({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let f=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,f=!0):(m.color.copy(_l),f=!0);for(let A=0;A<6;A++){const v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[A],s.y,s.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[A]));const y=this._cubeSize;Si(r,v*y,A>2?y:0,y,y),d.setRenderTarget(r),f&&d.render(M,l),d.render(e,l)}d.toneMapping=p,d.autoClear=u,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===$n||e.mapping===Ci;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Si(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,qi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,p=d*u,{_lodMax:g}=this,M=this._sizeLods[n],m=3*M*(n>g-bi?n-g+bi:0),f=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,Si(s,m,f,3*M,2*M),r.setRenderTarget(s),r.render(o,qi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Si(e,m,f,3*M,2*M),r.setRenderTarget(e),r.render(o,qi)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-bi?r-this._lodMax+bi:0),u=4*(this._cubeSize-h);Si(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,qi)}}function lm(i){const e=[],t=[];let n=i;const r=i-bi+1+rm;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,p=3,g=new Float32Array(p*u*d),M=new Float32Array(p*u*d);for(let f=0;f<d;f++){const b=f%3*2/3-1,A=f>2?0:-1,v=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];g.set(v,p*u*f);for(let y=0;y<u;y++){const E=h[y*2]*2-1,w=h[y*2+1]*2-1;f===0?Wn.set(1,w,E):f===1?Wn.set(-E,1,-w):f===2?Wn.set(-E,w,1):f===3?Wn.set(-1,w,-E):f===4?Wn.set(-E,-1,w):Wn.set(E,w,-1),Wn.toArray(M,(f*u+y)*p)}}const m=new mt;m.setAttribute("position",new dt(g,p)),m.setAttribute("outputDirection",new dt(M,p)),t.push(new lt(m,null)),n>bi&&n--}return{lodMeshes:t,sizeLods:e}}function xl(i,e,t){const n=new Gt(i,e,t);return n.texture.mapping=hs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Si(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function cm(i,e,t){return new Mt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:am,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function um(i,e,t){return new Mt({name:"SphericalGaussianBlur",defines:{SAMPLES:sm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Ml(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ms(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Sl(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function ms(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Fc extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Rc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new or(5,5,5),s=new Mt({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:En});s.uniforms.tEquirect.value=t;const a=new lt(r,s),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=it),new df(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function hm(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Ms||p===Ss)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new Fc(g.height);return M.fromEquirectangularTexture(i,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===Ms||p===Ss,M=p===$n||p===Ci;if(g||M){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new vl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const b=u.image;return g&&b&&b.height>0||M&&b&&l(b)?(n===null&&(n=new vl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Ms?u.mapping=$n:p===Ss&&(u.mapping=Ci),u}function l(u){let p=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function fm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&wi("WebGLRenderer: "+n+" extension not supported."),r}}}function dm(i,e,t,n){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let M=0;if(g===void 0)return;if(p!==null){const b=p.array;M=p.version;for(let A=0,v=b.length;A<v;A+=3){const y=b[A+0],E=b[A+1],w=b[A+2];u.push(y,E,E,w,w,y)}}else{const b=g.array;M=g.version;for(let A=0,v=b.length/3-1;A<v;A+=3){const y=A+0,E=A+1,w=A+2;u.push(y,E,E,w,w,y)}}const m=new(g.count>=65535?wc:Tc)(u,1);m.version=M;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function pm(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,s,d*a),t.update(u,n,1)}function c(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,s,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,p);let M=0;for(let m=0;m<p;m++)M+=u[m];t.update(M,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function mm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:qe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function gm(i,e,t){const n=new WeakMap,r=new rt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let T=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let A=0;p===!0&&(A=1),g===!0&&(A=2),M===!0&&(A=3);let v=o.attributes.position.count*A,y=1;v>e.maxTextureSize&&(y=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const E=new Float32Array(v*y*4*d),w=new Ec(E,v,y,d);w.type=tn,w.needsUpdate=!0;const x=A*4;for(let P=0;P<d;P++){const I=m[P],D=f[P],z=b[P],L=v*y*4*P;for(let O=0;O<I.count;O++){const X=O*x;p===!0&&(r.fromBufferAttribute(I,O),E[L+X+0]=r.x,E[L+X+1]=r.y,E[L+X+2]=r.z,E[L+X+3]=0),g===!0&&(r.fromBufferAttribute(D,O),E[L+X+4]=r.x,E[L+X+5]=r.y,E[L+X+6]=r.z,E[L+X+7]=0),M===!0&&(r.fromBufferAttribute(z,O),E[L+X+8]=r.x,E[L+X+9]=r.y,E[L+X+10]=r.z,E[L+X+11]=z.itemSize===4?r.w:1)}}u={count:d,texture:w,size:new Se(v,y)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function _m(i,e,t,n,r){let s=new WeakMap;function a(c){const h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const vm={[oc]:"LINEAR_TONE_MAPPING",[lc]:"REINHARD_TONE_MAPPING",[cc]:"CINEON_TONE_MAPPING",[uc]:"ACES_FILMIC_TONE_MAPPING",[fc]:"AGX_TONE_MAPPING",[dc]:"NEUTRAL_TONE_MAPPING",[hc]:"CUSTOM_TONE_MAPPING"};function xm(i,e,t,n,r,s){const a=new Gt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new mt;c.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ht([0,2,0,0,2,0],2));const h=new af({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new lt(c,h),u=new ps(-1,1,1,-1,0,1);let p=null,g=null,M=!1,m,f=null,b=[],A=!1;this.setSize=function(v,y){a.setSize(v,y),o!==null&&o.setSize(v,y),l!==null&&l.setSize(v,y);for(let E=0;E<b.length;E++){const w=b[E];w.setSize&&w.setSize(v,y)}},this.setEffects=function(v){b=v,A=b.length>0&&b[0].isRenderPass===!0;const y=a.width,E=a.height;b.length>0&&o===null&&(o=new Gt(y,E,{type:fn,depthBuffer:!1,stencilBuffer:!1}),l=new Gt(y,E,{type:fn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<b.length;w++){const x=b[w];x.setSize&&x.setSize(y,E)}},this.begin=function(v,y){if(M||v.toneMapping===un&&b.length===0)return!1;if(f=y,y!==null){const E=y.width,w=y.height;(a.width!==E||a.height!==w)&&this.setSize(E,w)}return A===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=un,!0},this.hasRenderPass=function(){return A},this.end=function(v,y){v.toneMapping=m,M=!0;let E=a,w=o;for(let x=0;x<b.length;x++){const T=b[x];T.enabled!==!1&&(T.render(v,w,E,y),T.needsSwap!==!1&&(E=w,w=w===o?l:o))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,h.defines={},Xe.getTransfer(p)===et&&(h.defines.SRGB_TRANSFER="");const x=vm[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(f),v.render(d,u),f=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const Oc=new wt,qa=new Li(1,1),Bc=new Ec,zc=new Ch,kc=new Rc,yl=[],El=[],bl=new Float32Array(16),Tl=new Float32Array(9),wl=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=yl[r];if(s===void 0&&(s=new Float32Array(r),yl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function yt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function gs(i,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Mm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,n))return;wl.set(n),i.uniformMatrix2fv(this.addr,!1,wl),Et(t,n)}}function Tm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,n))return;Tl.set(n),i.uniformMatrix3fv(this.addr,!1,Tl),Et(t,n)}}function wm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(yt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,n))return;bl.set(n),i.uniformMatrix4fv(this.addr,!1,bl),Et(t,n)}}function Am(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function Lm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function Im(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function Um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function Nm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(qa.compareFunction=t.isReversedDepthBuffer()?ao:so,s=qa):s=Oc,t.setTexture2D(e||s,r)}function Fm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||zc,r)}function Om(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||kc,r)}function Bm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Bc,r)}function zm(i){switch(i){case 5126:return Mm;case 35664:return Sm;case 35665:return ym;case 35666:return Em;case 35674:return bm;case 35675:return Tm;case 35676:return wm;case 5124:case 35670:return Am;case 35667:case 35671:return Rm;case 35668:case 35672:return Cm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Dm;case 36295:return Im;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Bm}}function km(i,e){i.uniform1fv(this.addr,e)}function Hm(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function Gm(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function Vm(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function Wm(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xm(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qm(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ym(i,e){i.uniform1iv(this.addr,e)}function Km(i,e){i.uniform2iv(this.addr,e)}function $m(i,e){i.uniform3iv(this.addr,e)}function Zm(i,e){i.uniform4iv(this.addr,e)}function Jm(i,e){i.uniform1uiv(this.addr,e)}function Qm(i,e){i.uniform2uiv(this.addr,e)}function jm(i,e){i.uniform3uiv(this.addr,e)}function e0(i,e){i.uniform4uiv(this.addr,e)}function t0(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),Et(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=qa:a=Oc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function n0(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),Et(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||zc,s[a])}function i0(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),Et(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||kc,s[a])}function r0(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);yt(n,s)||(i.uniform1iv(this.addr,s),Et(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Bc,s[a])}function s0(i){switch(i){case 5126:return km;case 35664:return Hm;case 35665:return Gm;case 35666:return Vm;case 35674:return Wm;case 35675:return Xm;case 35676:return qm;case 5124:case 35670:return Ym;case 35667:case 35671:return Km;case 35668:case 35672:return $m;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return Qm;case 36295:return jm;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return r0}}class a0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zm(t.type)}}class o0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=s0(t.type)}}class l0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Js=/(\w+)(\])?(\[|\.)?/g;function Al(i,e){i.seq.push(e),i.map[e.id]=e}function c0(i,e,t){const n=i.name,r=n.length;for(Js.lastIndex=0;;){const s=Js.exec(n),a=Js.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Al(t,c===void 0?new a0(o,i,e):new o0(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new l0(o),Al(t,d)),t=d}}}class Zr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);c0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Rl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const u0=37297;let h0=0;function f0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Cl=new Ue;function d0(i){Xe._getMatrix(Cl,Xe.workingColorSpace,i);const e=`mat3( ${Cl.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(i)){case ts:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Pl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+f0(i.getShaderSource(e),o)}else return s}function p0(i,e){const t=d0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const m0={[oc]:"Linear",[lc]:"Reinhard",[cc]:"Cineon",[uc]:"ACESFilmic",[fc]:"AgX",[dc]:"Neutral",[hc]:"Custom"};function g0(i,e){const t=m0[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const kr=new B;function _0(){Xe.getLuminanceCoefficients(kr);const i=kr.x.toFixed(4),e=kr.y.toFixed(4),t=kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function x0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function M0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ji(i){return i!==""}function Ll(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ya(i){return i.replace(S0,E0)}const y0=new Map;function E0(i,e){let t=Be[e];if(t===void 0){const n=y0.get(e);if(n!==void 0)t=Be[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ya(t)}const b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(i){return i.replace(b0,T0)}function T0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ul(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const w0={[Xr]:"SHADOWMAP_TYPE_PCF",[Zi]:"SHADOWMAP_TYPE_VSM"};function A0(i){return w0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const R0={[$n]:"ENVMAP_TYPE_CUBE",[Ci]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE_UV"};function C0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":R0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const P0={[Ci]:"ENVMAP_MODE_REFRACTION"};function L0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":P0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const D0={[ac]:"ENVMAP_BLENDING_MULTIPLY",[qu]:"ENVMAP_BLENDING_MIX",[Yu]:"ENVMAP_BLENDING_ADD"};function I0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":D0[i.combine]||"ENVMAP_BLENDING_NONE"}function U0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function N0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=A0(t),c=C0(t),h=L0(t),d=I0(t),u=U0(t),p=v0(t),g=x0(s),M=r.createProgram();let m,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),f.length>0&&(f+=`
`)):(m=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),f=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==un?"#define TONE_MAPPING":"",t.toneMapping!==un?Be.tonemapping_pars_fragment:"",t.toneMapping!==un?g0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,p0("linearToOutputTexel",t.outputColorSpace),_0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),a=Ya(a),a=Ll(a,t),a=Dl(a,t),o=Ya(o),o=Ll(o,t),o=Dl(o,t),a=Il(a),o=Il(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=b+m+a,v=b+f+o,y=Rl(r,r.VERTEX_SHADER,A),E=Rl(r,r.FRAGMENT_SHADER,v);r.attachShader(M,y),r.attachShader(M,E),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function w(I){if(i.debug.checkShaderErrors){const D=r.getProgramInfoLog(M)||"",z=r.getShaderInfoLog(y)||"",L=r.getShaderInfoLog(E)||"",O=D.trim(),X=z.trim(),q=L.trim();let ie=!0,Y=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,M,y,E);else{const j=Pl(r,y,"vertex"),ee=Pl(r,E,"fragment");qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+j+`
`+ee)}else O!==""?Le("WebGLProgram: Program Info Log:",O):(X===""||q==="")&&(Y=!1);Y&&(I.diagnostics={runnable:ie,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:q,prefix:f}})}r.deleteShader(y),r.deleteShader(E),x=new Zr(r,M),T=M0(r,M)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(M,u0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h0++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=y,this.fragmentShader=E,this}let F0=0;class O0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new B0(e),t.set(e,n)),n}}class B0{constructor(e){this.id=F0++,this.code=e,this.usedTimes=0}}function z0(i){return i===Zn||i===jr||i===es}function k0(i,e,t,n,r,s){const a=new co,o=new O0,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,T,P,I,D,z){const L=I.fog,O=D.geometry,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ie=e.get(x.envMap||X,q),Y=ie&&ie.mapping===hs?ie.image.height:null,j=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Le("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ee=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ce=ee!==void 0?ee.length:0;let ye=0;O.morphAttributes.position!==void 0&&(ye=1),O.morphAttributes.normal!==void 0&&(ye=2),O.morphAttributes.color!==void 0&&(ye=3);let Ke,He,We,K;if(j){const at=on[j];Ke=at.vertexShader,He=at.fragmentShader}else{Ke=x.vertexShader,He=x.fragmentShader;const at=o.getVertexShaderStage(x),$e=o.getFragmentShaderStage(x);o.update(x,at,$e),We=at.id,K=$e.id}const C=i.getRenderTarget(),te=i.state.buffers.depth.getReversed(),ne=D.isInstancedMesh===!0,se=D.isBatchedMesh===!0,Te=!!x.map,ke=!!x.matcap,De=!!ie,Fe=!!x.aoMap,Qe=!!x.lightMap,ze=!!x.bumpMap&&x.wireframe===!1,ut=!!x.normalMap,bt=!!x.displacementMap,Ut=!!x.emissiveMap,ft=!!x.metalnessMap,gt=!!x.roughnessMap,F=x.anisotropy>0,At=x.clearcoat>0,je=x.dispersion>0,R=x.retroreflectivity>0,_=x.iridescence>0,k=x.sheen>0,V=x.transmission>0,$=F&&!!x.anisotropyMap,ae=At&&!!x.clearcoatMap,oe=At&&!!x.clearcoatNormalMap,Z=At&&!!x.clearcoatRoughnessMap,Q=_&&!!x.iridescenceMap,le=_&&!!x.iridescenceThicknessMap,we=k&&!!x.sheenColorMap,fe=k&&!!x.sheenRoughnessMap,ce=!!x.specularMap,Ae=!!x.specularColorMap,Pe=!!x.specularIntensityMap,Ne=V&&!!x.transmissionMap,N=V&&!!x.thicknessMap,ue=!!x.gradientMap,J=!!x.alphaMap,he=x.alphaTest>0,ge=!!x.alphaHash,re=!!x.extensions;let Re=un;x.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Re=i.toneMapping);const Ee={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:Ke,fragmentShader:He,defines:x.defines,customVertexShaderID:We,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:se,batchingColor:se&&D._colorsTexture!==null,instancing:ne,instancingColor:ne&&D.instanceColor!==null,instancingMorph:ne&&D.morphTexture!==null,outputColorSpace:C===null?i.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Te,matcap:ke,envMap:De,envMapMode:De&&ie.mapping,envMapCubeUVHeight:Y,aoMap:Fe,lightMap:Qe,bumpMap:ze,normalMap:ut,displacementMap:bt,emissiveMap:Ut,normalMapObjectSpace:ut&&x.normalMapType===Zu,normalMapTangentSpace:ut&&x.normalMapType===Io,packedNormalMap:ut&&x.normalMapType===Io&&z0(x.normalMap.format),metalnessMap:ft,roughnessMap:gt,anisotropy:F,anisotropyMap:$,clearcoat:At,clearcoatMap:ae,clearcoatNormalMap:oe,clearcoatRoughnessMap:Z,dispersion:je,retroreflection:R,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:le,sheen:k,sheenColorMap:we,sheenRoughnessMap:fe,specularMap:ce,specularColorMap:Ae,specularIntensityMap:Pe,transmission:V,transmissionMap:Ne,thicknessMap:N,gradientMap:ue,opaque:x.transparent===!1&&x.blending===Qi&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:he,alphaHash:ge,combine:x.combine,mapUv:Te&&g(x.map.channel),aoMapUv:Fe&&g(x.aoMap.channel),lightMapUv:Qe&&g(x.lightMap.channel),bumpMapUv:ze&&g(x.bumpMap.channel),normalMapUv:ut&&g(x.normalMap.channel),displacementMapUv:bt&&g(x.displacementMap.channel),emissiveMapUv:Ut&&g(x.emissiveMap.channel),metalnessMapUv:ft&&g(x.metalnessMap.channel),roughnessMapUv:gt&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:ae&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:we&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:fe&&g(x.sheenRoughnessMap.channel),specularMapUv:ce&&g(x.specularMap.channel),specularColorMapUv:Ae&&g(x.specularColorMap.channel),specularIntensityMapUv:Pe&&g(x.specularIntensityMap.channel),transmissionMapUv:Ne&&g(x.transmissionMap.channel),thicknessMapUv:N&&g(x.thicknessMap.channel),alphaMapUv:J&&g(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ut||F),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(Te||J),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ut===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:ye,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Re,decodeVideoTexture:Te&&x.map.isVideoTexture===!0&&Xe.getTransfer(x.map.colorSpace)===et,decodeVideoTextureEmissive:Ut&&x.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(x.emissiveMap.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Yt,flipSided:x.side===Ot,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:re&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&x.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function m(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(f(T,x),b(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function f(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function b(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const T=p[x.type];let P;if(T){const I=on[T];P=nf.clone(I.uniforms)}else P=x.uniforms;return P}function v(x,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new N0(i,T,x,r),c.push(P),h.set(T,P)),P}function y(x){if(--x.usedTimes===0){const T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function w(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:A,acquireProgram:v,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:w}}function H0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function G0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Nl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,M,m,f){let b=i[e];return b===void 0?(b={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:f},i[e]=b):(b.id=u.id,b.object=u,b.geometry=p,b.material=g,b.materialVariant=a(u),b.groupOrder=M,b.renderOrder=u.renderOrder,b.z=m,b.group=f),e++,b}function l(u,p,g,M,m,f,b){b.reversedDepth===!0&&(m=-m);const A=o(u,p,g,M,m,f);g.transmission>0?n.push(A):g.transparent===!0?r.push(A):t.push(A)}function c(u,p,g,M,m,f){const b=o(u,p,g,M,m,f);g.transmission>0?n.unshift(b):g.transparent===!0?r.unshift(b):t.unshift(b)}function h(u,p){t.length>1&&t.sort(u||G0),n.length>1&&n.sort(p||Nl),r.length>1&&r.sort(p||Nl)}function d(){for(let u=e,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function V0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Fl,i.set(n,[a])):r>=s.length?(a=new Fl,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function W0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Ie};break;case"SpotLight":t={position:new B,direction:new B,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function X0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let q0=0;function Y0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function K0(i){const e=new W0,t=X0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);const r=new B,s=new Je,a=new Je;function o(c){let h=0,d=0,u=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let p=0,g=0,M=0,m=0,f=0,b=0,A=0,v=0,y=0,E=0,w=0,x=0,T=0,P=0;c.sort(Y0);for(let D=0,z=c.length;D<z;D++){const L=c[D],O=L.color,X=L.intensity,q=L.distance;let ie=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Zn?ie=L.shadow.map.texture:ie=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*X,d+=O.g*X,u+=O.b*X;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],X);P++}else if(L.isSunLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,ee=t.get(L);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=ie;const Ce=j.getViewportCount();for(let ye=0;ye<Ce;ye++)n.sunShadowMatrix[M+ye]=j.getMatrix(ye),n.sunShadowCascade[M+ye]=j._cascadeData[ye];M+=Ce,g++}n.sun[p]=Y,p++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,ee=t.get(L);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=L.shadow.matrix,y++}n.directional[m]=Y,m++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(O).multiplyScalar(X),Y.distance=q,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[b]=Y;const j=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,j.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[b]=j.matrix,L.castShadow){const ee=t.get(L);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,n.spotShadow[b]=ee,n.spotShadowMap[b]=ie,w++}b++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(O).multiplyScalar(X),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[A]=Y,A++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const j=L.shadow,ee=t.get(L);ee.shadowIntensity=j.intensity,ee.shadowBias=j.bias,ee.shadowNormalBias=j.normalBias,ee.shadowRadius=j.radius,ee.shadowMapSize=j.mapSize,ee.shadowCameraNear=j.camera.near,ee.shadowCameraFar=j.camera.far,n.pointShadow[f]=ee,n.pointShadowMap[f]=ie,n.pointShadowMatrix[f]=L.shadow.matrix,E++}n.point[f]=Y,f++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(X),Y.groundColor.copy(L.groundColor).multiplyScalar(X),n.hemi[v]=Y,v++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const I=n.hash;(I.sunLength!==p||I.directionalLength!==m||I.pointLength!==f||I.spotLength!==b||I.rectAreaLength!==A||I.hemiLength!==v||I.numSunShadows!==g||I.numDirectionalShadows!==y||I.numPointShadows!==E||I.numSpotShadows!==w||I.numSpotMaps!==x||I.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=m,n.spot.length=b,n.rectArea.length=A,n.point.length=f,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=w,n.spotShadowMap.length=w,n.spotLightMatrix.length=w+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,I.sunLength=p,I.directionalLength=m,I.pointLength=f,I.spotLength=b,I.rectAreaLength=A,I.hemiLength=v,I.numSunShadows=g,I.numDirectionalShadows=y,I.numPointShadows=E,I.numSpotShadows=w,I.numSpotMaps=x,I.numLightProbes=P,n.version=q0++)}function l(c,h){let d=0,u=0,p=0,g=0,M=0,m=0;const f=h.matrixWorldInverse;for(let b=0,A=c.length;b<A;b++){const v=c[b];if(v.isSunLight){const y=n.sun[d];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(f),d++}else if(v.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),u++}else if(v.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),g++}else if(v.isRectAreaLight){const y=n.rectArea[M];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),a.identity(),s.copy(v.matrixWorld),s.premultiply(f),a.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),M++}else if(v.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:n}}function Ol(i){const e=new K0(i),t=[],n=[],r=[];function s(u){d.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function $0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Ol(i),e.set(r,[o])):s>=a.length?(o=new Ol(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Z0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J0=`uniform sampler2D shadow_pass;
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
}`,Q0=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],j0=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Bl=new Je,Yi=new B,Qs=new B;function eg(i,e,t){let n=new uo;const r=new Se,s=new Se,a=new rt,o=new of,l=new lf,c={},h=t.maxTextureSize,d={[Kn]:Ot,[Ot]:Kn,[Yt]:Yt},u=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:Z0,fragmentShader:J0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new mt;g.setAttribute("position",new dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new lt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let f=this.type;this.render=function(E,w,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Au&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),D=i.state;D.setBlending(En),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const z=f!==this.type;z&&w.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=E.length;L<O;L++){const X=E[L],q=X.shadow;if(q===void 0){Le("WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const ie=q.getFrameExtents();r.multiply(ie),s.copy(q.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ie.x),r.x=s.x*ie.x,q.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ie.y),r.y=s.y*ie.y,q.mapSize.y=s.y));const Y=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Y,q.map===null||z===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Zi){if(X.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Gt(r.x,r.y,{format:Zn,type:fn,minFilter:it,magFilter:it,generateMipmaps:!1}),q.map.texture.name=X.name+".shadowMap",q.map.depthTexture=new Li(r.x,r.y,tn),q.map.depthTexture.name=X.name+".shadowMapDepth",q.map.depthTexture.format=wn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=St,q.map.depthTexture.magFilter=St}else X.isPointLight?(q.map=new Fc(r.x),q.map.depthTexture=new ef(r.x,hn)):(q.map=new Gt(r.x,r.y),q.map.depthTexture=new Li(r.x,r.y,hn)),q.map.depthTexture.name=X.name+".shadowMap",q.map.depthTexture.format=wn,this.type===Xr?(q.map.depthTexture.compareFunction=Y?ao:so,q.map.depthTexture.minFilter=it,q.map.depthTexture.magFilter=it):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=St,q.map.depthTexture.magFilter=St);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==r.x||q.map.height!==r.y)&&q.map.setSize(r.x,r.y);const j=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();X.isPointLight!==!0&&q.updateMatrices(X,x);for(let ee=0;ee<j;ee++){const Ce=q.getCamera(ee);if(X.isPointLight){const ye=q.camera,Ke=q.matrix,He=X.distance||ye.far;He!==ye.far&&(ye.far=He,ye.updateProjectionMatrix()),Yi.setFromMatrixPosition(X.matrixWorld),ye.position.copy(Yi),Qs.copy(ye.position),Qs.add(Q0[ee]),ye.up.copy(j0[ee]),ye.lookAt(Qs),ye.updateMatrixWorld(),Ke.makeTranslation(-Yi.x,-Yi.y,-Yi.z),Bl.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Bl,ye.coordinateSystem,ye.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(q.map),i.clear());const ye=q.getViewport(ee);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),D.viewport(a)}n=q.getFrustum(ee),v(w,x,Ce,X,this.type)}q.isPointLightShadow!==!0&&this.type===Zi&&b(q,x),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,I)};function b(E,w){const x=e.update(M);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Gt(r.x,r.y,{format:Zn,type:fn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,x,u,M,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,x,p,M,null)}function A(E,w,x,T){let P=null;const I=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)P=I;else if(P=x.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const D=P.uuid,z=w.uuid;let L=c[D];L===void 0&&(L={},c[D]=L);let O=L[z];O===void 0&&(O=P.clone(),L[z]=O,w.addEventListener("dispose",y)),P=O}if(P.visible=w.visible,P.wireframe=w.wireframe,T===Zi?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:d[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const D=i.properties.get(P);D.light=x}return P}function v(E,w,x,T,P){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Zi)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const z=e.update(E),L=E.material;if(Array.isArray(L)){const O=z.groups;for(let X=0,q=O.length;X<q;X++){const ie=O[X],Y=L[ie.materialIndex];if(Y&&Y.visible){const j=A(E,Y,T,P);E.onBeforeShadow(i,E,w,x,z,j,ie),i.renderBufferDirect(x,null,z,j,E,ie),E.onAfterShadow(i,E,w,x,z,j,ie)}}}else if(L.visible){const O=A(E,L,T,P);E.onBeforeShadow(i,E,w,x,z,O,null),i.renderBufferDirect(x,null,z,O,E,null),E.onAfterShadow(i,E,w,x,z,O,null)}}const D=E.children;for(let z=0,L=D.length;z<L;z++)v(D[z],w,x,T,P)}function y(E){E.target.removeEventListener("dispose",y);for(const x in c){const T=c[x],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function tg(i,e){function t(){let N=!1;const ue=new rt;let J=null;const he=new rt(0,0,0,0);return{setMask:function(ge){J!==ge&&!N&&(i.colorMask(ge,ge,ge,ge),J=ge)},setLocked:function(ge){N=ge},setClear:function(ge,re,Re,Ee,at){at===!0&&(ge*=Ee,re*=Ee,Re*=Ee),ue.set(ge,re,Re,Ee),he.equals(ue)===!1&&(i.clearColor(ge,re,Re,Ee),he.copy(ue))},reset:function(){N=!1,J=null,he.set(-1,0,0,0)}}}function n(){let N=!1,ue=!1,J=null,he=null,ge=null;return{setReversed:function(re){if(ue!==re){const Re=e.get("EXT_clip_control");re?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ue=re;const Ee=ge;ge=null,this.setClear(Ee)}},getReversed:function(){return ue},setTest:function(re){re?C(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(re){J!==re&&!N&&(i.depthMask(re),J=re)},setFunc:function(re){if(ue&&(re=oh[re]),he!==re){switch(re){case sa:i.depthFunc(i.NEVER);break;case aa:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case Ri:i.depthFunc(i.LEQUAL);break;case la:i.depthFunc(i.EQUAL);break;case ca:i.depthFunc(i.GEQUAL);break;case ua:i.depthFunc(i.GREATER);break;case ha:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=re}},setLocked:function(re){N=re},setClear:function(re){ge!==re&&(ge=re,ue&&(re=1-re),i.clearDepth(re))},reset:function(){N=!1,J=null,he=null,ge=null,ue=!1}}}function r(){let N=!1,ue=null,J=null,he=null,ge=null,re=null,Re=null,Ee=null,at=null;return{setTest:function($e){N||($e?C(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function($e){ue!==$e&&!N&&(i.stencilMask($e),ue=$e)},setFunc:function($e,Zt,nn){(J!==$e||he!==Zt||ge!==nn)&&(i.stencilFunc($e,Zt,nn),J=$e,he=Zt,ge=nn)},setOp:function($e,Zt,nn){(re!==$e||Re!==Zt||Ee!==nn)&&(i.stencilOp($e,Zt,nn),re=$e,Re=Zt,Ee=nn)},setLocked:function($e){N=$e},setClear:function($e){at!==$e&&(i.clearStencil($e),at=$e)},reset:function(){N=!1,ue=null,J=null,he=null,ge=null,re=null,Re=null,Ee=null,at=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],M=null,m=!1,f=null,b=null,A=null,v=null,y=null,E=null,w=null,x=new Ie(0,0,0),T=0,P=!1,I=null,D=null,z=null,L=null,O=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,ie=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=ie>=1):Y.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=ie>=2);let j=null,ee={};const Ce=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),Ke=new rt().fromArray(Ce),He=new rt().fromArray(ye);function We(N,ue,J,he){const ge=new Uint8Array(4),re=i.createTexture();i.bindTexture(N,re),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<J;Re++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,ge):i.texImage2D(ue+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ge);return re}const K={};K[i.TEXTURE_2D]=We(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=We(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=We(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=We(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),C(i.DEPTH_TEST),a.setFunc(Ri),ze(!1),ut(Po),C(i.CULL_FACE),Fe(En);function C(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function te(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function ne(N,ue){return u[N]!==ue?(i.bindFramebuffer(N,ue),u[N]=ue,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ue),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function se(N,ue){let J=g,he=!1;if(N){J=p.get(ue),J===void 0&&(J=[],p.set(ue,J));const ge=N.textures;if(J.length!==ge.length||J[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Re=ge.length;re<Re;re++)J[re]=i.COLOR_ATTACHMENT0+re;J.length=ge.length,he=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,he=!0);he&&i.drawBuffers(J)}function Te(N){return M!==N?(i.useProgram(N),M=N,!0):!1}const ke={[yi]:i.FUNC_ADD,[Cu]:i.FUNC_SUBTRACT,[Pu]:i.FUNC_REVERSE_SUBTRACT};ke[Lu]=i.MIN,ke[Du]=i.MAX;const De={[Iu]:i.ZERO,[Uu]:i.ONE,[Nu]:i.SRC_COLOR,[rc]:i.SRC_ALPHA,[Hu]:i.SRC_ALPHA_SATURATE,[zu]:i.DST_COLOR,[Ou]:i.DST_ALPHA,[Fu]:i.ONE_MINUS_SRC_COLOR,[sc]:i.ONE_MINUS_SRC_ALPHA,[ku]:i.ONE_MINUS_DST_COLOR,[Bu]:i.ONE_MINUS_DST_ALPHA,[Gu]:i.CONSTANT_COLOR,[Vu]:i.ONE_MINUS_CONSTANT_COLOR,[Wu]:i.CONSTANT_ALPHA,[Xu]:i.ONE_MINUS_CONSTANT_ALPHA};function Fe(N,ue,J,he,ge,re,Re,Ee,at,$e){if(N===En){m===!0&&(te(i.BLEND),m=!1);return}if(m===!1&&(C(i.BLEND),m=!0),N!==Ru){if(N!==f||$e!==P){if((b!==yi||y!==yi)&&(i.blendEquation(i.FUNC_ADD),b=yi,y=yi),$e)switch(N){case Qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vn:i.blendFunc(i.ONE,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Do:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qe("WebGLState: Invalid blending: ",N);break}else switch(N){case Qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lo:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Do:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",N);break}A=null,v=null,E=null,w=null,x.set(0,0,0),T=0,f=N,P=$e}return}ge=ge||ue,re=re||J,Re=Re||he,(ue!==b||ge!==y)&&(i.blendEquationSeparate(ke[ue],ke[ge]),b=ue,y=ge),(J!==A||he!==v||re!==E||Re!==w)&&(i.blendFuncSeparate(De[J],De[he],De[re],De[Re]),A=J,v=he,E=re,w=Re),(Ee.equals(x)===!1||at!==T)&&(i.blendColor(Ee.r,Ee.g,Ee.b,at),x.copy(Ee),T=at),f=N,P=!1}function Qe(N,ue){N.side===Yt?te(i.CULL_FACE):C(i.CULL_FACE);let J=N.side===Ot;ue&&(J=!J),ze(J),N.blending===Qi&&N.transparent===!1?Fe(En):Fe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const he=N.stencilWrite;o.setTest(he),he&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ut(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?C(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(N){I!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),I=N)}function ut(N){N!==Tu?(C(i.CULL_FACE),N!==D&&(N===Po?i.cullFace(i.BACK):N===wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),D=N}function bt(N){N!==z&&(q&&i.lineWidth(N),z=N)}function Ut(N,ue,J){N?(C(i.POLYGON_OFFSET_FILL),(L!==ue||O!==J)&&(L=ue,O=J,a.getReversed()&&(ue=-ue),i.polygonOffset(ue,J))):te(i.POLYGON_OFFSET_FILL)}function ft(N){N?C(i.SCISSOR_TEST):te(i.SCISSOR_TEST)}function gt(N){N===void 0&&(N=i.TEXTURE0+X-1),j!==N&&(i.activeTexture(N),j=N)}function F(N,ue,J){J===void 0&&(j===null?J=i.TEXTURE0+X-1:J=j);let he=ee[J];he===void 0&&(he={type:void 0,texture:void 0},ee[J]=he),(he.type!==N||he.texture!==ue)&&(j!==J&&(i.activeTexture(J),j=J),i.bindTexture(N,ue||K[N]),he.type=N,he.texture=ue)}function At(){const N=ee[j];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function je(){try{i.compressedTexImage2D(...arguments)}catch(N){qe("WebGLState:",N)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(N){qe("WebGLState:",N)}}function _(){try{i.texSubImage2D(...arguments)}catch(N){qe("WebGLState:",N)}}function k(){try{i.texSubImage3D(...arguments)}catch(N){qe("WebGLState:",N)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(N){qe("WebGLState:",N)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(N){qe("WebGLState:",N)}}function ae(){try{i.texStorage2D(...arguments)}catch(N){qe("WebGLState:",N)}}function oe(){try{i.texStorage3D(...arguments)}catch(N){qe("WebGLState:",N)}}function Z(){try{i.texImage2D(...arguments)}catch(N){qe("WebGLState:",N)}}function Q(){try{i.texImage3D(...arguments)}catch(N){qe("WebGLState:",N)}}function le(N){return d[N]!==void 0?d[N]:i.getParameter(N)}function we(N,ue){d[N]!==ue&&(i.pixelStorei(N,ue),d[N]=ue)}function fe(N){Ke.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Ke.copy(N))}function ce(N){He.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),He.copy(N))}function Ae(N,ue){let J=c.get(ue);J===void 0&&(J=new WeakMap,c.set(ue,J));let he=J.get(N);he===void 0&&(he=i.getUniformBlockIndex(ue,N.name),J.set(N,he))}function Pe(N,ue){const he=c.get(ue).get(N);l.get(ue)!==he&&(i.uniformBlockBinding(ue,he,N.__bindingPointIndex),l.set(ue,he))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,ee={},u={},p=new WeakMap,g=[],M=null,m=!1,f=null,b=null,A=null,v=null,y=null,E=null,w=null,x=new Ie(0,0,0),T=0,P=!1,I=null,D=null,z=null,L=null,O=null,Ke.set(0,0,i.canvas.width,i.canvas.height),He.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:C,disable:te,bindFramebuffer:ne,drawBuffers:se,useProgram:Te,setBlending:Fe,setMaterial:Qe,setFlipSided:ze,setCullFace:ut,setLineWidth:bt,setPolygonOffset:Ut,setScissorTest:ft,activeTexture:gt,bindTexture:F,unbindTexture:At,compressedTexImage2D:je,compressedTexImage3D:R,texImage2D:Z,texImage3D:Q,pixelStorei:we,getParameter:le,updateUBOMapping:Ae,uniformBlockBinding:Pe,texStorage2D:ae,texStorage3D:oe,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:V,compressedTexSubImage3D:$,scissor:fe,viewport:ce,reset:Ne}}function ng(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(R,_){return g?new OffscreenCanvas(R,_):ns("canvas")}function m(R,_,k){let V=1;const $=je(R);if(($.width>k||$.height>k)&&(V=k/Math.max($.width,$.height)),V<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ae=Math.floor(V*$.width),oe=Math.floor(V*$.height);u===void 0&&(u=M(ae,oe));const Z=_?M(ae,oe):u;return Z.width=ae,Z.height=oe,Z.getContext("2d").drawImage(R,0,0,ae,oe),Le("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ae+"x"+oe+")."),Z}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),R;return R}function f(R){return R.generateMipmaps}function b(R){i.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(R,_,k,V,$,ae=!1){if(R!==null){if(i[R]!==void 0)return i[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let oe;V&&(oe=e.get("EXT_texture_norm16"),oe||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=_;if(_===i.RED&&(k===i.FLOAT&&(Z=i.R32F),k===i.HALF_FLOAT&&(Z=i.R16F),k===i.UNSIGNED_BYTE&&(Z=i.R8),k===i.UNSIGNED_SHORT&&oe&&(Z=oe.R16_EXT),k===i.SHORT&&oe&&(Z=oe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.R8UI),k===i.UNSIGNED_SHORT&&(Z=i.R16UI),k===i.UNSIGNED_INT&&(Z=i.R32UI),k===i.BYTE&&(Z=i.R8I),k===i.SHORT&&(Z=i.R16I),k===i.INT&&(Z=i.R32I)),_===i.RG&&(k===i.FLOAT&&(Z=i.RG32F),k===i.HALF_FLOAT&&(Z=i.RG16F),k===i.UNSIGNED_BYTE&&(Z=i.RG8),k===i.UNSIGNED_SHORT&&oe&&(Z=oe.RG16_EXT),k===i.SHORT&&oe&&(Z=oe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RG8UI),k===i.UNSIGNED_SHORT&&(Z=i.RG16UI),k===i.UNSIGNED_INT&&(Z=i.RG32UI),k===i.BYTE&&(Z=i.RG8I),k===i.SHORT&&(Z=i.RG16I),k===i.INT&&(Z=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),k===i.UNSIGNED_INT&&(Z=i.RGB32UI),k===i.BYTE&&(Z=i.RGB8I),k===i.SHORT&&(Z=i.RGB16I),k===i.INT&&(Z=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),k===i.UNSIGNED_INT&&(Z=i.RGBA32UI),k===i.BYTE&&(Z=i.RGBA8I),k===i.SHORT&&(Z=i.RGBA16I),k===i.INT&&(Z=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_SHORT&&oe&&(Z=oe.RGB16_EXT),k===i.SHORT&&oe&&(Z=oe.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),_===i.RGBA){const Q=ae?ts:Xe.getTransfer($);k===i.FLOAT&&(Z=i.RGBA32F),k===i.HALF_FLOAT&&(Z=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Z=Q===et?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&oe&&(Z=oe.RGBA16_EXT),k===i.SHORT&&oe&&(Z=oe.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(R,_){let k;return R?_===null||_===hn||_===Pi?k=i.DEPTH24_STENCIL8:_===tn?k=i.DEPTH32F_STENCIL8:_===nr&&(k=i.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===hn||_===Pi?k=i.DEPTH_COMPONENT24:_===tn?k=i.DEPTH_COMPONENT32F:_===nr&&(k=i.DEPTH_COMPONENT16),k}function E(R,_){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==St&&R.minFilter!==it?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function w(R){const _=R.target;_.removeEventListener("dispose",w),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(R){const _=R.target;_.removeEventListener("dispose",x),I(_)}function T(R){const _=n.get(R);if(_.__webglInit===void 0)return;const k=R.source,V=p.get(k);if(V){const $=V[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(R),Object.keys(V).length===0&&p.delete(k)}n.remove(R)}function P(R){const _=n.get(R);i.deleteTexture(_.__webglTexture);const k=R.source,V=p.get(k);delete V[_.__cacheKey],a.memory.textures--}function I(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let $=0;$<_.__webglFramebuffer[V].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[V][$]);else i.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)i.deleteFramebuffer(_.__webglFramebuffer[V]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=R.textures;for(let V=0,$=k.length;V<$;V++){const ae=n.get(k[V]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(k[V])}n.remove(R)}let D=0;function z(){D=0}function L(){return D}function O(R){D=R}function X(){const R=D;return R>=r.maxTextures&&Le("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+r.maxTextures),D+=1,R}function q(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function ie(R,_){const k=n.get(R);if(R.isVideoTexture&&F(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const V=R.image;if(V===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{te(k,R,_);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function Y(R,_){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){te(k,R,_);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function j(R,_){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){te(k,R,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function ee(R,_){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){ne(k,R,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}const Ce={[fa]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[da]:i.MIRRORED_REPEAT},ye={[St]:i.NEAREST,[Ku]:i.NEAREST_MIPMAP_NEAREST,[hr]:i.NEAREST_MIPMAP_LINEAR,[it]:i.LINEAR,[ys]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},Ke={[Qu]:i.NEVER,[ih]:i.ALWAYS,[ju]:i.LESS,[so]:i.LEQUAL,[eh]:i.EQUAL,[ao]:i.GEQUAL,[th]:i.GREATER,[nh]:i.NOTEQUAL};function He(R,_){if(_.type===tn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===it||_.magFilter===ys||_.magFilter===hr||_.magFilter===Yn||_.minFilter===it||_.minFilter===ys||_.minFilter===hr||_.minFilter===Yn)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Ce[_.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Ce[_.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Ce[_.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ye[_.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ye[_.minFilter]),_.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ke[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===St||_.minFilter!==hr&&_.minFilter!==Yn||_.type===tn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function We(R,_){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",w));const V=_.source;let $=p.get(V);$===void 0&&($={},p.set(V,$));const ae=q(_);if(ae!==R.__cacheKey){$[ae]===void 0&&($[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),$[ae].usedTimes++;const oe=$[R.__cacheKey];oe!==void 0&&($[R.__cacheKey].usedTimes--,oe.usedTimes===0&&P(_)),R.__cacheKey=ae,R.__webglTexture=$[ae].texture}return k}function K(R,_,k){return Math.floor(Math.floor(R/k)/_)}function C(R,_,k,V){const ae=R.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,V,_.data);else{ae.sort((we,fe)=>we.start-fe.start);let oe=0;for(let we=1;we<ae.length;we++){const fe=ae[oe],ce=ae[we],Ae=fe.start+fe.count,Pe=K(ce.start,_.width,4),Ne=K(fe.start,_.width,4);ce.start<=Ae+1&&Pe===Ne&&K(ce.start+ce.count-1,_.width,4)===Pe?fe.count=Math.max(fe.count,ce.start+ce.count-fe.start):(++oe,ae[oe]=ce)}ae.length=oe+1;const Z=t.getParameter(i.UNPACK_ROW_LENGTH),Q=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let we=0,fe=ae.length;we<fe;we++){const ce=ae[we],Ae=Math.floor(ce.start/4),Pe=Math.ceil(ce.count/4),Ne=Ae%_.width,N=Math.floor(Ae/_.width),ue=Pe,J=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ne,N,ue,J,k,V,_.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function te(R,_,k){let V=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=i.TEXTURE_3D);const $=We(R,_),ae=_.source;t.bindTexture(V,R.__webglTexture,i.TEXTURE0+k);const oe=n.get(ae);if(ae.version!==oe.__version||$===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const J=Xe.getPrimaries(Xe.workingColorSpace),he=_.colorSpace===Mn?null:Xe.getPrimaries(_.colorSpace),ge=_.colorSpace===Mn||J===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=m(_.image,!1,r.maxTextureSize);Q=At(_,Q);const le=s.convert(_.format,_.colorSpace),we=s.convert(_.type);let fe=v(_.internalFormat,le,we,_.normalized,_.colorSpace,_.isVideoTexture);He(V,_);let ce;const Ae=_.mipmaps,Pe=_.isVideoTexture!==!0,Ne=oe.__version===void 0||$===!0,N=ae.dataReady,ue=E(_,Q);if(_.isDepthTexture)fe=y(_.format===Fn,_.type),Ne&&(Pe?t.texStorage2D(i.TEXTURE_2D,1,fe,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,fe,Q.width,Q.height,0,le,we,null));else if(_.isDataTexture)if(Ae.length>0){Pe&&Ne&&t.texStorage2D(i.TEXTURE_2D,ue,fe,Ae[0].width,Ae[0].height);for(let J=0,he=Ae.length;J<he;J++)ce=Ae[J],Pe?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,ce.width,ce.height,le,we,ce.data):t.texImage2D(i.TEXTURE_2D,J,fe,ce.width,ce.height,0,le,we,ce.data);_.generateMipmaps=!1}else Pe?(Ne&&t.texStorage2D(i.TEXTURE_2D,ue,fe,Q.width,Q.height),N&&C(_,Q,le,we)):t.texImage2D(i.TEXTURE_2D,0,fe,Q.width,Q.height,0,le,we,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Pe&&Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,fe,Ae[0].width,Ae[0].height,Q.depth);for(let J=0,he=Ae.length;J<he;J++)if(ce=Ae[J],_.format!==$t)if(le!==null)if(Pe){if(N)if(_.layerUpdates.size>0){const ge=gl(ce.width,ce.height,_.format,_.type);for(const re of _.layerUpdates){const Re=ce.data.subarray(re*ge/ce.data.BYTES_PER_ELEMENT,(re+1)*ge/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,re,ce.width,ce.height,1,le,Re)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ce.width,ce.height,Q.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,fe,ce.width,ce.height,Q.depth,0,ce.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ce.width,ce.height,Q.depth,le,we,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,fe,ce.width,ce.height,Q.depth,0,le,we,ce.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Pe&&Ne&&t.texStorage2D(i.TEXTURE_2D,ue,fe,Ae[0].width,Ae[0].height);for(let J=0,he=Ae.length;J<he;J++)ce=Ae[J],_.format!==$t?le!==null?Pe?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,J,fe,ce.width,ce.height,0,ce.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,ce.width,ce.height,le,we,ce.data):t.texImage2D(i.TEXTURE_2D,J,fe,ce.width,ce.height,0,le,we,ce.data)}else if(_.isDataArrayTexture)if(Pe){if(Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,fe,Q.width,Q.height,Q.depth),N)if(_.layerUpdates.size>0){const J=gl(Q.width,Q.height,_.format,_.type);for(const he of _.layerUpdates){const ge=Q.data.subarray(he*J/Q.data.BYTES_PER_ELEMENT,(he+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,Q.width,Q.height,1,le,we,ge)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,we,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,fe,Q.width,Q.height,Q.depth,0,le,we,Q.data);else if(_.isData3DTexture)Pe?(Ne&&t.texStorage3D(i.TEXTURE_3D,ue,fe,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,we,Q.data)):t.texImage3D(i.TEXTURE_3D,0,fe,Q.width,Q.height,Q.depth,0,le,we,Q.data);else if(_.isFramebufferTexture){if(Ne)if(Pe)t.texStorage2D(i.TEXTURE_2D,ue,fe,Q.width,Q.height);else{let J=Q.width,he=Q.height;for(let ge=0;ge<ue;ge++)t.texImage2D(i.TEXTURE_2D,ge,fe,J,he,0,le,we,null),J>>=1,he>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),d.add(_),J.onpaint=he=>{const ge=he.changedElements;for(const re of d)ge.includes(re.image)&&(re.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const ge=i.RGBA,re=i.RGBA,Re=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ge,re,Re,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Pe&&Ne){const J=je(Ae[0]);t.texStorage2D(i.TEXTURE_2D,ue,fe,J.width,J.height)}for(let J=0,he=Ae.length;J<he;J++)ce=Ae[J],Pe?N&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le,we,ce):t.texImage2D(i.TEXTURE_2D,J,fe,le,we,ce);_.generateMipmaps=!1}else if(Pe){if(Ne){const J=je(Q);t.texStorage2D(i.TEXTURE_2D,ue,fe,J.width,J.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,we,Q)}else t.texImage2D(i.TEXTURE_2D,0,fe,le,we,Q);f(_)&&b(V),oe.__version=ae.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ne(R,_,k){if(_.image.length!==6)return;const V=We(R,_),$=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const ae=n.get($);if($.version!==ae.__version||V===!0){t.activeTexture(i.TEXTURE0+k);const oe=Xe.getPrimaries(Xe.workingColorSpace),Z=_.colorSpace===Mn?null:Xe.getPrimaries(_.colorSpace),Q=_.colorSpace===Mn||oe===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const le=_.isCompressedTexture||_.image[0].isCompressedTexture,we=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let re=0;re<6;re++)!le&&!we?fe[re]=m(_.image[re],!0,r.maxCubemapSize):fe[re]=we?_.image[re].image:_.image[re],fe[re]=At(_,fe[re]);const ce=fe[0],Ae=s.convert(_.format,_.colorSpace),Pe=s.convert(_.type),Ne=v(_.internalFormat,Ae,Pe,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,ue=ae.__version===void 0||V===!0,J=$.dataReady;let he=E(_,ce);He(i.TEXTURE_CUBE_MAP,_);let ge;if(le){N&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ne,ce.width,ce.height);for(let re=0;re<6;re++){ge=fe[re].mipmaps;for(let Re=0;Re<ge.length;Re++){const Ee=ge[Re];_.format!==$t?Ae!==null?N?J&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,0,0,Ee.width,Ee.height,Ae,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,Ne,Ee.width,Ee.height,0,Ee.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,0,0,Ee.width,Ee.height,Ae,Pe,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,Ne,Ee.width,Ee.height,0,Ae,Pe,Ee.data)}}}else{if(ge=_.mipmaps,N&&ue){ge.length>0&&he++;const re=je(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ne,re.width,re.height)}for(let re=0;re<6;re++)if(we){N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,fe[re].width,fe[re].height,Ae,Pe,fe[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ne,fe[re].width,fe[re].height,0,Ae,Pe,fe[re].data);for(let Re=0;Re<ge.length;Re++){const at=ge[Re].image[re].image;N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,0,0,at.width,at.height,Ae,Pe,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,Ne,at.width,at.height,0,Ae,Pe,at.data)}}else{N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ae,Pe,fe[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ne,Ae,Pe,fe[re]);for(let Re=0;Re<ge.length;Re++){const Ee=ge[Re];N?J&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,0,0,Ae,Pe,Ee.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,Ne,Ae,Pe,Ee.image[re])}}}f(_)&&b(i.TEXTURE_CUBE_MAP),ae.__version=$.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function se(R,_,k,V,$,ae){const oe=s.convert(k.format,k.colorSpace),Z=s.convert(k.type),Q=v(k.internalFormat,oe,Z,k.normalized,k.colorSpace),le=n.get(_),we=n.get(k);if(we.__renderTarget=_,!le.__hasExternalTextures){const fe=Math.max(1,_.width>>ae),ce=Math.max(1,_.height>>ae);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,ae,Q,fe,ce,_.depth,0,oe,Z,null):t.texImage2D($,ae,Q,fe,ce,0,oe,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,$,we.__webglTexture,0,ft(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,$,we.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(R,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),_.depthBuffer){const V=_.depthTexture,$=V&&V.isDepthTexture?V.type:null,ae=y(_.stencilBuffer,$),oe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;gt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft(_),ae,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft(_),ae,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ae,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,R)}else{const V=_.textures;for(let $=0;$<V.length;$++){const ae=V[$],oe=s.convert(ae.format,ae.colorSpace),Z=s.convert(ae.type),Q=v(ae.internalFormat,oe,Z,ae.normalized,ae.colorSpace);gt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft(_),Q,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft(_),Q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Q,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(R,_,k){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),He(i.TEXTURE_CUBE_MAP,_.depthTexture);const le=s.convert(_.depthTexture.format),we=s.convert(_.depthTexture.type);let fe;_.depthTexture.format===wn?fe=i.DEPTH_COMPONENT24:_.depthTexture.format===Fn&&(fe=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,fe,_.width,_.height,0,le,we,null)}}else ie(_.depthTexture,0);const ae=$.__webglTexture,oe=ft(_),Z=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,Q=_.depthTexture.format===Fn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===wn)gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,ae,0);else if(_.depthTexture.format===Fn)gt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function De(R){const _=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const V=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",$)};V.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=V}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let V=0;V<6;V++)ke(_.__webglFramebuffer[V],R,V);else{const V=R.texture.mipmaps;V&&V.length>0?ke(_.__webglFramebuffer[0],R,0):ke(_.__webglFramebuffer,R,0)}else if(k){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=i.createRenderbuffer(),Te(_.__webglDepthbuffer[V],R,!1);else{const $=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=_.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ae)}}else{const V=R.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Te(_.__webglDepthbuffer,R,!1);else{const $=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(R,_,k){const V=n.get(R);_!==void 0&&se(V.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&De(R)}function Qe(R){const _=R.texture,k=n.get(R),V=n.get(_);R.addEventListener("dispose",x);const $=R.textures,ae=R.isWebGLCubeRenderTarget===!0,oe=$.length>1;if(oe||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=_.version,a.memory.textures++),ae){k.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[Z]=[];for(let Q=0;Q<_.mipmaps.length;Q++)k.__webglFramebuffer[Z][Q]=i.createFramebuffer()}else k.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let Z=0;Z<_.mipmaps.length;Z++)k.__webglFramebuffer[Z]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(oe)for(let Z=0,Q=$.length;Z<Q;Z++){const le=n.get($[Z]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&gt(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<$.length;Z++){const Q=$[Z];k.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);const le=s.convert(Q.format,Q.colorSpace),we=s.convert(Q.type),fe=v(Q.internalFormat,le,we,Q.normalized,Q.colorSpace,R.isXRRenderTarget===!0),ce=ft(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,fe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Te(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),He(i.TEXTURE_CUBE_MAP,_);for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)se(k.__webglFramebuffer[Z][Q],R,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else se(k.__webglFramebuffer[Z],R,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);f(_)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let Z=0,Q=$.length;Z<Q;Z++){const le=$[Z],we=n.get(le);let fe=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(fe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,we.__webglTexture),He(fe,le),se(k.__webglFramebuffer,R,le,i.COLOR_ATTACHMENT0+Z,fe,0),f(le)&&b(fe)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,V.__webglTexture),He(Z,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)se(k.__webglFramebuffer[Q],R,_,i.COLOR_ATTACHMENT0,Z,Q);else se(k.__webglFramebuffer,R,_,i.COLOR_ATTACHMENT0,Z,0);f(_)&&b(Z),t.unbindTexture()}R.depthBuffer&&De(R)}function ze(R){const _=R.textures;for(let k=0,V=_.length;k<V;k++){const $=_[k];if(f($)){const ae=A(R),oe=n.get($).__webglTexture;t.bindTexture(ae,oe),b(ae),t.unbindTexture()}}}const ut=[],bt=[];function Ut(R){if(R.samples>0){if(gt(R)===!1){const _=R.textures,k=R.width,V=R.height;let $=i.COLOR_BUFFER_BIT;const ae=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(R),Z=_.length>1;if(Z)for(let le=0;le<_.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const Q=R.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<_.length;le++){if(R.resolveDepthBuffer&&(R.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const we=n.get(_[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,we,0)}i.blitFramebuffer(0,0,k,V,0,0,k,V,$,i.NEAREST),l===!0&&(ut.length=0,bt.length=0,ut.push(i.COLOR_ATTACHMENT0+le),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ut.push(ae),bt.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,bt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let le=0;le<_.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const we=n.get(_[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,we,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const _=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ft(R){return Math.min(r.maxSamples,R.samples)}function gt(R){const _=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function F(R){const _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function At(R,_){const k=R.colorSpace,V=R.format,$=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==ir&&k!==Mn&&(Xe.getTransfer(k)===et?(V!==$t||$!==Ft)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",k)),_}function je(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=z,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=ie,this.setTexture2DArray=Y,this.setTexture3D=j,this.setTextureCube=ee,this.rebindTextures=Fe,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=se,this.useMultisampledRTT=gt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ig(i,e){function t(n,r=Mn){let s;const a=Xe.getTransfer(r);if(n===Ft)return i.UNSIGNED_BYTE;if(n===eo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===to)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_c)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===mc)return i.BYTE;if(n===gc)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===ja)return i.INT;if(n===hn)return i.UNSIGNED_INT;if(n===tn)return i.FLOAT;if(n===fn)return i.HALF_FLOAT;if(n===xc)return i.ALPHA;if(n===Mc)return i.RGB;if(n===$t)return i.RGBA;if(n===wn)return i.DEPTH_COMPONENT;if(n===Fn)return i.DEPTH_STENCIL;if(n===fs)return i.RED;if(n===no)return i.RED_INTEGER;if(n===Zn)return i.RG;if(n===io)return i.RG_INTEGER;if(n===ro)return i.RGBA_INTEGER;if(n===qr||n===Yr||n===Kr||n===$r)if(a===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Yr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Yr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$r)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===pa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ma)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===xa||n===Ma||n===Sa||n===ya||n===jr||n===Ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===va||n===xa)return a===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ma)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Sa)return s.COMPRESSED_R11_EAC;if(n===ya)return s.COMPRESSED_SIGNED_R11_EAC;if(n===jr)return s.COMPRESSED_RG11_EAC;if(n===Ea)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ba||n===Ta||n===wa||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ba)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ta)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Aa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ra)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ca)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===La)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Da)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ia)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ua)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Na)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ba||n===za||n===ka)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ba)return a===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ka)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ha||n===Ga||n===es||n===Va)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ha)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ga)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===es)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Va)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sg=`
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

}`;class ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Cc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Mt({vertexShader:rg,fragmentShader:sg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class og extends Qn{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const M=typeof XRWebGLBinding<"u",m=new ag,f={},b=t.getContextAttributes();let A=null,v=null;const y=[],E=[],w=new Se;let x=null,T=null;const P=new qt;P.viewport=new rt;const I=new qt;I.viewport=new rt;const D=[P,I],z=new pf;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let C=y[K];return C===void 0&&(C=new Cs,y[K]=C),C.getTargetRaySpace()},this.getControllerGrip=function(K){let C=y[K];return C===void 0&&(C=new Cs,y[K]=C),C.getGripSpace()},this.getHand=function(K){let C=y[K];return C===void 0&&(C=new Cs,y[K]=C),C.getHandSpace()};function X(K){const C=E.indexOf(K.inputSource);if(C===-1)return;const te=y[C];te!==void 0&&(te.update(K.inputSource,K.frame,c||a),te.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",ie);for(let K=0;K<y.length;K++){const C=E[K];C!==null&&(E[K]=null,y[K].disconnect(C))}L=null,O=null,m.reset();for(const K in f)delete f[K];if(e.setRenderTarget(A),p=null,u=null,d=null,r=null,v=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(w.width,w.height,!1),T!==null){const K=T.camera;K.fov=T.fov,K.zoom=T.zoom,K.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",q),r.addEventListener("inputsourceschange",ie),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(w),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,ne=null,se=null;b.depth&&(se=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=b.stencil?Fn:wn,ne=b.stencil?Pi:hn);const Te={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Te),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new Gt(u.textureWidth,u.textureHeight,{format:$t,type:Ft,depthTexture:new Li(u.textureWidth,u.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Gt(p.framebufferWidth,p.framebufferHeight,{format:$t,type:Ft,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),We.setContext(r),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(K){for(let C=0;C<K.removed.length;C++){const te=K.removed[C],ne=E.indexOf(te);ne>=0&&(E[ne]=null,y[ne].disconnect(te))}for(let C=0;C<K.added.length;C++){const te=K.added[C];let ne=E.indexOf(te);if(ne===-1){for(let Te=0;Te<y.length;Te++)if(Te>=E.length){E.push(te),ne=Te;break}else if(E[Te]===null){E[Te]=te,ne=Te;break}if(ne===-1)break}const se=y[ne];se&&se.connect(te)}}const Y=new B,j=new B;function ee(K,C,te){Y.setFromMatrixPosition(C.matrixWorld),j.setFromMatrixPosition(te.matrixWorld);const ne=Y.distanceTo(j),se=C.projectionMatrix.elements,Te=te.projectionMatrix.elements,ke=se[14]/(se[10]-1),De=se[14]/(se[10]+1),Fe=(se[9]+1)/se[5],Qe=(se[9]-1)/se[5],ze=(se[8]-1)/se[0],ut=(Te[8]+1)/Te[0],bt=ke*ze,Ut=ke*ut,ft=ne/(-ze+ut),gt=ft*-ze;if(C.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(gt),K.translateZ(ft),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),se[10]===-1)K.projectionMatrix.copy(C.projectionMatrix),K.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{const F=ke+ft,At=De+ft,je=bt-gt,R=Ut+(ne-gt),_=Fe*De/At*F,k=Qe*De/At*F;K.projectionMatrix.makePerspective(je,R,_,k,F,At),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ce(K,C){C===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(C.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let C=K.near,te=K.far;m.texture!==null&&(m.depthNear>0&&(C=m.depthNear),m.depthFar>0&&(te=m.depthFar)),z.near=I.near=P.near=C,z.far=I.far=P.far=te,(L!==z.near||O!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),L=z.near,O=z.far),z.layers.mask=K.layers.mask|6,P.layers.mask=z.layers.mask&-5,I.layers.mask=z.layers.mask&-3;const ne=K.parent,se=z.cameras;Ce(z,ne);for(let Te=0;Te<se.length;Te++)Ce(se[Te],ne);se.length===2?ee(z,P,I):z.projectionMatrix.copy(P.projectionMatrix),T===null&&K.isPerspectiveCamera&&(T={camera:K,fov:K.fov,zoom:K.zoom}),ye(K,z,ne)};function ye(K,C,te){te===null?K.matrix.copy(C.matrixWorld):(K.matrix.copy(te.matrixWorld),K.matrix.invert(),K.matrix.multiply(C.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(C.projectionMatrix),K.projectionMatrixInverse.copy(C.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=sr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return f[K]};let Ke=null;function He(K,C){if(h=C.getViewerPose(c||a),g=C,h!==null){const te=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ne=!1;te.length!==z.cameras.length&&(z.cameras.length=0,ne=!0);for(let De=0;De<te.length;De++){const Fe=te[De];let Qe=null;if(p!==null)Qe=p.getViewport(Fe);else{const ut=d.getViewSubImage(u,Fe);Qe=ut.viewport,De===0&&(e.setRenderTargetTextures(v,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(v))}let ze=D[De];ze===void 0&&(ze=new qt,ze.layers.enable(De),ze.viewport=new rt,D[De]=ze),ze.matrix.fromArray(Fe.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Fe.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),De===0&&(z.matrix.copy(ze.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ne===!0&&z.cameras.push(ze)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){d=n.getBinding();const De=d.getDepthInformation(te[0]);De&&De.isValid&&De.texture&&m.init(De,r.renderState)}if(se&&se.includes("camera-access")&&M){e.state.unbindTexture(),d=n.getBinding();for(let De=0;De<te.length;De++){const Fe=te[De].camera;if(Fe){let Qe=f[Fe];Qe||(Qe=new Cc,f[Fe]=Qe);const ze=d.getCameraImage(Fe);Qe.sourceTexture=ze}}}}for(let te=0;te<y.length;te++){const ne=E[te],se=y[te];ne!==null&&se!==void 0&&se.update(ne,C,c||a)}Ke&&Ke(K,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),g=null}const We=new Uc;We.setAnimationLoop(He),this.setAnimationLoop=function(K){Ke=K},this.dispose=function(){}}}const lg=new Je,Hc=new Ue;Hc.set(-1,0,0,0,1,0,0,0,1);function cg(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Pc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,b,A,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),M(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,b,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ot&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ot&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=e.get(f),A=b.envMap,v=b.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Hc),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ot&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){const b=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function ug(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const E=y.program;n.uniformBlockBinding(v,E)}function c(v,y){let E=r[v.id];E===void 0&&(m(v),E=h(v),r[v.id]=E,v.addEventListener("dispose",b));const w=y.program;n.updateUBOMapping(v,w);const x=e.render.frame;s[v.id]!==x&&(u(v),s[v.id]=x)}function h(v){const y=d();v.__bindingPointIndex=y;const E=i.createBuffer(),w=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,w,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const y=r[v.id],E=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let x=0,T=E.length;x<T;x++){const P=E[x];if(Array.isArray(P))for(let I=0,D=P.length;I<D;I++)p(P[I],x,I,w);else p(P,x,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,y,E,w){if(M(v,y,E,w)===!0){const x=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let I=0;I<T.length;I++){const D=T[I],z=f(D);g(D,v.__data,P),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function g(v,y,E){typeof v=="number"||typeof v=="boolean"?y[0]=v:v.isMatrix3?(y[0]=v.elements[0],y[1]=v.elements[1],y[2]=v.elements[2],y[3]=0,y[4]=v.elements[3],y[5]=v.elements[4],y[6]=v.elements[5],y[7]=0,y[8]=v.elements[6],y[9]=v.elements[7],y[10]=v.elements[8],y[11]=0):ArrayBuffer.isView(v)?y.set(new v.constructor(v.buffer,v.byteOffset,y.length)):v.toArray(y,E)}function M(v,y,E,w){const x=v.value,T=y+"_"+E;if(w[T]===void 0)return typeof x=="number"||typeof x=="boolean"?w[T]=x:ArrayBuffer.isView(x)?w[T]=x.slice():w[T]=x.clone(),!0;{const P=w[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return w[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(v){const y=v.uniforms;let E=0;const w=16;for(let T=0,P=y.length;T<P;T++){const I=Array.isArray(y[T])?y[T]:[y[T]];for(let D=0,z=I.length;D<z;D++){const L=I[D],O=Array.isArray(L.value)?L.value:[L.value];for(let X=0,q=O.length;X<q;X++){const ie=O[X],Y=f(ie),j=E%w,ee=j%Y.boundary,Ce=j+ee;E+=ee,Ce!==0&&w-Ce<Y.storage&&(E+=w-Ce),L.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=Y.storage}}}const x=E%w;return x>0&&(E+=w-x),v.__size=E,v.__cache={},this}function f(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",v),y}function b(v){const y=v.target;y.removeEventListener("dispose",b);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function A(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:A}}const hg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let an=null;function fg(){return an===null&&(an=new ar(hg,16,16,Zn,fn),an.name="DFG_LUT",an.minFilter=it,an.magFilter=it,an.wrapS=yn,an.wrapT=yn,an.generateMipmaps=!1,an.needsUpdate=!0),an}class dg{constructor(e={}){const{canvas:t=sh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Ft}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const M=p,m=new Set([ro,io,no]),f=new Set([Ft,hn,nr,Pi,eo,to]),b=new Uint32Array(4),A=new Int32Array(4),v=new B;let y=null,E=null;const w=[],x=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,D=null,z=null,L=null,O=null;this._outputColorSpace=Xt;let X=0,q=0,ie=null,Y=-1,j=null;const ee=new rt,Ce=new rt;let ye=null;const Ke=new Ie(0);let He=0,We=t.width,K=t.height,C=1,te=null,ne=null;const se=new rt(0,0,We,K),Te=new rt(0,0,We,K);let ke=!1;const De=new uo;let Fe=!1,Qe=!1;const ze=new Je,ut=new B,bt=new rt,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function gt(){return ie===null?C:1}let F=n;function At(S,U){return t.getContext(S,U)}let je,R,_,k,V,$,ae,oe,Z,Q,le,we,fe,ce,Ae,Pe,Ne,N,ue,J,he,ge,re;try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qa}`),t.addEventListener("webglcontextlost",at,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",Zt,!1),F===null){const U="webgl2";if(F=At(U,S),F===null)throw At(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Re()}catch(S){throw t.removeEventListener("webglcontextlost",at,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Zt,!1),qe("WebGLRenderer: "+S.message),S}function Re(){je=new fm(F),je.init(),he=new ig(F,je),R=new nm(F,je,e,he),_=new tg(F,je),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),z=F.createFramebuffer(),L=F.createFramebuffer(),O=F.createFramebuffer(),k=new mm(F),V=new H0,$=new ng(F,je,_,V,R,he,k),ae=new hm(P),oe=new _f(F),ge=new em(F,oe),Z=new dm(F,oe,k,ge),Q=new _m(F,Z,oe,ge,k),N=new gm(F,R,$),Ae=new im(V),le=new k0(P,ae,je,R,ge,Ae),we=new cg(P,V),fe=new V0,ce=new $0(je),Ne=new jp(P,ae,_,Q,g,l),Pe=new eg(P,Q,R),re=new ug(F,k,R,_),ue=new tm(F,je,k),J=new pm(F,je,k),k.programs=le.programs,P.capabilities=R,P.extensions=je,P.properties=V,P.renderLists=fe,P.shadowMap=Pe,P.state=_,P.info=k}M!==Ft&&(T=new xm(M,t.width,t.height,o,r,s));const Ee=new og(P,F);this.xr=Ee,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return C},this.setPixelRatio=function(S){S!==void 0&&(C=S,this.setSize(We,K,!1))},this.getSize=function(S){return S.set(We,K)},this.setSize=function(S,U,W=!0){if(Ee.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}We=S,K=U,t.width=Math.floor(S*C),t.height=Math.floor(U*C),W===!0&&(t.style.width=S+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(We*C,K*C).floor()},this.setDrawingBufferSize=function(S,U,W){We=S,K=U,C=W,t.width=Math.floor(S*W),t.height=Math.floor(U*W),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(M===Ft){qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ee)},this.getViewport=function(S){return S.copy(se)},this.setViewport=function(S,U,W,H){S.isVector4?se.set(S.x,S.y,S.z,S.w):se.set(S,U,W,H),_.viewport(ee.copy(se).multiplyScalar(C).round())},this.getScissor=function(S){return S.copy(Te)},this.setScissor=function(S,U,W,H){S.isVector4?Te.set(S.x,S.y,S.z,S.w):Te.set(S,U,W,H),_.scissor(Ce.copy(Te).multiplyScalar(C).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(S){_.setScissorTest(ke=S)},this.setOpaqueSort=function(S){te=S},this.setTransparentSort=function(S){ne=S},this.getClearColor=function(S){return S.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,W=!0){let H=0;if(S){let G=!1;if(ie!==null){const me=ie.texture.format;G=m.has(me)}if(G){const me=ie.texture.type,ve=f.has(me),pe=Ne.getClearColor(),xe=Ne.getClearAlpha(),be=pe.r,Oe=pe.g,Ge=pe.b;ve?(b[0]=be,b[1]=Oe,b[2]=Ge,b[3]=xe,F.clearBufferuiv(F.COLOR,0,b)):(A[0]=be,A[1]=Oe,A[2]=Ge,A[3]=xe,F.clearBufferiv(F.COLOR,0,A))}else H|=F.COLOR_BUFFER_BIT}U&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),D=S},this.dispose=function(){t.removeEventListener("webglcontextlost",at,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Zt,!1),Ne.dispose(),fe.dispose(),ce.dispose(),V.dispose(),ae.dispose(),Q.dispose(),ge.dispose(),re.dispose(),le.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",mo),Ee.removeEventListener("sessionend",go),zn.stop()};function at(S){S.preventDefault(),is("WebGLRenderer: Context Lost."),I=!0}function $e(){is("WebGLRenderer: Context Restored."),I=!1;const S=k.autoReset,U=Pe.enabled,W=Pe.autoUpdate,H=Pe.needsUpdate,G=Pe.type;Re(),k.autoReset=S,Pe.enabled=U,Pe.autoUpdate=W,Pe.needsUpdate=H,Pe.type=G}function Zt(S){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function nn(S){const U=S.target;U.removeEventListener("dispose",nn),eu(U)}function eu(S){tu(S),V.remove(S)}function tu(S){const U=V.get(S).programs;U!==void 0&&(U.forEach(function(W){le.releaseProgram(W)}),S.isShaderMaterial&&le.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,W,H,G,me){U===null&&(U=Ut);const ve=G.isMesh&&G.matrixWorld.determinantAffine()<0,pe=ru(S,U,W,H,G);_.setMaterial(H,ve);let xe=W.index,be=1;if(H.wireframe===!0){if(xe=Z.getWireframeAttribute(W),xe===void 0)return;be=2}const Oe=W.drawRange,Ge=W.attributes.position;let Me=Oe.start*be,Ze=(Oe.start+Oe.count)*be;me!==null&&(Me=Math.max(Me,me.start*be),Ze=Math.min(Ze,(me.start+me.count)*be)),xe!==null?(Me=Math.max(Me,0),Ze=Math.min(Ze,xe.count)):Ge!=null&&(Me=Math.max(Me,0),Ze=Math.min(Ze,Ge.count));const _t=Ze-Me;if(_t<0||_t===1/0)return;ge.setup(G,H,pe,W,xe);let ct,st=ue;if(xe!==null&&(ct=oe.get(xe),st=J,st.setIndex(ct)),G.isMesh)H.wireframe===!0?(_.setLineWidth(H.wireframeLinewidth*gt()),st.setMode(F.LINES)):st.setMode(F.TRIANGLES);else if(G.isLine){let Rt=H.linewidth;Rt===void 0&&(Rt=1),_.setLineWidth(Rt*gt()),G.isLineSegments?st.setMode(F.LINES):G.isLineLoop?st.setMode(F.LINE_LOOP):st.setMode(F.LINE_STRIP)}else G.isPoints?st.setMode(F.POINTS):G.isSprite&&st.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(je.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Rt=G._multiDrawStarts,_e=G._multiDrawCounts,Lt=G._multiDrawCount,Ye=xe?oe.get(xe).bytesPerElement:1,Vt=V.get(H).currentProgram.getUniforms();for(let rn=0;rn<Lt;rn++)Vt.setValue(F,"_gl_DrawID",rn),st.render(Rt[rn]/Ye,_e[rn])}else if(G.isInstancedMesh)st.renderInstances(Me,_t,G.count);else if(W.isInstancedBufferGeometry){const Rt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,_e=Math.min(W.instanceCount,Rt);st.renderInstances(Me,_t,_e)}else st.render(Me,_t)};function po(S,U,W,H){D!==null&&S.isNodeMaterial&&D.setObject(H,S),Fe===!0&&Ae.setState(S,W,!1),S.transparent===!0&&S.side===Yt&&S.forceSinglePass===!1?(S.side=Ot,S.needsUpdate=!0,cr(S,U,H),S.side=Kn,S.needsUpdate=!0,cr(S,U,H),S.side=Yt):cr(S,U,H)}this.compile=function(S,U,W=null){W===null&&(W=S),D!==null&&D.renderStart(S,U,W),E=ce.get(W),E.init(U),x.push(E),W.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),S!==W&&S.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),E.setupLights(),D!==null&&D.updateLights(E.state.lightsArray),Qe=this.localClippingEnabled,Fe=Ae.init(this.clippingPlanes,Qe),Fe===!0&&Ae.setGlobalState(this.clippingPlanes,U),D!==null&&Pe.render(E.state.shadowsArray,W,U);const H=new Set;return S.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const me=G.material;if(me)if(Array.isArray(me))for(let ve=0;ve<me.length;ve++){const pe=me[ve];po(pe,W,U,G),H.add(pe)}else po(me,W,U,G),H.add(me)}),E=x.pop(),D!==null&&D.renderEnd(),H},this.compileAsync=function(S,U,W=null){const H=this.compile(S,U,W);return new Promise(G=>{function me(){if(H.forEach(function(ve){const xe=V.get(ve).currentProgram;(xe===void 0||xe.isReady())&&H.delete(ve)}),H.size===0){G(S);return}setTimeout(me,10)}je.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let _s=null;function nu(S){_s&&_s(S)}function mo(){zn.stop()}function go(){zn.start()}const zn=new Uc;zn.setAnimationLoop(nu),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(S){_s=S,Ee.setAnimationLoop(S),S===null?zn.stop():zn.start()},Ee.addEventListener("sessionstart",mo),Ee.addEventListener("sessionend",go),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;D!==null&&D.renderStart(S,U);const W=Ee.enabled===!0&&Ee.isPresenting===!0,H=T!==null&&(ie===null||W)&&T.begin(P,ie);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(U),U=Ee.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,U,ie),E=ce.get(S,x.length),E.init(U),E.state.textureUnits=$.getTextureUnits(),x.push(E),ze.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),De.setFromProjectionMatrix(ze,cn,U.reversedDepth),Qe=this.localClippingEnabled,Fe=Ae.init(this.clippingPlanes,Qe),y=fe.get(S,w.length),y.init(),w.push(y),Ee.enabled===!0&&Ee.isPresenting===!0){const ve=P.xr.getDepthSensingMesh();ve!==null&&vs(ve,U,-1/0,P.sortObjects)}vs(S,U,0,P.sortObjects),y.finish(),D!==null&&D.updateLights(E.state.lightsArray),P.sortObjects===!0&&y.sort(te,ne),ft=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,ft&&Ne.addToRenderList(y,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Ae.beginShadows();const G=E.state.shadowsArray;if(Pe.render(G,S,U),Fe===!0&&Ae.endShadows(),(H&&T.hasRenderPass())===!1){const ve=y.opaque,pe=y.transmissive;if(E.setupLights(),U.isArrayCamera){const xe=U.cameras;if(pe.length>0)for(let be=0,Oe=xe.length;be<Oe;be++){const Ge=xe[be];vo(ve,pe,S,Ge)}ft&&Ne.render(S);for(let be=0,Oe=xe.length;be<Oe;be++){const Ge=xe[be];_o(y,S,Ge,Ge.viewport)}}else pe.length>0&&vo(ve,pe,S,U),ft&&Ne.render(S),_o(y,S,U)}ie!==null&&q===0&&($.updateMultisampleRenderTarget(ie),$.updateRenderTargetMipmap(ie)),H&&T.end(P),S.isScene===!0&&S.onAfterRender(P,S,U),ge.resetDefaultState(),Y=-1,j=null,x.pop(),x.length>0?(E=x[x.length-1],$.setTextureUnits(E.state.textureUnits),Fe===!0&&Ae.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?y=w[w.length-1]:y=null,D!==null&&D.renderEnd()};function vs(S,U,W,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(De)){H&&bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ze);const ve=Q.update(S),pe=S.material;pe.visible&&y.push(S,ve,pe,W,bt.z,null,U)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(De))){const ve=Q.update(S),pe=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),bt.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),bt.copy(ve.boundingSphere.center)),bt.applyMatrix4(S.matrixWorld).applyMatrix4(ze)),Array.isArray(pe)){const xe=ve.groups;for(let be=0,Oe=xe.length;be<Oe;be++){const Ge=xe[be],Me=pe[Ge.materialIndex];Me&&Me.visible&&y.push(S,ve,Me,W,bt.z,Ge,U)}}else pe.visible&&y.push(S,ve,pe,W,bt.z,null,U)}}const me=S.children;for(let ve=0,pe=me.length;ve<pe;ve++)vs(me[ve],U,W,H)}function _o(S,U,W,H){const{opaque:G,transmissive:me,transparent:ve}=S;E.setupLightsView(W),Fe===!0&&Ae.setGlobalState(P.clippingPlanes,W),H&&_.viewport(ee.copy(H)),G.length>0&&lr(G,U,W),me.length>0&&lr(me,U,W),ve.length>0&&lr(ve,U,W),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function vo(S,U,W,H){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){const Me=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new Gt(1,1,{generateMipmaps:!0,type:Me?fn:Ft,minFilter:Yn,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const me=E.state.transmissionRenderTarget[H.id],ve=H.viewport||ee;me.setSize(ve.z*P.transmissionResolutionScale,ve.w*P.transmissionResolutionScale);const pe=P.getRenderTarget(),xe=P.getActiveCubeFace(),be=P.getActiveMipmapLevel();P.setRenderTarget(me),P.getClearColor(Ke),He=P.getClearAlpha(),He<1&&P.setClearColor(16777215,.5),P.clear(),ft&&Ne.render(W);const Oe=P.toneMapping;P.toneMapping=un;const Ge=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),Fe===!0&&Ae.setGlobalState(P.clippingPlanes,H),lr(S,W,H),$.updateMultisampleRenderTarget(me),$.updateRenderTargetMipmap(me),je.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let Ze=0,_t=U.length;Ze<_t;Ze++){const ct=U[Ze],{object:st,geometry:Rt,material:_e,group:Lt}=ct;if(_e.side===Yt&&st.layers.test(H.layers)){const Ye=_e.side;_e.side=Ot,_e.needsUpdate=!0,xo(st,W,H,Rt,_e,Lt),_e.side=Ye,_e.needsUpdate=!0,Me=!0}}Me===!0&&($.updateMultisampleRenderTarget(me),$.updateRenderTargetMipmap(me))}P.setRenderTarget(pe,xe,be),P.setClearColor(Ke,He),Ge!==void 0&&(H.viewport=Ge),P.toneMapping=Oe}function lr(S,U,W){const H=U.isScene===!0?U.overrideMaterial:null;for(let G=0,me=S.length;G<me;G++){const ve=S[G],{object:pe,geometry:xe,group:be}=ve;let Oe=ve.material;Oe.allowOverride===!0&&H!==null&&(Oe=H),pe.layers.test(W.layers)&&xo(pe,U,W,xe,Oe,be)}}function xo(S,U,W,H,G,me){D!==null&&G.isNodeMaterial&&D.setObject(S,G),S.onBeforeRender(P,U,W,H,G,me),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),G.onBeforeRender(P,U,W,H,S,me),G.transparent===!0&&G.side===Yt&&G.forceSinglePass===!1?(G.side=Ot,G.needsUpdate=!0,P.renderBufferDirect(W,U,H,G,S,me),G.side=Kn,G.needsUpdate=!0,P.renderBufferDirect(W,U,H,G,S,me),G.side=Yt):P.renderBufferDirect(W,U,H,G,S,me),S.onAfterRender(P,U,W,H,G,me)}function cr(S,U,W){U.isScene!==!0&&(U=Ut);const H=V.get(S),G=E.state.lights,me=E.state.shadowsArray,ve=G.state.version,pe=le.getParameters(S,G.state,me,U,W,E.state.lightProbeGridArray),xe=le.getProgramCacheKey(pe);let be=H.programs;H.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const Oe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;H.envMap=ae.get(S.envMap||H.environment,Oe),H.envMapRotation=H.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,be===void 0&&(S.addEventListener("dispose",nn),be=new Map,H.programs=be);let Ge=be.get(xe);if(Ge!==void 0){if(H.currentProgram===Ge&&H.lightsStateVersion===ve)return So(S,pe),Ge}else pe.uniforms=le.getUniforms(S),D!==null&&S.isNodeMaterial&&D.build(S,W,pe),S.onBeforeCompile(pe,P),Ge=le.acquireProgram(pe,xe),be.set(xe,Ge),H.uniforms=pe.uniforms;const Me=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Me.clippingPlanes=Ae.uniform),So(S,pe),H.needsLights=au(S),H.lightsStateVersion=ve,H.needsLights&&(Me.ambientLightColor.value=G.state.ambient,Me.lightProbe.value=G.state.probe,Me.sunLights.value=G.state.sun,Me.sunLightShadows.value=G.state.sunShadow,Me.directionalLights.value=G.state.directional,Me.directionalLightShadows.value=G.state.directionalShadow,Me.spotLights.value=G.state.spot,Me.spotLightShadows.value=G.state.spotShadow,Me.rectAreaLights.value=G.state.rectArea,Me.ltc_1.value=G.state.rectAreaLTC1,Me.ltc_2.value=G.state.rectAreaLTC2,Me.pointLights.value=G.state.point,Me.pointLightShadows.value=G.state.pointShadow,Me.hemisphereLights.value=G.state.hemi,Me.sunShadowMatrix.value=G.state.sunShadowMatrix,Me.sunShadowCascade.value=G.state.sunShadowCascade,Me.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Me.spotLightMatrix.value=G.state.spotLightMatrix,Me.spotLightMap.value=G.state.spotLightMap,Me.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=Ge,H.uniformsList=null,Ge}function Mo(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Zr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function So(S,U){const W=V.get(S);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function iu(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;v.setFromMatrixPosition(U.matrixWorld);for(let W=0,H=S.length;W<H;W++){const G=S[W];if(G.texture!==null&&G.boundingBox.containsPoint(v))return G}return null}function ru(S,U,W,H,G){U.isScene!==!0&&(U=Ut),$.resetTextureUnits();const me=U.fog,ve=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,pe=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Xe.workingColorSpace,xe=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,be=ae.get(H.envMap||ve,xe),Oe=H.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ge=!!W.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Me=!!W.morphAttributes.position,Ze=!!W.morphAttributes.normal,_t=!!W.morphAttributes.color;let ct=un;H.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ct=P.toneMapping);const st=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Rt=st!==void 0?st.length:0,_e=V.get(H),Lt=E.state.lights;if(Fe===!0&&(Qe===!0||S!==j)){const ot=S===j&&H.id===Y;Ae.setState(H,S,ot)}let Ye=!1;H.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Lt.state.version||_e.outputColorSpace!==pe||G.isBatchedMesh&&_e.batching===!1||!G.isBatchedMesh&&_e.batching===!0||G.isBatchedMesh&&_e.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&_e.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&_e.instancing===!1||!G.isInstancedMesh&&_e.instancing===!0||G.isSkinnedMesh&&_e.skinning===!1||!G.isSkinnedMesh&&_e.skinning===!0||G.isInstancedMesh&&_e.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_e.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_e.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_e.instancingMorph===!1&&G.morphTexture!==null||_e.envMap!==be||H.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ae.numPlanes||_e.numIntersection!==Ae.numIntersection)||_e.vertexAlphas!==Oe||_e.vertexTangents!==Ge||_e.morphTargets!==Me||_e.morphNormals!==Ze||_e.morphColors!==_t||_e.toneMapping!==ct||_e.morphTargetsCount!==Rt||!!_e.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,_e.__version=H.version);let Vt=_e.currentProgram;Ye===!0&&(Vt=cr(H,U,G),D&&H.isNodeMaterial&&D.onUpdateProgram(H,Vt,_e));let rn=!1,An=!1,ni=!1;const nt=Vt.getUniforms(),pt=_e.uniforms;if(_.useProgram(Vt.program)&&(rn=!0,An=!0,ni=!0),H.id!==Y&&(Y=H.id,An=!0),_e.needsLights){const ot=iu(E.state.lightProbeGridArray,G);_e.lightProbeGrid!==ot&&(_e.lightProbeGrid=ot,An=!0)}if(rn||j!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),nt.setValue(F,"projectionMatrix",S.projectionMatrix),nt.setValue(F,"viewMatrix",S.matrixWorldInverse);const Cn=nt.map.cameraPosition;Cn!==void 0&&Cn.setValue(F,ut.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&nt.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&nt.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),j!==S&&(j=S,An=!0,ni=!0)}if(_e.needsLights&&(Lt.state.sunShadowMap.length>0&&nt.setValue(F,"sunShadowMap",Lt.state.sunShadowMap,$),Lt.state.directionalShadowMap.length>0&&nt.setValue(F,"directionalShadowMap",Lt.state.directionalShadowMap,$),Lt.state.spotShadowMap.length>0&&nt.setValue(F,"spotShadowMap",Lt.state.spotShadowMap,$),Lt.state.pointShadowMap.length>0&&nt.setValue(F,"pointShadowMap",Lt.state.pointShadowMap,$)),G.isSkinnedMesh){nt.setOptional(F,G,"bindMatrix"),nt.setOptional(F,G,"bindMatrixInverse");const ot=G.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),nt.setValue(F,"boneTexture",ot.boneTexture,$))}G.isBatchedMesh&&(nt.setOptional(F,G,"batchingTexture"),nt.setValue(F,"batchingTexture",G._matricesTexture,$),nt.setOptional(F,G,"batchingIdTexture"),nt.setValue(F,"batchingIdTexture",G._indirectTexture,$),nt.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&nt.setValue(F,"batchingColorTexture",G._colorsTexture,$));const Rn=W.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&N.update(G,W,Vt),(An||_e.receiveShadow!==G.receiveShadow)&&(_e.receiveShadow=G.receiveShadow,nt.setValue(F,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(pt.envMapIntensity.value=U.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=fg()),An){if(nt.setValue(F,"toneMappingExposure",P.toneMappingExposure),_e.needsLights&&su(pt,ni),me&&H.fog===!0&&we.refreshFogUniforms(pt,me),we.refreshMaterialUniforms(pt,H,C,K,E.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){const ot=_e.lightProbeGrid;pt.probesSH.value=ot.texture,pt.probesMin.value.copy(ot.boundingBox.min),pt.probesMax.value.copy(ot.boundingBox.max),pt.probesResolution.value.copy(ot.resolution)}Zr.upload(F,Mo(_e),pt,$)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Zr.upload(F,Mo(_e),pt,$),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&nt.setValue(F,"center",G.center),nt.setValue(F,"modelViewMatrix",G.modelViewMatrix),nt.setValue(F,"normalMatrix",G.normalMatrix),nt.setValue(F,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const ot=H.uniformsGroups;for(let Cn=0,ii=ot.length;Cn<ii;Cn++){const Eo=ot[Cn];re.update(Eo,Vt),re.bind(Eo,Vt)}}return Vt}function su(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.sunLights.needsUpdate=U,S.sunLightShadows.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function au(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(S,U,W){const H=V.get(S);H.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=U,V.get(S.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:W,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const W=V.get(S);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,W=0){ie=S,X=U,q=W;let H=null,G=!1,me=!1;if(S){const pe=V.get(S);if(pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(F.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(S.viewport),Ce.copy(S.scissor),ye=S.scissorTest,_.viewport(ee),_.scissor(Ce),_.setScissorTest(ye),Y=-1;return}else if(pe.__webglFramebuffer===void 0)$.setupRenderTarget(S);else if(pe.__hasExternalTextures)$.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Oe=S.depthTexture;if(pe.__boundDepthTexture!==Oe){if(Oe!==null&&V.has(Oe)&&(S.width!==Oe.image.width||S.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(S)}}const xe=S.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(me=!0);const be=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(be[U])?H=be[U][W]:H=be[U],G=!0):S.samples>0&&$.useMultisampledRTT(S)===!1?H=V.get(S).__webglMultisampledFramebuffer:Array.isArray(be)?H=be[W]:H=be,ee.copy(S.viewport),Ce.copy(S.scissor),ye=S.scissorTest}else ee.copy(se).multiplyScalar(C).floor(),Ce.copy(Te).multiplyScalar(C).floor(),ye=ke;if(W!==0&&(H=z),_.bindFramebuffer(F.FRAMEBUFFER,H)&&_.drawBuffers(S,H),_.viewport(ee),_.scissor(Ce),_.setScissorTest(ye),G){const pe=V.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,W)}else if(me){const pe=U;for(let xe=0;xe<S.textures.length;xe++){const be=V.get(S.textures[xe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+xe,be.__webglTexture,W,pe)}}else if(S!==null&&W!==0){const pe=V.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pe.__webglTexture,W)}Y=-1};function yo(S){const U=V.get(S);return(U.__readFormat!==S.format||U.__readType!==S.type)&&(U.__readFormat=S.format,U.__readType=S.type,U.__formatReadable=R.textureFormatReadable(S.format),U.__typeReadable=R.textureTypeReadable(S.type)),U}this.readRenderTargetPixels=function(S,U,W,H,G,me,ve,pe=0){if(!(S&&S.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe){_.bindFramebuffer(F.FRAMEBUFFER,xe);try{const be=S.textures[pe],Oe=be.format,Ge=be.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pe);const Me=yo(be);if(Me.__formatReadable===!1){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&W>=0&&W<=S.height-G&&F.readPixels(U,W,H,G,he.convert(Oe),he.convert(Ge),me)}finally{const be=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(F.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(S,U,W,H,G,me,ve,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe)if(U>=0&&U<=S.width-H&&W>=0&&W<=S.height-G){_.bindFramebuffer(F.FRAMEBUFFER,xe);const be=S.textures[pe],Oe=be.format,Ge=be.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+pe);const Me=yo(be);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ze),F.bufferData(F.PIXEL_PACK_BUFFER,me.byteLength,F.STREAM_READ),F.readPixels(U,W,H,G,he.convert(Oe),he.convert(Ge),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const _t=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(F.FRAMEBUFFER,_t);const ct=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ah(F,ct,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ze),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,me),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Ze),F.deleteSync(ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,W=0){const H=Math.pow(2,-W),G=Math.floor(S.image.width*H),me=Math.floor(S.image.height*H),ve=U!==null?U.x:0,pe=U!==null?U.y:0;$.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,ve,pe,G,me),_.unbindTexture()},this.copyTextureToTexture=function(S,U,W=null,H=null,G=0,me=0){let ve,pe,xe,be,Oe,Ge,Me,Ze,_t;const ct=S.isCompressedTexture?S.mipmaps[me]:S.image;if(W!==null)ve=W.max.x-W.min.x,pe=W.max.y-W.min.y,xe=W.isBox3?W.max.z-W.min.z:1,be=W.min.x,Oe=W.min.y,Ge=W.isBox3?W.min.z:0;else{const pt=Math.pow(2,-G);ve=Math.floor(ct.width*pt),pe=Math.floor(ct.height*pt),S.isDataArrayTexture?xe=ct.depth:S.isData3DTexture?xe=Math.floor(ct.depth*pt):xe=1,be=0,Oe=0,Ge=0}H!==null?(Me=H.x,Ze=H.y,_t=H.z):(Me=0,Ze=0,_t=0);const st=he.convert(U.format),Rt=he.convert(U.type);let _e;U.isData3DTexture?($.setTexture3D(U,0),_e=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?($.setTexture2DArray(U,0),_e=F.TEXTURE_2D_ARRAY):($.setTexture2D(U,0),_e=F.TEXTURE_2D),_.activeTexture(F.TEXTURE0),_.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const Lt=_.getParameter(F.UNPACK_ROW_LENGTH),Ye=_.getParameter(F.UNPACK_IMAGE_HEIGHT),Vt=_.getParameter(F.UNPACK_SKIP_PIXELS),rn=_.getParameter(F.UNPACK_SKIP_ROWS),An=_.getParameter(F.UNPACK_SKIP_IMAGES);_.pixelStorei(F.UNPACK_ROW_LENGTH,ct.width),_.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ct.height),_.pixelStorei(F.UNPACK_SKIP_PIXELS,be),_.pixelStorei(F.UNPACK_SKIP_ROWS,Oe),_.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);const ni=S.isDataArrayTexture||S.isData3DTexture,nt=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const pt=V.get(S),Rn=V.get(U),ot=V.get(pt.__renderTarget),Cn=V.get(Rn.__renderTarget);_.bindFramebuffer(F.READ_FRAMEBUFFER,ot.__webglFramebuffer),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,Cn.__webglFramebuffer);for(let ii=0;ii<xe;ii++)ni&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(S).__webglTexture,G,Ge+ii),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(U).__webglTexture,me,_t+ii)),F.blitFramebuffer(be,Oe,ve,pe,Me,Ze,ve,pe,F.DEPTH_BUFFER_BIT,F.NEAREST);_.bindFramebuffer(F.READ_FRAMEBUFFER,null),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(G!==0||S.isRenderTargetTexture||V.has(S)){const pt=V.get(S),Rn=V.get(U);_.bindFramebuffer(F.READ_FRAMEBUFFER,L),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,O);for(let ot=0;ot<xe;ot++)ni?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,pt.__webglTexture,G,Ge+ot):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pt.__webglTexture,G),nt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Rn.__webglTexture,me,_t+ot):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Rn.__webglTexture,me),G!==0?F.blitFramebuffer(be,Oe,ve,pe,Me,Ze,ve,pe,F.COLOR_BUFFER_BIT,F.NEAREST):nt?F.copyTexSubImage3D(_e,me,Me,Ze,_t+ot,be,Oe,ve,pe):F.copyTexSubImage2D(_e,me,Me,Ze,be,Oe,ve,pe);_.bindFramebuffer(F.READ_FRAMEBUFFER,null),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else nt?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(_e,me,Me,Ze,_t,ve,pe,xe,st,Rt,ct.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(_e,me,Me,Ze,_t,ve,pe,xe,st,ct.data):F.texSubImage3D(_e,me,Me,Ze,_t,ve,pe,xe,st,Rt,ct):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,me,Me,Ze,ve,pe,st,Rt,ct.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,me,Me,Ze,ct.width,ct.height,st,ct.data):F.texSubImage2D(F.TEXTURE_2D,me,Me,Ze,ve,pe,st,Rt,ct);_.pixelStorei(F.UNPACK_ROW_LENGTH,Lt),_.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ye),_.pixelStorei(F.UNPACK_SKIP_PIXELS,Vt),_.pixelStorei(F.UNPACK_SKIP_ROWS,rn),_.pixelStorei(F.UNPACK_SKIP_IMAGES,An),me===0&&U.generateMipmaps&&F.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&$.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?$.setTextureCube(S,0):S.isData3DTexture?$.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?$.setTexture2DArray(S,0):$.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){X=0,q=0,ie=null,_.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}const Hr={land:[34,58,56],land2:[46,76,68],sand:[222,202,146],coast:[24,30,52]},Gc=(i,e)=>{const t=i.length,n=(e+Math.PI)/(Math.PI*2)*t,r=Math.floor(n),s=n-r;return i[(r%t+t)%t]*(1-s)+i[((r+1)%t+t)%t]*s};function D_(i,e,{n:t=30,sigil:n=Jl(i),colour:r=Ql(n),sigilShare:s=.45,minScale:a=.62}={}){const o=Math.max(...e),l=Math.max(a,Math.min(1,o))/o,c=(t/2-1.5)*l,h=t/2,d=(v,y)=>{const E=v+.5-h,w=y+.5-h;return Math.hypot(E,w)<=c*Gc(e,Math.atan2(w,E))},u=new Uint8ClampedArray(t*t*4),p=(v,y)=>{u[v*4]=y[0],u[v*4+1]=y[1],u[v*4+2]=y[2],u[v*4+3]=255},g=new Uint8Array(t*t);for(let v=0;v<t;v++)for(let y=0;y<t;y++)g[v*t+y]=d(y,v)?1:0;const M=(v,y)=>v>=0&&y>=0&&v<t&&y<t&&g[y*t+v]===1,m=(v,y)=>!M(v-1,y)||!M(v+1,y)||!M(v,y-1)||!M(v,y+1);for(let v=0;v<t;v++)for(let y=0;y<t;y++){const E=v*t+y;M(y,v)?p(E,m(y,v)?Hr.sand:Math.hypot(y+.5-h,v+.5-h)<c*.55?Hr.land:Hr.land2):(M(y-1,v)||M(y+1,v)||M(y,v-1)||M(y,v+1))&&p(E,Hr.coast)}const f=Math.max(11,Math.round(t*s*Math.min(1,l*Math.max(...e)+.2))),b=Math.round((t-f)/2),A=Zl(n,f);for(let v=0;v<f;v++)for(let y=0;y<f;y++)A[v*f+y]<1/0&&g[(v+b)*t+y+b]&&p((v+b)*t+y+b,r);return{w:t,h:t,rgba:u}}function pg(i,{steps:e=i.length}={}){const t=[],n=.48/Math.max(1,...i);for(let r=0;r<e;r++){const s=-Math.PI+r/e*Math.PI*2,a=n*Gc(i,s);t.push([.5+a*Math.cos(s),.5+a*Math.sin(s)])}return t}const mg=i=>i>=128?2:i>=64?1:0,On=.055,gg=us*1.55,_g=us*.42;function vg(i,e,t,n){const r=n[0]-t[0],s=n[1]-t[1],a=r*r+s*s,o=a?Math.max(0,Math.min(1,((i-t[0])*r+(e-t[1])*s)/a)):0;return Math.hypot(i-t[0]-r*o,e-t[1]-s*o)}const Ka=(i,e,t)=>t.dot?Math.hypot(i-t.pts[0][0],e-t.pts[0][1]):t.pts.slice(1).reduce((n,r,s)=>Math.min(n,vg(i,e,t.pts[s],r)),1/0),Ki=new Map;function xg(i,e=128,{tier:t=mg(e)}={}){const n=`${i}|${e}|${t}`;if(Ki.has(n))return Ki.get(n);const r=new Uint8Array(e*e);if(t<=0){const h=Zl(i,e);for(let d=0;d<h.length;d++)r[d]=h[d]<1/0?1:0;return Ki.set(n,r),r}if(t>=2){const h=Eg(i,e);return Ki.set(n,h),h}const s=na(i,1).map(h=>({...h,pts:h.pts.map(([d,u])=>[On+d*(1-2*On),On+u*(1-2*On)])})),a=gg/2,o=_g/2,l=1/e,c=Math.max(Ja*1.5,a*1.1);for(let h=0;h<e;h++)for(let d=0;d<e;d++){const u=(d+.5)*l,p=(h+.5)*l;let g=0;for(const M of s){const m=Ka(u,p,M),f=M.dot?c:a;if(!(m>=f)){g=M.dot?m/f>.38&&m/f<.62?0:1:m<Math.max(o,l*.6)?0:1;break}}r[h*e+d]=g}return Ki.set(n,r),r}const Mg=.055,zl=us*.85,Sg=us*.28,kl=Ja*1.15,yg=Ja*.42;function js(i,e,t=e){const n=new Float32Array(e*t),r=1e9,s=1,a=Math.SQRT2;for(let l=0;l<e*t;l++)n[l]=i[l]?r:0;const o=(l,c)=>l<0||c<0||l>=e||c>=t?0:n[c*e+l];for(let l=0;l<t;l++)for(let c=0;c<e;c++){const h=l*e+c;n[h]&&(n[h]=Math.min(n[h],o(c-1,l)+s,o(c,l-1)+s,o(c-1,l-1)+a,o(c+1,l-1)+a))}for(let l=t-1;l>=0;l--)for(let c=e-1;c>=0;c--){const h=l*e+c;n[h]&&(n[h]=Math.min(n[h],o(c+1,l)+s,o(c,l+1)+s,o(c+1,l+1)+a,o(c-1,l+1)+a))}return n}function Eg(i,e){const t=1/e,n=na(i,2).map(b=>({...b,pts:b.pts.map(([A,v])=>[On+A*(1-2*On),On+v*(1-2*On)])})),r=na(i,0).length,s=n.filter(b=>!b.dot),a=n.filter(b=>b.dot),o=new Set(n.slice(r).filter(b=>!b.dot)),l=new Float32Array(e*e),c=new Float32Array(e*e),h=new Uint8Array(e*e);for(let b=0;b<e;b++)for(let A=0;A<e;A++){const v=(A+.5)*t,y=(b+.5)*t;let E=1/0,w=1/0;for(const x of s){const T=Ka(v,y,x);o.has(x)?w=Math.min(w,T):E=Math.min(E,T)}c[b*e+A]=w,E=Math.min(E,w+zl*.35);for(const x of a)E=Math.min(E,Ka(v,y,x)-kl*.4);l[b*e+A]=E,E<zl&&(h[b*e+A]=1)}{const b=Mg*e,A=Math.ceil(b)+2,v=e+2*A,y=new Uint8Array(v*v).fill(1);for(let T=0;T<e;T++)for(let P=0;P<e;P++)y[(T+A)*v+P+A]=h[T*e+P]?0:1;const E=js(y,v),w=new Uint8Array(v*v);for(let T=0;T<v*v;T++)w[T]=!y[T]||E[T]<=b?1:0;const x=js(w,v);for(let T=0;T<e;T++)for(let P=0;P<e;P++){const I=(T+A)*v+P+A;w[I]&&x[I]>b&&(h[T*e+P]=1)}}{const b=new Uint8Array(e*e),A=[];for(let v=0;v<e;v++)A.push(v,(e-1)*e+v,v*e,v*e+e-1);for(;A.length;){const v=A.pop();if(b[v]||h[v])continue;b[v]=1;const y=v%e,E=v/e|0;y>0&&A.push(v-1),y<e-1&&A.push(v+1),E>0&&A.push(v-e),E<e-1&&A.push(v+e)}for(let v=0;v<e*e;v++)b[v]||(h[v]=1)}const d=js(h,e),u=[],p=.085*e,g=[];for(let b=0;b<e*e;b++)d[b]>p&&l[b]*e>p*.8&&g.push(b);g.sort((b,A)=>d[A]-d[b]);for(const b of g){if(u.length>=3)break;const A=b%e,v=b/e|0,y=Math.min(d[b],l[b]*e)*.8;u.some(E=>Math.hypot(E.x-A,E.y-v)<E.r+y+2)||u.push({x:A,y:v,r:y,turn:bg(i,u.length)})}const M=new Uint8Array(e*e),m=Math.max(1,Sg*e),f=Math.max(m*3.2,4);for(let b=0;b<e;b++)for(let A=0;A<e;A++){const v=b*e+A;if(!h[v])continue;const y=(A+.5)*t,E=(b+.5)*t,w=d[v];let x=1;l[v]*e<m/2+.5&&w>m*.9&&(x=0),c[v]*e<m*.36+.5&&w>m*1.4&&(x=0);for(const P of a){const I=Math.hypot(y-P.pts[0][0],E-P.pts[0][1]);I<kl&&(x=I<yg?1:0)}let T=!1;for(const P of u){const I=A+.5-P.x,D=b+.5-P.y,z=Math.hypot(I,D);if(z>P.r)continue;T=!0;const L=Math.max(1.3,P.r/(m*2.6)),O=(Math.atan2(D,I)/(Math.PI*2)+1+P.turn)%1,X=P.r/L;x=(z/X-O+8)%1<.58||z<m*.8?1:0,z>P.r-m&&(x=0)}!T&&x&&l[v]*e>m*1.8&&w>f*1.2&&w%f<m&&(x=0),M[v]=x}return M}const bg=(i,e)=>{let t=2166136261;for(const n of i+e)t=Math.imul(t^n.charCodeAt(0),16777619);return(t>>>0)%1e3/1e3};function Tg(i){const e=i.light;return e&&e.mood==="spooky"?e.spooky:null}function Hl(i,e,t,n,r=1){e=(e%1+1)%1,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));const s=Math.floor(e*6),a=e*6-s,o=Gr(n*(1-t),r),l=Gr(n*(1-a*t),r),c=Gr(n*(1-(1-a)*t),r),h=Gr(n,r);switch(s%6){case 0:i.set(h,c,o);break;case 1:i.set(l,h,o);break;case 2:i.set(o,h,c);break;case 3:i.set(o,l,h);break;case 4:i.set(c,o,h);break;default:i.set(h,o,l)}}const Gr=(i,e)=>Math.round(i*255)/255*e,wg=["hazeHue","hazeSat","haze","gradeHue","gradeSat","mist"];class I_{constructor(e){this.M=e,this.cur=this.target("")}M;cur;targets=new Map;target(e){let t=this.targets.get(e);if(!t){const n=this.M.areas?.[e]??{};t={hazeHue:this.M.hazeHue,hazeSat:this.M.hazeSat,haze:this.M.haze,gradeHue:this.M.gradeHue,gradeSat:this.M.gradeSat,mist:this.M.mist,...n},this.targets.set(e,t)}return t}update(e,t,n,r,s){const a=this.target(e),o=1-Math.exp(-Math.max(0,t)*(this.M.areaEase??.5)),l=this.cur;for(const c of wg)if(c==="hazeHue"||c==="gradeHue"){const h=(a[c]-l[c]+1.5)%1-.5;l[c]=(l[c]+h*o+1)%1}else l[c]+=(a[c]-l[c])*o;if(Hl(n,l.hazeHue,l.hazeSat,1,l.haze),r){Hl(r,l.gradeHue,l.gradeSat,1);const c=.3*r.x+.55*r.y+.15*r.z;c>0&&r.set(r.x/c,r.y/c,r.z/c)}s?.setStrength(l.mist)}}const Ag="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Rg=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,Cg=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,Pg=.8,Lg=`
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
    c = mix(c, mix(c, vec3(l), uGrade.y) * uGradeTint, uGrade.x * (1.0 - smoothstep(0.0, uGrade.z, l)) * (1.0 - ${Pg.toFixed(2)} * pool));
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
}`,Dg=`
uniform sampler2D uSrc, uDepth; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre, uSkyBlur; varying vec2 vUv;
void main() {
  // The sky over the bend (nothing drawn there: the far plane) is blurred with everything else, as
  // the last pass over the finished, bent image (Ed, round 12: "the tilt shift effect has to be applied
  // after the bend shader").
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  // The sky (nothing drawn there: the far plane) takes only uSkyBlur of it, so its stars stay perceptible, softly.
  float r = uStrength * smoothstep(0.0, 1.0, d) * (texture2D(uDepth, vUv).r >= 0.99999 ? uSkyBlur : 1.0);
  if (r < 0.35) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    c += texture2D(uSrc, vUv + uDir * uTexel * t * r).rgb * k; w += k;
  }
  gl_FragColor = vec4(c / w, 1.0);
}`;function Xn(i,e,t,n=!1){const r=new Gt(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,stencilBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=Mn,r}class Ig{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Xn(1,1,it,!0),this.scene.depthTexture=new Li(1,1,Pi),this.scene.depthTexture.format=Fn,this.fx.texture.format=$t;const n=(r,s)=>new Mt({vertexShader:Ag,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(Rg,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(Cg,{uSrc:{value:null},uStep:{value:new Se}}),composite:n(Lg,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Se},uBloomStrength:{value:0},uKoDim:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0},uBroken:{value:0},uGrade:{value:new rt},uPool:{value:new rt},uIris:{value:new rt},uIris2:{value:new rt},uGradeTint:{value:new B(1,1,1)}}),tilt:n(Dg,{uSrc:{value:null},uDepth:{value:null},uTexel:{value:new Se},uDir:{value:new Se},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5},uSkyBlur:{value:1}})},this.quad=new lt(new Bn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Xn(1,1,it);bloomB=Xn(1,1,it);a=Xn(1,1,it);b=Xn(1,1,it);fx=Xn(1,1,it);fxB=Xn(1,1,it);fxScene=null;quad;cam=new ps(-1,1,1,-1,0,1);mats;low=new Se(1,1);out=new Se(1,1);fxRes=new Se(1,1);lift=0;get pool(){return this.mats.composite.uniforms.uPool.value}get iris(){return this.mats.composite.uniforms.uIris.value}get iris2(){return this.mats.composite.uniforms.uIris2.value}set koDim(e){this.mats.composite.uniforms.uKoDim.value=e}get lowSize(){return this.low}get fxSize(){return this.fxRes}sizes(){return{scene:[this.scene.width,this.scene.height],fx:[this.fx.width,this.fx.height],bloom:[this.bright.width,this.bright.height],out:[this.out.x,this.out.y]}}resize(e,t,n,r){this.low.set(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.fxRes.set(s,a),this.fx.setSize(s,a),this.fxB.setSize(s,a),this.out.set(n,r),this.scene.setSize(e,t);const o=Math.max(1,Math.round(e/2)),l=Math.max(1,Math.round(t/2));this.bright.setSize(o,l),this.bloomB.setSize(o,l),this.a.setSize(e,t),this.b.setSize(e,t)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}sceneMs=0;render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene);const s=performance.now();n.render(e,t),this.sceneMs=performance.now()-s;const a=r.bloom.on&&r.bloom.strength>0;if(a){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const o=!!this.fxScene&&r.suspects.effectsLayer;if(this.fxScene){const u=n.getClearColor(new Ie),p=n.getClearAlpha();n.setRenderTarget(this.fx),n.setClearColor(0,0),n.clear(),n.render(this.fxScene,t),n.setClearColor(u,p);const g=this.low.x,M=this.low.y;this.pass("blur",this.fxB,m=>{m.uSrc.value=this.fx.texture,m.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,m=>{m.uSrc.value=this.fxB.texture,m.uStep.value.set(0,.6/M)})}const l=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",l?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=a?r.bloom.strength:0,u.uBlack.value=r.tone.black,u.uGamma.value=r.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=o?1:0,u.uBroken.value=r.suspects.showBroken?1:0,this.setGrade(u)}),!l)return;const c=this.a.width,h=this.a.height,d=u=>{const p=r.tiltShift,g=Math.max(0,Math.min(1,this.lift)),M=g*g*(3-2*g);u.uDepth.value=this.scene.depthTexture,u.uTexel.value.set(1/c,1/h),u.uStrength.value=p.strength+(p.treetop.strength-p.strength)*M,u.uBand.value=p.band+(p.treetop.band-p.band)*M,u.uCentre.value=1-p.centre,u.uSkyBlur.value=p.skyBlur??1};this.pass("tilt",this.b,u=>{d(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{d(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}get gradeTint(){return this.mats.composite.uniforms.uGradeTint.value}gradeOf;setGrade(e){const t=Tg(this.tuning);if(t!==this.gradeOf)if(this.gradeOf=t,t?.grade){const[n,r,s]=cu(t.gradeHue,t.gradeSat,1).map(o=>o/255),a=.3*n+.55*r+.15*s;e.uGrade.value.set(t.grade,t.gradeDesat,t.gradePivot,0),e.uGradeTint.value.set(n/a,r/a,s/a)}else e.uGrade.value.set(0,0,1,0)}}const qn=100,Ht=qn/uu,Vr=[{from:0,px:48},{from:64,px:128},{from:128,px:256}],tr=5,Ug=240,Ng=6,Fg=40;function ea(i){for(let e=i.length-1;e>=0;e--)if(i[e]>=65535)return new Uint32Array(i);return new Uint16Array(i)}function Og(i,e){const t=new Float32Array(i.length);for(let n=0;n<e.length;n+=3){const r=e[n],s=e[n+1],a=e[n+2],o=r*3,l=s*3,c=a*3,h=i[o],d=i[o+1],u=i[o+2],p=i[l],g=i[l+1],M=i[l+2],m=i[c],f=i[c+1],b=i[c+2],A=m-p,v=f-g,y=b-M,E=h-p,w=d-g,x=u-M,T=v*x-y*w,P=y*E-A*x,I=A*w-v*E;t[o]=t[o]+T,t[o+1]=t[o+1]+P,t[o+2]=t[o+2]+I,t[l]=t[l]+T,t[l+1]=t[l+1]+P,t[l+2]=t[l+2]+I,t[c]=t[c]+T,t[c+1]=t[c+1]+P,t[c+2]=t[c+2]+I}for(let n=0;n<t.length;n+=3){const r=t[n],s=t[n+1],a=t[n+2],o=1/(Math.sqrt(r*r+s*s+a*a)||1);t[n]=r*o,t[n+1]=s*o,t[n+2]=a*o}return t}function Vc(i,e){const{cols:t,rows:n,step:r}=i,s=t*n,a=new Float32Array(s*3),o=[];let l=0;for(let f=0;f<n;f++)for(let b=0;b<t;b++){const A=f*t+b,v=i.h[A],y=v>0?.04+v*e*tr:-.12;a[A*3]=(i.x0+b*r)*e,a[A*3+1]=y,a[A*3+2]=(i.z0+f*r)*e,l=Math.max(l,y)}for(let f=0;f<n-1;f++)for(let b=0;b<t-1;b++){const A=f*t+b,v=A+1,y=A+t,E=y+1;i.h[A]<=0&&i.h[v]<=0&&i.h[y]<=0&&i.h[E]<=0||o.push(A,y,v,v,y,E)}const c=ea(o),h=Og(a,c);let d=.1;for(let f=0;f<s;f++)d=Math.max(d,a[f*3+1]);const u=new Uint8Array(s);for(let f=0;f<s;f++)u[f]=Math.round(Math.max(0,Math.min(1,a[f*3+1]/d))*255);const p=new Float32Array(s*3),g=new Float32Array(s),M=[];for(let f=0;f<s;f++)p[f*3]=a[f*3],p[f*3+1]=.03,p[f*3+2]=a[f*3+2],g[f]=i.h[f]>0||i.water?.[f]===2?0:Math.min(1,-i.h[f]/Ug);for(let f=0;f<n-1;f++)for(let b=0;b<t-1;b++){const A=f*t+b,v=A+1,y=A+t,E=y+1;g[A]>=1&&g[v]>=1&&g[y]>=1&&g[E]>=1||i.h[A]>0&&i.h[v]>0&&i.h[y]>0&&i.h[E]>0||M.push(A,y,v,v,y,E)}let m=null;if(i.water&&i.level){const f=i.water,b=i.level,A=new Float32Array(s*3),v=new Float32Array(s),y=[];for(let w=0;w<s;w++){const x=f[w]===2?b[w]:0;A[w*3]=a[w*3],A[w*3+1]=.06+x*e*tr,A[w*3+2]=a[w*3+2],v[w]=f[w]===2?Math.min(1,(b[w]-i.h[w])/Ng):0}for(let w=0;w<n;w++)for(let x=0;x<t;x++){const T=w*t+x;if(f[T]!==2){for(const P of[T-1,T+1,T-t,T+t])if(P>=0&&P<s&&f[P]===2){A[T*3+1]=.06+b[P]*e*tr;break}}}const E=new Float32Array(s);if(i.looks)for(let w=0;w<s;w++)E[w]=i.looks[w];{const w=new Float32Array(s),x=1.4142;for(let D=0;D<s;D++)w[D]=f[D]===2?1e9:0;for(let D=0;D<n;D++)for(let z=0;z<t;z++){const L=D*t+z;if(!w[L])continue;let O=w[L];z>0&&(O=Math.min(O,w[L-1]+1)),D>0&&(O=Math.min(O,w[L-t]+1),z>0&&(O=Math.min(O,w[L-t-1]+x)),z<t-1&&(O=Math.min(O,w[L-t+1]+x))),w[L]=O}for(let D=n-1;D>=0;D--)for(let z=t-1;z>=0;z--){const L=D*t+z;if(!w[L])continue;let O=w[L];z<t-1&&(O=Math.min(O,w[L+1]+1)),D<n-1&&(O=Math.min(O,w[L+t]+1),z<t-1&&(O=Math.min(O,w[L+t+1]+x)),z>0&&(O=Math.min(O,w[L+t-1]+x))),w[L]=O}const T=new Int32Array(s).fill(-1),P=[],I=[];for(let D=0;D<s;D++){if(E[D]!==7||f[D]!==2||T[D]>=0)continue;const z=P.length;let L=0;for(P.push(0),I.push(D),T[D]=z;I.length;){const O=I.pop(),X=O%t;L=Math.max(L,w[O]);for(const q of[X>0?O-1:-1,X<t-1?O+1:-1,O-t,O+t])q>=0&&q<s&&f[q]===2&&T[q]<0&&(T[q]=z,I.push(q))}P[z]=L}for(let D=0;D<s;D++)f[D]!==2||!E[D]||(v[D]=T[D]>=0?Math.min(1,(w[D]-.5)/Math.max(1,P[T[D]]-.5)):Math.min(1,(w[D]-.5)*r/Fg))}for(let w=0;w<n-1;w++)for(let x=0;x<t-1;x++){const T=w*t+x,P=T+1,I=T+t,D=I+1;E[T]===4||E[P]===4||E[I]===4||E[D]===4||(f[T]===2||f[P]===2||f[I]===2||f[D]===2)&&y.push(T,I,P,P,I,D)}y.length&&(m={lp:A,ld:v,lk:E,li:ea(y)})}return{pos:a,normal:h,idx:c,top:l,tile:u,tmax:d,flat:p,depth:g,wi:ea(M),lakes:m}}const Gl=[8,5.5,8,11,13,15],Bg=i=>i.id==="home"?Gl[0]:Gl[Math.max(1,Math.min(5,i.phase))],Wc=11,ta=Wc*2.3,Vl=2048,Xc=(i,e,t)=>`
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
}`,zg=`
uniform sampler2D uHMap; uniform float uHR, uHMax, uShadow; uniform vec3 uMoonV;
#define uTop uHMax
float hAtMap(vec2 p) { return texture2D(uHMap, p / (2.0 * uHR) + 0.5).r * uHMax; }
${Xc("moonLit","hAtMap",16)}`,fo=`
uniform sampler2D uTile; uniform vec4 uTileB; uniform vec2 uTileN; uniform float uTileMax, uYScale, uShadow; uniform vec3 uMoonV;
#define uTop uTileMax
float hAtTile(vec2 p) {
  vec2 c = (p - uTileB.xy) * uTileB.z;
  if (c.x < 0.0 || c.y < 0.0 || c.x > uTileN.x - 1.0 || c.y > uTileN.y - 1.0) return 0.0;
  return texture2D(uTile, (c + 0.5) / uTileN).r * uTileMax;
}
${Xc("moonLit","hAtTile",20)}`,qc=2,Yc=1,kg=96,Hg=16,Gg=Wc*Yc,Vg=9,Wg=`
varying vec3 vW;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,Xg=`
uniform float uTime, uR, uRings; uniform vec3 uMoonDir; varying vec3 vW;
${zg}
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
}`,qg=`
uniform float uTime; varying vec2 vUv;
float h(float x) { return fract(sin(x * 91.7) * 4375.85); }
void main() {
  float a = vUv.x * 900.0, col = floor(a), streak = h(col), y = vUv.y;
  float run = fract(y * 3.0 + uTime * (0.4 + streak * 0.5) + streak);
  float lit = smoothstep(0.55, 1.0, run) * (0.4 + 0.6 * streak);
  float fade = smoothstep(0.0, 0.9, y);
  vec3 c = mix(vec3(0.05, 0.09, 0.2), vec3(0.45, 0.6, 0.85), lit) * fade;
  gl_FragColor = vec4(c, fade * (0.55 + 0.45 * lit));
}`,Yg="varying vec2 vNdc; void main() { vNdc = position.xy; gl_Position = vec4(position.xy, 0.99999, 1.0); }",Kg=`
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
}`,$g=`attribute float aAlong; varying float vAlong; varying vec2 vUv;
void main() { vAlong = aAlong; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Zg=`
uniform float uTime; uniform vec3 uColour; varying float vAlong; varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.y * 2.0 - 1.0);
  float pulse = fract(vAlong * 0.08 - uTime * 0.6);
  float glow = smoothstep(0.0, 1.0, across) * (0.35 + 0.65 * smoothstep(0.75, 1.0, pulse));
  gl_FragColor = vec4(uColour * glow, glow);
}`,Jg=`
varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
void main() { vN = normalize(mat3(modelMatrix) * normal); vC = color; vY = position.y; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,Qg=`
uniform vec3 uMoon; uniform vec3 uShade; uniform float uRise, uDim; varying vec3 vN; varying vec3 vC; varying float vY; varying vec3 vL;
${fo}
void main() {
  vec3 n = normalize(vN);
  float lit = max(0.0, dot(n, uMoon)), hill = clamp(dot(n, uShade), -1.0, 1.0);
  float up = clamp(vY / uRise, 0.0, 1.0);
  vec3 c = vC * uDim * (0.66 + 0.5 * lit) * (0.8 + 0.34 * hill) + vec3(0.05, 0.05, 0.06) * up * up;
  c += vec3(0.015, 0.025, 0.05) * (1.0 - lit);
  float sh = moonLit(vL, 1.0 / uYScale); c = c * sh + vec3(0.006, 0.01, 0.024) * (1.0 - sh); // (in a hill shadow: darker, a little bluer)
  gl_FragColor = vec4(c, 1.0);
}`,jg=`
attribute float aDepth; varying float vD; varying vec3 vL;
void main() { vD = aDepth; vL = position; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,e_=`
uniform float uDim, uOpaque; uniform vec3 uDeep, uPale; varying float vD; varying vec3 vL;
${fo}
void main() {
  float a = pow(1.0 - clamp(vD, 0.0, 1.0), 1.6);
  vec3 c = mix(uDeep, uPale, a * a) * moonLit(vec3(vL.x, 0.0, vL.z), 1.0 / uYScale);
  gl_FragColor = vec4(c * uDim, max(uOpaque, a * 0.85));
}`,t_={deep:new Ie(.08,.2,.34),pale:new Ie(.22,.46,.52)},Wl={deep:new Ie(.15,.28,.37),pale:new Ie(.3,.52,.56)},n_=`
attribute float aDepth, aLook; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
void main() {
  vD = aDepth; vLook = aLook; vL = position; vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xz; vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,i_=`
uniform float uDim, uTime, uScale; uniform vec3 uDeep, uPale; varying float vD, vLook; varying vec2 vP; varying vec3 vL, vW;
${fo}
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
}`,$i=i=>i*i*(3-2*i),r_=i=>i*i,kt={frame:1.6,swoop:2.8,run:1.2,dist:600,pitchDeg:50,onward:60,inland:40},s_=.9;function a_(i,e=24,t=0,n){const r=n??xg(i,e,{tier:t}),s=new Uint8Array(e*e*4);for(let o=0;o<e;o++)for(let l=0;l<e;l++){const c=o*e+l,h=((e-1-o)*e+l)*4;r[c]&&s.set([255,255,255,255],h)}const a=new ar(s,e,e);return a.magFilter=St,a.minFilter=St,a.needsUpdate=!0,a}function o_(){const e=new Uint8Array(16384);for(let n=0;n<64;n++)for(let r=0;r<64;r++){const s=Math.hypot(r+.5-32,n+.5-32)/32,a=Math.max(0,1-s)**2;e.set([255,255,255,Math.round(a*255)],(n*64+r)*4)}const t=new ar(e,64,64);return t.magFilter=it,t.minFilter=it,t.needsUpdate=!0,t}function l_(i){const e=i.outline,t=Bg(i);if(e&&e.loops.some(a=>a.sea)){const l=Ht;let c=0;for(const d of e.loops)if(d.sea)for(let u=0;u<d.pts.length;u+=2)c=Math.max(c,Math.hypot(d.pts[u]-0,d.pts[u+1]-0));const h=[];for(const d of e.loops){const u=d.pts.length/2,p=u>160?2:1,g=[];for(let M=0;M<u;M+=p)g.push(new Se((d.pts[M*2]-0)*l,-(d.pts[M*2+1]-0)*l));g.length>=3&&h.push({pts:g,sea:d.sea})}if(h.some(d=>d.sea))return{loops:h,k:l,cx:0,cz:0,reach:c*l}}const n=pg(i.radii).map(([a,o])=>new Se(a-.5,-(o-.5))),r=Math.max(...n.map(a=>a.length())),s=t/r;return{loops:[{pts:n.map(a=>a.multiplyScalar(s)),sea:!0}],k:0,cx:0,cz:0,reach:t}}const c_=new B,Xl=(i,e=1)=>new Ie(i[0]/255*e,i[1]/255*e,i[2]/255*e);class $a{constructor(e,t){this.canvas=e,this.tuning=t,this.renderer=new dg({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=ir,this.camera=new qt(t.camera.fov??40,1,1,4e3),this.postTuning={...t,bloom:{...t.bloom}},this.post=new Ig(this.renderer,this.postTuning),this.scene.background=new Ie(329230),this.scene.add(new cf(7372992,1581104,2.6));const n=new ff(13688063,3.2);n.position.set(-30,60,-90),this.scene.add(n),this.moonLight=n;const r=new mt;r.setAttribute("position",new ht([-1,-1,0,3,-1,0,-1,3,0],3)),this.skyU={uRes:{value:new Se(1,1)},uTime:this.uTime,uMoon:{value:new Se(.28,.88)}};const s=new lt(r,new Mt({vertexShader:Yg,fragmentShader:Kg,uniforms:this.skyU,depthWrite:!1,depthTest:!0,depthFunc:Ri}));s.frustumCulled=!1,s.renderOrder=9,this.scene.add(s),this.buildSea(),this.ring=new lt(new ls(.92,1,64).rotateX(-Math.PI/2),new Nn({color:11066623,transparent:!0,blending:vn,depthWrite:!1})),this.ring.position.y=.15,this.ring.visible=!1,this.scene.add(this.ring)}canvas;tuning;renderer;camera;scene=new Yo;post;postTuning;isles=new Map;lines=[];voyages=[];uTime={value:0};glow=o_();skyU;ring;focus=new B;aim=new B;dist=130;distTo=130;distOpen=130;distMax=200;sized=!1;pitch=.95;selected=null;orbit=0;yaw=0;flight=null;get flying(){return!!this.flight}w=1;h=1;unheight(e){const t=e.userData.hb;t&&(this.hScene.remove(t),this.hBodies=this.hBodies.filter(n=>n.hb!==t),this.markHeights())}markHeights(){this.hDirty||(this.hSince=this.now),this.hDirty=!0,this.hDue=Math.min(this.hSince+2,this.now+.5)}hSince=0;now=0;hDue=0;set(e,t){for(const n of this.isles.values())this.unheight(n.group);for(const n of this.isles.values())this.scene.remove(n.group);for(const n of this.lines)this.scene.remove(n);this.isles.clear(),this.lines=[];for(const n of e)this.isles.set(n.id,this.island(n));this.voyages=t;for(const n of t){const r=this.isles.get(n.from),s=this.isles.get(n.to);r&&s&&this.lines.push(this.voyage(r,s))}this.selected&&!this.isles.has(this.selected)&&(this.selected=null)}reshape(e,t){const n=this.isles.get(e);if(!n)return;const r=!n.pick;this.unheight(n.group),this.scene.remove(n.group);const s=this.island({...n.d,outline:t});r&&(s.rose=this.now),this.isles.set(e,s);for(const a of this.lines)this.scene.remove(a);this.lines=this.voyages.flatMap(a=>{const o=this.isles.get(a.from),l=this.isles.get(a.to);return o&&l?[this.voyage(o,l)]:[]})}island(e){const t=new Ei,n=e.x*qn,r=e.y*qn;t.position.set(n,0,r),this.scene.add(t);const{k:s,reach:a}=l_(e),o=e.unknown?.72:e.sail?1:.85,l=e.outline?.ground;if(!l||!(s>0))return{d:e,group:t,x:n,z:r,top:1,reach:a};const{cols:c,rows:h,step:d}=l,u=e.outline.mesh??Vc(l,s),p=l.rgb instanceof Uint8Array?l.rgb:Uint8Array.from(l.rgb),g=new mt;g.setAttribute("position",new dt(u.pos,3)),g.setAttribute("color",new dt(p,3,!0)),g.setAttribute("normal",new dt(u.normal,3)),g.setIndex(new dt(u.idx,1));const M=new ar(u.tile,c,h,fs,Ft);M.unpackAlignment=1,M.minFilter=M.magFilter=it,M.needsUpdate=!0;const m={uTile:{value:M},uTileB:{value:new rt(l.x0*s,l.z0*s,1/(d*s),0)},uTileN:{value:new Se(c,h)},uTileMax:{value:u.tmax},uYScale:{value:1}},f=new lt(g,new Mt({vertexShader:Jg,fragmentShader:Qg,uniforms:{...this.groundU,...m,uDim:{value:o}},vertexColors:!0})),b=u.top,A=new mt;A.setAttribute("position",new dt(u.flat,3)),A.setAttribute("aDepth",new dt(u.depth,1)),A.setIndex(new dt(u.wi,1));const v=(E,w)=>new Mt({vertexShader:jg,fragmentShader:e_,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uOpaque:{value:w},uDeep:{value:E.deep},uPale:{value:E.pale}},transparent:w<1,depthWrite:w>=1});if(t.add(new lt(A,v(t_,0))),u.lakes){const E=u.lakes,w=new mt;w.setAttribute("position",new dt(E.lp,3)),w.setAttribute("aDepth",new dt(E.ld,1)),w.setAttribute("aLook",new dt(E.lk,1)),w.setIndex(new dt(E.li,1)),t.add(new lt(w,new Mt({vertexShader:n_,fragmentShader:i_,uniforms:{...this.moonShared,...m,uDim:{value:.6+.4*o},uTime:this.uTime,uScale:{value:30*s},uDeep:{value:Wl.deep},uPale:{value:Wl.pale}}})))}t.add(f);{const E=new lt(f.geometry,this.heightMat);E.matrixAutoUpdate=!1,E.frustumCulled=!1,this.hScene.add(E),this.hBodies.push({hb:E,body:f}),t.userData.hb=E,this.markHeights()}const y={d:e,group:t,pick:f,x:n,z:r,top:b,reach:a,tileU:m};if(e.outline?.sigils?.length&&this.sigilInk.set(e.sigil,e.outline.sigils),e.sail){const E=Ql(e.sigil),w=Math.max(Vg,a*Yc),x=new lt(new Bn(w,w).rotateX(-Math.PI/2),new Nn({map:this.sigilArt(e.sigil,0),color:Xl(E,.95),transparent:!0,blending:vn,depthWrite:!1}));x.position.y=b+.35,t.add(x),y.sigil=x,y.tier=0,y.size=w;const T=new lt(new Bn(w*1.6,w*1.6).rotateX(-Math.PI/2),new Nn({map:this.glow,color:Xl(E,.16),transparent:!0,blending:vn,depthWrite:!1}));T.position.y=b+.25,t.add(T),y.glow=T}if(e.won){const E=a*1.3,w=new lt(new ls(E*.95,E,96).rotateX(-Math.PI/2),new Nn({color:15250538,transparent:!0,blending:vn,depthWrite:!1}));w.position.y=.12,t.add(w)}return y}moonShared={uShadow:{value:0},uMoonV:{value:new B(-.3,.6,-.9).normalize()}};hmap=new Gt(Vl,Vl,{depthBuffer:!0,minFilter:it,magFilter:it,generateMipmaps:!1});moonU={...this.moonShared,uHMap:{value:this.hmap.texture},uHR:{value:qn*1.02},uHMax:{value:8}};hScene=new Yo;hBodies=[];hDirty=!0;moonLight=null;moonT0=0;moonLast;moonP=new B;seaMoon={value:new B(-.3,.6,-.9)};stillMoon=null;heightMat=new Mt({vertexShader:"uniform float uHR, uHMax; varying float vY; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vY = w.y; gl_Position = vec4(w.x / uHR, w.z / uHR, -0.9 * clamp(w.y / uHMax, -1.0, 1.0), 1.0); }",fragmentShader:"uniform float uHMax; varying float vY; void main() { gl_FragColor = vec4(clamp(vY / uHMax, 0.0, 1.0), 0.0, 0.0, 1.0); }",uniforms:{uHR:this.moonU.uHR,uHMax:this.moonU.uHMax},side:Yt});groundU={...this.moonShared,uMoon:{value:new B(-.3,.6,-.9).normalize()},uShade:{value:new B(-.7,.45,-.55).normalize()},uRise:{value:3}};moonFrame(e){const t=this.tuning,n=Eu(t);(this.moonLast===void 0||e-this.moonLast>1||e<this.moonLast)&&(this.moonT0=e),this.moonLast=e;const r=this.stillMoon!==null?{bearing:this.stillMoon,height:n.height,risen:1}:bu(e-this.moonT0,n),s=Ni.degToRad(r.bearing),a=Ni.degToRad(r.height),o=this.moonShared.uMoonV.value.set(Math.sin(s)*Math.cos(a),Math.sin(a),-Math.cos(s)*Math.cos(a));this.moonShared.uShadow.value=n.shadow*r.risen,this.groundU.uMoon.value.copy(o),this.groundU.uShade.value.set(Math.sin(s)*.8,.45,-Math.cos(s)*.8).normalize(),this.seaMoon.value.copy(o),this.moonLight?.position.copy(o).multiplyScalar(100);const l=this.skyU.uMoon.value;if(!n.disc)l.set(-1,-1);else{this.camera.updateMatrixWorld();const g=this.moonP.copy(o).multiplyScalar(this.seaR*1.6).project(this.camera);g.z>1||g.z<-1?l.set(-1,-1):l.set((g.x+1)/2,(g.y+1)/2)}Co(t)!==this.band&&this.buildSea();for(const g of this.isles.values())g.tileU&&(g.tileU.uYScale.value=g.group.scale.y);if((!this.hDirty||e<this.hDue)&&!this.flight)return;this.hDirty=!1;let c=1;for(const{hb:g,body:M}of this.hBodies){M.updateWorldMatrix(!0,!1),g.matrix.copy(M.matrixWorld),g.matrix.elements[13]-=M.parent?.position.y??0,g.matrixWorld.copy(g.matrix);const m=M.geometry;m.boundingBox||m.computeBoundingBox(),c=Math.max(c,m.boundingBox.max.y)}this.moonU.uHMax.value=c*1.05;const h=this.renderer,d=h.getRenderTarget(),u=h.getClearColor(new Ie),p=h.getClearAlpha();h.setRenderTarget(this.hmap),h.setClearColor(0,1),h.clear(),h.render(this.hScene,this.camera),h.setRenderTarget(d),h.setClearColor(u,p)}sea=null;fall=null;band=-1;seaR=qn*1.02;buildSea(){for(const t of[this.sea,this.fall])t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose());this.band=Co(this.tuning);const e=this.seaR=qn*1.02*(1+this.band);this.moonU.uHR.value=e,this.markHeights(),this.sea=new lt(new os(e,160).rotateX(-Math.PI/2),new Mt({vertexShader:Wg,fragmentShader:Xg,uniforms:{...this.moonU,uTime:this.uTime,uR:{value:e},uRings:{value:qn*1.02},uMoonDir:this.seaMoon}})),this.fall=new lt(new ho(e,e*.97,40,160,1,!0).translate(0,-20,0),new Mt({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:qg,uniforms:{uTime:this.uTime},transparent:!0,depthWrite:!1,side:Yt})),this.scene.add(this.sea,this.fall)}sigilArts=new Map;sigilInk=new Map;sigilArt(e,t){const n=`${e}|${t}`;let r=this.sigilArts.get(n);if(!r){const s=this.sigilInk.get(e)?.[t];r=a_(e,Vr[t].px,t,s&&s.px===Vr[t].px?s.ink:void 0),this.sigilArts.set(n,r)}return r}voyage(e,t){const n=new Se(e.x,e.z),r=new Se(t.x,t.z),s=r.clone().sub(n),a=s.length(),o=new Se(-s.y,s.x).normalize(),l=n.clone().add(r).multiplyScalar(.5).add(o.multiplyScalar(a*.12)),c=48,h=.9,d=[],u=[],p=[],g=[],M=v=>{const y=1-v;return new Se(y*y*n.x+2*y*v*l.x+v*v*r.x,y*y*n.y+2*y*v*l.y+v*v*r.y)},m=e.reach/a*1.1,f=1-t.reach/a*1.1;for(let v=0;v<=c;v++){const y=m+(f-m)*(v/c),E=M(y),w=M(Math.min(1,y+.01)),x=w.sub(E).normalize(),T=new Se(-x.y,x.x).multiplyScalar(h);if(d.push(E.x+T.x,.2,E.y+T.y,E.x-T.x,.2,E.y-T.y),u.push(v/c,0,v/c,1),p.push(y*a,y*a),v<c){const P=v*2;g.push(P,P+1,P+2,P+1,P+3,P+2)}}const b=new mt;b.setAttribute("position",new ht(d,3)),b.setAttribute("uv",new ht(u,2)),b.setAttribute("aAlong",new ht(p,1)),b.setIndex(g);const A=new lt(b,new Mt({vertexShader:$g,fragmentShader:Zg,uniforms:{uTime:this.uTime,uColour:{value:new Ie(1,.72,.38)}},transparent:!0,blending:vn,depthWrite:!1,side:Yt}));return this.scene.add(A),A}reset(){this.set([],[]),this.selected=null,this.flight=null,this.orbit=0,this.yaw=0,this.pitch=.95,this.focus.set(0,0,0),this.aim.set(0,0,0),this.sized=!1,this.moonLast=void 0,this.stillMoon=null}dispose(){this.scene.traverse(e=>{const t=e;t.geometry?.dispose();for(const n of[].concat(t.material??[])){for(const r of Object.values(n))r instanceof wt&&r.dispose();n.dispose()}}),this.glow.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}fly(e,t){const n=this.isles.get(e);if(!n)return!1;this.select(e),this.orbit=0,this.yaw=0;const r=n.d.outline?.ground;let s=n.d.outline?n.d.outline.box.maxZ:n.reach/Ht;if(r){const g=Math.round(-r.x0/r.step);for(let M=Math.max(0,Math.round(-r.z0/r.step));M<r.rows;M++)if(!(r.h[M*r.cols+g]>0)){s=r.z0+M*r.step;break}}const a=Ni.degToRad(kt.pitchDeg),o=n.z+(s-kt.inland)*Ht,l=o+kt.onward*Ht,c=[{x:this.focus.x,z:this.focus.z,dist:this.dist,pitch:this.pitch,at:0,ease:$i},{x:n.x,z:n.z,dist:Math.max(ta,n.reach*4.2),pitch:.95,at:kt.frame,ease:$i},{x:n.x,z:l,dist:kt.dist*Ht,pitch:a,at:kt.frame+kt.swoop,ease:$i},{x:n.x,z:o,dist:kt.dist*Ht,pitch:a,at:kt.frame+kt.swoop+kt.run,ease:r_}],h=new Ei,d=r?(()=>{const g=Math.round(-r.z0/r.step),M=Math.round(-r.x0/r.step);return .06+Math.max(0,r.h[g*r.cols+M]??0)*Ht*tr})():n.top,u=new lt(new os(1,32).rotateX(-Math.PI/2),new Nn({color:new Ie(.9,.5,1.2),transparent:!0,opacity:.9,blending:vn,depthWrite:!1})),p=new lt(new Bn(5,5).rotateX(-Math.PI/2),new Nn({map:this.glow,color:new Ie(.7,.4,1),transparent:!0,opacity:.8,blending:vn,depthWrite:!1}));return h.add(u,p),h.position.y=d+.05,h.scale.setScalar(22*Ht),n.group.add(h),this.flight={id:e,t:0,keys:c,done:t,speed:kt.onward*2/kt.run,floor:h,size:n.size??1},!0}skipFlight(){this.flight&&(this.flight.t=this.flight.keys.at(-1).at)}flyFrame(e,t){const n=this.flight,r=this.isles.get(n.id),s=n.keys.at(-1).at;n.t=Math.min(s,n.t+e);let a=1;for(;a<n.keys.length-1&&n.t>n.keys[a].at;)a++;const o=n.keys[a-1],l=n.keys[a],c=l.ease(Math.min(1,Math.max(0,(n.t-o.at)/(l.at-o.at)))),h=(p,g)=>p+(g-p)*c;this.focus.set(h(o.x,l.x),0,h(o.z,l.z)),this.aim.copy(this.focus),this.dist=this.distTo=h(o.dist,l.dist),this.pitch=h(o.pitch,l.pitch);const d=$i(Math.min(1,Math.max(0,(n.t-n.keys[1].at)/(n.keys[2].at-n.keys[1].at))));r.group.scale.y=1+(1/tr-1)*d;const u=$i(Math.min(1,n.t/n.keys[1].at));if(r.sigil){const p=1+(60*Ht/n.size-1)*u;r.sigil.scale.set(p,1,p),r.glow?.scale.set(p,1,p)}n.floor.rotation.y=t*.6,n.floor.children[0].scale.setScalar(.9+.1*Math.sin(t*6))}select(e,t=!1){this.selected=e&&this.isles.has(e)?e:null;const n=this.selected?this.isles.get(this.selected):null;this.aim.set(n?n.x:0,0,n?n.z:0),t&&this.focus.copy(this.aim)}zoom(e){this.distTo=Math.max(ta,Math.min(this.distMax,this.distTo*e))}pick(e,t){const n=this.canvas.getBoundingClientRect(),r=new Se((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),s=new mf;s.setFromCamera(r,this.camera);const a=s.intersectObjects([...this.isles.values()].flatMap(h=>h.pick?[h.pick]:[]),!1)[0];if(a){for(const[h,d]of this.isles)if(d.pick===a.object)return h}const o=new B;if(!s.ray.intersectPlane(new xn(new B(0,1,0),0),o))return null;let l=null,c=1/0;for(const[h,d]of this.isles){const u=Math.hypot(d.x-o.x,d.z-o.z)-d.reach;u<c&&(c=u,l=h)}return c<6?l:null}screenOf(e){const t=this.isles.get(e);if(!t)return null;const n=new B(t.x,t.top,t.z).project(this.camera),r=this.canvas.getBoundingClientRect();return{x:(n.x+1)/2*r.width,y:(1-n.y)/2*r.height}}made={w:0,h:0};resize(e,t){const n=qc,r=Math.max(1,Math.ceil(e/n)),s=Math.max(1,Math.ceil(t/n));if(this.sized&&r===this.w&&s===this.h)return;this.w=r,this.h=s,(this.made.w!==r||this.made.h!==s)&&(this.renderer.setSize(r,s,!1),this.post.resize(r,s,r,s),this.made={w:r,h:s}),this.canvas.style.width=`${this.w*n}px`,this.canvas.style.height=`${this.h*n}px`,this.camera.aspect=this.w/this.h,this.camera.updateProjectionMatrix(),this.skyU.uRes.value.set(this.w,this.h),this.postTuning.bloom.strength=this.tuning.bloom.strength*Math.max(.3,Math.min(1,(this.h-60)/180));const a=l=>Gg*this.h/(2*Math.tan(Ni.degToRad(this.camera.fov)/2)*l),o=this.distOpen;this.distOpen=a(kg),this.distMax=a(Hg),this.sized?(this.distTo=Math.max(ta,Math.min(this.distMax,this.distTo*(this.distOpen/o))),this.dist=this.distTo):(this.dist=this.distTo=this.distOpen,this.sized=!0)}frame(e,t){this.uTime.value=t,this.now=t;const n=1-Math.exp(-e*3.2);this.flight?this.flyFrame(e,t):(this.focus.lerp(this.aim,n),this.dist+=(this.distTo-this.dist)*n),this.yaw+=e*this.orbit;const r=Math.cos(this.pitch)*this.dist,s=Math.sin(this.yaw),a=Math.cos(this.yaw);this.camera.position.set(this.focus.x+r*s,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+r*a);const o=this.orbit||this.flight?0:this.dist*.035;this.camera.lookAt(this.focus.x,0,this.focus.z+o);const l=Math.max(.5,this.dist*.25),c=this.dist*3+400;(Math.abs(l-this.camera.near)>.01||Math.abs(c-this.camera.far)>1)&&(this.camera.near=l,this.camera.far=c,this.camera.updateProjectionMatrix()),this.post.lift=0;for(const u of this.isles.values()){const p=.85+.15*Math.sin(t*1.6+u.x*.1),g=u.d.id===this.selected;let M=1;if(u.sigil){const f=u.sigil.material,b=u.size*this.h/(2*Math.tan(Ni.degToRad(this.camera.fov)/2)*this.camera.position.distanceTo(c_.set(u.x,u.top,u.z)));M=b>220?Math.max(0,1-(b-220)/260):1,f.opacity=p*M,u.sigil.visible=M>0;let A=0;for(let v=1;v<Vr.length;v++)b>=Vr[v].from&&(A=v);A!==u.tier&&(u.tier=A,f.map=this.sigilArt(u.d.sigil,A),f.needsUpdate=!0)}u.glow&&(u.glow.material.opacity=(g?.85:.7)*p*M,u.glow.visible=u.sigil?.visible??!0);let m=0;if(u.rose!==void 0){const f=Math.min(1,(t-u.rose)/s_),b=1-(1-f)**3;m=-(u.top+.6)*(1-b),f>=1&&(u.rose=void 0)}u.group.position.y=m+(g?Math.sin(t*2)*.12:0)}const h=this.selected?this.isles.get(this.selected):null;if(this.ring.visible=!!h&&!this.flight,h){const u=h.reach*1.6*(1+.04*Math.sin(t*3));this.ring.position.set(h.x,.15,h.z),this.ring.scale.set(u,1,u),this.ring.material.opacity=.7+.3*Math.sin(t*3)}this.moonFrame(t),this.post.render(this.scene,this.camera);const d=this.flight;if(d&&d.t>=d.keys.at(-1).at){const u=this.isles.get(d.id),p=this.camera.position;this.flight=null,d.done({cam:{x:(p.x-u.x)/Ht,z:(p.z-u.z)/Ht,height:p.y/Ht,pitch:this.pitch,fov:this.camera.fov,speed:d.speed},still:this.canvas.toDataURL("image/jpeg",.88)})}}}let Nt=null;function Kc(i){return Nt?.prep?(Nt.prep=!1,Nt.chart):Nt&&!Nt.busy?(Nt.busy=!0,Nt.chart):Nt?new $a(document.createElement("canvas"),i):(Nt={chart:new $a(document.createElement("canvas"),i),busy:!0},Nt.chart)}function $c(i){if(Nt?.chart!==i){i.dispose();return}i.reset(),Nt.busy=!1}function ql(i,e){const s=new Float32Array(81),a=new Uint8Array(81),o=new Float32Array(81),l=new Uint8Array(81),c=new Uint8Array(243).fill(120);for(let u=0;u<9;u++)for(let p=0;p<9;p++){const g=u*9+p,M=Math.hypot(p-4,u-4);s[g]=M<3.5?40-M*8:-20,M<1.2?(a[g]=2,o[g]=s[g]+2,l[g]=1):s[g]<=0&&(a[g]=1)}const h={x0:-400,z0:-400,step:100,cols:9,rows:9,h:s,rgb:c,water:a,level:o,looks:l},d=new Float32Array([-300,0,0,-300,300,0,0,300]);return{id:i,x:e,y:0,phase:1,radii:[1,1,1,1],sail:!0,unknown:!1,won:!0,sigil:"home",outline:{loops:[{pts:d,sea:!0}],box:{minX:-300,maxX:300,minZ:-300,maxZ:300},ground:h,mesh:Vc(h,Ht)}}}async function U_(i){if(Nt)return;const e=Kc(i),t=Nt;t.prep=!0;try{e.resize(innerWidth*.92-4,innerHeight*.92-4),e.set([ql("home",0),ql("standIn",.2)],[{from:"home",to:"standIn"}]);const n=e;if(await Promise.all([n.scene,n.hScene].map(r=>e.renderer.compileAsync(r,e.camera))).catch(()=>{}),!t.prep)return;e.frame(1/60,0),e.frame(1/60,3);for(const r of e.renderer.info.programs??[])r.getUniforms()}finally{t.prep&&(t.prep=!1,$c(e),performance.mark("witch:chart-prepared"))}}function Zc(i,e=0){if(i!=="home"&&!Qr(i))return null;const t=hu(e).islands.get(i);return t?{x:t.x,y:t.y}:null}function u_(i,e,t,n){const r=i.find(h=>h.id===e),s=Math.hypot(t,n);if(!r||!s)return null;const a=t/s,o=n/s;let l=null,c=1/0;for(const h of i){if(h.id===e)continue;const d=h.x-r.x,u=h.y-r.y,p=Math.hypot(d,u);if(!p)continue;const g=(d*a+u*o)/p;if(g<.5)continue;const M=p*(2-g);M<c&&(c=M,l=h.id)}return l}const cs="witch.arrive",h_=3e4,Jc=()=>{try{return sessionStorage}catch{return null}};function f_(i,e,t,n=Jc(),r=Date.now()){const s={v:1,island:i,world:e,at:r,...t};try{n?.setItem(cs,JSON.stringify(s))}catch{try{n?.setItem(cs,JSON.stringify({...s,still:""}))}catch{}}}function N_(i,e=Jc(),t=Date.now()){let n=null;try{n=JSON.parse(e?.getItem(cs)??"null"),e?.removeItem(cs)}catch{return null}return!n||n.v!==1||n.island!==i||!(t-n.at>=0&&t-n.at<h_)||!n.cam?null:n}const Za=32,Qc=(i,e)=>i==="home"?0:Qr(i,e)?.phase??1;function jc(i,e){const t=n=>Math.hypot(n.x-e.x,n.y-e.y);return[...i].sort((n,r)=>n.phase-r.phase||t(n)-t(r)).map(n=>n.id)}function Yl(i,e){const t=r=>Math.hypot(r.x-e.x,r.y-e.y),n=i.filter(r=>r.id==="home"||r.sail).sort((r,s)=>r.id==="home"?-1:s.id==="home"?1:t(r)-t(s));return[...n.map(r=>r.id),...jc(i.filter(r=>!n.includes(r)),e)]}function d_(i){const e=["home",...ia].map(t=>{const n=Zc(t,i);return{id:t,x:n?.x??9,y:n?.y??0,phase:Qc(t,i)}});return jc(e,{x:0,y:0})}let Ti=null;function F_(i,e,t,n){if(Ti)return;let r;try{r=new Worker(new URL(""+new URL("chartOutlines.worker-DGH3OTAa.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return}Ti=r,r.onmessage=s=>{if(!("warmDone"in s.data)){n?.(s.data.warmed,s.data.made);return}r.terminate(),Ti=null,t?.(s.data.made,s.data.kept)},r.onerror=()=>{r.terminate(),Ti=null},r.postMessage({world:i,found:e,ids:d_(i),step:Za,warm:!0})}function O_(){Ti?.terminate(),Ti=null}const Kl="witch.chart.sailAnywhere",p_=`
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
.chart-view .new-world { align-items: center; background: var(--panel); border: 1px solid #3a2f5c; border-radius: 8px; padding: 8px 10px; }
.chart-view .new-seed { font: inherit; font-size: 13px; color: #e8e2f4; background: #14112a; border: 1px solid #3a2f5c; border-radius: 6px; padding: 8px; width: 14em; max-width: 50vw; }`,m_=`
<canvas aria-label="The sea chart"></canvas>
<div class="top"><h1>THE SEA CHART</h1><div class="status"></div></div>
<div class="bottom">
  <div class="card" hidden><div class="name"></div><div class="phase"></div><div class="state"></div><a class="btn sail" href="./?island=home">Sail there</a></div>
  <div class="bar"><button class="zoom-in" aria-label="Zoom in">+</button><button class="zoom-out" aria-label="Zoom out">−</button><a class="btn home" href="./?island=home">Sail home</a><button class="start-over">Start over</button><button class="sail-any" aria-pressed="false" title="Testing: sail to any island with a creature, found or not (the save isn't changed)">🧪 Test: sail anywhere</button><button class="close">Close</button></div>
  <div class="new-world bar" hidden><label>New world's seed <input class="new-seed" placeholder="blank: a random one" autocomplete="off"></label><button class="new-go">Start</button><button class="new-cancel">Cancel</button></div>
  <div class="world"></div>
  <div class="hint"></div>
</div>`;function B_(i,e){const t=e.mode,n=t==="miniature",r=t==="sail";if(!document.getElementById("chart-view-style")){const C=document.createElement("style");C.id="chart-view-style",C.textContent=p_,document.head.append(C)}const s=document.createElement("div");s.className="chart-view",s.innerHTML=m_,i.append(s);const a=C=>s.querySelector(`.${C}`),o=n?new $a(s.querySelector("canvas"),ur):Kc(ur),l=o.canvas;n||(l.setAttribute("aria-label","The sea chart"),s.querySelector("canvas").replaceWith(l));const c=new AbortController,h={signal:c.signal};n&&(a("top").hidden=!0,a("bottom").hidden=!0),a("sail").hidden=!0,a("home").hidden=!r,a("start-over").hidden=!r,a("sail-any").hidden=!r,a("close").hidden=!e.onClose,a("hint").textContent=r?"Tap an island to look at it, again to sail · arrows / stick to choose, Enter / A to sail · sigils: islands you can sail to · gold rings: won":"Tap an island to look at it · arrows / stick to choose · sigils: islands you can sail to · gold rings: won",n&&(o.orbit=.12);let d=e.save??tc(),u=[],p=(()=>{try{return localStorage.getItem(Kl)==="1"}catch{return!1}})();const g=()=>e.world??d.world,M=C=>`./?island=${C}${e.world!=null?`&world=${g()}`:""}`;let m=null;const f=C=>{if(!r||n||m?.island===C)return;if(m?.job.then(ne=>ne?.stop()),m?.map.then(ne=>ne?.stop()),!C||!u.find(ne=>ne.id===C)?.sail){m=null;return}const te=wo(()=>import("./landingBake-G0PpPpFa.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]),import.meta.url).then(ne=>ne.bakeLanding(C,e.world)).catch(()=>null);m={island:C,job:te,map:te.then(ne=>ne?wo(()=>import("./mapPrep-DjdJOR3q.js"),__vite__mapDeps([12,2,3,1,4,5,6,7,8,9,13,11]),import.meta.url).then(se=>se.startMapPrep(C,e.world,ne.seed)):null).catch(()=>null)}},b=async C=>{const te=m?.island===C?await m.job:null,ne=te?.seed??Math.floor(Math.random()*1e6);await te?.settle();const se=m?.island===C?await m.map:null;se&&await Promise.race([se.done,new Promise(Te=>setTimeout(Te,8e3))]),e.onSail?e.onSail(C,ne):location.href=`${M(C)}&seed=${ne}&arrive=1`},A=C=>{const te=u.find(se=>se.id===C);if(!r||!te?.sail||o.flying)return;const ne=g();if(f(C),!o.fly(C,se=>{f_(C,ne,se),b(C)})){b(C);return}s.classList.add("flying"),e.onFly?.(),requestAnimationFrame(()=>We())};let v=null,y=null;const E=new Map;let w=new Map;const x=()=>{const C=u.find(te=>te.id===(o.selected??"home"))??u[0];w=new Map(Yl(u,C??{x:0,y:0}).map((te,ne)=>[te,ne]))},T=C=>{const te=u.find(ne=>ne.id===C.id);!te||C.world!==g()||(E.get(C.id)??te.outline)?.detail&&!C.detail||E.set(C.id,C)};function P(){if(!E.size)return;let C=null,te=1/0;for(const se of E.values()){const Te=se.id===o.selected&&se.detail?-1:w.get(se.id)??1e9;Te<te&&(te=Te,C=se)}E.delete(C.id);const ne=u.find(se=>se.id===C.id);!ne||C.world!==g()||(ne.outline=C,o.reshape(C.id,C))}const I=()=>{if(!v){try{v=new Worker(new URL(""+new URL("chartOutlines.worker-DGH3OTAa.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}v.onmessage=C=>T(C.data)}return v};function D(C){const te=!v,ne=I();te&&ne?.postMessage({world:g(),found:[...d.found],ids:[],step:Za}),ne?.postMessage({detail:C})}function z(){const C=g(),te=[...d.found],ne=u.find(Te=>Te.id===(o.selected??d.voyages.at(-1)?.to??"home"))??u[0],se=Yl(u.filter(Te=>!Te.outline&&!E.has(Te.id)),ne);if(!se.length){y&&(clearInterval(y),y=null);return}I()?.postMessage({world:C,found:te,ids:se,step:Za,cacheOnly:n}),n&&!y&&(y=setInterval(z,4e3))}function L(){const C=new Set(p?["home",...Wr]:gu(d)),te=new Set(d.won),ne=g(),se=(ke,De,Fe)=>{const Qe=Zc(ke,ne),ze=Jr(ke);return{id:ke,x:Qe.x,y:Qe.y,phase:Qc(ke,ne),radii:De,sail:C.has(ke)&&!ze,unknown:ze,won:te.has(ke),sigil:Fe}};u=[se("home",Ro(bo(fu(ne,du(d.found))),ur.map?.coast).radii,Jl("home"))];for(const ke of ia)u.push(se(ke,Ro(bo(Qr(ke,ne)),ur.islands?.coast).radii,ke));o.set(u,d.voyages),E.clear(),x(),z();const Te=d.found.filter(ke=>!Jr(ke)).length;a("status").textContent=`${Te?`${Te} of ${Wr.length} islands found${e.countUncharted?` (and ${ia.length-Wr.length} not yet charted)`:""}`:"wake legends at home to find their islands"}${d.won.length?` · ${d.won.length} won`:""}${e.note?` · ${e.note}`:""}`,a("world").textContent=`World seed: ${ne}${e.world!=null&&e.world!==d.world?" (from the link)":""}`,a("home").href=M("home")}function O(C,te=!1){o.select(C,te),x(),f(C),C&&v&&!u.find(De=>De.id===C)?.outline&&!E.has(C)&&v.postMessage({first:C}),C&&!n&&!(E.get(C)??u.find(De=>De.id===C)?.outline)?.detail&&D(C);const ne=u.find(De=>De.id===C),se=a("card"),Te=a("sail");if(!ne||n){se.hidden=!0;return}se.hidden=!1;const ke=C==="home"?0:Qr(C,g())?.phase??0;a("name").textContent=C==="home"?"Home":ne.unknown?"Uncharted waters":ne.sail?`The ${C}'s island`:"An island not yet found",a("phase").textContent=C==="home"?"the Ent's island, the middle of the world":`phase ${ke}`,a("state").textContent=ne.unknown?"not yet charted":ne.won?"won":ne.sail?C!=="home"&&!d.found.includes(C)?"not found yet: 🧪 testing, you can sail there":d.played.includes(C)?"played, not yet won":"found: you can sail there":"wake its legend to find it",Te.hidden=!r||!ne.sail,Te.href=M(C)}a("sail").addEventListener("click",C=>{C.preventDefault(),A(o.selected)}),a("home").addEventListener("click",C=>{C.preventDefault(),O("home",!0),A("home")}),a("close").addEventListener("click",()=>e.onClose?.());const X=new Map;let q=0,ie=null;n||(l.addEventListener("pointerdown",C=>{if(X.set(C.pointerId,{x:C.clientX,y:C.clientY}),ie={x:C.clientX,y:C.clientY},X.size===2){const[te,ne]=[...X.values()];q=Math.hypot(te.x-ne.x,te.y-ne.y)}},h),l.addEventListener("pointermove",C=>{if(X.has(C.pointerId)&&(X.set(C.pointerId,{x:C.clientX,y:C.clientY}),X.size===2)){const[te,ne]=[...X.values()],se=Math.hypot(te.x-ne.x,te.y-ne.y);q>0&&se>0&&o.zoom(q/se),q=se,ie=null}},h),l.addEventListener("pointerup",C=>{if(o.flying){X.delete(C.pointerId),o.skipFlight();return}const te=X.size===1&&ie&&Math.hypot(C.clientX-ie.x,C.clientY-ie.y)<8;if(X.delete(C.pointerId),X.size<2&&(q=0),!te)return;const ne=o.pick(C.clientX,C.clientY);ne&&ne===o.selected?A(ne):ne&&O(ne)},h),l.addEventListener("pointercancel",C=>{X.delete(C.pointerId),q=0},h),l.addEventListener("wheel",C=>{C.preventDefault(),o.zoom(Math.exp(C.deltaY*.0015))},{passive:!1,...h}),a("zoom-in").addEventListener("click",()=>o.zoom(.75)),a("zoom-out").addEventListener("click",()=>o.zoom(1.33)));const Y=(C,te)=>{const ne=u_(u,o.selected??"home",C,te);ne&&O(ne)},j=C=>{if(o.flying){C.preventDefault(),o.skipFlight();return}if(C.target?.closest?.("input")||C.target?.closest?.("button, a")&&(C.key==="Enter"||C.key===" "))return;const te={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};te[C.key]?(C.preventDefault(),Y(...te[C.key])):C.key==="Enter"||C.key===" "?(C.preventDefault(),A(o.selected)):C.key==="+"||C.key==="="?o.zoom(.8):C.key==="-"||C.key==="_"?o.zoom(1.25):C.key==="Escape"&&e.onClose&&(C.preventDefault(),e.onClose())};n||addEventListener("keydown",j);let ee=0;function Ce(C){const te=[...navigator.getGamepads?.()??[]].find(Fe=>Fe?.connected);if(!te)return;if(ee-=C,o.flying){te.buttons.some(Fe=>Fe.pressed)&&o.skipFlight();return}const ne=Fe=>!!te.buttons[Fe]?.pressed,se=te.axes[0]??0,Te=te.axes[1]??0,ke=ne(15)?1:ne(14)?-1:Math.abs(se)>.5?Math.sign(se):0,De=ne(13)?1:ne(12)?-1:Math.abs(Te)>.5?Math.sign(Te):0;(ke||De)&&ee<=0?(Y(ke,De),ee=.28):!ke&&!De&&(ee=0),ne(0)&&ee<=0&&(A(o.selected),ee=.5),ne(1)&&ee<=0&&e.onClose&&(e.onClose(),ee=.5),ne(4)&&o.zoom(1+C),ne(5)&&o.zoom(1-C*.8)}const ye=a("new-world"),Ke=a("new-seed");a("start-over").addEventListener("click",()=>{Ke.value="",ye.hidden=!1,Ke.focus()});const He=()=>{const C=a("sail-any");C.setAttribute("aria-pressed",String(p)),C.textContent=p?"🧪 Test: sailing anywhere (on)":"🧪 Test: sail anywhere"};He(),a("sail-any").addEventListener("click",()=>{p=!p;try{localStorage.setItem(Kl,p?"1":"0")}catch{}He();const C=o.selected;L(),O(C)}),a("new-cancel").addEventListener("click",()=>{ye.hidden=!0}),a("new-go").addEventListener("click",()=>{confirm("Start over in a new world? This forgets every island you've found and won.")&&(d=mu(pu(Ke.value)),ye.hidden=!0,e.world!=null||e.save?location.search="":(L(),O("home")))});const We=(C,te)=>{if(n&&e.size){const ne=qc;o.resize(e.size.w*ne,e.size.h*ne);return}o.resize(C??(s.clientWidth||i.clientWidth||innerWidth),te??(s.clientHeight||i.clientHeight||innerHeight))};We(),a("status").textContent="charting the sea…";let K=!1;return setTimeout(()=>{K||(L(),O(e.start??d.voyages.at(-1)?.to??"home",!0))},50),{canvas:l,chart:o,islands:()=>u,update(C,te){n||Ce(C),P(),o.frame(C,te)},resize:We,choose:O,dispose(){K=!0,E.clear(),removeEventListener("keydown",j),y&&(clearInterval(y),y=null),v?.terminate(),v=null,c.abort(),n?o.dispose():$c(o),s.remove()}}}export{y_ as $,vn as A,A_ as B,Ie as C,ar as D,Yt as E,mt as F,ua as G,fn as H,L_ as I,dt as J,C_ as K,it as L,lt as M,Mn as N,ps as O,Bn as P,Je as Q,fs as R,Mt as S,ur as T,Ft as U,rt as V,Gt as W,R_ as X,Jh as Y,ht as Z,Es as _,x_ as a,Nu as a0,Iu as a1,yn as a2,Ri as a3,Yo as a4,Tg as a5,D_ as a6,Ro as a7,E_ as a8,Qi as a9,aa,En as ab,Uu as ac,Hl as ad,dg as ae,ir as af,qt as ag,Ig as ah,I_ as ai,uo as aj,jn as ak,xn as al,mf as am,wo as an,N_ as ao,tc as ap,nc as aq,v_ as ar,M_ as as,F_ as at,B as b,Se as c,fa as d,T_ as e,S_ as f,Ju as g,sc as h,rc as i,Ru as j,el as k,b_ as l,B_ as m,Yh as n,w_ as o,U_ as p,Ei as q,P_ as r,O_ as s,St as t,Nn as u,os as v,pu as w,Xt as x,$t as y,ho as z};
