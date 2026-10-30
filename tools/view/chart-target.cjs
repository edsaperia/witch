// Select the requested island before waiting for its outline: selection prioritizes its worker queue.
async function prepareChartTarget(page, island, seed, timeout, phase = () => {}) {
  const until = Date.now() + timeout, remaining = () => Math.max(1, until - Date.now());
  phase('chart target record');
  await page.waitForFunction(i => window.chart?.islands?.().some(x => x.id === i), island, { timeout: remaining(), polling: 250 });
  phase('chart selection');
  await page.evaluate(async ([id, fixedSeed]) => {
    const random = Math.random;
    if (fixedSeed != null) Math.random = () => Number(fixedSeed) / 1000000;
    try { window.chart.choose(id); await new Promise(r => setTimeout(r, 1500)); }
    finally { Math.random = random; }
  }, [island, seed]);
  phase('chart outlines');
  await page.waitForFunction(i => window.chart?.islands?.().find(x => x.id === i && x.outline), island, { timeout: remaining(), polling: 250 });
}
module.exports = { prepareChartTarget };
