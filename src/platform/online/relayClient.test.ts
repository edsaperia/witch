import { afterEach, expect, it, vi } from "vitest";
import { connectRelay, invitationLink, soloHome, type RelaySocket } from "./relayClient";

type SocketEvent = { data?: unknown; code?: number; wasClean?: boolean };
class Socket implements RelaySocket {
  readyState = 0;
  sent: Record<string, unknown>[] = [];
  listeners = new Map<string, ((event: SocketEvent) => void)[]>();
  send(data: string) { this.sent.push(JSON.parse(data)); }
  close() { this.readyState = 3; this.emit("close"); }
  addEventListener(type: string, listener: (event: SocketEvent) => void) { this.listeners.set(type, [...this.listeners.get(type) ?? [], listener]); }
  transportClose(code: number, wasClean: boolean) { this.readyState=3;for(const listener of this.listeners.get("close")??[])listener({code,wasClean}); }
  emit(type: string, data?: unknown) { for (const listener of this.listeners.get(type) ?? []) listener({ data }); }
  open() { this.readyState = 1; this.emit("open"); }
}
afterEach(() => vi.useRealTimers());
it.each(["host", "guest"] as const)("authenticates a replacement %s socket with a rotating actor ticket and ignores old callbacks", role => {
  vi.useFakeTimers(); const sockets:Socket[]=[], onMessage=vi.fn(),onError=vi.fn(),onClose=vi.fn(),onTrouble=vi.fn();
  const c=connectRelay({endpoint:"ws://localhost:8787",room:"1234567",...(role==="guest"?{token:"join"}:{}),socket:()=>{const s=new Socket();sockets.push(s);return s;},onMessage,onError,onClose,onTrouble});
  const old=sockets[0], player=role==="host"?0:1, credential={room:"1234567",player,token:"a".repeat(64)};
  old.open();old.emit("message",JSON.stringify({protocol:1,type:role==="host"?"hosted":"joined",resume:credential}));
  if(role==="host")old.emit("message",JSON.stringify({protocol:1,type:"ready-accepted"}));else c.sendActive();
  old.transportClose(1000,true);expect(onClose).not.toHaveBeenCalled();expect(onMessage).toHaveBeenLastCalledWith({protocol:1,type:"transport-away"});
  expect(onTrouble).toHaveBeenLastCalledWith(true,20000);
  const fresh=sockets[1];fresh.open();expect(fresh.sent).toEqual([{protocol:1,type:"resume",...credential}]);
  expect(c.sendState({kind:"frame"})).toBe(false);expect(c.sendInput({sequence:8})).toBe(false);
  old.emit("message","stale invalid data");expect(onError).not.toHaveBeenCalled();
  fresh.emit("message",JSON.stringify({protocol:1,type:"resumed",role,player,resume:{...credential,token:"b".repeat(64)}}));
  expect(onMessage).toHaveBeenLastCalledWith({protocol:1,type:"transport-resumed"});
  if(role==="guest")fresh.emit("message",JSON.stringify({protocol:1,type:"state",payload:{kind:"start"}}));
  expect(onTrouble).toHaveBeenLastCalledWith(false,undefined);
  fresh.close();sockets[2].open();expect(sockets[2].sent[0]).toMatchObject({type:"resume",token:"b".repeat(64)});
  c.close();vi.advanceTimersByTime(21000);expect(sockets).toHaveLength(3);expect(vi.getTimerCount()).toBe(0);expect(onError).not.toHaveBeenCalled();
});
it("bounds failed rejoin attempts to20s and never falls back before the deadline",()=>{
  vi.useFakeTimers();const sockets:Socket[]=[],onError=vi.fn(),onClose=vi.fn();
  const c=connectRelay({endpoint:"ws://localhost:8787",room:"1234567",token:"join",socket:()=>{const s=new Socket();sockets.push(s);return s;},onMessage:vi.fn(),onClose,onError});
  sockets[0].open();sockets[0].emit("message",JSON.stringify({protocol:1,type:"joined",resume:{room:"1234567",player:1,token:"a".repeat(64)}}));c.sendActive();sockets[0].close();
  vi.advanceTimersByTime(19999);expect(onError).not.toHaveBeenCalled();expect(onClose).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1);expect(onError).toHaveBeenCalledWith(expect.objectContaining({message:"Connection lost"}));
  expect(vi.getTimerCount()).toBe(0);const count=sockets.length;vi.advanceTimersByTime(30000);expect(sockets).toHaveLength(count);
});
it("replaces a silent half-open socket inside its original20s window without closing its actor first",()=>{
  vi.useFakeTimers();const sockets:Socket[]=[],onMessage=vi.fn(),onError=vi.fn(),onTrouble=vi.fn();
  const c=connectRelay({endpoint:"ws://localhost:8787",room:"1234567",token:"join",socket:()=>{const s=new Socket();sockets.push(s);return s;},onMessage,onError,onClose:vi.fn(),onTrouble});
  const old=sockets[0],credential={room:"1234567",player:1,token:"a".repeat(64)};
  old.open();old.emit("message",JSON.stringify({protocol:1,type:"joined",resume:credential}));c.sendActive();
  vi.advanceTimersByTime(2000);expect(old.readyState).toBe(1);expect(sockets).toHaveLength(2);expect(onTrouble).toHaveBeenLastCalledWith(true,18000);
  sockets[1].open();expect(sockets[1].sent[0]).toMatchObject({type:"resume",...credential});
  sockets[1].emit("message",JSON.stringify({protocol:1,type:"resumed",role:"guest",player:1,resume:{...credential,token:"b".repeat(64)}}));
  expect(old.readyState).toBe(3);
  expect(onTrouble).not.toHaveBeenLastCalledWith(false,undefined);
  sockets[1].emit("message",JSON.stringify({protocol:1,type:"state",payload:{kind:"start"}}));expect(onTrouble).toHaveBeenLastCalledWith(false,undefined);
  c.close();expect(vi.getTimerCount()).toBe(0);expect(onError).not.toHaveBeenCalled();
});
it.each(["host", "guest"] as const)("keeps %s heartbeats alive through recoverable silence and ends at20s", role => {
  vi.useFakeTimers(); const socket = new Socket(), onError = vi.fn(), onTrouble = vi.fn();
  const c = connectRelay({ endpoint: "ws://localhost:8787", room: "1234567", ...(role === "guest" ? { token: "fixture" } : {}), socket: () => socket,
    onMessage: vi.fn(), onClose: vi.fn(), onError, onTrouble });
  socket.open();
  if (role === "guest") c.sendActive(); else socket.emit("message", JSON.stringify({protocol:1,type:"ready-accepted"}));
  vi.advanceTimersByTime(19999);
  expect(onError).not.toHaveBeenCalled();
  expect(socket.sent.filter(m => m.type === "heartbeat").length).toBe(19);
  socket.emit("message", JSON.stringify({protocol:1,type:"heartbeat"}));
  expect(onTrouble).toHaveBeenLastCalledWith(false, undefined);
  vi.advanceTimersByTime(19999); expect(onError).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1); expect(onError).toHaveBeenCalledOnce(); expect(vi.getTimerCount()).toBe(0);
});
it("records the 20s watchdog deadline before teardown and tolerates a throwing diagnostic sink", () => {
  vi.useFakeTimers(); const socket = new Socket(), onError = vi.fn(), events: Record<string, unknown>[] = [];
  const c = connectRelay({ endpoint: "ws://localhost:8787", room: "1234567", token: "fixture", socket: () => socket,
    onMessage: vi.fn(), onClose: vi.fn(), onError, lifecycleEvidence: event => { events.push(event); throw Error("sink"); } });
  socket.open(); c.sendActive(); vi.advanceTimersByTime(19999); expect(onError).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1); expect(onError).toHaveBeenCalledOnce();
  expect(events).toContainEqual(expect.objectContaining({ stage: "relay-watchdog-end", silenceMs: 20000, limitMs: 20000 }));
  expect(onError.mock.calls[0][0].message).toBe("Connection lost");
});

it("clears the countdown on downstream traffic and restarts the20s silence deadline", () => {
  vi.useFakeTimers(); const socket = new Socket(), onTrouble = vi.fn(), onError = vi.fn();
  const c = connectRelay({ endpoint: "ws://localhost:8787", room: "1234567", token: "fixture", socket: () => socket, onMessage: vi.fn(), onClose: vi.fn(), onError, onTrouble });
  socket.open(); expect(c.sendActive()).toBe(true);
  vi.advanceTimersByTime(2000); expect(onTrouble).toHaveBeenLastCalledWith(true, 18000); expect(onError).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1000); expect(onTrouble).toHaveBeenLastCalledWith(true, 17000);
  socket.emit("message", JSON.stringify({ protocol: 1, type: "heartbeat" })); expect(onTrouble).toHaveBeenLastCalledWith(false, undefined);
  vi.advanceTimersByTime(19999); expect(onError).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1); expect(onError).toHaveBeenCalledOnce(); expect(socket.readyState).toBe(3); expect(vi.getTimerCount()).toBe(0);
});

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
