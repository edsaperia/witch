import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { WebSocket } from 'ws';
import { createRelay } from './relay.mjs';

async function fixture(t, options) {
  const relay = createRelay({ log: () => {}, ...options });
  relay.http.listen(0, '127.0.0.1'); await once(relay.http, 'listening');
  t.after(() => relay.close());
  const url = `ws://127.0.0.1:${relay.http.address().port}`;
  return async () => { const ws = new WebSocket(url); await once(ws, 'open'); return ws; };
}
const send = (ws, m) => ws.send(JSON.stringify({ protocol: 1, ...m }));
const message = async ws => JSON.parse((await once(ws, 'message'))[0].toString());
async function host(connect) {
  const ws = await connect(), reply = message(ws);
  send(ws, { type: 'host', room: '1234567' });
  return { ws, info: await reply };
}

test('joins a running host and relays state/input with connection-bound identities', { timeout: 5000 }, async t => {
  const connect = await fixture(t), h = await host(connect), guest = await connect();
  const joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token });
  assert.equal((await joined).player, 1); assert.equal((await notice).type, 'guest-joined');
  const input = message(h.ws);
  send(guest, { type: 'input', player: 0, payload: { sequence: 1, moveX: 1 } });
  assert.deepEqual(await input, { protocol: 1, type: 'input', player: 1, payload: { sequence: 1, moveX: 1 } });
  const state = message(guest);
  send(h.ws, { type: 'state', payload: { tick: 100, snapshot: 'fixture' } });
  assert.equal((await state).payload.tick, 100);
  const left = message(h.ws); guest.close(); assert.equal((await left).type, 'guest-left');
});

test('rejects wrong join tokens and guest authority escalation', { timeout: 5000 }, async t => {
  const connect = await fixture(t), h = await host(connect), bad = await connect();
  const rejected = once(bad, 'close'); send(bad, { type: 'join', room: h.info.room, token: 'wrong' });
  assert.equal((await rejected)[0], 1008);
  const guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  const closed = once(guest, 'close'); send(guest, { type: 'state', payload: {} });
  assert.equal((await closed)[0], 1008);
});

test('expires silent connections and closes guest when host leaves', { timeout: 5000 }, async t => {
  let clock = 0;
  const connect = await fixture(t, { now: () => clock, dropMs: 5000, joiningGraceMs: 5000, checkMs: 5 });
  const h = await host(connect), guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  const hostClosed = once(h.ws, 'close'), guestClosed = once(guest, 'close');
  clock = 5000;
  await hostClosed; await guestClosed;
});

test('slow joining guest survives five seconds, readiness restores normal timeout, and stalled host expires', { timeout: 5000 }, async t => {
  let clock = 0;
  const connect = await fixture(t, { now: () => clock, checkMs: 5 }), h = await host(connect);
  const guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  clock = 6000;
  const accepted = message(guest), readyNotice = message(h.ws);
  send(guest, { type: 'ready' });
  assert.equal((await accepted).type, 'ready-accepted'); assert.equal((await readyNotice).type, 'guest-ready');
  send(guest, { type: 'active' });
  // Ensure the active message reached the relay before advancing the fake clock.
  await new Promise(resolve => setTimeout(resolve, 10));
  const guestClosed = once(guest, 'close'); clock = 11000; await guestClosed;
  assert.equal(h.ws.readyState, WebSocket.OPEN);
  const hostClosed = once(h.ws, 'close'); clock = 180000; await hostClosed;
});

test('advancing loading survives the former grace, repeated progress stalls, and absolute cap remains', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], connect = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const h = await host(connect), guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  for (let n = 1; n <= 11; n++) {
    clock = n * 50000;
    send(h.ws, { type: 'progress', payload: n }); send(guest, { type: 'progress', payload: n });
    const roundtrip = message(h.ws); send(guest, { type: 'input', payload: {} }); await roundtrip;
    assert.equal(guest.readyState, WebSocket.OPEN);
  }
  // A heartbeat and replayed sequence cannot renew progress.
  clock = 599000;
  send(h.ws, { type: 'heartbeat' }); send(guest, { type: 'progress', payload: 11 });
  await new Promise(resolve => setTimeout(resolve, 10));
  const closed = once(guest, 'close'); clock = 600000; await closed;
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(logs.find(row => row.role === 'host').rule, 'join-cap');
});

test('heartbeats and repeated progress cannot hide a loading stall', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], connect = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const h = await host(connect);
  send(h.ws, { type: 'progress', payload: 1 });
  await new Promise(resolve => setTimeout(resolve, 10));
  clock = 60000; send(h.ws, { type: 'heartbeat' }); send(h.ws, { type: 'progress', payload: 1 });
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(h.ws.readyState, WebSocket.OPEN);
  const closed = once(h.ws, 'close'); clock = 90000; await closed;
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(logs[0].rule, 'join-stall'); assert.equal(logs[0].limitMs, 90000);
});

test('host departure closes guest and releases the room number', { timeout: 5000 }, async t => {
  const connect = await fixture(t), h = await host(connect), guest = await connect();
  const joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  const closed = once(guest, 'close'); h.ws.close();
  assert.equal((await closed)[0], 1001);
  const replacement = await host(connect);
  assert.equal(replacement.info.type, 'hosted');
  assert.notEqual(replacement.info.token, h.info.token);
});

test('rejects a duplicate host and a third player', { timeout: 5000 }, async t => {
  const connect = await fixture(t), h = await host(connect), duplicate = await connect();
  const duplicateClosed = once(duplicate, 'close'); send(duplicate, { type: 'host', room: h.info.room });
  assert.equal((await duplicateClosed)[0], 1008);
  const guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  const third = await connect(), thirdClosed = once(third, 'close');
  send(third, { type: 'join', room: h.info.room, token: h.info.token });
  assert.equal((await thirdClosed)[0], 1008);
});

test('host survives bounded silence during guest loading and logs the exact deadline', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], connect = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const h = await host(connect), accepted = message(h.ws); send(h.ws, { type: 'ready' }); await accepted;
  const guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  clock = 10000;
  // Round-trip guest input proves the host remains attached beyond the usual 5-second timeout.
  const input = message(h.ws); send(guest, { type: 'input', payload: {} }); await input;
  assert.equal(h.ws.readyState, WebSocket.OPEN);
  const closed = once(h.ws, 'close'); clock = 20000; await closed;
  await new Promise(resolve => setTimeout(resolve, 10));
  const hostLog = logs.filter(row => row.role === 'host');
  assert.equal(hostLog.length, 1); assert.equal(hostLog[0].rule, 'silence'); assert.equal(hostLog[0].limitMs, 20000);
});

test('normal host silence deadline resumes after guest activation', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], connect = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const h = await host(connect), hostReady = message(h.ws); send(h.ws, { type: 'ready' }); await hostReady;
  const guest = await connect(), joined = message(guest), notice = message(h.ws);
  send(guest, { type: 'join', room: h.info.room, token: h.info.token }); await joined; await notice;
  clock = 10000;
  const accepted = message(guest), readyNotice = message(h.ws); send(guest, { type: 'ready' }); await accepted; await readyNotice;
  send(guest, { type: 'active' }); await new Promise(resolve => setTimeout(resolve, 10));
  const closed = once(h.ws, 'close'); clock = 15000; await closed;
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(logs.find(row => row.role === 'host').limitMs, 5000);
});

test('close logging distinguishes protocol, client close and joining-grace rules without payload secrets', { timeout: 5000 }, async t => {
  let clock = 0;
  const logs = [], connect = await fixture(t, { now: () => clock, checkMs: 5, log: row => logs.push(row) });
  const bad = await connect(), badClosed = once(bad, 'close'); bad.send('secret-invalid-json'); await badClosed;
  const client = await connect(), clientClosed = once(client, 'close'); client.close(); await clientClosed;
  const silent = await connect(), silentClosed = once(silent, 'close'); clock = 180000; await silentClosed;
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.deepEqual(logs.map(row => row.rule).sort(), ['client-close', 'join-stall', 'protocol']);
  assert.equal(JSON.stringify(logs).includes('secret-invalid-json'), false);
});
