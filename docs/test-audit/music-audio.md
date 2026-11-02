# Music and audio

2 changes proposed, 3 groups to keep as they are.

Setup and assertions reviewed in the named score, cue, audio-engine and music-tool files. Telephone authority remains with #1609. No listening or browser run is claimed.

Timings are historical containing-file time, not savings. Partial-file and overlapping groups include other tests; do not add their times. Source counts are test templates, not expanded runs.

## What these protect

- Audio scheduling avoids duplicate notes, non-finite start times and stale timelines after sailing.
- Voice caps, output meters and overload recovery keep sound within its resource limits.
- The score keeps the 32-bar ABAC form, alto range, wave transitions and chosen-night structure.
- Injected events produce one cue at the right beat, distance and game-clock phase.
- Potion sound routes fade back to dry audio and release their sources.

## Proposed changes

### M4. Generated cue rates and melody proportions

**3 tests · outcome stats · ~17 s of CI.**

Examples: [Dolphins splash at least three times in a minute.](../../src/platform/audio/seaLife.cues.test.ts#L24); [The kraken groans during a ten-minute sample.](../../src/platform/audio/seaLife.cues.test.ts#L29); [Generated phrases exceed a triplet-share target.](../../src/rules/musicForm.test.ts#L172).

**Yes/no: Make these three rate/proportion tests informational? Yes moves the 60/600-second dolphin/kraken counts and 60-seed melody-pace survey to a nightly report; range, routing, note validity and explicit form rules keep blocking releases.** [Assertions, rationale and exact membership](semantic-groups.md#m4).

### M5. Outdated cheer-test descriptions

**2 tests · leftovers · ~1 s of CI.**

Examples: [A tempo change cheers once on the next bar.](../../src/platform/audio/tempoUp.cues.test.ts#L11); [Returning to the decks cheers once on her clock.](../../src/platform/audio/tempoUp.cues.test.ts#L25).

**Yes/no: Update these two test descriptions to the current knockdown design? Yes removes the old +1 BPM and rewind wording; the existing one-cheer/on-return timing assertions stay unchanged.** [Assertions, rationale and exact membership](semantic-groups.md#m5).


## Keep as they are

- [M1: Audio safety, scheduling and sample integrity](semantic-groups.md#m1): 41 tests; ~2 s of CI.
- [M2: Score form and explicit musical rules](semantic-groups.md#m2): 88 tests; ~166 s of CI.
- [M3: Cue boundaries, potion routing and music-tool data](semantic-groups.md#m3): 37 tests; ~14 s of CI.

<details>
<summary>Examples and evidence for the kept groups</summary>

### M1. Audio safety, scheduling and sample integrity

**41 tests · hard limits · ~2 s of CI.**

Examples: [Hitches never schedule a note twice.](../../src/platform/audio/musicEngine.test.ts#L51); [A louder effect can replace a quieter voice at the cap.](../../src/platform/audio/sfxBudget.test.ts#L35); [A stale rendered bar never starts at NaN.](../../src/platform/audio/musicAhead.test.ts#L5).

[Assertions, rationale and exact membership](semantic-groups.md#m1).

### M2. Score form and explicit musical rules

**88 tests · current rules · ~166 s of CI.**

Examples: [A 32-bar tune returns to its first phrase.](../../src/rules/musicForm.test.ts#L21); [The singer stays within the approved alto range.](../../src/rules/musicForm.test.ts#L238); [Each wave changes at least two musical features.](../../src/rules/musicSet.test.ts#L24).

[Assertions, rationale and exact membership](semantic-groups.md#m2).

### M3. Cue boundaries, potion routing and music-tool data

**37 tests · current rules · ~14 s of CI.**

Examples: [A clearing event sounds once on the next half-beat.](../../src/platform/audio/cleared.cues.test.ts#L11); [Stopping a potion restores dry sound.](../../src/platform/audio/potionFilter.test.ts#L24); [Copied Music Lab settings round-trip exactly.](../../src/musicLabSettings.test.ts#L14).

[Assertions, rationale and exact membership](semantic-groups.md#m3).

</details>

**Yes/no: Keep M1, M2, M3 as they are?** They protect audio resource limits and deterministic scheduling, the approved score structure, and explicit event-to-sound routing.

[Old/current ruling comparisons](semantic-groups.md#music-audio-ruling-review). No change happens before Ed rules.

## Not reviewed, no change proposed

0 additional tests remain outside the reviewed groups. The keep question above covers only named groups. [Exact remaining file/line manifest](unreviewed.md).
