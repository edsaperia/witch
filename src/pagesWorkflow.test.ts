import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const publisher = parse(readFileSync(".github/workflows/pages-publish.yml", "utf8"));
const cleanup = parse(readFileSync(".github/workflows/pages.yml", "utf8"));
const ci = parse(readFileSync(".github/workflows/ci.yml", "utf8"));

describe("managed Pages publication", () => {
  it("checks Ed's selected source before requesting any protected deployment", () => {
    expect(publisher.jobs.source.environment).toBeUndefined();
    expect(publisher.jobs.source.permissions).toEqual({ pages: "read" });
    const script = publisher.jobs.source.steps[0].with.script;
    expect(script).toContain("getPages"); expect(script).toContain("data.build_type === 'workflow'");
    expect(script).not.toMatch(/updatePages|createPagesSite/);
    expect(publisher.jobs.publish.if).toContain("needs.source.outputs.enabled == 'true'");
    expect(publisher.jobs.publish.environment.name).toBe("github-pages");
    expect(publisher.jobs.publish.permissions).toMatchObject({ pages: "write", "id-token": "write" });
  });
  it("keeps preview debounce outside the publisher lock and live requests off the debounce path", () => {
    const { debounce, publish } = publisher.jobs;
    expect(debounce.if).toContain("github.event.action == 'pages-preview'");
    expect(debounce.steps).toEqual([{ run: "sleep 60" }]);
    expect(debounce.concurrency.group).not.toBe(publish.concurrency.group);
    expect(debounce.concurrency["cancel-in-progress"]).toBe(true);
    expect(publish.if).toContain("needs.debounce.result == 'skipped'");
    expect(publish.concurrency["cancel-in-progress"]).toBe("${{ github.event_name == 'workflow_dispatch' || github.event.action == 'pages-live' }}");
    expect(publish.steps.some((s: any) => /sleep/.test(s.run ?? ""))).toBe(false);
  });
  it("always packages the latest complete site rather than an old queued event snapshot", () => {
    const checkout = publisher.jobs.publish.steps.find((s: any) => s.with?.path === "site");
    expect(checkout.with).toEqual({ ref: "gh-pages", path: "site" });
    expect(publisher.jobs.publish.steps.find((s: any) => s.uses === "actions/upload-pages-artifact@v4").with.path).toBe("site");
    expect(publisher.jobs.publish.steps.some((s: any) => s.uses === "actions/deploy-pages@v4")).toBe(true);
  });
  it("uses default-branch dispatch and retains independent closed-PR cleanup", () => {
    expect(publisher.on.repository_dispatch.types).toEqual(["pages-live", "pages-preview"]);
    expect(Object.hasOwn(publisher.on, "workflow_dispatch")).toBe(true);
    expect(publisher.on.push).toBeUndefined();
    for (const job of ["deploy", "preview"]) {
      const script = ci.jobs[job].steps.find((s: any) => s.name === "Request managed Pages publication").with.script;
      expect(script).toContain("createDispatchEvent"); expect(script).toContain("context.ref==='refs/heads/main'?'pages-live':'pages-preview'");
    }
    expect(cleanup.on.pull_request.types).toEqual(["closed"]);
    expect(cleanup.jobs.remove.steps.some((s: any) => s.run?.includes('git rm -rq "$dir"'))).toBe(true);
    expect(cleanup.jobs.remove.steps.at(-1).with.script).toContain("event_type:'pages-preview'");
  });
});
