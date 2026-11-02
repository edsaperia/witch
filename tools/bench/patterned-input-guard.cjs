// Input/aggregate CPU only; no browser enumeration, window/profile access or process control.
const os=require('node:os'),{execFileSync}=require('node:child_process');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function cpu(){const a=os.cpus();await sleep(1000);let idle=0,total=0;os.cpus().forEach((c,i)=>{idle+=c.times.idle-a[i].times.idle;for(const k in c.times)total+=c.times[k]-a[i].times[k];});const percent=100*(1-idle/total);if(!(total>0)||!Number.isFinite(percent)||percent<0||percent>100)throw Error('CPU telemetry unavailable');return {at:new Date().toISOString(),percent};}

function quietPolicy(state,ownedPid,previous){
 if(!state||!Number.isFinite(state.idleMs)||state.idleMs<0)throw Error('Input telemetry unavailable');
 return {at:state.at,idleMs:state.idleMs,method:'input-only-record',inputChanged:!!previous&&(state.idleMs<previous.idleMs||state.lastInputTick!==previous.lastInputTick)};
}
function laptopState(){
 const script=`$ErrorActionPreference='Stop'; Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class VeilInput { [StructLayout(LayoutKind.Sequential)] public struct Last { public uint size; public uint time; } [DllImport("user32.dll")] public static extern bool GetLastInputInfo(ref Last x); public static uint Stamp() { Last x = new Last(); x.size = (uint)Marshal.SizeOf(x); if (!GetLastInputInfo(ref x)) throw new Exception("Last input unavailable"); return x.time; } public static uint Idle(uint stamp) { return unchecked((uint)Environment.TickCount-stamp); } }'; $taskStamp=[VeilInput]::Stamp(); @{at=[DateTime]::UtcNow.ToString('o');idleMs=[VeilInput]::Idle($taskStamp);lastInputTick=$taskStamp}|ConvertTo-Json -Compress`;
 return JSON.parse(execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',script],{encoding:'utf8',windowsHide:true,timeout:10000}));
}
module.exports={cpu,quietPolicy,laptopState};
