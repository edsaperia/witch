const MiB = 1024 * 1024;
export const DEFAULT_LIMITS = Object.freeze({ connections: 16, rooms: 8, handshakeMs: 10000, closeMs: 1000,
  upgradesPerSecond: 10, upgradeBurst: 40, messagesPerSecond: 240, messageBurst: 480,
  bytesPerSecond: 16 * MiB, byteBurst: 32 * MiB, maxPayload: 8 * MiB, maxBuffered: 16 * MiB });

/** Fixed-size token bucket; no IP/token map can grow under anonymous traffic. */
export function bucket(rate, burst, now) {
  let tokens = burst, at = now();
  return (cost = 1) => {
    const time = now(); tokens = Math.min(burst, tokens + Math.max(0, time - at) * rate / 1000); at = Math.max(at, time);
    if (cost > tokens) return false;
    tokens -= cost; return true;
  };
}

export function limitsWith(overrides = {}) {
  const limits = { ...DEFAULT_LIMITS, ...overrides };
  if (Object.keys(overrides).some(key => !(key in DEFAULT_LIMITS)) || Object.values(limits).some(n => !Number.isSafeInteger(n) || n <= 0)) throw new Error('Invalid relay limits');
  return limits;
}

export function originSet(values) {
  if (!Array.isArray(values) || !values.length) throw new Error('Explicit allowed origins required');
  return new Set(values.map(value => {
    const url = new URL(value);
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (url.origin !== value || url.username || url.password || !(url.protocol === 'https:' || local && url.protocol === 'http:')) throw new Error('Allowed origins must be exact HTTPS origins (HTTP only for explicit loopback origins)');
    return value;
  }));
}

/** Public CLI is fail-closed; test/library callers may deliberately omit browser-origin checks. */
export function relayEnvironment(env) {
  const host = env.HOST ?? '127.0.0.1', local = ['localhost', '127.0.0.1', '::1'].includes(host);
  const allowedOrigins = env.WITCH_ALLOWED_ORIGINS?.split(',').map(s => s.trim());
  if (allowedOrigins) originSet(allowedOrigins);
  if (!local && (!allowedOrigins || !/^[a-f0-9]{40}$/.test(env.WITCH_SHA ?? ''))) throw new Error('Public relay requires WITCH_ALLOWED_ORIGINS and full WITCH_SHA');
  const port = Number(env.PORT ?? 8787);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) throw new Error('Invalid relay port');
  const limits = {};
  for (const [key, name] of [['connections', 'WITCH_MAX_CONNECTIONS'], ['rooms', 'WITCH_MAX_ROOMS']]) if (env[name] !== undefined) limits[key] = Number(env[name]);
  limitsWith(limits);
  return { host, port, allowedOrigins, limits, build: env.WITCH_SHA ?? 'local-unidentified' };
}

/** Check the serialized message too: do not queue a payload which crosses the outgoing budget. */
export function sendBounded(ws, message, limits, stop) {
  if (ws?.readyState !== 1 || ws.closeRule) return;
  const text = JSON.stringify(message);
  if (ws.bufferedAmount + Buffer.byteLength(text) > limits.maxBuffered) { stop(ws, 'backpressure', 1008, 'Slow connection'); return; }
  ws.send(text);
}
