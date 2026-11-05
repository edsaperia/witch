// Analyze saved actor-removal masks without inferring opacity or changing a capture's acceptance threshold.
import {actorMask, diffPixels} from './pixels.mjs';
export function maskCoverage(off, on, absent, {threshold = 24, envelope = null, points = []} = {}) {
  const mask = actorMask(off, absent, threshold, envelope), measured = diffPixels(off, on, {mask});
  const contrastHistogram = Array(256).fill(0);
  for(let i=0;i<mask.length;i++)if(mask[i]){let d=0;for(let c=0;c<4;c++)d=Math.max(d,Math.abs(off.data[i*4+c]-absent.data[i*4+c]));contrastHistogram[d]++;}
  const samples=points.map(({x,y})=>{
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=off.width||y>=off.height)throw Error('Sample outside image');
    const at=(y*off.width+x)*4,rgba=image=>[...image.data.subarray(at,at+4)];
    return {x,y,off:rgba(off),on:rgba(on),absent:rgba(absent),included:!!mask[y*off.width+x],actorContrast:Math.max(...rgba(off).map((v,c)=>Math.abs(v-rgba(absent)[c])))};
  });
  return {threshold,maskPixels:measured.considered,changedPixels:measured.count,maxChange:measured.max,bounds:measured.bounds,contrastHistogram,samples,opacityProven:false,interpretation:'Actor-removal contrast only. Composited image alpha and RGB difference cannot establish sprite coverage or opacity. This analysis never changes the strict zero-change criterion.'};
}
