# Homepage Project Screenshots

Replace the temporary homepage project images with clean, uncropped source files.
PNG or high-quality WebP is preferred. Do not add browser controls, Instagram
navigation, rounded corners, shadows, or decorative backgrounds to the exports.

## Website Project

- [ ] Add `site/projects/website-desktop.webp`.
- [ ] Target `1920 x 1200 px` or larger, approximately `16:10`.
- [ ] Capture the strongest website section without browser chrome or a cursor.
- [ ] Optionally add `site/projects/website-mobile.webp`.
- [ ] Target roughly `1170 x 2532 px`, approximately `9:19.5`.
- [ ] Keep important content away from the outermost 5% for responsive cropping.

Planned presentation: one large landscape website canvas with an optional mobile
view floating over one edge.

## Social Media Project One

- [ ] Add `site/projects/social-one-01.webp`.
- [ ] Add `site/projects/social-one-02.webp`.
- [ ] Add `site/projects/social-one-03.webp`.
- [ ] Target `1080 x 1350 px`, aspect ratio `4:5`, for every image.
- [ ] Choose one campaign cover, one informational or typography post, and one
      secondary visual or detail.

Planned presentation: a restrained portrait triptych with one dominant center
image and two offset supporting posts.

## Social Media Project Two

- [ ] Add `site/projects/social-two-01.webp`.
- [ ] Add `site/projects/social-two-02.webp`.
- [ ] Add `site/projects/social-two-03.webp`.
- [ ] Add `site/projects/social-two-04.webp`.
- [ ] Target `1080 x 1350 px`, aspect ratio `4:5`, for every image.
- [ ] Choose a main campaign visual, a detail, a typography or information post,
      and a contrasting image that completes the set.

Planned presentation: an asymmetric `2 x 2` composition so it is visually
distinct from the first social-media project.

## Project Details

Provide this information with each project:

- [ ] Project name
- [ ] Category
- [ ] Destination URL
- [ ] Year
- [ ] Preferred display order

## Export Requirements

- [ ] Use sRGB.
- [ ] Keep the shortest useful image dimension at least `1080 px`.
- [ ] Export clean artwork rather than screenshots of an app interface.
- [ ] Avoid visible status bars, notifications, cursors, and platform controls.
- [ ] Do not pre-compress aggressively; repository optimization can happen after
      the final crops are selected.

## Implementation Follow-Up

- [ ] Replace `website-annka-poster.jpg` in the horizontal homepage showcase.
- [ ] Replace `ari-social-poster.jpg` with the three-image social composition.
- [ ] Replace the third dark placeholder with the four-image social composition.
- [ ] Add accessible alternative text and destination links.
- [ ] Optimize final images and update `scripts/check.mjs`.
- [ ] Run `pnpm build && pnpm check` and verify desktop, mobile swipe, keyboard
      navigation, and reduced-motion behavior.
