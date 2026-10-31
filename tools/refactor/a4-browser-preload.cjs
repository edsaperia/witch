// Allocated A4 bench instrumentation only: fresh headless Chrome, favicon 204, local console-noise records; no browser on import.
const fs = require('node:fs');
const pw = require('playwright');
const os = require('node:os');
if (!process.env.A4_CHROME || !process.env.A4_BROWSER_LOG) throw Error('A4 Chrome/log configuration missing');
const record = value => fs.appendFileSync(process.env.A4_BROWSER_LOG, JSON.stringify({ at: new Date().toISOString(), ...value }) + '\n');
const launchServer = pw.chromium.launchServer.bind(pw.chromium);
pw.chromium.launch = async options => {
  // launchServer creates a new temporary profile; no persistent context or Ed profile.
  const server = await launchServer({ ...options, headless: true, executablePath: process.env.A4_CHROME });
  const profileArg = server.process().spawnargs?.find(arg => arg.startsWith('--user-data-dir='));
  record({ kind: 'own-browser', pid: server.process().pid, profile: profileArg?.slice('--user-data-dir='.length) ?? null });
  const browser = await pw.chromium.connect(server.wsEndpoint());
  const fatal = [];
  const createContext = browser.newContext.bind(browser);
  browser.newContext = async options => {
    const context = await createContext(options);
    await context.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
    context.on('page', page => {
      const evaluate = page.evaluate.bind(page);
      page.evaluate = async (fn, arg) => {
        const measuring = arg?.timed === true && Number.isInteger(arg.n) && typeof arg.DT === 'number';
        if (!measuring) return evaluate(fn, arg);
        const before = os.cpus();
        const result = await evaluate(fn, arg);
        let idle = 0, total = 0;
        os.cpus().forEach((cpu, i) => { idle += cpu.times.idle - before[i].times.idle; for (const key in cpu.times) total += cpu.times[key] - before[i].times[key]; });
        const percent = total > 0 ? 100 * (1 - idle / total) : null;
        record({ kind: 'cpu-measurement', percent, limit: 70 });
        if (percent === null || !Number.isFinite(percent) || percent >= 70) {
          record({ kind: 'stop', reason: 'cpu_measurement' });
          throw Error('A4_CPU_MEASUREMENT: invalid/contaminated measurement window');
        }
        return result;
      };
      page.on('console', msg => record({ kind: 'console-noise', level: msg.type(), text: msg.text() }));
      page.on('pageerror', error => record({ kind: 'page-error', message: error.message }));
      page.on('response', response => {
        if (response.status() < 400) return;
        const url = new URL(response.url());
        const type = response.request().resourceType();
        if (url.pathname === '/favicon.ico') return;
        const gameAsset = ['127.0.0.1', 'localhost'].includes(url.hostname) && ['document', 'script', 'stylesheet', 'image', 'font', 'media'].includes(type);
        const item = { kind: gameAsset ? 'game-asset-error' : 'network-noise', path: url.pathname, status: response.status(), type };
        record(item); if (gameAsset) fatal.push(item);
      });
    });
    return context;
  };
  const close = browser.close.bind(browser);
  browser.close = async () => {
    try { await close(); } finally { await server.close(); }
    if (fatal.length) { record({ kind: 'stop', reason: 'game_asset_error' }); throw Error(`A4 game asset failures: ${fatal.length}; see local browser log`); }
  };
  return browser;
};
