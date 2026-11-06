// Native pixels, centered on the game billboard and standing on the same ground.
// No height normalization, translation search, scaling, or perceptual verdict.
export function compareSilhouettes(a,b){
  const left=Math.max(Math.floor(a.w/2),Math.floor(b.w/2)),right=Math.max(a.w-Math.floor(a.w/2),b.w-Math.floor(b.w/2));
  const w=left+right,h=Math.max(a.h,b.h),mask=new Uint8Array(w*h);
  let overlap=0,union=0,shipped=0,graph=0;
  for(const [sprite,bit]of [[a,1],[b,2]]){
    const dx=left-Math.floor(sprite.w/2),dy=h-sprite.h;
    for(let y=0;y<sprite.h;y++)for(let x=0;x<sprite.w;x++)if(sprite.m[y*sprite.w+x])mask[(y+dy)*w+x+dx]|=bit;
  }
  for(const bit of mask){if(bit)union++;if(bit===3)overlap++;if(bit&1)shipped++;if(bit&2)graph++;}
  return {w,h,mask,score:{iou:union?overlap/union:1,precision:graph?overlap/graph:0,recall:shipped?overlap/shipped:0,overlap,union,shipped,graph,alignment:"native billboard centre/ground; no rescale or alignment search"}};
}
