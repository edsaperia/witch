import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { parse } from "yaml";

const workflow = (name: string) => parse(fs.readFileSync(`.github/workflows/${name}.yml`, "utf8"));
const ci = workflow("ci"), jobs = ci.jobs;
describe("shared CI game build", () => {
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
  it("runs independent check work beside unit shards and keeps the final gate strict and tiny", () => {
    expect(jobs["check-work"].needs).toEqual(["build", "deploy"]);
    expect(jobs["check-work"].steps.some((s: any) => s.run === "npm run typecheck")).toBe(true);
    expect(jobs["check-work"].steps.some((s: any) => s.run?.includes("reporting.test.cjs"))).toBe(true);
    expect(jobs["check-work"].steps.some((s: any) => s.run?.includes("npm --prefix server test"))).toBe(true);
    expect(jobs.check.needs).toContain("check-work");
    expect(jobs.check.steps).toHaveLength(1);
    expect(jobs.check.steps[0].if).toContain("needs.check-work.result != 'success'");
    for (const prerequisite of ["build", "unit", "check-work", "deploy"])
      expect(jobs.check.steps[0].if).toContain(`needs.${prerequisite}.result != 'success'`);
    expect(jobs.unit.steps.find((s: any) => s.uses === "actions/checkout@v4").with["fetch-depth"]).toBe(2);
    expect(jobs["check-work"].steps.find((s: any) => s.uses === "actions/checkout@v4").with?.["fetch-depth"] ?? 1).toBe(1);
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
    expect(run.env.UNIT_BALANCE).toBe("1");
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
    expect(Object.keys(art.jobs)).toEqual(["art"]);
    expect(art.jobs.art.needs).toBeUndefined();
    for (const job of Object.values(art.jobs) as any[]) {
      expect(job.steps.some((s: any) => /npm run build/.test(s.run ?? ""))).toBe(false);
      for (const step of job.steps.filter((s: any) => s.uses?.startsWith("actions/download-artifact@"))) {
        // An unqualified/all-artifact download could silently pull game-dist too.
        expect(step.with?.name ?? step.with?.pattern).toMatch(/^art-/);
        expect(JSON.stringify(step.with)).not.toContain("game-dist");
      }
    }
  });
  it("runs advisory art only nightly on prototype or manually on the selected exact ref", () => {
    const art = workflow("art-check"), steps = art.jobs.art.steps;
    expect(Object.keys(art.on).sort()).toEqual(["schedule", "workflow_dispatch"]);
    expect(art.on.schedule).toEqual([{ cron: "17 3 * * *" }]);
    expect(steps.find((s: any) => s.id === "source").with.script).toContain("context.eventName === 'schedule' ? 'claude/prototype' : context.sha");
    expect(steps.find((s: any) => s.uses === "actions/checkout@v4").with.ref).toBe("${{ steps.source.outputs.sha }}");
    expect(steps.find((s: any) => s.id === "checked").if).toBeUndefined();
    const notify = steps.find((s: any) => s.name === "Update the single nightly art result on issue 1476");
    expect(notify.if).toContain("always()");
    expect(notify.if).toContain("github.event_name == 'schedule'");
    expect(notify.env.ART_SOURCE).toBe("${{ steps.source.outputs.sha }}");
    expect(notify.with.script).toContain("issue_number = 1476");
    expect(notify.with.script).toContain("issues.updateComment");
    expect(notify.with.script).toContain("Failed/unproven task batch");
    expect(art.permissions.issues).toBe("write");
    for (const job of Object.values(jobs) as any[]) {
      const needs = Array.isArray(job.needs) ? job.needs : [job.needs];
      expect(needs).not.toContain("art");
      expect(needs).not.toContain("art-check");
    }
  });
  it("creates or updates one nightly failure comment with source and failed batch, and quietly resolves it", async () => {
    const script = workflow("art-check").jobs.art.steps.find((s: any) => s.name === "Update the single nightly art result on issue 1476").with.script;
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    for (const [result, prior, log] of [["failure", false, "checking art: rig-parts,treehouse\nFAIL treehouse pixels"], ["failure", true, "checking art: auxiliary-and-labs\nError: lab failed"], ["success", true, ""], ["success", false, ""], ["failure", false, ""]] as const) {
      const writes: any[] = [], issues = {
        listComments: () => {},
        updateComment: async (x: any) => writes.push({ kind: "update", ...x }),
        createComment: async (x: any) => writes.push({ kind: "create", ...x }),
      };
      const github = { rest: { issues }, paginate: async () => prior ? [{ id: 77, user: { login: "github-actions[bot]" }, body: "<!-- witch-art-check-nightly-result -->" }] : [] };
      await new AsyncFunction("require", "context", "github", "process", script)(
        () => ({ readFileSync: () => log }), { repo: { owner: "edsaperia", repo: "witch" }, runId: 123 }, github,
        { env: { ART_RESULT: result, ART_SOURCE: "a".repeat(40) } });
      if (result === "success" && !prior) { expect(writes).toEqual([]); continue; }
      expect(writes).toHaveLength(1);
      expect(writes[0].kind).toBe(prior ? "update" : "create");
      expect(writes[0].body).toContain("a".repeat(40));
      expect(writes[0].body).toContain(result === "success" ? "RECOVERED / PASS" : log ? "Failed/unproven task batch" : "Setup/planning failed");
      if (log) expect(writes[0].body).toContain(log.split("\n")[0].replace("checking art: ", ""));
      expect(writes[0].issue_number ?? 1476).toBe(1476);
    }
  });
  it("reuses a scheduled proof's actual checkout tree even when workflow metadata names another SHA", async () => {
    const script = workflow("art-check").jobs.art.steps.find((s: any) => s.id === "checked").with.script;
    const actualProof = await import("../art-check/checked-tree.mjs");
    // Vitest's VM cannot dynamically import inside a generated Function; bridge only the loader.
    const executable = script.replace("await import(pathToFileURL(path.resolve('tools/art-check/checked-tree.mjs')).href)", "await loadProof()");
    expect(executable).not.toBe(script);
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    for (const scenario of ["matching", "wrong-environment", "api-unavailable"]) {
      const tree = "a".repeat(40), env = { node: "v22.23.4", os: "Linux", arch: "x64", browser: "1.56.1" }, outputs: any = {};
      const proof = { schema: 1, tree, runId: 99, environment: scenario === "wrong-environment" ? { ...env, node: "v22.23.3" } : env };
      const actions = {
        listWorkflowRuns: async () => {
          if (scenario === "api-unavailable") throw Error("API unavailable");
          return { data: { workflow_runs: [{ id: 99, conclusion: "success", event: "schedule", head_sha: "b".repeat(40), head_repository: { full_name: "edsaperia/witch" } }] } };
        },
        listWorkflowRunArtifacts: async () => ({ data: { artifacts: [{ id: 1, name: "art-check-tree", size_in_bytes: 500, expired: false }] } }),
        downloadArtifact: async () => ({ data: Buffer.from("zip mock") }),
      };
      const github = { rest: { actions, git: { getCommit: async () => ({ data: { tree: { sha: "b".repeat(40) } } }) } } };
      const modules: any = {
        fs: { writeFileSync: () => {}, unlinkSync: () => {} },
        path: { resolve: (p: string) => p, join: (...p: string[]) => p.join("/") },
        child_process: { execFileSync: (cmd: string) => cmd === "git" ? tree : cmd === "node" ? env.node : JSON.stringify(proof) },
        url: { pathToFileURL: () => ({ href: new URL("../art-check/checked-tree.mjs", import.meta.url).href }) },
      };
      await new AsyncFunction("require", "context", "github", "core", "process", "loadProof", executable)(
        (name: string) => modules[name], { repo: { owner: "edsaperia", repo: "witch" }, runId: 100 }, github,
        { info: () => {}, setOutput: (k: string, v: any) => { outputs[k] = v; } },
        { env: { RUNNER_OS: env.os, PLAYWRIGHT_VERSION: env.browser, RUNNER_TEMP: "mock-temp" }, arch: env.arch }, () => actualProof);
      expect(outputs.run).toBe(scenario === "matching" ? 99 : "");
    }
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
