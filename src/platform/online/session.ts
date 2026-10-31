import type { Controls, Game } from "../../rules/game";
import { guestInput, wireControls } from "./guestInput";
import { prepareJoin } from "./joinPreparation";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame, type ReplayStart } from "./replay";

export interface SessionConnection {
  sendInput(payload: unknown): boolean;
  sendState(payload: unknown): boolean;
  sendReady(): boolean;
  sendProgress(sequence: number): boolean;
  sendActive(): boolean;
}
export interface SessionOptions {
  build: string;
  hostGame(): Game;
  /** Page supplies the approved guest-room/equipment adapter; never reuse the prototype's host bedroom. */
  attach(game: Game): void;
  detach(game: Game): void;
  /** Install this authoritative game in the normal page/View. Report only actual completed preparation work. */
  prepareGuest(game: Game, signal: AbortSignal, advanced: () => void): Promise<void>;
  /** Called after the fresh post-preparation rebase; menus/saves must not mutate a presentation facade. */
  synchronized(game: Game): void;
  /** Page owns fresh-solo return/save policy and telephone/socket teardown. */
  ended(role: "host" | "guest"): void;
  failed(error: Error): void;
  advanceHost?(game: Game, inputs: readonly Controls[], dt: number): void;
  now?(): number;
}

/** Reuses the prototype's replication and input lease without a second frame loop, View or save store. */
export function onlineSession(options: SessionOptions) {
  const buffer = guestInput(), now = options.now ?? (() => performance.now());
  let role: "host" | "guest" | null = null, connection: SessionConnection | null = null, game: Game | null = null;
  let controller: AbortController | null = null, removeAbort = () => {}, tick = 0, sequence = 0, progress = 0;
  let present = false, prepared = false, ready = false, preparing = false, epoch = 0;
  let replica: ReturnType<typeof replayGuest> | null = null;
  let accept: (() => void) | null = null, reject: ((error: Error) => void) | null = null;
  const stop = () => {
    const previous = role, previousGame = game, attached = present;
    epoch++; role = null; connection = null; game = null; present = prepared = ready = preparing = false; replica = null;
    buffer.clear(); removeAbort(); removeAbort = () => {}; controller?.abort(); controller = null;
    reject?.(new Error("The online night ended.")); accept = reject = null;
    if (previous === "host" && attached && previousGame) options.detach(previousGame);
    if (previous) options.ended(previous);
  };
  const fail = (value: unknown) => { const error = value instanceof Error ? value : new Error(String(value)); stop(); options.failed(error); };
  const sendStart = () => {
    if (!connection || !game || !connection.sendState({ kind: "start", start: replayStart(game, options.build, tick) })) throw new Error("The night couldn't be sent to your friend.");
  };
  const api = {
    get role() { return role; }, get game() { return game; }, get ready() { return ready; }, get tick() { return replica?.tick ?? tick; },
    /** Telephone invokes this only after mutual identity verification and consent. */
    connect(as: "host" | "guest", relay: SessionConnection, signal: AbortSignal): Promise<void> {
      if (role) return Promise.reject(new Error("An online night is already active."));
      if (signal.aborted) return Promise.reject(new Error("The call was cancelled."));
      role = as; connection = relay; controller = new AbortController(); tick = sequence = progress = 0;
      const abort = () => stop(); signal.addEventListener("abort", abort, { once: true }); removeAbort = () => signal.removeEventListener("abort", abort);
      if (as === "host") {
        game = options.hostGame();
        if (!relay.sendReady()) { fail(new Error("The host telephone disconnected.")); return Promise.reject(new Error("The host telephone disconnected.")); }
        return Promise.resolve();
      }
      return new Promise<void>((resolve, decline) => { accept = resolve; reject = decline; });
    },
    /** Returns true only for messages owned by this session; no untyped page-mutation messages are accepted. */
    message(message: Record<string, unknown>): boolean {
      if (!role || !connection || !controller) return false;
      try {
        if (role === "host") {
          if (message.type === "guest-joined" && message.player === 1) {
            if (!present && game) { options.attach(game); present = true; buffer.clear(); sendStart(); }
            return true;
          }
          if (message.type === "guest-ready" && message.player === 1) { if (present) { sendStart(); ready = true; } return true; }
          if (message.type === "input" && message.player === 1) { if (present && ready) buffer.accept(message.payload, now()); return true; }
          if (message.type === "guest-left" && message.player === 1) { stop(); return true; }
        } else if (message.type === "state" && message.player === 0) {
          const payload = message.payload as { kind?: string; start?: ReplayStart; frame?: ReplayFrame } | null;
          if (payload?.kind === "start" && payload.start) {
            if (!replica && !preparing) {
              preparing = true; const current = epoch, signal = controller.signal;
              void prepareJoin({
                signal,
                restore: () => { replica = replayGuest(payload.start!, options.build); game = replica.game; if (game.witches.length !== 2) throw new Error("Invalid two-person night"); return game; },
                prepare: async (source, preparationSignal) => {
                  await options.prepareGuest(source, preparationSignal, () => { if (current === epoch && !signal.aborted) connection?.sendProgress(++progress); });
                  if (signal.aborted || current !== epoch) return;
                  prepared = true;
                  if (!connection?.sendReady()) throw new Error("The guest telephone disconnected.");
                },
                progress: () => progress,
                trace: () => {},
                fail: error => { if (current === epoch && !signal.aborted) fail(error); },
              });
            } else if (replica && prepared) {
              replica = replayGuest(payload.start, options.build, replica.game); game = replica.game;
              if (game.witches.length !== 2) throw new Error("Invalid two-person night");
              if (!connection.sendActive()) throw new Error("The guest telephone disconnected.");
              ready = true; options.synchronized(game); accept?.(); accept = reject = null;
            }
            return true;
          }
          if (payload?.kind === "frame" && payload.frame) {
            if (ready && replica && !replica.apply(payload.frame)) throw new Error("Online state lost its sequence. Hang up and call again.");
            return true;
          }
          throw new Error("Invalid online night message");
        }
        return false;
      } catch (error) { fail(error); return true; }
    },
    /** true means the normal page must skip its solo step. Presentation zoom remains local. */
    step(input: Controls, dt: number): boolean {
      if (!role || !connection || !game) return role === "guest";
      try {
        const controls = wireControls(input); if (!controls) throw new Error("Invalid local online controls");
        if (role === "guest") { if (ready && !connection.sendInput({ sequence: sequence++, controls })) throw new Error("The guest telephone disconnected."); return true; }
        if (!present) return false;
        const frame = replayHostStep(game, [controls, ready ? buffer.sample(now()) : wireControls({})!], dt, ++tick, options.advanceHost);
        if (ready && !connection.sendState({ kind: "frame", frame })) throw new Error("The host telephone disconnected.");
        return true;
      } catch (error) { fail(error); return true; }
    },
    disconnect: stop,
    /** Never carry a socket/replay into a replacement night; the page owns the next night. */
    nightChanged() { if (role) stop(); },
  };
  return api;
}
