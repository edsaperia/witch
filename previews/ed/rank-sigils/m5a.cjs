// node m5a.cjs <out dir>: mock 5 step 1, the concept thumbnails (fox, four ranks, vector + play size on grass).
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(OUT,{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m5page.js');window.R=1"});await p.waitForFunction(()=>window.R);
const shots=await p.evaluate(async BG=>{const {C,drawRank,crisp}=window.M5,out={};const bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG});
 const keys=Object.keys(C),PX=78,cellW=4*(PX+12)+250,rowH=PX+44,cols=2;const c=document.createElement("canvas");c.width=cols*cellW+20;c.height=Math.ceil(keys.length/cols)*rowH+40;const g=c.getContext("2d");g.fillStyle="#0c0a14";g.fillRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;
 g.fillStyle="#ddd";g.font="14px sans-serif";g.fillText("Rank sigils, 12 concepts (fox): baby · youth · adult · legend. Right: the four at play zoom on lit grass (4.75 m, ~25 art px, ×2)",10,20);
 keys.forEach((k,i)=>{const K=C[k],x0=10+(i%cols)*cellW,y0=34+Math.floor(i/cols)*rowH;g.fillStyle="#eee";g.font="bold 12px sans-serif";g.fillText(K.label,x0,y0+10);g.fillStyle="#aaa";g.font="11px sans-serif";g.fillText(K.note,x0,y0+rowH-8);
  for(let r=0;r<4;r++){g.save();g.translate(x0+r*(PX+12)+PX/2,y0+16+PX/2-4);g.scale(PX/2*.78,PX/2*.78);drawRank(g,k,"fox",r);g.restore()}
  const gx=x0+4*(PX+12)+6,gy=y0+16;g.drawImage(bg,330,330,120,30,gx,gy,240,60);
  for(let r=0;r<4;r++){const s=crisp(k,"fox",r,25,9.8/15.7);const ox=Math.round(gx/2+r*29+4),oy=Math.round(gy/2+15);g.drawImage(s,0,0,s.width,s.height,gx+r*58+8-0,gy+30-s.height,s.width*2,s.height*2)}});
 out["concepts.png"]=c.toDataURL();return out},BG);
for(const [k,v] of Object.entries(shots))fs.writeFileSync(path.join(OUT,k),Buffer.from(v.split(",")[1],"base64"));console.log(Object.keys(shots));await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
