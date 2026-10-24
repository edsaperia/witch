# Sea chart to her decks: before and after options 1 and 2

Foxtrot, 2026-10-19. #968 (option 1: freeze the night behind the chart, and option 6: `?timing=1`) and #969 (option 2: the landing bake counts, and the island's own trees kept between nights). The "before" build is c80a796, the prototype these PRs branch from. Each was measured opening the chart, sailing to marten and flying in to her decks, in headless Chromium on the cloud's software renderer. The first visit starts from an empty profile; the revisit follows in the same profile. `stages.txt` has every step; `timeline.png` shows them as bars.

| from pressing E | before, first | before, revisit | after, first | after, revisit |
|---|---|---|---|---|
| page leaves for the island | 290 s | 260 s | 116 s | 53 s |
| new page ready (after it leaves) | 19 s | 21 s | 26 s | 13 s |
| marten's trees on the new page | made | made | made | found drawn at once |
| at her decks | 625 s | 559 s | 450 s | 399 s |

- **Most of the saving is the chart's own flight.** It went from 194–199 s to 34 s, because the night no longer steps and draws behind the chart.
- **A revisit finds the island's trees already drawn.** They are kept under the island's own seed. All 65 islands also come from the chart's cache in 5 s.
- **The arrival flight is unchanged.** It still takes 270–325 s here. It is paced by the frame rate, so on a real GPU it takes seconds. Options 3 and 4 cover it.
- **The earlier report's "warm" runs were not warm.** The harness served each run on a new port, so each run had an empty cache. These runs use one fixed origin per build.
