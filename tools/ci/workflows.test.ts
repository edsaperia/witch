import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { parse } from "yaml";

const workflow = (name: string) => parse(fs.readFileSync(`.github/workflows/${name}.yml`, "utf8"));
const ci = workflow("ci"), jobs = ci.jobs;
describe("shared CI game build", () => {
  it("runs declared proofs on PR artifacts with a frozen cached baseline and smoke Chromium", () => {
    const proof = jobs.proofs, steps = proof.steps;
    expect(proof.needs).toEqual(["build"]);
    expect(proof.if).toContain("github.event_name == 'pull_request'");
    for (const excluded of ["claude/rel", "release/", "claude/publish-snapshot", "Release:", "Release check:", "Publish:"]) expect(proof.if).toContain(excluded);
    expect(proof.env).toEqual(jobs.smoke.env);
    expect(steps.find((s: any) => s.name === "Install Chromium (bounded, one retry)").run).toBe(jobs.smoke.steps.find((s: any) => s.name === "Install Chromium (bounded, one retry)").run);
    expect(steps.find((s: any) => s.uses === "actions/download-artifact@v4").with).toEqual({ name: "game-dist", path: "dist" });
    const cache = steps.find((s: any) => s.id === "proof-cache");
    expect(cache.with.key).toContain("steps.baseline.outputs.sha");
    expect(cache.with["restore-keys"]).toBeUndefined();
    expect(steps.find((s: any) => s.uses === "actions/cache/save@v4").if).toContain("always()");
    expect(steps.find((s: any) => s.name === "Keep proof evidence and timing").if).toBe("always()");
  });
  it("checks config values and every maintained generated reference before building", () => {
    const step = jobs.build.steps.find((s: any) => /npm run build/.test(s.run ?? ""));
    expect(step.run).toBe("node tools/config/check.mjs && npm run build");
    const gate = fs.readFileSync("tools/config/check.mjs", "utf8");
    for (const tool of ["config/format", "config/schema", "config/typegen", "config/linkSwitches", "docs/glossary", "docs/tables", "inventory", "config/generated"])
      expect(gate).toContain(`'tools/${tool}.mjs', '--check'`);
  });
  it("builds the tested revision once, with the benchmark base explicitly distinct", () => {
    const builds = Object.entries(jobs).flatMap(([job, value]: [string, any]) => value.steps.filter((s: any) => /npm run build/.test(s.run ?? "")).map((s: any) => ({ job, step: s })));
    expect(builds.map((b: any) => b.job)).toEqual(["build", "game-unchanged"]);
    // The comparison builds stamp base and head alike (and leave the shared artifact as the benchmarked head).
    expect(builds[1].step.run).toContain("cd base && npm ci && npm run build");
    expect(builds[1].step.run).toContain("mv dist dist-same");
    expect(builds[1].step.env).toEqual({ WITCH_VERSION: "${{ github.run_number }}", WITCH_SHA: "${{ github.event.pull_request.head.sha }}" });
    expect(jobs["game-unchanged"].steps.find((s: any) => s.with?.path === "base").with.ref).toContain("pull_request.base.sha");
  });
  it("skips only the benchmark itself when the game build is byte-identical to base", () => {
    const steps = jobs["game-unchanged"].steps, same = steps.findIndex((s: any) => s.id === "same");
    expect(steps[same].run).toContain("node head/tools/ci/same-game.mjs base head");
    for (const s of steps.slice(same + 1).filter((s: any) => s.name !== "Failure annotation totals" && s.if !== "always()" && !String(s.run ?? "").includes("GITHUB_STEP_SUMMARY")))
      expect(s.if).toBe("steps.same.outputs.same != 'true'");
    expect(steps.slice(0, same).some((s: any) => /bench\/run\.mjs/.test(s.run ?? ""))).toBe(false);
  });
  it("has every built-game consumer download the one artifact", () => {
    const upload = jobs.build.steps.find((s: any) => s.uses === "actions/upload-artifact@v4");
    expect(upload.with).toMatchObject({ name: "game-dist", path: "dist", "if-no-files-found": "error" });
    for (const [job, dest] of [["smoke", "dist"], ["large-world", "dist"], ["deploy", "dist"], ["preview", "dist"], ["game-unchanged", "head/dist"]]) {
      expect(jobs[job].needs).toContain("build");
      expect(jobs[job].steps.find((s: any) => s.uses === "actions/download-artifact@v4").with).toEqual({ name: "game-dist", path: dest });
    }
  });
  it("cannot report a green required check when its prerequisite build failed", () => {
    expect(jobs.check.needs).toContain("build");
    expect(jobs.check.if).toContain("!cancelled()");
    expect(jobs.check.steps[0]).toMatchObject({ run: "exit 1" });
    expect(jobs.check.steps[0].if).toContain("needs.build.result != 'success'");
  });
  it("skips the unused playable preview for release-check and publish PRs", () => {
    expect(jobs.preview.if).toContain("!startsWith(github.event.pull_request.head.ref, 'claude/release-')");
    expect(jobs.preview.if).toContain("github.event.pull_request.head.ref != 'claude/publish-snapshot'");
  });
  it("splits unit tests over four shards and the required check needs every shard", () => {
    expect(jobs.unit.strategy.matrix.shard).toEqual([1, 2, 3, 4]);
    expect(jobs.unit.strategy["fail-fast"]).toBe(false);
    const run = jobs.unit.steps.find((s: any) => s.run === "node tools/ci/run-unit.mjs");
    expect(run.env.VITEST_SHARD).toBe("${{ matrix.shard }}/4");
    expect(jobs.unit.needs).toEqual(expect.arrayContaining(["build", "deploy"]));
    expect(jobs.unit.steps[0]).toMatchObject({ run: "exit 1" });
    expect(jobs.check.needs).toContain("unit");
    expect(jobs.check.steps[0].if).toContain("needs.unit.result != 'success'");
    expect(jobs.check.steps.some((s: any) => /run-unit/.test(s.run ?? ""))).toBe(false);
  });
  it("bounds every Chromium install so a hung download cannot consume a whole job timeout", () => {
    for (const [name, job] of Object.entries(jobs) as [string, any][]) for (const step of job.steps) {
      if (!/playwright install/.test(step.run ?? "")) continue;
      expect(step.run, name).toMatch(/timeout 300 /);
      expect(step.run, name).toMatch(/for try in 1 2/);
    }
  });
  it("gives main publication priority without publishing prototype pushes or forks", () => {
    expect(jobs.deploy.if).toContain("github.ref == 'refs/heads/main'");
    expect(jobs.deploy.if).not.toContain("github.event_name == 'push'");
    expect(jobs.deploy.if).toBe("${{ github.ref == 'refs/heads/main' }}");
    expect(jobs.preview.if).toContain("github.event_name == 'pull_request'");
    expect(jobs.preview.if).toContain("head.repo.full_name == github.repository");
    expect(jobs.check.needs).toContain("deploy");
    expect(jobs.smoke.needs).toContain("deploy");
    expect(jobs.smoke.if).toContain("github.ref != 'refs/heads/main' || needs.deploy.result == 'success'");
    expect(ci.permissions).toEqual({ contents: "read" });
    expect(jobs.deploy.permissions).toEqual({ contents: "write", "pull-requests": "write" });
    expect(jobs.preview.permissions).toEqual(jobs.deploy.permissions);
  });
  it("runs PR preview alongside checks while only main publication gates them", () => {
    expect(jobs.preview.needs).toEqual(["build"]);
    expect(jobs.preview.steps).toEqual(jobs.deploy.steps);
    for (const name of ["check", "smoke", "large-world"]) {
      expect(jobs[name].needs).toContain("deploy");
      expect(jobs[name].needs).not.toContain("preview");
      expect(jobs[name].if).toContain("!cancelled()");
    }
  });
  it("keeps closed-PR cleanup independent and removes the duplicate benchmark workflow", () => {
    const pages = workflow("pages");
    expect(pages.on).toEqual({ pull_request: { types: ["closed"] } });
    expect(Object.keys(pages.jobs)).toEqual(["remove"]);
    expect(fs.existsSync(".github/workflows/bench.yml")).toBe(false);
    expect(jobs["game-unchanged"].name).toBe("game unchanged (bench:quick)");
  });
  it("does not make the independent art generator consume a nonexistent game build", () => {
    const art = workflow("art-check");
    expect(art.jobs.art.steps.some((s: any) => /npm run build/.test(s.run ?? ""))).toBe(false);
    expect(art.jobs.art.needs).toBeUndefined();
  });
  it("keeps real largest-world drawing coverage separate from small unit worlds", () => {
    expect(jobs["large-world"].steps.some((s: any) => s.run?.includes("tools/smoke/large-world.cjs"))).toBe(true);
    expect(jobs["large-world"].steps.find((s: any) => s.uses === "actions/download-artifact@v4").with.name).toBe("game-dist");
    expect(jobs["large-world"]["timeout-minutes"]).toBe(20);
  });
  it("allows cancellation of stale consumer jobs rather than always keeping them alive", () => {
    for (const name of ["check", "smoke", "large-world"]) {
      expect(jobs[name].if).toContain("!cancelled()");
      expect(jobs[name].if).not.toContain("always()");
    }
  });
});
