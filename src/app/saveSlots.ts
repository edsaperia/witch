// Ed, 2026-10-30: save slots hold progress and settings and reopen the previous slot.
// Keep records independent: a corrupt slot cannot make the index or another slot unreadable.
export interface SlotStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem?(key: string): void }
export interface SlotStorageView extends SlotStorage { removeItem(key: string): void }
export interface SaveSlot { id: string; name: string; created: number; updated: number }
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
  constructor(private store: SlotStorage | null, private failed: (key: string, error: unknown) => void = (key, error) => console.warn(`[saves] ${key}`, error), private now: () => number = Date.now) {}
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
  private remove(key: string): void {
    this.pending.set(key, null);
    try {
      if (!this.store?.removeItem) throw new Error("Storage unavailable; forgetting on this page only.");
      this.store.removeItem(key); this.pending.delete(key);
    } catch (e) { this.failure(key, e); }
  }
  private load(): SlotIndex {
    if (this.index) return this.index;
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
    } catch (e) { this.failure(SLOT_INDEX, e); }
    const at = this.now();
    const index: SlotIndex = { version: 1, active: "s1", slots: [{ id: "s1", name: "Save 1", created: at, updated: at }] };
    // Do not publish a migration marker until all copies succeeded. Originals remain untouched.
    let copied = true;
    for (const key of SLOT_KEYS) {
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
    if (slot) { slot.updated = this.now(); this.persist(); }
  }
  private persist(): boolean {
    const index = this.load();
    // An incomplete legacy copy must never be hidden by a later create/select operation.
    if (!this.migrationReady) return false;
    return this.write(SLOT_INDEX, JSON.stringify(index));
  }
  create(): SaveSlot {
    const index = this.load(), number = Math.max(...index.slots.map(s => Number(s.id.slice(1)))) + 1, at = this.now();
    const slot = { id: `s${number}`, name: `Save ${number}`, created: at, updated: at };
    index.slots.push(slot); this.persist(); return { ...slot };
  }
  /** Persist selection before a reload. A blocked write must not reload back into the old slot. */
  select(id: string): boolean {
    const index = this.load();
    if (!index.slots.some(s => s.id === id)) return false;
    const old = index.active; index.active = id;
    if (this.persist()) return true;
    index.active = old; this.persist(); return false;
  }
  storage(id = this.active()): SlotStorageView {
    if (!this.load().slots.some(s => s.id === id)) throw new Error("Unknown save slot");
    return {
      getItem: key => this.read(scoped.has(key) ? slotKey(id, key) : key),
      setItem: (key, value) => { this.write(scoped.has(key) ? slotKey(id, key) : key, value); },
      removeItem: key => { this.remove(scoped.has(key) ? slotKey(id, key) : key); },
    };
  }
  /** IDB retains the legacy path for slot 1: lossless without duplicating a large night. */
  nightKey(path: string, id = this.active()): string { return id === "s1" ? path : `${path}#save=${id}`; }
}
