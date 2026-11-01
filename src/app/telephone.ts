import { telephoneBook, telephoneNumber, type TelephoneStorage } from "./telephoneBook";
import { TelephonePanel, type TelephoneActions, type TelephoneState } from "../ui/telephone";
import { connectRelay, type RelaySocket } from "../platform/online/relayClient";
import { browserTelephoneIdentityStore, loadTelephoneIdentity, numberForKey, type TelephoneChallenge, type TelephoneIdentity, type TelephonePublicKey } from "../platform/online/telephoneIdentity";
import { telephoneTrust } from "../platform/online/telephoneTrust";
export type TelephoneConnection = ReturnType<typeof connectRelay>;
interface Menu { show(on: boolean): void; render(state: TelephoneState): void; redial(number: string): void; pollPad?(pad: Gamepad | null, now: number): void }
export interface TelephoneOptions {
  storage: TelephoneStorage | null;
  loadIdentity?(): Promise<TelephoneIdentity>;
  connected(role: "host" | "guest", connection: TelephoneConnection, peer: string, signal: AbortSignal): Promise<void>;
  message(message: Record<string, unknown>): void;
  departed(): void;
  /** Ordinary mounting keeps calls off until guest/save binding and the reviewed relay deployment are ready. */
  callsEnabled?: boolean;
  endpoint?: string; socket?: (url: string) => RelaySocket; menu?: (actions: TelephoneActions) => Menu;
  digit?: (digit: string) => void; face?: (number: string) => Node | null;
  clearFaces?(): void;
  trouble?(on: boolean): void;
}
/** Page-owned telephone; only mutually verified/accepted calls reach the ordinary-game session hook. */
export function telephone(options: TelephoneOptions) {
  const book = telephoneBook(options.storage);
  let connection: TelephoneConnection | null = null, role: "host" | "guest" | null = null, generation = 0, attempt = 0, open = false;
  let joinAbort: AbortController | null = null, trust: ReturnType<typeof telephoneTrust> | null = null;
  let intent: "host" | "guest" | null = null;
  let identity: Promise<TelephoneIdentity> | null = null, identityQueue = Promise.resolve();
  let state: TelephoneState = { own: book.number, recent: book.recent, saved: book.saved, status: "ended" };
  const paint = (patch: Partial<TelephoneState>) => { state = { ...state, ...patch, recent: book.recent, saved: book.saved }; menu.render(state); };
  const hangUp = () => {
    options.trouble?.(false);
    generation++; attempt++; intent = null; trust?.cancel(); joinAbort?.abort(); joinAbort = null; connection?.close(); connection = null;
    const joined = role !== null; role = null; paint({ status: "ended" }); if (joined) options.departed();
  };
  const fail = (error: unknown) => { hangUp(); paint({ status: "error", detail: error instanceof Error ? error.message : "The call couldn't connect." }); };
  const agree = () => { if (!trust || !connection) return; trust.agree(); connection.identityVerified(); paint({ status: "joining", detail: undefined }); };
  const actions: TelephoneActions = {
    dial(number) { if (!telephoneNumber(number) || number === book.number || !connection || role || !["available", "busy", "unavailable"].includes(state.status)) return; if (connection.dial(number)) { intent = "host"; paint({ status: "dialling", peer: number, detail: undefined }); } },
    answer() { if (state.status === "ringing" && connection) { intent = "guest"; connection.answer(); } }, decline() { connection?.decline(); }, hangUp,
    close() { void api.show(false); }, retry() { if (!role) void api.show(false).then(() => api.show(true)); },
    confirmIdentity() { if (state.status === "confirming") { try { agree(); } catch (error) { fail(error); } } },
    digit: options.digit, face: options.face, clearFaces: options.clearFaces ? () => { options.clearFaces!(); menu.render(state); } : undefined,
  };
  const menu = options.menu?.(actions) ?? new TelephonePanel(actions);
  const api = {
    get number() { return book.number; }, get open() { return open; }, get state(): Readonly<TelephoneState> { return state; },
    /** Await current identity checks in page adapters/tests; never includes private material in public state. */
    settled: () => identityQueue,
    async show(on: boolean): Promise<void> {
      if (open === on) return; open = on; menu.show(on);
      if (!on) {
        connection?.available(false);
        if (!role) { generation++; trust?.cancel(); connection?.close(); connection = null; paint({ status: "ended" }); }
        return;
      }
      if (connection) { connection.available(true); return; }
      const current = ++generation; paint({ status: "connecting", detail: undefined });
      try {
        identity ??= (options.loadIdentity ?? (() => loadTelephoneIdentity(browserTelephoneIdentityStore())))();
        const own = await identity, number = await numberForKey(own.publicKey);
        if (current !== generation || !open) return;
        book.assigned(number); paint({ own: number });
        if (options.callsEnabled === false) { paint({ status: "preparing" }); return; }
        trust = telephoneTrust(own, book.pinned);
        connection = connectRelay({ endpoint: options.endpoint ?? "wss://witch-relay.onrender.com", room: number, telephone: true, telephonePublicKey: own.publicKey, socket: options.socket,
          onError(error) { if (current === generation) fail(error); },
            onTrouble(on) { if (current === generation && role) { paint({ detail: on ? "Connection trouble…" : undefined }); options.trouble?.(on); } },
          onClose() {
            if (current !== generation) return;
            generation++; attempt++; intent = null;
            trust?.cancel(); joinAbort?.abort(); connection = null; const joined = role !== null; role = null; paint({ status: "ended" }); if (joined) options.departed();
          },
          onMessage(message) {
            if (current !== generation) return;
            if (message.type === "call-challenge" || message.type === "identity-proof") {
              if (message.type === "call-challenge") attempt++;
              const callAttempt = attempt;
              identityQueue = identityQueue.then(async () => {
                if (current !== generation || callAttempt !== attempt || !trust || !connection) return;
                if (message.type === "call-challenge") {
                  if (message.role !== "host" && message.role !== "guest") throw new Error("Invalid telephone role");
                  const challenge = message.challenge as TelephoneChallenge;
                  if (message.role !== intent || (message.role === "host" ? challenge?.answerer : challenge?.caller) !== state.peer) throw new Error("This isn't the call you chose.");
                  const proof = await trust.challenge(challenge, message.role, message.publicKey as TelephonePublicKey);
                  if (current === generation && callAttempt === attempt) connection.identityProof(proof);
                } else {
                  const result = await trust.proof(String(message.signature));
                  if (current !== generation || callAttempt !== attempt) return;
                  if (result === "known") agree(); else paint({ status: "confirming", detail: undefined });
                }
              }).catch(error => { if (current === generation && callAttempt === attempt) fail(error); });
              return;
            }
            if (message.type === "telephone-ready") { if (message.number !== number) fail(new Error("The telephone address couldn't be verified.")); else paint({ status: "available" }); }
            else if (message.type === "call-throttled") { intent = null; paint({ status: "available", detail: "Please wait a moment before calling again." }); }
            else if (message.type === "incoming-call" && telephoneNumber(message.number) && !role && !intent) paint({ status: "ringing", peer: message.number });
            else if (message.type === "call-ringing") paint({ status: "dialling" });
            else if (message.type === "call-unavailable") { intent = null; paint({ status: "unavailable" }); }
            else if (message.type === "call-busy") { intent = null; paint({ status: "busy" }); }
            else if (["call-cancelled", "call-declined", "call-timeout"].includes(String(message.type))) { attempt++; intent = null; trust?.cancel(); paint({ status: "available" }); }
            else if (message.type === "call-connected" && (message.role === "host" || message.role === "guest") && telephoneNumber(message.number) && connection) {
              if (role) return;
              try {
                const key = trust!.connected(message.role, message.number);
                book.remember(message.number, key); role = message.role; paint({ status: "joining", peer: message.number }); joinAbort = new AbortController();
                void options.connected(role, connection, message.number, joinAbort.signal).then(() => {
                  if (current === generation && role) paint({ status: "connected" });
                }, error => { if (current === generation) fail(error); });
              } catch (error) { fail(error); }
            } else options.message(message);
          },
        });
      } catch (error) { if (current === generation) { identity = null; fail(error); } }
    },
    redial() { if (state.peer) menu.redial(state.peer); }, hangUp,
    pollPad(pad: Gamepad | null, now: number) { menu.pollPad?.(pad, now); },
    dispose() { open = false; menu.show(false); hangUp(); },
  };
  menu.render(state); return api;
}
