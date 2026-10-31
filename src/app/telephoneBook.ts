/** Telephone identity belongs to this browser, not to the active solo save slot (Ed, 2026-10-24). */
export const telephoneNumber = (value: unknown): value is string => typeof value === "string" && /^[1-9][0-9]{6}$/.test(value);
export interface TelephoneStorage { getItem(key: string): string | null; setItem(key: string, value: string): void }
const KEY = "witch.telephone.v1";
export function telephoneBook(storage: TelephoneStorage | null, random: () => number) {
  let own = "", recent: string[] = [], saved = true;
  try {
    const value = JSON.parse(storage?.getItem(KEY) ?? "null") as { number?: unknown; recent?: unknown } | null;
    if (telephoneNumber(value?.number)) own = value.number;
    if (Array.isArray(value?.recent)) recent = [...new Set(value.recent.filter(telephoneNumber))].slice(0, 24);
  } catch { /* A broken telephone record must never touch a solo save. */ }
  if (!own) {
    const sample = random();
    if (!Number.isSafeInteger(sample) || sample < 0) throw new Error("Invalid telephone randomness");
    own = String(1000000 + sample % 9000000);
  }
  recent = recent.filter(number => number !== own);
  const persist = () => {
    try { if (!storage) throw new Error("Telephone storage unavailable"); storage.setItem(KEY, JSON.stringify({ number: own, recent })); saved = true; }
    catch { saved = false; }
  };
  persist();
  return {
    number: own,
    get saved() { return saved; },
    get recent(): readonly string[] { return [...recent]; },
    remember(number: string) {
      if (!telephoneNumber(number) || number === own) return;
      recent = [number, ...recent.filter(n => n !== number)].slice(0, 24); persist();
    },
  };
}
