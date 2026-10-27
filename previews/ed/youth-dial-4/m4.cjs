// node m4.cjs <out dir>: berry dial mock 4 frames (stack bars: berry, moon, vine; floor rank circles: chalk, wreath).
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(OUT,{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body style='margin:0;background:#101018'></body>");return}const f=u==="/m4page.js"?path.join(__dirname,"m4page.js"):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));p.on("console",m=>console.log("console",m.text()));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m4page.js');window.M4ready=1"});await p.waitForFunction(()=>window.M4ready);
const shots=await p.evaluate(async BG=>{const {S,drawFloor,crispFloor,stackSprite,mix,css}=window.M4,out={};
 const bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const canvas=(w,h,fill="#0c0a14")=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");if(fill){g.fillStyle=fill;g.fillRect(0,0,w,h)}g.imageSmoothingEnabled=false;return [c,g]};
 const label=(g,t,x,y,s=13)=>{g.fillStyle="#ddd";g.font=`${s}px sans-serif`;g.fillText(t,x,y)};
 const TIERS=[["snail",5,"light: 5 pieces + 1 last berry = 6"],["fox",7,"normal: 7 + 1 = 8"],["bear",15,"strong: 15 + 1 = 16"]];
 const RANKS=["baby","youth","adult","legend"];
 // the game's frame: stack column x 159 art px, bottom sigil at y 58, one every 14; floor: 15.7 screen px a metre across, 9.8 down
 const PXM=15.7/3,SQ=9.8/15.7;
 for(const bar of ["berry","moon","vine"]){
  { const K=6;const [c,g]=canvas(1480,3*200+40);label(g,`stack bar "${bar}": 0 · half · full = ready (pulse peak) · adult, then the fuse: ready → white-hot → folding in → ring → adult. Play-zoom art pixels ×${K}`,10,18);
   TIERS.forEach(([id,n,t],ri)=>{const y=34+ri*200;label(g,t,10,y+10,12);
    [{filled:0},{filled:Math.floor(n/2)},{filled:n,ready:true},{adult:true}].forEach((st,ci)=>{const s=stackSprite(bar,id,n,st);g.drawImage(s,10+ci*(n>8?370:300),y+20,s.width*K,s.height*K)});
    [{filled:n,ready:true},{filled:n,fuse:.2},{filled:n,fuse:.55},{filled:n,fuse:.8},{adult:true}].forEach((st,ci)=>{const s=stackSprite(bar,id,n,st);g.drawImage(s,10+ci*230,y+120,s.width*3,s.height*3)});
    if(!ri){label(g,"fuse (×3):",10,y+114,11)}});
   out[`stack-${bar}-design.png`]=c.toDataURL()}
  { const [o,og]=canvas(320,180,null);
   [["snail",5,{filled:2}],["fox",7,{filled:7,ready:true}],["bear",15,{filled:8}],["fox",7,{adult:true}]].forEach(([id,n,st],i)=>{const s=stackSprite(bar,id,n,st);og.drawImage(s,159-6,58-i*14-7)});
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`stack-${bar}-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(260*3,220*3);zg.drawImage(c,420,10,260,220,0,0,780,660);out[`stack-${bar}-zoomin.png`]=z.toDataURL()}
 }
 for(const style of ["chalk","wreath"]){
  { const PX=120,cw=PX+24;const [c,g]=canvas(4*cw+20,3*(PX+70)+40);label(g,`floor "${style}": the rank only (baby · youth · adult · legend), vector, and at play zoom ×3 underneath`,10,18);
   ["snail","fox","bear"].forEach((id,ri)=>{const y=32+ri*(PX+70);RANKS.forEach((nm,rank)=>{const x=10+rank*cw;g.save();g.translate(x+PX/2,y+PX/2);g.scale(PX/2*.82,PX/2*.82);drawFloor(g,style,id,rank);g.restore();
     const f=crispFloor(style,id,rank,Math.round(3.9*PXM),SQ);g.drawImage(f,x+20,y+PX+4,f.width*3,f.height*3);if(!ri)label(g,nm,x+PX/2-16,y-2,12)})});
   out[`floor-${style}-design.png`]=c.toDataURL()}
  for(const [tag,m] of [["",3.9],["-todaysize",4.75]]){ const [o,og]=canvas(320,180,null);const size=4,cx=160,cy=118;
   const place=[[-1,0,"snail",0],[0,0,"fox",1],[1,0,"bear",2],[2,0,"snail",3],[-2,1,"bear",1],[-1,1,"fox",2],[0,1,"snail",1],[1,1,"bear",3],[-2,2,"fox",0],[-1,2,"bear",2],[0,2,"fox",3],[1,2,"snail",2]];
   for(const [q,r,id,rank] of place){const x=cx+size*(q+r/2)*PXM,y=cy+size*Math.sqrt(3)/2*r*PXM*SQ;const f=crispFloor(style,id,rank,Math.round(m*PXM),SQ);og.drawImage(f,Math.round(x-f.width/2),Math.round(y-f.height/2))}
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);if(!tag)out[`floor-${style}-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(960,450);zg.drawImage(c,320,315,320,150,0,0,960,450);out[`floor-${style}${tag}-zoomin.png`]=z.toDataURL()}
 }
 return out},BG);
for(const [k,v] of Object.entries(shots)){fs.writeFileSync(path.join(OUT,k),Buffer.from(v.split(",")[1],"base64"))}console.log(Object.keys(shots).join(" "));
await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
