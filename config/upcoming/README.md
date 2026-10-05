The start screen's "Coming up" is generated at deploy time from the repository's open pull
requests (`.github/workflows/pages.yml` writes `upcoming.generated.json`; `src/ui/upcoming.ts`
reads it). For anything in flight that has no pull request yet, the coordinator can add one small
file here per item, `<slug>.json`: `{ "title": "Short title", "summary": "One plain line." }`.
They're listed after the pull requests, up to eight items in all.
