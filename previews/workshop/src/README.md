# Workshop mock (2026-10-23): sources

MOCK ONLY, for docs/backlog/workshop.md on claude/workshop-mock. Nothing here is in the game.

- `wrecks.diff`: three mock wreck pieces (`wreck-jet`, `wreck-canoe`, `wreck-horse`) added to the country kit from `art/brooms.js`'s own kinds, and `?wreck=<id>` drawing one where tonight's trunk stands (render/view/finds.ts). Applied to a throwaway worktree of claude/prototype at 99a5cb311 and built with `npx vite build --outDir <dist>`.
- `wreck-shots.cjs <dist> <out> 123 wreck-jet,...` (OX=-4 OZ=2.5 ZOOM=-2): stands her by the trunk's spot at ground zoom and shoots. The art workers stalled in the cloud's headless Chromium, so it draws the find's job on the page.
- `part-thumbs.mjs <dir>`: the nine parts alone, as the bay's and pegboard's thumbnails.
- `panels.js`, `house-shots.cjs <dist> <out> <thumbs>`: the bay, lathe and pegboard panels in the station menus' look, laid over the live game in the Workshop.
- `label.cjs`: stamps MOCK and a caption on the wreck shots.
