# External configuration required after site hardening

This repository now contains deploy gates, CI validation, security headers, bounded CORS, repository-side chat controls, and a deployment provenance endpoint.

Some controls require provider-side settings that cannot be proven active merely by committing source.

## GitHub branch protection

Current audit result before this document was written: `main` returned `Branch not protected` from the GitHub branch-protection API.

Recommended `main` protection:

- require a pull request before merge;
- require at least one approving review, unless the repository owners intentionally choose a lighter emergency path;
- require conversation resolution before merge;
- require the `Validate public site / validate` workflow job once it has run on `main`;
- block force pushes;
- block branch deletion;
- leave administrator bypass policy explicitly documented by the owning organization.

If automation applies these settings successfully, record the API response or a GitHub settings screenshot in the relevant release/provenance issue.

## Cloudflare rate limiting

The `/api/site-chat` endpoint now includes repository-side abuse controls:

- method validation;
- `application/json` validation;
- request-size and message-size limits;
- malformed JSON handling;
- bounded origin policy;
- in-isolate best-effort rate limiting;
- generic upstream failure messages.

However, Cloudflare Workers/Pages isolates are distributed. In-memory rate limiting is not a complete quota-control boundary.

`EXTERNAL_CLOUDFLARE_CONFIGURATION_REQUIRED`

Recommended provider-side control:

- Configure a Cloudflare WAF/rate-limiting rule for `fractalish.com/api/site-chat`.
- Suggested starting rule: per IP, limit POST requests to approximately 10-20 requests per minute, with a short mitigation window.
- Exclude or separately tune trusted owner/development IPs only if needed.
- Monitor Workers AI usage after enabling the rule and tighten if abuse appears.

## CSP inline allowance

The committed CSP includes `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'`.

Reason:

- The hand-built static site currently includes inline `document.documentElement.classList.add("js")` hooks on pages.
- Some pages include inline JSON-LD.
- The chat widget injects a small self-contained style block.

Recommended later hardening:

- Move the no-JS hook into a committed external script or adopt nonce/hash-based CSP.
- Convert JSON-LD to nonce/hash-compatible inline scripts or external static JSON where practical.
- Move chat-widget styles into `assets/site.css`.
