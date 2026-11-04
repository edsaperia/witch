import type { borrowedNightSaves } from "./nightSave";
import type { SaveSlots } from "./saveSlots";

/** Page-owned transition guard. Call confirm only at accepted borrowed admission, before adopting its game. */
export function visitSaves(slots: Pick<SaveSlots, "beginBorrowedVisit">, nights: ReturnType<typeof borrowedNightSaves>) {
  let phase: "solo" | "preparing" | "visiting" | "returning" = "solo", confirmed = false;
  let release: (() => void) | null = null, returning: Promise<void> | null = null;
  return {
    get phase() { return phase; },
    async prepare(): Promise<void> {
      if (phase !== "solo") throw new Error("A save visit is already active.");
      phase = "preparing"; confirmed = false;
      await nights.suspendForVisit();
    },
    async confirm(): Promise<void> {
      if (phase !== "preparing") throw new Error("Prepare own saves before accepting a visit.");
      release = slots.beginBorrowedVisit();
      phase = "visiting"; confirmed = true;
      // Failure leaves saves held. Caller must return to an own game, never silently save the borrowed one.
      await nights.confirmVisit();
    },
    /** Release transient slot writes, then adopt own game; checkpoints stay held until adoption succeeds.
     * confirmed=true means a fresh solo night; false means preparation failed before admission. */
    returnOwn(adopt: (confirmed: boolean) => Promise<void>): Promise<void> {
      if (phase === "solo") return Promise.resolve();
      if (returning) return returning;
      phase = "returning"; release?.(); release = null;
      returning = (async () => {
        try {
          await adopt(confirmed); await nights.resumeSolo(); phase = "solo"; confirmed = false;
        } finally { returning = null; }
      })();
      return returning;
    },
  };
}
