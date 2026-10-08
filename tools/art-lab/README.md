# tools/art-lab

<!-- written by tools/inventory.mjs; edit the scripts' header comments, then run it again -->

## `build.mjs`

Builds the Witch Art Lab as one self-contained page: each `import … from "../../art/<module>.js"` in the source page is replaced by that module's code, with its `export` keywords and its own relative imports removed, so every module shares the page…

```
node tools/art-lab/build.mjs
```

## Also here

- `dist`
- `witch-art-lab.html`
