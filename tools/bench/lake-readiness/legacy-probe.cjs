// Exact readiness observer extracted from the existing Intel lake comparison driver.
const bootProbe=()=>{
  localStorage.setItem('witch.chart.sailAnywhere','1');window.__intel={links:[],frames:[],events:[]};
  window.__travelProbe={record(e){window.__intel.events.push(e);const v=window.witch?.view;for(const p of v?.renderer.info.programs||[]){const r=window.__intel.links.find(r=>r.object===p.program);if(r){r.id=p.id;r.name=p.name;}}}};
  let prior;const tick=t=>{if(prior!==undefined)window.__intel.frames.push({at:t,ms:t-prior});prior=t;requestAnimationFrame(tick);};requestAnimationFrame(tick);
  for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]){
    const original=proto.linkProgram;proto.linkProgram=function(p){const start=performance.now(),value=original.call(this,p);const ext=this.getExtension('KHR_parallel_shader_compile'),r={object:p,at:start,linkCallMs:performance.now()-start,parallel:!!ext,readyAt:null};window.__intel.links.push(r);
      if(ext){const gl=this;const poll=()=>{if(gl.isContextLost())return;if(gl.getProgramParameter(p,ext.COMPLETION_STATUS_KHR))r.readyAt=performance.now();else setTimeout(poll,20);};setTimeout(poll,0);}return value;};
  }
};
module.exports={bootProbe};
