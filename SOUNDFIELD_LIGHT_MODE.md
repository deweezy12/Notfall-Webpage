# Soundfield Light Mode Update

This document outlines the required updates for making the Soundfield page support a real light mode while preserving its audio-reactive identity.

## Current State

The Soundfield page currently exposes the global theme toggle, but the page remains visually dark in both themes.

Relevant files:

- `artifacts/stitch-bg/src/pages/SoundfieldPage.tsx`
- `artifacts/stitch-bg/src/styles.css`
- `artifacts/stitch-bg/src/components/DotRasterBackground.tsx`
- `artifacts/stitch-bg/src/components/MusicPlayer.tsx`

Current blockers:

- `SoundfieldPage.tsx` passes `theme="dark"` into `DotRasterBackground`.
- `SoundfieldPage.tsx` passes `backgroundColor="#000000"` into `DotRasterBackground`.
- `.soundfield-page` defines only dark theme CSS variables.
- `body:has(.soundfield-page)` stays black even under `[data-theme="light"]`.
- Header, footer, player, controls, select fields, sliders, and links use hard-coded dark colors.

## Goal

Light mode should feel bright, clear, and intentional without losing the Soundfield brand. The audio-reactive background should still be visible, but it should use lighter contrast, softer colors, and readable foreground text.

## Implementation Plan

1. Wire the active theme into the Soundfield canvas.

   In `SoundfieldPage.tsx`, pass the actual `theme` value into `DotRasterBackground`.

   ```tsx
   <DotRasterBackground
     theme={theme}
     contained={true}
     backgroundColor={theme === "dark" ? "#000000" : "#f6f3ec"}
     rainbow={true}
     audioReactive={true}
   />
   ```

2. Add light-mode tokens for Soundfield.

   Keep the default `.soundfield-page` tokens dark, then add a light override.

   ```css
   [data-theme="light"] .soundfield-page {
     --bg: #f6f3ec;
     --bg-subtle: rgba(23, 25, 31, 0.06);
     --text: #17191f;
     --text-muted: rgba(23, 25, 31, 0.68);
     --border: rgba(23, 25, 31, 0.14);
     --accent: #17191f;
     --accent-text: #f6f3ec;
     background: var(--bg);
     color-scheme: light;
   }
   ```

3. Update body, header, and footer backgrounds.

   Replace fixed black backgrounds with theme variables and add a light-mode header surface that remains legible over the hero.

   Recommended direction:

   - Dark: black canvas, subtle white borders.
   - Light: warm off-white canvas, subtle dark borders.
   - Header: translucent surface with blur in both themes.
   - Footer: same background family as the page, not forced black.

4. Theme the music player.

   Convert hard-coded white text and borders in `.music-player` and child controls to Soundfield variables.

   Key selectors to review:

   - `.music-player`
   - `.music-player__meta-label`
   - `.music-player__select`
   - `.music-player__play-button`
   - `.music-player__status-copy`
   - `.music-player__time`
   - `.music-player__slider`
   - `.music-player__slider::-webkit-slider-thumb`
   - `.music-player__slider::-moz-range-thumb`

5. Add select option styling for light mode.

   ```css
   [data-theme="light"] .music-player__select option {
     background: #f6f3ec;
     color: #17191f;
   }
   ```

6. Review the canvas colors in `DotRasterBackground.tsx`.

   The component already branches on `theme`, but the Soundfield page currently prevents that branch from being used. After wiring `theme`, verify that:

   - Light-mode dots are visible on the light background.
   - Audio-reactive rainbow colors are not too saturated.
   - Text remains readable above the canvas.
   - Reduced-motion behavior still works.

## Acceptance Criteria

- The Soundfield theme toggle visibly changes the page between dark and light mode.
- Light mode does not leave black body, header, hero, or footer surfaces behind.
- The audio-reactive background remains visible in light mode.
- Music player controls are readable and usable in both themes.
- Buttons, links, focus outlines, sliders, and select fields meet contrast expectations.
- The mobile layout remains stable at 640px and below.

## Validation Checklist

- Run the app locally from `artifacts/stitch-bg`.
- Open `/soundfield/`.
- Toggle from dark to light and back.
- Start and pause audio.
- Switch between LoFi, brown noise, and pink noise.
- Test keyboard focus through the header, player controls, CTA, and footer links.
- Check desktop and mobile viewport widths.

Recommended commands:

```powershell
cd artifacts\stitch-bg
pnpm run dev
```

```powershell
pnpm run build
```
