// Her records (Ed, 2026-10-29: "Remove record station, instead have dj booth as a station; you open it as a station, select a
// record (each record has a bpm ...) and is an item which the player will unlock. Start with 100 and 120."; then "full set from 100 to
// 200, but only every 10 bpm, not every 5"): config/records.json. She chooses one at her DJ booth (the decks on the
// Terrace, rules/wakeUp.ts) before the party; the party starts at its bpm. Those she hasn't found are finds (rules/finds.ts).
import DATA from "../../config/records.json";

export interface Vinyl { id: string; name: string; bpm: number; start?: boolean }

/** Every record, in the booth's order (slowest first). */
export const RECORDS: readonly Vinyl[] = (DATA.records as Vinyl[]).slice().sort((a, b) => a.bpm - b.bpm);
/** The records she starts with (100 and 120). */
export const START_RECORDS: readonly string[] = RECORDS.filter(r => r.start).map(r => r.id);
/** The records found in the forest. */
export const RECORD_FINDS: readonly string[] = RECORDS.filter(r => !r.start).map(r => r.id);
export const recordById = (id: string | null | undefined): Vinyl | undefined => RECORDS.find(r => r.id === id);
