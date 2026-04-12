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

## Elektrik Chat

The Elektrik page now includes an embedded emergency chat UI.

- Create `artifacts/stitch-bg/.env.local`
- Set `VITE_ELEKTRIK_CHAT_API_URL=http://localhost:7860/api/chat` for local testing
- Keep the Anthropic API key on the backend only, for example in your existing `web-ai-agent` Flask app
- GitHub Pages stays static, so the chat needs an external backend endpoint or a different host for the API
- For GitHub Actions deploys, add the repository secret `VITE_ELEKTRIK_CHAT_API_URL` and point it to your live backend endpoint, for example `https://your-service.onrender.com/api/chat`

## GitHub Pages

The repo includes a GitHub Actions workflow that builds and deploys the site on pushes to `main`.

- Local builds default to `BASE_PATH=/`
- GitHub Actions builds default to `BASE_PATH=/Notfall-Webpage/`
- If you ever need to override this manually, set `BASE_PATH` before running `build`
