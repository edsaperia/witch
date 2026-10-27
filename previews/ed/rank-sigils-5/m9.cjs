// node m9.cjs <out dir>: mock 9 (Ed: "the colour can transition smoothly turquoise/purple/red from baby to adult", "moon phases filling
// middle outwards", an even number a side). Frames to <out>/frames, stills to <out>; ffmpeg makes the GIFs.
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(path.join(OUT,"frames"),{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m9page.js');window.R=1"});await p.waitForFunction(()=>window.R);
await p.evaluate(async BG=>{window.bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const {RANK,mix,css,render,put}=window.M7,PLATE=[10,8,18],WHITE=[255,255,255];
 // growth t: baby 0 (turquoise), a fresh youth .5 (purple), adult 1 (red); a youth that has eaten f of its n moons: .5 + .5 f/(n+1) (ready: red-violet; the last berry takes it to red)
 const T0=RANK[0],T1=RANK[1],T2=RANK[2],grad=t=>t<=.5?mix(T0,T1,t/.5):mix(T1,T2,(t-.5)/.5),youthT=(f,n)=>.5+.5*f/(n+1);
 const PH={0:[".#...","#....","#....","#....",".#..."],1:[".##..","##...","#....","##...",".##.."],2:[".##..","###..","###..","###..",".##.."],3:[".###.","####.","####.","####.",".###."]};
 // the moon row: n moons (even), n/2 a side; moon i (alternating right, left, outward) stands for growth point i+1; lit middle-out (i < filled);
 // order "full-in" (gibbous by the glyph, crescents at the ends: the reference) or "full-out" (crescents by the glyph, waxing to the ends)
 window.moonRow=(g,cx,cy,hw,n,filled,{order="full-in",ready=false,fuse=0,graded=true}={})=>{const per=n/2,sq=fuse>.1?Math.max(0,1-(fuse-.1)*1.8):1;if(sq<=0)return;
  for(let i=0;i<n;i++){const right=i%2===0,k=i>>1,st=Math.floor(k*4/per),ph=order==="full-in"?3-st:st,col=graded?grad(youthT(i+1,n)):T1,on=i<filled,
   colour=fuse?mix(col,WHITE,.5+fuse*.4):on?(ready?mix(col,WHITE,.4):col):mix(PLATE,col,.3),off=Math.round((1+k*6)*sq),x=right?cx+hw+off:cx-hw-off-5;
   g.fillStyle=css(colour);PH[Math.max(0,Math.min(3,ph))].forEach((row,yy)=>[...row].forEach((ch,xx)=>{if(ch==="#")g.fillRect(x+(right?xx:4-xx),cy-2+yy,1,1)}))}};
 window.headCol=(r,f,n)=>r===0?T0:r===1?grad(youthT(f,n)):r===2?T2:RANK[3];
 Object.assign(window,{grad,youthT});
},BG);
const save=(name,url)=>fs.writeFileSync(path.join(OUT,name),Buffer.from(url.split(",")[1],"base64"));
const NF=12;
// 1. the stack, both phase orders: baby, light youth half (2/4), normal youth ready (6/6), strong youth half (7/14), adult, legend
for(const order of ["full-in","full-out"])for(let f=0;f<NF;f++){const sh=await p.evaluate(([order,f,NF])=>{const {render,put}=window.M7,bg=window.bg,t=f/NF;
 const canvas=(w,h)=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.imageSmoothingEnabled=false;return [c,g]};
 const [o,og]=canvas(320,180);const rows=[["snail",0],["snail",1,4,2],["fox",1,6,6,true],["bear",1,14,7],["fox",2],["bear",3]];
 rows.forEach(([id,r,n,fl,ready],i)=>{const y=84-i*15,x=159,col=window.headCol(r,fl,n);put(og,render("embers",id,r,(t+i*.21)%1,r===0?15:18,1,ready?window.M7.mix(col,[255,255,255],.25*(1+Math.sin(t*6.28))):col),x,y);if(n)window.moonRow(og,x,y,6,n,fl,{order,ready:ready&&Math.sin(t*6.28)>0})});
 const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);const [z,zg]=canvas(900,780);zg.drawImage(c,330,0,300,260,0,0,900,780);return {full:c.toDataURL(),zoom:z.toDataURL()}},[order,f,NF]);
 save(`frames/stack-${order}-${String(f).padStart(2,"0")}.png`,sh.zoom);if(f===3){save(`stack-${order}-playzoom.png`,sh.full);save(`stack-${order}-zoomin.png`,sh.zoom)}}
// 2. a normal youth eating from 0 to ready, the last berry, adult (both orders side by side), 24 frames; and a strip of its steps
for(let f=0;f<24;f++){const url=await p.evaluate(f=>{const {render,put,mix}=window.M7,c=document.createElement("canvas");c.width=150*2*4;c.height=40*4;const g=c.getContext("2d");g.fillStyle="#0c0a14";g.fillRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;
 const n=6;["full-in","full-out"].forEach((order,oi)=>{const x0=document.createElement("canvas");x0.width=150;x0.height=40;const x=x0.getContext("2d");x.imageSmoothingEnabled=false;
  let st;if(f<14)st={r:1,fl:Math.min(n,Math.floor(f/2))};else if(f<16)st={r:1,fl:n,ready:true};else if(f<19)st={r:1,fl:n,fuse:(f-15)/4};else if(f<20)st={r:4};else st={r:2};
  const col=st.r===4?[255,255,255]:window.headCol(st.r,st.fl,n),rr=st.r===4?4:st.r;put(x,render("embers","fox",rr,(f/24)%1,18,1,st.ready&&f%2?mix(col,[255,255,255],.35):col),75,22);
  if(st.r===1)window.moonRow(x,75,22,6,n,st.fl,{order,ready:st.ready&&f%2===0,fuse:st.fuse||0});g.drawImage(x0,oi*150*4,0,150*4,40*4);
  g.fillStyle="#ccc";g.font="13px sans-serif";g.fillText(order==="full-in"?"full by the glyph (reference)":"crescents by the glyph, waxing outward",oi*600+10,152)});return c.toDataURL()},f);
 save(`frames/grow-${String(f).padStart(2,"0")}.png`,url)}
// 3. the strong comparison (14 vs 16 moons, both orders, half and ready), and the floor: four rank colours vs the in-between youth colours
{const url=await p.evaluate(()=>{const {render,put}=window.M7,K=5,c=document.createElement("canvas");c.width=1400;c.height=4*90+40;const g=c.getContext("2d");g.fillStyle="#0c0a14";g.fillRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;g.fillStyle="#ddd";g.font="13px sans-serif";g.fillText("Strong youth: 14 moons (15 berries) vs 16 moons (17), half and ready, both phase orders. Play-zoom art pixels ×4",10,18);
 [["full-in",14],["full-in",16],["full-out",14],["full-out",16]].forEach(([order,n],ri)=>{[n/2,n].forEach((fl,ci)=>{const x0=document.createElement("canvas");x0.width=150;x0.height=24;const x=x0.getContext("2d");x.imageSmoothingEnabled=false;put(x,render("embers","bear",1,.3,18,1,window.headCol(1,fl,n)),75,12);window.moonRow(x,75,12,6,n,fl,{order});g.drawImage(x0,10+ci*680,34+ri*90,150*4,24*4)});g.fillStyle="#aaa";g.fillText(`${order}, ${n} moons`,10,34+ri*90+8)});return c.toDataURL()});save("strong-14-vs-16.png",url)}
for(const mode of ["ranks","fade"]){const url=await p.evaluate(mode=>{const {render,put,RANK}=window.M7,bg=window.bg,PXM=15.7/3,SQ=9.8/15.7,GRID=6,c=document.createElement("canvas");c.width=320;c.height=180;const og=c.getContext("2d");og.imageSmoothingEnabled=false;const cx=160,cy=116;
 const place=[[-1,0,"snail",1,1],[0,0,"fox",2],[1,0,"bear",3],[2,0,"snail",0],[-2,1,"bear",1,10],[-1,1,"fox",0],[0,1,"snail",2],[1,1,"bear",2],[-2,2,"fox",3],[-1,2,"bear",0],[0,2,"fox",1,5],[1,2,"snail",1,3]];
 place.forEach(([q,r,id,rank,fl],i)=>{const n={snail:4,fox:6,bear:14}[id],x=cx+GRID*(q+r/2)*PXM,y=cy+GRID*Math.sqrt(3)/2*r*PXM*SQ,col=mode==="fade"?window.headCol(rank,fl,n):RANK[rank];put(og,render("embers",id,rank,(.3+i*.137)%1,44,SQ,col),x,y)});
 const f=document.createElement("canvas");f.width=960;f.height=540;const g=f.getContext("2d");g.imageSmoothingEnabled=false;g.drawImage(bg,0,0);g.drawImage(c,0,0,960,540);const z=document.createElement("canvas");z.width=960;z.height=540;const zg=z.getContext("2d");zg.imageSmoothingEnabled=false;zg.drawImage(f,260,250,440,248,0,0,960,540);return z.toDataURL()},mode);save(`floor-${mode}-zoomin.png`,url)}
console.log("done");await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
