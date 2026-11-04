# Dependency audit, 4 November 2026

Scope: the game and multiplayer relay at prototype commit `483801b44`. This is a report for review. Manifests and lockfiles are unchanged.

| Tool | Locked | npm remediation | Exposure |
| --- | --- | --- | --- |
| Vitest | 4.0.18 | Move to 4.1.12 and refresh its mocker dependency in the lockfile. This is a minor upgrade. | Critical arbitrary file read/execution when the Vitest UI server is listening (GHSA-5xrq-8626-4rwp). The mocker also has a redirect path traversal and unauthenticated manual mock registration (GHSA-82fw-gwwq-j7x9, GHSA-qxg6-89mg-rqv8). |
| Vite | 7.3.6 | Move to patch 7.3.7 and refresh the lockfile. Run full CI before accepting the change. | npm rates the package high. Affected development-server paths include editor launching (Windows percent escaping and editor flag interpretation) and serving files outside the allowed directory on non-Windows. |

The root audit counted three affected packages including the transitive mocker. These are development tools. The root outdated check showed Three.js locked and wanted at 0.186.1, latest 0.187.0. Development-package freshness was not fully checked.

The relay locks its sole direct dependency, ws, at 8.22.0. Its registry audit and outdated check require approval to transmit the private project's dependency metadata to the public npm registry. Relay vulnerability and freshness status remain unknown. No dependency upgrades were applied.
