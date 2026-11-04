// Acceptance coverage is actor-written front depth, not final postprocessed colour contrast.
function depthCoverage(off, absent, width, height, dilation = 1) {
  if(off.width!==absent.width||off.height!==absent.height||off.bits.length!==off.width*off.height||absent.bits.length!==off.bits.length)throw Error('Incompatible depth maps');
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||dilation!==1)throw Error('Require screenshot size and one-screen-pixel dilation');
  const rect=off.canvasRect,scale=off.devicePixelRatio??1;
  if(!rect||!(rect.width>0&&rect.height>0&&scale>0))throw Error('Missing canvas mapping');
  const base=Buffer.alloc(width*height),mask=Buffer.alloc(width*height);
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const u=((x+.5)/scale-rect.left)/rect.width,v=1-((y+.5)/scale-rect.top)/rect.height;
    if(u<0||u>=1||v<0||v>=1)continue;
    const i=Math.floor(v*off.height)*off.width+Math.floor(u*off.width);
    // Positive finite float32 depth bit patterns preserve ordering. Equal depth is not coverage.
    if(off.bits[i]!==absent.bits[i]&&off.values[i]<absent.values[i])base[y*width+x]=1;
  }
  for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(base[y*width+x])for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
    const xx=x+dx,yy=y+dy;if(xx>=0&&xx<width&&yy>=0&&yy<height)mask[yy*width+xx]=1;
  }
  return {base,mask};
}
module.exports={depthCoverage};
