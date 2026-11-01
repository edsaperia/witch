import type { Controls, Game } from "../../rules/game";
import { guestInput, wireControls } from "./guestInput";
import { prepareJoin } from "./joinPreparation";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame, type ReplayStart } from "./replay";
import { applyStationChoice, stationChoice, type StationChoice } from "./stationChoice";
import { beatAnchor } from "./beatAnchor";
import { appearance, type Appearance } from "./appearance";
import { applyStationLook } from "./stationAppearance";
import { bagOf, setBag } from "../../rules/bags";
import { sharedCatalogue, type SharedCatalogue } from "./sharedCatalogue";
import { houseSteps } from "./houseSteps";

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
  ended(role: "host" | "guest", game: Game | null): void;
  failed(error: Error): void;
  advanceHost?(game: Game, inputs: readonly Controls[], dt: number): void;
  now?(): number;
  /** Required to accept a request: page checks current station proximity, owned choices and shared availability. */
  authorizeStation?(game: Game, player: 0 | 1, choice: StationChoice): boolean;
  /** Notification only for personal presentation/storage after host approval; must not mutate the shared game. */
  stationApplied?(player: 0 | 1, choice: StationChoice): void;
  stationResolved?(player: 0 | 1, choice: StationChoice, accepted: boolean): void;
  /** Personal cosmetic data only, exchanged after telephone identity verification; never inventory or rules. */
  appearance?(): unknown;
  appearanceApplied?(player: 0 | 1, look: Appearance): void;
  /** Host collection only; guests never supply ownership. Palette is the build's actual classic outfit. */
  wardrobe?(): ReadonlySet<string>;
  stationPalette?(): Record<string, number[]>;
  catalogue?(): unknown;
  catalogueApplied?(catalogue: SharedCatalogue): void;
}

/** Reuses the prototype's replication and input lease without a second frame loop, View or save store. */
export function onlineSession(options: SessionOptions) {
  const buffer = guestInput(), now = options.now ?? (() => performance.now());
  let role: "host" | "guest" | null = null, connection: SessionConnection | null = null, game: Game | null = null;
  let controller: AbortController | null = null, removeAbort = () => {}, tick = 0, sequence = 0, progress = 0;
  let present = false, prepared = false, ready = false, preparing = false, changed = false, epoch = 0;
  let replica: ReturnType<typeof replayGuest> | null = null;
  let accept: (() => void) | null = null, reject: ((error: Error) => void) | null = null;
  let stationSequence = 0, lastStation = -1;
  const requests: { player: 0 | 1; choice: StationChoice; sequence: number }[] = [];
  const pendingStations = new Map<number, StationChoice>();
  let beatSegments: Game["beat"]["segs"] | null = null;
  const looks = new Map<0 | 1, Appearance>();
  const receivedHouse = houseSteps();
  let catalogue: SharedCatalogue | null = null;
  const hostCatalogue = () => {
    const next = sharedCatalogue(options.catalogue?.());
    if (!next) throw new Error("Invalid host station catalogue.");
    return next;
  };
  const stop = () => {
    const previous = role, previousGame = game, attached = present;
    epoch++; role = null; connection = null; game = null; present = prepared = ready = preparing = changed = false; replica = null;
    buffer.clear(); removeAbort(); removeAbort = () => {}; controller?.abort(); controller = null;
    requests.length = 0; stationSequence = 0; lastStation = -1;
    pendingStations.clear();
    beatSegments = null;
    looks.clear();
    catalogue = null; receivedHouse.clear();
    reject?.(new Error("The online night ended.")); accept = reject = null;
    if (previous === "host" && attached && previousGame) options.detach(previousGame);
    if (previous) options.ended(previous, previousGame);
  };
  const fail = (value: unknown) => { const error = value instanceof Error ? value : new Error(String(value)); stop(); options.failed(error); };
  const sendStart = () => {
    if (options.appearance && looks.size !== 2) return; // No borrowed world admission until both cosmetic profiles are validated.
    if (options.catalogue) catalogue = hostCatalogue();
    if (!connection || !game || !connection.sendState({ kind: "start", start: replayStart(game, options.build, tick), ...(options.appearance ? { looks: [...looks].map(([player, genome]) => ({ player, genome })) } : {}), ...(catalogue ? { catalogue } : {}) })) throw new Error("The night couldn't be sent to your friend.");
    beatSegments = game.beat.segs;
  };
  const api = {
    get catalogue() { return catalogue ? structuredClone(catalogue) : null; },
    takeHouseEvents: () => receivedHouse.take(),
    get role() { return role; }, get game() { return game; }, get ready() { return ready; }, get tick() { return replica?.tick ?? tick; },
    /** Telephone invokes this only after mutual identity verification and consent. */
    connect(as: "host" | "guest", relay: SessionConnection, signal: AbortSignal): Promise<void> {
      if (role) return Promise.reject(new Error("An online night is already active."));
      if (signal.aborted) return Promise.reject(new Error("The call was cancelled."));
      role = as; connection = relay; controller = new AbortController(); tick = sequence = progress = 0;
      const abort = () => stop(); signal.addEventListener("abort", abort, { once: true }); removeAbort = () => signal.removeEventListener("abort", abort);
      if (options.appearance) {
        const look = appearance(options.appearance());
        if (!look) { fail(new Error("Invalid personal witch appearance.")); return Promise.reject(new Error("Invalid personal witch appearance.")); }
        looks.set(as === "host" ? 0 : 1, look);
        if (as === "guest" && !relay.sendInput({ kind: "appearance", genome: look })) { fail(new Error("The guest appearance couldn't be sent.")); return Promise.reject(new Error("The guest appearance couldn't be sent.")); }
      }
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
          if (message.type === "guest-ready" && message.player === 1) { if (present) { sendStart(); ready = true; changed = false; } return true; }
          if (message.type === "input" && message.player === 1) {
            const profile = message.payload as Record<string, unknown> | null;
            if (options.appearance && profile?.kind === "appearance") {
              if (Object.keys(profile).length !== 2 || !Object.hasOwn(profile, "genome")) throw new Error("Invalid guest appearance message.");
              const look = appearance(profile.genome); if (!look) throw new Error("Invalid guest appearance.");
              const previous = looks.get(1);
              if (previous && JSON.stringify(previous) !== JSON.stringify(look)) throw new Error("Guest appearance changed outside station approval.");
              if (!previous) { looks.set(1, look); options.appearanceApplied?.(1, structuredClone(look)); if (present) sendStart(); }
              return true;
            }
            if (present && ready) {
              const payload = message.payload as Record<string, unknown> | null;
              if (payload?.kind === "station") {
                const choice = stationChoice(payload.choice);
                if (choice && Number.isSafeInteger(payload.sequence) && (payload.sequence as number) >= 0 && (payload.sequence as number) > lastStation) {
                  lastStation = payload.sequence as number;
                  if (requests.length < 8) requests.push({ player: 1, choice, sequence: payload.sequence as number });
                  else if (!connection.sendState({ kind: "station", tick, choices: [], results: [{ sequence: payload.sequence, accepted: false }] })) throw new Error("The station result couldn't be sent.");
                }
              } else buffer.accept(message.payload, now());
            }
            return true;
          }
          if (message.type === "guest-left" && message.player === 1) { stop(); return true; }
        } else if (message.type === "state" && message.player === 0) {
          const payload = message.payload as { kind?: string; start?: ReplayStart; frame?: ReplayFrame; tick?: number; choices?: { player: unknown; choice: unknown }[]; results?: { sequence: number; accepted: boolean }[]; beat?: unknown; looks?: { player: unknown; genome: unknown }[]; catalogue?: unknown } | null;
          if (payload?.kind === "start" && payload.start) {
            if (options.catalogue || payload.catalogue !== undefined) {
              const next = sharedCatalogue(payload.catalogue); if (!next) throw new Error("Invalid shared station catalogue.");
              catalogue = next; options.catalogueApplied?.(structuredClone(next));
            }
            if (options.appearance) {
              if (!Array.isArray(payload.looks) || payload.looks.length !== 2) throw new Error("Missing shared witch appearances.");
              const received = new Map<0 | 1, Appearance>();
              for (const entry of payload.looks) {
                if (!entry || Object.keys(entry).length !== 2 || !Object.hasOwn(entry, "player") || !Object.hasOwn(entry, "genome")) throw new Error("Invalid shared witch appearances.");
                const look = appearance(entry.genome);
                if (!look || entry.player !== 0 && entry.player !== 1 || received.has(entry.player)) throw new Error("Invalid shared witch appearances.");
                received.set(entry.player, look);
              }
              if (JSON.stringify(received.get(1)) !== JSON.stringify(looks.get(1))) throw new Error("Your witch appearance was replaced.");
              for (const [player, look] of received) {
                if (JSON.stringify(looks.get(player)) !== JSON.stringify(look)) options.appearanceApplied?.(player, structuredClone(look));
                looks.set(player, look);
              }
            }
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
            if (ready && replica) receivedHouse.capture(replica.game, 1, replica.tick);
            return true;
          }
          if (payload?.kind === "catalogue") {
            const next = sharedCatalogue(payload.catalogue);
            if (!ready || !replica || payload.tick !== replica.tick || !next) throw new Error("Invalid shared station catalogue.");
            catalogue = next; options.catalogueApplied?.(structuredClone(next)); return true;
          }
          if (payload?.kind === "checkpoint" && payload.start) {
            if (!ready || !replica || payload.start.tick !== replica.tick) throw new Error("Online station state lost its sequence. Hang up and call again.");
            replica = replayGuest(payload.start, options.build, replica.game); game = replica.game;
            if (game.witches.length !== 2) throw new Error("Invalid two-person night");
            return true;
          }
          if (payload?.kind === "station") {
            if (!ready || !replica || payload.tick !== replica.tick || !Array.isArray(payload.choices) || payload.choices.length > 8) throw new Error("Invalid online station choices");
            const results = payload.results ?? [], seen = new Set<number>();
            if (!Array.isArray(results) || results.length > 8) throw new Error("Invalid station results");
            if (payload.choices.filter(entry => entry.player === 1).length !== results.filter(result => result?.accepted === true).length) throw new Error("Station approvals lack their results");
            for (const result of results) {
              if (!result || Object.keys(result).length !== 2 || !Number.isSafeInteger(result.sequence) || typeof result.accepted !== "boolean" || !pendingStations.has(result.sequence) || seen.has(result.sequence)) throw new Error("Invalid station results");
              seen.add(result.sequence);
              if (result.accepted && !payload.choices.some(entry => entry.player === 1 && JSON.stringify(entry.choice) === JSON.stringify(pendingStations.get(result.sequence)))) throw new Error("Station approval lacks its choice");
            }
            for (const entry of payload.choices) {
              const choice = stationChoice(entry.choice);
              if (choice?.kind === "look" && (entry.player === 0 || entry.player === 1)) {
                const before = looks.get(entry.player), next = before && applyStationLook(before, choice, undefined, options.stationPalette?.());
                if (!next) throw new Error("Invalid approved station appearance");
                if (choice.station === "bags") setBag(replica.game.witches[entry.player].spells, bagOf(next));
                looks.set(entry.player, next); options.appearanceApplied?.(entry.player, structuredClone(next));
              }
              if (!choice || entry.player !== 0 && entry.player !== 1 || !applyStationChoice(replica.game, entry.player, choice)) throw new Error("Online station choices disagree");
              options.stationApplied?.(entry.player, choice);
            }
            for (const result of results) {
              const choice = pendingStations.get(result.sequence)!; pendingStations.delete(result.sequence);
              options.stationResolved?.(1, choice, result.accepted);
            }
            return true;
          }
          if (payload?.kind === "beat") {
            const anchor = beatAnchor(payload.beat);
            if (!ready || !replica || payload.tick !== replica.tick || !anchor) throw new Error("Invalid online beat anchor");
            replica.game.beat = anchor; return true;
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
        // Only the pause page votes to pause. Ordinary menus and omitted input never retain an old vote.
        controls.pausePage = input.pausePage === true;
        if (role === "guest") { if (ready && !connection.sendInput({ sequence: sequence++, controls })) throw new Error("The guest telephone disconnected."); return true; }
        if (!present) return false;
        if (ready && options.catalogue) {
          const next = hostCatalogue();
          if (JSON.stringify(next) !== JSON.stringify(catalogue)) {
            if (!connection.sendState({ kind: "catalogue", tick, catalogue: next })) throw new Error("The station catalogue couldn't be sent.");
            catalogue = next;
          }
        }
        // Page-owned station mutations are not controls. Coalesce them at this ordered boundary,
        // after the previous frame and before advancing the next one, retaining the current tick.
        if (changed && ready) {
          if (!connection.sendState({ kind: "checkpoint", start: replayStart(game, options.build, tick) })) throw new Error("The station change couldn't be sent to your friend.");
          changed = false;
          beatSegments = game.beat.segs;
        }
        // shiftBeat always replaces segs. Send that small host-owned anchor before the next frame;
        // ordinary deterministic tempo changes inside stepGame are already replayed on both ends.
        if (ready && game.beat.segs !== beatSegments && !connection.sendState({ kind: "beat", tick, beat: structuredClone(game.beat) })) throw new Error("The host beat couldn't be sent to your friend.");
        const approved: { player: 0 | 1; choice: StationChoice }[] = [];
        const resolved: { player: 0 | 1; choice: StationChoice; sequence: number; accepted: boolean }[] = [];
        const applyRequest = (request: typeof requests[number]): boolean => {
          if (options.authorizeStation?.(game!, request.player, request.choice) !== true) return false;
          const before = looks.get(request.player), wardrobe = options.wardrobe?.();
          const next = request.choice.kind === "look" && before && wardrobe ? applyStationLook(before, request.choice, wardrobe, options.stationPalette?.()) : null;
          if (request.choice.kind === "look" && !next) return false;
          if (next && request.choice.kind === "look" && request.choice.station === "bags" && options.authorizeStation?.(game!, request.player, { kind: "bag", id: bagOf(next) }) !== true) return false;
          if (!applyStationChoice(game!, request.player, request.choice)) return false;
          if (next) {
            if (request.choice.kind === "look" && request.choice.station === "bags") setBag(game!.witches[request.player].spells, bagOf(next));
            looks.set(request.player, next);
          }
          return true;
        };
        for (const request of requests.splice(0)) {
          const accepted = applyRequest(request);
          if (accepted) approved.push({ player: request.player, choice: request.choice });
          resolved.push({ ...request, accepted });
        }
        const results = resolved.filter(request => request.player === 1).map(({ sequence, accepted }) => ({ sequence, accepted }));
        if (approved.length || results.length) {
          if (!connection.sendState({ kind: "station", tick, choices: approved, ...(results.length ? { results } : {}) })) throw new Error("The station choice couldn't be sent to your friend.");
          for (const request of approved) {
            if (request.choice.kind === "look") options.appearanceApplied?.(request.player, structuredClone(looks.get(request.player)!));
            options.stationApplied?.(request.player, request.choice);
          }
        }
        for (const request of resolved) options.stationResolved?.(request.player, request.choice, request.accepted);
        const guestControls = ready ? buffer.sample(now()) : wireControls({})!;
        guestControls.pausePage = guestControls.pausePage === true;
        const frame = replayHostStep(game, [controls, guestControls], dt, ++tick, options.advanceHost);
        beatSegments = game.beat.segs;
        if (ready && !connection.sendState({ kind: "frame", frame })) throw new Error("The host telephone disconnected.");
        return true;
      } catch (error) { fail(error); return true; }
    },
    disconnect: stop,
    /** Rare host page-boundary fallback, not a per-frame update: full snapshot cost still needs browser measurement.
     * Typed station choices below avoid restoring a full world for the ordinary equipment selections. */
    changed() { if (role === "host" && present) changed = true; },
    /** true means queued/sent, not approved. Never applies locally on the guest;
     * the host validates station proximity/ownership against its current game on its next step. */
    choose(value: StationChoice): boolean {
      const choice = stationChoice(value);
      if (!ready || !connection || !choice) return false;
      if (role === "guest") {
        if (pendingStations.size >= 8) return false;
        const sequence = stationSequence++;
        if (!connection.sendInput({ kind: "station", sequence, choice })) return false;
        pendingStations.set(sequence, choice); return true;
      }
      if (role !== "host" || requests.length >= 8) return false;
      requests.push({ player: 0, choice, sequence: stationSequence++ }); return true;
    },
    /** Never carry a socket/replay into a replacement night; the page owns the next night. */
    nightChanged() { if (role) stop(); },
  };
  return api;
}
