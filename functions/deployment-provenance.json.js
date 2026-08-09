export function onRequestGet(context) {
  const env = context.env || {};
  const payload = {
    site: "fractalish.com",
    provenance_schema: "fractalish.pages.deployment-provenance.v0.1",
    provider: "Cloudflare Pages",
    commit_sha: env.CF_PAGES_COMMIT_SHA || null,
    branch: env.CF_PAGES_BRANCH || null,
    pages_url: env.CF_PAGES_URL || null,
    deployment_id: env.CF_PAGES_DEPLOYMENT_ID || null,
    generated_at_utc: new Date().toISOString(),
    source_policy: "production deploys are expected to originate from clean, merged main commits",
    clean_tree_assertion: env.CF_PAGES_COMMIT_SHA
      ? "commit-bound upload expected; confirm commit_dirty=false in Cloudflare Pages deployment metadata"
      : "not available from runtime environment",
    secrets_exposed: false,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
