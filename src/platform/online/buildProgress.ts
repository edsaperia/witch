import type { Steps } from "../../render/slices";

/** Count completed generator work, including unnamed atlas chunks, never waiting timer ticks. */
export function* buildProgress<T>(steps: Steps<T>, advance: () => void): Steps<T> {
  for (;;) {
    const result = steps.next();
    advance();
    if (result.done) return result.value;
    yield result.value;
  }
}
