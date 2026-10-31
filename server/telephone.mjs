import { createHash, createPublicKey, randomBytes } from 'node:crypto';
import { bucket } from './guards.mjs';

/** Short address derivation, NOT exclusive ownership: 9million outputs necessarily collide. */
export function telephoneIdentity(key) {
  if (!key || !['Ed25519', 'ECDSA-P256'].includes(key.algorithm) || typeof key.spki !== 'string' || !/^[A-Za-z0-9_-]{1,512}$/.test(key.spki)) return null;
  try {
    const der = Buffer.from(key.spki, 'base64url'), imported = createPublicKey({ key: der, format: 'der', type: 'spki' });
    if (der.toString('base64url') !== key.spki || !imported.export({ format: 'der', type: 'spki' }).equals(der)) return null;
    if (key.algorithm === 'Ed25519' ? imported.asymmetricKeyType !== 'ed25519' : imported.asymmetricKeyType !== 'ec' || imported.asymmetricKeyDetails?.namedCurve !== 'prime256v1') return null;
    const identity = createHash('sha256').update(`${key.algorithm}:${key.spki}`).digest('hex');
    return { number: String(1000000 + Number(BigInt('0x' + identity) % 9000000n)), publicKey: { algorithm: key.algorithm, spki: key.spki } };
  } catch { return null; }
}

/** Introductions only: a number locates someone at their phone, but only their explicit answer admits a guest. */
export function telephoneDirectory({ send, stop, rooms, roomLimit, now }) {
  const listed = new Map(), owners = new Map(), pending = new Set();
  const valid = number => typeof number === 'string' && /^[1-9][0-9]{6}$/.test(number);
  const tell = (ws, type, extra = {}) => send(ws, { protocol: 1, type, ...extra });
  const finish = (call, type) => {
    pending.delete(call); call.caller.call = call.answerer.call = null;
    tell(call.caller, type); tell(call.answerer, type);
  };
  return {
    handle(ws, m) {
      if (m.type === 'telephone') {
        const derived = telephoneIdentity(m.publicKey);
        if (ws.onlineRole || m.number !== undefined || !derived || owners.has(derived.number) || rooms.has(derived.number)) { stop(ws, 'protocol', 1008, 'Number unavailable'); return true; }
        // Address collisions fail closed while active; clients verify key possession and saved friendship.
        ws.telephone = derived.number; ws.telephoneKey = derived.publicKey; ws.onlineRole = 'telephone'; ws.playable = true;
        owners.set(derived.number, ws); listed.set(derived.number, ws); ws.dialAllowed = bucket(1 / 3, 3, now);
        tell(ws, 'telephone-ready', { number: derived.number }); return true;
      }
      if (!ws.telephone) return false;
      if (m.type === 'available' && typeof m.payload === 'boolean') {
        if (m.payload) {
          if (listed.has(ws.telephone) && listed.get(ws.telephone) !== ws) { stop(ws, 'protocol', 1008, 'Number unavailable'); return true; }
          listed.set(ws.telephone, ws);
        } else {
          if (listed.get(ws.telephone) === ws) listed.delete(ws.telephone);
          if (ws.call) finish(ws.call, 'call-cancelled');
        }
        return true;
      }
      if (m.type === 'dial') {
        if (!ws.dialAllowed()) { tell(ws, 'call-throttled'); return true; }
        const ownRoom = rooms.get(ws.telephone), reusable = ownRoom?.host === ws && !ownRoom.guest;
        if (!valid(m.number) || m.number === ws.telephone || !(ws.onlineRole === 'telephone' || reusable) || ws.call || listed.get(ws.telephone) !== ws) { tell(ws, 'call-busy'); return true; }
        const answerer = listed.get(m.number);
        if (!answerer || answerer.closeRule) { tell(ws, 'call-unavailable'); return true; }
        if (answerer.call || answerer.onlineRole !== 'telephone' || !reusable && (rooms.has(ws.telephone) || rooms.size + pending.size >= roomLimit)) { tell(ws, 'call-busy'); return true; }
        const call = { caller: ws, answerer, at: now(), phase: 'ringing', proofs: new Set(), verified: new Set() }; ws.call = answerer.call = call; pending.add(call);
        tell(ws, 'call-ringing', { number: m.number }); tell(answerer, 'incoming-call', { number: ws.telephone }); return true;
      }
      if (m.type === 'answer') {
        const call = ws.call;
        if (!call || call.answerer !== ws) { stop(ws, 'protocol', 1008, 'No incoming call'); return true; }
        if (call.phase !== 'ringing') return true;
        call.phase = 'verifying'; call.at = now();
        call.challenge = { nonce: randomBytes(32).toString('hex'), caller: call.caller.telephone, answerer: ws.telephone };
        tell(call.caller, 'call-challenge', { role: 'host', challenge: call.challenge, publicKey: ws.telephoneKey });
        tell(ws, 'call-challenge', { role: 'guest', challenge: call.challenge, publicKey: call.caller.telephoneKey });
        return true;
      }
      if (m.type === 'identity-proof') {
        const call = ws.call;
        if (!call || call.phase !== 'verifying' || typeof m.signature !== 'string' || !/^[A-Za-z0-9_-]{1,256}$/.test(m.signature)) { stop(ws, 'protocol', 1008, 'Invalid identity proof'); return true; }
        if (!call.proofs.has(ws)) { call.proofs.add(ws); tell(ws === call.caller ? call.answerer : call.caller, 'identity-proof', { signature: m.signature }); }
        return true;
      }
      if (m.type === 'identity-verified') {
        const call = ws.call;
        if (!call || call.phase !== 'verifying' || call.proofs.size !== 2) { stop(ws, 'protocol', 1008, 'Identity check incomplete'); return true; }
        call.verified.add(ws); if (call.verified.size !== 2) return true;
        const caller = call.caller;
        // Reserve one room per pending call, then atomically promote these exact sockets; no client-supplied role or token.
        const answerer = call.answerer, existing = rooms.get(caller.telephone), reusable = existing?.host === caller && !existing.guest;
        if (caller.closeRule || answerer.closeRule || caller.readyState !== 1 || answerer.readyState !== 1 || listed.get(caller.telephone) !== caller || listed.get(answerer.telephone) !== answerer || !reusable && (existing || rooms.size >= roomLimit)) { finish(call, 'call-cancelled'); return true; }
        const room = reusable ? existing : { number: caller.telephone, host: caller, guest: null, token: null }; room.guest = answerer;
        pending.delete(call); caller.call = answerer.call = null; listed.delete(answerer.telephone);
        rooms.set(room.number, room); caller.assignRoom(room, 'host'); answerer.assignRoom(room, 'guest');
        tell(caller, 'call-connected', { role: 'host', player: 0, number: answerer.telephone });
        tell(answerer, 'call-connected', { role: 'guest', player: 1, number: caller.telephone });
        tell(caller, 'guest-joined', { player: 1 }); return true;
      }
      if (m.type === 'decline' || m.type === 'cancel-call') {
        if (ws.call) finish(ws.call, m.type === 'decline' && ws.call.answerer === ws ? 'call-declined' : 'call-cancelled');
        return true;
      }
      return false;
    },
    closed(ws) { if (owners.get(ws.telephone) === ws) owners.delete(ws.telephone); if (listed.get(ws.telephone) === ws) listed.delete(ws.telephone); if (ws.call) finish(ws.call, 'call-cancelled'); },
    check() { for (const call of pending) if (now() - call.at >= 30000) finish(call, 'call-timeout'); },
  };
}
