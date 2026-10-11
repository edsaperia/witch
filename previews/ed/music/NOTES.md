# Music: A/B renders, one ingredient at a time (music builder, 2026-10-11)

Ed's music research (docs/music/research.md, from docs/backlog/music.md). All the renders are the same passage: the game's music at wave 2 (Lanterns), seed 7, 120 bpm, 32 bars (about 67 s). It's the form as it plays: the drop (A and B, four on the floor), deepBreaks (the second A, breakbeats) and a breakdown (C). Each render is loudness-matched to -16 LUFS, so the louder one doesn't win. **Nothing here is in the game**; these are made by `node tools/music-lab/ab.mjs` (PR on claude/music-samples).

**Listen in order.** Each step adds one thing to the one before:

| File | Adds |
|---|---|
| `ab-0-baseline.mp3` | The music as it is today |
| `ab-1-drone.mp3` | A drone: the tonic and its fifth, low, held all the way through, a slow filter breathing (organum, hurdy-gurdy-like) |
| `ab-2-chant.mp3` | A chant: a low voice (Pink Trombone, a man's tract) on the bar's root and fifth, a syllable a beat ("ma", "na", "la"), breathing every other bar |
| `ab-3-frame-drums.mp3` | Frame drums and darbuka (VCSL, CC0): a ritual pattern over the beat, out for the breakdown |
| `ab-4-tape.mp3` | Tape: wow and flutter on the whole mix, the top rolled off, crackle and hiss |
| `ab-5-cc0-kit.mp3` | The CC0 kit in place of the synthesised drums: hats, claps, snare, shaker, rim and claves from VCSL; the kicks stay synthesised |
| `ab-6-vocalise.mp3` | The vocalise: B and C sung by Pink Trombone with a soprano's tract, vowels gliding note to note, vibrato creeping in |
| `ab-bonus-witch-house.mp3` | A witch-house take: Phrygian, half-time drums (kick on 1, snare and clap on 3, trap hats with rolls, an 808-ish sub), the chant pitched down, a huge reverb, tape, the vocalise |

**Also:**
- `voice-vocalise.mp3`: the soprano alone.
- `voice-chant.mp3`: the chant alone.
- `kit-samples.mp3`: the kit's 19 samples one after another, in alphabetical order: bass drum, two claps, claves, darbuka (doum, tek), frame drum (small open, large open, large muted), hi-hats (closed, closed soft, open), slit drum (high, low), rim, shaker (down, up), snare, tambourine.

**Caveats (the builder can't hear):**
- Each ingredient's level is a first guess.
- Pink Trombone is a speech model pushed to sing. Its soprano is the novelty here, and the thing to judge most.
- Freesound was still blocked from the builder's environment, so there are no recorded voices yet.

**What to tell the builder:** which steps to keep, which to drop, and any that are too loud or too quiet. Also say whether the witch-house take is a direction (for legend circles or a "dark" record).
