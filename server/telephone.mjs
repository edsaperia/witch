/** Introductions only: a number locates someone at their phone, but only their explicit answer admits a guest. */
export function telephoneDirectory({ send, stop, rooms, roomLimit, now }) {
  const listed = new Map(), pending = new Set();
  const valid = number => typeof number === 'string' && /^[1-9][0-9]{6}$/.test(number);
  const tell = (ws, type, extra = {}) => send(ws, { protocol: 1, type, ...extra });
  const finish = (call, type) => {
    pending.delete(call); call.caller.call = call.answerer.call = null;
    tell(call.caller, type); tell(call.answerer, type);
  };
  return {
    handle(ws, m) {
      if (m.type === 'telephone') {
        if (ws.onlineRole || !valid(m.number) || listed.has(m.number) || rooms.has(m.number)) { stop(ws, 'protocol', 1008, 'Number unavailable'); return true; }
        ws.telephone = m.number; ws.onlineRole = 'telephone'; ws.playable = true; listed.set(m.number, ws);
        tell(ws, 'telephone-ready', { number: m.number }); return true;
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
        const ownRoom = rooms.get(ws.telephone), reusable = ownRoom?.host === ws && !ownRoom.guest;
        if (!valid(m.number) || m.number === ws.telephone || !(ws.onlineRole === 'telephone' || reusable) || ws.call || listed.get(ws.telephone) !== ws) { tell(ws, 'call-busy'); return true; }
        const answerer = listed.get(m.number);
        if (!answerer || answerer.closeRule) { tell(ws, 'call-unavailable'); return true; }
        if (answerer.call || answerer.onlineRole !== 'telephone' || !reusable && (rooms.has(ws.telephone) || rooms.size + pending.size >= roomLimit)) { tell(ws, 'call-busy'); return true; }
        const call = { caller: ws, answerer, at: now() }; ws.call = answerer.call = call; pending.add(call);
        tell(ws, 'call-ringing', { number: m.number }); tell(answerer, 'incoming-call', { number: ws.telephone }); return true;
      }
      if (m.type === 'answer') {
        const call = ws.call;
        if (!call || call.answerer !== ws) { stop(ws, 'protocol', 1008, 'No incoming call'); return true; }
        const caller = call.caller;
        // Reserve one room per pending call, then atomically promote these exact sockets; no client-supplied role or token.
        const existing = rooms.get(caller.telephone), reusable = existing?.host === caller && !existing.guest;
        if (caller.closeRule || caller.readyState !== 1 || listed.get(caller.telephone) !== caller || listed.get(ws.telephone) !== ws || !reusable && (existing || rooms.size >= roomLimit)) { finish(call, 'call-cancelled'); return true; }
        const room = reusable ? existing : { number: caller.telephone, host: caller, guest: null, token: null }; room.guest = ws;
        pending.delete(call); caller.call = ws.call = null; listed.delete(ws.telephone);
        rooms.set(room.number, room); caller.assignRoom(room, 'host'); ws.assignRoom(room, 'guest');
        tell(caller, 'call-connected', { role: 'host', player: 0, number: ws.telephone });
        tell(ws, 'call-connected', { role: 'guest', player: 1, number: caller.telephone });
        tell(caller, 'guest-joined', { player: 1 }); return true;
      }
      if (m.type === 'decline' || m.type === 'cancel-call') {
        if (ws.call) finish(ws.call, m.type === 'decline' && ws.call.answerer === ws ? 'call-declined' : 'call-cancelled');
        return true;
      }
      return false;
    },
    closed(ws) { if (listed.get(ws.telephone) === ws) listed.delete(ws.telephone); if (ws.call) finish(ws.call, 'call-cancelled'); },
    check() { for (const call of pending) if (now() - call.at >= 30000) finish(call, 'call-timeout'); },
  };
}
