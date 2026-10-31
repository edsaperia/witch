import { afterEach, expect, it, vi } from "vitest";
import { telephone, type TelephoneOptions } from "./telephone";
import type { TelephoneActions } from "../ui/telephone";
import type { RelaySocket } from "../platform/online/relayClient";
import { loadTelephoneIdentity, numberForKey, signTelephone } from "../platform/online/telephoneIdentity";
afterEach(() => vi.useRealTimers());
class Socket implements RelaySocket {
  readyState = 0; sent: Record<string, unknown>[] = []; listeners = new Map<string, ((e: { data?: unknown }) => void)[]>();
  addEventListener(type: string, f: (e: { data?: unknown }) => void) { this.listeners.set(type, [...this.listeners.get(type) ?? [], f]); }
  send(data: string) { this.sent.push(JSON.parse(data)); }
  emit(type: string, data?: unknown) { for (const f of this.listeners.get(type) ?? []) f({ data }); }
  open() { this.readyState = 1; this.emit("open"); }
  close() { this.readyState = 3; this.emit("close"); }
  receive(value: unknown) { this.emit("message", JSON.stringify({ protocol: 1, ...value as object })); }
}
const make = () => loadTelephoneIdentity({ read: async () => null, write: async () => {} });
async function fixture(pinWrongFriend = false) {
  const own = await make(), peer = await make(), ownNumber = await numberForKey(own.publicKey), peerNumber = await numberForKey(peer.publicKey);
  vi.useFakeTimers(); const ws = new Socket(), connected = vi.fn<TelephoneOptions["connected"]>(async () => {}), departed = vi.fn(), show = vi.fn(); let actions!: TelephoneActions;
  const data = new Map<string, string>();
  if (pinWrongFriend) { const old = await make(); data.set("witch.telephone.v1", JSON.stringify({ recent: [peerNumber], contacts: [{ number: peerNumber, publicKey: old.publicKey }] })); }
  const phone = telephone({ storage: { getItem: k => data.get(k) ?? null, setItem: (k, v) => { data.set(k, v); } }, loadIdentity: async () => own, socket: () => ws, connected, message: vi.fn(), departed,
    menu: a => { actions = a; return { show, render: vi.fn(), redial: vi.fn() }; } });
  const start = async () => { await phone.show(true); ws.open(); ws.receive({ type: "telephone-ready", number: ownNumber }); };
  const verify = async () => {
    if (phone.state.status !== "ringing") ws.receive({ type: "incoming-call", number: peerNumber });
    actions.answer();
    const challenge = { nonce: "a".repeat(64), caller: peerNumber, answerer: ownNumber };
    ws.receive({ type: "call-challenge", role: "guest", challenge, publicKey: peer.publicKey }); await phone.settled();
    ws.receive({ type: "identity-proof", signature: await signTelephone(peer, challenge, "host") }); await phone.settled();
    expect(phone.state.status).toBe("confirming"); expect(connected).not.toHaveBeenCalled();
    expect([...data.values()].join("")).not.toContain(peer.publicKey.spki);
    actions.confirmIdentity!(); expect(ws.sent.at(-1)).toMatchObject({ type: "identity-verified" });
    ws.receive({ type: "call-connected", role: "guest", player: 1, number: peerNumber }); await Promise.resolve();
  };
  return { ws, connected, departed, phone, actions, start, verify, data, peer, peerNumber };
}
it("lists only at the phone; stepping away cancels a pending call and clears heartbeat", async () => {
  const f = await fixture(); await f.start(); f.actions.dial(f.peerNumber); expect(f.phone.state.status).toBe("dialling");
  await f.phone.show(false); expect(f.ws.sent.at(-1)).toMatchObject({ type: "available", payload: false });
  expect(f.ws.readyState).toBe(3); expect(vi.getTimerCount()).toBe(0); expect(f.connected).not.toHaveBeenCalled();
});
it("requires answer, signature and new-number agreement; pins only at mutual connect", async () => {
  const f = await fixture(); await f.start(); f.ws.receive({ type: "incoming-call", number: f.peerNumber });
  f.actions.answer(); expect(f.ws.sent.at(-1)).toMatchObject({ type: "answer" }); expect(f.connected).not.toHaveBeenCalled();
  await f.verify(); expect(f.connected).toHaveBeenCalledOnce(); expect(f.phone.state.status).toBe("connected");
  expect([...f.data.values()].join("")).toContain(f.peer.publicKey.spki);
  expect([...f.data.values()].join("")).not.toContain("privateKey");
  await f.phone.show(false); expect(f.ws.readyState).toBe(1); f.phone.hangUp(); f.phone.hangUp();
  expect(f.departed).toHaveBeenCalledOnce(); expect(vi.getTimerCount()).toBe(0);
});
it("a late asynchronous night preparation cannot revive a call after hangup", async () => {
  const f = await fixture(); let finish!: () => void; f.connected.mockImplementation(() => new Promise<void>(resolve => { finish = resolve; }));
  await f.start(); await f.verify(); const signal = f.connected.mock.calls[0][3];
  f.phone.hangUp(); expect(signal.aborted).toBe(true); finish(); await Promise.resolve(); expect(f.phone.state.status).toBe("ended");
});
it("a fabricated connected message before identity verification cannot expose world state", async () => {
  const f = await fixture(); await f.start(); f.ws.receive({ type: "call-connected", role: "host", player: 0, number: f.peerNumber });
  expect(f.connected).not.toHaveBeenCalled(); expect(f.ws.readyState).toBe(3); expect(f.phone.state.status).toBe("error");
});

it("a relay challenge cannot substitute for the player's Answer decision", async () => {
  const f = await fixture(); await f.start(); f.ws.receive({ type: "incoming-call", number: f.peerNumber });
  f.ws.receive({ type: "call-challenge", role: "guest", challenge: { nonce: "a".repeat(64), caller: f.peerNumber, answerer: f.phone.number }, publicKey: f.peer.publicKey });
  await f.phone.settled(); expect(f.connected).not.toHaveBeenCalled(); expect(f.ws.readyState).toBe(3);
  expect(f.ws.sent.some(m => m.type === "identity-verified")).toBe(false);
});

it("a saved-key mismatch hangs up with the agreed plain message before the session can share state", async () => {
  const f = await fixture(true); await f.start(); f.ws.receive({ type: "incoming-call", number: f.peerNumber }); f.actions.answer();
  f.ws.receive({ type: "call-challenge", role: "guest", challenge: { nonce: "a".repeat(64), caller: f.peerNumber, answerer: f.phone.number }, publicKey: f.peer.publicKey });
  await f.phone.settled(); expect(f.phone.state.detail).toBe("That isn't the friend saved under this number.");
  expect(f.ws.readyState).toBe(3); expect(f.connected).not.toHaveBeenCalled();
});
