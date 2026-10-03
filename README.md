# Witch

A videogame by Ed Saperia: a witch throws a rave in a magical forest. The design is in `DESIGN.md`; how the project is run is in `CLAUDE.md`.

## The fly-around prototype

Fly the witch round a generated forest at night, on a laptop or a phone. Add `?seed=123` to the link to play a given map (the seed shows bottom left). Add `&tilt=before`, `&tilt=after` or `&tilt=off` to compare the tilt-shift variants, `&bloom=off` to drop the glow, `&debug` to open the debug overlay.

- **Keyboard**: WASD or arrows fly · space rises to the treetops or descends · Q/E or −/+ zoom · `~` debug overlay
- **Gamepad**: left stick flies · A rises or descends · shoulders zoom
- **Phone**: drag on the left half to fly · the round button rises or descends · +/− zoom · three-finger tap for debug

Change how it plays in `config/tuning.json`, and how it looks in `config/style.json` (paste a style saved in the Witch Art Lab).

## Developing

```
npm install
npm run dev          # local server with live reload
npm test             # rules tests (Vitest)
npm run typecheck
npm run build        # into dist/
npm run smoke        # after a build: headless fly-through, screenshots in previews/
```

- `src/rules/`: the game's state and rules, plain TypeScript with no Three.js (map, forest, witch, camera, creatures, clock), so they port to Godot.
- `src/render/`: the Three.js view that draws them; art from `art/generator.js`.
- `src/platform/`, `src/ui/`: input, touch controls.
