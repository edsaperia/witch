import { ONLINE_TIMING } from "./inputLease";

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
  heartbeatMs?: number;
  socket?: (url: string) => RelaySocket;
  onMessage(message: Record<string, unknown>): void;
  onClose(): void;
  onError(error: Error): void;
}

/** Browser transport only. The host session validates each game payload separately. */
export function connectRelay(options: RelayOptions) {
  const url = new URL(options.endpoint);
  if (!["ws:", "wss:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid relay URL");
  if (url.protocol === "ws:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error("Remote relay requires wss");
  if (!/^\d{7}$/.test(options.room)) throw new Error("Invalid room number");
  const heartbeatMs = options.heartbeatMs ?? 1000;
  if (!(heartbeatMs > 0 && heartbeatMs < ONLINE_TIMING.dropMs)) throw new Error("Invalid heartbeat interval");
  const ws = (options.socket ?? (endpoint => new WebSocket(endpoint) as unknown as RelaySocket))(url.href);
  let stopped = false, timer: ReturnType<typeof setInterval> | undefined;
  let role: "host" | "guest" | null = options.telephone ? null : options.token ? "guest" : "host";
  const sendMessage = (message: Record<string, unknown>): boolean => {
    if (stopped || ws.readyState !== 1) return false;
    ws.send(JSON.stringify({ protocol: 1, ...message })); return true;
  };
  const send = (type: string, payload?: unknown): boolean => {
    return sendMessage({ type, ...(payload === undefined ? {} : { payload }) });
  };
  const cleanup = () => { if (timer !== undefined) clearInterval(timer); timer = undefined; };
  ws.addEventListener("open", () => {
    if (stopped) return;
    sendMessage(options.telephone ? { type: "telephone", number: options.room } : { type: options.token ? "join" : "host", room: options.room, ...(options.token ? { token: options.token } : {}) });
    timer = setInterval(() => send("heartbeat"), heartbeatMs);
  });
  ws.addEventListener("message", event => {
    if (stopped) return;
    try {
      if (typeof event.data !== "string") throw new Error("Invalid relay message");
      const m = JSON.parse(event.data) as Record<string, unknown>;
      if (!m || typeof m !== "object" || m.protocol !== 1 || typeof m.type !== "string") throw new Error("Incompatible relay message");
      if (options.telephone && m.type === "call-connected") {
        if (m.role !== "host" && m.role !== "guest" || m.player !== (m.role === "host" ? 0 : 1)) throw new Error("Invalid telephone role");
        role = m.role;
      }
      options.onMessage(m);
    } catch (error) { options.onError(error instanceof Error ? error : new Error("Invalid relay message")); }
  });
  ws.addEventListener("error", () => { if (!stopped) options.onError(new Error("Relay connection failed")); });
  ws.addEventListener("close", () => { cleanup(); if (!stopped) { stopped = true; options.onClose(); } });
  return {
    sendInput: (payload: unknown) => role === "guest" ? send("input", payload) : false,
    sendState: (payload: unknown) => role === "host" ? send("state", payload) : false,
    dial: (number: string) => options.telephone && /^[1-9][0-9]{6}$/.test(number) ? sendMessage({ type: "dial", number }) : false,
    answer: () => options.telephone ? send("answer") : false,
    decline: () => options.telephone ? send("decline") : false,
    cancelCall: () => options.telephone ? send("cancel-call") : false,
    available: (on: boolean) => options.telephone ? send("available", on) : false,
    sendReady: () => send("ready"),
    sendProgress: (sequence: number) => send("progress", sequence),
    sendActive: () => role === "guest" ? send("active") : false,
    close() { if (stopped) return; stopped = true; cleanup(); ws.close(); },
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
