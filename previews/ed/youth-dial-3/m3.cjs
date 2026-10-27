// node m3.cjs <out dir>: berry dial mock 3 frames (honeycomb, gem). Serves art/ from DIAL root, the page library m3page.js, the background.
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(OUT,{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body style='margin:0;background:#101018'></body>");return}const f=u==="/m3page.js"?path.join(__dirname,"m3page.js"):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));p.on("console",m=>console.log("console",m.text()));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m3page.js');window.M3ready=1"});await p.waitForFunction(()=>window.M3ready);
const shots=await p.evaluate(async BG=>{const {S,SP,drawUnit,glyph,crisp,stackSprite,mix,css}=window.M3,out={};
 const bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const canvas=(w,h,fill="#101018")=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.fillStyle=fill;g.fillRect(0,0,w,h);g.imageSmoothingEnabled=false;return [c,g]};
 const label=(g,t,x,y,s=13)=>{g.fillStyle="#ddd";g.font=`${s}px sans-serif`;g.fillText(t,x,y)};
 const states=n=>[["0",{filled:0}],["half",{filled:Math.floor(n/2)}],["full, ready (pulse)",{filled:n,ready:true}],["adult",{adult:true}]];
 for(const concept of ["honeycomb","gem"]){
  // 1. design sheet: vector at 120 px, then the floor sigil at its play-zoom art size and the stack, each ×6
  { const PX=120,cw=PX+20;const [c,g]=canvas(4*cw+40,3*(PX+150)+40);label(g,`${concept}: 0 · half · full = ready (pulse) · adult, vector (top), play-zoom art pixels ×3 (floor, stack)`,10,18);
   SP.forEach(([id,n,tier],ri)=>{const y0=34+ri*(PX+150);label(g,`${tier}: ${n} cells + 1 last berry = ${n+1}`,10,y0+10,12);
    states(n).forEach(([nm,st],ci)=>{const x=10+ci*cw,y=y0+18;g.save();g.translate(x+PX/2,y+PX/2);const R=PX/2*.98;g.scale(R,R);
     if(st.ready){g.shadowColor=css(S.sigilColour(id));g.shadowBlur=18;}drawUnit(g,concept,id,n,st,S.sigilColour(id),glyph(id));g.restore();
     const fl=crisp(concept,id,n,st,20,.62);g.drawImage(fl,x,y+PX+6,fl.width*3,fl.height*3);
     const sk=stackSprite(concept,id,n,st);g.drawImage(sk,x+66,y+PX+6,sk.width*3,sk.height*3);
     if(!ri)label(g,nm,x,y0+150+PX-4,11)})});
   out[`${concept}-design.png`]=c.toDataURL()}
  // 2. fuse: ready → 1/3 → 2/3 → adult
  { const PX=110,cw=PX+50;const [c,g]=canvas(4*cw+20,3*(PX+90)+30);label(g,`${concept}: the last berry fuses the pieces into the adult's solid frame (ready, fuse 1/3, 2/3, adult); under each, the floor and the stack at play-zoom art pixels ×2`,10,18,12);
   SP.forEach(([id,n],ri)=>{const y=30+ri*(PX+90);[{filled:n,ready:true},{filled:n,fuse:.35},{filled:n,fuse:.7},{adult:true}].forEach((st,ci)=>{const x=10+ci*cw;g.save();g.translate(x+PX/2,y+PX/2);g.scale(PX/2*.98,PX/2*.98);drawUnit(g,concept,id,n,st,S.sigilColour(id),glyph(id));g.restore();
     const fl=crisp(concept,id,n,st,20,.62);g.drawImage(fl,x,y+PX+4,fl.width*2,fl.height*2);const sk=stackSprite(concept,id,n,st);g.drawImage(sk,x,y+PX+fl.height*2+10,sk.width*2,sk.height*2)})});
   out[`${concept}-fuse.png`]=c.toDataURL()}
  // 3. play zoom: placed sigils tiling on the leash hex grid south of her, and the stack over her head, on the game's frame
  // (measured from the game at zoom step 3: 15.7 screen px a metre across, 9.8 down; the hex grid's size 4 m; the stack's column at x 478,
  // a sigil every 14 art px; the art pixel 3 screen px)
  { const [o,og]=canvas(320,180,"rgba(0,0,0,0)");og.clearRect(0,0,320,180);
   const PXM=15.7/3,SQ=9.8/15.7,size=4,cx=160,cy=118;
   const place=[[-1,0,"snail",0,{filled:1}],[0,0,"fox",1,{filled:6,ready:true}],[1,0,"bear",2,{adult:true}],[2,0,"snail",0,{filled:3,ready:true}],
    [-2,1,"bear",2,{filled:6}],[-1,1,"fox",1,{filled:3}],[0,1,"snail",0,{adult:true}],[1,1,"bear",2,{filled:12,ready:true}],
    [-2,2,"fox",1,{adult:true}],[-1,2,"bear",2,{filled:0}],[0,2,"fox",1,{filled:0}],[1,2,"bear",2,{filled:11}]];
   const ns={snail:3,fox:6,bear:12};
   for(const [q,r,id,_,st] of place){const x=cx+size*(q+r/2)*PXM,y=cy+size*Math.sqrt(3)/2*r*PXM*SQ;const fl=crisp(concept,id,ns[id],st,Math.round(3.9*PXM),SQ);og.drawImage(fl,Math.round(x-fl.width/2),Math.round(y-fl.height/2))}
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`${concept}-floor-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(320*3,150*3);zg.drawImage(c,320,315,320,150,0,0,960,450);out[`${concept}-floor-zoomin.png`]=z.toDataURL()}
  { const [o,og]=canvas(320,180,"rgba(0,0,0,0)");og.clearRect(0,0,320,180);
   const stack=[["snail",3,{filled:1}],["fox",6,{filled:6,ready:true}],["bear",12,{filled:7}],["fox",6,{adult:true}]];
   stack.forEach(([id,n,st],i)=>{const sk=stackSprite(concept,id,n,st);const hx=159,hy=58-i*14;og.drawImage(sk,hx-5,hy-Math.round(sk.height/2))});
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`${concept}-stack-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(200*4,220*4);zg.drawImage(c,420,10,200,220,0,0,800,880);out[`${concept}-stack-zoomin.png`]=z.toDataURL()}
 }
 return out},BG);
for(const [k,v] of Object.entries(shots)){fs.writeFileSync(path.join(OUT,k),Buffer.from(v.split(",")[1],"base64"));console.log("wrote",k)}
await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
