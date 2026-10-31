import { afterEach, expect, it, vi } from "vitest";
import { telephone, type TelephoneOptions } from "./telephone";
import type { TelephoneActions } from "../ui/telephone";
import type { RelaySocket } from "../platform/online/relayClient";
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
function fixture() {
  vi.useFakeTimers(); const ws = new Socket(), connected = vi.fn<TelephoneOptions["connected"]>(async () => {}), departed = vi.fn(), show = vi.fn(), render = vi.fn(); let actions!: TelephoneActions;
  const phone = telephone({ storage: null, random: () => 42, socket: () => ws, connected, message: vi.fn(), departed,
    menu: a => { actions = a; return { show, render, redial: vi.fn() }; } });
  return { ws, connected, departed, show, phone, actions };
}
it("lists only at the phone; stepping away cancels a pending call and clears heartbeat", () => {
  const f = fixture(); f.phone.show(true); f.ws.open(); f.ws.receive({ type: "telephone-ready" });
  f.actions.dial("7654321"); expect(f.phone.state.status).toBe("dialling");
  f.phone.show(false); expect(f.ws.sent.at(-1)).toMatchObject({ type: "available", payload: false });
  expect(f.ws.readyState).toBe(3); expect(vi.getTimerCount()).toBe(0); expect(f.connected).not.toHaveBeenCalled();
});
it("an incoming call does not join without Answer; a connected game survives stepping away", async () => {
  const f = fixture(); f.phone.show(true); f.ws.open(); f.ws.receive({ type: "telephone-ready" });
  f.ws.receive({ type: "incoming-call", number: "7654321" }); expect(f.connected).not.toHaveBeenCalled();
  f.actions.answer(); expect(f.ws.sent.at(-1)).toMatchObject({ type: "answer" });
  f.ws.receive({ type: "call-connected", role: "guest", player: 1, number: "7654321" });
  await Promise.resolve(); expect(f.connected).toHaveBeenCalledOnce(); expect(f.phone.state.status).toBe("connected");
  f.phone.show(false); expect(f.ws.readyState).toBe(1); expect(f.departed).not.toHaveBeenCalled();
  f.phone.hangUp(); f.phone.hangUp(); expect(f.departed).toHaveBeenCalledOnce(); expect(vi.getTimerCount()).toBe(0);
});
it("a late asynchronous join cannot revive a call after hangup", async () => {
  const f = fixture(); let finish!: () => void; f.connected.mockImplementation(() => new Promise<void>(resolve => { finish = resolve; }));
  f.phone.show(true); f.ws.open(); f.ws.receive({ type: "call-connected", role: "guest", player: 1, number: "7654321" });
  const signal = f.connected.mock.calls[0][3];
  f.phone.hangUp(); expect(signal.aborted).toBe(true); finish(); await Promise.resolve(); expect(f.phone.state.status).toBe("ended");
});
