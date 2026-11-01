// Synthetic A4 guard checks only: no actual process inventory, browser launch, input query or proof command.
const fs = require('node:fs'), vm = require('node:vm'), cp = require('node:child_process');
const assert = require('node:assert/strict'), test = require('node:test');

test('complete redirected supervisor finalizes known-exit and watchdog fixtures with cleanup', () => {
  const path = require('node:path');
  const source = fs.readFileSync('tools/refactor/a4-proof-step.ps1', 'utf8');
  const makeFixture = command => source
    .replace(/function Read-A4Guard \{[\s\S]*?\n\}/, "function Read-A4Guard { return @{at='synthetic';lastInputTick=1;idleMs=600000;externalBrowserCount=0;ownedProcessCount=1} }")
    .replace("'typecheck' = 'npm run typecheck'", `'typecheck' = '${command}'`)
    .replace('$taskCpu = [double]((& node -e $taskCpuJs).Trim())', '$taskCpu = 0')
    .replace('Start-Sleep -Seconds 265', 'Start-Sleep -Seconds 2')
    .replace('schema=1; step=', 'schema=1; synthetic=$true; step=');
  for (const sample of [{ command: 'exit /b 7', status: 'failed', code: 7 },
    { command: 'powershell.exe -NoProfile -NonInteractive -Command Start-Sleep -Seconds 5', status: 'stopped', watchdog: true }]) {
  const fixtureSource = makeFixture(sample.command);
  assert.notEqual(fixtureSource, source);
  const base = path.resolve('previews/a4-proof/fixtures'); fs.mkdirSync(base, { recursive: true });
  const evidence = fs.mkdtempSync(path.join(base, 'supervisor-'));
  const fixture = path.resolve('tools/refactor/.a4-supervisor-fixture.ps1');
  fs.writeFileSync(fixture, fixtureSource);
  try {
    const sha = cp.execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const result = cp.spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', fixture,
      '-Step', 'typecheck', '-GrantComment', '0000000000', '-PreviousDoneComment', '0000000000', '-ExpectedSha', sha, '-EvidenceDir', evidence],
    { encoding: 'utf8', windowsHide: true, timeout: 12000 });
    assert.equal(result.status, 1, result.stderr || result.error?.message);
    const records = fs.readdirSync(evidence).filter(f => f.endsWith('.json'));
    assert.equal(records.length, 1, result.stdout + result.stderr);
    const record = JSON.parse(fs.readFileSync(path.join(evidence, records[0]), 'utf8').replace(/^\uFEFF/, ''));
    assert.equal(record.synthetic, true);
    if (sample.code !== undefined) assert.equal(record.exitCode, sample.code, JSON.stringify(record));
    if (sample.watchdog) assert.equal(record.watchdogStop, true, JSON.stringify(record));
    assert.equal(record.status, sample.status, JSON.stringify(record));
    assert.equal(record.processTreeClean, true, JSON.stringify(record));
  } finally {
    fs.unlinkSync(fixture);
    const resolved = fs.realpathSync(evidence);
    assert.ok(resolved.startsWith(base + path.sep));
    fs.rmSync(resolved, { recursive: true });
  }
  }
});

test('supervisor captures a real known nonzero child exit without interpreting null as a result', () => {
  const source = fs.readFileSync('tools/refactor/a4-proof-step.ps1', 'utf8');
  const native = source.match(/Add-Type -TypeDefinition @'([\s\S]+?)'@/)[1];
  const encoded = Buffer.from(native, 'utf8').toString('base64');
  const script = `Add-Type -TypeDefinition ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded}'))); $taskChild=Start-Process -FilePath $env:ComSpec -ArgumentList @('/d','/s','/c','exit /b 7') -WindowStyle Hidden -PassThru; $taskHandle=$taskChild.Handle; $taskChild.WaitForExit(); $taskCode=[A4ProofInput]::ExitCode($taskHandle); if($taskCode -ne 7){throw 'Wrong exit code'}; 'PASS real child exit 7'`;
  const result = cp.spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], { encoding: 'utf8', windowsHide: true, timeout: 10000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.match(result.stdout, /PASS real child exit 7/);
});

test('actual PowerShell browser policy excludes the full own descendant tree', () => {
  const file = require('node:path').resolve('tools/refactor/a4-proof-step.ps1').replaceAll("'", "''");
  const script = `
$tokens=$null; $errors=$null
$ast=[System.Management.Automation.Language.Parser]::ParseFile('${file}',[ref]$tokens,[ref]$errors)
if($errors.Count){throw 'parse failure'}
$fn=$ast.Find({param($n) $n -is [System.Management.Automation.Language.FunctionDefinitionAst] -and $n.Name -eq 'Get-A4ExternalBrowsers'},$true)
Invoke-Expression $fn.Extent.Text
$owned=[System.Collections.Generic.HashSet[int]]::new(); [void]$owned.Add(100)
$rows=@(
 @{ProcessId=400;ParentProcessId=300;Name='chrome.exe'},
 @{ProcessId=300;ParentProcessId=200;Name='chrome.exe'},
 @{ProcessId=200;ParentProcessId=100;Name='node.exe'},
 @{ProcessId=100;ParentProcessId=1;Name='powershell.exe'},
 @{ProcessId=800;ParentProcessId=1;Name='msedge.exe'})
$external=@(Get-A4ExternalBrowsers -TaskProcesses $rows -TaskOwned $owned)
if($external.Count -ne 1 -or $external[0].ProcessId -ne 800 -or -not $owned.Contains(400)){throw 'own process-tree exclusion failed'}
'PASS synthetic own-tree and external-browser discrimination'
`;
  const result = cp.spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], { encoding: 'utf8', windowsHide: true, timeout: 10000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.match(result.stdout, /PASS synthetic/);
});

test('preload is inert on import, uses fresh headless launch and neutralizes favicon noise', async () => {
  const log = [], events = {}, pageEvents = {};
  let launched = 0, options, routeCallback, serverClosed = false;
  const context = { route: async (_pattern, callback) => { routeCallback = callback; }, on: (event, callback) => { events[event] = callback; } };
  const browser = { newContext: async () => context, close: async () => {} };
  const server = { process: () => ({ pid: 123 }), wsEndpoint: () => 'ws://fixture', close: async () => { serverClosed = true; } };
  const pw = { chromium: { launchServer: async supplied => { launched++; options = supplied; return server; }, connect: async () => browser } };
  const source = fs.readFileSync('tools/refactor/a4-browser-preload.cjs', 'utf8');
  vm.runInNewContext(source, { require: name => name === 'node:fs' ? { appendFileSync: (_file, line) => log.push(JSON.parse(line)) } : pw,
    process: { env: { A4_CHROME: 'fixture-chrome', A4_BROWSER_LOG: 'fixture-log' } }, URL, Date });
  assert.equal(launched, 0);
  const owned = await pw.chromium.launch({ args: ['unchanged-renderer-option'] });
  assert.equal(options.headless, true); assert.equal(options.executablePath, 'fixture-chrome');
  assert.ok(options.args.includes('unchanged-renderer-option'));
  assert.ok(options.args.includes('--use-angle=d3d11'));
  assert.ok(!options.args.some(arg => arg.includes('swiftshader')));
  await owned.newContext({});
  let status;
  await routeCallback({ fulfill: async response => { status = response.status; } });
  assert.equal(status, 204);
  events.page({ evaluate: async () => {}, on: (event, callback) => { pageEvents[event] = callback; } });
  pageEvents.console({ type: () => 'error', text: () => 'unrelated console noise' });
  pageEvents.response({ status: () => 404, url: () => 'http://127.0.0.1/favicon.ico', request: () => ({ resourceType: () => 'image' }) });
  const softwarePage = { evaluate: async () => ({ renderer: 'ANGLE (Google SwiftShader)', vendor: 'Google' }), on: () => {} };
  events.page(softwarePage);
  await assert.rejects(softwarePage.evaluate(() => 42), /A4_RENDERER/);
  await owned.close();
  assert.equal(serverClosed, true);
  assert.equal(log.filter(row => row.kind === 'console-noise').length, 1);
});
