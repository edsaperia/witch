import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';

/** Relay only: the host browser owns all simulation and permanent outcomes. */
export function createRelay({ dropMs = 5000, joiningGraceMs = 180000, hostJoiningDropMs = 20000, checkMs = 250, now = Date.now, log = line => console.info(JSON.stringify(line)), build = process.env.WITCH_SHA ?? 'local-unidentified' } = {}) {
  if (!(Number.isFinite(dropMs) && Number.isFinite(joiningGraceMs) && joiningGraceMs >= dropMs && Number.isFinite(hostJoiningDropMs) && hostJoiningDropMs >= dropMs && Number.isFinite(checkMs) && dropMs > 0 && checkMs > 0)) throw new Error('Invalid relay timing');
  const rooms = new Map();
  const http = createServer((_req, res) => { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ service: 'witch-relay', protocol: 1, build })); });
  const wss = new WebSocketServer({ server: http, maxPayload: 8 * 1024 * 1024 });
  let connectionNumber = 0;
  const stop = (ws, rule, code, detail, terminate = false) => {
    ws.closeRule ??= rule; ws.closeDetail ??= detail;
    if (terminate) ws.terminate(); else ws.close(code, detail);
  };
  const send = (ws, message) => {
    if (ws?.readyState !== WebSocket.OPEN) return;
    if (ws.bufferedAmount > 16 * 1024 * 1024) { stop(ws, 'backpressure', 1008, 'Slow connection'); return; }
    ws.send(JSON.stringify(message));
  };
  wss.on('connection', ws => {
    let room, role;
    ws.connectionNumber = ++connectionNumber;
    ws.lastMessage = now();
    ws.joinedAt = now(); ws.playable = false;
    ws.on('message', bytes => {
      let m;
      try { m = JSON.parse(bytes.toString()); } catch { stop(ws, 'protocol', 1008, 'Invalid JSON'); return; }
      if (!m || typeof m !== 'object' || m.protocol !== 1) { stop(ws, 'protocol', 1008, 'Incompatible protocol'); return; }
      ws.lastMessage = now();
      if (!room) {
        if (m.type === 'host' && typeof m.room === 'string' && /^\d{7}$/.test(m.room) && !rooms.has(m.room)) {
          role = 'host'; room = { number: m.room, host: ws, guest: null, token: randomBytes(24).toString('hex') };
          rooms.set(m.room, room);
          send(ws, { protocol: 1, type: 'hosted', room: m.room, token: room.token, player: 0 });
        } else if (m.type === 'join' && typeof m.room === 'string' && typeof m.token === 'string') {
          const found = rooms.get(m.room);
          if (!found || found.token !== m.token || found.guest) { stop(ws, 'protocol', 1008, 'Room unavailable'); return; }
          role = 'guest'; room = found; room.guest = ws;
          send(ws, { protocol: 1, type: 'joined', player: 1 });
          send(room.host, { protocol: 1, type: 'guest-joined', player: 1 });
        } else stop(ws, 'protocol', 1008, 'Room unavailable');
        ws.onlineRole = role; ws.onlineRoom = room;
        return;
      }
      if (m.type === 'heartbeat') return;
      if (m.type === 'ready') {
        if (!ws.renderReady) {
          ws.renderReady = true;
          if (role === 'host') ws.playable = true;
          send(ws, { protocol: 1, type: 'ready-accepted' });
          if (role === 'guest') send(room.host, { protocol: 1, type: 'guest-ready', player: 1 });
        }
        return;
      }
      if (m.type === 'active' && role === 'guest' && ws.renderReady) { ws.playable = true; room.host.lastMessage = now(); return; }
      if (role === 'guest' && m.type === 'input') send(room.host, { protocol: 1, type: 'input', player: 1, payload: m.payload });
      else if (role === 'host' && m.type === 'state') send(room.guest, { protocol: 1, type: 'state', player: 0, payload: m.payload });
      else stop(ws, 'protocol', 1008, 'Message not permitted');
    });
    ws.on('error', () => { ws.closeRule ??= 'socket-error'; });
    ws.on('close', code => {
      log({ event: 'relay-close', connection: ws.connectionNumber, role: role ?? 'unassigned', rule: ws.closeRule ?? 'client-close', detail: ws.closeDetail ?? '', code, silenceMs: now() - ws.lastMessage, joiningMs: now() - ws.joinedAt, limitMs: ws.closeLimit });
      if (!room) return;
      if (role === 'host') {
        rooms.delete(room.number);
        if (room.guest) stop(room.guest, 'host-left', 1001, 'Host left');
      } else if (room.guest === ws) {
        room.guest = null;
        room.host.lastMessage = now();
        send(room.host, { protocol: 1, type: 'guest-left', player: 1 });
      }
    });
  });
  const timer = setInterval(() => {
    for (const ws of wss.clients) {
      const joiningGuest = ws.onlineRole === 'host' && ws.onlineRoom?.guest && !ws.onlineRoom.guest.playable;
      const limit = ws.playable ? (joiningGuest ? hostJoiningDropMs : dropMs) : joiningGraceMs;
      const elapsed = ws.playable ? now() - ws.lastMessage : now() - ws.joinedAt;
      if (elapsed >= limit) { ws.closeLimit = limit; stop(ws, ws.playable ? 'silence' : 'join-grace', 1001, 'Liveness deadline', true); }
    }
  }, checkMs);
  timer.unref();
  return {
    http,
    async close() {
      clearInterval(timer);
      for (const ws of wss.clients) stop(ws, 'shutdown', 1001, 'Relay shutdown', true);
      await new Promise(resolve => wss.close(resolve));
      if (http.listening) await new Promise(resolve => http.close(resolve));
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const relay = createRelay({ dropMs: Number(process.env.WITCH_DROP_MS ?? 5000), joiningGraceMs: Number(process.env.WITCH_JOIN_GRACE_MS ?? 180000), hostJoiningDropMs: Number(process.env.WITCH_HOST_JOIN_DROP_MS ?? 20000) });
  relay.http.listen(Number(process.env.PORT ?? 8787), process.env.HOST ?? '127.0.0.1', () => console.log('Witch relay listening', relay.http.address()));
}
