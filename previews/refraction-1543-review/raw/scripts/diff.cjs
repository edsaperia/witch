// pixel diff two PNG buffers in a browser canvas; returns stats and an 8x amplified diff PNG buffer
async function diff(browser,a,b,amp=8){
 const pg=await browser.newPage();
 const r=await pg.evaluate(async({a,b,amp})=>{
  const load=async s=>{const im=await createImageBitmap(await (await fetch('data:image/png;base64,'+s)).blob());const c=new OffscreenCanvas(im.width,im.height);const x=c.getContext('2d');x.drawImage(im,0,0);return x.getImageData(0,0,im.width,im.height);};
  const A=await load(a),B=await load(b); const W=A.width,H=A.height; if(W!==B.width||H!==B.height) return {error:'size'};
  const out=new ImageData(W,H); let n=0,max=0,sum=0,minx=W,miny=H,maxx=-1,maxy=-1,blackA=0,blackB=0;
  for(let i=0;i<W*H;i++){let d=0,s=0;for(let k=0;k<3;k++){const e=Math.abs(A.data[i*4+k]-B.data[i*4+k]);d=Math.max(d,e);s+=e;}
   if(A.data[i*4]+A.data[i*4+1]+A.data[i*4+2]===0)blackA++; if(B.data[i*4]+B.data[i*4+1]+B.data[i*4+2]===0)blackB++;
   sum+=s/3; if(d>0){n++;max=Math.max(max,d);const x=i%W,y=(i/W)|0;minx=Math.min(minx,x);maxx=Math.max(maxx,x);miny=Math.min(miny,y);maxy=Math.max(maxy,y);}
   for(let k=0;k<3;k++)out.data[i*4+k]=Math.min(255,Math.abs(A.data[i*4+k]-B.data[i*4+k])*amp); out.data[i*4+3]=255;}
  const c=new OffscreenCanvas(W,H);c.getContext('2d').putImageData(out,0,0);const bl=await c.convertToBlob({type:'image/png'});
  const buf=new Uint8Array(await bl.arrayBuffer());let bin='';for(let i=0;i<buf.length;i+=32768)bin+=String.fromCharCode.apply(null,buf.subarray(i,i+32768));
  return {w:W,h:H,differing:n,pct:+(100*n/(W*H)).toFixed(4),maxChannel:max,meanAbs:+(sum/(W*H)).toFixed(5),bounds:n?[minx,miny,maxx,maxy]:null,blackPctA:+(100*blackA/(W*H)).toFixed(2),blackPctB:+(100*blackB/(W*H)).toFixed(2),png:btoa(bin)};
 },{a:a.toString('base64'),b:b.toString('base64'),amp});
 await pg.close(); const png=r.png?Buffer.from(r.png,'base64'):null; delete r.png; return {stats:r,png};
}
module.exports={diff};
