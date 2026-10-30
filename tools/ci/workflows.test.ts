import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { parse } from "yaml";

const workflow = (name: string) => parse(fs.readFileSync(`.github/workflows/${name}.yml`, "utf8"));
const ci = workflow("ci"), jobs = ci.jobs;
describe("shared CI game build", () => {
  it("builds the tested revision once, with the benchmark base explicitly distinct", () => {
    const builds = Object.entries(jobs).flatMap(([job, value]: [string, any]) => value.steps.filter((s: any) => /npm run build/.test(s.run ?? "")).map((s: any) => ({ job, step: s })));
    expect(builds.map((b: any) => b.job)).toEqual(["build", "game-unchanged"]);
    expect(builds[1].step.working_directory ?? builds[1].step["working-directory"]).toBe("base");
    expect(jobs["game-unchanged"].steps.find((s: any) => s.with?.path === "base").with.ref).toContain("pull_request.base.sha");
  });
  it("has every built-game consumer download the one artifact", () => {
    const upload = jobs.build.steps.find((s: any) => s.uses === "actions/upload-artifact@v4");
    expect(upload.with).toMatchObject({ name: "game-dist", path: "dist", "if-no-files-found": "error" });
    for (const [job, dest] of [["smoke", "dist"], ["deploy", "dist"], ["game-unchanged", "head/dist"]]) {
      expect(jobs[job].needs).toContain("build");
      expect(jobs[job].steps.find((s: any) => s.uses === "actions/download-artifact@v4").with).toEqual({ name: "game-dist", path: dest });
    }
  });
  it("cannot report a green required check when its prerequisite build failed", () => {
    expect(jobs.check.needs).toContain("build");
    expect(jobs.check.if).toContain("always()");
    expect(jobs.check.steps[0]).toMatchObject({ run: "exit 1" });
    expect(jobs.check.steps[0].if).toContain("needs.build.result != 'success'");
  });
  it("gives main publication priority without publishing prototype pushes or forks", () => {
    expect(jobs.deploy.if).toContain("github.ref == 'refs/heads/main'");
    expect(jobs.deploy.if).not.toContain("github.event_name == 'push'");
    expect(jobs.deploy.if).toContain("head.repo.full_name == github.repository");
    expect(jobs.check.needs).toContain("deploy");
    expect(jobs.smoke.needs).toContain("deploy");
    expect(jobs.smoke.if).toContain("github.ref != 'refs/heads/main' || needs.deploy.result == 'success'");
    expect(ci.permissions).toEqual({ contents: "read" });
    expect(jobs.deploy.permissions).toEqual({ contents: "write", "pull-requests": "write" });
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
});
