# Project Structure

## Overview

Multi-page Vite + React application for Spacefield Media, featuring a landing page and multiple service pages (Notdienst services + Soundfield).

## Architecture

### Multi-Page Setup

Each page has its own HTML entry point and is built separately by Vite:

- **Landing Page**: `/index.html` → `/src/entries/landing.tsx` → `LandingPage.tsx`
- **Service Pages**: `/{service}/index.html` → `/src/entries/{service}.tsx` → `{Service}Page.tsx`

Services: `schluessel`, `rohr`, `elektrik`, `heizung`, `soundfield`, `impressum`, `datenschutz`

### Key Files

#### Configuration

- **`vite.config.ts`**: Defines all page entry points in `rollupOptions.input`
- **`tsconfig.json`**: TypeScript config with `@/` alias pointing to `src/`

#### Source Structure

```
src/
├── entries/          # Entry points for each page (mount React)
├── pages/            # Page components (LandingPage, HeizungPage, etc.)
├── components/       # Shared components (DotRasterBackground, StructuredData, etc.)
├── lib/
│   ├── site.ts       # Service links config & utility functions
│   ├── theme.ts      # Dark/light theme management
│   └── mock-data.ts  # Company data for services
├── mount.tsx         # Root mounting logic
└── styles.css        # Global styles for all pages

```

#### Service Configuration (`src/lib/site.ts`)

- **ServiceKey**: Type union of all service keys
- **ServiceLink**: Type definition for service tiles
- **serviceLinks**: Array of service objects used to render landing page tiles
- **withBase()**: Adds BASE_URL prefix to paths
- **asset()**: Alias for withBase()

#### Styling (`src/styles.css`)

- Global CSS variables for themes
- Landing page styles including tile grid layout
- Service-specific page styles (heizung, rohr, elektrik, etc.)
- Responsive breakpoints

### Landing Page Tiles

Tiles are rendered by mapping over `serviceLinks` in `LandingPage.tsx`:

- Layout: 2x2 grid on desktop, with 5th tile centered below (2-2-1 pattern)
- CSS: `.landing-actions--grid` with special rule for `:nth-child(5)`
- Background: DotRasterBackground component (animated dots with hover effect)

### Adding a New Service Page

1. **Create directory**: `/{service}/index.html`
2. **Create entry**: `/src/entries/{service}.tsx` (imports and mounts page component)
3. **Create page component**: `/src/pages/{Service}Page.tsx`
4. **Update `vite.config.ts`**: Add to `rollupOptions.input`
5. **Update `src/lib/site.ts`**: Add to `ServiceKey` type and `serviceLinks` array
6. **Add styles**: Add service-specific styles to `src/styles.css`

### Theme System

- Managed by `useTheme()` hook from `src/lib/theme.ts`
- Persists in localStorage as `theme` key
- Applied via `data-theme` attribute on `<html>`
- CSS variables defined for both `dark` and `light` themes

### Background Component

**DotRasterBackground** (`src/components/DotRasterBackground.tsx`):

- Canvas-based animated dot raster pattern
- Responds to pointer movement (140px hover radius)
- Theme-aware colors (dark: #202124, light: #f7f7fb)
- Breathing animation with HSL hue shift in dark mode

## Build & Deploy

- **Dev**: `npm run dev` (Vite dev server on port from env or 5173)
- **Build**: `npm run build` (outputs to `/dist`)
- **Preview**: `npm run preview`

Build outputs separate HTML files for each page in `/dist`, maintaining directory structure.
