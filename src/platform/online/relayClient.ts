import { ONLINE_TIMING } from "./inputLease";
import { validPublicKey, type TelephonePublicKey } from "./telephoneIdentity";

export interface RelaySocket {
  readyState: number;
  send(data: string): void;
  close(): void;
  addEventListener(type: string, listener: (event: { data?: unknown }) => void): void;
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
  onTrouble?(on: boolean): void;
}

/** Browser transport only. The host session validates each game payload separately. */
export function connectRelay(options: RelayOptions) {
  const url = new URL(options.endpoint);
  if (!["ws:", "wss:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid relay URL");
  if (url.protocol === "ws:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error("Remote relay requires wss");
  if (options.telephone ? !validPublicKey(options.telephonePublicKey) : !/^\d{7}$/.test(options.room)) throw new Error("Invalid relay identity");
  const heartbeatMs = options.heartbeatMs ?? 1000;
  if (!(heartbeatMs > 0 && heartbeatMs < ONLINE_TIMING.dropMs)) throw new Error("Invalid heartbeat interval");
  const ws = (options.socket ?? (endpoint => new WebSocket(endpoint) as unknown as RelaySocket))(url.href);
  let stopped = false, timer: ReturnType<typeof setInterval> | undefined;
  let role: "host" | "guest" | null = options.telephone ? null : options.token ? "guest" : "host";
  let identityConfirmed = false;
  let active = false, lastDownstream = 0, troubled = false, watchdog: ReturnType<typeof setTimeout> | undefined;
  const trouble = (on: boolean) => { if (on !== troubled) { troubled = on; options.onTrouble?.(on); } };
  const activate = () => { if (!active) { active = true; lastDownstream = Date.now(); arm(); } };
  const sendMessage = (message: Record<string, unknown>): boolean => {
    if (stopped || ws.readyState !== 1) return false;
    ws.send(JSON.stringify({ protocol: 1, ...message })); return true;
  };
  const send = (type: string, payload?: unknown): boolean => {
    return sendMessage({ type, ...(payload === undefined ? {} : { payload }) });
  };
  const cleanup = () => { if (timer !== undefined) clearInterval(timer); if (watchdog !== undefined) clearTimeout(watchdog); timer = watchdog = undefined; };
  function checkDownstream(): void {
    if (!active || stopped) return;
    const silence = Date.now() - lastDownstream;
    if (silence >= 15000) {
      stopped = true; cleanup(); trouble(false); ws.close();
      options.onError(new Error("The telephone connection went quiet.")); return;
    }
    trouble(silence >= 5000);
    watchdog = setTimeout(checkDownstream, (silence < 5000 ? 5000 : 15000) - silence);
  }
  function arm(): void {
    if (watchdog !== undefined) clearTimeout(watchdog);
    watchdog = active && !stopped ? setTimeout(checkDownstream, 5000) : undefined;
  }
  ws.addEventListener("open", () => {
    if (stopped) return;
    sendMessage(options.telephone ? { type: "telephone", publicKey: options.telephonePublicKey } : { type: options.token ? "join" : "host", room: options.room, ...(options.token ? { token: options.token } : {}) });
    timer = setInterval(() => send("heartbeat"), heartbeatMs);
  });
  ws.addEventListener("message", event => {
    if (stopped) return;
    lastDownstream = Date.now(); trouble(false); arm();
    try {
      if (typeof event.data !== "string") throw new Error("Invalid relay message");
      const m = JSON.parse(event.data) as Record<string, unknown>;
      if (!m || typeof m !== "object" || m.protocol !== 1 || typeof m.type !== "string") throw new Error("Incompatible relay message");
      if (options.telephone && ["call-challenge", "call-cancelled", "call-declined", "call-timeout"].includes(m.type)) { identityConfirmed = false; role = null; }
      if (options.telephone && !role && ["state", "input", "guest-joined", "guest-ready", "guest-left"].includes(m.type)) throw new Error("Unverified gameplay message");
      if (options.telephone && m.type === "call-connected") {
        if (!identityConfirmed || m.role !== "host" && m.role !== "guest" || m.player !== (m.role === "host" ? 0 : 1)) throw new Error("Unverified telephone role");
        role = m.role;
      }
      if (m.type === "ready-accepted" && role === "host") activate();
      options.onMessage(m);
    } catch (error) { options.onError(error instanceof Error ? error : new Error("Invalid relay message")); }
  });
  ws.addEventListener("error", () => { if (!stopped) options.onError(new Error("Relay connection failed")); });
  ws.addEventListener("close", () => { cleanup(); trouble(false); if (!stopped) { stopped = true; options.onClose(); } });
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
    close() { if (stopped) return; stopped = true; cleanup(); trouble(false); ws.close(); },
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
