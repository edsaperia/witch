# Music research: plan and mood board

The music builder's first step on [the music backlog](../backlog/music.md) (Ed, 2026-10-11). This is a plan only: nothing here is wired into the game until Ed says go.

## Mood board

**How this was made.** I can't play recordings from this environment, so this page comes from what I know of the references, not fresh listening. Tempos are typical ranges, not measured. Ed's ears are the judge: the A/B renders below are where he decides.

| Reference | Tempo (typical) | Scale and harmony | Instruments and sounds | Tricks worth taking |
|---|---|---|---|---|
| **Witch house** (Salem, oOoOO, Holy Other, early Crystal Castles) | 60–80, felt as half time over 120–160 | Minor, often Phrygian or Aeolian; drones; few chords | Slowed trap drums, 808-style subs, rolling hi-hats, pitched-down vocal chops, choir pads | Chopped and screwed (slowed, pitched down); huge dark reverb; half-time kick and snare under fast hats; lo-fi grit |
| **Ritual / dark folk** (Heilung, Wardruna, Dead Can Dance) | 60–100, slow and steady | Modal (Dorian, Aeolian); drones; bare fifths and octaves | Frame drums, bones and rattles, throat singing, chant, lyre, horns | One drum pattern for minutes; call and response; drones under narrow-range chant |
| **Folk-horror scores** (*The Wicker Man*, *The Witch*, *Midsommar*) | Free time to about 100 | Modal folk tunes (*Wicker Man*); clusters, dissonance (*The Witch*); bright pastoral that turns uneasy (*Midsommar*) | Nyckelharpa, bowed strings, recorders, choir, harp, waterphone-like scrapes | Innocent folk melody over something wrong; slow glissandi; unison choir |
| **Dark electronic** (Burial, Andy Stott, Forest Swords, The Knife, Boy Harsher) | Burial about 130–140 (2-step); Stott and Forest Swords slower and heavier; The Knife and Boy Harsher about 110–130 | Minor and modal, often static harmony | Vinyl crackle, rain, pitched vocal chops, dub bass, cold synths, gated drums | Crackle and room tone as glue; vocals pitched and shifted until they're an instrument; dub delays; dynamics by filter |
| **The spooky canon** (*Danse Macabre*, *Night on Bald Mountain*) | Waltz (Saint-Saëns); driving (Mussorgsky) | Minor; the tritone (the violin's retuned E-flat string) | Solo violin, xylophone bones, brass | A tritone or flat second for menace; xylophone as rattling bones; a slow build to a frenzy |

**What they share** (the ingredients for the palette):
- **Drones and pedals.** Nearly every reference sits on a held low note or a bare fifth, and the melody moves over it.
- **Few chords, modal colour.** Dorian and Aeolian for folk and ritual; Phrygian and a flat second for menace (witch house, legend circles); the tritone as a jump scare.
- **Voices as instruments.** Chant, a wordless vocalise, pitched-down chops and whispers, rarely clear words.
- **Ritual percussion.** Frame drum, hand claps, shakers, bones, each with a steady ostinato rather than fills.
- **The tape and the room.** Crackle, wow, dark reverbs, filters opening slowly.
- **Half time.** The witch-house trick: the drums at half the tempo under fast hats. At our 120 that's a 60 bpm feel, with no change to the beat clock.

**On dorian and the ABAC structure.** Keep dorian as the default for home and folk records. Make the **mode a palette choice**: Aeolian for dark folk, Phrygian (with its flat second) for witch house and legend circles, and a borrowed tritone for boss moments. Keep the 32-bar ABAC form for melodic records. Ritual and witch-house records could drop the A/B/C melody for a **drone plus chant ostinato** over the same 32 bars, closer to the references. These are proposals; the renders below test them.

## Sources and licences

| Source | Licence | What it has for us | Reachable here |
|---|---|---|---|
| [VCSL](https://github.com/sgossner/VCSL) (Versilian Community Sample Library) | **CC0**, checked in its `LICENSE` | Frame drum (large and small: hand, open and muted hits), darbuka, slit drum (log drum), hand claps (solo and group), small and large shakers, tambourines, acoustic hi-hats, snares (modern and rope tension), concert bass drums, ocean drum; for drones: didgeridoo, pipe and Renaissance organ, bowed psaltery; wine glasses (magic); harps, recorders, ocarinas | Yes (git clone works) |
| [pink-trombone](https://www.npmjs.com/package/pink-trombone) 1.0.2 (Neil Thapen's model, made into a library by Gorka Egino) | **MIT** (both copyrights in its `LICENSE`) | A live vocal-tract model: sung vowels that glide, tenseness (breathy to sharp), vibrato, tongue and constrictions for consonants (chant syllables) | Yes (npm) |
| Freesound, filtered to CC0 | CC0 only (each sound's licence recorded) | Vocal chops, choir vowels, field recordings (owls, crows, wind, fire, a cauldron), bones and rattles | **No.** `freesound.org` is blocked by this environment's network policy |
| Hydrogen drum kits | Mixed (many GPL, some CC) | Drum kits | Skipped: GPL on samples is awkward, and VCSL covers us |

**Not available as samples:** VCSL has no voices or choir. Voices will come from Pink Trombone, and from Freesound CC0 if the network allows it. The dance kick stays synthesised, as the brief says (no ripped drum machines). VCSL's bass drums are orchestral, so they serve as a ritual layer, not a house kick.

## The plan

### 1. `samples/` and its licence check

- `samples/` holds the trimmed, compressed files.
- `samples/manifest.json` gives each file its source URL, original file name, licence (`CC0`, `PD`, `CC-BY-4.0`…), author, credit line, and the trim and processing applied.
- `node tools/samples/check.mjs`, run in `npm test`, fails on:
  - a file not in the manifest, or an entry with no file;
  - a licence not on the approved list (CC0, public domain, CC-BY with a credit line);
  - any NC licence;
  - anything over the size budget.
- `tools/samples/credits.mjs` writes the credits from the manifest (into the Making Of, and a `CREDITS` file in the build).
- **Size budget:** 3 MB of compressed audio in all; a first kit under 300 KB. Files are mono, trimmed, Opus or OGG at about 64 kbps (a one-shot is 5 to 20 KB). Loaded lazily, and never on the `?quick=1` path.

### 2. A first CC0 drum kit (VCSL)

About 16 one-shots, trimmed to a second or less:
- frame drum: large open, large muted, small open, hand slap;
- darbuka: doum and tek;
- hand claps: two;
- small shaker: up and down;
- tambourine: hit and shake;
- hi-hats: closed and open;
- snare: one rope-tension, one modern;
- slit drum: low and high;
- concert bass drum: a soft hit, layered under the synthesised kick for ritual records.

Each sample takes a part's place in the style (`kind: "sample"` beside `kick`, `noise`…), velocity picking the layer and round robins alternating.

### 3. A Pink Trombone vocalise

- First offline, in the Music Lab: the soprano's B and C phrases sung by the tract model.
  - Short tract and high pitch for a female voice.
  - Vowels gliding from note to note.
  - Tenseness rising with the phrase; vibrato creeping in on held notes.
- Then chant syllables ("ah-oh-ee", "na", "ma", "la" with the tongue and lip constrictions) for a low unison chant.
- **For the game:** its library runs on a ScriptProcessor, which the game no longer uses: it made the audio thread wait on the game's frames, and the under-run fix moved the mic check to an AudioWorklet for that reason. Its DSP is self-contained (the glottis and the tract), so it would move into an AudioWorklet, with a voice cap and the safety valve's sheds.

### 4. A/B renders in the Music Lab

`tools/music-lab/ab.mjs`: one fixed 32-bar passage (wave 2, seed 7, 120 bpm), rendered again with one ingredient added each time, so each step is heard against the one before:

| Render | Adds |
|---|---|
| 0 | Today's music (the baseline) |
| 1 | A drone: a low organum fifth under the form's chords (synthesised, and as a VCSL organ or didgeridoo sample) |
| 2 | Chant syllables: a low unison ostinato |
| 3 | Frame drums: a VCSL ritual pattern over today's beat |
| 4 | Tape wobble and crackle on the mix |
| 5 | The new CC0 kit in place of the synthesised drums (the kick stays) |
| 6 | The Pink Trombone vocalise for B and C |
| Bonus | A witch-house take: half-time drums, Phrygian with a flat second, pitched-down vocal chops, a dark reverb |

Each render is an mp3 for Ed, never committed. Loudness is matched, so louder doesn't win.

### 5. Then

Propose the palette's first genres from what Ed picks: a record as a palette plus a tempo, and the mapping from biomes to genres in the backlog. Also whether to keep dorian and the ABAC form as defaults.

## What I need

- **Ed's go** before any of this goes into the game. The renders and the docs don't touch the game.
- **Optional:** `freesound.org` (and `cdn.freesound.org`) added to the environment's allowed domains for CC0 voices and field recordings. Without them, voices come from Pink Trombone only.
