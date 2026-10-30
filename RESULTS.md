# Parity results 2 D (not for merge)

Commit: 832fd07bdd09cdcf6e1f4502f62c827493da5956 (HEAD confirmed; 5e51a00c4 present locally: `commit`). `npm ci` ok. All runs used CLOUD_RIG=1, EXPECT_SHA=832fd07..., SHARDS=8, GPU: ANGLE SwiftShader Vulkan.

| run | exit code | wall-clock | rows |
|---|---|---|---|
| dry (SHARD=0 DRY_ROW=0) | 0 | 8 s | 1 (extras-0 plain) |
| shard 6 | 0 | 264 s | 66 |
| shard 7 | 0 | 272 s | 66 |

## Dry row
extras-0 plain: parity 0 px (max 0); currentDrift 0/0; baselineDrift 0/0; sensitivity distance-field-ablation 12666 px, max 97.

## Shard 6 (66 rows: extras-6,14,...,254 plain+beach, then sensitivity-KOI plain+beach)
- parity: 0 differing pixels, max 0 in all 66 rows (RGBA difference count 0).
- currentDrift 0/0 and baselineDrift 0/0 in all rows.
- distance-field-ablation sensitivity: 12672-12695 px (max 97-172) for extras-6..126; 10024 px (max 98-105) for extras-134..254. Never zero.
- sensitivity-KOI: extraSensitivity KOI 86 px, max 136 (plain and beach).
- No shader, link or page errors reported (stderr/stdout contained only esbuild duplicate-key warnings for art/effects.js: legendLob, legendBeam).

## Shard 7 (66 rows: extras-7,15,...,255 plain+beach, then sensitivity-BARE plain+beach)
- parity: 0 differing pixels, max 0 in all 66 rows.
- currentDrift 0/0 and baselineDrift 0/0 in all rows.
- distance-field-ablation sensitivity: 12672-12695 px (max 97-172) for extras-7..127; 10024 px (max 98-105) for extras-135..255.
- sensitivity-BARE: extraSensitivity BARE plain 26840 px max 122; beach 19163 px max 128.
- No shader, link or page errors reported (same esbuild duplicate-key warnings only).

## Files
Output dirs: ground-extra-dry, ground-extra-parity-6, ground-extra-parity-7 (each baseline.cjs, candidate.cjs, results.json; ~3.4 MB each). No files over 20 MB; none skipped.
