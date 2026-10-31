const {chromium}=require('playwright'),fs=require('fs');const raw='/home/user/witch/previews/refraction-1543-review/raw/';
(async()=>{const b=await chromium.launch();const pg=await b.newPage();const out={};
const load=p=>fs.readFileSync(raw+p).toString('base64');
for(const [k,a,c,box] of JSON.parse(process.argv[2])){ out[k]=await pg.evaluate(async({a,c,box})=>{const ld=async s=>{const im=await createImageBitmap(await (await fetch('data:image/png;base64,'+s)).blob());const cv=new OffscreenCanvas(im.width,im.height);const x=cv.getContext('2d');x.drawImage(im,0,0);return x.getImageData(0,0,im.width,im.height);};
 const A=await ld(a),B=await ld(c);let n=0,mx=0,tot=0,nOut=0;const [x0,y0,x1,y1]=box;for(let y=0;y<A.height;y++)for(let x=0;x<A.width;x++){const i=(y*A.width+x)*4;let d=0;for(let k=0;k<3;k++)d=Math.max(d,Math.abs(A.data[i+k]-B.data[i+k]));const inb=x>=x0&&x<=x1&&y>=y0&&y<=y1;if(inb){tot++;if(d){n++;mx=Math.max(mx,d);}}else if(d)nOut++;}
 return {box,inBoxPx:tot,inBoxDiff:n,inBoxMax:mx,outsideBoxDiff:nOut};},{a:load(a),c:load(c),box}); console.log(k,JSON.stringify(out[k]));}
fs.writeFileSync(raw+'box-diffs.json',JSON.stringify(out,null,1));await b.close();})();
