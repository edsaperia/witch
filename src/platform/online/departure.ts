/** Cleanup completes before a full document navigation; repeated close/click callbacks are harmless. */
export function sessionDeparture(cleanup: () => void, navigate: () => void): () => void {
  let left = false;
  return () => { if (left) return; left = true; try { cleanup(); } finally { navigate(); } };
}
