# AtyaLibraries.github.io

The official landing page for **[Atya Libraries](https://github.com/AtyaLibraries)** — a growing
family of focused, modern **.NET 10** NuGet packages published under the reserved `Atya.*` prefix.

🔗 **Live site:** https://atyalibraries.github.io/

## Tech

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) (plain JSX, no TypeScript build step)
- Plain CSS design system (dark/light themes, `.NET` purple `#512BD4` brand)
- Live NuGet version badges via [shields.io](https://shields.io) — the catalog never goes stale

## Local development

> Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm test
npm run audit:security
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages via the official Pages Actions. No manual steps required.

## Adding a package to the catalog

Edit `src/data.js` — add an entry with its `id` (NuGet PackageId), `repo` slug, `category`,
`type`, and `description`. The card, badges, and links are generated automatically.
