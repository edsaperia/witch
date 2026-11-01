import { afterEach, expect, it, vi } from 'vitest';
import { telephone, type TelephoneOptions } from './telephone';
import type { TelephoneActions } from '../ui/telephone';
import { connectRelay, type RelaySocket } from '../platform/online/relayClient';
import { loadTelephoneIdentity, numberForKey, signTelephone } from '../platform/online/telephoneIdentity';
import { guestInput } from '../platform/online/guestInput';
import { visitLifecycle } from './visitLifecycle';
import { visitSaves } from './visitSaves';
import { SaveSlots } from './saveSlots';
import { borrowedNightSaves } from './nightSave';
import { checkpointFixture, memoryVisitStorage } from '../test/visitAcceptance';
import { newGame, newWitchPlayer, type Controls, type Game } from '../rules/game';
import { TUNING } from '../rules/tuning';
import { onlineSession, type SessionConnection } from '../platform/online/session';
import { attachGuest, detachGuest } from '../platform/online/membership';

const cleanup: (() => void)[] = [];
afterEach(() => { for (const stop of cleanup.splice(0)) stop(); vi.useRealTimers(); });
class Socket implements RelaySocket {
  readyState = 0; sent: Record<string, unknown>[] = [];
  listeners = new Map<string, ((event: { data?: unknown }) => void)[]>();
  addEventListener(type: string, fn: (event: { data?: unknown }) => void) { this.listeners.set(type, [...this.listeners.get(type) ?? [], fn]); }
  send(data: string) { this.sent.push(JSON.parse(data)); }
  emit(type: string, data?: unknown) { for (const fn of this.listeners.get(type) ?? []) fn({ data }); }
  open() { this.readyState = 1; this.emit('open'); }
  close() { if (this.readyState !== 3) { this.readyState = 3; this.emit('close'); } }
  receive(message: Record<string, unknown>) { this.emit('message', JSON.stringify({ protocol: 1, ...message })); }
}
async function phoneFixture(connected: TelephoneOptions['connected'] = async () => {}, departed = vi.fn()) {
  const own = await loadTelephoneIdentity({ read: async () => null, write: async () => {} });
  const peer = await loadTelephoneIdentity({ read: async () => null, write: async () => {} });
  const ownNumber = await numberForKey(own.publicKey), peerNumber = await numberForKey(peer.publicKey);
  vi.useFakeTimers(); const ws = new Socket(); let actions!: TelephoneActions;
  const phone = telephone({ storage: null, loadIdentity: async () => own, socket: () => ws, connected, departed, message: vi.fn(),
    menu: a => { actions = a; return { show() {}, render() {}, redial() {} }; } });
  cleanup.push(() => phone.dispose());
  const join = async () => {
    await phone.show(true); ws.open(); ws.receive({ type: 'telephone-ready', number: ownNumber });
    ws.receive({ type: 'incoming-call', number: peerNumber }); actions.answer();
    const challenge = { nonce: 'a'.repeat(64), caller: peerNumber, answerer: ownNumber };
    ws.receive({ type: 'call-challenge', role: 'guest', challenge, publicKey: peer.publicKey }); await phone.settled();
    ws.receive({ type: 'identity-proof', signature: await signTelephone(peer, challenge, 'host') }); await phone.settled();
    actions.confirmIdentity!(); ws.receive({ type: 'call-connected', role: 'guest', player: 1, number: peerNumber });
    await Promise.resolve(); await Promise.resolve();
  };
  return { phone, ws, actions: () => actions, ownNumber, join, departed };
}

it('a60s socket cold-open keeps an honest connecting state and recovers without premature admission', async () => {
  const f = await phoneFixture(); await f.phone.show(true);
  await vi.advanceTimersByTimeAsync(60000);
  expect(f.phone.state.status).toBe('connecting'); expect(f.ws.sent).toEqual([]); expect(f.departed).not.toHaveBeenCalled();
  f.ws.open(); f.ws.receive({ type: 'telephone-ready', number: f.ownNumber });
  expect(f.phone.state.status).toBe('available'); await vi.advanceTimersByTimeAsync(1000);
  expect(f.ws.sent.filter(m => m.type === 'heartbeat')).toHaveLength(1);
});
it('cancelling a cold connection clears it and a late open cannot start heartbeats', async () => {
  const f = await phoneFixture(); await f.phone.show(true); await f.phone.show(false);
  f.ws.open(); await vi.advanceTimersByTimeAsync(60000);
  expect(f.phone.state.status).toBe('ended'); expect(f.ws.sent).toEqual([]); expect(vi.getTimerCount()).toBe(0);
});
it('socket close after admitted guest returns a fresh own night once and cannot revive from late messages', async () => {
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture(), nights = borrowedNightSaves(checkpoint.store);
  const slots = new SaveSlots(memory.storage), saves = visitSaves(slots, nights), own = { seed: 777 }, borrowed = { seed: 123 } as Game;
  let current: unknown = own, returned = Promise.resolve(); const adoptOwn = vi.fn(async (_own: typeof own, fresh: boolean) => { expect(fresh).toBe(true); current = { seed: 778 }; });
  const lifecycle = visitLifecycle({ saves, own: () => own, adoptBorrowed: async game => { current = game; }, adoptOwn, playing() {} });
  const f = await phoneFixture(async (_role, _connection, _peer, signal) => { await lifecycle.prepare(borrowed, signal, () => {}); await lifecycle.synchronized(borrowed); }, vi.fn(() => { returned = lifecycle.end(); }));
  await f.join(); await vi.waitFor(() => expect(f.phone.state.status).toBe('connected'));
  expect(current).toBe(borrowed); f.ws.close(); await returned; f.ws.emit('close');
  expect(f.departed).toHaveBeenCalledOnce(); expect(adoptOwn).toHaveBeenCalledOnce(); expect(current).toEqual({ seed: 778 });
  expect(slots.visiting).toBe(false); expect(nights.suspended).toBe(false); expect(checkpoint.writes).toEqual([]);
  f.ws.receive({ type: 'call-connected', role: 'guest', number: f.ownNumber }); await lifecycle.synchronized(borrowed);
  expect(current).toEqual({ seed: 778 }); expect(f.phone.state.status).toBe('ended'); expect(vi.getTimerCount()).toBe(0);
});
it('host disconnect removes the guest and stale held movement/pause input without replacing the host night', async () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = 'home'; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), before = { seed: game.seed, time: game.clock.time }, advance = vi.fn();
  const wire: SessionConnection = { sendInput: () => true, sendState: () => true, sendReady: () => true, sendProgress: () => true, sendActive: () => true };
  const session = onlineSession({ build: 'audit', hostGame: () => game, attach: g => attachGuest(g, newWitchPlayer(1, 0, 0, tuning)), detach: detachGuest,
    prepareGuest: async () => {}, synchronized() {}, ended() {}, failed: error => { throw error; }, advanceHost: advance, now: () => 1000 });
  cleanup.push(session.disconnect); await session.connect('host', wire, new AbortController().signal);
  session.message({ type: 'guest-joined', player: 1 }); session.message({ type: 'guest-ready', player: 1 });
  session.message({ type: 'input', player: 1, payload: { sequence: 1, controls: { moveX: 1, pausePage: true } } });
  expect(game.witches).toHaveLength(2); session.disconnect(); session.disconnect();
  expect(game.witches).toHaveLength(1); expect({ seed: game.seed, time: game.clock.time }).toEqual(before); expect(session.role).toBe(null);
  await session.connect('host', wire, new AbortController().signal); session.message({ type: 'guest-joined', player: 1 }); session.message({ type: 'guest-ready', player: 1 });
  session.step({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 } as Controls, .02);
  const controls = advance.mock.calls.at(-1)![1] as Controls[];
  expect(controls[1].moveX).toBe(0); expect(controls[1].pausePage).not.toBe(true);
});
it('300ms delay is distinct from the held-input lease; dropped release cannot hold movement or pause indefinitely', () => {
  const input = guestInput(); expect(input.accept({ sequence: 1, controls: { moveX: 1, pausePage: true } }, 300)).toBe(true);
  expect(input.sample(549).moveX).toBe(1); expect(input.sample(550).moveX).toBe(0); expect(input.sample(550).pausePage).not.toBe(true);
  expect(input.accept({ sequence: 0, controls: { moveX: 1 } }, 600)).toBe(false);
});
it('MP-D minimal regression: active guest transport reports a blackholed downlink within the active silence budget', async () => {
  vi.useFakeTimers(); const ws = new Socket(), closed = vi.fn(), failed = vi.fn(), trouble = vi.fn();
  const relay = connectRelay({ endpoint: 'ws://127.0.0.1:8787', room: '1234567', token: 'a'.repeat(48), socket: () => ws,
    onMessage() {}, onClose: closed, onError: failed, onTrouble: trouble }); cleanup.push(relay.close);
  ws.open(); ws.receive({ type: 'joined', player: 1 });
  expect(relay.sendReady()).toBe(true); ws.receive({ type: 'ready-accepted' }); expect(relay.sendActive()).toBe(true);
  // Upstream sends succeed, but no server message/error/close reaches this endpoint again.
  await vi.advanceTimersByTimeAsync(4999); expect(trouble).not.toHaveBeenCalled(); expect(failed).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(1); expect(trouble).toHaveBeenLastCalledWith(true); expect(failed).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(9999); expect(closed.mock.calls.length + failed.mock.calls.length).toBe(0);
  await vi.advanceTimersByTimeAsync(1);
  expect(ws.sent.filter(m => m.type === 'heartbeat').length).toBeGreaterThan(0);
  expect(closed.mock.calls.length + failed.mock.calls.length).toBeGreaterThan(0);
});

it('a blackholed active call warns without ending at5s and returns an admitted guest fresh at15s once', async () => {
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture(), nights = borrowedNightSaves(checkpoint.store);
  const slots = new SaveSlots(memory.storage), saves = visitSaves(slots, nights), own = { seed: 777 }, borrowed = { seed: 123 } as Game;
  let returned = Promise.resolve(); const adoptOwn = vi.fn(async (_own: typeof own, fresh: boolean) => { expect(fresh).toBe(true); });
  const life = visitLifecycle({ saves, own: () => own, adoptBorrowed: async () => {}, adoptOwn, playing() {} });
  const f = await phoneFixture(async (_role, connection, _peer, signal) => { await life.prepare(borrowed, signal, () => {}); await life.synchronized(borrowed); connection.sendActive(); }, vi.fn(() => { returned = life.end(); }));
  await f.join(); await vi.waitFor(() => expect(f.phone.state.status).toBe('connected'));
  await vi.advanceTimersByTimeAsync(5000); expect(f.phone.state.status).toBe('connected'); expect(f.phone.state.detail).toBe('Connection trouble…'); expect(f.departed).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(10000); await returned;
  expect(f.phone.state.status).toBe('error'); expect(f.departed).toHaveBeenCalledOnce(); expect(adoptOwn).toHaveBeenCalledOnce();
  expect(slots.visiting).toBe(false); expect(nights.suspended).toBe(false); expect(checkpoint.writes).toEqual([]);
  await vi.advanceTimersByTimeAsync(30000); expect(f.departed).toHaveBeenCalledOnce(); expect(vi.getTimerCount()).toBe(0);
});

it.each(['heartbeat', 'state'])('any downstream %s clears an active warning and resets its full15s ending deadline', async type => {
  vi.useFakeTimers(); const ws = new Socket(), failed = vi.fn(), trouble = vi.fn(), message = vi.fn();
  const relay = connectRelay({ endpoint: 'ws://127.0.0.1:8787', room: '1234567', token: 'a'.repeat(48), socket: () => ws,
    onMessage: message, onClose() {}, onError: failed, onTrouble: trouble }); cleanup.push(relay.close);
  ws.open(); ws.receive({ type: 'joined', player: 1 }); relay.sendReady(); ws.receive({ type: 'ready-accepted' }); relay.sendActive();
  await vi.advanceTimersByTimeAsync(5000); expect(trouble).toHaveBeenLastCalledWith(true);
  ws.receive({ type, ...(type === 'state' ? { payload: { tick: 1 } } : {}) });
  expect(trouble).toHaveBeenLastCalledWith(false); expect(message).toHaveBeenLastCalledWith(expect.objectContaining({ type }));
  await vi.advanceTimersByTimeAsync(14999); expect(failed).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(1); expect(failed).toHaveBeenCalledOnce(); expect(ws.readyState).toBe(3);
  expect(vi.getTimerCount()).toBe(0);
});
it('an open guest socket waiting for preparation stays unarmed until sendActive', async () => {
  vi.useFakeTimers(); const ws = new Socket(), failed = vi.fn(), trouble = vi.fn();
  const relay = connectRelay({ endpoint: 'ws://127.0.0.1:8787', room: '1234567', token: 'a'.repeat(48), socket: () => ws,
    onMessage() {}, onClose() {}, onError: failed, onTrouble: trouble }); cleanup.push(relay.close);
  ws.open(); ws.receive({ type: 'joined', player: 1 }); relay.sendReady(); ws.receive({ type: 'ready-accepted' });
  await vi.advanceTimersByTimeAsync(60000); expect(trouble).not.toHaveBeenCalled(); expect(failed).not.toHaveBeenCalled();
  expect(relay.sendActive()).toBe(true); await vi.advanceTimersByTimeAsync(5000);
  expect(trouble).toHaveBeenLastCalledWith(true); expect(failed).not.toHaveBeenCalled();
  relay.close(); expect(vi.getTimerCount()).toBe(0);
});
it('host watchdog arms on accepted readiness and ends the host transport once at15s', async () => {
  vi.useFakeTimers(); const ws = new Socket(), closed = vi.fn(), failed = vi.fn(), trouble = vi.fn();
  const relay = connectRelay({ endpoint: 'ws://127.0.0.1:8787', room: '1234567', socket: () => ws,
    onMessage() {}, onClose: closed, onError: failed, onTrouble: trouble }); cleanup.push(relay.close);
  ws.open(); ws.receive({ type: 'hosted', player: 0 }); await vi.advanceTimersByTimeAsync(60000);
  expect(trouble).not.toHaveBeenCalled(); relay.sendReady(); ws.receive({ type: 'ready-accepted' });
  await vi.advanceTimersByTimeAsync(5000); expect(trouble).toHaveBeenLastCalledWith(true); expect(failed).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(10000); expect(failed).toHaveBeenCalledOnce(); expect(ws.readyState).toBe(3);
  ws.emit('close'); await vi.advanceTimersByTimeAsync(30000); expect(failed).toHaveBeenCalledOnce(); expect(closed).not.toHaveBeenCalled();
  expect(vi.getTimerCount()).toBe(0);
});
