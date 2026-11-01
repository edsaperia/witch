import type { TelephoneState } from "../ui/telephone";
import type { Sfx } from "../platform/audio/sfx";
/** Frame-driven cadence only while actually at a live telephone. Solo/default boot makes no sound. */
export function telephoneCues(sfx: () => Pick<Sfx, "telephone" | "letter"> | null) {
  let status: TelephoneState["status"] = "preparing", next = Infinity, replyAt = Infinity, connected = false;
  return {
    digit(value: string) { sfx()?.telephone("digit", value); },
    update(state: Readonly<TelephoneState>, audible: boolean, now: number): void {
      if (!audible || state.status === "preparing") { status = state.status; next = Infinity; return; }
      if (state.status !== status) {
        if (state.status === "connected") { sfx()?.letter(-.3); replyAt = now + 350; connected = true; }
        else if (state.status === "ended" && connected) { sfx()?.telephone("dead"); connected = false; replyAt = Infinity; }
        status = state.status; next = now;
      }
      if (status === "connected" && now >= replyAt) { sfx()?.letter(.3); replyAt = Infinity; }
      const cue = status === "available" ? "dial" : status === "ringing" || status === "dialling" ? "ring" : status === "busy" ? "busy" : status === "unavailable" ? "unavailable" : null;
      if (cue && now >= next) { sfx()?.telephone(cue); next = now + (cue === "ring" ? 3000 : cue === "dial" ? 750 : 1500); }
    },
  };
}
