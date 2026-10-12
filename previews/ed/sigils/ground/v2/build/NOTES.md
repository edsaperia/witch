# Ground sigils, option B built (#752)

Ed picked option B (tight) from the v2 mock (`../NOTES.md`). This folder shows the built game against today's, in the mock's same scene.

- `before-*`: today's game (`claude/prototype`).
- `after-*`: PR #752 (`claude/sigil-glow`).
- `before-after-crop-1to1.png`: the two 1:1 crops side by side.

Shots:
- `*-ground-near-1900x1240.png`: on the ground at the game's own zoom.
- `*-ground-far-1900x1240.png`: two zoom steps out.
- `*-treetops-1900x1240.png`: from the treetops.
- `*-crop-1to1.png`: the middle at the game's real size.

What the PR does:
- Every sigil glyph is drawn at `leash.sigilGlyph` × its colour (0.5, under the bloom's threshold).
- The halos are at `leash.sigilHalo` × their old strength (0, so none).
- The pause page's "#752 Sigil glow" sliders lift either live, if the sigils read too faint on bright ground.

The same shots as the mock's B, as expected: no halo discs, but the sigils are still faint on the brightest grass.
