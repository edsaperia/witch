// Separate diagnostic GPU queries for individual renderer passes; never nested in whole-frame timing.
function installPassTimer(renderer, gl, ext) {
  const render=renderer.render;let queries=[];
  renderer.render=function(scene,...args){
    if(gl.getQuery(ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY))throw Error('Per-pass diagnostic cannot nest GPU queries');
    const q=gl.createQuery();if(!q)throw Error('Per-pass GPU query allocation failed');
    const target=this.getRenderTarget?.(),record={pass:queries.length,scene:scene.name||scene.type||'unnamed',target:target?[target.width,target.height]:null,q};
    queries.push(record);gl.beginQuery(ext.TIME_ELAPSED_EXT,q);
    try{return render.call(this,scene,...args);}finally{gl.endQuery(ext.TIME_ELAPSED_EXT);}
  };
  const clear=()=>{for(const record of queries)gl.deleteQuery(record.q);queries=[];};
  return {
    async collect(wait){
      try{gl.flush();for(const record of queries){let polls=0;while(!gl.getQueryParameter(record.q,gl.QUERY_RESULT_AVAILABLE)){if(++polls>120)throw Error('Per-pass GPU query deadline');await wait();}}
        if(gl.getParameter(ext.GPU_DISJOINT_EXT))throw Error('Disjoint per-pass GPU diagnostic');
        return queries.map(({q,...record})=>{const gpuMs=gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6;if(!Number.isFinite(gpuMs)||gpuMs<0)throw Error('Invalid per-pass GPU time');return {...record,gpuMs};});
      }finally{clear();}
    },
    restore(){renderer.render=render;clear();}
  };
}
module.exports={installPassTimer};
