/** Console tools must not bypass the host's ordered session path or act on a borrowed return-in-progress. */
export function soloDiagnostic<T>(online: boolean, borrowed: boolean, action: () => T): T {
  if (online || borrowed) throw new Error("This debug action is unavailable during a call.");
  return action();
}
