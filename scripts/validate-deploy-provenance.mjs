/** Deployment provenance gate for Fractalish Pages releases.
 *
 * Production deploys must come from a committed, inspectable Git state.
 * This script is intentionally conservative: untracked files are considered
 * deployment-affecting unless they are explicitly ignored by Git.
 */
import { execFileSync } from "node:child_process";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

const expectedBranch = process.env.FRACTALISH_DEPLOY_BRANCH || "main";
const branch = git(["branch", "--show-current"]);
const head = git(["rev-parse", "HEAD"]);
const status = git(["status", "--porcelain=v1"]);
const upstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
const upstreamHead = git(["rev-parse", "@{u}"]);
const localOnly = git(["rev-list", "--count", `${upstream}..HEAD`]);
const remoteOnly = git(["rev-list", "--count", `HEAD..${upstream}`]);

const failures = [];
if (branch !== expectedBranch) {
  failures.push(`unexpected branch: ${branch}; expected ${expectedBranch}`);
}
if (status) {
  failures.push("working tree is not clean");
}
if (remoteOnly !== "0") {
  failures.push(`local branch is behind ${upstream} by ${remoteOnly} commit(s)`);
}
if (localOnly !== "0") {
  failures.push(`local branch has ${localOnly} unpushed commit(s) not present on ${upstream}`);
}

const result = {
  ok: failures.length === 0,
  expectedBranch,
  branch,
  head,
  upstream,
  upstreamHead,
  localOnly: Number(localOnly),
  remoteOnly: Number(remoteOnly),
  cleanTree: !status,
  status: status ? status.split("\n") : [],
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
