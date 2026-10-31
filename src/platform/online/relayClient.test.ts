import { afterEach, expect, it, vi } from "vitest";
import { connectRelay, invitationLink, soloHome, type RelaySocket } from "./relayClient";

class Socket implements RelaySocket {
  readyState = 0;
  sent: Record<string, unknown>[] = [];
  listeners = new Map<string, ((event: { data?: unknown }) => void)[]>();
  send(data: string) { this.sent.push(JSON.parse(data)); }
  close() { this.readyState = 3; this.emit("close"); }
  addEventListener(type: string, listener: (event: { data?: unknown }) => void) { this.listeners.set(type, [...this.listeners.get(type) ?? [], listener]); }
  emit(type: string, data?: unknown) { for (const listener of this.listeners.get(type) ?? []) listener({ data }); }
  open() { this.readyState = 1; this.emit("open"); }
}
afterEach(() => vi.useRealTimers());

it("telephone signaling grants no gameplay role before a server-confirmed answer", () => {
  vi.useFakeTimers(); const socket = new Socket(), onError = vi.fn();
  const publicKey = { algorithm: "Ed25519" as const, spki: "MCowBQYDK2VwAyEADV7zdnqg1CPihvUiq-gktcY8RGA6lz4lu0wePSxaWWA" };
  const c = connectRelay({ endpoint: "wss://witch-relay.onrender.com", room: "", telephone: true, telephonePublicKey: publicKey, socket: () => socket, onMessage: vi.fn(), onClose: vi.fn(), onError });
  socket.open(); expect(socket.sent[0]).toEqual({ protocol: 1, type: "telephone", publicKey });
  expect(c.sendInput({})).toBe(false); expect(c.sendState({})).toBe(false);
  c.dial("7654321"); expect(socket.sent.at(-1)).toEqual({ protocol: 1, type: "dial", number: "7654321" });
  socket.emit("message", JSON.stringify({ protocol: 1, type: "call-connected", role: "guest", player: 0 }));
  expect(onError).toHaveBeenCalledOnce(); expect(c.sendInput({})).toBe(false);
  c.identityVerified(); expect(c.sendState({})).toBe(false);
  socket.emit("message", JSON.stringify({ protocol: 1, type: "call-connected", role: "guest", player: 1 }));
  expect(c.sendInput({})).toBe(true); expect(c.sendState({})).toBe(false);
  c.available(false); expect(socket.sent.at(-1)).toMatchObject({ type: "available", payload: false }); c.close();
});

it("hosts, sends heartbeat, and stops timers on explicit close", () => {
  vi.useFakeTimers(); const socket = new Socket();
  const c = connectRelay({ endpoint: "ws://localhost:8787", room: "1234567", socket: () => socket, onMessage: vi.fn(), onClose: vi.fn(), onError: vi.fn() });
  expect(c.sendState({ tick: 1 })).toBe(false); socket.open();
  expect(socket.sent[0]).toMatchObject({ type: "host", room: "1234567" });
  vi.advanceTimersByTime(1000); expect(socket.sent[1].type).toBe("heartbeat");
  expect(c.sendInput({})).toBe(false); expect(c.sendState({ tick: 1 })).toBe(true);
  c.close(); const count = socket.sent.length; vi.advanceTimersByTime(5000); expect(socket.sent).toHaveLength(count);
});

it("joins with token, receives messages, and reports close once", () => {
  const socket = new Socket(), onMessage = vi.fn(), onClose = vi.fn(), onError = vi.fn();
  const c = connectRelay({ endpoint: "ws://127.0.0.1:8787", room: "1234567", token: "token", socket: () => socket, onMessage, onClose, onError });
  socket.open(); expect(socket.sent[0]).toMatchObject({ type: "join", token: "token" });
  expect(c.sendState({})).toBe(false); expect(c.sendInput({ sequence: 0 })).toBe(true);
  socket.emit("message", JSON.stringify({ protocol: 1, type: "joined", player: 1 })); expect(onMessage).toHaveBeenCalledOnce();
  socket.emit("message", "bad"); expect(onError).toHaveBeenCalledOnce();
  socket.close(); socket.emit("close"); expect(onClose).toHaveBeenCalledOnce();
});

it("keeps invitation secrets in fragment and requires encrypted remote transport", () => {
  const link = new URL(invitationLink("https://example.test/witch/?seed=12", "ws://localhost:8787", "1234567", "secret"));
  expect(link.searchParams.get("online")).toBe("guest"); expect(link.search).not.toContain("secret"); expect(link.hash).toBe("#invite=secret");
  expect(() => connectRelay({ endpoint: "ws://remote.test", room: "1234567", onMessage: vi.fn(), onClose: vi.fn(), onError: vi.fn() })).toThrow("requires wss");
  expect(soloHome("https://example.test/pr-1471/online/online.html?online=guest")).toBe("https://example.test/pr-1471/");
  expect(soloHome("http://localhost:5173/online.html?online=guest")).toBe("http://localhost:5173/");
  expect(soloHome("https://example.test/pr-1471/online/online.html?online=guest&quick=1&seed=999&room=1234567#invite=secret")).toBe("https://example.test/pr-1471/?quick=1");
});
