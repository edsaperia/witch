// Run one caller scenario in a fresh headless Chromium only after recorded canonical slot/FREE/idle/tab evidence; hard cap 270s.
// This does not grant a slot or inspect Ed's tabs/input. The operator supplies fresh evidence and posts SLOT DONE after verified teardown.
import fs from 'node:fs/promises';
import path from 'node:path';

/** Requested backend only; the scenario must still record the actual GL renderer and reject software when hardware is required. */
export function rendererArguments(evidence, platform = process.platform) {
  const backend = evidence.rendererBackend ?? 'swiftshader';
  if (backend === 'swiftshader') return ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
  if (backend === 'd3d11' && platform === 'win32' && evidence.chromiumExecutable) return ['--use-gl=angle', '--use-angle=d3d11'];
  throw Error('Unsupported renderer request: d3d11 requires Windows and an explicitly approved executable');
}

export function gameConsoleError(message, pageUrl) {
  if (message.type() !== 'error') return false;
  try { const at = new URL(message.location().url), game = new URL(pageUrl); return at.origin === game.origin && at.pathname !== '/favicon.ico'; }
  catch { return false; } // Unattributed browser noise is recorded, never silently called a game error.
}

export function validateSlotEvidence(evidence, expectedSha, now = Date.now()) {
  if (!/^[a-f0-9]{40}$/.test(expectedSha) || evidence?.headSha !== expectedSha) throw Error('Slot must name the exact capture SHA');
  if (evidence.granted !== true || !Number.isInteger(evidence.canonicalCommentId) || evidence.canonicalCommentId <= 0 || !evidence.slotId) throw Error('Require explicit canonical slot grant');
  if (!Number.isInteger(evidence.freeCommentId) || evidence.freeCommentId <= 0) throw Error('Require prior actual FREE evidence');
  const fresh = at => Number.isFinite(Date.parse(at)) && now - Date.parse(at) >= -2000 && now - Date.parse(at) <= 60000;
  if (!(evidence.inputIdleMs >= 300000) || !fresh(evidence.inputCheckedAt)) throw Error('Require fresh input idle >=5min evidence');
  if (evidence.gameTabOpen !== false || !fresh(evidence.tabsCheckedAt)) throw Error('Require fresh no-Ed-game-tab evidence');
  if (!(evidence.durationMs > 0 && evidence.durationMs <= 270000)) throw Error('Slot exceeds 270s bound');
  const remaining = Date.parse(evidence.expiresAt) - now;
  if (!(remaining > 0)) throw Error('Slot expired');
  return Math.min(evidence.durationMs, remaining);
}

export async function withHeadlessSlot({ playwright, evidence, expectedSha, output }, scenario) {
  const started = Date.now(), duration = validateSlotEvidence(evidence, expectedSha, started);
  const args = rendererArguments(evidence); // Reject an unsupported backend before any launch.
  await fs.mkdir(output, { recursive: true });
  const captureBudget = duration - Math.min(10000, duration * .1); // Leave teardown time inside the granted interval.
  let browser, server, timer, hardTimer, launchStarted = false, launchSettled = false, timedOut = false, failure = null, closed = false;
  const consoleNoise = [];
  const deadline = new Promise((_, reject) => { timer = setTimeout(() => { timedOut = true; reject(Error('Allocated headless slot deadline reached')); }, captureBudget); });
  // BrowserServer.kill targets only the browser process this call owns, never Ed's existing browser.
  hardTimer = setTimeout(() => { timedOut = true; if (server) void server.kill().catch(() => {}); }, duration);
  try {
    return await Promise.race([deadline, (async () => {
      launchStarted = true;
      server = await playwright.chromium.launchServer({ headless: true, ...(evidence.chromiumExecutable ? { executablePath: evidence.chromiumExecutable } : {}), timeout: Math.min(120000, captureBudget), args }).then(async owned => {
        server = owned; launchSettled = true;
        if (timedOut) { await owned.kill(); throw Error('Slot expired during Chromium launch'); }
        return owned;
      }, error => { launchSettled = true; throw error; });
      browser = await playwright.chromium.connect(server.wsEndpoint(), { timeout: Math.min(120000, captureBudget) });
      if (timedOut) throw Error('Slot expired during Chromium connection');
      const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
      page.setDefaultTimeout(Math.min(120000, duration));
      await page.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { const fatal = gameConsoleError(message, page.url()); consoleNoise.push({ type: message.type(), text: message.text(), location: message.location(), fatal }); if (fatal) errors.push(message.text()); });
      const gameAsset = url => { try { const at = new URL(url), game = new URL(page.url()); return at.origin === game.origin && at.pathname !== '/favicon.ico'; } catch { return false; } };
      page.on('requestfailed', request => { if (gameAsset(request.url())) errors.push(`Game request failed: ${request.url()}: ${request.failure()?.errorText ?? 'unknown'}`); });
      page.on('response', response => { if (response.status() >= 400 && gameAsset(response.url())) errors.push(`Game HTTP ${response.status()}: ${response.url()}`); });
      const result = await scenario(page);
      if (errors.length) throw Error(`Page/console errors: ${errors.join('; ')}`);
      return result;
    })()]);
  } catch (error) { failure = error.message; throw error; }
  finally {
    clearTimeout(timer);
    if (server) { try { await server.close(); closed = true; } catch { try { await server.kill(); closed = true; } catch { closed = false; } } }
    else closed = !launchStarted;
    if (closed || launchSettled) clearTimeout(hardTimer); // A late successful launch still kills itself above.
    await fs.writeFile(path.join(output, 'slot-receipt.json'), JSON.stringify({ expectedSha, slotId: evidence.slotId, canonicalCommentId: evidence.canonicalCommentId, freeCommentId: evidence.freeCommentId,
      started: new Date(started).toISOString(), ended: new Date().toISOString(), elapsedMs: Date.now() - started, allowedMs: duration, captureBudgetMs: captureBudget, ownedPid: server?.process()?.pid ?? null, timedOut, browserClosed: closed, failure,
      rendererBackendRequested: evidence.rendererBackend ?? 'swiftshader', actualRendererVerified: false, consoleNoise,
      requiresOperatorSlotDone: true, note: closed ? 'Owned browser teardown completed; operator verifies FREE and posts SLOT DONE.' : 'Teardown unverified: do not claim FREE or start another run.' }, null, 2));
  }
}
