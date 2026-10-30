import { expect, it } from "vitest";
import { coordinatorComment } from "../../tools/robustness/coordinator.mjs";
it("recognizes all trusted coordinator prefix variants without changing bodies or accepting quotes/other authors", () => {
  for (const prefix of ["COORDINATOR:", "COORDINATOR —", "COORDINATOR –", "COORDINATOR -"]) {
    const comment = { user: { login: "edsaperia" }, body: `wrapper\n${prefix} exact instruction` };
    const body = comment.body;
    expect(coordinatorComment(comment)).toBe(true); expect(comment.body).toBe(body);
    expect(coordinatorComment({ ...comment, user: { login: "outsider" } })).toBe(false);
  }
  for (const body of ["REPORT: COORDINATOR: mentioned", "> COORDINATOR: quoted", "COORDINATORS: unrelated", "COORDINATOR -not-a-prefix"]) expect(coordinatorComment({ user: { login: "edsaperia" }, body })).toBe(false);
});
