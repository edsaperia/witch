// node m7b.cjs <out dir>: mock 7 step 2, the top 2 (circle, stars): floor (12 on the 4.8 m grid), stack with the moon row, the adult moment.
// Frames to <out>/frames/<name>-NN.png (12 a loop), then ffmpeg makes the GIFs.
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(path.join(OUT,"frames"),{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
const KEYS=(process.env.KEYS||"circle,stars").split(",");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m7page.js');window.R=1"});await p.waitForFunction(()=>window.R);
await p.evaluate(async BG=>{window.bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG})},BG);
const save=(name,url)=>fs.writeFileSync(path.join(OUT,name),Buffer.from(url.split(",")[1],"base64"));
const NF=12;
for(const key of KEYS)for(let f=0;f<NF;f++){const shots=await p.evaluate(([key,f,NF])=>{const {render,put,moons,mix,css,RANK}=window.M7,bg=window.bg,t=f/NF,out={},PXM=15.7/3,SQ=9.8/15.7,GRID=4.8;
 const canvas=(w,h)=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.imageSmoothingEnabled=false;return [c,g]};
 // floor
 { const [o,og]=canvas(320,180);const cx=160,cy=116;
  const place=[[-1,0,"snail",1],[0,0,"fox",2],[1,0,"bear",3],[2,0,"snail",0],[-2,1,"bear",1],[-1,1,"fox",0],[0,1,"snail",2],[1,1,"bear",2],[-2,2,"fox",3],[-1,2,"bear",0],[0,2,"fox",1],[1,2,"snail",1]];
  place.forEach(([q,r,id,rank],i)=>{const x=cx+GRID*(q+r/2)*PXM,y=cy+GRID*Math.sqrt(3)/2*r*PXM*SQ;put(og,render(key,id,rank,(t+i*.137)%1,36,SQ),x,y)});
  const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out.floorFull=c.toDataURL();const [z,zg]=canvas(960,480);zg.drawImage(c,300,290,360,180,0,0,960,480);out.floor=z.toDataURL()}
 // stack: baby, light youth 2/5, normal youth ready, strong youth 8/15, adult, legend
 { const [o,og]=canvas(320,180);const rows=[["snail",0],["snail",1,5,2],["fox",1,7,7,true],["bear",1,15,8],["fox",2],["bear",3]];
  rows.forEach(([id,r,n,filled,ready],i)=>{const y=80-i*15,x=159,R=render(key,id,r,(t+i*.21)%1,r===0?15:18);put(og,R,x,y);if(n)moons(og,x,y,6,n,filled,{ready})});
  const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out.stackFull=c.toDataURL();const [z,zg]=canvas(900,780);zg.drawImage(c,330,0,300,260,0,0,900,780);out.stack=z.toDataURL()}
 return out},[key,f,NF]);
 const nn=String(f).padStart(2,"0");save(`frames/${key}-floor-${nn}.png`,shots.floor);save(`frames/${key}-stack-${nn}.png`,shots.stack);if(f===3){save(`${key}-floor-playzoom.png`,shots.floorFull);save(`${key}-stack-playzoom.png`,shots.stackFull)}}
// the adult moment (normal youth, strong youth): ready → moons slide in → flare (white) → adult, ×5 strip and a 16-frame GIF
for(const key of KEYS){const shots=await p.evaluate(key=>{const {render,put,moons}=window.M7,out={},K=5;
 const frame=(id,n,ph,t)=>{const [c,g]=[document.createElement("canvas"),null];c.width=120;c.height=24;const x=c.getContext("2d");x.imageSmoothingEnabled=false;
  if(ph<.25)put(x,render(key,id,1,t,18),60,12),moons(x,60,12,6,n,n,{ready:Math.sin(t*12)>0});
  else if(ph<.5)put(x,render(key,id,1,t,18),60,12),moons(x,60,12,6,n,n,{fuse:(ph-.25)*4*.6+.1});
  else if(ph<.7){put(x,render(key,id,3,t,22),60,12)}else put(x,render(key,id,2,t,18),60,12);return c};
 const steps=[.1,.38,.6,.85];const [s,sg]=[document.createElement("canvas"),null];s.width=4*130*K;s.height=2*30*K;const g=s.getContext("2d");g.fillStyle="#0c0a14";g.fillRect(0,0,s.width,s.height);g.imageSmoothingEnabled=false;
 [["fox",7],["bear",15]].forEach(([id,n],ri)=>steps.forEach((ph,ci)=>{const c=frame(id,n,ph,.3);g.drawImage(c,ci*130*K,ri*30*K+15,c.width*K,c.height*K)}));out.strip=s.toDataURL();
 out.gif=[];for(let f=0;f<16;f++){const ph=f/16,c=document.createElement("canvas");c.width=120*4;c.height=60*4;const x=c.getContext("2d");x.fillStyle="#0c0a14";x.fillRect(0,0,c.width,c.height);x.imageSmoothingEnabled=false;
  [["fox",7],["bear",15]].forEach(([id,n],ri)=>{const fr=frame(id,n,ph,f/16);x.drawImage(fr,0,ri*30*4+12,fr.width*4,fr.height*4)});out.gif.push(c.toDataURL())}
 return out},key);
 save(`${key}-adult-moment.png`,shots.strip);shots.gif.forEach((u,i)=>save(`frames/${key}-adult-${String(i).padStart(2,"0")}.png`,u))}
console.log("done");await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
