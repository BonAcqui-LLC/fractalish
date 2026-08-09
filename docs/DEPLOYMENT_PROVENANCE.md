# Fractalish deployment provenance

Production deployments are expected to originate from a clean, committed `main` state.

## Required local gate

Before any operator-local production deploy, run:

```powershell
node scripts\validate-public-site.mjs
node scripts\validate-deploy-provenance.mjs
```

The provenance gate rejects:

- dirty working trees;
- untracked deployment-affecting files;
- unexpected deployment branch;
- local branches behind their upstream;
- local-only commits that have not reached upstream.

## Preferred deployment path

Prefer Cloudflare Pages deployments from merged GitHub `main` commits. Direct `wrangler pages deploy` should be reserved for emergencies or explicit owner-approved operations and must leave a provenance trail in GitHub issues/PRs.

## Runtime receipt

`/deployment-provenance.json` exposes a small non-secret receipt when Cloudflare runtime metadata is available. It may include commit SHA, branch, Pages URL, deployment identifier, and a clean-source policy statement. If Cloudflare does not expose a field at runtime, the field is returned as `null` rather than inferred.
