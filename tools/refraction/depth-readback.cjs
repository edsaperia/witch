// Allocated-page diagnostic only: preserve exact sampled float32 depth bits and execute the current product UV selector.
function decodeDepthBits(bytes){
 if(bytes.length%4)throw Error('Incomplete float32 depth bytes');
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),values=[],bits=[];
 for(let i=0;i<bytes.length;i+=4){const value=view.getFloat32(i,false);if(!Number.isFinite(value)||value<0||value>1)throw Error('Invalid depth sample');values.push(value);bits.push(view.getUint32(i,false));}
 return {values,bits};
}
function neighbourhood(frame,x,y){
 if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=frame.width||y>=frame.height)throw Error('Invalid depth cell');
 const cells=[];for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const cx=Math.max(0,Math.min(frame.width-1,x+dx)),cy=Math.max(0,Math.min(frame.height-1,y+dy)),i=cy*frame.width+cx;cells.push({dx,dy,x:cx,y:cy,depth:frame.values[i],bits:frame.bits[i]});}return cells;
}
function inspectDepthPoints(frame,points){
 const rect=frame.canvasRect;if(!rect||!(rect.width>0&&rect.height>0))throw Error('Need actual canvas rectangle');
 return points.map(({x,y})=>{
  const u=(x+.5-rect.left)/rect.width,v=1-(y+.5-rect.top)/rect.height;
  if(u<0||u>=1||v<0||v>=1)throw Error('Screenshot sample outside canvas');
  const cx=Math.floor(u*frame.width),cy=Math.floor(v*frame.height),source=frame.sourceCells[cy*frame.width+cx];
  return {screen:{x,y},destination:{cell:[cx,cy],uv:[(cx+.5)/frame.width,(cy+.5)/frame.height],neighbours:neighbourhood(frame,cx,cy)},source:{cell:source,uv:[(source[0]+.5)/frame.width,(source[1]+.5)/frame.height],neighbours:neighbourhood(frame,...source)},displacement:[source[0]-cx,source[1]-cy],supportStates:frame.states,domain:'Base quantized scene coordinate; final potion/tilt sampling is separate'};
 });
}
async function readHeldDepth(root=window){
 const w=root.witch,v=w.view,p=v.post,r=v.renderer,target=p.sceneTarget;
 if(!root.__refractionCaptureHold)throw Error('Require a held foreground frame');
 if(!target?.depthTexture||!p.quad||!p.cam||!p.mats?.composite)throw Error('Depth diagnostic capability missing');
 const before={time:w.game.clock.time,personal:w.game.herTime,target:r.getRenderTarget(),viewport:r.getViewport(p.pool.clone()),scissor:r.getScissor(p.pool.clone()),scissorTest:r.getScissorTest()};
 const output=target.clone();output.depthTexture=null;output.depthBuffer=false;output.stencilBuffer=false;
 output.texture.type=1009;output.texture.format=1023;output.texture.colorSpace='';output.texture.minFilter=1003;output.texture.magFilter=1003;output.texture.generateMipmaps=false;
 const material=new p.mats.composite.constructor({vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
 fragmentShader:'uniform sampler2D uDepth;varying vec2 vUv;void main(){ivec2 size=textureSize(uDepth,0);ivec2 cell=clamp(ivec2(floor(vUv*vec2(size))),ivec2(0),size-1);uint n=floatBitsToUint(texelFetch(uDepth,cell,0).r);gl_FragColor=vec4(float((n>>24u)&255u),float((n>>16u)&255u),float((n>>8u)&255u),float(n&255u))/255.;}',
 uniforms:{uDepth:{value:target.depthTexture}},depthTest:false,depthWrite:false,blending:0,toneMapped:false});
 const quad=p.quad.clone(false);quad.material=material;quad.frustumCulled=false;
 try{
  r.setRenderTarget(output);r.setViewport(0,0,output.width,output.height);r.setScissorTest(false);r.render(quad,p.cam);
  const bytes=new Uint8Array(output.width*output.height*4);r.readRenderTargetPixels(output,0,0,output.width,output.height,bytes);
  const view=new DataView(bytes.buffer),values=[],bits=[];
  for(let i=0;i<bytes.length;i+=4){const value=view.getFloat32(i,false);if(!Number.isFinite(value)||value<0||value>1)throw Error('Invalid GPU depth bits');values.push(value);bits.push(view.getUint32(i,false));}
  if(!values.some(x=>x>0)||!values.some(x=>x<1))throw Error('Uniform clear/invalid depth image');
  const u=p.mats.composite.uniforms,original=p.mats.composite.fragmentShader,cut=original.indexOf('float edgeLuma');
  if(cut<0||output.width!==u.uLow.value.x||output.height!==u.uLow.value.y)throw Error('Unexpected composite/readback layout');
  material.fragmentShader=original.slice(0,cut)+'\nvoid main(){vec2 p=(floor(vUv*uLow)+.5)/uLow;vec2 at=refractScene(p);uvec2 c=uvec2(floor(at*uLow));gl_FragColor=vec4(float((c.x>>8u)&255u),float(c.x&255u),float((c.y>>8u)&255u),float(c.y&255u))/255.;}';
  material.uniforms={...u};material.needsUpdate=true;r.render(quad,p.cam);r.readRenderTargetPixels(output,0,0,output.width,output.height,bytes);
  const sourceCells=[];for(let i=0;i<bytes.length;i+=4){const x=bytes[i]*256+bytes[i+1],y=bytes[i+2]*256+bytes[i+3],j=i/4,dx=x-j%output.width,dy=y-Math.floor(j/output.width);if(x>=output.width||y>=output.height||Math.abs(dx)>2||Math.abs(dy)>2||u.uRefractionCount.value===0&&(dx||dy))throw Error('Invalid GPU source-cell map');sourceCells.push([x,y]);}
  if(w.game.clock.time!==before.time||w.game.herTime!==before.personal)throw Error('Depth readback advanced held clock');
  const rect=r.domElement.getBoundingClientRect();
  return {width:output.width,height:output.height,origin:'bottom-left',canvasRect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},devicePixelRatio:root.devicePixelRatio,format:'sampled float32 bit patterns from existing depth texture, not re-quantized DEPTH24',values,bits,sourceCells,low:u.uLow.value.toArray(),count:u.uRefractionCount.value,shapes:p.refraction.shapes.slice(0,p.refraction.count).map(x=>x.toArray()),states:p.refraction.states.slice(0,p.refraction.count).map(x=>x.toArray()),time:before.time,personal:before.personal,limitation:'GPU bit/UV round-trip still requires allocated runtime validation; source code alone is not foreground acceptance.'};
 }finally{r.setRenderTarget(before.target);r.setViewport(before.viewport);r.setScissor(before.scissor);r.setScissorTest(before.scissorTest);material.dispose();output.dispose();}
}
module.exports={decodeDepthBits,neighbourhood,inspectDepthPoints,readHeldDepth};
