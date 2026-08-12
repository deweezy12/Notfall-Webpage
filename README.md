# Spacefield Media Website

Static website for [Spacefield Media](https://www.spacefieldmedia.com/), deployed to GitHub Pages.

## Requirements

- Node.js 24 or newer
- pnpm 10

The project has no third-party runtime or build dependencies.

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
  assets/               Compiled application JavaScript and CSS
  contacts/             About/contact route
  projects/             Projects route and project images
  services/             Services route
scripts/                Dependency-free build, validation, and preview tools
.github/workflows/      GitHub Pages deployment
dist/                   Generated output; never edit or commit
```

## Editing

The current website was recovered from a prebuilt application. The files in `site/assets/` are compiled bundles, not original application source. Small content and presentation changes can be made there carefully, but substantial development should begin by restoring or recreating the original source application.

Edit files only in `site/`, then run `pnpm build && pnpm check`. Do not edit `dist/`; every build replaces it.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`. The workflow builds the site, validates its expected routes and assets, and uploads `dist/` to GitHub Pages. The custom domain is configured in `site/CNAME`.
