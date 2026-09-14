import { spawnSync } from "node:child_process";
import process from "node:process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, ["scripts/build-releases.mjs"]);
run(process.execPath, ["scripts/apply-ux-sprint1.mjs"]);

let search = spawnSync("python", ["scripts/build-search-index.py"], { stdio: "inherit", shell: false });
if (search.error || search.status !== 0) search = spawnSync("py", ["-3", "scripts/build-search-index.py"], { stdio: "inherit", shell: false });
if (search.error) throw search.error;
if (search.status !== 0) process.exit(search.status ?? 1);

run(process.execPath, ["scripts/validate-public-site.mjs"]);
run(process.execPath, ["scripts/test-search.mjs"]);
console.log("PASS: complete Fractalish static-site build.");
