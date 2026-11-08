# music-style config history and detailed field notes

Moved from `config/music-style.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## circle

A sleeping legend's clearing, heard on the ground (Ed, 2026-10-06): the music muffled under it (and, as the world slows there, slowed with it), and the legend's own layer over it in the same key and chords, on its own clock at full speed (it starts in step with the music): slow and spacious, four-bar phrases of long notes. every: parts every legend's circle has; families: each voice family's parts (config/creature-voices.json), a part's p one pattern or several (a species takes one by its name), level its share.

## form

The melodies' form (Ed, 2026-10-09: "Melodies should be 8 bars long, with a 32 bar ABAC structure, and include rests. The B and C melodies should be (simulated) female voice, with the A a random instrument from (pluck, lead, chip, voice, bell or horn)."): a section's melodic parts say where the melody plays and how loud, and the form's line plays: A on one instrument the seed picks, B and C sung (the soprano), A coming back the same. Its chords (A's progression; B's ending on the question; C's opening as A's, then the question and the answer) are every part's. A knockdown re-seeds it all (Ed, the same day).

The sung patch since 2026-11-08 (Ed: "yes, go for it. Go ahead and swap them over"): `chimeraVoice`, Chimera's notes on every semitone G3 to G5 on "ah" and "ooh" (samples/chimera), also the set's and the hand-picked night's voice; the old `recordedVoice` kept to A/B (tuning `music.singer`, `?singer=recorded`). docs/notes/music.md, **The Chimera singer**.

## haunted

The haunted treatment (Ed, 2026-11-08). Asked how to make the game's music closer to the vocalise demo he liked (Chimera's female voice at 58 bpm, long notes and rests in D harmonic minor with a Phrygian ♭2 in its last phrase, a ghost harmony a sixth below 180 ms late, a low D and A drone swelling over 15 to 20 s, a 5 s dark cathedral reverb), with six options and three places to apply them, he picked "B, 1-6": all six, in the quiet sections (breakdown, ether, whisper) and the legends' clearings, not the dance drops or the energetic sections. Option 5 lets the flattened second and the raised seventh into those places only, a narrow exception to "Keep it all in the dorian" (2026-10-09). Of the drums, first "Instead of the drums dropping out entirely, have a drum & bass style sometimes", then "Instead of 50% of the time, make it a drop - no drums, and then drum and bass kicks in. (Agree, not in legend areas)": each haunted section quiet, then a drum & bass drop on a 4-bar line; a clearing without drums. Its knobs: `verb` (time, decay, low, high, wet), `rhythms`, `drop` (afterBars, riserBars, impact, cutoff, parts), `ghost` (interval, delay, gain, lowpass, pan, vowel), `drone` (gain, octave, fifth, octaveUp, detune, swell, swellDepth, attack, circle), `colour`, `colourElse`, `voice` (lift, presence), `circle` (wet, ghost), and `on`. docs/notes/music.md, **Haunted**.

## compose

The composer's rules (Ed, 2026-11-08). Asked for better melodies and basslines, and offered ways to get them, Ed chose "smarter rules": keep generating the music live from the seed, but compose more like a person. Found before it: the melody a seeded random walk snapping to a chord tone on the strong beats, the sung line in a five-step window moving by steps and thirds, no planned contour, climax or developing motif, so it wandered; each bass part one bar of root, fifth and octave repeated every bar, with no approach into chord changes, no variation over a phrase and nothing to do with the kick. `contours` (weights: arch 3, rise 2, fall 1, wave 2), `peak` (the share of the phrase its one highest note falls in, 0.6 to 0.75), `sevenths` (the seventh a chord tone for the melody: a narrow sung line over a two-bar chord in long notes has two tones to move between rather than one), `leap` (0.2, an instrument's motif's chance of a fourth or now and then a sixth; the singer leaps only into her peak), and `bass`: `approach` (0.6, the chance of stepping into a new chord) and each bass part's rules (`insert`, `fill` and `fillChance`, `ghost`, `octave`, `restrike`; a part not listed plays its pattern as before). `on: false` (tuning `music.melody` "old", `?melody=old`) plays the old rules, kept to A/B. docs/notes/music.md **The composer**.

`melody` and `dance` (Ed, 2026-11-08, on hearing the first: "more lyrical but not very dancey"; inspiration from trance anthem melodies, abstract hip-hop, witch house and Grimes, their traits only): `melody` "dance" (the default) or "lyrical"; `dance.riffs` the riff kinds by night family, by section and by default (trance, pedal, poly, chop, ostinato: docs/notes/music.md **The dance way**), `hook` (0.45, a wave's chance the singer sings a short high hook), `late` (0.2 of a sixteenth, the chopped riff's lay-back), `octaveUp` (0.5, a trance or pedal riff's second half up), `ostinato` (0.5, a clearing's chance of the witch-house ostinato), and `bass` by family (`follow` and `glide` for the hip-hop families, `insert` and `approach` for the 808 families).

## voiceFx

The voice line's ethereal effects (Ed, 2026-10-11: "e Recorded + ethereal will do for now ... a bit quieter than in the sample"; then, hearing it, "make it quieter and have even more reverb"; platform/audio/voiceFx.ts): the A/B's preset with more hall, shimmer and freeze, each a level 0 to 1, on the sung part. Since Ed's singer review (2026-10-14, docs/backlog/music.md "The singer, and the music round it"): this is the pure chain, for breakdowns and builds: no chorus, no octave double, no shimmer (they smeared each note's tuning by up to a third of a semitone), a bigger hall instead; `voiceFxDark` plays in the dark families.

## voiceFxDark

The processed chain (Ed, 2026-10-14: "two chains by place"), on the sung part while the night's family is one of `families` (the dark ones): grit, the whisper vocoder, long frozen tails, the echoes; aimed at Holy Other and Salem. Its pitched-down, chopped take comes with the A/B.

## set

A night's set (Ed, 2026-10-11: "Each night should be a full set, starting quite gently and building to a climax, with build-ups and breakdowns within it"; rules/musicSet.ts): its shape fitted to the island's waves over the night's time (a build, peak and breakdown cycle every cycleWaves waves, each peaking higher, the last ending in the night's climax); its palette by the absolute wave on the masterWaves curve (the families' palette windows); every wave a family other than the last's, a neighbouring key (a fifth either way, or the same), lifted lift semitones into peaks and darker (darker) in breakdowns, the tempo never the set's but the gameplay's (Ed, 2026-10-11: "tempo is set by the gameplay"), each family sounding right at any (a half-time feel where its genre wants a slower pulse); the lead, bass and voice dealt from the family's (or these) lists. curated: the first home night's hand-picked set.

## curated

The first home night (10 waves; the boot's warm-up as step 0): hand-picked as a first impression. A gentle forest start, a build through deep and organic house and garage to a first peak, a dark dub breakdown, then a bigger build to the climax on the last wave.

Since 2026-11-04: with home starting at 5 waves (PR #1810) this 10-wave set no longer fits, and Ed chose the generated set instead ("Generated is fine"; docs/backlog/music.md). It applies only to a home night of exactly 10 waves.
