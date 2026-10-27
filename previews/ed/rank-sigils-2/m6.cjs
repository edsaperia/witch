// node m6.cjs <out dir>: mock 6 frames: the moon-phase stack, the floor ranked by colour (moon disc, ring + glyph, hat), the adult moment.
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(OUT,{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
const GRID=4.8,SIG=4.7;
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m6page.js');window.R=1"});await p.waitForFunction(()=>window.R);
const shots=await p.evaluate(async([BG,GRID,SIG])=>{const {RANK,FLOOR,crispFloor,stackRow,mix,css}=window.M6,out={};const bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const canvas=(w,h,fill="#0c0a14")=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");if(fill){g.fillStyle=fill;g.fillRect(0,0,w,h)}g.imageSmoothingEnabled=false;return [c,g]};
 const label=(g,t,x,y,s=13)=>{g.fillStyle="#ddd";g.font=`${s}px sans-serif`;g.fillText(t,x,y)};
 const PXM=15.7/3,SQ=9.8/15.7,N={snail:5,fox:7,bear:15},RANKS=["baby","youth","adult","legend"];
 // stack sheet ×5: light/normal/strong youths at 0, half, ready (fill inward), plus the outward order for comparison; baby, adult, legend heads; the adult moment
 { const K=5;const [c,g]=canvas(1500,820);label(g,"Moon-phase stack: the sigil is the full moon, a moon per berry, crescents at the ends waxing toward it. Play-zoom art pixels ×5",10,18);
  label(g,"rank colours: baby dim silver · youth pale moon-blue · adult warm gold · legend white-hot + rays",10,36,12);
  [["snail","light"],["fox","normal"],["bear","strong"]].forEach(([id,t],ri)=>{const y=56+ri*120,n=N[id];label(g,`${t} youth (${n} + 1)`,10,y+10,12);
   [[0,"0"],[Math.floor(n/2),"half (filled inward)"],[n,"ready (pulse peak)"]].forEach(([f,nm],ci)=>{const {c:s}=stackRow(id,1,{n,filled:f,ready:f===n});g.drawImage(s,10+ci*490,y+20,s.width*K,s.height*K);if(!ri)label(g,nm,10+ci*490,y+14+K*0,11)});
  });
  { const y=56+3*120;label(g,"half, filled OUTWARD instead (from the sigil out):",10,y+10,12);[["snail",5],["fox",7],["bear",15]].forEach(([id,n],ci)=>{const {c:s}=stackRow(id,1,{n,filled:Math.floor(n/2),order:"out"});g.drawImage(s,10+ci*490,y+20,s.width*K,s.height*K)}) }
  { const y=56+4*120;label(g,"the other ranks' heads in the stack: baby (smaller, dim silver), adult (gold), legend (white-hot, rays)",10,y+10,12);[["snail",0],["fox",2],["bear",3]].forEach(([id,r],ci)=>{const {c:s}=stackRow(id,r);g.drawImage(s,10+ci*200,y+20,s.width*K,s.height*K)}) }
  out["stack-design.png"]=c.toDataURL()}
 { const K=5;const [c,g]=canvas(1500,520);label(g,"The adult moment (normal, strong): ready → the moons slide in → the full moon flares → adult (gold)",10,18);
  [["fox",7],["bear",15]].forEach(([id,n],ri)=>{const y=40+ri*230;let x=10;const k=ri?3:K;[{filled:n,ready:true},{filled:n,fuse:.35},{filled:n,fuse:.65},{filled:n,fuse:.85},null].forEach((st,ci)=>{const {c:s}=st?stackRow(id,1,{n,...st}):stackRow(id,2);g.drawImage(s,x,y+20,s.width*k,s.height*k);x+=s.width*k+30})});
  out["adult-moment.png"]=c.toDataURL()}
 { const [o,og]=canvas(320,180,null);
  const rows=[["snail",0,{}],["snail",1,{n:5,filled:2}],["fox",1,{n:7,filled:7,ready:true}],["bear",1,{n:15,filled:8}],["fox",2,{}],["bear",3,{}]];
  rows.forEach(([id,r,st],i)=>{const {c:s,cx}=stackRow(id,r,st);og.drawImage(s,159-cx,74-i*14-Math.floor(s.height/2))});
  const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out["stack-playzoom.png"]=c.toDataURL();
  const [z,zg]=canvas(900,780);zg.drawImage(c,330,0,300,260,0,0,900,780);out["stack-zoomin.png"]=z.toDataURL()}
 for(const style of Object.keys(FLOOR)){const F=FLOOR[style];
  { const PX=110,cw=PX+40;const [c,g]=canvas(4*cw+20,3*(PX+80)+40);label(g,`Floor ${F.label}: ${F.note}`,10,18,12);
   [["snail","light"],["fox","normal"],["bear","strong"]].forEach(([id,t],ri)=>{const y=34+ri*(PX+80);label(g,t,10,y+8,11);RANKS.forEach((nm,r)=>{const x=10+r*cw;if(!ri)label(g,nm,x+PX/2-14,30,12);g.save();g.translate(x+PX/2,y+PX/2+10);g.scale(PX/2*.75,PX/2*.75);g.fillStyle="#0c0914";g.beginPath();g.arc(0,0,r===0?.82:1.02,0,7);g.fill();F.draw(g,id,r);g.restore();
    g.drawImage(bg,330,350,40,20,x+10,y+PX+14,120,60);const s=crispFloor(style,id,r,Math.round(SIG*PXM),SQ);g.drawImage(s,x+70-s.width*1.5,y+PX+44-s.height*1.5,s.width*3,s.height*3)})});
   out[`floor-${style}-design.png`]=c.toDataURL()}
  { const [o,og]=canvas(320,180,null);const cx=160,cy=116;
   const place=[[-1,0,"snail",1],[0,0,"fox",2],[1,0,"bear",3],[2,0,"snail",0],[-2,1,"bear",1],[-1,1,"fox",0],[0,1,"snail",2],[1,1,"bear",2],[-2,2,"fox",3],[-1,2,"bear",0],[0,2,"fox",1],[1,2,"snail",1]];
   for(const [q,r,id,rank] of place){const x=cx+GRID*(q+r/2)*PXM,y=cy+GRID*Math.sqrt(3)/2*r*PXM*SQ;const f=crispFloor(style,id,rank,Math.round(SIG*PXM),SQ);og.drawImage(f,Math.round(x-f.width/2),Math.round(y-f.height/2))}
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`floor-${style}-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(960,480);zg.drawImage(c,300,290,360,180,0,0,960,480);out[`floor-${style}-zoomin.png`]=z.toDataURL()}}
 return out},[BG,GRID,SIG]);
for(const [k,v] of Object.entries(shots))fs.writeFileSync(path.join(OUT,k),Buffer.from(v.split(",")[1],"base64"));console.log(Object.keys(shots).join(" "));await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
