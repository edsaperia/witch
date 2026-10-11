# Music: A/B renders, one ingredient at a time (music builder, 2026-10-11; round 2)

Ed's music research (docs/music/research.md, from docs/backlog/music.md). All the renders are the same passage: the game's music at wave 2 (Lanterns), seed 7, 120 bpm, 32 bars (about 67 s). It's the form as it plays: the drop (A and B, four on the floor), deepBreaks (the second A, breakbeats) and a breakdown (C). The `ab-*` files are loudness-matched to -16 LUFS, so the louder one doesn't win. **Nothing here is in the game**; these are made by `node tools/music-lab/ab.mjs`.

**Round 2: Ed's notes on round 1** ("Cut the chant. I can't hear the frame drums or vocalise at all"):
- **The chant is cut**, from the ladder and from the witch-house take. The steps after it are renumbered.
- **The frame drums were buried.** Alone, they measured 11.6 dB under the music. They're now 3.2 times louder, about 2 dB under the music, so you can hear them.
- **The vocalise was in the mix**, at about the old synthesised soprano's level. It replaced that soprano, so nothing seemed to change. It's now twice as loud, with a 3 kHz presence lift. In the B and C phrases it's about 6 dB over the step before.
- **Stems:** `stem-frame-drums.mp3`, `stem-vocalise.mp3` and `stem-vocalise-recorded.mp3` are each ingredient alone, at the level it plays in the mix (not loudness-matched), to confirm it's there.
  - The frame drums play in the drop and the breakbeats, not the breakdown (the last 16 s).
  - The vocalise sings only B (16–32 s) and C (48–64 s); A is the instrument's.

**Listen in order.** Each step adds one thing to the one before:

| File | Adds |
|---|---|
| `ab-0-baseline.mp3` | The music as it is today |
| `ab-1-drone.mp3` | A drone: the tonic and its fifth, low, held all the way through, a slow filter breathing (organum, hurdy-gurdy-like) |
| `ab-2-frame-drums.mp3` | Frame drums and darbuka (VCSL, CC0): a ritual pattern over the beat, out for the breakdown |
| `ab-3-tape.mp3` | Tape: wow and flutter on the whole mix, the top rolled off, crackle and hiss |
| `ab-4-cc0-kit.mp3` | The CC0 kit in place of the synthesised drums: hats, claps, snare, shaker, rim and claves from VCSL; the kicks stay synthesised |
| `ab-5-vocalise.mp3` | The vocalise: B and C sung by Pink Trombone with a soprano's tract, vowels gliding note to note, vibrato creeping in |
| `ab-5b-vocalise-recorded.mp3` | **The alternative:** the same notes, sung by a real woman's recorded note (Freesound, CC0, the uploader's own) retuned to each note, like a sampler |
| `ab-6-recorded-voices.mp3` | Recorded voices from Freesound (CC0, each the uploader's own): a crowd's "uh" retuned to the chords as a choir with its fifth, whispers over the breakdown, throat singing (recorded in a cave) as a drone on the tonic |
| `ab-bonus-witch-house.mp3` | A witch-house take: Phrygian, half-time drums (kick on 1, snare and clap on 3, trap hats with rolls, an 808-ish sub), a huge reverb, tape, the vocalise, the recorded choir and whispers, a low kargyraa throat chant on the root |

**Also:**
- `voice-vocalise.mp3`: the Pink Trombone soprano alone, at its own level.
- `recorded-voices.mp3`: the Freesound voices as they are, one after another: the crowd's "uh", the woman's note, the female vocal chops (not used yet: their key isn't measured), the kargyraa, the cave's throat singing, the whispers.
- `kit-samples.mp3`: the kit's 19 samples one after another, in alphabetical order: bass drum, two claps, claves, darbuka (doum, tek), frame drum (small open, large open, large muted), hi-hats (closed, closed soft, open), slit drum (high, low), rim, shaker (down, up), snare, tambourine.

**Caveat:** the builder can't hear. Each ingredient's level is set by measurement against the music, not by ear.

**What to tell the builder:**
- which steps to keep or drop, and any that are still too loud or too quiet;
- Pink Trombone or the recorded voice for the vocalise (5 or 5b);
- whether the witch-house take is a direction (for legend circles, or a "dark" record).
