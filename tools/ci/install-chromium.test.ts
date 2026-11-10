import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { supportedRunner, aptSources, aptConfig, installPlan, runStage } = createRequire(import.meta.url)('./install-chromium.cjs');

describe('bounded CI Chromium setup without launching a browser', () => {
  it('requires the pinned Ubuntu24 x64 CI host, never a local machine or silent OS fallback', () => {
    const env = { GITHUB_ACTIONS: 'true', RUNNER_OS: 'Linux', RUNNER_ARCH: 'X64' }, release = 'ID=ubuntu\nVERSION_ID="24.04"\n';
    expect(supportedRunner(env, release)).toBe(true);
    for (const change of [{ GITHUB_ACTIONS: '' }, { RUNNER_OS: 'Windows' }, { RUNNER_ARCH: 'ARM64' }]) expect(supportedRunner({ ...env, ...change }, release)).toBe(false);
    expect(supportedRunner(env, release.replace('24.04', '22.04'))).toBe(false);
    expect(supportedRunner(env, release.replace('ubuntu', 'debian'))).toBe(false);
  });
  it('retains Ubuntu signed update/security repositories and isolates only this apt transaction', () => {
    const sources = aptSources(), config = aptConfig('/home/runner/work/_temp/chromium-deps-123');
    expect(sources.trim().split('\n')).toHaveLength(4);
    for (const line of sources.trim().split('\n')) expect(line).toContain('[signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://');
    expect(sources).toContain('https://security.ubuntu.com/ubuntu noble-security');
    expect(sources).not.toContain('azure.archive');
    expect(config).toContain('Acquire::AllowInsecureRepositories "false"');
    expect(config).toContain('APT::Get::AllowUnauthenticated "false"');
    expect(config).toContain('Dir::State::lists "/home/runner/work/_temp/chromium-deps-123/lists"');
    for (const bad of ['/tmp/../other', '/tmp/a";evil', '/tmp/a\nother', 'relative']) expect(() => aptConfig(bad)).toThrow();
  });
  it('puts the dependency timeout inside sudo and keeps browser download unprivileged and bounded', () => {
    const stages = installPlan({ node: '/node', cli: '/pw/cli.js', config: '/temp/apt.conf' });
    expect(stages[0]).toMatchObject({ command: 'sudo', args: ['-n', 'timeout', '--kill-after=10s', '180', 'env', 'APT_CONFIG=/temp/apt.conf', '/node', '/pw/cli.js', 'install-deps', 'chromium'] });
    expect(stages[1]).toMatchObject({ command: 'timeout', args: ['--kill-after=10s', '120', '/node', '/pw/cli.js', 'install', 'chromium'] });
    expect(JSON.stringify(stages)).not.toContain('--with-deps');
    expect(JSON.stringify(stages)).not.toContain('--ignore');
  });
  it('runs a successful stage only once and logs real elapsed time', () => {
    const calls: any[] = [], logs: string[] = [], times = [1000, 3520];
    runStage({ name: 'deps', command: 'sudo', args: ['timeout'] }, { run: (...args: any[]) => { calls.push(args); return { status: 0 }; }, now: () => times.shift(), log: (s: string) => logs.push(s), sleep: () => { throw Error('unneeded retry'); } });
    expect(calls).toHaveLength(1); expect(logs[0]).toContain('2.52s, exit 0');
  });
  it('retries once after timeout/apt failure, preserving final failure rather than turning it green', () => {
    for (const failure of [{ status: 124 }, { status: 137 }, { status: 100 }, { status: null, signal: 'SIGKILL' }, { error: { code: 'ENOENT' } }]) {
      let calls = 0, sleeps = 0;
      const options = { run: () => { calls++; return failure; }, log: () => {}, sleep: () => { sleeps++; } };
      expect(() => runStage({ name: 'deps', command: 'sudo', args: [] }, options)).toThrow('failed after two bounded attempts');
      expect(calls).toBe(2); expect(sleeps).toBe(1);
    }
    let calls = 0;
    expect(() => runStage({ name: 'deps', command: 'sudo', args: [] }, { run: () => ++calls === 1 ? { status: 124 } : { status: 0 }, log: () => {}, sleep: () => {} })).not.toThrow();
    expect(calls).toBe(2);
  });
});
