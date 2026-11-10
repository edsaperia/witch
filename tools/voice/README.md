# tools/voice

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `chimera-notes.mjs`

The singer's notes rendered by Chimera, one note alone a file: Chimera sings each MIDI note of a range on a syllable, its female body, as one phrase of a single long note: its own onset, breath, vibrato and release.

```
node tools/voice/chimera-notes.mjs <path to the chimera binary> [out dir] [lowest-highest MIDI, 55-79] [syllables, ah,ooh]
```

## `sing.mjs`

A voice singing a list of notes, offline, with Pink Trombone: sing gives a Float32Array.

## Also here

- `chimera-bodymix.patch`
- `fof`
- `pink-trombone`
- `tract`
