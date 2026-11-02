import { ONLINE_TIMING } from "./inputLease";
import { validPublicKey, type TelephonePublicKey } from "./telephoneIdentity";

export interface RelaySocket {
  readyState: number;
  send(data: string): void;
  close(): void;
  addEventListener(type: string, listener: (event: { data?: unknown; code?: number; reason?: string; wasClean?: boolean }) => void): void;
}
export interface RelayOptions {
  endpoint: string;
  room: string;
  token?: string;
  /** Register only while using the ordinary-game telephone; an explicit answer assigns host/guest. */
  telephone?: boolean;
  telephonePublicKey?: TelephonePublicKey;
  heartbeatMs?: number;
  socket?: (url: string) => RelaySocket;
  onMessage(message: Record<string, unknown>): void;
  onClose(): void;
  onError(error: Error): void;
  onTrouble?(on: boolean, remainingMs?: number): void;
  lifecycleEvidence?(proof: Record<string, unknown>): void;
}

/** Browser transport only. The host session validates each game payload separately. */
export function connectRelay(options: RelayOptions) {
  const url = new URL(options.endpoint);
  if (!["ws:", "wss:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid relay URL");
  if (url.protocol === "ws:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error("Remote relay requires wss");
  if (options.telephone ? !validPublicKey(options.telephonePublicKey) : !/^\d{7}$/.test(options.room)) throw new Error("Invalid relay identity");
  const heartbeatMs = options.heartbeatMs ?? 1000;
  if (!(heartbeatMs > 0 && heartbeatMs < ONLINE_TIMING.dropMs)) throw new Error("Invalid heartbeat interval");
  const makeSocket = options.socket ?? (endpoint => new WebSocket(endpoint) as unknown as RelaySocket);
  let ws: RelaySocket;
  let resume: { room: string; player: 0 | 1; token: string } | null = null;
  let recovering = false, recoveryUntil = 0, retryAt = 0, recoveryTimer: ReturnType<typeof setTimeout> | undefined;
  let peerUntil = 0, awaitingRebase = false;
  const retired = new Set<RelaySocket>();
  const closeRetired = () => { for (const old of retired) old.close(); retired.clear(); };
  let stopped = false, timer: ReturnType<typeof setInterval> | undefined;
  let role: "host" | "guest" | null = options.telephone ? null : options.token ? "guest" : "host";
  let identityConfirmed = false;
  let active = false, lastDownstream = 0, troubled = false, watchdog: ReturnType<typeof setTimeout> | undefined;
  const evidence = (stage: string, detail: Record<string, unknown> = {}) => {
    try { options.lifecycleEvidence?.({ stage, role, active, stopped, sampledWallTimeMs: Date.now(), sampledAtMs: performance.now(), ...detail }); } catch { /* Diagnostic only. */ }
  };
  const trouble = (on: boolean, remainingMs?: number) => { if (on || on !== troubled) { troubled = on; options.onTrouble?.(on, remainingMs); } };
  const activate = () => { if (!active) { active = true; lastDownstream = Date.now(); arm(); } };
  const sendMessage = (message: Record<string, unknown>): boolean => {
    if (stopped || ws.readyState !== 1 || recovering && message.type !== "resume") return false;
    ws.send(JSON.stringify({ protocol: 1, ...message })); return true;
  };
  const send = (type: string, payload?: unknown): boolean => {
    return sendMessage({ type, ...(payload === undefined ? {} : { payload }) });
  };
  const cleanup = () => { if (timer !== undefined) clearInterval(timer); if (watchdog !== undefined) clearTimeout(watchdog); if (recoveryTimer !== undefined) clearTimeout(recoveryTimer); timer = watchdog = recoveryTimer = undefined; };
  const lost = () => { if (stopped) return; stopped = true; cleanup(); trouble(false); closeRetired(); ws.close(); options.onError(new Error("Connection lost")); };
  const readTicket = (value: unknown) => {
    const t = value as typeof resume;
    if (!t || typeof t.room !== "string" || !/^[0-9]{7}$/.test(t.room) || t.player !== (role === "host" ? 0 : 1) || typeof t.token !== "string" || !/^[a-f0-9]{64}$/.test(t.token)) throw Error("Invalid resume ticket");
    resume = { room: t.room, player: t.player, token: t.token };
  };
  function checkRecovery(): void {
    if (stopped || !recovering) return;
    const remaining = recoveryUntil - Date.now();
    if (remaining <= 0) { lost(); return; }
    trouble(true, remaining);
    if (Date.now() >= retryAt) {
      retryAt = Date.now() + 1000;
      const old = ws;
      try { openSocket(); } catch { /* Retry only within the existing deadline. */ }
      if (old !== ws) { if (old.readyState === 1 && retired.size === 0) retired.add(old); else old.close(); }
    }
    recoveryTimer = setTimeout(checkRecovery, Math.min(250, remaining));
  }
  function recover(until = Date.now() + ONLINE_TIMING.dropMs): void {
    if (stopped) return;
    if (!active || !resume) { stopped = true; cleanup(); trouble(false); options.onClose(); return; }
    if (recovering) return;
    recovering = true; recoveryUntil = until; retryAt = 0;
    cleanup(); trouble(true, Math.max(0, until - Date.now()));
    options.onMessage({ protocol: 1, type: "transport-away" });
    checkRecovery();
  }
  function checkDownstream(): void {
    if (!active || stopped) return;
    const silence = Date.now() - lastDownstream;
    const rejoinUntil = peerUntil || (awaitingRebase ? recoveryUntil : 0);
    if (rejoinUntil && Date.now() >= rejoinUntil) { lost(); return; }
    if (silence >= ONLINE_TIMING.dropMs) {
      evidence("relay-watchdog-end", { silenceMs: silence, limitMs: ONLINE_TIMING.dropMs });
      lost(); return;
    }
    if (resume && !peerUntil && !awaitingRebase) { recover(lastDownstream + ONLINE_TIMING.dropMs); return; }
    trouble(true, Math.max(0, Math.min(ONLINE_TIMING.dropMs - silence, rejoinUntil ? rejoinUntil - Date.now() : Infinity)));
    watchdog = setTimeout(checkDownstream, Math.min(250, ONLINE_TIMING.dropMs - silence));
  }
  function arm(): void {
    if (watchdog !== undefined) clearTimeout(watchdog);
    watchdog = active && !stopped ? setTimeout(checkDownstream, peerUntil || awaitingRebase ? 250 : heartbeatMs * 2) : undefined;
  }
  function openSocket(): void {
  const socket = makeSocket(url.href); ws = socket;
  socket.addEventListener("open", () => {
    if (stopped || socket !== ws) return;
    if (recovering) { sendMessage({ type: "resume", ...resume }); return; }
    sendMessage(options.telephone ? { type: "telephone", publicKey: options.telephonePublicKey } : { type: options.token ? "join" : "host", room: options.room, ...(options.token ? { token: options.token } : {}) });
    timer = setInterval(() => send("heartbeat"), heartbeatMs);
  });
  socket.addEventListener("message", event => {
    if (stopped || socket !== ws) return;
    try {
      if (typeof event.data !== "string") throw new Error("Invalid relay message");
      const m = JSON.parse(event.data) as Record<string, unknown>;
      if (!m || typeof m !== "object" || m.protocol !== 1 || typeof m.type !== "string") throw new Error("Incompatible relay message");
      if (recovering) {
        if (m.type !== "resumed" || m.role !== role || m.player !== resume?.player) throw Error("Resume was not authenticated");
        readTicket(m.resume); recovering = false; cleanup(); closeRetired();
        lastDownstream = Date.now(); awaitingRebase = role === "guest";
        if (!awaitingRebase) trouble(false);
        arm();
        timer = setInterval(() => send("heartbeat"), heartbeatMs);
        options.onMessage({ protocol: 1, type: "transport-resumed" }); return;
      }
      if (options.telephone && ["call-challenge", "call-cancelled", "call-declined", "call-timeout"].includes(m.type)) { identityConfirmed = false; role = null; }
      if (options.telephone && !role && ["state", "input", "guest-joined", "guest-ready", "guest-left"].includes(m.type)) throw new Error("Unverified gameplay message");
      if (options.telephone && m.type === "call-connected") {
        if (!identityConfirmed || m.role !== "host" && m.role !== "guest" || m.player !== (m.role === "host" ? 0 : 1)) throw new Error("Unverified telephone role");
        role = m.role;
      }
      if (m.resume !== undefined && ["hosted", "joined", "call-connected"].includes(m.type)) readTicket(m.resume);
      if (m.type === "peer-away") { peerUntil = Date.now() + ONLINE_TIMING.dropMs; trouble(true, ONLINE_TIMING.dropMs); }
      if (m.type === "peer-resumed") {
        if (role === "guest") { awaitingRebase = true; recoveryUntil = peerUntil || Date.now() + ONLINE_TIMING.dropMs; }
        peerUntil = 0;
      }
      if (m.type === "guest-left" && peerUntil) { lost(); return; }
      lastDownstream = Date.now(); if (!peerUntil && !awaitingRebase) trouble(false); arm();
      if (m.type === "ready-accepted" && role === "host") activate();
      options.onMessage(m);
      if (!stopped && awaitingRebase && m.type === "state" && (m.payload as {kind?:string} | null)?.kind === "start") { awaitingRebase = false; trouble(false); arm(); }
    } catch (error) { options.onError(error instanceof Error ? error : new Error("Invalid relay message")); }
  });
  socket.addEventListener("error", () => { if (socket !== ws || stopped) return; evidence("relay-error"); if (!active || !resume) options.onError(new Error("Relay connection failed")); });
  socket.addEventListener("close", event => { if (socket !== ws || stopped) return; evidence("relay-close", { code: event.code, reason: event.reason, wasClean: event.wasClean }); if (active && resume && (event.code === undefined || [1000, 1005, 1006].includes(event.code))) recover(); else if (peerUntil || awaitingRebase) lost(); else if (!recovering) { cleanup(); trouble(false); stopped = true; options.onClose(); } });
  }
  openSocket();
  return {
    sendInput: (payload: unknown) => role === "guest" ? send("input", payload) : false,
    sendState: (payload: unknown) => role === "host" ? send("state", payload) : false,
    dial: (number: string) => options.telephone && /^[1-9][0-9]{6}$/.test(number) ? sendMessage({ type: "dial", number }) : false,
    answer: () => options.telephone ? send("answer") : false,
    decline: () => options.telephone ? send("decline") : false,
    cancelCall: () => options.telephone ? send("cancel-call") : false,
    available: (on: boolean) => options.telephone ? send("available", on) : false,
    identityProof: (signature: string) => options.telephone ? sendMessage({ type: "identity-proof", signature }) : false,
    identityVerified: () => { if (!options.telephone || !send("identity-verified")) return false; identityConfirmed = true; return true; },
    sendReady: () => send("ready"),
    sendProgress: (sequence: number) => send("progress", sequence),
    sendActive: () => { const sent = role === "guest" && send("active"); if (sent) activate(); return sent; },
    close() { if (stopped) return; evidence("relay-local-close"); if (active && !recovering) send("leave"); stopped = true; cleanup(); trouble(false); resume = null; closeRetired(); ws.close(); },
  };
}

/** Invitation token stays in the fragment, outside normal page requests and referrers. */
export function invitationLink(page: string, endpoint: string, room: string, token: string): string {
  const link = new URL(page);
  link.searchParams.set("online", "guest"); link.searchParams.set("relay", endpoint); link.searchParams.set("room", room);
  link.hash = new URLSearchParams({ invite: token }).toString();
  return link.href;
}

/** Production online output is nested; Vite's development page is at the root. */
export function soloHome(page: string): string {
  const url = new URL(page);
  const home = new URL(url.pathname.endsWith("/online/online.html") ? "../" : "./", url);
  // Keep only this builder's reduced-art test mode, never the host's seed/room/invitation.
  if (url.searchParams.get("quick") === "1") home.searchParams.set("quick", "1");
  return home.href;
}
