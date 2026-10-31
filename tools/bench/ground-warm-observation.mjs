export function groundReuseObservation(target, observation) {
  const live=observation?.firstDraw;
  if(!live)return {status:'WAIT',reason:'Arrival plain ground has not submitted a real draw'};
  if(!live.boundProgramConfirmed)return {status:'FAIL',reason:'Actual bound ground program was not confirmed'};
  if(live.seed!==target.seed||live.island!==target.id)return {status:'FAIL',reason:'Arrival identity differs'};
  if(!target.keys.includes(live.key)||!target.programs.includes(live.program))return {status:'FAIL',reason:'Drawn normal ground did not reuse the retained key/id'};
  const matching=live.registry.filter(p=>p.key===live.key);
  if(matching.length!==1||matching[0].id!==live.program||matching[0].usedTimes<2)return {status:'FAIL',reason:'Renderer registry does not retain both warm and live references to the same program'};
  return {status:'PASS',reason:'First actual plain-ground draw uses the retained registry program'};
}

// Browser-side callback: installed only by the allocated diagnostic probe, never by the game.
export function observeArrivalGround(target) {
  const w=window.witch,renderer=w.view.renderer;
  const registry=()=>renderer.info.programs.map(p=>({id:p.id,key:p.cacheKey,usedTimes:p.usedTimes}));
  const state={beforeSail:registry(),firstDraw:null,drawCalls:0,fallbackDraws:0};
  const original=renderer.renderBufferDirect;
  renderer.renderBufferDirect=function(camera,scene,geometry,material,object,group){
    const ground=w.view.ground,game=w.game;
    const groundObject=object===ground.mesh||object.parent===ground.mesh;
    const arrival=game.seed===target.seed&&game.map.island?.kind===target.id&&groundObject;
    const assigned=Array.isArray(object.material)?object.material.includes(material):object.material===material;
    const beforeCalls=renderer.info.render.calls;
    const beforeRegistry=arrival&&!state.firstDraw?registry():null;
    const result=original.call(this,camera,scene,geometry,material,object,group);
    // Shader gates can suppress a renderBufferDirect call. Count the renderer's real submission only.
    if(arrival&&!state.firstDraw&&renderer.info.render.calls>beforeCalls){
      // A draw gate outside this observer may already have substituted its fallback.
      if(!assigned){state.fallbackDraws++;return result;}
      const props=renderer.properties.get(material),program=props.currentProgram,gl=renderer.getContext();
      // The existing draw gate can draw a different fallback material. Verify the program
      // actually bound by that draw; CURRENT_PROGRAM is state, not a compile/uniform/log query.
      if(!program?.program||gl.getParameter(gl.CURRENT_PROGRAM)!==program.program){state.fallbackDraws++;return result;}
      state.drawCalls++;
      if(!state.firstDraw){
        state.firstDraw={at:performance.now(),frame:renderer.info.render.frame,readiness:{...w.view.readiness},island:game.map.island.kind,seed:game.seed,mesh:object.uuid,material:material.uuid,normalMaterial:ground.programMaterial.uuid,plain:material===ground.programMaterial,groundChild:object!==ground.mesh,defines:{...material.defines},customProgramCacheKey:material.customProgramCacheKey?.(),key:program.cacheKey,program:program.id,boundProgramConfirmed:true,materialKeys:[...(props.programs?.keys()??[])],beforeRegistry,registry:registry(),beforeCalls,afterCalls:renderer.info.render.calls};
      }
    }
    return result;
  };
  window.__groundWarmArrival=state;
}
