# Music and audio

2 changes proposed, 3 groups to keep.

## What these protect

- Audio scheduling avoids duplicate notes, non-finite start times and stale timelines after sailing.
- Voice caps, output meters and overload recovery keep sound within its resource limits.
- The score keeps the 32-bar ABAC form, alto range, wave transitions and chosen-night structure.
- Injected events produce one cue at the right beat, distance and game-clock phase.
- Potion sound routes fade back to dry audio and release their sources.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="m4"></a>

### M4. Generated cue rates and melody proportions

**3 tests · outcome stats · files take ~17 s.**

Examples: [Dolphins splash at least three times in a minute.](../../src/platform/audio/seaLife.cues.test.ts#L24); [The kraken groans during a ten-minute sample.](../../src/platform/audio/seaLife.cues.test.ts#L29); [Generated phrases exceed a triplet-share target.](../../src/rules/musicForm.test.ts#L172).

**Yes/no: Make these three rate/proportion tests informational? Yes moves the 60/600-second dolphin/kraken counts and 60-seed melody-pace survey to a nightly report; range, routing, note validity and explicit form rules keep blocking releases.** [Assertions, rationale and exact membership](semantic-groups.md#m4).

<a id="m5"></a>

### M5. Outdated cheer-test descriptions

**2 tests · leftovers · files take ~1 s.**

Examples: [A tempo change cheers once on the next bar.](../../src/platform/audio/tempoUp.cues.test.ts#L11); [Returning to the decks cheers once on her clock.](../../src/platform/audio/tempoUp.cues.test.ts#L25).

**Yes/no: Update these two test descriptions to the current knockdown design? Yes removes the old +1 BPM and rewind wording; the existing one-cheer/on-return timing assertions stay unchanged.** [Assertions, rationale and exact membership](semantic-groups.md#m5).


## Keep as they are

- [M1: Audio safety, scheduling and sample integrity](semantic-groups.md#m1): 41 tests; files take ~2 s.
- [M2: Score form and explicit musical rules](semantic-groups.md#m2): 88 tests; files take ~166 s.
- [M3: Cue boundaries, potion routing and music-tool data](semantic-groups.md#m3): 37 tests; files take ~14 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="m1"></a>

### M1. Audio safety, scheduling and sample integrity

**41 tests · hard limits · files take ~2 s.**

Examples: [Hitches never schedule a note twice.](../../src/platform/audio/musicEngine.test.ts#L51); [A louder effect can replace a quieter voice at the cap.](../../src/platform/audio/sfxBudget.test.ts#L35); [A stale rendered bar never starts at NaN.](../../src/platform/audio/musicAhead.test.ts#L5).

[Assertions, rationale and exact membership](semantic-groups.md#m1).

<a id="m2"></a>

### M2. Score form and explicit musical rules

**88 tests · current rules · files take ~166 s.**

Examples: [A 32-bar tune returns to its first phrase.](../../src/rules/musicForm.test.ts#L21); [The singer stays within the approved alto range.](../../src/rules/musicForm.test.ts#L238); [Each wave changes at least two musical features.](../../src/rules/musicSet.test.ts#L24).

[Assertions, rationale and exact membership](semantic-groups.md#m2).

<a id="m3"></a>

### M3. Cue boundaries, potion routing and music-tool data

**37 tests · current rules · files take ~14 s.**

Examples: [A clearing event sounds once on the next half-beat.](../../src/platform/audio/cleared.cues.test.ts#L11); [Stopping a potion restores dry sound.](../../src/platform/audio/potionFilter.test.ts#L24); [Copied Music Lab settings round-trip exactly.](../../src/musicLabSettings.test.ts#L14).

[Assertions, rationale and exact membership](semantic-groups.md#m3).

</details>

**M-KEEP — Yes/no: Keep M1, M2, M3 as they are?** They protect audio resource limits and deterministic scheduling, the approved score structure, and explicit event-to-sound routing.

[Review scope and provenance](semantic-groups.md#music-audio-review-provenance). [Old/current rulings](semantic-groups.md#music-audio-ruling-review). No change happens before Ed rules.

## Review coverage

0 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).
