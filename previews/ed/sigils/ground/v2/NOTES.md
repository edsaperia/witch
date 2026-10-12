# Ground sigils v2: fixing the glow, on the pixel grid (2026-10-12)

Ed, on v1: "Ground sigils shouldn't show on top of creatures' feet. Pixels are nicer - it's their glow that makes them hard to see, not the pixellation."

Every option below keeps the sigils on the art's pixel grid, in the world, under creatures' feet, drawn by the same atlas as today. Only how they're lit changes.

## The scene

- Seed 123, by the dancefloor, at night, at Ed's window size (1900×1240).
- Five parked creatures on their placed sigils, near and far.
- Five happy creatures with their runes.
- Her stack of three, with the ghost of the bottom one at her feet.
- A relic flask she put down.

It's built by a script (`app/sigilScene.ts`) and stepped at a fixed 1/60 s, so every option shows exactly the same moment.

The `KO'd grey sigil walking home` isn't in this scene. With `pickupDelay` at 0, there is no "happy but not ready yet" rune in play either: every happy creature's rune is ready at once.

## The options

- **A, today** (`a-*`). The glyph is added on top of the ground in its neon, with a soft halo dot under each placed sigil and ready rune, and the bloom spreads both. On the lit grass the sigil turns into a glowing disc you can't read.
- **B, tight** (`b-*`). No halo dot. The glyph is still added on top, at half brightness, below the bloom's threshold, so it gets no bloom. It's calmer but faint: added light can't stand out on bright ground.
- **C, ink** (`c-*`). No halo dot. The glyph is painted in its neon rather than added, so it keeps its colour on any ground. It has a one-pixel dark outline taken from the atlas's own pixels, so it reads against light grass and dark alike. Only its thin strokes are bright, so its bloom stays tight.
- **D, ink + state** (`d-*`). As C, with states told apart by shape rather than brightness:
  - **Parked:** solid.
  - **Ready to pick up:** solid, with a ring of eight pixel dots turning slowly round it.
  - **Happy but not yet ready, and the ghost at her feet:** hollow, a neon outline round dark strokes.

## Files

For each option:
- `*-ground-near-1900x1240.png`: on the ground at the game's own zoom.
- `*-ground-far-1900x1240.png`: two zoom steps out.
- `*-treetops-1900x1240.png`: from the treetops (the canopy projection).
- `*-crop-1to1.png`: the middle at the game's real size.

`compare-crop-1to1.png` puts the four 1:1 crops side by side.

## Recommendation

**C, ink**, plus two tweaks for the build:
- Draw the happy runes at full strength. Today they're dimmed on purpose (alpha about 0.6 × 0.8 colour), which still makes them the hardest to see in C. The outline does the work now.
- Keep D's turning dot ring as an option only if a state needs telling apart. With `pickupDelay` at 0, every happy rune is ready, so today there's nothing to tell apart.

The cost is one extra draw call for each of the four glyph batches, and nine texture reads for each glyph pixel.

The mock code is on `claude/sigil-glow-mock`, as `?sigilGlow=today|tight|ink|state`. It's not for merging. The shots come from `tools/sigils/glow-shots.cjs`.
