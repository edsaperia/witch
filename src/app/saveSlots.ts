// Ed, 2026-10-30: save slots hold progress and settings and reopen the previous slot.
// Keep records independent: a corrupt slot cannot make the index or another slot unreadable.
import { logCaughtError } from "../platform/caughtError";
export interface SlotStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem?(key: string): void }
export interface SlotStorageView extends SlotStorage { removeItem(key: string): void }
export interface SaveSlot { id: string; name: string; created: number; updated: number; island?: string; nights?: number }
export interface SavesHost { list(): SaveSlot[]; active(): string; choose(id: string | null): Promise<string | null> }
interface SlotIndex { version: 1; active: string; slots: SaveSlot[] }
export const SLOT_INDEX = "witch.saves.v1";
export const SLOT_KEYS = ["witch.genome", "witch.owned", "witch.broom", "witch.loadout", "witch.hats", "witch.records", "witch.chart", "witch.guide", "witch.arrive", "witch.player", "witch.settings", "witch.shake", "witch.bindings", "witch.autotalk", "witch.woken", "witch.mirrored", "witch.creator.box", "witch.pauseOpen", "witch.debug.unlockAll"] as const;
const scoped = new Set<string>(SLOT_KEYS);
export const slotKey = (id: string, key: string): string => `witch.save.${id}.${key}`;
const validId = (v: unknown): v is string => typeof v === "string" && /^s[1-9][0-9]*$/.test(v);

export class SaveSlots {
  private index: SlotIndex | null = null;
  private pending = new Map<string, string | null>();
  private warned = new Set<string>();
  private migrationReady = true;
  private readFailures = 0;
  private dirty = new Set<string>();
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
  list(): SaveSlot[] { return this.load().slots.map(s => ({ ...s })); }
  touch(id = this.active()): void {
    const slot = this.load().slots.find(s => s.id === id);
    if (slot) { slot.updated = this.now(); this.dirty.add(id); this.persist(); }
  }
  summary(island: string, nightEnded = false, id = this.active()): void {
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
  create(): SaveSlot {
    const index = this.load(); this.mergeIndex();
    const number = index.slots.length + 1, at = this.now();
    // Opaque IDs avoid two open tabs allocating the same next integer.
    const slot = { id: "s1" + Array.from(crypto.getRandomValues(new Uint32Array(2)), n => n.toString().padStart(10, "0")).join(""), name: `Save ${number}`, created: at, updated: at };
    index.slots.push(slot); this.dirty.add(slot.id); this.persist(); return { ...slot };
  }
  /** Persist selection before a reload. A blocked write must not reload back into the old slot. */
  select(id: string): boolean {
    const index = this.load();
    if (!index.slots.some(s => s.id === id)) return false;
    // Refuse a reload while any outgoing data exists only in memory.
    for (const [key, value] of [...this.pending]) { if (value === null) this.remove(key); else this.write(key, value); }
    if (this.pending.size) return false;
    const old = index.active; index.active = id;
    if (this.persist(true)) return true;
    index.active = old; this.persist(); return false;
  }
  storage(id = this.active()): SlotStorageView {
    if (!this.load().slots.some(s => s.id === id)) throw new Error("Unknown save slot");
    return {
      getItem: key => this.read(scoped.has(key) ? slotKey(id, key) : key),
      setItem: (key, value) => { if (!this.write(scoped.has(key) ? slotKey(id, key) : key, value)) throw new Error(`Browser storage refused ${key}`); },
      removeItem: key => { if (!this.remove(scoped.has(key) ? slotKey(id, key) : key)) throw new Error(`Browser storage refused ${key}`); },
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

/** All exit paths use this ordering; a refused night write or selection must keep the page open. */
export async function switchSave(saves: SaveSlots, flush: () => Promise<boolean>, reload: () => void, id: string | null): Promise<string | null> {
  if (!await flush()) return "Your night could not be saved. Please keep this page open and try again.";
  const selected = id ?? saves.create().id;
  if (!saves.select(selected)) return "The browser could not remember this save choice. Please keep this page open and try again.";
  reload(); return null;
}
