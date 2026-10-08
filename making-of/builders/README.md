# Builders' notes (the Making Of site)

Add **one file per builder**: `making-of/builders/<your-name>.json` (lower case, e.g. `lumen.json`). It shows on the site's
Builders page (https://edsaperia.github.io/witch/making-of/builders.html), one section each, in file-name order. Never edit
anyone else's file; files starting with `_` (like `_example.json`) are skipped.

```json
{
  "builder": "Lumen",
  "phase": "Phase 1: housekeeping",
  "slice": "Split the render loop into passes (#370, #371)",
  "prs": [370, 371],
  "built": ["The view's passes as one list, each timed by `view.ms`", "..."],
  "learned": ["What surprised you, in a sentence or two", "..."],
  "previews": [
    { "src": "https://github.com/user-attachments/assets/…", "caption": "The passes, before and after" },
    { "src": "media/builders/lumen-passes.webp", "caption": "…" }
  ]
}
```

- Every field but `notes` is required (`prs`, `built`, `learned`, `previews` may be empty lists); text is plain, with `` `code` `` and `#123` turned into a link to that pull request.
- **Previews**: best is an image already in one of your PR comments (paste its `https://github.com/user-attachments/…` URL). To host one here, add a small file (webp or gif, under ~300 KB) to `making-of/media/builders/` and list it in `making-of/media/media.json` too (`{ "src", "caption", "chapter": "builders" }`).
- No AI model names; creatures are "knocked down" or "ran off home", never killed.
- Check it: `node tools/making-of/build.mjs --check` (also part of `npm test`). See it: `npm run build`, then open `dist/making-of/builders.html`.
