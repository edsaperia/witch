// Ed, 2026-10-30: save slots hold progress and settings and reopen the previous slot.
// Keep records independent: a corrupt slot cannot make the index or another slot unreadable.
import { logCaughtError } from "../platform/caughtError";
export interface SlotStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem?(key: string): void; /** (localStorage's: lets delete find every witch.save.<id>.* key) */ readonly length?: number; key?(index: number): string | null }
export interface SlotStorageView extends SlotStorage { removeItem(key: string): void }
export interface SaveSlot { id: string; name: string; created: number; updated: number; island?: string; nights?: number }
export interface SavesHost { list(): SaveSlot[]; active(): string; choose(id: string | null): Promise<string | null>;
  /** (Ed, 2026-11-02: hold to delete) a save gone; the page's own reloads into another. An error to show, or null. */
  delete?(id: string): Promise<string | null>;
  /** a borrowed visit or a call in progress: no deleting then */
  locked?(): boolean }
interface SlotIndex { version: 1; active: string; slots: SaveSlot[] }
export const SLOT_INDEX = "witch.saves.v1";
export const SLOT_KEYS = ["witch.genome", "witch.owned", "witch.broom", "witch.loadout", "witch.hats", "witch.records", "witch.chart", "witch.guide", "witch.arrive", "witch.player", "witch.settings", "witch.shake", "witch.bindings", "witch.autotalk", "witch.woken", "witch.mirrored", "witch.creator.box", "witch.pauseOpen", "witch.debug.unlockAll", "witch.mushrooms"] as const;
const scoped = new Set<string>(SLOT_KEYS);
/** Only borrowed game/progress writes are transient. Personal volume/bindings/display preferences still persist. */
export const BORROWED_GAME_KEYS = ["witch.genome", "witch.owned", "witch.broom", "witch.loadout", "witch.hats", "witch.records", "witch.chart", "witch.guide", "witch.arrive", "witch.woken", "witch.mirrored", "witch.debug.unlockAll", "witch.mushrooms", "witch.night", SLOT_INDEX] as const;
const borrowedGameKey = (key: string) => BORROWED_GAME_KEYS.some(prefix => key === prefix || key.startsWith(prefix + "."));
export const slotKey = (id: string, key: string): string => `witch.save.${id}.${key}`;
const validId = (v: unknown): v is string => typeof v === "string" && /^s[1-9][0-9]*$/.test(v);

export class SaveSlots {
  private index: SlotIndex | null = null;
  private pending = new Map<string, string | null>();
  private warned = new Set<string>();
  private migrationReady = true;
  private readFailures = 0;
  private dirty = new Set<string>();
  private visitValues: Map<string, string | null> | null = null;
  /** Deleted this page: another tab's older index can't bring them back, and their pinned adapters write nothing. */
  private deleted = new Set<string>();
  constructor(private store: SlotStorage | null, private failed: (key: string, error: unknown) => void = (key, error) => logCaughtError(error, `[saves] ${key}`), private now: () => number = Date.now) {}
  private failure(key: string, error: unknown): void { if (!this.warned.has(key)) { this.warned.add(key); this.failed(key, error); } }
  private read(key: string): string | null {
    if (this.pending.has(key)) return this.pending.get(key) ?? null;
    try { return this.store?.getItem(key) ?? null; } catch (e) { this.readFailures++; this.failure(key, e); return null; }
  }
  private write(key: string, value: string): boolean {
    this.pending.set(key, value);
    try {
      if (!this.store) throw new Error("Storage unavailable; keeping this page's save only.");
      this.store.setItem(key, value); this.pending.delete(key); return true;
    } catch (e) { this.failure(key, e); return false; }
  }
  private remove(key: string): boolean {
    this.pending.set(key, null);
    try {
      if (!this.store?.removeItem) throw new Error("Storage unavailable; forgetting on this page only.");
      this.store.removeItem(key); this.pending.delete(key); return true;
    } catch (e) { this.failure(key, e); return false; }
  }
  private load(): SlotIndex {
    if (this.index) return this.index;
    let invalidIndex = false;
    try {
      const raw = this.read(SLOT_INDEX);
      if (raw) {
        const value = JSON.parse(raw) as SlotIndex;
        if (value.version !== 1 || !Array.isArray(value.slots)) throw new Error("Invalid save index");
        const seen = new Set<string>();
        const slots = value.slots.filter(s => s && validId(s.id) && typeof s.name === "string" && Number.isFinite(s.created) && Number.isFinite(s.updated) && !seen.has(s.id) && !!seen.add(s.id));
        if (!slots.length) throw new Error("Empty save index");
        return this.index = { version: 1, active: slots.some(s => s.id === value.active) ? value.active : slots[0].id, slots };
      }
    } catch (e) { invalidIndex = true; this.failure(SLOT_INDEX, e); }
    const at = this.now();
    const index: SlotIndex = { version: 1, active: "s1", slots: [{ id: "s1", name: "Save 1", created: at, updated: at }] };
    // Do not publish a migration marker until all copies succeeded. Originals remain untouched.
    let copied = !invalidIndex;
    for (const key of SLOT_KEYS) {
      // A partial migration or damaged index must never roll newer slot bytes back to legacy values.
      if (this.read(slotKey("s1", key)) !== null) continue;
      const value = this.read(key);
      if (value !== null) copied = this.write(slotKey("s1", key), value) && copied;
    }
    this.index = index;
    this.migrationReady = copied && this.readFailures === 0;
    if (this.migrationReady) this.write(SLOT_INDEX, JSON.stringify(index));
    return index;
  }
  active(): string { return this.load().active; }
  get visiting(): boolean { return this.visitValues !== null; }
  /** Confirmed visit only. Return ends the lease and drops transient changes without rewriting stored bytes. */
  beginBorrowedVisit(): () => void {
    this.load();
    if (this.visitValues) throw new Error("A borrowed save visit is already active.");
    const values = this.visitValues = new Map<string, string | null>();
    return () => { if (this.visitValues === values) this.visitValues = null; };
  }
  list(): SaveSlot[] { return this.load().slots.map(s => ({ ...s })); }
  touch(id = this.active()): void {
    if (this.visiting) return;
    const slot = this.load().slots.find(s => s.id === id);
    if (slot) { slot.updated = this.now(); this.dirty.add(id); this.persist(); }
  }
  summary(island: string, nightEnded = false, id = this.active()): void {
    if (this.visiting) return;
    const slot = this.load().slots.find(s => s.id === id);
    if (slot) { slot.island = island; slot.updated = this.now(); if (nightEnded) slot.nights = (slot.nights ?? 0) + 1; this.dirty.add(id); this.persist(); }
  }
  private mergeIndex(selecting = false): boolean {
    const index = this.load();
    try {
      const raw = this.store?.getItem(SLOT_INDEX);
      if (!raw) return true;
      const external = JSON.parse(raw) as SlotIndex;
      if (external.version !== 1 || !Array.isArray(external.slots)) throw new Error("Invalid save index");
      const merged = new Map(external.slots.filter(s => s && validId(s.id) && typeof s.name === "string" && Number.isFinite(s.created) && Number.isFinite(s.updated)).map(s => [s.id, s]));
      for (const slot of index.slots) if (!merged.has(slot.id) || this.dirty.has(slot.id)) merged.set(slot.id, slot);
      for (const id of this.deleted) merged.delete(id);
      index.slots = [...merged.values()];
      if (!selecting && merged.has(external.active)) index.active = external.active;
      return true;
    } catch (error) { this.failure(SLOT_INDEX, error); return false; }
  }
  private persist(selecting = false): boolean {
    const index = this.load();
    // An incomplete legacy copy must never be hidden by a later create/select operation.
    if (!this.migrationReady || !this.mergeIndex(selecting)) return false;
    const kept = this.write(SLOT_INDEX, JSON.stringify(index));
    if (kept) this.dirty.clear();
    return kept;
  }
  private freshId(): string { return "s1" + Array.from(crypto.getRandomValues(new Uint32Array(2)), n => n.toString().padStart(10, "0")).join(""); }
  create(): SaveSlot {
    if (this.visiting) throw new Error("Finish visiting your friend before creating a save.");
    const index = this.load(); this.mergeIndex();
    const number = index.slots.length + 1, at = this.now();
    // Opaque IDs avoid two open tabs allocating the same next integer.
    const slot = { id: this.freshId(), name: `Save ${number}`, created: at, updated: at };
    index.slots.push(slot); this.dirty.add(slot.id); this.persist(); return { ...slot };
  }
  /** Persist selection before a reload. A blocked write must not reload back into the old slot. */
  select(id: string): boolean {
    if (this.visiting) return false;
    const index = this.load();
    if (!index.slots.some(s => s.id === id)) return false;
    // Refuse a reload while any outgoing data exists only in memory.
    for (const [key, value] of [...this.pending]) { if (value === null) this.remove(key); else this.write(key, value); }
    if (this.pending.size) return false;
    const old = index.active; index.active = id;
    if (this.persist(true)) return true;
    index.active = old; this.persist(); return false;
  }
  /** (Ed, 2026-11-02: "a way to delete saves in the settings menu") The slot's index entry and every witch.save.<id>.* key (slot 1
   *  its legacy originals too, or a damaged index would migrate it back). Deleting the last-used one picks the most recent left, or a
   *  fresh one: there is always a slot. Its resumable night is IndexedDB's (deleteSave). False: visiting, unknown or not persisted. */
  delete(id: string): boolean {
    if (this.visiting) return false;
    const index = this.load(); this.mergeIndex();
    if (!index.slots.some(s => s.id === id)) return false;
    // The index first: refused, nothing is lost. Then the bytes (a key the browser won't remove reads as gone on this page).
    const slots = index.slots, active = index.active, selecting = active === id;
    this.deleted.add(id); this.dirty.delete(id);
    index.slots = slots.filter(s => s.id !== id);
    if (!index.slots.length) { const at = this.now(), fresh = { id: this.freshId(), name: "Save 1", created: at, updated: at }; index.slots.push(fresh); this.dirty.add(fresh.id); }
    if (selecting) index.active = [...index.slots].sort((a, b) => b.updated - a.updated)[0].id;
    if (!this.persist(selecting)) { this.deleted.delete(id); index.slots = slots; index.active = active; this.persist(); return false; }
    const prefix = slotKey(id, ""), keys = new Set<string>(SLOT_KEYS.map(k => slotKey(id, k)));
    if (id === "s1") for (const k of SLOT_KEYS) keys.add(k);
    try { const n = this.store?.length ?? 0; for (let i = 0; i < n; i++) { const k = this.store!.key?.(i); if (k?.startsWith(prefix)) keys.add(k); } } catch (e) { this.failure(prefix, e); }
    for (const k of this.pending.keys()) if (k.startsWith(prefix)) keys.add(k);
    for (const k of keys) this.remove(k);
    return true;
  }
  /** (Ed, 2026-11-02: the pause page's Reset everything) Every slot deleted, into one fresh slot, the last-used. */
  resetAll(): boolean {
    if (this.visiting) return false;
    this.load(); this.mergeIndex();
    let kept = true;
    for (const { id } of this.list()) kept = this.delete(id) && kept;
    return kept;
  }
  storage(id = this.active()): SlotStorageView {
    if (!this.load().slots.some(s => s.id === id)) throw new Error("Unknown save slot");
    return {
      getItem: key => {
        const at = scoped.has(key) ? slotKey(id, key) : key;
        return this.visitValues?.has(at) ? this.visitValues.get(at) ?? null : this.read(at);
      },
      setItem: (key, value) => {
        const at = scoped.has(key) ? slotKey(id, key) : key;
        if (this.deleted.has(id) && at !== key) return; // (a deleted slot's page, until it reloads: its pagehide saves go nowhere)
        if (this.visitValues && borrowedGameKey(key)) { this.visitValues.set(at, value); return; }
        if (!this.write(at, value)) throw new Error(`Browser storage refused ${key}`);
      },
      removeItem: key => {
        const at = scoped.has(key) ? slotKey(id, key) : key;
        if (this.deleted.has(id) && at !== key) return;
        if (this.visitValues && borrowedGameKey(key)) { this.visitValues.set(at, null); return; }
        if (!this.remove(at)) throw new Error(`Browser storage refused ${key}`);
      },
    };
  }
  /** IDB retains the legacy path for slot 1: lossless without duplicating a large night. */
  nightKey(path: string, id = this.active()): string { return id === "s1" ? path : `${path}#save=${id}`; }
}

// Keep a page's adapter pinned to its boot slot. Even pagehide after selection must write the outgoing slot.
const browsers = new WeakMap<SlotStorage, { saves: SaveSlots; storage: SlotStorageView }>();
let unavailable: { saves: SaveSlots; storage: SlotStorageView } | undefined;
function browser() {
  let store: Storage | null = null;
  try { store = globalThis.localStorage ?? null; } catch { /* access itself can be denied */ }
  if (store) {
    let entry = browsers.get(store);
    if (!entry) { const saves = new SaveSlots(store); entry = { saves, storage: saves.storage() }; browsers.set(store, entry); }
    return entry;
  }
  if (!unavailable) { const saves = new SaveSlots(null); unavailable = { saves, storage: saves.storage() }; }
  return unavailable;
}
export const browserSaveSlots = (): SaveSlots => browser().saves;
export const slotStorage: SlotStorageView = {
  getItem: key => browser().storage.getItem(key),
  setItem: (key, value) => browser().storage.setItem(key, value),
  removeItem: key => browser().storage.removeItem(key),
};

/** What deleting needs of the page's resumable nights (app/nightSave.ts): `stop` its autosave (awaiting a write in flight) before its
 *  own slot goes, `resume` it if that fails, and `clear` a slot's nights (null: every one). */
export interface DeleteNights { stop(): Promise<void>; resume(): void; clear(id: string | null): Promise<void> }
/** (Ed, 2026-11-02: hold to delete; Reset everything) A save, or with null every save, deleted. Deleting the page's own slot (`current`)
 *  saves nothing more of it and reloads, as switchSave does, into the slot delete chose; another slot's goes without a reload. */
export async function deleteSave(saves: SaveSlots, id: string | null, current: string, nights: DeleteNights, reload: () => void): Promise<string | null> {
  if (saves.visiting) return "Finish visiting your friend before deleting saves.";
  const leaving = id === null || id === current;
  if (leaving) await nights.stop();
  if (!(id === null ? saves.resetAll() : saves.delete(id))) {
    if (leaving) nights.resume();
    return "The browser could not delete this save. Please keep this page open and try again.";
  }
  // (best effort: a deleted slot's id is never reused, so a night left behind is never read)
  try { await nights.clear(id); } catch (e) { logCaughtError(e, "[saves] clear deleted night"); }
  if (leaving) reload();
  return null;
}

/** All exit paths use this ordering; a refused night write or selection must keep the page open. */
export async function switchSave(saves: SaveSlots, flush: () => Promise<boolean>, reload: () => void, id: string | null): Promise<string | null> {
  if (saves.visiting) return "Finish visiting your friend before switching saves.";
  if (!await flush()) return "Your night could not be saved. Please keep this page open and try again.";
  const selected = id ?? saves.create().id;
  if (!saves.select(selected)) return "The browser could not remember this save choice. Please keep this page open and try again.";
  reload(); return null;
}
