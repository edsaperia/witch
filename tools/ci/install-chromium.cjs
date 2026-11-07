// Install pinned CI Chromium with signed Ubuntu dependencies and privileged timeout cleanup.
// node tools/ci/install-chromium.cjs
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

function supportedRunner(env, release) {
  return env.GITHUB_ACTIONS === 'true' && env.RUNNER_OS === 'Linux' && env.RUNNER_ARCH === 'X64'
    && /^ID=ubuntu$/m.test(release) && /^VERSION_ID="24\.04"$/m.test(release);
}
function aptSources() {
  // A dedicated source list affects this transaction only. Signature verification uses the
  // runner's Ubuntu archive keyring; no HTTP mirror override or third-party package source.
  const key = '[signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg]';
  return ['noble', 'noble-updates', 'noble-backports'].map(s => `deb ${key} https://archive.ubuntu.com/ubuntu ${s} main restricted universe multiverse`)
    .concat(`deb ${key} https://security.ubuntu.com/ubuntu noble-security main restricted universe multiverse`).join('\n') + '\n';
}
function aptConfig(directory) {
  if (!/^\/[A-Za-z0-9_./-]+$/.test(directory) || directory.includes('..')) throw Error('Unsafe runner temporary directory');
  return `Dir::Etc::sourcelist "${directory}/sources.list";\nDir::Etc::sourceparts "-";\nDir::State::lists "${directory}/lists";\n`
    + 'Acquire::http::Timeout "30";\nAcquire::https::Timeout "30";\nAcquire::Retries "1";\n'
    + 'Acquire::AllowInsecureRepositories "false";\nAPT::Get::AllowUnauthenticated "false";\n';
}
function installPlan({ node, cli, config }) {
  return [
    // timeout itself must be root: a runner-owned timeout cannot kill sudo's apt children.
    { name: 'Ubuntu dependencies', command: 'sudo', args: ['-n', 'timeout', '--kill-after=10s', '180', 'env', `APT_CONFIG=${config}`, node, cli, 'install-deps', 'chromium'] },
    { name: 'Pinned Chromium', command: 'timeout', args: ['--kill-after=10s', '120', node, cli, 'install', 'chromium'] },
  ];
}
function runStage(stage, { run = cp.spawnSync, now = Date.now, log = console.log, sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms) } = {}) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const start = now(), result = run(stage.command, stage.args, { stdio: 'inherit' });
    const seconds = ((now() - start) / 1000).toFixed(2);
    log(`${stage.name}: attempt ${attempt}/2, ${seconds}s, exit ${result.status ?? result.signal ?? result.error?.code ?? 'unknown'}`);
    if (result.status === 0 && !result.error && !result.signal) return;
    if (attempt === 2) {
      const error = Error(`${stage.name} failed after two bounded attempts`);
      error.exitCode = Number.isInteger(result.status) && result.status > 0 ? result.status : 1;
      throw error;
    }
    sleep(5000);
  }
}
function main(env = process.env) {
  if (!supportedRunner(env, fs.readFileSync('/etc/os-release', 'utf8'))) throw Error('CI Chromium installer requires the pinned Ubuntu24.04 x64 GitHub runner');
  if (!/^\d+\.\d+\.\d+$/.test(env.PLAYWRIGHT_VERSION ?? '')) throw Error('PLAYWRIGHT_VERSION must be pinned');
  const root = path.resolve('.pw/node_modules/playwright'), cli = path.join(root, 'cli.js');
  const installed = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
  if (installed !== env.PLAYWRIGHT_VERSION) throw Error('Installed Playwright differs from pinned version');
  const directory = fs.mkdtempSync(path.join(env.RUNNER_TEMP, 'chromium-deps-'));
  fs.chmodSync(directory, 0o755); // apt's restricted _apt downloader must traverse public metadata.
  const config = path.join(directory, 'apt.conf'), start = Date.now();
  fs.mkdirSync(path.join(directory, 'lists'), { mode: 0o755 });
  fs.writeFileSync(path.join(directory, 'sources.list'), aptSources(), { mode: 0o644 });
  fs.writeFileSync(config, aptConfig(directory), { mode: 0o644 });
  console.log(`Chromium setup: Playwright ${installed}, ${env.ImageOS}/${env.ImageVersion}, signed archive.ubuntu.com + security.ubuntu.com; dependencies180s/browser120s, each one retry, kill-after10s.`);
  for (const stage of installPlan({ node: process.execPath, cli, config })) runStage(stage);
  const executable = require(root).chromium.executablePath();
  if (!fs.existsSync(executable)) throw Error('Pinned Chromium executable missing after successful install');
  const summary = `Chromium setup completed in ${((Date.now() - start) / 1000).toFixed(2)}s; Playwright ${installed}; Ubuntu24.04 signed official archives; all dependencies/fonts retained.\n`;
  console.log(summary);
  if (env.GITHUB_STEP_SUMMARY) fs.appendFileSync(env.GITHUB_STEP_SUMMARY, summary);
  // Dependency metadata is root-owned in RUNNER_TEMP; disposable runner teardown removes it.
}
module.exports = { supportedRunner, aptSources, aptConfig, installPlan, runStage };
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = error.exitCode ?? 1; }
}
