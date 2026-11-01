export interface ChartDepartureOptions {
  role(): "host" | "guest" | null;
  borrowed(): boolean;
  endCall(): void;
  returnOwn(): Promise<void>;
}
/** Shared by flight preparation and final handoff: no settlement/reload until the visitor's own night is restored. */
export function chartDeparture(options: ChartDepartureOptions) {
  let returning: Promise<void> | null = null;
  return {
    before(): Promise<void> | null {
      if (returning) return returning;
      const role = options.role(), borrowed = options.borrowed();
      if (role === "host") { options.endCall(); return null; }
      if (role !== "guest" && !borrowed) return null; // Original solo path stays synchronous.
      options.endCall();
      returning = Promise.resolve().then(() => options.returnOwn()).then(() => {
        if (options.borrowed()) throw new Error("Return to your own night before sailing.");
      }).finally(() => { returning = null; });
      return returning;
    },
  };
}
