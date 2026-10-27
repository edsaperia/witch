// node m5b.cjs <out dir>: mock 5 step 2, the top 3 (metal, moonplate, hatmetal): design sheet, the floor at play zoom (12 on the hex
// grid at GRID m, sigils SIG m across), the stack with the both-sides berry bar.
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(OUT,{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
const GRID=+(process.env.GRID||4.8),SIG=+(process.env.SIG||4.7);
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m5page.js');window.R=1"});await p.waitForFunction(()=>window.R);
const shots=await p.evaluate(async([BG,GRID,SIG])=>{const {S,C,drawRank,crisp,mix,css,PLATE,WHITE}=window.M5,out={};const bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const canvas=(w,h,fill="#0c0a14")=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");if(fill){g.fillStyle=fill;g.fillRect(0,0,w,h)}g.imageSmoothingEnabled=false;return [c,g]};
 const label=(g,t,x,y,s=13)=>{g.fillStyle="#ddd";g.font=`${s}px sans-serif`;g.fillText(t,x,y)};
 const PXM=15.7/3,SQ=9.8/15.7,RANKS=["baby","youth","adult","legend"],SPECIES=[["snail","light"],["fox","normal"],["bear","strong"]],N={snail:5,fox:7,bear:15};
 const BERRY=["...s.","..s..",".###.","#####","#####",".###."];
 // a stack row: the rank head (crisp, upright) and, for a youth, the both-sides berry bar; returns {c, cx, cy}
 const stackRow=(key,id,r,filled,ready)=>{const head=crisp(key,id,r,13,1,.85),n=N[id],per=Math.ceil(n/2),sideW=r===1?per*6+1:0,W=head.width+2*sideW,H=Math.max(head.height,8);
  const [c,g]=canvas(W,H,null);const hx=sideW;g.drawImage(head,hx,0);const col=S.sigilColour(id),lit=ready?mix(col,WHITE,.45):col,dim=mix(PLATE,col,.42),cy=Math.floor(head.height/2)+1;
  if(r===1)for(let i=0;i<n;i++){const right=i%2===0,k=i>>1,on=i<filled,colour=on?lit:dim,stem=on?mix(lit,[110,190,80],.5):mix(dim,PLATE,.2),pad=Math.ceil(13*.3)-2,x=right?hx+head.width-pad+k*6:hx+pad-6-k*6;
   BERRY.forEach((row,yy)=>[...row].forEach((ch,xx)=>{if(ch===".")return;g.fillStyle=css(ch==="s"?stem:colour);g.fillRect(x+(right?xx:4-xx),cy-3+yy,1,1)}))}
  return {c,cx:hx+Math.floor(head.width/2)}};
 for(const key of ["metal","moonplate","hatmetal"]){const K=C[key];
  { const PX=110,cw=PX+40;const [c,g]=canvas(4*cw+20,3*(PX+80)+40);label(g,`${K.label}: ${K.note}. Vector, then at play zoom (${SIG} m, ~${Math.round(SIG*PXM)} art px) ×3 on grass`,10,18,12);
   SPECIES.forEach(([id,tier],ri)=>{const y=34+ri*(PX+80);label(g,`${tier} (${id})`,10,y+8,11);RANKS.forEach((nm,r)=>{const x=10+r*cw;if(!ri)label(g,nm,x+PX/2-14,30,12);g.save();g.translate(x+PX/2,y+PX/2+10);g.scale(PX/2*.75,PX/2*.75);drawRank(g,key,id,r);g.restore();
    g.drawImage(bg,330,350,40,20,x+10,y+PX+14,120,60);const s=crisp(key,id,r,Math.round(SIG*PXM),SQ);g.drawImage(s,x+70-s.width*1.5,y+PX+44-s.height*1.5,s.width*3,s.height*3)})});
   out[`${key}-design.png`]=c.toDataURL()}
  { const [o,og]=canvas(320,180,null);const cx=160,cy=116;
   const place=[[-1,0,"snail",1],[0,0,"fox",2],[1,0,"bear",3],[2,0,"snail",0],[-2,1,"bear",1],[-1,1,"fox",0],[0,1,"snail",2],[1,1,"bear",2],[-2,2,"fox",3],[-1,2,"bear",0],[0,2,"fox",1],[1,2,"snail",1]];
   for(const [q,r,id,rank] of place){const x=cx+GRID*(q+r/2)*PXM,y=cy+GRID*Math.sqrt(3)/2*r*PXM*SQ;const f=crisp(key,id,rank,Math.round(SIG*PXM),SQ);og.drawImage(f,Math.round(x-f.width/2),Math.round(y-f.height/2))}
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`${key}-floor-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(960,480);zg.drawImage(c,300,290,360,180,0,0,960,480);out[`${key}-floor-zoomin.png`]=z.toDataURL()}
  { const [o,og]=canvas(320,180,null);
   [["snail",0,0],["snail",1,2],["bear",1,8],["fox",2,0],["bear",3,0]].forEach(([id,r,f,ready],i)=>{const {c:s,cx}=stackRow(key,id,r,f,ready);og.drawImage(s,159-cx,72-i*15-Math.floor(s.height/2))});
   const [c,g]=canvas(960,540);g.drawImage(bg,0,0);g.drawImage(o,0,0,960,540);out[`${key}-stack-playzoom.png`]=c.toDataURL();
   const [z,zg]=canvas(900,750);zg.drawImage(c,330,0,300,250,0,0,900,750);out[`${key}-stack-zoomin.png`]=z.toDataURL()}
 }
 return out},[BG,GRID,SIG]);
for(const [k,v] of Object.entries(shots))fs.writeFileSync(path.join(OUT,k),Buffer.from(v.split(",")[1],"base64"));console.log(Object.keys(shots).join(" "));await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
