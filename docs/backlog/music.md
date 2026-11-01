# Music: witchier, and a palette of genres

**Audit status (2026-11-01): Partly built: samples, alto/A-B tools, genre foundations and Music Studio exist; the complete proposed palette and record progression do not.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Witchier context-dependent music and genre palette | **Partly built** | Existing genre families/scales in config/music-style.json and musicPlan; full proposed island/biome record mapping is not implemented. #920/#921; v3739 alto baseline, full palette version absent. |
| Harmony/drone/chant and melodic proposal | **Partly built** | Alto narrow-step rules and family scales exist; complete chant/drone/ritual record design still incomplete. #920 v3739; musicScore/form rules. |
| Folk/ritual instruments, voices and environmental beds | **Partly built** | Synth/sample voices and existing ambience exist, not the full requested folk-instrument/field-recording collection. #656/#920, v3739 for alto; full collection not shipped. |
| Tape/wobble/dark voice processing foundations | **Built** | musicEngine patches, voiceFxPure/voiceFxDark and family treatment; #920 v3739. This is the implemented processing, not approval of every proposed genre. |
| Licensed sample manifest, credits, checks and size budget | **Built** | #656; samples/manifest.json, sources.json, CREDITS.md and tools/samples/check.mjs. First build version unverified. |
| Replace drums with first CC0 kit | **Partly built** | CC0 sample infrastructure exists; ordinary music still has synthesised drum patches. Full requested replacement kit not confirmed. #656, first version unverified. |
| Reference mood board and new-genre selection | **Partly built** | Research/proposals and current families exist; no completed Ed-approved first-record palette identified. The later musician session remains the decision point. |
| Alto register, narrow melody, dynamics and voice placement | **Built** | #920 v3739; form.sung, recordedVoice swell, voiceFx* and section roles in musicScore. |
| Sampled alto set | **Built** | samples/alto, manifest processing and altoSampled notes; singer A/B #921 (first version unverified). This is source implementation, not an audition result. |
| Live vocal-tract voice and A/B picker | **Built** | altoTract patch, audio tract worklet and Music Lab Vocalise controls; #921, version unverified. |
| Two voice chains, Lab sliders and copy settings | **Built** | #920/#921; pure/dark chains and Vocalise lab controls; v3739 cheap fixes, A/B first version unverified. |
| Pitch/tuning check | **Built** | tools/music-lab/tune.cjs; #920/#921, version unverified. Audit did not execute audio rendering. |
| Family-specific recorded texture shelf | **Partly built** | Existing samples/voice patches include some layers; full bounded-retune per-family choir/whisper/throat/chant shelf is not established. #656/#921; first version unverified. |
| Mode by family | **Built** | config/music-style.json families include phrygian coven and aeolian darker sections; current musicPlan reads scales. Originating PR/version unverified. |
| Dedicated drone-and-ostinato ritual/witch-house records | — | Existing drone-like patches do not prove the proposed separate record form is implemented. |
| Half-time dark families | **Partly built** | Dark/phonk patterns exist, but not the complete proposed record-family system. config/music-style.json; originating PR/version unverified. |
| First biome/record genre set | **Partly built** | Families exist; collectible records currently encode BPM only (rules/records.ts), not the proposed geographic genre palette. |
| Music Studio patch designer and MIDI player | **Built** | music-studio.html, tools/music-studio and patch controls; changelog v4087, originating PR unverified. |
| Expanded synth controls | **Built** | Music Studio oscillator/custom-wave/FM/filter/LFO controls and musicEngine patches; v4087 Studio baseline; originating PR unverified. |
| Musician melody/structure ingestion policy | — | MIDI can be played in the Studio; as-written versus generator-material policy remains unresolved, not silently implemented by MIDI support. |


Backlog (Ed, 2026-10-11). Mixed implementation status; see the audit below. Don't build unimplemented work without Ed's go.

**Open to change** (Ed): we can move away from dorian and from today's music structure (32-bar ABAC, sections) if we find better alternatives.

## Aim

- Music that feels **witchy** while staying dance music, drawing on related genres, plus more generic dance (house, techno, trance, EDM) depending on the **record, island and biome**.
- Build a **palette** of musical elements that records pick from, rather than one fixed style.

## References (for a mood board)

- **Witch house:** Salem, oOoOO, Holy Other, early Crystal Castles: slowed ("chopped and screwed") beats, pitched-down vocal chops, huge reverb, trap hi-hats.
- **Ritual / dark folk:** Heilung, Wardruna, Dead Can Dance: frame drums, throat singing, drones, chant.
- **Folk-horror scores:** *The Wicker Man* (Paul Giovanni), *The Witch* (Mark Korven, nyckelharpa), *Midsommar* (Bobby Krlic).
- **Dark electronic:** Burial, Andy Stott, Forest Swords, The Knife (*Silent Shout*), Boy Harsher.
- **The spooky canon** for motifs: *Danse Macabre*, *Night on Bald Mountain*.
- Plus mainstream references for house, techno, trance, drum & bass, dub, ambient.

## Witchy ingredients

- **Harmony:** drones and pedal notes (a low fifth, hurdy-gurdy style); bare fifths and octaves (organum); borrowed colour (a flat second on builds and in legend circles, harmonic minor's raised seventh); chant-like melodies with narrow ranges and repeated cells. The mode itself is open (above).
- **Sounds:** voices (a real vocalise, chant syllables, low drones, whispers); folk instruments (hurdy-gurdy, nyckelharpa, bowed strings, wooden flute, bells); ritual percussion (frame drums, bodhrán, claps, bones, rattles); field-recording beds (owls, crows, wind, fire, the cauldron).
- **Production:** tape wobble and wow, bit-crush, pitched-down chops, big dark reverbs (shimmer only for magic moments), sidechained "breathing" pads, low-passed darkness.

## Samples (Ed: yes, import open samples)

Today every note is synthesised live; samples are now allowed, especially for **drums** and **voices**.

- **Licences:** CC0 / public domain freely; CC-BY with credits; check "royalty-free" packs (many forbid redistributing raw sounds, and a game can count); **no non-commercial (NC) licences**, and no ripped drum-machine recordings (synthesise 808/909-style sounds instead).
- **Sources:** VCSL (Versilian Community Sample Library, CC0: percussion, folk and orchestral instruments, some voices), Freesound filtered to CC0 (one-shots, field recordings, vocal chops), Hydrogen drum kits (check each kit's licence), SFZ instruments such as Salamander (CC-BY).
- **Setup:** a `samples/` folder with a manifest giving each file's source and licence; a CI check that every sample has an approved licence; credits generated from the manifest; a size budget (a few MB of compressed audio for the web build). **Built** (#656: `samples/manifest.json`, `tools/samples/` check, credits and a 3 MB budget, run by `src/samples.test.ts`).

## A better vocalise

Superseded by the proposal below (India, 2026-10-14). Kept for the record: **Pink Trombone** (MIT) for the lead, **CC0 choir vowels** beneath it.

## The palette

A **record = a genre palette + a tempo**. Each genre picks one item per shelf:

| Shelf | Examples |
|---|---|
| Drum kit | house (909-style), techno (rumbling), D&B (breaks), witch house (slowed trap), ritual (frame drums, claps, bones) |
| Bass | sub, acid, reese, dub |
| Lead / vocal | soprano vocalise, chant, pluck, horn, bell |
| Pads / drones | choir, organ drone, hurdy-gurdy, string pad |
| Groove | swing, kick pattern, tempo range |
| Colour | tape wobble, bit-crush, reverb space, harmony colour |
| Atmosphere | owls, wind, fire, sea (by island and biome) |

Proposed mapping (records and biomes: see journey.md): home and temperate islands → house and ritual folk; north → cold ambient techno; south → dub and desert trance; east → heavy techno and drum & bass; west → jungle and tribal house; legend circles and the far, dark phases → witch house.

## Tools

- **In the game:** Tone.js; **Faust** (DSP that compiles to Web Audio and can be built for Godot, useful for the port; its physmodels and STK libraries do bowed strings and hurdy-gurdy).
- **Offline, to render sounds:** Surge XT, Vitalium (open-source Vital), ZynAddSubFX; Csound and SuperCollider for drones.

## First step: a research brief for a music builder

1. Reference listening → a one-page mood board (tempos, scales, instruments, tricks the references share).
2. Gather CC0 sources; build a first **CC0 drum kit** to replace today's synthesised drums.
3. Prototype a **Pink Trombone vocalise** for the soprano.
4. In the Music Lab (`tools/music-lab`), A/B renders adding one ingredient at a time (drone, chant syllables, frame drums, tape wobble, then the new kit and vocalise) for Ed to judge by ear.
5. Propose the palette's first genres and whether to keep dorian and the current structure.

## The singer, and the music round it: a proposal (India, 2026-10-14)

For Ed to approve. **Slice 1 built** (#920: the alto, the stepwise melody, the two chains by place, the voice out of the drops; #921: the A/B live in the Music Lab; `tools/music-lab/tune.cjs`); slices 2 and 3 not built. Two rounds of questions with Ed and a measurement of today's renders are behind it.

### What Ed said

Round 1: the singer is unpleasant because of its **timbre** and its **melody**; it **often sounds out of tune**; it is **too plain** (it could take more effects, more reverb) and it should be **gentler, breathier, with more dynamic range**. The ideal voice is **all four** at once: a real singer as texture, a real singer as lead, an openly synthetic voice, and chant and drone with no lead. Voices belong in **breakdowns and builds** and in **legend circles and the dark**, not everywhere. Scope: **rethink the music itself** where the research finds better.

Round 2: the singer moves to the **alto, an octave down**; **build two lead voices and A/B them** (a sampled voice and a vocal-tract model); the melody becomes **narrow and stepwise, long notes that swell, a returning hook each night, and sometimes just the chord**; and the effects become **two chains by place**: pure and wet in breakdowns and builds, heavily processed in legend circles and the dark waves.

### What's wrong today, measured

The game's singer is one CC0 recording of a woman's G4 (MIDI 67.2) retuned to each note by its playback rate, through the ethereal chain (chorus 0.5, shimmer 0.7, an octave double 0.3, hall 0.85, freeze 0.65). A pitch track of the A/B renders (`previews/ed/music/voices/`, claude/ed-shots; an autocorrelation tracker, notes segmented, each compared to its nearest semitone):

| Render | Range (MIDI) | Note centres off a semitone, median / p90 | Wobble within a note (cents), median / p90 |
|---|---|---|---|
| b, the recording retuned, dry | 74 to 83 (D5 to B5) | 5 / 19 cents | 8 / 15 |
| f, the game's singer (the recording through the ethereal chain) | 69 to 83 | 9 / 36 cents | 10 / 31 |
| c, the FOF voice, dry | 72 to 83 | 13 / 41 cents | 15 / 57 |
| a, Pink Trombone (the research's) | 74 to 83 | 14 / 43 cents | 24 / 37 |

Two causes, both fixable:

1. **The chipmunk.** The sung line (`form.sung.octave` 3, `range` [-1, 8]) lives between D5 and B5: 7 to 16 semitones above the one G4 recording. Speeding a recording up shifts its formants with its pitch, so every note is a small, hard copy of the singer. Dry, it is in tune; it just isn't a voice any more.
2. **The smear.** The chorus, the octave double and the shimmer's octave-up feedback each add a detuned copy. Through them the note centres wander up to a third of a semitone and wobble within the note: that is the "out of tune", and "plain" at the same time, because the smear hides the voice without making it bigger.

### The plan

Three slices, each a PR Ed can hear before the next.

**Slice 1: the singer.** Nothing else in the music changes.

- **The alto.** `form.sung.octave` 2 (A3 to about A4, the range narrowed as below), so the one recording bends at most a few semitones. The soprano returns only from real high recordings.
- **Two lead voices, A/B'd in the Music Lab, then one picked:**
  - *The sampled alto*, built offline: from the CC0 recordings (the woman's G4; the woman's three-part triad, Freesound 274121; more as found) a note every 2 semitones over the alto's range, each made with formant-preserving pitch shift (Rubber Band, offline only: it is GPL, so nothing of it ships), trimmed and encoded as the kit is (`samples/voices/alto/`, about 20 files, under 300 KB). In the game a note bends at most 1 semitone from its nearest sample, two samples cross-fading at the boundary, each note's own vibrato and breath. Cheap on the audio thread; honest.
  - *The vocal-tract model*, live: Pink Trombone's physics in an AudioWorklet. Not the ScriptProcessor library and not zakaton's worklet port (GPL-3); Paul Batchelor's `voc` (the model in C, MIT, its generated code public domain) compiled to WebAssembly, as the FOF voice was from Faust. Tuned mellow: a longer tract, low tenseness, a breathy glottis, vowels gliding over 150 ms, vibrato creeping in after half a second. A voice cap of 3 and the safety valve's sheds. More work and more CPU; never canned.
  - The A/B: the same B and C phrases, each voice alone and in the music, through each of the two chains below, loudness-matched, on claude/ed-shots. Ed picks; the other stays in the lab.
- **The melody rules** (the form's `sung` cells and range, `formPhrase`): a range of a fifth, steps and thirds only (no leap over a fourth), chord tones on the beats, whole and half notes with a breath (a rest of a beat or more) between phrases, no two phrases alike in rhythm; **a returning hook**: one 2-bar motif dealt per night (`musicSeed`), sung at the start of every B, varied (inverted, a step up, half-time) each wave; and in breakdowns **just the chord**: the voice holds the chord's root and fifth (two notes a fifth apart, the alto and a second voice an octave up at half the level) as a pad, no melody.
- **Dynamics in the note.** Every sung note swells from nothing over its first third and fades over its last third (today it is a 30 ms ramp to full), a phrase's first note softest, its longest note loudest; breath noise (filtered, shaped by the same envelope) under every note at a level that reads as a singer, not a leak.
- **Two chains by place** (the style's `voiceFx`, chosen by the plan's cue):
  - *Pure and wet*, in breakdowns and builds: one voice in tune, air, a long dark hall (4 to 6 s) with a slow pre-delay (60 to 80 ms), the reverse swells kept, ducked by the kick in builds; **no chorus, no octave double**, shimmer only on the victory and a legend turning happy.
  - *Processed*, in legend circles and the dark families (coven, phonk, the late waves): the same line pitched down an octave and slowed (the tape), chopped on eighths, a short gated room then the hall, the whisper vocoder over it, grit; the witch-house take's treatment, which Ed heard in the A/B.
- **Where the voice plays.** The sung part leaves the drops and the four-on-the-floor blocks: it sings the breakdown (C), the build into the next wave, legend circles (its own layer there already) and the dark families' sections. The A instrument keeps A; B is sung only where the family's `voices` say so.
- **Check.** The pitch tracker above becomes `tools/music-lab/tune.cjs`: it renders the sung line and fails if a note's centre is more than 20 cents off its semitone or wobbles more than 20 cents (dry), and reports the same through each chain.

**Slice 2: voices as texture, by family.** Each genre family gets a `voices` shelf: which recorded layers it may use and where. The CC0 recordings become instruments: the crowd's "uh" retuned to the chord as a choir (already in the A/B), the whispers (the vocoder's modulator, and as a bed), the throat singing and the kargyraa as drones on the root in ritual and the dark, the woman's triad as a pad, the new alto set as a chant (a one-note ostinato on the root, "oh", for ritual and witch house). Each a `sample` patch with its root measured, bending at most 2 semitones, never retuned past that. Freesound is reachable from the builders' environment now (the research said it wasn't), so the search for more CC0 voices continues: each upload the uploader's own, its page's licence checked, no plugin demos.

**Slice 3: the palette, and whether dorian and ABAC stay.** Ed is open to rethinking the music. Proposed, to be heard one record at a time in the Music Lab, not decided here:

- **Mode by family**, not one dorian: dorian for the folk and house families, aeolian for dark folk and breakdowns (already), phrygian with its flat second for witch house and legend circles, the tritone as a jump scare on a legend waking.
- **Two kinds of record.** *Melodic records* keep the 32-bar ABAC form. *Ritual and witch-house records* drop the melody for a **drone plus ostinato**: a held fifth (organum) under a one-bar chant cell and the frame drums, over the same 32 bars, the voice a chant rather than a tune (the references: Heilung, Dead Can Dance, Salem).
- **Half time** for the dark families: the drums at half the tempo under the hats (no change to the beat clock), as the witch-house take did.
- **The first genres**, by Ed's mapping: home and temperate islands house and ritual folk; the north cold ambient techno; the south dub and desert trance; the east techno and drum & bass; the west jungle and tribal house; legend circles and the far phases witch house.

### Licences and tools

- Rubber Band (formant-preserving shift) is GPL: **offline only**, to build the sample set; the manifest records it as processing. Nothing GPL ships.
- `voc` (Paul Batchelor): the CWEB source MIT, the generated C public domain; credited in `samples/CREDITS.md` like Faust.
- Freesound CC0 only, each sound the uploader's own, its page's licence checked; the candidates so far: 274121 (a woman's three-part triad, 6 s, CC0), 8067 (a man's "arh" on a low D, 32 s, CC0, processed by its uploader with chorus and reverb: a drone layer, not a lead), and the five already in `samples/voices/`. No CC0 multisampled choir exists; Sonatina's three chorus patches are Sampling Plus, outside our rules.
- Comparable games: No Man's Sky's wordless voices are a physically modelled vocal tract (Paul Weir's VocAlien, a Wwise plugin fed by the creatures' sizes) over 65daysofstatic's generative system; Spore assembles Brian Eno's samples by rules in Pure Data. Both keep voices as instruments, never words: the same bet as here.

### Ed's decisions (2026-10-14, in India's session)

1. **Slice 1 approved as written**: the alto, both lead voices built and A/B'd (the sampled alto set and the vocal-tract worklet), the melody rules, the two chains by place, the voice out of the drops, the tuning check.
2. **The pure chain's reference: Lisa Gerrard's alto in Julianna Barwick's layers.** One dark alto tone, long notes; in breakdowns the multitracked wash (the same voice layered, looped, in the long hall). The processed chain's reference stays Holy Other and Salem.
3. **Slice 3 starts with mode by family** (phrygian for witch house and legend circles, aeolian for dark folk and breakdowns, dorian kept for house and folk), not with a ritual record; the drone-and-ostinato record waits.
4. **The A/B is heard live in the Music Lab**: a Vocalise picker with both voices and both chains, sliders, and "Copy my settings"; no mp3s needed.
5. **Build order** (Ed, the same day): the cheap fixes go **straight into the game first** (the alto, the chorus and octave double off, the stepwise melody), then the A/B in the Music Lab. The alto's range is **G3 to G4**. The breakdown's multitracked wash is **three voices** (the alto, a fifth and an octave up at half the level, each a little late and a few cents apart). Breath: **a slider in the lab's Vocalise card**, Ed sets it.

## The musician (Ed, 2026-10-22)

Ed is starting to work with a musician: "we can keep the current music and start separate parallel branch" (`claude/music-musician`; the current music stays the game's default). Decided:

- **The musician works in Logic.** Notes come in as MIDI (Logic: File ▸ Export ▸ Selection as MIDI File); sounds can't come over from Logic's synths.
- **Instruments: our engine's synths, tuned live**, not samples bounced from Logic.
- **First tools: a patch designer, and a MIDI player** to hear their patches played together: the Music Studio (`music-studio.html`, CLAUDE.md's glossary).
- **The synth grows** (Ed: "today's synth + new features"): per-wave levels and pitch, a custom wave, sub and noise, FM, the filter's own envelope, a second filter, vibrato and tremolo.
- **Open:** whether their melodies and structures play as written, feed the generator as material, or both by record.

## Open questions

- (2026-10-14) Answered in part by the proposal above: voices in breakdowns, builds, legend circles and the dark; the first genres by Ed's mapping, one record at a time.

- Should witchiness vary by context (more ritual in legend circles and at home, more rave on the dancefloor)?
- Which genres make the first set of records?
