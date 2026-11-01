// MP-B telephone disconnect/proof-order regression audit; PLAN first recorded in482b769b9, canonical1476#6556803207.
// Own branch: codex/mp-relay-lifecycle-audit.
// Worktree: C:/Users/edsap/Documents/ChatGPT/witch game/work/mp-relay-lifecycle-audit.
// Base: current prototype98558e2612a75ee4607c1914d9f4f1b113f3cfd6.
// Only this NEW test file is owned; no production/protocol/permission/rate/Render changes.
// 1. Reuse existing telephone/server factory and fixture patterns. Each test owns/cleans its sockets/timers.
// 2. Cover disconnect during ringing, challenge and one-sided acceptance; reject stale/reused proofs/call state.
// 3. Cover decline, timeout/re-register, room/socket cleanup and bounded caps with deterministic clocks where supported.
// 4. Run only nearby CPU tests, one worker. Report each case PASS or a minimal failing test to canonical;
//   1538's owner alone fixes production. No browser, live relay/service load or hardware run.
// Exact1538/ea88aeaf62747d55f35214461c3e9a6109778d70 dependency normally merged under6556898808.
// No later1538 head or production fix is authored here. Per-case results belong onPR1607.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createPrivateKey, createPublicKey, sign, verify } from 'node:crypto';
import { WebSocket } from 'ws';
import { createRelay } from './relay.mjs';
import { telephoneIdentity } from './telephone.mjs';

// Public synthetic keys, following the existing telephone.test.mjs fixture; never player identities.
const keyFor = label => {
  const seed = Buffer.alloc(32); seed.writeUInt32BE(Number(label), 28);
  const privateKey = createPrivateKey({ key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), seed]), format: 'der', type: 'pkcs8' });
  return { privateKey, publicKey: { algorithm: 'Ed25519', spki: createPublicKey(privateKey).export({ format: 'der', type: 'spki' }).toString('base64url') } };
};
const send = (p, m) => p.ws.send(JSON.stringify({ protocol: 1, ...m }));
const transcript = m => Buffer.from(JSON.stringify(['witch-telephone-identity-v1', m.challenge.nonce, m.challenge.caller, m.challenge.answerer, m.role]));
const noAdmission = (...peers) => {
  for (const p of peers) assert.deepEqual(p.history.filter(m => ['call-connected', 'guest-joined', 'state', 'input'].includes(m.type)), []);
};
const run = (name, fn) => test(name, { timeout: 5000 }, fn);

function mailbox(ws) {
  const history = [], queue = [], pending = new Set();
  const closed = new Promise(resolve => ws.once('close', (code, reason) => {
    for (const w of pending) { clearTimeout(w.timer); w.reject(Error(`Socket closed ${code} waiting for ${w.type}`)); }
    pending.clear(); resolve({ code, reason: reason.toString() });
  }));
  ws.on('error', () => {}); // Expected policy/upgrade failures are asserted by the relevant test.
  ws.on('message', bytes => {
    const m = JSON.parse(bytes.toString()); history.push(m);
    const waiter = [...pending].find(w => w.type === m.type);
    if (waiter) { pending.delete(waiter); clearTimeout(waiter.timer); waiter.resolve(m); }
    else queue.push(m);
  });
  return { ws, history, closed, next(type) {
    const i = queue.findIndex(m => m.type === type);
    if (i >= 0) return Promise.resolve(queue.splice(i, 1)[0]);
    if (ws.readyState === WebSocket.CLOSED) return Promise.reject(Error(`Closed socket waiting for ${type}`));
    return new Promise((resolve, reject) => {
      const waiter = { type, resolve, reject };
      waiter.timer = setTimeout(() => { pending.delete(waiter); reject(Error(`No ${type}; received ${history.map(m => m.type).join(',')}`)); }, 2000);
      pending.add(waiter);
    });
  } };
}

async function fixture(t, options = {}) {
  const relay = createRelay({ log: () => {}, ...options }), clients = [];
  relay.http.listen(0, '127.0.0.1'); await once(relay.http, 'listening');
  const url = `ws://127.0.0.1:${relay.http.address().port}`;
  t.after(async () => { await relay.close(); for (const p of clients) if (p.ws.readyState !== WebSocket.CLOSED) p.ws.terminate(); await Promise.all(clients.map(p => p.closed)); });
  const phone = async label => {
    const p = mailbox(new WebSocket(url)); clients.push(p); await once(p.ws, 'open');
    p.keys = keyFor(label); p.label = label;
    const ready = p.next('telephone-ready'); send(p, { type: 'telephone', publicKey: p.keys.publicKey });
    p.number = (await ready).number; assert.equal(p.number, telephoneIdentity(p.keys.publicKey).number); return p;
  };
  return { relay, url, phone };
}
async function ring(a, b) {
  const out = a.next('call-ringing'), incoming = b.next('incoming-call'); send(a, { type: 'dial', number: b.number });
  const [x, y] = await Promise.all([out, incoming]); assert.equal(x.number, b.number); assert.equal(y.number, a.number);
}
async function challenge(a, b) {
  const h = a.next('call-challenge'), g = b.next('call-challenge'); send(b, { type: 'answer' });
  const pair = await Promise.all([h, g]);
  assert.equal(pair[0].role, 'host'); assert.equal(pair[1].role, 'guest'); assert.deepEqual(pair[0].challenge, pair[1].challenge);
  assert.deepEqual(pair[0].publicKey, b.keys.publicKey); assert.deepEqual(pair[1].publicKey, a.keys.publicKey);
  assert.equal(pair[0].challenge.caller, a.number); assert.equal(pair[0].challenge.answerer, b.number);
  assert.match(pair[0].challenge.nonce, /^[a-f0-9]{64}$/); return pair;
}
async function proofs(a, b, pair) {
  const sigA = sign(null, transcript(pair[0]), a.keys.privateKey).toString('base64url');
  const sigB = sign(null, transcript(pair[1]), b.keys.privateKey).toString('base64url');
  const toA = a.next('identity-proof'), toB = b.next('identity-proof');
  send(a, { type: 'identity-proof', signature: sigA }); send(b, { type: 'identity-proof', signature: sigB });
  const [atA, atB] = await Promise.all([toA, toB]);
  assert.equal(verify(null, transcript(pair[1]), createPublicKey(b.keys.privateKey), Buffer.from(atA.signature, 'base64url')), true);
  assert.equal(verify(null, transcript(pair[0]), createPublicKey(a.keys.privateKey), Buffer.from(atB.signature, 'base64url')), true);
}
async function admitted(a, b) {
  const h = a.next('call-connected'), g = b.next('call-connected'), notice = a.next('guest-joined');
  send(a, { type: 'identity-verified' }); send(b, { type: 'identity-verified' });
  const [x, y, n] = await Promise.all([h, g, notice]);
  assert.equal(x.role, 'host'); assert.equal(x.player, 0); assert.equal(y.role, 'guest'); assert.equal(y.player, 1); assert.equal(n.player, 1);
}
async function complete(a, b) { await ring(a, b); const pair = await challenge(a, b); await proofs(a, b, pair); await admitted(a, b); return pair; }
async function barrier(p) { const reply = p.next('call-busy'); send(p, { type: 'dial', number: 'invalid' }); await reply; }

for (const phase of ['ringing', 'challenge', 'one-sided acceptance']) for (const side of ['caller', 'answerer']) {
  run(`close ${side} during ${phase}: no admission, survivor reusable and identity released`, async t => {
    const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321'); await ring(a, b);
    if (phase !== 'ringing') {
      const pair = await challenge(a, b);
      if (phase === 'one-sided acceptance') { await proofs(a, b, pair); send(a, { type: 'identity-verified' }); await barrier(a); }
    }
    noAdmission(a, b);
    const gone = side === 'caller' ? a : b, survivor = side === 'caller' ? b : a;
    const cancelled = survivor.next('call-cancelled'); gone.ws.close(); await Promise.all([gone.closed, cancelled]);
    noAdmission(a, b);
    const replacement = await f.phone(gone.label);
    const caller = side === 'caller' ? replacement : survivor, answerer = side === 'caller' ? survivor : replacement;
    await complete(caller, answerer);
  });
}

run('late proof after cancellation is rejected and cannot admit world traffic', async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321');
  await ring(a, b); const pair = await challenge(a, b);
  const replies = [a.next('call-cancelled'), b.next('call-cancelled')]; send(b, { type: 'cancel-call' }); await Promise.all(replies);
  send(a, { type: 'identity-proof', signature: sign(null, transcript(pair[0]), a.keys.privateKey).toString('base64url') });
  assert.equal((await a.closed).code, 1008); noAdmission(a, b);
  const replacement = await f.phone(a.label); await complete(replacement, b);
});

run('redial has a new challenge and cannot reuse a previous one-sided verification', async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321');
  await ring(a, b); const first = await challenge(a, b); await proofs(a, b, first); send(a, { type: 'identity-verified' });
  const cancelled = [a.next('call-cancelled'), b.next('call-cancelled')]; send(b, { type: 'cancel-call' }); await Promise.all(cancelled);
  await ring(a, b); const fresh = await challenge(a, b); assert.notEqual(fresh[0].challenge.nonce, first[0].challenge.nonce);
  const stale = sign(null, transcript(first[0]), a.keys.privateKey);
  assert.equal(verify(null, transcript(fresh[0]), createPublicKey(a.keys.privateKey), stale), false); // Peer verifier boundary, not server-side signature validation.
  await proofs(a, b, fresh); send(b, { type: 'identity-verified' }); await barrier(a); noAdmission(a, b);
  const connected = [a.next('call-connected'), b.next('call-connected'), a.next('guest-joined')]; send(a, { type: 'identity-verified' }); await Promise.all(connected);
});

run('a stale verification acknowledgement cannot replace fresh proofs after redial', async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321');
  await ring(a, b); await challenge(a, b);
  const cancelled = [a.next('call-cancelled'), b.next('call-cancelled')]; send(a, { type: 'cancel-call' }); await Promise.all(cancelled);
  await ring(a, b); await challenge(a, b);
  const peerCancelled = b.next('call-cancelled'); send(a, { type: 'identity-verified' });
  assert.equal((await a.closed).code, 1008); await peerCancelled; noAdmission(a, b);
});

run('duplicate proofs from one socket never count as both identities', async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321');
  await ring(a, b); const pair = await challenge(a, b), proof = sign(null, transcript(pair[0]), a.keys.privateKey).toString('base64url');
  const forwarded = b.next('identity-proof'); send(a, { type: 'identity-proof', signature: proof }); await forwarded;
  send(a, { type: 'identity-proof', signature: proof }); send(a, { type: 'identity-verified' });
  assert.equal((await a.closed).code, 1008); noAdmission(a, b);
});

for (const sender of ['caller', 'answerer']) run(`one-sided verification cannot forward ${sender === 'caller' ? 'state' : 'input'} before mutual consent`, async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321');
  await ring(a, b); const pair = await challenge(a, b); await proofs(a, b, pair);
  send(a, { type: 'identity-verified' }); await barrier(a); noAdmission(a, b);
  const p = sender === 'caller' ? a : b, other = sender === 'caller' ? b : a, cancelled = other.next('call-cancelled');
  send(p, { type: sender === 'caller' ? 'state' : 'input', payload: { forbiddenBeforeConsent: true } });
  assert.equal((await p.closed).code, 1008); await cancelled; noAdmission(a, b);
});

run('decline releases the pending call and a later genuine mutual-consent call succeeds', async t => {
  const f = await fixture(t), a = await f.phone('1234567'), b = await f.phone('7654321'); await ring(a, b);
  const declined = [a.next('call-declined'), b.next('call-declined')]; send(b, { type: 'decline' }); await Promise.all(declined);
  noAdmission(a, b); await complete(a, b);
});

for (const phase of ['ringing', 'challenge', 'one-sided acceptance']) {
  run(`${phase} timeout releases call state and permits re-registration`, async t => {
    let clock = 0;
    // Injected fixture liveness exceeds the fixed 30s call deadline solely to isolate that deadline; production timing is unchanged.
    const f = await fixture(t, { now: () => clock, checkMs: 5, dropMs: 60000, hostJoiningDropMs: 60000 });
    const a = await f.phone('1234567'), b = await f.phone('7654321'); await ring(a, b);
    if (phase !== 'ringing') {
      const pair = await challenge(a, b);
      if (phase === 'one-sided acceptance') { await proofs(a, b, pair); send(a, { type: 'identity-verified' }); await barrier(a); }
    }
    const expired = [a.next('call-timeout'), b.next('call-timeout')]; clock = 30000; await Promise.all(expired); noAdmission(a, b);
    a.ws.close(); b.ws.close(); await Promise.all([a.closed, b.closed]);
    const freshA = await f.phone(a.label), freshB = await f.phone(b.label); await complete(freshA, freshB);
  });
}

run('pending calls consume the room cap and disconnect frees the reservation', async t => {
  const f = await fixture(t, { limits: { rooms: 1 } });
  const a = await f.phone('1234567'), b = await f.phone('7654321'), c = await f.phone('3333333'), d = await f.phone('4444444');
  await ring(a, b); const busy = c.next('call-busy'); send(c, { type: 'dial', number: d.number }); await busy;
  assert.equal(d.history.some(m => m.type === 'incoming-call'), false);
  const cancelled = b.next('call-cancelled'); a.ws.close(); await Promise.all([a.closed, cancelled]);
  await complete(c, d);
});

run('host disconnect closes its guest and frees room and registered identities', async t => {
  const f = await fixture(t, { limits: { rooms: 1 } }), a = await f.phone('1234567'), b = await f.phone('7654321');
  await complete(a, b); a.ws.close(); await Promise.all([a.closed, b.closed]);
  const freshA = await f.phone(a.label), freshB = await f.phone(b.label); await complete(freshA, freshB);
});

run('guest disconnect keeps only a reusable host room, with fresh consent on redial', async t => {
  const f = await fixture(t, { limits: { rooms: 1 } }), a = await f.phone('1234567'), b = await f.phone('7654321');
  const first = await complete(a, b), left = a.next('guest-left'); b.ws.close(); await Promise.all([b.closed, left]);
  const freshB = await f.phone(b.label); await ring(a, freshB); const fresh = await challenge(a, freshB);
  assert.notEqual(fresh[0].challenge.nonce, first[0].challenge.nonce);
  await proofs(a, freshB, fresh); await admitted(a, freshB);
});

run('socket cap refuses one excess upgrade and reclaims capacity after close', async t => {
  const f = await fixture(t, { limits: { connections: 2 } }), a = await f.phone('1234567'), b = await f.phone('7654321');
  const code = await new Promise((resolve, reject) => {
    const ws = new WebSocket(f.url); ws.on('error', () => {});
    ws.once('unexpected-response', (_req, res) => { const status = res.statusCode; res.resume(); ws.terminate(); resolve(status); });
    ws.once('open', () => { ws.terminate(); reject(Error('Excess socket admitted')); });
  });
  assert.equal(code, 503); a.ws.close(); await a.closed;
  const replacement = await f.phone(a.label); await complete(replacement, b);
});
