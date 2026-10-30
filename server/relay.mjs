import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';

/** Relay only: the host browser owns all simulation and permanent outcomes. */
export function createRelay({ dropMs = 5000, checkMs = 250, now = Date.now } = {}) {
  if (!(Number.isFinite(dropMs) && Number.isFinite(checkMs) && dropMs > 0 && checkMs > 0)) throw new Error('Invalid relay timing');
  const rooms = new Map();
  const http = createServer((_req, res) => { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ service: 'witch-relay', protocol: 1 })); });
  const wss = new WebSocketServer({ server: http, maxPayload: 8 * 1024 * 1024 });
  const send = (ws, message) => {
    if (ws?.readyState !== WebSocket.OPEN) return;
    if (ws.bufferedAmount > 16 * 1024 * 1024) { ws.close(1008, 'Slow connection'); return; }
    ws.send(JSON.stringify(message));
  };
  wss.on('connection', ws => {
    let room, role;
    ws.lastMessage = now();
    ws.on('message', bytes => {
      let m;
      try { m = JSON.parse(bytes.toString()); } catch { ws.close(1008, 'Invalid JSON'); return; }
      if (!m || typeof m !== 'object' || m.protocol !== 1) { ws.close(1008, 'Incompatible protocol'); return; }
      ws.lastMessage = now();
      if (!room) {
        if (m.type === 'host' && typeof m.room === 'string' && /^\d{7}$/.test(m.room) && !rooms.has(m.room)) {
          role = 'host'; room = { number: m.room, host: ws, guest: null, token: randomBytes(24).toString('hex') };
          rooms.set(m.room, room);
          send(ws, { protocol: 1, type: 'hosted', room: m.room, token: room.token, player: 0 });
        } else if (m.type === 'join' && typeof m.room === 'string' && typeof m.token === 'string') {
          const found = rooms.get(m.room);
          if (!found || found.token !== m.token || found.guest) { ws.close(1008, 'Room unavailable'); return; }
          role = 'guest'; room = found; room.guest = ws;
          send(ws, { protocol: 1, type: 'joined', player: 1 });
          send(room.host, { protocol: 1, type: 'guest-joined', player: 1 });
        } else ws.close(1008, 'Room unavailable');
        return;
      }
      if (m.type === 'heartbeat') return;
      if (role === 'guest' && m.type === 'input') send(room.host, { protocol: 1, type: 'input', player: 1, payload: m.payload });
      else if (role === 'host' && m.type === 'state') send(room.guest, { protocol: 1, type: 'state', player: 0, payload: m.payload });
      else ws.close(1008, 'Message not permitted');
    });
    ws.on('error', () => {});
    ws.on('close', () => {
      if (!room) return;
      if (role === 'host') {
        rooms.delete(room.number);
        room.guest?.close(1001, 'Host left');
      } else if (room.guest === ws) {
        room.guest = null;
        send(room.host, { protocol: 1, type: 'guest-left', player: 1 });
      }
    });
  });
  const timer = setInterval(() => {
    for (const ws of wss.clients) if (now() - ws.lastMessage >= dropMs) ws.terminate();
  }, checkMs);
  timer.unref();
  return {
    http,
    async close() {
      clearInterval(timer);
      for (const ws of wss.clients) ws.terminate();
      await new Promise(resolve => wss.close(resolve));
      if (http.listening) await new Promise(resolve => http.close(resolve));
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const relay = createRelay({ dropMs: Number(process.env.WITCH_DROP_MS ?? 5000) });
  relay.http.listen(Number(process.env.PORT ?? 8787), process.env.HOST ?? '127.0.0.1', () => console.log('Witch relay listening', relay.http.address()));
}
