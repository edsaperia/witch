import { telephoneBook, telephoneNumber, type TelephoneStorage } from "./telephoneBook";
import { TelephonePanel, type TelephoneActions, type TelephoneState } from "../ui/telephone";
import { connectRelay, type RelaySocket } from "../platform/online/relayClient";

export type TelephoneConnection = ReturnType<typeof connectRelay>;
interface Menu { show(on: boolean): void; render(state: TelephoneState): void; redial(number: string): void }
export interface TelephoneOptions {
  storage: TelephoneStorage | null;
  random(): number;
  /** These hooks are implemented by the ordinary game's session owner, never a second entry page. */
  connected(role: "host" | "guest", connection: TelephoneConnection, peer: string, signal: AbortSignal): Promise<void>;
  message(message: Record<string, unknown>): void;
  departed(): void;
  endpoint?: string;
  socket?: (url: string) => RelaySocket;
  menu?: (actions: TelephoneActions) => Menu;
  digit?: (digit: string) => void;
  face?: (number: string) => Node | null;
}

/** Page-owned telephone lifetime. Listing ends on stepping away; a connected game's relay stays alive. */
export function telephone(options: TelephoneOptions) {
  const book = telephoneBook(options.storage, options.random);
  let connection: TelephoneConnection | null = null, role: "host" | "guest" | null = null, generation = 0, open = false;
  let joinAbort: AbortController | null = null;
  let state: TelephoneState = { own: book.number, recent: book.recent, saved: book.saved, status: "ended" };
  const paint = (patch: Partial<TelephoneState>) => { state = { ...state, ...patch, recent: book.recent, saved: book.saved }; menu.render(state); };
  const hangUp = () => {
    generation++; joinAbort?.abort(); joinAbort = null; connection?.close(); connection = null;
    const wasConnected = role !== null; role = null;
    paint({ status: "ended" }); if (wasConnected) options.departed();
  };
  const actions: TelephoneActions = {
    dial(number) { if (!telephoneNumber(number) || number === book.number || !connection || role || !["available", "busy", "unavailable", "ended"].includes(state.status)) return; if (connection.dial(number)) paint({ status: "dialling", peer: number, detail: undefined }); },
    answer() { if (state.status === "ringing") connection?.answer(); },
    decline() { connection?.decline(); },
    hangUp,
    close() { api.show(false); },
    retry() { if (!role) { api.show(false); api.show(true); } },
    digit: options.digit, face: options.face,
  };
  const menu = options.menu?.(actions) ?? new TelephonePanel(actions);
  const api = {
    number: book.number,
    get state(): Readonly<TelephoneState> { return state; },
    show(on: boolean) {
      if (open === on) return; open = on; menu.show(on);
      if (!on) {
        connection?.available(false);
        if (!role) { generation++; connection?.close(); connection = null; paint({ status: "ended" }); }
        return;
      }
      if (connection) { connection.available(true); return; }
      const current = ++generation; paint({ status: "connecting", detail: undefined });
      connection = connectRelay({ endpoint: options.endpoint ?? "wss://witch-relay.onrender.com", room: book.number, telephone: true, socket: options.socket,
        onError(error) { if (current !== generation) return; paint({ status: "error", detail: error.message }); },
        onClose() {
          if (current !== generation) return;
          joinAbort?.abort(); joinAbort = null; connection = null; const joined = role !== null; role = null; paint({ status: "ended" }); if (joined) options.departed();
        },
        onMessage(message) {
          if (current !== generation) return;
          if (message.type === "telephone-ready") paint({ status: "available" });
          else if (message.type === "incoming-call" && telephoneNumber(message.number)) paint({ status: "ringing", peer: message.number });
          else if (message.type === "call-ringing") paint({ status: "dialling" });
          else if (message.type === "call-unavailable") paint({ status: "unavailable" });
          else if (message.type === "call-busy") paint({ status: "busy" });
          else if (["call-cancelled", "call-declined", "call-timeout"].includes(String(message.type))) paint({ status: "available" });
          else if (message.type === "call-connected" && (message.role === "host" || message.role === "guest") && telephoneNumber(message.number) && connection) {
            if (role) return; // Duplicate confirmation cannot install the host's night twice.
            role = message.role; book.remember(message.number); paint({ status: "joining", peer: message.number });
            joinAbort = new AbortController();
            void options.connected(role, connection, message.number, joinAbort.signal).then(() => {
              if (current === generation && role) paint({ status: "connected" });
            }, error => {
              if (current !== generation) return;
              const joined = role !== null; role = null; generation++; joinAbort?.abort(); joinAbort = null; connection?.close(); connection = null;
              paint({ status: "error", detail: error instanceof Error ? error.message : "The night couldn't be joined." }); if (joined) options.departed();
            });
          } else options.message(message);
        },
      });
    },
    /** Use after return-home preparation: retain the caller's number, never the host snapshot. */
    redial() { if (state.peer) menu.redial(state.peer); },
    hangUp,
    dispose() { open = false; menu.show(false); hangUp(); },
  };
  menu.render(state);
  return api;
}
