import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { WebSocket } from 'ws';
import { createRelay } from './relay.mjs';
import { DEFAULT_LIMITS, bucket, relayEnvironment, sendBounded } from './guards.mjs';

const origin = 'https://edsaperia.github.io';
const send = (ws, value) => ws.send(JSON.stringify({ protocol: 1, ...value }));
const message = async ws => JSON.parse((await once(ws, 'message'))[0].toString());
async function fixture(t, options = {}) {
  const relay = createRelay({ log: () => {}, ...options });
  relay.http.listen(0, '127.0.0.1'); await once(relay.http, 'listening');
  t.after(() => relay.close());
  const url = `ws://127.0.0.1:${relay.http.address().port}`;
  return { relay, url, connect: async (headers = {}) => { const ws = new WebSocket(url, { headers }); await once(ws, 'open'); return ws; } };
}
async function host(connect, room = '1234567') {
  const ws = await connect(), reply = message(ws); send(ws, { type: 'host', room }); return { ws, info: await reply };
}
async function refused(url, headers) {
  const ws = new WebSocket(url, { headers });
  ws.on('error', () => {});
  const response = await new Promise(resolve => ws.once('unexpected-response', (_req, res) => { resolve(res.statusCode); res.resume(); ws.terminate(); }));
  return response;
}

test('public configuration fails closed and explicit local origins remain exact', () => {
  assert.throws(() => relayEnvironment({ HOST: '0.0.0.0' }));
  assert.throws(() => relayEnvironment({ HOST: '0.0.0.0', WITCH_ALLOWED_ORIGINS: origin, WITCH_SHA: 'unidentified' }));
  for (const invalid of ['*', 'null', origin + '/', origin + '/witch', 'http://example.com', 'https://user:pass@example.com']) {
    assert.throws(() => relayEnvironment({ WITCH_ALLOWED_ORIGINS: invalid }));
  }
  assert.equal(relayEnvironment({ HOST: '0.0.0.0', WITCH_ALLOWED_ORIGINS: origin, WITCH_SHA: 'a'.repeat(40), PORT: '10000' }).port, 10000);
  assert.deepEqual(relayEnvironment({ WITCH_ALLOWED_ORIGINS: 'http://localhost:5173' }).allowedOrigins, ['http://localhost:5173']);
  assert.throws(() => createRelay({ limits: { connections: 0 } }));
});

test('origin admission rejects missing/null/spoofed origins before upgrade, allows exact origin and pins health', { timeout: 5000 }, async t => {
  const { connect, url } = await fixture(t, { allowedOrigins: [origin], build: 'a'.repeat(40) });
  for (const value of [undefined, 'null', origin + '.evil.test', 'https://evil.test']) {
    assert.equal(await refused(url, value ? { origin: value } : {}), 403);
  }
  const ws = await connect({ origin }); assert.equal(ws.readyState, WebSocket.OPEN);
  const health = await fetch(url.replace('ws:', 'http:') + '/');
  assert.deepEqual(await health.json(), { service: 'witch-relay', protocol: 1, build: 'a'.repeat(40) });
  assert.equal((await fetch(url.replace('ws:', 'http:') + '/rooms')).status, 404);
});

test('connection and room quotas refuse excess clients and release capacity on departure', { timeout: 5000 }, async t => {
  const { connect, url } = await fixture(t, { limits: { connections: 2, rooms: 1 } });
  const h = await host(connect), other = await connect(), closed = once(other, 'close');
  assert.equal(await refused(url, {}), 503);
  send(other, { type: 'host', room: '7654321' }); assert.equal((await closed)[0], 1013);
  const left = once(h.ws, 'close'); h.ws.close(); await left;
  const replacement = await host(connect, '7654321'); assert.equal(replacement.info.type, 'hosted');
});

test('upgrade rate is bounded independently of slots, and refills without trusting proxy headers', { timeout: 5000 }, async t => {
  let clock = 0;
  const { connect, url } = await fixture(t, { now: () => clock, limits: { upgradeBurst: 1, upgradesPerSecond: 1 } });
  await connect(); assert.equal(await refused(url, { 'x-forwarded-for': '1.2.3.4' }), 503);
  clock = 1000; const ws = await connect(); assert.equal(ws.readyState, WebSocket.OPEN);
});

test('message, byte and control-frame floods close the socket without logging payloads', { timeout: 5000 }, async t => {
  for (const kind of ['messages', 'bytes', 'ping']) {
    const logs = [], options = kind === 'bytes' ? { byteBurst: 100 } : { messageBurst: 2 };
    const { connect } = await fixture(t, { log: row => logs.push(row), limits: options });
    const h = await host(connect), closed = once(h.ws, 'close');
    if (kind === 'bytes') send(h.ws, { type: 'state', payload: { secret: 'private-token'.repeat(20) } });
    else for (let i = 0; i < 3; i++) { if (kind === 'ping') h.ws.ping(); else send(h.ws, { type: 'heartbeat' }); }
    assert.equal((await closed)[0], 1008);
    // Server close event may follow the client's close handshake.
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(logs[0]?.rule, 'rate'); assert.equal(JSON.stringify(logs).includes('private-token'), false);
  }
});

test('idle unassigned socket has a short handshake deadline, not the loading grace', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], { connect } = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const ws = await connect(), closed = once(ws, 'close'); clock = 10000; await closed;
  await new Promise(resolve => setImmediate(resolve)); assert.equal(logs[0]?.rule, 'handshake');
});

test('binary, malformed payloads, oversized messages and guest escalation cannot be forwarded', { timeout: 5000 }, async t => {
  for (const data of [Buffer.from('{}'), JSON.stringify({ protocol: 1, type: 'state', payload: [] }), 'x'.repeat(1025)]) {
    const { connect } = await fixture(t, { limits: { maxPayload: 1024 } });
    const h = await host(connect), closed = once(h.ws, 'close'); h.ws.send(data);
    assert.ok([1008, 1009].includes((await closed)[0]));
  }
});

test('outgoing bound accounts for serialized bytes before queueing; closed peers are ignored', () => {
  const sent = [], stopped = [], ws = { readyState: 1, bufferedAmount: 90, send: value => sent.push(value) };
  sendBounded(ws, { payload: 'too much' }, { maxBuffered: 100 }, (...args) => stopped.push(args));
  assert.equal(sent.length, 0); assert.equal(stopped[0][1], 'backpressure');
  ws.bufferedAmount = 0; sendBounded(ws, { ok: true }, { maxBuffered: 100 }, () => assert.fail());
  assert.equal(sent.length, 1); ws.readyState = 3;
  sendBounded(ws, { ok: true }, { maxBuffered: 100 }, () => assert.fail()); assert.equal(sent.length, 1);
});

test('ordinary 144Hz traffic fits the limits, a full snapshot fits, and shutdown is idempotent', { timeout: 5000 }, async t => {
  let clock = 0;
  const { relay, connect } = await fixture(t, { now: () => clock });
  const h = await host(connect), guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  const state = message(guest), snapshot = 'x'.repeat(DEFAULT_LIMITS.maxPayload - 100);
  send(h.ws, { type: 'state', payload: { snapshot } }); assert.equal((await state).payload.snapshot.length, snapshot.length);
  const admit = bucket(DEFAULT_LIMITS.messagesPerSecond, DEFAULT_LIMITS.messageBurst, () => clock);
  for (let i = 0; i < 1440; i++) { clock = i * 1000 / 144; assert.equal(admit(), true); }
  const a = once(h.ws, 'close'), b = once(guest, 'close');
  await Promise.all([relay.close(), relay.close(), a, b]); assert.equal(relay.http.listening, false);
});
