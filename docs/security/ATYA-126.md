# ATYA-126: Vite toolchain remediation

## Change and compatibility

The site now uses Vite 8 and the matching React plugin, with a committed npm lockfile and an explicit Node.js requirement of 20.19+ or 22.12+. CI and deployment use Node.js 22 and reproducible `npm ci` installs. React 18 and the generated static site remain unchanged.

Development and preview servers bind to the loopback interface and retain strict filesystem access. To test from another device, use an intentional, temporary local configuration change rather than committing a broader bind address.

After updating an existing checkout, remove the old install tree and run `npm ci` with a supported Node.js version.

## Validation evidence

The public acceptance checks are intentionally non-disclosing:

- `npm test` verifies the supported toolchain declaration and local-only server boundaries.
- `npm run audit:security` must report no moderate-or-higher dependency findings.
- `npm run build` must produce the static site successfully.

Detailed verification remains associated with the private `AUDIT-SEC-126` evidence record.

## Rollback

Prefer a roll-forward dependency correction. If the generated site must be restored operationally, redeploy the last known-good static Pages artifact while keeping the superseded development toolchain offline. Reverting this change reintroduces the affected dependency graph and is not an acceptable long-term rollback.
