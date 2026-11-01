import type { Controls, Game } from "../rules/game";
import { HOUSE_ROOMS, objectAt } from "../rules/houseRooms";
import { telephone, type TelephoneOptions } from "./telephone";
import { onlineSession, type SessionOptions } from "../platform/online/session";
import { localView } from "../platform/online/localView";
import type { StationChoice } from "../platform/online/stationChoice";
import { visitPreferences } from "./visitPreferences";
import { telephoneActor } from "./telephoneActor";
import type { TelephoneState } from "../ui/telephone";

/** Ordinary station lifetime/input seam. Call admission remains off until canonical proof and deployment approval. */
export function telephoneStation(options: Pick<TelephoneOptions, "storage" | "loadIdentity" | "menu" | "socket" | "digit" | "face" | "clearFaces"> & { enabled?: boolean; callsEnabled?: boolean; session?: SessionOptions }) {
  const session = options.enabled && options.session ? onlineSession(options.session) : null;
  const preferences = visitPreferences();
  let presentation: ReturnType<typeof localView> | null = null, source: Game | null = null;
  let phone: ReturnType<typeof telephone> | null = null;
  const idleState: TelephoneState = { own: "", status: "ended", recent: [], saved: true };
  const makePhone = () => telephone({ ...options, callsEnabled: options.enabled === true && options.callsEnabled === true,
    connected: async (role, connection, _peer, signal) => {
      if (!session) throw new Error("Calls aren't available in this build yet.");
      await session.connect(role, connection, signal);
    }, message: message => { session?.message(message); }, departed: () => { session?.disconnect(); presentation = source = null; preferences.clear(); },
  });
  let night: Game | null = null, object: string | null = null;
  const close = () => { void phone?.show(false); };
  return {
    get open() { return phone?.open ?? false; },
    get object() { return phone?.open ? object : null; },
    get state() { return phone?.state ?? idleState; },
    get active() { return session?.role !== null && session?.role !== undefined; },
    get visiting() { return session?.role === "guest"; },
    get catalogue() { return session?.catalogue ?? null; },
    houseEvents() { return session?.role === "guest" ? session.takeHouseEvents() : null; },
    choose(choice: StationChoice): boolean { return session?.choose(choice) ?? false; },
    changed() { session?.changed(); },
    preferences(game: Game) { return session?.role === "guest" ? preferences.tuning(game) : game.tuning; },
    step(game: Game, controls: Controls, dt: number): boolean {
      if (session?.role === "guest" && !session.ready) return true; // Own page may still be draining its checkpoint before adoption.
      if (session?.game && session.game !== game) { session.nightChanged(); presentation = source = null; return false; }
      return session?.step(controls, Math.min(0.1, dt)) ?? false;
    },
    /** Solo returns the exact canonical object. Both online players own a local camera/focus facade. */
    presented(game: Game, dt = 0, zoom = 0): Game {
      if (!session?.role || session.game !== game) { presentation = source = null; return game; }
      if (source !== game) { source = game; presentation = localView(game, session.role === "guest" ? 1 : 0); }
      return Object.assign(presentation!.update(dt, zoom), { tuning: session.role === "guest" ? preferences.tuning(game) : game.tuning });
    },
    use(game: Game, id: string): void {
      const actor = telephoneActor(game, session?.role === "guest");
      if (!options.enabled || !actor || actor.ko || HOUSE_ROOMS.objects.find(o => o.id === id)?.use.kind !== "telephone") return;
      phone ??= makePhone(); night = game; object = id; void phone.show(!phone.open);
    },
    /** Also closes before sailing/replacement, knockout or leaving the telephone's reach; never mutates a game/save. */
    frame(game: Game | null, now: number): void {
      if (!phone) return;
      const actor = telephoneActor(game, session?.role === "guest");
      if (phone.open && (!game || night !== game || !actor || actor.ko || !actor.body.perch || objectAt(game.map.treehouse, actor.body.x, actor.body.z)?.use.kind !== "telephone")) close();
      if (phone.open) phone.pollPad(typeof navigator !== "undefined" && navigator.getGamepads ? [...navigator.getGamepads()].find(p => p) ?? null : null, now);
    },
    close,
    async returnHome(game: Game, id: string): Promise<void> {
      if (!options.enabled) return;
      phone ??= makePhone();
      night = game; object = id;
      await phone.show(false);
      await phone.show(true); phone.redial();
    },
    hangUp() { phone?.hangUp(); },
    dispose() { session?.disconnect(); presentation = source = null; preferences.clear(); phone?.dispose(); },
  };
}
