// Read-only Windows idle/browser proof for an allocated smoke-veil run. No work on import.
const os=require('node:os'),{execFileSync}=require('node:child_process');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function cpu(){const a=os.cpus();await sleep(1000);let idle=0,total=0;os.cpus().forEach((c,i)=>{idle+=c.times.idle-a[i].times.idle;for(const k in c.times)total+=c.times[k]-a[i].times[k];});const percent=100*(1-idle/total);if(!(total>0)||!Number.isFinite(percent)||percent<0||percent>100)throw Error('CPU telemetry unavailable');return {at:new Date().toISOString(),percent};}
function quietPolicy(state,ownedPid,previous){
  if(!state||!Number.isFinite(state.idleMs)||state.idleMs<300000||!Array.isArray(state.processes)||!state.processes.length||state.processes.some(p=>typeof p.Name!=='string'||!Number.isInteger(p.ProcessId)||!Number.isInteger(p.ParentProcessId))||state.processInventoryComplete!==true)throw Error('Cannot prove five-minute input idle and complete browser-process inventory');
  if(previous&&state.idleMs<previous.idleMs)throw Error('Ed returned: stop at this safe checkpoint');
  const owned=new Set(ownedPid?[ownedPid]:[]);
  for(let changed=true;changed;){changed=false;for(const p of state.processes)if(owned.has(p.ParentProcessId)&&!owned.has(p.ProcessId)){owned.add(p.ProcessId);changed=true;}}
  const external=state.processes.filter(p=>/^(chrome|chromium|msedge|firefox|brave|opera|vivaldi|iexplore|headless_shell)\.exe$/i.test(p.Name)&&!owned.has(p.ProcessId));
  if(external.length)throw Error('No-Ed-game-tab proof unavailable: external browser processes exist; cannot inspect their tabs. Fail closed without closing them.');
  return {at:state.at,idleMs:state.idleMs,method:'complete-process-inventory/no-external-browser',externalBrowserCount:0,ownedBrowserPid:ownedPid??null};
}
function laptopState(){
  const script=`$ErrorActionPreference='Stop'; Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class PatternedInput { [StructLayout(LayoutKind.Sequential)] public struct Last { public uint size; public uint time; } [DllImport("user32.dll")] public static extern bool GetLastInputInfo(ref Last x); public static uint Idle() { Last x = new Last(); x.size = (uint)Marshal.SizeOf(x); if (!GetLastInputInfo(ref x)) throw new Exception("Last input unavailable"); return unchecked((uint)Environment.TickCount - x.time); } }'; $taskIdle=[PatternedInput]::Idle(); $taskProcesses=@(Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,Name); @{at=[DateTime]::UtcNow.ToString('o');idleMs=$taskIdle;processes=$taskProcesses;processInventoryComplete=$true}|ConvertTo-Json -Depth 4 -Compress`;
  return JSON.parse(execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',script],{encoding:'utf8',windowsHide:true,timeout:10000}));
}

module.exports={cpu,quietPolicy,laptopState};
