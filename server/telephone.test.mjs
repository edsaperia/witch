import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { WebSocket } from 'ws';
import { createRelay } from './relay.mjs';
import { relayEnvironment } from './guards.mjs';
import { telephoneIdentity } from './telephone.mjs';
import { createPrivateKey, createPublicKey, sign } from 'node:crypto';
const keyFor = label => {
  const seed = Buffer.alloc(32); seed.writeUInt32BE(Number(label), 28);
  const privateKey = createPrivateKey({ key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), seed]), format: 'der', type: 'pkcs8' });
  return { privateKey, publicKey: { algorithm: 'Ed25519', spki: createPublicKey(privateKey).export({ format: 'der', type: 'spki' }).toString('base64url') } };
};
const send = (ws, m) => ws.send(JSON.stringify({ protocol: 1, ...m }));
const message = async ws => JSON.parse((await once(ws, 'message'))[0].toString());
async function fixture(t, options = {}) {
  const relay = createRelay({ log: () => {}, ...options }); relay.http.listen(0, '127.0.0.1'); await once(relay.http, 'listening'); t.after(() => relay.close());
  const connect = async () => { const w = new WebSocket(`ws://127.0.0.1:${relay.http.address().port}`); await once(w, 'open'); return w; };
  const phone = async label => { const w = await connect(), reply = message(w); w.keys = keyFor(label); send(w, { type: 'telephone', publicKey: w.keys.publicKey }); const m = await reply; assert.equal(m.type, 'telephone-ready'); w.number = m.number; return w; };
  const ring = async (a, b) => { const out = message(a), incoming = message(b); send(a, { type: 'dial', number: b.number }); assert.equal((await out).type, 'call-ringing'); assert.equal((await incoming).type, 'incoming-call'); };
  const answer = async (a, b) => {
    const hostChallenge = message(a), guestChallenge = message(b); send(b, { type: 'answer' });
    const h = await hostChallenge, g = await guestChallenge;
    const proof = (w, m) => sign(null, Buffer.from(JSON.stringify(['witch-telephone-identity-v1', m.challenge.nonce, m.challenge.caller, m.challenge.answerer, m.role])), w.keys.privateKey).toString('base64url');
    const toHost = message(a), toGuest = message(b);
    send(a, { type: 'identity-proof', signature: proof(a, h) }); send(b, { type: 'identity-proof', signature: proof(b, g) }); await toHost; await toGuest;
    const connectedHost = message(a), connectedGuest = message(b);
    send(a, { type: 'identity-verified' }); send(b, { type: 'identity-verified' });
    assert.equal((await connectedHost).role, 'host'); assert.equal((await connectedGuest).role, 'guest');
  };
  return { relay, connect, phone, ring, answer };
}
test('caller becomes host only after the answerer explicitly consents; assigned roles cannot be forged', { timeout: 5000 }, async t => {
  const { phone, ring, answer } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'); await ring(a, b);
  const events = []; a.on('message', data => events.push(JSON.parse(data)));
  await answer(a, b);
  const input = message(a); send(b, { type: 'input', player: 0, payload: {} }); assert.equal((await input).player, 1);
  assert.deepEqual(events.filter(m => ['call-connected', 'guest-joined'].includes(m.type)).map(m => m.type), ['call-connected', 'guest-joined']);
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
  send(a, { type: 'dial', number: b.number }); assert.equal((await ready).type, 'call-unavailable');
});
test('duplicate numbers, fabricated answer and dialing a busy phone are refused', { timeout: 5000 }, async t => {
  const { phone, connect, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'), c = await phone('3333333');
  const duplicate = await connect(), closed = once(duplicate, 'close'); send(duplicate, { type: 'telephone', publicKey: keyFor('1234567').publicKey }); assert.equal((await closed)[0], 1008);
  await ring(a, b); const busy = message(c); send(c, { type: 'dial', number: b.number }); assert.equal((await busy).type, 'call-busy');
  const forged = once(c, 'close'); send(c, { type: 'answer', number: '7654321' }); assert.equal((await forged)[0], 1008);
});
test('CLI capacity overrides reject unsafe values and preserve explicit limits', () => {
  assert.deepEqual(relayEnvironment({ WITCH_MAX_CONNECTIONS: '8', WITCH_MAX_ROOMS: '4' }).limits, { connections: 8, rooms: 4 });
  for (const value of ['0', '-1', '2.2', 'NaN']) assert.throws(() => relayEnvironment({ WITCH_MAX_CONNECTIONS: value }));
});

test('numbers repeat after restart and raw number claims fail without publishing private keys', { timeout: 5000 }, async t => {
  const logs = [], first = await fixture(t, { log: row => logs.push(row) }), a = await first.phone('42'), number = a.number;
  assert.equal(number, telephoneIdentity(keyFor('42').publicKey).number);
  const claimant = await first.connect(), closed = once(claimant, 'close'); send(claimant, { type: 'telephone', number }); assert.equal((await closed)[0], 1008);
  await first.relay.close();
  const second = await fixture(t), again = await second.phone('42'); assert.equal(again.number, number);
  assert.equal(JSON.stringify(logs).includes('privateKey'), false);
});

test('different public keys with the same address cannot replace an active identity, even unlisted', { timeout: 5000 }, async t => {
  // Public synthetic collision fixtures, not player secrets. This explicitly disproves unique number ownership.
  const aKey = keyFor('306').publicKey, bKey = keyFor('1148').publicKey;
  assert.equal(telephoneIdentity(aKey).number, telephoneIdentity(bKey).number);
  const { connect } = await fixture(t), a = await connect(), registered = message(a); send(a, { type: 'telephone', publicKey: aKey });
  const original = await registered; send(a, { type: 'available', payload: false });
  const b = await connect(), rejected = once(b, 'close'); send(b, { type: 'telephone', publicKey: bKey }); assert.equal((await rejected)[0], 1008);
  const left = once(a, 'close'); a.close(); await left;
  // Address reuse is allowed offline; the client's saved public key, not this number, detects the changed holder.
  const offline = await connect(), accepted = message(offline); send(offline, { type: 'telephone', publicKey: bKey }); assert.equal((await accepted).number, original.number);
});

test('dedicated dial bucket permits only three immediate rings and refills one after three seconds', { timeout: 5000 }, async t => {
  let clock = 0; const { phone, ring } = await fixture(t, { now: () => clock });
  const a = await phone('1234567'), b = await phone('7654321'); let incoming = 0;
  b.on('message', bytes => { if (JSON.parse(bytes).type === 'incoming-call') incoming++; });
  for (let i = 0; i < 3; i++) {
    await ring(a, b); const cancelled = message(a), other = message(b); send(a, { type: 'cancel-call' }); await cancelled; await other;
  }
  for (let i = 0; i < 5; i++) { const reply = message(a); send(a, { type: 'dial', number: b.number }); assert.equal((await reply).type, 'call-throttled'); }
  assert.equal(incoming, 3); clock = 3000; await ring(a, b); assert.equal(incoming, 4);
});

test('answer alone and a single verification acknowledgement never admit world state', { timeout: 5000 }, async t => {
  const { phone, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321'); await ring(a, b);
  const h = message(a), g = message(b); send(b, { type: 'answer' }); await h; await g;
  const p = message(a), q = message(b); send(a, { type: 'identity-proof', signature: 'AAAA' }); send(b, { type: 'identity-proof', signature: 'BBBB' }); await p; await q;
  let states = 0; b.on('message', bytes => { if (JSON.parse(bytes).type === 'state') states++; });
  send(a, { type: 'identity-verified' }); const closed = once(a, 'close'); send(a, { type: 'state', payload: { notShared: true } });
  assert.equal((await closed)[0], 1008); assert.equal(states, 0);
});

test('a redial gets a fresh nonce bound to both telephone numbers', { timeout: 5000 }, async t => {
  const { phone, ring } = await fixture(t), a = await phone('1234567'), b = await phone('7654321');
  const nonces = [];
  for (let i = 0; i < 2; i++) {
    await ring(a, b); const h = message(a), g = message(b); send(b, { type: 'answer' }); const challenge = (await h).challenge; await g;
    assert.equal(challenge.caller, a.number); assert.equal(challenge.answerer, b.number); assert.match(challenge.nonce, /^[a-f0-9]{64}$/); nonces.push(challenge.nonce);
    const cancelA = message(a), cancelB = message(b); send(a, { type: 'cancel-call' }); await cancelA; await cancelB;
  }
  assert.notEqual(nonces[0], nonces[1]);
});
