import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';
import { bucket, limitsWith, originSet, relayEnvironment, sendBounded } from './guards.mjs';
import { telephoneDirectory } from './telephone.mjs';

/** Relay only: the host browser owns all simulation and permanent outcomes. */
export function createRelay({ dropMs = 5000, joiningGraceMs = 600000, joiningStallMs = 90000, hostJoiningDropMs = 20000, checkMs = 250, now = Date.now, log = line => console.info(JSON.stringify(line)), build = process.env.WITCH_SHA ?? 'local-unidentified', allowedOrigins, limits: overrides } = {}) {
  if (!(Number.isFinite(dropMs) && Number.isFinite(joiningGraceMs) && joiningGraceMs >= dropMs && Number.isFinite(joiningStallMs) && joiningStallMs > 0 && Number.isFinite(hostJoiningDropMs) && hostJoiningDropMs >= dropMs && Number.isFinite(checkMs) && dropMs > 0 && checkMs > 0)) throw new Error('Invalid relay timing');
  const limits = limitsWith(overrides), origins = allowedOrigins === undefined ? null : originSet(allowedOrigins);
  const rooms = new Map(); let shuttingDown = false, closing;
  const http = createServer({ maxHeaderSize: 8192, headersTimeout: 10000, requestTimeout: 10000, connectionsCheckingInterval: 1000 }, (req, res) => {
    const healthy = !shuttingDown && req.url === '/' && ['GET', 'HEAD'].includes(req.method);
    res.writeHead(healthy ? 200 : 404, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : JSON.stringify(healthy ? { service: 'witch-relay', protocol: 1, build } : { error: 'Unavailable' }));
  });
  http.maxConnections = limits.connections + 16;
  const wss = new WebSocketServer({ noServer: true, maxPayload: limits.maxPayload, perMessageDeflate: false, closeTimeout: limits.closeMs });
  const upgrade = bucket(limits.upgradesPerSecond, limits.upgradeBurst, now);
  http.on('upgrade', (req, socket, head) => {
    socket.on('error', () => {});
    const reject = code => { socket.end(`HTTP/1.1 ${code} Rejected\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`); socket.setTimeout(limits.closeMs, () => socket.destroy()); };
    if (shuttingDown || !upgrade()) return reject(503);
    if (origins && !origins.has(req.headers.origin)) return reject(403);
    if (wss.clients.size >= limits.connections) return reject(503);
    // No proxy header is trusted as a client identity. Limits are global and per socket.
    wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws));
  });
  let connectionNumber = 0;
  const stop = (ws, rule, code, detail, terminate = false) => {
    ws.closeRule ??= rule; ws.closeDetail ??= detail;
    if (terminate) ws.terminate(); else ws.close(code, detail);
  };
  const send = (ws, message) => {
    sendBounded(ws, message, limits, stop);
  };
  const telephone = telephoneDirectory({ send, stop, rooms, roomLimit: limits.rooms, now });
  wss.on('connection', ws => {
    let room, role;
    ws.assignRoom = (assigned, assignedRole) => {
      room = assigned; role = assignedRole; ws.onlineRoom = room; ws.onlineRole = role;
      ws.joinedAt = ws.advancedAt = now(); ws.progress = -1; ws.renderReady = ws.playable = false;
    };
    ws.connectionNumber = ++connectionNumber;
    ws.lastMessage = now();
    ws.joinedAt = ws.advancedAt = now(); ws.progress = -1; ws.playable = false;
    const messages = bucket(limits.messagesPerSecond, limits.messageBurst, now), traffic = bucket(limits.bytesPerSecond, limits.byteBurst, now);
    const control = bytes => { if (!messages() || !traffic(bytes.length)) stop(ws, 'rate', 1008, 'Traffic limit'); };
    ws.on('ping', control); ws.on('pong', control);
    ws.on('message', (bytes, binary) => {
      if (ws.closeRule || ws.readyState !== WebSocket.OPEN) return;
      if (!messages() || !traffic(bytes.length)) { stop(ws, 'rate', 1008, 'Traffic limit'); return; }
      if (binary) { stop(ws, 'protocol', 1008, 'Text messages required'); return; }
      let m;
      try { m = JSON.parse(bytes.toString()); } catch { stop(ws, 'protocol', 1008, 'Invalid JSON'); return; }
      if (!m || typeof m !== 'object' || Array.isArray(m) || m.protocol !== 1) { stop(ws, 'protocol', 1008, 'Incompatible protocol'); return; }
      ws.lastMessage = now();
      if (telephone.handle(ws, m)) return;
      if (ws.onlineRole === 'telephone') {
        if (m.type !== 'heartbeat') stop(ws, 'protocol', 1008, 'Message not permitted');
        return;
      }
      if (!room) {
        if (m.type === 'host' && typeof m.room === 'string' && /^\d{7}$/.test(m.room) && !rooms.has(m.room)) {
          if (rooms.size >= limits.rooms) { stop(ws, 'capacity', 1013, 'Relay full'); return; }
          role = 'host'; room = { number: m.room, host: ws, guest: null, token: randomBytes(24).toString('hex') };
          rooms.set(m.room, room);
          send(ws, { protocol: 1, type: 'hosted', room: m.room, token: room.token, player: 0 });
        } else if (m.type === 'join' && typeof m.room === 'string' && /^\d{7}$/.test(m.room) && typeof m.token === 'string' && /^[a-f0-9]{48}$/.test(m.token)) {
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
      if (m.type === 'progress' && Number.isSafeInteger(m.payload) && m.payload >= 0) {
        if (!ws.playable && m.payload > ws.progress) { ws.progress = m.payload; ws.advancedAt = now(); }
        return;
      }
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
      if (!m.payload || typeof m.payload !== 'object' || Array.isArray(m.payload)) { stop(ws, 'protocol', 1008, 'Invalid payload'); return; }
      if (role === 'guest' && m.type === 'input' && bytes.length <= 65536) send(room.host, { protocol: 1, type: 'input', player: 1, payload: m.payload });
      else if (role === 'host' && m.type === 'state') send(room.guest, { protocol: 1, type: 'state', player: 0, payload: m.payload });
      else stop(ws, 'protocol', 1008, 'Message not permitted');
    });
    ws.on('error', () => { ws.closeRule ??= 'socket-error'; });
    ws.on('close', code => {
      telephone.closed(ws);
      log({ event: 'relay-close', connection: ws.connectionNumber, role: role ?? 'unassigned', rule: ws.closeRule ?? 'client-close', detail: ws.closeDetail ?? '', code, silenceMs: now() - ws.lastMessage, progressSilenceMs: now() - ws.advancedAt, progress: ws.progress, joiningMs: now() - ws.joinedAt, limitMs: ws.closeLimit });
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
    telephone.check();
    for (const ws of wss.clients) {
      if (ws.closeRule) continue;
      if (!ws.onlineRole && now() - ws.joinedAt >= limits.handshakeMs) { stop(ws, 'handshake', 1008, 'Handshake deadline', true); continue; }
      const joiningGuest = ws.onlineRole === 'host' && ws.onlineRoom?.guest && !ws.onlineRoom.guest.playable;
      let limit, elapsed, rule;
      if (ws.playable) { limit = joiningGuest ? hostJoiningDropMs : dropMs; elapsed = now() - ws.lastMessage; rule = 'silence'; }
      else if (now() - ws.joinedAt >= joiningGraceMs) { limit = joiningGraceMs; elapsed = now() - ws.joinedAt; rule = 'join-cap'; }
      else { limit = joiningStallMs; elapsed = Math.max(now() - ws.advancedAt, now() - ws.lastMessage); rule = 'join-stall'; }
      if (elapsed >= limit) { ws.closeLimit = limit; stop(ws, rule, 1001, rule === 'join-stall' ? 'Loading stalled' : 'Liveness deadline', true); }
    }
  }, checkMs);
  timer.unref();
  return {
    http,
    close() {
      if (closing) return closing;
      shuttingDown = true;
      clearInterval(timer);
      for (const ws of wss.clients) stop(ws, 'shutdown', 1001, 'Relay shutdown', true);
      closing = (async () => {
        await new Promise(resolve => wss.close(resolve));
        if (http.listening) await new Promise(resolve => { http.close(resolve); http.closeAllConnections(); });
      })();
      return closing;
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = relayEnvironment(process.env);
  const relay = createRelay({ ...config, dropMs: Number(process.env.WITCH_DROP_MS ?? 5000), joiningGraceMs: Number(process.env.WITCH_JOIN_GRACE_MS ?? 600000), joiningStallMs: Number(process.env.WITCH_JOIN_STALL_MS ?? 90000), hostJoiningDropMs: Number(process.env.WITCH_HOST_JOIN_DROP_MS ?? 20000) });
  for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => {
    const deadline = setTimeout(() => process.exit(1), 2000); deadline.unref();
    void relay.close().then(() => { clearTimeout(deadline); process.exitCode = 0; });
  });
  relay.http.listen(config.port, config.host, () => console.log('Witch relay listening', relay.http.address()));
}
