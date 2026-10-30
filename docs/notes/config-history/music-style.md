# music-style config history and detailed field notes

Moved from `config/music-style.json` on 2026-10-29 for #1459. Original notes below are preserved verbatim, including quotes and dates. They record the design when written; the config and rules remain the source of current behaviour.

## circle

A sleeping legend's clearing, heard on the ground (Ed, 2026-10-06): the music muffled under it (and, as the world slows there, slowed with it), and the legend's own layer over it in the same key and chords, on its own clock at full speed (it starts in step with the music): slow and spacious, four-bar phrases of long notes. every: parts every legend's circle has; families: each voice family's parts (config/creature-voices.json), a part's p one pattern or several (a species takes one by its name), level its share.

## form

The melodies' form (Ed, 2026-10-09: "Melodies should be 8 bars long, with a 32 bar ABAC structure, and include rests. The B and C melodies should be (simulated) female voice, with the A a random instrument from (pluck, lead, chip, voice, bell or horn)."): a section's melodic parts say where the melody plays and how loud, and the form's line plays: A on one instrument the seed picks, B and C sung (the soprano), A coming back the same. Its chords (A's progression; B's ending on the question; C's opening as A's, then the question and the answer) are every part's. A knockdown re-seeds it all (Ed, the same day).

## voiceFx

The voice line's ethereal effects (Ed, 2026-10-11: "e Recorded + ethereal will do for now ... a bit quieter than in the sample"; then, hearing it, "make it quieter and have even more reverb"; platform/audio/voiceFx.ts): the A/B's preset with more hall, shimmer and freeze, each a level 0 to 1, on the sung part. Since Ed's singer review (2026-10-14, docs/backlog/music.md "The singer, and the music round it"): this is the pure chain, for breakdowns and builds: no chorus, no octave double, no shimmer (they smeared each note's tuning by up to a third of a semitone), a bigger hall instead; `voiceFxDark` plays in the dark families.

## voiceFxDark

The processed chain (Ed, 2026-10-14: "two chains by place"), on the sung part while the night's family is one of `families` (the dark ones): grit, the whisper vocoder, long frozen tails, the echoes; aimed at Holy Other and Salem. Its pitched-down, chopped take comes with the A/B.

## set

A night's set (Ed, 2026-10-11: "Each night should be a full set, starting quite gently and building to a climax, with build-ups and breakdowns within it"; rules/musicSet.ts): its shape fitted to the island's waves over the night's time (a build, peak and breakdown cycle every cycleWaves waves, each peaking higher, the last ending in the night's climax); its palette by the absolute wave on the masterWaves curve (the families' palette windows); every wave a family other than the last's, a neighbouring key (a fifth either way, or the same), lifted lift semitones into peaks and darker (darker) in breakdowns, the tempo never the set's but the gameplay's (Ed, 2026-10-11: "tempo is set by the gameplay"), each family sounding right at any (a half-time feel where its genre wants a slower pulse); the lead, bass and voice dealt from the family's (or these) lists. curated: the first home night's hand-picked set.

## curated

The first home night (10 waves; the boot's warm-up as step 0): hand-picked as a first impression. A gentle forest start, a build through deep and organic house and garage to a first peak, a dark dub breakdown, then a bigger build to the climax on the last wave.
