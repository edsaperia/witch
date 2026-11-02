/** Counts observed renderer program objects only; never queries/compiles a GL program. */
export function renderProgramCounts(read: () => readonly object[] | null | undefined, parallelShaderCompileAvailable: boolean) {
  const seen = new WeakSet<object>();
  const sample = () => {
    const programs = read() ?? []; let newlyObserved = 0;
    for (const program of programs) if (!seen.has(program)) { seen.add(program); newlyObserved++; }
    return { count: programs.length, newlyObserved };
  };
  sample(); // Existing programs are the baseline, not creations during the first measured frame.
  return {
    begin() { const s = sample(); return { before: s.count, newBeforeFrame: s.newlyObserved }; },
    end(before: { before: number; newBeforeFrame: number }) {
      const s = sample(); return { ...before, after: s.count, newObservedDuringFrame: s.newlyObserved, parallelShaderCompileAvailable };
    },
  };
}
