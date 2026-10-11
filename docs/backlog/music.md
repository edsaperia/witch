# Music: witchier, and a palette of genres

Backlog (Ed, 2026-10-11). Nothing here is built yet; don't build without Ed's go.

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
- **Setup:** a `samples/` folder with a manifest giving each file's source and licence; a CI check that every sample has an approved licence; credits generated from the manifest; a size budget (a few MB of compressed audio for the web build).

## A better vocalise

- **Pink Trombone** (MIT licence): an open-source human vocal-tract model that runs in the browser, giving sung vowels that glide; still generated live, so melodies never sound canned. For the lead soprano.
- **CC0 choir vowels** (VCSL, Freesound) for pads and chants beneath it.

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

## Open questions

- Should witchiness vary by context (more ritual in legend circles and at home, more rave on the dancefloor)?
- Which genres make the first set of records?
