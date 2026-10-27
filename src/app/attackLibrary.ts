// The Fight Arena's library of attacks (Ed, 2026-10-27: "tweak and save/copy attack settings that are fun"): each one named, with
// the pack and seed it was found with and a ⭐, kept in this browser (localStorage, every touch of it in try/catch: a private window
// or blocked storage keeps it for this page only), favourites first, then the newest. Copied out and pasted in as JSON (one attack,
// or a whole library), so Ed can send the good ones on.

export interface Saved {
  name: string;
  /** The attack (the composable attacks' JSON, rules/attacks; or null: the pack's own, today's). */
  attack: unknown;
  /** The fight it was found in: the pack's seed and spec. */
  seed?: number; pack?: string;
  fav?: boolean;
  /** When it was saved (ms since 1970). */
  at: number;
}

type Store = Pick<Storage, "getItem" | "setItem">;

export const LIBRARY_KEY = "witch.fightArena.library";

/** This browser's storage, or null where there's none to have. */
export function browserStore(): Store | null {
  try { return typeof localStorage === "undefined" ? null : localStorage; } catch { return null; }
}

const isSaved = (x: unknown): x is Saved => !!x && typeof x === "object" && typeof (x as Saved).name === "string" && (x as Saved).name.trim() !== "" && "attack" in (x as object);

export class AttackLibrary {
  private items: Saved[];

  constructor(private readonly store: Store | null = browserStore(), private readonly key = LIBRARY_KEY) {
    this.items = this.read();
  }

  private read(): Saved[] {
    try {
      const raw = this.store?.getItem(this.key);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list.filter(isSaved).map(s => ({ ...s, at: Number(s.at) || 0 })) : [];
    } catch { return []; }
  }

  private write(): void {
    try { this.store?.setItem(this.key, JSON.stringify(this.items)); } catch { /* (kept for this page only) */ }
  }

  /** Favourites first, then the newest. */
  list(): Saved[] {
    return [...this.items].sort((a, b) => Number(!!b.fav) - Number(!!a.fav) || b.at - a.at);
  }

  get(name: string): Saved | undefined { return this.items.find(s => s.name === name); }

  /** Saved under its name (replacing one of that name, keeping its ⭐ unless it says otherwise). */
  save(s: Omit<Saved, "at"> & { at?: number }): Saved {
    const name = s.name.trim(), was = this.get(name);
    const item: Saved = { ...s, name, fav: s.fav ?? was?.fav ?? false, at: s.at ?? Date.now() };
    this.items = [...this.items.filter(x => x.name !== name), item];
    this.write();
    return item;
  }

  remove(name: string): void { this.items = this.items.filter(s => s.name !== name); this.write(); }

  /** ⭐ on or off; its new state. */
  toggleFav(name: string): boolean {
    const s = this.get(name);
    if (!s) return false;
    s.fav = !s.fav; this.write();
    return s.fav;
  }

  /** A name not yet taken, from `base` ("attack 3"). */
  freeName(base = "attack"): string {
    for (let i = 1; ; i++) { const n = `${base} ${i}`; if (!this.get(n)) return n; }
  }

  /** JSON to copy: one saved attack, or the whole library. */
  exportJson(name?: string): string {
    return JSON.stringify(name ? this.get(name) ?? null : this.list(), null, 1);
  }

  /** Pasted JSON taken in: a saved attack, a list of them (a library), or a bare attack (named afresh). Returns the names taken in,
   *  or throws with what's wrong. */
  importJson(text: string, fight?: { seed?: number; pack?: string }): string[] {
    const v = JSON.parse(text);
    const list: unknown[] = Array.isArray(v) ? v : [v];
    const names: string[] = [];
    for (const x of list) {
      if (isSaved(x)) names.push(this.save(x).name);
      else if (x && typeof x === "object") names.push(this.save({ name: this.freeName("pasted"), attack: x, ...fight }).name);
      else throw new Error("not an attack (an object) or a list of them");
    }
    return names;
  }
}
