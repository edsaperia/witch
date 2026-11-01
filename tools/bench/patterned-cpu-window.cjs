// A one-second CPU sample is steady timing evidence only when its entire phase interval agrees.
function isSteadyWindow(startPhase,startEpoch,endPhase,endEpoch){
  return startPhase==='measurement'&&endPhase==='measurement'&&Number.isInteger(startEpoch)&&startEpoch===endEpoch;
}
module.exports={isSteadyWindow};
