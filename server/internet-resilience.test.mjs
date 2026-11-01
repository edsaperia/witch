// MP-D local-only network resilience audit; synthetic identities and owned ephemeral listeners.
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

async function fixture(t, options = {}, port = 0) {
  const relay = createRelay({ log: () => {}, ...options }), clients = [];
  relay.http.listen(port, '127.0.0.1'); await once(relay.http, 'listening');
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
// Same-socket frame order proves the prior synchronous message was handled, without spending the dial bucket.
async function barrier(p) {
  const payload = Buffer.from('lifecycle-order');
  const pong = once(p.ws, 'pong', { signal: AbortSignal.timeout(2000) });
  p.ws.ping(payload); assert.deepEqual((await pong)[0], payload);
}

const turn = () => new Promise(resolve => setTimeout(resolve, 12));
async function active(a, b) {
  const ha=a.next('ready-accepted'),ga=b.next('ready-accepted'),notice=a.next('guest-ready');
  send(a,{type:'ready'});send(b,{type:'ready'});await Promise.all([ha,ga,notice]);
  send(b,{type:'active'});await barrier(b);
}
run('guest socket loss removes membership, preserves host channel and permits a fresh consented call',async t=>{
  const f=await fixture(t),a=await f.phone('101'),b=await f.phone('202');await complete(a,b);await active(a,b);
  const left=a.next('guest-left');b.ws.terminate();await Promise.all([b.closed,left]);assert.equal(a.ws.readyState,WebSocket.OPEN);
  const replacement=await f.phone('202');await complete(a,replacement);await active(a,replacement);
  const state=replacement.next('state');send(a,{type:'state',payload:{tick:42,night:'same-host-night'}});
  assert.deepEqual((await state).payload,{tick:42,night:'same-host-night'});
});
run('host socket loss closes its visitor and releases both telephone identities and room',async t=>{
  const f=await fixture(t),a=await f.phone('303'),b=await f.phone('404');await complete(a,b);await active(a,b);
  a.ws.terminate();await Promise.all([a.closed,b.closed]);
  const nextA=await f.phone('303'),nextB=await f.phone('404');await complete(nextA,nextB);
  assert.equal(nextA.number,a.number);assert.equal(nextB.number,b.number);
});
run('local relay restart drops both peers and admits fresh identities at the same endpoint',async t=>{
  const f=await fixture(t),a=await f.phone('505'),b=await f.phone('606');await complete(a,b);await active(a,b);
  const port=f.relay.http.address().port;await f.relay.close();await Promise.all([a.closed,b.closed]);
  const next=await fixture(t,{},port),nextA=await next.phone('505'),nextB=await next.phone('606');
  await complete(nextA,nextB);assert.equal(nextA.number,a.number);assert.equal(nextB.number,b.number);
});
run('300ms logical delivery delay and two lost one-second beats do not falsely drop an active visit',async t=>{
  let clock=0;const f=await fixture(t,{now:()=>clock,checkMs:5}),a=await f.phone('707'),b=await f.phone('808');
  await complete(a,b);await active(a,b);
  for(const arrival of [1300,2600,3900,7800]){
    clock=arrival;send(a,{type:'heartbeat'});send(b,{type:'heartbeat'});await Promise.all([barrier(a),barrier(b)]);await turn();
    assert.equal(a.ws.readyState,WebSocket.OPEN);assert.equal(b.ws.readyState,WebSocket.OPEN);
  }
  const input=a.next('input');send(b,{type:'input',payload:{sequence:1,controls:{moveX:1}}});
  assert.equal((await input).payload.sequence,1);
});
run('active visitor survives4999ms silence but expires at5000ms while host stays available',async t=>{
  let clock=0;const f=await fixture(t,{now:()=>clock,checkMs:5}),a=await f.phone('909'),b=await f.phone('1001');
  await complete(a,b);await active(a,b);
  clock=4999;send(a,{type:'heartbeat'});await barrier(a);await turn();assert.equal(b.ws.readyState,WebSocket.OPEN);
  const left=a.next('guest-left');clock=5000;await Promise.all([b.closed,left]);assert.equal(a.ws.readyState,WebSocket.OPEN);
});
run('heartbeats keep a pending call alive but do not extend30000ms answer timeout',async t=>{
  let clock=0;const f=await fixture(t,{now:()=>clock,checkMs:5}),a=await f.phone('1101'),b=await f.phone('1201');await ring(a,b);
  clock=29999;send(a,{type:'heartbeat'});send(b,{type:'heartbeat'});await Promise.all([barrier(a),barrier(b)]);
  assert.equal(a.history.some(m=>m.type==='call-timeout'),false);
  const replies=[a.next('call-timeout'),b.next('call-timeout')];clock=30000;await Promise.all(replies);await complete(a,b);
});
run('post-upgrade application handshake has its separate10000ms deadline',async t=>{
  let clock=0;const f=await fixture(t,{now:()=>clock,checkMs:5}),ws=new WebSocket(f.url);ws.on('error',()=>{});
  const closed=once(ws,'close');t.after(()=>ws.terminate());await once(ws,'open');
  clock=9999;await turn();assert.equal(ws.readyState,WebSocket.OPEN);clock=10000;await closed;
});

