# Public Repository Index

This index records public repository links used by the review branch. Live verification evidence is captured in the validation evidence file.

| Repository | Purpose | Authority Level | Frozen Commit / Tag | Test or Verifier Command | Current Limitations |
| --- | --- | --- | --- | --- | --- |
| https://github.com/BonAcqui-LLC/fractalish | Public site and public source lanes including CNTM Natural Math canonical library references. | Mixed: site source, frozen-source references, public review branch. | Site starting commit 8fc890cde31d3ea5e64e18b9bbdc6dc1babf11e9; branch under review records current HEAD. | \`node scripts/validate-public-site.mjs\` for site routes; source-lane verifiers are named in the claim map where public. | Site repo does not by itself prove frozen-source claims; those remain claim-map and manifest bound. |
| https://github.com/BonAcqui-LLC/cognitive-basin-platform | Public platform repository linked for Cognitive Basin, Specificity, Motorola, and related source lanes. | Built/local or code-present depending component. | Exact frozen commits are claim-specific where present. | Named verifier commands must be followed from that repository and claim-specific docs. | Site must not claim runnable evidence where a reader cannot locate the named verifier. |

Repository-link audit must be refreshed before deployment review. Missing README, missing license, dead link, or unverifiable test command should hold deployment.
