# tools/labs

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `publish.mjs`

The two self-contained lab pages, built and put with the game: tools/art-lab/build.mjs writes tools/art-lab/dist/witch-art-lab.html and tools/music-lab/build.mjs tools/music-lab/dist/witch-music-lab.html, and this copies them into dist/, so the Pages…

```
node tools/labs/publish.mjs [dist dir]
```
