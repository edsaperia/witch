import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { WebSocket } from 'ws';
import { createRelay } from './relay.mjs';
import { relayEnvironment } from './guards.mjs';
const send = (ws, m) => ws.send(JSON.stringify({ protocol: 1, ...m }));
const message = async ws => JSON.parse((await once(ws, 'message'))[0].toString());
async function fixture(t, options = {}) {
  const relay = createRelay({ log: () => {}, ...options }); relay.http.listen(0, '127.0.0.1'); await once(relay.http, 'listening'); t.after(() => relay.close());
  const connect = async () => { const w = new WebSocket(`ws://127.0.0.1:${relay.http.address().port}`); await once(w, 'open'); return w; };
  const phone = async number => { const w = await connect(), reply = message(w); send(w, { type: 'telephone', number }); assert.equal((await reply).type, 'telephone-ready'); return w; };
  const ring = async (a, b) => { const out = message(a), incoming = message(b); send(a, { type: 'dial', number: '7654321' }); assert.equal((await out).type, 'call-ringing'); assert.equal((await incoming).type, 'incoming-call'); };
  return { connect, phone, ring };
}
test('caller becomes host only after the answerer explicitly consents; assigned roles cannot be forged', { timeout: 5000 }, async t => {
  const { phone, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'); await ring(a, b);
  const events = []; a.on('message', data => events.push(JSON.parse(data)));
  const accepted = message(b); send(b, { type: 'answer', player: 0 }); assert.equal((await accepted).role, 'guest');
  const input = message(a); send(b, { type: 'input', player: 0, payload: {} }); assert.equal((await input).player, 1);
  assert.deepEqual(events.slice(0, 2).map(m => m.type), ['call-connected', 'guest-joined']);
  const closed = once(b, 'close'); send(b, { type: 'state', payload: {} }); assert.equal((await closed)[0], 1008);
});
test('knowing a number never grants world access before answer', { timeout: 5000 }, async t => {
  const { phone, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'); await ring(a, b);
  const closed = once(a, 'close'); send(a, { type: 'state', payload: {} }); assert.equal((await closed)[0], 1008);
});
test('decline, cancel, unavailable presence and ring deadline leave no stale call', { timeout: 5000 }, async t => {
  let clock = 0; const { phone, ring } = await fixture(t, { now: () => clock, checkMs: 5 });
  const a = await phone('1234567'), b = await phone('7654321');
  for (const action of ['decline', 'cancel-call']) {
    await ring(a, b); const reply = message(a), other = message(b); send(action === 'decline' ? b : a, { type: action });
    assert.equal((await reply).type, action === 'decline' ? 'call-declined' : 'call-cancelled'); await other;
  }
  await ring(a, b); const reply = message(a), other = message(b);
  // Preserve heartbeat while advancing the ring clock beyond the normal silence interval.
  for (let n = 1; n <= 6; n++) { clock = n * 5000; send(a, { type: 'heartbeat' }); send(b, { type: 'heartbeat' }); await new Promise(resolve => setImmediate(resolve)); }
  assert.equal((await reply).type, 'call-timeout'); await other;
  const ready = message(a); send(b, { type: 'available', payload: false });
  send(a, { type: 'dial', number: '7654321' }); assert.equal((await ready).type, 'call-unavailable');
});
test('duplicate numbers, fabricated answer and dialing a busy phone are refused', { timeout: 5000 }, async t => {
  const { phone, connect, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'), c = await phone('3333333');
  const duplicate = await connect(), closed = once(duplicate, 'close'); send(duplicate, { type: 'telephone', number: '1234567' }); assert.equal((await closed)[0], 1008);
  await ring(a, b); const busy = message(c); send(c, { type: 'dial', number: '7654321' }); assert.equal((await busy).type, 'call-busy');
  const forged = once(c, 'close'); send(c, { type: 'answer', number: '7654321' }); assert.equal((await forged)[0], 1008);
});
test('CLI capacity overrides reject unsafe values and preserve explicit limits', () => {
  assert.deepEqual(relayEnvironment({ WITCH_MAX_CONNECTIONS: '8', WITCH_MAX_ROOMS: '4' }).limits, { connections: 8, rooms: 4 });
  for (const value of ['0', '-1', '2.2', 'NaN']) assert.throws(() => relayEnvironment({ WITCH_MAX_CONNECTIONS: value }));
});
