# Spacefield Media Website

Static website for [Spacefield Media](https://www.spacefieldmedia.com/), deployed to GitHub Pages.

## Requirements

- Node.js 24 or newer
- pnpm 10

The project has no third-party build dependencies.

## Commands

```sh
pnpm dev
```

Serves the source website at `http://localhost:5173`.

```sh
pnpm build
pnpm check
pnpm serve
```

These commands create, validate, and preview the production output in `dist/`.

## Structure

```text
site/                   Authoritative website files
  team/                 Optimized team portraits
  contacts/             About/contact route
  projects/             Projects route and project images
  services/             Services route
scripts/                Dependency-free build, validation, and preview tools
.github/workflows/      GitHub Pages deployment
dist/                   Generated output; never edit or commit
```

## Editing

Edit files only in `site/`, then run `pnpm build && pnpm check`. Do not edit `dist/`; every build replaces it.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`. The workflow builds the site, validates its expected routes and assets, and uploads `dist/` to GitHub Pages. The custom domain is configured in `site/CNAME`.
