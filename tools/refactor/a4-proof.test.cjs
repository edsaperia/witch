// Synthetic A4 guard checks only: no actual process inventory, browser launch, input query or proof command.
const fs = require('node:fs'), vm = require('node:vm'), cp = require('node:child_process');
const assert = require('node:assert/strict'), test = require('node:test');

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
  assert.deepEqual([...options.args], ['unchanged-renderer-option']);
  await owned.newContext({});
  let status;
  await routeCallback({ fulfill: async response => { status = response.status; } });
  assert.equal(status, 204);
  events.page({ evaluate: async () => {}, on: (event, callback) => { pageEvents[event] = callback; } });
  pageEvents.console({ type: () => 'error', text: () => 'unrelated console noise' });
  pageEvents.response({ status: () => 404, url: () => 'http://127.0.0.1/favicon.ico', request: () => ({ resourceType: () => 'image' }) });
  await owned.close();
  assert.equal(serverClosed, true);
  assert.equal(log.filter(row => row.kind === 'console-noise').length, 1);
});
