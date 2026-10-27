// node m7a.cjs <out dir>: mock 7 step 1, the treatments (fox, four ranks): 12 frames of the sheet (frames/sheet-NN.png).
const http=require("http"),fs=require("fs"),path=require("path");let playwright;try{playwright=require("playwright")}catch{playwright=require("/opt/node22/lib/node_modules/playwright")}
const root="/home/user/dial",OUT=path.resolve(process.argv[2]);fs.mkdirSync(path.join(OUT,"frames"),{recursive:true});const BG=fs.readFileSync(path.join(__dirname,"../m3bg/dial-0.png")).toString("base64");
(async()=>{const server=http.createServer((q,r)=>{const u=decodeURIComponent(new URL(q.url,"http://x").pathname);if(u==="/"){r.writeHead(200,{"Content-Type":"text/html"});r.end("<!doctype html><body></body>");return}const f=/^\/m\d\w*\.js$/.test(u)?path.join(__dirname,u):path.join(root,u);if(!fs.existsSync(f)){r.writeHead(404);r.end();return}r.writeHead(200,{"Content-Type":f.endsWith(".js")?"text/javascript":"application/octet-stream"});fs.createReadStream(f).pipe(r)});await new Promise(r=>server.listen(0,"127.0.0.1",r));
const b=await playwright.chromium.launch();const p=await b.newPage();p.on("pageerror",e=>console.log("pageerror",e.message));
await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.addScriptTag({type:"module",content:"await import('/m7page.js');window.R=1"});await p.waitForFunction(()=>window.R);
await p.evaluate(async BG=>{window.bg=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src="data:image/png;base64,"+BG})},BG);
const NF=12;for(let f=0;f<NF;f++){const url=await p.evaluate(([f,NF])=>{const {T,render,put}=window.M7,bg=window.bg,keys=Object.keys(T),rowH=132,c=document.createElement("canvas");c.width=1180;c.height=keys.length*rowH+40;const g=c.getContext("2d");g.fillStyle="#0c0a14";g.fillRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;
 g.fillStyle="#ddd";g.font="14px sans-serif";g.fillText("Magical sigils, 6 treatments (fox): baby · youth · adult · legend, zoomed (left) and at play zoom on lit grass ×2 (right; the glyph ~22 art px, 4.2 m, on the 4.8 m grid)",10,20);
 keys.forEach((k,i)=>{const K=T[k],y0=34+i*rowH;g.fillStyle="#eee";g.font="bold 12px sans-serif";g.fillText(K.label,10,y0+10);g.fillStyle="#aaa";g.font="11px sans-serif";g.fillText(K.note,10,y0+rowH-6);
  for(let r=0;r<4;r++){const R=render(k,"fox",r,f/NF,64);put(g,R,60+r*120,y0+62,1.4)}
  g.drawImage(bg,330,330,280,50,560,y0+16,560,100);
  for(let r=0;r<4;r++){const R=render(k,"fox",r,f/NF,36,9.8/15.7);put(g,R,630+r*135,y0+64,2)}});
 return c.toDataURL()},[f,NF]);fs.writeFileSync(path.join(OUT,"frames",`sheet-${String(f).padStart(2,"0")}.png`),Buffer.from(url.split(",")[1],"base64"))}
console.log("frames done");await b.close();server.close()})().catch(e=>{console.error(e);process.exit(1)});
