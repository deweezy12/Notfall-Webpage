# Local Development

The public website lives in `artifacts/stitch-bg` and is set up for GitHub Pages.

## Requirements

- Node.js `24.x`
- `pnpm`

## Install

```powershell
pnpm.cmd install
```

## Run Locally

```powershell
pnpm.cmd --filter @workspace/stitch-bg run dev
```

Local development uses `/` as the base path and starts on `http://localhost:5173/`.

## Build Locally

```powershell
pnpm.cmd --filter @workspace/stitch-bg run build
```

Build output:

- `artifacts/stitch-bg/dist`

## Preview the Production Build

```powershell
$env:PORT="4173"
pnpm.cmd --filter @workspace/stitch-bg run serve
```

## GitHub Pages

The repo includes a GitHub Actions workflow that builds and deploys the site on pushes to `main`.

- Local builds default to `BASE_PATH=/`
- GitHub Actions builds default to `BASE_PATH=/Notfall-Webpage/`
- If you ever need to override this manually, set `BASE_PATH` before running `build`
