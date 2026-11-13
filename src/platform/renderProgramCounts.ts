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

/** Every frame's GPU set-up work, for the stall log (Ed, 2026-11-12: "Just had a very long freeze when taking off from the treehouse
 *  after a sail": 5.4 s of one frame's draw, the cause not in the log): the shader programs three made in the frame (each a
 *  compile and link on the main thread when it's first drawn) and the textures it allocated (each an upload on first use), read
 *  from renderer.info. Reads counts only; no GL call. */
export function frameGpuCounts(programs: () => readonly object[] | null | undefined, textures: () => number) {
  const counts = renderProgramCounts(programs, false);
  return {
    begin() { return { programs: counts.begin(), textures: textures() }; },
    end(before: { programs: { before: number; newBeforeFrame: number }; textures: number }) {
      return { programs: counts.end(before.programs).newObservedDuringFrame, textures: Math.max(0, textures() - before.textures) };
    },
  };
}
