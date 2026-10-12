# Dark circle under placed sigils: diagnosis

Ed asked: "There is a dark circle that appears under sigils when they're placed. What is causing this?" He also noted that "it happens when a sigil is placed on the ground by the witch".

All shots use seed 123 in the Alder forest near home. Five sigils are placed round her (level 1+), shot at 1280×720, on prototype at 5c3e5bc5 (after #752). The toggles were temporary and local, and none are committed.

## Verdict

**It's the sigil's own point light (`sigilSpill`, `src/render/view/lights.ts` `sigilLights`) going negative.** It is not the grass clearing, and not the soft dot.

- **Two clocks.** A placed sigil is stamped with **her** clock. `stepLeash` runs on `g.herTime` from `sigilButton.ts`, so `p.at = herTime`. The light's fade-in, however, is worked out on the **world** clock: `strength × min(1, (time − p.at) / 0.8)`, where `time` is `game.clock.time`.
- **When her clock gets ahead.** The world clock runs slow on the treehouse deck (10×) and in legend circles, so after either her clock is ahead of the world's. That makes `time − p.at` negative. Nothing clamps it, so the strength goes negative.
- **What that does to the light.** The shared lighting loop adds `rgb × min(1, ndl·fall²·w)`, and with a negative `w` it **subtracts** light. The result is a near-black ellipse over the light's whole reach: about 6 m, more for older creatures, soft at the edge. That matches Ed's screenshots.
- **How long it lasts.** It stays until the world clock catches up with the stamp, which on a normal clock is the rest of the run.

**Brightness (Rec. 709 luma, 0–255).** For each sigil there are two numbers:
- *patch*: inside 1.2× the rune's radius;
- *ring*: the ground from 1.6× to 3× its radius.

| Shot | patch / ring, per sigil |
|---|---|
| 1 bug: her clock 20 s ahead | 25/3, 22/3, 27/2, 56/15, 38/4 |
| 2 same, sigil light off | 157/80, 161/78, 136/67, 175/98, 155/55 |
| 3 same, **fix** | 212/119, 212/123, 184/100, 213/150, 208/101 |
| 4 normal clocks, fix | 212/117, 211/121, 180/99, 215/150, 210/97 |

Turning off only the light removes the blob (2). Clamping the light's fade-in (3) gives the same picture as normal clocks (4).

### Suspects ruled out (normal clocks, `3-suspects-normal-clock-crops.png`)

| Variant | patch / ring |
|---|---|
| a as today | 185/86, 195/108, 196/97 |
| b no grass clearing | 164/89, 182/105, 178/89 |
| c no soft dot | 183/86, 191/108, 200/95 |
| d no clearing, no dot | 157/86, 178/103, 181/91 |
| e no rune | 124/87, 130/109, 118/91 |
| g no sigil light | 141/70, 155/83, 157/71 |
| h clearing only (no dot, rune or light) | 70/70, 76/84, 58/67 |
| i all off | 80/69, 81/80, 67/64 |

The grass clearing only thins and flattens tufts. In h against i, the patch differs by under 12, which is texture, not a dark disc. The soft dot draws additively, so it can only brighten, and #752 turned it off anyway. The rune is additive too.

Also ruled out: blob shadows, her shadow, blood pools, and NaN (shot with parked creatures and with shadows off: `full/` P-series in the scratch run).

## Proposed fix (one line, `src/render/view/lights.ts`, not the leash code)

```ts
strength: S.strength * Math.min(1, Math.max(0, (g.herTime - p.at) / 0.8)) * pulse
```

This fades the light in on the same clock the stamp was made on, and never lets it below 0. The `max(0, …)` alone would also stop the black, but on the world clock the sigil would then stay unlit until the world caught up.

## Ed's follow-up: a deliberate dark patch under a sigil

Ed: "a dark patch directly underneath a sigil is quite helpful for making it more readable", since sigils are unreadable on bright ground (by soundsystems).

`4-dark-backing-mock-crops.png` mocks it as a small negative light under each sigil (temp `dcBack`), on top of the fix:

| Variant | patch / ring |
|---|---|
| fixed, no backing | 196/128, 209/137, 201/134, 202/139, 212/119 |
| backing 1.2, 1.6 m | 188/129, 200/137, 183/130, 194/142, 209/120 |
| backing 1.2, 2.4 m | 175/126, 189/135, 169/128, 173/139, 201/118 |
| backing 4, 2 m (strong) | 121/124, 137/132, 106/124, 108/136, 146/113 |

The strong one makes the cyan glyphs read clearly against dark ground. But a negative light is the wrong tool for this:
- it only removes *light*, so it does nothing on ground that is bright by its own colour or emission (the dancefloor, a soundsystem's glow);
- it darkens anything standing in it (her, creatures);
- it doesn't touch bloom, which is what washes the glyph out (see 3 and 4: the runes bloom into a haze).

**Recommendation (DECISION FOR ED / for golf, who owns the sigil glow):**
- **Backing.** Draw the backing as part of the placed rune itself: a multiply disc (a soft-edged dark ellipse about 1.3× the rune, around 60% dark) drawn just before the additive rune. It would darken whatever is beneath it, lit or emissive, and leave creatures alone.
- **Bloom.** Lower the rune's bloom contribution when placed, for example by keeping the placed glyph's emissive below the bloom threshold and leaning on the dark backing for contrast.

This is the leash layer (`src/render/leash/glyphs.ts`), so it belongs with golf's option B, not here.
