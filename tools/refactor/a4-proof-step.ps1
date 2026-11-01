# Finite allocated A4 proof step: idle/browser preflight, own process-tree exclusion, separate stop reasons, <=270 s watchdog.
# powershell -File tools/refactor/a4-proof-step.ps1 -Step typecheck -GrantComment 6549116028 -PreviousDoneComment <actual1543id> -ExpectedSha <sha> -EvidenceDir <localpath>
param(
  [Parameter(Mandatory=$true)][ValidateSet('typecheck','unit-shard-1','unit-shard-2','unit-shard-3','unit-shard-4','build','bench-quick','compare')][string]$Step,
  [Parameter(Mandatory=$true)][ValidatePattern('^[0-9]{10,}$')][string]$GrantComment,
  [Parameter(Mandatory=$true)][ValidatePattern('^[0-9]{10,}$')][string]$PreviousDoneComment,
  [Parameter(Mandatory=$true)][ValidatePattern('^[a-f0-9]{40}$')][string]$ExpectedSha,
  [Parameter(Mandatory=$true)][string]$EvidenceDir,
  [string]$SourceRoot,
  [string]$NodeModulePath,
  [string]$ChromeExecutable
)
$ErrorActionPreference = 'Stop'
$taskOwnerRoot = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$taskRoot = $(if ($SourceRoot) { (Resolve-Path $SourceRoot).Path } else { $taskOwnerRoot })
if ($taskRoot -ne $taskOwnerRoot -and $taskRoot -ne (Join-Path $taskOwnerRoot '.a4-baseline')) { throw 'Only this A4 worktree or its own detached .a4-baseline may be tested.' }
if ((Get-Location).Path -ne $taskRoot) { throw 'Run from the A4 worktree root.' }
$taskHead = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0 -or $taskHead -ne $ExpectedSha) { throw 'Proof source SHA differs from the requested head.' }
# IDs are a durable receipt, not an automatic grant verifier. The operator must
# read both canonical comments and confirm the actual slot order before invocation.
$taskCommands = @{
  'typecheck' = 'npm run typecheck'
  'unit-shard-1' = 'npm test -- --shard=1/4 --maxWorkers=2'
  'unit-shard-2' = 'npm test -- --shard=2/4 --maxWorkers=2'
  'unit-shard-3' = 'npm test -- --shard=3/4 --maxWorkers=2'
  'unit-shard-4' = 'npm test -- --shard=4/4 --maxWorkers=2'
  'build' = 'npm run build'
  'bench-quick' = 'npm run bench:quick'
  'compare' = 'node tools/refactor/a4-proof-artifacts.cjs && node tools/bench/compare.cjs .a4-baseline/bench-out bench-out'
}
New-Item -ItemType Directory -Path $EvidenceDir -Force | Out-Null
$taskEvidence = (Resolve-Path $EvidenceDir).Path
$taskStamp = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss-fff')
$taskPrefix = Join-Path $taskEvidence "$taskStamp-$Step"
$taskReport = [ordered]@{ schema=1; step=$Step; sha=$taskHead; grantComment=$GrantComment; previousDoneComment=$PreviousDoneComment; command=$taskCommands[$Step]; started=[DateTime]::UtcNow.ToString('o'); timeoutMs=270000; status='preflight'; stopReason=$null; inputStop=$false; externalBrowserStop=$false; cpuStop=$false; watchdogStop=$false; processTreeClean=$false }
$taskChild = $null
$taskWatchdog = $null
$taskOriginalWitchSha = $env:WITCH_SHA
$taskOriginalNodePath = $env:NODE_PATH
$taskOriginalNodeOptions = $env:NODE_OPTIONS
$taskOriginalChrome = $env:A4_CHROME
$taskOriginalBrowserLog = $env:A4_BROWSER_LOG
$taskOwned = [System.Collections.Generic.HashSet[int]]::new()
[void]$taskOwned.Add($PID)
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class A4ProofInput {
  [StructLayout(LayoutKind.Sequential)] public struct Last { public uint size; public uint time; }
  [DllImport("user32.dll")] public static extern bool GetLastInputInfo(ref Last value);
  public static uint LastTick() { Last value = new Last(); value.size = (uint)Marshal.SizeOf(value); if (!GetLastInputInfo(ref value)) throw new Exception("Input telemetry unavailable"); return value.time; }
  public static uint Idle(uint last) { return unchecked((uint)Environment.TickCount - last); }
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool GetExitCodeProcess(IntPtr handle, out uint code);
  public static int ExitCode(IntPtr handle) { uint code; if (!GetExitCodeProcess(handle, out code) || code == 259) throw new Exception("Child exit code unavailable"); return unchecked((int)code); }
  [DllImport("kernel32.dll", SetLastError=true)] public static extern bool GetProcessTimes(IntPtr handle, out long created, out long exited, out long kernel, out long user);
  public static long Created(IntPtr handle) { long c,e,k,u; if (!GetProcessTimes(handle,out c,out e,out k,out u)) throw new Exception("Process creation identity unavailable"); return c; }
  public static bool Running(IntPtr handle) { uint code; if (!GetExitCodeProcess(handle,out code)) throw new Exception("Process state unavailable"); return code == 259; }
}
'@
$taskOwnedCreated = [System.Collections.Generic.Dictionary[int,long]]::new()
function Get-A4LiveProcess {
  param([int]$TaskProcessId)
  $taskProcess = Get-Process -Id $TaskProcessId -ErrorAction SilentlyContinue
  if ($null -eq $taskProcess) { return $null }
  try {
    $taskHandle = $taskProcess.Handle
    if (-not [A4ProofInput]::Running($taskHandle)) { return $null }
    return @{ process=$taskProcess; created=[A4ProofInput]::Created($taskHandle) }
  } catch {
    if ($taskProcess.HasExited) { return $null }
    throw
  }
}
function Get-A4ExternalBrowsers {
  param([object[]]$TaskProcesses,[System.Collections.Generic.HashSet[int]]$TaskOwned)
  do {
    $taskAdded = $false
    foreach ($taskProc in $taskProcesses) {
      if ($taskOwned.Contains([int]$taskProc.ParentProcessId) -and $taskOwned.Add([int]$taskProc.ProcessId)) { $taskAdded = $true }
    }
  } while ($taskAdded)
  return @($taskProcesses | Where-Object { $_.Name -match '^(chrome|chromium|msedge|firefox|brave|opera|vivaldi|iexplore|headless_shell)\.exe$' -and -not $taskOwned.Contains([int]$_.ProcessId) })
}
function Read-A4Guard {
  $taskLastTick = [A4ProofInput]::LastTick()
  $taskIdle = [A4ProofInput]::Idle($taskLastTick)
  $taskProcesses = @(Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,Name)
  if ($taskProcesses.Count -eq 0) { throw 'Process inventory unavailable.' }
  $taskExternal = @(Get-A4ExternalBrowsers -TaskProcesses $taskProcesses -TaskOwned $taskOwned)
  foreach ($taskOwnId in @($taskOwned)) {
    if (-not $taskOwnedCreated.ContainsKey($taskOwnId)) {
      $taskLive = Get-A4LiveProcess -TaskProcessId $taskOwnId
      if ($null -ne $taskLive) { $taskOwnedCreated[$taskOwnId]=$taskLive.created }
    }
  }
  # Store only the guard outcome. Do not publish process inventories or window data.
  return @{at=[DateTime]::UtcNow.ToString('o');lastInputTick=$taskLastTick;idleMs=$taskIdle;externalBrowserCount=$taskExternal.Count;ownedProcessCount=$taskOwned.Count}
}
function Stop-A4Owned {
  # The root PID is the only kill target; /T includes this step's descendants.
  if ($null -ne $taskChild -and [A4ProofInput]::Running($taskChildHandle)) {
    # An already exiting child may disappear between the native state read and
    # taskkill. Verify remaining owned identities below; not-found is not a leak.
    $taskOldPreference=$ErrorActionPreference; $ErrorActionPreference='Continue'
    & taskkill.exe /PID $taskChild.Id /T /F 2>&1 | Out-Null
    $ErrorActionPreference=$taskOldPreference
  }
  # Also clean descendants observed before a parent exited, never other processes.
  foreach ($taskOwnedPid in @($taskOwned)) {
    if ($taskOwnedPid -eq $PID) { continue }
    $taskLive = Get-A4LiveProcess -TaskProcessId $taskOwnedPid
    if ($null -ne $taskLive -and $taskOwnedCreated.ContainsKey($taskOwnedPid) -and $taskLive.created -eq $taskOwnedCreated[$taskOwnedPid]) { Stop-Process -InputObject $taskLive.process -Force -ErrorAction SilentlyContinue }
  }
}
$taskStarted = [DateTime]::UtcNow
try {
  $taskBefore = Read-A4Guard
  $taskReport.preflight = $taskBefore
  if ($taskBefore.idleMs -lt 300000) { $taskReport.inputStop=$true; throw 'preflight_input_not_idle' }
  if ($taskBefore.externalBrowserCount -gt 0) { $taskReport.externalBrowserStop=$true; throw 'preflight_external_browser' }
  # The existing laptop drivers use a 70% contamination ceiling. Sample before
  # launch only; never poll this gate during this step's own build/art startup.
  $taskCpuJs = "const os=require('node:os'),a=os.cpus();setTimeout(()=>{let i=0,t=0;os.cpus().forEach((c,n)=>{i+=c.times.idle-a[n].times.idle;for(const k in c.times)t+=c.times[k]-a[n].times[k]});console.log(t>0?100*(1-i/t):-1)},1000)"
  $taskCpu = [double]((& node -e $taskCpuJs).Trim())
  $taskReport.preflightCpuPercent = $taskCpu
  if ([double]::IsNaN($taskCpu) -or [double]::IsInfinity($taskCpu) -or $taskCpu -lt 0 -or $taskCpu -ge 70) { $taskReport.cpuStop=$true; throw 'cpu_prelaunch' }
  if ($Step -eq 'bench-quick') {
    $taskVersion = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'dist/version.json') | ConvertFrom-Json
    if ($taskVersion.version -notlike "*$($ExpectedSha.Substring(0,7))*") { throw 'bench_dist_source_identity_mismatch' }
  }
  if ($Step -in @('bench-quick','compare')) {
    if (-not $NodeModulePath -or -not (Test-Path -LiteralPath (Join-Path $NodeModulePath 'playwright'))) { throw 'playwright_runtime_not_configured' }
    if (-not $ChromeExecutable -or -not (Test-Path -LiteralPath $ChromeExecutable)) { throw 'approved_chrome_not_configured' }
    $env:NODE_PATH = $NodeModulePath
    $env:A4_CHROME = $ChromeExecutable
    $env:A4_BROWSER_LOG = "$taskPrefix.browser.jsonl"
    $taskPreload = Join-Path $PSScriptRoot 'a4-browser-preload.cjs'
    $env:NODE_OPTIONS = (($taskOriginalNodeOptions + ' --require="' + $taskPreload + '"').Trim())
  }
  $taskLaunch = [System.Diagnostics.Stopwatch]::StartNew()
  $env:WITCH_SHA = $ExpectedSha
  $taskChild = Start-Process -FilePath $env:ComSpec -ArgumentList @('/d','/s','/c',$taskCommands[$Step]) -WorkingDirectory $taskRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput "$taskPrefix.stdout.txt" -RedirectStandardError "$taskPrefix.stderr.txt"
  [void]$taskOwned.Add($taskChild.Id)
  $taskChildHandle = $taskChild.Handle
  $taskOwnedCreated[$taskChild.Id] = [A4ProofInput]::Created($taskChildHandle)
  $taskReport.childPid = $taskChild.Id
  $taskHashAlgorithm = [Security.Cryptography.SHA256]::Create()
  try { $taskReport.supervisorSha256 = ([BitConverter]::ToString($taskHashAlgorithm.ComputeHash([IO.File]::ReadAllBytes($PSCommandPath)))).Replace('-','').ToLowerInvariant() } finally { $taskHashAlgorithm.Dispose() }
  # Independent of this loop/CIM: terminate only this exact child's tree at 265 s,
  # leaving a safety margin under the canonical 270 s hard ceiling. A start-time
  # check prevents an exited child's recycled PID from becoming a kill target.
  $taskChildTicks = [A4ProofInput]::Created($taskChildHandle)
  $taskMarker = ("$taskPrefix.watchdog").Replace("'", "''")
  $taskWatchCode = @"
Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class A4Watch { [DllImport("kernel32.dll")] public static extern bool GetProcessTimes(IntPtr h,out long c,out long e,out long k,out long u); public static long Created(IntPtr h){long c,e,k,u;if(!GetProcessTimes(h,out c,out e,out k,out u))throw new Exception("identity unavailable");return c;} }'
Start-Sleep -Seconds 265
`$taskTarget = Get-Process -Id $($taskChild.Id) -ErrorAction SilentlyContinue
if (`$null -ne `$taskTarget) { try { if ([A4Watch]::Created(`$taskTarget.Handle) -eq $taskChildTicks) { [IO.File]::WriteAllText('$taskMarker','watchdog_265s'); & taskkill.exe /PID $($taskChild.Id) /T /F | Out-Null } } catch {} }
"@
  $taskEncoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($taskWatchCode))
  $taskWatchdog = Start-Process -FilePath 'powershell.exe' -ArgumentList @('-NoProfile','-NonInteractive','-EncodedCommand',$taskEncoded) -WindowStyle Hidden -PassThru
  [void]$taskOwned.Add($taskWatchdog.Id)
  $taskOwnedCreated[$taskWatchdog.Id] = [A4ProofInput]::Created($taskWatchdog.Handle)
  $taskReport.status = 'running'
  while (-not $taskChild.HasExited) {
    if ($taskLaunch.ElapsedMilliseconds -ge 270000) { $taskReport.watchdogStop=$true; throw 'watchdog_270s' }
    $taskGuard = Read-A4Guard
    if ($taskGuard.lastInputTick -ne $taskBefore.lastInputTick) { $taskReport.inputStop=$true; throw 'ed_input_returned' }
    if ($taskGuard.externalBrowserCount -gt 0) { $taskReport.externalBrowserStop=$true; throw 'external_browser_appeared' }
    Start-Sleep -Milliseconds 250
    $taskChild.Refresh()
  }
  $taskChild.WaitForExit()
  $taskReport.exitCode = [A4ProofInput]::ExitCode($taskChildHandle)
  $taskReport.elapsedMs = $taskLaunch.ElapsedMilliseconds
  $taskReport.status = $(if ($taskReport.exitCode -eq 0) { 'passed' } else { 'failed' })
  if (Test-Path -LiteralPath "$taskPrefix.watchdog") { $taskReport.watchdogStop=$true; $taskReport.status='stopped'; $taskReport.stopReason='watchdog_265s' }
  if (Test-Path -LiteralPath "$taskPrefix.browser.jsonl") {
    $taskBrowserRows = @(Get-Content -LiteralPath "$taskPrefix.browser.jsonl" | ForEach-Object { $_ | ConvertFrom-Json })
    $taskBrowserStop = @($taskBrowserRows | Where-Object { $_.kind -eq 'stop' } | Select-Object -Last 1)
    if ($taskBrowserStop.Count) { $taskReport.status='stopped'; $taskReport.stopReason=$taskBrowserStop[0].reason; $taskReport.cpuStop=($taskBrowserStop[0].reason -eq 'cpu_measurement') }
  }
} catch {
  $taskReport.status = 'stopped'
  $taskReport.stopReason = $_.Exception.Message
  $taskReport.stopDetails = $_.ScriptStackTrace
} finally {
  try {
  Stop-A4Owned
  $taskReport.temporaryProfilesClean = $true
  if (Test-Path -LiteralPath "$taskPrefix.browser.jsonl") {
    $taskTempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
    $taskProfiles = @(Get-Content -LiteralPath "$taskPrefix.browser.jsonl" | ForEach-Object { $_ | ConvertFrom-Json } | Where-Object { $_.kind -eq 'own-browser' -and $_.profile } | Select-Object -ExpandProperty profile -Unique)
    foreach ($taskProfile in $taskProfiles) {
      $taskResolvedProfile = [IO.Path]::GetFullPath($taskProfile)
      # Resolve and check the exact own Playwright profile, never the temp root.
      if (-not $taskResolvedProfile.StartsWith($taskTempRoot,[StringComparison]::OrdinalIgnoreCase) -or (Split-Path -Leaf $taskResolvedProfile) -notlike 'playwright_chromiumdev_profile-*') { $taskReport.temporaryProfilesClean=$false; continue }
      if (Test-Path -LiteralPath $taskResolvedProfile) { Remove-Item -LiteralPath $taskResolvedProfile -Recurse -Force -ErrorAction SilentlyContinue }
      if (Test-Path -LiteralPath $taskResolvedProfile) { $taskReport.temporaryProfilesClean=$false }
    }
  }
  $taskRemaining = @($taskOwned | Where-Object { $_ -ne $PID } | ForEach-Object {
    $taskLive=Get-A4LiveProcess -TaskProcessId $_
    if ($null -ne $taskLive -and (-not $taskOwnedCreated.ContainsKey($_) -or $taskLive.created -eq $taskOwnedCreated[$_])) { $_ }
  })
  $taskReport.processTreeClean = ($taskRemaining.Count -eq 0)
  if (-not $taskReport.processTreeClean -or -not $taskReport.temporaryProfilesClean) { $taskReport.status='stopped'; if (-not $taskReport.stopReason) { $taskReport.stopReason='cleanup_unverified' } }
  } catch {
    $taskReport.processTreeClean = $false
    $taskReport.status = 'stopped'
    $taskReport.cleanupError = $_.Exception.Message
    if (-not $taskReport.stopReason) { $taskReport.stopReason = 'cleanup_error' }
  }
  $env:WITCH_SHA = $taskOriginalWitchSha
  $env:NODE_PATH = $taskOriginalNodePath
  $env:NODE_OPTIONS = $taskOriginalNodeOptions
  $env:A4_CHROME = $taskOriginalChrome
  $env:A4_BROWSER_LOG = $taskOriginalBrowserLog
  $taskReport.finished = [DateTime]::UtcNow.ToString('o')
  $taskReport.ownedPids = @($taskOwned | Sort-Object)
  $taskReport | ConvertTo-Json -Depth 6 | Out-File -LiteralPath "$taskPrefix.json" -Encoding utf8
  Write-Output "A4 $Step $($taskReport.status); reason=$($taskReport.stopReason); cleanup=$($taskReport.processTreeClean); record=$taskPrefix.json"
}
if ($taskReport.status -ne 'passed' -or -not $taskReport.processTreeClean -or -not $taskReport.temporaryProfilesClean) { exit 1 }
