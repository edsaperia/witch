import { samePublicKey, validPublicKey, type TelephonePublicKey } from "../platform/online/telephoneIdentity";
/** Public address book only. Private signing keys live exclusively in IndexedDB. */
export const telephoneNumber = (value: unknown): value is string => typeof value === "string" && /^[1-9][0-9]{6}$/.test(value);
export interface TelephoneStorage { getItem(key: string): string | null; setItem(key: string, value: string): void }
const KEY = "witch.telephone.v1";
export function telephoneBook(storage: TelephoneStorage | null) {
  let own = "", recent: string[] = [], saved = true;
  const contacts = new Map<string, TelephonePublicKey>();
  try {
    const value = JSON.parse(storage?.getItem(KEY) ?? "null") as { number?: unknown; recent?: unknown; contacts?: unknown } | null;
    if (telephoneNumber(value?.number)) own = value.number;
    if (Array.isArray(value?.recent)) recent = [...new Set(value.recent.filter(telephoneNumber))].slice(0, 24);
    if (Array.isArray(value?.contacts)) for (const contact of value.contacts.slice(0, 24)) {
      if (telephoneNumber(contact?.number) && validPublicKey(contact.publicKey)) contacts.set(contact.number, { ...contact.publicKey });
    }
  } catch { /* A broken telephone record must never touch a solo save. */ }
  recent = recent.filter(number => number !== own);
  const persist = () => {
    try {
      if (!storage) throw new Error("Telephone storage unavailable");
      storage.setItem(KEY, JSON.stringify({ number: own, recent, contacts: recent.filter(number => contacts.has(number)).map(number => ({ number, publicKey: contacts.get(number) })) })); saved = true;
    } catch { saved = false; }
  };
  return {
    get number() { return own; }, get saved() { return saved; }, get recent(): readonly string[] { return [...recent]; },
    assigned(number: string) { if (!telephoneNumber(number)) throw new Error("Invalid assigned number"); own = number; recent = recent.filter(n => n !== own); persist(); },
    pinned(number: string): TelephonePublicKey | null { const key = contacts.get(number); return key ? { ...key } : null; },
    /** Only after signature verification, both players' consent and call-connected. Never overwrite a saved friend. */
    remember(number: string, publicKey: TelephonePublicKey) {
      if (!telephoneNumber(number) || number === own || !validPublicKey(publicKey)) return;
      const old = contacts.get(number); if (old && !samePublicKey(old, publicKey)) throw new Error("That isn't the friend saved under this number.");
      contacts.set(number, { ...publicKey }); recent = [number, ...recent.filter(n => n !== number)].slice(0, 24);
      for (const key of contacts.keys()) if (!recent.includes(key)) contacts.delete(key);
      persist();
    },
  };
}
