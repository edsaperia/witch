# Two unexpected page ends during Ed's playtest, 31 Oct 18:22–18:23 UTC (URGENT)

Ed's log: `docs/evidence/playtest-1031/witch-playtest-1-2026-10-31-18-23.json`, the game's own gzip/base64 "witch-json/v1" playtest log, 8 sessions, build v6628 · 8dd9863, Intel UHD D3D11, Chrome 156 Windows. On the next start the game reported "Previous session ended unexpectedly".

## What the log shows (coordinator's read)

1. **Page 818c3bb2: 17:53:10 → 18:22:51, `closed: false`.** Night seed 241546, game time stuck at t = 24.4 (`fromStep == toStep` = 3982 for ~6,700 recorded frames), so it was paused most of the 30 minutes. That's the pause panel in Ed's 18:25 screenshot. Journal `bytes: 7,382,624`. The page ended with no pagehide, no error and no context-loss entry, mid-stream of `recording:event` debug entries.
2. **Page b4a38d63: 18:22:52 → 18:23:30, `closed: false`.** Reopened the same night at t = 24.4.
   - At 18:23:20: "Slow frames: 6; worst gap **19,533 ms**, work 55 ms" (loading).
   - At 18:23:21: a D3D shader warning X3595 (gradient instruction in a loop).
   - At 18:23:25: a 2,525 ms gap.
   - At 18:23:27: "audio watchdog: resumed".
   - It ended at 18:23:30 the same way: no pagehide, no error.
   - Journal **1,580,277 bytes after 38 s** (979 entries, nearly all `recording:event` frames at about 120 per second).
3. **Page at 18:23:31** (seed 1): `caught` error "Incompatible format or explicit link" at "save slot: saved night kept" (`src/main.ts:157`), so the night wasn't restored. Ed may have opened a link with `seed=1` (the debug link shows `?seed=1&world=…`); check whether an ordinary reload could hit this path.

**Prime suspect:** the crash-safe journal and the input recording. `src/platform/inputRecording.ts:111-114` writes one `recording:event` journal entry per frame, **even while paused** (no game step), and the journal is persisted for crash-safety. 7.4 MB in one page and about 40 KB/s growth suggest storage writes big enough to stall the main thread (the 19.5 s gap) and run memory or storage out, killing the renderer. That's unproven; prove or rule it out.

## Do
1. Reproduce on a build like v6628: pause for 10+ minutes with recording on, then reload. Measure journal bytes, persist time per write, the JS heap and storage quota over time. Also try a reload straight after a long pause, which matches the second page's 19.5 s gap.
2. Fix the root cause. For example:
   - record nothing (or one coalesced "paused for N frames" entry) while no game step happens;
   - keep the persisted journal bounded (a byte cap with oldest-first eviction of debug entries; never errors or warnings);
   - persist debug frames off the hot path or not at all, keeping the recording in memory with a bounded flush.

   Keep crash-safety for warnings and errors, which is why the journal exists (A6, #1493/#1505).
3. Check the restore path: an ordinary reload of the same build must restore the saved night. If "explicit link" was the cause, the notice must say so plainly, and the saved night must stay one click away.
4. Tests: a long pause doesn't grow the persisted journal beyond the cap; a reload restores; nothing is dropped from error/warning records.
5. Laptop proof: a bounded headless run (≤ 270 s) pausing and reloading, with a fresh slot from the coordinator. Cloud first if it reproduces there.

Owns: `src/platform/inputRecording.ts`, the journal/playtest-log persistence (`src/platform/playtestLog.ts` and its journal store), the restore path's notice. Priority: **above everything else in this inbox.**
