# Pages publication: review and activation

Approved by Ed via1557#6548077416. No settings or deployment change has been made by the builder. Current Pages is legacy from gh-pages:/, and pages.yml only cleans closed PRs. Baseline latest100managed runs (2026-10-31 11:03:51–18:42:00UTC):78cancelled/21success/1inflight. New timings require activation and public-SHA verification; no before/after improvement is claimed yet.

The existing CI jobs still publish the complete root/per-PR output to gh-pages and preserve version.json, URL paths and artifacts. They then issue repository_dispatch pages-live for main or pages-preview for previews. Cleanup removes the closed PR folder as before and requests a preview publication. A push event alone is insufficient: GITHUB_TOKEN pushes do not normally trigger another workflow, and gh-pages itself has no workflow files. The dispatcher runs the reviewed publisher from default main.

Preview debounce is60s in its own cancelable group, outside the publication lock. Main/manual requests bypass debounce and may preempt an older publisher. Preview requests never cancel a running publisher. Publication is serialized; each job checks out LATEST gh-pages, not its event SHA. GitHub's pending-slot replacement/order is not a priority queue: if a debounced preview replaces a pending live job, it still publishes the newest live root with the complete snapshot. An already active Pages deployment/API service and runner availability remain finite external latency; race/publication acceptance must be verified, not inferred from policy tests.

The publisher reads Pages build_type and is inert until it is workflow. It neither creates nor updates Pages settings. Upload uses actions/upload-pages-artifact@v4; deployment uses actions/deploy-pages@v4 with pages:write, id-token:write and github-pages environment. Source and request timestamp/root version/site SHA are retained in pages-publication-evidence. Request-to-deploy timing is not by itself proof that the public HTTP version is live.

After canonical review and green exact-head CI, Ed:
1. Publishes the reviewed workflow through the normal release; leaves Source unchanged until the new workflow is on default main.
2. Opens repository Settings → Pages → Build and deployment → Source, chooses GitHub Actions. Checks github-pages environment permits default main, which owns repository_dispatch/manual runs.
3. Opens Actions → Publish Pages snapshot → Run workflow on main once. Verifies canonical public version.json matches the intended main build and a known PR path still works.
4. Canonical records main publish request→public-SHA timing, preview burst coalescing, live-during-preview priority, and closed-PR cleanup. No extra local browser allocation implied.

If activation fails, Ed/canonical may return Source to Deploy from a branch (gh-pages,/); the existing complete gh-pages snapshot remains available. Builder makes no source-setting or deploy action itself.

Primary references checked2026-10-31: [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [workflow triggering/GITHUB_TOKEN exceptions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow), [concurrency and pending-slot replacement](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency).
